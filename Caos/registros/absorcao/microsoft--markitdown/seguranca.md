---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/microsoft--markitdown/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/microsoft--markitdown/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática (F2) — microsoft--markitdown

- **slug:** microsoft--markitdown
- **sha:** e144e0a2be95b34df17433bac904e635f2c5e551
- **url:** https://github.com/microsoft/markitdown
- **rota:** B (ferramenta/vendor)
- **veredito:** **SAFE**

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `subprocess.run` chamando binário `exiftool` para ler metadados (sem shell=True, args fixos) | packages/markitdown/src/markitdown/converters/_exiftool.py:22,41 | baixa | sim (uso legítimo; vendor inerte) |
| `subprocess.run` invocando a CLI nos testes | packages/markitdown/tests/test_cli_*.py | informativa | n/a (teste) |
| Carga de plugins de terceiros via `importlib.metadata.entry_points(group="markitdown.plugin")` — **desabilitado por padrão**, só com `--use-plugins` | packages/markitdown/src/markitdown/_markitdown.py:66,76,263 | baixa | sim (executa código de plugin instalado; controlado por flag) |
| Fetch de rede em conversores de URL (YouTube/Wikipedia/Bing SERP/RSS) — feature documentada | converters/_youtube_converter.py, _wikipedia_converter.py, _bing_serp_converter.py, _rss_converter.py | baixa | sim (I/O esperado da ferramenta) |
| Sem segredos/chaves hardcoded; sem `eval`/`os.system`/`curl\|bash`; sem `postinstall`/`preinstall` | — (grep negativo em packages/*/src e *.json/*.toml) | — | — |
| Dockerfile roda como usuário `nobody:nogroup`, sem privilégios elevados | Dockerfile:23-27 | informativa | — |

**Conclusão (1/2):** Utilitário oficial da Microsoft (MIT), sem código malicioso, sem exfiltração e sem hooks de instalação; o `subprocess` é restrito ao binário `exiftool` e à suíte de testes. O próprio README alerta que o `convert()` faz I/O com os privilégios do processo (SSRF/leitura local se receber input não confiável) — risco operacional do *uso*, não do código.
**Conclusão (2/2):** Como entra na Kolden como **vendor inerte** (não executado por agente, sem ingestão de instruções), o risco residual é nulo. Veredito **SAFE**.
