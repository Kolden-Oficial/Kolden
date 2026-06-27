# Playwright MCP — Referência de Uso (vendor inerte)

**Playwright MCP** (`@playwright/mcp`, Microsoft) é um **servidor MCP (stdio) de controle de navegador**
via Playwright, com ~68 tools: navegação e ciclo de vida de página/abas, interação determinística pela
**árvore de acessibilidade** (click/type/fill_form/upload/drag), snapshot/screenshot/console/PDF,
inspeção e mock/intercept de rede, cookies + localStorage/sessionStorage + `storage_state`, mouse por
coordenadas, asserções de QA (`verify_*`), tracing/vídeo/anotação e config com **redação de segredos**
nas respostas. Categoria: Browser / engenharia de agentes.

> **Status:** `vendor-registrado (não instalado)`. É a **alternativa local-first e soberana ao
> Browserbase** (que é cloud/SaaS): roda local, é determinístico (acessibilidade, não visão), granular e
> Apache-2.0. **Complementa, não substitui** o Browserbase. **Nada instalado, código não copiado.**
> Quarentena gitignored: `Caos/_staging/quarentena/microsoft--playwright-mcp/`.

---

## Como consumir (NÃO copiar o código)

Servidor MCP publicado no npm — consumir via `npx`, sem instalação permanente:

```bash
# Registrar o MCP no Claude Code (local-first)
claude mcp add --scope user playwright -- npx -y @playwright/mcp@latest

# Variações úteis (flags do servidor)
#   --headless            roda sem janela
#   --isolated            perfil descartável (sem persistir sessão)
#   --device "iPhone 15"  emula dispositivo
#   --config <arquivo>    config (inclui a feature `secrets` de redação)
```

Depois de registrado, as tools aparecem como `browser_navigate`, `browser_click`, `browser_snapshot`,
`browser_network_requests`, etc. (~68 no total).

---

## Licença + procedência

| Campo | Valor |
|-------|-------|
| Licença | **Apache-2.0** (Microsoft) |
| Repositório | https://github.com/microsoft/playwright-mcp |
| SHA analisado | `2d446f9e1b79886103c79406b81cc5408364487a` |
| Veredito de segurança (F2) | **SAFE** — repo é distribuição npm enxuta (wrapper + README); sem `postinstall`, sem segredos (a "secrets" é *feature* de redação); `execSync` só em tooling de manutenção/teste. Lógica real vive em `playwright-core` (externo). |

---

## Ressalvas (soberania / gates / Infisical)

- **🚩 GATE OBRIGATÓRIO — `browser_run_code_unsafe` e `browser_evaluate` (RCE-equivalente):** executam
  **JavaScript arbitrário** na página por design. **Manter desabilitadas por padrão**; só habilitar com
  **allowlist explícito** e com o navegador rodando **isolado** (container / perfil `--isolated`
  descartável). Tratar todo código avaliado como não-confiável. (Gancho de guardrail → **Égide**.)
- **`--no-sandbox`** no Dockerfile padrão: aceitável **apenas** em container isolado.
- **Soberania:** roda **local** — vantagem direta sobre o Browserbase (cloud). Preferir este para tarefas
  de navegador que não exijam a infra anti-bot gerenciada do Browserbase.
- **Feature `secrets`:** mascara texto sensível nas respostas das tools — referência de privacidade para
  guardrails de vendors (gancho → Égide).
- **Sem credencial Infisical** para o servidor em si; se automatizar logins, os segredos do alvo vêm via
  Infisical, nunca em texto puro.

---

## Notas Kolden

- **Governança:** Dédalo (eng. de agentes). **Consumo:** Argos (coleta/automação de navegador local).
- Distinto dos vendors de browser já existentes: **Browserbase** (cloud, visão-LLM, 6 tools high-level),
  **vendor-crawlee** (pool de crawl JS), **vendor-skyvern** (visão LLM, AGPL-3.0). Playwright MCP é
  local-first, determinístico e granular — vendor novo, não REUSE.
- Ganchos ADAPT registrados: asserções `verify_*` como técnica de QA de UI (Dédalo/Prometeu); feature
  `secrets` como referência de privacidade (Égide). Vendor inerte — não vira agente.

---

> Atribuição: descrição e superfície de uso derivadas de `microsoft/playwright-mcp`@`2d446f9`
> (Apache-2.0). Sem cópia de código — apenas o consumo (MCP via npx) está documentado.
