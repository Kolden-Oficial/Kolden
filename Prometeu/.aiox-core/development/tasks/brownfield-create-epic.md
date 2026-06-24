---
tools:
  - github-cli
checklists:
  - po-master-checklist.md
  - change-checklist.md
---

# Create Brownfield Epic Task

## Propósito

Criar um único epic para enhancements brownfield menores que não exigem o processo completo de documentação de PRD e Arquitetura. Esta task é para features ou modificações isoladas que podem ser concluídas dentro de um escopo focado.

## Quando Usar Esta Task

**Use esta task quando:**

- O enhancement pode ser concluído em 1-3 stories
- Nenhuma mudança arquitetural significativa é necessária
- O enhancement segue padrões existentes do projeto
- A complexidade de integração é mínima
- O risco ao sistema existente é baixo

**Use o processo completo de PRD/Arquitetura brownfield quando:**

- O enhancement requer múltiplas stories coordenadas
- É necessário planejamento arquitetural
- É necessário trabalho de integração significativo
- É necessário avaliação de risco e planejamento de mitigação


## Dependências de Configuração

Esta task requer as seguintes chaves de configuração de `core-config.yaml`:

- **`devStoryLocation`**: Localização dos arquivos de story (tipicamente docs/stories)

- **`prdShardedLocation`**: Localização dos documentos de PRD fragmentados (tipicamente docs/prd) - Necessário para acessar os requisitos de produto
- **`architectureShardedLocation`**: Localização dos documentos de arquitetura fragmentados (tipicamente docs/architecture) - Necessário para ler/escrever a documentação de arquitetura

**Carregando Config:**
```javascript
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../.aiox-core/core-config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

const dev_story_location = config.devStoryLocation;
const prdShardedLocation = config.prdShardedLocation || 'docs/prd'; // prdShardedLocation
const architectureShardedLocation = config.architectureShardedLocation || 'docs/architecture'; // architectureShardedLocation
```

## Instruções

### 0. Inteligência de Código: Visão Geral do Codebase (Opcional — Pulado automaticamente se indisponível)

> **Condição:** Execute somente se `isCodeIntelAvailable()` retornar true.
> Se nenhum provedor de inteligência de código estiver disponível, pule este passo silenciosamente e prossiga para o Passo 1.

Quando a inteligência de código estiver disponível, enriqueça o epic com dados reais do codebase:

```javascript
const { isCodeIntelAvailable } = require('.aiox-core/core/code-intel');
const { getCodebaseOverview, getDependencyGraph } = require('.aiox-core/core/code-intel/helpers/planning-helper');

if (isCodeIntelAvailable()) {
  const overview = await getCodebaseOverview('.');
  const depGraph = await getDependencyGraph('.');

  // Include in epic under "Codebase Intelligence" section:
  // - overview.codebase: project patterns, file groups
  // - overview.stats: file counts, language distribution
  // - depGraph.dependencies: module relationships
  // - depGraph.summary: { totalDeps, depth }
}
```

**Se os dados estiverem disponíveis, adicione esta seção ao epic:**

#### Inteligência de Código

| Métrica | Valor |
|--------|-------|
| Visão Geral do Projeto | {{overview.codebase summary}} |
| Estatísticas de Arquivos | {{overview.stats}} |
| Profundidade de Dependências | {{depGraph.summary.depth}} |
| Total de Dependências | {{depGraph.summary.totalDeps}} |

**Resumo do Grafo de Dependências:**
{{depGraph.dependencies key relationships}}

> **Nota:** Esta seção é gerada automaticamente a partir da inteligência de código. Os valores são dados reais do codebase, não estimativas.

---

### 1. Análise do Projeto (Obrigatório)

Antes de criar o epic, reúna informações essenciais sobre o projeto existente:

**Contexto do Projeto Existente:**

- [ ] Propósito do projeto e funcionalidade atual compreendidos
- [ ] Stack de tecnologia existente identificada
- [ ] Padrões de arquitetura atuais anotados
- [ ] Pontos de integração com o sistema existente identificados

