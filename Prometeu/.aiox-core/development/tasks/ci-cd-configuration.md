---
id: ci-cd-configuration
name: Configurar Pipeline de CI/CD
agent: github-devops
category: devops
complexity: high
tools:
  - github-cli       # Gerenciar workflows e configurações do repositório
  - coderabbit-free  # Revisão automatizada de código (tier GRATUITO)
checklists:
  - github-devops-checklist.md
---

# Configurar Pipeline de CI/CD

## Propósito

Configurar um pipeline de CI/CD completo e pronto para produção para um repositório, incluindo lint, testes, build, revisão de código (CodeRabbit Free) e automação de deploy.

## Provedores de CI Suportados

- **GitHub Actions** (primário, recomendado)
- **GitLab CI/CD**
- **CircleCI**
- **Jenkins** (suporte básico)

## Entrada

### Parâmetros Obrigatórios

- **repository_path**: `string`
  - **Descrição**: Caminho local ou URL do GitHub do repositório
  - **Exemplo**: `/path/to/project` ou `https://github.com/user/repo`
  - **Validação**: Deve ser um repositório Git válido

- **ci_provider**: `string`
  - **Descrição**: Provedor de CI/CD a configurar
  - **Opções**: `"github-actions"`, `"gitlab-ci"`, `"circleci"`, `"jenkins"`
  - **Padrão**: `"github-actions"`

- **project_type**: `string`
  - **Descrição**: Tipo de projeto (determina os estágios do pipeline)
  - **Opções**: `"nodejs"`, `"python"`, `"fullstack"`, `"monorepo"`
  - **Obrigatório**: true

### Parâmetros Opcionais

- **testing_framework**: `string`
  - **Descrição**: Framework de testes primário
  - **Exemplos**: `"jest"`, `"pytest"`, `"vitest"`, `"mocha"`
  - **Auto-detecção**: true (escaneia package.json ou requirements.txt)

- **deployment_target**: `string`
  - **Descrição**: Onde fazer o deploy
  - **Opções**: `"vercel"`, `"netlify"`, `"aws"`, `"none"`
  - **Padrão**: `"none"`

- **enable_coderabbit**: `boolean`
  - **Descrição**: Habilitar o CodeRabbit Free para revisão automatizada de código
  - **Padrão**: `true`
  - **Nota**: **Tier GRATUITO** - Sem custo, sem necessidade de API keys para repositórios públicos

- **branch_protection**: `boolean`
  - **Descrição**: Habilitar regras de proteção de branch
  - **Padrão**: `true`
  - **Regras**: Exigir PR, exigir status checks, sem force push

- **required_checks**: `array<string>`
  - **Descrição**: Status checks que devem passar
  - **Padrão**: `["lint", "test", "build"]`

- **secrets**: `object`
  - **Descrição**: Secrets de ambiente (serão armazenados com segurança)
  - **Exemplo**: `{ VERCEL_TOKEN: "xxx", DATABASE_URL: "postgres://..." }`

## Saída

- **workflow_files**: `array<string>`
  - **Descrição**: Arquivos de workflow/config criados
  - **Exemplo**: `[".github/workflows/ci.yml", ".github/workflows/deploy.yml"]`

- **branch_protection_rules**: `object`
  - **Descrição**: Configurações de proteção de branch aplicadas
  - **Estrutura**: `{ branch, required_checks, enforce_admins, allow_force_push }`

- **coderabbit_config**: `object` (se habilitado)
  - **Descrição**: Configuração do CodeRabbit
  - **Estrutura**: `{ enabled: true, config_file: ".coderabbit.yaml", integration_status: "active" }`

- **secrets_configured**: `array<string>`
  - **Descrição**: Lista de secrets armazenados com sucesso
  - **Nota**: Valores não incluídos (segurança)

- **pipeline_url**: `string`
  - **Descrição**: URL para visualizar as execuções do pipeline
  - **Exemplo**: `"https://github.com/user/repo/actions"`

- **README_section**: `string`
  - **Descrição**: Seção em Markdown a adicionar ao README.md
  - **Conteúdo**: Badges de CI/CD, status, instruções de configuração

