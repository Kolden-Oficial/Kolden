#!/usr/bin/env tsx
/**
 * Bootstrap Onda 3 — Kommo Rosie
 *
 * Aplica na conta rosie.kommo.com:
 *   1. Deleta template de teste (se houver — rosie_test)
 *   2. Cria os 7 templates de mensagem proativos (MA5.2/5.3/5.4, MC.1/2, MR.1/2)
 *      via POST /api/v4/chats/templates
 *   3. Opcional: registra webhook Kommo → Hermes middleware (só se HERMES_MW_URL definido)
 *   4. Lista talks (conversas) existentes para diagnóstico
 *
 * Templates são criados como "type=amocrm" (Kommo interno). Para virarem WhatsApp
 * templates aprovados pela Meta, precisam campos waba_* preenchidos + moderação
 * (via UI Kommo → Chats → WhatsApp → Templates → "Enviar para moderação").
 *
 * Uso:
 *   # dry-run (default)
 *   infisical run --projectId=… --env=prod -- tsx scripts/bootstrap-onda3.ts
 *
 *   # live
 *   CONFIRM_KOMMO_WRITE=yes-i-know infisical run --projectId=… --env=prod -- \
 *     tsx scripts/bootstrap-onda3.ts --live
 *
 * Env vars:
 *   KOMMO_ROSIE_SUBDOMAIN, KOMMO_ROSIE_ACCESS_TOKEN (obrigatórios)
 *   HERMES_MW_URL (opcional — se definido, registra webhook)
 *   KOMMO_WEBHOOK_SECRET (opcional — para query string do webhook)
 */

import { appendFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname } from "node:path";

const LIVE = process.argv.includes("--live");
const CONFIRM = process.env.CONFIRM_KOMMO_WRITE === "yes-i-know";
const SUBDOMAIN = process.env.KOMMO_ROSIE_SUBDOMAIN ?? "rosie";
const TOKEN = process.env.KOMMO_ROSIE_ACCESS_TOKEN ?? process.env.TOKEN;
const BASE = `https://${SUBDOMAIN}.kommo.com/api/v4`;
const HERMES_URL = process.env.HERMES_MW_URL;
const WEBHOOK_SECRET = process.env.KOMMO_WEBHOOK_SECRET;
const LOG = "logs/rosie-onda3.log";

if (!TOKEN) {
  console.error("erro: env KOMMO_ROSIE_ACCESS_TOKEN ausente");
  process.exit(1);
}
if (LIVE && !CONFIRM) {
  console.error("erro: --live exige CONFIRM_KOMMO_WRITE=yes-i-know no ambiente");
  process.exit(1);
}

if (!existsSync(dirname(LOG))) mkdirSync(dirname(LOG), { recursive: true });

function log(msg: string) {
  const line = `${new Date().toISOString()} ${msg}`;
  console.log(line);
  appendFileSync(LOG, line + "\n");
}

async function api<T = unknown>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  path: string,
  body?: unknown,
): Promise<{ status: number; data: T | null }> {
  const url = `${BASE}${path}`;
  if (!LIVE && method !== "GET") {
    log(`[dry-run] ${method} ${url}${body ? " body=" + JSON.stringify(body).slice(0, 120) : ""}`);
    return { status: 200, data: null };
  }
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data: T | null = null;
  try {
    data = text ? (JSON.parse(text) as T) : null;
  } catch {
    /* 204 sem corpo */
  }
  return { status: res.status, data };
}

// =========================================================================
// Templates WhatsApp — 7 templates proativos
// =========================================================================

interface TemplateSpec {
  name: string;
  content: string;
  category: "MARKETING" | "UTILITY";
  buttons?: Array<{ type: "url" | "quick_reply" | "phone"; text: string; url?: string }>;
}

const TEMPLATES: TemplateSpec[] = [
  {
    name: "rosie_carrinho_followup_2h",
    category: "MARKETING",
    content:
      "Oi, {{1}}! Seu carrinho ainda tá te esperando 💛\n\n👉 {{2}}\n\nFicou com alguma dúvida?",
  },
  {
    name: "rosie_carrinho_followup_24h",
    category: "MARKETING",
    content:
      "Oi, {{1}}! Passando só pra avisar: a {{2}} no tamanho {{3}} está com poucas unidades.\n\nSe ainda quiser, seu carrinho continua aqui 👉 {{4}}",
  },
  {
    name: "rosie_carrinho_followup_72h",
    category: "MARKETING",
    content:
      "Oi, {{1}}! Não quero insistir 💛\n\nVou deixar seu carrinho salvo. Se mudar de ideia, é só me chamar — tô por aqui.",
  },
  {
    name: "rosie_recuperacao_1h",
    category: "MARKETING",
    content:
      "Oi, {{1}}! Vi que você deixou a {{2}} no carrinho lá na Rosie 💛\n\nEla ainda tá te esperando. Quer que eu te ajude a finalizar?",
  },
  {
    name: "rosie_recuperacao_24h",
    category: "MARKETING",
    content:
      "Oi, {{1}}! Sua {{2}} ainda tá guardada ✨\n\nPra facilitar, separei {{3}} pra você fechar hoje: 👉 {{4}}",
  },
  {
    name: "rosie_reativacao_24h",
    category: "UTILITY",
    content:
      "Oi, {{1}}! Ainda tô esperando {{2}} pra conseguir seguir com seu atendimento 💛",
  },
  {
    name: "rosie_reativacao_72h_encerrar",
    category: "UTILITY",
    content:
      "Oi, {{1}}! Como não consegui o que precisava, vou pausar seu atendimento por aqui.\n\nMas fica tranquila: é só me responder que a gente retoma na hora 💛",
  },
];

