---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# Supabase — Referência de Uso

Supabase é a plataforma open source de desenvolvimento sobre Postgres ("alternativa ao Firebase"): banco de dados Postgres dedicado, Auth, APIs REST/GraphQL automáticas, Realtime, Storage e Edge Functions. Categoria: Banco/Backend.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| SUPABASE_API_TOKEN | `/kolden/prod/SUPABASE_API_TOKEN` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://supabase.com/docs |
| Referência da API | https://supabase.com/docs/reference (Management API: https://supabase.com/docs/reference/api/introduction) |
| Repositório GitHub | https://github.com/supabase/supabase (SDK JS: https://github.com/supabase/supabase-js) |
| Fórum / Comunidade | https://github.com/orgs/supabase/discussions e Discord via https://supabase.com/support |
| Changelog / Status | https://supabase.com/changelog e https://status.supabase.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial
- **Repositório:** https://github.com/supabase-community/supabase-mcp (também referenciado como https://github.com/supabase/mcp; pacote npm `@supabase/mcp-server-supabase`)
- **Instalação:**
  - Servidor remoto (recomendado, HTTP): `claude mcp add --transport http supabase https://mcp.supabase.com/mcp`
  - Local via npx (stdio): `claude mcp add supabase -- npx -y @supabase/mcp-server-supabase@latest --read-only --project-ref=<PROJECT_REF>`
  - Exemplo de config JSON (`mcpServers`):
    ```json
    {
      "mcpServers": {
        "supabase": {
          "type": "http",
          "url": "https://mcp.supabase.com/mcp?project_ref=${SUPABASE_PROJECT_REF}"
        }
      }
    }
    ```

---

## Uso básico

- **Base URL / SDK:**
  - Management API (gestão de orgs/projetos): base URL `https://api.supabase.com/v1`
  - Por projeto (Data/Auth/Storage): `https://<PROJECT_REF>.supabase.co`
  - SDK oficial JavaScript: `npm i @supabase/supabase-js`
  - SDK oficial Python: `pip install supabase`
- **Autenticação:**
  - Management API: header `Authorization: Bearer <SUPABASE_API_TOKEN>` (Personal Access Token).
  - SDK por projeto: `createClient(SUPABASE_URL, SUPABASE_KEY)` usando a anon/service key do projeto.
- **Exemplo mínimo (curl, token injetado pelo Infisical — nunca literal):**
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
    curl -s -X GET "https://api.supabase.com/v1/projects" \
      -H "Authorization: Bearer $SUPABASE_API_TOKEN"
  ```
  Exemplo SDK JavaScript:
  ```js
  import { createClient } from '@supabase/supabase-js'
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  const { data, error } = await supabase.from('produtos').select('*')
  ```

---

## Notas Kolden

- O `SUPABASE_API_TOKEN` é um Personal Access Token da Management API — usado para automações de gestão (criar/listar projetos, configurar auth, migrações). Para acesso a dados de uma aplicação específica, usar a URL e a chave (anon/service) do projeto correspondente, também resolvidas via Infisical.
- Preferir o servidor MCP remoto (`https://mcp.supabase.com/mcp`) com flag `--read-only` quando o agente só precisa consultar; restringir por `project_ref` para limitar o escopo.
- Sempre injetar credenciais em runtime com `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`; nunca escrever a chave literal em código, config ou logs (Art. VII).
