---
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/mcp-solomon/prd|prd]]"
---

# MCP Íris — Solomon para agentes Kolden

Servidor **Model Context Protocol** (MCP) que expõe a API Solomon (`admin-api.solomon.com.br`) como tools para agentes Kolden que atendem à cliente **Rosie**. Cliente-scoped na v1 (ver `adr/0001-path-isolado-por-cliente.md`); promoção condicional para `Dedalo/mcp/solomon/` quando um 2º cliente Kolden adotar Solomon.

- **Nome interno:** `mcp-iris` (`0.1.0`)
- **Stack:** Node ≥20 + TypeScript ≥5.6 + `@modelcontextprotocol/sdk` ≥1.20 + Zod ≥3.24
- **PRD:** [`prd.md`](./prd.md)
- **ADRs:** [`adr/0001-path-isolado-por-cliente.md`](./adr/0001-path-isolado-por-cliente.md), [`adr/0002-stack-node-typescript.md`](./adr/0002-stack-node-typescript.md)
- **Log:** `~/.kolden/mcp-iris/server.log`

---

## Tools expostas (v1)

| Tool | Anotações MCP | O que faz |
|---|---|---|
| `solomon_criar_pedido` | write, idempotent, openWorld | `POST /admin/v1/order` — cria ou atualiza um pedido. Dedup por `orderId + updatedAt`. |
| `solomon_criar_produto` | write, idempotent, openWorld | `POST /admin/v1/product` — cria ou atualiza um produto e suas variantes. Dedup por `productId + updatedAt`. |
| `solomon_sincronizar_catalogo` | write, idempotent, openWorld | Batch de produtos (máx 500) com `max_paralelo` (default 4) e opção `parar_no_primeiro_erro`. Chama internamente `solomon_criar_produto`. |
| `solomon_validar_conta` | read-only, idempotent, openWorld | Retorna metadata (`companyId`, `environment`, timestamp). Cache in-memory TTL 5min. |

Cada tool aceita `verbosidade: "concise" | "detailed"` (default `concise`). `criar_pedido`, `criar_produto` e `sincronizar_catalogo` aceitam também `dry_run: boolean` (valida payload sem chamar a Solomon).

---

## Instalação e build

**Pré-requisito:** Node ≥20 no PATH.

```powershell
cd C:\Kolden\sobre-a-empresa\Projetos\Rosie\mcp-solomon
npm install
npm run build
```

Isso gera `dist/index.js` (o entrypoint stdio).

---

## Variáveis de ambiente (Infisical)

O MCP Íris **nunca** lê tokens em texto puro do disco. Segredos vêm em uma de duas formas:

1. **Injeção via shim/CLI** (preferido em produção Kolden — ver `reference_mcp_infisical_sac_shim`). O processo Node encontra as variáveis já em `process.env` no boot.
2. **REST direto ao Infisical** (fallback para dev/eval). Requer `INFISICAL_TOKEN` + `INFISICAL_PROJECT_ID` em `process.env`; o MCP faz `GET /api/v3/secrets/raw/<nome>`.

Paths canônicos no Infisical:

| Path | Uso |
|---|---|
| `/kolden/prod/SOLOMON_TOKEN_API` | Token live (escopos `orders.write` + `products.write`) |
| `/kolden/dev/SOLOMON_TOKEN_API` | Token sandbox — usado pelo `npm run eval` |
| `/kolden/prod/SOLOMON_COMPANY_ID_ROSIE` | `caOEzYj1TqRM0r3nHrFP` (público, mas mantido no Infisical por consistência) |

Ambiente é controlado por `SOLOMON_ENV=live` ou `SOLOMON_ENV=sandbox` (default `live`).

`.env.example` está versionado como referência; **nunca versione `.env`** (está no `.gitignore`).

---

## Registrar no Claude Code

Depois do build:

```powershell
claude mcp add mcp-iris `
  --scope user `
  -- node "C:\Kolden\sobre-a-empresa\Projetos\Rosie\mcp-solomon\dist\index.js"
```

Para rodar com Infisical CLI:

```powershell
claude mcp add mcp-iris `
  --scope user `
  -- infisical run --env=prod -- node "C:\Kolden\sobre-a-empresa\Projetos\Rosie\mcp-solomon\dist\index.js"
```

