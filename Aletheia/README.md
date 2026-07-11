---
tipo: nota
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
relacionado:
  - "[[Aletheia/_origem|_origem]]"
  - "[[Aletheia/CLAUDE|CLAUDE]]"
  - "[[Aletheia/ferramentas|ferramentas]]"
  - "[[Aletheia/instalacao|instalacao]]"
  - "[[Aletheia/prd-de-ia|prd-de-ia]]"
  - "[[Aletheia/roteiro-de-teste|roteiro-de-teste]]"
---

# Aletheia — Discovery & Lean Validation Squad

> *Aletheia (Ἀλήθεια): a verdade que se desvela.*
> A entrada do funil de criação da Kolden — leva uma ideia crua até um MVP validado com
> evidência real, e impede que se construa o que ninguém quer.

## O que é

Um squad de 8 agentes (1 orquestrador + 7 especialistas) que cobre a ponta de **descoberta e
validação enxuta** do roteiro de criação de empresa — as fases que a Kolden não cobria antes de
saltar direto para a execução. Reúne as maiores autoridades do tema:

| Estágio | Especialista | Framework central |
|---|---|---|
| **Orquestração** | `aletheia-chief` (Aletheia) | Roteamento, síntese e gate de evidência |
| Descoberta | `steve-blank` | Customer Development, get out of the building |
| Descoberta | `rob-fitzpatrick` | The Mom Test (entrevista sem viés) |
| Descoberta | `tony-ulwick` | Jobs-to-Be-Done / Outcome-Driven Innovation |
| Validação | `eric-ries` | Lean Startup, Build-Measure-Learn, tipos de MVP |
| Validação | `david-bland` | Testing Business Ideas, assumptions mapping |
| Validação | `ash-maurya` | Running Lean, Lean Canvas |
| Mercado | `alberto-savoia` | Pretotyping, teste de demanda, sizing |

## A regra de ouro (o veto)

Nenhuma recomendação de **construir** sai daqui sem os quatro: **dor validada + hipótese
falsificável + métrica de validação com critério de sucesso + critério de kill**. Faltou um → **HALT**.

## Como usar

```
@aletheia validate "<sua ideia>"     # diagnostica o estágio e roteia
@aletheia:rob-fitzpatrick            # fala direto com um especialista
*journey                              # roda a jornada completa de validação
*gate                                 # roda o gate de evidência sobre uma recomendação
*handoff                              # prepara o handoff para um squad de execução
```

## Jornada de validação (workflow `wf-validacao-de-mvp`)

```
1. Descoberta da dor      → rob-fitzpatrick + steve-blank   (entrevistas Mom Test)
2. Estruturar necessidade → tony-ulwick                     (job map, outcomes, opportunity score)
3. Mapear assunções       → david-bland + ash-maurya        (assumptions map + Lean Canvas)
4. Desenhar experimento   → eric-ries + david-bland         (menor MVP + test card)
5. Testar demanda         → alberto-savoia                  (pretotype + skin-in-the-game + sizing)
6. Gate + Decisão         → aletheia-chief                  (perseverar / pivotar / parar)
```

Cada fase tem um checkpoint que pode dar **HALT** antes de qualquer build.

## Handoff para execução (Aletheia valida, os outros constroem)

| Quando | Squad | Artefato |
|---|---|---|
| Dor/ICP validados | **Aglaia** | Síntese + ICP/persona (preenche `sobre-a-empresa/mercado-e-posicionamento/`) |
| UVP validada | **Pluto** | Oferta + preço |
| Tipo de MVP (interface) | **Harmonia** | UX/UI |
| Landing/copy de validação | **Caliope** | Brief de copy |
| MVP funcional | **Prometeu** | Build via `geracao-de-prd` |
| Instrumentar métricas | **Metis** | North Star + métrica de validação |

## Estrutura

Veja `CLAUDE.md` (identidade e operação), `squad.yaml` (manifesto), `prd-de-ia.md` (requisitos),
`instalacao.md` (produção) e `roteiro-de-teste.md` (smoke tests).
