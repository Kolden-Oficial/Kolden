---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/mcp/vscode-coach/README|README]]"
---

# PRD — MCP `vscode-coach`

> **Tipo:** PRD de MCP (não de agente — agente operador já existe: Piper em Dédalo)
> **Status:** RASCUNHO — aguardando aprovação do Ronan (Gate 4 do Ritual)
> **Versão:** 0.1.0
> **Data:** 2026-06-28
> **Dono:** Dédalo / Piper (mcp-integrator)
> **Briefing-pai:** `~/.claude/plans/caos-preciso-que-voce-giggly-hammock.md`

---

## §1 Propósito

`vscode-coach` é um servidor MCP que dá ao usuário (Ronan + qualquer dev consumindo a frota Kolden) uma camada opinionada de coach de produtividade para o VS Code: audita workspaces, recomenda kits de setup por stack, otimiza ergonomia, diagnostica problemas comuns e gera configurações reproduzíveis para devcontainer, testing e source control — tudo com curadoria Kolden em pt-BR.

**Não é:** um clone do GitHub Copilot. Não escreve no workspace do usuário (retorna patches, cliente decide aplicar). Não chama LLM internamente (o cliente raciocina sobre os blocos densos de informação curada que o servidor entrega).

**Justifica MCP (não CLI)** porque: (a) precisa rodar dentro do VS Code agent mode para responder no chat; (b) entrega conjunto coerente de tools relacionadas; (c) catálogo curado precisa ser único e versionado entre clientes (VS Code, Claude Code, Cursor).

---

## §2 Usuários e cenários

**Persona primária:** dev experiente que quer parar de garimpar listas de extensões no Twitter/Reddit e ter uma fonte opinionada confiável.

| # | Cenário | Tool primária | Tool encadeada |
|---|---|---|---|
| C1 | "Acabei de clonar um projeto React/TS. O que falta no meu VS Code?" | `auditar_workspace` | `recomendar_setup` |
| C2 | "Vou começar projeto Python com FastAPI. Configura tudo." | `recomendar_setup` | `setup_testing` |
| C3 | "Meu breakpoint não para no componente." | `diagnosticar_problema` | — |
| C4 | "Quero rodar isso num devcontainer reproduzível." | `setup_devcontainer` | — |
| C5 | "Configura vitest direito com coverage." | `setup_testing` | — |
| C6 | "Setup git num monorepo Node com husky." | `setup_source_control` | — |
| C7 | "Me ajuda a ser mais rápido — snippets e atalhos." | `otimizar_produtividade` | — |

---

## §3 Tools (7 — fluxos, não 1:1 de endpoint)

Princípios aplicados a todas (Piper + skill `descoberta-de-skill`):
- `description` em pt-BR, começa com verbo + frases-gatilho ("Use quando o usuário disser…")
- Output discrimina `concise` (resumo + próximo passo) vs `detailed` (estruturado completo)
- **NUNCA escreve no filesystem do workspace do usuário** — retorna conteúdo/patches
- Erros via `KoldenError(codigo, mensagem_pt, acao_sugerida)` — sempre acionáveis
- `annotations` corretas: `readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`

### 3.1 `vscode_auditar_workspace`

- **description:** "Audita um workspace VS Code lendo `.vscode/`, `package.json`, `.editorconfig`, `pyproject.toml` e extensões instaladas. Use quando o usuário disser 'analisa meu setup', 'o que tá faltando aqui', 'tá tudo ok no meu VS Code', ou ANTES de aplicar recomendações."
- **input:** `{ workspace_path: string, verbosidade: "concise"|"detailed" = "concise", incluir_extensoes_globais: bool = true }`
- **output concise:** `{ score: 0-100, gaps_criticos: string[], proximo_passo: string }`
- **output detailed:** + `extensoes_instaladas`, `extensoes_recomendadas_ausentes`, `arquivos_vscode_presentes`, `editorconfig_ok`, `gitignore_ok`, `stack_detectada`
- **annotations:** `readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false`
- **erros principais:**
  - `WORKSPACE_NAO_ENCONTRADO` → "Diretório `{path}` não existe. Verifique se o caminho está absoluto e acessível."
  - `CODE_CLI_INDISPONIVEL` → "Comando `code` não está no PATH. No VS Code: Command Palette → 'Shell Command: Install code command in PATH'. Auditoria segue só com arquivos do workspace."