## Processo

### Fase 1: Análise e Validação do Repositório (2 min)

1. **Validar Repositório**
   - Verificar se é um repositório Git válido
   - Confirmar que o remote origin existe
   - Verificar compatibilidade com o provedor de CI

2. **Detectar Estrutura do Projeto**
   - Auto-detectar o tipo de projeto (se não fornecido)
   - Escanear por package.json, requirements.txt, pom.xml, etc.
   - Identificar o framework de testes
   - Identificar os comandos de build

3. **Verificar Configuração de CI Existente**
   - Procurar por workflows existentes
   - Avisar se for sobrescrever: "⚠️ Configuração de CI existente encontrada. Backup criado em: {path}"

### Fase 2: Configuração do CodeRabbit Free (2 min) 🆓

**Nota**: O CodeRabbit Free é **100% GRATUITO** para repositórios públicos. Sem API keys, sem cartão de crédito, sem custos.

4. **Instalar o GitHub App do CodeRabbit**
   - Orientar o usuário: "Para habilitar o CodeRabbit Free:
     1. Acesse: https://github.com/apps/coderabbitai
     2. Clique em 'Install' (GRATUITO para repositórios públicos)
     3. Conceda acesso ao repositório: {repo_name}
     4. Retorne aqui quando concluir"
   - Aguardar a confirmação do usuário
   - Verificar a instalação via API do GitHub

5. **Criar a Configuração do CodeRabbit**
   - Gerar `.coderabbit.yaml`:
     ```yaml
     # Configuração do CodeRabbit Free
     # 🆓 GRATUITO para repositórios públicos - Sem custos, sem limites
     
     language: "en-US"
     
     reviews:
       profile: "chill"  # profundidade de revisão balanceada
       request_changes_workflow: false
       high_level_summary: true
       poem: false
       review_status: true
       collapse_walkthrough: false
       auto_review:
         enabled: true
         ignore_title_keywords:
           - "WIP"
           - "DO NOT REVIEW"
       
     chat:
       auto_reply: true
     
     # Áreas de foco (ajuste com base no tipo de projeto)
     focus:
       - security
       - performance
       - best_practices
       - testing
       - documentation
     
     # Padrões a ignorar
     ignore:
       - "**/*.min.js"
       - "**/*.min.css"
       - "**/dist/**"
       - "**/build/**"
       - "**/.next/**"
       - "**/node_modules/**"
       - "**/.git/**"
     ```
   - Commitar e fazer push do `.coderabbit.yaml`
   - Registrar: "✅ CodeRabbit Free configurado (Foco: segurança, performance, boas práticas)"

6. **Adicionar os Comandos do CodeRabbit ao README**
   - Documentar os comandos disponíveis:
     ```markdown
     ## Revisão de Código (CodeRabbit Free 🆓)
     
     **Revisões Automáticas**: O CodeRabbit revisa automaticamente todos os PRs
     
     **Comandos Manuais** (comente no PR):
     - `@coderabbitai review` - Solicitar revisão completa
     - `@coderabbitai summary` - Obter resumo do PR
     - `@coderabbitai resolve` - Marcar sugestões como resolvidas
     - `@coderabbitai help` - Mostrar comandos disponíveis
     
     **Verificação Local de Pré-Commit** (opcional):
     ```bash
     # Instalar a CLI do CodeRabbit (opcional, para verificações locais)
     npm install -g @coderabbitai/cli
     
     # Rodar a revisão de pré-commit
     coderabbit --prompt-only -t uncommitted
     ```
     
     [Documentação do CodeRabbit](https://docs.coderabbit.ai)
     ```

### Fase 3: Criação do Workflow do GitHub Actions (5 min)

