---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Construir Componente Pronto para Produção

> Task ID: atlas-build-component
> Agente: Atlas (Design System Builder)
> Version: 1.0.0

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise de tarefas (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (Formato de Task AIOX V1.0)

```yaml
task: buildComponent()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Molecule

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

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

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

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

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

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

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

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componentes
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso alvo já existe no sistema
   - **Resolução:** Use a flag force ou escolha um nome diferente
   - **Recuperação:** Solicitar ao usuário um nome alternativo ou forçar a sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Validar a entrada conforme as regras de nomenclatura (kebab-case, minúsculas, sem caracteres especiais)
   - **Recuperação:** Sanitizar a entrada ou rejeitar com mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verificar as permissões do sistema de arquivos, executar com privilégios elevados se necessário
   - **Recuperação:** Registrar o erro, notificar o usuário, sugerir correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelize operações independentes; reutilize resultados de átomos; implemente saídas antecipadas

---

## Metadados

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

Gera um componente React TypeScript pronto para produção a partir de design tokens. A saída segue os padrões de utilitários Tailwind no estilo Shadcn com variantes `cva`, composição Radix opcional, testes, stories de Storybook e documentação. Toda a estilização usa tokens/variáveis (zero valores hardcoded) e suporta estados de loading/acessibilidade prontos de fábrica.

## Pré-requisitos

- Setup concluído (comando *setup executado com sucesso)
- Tokens carregados e acessíveis
- React e TypeScript configurados

## Workflow

### Elicitação Interativa

Esta task usa elicitação interativa para configurar o componente.

1. **Selecionar o Tipo de Componente**
   - Nível atômico (atom, molecule, organism)
   - Nome do componente (Button, Input, Card, etc)
   - Confirmar a disponibilidade de tokens para este componente

2. **Configurar as Funcionalidades do Componente**
   - Variantes necessárias (primary, secondary, destructive)
   - Tamanhos necessários (sm, md, lg)
   - Estados necessários (hover, disabled, loading, error)
   - Props adicionais

3. **Revisar o Plano de Geração**
   - Mostrar os arquivos a serem gerados
   - Confirmar os requisitos de cobertura de testes
   - Perguntar sobre stories de Storybook (se habilitado)

### Passos

1. **Validar Pré-requisitos**
   - Verificar se os tokens estão carregados
   - Verificar se o componente ainda não existe (ou confirmar a sobrescrita)
   - Validar o nome do componente (PascalCase)
   - Validação: Pronto para gerar

2. **Carregar Referências de Tokens**
   - Identificar quais tokens este componente precisa
   - Validar a disponibilidade dos tokens
   - Gerar as declarações de import de tokens
   - Validação: Todos os tokens necessários existem

3. **Gerar o Arquivo do Componente**
   - Criar o componente React usando `React.forwardRef` + `Slot` (padrão Radix)
   - Importar os helpers `cva` + `cn` (`class-variance-authority`, `tailwind-merge`)
   - Implementar variantes, tamanhos, densidade e estados de loading
   - Conectar atributos ARIA, tratamento de teclado, paridade de dark mode
   - Validação: TypeScript válido (strict), lint limpo, sem valores CSS hardcoded

4. **Criar o Catálogo de Variantes**
   - Definir a configuração `cva` (classes base, variantes, variantes compostas, padrões)
   - Mapear as classes de variante para tokens (utilitários Tailwind referenciando design tokens)
   - Gerar tipos auxiliares amigáveis para stories (VariantProps)
   - Validação: As variantes se alinham com os tokens consolidados e o nível atômico

5. **Gerar Testes Unitários**
   - Criar o arquivo de teste ({Component}.test.tsx) com RTL + jest-axe
   - Snapshot do render padrão, permutações de variantes, classes responsivas
   - Testar interações de estado loading/disabled e handlers de eventos
   - Mirar em >85% de cobertura, incluindo asserções de acessibilidade
   - Validação: Os testes passam localmente (npm test) com cobertura aferida

6. **Gerar Stories de Storybook (Opcional)**
   - Se o Storybook estiver habilitado, criar {Component}.stories.tsx (sintaxe do Storybook 8)
   - Fornecer stories CSF para cada variante/tamanho e estado de loading
   - Configurar controls, play functions, addon de a11y
   - Validação: `npm run storybook` renderiza sem avisos

7. **Executar Verificações de Acessibilidade**
   - Validar atributos ARIA + fluxos de teclado (Tab/Shift+Tab/Space/Enter)
   - Verificar contraste WCAG 2.2 AA + APCA, incluindo tokens de dark mode
   - Garantir que estilos focus-visible estejam presentes e tematizáveis
   - Validação: jest-axe passa, travessia manual por teclado verificada

8. **Gerar a Documentação do Componente**
   - Criar {Component}.md em docs/ com visão geral + tabelas de variantes
   - Documentar props, tipos TypeScript, variantes padrão, notas de composição
   - Incluir uso para temas light/dark, estado de loading, orientação de acessibilidade
   - Validação: A documentação se alinha com o código gerado e os tokens

9. **Atualizar o Índice de Componentes**
   - Adicionar ao design-system/index.ts
   - Exportar o componente para import fácil
   - Atualizar os barrel exports
   - Validação: Componente importável

10. **Atualizar o Arquivo de Estado**
    - Adicionar o componente a patterns_built no .state.yaml
    - Registrar o nível atômico, variantes, cobertura de testes
    - Incrementar a contagem de componentes
    - Validação: Rastreamento de estado atualizado

## Saída

- **{Component}.tsx**: Componente React TypeScript (forwardRef + cva)
- **{Component}.test.tsx**: Testes unitários + de acessibilidade
- **{Component}.stories.tsx**: Stories de Storybook (opcional)
- **{Component}.md**: Documentação de referência do componente
- **ui/index.ts**: Barrel export atualizado
- **.state.yaml**: Atualizado com metadados do componente + catálogo de variantes

### Formato de Saída

```typescript
// button.tsx
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
        outline: 'border border-border bg-transparent hover:bg-muted'
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  loadingIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, loadingIcon, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className, isLoading && 'pointer-events-none')}
        data-state={isLoading ? 'loading' : props['data-state']}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (loadingIcon ?? <Spinner className="mr-2 h-4 w-4 animate-spin" />)}
        <span className="inline-flex items-center gap-1">{children}</span>
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button };
```

## Critérios de Sucesso

- [ ] O componente compila sem erros de TypeScript (strict) e passa no lint
- [ ] Variantes implementadas via `cva` com utilitários Tailwind respaldados por tokens
- [ ] Props totalmente tipadas (VariantProps + props customizadas) com TSDoc
- [ ] Estados loading/disabled, atributos de acessibilidade e dark mode suportados
- [ ] Testes unitários + jest-axe passam com cobertura ≥85%
- [ ] Stories de Storybook renderizam (se habilitado) com controls + aba de docs
- [ ] Documentação do componente publicada com tabelas de variante/densidade
- [ ] .state.yaml atualizado com catálogo de variantes + status de QA

## Tratamento de Erros

- **Token não encontrado**: Reportar qual token está faltando, sugerir alternativas
- **Componente existe**: Perguntar se deve sobrescrever ou usar nome diferente
- **Erros de TypeScript**: Exibir os erros, sugerir correções
- **Falhas de teste**: Mostrar os testes que falharam, não concluir até serem corrigidos
- **Violações de acessibilidade**: Avisar e sugerir melhorias

## Considerações de Segurança

- Sanitizar o nome do componente (prevenir injeção)
- Validar as referências de tokens
- Escapar o conteúdo do usuário nos exemplos
- Sem eval() ou execução dinâmica de código

## Exemplos

### Exemplo 1: Construir o Componente Button

```bash
*build button
```

Saída:
```
🏗️ Atlas: Construindo o componente Button...

