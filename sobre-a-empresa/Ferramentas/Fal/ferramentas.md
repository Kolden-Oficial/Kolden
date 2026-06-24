# Fal (fal.ai) — Referência de Uso

Plataforma de inferência serverless que dá acesso por API a 1.000+ modelos generativos de imagem, vídeo, áudio e 3D (ex.: FLUX, Kling, Seedance), com GPUs sob demanda. Categoria: IA/Mídia.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| FAL_API_KEY | `/kolden/prod/FAL_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.fal.ai/ |
| Referência da API | https://fal.ai/docs/api-reference |
| Repositório GitHub | https://github.com/fal-ai (Python: https://github.com/fal-ai/fal — JS: https://github.com/fal-ai/fal-js) |
| Fórum / Comunidade | https://discord.com/invite/fal-ai |
| Changelog / Status | Changelog: https://fal.ai/docs/changelog — Status: https://status.fal.ai |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (servidor HTTP hospedado pela fal em `https://mcp.fal.ai/mcp`). Há também implementações de comunidade (ex.: `github.com/am0y/mcp-fal`, `github.com/derekalia/fal`).
- **Repositório:** servidor oficial é hospedado (sem repo público; doc em https://fal.ai/docs/documentation/setting-up/mcp)
- **Instalação (oficial, Claude Code):**
  ```bash
  claude mcp add --transport http fal-ai \
    https://mcp.fal.ai/mcp \
    --header "Authorization: Bearer $FAL_API_KEY"
  ```
  > Cada requisição usa sua própria chave; nada é armazenado no servidor. Claude Desktop / claude.ai (conectores OAuth) ainda não suportados — só transporte HTTP com Bearer. Resolver a chave via Infisical, nunca colar o valor literal.

---

## Uso básico

- **Base URL / SDK:**
  - Base URL da API (fila/queue): `https://queue.fal.run/` (ex.: `https://queue.fal.run/fal-ai/flux/schnell`).
  - SDK Python: `pip install fal-client` — SDK JavaScript/TypeScript: `npm install @fal-ai/client`.
- **Autenticação:** header HTTP `Authorization: Key <FAL_KEY>`. Os SDKs leem automaticamente a variável de ambiente `FAL_KEY`. No Kolden, injetar via Infisical mapeando `FAL_API_KEY` → `FAL_KEY`.
- **Exemplo mínimo (cURL, chave injetada pelo Infisical):**
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
    bash -c 'curl -X POST "https://queue.fal.run/fal-ai/flux/schnell" \
      -H "Authorization: Key $FAL_API_KEY" \
      -H "Content-Type: application/json" \
      -d "{\"prompt\": \"a futuristic cityscape at sunset\"}"'
  ```
- **Exemplo mínimo (Python, SDK lê `FAL_KEY` do ambiente):**
  ```bash
  # FAL_KEY recebe o valor de FAL_API_KEY resolvido pelo Infisical
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod --command 'FAL_KEY="$FAL_API_KEY" python gerar.py'
  ```
  ```python
  # gerar.py
  import fal_client
  result = fal_client.subscribe(
      "fal-ai/flux/schnell",
      arguments={"prompt": "a futuristic cityscape at sunset"},
  )
  print(result)
  ```

---

## Notas Kolden

- Uso típico no Kolden: geração de mídia para campanhas (imagens de produto, vídeos curtos de anúncio) na operação de afiliados Shopee/Telegram e em ativos visuais de landing pages. Pode ser orquestrado por agentes via servidor MCP oficial para buscar/rodar/encadear modelos direto na conversa.
- Sempre resolver `FAL_API_KEY` em runtime pelo Infisical (`/kolden/prod`), mapeando para `FAL_KEY` quando usar os SDKs. Nunca persistir a chave em arquivos, scripts ou configs de MCP.
