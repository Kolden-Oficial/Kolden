---
task: setVision()
responsavel: "@zeus"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: company
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: industry
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: strategic_vision
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Declarações de missão e visão elaboradas"
  - "[ ] 3-5 pilares estratégicos definidos com OKRs"
  - "[ ] Roadmap de 3 anos criado com temas anuais"
---

# Tarefa: Definir Visão

**ID da Tarefa:** CLEVEL-001
**Versão:** 1.0.0
**Comando:** `*set-vision`
**Agente:** Zeus (zeus)
**Propósito:** Definir a visão, a missão e os pilares estratégicos da empresa e criar um roadmap plurianual

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `company` | Prompt do usuário | Sim | Nome e descrição da empresa |
| `industry` | Prompt do usuário | Sim | Setor ou segmento de mercado |
| `current_state` | Usuário | Sim | Estágio atual, receita, tamanho do time, desafios |
| `ambition` | Usuário | Não | Onde o fundador quer estar em 3-5 anos |
| `existing_mission` | Usuário | Não | Quaisquer declarações de missão/visão existentes |

## Pré-condições

- A empresa existe ou está em pré-lançamento com um conceito definido
- Um stakeholder com autoridade de decisão está engajado
- Frameworks executivos carregados (`data/executive-frameworks.yaml`)

## Fases de Execução

### Fase 1: Avaliar o Estado Atual

1. Conduza uma **avaliação situacional estratégica**:
   - Onde estamos agora? (receita, time, produto, posição de mercado)
   - Quais são nossas forças e fossos?
   - Quais são nossas vulnerabilidades críticas?
   - Que forças externas estão moldando nosso setor?
2. Aplique a análise das **5 Forças de Porter**:
   - Intensidade da rivalidade competitiva
   - Ameaça de novos entrantes
   - Ameaça de substitutos
   - Poder de barganha dos fornecedores
   - Poder de barganha dos compradores
3. Identifique a **lacuna estratégica** -- distância entre o estado atual e a ambição
4. Avalie a **prontidão organizacional** para a transformação
5. Documente os achados em um resumo de avaliação estratégica

### Fase 2: Definir Missão e Visão

1. Elabore a **Declaração de Missão** (por que existimos hoje):
   - Formato: "Nós [ação] para [público] por meio de [método] para que [resultado]"
   - Deve ser específica o bastante para guiar decisões diárias
   - Deve ser ampla o bastante para permitir crescimento
2. Elabore a **Declaração de Visão** (para onde estamos indo):
   - Formato: "Um mundo onde [estado futuro desejado]"
   - Horizonte: 5-10 anos
   - Deve ser inspiradora, porém alcançável
3. Defina os **Valores Centrais** (3-5 valores):
   - Cada valor deve ter uma definição comportamental
   - Os valores devem ser distintivos (não platitudes corporativas genéricas)
   - Teste: "Sacrificaríamos lucro de curto prazo por este valor?"
4. Crie a **Cascata Visão-Missão-Estratégia**:
   - Visão (porquê) > Missão (o quê) > Estratégia (como) > Táticas (quando/onde)
5. Valide: um novo funcionário lendo isto sabe o que priorizar?

### Fase 3: Definir Pilares Estratégicos

1. Defina **3-5 Pilares Estratégicos** -- as grandes apostas para os próximos 3 anos:
   - Cada pilar deve se conectar diretamente à visão
   - Cada pilar deve ser mensurável com resultados claros
   - Os pilares devem cobrir coletivamente a lacuna estratégica
2. Para cada pilar, defina:
   - **Objetivo:** O que queremos alcançar
   - **Resultados-Chave:** 2-3 resultados mensuráveis (estilo OKR)
   - **Dono:** Qual papel C-level lidera este pilar
   - **Cronograma:** Marcos de 12 meses
   - **Dependências:** O que precisa ser verdade para isto ter sucesso
3. Aplique a **Matriz BCG** às ofertas atuais e planejadas:
   - Estrelas (alto crescimento, alta participação): invista
   - Vacas Leiteiras (baixo crescimento, alta participação): colha
   - Pontos de Interrogação (alto crescimento, baixa participação): decida
   - Abacaxis (baixo crescimento, baixa participação): desinvista
4. Identifique os **trade-offs estratégicos** -- o que NÃO faremos
5. Valide: os pilares fecham coletivamente a lacuna estratégica?

### Fase 4: Criar o Roadmap

1. Construa um **roadmap estratégico de 3 anos**:
   - Ano 1: Fundação (construir capacidades, alcançar marcos)
   - Ano 2: Escala (crescer o que funciona, cortar o que não funciona)
   - Ano 3: Transformação (alcançar impacto em nível de visão)
2. Para cada ano, defina:
   - **Tema:** Uma palavra que captura o foco do ano
   - **Top 3 prioridades:** Resultados mais importantes
   - **Investimentos-chave:** Para onde os recursos fluirão
   - **Critérios de sucesso:** Como sabemos que estamos no caminho certo
3. Identifique os **pontos de inflexão estratégica** -- decisões que precisarão ser tomadas
4. Crie a **cadência de revisão trimestral** -- quando e como a estratégia é revisada
5. Defina os **gatilhos de pivot** -- condições que exigiriam revisão da estratégia

## Formato de Saída

```yaml
strategic_vision:
  company: "{name}"
  mission: "{declaração de missão}"
  vision: "{declaração de visão}"
  core_values: ["{value1}", "{value2}", "{value3}"]
  strategic_pillars:
    - name: "{pillar}"
      objective: "{o quê}"
      key_results: ["{kr1}", "{kr2}"]
      owner: "{papel c-level}"
      timeline: "{marcos}"
  porters_five_forces:
    rivalry: "{low|medium|high}"
    new_entrants: "{low|medium|high}"
    substitutes: "{low|medium|high}"
    supplier_power: "{low|medium|high}"
    buyer_power: "{low|medium|high}"
  roadmap:
    year_1: {theme: "", priorities: [], investments: []}
    year_2: {theme: "", priorities: [], investments: []}
    year_3: {theme: "", priorities: [], investments: []}
  review_cadence: "trimestral"
  deliverables:
    - strategic-assessment.md
    - vision-mission-values.md
    - strategic-pillars.md
    - 3-year-roadmap.md
```

## Condições de Veto

1. **NUNCA defina a visão sem avaliar o estado atual** -- visão sem fundamento é delírio
2. **NUNCA tenha mais de 5 pilares estratégicos** -- foco exige dizer não
3. **NUNCA pule os trade-offs** -- estratégia é tanto sobre o que você não fará
4. **NUNCA crie um roadmap sem pontos de revisão trimestrais** -- a estratégia deve se adaptar
5. **NUNCA escreva valores genéricos** -- "integridade" e "excelência" não significam nada sem definições comportamentais

## Critérios de Conclusão

- [ ] Estado atual avaliado com as 5 Forças de Porter
- [ ] Declaração de missão elaborada (específica e acionável)
- [ ] Declaração de visão elaborada (inspiradora e com prazo definido)
- [ ] 3-5 valores centrais definidos com descrições comportamentais
- [ ] 3-5 pilares estratégicos definidos com OKRs e donos
- [ ] Matriz BCG aplicada às ofertas
- [ ] Roadmap de 3 anos criado com temas anuais
- [ ] Gatilhos de pivot e cadência de revisão definidos
- [ ] A saída corresponde ao schema acima
