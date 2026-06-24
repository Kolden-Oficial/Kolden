# C# Tech Preset

> Preset de arquitetura para backend em C#/.NET com foco em clean architecture, confiabilidade e produtividade enterprise.

---

## Metadata

```yaml
preset:
  id: csharp
  name: 'C# ASP.NET Core Preset'
  version: 1.0.0
  description: 'Arquitetura para APIs em .NET 9+ com camadas claras, EF Core e testes automatizados'
  technologies:
    - C# 13
    - .NET 9
    - ASP.NET Core
    - Entity Framework Core
    - FluentValidation
    - xUnit
    - Testcontainers
  suitable_for:
    - 'APIs enterprise'
    - 'Sistemas internos corporativos'
    - 'Backends com integracao Microsoft stack'
  not_suitable_for:
    - 'Aplicacoes front-end puras'
    - 'Projetos scripts de baixa complexidade'
```

---

## Design Patterns (Os 5 Essenciais)

### Pattern 1: Contract Interface Pattern

**Propósito:** Definir contratos por contexto para reduzir acoplamento entre camadas.

**Execution Score:** 10/10 | **Anti-Bug Score:** 9/10

```csharp
// Application/Orders/Ports/IOrderRepository.cs
namespace App.Application.Orders.Ports;

public interface IOrderRepository
{
    Task SaveAsync(Order order, CancellationToken ct);
    Task<Order?> FindByIdAsync(Guid id, CancellationToken ct);
}
```

**Bugs Eliminados:**

- Dependencia direta do EF em use case
- Quebra em cascata ao trocar persistencia

**Por Que Funciona:**

- Contrato estavel e mockavel
- Facilita testes isolados

---

### Pattern 2: Use Case Handler Pattern

**Propósito:** Isolar regra de negocio em handlers orientados a comando.

**Execution Score:** 10/10 | **Anti-Bug Score:** 9/10

```csharp
// Application/Orders/PlaceOrder/PlaceOrderHandler.cs
public sealed class PlaceOrderHandler
{
    private readonly IOrderRepository _repository;
    private readonly IPaymentGateway _payment;

    public PlaceOrderHandler(IOrderRepository repository, IPaymentGateway payment)
    {
        _repository = repository;
        _payment = payment;
    }

    public async Task<Guid> HandleAsync(PlaceOrderCommand command, CancellationToken ct)
    {
        var order = Order.Create(command.CustomerId, command.Items);
        await _payment.ChargeAsync(order.Id, order.Total, ct);
        await _repository.SaveAsync(order, ct);
        return order.Id;
    }
}
```

**Bugs Eliminados:**

- Logica em controller
- Fluxos sem ordem transacional clara

**Por Que Funciona:**

- Fluxo unico por caso de uso
- Facil de observar, testar e evoluir

---

### Pattern 3: Repository Adapter Pattern

**Propósito:** Encapsular EF Core e mapeamentos fora da camada de aplicacao.

**Execution Score:** 9/10 | **Anti-Bug Score:** 9/10

```csharp
// Infrastructure/Persistence/EfOrderRepository.cs
public sealed class EfOrderRepository : IOrderRepository
{
    private readonly AppDbContext _db;

    public EfOrderRepository(AppDbContext db)
    {
        _db = db;
    }

    public async Task SaveAsync(Order order, CancellationToken ct)
    {
        _db.Orders.Add(OrderEntity.FromDomain(order));
        await _db.SaveChangesAsync(ct);
    }

    public async Task<Order?> FindByIdAsync(Guid id, CancellationToken ct)
    {
        var entity = await _db.Orders.FindAsync([id], ct);
        return entity?.ToDomain();
    }
}
```

**Bugs Eliminados:**

- ORM vazando para dominio
- Regras de persistencia espalhadas

**Por Que Funciona:**

- Infra fica concentrada
- Permite testes de integracao dedicados

---

### Pattern 4: Domain Event + Outbox Pattern

**Propósito:** Garantir consistencia entre transacao local e integracoes externas.

**Execution Score:** 8/10 | **Anti-Bug Score:** 9/10

