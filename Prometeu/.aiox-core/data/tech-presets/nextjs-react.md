# Next.js + React Tech Preset

> Preset de arquitetura otimizado para desenvolvimento fullstack com Next.js e React, focado em máxima eficiência com Claude Code.

---

## Metadata

```yaml
preset:
  id: nextjs-react
  name: 'Next.js + React Fullstack Preset'
  version: 1.0.0
  description: 'Arquitetura otimizada para aplicações fullstack com Next.js 16+, React, TypeScript e padrões que maximizam a eficiência do Claude Code'
  technologies:
    - Next.js 16+ (App Router + Proxy)
    - React 18+
    - TypeScript
    - Tailwind CSS
    - Zustand
    - React Query
    - Zod
    - Vitest
    - Playwright
  suitable_for:
    - 'Aplicações web fullstack'
    - 'SaaS products'
    - 'E-commerce'
    - 'Dashboards administrativos'
    - 'Aplicações com SSR/SSG'
  not_suitable_for:
    - 'Aplicações mobile-only (use React Native)'
    - 'Microsserviços backend puros (use Node.js puro ou NestJS)'
    - 'Sites estáticos simples (use Astro)'
```

---

## Design Patterns (Os 5 Essenciais)

> **Crítico:** Estes 5 patterns eliminam 95% dos bugs e permitem ao Claude Code trabalhar com máxima eficiência. São complementares e devem ser usados TODOS juntos.

### Pattern 1: Contract Pattern

**Propósito:** Definir APIs públicas entre features para prevenir bugs de integração

**Execution Score:** 10/10 | **Anti-Bug Score:** 10/10

````typescript
// src/features/auth/auth.contract.ts

/**
 * Public API for authentication feature
 * Other features depend ONLY on this contract, never on implementation
 *
 * @example
 * ```ts
 * class CheckoutService {
 *   constructor(private auth: AuthContract) {}
 *
 *   async process() {
 *     const user = await this.auth.getCurrentUser()
 *   }
 * }
 * ```
 */
export interface AuthContract {
  /**
   * Authenticate user with credentials
   * @throws {InvalidCredentialsError} When credentials are wrong
   * @throws {UserBlockedError} When user account is blocked
   */
  login(email: string, password: string): Promise<AuthResult>;

  /**
   * Get currently authenticated user
   * @throws {UnauthorizedError} When no user is authenticated
   */
  getCurrentUser(): Promise<User>;

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean;

  /**
   * Sign out current user
   */
  logout(): Promise<void>;
}

export type AuthResult = {
  user: User;
  token: string;
  expiresAt: Date;
};

export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
};
````

**Bugs Eliminados:**

- Feature A espera string, Feature B retorna number
- Método renomeado quebra todos os consumidores
- Parâmetros em ordem errada
- Tipos de retorno inesperados
- Dependências circulares entre features

**Por Que o Claude Code se Destaca:**

- TypeScript impõe contratos em tempo de compilação
- O Claude lê o contrato (50 linhas) em vez da implementação (2000 linhas)
- Impossível quebrar o contrato sem erros de TypeScript

---

### Pattern 2: Service Pattern

**Propósito:** Encapsular lógica de negócio em serviços testáveis e reutilizáveis

**Execution Score:** 10/10 | **Anti-Bug Score:** 9/10

```typescript
// src/features/auth/services/auth.service.ts

import { AuthContract, AuthResult, User } from '../auth.contract';
import { UserRepository } from '../repositories/user.repository';
import { EventBus } from '@/shared/events/eventBus';

export class AuthService implements AuthContract {
  constructor(
    private userRepo: UserRepository,
    private eventBus: EventBus
  ) {}

  async login(email: string, password: string): Promise<AuthResult> {
    // 1. Validate input
    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    // 2. Find user
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    // 3. Verify password
    const isValid = await this.verifyPassword(password, user.passwordHash);
    if (!isValid) {
      throw new InvalidCredentialsError('Invalid credentials');
    }

    // 4. Check if blocked
    if (user.isBlocked) {
      throw new UserBlockedError('Account is blocked');
    }

    // 5. Generate token
    const token = this.generateToken(user);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 6. Emit event
    this.eventBus.emit('auth:login', user);

    return {
      user: this.sanitizeUser(user),
      token,
      expiresAt,
    };
  }

  // ... other methods
}

// Export singleton instance
export const authService = new AuthService(userRepository, eventBus);
```