7. **Criar o Workflow de Lint + Test + Build**
   - Gerar `.github/workflows/ci.yml`:

     ```yaml
     name: CI Pipeline
     
     on:
       push:
         branches: [ main, develop ]
       pull_request:
         branches: [ main, develop ]
     
     jobs:
       lint:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v4
           
           - name: Setup Node.js
             uses: actions/setup-node@v4
             with:
               node-version: '20'
               cache: 'npm'
           
           - name: Install dependencies
             run: npm ci
           
           - name: Run linter
             run: npm run lint
       
       test:
         runs-on: ubuntu-latest
         needs: lint
         steps:
           - uses: actions/checkout@v4
           
           - name: Setup Node.js
             uses: actions/setup-node@v4
             with:
               node-version: '20'
               cache: 'npm'
           
           - name: Install dependencies
             run: npm ci
           
           - name: Run tests
             run: npm test -- --coverage
           
           - name: Upload coverage
             uses: codecov/codecov-action@v3
             with:
               files: ./coverage/coverage-final.json
       
       build:
         runs-on: ubuntu-latest
         needs: test
         steps:
           - uses: actions/checkout@v4
           
           - name: Setup Node.js
             uses: actions/setup-node@v4
             with:
               node-version: '20'
               cache: 'npm'
           
           - name: Install dependencies
             run: npm ci
           
           - name: Build project
             run: npm run build
           
           - name: Upload build artifacts
             uses: actions/upload-artifact@v3
             with:
               name: build
               path: dist/
     ```

8. **Criar o Workflow de Deploy** (se deployment_target for fornecido)
   - Gerar `.github/workflows/deploy.yml`:

     ```yaml
     name: Deploy
     
     on:
       push:
         branches: [ main ]
       workflow_dispatch:
     
     jobs:
       deploy:
         runs-on: ubuntu-latest
         environment: production
         steps:
           - uses: actions/checkout@v4
           
           - name: Setup Node.js
             uses: actions/setup-node@v4
             with:
               node-version: '20'
               cache: 'npm'
           
           - name: Install dependencies
             run: npm ci
           
           - name: Build
             run: npm run build
           
           - name: Deploy to {deployment_target}
             uses: {deployment_action}
             with:
               token: ${{ secrets.DEPLOY_TOKEN }}
     ```

### Fase 4: Regras de Proteção de Branch (3 min)

9. **Configurar a Proteção de Branch** (se habilitada)
   - Usar a API do GitHub para definir regras na `main`:
     - Exigir revisões de pull request (1 aprovação)
     - Exigir que os status checks passem:
       - `lint`
       - `test`
       - `build`
       - `coderabbitai` (revisão do CodeRabbit)
     - Aplicar para administradores: false (para correções emergenciais)
     - Exigir histórico linear: true
     - Permitir force pushes: false
     - Permitir exclusões: false

10. **Armazenar Secrets** (se fornecidos)
    - Usar a GitHub CLI para definir os secrets:
      ```bash
      gh secret set VERCEL_TOKEN --body="xxx"
      gh secret set DATABASE_URL --body="postgres://..."
      ```
    - Verificar os secrets armazenados: `gh secret list`

### Fase 5: Documentação e Testes (3 min)

11. **Atualizar o README.md**
    - Adicionar badges de CI/CD:
      ```markdown
      [![CI Pipeline](https://github.com/user/repo/actions/workflows/ci.yml/badge.svg)](https://github.com/user/repo/actions/workflows/ci.yml)
      [![CodeRabbit](https://img.shields.io/badge/CodeRabbit-Free-brightgreen)](https://github.com/apps/coderabbitai)
      ```
    - Adicionar a seção de CI/CD (a partir da saída)

12. **Criar PR de Teste**
    - Criar a branch: `ci-cd-test-{timestamp}`
    - Fazer uma mudança trivial (ex.: atualizar o README)
    - Fazer push e criar o PR
    - Verificar:
      - O workflow de CI é disparado
      - Todos os checks rodam
      - O CodeRabbit revisa o PR
      - A proteção de branch é aplicada
    - Fechar o PR após a validação

13. **Gerar Relatório de Configuração**
    - Documentar o que foi configurado
    - Listar os arquivos de workflow criados
    - Mostrar a URL do pipeline
    - Confirmar que o CodeRabbit está ativo
    - Listar os próximos passos

## Checklist

### Pré-Condições

- [ ] O repositório é um repositório Git válido
  - **Validação**: O diretório `.git` existe
  - **Erro**: "Não é um repositório Git"

