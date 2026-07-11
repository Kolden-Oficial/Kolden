---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Criar Wireframes & Fluxos de Interação

> **Task ID:** ux-create-wireframe
> **Agent:** UX-Design Expert
> **Phase:** 1 - UX Design
> **Interactive:** Yes (elicit=true)

---

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

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: uxCreateWireframe()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Template

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

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

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

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

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

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Not Found
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Invalid Parameters
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer um template de parâmetros, rejeitar a execução

3. **Erro:** Execution Timeout
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 3-8 min (estimated)
cost_estimated: $0.002-0.005
token_usage: ~1,500-5,000 tokens
```

**Notas de Otimização:**
- Cache template compilation; minimize data transformations; lazy load resources

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - creation
  - setup
updated_at: 2025-11-17
```

---


## 📋 Descrição

Projete wireframes, protótipos e fluxos de interação com base em insights da pesquisa de usuários. Crie wireframes de baixa, média ou alta fidelidade conforme as necessidades do projeto. Documente as decisões de design e prepare os materiais de handoff para os desenvolvedores.

---

## 🎯 Objetivos

- Traduzir as necessidades dos usuários em designs visuais
- Explorar múltiplas soluções de design
- Comunicar ideias de design aos stakeholders
- Criar diagramas de fluxo de interação
- Preparar os assets para o handoff de desenvolvimento
- Documentar as decisões de design e sua justificativa

---

## 📊 Níveis de Fidelidade

### Baixa Fidelidade (Lo-Fi)
**Quando Usar:** Exploração inicial, iteração rápida
**Ferramentas:** Sketch, quadro branco, ASCII art
**Tempo:** 30 min - 2 horas
**Detalhe:** Caixas e rótulos, sem estilização

### Média Fidelidade (Mid-Fi)
**Quando Usar:** Revisão com stakeholders, testes de usabilidade
**Ferramentas:** Figma, Sketch, Balsamiq
**Tempo:** 4-8 horas
**Detalhe:** Layout, hierarquia, algum conteúdo

### Alta Fidelidade (Hi-Fi)
**Quando Usar:** Handoff para desenvolvedores, aprovação final
**Ferramentas:** Figma, Adobe XD, Sketch
**Tempo:** 1-3 dias
**Detalhe:** Design visual, conteúdo real, interações

---

## 🔄 Workflow

### Passo 1: Definir o Escopo do Wireframe
**Elicitação Interativa:**

```
Que tipo de wireframes você precisa?

1. Baixa Fidelidade (Lo-Fi) - Esboços rápidos para exploração
2. Média Fidelidade (Mid-Fi) - Layout e estrutura
3. Alta Fidelidade (Hi-Fi) - Design visual pronto para dev

Sua seleção: _____

De quais telas/views você precisa? (Liste todas, ex.: "Login, Dashboard, Profile")
Sua lista: _____

Qual é o caso de uso primário? (ex.: "Usuário reservando um serviço")
Seu caso de uso: _____
```

---

### Passo 2: Revisar os Insights da Pesquisa

**Extraia da pesquisa de usuários:**
- Personas de usuário (para quem estamos projetando?)
- Objetivos do usuário (o que eles querem realizar?)
- Pontos de dor (o que os frustra atualmente?)
- Padrões comportamentais (como eles trabalham?)

**Exemplo:**
```
Designing for: [Persona Name]
Goal: [User goal from research]
Pain Point: [Relevant pain point]
Constraint: [Technical or business constraint]
```

---

### Passo 3: Criar a Arquitetura de Informação

**Inventário de Conteúdo:**
Liste todos os elementos de conteúdo necessários por tela:
- Cabeçalhos e títulos
- Elementos de navegação
- Campos de formulário
- Botões e CTAs
- Imagens e mídia
- Exibições de dados
- Texto de ajuda

**Exemplo:**
```
Screen: Dashboard
-----
- Page title
- User greeting
- Navigation menu (4 items)
- Quick stats (3 metrics)
- Recent activity list (5 items)
- Primary CTA button
- Secondary action link
```

---

### Passo 4: Projetar os Wireframes

#### Baixa Fidelidade (ASCII/Baseado em Texto)

