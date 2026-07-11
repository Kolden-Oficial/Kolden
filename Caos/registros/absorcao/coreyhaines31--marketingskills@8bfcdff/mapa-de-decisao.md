---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/coreyhaines31--marketingskills@8bfcdff/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/coreyhaines31--marketingskills@8bfcdff/relatorio-de-perda|relatorio-de-perda]]"
  - "[[Caos/registros/absorcao/coreyhaines31--marketingskills@8bfcdff/seguranca|seguranca]]"
---

# F4 — Mapa de decisão (REUSE / ADAPT / CREATE) — coreyhaines31/marketingskills@8bfcdff

> Pipeline de absorção, Fase 4 (INFO). Para cada ID do `inventario-de-capacidades.md`, uma decisão
> contra o `registro-de-entidades.yaml` + conteúdo real dos squads. Data: 2026-06-24.
>
> **Regra anti-carimbo (Constituição Art. VIII):** REUSE só com **diff técnica-a-técnica** — cada
> técnica precisa de match citado por arquivo numa capacidade existente. Sem match citado → ADAPT ou
> CREATE. Foi exatamente o "copy = REUSE Caliope" sem prova que gerou a perda silenciosa do G21.
>
> Estas são decisões de **mapeamento** (REUSE/ADAPT/CREATE). A **disposição** final
> (ABSORVIDO/DESCARTADO/PERDIDO) vai para o `relatorio-de-perda.md` (F6.5), só após o build aprovado.
> Nenhum nome de squad novo é fixado aqui — naming é da Rodada 0 do Ritual.

## Decisão por capacidade

