---
task: createDesignSystem()
responsavel: "@brad-frost"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: project_context
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: tech_stack
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: designSystem
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Auditoria de interface concluída com inconsistências documentadas"
  - "[ ] Todos os design tokens definidos (cores, tipografia, espaçamento, bordas, sombras)"
  - "[ ] Documentação completa com exemplos e guia de contribuição"
tipo: nota
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
relacionado:
  - "[[Harmonia/tasks/_indice|_indice]]"
---

# Tarefa: Criação de Design System Atômico

**ID da Tarefa:** DESIGN-001
**Versão:** 1.0.0
**Comando:** `*create-design-system`
**Agente:** Brad Frost (brad-frost) + Dan Mall (dan-mall)
**Propósito:** Construir um design system atômico completo, da auditoria até átomos, moléculas, organismos e documentação.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `project_context` | Descrição da aplicação ou produto | SIM |
| `brand_guidelines` | Cores, tipografia, logos | PREFERENCIAL |
| `existing_ui` | Screenshots ou código da interface atual | PREFERENCIAL |
| `tech_stack` | Framework e ferramentas de frontend | SIM |
| `team_size` | Tamanho do time de design e dev | NÃO |
| `accessibility_requirements` | Nível WCAG alvo | NÃO (default: AA) |

## Pré-condições

1. Contexto do projeto e stack tecnológica estão definidos
2. Diretrizes de marca existem (mesmo que mínimas — cores e fontes, no mínimo)
3. Entendimento de quem consumirá o design system (designers, desenvolvedores, ambos)

## Fases de Execução

### Fase 1: Auditar o Existente (brad-frost)

1. Conduza um inventário de interface — faça screenshot de cada componente único
2. Categorize os elementos de UI existentes por tipo:
   - Cores, tipografia, espaçamento, ícones, bordas, sombras
   - Botões, inputs, labels, badges, links
   - Cards, formulários, navegação, modais, tabelas
   - Layouts de página, templates, padrões responsivos
3. Identifique inconsistências — quantas variações do mesmo componente existem?
4. Avalie a acessibilidade atual — conformidade com WCAG dos elementos existentes
5. Documente o "zoológico de componentes" — tudo que existe hoje
6. Identifique os 20% dos componentes que cobrem 80% da interface

### Fase 2: Definir Átomos (brad-frost)

1. **Tokens de cor** — Defina a paleta global, as cores semânticas e os aliases de nível de componente
   - Global: cores de marca, neutros, cores de feedback (success, warning, error, info)
   - Semântico: text-primary, text-secondary, bg-surface, bg-canvas, border-default
   - Componente: button-primary-bg, input-border, card-shadow
2. **Tokens de tipografia** — Famílias de fonte, tamanhos, pesos, alturas de linha, espaçamento entre letras
   - Escala: xs, sm, base, lg, xl, 2xl, 3xl, 4xl
   - Semântico: heading-1 a heading-6, body, caption, label, code
3. **Tokens de espaçamento** — Escala de espaçamento consistente (unidade base de 4px recomendada)
   - Escala: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24
4. **Tokens de borda** — Escala de raio, larguras de borda, estilos
5. **Tokens de sombra** — Níveis de elevação (sm, md, lg, xl)
6. **Tokens de animação** — Duração, easing, propriedades de transição
7. **Tokens de breakpoint** — Breakpoints responsivos
8. Documente cada átomo com diretrizes de uso

### Fase 3: Construir Moléculas & Organismos (brad-frost + dan-mall)

**Moléculas (grupos simples de componentes):**
1. Grupo de botões (botão + ícone + label)
2. Campo de input (label + input + texto de ajuda + mensagem de erro)
3. Barra de busca (input + botão + ícone)
4. Objeto de mídia (imagem + bloco de texto)
5. Item de navegação (ícone + label + badge)
6. Cabeçalho de card (avatar + título + subtítulo + ação)

**Organismos (grupos complexos de componentes):**
1. Barra de navegação (logo + itens de nav + busca + menu do usuário)
2. Seção de formulário (título + descrição + múltiplos campos de input + ações)
3. Tabela de dados (cabeçalho + linhas + paginação + filtros)
4. Card (cabeçalho + mídia + conteúdo + rodapé + ações)
5. Modal (overlay + cabeçalho + conteúdo + ações de rodapé)
6. Sidebar (logo + navegação + info do usuário + rodapé)

Para cada componente:
- Defina variantes (tamanho, cor, estado)
- Especifique estados interativos (default, hover, foco, ativo, desabilitado, loading)
- Documente props/API
- Escreva requisitos de acessibilidade (papéis ARIA, navegação por teclado, leitor de tela)
- Crie a especificação de comportamento responsivo

### Fase 4: Documentar (dan-mall)

1. **Primeiros Passos** — Instalação, setup e o primeiro uso de componente
2. **Princípios de Design** — O "porquê" por trás das decisões de design
3. **Referência de Tokens** — Catálogo completo de tokens com exemplos visuais
4. **Catálogo de Componentes** — Cada componente com:
   - Descrição e propósito
   - Exemplos ao vivo com todas as variantes
   - Documentação de props/API
   - O que fazer e o que não fazer, com exemplos visuais
   - Notas de acessibilidade
   - Trechos de código (prontos para copiar e colar)
5. **Biblioteca de Padrões** — Composições e layouts comuns
6. **Guia de Contribuição** — Como adicionar/modificar componentes
7. **Modelo de Governança** — Quem aprova mudanças, versionamento, processo de descontinuação

## Formato de Saída

```yaml
design_system:
  name: "{nome do sistema}"
  creators: [brad-frost, dan-mall]
  methodology: "Atomic Design"
  tech_stack: "{framework}"
  accessibility_target: "WCAG 2.1 AA"
  tokens:
    colors: "{contagem de tokens}"
    typography: "{contagem de tokens}"
    spacing: "{contagem de tokens}"
    borders: "{contagem de tokens}"
    shadows: "{contagem de tokens}"
  components:
    atoms: ["{lista}"]
    molecules: ["{lista}"]
    organisms: ["{lista}"]
    templates: ["{lista}"]
  documentation:
    getting_started: true
    token_reference: true
    component_catalog: true
    pattern_library: true
    contribution_guide: true
    governance_model: true
  governance:
    versioning: "semver"
    approval_process: "{descrição}"
    deprecation_policy: "{descrição}"
```

## Condições de Veto

- **NUNCA** pule a fase de auditoria — construir sem entender o que existe cria duplicação
- **NUNCA** defina componentes sem acessibilidade desde o início — fazer retrofit é 10x mais difícil
- **NUNCA** crie tokens sem uma convenção de nomenclatura e hierarquia claras
- **NUNCA** pule a documentação — um design system não documentado não será adotado
- **NUNCA** construa organismos antes de os átomos e as moléculas estarem sólidos

## Critérios de Conclusão

- [ ] Auditoria de interface concluída com inconsistências documentadas
- [ ] Todos os design tokens definidos (cores, tipografia, espaçamento, bordas, sombras)
- [ ] Átomos documentados com diretrizes de uso
- [ ] Moléculas e organismos construídos com variantes e estados
- [ ] Requisitos de acessibilidade definidos para cada componente
- [ ] Documentação completa com exemplos e guia de contribuição
- [ ] Modelo de governança estabelecido para manutenção contínua
