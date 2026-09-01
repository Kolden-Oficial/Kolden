import type { FastifyPluginAsync } from "fastify";
import type { Redis } from "@upstash/redis";
import type { KommoConfig } from "../../kommo/config.js";
import {
  scheduleCarrinhoEnviadoFollowUps,
  scheduleCarrinhoAbandonadoFollowUps,
  scheduleReativacaoFollowUps,
  cancelByLead,
  fetchDue,
} from "../../kommo/scheduler.js";

export const registerScheduleRoutes: FastifyPluginAsync<{
  redis: Redis;
  kommo: KommoConfig;
}> = async (app, { redis }) => {
  /**
   * POST /kommo/schedule/carrinho-enviado
   * Chamado pelo Digital Pipeline OU pelo Salesbot ao mover card p/ "Carrinho enviado".
   */
  app.post<{
    Body: {
      leadId: number;
      contactId?: number;
      conversationId?: string;
      contactFirstName: string;
      linkCarrinho: string;
      pecaInteresse: string;
      tamanho: string;
    };
  }>("/kommo/schedule/carrinho-enviado", async (req) => {
    const ids = await scheduleCarrinhoEnviadoFollowUps(redis, req.body);
    return { scheduled: ids, count: ids.length };
  });

  /**
   * POST /kommo/schedule/carrinho-abandonado
   * Chamado pelo webhook Nuvemshop OU pelo Digital Pipeline ao criar card em P3.
   */
  app.post<{
    Body: {
      leadId: number;
      contactId?: number;
      conversationId?: string;
      contactFirstName: string;
      pecaAbandonada: string;
      incentivo: string;
      linkCarrinho: string;
    };
  }>("/kommo/schedule/carrinho-abandonado", async (req) => {
    const ids = await scheduleCarrinhoAbandonadoFollowUps(redis, req.body);
    return { scheduled: ids, count: ids.length };
  });

  /**
   * POST /kommo/schedule/reativacao
   * Chamado ao mover card p/ "Aguardando Cliente".
   */
  app.post<{
    Body: {
      leadId: number;
      contactId?: number;
      conversationId?: string;
      contactFirstName: string;
      aguardandoOQue: string;
    };
  }>("/kommo/schedule/reativacao", async (req) => {
    const ids = await scheduleReativacaoFollowUps(redis, req.body);
    return { scheduled: ids, count: ids.length };
  });

  /**
   * DELETE /kommo/schedule/lead/:leadId
   * Cancela todas as tasks agendadas de um lead (usado quando cliente responde).
   */
  app.delete<{ Params: { leadId: string } }>(
    "/kommo/schedule/lead/:leadId",
    async (req) => {
      const removed = await cancelByLead(redis, Number(req.params.leadId));
      return { removed };
    },
  );

  /**
   * GET /kommo/schedule/pending
   * Lista tasks vencidas (para debug / monitor).
   */
  app.get<{ Querystring: { limit?: string } }>(
    "/kommo/schedule/pending",
    async (req) => {
      const limit = req.query.limit ? Number(req.query.limit) : 20;
      const tasks = await fetchDue(redis, limit);
      return { count: tasks.length, tasks };
    },
  );
};
