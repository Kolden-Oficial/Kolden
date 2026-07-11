---
task: diagnose()
responsavel: "@data-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: query
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: diagnosis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Query analisada com classificação de intenção e domínio"
  - "[ ] Resposta rápida fornecida"
  - "[ ] Rota executada ou resposta direta dada"
tipo: nota
area: Metis
up: "[[Metis/_MOC-metis]]"
relacionado:
  - "[[Metis/tasks/_indice|_indice]]"
---

# Tarefa: Diagnosticar — Data Squad

## Metadados

| Campo         | Valor                                              |
|---------------|----------------------------------------------------|
| Task ID       | `data-squad:diagnose`                              |
| Comando       | `@data-squad diagnose "{query}"`                   |
| Orquestrador  | `data-chief`                                       |
| Propósito     | Analisar a solicitação do usuário, fornecer uma resposta rápida e rotear para o melhor especialista em dados |

## Entradas

| Entrada      | Origem       | Obrigatório | Descrição                                |
|--------------|-------------|-------------|------------------------------------------|
| `query`      | Prompt do usuário | Sim    | A pergunta ou solicitação do usuário     |
| `context`    | Sessão      | Não         | Contexto da conversa anterior            |
| `domain_hint`| Usuário/Auto| Não         | Domínio sugerido (analytics, growth, etc.) |

## Pré-condições

- Configuração do squad carregada (`config/config.yaml`)
- Catálogo de roteamento disponível (`data/routing-catalog.yaml`)
- Pelo menos uma definição de agente especialista existe em `agents/`

## Fases

### Fase 1: Analisar (data-chief)

1. Leia a query do usuário e extraia:
   - **Intenção**: O que o usuário quer alcançar
   - **Palavras-chave de domínio**: Faça a correspondência com as palavras-chave do catálogo de roteamento
   - **Maturidade de dados**: Onde o usuário está (sem dados, analytics básico, avançado)
   - **Complexidade**: Simples (resposta direta) vs Complexa (precisa de especialista)

2. Classifique o tipo da query:
   - `question` — Precisa de uma resposta informativa
   - `analysis` — Precisa de análise ou interpretação de dados
   - `strategy` — Precisa de um plano de crescimento/retenção/comunidade
   - `framework` — Precisa que o framework de um especialista específico seja aplicado
   - `troubleshoot` — Precisa diagnosticar um problema de métrica

### Fase 2: Corresponder Roteamento

1. Carregue `data/routing-catalog.yaml`
2. Pontue cada domínio em relação às palavras-chave extraídas
3. Identifique:
   - **Agente primário**: Melhor correspondência (maior sobreposição de palavras-chave)
   - **Agente secundário**: Reserva ou perspectiva complementar
   - **Nível de confiança**: HIGH (>= 3 correspondências de palavras-chave), MEDIUM (2 correspondências), LOW (0-1 correspondências)

4. Guia de seleção de especialista:
   | Área do Problema          | Agente Primário   | Agente Secundário|
   |---------------------------|-------------------|------------------|
   | Analytics de web/marketing| avinash-kaushik   | sean-ellis       |
   | Valor/segmentação de cliente | peter-fader    | nick-mehta       |
   | Crescimento/aquisição     | sean-ellis        | avinash-kaushik  |
   | Audiência/conteúdo        | wes-kao           | david-spinks     |
   | Retenção/churn            | nick-mehta        | peter-fader      |
   | Comunidade                | david-spinks      | nick-mehta       |

### Fase 3: Responder

1. **Sempre forneça uma resposta rápida primeiro** — 2-4 frases que abordam diretamente a query
2. Inclua:
   - Resposta direta à pergunta
   - Qual framework de especialista é mais relevante
   - Que valor mais profundo o especialista forneceria

### Fase 4: Rotear (se necessário)

1. Se a confiança for HIGH ou MEDIUM:
   - Anuncie o alvo do roteamento: "Roteando para @{agent} para análise mais profunda"
   - Passe o contexto: query original + intenção analisada + classificação de domínio
2. Se a confiança for LOW:
   - NÃO roteie — responda diretamente como data-chief
   - Ofereça ao usuário uma escolha de especialistas se a query for ambígua

## Formato de Saída

```yaml
diagnosis:
  query_summary: "{resumo de 1 linha}"
  intent: "{question|analysis|strategy|framework|troubleshoot}"
  domain: "{analytics|clv|growth|audience|community|retention}"
  quick_answer: |
    {resposta direta de 2-4 frases}
  routing:
    confidence: "{HIGH|MEDIUM|LOW}"
    primary_agent: "{agent-id}"
    secondary_agent: "{agent-id}"
    reason: "{por que este especialista é a melhor correspondência}"
  routed: {true|false}
```

## Regras de Veto

1. **NUNCA roteie sem fornecer uma resposta rápida primeiro** — O usuário deve sempre obter valor imediato
2. **NUNCA roteie com confiança LOW** — Responda diretamente e ofereça escolhas em vez disso
3. **NUNCA roteie para mais de um agente simultaneamente** — Escolha o melhor especialista
4. **NUNCA recomende um framework sem nomear o especialista** — A atribuição importa
5. **NUNCA adivinhe dados que o usuário não forneceu** — Peça especificidades primeiro

## Critérios de Conclusão

- [ ] Query analisada com classificação de intenção e domínio
- [ ] Catálogo de roteamento consultado e confiança pontuada
- [ ] Resposta rápida fornecida (obrigatória, independentemente do roteamento)
- [ ] Rota executada se confiança >= MEDIUM, ou resposta direta se LOW
- [ ] Formato de saída corresponde ao schema acima
