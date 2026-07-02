---
name: planejamento-por-industria-seo
description: >
  Use para PLANEJAR SEO estratégico de forma industry-aware: um site novo
  ou existente ganha um plano de 4 fases (Fundação → Expansão → Escala →
  Autoridade) calibrado pelo perfil do negócio (SaaS, e-commerce, local
  service, publisher/media, agência, generic), com discovery, análise
  competitiva, arquitetura de conteúdo, foundation técnico, roadmap por
  semanas/meses e KPI targets encadeados por marco (baseline → 3m → 6m →
  12m). Também mora aqui: a tabela de roteamento enriquecida do ariadne-chief
  (que especialista + que skill dispara em cada demanda) e o guard anti-thin
  para páginas de comparação por template. Não é keyword-research (handoff
  Argos) nem copy final (handoff Caliope). Gatilhos: "plano de SEO", "SEO
  strategy", "estratégia de SEO", "roadmap SEO", "content calendar",
  "planejamento por indústria", "plano por vertical", "SEO plan SaaS/local/
  ecommerce/publisher/agência", "site novo — por onde começar", "content
  strategy". Produção material vai para `brief-de-conteudo-data-driven`;
  cluster desenhado com `arquitetura-de-site-hub-spoke`.
---

# Planejamento por Indústria (SaaS / E-commerce / Local / Publisher / Agência)

Camada estratégica sob o `ariadne-chief`: transforma "vou fazer SEO" em um plano
de 90 dias defensável, ancorado no **perfil do negócio**. Cada perfil tem
prioridades, dependências e trade-offs diferentes — planejar sem detectar o
perfil é gerar recomendação genérica que não move ponteiro.

## 1. Detecção de perfil (Rodada 0)

Antes de escrever qualquer coisa, definir o perfil:

- **SaaS / software** — assinatura, integrações, docs, features versionadas,
  ciclo de venda B2B, LTV alto, canal orgânico + paid + sales-led.
- **E-commerce** — SKUs, categorias, checkout, Merchant Center, Shopping ads,
  reviews de produto, sazonalidade forte, canal híbrido paid/orgânico.
- **Local service** — endereço físico, atendimento por região, GBP central,
  reviews decisivas, `LocalBusiness` schema, jornada híbrida Maps+SERP.
- **Publisher / media** — publicação de alta frequência, autoridade tópica,
  monetização por ads/subscription, tráfego dependente de Discover/News, Article
  schema, YMYL sob escrutínio.
- **Agência / consultancy** — portfolio, cases, autoridade do time (E-E-A-T
  pessoal), formulários de contato longos, ciclo de venda alto, LinkedIn como
  segundo canal.
- **Generic** — quando nenhum se encaixa; usar template genérico e sinalizar
  "perfil não detectado, entregável menos afiado".

Sinais para detectar: URL/homepage; presença de checkout ou "planos"; endereço
físico visível; frequência de publicação; presença de `/blog`, `/shop`, `/docs`,
`/casos-de-sucesso`; schema já presente; jornada de conversão principal.

## 2. Processo em 6 fases

### Fase 1 — Discovery (semana 1)
- Perfil do negócio (§1); público-alvo primário e secundário; 3-5 concorrentes.
- Objetivos concretos (não "aumentar tráfego"; sim "assinatura +30% em 6m").
- KPIs (§7). Restrições de budget/timeline.
- Auditoria do site atual (se existe) — health score de partida.

### Fase 2 — Análise competitiva
- Top 5 concorrentes reais (não Wikipedia/Reddit/YouTube — filtrar).
- Content strategy: publica com que cadência, sobre o quê, com que profundidade.
- Uso de schema por tipo de página.
- Configuração técnica (CWV, mobile, hreflang se aplicável).
- Sinais E-E-A-T (autor, credencial, prova social).
- Gap de keyword e de conteúdo (`analise-de-gap-de-conteudo`).
- Autoridade estimada (backlinks — handoff Argos; brand mention distribution).

### Fase 3 — Arquitetura de conteúdo
- Carregar template do perfil (§3-§6).
- Desenhar hierarquia de URL + pillars.
- Planejar internal linking (handoff `arquitetura-de-site-hub-spoke` para clusters).
- Estrutura de sitemap com quality gates aplicados (`seo-programatico-profundo`
  se rodar em escala).
- Information architecture pela jornada do usuário do perfil.

### Fase 4 — Estratégia de conteúdo
- Gaps vs. concorrente (por tipo de página).
- Tipos de página + estimativa de quantidade.
- Blog/resource topics + cadência de publicação (perfil-específica).
- Plano de E-E-A-T (bios, credenciais, sinais de experiência).
- Calendário editorial com priorização.

