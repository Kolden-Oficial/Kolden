# Segurança estática — gsd-build--get-shit-done

- **slug:** gsd-build--get-shit-done
- **sha:** bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815
- **url:** https://github.com/gsd-build/get-shit-done
- **rota:** A (skill/agente)
- **data:** 2026-06-26
- **veredito:** **SAFE**

Análise 100% estática (Read/Grep/Glob). Nenhum código foi executado.

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Sem `preinstall`/`postinstall` no package.json (nem no sdk/package.json) | package.json (scripts) | nenhuma | n/a |
| Nenhum segredo/chave hardcoded (grep de API_KEY/secret/token/BEGIN KEY/sk-/ghp_/AKIA → 0 hits reais) | repo inteiro | nenhuma | n/a |
| `curl -fsSL https://fnm.vercel.app/install \| bash` | bin/install.js:277 | baixa | NÃO (texto de ajuda impresso ao usuário p/ WSL; não é executado pelo instalador) |
| `child_process` (spawnSync/execFileSync/execSync) extenso | bin/install.js, hooks/*.js, get-shit-done/bin/lib/*.cjs, sdk/src/*.ts | baixa | parcial (uso legítimo: git/npm/node; argv-array, sem shell-string concat; ver security.cjs/shell-command-projection.cjs) |
| Hooks de segurança próprios (anti-injeção de prompt) | hooks/gsd-prompt-guard.js, hooks/gsd-read-injection-scanner.js, hooks/gsd-workflow-guard.js | nenhuma (defensivo) | SIM (capacidade desejável — vira reflexo Egide) |
| Engine de scan de segredos/base64/injeção | get-shit-done/bin/lib/security.cjs, scripts/secret-scan.sh, base64-scan.sh, prompt-injection-scan.sh | nenhuma (defensivo) | SIM |
| Dependências runtime mínimas: `@anthropic-ai/claude-agent-sdk`, `ws`; opt `fallow`; dev `c8` | package.json | baixa | revisar na absorção (não vendorizar node_modules) |
| Repositório **ARQUIVADO** — README redireciona p/ open-gsd/gsd-core | README.md | informativa | impacta manutenção, não segurança |

**Conclusão (1):** repo de ferramenta/CLI bem-engenheirada e consciente de segurança — usa subprocess apenas para git/npm/node via arrays de argumentos (sem `eval`, sem `os.system`, sem shell-string), sem segredos, sem hooks de install, sem exfiltração; os únicos padrões "perigosos" são os próprios scanners defensivos contra injeção de prompt.
**Conclusão (2):** SAFE para leitura profunda e absorção como capacidade (rota A); a absorção deve reescrever em PT-BR e NÃO copiar `node_modules`/SDK compilado — vendorizar só os prompts/agentes/métodos.
