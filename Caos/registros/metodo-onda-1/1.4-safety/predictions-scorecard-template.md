---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/metodo-onda-1/1.4-safety/dashboard-schema|dashboard-schema]]"
  - "[[Caos/registros/metodo-onda-1/1.4-safety/diff-cirurgico|diff-cirurgico]]"
  - "[[Caos/registros/metodo-onda-1/1.4-safety/sumario-executivo|sumario-executivo]]"
---

# Predictions Scorecard — Template canônico (índice da Sub-onda 1.4)

> **Sub-onda:** 1.4 (Safety Dashboard + Predictions Scorecard) do Contrato `m-20260706-metodo-kolden`
> **Papel deste arquivo:** índice canônico dos 3 artefatos que compõem o mecanismo Predictions Scorecard Kolden.
> **Fonte metodológica:** Brooks (2018-2026) rodneybrooks.com/blog *Predictions Scorecard* series (8 edições anuais)
> **Referência constitucional:** Art. X G8 (Predictions Scorecard condicional) — Constituição v2.5.0
> **Data:** 2026-07-06

## Os 3 artefatos que institucionalizam o mecanismo

A Sub-onda 1.4 entrega o mecanismo Brooks Predictions Scorecard como prática institucional Kolden
via três arquivos que se compõem: template YAML de emissão + template markdown de revisão + primeiro
caso concreto (a organização Kolden emite sua safra 2026-2027 como dogfooding).

| # | Arquivo canônico | Papel | Uso |
|---|---|---|---|
| 1 | `Caos/modelos/predicoes.yaml` | **Template YAML** — schema v1.0.0 para emissão de scorecard de qualquer escopo (agente, org, squad, contrato) | Copiar para `predictions-scorecard-<escopo>-<ano>.yaml` e preencher os 5 campos obrigatórios |
| 2 | `Caos/modelos/revisao-anual.md` | **Template markdown** — estrutura de revisão anual (10 seções) para publicar em 1º de janeiro (cadência Brooks) | Copiar para `Caos/registros/revisao-anual-<escopo>-<ano>.md` e preencher a partir do `predicoes.yaml` correspondente |
| 3 | `Caos/registros/predictions-scorecard-kolden-2026.md` | **Primeiro caso concreto** — a organização Kolden emitindo sua safra 2026-2027 (5 predições ancoradas na Sub-onda 1.3 + Constituição v2.5.0) | Documento vivo — próxima revisão substantiva 2027-01-01 |

Uma versão **puramente YAML** das 5 predições Kolden 2026-2027 (extraída do MD populado, no formato
canônico do template `predicoes.yaml`) fica em `Caos/registros/metodo-onda-1/1.4-safety/predicoes-2026-2027.yaml`.

## Regra estruturante do template `predicoes.yaml`

**5 campos obrigatórios** por predição (senão não entra no scorecard — é hipótese solta):

1. `data_limite` — ISO 8601 no futuro relativo à emissão.
2. `criterio` — sentença única verificável por comando/consulta declarado em `metodo_de_verificacao`.
3. `revisor` — nominal (agente Kolden OU humano — nunca "todos").
4. `proxima_revisao` — cadência ≥ anual (Brooks 2018-2026 = 1º de janeiro).
5. `procedencia` — contrato + sub-onda + documento + achado ancorado.

**3 exceções nomeadas** no template:
- **(E1) CONDICIONAL** — critério depende de evento externo não-controlado → `condicional: true` + `condicao` textual.
- **(E2) REVOGADA** antes da data-limite — mantida com `status: revogada` + `justificativa`; remoção silenciosa vetada (rastreabilidade Brooks).
- **(E3) CUMPRIDA-ANTECIPADA** por acaso — fechar com `status: cumprida-antecipada` + data real; não usar como prova de habilidade preditiva se foi sorte — declarar honestamente (Brooks 2019 §meta-comentário).

## Regra estruturante do template `revisao-anual.md`

**7 pontos obrigatórios** para o ciclo fechar (senão é rascunho, não revisão):

1. Data da revisão em ISO 8601 (convenção: `AAAA-01-01`).
2. Todas as predições com `data_limite ≤ data-da-revisao` são resolvidas — nada pendente sem justificativa.
3. **Score bruto** `X / N` — cumpridas / avaliadas (sem ponderação subjetiva).
4. **Score calibrado por dificuldade** em coluna separada (rubrica §4 do template).
5. Justificativa por predição-falhou cita **causa raiz** (não "não deu tempo").
6. Lições capturadas viram entrada no `MEMORY.md` do agente/org OU em `dados/padroes-aprendidos.yaml`.
7. Próxima janela declarada — nova safra apendada ao `predicoes.yaml`.

**Rubrica de dificuldade a priori** (1-5, Brooks 2019 — não reajustar retroativamente):
- 1 = trivial (roadmap público + owner claro + horizonte curto)
- 2 = provável (dependência interna resolvível, mas real)
- 3 = contestável (dependência externa parcialmente controlada)
- 4 = arriscada (dependência externa forte — spec, mercado, terceiros)
- 5 = aposta contra consenso (contradiz projeções vigentes)

