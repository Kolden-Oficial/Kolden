# F3 — Inventário de capacidades — microsoft--playwright-mcp

- **slug:** microsoft--playwright-mcp · **sha:** 2d446f9e1b79886103c79406b81cc5408364487a · **rota:** D
- **Natureza:** servidor MCP (stdio) de controle de navegador via Playwright. **68 tools** documentadas no
  README (gerado por `update-readme.js`). Inventário ENXUTO: a capacidade-alvo (o servidor MCP) + as tools
  agrupadas em clusters funcionais (cada cluster = 1 ID), pois é vendor inerte, não vira agente.
- Fonte das tools: `README.md` seção "### Tools" (linhas ~830–1556). Lógica real em `playwright-core` (externo).

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Servidor MCP Playwright (vendor): controle de navegador via stdio, transporte MCP, 68 tools, CLI `playwright-mcp` | codigo-mcp | mcp, playwright, browser, navegador, automacao, microsoft | engenharia-de-agentes | package.json; server.json; cli.js; README.md:830 |
| G2 | Navegação e ciclo de vida de página/janela (navigate, navigate_back, tabs, resize, close, wait_for) | ferramenta | navegar, url, abas, tabs, janela, esperar | engenharia-de-agentes | README.md:941,950,1074,989,848,1058 |
| G3 | Interação com elementos via árvore de acessibilidade (click, hover, drag, drop, type, press_key, select_option, fill_form, file_upload, handle_dialog) | ferramenta | clicar, digitar, formulario, upload, arrastar, dialogo | engenharia-de-agentes | README.md:835,931,867,879,1045,980,1009,912,903,921 |
| G4 | Leitura/captura da página ao vivo (snapshot de acessibilidade, screenshot, console_messages, generate_locator, pdf_save) | ferramenta | snapshot, screenshot, leitura, console, locator, pdf, dom | engenharia-de-agentes | README.md:1020,1032,856,1506,1492 |
| G5 | Execução de código arbitrário no navegador (evaluate JS, run_code_unsafe = RCE-equivalente) | ferramenta | evaluate, javascript, codigo, unsafe, rce, script | engenharia-de-agentes | README.md:891,999 |
| G6 | Rede: inspeção + mock/intercept de requisições (network_request, network_requests, route, route_list, unroute, network_state_set) | ferramenta | rede, network, mock, intercept, route, offline | engenharia-de-agentes | README.md:958,969,1117,1131,1139,1108 |
| G7 | Estado de sessão — cookies (get, list, set, delete, clear) | ferramenta | cookies, sessao, estado | engenharia-de-agentes | README.md:1170,1179,1189,1161,1153 |
| G8 | Estado de sessão — localStorage/sessionStorage + storage_state (save/restore) | ferramenta | localstorage, sessionstorage, storage-state, sessao, persistencia | engenharia-de-agentes | README.md:1205-1302 |
| G9 | Coordenadas/mouse de baixo nível (mouse_click_xy, mouse_down, mouse_up, mouse_move_xy, mouse_drag_xy, mouse_wheel) | ferramenta | mouse, coordenadas, xy, scroll, low-level | engenharia-de-agentes | README.md:1424-1477 |
| G10 | Asserções/verificação visual de QA (verify_element_visible, verify_list_visible, verify_text_visible, verify_value) | ferramenta | verificar, assert, qa, teste, visivel, valor | engenharia-de-agentes | README.md:1516,1526,1537,1546 |
| G11 | Observabilidade/debug: tracing, vídeo, anotação/highlight, resume (start/stop_tracing, start/stop_video, video_chapter, annotate, highlight, hide_highlight, resume) | ferramenta | tracing, video, anotacao, highlight, debug, gravacao | engenharia-de-agentes | README.md:1316-1408,1345,1355-1389 |
| G12 | Configuração + redação de segredos nas respostas (get_config; feature `secrets` que mascara texto sensível) | ferramenta | config, secrets, privacidade, redacao, mascarar | engenharia-de-agentes | README.md:1095; config.d.ts:150-154 |

**Total: 12 IDs** (1 servidor-vendor + 11 clusters cobrindo as 68 tools). Granularidade de cluster por ser rota D
(vendor inerte). Lista nominal completa das 68 tools preservada nas linhas-fonte do README citadas.
