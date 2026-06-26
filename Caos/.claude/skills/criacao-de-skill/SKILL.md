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
├── SKILL.md        ← obrigatório (< 500 linhas)
├── references/     ← opcional: docs profundos carregados SOB DEMANDA (não poluem o contexto)
├── scripts/        ← opcional: scripts de referência que a habilidade chama
├── modelos/        ← opcional: templates que a habilidade copia
├── evals/          ← opcional: suíte de avaliação da habilidade (evals.md) — ver "Avaliação"
└── contexto.md     ← opcional: conhecimento extenso, lido só se preciso
```

> **`references/` sob demanda (G3):** conhecimento extenso e estável (frameworks, tabelas, catálogos)
> vai para `references/<assunto>.md` e é citado no corpo com "para X, leia `references/<assunto>.md`".
> O modelo só lê o arquivo quando precisa — mantém o SKILL.md enxuto. É a forma preferida sobre
> despejar tudo no corpo. (`contexto.md` é o caso degenerado de um único arquivo de referência.)

## Frontmatter do SKILL.md

```yaml
---
name: nome-em-kebab-case
description: Frase que descreve QUANDO usar e O QUE a habilidade cobre. É contra esta frase que o modelo decide invocar — seja específico, inclua gatilhos ("use quando o usuário pedir X", "cobre A, B e C").
---
```

## Conformância à spec Agent Skills (G11/G15 — gate de revisão)

Regras invioláveis de frontmatter e arquivo (alinhadas à spec Agent Skills; verificadas pelo `revisor` na Fase 6):

| Campo / item | Restrição |
|---|---|
| `name` | 1–64 chars, só `a-z`, números e hífen; **sem** `--` consecutivo; não começa/termina com hífen; **igual ao nome do diretório** |
| `description` | 1–1024 chars; descreve **o que faz E quando usar**, com trigger phrases (as palavras que o usuário usaria) |
| `SKILL.md` | **< 500 linhas**; conhecimento maior vai para `references/` |
| `metadata` | opcional (`version`, `author`…) |

Nomes válidos: `cro`, `ab-testing`, `seo-onpage`. Inválidos: `Page-CRO` (maiúscula), `-page` (hífen na borda),
`page--cro` (hífen duplo), nome ≠ diretório.

## Boas práticas para o corpo
- Comece com o objetivo em 1-2 linhas.
- Use passos numerados para processos; listas para regras.
- Inclua um exemplo concreto de entrada → saída.
- Máximo ~150 linhas. Conhecimento maior vai para `contexto.md` com uma
  instrução do tipo "para detalhes de X, leia contexto.md".
- Escreva a descrição pensando no MATCH: palavras que o usuário usaria
  ao pedir a tarefa devem aparecer nela.

## Contexto compartilhado antes de perguntar (G14)
Antes de pedir informação ao usuário, a habilidade **lê o contexto compartilhado** se existir e só
pergunta o que não estiver coberto. No padrão de origem era `.agents/product-marketing.md`; na Kolden
o equivalente é o **"cérebro" `sobre-a-empresa/`** (ICP, ofertas, marca, processos) — lido antes de
perguntar, não depois. Inclua no corpo da habilidade: "se `sobre-a-empresa/<área>` cobrir X, use; só
pergunte o que faltar". Reduz fricção e evita re-perguntar o que a empresa já documentou.

## Fronteiras de escopo / habilidades relacionadas (G16)
Toda habilidade declara onde **termina** e para qual habilidade encaminhar o que está fora. Adicione
ao fim do SKILL.md uma seção **"Habilidades relacionadas"** com o roteamento por fronteira (ex.:
"para copy de e-mail, ver `emails`; para estrutura de página, ver `cro`"). Esse grafo de cross-ref é o
que alimenta o **roteamento por keywords** do squad (`data/routing-catalog.yaml`) — escopo nítido
evita duas habilidades brigando pela mesma tarefa.

## Avaliação por habilidade (G2 — opcional, recomendado)
Habilidade de domínio crítico ganha uma suíte `evals/evals.md`: uma lista de casos
`prompt → expected_output → assertions` (o que a resposta DEVE conter). É o equivalente, no nível da
habilidade, ao maturity score do `testador` (Fase 7). Serve para regredir a qualidade quando a
habilidade muda. Esquema mínimo por caso: `id`, `prompt`, `expected_output` (1 parágrafo), `assertions`
(lista de checagens objetivas). Mantém a barra de qualidade sem depender de re-leitura humana.

## Após criar a habilidade
Atualize `C:\Kolden\<NomeMitológico>\.claude\skills\catalogo.md` com a nova entrada:
`| nome-da-habilidade | gatilho de invocação | propósito |`

## Erros que invalidam uma habilidade
- Descrição genérica ("ajuda com marketing") → nunca será invocada na hora certa.
- Corpo gigante → polui o contexto e dilui as instruções.
- Habilidade que duplica o CLAUDE.md do agente → redundância, deve ser apagada.
- Instruções contraditórias com o CLAUDE.md do agente → o revisor reprova.
