---
name: selecao-de-padrao-arquitetural
description: >
  Use quando a decisão for escolher o padrão arquitetural de um novo produto ou
  refatoração de sistema — monolito modular vs microservices vs serverless vs
  event-driven vs modular-monolith híbrido — E o padrão INTERNO por domínio
  (DDD + hexagonal ports/adapters + onion / clean architecture). Cobre matriz de
  decisão (equipe/domínio/escala/latency/ops-maturity), default Kolden (monolito
  modular Next.js até 10 devs), quando microservices "começa a fazer sentido"
  (>50 domain contexts OU >20 devs), e como estruturar o interior de cada serviço
  em camadas. Gatilhos: "que arquitetura usar", "monolito vs microservices",
  "DDD", "hexagonal", "clean architecture", "onion architecture", "modular
  monolith", "arquitetura de referência", "padrão arquitetural". Dono: @architect
  (Aria). Delegação de @architect para @data-engineer (Dara) quando envolver
  boundary de bounded context com schema próprio.
---

# Seleção de padrão arquitetural

A pergunta "monolito ou microservices?" está mal formulada. A pergunta certa é:
**quantos bounded contexts o negócio tem, e qual é a maturidade operacional do time?**
Esta habilidade transforma essa pergunta em matriz de decisão auditável.

## Regra de bolso Kolden

**Default: monolito modular em Next.js até 10 devs OU 15 bounded contexts** — o que vier
primeiro. Só se afaste do default se a matriz de decisão apontar pontuação >12/20
para microservices/serverless.

## Padrões externos (arquitetura de sistema)

### 1. Monolito modular (default Kolden)
- **Um deploy**, muitos módulos com fronteira lógica (namespaces, packages).
- Comunicação intra-módulo por chamada de função direta (custo zero).
- Comunicação inter-módulo por **interface pública explícita** (nunca `import` de arquivo interno).
- Persistência: um Postgres compartilhado, um schema por bounded context.
- **Quando usa:** produto único, time <10 devs, latência crítica (chamada intra-processo é 1000x
  mais rápida que HTTP), operação simples.
- **Kolden real:** Kolden OS, Rosie, Central de Tarefas.

### 2. Microservices
- **Um deploy por serviço**, cada um com seu banco.
- Comunicação por HTTP/gRPC (síncrono) ou event bus (assíncrono).
- Requer: service mesh, distributed tracing, on-call rotation, deploy automatizado.
- **Quando usa:** >50 bounded contexts OU >20 devs OU domínios com SLA muito diferentes
  (checkout precisa 99.99% e blog precisa 99%).
- **Custo escondido:** cada serviço novo custa ~1 semana de plumbing (CI/CD, secrets, logs, alertas).

### 3. Serverless (FaaS)
- Funções stateless, cold start medido em ms.
- Escala automática, paga por invocação.
- **Quando usa:** cargas com picos raros (webhook, cron, upload), latência tolerante a cold start,
  time sem SRE dedicado.
- **Não usa:** carga constante alta (mais caro que VM), latência <100ms P99, transação distribuída complexa.

### 4. Event-driven / EDA
- Comunicação primária por eventos (Kafka, Redpanda, NATS, EventBridge).
- Serviços não sabem quem consome; eventual consistency.
- **Quando usa:** múltiplos consumidores do mesmo fato (pedido → cobrança, fulfillment, analytics),
  disaccoplamento temporal (produtor não espera consumidor).

### 5. Modular-monolith híbrido (padrão de saída)
- Começa como monolito modular, extrai serviço só quando um módulo prova que precisa (métrica clara:
  scaling separado, deploy independente por regulatório, time exclusivo).
- **Nunca extrai preventivamente.** "Vamos separar porque um dia pode crescer" é anti-padrão.

## Matriz de decisão (pontuar 0-4 em cada eixo)

| Eixo | 0 (fica no monolito) | 4 (vai para microservices) |
|---|---|---|
| **Bounded contexts** | ≤15 | >50 |
| **Tamanho do time** | ≤10 devs | >30 devs |
| **Diferença de SLA** | Uniforme | Um contexto exige 99.99%, outros 99% |
| **Frequência de deploy** | Semanal ok | Múltiplos deploys/dia por contexto |
| **Maturidade ops** | Sem SRE | SRE + observabilidade + on-call estabelecidos |

