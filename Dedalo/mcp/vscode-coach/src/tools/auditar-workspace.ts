import { z } from "zod";
import {
  carregarExtensoesEssenciais,
  carregarExtensoesPorStack,
} from "../lib/catalogo.js";
import {
  codeCliEstaDisponivel,
  listarExtensoesInstaladas,
} from "../lib/exec-code-cli.js";
import { detectarStacks, lerWorkspace } from "../lib/ler-workspace.js";
import { log } from "../lib/log.js";
import { verbosidadeSchema, workspacePathSchema } from "../schemas/comuns.js";

export const inputSchemaAuditar = z
  .object({
    workspace_path: workspacePathSchema,
    verbosidade: verbosidadeSchema,
    incluir_extensoes_globais: z
      .boolean()
      .default(true)
      .describe("Se true (default), lista extensões globais instaladas via `code --list-extensions`."),
  })
  .strict();

export type InputAuditar = z.infer<typeof inputSchemaAuditar>;

interface GapCritico {
  tipo: "extensao_ausente" | "arquivo_vscode_ausente" | "convencao_ausente";
  alvo: string;
  motivo: string;
}

export async function auditarWorkspace(
  input: InputAuditar,
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const estado = await lerWorkspace(input.workspace_path);
  const stacks_detectadas = detectarStacks(estado);
  const stack_primaria = stacks_detectadas[0];

  const essenciais = await carregarExtensoesEssenciais();
  const catalogo_stacks = await carregarExtensoesPorStack();
  const bloco_stack = stack_primaria ? catalogo_stacks[stack_primaria] : undefined;

  const ids_essenciais = essenciais.essenciais.map((e) => e.id.toLowerCase());
  const ids_stack = bloco_stack
    ? bloco_stack.essenciais.map((e) => e.id.toLowerCase())
    : [];

  let extensoes_instaladas: string[] = [];
  let cli_ok = false;
  if (input.incluir_extensoes_globais) {
    cli_ok = await codeCliEstaDisponivel();
    if (cli_ok) {
      try {
        extensoes_instaladas = await listarExtensoesInstaladas();
      } catch (err) {
        log.warn("Falha ao listar extensões — seguindo sem", { erro: String(err) });
      }
    }
  }

  const recomendadas_no_workspace = new Set(estado.extensions_recomendadas_no_workspace);
  const todas_recomendadas_devidas = new Set([...ids_essenciais, ...ids_stack]);

  const ausentes_no_workspace = [...todas_recomendadas_devidas].filter(
    (id) => !recomendadas_no_workspace.has(id),
  );
  const ausentes_instaladas = cli_ok
    ? [...todas_recomendadas_devidas].filter((id) => !extensoes_instaladas.includes(id))
    : [];

  const gaps: GapCritico[] = [];
  if (!estado.vscode_dir_presente) {
    gaps.push({
      tipo: "arquivo_vscode_ausente",
      alvo: ".vscode/",
      motivo: "Workspace não tem diretório .vscode — sem configuração local versionável.",
    });
  }
  if (!estado.extensions_json_presente && ausentes_no_workspace.length > 0) {
    gaps.push({
      tipo: "arquivo_vscode_ausente",
      alvo: ".vscode/extensions.json",
      motivo: "Sem recomendações de extensão no workspace — time não tem padrão compartilhado.",
    });
  }
  if (!estado.editorconfig_presente) {
    gaps.push({
      tipo: "convencao_ausente",
      alvo: ".editorconfig",
      motivo: "Sem .editorconfig — risco de divergência de formatação entre editores.",
    });
  }
  if (!estado.gitignore_presente) {
    gaps.push({
      tipo: "convencao_ausente",
      alvo: ".gitignore",
      motivo: "Sem .gitignore na raiz — risco de commitar artefatos.",
    });
  }
  for (const id of ausentes_no_workspace) {
    gaps.push({
      tipo: "extensao_ausente",
      alvo: id,
      motivo: "Extensão essencial Kolden para esta stack — não está em .vscode/extensions.json.",
    });
  }

  const score = calcularScore({
    tem_vscode_dir: estado.vscode_dir_presente,
    tem_settings: estado.settings_json_presente,
    tem_extensions_json: estado.extensions_json_presente,
    tem_editorconfig: estado.editorconfig_presente,
    tem_gitignore: estado.gitignore_presente,
    ausentes_count: ausentes_no_workspace.length,
    devidas_count: todas_recomendadas_devidas.size,
    stack_detectada: stack_primaria !== undefined,
  });

  const proximo_passo = sugerirProximoPasso({
    stack: stack_primaria,
    ausentes: ausentes_no_workspace,
    gaps,
    workspace_path: estado.path,
  });

  if (input.verbosidade === "concise") {
    const payload = {
      score,
      gaps_criticos: gaps.slice(0, 5).map((g) => `${g.alvo}: ${g.motivo}`),
      proximo_passo,
    };
    return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
  }

  const payload = {
    score,
    workspace_path: estado.path,
    stack_detectada: stack_primaria ?? null,
    stacks_candidatas: stacks_detectadas,
    cli_code_disponivel: cli_ok,
    arquivos_vscode_presentes: {
      vscode_dir: estado.vscode_dir_presente,
      settings_json: estado.settings_json_presente,
      launch_json: estado.launch_json_presente,
      tasks_json: estado.tasks_json_presente,
      extensions_json: estado.extensions_json_presente,
    },
    editorconfig_ok: estado.editorconfig_presente,
    gitignore_ok: estado.gitignore_presente,
    devcontainer_presente: estado.devcontainer_presente,
    extensoes: {
      instaladas_globais: cli_ok ? extensoes_instaladas : null,
      recomendadas_no_workspace: estado.extensions_recomendadas_no_workspace,
      ausentes_no_workspace,
      ausentes_instaladas_globalmente: cli_ok ? ausentes_instaladas : null,
    },
    gaps_criticos: gaps,
    proximo_passo,
  };
  return { content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] };
}

