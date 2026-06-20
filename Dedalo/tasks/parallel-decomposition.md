# Tarefa: Decomposição de Tarefas em Paralelo para Execução por Agentes

**Task ID:** parallel-decomposition
**Version:** 1.0
**Purpose:** Decompor uma tarefa complexa em subtarefas para execução paralela multi-agente
**Orchestrator:** @swarm-orchestrator (Nexus)
**Mode:** Interativo (elicit: true)
**Quality Standard:** Grafo de dependências validado, sem dependências circulares, estratégia de merge testada

---

## Visão Geral

Esta tarefa analisa uma carga de trabalho, identifica subtarefas independentes, projeta um plano de execução paralela e configura agentes para execução simultânea. A percepção central: **o paralelismo máximo vem de minimizar dependências, não de maximizar agentes**.

```
ENTRADA (task_description + constraints)
    |
[FASE 1: ANÁLISE DA TAREFA]
    -> Quebrar a tarefa em subtarefas atômicas
    -> Classificar a complexidade de cada subtarefa
    -> Estimar o tempo de execução por subtarefa
    |
[FASE 2: MAPEAMENTO DE DEPENDÊNCIAS]
    -> Identificar dependências de dados entre subtarefas
    -> Identificar conflitos de recursos (mesmos arquivos, mesmas APIs)
    -> Construir o grafo de dependências
    |
[FASE 3: PLANO DE EXECUÇÃO]
    -> Agrupar subtarefas independentes em ondas
    -> Atribuir agentes a cada onda
    -> Configurar execução em foreground vs background
    |
[FASE 4: CONFIGURAÇÃO DOS AGENTES]
    -> Criar ou selecionar definições de agentes
    -> Definir os tiers de modelo conforme a complexidade da subtarefa
    -> Configurar permissões de ferramentas
    |
[FASE 5: ESTRATÉGIA DE MERGE]
    -> Definir como as saídas dos agentes se combinam
    -> Lidar com mudanças conflitantes
    -> Planejar a verificação de integração
    |
[FASE 6: MONITORAMENTO]
    -> Configurar o rastreamento de progresso
    -> Definir limites de timeout
    -> Planejar a recuperação de falhas
    |
SAÍDA: Plano de execução + grafo de dependências + configs dos agentes + estratégia de merge
```

---

## Entradas

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| task_description | string | Usuário | yes | Descrição completa do trabalho a ser paralelizado |
| max_parallel_agents | number | Usuário ou padrão | no | Máximo de agentes simultâneos (padrão: 4) |
| isolation_mode | enum | Usuário | no | shared / worktree / branch (padrão: shared) |
| time_constraint | string | Usuário | no | Tempo-alvo de conclusão |
| cost_constraint | enum | Usuário | no | low / medium / high (afeta a seleção de modelo) |

---

## Pré-condições

1. A tarefa é grande o suficiente para se beneficiar da paralelização (2+ subtarefas independentes)
2. O Claude Code está operacional com a Agent tool disponível
3. Limites de rate da API suficientes para chamadas paralelas de agentes
4. O repositório Git está limpo (sem mudanças não commitadas) se estiver usando isolamento por worktree

---

## Fase 1: Análise da Tarefa

**Objetivo:** Quebrar a tarefa nas menores unidades independentes de trabalho.

### Passos

1.1. Leia a descrição completa da tarefa.
1.2. Identifique subtarefas atômicas -- cada uma deve ser:
   - Concluível por um único agente
   - Testável de forma independente
   - Produtora de um artefato de saída claro
1.3. Classifique cada subtarefa:

| Complexity | Lines of Change | Model | Estimated Time |
|------------|----------------|-------|----------------|
| Trivial | < 20 linhas | haiku | 1-2 min |
| Simple | 20-100 linhas | sonnet | 3-5 min |
| Standard | 100-500 linhas | sonnet | 5-15 min |
| Complex | 500+ linhas | opus | 15-30 min |

1.4. Crie uma tabela de inventário de subtarefas:

```markdown
| ID | Subtask | Complexity | Est. Time | Dependencies |
|----|---------|-----------|-----------|--------------|
| S1 | ...     | simple    | 3 min     | none         |
| S2 | ...     | standard  | 10 min    | S1           |
```

---

## Fase 2: Mapeamento de Dependências

**Objetivo:** Construir um grafo de dependências para identificar oportunidades de paralelização.

### Tipos de Dependência

| Type | Description | Impact |
|------|-------------|--------|
| **Data** | S2 precisa da saída de S1 | Deve ser sequenciado |
| **Resource** | S1 e S3 modificam o mesmo arquivo | Deve ser sequenciado ou isolado |
| **Semantic** | S2 deveria saber o que S1 decidiu | Pode usar um arquivo de contexto compartilhado |
| **None** | S1 e S4 são totalmente independentes | Pode ser paralelizado |

### Passos

2.1. Para cada par de subtarefas, determine o tipo de dependência.
2.2. Construa um grafo de dependências:

```
Modelo de Grafo de Dependências:

S1 -----> S3 -----> S5
  \                 ^
   \               /
S2 -----> S4 -----

Legenda: Seta = "deve concluir antes de"
Paralelo: {S1, S2} podem rodar juntas
Sequencial: S3 espera por S1, S4 espera por S2
Junção: S5 espera por S3 e S4
```

2.3. Detecte dependências circulares (VETO se encontradas).
2.4. Calcule o caminho crítico (a maior cadeia sequencial).

---

## Fase 3: Plano de Execução

**Objetivo:** Agrupar subtarefas em ondas de execução paralela.

### Padrões de Paralelização

