# Java Tech Preset

> Preset de arquitetura para servicos enterprise em Java com Spring Boot, foco em modularidade, seguranca e operacao em escala.

---

## Metadata

```yaml
preset:
  id: java
  name: 'Java Spring Service Preset'
  version: 1.0.0
  description: 'Arquitetura para backend Java 21+ com Spring Boot 3+, DDD tatico e testes robustos'
  technologies:
    - Java 21+
    - Spring Boot 3.3+
    - Spring Web
    - Spring Data JPA
    - Flyway
    - JUnit 5
    - Testcontainers
  suitable_for:
    - 'Sistemas enterprise'
    - 'APIs criticas com alto SLA'
    - 'Dominios com regras complexas'
  not_suitable_for:
    - 'Servicos ultra-minimos sem necessidade de framework completo'
    - 'Aplicacoes front-end'
```

---

## Design Patterns (Os 5 Essenciais)

### Pattern 1: Hexagonal Port Pattern

**Propósito:** Isolar dominio e use cases de framework e infraestrutura.

**Execution Score:** 10/10 | **Anti-Bug Score:** 9/10

```java
// application/ports/OrderRepository.java
package com.example.orders.application.ports;

import com.example.orders.domain.Order;
import java.util.Optional;

public interface OrderRepository {
  void save(Order order);
  Optional<Order> findById(String id);
}
```

**Bugs Eliminados:**

- Acoplamento com JPA em regra de negocio
- Mudancas de persistencia quebrando casos de uso

**Por Que Funciona:**

- Contratos claros facilitam troca de adapters
- Testes de use case nao dependem do Spring context

---

### Pattern 2: Application Service Pattern

**Propósito:** Orquestrar transacoes e regras sem logica no controller.

**Execution Score:** 10/10 | **Anti-Bug Score:** 9/10

```java
// application/services/PlaceOrderService.java
package com.example.orders.application.services;

import com.example.orders.application.ports.OrderRepository;
import com.example.orders.domain.Order;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlaceOrderService {
  private final OrderRepository repository;

  public PlaceOrderService(OrderRepository repository) {
    this.repository = repository;
  }

  @Transactional
  public String execute(PlaceOrderCommand command) {
    Order order = Order.create(command.customerId(), command.items());
    repository.save(order);
    return order.getId();
  }
}
```

**Bugs Eliminados:**

- Regras em controllers
- Transacoes inconsistentes
- Fluxos sem unidade de trabalho

**Por Que Funciona:**

- Boundary transacional explicito
- Fluxo de negocio previsivel

---

### Pattern 3: Repository Adapter Pattern

**Propósito:** Implementar portas da aplicacao com adapters JPA dedicados.

**Execution Score:** 9/10 | **Anti-Bug Score:** 9/10

```java
// infrastructure/persistence/JpaOrderRepositoryAdapter.java
package com.example.orders.infrastructure.persistence;

import com.example.orders.application.ports.OrderRepository;
import com.example.orders.domain.Order;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public class JpaOrderRepositoryAdapter implements OrderRepository {
  private final SpringDataOrderRepository jpa;

  public JpaOrderRepositoryAdapter(SpringDataOrderRepository jpa) {
    this.jpa = jpa;
  }

  @Override
  public void save(Order order) {
    jpa.save(OrderEntity.fromDomain(order));
  }

  @Override
  public Optional<Order> findById(String id) {
    return jpa.findById(id).map(OrderEntity::toDomain);
  }
}
```

**Bugs Eliminados:**

- Entidades JPA vazando para dominio
- Mudancas de schema quebrando service layer

**Por Que Funciona:**

- Mapeamento fica concentrado
- Dominio permanece limpo

---

### Pattern 4: Domain Event Pattern

**Propósito:** Reduzir acoplamento entre modulo principal e efeitos colaterais.

**Execution Score:** 8/10 | **Anti-Bug Score:** 8/10

```java
// domain/events/OrderPlacedEvent.java
package com.example.orders.domain.events;

public record OrderPlacedEvent(String orderId, String customerId) {}
```

