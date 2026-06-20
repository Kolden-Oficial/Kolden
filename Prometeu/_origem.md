# Procedência — Prometeu

- **Origem:** repositório `SynkraAI/aiox-core`
- **Commit:** `77265d53966193958c0d370475bc2df041760d99`
- **Importado em:** 2026-06-19
- **Nome mítico:** Prometeu — o titã que trouxe a tecnologia (o fogo) à humanidade; squad de
  **Engenharia de Software** (framework AIOX: ciclo PRD → story → dev → QA → deploy).
- **Status:** `importado-cru-parcial`.

## Estrutura (diferente dos squads de marketing)
Não usa `agents/` na raiz. Os agentes vivem em:
- `.aiox-core/development/agents/` — 12 agentes mestres (Orion/aiox-master, Atlas/analyst,
  Aria/architect, Dara/data-engineer, Dex/dev, Gage/devops, Morgan/pm, Pax/po, Quinn/qa,
  River/sm, Craft/squad-creator, Uma/ux-design-expert) + `MEMORY.md` por agente.
- `.claude/agents/` — 10 variantes Claude Code (`aiox-*.md`).
- `.claude/skills/` (8), `.claude/commands/`, `.claude/rules/`.

## Estado da tradução (PT-BR)
- ✅ Traduzido: agentes (`.aiox-core/development/agents` + `.claude/agents`), skills, commands,
  rules; `README.md` já era PT no original.
- 🔄 Pendente: `.aiox-core/development/tasks/` (219 arquivos), `templates/` (20), `data/` (18),
  `docs/en` e demais docs, e os **espelhos de IDE** (`.codex`, `.gemini`, `.kimi`, `.antigravity`)
  — duplicatas geradas, baixa prioridade. `docs/es` e `docs/zh` são outros idiomas (não traduzir).

## Dedup
`squads/claude-code-mastery` era idêntico ao squad do xquads → consolidado em `C:\Kolden\Dedalo\`.
Esta pasta mantém apenas um ponteiro em `squads/claude-code-mastery/README.md`.

## Dívida (fase 2)
Concluir tradução profunda + rodar o Ritual do Caos (diagnóstico/PRD) para sair de `importado-cru`.
