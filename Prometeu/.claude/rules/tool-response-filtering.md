---
paths:
  - .aiox-core/data/tool-registry.yaml
  - .mcp.json
---
# Filtragem de Respostas de Ferramentas — Redução Dinâmica de Tokens

Ao processar respostas de ferramentas MCP ou grandes web fetches, aplique a
configuração de filtro definida em `.aiox-core/data/tool-registry.yaml` para a
ferramenta que produziu a resposta. Isso reduz o consumo de tokens de contexto sem
perder informação relevante para a tarefa.

## Tipos de Filtro

### content
Extraia o conteúdo informativo principal e descarte ruído (navegação, anúncios,
boilerplate, cabeçalhos/rodapés repetitivos). Limite a saída extraída a
aproximadamente `max_tokens` tokens, truncando em um limite natural de parágrafo ou
frase. Se campos `extract` forem especificados, priorize esses
campos do objeto de resposta.

**Aplicar a:** respostas HTML do WebFetch, resultados de busca do EXA, documentação do Context7.

### schema
A partir de um objeto JSON ou array de objetos, selecione SOMENTE os campos listados em
`fields`. Descarte todas as outras chaves. Se `max_tokens` estiver definido, trunque o
resultado serializado nesse limite de tokens.

**Aplicar a:** dados de página do Playwright, respostas de API com schemas conhecidos.

### field
A partir de um array de objetos (dados tabulares), projete SOMENTE as colunas listadas
em `fields` e limite o resultado a `max_rows` linhas. Isso é análogo a
`SELECT field1, field2 FROM data LIMIT max_rows`.

**Aplicar a:** resultados de scrapers do Apify, resultados de queries de banco de dados, dados em formato CSV.

## Como Aplicar

1. Após receber a resposta de uma ferramenta, identifique o nome da ferramenta.
2. Procure a ferramenta no `tool-registry.yaml` → verifique se há uma chave `filter`.
3. Se existir um filtro, aplique as regras do tipo correspondente acima.
4. Se NÃO existir filtro para a ferramenta, use a resposta completa como está.
5. Apresente o resultado filtrado no seu raciocínio — NÃO repita o payload
   bruto não filtrado.

## Fallback

Se o filtro removeria TODO o conteúdo (resultado vazio), recorra à
resposta completa não filtrada. Nunca produza um resultado vazio a partir da filtragem.

## Nota de Performance

Esta é uma otimização de custo zero. O filtro é aplicado durante a sua
etapa de raciocínio — nenhum script externo é invocado. Os scripts utilitários em
`.aiox-core/utils/filters/` estão disponíveis para pós-processamento em lote de
respostas salvas, mas NÃO são necessários durante o uso normal de ferramentas.