### 3.2 `vscode_recomendar_setup`

- **description:** "Gera kit completo de setup VS Code para uma stack: lista de extensões, settings.json, launch.json e tasks.json prontos para colar. Use quando o usuário disser 'configura meu VS Code pra React+TS', 'novo projeto Python', 'preciso debugar Node', ou após auditar e identificar stack-alvo."
- **input:** `{ stack: string, intencoes: string[] = [], workspace_path?: string, verbosidade: "concise"|"detailed" = "concise" }`
- **output concise:** contagem + nomes das extensões + 1 linha por arquivo gerado
- **output detailed:** conteúdo completo de `settings.json`, `launch.json`, `tasks.json`, `extensions.json`
- **annotations:** `readOnlyHint: true, idempotentHint: true, openWorldHint: false`
- **erros:** `STACK_DESCONHECIDA` → "Stack `{stack}` não está no catálogo. Stacks suportadas: `{lista}`. Tente `vscode_auditar_workspace` para detecção automática."

### 3.3 `vscode_otimizar_produtividade`

- **description:** "Sugere keybindings, snippets e perfis VS Code por persona/stack. Use quando o usuário disser 'me ajuda a ser mais rápido', 'atalhos pra X', 'snippets de Y', ou depois de configurar setup básico."
- **input:** `{ persona: "frontend"|"backend"|"devops"|"fullstack"|"data", stack?: string, foco: "keybindings"|"snippets"|"perfil"|"todos" = "todos" }`
- **output concise:** top 5 atalhos + top 3 snippets + nome do perfil sugerido
- **output detailed:** `keybindings.json` completo + dicionário de snippets por linguagem + JSON de perfil exportável
- **annotations:** `readOnlyHint: true, idempotentHint: true, openWorldHint: false`

### 3.4 `vscode_diagnosticar_problema`

- **description:** "Diagnostica problemas comuns do VS Code a partir de um sintoma livre em linguagem natural. Use quando o usuário relatar 'debugger não para no breakpoint', 'extensão X não funciona', 'IntelliSense quebrou', 'TS server crashou', 'tá lento'."
- **input:** `{ sintoma: string, workspace_path?: string, contexto?: string }`
- **output concise:** 1 hipótese mais provável + 1 ação imediata
- **output detailed:** lista ranqueada de hipóteses, cada uma com `diagnostico_rapido` (comando a rodar) + `correcao_sugerida` + `link_doc`
- **annotations:** `readOnlyHint: true, idempotentHint: false, openWorldHint: false`
- **erros:** `SINTOMA_AMBIGUO` → "Sintoma `{x}` é genérico demais. Forneça mensagem de erro literal, nome da extensão envolvida ou passo que falha."

### 3.5 `vscode_setup_devcontainer`

- **description:** "Gera `.devcontainer/devcontainer.json` otimizado para a stack. Use quando o usuário disser 'devcontainer pra X', 'codespaces', 'ambiente reproduzível', 'docker dev'."
- **input:** `{ stack: string, features_extras?: string[], incluir_extensoes: bool = true }`
- **output:** conteúdo do `devcontainer.json` + (opcional) `Dockerfile` base
- **annotations:** `readOnlyHint: true, idempotentHint: true, openWorldHint: false`

### 3.6 `vscode_setup_testing`

