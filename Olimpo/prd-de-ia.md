---
name: olimpo
tipo: squad-governanca-vendorizado
camada: "3-4"
tier_0: olimpo-chief
tier_1: [poseidon, apolo, hefesto, hades, atena, plutos, afrodite]
constitution: Olimpo/constitution.md
ASL: 3
aspiration_criteria:
  - id: arbitragem_com_escalada_ao_humano
    meta: "100% das arbitragens cross-executivo são escaladas ao Ronan com tabela de trade-off registrada em log_de_decisao"
    limite: 1.0
    fonte_evidencia: "Olimpo/contratos/missoes/*.yaml → zeus.arbitragem[] + hermes.log_de_decisao"
  - id: DoR_completo_antes_de_descer
    meta: "100% das missões que descem do Zeus para executivos têm premissas explícitas + dado/evidência + horizonte de revisão"
    limite: 1.0
    fonte_evidencia: "grep 'decisao_sem_premissa' em log_de_decisao = 0 ocorrências"
  - id: decomposicao_com_premissa
    meta: "100% das decompose.executivos[] declaram motivo do roteamento (não chuta)"
    limite: 1.0
    fonte_evidencia: "grep '.motivo:' em zeus.decomposicao dos Contratos"
  - id: entrega_scqa_10min
    meta: "Consolidação SCQA + Pyramid do Zeus sobe para Dike em ≤10min pós-assinaturas de todos executivos em 95% dos casos"
    limite: 0.95
    fonte_evidencia: "timestamp executivos[N].assinatura vs zeus.consolidacao.assinatura"
  - id: contrato_ratificado_pela_dike
    meta: "100% dos Contratos assinados pelo Zeus passam pelo gate Dike antes de voltar ao Hermes"
    limite: 1.0
    fonte_evidencia: "grep 'dike.veredito' em Olimpo/contratos/missoes/*.yaml"
uncertainty_statement: |
  Utilidade U do Ronan é espaço latente. Cada missão que desce é amostra ruidosa
  de U. Consequência (Russell 2019, assistance games): Olimpo NÃO decide pelo
  humano em conflito de domínio; escala com tabela de trade-off. Framework não
  é lei — carrega sempre "usando X de Y, para esta empresa, hoje, supondo Z".
  Rebaixamento de cor da matriz de risco só com evidência acumulada. Corrigibility
  como lógica direta da incerteza sobre U, não como retrofit de safety.
predictions_scorecard: false
loop_pattern: ReAct
mcp_tools_categoria:
  camada_1_direto: []  # Olimpo NÃO consome MCP direto (Camada 3-4 pura — delega ao operacional)
  skills_como_tools_cross_squad:  # E3 canonizada METODO v1.1
    - alocacao-de-capital  # dono: plutos
    - analise-de-pricing-wtp  # dono: plutos
    - chief-of-staff-filtragem-e-escalonamento  # dono: zeus
    - comunicacao-executiva  # dono: zeus
    - estrategia-de-entrada-e-posicionamento  # dono: zeus
    - estrategia-de-supply-chain  # dono: poseidon
    - integracao-pos-fusao-pmi  # dono: zeus+plutos
    - investor-relations  # dono: plutos
    - operacoes-lean-six-sigma  # dono: poseidon
    - painel-executivo-autoplan  # dono: zeus
    - portfolio-estrategico  # dono: zeus+plutos
    - programa-esg-corporativo  # dono: zeus+plutos
    - reframe-produto-10-estrelas  # dono: zeus
    - rubrica-dimensional-0-10  # dono: zeus
    - sumario-executivo-scqa  # compartilhada any-chief
  fronteira_vendor_xquads_intocaveis:
    - agents/  # 8 personas mitológicas
    - tasks/  # 7 tasks operacionais
    - workflows/  # 2 workflows AIOS
    - data/  # executive-frameworks + routing-catalog
    - checklists/output-quality.md
    - config/config.yaml
    - prd/{afrodite,plutos}.md
grounding_required_por_skill: ver ferramentas.md §4
procedencia_lavratura: "Onda 4 METODO m-20260706 2026-07-09"
---

# PRD — Olimpo (Camada 3-4 do sistema Kolden — Governança Executiva)

## §1 — Identidade

Squad-governança vendorizado. Fork do `c-level-squad` de `ohmyjahh/xquads-squads` (MIT). Camada Kolden PT-BR por cima. Serve como **Camada 3-4 combinada** da hierarquia de 5 camadas do METODO — condição única (caso NOVO canônico, candidato à emenda METODO §3 v1.2). Opera em qualquer LLM competente (P1 Universalidade Turingiana).

## §2 — Objetivo real

Decompor missão descendente do Hermes via `routing_triggers`, rotear para 1-8 executivos, arbitrar divergência cross-executivo com escalada obrigatória ao Ronan em conflito material, consolidar em síntese SCQA + Pyramid, assinar Contrato e devolver ao Hermes na subida via Dike.

