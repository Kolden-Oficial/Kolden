#!/usr/bin/env node
// Eval harness — lê perguntas.yaml, executa contra o servidor stdio, valida cada caso.
// Saída: tabela de PASS/FAIL/WARN + código de saída 0 (todos passaram) ou 1.

import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load as parseYaml } from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BIN = resolve(__dirname, "..", "dist", "index.js");
const PERGUNTAS_YAML = resolve(__dirname, "perguntas.yaml");
const FIXTURE_REACT = resolve(__dirname, "fixtures", "projeto-react");

function substituirPlaceholders(obj) {
  if (typeof obj === "string") return obj.replaceAll("{{FIXTURE_REACT}}", FIXTURE_REACT);
  if (Array.isArray(obj)) return obj.map(substituirPlaceholders);
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) out[k] = substituirPlaceholders(v);
    return out;
  }
  return obj;
}

async function carregarPerguntas() {
  const raw = await readFile(PERGUNTAS_YAML, "utf-8");
  const doc = parseYaml(raw);
  return doc.perguntas.map(substituirPlaceholders);
}

function parsePayloadTexto(resp) {
  const text = resp?.result?.content?.[0]?.text;
  if (typeof text !== "string") return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function getCaminho(obj, path) {
  let cur = obj;
  for (const p of path) {
    if (cur && typeof cur === "object" && p in cur) cur = cur[p];
    else return undefined;
  }
  return cur;
}

function valida(pergunta, resp) {
  const { espera } = pergunta;
  const isError = resp?.result?.isError === true;
  const payload = parsePayloadTexto(resp);

  if (espera.tipo === "erro") {
    if (!isError) return { ok: false, motivo: "esperava erro, recebeu sucesso" };
    if (espera.codigo) {
      const codigo = payload?.erro?.codigo;
      if (codigo !== espera.codigo)
        return { ok: false, motivo: `esperava codigo='${espera.codigo}', recebeu '${codigo}'` };
    }
    return { ok: true };
  }

  if (espera.tipo === "ok_ou_erro") {
    if (isError) {
      const codigo = payload?.erro?.codigo;
      if (espera.codigos_erro_aceitos?.includes(codigo)) return { ok: true };
      return { ok: false, motivo: `erro com codigo='${codigo}' fora dos aceitos` };
    }
    // sucesso — valida ids esperados
    if (espera.payload_ids_aceitos) {
      const ids = (payload?.diagnosticos_ranqueados ?? []).map((d) => d.id);
      const algum = espera.payload_ids_aceitos.some((id) => ids.includes(id));
      const id_principal = payload?.diagnostico_principal;
      if (!algum && !espera.payload_ids_aceitos.includes(id_principal))
        return {
          ok: false,
          motivo: `nenhum id aceito ${JSON.stringify(espera.payload_ids_aceitos)} bateu; recebido principal='${id_principal}', lista=${JSON.stringify(ids)}`,
        };
    }
    return { ok: true };
  }

  // tipo === "ok"
  if (isError) return { ok: false, motivo: `esperava sucesso, recebeu erro: ${JSON.stringify(payload?.erro)}` };
  if (!payload) return { ok: false, motivo: "payload não pôde ser parseado" };

  for (const campo of espera.payload_tem ?? []) {
    if (!(campo in payload))
      return { ok: false, motivo: `payload não contém campo '${campo}'` };
  }

  if (espera.payload_score_range) {
    const [min, max] = espera.payload_score_range;
    if (typeof payload.score !== "number" || payload.score < min || payload.score > max)
      return { ok: false, motivo: `score ${payload.score} fora de [${min},${max}]` };
  }

  if (espera.payload_gaps_min !== undefined) {
    const gaps = payload.gaps_criticos ?? [];
    if (gaps.length < espera.payload_gaps_min)
      return { ok: false, motivo: `gaps=${gaps.length} < min=${espera.payload_gaps_min}` };
  }

  if (espera.payload_extensoes_inclui) {
    const cands = [
      payload.extensoes,
      payload.arquivos?.["extensions.json"]?.recommendations,
      payload.patches?.[".vscode/extensions.json"]?.recommendations,
    ].find((x) => Array.isArray(x));
    if (!cands)
      return { ok: false, motivo: "nenhuma lista de extensões encontrada no payload" };
    const lista = cands.map(String);
    for (const ext of espera.payload_extensoes_inclui) {
      if (!lista.includes(ext))
        return { ok: false, motivo: `extensões esperadas faltando: '${ext}' (lista=${JSON.stringify(lista)})` };
    }
  }

  if (espera.payload_ids_inclui) {
    const ids = (payload.diagnosticos_ranqueados ?? []).map((d) => d.id);
    for (const id of espera.payload_ids_inclui) {
      if (!ids.includes(id))
        return { ok: false, motivo: `id esperado '${id}' não está em ${JSON.stringify(ids)}` };
    }
  }

  if (espera.payload_snippets_inclui) {
    const snippets = getCaminho(payload, ["snippets", "snippets_por_stack"]);
    if (!snippets || typeof snippets !== "object")
      return { ok: false, motivo: "snippets_por_stack ausente no payload" };
    for (const prefixo of espera.payload_snippets_inclui) {
      if (!(prefixo in snippets))
        return { ok: false, motivo: `snippet '${prefixo}' ausente; presentes: ${Object.keys(snippets).join(",")}` };
    }
  }

  if (espera.payload_hook_ferramenta) {
    const ferramenta = getCaminho(payload, ["hooks", "ferramenta"]);
    if (ferramenta !== espera.payload_hook_ferramenta)
      return { ok: false, motivo: `hook ferramenta='${ferramenta}', esperada='${espera.payload_hook_ferramenta}'` };
  }

  if (espera.payload_extensao) {
    const ext = getCaminho(payload, ["extensao_recomendada", "id"]);
    if (ext !== espera.payload_extensao)
      return { ok: false, motivo: `extensao_recomendada.id='${ext}', esperada='${espera.payload_extensao}'` };
  }

  return { ok: true };
}

async function rodar() {
  const perguntas = await carregarPerguntas();
  const proc = spawn("node", [BIN], { stdio: ["pipe", "pipe", "pipe"] });
  let buffer = "";
  const pendentes = new Map();

  proc.stdout.on("data", (chunk) => {
    buffer += chunk.toString("utf-8");
    let idx;
    while ((idx = buffer.indexOf("\n")) >= 0) {
      const linha = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (!linha) continue;
      try {
        const resp = JSON.parse(linha);
        const cb = pendentes.get(resp.id);
        if (cb) {
          cb(resp);
          pendentes.delete(resp.id);
        }
      } catch (err) {
        console.error("Falha parsear resposta:", linha, err);
      }
    }
  });

  proc.stderr.on("data", (chunk) => {
    process.stderr.write("[stderr] " + chunk.toString("utf-8"));
  });

  async function chamar(id, method, params) {
    return new Promise((resolve) => {
      pendentes.set(id, resolve);
      proc.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
    });
  }

  // 1. initialize
  const init = await chamar(0, "initialize", {
    protocolVersion: "2024-11-05",
    capabilities: {},
    clientInfo: { name: "vscode-coach-eval", version: "0.1.0" },
  });
  if (init?.result?.serverInfo?.name !== "vscode-coach") {
    console.error("FALHA NO INITIALIZE:", JSON.stringify(init));
    proc.kill();
    process.exit(2);
  }

  // 2. cada pergunta
  const resultados = [];
  let id = 100;
  for (const p of perguntas) {
    id += 1;
    const resp = await chamar(id, "tools/call", {
      name: p.tool,
      arguments: p.argumentos,
    });
    const v = valida(p, resp);
    resultados.push({ id: p.id, descricao: p.descricao, ok: v.ok, motivo: v.motivo ?? "" });
    const marca = v.ok ? "PASS" : "FAIL";
    console.log(`${marca}  ${p.id}  —  ${p.descricao}`);
    if (!v.ok) console.log(`        ${v.motivo}`);
  }

  proc.stdin.end();
  proc.kill();

  const pass = resultados.filter((r) => r.ok).length;
  const total = resultados.length;
  console.log(`\n=== ${pass}/${total} testes passaram ===`);

  if (pass !== total) {
    console.log("\nFalhas:");
    for (const r of resultados.filter((x) => !x.ok)) {
      console.log(`  - ${r.id}: ${r.motivo}`);
    }
  }
  process.exit(pass === total ? 0 : 1);
}

rodar().catch((err) => {
  console.error("Falha do harness:", err);
  process.exit(2);
});
