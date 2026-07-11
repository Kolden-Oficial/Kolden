---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/templates/claude-md-library|claude-md-library]]"
  - "[[Dedalo/templates/claude-md-microservices|claude-md-microservices]]"
  - "[[Dedalo/templates/claude-md-mobile|claude-md-mobile]]"
  - "[[Dedalo/templates/claude-md-monorepo|claude-md-monorepo]]"
---

# CLAUDE.md — Projeto Fullstack (Next.js + React)

## Visão Geral do Projeto

- **Nome:** [PROJECT_NAME]
- **Descrição:** [Descrição breve da aplicação]
- **Tipo:** Aplicação web fullstack
- **Framework:** Next.js (App Router)
- **Status:** [Desenvolvimento / Homologação / Produção]

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|-------|-----------|---------|
| Framework | Next.js | 15.x |
| Biblioteca de UI | React | 19.x |
| Linguagem | TypeScript | 5.x |
| Estilização | Tailwind CSS | 4.x |
| Componentes de UI | shadcn/ui | latest |
| Estado (cliente) | Zustand | 5.x |
| Busca de Dados | TanStack Query | 5.x |
| Banco de Dados | PostgreSQL | via Supabase |
| Auth | Supabase Auth | — |
| Validação | Zod | 3.x |
| Testes | Jest + React Testing Library | — |
| Linting | ESLint + Prettier | — |

## Estrutura de Diretórios

```
src/
  app/                    # Páginas do App Router do Next.js
    (auth)/               # Grupo de rotas de auth (login, registro)
    (dashboard)/          # Grupo de rotas do dashboard
    api/                  # Handlers de rotas de API
    layout.tsx            # Layout raiz
    page.tsx              # Página inicial (landing)
  components/
    ui/                   # Componentes base do shadcn/ui
    shared/               # Componentes compostos compartilhados
    features/             # Componentes específicos de funcionalidades
  lib/
    supabase/             # Configuração do cliente Supabase
    utils.ts              # Funções utilitárias
    constants.ts          # Constantes da aplicação
  hooks/                  # Hooks customizados do React
  stores/                 # Stores do Zustand
  types/                  # Definições de tipos do TypeScript
  styles/                 # Estilos globais, config do Tailwind
```

## Padrões de Código

### Componentes
- Use componentes funcionais com interfaces TypeScript para as props
- Prefira exports nomeados: `export function Button() {}` e não `export default`
- Mantenha os testes de componentes co-localizados: `Button.tsx` + `Button.test.tsx`
- Separe componentes de servidor (padrão) de componentes de cliente (`'use client'`)
- Mantenha os componentes abaixo de 200 linhas; extraia a lógica para hooks

### Convenções de Nomenclatura
- Componentes: PascalCase (`UserProfile.tsx`)
- Hooks: camelCase com prefixo `use` (`useAuth.ts`)
- Utilitários: camelCase (`formatDate.ts`)
- Tipos: PascalCase com sufixos descritivos (`UserProfileProps`, `AuthState`)
- Rotas de API: minúsculas com hífens (`/api/user-profile/route.ts`)
- Constantes: SCREAMING_SNAKE_CASE (`MAX_RETRY_COUNT`)

### Componentes de Servidor vs Cliente
- **Componentes de Servidor** (padrão): Busca de dados, acesso a banco de dados, lógica sensível
- **Componentes de Cliente** (`'use client'`): Interatividade, APIs do navegador, estado, efeitos
- Nunca importe módulos server-only em componentes de cliente
- Passe props serializáveis dos componentes de servidor para os de cliente

### Padrões de API
- Rotas de API em `src/app/api/` usando Route Handlers
- Valide todas as entradas com schemas Zod
- Retorne formatos de resposta consistentes: `{ data, error, meta }`
- Use códigos de status HTTP apropriados (200, 201, 400, 401, 404, 500)
- Trate erros com try/catch, nunca exponha erros internos

### Gerenciamento de Estado
- **Estado do servidor:** TanStack Query para todos os dados de API (cache, revalidação)
- **Estado do cliente:** Zustand para estado de UI (modais, barras laterais, preferências)
- **Estado de formulário:** React Hook Form + validação com Zod
- Nunca duplique o estado do servidor nas stores do cliente

## Requisitos de Teste

- Executar todos os testes: `npm test`
- Executar com cobertura: `npm test -- --coverage`
- Cobertura mínima: 80% para lógica de negócio, 60% para componentes
- Arquivos de teste: `*.test.ts` ou `*.test.tsx` co-localizados com a fonte
- Use `@testing-library/react` para testes de componentes
- Faça mock do cliente Supabase nos testes, nunca acesse o banco de dados real

## Convenções de Git

- **Commits:** Conventional commits (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`)
- **Branches:** `feat/description`, `fix/description`, `chore/description`
- **Títulos de PR:** Iguais aos conventional commits
- Referencie a issue/story: `feat: add user profile page [STORY-1.2]`

## Comandos Comuns

```bash
npm run dev          # Inicia o servidor de desenvolvimento (localhost:3000)
npm run build        # Build de produção
npm run start        # Inicia o servidor de produção
npm test             # Executa os testes com Jest
npm run lint         # Verificação com ESLint
npm run lint:fix     # Correção automática com ESLint
npm run typecheck    # Verificação de tipos do TypeScript
npm run format       # Formatação com Prettier
```

## Variáveis de Ambiente

- `.env.local` para desenvolvimento local (gitignored)
- `.env.example` como template (commitado)
- Obrigatórias: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Server-only: `SUPABASE_SERVICE_ROLE_KEY` (nunca prefixe com `NEXT_PUBLIC_`)

## Tratamento de Erros

```typescript
// Padrão de rota de API
export async function GET(request: Request) {
  try {
    const data = await fetchData();
    return NextResponse.json({ data });
  } catch (error) {
    console.error('GET /api/resource failed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resource' },
      { status: 500 }
    );
  }
}
```

## Notas Importantes

- Sempre verifique `npm run typecheck` antes de commitar
- Nunca armazene segredos em código client-side ou em variáveis `NEXT_PUBLIC_`
- Use `loading.tsx` e `error.tsx` para estados de carregamento/erro em nível de rota
- Prefira Server Actions para mutações em vez de rotas de API quando possível
