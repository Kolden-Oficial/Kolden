# Google Analytics 4 (GA4) — Referência de Uso

Acesso aos dados do Google Analytics 4 (relatórios, métricas, dimensões, propriedades) via o **MCP oficial do Google** (`analytics-mcp`, read-only). Categoria: Analytics / Dados.

---

## Credenciais (ADC — não Infisical)

Autenticação por **Application Default Credentials (ADC)** do gcloud, com a conta `adm@kolden.com.br` (Workspace). Não há chave estática:

| Item | Valor |
|------|-------|
| ADC file | `C:\Users\Ronan Silva\AppData\Roaming\gcloud\application_default_credentials.json` |
| Projeto GCP | `gen-lang-client-0988823565` (nº `1098911614973`) |
| Escopo (atual, 2026-06-26) | `cloud-platform` · `analytics.readonly` · `webmasters` · `tagmanager.edit.containers` · `tagmanager.edit.containerversions` · `tagmanager.publish` |
| Consent screen | **Internal** (org kolden.com.br) — porém o ADC **pode reexpirar** (ver abaixo) |

> Reautenticar/renovar ADC (caminho normal): `gcloud auth application-default login --client-id-file="C:\Users\Ronan Silva\.config\google-drive-mcp\gcp-oauth.keys.json" --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/tagmanager.edit.containers,https://www.googleapis.com/auth/tagmanager.edit.containerversions,https://www.googleapis.com/auth/tagmanager.publish"`

### Quando o reauth interativo falha (callback `localhost` recusado)

Sintoma: `ERR_CONNECTION_REFUSED` no browser ao final do login (o servidor de callback do `gcloud` não persiste — acontece ao rodar via `!` não-interativo; o gcloud 574+ também removeu `--no-launch-browser` para `--client-id-file`, exigindo `--no-browser`). **Não é proxy** (verificado: WinHTTP direto, `ProxyEnable=0`).

**Solução validada (2026-06-26): fluxo OAuth conduzido com loopback próprio.** O client é `installed`/desktop (redirect `http://localhost` em qualquer porta), então monta-se um servidor loopback local e captura-se o `code` direto:
1. Subir um servidor HTTP local numa porta livre (ex. 8765) e gerar a URL de consent (`accounts.google.com/o/oauth2/v2/auth` com `client_id`, `redirect_uri=http://localhost:8765`, `response_type=code`, `access_type=offline`, `prompt=consent`, os scopes acima).
2. O Ronan abre a URL, loga `adm@kolden.com.br`, aceita — o servidor captura o `code` (fallback: colar a URL de callback da barra do browser).
3. Trocar o `code` por tokens (`POST oauth2.googleapis.com/token`) e escrever o ADC (`authorized_user`: `client_id`, `client_secret`, `refresh_token`, `type`, `quota_project_id`) em `...\gcloud\application_default_credentials.json`.

> ⚠️ **Recorrência**: a org pode impor *session length*, fazendo o ADC voltar a pedir "Reauthentication needed" mesmo com consent Internal. É esperado — reaplicar o fluxo acima quando ocorrer.

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
- O **MCP** `analytics-mcp` é read-only; **escrita** (config GA4 Admin, GTM) vai por **REST** com o access token do mesmo ADC (`gcloud auth application-default print-access-token`).
- **GTM via REST (escrita)** — usado p/ publicar a tag GA4 do EntreSolos (2026-06-26). Gotcha: `POST .../containers/{c}/versions/{v}:publish` **exige header `Content-Length: 0`** (POST sem corpo → senão **HTTP 411 Length Required**). `create_version` e `publish` exigem o scope `tagmanager.edit.containerversions` (não basta `edit.containers`).
- **Service Account não é o caminho rápido**: a API de IAM estava desabilitada no projeto `gen-lang-client-0988823565` e a org pode bloquear chave de SA. Para automação 24/7, reavaliar; por ora o ADC (reauth conduzido) atende.
- Contas de clientes (Danielle Benício, Vilela, **EntreSolos**) aparecem porque `adm@kolden.com.br` tem acesso — atenção à propriedade certa nas queries.
