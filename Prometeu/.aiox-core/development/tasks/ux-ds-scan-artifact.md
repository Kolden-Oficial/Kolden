---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Design System Artifact Scanner

> **Task ID:** ux-ds-scan-artifact
> **Agente:** UX-Design Expert
> **Fase:** Universal (funciona com qualquer fase)
> **Interativo:** Sim (elicit=true)

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: uxDsScanArtifact()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Strategy

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

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

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

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Fonte:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Fonte:** .aiox-core/utils/logger.js

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

1. **Erro:** Task Not Found
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome da task e o registro
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Invalid Parameters
   - **Causa:** Parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar execução

3. **Erro:** Execution Timeout
   - **Causa:** Task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cachear resultados intermediários; agrupar operações similares em lote

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


## 📋 Descrição

Analisar artefatos HTML/React (arquivos, screenshots ou URLs ao vivo) para extrair padrões de design, componentes e design tokens. Detectar automaticamente atoms, molecules, organisms seguindo a metodologia Atomic Design. Gerar sugestões de construção de componentes e recomendações de design system.

---

## 🎯 Objetivos

- Escanear artefatos de UI existentes em busca de padrões de design
- Extrair componentes nos níveis atomic, molecular e organism
- Identificar design tokens (cores, tipografia, espaçamento, etc.)
- Gerar recomendações de construção de componentes
- Fornecer um caminho de migração para design system

---

## 📊 Tipos de Artefato Suportados

### Tipo 1: Arquivos HTML
**Formato:** .html, .htm
**Análise:** Parsear DOM, extrair estilos, identificar componentes
**Velocidade:** Rápida (< 5 segundos)

### Tipo 2: Componentes React
**Formato:** .jsx, .tsx, .js com JSX
**Análise:** Parsing de AST, extração de props, estrutura de componentes
**Velocidade:** Rápida (< 10 segundos)

### Tipo 3: Screenshots
**Formato:** .png, .jpg, .jpeg
**Análise:** Reconhecimento visual de padrões (requer visão de IA)
**Velocidade:** Moderada (10-30 segundos)

### Tipo 4: URLs ao Vivo
**Formato:** https://example.com
**Análise:** Fetch + parse, análise completa do DOM
**Velocidade:** Moderada (15-45 segundos dependendo da página)

---

## 🔄 Workflow

### Passo 1: Especificar Artefato
**Elicitação Interativa:**

```
Que tipo de artefato você quer escanear?

1. Arquivo HTML (caminho local)
2. Arquivo de componente React (.jsx/.tsx)
3. Imagem de screenshot (.png/.jpg)
4. URL de site ao vivo

Sua seleção: _____

Forneça o caminho ou URL:
Sua entrada: _____
```

---

### Passo 2: Escanear e Parsear o Artefato

**Parsing de HTML/React:**
1. Carregar o conteúdo do arquivo
2. Parsear a estrutura DOM/AST
3. Extrair todos os elementos com atributos
4. Identificar padrões únicos
5. Agrupar elementos similares

**Análise de Screenshot:**
1. Carregar a imagem
2. Detectar regiões da UI (header, content, footer)
3. Identificar buttons, inputs, cards, etc.
4. Extrair a paleta de cores
5. Medir padrões de espaçamento

**Fetch de URL ao Vivo:**
1. Buscar o HTML da página
2. Baixar estilos inline
3. Parsear CSS externo (se acessível)
4. Extrair estilos computados
5. Identificar componentes interativos

---

### Passo 3: Extrair Design Tokens

**Color Tokens:**
```
colors:
  primary:
    - "#3B82F6" (usado 42 vezes)
    - "#2563EB" (usado 18 vezes)
  secondary:
    - "#10B981" (usado 23 vezes)
  neutral:
    - "#F3F4F6" (usado 67 vezes - backgrounds)
    - "#6B7280" (usado 45 vezes - text)
    - "#1F2937" (usado 38 vezes - headings)
  accent:
    - "#F59E0B" (usado 12 vezes)
```

