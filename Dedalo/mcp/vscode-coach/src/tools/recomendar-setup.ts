import { z } from "zod";
import {
  carregarExtensoesEssenciais,
  carregarExtensoesPorStack,
  stacksProximas,
  stacksSuportadas,
} from "../lib/catalogo.js";
import { stackDesconhecida } from "../lib/erros.js";
import { renderKitSetup } from "../lib/render-templates.js";
import {
  stackSchema,
  verbosidadeSchema,
  workspacePathSchema,
} from "../schemas/comuns.js";

export const inputSchemaRecomendar = z
  .object({
    stack: stackSchema,
    intencoes: z
      .array(z.string())
      .default([])
      .describe(
        "Tags opcionais que filtram extensões 'recomendadas' por condição. Ex: ['tailwind','prisma','testing','debug'].",
      ),
    workspace_path: workspacePathSchema.optional(),
    verbosidade: verbosidadeSchema,
  })
  .strict();

export type InputRecomendar = z.infer<typeof inputSchemaRecomendar>;

export async function recomendarSetup(
  input: InputRecomendar,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const catalogo = await carregarExtensoesPorStack();
  const bloco = catalogo[input.stack.toLowerCase()];

  if (!bloco) {
    const proximas = await stacksProximas(input.stack);
    const todas = await stacksSuportadas();
    throw stackDesconhecida(input.stack, proximas.length > 0 ? proximas : todas);
  }

  const essenciais = await carregarExtensoesEssenciais();
  const kit = renderKitSetup(input.stack, bloco, essenciais, input.intencoes);

  if (input.verbosidade === "concise") {
    const payload = {
      stack: input.stack,
      extensoes_count: kit.extensions_json.recommendations.length,
      extensoes: kit.extensions_json.recommendations,
      arquivos_gerados: [
        ".vscode/extensions.json",
        ".vscode/settings.json",
        ".vscode/launch.json",
        ".vscode/tasks.json",
      ],
      notas: kit.notas,
      proximo_passo:
        "Cole cada bloco no arquivo correspondente em .vscode/. Para detalhes completos, chame de novo com verbosidade='detailed'.",
    };
    return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
  }

  const payload = {
    stack: input.stack,
    workspace_path: input.workspace_path ?? null,
    arquivos: {
      "extensions.json": kit.extensions_json,
      "settings.json": kit.settings_json,
      "launch.json": kit.launch_json,
      "tasks.json": kit.tasks_json,
    },
    notas: kit.notas,
    aviso:
      "Esta tool NÃO escreve no seu workspace — copie cada bloco para o arquivo correspondente em .vscode/.",
  };
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
}
