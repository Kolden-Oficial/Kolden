# Predictions Scorecard — Kolden — 2026-2027 (primeira safra)

> **Escopo:** organização Kolden (todas as squads sob a fábrica Caos + runtime Hermes + verificador Dike)
> **Emitido em:** 2026-07-06
> **Emitido por:** caos-chief (raiz Kolden) — sob Contrato m-20260706-metodo-kolden, Sub-onda 1.4
> **Contrato de origem:** m-20260706-metodo-kolden · Sub-onda 1.4
> **Referência constitucional:** Art. X G8 (Predictions Scorecard condicional) — Constituição v2.5.0
> **Fonte metodológica:** Brooks (2018-2026) rodneybrooks.com/blog *Predictions Scorecard* series — 8 edições
> anuais (2018 a 2026); metodologia: predição datada + critério verificável + revisão pública em 1º de janeiro.
> **Template:** `Caos/modelos/predicoes.yaml` (schema v1.0.0)

## 0. Por que existe

Sub-onda 1.4 do Método Kolden decidiu que a organização Kolden **passa a emitir predições datadas verificáveis
sobre a própria trajetória** — não como marketing, como Brooks (2018-2026): declarar antes, revisar depois,
publicar hits e misses.

Esta é a primeira safra. As 5 predições abaixo estão alimentadas por achados datáveis da **Sub-onda 1.3
(MCP Camada 1)** — não são chutes; são apostas ancoradas em inventário real.

O revisor padrão da safra é o `curador`. A cadência de revisão substantiva é anual (1º de janeiro); revisões
trimestrais existem para as predições com data-limite antes de 2026-12-31.

## 1. Regra estruturante da safra

Cada predição desta safra respeita os 5 campos obrigatórios do `predicoes.yaml`:

1. `data_limite` no futuro em 2026-07-06;
2. `criterio` em uma sentença única, verificável por comando/consulta declarado em `metodo_de_verificacao`;
3. `revisor` nominal;
4. `proxima_revisao` com cadência ≥ anual;
5. `procedencia` ancorada em documento datável de Sub-onda 1.3.

**Dificuldade a priori** declarada por predição (rubrica §4 do template `revisao-anual.md` — 1 trivial a
5 aposta contra consenso). A dificuldade a priori NÃO será recalibrada na revisão anual (Brooks 2019 —
regra explícita contra recalibração pós-facto).

## 2. Exceções nomeadas

- **(E1) KLD-PRED-2026-003 é CONDICIONAL** — depende de evento externo (MCP spec 2025-2026 publicar
  `streamable-http-transport` OU emenda Art. IV ratificada). Segue exceção E1 do `predicoes.yaml`.
- **(E2) Se algum contrato for cancelado antes da data-limite**, a predição associada vira `status: revogada`
  com justificativa — não removida silenciosamente.
- **(E3) Se alguma predição cumprir antecipadamente por sorte** (ex.: MCP oficial cair de graça), declarar
  `cumprida-antecipada` mas anotar que foi por evento não-controlado — Brooks 2019 §meta-comentário.

## 3. Predições — safra 2026-2027 (5 predições)

### KLD-PRED-2026-001 — Migração completa do Grupo A

```yaml
id: "KLD-PRED-2026-001"
data_limite: "2026-10-01"
criterio: >
  Até 2026-10-01, 100% dos 4 wrappers proprietários do Grupo A identificados na Sub-onda 1.3
  (ApifyClient em Argos; GHL PIT Key via curl em Pheme; GHL PIT Key via curl em Emporos;
  ElevenLabs SDK direto em Hermes tools) estão substituídos por MCPs oficiais já cadastrados
  em `dados/registro-de-entidades.yaml` (tipo: mcp).
metodo_de_verificacao: >
  Grep exaustivo em `Argos/`, `Pheme/`, `Emporos/`, `Hermes/` (excluindo `_staging/quarentena/`)
  pelos identificadores `ApifyClient`, `PIT Key`, `elevenlabs.client` retorna 0 ocorrências em
  código de produção. Grep positivo em `mcp__apify__`, `mcp__gohighlevel__`, `mcp__elevenlabs__`
  nos mesmos squads.
revisor: "curador"
cadencia_revisao: "trimestral"
proxima_revisao: "2026-10-01"
dificuldade_a_priori: 2
procedencia:
  contrato: "m-20260706-metodo-kolden"
  sub_onda: "1.3-mcp-camada-1"
  documento: "Caos/registros/metodo-onda-1/1.3-mcp-camada-1/plano-migracao-escalonada.md"
  achado_ancorado: "Grupo A — 4 substituições diretas (MCP oficial já existe)"
status: "aberta"
condicional: false
condicao: null
```

