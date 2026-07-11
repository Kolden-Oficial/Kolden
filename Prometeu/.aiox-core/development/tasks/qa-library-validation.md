---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task de Validação de Bibliotecas

Valida o uso de bibliotecas de terceiros contra a documentação oficial usando o Context7.

**Absorvida de:** Auto-Claude PR Review Phase 6.0

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)

- Validação autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** integração de CI/CD, pipelines automatizados

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[DEFAULT]**

- Checkpoints de decisão explícitos
- Explicações educativas dos achados
- **Melhor para:** aprendizado, entender problemas de bibliotecas

### 3. Pre-Flight Planning - Planejamento Completo Antecipado

- Inventário completo das bibliotecas antes da validação
- Execução sem ambiguidade
- **Melhor para:** PRs grandes com muitas dependências

**Parâmetro:** `mode` (opcional, default: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: qaLibraryValidation()
responsavel: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: story_id
  tipo: string
  origem: Input do Usuário
  obrigatorio: true
  validacao: Deve estar em formato válido de story ID (ex.: "6.3")

- campo: file_paths
  tipo: array
  origem: git diff ou lista explícita
  obrigatorio: false
  validacao: Se vazio, extrai das mudanças não commitadas

- campo: skip_stdlib
  tipo: boolean
  origem: config
  obrigatorio: false
  validacao: Default true (pular stdlib de Node.js/Python)

**Saida:**
- campo: validation_report
  tipo: object
  destino: Valor de retorno
  persistido: false

- campo: issues_found
  tipo: number
  destino: Memória
  persistido: false

- campo: report_file
  tipo: file
  destino: docs/stories/{story-id}/qa/library_validation.json
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Context7 MCP está disponível
    tipo: pre-condition
    blocker: true
    validacao: |
      Teste: mcp__context7__resolve-library-id com uma query de teste
    error_message: "Pré-condição falhou: Context7 MCP indisponível."

  - [ ] Arquivos modificados existem (git diff ou explícito)
    tipo: pre-condition
    blocker: true
    validacao: |
      Ao menos um arquivo para analisar
    error_message: "Pré-condição falhou: Nenhum arquivo para validar."
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task concluir

**Checklist:**

```yaml
post-conditions:
  - [ ] Relatório de validação gerado
    tipo: post-condition
    blocker: true
    validacao: |
      library_validation.json existe com os resultados
    error_message: "Pós-condição falhou: Relatório de validação não gerado."

  - [ ] Todos os imports processados
    tipo: post-condition
    blocker: false
    validacao: |
      processed_count >= imports_found
    error_message: "Aviso: Alguns imports não foram processados."
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Cada biblioteca validada contra a documentação do Context7
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Para cada import: resolve-library-id + query-docs executados
    error_message: "Critério de aceite não atendido: Bibliotecas não validadas."

  - [ ] Uso da API verificado quanto à correção
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      Assinaturas de função, parâmetros e tipos de retorno verificados
    error_message: "Critério de aceite não atendido: Uso da API não verificado."

  - [ ] Métodos depreciados sinalizados
    tipo: acceptance-criterion
    blocker: true
    validacao: |
      APIs depreciadas identificadas e reportadas
    error_message: "Critério de aceite não atendido: Métodos depreciados não verificados."
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** Context7 MCP
  - **Propósito:** Resolver IDs de bibliotecas e consultar a documentação
  - **Origem:** mcp**context7**resolve-library-id, mcp**context7**query-docs

- **Ferramenta:** Grep
  - **Propósito:** Extrair imports de arquivos-fonte
  - **Origem:** Ferramenta nativa do Claude Code

- **Ferramenta:** Read
  - **Propósito:** Ler arquivos-fonte para análise
  - **Origem:** Ferramenta nativa do Claude Code

---

## Tratamento de Erros

**Estratégia:** continue-on-error (registrar e continuar)

**Erros Comuns:**

1. **Erro:** Biblioteca Não Encontrada no Context7
   - **Causa:** Biblioteca incomum ou privada
   - **Resolução:** Registrar como "unvalidated", continuar
   - **Recuperação:** Revisão manual recomendada

2. **Erro:** Rate Limit do Context7
   - **Causa:** Requisições em excesso
   - **Resolução:** Agrupar requisições, adicionar atraso
   - **Recuperação:** Retentar com backoff exponencial

3. **Erro:** Falha no Parse de Import
   - **Causa:** Sintaxe de import complexa
   - **Resolução:** Registrar e pular
   - **Recuperação:** Inspeção manual

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (depends on import count)
cost_estimated: $0.01-0.05 (Context7 queries)
token_usage: ~2,000-5,000 tokens
```

**Notas de Otimização:**

- Agrupar bibliotecas similares
- Cachear respostas do Context7
- Pular stdlib e imports internos

---

## Metadados

```yaml
story: AUTO-CLAUDE-ABSORPTION
version: 1.0.0
source: Auto-Claude PR Review Phase 6.0
dependencies:
  - context7
tags:
  - quality-assurance
  - library-validation
  - context7
  - pr-review
updated_at: 2026-01-29
```

---

## Comando

```
*validate-libraries {story-id} [--files file1,file2] [--include-stdlib]
```

**Parâmetros:**

- `story-id` (obrigatório): Identificador da story (ex.: "6.3")
- `--files` (opcional): Caminhos de arquivos separados por vírgula (default: git diff)
- `--include-stdlib` (opcional): Incluir a validação da biblioteca padrão

**Exemplos:**

```bash
*validate-libraries 6.3
*validate-libraries 6.3 --files src/api/auth.ts,src/utils/date.ts
```

---

## Workflow

### Fase 1: Extrair Imports

1. Obter a lista de arquivos modificados:

   ```bash
   git diff --name-only HEAD~1
   # Ou usar a lista --files fornecida
   ```

2. Para cada arquivo, extrair imports usando padrões regex:

   ```javascript
   // JavaScript/TypeScript
   /import\s+(?:{[^}]+}|\*\s+as\s+\w+|\w+)\s+from\s+['"]([^'"]+)['"]/g
   /require\(['"]([^'"]+)['"]\)/g

   // Python
   /^import\s+(\S+)/gm
   /^from\s+(\S+)\s+import/gm
   ```

3. Filtrar:
   - Imports relativos (`./`, `../`)
   - Biblioteca padrão (se `--include-stdlib` não estiver setado)
   - Já validados nesta sessão

### Fase 2: Resolver IDs de Bibliotecas

Para cada biblioteca única:

1. Chamar o Context7 para resolver o ID da biblioteca:

   ```
   mcp__context7__resolve-library-id
   - libraryName: "react-query"
   - query: "How to use useQuery hook"
   ```

2. Armazenar o mapeamento:

   ```json
   {
     "react-query": "/tanstack/react-query",
     "prisma": "/prisma/prisma",
     "zod": "/colinhacks/zod"
   }
   ```

3. Registrar bibliotecas não resolvidas para revisão manual

### Fase 3: Validar o Uso da API

Para cada uso de import no código:

1. Consultar o Context7 pela documentação:

   ```
   mcp__context7__query-docs
   - libraryId: "/tanstack/react-query"
   - query: "useQuery function signature and parameters"
   ```

2. Validar contra o uso real:
   - **Assinaturas:** Os parâmetros da função batem com a documentação
   - **Tipos:** Tipos de retorno tratados corretamente
   - **Depreciados:** Verificar avisos de API depreciada
   - **Breaking Changes:** Verificar mudanças específicas de versão

3. Sinalizar problemas:
   ```json
   {
     "library": "react-query",
     "file": "src/hooks/useUser.ts",
     "line": 15,
     "issue": "DEPRECATED_API",
     "details": "useQuery options 'cacheTime' is deprecated, use 'gcTime'",
     "severity": "MAJOR",
     "fix": "Replace 'cacheTime' with 'gcTime'"
   }
   ```

### Fase 4: Gerar o Relatório

1. Criar o relatório de validação:

   ```json
   {
     "timestamp": "2026-01-29T10:00:00Z",
     "story_id": "6.3",
     "summary": {
       "libraries_checked": 12,
       "issues_found": 3,
       "unresolved": 1,
       "passed": 8
     },
     "issues": [...],
     "unresolved_libraries": ["internal-utils"],
     "recommendations": [...]
   }
   ```

2. Salvar em `docs/stories/{story-id}/qa/library_validation.json`

3. Retornar o resumo para integração com a revisão de QA

---

## Checklist de Validação

Para cada biblioteca, validar:

```yaml
validation_checklist:
  signatures:
    - [ ] Parâmetros da função batem com a documentação
    - [ ] Parâmetros opcionais vs obrigatórios corretos
    - [ ] Valores default compreendidos

  types:
    - [ ] Tipos de retorno tratados corretamente
    - [ ] Parâmetros de tipo genérico corretos
    - [ ] Tratamento de null/undefined

  lifecycle:
    - [ ] Inicialização/setup corretos
    - [ ] Cleanup/disposal tratados
    - [ ] Padrões assíncronos corretos

  deprecation:
    - [ ] Nenhuma API depreciada usada
    - [ ] Caminho de migração disponível se depreciada

  version:
    - [ ] API corresponde à versão instalada
    - [ ] Breaking changes tratadas
```

---

## Mapeamento de Severidade de Problemas

| Tipo de Problema                       | Severidade | Ação       |
| -------------------------------------- | -------- | ---------- |
| Assinatura de API incorreta            | CRITICAL | Deve corrigir |
| API depreciada (removida no próximo major) | CRITICAL | Deve corrigir |
| API depreciada (ainda funciona)        | MAJOR    | Deveria corrigir |
| Padrão subótimo                        | MINOR    | Opcional   |
| Tratamento de erro ausente             | MAJOR    | Deveria corrigir |
| Incompatibilidade de tipo              | CRITICAL | Deve corrigir |
| Incompatibilidade de versão            | CRITICAL | Deve corrigir |

---

## Integração com a Revisão de QA

Esta task se integra ao pipeline de revisão de QA:

```
*review-build {story}
├── Fase 1-5: Verificações padrão
├── Fase 6.0: Validação de Bibliotecas ← ESTA TASK
├── Fase 6.1: Checklist de Segurança
├── Fase 6.2: Validação de Migrations
└── Fase 7-10: Continuar a revisão
```

**Gatilho:** Chamada automaticamente durante o `*review-build`
**Manual:** Pode ser executada isoladamente via `*validate-libraries`

---

## Exemplo de Saída

```json
{
  "timestamp": "2026-01-29T10:30:00Z",
  "story_id": "6.3",
  "summary": {
    "libraries_checked": 5,
    "issues_found": 2,
    "unresolved": 0,
    "passed": 3
  },
  "issues": [
    {
      "id": "LIB-001",
      "library": "@tanstack/react-query",
      "file": "src/hooks/useUser.ts",
      "line": 15,
      "issue": "DEPRECATED_API",
      "severity": "MAJOR",
      "details": "Option 'cacheTime' is deprecated since v5, use 'gcTime'",
      "current_code": "useQuery({ cacheTime: 5000 })",
      "suggested_fix": "useQuery({ gcTime: 5000 })",
      "docs_link": "https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5"
    },
    {
      "id": "LIB-002",
      "library": "zod",
      "file": "src/schemas/user.ts",
      "line": 8,
      "issue": "INCORRECT_SIGNATURE",
      "severity": "CRITICAL",
      "details": "z.string().email() does not accept options object",
      "current_code": "z.string().email({ message: 'Invalid' })",
      "suggested_fix": "z.string().email('Invalid')",
      "docs_link": "https://zod.dev/?id=strings"
    }
  ],
  "passed": [
    { "library": "react", "status": "PASS" },
    { "library": "next", "status": "PASS" },
    { "library": "prisma", "status": "PASS" }
  ]
}
```

---

## Critérios de Saída

Esta task está completa quando:

- Todos os imports foram extraídos dos arquivos modificados
- Cada biblioteca foi resolvida via Context7 (ou marcada como não resolvida)
- O uso da API foi validado contra a documentação
- Métodos depreciados foram sinalizados
- O relatório foi gerado e salvo
- Os problemas foram integrados à revisão de QA

---

_Absorvida do Auto-Claude PR Review System - Phase 6.0_
_AIOX QA Enhancement v1.0_
