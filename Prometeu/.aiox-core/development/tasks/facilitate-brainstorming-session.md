---
id: facilitate-brainstorming-session
name: Facilitate Brainstorming Session
agent: aiox-master
category: collaboration
complexity: medium
tools:
  - clickup        # Capturar ideias e organizá-las
  - mcp            # Chamar agentes especializados para expertise de domínio
checklists:
  - aiox-master-checklist.md
---

# Facilitar Sessão de Brainstorming

## Propósito

Conduzir uma sessão de brainstorming estruturada com múltiplos agentes de IA (e, opcionalmente, participantes humanos) para gerar, categorizar e priorizar ideias para funcionalidades, soluções ou decisões estratégicas.

## Entrada

### Parâmetros Obrigatórios

- **topic**: `string`
  - **Descrição**: O desafio, a oportunidade ou a pergunta sobre a qual fazer o brainstorming
  - **Exemplo**: "Como podemos melhorar o onboarding de usuários no AIOX?"
  - **Validação**: Deve ter pelo menos 20 caracteres

- **session_goal**: `string`
  - **Descrição**: Qual resultado é desejado desta sessão
  - **Opções**: `"ideation"` (gerar muitas ideias), `"solution"` (resolver um problema), `"strategy"` (planejamento estratégico)
  - **Padrão**: `"ideation"`

### Parâmetros Opcionais

- **participating_agents**: `array<string>`
  - **Descrição**: IDs de agentes para convidar para a sessão
  - **Padrão**: Auto-seleção com base no tópico (usando análise breve)
  - **Exemplo**: `["po", "architect", "ux-expert", "github-devops"]`

- **time_limit**: `number`
  - **Descrição**: Duração da sessão em minutos
  - **Padrão**: `30`
  - **Faixa**: `10-60`

- **output_format**: `string`
  - **Descrição**: Como organizar a saída final
  - **Opções**: `"categorized"` (por tema), `"prioritized"` (por valor), `"actionable"` (com próximos passos)
  - **Padrão**: `"categorized"`

- **context_documents**: `array<string>`
  - **Descrição**: Caminhos de arquivo opcionais para contexto (PRD, backlog, documentos de arquitetura)
  - **Exemplo**: `["docs/prd.md", "docs/backlog.md"]`

## Saída

- **ideas**: `array<object>`
  - **Estrutura**: `{ id, text, source_agent, category, priority, rationale }`
  - **Descrição**: Todas as ideias geradas com metadados

- **categories**: `array<object>`
  - **Estrutura**: `{ name, ideas_count, top_ideas }`
  - **Descrição**: Ideias agrupadas por tema

- **prioritized_recommendations**: `array<object>`
  - **Estrutura**: `{ idea, value_score, effort_estimate, roi, next_steps }`
  - **Descrição**: As 5-10 melhores ideias com próximos passos acionáveis

- **session_summary**: `object`
  - **Estrutura**: `{ topic, duration, agents_participated, ideas_generated, key_insights }`
  - **Descrição**: Metadados e insights da sessão

- **clickup_board_url**: `string` (opcional)
  - **Descrição**: Quadro do ClickUp com as ideias organizadas (se a integração com o ClickUp estiver habilitada)

## Processo

### Fase 1: Configuração e Carregamento de Contexto (5 min)

1. **Carregar Contexto**
   - Se `context_documents` for fornecido, ler e resumir os pontos-chave
   - Extrair restrições, requisitos ou objetivos relevantes

2. **Selecionar Agentes Participantes**
   - Se `participating_agents` não for fornecido:
     - Analisar o tópico usando análise breve
     - Identificar domínios relevantes (ex.: "user onboarding" → ux-expert, po, copywriter)
     - Auto-selecionar de 3 a 5 agentes apropriados
   - Log: "✅ Participantes da sessão: [lista de agentes]"

3. **Definir a Estrutura da Sessão**
   - Com base em `session_goal`:
     - **Ideation**: Pensamento divergente (gerar o máximo de ideias)
     - **Solution**: Pensamento convergente (avaliar e refinar)
     - **Strategy**: Frameworks estruturados (SWOT, OKRs, etc.)

### Fase 2: Pensamento Divergente - Geração de Ideias (10-15 min)

4. **Rodada 1: Ideias Iniciais (5 min)**
   - Solicitar a cada agente: "Gere de 3 a 5 ideias para: {topic}"
   - Coletar as respostas
   - Sem avaliação ainda (brainstorming puro)

