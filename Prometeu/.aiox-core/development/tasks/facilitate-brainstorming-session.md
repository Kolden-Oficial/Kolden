---
id: facilitate-brainstorming-session
name: Facilitar SessÃ£o de Brainstorming
agent: aiox-master
category: collaboration
complexity: medium
tools:
  - clickup        # Capturar ideias e organizÃ¡-las
  - mcp            # Chamar agentes especializados para expertise de domÃ­nio
checklists:
  - aiox-master-checklist.md
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Facilitar SessÃ£o de Brainstorming

## PropÃ³sito

Conduzir uma sessÃ£o de brainstorming estruturada com mÃºltiplos agentes de IA (e, opcionalmente, participantes humanos) para gerar, categorizar e priorizar ideias para funcionalidades, soluÃ§Ãµes ou decisÃµes estratÃ©gicas.

## Entrada

### ParÃ¢metros ObrigatÃ³rios

- **topic**: `string`
  - **DescriÃ§Ã£o**: O desafio, a oportunidade ou a pergunta sobre a qual fazer o brainstorming
  - **Exemplo**: "Como podemos melhorar o onboarding de usuÃ¡rios no AIOX?"
  - **ValidaÃ§Ã£o**: Deve ter pelo menos 20 caracteres

- **session_goal**: `string`
  - **DescriÃ§Ã£o**: Qual resultado Ã© desejado desta sessÃ£o
  - **OpÃ§Ãµes**: `"ideation"` (gerar muitas ideias), `"solution"` (resolver um problema), `"strategy"` (planejamento estratÃ©gico)
  - **PadrÃ£o**: `"ideation"`

### ParÃ¢metros Opcionais

- **participating_agents**: `array<string>`
  - **DescriÃ§Ã£o**: IDs de agentes para convidar para a sessÃ£o
  - **PadrÃ£o**: Auto-seleÃ§Ã£o com base no tÃ³pico (usando anÃ¡lise breve)
  - **Exemplo**: `["po", "architect", "ux-expert", "github-devops"]`

- **time_limit**: `number`
  - **DescriÃ§Ã£o**: DuraÃ§Ã£o da sessÃ£o em minutos
  - **PadrÃ£o**: `30`
  - **Faixa**: `10-60`

- **output_format**: `string`
  - **DescriÃ§Ã£o**: Como organizar a saÃ­da final
  - **OpÃ§Ãµes**: `"categorized"` (por tema), `"prioritized"` (por valor), `"actionable"` (com prÃ³ximos passos)
  - **PadrÃ£o**: `"categorized"`

- **context_documents**: `array<string>`
  - **DescriÃ§Ã£o**: Caminhos de arquivo opcionais para contexto (PRD, backlog, documentos de arquitetura)
  - **Exemplo**: `["docs/prd.md", "docs/backlog.md"]`

## SaÃ­da

- **ideas**: `array<object>`
  - **Estrutura**: `{ id, text, source_agent, category, priority, rationale }`
  - **DescriÃ§Ã£o**: Todas as ideias geradas com metadados

- **categories**: `array<object>`
  - **Estrutura**: `{ name, ideas_count, top_ideas }`
  - **DescriÃ§Ã£o**: Ideias agrupadas por tema

- **prioritized_recommendations**: `array<object>`
  - **Estrutura**: `{ idea, value_score, effort_estimate, roi, next_steps }`
  - **DescriÃ§Ã£o**: As 5-10 melhores ideias com prÃ³ximos passos acionÃ¡veis

- **session_summary**: `object`
  - **Estrutura**: `{ topic, duration, agents_participated, ideas_generated, key_insights }`
  - **DescriÃ§Ã£o**: Metadados e insights da sessÃ£o

- **clickup_board_url**: `string` (opcional)
  - **DescriÃ§Ã£o**: Quadro do ClickUp com as ideias organizadas (se a integraÃ§Ã£o com o ClickUp estiver habilitada)

## Processo

### Fase 1: ConfiguraÃ§Ã£o e Carregamento de Contexto (5 min)

1. **Carregar Contexto**
   - Se `context_documents` for fornecido, ler e resumir os pontos-chave
   - Extrair restriÃ§Ãµes, requisitos ou objetivos relevantes

