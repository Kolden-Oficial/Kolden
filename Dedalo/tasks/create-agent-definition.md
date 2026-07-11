---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Criar Definição de Subagente Personalizado

**Task ID:** create-agent-definition
**Versão:** 1.0
**Propósito:** Criar um arquivo de definição de subagente sob medida para uso com a ferramenta Agent
**Orquestrador:** @swarm-orchestrator (Nexus)
**Modo:** Interativo (elicit: true)
**Padrão de Qualidade:** O arquivo do agente passa no lint, carrega corretamente e executa o prompt de teste

---

## Visão Geral

Esta tarefa cria uma definição de subagente personalizado em `.claude/agents/` que pode ser invocada por meio da ferramenta Agent. Subagents são instâncias especializadas do Claude com instruções delimitadas, seleção de modelo e restrições de ferramentas opcionais.

```
ENTRADA (agent_purpose + escopo + complexidade)
    |
[FASE 1: DEFINIÇÃO DO PROPÓSITO]
    -> Define o que o agente faz e o que não faz
    -> Identifica ferramentas e conhecimento necessários
    -> Determina necessidades de isolamento
    |
[FASE 2: SELEÇÃO DE TIPO]
    -> Escolhe o tipo de subagente (general, explore, plan)
    -> Seleciona o modelo (opus, sonnet, haiku)
    -> Define restrições de ferramentas
    |
[FASE 3: CRIAÇÃO DO ARQUIVO]
    -> Cria .claude/agents/{name}.md
    -> Escreve o frontmatter YAML
    -> Escreve o corpo de instruções em markdown
    |
[FASE 4: ENGENHARIA DE INSTRUÇÕES]
    -> Escreve instruções comportamentais claras
    -> Define expectativas de formato de saída
    -> Adiciona guardrails e restrições
    |
[FASE 5: SELEÇÃO DE MODELO]
    -> Casa a complexidade com o tier do modelo
    -> Configura o trade-off custo/qualidade
    -> Define max_turns se necessário
    |
[FASE 6: VALIDAÇÃO]
    -> Testa o agente com a ferramenta Agent
    -> Verifica se o acesso às ferramentas funciona como esperado
    -> Checa a qualidade da saída
    |
SAÍDA: Arquivo de definição do agente + resultados de teste
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| agent_name | string | Usuário | sim | Kebab-case, sem espaços (ex.: code-reviewer) |
| agent_purpose | string | Usuário | sim | Descrição em uma frase do que o agente faz |
| complexity | enum | Usuário ou auto | sim | simple / standard / complex |
| tools_needed | array | Usuário | não | Lista de ferramentas a que o agente precisa de acesso |
| output_format | string | Usuário | não | Estrutura de saída esperada (markdown, json, yaml) |

---

## Pré-condições

1. O diretório `.claude/agents/` existe (criar se não existir)
2. Entendimento da tarefa que o agente irá executar
3. O Claude Code está operacional para testes

---

## Fase 1: Definição do Propósito

**Objetivo:** Delimitar claramente o que o agente fará e o que não fará.

### Passos

1.1. Definir a responsabilidade principal do agente em uma frase.
1.2. Listar 3-5 tarefas específicas que o agente deve lidar.
1.3. Listar 2-3 coisas que o agente NÃO deve fazer (anti-escopo).
1.4. Identificar de que contexto o agente precisa (arquivos, conhecimento do projeto, etc.).

### Template de Propósito

```
Agente: {name}
Faz: {responsabilidade principal}
Tarefas: {task1}, {task2}, {task3}
NÃO faz: {anti1}, {anti2}
Precisa de: {context1}, {context2}
```

---

## Fase 2: Seleção de Tipo

**Objetivo:** Escolher a configuração de subagente correta.

### Tipos de Subagente

| Tipo | Ferramentas Disponíveis | Melhor Para |
|------|----------------|----------|
| **General-purpose** (padrão) | Todas as ferramentas | Implementação, análise, tarefas complexas |
| **Explore** | Read, Glob, Grep, Bash(somente leitura) | Pesquisa, busca de código, consulta de documentação |
| **Plan** | Read, Glob, Grep (sem escrita) | Design, arquitetura, tarefas de planejamento |

### Passos

2.1. Casar o propósito do agente com um tipo.
2.2. Se nenhum se encaixar, usar general-purpose com restrições explícitas de `allowed-tools`.
2.3. Documentar a decisão de tipo e a justificativa.

---

## Fase 3: Criação do Arquivo

**Objetivo:** Criar o arquivo de definição do agente com a estrutura adequada.

### Template do Arquivo do Agente

```markdown
---
name: {agent-name}
description: {descrição em uma linha}
model: {opus-4|sonnet-4|haiku-4}
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# {Agent Name}

## Papel
{Descrição detalhada do papel e da expertise do agente}

