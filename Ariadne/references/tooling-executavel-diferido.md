# Tooling executável — DIFERIDO (F6-2ª rodada, 2026-07-01)

> Nota de escopo do 2º passe de absorção da Ariadne sobre
> `AgriciDaniel/claude-seo@d830cdb` (jul/2026).
>
> Este arquivo registra **11 IDs de tooling executável** que pertencem à
> Ariadne por escopo mas foram **explicitamente DIFERIDOS** desta rodada
> porque exigem build de scripts + integração com Infisical + provisão de
> credenciais/reflexos que estão fora do escopo desta sessão (que focou em
> SKILL/method, não em código Python).
>
> Destino da execução futura: **sessão dedicada Prometeu + Infisical**
> (skill `criacao-de-mcp` ou `criacao-de-hooks` do Caos, dependendo do
> tipo de artefato).

## 1. IDs diferidos (11 no total — bloco C do briefing)

| ID | Escopo | Por que exige build | Destino futuro |
|---|---|---|---|
| **G17** | Skill executável de APIs Google (GSC/PSI/CrUX/Indexing/GA4) | Precisa de Python wrappers + service account + escopo OAuth por API + parsing consistente | Prometeu (skill Python + Infisical) |
| **G24** | Provisionar DataForSEO ao vivo (MCP) | Requer credenciais no Infisical + wrapper de custo (`dataforseo_costs.py`) + fallback WebSearch | Prometeu (MCP wrapper + Infisical) |
| **G26** | Materializar frota de 18 subagentes como especialistas locais/i18n/e-commerce/imagens dedicados | Requer diagnóstico Ritual completo por especialista (Rodadas 0-6) + PRD + herança histórica | Caos (Fase 5.2 para cada) |
| **G28** | Gestão de credenciais Google reescrita sobre Infisical | Requer refactor do módulo `google_auth.py` do repo-fonte para usar Infisical em vez de arquivo local | Prometeu + Caos (skill `infisical-padrao` já existe; falta o wrapper) |
| **G30** | Core Web Vitals executável via PSI/CrUX/LCP subparts | Precisa de scripts Python + rate limit gerenciado + provisão de key PSI | Prometeu |
| **G31** | GSC + Indexing/IndexNow executáveis | Precisa de service account + OAuth + submit script + IndexNow key | Prometeu + Infisical |
| **G33** | Gerador de relatório PDF/HTML (`google_report.py` + WeasyPrint + matplotlib) | Precisa de build de deps Python + templates + charts + `_review_pdf()` | Prometeu (skill de relatório executável) |
| **G34** | Engine de drift executável (baseline SQLite + 17 regras + comparação) | **Princípio já absorvido** em `.claude/skills/monitoramento-de-drift-seo/`; falta o motor Python + SQLite. | Prometeu (skill de drift executável) |
| **G38** | Scanners de risco / lint técnico (`parasite_risk.py`, `gbp_deprecation_lint.py`, `domain_history.py`, `iptc_ai_label.py`, `ucp_check.py`) | Cada scanner é script Python autônomo com parsing específico | Prometeu (grupo de scanners) |
| **G39** | Wrappers Unlighthouse / DataForSEO / FLOW-sync | Precisa de wrappers CLI + Infisical + `sync_flow.py` (CC BY 4.0 headers em cada arquivo, `--dry-run`, `--ref` pinning) | Prometeu (grupo de wrappers) |
| **G40** | Reflexo PostToolUse de validação de schema | Precisa de hook `.claude/hooks/schema-validate.sh` + integração com Rich Results Test + provisão de token | Caos (skill `criacao-de-hooks` — reflexo) |

## 2. O que a Ariadne JÁ tem de SKILL/method sobre estes IDs

Para cada ID acima, a Ariadne já entrega o **método operacional (SKILL.md)** —
o que falta é o **tooling executável**:

- G17 → método coberto por `.claude/skills/apis-google-e-indexacao/SKILL.md`.
- G24 → método coberto (dentro de `arquitetura-de-site-hub-spoke/` +
  `brief-de-conteudo-data-driven/`); tool provisionado é o gap.
- G30 → método coberto por `.claude/skills/core-web-vitals-e-performance/SKILL.md`.
- G31 → método coberto por `.claude/skills/apis-google-e-indexacao/SKILL.md`.
- G33 → método coberto por `.claude/skills/relatorios-de-seo/SKILL.md`.
- G34 → método coberto por `.claude/skills/monitoramento-de-drift-seo/SKILL.md`.
- G38 → método coberto em partes em `.claude/skills/seo-tecnico-profundo/`
  (parasite SEO, GBP deprecation, IPTC AI label, UCP) — como princípio, não
  como scanner executável.
- G39 → parte já em `.claude/skills/framework-flow/SKILL.md`; sync executável é
  o gap.
- G40 → método coberto em `.claude/skills/engenharia-de-schema-executavel/SKILL.md`
  (regras de validação); reflexo automático é o gap.

## 3. Ordem sugerida para provisionar

Se/quando o Ronan aprovar, a ordem que dá mais alavancagem para a Kolden:

1. **G28** — módulo Infisical padrão para credenciais Google (base para todos os
   demais).
2. **G17 / G30 / G31** — pacote de APIs Google + CWV + Indexing (formam a stack
   mínima de auditoria com dado próprio).
3. **G33** — relatório PDF (o output que Ronan e clientes vêem primeiro).
4. **G26** — materialização de especialistas locais/i18n/e-commerce/imagens
   (multiplica a capacidade de fan-out do `auditoria-tecnica-em-escala`).
5. **G24** — DataForSEO (uma vez que o custo/valor esteja demonstrado nos passos
   1-3).
6. **G34 / G38** — drift + scanners de risco (nichos importantes mas menos
   frequentes).
7. **G40** — reflexo de validação de schema (útil, mas depende de todos os
   anteriores).
8. **G39** — FLOW sync + wrappers (última prioridade — o método já está
   absorvido; sync é conveniência).

## 4. Contagem do bloco C

- **11 IDs diferidos** neste bloco.
- **PERDIDO = 0** — todos registrados aqui com destino futuro; método já
  entregue nas skills correspondentes.

## 5. Referência à origem

Todo tooling acima vive no repo-fonte
`AgriciDaniel/claude-seo@d830cdb` (licença MIT). Antes de escrever qualquer
wrapper próprio, consultar o script original — a maior parte do valor já
está codificada e pode ser adaptado com crédito ao autor.

Repo: `https://github.com/AgriciDaniel/claude-seo` · Autor: Daniel Agrici ·
Licença: MIT (código) / CC BY 4.0 (framework FLOW).

---
Registrado por: subagente F6-2ª rodada Ariadne, 2026-07-01.
