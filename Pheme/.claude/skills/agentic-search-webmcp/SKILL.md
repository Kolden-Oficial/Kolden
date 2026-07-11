---
name: agentic-search-webmcp
description: >
  Prepara o site/produto para AGENTES DE IA operarem sobre ele — não só lerem, mas
  agirem. Cobre o padrão WebMCP (Model Context Protocol para superfícies web),
  desenho declarativo vs. imperativo, exposição de ferramentas seguras para o
  agente e mapa de fricção passo a passo (o que trava um agente na jornada). Use
  quando o pedido for "meu site precisa funcionar para agentes de IA", "MCP web",
  "WebMCP", "agentic search", "Comet/Manus/Operator no meu site", "meu formulário
  quebra o agente" ou "expor tools ao ChatGPT/Claude". É a camada de AÇÃO —
  complementa `aeo-foundations-architect` (leitura) e `geo-citacoes-ia` (citação).
metadata:
  type: reference
tipo: skill
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
---

# Agentic Search & WebMCP — do site "lido" ao site "operado"

Passamos de "IA responde perguntas" para "agente completa tarefa no seu site".
Comet, Operator, Manus, agentes internos de empresas — todos precisam de
**interface previsível**. Se o seu site é hostil ao agente, o agente vai comprar
no concorrente.

## Antes de começar
Levante:
- **Jornadas críticas** que o agente PRECISA conseguir completar (buscar produto,
  agendar reunião, checar preço, fazer download, iniciar checkout).
- **Superfícies-alvo** (site institucional, e-commerce, docs, app SaaS).
- **Grau de exposição desejado**: só leitura curada, leitura + ações safe, leitura
  + ações transacionais.

## Dois modos de operar

### Modo A — Declarativo (recomendado como default)

O site expõe ferramentas via **WebMCP** — servidor MCP montado numa URL pública
que declara TOOLS que o agente pode chamar. Cada tool tem:
- `name` — verbo + substantivo curto (`search_products`, `check_stock`, `book_slot`).
- `description` — 1-2 linhas em linguagem natural, o que faz e quando usar.
- `inputSchema` — JSON Schema estrito.
- Handler que responde JSON estruturado.

Vantagem: o agente NÃO precisa "adivinhar" o DOM. Ele lê o manifesto, decide qual
tool chamar, passa parâmetros, recebe resposta. Falha cai de ~60% (DOM scraping)
para <5% (tool bem definida).

### Modo B — Imperativo (fallback para sites legados)

O agente lê o DOM e clica/preenche. Aqui a briga é ergonomia:
- **Labels reais** em cada `<input>` e `<button>`.
- **`aria-label`** quando o rótulo é icônico.
- **Estados de loading previsíveis** (`disabled` + `aria-busy`, não spinner nu).
- **Sem CAPTCHAs em fluxos críticos** ou CAPTCHA que aceite Privacy Pass.
- **Sem modais que sobem sem gatilho claro** (cookie banner que reabre a cada rota
  quebra o agente).

## Anatomia mínima de um WebMCP

Endpoint HTTP (streamable ou SSE) na raiz de subdomínio dedicado, por exemplo
`https://mcp.exemplo.com`. Manifesto responde:

```json
{
  "mcpVersion": "2025-06-18",
  "tools": [
    {
      "name": "search_products",
      "description": "Busca produtos por termo. Retorna até 10 resultados com preço em BRL.",
      "inputSchema": {
        "type": "object",
        "properties": { "query": { "type": "string" }, "limit": { "type": "number", "default": 10 } },
        "required": ["query"]
      }
    },
    {
      "name": "check_stock",
      "description": "Verifica disponibilidade de um SKU. Retorna estoque atual e prazo de entrega.",
      "inputSchema": {
        "type": "object",
        "properties": { "sku": { "type": "string" } },
        "required": ["sku"]
      }
    }
  ]
}
```

**Regra de ouro do desenho:** cada tool é IDEMPOTENTE onde possível. `search_products`
pode rodar 10 vezes sem efeito colateral. `book_slot` tem efeito colateral — protege
com token de confirmação separado (`prepare_booking` retorna `token`; `confirm_booking`
consome o `token`; agente pergunta ao usuário antes de confirmar).

## Mapa de fricção — checklist passo a passo

Para cada jornada crítica, siga o passo do agente e cate onde ele trava:

| Etapa | Fricção típica | Fix |
|---|---|---|
| Descoberta do site | Sem `llms.txt`, sem `robots.txt` claro | Rodar `aeo-foundations-architect` |
| Entrada | Homepage é SPA com CSR puro | SSR/prerender ou tool `describe_home` |
| Navegação | Menu depende de hover / JS pesado | Nav semântica + `<a href>` real |
| Busca interna | Campo `<input>` sem `name` nem submit | `name="q"`, `type="search"`, `<button type="submit">` |
| Filtro | Filtros via chip que só muda estado JS | Sync com querystring (`?cor=preto&tam=M`) |
| Produto | Preço em JS lazy | Renderizar `<meta itemprop="price">` no HTML inicial |
| Adicionar ao carrinho | Requer login social só | Guest checkout + tool `add_to_cart` |
| Checkout | CAPTCHA visual + inputs sem label | Privacy Pass + labels + `autocomplete="cc-number"` |
| Confirmação | Só e-mail, sem página de sucesso | Página `/pedido/{id}` estável |

## Segurança em Modo A (WebMCP)

- **Rate limit por origem/IP** — agentes agressivos derrubam produção.
- **Auth em tool destrutiva** — `book_slot`, `place_order`, `cancel_x` exigem token
  emitido para o usuário atual (OAuth device flow ou magic link).
- **Nunca exponha tool `run_sql` / `admin_*`** no manifesto público.
- **Logging estruturado** — cada chamada de tool registra `tool_name`, `origin`,
  `user_agent`, `latency`, `status`. É o único jeito de auditar quem chamou o quê.
- **Segredos via Infisical** — chaves de integração de pagamento, ERP, agenda.

## Scorecard Agentic (0-100)

| Bloco | Item | Peso |
|---|---|---|
| Discovery | `llms.txt` + `robots.txt` para AI crawlers | 10 |
| Discovery | Manifesto WebMCP público OU DOM legível | 15 |
| Toolkit | Ao menos 3 tools cobrindo jornadas críticas | 15 |
| Toolkit | Idempotência declarada por tool | 10 |
| Toolkit | Confirmação em duas etapas para ações destrutivas | 10 |
| DOM (Modo B) | Labels + aria em inputs/botões | 10 |
| DOM (Modo B) | Sem CAPTCHA hostil em fluxo crítico | 10 |
| Segurança | Rate limit + auth em tool sensível | 10 |
| Observabilidade | Log estruturado por tool | 10 |

## Saída
1. **Mapa da jornada** com pontos de fricção em Modo B.
2. **Manifesto WebMCP** desenhado (lista de tools + inputSchemas).
3. **Plano de rollout**: 3 tools MVP → 6 tools → cobertura completa.
4. **Regra de auth** por tool sensível (documentada).

## Cruzamentos
- **`aeo-foundations-architect`** — pré-requisito (a IA precisa achar o manifesto).
- **`geo-citacoes-ia`** — leitura complementar: agente cita E age.
- **Prometeu / `mcp-builder`** — build técnico do servidor MCP.
- **Égide** — auditoria de segurança das tools expostas.
- **Infisical** — segredos das integrações.

---
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (IDs MKT-G4, G5, G6). Traduzido, reescrito em pt-BR; spec MCP referenciada em modelcontextprotocol.io versão 2025-06-18.
