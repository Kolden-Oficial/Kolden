---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima do usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com ambiguidade zero
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: createNextStory()
responsável: River (Facilitator)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: name
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser não vazio, minúsculo, kebab-case

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Objeto JSON válido com chaves permitidas

- campo: force
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Padrão: false

**Saída:**
- campo: created_file
  tipo: string
  destino: File system
  persistido: true

- campo: validation_report
  tipo: object
  destino: Memory
  persistido: false

- campo: success
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] O alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas
    tipo: pre-condition
    blocker: true
    validação: |
      Check target does not already exist; required inputs provided; permissions granted
    error_message: "Pre-condition failed: Target does not already exist; required inputs provided; permissions granted"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Recurso criado com sucesso; validação aprovada; nenhum erro registrado
    tipo: post-condition
    blocker: true
    validação: |
      Verify resource created successfully; validation passed; no errors logged
    error_message: "Post-condition failed: Resource created successfully; validation passed; no errors logged"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] O recurso existe e é válido; nenhum recurso duplicado criado
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert resource exists and is valid; no duplicate resources created
    error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componente
  - **Linguagem:** JavaScript
  - **Local:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso alvo já existe no sistema
   - **Resolução:** Usar a flag de force ou escolher um nome diferente
   - **Recuperação:** Solicitar ao usuário um nome alternativo ou sobrescrever com force

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Validar a entrada conforme as regras de nomenclatura (kebab-case, minúsculo, sem caracteres especiais)
   - **Recuperação:** Sanitizar a entrada ou rejeitar com mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verificar permissões do sistema de arquivos, rodar com privilégios elevados se necessário
   - **Recuperação:** Registrar erro, notificar o usuário, sugerir correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimado)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Dividir em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - creation
  - setup
