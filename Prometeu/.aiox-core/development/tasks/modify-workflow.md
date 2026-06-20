---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Passo 0: Análise de Impacto IDS (Consultiva)

Antes de prosseguir, verifique no Entity Registry o impacto desta modificação:

1. Identificar a entidade sendo modificada
2. Rodar `FrameworkGovernor.impactAnalysis(entityId)`
3. Exibir consumidores diretos, consumidores indiretos e nível de risco
4. Mostrar o adaptability score e o aviso de limiar de 30% se aplicável
5. Se o risco for HIGH/CRITICAL:
   - Avisar o usuário: "Esta modificação afeta N consumidores. Prossiga com cautela."
6. Se o IDS estiver indisponível (timeout/erro): Avisar e prosseguir normalmente

**NOTA:** Este passo é consultivo e NÃO bloqueia a modificação. O usuário sempre tem a decisão final.

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: modifyWorkflow()
responsável: Orion (Commander)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must exist in system

- campo: target_context
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Must be "core", "squad", or "hybrid". Default: "core"

- campo: squad_name
  tipo: string
  origem: User Input
  obrigatório: false (required when target_context="squad" or "hybrid")
  validação: Must be kebab-case, squad must exist in squads/

- campo: changes
  tipo: object
  origem: User Input
  obrigatório: true
  validação: Valid modification object

- campo: backup
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: true

**Saída:**
- campo: modified_file
  tipo: string
  destino: File system
  persistido: true

- campo: backup_path
  tipo: string
  destino: File system
  persistido: true

- campo: changes_applied
  tipo: object
  destino: Memory
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target exists; backup created; valid modification parameters
    tipo: pre-condition
    blocker: true
    validação: |
      Check target exists; backup created; valid modification parameters
    error_message: "Pre-condition failed: Target exists; backup created; valid modification parameters"
  - [ ] When target_context="squad" or "hybrid", squad directory must exist at squads/{squad_name}/
    tipo: pre-condition
    blocker: true
    validação: |
      If target_context is "squad" or "hybrid", verify squads/{squad_name}/ exists and has a valid squad.yaml
    error_message: "Pre-condition failed: Squad '{squad_name}' not found in squads/"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Modification applied; backup preserved; integrity verified
    tipo: post-condition
    blocker: true
    validação: |
      Verify modification applied; backup preserved; integrity verified
    error_message: "Post-condition failed: Modification applied; backup preserved; integrity verified"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Changes applied correctly; original backed up; rollback possible
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert changes applied correctly; original backed up; rollback possible
    error_message: "Acceptance criterion not met: Changes applied correctly; original backed up; rollback possible"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** file-system
  - **Purpose:** Leitura, modificação e backup de arquivos
  - **Source:** Node.js fs module

- **Tool:** ast-parser
  - **Purpose:** Fazer parse e modificar código com segurança
  - **Source:** .aiox-core/utils/ast-parser.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** modify-file.js
  - **Purpose:** Modificação segura de arquivos com backup
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/modify-file.js

---

## Tratamento de Erros

**Estratégia:** abort

**Erros Comuns:**

1. **Error:** Target Not Found
   - **Cause:** O recurso especificado não existe
   - **Resolution:** Verificar se o alvo existe antes da modificação
   - **Recovery:** Sugerir recursos similares ou criar novo

2. **Error:** Backup Failed
   - **Cause:** Não foi possível criar o backup antes da modificação
   - **Resolution:** Verificar espaço em disco e permissões
   - **Recovery:** Abortar a modificação, preservar o estado original

3. **Error:** Concurrent Modification
   - **Cause:** Recurso modificado por outro processo
   - **Resolution:** Implementar bloqueio de arquivo ou lógica de retry
   - **Recovery:** Repetir com backoff exponencial ou mesclar mudanças

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de Otimização:**
- Validar a configuração cedo; usar escritas atômicas; implementar checkpoints de rollback

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - modification
  - update
