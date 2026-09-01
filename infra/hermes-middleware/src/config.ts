export interface Config {
  koldenToken: string;
  port: number;
  rosieTz: string;
  business: {
    weekdayStart: number;
    weekdayEnd: number;
    saturdayStart: number;
    saturdayEnd: number;
  };
  handoffText: {
    inHours: string;
    outOfHours: string;
  };
}

function req(name: string, fallback?: string): string {
  const v = process.env[name] ?? fallback;
  if (v === undefined || v === "") {
    throw new Error(`env ausente: ${name}`);
  }
  return v;
}

function num(name: string, fallback: number): number {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const n = Number(raw);
  if (Number.isNaN(n)) throw new Error(`env ${name} não é número: ${raw}`);
  return n;
}

export function loadConfig(): Config {
  return {
    koldenToken: req("KOLDEN_TOKEN"),
    port: num("PORT", 3000),
    rosieTz: req("ROSIE_TZ", "America/Sao_Paulo"),
    business: {
      weekdayStart: num("BUSINESS_WEEKDAY_START", 9),
      weekdayEnd: num("BUSINESS_WEEKDAY_END", 18),
      saturdayStart: num("BUSINESS_SATURDAY_START", 9),
      saturdayEnd: num("BUSINESS_SATURDAY_END", 13),
    },
    handoffText: {
      inHours: req(
        "HANDOFF_TEXT_A",
        "Uma consultora assume seu atendimento agora 💛"
      ),
      outOfHours: req(
        "HANDOFF_TEXT_B",
        "Já deixei tudo registrado aqui 💛 A gente não está em atendimento agora, mas assim que abrir uma consultora te responde por aqui — pode ficar tranquila."
      ),
    },
  };
}