- [ ] O provedor de CI é suportado
  - **Validação**: `ci_provider in ["github-actions", "gitlab-ci", "circleci", "jenkins"]`
  - **Erro**: "Provedor de CI '{provider}' não suportado"

- [ ] O projeto tem package.json ou equivalente
  - **Validação**: O arquivo existe na raiz
  - **Erro**: "Não foi possível detectar o tipo de projeto. Adicione package.json ou especifique project_type manualmente"

### Pós-Condições

- [ ] Arquivos de workflow criados e commitados
  - **Validação**: Os arquivos existem e são rastreados pelo Git
  - **Teste**: `git ls-files | grep -E "\.github/workflows|\.gitlab-ci\.yml"`

- [ ] Configuração do CodeRabbit válida (se habilitada)
  - **Validação**: O `.coderabbit.yaml` é um YAML válido
  - **Teste**: `yamllint .coderabbit.yaml`

- [ ] Proteção de branch ativa (se habilitada)
  - **Validação**: A API do GitHub retorna as regras de proteção
  - **Teste**: `gh api repos/{owner}/{repo}/branches/main/protection`

- [ ] O PR de teste passa em todos os checks
  - **Validação**: Todos os checks obrigatórios verdes
  - **Verificação Manual**: true

### Critérios de Aceite

- [ ] O pipeline de CI roda a cada push
  - **Tipo**: acceptance
  - **Teste**: Push para a branch → workflow disparado

- [ ] O CodeRabbit revisa todos os PRs automaticamente (se habilitado)
  - **Tipo**: acceptance
  - **Verificação Manual**: true
  - **Teste**: Criar PR → CodeRabbit comenta em até 2 min

- [ ] A proteção de branch impede pushes diretos para a main
  - **Tipo**: acceptance
  - **Teste**: Tentar `git push origin main` → rejeitado

## Modelos

### Seção de CI/CD do README

```markdown
## Pipeline de CI/CD

Este repositório usa CI/CD automatizado com {ci_provider}.

### Status

[![CI Pipeline](https://github.com/{owner}/{repo}/actions/workflows/ci.yml/badge.svg)](https://github.com/{owner}/{repo}/actions/workflows/ci.yml)
{deployment_badge if applicable}

### Estágios do Pipeline

1. **Lint**: ESLint + Prettier
2. **Test**: {testing_framework} com cobertura
3. **Build**: Build de produção
{4. **Deploy**: Deploy automático para {deployment_target} (apenas branch main) se aplicável}

### Revisão de Código (CodeRabbit Free 🆓)

Todo PR é revisado automaticamente pelo [CodeRabbit](https://github.com/apps/coderabbitai):
- Vulnerabilidades de segurança
- Problemas de performance
- Boas práticas
- Cobertura de testes
- Documentação

**Comandos** (comente no PR):
- `@coderabbitai review` - Solicitar revisão
- `@coderabbitai summary` - Obter resumo
- `@coderabbitai resolve` - Marcar como resolvido

### Proteção de Branch

- A branch `main` exige:
  - ✅ 1 aprovação de PR
  - ✅ Todos os checks de CI passando
  - ✅ Revisão do CodeRabbit concluída
  - ❌ Sem pushes diretos
  - ❌ Sem force pushes

### Instruções de Configuração

1. Clonar o repositório
2. Instalar dependências: `npm install`
3. Rodar os testes localmente: `npm test`
4. Criar a branch de feature: `git checkout -b feature/my-feature`
5. Fazer as mudanças e commitar
6. Fazer push e criar o PR
7. Aguardar a revisão do CI + CodeRabbit
8. Fazer merge após a aprovação
```

## Ferramentas

- **github-cli**:
  - **Versão**: 2.0.0
  - **Usado Para**: Gerenciar workflows, secrets, proteção de branch
  - **Obrigatório**: true (para GitHub Actions)

