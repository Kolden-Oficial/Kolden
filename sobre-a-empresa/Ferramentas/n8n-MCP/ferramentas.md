---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# n8n-MCP — Referência de Uso (vendor inerte)

**n8n-MCP** (czlonkowski) é um **servidor MCP que ensina e permite a uma IA construir, validar e fazer
deploy de workflows do n8n**. Traz documentação embarcada de ~2.063 nós e ~2.352 templates, e ~24 tools:
descoberta de nós (`search_nodes`/`get_node`), validação em camadas de nó/workflow/expressões,
biblioteca de templates, CRUD de workflows na instância n8n (via API), update incremental por **diff**
(economiza ~80-90% de tokens), autofix, execução/health/auditoria e ops de instância
(deploy/datatable/credenciais/versões). Transportes stdio + HTTP single-session. Categoria: Automação
(workflows n8n).

> **Status:** `vendor-registrado (não instalado)`. Atrelado ao domínio de **automação do Dédalo**.
> A ativação real **exige uma instância n8n + API key** (pendência de produto, não de absorção).
> **Nada instalado, código não copiado.** Quarentena gitignored:
> `Caos/_staging/quarentena/czlonkowski--n8n-mcp/`.

---

## Como consumir (NÃO copiar o código)

Servidor MCP publicado no npm — consumir via `npx`. As tools de **documentação/validação** funcionam sem
instância n8n; as tools de **gestão** (CRUD/deploy/execução) exigem `N8N_API_URL` + `N8N_API_KEY`:

```bash
# Modo doc/validação (sem instância n8n) — descobrir e validar nós/workflows
claude mcp add --scope user n8n -- npx -y n8n-mcp

# Modo completo (gerencia workflows numa instância n8n) — chaves via Infisical
claude mcp add --scope user n8n -- \
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  npx -y n8n-mcp
# requer N8N_API_URL e N8N_API_KEY cadastrados no Infisical
```

A tool `tools_documentation` (auto-documentação do MCP) é o melhor ponto de partida após registrar.

---

## Licença + procedência

| Campo | Valor |
|-------|-------|
| Licença | **MIT** (Copyright (c) 2024 Romuald Czlonkowski @ aiadvisors.pl) |
| Repositório | https://github.com/czlonkowski/n8n-mcp |
| SHA analisado | `f5694cce54c26777e6c16d606eb6b90cd39f5f96` |
| Veredito de segurança (F2) | **SAFE** — sem segredos hardcoded (`.env.example` só placeholders), sem postinstall malicioso (`prepare: husky` é hook de dev); ocorrências de `eval/exec/child_process` são **detecção defensiva** (avisa sobre Code node do usuário) ou `git clone` de docs em build com args em array; projeto roda secretlint próprio |

---

## Ressalvas (soberania / gates / Infisical)

- **Credenciais via Infisical (obrigatório):** `N8N_API_URL` e `N8N_API_KEY` da instância n8n vão para o
  Infisical (`--env=dev`/`prod` conforme o caso), nunca em texto puro nem na config do MCP literal.
- **Poder de escrita na instância:** com a API configurada, o MCP pode **criar/alterar/excluir
  workflows** na instância n8n — risco **operacional do uso** (não do código). Apontar para instância
  controlada; cuidado com `n8n_manage_credentials`.
- **Soberania:** o n8n é tipicamente self-hosted (combina com a filosofia Kolden); a biblioteca de
  templates consulta `n8n.io` (rede), e a doc dos nós é embarcada/local.
- **Pendência de produto:** sem instância n8n provisionada, só as tools de doc/validação têm uso.

---

## Notas Kolden

- **Domínio/governança:** Dédalo (automação: claude-code, hooks, mcp, skills).
- Ganchos ADAPT→Dédalo (técnica, não código): (G7) "update de workflow por **diff** economizando tokens"
  e (G12) o playbook "Claude Project para n8n" (templates-first, validação multinível,
  never-trust-defaults) — viram nota/skill de operação **quando** o MCP estiver ativo.
- As **Claude Skills oficiais de n8n** vivem em repo externo (`n8n-skills`) — registradas como ponteiro de
  referência, não absorvidas aqui.
- Vendor inerte: o núcleo (10 tools) entra no catálogo como ferramenta consultável; não vira agente.

---

> Atribuição: descrição e superfície de uso derivadas de `czlonkowski/n8n-mcp`@`f5694cc` (MIT).
> Sem cópia de código — apenas o consumo (MCP via npx) está documentado.