**Escopo do Enhancement:**

- [ ] Enhancement claramente definido e escopado
- [ ] Impacto na funcionalidade existente avaliado
- [ ] Pontos de integração necessários identificados
- [ ] Critérios de sucesso estabelecidos

### 2. Criação do Epic

Crie um epic focado seguindo esta estrutura:

#### Título do Epic

{{Enhancement Name}} - Brownfield Enhancement

#### Objetivo do Epic

{{1-2 sentences describing what the epic will accomplish and why it adds value}}

#### Descrição do Epic

**Contexto do Sistema Existente:**

- Funcionalidade relevante atual: {{brief description}}
- Stack de tecnologia: {{relevant existing technologies}}
- Pontos de integração: {{where new work connects to existing system}}

**Detalhes do Enhancement:**

- O que está sendo adicionado/alterado: {{clear description}}
- Como se integra: {{integration approach}}
- Critérios de sucesso: {{measurable outcomes}}

#### Stories (Aprimoradas com Planejamento de Qualidade)

**🔧 Atribuição Dinâmica de Executor (Story 11.1 - Projeto Bob)**

Use o módulo executor-assignment para atribuir automaticamente o executor e o quality gate de cada story:

```javascript
// .aiox-core/core/orchestration/executor-assignment.js
const { assignExecutorFromContent } = require('.aiox-core/core/orchestration/executor-assignment');

// For each story in the epic:
const storyContent = `${storyTitle}\n${storyDescription}\n${acceptanceCriteria}`;
const assignment = assignExecutorFromContent(storyContent);

// Returns:
// {
//   executor: '@dev' | '@data-engineer' | '@devops' | '@ux-design-expert' | '@analyst' | '@architect',
//   quality_gate: '@architect' | '@dev' | '@pm',
//   quality_gate_tools: ['code_review', 'pattern_validation', ...]
// }
```

**Tabela de Atribuição de Executor:**

| Tipo de Trabalho | Palavras-chave | Executor | Quality Gate |
|-----------|----------|----------|--------------|
| Código/Features/Lógica | feature, logic, handler, service, api | @dev | @architect |
| Schema/DB/RLS/Migrations | schema, table, migration, rls, query, database | @data-engineer | @dev |
| Infra/CI/CD/Deploy | ci/cd, deploy, docker, kubernetes, pipeline | @devops | @architect |
| Design/Componentes de UI | component, ui, design, interface, accessibility | @ux-design-expert | @dev |
| Pesquisa/Investigação | research, investigate, analyze, poc | @analyst | @pm |
| Decisões de Arquitetura | architecture, design_decision, pattern, scalability | @architect | @pm |

**REGRAS CRÍTICAS:**
- [ ] **executor != quality_gate** (SEMPRE diferentes)
- [ ] Inclua `executor`, `quality_gate` e `quality_gate_tools` no frontmatter YAML de cada story
- [ ] Registre a atribuição para rastreabilidade

Liste 1-3 stories focadas que completam o epic, incluindo os quality gates previstos e as atribuições de agentes especializados:

**Estrutura da Story com Previsões de Qualidade:**

Cada story deve incluir:
- Título da story e breve descrição
- Agentes especializados previstos (com base no tipo da story)
- Quality gates (Pre-Commit, Pre-PR, Pre-Deployment se aplicável)

**Template de Frontmatter YAML da Story (Campos Obrigatórios):**

```yaml
# Every story MUST include these fields in YAML frontmatter
executor: "@data-engineer"           # Assigned via assignExecutorFromContent()
quality_gate: "@dev"                  # MUST be different from executor
quality_gate_tools: [schema_validation, migration_review, rls_test]
```

**Exemplos:**

1. **Story 1: {{Database Migration Story}}**
   - Descrição: {{Add new table for feature X with RLS policies}}
   - **Atribuição de Executor**: `executor: @data-engineer`, `quality_gate: @dev`
   - **Ferramentas do Quality Gate**: `[schema_validation, migration_review, rls_test]`
   - **Quality Gates**:
     - Pre-Commit: Validação de schema, verificação de filtro de serviço
     - Pre-PR: Revisão de SQL, verificação de segurança da migration
   - **Foco**: Filtros de serviço (.eq('service', 'ttcx')), políticas RLS, foreign keys