- **description:** "Configura framework de teste (vitest/jest/pytest/playwright/mocha) no VS Code: extensão correta, `tasks.json` com runner, settings de descoberta, `launch.json` de debug do teste. Use APÓS o projeto já ter dependências do framework instaladas."
- **input:** `{ framework: "vitest"|"jest"|"pytest"|"playwright"|"mocha", workspace_path: string, incluir_coverage: bool = true }`
- **output:** extensão recomendada + patches para `settings.json`, `tasks.json`, `launch.json`
- **annotations:** `readOnlyHint: true, idempotentHint: true, openWorldHint: false`
- **erros:** `FRAMEWORK_NAO_DETECTADO_EM_DEPS` → "`{framework}` não está em `package.json`/`pyproject.toml`. Instale primeiro: `{comando_install}`."

### 3.7 `vscode_setup_source_control`

- **description:** "Configura source control no VS Code: `.gitignore` por stack, configurações do GitLens, hooks recomendados (husky/lint-staged ou pre-commit), settings de diff/merge. Use em projeto novo ou ao adotar boas práticas de git."
- **input:** `{ stack: string, workspace_path: string, incluir_hooks: bool = true, ferramenta_hooks: "husky"|"pre-commit"|"lefthook" }`
- **output:** `.gitignore` + patches de `settings.json` (GitLens) + arquivos de config de hooks
- **annotations:** `readOnlyHint: true, idempotentHint: true, openWorldHint: false`

**Custo de contexto somado (estimado):** ~1540 tokens. Abaixo do teto Piper de 2k. Se estourar, fusão de candidatos: `setup_devcontainer + setup_testing + setup_source_control` → `vscode_setup_ambiente(tipo: "devcontainer"|"testing"|"source-control")`.

---

## §4 Knowledge Base (catálogo curado, NÃO LLM no loop)

| Arquivo | Estrutura | Update path |
|---|---|---|
| `data/extensoes-por-stack.yaml` | `<stack>: { essenciais: [{id, motivo, configuracao_minima, verificado_em}], recomendadas, evitar }` | PR + cron quinzenal Caos valida ID vs Marketplace |
| `data/extensoes-essenciais.yaml` | extensões universais (eslint, prettier, gitlens, error-lens, code-spell-checker) | PR |
| `data/diagnosticos.yaml` | `<id>: { sintomas: [str], hipoteses: [{verificacao, correcao, link_doc}] }` | PR |
| `data/snippets-por-stack/*.json` | JSON nativo VS Code (cai direto em `.vscode/<lang>.code-snippets`) | PR |
| `data/perfis/*.code-profile` | Formato exportável VS Code (importação direta) | PR |
| `data/devcontainers/*.json` | `devcontainer.json` por stack base | PR |
| `data/git/gitignore-templates/*.gitignore` | Por stack (extraídos de github/gitignore + curadoria Kolden) | PR |
| `data/git/hooks/*` | Configs husky/lint-staged/pre-commit/lefthook | PR |

**Stacks na v1 (mínimo viável):** `react-ts`, `react-vite`, `nextjs`, `node-express`, `node-fastify`, `python-fastapi`, `python-django`, `python-data` (jupyter+pandas), `go`, `rust`. 10 stacks cobrem ~90% do uso da casa.

**Quando o LLM do cliente entra (fallback):**
- `vscode_diagnosticar_problema` sem match curado (`fuzzy_score < 0.4`) → retorna `{ status: "sem_match_curado", contexto_para_llm: {...} }`, cliente raciocina.
- `vscode_recomendar_setup` com stack desconhecida → retorna 3 stacks próximas + erro `STACK_DESCONHECIDA`.

---

## §5 Requisitos Não-Funcionais

