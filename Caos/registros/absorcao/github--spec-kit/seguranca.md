# F2 — Segurança estática — github--spec-kit

- **slug:** github--spec-kit
- **sha:** b7e67f55bf7a937aaa57dbe0a8198774e285de3a
- **url:** https://github.com/github/spec-kit
- **rota:** A (toolkit oficial GitHub — Spec-Driven Development)
- **veredito:** **SAFE**
- **análise:** 100% estática (Read/Grep/Glob/ls). Nada foi executado.

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `subprocess.run(..., shell=True)` no executor de passo "shell" do workflow engine (roda comando arbitrário vindo do YAML de workflow) | `src/specify_cli/workflows/steps/shell/__init__.py:34-36` | média | NÃO — é código do vendor CLI, não vira agente; só perigoso se rodar workflows de terceiros (o próprio NOTE alerta "review before use") |
| `subprocess.run` para invocar CLIs de agentes/git/az (auth Azure DevOps, Copilot, integrações) | `authentication/azure_devops.py:59`, `integrations/base.py:314,331`, `integrations/copilot/__init__.py:251,268` | baixa | NÃO — tooling legítimo do instalador CLI |
| `urllib.request.urlopen` para auth GitHub/Azure e download de templates (`specify init`) | `authentication/http.py:188`, `authentication/azure_devops.py:112`, `_github_http.py` | baixa | NÃO — HTTP de autenticação/bootstrap; sem exfiltração; redirect-handler até remove auth em redirect (`_StripAuthOnRedirect`) |
| Catálogos de extensões/presets referenciam `catalog_url` remoto (raw.githubusercontent) | `extensions/catalog.json:4`, `presets/catalog.*.json` | baixa | NÃO — dado inerte (URL de catálogo oficial) |
| Sistema de extension-hooks (`before_/after_` comando) instrui o agente a emitir `EXECUTE_COMMAND:` | `templates/commands/*.md` | baixa | PARCIAL — padrão de orquestração; absorvível como técnica, não como execução automática |

**Conclusão (1):** Repositório oficial do GitHub (LICENSE MIT, `Copyright GitHub, Inc.`), sem segredos hardcoded, sem `postinstall/preinstall`, sem `curl|bash`, sem `eval`/`os.system`, sem rede de exfiltração. Todo `subprocess`/`urllib` é tooling legítimo de um CLI que faz bootstrap de projetos SDD e invoca CLIs de ~40 agentes de IA.
**Conclusão (2):** O único ponto de atenção é o `shell=True` do workflow-engine — risco apenas em execução dinâmica de workflows de terceiros, que NÃO ocorre nesta absorção (absorvemos métodos-prompt/templates, não o engine). Veredito **SAFE**; nada bloqueia a fase de mapeamento.
