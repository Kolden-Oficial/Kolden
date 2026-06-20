---
task: diagnoseDesignChallenge()
responsavel: "@design-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: user_message
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: routing_catalog
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: diagnosis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Intenção do usuário interpretada e categorizada"
  - "[ ] Resposta transversal entregue ao usuário"
  - "[ ] Nível de confiança avaliado"
---

# Tarefa: Diagnosticar & Rotear — Design Squad

## Metadados

| Campo         | Valor                                            |
|---------------|--------------------------------------------------|
| Task ID       | `design-squad:diagnose`                          |
| Comando       | `@design-squad` ou `@design-squad:design-chief`  |
| Orquestrador  | `design-chief`                                   |
| Versão        | 1.0.0                                            |
| Criado        | 2026-03-05                                       |

## Propósito

Analisar a pergunta de design do usuário, fornecer uma resposta transversal imediata
e determinar se é necessário rotear para um especialista. O chefe NUNCA carrega um arquivo
de agente especialista durante o diagnóstico — ele apenas identifica a melhor rota.

## Entradas

| Entrada          | Origem              | Obrigatório |
|------------------|---------------------|-------------|
| `user_message`   | Prompt do usuário   | SIM         |
| `routing_catalog` | `data/routing-catalog.yaml` | SIM |
| `config`         | `config/config.yaml` | SIM        |
| `conversation_history` | Contexto da sessão | NÃO        |

## Pré-condições

1. A mensagem do usuário não está vazia
2. O catálogo de roteamento está carregado e acessível

## Fases de Execução

### Fase 1: Interpretar a Solicitação

1. Extrair a pergunta ou intenção central da mensagem do usuário
2. Identificar palavras-chave, domínios de design e contexto técnico
3. Determinar o domínio de design: sistemas, operações, experiência ou produção
4. Determinar o padrão de colaboração, se aplicável:
   - Fluxo de criação de design system
   - Fluxo de design de nova funcionalidade
   - Fluxo de configuração de design ops

### Fase 2: Corresponder ao Catálogo de Roteamento

1. Carregar `data/routing-catalog.yaml`
2. Corresponder as palavras-chave extraídas às listas de palavras-chave de domínio
3. Pontuar cada domínio pela sobreposição de palavras-chave e relevância contextual
4. Identificar `primary_agent` e `secondary_agent` do domínio com maior pontuação
5. Se múltiplos domínios empatarem na pontuação, considerar o domínio de design para o desempate:
   - Perguntas de sistemas: preferir brad-frost
   - Perguntas de operações: preferir dave-malouf
   - Perguntas de experiência: preferir ux-designer
   - Perguntas de produção: preferir design-system-architect ou ui-engineer

### Fase 3: Resposta Transversal

**OBRIGATÓRIO — Sempre executar esta fase antes de qualquer roteamento.**

1. Fornecer uma resposta imediata e útil à pergunta do usuário
2. A resposta deve ser acionável e demonstrar competência no domínio de design
3. Incluir contexto relevante: metodologias, padrões ou princípios de design aplicáveis
4. Referenciar o framework ou a metodologia de design aplicável pelo nome
5. Esta resposta deve se sustentar sozinha — mesmo que o usuário nunca siga a sugestão de roteamento

### Fase 4: Avaliação de Confiança

Avaliar a confiança do roteamento:

| Nível  | Critério                                      | Ação                          |
|--------|-----------------------------------------------|-------------------------------|
| ALTA   | Correspondência clara de palavras-chave, domínio único, sem ambiguidade | Rotear para o especialista primário |
| MÉDIA  | Múltiplos domínios correspondem, leve ambiguidade | Sugerir primário + secundário |
| BAIXA  | Sem correspondência clara, solicitação vaga, multidomínio | Permanecer com o chefe, fazer perguntas de esclarecimento |

## Formato de Saída

```yaml
diagnosis:
  intent: "{intenção interpretada do usuário}"
  design_domain: "systems | operations | experience | production"
  matched_domain: "{domínio do catálogo de roteamento}"
  confidence: "HIGH | MEDIUM | LOW"
  primary_agent: "{agent-id}"
  secondary_agent: "{agent-id}"
  cross_cutting_answer: |
    {A resposta imediata fornecida ao usuário}
  routing_suggestion: |
    {Por que este especialista foi escolhido e o que ele pode agregar}
```

## Condições de Veto

- **NUNCA** rotear sem fornecer antes uma resposta transversal
- **NUNCA** rotear quando a confiança for BAIXA — permanecer com o chefe e fazer perguntas de esclarecimento
- **NUNCA** carregar um arquivo de agente especialista durante o diagnóstico — apenas identificar a rota
- **NUNCA** disparar um fluxo de colaboração multiespecialista durante o diagnóstico — um especialista de cada vez
- **NUNCA** recorrer ao brad-frost para toda pergunta — corresponder ao domínio de design real

## Critérios de Conclusão

- [x] Intenção do usuário interpretada e categorizada
- [x] Domínio de design identificado
- [x] Catálogo de roteamento consultado e domínio correspondido
- [x] Resposta transversal entregue ao usuário
- [x] Nível de confiança avaliado
- [x] Sugestão de roteamento fornecida (se a confiança for >= MÉDIA)
- [x] Nenhum arquivo de agente especialista carregado durante o diagnóstico