2. **Story 2: {{API Integration Story}}**
   - Descrição: {{Create REST endpoint for feature X}}
   - **Agentes Previstos**: @dev, @architect (se houver novos padrões)
   - **Quality Gates**:
     - Pre-Commit: Varredura de segurança, validação de tratamento de erros
     - Pre-PR: Validação de contrato de API, verificação de retrocompatibilidade
   - **Foco**: Validação de entrada, autenticação, respostas de erro

3. **Story 3: {{Deployment Story}}**
   - Descrição: {{Deploy feature X to production with configuration}}
   - **Agentes Previstos**: @dev, @github-devops (coordenação de deployment)
   - **Quality Gates**:
     - Pre-Commit: Validação de configuração
     - Pre-PR: Verificação de consistência de ambiente
     - Pre-Deployment: Varredura completa de segurança, validação do plano de rollback
   - **Foco**: Gerenciamento de secrets, configuração de ambiente, deployment com zero downtime

**Guia de Atribuição de Agentes para Planejamento de Epic:**

Ao decompor o epic em stories, preveja os agentes com base em:

- **Mudanças de Banco de Dados** → Inclua @db-sage no planejamento da story
- **Mudanças de API/Backend** → Inclua @architect para revisão de contrato
- **Mudanças de Frontend/UI** → Inclua @ux-expert para acessibilidade
- **Deployment/Infraestrutura** → Inclua @github-devops para coordenação
- **Funcionalidades de Segurança** → Garanta que @dev foque na validação OWASP

**Orientação para Previsão de Quality Gate:**

- **Todas as Stories**: Devem incluir revisão Pre-Commit (@dev)
- **Stories que Criam PRs**: Inclua validação Pre-PR (@github-devops)
- **Deployments de Produção**: Inclua varredura Pre-Deployment (@github-devops)
- **Stories de ALTO RISCO**: Considere feature flags e rollout em fases

Este planejamento de qualidade durante a criação do epic garante:
- Os criadores de stories sabem quais agentes consultar
- Os quality gates são planejados antecipadamente, não adaptados depois
- Validação apropriada ao risco é incorporada em cada story
- A expertise especializada é alocada corretamente

#### Requisitos de Compatibilidade

- [ ] APIs existentes permanecem inalteradas
- [ ] Mudanças de schema do banco de dados são retrocompatíveis
- [ ] Mudanças de UI seguem padrões existentes
- [ ] Impacto de performance é mínimo

#### Mitigação de Risco

- **Risco Primário:** {{main risk to existing system}}
- **Mitigação:** {{how risk will be addressed}}
- **Plano de Rollback:** {{how to undo changes if needed}}

**Estratégia de Garantia de Qualidade:**

A validação proativa de qualidade reduz o risco aos sistemas existentes:

- **Validação CodeRabbit**: Todas as stories incluem revisões pre-commit
  - Stories de banco de dados: @db-sage valida conformidade de schema, filtros de serviço, políticas RLS
  - Stories de API: @architect valida contratos, retrocompatibilidade
  - Stories de deployment: @github-devops valida configuração, prontidão de rollback

- **Expertise Especializada**: A atribuição de agentes garante que especialistas de domínio revisem as mudanças relevantes
  - Previne deriva arquitetural
  - Captura problemas de integração cedo
  - Valida considerações de segurança
  - Garante padrões de acessibilidade

- **Quality Gates Alinhados ao Risco**:
  - BAIXO RISCO: Apenas validação Pre-Commit
  - MÉDIO RISCO: Validação Pre-Commit + Pre-PR
  - ALTO RISCO: Validação Pre-Commit + Pre-PR + Pre-Deployment

