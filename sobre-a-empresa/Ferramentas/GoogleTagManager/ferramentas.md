# Google Tag Manager (GTM) — Referência de Uso

Acesso ao Google Tag Manager — contas, containers, tags, triggers, variáveis, versões. Categoria: Analytics / Tracking. **Uso direto via API com ADC** (escopo `tagmanager.readonly`); MCP comunitário é opção futura.

---

## Credenciais (ADC — não Infisical)

Mesmo ADC do `gcloud` (conta `adm@kolden.com.br`, Workspace). Sem chave estática.

| Item | Valor |
|------|-------|
| ADC file | `C:\Users\Ronan Silva\AppData\Roaming\gcloud\application_default_credentials.json` |
| Escopo | `https://www.googleapis.com/auth/tagmanager.readonly` |
| API habilitada | `tagmanager.googleapis.com` |

---

## Contas acessíveis (verif. 2026-06-24)

| Conta | accountId |
|-------|-----------|
| Kolden | `6327657811` |
| Danielle Benício | `6204464505` |

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação | https://developers.google.com/tag-platform/tag-manager/api/v2 |
| Reference | https://developers.google.com/tag-platform/tag-manager/api/v2/reference |
| MCP comunitário | https://github.com/paolobietolini/gtm-mcp-server (Node, OAuth próprio) |

---

## MCP

- **Hoje:** uso direto via API REST com ADC (validado). Sem MCP ativo.
- **Opção futura:** `paolobietolini/gtm-mcp-server` (comunitário, Node/`npx`, OAuth próprio) para gestão por linguagem natural (criar/publicar tags). Requer fluxo OAuth separado — adicionar só quando houver demanda de **escrita** em containers. Para leitura, o ADC já basta.

---

## Uso básico

```powershell
$g = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
$tok = & $g auth application-default print-access-token
# Listar contas
Invoke-RestMethod -Uri "https://tagmanager.googleapis.com/tagmanager/v2/accounts" -Headers @{ Authorization = "Bearer $tok" }
# Listar containers de uma conta
Invoke-RestMethod -Uri "https://tagmanager.googleapis.com/tagmanager/v2/accounts/6327657811/containers" -Headers @{ Authorization = "Bearer $tok" }
```

---

## Notas Kolden

- **Quem usa:** squad **Peitho** (setup de tracking de tráfego pago).
- Escopo atual é **read-only**. Escrita (criar/publicar tags) exige escopo `tagmanager.edit.containers`/`publish` + provavelmente o MCP comunitário ou SDK.
- Para automação server-side, migrar para Service Account adicionada à conta GTM.
