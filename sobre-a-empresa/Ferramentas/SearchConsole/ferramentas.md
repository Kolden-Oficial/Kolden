# Google Search Console — Referência de Uso

Acesso aos dados de SEO/busca orgânica do Google Search Console — performance de busca (clicks, impressões, CTR, posição), sitemaps, inspeção de URL. Categoria: Analytics / SEO. **Uso direto via API com ADC** (escopo `webmasters.readonly`).

---

## Credenciais (ADC — não Infisical)

Mesmo ADC do `gcloud` usado por GA4 (conta `adm@kolden.com.br`, Workspace). Sem chave estática.

| Item | Valor |
|------|-------|
| ADC file | `C:\Users\Ronan Silva\AppData\Roaming\gcloud\application_default_credentials.json` |
| Escopo | `https://www.googleapis.com/auth/webmasters.readonly` |
| API habilitada | `searchconsole.googleapis.com` |

---

## Propriedades acessíveis (verif. 2026-06-24)

| Site | Permissão |
|------|-----------|
| `sc-domain:kolden.com.br` | siteOwner |

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação | https://developers.google.com/webmaster-tools/v1/api_reference_index |
| Search Analytics | https://developers.google.com/webmaster-tools/v1/searchanalytics/query |
| URL Inspection | https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect |

---

## MCP

- **Disponível?** não é necessário — API REST direta via ADC (mesmo padrão de PageSpeed/YouTube). Existem MCPs comunitários; avaliar só se houver demanda de natural-language sobre SEO.

---

## Uso básico

Obter token do ADC e consultar. Exemplo — top 5 queries dos últimos 28 dias:

```powershell
$g = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
$tok = & $g auth application-default print-access-token
$body = '{"startDate":"2026-05-27","endDate":"2026-06-24","dimensions":["query"],"rowLimit":5}'
Invoke-RestMethod -Method Post -ContentType "application/json" -Body $body `
  -Uri "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Akolden.com.br/searchAnalytics/query" `
  -Headers @{ Authorization = "Bearer $tok" }
```

- Listar sites: `GET https://www.googleapis.com/webmasters/v3/sites`
- Query de performance: `POST .../sites/{siteUrl}/searchAnalytics/query` (siteUrl URL-encoded; `:` → `%3A`).

---

## Notas Kolden

- **Quem usa:** squad **Metis** (SEO/orgânico) e `serp-seo-cartografo`.
- Read-only (escopo `webmasters.readonly`). Para submeter sitemaps/inspecionar, precisaria escopo `webmasters` (full).
- Dados de performance têm ~2-3 dias de defasagem (padrão do Search Console).
- Para automação server-side sem humano, migrar para Service Account adicionada como usuário da propriedade no Search Console.
