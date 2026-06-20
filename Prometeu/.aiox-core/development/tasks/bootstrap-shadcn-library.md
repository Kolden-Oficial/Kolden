# Bootstrap da Biblioteca de Componentes Shadcn/Radix

> Task ID: atlas-bootstrap-shadcn  
> Agente: Atlas (Design System Builder)  
> Versão: 1.0.0

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

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: bootstrapShadcnLibrary()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid task parameters

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memory
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: State management
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pre-condition failed: Task is registered; required parameters provided; dependencies met"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Registro de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar as tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer um template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado em log

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de Otimização:**
- Validar a configuração cedo; usar escritas atômicas; implementar checkpoints de rollback

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

Instala e cura uma biblioteca de componentes Shadcn UI aproveitando o Tailwind v4, os primitivos do Radix e os tokens de design do projeto. Estabelece utilitários compartilhados (`cn`, `cva`), padrões de Spinner/loading e o scaffold de documentação.

## Pré-requisitos

- Tailwind v4 configurado com tokens (`@theme` + dark mode)
- Projeto React/Next.js com TypeScript
- Node.js ≥ 18
- Storybook (opcional, mas recomendado)

## Workflow

1. **Inicializar o Shadcn CLI**
   ```bash
   npx shadcn@latest init
   ```
   - Configurar os caminhos (`components`, `lib/utils.ts`)
   - Habilitar os padrões de TypeScript + Tailwind + Radix

2. **Instalar os Utilitários Centrais**
   ```bash
   npx shadcn@latest add button input card textarea badge skeleton spinner
   ```
   - Garantir que o helper `cn` use `clsx` + `tailwind-merge`
   - Adicionar o componente `Spinner` para estados de loading (se não fornecido pelo template)

3. **Mapear para os Tokens**
   - Substituir cores hardcoded por classes de token semântico (`bg-primary`, etc.)
   - Alinhar espaçamento/tipografia com a escala do design system
   - Adicionar variantes de dark mode (`dark:bg-background`)

4. **Integração com o Radix**
   - Instalar os primitivos do Radix conforme necessário (`@radix-ui/react-slot`, etc.)
   - Verificar que os atributos de acessibilidade e o gerenciamento de foco permaneçam intactos

5. **Aprimoramentos de Variantes e Utilitários**
   - Estender as definições de `cva` para corresponder às variantes do projeto (density, destructive, ghost)
   - Adicionar um padrão de loading compartilhado (Spinner + prop `isLoading`)
   - Introduzir variantes compostas para botões de ícone, ações destrutivas

6. **Documentação e Storybook**
   - Criar docs em MDX ou markdown para cada componente (`docs/components`)
   - Opcional: Adicionar stories do Storybook usando stories auto-geradas a partir de `tasks/build-component`

7. **Atualizar o Estado**
   - Anexar ao `.state.yaml` (`tooling.shadcn`) os componentes instalados, com timestamp
   - Registrar quaisquer overrides locais ou ações de acompanhamento

## Entregáveis

- Diretório `components/ui/` populado com componentes Shadcn
- `lib/utils.ts` atualizado (`cn`, `formatNumber`, etc. se necessário)
- Documentação de componentes e stories do Storybook (opcional)
- Entradas de `.state.yaml` para `tooling.shadcn`

## Critérios de Sucesso

- [ ] Shadcn CLI inicializado com caminhos compatíveis com Tailwind v4
- [ ] Componentes centrais (button/input/card/etc.) instalados e tokenizados
- [ ] Helper `cn` + `class-variance-authority` configurados
- [ ] Padrão de Spinner/loading padronizado entre os componentes
- [ ] Documentação/Storybook atualizados com exemplos de uso
- [ ] `.state.yaml` reporta o timestamp do bootstrap e a lista de componentes

## Tratamento de Erros

- **Falha na instalação via CLI**: Excluir arquivos parciais, reexecutar `npx shadcn@latest init`
- **Incompatibilidade de import do Radix**: Alinhar versões com o lockfile, reinstalar os pacotes
- **Incompatibilidade de tokens**: Regenerar as classes do Tailwind ou adicionar os tokens semânticos ausentes
- **Falha no build do Storybook**: Atualizar o Storybook para a última versão (v8+) e reexecutar

## Notas

- Prefira exports nomeados (`export { Button }`) para tree-shaking
- Mantenha a paridade entre as variantes do Shadcn e os aliases de tokens de design
- Documente as atualizações manuais (o Shadcn é copiar/colar — sem atualizações automáticas)
- Agende auditorias regulares para puxar melhorias upstream de forma intencional