**Soma total 0-20:**
- **0-6:** monolito modular (default)
- **7-12:** modular-monolith híbrido, extrair 1-2 serviços críticos
- **13-20:** microservices completo (com custo de plataforma assumido)

## Padrões internos (arquitetura de cada serviço)

Independente do padrão externo, o INTERIOR de cada serviço/módulo segue:

### DDD (Domain-Driven Design)
- **Bounded Context:** fronteira semântica onde termos têm significado único. "Pedido" no checkout
  ≠ "Pedido" no fulfillment.
- **Ubiquitous Language:** vocabulário do domínio no código (nome de função = termo do negócio,
  não nome técnico).
- **Aggregate:** raiz que garante invariante de negócio (`Pedido` valida linhas, quantidades, total).

### Hexagonal (Ports & Adapters)
- **Domain core no centro:** puro, sem dependência de framework.
- **Ports:** interfaces que o domínio precisa (`interface PedidoRepository`, `interface Notifier`).
- **Adapters:** implementações concretas (PostgresPedidoRepository, EmailNotifier). Adapters
  dependem de ports; domínio nunca depende de adapter.
- **Teste:** troca adapter por fake em memória, roda 100% do domínio sem DB.

### Onion / Clean Architecture
- Camadas concêntricas: **Domain → Application → Infrastructure → Presentation**.
- Dependency rule: dependência aponta **para dentro**. Presentation depende de Application; Application
  depende de Domain. Nunca o contrário.
- Application orquestra casos de uso ("CriarPedidoUseCase"); Domain guarda regras eternas
  ("Pedido não pode ter linha com quantidade zero").

Regra prática: as três abordagens (DDD/hex/onion) NÃO são concorrentes. Se aplicam juntas:
**DDD define os contextos, hexagonal define as fronteiras, onion define as camadas dentro de cada
contexto.**

## Antipatrões a evitar

- **Distributed monolith:** microservices que compartilham banco. Pior dos dois mundos.
- **Anemic domain:** classes de domínio sem comportamento, só getters/setters. Toda regra num
  "service" externo. Não é DDD.
- **Ports pra tudo:** hexagonal com interface pra cada função. Interface só onde troca-se adapter.
- **Extração preventiva:** "vamos separar checkout do resto porque um dia vai crescer". Extraia
  quando doer, não antes.

## Handoffs

- **Boundary com schema próprio** → Dara (@data-engineer). Cada bounded context pode ter seu
  schema no mesmo Postgres (monolito) ou banco próprio (microservice).
- **Deploy independente** → Gage (@devops). Definir CI/CD por contexto.
- **Custo/preço da opção** → Plutos (Olimpo). Microservices tem OPEX estrutural (plataforma,
  observabilidade, SRE).

## Regras Kolden

- **Default:** Monolito modular Next.js. Só se afaste com evidência de matriz ≥13/20.
- **Vendor-agnóstico:** decisão vale para stack Next.js/Node OU Python/FastAPI OU Go. Não amarrar
  decisão a framework único.
- **Prova de custo:** se propor microservices, apresentar o CAPEX+OPEX da plataforma (SRE + tools)
  no PRD. Aria consulta Plutos antes de assinar.

---
## Atribuição
Herança histórica: **Eric Evans** — *Domain-Driven Design: Tackling Complexity in the Heart of
Software* (2003); **Alistair Cockburn** — Hexagonal Architecture (2005, "Ports and Adapters");
**Jeffrey Palermo** — Onion Architecture (2008); **Robert C. Martin** — *Clean Architecture* (2017);
**Sam Newman** — *Building Microservices* (2015); **Martin Fowler** + James Lewis — "Microservices"
(2014, canonical article); **Vaughn Vernon** — *Implementing Domain-Driven Design* (2013). Adaptado
de `github.com/msitarzewski/agency-agents@a597cb6` (MIT), bucket B03/engineering, IDs G68, G69.
