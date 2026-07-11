---
tipo: nota
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
relacionado:
  - "[[Olimpo/README|README]]"
---

# Ferramentas do Squad Olimpo

> **Escopo:** catálogo canônico de tools + skills-como-tools cross-squad + fronteira vendor xquads.
> **Modelo:** METODO §5 #7 (`Caos/modelos/ferramentas.md` v2.5.1).
> **Referência prévia:** Sub-onda 3.3 Prometeu §Categoria E3 skills-como-tools cross-squad.
> **Publicado:** Onda 4 METODO 2026-07-09.

## §1 — Tools próprias (Camada 3-4 direta)

**Vazio por design.** Olimpo é Camada 3-4 (governança executiva) — não consome MCP direto nem publica em canal externo. Toda ação executável é delegada à Camada 5 via `zeus.decomposicao.executivos[N].delegates_to_seed` ou cross-squad.

`camada_1_direto: []` — mesma marca que Hermes (Camada 2).

## §2 — Skills como tools cross-squad (categoria E3 canonizada METODO v1.1)

15 skills executivas em `Olimpo/.claude/skills/` — invocáveis internamente pelos 8 executivos + externamente por outros squads que precisem de framework executivo. Dono nominal por-executivo declarado no frontmatter `invocavel_por:` de cada `SKILL.md`.

| Skill | Dono nominal | Escopo | grounding_required |
|-------|--------------|--------|--------------------|
| `alocacao-de-capital` | plutos | Política mestre do capital (hurdle rate por bucket, hierarquia de retorno esperado, tesouraria) | true (fato: taxas, hurdle rate, retorno) |
| `analise-de-pricing-wtp` | plutos | Recomendar preço via market research + custo + WTP (van Westendorp) | true (fato: preço concorrência, dado de mercado) |
| `chief-of-staff-filtragem-e-escalonamento` | zeus | Filtra Escalate/Handle/Park antes de virar Contrato | false (meta-skill de processo) |
| `comunicacao-executiva` | zeus | 1-página executiva com decisão pedida em destaque | false (skill de formato) |
| `estrategia-de-entrada-e-posicionamento` | zeus | Onde-competir + como-vencer via 3Cs + Porter + Wardley | true (fato: dado de mercado, concorrência) |
| `estrategia-de-supply-chain` | poseidon | Sourcing + risco single-vendor + QC + ERP | true (fato: fornecedor, contrato, KPI) |
| `integracao-pos-fusao-pmi` | zeus + plutos | Day-1 + 100-day + synergy tracker + TSA | true (fato: KPI sinergia, deadline TSA) |
| `investor-relations` | plutos | Comunicação financeira board/investidor | true (fato: guidance, métricas) |
| `operacoes-lean-six-sigma` | poseidon | VSM + 5 whys + DMAIC + TIMWOOD | false (metodologia) |
| `painel-executivo-autoplan` | zeus | Zeus orquestra 8 deuses sobre Contrato em sequência | false (skill de orquestração) |
| `portfolio-estrategico` | zeus + plutos | Rubrica 5 eixos + matriz risco-ROI + kill criteria + 70/20/10 | true (fato: ROI, alocação) |
| `programa-esg-corporativo` | zeus + plutos | Matriz materialidade + ISSB/SASB/GRI/TCFD + KPI E/S/G | true (fato: framework versão, KPI, compromisso) |
| `reframe-produto-10-estrelas` | zeus | Reenquadra pela VISÃO (produto 10 estrelas) | false (skill de framing) |
| `rubrica-dimensional-0-10` | zeus | Nota 0-10 por dimensão + descreve concretamente o 10 | false (skill de avaliação) |
| `sumario-executivo-scqa` | any-chief (compartilhada) | SCQA + Pyramid Principle | false (skill de formato) |

**Regra E3:** mudança em skill pública impacta N squads consumidores (Zeus + 7 executivos + squads externos que invocam por framework) → **BLOCK sem confirmação por-squad** (padrão herdado Prometeu 3.3).

## §3 — Fronteira vendor xquads-squads (INTOCÁVEL nesta configuração)

Estes 40+ arquivos vivem no vendor e NÃO são tocados pela padronização Kolden. Alterá-los exige Contrato de Missão próprio (Fase 3 residual após 26 Ondas). Regra E1 do METODO v1.1 (5ª aplicação empírica).

| Categoria | Paths |
|-----------|-------|
| Personas mitológicas | `agents/{zeus,poseidon,apolo,hefesto,hades,atena,plutos,afrodite}.md` |
| Tasks executivas | `tasks/{design-operations,diagnose,evaluate-technology,plan-fundraise,plan-go-to-market,review,set-vision}.md` |
| Workflows AIOS | `workflows/wf-{board-presentation,strategic-planning}.yaml` |
| Dados vendor | `data/{executive-frameworks,routing-catalog}.yaml` |
| Checklist vendor | `checklists/output-quality.md` |
| Config vendor | `config/config.yaml` |
| PRDs vendor por-agent | `prd/{afrodite,plutos}.md` (parciais — não confundir com `prd-de-ia.md` raiz canônico Kolden) |
| Snapshot vendor | `_origem.md` |
| README vendor | `README.md` (APPEND de 1 parágrafo no topo autorizado pela Onda 4; corpo vendor preservado) |

## §4 — Convenção de grounding

- **`grounding_required: true`** — obrigatório para toda skill que retorna fato datável (data, nome, versão, número, cotação, benchmark, dado de mercado, KPI de fornecedor, framework versão).
- **`grounding_required: false`** — para skill de processo/orquestração/formato/framing/avaliação (não retorna fato datável direto — retorna método aplicado ao input do usuário).

Tabela em §2 aplica a convenção às 15 skills (8 com `true` implícito, 7 com `false`). **Migração dos frontmatter das SKILL.md para incluir `grounding_required:` explicitamente é backlog Fase 3 residual** — não escopo desta Onda 4 (fronteira preservação de skills existentes).

## §5 — Portão de aprovação para arbitragem cross-executivo (recap operacional)

Antes de resolver conflito material entre 2+ executivos:
1. Registrar posições em `zeus.arbitragem[]` do Contrato.
2. Construir tabela de trade-off: posição × evidência × custo × retorno × horizonte de reavaliação.
3. Escrever recomendação técnica em negrito (se houver — nem sempre há).
4. Escalar ao Ronan com "Decisão pedida" em destaque.
5. Zeus NÃO decide pelo humano. Aguarda resposta.
6. Registrar decisão do Ronan em `log_de_decisao` com timestamp + porque.

Reflexo formal: `.claude/reflexos/interrupt-before-mutation.sh` dispara ao detectar `zeus.arbitragem[]` sem escalada registrada.

## §6 — Portão de aprovação para escalada a board/investidor

Antes de emitir decisão a canal externo irreversível (board meeting, investor update, deck de rodada, mensagem a cliente enterprise):
1. Passar pelo filtro de qualidade (`rubrica-dimensional-0-10`).
2. Formatar via `sumario-executivo-scqa` + `comunicacao-executiva`.
3. Mostrar draft completo ao Ronan.
4. Aguardar "ok" explícito.
5. Publicar.

Art. IX da constitution.md força este fluxo.

---

*Ferramentas.md Olimpo v1.0 — canônico Kolden. Publicado pela Onda 4 do METODO 2026-07-09. Camada 3-4 direta vazia por design. 15 skills executivas categorizadas E3 skills-como-tools cross-squad. Fronteira vendor xquads-squads intocável até Fase 3 residual. Migração grounding_required nas SKILL.md fica no backlog.*
