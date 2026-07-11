---
name: avaliacao-de-ferramentas-mcda
description: >
  Use quando a decisão for escolher UMA ferramenta entre várias candidatas com
  método replicável — não "acho que X é melhor", mas score explícito por critério.
  Cobre MCDA (Multi-Criteria Decision Analysis) com 3 métodos canônicos:
  weighted sum (simples), AHP (pairwise comparison, Saaty), TOPSIS (distância ao
  ideal). Define pesos por critério (performance/preço/comunidade/manutenção/
  segurança/lock-in), aplica regras de veto (compliance, ToS), roda POC quando
  score empata. Gatilhos: "que ferramenta usar", "escolher entre X e Y", "avaliar
  ferramentas", "MCDA", "AHP", "TOPSIS", "comparar SaaS", "build vs buy",
  "decision matrix", "shortlist de tools". Dono: project-integrator (Conduit).
  Cross-link Olimpo (`comunicacao-executiva`) quando resultado precisa subir para
  aprovação C-level.
tipo: skill
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
---

# Avaliação de ferramentas com MCDA

Escolha de ferramenta com "achismo" custa caro: 6 meses depois se descobre que Y era melhor,
migração custa 10x o custo original de escolher direito. MCDA é o antídoto — método replicável
que produz decisão auditável.

## Quando usar

- Shortlist ≥3 candidatas
- Custo de mudar depois é alto (>1 mês migração)
- Vários stakeholders com preferências divergentes
- Decisão precisa ser defensável em auditoria/board

**Não usar** quando:
- 1 candidata óbvia (regra de veto elimina resto)
- Custo de trocar é baixo (SaaS de $10/mês, migração de 2h)
- Prazo de decisão é 1h (POC informal)

## Os 6 critérios canônicos Kolden

Ajuste peso por caso, mas sempre discuta os 6:

| Critério | O que mede | Peso default |
|---|---|---|
| **Performance** | benchmark (latência, throughput, precisão) | 20% |
| **Preço** | TCO 3 anos (licença + infra + treinamento + migração eventual) | 20% |
| **Comunidade** | GitHub stars + issue response + StackOverflow + eventos | 15% |
| **Manutenção** | idade do último release, freq de patch, roadmap público | 15% |
| **Segurança** | CVE recentes, SOC2/ISO27001, práticas de vulnerability disclosure | 15% |
| **Lock-in** | facilidade de export/migração, padrões abertos, dependência única | 15% |

**Somam 100%.** Ajustar por PRD específico (se produto é para saúde, segurança pode ir para 30%).

## Regras de veto (aplicar ANTES de scorear)

Candidata é eliminada se:
- **Vaza dado do Kolden fora da UE/BR** (LGPD) — soberania de dados.
- **Não expõe API/export** (lock-in duro).
- **Sem licença ou licença proibitiva** (AGPL em produto interno é ok; em SaaS Kolden ≠ ok).
- **ToS proíbe uso comercial** ou proíbe web scraping ao serviço.
- **CVE crítica não patchada há >90 dias.**
- **Sem release nos últimos 12 meses** (morto ou próximo).

Veto binário: 1 veto = fora. Não pontue candidata vetada.

## Método 1 — Weighted Sum (mais simples, use como default)

1. Pontuar cada ferramenta em cada critério, escala 0-10.
2. Multiplicar pelo peso.
3. Somar.

```
        Perf(20%) Preço(20%) Comunid(15%) Manut(15%) Seg(15%) Lock(15%)   Total
Tool A     8         6           9            8         7          6      7.3
Tool B     6         9           7            9         8          7      7.65
Tool C     9         5           8            6         6          5      6.7
```

**Vencedora:** B (7,65). Diferença <0,5 → empate técnico → método 2 ou POC.

## Método 2 — AHP (Analytic Hierarchy Process, Saaty)

Quando stakeholders discordam do peso, AHP força consenso via **pairwise comparison**.

Para cada par de critérios, perguntar: "Quanto Performance é mais importante que Preço?"
Escala Saaty 1-9:
- 1 = igual
- 3 = ligeiramente mais
- 5 = fortemente
- 7 = muito fortemente
- 9 = extremamente

