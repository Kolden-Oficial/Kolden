# Changelog — claude-code-mastery

Todas as mudanças notáveis no squad Claude Code Mastery.

## [1.0.0] - 2026-03-02

### Adicionado
- 8 agentes especialistas: claude-mastery-chief (Orion), hooks-architect (Latch), mcp-integrator (Piper), swarm-orchestrator (Nexus), config-engineer (Sigil), skill-craftsman (Anvil), project-integrator (Conduit), roadmap-sentinel (Vigil)
- 26 tarefas executáveis distribuídas entre todos os agentes
- 3 workflows multifásicos (wf-project-setup, wf-knowledge-update, wf-audit-complete)
- 5 arquivos de base de conhecimento (quick-ref, project-type-signatures, hook-patterns, ci-cd-patterns, mcp-catalog)
- 7 templates (5 templates de projeto CLAUDE.md + 2 workflows de GitHub Actions)
- 8 resumos de DNA mental (disler, steipete, kieran-klaassen, reuven-cohen, superclaude-org, bmad-code-org, daniel-miessler, boris-cherny)
- 1 script de validação (validate-setup.js)
- Arquitetura em tiers: Tier 0 (Diagnóstico), Tier 1 (Maestria Central), Tier 2 (Estratégia & Contexto)
- Matriz de handoff com roteamento completo entre todos os agentes
- Ponte de integração com o AIOS-core (mapeamento de agentes, tarefas, hooks e configuração)

### Arquitetura
- Agente de entrada: claude-mastery-chief (Orion) com matriz de roteamento de 7 domínios
- Preocupação transversal: todos os agentes entendem a arquitetura do AIOS-core
- Fontes de conhecimento: changelog do Claude Code, documentação oficial, recursos da comunidade
