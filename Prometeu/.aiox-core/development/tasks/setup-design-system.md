---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Configuração da Estrutura do Design System

> Task ID: atlas-setup-design-system
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
task: setupDesignSystem()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: project_path
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Valid directory path

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Initialization options

**Saída:**
- campo: initialized_project
  tipo: string
  destino: File system
  persistido: true

- campo: config_created
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
  - [ ] Directory is empty or force flag set; config valid
    tipo: pre-condition
    blocker: true
    validação: |
      Check directory is empty or force flag set; config valid
    error_message: "Pre-condition failed: Directory is empty or force flag set; config valid"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Project initialized; config files created; structure valid
    tipo: post-condition
    blocker: true
    validação: |
      Verify project initialized; config files created; structure valid
    error_message: "Post-condition failed: Project initialized; config files created; structure valid"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Project structure correct; all config files valid
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert project structure correct; all config files valid
    error_message: "Acceptance criterion not met: Project structure correct; all config files valid"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** project-scaffolder
  - **Propósito:** Gerar a estrutura do projeto e a config
  - **Origem:** .aiox-core/scripts/project-scaffolder.js

- **Ferramenta:** config-manager
  - **Propósito:** Inicializar os arquivos de configuração
  - **Origem:** .aiox-core/utils/config-manager.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** init-project.js
  - **Propósito:** Workflow de inicialização do projeto
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/init-project.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Diretório Não Vazio
   - **Causa:** O diretório de destino já contém arquivos
   - **Resolução:** Use a flag force ou escolha um diretório vazio
   - **Recuperação:** Solicitar confirmação, mesclar ou abortar

2. **Erro:** Falha na Inicialização
   - **Causa:** Erro ao criar a estrutura do projeto
   - **Resolução:** Verificar permissões e espaço em disco
   - **Recuperação:** Limpar a inicialização parcial, registrar o erro em log

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

Inicializa a estrutura do design system para projetos greenfield ou brownfield. Carrega tokens do .state.yaml do Brad ou de entrada manual, configura o Tailwind v4 (`@theme`), faz o bootstrap dos utilitários do Shadcn e prepara o Atlas para a geração de componentes.

## Pré-requisitos

- Node.js e npm instalados (para componentes React/TypeScript)
- Ou: o .state.yaml do Brad com tokens OU arquivos de tokens manuais
- O projeto possui package.json (ou o Atlas criará um)

## Workflow

### Elicitação Interativa

Esta task usa elicitação interativa para configurar o setup.

1. **Detectar o Ponto de Partida**
   - Verificar o .state.yaml do Brad (brownfield a partir da auditoria)
   - Se não encontrado, perguntar pelo setup greenfield
   - Confirmar qual abordagem usar

2. **Carregar ou Criar Tokens**
   - Brownfield: Carregar tokens do estado do Brad
   - Greenfield: Perguntar a localização do tokens.yaml ou criar template
   - Validar o schema dos tokens

3. **Configurar a Estrutura do Projeto**
   - Perguntar o diretório de saída dos componentes (padrão: `src/components/ui`)
   - Confirmar o arquivo de entrada do Tailwind v4 (`app.css`) e as fontes de tokens
   - Decidir sobre o uso de Radix/Slot, o seeding de componentes Shadcn
   - Framework de testes (Jest/Vitest) + Storybook (sim/não)

### Passos

1. **Detectar o Estado do Brad**
   - Buscar .state.yaml em outputs/design-system/
   - Se encontrado, validar que a fase de tokenização foi concluída
   - Se não encontrado, preparar o setup greenfield
   - Validação: Ponto de partida identificado

2. **Carregar os Dados dos Tokens**
   - Brownfield: Ler as localizações dos tokens a partir do .state.yaml
   - Greenfield: Solicitar a localização do tokens.yaml
   - Fazer o parse e validar o schema dos tokens
   - Verificar as categorias de tokens obrigatórias (color, spacing, typography)
   - Validação: Tokens carregados e válidos

3. **Criar a Estrutura de Diretórios**
   - Criar `components/ui/` (atoms/molecules), `components/composite/`, `components/layout/`
   - Criar `lib/` para utilitários (`utils.ts`, `cn`, helpers)
   - Criar o diretório `tokens/` (YAML, JSON, DTCG, exports por plataforma)
   - Criar `docs/` (docs de componentes, diretrizes de design)
   - Criar `__tests__/` para utilitários de teste compartilhados
   - Validação: A estrutura de diretórios está alinhada com as convenções de Atomic Design + Shadcn

