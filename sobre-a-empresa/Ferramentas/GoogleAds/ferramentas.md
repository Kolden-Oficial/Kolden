---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Google Ads API — Referência de Uso

Acesso à Google Ads API (campanhas, métricas de performance, keywords, gestão de anúncios) via o **MCP oficial do Google** (`google-ads-mcp`). Categoria: Marketing / Ads. **Status: aguardando developer token** (aprovação do Google).

---

## Status (2026-06-24)

⏳ **Bloqueado pelo developer token.** A Google Ads API exige um *developer token* aprovado — diferente das outras APIs Google, não basta habilitar no GCP. O token tem processo de aprovação próprio (Explorer/Test imediato; Basic Access leva **dias a semanas**, com backlog reconhecido pelo Google em fev/2026). API `googleads.googleapis.com` já habilitada no projeto; ADC já configurado.

---

## O que o Ronan precisa fazer (uma vez)

1. **Conta MCC (manager):** ter/criar uma conta gerenciadora em https://ads.google.com (manager account).
2. **Aplicar o developer token:** em https://ads.google.com/aw/apicenter (logado na MCC), preencher o API Access form e aceitar os T&C.
   - Sai em **Explorer/Test access** na hora → já dá para testar contra *test accounts*.
   - Para produção: solicitar **Basic Access** com use-case detalhado (multi-frase: o que a Kolden faz + como usará a API). Aprovação leva dias–semanas.
3. **Cadastrar no Infisical** (env a combinar; sugestão `dev` enquanto testa):
   - `GOOGLEADS_DEVELOPER_TOKEN` — o developer token
   - `GOOGLEADS_LOGIN_CUSTOMER_ID` — ID da MCC (sem hífens)
   - `GOOGLEADS_CUSTOMER_ID` — ID da conta de anúncios alvo (sem hífens)

> Atalho enquanto o token não sai: **Windsor.ai** (`/kolden/dev/WINDSOR_API_KEY`, já no catálogo) entrega dados de Google Ads por ETL sem developer token próprio.

---

## MCP (config pronta — ativar quando o token existir)

**Servidor oficial:** `github.com/googleads/google-ads-mcp`. Aceita **ADC** (já temos) + developer token. Quando o token estiver no Infisical, o bloco no `.claude.json` (via shim, para injetar o token sem hardcode) fica:

```json
"google-ads": {
  "type": "stdio",
  "command": "node",
  "args": [
    "C:\\Users\\Ronan Silva\\.claude\\infisical-shim.cjs",
    "run", "--projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093", "--env=dev", "--",
    "<...>\\Scripts\\uvx.exe", "--from", "git+https://github.com/googleads/google-ads-mcp.git", "google-ads-mcp"
  ],
  "env": {
    "GOOGLE_APPLICATION_CREDENTIALS": "C:\\Users\\Ronan Silva\\AppData\\Roaming\\gcloud\\application_default_credentials.json",
    "GOOGLE_PROJECT_ID": "gen-lang-client-0988823565",
    "GOOGLE_ADS_DEVELOPER_TOKEN": "{{GOOGLEADS_DEVELOPER_TOKEN}}",
    "GOOGLE_ADS_LOGIN_CUSTOMER_ID": "{{GOOGLEADS_LOGIN_CUSTOMER_ID}}"
  }
}
```
(O shim expande `{{GOOGLEADS_*}}` em runtime — segredo nunca entra no `.claude.json`.)

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| MCP oficial | https://github.com/googleads/google-ads-mcp |
| Guia MCP | https://developers.google.com/google-ads/api/docs/developer-toolkit/mcp-server |
| Developer token | https://developers.google.com/google-ads/api/docs/api-policy/developer-token |
| Access levels | https://developers.google.com/google-ads/api/docs/api-policy/access-levels |

---

## Validação (planejada)

1. Com Explorer/Test access: listar campanhas de uma **test account** (funciona imediatamente).
2. Com Basic Access aprovado: queries em conta de produção.

---

## Notas Kolden

- **Quem usa:** squads **Peitho** (tráfego pago) e **Argos** (`ads-intel`).
- Único item do ecossistema Google que **não fecha na hora** — depende de aprovação externa do Google.
- A API key comum (PageSpeed/YouTube) **não** serve para Ads; Ads exige OAuth/ADC + developer token.