### Fase 5 — Foundation técnica
- Requisitos de hospedagem/performance.
- Schema plan por tipo de página (`engenharia-de-schema-executavel`).
- Baseline de CWV.
- Prontidão para AI search (`geo-ai-overviews-aprofundado`).
- Mobile-first (Google indexa exclusivamente mobile desde 5-jul-2024).

### Fase 6 — Roadmap de implementação em 4 fases

**Fase 1 — Fundação (semanas 1-4):**
- Setup técnico e infra.
- Páginas core (home, sobre, contato, serviços principais).
- Schema essencial (`Organization`, `LocalBusiness` se aplicável, `BreadcrumbList`,
  `WebSite`).
- Analytics + GSC + IndexNow.

**Fase 2 — Expansão (semanas 5-12):**
- Conteúdo primário nos pillars.
- Blog lançado com 6-12 posts iniciais.
- Internal linking construído.
- Local SEO se aplicável (GBP, NAP, citações).

**Fase 3 — Escala (semanas 13-24):**
- Desenvolvimento avançado de conteúdo por cluster.
- Link building e outreach.
- GEO / AI Overviews.
- Otimização de CWV com dados de campo (CrUX).

**Fase 4 — Autoridade (meses 7-12):**
- Thought leadership.
- PR e menções de mídia.
- Schema avançado (`Person` com `sameAs`, `Article` com `citation`).
- Ciclo contínuo de refresh de conteúdo (recência = citação em IA).

## 3. Perfil SaaS

Prioridades: docs indexáveis, comparações vs concorrentes, integrações, feature
pages, Roadmap público, changelog. Menor peso: local e imagem.

- **Home** — `Organization` + `SoftwareApplication` + `WebSite` search action.
- **Features** — uma landing por feature-chave; `Product` opcional se tiver preço.
- **Integrações** — página por integração (padrão programmatic com valor real:
  screenshot, casos de uso, setup); `Product` schema.
- **Docs** — indexação SEM canonical à home; `TechArticle` opcional.
- **Blog** — clusters por use-case + comparações (`X vs Y`, `alternativas a X`).
- **Case study** — `Article` + `Review` + `Person` (líder do caso).
- **Pricing** — `Product` + `Offer` por plano.

Cadência de blog: 4-8 posts/mês, mix informacional (60%) + comercial (40%).
KPIs: MQL orgânico, tráfego para /pricing, share em queries "vs" e "alternativa".

## 4. Perfil E-commerce

Prioridades: `Product` + `Offer` (Merchant Listings), reviews, categorias como
pillars, sazonalidade planejada, Merchant Center. Ver `seo-ecommerce`.

- **Home** — `Organization` + `WebSite` + `BreadcrumbList` global.
- **Categoria** — pillar; `BreadcrumbList` + `ItemList` opcional.
- **Produto** — `Product` + `Offer` (com `shippingDetails` e `hasMerchantReturnPolicy`
  obrigatórios) + `AggregateRating` + `Review` reais.
- **Coleção** — subcategoria; `BreadcrumbList` + narrativa curta acima da grade.
- **Blog / guide** — informacional que puxa demanda topo do funil.
- **Comparação** — "melhores X para Y" + tabela de features (não canibalizar
  com produto).

KPIs: sessões AR, CTR do Merchant Listings, add-to-cart orgânico, revenue orgânico.

## 5. Perfil Local Service

Prioridades: GBP central (verificado, categoria certa, fotos, posts), NAP
consistente, `LocalBusiness` schema, páginas de localização por unidade, reviews
com resposta pública. Ver `seo-local-e-mapas`.

- **Home** — `LocalBusiness` (matriz) + serviços destacados.
- **Serviço** — landing por serviço (`Service` schema).
- **Localização (unidade)** — `LocalBusiness` local + endereço + horário + geo +
  mapa embed + reviews da unidade. Uma URL por unidade (nunca cidade genérica sem
  presença física).
- **Blog / recursos** — informacional local ("como escolher X em [cidade]").
- **Reviews** — página agregando + `AggregateRating` com fonte real.

Cadência: 2-4 posts/mês. KPIs: chamadas via GBP, direções pedidas, formulário
por unidade, SoLV (Share of Local Voice) no geo-grid.

## 6. Perfil Publisher / Media

Prioridades: velocidade de publicação, autoridade tópica, Discover, News,
`Article` schema, autor com `Person` + `sameAs` fortes, refresh contínuo.

- **Home / seções** — `WebSite` + `Organization`; `CollectionPage` opcional.
- **Artigo** — `Article`/`NewsArticle` completo (headline ≤110 char, `image` em
  3 aspect ratios, autor, publisher, `datePublished`/`dateModified`).
- **Autor** — `Person` com `sameAs` para Wikipedia/LinkedIn/Twitter/ORCID.
- **Tópico (hub)** — pillar tópico; internal linking denso.
- **Vídeo** — `VideoObject` sempre.

