---
task: Validate Tech Preset
responsável: @architect
responsável_type: agent
atomic_layer: task
Entrada: |
  - preset_path: Caminho para o arquivo de tech preset (padrão: .aiox-core/data/tech-presets/)
  - name: Nome do preset sem extensão (ex.: "nextjs-react")
  - strict: Se true, warnings viram erros (padrão: false)
  - fix: Se true, cria story para correções (padrão: false)
Saída: |
  - validation_result: Objeto com { valid, errors, warnings, suggestions }
  - report: Relatório formatado para exibição
  - story_path: Caminho para a story criada (se --fix e erros encontrados)
Checklist:
  - [ ] Resolver o caminho do preset
  - [ ] Parsear e validar o bloco YAML de metadata
  - [ ] Validar as seções obrigatórias
  - [ ] Verificar a qualidade do conteúdo
  - [ ] Formatar o resultado para saída
  - [ ] Criar story de correção se solicitado
---

# \*validate-tech-preset

Valida um arquivo de tech preset contra a estrutura e os campos de metadata obrigatórios.

## Uso

```
@architect
*validate-tech-preset nextjs-react
*validate-tech-preset nextjs-react --strict
*validate-tech-preset nextjs-react --fix
*validate-tech-preset --all
```

## Parâmetros

| Parâmetro     | Tipo   | Padrão  | Descrição                               |
| ------------- | ------ | ------- | --------------------------------------- |
| `preset_path` | string | -       | Caminho completo para o arquivo do preset |
| `name`        | string | -       | Nome do preset (resolve para tech-presets/) |
| `--strict`    | flag   | false   | Tratar warnings como erros              |
| `--fix`       | flag   | false   | Criar story para corrigir problemas encontrados |
| `--all`       | flag   | false   | Validar todos os presets no diretório   |

## Verificações de Validação

### 1. Validação de Metadata

Verifica o bloco YAML de metadata em busca dos campos obrigatórios:

```yaml
preset:
  id: string          # Required - kebab-case identifier
  name: string        # Required - display name
  version: string     # Required - semver format (X.Y.Z)
  description: string # Required - when to use
  technologies: []    # Required - list of technologies
  suitable_for: []    # Required - project types
  not_suitable_for: []# Warning if missing
```

### 2. Validação das Seções Obrigatórias

| Seção                  | Obrigatória | Descrição                       |
| ---------------------- | ----------- | ------------------------------- |
| Design Patterns        | Sim         | Deve ter ao menos 1 padrão      |
| Project Structure      | Sim         | Deve ter estrutura de pastas    |
| Tech Stack             | Sim         | Deve ter tabela de tecnologias  |
| Coding Standards       | Sim         | Deve ter convenções de nomenclatura |
| Testing Strategy       | Sim         | Deve ter abordagem de testes    |
| File Templates         | Não         | Warning se ausente              |
| Error Handling         | Não         | Warning se ausente              |
| Performance Guidelines | Não         | Warning se ausente              |

### 3. Verificações de Qualidade do Conteúdo

- **Design Patterns**: Deve ter Purpose, Scores, Code Example
- **Tech Stack**: A tabela deve ter Category, Technology, Version, Purpose
- **Coding Standards**: Deve ter exemplos Good/Bad

## Fluxo

````
1. Resolve preset path
   ├── If full path provided → use directly
   ├── If name provided → resolve via .aiox-core/data/tech-presets/{name}.md
   └── If --all → scan all .md files except _template.md

2. Parse preset file
   ├── Extract YAML metadata block (between ```yaml and ```)
   ├── Parse markdown sections (## headers)
   └── Build validation context

3. Execute validations
   ├── validateMetadata() → Required fields check
   ├── validateSections() → Required sections check
   └── validateContent() → Content quality check

4. Format and display result
   ├── Show errors (if any)
   ├── Show warnings (if any)
   └── Show final result (VALID/INVALID)

5. If --fix and errors found
   ├── Prompt user to confirm story creation
   ├── Generate story with fix tasks
   └── Save to docs/stories/
````

## Exemplo de Saída

```
Validating tech preset: nextjs-react.md

Metadata:
  ✓ id: nextjs-react
  ✓ name: Next.js + React Preset
  ✓ version: 1.0.0
  ✓ technologies: [next, react, typescript]
  ✓ suitable_for: defined
  ⚠ not_suitable_for: missing

Sections:
  ✓ Design Patterns (3 patterns)
  ✓ Project Structure
  ✓ Tech Stack
  ✓ Coding Standards
  ✓ Testing Strategy
  ⚠ Error Handling: missing
  ⚠ Performance Guidelines: missing

Errors: 0
Warnings: 3

Result: VALID (with warnings)
```

## Códigos de Erro

| Código                 | Severidade | Descrição                              |
| ---------------------- | ---------- | -------------------------------------- |
| `PRESET_NOT_FOUND`     | Error      | Arquivo do preset não encontrado       |
| `METADATA_MISSING`     | Error      | Nenhum bloco YAML de metadata encontrado |
| `METADATA_PARSE_ERROR` | Error      | Erro de parsing do YAML                |
| `FIELD_MISSING`        | Error      | Campo obrigatório de metadata ausente  |
| `FIELD_INVALID`        | Error      | Valor de campo inválido (ex.: semver malformado) |
| `SECTION_MISSING`      | Error      | Seção obrigatória não encontrada       |
| `PATTERN_INCOMPLETE`   | Error      | Design pattern sem campos obrigatórios |
| `NOT_SUITABLE_MISSING` | Warning    | not_suitable_for não definido          |
| `SECTION_RECOMMENDED`  | Warning    | Seção recomendada ausente              |
| `EXAMPLE_MISSING`      | Warning    | Exemplo Good/Bad ausente               |

## Geração da Story de Correção

Quando `--fix` é usado e problemas são encontrados:

```markdown
# Story: Fix Tech Preset - {name}

## Status: Draft

## Objective

Fix validation issues in tech preset {name}.md

## Acceptance Criteria

{generated from errors/warnings}

## Tasks

- [ ] {task per error}

## Related

- Preset: .aiox-core/data/tech-presets/{name}.md
```

## Relacionados

- **Agente:** @architect (Aria)
- **Localização:** .aiox-core/data/tech-presets/
- **Similar:** validate-squad (referência de padrão de validação)
