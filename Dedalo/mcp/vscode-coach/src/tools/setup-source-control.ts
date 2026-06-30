import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { load as parseYaml } from "js-yaml";
import { z } from "zod";
import { stackDesconhecida } from "../lib/erros.js";
import { log } from "../lib/log.js";
import { stackSchema, workspacePathSchema } from "../schemas/comuns.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const GITIGNORE_DIR = resolve(__dirname, "..", "..", "data", "git", "gitignore-templates");
const HOOKS_DIR = resolve(__dirname, "..", "..", "data", "git", "hooks");

const MAPA_STACK_GITIGNORE: Record<string, string> = {
  "react-ts": "node",
  "react-vite": "node",
  nextjs: "node",
  "node-express": "node",
  "node-fastify": "node",
  "python-fastapi": "python",
  "python-django": "python",
  "python-data": "python",
  go: "go",
  rust: "rust",
};

const DEFAULT_HOOK_POR_STACK: Record<string, "husky" | "pre-commit" | "lefthook"> = {
  "react-ts": "husky",
  "react-vite": "husky",
  nextjs: "husky",
  "node-express": "husky",
  "node-fastify": "husky",
  "python-fastapi": "pre-commit",
  "python-django": "pre-commit",
  "python-data": "pre-commit",
  go: "lefthook",
  rust: "lefthook",
};

const GITLENS_SETTINGS_PATCH: Record<string, unknown> = {
  "gitlens.codeLens.enabled": true,
  "gitlens.currentLine.enabled": true,
  "gitlens.hovers.currentLine.over": "line",
  "gitlens.blame.format": "${author|10}, ${date|MM-DD-YYYY}",
  "gitlens.statusBar.enabled": true,
  "scm.diffDecorationsGutterAction": "diff",
  "diffEditor.ignoreTrimWhitespace": false,
};

export const inputSchemaSourceControl = z
  .object({
    stack: stackSchema,
    workspace_path: workspacePathSchema,
    incluir_hooks: z
      .boolean()
      .default(true)
      .describe("Se true (default), inclui config de pre-commit hooks (husky/pre-commit/lefthook)."),
    ferramenta_hooks: z
      .enum(["husky", "pre-commit", "lefthook"])
      .optional()
      .describe(
        "Override do hook a usar. Se omitido, escolhe por stack: Node→husky, Python→pre-commit, Go/Rust→lefthook.",
      ),
  })
  .strict();

export type InputSourceControl = z.infer<typeof inputSchemaSourceControl>;

async function carregarGitignore(template: string): Promise<string> {
  const arquivo = join(GITIGNORE_DIR, `${template}.gitignore`);
  return readFile(arquivo, "utf-8");
}

async function carregarHook(ferramenta: string): Promise<Record<string, unknown>> {
  const mapa_arquivo: Record<string, string> = {
    husky: "husky.yaml",
    "pre-commit": "pre-commit-python.yaml",
    lefthook: "lefthook.yaml",
  };
  const arquivo = mapa_arquivo[ferramenta];
  if (!arquivo) throw new Error(`Hook desconhecido: ${ferramenta}`);
  const conteudo = await readFile(join(HOOKS_DIR, arquivo), "utf-8");
  return parseYaml(conteudo) as Record<string, unknown>;
}

export async function setupSourceControl(
  input: InputSourceControl,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const stack_lc = input.stack.toLowerCase();
  const template_gitignore = MAPA_STACK_GITIGNORE[stack_lc];
  if (!template_gitignore) {
    throw stackDesconhecida(input.stack, Object.keys(MAPA_STACK_GITIGNORE).sort());
  }

  let conteudo_gitignore: string;
  try {
    conteudo_gitignore = await carregarGitignore(template_gitignore);
  } catch (err) {
    log.error("Falha ao carregar gitignore", { template_gitignore, erro: String(err) });
    throw err;
  }

  let hook_payload: Record<string, unknown> | null = null;
  let ferramenta_hook: string | null = null;
  if (input.incluir_hooks) {
    ferramenta_hook =
      input.ferramenta_hooks ?? DEFAULT_HOOK_POR_STACK[stack_lc] ?? "lefthook";
    hook_payload = await carregarHook(ferramenta_hook);
  }

  const payload = {
    stack: input.stack,
    workspace_path: input.workspace_path,
    arquivos: {
      ".gitignore": conteudo_gitignore,
    },
    patches: {
      ".vscode/extensions.json": {
        recommendations: ["eamodio.gitlens"],
      },
      ".vscode/settings.json": GITLENS_SETTINGS_PATCH,
    },
    hooks: input.incluir_hooks
      ? {
          ferramenta: ferramenta_hook,
          config: hook_payload,
        }
      : null,
    aviso:
      "Esta tool retorna conteúdo — você decide criar/mesclar com os arquivos existentes. Em projeto antigo, ANEXAR ao .gitignore existente (não substituir).",
    proximo_passo: input.incluir_hooks
      ? `Instale a ferramenta de hooks (${ferramenta_hook}) seguindo as instruções no campo 'config' e ative.`
      : "Setup de gitignore + GitLens aplicado. Considere rodar a tool de novo com incluir_hooks=true para automação de pre-commit.",
  };
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
}