updated_at: 2025-11-17
```

---

tools:
  - github-cli        # Acessa a estrutura do repositório e as stories anteriores
  - context7          # Consulta documentação para requisitos técnicos
  - clickup           # Gerencia metadados e rastreamento da story
checklists:
  - po-master-checklist.md
---

# Task Criar Próxima Story

## Propósito

Identificar a próxima story lógica com base no progresso do projeto e nas definições de epic, e então preparar um arquivo de story abrangente, autossuficiente e acionável usando o `Story Template`. Esta task garante que a story seja enriquecida com todo o contexto técnico, requisitos e critérios de aceite necessários, deixando-a pronta para implementação eficiente por um Developer Agent com mínima necessidade de pesquisa adicional ou de buscar seu próprio contexto.

## Execução SEQUENCIAL da Task (Não prossiga até que a Task atual esteja concluída)

### 0. Carregar a Configuração Central e Verificar o Workflow

- Carregar `aiox-core/core-config.yaml` da raiz do projeto
- Se o arquivo não existir, PARE e informe o usuário: "core-config.yaml not found. This file is required for story creation. You can either: 1) Copy it from GITHUB aiox-core/core-config.yaml and configure it for your project OR 2) Run the AIOX installer against your project to upgrade and add the file automatically. Please add and configure core-config.yaml before proceeding."
- Extrair as configurações-chave: `devStoryLocation`, `prd.*`, `architecture.*`, `workflow.*`

### 1. Identificar a Próxima Story para Preparação

#### 1.1 Localizar os Arquivos de Epic e Revisar as Stories Existentes

- **Consulte tools/cli/github-cli.yaml** para os comandos de navegação do repositório e operações de listagem de arquivos
- Consulte a seção de exemplos para padrões de inspeção de branch e estrutura de arquivos
- Com base em `prdSharded` da config, localize os arquivos de epic (localização/padrão shardeado ou seções monolíticas do PRD)
- Se `devStoryLocation` tiver arquivos de story, carregue o arquivo `{epicNum}.{storyNum}.story.md` de maior numeração
- **Se a story de maior numeração existir:**
  - Verificar se o status é 'Done'. Se não, alertar o usuário: "ALERT: Found incomplete story! File: {lastEpicNum}.{lastStoryNum}.story.md Status: [current status] You should fix this story first, but would you like to accept risk & override to create the next story in draft?"
  - Se prosseguir, selecionar a próxima story sequencial no epic atual
  - Se o epic estiver completo, solicitar ao usuário: "Epic {epicNum} Complete: All stories in Epic {epicNum} have been completed. Would you like to: 1) Begin Epic {epicNum + 1} with story 1 2) Select a specific story to work on 3) Cancel story creation"
  - **CRÍTICO**: NUNCA pular automaticamente para outro epic. O usuário DEVE instruir explicitamente qual story criar.
- **Se não existirem arquivos de story:** A próxima story é SEMPRE a 1.1 (primeira story do primeiro epic)
- Anunciar a story identificada ao usuário: "Identified next story for preparation: {epicNum}.{storyNum} - {Story Title}"

### 1.2 Code Intelligence: Detecção de Duplicatas e Sugestões de Arquivos (Auto-pulada se indisponível)

- **Verificar a disponibilidade de code intelligence:** Chamar `isCodeIntelAvailable()` de `.aiox-core/core/code-intel`
- **Se disponível:**
  - Chamar `detectDuplicateStory(storyDescription)` de `.aiox-core/core/code-intel/helpers/story-helper`
    - Se forem encontradas correspondências: Exibir aviso consultivo ao usuário — "Similar functionality found: {warning}". Isto é **apenas consultivo** e NÃO bloqueia a criação da story.
  - Chamar `suggestRelevantFiles(storyDescription)` de `.aiox-core/core/code-intel/helpers/story-helper`
    - Se forem encontrados arquivos: Pré-preencher uma nota "Suggested Files" na seção Dev Notes com as referências de arquivo relevantes
- **Se NÃO disponível:** Pular este passo silenciosamente — a criação da story prossegue exatamente como antes

### 2. Reunir os Requisitos da Story e o Contexto da Story Anterior

- Extrair os requisitos da story do arquivo de epic identificado
- Se existir uma story anterior, revisar as seções Dev Agent Record para:
  - Completion Notes e Debug Log References
  - Desvios de implementação e decisões técnicas
  - Desafios encontrados e lições aprendidas
- Extrair insights relevantes que informem a preparação da story atual

### 3. Reunir o Contexto de Arquitetura

#### 3.1 Determinar a Estratégia de Leitura da Arquitetura

- **Consulte tools/mcp/context7.yaml** para a consulta de documentação de bibliotecas e pesquisa de contexto técnico
- Consulte a seção de exemplos para padrões de consulta de documentação específica de bibliotecas
- **Se `architectureVersion: >= v4` e `architectureSharded: true`**: Ler `{architectureShardedLocation}/index.md` e então seguir a ordem de leitura estruturada abaixo
- **Caso contrário**: Usar o `architectureFile` monolítico para seções similares

#### 3.2 Ler os Documentos de Arquitetura Conforme o Tipo de Story

**CRÍTICO: Estratégia de Fallback de Arquivos**

Ao tentar ler arquivos de arquitetura, use esta ordem de fallback:
1. Tentar o nome de arquivo primário (ex.: `tech-stack.md`)
2. Se não for encontrado, tentar as alternativas de fallback de `devLoadAlwaysFilesFallback` no core-config.yaml
3. Se ainda não for encontrado, verificar equivalentes em português
4. Se nenhum existir, anotar o 
## Dependências de Configuração

Esta task requer as seguintes chaves de configuração do `core-config.yaml`:

- **`qaLocation`**: Diretório de saída do QA (tipicamente docs/qa) - Necessário para escrever relatórios de qualidade

**Carregando a Config:**
```javascript
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../.aiox-core/core-config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

