---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/historico|historico]]"
  - "[[Caos/registros/predictions-scorecard-kolden-2026|predictions-scorecard-kolden-2026]]"
  - "[[Caos/registros/ultima-verificacao|ultima-verificacao]]"
---

# Dashboard Safety Kolden — Schema

> **Versão:** 0.1.0 (schema) | **Ratificada:** 2026-07-06 | **Escopo:** especificação de colunas + regras de agregação
> **Contrato de origem:** m-20260706-metodo-kolden · Sub-onda 1.4
> **Referências constitucionais:** Art. IV v2.5.0 (MCP mandatório) · Art. IX (grounding) · Art. X G1-G8 (8 gates canônicos)
> **Fontes metodológicas:**
> - Amodei et al. / Anthropic (2023) *Responsible Scaling Policy v1.0* — anthropic.com/rsp (matriz ASL + controles proporcionais)
> - Amodei-Olah-Steinhardt-Christiano-Schulman-Mané (2016) *Concrete Problems in AI Safety* — arXiv 1606.06565 (interpretabilidade como problema técnico)
> - Bai-Kadavath-Kundu-Askell-Amodei et al. (2022) *Constitutional AI* — arXiv 2212.08073 (princípios constitucionais como camada de veto)
> - Anthropic (2024) *Model Context Protocol spec* — modelcontextprotocol.io (protocolo interoperável obrigatório)

## 0. O que este documento É — e o que NÃO é

**É:** especificação de colunas + tipo + fonte + regra de agregação para o Dashboard Safety Kolden. É a
planta que Fase 3 vai popular quando o motor de coleta estiver ligado. É o análogo interno da tabela ASL da RSP:
uma matriz por-agente com colunas de risco + colunas de controle + colunas de evidência.

**NÃO é:** o dashboard populado. Nenhuma linha de dados reais deste ciclo aparece aqui. Popular o dashboard é
escopo de Fase 3 (Contrato residual `m-2026MMDD-implementacao-mcp-e-dashboard`), fora da Sub-onda 1.4.

## 1. Regra estruturante

O dashboard Kolden tem **uma linha por agente** (SOLO ou orquestrador de squad) + **uma linha agregada por
squad** + **uma linha organizacional Kolden**. Não confundir os três níveis: o agregado por squad é o
`max/sum/count` das linhas de agente do squad; o organizacional Kolden é o agregado dos squads. Regra de
agregação é declarada por coluna (§3).

Colunas obrigatórias por linha (agente): **5 blocos** — Identidade, Risco (ASL), Controle (Gates canônicos +
constituição), Interpretabilidade, Migração MCP.

## 2. Blocos e colunas — schema canônico

### 2.1 Bloco Identidade (5 colunas)

| Coluna | Tipo | Fonte | Regra de agregação (squad → org) |
|---|---|---|---|
| `agent_id` | string kebab-case | `dados/elenco-de-agentes.yaml` (roster) | não agrega (é chave) |
| `nome_mitologico` | string | `dados/elenco-de-agentes.yaml` | não agrega |
| `squad_dono` | string kebab-case | `dados/registro-de-entidades.yaml` §squad | não agrega |
| `tier` | enum `0-orquestrador` \| `1-especialista` \| `2-habilidade` \| `solo` | `dados/elenco-de-agentes.yaml` §tier | `count por tier` |
| `status` | enum `vigente` \| `em-construcao` \| `arquivado` \| `bloqueado` | `dados/registro-de-entidades.yaml` §status | `count por status` |

**Exceção nomeada:** Caos e Dike (agentes meta) recebem `squad_dono: caos-meta` — não são "de nenhum squad
de negócio". Amodei-Olah (2016) trata meta-agentes separados por convenção.

### 2.2 Bloco Risco — ASL (Amodei/Anthropic 2023) (4 colunas)

| Coluna | Tipo | Fonte | Regra de agregação |
|---|---|---|---|
| `ASL` | enum `1` \| `2` \| `3` \| `4+` | `prd-de-ia.md` §frontmatter `ASL:` | `max` (o squad é do nível do agente mais arriscado) |
| `ASL_justificativa` | markdown | `prd-de-ia.md` §"Nível ASL" | não agrega (é qualitativo) |
| `ASL_data_declaracao` | ISO 8601 | `prd-de-ia.md` §frontmatter `atualizado:` | `min` (declaração mais antiga do squad) |
| `red_team_log_ultima_data` | ISO 8601 \| `null` | `registros/red-team/<agente>.md` §última entrada | `min` (o mais desatualizado do squad) |

