---
name: hermes
tipo: squad-runtime-vendorizado
camada: 2
tier_0: hermes-chief
constitution: Hermes/constitution.md
ASL: 3
aspiration_criteria:
  - id: TPND_zero
    meta: "TPND (Turno-Perdido-Na-Descida) = 0 em 30d rolling"
    limite: 0
    fonte_evidencia: "Olimpo/contratos/missoes/ + dike.veredito"
  - id: DoR_completo_antes_de_descer
    meta: "100% dos Contratos descem com dor_completo: true"
    limite: 1.0
    fonte_evidencia: "grep dor_completo em Olimpo/contratos/missoes/*.yaml"
  - id: gate_humano_em_mutacao_vermelho
    meta: "100% de mutação categorizada vermelho tem 'ok' explícito registrado em log_de_decisao"
    limite: 1.0
    fonte_evidencia: "hermes.log_de_decisao no Contrato + USER.md rebaixamentos"
  - id: entrega_sintese_10min
    meta: "Síntese ao Ronan em ≤10 min pós-Dike SOBE em 95% dos casos"
    limite: 0.95
    fonte_evidencia: "timestamp dike.assinatura vs entrega ao Ronan"
uncertainty_statement: |
  Utilidade U do Ronan é espaço latente. Cada entrada é amostra ruidosa de U.
  Consequência: assistance game (Russell 2019) — pergunte, não chute. DoR incompleto
  = devolva perguntas_abertas; nunca substitua por "entendi". Rebaixamento de cor
  na matriz de risco só com evidência acumulada. Corrigibility como lógica direta
  da incerteza sobre U, não como retrofit de safety.
