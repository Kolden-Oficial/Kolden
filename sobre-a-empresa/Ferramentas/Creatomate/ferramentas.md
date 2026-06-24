# Creatomate — Referência de Uso

Creatomate é uma API de geração de mídia (Áudio/Vídeo) para criar e renderizar vídeos e imagens via código a partir de templates e JSON, produzindo arquivos MP4, GIF, MP3, JPEG ou PNG com processamento na nuvem. Categoria: Áudio/Vídeo.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| CREATOMATE_API_KEY | `/kolden/prod/CREATOMATE_API_KEY` |
| CREATOMATE_PUBLIC_TOKEN | `/kolden/prod/CREATOMATE_PUBLIC_TOKEN` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://creatomate.com/docs/api/introduction |
| Referência da API | https://creatomate.com/docs/api/reference/introduction |
| Repositório GitHub | https://github.com/creatomate (org); Node.js: https://github.com/Creatomate/creatomate-node |
| Fórum / Comunidade | não encontrado (sem fórum/Discord oficial; suporte por e-mail: support@creatomate.com) |
| Changelog / Status | não encontrado (página de status dedicada não localizada; novidades no blog: https://creatomate.com/blog) |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — comunidade/terceiros (NÃO há servidor MCP oficial da Creatomate). A organização no GitHub não publica nenhum repositório MCP. Existem integrações MCP de terceiros via Zapier e viaSocket.
- **Repositório:** n/a (sem repo oficial). Plataformas de terceiros: https://zapier.com/mcp/creatomate e https://viasocket.com/mcp/creatomate
- **Instalação:** `n/a` (não há `claude mcp add` oficial). As opções de terceiros são hospedadas/remotas pelas próprias plataformas (Zapier/viaSocket), configuradas no painel delas — não via npx local.

---

## Uso básico

- **Base URL / SDK:** Base URL da API REST: `https://api.creatomate.com/v1`. Endpoint principal de renderização: `POST https://api.creatomate.com/v1/renders`. SDK oficial Node.js: pacote npm `creatomate` (`npm install creatomate`). Também há biblioteca PHP oficial (`creatomate-php`) e SDK de preview no navegador (`creatomate-preview`).
- **Autenticação:** Bearer token no header HTTP — `Authorization: Bearer <CREATOMATE_API_KEY>`. A chave fica em Project Settings do painel Creatomate. O `CREATOMATE_PUBLIC_TOKEN` é usado pelo Preview SDK no front-end (não usar a API key secreta no navegador).
- **Exemplo mínimo (cURL, via Infisical — sem chave literal):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
  curl -X POST https://api.creatomate.com/v1/renders \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $CREATOMATE_API_KEY" \
    -d "{
      \"template_id\": \"SEU_TEMPLATE_ID\",
      \"modifications\": {
        \"Primary-Text\": \"Texto colocado no vídeo\",
        \"Background-Video\": \"https://exemplo.com/video1.mp4\"
      }
    }"
'
```

- **Exemplo mínimo (Node.js SDK, via Infisical):**

```js
// rode com: infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- node render.js
const Creatomate = require('creatomate');
const client = new Creatomate.Client(process.env.CREATOMATE_API_KEY);

client
  .render({ templateId: 'SEU_TEMPLATE_ID', modifications: { 'Primary-Text': 'Olá' } })
  .then((renders) => console.log(renders));
```

> Renderização é assíncrona: configure um webhook para ser notificado quando o render terminar, ou faça polling em `GET /v1/renders/{id}`.

---

## Notas Kolden

- Uso típico na operação de afiliados/Telegram + Shopee: geração automática e em escala de criativos de vídeo (anúncios, reels, banners) a partir de templates parametrizados por JSON — ideal para variações em massa por produto/copy.
- Resolver sempre as credenciais em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod`. A `CREATOMATE_API_KEY` é secreta (backend/render); o `CREATOMATE_PUBLIC_TOKEN` é para preview no cliente.
- Sem MCP oficial: se for necessário um servidor MCP, avaliar as pontes de terceiros (Zapier/viaSocket) ou construir um wrapper MCP próprio sobre a API REST `/v1/renders`.
