# Gerar Documentação da Pattern Library

> Task ID: atlas-generate-documentation
> Agent: Atlas (Design System Builder)
> Version: 1.0.0

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: generateDocumentation()
responsável: Morgan (Strategist)
responsavel_type: Agente
atomic_layer: Template

**Entrada:**
- campo: name
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be non-empty, lowercase, kebab-case

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid JSON object with allowed keys

- campo: force
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: false

**Saída:**
- campo: created_file
  tipo: string
  destino: File system
  persistido: true

- campo: validation_report
  tipo: object
  destino: Memory
  persistido: false

- campo: success
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target does not already exist; required inputs provided; permissions granted
    tipo: pre-condition
    blocker: true
    validação: |
      Check target does not already exist; required inputs provided; permissions granted
    error_message: "Pre-condition failed: Target does not already exist; required inputs provided; permissions granted"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Resource created successfully; validation passed; no errors logged
    tipo: post-condition
    blocker: true
    validação: |
      Verify resource created successfully; validation passed; no errors logged
    error_message: "Post-condition failed: Resource created successfully; validation passed; no errors logged"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Resource exists and is valid; no duplicate resources created
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert resource exists and is valid; no duplicate resources created
    error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Tool:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Tool:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componentes
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso de destino já existe no sistema
   - **Resolução:** Use a flag force ou escolha um nome diferente
   - **Recuperação:** Solicite ao usuário um nome alternativo ou force a sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Valide a entrada contra as regras de nomenclatura (kebab-case, minúsculas, sem caracteres especiais)
   - **Recuperação:** Sanitize a entrada ou rejeite com uma mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verifique as permissões do sistema de arquivos, execute com privilégios elevados se necessário
   - **Recuperação:** Registre o erro, notifique o usuário, sugira a correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 3-8 min (estimated)
cost_estimated: $0.002-0.005
token_usage: ~1,500-5,000 tokens
```

**Notas de Otimização:**
- Cache da compilação de templates; minimize transformações de dados; carregue recursos sob demanda

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Descrição

Gera documentação abrangente da pattern library a partir dos componentes construídos. Cria docs pesquisáveis e navegáveis com exemplos de uso, tabelas de props, notas de acessibilidade e pré-visualizações ao vivo.

## Pré-requisitos

- Pelo menos 1 componente construído
- A configuração do design system está completa
- Os arquivos .md dos componentes existem

## Workflow

### Passos

1. **Escanear Componentes Construídos** - Encontrar todos os atoms, molecules, organisms
2. **Analisar Metadados dos Componentes** - Extrair props, types, variantes
3. **Gerar Índice da Pattern Library** - Página principal de navegação
4. **Gerar Páginas de Componentes** - Páginas detalhadas por componente
5. **Gerar Exemplos de Uso** - Trechos de código e pré-visualizações ao vivo
6. **Gerar Guia de Acessibilidade** - Notas de conformidade com WCAG
7. **Gerar Referência de Tokens** - Documentação de uso de tokens
8. **Criar Índice de Busca** - Biblioteca de componentes pesquisável

## Saída

- **index.md**: Página inicial da pattern library
- **components/{Component}.md**: Páginas por componente
- **tokens.md**: Guia de referência de tokens
- **accessibility.md**: Diretrizes de acessibilidade
- **getting-started.md**: Guia de configuração e uso

## Critérios de Sucesso

- [ ] Todos os componentes documentados
- [ ] Props documentadas com types
- [ ] Exemplos de uso para cada variante
- [ ] Notas de acessibilidade incluídas
- [ ] Pesquisável e navegável
- [ ] Atualizado com os componentes mais recentes

## Exemplo

```bash
*document
```

Saída:
```
📚 Atlas: Gerando documentação da pattern library...

Escaneando componentes:
  ✓ 8 atoms encontrados
  ✓ 5 molecules encontrados
  ✓ 2 organisms encontrados

Gerando documentação:
  ✓ index.md (home da pattern library)
  ✓ components/Button.md
  ✓ components/Input.md
  ✓ components/FormField.md
  ...
  ✓ tokens.md (referência de tokens)
  ✓ accessibility.md (guia WCAG)
  ✓ getting-started.md

✅ Pattern library: design-system/docs/

Atlas diz: "Documentação é código. Mantenha-a atualizada."
```

## Notas

- Auto-gera a partir dos tipos TypeScript
- Atualiza quando os componentes mudam
- Inclui links ao vivo do Storybook (se habilitado)
- Pesquisável por nome de componente, prop ou token
