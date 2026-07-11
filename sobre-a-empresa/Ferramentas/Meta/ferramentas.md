---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Meta (Ads / Conversions API) — Referência de Uso

A Conversions API (CAPI) da Meta cria uma conexão servidor-a-servidor entre os dados de marketing do anunciante (eventos de site, app, mensagens e conversões offline) e os sistemas da Meta, melhorando otimização, mensuração e redução de custo por resultado dos anúncios no Facebook/Instagram. Categoria: Marketing.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| META_CAPI_TOKEN | `/kolden/dev/META_CAPI_TOKEN` |
| META_PIXEL_ID | `/kolden/dev/META_PIXEL_ID` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://developers.facebook.com/docs/marketing-api/conversions-api/ |
| Referência da API | https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api/ |
| Repositório GitHub | https://github.com/facebook/facebook-python-business-sdk |
| Fórum / Comunidade | https://developers.facebook.com/community/ |
| Changelog / Status | https://developers.facebook.com/docs/graph-api/changelog |

> Repos GitHub adicionais (SDKs oficiais Meta): Node.js https://github.com/facebook/facebook-nodejs-business-sdk · PHP https://github.com/facebook/facebook-php-business-sdk · Java https://github.com/facebook/facebook-java-business-sdk

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **comunidade** (não há MCP oficial da Meta). Atenção: os MCPs disponíveis cobrem **gestão de Ads (Marketing API)**, e **não** a Conversions API de envio de eventos.
- **Repositório:** https://github.com/pipeboard-co/meta-ads-mcp (alternativa: https://github.com/hashcott/meta-ads-mcp-server)
- **Instalação:** `pip install meta-ads-mcp` (também disponível como Remote MCP hospedado em `https://meta-ads.mcp.pipeboard.co/`). Para registrar no Claude Code: `claude mcp add meta-ads -- python -m meta_ads_mcp`

---

## Uso básico

- **Base URL / SDK:** Endpoint REST `https://graph.facebook.com/<VERSAO>/<PIXEL_ID>/events` (ex.: versão atual v25.0). SDK oficial Python: `pip install facebook_business` (pacote PyPI `facebook-business`, import `facebook_business`).
- **Autenticação:** token de acesso (System User / Pixel access token) enviado no campo `access_token` do POST. No Kolden, o token é o `META_CAPI_TOKEN` e o destino é o `META_PIXEL_ID` (dataset), ambos resolvidos via Infisical — nunca literal no código.
- **Exemplo mínimo** (curl, com credenciais injetadas pelo Infisical):

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- bash -c '
curl -X POST \
  -F "data=[{\"event_name\":\"Purchase\",\"event_time\":1674000041,\"action_source\":\"website\",\"user_data\":{\"em\":[\"<hash_sha256_email>\"]},\"custom_data\":{\"currency\":\"BRL\",\"value\":123.45}}]" \
  -F "access_token=$META_CAPI_TOKEN" \
  "https://graph.facebook.com/v25.0/$META_PIXEL_ID/events"
'
```

> Os dados pessoais (email/telefone) em `user_data` devem ser enviados em hash SHA-256. Use o Events Manager > Test Events para validar a integração.

---

## Notas Kolden

- **Referência ampla do ecossistema:** este manual cobre só a **Conversions API (CAPI)**. Para o **ecossistema inteiro** de APIs da Meta (Marketing API, Graph, Instagram, WhatsApp Business, Messenger, Webhooks, SDKs, tokens/escopos, App Review), ver o mapeamento sintetizado em `sobre-a-empresa/operacao/inteligencia-e-referencias.md` §1 (fonte: Doc `1nzYjxJF1whvt_SiP-8c8wXZai_cizLFkv-zx6OFsHZM`).
- A Meta CAPI é usada no Kolden para **rastreamento server-side de conversões** dos funis de afiliados (Anúncio → LP → Telegram → Shopee), enviando eventos de servidor para complementar/substituir o Pixel do navegador e melhorar a atribuição da operação Telegram + Shopee.
- Para automação de **campanhas/insights de Ads** (criar campanhas, ler métricas), considerar o MCP de comunidade `meta-ads-mcp`; para **envio de eventos de conversão**, usar o SDK `facebook-business` ou chamada direta ao endpoint `/events`.
- Sempre resolver `META_CAPI_TOKEN` e `META_PIXEL_ID` via Infisical em runtime; nunca commitar valores.
