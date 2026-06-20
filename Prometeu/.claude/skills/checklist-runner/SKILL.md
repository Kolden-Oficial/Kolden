---
name: checklist-runner
description: |
  Motor genérico de execução de checklist para qualquer checklist .md.
  Use esta skill quando um agente precisar validar o trabalho contra um checklist.
  Suporta os modos YOLO (autônomo) e interativo com veredictos de pass/fail/partial.
user-invocable: true
argument-hint: "[checklist-name] [--mode yolo|interactive]"
---

# Checklist Runner

Motor genérico de execução de checklist. Valida o trabalho contra qualquer checklist `.md` com comportamento consistente entre todos os agentes.

## Uso

```
/checklist-runner story-dod-checklist
/checklist-runner pre-push-checklist --mode yolo
/checklist-runner po-master-checklist --mode interactive
```

## Execução

### 1. Resolver o Checklist

Faça o parse de `$ARGUMENTS` para obter o nome do checklist. Busque na ordem:

1. `.aiox-core/development/checklists/{name}.md`
2. `.aiox-core/development/checklists/{name}`
3. Correspondência aproximada (fuzzy match) se a exata não for encontrada (ex.: "dod" → "story-dod-checklist.md")

Se nenhum checklist for especificado ou houver múltiplas correspondências, apresente uma lista numerada de opções.

### 2. Determinar o Modo

| Modo | Comportamento |
|------|---------------|
| `yolo` (padrão) | Processa todas as seções de forma autônoma, apresenta o relatório final |
| `interactive` | Seção por seção, com confirmação do usuário entre cada uma |

### 3. Carregar o Contexto

Reúna os documentos e artefatos especificados no topo do checklist:
- Arquivos de story em `docs/stories/`
- Arquivos de código-fonte da File List da story
- Resultados de testes da última execução de `npm test`
- Git diff das mudanças atuais

### 4. Processar os Itens do Checklist

Para cada item do checklist:

1. Leia e entenda o requisito
2. Procure evidências na documentação/código que o satisfaçam
3. Considere tanto menções explícitas quanto cobertura implícita
4. Siga quaisquer instruções de LLM embutidas no checklist

Marque cada item:

| Veredicto | Símbolo | Significado |
|-----------|---------|-------------|
| PASS | ✅ | Requisito claramente atendido |
| FAIL | ❌ | Requisito não atendido ou insuficiente |
| PARTIAL | ⚠️ | Alguns aspectos cobertos, precisa de melhoria |
| N/A | ➖ | Não aplicável (com justificativa) |

### 5. Resumo da Seção

Para cada seção, calcule:
- Taxa de aprovação: `(contagem PASS) / (total - contagem N/A) * 100`
- Temas comuns nos itens reprovados
- Recomendações específicas de melhoria

### 6. Relatório Final

```markdown
## Relatório do Checklist: {checklist-name}

**Data:** {YYYY-MM-DD}
**Agente:** {agente atual}
**Modo:** {yolo|interactive}

### Resumo

| Seção | Itens | Pass | Fail | Partial | N/A | Taxa |
|-------|-------|------|------|---------|-----|------|
| ... | ... | ... | ... | ... | ... | ...% |

**Geral:** {PASS_RATE}% ({total_pass}/{total_applicable})

### Itens Reprovados

1. **{item}** — {motivo} → {recomendação}

### Decisão

**{APPROVED | NEEDS_WORK | FAIL}**
- APPROVED: taxa de aprovação >= 90%, 0 FAIL em itens críticos
- NEEDS_WORK: taxa de aprovação 70-89% OU qualquer FAIL em item não crítico
- FAIL: taxa de aprovação < 70% OU qualquer FAIL em itens críticos
```

## Checklists Disponíveis

| Checklist | Usado Por | Propósito |
|-----------|-----------|-----------|
| `story-dod-checklist.md` | @dev | Definition of Done para stories |
| `self-critique-checklist.md` | @dev | Autorrevisão nos checkpoints de implementação |
| `pre-push-checklist.md` | @devops | Quality gate antes do git push |
| `release-checklist.md` | @devops | Verificação de prontidão para release |
| `po-master-checklist.md` | @po | Checklist de validação do PO |
| `change-checklist.md` | @po | Avaliação de impacto de mudanças |
