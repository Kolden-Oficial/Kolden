---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/blocks/README|README]]"
---

# Bloco: Carregamento de Contexto

> **Block ID:** `context-loading`
> **Version:** 1.0.0
> **Type:** Reusable Include Block

## Propósito

Carregar o contexto do projeto AIOX antes da execução da task. Fornece o estado do git, gotchas filtrados por categoria, preferências técnicas e a configuração central.

## Entrada

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|----------|---------|-------------|
| `category` | string | Não | `null` | Filtra gotchas por categoria (ex.: `supabase`, `frontend`, `auth`) |
| `include_git` | boolean | Não | `true` | Inclui o status do git e os commits recentes |
| `include_gotchas` | boolean | Não | `true` | Carrega gotchas da memória |
| `include_preferences` | boolean | Não | `true` | Carrega preferências técnicas |

## Saída

| Campo | Tipo | Descrição |
|-------|------|-------------|
| `git.status` | string | Saída de `git status --short` |
| `git.recentCommits` | string[] | Últimos 5 commits (formato oneline) |
| `gotchas` | Gotcha[] | Gotchas filtrados relevantes para a task atual |
| `preferences` | object | Preferências técnicas do arquivo de dados |
| `config` | object | Chaves de configuração central |

## Passos de Execução

```yaml
steps:
  - name: Carregar Contexto do Git
    condition: include_git == true
    actions:
      - run: git status --short
      - run: git log --oneline -5
    output: git.status, git.recentCommits

  - name: Carregar Gotchas
    condition: include_gotchas == true
    actions:
      - read: .aiox/gotchas.json
      - filter: por categoria, se fornecida
    output: gotchas

  - name: Carregar Preferências Técnicas
    condition: include_preferences == true
    actions:
      - read: .aiox-core/data/technical-preferences.md
    output: preferences

  - name: Carregar Configuração Central
    actions:
      - read: .aiox-core/core-config.yaml
      - extract: devLoadAlwaysFiles, project.*, deployment.*
    output: config
```

## Uso

### Incluir em Arquivo de Task

```markdown
<!-- Include: blocks/context-loading.md -->
<!-- Parameters: category=supabase -->
```

### Uso Programático

```javascript
const { loadContext } = require('.aiox-core/utils/context-loader');

const context = await loadContext({
  category: 'supabase',
  include_git: true,
  include_gotchas: true,
  include_preferences: true
});

// Access loaded context
console.log(context.git.status);
console.log(context.gotchas);
console.log(context.config.devLoadAlwaysFiles);
```

## Arquivos Acessados

| Arquivo | Propósito |
|------|---------|
| `.aiox/gotchas.json` | Problemas conhecidos e soluções de contorno |
| `.aiox-core/data/technical-preferences.md` | Padrões definidos pelo usuário |
| `.aiox-core/core-config.yaml` | Configuração do projeto |

## Tratamento de Erros

| Erro | Comportamento |
|-------|----------|
| Arquivo não encontrado | Registra aviso, continua com valor vazio |
| Erro de parsing | Registra erro, usa o padrão vazio |
| Git indisponível | Pula o contexto do git, registra info |

## Notas

- O bloco executa em menos de 2 segundos para projetos típicos
- Os gotchas são cacheados por sessão para evitar leituras repetidas
- Os comandos git são não-bloqueantes e falham de forma graciosa
