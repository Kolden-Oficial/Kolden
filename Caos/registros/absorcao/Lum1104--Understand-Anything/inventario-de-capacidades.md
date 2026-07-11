---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/Lum1104--Understand-Anything/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/Lum1104--Understand-Anything/seguranca|seguranca]]"
---

# Inventário de capacidades (F3) — Lum1104--Understand-Anything

Rota A. Plugin Claude Code multiplataforma (claude/copilot/cursor/opencode/codex/gemini/…) que combina **análise estática (tree-sitter) + LLM** para produzir um **grafo de conhecimento interativo** de qualquer codebase, com dashboard, tours guiados, onboarding, diff e explain. Monorepo pnpm: `skills/` (definições) + `agents/` (subagentes) + `packages/core` (motor TS) + `packages/dashboard` (React/React Flow) + `src/` (builders de contexto).

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | `/understand` — pipeline 7 fases (scan→analyze→architecture→tour→assemble→review→graph) que gera `knowledge-graph.json` | skill | grafo-de-conhecimento, codebase, analise, pipeline | dev-tooling | skills/understand/SKILL.md:1 |
| G2 | `/understand-chat` — Q&A sobre a codebase lendo o grafo via Grep (sem dump) | skill | chat, q&a, codebase | dev-tooling | skills/understand-chat/SKILL.md:1 |
| G3 | `/understand-dashboard` — sobe dashboard web interativo do grafo | skill | dashboard, visualizacao | dev-tooling | skills/understand-dashboard/SKILL.md:1 |
| G4 | `/understand-diff` — analisa diff/PR contra o grafo (nós afetados, risco) | skill | diff, pr, risco, impacto | dev-tooling | skills/understand-diff/SKILL.md:1 |
| G5 | `/understand-domain` — extrai domínio de negócio (domínios/fluxos/passos) → grafo de fluxo horizontal | skill | dominio-de-negocio, fluxo, processo | dev-tooling | skills/understand-domain/SKILL.md:1 |
| G6 | `/understand-explain` — explicação profunda de arquivo/função/módulo | skill | explicacao, deep-dive | dev-tooling | skills/understand-explain/SKILL.md:1 |
| G7 | `/understand-knowledge` — grafo de conhecimento de wiki padrão Karpathy (raw/wiki/schema, wikilinks `[[...]]`) | skill | wiki, karpathy, base-de-conhecimento, entidades | knowledge-graph | skills/understand-knowledge/SKILL.md:1 |
| G8 | `/understand-onboard` — gera guia de onboarding em markdown a partir do grafo | skill | onboarding, time, guia | dev-tooling | skills/understand-onboard/SKILL.md:1 |
| G9 | project-scanner — inventário de arquivos/linguagens/frameworks/import-map/complexidade | subagent | scanner, inventario, linguagens | dev-tooling | agents/project-scanner.md:1 |
| G10 | file-analyzer — extração estrutural + análise semântica LLM de lotes de arquivos → nós/arestas | subagent | analise-de-arquivo, lote, nos-arestas | dev-tooling | agents/file-analyzer.md:1 |
| G11 | architecture-analyzer — atribui cada arquivo a exatamente 1 camada arquitetural | subagent | arquitetura, camadas, layering | dev-tooling | agents/architecture-analyzer.md:1 |
| G12 | domain-analyzer — extrai domínios/fluxos/passos de negócio → domain-graph.json | subagent | dominio, fluxo-de-negocio | dev-tooling | agents/domain-analyzer.md:1 |
| G13 | article-analyzer — extrai conhecimento implícito (entidades/claims/relações) de markdown wiki | subagent | wiki, entidades, claims, knowledge-graph | knowledge-graph | agents/article-analyzer.md:1 |
| G14 | tour-builder — desenha tour pedagógico de 5–15 passos pela arquitetura | subagent | tour, pedagogia, onboarding | dev-tooling | agents/tour-builder.md:1 |
| G15 | graph-reviewer — QA do grafo (correção/completude/qualidade) com veredito approve/reject | subagent | qa, revisao, validacao | dev-tooling | agents/graph-reviewer.md:1 |
| G16 | assemble-reviewer — revisa saída do merge-batch-graphs, recupera nós/arestas dropados, fecha gaps cross-batch | subagent | revisao, merge, recuperacao | dev-tooling | agents/assemble-reviewer.md:1 |
| G17 | knowledge-graph-guide — guia o usuário a navegar/consultar o grafo e o dashboard | subagent | guia, navegacao, grafo | dev-tooling | agents/knowledge-graph-guide.md:1 |
| G18 | Reflexo PostToolUse: ao detectar `git commit/merge/...` com autoUpdate, dispara update incremental do grafo | reflexo | hook, post-commit, auto-update | dev-tooling | understand-anything-plugin/hooks/hooks.json |
| G19 | Reflexo SessionStart: compara hash do grafo vs HEAD e sinaliza grafo stale | reflexo | hook, session-start, staleness | dev-tooling | understand-anything-plugin/hooks/hooks.json |
| G20 | Estratégia "deterministic-first": só gasta token de LLM quando há mudança estrutural (funções/classes/imports), não em cosmética | metodo-prompt | token-reduction, incremental, custo | dev-tooling | hooks/auto-update-prompt.md:1; skills/understand/extract-structure.mjs |
| G21 | Semantic batching + output chunking — agrupa arquivos por proximidade e fragmenta saída para reduzir tokens | metodo-prompt | batching, chunking, token | dev-tooling | skills/understand/compute-batches.mjs; docs/.../2026-05-24-semantic-batching*.md |
| G22 | Structural fingerprinting — assinatura determinística por arquivo para update incremental | codigo-mcp | fingerprint, incremental, hash | dev-tooling | skills/understand/build-fingerprints.mjs; packages/core/src/fingerprint.ts |
| G23 | Ontologia/schema do grafo (nós code/non-code/domain; arestas imports/calls/contains/…; layers; tour) | metodo-prompt | schema, ontologia, grafo | dev-tooling | packages/core/src/schema.ts; skills/*/SKILL.md (Graph Structure Reference) |
| G24 | merge-batch-graphs / merge-subdomain-graphs — montagem + dedup de saídas de múltiplos agentes em 1 grafo | codigo-mcp | merge, dedup, assembly | dev-tooling | skills/understand/merge-batch-graphs.py; merge-subdomain-graphs.py |
| G25 | Geração de `.understandignore` (filtro de ruído antes do scan) | codigo-mcp | ignore, filtro, ruido | dev-tooling | skills/understand/generate-ignore.mjs; packages/core/src/ignore-generator.ts |
| G26 | Registry de extratores/parsers tree-sitter WASM language-agnostic (~20+ linguagens) | codigo-mcp | tree-sitter, parser, multilinguagem, extrator | dev-tooling | packages/core/src/plugins/extractors/*; parsers/* |
| G27 | Framework registry — extração consciente de framework (django/express/fastapi/flask/gin/nextjs/rails/react/spring/vue) | codigo-mcp | framework, registry, deteccao | dev-tooling | packages/core/src/languages/frameworks/*; framework-registry.ts |
| G28 | Layer detector — heurística de detecção de camadas arquiteturais | codigo-mcp | camadas, arquitetura, deteccao | dev-tooling | packages/core/src/analyzer/layer-detector.ts |
| G29 | embedding-search / search — busca semântica e textual sobre o grafo | codigo-mcp | busca, embedding, semantica | dev-tooling | packages/core/src/embedding-search.ts; search.ts |
| G30 | Dashboard interativo: React Flow + ELK layout + Louvain (comunidades) + filtros + code viewer + temas + i18n | ferramenta | dashboard, react-flow, elk, louvain, visualizacao | dev-tooling | packages/dashboard/src/* |
| G31 | Geração de tour guiado pedagógico (narrativa "o que é isto"→"como funciona") | metodo-prompt | tour, narrativa, pedagogia | dev-tooling | packages/core/src/analyzer/tour-generator.ts |
| G32 | Empacotamento multiplataforma de plugin/skill (matriz de install para ~14 agentes/IDEs) | metodo-prompt | plugin, multiplataforma, install, symlink | dev-tooling | install.sh; install.ps1; .claude-plugin/.copilot-plugin/.cursor-plugin |

**Fora do escopo (não inventariado em detalhe):** homepage Astro (marketing), testes (`__tests__`, `tests/`), traduções de README/locale, lockfiles. São ruído/derivados, não capacidades.
