---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Calcular ROI e Economia de Custos

> Task ID: brad-calculate-roi
> Agente: Brad (Design System Architect)
> Version: 1.0.0

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: calculateRoi()
responsável: Morgan (Strategist)
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

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

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

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

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
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Registro de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer um template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupar operações similares em lote

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


## Descrição

Calcula a economia real de custos a partir da consolidação de patterns com números concretos. Estima os custos de manutenção mensais/anuais antes e depois, projeta a linha do tempo do ROI e mostra quando o investimento atinge o ponto de equilíbrio (breakeven).

## Pré-requisitos

- Consolidação concluída (comando *consolidate executado com sucesso)
- O .state.yaml contém as métricas de redução de patterns
- Opcional: Dados de salário da equipe para cálculos precisos

## Workflow

### Elicitação Interativa

Esta task usa elicitação interativa para coletar os parâmetros de custo.

1. **Coletar o Contexto da Equipe**
   - Tamanho da equipe (número de desenvolvedores)
   - Taxa horária média do desenvolvedor (padrão: $150/hr)
   - Horas mensais gastas em manutenção de UI (estime se desconhecido)
   - Estimativa do custo de implementação

2. **Revisar as Métricas de Patterns**
   - Mostrar as métricas de consolidação (patterns antes/depois)
   - Confirmar os percentuais de redução
   - Identificar as reduções de maior impacto

3. **Configurar o Cálculo**
   - Perguntar por estimativas conservadoras vs agressivas
   - Incluir ou excluir custos de treinamento
   - Definir o período de cálculo do ROI (padrão de 1 ano)

### Passos

1. **Carregar as Métricas de Consolidação**
   - Ler o .state.yaml em busca dos dados de redução de patterns
   - Extrair as contagens antes/depois para todos os tipos de pattern
   - Calcular os percentuais de redução
   - Validação: Os dados de consolidação existem

2. **Calcular o Custo de Manutenção (Antes)**
   - Fórmula: patterns × hours_per_pattern_monthly × hourly_rate × 12
   - Padrão: 2 horas/mês por pattern para manutenção
   - Incluir depuração, atualizações, correções de consistência
   - Validação: Estimativa de custo razoável gerada

3. **Calcular o Custo de Manutenção (Depois)**
   - Mesma fórmula com a contagem de patterns consolidados
   - Considerar o overhead do design system (pequeno)
   - Validação: Custo pós-consolidação calculado

4. **Calcular a Economia Mensal e Anual**
   - Economia mensal = cost_before - cost_after
   - Economia anual = monthly_savings × 12
   - Validação: Economia positiva ou explicar por que não

5. **Estimar o Custo de Implementação**
   - Tempo de desenvolvedor para criar o design system
   - Esforço de migração (a partir da estratégia de migração)
   - Tempo de treinamento
   - Padrão: $10,000-15,000 para equipes médias
   - Validação: Custo de implementação estimado

6. **Calcular as Métricas de ROI**
   - Razão de ROI = annual_savings / implementation_cost
   - Ponto de equilíbrio (breakeven) = implementation_cost / monthly_savings (em meses)
   - Projeção de 3 anos = (annual_savings × 3) - implementation_cost
   - Validação: Cálculos de ROI completos

7. **Calcular o Impacto na Velocidade**
   - Estimar o tempo economizado por feature (menos decisões de componentes)
   - Projetar o multiplicador de velocidade (3-6x típico)
   - Converter em valor monetário (tempo = dinheiro)
   - Validação: Impacto na velocidade quantificado

8. **Gerar o Relatório de ROI**
   - Criar o roi-analysis.md com sumário executivo
   - Incluir cálculos detalhados com fórmulas
   - Gerar gráficos (baseados em texto ou recomendar ferramentas)
   - Mostrar análise de sensibilidade (melhor/pior caso)
   - Validação: Documento de ROI abrangente criado

9. **Criar o Resumo para Stakeholders**
   - Sumário executivo de uma página
   - Apenas os números-chave (investimento, economia, breakeven)
   - Comparação visual (custos antes/depois)
   - Validação: Resumo pronto para stakeholders

10. **Atualizar o Arquivo de Estado**
    - Adicionar a seção de ROI ao .state.yaml
    - Registrar todos os cálculos de custo
    - Atualizar a fase para "roi_calculated"
    - Validação: Estado atualizado com os dados financeiros

## Saída

- **roi-analysis.md**: Análise de ROI detalhada com cálculos
- **executive-summary.md**: Resumo de uma página para stakeholders
- **cost-breakdown.yaml**: Dados de custo estruturados
- **.state.yaml**: Atualizado com as métricas de ROI

