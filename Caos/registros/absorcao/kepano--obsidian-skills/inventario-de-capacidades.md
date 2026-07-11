---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/kepano--obsidian-skills/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/kepano--obsidian-skills/seguranca|seguranca]]"
---

# Inventário de capacidades — kepano--obsidian-skills

- **slug:** kepano--obsidian-skills | **sha:** a1dc48e68138490d522c04cbf5822214c6eb1202 | **rota:** A
- **Natureza:** plugin de Agent Skills (spec agentskills.io) para Obsidian — usável por Claude Code,
  Codex e OpenCode. 5 skills, todas declarativas (autoria/edição de formatos de arquivo do Obsidian).

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|----|------------|------|----------|---------|----------------------|
| G1 | Autoria/edição de Obsidian Flavored Markdown — wikilinks, embeds, callouts, propriedades/frontmatter, tags, comentários `%%`, highlight `==`, math LaTeX, mermaid, footnotes | skill | obsidian, markdown, wikilink, callout, frontmatter, embed, mermaid, nota | escrita/notas/pkm | skills/obsidian-markdown/SKILL.md:1-197 |
| G2 | Referências de Markdown Obsidian — catálogo de callouts, embeds (áudio/vídeo/busca/externo) e tipos de propriedade/tag | metodo-prompt | callouts, embeds, properties, referencia | escrita/notas/pkm | skills/obsidian-markdown/references/{CALLOUTS,EMBEDS,PROPERTIES}.md |
| G3 | Criação/edição de Obsidian Bases (`.base`) — views (table/cards/list/map), filtros (and/or/not), fórmulas, summaries, quoting YAML, troubleshooting | skill | bases, base, view, filtro, formula, summary, database, yaml | dados/notas/pkm | skills/obsidian-bases/SKILL.md:1-500 |
| G4 | Referência completa de funções de Bases (Date/String/Number/List/File/Link/Object/RegExp) | metodo-prompt | bases, funcoes, formula, referencia | dados/notas/pkm | skills/obsidian-bases/references/FUNCTIONS_REFERENCE.md |
| G5 | Criação/edição de JSON Canvas (`.canvas`, spec 1.0) — nodes (text/file/link/group), edges, cores, geração de ID hex, layout, checklist de validação | skill | canvas, json-canvas, mindmap, fluxograma, diagrama, mapa-mental, node, edge | diagramação/visual | skills/json-canvas/SKILL.md:1-245 |
| G6 | Exemplos completos de Canvas (mind map, project board, research canvas, flowchart) | metodo-prompt | canvas, exemplos, mindmap, flowchart | diagramação/visual | skills/json-canvas/references/EXAMPLES.md |
| G7 | Operação de vault via Obsidian CLI — read/create/append/search, daily notes, properties, tasks, tags, backlinks; targeting de file/path/vault | skill | obsidian-cli, vault, cli, nota, busca, daily, task, backlink | automacao/notas/pkm | skills/obsidian-cli/SKILL.md:1-61 |
| G8 | Loop de dev/debug de plugin e tema Obsidian via CLI — reload, dev:errors, dev:screenshot, dev:dom, dev:console, eval JS, dev:css, dev:mobile, CDP | metodo-prompt | obsidian, plugin, tema, dev, debug, screenshot, dom, eval, cdp | eng/claude-code | skills/obsidian-cli/SKILL.md:63-106 |
| G9 | Extração de markdown limpo de páginas web via Defuddle CLI (readability, economia de tokens) — `defuddle parse <url> --md`, metadados, formatos | ferramenta | defuddle, extracao, web, markdown, readability, scraping, tokens | pesquisa/extracao-web | skills/defuddle/SKILL.md:1-42 |

**Total:** 9 capacidades (3 skills "core" G1/G3/G5 + 1 skill CLI G7 + 4 referências/sub-métodos G2/G4/G6/G8 + 1 ferramenta externa G9).
Granularidade rota A: cada skill `.md` e cada conjunto de referência tratado como ID distinto; G8 isolado de G7 por ser
domínio diferente (dev de plugin vs. operação de vault).
