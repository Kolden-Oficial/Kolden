---
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/mcp-solomon/registros/retificacao-mcp-oficial-2026-07-01|retificacao-mcp-oficial-2026-07-01]]"
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/mcp-solomon/registros/ritual-fases-0-2|ritual-fases-0-2]]"
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/mcp-solomon/registros/ritual-fases-3-7|ritual-fases-3-7]]"
---

# Ritual do Caos — MCP Íris (log da Fase 8 + Encerramento)

## Fase 8 — Registro + Entrega

**Timestamp de conclusão:** 2026-07-01T18:38:00Z

### Registro em `Caos/dados/registro-de-entidades.yaml`

Nova entrada:
- **id:** `iris`
- **tipo:** `mcp`
- **path:** `sobre-a-empresa/Projetos/Rosie/mcp-solomon/`
- **dependencias:** `[mcp-builder]`
- **cliente_origem:** `rosie`
- **promocao_para_dedalo:** cláusula documentada
- **adaptabilidade.score:** 0.75

Versão do registro: **1.8.0 → 1.9.0**.

### Padrões capturados em `Caos/dados/padroes-aprendidos.yaml`

Versão: **1.3.0 → 1.4.0**. Três novos padrões:
1. **`openapi-filtra-escopo-antes-do-prd`** (aceleracao_diagnostico) — OpenAPI é filtro que trava PRD; sem ele, escopo é chute.
2. **`mcp-cliente-scoped-com-promocao-condicional`** (decisao_arquitetura) — Path isolado por cliente + ADR de promoção condicional é padrão viável.
3. **`colisao-de-nome-mitologico-e-real`** (antipadrao) — Rodada 0 precisa grep + ls antes de propor nomes.

### Entrada em `Caos/registros/historico.md`

Linha na tabela (7ª linha após Ariadne) — resumo do Ritual + maturity 10.0/10 + lições consolidadas.

### Catálogo de ferramentas atualizado

Em ordem de edição:
- `sobre-a-empresa/Ferramentas/Solomon/ferramentas.md` — seção MCP passou de "❌ não disponível — plano pré-Ritual pendente" para "🟢 ativo — MCP Íris (custom Kolden, maturity 10.0/10)" com instalação completa e 4 tools tabuladas.
- `sobre-a-empresa/Ferramentas/ferramentas.md` (índice mestre) — linha 119 (Solomon) status "🛠️ em construção" → "🟢 ativo — MCP Íris (custom Kolden, maturity 10.0/10, cliente-scoped Rosie)".
- `sobre-a-empresa/Ferramentas/mcp-status.md` — nova linha 13ª "iris (mcp-iris)" na tabela de conectados via Infisical; contagem "12 → 13" atualizada; header "16 → 17".

### Central de Tarefas

Em `sobre-a-empresa/operacao/tarefas/radar.yaml`:
- **`KLD-2026-141`** aberta + fechada na mesma sessão.
- `total_tarefas: 118 → 119`; `proximo_id: KLD-2026-141 → KLD-2026-142`.
- Estado: `concluida`; responsável: `caos`; capacidade: `agente-faz-sozinho`; prazo: `2026-07-22` (D+21 do contrato Rosie).

### Contrato de missão da Rosie

Contrato `m-20260701-112935-rosie-90d.yaml` NÃO foi modificado — o MCP Íris é habilitador técnico paralelo ao deck (produto primário da missão). O deck já mencionava Solomon nas Decisões D (slide 11); o MCP Íris está pronto para uso pelo Peitho/pixel-specialist quando a Rosie começar a operar a integração real.

### Docs local Solomon

Sem alterações na doc local nesta sessão. Achados sobre campos "opcionais" que a API real exige (customer.provinceCode/countryCode/zip/city/createdAt/updatedAt + item.createdAt/updatedAt) estão documentados em `registros/ritual-fases-3-7.md` (§Achados) como candidatos a v1.1 do MCP + reforço da doc local `07-api-ingestion-orders.md`. Fica como tarefa de follow-up.

---

## Handoff ao Ronan

**Comandos para ativação em produção:**

```bash
# 1. Build já rodou nesta sessão — dist/ pronto.

# 2. Adicionar como MCP (user scope) apontando para dev:
claude mcp add mcp-iris --scope user -e SOLOMON_COMPANY_ID_ROSIE=caOEzYj1TqRM0r3nHrFP \
  -- node C:/Users/Ronan\ Silva/.claude/infisical-shim.cjs run \
     --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev \
     -- node C:/Kolden/sobre-a-empresa/Projetos/Rosie/mcp-solomon/dist/index.js

# 3. Verificar no /mcp: `iris` deve aparecer com 4 tools.

# 4. Smoke real via Peitho/pixel-specialist:
#    "Rosie últimos 7 dias — cria um pedido de teste no sandbox e valida a conta"
```

Para prod (Live Solomon), trocar `--env=dev` por `--env=prod`.

**Cadastrar `SOLOMON_COMPANY_ID_ROSIE` no Infisical `/kolden/dev/`** para eliminar o `-e SOLOMON_COMPANY_ID_ROSIE=...` da linha de comando (padrão da casa).

---

## Fase de Encerramento — Ritual de Aprendizado

O que aprendi nesta sessão do Caos, capturado como padrões em `Caos/dados/padroes-aprendidos.yaml` (§3 acima):

1. **OpenAPI é filtro obrigatório antes do PRD.** Nenhum escopo de MCP deve ser fixado sem primeiro consultar a spec real da API. A doc Markdown local pode omitir granularidade contratual.

2. **Path cliente-scoped é decisão reversível.** Nascer em `sobre-a-empresa/Projetos/<Cliente>/mcp-<x>/` com ADR de promoção condicional preserva rota clara para canonização em `Dedalo/mcp/` quando o 2º cliente pedir. Não é anti-padrão — é ownership claro.

3. **Colisão de nome é real na Rodada 0.** Grep + ls antes de propor 3 nomes. A memória do Caos pode omitir squads criados recentemente.

4. **Discrepância doc-local vs API real só aparece no eval ponta-a-ponta.** Vale rodar o eval contra o sandbox real (não só mock) para pegar campos "opcionais" que a API rejeita. Se o eval falha, atualizar tanto o schema Zod quanto a doc local.

5. **`.mjs` puro + `child_process.spawn` para runner de eval de MCP stdio.** Não precisa embuti-los como dist/eval/*.js (evita ciclo tsc — os eval scripts não são código do MCP; são teste do MCP).

6. **Sanitização de token em log via `redigirToken()`.** Padrão `${token.slice(0,6)}…` mantém rastreabilidade do log sem vazar segredo.

7. **Shim Infisical do Kolden funciona para MCP stdio em Node.** `node ~/.claude/infisical-shim.cjs run --projectId=... --env=... -- node dist/index.js` — herda env para o filho + injeta segredos via Universal Auth. Testado nesta sessão com maturity 10.0/10 no eval.

---

**Ritual completo.** MCP Íris (`iris`) operacional; frota Kolden apta a operar a integração Solomon assim que o Peitho/pixel-specialist for acionado para a Rosie.
