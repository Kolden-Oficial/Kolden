# Pesquisa de Usuário e Análise de Necessidades

> **Task ID:** ux-user-research
> **Agent:** UX-Design Expert
> **Phase:** 1 - UX Research
> **Interactive:** Yes (elicit=true)

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
- Interação mínima do usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: uxUserResearch()
responsável: Uma (Empathizer)
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

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

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

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

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

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

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

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Fonte:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Registro de logs de execução e rastreamento de erros
  - **Fonte:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Not Found
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Invalid Parameters
   - **Causa:** Parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar execução

3. **Erro:** Execution Timeout
   - **Causa:** Task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cachear resultados intermediários; agrupar operações similares em lote

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


## 📋 Descrição

Conduza pesquisa de usuário abrangente, entrevistas, surveys e análise de necessidades para entender os usuários-alvo, suas dores, objetivos e comportamentos. Gere personas, mapas de jornada do usuário e insights de design acionáveis.

---

## 🎯 Objetivos

- Entender quem são os usuários (demografia, comportamentos, objetivos)
- Identificar dores e frustrações nas soluções atuais
- Descobrir oportunidades de melhoria
- Criar personas e jornadas de usuário baseadas em evidências
- Documentar insights que orientam decisões de design

---

## 📊 Métodos de Pesquisa

### Método 1: Entrevistas com Usuários
**Quando Usar:** Insights qualitativos profundos, descoberta inicial
**Participantes:** 5-10 usuários (amostra representativa)
**Duração:** 30-60 minutos por entrevista
**Saída:** Transcrições de entrevistas, citações-chave, temas

### Método 2: Surveys
**Quando Usar:** Validação quantitativa, amostra grande
**Participantes:** 50+ usuários
**Duração:** 10-15 minutos para completar
**Saída:** Dados estatísticos, padrões de uso, preferências

### Método 3: Revisão de Analytics
**Quando Usar:** Dados comportamentais, produtos existentes
**Fonte:** Google Analytics, Mixpanel, Hotjar, etc.
**Saída:** Padrões de uso, pontos de abandono, funcionalidades populares

### Método 4: Análise de Concorrentes
**Quando Usar:** Contexto de mercado, melhores práticas
**Escopo:** 3-5 concorrentes
**Saída:** Comparação de funcionalidades, padrões de UX, oportunidades

### Método 5: Inquérito Contextual
**Quando Usar:** Observar usuários em ambiente natural
**Duração:** 2-4 horas por sessão
**Saída:** Observações de workflow, insights do ambiente

---

## 🔄 Workflow

### Passo 1: Definir Objetivos de Pesquisa
**Elicitação Interativa:**

```
Quais são seus objetivos de pesquisa? (Escolha 1-3 ou digite personalizado)

1. Entender necessidades e dores dos usuários
2. Validar conceito de produto ou ideia de funcionalidade
3. Melhorar a UX de um produto existente
4. Identificar novas oportunidades
5. Comparar com concorrentes
6. Criar personas de usuário
7. Personalizado (descreva seus objetivos)

Sua seleção: _____
```

**Perguntas de acompanhamento:**
- Quem são seus usuários-alvo? (Demografia, papéis, familiaridade com tecnologia)
- Qual é o seu prazo? (Dias/semanas disponíveis)
- Quais recursos você tem? (Orçamento, acesso a usuários)
- O que você já sabe? (Dados existentes, suposições)

---

### Passo 2: Selecionar Métodos de Pesquisa
Com base nos objetivos, recomende métodos:

```
Métodos de pesquisa recomendados para seus objetivos:

[X] Entrevistas com Usuários (5-10 participantes)
    - Melhor para: Insights profundos, perguntas de "por quê"
    - Tempo: 2-3 semanas
    - Custo: Baixo (se recrutar internamente)

[ ] Surveys (50+ participantes)
    - Melhor para: Validação quantitativa
    - Tempo: 1-2 semanas
    - Custo: Baixo (use Google Forms/Typeform)

[ ] Revisão de Analytics
    - Melhor para: Padrões de uso atuais
    - Tempo: 3-5 dias
    - Custo: Grátis (dados existentes)

Quais métodos você quer usar? (Digite números, ex.: 1,3)
Sua seleção: _____
```