5. **Rodada 2: Construir sobre as Ideias (5 min)**
   - Compartilhar todas as ideias com os agentes
   - Solicitar: "Construa sobre ou remixe as ideias existentes. Gere de 2 a 3 novas ideias inspiradas no que você vê."
   - Coletar as respostas

6. **Rodada 3: Cartas Coringa (2 min)**
   - Solicitar: "Gere de 1 a 2 ideias não convencionais ou do tipo 'e se?'"
   - Encorajar a tomada de risco criativo

### Fase 3: Pensamento Convergente - Categorização (5-10 min)

7. **Categorizar Ideias**
   - Usar IA para identificar temas/padrões
   - Agrupar as ideias em 3 a 7 categorias
   - Exemplos de categorias: "Quick Wins", "Big Bets", "Research Needed", "Technical Solutions", "UX Improvements"

8. **Deduplicar e Mesclar**
   - Identificar ideias similares
   - Mesclar ou vincular conceitos relacionados

### Fase 4: Avaliação e Priorização (5-10 min)

9. **Pontuar Ideias** (se `output_format: "prioritized"`)
   - Critérios:
     - **Valor**: Impacto sobre usuários/negócio (1-10)
     - **Esforço**: Complexidade de desenvolvimento (1-10)
     - **ROI**: Razão Valor/Esforço
     - **Alinhamento**: Aderência à estratégia/objetivos (1-10)
   - Calcular as pontuações agregadas

10. **Selecionar as Melhores Ideias**
    - Identificar as 5-10 melhores ideias com base nas pontuações
    - Para cada uma, gerar:
      - **Justificativa**: Por que esta ideia é valiosa
      - **Próximos Passos**: Ações concretas para persegui-la

### Fase 5: Documentação e Acionabilidade (5 min)

11. **Criar Relatório da Sessão**
    - Resumo de todas as ideias
    - Visão categorizada
    - Recomendações priorizadas
    - Metadados da sessão

12. **Exportar para o ClickUp** (opcional)
    - Se a integração com o ClickUp estiver habilitada:
      - Criar o quadro: "Brainstorm: {topic}"
      - Adicionar ideias como tarefas com as categorias como tags
      - Vincular ao relatório da sessão

## Checklist

### Pré-condições

- [ ] O tópico é bem definido e específico o suficiente
  - **Validação**: `topic.length >= 20 && topic.includes('?') || topic.includes('how') || topic.includes('what')`
  - **Erro**: "Tópico muito vago. Forneça uma pergunta ou um desafio específico."

- [ ] O objetivo da sessão é válido
  - **Validação**: `["ideation", "solution", "strategy"].includes(session_goal)`

- [ ] Os agentes participantes existem (se fornecidos)
  - **Validação**: Verificar os IDs dos agentes contra os agentes disponíveis
  - **Erro**: "Agente '{agent_id}' não encontrado"

### Pós-condições

- [ ] Pelo menos 10 ideias geradas
  - **Validação**: `ideas.length >= 10`
  - **Erro**: "Ideias insuficientes. Estenda a sessão ou adicione mais agentes."

- [ ] Todas as ideias têm categorias
  - **Validação**: `ideas.every(i => i.category)`

- [ ] As 5 melhores ideias têm próximos passos
  - **Validação**: `prioritized_recommendations.slice(0, 5).every(r => r.next_steps)`

- [ ] O resumo da sessão está completo
  - **Validação**: `session_summary.ideas_generated > 0 && session_summary.agents_participated.length > 0`

### Critérios de Aceite

- [ ] A sessão produz recomendações acionáveis
  - **Tipo**: acceptance
  - **Verificação Manual**: true
  - **Critério**: O usuário consegue agir imediatamente sobre pelo menos 3 ideias

- [ ] As ideias são diversas e cobrem múltiplas perspectivas
  - **Tipo**: acceptance
  - **Verificação Manual**: false
  - **Teste**: `categories.length >= 3`

## Templates

### Template de Relatório da Sessão

```markdown
# Brainstorming Session: {topic}

**Date**: {date}
**Duration**: {duration} minutes
**Participants**: {agents_participated.join(', ')}
**Goal**: {session_goal}

## Context

{context_summary}

## Ideas Generated

**Total**: {ideas_generated}

### By Category

{categories.map(cat => `
#### ${cat.name} (${cat.ideas_count} ideas)