### Formato de Saída

```yaml
# roi section in .state.yaml
roi:
  calculated_at: "2025-10-27T14:00:00Z"

  before:
    patterns: 176
    monthly_cost: $38,100
    annual_cost: $457,200
    hours_per_month: 352

  after:
    patterns: 32
    monthly_cost: $6,900
    annual_cost: $82,800
    hours_per_month: 64

  savings:
    monthly: $31,200
    annual: $374,400
    hours_saved_monthly: 288

  implementation:
    estimated_cost: $12,000
    developer_weeks: 4

  roi_metrics:
    ratio: 31.2
    breakeven_months: 0.38
    year_1_net: $362,400
    year_3_cumulative: $1,111,200

  velocity_impact:
    multiplier: "4-6x"
    time_savings: "70% reduction in UI decisions"
```

## Critérios de Sucesso

- [ ] Estimativas de custo realistas baseadas no contexto da equipe
- [ ] Custos pré e pós-consolidação calculados
- [ ] A razão de ROI mostra retorno positivo (>2x no mínimo)
- [ ] Ponto de equilíbrio (breakeven) calculado (tipicamente <1 ano)
- [ ] Impacto na velocidade quantificado
- [ ] O sumário executivo está pronto para stakeholders
- [ ] Todos os cálculos mostram as fórmulas usadas

## Tratamento de Erros

- **Sem dados de consolidação**: Sair com a mensagem para executar *consolidate primeiro
- **Custos irreais**: Avisar o usuário, sugerir a revisão das entradas
- **ROI negativo**: Explicar por quê, sugerir uma consolidação de maior impacto
- **Dados da equipe ausentes**: Usar os padrões da indústria, sinalizar as estimativas como aproximadas

## Considerações de Segurança

- Os dados de salário são sensíveis - usados apenas para cálculos, não registrados em log
- Relatórios de custo armazenados de forma segura
- Nenhuma transmissão de dados externa
- O usuário pode revisar antes de compartilhar com os stakeholders

## Exemplos

### Exemplo 1: Cálculo de ROI

```bash
*calculate-roi
```

Saída:
```
💰 Brad: Calculando ROI a partir da consolidação de patterns...

Contexto da Equipe:
  - Desenvolvedores: 8
  - Taxa horária: $150/hr
  - Patterns mantidos: 176 → 32

📊 ANÁLISE DE CUSTOS:

ANTES da consolidação:
  176 patterns × 2 hrs/mês × $150/hr = $52,800/mês
  Custo anual: $633,600

DEPOIS da consolidação:
  32 patterns × 2 hrs/mês × $150/hr = $9,600/mês
  Custo anual: $115,200

💵 ECONOMIA:
  Mensal: $43,200
  Anual: $518,400
  Total em 3 anos: $1,555,200

🎯 MÉTRICAS DE ROI:
  Custo de implementação: $15,000
  Razão de ROI: 34.6x
  Ponto de equilíbrio: 0.35 meses (10 dias!)
  Lucro líquido do Ano 1: $503,400

⚡ IMPACTO NA VELOCIDADE:
  Estimativa de desenvolvimento de features 5x mais rápido
  288 horas/mês economizadas = 1.8 FTE equivalente

✅ Relatório salvo: outputs/design-system/my-app/roi/roi-analysis.md
✅ Sumário executivo: outputs/design-system/my-app/roi/executive-summary.md

Brad diz: Números não mentem. Mostre isto ao seu chefe.
```

### Exemplo 2: Sumário Executivo

```markdown
# ROI do Design System - Sumário Executivo

## Investimento
**$15,000** (4 developer-weeks)

## Retorno
**$518,400/ano** de economia

## ROI
**34.6x de retorno** sobre o investimento

## Ponto de Equilíbrio
**10 dias**

## Impacto
- 81.8% de redução de patterns (176 → 32)
- 5x de melhoria na velocidade
- 1.8 FTE equivalente em economia de tempo

**Recomendação**: Aprovação imediata. Payback em menos de 2 semanas.
```

## Notas

- Padrão de 2 horas/mês por pattern para manutenção (conservador)
- Inclui: depuração, atualizações, correções de consistência, revisões de código
- Multiplicador de velocidade (3-6x) baseado em pesquisa da indústria
- O custo de implementação varia conforme o tamanho da equipe e a dívida técnica existente
- O ROI melhora ao longo do tempo à medida que o sistema amadurece
- As estimativas do Brad são conservadoras (a economia real costuma ser maior)
- Use este relatório para justificar o design system aos stakeholders
- Recalcule o ROI após a migração da Fase 2 para validar as projeções
