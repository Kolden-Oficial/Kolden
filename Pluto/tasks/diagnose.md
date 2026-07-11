---
task: diagnoseBusinessChallenge()
responsavel: "@hormozi-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: request
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: revenue_stage
    tipo: string
    origem: User Input
    obrigatorio: false

Saida:
  - campo: diagnosis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Requisição interpretada e palavras-chave extraídas"
  - "[ ] Catálogo de roteamento consultado com resultados pontuados"
  - "[ ] Resposta rápida fornecida com referência a um framework do Hormozi"
tipo: nota
area: Pluto
up: "[[Pluto/_MOC-pluto]]"
relacionado:
  - "[[Pluto/tasks/_indice|_indice]]"
---

# Tarefa: Diagnosticar Desafio de Negócio

**ID da Tarefa:** HORMOZI-CHIEF-001
**Versão:** 1.0.0
**Comando:** `*diagnose`
**Orquestrador:** Hormozi Chief (hormozi-chief)
**Propósito:** Triar desafios de negócio, fornecer resposta rápida usando frameworks do Hormozi, rotear para o especialista.

---

## Visão Geral

```
Requisição do Usuário → Interpretar Palavras-chave → Cruzar com Catálogo de Roteamento → Responder/Rotear → Saída
     │              │                    │                     │
     ▼              ▼                    ▼                     ▼
  Entrada bruta   Extrair tipo do      Pontuar domínios      Resposta rápida +
              desafio de negócio     contra 15 domínios     rota do especialista
              + estágio + métrica                          (lente da Value Equation)
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| request | string | Prompt do usuário | Sim | Descrição não vazia do desafio de negócio |
| context | object | Estado da sessão | Não | Estágio do negócio, faturamento, setor, métricas atuais |
| revenue_stage | string | Prompt do usuário | Não | Pré-faturamento, <$1M, $1-3M, $3-10M, $10M+ |

---

## Pré-condições

- O Hormozi Squad está ativo com o Hormozi Chief como agente de entrada
- Catálogo de roteamento carregado de data/routing-catalog.yaml
- Todos os 15 agentes especialistas registrados em config.yaml
- Contexto da fórmula central: Value = (Dream Outcome x Perceived Likelihood) / (Time Delay x Effort & Sacrifice)

---

## Fases de Execução

### Fase 1: Analisar a Requisição

1. Interprete o desafio de negócio do usuário
2. Extraia as palavras-chave primárias e a intenção
3. Identifique a função de negócio (ofertas, leads, precificação, vendas, escala, retenção, etc.)
4. Identifique o estágio do negócio, se mencionado (pré-faturamento, startup, crescimento, escala)
5. Anote qual parte da Value Equation está com desempenho abaixo do esperado

### Fase 2: Cruzar com o Catálogo de Roteamento

| Domínio | Palavras-chave | Rotear Para |
|--------|----------|----------|
| Criação de Oferta | offer, grand slam, value stack, bonuses, guarantee | hormozi-offers / hormozi-pricing |
| Geração de Leads | leads, lead magnet, acquisition, outreach, traffic | hormozi-leads / hormozi-ads |
| Estratégia de Precificação | pricing, charge more, premium, margins, price point | hormozi-pricing / hormozi-offers |
| Sales Copy | sales copy, landing page copy, ad text, write copy | hormozi-copy / hormozi-hooks |
| Anúncios Pagos | ads, paid ads, advertising, ad spend, media buying | hormozi-ads / hormozi-hooks |
| Estratégia de Conteúdo | content, social media, organic, YouTube, posting | hormozi-content / hormozi-hooks |
| Ganchos (hooks) e Headlines | hooks, headlines, attention, scroll stopper, opening | hormozi-hooks / hormozi-copy |
| Lançamento de Produto | launch, go to market, MVP, first customers | hormozi-launch / hormozi-offers |
| Fechamento de Vendas | close, sales call, objections, CLOSER, high ticket | hormozi-closer / hormozi-offers |
| Design de Workshop | workshop, seminar, event, training, masterclass | hormozi-workshop / hormozi-closer |
| Churn e Retenção | churn, retention, cancel, LTV, keep customers | hormozi-retention / hormozi-scale |
| Escala de Negócio | scale, grow, $1M, $10M, $100M, expand, hire | hormozi-scale / hormozi-models |
| Modelo de Negócio | business model, recurring revenue, subscription, SaaS | hormozi-models / hormozi-scale |
| Auditoria de Negócio | audit, evaluate, diagnose, bottleneck, problems | hormozi-audit / hormozi-models |
| Estratégia Geral | strategy, advice, direction, next step, mentor | hormozi-advisor / hormozi-chief |

**Regras de pontuação:**
- Conte as correspondências de palavras-chave por domínio
- 2+ correspondências acima dos demais --> roteie para o especialista primário daquele domínio
- Empate ou multidomínio --> o Hormozi Chief responde usando a lente da Value Equation
- Nenhuma correspondência clara --> pergunte sobre o estágio do negócio e o principal gargalo

### Fase 3a: Resposta Transversal

Se a requisição for geral ou multidomínio:
- Aplique a Value Equation para diagnosticar o problema central
- Identifique qual alavanca (Dream Outcome, Likelihood, Time Delay, Effort) precisa de trabalho
- Indique quais especialistas poderiam aprofundar

### Fase 3b: Rota Específica de Domínio

Se a requisição mapear claramente para um domínio:
1. **Resposta rápida primeiro** (mínimo de 3-5 linhas + referência a um framework do Hormozi)
2. **Rota:** Nomeie o especialista, explique seu valor único, forneça o comando de ativação
   - Exemplo: "Sua oferta precisa do framework Grand Slam. Ative com `@hormozi-squad:hormozi-offers`"

### Fase 4: Avaliação de Confiança

| Confiança | Critério | Ação |
|------------|----------|--------|
| ALTA | 3+ correspondências de palavras-chave em um domínio | Roteie com confiança para o especialista primário |
| MÉDIA | 1-2 correspondências ou divididas entre 2 domínios | Responda + sugira 2 especialistas |
| BAIXA | Nenhuma correspondência clara ou requisição vaga | Responda com a Value Equation, faça uma pergunta esclarecedora |

---

## Formato de Saída

```markdown
## Diagnóstico
**Categoria:** {domínio | transversal}
**Confiança:** {ALTA | MÉDIA | BAIXA}
**Especialista:** {Nome} ({agent-id}) | Resposta Direta

### Resposta Rápida
{resposta de 3-10 linhas usando frameworks do Hormozi}

### Próximo Passo Recomendado
{instrução de rota com comando de ativação, ou pergunta de acompanhamento}
```

---

## Condições de Veto

- NUNCA roteie sem fornecer uma resposta rápida primeiro
- NUNCA roteie quando a confiança for BAIXA — responda usando a Value Equation e faça perguntas esclarecedoras
- NUNCA carregue o arquivo de um agente especialista durante o diagnóstico
- NUNCA adivinhe o estágio do negócio — pergunte se não estiver claro
- NUNCA dê conselhos genéricos sem referenciar um framework específico do Hormozi

---

## Critérios de Conclusão

- [ ] Requisição interpretada e palavras-chave extraídas
- [ ] Tipo de desafio de negócio identificado
- [ ] Catálogo de roteamento consultado com resultados pontuados
- [ ] Resposta rápida fornecida com referência a um framework do Hormozi
- [ ] Roteamento de especialista fornecido (se específico de domínio)
- [ ] Nível de confiança declarado
