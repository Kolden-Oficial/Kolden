---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/LobeChat/LobeHub|LobeHub]]"
---

# LobeChat — Referência de Uso

LobeChat (LobeHub) é um framework de chat de IA open-source, self-hosted, com UI moderna, que agrega múltiplos provedores de LLM (OpenAI, Claude, Gemini, Ollama, DeepSeek, etc.), base de conhecimento (RAG), plugins e marketplace de servidores MCP. Categoria: IA/UI.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| LOBECHAT_API_KEY | `/kolden/prod/LOBECHAT_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://lobehub.com/docs |
| Referência da API | https://chat-plugin-sdk.lobehub.com/ (Plugin SDK / OpenAPI; LobeChat não expõe REST API pública própria — ver Notas) |
| Repositório GitHub | https://github.com/lobehub/lobe-chat |
| Fórum / Comunidade | https://discord.gg/AYFPHvv2jT |
| Changelog / Status | https://lobehub.com/changelog |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — porém LobeChat é **MCP Host/Client** (consome servidores MCP), não fornece um servidor MCP oficial para controlá-lo externamente.
- **Repositório:** Marketplace oficial de servidores MCP em https://lobehub.com/mcp ; plugin de comunidade para conectar MCP/OpenAPI: https://github.com/DBFritz/lobechat-mcp-plugin (não oficial)
- **Instalação:** n/a — não há `claude mcp add` para "controlar o LobeChat". O suporte a MCP é configurado dentro da própria UI do LobeChat (Configurações → conectar servidor MCP) a partir do marketplace. Ref. de implementação: issue https://github.com/lobehub/lobehub/issues/4945

---

## Uso básico

- **Base URL / SDK:** Não há API REST pública oficial do LobeChat para uso programático. O LobeChat é um aplicativo (self-hosted via Docker `lobehub/lobehub` ou cloud em https://lobehub.com). Pacotes npm oficiais sob o namespace `@lobehub` (ex.: `@lobehub/chat-plugin-sdk`, `@lobehub/ui`, `@lobehub/icons`, `@lobehub/tts`). O LobeChat *consome* APIs OpenAI-compatíveis dos provedores configurados.
- **Autenticação:** A chave de API é uma credencial de **provedor** que você insere no LobeChat. Duas formas:
  1. Via UI: Configurações → Provedor de Modelo → cole a API key (criptografada com `KEY_VAULTS_SECRET`).
  2. Via variável de ambiente no deploy self-hosted: ex. `OPENAI_API_KEY`, com `OPENAI_PROXY_URL` para endpoint OpenAI-compatível. Acesso ao app protegido por `ACCESS_CODE` / OAuth SSO. Doc: https://lobehub.com/docs/self-hosting/environment-variables/model-provider
- **Exemplo mínimo:** Subir o LobeChat injetando a chave via Infisical (nunca a chave literal). `LOBECHAT_API_KEY` é mapeada para a variável do provedor configurado:

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  docker run -d -p 3210:3210 \
    -e OPENAI_API_KEY="$LOBECHAT_API_KEY" \
    -e ACCESS_CODE="$LOBECHAT_ACCESS_CODE" \
    --name lobechat lobehub/lobehub
```

> Se `LOBECHAT_API_KEY` for, na verdade, a chave de um endpoint OpenAI-compatível, ajuste também `OPENAI_PROXY_URL` para a base URL correspondente.

---

## Notas Kolden

- O LobeChat tende a ser usado no Kolden como front-end self-hosted de chat multi-provedor e como **host de servidores MCP** (orquestrando ferramentas via marketplace MCP). A `LOBECHAT_API_KEY` deve ser sempre resolvida em runtime pelo Infisical (`infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- ...`) e injetada na variável de ambiente do provedor de modelo correspondente, nunca escrita em arquivos de configuração ou docker-compose versionados.
- Não existe SDK/REST oficial para automatizar o LobeChat em si; integrações programáticas usam o **Plugin SDK** (`@lobehub/chat-plugin-sdk`, OpenAPI) ou conectam servidores MCP. Caso seja necessário automação headless, preferir chamar diretamente a API do provedor (ex.: API Anthropic/OpenAI) em vez do LobeChat.