Reinicie o Claude Code depois. Verifique com `/mcp`.

---

## Smoke test e eval

Depois do build:

```powershell
# Smoke — handshake MCP + tools/list (não chama a Solomon)
npm run smoke

# Eval — 10 tarefas do PRD §Eval (requer token sandbox no ambiente)
$env:SOLOMON_ENV = "sandbox"
npm run eval
```

O eval usa `/kolden/dev/SOLOMON_TOKEN_API`. Sem token, os cenários 05/08/10 assertam `SEGREDO_AUSENTE`/`TOKEN_INVALIDO` (ainda passa dentro do critério `codigos_erro_aceitos`).

Saída típica:

```
PASS  01-criar-pedido-valido
PASS  02-criar-produto-3-variantes
...
=== 10/10 testes passaram  |  maturity=10.0 ===
```

Meta de gate 7 do PRD: `maturity ≥ 7.0`.

---

## Estrutura de arquivos

```
mcp-solomon/
├── package.json                # bin: mcp-iris → dist/index.js
├── tsconfig.json               # ES2022 strict, moduleResolution: Bundler
├── .gitignore
├── .env.example
├── README.md
├── prd.md                      # Fonte de verdade (não editar via código)
├── registros/                  # Ritual do Caos (Fases 0-2, etc.)
├── adr/
│   ├── 0001-path-isolado-por-cliente.md
│   └── 0002-stack-node-typescript.md
├── src/
│   ├── index.ts                # Boot stdio
│   ├── server.ts               # registerTool × 4 + envolverErros
│   ├── lib/
│   │   ├── log.ts              # JSON append em ~/.kolden/mcp-iris/server.log
│   │   ├── erros.ts            # KoldenError + factories nomeadas
│   │   ├── infisical.ts        # Fallback env → REST direto → SEGREDO_AUSENTE
│   │   ├── cache.ts            # TTL 5min in-memory (dedup + validação)
│   │   └── solomon-client.ts   # fetch + retry/backoff + dedup + probe
│   ├── schemas/
│   │   ├── comum.ts            # timestamp Solomon, verbosidade, dry_run, moeda, UF, país
│   │   ├── pedido.ts           # PedidoSolomonSchema (mapeia docs/07)
│   │   └── produto.ts          # ProdutoSolomonSchema (mapeia docs/08)
│   └── tools/
│       ├── criar-pedido.ts
│       ├── criar-produto.ts
│       ├── sincronizar-catalogo.ts
│       └── validar-conta.ts
└── eval/
    ├── smoke-stdio.mjs         # Handshake MCP + tools/list
    ├── perguntas.yaml          # 10 tarefas do PRD §Eval
    └── rodar-eval.mjs          # Runner com maturity score
```

---

## Guardrails ativos

- **pt-BR** em toda description, mensagem de erro, comentário
- **Zod `.strict()`** em todos os inputs; `.describe()` obrigatório em todo campo público
- **`KoldenError`** em 100% dos handlers via wrapper `envolverErros`
- **Log em arquivo** (`~/.kolden/mcp-iris/server.log`) — nunca stdout (quebraria stdio MCP)
- **Zero `console.log/error/warn`** em `src/`
- **Sanitização de token** — `redigirToken()` mostra só 6 primeiros chars + reticências em log
- **Cache TTL 5min** — dedup por `(id, updatedAt)` + metadata de validação
- **Retry** — backoff exponencial em 429/5xx (3 tentativas com jitter); sem retry em 4xx≠429; sem retry em falha pré-HTTP
- **Sanidade de conta** — se um dia a Solomon retornar `companyId ≠ esperado`, `contaIncorreta()` aborta a chamada

---

## Handoff

| Papel | Responsável |
|---|---|
| Dono técnico | Ronan Silva (`adm@kolden.com.br`) |
| Executor operacional | Peitho / pixel-specialist |
| Aprovação de produção | Ronan (manual, via `claude mcp add`) |
| Escala em incidente | Ronan + Caos |

Backlog v2 (fora do escopo v1): leitura de pedidos, atribuição multi-canal, webhooks, health-endpoint real quando a Solomon expuser.