---

### Passo 3: Preparar Materiais de Pesquisa

**Para Entrevistas:**
- Criar roteiro de entrevista (10-15 perguntas abertas)
- Preparar termos de consentimento
- Configurar ferramentas de gravação (com permissão)
- Agendar sessões

**Para Surveys:**
- Rascunhar perguntas do survey (máximo de 20 perguntas)
- Usar mix de múltipla escolha + perguntas abertas
- Configurar ferramenta de survey (Google Forms, Typeform, SurveyMonkey)
- Planejar canais de distribuição

**Para Analytics:**
- Definir métricas-chave a revisar
- Definir intervalo de datas para análise
- Preparar visualizações de dashboard

---

### Passo 4: Conduzir a Pesquisa

**Dicas para Entrevistas:**
- Construa rapport primeiro (5 min)
- Faça perguntas abertas ("Me conte sobre...")
- Aprofunde ("Por que isso é importante?")
- Observe a linguagem corporal e o tom
- Mantenha-se neutro, não induza as respostas
- Registre as citações-chave literalmente

**Dicas para Surveys:**
- Mantenha curto (10-15 min no máximo)
- Perguntas claras e imparciais
- Inclua perguntas de triagem (screening)
- Teste com 2-3 pessoas primeiro

---

### Passo 5: Analisar os Achados

**Processo de Síntese:**
1. Revise todos os dados (transcrições, respostas, analytics)
2. Extraia insights e citações-chave
3. Identifique temas e padrões
4. Agrupe achados similares
5. Priorize por frequência e impacto

**Mapeamento de Afinidade:**
- Escreva os achados em notas adesivas (digitais ou físicas)
- Agrupe insights similares
- Nomeie cada grupo (tema)
- Identifique relações entre os temas

---

### Passo 6: Criar Personas

**Template de Persona:**

```markdown
## Persona: [Name]

### Demografia
- Idade: [Range]
- Papel: [Job title]
- Familiaridade com Tecnologia: [Beginner/Intermediate/Expert]
- Localização: [Geography]

### Objetivos
- [Primary goal]
- [Secondary goal]
- [Aspirational goal]

### Dores
- [Frustration 1]
- [Frustration 2]
- [Frustration 3]

### Comportamentos
- [How they currently solve this problem]
- [Tools they use]
- [Typical workflow]

### Citação
> "[Memorable quote from research]"

### Necessidades em Relação ao Produto
- [Need 1]
- [Need 2]
- [Need 3]
```

**Crie 2-4 personas** (usuários primários + secundários)

---

### Passo 7: Documentar as Jornadas do Usuário

**Componentes do Mapa de Jornada:**
- **Estágios:** Descoberta → Consideração → Compra → Uso → Fidelização
- **Ações:** O que o usuário faz em cada estágio
- **Pensamentos:** O que ele está pensando ("Isso vai funcionar para mim?")
- **Emoções:** Estado emocional (😊 😐 😞)
- **Dores:** Atritos e frustrações
- **Oportunidades:** Onde podemos melhorar

**Formato:**
```
Estágio: [Stage Name]
-----
Ações:
  - [Action 1]
  - [Action 2]

Pensamentos:
  - "[Thought 1]"
  - "[Thought 2]"

Emoções: [😊/😐/😞]

Dores:
  - [Pain 1]
  - [Pain 2]

Oportunidades:
  - [Opportunity 1]
  - [Opportunity 2]
```

---

### Passo 8: Gerar Insights Acionáveis

**Template de Insight:**

