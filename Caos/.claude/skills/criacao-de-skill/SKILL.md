---
name: criacao-de-skill
description: Cria habilidades (SKILL.md) para os agentes nascidos no Kolden, seguindo o padrão de frontmatter, descrição que dispara invocação automática e corpo enxuto. Use durante a fase de construção de um agente, para cada conhecimento modular identificado no PRD. Habilidades ficam em .claude/skills/ do agente.
---

# Criação de habilidade

## O que é uma habilidade
Conhecimento modular carregado **sob demanda**: o agente só lê o arquivo
quando a descrição da habilidade combina com a tarefa atual. Isso mantém o
contexto principal limpo. Regra mental: se uma instrução é necessária em
TODA interação, ela vai no CLAUDE.md; se é necessária só às vezes, vira habilidade.

## Anatomia obrigatória

```
C:\Kolden\<NomeMitológico>\.claude\skills\<nome-da-habilidade>\
├── SKILL.md        ← obrigatório
├── scripts/        ← opcional: scripts de referência que a habilidade chama
├── modelos/        ← opcional: templates que a habilidade copia
└── contexto.md     ← opcional: conhecimento extenso, lido só se preciso
```

## Frontmatter do SKILL.md

```yaml
---
name: nome-em-kebab-case
description: Frase que descreve QUANDO usar e O QUE a habilidade cobre. É contra esta frase que o modelo decide invocar — seja específico, inclua gatilhos ("use quando o usuário pedir X", "cobre A, B e C").
---
```

## Boas práticas para o corpo
- Comece com o objetivo em 1-2 linhas.
- Use passos numerados para processos; listas para regras.
- Inclua um exemplo concreto de entrada → saída.
- Máximo ~150 linhas. Conhecimento maior vai para `contexto.md` com uma
  instrução do tipo "para detalhes de X, leia contexto.md".
- Escreva a descrição pensando no MATCH: palavras que o usuário usaria
  ao pedir a tarefa devem aparecer nela.

## Após criar a habilidade
Atualize `C:\Kolden\<NomeMitológico>\.claude\skills\catalogo.md` com a nova entrada:
`| nome-da-habilidade | gatilho de invocação | propósito |`

## Erros que invalidam uma habilidade
- Descrição genérica ("ajuda com marketing") → nunca será invocada na hora certa.
- Corpo gigante → polui o contexto e dilui as instruções.
- Habilidade que duplica o CLAUDE.md do agente → redundância, deve ser apagada.
- Instruções contraditórias com o CLAUDE.md do agente → o revisor reprova.
