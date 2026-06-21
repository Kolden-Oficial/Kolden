---
task: diagnose()
responsavel: "@argos-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: query
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: diagnosis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Query analisada com escopo (macro/meso/micro) e trilha identificados"
  - "[ ] Necessidade de zona cinza decidida (e autorização pedida se aplicável)"
  - "[ ] Resposta rápida fornecida"
  - "[ ] Rota executada ou resposta direta dada"
---

# Tarefa: Diagnosticar — Argos

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `argos:diagnose`                                            |
| Comando       | `@argos research "{query}"`                                 |
| Orquestrador  | `argos-chief`                                                |
| Propósito     | Analisar o pedido de pesquisa, definir escopo (macro/meso/micro) e trilha, decidir sobre zona cinza, dar resposta rápida e rotear para o(s) especialista(s) certo(s) |

## Entradas

| Entrada       | Origem            | Obrigatório | Descrição                                |
|---------------|-------------------|-------------|------------------------------------------|
| `query`       | Prompt do usuário | Sim         | O mercado/concorrente/pergunta de pesquisa |
| `context`     | Sessão            | Não         | Contexto da conversa anterior            |
| `geografia`   | Usuário/Auto      | Não         | Recorte geográfico (país/região/idioma)  |
| `profundidade`| Usuário/Auto      | Não         | macro \| meso \| micro \| completo        |

## Pré-condições

- Manifesto do squad carregado (`squad.yaml`)
- Catálogo de roteamento disponível (`data/routing-catalog.yaml`)
- Pelo menos uma definição de especialista existe em `agents/`

## Fases

### Fase 1: Analisar (argos-chief)

1. Leia a query e extraia:
   - **Intenção**: o que o usuário quer descobrir (tamanho, concorrentes, orgânico, pago, links, dores...)
   - **Escopo/Profundidade**: macro (mercado), meso (concorrência), micro (raio-X de um concorrente)
   - **Trilha**: sizing, SEO/SERP/links, orgânico por rede, pago (ads), dossiê, ou completo
   - **Geografia**: país/região/idioma
   - **Palavras-chave de domínio**: corresponda com o catálogo de roteamento
   - **Risco ToS**: a coleta exige login/scraping autenticado (zona cinza)?

2. Classifique o tipo da query:
   - `sizing` — dimensionar mercado (TAM/SAM/SOM), tendências
   - `seo` — SERP, rankings, keywords, links
   - `ads` — anúncios pagos (ad libraries)
   - `social` — análise de uma ou mais redes sociais
   - `competitor` — dossiê/mapeamento de concorrente(s)
   - `report` — pesquisa completa macro→micro (aciona o workflow)
   - `compliance` — pergunta sobre o que é permitido coletar

### Fase 2: Corresponder Roteamento

1. Carregue `data/routing-catalog.yaml`
2. Pontue cada domínio em relação às palavras-chave extraídas
3. Identifique:
   - **Agente primário**: melhor correspondência (por função ou por rede)
   - **Agente secundário**: complementa ou consolida
   - **Nível de confiança**: HIGH (≥3 keywords), MEDIUM (2), LOW (0-1)
   - **Fan-out**: se o escopo pede cobertura ampla de redes, acione os `social-*` em paralelo

4. Guia de seleção por trilha:
   | Trilha / Objetivo                  | Primário             | Secundário          |
   |------------------------------------|----------------------|---------------------|
   | Tamanho de mercado / tendências    | market-sizer         | research-synthesizer|
   | SEO / SERP / links                 | serp-seo-cartografo  | web-harvester       |
   | Scraping/extração de links         | web-harvester        | serp-seo-cartografo |
   | Anúncios pagos                     | ads-intel            | competitor-mapper   |
   | Rede social específica             | social-{rede}        | competitor-mapper   |
   | Dossiê de concorrente              | competitor-mapper    | research-synthesizer|
   | Relatório / cross-check            | research-synthesizer | competitor-mapper   |
   | Autorização de zona cinza          | compliance-sentinela | argos-chief         |

### Fase 3: Decidir sobre Zona Cinza (compliance)

1. Se a coleta puder ser feita por fonte legítima (API oficial, dado público, ad library) → modo VERDE, prossiga.
2. Se exigir scraping autenticado/contorno de ToS → **PARE**: roteie ANTES para `compliance-sentinela`
   para autorização humana + conta/proxy descartável. Sem autorização, reporte a lacuna honestamente.

### Fase 4: Responder

1. **Sempre forneça uma resposta rápida primeiro** — 2-4 frases que abordam a query, nomeiam o escopo
   (macro/meso/micro) e a trilha, e antecipam de onde virá a evidência (fontes).
2. Inclua: resposta direta + qual especialista é mais relevante + o próximo passo de coleta.

### Fase 5: Rotear (se necessário)

1. Se a confiança for HIGH ou MEDIUM:
   - Anuncie: "Roteando para @{agent} — escopo {macro|meso|micro}, trilha {trilha}, modo {verde|cinza}"
   - Passe o contexto: nicho/concorrente + geografia + trilha + o que já se sabe (com fontes)
2. Se a confiança for LOW: NÃO roteie — responda diretamente e ofereça escolhas.

## Formato de Saída

```yaml
diagnosis:
  query_summary: "{resumo de 1 linha}"
  scope: "{macro|meso|micro|completo}"
  track: "{sizing|seo|ads|social|competitor|report|compliance}"
  geography: "{país/região/idioma ou 'não especificado'}"
  gray_zone_needed: {true|false}
  quick_answer: |
    {resposta direta de 2-4 frases, nomeando escopo, trilha e origem da evidência}
  routing:
    confidence: "{HIGH|MEDIUM|LOW}"
    primary_agent: "{agent-id}"
    secondary_agent: "{agent-id}"
    fan_out: ["{social-* quando aplicável}"]
    reason: "{por que este especialista é a melhor correspondência}"
  routed: {true|false}
```

## Regras de Veto

1. **NUNCA roteie sem dar uma resposta rápida primeiro** — o usuário sempre recebe valor imediato.
2. **NUNCA roteie com confiança LOW** — responda direto e ofereça escolhas.
3. **SEMPRE decida sobre zona cinza ANTES de coletar** — coleta autenticada passa pelo compliance-sentinela.
4. **NUNCA prometa dado sem fonte** — antecipe de onde virá a evidência (fonte + timestamp).
5. **NUNCA execute o trabalho de execução** (subir tráfego, publicar, copy, oferta) — isso é handoff.

## Critérios de Conclusão

- [ ] Query analisada com escopo (macro/meso/micro) e trilha identificados
- [ ] Catálogo de roteamento consultado e confiança pontuada
- [ ] Necessidade de zona cinza decidida (autorização pedida ao sentinela se aplicável)
- [ ] Resposta rápida fornecida (obrigatória)
- [ ] Rota executada se confiança ≥ MEDIUM, ou resposta direta se LOW
- [ ] Formato de saída corresponde ao schema acima