4. **Copiar os Arquivos de Tokens**
   - Copiar tokens.yaml + tokens.dtcg.json + exports complementares para dentro de `tokens/`
   - Gerar tokens/index.ts para imports centralizados
   - Garantir que dark mode + aliases semânticos estejam disponíveis
   - Validação: Tokens acessíveis no projeto (TS + runtime)

5. **Inicializar as Dependências do Pacote**
   - Verificar os pacotes React, TypeScript e Tailwind
   - Instalar `class-variance-authority`, `tailwind-merge`, `@radix-ui/react-slot`, `lucide-react`
   - Adicionar testes (`@testing-library/react`, `@testing-library/jest-dom`, `jest-axe`)
   - Instalar Storybook 8 (se solicitado)
   - Validação: `npm install` (ou pnpm) é concluído sem erros

6. **Criar os Arquivos de Configuração**
   - Gerar/mesclar configs de `tsconfig.json`, `jest.config.js`, `.storybook/`
   - Criar `app.css` (ou `globals.css`) com `@import "tailwindcss";` e definições de `@theme`
   - Adicionar configs de `.cursorrules`, ESLint, Prettier alinhadas com o Tailwind v4
   - Criar `design-system.config.yaml` para as configurações do Atlas
   - Validação: Arquivos de configuração válidos e documentados

7. **Gerar o Índice de Tokens**
   - Criar tokens/index.ts exportando getters tipados (core/semantic/component)
   - Fornecer funções helper para acesso a variáveis CSS, helper `theme` para o Tailwind
   - Validação: `import { tokens } from '@/tokens'` funciona em todos os componentes

8. **Criar os Estilos Base**
   - Popular `app.css` com `@theme`, `@layer base/components/utilities`
   - Adicionar reset (modern-normalize), focus-visible, padrões de tipografia
   - Implementar overrides `[data-theme="dark"]` e container queries
   - Validação: Rodar o build do Tailwind produz os utilitários esperados sem warnings

9. **Inicializar o Rastreamento de Estado**
   - Criar ou atualizar o `.state.yaml` para o Atlas
   - Registrar a configuração do setup (diretórios, ferramentas, dependências)
   - Capturar a versão do Tailwind, a cobertura de tokens, os componentes shadcn instalados
   - Definir a fase como "setup_complete"
   - Validação: Arquivo de estado criado

10. **Gerar o Relatório de Setup**
    - Criar setup-summary.md
    - Listar todos os arquivos e diretórios criados
    - Documentar os próximos passos (construir componentes)
    - Validação: Setup documentado

## Saída

