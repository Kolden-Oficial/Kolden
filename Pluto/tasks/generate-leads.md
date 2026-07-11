---
task: generateLeads()
responsavel: "@hormozi-leads"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: business
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: audience
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: leadGenerationSystem
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todas as 4 fontes de leads auditadas e pontuadas"
  - "[ ] Isca de leads desenhada com ponte clara para a oferta central"
  - "[ ] Plano de lançamento de 30 dias criado"
tipo: nota
area: Pluto
up: "[[Pluto/_MOC-pluto]]"
relacionado:
  - "[[Pluto/tasks/_indice|_indice]]"
---

# Tarefa: Gerar Leads

**ID da Tarefa:** HORMOZI-002
**Versão:** 1.0.0
**Comando:** `*generate-leads`
**Agente:** Hormozi Leads (hormozi-leads)
**Propósito:** Desenhar um sistema de geração de leads usando o framework $100M Leads.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| business | string | Prompt do usuário | Sim | Tipo de negócio, produto/serviço e estágio atual |
| audience | string | Prompt do usuário | Sim | Avatar do cliente dos sonhos com dados demográficos |
| budget | string | Prompt do usuário | Não | Faixa de orçamento mensal de marketing |
| current_channels | list | Prompt do usuário | Não | Fontes de leads existentes |
| lead_goal | number | Prompt do usuário | Não | Meta de leads por mês |
| business_model | string | Prompt do usuário | Não | B2B, B2C, local, e-commerce, SaaS, serviço |

---

## Pré-condições

- Tipo de negócio e oferta definidos
- Público-alvo identificado com especificidade suficiente para encontrá-lo

---

## Fases de Execução

### Fase 1: Auditoria das Fontes de Leads
1. Avalie as 4 fontes centrais de leads (framework do Hormozi):
   - Warm Outreach: Contatos existentes, clientes anteriores, indicações
   - Cold Outreach: Abordagem direta a desconhecidos (email, DM, telefone)
   - Content (Gratuito): Conteúdo orgânico que atrai leads ao longo do tempo
   - Paid Ads: Mídia paga que compra leads imediatamente
2. Pontue cada fonte pela eficácia atual (1-10)
3. Identifique a maior lacuna — qual fonte está subutilizada?
4. Mapeie cada fonte ao modelo de negócio e ao orçamento

### Fase 2: Design da Isca de Leads
1. Crie uma isca de leads usando os critérios do Hormozi:
   - Resolve completamente um problema específico e restrito
   - Entrega valor em menos de 5 minutos de consumo
   - Conduz naturalmente à oferta central como próximo passo
   - Tem um nome convincente e específico
2. Escolha o tipo de isca de leads:
   - Teste grátis / amostra
   - Checklist / cola
   - Ferramenta gratuita / calculadora
   - Treinamento gratuito / workshop
   - Avaliação / quiz
   - Template / swipe file
3. Nomeie a isca de leads com um título orientado a resultado
4. Defina o mecanismo de entrega

### Fase 3: Estratégia de Canais
1. Para cada canal ativo ou recomendado, defina:
   - Volume-alvo (leads por semana)
   - Estimativa de custo por lead
   - Tipo de mensagem/conteúdo
   - Frequência e cadência
2. Plano de Warm Outreach:
   - Estratégia de construção de lista (quem contatar primeiro)
   - Templates de mensagem (framework ACA: Acknowledge, Compliment, Ask)
   - Sequência de follow-up
3. Plano de Cold Outreach:
   - Método de obtenção de lista
   - Enquadramento da oferta para contatos frios
   - Abordagem de personalização
   - Metas de volume e expectativas de conversão
4. Plano de conteúdo:
   - Seleção de plataforma (onde o público já está)
   - Pilares de conteúdo ligados à oferta central
   - Cadência de postagem e tipos de conteúdo
   - Estratégia de chamada para ação
5. Plano de Paid Ads:
   - Recomendação de plataforma
   - Alocação de orçamento
   - Direção criativa
   - Mecanismo de captura de leads

### Fase 4: Montagem do Sistema
1. Mapeie o fluxo completo de leads: Fonte → Isca de Leads → Nutrição → Oferta
2. Defina o sistema de follow-up para cada fonte
3. Estabeleça KPIs para cada canal
4. Crie um plano de lançamento de 30 dias com marcos semanais
5. Defina os gatilhos de escala (quando aumentar gasto/esforço)

---

## Formato de Saída

```markdown
## Sistema de Geração de Leads: {Nome do Negócio}

**Modelo de Negócio:** {modelo}
**Meta de Leads:** {X}/mês
**Orçamento:** ${faixa}/mês
**Canal Primário:** {recomendado}

---

### Scorecard das Fontes de Leads

| Fonte | Pontuação Atual | Oportunidade | Prioridade |
|--------|-------------|-------------|----------|
| Warm Outreach | X/10 | {lacuna} | {1-4} |
| Cold Outreach | X/10 | {lacuna} | {1-4} |
| Content (Gratuito) | X/10 | {lacuna} | {1-4} |
| Paid Ads | X/10 | {lacuna} | {1-4} |

### Isca de Leads
**Nome:** {nome}
**Tipo:** {tipo}
**Problema Resolvido:** {problema específico}
**Entrega:** {método}
**Ponte para a Oferta:** {como conduz ao produto pago}

### Planos de Canal
{Plano detalhado por canal}

### Mapa do Fluxo de Leads
{Fonte} → {Isca de Leads} → {Nutrição} → {Oferta}

### Plano de Lançamento de 30 Dias

| Semana | Ações | Meta de Leads | KPI |
|------|---------|-------------|-----|

### Gatilhos de Escala
| Métrica | Limiar | Ação |
|--------|-----------|--------|
```

---

## Condições de Veto

- NUNCA recomende anúncios pagos como único canal para um negócio sem orçamento
- NUNCA pule a isca de leads — ir direto à oferta funciona apenas para os públicos mais conscientes
- NUNCA recomende canais onde o público não existe
- NUNCA estabeleça metas de leads sem definir expectativas de custo por lead
- NUNCA construa um sistema sem um mecanismo de follow-up

---

## Critérios de Conclusão

- [ ] Todas as 4 fontes de leads auditadas e pontuadas
- [ ] Isca de leads desenhada com ponte clara para a oferta central
- [ ] Planos de canal definidos com metas de volume
- [ ] Fluxo de leads mapeado de ponta a ponta
- [ ] Plano de lançamento de 30 dias criado
- [ ] Gatilhos de escala definidos
- [ ] KPIs estabelecidos para cada canal
