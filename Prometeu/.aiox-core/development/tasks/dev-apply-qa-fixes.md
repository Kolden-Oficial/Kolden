---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
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

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: devApplyQaFixes()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Molecule

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

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; código de saída 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a task foi concluída; código de saída 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; código de saída 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

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
  - **Propósito:** Wrapper genérico de execução de tasks
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** Task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome da task e o registro
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimado)
cost_estimated: $0.001-0.003
token_usage: ~1.000-3.000 tokens
```

**Notas de Otimização:**
- Paralelizar operações independentes; reutilizar resultados de atoms; implementar saídas antecipadas

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - development
  - code
updated_at: 2025-11-17
```

---

# Tarefa Aplicar Correções de QA

Esta task fornece instruções para aplicar correções com base no feedback de QA e nos comentários da revisão de gate. O agente DEVE seguir estas instruções para tratar sistematicamente todos os problemas de qualidade identificados durante a revisão de QA.

## Propósito

Quando uma story recebe feedback de QA, esta task ajuda os desenvolvedores a:
- Revisar os achados do QA gate sistematicamente
- Priorizar problemas por severidade
- Aplicar correções mantendo a qualidade do código
- Revalidar após as mudanças

## Instruções

1. **Carregar o Relatório do QA Gate**

   - Se o usuário fornecer um caminho de arquivo de gate, carregue-o diretamente
   - Caso contrário, verifique no arquivo da story a referência `gate_file` na seção `qa_results`
   - Se nenhum arquivo de gate for especificado, peça ao usuário o caminho do arquivo do QA gate
   - Carregue o arquivo YAML do QA gate de docs/qa/gates/

2. **Revisar os Achados**

   - Leia todos os problemas identificados no relatório do QA gate
   - Anote a pontuação de qualidade e o status do gate
   - Categorize os problemas por tipo:
     - ❌ BLOQUEANTE: Deve ser corrigido antes da aprovação
     - ⚠️ AVISO: Deveria ser corrigido, impacta a pontuação de qualidade
     - 💡 RECOMENDAÇÃO: Melhorias desejáveis
   - Priorize os problemas por severidade e impacto

3. **Criar Plano de Correção**

   - Para cada problema BLOQUEANTE:
     - Identifique os arquivos afetados
     - Determine a causa raiz
     - Planeje a abordagem específica de correção
   - Agrupe problemas relacionados que possam ser corrigidos juntos
   - Estime o esforço para cada correção

4. **Aplicar Correções Sistematicamente**

   Para cada problema:
   - Faça as mudanças de código ou documentação necessárias
   - Siga os padrões de codificação e as melhores práticas
   - Atualize os testes se necessário
   - Verifique se a correção resolve o problema específico
   - Atualize a lista de arquivos da story se novos arquivos forem criados/modificados

5. **Validação**

   Após aplicar todas as correções:
   - Rode o linting: `npm run lint`
   - Rode os testes: `npm test`
   - Rode a verificação de tipos, se aplicável: `npm run typecheck`
   - Verifique se todos os problemas BLOQUEANTES estão resolvidos
   - Confirme se as melhorias esperadas na pontuação de qualidade são esperadas

6. **Atualizar o Registro da Story**

   - Atualize a seção Dev Agent Record da story:
     - Adicione uma nota de conclusão sobre as correções de QA aplicadas
     - Atualize a lista de arquivos com quaisquer arquivos novos/modificados
     - Referencie o arquivo do QA gate no debug log, se necessário
   - NÃO modifique a seção qa_results (essa é para o revisor de QA)

7. **Reenvio**

   - Confirme que todos os problemas BLOQUEANTES foram resolvidos
   - Verifique se os testes de regressão ainda passam
   - Informe o usuário de que a story está pronta para a re-revisão de QA
   - Opcionalmente, atualize o status da story para indicar "Correções de QA Aplicadas"

## Melhores Práticas

- **Trate as causas raiz**: Não corrija apenas os sintomas, entenda e corrija o problema subjacente
- **Mantenha a cobertura de testes**: Se você modificar código, atualize ou adicione testes
- **Siga os padrões**: Use os padrões existentes do codebase para consistência
- **Documente correções complexas**: Adicione comentários explicando mudanças não óbvias
- **Valide minuciosamente**: Rode a suíte completa de testes, não apenas os testes afetados
- **Comunique com clareza**: Atualize as notas da story com um resumo das mudanças feitas

## Tipos Comuns de Problemas de QA

### Problemas de Qualidade de Código
- Erros ou avisos de linting
- Inconsistências de estilo de código
- Tratamento de erros ausente
- Variáveis ou imports não utilizados
- Funções complexas que precisam de refatoração

### Problemas de Testes
- Casos de teste ausentes
- Testes falhando
- Cobertura de testes insuficiente
- Testes instáveis (flaky)

### Problemas de Documentação
- Comentários ausentes ou incompletos
- Documentação desatualizada
- Atualizações de README ausentes ou incorretas
- Atualizações incompletas no arquivo da story

### Problemas de Arquitetura
- Violações dos padrões de codificação
- Uso inadequado de dependências
- Preocupações de performance
- Vulnerabilidades de segurança

## Critérios de Saída

Esta task está completa quando:
- ✅ Todos os problemas BLOQUEANTES do QA gate estão resolvidos
- ✅ Todos os testes passam (linting, unitários, integração)
- ✅ O arquivo da story está atualizado com as mudanças
- ✅ O código está pronto para a re-revisão de QA
