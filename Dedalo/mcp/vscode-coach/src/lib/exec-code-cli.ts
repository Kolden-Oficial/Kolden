import { spawn } from "node:child_process";
import { codeCliIndisponivel } from "./erros.js";
import { log } from "./log.js";

interface ResultadoExec {
  stdout: string;
  stderr: string;
  codigo_saida: number;
}

function executar(comando: string, args: string[], timeout_ms = 5000): Promise<ResultadoExec> {
  return new Promise((resolve, reject) => {
    const proc = spawn(comando, args, { shell: process.platform === "win32" });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      proc.kill();
      reject(new Error(`Timeout ao executar '${comando} ${args.join(" ")}'`));
    }, timeout_ms);

    proc.stdout?.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf-8");
    });
    proc.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf-8");
    });
    proc.on("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
    proc.on("close", (code) => {
      clearTimeout(timer);
      resolve({ stdout, stderr, codigo_saida: code ?? -1 });
    });
  });
}

let cli_disponivel: boolean | undefined;

export async function codeCliEstaDisponivel(): Promise<boolean> {
  if (cli_disponivel !== undefined) return cli_disponivel;
  try {
    const r = await executar("code", ["--version"], 3000);
    cli_disponivel = r.codigo_saida === 0;
  } catch (err) {
    log.warn("`code` CLI não detectado", { erro: String(err) });
    cli_disponivel = false;
  }
  return cli_disponivel;
}

export async function listarExtensoesInstaladas(): Promise<string[]> {
  if (!(await codeCliEstaDisponivel())) {
    throw codeCliIndisponivel();
  }
  const r = await executar("code", ["--list-extensions"], 10000);
  if (r.codigo_saida !== 0) {
    log.warn("code --list-extensions retornou código != 0", { stderr: r.stderr });
    return [];
  }
  return r.stdout
    .split("\n")
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s.length > 0 && s.includes("."));
}

export async function versaoVsCode(): Promise<string | null> {
  if (!(await codeCliEstaDisponivel())) return null;
  try {
    const r = await executar("code", ["--version"], 3000);
    const primeira = r.stdout.split("\n")[0]?.trim();
    return primeira ?? null;
  } catch {
    return null;
  }
}
