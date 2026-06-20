# Tarefa: Configuração do Claude Code em Projeto Brownfield

**Task ID:** brownfield-setup
**Version:** 1.0
**Purpose:** Configurar o Claude Code em um projeto brownfield existente, respeitando convenções estabelecidas e protegendo caminhos críticos
**Orchestrator:** @project-integrator (Conduit)
**Mode:** Interativo (elicit: true)
**Quality Standard:** Nenhum fluxo de trabalho existente interrompido, regras de deny protegem caminhos críticos, convenções documentadas

---

## Visão Geral

Esta tarefa difere de integrate-project por focar em **descobrir e respeitar convenções existentes** em vez de estabelecer novas. A abordagem brownfield prioriza a segurança: proteger o que existe, ensinar ao Claude as regras do projeto e integrar sem interromper fluxos de trabalho estabelecidos.

```
ENTRADA (project_root + critical_paths)
    |
[FASE 1: VARREDURA DO CODEBASE]
    -> Descobrir frameworks, padrões, convenções de nomenclatura
    -> Identificar o estilo de código a partir do código existente
    -> Mapear a estrutura e a arquitetura do projeto
    |
[FASE 2: DETECÇÃO DO TOOLING EXISTENTE]
    -> Detectar pipelines de CI/CD
    -> Detectar configuração de linting, formatação e testes
    -> Identificar fluxos de trabalho de deploy
    |
[FASE 3: CLAUDE.MD QUE RESPEITA CONVENÇÕES]
    -> Gerar um CLAUDE.md que ensina ao Claude os modos do projeto
    -> Documentar os padrões de código encontrados no código existente
    -> Incluir terminologia específica do projeto
    |
[FASE 4: REGRAS DE PADRÃO]
    -> Criar regras que codificam padrões específicos do projeto
    -> Ensinar ao Claude as decisões arquiteturais
    -> Documentar anti-padrões a serem evitados
    |
[FASE 5: REGRAS DE DENY PARA CAMINHOS CRÍTICOS]
    -> Identificar arquivos/diretórios que não devem ser modificados
    -> Configurar regras de deny no settings.json
    -> Configurar exceções de allow para operações específicas
    |
[FASE 6: INTEGRAÇÃO DE FLUXO DE TRABALHO]
    -> Configurar hooks para o CI/CD existente
    -> Configurar alinhamento de pre-commit com os linters existentes
    -> Garantir que o Claude siga o fluxo de trabalho git da equipe
    |
SAÍDA: Config de integração brownfield + caminhos protegidos + docs de convenções
```

---

## Entradas

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| project_root | string | Auto-detect | yes | Projeto existente com código-fonte |
| critical_paths | array | User | no | Caminhos que nunca devem ser modificados pela IA |
| team_conventions_doc | string | User | no | Caminho para o doc de padrões de código existente |
| deployment_branch | string | User | no | Branch usada para deploy (padrão: main) |
| legacy_areas | array | User | no | Diretórios com código legado com os quais ter cuidado |

---

## Pré-condições

1. O projeto existe com codebase estabelecido (não é greenfield)
2. O projeto tem histórico de commits existente (para analisar convenções)
3. O usuário consegue identificar os caminhos críticos que precisam de proteção
4. O Git está inicializado e funcional

---

## Fase 1: Varredura do Codebase

**Objetivo:** Entender os padrões estabelecidos do projeto sem alterar nada.

### Passos

1.1. Varrer a estrutura de diretórios e construir uma árvore de fontes:

```
src/
  components/     -> Componentes React (funcionais, arrow functions)
  services/       -> Camada de serviço da API (baseada em classes)
  utils/          -> Funções utilitárias (funções puras)
  hooks/          -> Hooks React customizados (nomenclatura use*)
  types/          -> Definições de tipos TypeScript
```

1.2. Analisar os padrões de código a partir dos arquivos existentes:
   - Estilo de import (named vs default, absoluto vs relativo)
   - Padrões de componentes (funcional vs classe, uso de hooks)
   - Padrões de tratamento de erros (try/catch vs error boundaries)
   - Convenções de nomenclatura (camelCase, PascalCase, kebab-case para arquivos)
   - Estilo e densidade de comentários

1.3. Detectar padrões arquiteturais:
   - Abordagem de gerenciamento de estado
   - Padrões de integração com API
   - Estrutura de roteamento
   - Fluxo de autenticação

1.4. Construir um inventário de padrões:

```yaml
patterns:
  imports: "absolute with @ alias"
  components: "functional with arrow functions"
  state: "Zustand stores in src/stores/"
  api: "axios instances in src/services/"
  naming:
    files: "kebab-case"
    components: "PascalCase"
    functions: "camelCase"
    constants: "UPPER_SNAKE_CASE"
```

---

## Fase 2: Detecção do Tooling Existente

**Objetivo:** Mapear todas as ferramentas e fluxos de trabalho de desenvolvimento existentes.

### Passos

2.1. Verificar a existência de CI/CD:
   - `.github/workflows/*.yml` (GitHub Actions)
   - `.gitlab-ci.yml` (GitLab CI)
   - `Jenkinsfile` (Jenkins)
   - `.circleci/` (CircleCI)
   - `vercel.json` (Vercel)
   - `netlify.toml` (Netlify)

2.2. Verificar a existência de ferramentas de qualidade de código:
   - `.eslintrc*` / `eslint.config.*` (ESLint)
   - `.prettierrc*` (Prettier)
   - `.stylelintrc*` (Stylelint)
   - `.editorconfig` (EditorConfig)
   - `commitlint.config.*` (Linting de mensagem de commit)

