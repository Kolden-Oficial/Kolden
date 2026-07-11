---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/_origem|_origem]]"
  - "[[Dedalo/CHANGELOG|CHANGELOG]]"
---

# Dedalo — Squad de Domínio do Claude Code

O Dedalo é um squad multi-agente especializado em maestria total do Claude Code: hooks, skills, subagents, MCP, plugins, agent teams, customização de settings.json, integração de projetos e consciência de roadmap. Orquestrado por Orion (Tier 0), reúne 7 especialistas que cobrem cada faceta da ferramenta — do design de reflexos via hooks PreToolUse à composição de servidores MCP, passando por orquestração de swarms e engenharia de configuração. O squad também entende a ponte entre as capacidades nativas do Claude Code e a arquitetura do AIOS-core.

## Agentes

| Tier | Agente | Codinome | Foco |
|------|--------|----------|------|
| 0 | claude-mastery-chief | Orion | Triagem, roteamento de 7 domínios e conhecimento transversal do Claude Code |
| 1 | hooks-architect | Latch | Os 17 eventos de hook, automação, controle de lifecycle e damage control |
| 1 | mcp-integrator | Piper | Servidores MCP, descoberta de ferramentas e orçamento de contexto |
| 1 | swarm-orchestrator | Nexus | Agent teams, subagents e execução paralela |
| 1 | config-engineer | Sigil | settings.json, permissões, CLAUDE.md e sandbox |
| 2 | skill-craftsman | Anvil | Skills, plugins, comandos e engenharia de contexto |
| 2 | project-integrator | Conduit | Integração de projetos, CI/CD e ponte com o AIOS |
| 2 | roadmap-sentinel | Vigil | Roadmap, changelog e adoção de features |

## Como Ativar

Ative o orquestrador (ponto de entrada recomendado):

```
@claude-code-mastery:claude-mastery-chief
```

Ou use a ativação via AIOS:

```
/AIOS:agents:claude-mastery-chief
```

Acesso direto a um especialista:

```
/AIOS:agents:hooks-architect        # Automação de hooks
/AIOS:agents:mcp-integrator         # Servidores MCP
/AIOS:agents:swarm-orchestrator     # Orquestração multi-agente
/AIOS:agents:config-engineer        # Settings e permissões
/AIOS:agents:skill-craftsman        # Skills e plugins
/AIOS:agents:project-integrator     # Integração de projetos
/AIOS:agents:roadmap-sentinel       # Atualizações e roadmap
```

## Workflows

O squad inclui 3 workflows multifásicos em `workflows/`:

| Workflow | Propósito |
|----------|-----------|
| wf-project-setup | Setup completo do Claude Code num projeto: detecção de tipo, CLAUDE.md, settings, regras, hooks e MCP |
| wf-knowledge-update | Atualização do conhecimento do squad a partir do changelog, da documentação oficial e dos recursos da comunidade |
| wf-audit-complete | Auditoria abrangente da configuração do Claude Code com relatório pontuado e recomendações |

---

*Squad de Domínio do Claude Code — "Domine a ferramenta para dominar o ofício."*

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
