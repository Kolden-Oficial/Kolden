---
task: diagnoseStorytelling()
responsavel: "@story-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: user_message
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true
  - campo: routing_catalog
    tipo: string
    origem: data/routing-catalog.yaml
    obrigatorio: true

Saida:
  - campo: diagnosis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Intenção do usuário interpretada e categorizada"
  - "[ ] Resposta transversal entregue ao usuário"
  - "[ ] Sugestão de roteamento fornecida"
---

# Tarefa: Diagnosticar e Rotear — Squad de Storytelling

## Metadados

| Campo         | Valor                                          |
|---------------|------------------------------------------------|
| ID da Tarefa  | `storytelling:diagnose`                        |
| Comando       | `@storytelling` ou `@storytelling:story-chief` |
| Orquestrador  | `story-chief`                                  |
| Versão        | 1.0.0                                          |
| Criada em     | 2026-03-05                                     |

## Propósito

Analisar a pergunta de storytelling ou narrativa do usuário, fornecer uma resposta transversal
imediata e determinar se o roteamento para um especialista é necessário. O chefe NUNCA carrega um
arquivo de agente especialista durante o diagnóstico — ele apenas identifica a melhor rota.

## Entradas

| Entrada          | Origem              | Obrigatório |
|------------------|---------------------|----------|
| `user_message`   | Prompt do usuário   | SIM      |
| `routing_catalog` | `data/routing-catalog.yaml` | SIM |
| `config`         | `config/config.yaml` | SIM     |
| `conversation_history` | Contexto da sessão | NÃO       |

## Pré-condições

1. A mensagem do usuário não está vazia
2. O catálogo de roteamento está carregado e acessível

## Fases de Execução

### Fase 1: Interpretar a Solicitação

1. Extrair a pergunta ou intenção central da mensagem do usuário
2. Identificar palavras-chave, domínios narrativos e contexto de storytelling
3. Determinar a escala da história: micro (anedota, post), meso (apresentação, episódio), macro (roteiro, romance) ou meta (movimento, cultural)
4. Determinar o domínio narrativo: mítico, estrutural, pessoal, de negócios, performático ou de movimento

### Fase 2: Comparar com o Catálogo de Roteamento

1. Carregar `data/routing-catalog.yaml`
2. Comparar as palavras-chave extraídas com as listas de palavras-chave dos domínios
3. Pontuar cada domínio pela sobreposição de palavras-chave e relevância contextual
4. Identificar o `primary_agent` e o `secondary_agent` para o domínio de maior pontuação
5. Se múltiplos domínios pontuarem igualmente, considerar a escala da história para desempatar:
   - Escala micro: preferir matthew-dicks, kindra-hall, park-howell
   - Escala meso: preferir nancy-duarte, oren-klaff, dan-harmon, blake-snyder
   - Escala macro: preferir blake-snyder, shawn-coyne, joseph-campbell
   - Escala meta: preferir marshall-ganz, joseph-campbell

### Fase 3: Resposta Transversal

**OBRIGATÓRIO — Sempre execute esta fase antes de qualquer roteamento.**

1. Fornecer uma resposta imediata e útil à pergunta do usuário
2. A resposta deve ser acionável e demonstrar competência no domínio narrativo
3. Incluir contexto relevante: frameworks mencionados, orientação rápida de storytelling
4. Referenciar pelo nome o princípio ou framework narrativo aplicável
5. Esta resposta deve se sustentar sozinha — mesmo que o usuário nunca siga a sugestão de roteamento

### Fase 4: Avaliação de Confiança

Avaliar a confiança do roteamento:

| Nível  | Critérios                                      | Ação                          |
|--------|-----------------------------------------------|-------------------------------|
| ALTA   | Correspondência clara de palavras-chave, domínio único, sem ambiguidade | Rotear para o agente primário       |
| MÉDIA  | Múltiplos domínios correspondem, ligeira ambiguidade       | Sugerir primário + secundário   |
| BAIXA  | Sem correspondência clara, solicitação vaga, transversal a domínios    | Permanecer com o chefe, fazer perguntas esclarecedoras |

## Formato de Saída

```yaml
diagnosis:
  intent: "{intenção do usuário interpretada}"
  narrative_domain: "mythic | structural | personal | business | performative | movement"
  story_scale: "micro | meso | macro | meta"
  matched_domain: "{domínio do catálogo de roteamento}"
  confidence: "HIGH | MEDIUM | LOW"
  primary_agent: "{agent-id}"
  secondary_agent: "{agent-id}"
  cross_cutting_answer: |
    {A resposta imediata fornecida ao usuário}
  routing_suggestion: |
    {Por que este especialista foi escolhido e o que ele pode acrescentar}
```

## Condições de Veto

- **NUNCA** rotear sem antes fornecer uma resposta transversal
- **NUNCA** rotear quando a confiança for BAIXA — permaneça com o chefe e faça perguntas esclarecedoras
- **NUNCA** carregar um arquivo de agente especialista durante o diagnóstico — apenas identifique a rota
- **NUNCA** recomendar um fluxo com múltiplos especialistas durante o diagnóstico — um especialista por vez
- **NUNCA** recorrer ao joseph-campbell por padrão para toda pergunta — corresponda ao domínio real

## Critérios de Conclusão

- [x] Intenção do usuário interpretada e categorizada
- [x] Domínio narrativo e escala da história identificados
- [x] Catálogo de roteamento consultado e domínio correspondido
- [x] Resposta transversal entregue ao usuário
- [x] Nível de confiança avaliado
- [x] Sugestão de roteamento fornecida (se a confiança >= MÉDIA)
- [x] Nenhum arquivo de agente especialista carregado durante o diagnóstico
