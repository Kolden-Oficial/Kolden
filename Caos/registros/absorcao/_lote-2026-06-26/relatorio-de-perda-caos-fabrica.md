---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Relatório de reconciliação (F6.5) — bucket Caos-fábrica

- **squad-alvo:** Caos-fábrica · destino `C:/Kolden/Caos/.claude/skills/`
- **repo aplicado:** `affaan-m/everything-claude-code@2bc924faf2f8e893bfe0af86b1931283693c30ae` (MIT)
- **dossiê:** `Caos/registros/absorcao/affaan-m--everything-claude-code/` (inventário 37 clusters; mapa de decisão)
- **clusters cobertos:** G1 (avaliação eval-first), G3 (aprendizado contínuo), G6 (council/verificação), G8 (governança de skills)
- **princípio anti-exaustão:** repo de 271 skills; absorvidos os 4 métodos-âncora de maior valor PARA O CAOS (4 skills). Demais clusters do repo são alvo de OUTROS buckets/squads (Prometeu, Egide, Caliope, Argos etc.) — fora do meu escopo nesta leva.
- **catálogo:** NÃO tocado (consolidação centralizada posterior, por instrução) — `catalogo.md` permanece desatualizado de propósito; pendência registrada abaixo.

## ID-âncora aplicado (1 linha por ID)

| repo | ID | capacidade | disposição | destino |
|---|---|---|---|---|
| affaan-m--ecc | G1 | Avaliação de agentes eval-first (rubrica multi-eixo, head-to-head, auto-avaliação 5 eixos, auditoria 12 camadas, introspecção) | ABSORVIDO | `Caos/.claude/skills/avaliacao-de-agente/SKILL.md` + `references/rubricas-e-camadas.md` |
| affaan-m--ecc | G3 | Aprendizado contínuo via instintos (modelo atômico, confiança, escopo projeto/global, evolução→entidade, ledger) | ABSORVIDO | `Caos/.claude/skills/captura-de-instintos/SKILL.md` + `references/ledger-e-promocao.md` |
| affaan-m--ecc | G8 | Governança de skills (stocktake, comply, rules-distill, hookify, config-gc, scout) | ABSORVIDO | `Caos/.claude/skills/governanca-de-habilidades/SKILL.md` + `references/canais-e-conformidade.md` |
| affaan-m--ecc | G6 | Verificação adversarial (council 4 vozes, santa-method dupla revisão cega + convergência, verification-loop) | ABSORVIDO | `Caos/.claude/skills/conselho-adversarial/SKILL.md` + `references/veredito-e-portoes.md` |

## Sobreposições coordenadas (sem duplicar o que o Caos já tem)
- **G1 vs `validacao-de-skill`** — `validacao-de-skill` testa UMA habilidade (A/B com/sem skill); `avaliacao-de-agente` avalia o AGENTE inteiro (maturity/pass@k/12 camadas). Fronteira explicitada em ambas as skills via "Habilidades relacionadas". Sem fusão, sem duplicação.
- **G3 vs `ritual-de-encerramento`** — o ritual faz a reflexão MANUAL de uma sessão; `captura-de-instintos` é a camada SISTEMÁTICA (modelo de instinto + promoção). A skill nova referencia o ritual como fonte única e não reimplementa a lógica de fim de sessão.
- **G8 vs `validacao-de-skill`/`descoberta-de-skill`/`consulta-ao-registro`** — aquelas são por-entidade; `governanca-de-habilidades` é por-PORTFÓLIO (auditoria/GC/destilação em lote). Fronteira nomeada na description e no corpo.
- **G6 vs `qa-de-integracao-de-time`** — QA de integração olha junção entre componentes; `conselho-adversarial` olha decisão ambígua e correção de output. Domínios distintos; cross-ref mútuo.

## INCREMENTAL (não aplicado nesta leva — DIFERIDO, motivo)
Clusters do mesmo repo que NÃO pertencem ao bucket Caos-fábrica (vão para outros squads em buckets próprios):
- **G2** (harness autônomo/loops) → DIFERIDO-INCREMENTAL · alvo dedalo, fora deste bucket.
- **G4** (orquestração multi-agente/DAG) → DIFERIDO-INCREMENTAL · alvo olimpo+dedalo.
- **G5, G10–G17, G29** (orquestração de dev, padrões de linguagem/framework/teste/arquitetura, ML eng) → DIFERIDO-INCREMENTAL · alvo prometeu.
- **G7** (governança de contexto/custo) → DIFERIDO-INCREMENTAL · alvo dedalo+metis.
- **G9** (reflexos guardrail) → DIFERIDO-INCREMENTAL · alvo egide+caos; parcialmente coberto pela função "hookify" dentro de `governanca-de-habilidades` (ponte regra→reflexo), construção fica na `criacao-de-hooks`.
- **G18–G23** (copy, social, branding, SEO, design/UX) → DIFERIDO-INCREMENTAL · alvos caliope/pheme/aglaia/ariadne/harmonia.
- **G24** (motion/vídeo/mídia generativa, CREATE) → DIFERIDO-INCREMENTAL · candidato a braço novo aglaia/orfeu.
- **G25–G28** (pesquisa, analytics, segurança, sanitização) → DIFERIDO-INCREMENTAL · alvos argos/metis/egide.
- **G34, G37** (ops produtividade, workflow de sessão/épico) → DIFERIDO-INCREMENTAL · alvo dedalo+pheme.
- **G30–G33, G35, G36** → DESCARTADO do escopo de absorção como conteúdo de agente: verticais fora do core Kolden (saúde/redes/web3/supply-chain) + tooling ECC inerte + runtimes; mantidos como referência/vendor inerte, NÃO executados (decisão herdada do mapa F4).

## Invariante de não-perda
- Âncoras do bucket Caos-fábrica: **4** (G1, G3, G6, G8).
- ABSORVIDO = 4 · DESCARTADO = 0 (no escopo do bucket) · DIFERIDO-INCREMENTAL = demais clusters (alvos de outros buckets, todos nomeados acima) · **PERDIDO = 0**.
- Nada do bucket sumiu sem registro: cada cluster G# do repo está ou ABSORVIDO aqui, ou nomeado como DIFERIDO para seu squad-alvo, ou DESCARTADO com motivo.

## Pendências (para o consolidador da leva)
1. **`catalogo.md` do Caos** — adicionar 4 entradas: `avaliacao-de-agente`, `captura-de-instintos`, `governanca-de-habilidades`, `conselho-adversarial` (não toquei por instrução de centralização).
2. **Registro de entidades** (`dados/registro-de-entidades.yaml`) — registrar as 4 habilidades novas (Fase 8 / `registro-de-entidade`).
3. **Herança histórica (5.6)** — DIFERIDA: sessão sem autorização de busca web; biography/core_frameworks por camada ficam para uma leva com busca liberada.

---
*Absorção sem cópia literal; princípios extraídos e reescritos em PT-BR. Fonte única:
`affaan-m/everything-claude-code@2bc924f` (MIT). Sub-origens creditadas nos rodapés das skills
(ex.: santa-method — Ronald Skelton).*
