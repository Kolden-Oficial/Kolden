import type { FastifyPluginAsync } from "fastify";
import type { Config } from "../../config.js";

export interface HorarioBody {
  now?: string;
}

export interface HorarioResponse {
  in_hours: boolean;
  texto: string;
  agora_local: string;
  proxima_abertura?: string;
}

/**
 * Decide se estamos em horário comercial para a Rosie.
 * Regra:
 *   seg-sex 9h-18h → in_hours=true
 *   sáb 9h-13h → in_hours=true
 *   restante (dom + fora do horário) → in_hours=false
 *
 * Cache: 5 min via header Cache-Control (idempotente por minuto).
 */
export function isInBusinessHours(
  now: Date,
  cfg: Config,
): { inHours: boolean; localIso: string; nextOpenIso?: string } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: cfg.rosieTz,
    hour12: false,
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(now);

  const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
  const weekday = p.weekday;
  const hour = Number(p.hour);
  const minute = Number(p.minute);
  const localIso = `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}:${p.second}`;

  const isWeekday = ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday);
  const isSaturday = weekday === "Sat";

  let inHours = false;
  if (isWeekday) {
    inHours =
      hour > cfg.business.weekdayStart - 1 && hour < cfg.business.weekdayEnd;
    if (hour === cfg.business.weekdayStart && minute >= 0) inHours = true;
    if (hour === cfg.business.weekdayEnd) inHours = false;
  } else if (isSaturday) {
    inHours =
      hour > cfg.business.saturdayStart - 1 && hour < cfg.business.saturdayEnd;
    if (hour === cfg.business.saturdayStart && minute >= 0) inHours = true;
    if (hour === cfg.business.saturdayEnd) inHours = false;
  }

  const result: {
    inHours: boolean;
    localIso: string;
    nextOpenIso?: string;
  } = { inHours, localIso };

  if (!inHours) {
    result.nextOpenIso = computeNextOpen(weekday, hour, cfg, p);
  }

  return result;
}

function computeNextOpen(
  weekday: string,
  hour: number,
  cfg: Config,
  p: Record<string, string>,
): string {
  const dayIdx: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  };
  const cur = dayIdx[weekday];
  const beforeWeekdayOpen =
    ["Mon", "Tue", "Wed", "Thu", "Fri"].includes(weekday) &&
    hour < cfg.business.weekdayStart;
  const beforeSatOpen =
    weekday === "Sat" && hour < cfg.business.saturdayStart;

  if (beforeWeekdayOpen) {
    return `${p.year}-${p.month}-${p.day}T${String(cfg.business.weekdayStart).padStart(2, "0")}:00:00`;
  }
  if (beforeSatOpen) {
    return `${p.year}-${p.month}-${p.day}T${String(cfg.business.saturdayStart).padStart(2, "0")}:00:00`;
  }

  const daysAhead = cur === 6 ? 2 : cur === 0 ? 1 : 1;
  const openHour =
    cur + daysAhead === 6 ? cfg.business.saturdayStart : cfg.business.weekdayStart;
  const d = new Date(`${p.year}-${p.month}-${p.day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + daysAhead);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${String(openHour).padStart(2, "0")}:00:00`;
}

export const registerHorarioRoute: FastifyPluginAsync<{ cfg: Config }> = async (
  app,
  { cfg },
) => {
  app.post<{ Body: HorarioBody; Reply: HorarioResponse }>(
    "/kommo/horario",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            now: { type: "string" },
          },
        },
      },
    },
    async (req, reply) => {
      const now = req.body?.now ? new Date(req.body.now) : new Date();
      if (Number.isNaN(now.getTime())) {
        reply.code(400);
        return {
          in_hours: true,
          texto: cfg.handoffText.inHours,
          agora_local: new Date().toISOString(),
        };
      }
      const r = isInBusinessHours(now, cfg);
      reply.header("Cache-Control", "public, max-age=300");
      return {
        in_hours: r.inHours,
        texto: r.inHours ? cfg.handoffText.inHours : cfg.handoffText.outOfHours,
        agora_local: r.localIso,
        proxima_abertura: r.nextOpenIso,
      };
    },
  );

  app.get("/kommo/horario", async () => {
    const r = isInBusinessHours(new Date(), cfg);
    return {
      in_hours: r.inHours,
      texto: r.inHours ? cfg.handoffText.inHours : cfg.handoffText.outOfHours,
      agora_local: r.localIso,
      proxima_abertura: r.nextOpenIso,
    };
  });
};
