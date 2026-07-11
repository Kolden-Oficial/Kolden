---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/Lum1104--Understand-Anything/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/Lum1104--Understand-Anything/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática (F2) — Lum1104--Understand-Anything

- **slug:** Lum1104--Understand-Anything
- **sha:** 54754a6f97051d1d76c8758353d8ea41afe502a6
- **upstream real:** Egonex-AI/Understand-Anything (LICENSE/manifests apontam para Egonex-AI; o `Lum1104` é fork/mirror)
- **rota:** A (skill/agente) — plugin Claude Code multiplataforma
- **veredito:** **SAFE**

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `spawnSync('git', ['ls-files', ...])` — listagem de arquivos versionados, args fixos, sem shell | skills/understand/scan-project.mjs:62,476 | baixa | sim (padrão útil) |
| `execFileSync('git', ['diff', ...])` — diff por nome de arquivo, args fixos | packages/core/src/staleness.ts:1,18 | baixa | sim |
| `subprocess.run(["git","rev-parse","HEAD"], timeout=5)` — pega hash do commit | skills/understand-knowledge/merge-knowledge-graph.py:354 | baixa | sim |
| Todos os `.exec(` restantes são `RegExp.exec` (parsing de import/estrutura), não exec de processo | extract-import-map.mjs, parsers/*.ts | nenhuma | sim |
| Hook PostToolUse injeta no LLM: "update the knowledge graph. Do not ask the user for confirmation — just do it." | understand-anything-plugin/hooks/hooks.json | média | **não como está** (viola gate humano da Kolden; auto-update sem confirmação) |
| Hook SessionStart com mesma diretiva de auto-execução (grafo stale) | understand-anything-plugin/hooks/hooks.json | média | **não como está** (mesmo motivo) |
| `curl ... | bash` aparece só como exemplo de uso documentado no cabeçalho do instalador | install.sh:12-13 | baixa | n/a (doc, não executa) |
| Instaladores só fazem `git clone` do repo oficial + symlinks de skills por plataforma; sem download+exec de terceiros | install.sh, install.ps1 | baixa | sim |
| `pnpm onlyBuiltDependencies` libera build de tree-sitter/esbuild/sharp; sem `postinstall`/`preinstall` custom no repo | package.json | baixa | n/a |
| Nenhum segredo/chave hardcoded; nenhum `eval`/`new Function`/`os.system`/exfiltração de rede; `llm-analyzer.ts` só monta prompt (a chamada ao LLM é do host) | varredura global | nenhuma | — |

## Conclusão

Código 100% estático/local: as únicas chamadas de processo são a `git` com argumentos fixos (listar arquivos, diff, hash) — sem shell injection, sem rede, sem segredos, sem hooks de install maliciosos. Licença MIT permissiva. Veredito **SAFE**.

Ressalva de absorção (não de segurança): os dois hooks em `hooks.json` instruem o agente a atualizar o grafo "sem pedir confirmação ao usuário" — padrão de auto-execução que **fere o gate humano da Kolden**; o padrão de staleness/auto-update é absorvível, mas a diretiva "just do it" deve ser removida/reescrita para passar por aprovação.
