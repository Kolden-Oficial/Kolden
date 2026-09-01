import { Redis } from "@upstash/redis";
import type { RedisConfig } from "./config.js";

/**
 * Scheduler de follow-ups usando Redis Upstash como fila persistente.
 *
 * Modelo:
 *   ZSET `kommo:schedule` — score = unix timestamp (segundos), member = task JSON
 *   SET `kommo:leads:{leadId}:tasks` — set de task_ids para cancelar em lote
 *
 * Fluxo:
 *   schedule() adiciona task em ZSET e SET
 *   dispatch() lê tasks vencidas via ZRANGEBYSCORE, executa callback, remove
 *   cancelByLead() remove todas as tasks de um lead (quando cliente responde)
 */

export type FollowUpTemplate =
  | "rosie_carrinho_followup_2h"
  | "rosie_carrinho_followup_24h"
  | "rosie_carrinho_followup_72h"
  | "rosie_recuperacao_1h"
  | "rosie_recuperacao_24h"
  | "rosie_reativacao_24h"
  | "rosie_reativacao_72h_encerrar";

export interface ScheduledTask {
  id: string;
  leadId: number;
  contactId?: number;
  conversationId?: string;
  template: FollowUpTemplate;
  templateParams: Record<string, string>;
  scheduledFor: number; // unix seconds
  createdAt: number;
  reason: string;
}

export function makeRedis(cfg: RedisConfig): Redis {
  return new Redis({ url: cfg.url, token: cfg.token });
}

const ZSET_KEY = "kommo:schedule";
const leadTasksKey = (leadId: number) => `kommo:leads:${leadId}:tasks`;

function taskId(leadId: number, template: FollowUpTemplate, delayMs: number): string {
  return `${leadId}:${template}:${Date.now()}:${delayMs}`;
}

export async function scheduleFollowUp(
  redis: Redis,
  input: {
    leadId: number;
    contactId?: number;
    conversationId?: string;
    template: FollowUpTemplate;
    templateParams: Record<string, string>;
    delayMs: number;
    reason: string;
  },
): Promise<string> {
  const now = Date.now();
  const scheduledFor = Math.floor((now + input.delayMs) / 1000);
  const id = taskId(input.leadId, input.template, input.delayMs);

  const task: ScheduledTask = {
    id,
    leadId: input.leadId,
    contactId: input.contactId,
    conversationId: input.conversationId,
    template: input.template,
    templateParams: input.templateParams,
    scheduledFor,
    createdAt: Math.floor(now / 1000),
    reason: input.reason,
  };

  await redis.zadd(ZSET_KEY, { score: scheduledFor, member: JSON.stringify(task) });
  await redis.sadd(leadTasksKey(input.leadId), id);
  return id;
}

/**
 * Cancela todas as tasks de um lead (chamado quando cliente responde).
 * Retorna quantas tasks foram removidas.
 */
export async function cancelByLead(redis: Redis, leadId: number): Promise<number> {
  const ids = await redis.smembers(leadTasksKey(leadId));
  if (!ids || ids.length === 0) return 0;

  // Precisamos remover do ZSET pelos IDs — como o member é JSON, iteramos.
  // Para produção, uma opção melhor seria manter mapa id → member em HSET.
  const zset = await redis.zrange(ZSET_KEY, 0, -1);
  let removed = 0;
  for (const member of zset as string[]) {
    try {
      const task = JSON.parse(member) as ScheduledTask;
      if (ids.includes(task.id)) {
        await redis.zrem(ZSET_KEY, member);
        removed++;
      }
    } catch {
      /* ignora members malformados */
    }
  }
  await redis.del(leadTasksKey(leadId));
  return removed;
}

/**
 * Retorna as tasks vencidas até o momento (score <= now).
 * NÃO remove — o dispatcher chama fetchDue() e depois markDone() em cada.
 */
export async function fetchDue(
  redis: Redis,
  limit = 50,
): Promise<ScheduledTask[]> {
  const nowSec = Math.floor(Date.now() / 1000);
  const raw = await redis.zrange(ZSET_KEY, 0, nowSec, {
    byScore: true,
    offset: 0,
    count: limit,
  });
  const out: ScheduledTask[] = [];
  for (const m of raw as string[]) {
    try {
      out.push(JSON.parse(m));
    } catch {
      /* skip */
    }
  }
  return out;
}

