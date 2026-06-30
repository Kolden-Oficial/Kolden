---
name: metricas-operacionais-continuas
description: |
  Use quando precisar instrumentar uma métrica operacional contínua (taxa de sucesso, tempo médio,
  taxa de erro de um SOP, throughput). Define baseline, controle (banda ±1σ), gatilho de alerta,
  ciclo de revisão. **Fronteira:** Cairos sop-e-processo-operacional define O PASSO; esta skill
  define A MÉTRICA do passo e a analisa. Não é métrica de produto (essa é North Star/AARRR) nem
  métrica financeira (essa é Pactolo).
domain: analytics
subdomain: process-analytics
agente_dono: [metis-estatistico]
tags: [metrica-operacional, baseline, controle-estatistico, six-sigma, kpi-de-processo]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G16)
status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)
---

<!--
Atribuição: padrões derivados de msitarzewski/agency-agents@a597cb6
(project-management/, G16), licença MIT.
Adaptação livre em PT-BR — sem cópia literal. © Kolden 2026.
-->

# Métricas operacionais contínuas

Aqui se mede **processo**, não produto e não dinheiro. Quando um SOP roda repetidamente — fechamento
mensal, atendimento de ticket, onboarding de cliente, deploy semanal — esta habilidade instrumenta
a métrica que diz se o processo está sob controle e quando agir.

---

## Tipos de métrica de processo

Não confundir com métricas de produto (engajamento, retenção, North Star) ou financeiras (margem,
LTV, CAC). Métricas de processo respondem **"o processo está rodando como deveria?"**:

- **Taxa de sucesso** do SOP — % de execuções que atingem o critério de feito (ex: % de fechamentos
  mensais com D+5 atingido).
- **Tempo de ciclo** — lead time (do pedido até a entrega) + processing time (tempo ativo trabalhando).
- **Taxa de erro / retrabalho** — % de execuções que precisaram ser refeitas total ou parcialmente.
- **Throughput** — volume processado por unidade de tempo (ex: tickets fechados por dia).
- **First-Time-Right (FTR)** — % que sai correto na primeira tentativa, sem retrabalho.

A escolha da métrica depende do que aperta o processo: se o problema é volume, throughput; se é
qualidade, FTR ou taxa de erro; se é prazo, tempo de ciclo; se é entrega-ou-não, taxa de sucesso.

---

## Instrumentação em 5 passos

### 1. Definir a métrica em 1 frase

Toda métrica precisa ser declarável numa frase com **numerador / denominador / janela temporal**
explícitos. Sem isso, vira "achismo medido".

> Exemplo: "**Taxa de close mensal pontual** = (closes com D+5 atingido) / (total de closes mensais)
> — janela: trimestre."

Sem janela, não dá para comparar. Sem denominador claro, dá para hackear o numerador.

### 2. Estabelecer baseline

- Coletar histórico de **8-12 execuções** anteriores (mínimo). Menos que isso = estatística frágil.
- Calcular **média (μ) e desvio-padrão (σ)** do histórico.
- **Banda de controle:**
  - **μ ± 2σ** para a maioria dos processos (cobre ~95% das execuções normais).
  - **μ ± 3σ** para processos críticos / Six Sigma (cobre ~99.7%, alerta menos, mas mais sólido).
- **Documentar em `metricas/<nome>.md`:** definição, baseline (média + σ + n de execuções),
  banda, gatilhos, owner, cadência. Sem documento, a métrica vira boato.

### 3. Gatilho de alerta

Três sinais que disparam atenção (não pânico):

- **Ponto fora da banda:** 1 execução acima de μ + 2σ ou abaixo de μ − 2σ. Pode ser ruído ou
  evento real — investigar.
- **Tendência (mudança de regime):** 2 ou mais pontos consecutivos do mesmo lado da média. Em
  controle estatístico de processos (regras de Western Electric), 7 pontos consecutivos do mesmo
  lado é sinal forte.
- **Variabilidade crescente:** amplitude (max − min) por ciclo aumentando. O processo está
  perdendo previsibilidade mesmo que a média esteja "ok".

### 4. Ciclo de revisão

- **Cadência depende da métrica:**
  - **Diário** — operacional crítico (SLA de atendimento, disponibilidade).
  - **Semanal** — operacional regular (throughput de tickets, taxa de erro de deploy).
  - **Mensal** — processo gerencial (fechamento mensal, ciclo de onboarding).
- **Owner explícito (1 pessoa, não comitê):** quem revisa e quem age. Métrica sem owner é pôster
  na parede.
- **Revisão é estruturada em 5 perguntas:**
  1. Estamos dentro do controle (μ ± 2σ)?
  2. Há tendência (vários pontos consecutivos do mesmo lado da média)?
  3. A variabilidade está estável, caindo ou crescendo?
  4. As ações decididas na última revisão funcionaram (e por quê)?
  5. Se o desvio persistir mais um ciclo, qual é a próxima ação?

### 5. Loop de melhoria

- **Anomalia repetida** (ponto fora 2x) → ação corretiva pontual: corrigir o sintoma e observar.
- **Tendência negativa** (vários pontos do mesmo lado) → ir à **causa raiz**: 5 Whys, Ishikawa,
  Pareto. Tratar a causa, não o sintoma.
- **Variabilidade crescente** → identificar a fonte de variação (matéria-prima, pessoa, turno,
  fornecedor, ferramenta) e reduzi-la na origem. Six Sigma 101: variância é o inimigo da
  previsibilidade.
- **Toda ação decidida vira item na próxima revisão.** Sem follow-up, melhoria não compõe.

---

## Anti-padrões

- **Métrica sem owner** → vira pôster na parede; ninguém é responsável por agir, ninguém age.
- **Baseline calculado de 1 mês** → não captura sazonalidade (fim de mês, fim de trimestre,
  feriado). Mínimo 8-12 ciclos.
- **Alertar em tudo** → vira ruído, ninguém olha. Calibrar a banda para que o gatilho seja
  exceção, não rotina.
- **Métrica de output sem métrica de input** → "ticket resolution time piorou" não dá ação.
  Adicionar input (volume entrante, complexidade média) ajuda a separar "processo piorou" de
  "carga aumentou".
- **Confundir métrica de processo com métrica de produto ou financeira:**
  - **Produto** (NPS, retenção, North Star) → Pheme/Caliope/Aletheia.
  - **Financeira** (margem, LTV, CAC) → Pactolo.
  - **Mercado** (share, posição competitiva) → Argos.
  - **Segurança** (vulns abertas, MTTR de incidente) → Egide.
  - **Processo** (executa-se bem o SOP?) → **aqui (Metis)**.
- **"Métrica da métrica"** → instrumentação que custa mais que a melhoria que ela viabiliza.
  Se medir custa caro e a ação é óbvia sem dado, talvez não meça.
- **Atualizar baseline com dado contaminado** → quando uma ação corretiva mudou o processo,
  reiniciar baseline. Misturar regimes diferentes esconde o efeito da melhoria.

---

## Cross-links

- **Cairos** `sop-e-processo-operacional` — **upstream**. Define O PASSO (o que o processo faz).
  Esta skill define A MÉTRICA do passo (se o processo faz bem).
- **Pactolo** `analise-fpa-e-variancia` — métrica **financeira** com lógica de variância parecida,
  mas escopo diferente. Cross-link, não overlap.
- **Argos** — métricas de **mercado/competidor**. Cross-link, não overlap.
- **Egide** — métricas de **segurança / incidente**. Cross-link, não overlap.
- **Metis** `desenho-de-experimento-estatistico` — quando uma mudança no processo for testada
  formalmente (não só observada), passar para experimento.
