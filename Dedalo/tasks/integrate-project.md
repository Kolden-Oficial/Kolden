# Tarefa: Integrar o Claude Code em um Projeto Existente

**Task ID:** integrate-project
**Version:** 1.0
**Purpose:** Configurar a infraestrutura do Claude Code em um projeto existente com configuração sob medida
**Orchestrator:** @project-integrator (Conduit)
**Mode:** Interativo (elicit: true)
**Quality Standard:** A integração passa no smoke test, todos os arquivos de configuração são válidos, CLAUDE.md com menos de 200 linhas

---

## Visão Geral

Esta tarefa integra o Claude Code em um projeto existente detectando a stack tecnológica do projeto, gerando a configuração apropriada, configurando regras, hooks e servidores MCP. Segue a filosofia Unix: fazer uma coisa bem feita, compor pequenas ferramentas.

```
INPUT (project_root)
    |
[FASE 1: DETECÇÃO DO PROJETO]
    -> Buscar por package.json, requirements.txt, go.mod, etc.
    -> Identificar frameworks, linguagens e padrões
    -> Detectar CI/CD, linting e configuração de testes existentes
    |
[FASE 2: GERAÇÃO DO CLAUDE.MD]
    -> Gerar CLAUDE.md sob medida para o projeto
    -> Incluir padrões de código, testes, convenções de git
    -> Manter com menos de 200 linhas
    |
[FASE 3: CONFIGURAÇÃO DO SETTINGS]
    -> Criar .claude/settings.json
    -> Configurar regras de deny/allow para caminhos críticos
    -> Configurar permissões apropriadas ao projeto
    |
[FASE 4: CONFIGURAÇÃO DAS REGRAS]
    -> Criar o diretório .claude/rules/
    -> Escrever regras contextuais baseadas em caminhos
    -> Configurar o comportamento de carregamento automático
    |
[FASE 5: CONFIGURAÇÃO DOS HOOKS]
    -> Identificar pontos de integração com o fluxo de trabalho do projeto
    -> Configurar guardas pre-tool-use se necessário
    -> Configurar hooks de notificação
    |
[FASE 6: CONFIGURAÇÃO DO MCP]
    -> Identificar servidores MCP úteis para a stack
    -> Configurar MCPs específicos do projeto
    -> Validar a disponibilidade das ferramentas
    |
[FASE 7: CONFIGURAÇÃO DOS AGENTES]
    -> Criar definições de subagents específicas do projeto
    -> Configurar agentes para o domínio do projeto
    -> Testar a execução do agente
    |
[FASE 8: SMOKE TEST]
    -> Verificar se todos os arquivos de configuração são analisados corretamente
    -> Testar se o Claude Code consegue ler e entender o projeto
    -> Validar se as regras carregam nos contextos corretos
    |
OUTPUT: Integração completa do Claude Code + resultados do smoke test
```

---

## Entradas

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| project_root | string | Detecção automática | yes | Diretório válido com código-fonte |
| project_name | string | Automático ou usuário | no | Nome do projeto legível por humanos |
| primary_language | string | Detecção automática | no | Linguagem de programação principal |
| team_size | string | Usuário | no | solo / small / medium / large |
| existing_ci | boolean | Detecção automática | no | Se o CI/CD já está configurado |

---

## Pré-condições

1. O diretório do projeto existe e contém código-fonte
2. O CLI do Claude Code está instalado
3. O usuário tem acesso de escrita ao diretório do projeto
4. O Git está inicializado no projeto (ou será)

---

## Fase 1: Detecção do Projeto

**Objetivo:** Entender a stack tecnológica e as convenções do projeto.

### Sinais de Detecção

| File | Indica |
|------|-----------|
| `package.json` | Projeto Node.js -- verificar scripts, dependências |
| `tsconfig.json` | Uso de TypeScript |
| `next.config.*` | Framework Next.js |
| `requirements.txt` / `pyproject.toml` | Projeto Python |
| `go.mod` | Projeto Go |
| `Cargo.toml` | Projeto Rust |
| `.eslintrc*` / `eslint.config.*` | ESLint configurado |
| `.prettierrc*` | Prettier configurado |
| `jest.config.*` / `vitest.config.*` | Framework de testes |
| `Dockerfile` / `docker-compose.yml` | Containerizado |
| `.github/workflows/` | CI/CD com GitHub Actions |
| `supabase/` | Banco de dados Supabase |

### Passos

1.1. Escanear a raiz do projeto em busca de todos os sinais de detecção acima.
1.2. Ler o `package.json` (se existir) em busca de scripts e dependências.
1.3. Identificar o padrão de estrutura do projeto (monorepo, single-app, biblioteca).
1.4. Detectar as regras de formatação de código e linting existentes.
1.5. Documentar os achados:

```yaml
detection:
  language: "TypeScript"
  framework: "Next.js 14"
  package_manager: "npm"
  test_framework: "Jest"
  linter: "ESLint"
  formatter: "Prettier"
  ci: "GitHub Actions"
  database: "Supabase"
  structure: "single-app"
```

---

## Fase 2: Geração do CLAUDE.md

**Objetivo:** Criar um arquivo CLAUDE.md conciso e eficaz.

### Diretrizes

- Manter com menos de 200 linhas (compatibilidade com auto-memory)
- Focar no que o Claude precisa saber, não em documentação geral
- Incluir: padrões de código, comandos de testes, convenções de git, decisões-chave de arquitetura
- Usar seções gerenciadas (`<!-- AIOS-MANAGED-START -->`) para conteúdo atualizável automaticamente