async function cleanupTestTemplates() {
  log("=== 0. Cleanup templates de teste ===");
  const { status, data } = await api<{
    _embedded: { chat_templates: Array<{ id: number; name: string }> };
  }>("GET", "/chats/templates?limit=250");
  if (status !== 200) return;
  const testT = (data?._embedded?.chat_templates ?? []).filter(
    (t) => t.name === "rosie_test" || t.name.startsWith("rosie_test_"),
  );
  for (const t of testT) {
    const { status: ds } = await api("DELETE", `/chats/templates/${t.id}`);
    log(ds < 300 ? `  ✓ deletado template teste #${t.id}` : `  ✗ falha delete #${t.id}: HTTP ${ds}`);
  }
}

async function createTemplates() {
  log("=== 1. Criar templates WhatsApp (proativos) ===");
  const { status, data } = await api<{
    _embedded: { chat_templates: Array<{ id: number; name: string }> };
  }>("GET", "/chats/templates?limit=250");
  const existing = new Set(
    (data?._embedded?.chat_templates ?? []).map((t) => t.name),
  );
  log(`  já existem ${existing.size} chat_templates`);

  for (const t of TEMPLATES) {
    if (existing.has(t.name)) {
      log(`  ⊘ skip (já existe): ${t.name}`);
      continue;
    }
    const body: Record<string, unknown> = {
      name: t.name,
      content: t.content,
    };
    const { status: cs, data: cd } = await api<{
      _embedded: { chat_templates: Array<{ id: number; name: string }> };
    }>("POST", "/chats/templates", [body]);
    if (cs === 200 || cs === 201) {
      const created = cd?._embedded?.chat_templates?.[0];
      log(`  ✓ criado #${created?.id ?? "?"} ${t.name} (${t.category})`);
    } else {
      log(`  ✗ falha ${t.name}: HTTP ${cs}`);
    }
  }
}

// =========================================================================
// Webhook Kommo → Hermes middleware
// =========================================================================

async function registerWebhook() {
  log("=== 2. Registrar webhook Kommo → Hermes middleware ===");
  if (!HERMES_URL) {
    log("  ⊘ HERMES_MW_URL não definido — pulando (rodar de novo depois do deploy Railway)");
    return;
  }
  const destinationBase = HERMES_URL.replace(/\/$/, "") + "/kommo/webhook";
  const destination = WEBHOOK_SECRET
    ? `${destinationBase}?secret=${encodeURIComponent(WEBHOOK_SECRET)}`
    : destinationBase;

  const { data: existing } = await api<{
    _embedded: { webhooks: Array<{ id: number; destination: string; settings: string[] }> };
  }>("GET", "/webhooks");
  const already = (existing?._embedded?.webhooks ?? []).find((w) =>
    w.destination.startsWith(destinationBase),
  );
  if (already) {
    log(`  ⊘ webhook Hermes já registrado #${already.id}`);
    return;
  }

  const events = ["add_message", "add_outgoing_message", "status_lead", "add_lead"];
  const { status: ps } = await api("POST", "/webhooks", {
    destination,
    settings: events,
  });
  log(
    ps < 300
      ? `  ✓ webhook registrado (${destination.split("?")[0]}) events=${events.join(",")}`
      : `  ✗ falha registrar webhook: HTTP ${ps}`,
  );
}

// =========================================================================
// Diagnóstico — talks e conversas atuais
// =========================================================================

async function diagnostico() {
  log("=== 3. Diagnóstico — talks e conversas ===");
  // /api/v4/chats/talks? tentativas plurais
  for (const path of ["/chats/talks?limit=5", "/chats?limit=5"]) {
    const { status, data } = await api<{ _embedded?: { talks?: unknown[] } }>(
      "GET",
      path,
    );
    log(`  ${path} → HTTP ${status}${data?._embedded?.talks ? " talks=" + data._embedded.talks.length : ""}`);
  }
}

// =========================================================================
// Main
// =========================================================================

async function main() {
  log("======================================================");
  log(`Bootstrap Onda 3 — modo: ${LIVE ? "LIVE" : "DRY-RUN"}`);
  log(`Base URL: ${BASE}`);
  log(`Hermes URL: ${HERMES_URL ?? "(não definido — webhook não será registrado)"}`);
  log("======================================================");

  await cleanupTestTemplates();
  await createTemplates();
  await registerWebhook();
  await diagnostico();

  log("======================================================");
  log("Bootstrap Onda 3 concluído.");
  log("======================================================");
}

main().catch((err) => {
  log(`ERRO FATAL: ${err.message}`);
  process.exit(1);
});