- **Prevenção de Regressão**:
  - Cada story inclui tasks para verificar a funcionalidade existente
  - Testes de integração validam a compatibilidade
  - Testes de performance previnem degradação
  - Feature flags permitem rollout seguro se necessário

**Exemplo de Mitigação de Risco de Qualidade:**

Para um epic que adiciona processamento de pagamentos:
- Risco: Quebrar o fluxo de checkout existente
- Mitigação de Qualidade:
  - @db-sage revisa as mudanças de schema das tabelas de pagamento
  - @architect valida os contratos de API com o gateway de pagamento existente
  - A varredura Pre-Deployment valida que não há secrets hardcoded
  - Rollout em fases: 5% → 25% → 50% → 100% dos usuários
  - Alertas de monitoramento sobre falhas de transação
  - Procedimento de rollback de 1 clique documentado e testado

#### Definition of Done

- [ ] Todas as stories concluídas com os critérios de aceite atendidos
- [ ] Funcionalidade existente verificada através de testes
- [ ] Pontos de integração funcionando corretamente
- [ ] Documentação atualizada apropriadamente
- [ ] Nenhuma regressão nas features existentes

### 3. Checklist de Validação

Antes de finalizar o epic, garanta:

**Validação de Escopo:**

- [ ] O epic pode ser concluído em no máximo 1-3 stories
- [ ] Nenhuma documentação arquitetural é necessária
- [ ] O enhancement segue padrões existentes
- [ ] A complexidade de integração é gerenciável

**Avaliação de Risco:**

- [ ] O risco ao sistema existente é baixo
- [ ] O plano de rollback é viável
- [ ] A abordagem de testes cobre a funcionalidade existente
- [ ] A equipe tem conhecimento suficiente dos pontos de integração

**Verificação de Completude:**

- [ ] O objetivo do epic é claro e alcançável
- [ ] As stories estão devidamente escopadas
- [ ] Os critérios de sucesso são mensuráveis
- [ ] As dependências estão identificadas

### 4. Handoff para o Story Manager

Uma vez que o epic esteja validado, forneça este handoff ao Story Manager:

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
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
task: brownfieldCreateEpic()
responsável: Morgan (Strategist)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: task
  tipo: string
  origem: Entrada do Usuário
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: Entrada do Usuário
  obrigatório: false
  validação: Parâmetros de task válidos

- campo: mode
  tipo: string
  origem: Entrada do Usuário
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memória
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: Gerenciamento de estado
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar que a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; código de saída 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar que a task concluída; código de saída 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; código de saída 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que a task concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Task concluída conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Fonte:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Fonte:** .aiox-core/utils/logger.js

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
   - **Causa:** Parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** Task excede o tempo máximo de execução
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
- Quebrar em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

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


**Handoff para o Story Manager:**

"Por favor, desenvolva user stories detalhadas para este epic brownfield. Considerações-chave:

- Este é um enhancement a um sistema existente rodando {{technology stack}}
- Pontos de integração: {{list key integration points}}
- Padrões existentes a seguir: {{relevant existing patterns}}
- Requisitos críticos de compatibilidade: {{key requirements}}
- Cada story deve incluir a verificação de que a funcionalidade existente permanece intacta

O epic deve manter a integridade do sistema enquanto entrega {{epic goal}}."

---

## Critérios de Sucesso

A criação do epic é bem-sucedida quando:

1. O escopo do enhancement está claramente definido e dimensionado adequadamente
2. A abordagem de integração respeita a arquitetura do sistema existente
3. O risco à funcionalidade existente é minimizado
4. As stories estão logicamente sequenciadas para uma implementação segura
5. Os requisitos de compatibilidade estão claramente especificados
6. O plano de rollback é viável e documentado

## Notas Importantes

- Esta task é especificamente para enhancements brownfield PEQUENOS
- Se o escopo crescer além de 3 stories, considere o processo completo de PRD brownfield
- Sempre priorize a integridade do sistema existente sobre novas funcionalidades
- Em caso de dúvida sobre escopo ou complexidade, escale para o planejamento brownfield completo
 