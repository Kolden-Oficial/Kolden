---
paths:
  - ".aiox-core/**"
  - "packages/**"
  - "bin/**"
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/rules/_indice|_indice]]"
---

# Princípios IDS — Regras Detalhadas

> Status: Planejado (o epic de IDS está em Draft — os princípios aplicam-se como orientação aspiracional)

## Hierarquia de Decisão: REUSE > ADAPT > CREATE

### REUSE (Relevância >= 90%)
- Usar o artefato existente diretamente, sem modificação
- Importar/referenciar a entidade existente
- Nenhuma justificativa necessária além de confirmar a correspondência

### ADAPT (Relevância 60-89%)
- Pontuação de adaptabilidade >= 0,6
- As mudanças NÃO DEVEM exceder 30% do artefato original
- As mudanças NÃO DEVEM quebrar os consumidores existentes (verifique a lista usedBy)
- Documentar as mudanças no change log do artefato
- Atualizar os relacionamentos no registry
- Análise de impacto obrigatória

### CREATE (Sem correspondência adequada)
Justificativa obrigatória:
- `evaluated_patterns`: Entidades existentes que você considerou
- `rejection_reasons`: Por que cada uma foi rejeitada (razões técnicas)
- `new_capability`: Qual capacidade única isto fornece
- Registrar no Entity Registry dentro de 24 horas
- Estabelecer relacionamentos com entidades existentes
- Definir restrições de adaptabilidade para reúso futuro

## Gates de Verificação G1-G6

### G1: Criação de Epic (@pm)
- **Tipo:** Human-in-loop, Consultivo
- **Disparo:** workflow `*create-epic`
- **Ação:** Consultar o registry por entidades relacionadas, exibir artefatos potencialmente reutilizáveis
- **Latência:** < 24h (assíncrono)
- **Bloqueante:** Não

### G2: Criação de Story (@sm)
- **Tipo:** Human-in-loop, Consultivo
- **Disparo:** workflow `*draft`
- **Ação:** Verificar tasks/templates existentes que correspondam ao trabalho da story
- **Latência:** < 24h (assíncrono)
- **Bloqueante:** Não

### G3: Validação de Story (@po)
- **Tipo:** Human-in-loop, Bloqueio Suave
- **Disparo:** workflow `*validate-story-draft`
- **Ação:** Verificar se os artefatos referenciados existem, detectar possível duplicação
- **Latência:** < 4h (assíncrono)
- **Bloqueante:** Suave (pode ser sobreposto com justificativa)

### G4: Contexto de Dev (@dev)
- **Tipo:** Automatizado, Informativo
- **Disparo:** Atribuição de story / início de `*develop`
- **Ação:** Exibir padrões correspondentes como lembrete
- **Latência:** < 2s
- **Bloqueante:** NÃO (apenas registrado para métricas)

### G5: Revisão de QA (@qa)
- **Tipo:** Automatizado, Bloqueia o Merge
- **Disparo:** PR/merge request
- **Ação:** Verificar se novos artefatos poderiam ter reutilizado os existentes
- **Latência:** < 30s
- **Bloqueante:** SIM se houver nova entidade sem registro no registry ou justificativa

### G6: CI/CD (@devops)
- **Tipo:** Automatizado, Bloqueia o Merge
- **Disparo:** pipeline de CI
- **Ação:** Verificação de integridade do registry + sincronização
- **Latência:** < 60s
- **Bloqueante:** SIM em CRITICAL, WARN em MEDIUM/LOW

## Política de Override

**Comando:** `--override-ids --override-reason "explanation"`

**Permitido quando:**
- Correção urgente requer criação imediata
- A adaptação introduziria risco inaceitável
- O artefato existente está depreciado/congelado

**Requisitos:**
- Registrado para a trilha de auditoria
- Revisado dentro de 7 dias
- Incluir a razão do override no log de verificação do gate

## Degradação Graciosa

Todos os gates implementam circuit breaker:
- **Timeout:** 2s padrão
- **Em timeout:** avisar-e-prosseguir
- **Em erro:** registrar-e-prosseguir
- **Princípio chave:** O desenvolvimento NUNCA é bloqueado por falhas de IDS

```yaml
circuit_breaker:
  failure_threshold: 5
  success_threshold: 3
  reset_timeout_ms: 60000
```

## Artigo IV-A: Desenvolvimento Incremental (Emenda Constitucional)

**Severidade:** MUST

**Quatro Regras Centrais:**
1. **Consulta ao Registry Obrigatória** — Consultar antes de criar
2. **Hierarquia de Decisão** — REUSE > ADAPT > CREATE estritamente
3. **Limites de Adaptação** — Mudanças < 30%, não quebrar consumidores
4. **Requisitos de Criação** — Justificativa completa, registrar dentro de 24h

**Referência:** `docs/stories/epics/epic-ids-incremental-development/`
