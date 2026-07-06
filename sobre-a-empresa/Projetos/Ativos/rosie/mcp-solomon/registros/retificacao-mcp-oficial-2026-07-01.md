# Retificação — Descoberta do MCP oficial da Solomon (pós-entrega)

**Data:** 2026-07-01T19:05:00Z (mesma sessão da entrega do Íris)

## O que aconteceu

Após entrega do MCP Íris (maturity 10.0/10), o Ronan apontou o tutorial oficial da Solomon no Intercom:

- URL do artigo: https://intercom.help/solomon-d7e33f0728c8/pt-BR/articles/13860266-como-integrar-com-o-mcp-da-solomon
- Autor: Nathan Lacerda · Publicado: 2026-02-25
- Endpoint do MCP oficial: `https://mcp-solomon-685646918301.us-east1.run.app/mcp`
- Auth: OAuth interativo (login Solomon)
- Cobertura: leitura conversacional de dados de negócio (faturamento, campanhas por plataforma, funil de conversão, atribuição multi-canal)

Ou seja: **o MCP oficial da Solomon existia desde fevereiro/2026** e não foi encontrado nem na Fase 0 (`consulta-ao-registro`, filtro Kolden) nem na Fase 2 (`busca-de-referencias`, que puxou `openapi.json` público mas não o helpdesk da Solomon).

## Por que o Íris permanece válido

Escopos DIFERENTES — não é retrabalho, é complementaridade:

| Dimensão | MCP oficial | MCP Íris |
|---|---|---|
| Transport | HTTP remoto (Cloud Run) | stdio local |
| Auth | OAuth interativo (login) | Bearer via Infisical (headless) |
| Direção | Leitura (dashboard) | Escrita (ingestion API pública) |
| Pipeline | Chat conversacional | Server-to-server (GTM Server, batch) |
| Endpoints | Internos ao MCP (não em openapi.json) | `POST /admin/v1/order` + `POST /admin/v1/product` |

O Íris ainda cobre o gap que o oficial não cobre (ingestion programática server-side). Não desativar; reposicionar como complementar.

## O que foi retificado nesta sessão

- `Caos/dados/registro-de-entidades.yaml` — v1.9.0 → v1.10.0. Nova entidade `solomon-oficial` (tipo mcp, origem REUSE); Íris atualizado com `status: ativo-complementar` + campo `origem` marcando a retificação + `dependencias: [mcp-builder, solomon-oficial]`.
- `Caos/dados/padroes-aprendidos.yaml` — v1.4.0 → v1.5.0. Novo padrão `helpdesk-da-ferramenta-antes-de-decidir-reuse-vs-create` (antipadrao).
- `Caos/registros/historico.md` — nova linha `solomon-oficial` (REUSE retificação Fase 0).
- `Caos/agent-memory/caos.md` — 2 lições novas em `Armadilhas / gotchas` (metodológica sobre busca + comunicacional sobre validar comando).
- `Caos/registros/aprendizado.log` — linha de aprendizado adicionada.
- `sobre-a-empresa/Ferramentas/Solomon/ferramentas.md` — seção MCP totalmente reescrita: dois MCPs listados com tabela de "quando usar qual".
- `sobre-a-empresa/Ferramentas/mcp-status.md` — nova seção "Remoto HTTP + OAuth interativo" com o oficial; header 17→18.

## Lição forte para próximas Fases 0/2

`openapi.json` público cobre a **API-cliente** da ferramenta (o que os desenvolvedores da própria loja/cliente chamam). **NÃO cobre o MCP oficial paralelo** — que é uma API separada, autenticada por OAuth, servida em endpoint HTTP próprio (Cloud Run/Fly/Vercel), com tutorial só no helpdesk. Radar mínimo antes de declarar "não existe MCP":

1. `firecrawl_search` por `"MCP <ferramenta>"` e `"model context protocol <ferramenta>"`
2. `firecrawl_scrape` no helpdesk/Intercom/Notion oficial da empresa
3. Grep no repositório GitHub oficial por `mcp`
4. Query no npm registry por `mcp-<slug>` / `@<vendor>/mcp`

Se qualquer um retornar resultado, **REUSE** — não CREATE. Se todos retornarem vazio, reportar veredito como "não encontrado nas fontes X, Y, Z" — nunca categórico "não existe".

## Comando de ativação do oficial (Ronan roda)

```powershell
claude mcp add solomon --scope user --transport http https://mcp-solomon-685646918301.us-east1.run.app/mcp
```

Depois `/mcp` no chat → `Autenticar` → login Solomon com a conta da Rosie.