Cadência: alta (4-20 posts/dia). KPIs: sessões orgânicas, Discover impressions,
citações em AI Overviews (canal alto para publisher), assinaturas.

## 7. Perfil Agência / Consultoria

Prioridades: portfolio, cases, prova de expertise, LinkedIn como canal
secundário, formulários de contato bem-otimizados. E-E-A-T pessoal do time é
DECISIVO.

- **Home** — `Organization` + `Service`.
- **Serviço** — landing por serviço (`Service` schema); prova social por serviço.
- **Case** — `Article` + `CreativeWork` opcional + `Review` do cliente.
- **Time** — `Person` por membro-chave com `sameAs` para LinkedIn.
- **Blog / insight** — thought leadership; presença em Podcasts.

Cadência: 4-6 posts/mês. KPIs: leads qualificados orgânicos, tempo por sessão,
formulários completados.

## 8. Guard anti-thin em página de comparação por template

Quando o plano prevê comparações em escala (`melhor X para Y`, `X vs Y` por
categoria), aplicar `seo-programatico-profundo` PLUS as regras específicas:

- **Cada comparação exige dado real** — feature verificável em fonte pública, preço
  com data, screenshot ou depoimento. Sem dado → não gera.
- **Rollout progressivo** — lotes de 50-100, monitorar por 2-4 semanas antes de
  expandir. Nunca 500+ de uma vez.
- **Diferenciação ≥30-40%** entre quaisquer duas páginas de comparação.
- **Revisão humana** de 5-10% de amostra.
- **Teste de valor autônomo** — "essa página valeria a pena mesmo se nenhuma
  outra similar existisse?".

Violar essas regras = risco de `scaled content abuse` (política do Google desde
mar/2024, com escalada em 2025).

## 9. Tabela de roteamento enriquecida do `ariadne-chief` (para `data/routing-catalog.yaml`)

A tabela abaixo é o roteamento **canônico** que o chief deve seguir. Escrever ou
atualizar o `data/routing-catalog.yaml` a partir desta tabela mantém a fronteira
Ariadne↔Argos↔Caliope↔Metis limpa.

| Demanda / gatilho | Frente | Especialista primário | Skill principal | Handoff de entrada | Handoff de saída |
|---|---|---|---|---|---|
| "auditar meu site" / "site audit" | SEO técnico | auditor-tecnico-seo | auditoria-tecnica-em-escala | Argos (backlinks) | Metis (medição pós-fix) |
| "por que não ranqueio" | SEO técnico | auditor-tecnico-seo | seo-tecnico-profundo | Argos (SERP) | — |
| "Core Web Vitals" / "PSI" | SEO técnico | auditor-tecnico-seo | core-web-vitals-e-performance | — | Metis (dashboard) |
| "site em React/SPA" | SEO técnico | auditor-tecnico-seo | render-js-e-spa | — | — |
| "GSC" / "Search Console" | SEO técnico | auditor-tecnico-seo | apis-google-e-indexacao | — | Metis |
| "schema" / "structured data" | Schema | engenheiro-de-schema | engenharia-de-schema-executavel | — | — |
| "esse tipo de schema ainda vale?" | Schema | engenheiro-de-schema | engenharia-de-schema-executavel | — | — |
| "otimizar essa página" | On-page | estrategista-de-conteudo-seo | otimizacao-on-page-por-intencao | Argos (intenção) | Caliope (copy) |
| "brief de conteúdo" | On-page | estrategista-de-conteudo-seo | brief-de-conteudo-data-driven | Argos (SERP) | Caliope (copy) |
| "qualidade de conteúdo" / "E-E-A-T" | Conteúdo | estrategista-de-conteudo-seo | qualidade-de-conteudo-eeat | — | Caliope |
| "gap de conteúdo" / "X vs Y" | Conteúdo | estrategista-de-conteudo-seo | analise-de-gap-de-conteudo | Argos (SERP) | Caliope |
| "SEO em escala" / "programmatic" | Conteúdo | estrategista-de-conteudo-seo | seo-programatico-profundo | Argos (demanda) | Caliope + Metis |
| "AI Overviews" / "GEO" / "ChatGPT" | AI-SEO | otimizador-ai-seo | geo-ai-overviews-aprofundado | Argos (menções) | Caliope + Metis |
| "arquitetura" / "cluster" / "hub-spoke" | Arquitetura | arquiteto-de-site | arquitetura-de-site-hub-spoke | Argos (SERP) | brief-de-conteudo-data-driven |
| "plano de SEO por indústria" | Estratégia | ariadne-chief | planejamento-por-industria-seo | Argos (concorrência) | todos os especialistas |
| "SEO local" / "GBP" / "map pack" | Local | ariadne-chief (por ora) | seo-local-e-mapas | Argos (SERP local) | Caliope + Metis |
| "SEO internacional" / "hreflang" | i18n | auditor-tecnico-seo | seo-internacional-hreflang | Argos | Caliope |
| "e-commerce" / "Merchant Center" | E-commerce | engenheiro-de-schema + estrategista | seo-ecommerce | Argos (marketplace) | Caliope + Metis |
| "drift de SEO" / "baseline" | Monitoramento | auditor-tecnico-seo | monitoramento-de-drift-seo | — | Metis |
| "SXO" / "mismatch de tipo de página" | Ponte SEO/CRO | analista-de-cro + arquiteto-de-site | sxo-search-experience | Argos (SERP) | Caliope |
| "SEO de imagem" | Imagem | auditor-tecnico-seo | seo-de-imagens | Aglaia (geração) | Caliope |
| "FLOW" / "método guiado por evidência" | Método | ariadne-chief | framework-flow | — | orquestra internos |
| "relatório PDF/HTML" | Saída | ariadne-chief | relatorios-de-seo | análises internas | Metis (dashboard) |

