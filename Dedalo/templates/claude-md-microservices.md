---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/templates/claude-md-fullstack|claude-md-fullstack]]"
  - "[[Dedalo/templates/claude-md-library|claude-md-library]]"
  - "[[Dedalo/templates/claude-md-mobile|claude-md-mobile]]"
  - "[[Dedalo/templates/claude-md-monorepo|claude-md-monorepo]]"
---

# CLAUDE.md — Projeto de Microsserviços

## Visão Geral do Projeto

- **Nome:** [PROJECT_NAME]
- **Descrição:** [Descrição do sistema]
- **Tipo:** Arquitetura de microsserviços
- **Deploy:** [Docker / Kubernetes / Cloud Run / ECS]
- **Status:** [Desenvolvimento / Homologação / Produção]

## Arquitetura de Serviços

```
services/
  api-gateway/            # Ponto de entrada, roteamento, validação de auth
  user-service/           # Gerenciamento de usuários e autenticação
  order-service/          # Processamento e gerenciamento de pedidos
  payment-service/        # Processamento de pagamentos
  notification-service/   # Notificações por e-mail, SMS, push
  shared/
    proto/                # Definições de Protocol Buffer (se gRPC)
    types/                # Tipos TypeScript compartilhados
    events/               # Definições de schema de eventos
infrastructure/
  docker/                 # Arquivos do Docker Compose
  k8s/                    # Manifestos do Kubernetes
  terraform/              # Infraestrutura como Código
```

## Stack Tecnológica

| Camada | Tecnologia | Notas |
|-------|-----------|-------|
| Linguagem | TypeScript / Node.js | Todos os serviços |
| Framework | Express / Fastify | Handlers HTTP |
| Comunicação | REST + Orientada a eventos | Sync + async |
| Message Broker | RabbitMQ / Kafka | Eventos assíncronos |
| Banco de Dados | PostgreSQL | DB por serviço |
| Cache | Redis | Sessão, rate limiting |
| Container | Docker | Todos os serviços containerizados |
| Orquestração | Docker Compose / K8s | Local / Produção |
| Docs de API | OpenAPI 3.0 | Spec por serviço |

## Limites dos Serviços

### Regras de Propriedade
- Cada serviço é dono de seus dados (banco de dados, cache, arquivos)
- Sem acesso direto a banco de dados entre serviços
- Toda comunicação via APIs ou eventos definidos
- Cada serviço tem seu próprio repositório ou pacote de workspace

### Template de Serviço
Todo serviço segue esta estrutura:
```
service-name/
  src/
    routes/               # Handlers de rotas HTTP
    services/             # Lógica de negócio
    repositories/         # Camada de acesso a dados
    events/
      publishers/         # Publicação de eventos
      subscribers/        # Consumo de eventos
    middleware/            # Auth, validação, logging
    types/                # Tipos específicos do serviço
  tests/
    unit/                 # Testes unitários
    integration/          # Testes de integração (com DB)
  Dockerfile              # Definição do container
  openapi.yaml            # Especificação da API
  package.json
  tsconfig.json
```

## Contratos de API

### Convenções REST
- URL base: `/{service-name}/api/v{version}/`
- Use substantivos no plural: `/users`, `/orders`, `/payments`
- Métodos HTTP: GET (leitura), POST (criação), PUT (atualização completa), PATCH (parcial), DELETE
- Envelope de resposta: `{ "data": ..., "error": null, "meta": { "page": 1, "total": 100 } }`
- Formato de erro: `{ "error": { "code": "USER_NOT_FOUND", "message": "...", "details": [] } }`

### Versionamento de API
- Versionamento baseado em URL: `/api/v1/`, `/api/v2/`
- Dê suporte a N-1 versões (atual + anterior)
- Headers de descontinuação: `Sunset: <date>`, `Deprecation: true`

### Especificação OpenAPI
- Todo serviço deve ter um `openapi.yaml` na raiz
- Auto-gere tipos TypeScript a partir da spec OpenAPI
- Valide requisições contra o schema no middleware

## Comunicação Entre Serviços

### Síncrona (HTTP/gRPC)
- Usada para: Consultas em tempo real, requisições voltadas ao usuário
- Circuit breaker: Obrigatório em todas as chamadas externas (3 falhas = aberto)
- Timeout: 5 segundos por padrão, 30 segundos para operações longas
- Retry: 3 tentativas com backoff exponencial (100ms, 200ms, 400ms)

### Assíncrona (Eventos)
- Usada para: Mudanças de estado, notificações, sincronização de dados
- Nomenclatura de eventos: `{service}.{entity}.{action}` (ex.: `order.payment.completed`)
- Schema de eventos: JSON Schema com campo de versão
- Idempotência: Todos os handlers de eventos devem ser idempotentes
- Dead letter queue: Obrigatória para todos os consumidores

### Schema de Eventos
```typescript
interface DomainEvent<T> {
  id: string;              // UUID v4
  type: string;            // order.payment.completed
  source: string;          // payment-service
  version: string;         // 1.0.0
  timestamp: string;       // ISO 8601
  correlationId: string;   // Request trace ID
  data: T;                 // Event-specific payload
}
```

## Padrões de Deploy

### Desenvolvimento Local
```bash
docker-compose up -d       # Inicia todos os serviços
docker-compose up api      # Inicia um serviço específico
docker-compose logs -f     # Acompanha os logs
docker-compose down        # Para todos
```

### Configuração de Ambiente
- `.env.local` por serviço para desenvolvimento local
- Variáveis de ambiente injetadas em tempo de execução (nunca embutidas nas imagens)
- Variáveis obrigatórias definidas no `.env.example` de cada serviço

### Health Checks
Todo serviço expõe:
- `GET /health` — Liveness básico (retorna 200)
- `GET /health/ready` — Readiness (verifica DB, cache, dependências)
- `GET /health/detailed` — Status completo com a saúde das dependências

## Estratégia de Testes

```bash
# Comandos por serviço
npm test                    # Testes unitários
npm run test:integration    # Integração (requer Docker)
npm run test:contract       # Testes de contrato orientados ao consumidor
npm run test:e2e            # Ponta a ponta (sistema completo)
```

### Níveis de Teste
| Nível | Escopo | Dependências |
|-------|-------|-------------|
| Unitário | Função/classe única | Tudo mockado |
| Integração | Serviço + DB | DB real, serviços mockados |
| Contrato | Formato da API do serviço | Pact ou similar |
| E2E | Fluxo completo de requisição | Todos os serviços rodando |

## Comandos Comuns

```bash
# Desenvolvimento
docker-compose up -d                    # Inicia a infraestrutura
npm run dev --workspace=user-service    # Modo dev para um serviço

# Testes
npm test --workspaces                   # Testa todos os serviços
npm run test:integration --workspace=order-service

# Build
docker build -t user-service:latest ./services/user-service

# Banco de Dados
npm run migrate --workspace=user-service     # Executa as migrations
npm run seed --workspace=user-service        # Popula os dados
```

## Notas Importantes

- Nunca compartilhe bancos de dados entre serviços — cada serviço é dono de seus dados
- Use correlation IDs para rastreamento distribuído entre os serviços
- Faça logs em formato JSON estruturado para agregação (ELK/Datadog)
- Mantenha os serviços pequenos e focados — se um serviço crescer demais, divida-o
- Use feature flags para rollouts graduais entre os serviços
- Sempre teste a compatibilidade retroativa ao mudar schemas de eventos