**Justificativa da dificuldade 2:** o plano da 1.3 declara janela de 7 dias como técnica; ampliei para
2026-10-01 (~12 semanas) porque migração real envolve testar em produção, negociar credenciais no Infisical,
retreinar orquestradores. Brooks 2018-2024 mostra que cronogramas de migração são sistematicamente
subestimados — margem de 12 semanas é honesta, não conservadora.

### KLD-PRED-2026-002 — ASL-3+ sem `interrupt_before` = 0

```yaml
id: "KLD-PRED-2026-002"
data_limite: "2026-12-31"
criterio: >
  Até 2026-12-31, o dashboard-safety.md (populado por Fase 3) mostra 0 agentes com
  ASL: 3 (ou superior) declarado que não tenham o reflexo `interrupt-before-mutation.sh`
  ativo em `.claude/hooks/` + teste OS-1 passando no registro do último Fase 7.
metodo_de_verificacao: >
  Intersecção da lista de agentes com ASL ≥ 3 no `dados/elenco-de-agentes.yaml` × grep
  positivo por `interrupt-before-mutation.sh` no `.claude/hooks/` correspondente × registro
  do último teste OS-1 no `roteiro-de-teste.md` do agente com resultado `PASS`.
revisor: "curador"
cadencia_revisao: "semestral"
proxima_revisao: "2026-12-31"
dificuldade_a_priori: 3
procedencia:
  contrato: "m-20260706-metodo-kolden"
  sub_onda: "1.1-identidade-ritual"
  documento: "Caos/constituicao.md §Art. X G4"
  achado_ancorado: "Art. X G4 (BLOCK para ASL-3+) ratificado na Sub-onda 1.1"
status: "aberta"
condicional: false
condicao: null
```

**Justificativa da dificuldade 3:** hoje o inventário Kolden tem 32 agentes criados, sem levantamento de
quantos vão ser classificados como ASL-3+ na varredura de conformação (Ondas 2-26 do Contrato mãe). Se
zero agentes forem classificados ASL-3+ ao fim de 2026, a predição vira `cumprida-por-vácuo` — declaro isso
como categoria válida (não tramposa) porque o dashboard-safety §2.3 aceita `null` para agentes ASL ≤ 2.

### KLD-PRED-2026-003 — Runtime bidirecional: decisão arquitetural resolvida (CONDICIONAL)

```yaml
id: "KLD-PRED-2026-003"
data_limite: "2027-01-01"
criterio: >
  Até 2027-01-01, uma das duas condições foi observada como fato datável:
    (a) MCP spec 2025-2026 publica `streamable-http-transport` estável (versão ≥ 2025-XX-XX)
        modelcontextprotocol.io — forçando migração compulsória em 90d dos 5 wrappers de
        exceção arquitetural (Discord, Slack, Telegram, WhatsApp Cloud, Google Chat);
    OU
    (b) Emenda formal ao Art. IV da Constituição Kolden ratificada via ida-e-volta Liceu-chief
        (Onda 6 do Método), aceitando a categoria "adapter de runtime bidirecional em tempo real"
        como exceção constitucional permanente.
metodo_de_verificacao: >
  Leitura de modelcontextprotocol.io/specification/versions em 2027-01-01 (busca ao vivo
  registrada com timestamp — Art. IX grounding) OU leitura de `Caos/constituicao.md`
  Art. IV versão ≥ 2.6.0 com histórico de versões declarando a emenda.
revisor: "curador"
cadencia_revisao: "anual"
proxima_revisao: "2027-01-01"
dificuldade_a_priori: 4
procedencia:
  contrato: "m-20260706-metodo-kolden"
  sub_onda: "1.3-mcp-camada-1"
  documento: "Caos/registros/metodo-onda-1/1.3-mcp-camada-1/sumario-executivo.md §3"
  achado_ancorado: "Rota D-1 (emenda constitucional) OU Rota D-2 (aguardar spec)"
status: "condicional-pendente"
condicional: true
condicao: >
  A predição depende de evento externo não-controlado pela Kolden (release da MCP spec
  ou aprovação de emenda). Se nenhum dos dois eventos ocorrer, a predição falha e o
  meta-comentário registra "aposta em cronograma externo não madurou" (Brooks 2018-2024
  Predictions Scorecard categoria "erro-por-hype").
```

