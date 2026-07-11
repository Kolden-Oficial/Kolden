---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Synter — Referência de Uso

Synter ("Cursor for Ads") é uma plataforma de orquestração por agentes de IA que executa campanhas de mídia paga via linguagem natural em 9+ plataformas (Google Ads, Meta, LinkedIn, Microsoft Ads, Reddit, TikTok, The Trade Desk, StackAdapt). Categoria: Marketing.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| SYNTER_API_KEY | `/kolden/dev/SYNTER_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.syntermedia.ai/quickstart |
| Referência da API | https://docs.syntermedia.ai/api/authentication |
| Repositório GitHub | https://github.com/Synter-Media-AI/mcp-server |
| Fórum / Comunidade | não encontrado (suporte via e-mail: hello@syntermedia.ai) |
| Changelog / Status | https://docs.syntermedia.ai/changelog/mcp-server-launch |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (mantido pela org `Synter-Media-AI` no GitHub)
- **Repositório:** https://github.com/Synter-Media-AI/mcp-server
- **Instalação:**
  - Local (npx): `npx @synterai/mcp-server`
  - Remoto (Streamable HTTP): URL `https://mcp.syntermedia.ai/mcp/` com header `X-Synter-Key`
  - Claude Code: `claude mcp add synter --env SYNTER_API_KEY=$SYNTER_API_KEY -- npx @synterai/mcp-server`

> Para a opção remota, configure o transporte HTTP do cliente apontando para `https://mcp.syntermedia.ai/mcp/` e injete a chave no header `X-Synter-Key`. Nunca colocar a chave literal no config — usar variável de ambiente resolvida pelo Infisical.

---

## Uso básico

- **Base URL / SDK:**
  - REST API: `https://api.syntermedia.ai/v1` (endpoint principal `POST /v1/tools/run`)
  - SDK Python: `pip install synter`
  - SDK JavaScript: não encontrado (mas há o pacote MCP `@synterai/mcp-server`)
- **Autenticação:** header `X-Synter-Key: <chave>`. A chave tem formato `syn_xxxxxxxx...`, é gerada no Developer Portal (https://syntermedia.ai/developer) e fica vinculada à conta e às plataformas de anúncio conectadas. Modelo de créditos: leitura = 1 crédito, escrita = 5 créditos, 200 créditos grátis no início.
- **Exemplo mínimo (curl, chave injetada pelo Infisical — nunca literal):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  curl -X POST https://api.syntermedia.ai/v1/tools/run \
    -H "X-Synter-Key: $SYNTER_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{"script_name": "list_campaigns"}'
```

---

## Notas Kolden

- Categoria Marketing: candidato natural para automações de mídia paga multicanal (Google/Meta/LinkedIn/TikTok) operadas por linguagem natural, integrando-se ao stack de agentes do Kolden via MCP.
- Preferir a integração via MCP remoto (`https://mcp.syntermedia.ai/mcp/`) ou via `claude mcp add` com a chave injetada pelo Infisical, mantendo o padrão de nunca persistir credenciais em configs.
- Atenção ao modelo de créditos (escrita custa 5x a leitura) ao desenhar fluxos automatizados que façam alterações em campanhas.
