# Documentação Solomon (docs oficial, PT-BR)

Índice PT-BR da documentação oficial em https://docs.solomon.com.br, capturada e adaptada em 2026-07-01. O manual Kolden dessa ferramenta está em [`../ferramentas.md`](../ferramentas.md).

## Primeiros passos

- [00 — Introdução](00-introducao.md) — o que é a Solomon e o que ela resolve
- [01 — Início rápido](01-quickstart.md) — envie os primeiros dados em 4 passos
- [02 — Autenticação](02-autenticacao.md) — API Keys, escopos, ambientes

## Eventos do site

- [03 — Conceitos](03-eventos-conceitos.md) — eventos, aliases e pontos de contato
- [04 — Web](04-eventos-web.md) — SDK JavaScript (browser + React)
- [05 — Mobile](05-eventos-mobile.md) — SDK React Native

## API de ingestão

- [06 — Introdução da API](06-api-introducao.md) — visão geral + erros padrão
- [07 — Enviar pedido](07-api-ingestion-orders.md) — `POST /admin/v1/order`
- [08 — Enviar produto](08-api-ingestion-products.md) — `POST /admin/v1/product`

## Integração da loja

- [09 — Pedidos (visão de negócio)](09-store-orders.md) — idempotência, status, jornada
- [10 — Produtos (visão de negócio)](10-store-products.md) — modelo produto/variante

## Referências externas

- Documentação oficial: https://docs.solomon.com.br
- OpenAPI: https://docs.solomon.com.br/api-reference/openapi.json
- Índice para LLMs: https://docs.solomon.com.br/llms.txt

> Observação: o link `/events/development`, citado na home e no quickstart oficial, retornou **404** no crawl (2026-07-01) — a doc oficial parece apontar para uma página que ainda não existe. Usar `/events/web` e `/events/mobile` como pontos de entrada para implementar rastreamento.