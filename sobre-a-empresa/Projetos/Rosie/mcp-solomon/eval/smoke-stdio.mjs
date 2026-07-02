#!/usr/bin/env node
// Smoke test mínimo via stdio JSON-RPC.
// Sobe o servidor, faz initialize + tools/list, valida schema básico, encerra.
// NÃO invoca tools reais (evita chamada HTTP à Solomon).

import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BIN = resolve(__dirname, "..", "dist", "index.js");

const TESTES = [
  {
    nome: "initialize",
    msg: {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "mcp-iris-smoke", version: "0.1.0" },
      },
    },
    valida: (resp) => resp.result?.serverInfo?.name === "mcp-iris",
  },
  {
    nome: "tools/list",
    msg: { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
    valida: (resp) => {
      const tools = resp.result?.tools ?? [];
      const nomes = tools.map((t) => t.name).sort();
      const esperadas = [
        "solomon_criar_pedido",
        "solomon_criar_produto",
        "solomon_sincronizar_catalogo",
        "solomon_validar_conta",
      ];
      return JSON.stringify(nomes) === JSON.stringify(esperadas);
    },
  },
];

async function rodar() {
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

  const resultados = [];
  for (const t of TESTES) {
    const resp = await new Promise((r) => {
      pendentes.set(t.msg.id, r);
      proc.stdin.write(JSON.stringify(t.msg) + "\n");
    });
    const ok = t.valida(resp);
    resultados.push({ nome: t.nome, ok });
    process.stdout.write(`${ok ? "PASS" : "FAIL"}  ${t.nome}\n`);
    if (!ok) process.stdout.write("  resposta: " + JSON.stringify(resp).slice(0, 400) + "\n");
  }

  proc.stdin.end();
  proc.kill();

  const pass = resultados.filter((r) => r.ok).length;
  const total = resultados.length;
  process.stdout.write(`\n=== ${pass}/${total} testes passaram ===\n`);
  process.exit(pass === total ? 0 : 1);
}

rodar().catch((err) => {
  process.stderr.write("Falha smoke: " + err + "\n");
  process.exit(2);
});