2. **Selecionar Agentes Participantes**
   - Se `participating_agents` nÃ£o for fornecido:
     - Analisar o tÃ³pico usando anÃ¡lise breve
     - Identificar domÃ­nios relevantes (ex.: "user onboarding" â†’ ux-expert, po, copywriter)
     - Auto-selecionar de 3 a 5 agentes apropriados
   - Log: "âœ… Participantes da sessÃ£o: [lista de agentes]"

3. **Definir a Estrutura da SessÃ£o**
   - Com base em `session_goal`:
     - **Ideation**: Pensamento divergente (gerar o mÃ¡ximo de ideias)
     - **Solution**: Pensamento convergente (avaliar e refinar)
     - **Strategy**: Frameworks estruturados (SWOT, OKRs, etc.)

### Fase 2: Pensamento Divergente - GeraÃ§Ã£o de Ideias (10-15 min)

4. **Rodada 1: Ideias Iniciais (5 min)**
   - Solicitar a cada agente: "Gere de 3 a 5 ideias para: {topic}"
   - Coletar as respostas
   - Sem avaliaÃ§Ã£o ainda (brainstorming puro)

5. **Rodada 2: Construir sobre as Ideias (5 min)**
   - Compartilhar todas as ideias com os agentes
   - Solicitar: "Construa sobre ou remixe as ideias existentes. Gere de 2 a 3 novas ideias inspiradas no que vocÃª vÃª."
   - Coletar as respostas

6. **Rodada 3: Cartas Coringa (2 min)**
   - Solicitar: "Gere de 1 a 2 ideias nÃ£o convencionais ou do tipo 'e se?'"
   - Encorajar a tomada de risco criativo

### Fase 3: Pensamento Convergente - CategorizaÃ§Ã£o (5-10 min)

7. **Categorizar Ideias**
   - Usar IA para identificar temas/padrÃµes
   - Agrupar as ideias em 3 a 7 categorias
   - Exemplos de categorias: "Quick Wins", "Big Bets", "Research Needed", "Technical Solutions", "UX Improvements"

8. **Deduplicar e Mesclar**
   - Identificar ideias similares
   - Mesclar ou vincular conceitos relacionados

### Fase 4: AvaliaÃ§Ã£o e PriorizaÃ§Ã£o (5-10 min)

9. **Pontuar Ideias** (se `output_format: "prioritized"`)
   - CritÃ©rios:
     - **Valor**: Impacto sobre usuÃ¡rios/negÃ³cio (1-10)
     - **EsforÃ§o**: Complexidade de desenvolvimento (1-10)
     - **ROI**: RazÃ£o Valor/EsforÃ§o
     - **Alinhamento**: AderÃªncia Ã  estratÃ©gia/objetivos (1-10)
   - Calcular as pontuaÃ§Ãµes agregadas

10. **Selecionar as Melhores Ideias**
    - Identificar as 5-10 melhores ideias com base nas pontuaÃ§Ãµes
    - Para cada uma, gerar:
      - **Justificativa**: Por que esta ideia Ã© valiosa
      - **PrÃ³ximos Passos**: AÃ§Ãµes concretas para persegui-la

### Fase 5: DocumentaÃ§Ã£o e Acionabilidade (5 min)

11. **Criar RelatÃ³rio da SessÃ£o**
    - Resumo de todas as ideias
    - VisÃ£o categorizada
    - RecomendaÃ§Ãµes priorizadas
    - Metadados da sessÃ£o

12. **Exportar para o ClickUp** (opcional)
    - Se a integraÃ§Ã£o com o ClickUp estiver habilitada:
      - Criar o quadro: "Brainstorm: {topic}"
      - Adicionar ideias como tarefas com as categorias como tags
      - Vincular ao relatÃ³rio da sessÃ£o

## Checklist

### PrÃ©-condiÃ§Ãµes

- [ ] O tÃ³pico Ã© bem definido e especÃ­fico o suficiente
  - **ValidaÃ§Ã£o**: `topic.length >= 20 && topic.includes('?') || topic.includes('how') || topic.includes('what')`
  - **Erro**: "TÃ³pico muito vago. ForneÃ§a uma pergunta ou um desafio especÃ­fico."

