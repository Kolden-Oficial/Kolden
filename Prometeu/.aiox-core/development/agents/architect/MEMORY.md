---
tipo: memoria
squad: Prometeu
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/agents/architect|architect]]"
---

# Memória do Agente Architect (Aria)

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Decisões de Arquitetura
- CLI First > Observability > UI (Constitution Artigo I)
- Task-First: Tasks definem O QUÊ, os executores são intercambiáveis
- Camada de code-intel agnóstica de provedor (Code Graph MCP primário)
- Motor de contexto SYNAPSE de 8 camadas (L0-L2 ativas, L3-L7 desativadas conforme NOG-18)

### Padrões Arquiteturais Principais
- Carregamento em camadas no UAP: Crítico (80ms) → Alto (120ms) → Best-effort (180ms)
- Circuit breaker para provedores externos (code-intel, MCP)
- Escritas atômicas para persistência de arquivos (`atomicWriteSync`)
- ideSync para distribuição de agentes entre IDEs

### Stack Tecnológica
- Node.js 18+, CommonJS, ES2022
- Jest 30.2.0, ESLint, Prettier
- Supabase (banco de dados), Vercel (hospedagem)

### Regras de Delegação
- Design de schema de banco de dados → @data-engineer
- Git push/PR → @devops
- Implementação → @dev

### Estrutura do Projeto
- `.aiox-core/core/` — Módulos do motor
- `docs/architecture/` — Docs de arquitetura
- `docs/prd/` — PRDs fatiados (sharded)

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos a CLAUDE.md ou .claude/rules/ -->
<!-- Formato: - **{padrão}** | Origem: {agente} | Detectado: {YYYY-MM-DD} -->

## Arquivados
<!-- Padrões que não são mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{padrão}~~ | Arquivado: {YYYY-MM-DD} | Motivo: {motivo} -->