Constrói matriz N×N. Calcula **eigenvector** — pesos normalizados. Vantagem: força consistência
(matriz precisa ter Consistency Ratio <0.10, senão os pesos são incoerentes).

**Use AHP quando:**
- Pesos são politicamente carregados (marketing vs security debatendo)
- Consistência precisa ser provada
- Auditoria externa exige método formal

**Não use AHP quando:**
- Time pequeno alinhado (weighted sum basta)
- >7 critérios (matriz 7×7 = 21 pares, cansa)

## Método 3 — TOPSIS (Technique for Order Preference by Similarity to Ideal)

Quando existe "ferramenta ideal hipotética" (melhor em tudo) e "ferramenta péssima hipotética"
(pior em tudo), TOPSIS mede **distância euclidiana** de cada candidata aos dois polos.

Score = distância ao péssimo / (distância ao ideal + distância ao péssimo). Máximo 1, mínimo 0.

**Use TOPSIS quando:**
- Critérios são todos numéricos (benchmark, preço em USD, dias desde último release)
- Você quer explicar "por que B ganhou": "porque está mais perto do ideal em preço e comunidade"

## POC obrigatória em empate

Quando top 2 estão dentro de 5% um do outro:
- **POC de 3-5 dias** com caso de uso real do PRD.
- Métricas definidas ANTES da POC (evita mover trave).
- Time diferente do que fez shortlist (evita viés).

## Formato do relatório

```markdown
# Avaliação MCDA — API Gateway (2026-07-02)

## Contexto
Precisamos escolher API Gateway para o Kolden OS. Candidatas iniciais: 8.

## Regras de veto aplicadas
- Kong Enterprise: proibido, licença proprietária + lock-in
- AWS API Gateway: proibido, viola soberania de dados Kolden
- **Restam 6 candidatas**

## Pesos (weighted sum, consenso de time)
- Performance: 25%
- Preço: 15% (self-hosted, custo é infra)
- Comunidade: 20%
- Manutenção: 15%
- Segurança: 15%
- Lock-in: 10%

## Scores
[tabela]

## Vencedora
Traefik (7.9). Segunda: Kong Community (7.4). Terceira: KrakenD (7.1).

## POC (opcional)
Não necessária — diferença > 5%.

## Decisão
Traefik. Aprovado por: [assinatura Conduit + Aria].
```

## Antipatrões

- **Score inflado no critério que a preferida ganha.** Suspeita de viés — pedir revisor cego.
- **"Empate técnico" resolvido por gosto.** Se empatou, faça POC.
- **Ignorar veto porque a ferramenta é famosa.** Fama não desfaz LGPD.
- **Pesos definidos DEPOIS de ver os scores** (fitting o resultado desejado).

## Handoffs

- **Custo total 3 anos (TCO)** → Plutos (Olimpo). Cálculo de payback e cash flow.
- **Compliance/legal review** → Themis (Olimpo) OU Égide (segurança).
- **Comunicação para C-level** → Zeus (Olimpo).
- **POC técnica** → Dex/Aria (@dev/@architect Prometeu).

## Regras Kolden

- **Pesos definidos antes de ver scores.** Registrar no template.
- **Veto por soberania de dados é absoluto.** Nenhum score compensa.
- **Auditoria de decisão preservada** em `docs/decisions/mcda-<tool>-<data>.md` como ADR.
- **Revisão de decisão em 12 meses** — o cenário mudou? A ferramenta ainda vence?

---
## Atribuição
Herança histórica: **Thomas L. Saaty** — Analytic Hierarchy Process (1970, publicado 1980,
*The Analytic Hierarchy Process*); **Ching-Lai Hwang + Kwangsun Yoon** — TOPSIS (1981,
*Multiple Attribute Decision Making*); **Bernard Roy** — ELECTRE method (1968, escola europeia
de MCDA); **Ralph Keeney + Howard Raiffa** — *Decisions with Multiple Objectives* (1976,
utility theory); **Robert L. Glass** — build vs buy criteria (1997, *Building Quality Software*).
Adaptado de `github.com/msitarzewski/agency-agents@a597cb6` (MIT), bucket B03/engineering,
IDs TEST G25, G26, G27, G28.
