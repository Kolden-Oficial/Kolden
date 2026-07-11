---
task: setPricing()
responsavel: "@hormozi-pricing"
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
  - campo: pricingStrategy
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Valor entregue calculado com dimensões financeiras e emocionais"
  - "[ ] Modelo de precificação selecionado com justificativa"
  - "[ ] Plano de teste definido"
tipo: nota
area: Pluto
up: "[[Pluto/_MOC-pluto]]"
relacionado:
  - "[[Pluto/tasks/_indice|_indice]]"
---

# Tarefa: Definir Estratégia de Precificação

**ID da Tarefa:** HORMOZI-003
**Versão:** 1.0.0
**Comando:** `*set-pricing`
**Agente:** Hormozi Pricing (hormozi-pricing)
**Propósito:** Desenhar uma estratégia de precificação baseada em valor que maximize a receita sem competir por preço.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto ou serviço a precificar |
| audience | string | Prompt do usuário | Sim | Cliente-alvo com contexto de disposição a pagar |
| current_price | number | Prompt do usuário | Não | Preço existente, se aplicável |
| cost_structure | object | Prompt do usuário | Não | Custo de entrega (COGS, fulfillment, etc.) |
| competitor_prices | list | Prompt do usuário | Não | Referências de preço de mercado |
| business_model | string | Prompt do usuário | Não | Pagamento único, assinatura, escalonado, baseado em uso |
| revenue_target | number | Prompt do usuário | Não | Meta de receita mensal/anual |

---

## Pré-condições

- Produto ou serviço definido com entrega de valor clara
- Estrutura da oferta concluída (idealmente via create-offer.md primeiro)

---

## Fases de Execução

### Fase 1: Avaliação de Valor
1. Calcule o ROI que o cliente recebe do produto
2. Aplique a Regra do 10x: o preço deve ser no mínimo 1/10 do valor entregue
3. Determine o "custo da inação" — quanto custa a ele NÃO comprar?
4. Identifique investimentos comparáveis que o cliente já faz
5. Avalie o valor emocional para além do ROI financeiro

### Fase 2: Arquitetura de Precificação
1. Escolha o modelo de precificação:
   - Premium (preço alto, alto contato, menos clientes)
   - Volume (preço mais baixo, baseado em sistemas, muitos clientes)
   - Híbrido (escalonado com níveis de entrada e premium)
2. Estabeleça o preço-âncora (o número do "deveria ser", baseado no valor)
3. Defina o preço real como uma fração da âncora
4. Desenhe as opções de pagamento:
   - Pagamento à vista com incentivo de desconto
   - Plano de parcelamento com prêmio pela conveniência
   - Assinatura com benefícios de fidelização
5. Crie faixas de preço (tiers) se aplicável:
   - Good: Apenas a oferta central
   - Better: Central + bônus de velocidade
   - Best: Central + todos os bônus + acesso premium

### Fase 3: Justificativa de Preço
1. Construa a narrativa de preço para valor
2. Calcule o detalhamento de custo diário/semanal ("menos que um café por dia")
3. Crie a pilha de comparação (o que mais custa esse tanto mas entrega menos)
4. Defina a linha do tempo do ROI — quando o investimento se paga?
5. Escreva o copy da seção de preço para os materiais de vendas

### Fase 4: Otimização de Preço
1. Estabeleça o preço de teste inicial
2. Defina a metodologia de teste de preço:
   - Teste primeiro a 2x o preço atual (a maioria dos negócios precifica abaixo do ideal)
   - Monitore a taxa de conversão E a receita (não apenas a conversão)
   - A receita por lead importa mais do que a taxa de conversão
3. Defina os gatilhos de aumento de preço
4. Planeje a estratégia anual de aumento de preço

---

## Formato de Saída

```markdown
## Estratégia de Precificação: {Nome do Produto}

**Modelo:** {premium / volume / híbrido}
**Preço:** ${preço}
**Valor Entregue:** ${valor}
**Razão Valor para Preço:** {X}:1
**Custo da Inação:** ${custo}/ano

---

### Avaliação de Valor

| Dimensão | Valor | Justificativa |
|-----------|-------|-----------|
| ROI Financeiro | ${X} | {cálculo} |
| Tempo Economizado | {horas} | {a $X/hora = $Y} |
| Valor Emocional | {qualitativo} | {descrição} |
| Custo da Inação | ${X}/ano | {o que ele perde por não comprar} |

### Faixas de Preço (Tiers)

| Tier | Inclui | Preço | Cliente-alvo |
|------|----------|-------|----------------|

### Opções de Pagamento

| Opção | Preço | Termos | Incentivo |
|--------|-------|-------|-----------|

### Narrativa de Justificativa de Preço
{Copy pronto para usar nos materiais de vendas}

### Plano de Teste
| Fase | Preço | Duração | Métrica de Sucesso |
|-------|-------|----------|----------------|

### Estratégia de Aumento de Preço
{Plano de aumento anual com gatilhos}
```

---

## Condições de Veto

- NUNCA precifique baseando-se apenas no preço dos concorrentes — isso é uma corrida ao fundo do poço
- NUNCA reduza o preço para aumentar as vendas sem antes testar a preços mais altos
- NUNCA ofereça descontos sem uma razão estratégica (urgência, fidelidade, volume)
- NUNCA precifique abaixo de 10x o custo de entrega — as margens precisam sustentar o crescimento
- NUNCA defina o preço sem antes calcular o valor entregue

---

## Critérios de Conclusão

- [ ] Valor entregue calculado com dimensões financeiras e emocionais
- [ ] Regra do 10x aplicada e validada
- [ ] Modelo de precificação selecionado com justificativa
- [ ] Tiers e opções de pagamento desenhados
- [ ] Narrativa de justificativa de preço escrita
- [ ] Plano de teste definido
- [ ] Estratégia de aumento de preço documentada
