---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/rohitg00--ai-engineering-from-scratch/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/rohitg00--ai-engineering-from-scratch/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática — rohitg00--ai-engineering-from-scratch

- **slug:** `rohitg00--ai-engineering-from-scratch`
- **sha:** `c8b9b9244f3210b840776675175662dacf208264`
- **rota:** A (Skill/Agente) — na prática, predominantemente **curso/referência** (ver inventário)
- **data:** 2026-06-26
- **veredito:** **SAFE**

## Método
Análise 100% estática (Read/Grep/Glob/ls). Nenhum código executado. Varreduras: segredos
hardcoded, código perigoso (`eval`/`exec`/`subprocess`/`child_process`/`os.system`/`curl|bash`),
hooks de install (`pre/postinstall`), exfiltração de rede, e workflow de CI.

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Nenhum segredo hardcoded; chaves só via env var | `phases/00-.../04-apis-and-keys/code/first_api_call.py:26,32` | nenhuma | sim (padrão correto) |
| `.gitignore` cobre `.env`, `*.pem`, `*.key`, `.claude/`, `data/`, modelos | `.gitignore` | nenhuma | n/a |
| `subprocess`/`child_process` apenas em scripts de verificação de ambiente (checam versões de toolchain) | `phases/00-.../01-dev-environment/code/verify.py:3`, `verify.ts:5` | baixa | sim (escopo benigno) |
| `eval` = exclusivamente PyTorch `model.eval()` e texto de quiz (nenhum `eval()` de string) | múltiplos `phases/**/code/main.py` | nenhuma | sim |
| `curl ... | sh` aparece só como **string de tutorial** (instrução de instalar `uv`), não executado | `phases/00-.../06-python-environments/code/env_setup.sh:32` | baixa | sim (didático) |
| Workflow CI usa actions pinadas por SHA, `persist-credentials: false`, `permissions: contents: read` por padrão | `.github/workflows/curriculum.yml` | nenhuma | sim (boa prática) |
| Sem `package-lock.json` versionado; sem `pre/postinstall` em nenhum `package.json` | `phases/19-.../code/ts/package.json` (13 arquivos) | nenhuma | sim |
| `outputs/` (skills/prompts/agents/mcp) está **vazio** no repo (só `.gitkeep`); artefatos reais vivem em `phases/**/outputs/` | `outputs/index.json` | nenhuma | n/a |
| Sem padrões de injeção de prompt hostis; os "hard rejects/refusal rules" dos skill-*.md são guardrails defensivos legítimos | `phases/**/outputs/skill-*.md` | nenhuma | sim |

## Conclusão
Repositório educacional bem-engenheirado (curso "AI Engineering from Scratch"), MIT, sem segredos,
sem execução remota, sem exfiltração, CI endurecido. Nada bloqueia leitura/absorção.
Veredito **SAFE** — pode seguir para inventário e mapeamento sem ressalvas de segurança.