**Regra de coerência:** ASL declarada + `red_team_log_ultima_data` compatível com cadência mínima por nível:
- ASL-1 → red team opcional, sem cadência mínima
- ASL-2 → red team anual (Brooks 2018-2026 cadência)
- ASL-3 → red team semestral + `interrupt_before` obrigatório (Constituição Art. X G4)
- ASL-4+ → red team trimestral + `interrupt_before` + terceiro-externo (RSP v1.0)

**Anomalia sinalizada:** ASL-3+ com `red_team_log_ultima_data` mais velho que o limite → coluna vira `⚠️ vencido`
no render; `null` em ASL-2+ → `⚠️ nunca red-teamed`.

### 2.3 Bloco Controle — Gates canônicos G1-G4 (4 colunas — BLOCK) (4 colunas)

Herdado do Art. X da Constituição v2.5.0 (framework `arquitetura-de-agents-kolden` — Liceu Fase 1). Cada
coluna registra o estado do gate no último passe do `CAOS-CL-002` (revisor Caos ou Dike).

| Coluna | Tipo | Fonte | Regra de agregação |
|---|---|---|---|
| `G1_constitution_ok` | bool + link p/ `<Agent>/constitution.md` | `revisor` Fase 6 log | `AND` (squad OK só se todos os agentes OK) |
| `G2_ASL_declarado_ok` | bool | `prd-de-ia.md` presença dos 5 campos | `AND` |
| `G3_uncertainty_e_aspiration_ok` | bool | `CLAUDE.md` §"Incerteza declarada" + `prd-de-ia.md` §aspiration_criteria | `AND` |
| `G4_off_switch_ok` | bool (só relevante ASL-3+) | `.claude/hooks/interrupt-before-mutation.sh` existe + teste OS-1 passou | `AND` (ignora agentes ASL-1/2 — coluna `n/a`) |

**Regra de render:** falha em qualquer G1-G4 na linha do agente → linha inteira em vermelho no dashboard.
Squad com ≥1 falha G1-G4 → agregado do squad em vermelho. Kolden org em vermelho se ≥1 squad em vermelho.

### 2.4 Bloco Controle — Gates canônicos G5-G8 (4 colunas — WARN/INFO condicional) (4 colunas)

| Coluna | Tipo | Fonte | Regra de agregação |
|---|---|---|---|
| `G5_interpretability_score` | int `0..5` (heurística — ver §4) | `revisor` Fase 6 avaliação + auditoria de tempo real | `média` |
| `G6_orthogonality_e_instrumental_ok` | bool | `prd-de-ia.md` §tabela capacidades × risco + teste AB-3 passou | `AND` |
| `G7_grounding_compulsorio_ok` | bool | reflexo `verificacao-de-fato-datavel.sh` (Sub-onda 1.2) | `AND` |
| `G8_predictions_scorecard_status` | enum `nao-aplicavel` \| `emitido` \| `revisao-vencida` \| `revisao-em-dia` | `Caos/registros/predictions-scorecard-<agente>-<ano>.md` presença + campo `proxima_revisao` | `count por estado` |

**Nota interpretability_score (§4):** é heurística *inicial* (0-5); não é métrica científica. Amodei-Olah 2020-
Transformer Circuits Thread ainda não produziu score canônico para agentes-orquestradores; a Kolden usa a
rubrica de §4 até o Liceu emitir uma proposta melhor (Onda 6 do Método).

### 2.5 Bloco Constituição per-agent (3 colunas)

| Coluna | Tipo | Fonte | Regra de agregação |
|---|---|---|---|
| `constitution_path` | string \| `null` | `<Agent>/constitution.md` presença | `count(null)` (quantos agentes sem constituição per-agent) |
| `constitution_num_principios` | int `5..15` esperado | contagem de itens `- ` no `constitution.md` do agente | `média` |
| `constitution_ultima_revisao` | ISO 8601 \| `null` | git log do `constitution.md` último commit | `min` (mais desatualizado do squad) |

**Exceção nomeada:** agentes SOLO tier `solo` podem herdar a Constituição do Caos + Constituição da Kolden
(2 níveis) sem constitution.md próprio SE `ASL: 1`. ASL ≥ 2 exige constituição per-agent — Bai et al. 2022
§4 (constituição operacional local + global).

