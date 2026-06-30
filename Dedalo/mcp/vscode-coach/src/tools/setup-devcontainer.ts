import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { z } from "zod";
import { stackDesconhecida } from "../lib/erros.js";
import { log } from "../lib/log.js";
import { stackSchema } from "../schemas/comuns.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DEVCONTAINER_DIR = resolve(__dirname, "..", "..", "data", "devcontainers");

const MAPA_STACK_TEMPLATE: Record<string, string> = {
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
  fullstack: "fullstack",
};

const FEATURES_VALIDAS = new Set([
  "docker-in-docker",
  "aws-cli",
  "azure-cli",
  "kubectl",
  "terraform",
  "node",
  "python",
]);

const MAPA_FEATURE: Record<string, [string, Record<string, unknown>]> = {
  "docker-in-docker": ["ghcr.io/devcontainers/features/docker-in-docker:2", {}],
  "aws-cli": ["ghcr.io/devcontainers/features/aws-cli:1", {}],
  "azure-cli": ["ghcr.io/devcontainers/features/azure-cli:1", {}],
  kubectl: ["ghcr.io/devcontainers/features/kubectl-helm-minikube:1", {}],
  terraform: ["ghcr.io/devcontainers/features/terraform:1", {}],
  node: ["ghcr.io/devcontainers/features/node:1", { version: "22" }],
  python: ["ghcr.io/devcontainers/features/python:1", { version: "3.12" }],
};

export const inputSchemaDevcontainer = z
  .object({
    stack: stackSchema,
    features_extras: z
      .array(z.string())
      .default([])
      .describe(
        "Features adicionais. Suportadas: docker-in-docker, aws-cli, azure-cli, kubectl, terraform, node, python.",
      ),
    incluir_extensoes: z
      .boolean()
      .default(true)
      .describe("Se true (default), mantém a seção customizations.vscode.extensions do template."),
  })
  .strict();

export type InputDevcontainer = z.infer<typeof inputSchemaDevcontainer>;

async function carregarTemplate(nome: string): Promise<Record<string, unknown>> {
  const arquivo = join(DEVCONTAINER_DIR, `${nome}.json`);
  const conteudo = await readFile(arquivo, "utf-8");
  return JSON.parse(conteudo) as Record<string, unknown>;
}

export async function setupDevcontainer(
  input: InputDevcontainer,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const template_id = MAPA_STACK_TEMPLATE[input.stack.toLowerCase()];
  if (!template_id) {
    throw stackDesconhecida(input.stack, Object.keys(MAPA_STACK_TEMPLATE).sort());
  }

  let template: Record<string, unknown>;
  try {
    template = await carregarTemplate(template_id);
  } catch (err) {
    log.error("Falha ao carregar template devcontainer", { template_id, erro: String(err) });
    throw err;
  }

  if (input.features_extras.length > 0) {
    const features_atuais = (template["features"] as Record<string, unknown> | undefined) ?? {};
    const desconhecidas = input.features_extras.filter((f) => !FEATURES_VALIDAS.has(f));
    for (const f of input.features_extras) {
      const m = MAPA_FEATURE[f];
      if (m) features_atuais[m[0]] = m[1];
    }
    template["features"] = features_atuais;
    if (desconhecidas.length > 0) {
      const notas = (template["__notas"] as string[] | undefined) ?? [];
      notas.push(
        `Features ignoradas (não suportadas): ${desconhecidas.join(", ")}. Suportadas: ${[...FEATURES_VALIDAS].join(", ")}.`,
      );
      template["__notas"] = notas;
    }
  }

  if (!input.incluir_extensoes) {
    const custom = template["customizations"] as Record<string, unknown> | undefined;
    if (custom?.vscode) {
      const vsc = custom["vscode"] as Record<string, unknown>;
      delete vsc["extensions"];
    }
  }

  const payload = {
    stack: input.stack,
    template_base: template_id,
    arquivos: {
      ".devcontainer/devcontainer.json": template,
    },
    aviso:
      "Esta tool NÃO escreve no seu workspace — copie o JSON para .devcontainer/devcontainer.json e abra no VS Code (Command Palette → 'Dev Containers: Reopen in Container').",
    proximo_passo:
      "Após colar, rode 'vscode_setup_testing' e 'vscode_setup_source_control' para completar o kit do projeto.",
  };
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
}
