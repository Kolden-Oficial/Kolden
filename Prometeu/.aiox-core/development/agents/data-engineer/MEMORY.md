# Memória do Agente Data Engineer (Dara)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Padrões Principais
- CommonJS (`require`/`module.exports`), NÃO ES Modules
- ES2022, Node.js 18+, indentação de 2 espaços, aspas simples
- Imports absolutos sempre (nunca relativos `../`)
- kebab-case para arquivos, PascalCase para componentes

### Estrutura do Projeto
- `.aiox-core/core/` — Módulos core
- `packages/db/` — Pacotes de banco de dados (se aplicável)
- `tests/` — Suítes de teste (espelham a estrutura do código-fonte)

### Regras de Git
- NUNCA fazer push — delegar para @devops
- Conventional commits: `feat:`, `fix:`, `docs:`, `test:`

### Convenções de Banco de Dados
- O design de schema segue as decisões do architect
- Políticas de RLS para segurança em nível de linha
- Scripts de migration com procedimentos de rollback

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos a CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{padrão}** | Origem: {agente} | Detectado: {YYYY-MM-DD} -->

## Arquivados
<!-- Padrões que não são mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{padrão}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {motivo} -->
