---
task: evaluateTechnology()
responsavel: "@cto-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: company
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: current_stack
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: technology_strategy
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Stack atual inventariado em todas as camadas"
  - "[ ] Technology Radar construído com 4 anéis"
  - "[ ] Roadmap de tecnologia de 12 meses criado"
---

# Tarefa: Avaliar Tecnologia

**ID da Tarefa:** CLEVEL-004
**Versão:** 1.0.0
**Comando:** `*evaluate-technology`
**Agente:** CTO Architect (cto-architect)
**Propósito:** Avaliar a estratégia de tecnologia, incluindo avaliação do stack atual, technology radar, registros de decisão arquitetural e análise de build vs buy

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `company` | Prompt do usuário | Sim | Nome da empresa e descrição do produto |
| `current_stack` | Usuário | Sim | Stack de tecnologia e infraestrutura atuais |
| `team` | Usuário | Sim | Tamanho, habilidades e estrutura do time de engenharia |
| `challenges` | Usuário | Não | Desafios técnicos ou dívida conhecidos |
| `strategic_pillars` | vision-chief | Não | Pilares estratégicos que a tecnologia deve sustentar |

## Pré-condições

- A tecnologia existe ou está sendo planejada
- Existe time de engenharia ou liderança técnica
- Frameworks executivos carregados (`data/executive-frameworks.yaml`)

## Fases de Execução

### Fase 1: Avaliar o Stack Atual

1. Inventarie o **cenário de tecnologia atual**:
   - Frontend: Linguagens, frameworks, ferramentas de build
   - Backend: Linguagens, frameworks, APIs
   - Dados: Bancos de dados, caches, filas de mensagens
   - Infraestrutura: Provedor de cloud, CI/CD, monitoramento
   - Terceiros: Ferramentas SaaS, APIs, integrações
2. Avalie cada tecnologia em relação a 5 dimensões:
   - **Adequação:** Resolve bem o problema?
   - **Escalabilidade:** Aguenta crescimento de 10x?
   - **Manutenibilidade:** É fácil de atualizar e depurar?
   - **Disponibilidade de talento:** Conseguimos contratar para isto?
   - **Saúde da comunidade:** O ecossistema está crescendo ou morrendo?
3. Calcule a **pontuação de dívida técnica** (1-10 por área):
   - Dívida de código: Código legado, duplicação, testes ausentes
   - Dívida de arquitetura: Problemas de monólito, acoplamento, padrões ausentes
   - Dívida de infraestrutura: Processos manuais, automação ausente
   - Dívida de documentação: Documentação ausente ou desatualizada
4. Identifique **riscos críticos** -- pontos únicos de falha, lacunas de segurança, problemas de conformidade
5. Documente os achados em um relatório de avaliação de tecnologia

### Fase 2: Technology Radar

1. Construa um **Technology Radar** com 4 anéis:
   - **Adotar:** Comprovada, recomendada para uso amplo
   - **Testar:** Vale a pena perseguir, comprovada em contexto limitado
   - **Avaliar:** Vale a pena explorar, entender o impacto
   - **Reter:** Prossiga com cautela, não inicie novo trabalho
2. Categorize as tecnologias em 4 quadrantes:
   - **Linguagens e Frameworks**
   - **Ferramentas e Infraestrutura**
   - **Plataformas e Serviços**
   - **Técnicas e Padrões**
3. Posicione as tecnologias atuais e candidatas no radar
4. Para cada tecnologia em Testar/Avaliar:
   - Por que é interessante
   - Que problema ela resolve
   - Risco de adoção
   - Abordagem de avaliação recomendada
5. Para cada tecnologia em Reter:
   - Por que está sendo retida
   - Caminho de migração (se em uso ativo)
6. Cadência de atualização: revisão trimestral

### Fase 3: Registros de Decisão Arquitetural (ADR)

1. Crie o **template de ADR** para a organização:
   - Título: Título curto e descritivo
   - Status: Proposto / Aceito / Descontinuado / Superado
   - Contexto: Qual é a situação e o problema?
   - Decisão: Qual é a decisão tomada?
   - Consequências: Quais são os resultados positivos e negativos?
   - Alternativas: Que outras opções foram consideradas?
2. Documente as **decisões implícitas existentes** como ADRs:
   - Por que o framework atual foi escolhido?
   - Por que este provedor de cloud?
   - Por que este banco de dados?
   - Por que este padrão de arquitetura?
