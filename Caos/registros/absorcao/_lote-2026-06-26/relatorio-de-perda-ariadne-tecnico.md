---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Reconciliação F6.5 — bucket Ariadne · SEO técnico profundo

- **squad-alvo:** Ariadne (`C:/Kolden/Ariadne/`)
- **repo-fonte:** `AgriciDaniel/claude-seo@d830cdb2ad339bb7f062339fe82228b072e98061` · licença **MIT** (prompts FLOW = CC BY 4.0)
- **bucket:** SEO técnico profundo (auditoria em escala, técnico profundo, performance/CWV, relatórios). Backlinks → Argos; SSRF → Égide; image-gen → Aglaia (fora deste bucket).
- **invariante:** count(ABSORVIDO)+count(DESCARTADO)+count(DIFERIDO-INCREMENTAL) == IDs do bucket. **PERDIDO=0**.

## Habilidades criadas (6, todas em `C:/Kolden/Ariadne/.claude/skills/`)
1. `auditoria-tecnica-em-escala/SKILL.md`
2. `seo-tecnico-profundo/SKILL.md`
3. `render-js-e-spa/SKILL.md`
4. `core-web-vitals-e-performance/SKILL.md`
5. `apis-google-e-indexacao/SKILL.md`
6. `relatorios-de-seo/SKILL.md`

## Âncoras ABSORVIDAS (IDs do bucket técnico)

| repo | ID | disposicao | destino |
|---|---|---|---|
| claude-seo | G2 (auditoria de site, fan-out até 15 subagentes) | ABSORVIDO | `auditoria-tecnica-em-escala` |
| claude-seo | G3 (análise profunda de página única) | ABSORVIDO | `auditoria-tecnica-em-escala` |
| claude-seo | G4 (SEO técnico em 9 categorias) | ABSORVIDO | `seo-tecnico-profundo` |
| claude-seo | G8 (análise/geração de sitemap XML) | ABSORVIDO | `seo-tecnico-profundo` |
| claude-seo | G38 (scanners de risco/lint: parasite/GBP/IPTC/UCP/domínio) | ABSORVIDO | `seo-tecnico-profundo` |
| claude-seo | G35 (pipeline fetch/render SPA-aware + visual + a11y tree) | ABSORVIDO | `render-js-e-spa` |
| claude-seo | G30 (Core Web Vitals: PSI/CrUX, LCP subparts, preload/bfcache) | ABSORVIDO | `core-web-vitals-e-performance` |
| claude-seo | G17 (APIs Google: GSC/PSI/CrUX/Indexing/GA4 — split) | ABSORVIDO | `apis-google-e-indexacao` (+ CWV→performance) |
| claude-seo | G31 (GSC + URL Inspection + Indexing API + IndexNow) | ABSORVIDO | `apis-google-e-indexacao` |
| claude-seo | G33 (gerador de relatório PDF/HTML + auto-revisão + priorização) | ABSORVIDO | `relatorios-de-seo` |

Cobertura transversal: `G41` (thinking-framework de 10 princípios) e `cwv-thresholds` foram extraídos como **método embutido** nas skills acima (síntese anti-achismo na auditoria; tabela de thresholds na de performance) — não viraram skill própria.

## INCREMENTAL (não aplicado nesta leva)

