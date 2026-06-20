---
task: auditBusiness()
responsavel: "@hormozi-audit"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: business
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: revenue
    tipo: number
    origem: User Input
    obrigatorio: true

Saida:
  - campo: businessAudit
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Equação de receita pontuada com todos os 4 componentes"
  - "[ ] Restrição nº 1 claramente identificada"
  - "[ ] 3 recomendações priorizadas com impacto na receita"
---

# Tarefa: Auditar Negócio

**Task ID:** HORMOZI-007
**Versão:** 1.0.0
**Comando:** `*audit-business`
**Agente:** Hormozi Audit (hormozi-audit)
**Propósito:** Conduzir uma auditoria de negócio abrangente com diagnóstico orientado por métricas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| business | string | Prompt do usuário | Sim | Nome, tipo e estágio do negócio |
| revenue | number | Prompt do usuário | Sim | Receita mensal ou anual |
| profit_margin | number | Prompt do usuário | Não | Percentual de margem de lucro atual |
| team_size | number | Prompt do usuário | Não | Número de funcionários/contratados |
| channels | list | Prompt do usuário | Não | Canais de marketing e vendas em uso |
| biggest_challenge | string | Prompt do usuário | Não | Restrição principal autoidentificada |
| metrics | object | Prompt do usuário | Não | Métricas de negócio disponíveis (CAC, LTV, churn, etc.) |

---

## Pré-condições

- O negócio está operacional com receita
- O dono está disposto a compartilhar números honestos

---

## Fases de Execução

### Fase 1: Auditoria do Motor de Receita
1. Diagnostique a equação de receita: Receita = Leads x Taxa de Conversão x Preço x Frequência
2. Pontue cada componente (1-10):
   - Leads: Volume e qualidade dos leads que chegam
   - Conversão: Percentual de leads que se tornam clientes
   - Preço: Receita média por transação
   - Frequência: Com que frequência os clientes compram (taxa de recompra)
3. Identifique o elo mais fraco na cadeia de receita
4. Calcule o impacto de uma melhoria de 10% em cada componente
5. Determine a restrição: qual melhoria isolada dobraria a receita?

### Fase 2: Auditoria da Oferta
1. Avalie a oferta atual em relação à Value Equation
2. Pontue cada quadrante:
   - Dream Outcome (resultado dos sonhos): A promessa é convincente o suficiente?
   - Perceived Likelihood (probabilidade percebida): O comprador acredita que vai funcionar?
   - Time Delay (atraso de tempo): Quanto tempo até o primeiro resultado?
   - Effort & Sacrifice (esforço e sacrifício): Quanto trabalho para o comprador?
3. Identifique se a oferta é "boa" (resolve o problema) ou "grand slam" (irresistível)
4. Compare o preço: o negócio está subprecificado para o valor entregue?

### Fase 3: Auditoria de Operações
1. Avalie o sistema de entrega:
   - O negócio consegue atender 2x o volume atual sem quebrar?
   - Qual é o custo de entrega por cliente?
   - Onde estão os gargalos no cumprimento (fulfillment)?
2. Avalie a equipe:
   - Dependências de pessoas-chave
   - Clareza de papéis e responsabilização
   - Utilização de capacidade
3. Avalie as finanças:
   - Margem bruta
   - Margem líquida
   - Previsibilidade do fluxo de caixa
   - Razão Custo de Aquisição de Cliente vs Lifetime Value

### Fase 4: Prescrição de Crescimento
1. Identifique a restrição nº 1 que está segurando o negócio
2. Forneça 3 recomendações específicas e priorizadas:
   - Vitória rápida (implementável esta semana)
   - Jogada de médio prazo (implementável este mês)
   - Mudança estratégica (implementável neste trimestre)
3. Calcule o impacto na receita de cada recomendação
4. Defina o foco dos próximos 90 dias
5. Identifique o que PARAR de fazer (auditoria de subtração)

---

## Formato de Saída

```markdown
## Auditoria de Negócio: {Nome do Negócio}

**Receita:** ${X}/mês
**Margem:** {X}%
**Estágio:** {startup / crescimento / escala / otimização}
**Restrição nº 1:** {restrição identificada}

---

### Motor de Receita

| Componente | Pontuação | Atual | Impacto de Melhoria de 10% |
|-----------|-------|---------|----------------------|
| Leads | X/10 | {métrica} | +${X}/mês |
| Conversão | X/10 | {métrica}% | +${X}/mês |
| Preço | X/10 | ${métrica} | +${X}/mês |
| Frequência | X/10 | {métrica}x/ano | +${X}/mês |

**Elo Mais Fraco:** {componente}
**Alavanca de Dobrar:** {qual componente focar}

### Avaliação da Oferta

| Quadrante | Pontuação | Problema | Correção |
|----------|-------|-------|-----|
| Dream Outcome | X/10 | {problema} | {correção} |
| Perceived Likelihood | X/10 | {problema} | {correção} |
| Time Delay | X/10 | {problema} | {correção} |
| Effort & Sacrifice | X/10 | {problema} | {correção} |

### Avaliação de Operações
**Escalabilidade:** {consegue/não consegue lidar com 2x de volume}
**Gargalo:** {gargalo identificado}
**Razão CAC:LTV:** {X}:1

### Prescrição de Crescimento

| Prioridade | Recomendação | Prazo | Impacto na Receita |
|----------|---------------|----------|----------------|
| 1 | {vitória rápida} | Esta semana | +${X}/mês |
| 2 | {jogada de médio prazo} | Este mês | +${X}/mês |
| 3 | {mudança estratégica} | Neste trimestre | +${X}/mês |

### Lista de Parar de Fazer
1. {coisa para parar}
2. {coisa para parar}

### Foco de 90 Dias
{Uma prioridade clara para os próximos 90 dias}
```

---

## Condições de Veto

- NUNCA audite sem números reais de receita — estimativas produzem conselhos de qualidade de estimativa
- NUNCA recomende mais de 3 prioridades — o foco é o ponto central
- NUNCA ignore o lado das operações — crescimento sem capacidade de cumprimento mata negócios
- NUNCA pule a lista de "parar de fazer" — subtração é tão importante quanto adição
- NUNCA forneça conselhos genéricos — toda recomendação deve estar atrelada aos números específicos do negócio

---

## Critérios de Conclusão

- [ ] Equação de receita pontuada com todos os 4 componentes
- [ ] Elo mais fraco e alavanca de dobrar identificados
- [ ] Oferta auditada em relação à Value Equation
- [ ] Operações avaliadas quanto à escalabilidade
- [ ] Restrição nº 1 claramente identificada
- [ ] 3 recomendações priorizadas com impacto na receita
- [ ] Lista de parar de fazer fornecida
- [ ] Foco de 90 dias definido
