---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/harry0703--MoneyPrinterTurbo/briefing-de-execucao|briefing-de-execucao]]"
  - "[[Caos/registros/absorcao/harry0703--MoneyPrinterTurbo/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/harry0703--MoneyPrinterTurbo/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática — harry0703--MoneyPrinterTurbo

- **slug:** harry0703--MoneyPrinterTurbo
- **sha:** ad6aabfeb94f16f35474058d9c3e1f74ce66e9d4
- **rota:** B (ferramenta/vendor)
- **veredito:** SAFE
- **data:** 2026-06-26 · análise 100% estática (nenhum código executado)

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `subprocess.run` invocando ffmpeg (sondagem de encoders, concatenação/render) — comando montado de config interna, **sem `shell=True`** | app/services/video.py:183, video.py:347, voice.py:309 | baixa | sim (uso legítimo de ffmpeg; vendor inerte) |
| Sem `eval`/`exec`/`os.system`/`pickle.loads`/`__import__` dinâmico em todo o código-fonte | — (grep vazio) | nenhuma | n/a |
| Sem `shell=True` em qualquer subprocess | — (grep vazio) | nenhuma | n/a |
| Sem segredos/chaves hardcoded; todas as credenciais vêm de `config.toml` (não versionado) via `config.app.get(...)` | app/services/upload_post.py:18-23, config.example.toml | nenhuma | n/a |
| Sem hooks `postinstall`/`preinstall`; sem `curl\|bash` / download+exec | — (grep vazio) | nenhuma | n/a |
| Chamadas de rede a SaaS de terceiros (LLM, TTS, stock, upload social) — todas opt-in por config, mas relevantes p/ **soberania de dados** | material.py, voice.py, upload_post.py, llm.py | média (governança, não malware) | sinalizar ao Ronan |
| Provider opcional `g4f` (gpt4free, não-oficial) **desativado por padrão**; só com `uv sync --extra g4f` | requirements.txt:21-22, llm.py:144 | baixa | não absorver / manter desligado |
| Docker bind em `127.0.0.1` (webui 8501 / api 8080) — não expõe à LAN por padrão | docker-compose.yml | nenhuma (bom default) | n/a |
| `.git/` ainda presente na quarentena (F1 deveria removê-lo) — histórico read-only, sem impacto de execução | ./.git | informativa | limpar na faxina |

**Conclusão (1):** Nenhum vetor de execução arbitrária, exfiltração oculta ou segredo embutido. subprocess restrito a ffmpeg, sem shell. App roda self-hosted (Docker/local), credenciais externas ficam no `config.toml` do operador.
**Conclusão (2):** Veredito **SAFE** como vendor inerte. Ressalva NÃO-de-segurança: o app depende de múltiplas APIs SaaS externas (ver `mapa-de-decisao.md`) — questão de soberania a decidir pelo Ronan, não bloqueio. Manter `g4f` desligado.
