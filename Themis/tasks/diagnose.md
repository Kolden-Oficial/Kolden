---
task: diagnoseAdvisoryBoard()
responsavel: "@board-chair"
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

# Task: Diagnosticar e Rotear — Squad do Conselho Consultivo

## Metadados

| Campo         | Valor                                            |
|---------------|--------------------------------------------------|
| Task ID       | `advisory-board:diagnose`                        |
| Comando       | `@advisory-board` ou `@advisory-board:board-chair` |
| Orquestrador  | `board-chair`                                    |
| Versão        | 1.0.0                                            |
| Criado        | 2026-03-05                                       |

## Propósito

Analisar a questão estratégica do usuário, fornecer uma resposta transversal imediata
e determinar se o roteamento para um especialista é necessário. O chair NUNCA carrega um
arquivo de agente conselheiro durante o diagnóstico — ele apenas identifica a melhor rota.

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

1. Extrair a questão ou intenção central da mensagem do usuário
2. Identificar palavras-chave, domínios consultivos e contexto estratégico
3. Determinar o domínio consultivo: financeiro, empreendedor, organizacional ou filosófico
4. Determinar o estilo de decisão necessário: quantitativo/sistemático, baseado em modelos mentais, de primeiros princípios, estratégico de rede, orientado a propósito, baseado em coragem, baseado em saúde do time, ou minimalista-contrário

### Fase 2: Combinar com o Catálogo de Roteamento

1. Carregar `data/routing-catalog.yaml`
2. Combinar as palavras-chave extraídas com as listas de palavras-chave de domínio
3. Pontuar cada domínio por sobreposição de palavras-chave e relevância contextual
4. Identificar o `primary_agent` e o `secondary_agent` para o domínio de maior pontuação
5. Se múltiplos domínios pontuarem igualmente, considerar o estilo de decisão para desempatar:
   - Decisões quantitativas: preferir ray-dalio
   - Questões de modelos mentais: preferir charlie-munger
   - Problemas de primeiros princípios: preferir peter-thiel, naval-ravikant
   - Rede/escala: preferir reid-hoffman
   - Propósito/cultura: preferir simon-sinek, brene-brown
   - Dinâmica de time: preferir patrick-lencioni

### Fase 3: Resposta Transversal

**OBRIGATÓRIO — Sempre execute esta fase antes de qualquer roteamento.**

1. Fornecer uma resposta imediata e útil à questão do usuário
2. A resposta deve ser acionável e demonstrar competência consultiva estratégica
3. Incluir contexto relevante: frameworks, princípios ou modelos mentais aplicáveis
4. Referenciar pelo nome a perspectiva consultiva aplicável
5. Esta resposta deve ser autossuficiente — mesmo que o usuário nunca siga a sugestão de roteamento

### Fase 4: Avaliação de Confiança

Avaliar a confiança no roteamento:

| Nível  | Critérios                                      | Ação                        |
|--------|-----------------------------------------------|-------------------------------|
| HIGH   | Correspondência clara de palavras-chave, domínio único, sem ambiguidade | Rotear ao conselheiro primário     |
| MEDIUM | Múltiplos domínios correspondem, leve ambiguidade       | Sugerir primário + secundário   |
| LOW    | Sem correspondência clara, solicitação vaga, transversal a domínios    | Permanecer com o chair, fazer perguntas de esclarecimento |

## Formato de Saída

```yaml
diagnosis:
  intent: "{intenção do usuário interpretada}"
  advisory_domain: "financial | entrepreneurial | organizational | philosophical"
  decision_style: "{estilo de decisão identificado}"
  matched_domain: "{domínio do catálogo de roteamento}"
  confidence: "HIGH | MEDIUM | LOW"
  primary_agent: "{agent-id}"
  secondary_agent: "{agent-id}"
  cross_cutting_answer: |
    {A resposta imediata fornecida ao usuário}
  routing_suggestion: |
    {Por que este conselheiro foi escolhido e o que ele pode acrescentar}
```

## Condições de Veto

- **NUNCA** roteie sem antes fornecer uma resposta transversal
- **NUNCA** roteie quando a confiança for LOW — permaneça com o chair e faça perguntas de esclarecimento
- **NUNCA** carregue um arquivo de agente conselheiro durante o diagnóstico — apenas identifique a rota
- **NUNCA** convoque uma reunião completa do conselho durante o diagnóstico — roteie para um conselheiro de cada vez
- **NUNCA** recorra por padrão ao mesmo conselheiro para toda questão — combine com o domínio real

## Critérios de Conclusão

- [x] Intenção do usuário interpretada e categorizada
- [x] Domínio consultivo e estilo de decisão identificados
- [x] Catálogo de roteamento consultado e domínio combinado
- [x] Resposta transversal entregue ao usuário
- [x] Nível de confiança avaliado
- [x] Sugestão de roteamento fornecida (se confiança >= MEDIUM)
- [x] Nenhum arquivo de agente conselheiro carregado durante o diagnóstico