## 10. Templates de entregável

- `SEO-STRATEGY.md` — plano completo consolidado.
- `COMPETITOR-ANALYSIS.md` — insights competitivos por concorrente.
- `CONTENT-CALENDAR.md` — roadmap editorial com prioridade.
- `IMPLEMENTATION-ROADMAP.md` — plano faseado com semana/mês.
- `SITE-STRUCTURE.md` — hierarquia de URL e arquitetura de informação.

## 11. KPI targets (esqueleto encadeado)

| Métrica | Baseline | 3 meses | 6 meses | 12 meses |
|---|---|---|---|---|
| Tráfego orgânico | [medido] | +30% (foundation) | +80% | +200% |
| Keywords ranqueadas top-10 | [medido] | +25 | +80 | +200 |
| Páginas indexadas | [medido] | +N (core) | +N (expansão) | +N (escala) |
| CWV Good (mobile) | [medido %] | 75% | 85% | 90%+ |
| Citações em AI (menções + AI Overviews) | [medido] | presença estabelecida | 3-5 marcas/query pool | canal de aquisição declarado |
| Backlinks de domínios únicos | [medido — Argos] | +N | +N | +N |

Ajustar por perfil (publisher tem cadência 10× de e-commerce; local mede por
unidade). Rotular metas de perfil-específico como **hipótese** até ter dado real.

## 12. Erros comuns em planejamento por indústria

- **Rodar plano genérico onde o perfil pedia SaaS/local/publisher específico** —
  o plano genérico sobra em tudo e falta no que importa.
- **Prometer keyword sem verificar volume** — Argos deve confirmar; sem confirmação
  é hipótese.
- **Ignorar sazonalidade** (e-commerce sem calendário de black friday e datas
  comemorativas do vertical; publisher sem ciclo eleitoral/eventos).
- **Prometer #1 em keyword head sem plano de autoridade** — head demora 6-18 meses.
- **Programmatic sem quality gate** — receita comum de penalização em 2025.
- **Ignorar GBP em local** — perde 40-60% de tráfego local que nunca chega ao site.

## Handoffs e regras Kolden

- **ariadne-chief** (dono): esta skill é a estratégica dele; o chief roteia com
  base na tabela §9.
- **Argos** (entrada): SERP, volume, dificuldade, concorrência, backlinks,
  menções. Nunca inventar volume; sempre "medido X" ou "hipótese".
- **arquitetura-de-site-hub-spoke** (interno): quando o plano vira cluster.
- **brief-de-conteudo-data-driven** (interno): quando o plano vira brief por post.
- **Caliope** (saída): copy de cada landing/post.
- **Metis** (saída): dashboard de KPIs, ROI orgânico, atribuição.
- **Aglaia** (saída): identidade visual das landings, image assets.
- **Themis** (saída): revisão de compliance/LGPD em publisher/YMYL.
- **VETO — recomendação sem dado**: cada KPI target vem com origem (baseline
  medida, benchmark de mercado, ou hipótese rotulada).
- **VETO — perfil inventado**: se sinal insuficiente para decidir SaaS/local/etc.,
  usar `generic` e sinalizar.

---
## Atribuição
Princípios extraídos de `AgriciDaniel/claude-seo@d830cdb` (skills `seo-plan`,
`seo-competitor-pages`, `seo-programmatic`, `seo/SKILL.md` (routing table),
autor AgriciDaniel; `assets/saas.md`/`local-service.md`/`ecommerce.md`/
`publisher.md`/`agency.md`/`generic.md`; licença MIT). Reescrito em PT-BR para
a Kolden, sem cópia literal. Templates por indústria complementados por padrão
de mercado (HubSpot SaaS content model, Ahrefs Programmatic guardrails, Google
Search Central retail requirements).