**Justificativa da dificuldade 4:** aposta forte sobre dependência externa (Anthropic MCP spec) OU processo
interno pesado (ida-e-volta com Liceu-chief). Ambos são plausíveis mas nenhum é garantido em 12 meses. É a
aposta mais arriscada da safra.

### KLD-PRED-2026-004 — Grupo B (MCPs-próprios simples) em dupla-vida

```yaml
id: "KLD-PRED-2026-004"
data_limite: "2026-10-31"
criterio: >
  Até 2026-10-31, pelo menos 5 dos 6 MCPs-próprios simples identificados na Sub-onda 1.3
  (Speechmatics, Deepgram, SociaVault, Mistral-Voxtral, Groq-STT, MiniMax) estão registrados
  em `dados/registro-de-entidades.yaml` com tipo: mcp e status: ligado-em-dupla-vida.
metodo_de_verificacao: >
  Parser YAML do `dados/registro-de-entidades.yaml` retorna ≥ 5 entradas com tipo=mcp
  e status=ligado-em-dupla-vida dos 6 identificadores nominais. Alternativamente, presença
  de `Argos/mcp/speechmatics/`, `Argos/mcp/deepgram/`, `Argos/mcp/sociavault/`,
  `Hermes/mcp/mistral-voxtral/`, `Hermes/mcp/groq-stt/`, `Hermes/mcp/minimax/` com
  package.json ou pyproject.toml apontando servidor MCP.
revisor: "curador"
cadencia_revisao: "trimestral"
proxima_revisao: "2026-10-31"
dificuldade_a_priori: 3
procedencia:
  contrato: "m-20260706-metodo-kolden"
  sub_onda: "1.3-mcp-camada-1"
  documento: "Caos/registros/metodo-onda-1/1.3-mcp-camada-1/plano-migracao-escalonada.md"
  achado_ancorado: "Grupo B — 6 MCPs-próprios simples, janela 30d por MCP"
status: "aberta"
condicional: false
condicao: null
```

**Justificativa da dificuldade 3:** 6 MCPs em ~16 semanas é ~2.5 semanas por MCP — factível se ondas 2-26
de conformação distribuírem a carga por squads. Margem de 1 falha (≥ 5 de 6) reconhece que um MCP pode
travar em decisão de escopo (ex.: xAI consolidated vs separado) sem invalidar a predição.

### KLD-PRED-2026-005 — Predictions Scorecard como prática institucional

```yaml
id: "KLD-PRED-2026-005"
data_limite: "2027-01-01"
criterio: >
  Até 2027-01-01, pelo menos 3 agentes/organizações Kolden com predictions_scorecard: true
  no PRD publicaram sua primeira revisão anual em `Caos/registros/revisao-anual-<escopo>-2026.md`
  (usando o template `Caos/modelos/revisao-anual.md`). Candidatos naturais: a própria organização
  Kolden (este arquivo), Aletheia (discovery — Predictions Scorecard é método fundacional dela),
  Prometeu (arquitetura de inferência — previsões sobre benchmarks de modelo).
metodo_de_verificacao: >
  Contagem de arquivos com pattern `Caos/registros/revisao-anual-*-2026.md` ≥ 3, ou —
  alternativamente — em `<Agent>/registros/revisao-anual-2026.md` para agentes que
  gerenciam scorecard próprio.
revisor: "curador"
cadencia_revisao: "anual"
proxima_revisao: "2027-01-01"
dificuldade_a_priori: 3
procedencia:
  contrato: "m-20260706-metodo-kolden"
  sub_onda: "1.4-safety"
  documento: "Caos/modelos/predicoes.yaml + Caos/modelos/revisao-anual.md"
  achado_ancorado: "Predictions Scorecard institucionalizado como método via Sub-onda 1.4"
status: "aberta"
condicional: false
condicao: null
```