📋 Configuração:
  - Tipo: Atom
  - Variantes: primary, secondary, outline
  - Tamanhos: sm, md, lg, icon
  - Estado de loading: habilitado (spinner)
  - Testes: RTL + jest-axe (>85% de cobertura)
  - Storybook: Sim

✓ button.tsx gerado (estilo Shadcn, variantes cva)
✓ button.test.tsx gerado (22 testes, asserções jest-axe)
✓ button.stories.tsx gerado (8 stories, controls + docs)
✓ button.md gerado (uso + orientação de tematização)

🧪 Executando testes...
  ✓ renderiza o botão padrão (corresponde ao snapshot)
  ✓ aplica as classes de variante via cva
  ✓ mostra o spinner + desabilita interações durante o loading
  ✓ passa na auditoria de acessibilidade (jest-axe)
  ✓ suporta renderização via slot asChild
  Cobertura: 96.4%

♿ Verificação de acessibilidade:
  ✓ Atributos ARIA presentes
  ✓ Contraste de cor: 4.8:1 (WCAG AA ✓)
  ✓ Navegável por teclado
  ✓ Indicadores de foco visíveis

✅ Componente Button pronto!

Import: `import { Button } from '@/components/ui/button';`
Uso: `<Button variant="primary" isLoading>Saving</Button>`

Atlas diz: "Feito certo. Feito uma vez só."
```

### Exemplo 2: Construir o Componente Input

```bash
*build input
```

A saída inclui funcionalidades adicionais:
- Estados de validação (error, success)
- Prop de texto auxiliar (helper text)
- Integração de label
- Slots de ícone

## Notas

- Todos os componentes estritamente tipados com TypeScript
- Zero valores hardcoded imposto (somente tokens)
- Acessibilidade é inegociável (WCAG AA no mínimo)
- Cobertura de testes >80% obrigatória
- Utilitários Tailwind + tokens garantem zero valores hardcoded
- Variantes e tamanhos estendem via `cva` sem editar o corpo do componente
- Componentes são tree-shakeable e amigáveis a server components
- Stories de Storybook habilitam testes visuais + de interação
- A documentação espelha props/tipos para onboarding instantâneo
- Componentes seguem os princípios do Atomic Design
- Atlas garante qualidade em cada passo
