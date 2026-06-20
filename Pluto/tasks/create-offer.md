---
task: createOffer()
responsavel: "@hormozi-offers"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: audience
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: grandSlamOffer
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Value Equation pontuada em todos os 4 quadrantes"
  - "[ ] Problemas mapeados para veículos de solução com nomes proprietários"
  - "[ ] Stack da oferta montado com núcleo + bônus"
---

# Tarefa: Criar Grand Slam Offer

**Task ID:** HORMOZI-001
**Versão:** 1.0.0
**Comando:** `*create-offer`
**Agente:** Hormozi Offers (hormozi-offers)
**Propósito:** Construir uma Grand Slam Offer usando a Value Equation de $100M Offers.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto ou serviço central |
| audience | string | Prompt do usuário | Sim | Avatar do cliente dos sonhos |
| current_price | number | Prompt do usuário | Não | Preço existente, se aplicável |
| delivery_method | string | Prompt do usuário | Não | Como o produto é entregue |
| market | string | Prompt do usuário | Não | Indústria ou nicho |
| competitors | list | Prompt do usuário | Não | Ofertas concorrentes conhecidas |

---

## Pré-condições

- Produto ou serviço central identificado
- Público-alvo definido com pontos de dor e resultados dos sonhos claros

---

## Fases de Execução

### Fase 1: Mapeamento do Resultado dos Sonhos
1. Defina o resultado dos sonhos nas palavras do cliente (não nas suas)
2. Identifique a lacuna entre onde eles estão e onde querem chegar
3. Liste cada problema que está entre o cliente e o resultado dos sonhos
4. Para cada problema, liste os subproblemas e os problemas adjacentes
5. Classifique cada problema por gravidade (quanta dor causa, 1-10)
6. Identifique quais problemas eles já tentaram e fracassaram em resolver antes

### Fase 2: Construção da Value Equation
1. Aplique a Value Equation de Hormozi: Valor = (Resultado dos Sonhos x Probabilidade Percebida) / (Atraso de Tempo x Esforço e Sacrifício)
2. Maximize o numerador:
   - Dream Outcome (resultado dos sonhos): Torne o resultado o mais específico e vívido possível
   - Perceived Likelihood (probabilidade percebida): Empilhe provas, garantias e histórico de resultados
3. Minimize o denominador:
   - Time Delay (atraso de tempo): Comprima o tempo até o primeiro resultado
   - Effort & Sacrifice (esforço e sacrifício): Remova o atrito, faça por eles onde for possível
4. Pontue cada quadrante (1-10) para a oferta atual
5. Identifique qual quadrante tem mais espaço para melhoria

### Fase 3: Arquitetura da Oferta
1. Transforme cada problema em um veículo de solução (curso, ferramenta, template, serviço, comunidade, etc.)
2. Nomeie cada veículo de solução com um nome proprietário
3. Atribua método de entrega e formato a cada veículo
4. Empilhe os veículos em uma oferta coesa:
   - Oferta central: O principal veículo de transformação
   - Bônus de velocidade: Coisas que comprimem o tempo até o resultado
   - Bônus de esforço: Coisas que reduzem o trabalho necessário
   - Bônus de prova: Coisas que aumentam a confiança
5. Projete a garantia usando o stack de garantias de Hormozi:
   - Incondicional (reembolso total, sem perguntas)
   - Condicional (reembolso se você fizer X e não obtiver Y)
   - Anti-garantia (isto NÃO é para você se...)
   - Por desempenho (trabalharemos de graça até você atingir X)
6. Defina o preço com base no valor entregue, não no custo ou nos concorrentes

### Fase 4: Nomeação e Posicionamento da Oferta
1. Crie um nome de oferta convincente que implique a transformação
2. Escreva a proposta de valor de uma linha
3. Defina o qualificador "isto NÃO é para você" para aumentar a exclusividade percebida
4. Crie o mecanismo de escassez/urgência
5. Escreva o stack slide (resumo visual de tudo que está incluído)

---

## Formato de Saída

```markdown
## Grand Slam Offer: {Nome da Oferta}

**Resultado dos Sonhos:** {resultado específico}
**Avatar:** {cliente dos sonhos}
**Preço:** ${price}
**Pontuação da Value Equation:** {X}/10

---

### Detalhamento da Value Equation

| Quadrante | Pontuação | Estratégia |
|----------|-------|----------|
| Dream Outcome | X/10 | {como maximizamos} |
| Perceived Likelihood | X/10 | {como maximizamos} |
| Time Delay | X/10 | {como minimizamos} |
| Effort & Sacrifice | X/10 | {como minimizamos} |

### Mapa Problemas → Soluções

| Problema | Veículo de Solução | Nome Proprietário | Entrega |
|---------|-----------------|-------------------|----------|

### Stack da Oferta

| Componente | O Que Faz | Valor |
|-----------|-------------|-------|
| Oferta Central | {descrição} | ${value} |
| Bônus de Velocidade 1 | {descrição} | ${value} |
| Bônus de Esforço 1 | {descrição} | ${value} |
| Bônus de Prova 1 | {descrição} | ${value} |

**Valor Total:** ${total}
**Seu Preço:** ${price}

### Garantia
{Declaração completa da garantia com tipo}

### Escassez/Urgência
{Mecanismo e justificativa}

### Qualificador
"Isto NÃO é para você se..."

### Copy do Stack Slide
{Resumo visual do stack pronto para uso}
```

---

## Condições de Veto

- NUNCA crie uma oferta sem aplicar a Value Equation
- NUNCA precifique com base nos preços dos concorrentes — precifique com base no valor entregue
- NUNCA pule o mapeamento problema-solução — toda solução deve resolver um problema real
- NUNCA crie uma garantia que o negócio não consiga cumprir
- NUNCA adicione bônus que distraiam da transformação central

---

## Critérios de Conclusão

- [ ] Resultado dos sonhos definido na linguagem do cliente
- [ ] Value Equation pontuada em todos os 4 quadrantes
- [ ] Problemas mapeados para veículos de solução com nomes proprietários
- [ ] Stack da oferta montado com núcleo + bônus
- [ ] Garantia projetada e documentada
- [ ] Preço definido com justificativa baseada em valor
- [ ] Mecanismo de escassez definido
- [ ] Copy do stack slide escrita
