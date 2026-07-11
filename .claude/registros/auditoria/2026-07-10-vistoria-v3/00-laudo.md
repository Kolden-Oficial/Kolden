# Vistoria Estrutural v3 — Laudo (2026-07-10)

> Revisão completa da estrutura de agentes da Kolden: falhas, hierarquia, índices e travas operacionais.
> **Coleta:** 2026-07-09 → 2026-07-10, sessão raiz `C:\Kolden\`. Read-only; nada foi consertado — este laudo lavra.
> **Método:** baseline dirigido próprio (aritmética feita na sessão raiz, não por subagentes — regra validada 2026-06-28) + verificação delta contra a Vistoria v2 (2026-06-28) e contra o `METODO-KOLDEN.md v1.1`. Fan-out 0/3 por interdependência cross-squad (regra canônica METODO §8, 12ª ocorrência).
> **Atenção:** durante a coleta havia sessão paralela ativa fechando a Onda 4 do Olimpo (o `Olimpo/CLAUDE.md` foi corrigido 14→15 skills em tempo real). Os achados V3-05/V3-07 registram o estado no momento da coleta.

---

## 1. Placar consolidado

| Métrica | Valor |
|---|---|
| Frota declarada (AGENTS.md §Números) | 261 agentes (240 em 24 squads + 12 Prometeu/AIOX + 9 Caos) |
| **Frota real (chão)** | **262** (241 em 23 pastas `agents/` + 12 AIOX + 9 Caos) — delta: **Pluto 17 vs 16 declarados** (`hormozi-sales-coach.md` fora do índice) |
| Dike | esqueleto completo, `Dike/agents/` **vazio** — 0 agente funcional |
| Ondas do Método concluídas | 4 de 26 (Caos, Hermes, Prometeu, Olimpo — Olimpo semi-fechada, ver V3-05) |
| Agents da Camada 5 com campos canônicos G1/G2/G3 | **0 de 241** (medição por grep: `ASL:`, constituição, incerteza declarada) |
| Squads com reflexos + settings.json (G4 mecânico) | 9 de 27 (Aletheia, Argos, Ariadne, Caos, Dike, Hermes, Liceu, Olimpo, Prometeu) — **18 sem nenhum** |
| squad.yaml Kolden-native completo (veto+handoffs+entry+cross_cutting) | 10 squads; 8 parciais; **Pheme = zero**; Caos/Dedalo/Dike sem squad.yaml |
| Catálogo de dispatch do Hermes | 22 squads + 1 entrada `tarefa` — **Harmonia e Prometeu ausentes** |
| Roster (`Caos/dados/elenco-de-agentes.yaml`) | **9 de ~262** cartografados (arquivo declara "9 de ~194" — denominador também errado) |
| Achados novos desta vistoria | 12 (V3-01..V3-12): 3 CRÍTICOS, 3 ALTOS, 4 MÉDIOS, 2 BAIXOS |

## 2. Rastro v2 → v3 (o que fechou desde 2026-06-28)

| Achado v2 | Estado | Evidência |
|---|---|---|
| K-H3a/b/c — 6 sementes órfãos de roteamento (CRÍTICO) | **RESOLVIDO** | `Olimpo/agents/zeus.md` L126-160 `delegates_to_seed`; `poseidon.md` L19 `handoff_targets: [hestia, cairos, ananke]`; `hades.md` L19 `[nomos]`; `plutos.md` L19 `[pactolo]`; `afrodite.md` L19 `[emporos]` |
| K-008 — Égide sem veto (paradoxo CRÍTICO) | **RESOLVIDO** | `Egide/squad.yaml` bloco `veto:` com 4 HALTs (escopo/malware/detonação/evasão) |
| K-002 + K-012 — duplicação Caliope × copy-master (ALTO) | **RESOLVIDO** | consolidado 2026-06-28; `Caliope/agents/` = 33, sub-squad extinto |
| K-H2 — Hermes camada-2 sem agente Kolden (MÉDIO) | **RESOLVIDO** | Onda 2 (2026-07-06): `hermes-chief.md` + CLAUDE/PRD/constitution, score 8/8 |
| K-013/PSI-07 — fronteira de constituições implícita (MÉDIO) | **RESOLVIDO** | E6 canonizada no METODO v1.1 ("Kolden Art. X prevalece"); declarado em Hermes/Prometeu/Olimpo |
| PSI-01 — 2 formatos de squad.yaml | **EM ANDAMENTO** | via Ondas 2-26; 10 squads VHEC completos; Pheme parada (V3-10) |
| PSI-02 — vetos ausentes nos AIOX | **MAIORMENTE RESOLVIDO** | `veto` presente em todos os squad.yaml existentes exceto Pheme |
| PSI-06 — vetos em prosa, sem reflexo | **ABERTO** | 18 squads sem `.claude/reflexos/` (ver V3-09) |
| K-010 — Pheme em transição | **ABERTO** | ver V3-10 |
| K-004 — motor vendorizado Argos | não reavaliado (sem mudança detectada) | — |

---

## 3. Achados — o que trava a operação hoje

### 🔴 V3-01 (CRÍTICO) — Dike não existe como agente; auto-verificação na 10ª ocorrência consecutiva

- **Evidência:** `Dike/agents/` sem nenhum arquivo (esqueleto completo desde 2026-07-06: CLAUDE.md, prd-de-ia.md, MEMORY.md, ferramentas.md, roteiro-de-teste.md, settings.json + 8 reflexos). `Olimpo/registros/metodo-onda-4/sumario-executivo.md` declara "Papel Dike temporário pelo olimpo-chief — 10ª ocorrência consecutiva do padrão transitório". METODO §9: "Nas Ondas 2-26, Dike **deve** ser agent funcional independente".
- **Impacto:** o gate central do sistema (verificação independente TPND=0 na subida de TODO Contrato de Missão + Passo 6 de TODA Onda) é executado pelo próprio produtor da entrega. Auto-verificação com "3 salvaguardas" é transição declarada — 10 ocorrências não é transição, é regime. Nenhuma entrega da Kolden hoje passa por verificação verdadeiramente independente.
- **Remediação:** Onda 5 = nascimento da Dike via Contrato próprio no Ritual do Caos (a própria Onda 4 já recomenda: `sumario-executivo.md §8`). 1 sessão dedicada em `C:\Kolden\Caos\` (Ritual) + 1 em `C:\Kolden\Dike\` (Onda 5). **É o item de maior raio de explosão da fila.**

### 🔴 V3-02 (CRÍTICO) — Dispatch do Hermes com buracos: Harmonia e Prometeu invisíveis ao roteamento

- **Evidência:** `Hermes/squads-catalog.yaml` = 23 entradas: peitho, argos, liceu, pheme, caliope, aglaia, orfeu, aletheia, olimpo, themis, metis, pluto, dionisio, dedalo, egide, ariadne, nomos, pactolo, emporos, hestia, ananke, cairos + `tarefa` (entrada utilitária, não squad). **Harmonia (design systems/UX) e Prometeu (engenharia de software) não constam.**
- **Impacto:** o hermes-chief (orquestrador máximo, skill global) não roteia demanda de design nem de build de software — dois domínios inteiros caem em roteamento errado ou dependem de o Ronan invocar o squad manualmente. Exceções legítimas que NÃO são buraco: Caos (interativo por design), Hermes (é o próprio interpretador), Dike (agente pendente).
- **Impacto secundário:** não há dono cablado para atualizar o catálogo quando squad nasce/muda — a Fase 8 do Ritual (curador) não toca o `squads-catalog.yaml`.
- **Remediação:** (a) adicionar 2 entradas com keywords + `muda_algo` (~15 min); (b) acrescentar o catálogo do Hermes à Fase 8 do Ritual do Caos como artefato obrigatório de registro.

### 🔴 V3-03 (CRÍTICO) — USER.md não existe

- **Evidência:** `Hermes/USER.md` inexistente (Test-Path = False). AGENTS.md L45 e METODO §3 declaram o Hermes "dono do USER.md".
- **Impacto:** a matriz de risco verde/amarelo/vermelho com **autonomia progressiva** — coração da Camada 2 — não tem onde registrar a evolução de confiança por domínio. A regra constitucional do Hermes ("autonomia se conquista por acerto repetido + registro em log_de_decisao + USER.md") aponta para um arquivo fantasma. Cada sessão recomeça a calibração do zero.
- **Remediação:** criar `Hermes/USER.md` seed (perfil do Ronan + tabela domínio × cor × evidência de rebaixamento). ~30 min via sessão do Hermes.

### 🟠 V3-04 (ALTO) — Convenção `@` (dispatch) declarada como cross-sessão, mas sem mecanismo cablado

- **Evidência:** METODO §6: "`@` funciona **cross-sessão** — roteia para a sessão dedicada do squad". Hooks reais do workspace raiz (`.claude/settings.json`): apenas `marca-trabalho.sh` (PostToolUse) + `encerramento-aprendizado.sh` (Stop). Não há hook de UserPromptSubmit/dispatch. A implementação real é interpretativa: skill global `hermes-chief` + `Hermes/scripts/invoca-squad.ps1` + receita manual `wt.exe` (validada 2026-07-02). `@Olimpo:apolo` é TODO declarado no próprio `Olimpo/CLAUDE.md`.
- **Impacto:** o "sistema nervoso" da hierarquia de 5 camadas depende de o modelo lembrar da convenção. Em sessão nova/agente novo, `@Squad` pode simplesmente não fazer nada.
- **Remediação (decisão do Ronan):** (a) cablar hook de dispatch que detecta `^@<Squad>` e injeta o roteamento (1 sessão do Dédalo); ou (b) emendar METODO §6 rebaixando a promessa para "convenção interpretada pelo orquestrador da sessão" (5 min, honesto com a realidade atual).

### 🟠 V3-05 (ALTO) — Onda 4 do Olimpo: aplicada no disco, semi-commitada, rito não fechado

- **Evidência (estado na coleta):** commit `f7660232` capturou 6 arquivos (CLAUDE.md, prd-de-ia.md + 4 registros; 2.004 inserções). O restante do diff de 13 mudanças está no working tree: modificados `Olimpo/squad.yaml`, `MEMORY.md`, `README.md`, `.claude/skills/catalogo.md`; untracked `constitution.md`, `ferramentas.md`, `roteiro-de-teste.md`, `agent-memory/olimpo.md`, `.claude/agents/`, `.claude/reflexos/`, `.claude/settings.json`. O `sumario-executivo.md` commitado ainda diz "status: aguardando-gate-humano-passo-4" (o diff já foi aplicado). **Não existe `verificacao-dike-delta`** pós-aplicação (a Onda 2 do Hermes tem; a Onda 4 só tem a baseline). Passo 8 (AGENTS.md — que ainda diz "Próxima Onda: Onda 4 = Olimpo") e Passo 9 (METODO v1.2 com E4, que o próprio sumário recomenda) não executados.
- **Impacto:** metade da identidade canônica do Olimpo (constituição! settings! reflexo G4!) fora do repo — máquina nova ou reset não a recebe; e o rito de 9 passos do Método está aberto na Onda que é pré-requisito declarado do Grupo B.
- **Nota:** sessão paralela estava ativa corrigindo o CLAUDE.md durante esta coleta — parte disso pode já estar em fechamento.
- **Remediação:** fechar Passos 6-9 na sessão do Olimpo + commit do restante **sob ordem** (1 sessão curta).

### 🟠 V3-06 (ALTO) — Reestruturação de `sobre-a-empresa/` (2026-07-06) não propagada a nenhum índice

- **Evidência:** commits `1e309ffb` + `64a69278` (2026-07-06): "cria Kolden/ hierarquizada + Socios/, extrai ~217 arquivos" + "fecha deleções dos paths antigos". Chão real: `sobre-a-empresa/{Ferramentas, Kolden, Projetos, Socios}` com o cérebro em `Kolden/{areas, identidade, iniciativas, marca, mercado, operacao, _historico}`. Mas: **AGENTS.md §Mapa** descreve a estrutura antiga (`identidade/`, `areas/`, `mercado-e-posicionamento/`, `marca/`, `operacao/` na raiz); **METODO §7** cita `sobre-a-empresa/operacao/tarefas/radar.yaml` (real: `sobre-a-empresa/Kolden/operacao/tarefas/radar.yaml`).
- **Impacto:** a regra de ouro nº 1 ("consulte a fonte") leva agentes a paths mortos há 4 dias. O radar (SSoT da Central de Tarefas, 118 tarefas) está "invisível" para quem segue o índice.
- **Remediação:** 1 sessão de reconciliação — AGENTS.md §Mapa + METODO §7 + varredura grep por `sobre-a-empresa/` em CLAUDE.md/skills que citem paths antigos.

### 🟡 V3-07 (MÉDIO) — Índice × chão: contagens divergentes no AGENTS.md

- **Evidência:** (a) Pluto = 17 no chão (`hormozi-sales-coach.md`, absorção B06 2026-06-29) vs 16 declarados — o 17º não está listado na seção do squad; (b) total real 262, não 261; (c) "Próxima Onda: Onda 4 = Olimpo" desatualizado (Onda 4 já rodou); (d) linha 33 do AGENTS.md virou um mega-parágrafo de ~1.900 palavras sobre o Prometeu — formato de changelog, não de índice (degrada a função de "índice/entrypoint" declarada no topo do arquivo).
- **Remediação:** mesma sessão de reconciliação do V3-06. Para (d): mover histórico de Ondas para os `registros/` dos squads e deixar 2-3 linhas por squad no índice.

### 🟡 V3-08 (MÉDIO) — RH dos agentes: roster cobre 9 de ~262

- **Evidência:** `Caos/dados/elenco-de-agentes.yaml` v0.1.0 (2026-06-26): "cobertura: 9 de ~194 agentes (backfill dos demais PENDENTE — fan-out não executado)". Denominador real ≈ 262.
- **Impacto:** "quem sabe X?" não tem fonte machine-readable; o cartão-de-identidade (Fase 5/8 do Ritual) só existe para o Olimpo + Dike-papel. Governança do Caos/curador opera às cegas sobre 96% da frota.
- **Remediação:** job de backfill via fan-out em ondas de 3 subagentes (~8-10 sessões) — ou aceitar formalmente que o roster é só para agentes pós-Método (declarar no arquivo, mudando a promessa).

### 🟡 V3-09 (MÉDIO estrutural — conhecido e planejado) — Gates canônicos zerados na Camada 5 + 18 squads sem G4 mecânico

- **Evidência:** grep em 241 `agents/*.md` de 22 squads: 0 com `ASL:`, 0 com bloco de constituição, 0 com incerteza declarada (hits isolados em Emporos/Liceu/Themis são menções casuais). 18 squads sem `.claude/settings.json`/reflexos: Aglaia, Ananke, Cairos, Caliope, Dedalo, Dionisio, **Egide**, Emporos, Harmonia, Hestia, Metis, Nomos, Orfeu, Pactolo, **Peitho**, **Pheme**, Pluto, Themis.
- **Leitura correta:** isto NÃO é surpresa — é o gap que as Ondas 5-26 existem para fechar (4/26 = ~15% da frota padronizada). O risco real é a **ordem**: pelo cronograma por grupos, Égide (cyber ofensivo, ASL-3 por natureza) é Onda 25 e Peitho (mexe em orçamento de ads real) é Onda ~21. Squads de mutação externa irreversível ficam sem off-switch mecânico por meses.
- **Remediação:** (a) re-priorizar Ondas por risco ASL-de-fato (Dike → Égide → Peitho/Pheme → resto), ou (b) pacote-mínimo interino: só `settings.json` + `interrupt-before-mutation.sh` nos 3-4 squads de maior risco (1 sessão, sem esperar a Onda completa de cada um).

### 🟡 V3-10 (MÉDIO) — Pheme: único squad sem nenhum marcador Kolden no squad.yaml (K-010, aberto desde a v2)

- **Evidência:** `Pheme/squad.yaml` formato AIOX puro (`aios: minVersion 4.0.0`, `slashPrefix`) — sem `veto`, sem `cross_cutting`, sem `external_handoffs`, sem `entry_agent`. E Pheme **publica de verdade** (Postiz/GHL) = mutação de canal externo.
- **Remediação:** migração canônica já prevista; elevar prioridade por ser squad publicador (casa com V3-09b).

### 🔵 V3-11 (BAIXO) — Caos e Dedalo sem squad.yaml

- Caos: estrutura própria de fábrica — exceção razoável, mas nunca formalizada (a carta de exceções da v2 não a cobre). Dedalo: gap simples. Dike: ok (nasce com o agente).

### 🔵 V3-12 (BAIXO) — Higiene de workspace

- `teste-cline.md` na raiz (untracked, artefato de teste de outra ferramenta — apagar ou mover).
- `Caos/_staging/quarentena` = **662 MB** no disco (git-ignored ✓; mas pesa em backup/varredura — o Glob global desta vistoria estourou timeout por causa dele). Limpável conforme a dívida F6 fecha.
- `.claude/_staging/` = 33 MB **versionados** no repo (clones de import); AGENTS.md já os declara "limpáveis" — decisão pendente.
- Working tree atual mistura 3 frentes (Onda 4 Olimpo + aprendizados Hermes + dossiê BRW) — nada perdido; commits atômicos por frente quando ordenado.

---

## 4. Fila de remediação (severidade × raio de explosão)

| # | Item | Achados | Esforço | Efeito |
|---|---|---|---|---|
| 1 | **Nascimento da Dike** (Ritual do Caos + Onda 5) | V3-01 | 2 sessões | Verificação independente real para TODAS as entregas e Ondas seguintes |
| 2 | **+2 entradas no squads-catalog.yaml** (Harmonia, Prometeu) + cablar catálogo na Fase 8 do Ritual | V3-02 | 15-30 min | Hermes roteia 100% dos domínios |
| 3 | **Criar `Hermes/USER.md` seed** | V3-03 | 30 min | Autonomia progressiva deixa de ser apátrida |
| 4 | **Fechar Onda 4** (dike-delta + Passos 8-9) + commit sob ordem | V3-05 | 1 sessão curta | Olimpo canônico inteiro no repo; rito íntegro |
| 5 | **Reconciliar índices** (AGENTS.md + METODO §7 vs chão pós-reestruturação; contagens; dieta do §Números) | V3-06, V3-07 | 1 sessão | Regra de ouro nº 1 volta a funcionar |
| 6 | **Pacote-mínimo G4 interino** (settings + interrupt-before-mutation) em Égide, Peitho, Pheme — ou re-priorizar Ondas por risco | V3-09, V3-10 | 1 sessão | Off-switch mecânico onde a mutação externa é real |
| 7 | **Decidir mecânica do `@`** (hook vs emenda honesta ao §6) | V3-04 | 5 min a 1 sessão | Promessa e realidade alinhadas |
| 8 | Backfill do roster (fan-out em ondas de 3) | V3-08 | 8-10 sessões | RH dos agentes utilizável |
| 9 | Higiene (teste-cline, stagings) | V3-12 | <1h | Workspace limpo |

**Itens 1-5 são o que efetivamente trava "rodar 100%": ~5-6 sessões.** O restante é o plano de Ondas que já existe (correto, só re-priorizável por risco).

## 5. O que NÃO é falha (anti-falso-positivo)

- **3 cópias dos 12 agentes AIOX no Prometeu** (`.aiox-core/`, `.claude/agents/`, `.claude/commands/AIOX/`, `.claude/skills/AIOX/`) — decisão canônica E1 (vendor preservado + invólucro), declarada e verificada nas Sub-ondas 3.1-3.3.
- **`Hermes/agent-memory/hermes.md` modificado** — aprendizados legítimos do ritual de encerramento de 2026-07-09 (BRW), pendentes de commit por política.
- **Vetos do Hermes/Prometeu fora do squad.yaml** — moram nas `constitution.md` respectivas (padrão das Ondas 2-3, 8/8 verificado).
- **6 sementes com squad.yaml VHEC completo** — os squads-semente estão estruturalmente à frente de vários squads antigos.
- **Zeus em 2 degraus (Camada 3-4 combinada)** — design intencional, agora formalizado pela Onda 4 como caso canônico candidato a emenda §3.

---

*Vistoria v3 lavrada em 2026-07-10 pela sessão raiz. 12 achados (V3-01..V3-12) em `achados.jsonl`. Baseline: Vistoria v2 (2026-06-28) + METODO-KOLDEN v1.1. Sem commit até ordem explícita.*
