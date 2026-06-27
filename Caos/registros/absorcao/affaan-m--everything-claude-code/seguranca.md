# Segurança estática (F2) — affaan-m--everything-claude-code

- **slug:** affaan-m--everything-claude-code
- **sha:** 2bc924faf2f8e893bfe0af86b1931283693c30ae
- **rota:** A
- **veredito:** **SAFE**

Análise 100% estática (Read/Grep/Glob/ls). Nada foi executado. Repo grande (3.292 ficheiros),
licença MIT. Os achados de "risco" são todos fixtures de teste, lógica de *detecção* de segredos,
ou exemplos didáticos — não há payload que execute ou exfiltre.

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Segredos hardcoded = fixtures de teste (`AKIAIOSFODNN7EXAMPLE`, `ghp_FAKE...`, `sk-abcdef...`) | tests/hooks/governance-capture.test.js:36,54; tests/hooks/pre-bash-commit-quality.test.js:214-219; tests/lib/mcp-inventory.test.js:89,101 | baixa | não (são casos de teste; descartar) |
| `-----BEGIN PRIVATE KEY-----` como *padrão de detecção* em hooks/agentes de sanitização | agents/opensource-sanitizer.md:50; agents/opensource-forker.md:73; scripts/hooks/governance-capture.js; .cursor/hooks/before-submit-prompt.js | baixa | sim (a técnica de detecção é útil — cluster G28) |
| `curl ... \| bash` citado em guias de segurança como antipadrão a EVITAR | the-security-guide.md:181; docs/*/the-security-guide.md; WORKING-CONTEXT.md:105 | baixa | sim (conteúdo educativo) |
| `curl \| bash` em docs de migração referenciando instalador oficial (opencode/openclaw) | .opencode/MIGRATION.md:88; docs/*/the-openclaw-guide.md:205 | baixa | não-absorvível (doc de terceiro) |
| `postinstall` = `echo` benigno (mensagem pós-instalação) | package.json:329 | nula | n/a |
| `.mcp.json` aponta só para `chrome-devtools-mcp@latest` via npx | .mcp.json | baixa | sim (config; inerte sem execução) |
| `child_process`/`exec`/`subprocess` em scripts JS/PY de tooling ECC e em skill-scripts (skill-comply, continuous-learning-v2) | scripts/ (209 ficheiros), skills/*/scripts/*.py, skills/ck/*.mjs | média (só se EXECUTADO) | parcial — tooling ECC é vendor inerte; NÃO executar |
| Hooks ECC com bootstrap Node ofuscado (resolve plugin-root) em hooks.json | hooks/hooks.json | média (só se EXECUTADO) | sim como referência de *design* de hook; reescrever, nunca rodar o bootstrap original |

**Conclusão (1/2):** Nenhuma chave/credencial real, nenhum download+exec malicioso, nenhuma
exfiltração de rede. Os matches de `eval/exec/child_process` vivem em tooling de instalação (Node/Python)
e em scripts de skills legítimas — risco só existe se o código for **executado**, o que a quarentena proíbe.
**Conclusão (2/2):** Veredito **SAFE** para leitura/absorção estática. Regra de absorção: absorver apenas
o conteúdo declarativo (markdown de skills/agents/commands/rules + *design* dos hooks). O sistema de
instalação ECC (`scripts/`, `ecc2/`, `ecc_dashboard.py`, `install.*`, `plugins/`) é vendor inerte e
**não deve ser executado** sob nenhuma hipótese.
