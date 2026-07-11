---
task: optimizeRetention()
responsavel: "@peter-fader"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: business
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: customer_data
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: retention_optimization
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Segmentação de CLV completa com 4 faixas"
  - "[ ] Customer Health Score definido com 6 dimensões"
  - "[ ] Playbooks de intervenção projetados por nível de risco"
tipo: nota
area: Metis
up: "[[Metis/_MOC-metis]]"
relacionado:
  - "[[Metis/tasks/_indice|_indice]]"
---

# Tarefa: Otimizar Retenção

**Task ID:** DATA-004
**Versão:** 1.0.0
**Comando:** `*optimize-retention`
**Agente:** Peter Fader (peter-fader) + Nick Mehta (nick-mehta)
**Propósito:** Otimizar a retenção de clientes e o valor vitalício por meio de segmentação de CLV, previsão de churn e intervenções de sucesso

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|-------|--------|----------|-------------|
| `business` | Prompt do usuário | Sim | Descrição e modelo do negócio (SaaS, e-commerce, etc.) |
| `customer_data` | Usuário | Sim | Dados disponíveis do cliente (transações, engajamento, suporte) |
| `current_retention` | Usuário | Não | Taxa de retenção atual e padrões de churn conhecidos |
| `revenue_model` | Usuário | Não | Modelo de precificação, ARPU, receita de expansão |
| `support_structure` | Usuário | Não | Estrutura e processos atuais da equipe de CS |

## Pré-condições

- Existem dados de transações ou engajamento do cliente
- O modelo de negócio está definido (assinatura, transacional, híbrido)
- Frameworks de métricas carregados (`data/metrics-frameworks.yaml`)

## Fases de Execução

### Fase 1: Segmentar por CLV (peter-fader)

1. Aplique os princípios de **Customer-Base Analysis**:
   - Nem todos os clientes são iguais
   - O comportamento passado prevê o comportamento futuro (com incerteza)
   - A heterogeneidade dos clientes é o ponto de partida
2. Calcule os **componentes do CLV**:
   - **Recência:** Quando foi a última transação/engajamento
   - **Frequência:** Com que frequência transacionam/se engajam
   - **Monetário:** Quanto gastam por transação
3. Segmente os clientes em **faixas de valor**:
   - **Platinum (5% do topo):** Maior CLV, engajamento mais profundo
   - **Gold (próximos 15%):** CLV forte, comportamento confiável
   - **Silver (próximos 30%):** CLV moderado, potencial de crescimento
   - **Bronze (50% da base):** CLV baixo, alta heterogeneidade
4. Aplique a lógica do **modelo BG/NBD**:
   - Estime a probabilidade de cada cliente estar "vivo" (ativo)
   - Preveja as transações futuras esperadas por cliente
   - Identifique clientes com probabilidade em declínio (pré-churn)
5. Calcule o **risco de concentração de clientes** -- qual % da receita vem dos 20% do topo

### Fase 2: Identificar Sinais de Churn (nick-mehta)

1. Defina o **Customer Health Score** com 6 dimensões:
   - **Uso do produto:** Adoção de funcionalidades, frequência de login, tempo no app
   - **Interação de suporte:** Volume de tickets, sentimento, taxa de escalonamento
   - **Engajamento:** Aberturas de e-mail, presença em eventos, atividade na comunidade
   - **Resultado de negócio:** Eles estão atingindo seus objetivos com o produto
   - **Relacionamento:** Pontuação NPS, engajamento do patrocinador executivo
   - **Financeiro:** Pontualidade de pagamento, tendência do valor de contrato
2. Pondere cada dimensão pelo seu poder preditivo de churn
3. Identifique **indicadores antecedentes de churn** (precedem o churn em 30-90 dias):
   - Queda de uso > 30% mês a mês
   - Tickets de suporte com sentimento negativo
   - QBR ou reuniões de revisão perdidas
   - Saída do champion (contato deixa a empresa)
   - Estagnação na adoção de funcionalidades (nenhuma nova funcionalidade adotada em 60 dias)
4. Crie a **pontuação de risco de churn** (0-100):
   - 0-25: Saudável
   - 26-50: Monitorar
   - 51-75: Em Risco
   - 76-100: Crítico
5. Segmente os clientes em risco por **potencial de recuperação** (alto, médio, baixo)

### Fase 3: Projetar Intervenções (nick-mehta)

