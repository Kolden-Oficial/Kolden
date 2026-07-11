---
tipo: agente
squad: Prometeu
up: "[[_MOC-frota]]"
relacionado:
  - "[[Prometeu/.claude/commands/AIOX/agents/_indice|_indice]]"
---

# squad-creator

<!-- ACORE-CLAUDE-AGENT-COMMAND: legacy-shim -->
<!-- Canonical Skill: .claude/skills/AIOX/agents/squad-creator/SKILL.md -->
<!-- Source: .aiox-core/development/agents/squad-creator.md -->

**Craft** - Squad Creator

> Use para criar, validar, publicar e gerenciar squads

## Ativação de Compatibilidade

Este comando é um shim de compatibilidade legada. O payload de ativação canônico do Claude é:

`.claude/skills/AIOX/agents/squad-creator/SKILL.md`

Quando este comando é invocado:

1. Leia `.claude/skills/AIOX/agents/squad-creator/SKILL.md` por completo.
2. Siga as instruções de ativação dessa skill.
3. Se o arquivo da skill estiver indisponível, leia `.aiox-core/development/agents/squad-creator.md` como fallback.

<!-- ritual-de-encerramento -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Ao final de toda sessão em que você (`squad-creator`) atuou, antes de encerrar: acione a habilidade
`ritual-de-encerramento`. Reflita sobre a sessão, extraia as lições verificadas e grave-as na sua
memória própria (`MEMORY.md` — veja a regra de resolução na habilidade). Nunca encerre sem ter
aprendido e salvo algo.
