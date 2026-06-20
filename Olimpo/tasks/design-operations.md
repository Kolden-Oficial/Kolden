---
task: designOperations()
responsavel: "@coo-orchestrator"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: company
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: team_structure
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: operational_design
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Processos centrais identificados e mapeados"
  - "[ ] Os 3 principais gargalos identificados com impacto quantificado"
  - "[ ] Framework de OKR esboçado para o trimestre atual"
---

# Tarefa: Desenhar Operações

**ID da Tarefa:** CLEVEL-002
**Versão:** 1.0.0
**Comando:** `*design-operations`
**Agente:** COO Orchestrator (coo-orchestrator)
**Propósito:** Desenhar a excelência operacional por meio de mapeamento de processos, eliminação de gargalos, frameworks de OKR e cadência de execução

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `company` | Prompt do usuário | Sim | Nome da empresa e contexto operacional atual |
| `strategic_pillars` | vision-chief | Não | Pilares estratégicos da tarefa set-vision |
| `team_structure` | Usuário | Sim | Tamanho atual do time, papéis, departamentos |
| `pain_points` | Usuário | Não | Desafios operacionais e gargalos conhecidos |
| `tools` | Usuário | Não | Ferramentas operacionais atuais (PM, CRM, comunicação, etc.) |

## Pré-condições

- A empresa tem ao menos uma estrutura de time básica
- Existe direção estratégica (mesmo que informal)
- Frameworks executivos carregados (`data/executive-frameworks.yaml`)

## Fases de Execução

### Fase 1: Mapear Processos

1. Identifique os **5-7 processos de negócio centrais** (atividades que criam valor):
   - Vendas/geração de receita
   - Entrega de produto/serviço
   - Suporte/sucesso do cliente
   - Contratação e onboarding
   - Operações financeiras
   - Marketing e crescimento
2. Para cada processo, mapeie:
   - **Etapas:** Atividades sequenciais do gatilho ao resultado
   - **Donos:** Quem é responsável por cada etapa
   - **Transferências:** Onde o trabalho passa entre pessoas/times
   - **Ferramentas:** Sistemas usados em cada etapa
   - **SLAs:** Tempo esperado para cada etapa
3. Identifique a **maturidade do processo** para cada um:
   - Ad-hoc (sem processo definido)
   - Definido (documentado mas inconsistente)
   - Gerenciado (medido e monitorado)
   - Otimizado (continuamente melhorado)
4. Documente o mapa de processos do estado atual

### Fase 2: Identificar Gargalos

1. Para cada processo central, identifique:
   - **Gargalos:** Onde o trabalho se acumula ou desacelera
   - **Pontos únicos de falha:** Etapas que dependem de uma única pessoa
   - **Desperdício:** Etapas que adicionam tempo mas não valor (pensamento Lean)
   - **Loops de retrabalho:** Onde erros causam esforço repetido
2. Quantifique o impacto de cada gargalo:
   - Custo de tempo (horas/semana perdidas)
   - Impacto na receita (negócios atrasados, clientes esperando)
   - Impacto na moral do time (frustração, risco de burnout)
3. Priorize os gargalos usando a matriz **Impacto vs Esforço**:
   - Vitórias rápidas (alto impacto, baixo esforço): Faça primeiro
   - Projetos estratégicos (alto impacto, alto esforço): Planeje com cuidado
   - Preenchimentos (baixo impacto, baixo esforço): Delegue
   - Sumidouros de tempo (baixo impacto, alto esforço): Elimine
4. Selecione os **3 principais gargalos** para ação imediata
5. Desenhe soluções para cada um (automação, contratação, redesenho de processo, troca de ferramenta)

### Fase 3: Desenhar OKRs

1. Crie a **Arquitetura de OKR** alinhada aos pilares estratégicos:
   - **OKRs da empresa:** 3-5 objetivos para o trimestre
   - **OKRs de time:** 2-3 objetivos por time, alinhados para cima
   - **OKRs individuais:** 2-3 por pessoa (opcional no estágio inicial)
