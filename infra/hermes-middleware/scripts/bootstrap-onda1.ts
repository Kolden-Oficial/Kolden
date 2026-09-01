#!/usr/bin/env tsx
/**
 * Bootstrap Onda 1 — Kommo Rosie
 *
 * Cria os 11 custom fields, 9 tags, refatora pipelines existentes e cria
 * o Pipeline 3 (Carrinho Abandonado) na conta rosie.kommo.com.
 *
 * Modo default: DRY-RUN (só imprime o plano, não toca na API).
 * Modo real: --live + CONFIRM_KOMMO_WRITE=yes-i-know
 *
 * Uso:
 *   # dry-run (default, seguro)
 *   infisical run --projectId=… --env=prod -- tsx scripts/bootstrap-onda1.ts
 *
 *   # live (irreversível — muda o estado da conta)
 *   CONFIRM_KOMMO_WRITE=yes-i-know infisical run --projectId=… --env=prod -- \
 *     tsx scripts/bootstrap-onda1.ts --live
 *
 * Requisitos:
 *   env KOMMO_ROSIE_SUBDOMAIN, KOMMO_ROSIE_ACCESS_TOKEN
 *
 * Referências:
 *   plano `C:/Users/Ronan Silva/.claude/plans/maravilha-eu-recebi-a-twinkling-cat.md`
 *   spec `Rosie_Kommo_Build_Spec.xlsx` (Google Drive)
 *   levantamento `sobre-a-empresa/Ferramentas/Kommo/rosie-conta-atual.md`
 */

import { appendFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname } from "node:path";

const LIVE = process.argv.includes("--live");
const CONFIRM = process.env.CONFIRM_KOMMO_WRITE === "yes-i-know";
const SUBDOMAIN = process.env.KOMMO_ROSIE_SUBDOMAIN ?? "rosie";
const TOKEN = process.env.KOMMO_ROSIE_ACCESS_TOKEN ?? process.env.TOKEN;
const BASE = `https://${SUBDOMAIN}.kommo.com/api/v4`;
const LOG = "logs/rosie-onda1.log";

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
    log(`[dry-run] ${method} ${url}${body ? " body=" + JSON.stringify(body) : ""}`);
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
    // 204 sem corpo
  }
  return { status: res.status, data };
}

// =========================================================================
// Passo 1 — Custom fields em leads (11 novos)
// =========================================================================

interface FieldSpec {
  name: string;
  type: "text" | "numeric" | "select" | "date" | "multiselect" | "checkbox";
  enums?: string[];
}

const CUSTOM_FIELDS_LEADS: FieldSpec[] = [
  { name: "Nº Pedido Nuvemshop", type: "text" },
  { name: "CPF", type: "text" },
  { name: "E-mail da compra", type: "text" },
  { name: "Data aproximada da compra", type: "date" },
  { name: "E-mail (lead)", type: "text" },
  {
    name: "Como conheceu a loja",
    type: "select",
    enums: ["Instagram", "TikTok", "Indicação", "Google", "Outro"],
  },
  { name: "Peça de interesse", type: "text" },
  { name: "Tamanho", type: "text" },
  { name: "Cor", type: "text" },
  {
    name: "Motivo do contato",
    type: "select",
    enums: [
      "Comprar",
      "Rastreio",
      "Atraso",
      "Item errado ou faltando",
      "Defeito",
      "Troca",
      "Devolução",
      "Cancelamento",
      "Outro",
    ],
  },
  {
    name: "Titular da compra",
    type: "select",
    enums: ["Própria", "Outra pessoa"],
  },
  { name: "Valor aproximado do carrinho", type: "numeric" },
];

async function createCustomFieldsLeads() {
  log("=== 1. Custom fields em leads ===");
  const { status, data } = await api<{
    _embedded: { custom_fields: Array<{ name: string; id: number }> };
  }>("GET", "/leads/custom_fields?limit=250");
  const existing = new Set(
    (data?._embedded?.custom_fields ?? []).map((f) => f.name),
  );
  log(`  já existem ${existing.size} custom fields em leads`);

  for (const field of CUSTOM_FIELDS_LEADS) {
    if (existing.has(field.name)) {
      log(`  ⊘ skip (já existe): ${field.name}`);
      continue;
    }
    const body: Record<string, unknown> = {
      name: field.name,
      type: field.type,
    };
    if (field.enums) {
      body.enums = field.enums.map((v, i) => ({ value: v, sort: i * 10 + 10 }));
    }
    const { status: cs, data: cd } = await api<{
      _embedded: { custom_fields: Array<{ id: number; name: string }> };
    }>("POST", "/leads/custom_fields", [body]);
    if (cs === 200 || cs === 201) {
      const created = cd?._embedded?.custom_fields?.[0];
      log(`  ✓ criado: #${created?.id ?? "?"} ${field.name} (type=${field.type})`);
    } else {
      log(`  ✗ falha: ${field.name} → HTTP ${cs}`);
    }
  }
}

