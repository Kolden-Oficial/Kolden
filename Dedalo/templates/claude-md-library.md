---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/templates/claude-md-fullstack|claude-md-fullstack]]"
  - "[[Dedalo/templates/claude-md-microservices|claude-md-microservices]]"
  - "[[Dedalo/templates/claude-md-mobile|claude-md-mobile]]"
  - "[[Dedalo/templates/claude-md-monorepo|claude-md-monorepo]]"
---

# CLAUDE.md — Projeto de Biblioteca / Pacote

## Visão Geral do Projeto

- **Nome:** [PACKAGE_NAME]
- **Descrição:** [O que esta biblioteca faz]
- **Tipo:** Biblioteca reutilizável / pacote npm
- **Registry:** npm (público / privado)
- **Status:** [Alpha / Beta / Estável]
- **Versão Atual:** [X.Y.Z]

## Stack Tecnológica

| Camada | Tecnologia | Notas |
|-------|-----------|-------|
| Linguagem | TypeScript | Modo estrito habilitado |
| Bundler | tsup / Rollup / Vite | Saída dupla ESM + CJS |
| Testes | Vitest / Jest | Unitários + integração |
| Linting | ESLint + Prettier | Regras estritas para código de biblioteca |
| Docs | TypeDoc / TSDoc | Documentação de API auto-gerada |

## Superfície da API

### Exports Públicos (src/index.ts)

Toda a API pública é exportada a partir do ponto de entrada do pacote. Cada export faz parte do
contrato público e está sujeito às garantias de semver.

```typescript
// src/index.ts — a única fonte de verdade para a API pública
export { createClient } from './client';
export { validate } from './validators';
export type { ClientOptions, ValidationResult } from './types';
```

### Interno vs Público

| Diretório | Visibilidade | Contrato Semver |
|-----------|-----------|----------------|
| `src/index.ts` | PÚBLICO | Mudanças que quebram = bump major |
| `src/` (não exportado) | INTERNO | Pode mudar livremente |
| `src/internal/` | INTERNO | Nunca importe de fora |
| `src/__tests__/` | INTERNO | Utilitários de teste, não distribuídos |

### Regras
- Nunca exporte diretamente de subdiretórios; sempre re-exporte através de `src/index.ts`
- Prefixe utilitários internos com `_` ou coloque-os em `src/internal/`
- Toda função pública deve ter comentários TSDoc com blocos `@example`
- Todo tipo público deve ser explicitamente exportado (sem exports implícitos via inferência)

## Compatibilidade Retroativa

### Regras de Semver
- **MAJOR (X.0.0):** Remover exports, mudar assinaturas de funções, renomear tipos
- **MINOR (0.X.0):** Adicionar novos exports, adicionar parâmetros opcionais, novas funcionalidades
- **PATCH (0.0.X):** Correções de bugs, melhorias de performance, documentação

### Checklist de Mudanças que Quebram
Antes de qualquer bump de versão major:
- [ ] Documentar todas as mudanças que quebram no CHANGELOG.md
- [ ] Fornecer guia de migração
- [ ] Atualizar todos os exemplos e a documentação
- [ ] Considerar período de descontinuação (marcar como deprecated no minor, remover no próximo major)

### Padrão de Descontinuação
```typescript
/**
 * @deprecated Use `createClientV2()` instead. Will be removed in v3.0.0.
 */
export function createClient(options: OldOptions): Client {
  console.warn('createClient is deprecated. Use createClientV2 instead.');
  return createClientV2(migrateOptions(options));
}
```

## Versionamento

- Siga o [Versionamento Semântico 2.0.0](https://semver.org/)
- Use `npm version patch|minor|major` para fazer o bump
- Marque os releases com tags: `git tag v1.2.3`
- Mantenha o CHANGELOG.md no formato [Keep a Changelog](https://keepachangelog.com/)

## Estratégia de Testes

### Categorias de Teste
- **Testes unitários:** Toda função pública, casos extremos, condições de erro
- **Testes de integração:** Interações entre módulos, padrões de uso do mundo real
- **Testes de tipos:** Verificar tipos TypeScript com `tsd` ou `expect-type`
- **Testes de snapshot:** Para saídas serializáveis (opcional)

### Requisitos de Cobertura
- API pública: 100% de cobertura de branches
- Utilitários internos: 80% de cobertura no mínimo
- Inferência de tipos: Testada com asserções `expectTypeOf`

### Comandos
```bash
npm test                  # Executa todos os testes
npm test -- --coverage    # Com relatório de cobertura
npm test -- --watch       # Modo watch durante o desenvolvimento
npm run test:types        # Testes em nível de tipo
```

## Requisitos de Documentação

### TSDoc em Todo Export Público
```typescript
/**
 * Creates a new client instance with the given options.
 *
 * @param options - Configuration options for the client
 * @returns A configured client instance
 * @throws {ValidationError} If options are invalid
 *
 * @example
 * ```typescript
 * const client = createClient({ apiKey: 'xxx', timeout: 5000 });
 * const result = await client.query('hello');
 * ```
 */
export function createClient(options: ClientOptions): Client {
  // ...
}
```

### Seções do README
- Instruções de instalação
- Exemplo de início rápido
- Referência da API (link para a documentação gerada)
- Tabela de opções de configuração
- Guia de tratamento de erros
- Guias de migração (para versões major)

## Comandos de Build

```bash
npm run build             # Build para distribuição (ESM + CJS)
npm run dev               # Modo watch para desenvolvimento
npm run lint              # Lint do código-fonte
npm run lint:fix          # Correção automática de problemas de lint
npm run typecheck         # Verificação de tipos do TypeScript
npm run docs              # Gera a documentação da API
npm run prepublishOnly    # Verificações pré-publicação (lint + test + build)
```

## Campos do Package.json

```jsonc
{
  "name": "@scope/package-name",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist", "README.md", "CHANGELOG.md"],
  "sideEffects": false
}
```

## Notas Importantes

- Sempre execute a suíte completa de testes antes de publicar
- Nunca publique com `--force` ou `--no-git-checks`
- Mantenha o campo `files` do package.json mínimo (distribua apenas dist/)
- Teste o pacote localmente com `npm link` antes de publicar
- Peer dependencies devem usar faixas amplas de versão (`>=17.0.0`)
- O tamanho do bundle importa: use o `bundlephobia` para verificar antes do release
