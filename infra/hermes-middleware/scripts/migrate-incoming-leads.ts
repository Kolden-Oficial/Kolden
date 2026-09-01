#!/usr/bin/env tsx
/**
 * Migração dos leads em "Incoming leads" do Pipeline Vendas (Rosie).
 *
 * Aceita CSV de decisão preparado pelas Gabrielas:
 *   colunas obrigatórias: id, destino
 *   destino ∈ { "novo-lead", "qualificado", "perdido", "pular" }
 *
 * Aplica PATCH massivo em batches de 50, respeitando rate limit 7 req/s (14ms sleep).
 *
 * Modo default: DRY-RUN (imprime plano sem tocar API).
 * Modo real: --live + CONFIRM_KOMMO_WRITE=yes-i-know
 *
 * Uso:
 *   # dry-run
 *   tsx scripts/migrate-incoming-leads.ts --csv decisao.csv
 *
 *   # live
 *   CONFIRM_KOMMO_WRITE=yes-i-know infisical run --projectId=… --env=prod -- \
 *     tsx scripts/migrate-incoming-leads.ts --csv decisao.csv --live
 *
 * Env vars:
 *   KOMMO_ROSIE_SUBDOMAIN, KOMMO_ROSIE_ACCESS_TOKEN (ou TOKEN)
 */

import { readFileSync, appendFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname } from "node:path";

// -------------------- args --------------------

const LIVE = process.argv.includes("--live");
const CONFIRM = process.env.CONFIRM_KOMMO_WRITE === "yes-i-know";
const csvIdx = process.argv.indexOf("--csv");
const CSV_PATH = csvIdx > -1 ? process.argv[csvIdx + 1] : undefined;

const SUBDOMAIN = process.env.KOMMO_ROSIE_SUBDOMAIN ?? "rosie";
const TOKEN = process.env.KOMMO_ROSIE_ACCESS_TOKEN ?? process.env.TOKEN;
const BASE = `https://${SUBDOMAIN}.kommo.com/api/v4`;
const LOG = "logs/migrate-incoming.log";

// IDs canônicos (levantados na Onda 1)
const P_VENDAS = 14033351;
const S_INCOMING = 108316527;
const S_NOVO_LEAD = 108316683;
const S_QUALIFICADO = 108316687;
const S_PERDIDO = 143;

if (!TOKEN) {
  console.error("erro: env KOMMO_ROSIE_ACCESS_TOKEN ausente");
  process.exit(1);
}
if (!CSV_PATH) {
  console.error("erro: --csv <path> obrigatório");
  process.exit(1);
}
if (LIVE && !CONFIRM) {
  console.error("erro: --live exige CONFIRM_KOMMO_WRITE=yes-i-know");
  process.exit(1);
}

if (!existsSync(dirname(LOG))) mkdirSync(dirname(LOG), { recursive: true });

function log(msg: string) {
  const line = `${new Date().toISOString()} ${msg}`;
  console.log(line);
  appendFileSync(LOG, line + "\n");
}

// -------------------- csv parser (simples) --------------------

interface CsvRow {
  id: number;
  destino: "novo-lead" | "qualificado" | "perdido" | "pular";
  motivo?: string;
}

function parseCsv(text: string): CsvRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length === 0) return [];
  const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const idxId = header.indexOf("id");
  const idxDest = header.indexOf("destino");
  const idxMotivo = header.indexOf("motivo");
  if (idxId === -1 || idxDest === -1) {
    throw new Error("CSV deve ter colunas 'id' e 'destino'");
  }
  const out: CsvRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",");
    const id = Number(cols[idxId]?.trim());
    const destino = (cols[idxDest]?.trim() ?? "").toLowerCase() as CsvRow["destino"];
    if (!Number.isFinite(id) || !destino) continue;
    if (!["novo-lead", "qualificado", "perdido", "pular"].includes(destino)) {
      log(`  ⚠ linha ${i + 1} destino inválido: ${destino!} (skip)`);
      continue;
    }
    out.push({
      id,
      destino,
      motivo: idxMotivo > -1 ? cols[idxMotivo]?.trim() : undefined,
    });
  }
  return out;
}

// -------------------- kommo api --------------------

async function patchLead(
  leadId: number,
  statusId: number,
  motivo?: string,
): Promise<{ status: number; body: string }> {
  const body: Record<string, unknown> = {
    pipeline_id: P_VENDAS,
    status_id: statusId,
  };
  if (motivo) {
    body._embedded = {
      tags: [{ name: motivo.slice(0, 40) }],
    };
  }

  if (!LIVE) {
    return { status: 200, body: "[dry-run]" };
  }
  const res = await fetch(`${BASE}/leads/${leadId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return { status: res.status, body: await res.text() };
}

// -------------------- main --------------------

async function main() {
  log("======================================================");
  log(`Migração Incoming leads — modo: ${LIVE ? "LIVE" : "DRY-RUN"}`);
  log(`CSV: ${CSV_PATH}`);
  log("======================================================");

  const csv = readFileSync(CSV_PATH, "utf8");
  const rows = parseCsv(csv);
  log(`Total de linhas válidas: ${rows.length}`);

  const buckets = { "novo-lead": 0, qualificado: 0, perdido: 0, pular: 0 };
  for (const r of rows) buckets[r.destino]++;
  log(
    `Distribuição: novo-lead=${buckets["novo-lead"]}, qualificado=${buckets.qualificado}, perdido=${buckets.perdido}, pular=${buckets.pular}`,
  );

  const statusMap: Record<CsvRow["destino"], number | null> = {
    "novo-lead": S_NOVO_LEAD,
    qualificado: S_QUALIFICADO,
    perdido: S_PERDIDO,
    pular: null,
  };

  let ok = 0;
  let fail = 0;
  let skipped = 0;

  for (const row of rows) {
    const targetStatus = statusMap[row.destino];
    if (targetStatus === null) {
      skipped++;
      continue;
    }
    const { status } = await patchLead(row.id, targetStatus, row.motivo);
    if (status < 300) {
      ok++;
      log(`  ✓ #${row.id} → ${row.destino}`);
    } else {
      fail++;
      log(`  ✗ #${row.id} HTTP ${status}`);
    }
    // rate limit: 7 req/s → 143ms sleep (folga)
    await new Promise((r) => setTimeout(r, 150));
  }

  log("======================================================");
  log(`Resultado: ok=${ok} fail=${fail} skipped=${skipped}`);
  log("======================================================");
}

main().catch((err) => {
  log(`ERRO FATAL: ${err.message}`);
  process.exit(1);
});