```csharp
public sealed record OrderPlacedEvent(Guid OrderId, Guid CustomerId);
```

```csharp
public interface IOutboxWriter
{
    Task EnqueueAsync<TEvent>(TEvent @event, CancellationToken ct);
}
```

**Bugs Eliminados:**

- Eventos perdidos apos commit
- Integracoes inconsistentes

**Por Que Funciona:**

- Publicacao resiliente via outbox
- Separacao entre transacao de negocio e entrega de evento

---

### Pattern 5: Test Builder Pattern

**Propósito:** Reduzir ruido em testes unitarios e de integracao.

**Execution Score:** 8/10 | **Anti-Bug Score:** 8/10

```csharp
public sealed class PlaceOrderCommandBuilder
{
    private Guid _customerId = Guid.NewGuid();
    private List<ItemInput> _items = [new("SKU-1", 1)];

    public PlaceOrderCommand Build() => new(_customerId, _items);
}
```

**Bugs Eliminados:**

- Setup repetitivo e propenso a erro
- Testes menos legiveis

**Por Que Funciona:**

- Setup centralizado
- Cenarios com intencao explicita

---

## Estrutura do Projeto

```text
/src
  /App.Api                    # ASP.NET endpoints
  /App.Application            # Use cases, contracts, validators
  /App.Domain                 # Entidades, value objects, regras
  /App.Infrastructure         # EF Core, gateways, mensageria
/tests
  /App.UnitTests
  /App.IntegrationTests
  /App.E2ETests
```

### Justificativa da Estrutura

- **Domain isolated:** Sem dependencia de frameworks
- **Application orchestrates:** Casos de uso e contratos
- **Infrastructure plugged-in:** Detalhes tecnicos substituiveis

---

## Tech Stack

| Categoria | Tecnologia | Versão | Propósito |
| -------- | ---------- | ------- | ------- |
| Runtime | .NET | 9+ | Plataforma principal |
| Language | C# | 13 | Linguagem base |
| API | ASP.NET Core | 9+ | Endpoints HTTP |
| Persistence | EF Core | 9+ | ORM e migrations |
| Validation | FluentValidation | latest | Validacao de comandos |
| Mapping | Mapster | latest | Mapping controlado |
| Unit Test | xUnit | latest | Testes unitarios |
| Assertion | FluentAssertions | latest | Assertivas legiveis |
| Integration | Testcontainers | latest | Infra real em testes |

### Dependências Necessárias

```bash
dotnet add src/App.Api package Microsoft.AspNetCore.OpenApi
dotnet add src/App.Application package FluentValidation
dotnet add src/App.Infrastructure package Microsoft.EntityFrameworkCore
dotnet add src/App.Infrastructure package Npgsql.EntityFrameworkCore.PostgreSQL

dotnet add tests/App.UnitTests package xunit
dotnet add tests/App.UnitTests package FluentAssertions
dotnet add tests/App.IntegrationTests package DotNet.Testcontainers
```

---

## Padrões de Código

### Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
| ------- | ---------- | ------- |
| Projects | `App.<Layer>` | `App.Application` |
| Classes | PascalCase | `PlaceOrderHandler` |
| Interfaces | Prefix `I` | `IOrderRepository` |
| Methods | PascalCase + Async | `HandleAsync` |
| Files | Match class name | `PlaceOrderHandler.cs` |
| Constants | UPPER_SNAKE_CASE | `MAX_BATCH_SIZE` |

### Regras Críticas

1. **CancellationToken Mandatory:** Todo IO async recebe `CancellationToken`.
2. **No Business Logic in Controllers:** Apenas parse e delegacao.
3. **One DbContext per bounded context:** Evitar mega-context.
4. **Validation Before Use Case:** Rejeitar input invalido cedo.
5. **Exception Mapping:** Erros de dominio mapeados para HTTP padrao.

### Baseline de Qualidade .NET

```bash
dotnet format
dotnet build
dotnet test
```

---

## Estratégia de Testes

### Pirâmide de Testes

