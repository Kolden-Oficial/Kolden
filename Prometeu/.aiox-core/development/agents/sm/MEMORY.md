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

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos a CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{pattern}** | Origem: {agent} | Detectado: {YYYY-MM-DD} -->

## Arquivados
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{pattern}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {reason} -->