**Bugs Eliminados:**

- Lógica de negócio espalhada entre componentes
- Duplicação de código
- Impossível testar sem UI
- Tratamento de erro inconsistente
- Efeitos colaterais em lugares inesperados

---

### Pattern 3: Repository Pattern

**Propósito:** Isolar lógica de acesso a dados da lógica de negócio

**Execution Score:** 9/10 | **Anti-Bug Score:** 9/10

```typescript
// src/features/auth/repositories/user.repository.ts

import { db } from '@/lib/database';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return db.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return db.user.findUnique({
      where: { id },
    });
  }

  async create(data: CreateUserDTO): Promise<User> {
    return db.user.create({
      data: {
        email: data.email,
        name: data.name,
        passwordHash: data.passwordHash,
        role: data.role || 'user',
        createdAt: new Date(),
      },
    });
  }

  async update(id: string, data: UpdateUserDTO): Promise<User> {
    return db.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await db.user.delete({
      where: { id },
    });
  }
}

// Export singleton
export const userRepository = new UserRepository();
```

**Bugs Eliminados:**

- SQL/queries espalhados por todo o codebase
- Impossível testar sem banco de dados real
- Trocar o ORM quebra a aplicação inteira
- Padrões de acesso a dados inconsistentes

---

### Pattern 4: Event Bus Pattern (Observer)

**Propósito:** Habilitar acoplamento solto entre features através de arquitetura event-driven

**Execution Score:** 8/10 | **Anti-Bug Score:** 10/10

```typescript
// src/shared/events/eventBus.ts

type EventHandler<T = any> = (data: T) => void | Promise<void>;

export class EventBus {
  private handlers = new Map<string, EventHandler[]>();

  on<T = any>(event: string, handler: EventHandler<T>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler);
  }

  off<T = any>(event: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  async emit<T = any>(event: string, data: T): Promise<void> {
    const handlers = this.handlers.get(event) || [];
    handlers.forEach((handler) => {
      try {
        Promise.resolve(handler(data)).catch((error) => {
          console.error(`Error in handler for event "${event}":`, error);
        });
      } catch (error) {
        console.error(`Error in handler for event "${event}":`, error);
      }
    });
  }
}

export const eventBus = new EventBus();

// Typed events
export type AppEvents = {
  'auth:login': User;
  'auth:logout': { userId: string };
  'order:created': Order;
  'order:paid': { orderId: string; amount: number };
};
```

**Uso:**

```typescript
// Feature A emits
this.eventBus.emit('order:created', order);

// Feature B reacts (doesn't know about Feature A)
eventBus.on('order:created', async (order) => {
  await emailService.sendOrderConfirmation(order);
});

// Feature C also reacts independently
eventBus.on('order:created', async (order) => {
  await analytics.track('purchase', { orderId: order.id });
});
```

**Bugs Eliminados:**

- Dependências circulares entre features
- Mudança na Feature A quebra a Feature B
- Acoplamento forte torna a refatoração impossível
- Adicionar nova funcionalidade exige modificar código existente

---

### Pattern 5: Builder Pattern (Tests Only)

**Propósito:** Criar fixtures de teste facilmente e consistentemente

**Execution Score:** 10/10 | **Anti-Bug Score:** 8/10

**IMPORTANTE:** Use Builders APENAS para TESTES, não em código de produção

```typescript
// test/builders/user.builder.ts

export class UserBuilder {
  private data: Partial<User> = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'user',
    createdAt: new Date(),
    isBlocked: false,
  };

  withId(id: string): this {
    this.data.id = id;
    return this;
  }

  withEmail(email: string): this {
    this.data.email = email;
    return this;
  }

  asAdmin(): this {
    this.data.role = 'admin';
    return this;
  }

  asBlocked(): this {
    this.data.isBlocked = true;
    return this;
  }

  build(): User {
    return this.data as User;
  }
}
```

**Uso em Testes:**

```typescript
describe('OrderService', () => {
  it('should create order for authenticated user', async () => {
    const user = new UserBuilder().withEmail('customer@example.com').build();

    const admin = new UserBuilder().asAdmin().build();
    const blocked = new UserBuilder().asBlocked().build();

    // ... test logic
  });
});
```

---

## Estrutura do Projeto

