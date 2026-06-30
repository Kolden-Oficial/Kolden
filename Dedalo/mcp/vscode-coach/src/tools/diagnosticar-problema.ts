import { z } from "zod";
import { casarSintoma, carregarDiagnosticos } from "../lib/catalogo.js";
import { sintomaAmbiguo } from "../lib/erros.js";
import { verbosidadeSchema, workspacePathSchema } from "../schemas/comuns.js";

export const inputSchemaDiagnosticar = z
  .object({
    sintoma: z
      .string()
      .min(3)
      .describe(
        "Descrição livre do problema. Quanto mais específico (mensagem de erro literal, nome de extensão, passo que falha), melhor o match.",
      ),
    workspace_path: workspacePathSchema.optional(),
    contexto: z
      .string()
      .optional()
      .describe("Contexto extra: logs, mensagens de erro, comando que falhou."),
    verbosidade: verbosidadeSchema,
  })
  .strict();

export type InputDiagnosticar = z.infer<typeof inputSchemaDiagnosticar>;

const SCORE_MINIMO = 0.4;
const SINTOMA_VAGO_MIN_CARS = 12;

export async function diagnosticarProblema(
  input: InputDiagnosticar,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const matches = await casarSintoma(input.sintoma);
  const melhor = matches[0];

  if (input.sintoma.trim().length < SINTOMA_VAGO_MIN_CARS && (!melhor || melhor.score < 0.7)) {
    throw sintomaAmbiguo(input.sintoma);
  }

  if (!melhor || melhor.score < SCORE_MINIMO) {
    const todos = await carregarDiagnosticos();
    const ids_curados = todos.diagnosticos.map((d) => d.id);
    const payload = {
      status: "sem_match_curado",
      score_melhor: melhor?.score ?? 0,
      sintoma_recebido: input.sintoma,
      contexto: input.contexto ?? null,
      workspace_path: input.workspace_path ?? null,
      ids_curados_disponiveis: ids_curados,
      proximo_passo:
        "Nenhum diagnóstico curado bateu. O cliente (Claude/Copilot) deve raciocinar sobre o sintoma usando o contexto. Se for problema recorrente, considere registrar em data/diagnosticos.yaml via PR.",
    };
    return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
  }

  const hipoteses_ranqueadas = matches
    .filter((m) => m.score >= SCORE_MINIMO * 0.6)
    .slice(0, 3)
    .map((m) => ({
      id: m.diagnostico.id,
      score: Number(m.score.toFixed(2)),
      hipoteses: m.diagnostico.hipoteses,
    }));

  if (input.verbosidade === "concise") {
    const principal = hipoteses_ranqueadas[0];
    const top_hipotese = principal?.hipoteses[0];
    const payload = {
      diagnostico_principal: principal?.id ?? null,
      hipotese_mais_provavel: top_hipotese?.titulo ?? null,
      acao_imediata: top_hipotese?.correcao ?? null,
      score: principal?.score ?? 0,
      proximo_passo:
        "Tente a ação imediata. Se não resolver, chame de novo com verbosidade='detailed' para hipóteses alternativas.",
    };
    return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
  }

  const payload = {
    sintoma_recebido: input.sintoma,
    contexto: input.contexto ?? null,
    workspace_path: input.workspace_path ?? null,
    diagnosticos_ranqueados: hipoteses_ranqueadas,
    aviso:
      "Hipóteses são curadas Kolden (data/diagnosticos.yaml). Se nenhuma bater, retorne com mais contexto ou registre o caso para enriquecer o catálogo.",
  };
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
}