- Estrutura de diretórios **components/** (ui/, composite/, layout/)
- **tokens/** com exports YAML + JSON + DTCG
- **app.css** (ou globals.css) com `@theme` do Tailwind e estilos base
- **lib/utils.ts** com o helper `cn` + utilitários compartilhados
- **setup-summary.md** com os detalhes da configuração
- **.state.yaml** atualizado com os dados de setup do Atlas (metadata de tailwind/shadcn)

### Formato de Saída

```yaml
# .state.yaml Atlas setup section
atlas_setup:
  completed_at: "2025-10-27T15:00:00Z"
  starting_point: "brownfield"  # or "greenfield"

  configuration:
    component_directory: "src/components/ui"
    css_approach: "tailwind_v4"
    test_framework: "jest"
    storybook_enabled: true
    shadcn_enabled: true

  tokens_loaded:
    source: "Brad tokenization"
    categories:
      - color (12 tokens)
      - spacing (7 tokens)
      - typography (10 tokens)
      - radius (4 tokens)
      - shadow (3 tokens)
    total_tokens: 36
    validation: "passed"

  directory_structure:
    - components/ui/
    - components/composite/
    - components/layout/
    - tokens/
    - lib/
    - docs/
    - __tests__/

  dependencies_added:
    - "@testing-library/react"
    - "@testing-library/jest-dom"
    - "@storybook/react"
    - "class-variance-authority"
    - "tailwind-merge"
    - "@radix-ui/react-slot"

  phase: "setup_complete"
  ready_for: "component_building"
```

## Critérios de Sucesso

- [ ] A estrutura de diretórios segue os princípios de Atomic Design
- [ ] Tokens (YAML + DTCG) carregados e validados com sucesso
- [ ] `@theme` + layers do Tailwind v4 configurados e o build é bem-sucedido
- [ ] Dependências do pacote instaladas (React, Tailwind, cva, tailwind-merge, Radix)
- [ ] Arquivos de configuração válidos (tsconfig, jest, Storybook, .cursorrules)
- [ ] Estilos base criados com tokens + paridade de dark mode
- [ ] Rastreamento de estado inicializado (ferramentas, benchmarks, caminhos de componentes)
- [ ] Setup documentado com clareza (setup-summary.md)

## Tratamento de Erros

- **Nenhum token encontrado**: Oferecer a criação de um template de token ou solicitar entrada manual
- **Schema de token inválido**: Reportar erros específicos, sugerir correções
- **Dependências ausentes**: Auto-instalar com npm ou solicitar ao usuário
- **Diretório existe**: Perguntar se deve sobrescrever ou usar outra localização
- **Estrutura de projeto inválida**: Avisar o usuário, continuar com um setup compatível

## Considerações de Segurança

- Validar os caminhos dos arquivos de token (sem directory traversal)
- Sanitizar os nomes de diretórios
- Não executar código durante o setup
- Validar o package.json antes de modificar

## Exemplos

### Exemplo 1: Setup Brownfield (A partir do Brad)

```bash
*setup
```

Saída:
```
🏗️ Atlas: Configurando a estrutura do design system...

✓ Estado do Brad detectado: outputs/design-system/my-app/.state.yaml
✓ Carregando tokens da tokenização do Brad...
  - 12 tokens de cor (OKLCH)
  - 7 tokens de espaçamento
  - 10 tokens de tipografia
  - 6 mapeamentos de componentes
  - Total: 36 tokens validados

📁 Criando a estrutura de diretórios...
  ✓ src/components/ui/
  ✓ src/components/composite/
  ✓ src/lib/utils.ts
  ✓ tokens/ (yaml/json/dtcg)

📦 Instalando dependências...
  ✓ class-variance-authority
  ✓ tailwind-merge
  ✓ @radix-ui/react-slot
  ✓ @testing-library/react + jest-axe
  ✓ @storybook/react (opcional)

⚙️ Gerando configuração...
  ✓ tokens/index.ts (exports tipados)
  ✓ app.css com @theme + dark mode
  ✓ jest.config.js / storybook-main.ts
  ✓ .cursorrules (padrões Tailwind v4 + Shadcn)

✅ Setup concluído!

Próximos passos:
  1. Bootstrap da biblioteca Shadcn: *bootstrap-shadcn
  2. Construir componentes: *build button
  3. Gerar docs: *document
Atlas diz: "A fundação está sólida. Pronto para construir."
```

### Exemplo 2: Setup Greenfield

```bash
*setup
```

Saída:
```
🏗️ Atlas: Nenhum estado do Brad encontrado. Iniciando setup greenfield...

? Fonte de tokens:
  1. Eu tenho tokens.yaml
  2. Criar template de token
  3. Entrada manual

Usuário seleciona 1

? Caminho para o tokens.yaml: ./tokens/tokens.yaml

✓ Tokens carregados e validados (24 tokens)

? Diretório de componentes: src/components/ui
? Arquivo de entrada do Tailwind: src/app/app.css
? Fazer bootstrap do starter kit do Shadcn? Sim
? Habilitar Storybook? Sim

[...o setup continua...]
```

## Notas

- O setup brownfield é mais rápido (tokens vindos do Brad)
- O greenfield exige criação ou importação manual de tokens
- Estrutura de Atomic Design + Shadcn (ui/, composite/, layout/)
- Toda a estilização deve usar tokens/utilitários do Tailwind (sem CSS modules)
- Storybook 8 recomendado para QA visual
- `class-variance-authority`, `tailwind-merge`, Radix Slot instalados por padrão
- O Atlas cria automaticamente os tipos TypeScript para os tokens
- Os estilos base incluem reset de CSS e variáveis de token
- O setup pode ser re-executado com segurança (pergunta antes de sobrescrever)
- Próximo passo após o setup: *build {pattern} para gerar componentes
