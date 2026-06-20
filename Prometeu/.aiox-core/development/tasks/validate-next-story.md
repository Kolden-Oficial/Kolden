---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: validateNextStory()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must exist

- campo: criteria
  tipo: array
  origem: config
  obrigatório: true
  validação: Non-empty validation criteria

- campo: strict
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: true

**Saída:**
- campo: validation_result
  tipo: boolean
  destino: Return value
  persistido: false

- campo: errors
  tipo: array
  destino: Memory
  persistido: false

- campo: report
  tipo: object
  destino: File (.ai/*.json)
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Validation rules loaded; target available for validation
    tipo: pre-condition
    blocker: true
    validação: |
      Check validation rules loaded; target available for validation
    error_message: "Pre-condition failed: Validation rules loaded; target available for validation"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Validation executed; results accurate; report generated
    tipo: post-condition
    blocker: true
    validação: |
      Verify validation executed; results accurate; report generated
    error_message: "Post-condition failed: Validation executed; results accurate; report generated"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Validation rules applied; pass/fail accurate; actionable feedback
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert validation rules applied; pass/fail accurate; actionable feedback
    error_message: "Acceptance criterion not met: Validation rules applied; pass/fail accurate; actionable feedback"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** validation-engine
  - **Propósito:** Validação baseada em regras e geração de relatórios
  - **Origem:** .aiox-core/utils/validation-engine.js

- **Ferramenta:** schema-validator
  - **Propósito:** Validação de schema JSON/YAML
  - **Origem:** ajv or similar

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** run-validation.js
  - **Propósito:** Executar as regras de validação e gerar o relatório
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/run-validation.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Critérios de Validação Ausentes
   - **Causa:** As regras de validação obrigatórias não estão definidas
   - **Resolução:** Garantir que os critérios de validação sejam carregados da config
   - **Recuperação:** Usar as regras de validação padrão, registrar warning em log

2. **Erro:** Schema Inválido
   - **Causa:** O alvo não corresponde ao schema esperado
   - **Resolução:** Atualizar o schema ou corrigir a estrutura do alvo
   - **Recuperação:** Relatório de erro de validação detalhado

3. **Erro:** Dependência Ausente
   - **Causa:** Dependência obrigatória para a validação não encontrada
   - **Resolução:** Instalar as dependências ausentes
   - **Recuperação:** Abortar com uma lista clara de dependências

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Quebrar em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---

tools:
  - github-cli        # Validate repository structure and file paths
  - context7          # Verify technical specifications and patterns
checklists:
  - po-master-checklist.md
---

# Task Validar a Próxima Story

## Propósito

Validar de forma abrangente um rascunho de story antes do início da implementação, garantindo que ele esteja completo, preciso e forneça contexto suficiente para um desenvolvimento bem-sucedido. Esta task identifica problemas e lacunas que precisam ser tratados, prevenindo alucinações e garantindo a prontidão para implementação.

## Execução SEQUENCIAL da Task (Não prossiga até que a Task atual esteja concluída)

### 0. Carregar a Configuração Central e as Entradas

- Carregar `.aiox-core/core-config.yaml`
- Se o arquivo não existir, PARE e informe ao usuário: "core-config.yaml not found. This file is required for story validation."
- Extrair as configurações-chave: `devStoryLocation`, `prd.*`, `architecture.*`
- Identificar e carregar as seguintes entradas:
  - **Arquivo da story**: O rascunho da story a validar (fornecido pelo usuário ou descoberto em `devStoryLocation`)
  - **Epic pai**: O epic que contém os requisitos desta story
  - **Documentos de arquitetura**: Com base na configuração (sharded ou monolítico)
  - **Template de story**: `.aiox-core/product/templates/story-tmpl.yaml` para a validação de completude

### 1. Validação de Completude do Template

- Carregar `.aiox-core/product/templates/story-tmpl.yaml` e extrair todos os títulos de seção do template
- **Verificação de seções ausentes**: Comparar as seções da story com as seções do template para confirmar que todas as seções obrigatórias estão presentes
- **Validação de placeholders**: Garantir que nenhum placeholder do template permaneça sem preenchimento (ex.: `{{EpicNum}}`, `{{role}}`, `_TBD_`)
- **Verificação das seções de agente**: Confirmar que todas as seções do template existem para uso futuro pelos agentes
- **Conformidade estrutural**: Verificar que a story segue a estrutura e a formatação do template

### 1.1 Validação da Atribuição de Executor (Story 11.1 - Projeto Bob)

**Referência de PRD:** AIOX v2.0 "Projeto Bob" - Seção 5 (Atribuição Dinâmica de Executor)

**Verificação de Campos Obrigatórios:**
- [ ] campo **executor** presente e não vazio
- [ ] campo **quality_gate** presente e não vazio
- [ ] campo **quality_gate_tools** presente como array não vazio

**Validação de Restrição:**
- [ ] **executor != quality_gate** (CRÍTICO - devem ser diferentes)
- [ ] **executor** é um agente conhecido: @dev, @data-engineer, @devops, @ux-design-expert, @analyst, @architect
- [ ] **quality_gate** é um agente conhecido: @architect, @dev, @pm

**Consistência Tipo-para-Executor:**
| Tipo de Trabalho | Executor Esperado | Quality Gate Esperado |
|-----------|-------------------|----------------------|
| Código/Features/Lógica | @dev | @architect |
| Schema/DB/RLS/Migrations | @data-engineer | @dev |
| Infra/CI/CD/Deploy | @devops | @architect |
| Design/Componentes de UI | @ux-design-expert | @dev |
| Pesquisa/Investigação | @analyst | @pm |
| Decisões de Arquitetura | @architect | @pm |

- [ ] As palavras-chave do conteúdo da story correspondem ao tipo de executor atribuído
- [ ] As ferramentas do quality gate são apropriadas para o tipo de executor

**Resultado da Validação:**
- [ ] PASS: Todos os campos de atribuição de executor válidos
- [ ] FAIL: Campos ausentes, atribuição inválida, ou executor == quality_gate

### 2. Validação da Estrutura de Arquivos e da Árvore de Código-Fonte

- **Consulte tools/cli/github-cli.yaml** para comandos de validação da estrutura do repositório e operações de verificação de caminhos de arquivo
- Consulte a seção de exemplos para padrões de listagem de arquivos e inspeção da estrutura de diretórios
- **Clareza dos caminhos de arquivo**: Os arquivos novos/existentes a serem criados/modificados estão claramente especificados?
- **Relevância da árvore de código-fonte**: A estrutura relevante do projeto está incluída nas Dev Notes?
- **Estrutura de diretórios**: Os novos diretórios/componentes estão devidamente localizados de acordo com a estrutura do projeto?
- **Sequência de criação de arquivos**: As tasks especificam onde os arquivos devem ser criados, em ordem lógica?
- **Precisão de caminhos**: Os caminhos de arquivo são consistentes com a estrutura do projeto dos documentos de arquitetura?

### 3. Validação de Completude de UI/Frontend (se aplicável)

- **Especificações de componentes**: Os componentes de UI estão suficientemente detalhados para a implementação?
- **Orientação de estilização/design**: A orientação de implementação visual está clara?
- **Fluxos de interação do usuário**: Os padrões e comportamentos de UX estão especificados?
- **Responsividade/acessibilidade**: Essas considerações estão tratadas, se necessário?
- **Pontos de integração**: Os pontos de integração frontend-backend estão claros?

### 4. Avaliação da Satisfação dos Critérios de Aceite

- **Cobertura dos AC**: Todos os critérios de aceite serão satisfeitos pelas tasks listadas?
- **Testabilidade dos AC**: Os critérios de aceite são mensuráveis e verificáveis?
- **Cenários ausentes**: Os casos de borda ou condições de erro estão cobertos?
- **Definição de sucesso**: O "concluído" está claramente definido para cada AC?
- **Mapeamento Task-AC**: As tasks estão devidamente vinculadas a critérios de aceite específicos?

### 5. Revisão das Instruções de Validação e Teste

- **Clareza da abordagem de teste**: Os métodos de teste estão claramente especificados?
- **Cenários de teste**: Os principais casos de teste estão identificados?
- **Passos de validação**: Os passos de validação dos critérios de aceite estão claros?
- **Ferramentas/frameworks de teste**: As ferramentas de teste necessárias estão especificadas?
- **Requisitos de dados de teste**: As necessidades de dados de teste estão identificadas?

### 6. Avaliação de Considerações de Segurança (se aplicável)

- **Requisitos de segurança**: As necessidades de segurança estão identificadas e tratadas?
- **Autenticação/autorização**: Os controles de acesso estão especificados?
- **Proteção de dados**: Os requisitos de tratamento de dados sensíveis estão claros?
- **Prevenção de vulnerabilidades**: Os problemas comuns de segurança estão tratados?
- **Requisitos de conformidade**: As necessidades regulatórias/de conformidade estão tratadas?

### 7. Validação da Sequência de Tasks/Subtasks

- **Ordem lógica**: As tasks seguem a sequência de implementação adequada?
- **Dependências**: As dependências entre tasks estão claras e corretas?
- **Granularidade**: As tasks têm tamanho apropriado e são acionáveis?
- **Completude**: As tasks cobrem todos os requisitos e critérios de aceite?
- **Problemas de bloqueio**: Há alguma task que bloquearia outras?

### 8. Validação da Integração com CodeRabbit (CONDICIONAL)

**PASSO CONDICIONAL** - Verifique `coderabbit_integration.enabled` no core-config.yaml

**SE `coderabbit_integration.enabled: false`:**
- PULE este passo inteiro
- Verifique se a story contém o aviso de pulo na seção CodeRabbit Integration:
  > **CodeRabbit Integration**: Disabled
- Registre em log: "ℹ️ CodeRabbit validation skipped - disabled in core-config.yaml"
- Prossiga para o Passo 9

**SE `coderabbit_integration.enabled: true`:**
- Valide TODOS os itens a seguir:

**Presença da Seção:**
- A seção `🤖 CodeRabbit Integration` está presente?
- Todas as subseções estão preenchidas (Story Type Analysis, Specialized Agents, Quality Gates, Self-Healing, Focus Areas)?

**Análise do Tipo de Story:**
- O tipo primário de story está corretamente identificado?
- O nível de complexidade corresponde ao escopo da story?
- Os tipos secundários estão listados, se aplicável?

**Atribuição de Agente Especializado:**
- O @dev está listado como agente primário (obrigatório para todas as stories)?
- Os agentes específicos por tipo estão atribuídos adequadamente?
  - Stories de Database → @db-sage
  - Stories de Frontend → @ux-expert
  - Stories de Deployment → @github-devops
  - Stories de Security → @architect

**Tasks de Quality Gate:**
- Todos os quality gates aplicáveis estão definidos como checkboxes?
- Pre-Commit (@dev) - OBRIGATÓRIO para todas as stories
- Pre-PR (@github-devops) - Obrigatório se um PR for criado
- Pre-Deployment (@github-devops) - Obrigatório para stories de produção

**Configuração de Self-Healing (Story 6.3.3):**
- A configuração de self-healing está presente?
- O modo corresponde ao agente primário?
  - @dev: modo light (2 iterações, 15 min, somente CRITICAL)
  - @qa: modo full (3 iterações, 30 min, CRITICAL+HIGH)
  - @github-devops: modo check (apenas relatório)
- O comportamento por severidade está documentado?

**Áreas de Foco:**
- As áreas de foco correspondem ao tipo de story?
- As validações específicas por tipo estão listadas?
  - Database: service filters, conformidade de schema, RLS
  - API: tratamento de erros, segurança, validação
  - Frontend: acessibilidade, performance, responsividade

**Resultado da Validação:**
- [ ] PASS: Seção do CodeRabbit completa e precisa
- [ ] PARTIAL: Seção presente mas incompleta
- [ ] FAIL: Seção ausente ou criticamente incompleta
- [ ] N/A: CodeRabbit desabilitado no core-config.yaml

### 8.1 Code Intelligence: Sem Funcionalidade Duplicada (Auto-pular se indisponível)

- **Verificar a disponibilidade do code intelligence:** Chamar `isCodeIntelAvailable()` de `.aiox-core/core/code-intel`
- **Se disponível:**
  - Chamar `validateNoDuplicates(storyDescription)` de `.aiox-core/core/code-intel/helpers/story-helper`
    - Se `hasDuplicates: true`: Adicionar ao relatório de validação como problema **Should-Fix** — "Potential duplicate functionality detected: {suggestion}". Isto é **apenas consultivo** e NÃO bloqueia a validação.
    - Se `hasDuplicates: false`: Adicionar ao relatório como PASS — "No duplicate functionality detected"
  - Incluir o resultado na seção **Validation Result** sob "Code Intelligence Check"
- **Se NÃO disponível:** Pule este passo silenciosamente — a validação prossegue exatamente como antes, sem itens de code intelligence no relatório

### 9. Verificação Anti-Alucinação

- **Enriquecimento do Contexto do Epic**: Importar `EpicContextAccumulator` de `core/orchestration` e chamar `buildAccumulatedContext(epicId, storyN)` para enriquecer a validação com o contexto acumulado do epic (sumarização progressiva dentro dos limites de tokens)
- **Consulte tools/mcp/context7.yaml** para a consulta de documentação de bibliotecas a fim de verificar afirmações técnicas contra fontes oficiais
- Consulte a seção de exemplos para padrões de verificação de documentação e queries específicas por biblioteca
- **Verificação de fonte**: Toda afirmação técnica deve ser rastreável até os documentos de origem
- **Alinhamento com a arquitetura**: O conteúdo das Dev Notes corresponde às especificações de arquitetura
- **Sem detalhes inventados**: Sinalizar quaisquer decisões técnicas não suportadas pelos documentos de origem
- **Precisão de referências**: Verificar se todas as referências de origem estão corretas e acessíveis
- **Checagem de fatos**: Cruzar as afirmações com os documentos de epic e arquitetura

### 10. Prontidão de Implementação do Dev Agent

- **Contexto autocontido**: A story pode ser implementada sem ler documentos externos?
- **Instruções claras**: Os passos de implementação são inequívocos?
- **Contexto técnico completo**: Todos os detalhes técnicos necessários estão presentes nas Dev Notes?
- **Informações ausentes**: Identificar quaisquer lacunas críticas de informação
- **Acionabilidade**: Todas as tasks são acionáveis por um agente de desenvolvimento?

### 11. Gerar o Relatório de Validação

Forneça um relatório de validação estruturado incluindo:

#### Problemas de Conformidade com o Template

- Seções ausentes do template de story
- Placeholders ou variáveis de template não preenchidos
- Problemas estruturais de formatação

#### Problemas Críticos (Devem Ser Corrigidos - Story Bloqueada)

- Informações essenciais ausentes para a implementação
- Afirmações técnicas imprecisas ou não verificáveis
- Cobertura incompleta dos critérios de aceite
- Seções obrigatórias ausentes

#### Problemas Should-Fix (Melhorias de Qualidade Importantes)

- Orientação de implementação pouco clara
- Considerações de segurança ausentes
- Problemas de sequenciamento de tasks
- Instruções de teste incompletas

#### Melhorias Nice-to-Have (Aprimoramentos Opcionais)

- Contexto adicional que ajudaria a implementação
- Esclarecimentos que melhorariam a eficiência
- Melhorias de documentação

#### Achados Anti-Alucinação

- Afirmações técnicas não verificáveis
- Referências de origem ausentes
- Inconsistências com os documentos de arquitetura
- Bibliotecas, padrões ou normas inventados

#### Achados de Integração com CodeRabbit (CONDICIONAL)

**SE `coderabbit_integration.enabled: true`:**

- **Precisão do Tipo de Story**: O tipo de story está corretamente classificado?
- **Completude da Atribuição de Agentes**: Todos os agentes necessários estão atribuídos?
- **Cobertura de Quality Gate**: Todos os gates aplicáveis estão definidos?
- **Configuração de Self-Healing**: A configuração da Story 6.3.3 está presente?
- **Relevância das Áreas de Foco**: As áreas de foco correspondem ao tipo de story?

**SE `coderabbit_integration.enabled: false`:**

- **Aviso de Pulo Presente**: Verificar se o aviso de pulo está renderizado na story
- **Sem Tasks de Quality Gate**: Confirmar que não existem checkboxes do CodeRabbit
- **Fallback de Revisão Manual**: Observar que o processo de revisão manual se aplica

#### Avaliação Final

- **GO**: A story está pronta para implementação
- **NO-GO**: A story requer correções antes da implementação
- **Pontuação de Prontidão de Implementação**: Escala de 1 a 10
- **Nível de Confiança**: Alto/Médio/Baixo para uma implementação bem-sucedida

### 12. Atualização de Status Pós-Validação (OBRIGATÓRIO)

**Referência:** `.claude/rules/story-lifecycle.md` — A transição Draft → Ready é responsabilidade do @po.

**Este passo DEVE ser executado antes de apresentar os resultados ao usuário.**

**Formato do Change Log:** Use `{date: YYYY-MM-DD}` e `{version: MAJOR.MINOR.PATCH}`. A versão DEVE seguir as regras de bump semântico: major para breaking changes, minor para features, patch para correções/atualizações de processo. PARE se qualquer um dos valores não puder ser resolvido de forma determinística.

#### SE o veredito for GO (pontuação >= 7):

0. **Pré-verificação (bloqueante):**
   - Se o Status atual não for `**Draft**`, PARE e registre em log: "Cannot apply GO transition: expected Draft, found {current status}."
   - Se a seção Change Log estiver ausente, PARE e solicite ao usuário que restaure a estrutura do template.
1. **Atualizar o campo Status da story** no arquivo da story: alterar `**Draft**` para `**Ready**`
2. **Adicionar entrada no Change Log:**
   ```text
   | {date: YYYY-MM-DD} | {version: MAJOR.MINOR.PATCH} | Validated GO ({score}/10) — Status: Draft → Ready | @po |
   ```
3. **Log:** "✅ Story status updated: Draft → Ready"

#### SE o veredito for NO-GO (pontuação < 7):

0. **Pré-verificação (bloqueante):**
   - Se o Status atual não for `**Draft**`, PARE e registre em log: "Cannot apply NO-GO outcome: expected Draft, found {current status}."
   - Se a seção Change Log estiver ausente, PARE e solicite ao usuário que restaure a estrutura do template.
1. **Manter** o Status da story como `**Draft**`
2. **Adicionar entrada no Change Log:**
   ```text
   | {date: YYYY-MM-DD} | {version: MAJOR.MINOR.PATCH} | Validation NO-GO — {reason summary} | @po |
   ```
3. **Log:** "❌ Story remains Draft — fixes required before re-validation"

#### Justificativa

As transições de status definidas em `story-lifecycle.md` são consultivas (regras contextuais). Este passo as torna imperativas (procedurais), garantindo que os agentes sempre executem a transição como parte do workflow, em vez de depender da consciência das regras contextuais.

---

## Handoff
next_agent: @dev
next_command: *develop {story-id}
condition: Story status is Ready (GO decision, status updated in Step 12)
alternatives:
  - agent: @sm, command: *draft, condition: Story rejected (NO-GO), needs rework
