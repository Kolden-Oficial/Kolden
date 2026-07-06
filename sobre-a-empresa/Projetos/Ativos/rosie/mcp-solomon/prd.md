# PRD — MCP Íris *(a confirmar)* · servidor Solomon para agentes Kolden

| Campo | Valor |
|---|---|
| **Tipo** | **PRD de MCP** (não de agente) |
| Versão | 1.0 (rascunho pendente Gate #2) |
| Data | 2026-07-01 |
| Autor | Ronan Silva + Caos |
| Status | rascunho — aguardando aprovação humana (Art. III da Constituição) |
| Escopo | **cliente** — Rosie (primeira instância; cláusula de promoção condicional para `Dedalo/mcp/solomon/` se 2º cliente adotar) |
| Runtime | Node ≥20 · TypeScript ≥5.6 · `@modelcontextprotocol/sdk ^1.20.0` · `zod ^3.24.0` · `js-yaml ^4.1.0` |
| Nome mitológico proposto | **Íris** (recomendado) · alternativas: **Kléio** · **Mnemósine** |
| Path | `C:\Kolden\sobre-a-empresa\Projetos\Rosie\mcp-solomon\` |
| Milestone | contrato `m-20260701-112935-rosie-90d` · **D+21** (painel Solomon operando + MCP v1) |

---

## 0. Nomeação — Gate #1

**Recomendação:** **Íris** — mensageira dos deuses, personificação do arco-íris que conecta céu e terra. Metáfora: MCP write-only leva eventos/pedidos de agentes Kolden → painel Solomon. Nome livre no registro e nas pastas de raiz.

**Alternativas gregas livres:**
- **Kléio** (Clio) — musa da história; registra os feitos do e-commerce da Rosie.
- **Mnemósine** — titânide da memória; alimenta a memória de 365d da Solomon. Metáfora incompleta para v1 write-only.

Ronan pode manter Íris ou trocar por qualquer nome grego livre (aceito 4ª opção sem replanejar).

---

## 1. Missão

Expor a API Solomon (`https://admin-api.solomon.com.br`) como tools MCP para agentes Kolden que atendem a Rosie e clientes futuros — garantindo autenticação via Infisical, idempotência por dedup, erros acionáveis em pt-BR, e observabilidade estruturada. **v1 é write-heavy** (pedidos + produtos + catálogo + validação de conta); leitura/atribuição/webhooks ficam em backlog v2 quando Solomon expor endpoints públicos.

---

## 2. KPIs — Resultados de sucesso

| KPI | Meta v1 | Como medir |
|---|---|---|
| Latência p95 por tool | ≤ 1500ms (excluindo tempo de rede da API Solomon) | log JSON estruturado em `~/.kolden/mcp-iris/server.log` |
| Taxa de erro por tool | ≤ 5% em condições normais (ignora 401 por token vencido) | `log.warn` de tool + `log.error` de exceção |
| Uptime em stdio | 100% do tempo de sessão MCP; boot < 2s | reboot log + smoke-stdio |
| Cobertura de eval | ≥ 8/10 pass na primeira rodada de `eval/perguntas.yaml` | `npm run eval` |
| **Anti-falha #1** | **0 credencial vazada em log/output** (grep + sanitização) | `sanitizacao-de-saida-de-agente` obrigatória antes de eval |
| **Anti-falha #2** | **0 pedido duplicado enviado** à Solomon quando dedup detectar `updatedAt` antigo | teste 03 do eval + log de dedup ignorado |

---

## 3. Identidade técnica *(substituindo §3 Persona)*

- **Nome:** Íris *(pronúncia: EE-riss)*
- **Tagline:** "A mensageira que leva o e-commerce à Solomon."
- **Tipo:** MCP-server SOLO (não squad, não agente-persona)
- **Runtime:** Node ≥20 / TypeScript ≥5.6 / MCP SDK ≥1.20 / Zod ≥3.24
- **Distribuição:** stdio (padrão MCP) + `bin` em `dist/index.js`
- **Consumidores primários:** Peitho/pixel-specialist, Peitho/ads-analyst *(revisão para v2 com read)*, Peitho/fiscal *(idem)*, Hermes gateway
- **Filosofia:** cada tool é um FLUXO (não endpoint 1:1); erros são educativos; respostas cabem em contexto (`concise` por padrão).

---

## 4. Requisitos funcionais / Fora de escopo v1

### Tarefas que executa (verbos)
- **Cria** pedidos (via `POST /order`)
- **Cria** produtos e variantes (via `POST /product`)
- **Sincroniza** catálogos em lote (loop com rate-limit interno + progress)
- **Valida** token + companyId (introspecção de saúde)

### Fora de escopo v1 (backlog v2)
- Leitura de pedidos, produtos, atribuição multi-canal, ROAS por budget alocado
- Webhooks nativos (Solomon não emite hoje)
- Dashboard scraping (último recurso, só se Solomon nunca expor API de leitura)
- Configuração de pixels externos (Meta, Google, GA4 — não é responsabilidade da Solomon)
- Escrita em ads platforms (Solomon não é ads platform)

### Metodologias/frameworks herdados
- Padrão idiomático MCP: **fluxos, não endpoints** (mcp-builder do Prometeu)
- Padrão idempotência CAPI/GA4 MP: **dedup por `event_id` / `orderId+updatedAt`**
- Padrão de mensagem de erro: **acionável** (`acao_sugerida`), pt-BR, com detalhes estruturados
- Molde de qualidade: `Dedalo/mcp/vscode-coach/` (KoldenError, log JSON, Zod strict, eval harness)

---

## 5. Tools *(substituindo §5 Ferramentas)*

### 5.1 `solomon_criar_pedido`

- **Description (pt-BR):** *"Cria ou atualiza um pedido no painel Solomon (endpoint POST /admin/v1/order). Use quando um novo pedido for confirmado (webhook Nuvemshop `order/paid`, cron reconciliador ou importação manual). Idempotente por `orderId + updatedAt`: chamadas repetidas com `updatedAt` mais antigo retornam `dedup: ignorado` sem tocar a API."*
- **Input Zod (`.strict()`):**
  - `pedido: PedidoSolomonSchema` — objeto com `orderId`, `updatedAt`, `customer`, `items[]`, `totals`, `channel`, `utm?`, `paymentMethod`, etc. (conforme `Ferramentas/Solomon/docs/07-api-ingestion-orders.md`)
  - `dry_run?: boolean = false` — se `true`, valida payload mas não chama API
  - `verbosidade?: "concise" | "detailed" = "concise"`
- **Output concise:** `{ orderId, status: "enfileirado" | "dedup_ignorado" | "erro", proximo_passo }`
- **Output detailed:** payload concise + resposta HTTP crua da Solomon + `dedup_reason` (se aplicável) + `latencia_ms`
- **Annotations:** `readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true`
- **Erros possíveis:** `TOKEN_INVALIDO` (401), `PAYLOAD_INVALIDO` (Zod), `RATE_LIMIT` (429), `RECURSO_INDISPONIVEL` (5xx), `DEDUP_IGNORADO` (não é erro — status)

### 5.2 `solomon_criar_produto`

- **Description:** *"Cria ou atualiza um produto no painel Solomon (endpoint POST /admin/v1/product), com suas variantes. Use ao sincronizar catálogo Nuvemshop → Solomon (produto novo, edição de preço, ativação/desativação). Idempotente por `productId + variantId + updatedAt`."*
- **Input Zod:**
  - `produto: ProdutoSolomonSchema` — `productId`, `updatedAt`, `title`, `description?`, `brand?`, `variants[]` (com `variantId`, `sku`, `price`, `stock`, `attributes{}`), `images[]?`, `categoryPath?`, etc. (conforme `docs/08-api-ingestion-products.md`)
  - `dry_run?: boolean`
  - `verbosidade?`
- **Output concise:** `{ productId, variants_count, status, proximo_passo }`
- **Output detailed:** concise + response Solomon + `latencia_ms` + `variantes_processadas: [{ variantId, status }]`
- **Annotations:** `readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true`
- **Erros:** mesmos da 5.1.

### 5.3 `solomon_sincronizar_catalogo`

- **Description:** *"Sincroniza uma lista de produtos em batch com controle de concorrência e retry por item. Use ao importar catálogo Nuvemshop inteiro ou ao reconciliar após incidente. Chama internamente `solomon_criar_produto` para cada item, respeitando `max_paralelo` (padrão 4) e emitindo progress incremental."*
- **Input Zod:**
  - `produtos: ProdutoSolomonSchema[]` (min 1, max 500)
  - `max_paralelo?: number = 4` (1-10)
  - `dry_run?: boolean`
  - `parar_no_primeiro_erro?: boolean = false`
  - `verbosidade?`
- **Output concise:** `{ total, sucesso, falhas, tempo_ms, proximo_passo }`
- **Output detailed:** concise + `resultados: [{ productId, status, erro? }]` (limitado a 100 primeiros)
- **Annotations:** `readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true`
- **Erros:** `PAYLOAD_INVALIDO` global; erros por item ficam no array `resultados` sem interromper batch (a menos que `parar_no_primeiro_erro = true`).

### 5.4 `solomon_validar_conta`

- **Description:** *"Valida o token Solomon e retorna metadata da conta (companyId, environment detectado, timestamp). Use ao debugar 'por que meus eventos não aparecem no painel?' ou ao verificar se o Infisical está injetando o segredo correto. Faz uma chamada HEAD/GET leve à API — não cria dados."*
- **Input Zod:** vazio (`z.object({}).strict()`)
- **Implementação:** tenta `POST /order` com payload marcado como probe (`orderId: "kolden-mcp-probe-<uuid>"`, `dry_run: true` se a API suportar, senão payload minimal aceito) OR endpoint de health se descoberto. Se retornar 200/202 → token válido; se 401 → inválido.
- **Output concise:** `{ token_ok: boolean, companyId, environment: "live" | "sandbox", plano?: string, timestamp }`
- **Output detailed:** concise + `latencia_ms` + `response_headers` (redigidos)
- **Annotations:** `readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true`
- **Erros:** `TOKEN_INVALIDO`, `CONTA_INCORRETA` (companyId retornado ≠ esperado), `RECURSO_INDISPONIVEL`.

**Total v1: 4 tools.** Justificativa do corte (do provisório 6-12 no pré-Ritual): OpenAPI só expõe 2 rotas write. Todo o resto (`_listar_pedidos`, `_pedido_por_id`, `_atribuicao_por_canal`, `_funil_periodo`, `_saude_conta` completa, `_registrar_webhook`) fica em backlog v2.

---

## 6. State + cache *(substituindo §6 Memória)*

- **In-memory (TTL 5min):** `{ companyId, environment, ultima_validacao_ts, quotas? }` — evita re-validar token a cada chamada.
- **Log JSON estruturado:** `~/.kolden/mcp-iris/server.log` (padrão vscode-coach) — nunca stdout (quebra stdio MCP).
- **Sem persistência entre sessões:** cache in-memory some no restart; próximo call re-valida.
- **O que NÃO grava em log:** payload completo de pedido/produto (contém PII do cliente Rosie); grava apenas hash de `orderId`/`productId` + status + latência.

---

## 7. Contrato de tools *(substituindo §7 Entradas e saídas)*

Toda tool retorna `{ content: [{ type: "text", text: JSON.stringify(payload, null, 2) }] }` (padrão MCP text-only). Sem prosa livre — o agente cliente formata em linguagem natural.

Todas as tools honram:
- `verbosidade: "concise" | "detailed"` — `concise` = resumo + próximo passo; `detailed` = payload completo
- Erros: retornados via `KoldenError.toToolResult()` com `{ isError: true, content: [{ type: "text", text: JSON.stringify({ erro: { codigo, mensagem, acao_sugerida, detalhes? } }) }] }`
- Sanitização: token nunca aparece no output (nem redigido); companyId aparece (é público)

---

## 8. Guardrails

### Proibições absolutas *(cada uma vira teste no eval + verificação no revisor)*
- Zero token/senha em texto puro (código, log, output, `.env` versionado)
- Zero prosa livre em output — só JSON estruturado
- Zero `console.log` em `src/` (quebra stdio MCP)
- Zero mensagem de erro em inglês (Constituição Art. II)

### Limites de custo/uso
- `solomon_sincronizar_catalogo`: max 500 produtos por chamada, `max_paralelo` ≤ 10
- Rate limit interno: backoff exponencial em 429, retry 3x em 5xx, sem retry em 4xx
- Cache metadata: TTL 5min (não crescer indefinidamente)

### Escalação para humano
- 401 persistente após revalidar Infisical → escalar (token vencido ou revogado)
- 5xx > 3 retries → escalar (Solomon indisponível)
- Companyd retornado ≠ esperado → escalar imediatamente (risco de vazamento cross-cliente)

### Escopo cliente (Rosie)
- **LGPD/PII:** payloads de pedido carregam nome/email/CPF/endereço do cliente Rosie. **Nunca gravar em log** (só hash de `orderId`). Retenção da PII fica na Solomon (365d), não no MCP.
- **Retenção/expurgo:** log JSON com política de rotação (implementar quando ultrapassar 50MB — não crítico v1).
- **Isolamento:** `companyId Rosie = caOEzYj1TqRM0r3nHrFP` hardcoded em nenhum lugar — vem de Infisical (`/kolden/prod/SOLOMON_COMPANY_ID_ROSIE`). Se um dia outro cliente adotar Solomon, o path muda.
- **Handoff:** dono técnico = Ronan (adm@kolden.com.br); Peitho/pixel-specialist é o executor operacional.
- **Fronteira:** MCP não expõe segredos Kolden a agentes; qualquer erro retornado pelo MCP redige token nos headers.
- **Segredos:** `/kolden/prod/SOLOMON_TOKEN_API` (live) + `/kolden/dev/SOLOMON_TOKEN_API` (sandbox) + `/kolden/prod/SOLOMON_COMPANY_ID_ROSIE` (público mas mantido no Infisical por consistência).
- **Aprovação de produção:** Ronan (a ativação via `claude mcp add` fica manual, padrão Kolden).

---

## 9. Jornada

### Cenário feliz — Peitho/pixel-specialist reconcilia catálogo pós-onboarding
1. Ronan pede ao Peitho/pixel-specialist: "Sobe o catálogo Rosie inteiro pra Solomon".
2. pixel-specialist puxa produtos da Nuvemshop via outro MCP (fora do escopo Íris).
3. pixel-specialist invoca `solomon_sincronizar_catalogo({ produtos: [...123 produtos], max_paralelo: 4 })`.
4. Íris valida payload (Zod), busca token do Infisical, entra em loop:
   - Para cada produto: chama `solomon_criar_produto` internamente → HTTP POST → dedup se `updatedAt` antigo → sucesso ou erro no array.
   - Reporta progress a cada 10 items (log interno).
5. Ao fim: `{ total: 123, sucesso: 121, falhas: 2, tempo_ms: 45000, resultados: [...] }`.
6. pixel-specialist formata resposta natural pt-BR ao Ronan.

### Pior cenário — Token vencido no meio de um batch
1. `solomon_sincronizar_catalogo` está no produto 47/123.
2. Solomon retorna 401.
3. Íris detecta 401 → tenta re-validar via Infisical (busca chave de novo).
4. Se re-validação falhar → aborta batch, retorna `{ status: "abortado", sucesso: 46, falhas: 0, motivo: TOKEN_INVALIDO, acao_sugerida: "Renove o token via Infisical em /kolden/prod/SOLOMON_TOKEN_API e rerode a partir do produto 47" }`.
5. Log grava incidente com timestamp para auditoria.

### Casos de borda
- Payload com `updatedAt` no futuro → aceita (Solomon decide).
- `variants[]` vazio em produto → Zod aceita, Solomon pode rejeitar (mensagem propagada).
- Rede offline → `KoldenError REDE_INDISPONIVEL` (não confundir com 5xx).
- Duplicata de `orderId` em massa (usuário rerodou o mesmo batch) → todos retornam `dedup_ignorado`, batch termina em ~1s (cache local).

---

## 10. Modos de falha / pré-morte

| Modo de falha | Gatilho | Raio de impacto | Detecção | Mitigação/recuperação |
|---|---|---|---|---|
| Token inválido | 401 da Solomon | Toda tool para; batch aborta | HTTP status | `KoldenError TOKEN_INVALIDO` → re-validar Infisical 1x → se falhar, escalar |
| Rate limit atingido | 429 da Solomon | Tool específica atrasa | HTTP status | Backoff exponencial (250ms → 500 → 1s → 2s), retry 3x; se persistir → `KoldenError RATE_LIMIT` |
| API indisponível | 5xx da Solomon | Escrita falha | HTTP status | Retry 3x com jitter; se persistir → `KoldenError RECURSO_INDISPONIVEL` + log detalhado |
| Payload malformado | Zod rejeita input | Chamada nem sai | Zod parse | `KoldenError PAYLOAD_INVALIDO` com campo faltante — nunca chega ao HTTP |
| Dedup silencioso | `updatedAt` antigo | Nenhum — comportamento intencional | Cache local | Retorna `status: dedup_ignorado`, log warn com IDs |
| Segredo vazando em log | Handler grava payload cheio | Vaza PII cliente | grep de token + sanitização | Log grava só hash de `orderId`; sanitização obrigatória antes de eval |
| companyId errado | Solomon retorna companyId ≠ Rosie | Risco de escrita cross-cliente | Comparação em `validar_conta` | `KoldenError CONTA_INCORRETA` — escalar imediatamente |
| Boot falha (dep faltando) | `import` de módulo indisponível | MCP não inicia | Log erro fatal | `log.error` + `process.exit(1)` — Claude Code mostra falha ao carregar |
| stdio quebrado (`console.log`) | Alguém printou fora do JSON MCP | Protocolo corrompe | CI/lint | Lint bloqueia `console.log` em `src/`; grep pré-commit |

---

## 11. Arquitetura *(preenchida pelo blueprint da Fase 3)*

**Topologia:** SOLO puro (não squad, não orquestrador). Único processo Node/TS via stdio.

**Blueprint de 5 camadas:**

| Camada | Arquivos | Responsabilidade |
|---|---|---|
| **1. Entrypoint** | `src/index.ts` | Boot stdio + `StdioServerTransport` + log inicial |
| **2. Server** | `src/server.ts` | `criarServidor()` + `McpServer.registerTool()` para cada uma das 4 tools + wrapper `envolverErros()` |
| **3. Tools** | `src/tools/{criar-pedido,criar-produto,sincronizar-catalogo,validar-conta}.ts` | Handler por tool: parse Zod → chama `solomon-client` → formata output concise/detailed |
| **4. Cliente HTTP + utilitários** | `src/lib/{solomon-client,infisical,cache,erros,log}.ts` | HTTP com retry/backoff/rate-limit; busca segredos; cache in-memory; `KoldenError` + factories; log JSON |
| **5. Schemas Zod** | `src/schemas/{pedido,produto,comum}.ts` | Zod strict + `.describe()` pt-BR compartilhados entre tools |

**Mitigação por modo de falha (§10 → camada):**
| Modo | Camada que mitiga |
|---|---|
| Token inválido / 401 | Camada 4 (`erros.ts` + `infisical.ts`) |
| Rate limit / 429, 5xx | Camada 4 (`solomon-client.ts` retry/backoff) |
| Payload malformado | Camada 5 (Zod pré-http) |
| Dedup silencioso | Camada 4 (`cache.ts` + `solomon-client.ts`) |
| Vazamento log | Camada 4 (`log.ts` sanitização) |
| companyId errado | Camada 3 (`validar-conta.ts`) |
| stdio quebrado | Camada 4 (`log.ts` grava em arquivo, nunca stdout) |

**Referência histórica herdada (Fase 5.6):** N/A — MCP-servidor SOLO não tem camadas de herança (isso vale para agentes-persona). O molde é o vscode-coach; padrões idiomáticos vêm do mcp-builder.

---

## NF. Requisitos não-funcionais

- **Idioma:** pt-BR em descriptions, mensagens de erro, comentários. Nomes técnicos MCP permanecem EN (`readOnlyHint`, `content`, etc.).
- **Zod:** `.strict()` obrigatório; `.describe()` obrigatório em todo campo público de input schema.
- **Infisical:** exclusivo para credenciais; zero `.env` versionado; zero `process.env.SOLOMON_TOKEN_API` em código (só no shim de teste).
- **Logging:** arquivo `~/.kolden/mcp-iris/server.log` (append; fail-silent); nunca stdout.
- **Build:** `tsc → dist/` determinístico; `npm run build` limpa `dist/` antes.
- **Cross-platform:** Windows/Linux/macOS (paths absolutos com `path.join`, sem barras fixas).
- **Sem `console.log` em src/:** lint verifica pré-commit.
- **`.gitignore`:** `dist/`, `node_modules/`, `.env`, `~/.kolden/` (não versionar log local).

---

## KB. Knowledge Base local

- `data/canais-solomon.yaml` — mapeamento de canais Solomon (paid_meta_ig, paid_google_search, organic, direct, email, etc.) → nome friendly pt-BR. **Opcional na v1** (só usado se alguma tool renderizar canal em output — não é o caso das 4 tools atuais). Deixar arquivo esqueleto para v2.

---

## Aceite — Gate 7 (avaliação)

Bloqueante para entrega. Todos os itens abaixo verdadeiros:

- [ ] `npm run build` passa sem erro
- [ ] `npm run eval` roda `eval/perguntas.yaml` (10 tarefas) com maturity ≥ 7.0 usando `SOLOMON_TOKEN_API` do `/kolden/dev/`
- [ ] `eval/smoke-stdio.mjs` responde ao handshake MCP (`initialize` + `tools/list`)
- [ ] `grep -rE "sk-|Bearer |SOLOMON_TOKEN" src/` retorna 0 matches em código-fonte
- [ ] `grep -rn "console\.(log|error|warn)" src/` retorna 0 matches
- [ ] `adr/0001-path-isolado-por-cliente.md` presente e completo
- [ ] `adr/0002-stack-node-typescript.md` presente e completo
- [ ] `README.md` em pt-BR com instalação + variáveis + tools listadas
- [ ] `.env.example` presente sem valores; `.gitignore` inclui `.env`, `dist/`, `node_modules/`
- [ ] Todas as 4 tools registradas com Zod strict + description pt-BR + annotations completas
- [ ] `KoldenError` usado em 100% dos handlers (via `envolverErros()`)

---

## Ordem de construção — Fase 5.4 (cascata topológica)

Ordem a ser respeitada pelo `mcp-builder` do Prometeu (dependências ao inverso):

```
 1. package.json                        (deps: sdk 1.20, zod 3.24, js-yaml 4.1)
 2. tsconfig.json                       (ES2022 strict, moduleResolution: Bundler)
 3. .gitignore + .env.example           (nunca versionar segredos)
 4. src/lib/log.ts                      (molde vscode-coach — JSON append, fail-silent)
 5. src/lib/erros.ts                    (KoldenError + factories: tokenInvalido, payloadInvalido,
                                        rateLimit, recursoIndisponivel, contaIncorreta,
                                        redeIndisponivel, dedupIgnorado)
 6. src/lib/infisical.ts                (busca /kolden/<env>/SOLOMON_TOKEN_API + companyId)
 7. src/lib/cache.ts                    (TTL 5min in-memory)
 8. src/lib/solomon-client.ts           (HTTP Bearer + retry/backoff + dedup + rate limiter)
 9. src/schemas/comum.ts                (verbosidadeSchema, drySeeSchema, orderIdSchema)
10. src/schemas/pedido.ts               (PedidoSolomonSchema — mapeia doc 07)
11. src/schemas/produto.ts              (ProdutoSolomonSchema — mapeia doc 08)
12. src/tools/criar-pedido.ts           (usa cliente + schema + erros)
13. src/tools/criar-produto.ts          (idem)
14. src/tools/sincronizar-catalogo.ts   (invoca criar-produto internamente + progress)
15. src/tools/validar-conta.ts          (probe leve; cache 5min)
16. src/server.ts                       (registerTool × 4 + envolverErros global)
17. src/index.ts                        (stdio entrypoint padrão)
18. eval/smoke-stdio.mjs                (handshake MCP)
19. eval/perguntas.yaml                 (10 tarefas — ver plano principal §Eval)
20. eval/rodar-eval.mjs                 (runner + assertions)
21. adr/0001-path-isolado-por-cliente.md
22. adr/0002-stack-node-typescript.md
23. README.md                           (pt-BR — instalação, variáveis Infisical, tools)
```

Cada passo só inicia quando o anterior fecha (ordem topológica). Em erro de compilação, corrige antes de avançar.

---

## 12. Histórico

| Versão | Data | Mudança |
|---|---|---|
| 0.1 (pré-Ritual) | 2026-07-01 | Briefing consolidado por Ronan + Claude Code (raiz) → `~/.claude/plans/caos-mcp-solomon-rosie-primeiro.md` |
| 1.0 (rascunho) | 2026-07-01 | PRD adaptado para MCP após Fases 0-2 do Ritual; Argos descartado (colisão); Íris proposto; escopo v1 cortado para 4 tools por confirmação OpenAPI (write-only) |