3. Para cada decisão de tecnologia pendente, crie um **ADR de Decisão**:
   - Aplique a **Matriz Construir-Comprar-Parceria**:
     - Construir: Diferencial central, requisitos únicos, capacidade do time
     - Comprar: Commodity, bem atendida pelo mercado, tempo até o mercado mais rápido
     - Parceria: Valor estratégico, integração de ecossistema, risco compartilhado
   - Pontue cada opção em: custo, tempo, risco, valor estratégico, carga de manutenção
4. Estabeleça o **processo de revisão de ADR** -- quem aprova, quando revisitar

### Fase 4: Roadmap de Tecnologia

1. Alinhe o roadmap de tecnologia aos **pilares estratégicos**:
   - Para cada pilar estratégico, identifique os habilitadores de tecnologia
   - Para cada habilitador de tecnologia, defina o cronograma de implementação
2. Defina a recomendação de **Construir vs Comprar** para cada componente principal
3. Crie o **roadmap de tecnologia de 12 meses**:
   - Trimestre 1: Fundação (consertar dívida crítica, estabelecer padrões)
   - Trimestre 2: Capacidade (construir novas capacidades alinhadas à estratégia)
   - Trimestre 3: Escala (preparar para crescimento, otimizar desempenho)
   - Trimestre 4: Inovação (explorar novas tecnologias, prototipar)
4. Defina a **alocação de investimento de engenharia**:
   - Desenvolvimento de funcionalidades: X%
   - Dívida técnica: Y%
   - Inovação/P&D: Z%
   - Recomendado: 70/20/10 para estágio de crescimento
5. Estabeleça os **KPIs de tecnologia**:
   - Frequência de deploy
   - Lead time para mudanças
   - Tempo médio de recuperação (MTTR)
   - Taxa de falha de mudanças
   - Pontuação de satisfação dos desenvolvedores

## Formato de Saída

```yaml
technology_strategy:
  company: "{name}"
  current_stack:
    frontend: ["{tech1}", "{tech2}"]
    backend: ["{tech1}", "{tech2}"]
    data: ["{tech1}", "{tech2}"]
    infrastructure: ["{tech1}", "{tech2}"]
  tech_debt_score: "{média de 1-10}"
  critical_risks: ["{risk1}", "{risk2}"]
  technology_radar:
    adopt: ["{tech1}", "{tech2}"]
    trial: ["{tech1}"]
    assess: ["{tech1}"]
    hold: ["{tech1}"]
  adrs:
    documented: {number}
    pending_decisions: {number}
  investment_allocation:
    features: "{%}"
    tech_debt: "{%}"
    innovation: "{%}"
  roadmap:
    q1: "{tema e prioridades}"
    q2: "{tema e prioridades}"
    q3: "{tema e prioridades}"
    q4: "{tema e prioridades}"
  deliverables:
    - technology-assessment.md
    - technology-radar.md
    - adr-log/
    - tech-roadmap.md
    - build-buy-analysis.md
```

## Condições de Veto

1. **NUNCA adote nova tecnologia sem um ADR** -- decisões não documentadas assombram times futuros
2. **NUNCA ignore a alocação de dívida técnica** -- 100% de desenvolvimento de funcionalidades cria dívida composta
3. **NUNCA escolha tecnologia com base no hype** -- adequação ao propósito é o único critério válido
4. **NUNCA construa o que você pode comprar para funções commodity** -- tempo de engenharia é o recurso mais escasso
5. **NUNCA pule a avaliação de disponibilidade de talento** -- a melhor tecnologia é inútil se você não consegue contratar para ela

## Critérios de Conclusão

- [ ] Stack atual inventariado em todas as camadas
- [ ] Dívida técnica pontuada (1-10) por área
- [ ] Riscos críticos identificados
- [ ] Technology Radar construído com 4 anéis e 4 quadrantes
- [ ] Ao menos 3 ADRs documentados (decisões existentes)
- [ ] Análise de Construir vs Comprar para componentes principais
- [ ] Roadmap de tecnologia de 12 meses alinhado aos pilares estratégicos
- [ ] Alocação de investimento de engenharia definida
- [ ] KPIs de tecnologia estabelecidos (métricas DORA)
- [ ] A saída corresponde ao schema acima
