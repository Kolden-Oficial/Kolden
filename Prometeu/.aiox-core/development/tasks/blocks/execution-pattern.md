# Bloco: Padrão de Execução

> **Block ID:** `execution-pattern`
> **Version:** 1.0.0
> **Type:** Reusable Include Block

## Propósito

Definir como funciona a espera por agentes com a ferramenta Task. Fornece padrões para execução sequencial e paralela, além de anti-padrões a evitar.

## Entrada

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|----------|---------|-------------|
| `execution_type` | string | Não | `sequential` | Um de: `sequential`, `parallel`, `mixed` |
| `parallel_count` | number | Não | `3` | Número de agentes paralelos (apenas para parallel/mixed) |

## Saída

| Campo | Tipo | Descrição |
|-------|------|-------------|
| `understanding` | string | Como funciona o mecanismo de bloqueio |
| `pattern` | string | Padrão de código para o tipo de execução |
| `anti_patterns` | string[] | O que evitar |

## Conteúdo Central

### Como Funciona a Espera por Agentes

A ferramenta `Task` possui **comportamento de bloqueio nativo** — ela aguarda automaticamente o agente concluir antes de retornar. Você NÃO precisa de nenhum mecanismo manual de espera.

### Execução Sequencial

```
# Ferramenta Task SEM run_in_background = BLOQUEIA até o agente concluir
Task(prompt: "...", subagent_type: "general-purpose", ...)
# ↑ Esta linha NÃO retorna até o agente terminar
# ↓ Quando a execução chega aqui, o agente está CONCLUÍDO
TaskUpdate(taskId: "X", status: "completed")
```

### Execução Paralela

```
# Instancie TODOS os N agentes em uma ÚNICA mensagem com run_in_background: true
Task(prompt: "agent 1...", run_in_background: true)  → retorna task_id_1
Task(prompt: "agent 2...", run_in_background: true)  → retorna task_id_2
Task(prompt: "agent N...", run_in_background: true)  → retorna task_id_N

# Depois aguarde cada um usando TaskOutput (bloqueia até o agente concluir)
TaskOutput(task_id: "id_1", block: true)
TaskOutput(task_id: "id_2", block: true)
TaskOutput(task_id: "id_N", block: true)
```

### Execução Mista

Combine fases sequenciais com fases paralelas:
1. Sequencial: Use chamadas Task bloqueantes
2. Paralela: Instancie com `run_in_background: true`, colete com `TaskOutput`
3. Sequencial: Retome após todos os agentes paralelos concluírem

## Anti-Padrões (NUNCA FAÇA ISTO)

```
# ❌ ERRADO: Loops de sleep
Bash("sleep 30")
Bash("sleep 60")

# ❌ ERRADO: Loops de polling
while not done:
    Bash("sleep 10")
    check_if_file_exists()

# ❌ ERRADO: Verificação periódica de arquivo
Read("output_file")  # torcendo para que tenha aparecido
Bash("sleep 30")
Read("output_file")  # verificando de novo

# ❌ ERRADO: Perguntar o status ao colega via polling com SendMessage
SendMessage("ei, você já terminou?")
```

**A ferramenta Task trata TODA a espera automaticamente. Confie no mecanismo de bloqueio.**

## Uso

### Incluir em Arquivo de Skill

```markdown
<!-- Include: blocks/execution-pattern.md -->
<!-- Parameters: execution_type=mixed, parallel_count=4 -->
```

### Referência Direta

```markdown
## Padrão de Execução (CRÍTICO)

Veja: `.aiox-core/development/tasks/blocks/execution-pattern.md`

Esta skill usa execução **{execution_type}** com {parallel_count} agentes paralelos.
```

## Arquivos Acessados

Nenhum — este é um bloco de referência/documentação.

## Tratamento de Erros

| Erro | Comportamento |
|-------|----------|
| `execution_type` inválido | Usa `sequential` como padrão |
| parallel_count < 1 | Usa `3` como padrão |

## Notas

- O bloco fornece entendimento, não código executável
- A seção de anti-padrões previne erros comuns
- Encontrado em mais de 8 skills com 98% de similaridade
- Total de linhas economizadas: ~35 linhas × 8 skills = 280 linhas
