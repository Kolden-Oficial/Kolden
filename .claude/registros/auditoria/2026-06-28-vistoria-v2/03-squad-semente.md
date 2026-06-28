# 03 — Auditoria do Lote 1: 6 Squads-Semente

> Lote 1 cobre os 6 squads-semente criados em 2026-06-28 (commit `924c3a79`): Nomos, Pactolo, Êmporos, Héstia, Ananke, Cairós. Total: 30 agentes (5 cada).
> Aplicação compactada de `auditoria-de-squad` + `qa-de-integracao-de-time` + `verificacao-de-alinhamento` num único relatório porque a estrutura é uniforme.

## Estrutura uniforme (verificada nos 6)

| Item | Padrão | Verificação |
|---|---|---|
| `squad.yaml` | versão 0.1.0, `status: semente` | ✅ todos os 6 |
| Tier 0 (orquestrador) | 1 agente `<nome>-chief` | ✅ todos os 6 |
| Tier 1 (especialistas) | 4 agentes | ✅ todos os 6 (5 arquivos `agents/*.md` total cada) |
| Skills em `.claude/skills/` | 5 skills + `catalogo.md` | ✅ todos os 6 (30 skills no total) |
| Handoffs internos (`handoffs:`) | chief routes_to N especialistas, cada um escalates_to | ✅ todos os 6 |
| Handoffs externos (`external_handoffs:`) | 3–5 handoffs to/from outros squads | ✅ todos os 6 |
| Vetos (`cross_cutting.veto`) | 3–5 vetos invioláveis em prosa | ✅ todos os 6 (mas **ainda em prosa**, não materializados como reflexo) |
| `MEMORY.md` | presente | ✅ todos os 6 |

## Veredito por classe (todos os 6)

### A. Config — **OK com observação de maturidade**
- `squad.yaml` parseia, declara `entry_agent`, tiers, agents com `file:` apontando para arquivos reais.
- Verificado para Hestia, Cairos, Nomos, Pactolo, Emporos, Ananke (`Hestia/squad.yaml:39-64`, `Cairos/squad.yaml:42-67`, `Nomos/squad.yaml:40-65`, `Pactolo/squad.yaml:38-63`, `Emporos/squad.yaml:37-62`, `Ananke/squad.yaml:41-66`).
- Cada arquivo `file:` declarado em `agents:` mapeia para arquivo existente (Glob `<Squad>/agents/*.md` retorna exatamente os 5 arquivos esperados).
- **Achado de maturidade (não defeito)**: vetos estão em prosa (`cross_cutting.veto`), ainda não materializados como reflexo PreToolUse + checklist. Cada `squad.yaml` declara isso como pendente do "refino pelo Ritual do Caos". → matriz de maturidade.

### B. Liveness — **OK intra-squad, ÓRFÃOS inter-camada**
- Intra-squad: chief tem `routes_to: [4 especialistas]`; cada especialista tem `escalates_to: [chief + 1 outro]`. Grafo conectado, sem ilhas.
- Inter-camada: **ÓRFÃOS** (já registrado em K-H3a, K-H3b, K-H3c). Nenhum dos 6 é destinatário em `routing_triggers` dos executivos do Olimpo.

### C. Hierarquia — **OK**
- Tier 0 + Tier 1 com responsabilidade clara em cada `tiers.tier_X.purpose`.
- Nenhum ciclo.

### D. Roteamento — **CRÍTICO** (cobertura externa)
- Já coberto em `02-hipoteses.md`. 6/6 órfãos de roteamento de descida. Severidade CRÍTICO.

### E. Contrato I/O — **OK declarativo, NÃO TESTADO em runtime**
- `external_handoffs` declara contratos de troca:
  - Hestia: caos (RH de agentes), olimpo (headcount), caliope/aglaia/pheme (marca empregadora), metis (analytics), jurídico inexistente (escalar).
  - Cairos: prometeu (build de software), olimpo (portfólio), aletheia (discovery), metis (medição).
  - Nomos: themis (risco estratégico), egide (segurança técnica/DLP), pactolo (finanças).
  - Pactolo: plutos (decisão estratégica), metis (analytics), argos (inteligência de mercado).
  - Emporos: pheme+ariadne (leads de entrada), afrodite (estratégia de receita), ghl (via Infisical), afrodite (pós-venda).
  - Ananke: poseidon (estratégia), dedalo (build de automação), metis (medição), pluto (custo), egide (risco).
- **Não verificado** se o destino também aceita esse contrato (handshake bidirecional). Ex.: Pactolo declara `to: plutos`, mas Plutos não tem `from: pactolo` em seu próprio yaml. → Achado **K-005** (MÉDIO, contrato).

