---
task: analyzePerformance()
responsavel: "@performance-analyst"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: platform
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: metrics
    tipo: object
    origem: User Input
    obrigatorio: true

Saida:
  - campo: performanceAnalysis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Métricas principais calculadas e apresentadas"
  - "[ ] Análise 80/20 realizada"
  - "[ ] Plano de ação de 7 dias criado"
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
relacionado:
  - "[[Peitho/tasks/_indice|_indice]]"
---

# Tarefa: Analisar Performance

**Task ID:** TRAFFIC-006
**Versão:** 1.0.0
**Comando:** `*analyze-performance`
**Agente:** Performance Analyst (performance-analyst)
**Propósito:** Análise profunda de performance de campanhas de anúncios com recomendações orientadas por dados.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| platform | enum | Prompt do usuário | Sim | facebook, google, youtube, tiktok, linkedin, multi |
| metrics | object | Prompt do usuário | Sim | Métricas de campanha: investimento, impressões, cliques, conversões, receita |
| time_period | string | Prompt do usuário | Sim | Janela de análise (7d, 14d, 30d, 90d) |
| comparison_period | string | Prompt do usuário | Não | Período anterior para análise de tendência |
| breakdown | string | Prompt do usuário | Não | Detalhamento solicitado: campanha, conjunto de anúncios, anúncio, público, posicionamento |
| business_context | string | Prompt do usuário | Não | Sazonalidade, promoções ou fatores externos |

---

## Pré-condições

- Mínimo de 7 dias de dados para análise significativa
- Rastreamento de conversão verificado e preciso
- Ao menos um KPI de negócio claro definido (CPA, ROAS, CPL)

---

## Fases de Execução

### Fase 1: Cálculo de Métricas
1. Calcule as métricas principais a partir dos dados brutos:
   - CPC (Custo Por Clique) = Investimento / Cliques
   - CTR (Taxa de Cliques) = Cliques / Impressões
   - CVR (Taxa de Conversão) = Conversões / Cliques
   - CPA (Custo Por Aquisição) = Investimento / Conversões
   - ROAS (Retorno Sobre Investimento em Anúncios) = Receita / Investimento
   - CPM (Custo Por 1000 Impressões) = (Investimento / Impressões) x 1000
   - Frequência = Impressões / Alcance
2. Calcule as variações período a período se houver dados de comparação disponíveis
3. Identifique variações estatisticamente significativas vs variância normal
4. Sinalize anomalias (picos ou quedas súbitas)

### Fase 2: Detalhamento de Performance
1. Detalhe a performance pela dimensão solicitada:
   - Por Campanha: Quais campanhas geram mais valor?
   - Por Conjunto de Anúncios: Quais públicos convertem melhor?
   - Por Anúncio: Quais criativos performam?
   - Por Posicionamento: Onde o anúncio funciona melhor?
   - Por Dia/Hora: Quando a performance é mais forte?
2. Aplique a análise 80/20: quais 20% dos elementos geram 80% dos resultados?
3. Identifique os 20% inferiores que estão arrastando a performance para baixo
4. Calcule o impacto de remover os elementos de baixa performance

### Fase 3: Análise de Tendência
1. Trace as métricas-chave ao longo do período de análise:
   - Tendência de CPA: estável, subindo ou caindo?
   - Tendência de ROAS: melhorando ou degradando?
   - Tendência de CTR: sinal de fadiga de criativo?
   - Tendência de Frequência: exaustão de público?
2. Identifique pontos de inflexão — quando a performance mudou?
3. Correlacione as mudanças com eventos conhecidos (lançamentos de criativo, mudanças de orçamento, fatores externos)
4. Projete para frente: para onde essas tendências irão nos próximos 14-30 dias?

### Fase 4: Insights Acionáveis
1. Resuma os 3 achados mais importantes
2. Para cada achado, forneça:
   - O que aconteceu (observação baseada em dados)
   - Por que importa (impacto no negócio)
   - O que fazer a respeito (ação específica)
3. Priorize as ações pelo impacto esperado
4. Crie um plano de ação de 7 dias
5. Defina o que monitorar para o próximo período de análise

---

## Formato de Saída

```markdown
## Análise de Performance: {Plataforma/Campanha}

**Período:** {datas}
**Investimento Total:** ${X}
**Receita Total:** ${X}
**ROAS:** {X}:1
**CPA:** ${X}
**Tendência:** {melhorando / estável / caindo}

---

### Resumo das Métricas-Chave

| Métrica | Atual | Anterior | Variação | Status |
|--------|---------|----------|--------|--------|
| Investimento | ${X} | ${X} | {+/-X%} | {OK/Observar/Alerta} |
| Receita | ${X} | ${X} | {+/-X%} | {OK/Observar/Alerta} |
| ROAS | {X}:1 | {X}:1 | {+/-X%} | {OK/Observar/Alerta} |
| CPA | ${X} | ${X} | {+/-X%} | {OK/Observar/Alerta} |
| CTR | {X}% | {X}% | {+/-X%} | {OK/Observar/Alerta} |
| CVR | {X}% | {X}% | {+/-X%} | {OK/Observar/Alerta} |

### Análise 80/20
**Top 20% impulsionadores:** {lista com métricas}
**20% inferiores que arrastam:** {lista com métricas}
**Impacto de cortar os 20% inferiores:** +${X} economizado, ROAS melhora para {X}:1

### Análise de Tendência
{Descrições de tendência com pontos de inflexão e projeções}

### Top 3 Insights

#### Insight 1: {Título}
**O quê:** {observação}
**Por que importa:** {impacto}
**Ação:** {recomendação}

#### Insight 2-3: ...

### Plano de Ação de 7 Dias
| Dia | Ação | Impacto Esperado |
|-----|--------|----------------|

### Monitorar no Próximo Período
| Métrica | Observar Por | Limiar |
|--------|-----------|-----------|
```

---

## Condições de Veto

- NUNCA analise menos de 7 dias de dados — janelas curtas são ruído, não sinal
- NUNCA apresente métricas sem contexto (benchmarks, tendências ou períodos de comparação)
- NUNCA tire conclusões de dados estatisticamente insignificantes (conjuntos de anúncios de baixo volume)
- NUNCA forneça insights sem recomendações específicas e acionáveis
- NUNCA ignore fatores externos (sazonalidade, promoções, eventos de mercado)

---

## Critérios de Conclusão

- [ ] Métricas principais calculadas e apresentadas
- [ ] Comparação período a período concluída (se houver dados disponíveis)
- [ ] Análise 80/20 realizada
- [ ] Análise de tendência com pontos de inflexão
- [ ] Top 3 insights com observações baseadas em dados
- [ ] Plano de ação de 7 dias criado
- [ ] Framework de monitoramento para o próximo período definido
