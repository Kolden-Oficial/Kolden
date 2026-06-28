# F2 — Segurança estática

- **slug:** Leonxlnx--taste-skill
- **sha:** 06d6028b5c623016c59ce8536f578e5a1127b499
- **rota:** A (skill/agente)
- **veredito:** **SAFE**
- **data:** 2026-06-26
- **método:** 100% estático (Read/Grep/Glob/ls). Código NÃO executado.

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| URLs de badge externas (star-history) em markdown de README | README.md:175-192 | informativa | n/a (doc, não executa) |
| Exemplo de meta-tag Shopify `%SHOPIFY_API_KEY%` em bloco de doc | skills/taste-skill/SKILL.md:1029 | informativa | sim (placeholder ilustrativo, sem segredo real) |
| Scripts Node de build de assets do README usam `sharp`+`fs`+`path` | scripts/*.mjs | baixa | não-absorvível (ferramenta inerte, fora do escopo do skill) |
| Caminhos locais hardcoded do autor (`C:/Users/User/Downloads/...`) nos scripts | scripts/process-readme-buttons.mjs:5, process-sponsor-badge.mjs:6 | informativa | não (lixo de build do autor, descartar) |
| LICENSE MIT, sem cláusulas copyleft | LICENSE:1-22 | informativa | sim |
| `.claude-plugin/plugin.json` + `marketplace.json` — manifesto de plugin Claude Code (sem hooks de install) | .claude-plugin/*.json | informativa | sim |

Conclusões:
1. Repositório é uma **biblioteca de skills declarativas (SKILL.md em markdown)** mais docs/research e scripts auxiliares de imagem. Nenhum `eval`/`exec`/`child_process`/`subprocess`/`os.system`, nenhum `postinstall`/`preinstall`, nenhuma exfiltração de rede, nenhum segredo/chave hardcoded. Os únicos `import` de Node são `sharp/fs/path` em scripts de build de README que não fazem parte do conteúdo do skill.
2. Risco residual nulo para absorção: o que se absorve são instruções de design em texto (prompts/metodologias). Os scripts `.mjs` e os caminhos locais do autor são lixo de build não-absorvível e devem ser deixados na quarentena. Veredito **SAFE** — pode seguir para inventário e mapeamento.
