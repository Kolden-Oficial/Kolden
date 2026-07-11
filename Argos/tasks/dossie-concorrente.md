---
task: dossie-concorrente()
responsavel: "@competitor-mapper"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: concorrentes
    tipo: array
    origem: Orquestrador (argos-chief)
    obrigatorio: true

Saida:
  - campo: dossie
    tipo: yaml
    destino: Orquestrador (argos-chief)
    persistido: false

Checklist:
  - "[ ] Firmográficos enriquecidos via Apollo (com timestamp do enrich)"
  - "[ ] Seções fixas montadas com orgânico e pago em trilhas separadas"
  - "[ ] Share of voice cross-canal calculado com base de cálculo declarada"
  - "[ ] Lacunas marcadas como 'não coletado' (sem estimativa)"
  - "[ ] Cada concorrente classificado (direto/indireto/substituto)"
tipo: nota
area: Argos
up: "[[Argos/_MOC-argos]]"
relacionado:
  - "[[Argos/tasks/_indice|_indice]]"
---

# Tarefa: Dossiê de Concorrente — Argos

## Metadados

| Campo         | Valor                                                        |
|---------------|--------------------------------------------------------------|
| Task ID       | `argos:dossie-concorrente`                                  |
| Comando       | `@argos competitor "{concorrentes}"`                       |
| Orquestrador  | `argos-chief`                                                |
| Responsável   | `competitor-mapper`                                          |
| Propósito     | CONSOLIDAR a saída das outras fases (sizing, SERP/links, social orgânico, ads pago) num DOSSIÊ por concorrente, cruzando os canais, com ORGÂNICO e PAGO em colunas/seções separadas — preservando fonte + timestamp herdados |

## Entradas

| Entrada              | Origem                       | Obrigatório | Descrição                                                        |
|----------------------|------------------------------|-------------|------------------------------------------------------------------|
| `concorrentes`       | Orquestrador (argos-chief)   | Sim         | Lista de concorrentes a consolidar num dossiê cada              |
| `saidas_de_fase`     | Especialistas via orquestrador| Não        | Outputs já coletados: market-sizer, serp-seo-cartografo, social-*, ads-intel (cada um com fonte + timestamp) |
| `firmograficos_extra`| Apollo (auto)                | Não         | Enriquecimento firmográfico opcional (porte, headcount, setor) |
| `geografia`          | Orquestrador/Auto            | Não         | Recorte geográfico herdado do diagnóstico                       |

## Pré-condições

- Manifesto do squad carregado (`squad.yaml`)
- Pelo menos uma `saidas_de_fase` disponível via o orquestrador (sizing, SERP/links, social orgânico ou ads pago) — **este agente NÃO re-coleta**
- Dados de origem ToS-cinza, se houver, já vieram autorizados via `compliance-sentinela`
- Chave Apollo disponível via Infisical (nunca em texto puro)

## Fases

### Fase 1: Enriquecer Firmográficos (Apollo)

1. Para cada concorrente, busque firmográficos via Apollo:
   - `apollo_organizations_enrich` — porte, headcount, setor, domínio de um concorrente conhecido
   - `apollo_mixed_companies_search` — localizar/firmografar empresas por filtros quando o domínio não é certo
2. **Date o enrich**: todo dado firmográfico carrega o timestamp da consulta Apollo.
3. Segredo (chave Apollo) **só via Infisical** — nunca buscar credencial em texto puro.

### Fase 2: Montar Seções Fixas do Dossiê

1. Para cada concorrente, monte as seções fixas, **herdando fonte + timestamp** de quem coletou:
   - **(1) Identidade / firmográficos** — Apollo (Fase 1) + geografia
   - **(2) Posicionamento e preço (público)** — proposta de valor, faixa de preço pública, público-alvo declarado
   - **(3) Presença ORGÂNICA por rede** — handle, seguidores, engajamento por rede (Instagram, TikTok, YouTube, LinkedIn, X, Facebook, Reddit), coletado pelos `social-*`
   - **(4) Presença PAGA (ad libraries)** — anúncios ativos, ângulos/criativos, período observado (Meta Ad Library, Google Ads Transparency, TikTok Creative Center, LinkedIn Ads), coletado pelo `ads-intel`
   - **(5) Footprint SEO / links** — keywords no topo, backlinks/domínios de referência, propriedades digitais, coletado pelo `serp-seo-cartografo`
   - **(6) Forças / fraquezas** — com a fonte que sustenta cada item
   - **(7) Lacuna explorável** — a oportunidade acionável que o concorrente deixa aberta
2. **Mantenha ORGÂNICO (seção 3) e PAGO (seção 4) em seções/trilhas SEPARADAS** — jamais some alcance orgânico com métrica de ads.
3. Onde necessário, feche **apenas lacunas pontuais** de posicionamento/preço público via `web_search`/`x_search` — nunca recolha o que outro especialista já trouxe.

### Fase 3: Calcular Share of Voice Cross-Canal

