# 02 — Autenticação

Fonte: https://docs.solomon.com.br/authentication

## Visão geral

A comunicação com as APIs da Solomon é feita por **API Keys** vinculadas a uma loja e a um conjunto de permissões (`scopes`). Esse modelo garante controle fino, segurança operacional e separação clara entre teste e produção.

## Autenticação via API Key

- A chave secreta é exibida **uma única vez** na criação — armazene com segurança.
- Perdeu ou comprometeu? **Gere outra.**
- Toda requisição envia a chave no header `Authorization`:

```
Authorization: Bearer <SEU_TOKEN>
```

## Permissões

Toda API Key está vinculada à loja onde foi criada:

- Ações executadas com a chave afetam **exclusivamente** essa loja.
- Não é possível usar uma key de uma empresa para acessar dados de outra.
- O **Company ID** define o escopo da operação.

Escopos disponíveis:

| Escopo | Descrição |
|--------|-----------|
| `orders.write` | Criar e atualizar pedidos da loja via API |
| `products.write` | Criar e atualizar produtos e variantes do catálogo via API |

Recomendação: conceder **apenas** os escopos necessários por integração.

## Ambientes: Live e Sandbox

| Ambiente | URL | Uso |
|----------|-----|-----|
| **Sandbox** | `https://admin-api.sandbox.solomon.com.br` | Teste e homologação; alterações não afetam dados reais |
| **Live** | `https://admin-api.solomon.com.br` | Produção; toda ação afeta dados reais |

> **Importante:** API Keys geradas para Sandbox **não funcionam** em Live e vice-versa.

## Boas práticas de segurança

- **Nunca** expor a API Key em código público ou repositórios abertos.
- Evitar uso direto no frontend sem camada de proteção (proxy server-side).
- Usar escopos mínimos necessários por integração.
- Regenerar a chave sempre que houver suspeita de comprometimento.

## Como criar uma nova API Key

1. Acesse a tela **Chaves de API**.
2. Clique no botão para criar nova chave.
3. Preencha os campos, marque os escopos e clique para gerar a chave secreta.

> Kolden: a `SOLOMON_TOKEN_API` (Live) fica em `/kolden/prod/SOLOMON_TOKEN_API` no Infisical; a Sandbox em `/kolden/dev/SOLOMON_TOKEN_API`. Ver [`../ferramentas.md`](../ferramentas.md).