- **coderabbit-free**:
  - **Versão**: Latest (GitHub App)
  - **Usado Para**: Revisão automatizada de código em todo PR
  - **Custo**: $0 (GRATUITO para repositórios públicos)
  - **Configuração**: Instalar o GitHub App (única vez, 2 minutos)
  - **Funcionalidades**:
    - Revisões automáticas de PR
    - Varredura de segurança
    - Análise de performance
    - Verificações de boas práticas
    - Chat interativo
  - **Limitações**: Nenhuma para open-source (o tier GRATUITO é completo)

## Performance

- **Duração Esperada**: 15 minutos (incluindo a configuração do CodeRabbit)
- **Custo Estimado**: $0 (o CodeRabbit Free é gratuito, o GitHub Actions tem 2.000 minutos gratuitos/mês)
- **Cacheável**: false (a configuração é por repositório)
- **Paralelizável**: false (configuração sequencial obrigatória)

## Tratamento de Erros

- **Estratégia**: retry + fallback
- **Fallback**: Se a configuração do CodeRabbit falhar, continuar sem ele (pode ser adicionado depois)
- **Retry**:
  - **Máximo de Tentativas**: 3
  - **Backoff**: exponential
  - **Backoff MS**: 2000
- **Abortar Workflow**: false (continuar mesmo se funcionalidades opcionais falharem)
- **Notificação**: log + relatório de configuração

## Metadados

- **Story**: Epic 10 (Resolução de Dependências Críticas)
- **Versão**: 1.0.0
- **Dependências**: ferramenta `github-cli`
- **Autor**: Brad Frost Clone
- **Criado**: 2025-11-13
- **Atualizado**: 2025-11-13
- **Breaking Changes**: Nenhum (nova task)

---

## Modos de Execução

**Escolha o seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Pre-Flight Planning - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (Formato de Task AIOX V1.0)

```yaml
task: ciCdConfiguration()
responsável: Gage (Automator)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid task parameters

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memory
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: State management
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pre-condition failed: Task is registered; required parameters provided; dependencies met"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Dividir em workflows menores; implementar checkpointing; usar processamento assíncrono onde possível

---


## Exemplos de Uso

### Exemplo 1: Projeto Node.js com CodeRabbit

```bash
aiox activate Otto  # agente github-devops
aiox ci-cd setup \
  --repo="." \
  --provider="github-actions" \
  --type="nodejs" \
  --enable-coderabbit=true \
  --deploy="vercel"
```

**Saída**: CI/CD completo com CodeRabbit Free, deploy na Vercel

### Exemplo 2: Projeto Python (GitLab CI)

```bash
aiox ci-cd setup \
  --repo="/path/to/python-project" \
  --provider="gitlab-ci" \
  --type="python" \
  --testing="pytest"
```

**Saída**: Pipeline do GitLab CI com pytest

### Exemplo 3: Monorepo com Turborepo

```bash
aiox ci-cd setup \
  --repo="." \
  --provider="github-actions" \
  --type="monorepo" \
  --enable-coderabbit=true \
  --branch-protection=true
```

**Saída**: Pipeline otimizado de monorepo com caching

---

## CodeRabbit Free: Principais Benefícios 🆓

1. **Custo Zero**: GRATUITO para sempre para repositórios públicos
2. **Sem Complexidade de Configuração**: Basta instalar o GitHub App (2 minutos)
3. **Revisões Automáticas**: Todo PR revisado em minutos
4. **Foco em Segurança**: Detecta vulnerabilidades cedo
5. **Insights de Performance**: Identifica gargalos
6. **Boas Práticas**: Reforça padrões de qualidade de código
7. **Interativo**: Converse com o CodeRabbit sobre as sugestões

**Por que o CodeRabbit Free?**
- Concorrentes (Copilot, CodeGuru) custam $10-19/mês/usuário
- CodeRabbit Free: $0 para open-source
- Melhor cobertura de segurança do que a maioria das ferramentas pagas
- Integrado com o GitHub (sem necessidade de ferramentas externas)

---

**Tasks Relacionadas:**
- `release-management` - Automatizar releases após o CI passar
- `pr-automation` - Ajudar usuários a criar PRs com o formato adequado
- `setup-repository` - Inicializar repositório com boas práticas
