---
id: areas-leia-me
titulo: "Áreas / Departamentos — modelo organizacional"
resumo: "Como a Kolden se organiza por áreas (visão lógica). Agentes são 'funcionários' registrados, não pastas movidas."
categoria: organizacao
palavras-chave: [areas, departamentos, organograma, agentes, funcionarios, registro]
status: vigente
atualizado-em: 2026-06-19
relacionados: [organograma, sobre-a-empresa-leia-me]
---

# Áreas / Departamentos da Kolden

A Kolden se organiza por **áreas** (como uma empresa: RH, Financeiro, Jurídico…), e cada área tem seus **"funcionários"** — que podem ser **agentes de IA** ou **pessoas**.

## Princípio (importante)
> **Área = visão lógica. Agente = funcionário registrado.**
> Esta pasta é o **organograma navegável**; ela **não guarda o código** dos agentes. Cada agente continua vivendo na sua pasta original (`C:\Kolden\<NomeMitológico>\`, criado e governado pelo **Caos**). A área apenas **lista** quem a compõe (no **Elenco**) e aponta para lá.

**Por que assim** (melhores práticas — Microsoft, Workday, Relevance AI):
- **Reorganizar não quebra nada** — muda-se o elenco/registro, não se move código.
- **Um agente pode servir várias áreas** (ex.: um agente de aprovação usado por RH, Financeiro e Jurídico).
- **Fonte única da verdade** = o registro do Caos (`Caos/dados/registro-de-entidades.yaml`), não o filesystem.

## Como cada área é descrita
Cada arquivo de área tem 4 seções (veja `_modelo-area.md`):
1. **Carta da área** — missão da área, responsável/dono, escopo.
2. **Quadro de funções** — os cargos/"vagas" (descrições de função dos agentes).
3. **Elenco** — quem ocupa hoje (agentes → link p/ `C:\Kolden\<Nome>`; e pessoas).
4. **KPIs** — como se mede a área.

## Áreas (do organograma "Cenário de Ápice")
`ceo-topo` · `operacoes` · `financas` · `tecnologia` · `receita` · `pessoas-rh` · `marketing` · `governanca` · `inovacao`

## Próximo passo (via Caos)
Adicionar campo `area` ao registro de entidades e criar `Caos/dados/organizacao-de-areas.yaml` (mapa área→agentes machine-readable). Isso é mudança de schema/Constituição → **governado pelo Caos**, ainda não feito.
