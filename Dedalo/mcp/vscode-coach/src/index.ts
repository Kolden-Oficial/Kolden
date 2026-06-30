#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { criarServidor } from "./server.js";
import { log } from "./lib/log.js";

async function principal(): Promise<void> {
  const servidor = criarServidor();
  const transporte = new StdioServerTransport();
  await servidor.connect(transporte);
  log.info("vscode-coach pronto (stdio)");
}

principal().catch((err) => {
  log.error("Falha fatal no boot", { erro: err instanceof Error ? err.stack : String(err) });
  process.exit(1);
});