**Exemplo de Wireframe Lo-Fi:**
```
+----------------------------------------------------------+
|  [Logo]                    [Nav1] [Nav2] [Nav3] [Profile]|
+----------------------------------------------------------+
|                                                          |
|  Dashboard                                               |
|  =========                                               |
|                                                          |
|  +----------------+  +----------------+  +---------------+|
|  | Metric 1       |  | Metric 2       |  | Metric 3      ||
|  | [Large Number] |  | [Large Number] |  | [Large Number]||
|  | [Label]        |  | [Label]        |  | [Label]       ||
|  +----------------+  +----------------+  +---------------+|
|                                                          |
|  Recent Activity                          [View All]     |
|  ---------------                                         |
|  [ ] Activity Item 1 - Description       [Action]       |
|  [ ] Activity Item 2 - Description       [Action]       |
|  [ ] Activity Item 3 - Description       [Action]       |
|  [ ] Activity Item 4 - Description       [Action]       |
|  [ ] Activity Item 5 - Description       [Action]       |
|                                                          |
|  [+ New Action Button]                                   |
|                                                          |
+----------------------------------------------------------+
|  Footer Links | Copyright | Privacy                      |
+----------------------------------------------------------+
```

#### Componentes de Wireframe de Média Fidelidade

**Checklist de Componentes:**
- [ ] Navegação (global, contextual)
- [ ] Título da página e breadcrumbs
- [ ] Áreas de conteúdo (primária, secundária, sidebar)
- [ ] Formulários (rótulos, campos, validação, botões)
- [ ] Exibições de dados (tabelas, cards, listas)
- [ ] Placeholders de imagens e mídia
- [ ] CTAs e botões de ação
- [ ] Estados de carregamento
- [ ] Estados vazios
- [ ] Estados de erro

**Estrutura de Atomic Design:**
Decomponha o wireframe em componentes:
- **Atoms:** Button, Input, Label, Icon
- **Molecules:** Form Field (Label + Input), Card (Image + Title + Text)
- **Organisms:** Header (Logo + Nav + Profile), Form (Multiple Fields + Button)

---

### Passo 5: Documentar os Fluxos de Interação

**Template de Diagrama de Fluxo:**
```
[Start] → [Screen 1] → [User Action] → [Screen 2] → [Conditional Branch]
                                              ↓
                                        [Success Path]
                                              ↓
                                        [Screen 3] → [End]

                                        [Error Path]
                                              ↓
                                        [Error Screen] → [Retry]
```

**Exemplo: Fluxo de Login**
```
[Landing Page]
      ↓
  [Click Login]
      ↓
[Login Screen]
      ↓
[Enter Email + Password]
      ↓
  [Click Submit]
      ↓
   [Validate]
      ↓
  ┌─────┴─────┐
  ↓           ↓
[Valid]    [Invalid]
  ↓           ↓
[Dashboard] [Error: Show message]
            [Retry]
```

---

### Passo 6: Adicionar Anotações

**Tipos de Anotação:**
1. **Funcionalidade** - "Clicar aqui abre um modal"
2. **Conteúdo** - "Mostrar o primeiro nome do usuário a partir do perfil"
3. **Estado** - "Desabilitado se o formulário estiver incompleto"
4. **Regras de Negócio** - "Mostrar apenas se o usuário tiver premium"
5. **Acessibilidade** - "Focus trap ao abrir o modal"
6. **Performance** - "Lazy load das imagens abaixo da dobra"

**Exemplo:**
```
[Button: Save Changes]
---
- Disabled state: If form has validation errors
- Loading state: Show spinner during API call
- Success state: Show checkmark + "Saved!" message
- Error state: Show error icon + error message
- Accessibility: aria-label="Save changes to profile"
- Analytics: Track "profile_save_clicked" event
```

---

### Passo 7: Criar o Inventário de Componentes

Liste todos os componentes únicos para o desenvolvimento:

```markdown
## Component Inventory (Atomic Design)

### Atoms (18 total)
- Button (Primary, Secondary, Destructive, Ghost)
- Input (Text, Email, Password, Number, Search)
- Label
- Icon (Set of 12 common icons)
- Badge
- Avatar
- Divider

### Molecules (8 total)
- Form Field (Label + Input + Helper Text + Error)
- Search Bar (Input + Icon + Button)
- Card Header (Avatar + Title + Subtitle)
- Navigation Item (Icon + Label + Badge)
- Stat Display (Label + Number + Trend Icon)
- Dropdown Menu (Button + Menu Items)
- Toast Notification (Icon + Message + Close)
- Empty State (Icon + Title + Description + CTA)

### Organisms (5 total)
- Header (Logo + Navigation + Search + Profile)
- Form (Multiple Fields + Submit Button)
- Data Table (Headers + Rows + Pagination)
- Card (Header + Content + Footer)
- Modal (Overlay + Header + Body + Footer + Close)
```

---

### Passo 8: Preparar o Handoff para Desenvolvedores