### 2.6 Bloco Migração MCP (Art. IV v2.5.0) (5 colunas)

Herdado direto da Sub-onda 1.3 do Método (fonte primária: `Caos/registros/metodo-onda-1/1.3-mcp-camada-1/`).

| Coluna | Tipo | Fonte | Regra de agregação (squad → org) |
|---|---|---|---|
| `wrappers_proprietarios_ativos` | int ≥ 0 | grep por wrapper conhecido em código do agente | `sum` |
| `wrappers_migrados` | int ≥ 0 | contagem de wrappers do inventário 1.3 que já saíram do código | `sum` |
| `wrappers_em_dupla_vida_ate_data` | int ≥ 0 | `ferramentas.md` §Plano de dupla-vida — linhas com `status: em-construcao \| ligado-em-dupla-vida` | `sum` |
| `wrappers_em_excecao_arquitetural` | int ≥ 0 | `ferramentas.md` §Exceção constitucional | `sum` |
| `data_limite_migracao_mais_proxima` | ISO 8601 \| `null` | menor `data_limite` da tabela de dupla-vida | `min` |

**Regra de render:** `data_limite_migracao_mais_proxima < hoje + 14 dias` → coluna amarela; `< hoje` → vermelha.

## 3. Regras de agregação — sumário

| Nível | Sobre o quê | Método |
|---|---|---|
| Agente | linha primária | dados brutos do agente |
| Squad | agrupa por `squad_dono` | ver coluna-por-coluna (§2) |
| Kolden org | agrupa todos os squads + Caos + Dike | ver coluna-por-coluna (§2) |

**Regra invariante (Brooks 1991 — *use o mundo como seu próprio modelo*):** agregações são **derivadas em
tempo de render**, nunca armazenadas como campo separado no roster. Se `elenco-de-agentes.yaml` muda, o
agregado do squad refletido no próximo render. Não manter contagem em cache — o mundo (yaml) é a fonte.

## 4. Rubrica inicial de `G5_interpretability_score` (heurística 0-5)

Rubrica declarada como heurística *inicial*, sujeita a substituição quando o Liceu propuser métrica melhor
(Onda 6 do Método — ida-e-volta com Liceu-chief sobre framework `arquitetura-de-agents-kolden`).

Cada agente recebe pontos por critério observável (soma, cap em 5):

| Critério | Pontos | Fonte de verificação |
|---|---|---|
| CLAUDE.md declara `loop_pattern:` explícito (ReAct ou variante) | +1 | grep no CLAUDE.md do agente |
| Existe log estruturado por decisão (ReAct trace) em `registros/` | +1 | grep por `pensamento:` \| `acao:` \| `observacao:` em registros |
| Especialistas do squad têm `tools:` restritas + formato de retorno declarado | +1 | subagente frontmatter `tools:` não-vazio + `output_format:` |
| PRD §11 (arquitetura) tem tabela de decomposição por camada (5 camadas ou tiers) | +1 | `prd-de-ia.md` seção 11 tem tabela com ≥ 3 linhas |
| Constituição per-agent declara princípios com procedência (Autor Ano) para ≥ 50% deles | +1 | `constitution.md` §princípios cita fontes |

**Score 0-2 = interpretabilidade fraca (G5 WARN).** Score 3-4 = adequado. Score 5 = de referência.

**Exceção nomeada:** agentes de tier `solo` sem log de decisão externo (ex.: agente conversacional que roda
em CLI sem persistir traço) — não penalizar o critério 2; documentar em `registros/interpretability-nota.md`
por agente e sinalizar na coluna.

## 5. Fontes de dados — schema de coleta

Fase 3 (fora desta sub-onda) implementa a coleta a partir destas fontes canônicas:

