---
name: desenho-de-experimento-estatistico
description: |
  Use quando precisar desenhar um experimento estatístico (A/B test, multivariado, holdout, geo-split)
  com rigor: hipótese H0/H1, tamanho de amostra por poder estatístico, regras de parada precoce
  (alpha-spending ou Bayesian). NÃO substitui Aletheia desenho-de-experimento (essa decide QUE
  experimento; esta cuida do MÉTODO ESTATÍSTICO). Acionado como handoff downstream de Aletheia.
domain: analytics
subdomain: experimentacao-estatistica
agente_dono: [metis-estatistico]
tags: [ab-test, hipotese, poder-estatistico, tamanho-de-amostra, alpha-spending, bayesian]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G1, G8, G9)
status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)
tipo: skill
area: Metis
up: "[[Metis/_MOC-metis]]"
---

<!--
Atribuição: padrões derivados de msitarzewski/agency-agents@a597cb6
(project-management/, G1 + G8 + G9), licença MIT.
Adaptação livre em PT-BR — sem cópia literal. © Kolden 2026.
-->

# Desenho de experimento estatístico

Esta habilidade entra **depois** que a Aletheia decidiu QUE experimento rodar (test card,
hipótese de negócio). Aqui o trabalho é blindar o experimento estatisticamente: estruturar
H0/H1, dimensionar a amostra pelo poder estatístico e definir regras de parada que não
inflem o erro Tipo I.

---

## Fronteira (importante)

Três habilidades vizinhas — três responsabilidades distintas:

- **Aletheia / `mapa-de-assuncoes`** — decide a hipótese de negócio (a assunção mais arriscada).
- **Aletheia / `desenho-de-experimento`** — escreve o test card (hipótese, teste, métrica, kill).
- **Metis / `desenho-de-experimento-estatistico` (esta)** — recebe a hipótese pronta e desenha
  o método estatístico (H0/H1 formal, MDE, n, regras de parada, análise final).

No final, a evidência produzida aqui volta para a Aletheia decidir **perseverar, pivotar ou parar**.

A Metis **não** decide se o produto deve ser construído, **não** redesenha o test card e
**não** escreve a hipótese de negócio. Faz a matemática que sustenta a decisão.

---

## Componentes do desenho estatístico

### G1 — Estrutura H0/H1

- **H0 (hipótese nula):** "não há diferença entre tratamento e controle." É o que se assume
  até prova em contrário.
- **H1 (hipótese alternativa):**
  - **Direcional (one-sided):** "o tratamento aumenta a métrica primária."
  - **Não-direcional (two-sided):** "o tratamento muda a métrica primária (para mais ou para
    menos)." **Padrão.** Só use one-sided quando piora não é decisão acionável (raro).
- **Nível de significância α = 0.05** padrão. Para decisão crítica (mudança irreversível,
  grande investimento, risco reputacional), apertar para α = 0.01.
- **Tipos de erro:**
  - **Tipo I (falso positivo):** rejeitar H0 quando ela é verdadeira. Controlado por α.
  - **Tipo II (falso negativo):** não rejeitar H0 quando ela é falsa. Controlado por β
    (poder = 1 − β).
- **Registro pré-experimento OBRIGATÓRIO:** arquivo `experiments/EXP-NNN.md` com hipótese,
  métrica primária, métricas secundárias, exclusões, MDE, α, poder, n por arm, duração
  esperada, regras de parada. Sem registro pré, o experimento perde validade — análises
  pós-hoc viram caça a significância.

### G8 — Tamanho de amostra (sample size)

- **Poder estatístico (1 − β):** 80% padrão. Para decisão crítica, 90%. Abaixo de 80% =
  experimento underpowered (alta chance de falso negativo).
- **MDE (Minimum Detectable Effect):** o menor tamanho de efeito que você quer detectar.
  **Defina ANTES do experimento, não "vamos ver".** Sem MDE, o n vira chute.
- **Fórmula básica (proporção / conversão):**
  ```
  n ≈ 2 × (Z_{α/2} + Z_β)² × p × (1 − p) / d²
  ```
  Onde `p` é a taxa de conversão atual (baseline) e `d` é o MDE em ponto absoluto.
- **Exemplo concreto (e-commerce):** baseline de conversão 2%, MDE de 10% relativo (ou seja,
  detectar 2% → 2.2%), α = 0.05 two-sided, poder 80%: **~30.000 visitantes por arm**.
- **Para variável contínua (receita por usuário, tempo de sessão):** usa desvio-padrão σ e
  t-test em vez de proporção. Sem σ histórico, coletar 1-2 semanas de baseline antes.
- **Cálculo pré-lançamento OBRIGATÓRIO.** Não rodar experimento sem n calculado.
- **Ferramentas:** Evan Miller's sample size calculator, Optimizely sample size calculator,
  Statsig calc, ou R/Python (`statsmodels.stats.power`).