**Score calibrado** (Brooks 2024 categoria "aposta arriscada que deu certo"):
- `+1,0` por cumprida em dificuldade 4-5
- `+0,5` por cumprida em dificuldade 2-3
- `+0,1` por cumprida em dificuldade 1 (crédito simbólico — era fácil)
- `−1,0` por falhou em dificuldade 1-2 (deveria ter cumprido)
- `−0,4` por falhou em dificuldade 3-4 (aposta razoável não vingou)
- `0` por falhou em dificuldade 5 (aposta contra consenso — falhar não é vergonha, mas não pontua)

## Primeira safra Kolden 2026-2027 — resumo

**5 predições · dificuldade média 3.0 · 1 condicional · janela mais próxima 2026-10-01 · janela mais distante 2027-01-01**

| ID | Data-limite | Cadência | Dificuldade | Status | Condicional? |
|---|---|---|---|---|---|
| KLD-PRED-2026-001 (Grupo A migrado) | 2026-10-01 | trimestral | 2 | aberta | não |
| KLD-PRED-2026-002 (ASL-3+ sem interrupt = 0) | 2026-12-31 | semestral | 3 | aberta | não |
| KLD-PRED-2026-003 (runtime bidirecional resolvido) | 2027-01-01 | anual | 4 | condicional-pendente | sim (Rota D-1 OU D-2) |
| KLD-PRED-2026-004 (Grupo B em dupla-vida) | 2026-10-31 | trimestral | 3 | aberta | não |
| KLD-PRED-2026-005 (Scorecard como prática institucional) | 2027-01-01 | anual | 3 | aberta | não |

Categorias explícitas de erro possível (Brooks 2024 §meta-comentário) declaradas antes:
- `erro-por-hype` — cronograma otimista demais (mais provável em 001 e 004).
- `erro-por-conservadorismo` — margem exagerada de segurança (mais provável em 002).
- `erro-de-execução-interna` — squad desviou prioridade (aplicável a 001, 004, 005).
- `erro-de-modelo-do-mundo` — Kolden apostou em spec externa que não maturou (aplicável a 003).

## O que NÃO está nesta safra (e por quê)

- Predições sobre **adoção externa** — Kolden é infra interna ainda; não faz sentido predizer mercado inexistente.
- Predições sobre **capacidade de modelos** — foge do escopo de auto-governança organizacional (Brooks e Amodei fazem em espaços separados).
- Predições sobre **finanças Kolden** — escopo Plutos (CFO), não esta safra.
- Predições sobre **squads específicos** — escopo do scorecard próprio do squad, não organizacional.

## Procedência

Toda estrutura desta institucionalização é ancorada em `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`:

- **G8 predictions scorecard** — Brooks *Predictions Scorecard* series 2018-2026 (Onda 5 do dossiê).
- **Auto-governança verificável** — Amodei / Anthropic *Responsible Scaling Policy* 2023 (Onda 4).
- **Categoria "aposta contra consenso"** — Bostrom (2012) *The Superintelligent Will* + (2014) *Superintelligence* cap. 7 (Onda 5).

## Verificação G1 do CAOS-CL-002

- [x] Nenhum arquivo fora de `Caos/` tocado.
- [x] Templates canônicos em `Caos/modelos/` preservados (Sub-onda 1.4 os criou — sessão anterior; esta sessão apenas indexa).
- [x] Working tree fora de `Caos/registros/metodo-onda-1/1.4-safety/` intacto nesta normalização.

## Handoff

- **Aplicação institucional (Ondas 2-26):** cada squad decide na Fase 1 do Ritual se `predictions_scorecard: true` no PRD. Se sim, herda o mecanismo aqui.
- **Primeira revisão substantiva:** 2027-01-01 — o `curador` (+ `caos-chief` auxiliar) publica `Caos/registros/revisao-anual-kolden-2026.md` usando `revisao-anual.md`.
- **Revisões intermediárias:** trimestral para 001/004 (janela crítica de migração MCP); semestral para 002; anual para 003 e 005.

## Histórico

| Versão | Data | Mudança |
|---|---|---|
| — | 2026-07-06 | Índice criado para atender à convenção do Método. Templates canônicos e primeiro caso concreto foram entregues pela Sub-onda 1.4 (sessão anterior); esta sessão consolida em `1.4-safety/` para conformar ao padrão de 5 artefatos por sub-onda. |

---

*Índice canônico da Sub-onda 1.4 — mecanismo Predictions Scorecard institucional Kolden. Fonte
única em `Caos/modelos/predicoes.yaml` (schema) + `Caos/modelos/revisao-anual.md` (revisão) +
`Caos/registros/predictions-scorecard-kolden-2026.md` (primeiro caso).*