| # | Requisito | Verificação |
|---|---|---|
| NF1 | pt-BR consistente (descrições, mensagens de erro, docs, comentários de código) | Revisor (Fase 6) — sem strings em inglês fora de nomes técnicos do protocolo |
| NF2 | Custo de contexto total < 2k tokens (7 tools somadas) | Medição no eval harness |
| NF3 | Tools idempotentes (exceto `diagnosticar_problema`) | Chamada 2x produz mesmo output |
| NF4 | Zero escrita no workspace do usuário | Code review: ausência de `fs.writeFile` em `tools/` |
| NF5 | Zero segredos no código ou em arquivos versionados | Egide (verificação estática) + ADR 0002 |
| NF6 | Stack Node/TS, MCP SDK oficial, schemas Zod com `.strict()` | `tsc --strict` + lint |
| NF7 | Sem chamadas a LLM internas | Code review: nenhum import de SDK Anthropic/OpenAI/etc. |
| NF8 | Funciona em Windows (Ronan), Linux e macOS | README documenta variantes de path |
| NF9 | Logging baseado em arquivo (não stdout — quebraria stdio) | Pino com transporte de arquivo |
| NF10 | Build determinístico (`npm run build` → `dist/`) | CI valida (futuro) |

---

## §6 Arquitetura (resumo — detalhes no briefing-pai §2)

```
C:\Kolden\Dedalo\mcp\vscode-coach\
├── package.json              # bin: "vscode-coach-mcp"
├── tsconfig.json             # strict: true
├── README.md                 # pt-BR — instalação VS Code + Claude Code
├── adr/
│   ├── 0001-stack-node-typescript.md
│   └── 0002-sem-segredos-v1.md
├── src/
│   ├── index.ts              # entrypoint stdio
│   ├── server.ts             # McpServer + registerTool
│   ├── tools/                # 7 arquivos (1 por tool)
│   ├── lib/                  # exec-code-cli, ler-workspace, catalogo, render-templates, erros
│   └── schemas/              # Zod reutilizáveis (concise vs detailed)
├── data/                     # knowledge base (PR único caminho)
├── eval/
│   ├── perguntas.yaml        # 10 tarefas reais
│   └── rodar-eval.ts
└── dist/                     # tsc → JS
```

**Stack:** Node 22+, TypeScript 5.6+, `@modelcontextprotocol/sdk` última, `zod`, `js-yaml`, `pino`.

**Consumo (zero código adicional):**
```jsonc
// VS Code (.vscode/mcp.json do workspace do usuário)
{ "servers": { "vscode-coach": { "type": "stdio", "command": "node",
  "args": ["C:\\Kolden\\Dedalo\\mcp\\vscode-coach\\dist\\index.js"] } } }
```
```bash
# Claude Code
claude mcp add vscode-coach -- node C:\Kolden\Dedalo\mcp\vscode-coach\dist\index.js
```

---

## §7 Critérios de Aceite (Gate 7 — entrega)

### 7.1 Eval automatizado (10/10 pass + 0 warn)

10 tarefas em `eval/perguntas.yaml`:

| # | Prompt | Tool esperada | Critério estrutural |
|---|---|---|---|
| 1 | "Audita workspace `C:\sandbox\projeto-react`" | `auditar_workspace` | score 0-100, gaps ≥1, próximo_passo imperativo |
| 2 | "Configura React+TS com Vitest" | `recomendar_setup` + `setup_testing` | settings com eslint+prettier, tasks de teste, launch pwa-chrome |
| 3 | "Breakpoint não para no componente React" | `diagnosticar_problema` | ≥2 hipóteses, inclui sourcemap ou launch-tipo-errado |
| 4 | "Devcontainer Python com Poetry" | `setup_devcontainer` | features python + ms-python.python em extensions |
| 5 | "Snippets úteis pra dev frontend React" | `otimizar_produtividade` foco=snippets | rfc/useState/useEffect presentes |
| 6 | "Git num monorepo Node com husky" | `setup_source_control` | .gitignore Node + husky + lint-staged |
| 7 | "Configura VS Code pra Crystal lang" | `recomendar_setup` | STACK_DESCONHECIDA + alternativas próximas |
| 8 | "Meu VS Code tá lento" | `diagnosticar_problema` | SINTOMA_AMBIGUO OU hipóteses gerais (memória, extensões) |
| 9 | "Auditoria detalhada de `C:\sandbox\x`" | `auditar_workspace` verbosidade=detailed | payload detailed ≥3× concise |
| 10 | "Audita meu workspace e já dá o setup ideal" | encadeamento `auditar` → `recomendar_setup` | cliente faz 2 chamadas, stack da 2ª vem da 1ª |