**Aspiration criteria** (P3 Simon 1955 bounded rationality):
1. Arbitragem com escalada ao humano = 100%.
2. `dor_completo: true` em 100% das missões que descem.
3. Decomposição com premissa explícita em 100% dos casos.
4. Entrega SCQA ≤10min pós-assinaturas em 95%.
5. Contrato ratificado pela Dike em 100%.

## §3 — Persona (referência)

Persona canônica em `Olimpo/CLAUDE.md` + persona vendor por-executivo em `Olimpo/agents/{zeus,poseidon,apolo,hefesto,hades,atena,plutos,afrodite}.md`. Este PRD é a fonte-da-verdade dos 5 campos Art. X; personas referenciam.

## §4 — Constituição

`Olimpo/constitution.md` — 15 princípios veto-operacionais Kolden agent-safety herdados de Bai et al. 2022 CAI + regras operacionais Kolden. **Co-existência com os 6 vetos operacionais** já em `squad.yaml` L46-53 via regra E6 canonizada METODO v1.1: em conflito, **Kolden Art. X prevalece** (Constituição do squad Olimpo prevalece sobre veto operacional de execução).

## §5 — Ferramentas (skills-como-tools + fronteira vendor)

`Olimpo/ferramentas.md` — catálogo canônico. Destaques:
- **Camada 1 direta:** vazio (Camada 3-4 delega ao operacional — mesmo racional Hermes Camada 2).
- **Skills como tools cross-squad (E3 canonizada v1.1):** 15 skills executivas com dono nominal + invocáveis internamente pelos 8 executivos + externamente por outros squads que precisem de framework executivo (Zeus com skill `chief-of-staff-filtragem-e-escalonamento` filtra Escalate/Handle/Park antes de virar Contrato).
- **Fronteira vendor xquads:** `agents/ tasks/ workflows/ data/ checklists/ config/ prd/` — INTOCÁVEIS.

## §6 — Camada da hierarquia

**Camada 3-4 combinada** — caso NOVO canônico. Zeus (Camada 3) decompõe + roteia + arbitra; 7 executivos (Camada 4) traduzem na disciplina + assinam. Fronteira Camada 3 × Camada 4 dentro do mesmo squad declarada em CLAUDE.md §Persona + este PRD §6. Emenda METODO §3 v1.2 opcional (Passo 9 desta Onda, gate humano Q5).

## §7 — Handoffs externos (external_handoffs)

- **Descida (Hermes → Olimpo):** `@Olimpo` via `Hermes/scripts/invoca-squad.ps1 -Squad olimpo -Prompt "Missão no Contrato <path>"`.
- **Descida (Olimpo → Operacional Camada 5):** via `zeus.decomposicao.executivos[N].delegates_to_seed`:
  - Poseidon → Hestia (RH), Cairos (projeto), Ananke (BizOps)
  - Hades → Nomos (compliance/DPIA)
  - Plutos → Pactolo (FP&A/modelagem/fluxo de caixa)
  - Afrodite → Emporos (ciclo comercial)
- **Descida direta cross-squad:** Apolo → Peitho (tráfego/social) + Caliope (copy) + Aglaia (branding); Hefesto → Prometeu (engenharia AIOX/produto); Hades → Egide (cyber); Atena → Prometeu (AI stack) + Dedalo (mcp/tools).
- **Colaboração:** Zeus ↔ Themis (conselho consultivo) + Zeus ↔ Pluto (frameworks Hormozi para growth/monetização).
- **Subida (Olimpo → Dike → Hermes):** `dike.assinatura` no Contrato → `gate-de-subida.sh` → Hermes entrega ao Ronan.
- **TODO:** dispatcher hoje dispara chief (Zeus) — expandir para `@Olimpo:apolo` que dispara Apolo diretamente na Onda de Grupo E (Ondas 14-18 criativos) ou antes se for demanda.

## §8 — Ritual do agent (referência)

Olimpo NÃO nasceu via Ritual do Caos (é vendor forkado). Retroativamente:
- Fase 1 Diagnóstico: coberto por esta Onda 4.
- Fase 4 PRD: este documento.
- Fase 5b Persona: `CLAUDE.md` + `agents/zeus.md` (persona vendor) + `.claude/agents/olimpo-chief.md`.
- Fase 5.5 Reflexos: `.claude/reflexos/interrupt-before-mutation.sh`.
- Fase 6 Revisão: CAOS-CL-002 na Onda 4 (`verificacao-dike.md`).
- Fase 7 Testes: `roteiro-de-teste.md` (OS-1 + AB-3 + UN-2 + GR-1 + Arb-1 + Contrato-1 + Roteamento-1).

## §9 — Loop pattern

`ReAct` (Yao et al. 2022) especializado no padrão vendor "6 passos do Zeus Opera" (agents/zeus.md L212-221). Detalhado em `CLAUDE.md` §Loop pattern.

## §10 — KPIs (cross-referência com aspiration_criteria §2)

Ver `aspiration_criteria` no frontmatter. Cada KPI tem `limite:` operacional e `fonte_evidencia:` (path para Contratos + log_de_decisao + dike.veredito).

