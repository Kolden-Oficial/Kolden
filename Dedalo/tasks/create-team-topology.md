---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Projetar a Configuração de um Agent Team

**Task ID:** create-team-topology
**Version:** 1.0
**Purpose:** Projetar e configurar um time multi-agente com topologia, papéis e padrões de comunicação definidos
**Orchestrator:** @swarm-orchestrator (Nexus)
**Mode:** Interativo (elicit: true)
**Quality Standard:** Topologia do time testada com dry-run, todos os agentes carregam com sucesso

---

## Visão Geral

Esta tarefa projeta a configuração de um Agent Team em que múltiplos subagents colaboram em uma carga de trabalho. Ela cobre a seleção de topologia, a definição de papéis, os padrões de comunicação e as estratégias de isolamento.

```
INPUT (workload_description + team_size + isolation_needs)
    |
[FASE 1: DECOMPOSIÇÃO DA CARGA DE TRABALHO]
    -> Analisar a carga de trabalho em busca de unidades paralelizáveis
    -> Identificar requisitos de estado compartilhado
    -> Determinar necessidades de coordenação
    |
[FASE 2: DEFINIÇÃO DE PAPÉIS]
    -> Definir a responsabilidade de cada agente
    -> Atribuir modelos por papel
    -> Definir permissões de ferramentas por agente
    |
[FASE 3: CRIAÇÃO DOS ARQUIVOS DE AGENTE]
    -> Criar .claude/agents/{name}.md para cada membro
    -> Configurar o frontmatter (name, model, tools)
    -> Escrever instruções específicas do papel
    |
[FASE 4: DESIGN DA TOPOLOGIA]
    -> Selecionar o padrão de topologia
    -> Definir o fluxo de comunicação
    -> Definir max_turns por agente
    |
[FASE 5: PADRÕES DE COMUNICAÇÃO]
    -> Definir o protocolo de handoff entre agentes
    -> Configurar o contexto compartilhado (arquivos, diretórios)
    -> Configurar os critérios de conclusão
    |
[FASE 6: CRITÉRIOS DE CONCLUSÃO]
    -> Definir o que "concluído" significa para cada agente
    -> Definir o que "concluído" significa para o time
    -> Planejar a agregação das saídas
    |
OUTPUT: Arquivos do agent team + diagrama de topologia + especificação de comunicação
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| workload_description | string | Usuário | sim | Descrição clara da tarefa completa |
| team_size | number | Usuário ou automático | não | Número sugerido de agentes (padrão: auto-detecção) |
| isolation_mode | enum | Usuário | não | shared (padrão) / worktree / none |
| topology_preference | enum | Usuário | não | hub-spoke / pipeline / peer / auto |
| max_budget | string | Usuário | não | Restrição de custo (ex.: "manter barato") |

---

## Pré-condições

1. O diretório `.claude/agents/` existe
2. A carga de trabalho está claramente definida e delimitada
3. Pelo menos 2 subtarefas distintas identificadas na carga de trabalho

---

## Fase 1: Decomposição da Carga de Trabalho

**Objetivo:** Quebrar a carga de trabalho em unidades do tamanho de um agente.

### Passos

1.1. Analisar a descrição da carga de trabalho em busca de preocupações distintas e separáveis.
1.2. Identificar quais subtarefas podem rodar em paralelo versus sequencialmente.
1.3. Mapear recursos compartilhados (arquivos, bancos de dados, APIs) entre as subtarefas.
1.4. Determinar o tamanho mínimo do time com base nas preocupações distintas.

### Checklist de Decomposição

- [ ] Cada subtarefa tem uma única responsabilidade clara
- [ ] As dependências entre subtarefas estão identificadas
- [ ] Os conflitos de estado compartilhado estão documentados
- [ ] As oportunidades de paralelização estão marcadas

---

## Fase 2: Definição de Papéis

**Objetivo:** Atribuir papéis claros a cada agente.

### Passos

2.1. Para cada subtarefa, defina um papel de agente:

```yaml
roles:
  - name: "{role-name}"
    responsibility: "{o que este agente faz}"
    inputs: "{o que ele recebe}"
    outputs: "{o que ele produz}"
    model: "{opus|sonnet|haiku}"
    tools: ["{tool1}", "{tool2}"]
