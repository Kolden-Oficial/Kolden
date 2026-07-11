---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/data/tech-presets/_indice|_indice]]"
---

# PHP Tech Preset

> Preset de arquitetura para backend PHP moderno com Laravel, foco em clareza de dominio, produtividade e estabilidade em producao.

---

## Metadata

```yaml
preset:
  id: php
  name: 'PHP Laravel Preset'
  version: 1.0.0
  description: 'Arquitetura para APIs e sistemas web em PHP 8.3+ com Laravel 11, boundaries por contexto e testes automatizados'
  technologies:
    - PHP 8.3+
    - Laravel 11
    - Eloquent ORM
    - Laravel Form Request
    - Pest / PHPUnit
    - Laravel Pint
  suitable_for:
    - 'Sistemas web e APIs de negocio'
    - 'Plataformas administrativas'
    - 'Aplicacoes monoliticas modulares'
  not_suitable_for:
    - 'Workloads de latencia ultra-baixa em tempo real'
    - 'Aplicacoes front-end puras'
```

---

## Design Patterns (Os 5 Essenciais)

### Pattern 1: Contract Interface Pattern

**Propósito:** Isolar casos de uso de implementacoes concretas de infra.

**Execution Score:** 10/10 | **Anti-Bug Score:** 9/10

```php
<?php

namespace App\Domain\Orders\Contracts;

interface OrderRepositoryContract
{
    public function save(Order $order): void;

    public function findById(string $id): ?Order;
}
```

**Bugs Eliminados:**

- Dependencia direta do Eloquent no dominio
- Dificuldade em mockar persistencia

**Por Que Funciona:**

- Contratos claros para IoC container
- Testes unitarios sem banco real

---

### Pattern 2: Service / Action Pattern

**Propósito:** Centralizar regra de negocio fora de controllers.

**Execution Score:** 10/10 | **Anti-Bug Score:** 9/10

```php
<?php

namespace App\Application\Orders\Actions;

final class PlaceOrderAction
{
    public function __construct(
        private readonly OrderRepositoryContract $repository,
        private readonly PaymentGatewayContract $paymentGateway,
    ) {}

    public function execute(PlaceOrderData $data): Order
    {
        $order = Order::create($data->customerId, $data->items);

        $this->paymentGateway->charge($order->id(), $order->total());
        $this->repository->save($order);

        return $order;
    }
}
```

**Bugs Eliminados:**

- Regra em controller
- Fluxo de negocio fragmentado

**Por Que Funciona:**

- Caso de uso unico e auditavel
- Facil de validar por testes focados

---

### Pattern 3: Repository Adapter Pattern

**Propósito:** Encapsular detalhes de Eloquent/Query Builder.

**Execution Score:** 9/10 | **Anti-Bug Score:** 9/10

```php
<?php

namespace App\Infrastructure\Persistence\Orders;

final class EloquentOrderRepository implements OrderRepositoryContract
{
    public function save(Order $order): void
    {
        OrderModel::query()->updateOrCreate(
            ['id' => $order->id()],
            ['customer_id' => $order->customerId(), 'total_cents' => $order->total()->toCents()]
        );
    }

    public function findById(string $id): ?Order
    {
        $model = OrderModel::query()->find($id);

        return $model ? $model->toDomain() : null;
    }
}
```

**Bugs Eliminados:**

- SQL/ORM espalhado
- Mudancas de schema afetando regras de negocio

**Por Que Funciona:**

- Ponto unico de persistencia
- Facil trocar implementacao futura

---

### Pattern 4: Domain Event Pattern

**Propósito:** Disparar efeitos colaterais de forma desacoplada.

**Execution Score:** 8/10 | **Anti-Bug Score:** 8/10

```php
<?php

namespace App\Domain\Orders\Events;

final readonly class OrderPlaced
{
    public function __construct(public string $orderId, public string $customerId) {}
}
```

```php
Event::dispatch(new OrderPlaced($order->id(), $order->customerId()));
```

**Bugs Eliminados:**

- Side effects sincronos no fluxo principal
- Integracoes acopladas ao caso de uso

**Por Que Funciona:**

- Listeners independentes
- Melhor evolucao de integracoes

---

### Pattern 5: Factory/Builder Pattern (Tests Only)

**Propósito:** Gerar fixtures consistentes com baixa repeticao.

**Execution Score:** 8/10 | **Anti-Bug Score:** 8/10

```php
<?php

$command = PlaceOrderData::fromArray([
    'customer_id' => 'cust-1',
    'items' => [
        ['sku' => 'SKU-1', 'qty' => 1],
    ],
]);
```

**Bugs Eliminados:**

- Setup duplicado em testes
- Casos de teste pouco expressivos

**Por Que Funciona:**

- Fixtures padronizadas
- Facil variar cenarios sem ruido

---

## Estrutura do Projeto

```text
/app
  /Domain
    /Orders
      /Contracts            # Interfaces (ports)
      /Entities             # Entidades e regras
      /Events               # Eventos de dominio
  /Application
    /Orders
      /Actions              # Use cases
      /Data                 # DTOs imutaveis
  /Infrastructure
    /Persistence
      /Orders               # Eloquent adapters
  /Http
    /Controllers            # Entradas HTTP
    /Requests               # Form Requests
    /Resources              # API Resources
/database
  /migrations
/tests
  /Unit
  /Feature
```

### Justificativa da Estrutura

- **Domain protegido:** Regras sem dependencia Laravel quando possivel
- **Application explicita:** Acoes orientadas a caso de uso
- **Infra separada:** Eloquent isolado

---