updated_at: 2025-11-17
```

---

checklists:
  - change-checklist.md
---

# Task de Modificação de Workflow

## Propósito

Modificar com segurança definições de workflows existentes, mantendo sua lógica de orquestração, preservando as transições de fase e garantindo que todas as interações entre agentes permaneçam válidas. Esta task permite a evolução de workflows por meio de modificações inteligentes com validação abrangente.

## Pré-requisitos

- O workflow alvo deve existir (caminho resolvido a partir de target_context):
  - `core` → `.aiox-core/development/workflows/`
  - `squad` → `squads/{squad_name}/workflows/`
  - `hybrid` → `squads/{squad_name}/workflows/`
- O usuário deve fornecer a intenção de modificação ou mudanças específicas
- Entendimento das fases do workflow e da orquestração de agentes
- O sistema de backup deve estar disponível para rollback

## Execução da Task

### 1. Análise e Backup do Workflow

- Resolver o caminho do workflow com base em target_context:
  - `core` → `.aiox-core/development/workflows/{workflow-name}.yaml`
  - `squad` → `squads/{squad_name}/workflows/{workflow-name}.yaml`
  - `hybrid` → `squads/{squad_name}/workflows/{workflow-name}.yaml`
- Carregar o workflow alvo a partir do caminho resolvido
- Criar um backup com timestamp no mesmo contexto:
  - `core` → `.aiox-core/development/workflows/.backups/{workflow-name}.yaml.{timestamp}`
  - `squad` → `squads/{squad_name}/workflows/.backups/{workflow-name}.yaml.{timestamp}`
  - `hybrid` → `squads/{squad_name}/workflows/.backups/{workflow-name}.yaml.{timestamp}`
- Fazer parse e analisar a estrutura do workflow:
  - Metadados (name, description, project type)
  - Definições e sequências de fases
  - Atribuições de agentes por fase
  - Definições de artefatos
  - Critérios de entrada/saída
  - Diagramas Mermaid (se presentes)

### 2. Análise de Dependências e Impacto

Analisar as conexões do workflow:
- Quais agentes são orquestrados por este workflow
- Quais artefatos são produzidos/consumidos
- Dependências de transição de fase
- Integração com outros workflows
- Compatibilidade com o tipo de projeto

### 3. Processamento da Intenção de Modificação

Se o usuário fornecer uma intenção de alto nível (ex.: "adicionar fase de revisão de código"):
- Analisar o fluxo atual de fases
- Determinar o ponto ótimo de inserção
- Identificar os agentes necessários para a nova fase
- Definir os artefatos para a nova fase
- Garantir que as transições de fase permaneçam lógicas

Se o usuário fornecer mudanças específicas:
- Validar as mudanças na estrutura YAML
- Garantir que o sequenciamento de fases permaneça válido
- Verificar a disponibilidade dos agentes
- Verificar a consistência dos artefatos
- Manter a lógica dos critérios de entrada/saída

### 4. Validação do Sequenciamento de Fases

Garantir que as modificações mantenham um fluxo válido:
```yaml
phases:
  planning:
    sequence: 1
    agents: [analyst, pm]
    artifacts: [project-brief, prd]
    
  # New phase insertion
  architecture_review:  # NEW
    sequence: 1.5      # Inserted between planning and architecture
    agents: [architect, qa]
    artifacts: [architecture-review-doc]
    entry_criteria: ["PRD approved"]
    exit_criteria: ["Architecture review complete"]
    
  architecture:
    sequence: 2  # Adjusted from 2
    agents: [architect]
    artifacts: [architecture-doc]
```

### 5. Atualização do Diagrama Mermaid

Se o workflow contiver visualização:
```mermaid
graph TD
    A[Planning] --> AR[Architecture Review]  %% NEW
    AR --> B[Architecture]
    B --> C[Development]
```

Atualizar o diagrama para refletir as novas fases e transições.

### 6. Gerar o Diff da Modificação

Criar um diff abrangente:
```diff
@@ Workflow: {workflow-name} @@
--- Current Version
+++ Modified Version

@@ Metadata @@
  name: {workflow-name}
  description: {description}
+ last_modified: {timestamp}
+ modified_by: aiox-developer

@@ Phases @@
  planning:
    sequence: 1
    agents: [analyst, pm]
    
+ code_review:
+   sequence: 3.5
+   agents: [qa, senior-dev]
+   artifacts: [code-review-report]
+   entry_criteria:
+     - "Development phase complete"
+     - "All tests passing"
+   exit_criteria:
+     - "Code review approved"
+     - "No critical issues"

