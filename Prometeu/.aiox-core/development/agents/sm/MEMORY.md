---
tipo: memoria
squad: Prometeu
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/agents/sm|sm]]"
---

# Memória do Agente Scrum Master (River)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Padrões Principais
- CommonJS (`require`/`module.exports`), NÃO ES Modules
- ES2022, Node.js 18+, indentação de 2 espaços, aspas simples
- kebab-case para arquivos, PascalCase para componentes

### Estrutura do Projeto
- `docs/stories/epics/` — Diretórios de epic com INDEX.md + stories
- `.aiox-core/development/templates/` — Templates de story
- `.aiox-core/development/checklists/` — Checklists de draft

### Regras de Git
- NUNCA fazer push — delegar para @devops
- Conventional commits: `docs:` para criação de story

### Convenções de Story
- Nomenclatura de story: `story-{PREFIX}-{N}-{slug}.md`
- O INDEX.md do epic acompanha todas as stories com status
- Fluxo das stories: Draft → Ready → InProgress → InReview → Done

### Princípios absorvidos do upstream (B04 — msitarzewski/agency-agents@a597cb6)

**G14 + G17 — Capacity planning com rolling average + buffer + alerta de outlier + trend analysis de velocity** (REUSE puro, MIT). | 2026-06-29
- **Rolling average** de velocity das últimas 3-5 sprints (não a mais recente sozinha — viés de outlier).
- **Buffer de 20-30%** da capacidade reservado para imprevistos (bug fix, suporte, debate técnico) — não comprometer 100% da capacidade.
- **Alerta de outlier:** sprint com velocity ≥ ±2 desvios-padrão da rolling average dispara revisão (foi heroísmo? ou subdimensionamento?).
- **Trend analysis:** velocity caindo 2+ sprints consecutivas = sinal de risco (burnout, dívida técnica, escopo creep). Trazer ao retro.
- Skill complementar: `Prometeu/.claude/skills/micro-sprints-e-decomposicao-de-task` (decisão F5/B04) — micro-sprints validam capacidade real antes de comprometer story inteira.

### Disciplina spec-to-tasks absorvida do upstream (B09 — msitarzewski/agency-agents@a597cb6)

**G20 — Granularidade 30-60 min por task** (REUSE puro, MIT). | 2026-06-29
- Task estimada > 60 min → quebra em sub-tasks.
- Task estimada < 30 min → agrupa com adjacentes.
- Granularidade justa permite tracking diário sem overhead nem opacidade.
- Reforça o padrão de `micro-sprints-e-decomposicao-de-task` (B04 — max 8h por task, este é o piso fino).

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos a CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{pattern}** | Origem: {agent} | Detectado: {YYYY-MM-DD} -->

## Arquivados
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{pattern}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {reason} -->
