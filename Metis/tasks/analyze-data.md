---
task: analyzeData()
responsavel: "@avinash-kaushik"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: business
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: channels
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: analytics_framework
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] DMMM aplicado com objetivos, metas, KPIs, alvos"
  - "[ ] OMTM identificado"
  - "[ ] Dashboard projetado com linha de Ações"
---

# Tarefa: Analisar Dados

**Task ID:** DATA-001
**Versão:** 1.0.0
**Comando:** `*analyze-data`
**Agente:** Avinash Kaushik (avinash-kaushik)
**Propósito:** Projetar frameworks de analytics e dashboards usando o Digital Marketing and Measurement Model (DMMM)

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|-------|--------|----------|-------------|
| `business` | Prompt do usuário | Sim | Descrição e objetivos do negócio |
| `channels` | Prompt do usuário | Sim | Canais digitais ativos (web, social, e-mail, etc.) |
| `current_tracking` | Usuário | Não | Ferramentas de analytics existentes e o que é rastreado hoje |
| `audience_segments` | Usuário | Não | Segmentos de público conhecidos |
| `stage` | Usuário | Não | Estágio do negócio: pré-lançamento, crescimento, maturidade |

## Pré-condições

- Objetivos de negócio definidos (mesmo que em alto nível)
- Pelo menos um canal digital ativo
- Frameworks de métricas carregados (`data/metrics-frameworks.yaml`)

## Fases de Execução

### Fase 1: Definir Perguntas de Negócio

1. Identifique as **3-5 perguntas de negócio críticas** que o stakeholder precisa responder
2. Mapeie cada pergunta para um estágio do **See-Think-Do-Care**:
   - **See:** O maior público qualificado endereçável
   - **Think:** Público com alguma intenção comercial
   - **Do:** Público com forte intenção comercial
   - **Care:** Clientes existentes (2+ transações)
3. Priorize as perguntas pelo impacto nas decisões de negócio
4. Identifique **quais decisões mudarão** com base nas respostas
5. Rejeite perguntas de vaidade -- se a resposta não mudar uma decisão, ela não importa

### Fase 2: Selecionar Métricas (DMMM)

1. Para cada pergunta de negócio, aplique o **Digital Marketing and Measurement Model**:
   - **Objetivo de Negócio** -- o que queremos alcançar
   - **Meta** -- alvo específico e mensurável
   - **KPI** -- métrica que indica progresso rumo à meta
   - **Alvo** -- limiar numérico para o sucesso
   - **Segmento** -- a qual fatia de público isto se aplica
2. Aplique o **teste "E daí? (So What?)"** a toda métrica -- se você não consegue dizer qual ação tomaria, remova-a
3. Limite-se a **10-15 KPIs no total** entre todos os objetivos (regra 10/90 de Kaushik)
4. Garanta uma combinação de métricas de **aquisição, comportamento e resultado**
5. Defina a **única métrica que mais importa** (OMTM) para este período

### Fase 3: Projetar Dashboard

1. Estruture o dashboard usando o framework **See-Think-Do-Care**
2. Para cada estágio, mostre:
   - **KPI principal** com tendência (subindo/descendo/estável)
   - **Métricas de apoio** (2-3 no máximo)
   - **Comparação** -- período a período ou segmento a segmento
3. Inclua a **linha de "Ações"** -- o que deve ser feito com base nos dados atuais
4. Aplique os princípios de dashboard de Kaushik:
   - Não mais que 1 página por público
   - Toda métrica tem uma anotação de "e daí"
   - Inclua pelo menos um benchmark competitivo
5. Defina a frequência de atualização (tempo real, diária, semanal)

### Fase 4: Implementar Rastreamento

1. Mapeie cada KPI para uma **fonte de dados** (GA4, CRM, analytics de redes sociais, etc.)
2. Defina os **eventos de rastreamento** necessários para as métricas de comportamento
3. Crie um documento de **plano de medição**:
   - Nome do evento, gatilho, parâmetros, fonte
4. Identifique as **lacunas de dados** -- métricas que queremos mas ainda não conseguimos medir
5. Priorize o fechamento de lacunas pelo impacto na qualidade da decisão

## Formato de Saída

```yaml
analytics_framework:
  business: "{name}"
  business_questions: ["{q1}", "{q2}", "{q3}"]
  omtm: "{one metric that matters most}"
  stdc_metrics:
    see: {kpi: "", target: "", source: ""}
    think: {kpi: "", target: "", source: ""}
    do: {kpi: "", target: "", source: ""}
    care: {kpi: "", target: "", source: ""}
  total_kpis: {number}
  dashboard:
    pages: {number}
    refresh: "{real-time|daily|weekly}"
    sections: ["{section1}", "{section2}"]
  tracking_plan:
    events_defined: {number}
    data_gaps: ["{gap1}", "{gap2}"]
  deliverables:
    - analytics-framework.md
    - dashboard-design.md
    - tracking-plan.md
```

## Condições de Veto

1. **NUNCA inclua uma métrica sem o teste "E daí? (So What?)"** -- toda métrica deve impulsionar uma decisão
2. **NUNCA ultrapasse 15 KPIs no total** -- sobrecarga de métricas destrói o foco
3. **NUNCA construa um dashboard sem a linha de Ações** -- dados sem ação são decoração
4. **NUNCA rastreie sem um plano de medição** -- rastreamento ad-hoc cria dados não confiáveis
5. **NUNCA pule os benchmarks competitivos** -- dados internos sem contexto não têm sentido

## Critérios de Conclusão

- [ ] 3-5 perguntas de negócio definidas e mapeadas para See-Think-Do-Care
- [ ] DMMM aplicado com objetivos, metas, KPIs, alvos, segmentos
- [ ] OMTM (One Metric That Matters) identificado
- [ ] Dashboard projetado com no máximo 15 KPIs e linha de Ações
- [ ] Plano de rastreamento criado com eventos e fontes de dados
- [ ] Lacunas de dados identificadas e priorizadas
- [ ] Saída em conformidade com o schema acima