interface ScoreInput {
  tem_vscode_dir: boolean;
  tem_settings: boolean;
  tem_extensions_json: boolean;
  tem_editorconfig: boolean;
  tem_gitignore: boolean;
  ausentes_count: number;
  devidas_count: number;
  stack_detectada: boolean;
}

function calcularScore(s: ScoreInput): number {
  let pts = 0;
  if (s.tem_vscode_dir) pts += 15;
  if (s.tem_settings) pts += 10;
  if (s.tem_extensions_json) pts += 10;
  if (s.tem_editorconfig) pts += 10;
  if (s.tem_gitignore) pts += 5;
  if (s.stack_detectada) pts += 10;
  const cobertura_ext =
    s.devidas_count === 0 ? 1 : 1 - s.ausentes_count / s.devidas_count;
  pts += Math.round(cobertura_ext * 40);
  return Math.max(0, Math.min(100, pts));
}

function sugerirProximoPasso(args: {
  stack?: string;
  ausentes: string[];
  gaps: GapCritico[];
  workspace_path: string;
}): string {
  if (!args.stack) {
    return "Stack não foi detectada. Passe um package.json/pyproject.toml/go.mod no workspace, ou rode 'vscode_recomendar_setup' com a stack explícita.";
  }
  if (args.ausentes.length > 0) {
    return `Rode 'vscode_recomendar_setup' com stack='${args.stack}' para gerar .vscode/extensions.json, settings.json, launch.json e tasks.json prontos para colar.`;
  }
  if (args.gaps.some((g) => g.alvo === ".editorconfig")) {
    return "Adicione um .editorconfig na raiz — base de consistência entre editores. Rode 'vscode_recomendar_setup' com a stack para obter o template Kolden.";
  }
  return `Workspace está saudável para a stack '${args.stack}'. Para o próximo passo opinionado, rode 'vscode_otimizar_produtividade' com sua persona.`;
}
