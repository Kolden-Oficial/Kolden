# Consolidar Padrões Usando Clustering Inteligente

> Task ID: brad-consolidate-patterns
> Agent: Brad (Design System Architect)
> Version: 1.0.0

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: consolidatePatterns()
responsável: Aria (Visionary)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Parâmetros de task válidos

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
  - [ ] Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; exit code 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a task foi concluída; exit code 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; exit code 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Garantir que a task foi concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Task concluída conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** task-runner
  - **Purpose:** Execução e orquestração de tasks
  - **Source:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Purpose:** Registro de logs de execução e rastreamento de erros
  - **Source:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Purpose:** Wrapper genérico de execução de tasks
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Strategy:** retry

**Erros Comuns:**

1. **Error:** Task Não Encontrada
   - **Cause:** Task especificada não registrada no sistema
   - **Resolution:** Verificar o nome e o registro da task
   - **Recovery:** Listar tasks disponíveis, sugerir similares

2. **Error:** Parâmetros Inválidos
   - **Cause:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolution:** Validar os parâmetros contra a definição da task
   - **Recovery:** Fornecer template de parâmetros, rejeitar a execução

3. **Error:** Timeout de Execução
   - **Cause:** A task excede o tempo máximo de execução
   - **Resolution:** Otimizar a task ou aumentar o timeout
   - **Recovery:** Encerrar a task, limpar recursos, registrar o estado

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


## Descrição

Reduzir a redundância de padrões de UI agrupando padrões similares usando algoritmos inteligentes (clustering de cores HSL com limiar de 5%, agrupamento semântico de botões). Meta: >80% de redução.

## Pré-requisitos

- Auditoria concluída (comando *audit executado com sucesso)
- .state.yaml existe com resultados do inventário
- pattern-inventory.json disponível

## Workflow

### Elicitação Interativa

Esta task usa elicitação interativa para revisar as decisões de consolidação.

1. **Carregar Resultados da Auditoria**
   - Ler .state.yaml para obter os dados do inventário
   - Exibir as métricas de redundância atuais
   - Confirmar que o usuário deseja prosseguir com a consolidação

2. **Revisar Parâmetros de Clustering**
   - Limiar HSL para cores (padrão: 5%)
   - Perguntar se o usuário tem overrides manuais (padrões que não devem ser mesclados)
   - Confirmar o diretório de saída

3. **Apresentar Recomendações de Consolidação**
   - Mostrar antes/depois para cada tipo de padrão
   - Pedir aprovação ou ajustes
   - Permitir overrides manuais antes de finalizar

### Passos

1. **Carregar Dados da Auditoria**
   - Ler .state.yaml para os resultados do inventário
   - Validar que a fase de auditoria foi concluída
   - Extrair as contagens de padrões e o caminho de varredura
   - Validação: O arquivo de estado existe e contém dados do inventário

2. **Agrupar Cores por Similaridade HSL**
   - Extrair todas as cores únicas do codebase
   - Converter hex para o espaço de cor HSL
   - Agrupar cores dentro do limiar HSL de 5%
   - Selecionar a cor mais usada em cada cluster como primária
   - Identificar relações semânticas (primary-dark como estado de hover)
   - Validação: Clusters de cores criados com contagens de uso

3. **Agrupar Padrões de Botões por Propósito Semântico**
   - Extrair os nomes de classe e padrões dos botões
   - Analisar a nomenclatura em busca de significado semântico (primary, secondary, danger, etc)
   - Agrupar botões funcionalmente equivalentes
   - Recomendar o conjunto mínimo de variantes (primary, secondary, destructive)
   - Validação: Mapa de consolidação de botões criado

4. **Consolidar Valores de Espaçamento**
   - Extrair todos os valores de padding e margin
   - Identificar a unidade base (4px ou 8px)
   - Propor uma escala de espaçamento (xs, sm, md, lg, xl, 2xl, 3xl)
   - Mapear os valores existentes para a escala
   - Validação: Escala de espaçamento gerada

5. **Consolidar Tipografia**
   - Extrair tamanhos, pesos e famílias de fontes
   - Propor uma escala tipográfica (escala modular ou intervalos fixos)
   - Consolidar pesos similares (mesclar 500 e 600 se ambos existirem)
   - Recomendar o conjunto mínimo de famílias de fontes
   - Validação: Escala tipográfica criada

6. **Gerar Relatório de Consolidação**
   - Criar consolidation-report.md com métricas de antes/depois
   - Incluir percentuais de redução para cada tipo de padrão
   - Gerar arquivos detalhados de cluster (color-clusters.txt, button-consolidation.txt)
   - Calcular o percentual de redução geral
   - Validação: O relatório mostra >80% de redução ou explica por que não