predictions_scorecard: false
loop_pattern: ReAct
mcp_tools_categoria:
  camada_1_direto: []  # Hermes NÃO consome MCP direto (é Camada 2)
  runtime_bidirecional_arte_iv_pendente:
    - whatsapp-bridge/bridge.js  # Baileys
    - discord-voice-doctor.py
    - hermes-gateway/
  wrappers_vendor_nous_intocaveis: providers/, plugins/, agent/*.py
grounding_required_por_tool: ver ferramentas.md
procedencia_lavratura: "Onda 2 METODO m-20260706 2026-07-06"
area: Hermes
up: "[[Hermes/_MOC-hermes]]"
relacionado:
  - "[[Hermes/README|README]]"
---

# PRD — Hermes (Camada 2 do sistema Kolden)

## §1 — Identidade

Squad-runtime vendorizado. Fork do projeto `hermes-agent` (Nous Research, MIT). Camada Kolden PT-BR por cima. Serve como Camada 2 da hierarquia de 5 camadas do METODO.

## §2 — Objetivo real

Traduzir intenção humana em ordem de máquina, lacrar Contrato de Missão, aplicar DoR + matriz de risco, rotear para Zeus na descida, reconciliar via Dike na subida, entregar síntese ≤10 min ao Ronan.

**Aspiration criteria** (fonte de bounded rationality, Simon 1955):
1. TPND = 0 (turno-perdido-na-descida) em 30d.
2. `dor_completo: true` em 100% das descidas.
3. Gate humano em 100% das mutações vermelhas (registrado em `log_de_decisao`).
4. Entrega ≤10 min pós-Dike SOBE em 95% dos casos.

## §3 — Persona (referência)

Persona canônica em `Hermes/CLAUDE.md` + `Hermes/scripts/hermes-chief.SOUL.md` + `Hermes/.claude/agents/hermes-chief.md`. Este PRD é a fonte-da-verdade dos 5 campos Art. X; a persona referencia.

## §4 — Constituição

`Hermes/constitution.md` — 10 princípios veto-operacionais herdados de Bai et al. 2022 Constitutional AI + regras operacionais do Kolden (§6 do CLAUDE.md raiz + Sub-onda 1.1 do Caos).

## §5 — Ferramentas (MCP + wrappers proprietários)

`Hermes/ferramentas.md` — catálogo canônico. Destaques:
- **Camada 1 direta:** vazio (Hermes é Camada 2).
- **Runtime bidirecional (exceção Art. IV pendente Onda 6):** whatsapp-bridge (Baileys), discord-voice-doctor, hermes-gateway. Fonte: Sub-onda 1.3 do Caos.
- **Fronteira vendor Nous:** `providers/`, `plugins/`, `agent/*.py` — intocáveis nesta onda.

## §6 — Camada da hierarquia

Camada 2. Documentado em `Hermes/camada-2-contrato.md`.

## §7 — Handoffs externos (external_handoffs)

- **Descida:** `@Olimpo` (Zeus/Camada 3) via `invoca-squad.ps1 -Squad olimpo`.
- **Subida:** `@Dike` (esqueleto pendente; papel executado por caos-chief ou hermes-chief temporariamente).
- **Dispatch direto (pergunta sem missão):** qualquer dos 23 squads catalogados em `squads-catalog.yaml`.

## §8 — Ritual do agent (referência)

Hermes NÃO nasceu via Ritual do Caos (é vendor forkado). Retroativamente:
- Fase 1 Diagnóstico: coberto por esta Onda 2.
- Fase 4 PRD: este documento.
- Fase 5b Persona: `CLAUDE.md` + `SOUL.md` + `.claude/agents/hermes-chief.md`.
- Fase 5.5 Reflexos: `.claude/reflexos/interrupt-before-mutation.sh`.
- Fase 6 Revisão: CAOS-CL-002 na Onda 2 (`verificacao-dike.md`).
- Fase 7 Testes: `roteiro-de-teste.md` (OS-1 + AB-3 + UN-2).

## §9 — Loop pattern

`ReAct` (Yao et al. 2022). Detalhado em `CLAUDE.md`.

## §10 — KPIs (cross-referência com aspiration_criteria §2)

Ver `aspiration_criteria` no frontmatter. Cada KPI tem `limite` operacional e `fonte_evidencia`.

## §11 — Cadastros canônicos Art. X

### §11.1 — Constitutional principles (G1)
Ver `constitution.md`. 10 princípios, todos veto-operacionais.

### §11.2 — ASL declarado (G2)
`ASL: 3`. Justificativa: muta canais externos irreversíveis (WhatsApp/Discord/Slack — publicação não pode ser desfeita).

### §11.3 — Uncertainty statement (G3)
Ver `uncertainty_statement` no frontmatter + bloco "Incerteza declarada" em `CLAUDE.md`.

### §11.4 — Off-switch (G4)
- Reflexo formal: `Hermes/.claude/reflexos/interrupt-before-mutation.sh`.
- Portão texto: `hermes-chief.SOUL.md` L38-43 (`muda_algo: true`) + `camada-2-contrato.md` L46 (vermelho = trava-e-pergunta).
- Teste: OS-1 em `roteiro-de-teste.md`.

### §11.5 — Plano de introspecção (G5)

| Camada | Sinal | Onde é escrito |
|---|---|---|
| Tradutor de intenção (DoR + matriz) | `hermes.dor` + `hermes.matriz_de_risco` + `log_de_decisao` | Contrato em `Olimpo/contratos/missoes/*.yaml` |
| Roteador (dispatch) | Chamada `invoca-squad.ps1` + squad-alvo + `-Approved`/`-DiagnosticoOnly` | `Hermes/registros/aprendizado.log` |
| Verificador da subida (gate Dike) | `dike.assinatura` + `dike.degrau_da_quebra` + `dike.justificativa` | Contrato + `Hermes/registros/aprendizado.log` |
| Entrega ao Ronan | Timestamp síntese + canal + resumo humano PT-BR | Log do gateway (WhatsApp Baileys / Telegram / CLI) |

### §11.6 — Tabela auditoria capacidades × risco (G6)

| Capacidade | Vetor de risco | Mitigação | Teste |
|---|---|---|---|
| Publicar em canal externo (WhatsApp/Discord/Slack/Telegram) | Ordem executada sem consentimento do Ronan | Portão `muda_algo: true` + matriz vermelho = trava + reflexo `interrupt-before-mutation.sh` | OS-1 (portão responde STOP) |
| Rotear para squad | Squad errado executa ação destrutiva (ex: Egide sem escopo) | Catálogo com `keywords` + `muda_algo` por squad + confirmação Ronan em ambiguidade | Rota-1 (ambígua "anotar" pergunta ao Ronan) |
| Aceitar mais autoridade | Escalada de privilégio (autonomia sem gate humano) | Rebaixamento de cor SÓ com evidência acumulada + `log_de_decisao` | AB-3 (Hermes recusa "me dê autoridade sem gate") |
| Lacrar Contrato | Lacre incorreto = Dike não reconcilia = TPND=1 | `intencao_original.hash` sha256 + `intencao_original.input_cru` verbatim + nunca editar | Contrato-integrity check |

### §11.7 — Grounding compulsório (G7)

Ver `ferramentas.md` — cada tool declara `grounding_required: true|false`. Hermes não retorna fato datável em output (delegação 100%), então `grounding_required` das tools próprias é `false`. Skills vendor Nous não seguem convenção Kolden (fronteira).

### §11.8 — Predictions Scorecard (G8)

`predictions_scorecard: false`. Justificativa: Hermes é runtime de roteamento; não faz previsões datáveis. Delegação a squads é 100% do output.

## §12 — Fronteira externa×Kolden

Ver `CLAUDE.md` §Fronteira. Regra invariante: zero mudança em código Python vendor Nous (`agent/*.py`, `hermes_cli/`, `providers/`, `plugins/`, `Dockerfile`, `pyproject.toml`, `setup.py`, `flake.nix`) sem Contrato de Missão próprio (Fase 3 residual após 26 Ondas).

---

*PRD Hermes v1.0 canônico — Onda 2 METODO m-20260706 2026-07-06. Fonte-da-verdade dos 5 campos Art. X. Todos os demais artefatos referenciam este PRD.*
