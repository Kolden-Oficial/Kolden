---
id: sobre-a-empresa-leia-me
titulo: "Sobre a Empresa — bússola"
resumo: "Mapa raiz do cérebro da Kolden: a empresa, os projetos, os sócios e as ferramentas."
categoria: identidade
palavras-chave: [indice, navegacao, bussola, kolden, projetos, socios, ferramentas]
status: vigente
atualizado-em: 2026-07-06
relacionados: [dossie-mae, indice]
---

# Sobre a Empresa — cérebro consolidado

Esta pasta é o **cérebro** da operação. Quatro áreas de topo, cada uma com uma responsabilidade clara:

| Pasta | O que mora aqui |
|---|---|
| [`Kolden/`](Kolden/) | Tudo **sobre a Kolden empresa** — identidade, marca, mercado, áreas, operação, iniciativas internas, histórico. |
| [`Projetos/`](Projetos/) | Um projeto por cliente (ou iniciativa entregável). Ativos, arquivados e o modelo de referência. Bússola em [`Projetos/_index.md`](Projetos/_index.md). |
| [`Socios/`](Socios/) | Perfis pessoais dos sócios (Ronan, etc.) — separado da empresa por natureza. |
| [`Ferramentas/`](Ferramentas/) | Catálogo de ferramentas usadas em Kolden **e** clientes — vive fora de `Kolden/` porque serve todos os projetos. |

## Documentos oficiais (raiz)

- [`dossie-mae.md`](dossie-mae.md) — cérebro-mestre com síntese verificada do que a Kolden é.
- [`indice.yaml`](indice.yaml) — índice machine-readable de todos os documentos (para agentes).
- [`glossario.md`](glossario.md) — termos do negócio Kolden.
- [`faq.md`](faq.md) — perguntas frequentes.

## Como navegar

- Pergunta sobre **o que é / como funciona a Kolden** → [`Kolden/`](Kolden/) (comece por [`Kolden/leia-me.md`](Kolden/leia-me.md)).
- Pergunta sobre **um cliente específico** → [`Projetos/<slug>/`](Projetos/) (cada projeto tem `leia-me.md` + `dossie.md`).
- Pergunta sobre **quem é o Ronan / outro sócio** → [`Socios/`](Socios/).
- Pergunta sobre **uma ferramenta** (Meta, GHL, NotebookLM, etc.) → [`Ferramentas/`](Ferramentas/).
- Termo desconhecido → [`glossario.md`](glossario.md). Dúvida comum → [`faq.md`](faq.md).

## Convenções

- **PT-BR, kebab-case**, frontmatter YAML em todo `.md`.
- `status`: `rascunho` (em construção) · `vigente` (oficial) · `arquivado`.
- Fonte única da verdade: um fato mora em um lugar; outros documentos referenciam.
- Segredos: **nunca** aqui — só no Infisical.
