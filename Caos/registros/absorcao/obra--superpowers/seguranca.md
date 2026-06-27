# Segurança estática — obra--superpowers

- **slug:** obra--superpowers
- **sha:** 896224c4b1879920ab573417e68fd51d2ccc9072
- **url:** https://github.com/obra/superpowers
- **rota:** A (framework de skills/metodologia)
- **veredito:** **SAFE**
- **data:** 2026-06-26

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Hook SessionStart só injeta o texto da skill `using-superpowers` no contexto (lê SKILL.md, escapa JSON, imprime). Sem rede, sem exec de terceiros. | hooks/session-start:1-60 | info | sim (padrão de bootstrap) |
| Wrapper polyglot `.cmd`/bash que localiza o Git Bash e roda o hook nomeado. Caminhos fixos do Git for Windows; sem download. | hooks/run-hook.cmd | info | sim (técnica de portabilidade) |
| `child_process` no servidor de brainstorm usado SÓ para abrir o navegador; opt-in via `BRAINSTORM_OPEN`; usa `execFile` sem shell (argv) p/ evitar injeção. | skills/brainstorming/scripts/server.cjs:537-547 | baixa | sim (com ressalva — ver nota) |
| `BRAINSTORM_OPEN_CMD` roda via `cp.exec` (shell) — documentado como "trusted operator input"; só dispara se o operador setar a env var. | skills/brainstorming/scripts/server.cjs:539-540 | baixa | não-absorvível como está (vetor de exec por env; reescrever sem `exec`/shell se reaproveitar) |
| Servidor HTTP/WebSocket de brainstorm: bind padrão `127.0.0.1` (loopback), checagem de Origin, gate por token (403), limite de frame (10 MB). | skills/brainstorming/scripts/server.cjs:100,397,666,703 | info | sim (zero-dependência, defensivo) |
| `render-graphs.js` chama `execSync('dot -Tsvg')` (Graphviz local) p/ renderizar diagramas das skills. Ferramenta local, sem rede. | skills/writing-skills/render-graphs.js:18,72,112 | baixa | sim (depende de `dot` instalado) |
| `child_process`/`spawn` nos testes apenas sobem o próprio `server.cjs` (harness de teste node). | tests/brainstorm-server/*.test.js | info | sim (não entra em produção) |
| `package.json` SEM `postinstall`/`preinstall`; sem dependências de terceiros (zero-dep por design). LICENSE MIT. | package.json | info | sim |

## Conclusão

Repositório limpo: nenhuma execução remota, exfiltração de rede, segredo hardcoded ou hook de install. Os únicos usos de `child_process` são abrir o navegador (opt-in, execFile sem shell) e renderizar Graphviz local; o único servidor é loopback-only com Origin-check e token.
Veredito **SAFE**. Ressalva isolada e NÃO-ABSORVÍVEL: o atalho `BRAINSTORM_OPEN_CMD` via `cp.exec` (shell) — se algum dia reaproveitarmos o servidor visual, trocar por `execFile` sem shell. O valor real para a Kolden é a metodologia (skills em texto), não o código.
