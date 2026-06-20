---
task: createAdStrategy()
responsavel: "@traffic-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: platform
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: adStrategy
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] 3-5 segmentos de público definidos com detalhes de segmentação"
  - "[ ] Estrutura de campanha mapeada por etapa do funil"
  - "[ ] Orçamento alocado com detalhamentos diário e mensal"
---

# Tarefa: Criar Estratégia de Anúncios

**Task ID:** TRAFFIC-001
**Versão:** 1.0.0
**Comando:** `*create-ad-strategy`
**Agente:** Traffic Chief (traffic-chief) roteia para especialista de plataforma
**Propósito:** Desenhar uma estratégia de publicidade paga específica de plataforma com segmentação, direção de criativo e alocação de orçamento.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto ou serviço a anunciar |
| audience | string | Prompt do usuário | Sim | Demografia e psicografia do público-alvo |
| platform | enum | Prompt do usuário | Sim | facebook, google, youtube, tiktok, linkedin, multiplataforma |
| budget | number | Prompt do usuário | Sim | Orçamento mensal de publicidade |
| objective | enum | Prompt do usuário | Sim | awareness, traffic, leads, sales, app-installs |
| funnel | string | Prompt do usuário | Não | URL/descrição da landing page ou funil |
| current_performance | object | Prompt do usuário | Não | Métricas existentes se já estiver rodando anúncios |

---

## Pré-condições

- Orçamento definido com alocação mensal clara
- Landing page ou funil existe (ou está sendo construído)
- Plataforma selecionada com base em onde o público passa o tempo

---

## Fases de Execução

### Fase 1: Arquitetura de Público
1. Defina os segmentos de público primários (3-5 segmentos):
   - Demografia: idade, gênero, localização, renda
   - Psicografia: interesses, comportamentos, dores
   - Segmentação específica de plataforma: públicos personalizados, lookalikes, pilhas de interesse
2. Mapeie cada segmento para uma etapa do funil:
   - Frio: Nunca ouviu falar de você (prospecção)
   - Morno: Engajou com conteúdo ou visitou o site (retargeting)
   - Quente: Adicionou ao carrinho, viu preços, compradores anteriores (remarketing)
3. Dimensione cada público e estime o alcance no orçamento dado
4. Priorize os segmentos pelo ROAS esperado

### Fase 2: Arquitetura de Campanha
1. Estruture as campanhas por objetivo e etapa do funil:
   - Topo de Funil: Campanhas de awareness/engajamento (públicos frios)
   - Meio de Funil: Campanhas de consideração (públicos mornos)
   - Fundo de Funil: Campanhas de conversão (públicos quentes)
2. Defina os conjuntos de anúncios dentro de cada campanha:
   - Segmentação de público por conjunto de anúncios
   - Alocação de orçamento por conjunto de anúncios
   - Seleção de posicionamento (feed, stories, pesquisa, display, in-stream)
3. Defina a estratégia de lance por campanha:
   - Considerações da fase de aprendizado
   - Bid caps vs lance automático
   - Orçamento mínimo por conjunto de anúncios para significância estatística

### Fase 3: Estratégia de Criativo
1. Defina os temas de criativo por etapa do funil:
   - TOF: Consciência do problema, curiosidade, entretenimento
   - MOF: Prova, educação, diferenciação
   - BOF: Oferta, urgência, depoimentos
2. Especifique os formatos de anúncio por plataforma:
   - Facebook/IG: Imagem estática, carrossel, vídeo (15s, 30s, 60s), coleção
   - Google: Search (RSA), Display, Performance Max, YouTube
   - TikTok: Vídeo estilo UGC, spark ads, branded effects
   - LinkedIn: Imagem única, carrossel, vídeo, conversation ads
3. Forneça briefings de criativo para os primeiros 3-5 anúncios por etapa
4. Defina o framework de teste: quais variáveis testar primeiro

### Fase 4: Framework de Orçamento e KPI
1. Aloque o orçamento entre as etapas do funil:
   - Divisão sugerida: 60% TOF, 25% MOF, 15% BOF (ajuste com base na maturidade)
2. Defina metas de KPI por etapa usando benchmarks de plataforma
3. Defina o cronograma de otimização:
   - Dia 1-3: Deixe as campanhas aprenderem, não mexa
   - Dia 4-7: Mate os de baixa performance, escale os vencedores
   - Semanal: Refresh de criativo, expansão de público
   - Mensal: Revisão completa da estratégia
4. Crie o plano de escala: gatilhos e métodos para aumentar o investimento

---

## Formato de Saída

```markdown
## Estratégia de Anúncios: {Nome do Produto}

**Plataforma:** {platform}
**Orçamento Mensal:** ${budget}
**Objetivo:** {objective}
**ROAS Estimado:** {X}:1

---

### Segmentos de Público

| Segmento | Tipo | Tamanho | Segmentação | Etapa do Funil |
|---------|------|------|-----------|-------------|

### Estrutura de Campanha

| Campanha | Objetivo | Público | Orçamento Diário | Posicionamentos |
|----------|----------|----------|-------------|------------|

### Estratégia de Criativo

| Etapa | Formato | Tema | Ângulo do Hook | CTA |
|-------|--------|-------|-----------|-----|

### Briefings de Criativo
{3-5 briefings de criativo de anúncio com direção de copy e notas visuais}

### Alocação de Orçamento

| Etapa | % Orçamento | Mensal | CPA/ROAS Alvo |
|-------|---------|---------|----------------|

### Metas de KPI

| Métrica | TOF | MOF | BOF |
|--------|-----|-----|-----|

### Cronograma de Otimização
| Janela de Tempo | Ação | Critério |
|-----------|--------|----------|

### Plano de Escala
| Gatilho | Método | Aumento de Orçamento |
|---------|--------|----------------|
```

---

## Condições de Veto

- NUNCA lance campanhas sem um plano de fase de aprendizado — matar anúncios cedo demais desperdiça orçamento
- NUNCA aloque 100% do orçamento para BOF — você vai exaurir os públicos mornos em dias
- NUNCA pule o dimensionamento de público — investir em públicos pequenos demais causa fadiga de frequência
- NUNCA recomende uma plataforma onde o público-alvo não está ativo
- NUNCA defina metas de KPI sem referenciar benchmarks de plataforma

---

## Critérios de Conclusão

- [ ] 3-5 segmentos de público definidos com detalhes de segmentação
- [ ] Estrutura de campanha mapeada por etapa do funil
- [ ] Estratégia de criativo definida por etapa com briefings
- [ ] Orçamento alocado com detalhamentos diário e mensal
- [ ] Metas de KPI definidas por etapa do funil
- [ ] Cronograma de otimização documentado
- [ ] Plano de escala definido com gatilhos