## Tech Stack

| Categoria | Tecnologia | Versão | Propósito |
| -------- | ---------- | ------- | ------- |
| Language | PHP | 8.3+ | Runtime principal |
| Framework | Laravel | 11+ | API, DI, eventos |
| ORM | Eloquent | 11+ | Persistencia |
| Validation | Form Request | built-in | Validacao de entrada |
| Queues | Laravel Queue | 11+ | Processamento async |
| Unit/Feature Test | Pest/PHPUnit | latest | Testes automatizados |
| Style | Laravel Pint | latest | Padrao de codigo |
| Static Analysis | PHPStan | latest | Analise estatica |

### Dependências Necessárias

```bash
composer require laravel/framework
composer require laravel/sanctum

composer require --dev pestphp/pest
composer require --dev phpstan/phpstan
composer require --dev laravel/pint
```

---

## Padrões de Código

### Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
| ------- | ---------- | ------- |
| Classes | PascalCase | `PlaceOrderAction` |
| Interfaces | Suffix `Contract` | `OrderRepositoryContract` |
| Files | Match class name | `PlaceOrderAction.php` |
| Methods | camelCase | `findById` |
| Config keys | snake_case | `queue_connection` |
| Migration files | timestamp_snake_case | `2026_02_19_000000_create_orders_table.php` |

### Regras Críticas

1. **Thin Controllers:** Controller delega para Action e retorna Resource.
2. **Validation at Edge:** Form Request para todo endpoint mutavel.
3. **No Query in Controller:** Persistencia via repository/Action.
4. **Typed DTOs:** Evitar arrays soltos no core da regra.
5. **Explicit Transactions:** Fluxos multi-passo com `DB::transaction`.

### Baseline de Qualidade PHP

```bash
vendor/bin/pint
vendor/bin/phpstan analyse
php artisan test
```

---

## Estratégia de Testes

### Pirâmide de Testes

```text
         /\
        /E2E\           10% - Fluxos criticos de API
       /------\
      /Feature\         40% - HTTP + DB behavior
     /---------\
    / UnitTests \       50% - Dominio e actions
   /-------------\
```

### O Que Testar

#### Sempre Testar (Crítico)

- [ ] Regras de dominio e calculos
- [ ] Actions principais
- [ ] Validacao de requests

#### Considerar Testar

- [ ] Listeners de eventos
- [ ] Jobs de fila com retries

#### Nunca Testar

- [ ] Comportamento interno do framework
- [ ] Codigo trivial sem regra

### Metas de Cobertura

```text
- Domain/Application: 90%+
- Feature tests: 75%+
- Overall: 75%+
```

### Template de Teste

```php
it('places an order successfully', function () {
    $payload = [
        'customer_id' => 'cust-1',
        'items' => [
            ['sku' => 'SKU-1', 'qty' => 1],
        ],
    ];

    $response = $this->postJson('/api/orders', $payload);

    $response->assertAccepted();
    $this->assertDatabaseCount('orders', 1);
});
```

---

## Estratégias de Economia de Tokens

### Estratégia 1: Instruções Action-First

Pedir alteracoes em `Action + Contract + Test` reduz ruido.

### Estratégia 2: Reusar Form Request

Usar validações existentes em vez de explicar regras em prosa.

### Estratégia 3: Feature Tests como Spec

Definir endpoints e asserts antes da implementacao.

---

## Stack de Prevenção de Bugs

| Camada | Captura | Implementação |
| ----- | ------- | -------------- |
| Form Request validation | 30% | Regras na borda HTTP |
| Domain/action tests | 40% | Unit + feature tests |
| Static analysis | 20% | PHPStan |
| Smoke e2e | 10% | Fluxos de negocio |

---

## Padrões a EVITAR

### Fat Controller + Fat Model Mix

Toda logica distribuida entre controller e model sem Action.

### Massive Service Container Magic

Bindings dinamicos sem contratos claros.

### Array-Driven Domain

Regras baseadas apenas em arrays sem DTO tipado.

---

## Templates de Arquivo

### Template de Contract

```php
interface NotificationGatewayContract
{
    public function send(NotificationData $data): void;
}
```

### Template de Action

```php
final class UseCaseAction
{
    public function execute(UseCaseData $data): UseCaseResult
    {
        return new UseCaseResult();
    }
}
```

### Template de Controller

```php
final class OrdersController
{
    public function store(StoreOrderRequest $request, PlaceOrderAction $action): JsonResponse
    {
        $result = $action->execute(PlaceOrderData::fromArray($request->validated()));

        return response()->json(['id' => $result->id], 202);
    }
}
```

---

## Integração com o AIOX

### Workflow Recomendado

1. `@architect` define boundaries do modulo com preset `php`
2. `@dev` implementa Actions, Contracts e adapters por contexto
3. `@qa` valida consistencia de requests, transacoes e testes

### Comandos AIOX

```bash
@dev "Follow the php preset patterns for this feature"
@qa "Validate form-request boundaries, action orchestration, and test coverage"
```

---

## Checklist para Novas Features

```markdown
- [ ] Definir DTO e Action da feature
- [ ] Criar Contract e adapter de persistencia
- [ ] Implementar Form Request
- [ ] Adicionar migration e indices necessarios
- [ ] Cobrir unit + feature tests
- [ ] Rodar pint, phpstan e test suite
```

---

## Changelog

| Data       | Versão  | Mudanças |
| ---------- | ------- | ------- |
| 2026-02-19 | 1.0.0   | Preset PHP inicial |

---

_AIOX Tech Preset - Synkra AIOX Framework_
