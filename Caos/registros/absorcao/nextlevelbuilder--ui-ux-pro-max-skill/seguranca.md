---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/nextlevelbuilder--ui-ux-pro-max-skill/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/nextlevelbuilder--ui-ux-pro-max-skill/mapa-de-decisao|mapa-de-decisao]]"
---

# F2 — Segurança estática

- **slug:** nextlevelbuilder--ui-ux-pro-max-skill
- **sha:** 9fd25fe07e46ae444edc356e62fe913347ab9e23
- **rota:** A (skill/agente)
- **veredito:** **SAFE**

Análise 100% estática (Read/Grep/Glob). Nenhum código foi executado.

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Sem hooks de install (`postinstall`/`preinstall`); só `prepublishOnly` (roda no publish, não no install) | `cli/package.json:19` | info | n/a |
| Nenhum segredo/chave hardcoded; nenhum `BEGIN PRIVATE KEY` (grep amplo, 0 hits) | repo inteiro | info | n/a |
| `subprocess.run` chama o CLI do shadcn/ui (`npx shadcn add`) — sem `shell=True`, args em lista | `ui-styling/scripts/shadcn_add.py:126,172` | baixa | NÃO (reimplementar; não executar) |
| `execFileSync` (não `exec`/shell) p/ sincronizar tokens | `brand/scripts/sync-brand-to-tokens.cjs:14` | baixa | sim (lógica adaptável) |
| `subprocess.run(cmd)` valida HTML de slide (args em lista) | `design-system/scripts/slide-token-validator.py:30` | baixa | sim |
| Geração de imagem via Google Gemini (`genai.Client(api_key=...)`) — lê `GEMINI_API_KEY`/`GOOGLE_API_KEY` de env; loader lê `.env` local p/ `os.environ` | `design/scripts/{logo,cip,icon}/generate.py` | média | adaptar c/ Infisical (não env puro) |
| `fetch` à API pública do GitHub (lista/baixa releases do próprio repo) — installer legítimo, sem download+exec de código arbitrário | `cli/src/utils/github.ts:57,77,95` | baixa | NÃO (CLI = vendor, fora do escopo de squad) |
| `exec` (node) usado só p/ descompactar/extrair release zip do próprio repo | `cli/src/utils/extract.ts:3` | baixa | NÃO |
| Construção de URL Pexels/Unsplash p/ busca de imagem de fundo (`urllib.parse.quote`, sem download automático) | `design-system/scripts/fetch-background.py:196` | baixa | sim (adaptar) |
| Fontes binárias `.ttf` (OFL) e assets duplicados em `cli/assets/` e `src/` espelhando `.claude/skills/` | `ui-styling/canvas-fonts/*`, `cli/assets/*` | info | parcial (deduplicar na absorção) |

**Conclusão (1):** Repo é uma skill de design intelligence + um installer CLI; todo "código perigoso" (subprocess/exec/fetch) é tooling legítimo invocado só sob demanda — sem exfiltração, sem segredos embutidos, sem execução automática na instalação. Os scripts NÃO devem ser executados pela Kolden; servem de molde para reimplementação adaptada.
**Conclusão (2):** Única ressalva operacional = scripts Gemini esperam API key em variável de ambiente / `.env`; na absorção, qualquer credencial deve passar por Infisical (§5/§7). Veredito **SAFE**.
