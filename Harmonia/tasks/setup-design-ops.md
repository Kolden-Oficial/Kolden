---
task: setupDesignOps()
responsavel: "@dave-malouf"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: team_context
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: current_pain_points
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: designOpsPractice
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Estado atual avaliado, com gargalos identificados"
  - "[ ] Fluxo de trabalho de design definido com estágios, atividades e gates"
  - "[ ] Métricas definidas para o acompanhamento contínuo da saúde"
tipo: nota
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
relacionado:
  - "[[Harmonia/tasks/_indice|_indice]]"
---

# Tarefa: Configuração de uma Prática de DesignOps

**Task ID:** DESIGN-003
**Versão:** 1.0.0
**Comando:** `*setup-design-ops`
**Agente:** Dave Malouf (dave-malouf)
**Propósito:** Estabelecer uma prática de DesignOps para escalar a qualidade do design e a efetividade do time.

---

## Entradas

| Entrada | Origem | Obrigatório |
|---------|--------|-------------|
| `team_context` | Tamanho, estrutura e maturidade do time de design | SIM |
| `current_pain_points` | Maiores desafios operacionais | SIM |
| `tools_in_use` | Ferramentas atuais de design e colaboração | PREFERÍVEL |
| `engineering_workflow` | Como o time de dev trabalha (ágil, kanban, etc.) | PREFERÍVEL |
| `budget_constraints` | Orçamento disponível para ferramentas/contratações | NÃO |

## Pré-condições

1. Existe um time de design (ainda que pequeno)
2. As dores estão identificadas e reconhecidas
3. Há apoio da liderança para melhorar o design operations

## Fases de Execução

### Fase 1: Avaliar o Estado Atual

1. Mapear o fluxo de trabalho de design atual, do briefing ao produto entregue
2. Identificar gargalos — onde o trabalho fica travado ou atrasado?
3. Avaliar o cenário de ferramentas — elas são consistentes? Redundantes? Faltando?
4. Avaliar a qualidade do handoff — quão bem os designs se traduzem em código?
5. Revisar a estrutura de reuniões e cerimônias — as revisões de design estão acontecendo?
6. Avaliar as práticas de documentação de design — o conhecimento institucional é capturado?
7. Entrevistar/pesquisar o time — do que eles mais precisam?

### Fase 2: Fluxo de Trabalho de Design

1. Definir os estágios do fluxo de trabalho de design:
   - **Descobrir** — Pesquisa, insights de usuário, enquadramento do problema
   - **Definir** — Requisitos, restrições, critérios de sucesso
   - **Desenhar** — Exploração, iteração, refinamento
   - **Entregar** — Handoff, QA, suporte à implementação
   - **Medir** — Análise pós-lançamento, planejamento de iteração
2. Para cada estágio, definir:
   - Entradas necessárias (o que deve existir antes de começar)
   - Atividades (o que acontece durante este estágio)
   - Saídas produzidas (o que deve existir antes de avançar)
   - Gates de revisão (quem revisa e com quais critérios)
3. Mapear o fluxo de trabalho ao processo de engenharia — onde eles se cruzam?
4. Definir a cadência do design sprint — quanto dura um ciclo de design?
5. Estabelecer rituais de crítica e revisão:
   - Crítica de design (semanal, com pares)
   - Revisão de design (por marco, com stakeholders)
   - QA de design (pré-entrega, designer + engenheiro)

### Fase 3: Definir o People Ops

1. **Definições de Papéis** — Expectativas claras para cada papel de design
   - UX Designer, UI Designer, Engenheiro de Design System, Pesquisador de UX, Líder de Design
2. **Framework de Carreira** — Trilhas de crescimento para designers
   - Trilha IC: Júnior → Pleno → Sênior → Staff → Principal
   - Trilha de gestão: Líder → Gerente → Diretor → VP
3. **Matriz de Competências** — Competências esperadas em cada nível
4. **Onboarding** — Como novos designers entram no ritmo
   - Guia de configuração de ferramentas
   - Introdução ao design system
   - Normas e rituais do time
   - Marcos da primeira semana e do primeiro mês
5. **Gestão de Conhecimento** — Como as decisões de design e suas justificativas são documentadas
   - Registros de decisão para grandes escolhas de design
   - Documentação de padrões para soluções reutilizáveis
   - Repositório de pesquisa para insights de usuário

### Fase 4: Implementar Ferramentas & Infraestrutura

1. **Ferramentas de Design** — Padronizar em uma ferramenta de design principal (Figma recomendado)
   - Organização de arquivos e convenções de nomenclatura
   - Estrutura de biblioteca para componentes compartilhados
   - Práticas de controle de versão
2. **Ferramentas de Colaboração** — Como o design compartilha o trabalho com engenharia e produto
   - Ferramenta de specs de design e handoff
   - Plataforma de documentação de componentes
   - Ferramentas de feedback e anotação
3. **Ferramentas de Pesquisa** — Teste com usuário, analytics, coleta de feedback
4. **Gestão de Assets** — Biblioteca de ícones, sistema de ilustrações, assets de marca
5. **Dashboard de Métricas** — Acompanhar a saúde do design ops:
   - Tempo de ciclo (do briefing à entrega)
   - Taxa de retrabalho (com que frequência os designs mudam após o handoff)
   - Taxa de adoção do design system
   - Pontuações de satisfação do time
   - Taxa de conformidade de acessibilidade

## Formato de Saída

```yaml
design_ops:
  architect: "dave-malouf"
  team_size: 0
  maturity_level: "Ad Hoc | Emerging | Defined | Managed | Optimized"
  workflow:
    stages: [discover, define, design, deliver, measure]
    sprint_cadence: "{duração}"
    rituals:
      - name: "{ritual}"
        frequency: "{cadência}"
        participants: ["{papéis}"]
  people_ops:
    roles_defined: ["{lista de papéis}"]
    career_framework: true
    onboarding_plan: true
    knowledge_management: "{abordagem}"
  tools:
    design: "{ferramenta principal}"
    collaboration: "{ferramenta}"
    research: "{ferramenta}"
    asset_management: "{ferramenta}"
  metrics:
    cycle_time: "{meta}"
    rework_rate: "{meta}"
    system_adoption: "{meta}"
    team_satisfaction: "{meta}"
  implementation_plan:
    week_1_2: ["{configuração imediata}"]
    month_1: ["{fundação}"]
    month_3: ["{otimização}"]
```

## Condições de Veto

- **NUNCA** introduzir ferramentas sem definir antes o fluxo de trabalho — ferramentas servem ao processo, não o contrário
- **NUNCA** pular o people ops — o design ops fracassa sem papéis claros e planos de carreira
- **NUNCA** copiar o design ops de outra empresa por inteiro — adapte à maturidade do seu time
- **NUNCA** implementar tudo de uma vez — faça em fases ou o time ficará sobrecarregado
- **NUNCA** construir o design ops isolado da engenharia — ele precisa se integrar

## Critérios de Conclusão

- [ ] Estado atual avaliado, com gargalos identificados
- [ ] Fluxo de trabalho de design definido com estágios, atividades e gates
- [ ] Fluxo de trabalho mapeado ao processo de engenharia
- [ ] Rituais de crítica e revisão estabelecidos
- [ ] Definições de papéis e framework de carreira criados
- [ ] Plano de onboarding documentado
- [ ] Stack de ferramentas padronizada, com convenções
- [ ] Métricas definidas para o acompanhamento contínuo da saúde