```markdown
## Insight-Chave #[N]: [One-sentence insight]

**Evidência:**
- [Data point 1]
- [Quote 1]
- [Quote 2]

**Impacto:** [HIGH/MEDIUM/LOW]

**Implicações para o Design:**
- [Design implication 1]
- [Design implication 2]

**Ações Recomendadas:**
1. [Action 1]
2. [Action 2]
```

Gere 5-10 insights-chave ordenados por impacto.

---

## 📤 Saídas

Todos os artefatos salvos em: `outputs/ux-research/{project}/`

### Arquivos Obrigatórios:
1. **research-summary.md** - Resumo executivo dos achados
2. **personas.md** - 2-4 personas de usuário
3. **user-journeys.md** - Mapas de jornada para cenários-chave
4. **insights.md** - 5-10 insights acionáveis
5. **raw-data/** - Transcrições de entrevistas, respostas de surveys

### Arquivos Opcionais:
6. **interview-script.md** - Perguntas utilizadas
7. **survey-questions.md** - Instrumento do survey
8. **affinity-map.jpg** - Foto do trabalho de síntese
9. **analytics-summary.md** - Achados de analytics

---

## ✅ Critérios de Sucesso

- [ ] Objetivos de pesquisa claramente definidos
- [ ] Métodos apropriados selecionados e executados
- [ ] Tamanho mínimo de amostra atingido (5+ entrevistas ou 50+ surveys)
- [ ] Dados analisados e sintetizados
- [ ] 2-4 personas criadas com respaldo de evidências
- [ ] Mapas de jornada do usuário documentam workflows completos
- [ ] 5-10 insights acionáveis gerados
- [ ] Insights priorizados por impacto
- [ ] Todas as saídas documentadas em `outputs/ux-research/{project}/`
- [ ] `.state.yaml` atualizado com a conclusão da pesquisa

---

## 🔄 Integração com Outras Tasks

**Próximos Passos:**
- `*wireframe` - Use personas e insights para orientar o design de wireframe
- `*create-front-end-spec` - Referencie as necessidades do usuário nas especificações
- `*build` - Garanta que os componentes atendam aos requisitos do usuário

**Gerenciamento de Estado:**
Atualiza `.state.yaml` com:
- `user_research_complete: true`
- `personas: [list of persona names]`
- `key_insights: [list of insights]`
- `research_date: [ISO date]`

---

## 📚 Templates e Recursos

**Roteiro Inicial de Entrevista:**
```
1. Me conte sobre o seu papel e como você atualmente [faz a tarefa X]
2. Quais são seus principais objetivos ao [fazer a tarefa X]?
3. Me guie pelo seu workflow típico para [tarefa X]
4. Qual é a parte mais frustrante de [tarefa X]?
5. Se você tivesse uma varinha mágica, como mudaria [tarefa X]?
6. Quais ferramentas você usa atualmente para [tarefa X]?
7. Como você mede o sucesso de [tarefa X]?
8. Me conte sobre uma vez em que [tarefa X] correu muito bem
9. Me conte sobre uma vez em que [tarefa X] correu mal
10. Há algo mais que eu deveria saber sobre [tarefa X]?
```

**Tipos de Pergunta de Survey:**
- Demográfica (triagem)
- Múltipla escolha (quantificar preferências)
- Escala Likert (medir sentimento 1-5)
- Ranking (priorizar funcionalidades)
- Aberta (descobrir insights inesperados)

---

## ⚠️ Armadilhas Comuns

1. **Perguntas indutoras** - Não pergunte "Você não acha que X é melhor?" → Pergunte "Como você compara X e Y?"
2. **Amostra muito pequena** - 1-2 entrevistas não são suficientes → Mire em 5-10 no mínimo
3. **Viés de confirmação** - Não fale apenas com usuários satisfeitos → Inclua usuários frustrados
4. **Sem síntese** - Não apenas colete dados → Encontre padrões e temas
5. **Ignorar o contexto** - Não apenas faça perguntas → Observe o comportamento real

---

**Criado:** 2025-11-12
**Story:** 4.3 - UX-Design-Expert Merge
**Version:** 1.0.0
