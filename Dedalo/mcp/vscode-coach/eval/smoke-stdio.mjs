#!/usr/bin/env node
// Smoke test mínimo via stdio JSON-RPC.
// Sobe o servidor, faz initialize + tools/list + 1 chamada por tool, encerra.

import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
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
        clientInfo: { name: "vscode-coach-smoke", version: "0.1.0" },
      },
    },
    valida: (resp) => resp.result?.serverInfo?.name === "vscode-coach",
  },
  {
    nome: "tools/list",
    msg: { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
    valida: (resp) => {
      const tools = resp.result?.tools ?? [];
      const nomes = tools.map((t) => t.name).sort();
      const esperadas = [
        "vscode_auditar_workspace",
        "vscode_otimizar_produtividade",
        "vscode_recomendar_setup",
      ];
      return JSON.stringify(nomes) === JSON.stringify(esperadas);
    },
  },
  {
    nome: "auditar_workspace (workspace inexistente → KoldenError)",
    msg: {
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "vscode_auditar_workspace",
        arguments: {
          workspace_path: "C:/path/que/nao/existe/de/jeito/nenhum",
          verbosidade: "concise",
          incluir_extensoes_globais: false,
        },
      },
    },
    valida: (resp) => {
      const text = resp.result?.content?.[0]?.text ?? "";
      const isError = resp.result?.isError === true;
      return isError && text.includes("WORKSPACE_NAO_ENCONTRADO");
    },
  },
  {
    nome: "recomendar_setup (react-ts concise)",
    msg: {
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: {
        name: "vscode_recomendar_setup",
        arguments: { stack: "react-ts", verbosidade: "concise" },
      },
    },
    valida: (resp) => {
      const text = resp.result?.content?.[0]?.text ?? "";
      try {
        const payload = JSON.parse(text);
        return (
          payload.stack === "react-ts" &&
          Array.isArray(payload.extensoes) &&
          payload.extensoes.includes("dbaeumer.vscode-eslint") &&
          payload.extensoes.includes("esbenp.prettier-vscode")
        );
      } catch {
        return false;
      }
    },
  },
  {
    nome: "recomendar_setup (stack desconhecida → KoldenError)",
    msg: {
      jsonrpc: "2.0",
      id: 5,
      method: "tools/call",
      params: {
        name: "vscode_recomendar_setup",
        arguments: { stack: "crystal-lang", verbosidade: "concise" },
      },
    },
    valida: (resp) => {
      const text = resp.result?.content?.[0]?.text ?? "";
      return resp.result?.isError === true && text.includes("STACK_DESCONHECIDA");
    },
  },
  {
    nome: "otimizar_produtividade (frontend)",
    msg: {
      jsonrpc: "2.0",
      id: 6,
      method: "tools/call",
      params: {
        name: "vscode_otimizar_produtividade",
        arguments: { persona: "frontend", stack: "react-ts", foco: "snippets" },
      },
    },
    valida: (resp) => {
      const text = resp.result?.content?.[0]?.text ?? "";
      try {
        const payload = JSON.parse(text);
        return (
          payload.persona === "frontend" &&
          payload.snippets &&
          payload.snippets.snippets_por_stack &&
          payload.snippets.snippets_por_stack.rfc
        );
      } catch {
        return false;
      }
    },
  },
];

async function rodar() {
  const proc = spawn("node", [BIN], { stdio: ["pipe", "pipe", "pipe"] });
  let buffer = "";
  const pendentes = new Map();
  let resolveTodos;
  const promessaFim = new Promise((r) => (resolveTodos = r));

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
          if (pendentes.size === 0) resolveTodos();
        }
      } catch (err) {
        console.error("Falha parsear resposta:", linha, err);
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
    resultados.push({ nome: t.nome, ok, resp_curta: ok ? "ok" : JSON.stringify(resp).slice(0, 200) });
    console.log(`${ok ? "PASS" : "FAIL"}  ${t.nome}`);
    if (!ok) console.log("  resposta:", JSON.stringify(resp).slice(0, 400));
  }

  proc.stdin.end();
  proc.kill();

  const pass = resultados.filter((r) => r.ok).length;
  const total = resultados.length;
  console.log(`\n=== ${pass}/${total} testes passaram ===`);
  process.exit(pass === total ? 0 : 1);
}

rodar().catch((err) => {
  console.error("Falha smoke:", err);
  process.exit(2);
});
