---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Solomon — Referência de Uso

A **Solomon** é uma plataforma brasileira de analytics e atribuição para e-commerce que rastreia a jornada completa do cliente (do primeiro toque ao pagamento) via SDK web/mobile + API REST de ingestão de pedidos e produtos, e atribui cada venda ao canal de marketing que realmente a gerou. Categoria: Analytics de atribuição para e-commerce (fonte de verdade de tracking, complemento server-side ao Pixel/CAPI).

---

## Credenciais (Infisical)

**Secrets** (regra Art. VII — só o caminho, nunca o valor):

| Credencial | Caminho Infisical |
|------------|-------------------|
| SOLOMON_TOKEN_API (Live) | `/kolden/prod/SOLOMON_TOKEN_API` ✅ |
| SOLOMON_TOKEN_API (Sandbox) | `/kolden/dev/SOLOMON_TOKEN_API` ✅ |

**IDs públicos por cliente** (não são secrets — companyId aparece publicamente na URL do painel; documentamos o valor pra facilitar consumo pelo MCP/SDK):

| Cliente | companyId | Caminho Infisical (espelho) |
|---------|-----------|------------------------------|
| **Rosie** | `caOEzYj1TqRM0r3nHrFP` | `/kolden/prod/SOLOMON_COMPANY_ID_ROSIE` ✅ |

> Art. VII (Constituição Kolden): valores de secrets NUNCA em arquivo — só o caminho. `companyId` é público (aparece em Configurações > Detalhes da Conta > ID da Loja), então pode ser documentado aqui. Resolver secrets em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=<prod|dev> -- <comando>`. A chave secreta é exibida **uma única vez** na criação; perdeu, regenera.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.solomon.com.br |
| Início rápido | https://docs.solomon.com.br/quickstart |
| Autenticação | https://docs.solomon.com.br/authentication |
| Referência da API | https://docs.solomon.com.br/api-reference/introduction |
| OpenAPI spec | https://docs.solomon.com.br/api-reference/openapi.json |
| Site institucional | https://solomon.com.br |
| SDK web (npm) | https://www.npmjs.com/package/@solomon-tech/events |
| SDK mobile (npm) | https://www.npmjs.com/package/@solomon-tech/events-react-native |

---

## MCP (Model Context Protocol)

**Dois MCPs coexistem, escopos distintos.** Use os dois em conjunto.

### 1. MCP oficial da Solomon (leitura — primário)

- **Disponível?** sim — **oficial da Solomon** (mantido pela Solomon; artigo do Nathan Lacerda, 2026-02-25)
- **Tutorial oficial:** https://intercom.help/solomon-d7e33f0728c8/pt-BR/articles/13860266-como-integrar-com-o-mcp-da-solomon
- **URL do servidor:** `https://mcp-solomon-685646918301.us-east1.run.app/mcp` (Cloud Run, região us-east1)
- **Transport:** HTTP remoto
- **Autenticação:** OAuth interativo com login Solomon (e-mail + senha da conta) — 1 sessão OAuth = 1 conta Solomon; multi-cliente exige múltiplos scopes
- **Escopo:** leitura de dados de negócio via conversação — faturamento, campanhas por plataforma, funil de conversão, atribuição multi-canal. Endpoints internos do MCP oficial, não expostos na `openapi.json` pública
- **Perguntas de exemplo:** "Qual foi meu faturamento este mês?" · "Quais são minhas top campanhas no Facebook?" · "Me mostra o funil de conversão da última semana"
- **Instalação (Claude Code CLI):**
  ```powershell
  claude mcp add solomon --scope user --transport http https://mcp-solomon-685646918301.us-east1.run.app/mcp
  ```
  Depois `/mcp` no chat → clicar em `Autenticar` → OAuth abre no browser → logar com a conta Solomon do cliente-alvo.
- **Instalação (Claude Web/Desktop):** `+` no campo de mensagem → Conectores → Gerenciar conectores → Adicionar conector personalizado → Nome: Solomon · URL: `https://mcp-solomon-685646918301.us-east1.run.app/mcp` → Vincular → login.

### 2. MCP Íris — custom Kolden (ingestion — complementar)

Cobre o gap do MCP oficial: **write server-to-server via Bearer token** (não OAuth). Para agentes Kolden ingerirem pedidos/produtos programaticamente (ex: GTM Server chamando `POST /order` no webhook Nuvemshop, ou Peitho/pixel-specialist sincronizando catálogo).

- **Disponível?** sim — **custom Kolden** (construído via Ritual do Caos 2026-07-01)
- **Path do código:** `C:\Kolden\sobre-a-empresa\Projetos\Rosie\mcp-solomon\` (isolado por cliente — ver ADR 0001)
- **Nome interno:** `mcp-iris` (server MCP name + binário)
- **Runtime:** Node ≥20 · TypeScript ≥5.6 · `@modelcontextprotocol/sdk ^1.20.0` · `zod ^3.24.0`
- **Transport:** stdio local (não remoto)
- **Autenticação:** Bearer token de servidor via Infisical (`/kolden/<env>/SOLOMON_TOKEN_API`) — headless, roda em pipeline
- **Escopo v1:** write-only (a API pública Solomon expõe apenas `POST /order` + `POST /product`)
- **4 tools:**
  - `solomon_criar_pedido` — cria/atualiza pedido com dedup por `orderId+updatedAt`
  - `solomon_criar_produto` — cria/atualiza produto+variantes com dedup por `productId+variantId+updatedAt`
  - `solomon_sincronizar_catalogo` — batch com controle de concorrência (`max_paralelo` 1-10, teto 500 produtos)
  - `solomon_validar_conta` — probe leve (sem HTTP, valida presença de segredos + cache 5min)
- **Instalação:**
  ```powershell
  cd C:\Kolden\sobre-a-empresa\Projetos\Rosie\mcp-solomon
  npm install; npm run build
  claude mcp add mcp-iris --scope user -e SOLOMON_COMPANY_ID_ROSIE=caOEzYj1TqRM0r3nHrFP `
    -- node "$env:USERPROFILE\.claude\infisical-shim.cjs" run `
       --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod `
       -- node C:\Kolden\sobre-a-empresa\Projetos\Rosie\mcp-solomon\dist\index.js
  ```
  (env `dev` para sandbox)
