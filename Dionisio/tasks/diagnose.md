---
task: diagnose()
responsavel: "@movement-chief"
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
  - "[ ] Consulta interpretada com classificação de intenção e fase"
  - "[ ] Resposta rápida fornecida"
  - "[ ] Rota executada ou resposta direta dada"
---

# Tarefa: Diagnosticar — Squad de Movimentos

## Metadados

| Campo         | Valor                                              |
|---------------|----------------------------------------------------|
| ID da Tarefa  | `movement:diagnose`                                |
| Comando       | `@movement diagnose "{query}"`                     |
| Orquestrador  | `movement-chief`                                   |
| Propósito     | Interpretar o pedido do usuário, fornecer uma resposta rápida e rotear para o melhor agente especialista |

## Entradas

| Entrada      | Origem      | Obrigatório | Descrição                                |
|--------------|-------------|-------------|------------------------------------------|
| `query`      | Prompt do usuário | Sim   | A pergunta ou pedido do usuário          |
| `context`    | Sessão      | Não         | Contexto de conversa anterior            |
| `phase_hint` | Usuário/Auto | Não        | Fase de movimento sugerida (1-5)         |

## Pré-condições

- Configuração do squad carregada (`config/config.yaml`)
- Catálogo de roteamento disponível (`data/routing-catalog.yaml`)
- Existe pelo menos uma definição de agente especialista em `agents/`

## Fases

### Fase 1: Interpretar (movement-chief)

1. Leia a consulta do usuário e extraia:
   - **Intenção**: O que o usuário quer alcançar
   - **Palavras-chave de domínio**: Combine com as palavras-chave do catálogo de roteamento
   - **Fase de movimento**: Mapeie para uma das 5 fases (Faísca, Identidade, Ignição, Crescimento, Impacto)
   - **Complexidade**: Simples (resposta direta) vs Complexa (precisa de especialista)

2. Classifique o tipo de consulta:
   - `question` — Precisa de uma resposta informativa
   - `creation` — Precisa de um entregável (manifesto, framework de identidade, etc.)
   - `analysis` — Precisa de análise profunda (fenomenologia, medição de impacto)
   - `strategy` — Precisa de um plano ou roteiro

### Fase 2: Combinar o Roteamento

1. Carregue `data/routing-catalog.yaml`
2. Pontue cada domínio em relação às palavras-chave extraídas
3. Identifique:
   - **Agente primário**: Melhor combinação (maior sobreposição de palavras-chave)
   - **Agente secundário**: Perspectiva de reserva ou complementar
   - **Nível de confiança**: ALTO (>= 3 combinações de palavras-chave), MÉDIO (2 combinações), BAIXO (0-1 combinações)

4. Mapeamento de fase de movimento:
   | Fase               | Agente Primário        | Agente Secundário     |
   |--------------------|------------------------|-----------------------|
   | Faísca             | fenomenologo           | movement-architect    |
   | Identidade         | identitario            | manifestador          |
   | Ignição            | manifestador           | estrategista-de-ciclo |
   | Crescimento        | estrategista-de-ciclo  | analista-de-impacto   |
   | Impacto            | analista-de-impacto    | movement-chief        |

### Fase 3: Responder

1. **Sempre forneça uma resposta rápida primeiro** — 2-4 frases que abordam diretamente a consulta
2. Inclua:
   - Resposta direta à pergunta
   - A qual fase de movimento isso se relaciona
   - O que o especialista recomendado acrescentaria

### Fase 4: Rotear (se necessário)

1. Se a confiança for ALTA ou MÉDIA:
   - Anuncie o destino do roteamento: "Roteando para @{agent} para análise mais profunda"
   - Passe o contexto: consulta original + intenção interpretada + classificação de fase
2. Se a confiança for BAIXA:
   - NÃO roteie — responda diretamente como movement-chief
   - Ofereça ao usuário uma escolha de especialistas se a consulta for ambígua

## Formato de Saída

```yaml
diagnosis:
  query_summary: "{resumo em 1 linha}"
  intent: "{question|creation|analysis|strategy}"
  movement_phase: "{spark|identity|ignition|growth|impact}"
  quick_answer: |
    {resposta direta de 2-4 frases}
  routing:
    confidence: "{HIGH|MEDIUM|LOW}"
    primary_agent: "{agent-id}"
    secondary_agent: "{agent-id}"
    reason: "{por que este agente é a melhor combinação}"
  routed: {true|false}
```

## Regras de Veto

1. **NUNCA roteie sem fornecer uma resposta rápida primeiro** — O usuário precisa sempre obter valor imediato
2. **NUNCA roteie com confiança BAIXA** — Responda diretamente e ofereça escolhas em vez disso
3. **NUNCA roteie para mais de um agente simultaneamente** — Escolha a melhor combinação
4. **NUNCA pule a classificação de fase** — Toda consulta mapeia para uma fase de movimento
5. **NUNCA invente fases de movimento** — Use apenas as 5 fases definidas

## Critérios de Conclusão

- [ ] Consulta interpretada com classificação de intenção e fase
- [ ] Catálogo de roteamento consultado e confiança pontuada
- [ ] Resposta rápida fornecida (obrigatória, independentemente do roteamento)
- [ ] Rota executada se a confiança >= MÉDIA, ou resposta direta se BAIXA
- [ ] Formato de saída corresponde ao esquema acima
