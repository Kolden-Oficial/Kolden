---
task: diagnose()
responsavel: "@ariadne-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: demanda
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: diagnosis
    tipo: yaml
    destino: Console
    persistido: false

Checklist:
  - "[ ] Frente identificada (SEO técnico / arquitetura / schema / conteúdo / AI-SEO / CRO / formulário)"
  - "[ ] Escopo definido (site inteiro vs página; auditoria vs implementação)"
  - "[ ] Insumos verificados (há dado? faltam keywords/SERP → handoff Argos?)"
  - "[ ] Resposta rápida fornecida antes de rotear"
  - "[ ] 1-3 especialistas roteados, ou resposta direta se confiança baixa"
tipo: nota
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
relacionado:
  - "[[Ariadne/tasks/_indice|_indice]]"
---

# Tarefa: Diagnosticar — Ariadne

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `ARIADNE-001`                                                |
| Versão        | `1.0.0`                                                      |
| Comando       | `*diagnose`                                                  |
| Orquestrador  | `ariadne-chief`                                              |
| Responsável   | `ariadne-chief`                                              |
| Propósito     | Triar a demanda de SEO/CRO, definir a frente e o escopo, verificar insumos (dado? keywords?) e rotear 1-3 especialistas |

## Entradas

| Entrada     | Origem            | Obrigatório | Descrição                                          |
|-------------|-------------------|-------------|----------------------------------------------------|
| `demanda`   | Prompt do usuário | Sim         | O pedido de SEO/CRO (URL, site, página, objetivo)  |
| `url`       | Usuário           | Não         | URL/site alvo                                      |
| `objetivo`  | Usuário/Auto      | Não         | rankear / converter / ambos                        |
| `dado`      | Usuário           | Não         | Acesso a GSC, PageSpeed, GA4, heatmap, taxa atual  |

## Pré-condições

- Manifesto do squad carregado (`squad.yaml`)
- Catálogo de roteamento disponível (`data/routing-catalog.yaml`)
- Pelo menos uma definição de especialista existe em `agents/`

## Fases de Execução

### Fase 1: Identificar a frente

1. Leia a demanda e classifique a FRENTE pelos gatilhos do `domain_routing`:
   - `seo_tecnico` — "não ranqueio", indexação, Core Web Vitals, crawl, canonical, robots/sitemap, queda de tráfego
   - `arquitetura` — siloing, clusters, links internos, estrutura de URL, páginas órfãs
   - `schema` — dados estruturados, JSON-LD, rich results
   - `conteudo_seo` — on-page, intenção de busca, programmatic, E-E-A-T, em escala
   - `ai_seo` — AEO/GEO/LLMO, AI Overviews, ChatGPT, ser citado, llms.txt
   - `cro_pagina` — não converte, taxa de conversão, landing page, experimento, A/B
   - `cro_formulario` — formulário, campos, multi-step, abandono, checkout

### Fase 2: Definir o escopo

1. Site inteiro vs página específica?
2. Auditoria/diagnóstico vs implementação?
3. Jornada completa (rankear + converter) → sequencie via `workflows/wf-seo-cro.yaml`.

### Fase 3: Verificar insumos

1. Há dado (GSC, PageSpeed, GA4, heatmap, taxa atual)? Sem dado, o achado nasce **rotulado como hipótese**.
2. Faltam keywords / SERP / volume / concorrência? → **handoff de ENTRADA do Argos** — não inventar nem coletar aqui.
3. A demanda vai precisar de copy final? → antecipe o **handoff de SAÍDA ao Caliope**.

### Fase 4: Responder e rotear

1. **Resposta rápida primeiro** — 2-4 frases que nomeiam a frente, o escopo e de onde virá a evidência.
2. Cruze com `data/routing-catalog.yaml` e selecione 1-3 especialistas (primário + secundário).
3. Confiança HIGH (≥3 keywords) / MEDIUM (2) / LOW (0-1). Em LOW, **não roteie** — responda direto e ofereça escolhas.
4. Anuncie: "Roteando para @{especialista} — frente {frente}, escopo {escopo}".

## Formato de Saída

```yaml
diagnosis:
  demanda_resumo: "{resumo de 1 linha}"
  frente: "{seo_tecnico|arquitetura|schema|conteudo_seo|ai_seo|cro_pagina|cro_formulario}"
  escopo: "{site inteiro | página específica} / {auditoria | implementação}"
  insumos:
    tem_dado: {true|false}
    falta_keywords_serp: {true|false}   # se true → handoff de entrada Argos
    precisa_copy: {true|false}          # se true → handoff de saída Caliope
  resposta_rapida: |
    {2-4 frases nomeando frente, escopo e origem da evidência}
  rota:
    confianca: "{HIGH|MEDIUM|LOW}"
    primario: "{agent-id}"
    secundario: "{agent-id}"
    motivo: "{por que esta frente/especialista}"
  roteado: {true|false}
```

## Condições de Veto

1. **NUNCA roteie sem dar a resposta rápida primeiro** — o usuário sempre recebe valor imediato.
2. **NUNCA roteie com confiança LOW** — responda direto e ofereça escolhas.
3. **NUNCA invente keyword/volume/SERP** — falta de insumo de descoberta vira handoff de ENTRADA do Argos.
4. **NUNCA prometa dado sem fonte** — antecipe de onde virá a evidência.
5. **NUNCA execute a frente você mesma** — a chief tria e roteia; não audita, escreve, desenha ou roda CRO.
6. **NUNCA grave credencial em texto puro** — só via Infisical (`/kolden/ariadne`).

## Critérios de Conclusão

- [ ] Frente identificada pelos gatilhos do `domain_routing`
- [ ] Escopo definido (site/página; auditoria/implementação)
- [ ] Insumos verificados (dado? keywords/SERP → Argos? copy → Caliope?)
- [ ] Resposta rápida fornecida (obrigatória)
- [ ] 1-3 especialistas roteados se confiança ≥ MEDIUM, ou resposta direta se LOW
- [ ] Formato de saída corresponde ao schema acima
