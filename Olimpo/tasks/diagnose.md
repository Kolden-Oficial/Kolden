---
task: diagnose()
responsavel: "@zeus"
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
  - "[ ] Consulta interpretada com intenção e função de negócio"
  - "[ ] Resposta rápida fornecida"
  - "[ ] Roteamento executado ou resposta direta dada"
---

# Tarefa: Diagnosticar — Squad C-Level

## Metadados

| Campo         | Valor                                              |
|---------------|----------------------------------------------------|
| ID da Tarefa  | `c-level:diagnose`                                 |
| Comando       | `@c-level diagnose "{query}"`                      |
| Orquestrador  | `zeus`                                     |
| Propósito     | Interpretar a solicitação do usuário, fornecer uma resposta rápida e rotear para o melhor executivo da C-suite |

## Entradas

| Entrada      | Origem      | Obrigatório | Descrição                                |
|--------------|-------------|-------------|------------------------------------------|
| `query`      | Prompt do usuário | Sim   | A pergunta ou solicitação do usuário     |
| `context`    | Sessão      | Não         | Contexto da conversa anterior            |
| `role_hint`  | Usuário/Auto | Não        | Papel C-level sugerido (CEO, COO, etc.)  |

## Pré-condições

- Config do squad carregada (`config/config.yaml`)
- Catálogo de roteamento disponível (`data/routing-catalog.yaml`)
- Existe ao menos uma definição de agente especialista em `agents/`

## Fases

### Fase 1: Interpretar (zeus)

1. Leia a consulta do usuário e extraia:
   - **Intenção**: O que o usuário quer realizar
   - **Palavras-chave de domínio**: Combine com as palavras-chave do catálogo de roteamento
   - **Função de negócio**: Qual domínio da C-suite (visão, operações, marketing, tecnologia, infra, IA)
   - **Complexidade**: Simples (resposta direta) vs Complexa (precisa de especialista)

2. Classifique o tipo de consulta:
   - `question` — Precisa de uma resposta informativa
   - `strategy` — Precisa de um plano estratégico ou direção
   - `decision` — Precisa de um framework de decisão em nível executivo
   - `assessment` — Precisa de avaliação do estado atual
   - `transformation` — Precisa de plano de gestão de mudanças ou transformação digital

### Fase 2: Combinar Roteamento

1. Carregue `data/routing-catalog.yaml`
2. Pontue cada domínio em relação às palavras-chave extraídas
3. Identifique:
   - **Agente primário**: Melhor correspondência (maior sobreposição de palavras-chave)
   - **Agente secundário**: Perspectiva de backup ou complementar
   - **Nível de confiança**: ALTA (>= 3 correspondências de palavras-chave), MÉDIA (2 correspondências), BAIXA (0-1 correspondências)

4. Guia de roteamento executivo:
   | Área do Problema            | Agente Primário  | Agente Secundário |
   |-----------------------------|------------------|-------------------|
   | Visão/estratégia/captação   | zeus     | poseidon  |
   | Operações/escala/processo   | poseidon | zeus      |
   | Marketing/marca/GTM         | apolo    | zeus      |
   | Tecnologia/arquitetura      | hefesto    | hades      |
   | Infraestrutura/segurança    | hades     | hefesto     |
   | IA/ML/transformação digital | atena   | hefesto     |

### Fase 3: Responder

1. **Sempre forneça uma resposta rápida primeiro** — 2-4 frases que abordem diretamente a consulta
2. Inclua:
   - Resposta direta à pergunta sob a perspectiva de um CEO
   - Qual papel executivo é mais relevante
   - Que profundidade estratégica o especialista adicionaria

### Fase 4: Rotear (se necessário)

1. Se a confiança for ALTA ou MÉDIA:
   - Anuncie o alvo do roteamento: "Roteando para @{agent} para aconselhamento executivo"
   - Passe o contexto: consulta original + intenção interpretada + função de negócio
2. Se a confiança for BAIXA:
   - NÃO roteie — responda diretamente como zeus
   - Ofereça ao usuário uma escolha de executivos se a consulta abranger múltiplos domínios

## Formato de Saída

```yaml
diagnosis:
  query_summary: "{resumo em 1 linha}"
  intent: "{question|strategy|decision|assessment|transformation}"
  business_function: "{vision|operations|marketing|technology|infrastructure|ai}"
  quick_answer: |
    {resposta direta de 2-4 frases}
  routing:
    confidence: "{HIGH|MEDIUM|LOW}"
    primary_agent: "{agent-id}"
    secondary_agent: "{agent-id}"
    reason: "{por que este executivo é a melhor correspondência}"
  routed: {true|false}
```

## Regras de Veto

1. **NUNCA roteie sem fornecer uma resposta rápida primeiro** — O usuário deve sempre obter valor imediato
2. **NUNCA roteie com confiança BAIXA** — Responda diretamente e ofereça opções em vez disso
3. **NUNCA roteie para mais de um agente simultaneamente** — Escolha o melhor executivo
4. **NUNCA dê conselho tático sem enquadramento estratégico** — Sempre conecte a resultados de negócio
5. **NUNCA faça promessas sobre resultados financeiros específicos** — Forneça frameworks, não garantias

## Critérios de Conclusão

- [ ] Consulta interpretada com classificação de intenção e função de negócio
- [ ] Catálogo de roteamento consultado e confiança pontuada
- [ ] Resposta rápida fornecida (obrigatória, independente do roteamento)
- [ ] Roteamento executado se confiança >= MÉDIA, ou resposta direta se BAIXA
- [ ] O formato de saída corresponde ao schema acima