| ID | decisão | squad/destino-alvo | base (evidência ou lacuna) |
|----|---------|--------------------|----------------------------|
| G1 | DECOMPOSTO | — | "45 skills" é guarda-chuva; a decisão real vive nos G2–G22 + domínio SEO (abaixo). Absorver o conjunto = absorver suas partes. |
| G2 | ADAPT | Caos (cascata de qualidade) + squads | Kolden tem maturity score (`testador`, ≥7.0) mas **não** `evals.json` por skill. Adaptar o padrão de suíte de avaliação por habilidade. |
| G3 | ADAPT | `criacao-de-skill` + squads | Padrão `references/` sob demanda; alinhar o template de skill da Kolden para carregar refs profundas. |
| G4 | ADAPT (padrão) / DESCARTADO (código literal) | `sobre-a-empresa/Ferramentas/` + Argos `motor/` | Absorver o **padrão** de CLI zero-dep (G5), não os 64 `.js` literais. CLIs úteis podem ser vendorizados seletivamente sob nova decisão. |
| G5 | ADAPT | convenção de tooling/MCP da Kolden | Padrão `--dry-run` + auth por env + saída JSON + fetch nativo — bom contrato para CLIs/MCPs próprios. |
| G6 | ADAPT | `sobre-a-empresa/Ferramentas/ferramentas.md` | Matriz API/MCP/CLI/SDK de ~90 tools enriquece o catálogo da Kolden (hoje ~30 tools). |
| G7 | ADAPT | `sobre-a-empresa/Ferramentas/` | 93 guias de integração: importar os que faltam ao catálogo (endpoints/auth/operações), reescritos em pt-BR. |
| G8 | ADAPT (entrada de catálogo) | `Ferramentas/` + `mcp-status.md` | Composio (MCP para OAuth-heavy) é tool externa: registrar no catálogo; não é código a absorver. |
| G9 | ADAPT (entrada de catálogo, baixa prioridade) | `Ferramentas/` | Cogny (MCP federado marketing-only): registrar como opção; nicho. |
| G10 | DESCARTADO | — | `marketplace.json` de plugin do Claude Code — a Kolden não publica plugin marketplace. Fora de escopo (registrar motivo na F6.5). |
| G11 | ADAPT (padrão de spec) / DESCARTADO (`validate-skills-official.sh`) | `criacao-de-skill` checklist | Padrão de conformância à spec → ADAPT (ver G15). `validate-skills-official.sh` = DESCARTADO por segurança (git clone + pip sem pin, F2 CRÍTICO). |
| G12 | ADAPT (conceito, baixa prioridade) | reflexo Caos (repos vendorizados) | "Check updates 1×/sessão" pode virar reflexo de manutenção de vendors; conceito registrado. |
| G13 | DESCARTADO (literal) / ADAPT (conceito seguro) | — / convenção de contexto | Injeção `` !`cmd` `` literal = RCE (F2 ALTO) → DESCARTADO. O **conceito** (auto-injetar contexto de produto) → ADAPT de forma segura (ler arquivo via ferramenta, não execução embutida). |
| G14 | ADAPT | carregamento de contexto da Kolden | Convenção `.agents/product-marketing.md` → mapear ao "cérebro" `sobre-a-empresa/` lido antes de perguntar. |
| G15 | ADAPT | `criacao-de-skill` (regras) | Limites da spec Agent Skills (name 1-64, description 1-1024 com trigger phrases, SKILL.md <500 linhas) — alinhar o checklist da Kolden; overlap parcial, não REUSE puro. |
| G16 | ADAPT | `catalogo-de-roteamento.yaml` / roteamento de squad | Grafo de cross-ref entre skills (fronteiras de escopo) → padrão para o roteamento por keywords dos squads. |
| G17 | ADAPT | `Ferramentas/` (recomendações) | Heurísticas "Agent recommendation" por categoria → seção de recomendação por categoria no catálogo. |
| G18 | ADAPT (Argos) + CREATE (tools no catálogo) | **Argos** (`web-harvester`/`market-sizer`) | Argos tem descoberta via GitHub e perfilamento de empresa (Apollo citado em `REGISTRY.md:314`), mas **não** o pipeline stargazers→filtrar company→Apollo/Hunter→Truelist. Documentar a rota + Apollo/Hunter/Truelist faltam no catálogo Kolden = CREATE. |
| G19 | ADAPT (Argos) + CREATE (Truelist no catálogo) | **Argos** (`compliance-sentinela`) | Estados de validação de email (Truelist) → adaptar ao fluxo de prospecção; Truelist não está em `ferramentas.md` = CREATE da entrada. |
| G20 | ADAPT | `mcp-status.md` | Mapa de 14 tools MCP-enabled enriquece o `mcp-status.md` (vários já conectados: GA4, exa; faltam google-ads, stripe, mailchimp, resend, clay, zoominfo…). |
| G21 | **ADAPT (Caliope) — itemizado** | **Caliope** (+ nova skill de copy-frameworks) | Mata o carimbo. Sub-disposições verificadas técnica-a-técnica abaixo. |
| G22 | CREATE / ADAPT | novo squad SEO+CRO **ou** agente CRO no Caliope | CRO **de página** (value-prop→fricção, form optimization, biblioteca de experimentos) é lacuna; só CTA-testing tem REUSE (Joanna Wiebe). Ver itemização abaixo. |

## Domínio SEO (decomposição do G1) — a lacuna real = CREATE

As skills `ai-seo`, `programmatic-seo`, `seo-audit`, `schema`, `site-architecture`, `aso` (parte das 45
do G1) **não têm cobertura de execução** em nenhum squad. Argos **descobre** SEO (SERP, keywords,
backlinks via `serp-seo-cartografo`) mas **não executa** otimização técnica/on-page/programática.

| Skill (fonte) | decisão | base |
|---|---|---|
| ai-seo (otimização p/ AI search) | CREATE | Argos audita SERP; ninguém otimiza para citação em LLMs |
| seo-audit (técnico + on-page) | CREATE | nenhum squad faz crawl errors / Core Web Vitals / indexabilidade |
| programmatic-seo (conteúdo em escala) | CREATE | Caliope escreve copy, Pheme social; ninguém faz templating SEO em escala |
| schema (JSON-LD) | CREATE | nenhum squad implementa dados estruturados |
| site-architecture (siloing/internal links) | CREATE | Argos mapeia link externo; ninguém desenha IA/topical clusters |
| aso (App Store Optimization) | CREATE (baixa prioridade) | fora do foco atual da Kolden |