@@ Simple Sequence @@
- "planning → architecture → development → testing"
+ "planning → architecture → development → code_review → testing"
```

### 7. Pipeline de Validação

Verificações de validação abrangentes:
- Validação de sintaxe YAML
- Continuidade da sequência de fases (sem lacunas)
- Verificação da existência dos agentes
- Completude das definições de artefatos
- Lógica dos critérios de entrada/saída
- Detecção de dependências circulares
- Sintaxe do diagrama Mermaid (se presente)

### 8. Simulação do Workflow

Simular o workflow modificado:
```
Phase Flow Simulation:
1. Planning (analyst, pm) → project-brief, prd ✓
2. Architecture Review (architect, qa) → review-doc ✓
3. Architecture (architect) → architecture-doc ✓
4. Development (dev) → code, tests ✓
5. Code Review (qa) → review-report ✓
6. Testing (qa) → test-results ✓

All phase transitions valid ✓
All agents available ✓
No circular dependencies ✓
```

### 9. Fluxo de Aprovação do Usuário

Apresentar um relatório abrangente:
1. Resumo das mudanças
2. Diff visual do YAML
3. Diagrama atualizado do fluxo de fases
4. Análise de impacto:
   - Novas fases adicionadas
   - Mudanças na carga de trabalho dos agentes
   - Adições de artefatos
   - Implicações no cronograma
5. Resultados da simulação

Solicitar aprovação explícita antes de aplicar as mudanças.

### 10. Aplicar as Modificações

Após a aprovação:
1. Gravar o YAML modificado no arquivo do workflow
2. Atualizar os diagramas Mermaid se presentes
3. Criar um commit git com mensagem descritiva
4. Atualizar a documentação do workflow
5. Notificar o orquestrador sobre as mudanças
6. Registrar a modificação no histórico

### 11. Validação Pós-Modificação

Verificar a funcionalidade do workflow:
- Carregar o workflow modificado no orquestrador
- Validar que todas as fases resolvem corretamente
- Verificar se as atribuições de agentes são válidas
- Garantir que os artefatos estejam devidamente definidos
- Testar a lógica de transição de fases

### 12. Capacidade de Rollback

Se forem detectados problemas:
1. Restaurar a partir do backup com timestamp
2. Reverter o commit git
3. Atualizar o cache do orquestrador
4. Registrar o rollback com o motivo

## Medidas de Segurança

1. **Continuidade de Fases**: Nunca quebrar as sequências de fases
2. **Disponibilidade de Agentes**: Verificar se todos os agentes existem
3. **Consistência de Artefatos**: Manter o fluxo de entrada/saída
4. **Lógica de Transição**: Preservar os critérios de entrada/saída
5. **Compatibilidade Retroativa**: Garantir que projetos existentes possam usar o workflow modificado

## Formato de Saída

```
=== Workflow Modification Report ===
Workflow: {workflow-name}
Timestamp: {ISO-8601 timestamp}
Backup: {backup-file-path}

Structure Analysis:
- Current phases: {phase-count}
- Current agents: {agent-list}
- Current artifacts: {artifact-count}

Changes Applied:
✓ Added phase: {phase-name} at position {sequence}
✓ Modified {n} phase sequences
✓ Added {n} new artifacts
✓ Updated {n} agent assignments
✓ Enhanced phase transitions

Validation Results:
✓ YAML syntax valid
✓ Phase sequence continuous
✓ All agents exist
✓ Artifacts properly defined
✓ No circular dependencies
✓ Mermaid diagram updated
✓ Git commit created: {commit-hash}

Simulation Results:
✓ All phases executable
✓ Agent assignments valid
✓ Artifact flow consistent
✓ Transitions logical

Impact Summary:
- Estimated timeline change: +{n} days
- New agent workload: {agent}: +{n} phases
- New artifacts produced: {artifact-list}

Workflow ready for use with enhanced orchestration.
```

## Tratamento de Erros

- Workflow não encontrado → Verificar o nome e o caminho
- YAML inválido → Mostrar o erro de sintaxe com a linha
- Lacunas na sequência de fases → Destacar as sequências ausentes
- Agentes ausentes → Listar os agentes indisponíveis
- Dependências circulares → Mostrar o ciclo de dependência
- Erros de Mermaid → Fornecer correção de sintaxe do diagrama

## Pontos de Integração

- Usa `yaml-validator.js` para verificação de sintaxe
- Integra-se com `git-wrapper.js` para controle de versão
- Coordena com o orquestrador para validação
- Aproveita `dependency-analyzer.js` para análise de impacto
