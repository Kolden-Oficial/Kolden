import type { FastifyPluginAsync } from "fastify";
import type { Redis } from "@upstash/redis";
import type { KommoConfig } from "../../kommo/config.js";
import { cancelByLead } from "../../kommo/scheduler.js";
import { moveLead, addLeadTag } from "../../kommo/chats-api.js";

/**
 * Recebe webhooks do Kommo:
 *   - add_message         → cliente respondeu, cancela follow-ups
 *   - status_lead         → mudança de stage/pipeline (AUT-05, AUT-07 trigger)
 *   - add_lead            → novo lead (potencial trigger de agenda inicial)
 *   - add_outgoing_message→ nossa consultora respondeu (também cancela follow-ups)
 *
 * Kommo envia como application/x-www-form-urlencoded no formato aninhado
 * (contacts[update][0][id]=…) — usamos parser padrão do Fastify + interpretador.
 */

interface WebhookBody {
  add?: {
    leads?: Array<{ id: string; pipeline_id: string; status_id: string }>;
    message?: unknown[];
  };
  update?: {
    leads?: Array<{
      id: string;
      pipeline_id: string;
      old_pipeline_id?: string;
      status_id: string;
      old_status_id?: string;
    }>;
  };
  message?: unknown;
  leads?: {
    status?: Array<{
      id: string;
      old_pipeline_id?: string;
      pipeline_id: string;
      old_status_id?: string;
      status_id: string;
    }>;
  };
}

// Constantes das stages/pipelines Rosie
const P1_VENDAS = 14033351;
const P1_NOVO_LEAD = 108316683;
const P3_CARRINHO_ABANDONADO = 14171967;
const P3_ABORDADO = 109412475;
const P3_REENGAJOU = 109412479;

export const registerWebhookRoute: FastifyPluginAsync<{
  redis: Redis;
  kommo: KommoConfig;
}> = async (app, { redis, kommo }) => {
  /**
   * POST /kommo/webhook
   * Auth: querystring ?secret=<KOMMO_WEBHOOK_SECRET>
   *
   * Kommo não envia HMAC nativo em webhooks CRM API v4 — usamos token compartilhado
   * na query string (config no painel Kommo → Settings → Webhooks).
   */
  app.post<{ Querystring: { secret?: string }; Body: WebhookBody }>(
    "/kommo/webhook",
    async (req, reply) => {
      if (kommo.webhookSecret && req.query.secret !== kommo.webhookSecret) {
        reply.code(401);
        return { error: "secret invalido" };
      }

      const body = req.body ?? {};
      const results: string[] = [];

      // -----------------------------------------------------------------
      // Evento add_message — cliente ou consultora respondeu → cancela follow-ups
      // -----------------------------------------------------------------
      const msgs = extractMessages(body);
      for (const m of msgs) {
        const leadId = Number(m.entity_id);
        if (Number.isFinite(leadId)) {
          const removed = await cancelByLead(redis, leadId);
          results.push(`cancel_by_lead:${leadId}:${removed}`);

          // AUT-05: se o card está em P3 · Abordado, migra para P1 · Novo lead
          if (m.entity_type === "lead") {
            await maybeMigrateP3ToP1(kommo, leadId, results);
          }
        }
      }

      // -----------------------------------------------------------------
      // Evento status_lead (mudança de stage/pipeline)
      // -----------------------------------------------------------------
      const statusChanges = body.leads?.status ?? [];
      for (const ch of statusChanges) {
        const leadId = Number(ch.id);
        const newStatus = Number(ch.status_id);
        const newPipeline = Number(ch.pipeline_id);
        results.push(`status:${leadId}:${newPipeline}/${newStatus}`);

        // Placeholder para triggers futuros (AUT-07 auto-schedule, etc.)
        // Preferimos deixar essas triggers explícitas via /schedule/* endpoints
        // chamados pelo Digital Pipeline ou pelo Salesbot.
      }

      return { ok: true, processed: results };
    },
  );
};

function extractMessages(body: WebhookBody): Array<{
  id: string;
  chat_id?: string;
  entity_id?: string;
  entity_type?: string;
  type?: string;
}> {
  const out: Array<{ id: string; chat_id?: string; entity_id?: string; entity_type?: string; type?: string }> = [];
  // Novo formato (jul/2026): { add: [{ ...msg }] }
  if (body.add && Array.isArray(body.add.message)) {
    for (const m of body.add.message as Record<string, unknown>[]) {
      out.push({
        id: String(m.id ?? ""),
        chat_id: m.chat_id as string,
        entity_id: m.entity_id as string,
        entity_type: m.entity_type as string,
        type: m.type as string,
      });
    }
  }
  return out;
}

async function maybeMigrateP3ToP1(
  cfg: KommoConfig,
  leadId: number,
  results: string[],
): Promise<void> {
  // Buscamos o lead para saber pipeline atual
  const url = `https://${cfg.subdomain}.kommo.com/api/v4/leads/${leadId}`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${cfg.accessToken}` },
    });
    if (!res.ok) {
      results.push(`fetch_lead:${leadId}:${res.status}`);
      return;
    }
    const lead = (await res.json()) as {
      pipeline_id: number;
      status_id: number;
    };
    if (
      lead.pipeline_id === P3_CARRINHO_ABANDONADO &&
      (lead.status_id === P3_ABORDADO || lead.status_id === P3_REENGAJOU)
    ) {
      // AUT-05: migra para P1 · Novo lead + tag carrinho-abandonado
      await moveLead(cfg, leadId, P1_VENDAS, P1_NOVO_LEAD);
      await addLeadTag(cfg, leadId, "carrinho-abandonado");
      results.push(`aut-05:migrated:${leadId}`);
    }
  } catch (err) {
    results.push(`aut-05:error:${leadId}:${String(err).slice(0, 80)}`);
  }
}
