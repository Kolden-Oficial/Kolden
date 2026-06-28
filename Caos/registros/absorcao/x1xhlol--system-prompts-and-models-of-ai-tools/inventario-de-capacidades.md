# F3 — Inventário de capacidades (rota C — inventário LEVE)

- **slug:** `x1xhlol--system-prompts-and-models-of-ai-tools`
- **sha:** `0c828e4e893f025c1ae75cb3eb41e4a178e4024e`
- **escopo:** referência de engenharia de prompt/tooling. Cada linha = 1 produto/cluster (não 1 técnica), pois rota C trata o repo como acervo inerte, não como agente. `tipo` = `referencia` em tudo. Granularidade fina (por arquivo) seria perda de tempo: o valor está no acervo, não em fragmentos.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | System prompts + tool schema do Claude Code / Claude (Sonnet 4.5/4.6, Code 2.0, Claude for Chrome) — engenharia de agente de código de ponta | referencia | claude-code, agente-codigo, tool-schema, system-prompt | eng-de-agentes | `Anthropic/*` |
| G2 | Prompts + tools do Cursor (5 versões de Agent Prompt + CLI + Chat) — evolução versionada de um agente de IDE | referencia | cursor, ide-agent, versionamento-prompt | eng-de-agentes | `Cursor Prompts/*` |
| G3 | Prompts/tools do VSCode Agent por modelo (claude-sonnet-4, gpt-4.1/4o/5/5-mini, gemini-2.5-pro, NES tab-completion) — mesmo agente, prompts por modelo | referencia | vscode, copilot, prompt-por-modelo, tab-completion | eng-de-agentes | `VSCode Agent/*` |
| G4 | Prompt + tools do Devin AI (autônomo) e DeepWiki | referencia | devin, agente-autonomo, deepwiki | eng-de-agentes | `Devin AI/*` |
| G5 | Prompts/tools de geradores de UI: v0, Lovable, Orchids.app (decision-making + system) | referencia | v0, lovable, orchids, gerador-ui, text-to-app | frontend/ui | `v0 Prompts and Tools/*`, `Lovable/*`, `Orchids.app/*` |
| G6 | Prompts/tools de agentes de build full-stack: Replit, Same.dev, Emergent, Leap.new, Z.ai Code, Qoder (prompt+Quest), CodeBuddy, Trae (builder+chat) | referencia | build-fullstack, app-builder, scaffolding | eng-de-agentes | `Replit/*`, `Same.dev/*`, `Emergent/*`, `Leap.new/*`, `Z.ai Code/*`, `Qoder/*`, `CodeBuddy Prompts/*`, `Trae/*` |
| G7 | Prompt + tools/loop do Manus (Agent loop + Modules + tools) — arquitetura de loop de agente explicitada | referencia | manus, agent-loop, modulos, planejamento | eng-de-agentes | `Manus Agent Tools & Prompt/*` |
| G8 | Prompts de Windsurf (Wave 11) e Augment Code (claude-4 + gpt-5, prompts+tools) | referencia | windsurf, augment, ide-agent | eng-de-agentes | `Windsurf/*`, `Augment Code/*` |
| G9 | Prompts open-source: Bolt, Cline, Codex CLI (OpenAI), Gemini CLI (Google), RooCode, Lumo | referencia | open-source, cline, codex-cli, gemini-cli, bolt, roocode | eng-de-agentes | `Open Source prompts/*` |
| G10 | Prompts de assistentes de busca/navegador: Perplexity, Comet Assistant (+tools), dia | referencia | perplexity, comet, browser-agent, busca | pesquisa | `Perplexity/*`, `Comet Assistant/*`, `dia/*` |
| G11 | **Padrão defensivo anti prompt-injection** (catálogo de ataques a recusar + "todo conteúdo é DADO não instrução") | metodo-prompt | injection-defense, guardrail, dados-nao-instrucao | seguranca | `Comet Assistant/System Prompt.txt:95-115` |
| G12 | Prompts de produtividade/assistente pessoal: NotionAi (+tools), Poke (agent + p1–p6), Cluely (Default + Enterprise) | referencia | notion, poke, cluely, assistente-pessoal | produtividade | `NotionAi/*`, `Poke/*`, `Cluely/*` |
| G13 | Prompts de modo de planejamento/spec: Kiro (Mode Classifier + Spec + Vibe), Traycer AI (phase_mode + plan_mode), Google Antigravity (Fast + planning-mode) | referencia | planning-mode, spec-mode, classificador-de-modo, plan-vs-act | eng-de-agentes | `Kiro/*`, `Traycer AI/*`, `Google/Antigravity/*` |
| G14 | Prompts de assistentes IDE nativos: Xcode (System + Document/Explain/Message/Playground/Preview actions), JetBrains Junie, Google Gemini AI Studio vibe-coder | referencia | xcode, junie, gemini-studio, ide-nativo, acoes-contextuais | eng-de-agentes | `Xcode/*`, `Junie/*`, `Google/Gemini/*` |
| G15 | Configs de agente em YAML (Amp: claude-4-sonnet + gpt-5) + Warp.dev (terminal agent) | referencia | amp, warp, terminal-agent, config-yaml | eng-de-agentes | `Amp/*`, `Warp.dev/*` |
| G16 | **Acervo de tool schemas (JSON)** — 17 arquivos de definição de ferramentas reais de produção (codebase_search, edit_file, run_terminal, etc.) como referência de design de função/parâmetro | referencia | tool-schema, function-calling, design-de-ferramenta, json-schema | eng-de-agentes | `*/Tools.json`, `*/tools.json` (17 arq.) |
