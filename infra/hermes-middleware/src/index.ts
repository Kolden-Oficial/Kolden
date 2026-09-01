import Fastify from "fastify";
import sensible from "@fastify/sensible";
import { loadConfig } from "./config.js";
import { makeAuthHook } from "./auth.js";
import { registerHorarioRoute } from "./routes/kommo/horario.js";
import { loadKommoConfig, loadRedisConfig } from "./kommo/config.js";
import { makeRedis } from "./kommo/scheduler.js";
import { registerScheduleRoutes } from "./routes/kommo/schedule.js";
import { registerWebhookRoute } from "./routes/kommo/webhook.js";
import { registerDispatchRoute } from "./routes/kommo/dispatch.js";

async function main() {
  const cfg = loadConfig();
  const kommoCfg = loadKommoConfig();
  const redisCfg = loadRedisConfig();

  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? "info",
      transport:
        process.env.NODE_ENV === "development"
          ? { target: "pino-pretty" }
          : undefined,
    },
  });

  await app.register(sensible);

  app.get("/health", async () => ({
    status: "ok",
    service: "hermes-middleware-kommo",
    version: "0.2.0",
    tz: cfg.rosieTz,
    features: {
      horario: true,
      scheduler: !!(kommoCfg && redisCfg),
      webhook: !!kommoCfg,
      dispatch: !!(kommoCfg && redisCfg),
    },
  }));

  // /kommo/horario — protegido por X-Kolden-Token
  const authHook = makeAuthHook(cfg.koldenToken);
  app.register(
    async (scope) => {
      scope.addHook("preHandler", authHook);
      await scope.register(registerHorarioRoute, { cfg });
    },
    { prefix: "" },
  );

  // Scheduler / Dispatch / Webhook — protegidos por KOMMO_WEBHOOK_SECRET na query
  if (kommoCfg && redisCfg) {
    const redis = makeRedis(redisCfg);
    app.register(
      async (scope) => {
        scope.addHook("preHandler", authHook);
        await scope.register(registerScheduleRoutes, { redis, kommo: kommoCfg });
      },
      { prefix: "" },
    );
    await app.register(registerWebhookRoute, { redis, kommo: kommoCfg });
    await app.register(registerDispatchRoute, { redis, kommo: kommoCfg });
    app.log.info("scheduler/webhook/dispatch registrados");
  } else {
    app.log.warn(
      "KOMMO_* ou UPSTASH_REDIS_* não configurados — /kommo/schedule/*, /kommo/webhook, /kommo/dispatch desabilitados",
    );
  }

  const address = await app.listen({
    port: cfg.port,
    host: "0.0.0.0",
  });
  app.log.info({ address, tz: cfg.rosieTz }, "hermes-middleware iniciado");
}

main().catch((err) => {
  console.error("falha ao subir hermes-middleware:", err);
  process.exit(1);
});
