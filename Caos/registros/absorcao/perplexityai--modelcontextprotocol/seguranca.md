---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/perplexityai--modelcontextprotocol/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/perplexityai--modelcontextprotocol/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática (F2) — perplexityai--modelcontextprotocol

- **slug:** perplexityai--modelcontextprotocol
- **sha:** 7c8993499c808e5b3c11b8c16736687ecef0f457
- **rota:** D (Framework/MCP grande)
- **veredito:** **SAFE**

Servidor MCP oficial da Perplexity (`@perplexity-ai/mcp-server` v0.9.0), TypeScript. Wrapper fino sobre a API
`api.perplexity.ai` (chat/completions + search). Análise 100% estática; código NÃO executado.

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| API key lida só de env (`PERPLEXITY_API_KEY`), nunca hardcoded | src/server.ts:14, src/index.ts:6, src/http.ts:191 | info | sim (boa prática) |
| Sem `eval`/`exec`/`child_process`/`spawn`/`os.system` no código-fonte | src/ (grep limpo) | info | n/a |
| Sem hooks `postinstall`/`preinstall`; só `prepare: npm run build` (tsc) padrão | package.json:37-50 | info | n/a |
| `cross-spawn` aparece só como dep transitiva em package-lock | package-lock.json:588,1797 | info | não (ruído de lockfile) |
| "Segredos" detectados são apenas fixtures de teste (`"test-api-key"`) | src/http.config.test.ts:18, src/transport.test.ts:16 | info | não |
| Saída de rede ÚNICA = host Perplexity (base URL trocável via `PERPLEXITY_BASE_URL`) | src/server.ts:15,76 | baixa | sim (atenção: base URL configurável permite redirecionar tráfego) |
| Suporte a proxy via env (`PERPLEXITY_PROXY`/`HTTPS_PROXY`/`HTTP_PROXY`) | src/server.ts:18-39 | info | sim (técnica útil p/ redes corporativas) |
| Modo HTTP: default loopback-only (`127.0.0.1`), allowlist de Host (421) + CORS restritivo (403) | src/http.ts:41-123,202 | info | sim (padrão de hardening exemplar) |
| Scripts `*:UNSAFE-public` expõem `0.0.0.0`/`ALLOWED_ORIGINS=*` — opt-in explícito, com banner de aviso e SECURITY.md | package.json:43,46; src/http.ts:26-36 | baixa | sim (risco isolado e sinalizado pelo próprio repo) |
| Dockerfile usa `npm install/ci --ignore-scripts` (bloqueia scripts de deps) | Dockerfile:8,24 | info | sim (boa prática) |
| Pasta legada `perplexity-ask/` = só um `package.json` stub v0.2.0 (axios/dotenv), sem código | perplexity-ask/package.json | info | não (resíduo de naming antigo) |

**Conclusão 1:** Nada que execute código arbitrário, baixe-e-execute, ou exfiltre dados; todo tráfego vai para a
API da Perplexity (host configurável), autenticado por env. Licença MIT, autoria oficial Perplexity. Repo bem construído,
com SECURITY.md e hardening de rede no modo HTTP.
**Conclusão 2:** Riscos são apenas configurações opt-in já sinalizadas pelo próprio repo (`BIND_ADDRESS=0.0.0.0`,
`ALLOWED_ORIGINS=*`, `PERPLEXITY_BASE_URL` customizável). Veredito **SAFE** — absorvível como vendor inerte.