2. Para cada objetivo:
   - Escreva como um **resultado aspiracional** (não uma tarefa)
   - Defina **2-3 Resultados-Chave** que sejam mensuráveis e com prazo definido
   - Estabeleça o **nível de confiança** no início (tipicamente 50% para metas ambiciosas)
   - Atribua um **dono** (uma pessoa, mesmo para OKRs de time)
3. Aplique as boas práticas de OKR:
   - 60% de cima para baixo, 40% de baixo para cima
   - Pontue de 0,0-1,0 (0,7 é sucesso para metas ambiciosas)
   - Separe os OKRs comprometidos (obrigatórios) dos aspiracionais (ambiciosos)
   - OKRs NÃO são vinculados à remuneração
4. Crie o **template de acompanhamento de OKR**

### Fase 4: Implementar Cadência

1. Desenhe a **Cadência Operacional** (ritmo de reuniões):
   - **Diária:** Standup de 15 min (o que fiz, o que farei, bloqueios)
   - **Semanal:** Sync de time de 60 min (revisão de métricas, prioridades, decisões)
   - **Mensal:** Revisão de negócio de 90 min (progresso de OKR, saúde financeira)
   - **Trimestral:** Sessão de estratégia de meio dia (pontuação de OKR, planejamento do próximo trimestre)
   - **Anual:** Offsite de dia inteiro (revisão de visão, planejamento anual)
2. Para cada reunião de cadência, defina:
   - **Template de pauta** (formato padrão)
   - **Participantes** (quem precisa estar presente)
   - **Decisões esperadas** (o que é resolvido)
   - **Artefatos** (o que é produzido/atualizado)
3. Desenhe o **Protocolo de Escalonamento**:
   - Nível 1: Líder de time resolve em 24h
   - Nível 2: Chefe de departamento resolve em 48h
   - Nível 3: C-level resolve em 72h
   - Nível 4: CEO imediato (crise voltada ao cliente, jurídica, de segurança)
4. Crie o **Dashboard Operacional** com:
   - Progresso de OKR (vermelho/amarelo/verde)
   - Métricas de saúde de processo
   - Capacidade e utilização do time
   - Indicadores financeiros-chave
5. Defina o **loop de melhoria contínua** -- como as operações evoluem trimestralmente

## Formato de Saída

```yaml
operational_design:
  company: "{name}"
  core_processes: {count: 0, mapped: 0, maturity_avg: ""}
  bottlenecks:
    identified: {number}
    top_3: ["{bottleneck1}", "{bottleneck2}", "{bottleneck3}"]
    estimated_time_saved: "{hours/week}"
  okr_framework:
    company_objectives: {number}
    team_objectives: {number}
    quarter: "{Q1/Q2/Q3/Q4 YYYY}"
  cadence:
    daily: "standup de 15 min"
    weekly: "sync de time de 60 min"
    monthly: "revisão de negócio de 90 min"
    quarterly: "estratégia de meio dia"
  deliverables:
    - process-map.md
    - bottleneck-analysis.md
    - okr-framework.md
    - operating-cadence.md
    - operational-dashboard.md
```

## Condições de Veto

1. **NUNCA desenhe OKRs sem entender os processos atuais** -- OKRs medem resultados, não consertam processos quebrados
2. **NUNCA implemente todas as reuniões de cadência de uma vez em um time pequeno** -- comece com semanal e mensal, adicione conforme necessário
3. **NUNCA vincule OKRs à remuneração** -- isto destrói a cultura de metas ambiciosas
4. **NUNCA ignore a capacidade do time ao definir OKRs** -- metas ambiciosas não devem significar burnout
5. **NUNCA mapeie processos sem conversar com as pessoas que fazem o trabalho** -- desenho de processo de torre de marfim fracassa

## Critérios de Conclusão

- [ ] 5-7 processos centrais identificados e mapeados
- [ ] Maturidade de processo avaliada para cada um
- [ ] Os 3 principais gargalos identificados com impacto quantificado
- [ ] Soluções desenhadas para os gargalos prioritários
- [ ] OKRs de empresa e de time esboçados para o trimestre atual
- [ ] Cadência operacional desenhada com templates de pauta
- [ ] Protocolo de escalonamento definido (4 níveis)
- [ ] Dashboard operacional desenhado
- [ ] A saída corresponde ao schema acima
