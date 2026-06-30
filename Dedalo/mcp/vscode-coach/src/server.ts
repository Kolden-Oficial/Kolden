import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { auditarWorkspace, inputSchemaAuditar } from "./tools/auditar-workspace.js";
import { otimizarProdutividade, inputSchemaOtimizar } from "./tools/otimizar-produtividade.js";
import { recomendarSetup, inputSchemaRecomendar } from "./tools/recomendar-setup.js";
import {
  diagnosticarProblema,
  inputSchemaDiagnosticar,
} from "./tools/diagnosticar-problema.js";
import { setupDevcontainer, inputSchemaDevcontainer } from "./tools/setup-devcontainer.js";
import { setupTesting, inputSchemaTesting } from "./tools/setup-testing.js";
import { setupSourceControl, inputSchemaSourceControl } from "./tools/setup-source-control.js";
import { KoldenError } from "./lib/erros.js";
import { log } from "./lib/log.js";

export function criarServidor(): McpServer {
  const servidor = new McpServer({
    name: "vscode-coach",
    version: "0.1.0",
  });

  servidor.registerTool(
    "vscode_auditar_workspace",
    {
      title: "Auditar workspace VS Code",
      description:
        "Audita um workspace VS Code lendo .vscode/, package.json, .editorconfig, pyproject.toml e extensões instaladas. Use quando o usuário disser 'analisa meu setup', 'o que tá faltando aqui', 'tá tudo ok no meu VS Code', ou ANTES de aplicar recomendações para entender o ponto de partida.",
      inputSchema: inputSchemaAuditar.shape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input) => envolverErros(() => auditarWorkspace(input)),
  );

  servidor.registerTool(
    "vscode_recomendar_setup",
    {
      title: "Recomendar kit de setup VS Code por stack",
      description:
        "Gera kit completo de setup VS Code para uma stack: lista de extensões, settings.json, launch.json e tasks.json prontos para colar. Use quando o usuário disser 'configura meu VS Code pra React+TS', 'novo projeto Python', 'preciso debugar Node', ou após auditar e identificar stack-alvo. NÃO escreve no workspace — retorna o conteúdo, o cliente decide aplicar.",
      inputSchema: inputSchemaRecomendar.shape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input) => envolverErros(() => recomendarSetup(input)),
  );

  servidor.registerTool(
    "vscode_otimizar_produtividade",
    {
      title: "Otimizar produtividade VS Code por persona/stack",
      description:
        "Sugere keybindings, snippets e perfis VS Code por persona/stack. Use quando o usuário disser 'me ajuda a ser mais rápido', 'atalhos pra X', 'snippets de Y', 'qual perfil de VS Code uso pra isso', ou depois de configurar setup básico.",
      inputSchema: inputSchemaOtimizar.shape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input) => envolverErros(() => otimizarProdutividade(input)),
  );

  servidor.registerTool(
    "vscode_diagnosticar_problema",
    {
      title: "Diagnosticar problema do VS Code",
      description:
        "Diagnostica problemas comuns do VS Code a partir de um sintoma livre. Use quando o usuário relatar 'debugger não para no breakpoint', 'extensão X não funciona', 'IntelliSense quebrou', 'TS server crashou', 'tá lento', 'prettier e eslint brigando'. Retorna hipóteses ranqueadas com verificação + correção.",
      inputSchema: inputSchemaDiagnosticar.shape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
    async (input) => envolverErros(() => diagnosticarProblema(input)),
  );

  servidor.registerTool(
    "vscode_setup_devcontainer",
    {
      title: "Gerar devcontainer.json por stack",
      description:
        "Gera .devcontainer/devcontainer.json otimizado para a stack. Use quando o usuário disser 'devcontainer pra X', 'codespaces', 'ambiente reproduzível', 'docker dev'. Suporta features extras (docker-in-docker, aws-cli, kubectl, terraform).",
      inputSchema: inputSchemaDevcontainer.shape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input) => envolverErros(() => setupDevcontainer(input)),
  );

  servidor.registerTool(
    "vscode_setup_testing",
    {
      title: "Configurar framework de teste no VS Code",
      description:
        "Configura framework de teste (vitest/jest/pytest/playwright/mocha) no VS Code: extensão correta + patches para settings.json, tasks.json e launch.json. Use APÓS o projeto já ter dependências do framework instaladas. Retorna patches para mesclar (não substitui arquivos).",
      inputSchema: inputSchemaTesting.shape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input) => envolverErros(() => setupTesting(input)),
  );

  servidor.registerTool(
    "vscode_setup_source_control",
    {
      title: "Configurar source control no VS Code",
      description:
        "Configura source control: .gitignore por stack, settings do GitLens e hooks pre-commit recomendados (husky para Node, pre-commit para Python, lefthook para Go/Rust). Use em projeto novo ou ao adotar boas práticas de git.",
      inputSchema: inputSchemaSourceControl.shape,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (input) => envolverErros(() => setupSourceControl(input)),
  );

  log.info("Servidor vscode-coach instanciado", { tools_registradas: 7 });
  return servidor;
}

async function envolverErros<T extends { content: Array<{ type: "text"; text: string }> }>(
  fn: () => Promise<T>,
): Promise<T | { isError: true; content: Array<{ type: "text"; text: string }> }> {
  try {
    return await fn();
  } catch (err) {
    if (err instanceof KoldenError) {
      log.warn(`Tool retornou KoldenError ${err.codigo}`, { mensagem: err.message });
      return err.toToolResult();
    }
    log.error("Erro inesperado em tool", { erro: String(err) });
    const payload = {
      erro: {
        codigo: "ERRO_INTERNO",
        mensagem: "Falha inesperada — veja log em ~/.kolden/vscode-coach/server.log.",
        acao_sugerida:
          "Abra o log e busque por entradas com nivel='error' próximas ao timestamp da chamada. Se persistir, registre issue no Kolden.",
        detalhes: { erro_bruto: err instanceof Error ? err.message : String(err) },
      },
    };
    return {
      isError: true as const,
      content: [{ type: "text" as const, text: JSON.stringify(payload, null, 2) }],
    };
  }
}
