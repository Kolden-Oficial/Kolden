---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# F6.5 — Relatório de reconciliação (sem perda) — squad Ariadne

- **squad-alvo:** Ariadne (SEO+CRO) · `C:/Kolden/Ariadne/`
- **repo absorvido:** `AgriciDaniel/claude-seo@d830cdb` · rota A · licença **MIT** (framework FLOW = **CC BY 4.0**)
- **leva:** `_lote-2026-06-26` · **data:** 2026-06-27
- **inventário-fonte:** 49 capacidades (G1–G49) em `registros/absorcao/AgriciDaniel--claude-seo/inventario-de-capacidades.md`
- **modo:** BENCHMARK-ouro — selecionadas 7 âncoras de frente NOVA (que a Ariadne não tinha); o resto registrado, nada perdido.

## Invariante de não-perda
`count(ABSORVIDO) + count(DESCARTADO) + count(DIFERIDO-INCREMENTAL) = count(inventário)`
**10 + 6 + 33 = 49.** **PERDIDO = 0.**

> Convenção deste relatório (escopo-squad): **DESCARTADO** = fora do escopo da Ariadne, **roteado a outro squad/bucket** (handoff), não descartado do lote. **DIFERIDO-INCREMENTAL** = pertence à Ariadne mas já tem dono/esqueleto ou é build maior (tooling executável, bibliotecas de referência densas) adiado para leva futura.

## ABSORVIDO — 7 âncoras (10 IDs)

| repo | ID | disposicao | destino |
|---|---|---|---|
| claude-seo | G11 | ABSORVIDO | `.claude/skills/seo-local-e-mapas/SKILL.md` (SEO local no site) |
| claude-seo | G12 | ABSORVIDO | `.claude/skills/seo-local-e-mapas/SKILL.md` (inteligência de mapas/geo-grid — fundido com G11) |
| claude-seo | G16 | ABSORVIDO | `.claude/skills/seo-internacional-hreflang/SKILL.md` |
| claude-seo | G45 | ABSORVIDO | `.claude/skills/seo-internacional-hreflang/SKILL.md` (princípio dos perfis culturais/paridade; dados densos diferidos) |
| claude-seo | G22 | ABSORVIDO | `.claude/skills/seo-ecommerce/SKILL.md` |
| claude-seo | G21 | ABSORVIDO | `.claude/skills/monitoramento-de-drift-seo/SKILL.md` |
| claude-seo | G20 | ABSORVIDO | `.claude/skills/sxo-search-experience/SKILL.md` |
| claude-seo | G46 | ABSORVIDO | `.claude/skills/sxo-search-experience/SKILL.md` (princípio persona/user-story/wireframe; dados densos diferidos) |
| claude-seo | G9  | ABSORVIDO | `.claude/skills/seo-de-imagens/SKILL.md` |
| claude-seo | G23 | ABSORVIDO | `.claude/skills/framework-flow/SKILL.md` (modelo de estágios; prompts CC-BY não copiados, crédito preservado) |

Sobreposições resolvidas: **G11+G12 fundidos numa só skill** (local-no-site vs mapas-nas-plataformas, com fronteira explícita); **G45→hreflang** e **G46→SXO** dobrados como princípio nas skills-âncora, sem skill duplicada.

## DESCARTADO (Ariadne) — handoff a outro squad/bucket (6 IDs)

| repo | ID | disposicao | destino |
|---|---|---|---|
| claude-seo | G18 | DESCARTADO | **Argos** — perfil de backlinks é COLETA, não pertence à Ariadne (handoff de entrada) |
| claude-seo | G29 | DESCARTADO | **Argos** — engine de backlinks (Moz/Bing/Common Crawl/verificação) |
| claude-seo | G27 | DESCARTADO | **Égide** — módulo SSRF/DNS-pinning é segurança cross-cutting |
| claude-seo | G25 | DESCARTADO | **Aglaia** — geração de imagem IA (criação visual/branding) |
| claude-seo | G49 | DESCARTADO | **bucket Vendors** — 8 extensões MCP/CLI (Ahrefs/DataForSEO/Firecrawl/Profound/SE Ranking/Unlighthouse/Banana/Bing) |
| claude-seo | G32 | DESCARTADO | **split cross-squad** — GA4→Metis, Keyword Planner→Argos; porção NLP/entidades fica como incremental do conteúdo Ariadne |