```java
// infrastructure/events/OrderEventsListener.java
@Component
public class OrderEventsListener {
  @EventListener
  public void onOrderPlaced(OrderPlacedEvent event) {
    // notify, metrics, integration
  }
}
```

**Bugs Eliminados:**

- Cadeias sincrona longas no mesmo fluxo
- Side effects escondidos em services

**Por Que Funciona:**

- Integra objetivos secundarios de forma desacoplada
- Facilita observabilidade

---

### Pattern 5: Test Data Builder Pattern

**Propósito:** Gerar cenarios de teste legiveis com baixo ruido.

**Execution Score:** 8/10 | **Anti-Bug Score:** 8/10

```java
public final class OrderBuilder {
  private String customerId = "cust-1";

  public static OrderBuilder anOrder() {
    return new OrderBuilder();
  }

  public Order build() {
    return Order.create(customerId, List.of(new Item("SKU-1", 1)));
  }
}
```

**Bugs Eliminados:**

- Setup verboso e inconsistente
- Baixa clareza no objetivo dos testes

**Por Que Funciona:**

- Reuso de dados base
- Alteracao centralizada quando dominio muda

---

## Estrutura do Projeto

```text
/src/main/java/com/example
  /orders
    /domain                # Entidades e regras
    /application
      /ports               # Interfaces de entrada/saida
      /services            # Use cases
    /infrastructure
      /persistence         # JPA adapters
      /events              # Event listeners
      /http                # Controllers e DTOs
/src/main/resources
  application.yml
  db/migration             # Flyway scripts
/src/test/java/com/example
  /orders
    /unit
    /integration
```

### Justificativa da Estrutura

- **Domain-first:** Regras independentes de framework
- **Ports/adapters:** Facilita substituicao de tecnologia
- **Migration as code:** Schema versionado e auditavel

---

## Tech Stack

| Categoria | Tecnologia | Versão | Propósito |
| -------- | ---------- | ------- | ------- |
| Runtime | Java | 21+ | Linguagem base |
| Framework | Spring Boot | 3.3+ | Bootstrapping e web |
| API | Spring Web | 6+ | REST controllers |
| Persistence | Spring Data JPA | 3+ | Acesso a dados |
| Migration | Flyway | 10+ | Versionamento de schema |
| Validation | Bean Validation | Jakarta | Validacao de DTO |
| Unit Test | JUnit 5 | latest | Testes unitarios |
| Assertions | AssertJ | latest | Assertivas legiveis |
| Integration | Testcontainers | latest | Testes com infra real |

### Dependências Necessárias

```bash
# Gradle (exemplo)
./gradlew addDependency --configuration implementation --dependency org.springframework.boot:spring-boot-starter-web
./gradlew addDependency --configuration implementation --dependency org.springframework.boot:spring-boot-starter-data-jpa
./gradlew addDependency --configuration implementation --dependency org.flywaydb:flyway-core

./gradlew addDependency --configuration testImplementation --dependency org.springframework.boot:spring-boot-starter-test
./gradlew addDependency --configuration testImplementation --dependency org.testcontainers:junit-jupiter
```

---

## Padrões de Código

### Convenções de Nomenclatura

| Elemento | Convenção | Exemplo |
| ------- | ---------- | ------- |
| Package | lowercase dot notation | `com.example.orders.application` |
| Class | PascalCase | `PlaceOrderService` |
| Interface | PascalCase + role | `OrderRepository` |
| DTO | Suffix `Request`/`Response` | `PlaceOrderRequest` |
| Test | `<ClassName>Test` | `PlaceOrderServiceTest` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS` |

### Regras Críticas

1. **No Field Injection:** Usar construtor sempre.
2. **Transactional Boundary in Service:** Nao em controller.
3. **No Domain Logic in Entity JPA:** Dominios separados de ORM.
4. **Explicit Mapping:** DTO <-> Domain sem reflection magica.
5. **Checked/Runtime Errors:** Padrao consistente por camada.

### Baseline do Spring

```yaml
spring:
  jackson:
    deserialization:
      fail-on-unknown-properties: true
  mvc:
    problemdetails:
      enabled: true