${cat.top_ideas.map(idea => `- ${idea.text} (by ${idea.source_agent})`).join('\n')}
`).join('\n')}

## Top Recommendations

{prioritized_recommendations.map((rec, i) => `
### ${i+1}. ${rec.idea.text}

**Value Score**: ${rec.value_score}/10
**Effort Estimate**: ${rec.effort_estimate}/10
**ROI**: ${rec.roi.toFixed(2)}

**Why this matters**: ${rec.rationale}

**Next Steps**:
${rec.next_steps.map(step => `- ${step}`).join('\n')}
`).join('\n')}

## Key Insights

{key_insights}

## Session Metadata

- **Ideas Generated**: {ideas_generated}
- **Categories Identified**: {categories.length}
- **Agents Participated**: {agents_participated.length}
- **Session Duration**: {duration} minutes
```

## Ferramentas

- **clickup**:
  - **Versão**: 1.0.0
  - **Usado Para**: Exportar ideias para um quadro do ClickUp para acompanhamento
  - **Opcional**: Sim (o usuário pode optar por não usar)

- **mcp**:
  - **Versão**: 1.0.0
  - **Usado Para**: Chamar agentes especializados para ideias específicas de domínio
  - **Compartilhado Com**: Todas as sessões de brainstorming

## Performance

- **Duração Esperada**: 30 minutos (configurável: 10-60 min)
- **Custo Estimado**: $0.05-0.15 (depende da quantidade de agentes e rodadas)
- **Cacheável**: false (as sessões são únicas)
- **Paralelizável**: true (os agentes podem gerar ideias simultaneamente)

## Tratamento de Erros

- **Estratégia**: fallback
- **Fallback**: Se um agente falhar, continuar com os agentes restantes
- **Retry**:
  - **Máximo de Tentativas**: 2
  - **Backoff**: linear
  - **Backoff MS**: 1000
- **Abortar Workflow**: false (continuar mesmo se alguns agentes falharem)
- **Notificação**: log + relatório de resumo

## Metadata

- **Story**: N/A (capacidade do framework)
- **Versão**: 1.0.0
- **Dependências**: Nenhuma
- **Autor**: Brad Frost Clone
- **Criado**: 2025-11-13
- **Atualizado**: 2025-11-13

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: facilitateBrainstormingSession()
responsável: Atlas (Decoder)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid task parameters

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memory
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: State management
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pre-condition failed: Task is registered; required parameters provided; dependencies met"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de tarefas
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A tarefa especificada não está registrada no sistema
   - **Resolução:** Verifique o nome e o registro da tarefa
   - **Recuperação:** Liste as tarefas disponíveis, sugira similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da tarefa não correspondem ao schema esperado
   - **Resolução:** Valide os parâmetros em relação à definição da tarefa
   - **Recuperação:** Forneça um template de parâmetros, rejeite a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A tarefa excede o tempo máximo de execução
   - **Resolução:** Otimize a tarefa ou aumente o timeout
   - **Recuperação:** Encerre a tarefa, limpe os recursos, registre o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupamento de operações similares

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Exemplos de Uso

### Exemplo 1: Ideação de Funcionalidades

```bash
aiox activate Maestro
aiox brainstorm "Como podemos melhorar o onboarding de usuários do AIOX para usuários não técnicos?"
```

**Saída**: 25 ideias em 5 categorias, as 10 melhores priorizadas com próximos passos

### Exemplo 2: Resolução de Problemas com Agentes Específicos

```bash
aiox brainstorm "Como reduzir a latência da API em consultas ao banco de dados?" \
  --agents="db-sage,architect,github-devops" \
  --goal="solution" \
  --format="actionable"
```

**Saída**: Soluções técnicas focadas com passos de implementação

### Exemplo 3: Planejamento Estratégico

```bash
aiox brainstorm "Qual deveria ser nossa estratégia de expansão open-source para o Q1 de 2026?" \
  --agents="po,architect,github-devops" \
  --goal="strategy" \
  --context="docs/prd.md,docs/open-source-roadmap.md"
```

**Saída**: Recomendações estratégicas alinhadas com os planos existentes

---

**Tarefas Relacionadas:**
- `create-next-story` - Converter ideias em stories acionáveis
- `analyze-framework` - Analisar as capacidades do framework em busca de ideias de melhoria
