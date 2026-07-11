---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/data/aiox-kb|aiox-kb]]"
---

# Padrões e Preferências Definidos pelo Usuário

## Tech Presets

O AIOX fornece presets de arquitetura pré-definidos para stacks de tecnologia comuns.
Local: `.aiox-core/data/tech-presets/`

### Presets Disponíveis

| Preset         | Tecnologias                                                     | Melhor Para                                              |
| -------------- | ---------------------------------------------------------------- | -------------------------------------------------------- |
| `nextjs-react` | Next.js 16+, React, TypeScript, Tailwind, Zustand, React Query  | Apps web fullstack, SaaS, E-commerce, Dashboards         |
| `go`           | Go 1.24+, Chi/Gin, pgx/sqlc, Testify, Testcontainers            | APIs, microsserviços, workers concorrentes               |
| `java`         | Java 21+, Spring Boot, Spring Data JPA, Flyway, JUnit           | Sistemas enterprise, domínios complexos, APIs críticas   |
| `rust`         | Rust 1.77+, Axum, Tokio, SQLx, thiserror                        | Serviços de alta confiabilidade e alta performance        |
| `csharp`       | C# 13, .NET 9, ASP.NET Core, EF Core, FluentValidation, xUnit   | Backends enterprise em stack Microsoft                    |
| `php`          | PHP 8.3+, Laravel 11, Eloquent, Pest/PHPUnit                    | Sistemas web e APIs de negócio em ecossistema Laravel    |

### Como Usar os Presets

1. **Durante a Criação de Arquitetura:**
   - Ao usar `@architect *create-doc architecture`, o template solicitará a seleção do preset
   - Carregue o arquivo do preset para obter padrões, standards e templates detalhados

2. **Durante o Desenvolvimento:**
   - Referencie o preset ao pedir ao `@dev` para implementar funcionalidades
   - Exemplo: "Follow the go preset patterns for this service"

3. **Criando Novos Presets:**
   - Copie `_template.md` e preencha os detalhes específicos da tecnologia
   - Adicione à tabela acima quando concluído

### Conteúdo do Preset

Cada preset inclui:

- **Design Patterns:** Padrões recomendados com exemplos
- **Estrutura do Projeto:** Organização de pastas
- **Tech Stack:** Bibliotecas e versões
- **Padrões de Código:** Convenções de nomenclatura, regras críticas
- **Estratégia de Testes:** O que testar, metas de cobertura
- **Templates de Arquivo:** Templates de código prontos para uso

## Preset Ativo

> **Atual:** `nextjs-react` (Next.js 16+, React, TypeScript, Tailwind, Zustand)

O preset ativo é carregado automaticamente quando o @dev é ativado. Para mudar:

```yaml
# .aiox-core/core-config.yaml
techPreset:
  active: nextjs-react # Change to another preset name
```

---

## Preferências do Usuário

> Adicione suas preferências pessoais/de equipe abaixo. Elas serão usadas pelos agentes durante o desenvolvimento.

### Tecnologias Preferidas

<!-- Descomente e preencha suas preferências
| Category | Preference | Notes |
|----------|------------|-------|
| Frontend Framework | Next.js | Using App Router |
| Styling | Tailwind CSS | With shadcn/ui |
| State Management | Zustand | For global state |
| Database | PostgreSQL | Via Supabase |
| ORM | Prisma | Type-safe queries |
-->

### Preferências de Estilo de Código

<!-- Descomente e preencha suas preferências
- Prefer functional components over class components
- Use named exports over default exports
- Prefer explicit error handling over try/catch wrapping
-->

### Regras Específicas do Projeto

<!-- Adicione quaisquer regras específicas do projeto que os agentes devem seguir -->

---

_Atualizado: 2026-02-19_
