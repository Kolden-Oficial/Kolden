# Task: Comandos do IDS Governor

**Task ID:** ids-governor
**Version:** 1.0
**Purpose:** Executar os comandos do IDS Framework Governor (*ids query, *ids health, *ids stats, *ids impact)
**Agent:** @aiox-master
**Story:** IDS-7 (aiox-master IDS Governor Integration)

---

## Visão Geral

Esta task trata da execução dos comandos do IDS (Incremental Development System) através da fachada FrameworkGovernor. Todos os comandos são consultivos e não-bloqueantes.

### Comandos Disponíveis

| Comando | Descrição | Argumentos |
|---------|-------------|-----------|
| `*ids query {intent}` | Consulta o registry por recomendações REUSE/ADAPT/CREATE | intent (obrigatório), --type (opcional) |
| `*ids health` | Verificação de saúde do registry | nenhum |
| `*ids stats` | Estatísticas do registry (contagem de entidades, pontuação de saúde) | --json (opcional) |
| `*ids impact {entity-id}` | Análise de impacto para modificações | entity-id (obrigatório) |

---

## Passos de Execução

### *ids query {intent}

1. Carregar o FrameworkGovernor (RegistryLoader + DecisionEngine + RegistryUpdater)
2. Chamar `governor.preCheck(intent, entityType)`
3. Exibir a saída formatada usando `FrameworkGovernor.formatPreCheckOutput(result)`
4. Se houver correspondências, apresentar as opções: [1] ADAPT existente [2] CREATE novo [3] Pular
5. Registrar a decisão

### *ids health

1. Carregar o FrameworkGovernor
2. Chamar `governor.healthCheck()`
3. Se o RegistryHealer estiver disponível: exibir o relatório completo de saúde
4. Se o RegistryHealer estiver indisponível: exibir estatísticas básicas com mensagem de modo degradado
5. Mostrar a contagem de entidades e o status de carregamento do registry

### *ids stats

1. Carregar o FrameworkGovernor
2. Chamar `governor.getStats()`
3. Exibir a saída formatada usando `FrameworkGovernor.formatStatsOutput(result)`
4. Mostrar: totalEntities, byType, byCategory, healthScore, healerAvailable

### *ids impact {entity-id}

1. Carregar o FrameworkGovernor
2. Chamar `governor.impactAnalysis(entityId)`
3. Exibir a saída formatada usando `FrameworkGovernor.formatImpactOutput(result)`
4. Mostrar: directConsumers, indirectConsumers, riskLevel, adaptabilityScore
5. Se o risco for HIGH/CRITICAL: exibir aviso

---

## Equivalentes em CLI

Todos os comandos também estão disponíveis via CLI:

```bash
node bin/aiox-ids.js ids:check "your intent" --type task
node bin/aiox-ids.js ids:impact create-doc
node bin/aiox-ids.js ids:stats --json
node bin/aiox-ids.js ids:register path/to/file.md
```

---

## Dependências

- `.aiox-core/core/ids/framework-governor.js` — classe FrameworkGovernor
- `.aiox-core/core/ids/registry-loader.js` — RegistryLoader
- `.aiox-core/core/ids/incremental-decision-engine.js` — DecisionEngine
- `.aiox-core/core/ids/registry-updater.js` — RegistryUpdater
- `.aiox-core/core/ids/registry-healer.js` — RegistryHealer (opcional, IDS-4a)

---

## Tratamento de Erros

Todos os comandos aplicam degradação graciosa:
- Timeout: 2 segundos (avisar e prosseguir)
- Healer ausente: Mostrar mensagem de modo degradado
- Falha ao carregar o registry: Exibir erro com sugestão de recuperação
- Todas as operações são consultivas e nunca bloqueiam o usuário

---

*IDS-7 | Criado em 2026-02-10 por @dev (Dex)*
