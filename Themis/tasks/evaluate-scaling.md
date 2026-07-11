---
task: evaluateScaling()
responsavel: "@board-chair"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: business_description
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true
  - campo: scaling_trigger
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true

Saida:
  - campo: scaling_evaluation
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Prontidão avaliada pelos três conselheiros (Hoffman, Thiel, Naval)"
  - "[ ] Estratégia de escala identificada com justificativa clara"
  - "[ ] Veredito Go/No-Go com playbook e critérios de interrupção"
tipo: nota
area: Themis
up: "[[Themis/_MOC-themis]]"
relacionado:
  - "[[Themis/tasks/_indice|_indice]]"
---

# Task: Análise de Decisão de Escala

**Task ID:** BOARD-004
**Versão:** 1.0.0
**Comando:** `*evaluate-scaling`
**Agente:** Board Chair roteia para Reid Hoffman + Peter Thiel + Naval Ravikant
**Propósito:** Avaliar se e como escalar um negócio, produto ou time.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `business_description` | Estado atual do negócio | SIM |
| `scaling_trigger` | Por que a escala está sendo considerada agora | SIM |
| `current_metrics` | Receita, usuários, taxa de crescimento, economia unitária | PREFERENCIAL |
| `resources_available` | Capital, time, infraestrutura | PREFERENCIAL |
| `market_context` | Tamanho de mercado, concorrência, timing | NÃO |
| `constraints` | Limitações, valores, inegociáveis | NÃO |

## Pré-condições

1. O negócio tem alguma forma de product-market fit (ou acredita que tem)
2. A escala está sendo ativamente considerada como movimento estratégico
3. Métricas básicas ou dados de tração estão disponíveis

## Fases de Execução

### Fase 1: Avaliar a Prontidão

**Reid Hoffman — Prontidão para Blitzscaling:**
1. Existe um mercado grande e em crescimento? (análise de TAM)
2. Há product-market fit? (retenção, indicação, crescimento orgânico)
3. Há efeitos de rede? (o produto melhora com mais usuários?)
4. Você tem vantagem de distribuição? (viral, embutida, paga escalável?)
5. Existe uma vantagem de primeiro a escalar? (dinâmica winner-take-most?)
6. Avalie a prontidão para blitzscaling: NOT_READY / APPROACHING / READY / OVERDUE