### Passos

2.1. Gerar o CLAUDE.md com estas seções:
   - Visão geral do projeto (2-3 frases)
   - Resumo da stack tecnológica (tabela)
   - Padrões de código (a partir da configuração detectada do linter/formatter)
   - Comandos de testes (a partir dos scripts do package.json)
   - Convenções de git (a partir do histórico de commits existente)
   - Diretórios-chave e seus propósitos
   - Referência de comandos comuns

2.2. Verificar se a contagem de linhas está abaixo de 200.
2.3. Se ultrapassar 200, mover as seções detalhadas para arquivos em `.claude/rules/`.

---

## Fase 3: Configuração do Settings

**Objetivo:** Criar `.claude/settings.json` com as regras apropriadas.

### Passos

3.1. Criar `.claude/settings.json` com:

```json
{
  "permissions": {
    "allow": [],
    "deny": []
  }
}
```

3.2. Adicionar regras de deny para caminhos sensíveis:
   - Arquivos `.env*` (segredos)
   - Arquivos `credentials*`
   - `**/node_modules/**`
   - Arquivos de configuração de produção

3.3. Adicionar regras de allow para operações comuns de desenvolvimento:
   - Comandos de build
   - Comandos de testes
   - Comandos de lint/format

---

## Fase 4: Configuração das Regras

**Objetivo:** Criar regras contextuais que carregam com base nos caminhos dos arquivos.

### Passos

4.1. Criar o diretório `.claude/rules/`.
4.2. Criar regras com base na estrutura do projeto:

| Rule File | Ativa Quando | Conteúdo |
|-----------|----------------|---------|
| `frontend.md` | Editando `src/components/**` | Padrões de componentes, convenções de estilização |
| `api.md` | Editando `src/api/**` ou `pages/api/**` | Padrões de API, tratamento de erros |
| `testing.md` | Editando `**/*.test.*` | Convenções de testes, padrões de mock |
| `database.md` | Editando `supabase/**` ou `prisma/**` | Padrões de migração, regras de schema |

4.3. Cada arquivo de regra deve usar frontmatter para especificar os caminhos de ativação:

```markdown
---
paths:
  - "src/components/**"
---
# Regras de Componentes
...
```

---

## Fase 5: Configuração dos Hooks

**Objetivo:** Integrar os hooks do Claude Code ao fluxo de trabalho do projeto.

### Passos

5.1. Avaliar quais hooks beneficiariam o projeto:
   - `PreToolUse` -- proteger contra a modificação de arquivos protegidos
   - `PostToolUse` -- registrar o uso de ferramentas para auditoria
   - `Notification` -- alertar sobre eventos específicos
5.2. Criar hooks em `.claude/hooks/` se o projeto precisar de comportamento customizado.
5.3. Registrar os hooks em `.claude/settings.json`.

---

## Fase 6: Configuração do MCP

**Objetivo:** Configurar os servidores MCP relevantes para o projeto.

### Passos

6.1. Com base na stack tecnológica detectada, recomendar servidores MCP.
6.2. Delegar à tarefa mcp-workflow para a configuração completa.
6.3. Documentar os MCPs configurados no CLAUDE.md.

---

## Fase 7: Configuração dos Agentes

**Objetivo:** Criar definições de subagents específicas do projeto.

### Passos

7.1. Com base na complexidade do projeto, criar agentes:
   - Para projetos simples: nenhum agente customizado necessário
   - Para projetos médios: 1-2 agentes especializados (ex.: code-reviewer, test-writer)
   - Para projetos grandes: equipe completa de agentes com topologia

7.2. Criar os arquivos de agente em `.claude/agents/`.
7.3. Delegar à tarefa create-agent-definition para cada agente.

---

## Fase 8: Smoke Test

**Objetivo:** Verificar se a integração funciona de ponta a ponta.

### Passos

8.1. Verificar se todos os arquivos de configuração são JSON/YAML válidos.
8.2. Verificar se o CLAUDE.md tem menos de 200 linhas e contém as seções-chave.
8.3. Testar se as regras carregam ao editar arquivos relevantes.
8.4. Testar se os servidores MCP conectam (se configurados).
8.5. Executar um comando simples do Claude Code para verificar se tudo funciona:
   - Pedir ao Claude para ler um arquivo de código-fonte e explicá-lo
   - Verificar se ele segue as convenções do CLAUDE.md

---

## Formato de Saída

```yaml
integration_result:
  project_type: "Next.js TypeScript"
  files_created:
    - "CLAUDE.md"
    - ".claude/settings.json"
    - ".claude/rules/frontend.md"
    - ".claude/rules/testing.md"
  mcp_configured: ["context7"]
  agents_created: []
  smoke_test:
    config_valid: true
    rules_load: true
    mcp_connected: true
    claude_responds: true
  overall_status: "PASS"
```

---

## Condições de Veto

| Condition | Action |
|-----------|--------|
| A raiz do projeto não tem arquivos de código-fonte | HALT -- nada para integrar |
| O CLAUDE.md já existe e tem seções gerenciadas | WARN -- mesclar em vez de sobrescrever |
| O .claude/settings.json existe com regras customizadas | WARN -- mesclar, não sobrescrever |
| Sem acesso de escrita ao diretório do projeto | HALT -- não é possível criar arquivos de configuração |
| O projeto usa uma linguagem não suportada (sem sinais de detecção) | WARN -- gerar um CLAUDE.md genérico |
