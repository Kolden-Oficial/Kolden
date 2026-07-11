---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Google Workspace (Drive / Docs / Sheets / Slides / Calendar) — Referência de Uso

MCP que dá aos agentes acesso ao Google Workspace pessoal da Kolden — Drive (arquivos/pastas/permissões), Docs, Sheets, Slides e Calendar. Implementação em uso: **`@piotr-agier/google-drive-mcp`** (stdio, comunidade), rodando via `npx` na config global do Claude Code. Categoria: Produtividade / Workspace.

> **Decisão (verificada 2026-06-24):** preterimos o conector oficial do Google via claude.ai (que exige redirect fixo `https://claude.ai/api/mcp/auth_callback` e só expõe 8 tools) em favor deste MCP local, que cobre ~150 tools (incluindo escrita em Sheets/Docs/Slides e Calendar) com OAuth desktop próprio.

---

## Credenciais (OAuth desktop local — NÃO Infisical)

Diferente das demais ferramentas do catálogo, este MCP usa **OAuth desktop** com os arquivos no disco do usuário (não há chave estática para o Infisical guardar):

| Arquivo | Caminho | Conteúdo |
|---------|---------|----------|
| Client OAuth | `C:\Users\Ronan Silva\.config\google-drive-mcp\gcp-oauth.keys.json` | client_id/client_secret do projeto GCP |
| Tokens | `C:\Users\Ronan Silva\.config\google-drive-mcp\tokens.json` | access_token + refresh_token (renova sozinho) |

- **Projeto GCP:** nº `1098911614973`.
- **Art. VII:** os segredos vivem só nesses arquivos locais (fora do repositório, fora do versionamento). Nada de client_secret/refresh_token em arquivo versionado — apenas o **caminho** é citado aqui.

---

## Escopos concedidos (8 — `authGetStatus` → `missingScopes: 0`)

`drive` · `drive.file` · `drive.readonly` · `documents` · `spreadsheets` · `presentations` · `calendar` · `calendar.events`

---

## Configuração (já aplicada em `~/.claude.json`)

```json
"google-drive": {
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@piotr-agier/google-drive-mcp"],
  "env": {
    "GOOGLE_DRIVE_OAUTH_CREDENTIALS": "C:\\Users\\Ronan Silva\\.config\\google-drive-mcp\\gcp-oauth.keys.json"
  }
}
```

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Pacote npm | https://www.npmjs.com/package/@piotr-agier/google-drive-mcp |
| Drive API | https://developers.google.com/drive/api/reference/rest/v3 |
| Sheets API | https://developers.google.com/sheets/api/reference/rest |
| Docs API | https://developers.google.com/docs/api/reference/rest |
| Slides API | https://developers.google.com/slides/api/reference/rest |
| Calendar API | https://developers.google.com/calendar/api/v3/reference |

---

## Estado por serviço (verificado ao vivo 2026-06-24)

| Serviço | Status | Nota |
|---------|--------|------|
| Drive | ✅ | `search`, `listFolder`, permissões |
| Sheets | ✅ | `listGoogleSheets` retornou planilhas reais |
| Docs | ✅ | escopo `documents` concedido |
| Slides | ✅ | escopo `presentations` concedido |
| Calendar | ⚠️ → ✅ | OAuth ok; exigiu **habilitar a Calendar API** no projeto GCP `1098911614973` (estava desabilitada) |

**Habilitar a Calendar API (uma vez):**
`https://console.developers.google.com/apis/api/calendar-json.googleapis.com/overview?project=1098911614973` → *Enable*. Propaga em 1–2 min. Sem reautenticação (o escopo já estava no consentimento).

---

## Uso básico (tools MCP)

- **Diagnóstico:** `authGetStatus`, `authListScopes`, `authTestFileAccess`.
- **Drive:** `search`, `listFolder`, `createFolder`, `uploadFile`, `downloadFile`, `shareFile`, `listPermissions`.
- **Sheets:** `listGoogleSheets`, `getGoogleSheetContent`, `createGoogleSheet`, `updateGoogleSheet`, `appendSpreadsheetRows`.
- **Docs:** `createGoogleDoc`, `getGoogleDocContent`, `updateGoogleDoc`, `findAndReplaceInDoc`.
- **Slides:** `createGoogleSlides`, `getGoogleSlidesContent`, `updateGoogleSlides`.
- **Calendar:** `listCalendars`, `getCalendarEvents`, `createCalendarEvent`, `updateCalendarEvent`, `deleteCalendarEvent`.

---

## Notas Kolden

- O token de acesso expira a cada ~1h, mas o **refresh_token renova automaticamente** — não é preciso reautenticar entre sessões.
- Conta Google: pessoal do Ronan (decisão de 2026-06-23: recusou conector gerenciado, service account e stack local+Infisical para este caso).
- Por usar OAuth desktop com arquivo de token local, este MCP **não** roda embrulhado em `infisical run` (não há chave estática a injetar) — é a exceção ao padrão do catálogo.
- Reautenticar/trocar de conta: apagar `tokens.json` e rodar o fluxo OAuth do pacote novamente.
