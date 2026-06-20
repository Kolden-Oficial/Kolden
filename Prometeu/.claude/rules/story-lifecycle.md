---
paths:
  - "docs/stories/**"
  - ".aiox-core/development/**"
---

# Ciclo de Vida da Story — Regras Detalhadas

## Progressão de Status

```
Draft → Ready → InProgress → InReview → Done
```

| Status | Disparo | Agente | Ação |
|--------|---------|-------|--------|
| Draft | @sm cria a story | @sm | Arquivo da story criado |
| Ready | @po valida (GO) | @po | **DEVE atualizar o campo de status no arquivo da story de Draft → Ready** |
| InProgress | @dev inicia a implementação; FAIL do @qa retorna a story | @dev / @qa | **DEVE atualizar o campo de status: Ready → InProgress no início do dev, ou InReview → InProgress no FAIL do QA** |
| InReview | @dev conclui a implementação | @dev | **DEVE atualizar o campo de status de InProgress → InReview antes do handoff para o QA** |
| Done | @qa PASS, CONCERNS ou WAIVED | @qa | **DEVE atualizar o campo de status de InReview → Done antes do push do @devops** |

**CRÍTICO:** A transição `Draft → Ready` é de responsabilidade do @po durante o `*validate-story-draft`. Quando o veredito é GO (incluindo o GO condicional após as correções serem aplicadas), o @po DEVE atualizar o campo Status da story para `Ready` e registrar a transição no Change Log. Uma story deixada em `Draft` após um veredito GO é uma violação de processo.

**CRÍTICO:** As transições `Ready → InProgress` e `InProgress → InReview` são de responsabilidade do @dev durante o `*dev-develop-story`. O @dev DEVE registrar ambas as transições no Change Log usando o bloco obrigatório de transição de status em `dev-develop-story.md`.

**CRÍTICO:** As transições `InReview → Done` e `InReview → InProgress` são de responsabilidade do @qa durante o `*qa-gate`. PASS, CONCERNS e WAIVED movem a story para `Done`; FAIL a retorna para `InProgress`. O @qa DEVE atualizar o status da story e o Change Log antes de reportar o resultado do gate.

**CRÍTICO:** O @devops não altera o status da story. A autoridade de push/PR/release do @devops só começa depois que a story já reflete o resultado do QA gate.

## Fase 1: Criar (@sm)

**Task:** `create-next-story.md`
**Entradas:** PRD shardeado, contexto do epic
**Saída:** `{epicNum}.{storyNum}.story.md`

## Fase 2: Validar (@po)

**Task:** `validate-next-story.md`

### Checklist de Validação de 10 Pontos

1. Título claro e objetivo
2. Descrição completa (problema/necessidade explicados)
3. Critérios de aceite testáveis (Given/When/Then preferidos)
4. Escopo bem definido (IN e OUT claramente listados)
5. Dependências mapeadas (stories/recursos pré-requisito)
6. Estimativa de complexidade (pontos ou T-shirt sizing)
7. Valor de negócio (benefício ao usuário/negócio claro)
8. Riscos documentados (problemas potenciais identificados)
9. Critérios de Done (definição clara de concluído)
10. Alinhamento com PRD/Epic (consistência com os documentos de origem)

**Decisão:** GO (≥7/10) ou NO-GO (<7/10 com correções obrigatórias)

## Fase 3: Implementar (@dev)

**Task:** `dev-develop-story.md`

### Modos de Execução

**YOLO (autônomo):**
- 0-1 prompts
- Decisões registradas em `decision-log-{story-id}.md`
- Melhor para: tarefas simples e determinísticas

**Interativo (padrão):**
- 5-10 prompts com checkpoints educativos
- Confirmações em pontos chave de decisão
- Melhor para: aprendizado, decisões complexas

**Pre-Flight (planejar primeiro):**
- Todas as perguntas antecipadamente (10-15 prompts)
- Gera um plano de execução
- Depois, execução sem ambiguidade
- Melhor para: requisitos ambíguos, trabalho crítico

### Auto-cura do CodeRabbit na Fase de Dev

```
iteration = 0
while CRITICAL issues found AND iteration < 2:
  auto-fix CRITICAL/HIGH
  iteration++
if CRITICAL persist after 2 iterations:
  HALT — manual intervention required
```

## Fase 4: QA Gate (@qa)

**Task:** `qa-gate.md`

### 7 Verificações de Qualidade

1. **Revisão de código** — padrões, legibilidade, manutenibilidade
2. **Testes unitários** — cobertura adequada, todos passando
3. **Critérios de aceite** — todos atendidos conforme o AC da story
4. **Sem regressões** — funcionalidade existente preservada
5. **Performance** — dentro de limites aceitáveis
6. **Segurança** — fundamentos do OWASP verificados
7. **Documentação** — atualizada se necessário

### Decisões do Gate

| Decisão | Pontuação | Ação |
|----------|-------|--------|
| PASS | Todas as verificações OK | Aprovar, prosseguir para o push do @devops |
| CONCERNS | Problemas menores | Aprovar com observações documentadas |
| FAIL | Problemas HIGH/CRITICAL | Retornar para @dev com feedback |
| WAIVED | Problemas aceitos | Aprovar com waiver documentado (raro) |

### Estrutura do Arquivo de Gate

```yaml
storyId: STORY-42
verdict: PASS | CONCERNS | FAIL | WAIVED
issues:
  - severity: low | medium | high
    category: code | tests | requirements | performance | security | docs
    description: "..."
    recommendation: "..."
```

## QA Loop (Revisão-Correção Iterativa)

```
@qa review → verdict → @dev fixes → re-review (max 5 iterations)
```

**Comandos:**
- `*qa-loop {storyId}` — Iniciar o loop completo
- `*stop-qa-loop` — Pausar e salvar o estado
- `*resume-qa-loop` — Retomar a partir do estado salvo
- `*escalate-qa-loop` — Forçar escalonamento manual

**Disparos de escalonamento:**
- max_iterations_reached (padrão: 5)
- verdict_blocked
- fix_failure (após retentativas)
- manual_escalate (comando do usuário)

**Status:** Rastreado em `qa/loop-status.json`

## Regras de Atualização do Arquivo de Story

| Seção | Quem Pode Editar |
|---------|-------------|
| Título, Descrição, AC, Escopo | apenas @po |
| File List, Dev Notes, checkboxes | @dev |
| QA Results | apenas @qa |
| Change Log | Qualquer agente (apenas append) |
