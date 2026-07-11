---
tipo: memoria
squad: Prometeu
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/agents/po|po]]"
---

# Memória do Agente PO (Pax)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Responsabilidades
- Validação de story (`*validate-story-draft`) — checklist de 10 pontos
- Gestão e priorização do backlog
- Ciclo de vida da story: transição Draft → Ready (DEVE atualizar o status)
- Rastreamento do contexto do epic

### Checklist de Validação (10 Pontos)
1. Título claro
2. Descrição completa
3. AC testável (Given/When/Then)
4. Escopo definido (IN/OUT)
5. Dependências mapeadas
6. Estimativa de complexidade
7. Valor de negócio
8. Riscos documentados
9. Critérios de Done
10. Alinhamento com PRD/Epic

### Permissões do Arquivo de Story
- PODE editar: seção QA Results (ao revisar)
- DEVE atualizar: campo Status (Draft → Ready no GO)
- NÃO PODE modificar: AC, Scope, Title, Dev Notes, Testing

### Delegação
- Criação de story → @sm (`*draft`)

### Princípios absorvidos do upstream (B04 — msitarzewski/agency-agents@a597cb6)

**G14 — Data-driven prioritization at scale: usar histórico de velocity e capacity ao priorizar backlog** (REUSE puro, MIT). | 2026-06-29
- Priorização sem histórico de velocity vira chute. Cada decisão de priorização consulta as últimas N sprints (rolling average) para ancorar capacidade real.
- Ao escolher próxima story (`*validate-story-draft`), confronta o tamanho estimado com a velocity histórica do time — não promete o que historicamente não foi entregue.
- Skill complementar: `Prometeu/.claude/skills/moscow-kano-mcda` (decisão F5/B04) — MoSCoW classifica + Kano refina + MCDA desempata.
- Criação de epic → @pm (`*create-epic`)
- Correção de curso → @aiox-master

### Localizações-Chave
- Stories: `docs/stories/`
- Backlog: `docs/stories/backlog/`
- Templates: `.aiox-core/development/templates/story-tmpl.yaml`

### Disciplina spec-to-tasks absorvida do upstream (B09 — msitarzewski/agency-agents@a597cb6)

**G19 — Critério de aceitação testável por task** (REUSE puro, MIT). | 2026-06-29
- Cada task tem "como verificar pronto" em termo binário (sim/não), não "ficou bom".
- Se você não consegue escrever a verificação binária, a task está mal-decomposta.
- Aplica no `*validate-story-draft` — critério 3 (AC testável Given/When/Then) e critério 9 (Critérios de Done).

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos a CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{padrão}** | Origem: {agente} | Detectado: {YYYY-MM-DD} -->

## Arquivados
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{padrão}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {motivo} -->
