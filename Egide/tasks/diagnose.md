---
task: diagnoseCybersecurity()
responsavel: "@cyber-chief"
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
    origem: data/routing-catalog.yaml
    obrigatorio: true

Saida:
  - campo: diagnosis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Intenção do usuário interpretada e portão ético avaliado"
  - "[ ] Resposta transversal entregue ao usuário"
  - "[ ] Sugestão de roteamento fornecida"
---

# Tarefa: Diagnosticar & Rotear — Squad de Cybersecurity

## Metadados

| Campo         | Valor                                          |
|---------------|------------------------------------------------|
| ID da Tarefa  | `cybersecurity:diagnose`                       |
| Comando       | `@cybersecurity` ou `@cybersecurity:cyber-chief` |
| Orquestrador  | `cyber-chief`                                  |
| Versão        | 1.0.0                                          |
| Criada        | 2026-03-05                                     |

## Propósito

Analisar a pergunta de cibersegurança do usuário, fornecer uma resposta transversal imediata
e determinar se o roteamento para especialista é necessário. O chefe NUNCA carrega um arquivo
de agente especialista durante o diagnóstico — ele apenas identifica a melhor rota.

## Entradas

| Entrada          | Origem              | Obrigatória |
|------------------|---------------------|----------|
| `user_message`   | Prompt do usuário   | SIM      |
| `routing_catalog` | `data/routing-catalog.yaml` | SIM |
| `config`         | `config/config.yaml` | SIM     |
| `conversation_history` | Contexto de sessão | NÃO       |

## Pré-condições

1. A mensagem do usuário não está vazia
2. O catálogo de roteamento está carregado e acessível
3. O contexto de autorização ética é considerado para todas as solicitações ofensivas

## Fases de Execução

### Fase 1: Interpretar a Solicitação

1. Extraia a pergunta ou intenção central da mensagem do usuário
2. Identifique palavras-chave, domínios de segurança e contexto técnico
3. Determine a categoria da solicitação: ofensiva, defensiva, operacional, estratégica ou educacional
4. **PORTÃO ÉTICO:** Se a solicitação envolver operações ofensivas, verifique:
   - Isto é para um pentest autorizado, CTF ou contexto educacional?
   - Se não estiver claro, PERGUNTE pelo contexto de autorização antes de prosseguir
   - Se houver intenção claramente maliciosa, RECUSE com explicação

### Fase 2: Combinar com o Catálogo de Roteamento

1. Carregue `data/routing-catalog.yaml`
2. Combine as palavras-chave extraídas com as listas de palavras-chave por domínio
3. Pontue cada domínio pela sobreposição de palavras-chave e relevância contextual
4. Identifique o `primary_agent` e o `secondary_agent` para o domínio de maior pontuação
5. Se múltiplos domínios pontuarem igualmente, prefira o mais próximo da intenção explícita do usuário

### Fase 3: Resposta Transversal

**OBRIGATÓRIO — Sempre execute esta fase antes de qualquer roteamento.**

1. Forneça uma resposta imediata e útil à pergunta do usuário
2. A resposta deve ser acionável e demonstrar competência no domínio
3. Inclua contexto relevante: conceitos, orientação rápida, melhores práticas
4. Para solicitações ofensivas: inclua lembretes éticos e limites de escopo
5. Esta resposta precisa se sustentar sozinha — mesmo que o usuário nunca siga a sugestão de roteamento

### Fase 4: Avaliação de Confiança

Avalie a confiança no roteamento:

| Nível  | Critério                                      | Ação                        |
|--------|-----------------------------------------------|-------------------------------|
| ALTA   | Correspondência clara de palavras-chave, domínio único, inequívoca | Rotear para o agente primário |
| MÉDIA  | Múltiplos domínios correspondem, leve ambiguidade | Sugerir primário + secundário |
| BAIXA  | Sem correspondência clara, solicitação vaga, multidomínio | Ficar com o chefe, fazer perguntas de esclarecimento |

## Formato de Saída

```yaml
diagnosis:
  intent: "{intenção do usuário interpretada}"
  category: "offensive | defensive | operational | strategic | educational"
  ethical_clearance: "cleared | needs_authorization | refused"
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

- **NUNCA** roteie sem fornecer primeiro uma resposta transversal
- **NUNCA** roteie quando a confiança for BAIXA — fique com o chefe e faça perguntas de esclarecimento
- **NUNCA** carregue um arquivo de agente especialista durante o diagnóstico — apenas identifique a rota
- **NUNCA** forneça orientação ofensiva sem contexto de autorização ética
- **NUNCA** auxilie com operações explicitamente maliciosas, não autorizadas ou destrutivas
- **NUNCA** roteie agentes de ferramenta (tier 2) diretamente sem confirmar o contexto operacional

## Critérios de Conclusão

- [x] Intenção do usuário interpretada e categorizada
- [x] Portão ético avaliado (para solicitações ofensivas)
- [x] Catálogo de roteamento consultado e domínio correspondido
- [x] Resposta transversal entregue ao usuário
- [x] Nível de confiança avaliado
- [x] Sugestão de roteamento fornecida (se a confiança for >= MÉDIA)
- [x] Nenhum arquivo de agente especialista carregado durante o diagnóstico
