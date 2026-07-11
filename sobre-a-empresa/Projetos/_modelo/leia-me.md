---
id: projeto-<slug>-leia-me
titulo: "<Nome do Projeto> — visão geral"
resumo: "O que é o projeto, status e como navegar."
categoria: projeto
palavras-chave: [projeto]
status: rascunho
atualizado-em: 2026-06-18
relacionados: [prd, arquitetura, status]
dossie_cliente: "<sobre-a-empresa/clientes/ativos/<slug>.md — ou vazio se for projeto interno, sem cliente>"
tipo: projeto
projeto: leia-me.md
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/_modelo/dossie|dossie]]"
---

# <Nome do Projeto>

> Template de projeto. Copie a pasta `_modelo-projeto/` para `Projetos/<nome-do-projeto>/` e preencha.

## Cliente

Dossiê (negócio, contrato, ICP, metas): [`clientes/ativos/<slug>.md`](../../sobre-a-empresa/clientes/ativos/<slug>.md). Este projeto é a **execução**; o dossiê é a **inteligência de negócio**. _Omitir esta seção e o campo `dossie_cliente` se for projeto interno, sem cliente._

## O que é
_1 parágrafo: objetivo do projeto e para quem._

## Documentos
- `prd.md` — requisitos
- `arquitetura.md` — como é construído
- `decisoes.md` — log de decisões (ADRs)
- `status.md` — situação atual

## Links
_Código, deploy, recursos relacionados._
