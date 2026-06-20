# Memória do Agente Dev (Dex)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Padrões-Chave
- CommonJS (`require`/`module.exports`), NÃO ES Modules
- ES2022, Node.js 18+, indentação de 2 espaços, aspas simples
- Imports absolutos sempre (nunca relativos `../`)
- kebab-case para arquivos, PascalCase para componentes
- Jest 30.2.0 para testes, `npm test` para executar

### Estrutura do Projeto
- `.aiox-core/core/` — Módulos core (synapse, session, code-intel, orchestration)
- `.aiox-core/development/` — Agentes, tasks, templates, scripts
- `.aiox-core/infrastructure/` — CI/CD, detecção de git, project-status
- `tests/` — Suites de testes (espelha a estrutura do código-fonte)
- `docs/stories/` — Arquivos de story (desenvolvimento ativo)

### Regras de Git
- NUNCA fazer push — delegar para @devops
- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`, `chore:`, `refactor:`
- Referenciar a story: `feat: implement feature [Story NOG-18]`

### Gotchas Comuns
- Caminhos do Windows: use barras normais (forward slashes) no código, shell bash e não cmd
- `fs.existsSync` para checks síncronos, `fs.promises` para assíncronos
- atomicWriteSync de `.aiox-core/core/synapse/utils/atomic-write` para escritas de arquivo seguras
- CodeRabbit roda no WSL, não no Windows diretamente

### Workflow de Story
- Ler task → Implementar → Escrever testes → Validar → Marcar checkbox [x]
- APENAS atualizar: checkboxes, Debug Log, Completion Notes, Change Log, File List
- NUNCA modificar: seções Status, Story, AC, Dev Notes, Testing

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{pattern}** | Origem: {agent} | Detectado: {YYYY-MM-DD} -->
- **NUNCA fazer push — delegar para @devops** | Origem: dev, analyst, sm, data-engineer, ux, qa (6 agentes) | Detectado: 2026-02-22 | Status: Já elevado para `.claude/rules/agent-authority.md`
- **Sistema de módulos CommonJS (require/module.exports)** | Origem: dev, analyst, sm, data-engineer, ux, architect (6 agentes) | Detectado: 2026-02-22 | Status: Já em CLAUDE.md (Padroes de Codigo)
- **Formato de conventional commits** | Origem: dev, devops, analyst, sm, data-engineer, ux (6 agentes) | Detectado: 2026-02-22 | Status: Já em CLAUDE.md (Convencoes Git)
- **kebab-case para arquivos** | Origem: dev, analyst, sm, data-engineer, ux (5 agentes) | Detectado: 2026-02-22 | Status: Já em CLAUDE.md (Padroes de Codigo)

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{pattern}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {reason} -->