- [ ] O objetivo da sessÃ£o Ã© vÃ¡lido
  - **ValidaÃ§Ã£o**: `["ideation", "solution", "strategy"].includes(session_goal)`

- [ ] Os agentes participantes existem (se fornecidos)
  - **ValidaÃ§Ã£o**: Verificar os IDs dos agentes contra os agentes disponÃ­veis
  - **Erro**: "Agente '{agent_id}' nÃ£o encontrado"

### PÃ³s-condiÃ§Ãµes

- [ ] Pelo menos 10 ideias geradas
  - **ValidaÃ§Ã£o**: `ideas.length >= 10`
  - **Erro**: "Ideias insuficientes. Estenda a sessÃ£o ou adicione mais agentes."

- [ ] Todas as ideias tÃªm categorias
  - **ValidaÃ§Ã£o**: `ideas.every(i => i.category)`

- [ ] As 5 melhores ideias tÃªm prÃ³ximos passos
  - **ValidaÃ§Ã£o**: `prioritized_recommendations.slice(0, 5).every(r => r.next_steps)`

- [ ] O resumo da sessÃ£o estÃ¡ completo
  - **ValidaÃ§Ã£o**: `session_summary.ideas_generated > 0 && session_summary.agents_participated.length > 0`

### CritÃ©rios de Aceite

- [ ] A sessÃ£o produz recomendaÃ§Ãµes acionÃ¡veis
  - **Tipo**: acceptance
  - **VerificaÃ§Ã£o Manual**: true
  - **CritÃ©rio**: O usuÃ¡rio consegue agir imediatamente sobre pelo menos 3 ideias

- [ ] As ideias sÃ£o diversas e cobrem mÃºltiplas perspectivas
  - **Tipo**: acceptance
  - **VerificaÃ§Ã£o Manual**: false
  - **Teste**: `categories.length >= 3`

## Templates

### Template de RelatÃ³rio da SessÃ£o

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
  - **VersÃ£o**: 1.0.0
  - **Usado Para**: Exportar ideias para um quadro do ClickUp para acompanhamento
  - **Opcional**: Sim (o usuÃ¡rio pode optar por nÃ£o usar)

- **mcp**:
  - **VersÃ£o**: 1.0.0
  - **Usado Para**: Chamar agentes especializados para ideias especÃ­ficas de domÃ­nio
  - **Compartilhado Com**: Todas as sessÃµes de brainstorming

## Performance

- **DuraÃ§Ã£o Esperada**: 30 minutos (configurÃ¡vel: 10-60 min)
- **Custo Estimado**: $0.05-0.15 (depende da quantidade de agentes e rodadas)
- **CacheÃ¡vel**: false (as sessÃµes sÃ£o Ãºnicas)
- **ParalelizÃ¡vel**: true (os agentes podem gerar ideias simultaneamente)

## Tratamento de Erros

- **EstratÃ©gia**: fallback
- **Fallback**: Se um agente falhar, continuar com os agentes restantes
- **Retry**:
  - **MÃ¡ximo de Tentativas**: 2
  - **Backoff**: linear
  - **Backoff MS**: 1000
- **Abortar Workflow**: false (continuar mesmo se alguns agentes falharem)
- **NotificaÃ§Ã£o**: log + relatÃ³rio de resumo

## Metadata

- **Story**: N/A (capacidade do framework)
- **VersÃ£o**: 1.0.0
- **DependÃªncias**: Nenhuma
- **Autor**: Brad Frost Clone
- **Criado**: 2025-11-13
- **Atualizado**: 2025-11-13

---

## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com registro em log
- InteraÃ§Ã£o mÃ­nima com o usuÃ¡rio
- **Melhor para:** Tarefas simples e determinÃ­sticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints de decisÃ£o explÃ­citos
- ExplicaÃ§Ãµes educativas
- **Melhor para:** Aprendizado, decisÃµes complexas