```text
         /\
        /E2E\           10% - Fluxos HTTP completos
       /------\
      /Integration\     30% - EF, migrations, adapters
     /------------\
    /  Unit Tests  \    60% - Dominio e handlers
   /----------------\
```

### O Que Testar

#### Sempre Testar (Crítico)

- [ ] Regras de dominio
- [ ] Handlers de comando e query
- [ ] Validadores de entrada

#### Considerar Testar

- [ ] Policies/autorizacao
- [ ] Serializacao de contratos externos

#### Nunca Testar

- [ ] Framework internals
- [ ] Getters/setters sem regra

### Metas de Cobertura

```text
- Domain/Application: 90%+
- Infrastructure: 70%+
- Overall: 75%+
```

### Template de Teste

```csharp
public class PlaceOrderHandlerTests
{
    [Fact]
    public async Task Should_Place_Order_When_Command_Is_Valid()
    {
        var repo = Substitute.For<IOrderRepository>();
        var pay = Substitute.For<IPaymentGateway>();
        var sut = new PlaceOrderHandler(repo, pay);

        var command = new PlaceOrderCommandBuilder().Build();

        var id = await sut.HandleAsync(command, CancellationToken.None);

        id.Should().NotBe(Guid.Empty);
        await repo.Received().SaveAsync(Arg.Any<Order>(), Arg.Any<CancellationToken>());
    }
}
```

---

## Estratégias de Economia de Tokens

### Estratégia 1: Foco em Command + Handler

Prompts devem referenciar `Command`, `Handler`, `Validator` da feature alvo.

### Estratégia 2: Reusar o Esqueleto de Camada Existente

Copiar pasta de uma feature de referencia reduz contexto de geracao.

### Estratégia 3: Infraestrutura como Passo Secundário

Primeiro dominio/aplicacao, depois adapter EF/HTTP.

---

## Stack de Prevenção de Bugs

| Camada | Captura | Implementação |
| ----- | ------- | -------------- |
| Compiler + nullable refs | 35% | NRT habilitado |
| Validation + handlers | 35% | FluentValidation + use case boundaries |
| Integration tests | 25% | EF + Testcontainers |
| E2E smoke | 5% | Endpoints criticos |

---

## Padrões a EVITAR

### Fat Service with Mixed Responsibilities

Classe unica para validacao, regra, persistencia e integracao externa.

### Static Service Locator

Resolver dependencias manualmente em runtime sem DI container.

### Async Without CancellationToken

Chamadas longas sem cancelamento causam travas e leaks.

---

## Templates de Arquivo

### Template de Contract

```csharp
public interface IEmailGateway
{
    Task SendAsync(EmailMessage message, CancellationToken ct);
}
```

### Template de Handler

```csharp
public sealed class UseCaseHandler
{
    public async Task<Result> HandleAsync(Command command, CancellationToken ct)
    {
        return await Task.FromResult(Result.Success());
    }
}
```

### Template de Endpoint

```csharp
app.MapPost("/orders", async (PlaceOrderRequest request, PlaceOrderHandler handler, CancellationToken ct) =>
{
    var result = await handler.HandleAsync(request.ToCommand(), ct);
    return Results.Accepted($"/orders/{result.Id}");
});
```

---

## Integração com o AIOX

### Workflow Recomendado

1. `@architect` define fronteiras por camada usando preset `csharp`
2. `@dev` implementa handlers e adapters por feature
3. `@qa` valida integridade async e cobertura de regras de negocio

### Comandos AIOX

```bash
@dev "Follow the csharp preset patterns for this service"
@qa "Validate async boundaries, validation, and persistence behavior"
```

---

## Checklist para Novas Features

```markdown
- [ ] Definir command/query e contracts
- [ ] Implementar handler com CancellationToken
- [ ] Criar validator para entrada
- [ ] Implementar adapter EF Core com migration
- [ ] Cobrir testes unitarios e de integracao
- [ ] Mapear erros para respostas HTTP consistentes
```

---

## Changelog

| Data       | Versão  | Mudanças |
| ---------- | ------- | ------- |
| 2026-02-19 | 1.0.0   | Preset C# inicial |

---

_AIOX Tech Preset - Synkra AIOX Framework_