**Peter Thiel — Avaliação de Monopólio:**
1. Você está dominando um mercado pequeno? (Você deve ser o #1 ou #2 em um nicho)
2. Qual é o seu segredo? (O que você sabe que os outros não sabem?)
3. Você consegue alcançar monopólio em um espaço definido?
4. Sua tecnologia é 10x melhor (não apenas incrementalmente)?
5. Você está construindo tecnologia proprietária, efeitos de rede, economias de escala ou marca?
6. Avalie o potencial de monopólio: WEAK / MODERATE / STRONG

**Naval Ravikant — Análise de Alavancagem:**
1. Você está aplicando alavancagem? (Código, mídia, capital, trabalho — nessa ordem de preferência)
2. Você tem conhecimento específico? (Algo que o mercado não consegue replicar facilmente)
3. Você está construindo ativos que rendem enquanto você dorme?
4. Esta é uma oportunidade de composição (compounding)? (Cada unidade de esforço se constrói sobre a anterior?)
5. Qual é a estrutura de responsabilização? (Quem tem skin in the game?)
6. Avalie a posição de alavancagem: LOW / MEDIUM / HIGH

### Fase 2: Identificar a Estratégia de Escala

1. **Velocidade vs Eficiência** — Você deve priorizar velocidade de crescimento ou economia unitária?
   - Hoffman: Velocidade quando o mercado é winner-take-most
   - Thiel: Eficiência ao construir monopólio em um nicho
   - Naval: Alavancagem quando você consegue escalar sem esforço proporcional
2. **Horizontal vs Vertical** — Expandir amplitude (mais mercados) ou profundidade (mais valor)?
3. **Orgânico vs Inorgânico** — Crescer internamente ou via aquisição/parceria?
4. **Estratégia de Capital** — Bootstrap, captar venture, ou financiar crescimento com receita?
5. Mapear a sequência de escala — o que deve ser verdadeiro em cada estágio

### Fase 3: Avaliação de Risco

1. **Riscos de escala prematura** — Escalar antes do product-market fit é a causa #1 de morte de startups
2. **Risco de execução** — Seu time consegue lidar com 10x de complexidade?
3. **Risco de cultura** — O crescimento rápido vai quebrar sua cultura? (a fase de "firefighting" de Hoffman)
4. **Risco financeiro** — Qual é o burn rate durante a escala? Runway?
5. **Risco de mercado** — O timing está certo? A janela pode se fechar?
6. **Risco competitivo** — Escalar vai provocar retaliação dos incumbentes?
7. Aplicar o teste de otimismo definido de Thiel — você tem um plano específico, não apenas esperança?

### Fase 4: Recomendação Go/No-Go

1. Sintetizar as avaliações de prontidão, estratégia e risco
2. Entregar um veredito claro:
   - **GO — Escalar Agora** — Timing de mercado, prontidão e recursos estão alinhados
   - **CONDITIONAL GO** — Escalar após condições específicas serem atendidas (liste-as)
   - **NO-GO — Não Está Pronto** — Especifique o que deve mudar antes de reconsiderar
   - **PIVOT** — Escalar a abordagem atual está errado; redirecione primeiro
3. Se GO: Definir o playbook de escala (primeiros 90 dias, 6 meses, 12 meses)
4. Definir métricas de sucesso e checkpoints em cada estágio
5. Estabelecer critérios de interrupção — o que faria você parar de escalar e reavaliar

## Formato de Saída

```yaml
scaling_evaluation:
  advisors: [reid-hoffman, peter-thiel, naval-ravikant]
  readiness:
    hoffman_blitzscaling: "NOT_READY | APPROACHING | READY | OVERDUE"
    thiel_monopoly: "WEAK | MODERATE | STRONG"
    naval_leverage: "LOW | MEDIUM | HIGH"
  strategy:
    approach: "speed | efficiency | leverage"
    direction: "horizontal | vertical"
    growth_type: "organic | inorganic | hybrid"
    capital_strategy: "bootstrap | venture | revenue-funded"
  risks:
    premature_scaling: "{avaliação}"
    execution: "{avaliação}"
    culture: "{avaliação}"
    financial: "{avaliação}"
    market: "{avaliação}"
    competitive: "{avaliação}"
  verdict: "GO | CONDITIONAL_GO | NO_GO | PIVOT"
  conditions: ["{se condicional}"]
  playbook:
    days_90: ["{primeiras ações}"]
    months_6: ["{ações de médio prazo}"]
    months_12: ["{ações de longo prazo}"]
  success_metrics: ["{o que medir}"]
  kill_criteria: ["{quando parar}"]
```

## Condições de Veto

- **NUNCA** recomende escalar sem evidência de product-market fit
- **NUNCA** ignore a economia unitária — crescimento sem margens é apenas fracasso caro
- **NUNCA** recomende blitzscaling quando não há vantagem de primeiro a escalar
- **NUNCA** pule a avaliação de risco — o excesso de confiança mata mais empresas do que a concorrência
- **NUNCA** recomende escalar se isso conflita com os valores centrais do fundador (pergunte antes)

## Critérios de Conclusão

- [ ] Prontidão para blitzscaling avaliada (Hoffman)
- [ ] Potencial de monopólio avaliado (Thiel)
- [ ] Posição de alavancagem analisada (Naval)
- [ ] Estratégia de escala identificada com justificativa clara
- [ ] Avaliação de risco concluída em todas as dimensões
- [ ] Veredito Go/No-Go claro com raciocínio
- [ ] Playbook definido com métricas e critérios de interrupção
