# F2 — Segurança estática — AgriciDaniel--claude-seo

- **slug:** AgriciDaniel--claude-seo
- **sha:** d830cdb2ad339bb7f062339fe82228b072e98061
- **rota:** A (skill/agente)
- **veredito:** **SAFE**

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `curl -fsSL .../install.sh \| bash` como método de instalação padrão | install.sh:160; README.md:346; docs/INSTALLATION.md:136-139 | média | NÃO — padrão de distribuição de plugin; não absorvemos o instalador, só capacidades |
| `spawnSync(child_process)` no runner de hook (executa Python local p/ validar schema) | hooks/run-python-hook.js:4,33,50 | baixa | parcial — padrão útil (detecção 4-tier de Python), mas é execução; reescrever, não copiar |
| `subprocess.run(...)` em scripts (drift, domínio, iptc, unlighthouse, sync, release) — sempre com `timeout=` e tratamento de `TimeoutExpired` | scripts/drift_baseline.py:166-237; domain_history.py:91; iptc_ai_label.py:76; unlighthouse_run.py:93; sync_flow.py:104; release_sign.py:69 | baixa | sim — uso legítimo e defensivo (Playwright/CLI/git), nunca shell=True nem input não-sanado |
| Saída de rede ampla (`requests`/`urllib`/`socket` em ~30 scripts) | scripts/*.py (139 ocorrências/30 arquivos) | média | sim — todo tráfego é p/ APIs Google/DataForSEO/Moz/Bing e crawl do alvo, **gated por url_safety** |
| Módulo de segurança próprio: SSRF + DNS-rebinding + DNS-pinning (`validate_url`, `validate_url_strict`, `safe_requests_get`) | scripts/url_safety.py:1-40 (30 ocorrências de rede) | — (positivo) | **SIM — capacidade de alto valor** (endurecimento que a Kolden deveria absorver) |
| Credenciais lidas de env/arquivo de config user-space; redação de chave em erros (`_redact_bing_api_key`) | scripts/backlinks_auth.py:90-167; bing_webmaster.py:47-51; google_auth.py | — (positivo) | sim — padrão Infisical-compatível (env/arquivo, nunca hardcoded) |
| Nenhum segredo real hardcoded; único "SECRET" é fixture de teste dummy (`"AI"+"zaSyDUMMYSECRET"`) | tests/test_banana_api_key_safety.py:15 | nenhuma | n/a |
| Sem padrões de injeção de prompt, sem `eval/exec` de código remoto, sem `os.system`, sem download+exec | (varredura global) | — | n/a |

**Conclusão (1):** repositório é um plugin de SEO maduro, com postura de segurança **acima da média** — módulo SSRF/DNS-pin canônico, redação de credenciais, tokens em `0o600`, gate de secret-scan em CI (CHANGELOG l.18) e `SECURITY.md` formal; nada que execute ou exfiltre fora do escopo declarado de SEO.

**Conclusão (2):** os únicos vetores (instalador `curl|bash`, `spawnSync`/`subprocess`) são inerentes a um plugin Claude Code e **não são absorvidos como código** — absorvemos capacidades/padrões reescritos em pt-BR. Veredito **SAFE**; nada bloqueia a fase de mapeamento.
