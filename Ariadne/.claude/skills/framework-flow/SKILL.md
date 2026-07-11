---
name: framework-flow
description: >
  Use quando a demanda pedir um método estruturado e guiado por evidência para
  conduzir SEO na era da busca por IA — o loop FLOW (Find → Leverage → Optimize
  → Win), que casa busca e conversão. Dá ao ariadne-chief um modelo operacional
  por estágio para orquestrar as demais frentes em vez de improvisar. Gatilhos:
  "FLOW", "framework FLOW", "SEO guiado por evidência", "find leverage optimize
  win", "método de SEO por estágio", "do tráfego à conversão". É uma metodologia
  NOVA da Ariadne (camada de orquestração).
tipo: skill
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
---

# Framework FLOW — Find · Leverage · Optimize · Win

> Framework e prompts © Daniel Agrici, **CC BY 4.0** — github.com/AgriciDaniel/flow

Modelo operacional de SEO **guiado por evidência**, pensado para a era da busca com IA. Não é uma frente de execução nova — é a **camada de método** que o `ariadne-chief` usa para sequenciar as frentes existentes (técnico, conteúdo, AI-SEO, local, CRO/SXO) num loop coerente, do tráfego à conversão.

## Os quatro estágios (+ local)
- **Find** — descoberta: pesquisa de keyword, gap analysis, mapeamento de intenção de SERP. *Entrada de dado é handoff do Argos.*
- **Leverage** — autoridade off-site: estratégia de backlink e sinais externos. *Coleta de backlink é Argos; aqui é só a estratégia.*
- **Optimize** — o coração on-page: seleção contextual de táticas (não despejar tudo). Escolha 2-3 alavancas mais relevantes por **vertical** (SaaS → on-page+técnico; local → citações+GBP; publisher → E-E-A-T+frescor), por **saída de análise anterior** (auditoria apontou crawl → otimização técnica) e por **sinal de URL** (produto → conversão; blog → frescor+autoridade). Sempre declare quais 2-3 escolheu e por quê.
- **Win** — fundo de funil: taxa de conversão, BOFU, scorecard de dupla superfície (busca + IA). *Ponte com CRO/SXO.*

## Como o chief usa
1. Identifica em qual estágio o problema do cliente está (Find/Leverage/Optimize/Win/Local).
2. Roteia para o(s) especialista(s) da Ariadne correspondente(s) àquele estágio, usando o `routing-catalog.yaml`.
3. Mantém a evidência no centro: cada recomendação cita o dado que a sustenta (auditoria, GSC, SERP) — alinhado ao veto "recomendação sem dado vira hipótese" da Ariadne.

## Mapeamento FLOW → frentes da Ariadne
| Estágio FLOW | Frente / especialista Ariadne |
|---|---|
| Find | handoff Argos (keyword/SERP/gap) |
| Leverage | estratégia; coleta = Argos |
| Optimize | `auditor-tecnico-seo`, `arquiteto-de-site`, `engenheiro-de-schema`, `estrategista-de-conteudo-seo`, `otimizador-ai-seo`, `seo-local-e-mapas`, `seo-de-imagens` |
| Win | `analista-de-cro`, `otimizador-de-formulario`, `sxo-search-experience`; copy final = Caliope |

## Regra de atribuição (obrigatória)
FLOW é **CC BY 4.0** — exige crédito ao autor. Toda ativação que use o método FLOW exibe, antes da análise:

```
Framework e prompts © Daniel Agrici, CC BY 4.0 — github.com/AgriciDaniel/flow
```

Não omitir nem modificar a atribuição. A biblioteca de ~41 prompts FLOW originais **não foi copiada** para a Kolden (são CC-BY do autor); esta skill internaliza só o *modelo de estágios* (princípio), reescrito em PT-BR. Se um dia a biblioteca de prompts for desejada, ela deve ser sincronizada da fonte com o cabeçalho de licença preservado, não recriada literalmente aqui.

---
## Atribuição
Modelo extraído de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-flow`, código MIT) que integra o **framework FLOW © Daniel Agrici, CC BY 4.0** (github.com/AgriciDaniel/flow). Apenas o princípio de estágios foi reescrito em PT-BR para a Kolden; os prompts originais não foram reproduzidos. Crédito obrigatório ao autor preservado acima.