**Justificativa da dificuldade 3:** depende de 2 agentes (Aletheia + Prometeu, ou substitutos) marcarem
`predictions_scorecard: true` na revisão dos PRDs sob o Método. Kolden como org já cumpre (este arquivo).
Se ninguém mais aderir, a predição falha e a lição é "sub-onda 1.4 institucionalizou template mas não motivou
adesão" — Brooks 2024 categoria `erro-por-conservadorismo` (subestimei atrito de adoção).

## 4. Sumário — matriz-resumo

| ID | Data-limite | Cadência de revisão | Dificuldade a priori | Status | Condicional? |
|---|---|---|---|---|---|
| KLD-PRED-2026-001 | 2026-10-01 | trimestral | 2 | aberta | não |
| KLD-PRED-2026-002 | 2026-12-31 | semestral | 3 | aberta | não |
| KLD-PRED-2026-003 | 2027-01-01 | anual | 4 | condicional-pendente | sim |
| KLD-PRED-2026-004 | 2026-10-31 | trimestral | 3 | aberta | não |
| KLD-PRED-2026-005 | 2027-01-01 | anual | 3 | aberta | não |

**Estatística da safra:** 5 predições · dificuldade média 3.0 · 1 condicional · janela mais próxima 2026-10-01
(≈ 12 semanas) · janela mais distante 2027-01-01 (≈ 26 semanas).

## 5. Metodologia de emissão — declaração honesta

Estas 5 predições foram escolhidas por 3 critérios (Brooks 2018-2026):

1. **Ancoradas em fato datável.** Cada uma cita documento da Sub-onda 1.3 ou Constituição v2.5.0. Não são
   chutes; são apostas sobre cronograma de execução Kolden.
2. **Distribuídas em dificuldade.** 1 fácil-ish (001), 3 médias (002/004/005), 1 arriscada (003). Não são
   todas fáceis (o que inflaria o scorecard) nem todas impossíveis (o que desqualificaria o exercício).
3. **Testáveis por comando declarado.** Cada `metodo_de_verificacao` é executável. Se a revisão anual precisar
   inventar como testar, a predição foi mal escrita — regra Brooks 2019.

**O que NÃO está aqui (e por quê):**

- Predições sobre **adoção de agentes por clientes externos** — Kolden é infra interna ainda; não faz sentido
  emitir predições sobre mercado que não existe.
- Predições sobre **capacidade de modelos** (ex.: "Claude 5 será lançado antes de Y") — foge do escopo de
  auto-governança organizacional; Brooks e Amodei emitem essas em espaços separados.
- Predições sobre **finanças Kolden** (receita, custo) — escopo Plutos (CFO) — não desta safra.
- Predições sobre **squads específicos** (ex.: "Aletheia entrega framework Z até data W") — escopo do
  Predictions Scorecard próprio do squad, não desta safra organizacional.

## 6. Próxima revisão

**Data:** 2027-01-01 (revisão substantiva anual — Brooks 2018-2026 cadência).
**Revisor:** `curador` (delegação padrão) + `caos-chief` como revisor auxiliar.
**Revisões intermediárias:** trimestral para predições com data-limite antes de 2026-12-31 (001, 004);
semestral para 002; anual para 003 e 005.
**Documento resultante:** `Caos/registros/revisao-anual-kolden-2026.md` — usando template
`Caos/modelos/revisao-anual.md`.

## 7. Histórico

| Versão | Data | Mudança |
|---|---|---|
| 0.1.0 | 2026-07-06 | Sub-onda 1.4 do Contrato m-20260706-metodo-kolden: primeira safra Kolden 2026-2027 — 5 predições ancoradas em Sub-onda 1.3, distribuídas em dificuldade 2-4, cadência de revisão declarada por predição. Documento é o `predicoes.yaml` do escopo `kolden` renderizado em markdown para leitura + arquivamento. |

---

*Predictions Scorecard Kolden 2026-2027 — primeira safra. Declarar antes, revisar depois. Publicar hits e
misses. Não recalibrar dificuldade retroativamente. Brooks 2018-2026, adaptado ao Método Kolden.*
