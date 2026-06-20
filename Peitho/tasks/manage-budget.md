---
task: manageBudget()
responsavel: "@fiscal"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: total_budget
    tipo: number
    origem: User Input
    obrigatorio: true
  - campo: campaign_data
    tipo: object
    origem: User Input
    obrigatorio: true

Saida:
  - campo: budgetOptimization
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Alocação atual mapeada com ROAS marginal"
  - "[ ] 3 cenários de orçamento modelados com projeções"
  - "[ ] Plano de realocação faseado ao longo de 1-2 semanas"
---

# Tarefa: Gerenciar Orçamento

**Task ID:** TRAFFIC-007
**Versão:** 1.0.0
**Comando:** `*manage-budget`
**Agente:** Fiscal (fiscal)
**Propósito:** Otimizar a alocação de orçamento entre campanhas, plataformas e estágios do funil.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| total_budget | number | Prompt do usuário | Sim | Orçamento mensal total de anúncios |
| platforms | list | Prompt do usuário | Sim | Plataformas ativas com a alocação atual |
| campaign_data | object | Prompt do usuário | Sim | Desempenho por campanha (gasto, CPA, ROAS, conversões) |
| revenue_target | number | Prompt do usuário | Não | Meta de receita mensal |
| max_cpa | number | Prompt do usuário | Não | CPA máximo aceitável |
| min_roas | number | Prompt do usuário | Não | ROAS mínimo aceitável |
| growth_mode | enum | Prompt do usuário | Não | maintain, grow, aggressive — padrão é grow |

---

## Pré-condições

- Pelo menos 30 dias de dados de desempenho de campanha
- Múltiplas campanhas ou plataformas para alocar entre elas
- Metas de KPI claras definidas

---

## Fases de Execução

### Fase 1: Análise da Alocação Atual
1. Mapear a distribuição atual de gasto:
   - Por plataforma
   - Por campanha
   - Por estágio do funil (TOF, MOF, BOF)
2. Calcular o ROAS marginal por campanha (o retorno do último dólar gasto)
3. Identificar retornos decrescentes — onde gastar mais não está produzindo mais?
4. Calcular o gasto desperdiçado (campanhas abaixo do limite mínimo de ROAS)
5. Avaliar a utilização do orçamento (as campanhas estão gastando seus orçamentos integrais?)

### Fase 2: Modelagem de Otimização
1. Classificar todas as campanhas por eficiência:
   - Classificadas por CPA (menor CPA primeiro)
   - Classificadas por ROAS (maior ROAS primeiro)
   - Classificadas por volume (mais conversões primeiro)
2. Aplicar o princípio de otimização de portfólio:
   - Alocar incrementalmente para a campanha de maior retorno
   - Até que o retorno marginal dessa campanha se iguale à próxima melhor opção
   - Continuar até que todo o orçamento seja alocado ou os limites mínimos sejam atingidos
3. Modelar 3 cenários de orçamento:
   - Conservador: Manter o ROAS, maximizar o lucro
   - Crescimento: Aceitar aumento de 10-20% no CPA por volume
   - Agressivo: Aceitar aumento de 30-50% no CPA por escala máxima
4. Calcular os resultados projetados para cada cenário

### Fase 3: Plano de Realocação
1. Definir a mudança de orçamento:
   - De: Campanhas perdendo orçamento (com análise de impacto)
   - Para: Campanhas ganhando orçamento (com benefício projetado)
2. Fasear a realocação ao longo de 1-2 semanas (não da noite para o dia):
   - Semana 1: 50% da mudança (monitorar por disrupções)
   - Semana 2: 50% restantes (se a Semana 1 estiver estável)
3. Definir guardrails para a transição:
   - Mudança máxima diária de orçamento por campanha
   - Limites de monitoramento de CPA durante a transição
   - Gatilhos de rollback se o desempenho se degradar
4. Considerar as fases de aprendizado da plataforma durante mudanças de orçamento

### Fase 4: Framework de Gestão Contínua
1. Definir a cadência de revisão de orçamento:
   - Diária: Verificação de ritmo de gasto (dentro do plano vs plano?)
   - Semanal: Revisão de desempenho e ajustes menores
   - Mensal: Revisão completa de realocação
2. Definir regras automatizadas onde for possível:
   - Pausar o conjunto de anúncios se o CPA exceder X por 3 dias consecutivos
   - Aumentar o orçamento em 15% se o CPA ficar abaixo da meta por 7 dias consecutivos
   - Alertar se o gasto diário desviar mais de 20% do plano
3. Criar o template de relatório mensal de orçamento
4. Planejar o orçamento do próximo trimestre com base nas tendências de desempenho

---

## Formato de Saída

```markdown
## Otimização de Orçamento: {Negócio/Conta}

**Orçamento Total:** ${X}/mês
**ROAS Atual:** {X}:1
**ROAS Alvo:** {X}:1
**Modo de Crescimento:** {mode}

---

### Alocação Atual

| Campanha/Plataforma | Gasto Mensal | CPA | ROAS | ROAS Marginal | Status |
|-------------------|--------------|-----|------|---------------|--------|

**Gasto Desperdiçado:** ${X}/mês em campanhas de baixo desempenho
**Subutilizado:** ${X}/mês de orçamento não sendo gasto

### Modelagem de Cenários

| Cenário | Orçamento | CPA Projetado | ROAS Projetado | Receita Projetada |
|----------|--------|--------------|----------------|------------------|
| Conservador | ${X} | ${X} | {X}:1 | ${X} |
| Crescimento | ${X} | ${X} | {X}:1 | ${X} |
| Agressivo | ${X} | ${X} | {X}:1 | ${X} |

### Realocação Recomendada

| Campanha | Atual | Novo | Mudança | Justificativa |
|----------|---------|-----|--------|-----------|

### Plano de Transição
| Semana | Ação | Monitorar |
|------|--------|---------|

### Regras Automatizadas
| Regra | Gatilho | Ação |
|------|---------|--------|

### Template de Revisão Mensal
{Template para gestão contínua de orçamento}
```

---

## Condições de Veto

- NUNCA realoque 100% do orçamento em um único dia — as fases de aprendizado exigem mudanças graduais
- NUNCA corte uma campanha lucrativa para zero sem confirmação — reduza primeiro, monitore, depois decida
- NUNCA aloque com base apenas na receita — considere a margem de lucro (ROAS vs CPA)
- NUNCA ignore os impactos da fase de aprendizado da plataforma ao mudar o orçamento
- NUNCA defina regras automatizadas sem limites de kill-switch

---

## Critérios de Conclusão

- [ ] Alocação atual mapeada com ROAS marginal
- [ ] Gasto desperdiçado e subutilizado identificado
- [ ] 3 cenários de orçamento modelados com projeções
- [ ] Plano de realocação faseado ao longo de 1-2 semanas
- [ ] Guardrails e gatilhos de rollback definidos
- [ ] Regras automatizadas configuradas
- [ ] Cadência e template de revisão mensal estabelecidos