1. Mapeie as intervenções às **10 Laws of Customer Success**:
   - Lei 1: Venda para o cliente certo
   - Lei 2: Alinhe-se em torno da tendência natural ao churn
   - Lei 3: Os clientes esperam que você os torne bem-sucedidos
   - Lei 4: Monitore e gerencie a saúde incansavelmente
   - Lei 5: Você não pode mais construir lealdade por meio de relacionamentos
   - Lei 6: O produto é seu único diferencial escalável
   - Lei 7: Obsessione-se pelo tempo até o valor (time-to-value)
   - Lei 8: Aprofunde o engajamento com decisões orientadas por dados
   - Lei 9: Impulsione a expansão quando os clientes estão bem-sucedidos
   - Lei 10: É um compromisso de cima para baixo, em toda a empresa
2. Projete intervenções por nível de risco:
   - **Saudável:** Revisões proativas de sucesso, sinais de expansão
   - **Monitorar:** Aumente os pontos de contato, envie dicas de uso, verifique os objetivos
   - **Em Risco:** Contato executivo, plano de sucesso, recursos dedicados
   - **Crítico:** Engajamento da equipe de recuperação, escalonamento executivo, oferta de incentivo
3. Defina **playbooks** para cada tipo de intervenção
4. Crie **regras de automação** para intervenções em escala
5. Projete o template de **QBR (Quarterly Business Review)**

### Fase 4: Medir NRR (peter-fader + nick-mehta)

1. Defina e acompanhe o **Net Revenue Retention (NRR)**:
   - NRR = (MRR Inicial + Expansão - Contração - Churn) / MRR Inicial
   - Meta: > 100% (líquido positivo = crescimento sem novos clientes)
2. Acompanhe as **curvas de retenção por cohort**:
   - Análise mensal de cohort
   - Compare os formatos das curvas entre segmentos
   - Identifique o "ponto de achatamento" (quando a retenção se estabiliza)
3. Meça a **eficácia das intervenções**:
   - Taxa de recuperação por tipo de intervenção
   - Tempo da intervenção até a estabilização
   - Custo por recuperação vs CLV recuperado
4. Construa o **dashboard de retenção**:
   - Tendência de NRR (mensal)
   - Distribuição do health score
   - Pipeline de risco de churn
   - Taxa de sucesso das intervenções
5. Defina **gatilhos de escalonamento** para o data-chief

## Formato de Saída

```yaml
retention_optimization:
  business: "{name}"
  clv_segmentation:
    platinum: {count: "", pct_revenue: ""}
    gold: {count: "", pct_revenue: ""}
    silver: {count: "", pct_revenue: ""}
    bronze: {count: "", pct_revenue: ""}
  concentration_risk: "{top 20% = X% revenue}"
  health_score:
    dimensions: 6
    churn_signals: ["{signal1}", "{signal2}", "{signal3}"]
  churn_risk_distribution:
    healthy: "{%}"
    monitor: "{%}"
    at_risk: "{%}"
    critical: "{%}"
  nrr:
    current: "{%}"
    target: "{%}"
  interventions:
    playbook_count: {number}
    automation_rules: {number}
  deliverables:
    - clv-segmentation.md
    - health-score-model.md
    - intervention-playbooks.md
    - retention-dashboard.md
```

## Condições de Veto

1. **NUNCA trate todos os clientes igualmente** -- a segmentação de CLV existe por uma razão
2. **NUNCA preveja churn com uma única métrica** -- os health scores exigem múltiplas dimensões
3. **NUNCA automatize intervenções de risco crítico** -- o toque humano é necessário nas tentativas de recuperação
4. **NUNCA ignore a expansão na estratégia de retenção** -- NRR > 100% é a meta
5. **NUNCA meça a retenção sem análise de cohort** -- taxas agregadas escondem problemas em nível de segmento

## Critérios de Conclusão

- [ ] Segmentação de CLV completa com 4 faixas
- [ ] Customer Health Score definido com 6 dimensões
- [ ] Pelo menos 5 indicadores antecedentes de churn identificados
- [ ] Pontuação de risco de churn implementada (escala 0-100)
- [ ] Playbooks de intervenção projetados para cada nível de risco
- [ ] Fórmula de NRR definida com mecanismo de acompanhamento
- [ ] Dashboard de retenção projetado
- [ ] Saída corresponde ao schema acima