### 3. Planejamento PrÃ©-Voo - Planejamento Abrangente Antecipado
- Fase de anÃ¡lise da tarefa (identificar todas as ambiguidades)
- ExecuÃ§Ã£o sem ambiguidade
- **Melhor para:** Requisitos ambÃ­guos, trabalho crÃ­tico

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: facilitateBrainstormingSession()
responsÃ¡vel: Atlas (Decoder)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatÃ³rio: true
  validaÃ§Ã£o: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: Valid task parameters

- campo: mode
  tipo: string
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: yolo|interactive|pre-flight

**SaÃ­da:**
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

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar prÃ©-requisitos ANTES da execuÃ§Ã£o da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pre-condition failed: Task is registered; required parameters provided; dependencies met"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o APÃ“S a conclusÃ£o da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Post-condition failed: Task completed; exit code 0; expected outputs created"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de aprovaÃ§Ã£o/reprovaÃ§Ã£o para conclusÃ£o da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Assert task completed as expected; side effects documented
    error_message: "Acceptance criterion not met: Task completed as expected; side effects documented"
```

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta tarefa:**

- **Script:** execute-task.js
  - **PropÃ³sito:** Wrapper genÃ©rico de execuÃ§Ã£o de tarefas
  - **Linguagem:** JavaScript
  - **LocalizaÃ§Ã£o:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**EstratÃ©gia:** retry

**Erros Comuns:**

1. **Erro:** Task NÃ£o Encontrada
   - **Causa:** A tarefa especificada nÃ£o estÃ¡ registrada no sistema
   - **ResoluÃ§Ã£o:** Verifique o nome e o registro da tarefa
   - **RecuperaÃ§Ã£o:** Liste as tarefas disponÃ­veis, sugira similares

2. **Erro:** ParÃ¢metros InvÃ¡lidos
   - **Causa:** Os parÃ¢metros da tarefa nÃ£o correspondem ao schema esperado
   - **ResoluÃ§Ã£o:** Valide os parÃ¢metros em relaÃ§Ã£o Ã  definiÃ§Ã£o da tarefa
   - **RecuperaÃ§Ã£o:** ForneÃ§a um template de parÃ¢metros, rejeite a execuÃ§Ã£o

3. **Erro:** Timeout de ExecuÃ§Ã£o
   - **Causa:** A tarefa excede o tempo mÃ¡ximo de execuÃ§Ã£o
   - **ResoluÃ§Ã£o:** Otimize a tarefa ou aumente o timeout
   - **RecuperaÃ§Ã£o:** Encerre a tarefa, limpe os recursos, registre o estado

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- AnÃ¡lise iterativa com limites de profundidade; cache de resultados intermediÃ¡rios; agrupamento de operaÃ§Ãµes similares

---

## Metadados

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

### Exemplo 1: IdeaÃ§Ã£o de Funcionalidades

```bash
aiox activate Maestro
aiox brainstorm "Como podemos melhorar o onboarding de usuÃ¡rios do AIOX para usuÃ¡rios nÃ£o tÃ©cnicos?"
```

**SaÃ­da**: 25 ideias em 5 categorias, as 10 melhores priorizadas com prÃ³ximos passos

### Exemplo 2: ResoluÃ§Ã£o de Problemas com Agentes EspecÃ­ficos

```bash
aiox brainstorm "Como reduzir a latÃªncia da API em consultas ao banco de dados?" \
  --agents="db-sage,architect,github-devops" \
  --goal="solution" \
  --format="actionable"
```

**SaÃ­da**: SoluÃ§Ãµes tÃ©cnicas focadas com passos de implementaÃ§Ã£o

### Exemplo 3: Planejamento EstratÃ©gico

```bash
aiox brainstorm "Qual deveria ser nossa estratÃ©gia de expansÃ£o open-source para o Q1 de 2026?" \
  --agents="po,architect,github-devops" \
  --goal="strategy" \
  --context="docs/prd.md,docs/open-source-roadmap.md"
```

**SaÃ­da**: RecomendaÃ§Ãµes estratÃ©gicas alinhadas com os planos existentes

---

**Tarefas Relacionadas:**
- `create-next-story` - Converter ideias em stories acionÃ¡veis
- `analyze-framework` - Analisar as capacidades do framework em busca de ideias de melhoria
