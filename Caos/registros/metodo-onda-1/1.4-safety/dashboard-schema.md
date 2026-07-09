# Dashboard Safety Kolden — Schema (índice da Sub-onda 1.4)

> **Sub-onda:** 1.4 (Safety Dashboard + Predictions Scorecard) do Contrato `m-20260706-metodo-kolden`
> **Papel deste arquivo:** índice canônico da Sub-onda 1.4 apontando para o artefato produzido.
> **Data:** 2026-07-06

## Artefato canônico

O schema do dashboard safety **vive em** `Caos/registros/dashboard-safety.md` (v0.1.0, 218 linhas).

> **Por que não está em `1.4-safety/`?** Os artefatos previstos originalmente pela Onda 5 do
> Contrato `m-20260705-redesenho-arquitetural-fase2` (agora reenquadrada como Sub-onda 1.4 aqui)
> foram registrados como "dashboard-safety.md" e "predictions-scorecard-kolden-2026.md" na raiz
> de `Caos/registros/` — path referenciado por `Caos/registros/redesenho-fase2/onda-1-diagnostico/
> achados.jsonl` e pelo CAOS-CL-002-draft. Movê-los quebraria essas referências históricas. A
> convenção do Método é preservada por este arquivo-índice em `1.4-safety/`.

## Resumo do que o schema declara

- **1 linha por agente** (SOLO ou orquestrador) + **1 linha agregada por squad** + **1 linha organizacional Kolden** (§1).
- **5 blocos de colunas** (§2):
  - **2.1 Identidade** (5 colunas) — `agent_id`, `nome_mitologico`, `squad_dono`, `tier`, `status`.
  - **2.2 Risco / ASL** (4 colunas) — `ASL` (1..4+), `ASL_justificativa`, `ASL_data_declaracao`, `red_team_log_ultima_data`. Regra de coerência ASL × cadência de red team declarada por nível.
  - **2.3 Controle Gates G1-G4** (4 colunas — severidade **BLOCK**) — `G1_constitution_ok`, `G2_ASL_declarado_ok`, `G3_uncertainty_e_aspiration_ok`, `G4_off_switch_ok` (só ASL-3+). Falha em qualquer G1-G4 → linha inteira vermelha.
  - **2.4 Controle Gates G5-G8** (4 colunas — severidade **WARN/INFO** condicional) — `G5_interpretability_score` (heurística 0-5 declarada em §4), `G6_orthogonality_e_instrumental_ok`, `G7_grounding_compulsorio_ok`, `G8_predictions_scorecard_status`.
  - **2.5 Constituição per-agent** (3 colunas) — `constitution_path`, `constitution_num_principios`, `constitution_ultima_revisao`. Exceção nomeada: SOLO ASL-1 pode herdar sem constitution.md próprio.
  - **2.6 Migração MCP** (5 colunas — herdado da Sub-onda 1.3) — `wrappers_proprietarios_ativos`, `wrappers_migrados`, `wrappers_em_dupla_vida_ate_data`, `wrappers_em_excecao_arquitetural`, `data_limite_migracao_mais_proxima`.
- **Regra invariante Brooks 1991** (§3): agregações são **derivadas em tempo de render**, nunca cacheadas.
- **Rubrica heurística G5** (§4) — 0-5 por critério observável (loop_pattern declarado; log ReAct em registros; tools restritas por especialista; PRD §11 com tabela de decomposição; constituição per-agent com procedência). Declarada como *inicial*, sujeita à substituição via ida-e-volta Liceu-chief na Onda 6 do Método.
- **7 fontes de dados canônicas** (§5) — roster, registro-de-entidades, PRD, CLAUDE.md, constitution.md, ferramentas.md, red-team-log.
- **5 exceções nomeadas** (§7) — Caos/Dike como meta; SOLO ASL-1 sem constitution; adapters runtime bidirecional; SOLO CLI sem log persistente; G4 `n/a` para ASL-1/2.
- **O que NÃO está no escopo** (§8) — motor de coleta, interface interativa, alertas por Slack/e-mail. Ficam para Fase 3 (Contrato residual `m-2026MMDD-implementacao-mcp-e-dashboard`).

## Procedência (linha-a-linha ancorada em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`)

| Bloco / conceito | Fonte primária | Linhagem (Onda do dossiê) | Ano |
|---|---|---|---|
| Estrutura por-agente + ASL (§2.2) | Anthropic *Responsible Scaling Policy v1.0* | Onda 4 (labs-frontier) | 2023 |
| G1 constitution + G6 orthogonality/instrumental | Bai, Kadavath, Kundu, Askell et al. *Constitutional AI* (arXiv 2212.08073) + Bostrom *Superintelligent Will* (Minds and Machines 22) / *Superintelligence* cap. 7 | Onda 4 + Onda 5 | 2022 + 2012/2014 |
| G3 uncertainty | Russell *Human Compatible* (Viking) | Onda 5 (alinhamento) | 2019 |
| G4 off-switch (ASL-3+) | Hadfield-Menell, Russell (IJCAI) *The Off-Switch Game* | Onda 5 | 2017 |
| G5 interpretabilidade (heurística) | Amodei-Olah-Steinhardt-Christiano-Schulman-Mané *Concrete Problems in AI Safety* (arXiv 1606.06565) §Interpretability | Onda 4 (via Amodei) | 2016 |
| G7 grounding compulsório | Brooks *Intelligence Without Representation* (Artificial Intelligence 47) | Onda 5 | 1991 |
| G8 predictions scorecard | Brooks rodneybrooks.com/blog *Predictions Scorecard* series (8 edições anuais) | Onda 5 | 2018-2026 |
| §3 "mundo é seu próprio modelo" (não cachear agregado) | Brooks *Elephants Don't Play Chess* (Robotics and Autonomous Systems 6) + *Intelligence Without Representation* | Onda 5 | 1990-1991 |
| §2.6 MCP Camada 1 (5 colunas) | Sub-onda 1.3 deste Contrato (herança direta) | — | 2026-07-06 |

## Verificação G1 do CAOS-CL-002

- [x] Nenhum arquivo fora de `Caos/` tocado nesta normalização de path.
- [x] Working tree preservado (nenhuma leitura destrutiva; artefato original em `registros/` mantido).

## Handoff

Ver `Caos/registros/metodo-onda-1/1.4-safety/diff-cirurgico.md` (documento de aplicação) e
`Caos/registros/metodo-onda-1/1.4-safety/sumario-executivo.md` (gate humano).

## Histórico

| Versão | Data | Mudança |
|---|---|---|
| — | 2026-07-06 | Índice criado para atender à convenção do Método (5 artefatos padronizados em `1.4-safety/`). Arquivo canônico do schema permanece em `Caos/registros/dashboard-safety.md` v0.1.0. |

---

*Índice canônico da Sub-onda 1.4 — dashboard schema em `Caos/registros/dashboard-safety.md` v0.1.0.
Procedência ancorada em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` (Fase 1).*
