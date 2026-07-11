---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/templates/claude-md-fullstack|claude-md-fullstack]]"
  - "[[Dedalo/templates/claude-md-library|claude-md-library]]"
  - "[[Dedalo/templates/claude-md-microservices|claude-md-microservices]]"
  - "[[Dedalo/templates/claude-md-mobile|claude-md-mobile]]"
---

# CLAUDE.md — Projeto Monorepo

## Visão Geral do Projeto

- **Nome:** [PROJECT_NAME]
- **Descrição:** [Descrição breve]
- **Tipo:** Monorepo
- **Gerenciador:** [Turborepo / Nx / Lerna / pnpm workspaces]
- **Status:** [Desenvolvimento / Homologação / Produção]

## Estrutura de Pacotes

```
packages/
  core/                   # Lógica de negócio e tipos compartilhados
  ui/                     # Biblioteca de componentes de UI compartilhada
  config/                 # Configuração compartilhada (ESLint, TypeScript, Tailwind)
  utils/                  # Funções utilitárias compartilhadas
apps/
  web/                    # Aplicação web principal (Next.js)
  api/                    # Serviço de API backend
  docs/                   # Site de documentação
  admin/                  # Painel administrativo
tooling/
  eslint-config/          # Configuração ESLint compartilhada
  tsconfig/               # Configuração TypeScript compartilhada
  jest-config/            # Configuração Jest compartilhada
```

## Stack Tecnológica

| Camada | Tecnologia | Notas |
|-------|-----------|-------|
| Build | Turborepo | Orquestração e cache de tarefas |
| Gerenciador de Pacotes | pnpm | Suporte a workspaces, hoisting estrito |
| Linguagem | TypeScript | tsconfig compartilhado em tooling/ |
| Linting | ESLint | Config compartilhada entre os pacotes |
| Testes | Jest | Config compartilhada, execução por pacote |

## Dependências Compartilhadas

### Pacotes Internos (workspace:*)
- `@[scope]/core` — Lógica de negócio, tipos, constantes
- `@[scope]/ui` — Componentes React, design tokens
- `@[scope]/utils` — Funções utilitárias (data, string, validação)
- `@[scope]/config` — Arquivos de configuração compartilhados

### Regras de Dependências
- **Dependências da raiz:** Apenas ferramentas de dev (turbo, prettier, husky)
- **Deps compartilhadas:** Declaradas no pacote que as possui
- **Alinhamento de versões:** Use `syncpack` ou `manypkg` para manter as versões consistentes
- **Peer dependencies:** Componentes de UI declaram React como peer dep
- Nunca instale a mesma dependência em versões diferentes entre os pacotes

## Convenções por Pacote

### apps/web (Next.js)
```bash
pnpm --filter web dev        # Servidor de dev
pnpm --filter web build      # Build de produção
pnpm --filter web test       # Testes
```
- Importa de `@[scope]/ui` e `@[scope]/core`
- Usa App Router, segue padrões fullstack

### apps/api (Express/Fastify)
```bash
pnpm --filter api dev        # Servidor de dev
pnpm --filter api build      # Compila TypeScript
pnpm --filter api test       # Testes
```
- Importa de `@[scope]/core` para tipos compartilhados
- Nunca importa de `@[scope]/ui`

### packages/ui (Biblioteca de Componentes)
```bash
pnpm --filter ui dev         # Storybook
pnpm --filter ui build       # Build para consumo
pnpm --filter ui test        # Testes de componentes
```
- Exporta via campo `exports` do package.json
- Usa `tsup` ou `unbuild` para compilação

### packages/core (Lógica de Negócio)
```bash
pnpm --filter core build     # Compila
pnpm --filter core test      # Testes unitários
```
- TypeScript puro, sem dependências de framework
- Exporta tipos, validadores, constantes

## Imports Entre Pacotes

```typescript
// Correto: use o nome do pacote do workspace
import { Button } from '@[scope]/ui';
import { formatDate } from '@[scope]/utils';
import type { User } from '@[scope]/core';

// Errado: nunca use caminhos relativos entre pacotes
import { Button } from '../../packages/ui/src/Button';
```

## Comandos de Build e Teste

```bash
# Comandos da raiz (executam em todos os pacotes)
pnpm build                   # Build de todos os pacotes (respeita a ordem de dependências)
pnpm test                    # Testa todos os pacotes
pnpm lint                    # Lint em todos os pacotes
pnpm typecheck               # Verifica os tipos de todos os pacotes
pnpm dev                     # Modo dev para todos os apps

# Pacote único
pnpm --filter [package] [command]

# Com dependências
pnpm --filter [package]... build   # Build do pacote e suas deps

# Específico do Turbo
turbo run build --filter=web       # Build do web e suas dependências
turbo run test --affected          # Testa apenas os pacotes afetados
```

## Convenções de Nomenclatura

- Nomes de pacotes: `@[scope]/package-name` (kebab-case)
- Imports internos: Sempre use o nome do pacote, nunca caminhos relativos
- Tipos compartilhados: Defina em `@[scope]/core/types/`
- Hooks compartilhados: Defina em `@[scope]/ui/hooks/` se for relacionado a UI, caso contrário `@[scope]/core/hooks/`

## Notas Importantes

- Sempre execute `pnpm install` a partir da raiz (nunca dentro de um pacote)
- Mudanças em pacotes compartilhados podem afetar múltiplos apps — teste de forma abrangente
- O Turbo faz cache dos builds; execute `turbo run build --force` para ignorar o cache
- Ao adicionar um novo pacote, atualize o `pnpm-workspace.yaml`
- O CI deve usar `turbo run test --affected` para builds mais rápidos
- Nunca coloque segredos em pacotes compartilhados; mantenha-os no `.env` em nível de app
