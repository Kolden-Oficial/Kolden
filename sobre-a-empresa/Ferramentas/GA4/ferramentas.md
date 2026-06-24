# Google Analytics 4 (GA4) — Referência de Uso

Acesso aos dados do Google Analytics 4 (relatórios, métricas, dimensões, propriedades) via o **MCP oficial do Google** (`analytics-mcp`, read-only). Categoria: Analytics / Dados.

---

## Credenciais (ADC — não Infisical)

Autenticação por **Application Default Credentials (ADC)** do gcloud, com a conta `adm@kolden.com.br` (Workspace). Não há chave estática:

| Item | Valor |
|------|-------|
| ADC file | `C:\Users\Ronan Silva\AppData\Roaming\gcloud\application_default_credentials.json` |
| Projeto GCP | `gen-lang-client-0988823565` (nº `1098911614973`) |
| Escopo | `https://www.googleapis.com/auth/analytics.readonly` |
| Consent screen | **Internal** (org kolden.com.br) → tokens não expiram |

> Reautenticar/renovar ADC: `gcloud auth application-default login --client-id-file="C:\Users\Ronan Silva\.config\google-drive-mcp\gcp-oauth.keys.json" --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/tagmanager.readonly"`

---

## Propriedades acessíveis (verif. 2026-06-24)

| Conta | Propriedade | ID |
|-------|-------------|-----|
| Kolden (`377100822`) | Institucional | `properties/534293429` |
| Kolden (`377100822`) | Guardian Angel Code | `properties/515722318` |
| Danielle Benício (`292266019`) | Academia de Alta Costura | `properties/414995534` |
| Danielle Benício (`292266019`) | Institucional | `properties/530283259` |
| Vilela Construction (`389111233`) | Vilela Construction | `properties/530247809` |

---

## MCP

- **Servidor:** oficial do Google — `analytics-mcp` (PyPI), repo `github.com/googleanalytics/google-analytics-mcp`. **Read-only** (consulta relatórios, lista propriedades, métricas; não altera config).
- **Registrado** no `.claude.json` (user scope) como `google-analytics`:
  ```json
  "google-analytics": {
    "type": "stdio",
    "command": "<...>\\Scripts\\uvx.exe",
    "args": ["analytics-mcp"],
    "env": {
      "GOOGLE_APPLICATION_CREDENTIALS": "<...>\\gcloud\\application_default_credentials.json",
      "GOOGLE_PROJECT_ID": "gen-lang-client-0988823565"
    }
  }
  ```
- **Status:** ✔ Connected (`claude mcp get google-analytics`). Tools `mcp__google-analytics__*` ativas a partir da sessão seguinte ao registro.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| MCP oficial | https://github.com/googleanalytics/google-analytics-mcp |
| Doc do MCP | https://developers.google.com/analytics/devguides/MCP |
| Data API | https://developers.google.com/analytics/devguides/reporting/data/v1 |
| Admin API | https://developers.google.com/analytics/devguides/config/admin/v1 |

---

## Validação ao vivo (2026-06-24)

`runReport` na propriedade Kolden Institucional (`534293429`), últimos 28 dias: **activeUsers=166, sessions=184**. Acesso confirmado via ADC.

---

## Notas Kolden

- **Quem usa:** squads **Metis** (analytics) e **Peitho** (tráfego pago).
- Read-only por design — para mudar config de propriedade, usar o console GA4.
- Para squads rodando server-side sem humano (automação 24/7), migrar de ADC (conta do Ronan) para **Service Account** com a SA adicionada como leitora em cada propriedade.
- Contas de clientes (Danielle Benício, Vilela) aparecem porque a conta `adm@kolden.com.br` tem acesso — atenção ao escolher a propriedade certa nas queries.
