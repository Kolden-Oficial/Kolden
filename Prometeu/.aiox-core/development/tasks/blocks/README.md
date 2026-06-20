# Sistema de Blocos de Task do AIOX

> **Version:** 1.0.0
> **Purpose:** Componentes atômicos e reutilizáveis para workflows de task

## Visão Geral

Blocos são unidades de funcionalidade pequenas e focadas que podem ser incluídas em múltiplas tasks. Seguem o princípio DRY (Don't Repeat Yourself) e fornecem comportamento consistente em todo o framework AIOX.

## Estrutura de Diretórios

```
.aiox-core/development/tasks/blocks/
├── README.md                  # Este arquivo
├── context-loading.md         # Carrega o contexto do projeto (git, gotchas, config)
├── execution-pattern.md       # Padrões de bloqueio de task + anti-padrões
├── agent-prompt-template.md   # Template padronizado de invocação de agente
├── execution-modes.md         # Modos padrão YOLO/Interactive/Pre-Flight (futuro)
├── pre-post-conditions.md     # Blocos padrão de validação (futuro)
└── error-handling.md          # Padrões comuns de erro (futuro)
```

## Como Incluir um Bloco

### Método 1: Comentário de Include em Markdown

Use comentários HTML com a diretiva Include:

```markdown
<!-- Include: blocks/context-loading.md -->
```

Com parâmetros:

```markdown
<!-- Include: blocks/context-loading.md -->
<!-- Parameters: category=frontend, include_git=false -->
```

### Método 2: Referência YAML

No frontmatter da task:

```yaml
---
blocks:
  - id: context-loading
    params:
      category: supabase
      include_gotchas: true
---
```

### Método 3: Programático (JavaScript)

```javascript
const { loadBlock, executeBlock } = require('.aiox-core/utils/block-loader');

// Carregar a definição do bloco
const block = await loadBlock('context-loading');

// Executar com parâmetros
const result = await executeBlock(block, {
  category: 'auth',
  include_git: true
});
```

## Anatomia de um Bloco

Cada arquivo de bloco segue esta estrutura:

```markdown
# Block: {Name}

> **Block ID:** `{kebab-case-id}`
> **Version:** {semver}
> **Type:** Reusable Include Block

## Purpose
{Descrição em uma linha}

## Input
{Tabela de parâmetros com tipos, padrões, descrições}

## Output
{Tabela de campos de saída com tipos e descrições}

## Execution Steps
{YAML ou pseudocódigo definindo os passos}

## Usage
{Exemplos de como incluir o bloco}

## Files Accessed
{Tabela de arquivos que o bloco lê/escreve}

## Error Handling
{Tabela de erros e comportamentos}

## Notes
{Contexto adicional}
```

## Convenções de Nomenclatura

| Convenção | Exemplo | Descrição |
|------------|---------|-------------|
| Block ID | `context-loading` | Kebab-case, descritivo |
| Nome de arquivo | `context-loading.md` | Igual ao Block ID com `.md` |
| Parâmetros | `include_git` | Snake_case para clareza |
| Saídas | `git.status` | Notação por ponto para aninhados |

## Princípios de Design

### 1. Responsabilidade Única
Cada bloco faz UMA coisa bem feita. Se um bloco precisar fazer várias coisas, divida-o.

### 2. Idempotente
Executar um bloco várias vezes produz o mesmo resultado (para operações de leitura).

### 3. Falhar de Forma Graciosa
Os blocos não devem interromper a execução da task por erros menores. Registre avisos e forneça padrões.

### 4. Menos de 50 Linhas
Mantenha os blocos concisos. Se um bloco exceder 50 linhas de conteúdo, considere dividi-lo.

### 5. Contrato Claro
Todo bloco deve definir:
- Parâmetros de entrada (com tipos e padrões)
- Campos de saída (com tipos)
- Arquivos acessados
- Comportamento em caso de erro

## Blocos Disponíveis

| Bloco | Propósito | Usado Por |
|-------|---------|---------|
| `context-loading` | Carrega o estado do git, gotchas, preferências, config | dev-develop-story, create-next-story, qa-review-story |
| `execution-pattern` | Padrões de bloqueio de task (sequential/parallel/mixed) + anti-padrões | enhance-workflow, execute-epic, deep-strategic-planning, refactor-workflow, clone-mind, mind-research, squad-creator, bob-orchestrator |
| `agent-prompt-template` | Template padronizado para instanciar agentes AIOX | Qualquer skill/task que invoque agentes via ferramenta Task |

## Linhas Economizadas (ROI)

Quando um bloco é adotado, ele substitui código duplicado entre tasks:

| Bloco | Linhas por task | Tasks que usam | Total de linhas economizadas |
|-------|----------------|-------------|-------------------|
| `context-loading` | ~15-20 | 8+ tasks | ~120-160 linhas |
| `execution-pattern` | ~35 | 8+ skills | ~280 linhas |
| `agent-prompt-template` | ~15-20 | 10+ skills | ~150-200 linhas |
| `execution-modes` | ~25-30 | TODAS as tasks | ~2500+ linhas |

## Criando um Novo Bloco

1. **Identifique a repetição**: Encontre um padrão que aparece em 2+ tasks
2. **Extraia o padrão**: Copie para `blocks/{name}.md`
3. **Parametrize**: Crie entradas configuráveis
4. **Documente**: Siga o template de anatomia de bloco
5. **Teste**: Verifique em pelo menos 2 tasks
6. **Atualize este README**: Adicione à tabela de Blocos Disponíveis

## Blocos Futuros (Candidatos)

Com base na análise de tasks, estes padrões aparecem com frequência:

| Padrão | Ocorrências | Bloco Candidato |
|---------|-------------|-----------------|
| Modos de Execução (YOLO/Interactive/Pre-Flight) | TODAS as tasks | `execution-modes.md` |
| Pré/Pós-Condições | TODAS as tasks | `validation-conditions.md` |
| Métricas de Performance | TODAS as tasks | `performance-metrics.md` |
| Estratégia de Tratamento de Erros | TODAS as tasks | `error-handling.md` |
| Dependências de Ferramentas | 80%+ das tasks | `tool-dependencies.md` |

---

*Sistema de Blocos de Task do AIOX v1.1.0*
*Blocos: context-loading, execution-pattern, agent-prompt-template (extraídos de padrões observados)*