**Pass/fail:**
- **Pass:** tool correta invocada + critérios estruturais atendidos + ausência de exceção não tratada.
- **Fail (bloqueante):** tool errada, payload não valida contra `outputSchema`, mensagem de erro em inglês ou genérica.
- **Warn:** tool correta mas verbosidade trocada / `annotations` incoerente.

### 7.2 Smoke test manual (Ronan observa)

1. Build (`npm run build` em `vscode-coach/`) sem warning.
2. `.vscode/mcp.json` num workspace teste; Command Palette "MCP: List Servers" mostra `vscode-coach` healthy.
3. Copilot agent mode: "audita meu workspace" → invoca `auditar_workspace` corretamente.
4. "Setup React+TS com Vitest" → conteúdo de `settings.json`+`launch.json` colável e correto.
5. Path inexistente → mensagem `WORKSPACE_NAO_ENCONTRADO` em pt-BR.
6. Repetir 3-5 no Claude Code (`claude mcp add` → invocar `vscode_*`).

### 7.3 Camada Kolden (skill `criacao-de-mcp` Passo 3)

- [ ] ADR 0001 (Node/TS) e ADR 0002 (sem segredos v1) escritos
- [ ] Entrada `vscode-coach-mcp` em `Caos/dados/registro-de-entidades.yaml`
- [ ] `sobre-a-empresa/Ferramentas/VSCode/ferramentas.md` ganha seção "MCP vscode-coach"
- [ ] `sobre-a-empresa/Ferramentas/ferramentas.md` ganha linha no índice
- [ ] `sobre-a-empresa/Ferramentas/mcp-status.md` ganha linha
- [ ] `sobre-a-empresa/Ferramentas/vscode-coach/ferramentas.md` criado (manual próprio)

---

## §8 Fora de Escopo (v1)

| Item | Por que não agora | Quando |
|---|---|---|
| Integração com Marketplace API privado | Não há segredo na v1 (NF5) | v2 se sync de extensões em cloud virar requisito |
| UI dentro do VS Code (webview) | Foco é CLI/agent mode | Nunca — quebra premissa CLI-first |
| Auto-aplicar patches no workspace | NF4 — cliente decide | Provavelmente nunca (princípio "less is more") |
| Sincronização entre máquinas do Ronan | Catálogo já é versionado em git | v2 se precisar perfil "Kolden" exportável |
| Cobertura de Cursor-specific / Windsurf-specific | Foco VS Code primeiro | v2 conforme demanda |
| Stacks Ruby, Java, .NET, PHP, Elixir | 90% do uso da casa é JS/Python/Go/Rust | Sob demanda |

---

## §9 Riscos e Mitigações

| Risco | Severidade | Mitigação |
|---|---|---|
| Sobreposição com GitHub Copilot ("Workspace recommendations") | Média | Diferencial Kolden: curadoria opinionada, stack-aware end-to-end, diagnóstico pt-BR, cross-cliente, reproduzível |
| Catálogo de extensões obsolesce | Média | Campo `verificado_em` + cron quinzenal Caos valida vs Marketplace, abre issue se 404 |
| Path Windows (`\\`) vs Unix | Baixa | README documenta variantes; lib `path` do Node normaliza |
| `code` CLI ausente do PATH | Baixa | Erro `CODE_CLI_INDISPONIVEL` com ação clara; `auditar_workspace` degrada |
| Conflito com `.vscode/extensions.json` existente | Baixa | Tools retornam patch (diff), cliente decide aplicar |
| Custo de contexto > 2k | Baixa | Plano de fusão em `setup_ambiente` documentado |
| Stack Node/TS desvia do padrão Kolden Python/FastMCP | Baixa | ADR 0001 justifica; revisor verifica |
| Drift entre versões VS Code | Baixa | README pina matriz de versões testadas (1.95+) |

