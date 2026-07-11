---
task: generateHandoff()
responsavel: "@ui-engineer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: design_files
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: tech_stack
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: handoffDocumentation
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todos os componentes inventariados e mapeados ao design system"
  - "[ ] Todo valor visual mapeado a um design token"
  - "[ ] Revisão com o dev concluída, com tradeoffs documentados"
tipo: nota
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
relacionado:
  - "[[Harmonia/tasks/_indice|_indice]]"
---

# Tarefa: Documentação de Handoff para o Desenvolvedor

**Task ID:** DESIGN-006
**Versão:** 1.0.0
**Comando:** `*generate-handoff`
**Agente:** Engenheiro de UI (ui-engineer) + Dan Mall (dan-mall)
**Propósito:** Gerar documentação completa de handoff para o desenvolvedor, traduzindo design em código.

---

## Entradas

| Entrada | Origem | Obrigatório |
|---------|--------|-------------|
| `design_files` | Arquivos do Figma/Sketch ou screenshots | SIM |
| `design_system` | Referência de design system existente | PREFERÍVEL |
| `tech_stack` | Framework de frontend e abordagem de CSS | SIM |
| `component_list` | Componentes usados no design | PREFERÍVEL |
| `interaction_specs` | Animações, transições, estados de hover | PREFERÍVEL |
| `responsive_requirements` | Breakpoints e comportamento de adaptação | NÃO |

## Pré-condições

1. Os designs estão finalizados e aprovados
2. O design system existe (ou os valores de token estão especificados)
3. A tech stack é conhecida, para orientação específica de código
4. Os comportamentos interativos estão documentados ou demonstráveis

## Fases de Execução

### Fase 1: Inventariar Componentes

1. Mapear cada componente único usado nos designs
2. Para cada componente, determinar:
   - Ele já existe no design system? (Referenciar o existente)
   - É uma variante de um componente existente? (Documentar a variante)
   - É totalmente novo? (Sinalizar para adição ao design system)
3. Criar uma árvore de dependências de componentes — quais componentes compõem outros?
4. Identificar padrões compartilhados — layouts, padrões de espaçamento e padrões de interação reutilizáveis
5. Listar todos os ícones, ilustrações e assets de mídia necessários
6. Documentar componentes ou bibliotecas de terceiros exigidos

### Fase 2: Especificar Tokens

1. **Mapeamento de Cor** — Mapear cada cor do design a um design token
   - Se não existir token, propor um novo token semântico
   - Documentar os valores de modo claro e escuro
   - Verificar as proporções de contraste (conformidade AA: 4.5:1 texto, 3:1 UI)
2. **Mapeamento de Tipografia** — Mapear todos os estilos de texto a tokens de tipografia
   - Família de fonte, tamanho, peso, altura de linha, espaçamento entre letras
   - Ajustes responsivos da escala de tipos
3. **Mapeamento de Espaçamento** — Mapear todos os paddings, margens e gaps a tokens de espaçamento
   - Espaçamento interno do componente
   - Espaçamento entre componentes
   - Espaçamento em nível de seção e de página
4. **Mapeamento de Borda e Sombra** — Mapear estilos decorativos a tokens
5. **Mapeamento de Movimento** — Mapear animações a tokens de movimento (duração, easing, propriedades)
6. Exportar uma tabela completa de mapeamento token-para-design

### Fase 3: Documentar Interações

1. **Transições de Estado** — Para cada elemento interativo:
   - Padrão → Hover: O que muda? (cor, sombra, escala, cursor)
   - Padrão → Foco: O que muda? (contorno, anel, fundo)
   - Padrão → Ativo: O que muda? (transform, cor)
   - Padrão → Desabilitado: O que muda? (opacidade, cursor, pointer-events)
2. **Microinterações** — Animações disparadas por ações do usuário:
   - Feedback de pressionar botão
   - Aparição da validação de formulário
   - Entrada e saída de toast/notificação
   - Indicadores de carregamento e telas de esqueleto
   - Transições de página
3. **Suporte a Gestos** — Interações específicas de mobile:
   - Ações de swipe
   - Puxar para atualizar
   - Pressionar e segurar
   - Pinçar para dar zoom
4. **Navegação por Teclado** — Ordem de tab, teclas de atalho, gestão de foco
5. **Lógica Condicional** — Regras de mostrar/ocultar, regras de validação, divulgação progressiva

### Fase 4: Revisar com o Dev

1. Percorrer o handoff junto com o time de desenvolvimento
2. Esclarecer ambiguidades — tratar cada pergunta do tipo "o que acontece quando...?"
3. Identificar restrições técnicas — o que é difícil ou impossível de implementar?
4. Negociar tradeoffs — onde o design pode flexibilizar pela viabilidade técnica?
5. Acordar a prioridade de implementação — quais componentes/telas primeiro?
6. Estabelecer o processo de QA — como o design vai verificar a implementação?
7. Documentar todas as decisões e tradeoffs da revisão

## Formato de Saída

```yaml
handoff:
  creators: [ui-engineer, dan-mall]
  tech_stack: "{framework}"
  design_system: "{nome do sistema}"
  components:
    existing: ["{componentes do design system}"]
    variants_needed: ["{novas variantes dos existentes}"]
    new_required: ["{componentes totalmente novos}"]
  token_map:
    colors:
      - design_value: "{hex ou rgba}"
        token: "{nome do token}"
        usage: "{onde usado}"
    typography:
      - design_style: "{nome do estilo}"
        token: "{nome do token}"
    spacing:
      - design_value: "{valor em px}"
        token: "{nome do token}"
  interactions:
    state_transitions:
      - element: "{componente}"
        states: "{padrão → hover → foco → ativo → desabilitado}"
        animation: "{duração, easing}"
    micro_interactions:
      - trigger: "{ação do usuário}"
        animation: "{descrição}"
        duration: "{ms}"
        easing: "{função}"
    keyboard:
      tab_order: ["{sequência de elementos}"]
      shortcuts: ["{tecla: ação}"]
  responsive:
    breakpoints: ["{valores em px}"]
    adaptations:
      - breakpoint: "{px}"
        changes: ["{mudanças de layout}"]
  assets:
    icons: ["{lista de ícones com formato}"]
    images: ["{lista de imagens com tamanhos}"]
    fonts: ["{arquivos de fonte}"]
  dev_review_notes: ["{decisões e tradeoffs}"]
  qa_checklist: ["{itens de verificação}"]
```

## Condições de Veto

- **NUNCA** entregar designs sem mapeamento de tokens — os desenvolvedores nunca devem adivinhar valores
- **NUNCA** pular a documentação de interação — mockups estáticos são especificações incompletas
- **NUNCA** omitir o comportamento responsivo — se não for especificado, será implementado de forma inconsistente
- **NUNCA** pular a revisão com o dev — uma conversa evita dias de retrabalho
- **NUNCA** entregar sem especificações de acessibilidade — elas devem ser parte da spec, não algo posterior

## Critérios de Conclusão

- [ ] Todos os componentes inventariados e mapeados ao design system
- [ ] Todo valor visual mapeado a um design token
- [ ] Transições de estado documentadas para todos os elementos interativos
- [ ] Microinterações especificadas com tempo e easing
- [ ] Navegação por teclado e acessibilidade documentadas
- [ ] Comportamento responsivo especificado para todos os breakpoints
- [ ] Assets exportados nos formatos exigidos
- [ ] Revisão com o dev concluída, com tradeoffs documentados
- [ ] Checklist de QA criado para verificação da implementação