## INCREMENTAL (não aplicado nesta leva) — 33 IDs

Pertencem à Ariadne, mas já têm especialista/esqueleto (apenas aprofundamento) ou são build maior adiado. Motivo resumido por grupo:

**Aprofundamento de especialista já existente (prosa → método profundo):**
- `G2` (auditoria com até 15 subagentes em paralelo), `G3` (análise de página única), `G4` (9 categorias técnicas), `G8` (sitemap XML), `G35` (fetch/render SPA-aware) → `auditor-tecnico-seo`.
- `G5` (E-E-A-T/thin), `G6` (content brief), `G36` (qualidade/humanização/citation-gap executável) → `estrategista-de-conteudo-seo`.
- `G7` + `G37` (geração/validação executável de schema), `G44` (tipos de schema depreciados 2024-2026) → `engenheiro-de-schema`.
- `G10` (GEO/AI Overviews aprofundado) → `otimizador-ai-seo`.
- `G19` (cluster por SERP-overlap, hub-and-spoke) → `arquiteto-de-site`.
- `G13` (planejamento por indústria, 6 perfis), `G14` (templates + guarda anti-thin), `G15` (páginas de comparação de concorrentes), `G1` (enriquecimento da tabela de roteamento do chief — **parcial já feito** no `catalogo.md`/skills novas; reescrita completa do `routing-catalog.yaml` adiada).

**Tooling executável (exige reescrita sobre Infisical + build de scripts) — adiado:**
- `G17` (skill de APIs Google GSC/PSI/CrUX/Indexing/GA4), `G24` (provisionar DataForSEO ao vivo), `G28` (gestão de credenciais Google → reescrever sobre Infisical), `G30` (Core Web Vitals via PSI/CrUX/LCP subparts), `G31` (GSC + Indexing/IndexNow), `G33` (gerador de relatório PDF/HTML), `G34` (engine de drift executável: baseline SQLite + 17 regras — **princípio já absorvido** na skill G21; o executável fica adiado), `G38` (scanners de risco/lint), `G39` (wrappers Unlighthouse/DataForSEO/FLOW-sync), `G40` (reflexo PostToolUse de validação de schema), `G26` (materializar a frota de 18 subagentes como especialistas).

**Bibliotecas de referência densas (dados com fonte — provisionar em `data/`) — adiado:**
- `G41` (referência SEO core: E-E-A-T/CWV/quality-gates), `G42` (referências de APIs Google/rate-limits), `G43` (biblioteca de ~41 prompts FLOW — **CC BY 4.0**, exige sync da fonte com cabeçalho de licença, jamais recriação literal; princípio do método já absorvido em G23), `G47` (refs GEO/ecommerce/cluster: llms.txt, marketplace, serp-overlap), `G48` (base de updates Google — também insumo do vigia do Caos).

## Notas
- **Sem pesquisa web** (não autorizada nesta sessão); extração 100% local da quarentena. Herança histórica de especialista fica diferida.
- **Sem cópia literal**: princípios reescritos em PT-BR; estatísticas de mercado e tabelas de regras densas marcadas como "referência a provisionar" (confirmar na fonte antes de citar número).
- **Licença:** código MIT creditado no rodapé de cada SKILL; **FLOW = CC BY 4.0** com crédito a Daniel Agrici preservado e prompts originais **não** reproduzidos.
- **Catálogo:** `C:/Kolden/Ariadne/.claude/skills/catalogo.md` atualizado com as 7 frentes novas.
- **Frentes novas ainda sem especialista dedicado** (local/i18n/e-commerce/imagens): operadas por ora pelo `ariadne-chief` + especialista adjacente; materializar especialistas é candidato de leva futura (relacionado a G26).