2.3. Verificar a existência de testes:
   - `jest.config.*` (Jest)
   - `vitest.config.*` (Vitest)
   - `cypress.config.*` (Cypress)
   - `playwright.config.*` (Playwright)

2.4. Documentar os scripts existentes do package.json:

```yaml
scripts:
  dev: "next dev"
  build: "next build"
  test: "jest --coverage"
  lint: "eslint src/"
  format: "prettier --write src/"
```

---

## Fase 3: CLAUDE.md que Respeita Convenções

**Objetivo:** Criar um CLAUDE.md que ensine ao Claude a escrever código parecido com o do codebase existente.

### Passos

3.1. Escrever o CLAUDE.md com ênfase nos padrões existentes:

```markdown
# {Project Name}

## Code Standards (from existing codebase)
- Import style: {detected pattern}
- Component pattern: {detected pattern}
- File naming: {detected pattern}
- Error handling: {detected pattern}

## Commands
- `{npm run dev}` -- Start development server
- `{npm test}` -- Run tests
- `{npm run lint}` -- Run linter

## Architecture
{Brief description of project structure}

## Critical Rules
- NEVER modify files in {critical_paths}
- ALWAYS follow existing patterns in neighboring files
- When in doubt, check how similar code is written in the codebase
```

3.2. Se existir um documento de convenções da equipe, incorporar suas regras.
3.3. Manter abaixo de 200 linhas. Mover os detalhes para arquivos de regras.

---

## Fase 4: Regras de Padrão

**Objetivo:** Criar regras que codificam o conhecimento específico do projeto.

### Passos

4.1. Criar `.claude/rules/` com arquivos de padrões:

| Rule | Content |
|------|---------|
| `code-style.md` | Convenções de nomenclatura, padrões de import, estrutura de arquivos |
| `architecture.md` | Limites de camadas, fluxo de dados, regras de dependência |
| `anti-patterns.md` | Coisas que nunca se deve fazer neste codebase |
| `legacy-areas.md` | Tratamento especial para seções de código legado |

4.2. Usar ativação baseada em path para regras específicas de contexto:

```markdown
---
paths:
  - "src/legacy/**"
---
# Legacy Code Rules
- Do NOT refactor unless explicitly asked
- Maintain existing patterns even if suboptimal
- Add tests before making any changes
```

---

## Fase 5: Regras de Deny para Caminhos Críticos

**Objetivo:** Proteger arquivos e diretórios que a IA não deve modificar.

### Caminhos Críticos Comuns

| Path Pattern | Reason |
|-------------|--------|
| `.env*` | Segredos e credenciais |
| `**/migrations/**` | Migrations de banco de dados (executar, não editar) |
| `docker-compose.prod.yml` | Infraestrutura de produção |
| `*.lock` | Arquivos de lock (gerenciados por gerenciadores de pacotes) |
| `.github/workflows/**` | Pipelines de CI/CD |
| `infrastructure/**` | Infraestrutura como código |

### Passos

5.1. Coletar caminhos críticos do usuário e da detecção automática.
5.2. Configurar regras de deny em `.claude/settings.json`:

```json
{
  "permissions": {
    "deny": [
      "Edit(.env*)",
      "Write(.env*)",
      "Edit(**/migrations/**)",
      "Edit(docker-compose.prod.yml)",
      "Edit(.github/workflows/**)"
    ],
    "allow": [
      "Read(**)"
    ]
  }
}
```

5.3. Verificar se as regras de deny não bloqueiam trabalho de desenvolvimento legítimo.

---

## Fase 6: Integração de Fluxo de Trabalho

**Objetivo:** Fazer o Claude Code funcionar dentro dos fluxos de trabalho existentes do projeto.

### Passos

6.1. Configurar hooks de pre-tool-use para alinhar com os linters existentes:
   - Após escrever código, sugerir executar o comando de lint do projeto
   - Após modificar testes, sugerir executar o comando de teste do projeto

6.2. Alinhar o comportamento do git com as convenções da equipe:
   - Detectar o formato de mensagem de commit a partir do histórico (conventional commits, etc.)
   - Documentar as convenções de nomenclatura de branches
   - Anotar qualquer template de PR ou requisito de revisão

6.3. Configurar hooks de notificação para operações críticas:
   - Alertar ao modificar arquivos de configuração compartilhados
   - Alertar ao adicionar novas dependências

---

## Formato de Saída

```yaml
brownfield_setup_result:
  project_analysis:
    language: "TypeScript"
    framework: "Next.js 14"
    patterns_detected: 12
    tooling_detected: ["ESLint", "Prettier", "Jest", "GitHub Actions"]
  files_created:
    - "CLAUDE.md"
    - ".claude/settings.json"
    - ".claude/rules/code-style.md"
    - ".claude/rules/architecture.md"
    - ".claude/rules/anti-patterns.md"
  critical_paths_protected: 5
  deny_rules_configured: 5
  existing_workflows_integrated: true
  disruption_risk: "none"
  overall_status: "PASS"
```

---

## Condições de Veto

| Condition | Action |
|-----------|--------|
| O projeto não tem código-fonte existente | HALT -- usar integrate-project para greenfield |
| CLAUDE.md existe e é mantido manualmente | WARN -- perguntar antes de sobrescrever |
| Não é possível detectar nenhum padrão de código (repo vazio) | HALT -- nada com o que aprender |
| A lista de caminhos críticos está vazia e o projeto é grande | WARN -- recomendar fortemente identificar os caminhos críticos |
| O .claude/settings.json existente tem regras de deny | MERGE -- adicionar às regras existentes, não substituir |