1. Calcule a participação relativa de cada player por canal.
2. **Declare a base de cálculo**: quais canais, quais métricas, qual data.
3. Conte ORGÂNICO e PAGO em **trilhas distintas** — nunca agregue as duas num único número.

### Fase 4: Marcar Lacunas (não estimar)

1. Toda célula sem dado de origem vira **"não coletado"** — explicitamente.
2. **NUNCA** estime, interpole ou invente para preencher vazio.
3. Liste, ao final, todas as lacunas não preenchidas (o que ninguém trouxe).

### Fase 5: Classificar o Concorrente

1. Classifique cada player na matriz: **direto / indireto / substituto**.
2. Justifique a classificação com critério explícito de cada bucket.
3. Exponha contradições entre fontes em vez de escolher uma silenciosamente.

## Formato de Saída

```yaml
dossie:
  - concorrente: "{nome}"
    consolidado_por: competitor-mapper
    data_consolidacao: "{AAAA-MM-DD HH:MM}"
    classificacao:
      tipo: "{direto|indireto|substituto}"
      criterio: "{por que cai neste bucket}"
    identidade_firmograficos:
      - campo: "{razão social|domínio|setor|porte/headcount|geografia}"
        valor: "{… ou 'não coletado'}"
        fonte: "Apollo (apollo_organizations_enrich)"
        timestamp: "{…}"
    posicionamento_preco_publico:
      - item: "{proposta de valor|faixa de preço|público-alvo}"
        valor: "{… ou 'não coletado'}"
        fonte: "{web_search / site oficial}"
        timestamp: "{…}"
    presenca_organica:   # TRILHA ORGÂNICA — separada do pago
      - rede: "{instagram|tiktok|youtube|linkedin|x|facebook|reddit}"
        handle: "{…}"
        seguidores: "{… ou 'não coletado'}"
        engajamento: "{… ou 'não coletado'}"
        coletado_por: "social-{rede}"
        fonte: "{…}"
        timestamp: "{…}"
    presenca_paga:       # TRILHA PAGA — separada do orgânico
      - plataforma: "{meta_ad_library|google_ads_transparency|tiktok_creative_center|linkedin_ads}"
        anuncios_ativos: "{… ou 'não coletado'}"
        angulos_criativos: "{…}"
        periodo_observado: "{…}"
        coletado_por: "ads-intel"
        fonte: "{…}"
        timestamp: "{…}"
    footprint_seo_links:
      - item: "{keywords no topo|backlinks/domínios de referência|propriedades digitais}"
        valor: "{… ou 'não coletado'}"
        fonte: "serp-seo-cartografo"
        timestamp: "{…}"
    forcas: ["{força — com fonte}"]
    fraquezas: ["{fraqueza — com fonte}"]
    lacuna_exploravel: "{a oportunidade acionável — o 'por aqui dá pra entrar'}"
    contradicoes: ["{fonte A diz X, fonte B diz Y — exposto, não resolvido}"]

share_of_voice:
  base_de_calculo:
    canais: ["{…}"]
    metrica: "{…}"
    data: "{…}"
  organico: ["{player A: x%}", "{player B: y%}"]   # trilha separada
  pago: ["{player A: x%}", "{player B: y%}"]        # trilha separada

lacunas_nao_coletadas: ["{lista explícita do que ninguém trouxe}"]
```

## Regras de Veto

1. **NUNCA invente dado** — só consolide o que foi coletado, com proveniência herdada (fonte + timestamp). Sem isso, o dado fica de fora ou vira "não confirmado".
2. **Lacuna vira "não coletado"** — NUNCA estime, interpole ou preencha célula vazia com palpite.
3. **NUNCA misture ORGÂNICO com PAGO** — as duas trilhas vivem em colunas/seções separadas, sem soma cruzada.
4. **Contradição entre fontes deve ser EXPOSTA** — nunca escolha uma fonte silenciosamente; mostre o conflito.
5. **NUNCA re-colete** o que cabe a outro especialista — se faltar, peça a coleta ao orquestrador, não improvise.
6. **NUNCA inclua dado de origem ToS-cinza** que não tenha sido autorizado via `compliance-sentinela`.
7. **NUNCA busque credencial em texto puro** — segredos (ex.: chave Apollo) só via Infisical.

## Critérios de Conclusão

- [ ] Firmográficos enriquecidos via Apollo, com timestamp do enrich
- [ ] Seções fixas (1-7) montadas por concorrente, com fonte + timestamp herdados
- [ ] ORGÂNICO e PAGO mantidos em seções/trilhas separadas (sem soma cruzada)
- [ ] Share of voice cross-canal calculado com base de cálculo declarada (canais, métricas, data)
- [ ] Toda lacuna marcada como "não coletado" (sem estimativa)
- [ ] Cada concorrente classificado (direto/indireto/substituto) com critério explícito
- [ ] Contradições entre fontes expostas explicitamente
- [ ] Formato de saída corresponde ao schema acima
