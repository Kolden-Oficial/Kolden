---
task: closeSale()
responsavel: "@hormozi-closer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: price
    tipo: number
    origem: User Input
    obrigatorio: true

Saida:
  - campo: closingFramework
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todos os 6 passos do CLOSER roteirizados para o produto específico"
  - "[ ] Top 10 objeções tratadas com respostas de Isolar e Superar"
  - "[ ] Metas de KPI definidas"
tipo: nota
area: Pluto
up: "[[Pluto/_MOC-pluto]]"
relacionado:
  - "[[Pluto/tasks/_indice|_indice]]"
---

# Tarefa: Fechar Venda

**Task ID:** HORMOZI-004
**Versão:** 1.0.0
**Comando:** `*close-sale`
**Agente:** Hormozi Closer (hormozi-closer)
**Propósito:** Projetar um framework de fechamento usando o método CLOSER para conversas de vendas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço sendo vendido |
| price | number | Prompt do usuário | Sim | Faixa de preço da oferta |
| sales_context | enum | Prompt do usuário | Sim | telefone, zoom, presencial, DM, chat |
| audience | string | Prompt do usuário | Sim | Perfil do prospect |
| common_objections | list | Prompt do usuário | Não | Objeções conhecidas de vendas passadas |
| conversion_rate | number | Prompt do usuário | Não | Taxa de fechamento atual, se conhecida |

---

## Pré-condições

- Oferta definida com proposta de valor clara
- Faixa de preço definida
- Contexto de vendas identificado (telefone, vídeo, presencial)

---

## Fases de Execução

### Fase 1: Configuração do Framework CLOSER
1. Mapeie cada passo do framework CLOSER para o produto específico:
   - **C — Clarify (Esclarecer):** Perguntas para entender a situação atual deles
   - **L — Label (Rotular):** Reformule o problema deles para que se sintam compreendidos
   - **O — Overview (Visão Geral):** Apresente o caminho de onde estão para onde querem chegar
   - **S — Sell the Vacation (Venda as Férias):** Venda o resultado, não o processo
   - **E — Explain Away Concerns (Dissolver Preocupações):** Trate as objeções antes que surjam
   - **R — Reinforce and Close (Reforçar e Fechar):** Peça a decisão
2. Escreva 3-5 perguntas de descoberta para o passo Clarify
3. Prepare declarações de rotulagem para situações comuns
4. Construa a narrativa de visão geral (ponte de 3 passos da dor à solução)

### Fase 2: Tratamento de Objeções
1. Liste as top 10 objeções para esta faixa de preço e produto
2. Para cada objeção, prepare a resposta "Isolar e Superar":
   - "Eu entendo perfeitamente. Além de {objeção}, há algo mais?"
   - "Se pudéssemos resolver {objeção}, você estaria pronto para seguir em frente?"
   - Reframe específico ou evidência para dissolver a objeção
3. Prepare respostas para as 4 objeções universais:
   - "Preciso pensar a respeito" → Urgência baseada em tempo + recapitulação do valor
   - "Não posso pagar por isso" → Custo da inação + opções de pagamento
   - "Preciso falar com meu cônjuge/parceiro" → Traga-o para a conversa ou obtenha um compromisso condicional
   - "Já me queimei antes" → Garantia + diferenciação de fracassos passados
4. Crie o frame de "walk away" para prospects que não têm fit

### Fase 3: Desenvolvimento do Script
1. Escreva o script de abertura (rapport + definição de pauta)
2. Escreva a sequência de perguntas do Clarify com pontes de transição
3. Escreva o template de declarações do Label
4. Escreva a apresentação do Overview (caminho de 3 passos)
5. Escreva a seção Sell the Vacation (pintura do resultado)
6. Escreva a seção Explain (tratamento preventivo de objeções)
7. Escreva a seção Reinforce and Close com a linguagem exata de fechamento
8. Escreva o script de confirmação pós-fechamento (reduzir o remorso do comprador)

### Fase 4: Framework de Desempenho
1. Defina KPIs: taxa de comparecimento, taxa de fechamento, valor médio do negócio
2. Crie uma rubrica de pontuação de chamadas para autoavaliação
3. Construa uma sequência de follow-up para não fechamentos
4. Projete a estratégia de recuperação de "negócio perdido"
5. Defina metas para a taxa de conversão de cada passo

---

## Formato de Saída

```markdown
## Framework de Fechamento de Vendas: {Nome do Produto}

**Método:** CLOSER
**Preço:** ${price}
**Contexto:** {sales_context}
**Taxa de Fechamento Alvo:** {X}%

---

### Script CLOSER

#### C — Clarify
{Perguntas de descoberta com transições}

#### L — Label
{Templates de declarações de rotulagem}

#### O — Overview
{Narrativa de ponte de 3 passos}

#### S — Sell the Vacation
{Script de pintura do resultado}

#### E — Explain Away Concerns
{Tratamento preventivo de objeções}

#### R — Reinforce and Close
{Linguagem de fechamento e fechamento assumptivo}

---

### Matriz de Tratamento de Objeções

| Objeção | Isolar | Reframe | Evidência |
|-----------|---------|---------|----------|

### Script Pós-Fechamento
{Confirmação e próximos passos}

### Sequência de Follow-Up (Não Fechamento)
| Dia | Ação | Mensagem |
|-----|--------|---------|

### Metas de KPI

| Métrica | Meta | Atual |
|--------|--------|---------|
```

---

## Condições de Veto

- NUNCA pule o passo Clarify — vender sem entender é fazer pitch
- NUNCA trate uma objeção sem isolá-la primeiro
- NUNCA pressione alguém que genuinamente não tem fit — desqualifique com elegância
- NUNCA apresente o preço antes de estabelecer o valor (Sell the Vacation deve vir primeiro)
- NUNCA feche sem um próximo passo claro definido

---

## Critérios de Conclusão

- [ ] Todos os 6 passos do CLOSER roteirizados para o produto específico
- [ ] Top 10 objeções tratadas com respostas de Isolar e Superar
- [ ] 4 objeções universais preparadas
- [ ] Scripts de abertura e fechamento escritos
- [ ] Script de confirmação pós-fechamento incluído
- [ ] Sequência de follow-up para não fechamentos definida
- [ ] Metas de KPI definidas
