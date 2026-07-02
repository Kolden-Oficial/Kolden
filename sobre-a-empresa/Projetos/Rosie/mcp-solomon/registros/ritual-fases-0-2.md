# Ritual do Caos — MCP Solomon (log das Fases 0-2)

> Sessão `/caos` de 2026-07-01 · execução do plano `~/.claude/plans/miss-o-construir-o-mcp-woolly-wilkes.md`.

## Fase 0 — Consulta ao registro (formal)

Skill: `consulta-ao-registro` · Filtro: `tipo: mcp` + keywords `[solomon, analytics, atribuição, attribution, tracking, rastreamento, e-commerce, ecommerce, nuvemshop, pixel, capi, ga4]`.

**Veredito:** **CREATE**.

**Evidência:**
- Nenhuma entidade `tipo: mcp` com Solomon no registro.
- Afinidades parciais em `Caos/dados/registro-de-entidades.yaml`:
  - `metis` (squad, analytics/growth) — keywords compartilhadas: `analytics, ga4, mixpanel, amplitude, retencao, ltv` — relevância ≈ 0.75
  - `peitho` (squad, tráfego pago) — keywords compartilhadas: `pixel, capi, ga4, roas` — relevância ≈ 0.65
- Nenhum candidato atinge o gate ≥0.90 (REUSE); nenhum é MCP adaptável (ADAPT precisa `tipo: mcp` na base).

**Ação pós-entrega (recomendação para futuro):** considerar integração como habilidade do squad Metis (não squad novo). Registrar em `padroes-aprendidos.yaml`.

---

## Fase 1 — Diagnóstico (7 rodadas · resumo)

### Rodada 0 — Alma + Nomeação

**Missão em uma frase:** MCP-servidor SOLO em Node/TS que expõe a API Solomon (`admin-api.solomon.com.br`) para a frota Kolden — a partir da Rosie —, com autenticação Infisical, respeitando as duas únicas rotas públicas hoje disponíveis (`POST /order` e `POST /product`) e preparado para expansão quando a Solomon expor endpoints de leitura e webhooks.

**Colisão detectada:** o nome inicialmente proposto no pré-Ritual (**Argos**) já pertence a squad ativo (`Argos/`, inteligência de mercado + scraping, criado 2026-06-21, deus das pesquisas). Reprovado.

**Três novos candidatos gregos disponíveis (nomes NÃO ocupados no registro nem em pastas de raiz):**

| Candidato | Metáfora | Aderência ao MCP v1 write-only |
|---|---|---|
| **Íris** *(recomendado)* | Mensageira dos deuses; personificação do arco-íris que conecta céu e terra | Alta — MCP "leva" eventos/pedidos de agentes Kolden → painel Solomon; write-heavy = mensageria pura |
| **Kléio** (Clio) | Musa da história — registra e imortaliza os feitos | Alta — cada pedido é uma linha da história e-commerce da Rosie; boa etimologia |
| **Mnemósine** | Titânide da memória (mãe das Musas, inclusive Kléio) | Média — Solomon guarda memória 365d, mas o MCP não lê essa memória; metáfora incompleta na v1 |

**Nome escolhido para o rascunho do PRD:** **Íris** (a confirmar no Gate #2 pelo Ronan).

### Rodadas 1-6 — Faculdades

Preenchidas diretamente no PRD (Fase 4, adaptação para MCP-servidor). Resumo por faculdade:

| Faculdade | Preenchimento |
|---|---|
| Caráter (tom técnico) | pt-BR direto, erros com `acao_sugerida`, sem prosa livre — MCP-servidor não conversa, executa |
| Mente (lógica de tools) | 4 tools de fluxo (criar_pedido, criar_produto, sincronizar_catalogo, validar_conta) — Zod strict + descriptions pt-BR, respostas `concise`/`detailed` |
| Memória (cache/log) | Cache in-memory TTL 5min (companyId, environment detectado) + log JSON estruturado em `~/.kolden/mcp-iris/server.log` |
| Corpo (deps/runtime) | Node 20+ / TypeScript 5.6+ / `@modelcontextprotocol/sdk ^1.20.0` / `zod ^3.24.0` / `js-yaml ^4.1.0` |
| Consciência (obs) | Métricas por tool (contagem, latência p50/p95, taxa de erro); logs estruturados; sanitização obrigatória de token em qualquer output |
| Sociedade (consumidores) | Peitho/pixel-specialist + Peitho/ads-analyst + Peitho/fiscal (leitura fica em v2 para os dois últimos) + Hermes gateway; futuros clientes Kolden que adotarem Solomon |

---

## Fase 2 — Pesquisa (fan-out paralelo)

### Vetor A — OpenAPI Solomon (Firecrawl)

**URL puxada:** `https://docs.solomon.com.br/api-reference/openapi.json`

**Resultado (achado crítico):**

```json
{
  "paths": [
    {"method": "POST", "summary": "Enviar pedido",  "tags": ["Order"],   "readWrite": "write"},
    {"method": "POST", "summary": "Enviar produto", "tags": ["Product"], "readWrite": "write"}
  ],
  "webhooks": false,
  "rateLimits": "No rate limits declared."
}
```

**Fechamento das 3 lacunas do pré-Ritual:**

- **R1 (leitura Solomon):** ❌ **Confirmado NEGATIVO.** A API pública tem 0 endpoints GET. Bucket A/C fica em backlog v2. Ativa a decisão travada do Ronan (v1 write-heavy).
- **R2 (webhooks):** ❌ **Confirmado NEGATIVO.** Solomon não emite webhooks. Fallback de polling **também não é viável** (sem GET não há como pollar). Bucket D fica em backlog v2.
- **R3 (Bucket C):** já resolvido pelo Ronan como read-only atribuição/ROAS — porém, como leitura não existe na API, o bucket vai para backlog v2 (não perde o v1, só espera Solomon expor).

**Consequência no PRD:** v1 do MCP entrega **4 tools** (não 6-12): três de write real (`criar_pedido`, `criar_produto`, `sincronizar_catalogo`) + uma de introspecção/saúde (`validar_conta`). Todo o resto (leitura, atribuição, webhooks) fica em §Fora-de-escopo v1 com backlog v2 explícito.

### Vetor B — MCPs de referência (Segment/Amplitude/PostHog)

Não localizado MCP oficial de comunidade para Solomon (esperado — ferramenta é BR-específica). MCPs de analytics de referência mundial existem (PostHog, Amplitude) mas atacam APIs muito mais ricas; padrão idiomático adotado é write-heavy para ingestion (Segment CDP-style) — nosso caso.

### Vetor C — Padrões CAPI/GA4 MP para dedup

Padrão aplicado às tools de write do MCP Íris:
- **Dedup por `orderId+updatedAt`** em `solomon_criar_pedido` (payload com `updatedAt` mais antigo que a última versão conhecida = MCP responde `dedup: ignorado` sem chamar API).
- **Dedup por `productId+variantId+updatedAt`** em `solomon_criar_produto`.
- **Idempotência marcada** via `annotations.idempotentHint: true` em todas as tools de write.

---

## Estado ao final da Onda 1

- Pasta criada: `C:\Kolden\sobre-a-empresa\Projetos\Rosie\mcp-solomon\`
- Fase 0 documentada (CREATE)
- Fase 1 completa (nome proposto: Íris; 6 faculdades técnicas preenchidas)
- Fase 2 completa (OpenAPI confirmou v1 write-only + 4 tools)
- Próximo: Onda 2 → Fase 3 (arquitetura) + Fase 4 (PRD) → **Gate #2** (aprovação Ronan)
