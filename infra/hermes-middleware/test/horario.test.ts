import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { isInBusinessHours } from "../src/routes/kommo/horario.js";
import type { Config } from "../src/config.js";

const cfg: Config = {
  koldenToken: "test",
  port: 3000,
  rosieTz: "America/Sao_Paulo",
  business: {
    weekdayStart: 9,
    weekdayEnd: 18,
    saturdayStart: 9,
    saturdayEnd: 13,
  },
  handoffText: {
    inHours: "A",
    outOfHours: "B",
  },
};

// Datas de referência: usar UTC (São Paulo = UTC-3, sem horário de verão em 2026)
// 3ª-feira 14h SP = 17h UTC
// Sábado 10h SP = 13h UTC
// Domingo qualquer hora = fora
// 2ª 8h59 SP = 11h59 UTC → fora
// 2ª 9h00 SP = 12h00 UTC → dentro
// 2ª 17h59 SP = 20h59 UTC → dentro
// 2ª 18h00 SP = 21h00 UTC → fora
// Sáb 13h00 SP = 16h00 UTC → fora
// Sáb 12h59 SP = 15h59 UTC → dentro

describe("isInBusinessHours — Rosie horário comercial", () => {
  test("3ª-feira 14h SP → dentro", () => {
    const r = isInBusinessHours(new Date("2026-07-28T17:00:00Z"), cfg);
    assert.equal(r.inHours, true);
  });

  test("2ª-feira 8h59 SP → fora (antes de abrir)", () => {
    const r = isInBusinessHours(new Date("2026-07-27T11:59:00Z"), cfg);
    assert.equal(r.inHours, false);
    assert.ok(r.nextOpenIso?.includes("T09:00:00"));
  });

  test("2ª-feira 9h00 SP → dentro (na abertura)", () => {
    const r = isInBusinessHours(new Date("2026-07-27T12:00:00Z"), cfg);
    assert.equal(r.inHours, true);
  });

  test("2ª-feira 17h59 SP → dentro (último minuto)", () => {
    const r = isInBusinessHours(new Date("2026-07-27T20:59:00Z"), cfg);
    assert.equal(r.inHours, true);
  });

  test("2ª-feira 18h00 SP → fora (no fechamento)", () => {
    const r = isInBusinessHours(new Date("2026-07-27T21:00:00Z"), cfg);
    assert.equal(r.inHours, false);
  });

  test("Sábado 10h SP → dentro", () => {
    const r = isInBusinessHours(new Date("2026-08-01T13:00:00Z"), cfg);
    assert.equal(r.inHours, true);
  });

  test("Sábado 12h59 SP → dentro (último minuto)", () => {
    const r = isInBusinessHours(new Date("2026-08-01T15:59:00Z"), cfg);
    assert.equal(r.inHours, true);
  });

  test("Sábado 13h00 SP → fora", () => {
    const r = isInBusinessHours(new Date("2026-08-01T16:00:00Z"), cfg);
    assert.equal(r.inHours, false);
  });

  test("Domingo 12h SP → fora, próxima abertura = segunda 9h", () => {
    const r = isInBusinessHours(new Date("2026-08-02T15:00:00Z"), cfg);
    assert.equal(r.inHours, false);
    assert.ok(r.nextOpenIso);
    assert.ok(r.nextOpenIso.includes("T09:00:00"));
  });

  test("Sexta 23h SP → fora, próxima abertura = sábado 9h", () => {
    const r = isInBusinessHours(new Date("2026-08-01T02:00:00Z"), cfg);
    assert.equal(r.inHours, false);
    assert.ok(r.nextOpenIso);
  });
});
