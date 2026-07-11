---
task: measureGrowth()
responsavel: "@sean-ellis"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: current_metrics
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: growth_analysis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] North Star Metric (NSM) definida com métricas de entrada"
  - "[ ] Pelo menos 5 hipóteses geradas e pontuadas pelo ICE"
  - "[ ] Registro de experimentos criado com plano de rastreamento"
tipo: nota
area: Metis
up: "[[Metis/_MOC-metis]]"
relacionado:
  - "[[Metis/tasks/_indice|_indice]]"
---

# Task: Medir Crescimento

**Task ID:** DATA-002
**Versão:** 1.0.0
**Comando:** `*measure-growth`
**Agente:** Sean Ellis (sean-ellis)
**Propósito:** Encontrar a North Star Metric (NSM), projetar experimentos de crescimento usando pontuação ICE e analisar resultados

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `product` | Prompt do usuário | Sim | Descrição do produto ou serviço |
| `current_metrics` | Usuário | Sim | Números de crescimento atuais (usuários, receita, retenção) |
| `pmf_status` | Usuário | Não | Status de product-market fit (pré/pós PMF) |
| `growth_stage` | Usuário | Não | Estágio: tração, transição, crescimento, maduro |
| `experiment_budget` | Usuário | Não | Recursos disponíveis para experimentação |

## Pré-condições

- Produto existe com atividade de usuário mensurável
- Analytics básico implementado (consegue medir ações do usuário)
- Frameworks de métricas carregados (`data/metrics-frameworks.yaml`)

## Fases de Execução

### Fase 1: Encontrar a North Star Metric

1. Avalie o **Product-Market Fit** usando o Sean Ellis test:
   - Pesquisa: "Como você se sentiria se não pudesse mais usar este produto?"
   - **Muito decepcionado (very disappointed)** >= 40% = PMF alcançado
   - < 40% = foque no PMF antes do crescimento
2. Identifique o **momento de valor central** -- a única ação que entrega valor
3. Defina a **North Star Metric (NSM)** -- a única métrica que captura a entrega de valor
   - Deve refletir **valor para o cliente** (não apenas a receita da empresa)
   - Deve ser **liderável** (a equipe pode influenciá-la)
   - Deve ser **mensurável** (pode ser rastreada semanalmente)
4. Mapeie as **métricas de entrada** que impulsionam a NSM:
   - Amplitude (quantos usuários)
   - Profundidade (quanto cada usuário se engaja)
   - Frequência (com que frequência se engajam)
5. Valide: melhorar a NSM sempre melhora o negócio?

### Fase 2: Projetar Experimento (Pontuação ICE)

1. Gere **5-10 hipóteses de crescimento** a partir da análise do funil AARRR:
   - **Aquisição (Acquisition):** Como os usuários nos encontram
   - **Ativação (Activation):** Primeira experiência de valor
   - **Retenção (Retention):** Usuários voltam
   - **Indicação (Referral):** Usuários trazem outros
   - **Receita (Revenue):** Usuários pagam
2. Pontue cada hipótese usando o **ICE Framework**:
   - **Impacto (Impact)** (1-10): Quanto isso vai mover a NSM?
   - **Confiança (Confidence)** (1-10): Quão certos estamos de que isso vai funcionar?
   - **Facilidade (Ease)** (1-10): Quão fácil é implementar isso?
   - **ICE Score** = (Impact + Confidence + Ease) / 3
3. Classifique os experimentos por ICE Score
4. Selecione os 2-3 melhores experimentos para o sprint atual
5. Para cada experimento selecionado, defina:
   - Declaração da hipótese: "Se nós [ação], então [métrica] vai [mudar] porque [razão]"
   - Métrica de sucesso e meta
   - Tamanho mínimo de amostra
   - Duração

### Fase 3: Executar o Teste

1. Defina **controle e variante** para cada experimento
2. Configure o **rastreamento** para métricas específicas do experimento
3. Determine os requisitos de **significância estatística** (tipicamente p < 0.05)
4. Planeje a **linha do tempo do experimento** (mínimo de 1-2 semanas)
5. Identifique as **métricas de guardrail** -- o que NÃO pode diminuir durante o experimento
6. Documente o experimento no **registro de experimentos**

### Fase 4: Analisar Resultados

1. Colete dados após o término da duração do experimento
2. Calcule a **significância estatística** dos resultados
3. Meça o **impacto na NSM** -- a North Star se moveu?
4. Verifique as **métricas de guardrail** -- algo foi prejudicado?
5. Determine o veredito:
   - **Vencedor:** Implemente permanentemente, documente o aprendizado
   - **Perdedor:** Elimine, documente o aprendizado
   - **Inconclusivo:** Estenda a duração ou aumente a amostra
6. Atualize o **modelo de crescimento** com os novos aprendizados
7. Realimente os resultados na próxima rodada de pontuação ICE

## Formato de Saída

```yaml
growth_analysis:
  product: "{name}"
  pmf_score: "{percentage} very disappointed"
  pmf_status: "{pre-pmf|post-pmf}"
  north_star_metric:
    name: "{metric name}"
    current_value: "{number}"
    target: "{number}"
    input_metrics:
      breadth: "{metric}"
      depth: "{metric}"
      frequency: "{metric}"
  experiments:
    - hypothesis: "{if/then statement}"
      ice_score: {number}
      status: "{planned|running|complete}"
      result: "{winner|loser|inconclusive|pending}"
  aarrr_analysis:
    weakest_stage: "{acquisition|activation|retention|referral|revenue}"
    biggest_opportunity: "{description}"
  deliverables:
    - north-star-analysis.md
    - experiment-backlog.md
    - experiment-results.md
```

## Condições de Veto

1. **NUNCA otimize para crescimento antes de alcançar o PMF** -- o crescimento amplifica o que existe, seja bom ou ruim
2. **NUNCA rode experimentos sem métricas de guardrail** -- vencer uma métrica destruindo outra é uma derrota
3. **NUNCA declare um vencedor sem significância estatística** -- anedotas não são dados
4. **NUNCA pontue o ICE sem o input da equipe** -- pontuações de confiança precisam de perspectivas diversas
5. **NUNCA ignore resultados negativos** -- os perdedores ensinam tanto quanto os vencedores

## Critérios de Conclusão

- [ ] PMF avaliado com a metodologia de pesquisa Sean Ellis
- [ ] North Star Metric (NSM) definida com métricas de entrada
- [ ] Funil AARRR analisado com o estágio mais fraco identificado
- [ ] Pelo menos 5 hipóteses geradas e pontuadas pelo ICE
- [ ] Os 2-3 melhores experimentos projetados com hipóteses e métricas de sucesso
- [ ] Registro de experimentos criado com plano de rastreamento
- [ ] Saída corresponde ao schema acima
