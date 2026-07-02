# Catálogo de Habilidades — Peitho

Índice das habilidades do squad Peitho (paid media / tráfego pago).

**Estrutura recém-criada:** este é o esqueleto `.claude/skills/` de Peitho, inaugurado em
2026-07-01 com 8 skills F6 do bucket B02 (paid-media do agency-agents). Antes disso, Peitho
operava só com `agents/` + `tasks/`. A partir desta versão, cada especialista pode acionar as
habilidades listadas abaixo por gatilho.

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `auditoria-forense-200-checkpoints` | "auditar conta de anúncios", "conta herdada", "onde está sangrando dinheiro", "auditoria forense", "quanto dinheiro estamos perdendo", "why did performance drop", "change history de conta Ads" | Checklist forense de 200+ pontos em 8 categorias (Estrutura / Público / Criativo / Orçamento / Rastreio / Funil / Change History / Compliance) com severidade (crítico/alto/médio/baixo) e impacto quantificado em $/mês. Anti-diagnóstico raso — cada achado exige evidência + recomendação + prioridade |
| `criativo-como-hipotese-rsa-pmax` | "criar RSA", "responsive search ad", "PMax", "Performance Max", "criativos de search/PMax", "pin strategy", "asset group", "ângulos de PMax", "criativo é hipótese testável" | Tratar criativo paid como hipótese testável — RSA com 15 headlines / 4 descriptions + pin strategy calibrada (não pin de tudo), asset groups do PMax por tema/ângulo, matriz de teste de hooks para PMax vídeo, ciclo de validação por conversão. Handoff copy da headline = Caliope |
| `paid-social-cross-platform` | "campanha paid social multi-plataforma", "full-funnel", "Meta+LinkedIn+TikTok", "canibalismo entre plataformas", "supressão de audiência", "cross-platform audience", "orçamento entre canais" | Full-funnel em Meta, LinkedIn, TikTok, Pinterest, X (Twitter Ads), Snap — matriz de plataforma × estágio, supressão cruzada de audiência (evitar canibalismo), split de budget por eficiência marginal, cadência de teste por plataforma |
| `incrementalidade-cross-channel` | "incrementalidade", "lift test", "geo split", "holdout", "matched market", "quanto realmente incremental", "esse canal traz venda nova?", "cross-channel attribution", "meta-analysis de campanhas" | Validação de incrementalidade entre canais (social ↔ search / display / DOOH) — desenho de geo-split, holdout puro, matched market, poder estatístico mínimo, leitura de resultado por lift em conversão base vs pausa. Handoff estatístico profundo = Metis |
| `arquitetura-enterprise-ppc` | "estrutura de conta enterprise", "PPC $10K a $10M/mês", "brand / non-brand / competitor / conquest", "match type isolation", "SKAG modern", "shared budgets", "conta enterprise Google Ads" | Arquitetura de conta PPC enterprise ($10K-$10M/mês) — tier de campanhas Brand / Non-brand / Competitor / Conquest / Prospecting / Remarketing; isolamento por match type; shared budgets; convenção de nomes escalável; naming schema para reporting |
| `programatica-e-display` | "GDN", "DV360", "The Trade Desk", "TTD", "programática", "ABM programático", "partner media", "AMP", "managed placements", "display network", "vertical media" | Programática e display — GDN / DV360 / TTD / partner media, ABM (account-based marketing) via bidstream, Advanced Match Placements (AMP 25+ parceiros), managed placements por vertical (SaaS / e-com / DTC / healthcare / finance), targeting inventarial. Handoff conteúdo criativo = Caliope + Aglaia |
| `search-query-analise` | "SQR", "search query report", "análise de busca", "termos que dispararam", "n-gram", "negativas em escala", "keyword intent", "query mining", "SQOS framework" | Mineração de Search Query Report (Google / Bing / Amazon) — n-gram analysis, taxonomia de intent (informational / navigational / transactional / commercial), pipeline de negativas em escala, framework SQOS (Search Query Optimization Score), gatilho para expansão de keyword |
| `amazon-ppc` | "Amazon PPC", "Amazon Ads", "Sponsored Products", "Sponsored Brands", "Sponsored Display", "ACOS / TACOS", "listing profitability", "launch phase Amazon", "dayparting Amazon" | Amazon PPC fásico em 3 estágios (Launch / Growth / Mature) com ACOS/TACOS targets por fase, isolamento de match type, negative keyword pipeline, dayparting por conversion rate horária, cross-campaign structure (SP + SB + SD) |

## Fronteiras inter-squad declaradas

- **Copy de anúncio (headline, description, CTA)** — Peitho **não** escreve copy. Handoff:
  **Caliope** (`anuncio-por-estagio-de-consciencia`, `headline-e-hook-testaveis`).
- **Design visual do criativo** — Peitho **não** desenha. Handoff: **Aglaia**.
- **Orgânico / social não-pago** — Peitho **não** faz. Handoff: **Pheme**.
- **Estatística profunda de incrementalidade / atribuição multi-touch** — Peitho leva até o
  desenho e a leitura do teste. Modelagem avançada = **Metis**.
- **Segredos e credenciais de plataformas de ads** — via **Infisical** (Art. VII).
