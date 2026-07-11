---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/microsoft--playwright-mcp/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/microsoft--playwright-mcp/mapa-de-decisao|mapa-de-decisao]]"
---

# F2 — Segurança estática — microsoft--playwright-mcp

- **slug:** microsoft--playwright-mcp
- **sha:** 2d446f9e1b79886103c79406b81cc5408364487a
- **url:** https://github.com/microsoft/playwright-mcp
- **licença:** Apache-2.0
- **rota:** D (framework/MCP grande)
- **veredito:** SAFE

Análise 100% estática (Read/Grep/Glob). Código não executado. Repo é distribuição npm enxuta
(`@playwright/mcp`): wrapper fino (`cli.js`/`index.js`) + README gerado de 61KB documentando as tools.
A lógica real das tools vive no monorepo `playwright-core` (não está neste checkout — ver `src/README.md`).

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Sem `postinstall`/`preinstall` em package.json (sem hook de install) | package.json | nenhuma | n/a |
| Sem segredos/chaves hardcoded; "secrets" é FEATURE de config (mascara segredos nas respostas das tools) | config.d.ts:150-154; update-readme.js:148 | nenhuma | sim (feature de privacidade — alinhada à soberania) |
| `execSync` apenas em scripts de manutenção/dev (bump de versão, geração de README) | roll.js:3,34,41,46; update-readme.js:21,161 | baixa | não-absorvível (tooling de manutenção, não roda em produção) |
| `child_process.execSync` em testes (`node cli.js …`) | tests/cli.spec.ts:23; tests/library.spec.ts:27 | baixa | não-absorvível (suíte de teste) |
| Tool `browser_run_code_unsafe`: "executes arbitrary JavaScript … RCE-equivalent" (por design, gated por config) | README.md:999-1006 | média | sim-com-guardrail (desabilitar por padrão; só com allowlist explícito) |
| Tool `browser_evaluate`: avalia JS arbitrário na página | README.md:891 | média | sim-com-guardrail (capacidade intencional; tratar como código não-confiável) |
| Dockerfile padrão (node:22-slim, `npm ci --omit=dev`, usuário não-root, headless `--no-sandbox`) | Dockerfile | baixa | sim (ENTRYPOINT usa `--no-sandbox` — aceitável só em container isolado) |
| Workflows CI/publish e devcontainer padrão Microsoft; sem download+exec remoto suspeito | .github/workflows/*.yml; .devcontainer/devcontainer.json | nenhuma | n/a |

**Conclusão (1):** Repositório oficial da Microsoft, Apache-2.0, sem segredos, sem hooks de instalação,
sem exfiltração de rede; os `execSync` são de tooling de manutenção/teste, não de runtime. Veredito **SAFE**.
**Conclusão (2):** O único risco real é de CAPACIDADE, não de código malicioso: `browser_run_code_unsafe`
(RCE-equivalente por design) e `browser_evaluate` executam JS arbitrário — ao registrar como vendor, mantê-las
desabilitadas por padrão e exigir allowlist explícito; o navegador deve rodar isolado (container/perfil descartável).