7. **Criar Mapeamento de Padrões**
   - Gerar o mapeamento de antigo-para-novo para cada tipo de padrão
   - Documentar quais padrões antigos mapeiam para quais novos tokens
   - Criar trechos de guia de migração
   - Validação: Mapeamento completo para todos os padrões

8. **Atualizar o Arquivo de Estado**
   - Adicionar a seção de consolidação ao .state.yaml
   - Registrar as contagens de antes/depois para todos os tipos de padrão
   - Atualizar a fase para "consolidation_complete"
   - Registrar as decisões de consolidação do Brad
   - Validação: Estado atualizado com os dados de consolidação

## Saída

- **consolidation-report.md**: Resumo executivo com métricas de redução
- **color-clusters.txt**: Agrupamentos detalhados de cores com contagens de uso
- **button-consolidation.txt**: Análise semântica de botões e recomendações
- **spacing-consolidation.txt**: Proposta de escala de espaçamento
- **typography-consolidation.txt**: Proposta de escala tipográfica
- **pattern-mapping.json**: Mapeamentos de padrão antigo → novo token
- **.state.yaml**: Atualizado com as decisões de consolidação

### Formato de Saída

```yaml
# .state.yaml consolidation section
consolidation:
  completed_at: "2025-10-27T12:30:00Z"
  patterns_consolidated:
    colors:
      before: 89
      after: 12
      reduction: "86.5%"
      clusters: 8
    buttons:
      before: 47
      after: 3
      reduction: "93.6%"
      variants: ["primary", "secondary", "destructive"]
    spacing:
      before: 19
      after: 7
      reduction: "63.2%"
      scale: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]
    typography:
      before: 21
      after: 10
      reduction: "52.4%"
  overall_reduction: "81.8%"
  target_met: true
```

## Critérios de Sucesso

- [ ] >80% de redução geral de padrões alcançada
- [ ] O clustering de cores usa similaridade HSL (não apenas distância hex)
- [ ] Variantes de botões identificadas por propósito semântico
- [ ] Escala de espaçamento baseada em uma unidade base consistente
- [ ] Padrões mais usados preservados como tokens primários
- [ ] Todas as decisões de consolidação documentadas com justificativa
- [ ] O usuário pode revisar e sobrepor (override) antes de finalizar

## Tratamento de Erros

- **Nenhum dado de auditoria encontrado**: Sair com mensagem para executar *audit primeiro
- **Padrões insuficientes para consolidar**: Reportar que o codebase já está limpo
- **Não é possível alcançar 80% de redução**: Explicar por que e mostrar a redução real alcançada
- **Arquivo de estado inválido**: Tentar recuperar a partir do backup ou solicitar nova auditoria

## Considerações de Segurança

- Análise somente-leitura dos padrões (sem modificação de código)
- Validar os overrides do usuário para prevenir injeção
- Tratar valores de cor malformados com segurança
- Fazer backup do arquivo de estado antes de sobrescrever

## Exemplos

### Exemplo 1: Consolidação Bem-Sucedida

```bash
*consolidate
```

Saída:
```
🎨 CONSOLIDANDO CORES...
Encontradas 89 cores únicas
Agrupando com limiar HSL de 5%...

CLUSTER 1 - Azuis Primários (4 → 1):
  #0066CC (234 usos) <- MANTER
  #0065CB, #0067CD, #0064CA (mesclar)

CLUSTER 2 - Vermelhos de Erro (3 → 1):
  #DC2626 (89 usos) <- MANTER
  #DB2525, #DD2727 (mesclar)

📊 RESUMO DA CONSOLIDAÇÃO:
| Padrão     | Antes  | Depois | Redução   |
|------------|--------|--------|-----------|
| Cores      | 89     | 12     | 86.5%     |
| Botões     | 47     | 3      | 93.6%     |
| Espaçamento| 19     | 7      | 63.2%     |
| Tipografia | 21     | 10     | 52.4%     |
| TOTAL      | 176    | 32     | 81.8%     |

✅ META ATINGIDA: >80% de redução alcançada
✅ Relatório salvo: outputs/design-system/my-app/consolidation/consolidation-report.md
```

### Exemplo 2: Override do Usuário

```bash
*consolidate

Brad: "Mesclar #0066CC e #0052A3?"
Usuário: "Não, #0052A3 é um estado de hover intencional"
Brad: "Override registrado. Mantendo ambos."
```

## Notas

- O espaço de cor HSL fornece similaridade perceptual (melhor que distância RGB/hex)
- O padrão mais usado em cada cluster torna-se o token canônico
- A análise semântica de botões procura por palavras-chave: primary, main, secondary, default, danger, delete, destructive
- A escala de espaçamento deve usar uma unidade base consistente (4px ou 8px)
- Overrides manuais são respeitados e documentados
- Execute isto após cada auditoria para prevenir a regressão de padrões
- Brad diz: "Números não mentem. 82% de redução = economia real." ("Numbers don't lie. 82% reduction = real savings.")