**Typography Tokens:**
```
typography:
  fontFamilies:
    - "Inter, sans-serif" (primary)
    - "JetBrains Mono, monospace" (code)
  fontSizes:
    - 12px (labels, captions)
    - 14px (body text) ← mais comum
    - 16px (default)
    - 20px (h3)
    - 24px (h2)
    - 32px (h1)
  fontWeights:
    - 400 (regular)
    - 500 (medium)
    - 600 (semibold)
    - 700 (bold)
```

**Spacing Tokens:**
```
spacing:
  scale: [4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px]
  common_patterns:
    - Buttons: 8px vertical, 16px horizontal padding
    - Cards: 16px padding, 16px gap between
    - Sections: 32px vertical spacing
    - Page margins: 24px mobile, 48px desktop
```

**Border Radius Tokens:**
```
borderRadius:
  - 0px (sharp edges - 15% of components)
  - 4px (slight rounding - 60% of components) ← default
  - 8px (rounded - 20% of components)
  - 9999px (fully rounded - 5% of components)
```

**Shadow Tokens:**
```
shadows:
  - none (flat design)
  - sm: "0 1px 2px rgba(0,0,0,0.05)"
  - md: "0 4px 6px rgba(0,0,0,0.1)" ← mais comum
  - lg: "0 10px 15px rgba(0,0,0,0.1)"
```

---

### Passo 4: Identificar Componentes (Atomic Design)

**Atoms (Blocos de Construção Fundamentais):**
```
atoms:
  - Button
    variants: [primary, secondary, outline, ghost]
    count: 47 instâncias
    styles: {padding: 8px 16px, borderRadius: 4px, ...}

  - Input
    types: [text, email, password, number, search]
    count: 23 instâncias
    styles: {height: 40px, border: 1px solid #D1D5DB, ...}

  - Label
    count: 31 instâncias
    styles: {fontSize: 14px, fontWeight: 500, ...}

  - Icon
    set: [check, x, chevron-down, search, user, settings]
    count: 89 instâncias
    size: 16px, 20px, 24px

  - Badge
    count: 12 instâncias
    variants: [success, warning, error, info]
```

**Molecules (Combinações Simples):**
```
molecules:
  - FormField (Label + Input + Helper Text)
    count: 18 instâncias
    pattern: Pilha vertical com 4px de gap

  - SearchBar (Input + Icon + Optional Button)
    count: 3 instâncias
    pattern: Flex horizontal com prefixo de ícone

  - Card (Border + Padding + Shadow)
    count: 24 instâncias
    pattern: 16px padding, 8px borderRadius, md shadow

  - NavItem (Icon + Label + Optional Badge)
    count: 8 instâncias (na navegação)
    pattern: Flex horizontal, 12px gap

  - StatDisplay (Label + Number + Trend Icon)
    count: 6 instâncias (dashboard)
    pattern: Pilha vertical, número enfatizado
```

**Organisms (Seções Complexas):**
```
organisms:
  - Header (Logo + Navigation + Search + Profile)
    count: 1 instância (global)
    complexity: HIGH

  - ProductCard (Image + Title + Description + Price + CTA)
    count: 16 instâncias (grid)
    complexity: MEDIUM

  - DataTable (Headers + Rows + Pagination + Actions)
    count: 2 instâncias
    complexity: HIGH

  - Modal (Overlay + Header + Body + Footer + Close)
    count: 3 instâncias (login, confirm, settings)
    complexity: MEDIUM

  - Form (Multiple Fields + Validation + Submit)
    count: 4 instâncias
    complexity: MEDIUM
```

---

### Passo 5: Calcular Redundância de Padrões