// =========================================================================
// Passo 2 — Tags em leads (9)
// =========================================================================

const TAGS_LEADS = [
  "venda",
  "pos-venda",
  "troca",
  "defeito",
  "devolucao",
  "cancelamento",
  "lista-reposicao",
  "carrinho-abandonado",
  "aguardando-transportadora",
];

async function createTagsLeads() {
  log("=== 2. Tags em leads ===");
  const { data } = await api<{
    _embedded: { tags: Array<{ name: string; id: number }> };
  }>("GET", "/leads/tags?limit=250");
  const existing = new Set(
    (data?._embedded?.tags ?? []).map((t) => t.name.toLowerCase()),
  );

  for (const name of TAGS_LEADS) {
    if (existing.has(name.toLowerCase())) {
      log(`  ⊘ skip (já existe): ${name}`);
      continue;
    }
    const { status: cs, data: cd } = await api<{
      _embedded: { tags: Array<{ id: number; name: string }> };
    }>("POST", "/leads/tags", [{ name }]);
    if (cs === 200 || cs === 201) {
      const created = cd?._embedded?.tags?.[0];
      log(`  ✓ criado: #${created?.id ?? "?"} ${name}`);
    } else {
      log(`  ✗ falha: ${name} → HTTP ${cs}`);
    }
  }
}

// =========================================================================
// Passo 3 — Refactor Pipeline 14033351 (Vendas)
// =========================================================================

