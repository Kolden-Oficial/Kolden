---
name: criacao-de-subagent
description: Cria especialistas (arquivos .md em .claude/agents/) para agentes do Kolden. Use quando o PRD identificar tarefas que merecem contexto isolado, ferramentas restritas ou execução paralela — como revisão, pesquisa pesada ou processamento de grandes volumes. Especialistas são as vozes internas especializadas do agente (faculdade Mente em O Ser).
---

# Criação de especialista

## O que é um especialista
Um especialista é uma instância separada com **janela de contexto própria**,
identidade própria e ferramentas restritas. O agente principal delega a tarefa e recebe
de volta apenas o resultado — o "barulho" do trabalho fica isolado.
Conceito-chave: o conteúdo do arquivo .md É a identidade completa do especialista.

## Quando criar um especialista (e quando não)
Crie quando:
- A tarefa consome muito contexto (ler dezenas de arquivos, varrer dados).
- A tarefa exige persona/critério diferente (revisor cético vs. criador).
- A tarefa precisa de permissões restritas (só leitura, sem bash).

NÃO crie quando:
- A tarefa é rápida e pontual → instrução no CLAUDE.md do agente resolve.
- O conhecimento é o diferencial, não o isolamento → use uma habilidade.

## Anatomia do arquivo

`C:\Kolden\<NomeMitológico>\.claude\agents\<nome-do-especialista>.md`:

```yaml
---
name: nome-do-especialista
description: Quando o agente principal deve delegar para este especialista. Seja específico — é contra isto que a delegação automática decide.
tools: Read, Grep, Glob
---
```

Abaixo do frontmatter vem a identidade completa do especialista, com os
cinco blocos obrigatórios do Kolden: persona, objetivo, restrições,
formato de saída e exemplo.

## Campo tools
Liste APENAS o necessário. Um revisor não precisa de Write. Um
pesquisador não precisa de Bash. Menos ferramentas = menos risco e
delegação mais previsível. Se omitir o campo, o especialista herda todas as
ferramentas — evite isso.

## Regra de retorno
Todo especialista do Kolden termina seu arquivo definindo o formato
exato da resposta de volta ao agente principal. Especialista que devolve texto solto
polui o contexto principal e quebra o propósito do isolamento.

## Após criar o especialista
Mencione o novo especialista no CLAUDE.md do agente, indicando quando acioná-lo.
