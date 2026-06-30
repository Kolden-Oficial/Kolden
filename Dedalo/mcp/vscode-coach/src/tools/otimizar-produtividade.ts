import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { z } from "zod";
import { carregarPerfis } from "../lib/catalogo.js";
import { personaDesconhecida } from "../lib/erros.js";
import { log } from "../lib/log.js";
import { personaSchema, stackSchema } from "../schemas/comuns.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SNIPPETS_DIR = resolve(__dirname, "..", "..", "data", "snippets-por-stack");

export const inputSchemaOtimizar = z
  .object({
    persona: personaSchema,
    stack: stackSchema.optional(),
    foco: z
      .enum(["keybindings", "snippets", "perfil", "todos"])
      .default("todos")
      .describe("Subconjunto de output: keybindings | snippets | perfil | todos (default)."),
  })
  .strict();

export type InputOtimizar = z.infer<typeof inputSchemaOtimizar>;

async function carregarSnippetsParaStack(stack: string): Promise<Record<string, unknown> | null> {
  const arquivo = join(SNIPPETS_DIR, `${stack}.json`);
  try {
    const conteudo = await readFile(arquivo, "utf-8");
    return JSON.parse(conteudo) as Record<string, unknown>;
  } catch (err) {
    log.debug(`Sem snippets curados para stack ${stack}`, { erro: String(err) });
    return null;
  }
}

export async function otimizarProdutividade(
  input: InputOtimizar,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const catalogo = await carregarPerfis();
  const perfil = catalogo.personas.find((p) => p.persona === input.persona);

  if (!perfil) {
    throw personaDesconhecida(
      input.persona,
      catalogo.personas.map((p) => p.persona),
    );
  }

  const snippets_curados = input.stack
    ? await carregarSnippetsParaStack(input.stack.toLowerCase())
    : null;

  const keybindings_json = perfil.keybindings_top.map((k) => ({
    key: k.tecla,
    command: k.comando,
    ...(k.quando ? { when: k.quando } : {}),
  }));

  const partes: Record<string, unknown> = {
    persona: perfil.persona,
    perfil_sugerido: perfil.perfil_sugerido,
  };

  if (input.foco === "keybindings" || input.foco === "todos") {
    partes["keybindings"] = {
      top_5: perfil.keybindings_top.slice(0, 5).map((k) => ({
        tecla: k.tecla,
        comando: k.comando,
        nota: k.nota,
      })),
      keybindings_json,
    };
  }

  if (input.foco === "snippets" || input.foco === "todos") {
    partes["snippets"] = {
      destaque: perfil.snippets_destaque,
      snippets_por_stack: snippets_curados,
      como_aplicar: input.stack
        ? `Cole o JSON em .vscode/${input.stack}.code-snippets ou em ~/.vscode/snippets/<arquivo>.code-snippets.`
        : "Passe o parâmetro 'stack' para obter snippets curados específicos (ex: 'react-ts').",
    };
  }

  if (input.foco === "perfil" || input.foco === "todos") {
    partes["perfil"] = {
      nome: perfil.perfil_sugerido,
      extensoes_de_perfil: perfil.extensoes_de_perfil ?? [],
      como_aplicar:
        "Crie um VS Code Profile (Command Palette → 'Profiles: Create Profile'), instale as extensões listadas e exporte o perfil para reuso.",
    };
  }

  return { content: [{ type: "text", text: JSON.stringify(partes, null, 2) }] };
}