→ **Recomendação:** novo **squad de SEO de execução** via Ritual (nome definido na Rodada 0). É a lacuna
que o ledger já anotava ("SEO = CREATE"). Confirma a aprovação prévia do Ronan, agora fundamentada por ID.

## G21 — verificação técnica-a-técnica (o vetor da perda silenciosa)

| técnica (fonte na quarentena) | decisão | evidência na Kolden / lacuna |
|---|---|---|
| Voice-of-customer mirroring (`copy-frameworks.md:46`) | **REUSE** | `Caliope/copy-master/` — consciência de mercado (Schwartz) + análise de linguagem do cliente (match citado) |
| CTA formula `[verbo]+[benefício]+[qualificador]` (`SKILL.md:161`) | **REUSE** | `Caliope/copy-master/agents/joanna-wiebe.md` (conversion copy + CTA testing) |
| Fórmulas de headline (13) (`copy-frameworks.md:11-75`) | **ADAPT** | encarnadas nos agentes (Schwartz/Halbert/Hopkins) mas **sem tabela comparativa** indexada → adicionar índice |
| Guias page-specific (6 tipos) (`SKILL.md:171-197`) | **ADAPT** | Caliope tem agentes de funil/oferta, **sem templates estruturados por tipo de página** |
| 13 tipos de seção de landing (`copy-frameworks.md:103-209`) | **ADAPT** | sem catálogo de blocos construtivos de página no Caliope |
| Natural transitions + tells de IA (`natural-transitions.md`) | **CREATE** | nenhum squad cobre transições naturais / detecção de texto "cara de IA" |

→ **G21 = ADAPT no Caliope** (não REUSE em bloco): 2 técnicas REUSE provadas + 3 ADAPT + 1 CREATE.
Cada uma vira linha no `relatorio-de-perda.md` quando o build rodar.

## G22 — verificação técnica-a-técnica

| técnica (fonte) | decisão | evidência / lacuna |
|---|---|---|
| Teste de CTA (placement + copy) | **REUSE** | `Caliope/copy-master/agents/joanna-wiebe.md` |
| Framework CRO 8-pontos (value-prop→fricção) | **ADAPT/CREATE** | Peitho otimiza anúncios, não páginas; framework de página é lacuna |
| Biblioteca de experimentos (30+ por tipo de página) | **CREATE** | nenhum catálogo de hipóteses de CRO de página |
| Form optimization (campos, erros, multi-step, abandono) | **CREATE** | nenhuma cobertura de CRO de formulário |

## Catálogo de ferramentas (G5–G20, transversal) — ADAPT + CREATE

REUSE já cobertos: Firecrawl, Browserbase, GA4, GitHub, Search Console, Stripe.
ADAPT (enriquecer `sobre-a-empresa/Ferramentas/`): +40 tools de marketing (analytics, email, SMS, ads,
enrichment) com a matriz do `REGISTRY.md`.
CREATE (entradas novas no catálogo + Infisical): SEO stack (Semrush/Ahrefs/GSC-avançado), CRM (HubSpot),
email (SendGrid/Postmark/Resend), SMS (Twilio), enrichment (Apollo/Clay/ZoomInfo), Truelist.

## Síntese
- **REUSE genuíno (provado por técnica):** subconjuntos do G21 (VoC, CTA) e do G22 (CTA-testing); tools já no catálogo (G5–G20 parcial).
- **ADAPT:** G2, G3, G5, G6, G7, G8, G14, G15, G16, G17, G18, G19, G20, **G21 (Caliope)**; G4/G9/G12 parciais.
- **CREATE:** domínio **SEO de execução** (novo squad via Ritual) e **CRO de página** (G22) — as duas lacunas reais; + entradas novas de ferramentas.
- **DESCARTADO:** G10 (marketplace de plugin, fora de escopo); `validate-skills-official.sh` (G11, segurança); implementação literal de `` !`cmd` `` (G13, segurança).
- **Carimbo de domínio eliminado:** "copy já é REUSE" foi rebaixado a ADAPT itemizado no G21; G18/G22 saíram de "silencioso" para disposição explícita.
