---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/safishamsi--graphify/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/safishamsi--graphify/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática — safishamsi--graphify

- **slug:** safishamsi--graphify
- **sha:** 8994b5500c9ff1e4d2314cb78abfce56f524a215
- **url:** https://github.com/safishamsi/graphify
- **rota:** A (skill/agente) — na prática é uma **ferramenta/framework Python distribuída como skill** de agente de IA.
- **veredito:** **SAFE**
- **data:** 2026-06-26 (análise) — execução 2026-06-27
- **método:** 100% estático (Read/Grep/Glob/ls). Nenhum código executado. Sem web.

## Tabela de achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `subprocess.run(["gh", ...])` — invoca GitHub CLI para PRs/triage (sem `shell=True`, args em lista) | graphify/prs.py:143,165,232,301 | baixa | sim (feature legítima) |
| `subprocess.run` para backend Claude CLI (shell-out a sessão Claude Code como LLM) | graphify/llm.py:1156,1909 | baixa | sim |
| `subprocess.Popen` detached para auto-rebuild do grafo (hook git post-commit) | graphify/hooks.py:196,198,200 | baixa | sim (só roda se o usuário instalar o hook explicitamente) |
| `subprocess.run` AST extraction em workers paralelos | graphify/extract.py:6121,12859+ | baixa | sim |
| `subprocess.run(["git", ...])` introspecção (sem shell) | graphify/google_workspace.py:110; prs.py | baixa | sim |
| Matches de `token/secret/password` | graphify/detect.py:98-254 | nenhuma | n/a — é o **detector de segredos** do próprio tool (pula arquivos sensíveis do corpus) |
| Sem `eval`/`exec`/`os.system`/`shell=True`/`pickle.load`/`curl\|bash` em todo o código-fonte | — (grep vazio) | — | — |
| Sem chaves/segredos hardcoded (nenhum `sk-`, `AKIA`, `BEGIN PRIVATE KEY`) | — (grep vazio) | — | — |
| `postinstall`/`preinstall`: inexistentes (projeto Python `pyproject.toml`, sem npm) | pyproject.toml | nenhuma | n/a |
| Defesas anti-injeção embutidas: `<untrusted_source>` com sha256, `_neutralise_injection_sentinels()`, `sanitize_label()`, `validate_url()` (bloqueia loopback/metadata), `validate_graph_path()` | SECURITY.md; graphify/security.py; graphify/llm.py | — (positivo) | sim — vira **técnica absorvível** |
| Dev-deps de segurança: `bandit`, `pip-audit`, `safety`, `pyright`, `ruff` | pyproject.toml:84-102 | — (positivo) | — |
| **Hygiene de quarentena:** `.git/` NÃO foi removido (protocolo F1 manda remover); `.DS_Store` presentes | raiz da quarentena | informativa | não-absorvível (lixo) |

## Conclusão

Ferramenta de desenvolvimento **local e madura** (v0.8.49, pacote PyPI `graphifyy`, MIT), com modelo de ameaça documentado em SECURITY.md e defesas reais de SSRF, path-traversal, XSS e prompt-injection. Todo `subprocess` é parametrizado por lista (sem `shell=True`), invocando binários conhecidos (`gh`, `git`, `claude`, o próprio Python) — nenhum download-and-exec, nenhuma exfiltração; rede só no `ingest` de URL explícita do usuário, atrás de `validate_url`.
Único reparo operacional: a quarentena ainda contém `.git/` (remover antes de qualquer escrita) — é higiene, não risco. Veredito **SAFE**; o único componente que executa por conta própria (hook git post-commit de auto-rebuild) é opt-in e não deve ser absorvido como tal.