```

---

## Estratégia de Testes

### Pirâmide de Testes

```text
         /\
        /E2E\           10% - Fluxos externos criticos
       /------\
      /Integration\     30% - DB, migrations, adapters
     /------------\
    /  Unit Tests  \    60% - Dominio e services
   /----------------\
```

### O Que Testar

#### Sempre Testar (Crítico)

- [ ] Regras de dominio
- [ ] Casos de uso transacionais
- [ ] Validacao de requests

#### Considerar Testar

- [ ] Serializacao JSON de contratos externos
- [ ] Event listeners principais

#### Nunca Testar

- [ ] Getters/setters triviais
- [ ] Comportamento interno do framework

### Metas de Cobertura

```text
- Domain/Application: 90%+
- Infrastructure adapters: 70%+
- Overall: 75%+
```

### Template de Teste

```java
@ExtendWith(MockitoExtension.class)
class PlaceOrderServiceTest {
  @Mock private OrderRepository repository;
  @InjectMocks private PlaceOrderService service;

  @Test
  void shouldPlaceOrder() {
    PlaceOrderCommand cmd = new PlaceOrderCommand("cust-1", List.of(new ItemInput("SKU-1", 1)));
    String orderId = service.execute(cmd);

    assertThat(orderId).isNotBlank();
    verify(repository).save(any());
  }
}
```

---

## Estratégias de Economia de Tokens

### Estratégia 1: Reusar Adapter Existente

Prompt curto: `Implemente Payments adapter igual ao JpaOrderRepositoryAdapter`.

### Estratégia 2: Prompts Contract-First

Passe apenas porta + DTO + teste alvo.

### Estratégia 3: Manter o Framework nas Bordas

Pedir alteracoes no adapter sem tocar dominio reduz contexto.

---

## Stack de Prevenção de Bugs

| Camada | Captura | Implementação |
| ----- | ------- | -------------- |
| Compiler + Nullability discipline | 35% | Java 21 + static analysis |
| Validation + transactions | 35% | Bean Validation + `@Transactional` |
| Integration tests | 25% | Testcontainers + Flyway |
| E2E smoke | 5% | Fluxos essenciais |

---

## Padrões a EVITAR

### Fat Controller

Controllers com regra de negocio e acesso a repositorio.

### Field Injection

`@Autowired` em campo dificulta testes e imutabilidade.

### Generic Base Service Abstraction

Hierarquia abstrata excessiva que reduz legibilidade.

---

## Templates de Arquivo

### Template de Port

```java
public interface CustomerGateway {
  CustomerData findById(String id);
}
```

### Template de Service

```java
@Service
public class UseCaseService {
  public Result execute(Command command) {
    // validate, run domain rules, persist
    return Result.ok();
  }
}
```

### Template de Controller

```java
@RestController
@RequestMapping("/api/orders")
public class OrdersController {
  @PostMapping
  public ResponseEntity<?> create(@Valid @RequestBody PlaceOrderRequest request) {
    return ResponseEntity.accepted().build();
  }
}
```

---

## Integração com o AIOX

### Workflow Recomendado

1. `@architect` define boundaries hexagonais pelo preset `java`
2. `@dev` implementa por camadas (`domain`, `application`, `infrastructure`)
3. `@qa` valida transacoes, contratos e regressao

### Comandos AIOX

```bash
@dev "Follow the java preset patterns for this service"
@qa "Validate transactional integrity and adapter boundaries"
```

---

## Checklist para Novas Features

```markdown
- [ ] Definir command e resposta da feature
- [ ] Criar service transacional
- [ ] Implementar porta e adapter
- [ ] Adicionar migration Flyway
- [ ] Cobrir teste unitario e integracao
- [ ] Garantir tratamento de erro padrao (Problem Details)
```

---

## Changelog

| Data       | Versão  | Mudanças |
| ---------- | ------- | ------- |
| 2026-02-19 | 1.0.0   | Preset Java inicial |

---

_AIOX Tech Preset - Synkra AIOX Framework_
