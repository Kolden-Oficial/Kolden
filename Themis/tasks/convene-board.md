---
task: conveneBoard()
responsavel: "@board-chair"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: strategic_question
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true
  - campo: context
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true

Saida:
  - campo: board_meeting
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] 3-5 conselheiros relevantes consultados com seus frameworks"
  - "[ ] Síntese identifica concordância, discordância e tensões"
  - "[ ] Recomendação unificada com visões dissidentes incluídas"
---

# Task: Reunião Completa do Conselho

**Task ID:** BOARD-001
**Versão:** 1.0.0
**Comando:** `*convene-board`
**Agente:** Board Chair (board-chair)
**Propósito:** Convocar uma sessão completa do conselho consultivo sobre uma questão estratégica, sintetizando múltiplas perspectivas de conselheiros.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `strategic_question` | Prompt do usuário | SIM |
| `context` | Situação de negócio, dados, restrições | SIM |
| `advisors_requested` | Conselheiros específicos a incluir | NÃO (padrão: os 3-5 mais relevantes) |
| `decision_urgency` | Prazo para a decisão | NÃO |
| `previous_decisions` | Decisões passadas relacionadas | NÃO |

## Pré-condições

1. A questão estratégica está claramente formulada
2. Contexto suficiente fornecido para que os conselheiros formem opiniões significativas
3. Ao menos 3 conselheiros são relevantes para o domínio da questão

## Fases de Execução

### Fase 1: Formular a Questão (board-chair)

1. Reafirmar a questão estratégica em termos precisos
2. Identificar o tipo de decisão: investimento, escala, cultura, contratação, produto, pivô, saída
3. Mapear as dimensões da decisão: financeira, operacional, cultural, estratégica, ética
4. Determinar quais 3-5 conselheiros são mais relevantes com base nos domínios de expertise
5. Definir as restrições — tempo, recursos, apetite por risco, valores
6. Formular a questão para cada conselheiro na sua linguagem e framework
7. Definir a pauta — ordem de consulta com base no fluxo lógico

### Fase 2: Coletar Perspectivas (roteada para 3-5 conselheiros)

Para cada conselheiro selecionado, solicitar sua perspectiva:

1. **Ray Dalio** — Análise baseada em princípios, avaliação sistemática de risco, lente de transparência radical
2. **Charlie Munger** — Aplicação de modelos mentais, pensamento por inversão, o que pode dar errado
3. **Peter Thiel** — Pensamento zero-to-one, perspectiva contrária, potencial de monopólio
4. **Reid Hoffman** — Efeitos de rede, lente de blitzscaling, estratégia de alianças
5. **Naval Ravikant** — Análise de alavancagem, aplicação de conhecimento específico, pensamento de longo prazo
6. **Simon Sinek** — Alinhamento com o propósito, perspectiva do jogo infinito, o porquê por trás da decisão
7. **Brené Brown** — Avaliação de coragem, vulnerabilidade na liderança, implicações de confiança
8. **Patrick Lencioni** — Impacto na saúde do time, riscos de disfunção organizacional
9. **Derek Sivers** — Simplicidade contrária, teste do "hell yeah or no", lente minimalista
10. **Yvon Chouinard** — Alinhamento com a missão, impacto ambiental/ético, sustentabilidade de longo prazo

Cada conselheiro fornece:
- Sua análise através do seu framework específico
- Os principais riscos que enxerga
- Sua recomendação
- Nível de confiança (alto/médio/baixo)

### Fase 3: Sintetizar Perspectivas (board-chair)

1. Identificar áreas de concordância — onde os conselheiros convergem?
2. Identificar áreas de discordância — onde divergem e por quê?
3. Mapear as tensões — quais discordâncias representam tradeoffs genuínos versus pressupostos diferentes?
4. Ponderar perspectivas pela relevância — qual expertise importa mais para ESTA questão?
5. Identificar pontos cegos — o que nenhum conselheiro abordou?
6. Buscar o "e" — visões aparentemente opostas podem ser conciliadas?

### Fase 4: Apresentar Recomendação Unificada (board-chair)

1. Declarar a recomendação sintetizada com clareza
2. Explicar o raciocínio — quais perspectivas de conselheiros mais a moldaram e por quê
3. Reconhecer visões dissidentes — quais argumentos fortes existem contra a recomendação
4. Definir o perfil de risco — o que pode dar errado e estratégias de mitigação
5. Fornecer critérios de decisão — o que mudaria a recomendação
6. Oferecer a verificação contrária — o argumento mais forte contra a recomendação
7. Definir os próximos passos — ações específicas caso a recomendação seja adotada

## Formato de Saída

```yaml
board_meeting:
  chair: "board-chair"
  question: "{questão estratégica}"
  advisors_consulted: ["{lista de conselheiros}"]
  perspectives:
    - advisor: "{nome}"
      framework: "{a lente dele}"
      analysis: "{a perspectiva dele}"
      recommendation: "{o conselho dele}"
      confidence: "HIGH | MEDIUM | LOW"
      key_risk: "{maior preocupação}"
  synthesis:
    areas_of_agreement: ["{pontos de convergência}"]
    areas_of_disagreement: ["{pontos de divergência}"]
    key_tensions: ["{tradeoffs genuínos}"]
    blind_spots: ["{áreas não abordadas}"]
  recommendation:
    action: "{o que fazer}"
    reasoning: "{por quê}"
    dissenting_views: ["{contra-argumentos fortes}"]
    risk_profile: "{o que pode dar errado}"
    contrarian_check: "{argumento mais forte contra}"
    next_steps: ["{ações específicas}"]
```

## Condições de Veto

- **NUNCA** apresente uma recomendação sem reconhecer visões dissidentes
- **NUNCA** consulte menos de 3 conselheiros em uma questão estratégica
- **NUNCA** deixe a voz de um conselheiro dominar sem justificativa explícita
- **NUNCA** pule a verificação contrária — toda recomendação precisa de um advogado do diabo
- **NUNCA** apresente concordância unânime sem questionar se há pensamento de grupo (groupthink)

## Critérios de Conclusão

- [ ] Questão formulada com precisão e restrições definidas
- [ ] 3-5 conselheiros relevantes consultados com seus frameworks específicos
- [ ] Perspectiva de cada conselheiro documentada com nível de confiança
- [ ] Síntese identifica concordância, discordância e tensões
- [ ] Recomendação unificada com raciocínio claro
- [ ] Visões dissidentes e verificação contrária incluídas
- [ ] Próximos passos definidos para a implementação