## §11 — Cadastros canônicos Art. X

### §11.1 — Constitutional principles (G1)
Ver `constitution.md` — 15 princípios veto-operacionais. Regra E6: em conflito com os 6 vetos operacionais de `squad.yaml` L46-53, Kolden Art. X prevalece.

### §11.2 — ASL declarado (G2)
`ASL: 3`. Justificativa: (a) arbitragem cross-executivo com potencial de decisão material (M&A, pivot, captação, cultura) — reversibilidade nula uma vez comunicada; (b) escalada a board/investidor — reputação e capital em jogo; (c) mutação em Contrato de Missão lacrado — quebra do lacre sha256 destrói o pipeline Dike.

### §11.3 — Uncertainty statement (G3)
Ver `uncertainty_statement:` no frontmatter + bloco "Incerteza declarada" em `CLAUDE.md`.

### §11.4 — Off-switch (G4)
- Reflexo formal: `Olimpo/.claude/reflexos/interrupt-before-mutation.sh` (dispara em: arbitragem cross-executivo sem consenso; escalada a board/investidor sem log_de_decisao; mutação em Contrato lacrado; publicação decisão M&A/pivot sem gate humano).
- Portão texto: `squad.yaml` L50 `arbitragem_sem_escalada: HALT`; `constitution.md` Art. II.
- Teste: OS-1 + Arb-1 + Contrato-1 em `roteiro-de-teste.md`.

### §11.5 — Plano de introspecção (G5 — DIVERGÊNCIA declarada)

| Camada | Sinal | Onde é escrito |
|---|---|---|
| Camada 3 (Zeus decompõe) | `zeus.decomposicao[N].executivo_destino` + `.motivo` + `log_de_decisao` | Contrato em `Olimpo/contratos/missoes/*.yaml` |
| Camada 4 (Executivo assina) | `executivos[N].assinatura` + processo declarado + skill invocada | Contrato + `Olimpo/registros/aprendizado.log` |
| Consolidação (subida) | `zeus.consolidacao.premissas` + `.trade_offs` + `.recomendacao_tecnica` | Contrato |
| Arbitragem (conflito) | escalada obrigatória ao Ronan com tabela de trade-off | `zeus.arbitragem[]` + `log_de_decisao` |

**Divergência METODO herdada framework Liceu Fase 1:** G5 elevada a critério próprio pelo Contrato-mãe `m-20260706`; emenda pendente Onda 6 do METODO (ida-e-volta com Liceu-chief).

### §11.6 — Tabela auditoria capacidades × risco (G6)

| Capacidade | Vetor de risco | Mitigação | Teste |
|---|---|---|---|
| Rotear missão (11 domínios via routing_logic Zeus) | Squad errado executa ação destrutiva (ex: Egide sem escopo) | Catálogo `routing-catalog.yaml` com keywords + `muda_algo` + confirmação Ronan em ambiguidade | Roteamento-1 |
| Arbitrar cross-executivo | Decisão sem consenso decidida pelo próprio Zeus (usurpação humana) | Escalada obrigatória ao Ronan com tabela de trade-off + veto `arbitragem_sem_escalada` | Arb-1 |
| Consolidar síntese SCQA | Perda de informação crítica na compressão + framing como lei | Rubrica 0-10 antes de fechar + evidência textual por afirmação + skill `sumario-executivo-scqa` | SCQA-1 |
| Assinar Contrato (lacre soberano) | Edição de `intencao_original` quebra o lacre sha256 → Dike não reconcilia | Nunca editar campo lacrado; se intenção mudar, Contrato novo | Contrato-1 |

### §11.7 — Grounding compulsório (G7)

Ver `ferramentas.md` §4 — convenção Kolden herdada Art. IX Constituição Caos + Brooks 1991. Skills que retornam fato datável (data, nome, versão, número, cotação, benchmark) → `grounding_required: true`. **Skills existentes não refactoradas nesta Onda** (backlog Fase 3 residual).

### §11.8 — Predictions Scorecard (G8)

`predictions_scorecard: false`. Justificativa: Olimpo consolida decisões estratégicas dos 8 executivos mas não emite predições datáveis próprias (delegação a Camada 5 é 100% do output executável; predições ficam com Ronan como diretiva estratégica, não com Olimpo como previsor).

## §12 — Fronteira externa×Kolden

Ver `CLAUDE.md` §Fronteira. Regra invariante (5ª aplicação E1 canonizada METODO v1.1): zero mudança em vendor xquads-squads (`agents/`, `tasks/`, `workflows/`, `data/`, `checklists/`, `config/`, `prd/`, `_origem.md`) sem Contrato de Missão próprio (Fase 3 residual após 26 Ondas). Camada Kolden externa envelopa via 9 CREATE + 4 UPDATE cirúrgicos nesta Onda 4.

---

*PRD Olimpo v1.0 canônico — Onda 4 METODO m-20260706 2026-07-09. Fonte-da-verdade dos 5 campos Art. X. Camada 3-4 combinada como caso NOVO canônico. Todos os demais artefatos referenciam este PRD.*
