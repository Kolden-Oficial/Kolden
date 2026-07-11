---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/affaan-m--everything-claude-code/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/affaan-m--everything-claude-code/seguranca|seguranca]]"
---

# Mapa de decisão (F4) — affaan-m--everything-claude-code

- **slug:** affaan-m--everything-claude-code · **sha:** 2bc924faf2f8e893bfe0af86b1931283693c30ae · **rota:** A
- **Base de comparação:** `dados/registro-de-entidades.yaml` (17 squads + skills do Caos) e squads existentes.
- **Viés (missão autônoma):** quando o match não é limpo, prefiro **ADAPT/CREATE** a REUSE. REUSE só com
  match item-a-item por nome — "já temos o domínio" não basta. Por isso há **zero REUSE** aqui.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | caos-fabrica + dedalo | avaliação eval-first de agentes (rubrica/auditoria 12-camadas/introspecção) não existe como skill no Caos — vira braço de QA da fábrica e do testador. |
| G2 | ADAPT | dedalo | harness autônomo + loops + action-space design: técnica de runtime de agente que o dedalo (claude code/eng de agentes) ainda não tem formalizada. |
| G3 | ADAPT | caos-fabrica | sistema "instinct" de aprendizado contínuo via stop-hook complementa o ritual-de-encerramento/MEMORY.md do Kolden com extração automática. |
| G4 | ADAPT | olimpo + dedalo | orquestração multi-agente por work items/DAG/panes reforça o roteamento do Zeus e a coordenação de squads. |
| G5 | ADAPT | prometeu + dedalo | família orch-* e GAN harness são pipelines de desenvolvimento que casam com o spec-build-review do Prometeu. |
| G6 | ADAPT | dike + caos-fabrica | council/santa-method/verification-loop = verificação adversarial com convergência, reforça a Dike (verificador) e o revisor/testador. |
| G7 | ADAPT | dedalo + metis | governança de contexto/token/custo de sessão: disciplina de runtime ausente; custo LLM informa o metis. |
| G8 | ADAPT | caos-fabrica | governança de skills (comply/scout/stocktake/distill/hookify) é exatamente o domínio meta do Caos — enriquece consulta-ao-registro e criacao-de-skill/hooks. |
| G9 | ADAPT | egide + caos-fabrica | reflexos gateguard/safety-guard/governance-capture viram modelos para a skill criacao-de-hooks e guardrails do Egide. |
| G10 | ADAPT | prometeu | padrões idiomáticos por linguagem entram como biblioteca de referência do squad de engenharia. |
| G11 | ADAPT | prometeu | padrões de framework web/backend/mobile + mcp-server-patterns reforçam a base de eng e o mcp-builder. |
| G12 | ADAPT | prometeu | testing/TDD/verification loops complementam checklist-runner e o ciclo de QA do Prometeu. |
| G13 | ADAPT | prometeu + dedalo | exército de code-reviewers por linguagem vira pool de especialistas de revisão (subagents). |
| G14 | ADAPT | prometeu | build-error-resolvers por stack: especialistas utilitários de desbloqueio de build. |
| G15 | ADAPT | prometeu | rules de convenções (21 langs) entram como referência inerte de estilo/lint por linguagem. |
| G16 | ADAPT | prometeu | padrões de dados/infra (sql/docker/k8s/cache) reforçam a base de engenharia. |
| G17 | ADAPT | prometeu + dedalo | arquitetura/ADR/spec-miner/onboarding casam com architect-first e geração de spec. |
| G18 | ADAPT | caliope | escrita/copy/voz-de-marca/campanha/taste reforçam o squad de copy (caliope). |
| G19 | ADAPT | pheme | distribuição social multi-plataforma (crosspost/social-publisher/grafo/x-api) reforça o pheme. |
| G20 | ADAPT | aglaia + aletheia | brand-discovery/product-lens reforçam branding (aglaia) e validação do "porquê" (aletheia). |
| G21 | ADAPT | ariadne | seo + seo-specialist somam ao squad de SEO/CRO já existente (ariadne) — checar overlap fino antes de aplicar. |
| G22 | ADAPT | argos + pluto | inteligência competitiva/leads/investidor reforça pesquisa (argos) e ofertas/negócio (pluto). |
| G23 | ADAPT | harmonia + aglaia | design-system/a11y/UX-polish casam com UX/UI (harmonia) e branding (aglaia). |
| G24 | CREATE | aglaia/orfeu (novo braço de mídia) | motion/vídeo/mídia generativa (manim/remotion/fal/videodb) não tem equivalente — candidato a skill/braço novo de produção audiovisual. |
| G25 | ADAPT | argos | deep-research/research-ops/scientific-thinking somam técnicas (iterative-retrieval, scholar-eval) ao motor de pesquisa do argos — não é REUSE limpo do deep-research do Kolden. |
| G26 | ADAPT | metis | benchmark/dashboards/recsys/scraper reforçam analytics (metis). |
| G27 | ADAPT | egide | conjunto de segurança de aplicação/bounty/authz é o core do egide. |
| G28 | ADAPT | egide + caos-fabrica | pipeline de sanitização (strip de segredos/PII, verificação pré-release) é diretamente útil ao próprio processo de absorção e ao Infisical-by-default. |
| G29 | ADAPT | prometeu | engenharia de ML/IA (mle-workflow/pytorch/foundation-models) entra na base de eng, fora do core marketing. |
| G30 | REFERENCIA | referencias (vendor inerte) | vertical saúde (CDSS/EMR/PHI/HIPAA) fora do escopo Kolden — guardar como referência, não criar squad. |
| G31 | REFERENCIA | referencias | vertical redes/homelab fora do escopo — referência inerte. |
| G32 | REFERENCIA | referencias | prediction-markets/web3/trading fora do escopo — referência inerte (atenção: domínio sensível). |
| G33 | REFERENCIA | referencias | verticais supply-chain/finanças/ops fora do escopo atual — referência inerte. |
| G34 | ADAPT | dedalo + pheme | parte é absorvível (github-ops/git-workflow → dedalo; notificações/social → pheme); resto (jira/google-workspace/visa) fica vendor/referência. |
| G35 | DESCARTE/VENDOR | vendor (inerte) | tooling de instalação/dashboard ECC (scripts/ecc2/python) — não absorvível como conteúdo de agente; manter inerte e NÃO executar. |
| G36 | REFERENCIA | vendor/referencias | runtimes/ambientes (bun/flox/uncloud/ck/nanoclaw) — referência de ferramenta, sem virar agente. |
| G37 | ADAPT | dedalo | workflow de sessão/épico/PRP (checkpoint/epic-*/prp-*) reforça gestão de sessão e épicos do squad de eng de agentes. |

## Síntese
- **ADAPT:** 30 clusters (G1–G23 exceto G24, G25–G29, G34, G37) — a esmagadora maioria vira melhoria de squad existente.
- **CREATE:** 1 (G24 — braço de motion/vídeo/mídia generativa, sem equivalente).
- **REFERENCIA/VENDOR/DESCARTE:** 6 (G30, G31, G32, G33, G35, G36) — verticais fora de escopo + tooling ECC inerte.
- **REUSE:** 0 (por viés da missão autônoma — nenhum match item-a-item por nome justificou REUSE).
- **Alvos mais beneficiados:** caos-fabrica/dedalo (engenharia de agentes), prometeu (engenharia de código), egide
  (segurança), e o eixo marketing (caliope/pheme/aglaia/argos/metis/ariadne).
- **Ressalva:** G21 (SEO) e G25 (pesquisa) têm sobreposição parcial com ariadne e o deep-research do Kolden —
  a fase de aplicação deve fazer diff fino (auditoria-de-squad) para não duplicar.
