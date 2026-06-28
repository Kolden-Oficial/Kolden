---
name: engenharia-de-dados
description: Use ao projetar schema, escrever migrations, montar pipelines de dados (ingestão/transformação) ou impor qualidade de dados (contratos, validação, idempotência). Acione quando o @data-engineer for implementar DDL, quando uma mudança tocar `packages/db/`/migrations/`.sql`, quando dados de origem externa entrarem no sistema, ou quando precisar decidir índice, normalização ou estratégia de cache. Cobre a forma idiomática do dado (Postgres/MySQL/Redis/Prisma/JPA); não cobre a arquitetura de sistema (isso é `architect-first`).
---

# Engenharia de Dados

Disciplina de **dado correto, migrável e confiável**: schema que modela o domínio,
migrations que não derrubam produção, pipelines que toleram falha, e contratos que
impedem lixo de entrar. Apoia o agente `@data-engineer` (Dara) com a forma idiomática
de cada motor.

## 1. Schema — modele o domínio, não o formulário
- **Normalize por padrão** (3NF), desnormalize só com evidência de leitura quente medida.
- **Identidade explícita:** chave primária estável; chaves naturais como `UNIQUE`, não
  como PK quando podem mudar. Prefira IDs opacos (UUID/identity) a chaves de negócio.
- **Integridade no banco:** `FOREIGN KEY`, `NOT NULL`, `CHECK`, `UNIQUE` — o banco é a
  última linha de defesa; não delegue invariantes só à aplicação.
- **Tipos honestos:** `timestamptz` (não `timestamp` naive), `numeric` para dinheiro
  (nunca `float`), enums/domínios para estados fechados.
- **Índices guiados por query, não por palpite:** indexe o que o `WHERE`/`JOIN`/`ORDER BY`
  realmente usa; cubra com índices compostos na ordem das colunas filtradas; remova índice
  que nenhum plano usa (custo de escrita sem retorno). Em Postgres, leia o `EXPLAIN ANALYZE`.

## 2. Migrations — segurança antes de elegância
- **Sempre reversível** (ou com plano de rollback explícito). Toda migration tem `up` e
  pensa o `down`.
- **Expand → migrate → contract** para mudança sem downtime: adicione a coluna nova
  (nullable/com default), faça backfill em lotes, troque a leitura/escrita, só então
  remova a antiga — nunca renomeie/dropie em um passo só num schema vivo.
- **Backfill em lotes idempotentes**, fora da transação do DDL, para não travar a tabela.
- **Locks:** saiba o que pega `ACCESS EXCLUSIVE` (ex.: adicionar `NOT NULL` sem default em
  Postgres antigo) e evite em tabela grande no horário de pico.
- **Forward-only em produção:** migrations já aplicadas são imutáveis; correção é nova
  migration, nunca edição da antiga.

## 3. Pipelines de dados — assuma que vai falhar
- **Idempotência é inegociável:** reprocessar o mesmo input duas vezes produz o mesmo
  estado. Use chaves de deduplicação, `UPSERT` e marcas de watermark/checkpoint.
- **Camadas:** ingestão (raw, imutável) → transformação (limpa/conformada) → serving
  (modelada para consumo). Não escreva direto no serving a partir da origem crua.
- **Falha parcial é normal:** dead-letter para registros ruins, retry com backoff,
  e o pipeline continua — um registro podre não derruba o lote inteiro.
- **Incremental > full-refresh** quando o volume cresce: processe só o delta por janela
  de tempo ou cursor.

## 4. Qualidade de dados — contrato na fronteira
- **Data contract:** todo dado que cruza fronteira (API externa, upload, fila) é validado
  contra um schema declarado (tipos, ranges, obrigatoriedade, enums) **antes** de entrar.
  Rejeite/quarentene o que não conforma; não "conserte" silenciosamente.
- **Dimensões de qualidade a checar:** completude (sem nulos onde não pode), unicidade
  (sem duplicata de chave), validade (dentro do domínio), consistência (referências batem),
  frescor (dado dentro da janela esperada).
- **Cache como derivada, não fonte:** Redis/cache espelha o sistema de verdade; defina
  TTL e invalidação explícita. Pense no padrão de hash de conteúdo para chave de cache
  estável. Cache nunca é a fonte canônica de um fato.

## Gate de saída
- Schema com integridade no banco e índices justificados por query real.
- Migration reversível, sem lock perigoso em tabela quente, forward-only em prod.
- Pipeline idempotente com tratamento de falha parcial (DLQ/retry).
- Toda entrada externa passa por um contrato de validação antes de persistir.

## Quando NÃO usar
- Decisão de qual tecnologia de dados adotar (Postgres vs Mongo, fila X vs Y) →
  `architect-first` decide; esta habilidade implementa.

---
*Fonte: affaan-m/everything-claude-code@2bc924f (`skills/{postgres,mysql,redis,clickhouse,prisma,jpa}-patterns/`, `skills/database-migrations/`, `skills/{content-hash-cache-pattern,data-throughput-accelerator,regex-vs-llm-structured-text}/`, `skills/data-scraper-agent/`, `skills/mle-workflow/` — data contracts) — licença MIT. Princípios (G16/G26/G29) extraídos e reescritos em PT-BR; sem cópia literal. Alinhado ao agente `@data-engineer` do AIOX.*