- **Eval:** 10 tarefas em `eval/perguntas.yaml`; maturity **10.0/10** (2026-07-01, sandbox `/kolden/dev/`)
- **ADRs:** 0001 (path isolado por cliente + promoção condicional) e 0002 (Node/TS)

### Quando usar qual

| Necessidade | Use |
|---|---|
| "Qual o ROAS da Rosie no Meta este mês?" | **oficial** (leitura conversacional) |
| Peitho/pixel-specialist sincroniza catálogo Nuvemshop → Solomon | **Íris** (write batch programático) |
| GTM Server chama `POST /order` no webhook `order/paid` | HTTP direto ou **Íris** (dedup local) |
| "Me mostra o funil de conversão da última semana" | **oficial** |
| Ingestion de pedidos de sonda para validar SDK web | **Íris** |

---

## Uso básico

- **Base URL:**
  - Live (produção): `https://admin-api.solomon.com.br`
  - Sandbox (teste): `https://admin-api.sandbox.solomon.com.br`
  - Versão do path: `/admin/v1`
- **Autenticação:** Bearer no header `Authorization`. API Keys geradas para Sandbox **não funcionam** em Live e vice-versa. Cada key é vinculada a uma loja e a um conjunto de escopos (`orders.write`, `products.write`).
- **Processamento:** assíncrono. Ingestão retorna `202 Accepted`; fila esvazia em **até 10 minutos**. Idempotência garantida por `orderId`+`updatedAt` (pedido) / `productId`+`variantId`+`updatedAt` (produto). `updatedAt` **em UTC** obrigatório.
- **Exemplo mínimo** — enviar pedido em sandbox com credencial injetada pelo Infisical:

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- bash -c '
curl -X POST "https://admin-api.sandbox.solomon.com.br/admin/v1/order" \
  -H "Authorization: Bearer $SOLOMON_TOKEN_API" \
  -H "Content-Type: application/json" \
  -d "{
    \"orderId\": \"ord_teste_001\",
    \"name\": \"Pedido de teste\",
    \"orderStatus\": 0,
    \"createdAt\": \"2026-07-01T12:00:00Z\",
    \"updatedAt\": \"2026-07-01T12:00:00Z\",
    \"totalPrice\": 100.00,
    \"paymentMethod\": 4,
    \"currency\": \"BRL\",
    \"provinceCode\": \"SP\",
    \"countryCode\": \"BR\",
    \"customer\": {\"customerId\":\"cus_1\",\"name\":\"Teste\",\"email\":\"t@t.com\",\"phone\":\"+5511999999999\",\"provinceCode\":\"SP\",\"countryCode\":\"BR\",\"zip\":\"01000-000\",\"city\":\"SP\",\"createdAt\":\"2026-07-01T12:00:00Z\",\"updatedAt\":\"2026-07-01T12:00:00Z\"},
    \"items\": [{\"item_id\":\"i1\",\"productId\":\"p1\",\"variantId\":\"v1\",\"quantity\":1,\"price\":100.00,\"createdAt\":\"2026-07-01T12:00:00Z\",\"updatedAt\":\"2026-07-01T12:00:00Z\"}]
  }"
'
```

Docs internas por página em [`docs/`](docs/README.md).

---

## Notas Kolden

- **Cliente Rosie:** Solomon é a **primary tracking source** do e-commerce Rosie na Kolden — envia eventos web/mobile ao vivo, ingere pedidos server-to-server e devolve atribuição multi-touch por canal (Meta, Google, orgânico, direto). Complementa (não substitui) o Meta CAPI para os funis já rodando.
- **Diferença vs CAPI Meta puro:** Solomon é **multi-canal e neutro** — a CAPI envia eventos SÓ para a Meta; Solomon rasteia a jornada inteira e atribui a **qualquer** canal, mantendo os dados no dono da loja (soberania). Além disso, cobre catálogo de produtos e pedidos (não só conversões), permitindo cohort e funil de produto.
- **Ambientes obrigatórios:** dev do Kolden usa Sandbox; produção do cliente usa Live. Nunca cruzar API Keys.
- **Company ID ≠ API Key:** `companyId` (20 caracteres alfanuméricos, público, visível em Configurações > Detalhes da Conta) alimenta o SDK no navegador; a **API Key** só existe no servidor e roda via Infisical.
- **Server-side cookie:** para atribuição confiável de longo prazo, gerar cookie first-party de 365 dias no servidor e enviá-lo como `user_id` em todo evento e no `userId` do pedido (ver [`docs/03-eventos-conceitos.md`](docs/03-eventos-conceitos.md)).
- **Escopos mínimos:** conceder só `orders.write` + `products.write` por integração. Nunca embarcar API Key em frontend.
- **Dois MCPs coexistem:** oficial da Solomon (leitura, OAuth remoto) + Íris custom Kolden (ingestion write, Bearer local). Ver seção MCP acima. Descoberta do oficial 2026-07-01 (após Ronan apontar tutorial no Intercom da Solomon) reclassificou Íris como complementar, não substituto — código do Íris permanece válido para o escopo write server-to-server.