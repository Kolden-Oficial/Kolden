import { appendFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { homedir } from "node:os";

const LOG_DIR = join(homedir(), ".kolden", "vscode-coach");
const LOG_FILE = join(LOG_DIR, "server.log");

let inicializado = false;

function inicializar(): void {
  if (inicializado) return;
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true });
  }
  inicializado = true;
}

type Nivel = "info" | "warn" | "error" | "debug";

function escrever(nivel: Nivel, mensagem: string, contexto?: Record<string, unknown>): void {
  try {
    inicializar();
    const linha = JSON.stringify({
      ts: new Date().toISOString(),
      nivel,
      msg: mensagem,
      ...(contexto ? { ctx: contexto } : {}),
    });
    appendFileSync(LOG_FILE, linha + "\n", "utf-8");
  } catch {
    // logging nunca pode derrubar o servidor; falhar em silêncio
  }
}

export const log = {
  info: (msg: string, ctx?: Record<string, unknown>) => escrever("info", msg, ctx),
  warn: (msg: string, ctx?: Record<string, unknown>) => escrever("warn", msg, ctx),
  error: (msg: string, ctx?: Record<string, unknown>) => escrever("error", msg, ctx),
  debug: (msg: string, ctx?: Record<string, unknown>) => escrever("debug", msg, ctx),
  arquivo: LOG_FILE,
};
