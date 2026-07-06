# ADR 0001 — Path isolado por cliente

**Status:** Aceito | **Data:** 2026-07-01 | **Decisor:** Ronan Silva + Caos | **Aprovação:** Ronan

## Contexto

O padrão canônico da Kolden para MCPs próprios é `C:\Kolden\Dedalo\mcp\<nome>\` — Dédalo hospeda a fábrica de servidores MCP genéricos que qualquer squad pode consumir (vscode-coach é o precedente). O MCP Íris, porém, nasce de uma missão específica: expor a API Solomon (admin-api.solomon.com.br) para agentes que atendem à cliente **Rosie**, no âmbito do Contrato de Missão `m-20260701-112935-rosie-90d` (D+21 do painel Solomon em produção).

Duas propriedades tornam a Íris diferente das MCPs de Dédalo:

1. **Cliente único.** Hoje só há um consumidor externo (Rosie). Não sabemos se ou quando um segundo cliente Kolden adotará a Solomon.
2. **Ownership no dossiê do cliente.** Documentação, PRD, registros do Ritual, blueprint técnico e ADRs desta MCP vivem em `sobre-a-empresa/Projetos/Rosie/mcp-solomon/`. Isolar aqui mantém tudo relacionado à Rosie sob um mesmo teto navegável.

## Decisão

**O MCP Íris (v1) mora em `C:\Kolden\sobre-a-empresa\Projetos\Rosie\mcp-solomon\`.** Consumidores apontam `claude mcp add` para o `dist/index.js` deste caminho. O nome interno do servidor é `mcp-iris`.

## Alternativas rejeitadas

| Alternativa | Motivo da rejeição |
|---|---|
| `C:\Kolden\Dedalo\mcp\solomon\` desde v1 | Generalização prematura. Sem 2º cliente, promover à fábrica quebra a regra "não abstraia para futuro hipotético" (CLAUDE.md §6 — Escopo). |
| `C:\Kolden\sobre-a-empresa\Ferramentas\Solomon\mcp\` | Mistura manual da ferramenta (docs, credenciais, tokens) com código executável. A pasta `Ferramentas/` é para catálogo/manual, não para binários. |

## Consequências

### Positivas
- **Isolamento multi-tenancy.** Nada de código Rosie vaza para outras MCPs.
- **Ownership claro.** Quem revisa a Íris começa no dossiê da Rosie e encontra PRD, ADRs e registros lado a lado com o código.
- **Rastreabilidade.** Auditoria da Rosie enxerga MCP como artefato do projeto (não como infra genérica).

### Negativas
- **Duplicação em caso de 2º cliente.** Se outro cliente adotar Solomon, será preciso fork ou promoção — passo extra em relação a nascer já em Dédalo.
- **`mcp-status.md` recebe flag "cliente-scoped".** O catálogo mestre de MCPs precisa marcar a Íris como pertencente a Rosie até promoção.

## Cláusula de promoção condicional

Gatilho de reavaliação: **quando o segundo cliente Kolden adotar Solomon.**

Ao ativar o gatilho:

1. Abrir **ADR 0003** propondo o movimento para `C:\Kolden\Dedalo\mcp\solomon\`.
2. Refatorar `carregarSegredos()` para receber `companyId` como parâmetro por cliente (hoje é hardcoded no Infisical em `/kolden/prod/SOLOMON_COMPANY_ID_ROSIE`).
3. Atualizar `claude mcp add` de todos os consumidores.
4. Atualizar `sobre-a-empresa/Ferramentas/mcp-status.md`.
5. Preservar histórico via `git mv` ou cópia com nota de origem em `adr/0001-*.md`.
6. Passa por revisão do Caos (Fase 8) + aprovação do Ronan.

## Quando reavaliar (sem gatilho externo)

- **Data:** revisar a cada 6 meses no ritual de manutenção do dossiê Rosie.
- **Evento:** se Rosie exigir fork (ex: instância dedicada com credenciais próprias por ambiente).