| Fonte | Caminho | Responsável de manter | Frequência de leitura pelo dashboard |
|---|---|---|---|
| Roster de agentes | `dados/elenco-de-agentes.yaml` | `curador` (Fase 8) | por render |
| Registro de entidades | `dados/registro-de-entidades.yaml` | `curador` (Fase 8) | por render |
| PRD de cada agente | `<Agent>/prd-de-ia.md` | agente/orquestrador do squad | por render (grep + parser YAML frontmatter) |
| CLAUDE.md de cada agente | `<Agent>/CLAUDE.md` | agente/orquestrador do squad | por render |
| Constituição per-agent | `<Agent>/constitution.md` | agente/orquestrador do squad | por render + git log último commit |
| ferramentas.md de cada agente | `<Agent>/ferramentas.md` | agente/orquestrador do squad | por render (para bloco 2.6) |
| Log de red team | `registros/red-team/<agente>.md` | testador Fase 7 ou red-teamer nominal | por render |
| Log de revisor Fase 6 | `Caos/registros/revisao-fase6/<agente>-<data>.md` | revisor (Caos ou Dike) | por render |
| Scorecard de predições | `Caos/registros/predictions-scorecard-<agente>-<ano>.md` | agente OU Caos (organização) | por render |

**Cache admissível:** só o parse (yaml/markdown → estrutura). **Contagens agregadas NÃO são cacheadas** — Art. IX
(grounding) exige que agregação seja re-derivada do estado atual, não recalada de valor armazenado.

## 6. Regras de render (o que o dashboard mostra)

Não é escopo desta sub-onda especificar formato visual — o schema é agnóstico de renderer (Markdown table,
HTML, TUI, Grafana). Regras invariantes:

1. **Ordenação padrão:** por `ASL` desc, depois por `red_team_log_ultima_data` asc (mais arriscados + mais
   desatualizados primeiro).
2. **Filtros mínimos:** por squad; por ASL; por status; por gate falho.
3. **Codificação de cor:** apenas para gates BLOCK falhos (vermelho) e cronogramas vencidos (amarelo/vermelho);
   score `G5_interpretability_score` renderiza como número, sem cor (é heurística).
4. **Legenda obrigatória:** rodapé sempre cita procedência do schema (este documento, versão + data).

## 7. Exceções nomeadas — resumo

- **(E1)** Caos e Dike são meta-agentes; `squad_dono: caos-meta` (§2.1).
- **(E2)** Agentes tier `solo` com `ASL: 1` podem herdar a Constituição sem `constitution.md` per-agent (§2.5).
- **(E3)** Adapters de runtime bidirecional (Discord/Slack/Telegram/WhatsApp/Google Chat em Hermes) contam
  como `wrappers_em_excecao_arquitetural` — não como `wrappers_proprietarios_ativos` (§2.6). Ver
  `Caos/registros/metodo-onda-1/1.3-mcp-camada-1/sumario-executivo.md §3` — Rota D-1/D-2 pendente de decisão
  do Ronan.
- **(E4)** Agentes SOLO em CLI sem log persistente NÃO recebem penalidade automática no critério 2 do
  `G5_interpretability_score` — documentar em `registros/interpretability-nota.md` (§4).
- **(E5)** Coluna `G4_off_switch_ok` retorna `n/a` para ASL-1 e ASL-2 — não é falha (§2.3).

## 8. O que sai daqui para a Fase 3

Fase 3 (implementação real do dashboard, Contrato residual futuro) precisa:

1. **Motor de coleta** — parser YAML/Markdown + walker de `elenco-de-agentes.yaml`.
2. **Motor de agregação** — implementa §3.
3. **Motor de heurística G5** — implementa rubrica §4 com grep + parser específico.
4. **Renderer inicial** — Markdown ou HTML, respeita §6.
5. **Reflexo de atualização** — post-Fase 8 do Ritual e post-`/absorver` re-renderiza o dashboard.

Fase 3 NÃO precisa (adiado):
- Interface interativa (Grafana/TUI) — a saída Markdown/HTML é aceitável no MVP.
- Alertas por Slack/e-mail sobre vencimento de red team — sinal no dashboard já é o alerta.

## 9. Histórico de versões

| Versão | Data | Mudança |
|---|---|---|
| 0.1.0 | 2026-07-06 | Sub-onda 1.4 do Contrato `m-20260706-metodo-kolden`: schema inicial — 5 blocos de colunas, rubrica G5 inicial, regras de agregação, exceções nomeadas. Não é o dashboard populado — é a planta que Fase 3 vai implementar. Escopo `smoke test` mínimo pende de Sub-onda 1.5. |

---

*Dashboard Safety Kolden — schema v0.1.0 — inspirado por Amodei/Anthropic RSP (2023), estruturado por
Amodei-Olah et al. Concrete Problems (2016), constituído por Bai-Kadavath-Amodei et al. Constitutional AI
(2022). O mundo é seu próprio modelo — o dashboard reflete o estado, não o substitui.*
