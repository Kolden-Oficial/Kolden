# Revisão Anual — Template canônico Kolden

> **Contrato de origem:** m-20260706-metodo-kolden · Sub-onda 1.4
> **Referência constitucional:** Art. X G8 (Predictions Scorecard condicional) — Constituição v2.5.0
> **Fonte metodológica:** Brooks (2018-2026) rodneybrooks.com/blog *Predictions Scorecard* series — revisão
> pública em 1º de janeiro; publicação continuada de hits e misses; critério declarado antes, não depois.

## Regra

Uma revisão anual de scorecard preenche este template se, e somente se:

1. **Data da revisão** é ISO 8601 (por convenção, `AAAA-01-01` — cadência Brooks).
2. **Todas as predições com `status: aberta` na data-limite ≤ data da revisão** são resolvidas em
   `cumprida | cumprida-antecipada | falhou | revogada` — nada fica pendente sem justificativa.
3. **Score bruto** é `X / N` (cumpridas sobre total avaliadas — sem ponderação subjetiva na coluna bruta).
4. **Score calibrado por dificuldade** existe como coluna **separada** e usa a rubrica §4 abaixo.
5. **Justificativa por predição-falhou** cita causa raiz — não "não deu tempo".
6. **Lições capturadas** viram entrada no `MEMORY.md` do agente/organização OU em `dados/padroes-aprendidos.yaml`
   via curador (Ritual de Encerramento).
7. **Próxima janela declarada** — nova safra de predições para o ciclo seguinte é escrita aqui, com data de
   emissão + revisor, e apendada ao YAML `predicoes.yaml` correspondente.

Revisão que pule qualquer um dos 7 pontos NÃO fecha o ciclo — é rascunho.

## Exceções nomeadas

- **(E1) Escopo sem predições vencidas na data-limite:** revisão vira "revisão-inventário" — apenas
  registra que N predições estão abertas mas não vencidas, revisão substantiva salta para ano seguinte.
  Não pular anos consecutivos: 2 anos sem revisão substantiva = BLOCK em Fase 8 do próximo ciclo do agente.
- **(E2) Escopo desativado no meio do ano:** predições abertas viram `status: revogada` com justificativa
  "escopo desativado — <razão>"; documento de revisão explicita e é a última entrada do arquivo.
- **(E3) Revisão fora do ciclo padrão (ex.: crise, mudança arquitetural):** aceito com `motivo` textual e
  `emergencia: true` no header; próxima revisão volta ao ciclo padrão.

## Exemplos canônicos (referência)

- Brooks (2019) *"Predictions Scorecard, 2019 January 01"* — rodneybrooks.com/blog — revisão da safra 2018:
  cada predição avaliada como *dot-year* (falhou / correta / adiada), tabela pública, comentário por linha.
- Brooks (2024) *"Predictions Scorecard, 2024 January 01"* — sétima edição; introduz distinção entre
  "predições que erraram por hype" e "predições que erraram por conservadorismo".
- Amodei (2023) Anthropic *Responsible Scaling Policy v1.0* — revisão pública da matriz ASL a cada release
  substantivo do modelo é análoga em espírito (auto-governança verificável).

---

# Revisão Anual — <escopo> — <ano-de-revisao>

**Escopo:** <agente | organização | squad | contrato — mesmo identificador do `predicoes.yaml`>
**Data da revisão:** AAAA-01-01
**Revisor principal:** <agente-ou-humano>
**Revisores auxiliares:** <lista, ou "nenhum">
**Emergência (E3)?** não
**Motivo (se emergência):** —
**Documento YAML de origem:** `Caos/registros/predictions-scorecard-<escopo>-<ano-inicial>.md`

## 1. Predições avaliadas nesta janela

Uma linha por predição com `data_limite ≤ data-da-revisao`. Ordem: cronológica por `data_limite`.

| ID | Data-limite | Critério (1 linha) | Resultado | Dificuldade a priori | Score calibrado |
|---|---|---|---|---|---|
| KLD-PRED-2026-001 | AAAA-MM-DD | <resumo em ≤ 100 caracteres> | `cumprida` | 3/5 | +1,0 |
| KLD-PRED-2026-002 | AAAA-MM-DD | <resumo> | `falhou` | 4/5 | −0,4 |
| ... | ... | ... | ... | ... | ... |

**Legenda de Resultado:** `cumprida | cumprida-antecipada | falhou | revogada | condicional-pendente`
**Legenda de Dificuldade a priori (rubrica §4):** 1 (trivial) → 5 (aposta contra consenso).

## 2. Score bruto

- Predições avaliadas: N
- Cumpridas (inclui antecipadas): X
- Falhas: Y
- Revogadas: Z
- Condicionais pendentes: W
- **Score bruto = X / (N − Z − W)** = <valor>

Interpretação: score bruto é **descritivo**, não avaliativo. Score alto pode significar predições fáceis; score
baixo pode significar honestidade em terreno difícil. A avaliação está em §4.

