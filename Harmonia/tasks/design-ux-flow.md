---
task: designUxFlow()
responsavel: "@ux-designer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: feature_or_product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: target_users
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: uxFlow
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Pesquisa de usuário conduzida com insights documentados"
  - "[ ] 2-3 personas criadas com objetivos e dores"
  - "[ ] Wireframes criados para todas as telas e fluxos principais"
---

# Tarefa: Pesquisa de UX & Design de Fluxo

**ID da Tarefa:** DESIGN-005
**Versão:** 1.0.0
**Comando:** `*design-ux-flow`
**Agente:** UX Designer (ux-designer)
**Propósito:** Conduzir pesquisa de usuário e desenhar fluxos de experiência do usuário, das personas aos wireframes.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `feature_or_product` | O que está sendo desenhado | SIM |
| `target_users` | Quem usará isso | SIM |
| `business_goals` | O que o negócio quer alcançar | SIM |
| `existing_research` | Pesquisa de usuário e analytics anteriores | NÃO |
| `constraints` | Limitações técnicas, de tempo, de orçamento | NÃO |
| `competitive_context` | Como os concorrentes resolvem isso | NÃO |

## Pré-condições

1. O escopo da funcionalidade ou produto está definido
2. O grupo de usuários-alvo está ao menos vagamente identificado
3. Os objetivos de negócio estão articulados

## Fases de Execução

### Fase 1: Pesquisa de Usuário

1. **Defina as perguntas de pesquisa** — O que precisamos aprender para desenhar bem?
2. **Identifique os métodos de pesquisa** com base nas necessidades do projeto:
   - Entrevistas com usuários (qualitativo — entender motivações e dores)
   - Surveys (quantitativo — validar hipóteses em escala)
   - Investigação contextual (observar usuários em seu ambiente natural)
   - Card sorting (entender modelos mentais para a arquitetura da informação)
   - Análise competitiva (como outros resolvem esse problema?)
   - Análise de analytics (o que os dados existentes nos dizem?)
3. **Conduza a pesquisa** — Execute os métodos selecionados
4. **Sintetize os achados** — Identifique padrões, temas e insights
5. **Crie declarações de insight** — "Usuários precisam de [X] porque [Y], mas atualmente [Z]"
6. Documente todos os achados em um repositório de pesquisa

### Fase 2: Personas & Mapeamento de Jornada

1. **Crie personas de usuário** (2-3 personas primárias):
   - Demografia, papel e contexto
   - Objetivos e motivações
   - Dores e frustrações
   - Comportamentos e hábitos
   - Citação que captura sua essência
   - Nível de proficiência técnica
2. **Mapeie a jornada atual** (As-Is):
   - Estágios pelos quais o usuário passa hoje
   - Ações em cada estágio
   - Pensamentos e sentimentos em cada estágio
   - Dores e oportunidades
   - Pontos de contato (onde interagem com o produto/serviço)
3. **Mapeie a jornada desejada** (To-Be):
   - Estágios aprimorados com as dores resolvidas
   - Novos pontos de contato e interações
   - Elevação emocional em momentos-chave
   - Momentos de encantamento

### Fase 3: Arquitetura da Informação

1. **Inventário de conteúdo** — Que conteúdo/funcionalidades precisam ser organizados?
2. **Resultados de card sorting** — Como os usuários agrupam naturalmente a informação?
3. **Mapa do site / Mapa do app** — Estrutura hierárquica de páginas/telas
4. **Modelo de navegação** — Navegação primária, secundária, contextual
5. **Convenções de nomenclatura** — Labels que correspondem aos modelos mentais dos usuários (não jargão interno)
6. **Busca e filtragem** — Como os usuários encontram conteúdo dentro da estrutura
7. Valide a IA com tree testing (os usuários conseguem encontrar o que precisam?)

### Fase 4: Wireframes

1. **Esboços de baixa fidelidade** — Exploração rápida de opções de layout (3-5 alternativas por tela-chave)
2. **Wireframes de média fidelidade** — Abordagem selecionada refinada com:
   - Grid de layout e espaçamento
   - Posicionamento e hierarquia de componentes
   - Prioridade de conteúdo (o que é mais importante em cada tela)
   - Padrões de interação (como os usuários se movem entre estados)
   - Estados de erro e estados vazios
   - Estados de loading
3. **Fluxos de usuário** — Caminhos passo a passo para tarefas-chave:
   - Caminho feliz (tudo dá certo)
   - Caminho de erro (o que acontece quando as coisas dão errado)
   - Casos extremos (cenários incomuns mas válidos)
4. **Anotação** — Documente comportamentos de interação, regras de validação, lógica condicional
5. **Considerações responsivas** — Como os wireframes se adaptam entre breakpoints

### Fase 5: Validação & Testes

1. **Teste de usabilidade** — Teste os wireframes com 5 ou mais usuários representativos
2. **Taxa de sucesso de tarefa** — Os usuários conseguem completar as tarefas-chave?
3. **Tempo na tarefa** — Quanto tempo cada tarefa leva?
4. **Taxa de erro** — Onde os usuários cometem erros?
5. **Satisfação** — Como os usuários se sentem em relação à experiência?
6. Documente os achados e itere nos wireframes
7. Faça o handoff dos wireframes validados para o design visual e o desenvolvimento

## Formato de Saída

```yaml
ux_flow:
  designer: "ux-designer"
  feature: "{nome da funcionalidade/produto}"
  research:
    methods_used: ["{métodos}"]
    key_insights: ["{declarações de insight}"]
    participants: 0
  personas:
    - name: "{nome da persona}"
      role: "{papel}"
      goals: ["{objetivos}"]
      pain_points: ["{dores}"]
      quote: "{citação representativa}"
  journey_map:
    stages: ["{lista de estágios}"]
    pain_points: ["{principais dores}"]
    opportunities: ["{oportunidades de design}"]
  information_architecture:
    site_map: "{descrição da estrutura}"
    navigation_model: "{padrão de nav}"
    key_labels: ["{nomenclatura}"]
  wireframes:
    screens: ["{lista de telas}"]
    user_flows: ["{lista de fluxos}"]
    interaction_notes: ["{comportamentos-chave}"]
  validation:
    method: "{método de teste}"
    task_success_rate: "{percentual}"
    key_findings: ["{o que aprendemos}"]
    iterations: ["{mudanças feitas}"]
```

## Condições de Veto

- **NUNCA** pule a pesquisa de usuário e vá direto para os wireframes — suposições levam a design desperdiçado
- **NUNCA** desenhe para uma única persona — considere a gama de usuários
- **NUNCA** use jargão interno em navegação ou labels — use a linguagem do usuário
- **NUNCA** desenhe apenas o caminho feliz — estados de erro e casos extremos fazem parte da experiência
- **NUNCA** pule o teste de usabilidade — designs não testados são suposições, não soluções

## Critérios de Conclusão

- [ ] Pesquisa de usuário conduzida com insights documentados
- [ ] 2-3 personas criadas com objetivos e dores
- [ ] Mapa de jornada criado mostrando os estados atual e desejado
- [ ] Arquitetura da informação definida e validada
- [ ] Wireframes criados para todas as telas e fluxos principais
- [ ] Estados de erro, estados vazios e estados de loading desenhados
- [ ] Teste de usabilidade concluído com achados documentados
- [ ] Wireframes iterados com base nos resultados dos testes
