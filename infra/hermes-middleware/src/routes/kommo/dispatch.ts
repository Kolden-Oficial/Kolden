import type { FastifyPluginAsync } from "fastify";
import type { Redis } from "@upstash/redis";
import type { KommoConfig } from "../../kommo/config.js";
import { ChatsApiClient } from "../../kommo/chats-api.js";
import { fetchDue, markDone } from "../../kommo/scheduler.js";

/**
 * Worker de dispatch — chamado por cron externo (Railway cron, Upstash QStash, etc.).
 * Endpoint: POST /kommo/dispatch?secret=<KOMMO_WEBHOOK_SECRET>
 *
 * Fluxo:
 *   1. fetchDue() → pega tasks vencidas
 *   2. para cada task, envia via Chats API amojo
 *   3. markDone() → remove do ZSET
 *
 * Idempotência: se falhar após envio antes de markDone, próxima chamada tenta de novo.
 * Kommo Chats API é idempotente via msgid único gerado pelo scheduler.
 */

export const registerDispatchRoute: FastifyPluginAsync<{
  redis: Redis;
  kommo: KommoConfig;
}> = async (app, { redis, kommo }) => {
  app.post<{ Querystring: { secret?: string; limit?: string } }>(
    "/kommo/dispatch",
    async (req, reply) => {
      if (kommo.webhookSecret && req.query.secret !== kommo.webhookSecret) {
        reply.code(401);
        return { error: "secret invalido" };
      }

      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const due = await fetchDue(redis, limit);
      if (due.length === 0) return { processed: 0, results: [] };

      const chats = new ChatsApiClient(kommo);
      const results: Array<{ id: string; status: number; ok: boolean }> = [];

      for (const task of due) {
        try {
          if (!task.conversationId) {
            results.push({ id: task.id, status: 0, ok: false });
            await markDone(redis, task);
            continue;
          }
          const { status } = await chats.sendText(task.conversationId, "", {
            templateName: task.template,
            templateParams: task.templateParams,
          });
          const ok = status >= 200 && status < 300;
          results.push({ id: task.id, status, ok });
          if (ok) await markDone(redis, task);
        } catch (err) {
          results.push({ id: task.id, status: -1, ok: false });
          // não markDone — próxima rodada tenta de novo
        }
      }

      return { processed: results.length, results };
    },
  );
};