```
/src
  /features              # Organização baseada em features (NÃO baseada em tipo)
    /auth
      /components       # Componentes de UI específicos de auth
      /hooks           # Hooks customizados para auth
      /services        # Lógica de negócio (funções puras)
      /repositories    # Camada de acesso a dados
      /types           # Tipos/interfaces TypeScript
      /utils           # Funções auxiliares
      auth.contract.ts # API PÚBLICA (ponto de integração)
      index.ts         # Barrel export (facade)
    /products
      [mesma estrutura]
    /checkout
      [mesma estrutura]
    /_reference        # Feature de referência (copie o bom código)
      /contracts
      /repositories
      /services
      /hooks
      /components
      index.ts

  /shared               # APENAS código realmente compartilhado
    /components         # Componentes de UI reutilizáveis
    /hooks             # Hooks genéricos
    /utils             # Utilitários genéricos
    /types             # Tipos compartilhados
    /events            # Event bus

  /config              # Variáveis de ambiente, constantes
  /lib                 # Integrações de terceiros

/test
  /builders            # Builders de fixtures de teste
  /mocks               # Handlers e mocks do MSW
  /e2e                 # Testes E2E do Playwright
```

### Justificativa da Estrutura

- **Features são autocontidas:** Mais fácil de entender o contexto
- **Integração baseada em contrato:** Features se comunicam apenas via contratos
- **Feature de referência:** Template para novas features (copie os padrões)
- **Shared é mínimo:** Apenas código realmente reutilizável

---

## Tech Stack

| Categoria           | Tecnologia      | Versão  | Propósito                               |
| ------------------- | --------------- | ------- | --------------------------------------- |
| Framework           | Next.js         | ^16.0.0 | Framework React fullstack (Proxy-based) |
| Language            | TypeScript      | ^5.0.0  | Type safety                             |
| Styling             | Tailwind CSS    | ^3.4.0  | CSS utility-first                       |
| UI Components       | shadcn/ui       | latest  | Componentes acessíveis                  |
| State (Global)      | Zustand         | ^4.5.0  | Estado global simples                   |
| State (Server)      | React Query     | ^5.0.0  | Gestão de estado de servidor            |
| Forms               | React Hook Form | ^7.50.0 | Tratamento de formulários               |
| Validation          | Zod             | ^3.22.0 | Validação de schema                     |
| Testing (Unit)      | Vitest          | ^1.2.0  | Testes unitários rápidos                |
| Testing (Component) | Testing Library | ^14.0.0 | Testes de componentes                   |
| Testing (E2E)       | Playwright      | ^1.41.0 | Testes E2E                              |
| API Mocking         | MSW             | ^2.1.0  | Mock Service Worker                     |
| Database            | Prisma          | ^5.9.0  | ORM type-safe                           |

### Dependências Necessárias

```bash
# Core
npm install next react react-dom typescript
npm install tailwindcss postcss autoprefixer
npm install @tanstack/react-query zustand
npm install react-hook-form @hookform/resolvers zod

# Dev
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test msw
npm install -D prisma @types/node @types/react
```

---

## Padrões de Código

### Convenções de Nomenclatura

| Elemento     | Convenção              | Exemplo                |
| ------------ | ---------------------- | ---------------------- |
| Components   | PascalCase             | `ProductCard.tsx`      |
| Hooks        | useCamelCase           | `useProducts.ts`       |
| Services     | camelCase + Service    | `auth.service.ts`      |
| Repositories | camelCase + Repository | `user.repository.ts`   |
| Contracts    | camelCase + .contract  | `auth.contract.ts`     |
| Types        | PascalCase             | `User`, `AuthResult`   |
| Constants    | SCREAMING_SNAKE        | `MAX_ITEMS_PER_PAGE`   |
| Tests        | _.test.ts ou _.spec.ts | `auth.service.test.ts` |

### Regras Críticas

1. **Contract Pattern:** Features SOMENTE expõem via arquivos `.contract.ts`
2. **Sem Imports Cross-Feature:** Importe apenas do index `@/features/[name]`
3. **Types First:** Sempre defina schemas/tipos ANTES da implementação
4. **Error Handling:** Todas as operações async devem ter tratamento de erro explícito
5. **Sem Tipos `any`:** Use `unknown` se o tipo for realmente desconhecido, depois faça o narrowing

