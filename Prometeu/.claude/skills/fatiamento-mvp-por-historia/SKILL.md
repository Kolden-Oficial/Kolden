---
name: fatiamento-mvp-por-historia
description: Use ao escrever a spec ou ao decompor uma feature grande, quando precisar transformar requisitos em user stories priorizadas (P1/P2/P3) que sejam fatias independentemente testáveis de MVP — cada uma desenvolvível, testável, deployável e demonstrável sozinha. Acione também quando uma única story está grande demais para uma fase e precisa ser quebrada por um eixo (SPIDR), não por camada técnica.
---

# Fatiamento de MVP por História

Disciplina para que a spec não seja um bloco monolítico de requisitos, mas um conjunto de
**user stories priorizadas**, cada uma uma **fatia vertical de valor**. A regra central:
se você implementar **apenas a P1**, ainda tem um MVP viável que entrega valor. Cada story
precisa ser, isoladamente: desenvolvível, testável, deployável e demonstrável.

Isso enriquece a decomposição do pipeline do Prometeu (que ordena tarefas por dependência,
mas não formaliza a fatia de MVP por história nem o critério de fatiamento por eixo).

## Anatomia de uma user story na spec

```markdown
### User Story 1 — [título breve] (Prioridade: P1)

[Jornada do usuário em linguagem clara]

**Por que esta prioridade**: [valor e razão de ser P1]
**Teste independente**: [como testar isolada — "pode ser testada por <ação> e entrega <valor>"]

**Cenários de aceite**:
1. **Dado** [estado inicial], **Quando** [ação], **Então** [resultado esperado]
```

- **P1** = a fatia mais crítica = o MVP mínimo. **P2/P3** = incrementos, cada um também testável sozinho.
- Requisitos funcionais recebem ID `FR-###`; critérios de sucesso mensuráveis recebem `SC-###`.
- Requisito incerto vira marcador inline `[NEEDS CLARIFICATION: <o que falta>]` — gancho para a habilidade `clarificacao-de-ambiguidade`.

## Quando uma story é grande demais: SPIDR

Dispare o fatiamento SPIDR se **qualquer** sinal de tamanho disparar:
- **Capacidades compostas** — duas ou mais ações independentes ligadas por "e" (cada "e" é um ponto de corte candidato).
- **Multi-ator** — mais de um papel de usuário citado.
- **Comprimento** — a story passa de ~120 caracteres numa linha.
- **Capacidade vaga** — é um substantivo, não um par verbo-objeto ("usar o dashboard" → qual interação?).

Se nenhum disparar, **não fatie** — siga para a escrita da story.

### Os cinco eixos SPIDR (aplique só UM por corte)

| Eixo | Pergunta | Como fatiar |
|---|---|---|
| **Spike** | Há um desconhecido que exige pesquisa antes de implementar? | O spike vira fase própria (aceite = "sabemos o bastante para planejar o resto"). |
| **Paths** | Há caminho feliz + caminho(s) de erro/edge? | Caminho feliz primeiro (prova a fatia); edge cases progressivamente. |
| **Interfaces** | Precisa rodar em mais de uma interface (web, mobile, API, CLI)? | Web primeiro se voltado ao usuário; API primeiro se integração; mobile por último (salvo se for a plataforma principal). |
| **Data** | Toca múltiplos escopos de dados (1 usuário vs. muitos, mono vs. multi-tenant)? | Menor escopo primeiro, depois expande. |
| **Rules** | Tem múltiplas regras de negócio incrementáveis (validação básica → política complexa)? | Regras mínimas viáveis primeiro; política complexa em follow-ups. |

### Fluxo
1. Restitua a story original ao usuário (sempre mostre antes de propor corte).
2. Pergunte "Qual eixo SPIDR encaixa melhor?" com as 5 opções.
3. Caminhe pelo eixo escolhido com **uma** pergunta focada e produza a proposta: "Fase N (esta): X. Fase N+1: Y. Fase N+2: Z."
4. Confirme. Em aceite, escreva a story da **primeira** fase; as demais ficam como lista de fases-follow-up para o usuário criar (não crie automaticamente — preserve o controle de numeração).

## Antipadrões a rejeitar
- **Fatiar por camada técnica** ("Fase 1: schema, Fase 2: API, Fase 3: UI"). Isso é planejamento horizontal — rejeite. Fatia tem que ser vertical (entrega valor ponta-a-ponta).
- **Pré-fatiar antes de o usuário ver a story original.**
- **Fatiar dois eixos de uma vez.** Faça um, reavalie as stories menores resultantes.

---
*Fontes (fundidas): github/spec-kit@b7e67f5 (`templates/spec-template.md` — user stories P1/P2/P3 independentemente testáveis) + gsd-build/get-shit-done@bdcaab2c (`references/spidr-splitting.md`, `mvp-concepts.md`). Ambas licença MIT (GitHub, Inc.; Lex Christopherson). Princípios extraídos e reescritos em PT-BR; sem cópia literal. Referência conceitual: Mike Cohn, "Five Ways to Split User Stories".*
