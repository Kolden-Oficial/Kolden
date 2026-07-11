---
task: createIdentity()
responsavel: "@identitario"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: spark_analysis
    tipo: string
    origem: Phase 1 Output
    obrigatorio: true
  - campo: cause
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: identity_architecture
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Sistema de crenças definido com convicção central"
  - "[ ] Marcadores tribais projetados em todas as categorias"
  - "[ ] Gradiente de pertencimento definido com 5 níveis"
tipo: nota
area: Dionisio
up: "[[Dionisio/_MOC-dionisio]]"
relacionado:
  - "[[Dionisio/tasks/_indice|_indice]]"
---

# Tarefa: Criar Identidade

**ID da Tarefa:** MOVEMENT-003
**Versão:** 1.0.0
**Comando:** `*create-identity`
**Agente:** Identitario (identitario)
**Propósito:** Arquitetar o sistema de identidade completo de um movimento, incluindo crenças, marcadores, rituais e sinais

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `spark_analysis` | Saída da Fase 1 | Sim | Análise fenomenológica com faísca validada |
| `cause` | Prompt do usuário | Sim | A causa ou propósito do movimento |
| `audience` | Prompt do usuário | Sim | Descrição da comunidade-alvo |
| `existing_brand` | Usuário | Não | Ativos de marca existentes a incorporar |
| `cultural_context` | Usuário | Não | Normas e sensibilidades culturais |

## Pré-condições

- Análise da faísca concluída e validada (MOVEMENT-002 ou Fase 1 do MOVEMENT-001)
- Frameworks de movimento carregados (`data/movement-frameworks.yaml`)
- Intensidade da tensão coletiva >= 3 (grau-movimento)

## Fases de Execução

### Fase 1: Definir o Sistema de Crenças

1. Extraia os **valores centrais** da análise da faísca (3-5 valores)
2. Traduza os valores em **crenças** -- "Nós acreditamos que..."
3. Defina a **convicção central** -- a única crença inegociável
4. Estabeleça a **hierarquia de crenças**: fundacional > de apoio > aspiracional
5. Crie o **fragmento de manifesto de crenças** -- 3-5 declarações de crença
6. Teste: um estranho consegue ler essas crenças e saber imediatamente se pertence

### Fase 2: Projetar os Marcadores Tribais

1. Defina **marcadores de linguagem** -- palavras, frases e jargões exclusivos do movimento
2. Projete a **identidade visual** -- cores, símbolos, direção do logo, estética
3. Crie **marcadores comportamentais** -- ações que sinalizam pertencimento
4. Estabeleça **marcadores de status** -- como os membros mostram a profundidade do compromisso
5. Projete **rituais de saudação/reconhecimento** -- como os membros se reconhecem
6. Construa o **Inventário de Marcadores** com diretrizes de uso

### Fase 3: Criar os Rituais

1. Projete o **ritual de iniciação** -- a experiência de entrada para novos membros
2. Crie **rituais diários** -- pequenas práticas repetidas que reforçam a identidade
3. Projete **rituais de encontro** -- o que acontece quando a comunidade se reúne
4. Estabeleça **rituais de celebração** -- como vitórias e marcos são marcados
5. Crie **rituais de narração** -- como os membros compartilham experiências e depoimentos
6. Mapeie os rituais para o framework de **Arquitetura de Rituais**: frequência, formato, arco emocional

### Fase 4: Estabelecer os Sinais de Grupo Interno

1. Defina a fronteira **nós vs eles** -- clara mas não hostil
2. Crie **sinais de reconhecimento** -- como os membros se identificam em campo aberto
3. Projete **referências internas** -- conhecimento compartilhado que une os membros
4. Estabeleça **marcadores de lealdade** -- como os membros de longa data são reconhecidos
5. Crie o **gradiente de pertencimento** -- do forasteiro curioso ao crente do núcleo
6. Defina **regras de fronteira** -- quais comportamentos levam à exclusão

## Formato de Saída

```yaml
identity_architecture:
  movement: "{nome}"
  identity_stack:
    values: ["{valor1}", "{valor2}", "{valor3}"]
    beliefs:
      central: "{declaração de crença central}"
      supporting: ["{crença1}", "{crença2}"]
      aspirational: ["{crença3}"]
    behaviors: ["{comportamento1}", "{comportamento2}", "{comportamento3}"]
    symbols: ["{símbolo1}", "{símbolo2}", "{símbolo3}"]
    rituals: ["{ritual1}", "{ritual2}", "{ritual3}"]
  tribal_markers:
    language: ["{termo1}", "{termo2}", "{termo3}"]
    visual: "{descrição estética}"
    behavioral: ["{ação1}", "{ação2}"]
    status: ["{nível1}", "{nível2}", "{nível3}"]
  ritual_architecture:
    initiation: "{descrição}"
    daily: "{descrição}"
    gathering: "{descrição}"
    celebration: "{descrição}"
    storytelling: "{descrição}"
  belonging_gradient:
    - level: "Curioso"
      description: "{o que define este nível}"
    - level: "Simpatizante"
      description: "{o que define este nível}"
    - level: "Membro"
      description: "{o que define este nível}"
    - level: "Defensor"
      description: "{o que define este nível}"
    - level: "Crente do Núcleo"
      description: "{o que define este nível}"
  boundary:
    inclusion_criteria: "{o que faz alguém pertencer}"
    exclusion_triggers: ["{gatilho1}", "{gatilho2}"]
```

## Condições de Veto

1. **NUNCA construa identidade sem uma faísca validada** -- a identidade precisa crescer de uma experiência compartilhada real
2. **NUNCA crie identidade excludente baseada em demografia** -- movimentos unem em torno de crenças, não de traços de nascimento
3. **NUNCA projete rituais que exijam engano** -- a autenticidade é fundacional
4. **NUNCA pule o sistema de crenças** -- marcadores sem crenças são fantasia, não identidade
5. **NUNCA crie enquadramento hostil do grupo externo** -- defina "nós" positivamente, não "eles" negativamente

## Critérios de Conclusão

- [ ] Sistema de crenças definido com convicção central e hierarquia
- [ ] Marcadores tribais projetados em todas as categorias (linguagem, visual, comportamental, status)
- [ ] Pelo menos 5 rituais criados cobrindo da iniciação à celebração
- [ ] Gradiente de pertencimento definido com 5 níveis
- [ ] Sinais de grupo interno estabelecidos com mecânica de reconhecimento
- [ ] Regras de fronteira definidas (inclusão e exclusão)
- [ ] Coerência da identidade validada em relação à análise da faísca
- [ ] Saída corresponde ao esquema acima