## 3. Score calibrado por dificuldade

- Soma dos deltas da coluna "Score calibrado" da tabela §1: <valor>
- Média por predição avaliada: <valor>

Rubrica (§4) atribui:
- `+1,0` para cada predição *cumprida* de dificuldade 4-5 (aposta arriscada que deu certo);
- `+0,5` para cumprida de dificuldade 2-3;
- `+0,1` para cumprida de dificuldade 1 (crédito simbólico — era fácil);
- `−1,0` para *falhou* em dificuldade 1-2 (deveria ter cumprido);
- `−0,4` para *falhou* em dificuldade 3-4 (aposta razoável não vingou);
- `0` para *falhou* em dificuldade 5 (aposta contra consenso — falhar não é vergonha, mas não pontua).

## 4. Rubrica de dificuldade a priori (declarada ANTES da avaliação)

| Nível | Descrição | Sinal externo (evidência) |
|---|---|---|
| 1 | Trivial — quase certa; envolve execução previsível | roadmap público + owner claro + horizonte curto |
| 2 | Provável — envolve execução com alguma coordenação | dependência interna resolvível, mas real |
| 3 | Contestável — envolve suposição sobre comportamento futuro | dependência externa parcialmente controlada |
| 4 | Arriscada — envolve suposição sobre agentes fora do controle | dependência externa forte (spec, mercado, terceiros) |
| 5 | Aposta contra consenso — a predição contradiz projeções vigentes | posição pública contrária à opinião majoritária no domínio |

A dificuldade a priori é registrada no momento da EMISSÃO da predição (`predicoes.yaml` — campo opcional
`dificuldade_a_priori: 1..5`); revisão anual NÃO reajusta dificuldade retroativamente (Brooks 2019 — regra
explícita contra recalibração pós-facto).

## 5. Análise por predição falhou

Uma subseção por predição com `status: falhou`. Padrão:

### 5.1 KLD-PRED-2026-XXX — <resumo>

- **Critério original:** <cópia do YAML>
- **Estado observado na data-limite:** <fato datável + fonte>
- **Causa raiz (uma frase):** <ex.: "dependência de spec MCP 2025-2026 não maturou; sub-onda 1.3 sinalizou
  como Rota D-2 e Ronan não escolheu emenda">
- **Categoria (Brooks 2024):** `erro-por-hype | erro-por-conservadorismo | erro-de-execução-interna | erro-de-modelo-do-mundo`
- **Lição capturada:** <sentença única para `MEMORY.md` ou `padroes-aprendidos.yaml`>

## 6. Predições revogadas neste ciclo

Uma subseção por predição com `status: revogada`. Padrão:

### 6.1 KLD-PRED-2026-YYY — <resumo>

- **Critério original:** <cópia>
- **Data da revogação:** AAAA-MM-DD
- **Justificativa:** <sentença única — ex.: "escopo desativado; contrato m-XXXX substituído por m-YYYY">

## 7. Predições condicionais pendentes

Uma subseção por predição com `status: condicional-pendente`. Padrão:

### 7.1 KLD-PRED-2026-ZZZ — <resumo>

- **Condição declarada:** <cópia do YAML>
- **Sinal externo esperado:** <fato datável + fonte, tipo "MCP spec 2025-2026 publica X">
- **Próxima janela de verificação:** <data OU evento>

## 8. Lições e padrões capturados

Lições verificadas ao longo do ciclo. Cada linha tem alvo de gravação: `MEMORY.md` do agente OU
`dados/padroes-aprendidos.yaml` do curador. Ritual de Encerramento é o veículo de captura.

| Lição (uma sentença) | Alvo de gravação | Escopo (sessão? padrão?) |
|---|---|---|
| <ex.: "Cronograma otimista de migração de wrappers subestima negociação de credenciais em ambientes shared."> | `padroes-aprendidos.yaml` | padrão |
| ... | ... | ... |

## 9. Próxima janela — nova safra de predições

Nova safra apendada ao `predicoes.yaml`. Este bloco resume; o registro canônico é o YAML.

| ID | Data-limite | Critério (1 linha) | Dificuldade a priori | Procedência |
|---|---|---|---|---|
| KLD-PRED-<ano-seguinte>-001 | AAAA-MM-DD | <resumo> | 3/5 | <contrato + sub-onda + documento> |
| ... | ... | ... | ... | ... |

## 10. Meta-comentário do revisor

Espaço curto (≤ 200 palavras) para o revisor registrar:
- Qual o padrão de erro dominante do ciclo (hype / conservadorismo / execução / modelo-do-mundo)?
- O scorecard está calibrado ou o revisor está sistematicamente otimista/pessimista?
- O que muda no critério de emissão de predições no próximo ciclo?

Brooks (2024) usa este espaço para admitir tendências próprias — o meta-comentário é onde a honestidade
metodológica se instala.

---

*Revisão anual — <escopo> — <ano-de-revisao>. Padrão canônico: Brooks 2018-2026, adaptado ao Método Kolden.*
