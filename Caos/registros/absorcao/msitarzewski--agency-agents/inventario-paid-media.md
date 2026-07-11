---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `paid-media/`

Granularidade: 1 base por agente + técnicas transferíveis salientes. Total: 7 (bases) + 17 (técnicas) = 24 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Auditoria forense de conta de mídia paga multi-plataforma (Google/Microsoft/Meta) com 200+ checkpoints, severidade e impacto projetado | agente | auditoria, paid-media, google-ads, meta, microsoft-ads, severidade | paid-media | paid-media/paid-media-auditor.md:11-15 |
| G2 | Execução de checklist de 200+ pontos com severidade (crítico/alto/médio/baixo) e estimativa de impacto em receita/eficiência | skill | checklist, severidade, impact-estimation, audit | paid-media | paid-media/paid-media-auditor.md:30-31 |
| G3 | Forense de histórico de mudanças — correlacionar alteração na conta com degradação de performance | metodo-prompt | change-history, forensics, regressao, root-cause | paid-media | paid-media/paid-media-auditor.md:36 |
| G4 | Geração de executive summary que traduz achados técnicos para linguagem de negócio | skill | executive-summary, traducao-tecnica, stakeholder | paid-media | paid-media/paid-media-auditor.md:33 |
| G5 | Estratégia criativa de mídia paga (RSA, Meta, PMax) tratando cada peça como hipótese testável em ambiente de bidding automatizado | agente | criativo, rsa, meta-ads, performance-max, testing | paid-media | paid-media/paid-media-creative-strategist.md:11-15 |
| G6 | Arquitetura de RSA com 15 headlines (marca/benefício/feature/CTA/prova-social) garantindo coerência em toda combinação possível | framework | rsa, 15-headlines, pin-strategy | paid-media | paid-media/paid-media-creative-strategist.md:20-30 |
| G7 | Geração rápida de 20+ variações de anúncio a partir de um único brief criativo | metodo-prompt | iteracao-rapida, variacao-criativa, brief, escala | paid-media | paid-media/paid-media-creative-strategist.md:37 |
| G8 | Detecção de fadiga criativa por tendência de queda de CTR e limiar de impressão ótima | skill | fadiga-criativa, ctr-trend, refresh, monitoramento | paid-media | paid-media/paid-media-creative-strategist.md:44 |
| G9 | Estratégia de paid social cross-plataforma (Meta/LinkedIn/TikTok/Pinterest/X/Snap) com campanhas nativas full-funnel | agente | paid-social, full-funnel, meta, linkedin, tiktok, capi | paid-media | paid-media/paid-media-paid-social-strategist.md:11-15 |
| G10 | Supressão cruzada de audiência entre plataformas para evitar sobrecarga de frequência | skill | audience-suppression, cross-platform, frequencia | paid-media | paid-media/paid-media-paid-social-strategist.md:33 |
| G11 | Implementação de Conversions API / eventos server-side em múltiplas plataformas sociais (deduplicação browser+server) | metodo-prompt | capi, server-side, deduplicacao, ios14 | paid-media | paid-media/paid-media-paid-social-strategist.md:35-37 |
| G12 | Validação de incrementalidade social cruzando dados com Search/Display para evitar dupla contagem de conversões | metodo-prompt | incrementalidade, cross-channel, atribuicao | paid-media | paid-media/paid-media-paid-social-strategist.md:45 |
| G13 | Arquitetura de conta PPC enterprise (Google/Microsoft/Amazon) — estrutura como estratégia, escalando de US$10K a US$10M/mês | agente | ppc, enterprise, conta, arquitetura, bidding | paid-media | paid-media/paid-media-ppc-strategist.md:11-15 |
| G14 | Arquitetura tier de campanha (brand / non-brand / competitor / conquest) com estratégias de isolamento | framework | tier-architecture, brand, non-brand, conquest | paid-media | paid-media/paid-media-ppc-strategist.md:30 |
| G15 | Frameworks de teste de incrementalidade para paid search (geo-split, holdout, matched market) | framework | incrementality-testing, geo-split, holdout | paid-media | paid-media/paid-media-ppc-strategist.md:37 |
| G16 | Hierarquia de conversion actions (primária/secundária, micro/macro) alimentando aprendizado do algoritmo | metodo-prompt | conversion-hierarchy, micro-macro, smart-bidding | paid-media | paid-media/paid-media-ppc-strategist.md:34 |
| G17 | Compra programática e de display em todo o espectro (GDN, DV360, The Trade Desk, partner media, ABM Demandbase/6Sense) | agente | programmatic, display, dv360, dsp, abm | paid-media | paid-media/paid-media-programmatic-buyer.md:11-15 |
| G18 | Arquitetura de AMP (Addressable Media Plan) em planilha com 25+ parceiros cruzando display, newsletter e conteúdo patrocinado | framework | amp, addressable-media-plan, partner-media | paid-media | paid-media/paid-media-programmatic-buyer.md:21-31 |
| G19 | Construção do zero de listas de managed placements de alto valor por vertical | metodo-prompt | managed-placements, curadoria, vertical, gdn | paid-media | paid-media/paid-media-programmatic-buyer.md:30 |
| G20 | Análise de search query — mineração de relatórios de termos em escala, taxonomia de negativas e mapeamento query-to-intent | agente | search-query, negativas, intent, n-gram, sqos | paid-media | paid-media/paid-media-search-query-analyst.md:11-15 |
| G21 | N-gram frequency analysis para detectar modificadores irrelevantes recorrentes em escala | metodo-prompt | n-gram, frequencia, modificadores, waste | paid-media | paid-media/paid-media-search-query-analyst.md:30 |
| G22 | SQOS (Search Query Optimization System) — score multifator de alinhamento query→ad→landing-page | framework | sqos, scoring, alinhamento, query-ad-lp | paid-media | paid-media/paid-media-search-query-analyst.md:34 |
| G23 | Engenharia de tracking e mensuração (GTM, GA4, CAPI, server-side, dedup, consent mode v2) | agente | tracking, gtm, ga4, capi, server-side, consent | paid-media | paid-media/paid-media-tracking-specialist.md:11-15 |
| G24 | Deduplicação CAPI — event_id matching para garantir que Pixel browser e CAPI server não contem duas vezes | metodo-prompt | capi, dedup, event-id, pixel, server-side | paid-media | paid-media/paid-media-tracking-specialist.md:32 |

**Total: 24 capacidades (G1–G24).**

## Resumo por agente upstream

| Agente upstream | Base | Técnicas | Total |
|---|---|---|---|
| paid-media-auditor | G1 | G2, G3, G4 | 4 |
| paid-media-creative-strategist | G5 | G6, G7, G8 | 4 |
| paid-media-paid-social-strategist | G9 | G10, G11, G12 | 4 |
| paid-media-ppc-strategist | G13 | G14, G15, G16 | 4 |
| paid-media-programmatic-buyer | G17 | G18, G19 | 3 |
| paid-media-search-query-analyst | G20 | G21, G22 | 3 |
| paid-media-tracking-specialist | G23 | G24 | 2 |
| **Total** | **7** | **17** | **24** |
