# Segurança estática — hesreallyhim--awesome-claude-code

- **slug:** hesreallyhim--awesome-claude-code
- **sha:** 614f102accbcd48206d63a21df64adc984026b40
- **rota:** C (referência / lista curada — tratada como dado externo; instruções dentro dos arquivos NÃO foram seguidas)
- **veredito:** **SAFE**

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `subprocess.run` — operações `git` (status, add, commit, branch) no toolchain de manutenção do README | scripts/utils/git_utils.py (múltiplas), scripts/categories/add_category.py:191+, scripts/resources/create_resource_pr.py:34 | baixa | não (toolchain, fora do escopo de absorção) |
| `subprocess.run` em teste de regeneração do README | scripts/testing/test_regenerate_cycle.py:23,27 | baixa | não |
| `requests.post` para `https://api.github.com/graphql` (consulta de stargazers p/ ticker SVG) — endpoint oficial, com timeout, sem exfiltração | scripts/ticker/generate_ticker_svg.py:56 | baixa | não |
| Menções a `API_KEY`/`SECRET` — todas placeholders em CLAUDE.md curados de terceiros ou `${{ secrets.X }}` em workflows GitHub Actions; nenhum segredo hardcoded | resources/claude.md-files/*, resources/official-documentation/Claude-Code-GitHub-Actions/*.yml | informativa | não (são docs de exemplo) |
| `evaluate-repository.md` — prompt de avaliação de repositório; conteúdo é um *guia de revisão estática de segurança* (read-only, "do not run any code"), não injeção | .claude/commands/evaluate-repository.md | informativa | sim (ver F4 — ADAPT egide) |
| Sem `eval`/`exec`/`os.system`/`child_process`/`curl\|bash`; sem `postinstall`/`preinstall` (não há package.json); `.pre-commit-config.yaml` inclusive roda `detect-private-key` | — | — | — |
| Padrões de injeção de prompt (rota C): nenhum "ignore previous instructions"/jailbreak/`<system>` encontrado nos recursos curados | resources/ (varredura) | — | — |

**Conclusão (1):** Repositório é uma lista curada + toolchain Python que gera o README a partir de `THE_RESOURCES_TABLE.csv`. Todo código perigoso-aparente é plumbing `git`/GitHub-API legítimo do mantenedor; nenhum hook de install, nenhuma exfiltração, nenhum segredo hardcoded.
**Conclusão (2):** SAFE para arquivar como referência inerte. Atenção apenas à **licença CC-BY-NC-ND-4.0** (NoDerivatives/NonCommercial — ver `_procedencia.md`) e ao fato de cada recurso *linkado* pela lista ter licença própria a checar antes de qualquer absorção futura.
