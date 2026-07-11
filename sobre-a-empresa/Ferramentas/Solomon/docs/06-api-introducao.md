---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/Solomon/docs/README|README]]"
---

# 06 — API: introdução

Fonte: https://docs.solomon.com.br/api-reference/introduction

Use a API REST para construir soluções que se conectem à Solomon sem depender do SDK do site.

## Endpoints

- [Enviar Pedido](07-api-ingestion-orders.md) — cria um novo pedido para processamento ou reprocessamento.
- [Enviar Produto](08-api-ingestion-products.md) — cria um novo produto para processamento ou reprocessamento.

## Casos de uso comuns

- Conectar-se à Solomon a partir de uma **plataforma própria**.
- Registrar pedidos gerados **fora da plataforma** (vendas manuais, marketplaces, POS…).
- Automatizar a **atualização dos custos** de produto via integração própria.
- **Corrigir ou reprocessar** dados históricos de pedidos em massa.

## Autenticação

Antes de começar, gere as [chaves de API](02-autenticacao.md) na Solomon. Cada key pertence a uma loja e pode-se ter várias keys para a mesma loja (uma por solução).

## Erros padrão

Além dos erros genéricos abaixo, outros mais específicos podem aparecer em cada endpoint.

| Código | Erro | Descrição |
|--------|------|-----------|
| **400** | EOF | Corpo da requisição ausente ou inválido |
| **401** | Authorization header is required | Header `Authorization` não informado |
| **401** | Invalid or expired token | Token não encontrado como válido ou foi revogado |
| **403** | Token is not valid for this environment | Token não pertence ao ambiente (sandbox / live) |
| **403** | Required scope '%s' is missing | Escopo necessário ausente na API Key |
| **404** | The requested resource was not found | Endpoint ou recurso inexistente |
| **405** | The requested method is not allowed | Método HTTP não permitido para o endpoint |
| **415** | Content-Type must be application/json | `Content-Type` do header não é o esperado |
| **429** | Rate limit exceeded | Limite de requisições excedido para a API Key |