## Instruções
{Instruções comportamentais passo a passo}

## Restrições
{O que o agente NÃO deve fazer}

## Formato de Saída
{Estrutura de saída esperada}
```

### Passos

3.1. Criar `.claude/agents/{name}.md` usando o template acima.
3.2. Preencher o frontmatter YAML com name, description, model e allowed-tools.
3.3. Os campos do frontmatter são:
   - `name`: Nome de exibição do agente
   - `description`: Descrição breve mostrada nas listagens de agentes
   - `model`: Qual modelo Claude usar (ver Fase 5)
   - `allowed-tools`: Array de ferramentas que o agente pode acessar (omitir para todas as ferramentas)

---

## Fase 4: Engenharia de Instruções

**Objetivo:** Escrever instruções claras e eficazes no corpo do markdown.

### Boas Práticas de Instrução

1. **Seja específico** -- "Analise imports e sugira barrel files" e não "Ajude com código"
2. **Defina expectativas de saída** -- Descreva o formato exato que você deseja
3. **Adicione exemplos** -- Mostre pares de entrada/saída quando possível
4. **Defina limites** -- O que o agente deve recusar ou escalar
5. **Inclua carregamento de contexto** -- Diga ao agente quais arquivos ler primeiro

### Seções de Instrução

```markdown
## Papel
Você é um {papel} especializado em {domínio}. Seu trabalho é {tarefa principal}.

## Processo
1. Primeiro, leia {arquivos relevantes}
2. Depois, analise {o que procurar}
3. Por fim, produza {formato de saída}

## Regras
- SEMPRE {comportamento obrigatório}
- NUNCA {comportamento proibido}
- Em caso de dúvida, {comportamento de fallback}

## Formato de Saída
Retorne sua análise como:
{especificação de formato}
```

4.1. Escrever a seção Papel com identidade clara.
4.2. Escrever a seção Processo com passos numerados.
4.3. Escrever a seção Regras com restrições SEMPRE/NUNCA.
4.4. Escrever a seção Formato de Saída com a especificação de estrutura.

---

## Fase 5: Seleção de Modelo

**Objetivo:** Escolher o modelo certo para equilibrar custo e qualidade.

### Guia de Seleção de Modelo

| Modelo | Custo | Velocidade | Melhor Para |
|-------|------|-------|----------|
| **claude-opus-4** | Alto | Lento | Análise complexa, decisões de arquitetura, escrita com nuances |
| **claude-sonnet-4** | Médio | Médio | Tarefas padrão, code review, implementação |
| **claude-haiku-4** | Baixo | Rápido | Consultas simples, formatação, tarefas repetitivas |

### Matriz de Decisão

```
A tarefa é complexa com entradas ambíguas?
  SIM -> opus
  NÃO  -> Requer geração ou análise de código?
    SIM -> sonnet
    NÃO  -> É uma consulta simples ou tarefa de formatação?
      SIM -> haiku
      NÃO  -> sonnet (padrão seguro)
```

5.1. Avaliar a complexidade da tarefa em relação à matriz.
5.2. Definir o campo `model` no frontmatter.
5.3. Considerar que subagents incorrem em custos por chamada -- haiku para agentes de alta frequência.

---

## Fase 6: Validação

**Objetivo:** Testar se o agente funciona corretamente.

### Passos

6.1. Invocar o agente usando a ferramenta Agent com um prompt representativo.
6.2. Verificar se o agente:
   - Usa apenas suas ferramentas permitidas
   - Segue suas instruções
   - Produz saída no formato esperado
   - Mantém-se dentro do escopo definido
6.3. Se o agente falhar, iterar sobre as instruções (correção mais comum).
6.4. Rodar 2-3 prompts de teste diferentes para cobrir casos extremos.

---

## Formato de Saída

```yaml
agent_definition_result:
  file: ".claude/agents/{name}.md"
  name: "{agent-name}"
  type: "{general|explore|plan}"
  model: "{opus-4|sonnet-4|haiku-4}"
  tools_allowed: [...]
  test_results:
    - prompt: "Prompt de teste 1"
      status: "pass"
    - prompt: "Prompt de teste 2"
      status: "pass"
  ready: true
```

---

## Condições de Veto

| Condição | Ação |
|-----------|--------|
| O propósito do agente é amplo demais (cobre 5+ domínios não relacionados) | INTERROMPER -- dividir em múltiplos agentes |
| Nenhum formato de saída claro definido | INTERROMPER -- definir a saída esperada antes da criação |
| O agente requer ferramentas que não existem | INTERROMPER -- verificar a disponibilidade das ferramentas primeiro |
| Todos os prompts de teste falham | INTERROMPER -- reescrever as instruções, não entregar agente quebrado |
| O nome do agente conflita com um agente existente | INTERROMPER -- escolher um nome único |