**Análise de Redundância:**
```
Padrão: Buttons
----
Total de instâncias: 47
Variações únicas: 12 (baseado em clustering de estilo)
Conjunto ótimo: 3 (primary, secondary, outline)
Redução: 75% (12 → 3)
Economia de manutenção: 37.5 horas/mês → 9.4 horas/mês

Padrão: Colors
----
Total de cores: 89 valores hex
Após clustering (threshold de 5% HSL): 18 cores distintas
Conjunto ótimo de tokens: 12 tokens
Redução: 86.5% (89 → 12)

Padrão: Spacing Values
----
Total de valores únicos: 47 valores em px
Após normalização para a escala de 4px: 12 valores
Conjunto ótimo: 8 tokens (4, 8, 12, 16, 24, 32, 48, 64)
Redução: 74.5% (47 → 12)
```

---

### Passo 6: Gerar Recomendações de Construção

**Matriz de Prioridade de Componentes:**
```
Prioridade: HIGH (Construir Primeiro)
- Button (47 instâncias - mais usado)
- Input (23 instâncias - crítico para forms)
- Card (24 instâncias - exibição de conteúdo)

Prioridade: MEDIUM (Construir em Segundo)
- FormField molecule (18 instâncias)
- Badge (12 instâncias - exibição de status)
- Modal (3 instâncias mas alta complexidade)

Prioridade: LOW (Construir por Último ou Pular)
- Widgets customizados (1-2 instâncias)
- Componentes específicos de página
- Padrões avulsos (one-off)
```

**Recomendação de Ordem de Construção:**
```
Fase 1: Core Atoms (Semana 1)
1. Button (todas as 4 variants)
2. Input (todos os 5 types)
3. Label
4. Icon set (12 icons)

Fase 2: Common Molecules (Semana 2)
5. FormField (Label + Input + Helper)
6. Card
7. Badge
8. SearchBar

Fase 3: Complex Organisms (Semana 3)
9. Header
10. Form (com validação)
11. Modal
12. DataTable

Fase 4: Page Templates (Semana 4)
13. Template de dashboard
14. Template de página de form
15. Template de página de detalhe
```

---

## 📤 Saídas

Todos os artefatos salvos em: `outputs/design-system/{project}/scan/`

### Arquivos Obrigatórios:
1. **scan-summary.md** - Achados de alto nível
2. **design-tokens.yaml** - Tokens extraídos (cores, tipografia, espaçamento)
3. **component-inventory.md** - Lista de componentes (Atomic Design)
4. **redundancy-analysis.md** - Cálculos de redundância de padrões
5. **build-recommendations.md** - Matriz de prioridade e ordem de construção