---

## §10 Modos de falha / pré-morte (Rodada 5 do Caos)

Imaginando o projeto fracassado daqui a 3 meses, as causas mais prováveis:

1. **Catálogo virou ruído** — ninguém atualiza, IDs ficam obsoletos, recomenda extensão arquivada. **Mitigação:** `verificado_em` obrigatório + cron Caos + PR como único caminho.
2. **Custo de contexto inviabilizou uso** — 7 tools comem 2.5k de contexto, cliente Cursor (limite 40 tools) rejeita. **Mitigação:** medição no eval, fusão em `setup_ambiente` se estourar.
3. **Diferencial fraco vs Copilot** — Ronan testa, sente que Copilot já faz "bom o bastante". **Mitigação:** pivot para o que Copilot NÃO faz: diagnóstico curado em pt-BR, devcontainer/source-control end-to-end, cross-cliente.
4. **Bug de stdout polui stdio** — alguma lib loga em stdout, MCP quebra. **Mitigação:** NF9 — Pino com transporte de arquivo, lint busca `console.log`.
5. **Tools não são invocadas** — descriptions ruins, LLM nunca escolhe `vscode_*`. **Mitigação:** descrições começam com verbo + frase-gatilho ("Use quando o usuário disser…"), validado no eval (10/10).

---

## §11 Ordem de construção (Fase 5.4)

Cascata (cada etapa fecha antes da próxima começar):

1. `package.json` + `tsconfig.json` + `README.md` + ADRs
2. `src/lib/erros.ts` + `src/lib/exec-code-cli.ts` + `src/lib/ler-workspace.ts` + `src/lib/catalogo.ts` + `src/lib/render-templates.ts`
3. `src/schemas/*.ts` (Zod reutilizável)
4. `data/extensoes-por-stack.yaml` + `data/extensoes-essenciais.yaml` + `data/diagnosticos.yaml` + `data/snippets-por-stack/react-ts.json` (seed: 3 stacks + 1 lang de snippets)
5. `src/tools/auditar-workspace.ts` (mais simples — só leitura)
6. `src/tools/recomendar-setup.ts`
7. `src/tools/otimizar-produtividade.ts`
8. `src/tools/diagnosticar-problema.ts`
9. `src/tools/setup-devcontainer.ts` + `data/devcontainers/*.json`
10. `src/tools/setup-testing.ts`
11. `src/tools/setup-source-control.ts` + `data/git/*`
12. `src/server.ts` (registra as 7 tools) + `src/index.ts` (entrypoint stdio)
13. `eval/perguntas.yaml` + `eval/rodar-eval.ts`
14. `npm run build` + smoke test local + smoke test VS Code/Claude Code

Estimativa de ondas: **3 sessões dedicadas do Caos** (briefing → infra+3 tools+catalogo → 4 tools restantes+eval+catálogo Kolden).

---

## §12 Aprovação

Este PRD precisa de **aprovação explícita do Ronan** antes de qualquer escrita de código (Constituição Art. III).

**Itens a confirmar:**

1. Escopo das 7 tools (sem cortar, sem adicionar)
2. Stacks na v1 (10 listadas em §4) — falta alguma? Sobra alguma?
3. Stack Node/TS confirmada (ADR 0001 segue)
4. Sem segredos na v1 confirmado (ADR 0002 segue)
5. Critérios de aceite (10 evals + 6 smoke tests) suficientes
6. Modos de falha cobertos (5 listados em §10)

**Se aprovado:** Caos avança para Fase 5.4 (construção). Próxima sessão entrega `package.json` + ADRs + libs + 3 tools + catálogo seed (ondas 2 do briefing-pai).

**Se rejeitado/ajustado:** Ronan aponta mudanças, PRD é revisto, novo gate.
