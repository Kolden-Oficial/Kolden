# Tarefa: Estratégia de Isolamento com Git Worktree

**Task ID:** worktree-strategy
**Version:** 1.0
**Purpose:** Planejar e configurar o isolamento com git worktree para cenários de desenvolvimento multi-agente
**Orchestrator:** @swarm-orchestrator (Nexus)
**Mode:** Interativo (elicit: true)
**Quality Standard:** Ciclo de vida do worktree testado de ponta a ponta, limpeza verificada

---

## Visão Geral

Esta tarefa planeja o isolamento com git worktree para times de agentes onde múltiplos agentes modificam o código simultaneamente. Worktrees dão a cada agente seu próprio diretório de trabalho e branch, eliminando conflitos de merge durante a execução e adiando a integração para uma fase de merge controlada.

```
ENTRADA (agents_count + shared_files_risk + merge_strategy)
    |
[FASE 1: AVALIAÇÃO DE ISOLAMENTO]
    -> Avaliar o risco de conflito de merge
    -> Determinar se o isolamento com worktree é necessário
    -> Identificar estratégias alternativas
    |
[FASE 2: ESTRATÉGIA DE BRANCH]
    -> Definir a convenção de nomenclatura de branch
    -> Planejar a seleção da branch base
    -> Configurar a proteção de branch
    |
[FASE 3: CONFIGURAÇÃO DO WORKTREE]
    -> Criar worktrees para cada agente
    -> Configurar os diretórios de trabalho dos agentes
    -> Verificar se cada worktree está funcional
    |
[FASE 4: GERENCIAMENTO DO CICLO DE VIDA]
    -> Definir o fluxo criar -> trabalhar -> merge -> limpeza
    -> Configurar gatilhos de limpeza automatizada
    -> Planejar a detecção de worktrees obsoletos
    |
[FASE 5: MERGE E LIMPEZA]
    -> Definir a ordem de merge (ciente de dependências)
    -> Tratar conflitos de merge
    -> Remover worktrees após merge bem-sucedido
    |
SAÍDA: Configuração de worktree + estratégia de branch + plano de ciclo de vida
```

---

## Entradas

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| agent_count | number | A partir da topologia do time | yes | Número de agentes que precisam de isolamento |
| base_branch | string | Detecção automática ou usuário | no | Branch a partir da qual criar os worktrees (default: atual) |
| task_id | string | User | yes | Identificador desta sessão de trabalho paralelo |
| shared_files | array | Análise | no | Arquivos que múltiplos agentes podem modificar |
| auto_cleanup | boolean | User | no | Remover worktrees após o merge (default: true) |

---

## Pré-condições

1. O repositório Git está inicializado e tem pelo menos um commit
2. A working tree atual está limpa (sem alterações não commitadas)
3. O comando `git worktree` está disponível (Git 2.5+)
4. Espaço em disco suficiente para N cópias do diretório de trabalho

---

## Fase 1: Avaliação de Isolamento

**Objetivo:** Determinar se o isolamento com worktree é de fato necessário.

### Quando Usar Worktrees vs Repositório Compartilhado

| Scenario | Strategy | Reason |
|----------|----------|--------|
| Agentes modificam arquivos diferentes | **Repositório compartilhado** | Sem risco de conflito, configuração mais simples |
| Agentes modificam os mesmos arquivos | **Worktree** | Previne conflitos de merge em tempo de execução |
| Pipeline sequencial (A depois B) | **Repositório compartilhado** | Sem escritas simultâneas |
| Agentes paralelos com sobreposição de arquivos | **Worktree** | Cada agente precisa de um estado limpo |
| Agente único com tarefa de longa duração | **Repositório compartilhado** | Sem necessidade de isolamento |
| Execução paralela de testes CI/CD | **Worktree** | Os testes precisam de ambientes independentes |

### Passos

1.1. Analisar as atribuições dos agentes a partir da topologia do time.
1.2. Construir uma matriz de propriedade de arquivos:

```
         | Agent-A | Agent-B | Agent-C |
---------|---------|---------|---------|
file1.ts |   W     |   R     |         |
file2.ts |         |   W     |   W     |  <-- CONFLITO
file3.ts |   W     |         |         |
```

1.3. Se algum arquivo tiver múltiplas entradas W (escrita), o isolamento com worktree é recomendado.
1.4. Se não houver conflitos, documentar a decisão de usar repositório compartilhado e PULAR as fases restantes.

---

## Fase 2: Estratégia de Branch

**Objetivo:** Definir como as branches se mapeiam para agentes e worktrees.

### Convenção de Nomenclatura de Branch

```
{task-id}/{agent-name}

Exemplos:
  feature-auth/code-reviewer
  feature-auth/test-writer
  feature-auth/docs-updater
```

### Passos

2.1. Definir a branch base (de onde os worktrees derivam):
   - Usar a branch atual para trabalho de story
   - Usar `main` para trabalho de feature independente

2.2. Criar um plano de branches:

```yaml
branches:
  base: "feature/auth-system"
  worktree_branches:
    - name: "feature/auth-system/api-agent"
      agent: "api-agent"
      files_owned: ["src/api/**"]
    - name: "feature/auth-system/test-agent"
      agent: "test-agent"
      files_owned: ["tests/**"]
    - name: "feature/auth-system/docs-agent"
      agent: "docs-agent"
      files_owned: ["docs/**"]
```

2.3. Verificar que nenhum nome de branch conflita com branches existentes.

---

