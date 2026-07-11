---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tasks simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: runWorkflow()
responsavel: Orion (Commander)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: workflow_name
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve corresponder a um arquivo YAML de workflow existente

- campo: target_context
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Deve ser "core", "squad" ou "hybrid". Padrão: "core"

- campo: squad_name
  tipo: string
  origem: User Input
  obrigatório: false (obrigatório quando target_context="squad" ou "hybrid")
  validação: Deve ser kebab-case, o squad deve existir em squads/

- campo: action
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Deve ser "start", "continue", "status", "skip" ou "abort". Padrão: "continue"

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Deve ser "guided" ou "engine". Padrão: "guided"

**Saída:**
- campo: workflow_state
  tipo: object
  destino: Sistema de arquivos (.aiox/{instance-id}-state.yaml)
  persistido: true

- campo: next_steps
  tipo: array
  destino: Saída
  persistido: false

- campo: handoff_prompt
  tipo: string
  destino: Saída
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] workflow_name deve resolver para um arquivo YAML existente
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se o arquivo de workflow existe no caminho resolvido
    error_message: "Pré-condição falhou: Workflow '{workflow_name}' não encontrado"
  - [ ] Para action=continue/status/skip/abort, um arquivo de estado ativo deve existir
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se .aiox/{instance-id}-state.yaml existe com status=active
    error_message: "Pré-condição falhou: Nenhuma instância de workflow ativa encontrada"
  - [ ] Quando target_context="squad" ou "hybrid", o diretório do squad deve existir
    tipo: pre-condition
    blocker: true
    validação: |
      Se target_context for "squad" ou "hybrid", verificar se squads/{squad_name}/ existe
    error_message: "Pré-condição falhou: Squad '{squad_name}' não encontrado"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Arquivo de estado criado/atualizado e próximos passos exibidos
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se o arquivo de estado existe e se a saída foi gerada
    error_message: "Pós-condição falhou: Arquivo de estado não gravado ou saída ausente"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Ação executada corretamente; estado persistido; próximos passos exibidos
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que a ação foi concluída e que o estado reflete a mudança
    error_message: "Critério de aceite não atendido: Falha na execução da ação"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

> **Nota:** As ferramentas abaixo são padrões conceituais executados pelo agente de IA em tempo de execução (leituras de arquivo, parsing de YAML, gerenciamento de estado). Elas NÃO são scripts JS independentes — o agente implementa essa lógica inline usando suas ferramentas nativas (Read, Write, Glob, etc.).

- **Ferramenta:** workflow-state-manager
  - **Propósito:** Criar, carregar, salvar e consultar o estado do workflow
  - **Ciclo de vida:** Apenas o estado de workflow guiado legado; os novos fluxos de ciclo de vida de story/epic usam `.aiox-core/core/orchestration/session-state.js`
  - **Implementação:** O agente de IA lê/escreve os arquivos `.aiox/{instance-id}-state.yaml` diretamente

- **Ferramenta:** workflow-validator
  - **Propósito:** Validar o YAML do workflow antes de iniciar
  - **Implementação:** O agente de IA valida estrutura, sequência e referências inline

- **Ferramenta:** file-system
  - **Propósito:** Leitura de arquivos YAML e persistência de estado
  - **Implementação:** Ferramentas nativas Read/Write/Glob

---

## Tratamento de Erros

**Estratégia:** abort

**Erros Comuns:**

1. **Erro:** Workflow Não Encontrado
   - **Causa:** O workflow_name especificado não resolve para um arquivo YAML
   - **Resolução:** Verificar o nome e o contexto alvo
   - **Recuperação:** Listar os workflows disponíveis

2. **Erro:** Nenhuma Instância Ativa
   - **Causa:** Tentar continue/status/skip/abort sem um estado ativo
   - **Resolução:** Iniciar o workflow primeiro com action=start
   - **Recuperação:** Exibir os arquivos de estado disponíveis

3. **Erro:** Passo Não Opcional
   - **Causa:** Tentar pular um passo não opcional
   - **Resolução:** Concluir o passo ou abortar o workflow
   - **Recuperação:** Exibir quais passos são opcionais

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 1-3 min (estimado)
cost_estimated: $0.001-0.005
token_usage: ~500-1.500 tokens
```

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - run-workflow-engine.md
tags:
  - workflow
  - execution
  - automation
  - state-management
updated_at: 2026-01-31
```

---

# Task Run Workflow

## Propósito

Fornecer automação guiada de workflow com persistência de estado baseada em arquivo. Rastreia o progresso do workflow entre sessões, sugere as próximas ações concretas e mantém a continuidade. NÃO é uma engine de execução completa — uma abordagem de "automação guiada" em que o humano permanece como orquestrador.

## Pré-requisitos

- O YAML do workflow alvo deve existir no caminho resolvido
- Para o modo engine: a task `run-workflow-engine.md` deve existir em `.aiox-core/development/tasks/run-workflow-engine.md`
- O diretório de estado `.aiox/` deve ser gravável

## Pontos de Elicitação

As seguintes entradas são coletadas antes da execução:

1. **workflow_name** — Qual workflow rodar (obrigatório)
2. **target_context** — Onde procurar o workflow: `core`, `squad` ou `hybrid` (padrão: `core`)
3. **squad_name** — Obrigatório quando target_context é `squad` ou `hybrid`
4. **action** — O que fazer: `start`, `continue`, `status`, `skip`, `abort` (padrão: `continue`)
5. **mode** — Modo de execução: `guided` (troca de persona) ou `engine` (geração real de subagentes) (padrão: `guided`)

## Execução da Task

### Despacho de Modo

**ANTES de processar qualquer ação**, verifique o parâmetro `mode`:

```
SE mode == "engine":
  Delegar INTEGRALMENTE para a task run-workflow-engine.md.
  Passar todos os parâmetros: workflow_name, target_context, squad_name, action.
  A task engine cuida de tudo a partir daqui — NÃO continue abaixo.
  PARE.

SENÃO (mode == "guided" ou não especificado):
  Continuar com a lógica de automação guiada existente abaixo.
```

---


### Ação: `start`

Inicializar uma nova execução de workflow.

1. **Resolver o caminho do arquivo de workflow** com base em target_context:
   - `core` → `.aiox-core/development/workflows/{workflow_name}.yaml`
   - `squad` → `squads/{squad_name}/workflows/{workflow_name}.yaml`
   - `hybrid` → `squads/{squad_name}/workflows/{workflow_name}.yaml`

2. **Validar o workflow** usando o WorkflowValidator:
   - Deve passar na validação antes de iniciar
   - Exibir quaisquer avisos

3. **Criar o arquivo de estado** usando WorkflowStateManager.createState():
   - Gera um ID de instância único
   - Constrói a lista de passos a partir da sequência do workflow
   - Grava o estado em `.aiox/{instance-id}-state.yaml`

4. **Exibir as instruções do passo 1:**
   ```text
   === Workflow Iniciado: {workflow_name} ===
   Instância: {instance_id}

   Passo 1/{total}: {phase}
   Agente: @{agent}
   Ação: {action description}
   Notas: {step notes}

   Para executar este passo:
   1. Ative o agente: @{agent}
   2. {instruções específicas baseadas na ação}

   Ao concluir, rode: *run-workflow {workflow_name} continue
   ```

### Ação: `continue` (padrão)

Retomar a partir do passo atual.

1. **Encontrar o arquivo de estado ativo** deste workflow
2. **Carregar o estado** usando WorkflowStateManager.loadState()
3. **Obter o passo atual** — se o passo atual ainda estiver pendente, exibir suas instruções
4. **Se o passo atual foi concluído externamente**, marcar como concluído e avançar:
   - Confirmar com o usuário: "Você concluiu o passo {N}? (s/n)"
   - Se sim: markStepCompleted() → advanceStep() → exibir o próximo passo
   - Se não: reexibir as instruções do passo atual

5. **Exibir as instruções do próximo passo** com agente/comando pré-preenchidos:
   ```text
   Passo {N}/{total}: {phase}
   Agente: @{agent}
   Ação: {action}

   Comando sugerido: @{agent}
   Handoff: {handoff_prompt if available}

   Ao concluir, rode: *run-workflow {workflow_name} continue
   ```

6. **Salvar o estado atualizado**

### Ação: `status`

Exibir o resumo de progresso.

1. **Carregar o estado**
2. **Gerar o relatório de status** usando WorkflowStateManager.generateStatusReport():
   - Barra de progresso visual
   - Checklist de passos com ícones
   - Status dos artefatos
   - Log de decisões

### Ação: `skip`

Pular o passo atual (apenas se opcional).

1. **Carregar o estado**
2. **Verificar se o passo atual é opcional** — erro se não for
3. **Marcar o passo como pulado** usando WorkflowStateManager.markStepSkipped()
4. **Avançar para o próximo passo** usando WorkflowStateManager.advanceStep()
5. **Exibir as instruções do próximo passo**
6. **Salvar o estado atualizado**

### Ação: `abort`

Abortar a execução do workflow.

1. **Carregar o estado**
2. **Definir o status como 'aborted'**
3. **Gerar notas de limpeza:**
   ```text
   === Workflow Abortado: {workflow_name} ===
   Instância: {instance_id}
   Progresso: {completed}/{total} passos concluídos

   Artefatos criados:
   - {lista de artefatos criados}

   Arquivo de estado preservado em: .aiox/{instance-id}-state.yaml
   (Exclua manualmente se não for mais necessário)
   ```
4. **Salvar o estado final**

## Continuidade Multi-Sessão

O arquivo de estado persiste entre sessões. Para continuar um workflow:

1. O usuário inicia uma nova sessão do Claude Code
2. Ativa o @aiox-master
3. Roda `*run-workflow {name} continue`
4. O sistema carrega o estado, exibe o passo atual
5. O usuário executa o passo (possivelmente em uma nova sessão de agente)
6. Retorna e roda `continue` novamente

O método `generateHandoffContext()` produz markdown adequado para inclusão em documentos de handoff de sessão.

## Formato de Saída

Todas as ações produzem uma saída estruturada com:
- Cabeçalho de status
- Indicador de progresso
- Detalhes do passo atual
- Próximos comandos sugeridos
- Prompt de handoff (ao transicionar entre agentes)