### Arquivos Opcionais:
6. **screenshots/** - Comparações visuais de padrões
7. **extracted-styles.css** - Todo o CSS extraído do artefato
8. **comparison-matrix.xlsx** - Comparações de padrões lado a lado

---

## ✅ Critérios de Sucesso

- [ ] Artefato escaneado e parseado com sucesso
- [ ] Design tokens extraídos (cores, tipografia, espaçamento, etc.)
- [ ] Componentes identificados nos níveis atomic, molecular, organism
- [ ] Redundância de padrões calculada com percentuais de redução
- [ ] Recomendações de construção priorizadas (HIGH/MEDIUM/LOW)
- [ ] Fases de ordem de construção definidas (1-4 semanas)
- [ ] Todas as saídas salvas em `outputs/design-system/{project}/scan/`
- [ ] `.state.yaml` atualizado com os resultados do scan

---

## 🔄 Integração com Outras Tasks

**Funciona com qualquer fase:**
- `*research` - Escanear sites de concorrentes em busca de padrões de UX
- `*wireframe` - Escanear app existente para inventariar os componentes atuais
- `*audit` - Complementar a auditoria completa do codebase com foco em artefato específico
- `*consolidate` - Usar o scan para fundamentar decisões de consolidação
- `*build` - Usar o inventário de componentes para guiar o que construir

**Gerenciamento de Estado:**
Atualiza `.state.yaml` com:
- `artifact_scanned: {type, path}`
- `tokens_extracted: {colors, typography, spacing}`
- `components_found: [list of components]`
- `redundancy_metrics: {buttons, colors, spacing}`
- `scan_date: [ISO date]`

---

## 📚 Algoritmos de Extração de Tokens

### Color Clustering (baseado em HSL, threshold de 5%)
```
Algoritmo:
1. Extrair todas as cores hex do artefato
2. Converter para HSL (Hue, Saturation, Lightness)
3. Agrupar (cluster) cores dentro de 5% de distância HSL
4. Selecionar a cor mais usada de cada cluster como token
5. Nomear os tokens por categoria (primary, secondary, neutral, accent)
```

### Spacing Normalization (base de 4px)
```
Algoritmo:
1. Extrair todos os valores em px de padding, margin, gap
2. Arredondar para o múltiplo de 4px mais próximo
3. Contar a frequência de cada valor
4. Selecionar os 8 valores mais usados como tokens
5. Nomear os tokens: xs, sm, md, lg, xl, 2xl, 3xl
```

### Component Similarity Detection
```
Algoritmo:
1. Extrair a estrutura do elemento (tag + classes + children)
2. Extrair os estilos (CSS computado)
3. Calcular o score de similaridade (0-100%)
4. Agrupar componentes com >85% de similaridade
5. Identificar a variante mais comum como base
```

---

## ⚠️ Limitações

### Arquivos HTML/React:
- ✅ Pode parsear estrutura e estilos
- ✅ Pode extrair classes inline e CSS
- ❌ Não pode ver o visual renderizado (sem navegador)
- ❌ Não pode detectar comportamento dinâmico

### Screenshots:
- ✅ Pode ver a aparência visual
- ✅ Pode detectar cores e espaçamento
- ❌ Não pode extrair a estrutura do código
- ❌ Não pode identificar estados interativos (hover, focus)

### URLs ao Vivo:
- ✅ Pode buscar o HTML completo da página
- ✅ Pode extrair todos os estilos
- ❌ Pode ser bloqueado por CORS/auth
- ❌ Não pode acessar páginas privadas sem login

---

## 🎯 Exemplo de Saída

**Exemplo: Resultado de Scan para Dashboard**

```markdown
# Scan Summary: Dashboard Page

**Artefato:** https://example.com/dashboard
**Escaneado:** 2025-11-12 14:35
**Complexidade da Página:** MEDIUM (47 componentes, 3 níveis de profundidade)

## Design Tokens Extraídos
- **Cores:** 18 cores distintas → 12 tokens recomendados
- **Tipografia:** 6 tamanhos de fonte, 4 pesos → Bem estruturado
- **Espaçamento:** 47 valores → Normalizar para 8 tokens
- **Border Radius:** 3 valores (0px, 4px, 8px) → Já otimizado

## Componentes Encontrados (Atomic Design)
### Atoms (8 tipos, 147 instâncias)
- Button (47), Input (23), Label (31), Icon (89), Badge (12), ...

### Molecules (5 tipos, 42 instâncias)
- FormField (18), Card (24), SearchBar (3), NavItem (8), ...

### Organisms (4 tipos, 7 instâncias)
- Header (1), Form (4), Modal (3), DataTable (2)

## Análise de Redundância
- **Buttons:** 75% de redução possível (12 variants → 3)
- **Colors:** 86.5% de redução possível (89 → 12)
- **Spacing:** 74.5% de redução possível (47 → 12)

## Recomendações de Construção
**Fase 1 (Semana 1):** Button, Input, Label, Icon
**Fase 2 (Semana 2):** FormField, Card, Badge
**Fase 3 (Semana 3):** Header, Form, Modal
**Fase 4 (Semana 4):** DataTable, Templates
```

---

**Criado:** 2025-11-12
**Story:** 4.3 - UX-Design-Expert Merge
**Version:** 1.0.0
