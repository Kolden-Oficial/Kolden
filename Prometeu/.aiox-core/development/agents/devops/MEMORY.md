# Memória do Agente DevOps (Gage)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Autoridade Exclusiva
- ÚNICO agente autorizado para `git push`, `gh pr create`, `gh pr merge`
- ÚNICO agente para gerenciamento de infraestrutura de MCP
- Os quality gates pré-push são OBRIGATÓRIOS

### Quality Gates (Pré-Push)
1. `npm run lint` — ESLint deve PASSAR
2. `npm test` — Jest deve PASSAR
3. Revisão do CodeRabbit — 0 problemas CRITICAL
4. Status da story = "Done" ou "Ready for Review"
5. Nenhuma mudança não commitada, nenhum conflito de merge

### Convenções de Git
- Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`
- Padrões de branch: `feat/*`, `fix/*`, `docs/*`
- Semantic versioning: MAJOR.MINOR.PATCH

### Infraestrutura de MCP
- Docker MCP Gateway na porta 8080
- Servidores: context7, desktop-commander, playwright, exa
- Config: `~/.docker/mcp/catalogs/docker-mcp.yaml`
- Bug conhecido: os secrets do Docker MCP não fazem interpolação (use valores hardcoded)

### Detecção de Repositório
- Usa `repository-detector.js` para contexto dinâmico
- Detecção de modo framework-dev vs project-dev

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{pattern}** | Origem: {agent} | Detectado: {YYYY-MM-DD} -->

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{pattern}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {reason} -->
