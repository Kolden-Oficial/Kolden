# Procedência — Prometeu

- **Origem:** repositório `SynkraAI/aiox-core`
- **Commit:** `77265d53966193958c0d370475bc2df041760d99`
- **Importado em:** 2026-06-19
- **Nome mítico:** Prometeu — o titã que trouxe a tecnologia (o fogo) à humanidade; squad de
  **Engenharia de Software** (framework AIOX: ciclo PRD → story → dev → QA → deploy).
- **Status:** `importado-cru` (tradução profunda concluída em 2026-06-20).

## Estrutura (diferente dos squads de marketing)
Não usa `agents/` na raiz. Os agentes vivem em:
- `.aiox-core/development/agents/` — 12 agentes mestres (Orion/aiox-master, Atlas/analyst,
  Aria/architect, Dara/data-engineer, Dex/dev, Gage/devops, Morgan/pm, Pax/po, Quinn/qa,
  River/sm, Craft/squad-creator, Uma/ux-design-expert) + `MEMORY.md` por agente.
- `.claude/agents/` — 10 variantes Claude Code (`aiox-*.md`).
- `.claude/skills/` (8), `.claude/commands/`, `.claude/rules/`.

## Estado da tradução (PT-BR) — concluída 2026-06-20
- ✅ Traduzido: agentes (`.aiox-core/development/agents` + `.claude/agents`), skills, commands,
  rules; `README.md` já era PT no original.
- ✅ Traduzido (rodada 2026-06-20): `.aiox-core/development/tasks/` (~218), `templates/`,
  `data/` (prosa/presets), `checklists/`, `workflows/` (yaml — descrições), e `docs/en` (25 stubs).
  Padrão: traduzir prosa/descrições/rótulos; preservar chaves YAML, IDs, comandos, código e nomes de arquivo.
- 🗑️ Removidos: espelhos de IDE (`.codex`, `.gemini`, `.kimi`, `.antigravity` — duplicatas) e as
  localizações `docs/es` (135) e `docs/zh` (124) — outros idiomas, fora da operação PT-BR.
- ↩️ Fora de escopo (inglês remanescente, baixa prioridade): docs raiz (`docs/aiox-agent-flows/`,
  `docs/architecture/`, `docs/GUIDING-PRINCIPLES.md`...), scripts JS, e conteúdo dentro de blocos
  de código/template (preservado por norma).

## Dedup
`squads/claude-code-mastery` era idêntico ao squad do xquads → consolidado em `C:\Kolden\Dedalo\`.
Esta pasta mantém apenas um ponteiro em `squads/claude-code-mastery/README.md`.

## Dívida (fase 2)
Tradução profunda ✅ concluída (2026-06-20). Resta: rodar o Ritual do Caos (diagnóstico/PRD)
para sair de `importado-cru`.