export async function markDone(redis: Redis, task: ScheduledTask): Promise<void> {
  await redis.zrem(ZSET_KEY, JSON.stringify(task));
  await redis.srem(leadTasksKey(task.leadId), task.id);
}

/**
 * Helper: agenda os 3 follow-ups do fluxo de carrinho enviado (MA5.2/5.3/5.4).
 */
export async function scheduleCarrinhoEnviadoFollowUps(
  redis: Redis,
  input: {
    leadId: number;
    contactId?: number;
    conversationId?: string;
    contactFirstName: string;
    linkCarrinho: string;
    pecaInteresse: string;
    tamanho: string;
  },
): Promise<string[]> {
  const shared = {
    leadId: input.leadId,
    contactId: input.contactId,
    conversationId: input.conversationId,
  };
  const p1 = { name: input.contactFirstName, link: input.linkCarrinho };
  const p2 = { ...p1, peca: input.pecaInteresse, tamanho: input.tamanho };
  const p3 = { name: input.contactFirstName };

  return Promise.all([
    scheduleFollowUp(redis, {
      ...shared,
      template: "rosie_carrinho_followup_2h",
      templateParams: p1,
      delayMs: 2 * 60 * 60 * 1000,
      reason: "MA5.2 — follow-up +2h",
    }),
    scheduleFollowUp(redis, {
      ...shared,
      template: "rosie_carrinho_followup_24h",
      templateParams: p2,
      delayMs: 24 * 60 * 60 * 1000,
      reason: "MA5.3 — follow-up +24h",
    }),
    scheduleFollowUp(redis, {
      ...shared,
      template: "rosie_carrinho_followup_72h",
      templateParams: p3,
      delayMs: 72 * 60 * 60 * 1000,
      reason: "MA5.4 — follow-up +72h",
    }),
  ]);
}

/**
 * Helper: agenda MC.1 (+1h) e MC.2 (+24h) para carrinho abandonado (Pipeline 3).
 */
export async function scheduleCarrinhoAbandonadoFollowUps(
  redis: Redis,
  input: {
    leadId: number;
    contactId?: number;
    conversationId?: string;
    contactFirstName: string;
    pecaAbandonada: string;
    incentivo: string;
    linkCarrinho: string;
  },
): Promise<string[]> {
  const shared = { leadId: input.leadId, contactId: input.contactId, conversationId: input.conversationId };
  return Promise.all([
    scheduleFollowUp(redis, {
      ...shared,
      template: "rosie_recuperacao_1h",
      templateParams: {
        name: input.contactFirstName,
        peca: input.pecaAbandonada,
      },
      delayMs: 60 * 60 * 1000,
      reason: "MC.1 — recuperação +1h",
    }),
    scheduleFollowUp(redis, {
      ...shared,
      template: "rosie_recuperacao_24h",
      templateParams: {
        name: input.contactFirstName,
        peca: input.pecaAbandonada,
        incentivo: input.incentivo,
        link: input.linkCarrinho,
      },
      delayMs: 24 * 60 * 60 * 1000,
      reason: "MC.2 — recuperação +24h",
    }),
  ]);
}

/**
 * Helper: agenda MR.1 (+24h) e MR.2 (+72h) para reativação (Aguardando cliente).
 */
export async function scheduleReativacaoFollowUps(
  redis: Redis,
  input: {
    leadId: number;
    contactId?: number;
    conversationId?: string;
    contactFirstName: string;
    aguardandoOQue: string;
  },
): Promise<string[]> {
  const shared = { leadId: input.leadId, contactId: input.contactId, conversationId: input.conversationId };
  return Promise.all([
    scheduleFollowUp(redis, {
      ...shared,
      template: "rosie_reativacao_24h",
      templateParams: {
        name: input.contactFirstName,
        aguardando: input.aguardandoOQue,
      },
      delayMs: 24 * 60 * 60 * 1000,
      reason: "MR.1 — reativação +24h",
    }),
    scheduleFollowUp(redis, {
      ...shared,
      template: "rosie_reativacao_72h_encerrar",
      templateParams: { name: input.contactFirstName },
      delayMs: 72 * 60 * 60 * 1000,
      reason: "MR.2 — reativação +72h (encerrar)",
    }),
  ]);
}
