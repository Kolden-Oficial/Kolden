# Inventário de capacidades — hesreallyhim--awesome-claude-code

- **slug:** hesreallyhim--awesome-claude-code
- **sha:** 614f102accbcd48206d63a21df64adc984026b40
- **rota:** C (referência) — inventário **leve**: o que a lista cobre e seu valor como índice, não como agente.

Natureza: lista curada "awesome-*" do ecossistema Claude Code. O ativo central é o **catálogo `THE_RESOURCES_TABLE.csv`** (227 recursos, 20 colunas com licença/autor/datas/release) + amostras de alguns recursos baixadas em `resources/` + um toolchain Python que gera o README a partir do CSV.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Catálogo curado de 227 recursos do ecossistema Claude Code (índice mestre com autor, link, licença, datas, versão de release) | referencia | catálogo, índice, awesome-list, descoberta, claude-code | eng-agentes/descoberta | THE_RESOURCES_TABLE.csv (227 linhas) |
| G2 | Cobertura "Slash-Commands" — 59 comandos curados | referencia | slash-command, comando, workflow | eng-agentes | THE_RESOURCES_TABLE.csv (Category=Slash-Commands) |
| G3 | Cobertura "Tooling" — 51 ferramentas/CLIs em torno do Claude Code | referencia | tooling, cli, devtool, observabilidade | eng-agentes/tooling | THE_RESOURCES_TABLE.csv (Category=Tooling) |
| G4 | Cobertura "Workflows & Knowledge Guides" — 36 guias/workflows | referencia | workflow, guia, conhecimento, processo | eng-agentes | THE_RESOURCES_TABLE.csv (Category=Workflows & Knowledge Guides) |
| G5 | Cobertura "CLAUDE.md Files" — 28 exemplos de CLAUDE.md de projetos reais | referencia | claude.md, contexto, memoria-de-projeto | eng-agentes | THE_RESOURCES_TABLE.csv (Category=CLAUDE.md Files) |
| G6 | Cobertura "Agent Skills" — 18 skills curadas | referencia | skill, habilidade, agent-skill | eng-agentes | THE_RESOURCES_TABLE.csv (Category=Agent Skills) |
| G7 | Cobertura "Hooks" — 13 hooks curados | referencia | hook, reflexo, pretooluse, automacao | eng-agentes | THE_RESOURCES_TABLE.csv (Category=Hooks) |
| G8 | Cobertura "Status Lines / Output Styles / Alternative Clients / Official Docs" — 7+4+5+3 recursos | referencia | statusline, output-style, cliente, documentacao | eng-agentes | THE_RESOURCES_TABLE.csv (demais categorias) |
| G9 | Amostras locais de slash-commands curados (23 arquivos: act, commit, create-pr, create-prd, create-prp, fix-github-issue, optimize, pr-review, release...) | referencia | slash-command, exemplo, template | eng-agentes | resources/slash-commands/ (23 .md) |
| G10 | Amostras locais de CLAUDE.md de projetos reais (22 arquivos) | referencia | claude.md, exemplo, contexto | eng-agentes | resources/claude.md-files/ (22 .md) |
| G11 | Amostras locais de workflows/knowledge-guides (6 arquivos) | referencia | workflow, guia | eng-agentes | resources/workflows-knowledge-guides/ |
| G12 | Espelho de documentação oficial: workflows GitHub Actions do Claude Code + Anthropic Quickstarts | referencia | github-actions, ci, quickstart, oficial | eng-agentes/ci | resources/official-documentation/ (9 arquivos) |
| G13 | Prompt de avaliação estática de repositório p/ ecossistema Claude Code (trust boundaries, execução implícita, read-only, "do not run any code") | metodo-prompt | seguranca, revisao-estatica, auditoria, trust-boundary, claude-code | seguranca | .claude/commands/evaluate-repository.md |
| G14 | Toolchain Python de geração de README a partir do CSV (geradores awesome/flat/minimal/visual, badges, IDs, validação de links, ticker SVG via GitHub GraphQL) | codigo-mcp | gerador-readme, automacao, csv, badges, validacao-links | tooling | scripts/** (≈50 .py), tools/readme_tree/ |
| G15 | Modelos/config de governança da lista (categorias, overrides, templates de README, acc-config.yaml, issue/PR forms) | referencia | template, governanca, categorias, schema | tooling | templates/, acc-config.yaml, .github/ |

Nota: G2–G8 são *facetas de cobertura* do mesmo catálogo G1 (contagem por categoria), registradas separadamente para mostrar o alcance do índice. O valor real para a Kolden está em G1 (índice de descoberta) e G13 (prompt de auditoria reaproveitável).