async function refactorPipelineVendas() {
  log("=== 3. Refactor Pipeline 14033351 (Vendas) ===");
  const { data } = await api<{
    _embedded: {
      statuses: Array<{ id: number; name: string; sort: number }>;
    };
  }>("GET", "/leads/pipelines/14033351/statuses");
  const statuses = data?._embedded?.statuses ?? [];
  log(`  stages: ${statuses.map((s) => `#${s.id}=${JSON.stringify(s.name)}`).join(", ")}`);

  // Renomear "Carrinho Enviado" → "Carrinho enviado / aguardando pagamento"
  const carrinho = statuses.find((s) => s.name.trim() === "Carrinho Enviado");
  if (carrinho) {
    const { status: rs } = await api(
      "PATCH",
      `/leads/pipelines/14033351/statuses/${carrinho.id}`,
      { name: "Carrinho enviado / aguardando pagamento" },
    );
    log(
      rs < 300
        ? `  ✓ renomeado stage #${carrinho.id}: Carrinho Enviado → …/aguardando pagamento`
        : `  ✗ falha renomear #${carrinho.id}: HTTP ${rs}`,
    );
  }

  // DELETE "Etapa de leads de entrada" (PT) OU "Incoming leads" (EN) — CUIDADO: pode ter leads
  const entradaNames = ["Etapa de leads de entrada", "Incoming leads"];
  const entrada = statuses.find((s) => entradaNames.includes(s.name.trim()));
  if (entrada) {
    const check = await api<{ _embedded: { leads: unknown[] } }>(
      "GET",
      `/leads?filter[status_id]=${entrada.id}&limit=1`,
    );
    const hasLeads =
      check.status === 200 &&
      (check.data?._embedded?.leads?.length ?? 0) > 0;
    if (hasLeads) {
      log(
        `  ⚠ stage "Etapa de leads de entrada" (#${entrada.id}) TEM LEADS — pular delete e reportar para migração manual (Onda 1 humana)`,
      );
    } else {
      const { status: ds } = await api(
        "DELETE",
        `/leads/pipelines/14033351/statuses/${entrada.id}`,
      );
      log(
        ds < 300
          ? `  ✓ deletado stage #${entrada.id} (Etapa de leads de entrada)`
          : `  ✗ falha delete #${entrada.id}: HTTP ${ds}`,
      );
    }
  }
}

// =========================================================================
// Passo 4 — Refactor Pipeline 14171615 (Pós-Venda) — vazio, refactor livre
// =========================================================================

async function refactorPipelinePosVenda() {
  log("=== 4. Refactor Pipeline 14171615 (Pós-Venda) ===");
  const { data } = await api<{
    _embedded: {
      statuses: Array<{ id: number; name: string; sort: number }>;
    };
  }>("GET", "/leads/pipelines/14171615/statuses");
  const statuses = data?._embedded?.statuses ?? [];
  log(`  stages: ${statuses.map((s) => `#${s.id}=${JSON.stringify(s.name)}`).join(", ")}`);

  // Como pipeline está vazio, delete direto
  const entradaNames = ["Etapa de leads de entrada", "Incoming leads"];
  const targets = [{ names: entradaNames, label: "entrada" }, { names: ["Perdido"], label: "Perdido" }];
  for (const target of targets) {
    const st = statuses.find((s) => target.names.includes(s.name.trim()));
    if (!st) {
      log(`  ⊘ stage "${target.label}" não encontrado (nada a fazer)`);
      continue;
    }
    // status_id 143 (Perdido) e 142 (Ganho/Resolvido) são padrão do sistema
    if (st.id === 143 || st.id === 142) {
      log(`  ⊘ stage "${target.label}" (#${st.id}) é padrão do sistema, não pode deletar`);
      continue;
    }
    const { status: ds } = await api(
      "DELETE",
      `/leads/pipelines/14171615/statuses/${st.id}`,
    );
    log(
      ds < 300
        ? `  ✓ deletado stage #${st.id} (${target.label})`
        : `  ✗ falha delete #${st.id}: HTTP ${ds}`,
    );
  }
}

// =========================================================================
// Passo 5 — Renomear Pipeline 14034623 (Recuperação → Recuperação / Logística)
// =========================================================================

async function renamePipelineRecuperacao() {
  log("=== 5. Rename Pipeline 14034623 (Recuperação → Recuperação / Logística) ===");
  const { status: rs } = await api(
    "PATCH",
    "/leads/pipelines/14034623",
    { name: "Recuperação / Logística" },
  );
  log(
    rs < 300
      ? "  ✓ renomeado"
      : `  ✗ falha rename: HTTP ${rs}`,
  );
}

// =========================================================================
// Passo 6 — Criar Pipeline "Carrinho Abandonado" (5 stages)
// =========================================================================

async function createPipelineCarrinho() {
  log("=== 6. Criar Pipeline 'Carrinho Abandonado' ===");
  const { data: existing } = await api<{
    _embedded: { pipelines: Array<{ id: number; name: string }> };
  }>("GET", "/leads/pipelines");
  const already = (existing?._embedded?.pipelines ?? []).find(
    (p) => p.name === "Carrinho Abandonado",
  );
  if (already) {
    log(`  ⊘ já existe pipeline "Carrinho Abandonado" #${already.id}`);
    return;
  }

  const { status: ps, data: pd } = await api<{
    _embedded: { pipelines: Array<{ id: number; name: string }> };
  }>("POST", "/leads/pipelines", [
    {
      name: "Carrinho Abandonado",
      sort: 40,
      is_main: false,
      _embedded: {
        statuses: [
          { name: "Carrinho abandonado", sort: 10, color: "#FFCC66" },
          { name: "Abordado", sort: 20, color: "#FFEEC1" },
          { name: "Reengajou", sort: 30, color: "#D6EAF7" },
        ],
      },
    },
  ]);
  const newP = pd?._embedded?.pipelines?.[0];
  if (!LIVE) {
    log(
      `  ✓ [dry-run] criaria pipeline "Carrinho Abandonado" com 3 stages iniciais + 142 (Recuperado) + 143 (Perdido) automáticos`,
    );
    log(
      `  ℹ terminais 142/143 renomear via UI para "Recuperado" e "Perdido" pós-criação`,
    );
    return;
  }
  if (ps < 300 && newP) {
    log(`  ✓ criado pipeline #${newP.id} "Carrinho Abandonado"`);
    log(
      `  ℹ etapas terminais 142/143 renomear via UI para "Recuperado" e "Perdido"`,
    );
  } else {
    log(`  ✗ falha criar pipeline: HTTP ${ps}`);
  }
}

// =========================================================================
// Main
// =========================================================================

async function main() {
  log("======================================================");
  log(`Bootstrap Onda 1 — modo: ${LIVE ? "LIVE (irreversível)" : "DRY-RUN"}`);
  log(`Base URL: ${BASE}`);
  log("======================================================");

  await createCustomFieldsLeads();
  await createTagsLeads();
  await refactorPipelineVendas();
  await refactorPipelinePosVenda();
  await renamePipelineRecuperacao();
  await createPipelineCarrinho();

  log("======================================================");
  log("Bootstrap Onda 1 concluído.");
  log(
    LIVE
      ? "Rodar smoke test manualmente antes de prosseguir para Onda 2."
      : "Rodar com --live + CONFIRM_KOMMO_WRITE=yes-i-know para aplicar de fato.",
  );
  log("======================================================");
}

main().catch((err) => {
  log(`ERRO FATAL: ${err.message}`);
  process.exit(1);
});
