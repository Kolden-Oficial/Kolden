---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Replicate — Referência de Uso

Plataforma de nuvem para executar modelos de IA (imagem, vídeo, áudio, texto, LLMs) via API, sem precisar gerenciar infraestrutura de machine learning. Permite rodar modelos públicos, fazer fine-tuning e fazer deploy de modelos customizados. Categoria: IA/Mídia.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| REPLICATE_API_TOKEN | `/kolden/prod/REPLICATE_API_TOKEN` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://replicate.com/docs |
| Referência da API | https://replicate.com/docs/reference/http |
| Repositório GitHub | https://github.com/replicate (org oficial, verificada; clientes: https://github.com/replicate/replicate-python e https://github.com/replicate/replicate-javascript) |
| Fórum / Comunidade | https://discord.com/invite/replicate (Discord oficial) |
| Changelog / Status | Changelog: https://replicate.com/changelog — Status: https://www.replicatestatus.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (Replicate mantém o pacote npm `replicate-mcp`, atualizado automaticamente a cada nova operação da HTTP API). Doc: https://replicate.com/docs/reference/mcp
- **Repositório:** Pacote npm: https://www.npmjs.com/package/replicate-mcp — Code Mode: https://github.com/replicate/replicate-mcp-code-mode
- **Instalação:**
  - Servidor remoto (recomendado): adicionar a URL hospedada `https://mcp.replicate.com` (ver instruções em https://mcp.replicate.com).
  - Local via Claude Code (Code Mode): `claude mcp add "replicate-code-mode" --scope user --transport stdio -- npx -y replicate-mcp@alpha --tools=code`
  - Local genérico (stdio): `npx -y replicate-mcp` (defina `REPLICATE_API_TOKEN` no ambiente do servidor MCP)

---

## Uso básico

- **Base URL / SDK:**
  - Base URL da API: `https://api.replicate.com/v1`
  - SDK Python (oficial): `pip install replicate`
  - SDK JavaScript/Node (oficial): `npm install replicate`
- **Autenticação:** Todas as requisições exigem o header `Authorization: Bearer $REPLICATE_API_TOKEN`. Os SDKs leem automaticamente a variável de ambiente `REPLICATE_API_TOKEN`. Tokens são gerenciados em https://replicate.com/account/api-tokens.
- **Exemplo mínimo (curl, via Infisical):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
curl -s -X POST \
  -H "Authorization: Bearer $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d "{\"version\": \"replicate/hello-world:5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa\", \"input\": {\"text\": \"Alice\"}}" \
  https://api.replicate.com/v1/predictions
'
```

  - O header `Prefer: wait` faz a requisição aguardar até ~60s pela execução do modelo antes de retornar.

- **Exemplo mínimo (Python, via Infisical):**

```bash
# A chave é injetada como variável de ambiente; nunca aparece literal no código.
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python -c '
import replicate
out = replicate.run(
    "replicate/hello-world:5c7d5dc6dd8bf75c1acaa8565735e7986bc5b66206b55cca93cb72c9bf15ccaa",
    input={"text": "Alice"},
)
print(out)
'
```

---

## Notas Kolden

- Uso típico: geração de mídia (imagens, vídeo, áudio) e inferência de modelos abertos/LLMs dentro de pipelines de automação e projetos de conteúdo.
- Sempre resolver `REPLICATE_API_TOKEN` em runtime via Infisical (`infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- ...`); nunca persistir o valor em `.env` versionado nem em código.
- Para agentes (Claude Code/Cursor), preferir o MCP oficial remoto (`https://mcp.replicate.com`) para search/run de modelos diretamente no fluxo do agente; o token deve vir do Infisical, não embutido na config do MCP.