### Next.js 16+ Proxy (substitui Middleware)

> **IMPORTANTE:** Next.js 16 substituiu o Middleware pelo sistema de Proxy. NÃO use `middleware.ts`.

**Antes (Next.js 14 - DEPRECADO):**

```typescript
// middleware.ts - NÃO USE MAIS
export function middleware(request: NextRequest) {
  // auth checks, redirects, etc.
}
```

**Agora (Next.js 16+ - USE PROXY):**

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

**Para autenticação, use Server Components ou Route Handlers:**

```typescript
// app/dashboard/page.tsx
import { auth } from '@/features/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')

  return <Dashboard user={session.user} />
}
```

**Vantagens do Proxy sobre Middleware:**

- Executa no servidor Node.js (não em Edge Runtime limitado)
- Acesso completo a banco de dados e serviços
- Melhor performance e caching
- Configuração centralizada em `next.config.ts`

### TypeScript Config

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true
  }
}
```

---

## Estratégia de Testes

### Pirâmide de Testes

```
         /\
        /E2E\           10% - Apenas fluxos críticos do usuário
       /------\
      /Integration\     20% - Features funcionando juntas
     /------------\
    /  Unit Tests  \    70% - Lógica de negócio, componentes
   /----------------\
```

### O Que Testar

#### Sempre Testar (Crítico)

- [ ] Lógica de Negócio (Services/Utils) - 90%+ de cobertura
- [ ] Validação e Regras de Negócio
- [ ] Casos de Borda (null, vazio, valores máximos)

#### Considerar Testar

- [ ] Hooks Customizados
- [ ] Integração de Componentes
- [ ] Tratamento de Erro de API

#### Nunca Testar

- [ ] Internals do framework (React, Next.js)
- [ ] Bibliotecas externas (Zod, React Query)
- [ ] Getters/setters triviais
- [ ] CSS/estilização

### Metas de Cobertura

```
- Lógica de negócio (services/utils): 90%+
- Hooks: 80%+
- Components: 60%+
- Geral: 70%+

NÃO persiga 100% - retornos decrescentes
```

### Template de Teste

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('[Feature]Service', () => {
  let service: FeatureService;
  let mockRepo: MockType;

  beforeEach(() => {
    mockRepo = { method: vi.fn() };
    service = new FeatureService(mockRepo);
  });

  describe('methodName', () => {
    it('should handle happy path', async () => {
      // Arrange
      const input = {
        /* test data */
      };
      mockRepo.method.mockResolvedValue({
        /* mock response */
      });

      // Act
      const result = await service.methodName(input);

      // Assert
      expect(result).toEqual({
        /* expected */
      });
    });

    it('should handle validation error', async () => {
      await expect(service.methodName(invalidInput)).rejects.toThrow('Error message');
    });
  });
});
```

---

## Estratégias de Economia de Tokens

> Estratégias para minimizar consumo de tokens com Claude Code.

### Estratégia 1: Mostre, Não Conte (Show, Don't Tell)

```
// BAD: ~1000 tokens explaining patterns
"Create a CheckoutService using the Service pattern with
Dependency Injection following SOLID principles..."

// GOOD: ~300 tokens showing example
"Create CheckoutService following the same pattern as AuthService:
[paste AuthService.ts]"
```

### Estratégia 2: Feature de Referência

Crie uma feature perfeita como template, depois:

```
"Create ProductService identical to _reference/services/reference.service.ts
Just change the entity name and business logic"
```

### Estratégia 3: Schemas como Documentação

```typescript
// Schema replaces 50+ lines of explanation
export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  name: z.string().min(2).max(100),
});
```

### Estratégia 4: Testes como Especificações

```typescript
// Tests are more concise than prose
"Make these tests pass:

describe('calculateShipping', () => {
  it('charges R$10 for < 1kg', () => {
    expect(calculateShipping(0.5, 50)).toBe(10)
  })
  it('adds 20% for distance > 100km', () => {
    expect(calculateShipping(1, 150)).toBe(12)
  })
})"
```

---

## Stack de Prevenção de Bugs

| Camada             | Captura | Implementação              |
| ------------------ | ------- | -------------------------- |
| TypeScript Strict  | 60%     | `strict: true` no tsconfig |
| Runtime Validation | 25%     | Schemas Zod nas bordas     |
| Contract Pattern   | 10%     | Imposição de interface     |
| Tests              | 5%      | Casos de borda e regressões|

