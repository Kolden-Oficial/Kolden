export type CodigoErro =
  | "WORKSPACE_NAO_ENCONTRADO"
  | "CODE_CLI_INDISPONIVEL"
  | "STACK_DESCONHECIDA"
  | "STACK_NAO_DETECTADA"
  | "SINTOMA_AMBIGUO"
  | "FRAMEWORK_NAO_DETECTADO_EM_DEPS"
  | "PERSONA_DESCONHECIDA"
  | "ARQUIVO_CATALOGO_AUSENTE"
  | "FALHA_LER_WORKSPACE";

export class KoldenError extends Error {
  readonly codigo: CodigoErro;
  readonly acao_sugerida: string;
  readonly detalhes?: Record<string, unknown>;

  constructor(
    codigo: CodigoErro,
    mensagem: string,
    acao_sugerida: string,
    detalhes?: Record<string, unknown>,
  ) {
    super(mensagem);
    this.name = "KoldenError";
    this.codigo = codigo;
    this.acao_sugerida = acao_sugerida;
    if (detalhes) this.detalhes = detalhes;
  }

  toToolResult(): { isError: true; content: Array<{ type: "text"; text: string }> } {
    const payload = {
      erro: {
        codigo: this.codigo,
        mensagem: this.message,
        acao_sugerida: this.acao_sugerida,
        ...(this.detalhes ? { detalhes: this.detalhes } : {}),
      },
    };
    return {
      isError: true,
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
    };
  }
}

export function workspaceNaoEncontrado(path: string): KoldenError {
  return new KoldenError(
    "WORKSPACE_NAO_ENCONTRADO",
    `Diretório "${path}" não existe ou não é acessível.`,
    "Verifique se o caminho está absoluto e se o processo tem permissão de leitura. Em Windows, use barras duplas (C:\\\\foo) ou barras normais (C:/foo).",
    { path },
  );
}

export function codeCliIndisponivel(): KoldenError {
  return new KoldenError(
    "CODE_CLI_INDISPONIVEL",
    "Comando `code` não está no PATH.",
    "No VS Code abra Command Palette (Ctrl+Shift+P) → 'Shell Command: Install code command in PATH'. A auditoria segue sem extensões instaladas, só com os arquivos do workspace.",
  );
}

export function stackDesconhecida(stack: string, alternativas: string[]): KoldenError {
  return new KoldenError(
    "STACK_DESCONHECIDA",
    `Stack "${stack}" não está no catálogo do vscode-coach.`,
    `Stacks suportadas: ${alternativas.join(", ")}. Tente uma dessas, ou rode 'vscode_auditar_workspace' para detecção automática.`,
    { stack_pedida: stack, alternativas_proximas: alternativas },
  );
}

export function stackNaoDetectada(workspace_path: string, sinais: string[]): KoldenError {
  return new KoldenError(
    "STACK_NAO_DETECTADA",
    `Não foi possível inferir a stack do workspace "${workspace_path}".`,
    "Passe o parâmetro 'stack' explícito (ex: 'react-ts', 'python-fastapi') ou adicione um package.json/pyproject.toml/go.mod no workspace.",
    { workspace_path, sinais_procurados: sinais },
  );
}

export function sintomaAmbiguo(sintoma: string): KoldenError {
  return new KoldenError(
    "SINTOMA_AMBIGUO",
    `Sintoma "${sintoma}" é genérico demais para diagnóstico curado.`,
    "Refine: forneça a mensagem de erro literal, o nome da extensão envolvida ou o passo exato que falha. Ex: 'breakpoint não para em src/App.tsx linha 42' em vez de 'debugger não funciona'.",
    { sintoma },
  );
}

export function frameworkNaoDetectado(
  framework: string,
  comando_install: string,
): KoldenError {
  return new KoldenError(
    "FRAMEWORK_NAO_DETECTADO_EM_DEPS",
    `"${framework}" não está em package.json/pyproject.toml/requirements.txt do workspace.`,
    `Instale primeiro: ${comando_install}. Depois rode esta tool novamente.`,
    { framework, comando_install },
  );
}

export function personaDesconhecida(
  persona: string,
  validas: string[],
): KoldenError {
  return new KoldenError(
    "PERSONA_DESCONHECIDA",
    `Persona "${persona}" não está mapeada.`,
    `Personas válidas: ${validas.join(", ")}.`,
    { persona, validas },
  );
}

export function arquivoCatalogoAusente(arquivo: string): KoldenError {
  return new KoldenError(
    "ARQUIVO_CATALOGO_AUSENTE",
    `Arquivo de catálogo "${arquivo}" não foi encontrado em data/.`,
    "Build incompleto ou catálogo corrompido. Rode 'npm run build' de novo e verifique se 'data/' foi copiado para 'dist/data/' (ver tsconfig).",
    { arquivo },
  );
}