const qaLocation = config.qa?.qaLocation || 'docs/qa';
```

arquivo ausente nas Dev Notes

**Mapeamentos Comuns de Fallback:**
```yaml
tech-stack.md → [technology-stack.md, pilha-tecnologica.md, stack.md]
coding-standards.md → [code-standards.md, padroes-de-codigo.md, standards.md]
source-tree.md → [project-structure.md, unified-project-structure.md, arvore-de-origem.md, directory-structure.md]
testing-strategy.md → [test-strategy.md, estrategia-de-testes.md]
database-schema.md → [db-schema.md, esquema.md, schema.md]
```

**Para TODAS as Stories (tentar na ordem de fallback):**
- tech-stack.md
- unified-project-structure.md (ou project-structure.md, source-tree.md)
- coding-standards.md
- testing-strategy.md

**Para Stories de Backend/API, adicionalmente:**
- data-models.md
- database-schema.md
- backend-architecture.md
- rest-api-spec.md (ou api-spec.md, api-design.md)
- external-apis.md

**Para Stories de Frontend/UI, adicionalmente:**
- frontend-architecture.md
- components.md
- core-workflows.md (ou workflows.md, user-flows.md)
- data-models.md

**Para Stories Full-Stack:** Ler ambas as seções de Backend e Frontend acima

**Importante:** Quando um arquivo de fallback for usado, anote-o nas Dev Notes:
```
[Note: Using fallback file 'pilha-tecnologica.md' instead of 'tech-stack.md']
```

#### 3.3 Extrair Detalhes Técnicos Específicos da Story

Extrair APENAS informações diretamente relevantes para implementar a story atual. NÃO invente novas bibliotecas, padrões ou standards que não estejam nos documentos de origem.

Extrair:

- Modelos de dados, schemas ou estruturas específicos que a story usará
- Endpoints de API que a story deve implementar ou consumir
- Especificações de componentes para elementos de UI na story
- Caminhos de arquivo e convenções de nomenclatura para o novo código
- Requisitos de teste específicos das funcionalidades da story
- Considerações de segurança ou performance que afetam a story

SEMPRE cite os documentos de origem: `[Source: architecture/{filename}.md#{section}]`

### 4. Verificar o Alinhamento da Estrutura do Projeto

- Cruzar os requisitos da story com o Project Structure Guide de `docs/architecture/unified-project-structure.md`
- Garantir que caminhos de arquivo, localizações de componentes ou nomes de módulos estejam alinhados com as estruturas definidas
- Documentar quaisquer conflitos estruturais na seção "Project Structure Notes" dentro do rascunho da story

### 5. Preencher o Story Template com o Contexto Completo

#### 5.1 Obter a Estrutura do Workspace e Verificar o Epic

- **Consulte tools/mcp/clickup.yaml** - Revise o exemplo 'story_creation_workflow' para orientação completa passo a passo
- **Passo 1: Obter a Hierarquia do Workspace**
  - Chamar `get_workspace_hierarchy` (nenhum parâmetro necessário)
  - Extrair o ID da lista Backlog da resposta:
    ```javascript
    // Response structure:
    {
      "spaces": [{
        "lists": [{
          "name": "Backlog",
          "id": "901317181013"  // ← Extract this numeric list_id
        }]
      }]
    }
    ```
  - **CRÍTICO:** Armazenar este list_id numérico para uso no Passo 5.3
  - Log: "✅ Found Backlog list (list_id: {backlog_list_id})"

- **Passo 2: Buscar o Epic no Backlog**
  - Usar `get_workspace_tasks` com os parâmetros:
    - list_ids: [{backlog_list_id}]  # Do Passo 1
    - tags: ["epic-{epicNum}"]
    - status: ["Planning", "In Progress"]

- **Se o Epic NÃO for encontrado:**
  - PARAR a execução
  - Exibir o erro: "❌ Epic {epicNum} not found in ClickUp Backlog list.
    Please create Epic task with:
    - Name: 'Epic {epicNum}: {Epic Title}'
    - List: Backlog (list_id: {backlog_list_id})
    - Tags: ['epic', 'epic-{epicNum}']
    - Status: Planning or In Progress
    Then retry story creation."

- **Se o Epic for encontrado:**
  - Capturar epic_task_id para o relacionamento pai
  - Log: "✅ Found Epic {epicNum} (task_id: {epic_task_id})"

#### 5.2 Preparar o Arquivo da Story e os Metadados

- **Consulte tools/mcp/clickup.yaml** para os parâmetros de create_task e requisitos de validação ao criar as tasks de rastreamento de story
- Usar o validador 'validate-create-task' para verificar o formato de assignee (deve ser array)
- Consulte a seção de exemplos para padrões de formato de custom_field
- Observe a seção de complexidade da API quanto à incompatibilidade de formato de assignee entre as operações de create e update
- Criar o novo arquivo de story: `{devStoryLocation}/{epicNum}.{storyNum}.story.md` usando o Story Template
- Preencher as informações básicas da story: Title, Status (Draft), declaração da story, Acceptance Criteria do Epic

##### 5.2.1 Preparar os Metadados do ClickUp para o Frontmatter

- Preparar a estrutura da seção ClickUp (será preenchida após a criação da task no ClickUp):
  ```yaml
  clickup:
    task_id: ""  # To be filled
    epic_task_id: "{epic_task_id from 5.1}"
    list: "Backlog"
    url: ""  # To be filled
    last_sync: ""  # To be filled
  ```

#### 5.3 Criar a Task da Story no ClickUp

- **Consulte tools/mcp/clickup.yaml** - Revise o exemplo 'story_creation_workflow' para a referência completa de parâmetros
- **CRÍTICO:** Usar o validador 'validate-create-task' para prevenir erros de formato
- **CRÍTICO:** Usar o list_id numérico do Passo 5.1, NÃO uma string com o nome da lista

**Parâmetros de Criação da Task:**
```yaml
list_id: "{backlog_list_id}"  # MUST be numeric string from 5.1 (e.g., "901317181013")
name: "Story {epicNum}.{storyNum}: {Story Title}"
parent: "{epic_task_id}"  # Creates as subtask of Epic (from 5.1)
markdown_description: "{entire story .md file content}"
tags:
  - "story"
  - "epic-{epicNum}"
  - "story-{epicNum}.{storyNum}"
custom_fields:
  - id: "epic_number"
    value: {epicNum}
  - id: "story_number"
    value: "{epicNum}.{storyNum}"
  - id: "story_file_path"
    value: "{devStoryLocation}/{epicNum}.{storyNum}.story.md"
  - id: "story-status"
    value: "Draft"
```

**Notas de Validação:**
- O list_id DEVE ser uma string numérica (validada por /^\d+$/)
- Usar "Backlog" ou outros valores não numéricos falhará na validação
- assignees (se fornecido) deve ser array, não object

**Tratamento da Resposta:**
- **Capturar:** story_task_id da resposta
- **Log:** "✅ Story task created in ClickUp: {story_task_id}"

**Tratamento de Erros:**
- Se create_task falhar com erro de validação, exibir o erro exato e os parâmetros usados
- Se ocorrer um erro de API, registrar o erro mas continuar (a story local ainda é válida)
- Avisar o usuário: "⚠️ Story created locally but ClickUp sync failed: {error_message}"

#### 5.4 Atualizar o Frontmatter da Story com os Dados do ClickUp

- Atualizar a seção clickup do YAML de frontmatter com os valores capturados:
  ```yaml
  clickup:
    task_id: "{story_task_id from 5.3}"
    epic_task_id: "{epic_task_id from 5.1}"
    list: "Backlog"
    url: "https://app.clickup.com/t/{story_task_id}"
    last_sync: "{current ISO 8601 timestamp}"
  ```
- Salvar o arquivo da story com o frontmatter atualizado
- Log: "✅ Story task created in ClickUp: {story_task_id}"

#### 5.2.5 Prever os Agentes Especializados e as Tasks do CodeRabbit

**PASSO CONDICIONAL** - Verificar `coderabbit_integration.enabled` no core-config.yaml

```yaml
# core-config.yaml check
coderabbit_integration:
  enabled: true|false  # ← This controls whether to populate CodeRabbit section
```

**SE `coderabbit_integration.enabled: false`:**
- PULAR este passo inteiro (5.2.5)
- No arquivo da story, renderizar apenas o aviso de skip na seção CodeRabbit Integration:
  ```markdown
  ## 🤖 CodeRabbit Integration

  > **CodeRabbit Integration**: Disabled
  >
  > CodeRabbit CLI is not enabled in `core-config.yaml`.
  > Quality validation will use manual review process only.
  > To enable, set `coderabbit_integration.enabled: true` in core-config.yaml
  ```
- Log: "ℹ️ CodeRabbit Integration disabled - skipping quality gate configuration"
- Prosseguir para o Passo 5.3

**SE `coderabbit_integration.enabled: true`:**
- Continuar com o preenchimento completo da seção CodeRabbit abaixo
- Incluir a configuração de self-healing baseada na Story 6.3.3

---

**CRÍTICO:** Este passo preenche a seção `🤖 CodeRabbit Integration` criada pelo story template. Use o contexto de arquitetura reunido no Passo 3 e os requisitos da story do Passo 2 para prever quais agentes especializados e quality gates são necessários.

**Regras de Detecção do Tipo de Story:**

Analise as características técnicas da story com base em:
- Palavras-chave dos Acceptance Criteria
- Arquivos de arquitetura referenciados no Passo 3.2
- Modelos de dados, APIs ou componentes mencionados no epic
- Localizações de arquivos e sistemas afetados

**Tipo 1: Story de Database**

**Indicadores de Detecção:**
- Referências a `database-schema.md` ou `data-models.md`
- Acceptance Criteria mencionam: schema, table, migration, RLS, foreign key, index
- Localizações de arquivo incluem `supabase/migrations/` ou caminhos relacionados a banco de dados

**Atribuição:**
- **Agentes Primários**: @db-sage, @dev
- **Quality Gates**: Pre-Commit (validação de schema), Pre-PR (revisão de SQL)
- **Áreas de Foco**:
  - Filtros de serviço: `.eq('service', 'ttcx')` em TODAS as queries
  - Conformidade de schema: Foreign keys, índices, constraints devidamente definidos
  - Políticas RLS: Row-level security configurado e testado
  - Segurança de migration: Reversível, testada em ambiente de dev

**Tipo 2: Story de API**

**Indicadores de Detecção:**
- Referências a `rest-api-spec.md` ou `backend-architecture.md`
- Acceptance Criteria mencionam: endpoint, API, service, controller, route
- Localizações de arquivo incluem `api/src/` ou caminhos de backend

**Atribuição:**
- **Agentes Primários**: @dev, @architect (se houver novos padrões)
- **Quality Gates**: Pre-Commit (varredura de segurança), Pre-PR (validação de contrato de API)
- **Áreas de Foco**:
  - Tratamento de erros: Blocos try-catch, respostas de erro adequadas (4xx, 5xx)
  - Segurança: Validação de entrada, verificações de autenticação e autorização
  - Validação: Validação de schema de request/response
  - Contratos de API: Consistentes com `rest-api-spec.md`

**Tipo 3: Story de Frontend**

**Indicadores de Detecção:**
- Referências a `frontend-architecture.md` ou `components.md`
- Acceptance Criteria mencionam: UI, component, page, form, display, user interface
- Localizações de arquivo incluem `src/components/` ou caminhos de frontend

**Atribuição:**
- **Agentes Primários**: @ux-expert, @dev
- **Quality Gates**: Pre-Commit (validação de a11y), Pre-PR (verificação de consistência de UX)
- **Áreas de Foco**:
  - Acessibilidade: Conformidade WCAG 2.1 AA (HTML semântico, labels ARIA, navegação por teclado)
  - Performance: Otimização de componentes, lazy loading, code splitting
  - Design responsivo: Abordagem mobile-first, breakpoints testados
  - Consistência de UX: Segue os padrões do design system

**Tipo 4: Story de Deploy/Infraestrutura**

**Indicadores de Detecção:**
- Acceptance Criteria mencionam: deploy, CI/CD, environment, configuration, infrastructure
- Referências a pipelines de deploy ou configuração de ambiente
- Localizações de arquivo incluem `.github/workflows/`, `docker/` ou arquivos de config

**Atribuição:**
- **Agentes Primários**: @github-devops, @dev
- **Quality Gates**: Pre-Commit (validação de config), Pre-Deployment (varredura profunda)
- **Áreas de Foco**:
  - CI/CD: Configuração de pipeline, imposição de cobertura de testes
  - Gestão de secrets: Sem credenciais hardcoded, manuseio adequado de secrets
  - Config de ambiente: Uso adequado de variáveis, validação de variáveis obrigatórias
  - Prontidão para rollback: Mudanças reversíveis, procedimento de rollback documentado

**Tipo 5: Story de Segurança**

**Indicadores de Detecção:**
- Acceptance Criteria mencionam: authentication, authorization, security, encryption, vulnerability
- Referências a padrões de segurança ou threat models
- Implementa funcionalidades relacionadas ao OWASP

**Atribuição:**
- **Agentes Primários**: @dev, @architect
- **Quality Gates**: Pre-Commit (varredura SAST), Pre-PR (revisão de segurança)
- **Áreas de Foco**:
  - OWASP Top 10: Prevenção de injeção, proteção XSS, vulnerabilidades de auth
  - Ataques de timing: Comparações de tempo constante para operações sensíveis
  - Proteção de dados: Criptografia em repouso/trânsito, sanitização adequada
  - Autenticação: Gerenciamento seguro de sessão, manuseio de senhas

**Tipo 6: Story de Arquitetura**

**Indicadores de Detecção:**
- Acceptance Criteria mencionam: refactor, pattern, architecture, scalability
- Afeta múltiplas camadas ou introduz novos padrões
- Referências a `backend-architecture.md` ou system design

**Atribuição:**
- **Agentes Primários**: @architect, @dev
- **Quality Gates**: Pre-Commit (validação de padrão), Pre-PR (revisão de arquitetura)
- **Áreas de Foco**:
  - Padrões: Segue os padrões arquiteturais estabelecidos
  - Escalabilidade: Considerações de performance, manuseio de carga
  - Manutenibilidade: Organização de código, separação de responsabilidades
  - Retrocompatibilidade: Funcionalidade existente preservada

**Tipo 7: Story de Integração**

**Indicadores de Detecção:**
- Acceptance Criteria mencionam: integration, external API, webhook, third-party
- Referências a `external-apis.md`
- Conecta-se a sistemas externos

**Atribuição:**
- **Agentes Primários**: @dev, @architect, @github-devops
- **Quality Gates**: Pre-Commit, Pre-PR (segurança de integração)
- **Áreas de Foco**:
  - Retrocompatibilidade: Integrações existentes não afetadas
  - Contratos de API: Versionamento adequado, contract testing
  - Tratamento de erros: Degradação graciosa, lógica de retry
  - Documentação: Pontos de integração claramente documentados

**Preencher a Seção CodeRabbit Integration:**

Com base no(s) tipo(s) de story detectado(s), preencha os campos do template:

```yaml
🤖 CodeRabbit Integration:

  Story Type Analysis:
    Primary Type: [Database|API|Frontend|Deployment|Security|Architecture|Integration]
    Secondary Type(s): [Additional types if story spans multiple areas]
    Complexity: [Low|Medium|High] - Based on number of systems affected and scope

  Specialized Agent Assignment:
    Primary Agents:
      - @dev (always required for pre-commit reviews)
      - @[type-specific-agent] (from detection rules above)

    Supporting Agents:
      - @[supporting-agent-1] (if cross-cutting concerns)
      - @[supporting-agent-2] (if multiple systems affected)

  Quality Gate Tasks:
    - [ ] Pre-Commit (@dev): Run `coderabbit --prompt-only -t uncommitted` before marking story complete
    - [ ] Pre-PR (@github-devops): Run `coderabbit --prompt-only --base main` before creating pull request
    - [ ] Pre-Deployment (@github-devops): Run `coderabbit --prompt-only -t committed --base HEAD~10` before production deploy (only for production/deployment stories)

  CodeRabbit Focus Areas:
    Primary Focus:
      - [Focus area 1 from type-specific rules]
      - [Focus area 2 from type-specific rules]

    Secondary Focus:
      - [Focus area 3 if applicable]
      - [Focus area 4 if applicable]
```

**Stories de Múltiplos Tipos:**

Se a story abranger múltiplos tipos (ex.: Database + API):
- Listar o tipo primário primeiro (aquele com mais trabalho)
- Listar o(s) tipo(s) secundário(s) em ordem de importância
- Combinar as atribuições de agente (sem duplicatas)
- Incluir TODAS as áreas de foco relevantes de ambos os tipos
- Usar o requisito de quality gate mais alto (ex.: se qualquer um exigir Pre-Deployment, incluí-lo)

**Determinação de Complexidade:**

- **Low**: Arquivo/componente único, escopo bem definido, dependências mínimas
- **Medium**: Múltiplos arquivos, escopo moderado, alguma interação cross-system
- **High**: Muitos arquivos, escopo complexo, múltiplos sistemas, novos padrões ou crítico para segurança

**Exemplo de Saída (Story de Database + API):**

```yaml
🤖 CodeRabbit Integration:

  Story Type Analysis:
    Primary Type: Database
    Secondary Type(s): API
    Complexity: High (affects schema, migrations, and multiple API endpoints)

  Specialized Agent Assignment:
    Primary Agents:
      - @dev (pre-commit reviews)
      - @db-sage (schema and SQL review)
      - @architect (API contract changes)

    Supporting Agents:
      - @github-devops (deployment coordination)

  Quality Gate Tasks:
    - [ ] Pre-Commit (@dev): Run before story complete
    - [ ] Pre-PR (@github-devops): Run before PR creation
    - [ ] Pre-Deployment (@github-devops): Run before production deploy

  CodeRabbit Focus Areas:
    Primary Focus:
      - Service filters on all queries (.eq('service', 'ttcx'))
      - Schema compliance (foreign keys, indexes, constraints)
      - API error handling and validation

    Secondary Focus:
      - RLS policies properly configured
      - API contract consistency with spec
      - Migration reversibility

  Self-Healing Configuration:
    Expected Self-Healing:
      - Primary Agent: @dev (light mode)
      - Max Iterations: 2
      - Timeout: 15 minutes
      - Severity Filter: CRITICAL only

    Predicted Behavior:
      - CRITICAL issues: auto_fix (up to 2 iterations)
      - HIGH issues: document_only (noted in Dev Notes)
```

**Configuração de Self-Healing (Story 6.3.3):**

Após preencher as seções básicas do CodeRabbit, adicione a Configuração de Self-Healing com base no agente primário:

| Agente Primário | Modo | Máx. de Iterações | Timeout | Filtro de Severidade |
|---------------|------|----------------|---------|-----------------|
| @dev | light | 2 | 15 min | CRITICAL |
| @qa | full | 3 | 30 min | CRITICAL, HIGH |
| @github-devops | check | 0 | N/A | report_only |

**Matriz de Comportamento por Severidade:**

| Severidade | @dev (light) | @qa (full) | @github-devops (check) |
|----------|--------------|------------|------------------------|
| CRITICAL | auto_fix | auto_fix | report_only |
| HIGH | document_only | auto_fix | report_only |
| MEDIUM | ignore | document_as_debt | report_only |
| LOW | ignore | ignore | ignore |

Use o agente primário de "Specialized Agent Assignment" para determinar qual configuração de self-healing documentar.

**Log de Conclusão:**
- Após preencher esta seção, registrar: "✅ Story type analysis complete: [Primary Type] | Agents assigned: [agent list] | Quality gates: [gate count] | Self-healing: [mode]"

- **Seção `Dev Notes` (CRÍTICO):**
  - CRÍTICO: Esta seção DEVE conter APENAS informações extraídas dos documentos de arquitetura. NUNCA invente ou assuma detalhes técnicos.
  - Incluir TODOS os detalhes técnicos relevantes dos Passos 2-3, organizados por categoria:
    - **Previous Story Insights**: Principais aprendizados da story anterior
    - **Data Models**: Schemas específicos, regras de validação, relacionamentos [com referências de origem]
    - **API Specifications**: Detalhes de endpoint, formatos de request/response, requisitos de auth [com referências de origem]
    - **Component Specifications**: Detalhes de componentes de UI, props, gerenciamento de estado [com referências de origem]
    - **File Locations**: Caminhos exatos onde o novo código deve ser criado com base na estrutura do projeto
    - **Testing Requirements**: Casos de teste ou estratégias específicas de testing-strategy.md
    - **Technical Constraints**: Requisitos de versão, considerações de performance, regras de segurança
  - Cada detalhe técnico DEVE incluir sua referência de origem: `[Source: architecture/{filename}.md#{section}]`
  - Se a informação de uma categoria não for encontrada nos docs de arquitetura, declarar explicitamente: "No specific guidance found in architecture docs"
- **Seção `Tasks / Subtasks`:**
  - Gerar uma lista detalhada e sequencial de tasks técnicas baseada APENAS em: Epic Requirements, Story AC, Reviewed Architecture Information
  - Cada task deve referenciar a documentação de arquitetura relevante
  - Incluir testes unitários como subtasks explícitas com base na Testing Strategy
  - Vincular as tasks aos ACs quando aplicável (ex.: `Task 1 (AC: 1, 3)`)
- Adicionar notas sobre o alinhamento da estrutura do projeto ou discrepâncias encontradas no Passo 4

### 6. Conclusão e Revisão do Rascunho da Story

- **Consulte tools/mcp/clickup.yaml** para as operações update_task e get_task ao gerenciar o status e os metadados da story
- Consulte a seção de requisitos de validação antes de atualizar o status da task
- Revisar todas as seções quanto à completude e precisão
- Verificar se todas as referências de origem estão incluídas para os detalhes técnicos
- Garantir que as tasks estejam alinhadas com os requisitos do epic e as restrições de arquitetura
- Atualizar o status para "Draft" e salvar o arquivo da story
- Executar `.aiox-core/development/tasks/execute-checklist` `.aiox-core/product/checklists/story-draft-checklist`
- Fornecer um resumo ao usuário incluindo:
  - Story criada: `{devStoryLocation}/{epicNum}.{storyNum}.story.md`
  - Status: Draft
  - Principais componentes técnicos incluídos a partir dos docs de arquitetura
  - Quaisquer desvios ou conflitos observados entre o epic e a arquitetura
  - Resultados do Checklist
  - Próximos passos: Para stories Complexas, sugerir que o usuário revise cuidadosamente o rascunho da story e, opcionalmente, peça ao PO para rodar a task `.aiox-core/development/tasks/validate-next-story`

**Nota sobre a Integração com o ClickUp:** Esta task agora inclui a verificação do Epic (Seção 5.1), a criação da task de story no ClickUp (Seção 5.3) e as atualizações automáticas do frontmatter (Seção 5.4). As stories são criadas como subtasks do seu Epic pai na lista Backlog do ClickUp. Se a verificação do Epic ou a sincronização com o ClickUp falhar, o arquivo da story ainda será criado localmente com uma mensagem de aviso.

## Handoff
next_agent: @po
next_command: *validate-story-draft {story-id}
condition: Story status is Draft
alternatives:
  - agent: @dev, command: *develop {story-id}, condition: Story already validated by PO
