---
task: createComponentSpec()
responsavel: "@design-system-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: component_name
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: tech_stack
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: componentSpec
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todas as variantes especificadas (tamanho, intenção, estado, layout, conteúdo)"
  - "[ ] Design tokens mapeados com cadeia de fallback"
  - "[ ] Requisitos de acessibilidade completos (ARIA, teclado, leitor de tela)"
---

# Tarefa: Especificação de Componente

**ID da Tarefa:** DESIGN-004
**Versão:** 1.0.0
**Comando:** `*create-component-spec`
**Agente:** Arquiteto de Design System (design-system-architect) + Brad Frost (brad-frost)
**Propósito:** Criar uma especificação completa de componente com variantes, tokens, acessibilidade e documentação de API.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `component_name` | Solicitação do usuário | SIM |
| `component_purpose` | Qual problema ele resolve | SIM |
| `design_system_context` | Tokens e padrões existentes | PREFERENCIAL |
| `tech_stack` | Framework (React, Vue, Svelte, etc.) | SIM |
| `usage_context` | Onde ele será usado | PREFERENCIAL |
| `reference_examples` | Implementações existentes para referência | NÃO |

## Pré-condições

1. O propósito do componente está claramente definido
2. O sistema de design tokens existe (ou será criado em paralelo)
3. A stack tecnológica é conhecida para o design da API

## Fases de Execução

### Fase 1: Definir o Propósito

1. Declare o propósito do componente — qual necessidade do usuário ele atende?
2. Identifique onde ele se posiciona na hierarquia atômica: átomo, molécula ou organismo
3. Liste os casos de uso — onde esse componente aparecerá?
4. Defina o que esse componente NÃO é (previne scope creep)
5. Verifique os componentes existentes — um componente existente pode ser estendido em vez disso?
6. Identifique as dependências do componente — quais átomos/moléculas ele compõe?

### Fase 2: Desenhar Variantes

1. **Variantes de tamanho** — sm, md, lg (quando aplicável)
2. **Variantes de cor/intenção** — primary, secondary, danger, warning, success, neutral
3. **Variantes de estado:**
   - Default (estado em repouso)
   - Hover (mouse por cima)
   - Foco (foco por teclado — anel de foco visível)
   - Ativo (sendo clicado/pressionado)
   - Desabilitado (não interativo)
   - Loading (operação assíncrona em andamento)
   - Erro (falha de validação)
   - Selecionado/Marcado (estado de toggle)
4. **Variantes de layout** — inline, block, full-width, comportamento responsivo
5. **Variantes de conteúdo** — com/sem ícone, com/sem descrição, comportamento de truncamento
6. Para cada variante, defina especificações visuais: cores, espaçamento, tipografia, bordas

### Fase 3: Especificar Tokens

1. Mapeie os estilos do componente para design tokens (nunca use valores brutos):
   - Fundo: `{component}-{variant}-bg`
   - Texto: `{component}-{variant}-text`
   - Borda: `{component}-{variant}-border`
   - Sombra: `{component}-{variant}-shadow`
   - Espaçamento: `{component}-padding-{size}`
   - Tipografia: `{component}-font-{property}`
2. Defina a cadeia de fallback de tokens: token de componente → token alias → token global
3. Garanta que todos os tokens de cor suportem tematização de dark mode
4. Documente quais tokens são customizáveis vs travados
5. Verifique se as razões de contraste atendem ao WCAG AA (4.5:1 texto, 3:1 elementos de UI)

### Fase 4: Documentar a API

1. **Props/Atributos:**
   - Nome, tipo, valor default, descrição
   - Obrigatório vs opcional
   - Valores válidos para enums
2. **Eventos/Callbacks:**
   - Nome do evento, payload, quando dispara
3. **Slots/Children:**
   - Slots nomeados e seu conteúdo esperado
   - Comportamento do slot default
4. **Acessibilidade:**
   - Papel e atributos ARIA
   - Padrão de interação por teclado (Tab, Enter, Space, setas, Escape)
   - Comportamento de anúncio do leitor de tela
   - Gestão de foco (para onde o foco vai, comportamento de trap)
   - Verificação de contraste de cor
5. **Comportamento Responsivo:**
   - Adaptações específicas por breakpoint
   - Tamanhos de alvo de toque (mínimo 44x44px)
   - Interações específicas de mobile
6. **Exemplos de Código:**
   - Uso básico
   - Cada variante
   - Composição com outros componentes
   - Padrões comuns

## Formato de Saída

```yaml
component_spec:
  name: "{nome do componente}"
  creators: [design-system-architect, brad-frost]
  atomic_level: "atom | molecule | organism"
  purpose: "{o que ele faz}"
  dependencies: ["{subcomponentes necessários}"]
  variants:
    sizes: ["{lista de tamanhos}"]
    intents: ["{lista de intenções}"]
    states: ["{lista de estados}"]
  tokens:
    - token: "{nome do token}"
      value: "{valor default}"
      customizable: true
      dark_mode: "{valor dark}"
  props:
    - name: "{nome da prop}"
      type: "{tipo}"
      default: "{default}"
      required: true
      description: "{o que controla}"
  events:
    - name: "{nome do evento}"
      payload: "{tipo de dado}"
      description: "{quando dispara}"
  accessibility:
    role: "{papel ARIA}"
    keyboard: ["{padrão de interação}"]
    announcements: ["{comportamento do leitor de tela}"]
    contrast: "verificado AA"
  responsive:
    breakpoints: ["{adaptações}"]
    touch_target: "44x44px mínimo"
  code_examples:
    basic: "{código}"
    variants: "{código}"
    composition: "{código}"
```

## Condições de Veto

- **NUNCA** especifique um componente sem requisitos de acessibilidade — eles não são opcionais
- **NUNCA** use valores brutos de cor/espaçamento — sempre referencie design tokens
- **NUNCA** pule os estados interativos — hover, foco, ativo e desabilitado são obrigatórios
- **NUNCA** crie um componente que duplique o propósito de um componente existente
- **NUNCA** omita os padrões de interação por teclado — nem todos os usuários usam mouse

## Critérios de Conclusão

- [ ] Propósito do componente definido com escopo claro
- [ ] Todas as variantes especificadas (tamanho, intenção, estado, layout, conteúdo)
- [ ] Design tokens mapeados com cadeia de fallback
- [ ] Props/API totalmente documentadas com tipos e defaults
- [ ] Requisitos de acessibilidade completos (ARIA, teclado, leitor de tela)
- [ ] Comportamento responsivo definido com alvos de toque
- [ ] Exemplos de código fornecidos para todos os casos de uso principais
- [ ] Valores de token de dark mode definidos
