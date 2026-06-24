# Windsor.ai — Referência de Uso

Windsor.ai é uma plataforma no-code de integração de dados de marketing (ETL) com 325+ conectores (Google Ads, Meta/Facebook Ads, TikTok Ads, LinkedIn Ads, GA4, HubSpot, Shopify, Stripe, BigQuery, Snowflake etc.). Extrai, unifica e entrega dados de várias fontes para BI, dashboards e data warehouses. Categoria: Integração de dados de marketing / ETL.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| WINDSOR_API_KEY | `/kolden/dev/WINDSOR_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://windsor.ai/api-documentation/ |
| Site oficial | https://windsor.ai |
| Conectores (Microsoft Learn) | https://learn.microsoft.com/en-us/connectors/windsorai/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (mantido pela Windsor.ai)
- **Endpoint:** https://mcp.windsor.ai
- A chave deve vir da variável de ambiente `WINDSOR_API_KEY` (injetada pelo Infisical — nunca o valor literal).

---

## Uso básico

- **Base URL:** `https://connectors.windsor.ai`.
- **Autenticação:** por **query param** `api_key`. A chave é resolvida pelo Infisical em runtime; nunca escreva o valor literal.
- **Formato:** `https://connectors.windsor.ai/{connector}?api_key=$WINDSOR_API_KEY&fields=campo1,campo2`
  - Exemplo real: `https://connectors.windsor.ai/facebook?api_key=$WINDSOR_API_KEY&fields=date,campaign,spend,impressions,clicks`
  - Params opcionais: `date_from`, `date_to`.
- **Exemplo mínimo:** (a chave é resolvida pelo Infisical em runtime; nunca escreva o valor literal)

```bash
# Resolve a credencial via Infisical e injeta $WINDSOR_API_KEY no ambiente do curl
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  curl "https://connectors.windsor.ai/facebook?api_key=$WINDSOR_API_KEY&fields=date,campaign,spend,impressions,clicks"
```

---

## Notas Kolden

- Uso típico no Kolden: consumida no squad **Argos** pelos especialistas `market-sizer` (dados de mercado / ads agregados) e `ads-intel` (dados de plataformas de ads), para consolidar métricas de várias fontes (Google Ads, Meta, TikTok, LinkedIn etc.) num único fluxo.
- **NÃO** serve para descoberta de "vídeos virais" — isso é função do SociaVault/Apify. Windsor.ai é estritamente ETL de dados de marketing (conectores → dados unificados para BI/warehouse).
- Sempre rodar comandos sob `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- ...` para que `WINDSOR_API_KEY` seja injetada em runtime; nunca persistir a chave em arquivos `.env` versionados nem em configs MCP com valor literal.