```

2.2. Atribua modelos com base na complexidade da tarefa:
   - Coordenador/orquestrador: sonnet (precisa de julgamento, não de análise profunda)
   - Análise complexa: opus (arquitetura, revisão de segurança)
   - Geração de código: sonnet (implementação padrão)
   - Tarefas simples: haiku (formatação, extração de dados)

2.3. Verifique que não há dois agentes com responsabilidades sobrepostas.

---

## Fase 3: Criação dos Arquivos de Agente

**Objetivo:** Criar os arquivos de definição dos agentes.

### Passos

3.1. Para cada papel da Fase 2, crie `.claude/agents/{role-name}.md`.
3.2. Use o formato da tarefa create-agent-definition para cada arquivo.
3.3. Inclua instruções específicas do time em cada agente:
   - Quais outros agentes existem no time
   - Onde escrever as saídas (diretório compartilhado)
   - Como sinalizar a conclusão

---

## Fase 4: Design da Topologia

**Objetivo:** Selecionar a topologia certa para a interação entre agentes.

### Comparação de Topologias

| Topologia | Estrutura | Melhor Para | Custo de Coordenação |
|----------|-----------|----------|-------------------|
| **Hub-and-Spoke** | Um coordenador despacha para especialistas | Tarefas mistas, complexidade variada | Médio |
| **Pipeline** | A saída do Agente A alimenta a entrada do Agente B | Processamento sequencial, transformação de dados | Baixo |
| **Peer** | Todos os agentes trabalham independentemente, fundem ao final | Tarefas embaraçosamente paralelas | Baixo |
| **Hierárquica** | Coordenadores multinível com sub-times | Projetos grandes e complexos | Alto |

### Decisão de Seleção

```
As subtarefas são independentes e sem estado compartilhado?
  SIM -> Topologia Peer
  NÃO -> As subtarefas formam uma cadeia sequencial?
    SIM -> Topologia Pipeline
    NÃO -> Há um "cérebro" coordenando os especialistas?
      SIM -> Topologia Hub-and-Spoke
      NÃO -> Topologia Hierárquica
```

4.1. Selecione a topologia com base na análise de decomposição.
4.2. Documente a topologia com um diagrama ASCII.
4.3. Defina a orientação de `max_turns` por agente:
   - Tarefas simples: 5-10 turnos
   - Tarefas padrão: 15-25 turnos
   - Tarefas complexas: 30-50 turnos

---

## Fase 5: Padrões de Comunicação

**Objetivo:** Definir como os agentes compartilham informações.

### Estratégias de Comunicação

| Estratégia | Mecanismo | Nível de Isolamento |
|----------|-----------|----------------|
| **Baseada em arquivos** | Agentes escrevem em um diretório compartilhado | Baixo (mesmo repo) |
| **Worktree** | Cada agente tem seu próprio git worktree | Alto (working trees separadas) |
| **Branch** | Agentes trabalham em branches separadas | Médio (mesmo repo, branches diferentes) |

### Passos

5.1. Defina um diretório de saída compartilhado (ex.: `.claude/team-output/{task-id}/`).
5.2. Defina o formato de handoff (como um agente sinaliza a conclusão):
   - Escrever um arquivo `{agent-name}-done.md` com resumo e saídas
   - Ou escrever em um arquivo compartilhado `progress.yaml`
5.3. Defina a resolução de conflitos caso os agentes possam modificar os mesmos arquivos:
   - Use isolamento por worktree para cenários de alto risco
   - Use propriedade em nível de arquivo para risco médio
   - Use fusão ao final para baixo risco

---

## Fase 6: Critérios de Conclusão

**Objetivo:** Definir o que "concluído" significa.

### Passos

6.1. Para cada agente, defina a conclusão como:
   - Arquivos de saída escritos
   - Verificação de qualidade aprovada (lint, teste, etc.)
   - Sinal de conclusão enviado

6.2. Para o time, defina a conclusão como:
   - Todos os agentes reportam concluído
   - Saídas agregadas
   - Teste de integração aprovado (se aplicável)

6.3. Defina o tratamento de falhas:
   - Agente falha -> repetir uma vez, depois escalar para o coordenador
   - Coordenador falha -> escalar para o humano
   - Timeout -> encerrar o agente, reportar resultados parciais

---

## Formato de Saída

```yaml
team_topology_result:
  topology: "{hub-spoke|pipeline|peer|hierarchical}"
  agents:
    - name: "{agent-1}"
      file: ".claude/agents/{agent-1}.md"
      model: "sonnet-4"
      role: "{responsabilidade}"
    - name: "{agent-2}"
      file: ".claude/agents/{agent-2}.md"
      model: "haiku-4"
      role: "{responsabilidade}"
  communication:
    strategy: "{file-based|worktree|branch}"
    shared_dir: ".claude/team-output/{task-id}/"
    handoff_format: "completion-file"
  completion:
    all_agents_done: true
    outputs_aggregated: true
  diagram: |
    [Coordenador]
        |
    +---+---+
    |       |
    [A1]   [A2]
```

---

## Condições de Veto

| Condição | Ação |
|-----------|--------|
| A carga de trabalho não pode ser decomposta em 2+ subtarefas distintas | PARAR -- um único agente é suficiente |
| O tamanho do time excede 6 agentes | PARAR -- decomponha em sub-times primeiro |
| Todos os agentes precisam de acesso de escrita aos mesmos arquivos | PARAR -- redesenhe com propriedade de arquivo ou isolamento por worktree |
| Nenhum critério de conclusão claro definido | PARAR -- defina "concluído" antes de criar o time |
| Os custos de modelo excedem a restrição de orçamento declarada | PARAR -- rebaixe os modelos ou reduza o tamanho do time |
