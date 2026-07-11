---
task: scaleCampaign()
responsavel: "@scale-optimizer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: platform
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: campaign_data
    tipo: object
    origem: User Input
    obrigatorio: true

Saida:
  - campo: scalingPlan
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Avaliação de escalabilidade concluída com classificações de risco"
  - "[ ] Método de escala selecionado com justificativa"
  - "[ ] Guardrails de monitoramento definidos com limites"
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
relacionado:
  - "[[Peitho/tasks/_indice|_indice]]"
---

# Tarefa: Escalar Campanha

**Task ID:** TRAFFIC-003
**Versão:** 1.0.0
**Comando:** `*scale-campaign`
**Agente:** Scale Optimizer (scale-optimizer) ou Depesh Mandalia (depesh-mandalia)
**Propósito:** Escalar campanhas vencedoras de forma lucrativa usando o método BPM (Budget, Performance, Metrics).

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| platform | enum | Prompt do usuário | Sim | facebook, google, youtube, tiktok |
| campaign_data | object | Prompt do usuário | Sim | Métricas atuais: gasto, CPA, ROAS, CTR, CVR, gasto diário |
| target_spend | number | Prompt do usuário | Sim | Meta de gasto diário ou mensal desejada |
| current_spend | number | Prompt do usuário | Sim | Gasto diário ou mensal atual |
| max_cpa | number | Prompt do usuário | Não | CPA máximo aceitável |
| min_roas | number | Prompt do usuário | Não | ROAS mínimo aceitável |
| timeline | string | Prompt do usuário | Não | Quão rápido escalar (aggressive, moderate, conservative) |

---

## Pré-condições

- A campanha tem desempenho comprovado no nível de gasto atual (mínimo de 7 dias de dados)
- O rastreamento é preciso e os eventos de conversão disparam corretamente
- A landing page consegue suportar o aumento no volume de tráfego

---

## Fases de Execução

### Fase 1: Avaliação de Escalabilidade
1. Avaliar a prontidão da campanha para escalar:
   - O público é grande o suficiente para suportar o gasto alvo?
   - O criativo está mostrando sinais de fadiga (queda no CTR)?
   - O CPA está estável ou em tendência de alta?
   - Qual é a frequência atual (acima de 2,5 é um alerta)?
2. Calcular o teto de escala: tamanho do público / (limite de frequência x CPM) = gasto diário máximo
3. Avaliar a profundidade do criativo: quantos anúncios vencedores estão ativos?
4. Verificar a capacidade do backend: o negócio consegue lidar com 2x-5x o volume atual de leads/vendas?

### Fase 2: Seleção da Estratégia de Escala
1. Escolher o método de escala com base na diferença entre o gasto atual e o alvo:
   - **Escala Vertical (< 2x):** Aumentar o orçamento nas campanhas existentes
     - Aumento de 20% no orçamento a cada 48-72 horas
     - Monitorar picos de CPA após cada aumento
     - Resetar se o CPA aumentar mais de 30% por 48 horas
   - **Escala Horizontal (2x-5x):** Duplicar para novos públicos
     - Duplicar conjuntos de anúncios vencedores para novos segmentos de público
     - Duplicar anúncios vencedores para novas campanhas com objetivos diferentes
     - Testar públicos lookalike em percentuais crescentes
   - **Escala Diagonal (5x+):** Expandir para novas plataformas e ângulos
     - Portar criativos vencedores para novas plataformas
     - Testar novos ângulos criativos contra públicos comprovados
     - Construir novos funis para novas temperaturas de tráfego
2. Definir o cronograma de escala com marcos de orçamento
3. Definir os critérios de kill para cada fase de escala

### Fase 3: Escala de Criativos
1. Identificar os elementos criativos que impulsionam o desempenho:
   - Quais ganchos têm melhor desempenho?
   - Quais formatos convertem melhor?
   - Quais públicos respondem a quais criativos?
2. Planejar o pipeline de iteração de criativos:
   - Variação 1: Mesmo gancho, visual diferente
   - Variação 2: Mesmo visual, gancho diferente
   - Variação 3: Mesma mensagem, formato diferente (imagem para vídeo, etc.)
3. Definir o cronograma de renovação de criativos:
   - Públicos pequenos: Novo criativo a cada 5-7 dias
   - Públicos grandes: Novo criativo a cada 14-21 dias
4. Construir um "banco de criativos" de 5-10 anúncios prontos para implantar quando a fadiga chegar

### Fase 4: Monitoramento e Guardrails
1. Definir métricas e limites de monitoramento diário:
   - Limite de CPA: Máx X% acima da meta antes de pausar
   - Limite de ROAS: Mín X:1 antes de pausar
   - Limite de frequência: Máx X antes da renovação de criativo
   - Ritmo de gasto: Tolerância esperada de variância no gasto diário
2. Criar o protocolo de escalonamento:
   - Pico de CPA de 20-30%: Reduzir o orçamento em 20%, monitorar por 48h
   - Pico de CPA de 30-50%: Pausar, diagnosticar, corrigir antes de retomar
   - Pico de CPA de 50%+: Encerrar o conjunto de anúncios, lançar novo teste
3. Definir checkpoints de revisão semanal com comparação à linha de base
4. Definir o marco de "sucesso de escala" — quando a escala é alcançada?

---

## Formato de Saída

```markdown
## Plano de Escala: {Nome da Campanha}

**Plataforma:** {platform}
**Gasto Atual:** ${X}/dia
**Gasto Alvo:** ${Y}/dia
**Fator de Escala:** {X}x
**Método:** {vertical / horizontal / diagonal}
**Cronograma:** {X semanas}

---

### Avaliação de Escalabilidade

| Fator | Status | Risco |
|--------|--------|------|
| Tamanho do Público | {adequado/limitado} | {baixo/médio/alto} |
| Profundidade de Criativo | {N anúncios vencedores} | {baixo/médio/alto} |
| Estabilidade de CPA | {estável/em alta} | {baixo/médio/alto} |
| Frequência | {atual} | {baixo/médio/alto} |
| Capacidade de Backend | {pronto/preocupação} | {baixo/médio/alto} |

### Cronograma de Escala

| Semana | Orçamento Diário | Método | Novos Elementos |
|------|-------------|--------|-------------|

### Pipeline de Criativos

| Prioridade | Criativo | Formato | Público | Status |
|----------|---------|--------|----------|--------|

### Guardrails

| Métrica | Limite | Ação se Ultrapassado |
|--------|-----------|-------------------|

### Critérios de Kill
{Quando parar de escalar e reavaliar}

### Marco de Sucesso
{Definição de sucesso de escala}
```

---

## Condições de Veto

- NUNCA escale uma campanha com menos de 7 dias de dados estáveis
- NUNCA aumente o orçamento em mais de 20% em um único dia (escala vertical)
- NUNCA escale sem um pipeline de criativos pronto — você vai atingir a fadiga
- NUNCA ignore a frequência — escalar em públicos fatigados queima dinheiro
- NUNCA escale se o rastreamento for não confiável — você não pode otimizar o que não pode medir

---

## Critérios de Conclusão

- [ ] Avaliação de escalabilidade concluída com classificações de risco
- [ ] Método de escala selecionado com justificativa
- [ ] Cronograma de orçamento mapeado semana a semana
- [ ] Pipeline de criativos construído com 5-10 anúncios prontos para implantar
- [ ] Guardrails de monitoramento definidos com limites
- [ ] Critérios de kill estabelecidos
- [ ] Marco de sucesso definido