### G9 — Parada precoce (sequential testing)

**O problema:** olhar resultado parcial e parar quando "deu p < 0.05" infla o erro Tipo I.
Cada peek é uma nova chance de falso positivo. Cinco peeks ad-hoc num experimento de α nominal
0.05 podem chegar a 14% de taxa real de falso positivo.

**Três soluções aceitas:**

1. **Alpha-spending (Pocock, O'Brien-Fleming):** distribui o α total pelo cronograma de peeks
   planejados, ajustando o p-value crítico em cada um. Pocock é uniforme (mesmo limite a cada
   peek). O'Brien-Fleming é conservador no início e relaxa no fim (preferível quando quiser
   evitar parar cedo demais).
2. **Bayesian:** calcula posterior P(H1 verdadeira) + define uma região de equivalência prática
   (ROPE — ex: lift entre −1% e +1% é "praticamente sem efeito"). Para quando posterior
   P(H1) > 95% **OU** o intervalo crível está totalmente dentro da ROPE. Permite peeks contínuos
   sem inflar erro.
3. **Regra pré-definida com peeks fixos:** definir antes do início N peeks (ex: 25%, 50%, 75%,
   100% do n planejado), aplicar p-value ajustado em cada um, **proibir peeks ad-hoc**. Versão
   simples e auditável.

**Regra de ouro:** o método de parada precisa estar no registro pré-experimento. Mudar depois
quebra a validade.

---

## Anti-padrões

- **Tamanho de amostra ad-hoc** ("vamos ver quando der") → experimento underpowered, decisão
  baseada em ruído. Sem n calculado, sem experimento.
- **Peek-and-stop sem ajuste** → inflação severa do erro Tipo I. "Olhei toda manhã, parei
  quando deu p < 0.05" é o caminho clássico para conclusões falsas.
- **Múltiplas métricas sem correção** → testar 10 métricas com α = 0.05 cada dá ~40% de chance
  de algum falso positivo. Aplicar **Bonferroni** (α/k) para poucas métricas ou
  **Benjamini-Hochberg** (FDR) para muitas.
- **Selecionar segmento pós-hoc para achar significância** → "deu negativo no geral, mas positivo
  no segmento Y". P-hacking clássico. Segmentos precisam estar declarados no registro pré.
- **Confiar em lift pequeno sem checar variabilidade** → o intervalo de confiança 95% importa
  mais que o p-value. Lift +5% com IC [−2%, +12%] é evidência fraca; lift +2% com IC [+1.5%,
  +2.5%] é evidência forte.
- **Confundir significância estatística com relevância prática** → lift +0.5% com n gigante pode
  ser p < 0.001 e ainda assim irrelevante para o negócio. Sempre comparar com MDE economicamente
  viável.
- **Parar quando "parece estável"** sem critério formal → viés de confirmação. Decisão de parada
  é regra, não impressão.

---

## Saída

A habilidade entrega **dois artefatos**, em momentos diferentes:

### 1. Documento pré-experimento (antes do start)

```
experiments/EXP-NNN-<slug>.md
─────────────────────────────
- Hipótese de negócio (vinda da Aletheia, link para o test card)
- H0 / H1 formais
- Métrica primária + 2-3 secundárias + métricas de guarda (não deve piorar)
- MDE economicamente viável + justificativa
- α, poder (1 − β), one-sided ou two-sided
- n por arm + duração esperada (n / tráfego diário)
- Regra de parada: alpha-spending (qual?) / Bayesian (com ROPE) / peeks fixos
- Segmentos pré-declarados (se houver)
- Correção para múltiplas métricas (Bonferroni / BH)
- Critério de kill (parar antes se métrica de guarda cair X%)
```

### 2. Análise final (após coleta completa ou parada)

```
- Lift observado (absoluto e relativo)
- Intervalo de confiança 95% do lift
- p-value (ajustado, se aplicável)
- Decisão estatística: rejeitar H0 / não rejeitar H0
- Recomendação à Aletheia: perseverar / pivotar / parar
- Caveats: violações de premissa, segmentos pós-hoc inspecionados (sem decisão),
  hipóteses para próximo ciclo
```

---

## Cross-links

- **Aletheia** `desenho-de-experimento` — upstream, define o test card e a hipótese de negócio.
- **Aletheia** `mapa-de-assuncoes` — upstream, define qual assunção é a leap of faith a testar.
- **Aletheia** `priorizacao-rice` — a montante, prioriza qual experimento rodar primeiro.
- **Prometeu** `matriz-de-risco-e-contingencia` — risco operacional do experimento em si (não o
  risco estatístico).
- **Pactolo** — se a métrica primária for financeira (receita, margem), validar definição com a
  habilidade financeira correspondente antes de fechar o pré-experimento.
