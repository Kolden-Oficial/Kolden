# Referência de Brackets de Contexto do SYNAPSE

## Visão Geral

Os brackets de contexto controlam quanto conteúdo o SYNAPSE injeta por prompt com base em quanto da janela de contexto resta. À medida que a conversa avança e o contexto se preenche, o SYNAPSE se adapta alterando quais layers estão ativos e quantos tokens injeta.

O sistema de brackets é implementado em `.aiox-core/core/synapse/context/context-tracker.js`.

## Os 4 Brackets

| Bracket | Contexto Restante | Orçamento de Tokens | Comportamento |
|---------|-------------------|-------------|----------|
| **FRESH** | 60-100% | ~800 tokens | Injeção enxuta — apenas o essencial |
| **MODERATE** | 40-60% | ~1500 tokens | Injeção padrão — todos os layers ativos |
| **DEPLETED** | 25-40% | ~2000 tokens | Reforço — reforça regras críticas, dicas de memória habilitadas |
| **CRITICAL** | <25% | ~2500 tokens | Aviso de handoff — recomenda handoff de sessão, documenta o estado |

## Como os Brackets São Calculados

O context tracker estima o contexto restante usando:

```
contextPercent = 100 - ((promptCount * avgTokensPerPrompt) / maxContext * 100)
```

**Valores padrão:**
- `avgTokensPerPrompt`: 1500
- `maxContext`: 200000 (janela de contexto do Claude)

**Atribuição de bracket:**
- `contextPercent >= 60` → FRESH
- `contextPercent >= 40` → MODERATE
- `contextPercent >= 25` → DEPLETED
- `contextPercent < 25` → CRITICAL

Entrada inválida ou NaN assume CRITICAL por padrão (à prova de falhas).

## Ativação de Layers por Bracket

| Bracket | Layers Ativos | Dicas de Memória | Aviso de Handoff |
|---------|---------------|-------------|-----------------|
| **FRESH** | L0, L1, L2, L7 | Não | Não |
| **MODERATE** | L0-L7 (todos) | Não | Não |
| **DEPLETED** | L0-L7 (todos) | Sim | Não |
| **CRITICAL** | L0-L7 (todos) | Sim | Sim |

**Comportamento-chave:**
- **FRESH**: Apenas layers centrais (Constitution, Global, Agent, Star-Commands) — economiza tokens no início
- **MODERATE**: Pilha completa de layers ativada — operação normal
- **DEPLETED**: Dicas de memória do MIS habilitadas (quando o pro está disponível) para reforçar o contexto
- **CRITICAL**: Aviso de handoff injetado, recomendando a continuação da sessão em uma nova janela

## Regras Específicas por Bracket

O arquivo de domain `.synapse/context` contém regras que variam por bracket:

### Regras FRESH
- Minimizar as regras injetadas apenas ao essencial
- Evitar contexto redundante — o agente tem o histórico completo da conversa
- Pilha completa de layers disponível, mas com injeção enxuta

### Regras MODERATE
- Todos os layers ativos em prioridade normal
- Monitorar o uso de tokens — considerar resumir saídas longas
- Preferir exemplos de código concisos a explicações prolixas

### Regras DEPLETED
- Reforçar regras e restrições críticas
- Preferir respostas concisas para economizar tokens
- Pular layers opcionais (domains de keyword L6) para conservar
- Resumir o progresso antes de cada ação

### Regras CRITICAL
- Recomendar handoff de sessão
- Resumir o estado atual para continuação em uma nova sessão
- Injetar apenas as regras L0 Constitution e L1 Global — pular os demais layers
- Documentar trabalho incompleto no arquivo de story

## Imposição do Orçamento de Tokens

O formatter de saída (`.aiox-core/core/synapse/output/formatter.js`) impõe os orçamentos de tokens:

1. Cada bracket tem um orçamento máximo de tokens (800 / 1500 / 2000 / 2500)
2. As seções são renderizadas em ordem de prioridade (CONSTITUTION primeiro, SUMMARY por último)
3. Quando o orçamento é excedido, as seções são truncadas a partir do fim (a de menor prioridade primeiro)

**Ordem de truncamento** (a última a ser removida vem primeiro):
```
SUMMARY → KEYWORD → SQUAD → TASK → WORKFLOW → AGENT → CONSTITUTION
```

A Constitution (L0) nunca é truncada.

## Arquivos-Fonte

| Arquivo | Finalidade |
|------|---------|
| `.aiox-core/core/synapse/context/context-tracker.js` | Cálculo de bracket, orçamentos de tokens, configs de layer |
| `.synapse/context` | Regras de contexto específicas por bracket (L1) |
| `.aiox-core/core/synapse/output/formatter.js` | Imposição do orçamento de tokens + truncamento |
