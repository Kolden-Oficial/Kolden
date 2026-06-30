import { readFile, readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { workspaceNaoEncontrado } from "./erros.js";
import { log } from "./log.js";

export interface EstadoWorkspace {
  path: string;
  existe: boolean;
  package_json?: PackageJson;
  pyproject_toml_presente: boolean;
  requirements_txt_presente: boolean;
  go_mod_presente: boolean;
  cargo_toml_presente: boolean;
  vscode_dir_presente: boolean;
  settings_json_presente: boolean;
  launch_json_presente: boolean;
  tasks_json_presente: boolean;
  extensions_json_presente: boolean;
  extensions_recomendadas_no_workspace: string[];
  editorconfig_presente: boolean;
  gitignore_presente: boolean;
  devcontainer_presente: boolean;
}

export interface PackageJson {
  name?: string;
  version?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

async function arquivoExiste(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function lerJsonOpcional<T>(path: string): Promise<T | undefined> {
  try {
    const conteudo = await readFile(path, "utf-8");
    // VS Code aceita JSONC (comentários e trailing commas) — limpeza simples para JSON.parse
    const limpo = conteudo
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(?<!:)\/\/.*$/gm, "")
      .replace(/,(\s*[\]}])/g, "$1");
    return JSON.parse(limpo) as T;
  } catch (err) {
    log.debug(`Não foi possível ler/parsear ${path}`, { erro: String(err) });
    return undefined;
  }
}

export async function lerWorkspace(workspace_path: string): Promise<EstadoWorkspace> {
  const dir_existe = await arquivoExiste(workspace_path);
  if (!dir_existe) {
    throw workspaceNaoEncontrado(workspace_path);
  }

  const vscodeDir = join(workspace_path, ".vscode");
  const package_json = await lerJsonOpcional<PackageJson>(join(workspace_path, "package.json"));

  const extensionsJson = await lerJsonOpcional<{ recommendations?: string[] }>(
    join(vscodeDir, "extensions.json"),
  );

  const estado: EstadoWorkspace = {
    path: workspace_path,
    existe: true,
    package_json,
    pyproject_toml_presente: await arquivoExiste(join(workspace_path, "pyproject.toml")),
    requirements_txt_presente: await arquivoExiste(join(workspace_path, "requirements.txt")),
    go_mod_presente: await arquivoExiste(join(workspace_path, "go.mod")),
    cargo_toml_presente: await arquivoExiste(join(workspace_path, "Cargo.toml")),
    vscode_dir_presente: await arquivoExiste(vscodeDir),
    settings_json_presente: await arquivoExiste(join(vscodeDir, "settings.json")),
    launch_json_presente: await arquivoExiste(join(vscodeDir, "launch.json")),
    tasks_json_presente: await arquivoExiste(join(vscodeDir, "tasks.json")),
    extensions_json_presente: await arquivoExiste(join(vscodeDir, "extensions.json")),
    extensions_recomendadas_no_workspace: (extensionsJson?.recommendations ?? []).map((s) =>
      s.toLowerCase(),
    ),
    editorconfig_presente: await arquivoExiste(join(workspace_path, ".editorconfig")),
    gitignore_presente: await arquivoExiste(join(workspace_path, ".gitignore")),
    devcontainer_presente:
      (await arquivoExiste(join(workspace_path, ".devcontainer"))) ||
      (await arquivoExiste(join(workspace_path, ".devcontainer.json"))),
  };

  return estado;
}

/** Retorna lista ordenada de candidatos de stack, do mais provável ao menos. */
export function detectarStacks(estado: EstadoWorkspace): string[] {
  const candidatos: Array<{ stack: string; peso: number }> = [];

  const deps = {
    ...(estado.package_json?.dependencies ?? {}),
    ...(estado.package_json?.devDependencies ?? {}),
  };

  // Frontend JS/TS
  if (deps["next"]) candidatos.push({ stack: "nextjs", peso: 10 });
  if (deps["vite"] && deps["react"]) candidatos.push({ stack: "react-vite", peso: 9 });
  if (deps["react"] && deps["typescript"]) candidatos.push({ stack: "react-ts", peso: 7 });

  // Backend Node
  if (deps["fastify"]) candidatos.push({ stack: "node-fastify", peso: 9 });
  if (deps["express"]) candidatos.push({ stack: "node-express", peso: 8 });

  // Python
  if (estado.pyproject_toml_presente || estado.requirements_txt_presente) {
    // Heurística simples — leitura de conteúdo para refinar fica para v2
    candidatos.push({ stack: "python-fastapi", peso: 5 });
    candidatos.push({ stack: "python-django", peso: 4 });
    candidatos.push({ stack: "python-data", peso: 3 });
  }

  if (estado.go_mod_presente) candidatos.push({ stack: "go", peso: 10 });
  if (estado.cargo_toml_presente) candidatos.push({ stack: "rust", peso: 10 });

  return candidatos
    .sort((a, b) => b.peso - a.peso)
    .map((c) => c.stack)
    .filter((s, i, arr) => arr.indexOf(s) === i);
}