---

## Padrões a EVITAR

### Singleton Pattern

**Problema:** Difícil de testar, estado compartilhado entre testes

```typescript
// BAD
class Database {
  private static instance: Database
  static getInstance() { ... }
}

// GOOD
export const db = new Database()
```

### TypeScript Decorators

**Problema:** Experimental, sintaxe confusa, difícil de debugar

```typescript
// BAD
@Log
@Validate
@Cache
class UserService {}

// GOOD
const userService = rateLimit(cache(validate(new UserService())));
```

### Abstract Factory

**Problema:** Over-engineering para 99% dos casos

```typescript
// BAD
abstract class VehicleFactory {
  abstract createCar(): Car;
}

// GOOD
const vehicleFactory = {
  createCar: (region: string) => (region === 'US' ? new USCar() : new EUCar()),
};
```

---

## Templates de Arquivo

### Template de Contract

```typescript
// src/features/[feature]/[feature].contract.ts

/**
 * Public API for [feature] feature
 */
export interface [Feature]Contract {
  /**
   * Method description
   * @throws {ErrorType} When error occurs
   */
  methodName(param: Type): Promise<ReturnType>
}

export type [Feature]Result = {
  // type definition
}

export type [Feature]Events = {
  '[feature]:event-name': PayloadType
}
```

### Template de Service

```typescript
// src/features/[feature]/services/[feature].service.ts

import { [Feature]Contract } from '../[feature].contract'

export class [Feature]Service implements [Feature]Contract {
  constructor(
    private dependency1: Dependency1Type,
    private eventBus: EventBus
  ) {}

  async methodName(param: Type): Promise<ReturnType> {
    // 1. Validate
    // 2. Execute
    // 3. Emit events
    // 4. Return
  }
}

export const [feature]Service = new [Feature]Service(dep1, eventBus)
```

### Template de Index

```typescript
// src/features/[feature]/index.ts

// ONLY export public API
export type { [Feature]Contract, [Feature]Result } from './[feature].contract'
export { [feature]Service } from './services/[feature].service'

// DO NOT export internal implementation details
```

---

## Integração com o AIOX

### Workflow Recomendado

1. **Fase de Planejamento:**
   - Use `@architect` com `*create-doc fullstack-architecture`
   - Referencie este preset para padrões e estrutura

2. **Fase de Desenvolvimento:**
   - Use `@dev` seguindo os 5 Patterns Essenciais
   - Crie features usando a estratégia de Feature de Referência

3. **Fase de QA:**
   - Use `@qa` com a estratégia de testes definida
   - Garanta que as metas de cobertura sejam atingidas

### Templates AIOX Relacionados

- `fullstack-architecture-tmpl.yaml` - Documento principal de arquitetura
- `front-end-architecture-tmpl.yaml` - Detalhes de frontend
- `story-tmpl.yaml` - Formato de user story

### Comandos AIOX

```bash
# Create architecture doc using this preset
@architect *create-doc fullstack-architecture

# Reference this preset
@dev "Follow the nextjs-react preset patterns"
```

---

## Checklist para Novas Features

```markdown
Ao criar uma nova feature:

- [ ] Defina o Contract se a feature for usada por outras
- [ ] Crie o Repository para todo acesso a dados
- [ ] Implemente o Service para a lógica de negócio
- [ ] Use o Event Bus para comunicação cross-feature
- [ ] Crie Builders para fixtures de teste
- [ ] Exporte apenas a API pública através de index.ts
- [ ] Escreva testes usando contratos mockados
- [ ] Documente os pontos de integração

Ao integrar com uma feature existente:

- [ ] Importe APENAS o Contract, nunca a implementação
- [ ] Use o Event Bus se não precisar de resposta síncrona
- [ ] Mocke os contratos nos testes
- [ ] Não crie dependências circulares
```

---

## Changelog

| Data       | Versão  | Mudanças                                             |
| ---------- | ------- | ---------------------------------------------------- |
| 2026-01-28 | 1.1.0   | Atualização para Next.js 16+, substitui Middleware por Proxy |
| 2025-01-27 | 1.0.0   | Versão inicial baseada em DEVELOPMENT_GUIDE.md       |

---

_AIOX Tech Preset - Synkra AIOX Framework_