### F. Coerência de dados — **OK**
- `keywords` exaustivas em cada squad (30+ por semente).
- `focus` por agente é específico (sem genérico).
- Ícones distintos (não há colisão de glifo).
- Skills carregam o nome do domínio (sem duplicata cross-squad — `recrutamento-e-selecao` só na Héstia, `unit-economics-operacional` só na Pactolo, etc.).

### G. Segurança — **OK**
- Todos os 6 declaram `credencial_texto_puro: HALT` ou equivalente em vetos.
- Zero hits de segredo na varredura global do Passo 2.

## Tabela final de scores (matriz por squad × classe)

| Squad | A | B-intra | B-inter | C | D | E | F | G | Achado-chave |
|---|---|---|---|---|---|---|---|---|---|
| Nomos | OK | OK | **CRIT** | OK | **CRIT** | MED | OK | OK | K-H3c |
| Pactolo | OK | OK | **CRIT** | OK | **CRIT** | MED | OK | OK | K-H3c, K-005 |
| Êmporos | OK | OK | **CRIT** | OK | **CRIT** | MED | OK | OK | K-H3c |
| Héstia | OK | OK | **CRIT** | OK | **CRIT** | MED | OK | OK | **K-H3a** (órfão completo) |
| Ananke | OK | OK | **CRIT** | OK | **CRIT** | MED | OK | OK | K-H3c |
| Cairós | OK | OK | **CRIT** | OK | **CRIT** | MED | OK | OK | **K-H3b** (órfão completo) |

## Achados novos do lote (entram no JSONL)

```json
{"id":"K-005","severidade":"MEDIO","classe":"contrato","titulo":"Contratos de handoff dos 6 semente são unilaterais — squad-semente declara para quem entrega/recebe, mas o destino (executivo do Olimpo ou squad par) não declara from/to recíproco. Sem handshake bidirecional, o roteamento de runtime depende de inferência.","evidencia":[{"arquivo":"Hestia/squad.yaml","linha":80},{"arquivo":"Cairos/squad.yaml","linha":82},{"arquivo":"Nomos/squad.yaml","linha":80},{"arquivo":"Pactolo/squad.yaml","linha":80},{"arquivo":"Emporos/squad.yaml","linha":77},{"arquivo":"Ananke/squad.yaml","linha":82}],"hipotese_pai":"H3","raio_de_explosao":"handshake-quebra-no-runtime","recomendacao_breve":"adicionar contraparte (from/to) nos squad.yaml dos destinos OU instituir a regra de que routing_triggers do executivo é a verdade unilateral suficiente","status":"aberto"}
{"id":"K-006","severidade":"MEDIO","classe":"config","titulo":"Vetos dos 6 semente estão em prosa (cross_cutting.veto), ainda não materializados como reflexo PreToolUse — característica esperada de status=semente, mas confere risco até o Ritual do Caos completar","evidencia":[{"arquivo":"Hestia/squad.yaml","linha":100},{"arquivo":"Pactolo/squad.yaml","linha":93},{"arquivo":"Emporos/squad.yaml","linha":94},{"arquivo":"Ananke/squad.yaml","linha":100},{"arquivo":"Nomos/squad.yaml","linha":94},{"arquivo":"Cairos/squad.yaml","linha":100}],"hipotese_pai":null,"raio_de_explosao":"veto-pode-ser-burlado-por-agente","recomendacao_breve":"priorizar o refino completo dos 6 semente pelo Ritual do Caos (gera reflexo+checklist+checkpoint)","status":"aberto-maturidade"}
```

## Matriz de maturidade (entra em `00-resumo.md`)

| Squad | Status | PRD detalhado | Ritual 9 fases | Vetos como reflexo | Origem |
|---|---|---|---|---|---|
| Nomos | semente | ❌ | ❌ | ❌ (prosa) | lote-2026-06-26 |
| Pactolo | semente | ❌ | ❌ | ❌ (prosa) | lote-2026-06-26 |
| Êmporos | semente | ❌ | ❌ | ❌ (prosa) | lote-2026-06-26 |
| Héstia | semente | ❌ | ❌ | ❌ (prosa) | lote-2026-06-26 |
| Ananke | semente | ❌ | ❌ | ❌ (prosa) | lote-2026-06-26 |
| Cairós | semente | ❌ | ❌ | ❌ (prosa) | lote-2026-06-26 |

Dívida total do lote: 6 squads × 9 fases do Ritual + 6 conjuntos de reflexos. **Bloqueia uso em produção**.

## Próximo passo recomendado
1. Resolver K-H3 (CRÍTICO) **primeiro** — alterar `routing_logic` de Hades/Plutos/Afrodite/Poseidon + Zeus para nominar os semente.
2. Em paralelo, abrir frente de refino pelo Ritual do Caos para os 6, ordenando por raio de explosão (Héstia/Cairós primeiro — órfãos completos).
