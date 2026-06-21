# Apify — Referência de Uso

Apify é uma plataforma de web scraping e automação de navegador baseada em **Actors** — programas
serverless de coleta que rodam na nuvem da Apify. Oferece o **Apify Store** (milhares de actors
prontos: scrapers de Google Maps, Instagram, TikTok, LinkedIn, e-commerce etc.), API REST v2,
e armazenamento gerenciado (datasets, key-value stores, request queues). Categoria: Busca/Scraping.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| APIFY_TOKEN | `/kolden/dev/APIFY_TOKEN` |
| APIFY_USER_ID | `/kolden/dev/APIFY_USER_ID` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>`.
>
> ℹ️ `APIFY_TOKEN` é o nome nativo do segredo na Apify (lido diretamente pelo SDK e pelo MCP oficiais);
> basta ele para a API/SDK/MCP. `APIFY_USER_ID` é o identificador da conta (alguns endpoints/webhooks).
> Ambos vivem no env **`dev`** do Infisical (verificado — `infisical run --env=dev`). Gere/gerencie em
> *Apify Console → Settings → API & Integrations*.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.apify.com |
| Referência da API | https://docs.apify.com/api/v2 |
| Repositório GitHub (Python) | https://github.com/apify/apify-client-python |
| Repositório GitHub (JS/TS) | https://github.com/apify/apify-client-js |
| Apify Store (actors prontos) | https://apify.com/store |
| MCP oficial | https://docs.apify.com/platform/integrations/mcp · https://mcp.apify.com |
| Fórum / Comunidade | https://discord.com/invite/jyEM2PRvMU (Discord) |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (mantido pela Apify)
- **Repositório:** https://github.com/apify/actors-mcp-server (pacote npm: `@apify/actors-mcp-server`) · servidor remoto: `https://mcp.apify.com`
- **Instalação (local via npx, token injetado pelo Infisical):**
  ```bash
  claude mcp add --scope user apify -- \
    infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
    npx -y @apify/actors-mcp-server
  ```
  - Variante remota (header): servidor `https://mcp.apify.com` com `Authorization: Bearer $APIFY_TOKEN`.
  - O MCP permite ao Claude **descobrir e rodar actors** do Apify Store e ler os resultados (datasets).
  - O servidor lê a variável `APIFY_TOKEN` da env (injetada pelo Infisical) — nunca o valor literal.

---

## Uso básico

- **Base URL / SDK:** API base: `https://api.apify.com/v2`. SDK oficial Python: `pip install apify-client`;
  SDK oficial Node: `npm install apify-client`.
- **Autenticação:** header HTTP `Authorization: Bearer <APIFY_TOKEN>` (ou query `?token=`, evitar — prefira o header).
- **Exemplo mínimo:** (a chave é resolvida pelo Infisical em runtime; nunca escreva o valor literal)

```bash
# Listar os actors da conta (valida a credencial)
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  curl -s "https://api.apify.com/v2/acts" \
    -H "Authorization: Bearer $APIFY_TOKEN"
```

```bash
# Rodar um actor do Store de forma síncrona e já receber os itens do dataset
# (ex.: apify/website-content-crawler — substitua pelo actor desejado)
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  curl -s -X POST "https://api.apify.com/v2/acts/apify~website-content-crawler/run-sync-get-dataset-items" \
    -H "Authorization: Bearer $APIFY_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"startUrls":[{"url":"https://example.com"}]}'
```

```bash
# SDK Python, lendo a chave da env injetada pelo Infisical
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- python -c '
import os
from apify_client import ApifyClient
client = ApifyClient(os.environ["APIFY_TOKEN"])
run = client.actor("apify/website-content-crawler").call(run_input={"startUrls":[{"url":"https://example.com"}]})
for item in client.dataset(run["defaultDatasetId"]).iterate_items():
    print(item)
'
```

---

## Notas Kolden

- Uso típico no Kolden: rodar **actors prontos** do Apify Store para coleta gerenciada (scrapers de
  redes sociais, Google Maps, e-commerce, SERP) sem manter o scraper próprio — a coleta roda na infra
  da Apify, com proxies e anti-bot embutidos.
- **Sinergia com o squad Argos** (`C:\Kolden\Argos\`): a Apify é uma camada de coleta gerenciada do
  motor do Argos (`motor/argos-engine.py apify`). Roda actors do Store em vez de manter scraper próprio;
  ainda assim, actors que tocam ToS de uma plataforma passam pelo juízo do `compliance-sentinela` — a
  Apify terceiriza a **infra**, não o **ToS** da plataforma-alvo.
- Sempre rodar comandos sob `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- ...`
  para que `APIFY_TOKEN` seja injetada em runtime; nunca persistir a chave em `.env` versionado nem em
  config MCP com valor literal.
- API atual é a v2 (`/v2/...`); confira a doc antes de fixar versões de endpoint ou de SDK.
