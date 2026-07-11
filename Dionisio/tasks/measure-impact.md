---
task: measureImpact()
responsavel: "@analista-de-impacto"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: movement_context
    tipo: string
    origem: Session
    obrigatorio: true
  - campo: goals
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: impact_framework
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Pirâmide de Impacto definida com 5 níveis"
  - "[ ] Fórmula do Índice de Vitalidade definida com pesos"
  - "[ ] Cadência de relatórios estabelecida"
tipo: nota
area: Dionisio
up: "[[Dionisio/_MOC-dionisio]]"
relacionado:
  - "[[Dionisio/tasks/_indice|_indice]]"
---

# Tarefa: Medir Impacto

**ID da Tarefa:** MOVEMENT-005
**Versão:** 1.0.0
**Comando:** `*measure-impact`
**Agente:** Analista de Impacto (analista-de-impacto)
**Propósito:** Projetar e implementar um framework abrangente de medição de impacto com métricas, painéis e pontuação de vitalidade

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `movement_context` | Sessão | Sim | Causa, identidade e estratégia de crescimento do movimento |
| `growth_data` | estrategista-de-ciclo | Não | Métricas de crescimento existentes e dados da comunidade |
| `goals` | Prompt do usuário | Sim | Que impacto o movimento pretende alcançar |
| `timeframe` | Usuário | Não | Período de medição: mensal, trimestral, anual |
| `existing_metrics` | Usuário | Não | Quaisquer métricas já em acompanhamento |

## Pré-condições

- Identidade do movimento definida (no mínimo, crenças centrais e público)
- Estratégia de crescimento existe ou está em andamento
- Frameworks de movimento carregados (`data/movement-frameworks.yaml`)

## Fases de Execução

### Fase 1: Definir a Pirâmide de Impacto

1. Mapeie os 5 níveis da Pirâmide de Impacto:
   - **Nível 1 -- Consciência:** As pessoas sabem que o movimento existe
   - **Nível 2 -- Engajamento:** As pessoas interagem com o movimento
   - **Nível 3 -- Compromisso:** As pessoas se identificam como membros
   - **Nível 4 -- Defesa Ativa:** Os membros recrutam outros
   - **Nível 5 -- Transformação:** Ocorre mudança no mundo real
2. Para cada nível, defina como é o "sucesso" para este movimento específico
3. Identifique o **nível atual** -- onde o movimento está hoje
4. Estabeleça o **nível-alvo** para o próximo ciclo
5. Mapeie as dependências entre os níveis

### Fase 2: Estabelecer Métricas por Nível

1. Para cada nível da pirâmide, defina:
   - **Indicadores antecedentes** -- sinais preditivos
   - **Indicadores consequentes** -- resultados confirmados
   - **Marcadores qualitativos** -- evidência narrativa
2. Selecione **3-5 métricas por nível** (não mais, para evitar sobrecarga de métricas)
3. Defina métodos de medição para cada métrica
4. Estabeleça linhas de base e metas
5. Crie a **matriz de métricas** -- nível x métrica x método x meta

### Fase 3: Medir a Saúde da Comunidade

1. Projete o **Painel de Saúde da Comunidade** com 6 dimensões:
   - **Taxa de crescimento** -- novos membros por período
   - **Taxa de ativação** -- % de novos membros que se engajam em até 7 dias
   - **Taxa de retenção** -- % ainda ativos após 30/60/90 dias
   - **Profundidade de engajamento** -- média de interações por membro ativo
   - **Pontuação de sentimento** -- proporção de sentimento positivo/negativo/neutro
   - **Taxa de defesa ativa** -- % de membros que recrutam outros
2. Defina métodos de coleta de dados para cada dimensão
3. Estabeleça faixas saudáveis para cada dimensão (verde/amarelo/vermelho)
4. Projete o modelo de relatório de **pulso semanal**
5. Projete o modelo de relatório de **mergulho mensal**

### Fase 4: Calcular o Índice de Vitalidade

1. Defina a fórmula do **Índice de Vitalidade**:
   - Composto ponderado das 6 dimensões de saúde
   - Pesos padrão: Crescimento (15%), Ativação (20%), Retenção (25%), Engajamento (20%), Sentimento (10%), Defesa Ativa (10%)
   - Escala: 0-100
2. Estabeleça os **limiares de vitalidade**:
   - 80-100: Prosperando -- manter e otimizar
   - 60-79: Saudável -- ajustes menores necessários
   - 40-59: Em Risco -- intervenção necessária
   - 20-39: Crítico -- pivô importante necessário
   - 0-19: Falhando -- revisão existencial necessária
3. Crie a **cadência de relatórios**:
   - Semanal: Pulso do Índice de Vitalidade + 3 principais indicadores antecedentes
   - Mensal: Painel completo + análise de tendências + recomendações
   - Trimestral: Revisão da pirâmide de impacto + ajuste de estratégia
4. Defina **gatilhos de alerta** -- quando escalar para o movement-chief

## Formato de Saída

```yaml
impact_framework:
  movement: "{nome}"
  current_pyramid_level: {1-5}
  target_pyramid_level: {1-5}
  metrics_per_level:
    awareness: ["{métrica1}", "{métrica2}", "{métrica3}"]
    engagement: ["{métrica1}", "{métrica2}", "{métrica3}"]
    commitment: ["{métrica1}", "{métrica2}", "{métrica3}"]
    advocacy: ["{métrica1}", "{métrica2}", "{métrica3}"]
    transformation: ["{métrica1}", "{métrica2}", "{métrica3}"]
  community_health:
    growth_rate: {baseline: "", target: "", status: ""}
    activation_rate: {baseline: "", target: "", status: ""}
    retention_rate: {baseline: "", target: "", status: ""}
    engagement_depth: {baseline: "", target: "", status: ""}
    sentiment_score: {baseline: "", target: "", status: ""}
    advocacy_rate: {baseline: "", target: "", status: ""}
  vitality_index:
    current_score: {0-100}
    threshold: "{thriving|healthy|at-risk|critical|failing}"
    weights: {growth: 15, activation: 20, retention: 25, engagement: 20, sentiment: 10, advocacy: 10}
  reporting_cadence:
    weekly: "Pulso de vitalidade + indicadores antecedentes"
    monthly: "Painel completo + tendências + recomendações"
    quarterly: "Revisão da pirâmide de impacto + ajuste de estratégia"
  alert_triggers:
    - "{condição que dispara o escalonamento}"
```

## Condições de Veto

1. **NUNCA defina mais de 5 métricas por nível da pirâmide** -- sobrecarga de métricas paralisa a ação
2. **NUNCA pule os marcadores qualitativos** -- números sozinhos perdem a dimensão humana dos movimentos
3. **NUNCA estabeleça metas sem linhas de base** -- metas sem contexto são fantasias
4. **NUNCA reporte o Índice de Vitalidade sem contexto** -- uma pontuação sem tendência e recomendações é ruído
5. **NUNCA ignore os dados de sentimento** -- uma comunidade que cresce mas é infeliz é uma bomba-relógio

## Critérios de Conclusão

- [ ] Pirâmide de Impacto definida com 5 níveis personalizados para o movimento
- [ ] Matriz de métricas completa com 3-5 métricas por nível
- [ ] Painel de Saúde da Comunidade projetado com 6 dimensões
- [ ] Fórmula do Índice de Vitalidade definida com pesos e limiares
- [ ] Cadência de relatórios estabelecida (semanal, mensal, trimestral)
- [ ] Gatilhos de alerta definidos para escalonamento
- [ ] Estado atual avaliado com medições de linha de base
- [ ] Saída corresponde ao esquema acima
