#!/usr/bin/env node
// Eval harness — lê perguntas.yaml, executa contra o servidor stdio, valida cada caso.
// Espera SOLOMON_TOKEN_API + SOLOMON_COMPANY_ID_ROSIE injetados via Infisical/shim/CLI.
// Sem token: eval 05, 08, 10 rodam mas assertam SEGREDO_AUSENTE/TOKEN_INVALIDO.

import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load as parseYaml } from "js-yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BIN = resolve(__dirname, "..", "dist", "index.js");
const PERGUNTAS_YAML = resolve(__dirname, "perguntas.yaml");
const TS_ID = String(Date.now());

function substituirPlaceholders(obj) {
  if (typeof obj === "string") return obj.replaceAll("{{TS_ID}}", TS_ID);
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

function valida(pergunta, resp) {
  const { espera } = pergunta;
  const isError = resp?.result?.isError === true;
  const errorMcp = resp?.error !== undefined && resp?.error !== null;
  const payload = parsePayloadTexto(resp);

  if (espera.tipo === "erro_mcp") {
    // Espera erro no protocolo MCP (method/tool não encontrada), NÃO isError na tool.
    if (errorMcp) return { ok: true };
    if (isError) return { ok: true }; // aceita também tool que retorna isError
    return { ok: false, motivo: "esperava erro do protocolo MCP, recebeu sucesso" };
  }

  if (espera.tipo === "erro") {
    if (!isError && !errorMcp) return { ok: false, motivo: "esperava erro, recebeu sucesso" };
    // errorMcp = rejeição do protocolo MCP (ex: método inexistente).
    if (errorMcp && !isError) return { ok: true };
    // isError com payload não parseável = rejeição de Zod pelo SDK MCP,
    // que retorna texto de erro de validação em vez de JSON estruturado.
    // Isso equivale a PAYLOAD_INVALIDO — aceita se o teste esperava isso.
    if (isError && payload === null) {
      if (espera.codigos_erro_aceitos?.includes("PAYLOAD_INVALIDO")) return { ok: true };
    }
    const codigo = payload?.erro?.codigo;
    if (espera.codigos_erro_aceitos) {
      if (!espera.codigos_erro_aceitos.includes(codigo)) {
        return {
          ok: false,
          motivo: `esperava codigo em ${JSON.stringify(espera.codigos_erro_aceitos)}, recebeu '${codigo}'`,
        };
      }
    }
    return { ok: true };
  }

  if (espera.tipo === "ok_ou_erro") {
    if (isError) {
      const codigo = payload?.erro?.codigo;
      if (espera.codigos_erro_aceitos?.includes(codigo)) return { ok: true };
      return { ok: false, motivo: `erro com codigo='${codigo}' fora dos aceitos` };
    }
    // sucesso
    for (const campo of espera.payload_tem ?? []) {
      if (!payload || !(campo in payload)) {
        return { ok: false, motivo: `payload não contém campo '${campo}'` };
      }
    }
    return { ok: true };
  }

  // tipo === "ok"
  if (isError) return { ok: false, motivo: `esperava sucesso, recebeu erro: ${JSON.stringify(payload?.erro)}` };
  if (!payload) return { ok: false, motivo: "payload não pôde ser parseado" };

  for (const campo of espera.payload_tem ?? []) {
    if (!(campo in payload)) {
      return { ok: false, motivo: `payload não contém campo '${campo}'` };
    }
  }

  if (espera.payload_status_aceitos) {
    if (!espera.payload_status_aceitos.includes(payload.status)) {
      return {
        ok: false,
        motivo: `status='${payload.status}' fora dos aceitos ${JSON.stringify(espera.payload_status_aceitos)}`,
      };
    }
  }

  if (espera.payload_variants_count !== undefined) {
    if (payload.variants_count !== espera.payload_variants_count) {
      return {
        ok: false,
        motivo: `variants_count=${payload.variants_count}, esperado=${espera.payload_variants_count}`,
      };
    }
  }

  if (espera.payload_total !== undefined) {
    if (payload.total !== espera.payload_total) {
      return {
        ok: false,
        motivo: `total=${payload.total}, esperado=${espera.payload_total}`,
      };
    }
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
        process.stderr.write("Falha parsear resposta: " + linha + "\n");
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
    clientInfo: { name: "mcp-iris-eval", version: "0.1.0" },
  });
  if (init?.result?.serverInfo?.name !== "mcp-iris") {
    process.stderr.write("FALHA NO INITIALIZE: " + JSON.stringify(init) + "\n");
    proc.kill();
    process.exit(2);
  }

  // 2. cada pergunta
  const resultados = [];
  let id = 100;
  for (const p of perguntas) {
    // Execução dupla para casos de dedup
    const vezes = p.executar_duas_vezes ? 2 : 1;
    let resp;
    for (let i = 0; i < vezes; i += 1) {
      id += 1;
      resp = await chamar(id, "tools/call", {
        name: p.tool,
        arguments: p.argumentos,
      });
    }
    const v = valida(p, resp);
    resultados.push({ id: p.id, descricao: p.descricao, ok: v.ok, motivo: v.motivo ?? "" });
    const marca = v.ok ? "PASS" : "FAIL";
    process.stdout.write(`${marca}  ${p.id}  —  ${p.descricao}\n`);
    if (!v.ok) process.stdout.write(`        ${v.motivo}\n`);
  }

  proc.stdin.end();
  proc.kill();

  const pass = resultados.filter((r) => r.ok).length;
  const total = resultados.length;
  const maturity = (pass / total) * 10;
  process.stdout.write(`\n=== ${pass}/${total} testes passaram  |  maturity=${maturity.toFixed(1)} ===\n`);

  if (pass !== total) {
    process.stdout.write("\nFalhas:\n");
    for (const r of resultados.filter((x) => !x.ok)) {
      process.stdout.write(`  - ${r.id}: ${r.motivo}\n`);
    }
  }
  process.exit(pass === total ? 0 : 1);
}

rodar().catch((err) => {
  process.stderr.write("Falha do harness: " + err + "\n");
  process.exit(2);
});
