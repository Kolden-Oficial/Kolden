import { appendFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

// Log JSON estruturado — apêndice em arquivo, nunca stdout (quebraria stdio MCP).
// Padrão herdado de Dedalo/mcp/vscode-coach/src/lib/log.ts com pasta trocada para mcp-iris.
const LOG_DIR = join(homedir(), ".kolden", "mcp-iris");
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

/**
 * Redige um token para uso seguro em log/output.
 * Nunca exibe o valor cru — mostra só os primeiros 6 chars + reticências.
 */
export function redigirToken(valor: string | undefined | null): string {
  if (typeof valor !== "string" || valor.length === 0) return "<vazio>";
  if (valor.length <= 6) return "<curto>";
  return valor.slice(0, 6) + "…";
}

export const log = {
  info: (msg: string, ctx?: Record<string, unknown>) => escrever("info", msg, ctx),
  warn: (msg: string, ctx?: Record<string, unknown>) => escrever("warn", msg, ctx),
  error: (msg: string, ctx?: Record<string, unknown>) => escrever("error", msg, ctx),
  debug: (msg: string, ctx?: Record<string, unknown>) => escrever("debug", msg, ctx),
  arquivo: LOG_FILE,
};