## Fase 3: Configuração do Worktree

**Objetivo:** Criar e configurar worktrees para cada agente.

### Localização do Worktree

Os worktrees são criados como diretórios irmãos do repositório principal:

```
project/                    <-- working tree principal
project-wt-api-agent/      <-- worktree para api-agent
project-wt-test-agent/     <-- worktree para test-agent
project-wt-docs-agent/     <-- worktree para docs-agent
```

### Passos

3.1. Para cada agente, criar um worktree:

```bash
# Cria a branch e o worktree juntos
git worktree add ../project-wt-{agent-name} -b {branch-name} {base-branch}
```

3.2. Verificar se cada worktree está funcional:

```bash
git worktree list
# Deve mostrar o principal + N worktrees
```

3.3. Configurar cada agente para usar seu diretório de worktree como diretório de trabalho.
3.4. Instalar as dependências em cada worktree se necessário (ex.: `npm install`).

---

## Fase 4: Gerenciamento do Ciclo de Vida

**Objetivo:** Definir o ciclo de vida completo criar-trabalhar-merge-limpeza.

### Fluxo do Ciclo de Vida

```
CRIAR                  TRABALHAR               MERGE                LIMPEZA
  |                     |                       |                    |
  Criar worktree   ->  Agente trabalha     ->  Merge da branch ->  Remover worktree
  Criar branch         em isolamento            para a base         Deletar branch
  Instalar deps        Commita na branch        Resolver conflitos  Verificar limpeza
  |                     |                       |                    |
  [Automatizado]       [Conduzido pelo agente] [Orquestrado]       [Automatizado]
```

### Passos

4.1. Documentar o ciclo de vida para esta tarefa específica:

```yaml
lifecycle:
  create:
    trigger: "Início da tarefa"
    steps: ["criar worktree", "criar branch", "instalar deps"]
    estimated_time: "1-3 min"
  work:
    trigger: "Ativação do agente"
    duration: "Variável"
    monitoring: "Arquivo de progresso em local compartilhado"
  merge:
    trigger: "Todos os agentes concluídos"
    order: ["api-agent", "test-agent", "docs-agent"]
    conflict_resolution: "manual"
  cleanup:
    trigger: "Merge concluído + verificado"
    steps: ["remover worktree", "deletar branch"]
    auto: true
```

4.2. Definir a detecção de worktrees obsoletos:
   - Worktree sem commits em 24 horas = potencialmente obsoleto
   - Worktree de uma branch deletada/mesclada = definitivamente obsoleto
4.3. Configurar o comando de limpeza:

```bash
# Remove um worktree específico
git worktree remove ../project-wt-{agent-name}

# Remove referências obsoletas de worktree
git worktree prune
```

---

## Fase 5: Merge e Limpeza

**Objetivo:** Mesclar com segurança todo o trabalho dos agentes de volta para a branch base.

### Ordem de Merge

5.1. Mesclar na ordem de dependência (agentes cujo trabalho é dependido fazem merge primeiro):

```
1. api-agent    (sem dependências de outros agentes)
2. test-agent   (pode importar do código do api-agent)
3. docs-agent   (documenta o que o api-agent + test-agent construíram)
```

5.2. Para cada merge:

```bash
# Mudar para a branch base
git checkout {base-branch}

# Mesclar a branch do agente
git merge {agent-branch} --no-ff -m "merge: {agent-name} work for {task-id}"

# Em caso de conflito:
#   1. Identificar os arquivos em conflito
#   2. Resolver manualmente ou com a orientação do orquestrador
#   3. Commitar a resolução
```

5.3. Após todos os merges concluídos:
   - Rodar a suíte de testes completa sobre o resultado mesclado
   - Se os testes falharem, identificar qual merge introduziu a falha
   - Corrigir ou reverter conforme necessário

5.4. Limpeza:

```bash
# Remove todos os worktrees desta tarefa
git worktree remove ../project-wt-api-agent
git worktree remove ../project-wt-test-agent
git worktree remove ../project-wt-docs-agent

# Deleta as branches mescladas
git branch -d feature/auth-system/api-agent
git branch -d feature/auth-system/test-agent
git branch -d feature/auth-system/docs-agent

# Remove quaisquer referências remanescentes
git worktree prune
```

---

## Formato de Saída

```yaml
worktree_strategy_result:
  isolation_needed: true
  reason: "2 agentes modificam arquivos sobrepostos em src/"
  worktrees:
    - agent: "api-agent"
      path: "../project-wt-api-agent"
      branch: "feature/auth-system/api-agent"
      status: "created"
    - agent: "test-agent"
      path: "../project-wt-test-agent"
      branch: "feature/auth-system/test-agent"
      status: "created"
  merge_order: ["api-agent", "test-agent"]
  auto_cleanup: true
  lifecycle_documented: true
```

---

## Condições de Veto

| Condition | Action |
|-----------|--------|
| O repositório Git não tem commits | PARAR -- inicialize o repositório primeiro |
| Alterações não commitadas na working tree | PARAR -- commite ou faça stash antes de criar os worktrees |
| Espaço em disco insuficiente para N worktrees | PARAR -- estime ~o tamanho do repositório por worktree |
| Versão do Git < 2.5 | PARAR -- atualize o git para suporte a worktree |
| Nenhum conflito de arquivo detectado entre os agentes | PULAR -- use repositório compartilhado em vez disso (mais simples) |
| A criação do worktree falha | PARAR -- verifique os arquivos de lock do git e os worktrees existentes |