**O Pacote de Handoff Inclui:**
1. **Wireframes** - Todas as telas (export PNG/PDF)
2. **Fluxos de Interação** - Diagramas de fluxo
3. **Inventário de Componentes** - Lista com especificações
4. **Anotações** - Documento de decisões de design
5. **Assets** - Ícones, logos (se disponíveis)
6. **Medições** - Diretrizes de espaçamento e dimensionamento

**Sistema de Espaçamento:**
```
Base unit: 4px

Scale:
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px
```

**Breakpoints:**
```
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
```

---

## 📤 Saídas

Todos os artefatos salvos em: `outputs/wireframes/{project}/`

### Arquivos Obrigatórios:
1. **wireframes/** - Todos os wireframes de tela (PNG/ASCII)
2. **flows.md** - Diagramas de fluxo de interação
3. **component-inventory.md** - Lista de todos os componentes (Atomic Design)
4. **annotations.md** - Decisões de design e notas
5. **handoff-package.md** - Guia de handoff para desenvolvedores

### Arquivos Opcionais:
6. **assets/** - Ícones, logos, imagens
7. **measurements.md** - Specs de espaçamento e dimensionamento
8. **responsive-notes.md** - Variações para mobile/tablet/desktop

---

## ✅ Critérios de Sucesso

- [ ] Wireframes criados para todas as telas obrigatórias
- [ ] Nível de fidelidade apropriado alcançado
- [ ] Fluxos de interação documentados
- [ ] Inventário de componentes completo (estrutura Atomic Design)
- [ ] Anotações explicam todas as decisões de design
- [ ] Pacote de handoff para desenvolvedores preparado
- [ ] Diretrizes de espaçamento e medição definidas
- [ ] Comportamento responsivo documentado
- [ ] Todas as saídas salvas em `outputs/wireframes/{project}/`
- [ ] `.state.yaml` atualizado com a conclusão dos wireframes

---

## 🔄 Integração com Outras Tasks

**Passos Anteriores:**
- `*research` - Use personas e insights para fundamentar o design

**Próximos Passos:**
- `*generate-ui-prompt` - Converter wireframes em prompts de IA para v0/Lovable
- `*build` - Implementar componentes a partir do inventário
- `*create-front-end-spec` - Criar especificações detalhadas

**Gerenciamento de Estado:**
Atualiza `.state.yaml` com:
- `wireframes_created: [list of screen names]`
- `fidelity_level: "low" | "mid" | "high"`
- `component_inventory: [list of components]`
- `wireframe_date: [ISO date]`

---

## 🎨 Prompts de Geração de UI por IA

Após criar os wireframes, gere prompts para ferramentas de IA:

**Template de Prompt v0.dev:**
```
Create a [Component Name] component with:
- [Feature 1]
- [Feature 2]
- [Feature 3]

Style: [Modern/Minimal/Bold]
Colors: [Primary/Secondary colors]
Framework: React + TypeScript + Tailwind CSS
Accessibility: WCAG AA compliant
```

**Template de Prompt Lovable:**
```
Build a [Screen Name] page featuring:
- [Section 1 description]
- [Section 2 description]
- [Section 3 description]

Layout: [Grid/Flex/Stack]
Mobile-responsive: Yes
Dark mode: [Yes/No]
```

---

## 📚 Boas Práticas

### Hierarquia Visual
- Maior = mais importante
- Negrito = ação ou ênfase
- Cor = status ou categoria
- Proximidade = itens relacionados

### Consistência
- Use os mesmos componentes em todo o projeto
- Mantenha os padrões de espaçamento
- Siga a navegação estabelecida
- Repita os padrões de interação

### Acessibilidade
- Contraste suficiente (mínimo de 4.5:1)
- Indicadores de foco claros
- Ordem de tabulação lógica
- Texto alternativo para imagens
- Rótulos de formulário e mensagens de erro

### Mobile-First
- Projete primeiro para a menor tela
- Aprimoramento progressivo para telas maiores
- Alvos de toque com no mínimo 44x44px
- Evite interações que dependem apenas de hover

---

## ⚠️ Armadilhas Comuns

1. **Detalhe demais cedo demais** - Comece em lo-fi, itere até hi-fi
2. **Projetar isoladamente** - Compartilhe cedo, busque feedback com frequência
3. **Ignorar casos de borda** - Projete estados vazios, erros, carregamento
4. **Padrões inconsistentes** - Reutilize componentes, não reinvente
5. **Sem consideração mobile** - Projete responsivo desde o início

---

**Criado:** 2025-11-12
**Story:** 4.3 - UX-Design-Expert Merge
**Version:** 1.0.0
