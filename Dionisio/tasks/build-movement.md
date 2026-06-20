---
task: buildMovement()
responsavel: "@movement-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: cause
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: audience
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: movement_build
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Análise da faísca concluída e validada"
  - "[ ] Todos os 6 documentos entregáveis produzidos"
  - "[ ] Coerência ponta a ponta validada"
---

# Tarefa: Construir Movimento

**ID da Tarefa:** MOVEMENT-001
**Versão:** 1.0.0
**Comando:** `*build-movement`
**Agente:** Movement Chief (movement-chief)
**Propósito:** Orquestrar o processo completo de construção de movimento em 5 fases, da faísca ao impacto

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `cause` | Prompt do usuário | Sim | A causa, ideia ou marca em torno da qual construir um movimento |
| `audience` | Prompt do usuário | Sim | Público-alvo ou descrição da comunidade |
| `context` | Sessão | Não | Contexto de mercado, ativos de marca existentes, concorrentes |
| `phase_override` | Usuário | Não | Iniciar a partir de uma fase específica (pular fases anteriores) |
| `intensity` | Usuário | Não | Escala: de base, regional, nacional, global |

## Pré-condições

- Configuração do squad carregada (`config/config.yaml`)
- Todos os agentes especialistas disponíveis: fenomenologo, identitario, manifestador, estrategista-de-ciclo, analista-de-impacto
- Catálogo de roteamento carregado (`data/routing-catalog.yaml`)
- Frameworks de movimento carregados (`data/movement-frameworks.yaml`)

## Fases de Execução

### Fase 1: Faísca (fenomenologo)

1. Identifique a **experiência vivida** que une o público-alvo
2. Mapeie a **tensão coletiva** -- qual frustração, dor ou aspiração é compartilhada
3. Descubra a **narrativa compartilhada** -- qual história as pessoas já contam a si mesmas
4. Articule a **faísca do movimento** -- o insight cristalizado que aciona a ação
5. Valide a faísca em relação ao framework de Análise Fenomenológica
6. Entregue `spark-analysis.md` com os achados

**Checkpoint:** o movement-chief revisa a validade da faísca antes de prosseguir

### Fase 2: Identidade (identitario)

1. Defina o **sistema de crenças** -- crenças centrais que unem os membros
2. Projete **marcadores tribais** -- linguagem, símbolos, identidade visual, rituais
3. Estabeleça a **Pilha de Identidade**: valores > crenças > comportamentos > símbolos > rituais
4. Crie **sinais de grupo interno** -- como os membros se reconhecem
5. Defina a **fronteira do grupo externo** -- contra o que o movimento se posiciona
6. Entregue `identity-architecture.md` com o framework de identidade completo

**Checkpoint:** o movement-chief valida a coerência da identidade com a faísca

### Fase 3: Ignição (manifestador)

1. Rascunhe o **manifesto** usando a anatomia de 7 componentes
2. Defina a **história de origem** -- mitologize o momento fundador
3. Crie o **grito de guerra** -- uma única frase que mobiliza
4. Projete o **primeiro ritual** -- a experiência de entrada para novos membros
5. Semeie o **círculo fundador** -- identifique e recrute os 10 primeiros crentes
6. Entregue `manifesto.md` e `ignition-plan.md`

**Checkpoint:** o movement-chief aprova o alinhamento do manifesto com a identidade

### Fase 4: Crescimento (estrategista-de-ciclo)

1. Projete o **Volante de Crescimento**: Atrair > Ativar > Sustentar > Multiplicar
2. Planeje os **canais de atração** -- onde encontrar futuros crentes
3. Crie **rituais de ativação** -- como recém-chegados se tornam membros ativos
4. Construa a **mecânica de sustentação** -- ciclos de engajamento, cadência de conteúdo, eventos
5. Projete os **gatilhos de multiplicação** -- como os membros recrutam novos membros
6. Entregue `growth-strategy.md` com detalhes do volante e cronograma

**Checkpoint:** o movement-chief valida a viabilidade do plano de crescimento

### Fase 5: Impacto (analista-de-impacto)

1. Defina a **Pirâmide de Impacto** -- 5 níveis, da consciência à transformação
2. Estabeleça **métricas por nível** -- indicadores quantitativos e qualitativos
3. Projete o **painel de saúde da comunidade** -- engajamento, sentimento, taxa de crescimento
4. Calcule o **Índice de Vitalidade** -- pontuação composta de saúde
5. Crie a **cadência de relatórios** -- pulso semanal, mergulho mensal, revisão trimestral
6. Entregue `impact-framework.md` com métricas e plano de medição

**Checkpoint:** o movement-chief aprova a completude do framework de impacto

## Formato de Saída

```yaml
movement_build:
  name: "{nome do movimento}"
  cause: "{resumo da causa}"
  spark: "{insight da faísca em uma linha}"
  identity:
    core_belief: "{crença central}"
    battle_cry: "{uma frase}"
    tribal_markers: ["{marcador1}", "{marcador2}", "{marcador3}"]
  manifesto_status: "complete"
  growth_flywheel: "{atrair > ativar > sustentar > multiplicar}"
  impact_metrics:
    vitality_index: "{pontuação}/100"
    primary_kpi: "{métrica}"
  deliverables:
    - spark-analysis.md
    - identity-architecture.md
    - manifesto.md
    - ignition-plan.md
    - growth-strategy.md
    - impact-framework.md
  status: "{complete|in-progress|blocked}"
```

## Condições de Veto

1. **NUNCA pule a fase da Faísca** -- todo movimento precisa começar com uma experiência compartilhada genuína
2. **NUNCA avance para a Identidade sem uma faísca validada** -- identidade construída sobre premissas falsas colapsa
3. **NUNCA escreva um manifesto antes de a identidade estar definida** -- manifestos expressam identidade, não a criam
4. **NUNCA lance o crescimento sem um manifesto** -- crescimento sem mensagem é ruído
5. **NUNCA meça o impacto sem métricas definidas** -- a medição exige um framework primeiro

## Critérios de Conclusão

- [ ] Análise da faísca concluída e validada pelo movement-chief
- [ ] Arquitetura de identidade definida com Pilha de Identidade completa
- [ ] Manifesto escrito com todos os 7 componentes
- [ ] Volante de crescimento projetado com todas as 4 fases
- [ ] Pirâmide de impacto definida com métricas por nível
- [ ] Fórmula do Índice de Vitalidade estabelecida
- [ ] Todos os 6 documentos entregáveis produzidos
- [ ] Coerência ponta a ponta validada (a faísca atravessa até o impacto)