### Diferidos — fora do bucket técnico (pertencem a OUTRO bucket/F6 da mesma absorção, mesmo squad Ariadne)
| repo | ID | disposicao | motivo |
|---|---|---|---|
| claude-seo | G1 (orquestrador/roteamento) | DIFERIDO-INCREMENTAL | enriquece o `ariadne-chief` (CLAUDE.md/routing), não é skill de bucket técnico |
| claude-seo | G5 (E-E-A-T / content quality) | DIFERIDO-INCREMENTAL | bucket de conteúdo → `estrategista-de-conteudo-seo` |
| claude-seo | G6 (content brief) | DIFERIDO-INCREMENTAL | bucket de conteúdo |
| claude-seo | G7 (schema JSON-LD detecção/geração) | DIFERIDO-INCREMENTAL | `engenheiro-de-schema` |
| claude-seo | G10 (GEO/AI search) | DIFERIDO-INCREMENTAL | `otimizador-ai-seo` |
| claude-seo | G13 (planejamento estratégico por indústria) | DIFERIDO-INCREMENTAL | bucket estratégia |
| claude-seo | G14 (programmatic SEO) | DIFERIDO-INCREMENTAL | bucket de conteúdo |
| claude-seo | G15 (competitor pages) | DIFERIDO-INCREMENTAL | bucket de conteúdo/concorrência |
| claude-seo | G19 (cluster por SERP-overlap) | DIFERIDO-INCREMENTAL | `arquiteto-de-site` (arquitetura) |
| claude-seo | G32 (APIs de dados Google: GA4 produto, NLP, KW Planner) | DIFERIDO-INCREMENTAL | split já refletido: GA4-produto→Metis, KW Planner→Argos; só a fatia orgânico/indexação entrou aqui |
| claude-seo | G36 (qualidade/humanização/citation-gap executável) | DIFERIDO-INCREMENTAL | pré-copy → conteúdo (handoff Caliope na copy final) |
| claude-seo | G37 (geração/validação de schema executável) | DIFERIDO-INCREMENTAL | `engenheiro-de-schema` |
| claude-seo | G39 (wrappers Unlighthouse/DataForSEO/FLOW-sync) | DIFERIDO-INCREMENTAL | tooling de squad; provisionar com as extensões (G49) |
| claude-seo | G40 (reflexo PostToolUse de validação de schema) | DIFERIDO-INCREMENTAL | é reflexo, não skill; absorver na camada de reflexos da Ariadne |
| claude-seo | G42/G44/G47/G48 (references: APIs Google, schema depreciado, GEO/ecommerce/cluster, updates Google) | DIFERIDO-INCREMENTAL | viram `data/` da Ariadne / insumo do vigia — não skill |

### Já cobertos por skills pré-existentes da Ariadne (absorção anterior, não reabertos)
G9→`seo-de-imagens` · G11/G12→`seo-local-e-mapas` · G16→`seo-internacional-hreflang` · G20→`sxo-search-experience` · G21/G34→`monitoramento-de-drift-seo` · G22→`seo-ecommerce` · G23/G43→`framework-flow`.

### Descartados do escopo Ariadne (outro squad — fora deste relatório, registrados no mapa-de-decisao)
| repo | ID | disposicao | motivo |
|---|---|---|---|
| claude-seo | G18, G29 (backlinks: Moz/Bing/Common Crawl + engine) | DESCARTADO (deste squad) | **coleta** → handoff **Argos** |
| claude-seo | G27 (SSRF/DNS-pinning, url_safety) | DESCARTADO (deste squad) | segurança cross-cutting → **Égide** |
| claude-seo | G25 (geração de imagem IA, Banana) | DESCARTADO (deste squad) | criação visual → **Aglaia** |
| claude-seo | G24, G49 (DataForSEO / 8 extensões vendor) | DIFERIDO-INCREMENTAL | vendor inerte; provisionar credenciais no Infisical quando ativar |
| claude-seo | G26 (frota de 18 subagentes) | DIFERIDO-INCREMENTAL | materializar como especialistas da Ariadne (camada `agents/`), não skill |
| claude-seo | G28 (gestão de credenciais Google) | ABSORVIDO (parcial) | reescrito **sobre Infisical** dentro de `apis-google-e-indexacao` |

## Nota
- **Sobreposições resolvidas:** CWV aparece em G17/G30/G4 → consolidado numa skill única
  (`core-web-vitals-e-performance`), com `seo-tecnico-profundo` só fazendo o flag de presença e
  referenciando-a. Render JS/SPA aparece em G4/G35 → extraído para skill própria (`render-js-e-spa`),
  referenciada pelas demais. Indexação (IndexNow em G4; Indexing API em G31) → submissão centralizada
  em `apis-google-e-indexacao`. Nenhuma técnica foi duplicada em duas skills.
- **Licença:** MIT — princípios reescritos em PT-BR, sem cópia literal; atribuição
  (owner/repo@sha + licença) no rodapé de cada SKILL.md. Nenhum prompt FLOW (CC BY 4.0) entrou neste
  bucket (FLOW já vive em `framework-flow`).
- **Catálogo:** `Ariadne/.claude/skills/catalogo.md` **não** foi tocado (consolidação centralizada
  pós-leva, conforme instrução). As 6 entradas novas a adicionar: `auditoria-tecnica-em-escala`,
  `seo-tecnico-profundo`, `render-js-e-spa`, `core-web-vitals-e-performance`, `apis-google-e-indexacao`,
  `relatorios-de-seo`.
- **PERDIDO = 0.**