| Pattern | Description | Use When |
|---------|-------------|----------|
| **Fan-Out/Fan-In** | Despachar N agentes, coletar todos os resultados | Subtarefas independentes com merge compartilhado |
| **Pipeline** | Encadear agentes A -> B -> C | Transformação sequencial |
| **Scatter-Gather** | Despachar a mesma tarefa para N agentes, escolher a melhor | Necessidade de abordagens diversas para o mesmo problema |
| **Wave** | Grupos de tarefas paralelas com pontos de sincronização | Dependências mistas |

### Planejamento de Ondas

3.1. Atribua subtarefas a ondas com base no grafo de dependências:

```
Onda 1: [S1, S2]     -- sem dependências, rodam em paralelo
Onda 2: [S3, S4]     -- dependem da Onda 1, rodam em paralelo
Onda 3: [S5]         -- depende da Onda 2
```

3.2. Para cada onda, determine o modo de execução:

| Mode | Mechanism | When to Use |
|------|-----------|-------------|
| **Background** | Agent tool com flag de background | Subtarefas fire-and-forget |
| **Foreground** | Chamadas sequenciais da Agent tool | Necessidade do resultado antes do próximo passo |
| **Parallel foreground** | Múltiplas chamadas Agent na mesma mensagem | Subtarefas independentes, necessidade de todos os resultados |

3.3. Documente a linha do tempo de execução:

```
Tempo ->
  [==S1==]  [====S3====]  [==S5==]
  [===S2===]  [==S4==]
```

---

## Fase 4: Configuração dos Agentes

**Objetivo:** Criar ou atribuir agentes para cada subtarefa.

### Passos

4.1. Para cada subtarefa, decida:
   - Usar uma definição de agente existente? (busque em `.claude/agents/`)
   - Criar um novo agente? (use a tarefa create-agent-definition)
   - Usar a Agent tool genérica com prompt inline?

4.2. Configure o modelo por subtarefa com base na complexidade da Fase 1.
4.3. Defina as permissões de ferramentas -- restrinja ao mínimo necessário:
   - Subtarefas somente-leitura: agente do tipo Explore
   - Modificação de código: General-purpose com Write/Edit
   - Pesquisa: agente do tipo Explore com Bash para ferramentas web

4.4. Defina `max_turns` por agente com base na complexidade:
   - Trivial: 5 turnos
   - Simple: 10 turnos
   - Standard: 20 turnos
   - Complex: 40 turnos

---

## Fase 5: Estratégia de Merge

**Objetivo:** Definir como as saídas paralelas dos agentes se combinam em um resultado final.

### Estratégias de Merge

| Strategy | Description | Conflict Risk |
|----------|-------------|--------------|
| **File ownership** | Cada agente é dono de arquivos específicos | Nenhum |
| **Directory ownership** | Cada agente é dono de um diretório | Nenhum |
| **Git merge** | Cada agente em uma branch, merge ao final | Médio |
| **Manual review** | Um humano revisa e faz o merge | Baixo (mas lento) |
| **Automated merge** | Um script faz o merge das saídas por convenção | Baixo |

### Passos

5.1. Atribua a propriedade de arquivo/diretório a cada agente.
5.2. Defina o processo de merge:
   - Coletar as saídas de todos os agentes
   - Verificar a ausência de conflitos (mesmo arquivo modificado por 2+ agentes)
   - Se houver conflitos, aplicar a estratégia de resolução
   - Rodar testes de integração no resultado mesclado
5.3. Se estiver usando isolamento por worktree, planeje a sequência de merge das branches.

---

## Fase 6: Monitoramento

**Objetivo:** Rastrear o progresso e lidar com falhas.

### Passos

6.1. Defina checkpoints de progresso:
   - Cada agente escreve seu status em um arquivo de progresso compartilhado
   - A conclusão de uma onda dispara a próxima onda
6.2. Defina limites de timeout por subtarefa (2x o tempo estimado).
6.3. Defina o tratamento de falhas:
   - Timeout do agente: encerrar e reportar resultados parciais
   - Erro do agente: tentar novamente uma vez com a mesma config
   - Falha repetida: escalar para um humano
6.4. Planeje o rollback se o merge falhar:
   - Reverter para o estado pré-execução
   - Reportar quais subtarefas tiveram sucesso vs falharam

---

## Formato de Saída

```yaml
parallel_decomposition_result:
  total_subtasks: 5
  total_waves: 3
  estimated_sequential_time: "35 min"
  estimated_parallel_time: "15 min"
  speedup: "2.3x"
  critical_path: ["S1", "S3", "S5"]
  waves:
    - wave: 1
      subtasks: ["S1", "S2"]
      mode: "parallel-foreground"
    - wave: 2
      subtasks: ["S3", "S4"]
      mode: "parallel-foreground"
    - wave: 3
      subtasks: ["S5"]
      mode: "foreground"
  merge_strategy: "file-ownership"
  agents_created: [...]
  dependency_graph: |
    S1 -> S3 -> S5
    S2 -> S4 -> S5
```

---

## Condições de Veto

| Condition | Action |
|-----------|--------|
| Dependência circular detectada no grafo | PARAR -- reestruturar as subtarefas para quebrar o ciclo |
| Todas as subtarefas são sequencialmente dependentes | PARAR -- sem benefício de paralelização, usar um único agente |
| Contagem de subtarefas excede 10 | PARAR -- agrupar primeiro em unidades de nível mais alto |
| Múltiplos agentes precisam escrever no mesmo arquivo | PARAR -- redesenhar com file ownership ou worktree |
| Tempo do caminho crítico excede a restrição de tempo | AVISAR -- considerar decompor ainda mais as subtarefas do caminho crítico |
| Custo estimado excede o orçamento | PARAR -- rebaixar modelos ou reduzir o paralelismo |
