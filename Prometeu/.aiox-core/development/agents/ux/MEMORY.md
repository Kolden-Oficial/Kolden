# Memória do Agente UX Design Expert (Uma)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Padrões-Chave
- CommonJS (`require`/`module.exports`), NÃO ES Modules
- ES2022, Node.js 18+, indentação de 2 espaços, aspas simples
- kebab-case para arquivos, PascalCase para componentes

### Estrutura do Projeto
- `.aiox-core/core/` — Módulos centrais
- `docs/` — Documentação e specs de design
- `packages/` — Pacotes compartilhados

### Regras de Git
- NUNCA faça push — delegue para @devops
- Conventional commits: `docs:` para specs de design, `feat:` para componentes

### Convenções de Design
- Princípios do Atomic Design (átomos → moléculas → organismos → templates → páginas)
- Design tokens para temas consistentes
- Meta de conformidade WCAG 2.1 AA

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{pattern}** | Origem: {agent} | Detectado: {YYYY-MM-DD} -->

## Arquivados
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{pattern}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {reason} -->
