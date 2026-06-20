# Ap
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

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: applyQaFixes()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: task
  tipo: string
  origem: Entrada do Usuário
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: Entrada do Usuário
  obrigatório: false
  validação: Parâmetros de task válidos

- campo: mode
  tipo: string
  origem: Entrada do Usuário
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memória
  persistido: false

- campo: logs
  tipo: array
  destino: Arquivo (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: Gerenciamento de estado
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] A task está registrada; os parâmetros obrigatórios foram fornecidos; as dependências foram atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; se os parâmetros obrigatórios foram fornecidos; se as dependências foram atendidas
    error_message: "Pré-condição falhou: A task está registrada; os parâmetros obrigatórios foram fornecidos; as dependências foram atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task conclui

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

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assegurar que a task foi concluída conforme esperado; efeitos colaterais documentados
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
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar as tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, liberar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelize operações independentes; reutilize resultados de átomos; implemente saídas antecipadas

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

ply QA Fixes Task

Esta task fornece instruções para aplicar correções com base no feedback de QA e nos comentários da revisão de gate. O agente DEVE seguir estas instruções para tratar sistematicamente todos os problemas de qualidade identificados durante a revisão de QA.

## Propósito

Quando uma story recebe feedback de QA, esta task ajuda os desenvolvedores a:
- Revisar sistematicamente os achados do QA gate
- Priorizar os problemas por severidade
- Aplicar correções mantendo a qualidade do código
- Revalidar após as mudanças


## Dependências de Configuração

Esta task requer as seguintes chaves de configuração de `core-config.yaml`:

- **`devStoryLocation`**: Localização dos arquivos de story (tipicamente docs/stories)

- **`architectureShardedLocation`**: Localização dos documentos de arquitetura shardeados (tipicamente docs/architecture) - Necessário para ler/escrever a documentação de arquitetura

**Carregando a Config:**
```javascript
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../.aiox-core/core-config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

const dev_story_location = config.devStoryLocation;
const architectureShardedLocation = config.architectureShardedLocation || 'docs/architecture'; // architectureShardedLocation
```

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
     - ❌ BLOCKING: Deve ser corrigido antes da aprovação
     - ⚠️ WARNING: Deveria ser corrigido, impacta a pontuação de qualidade
     - 💡 RECOMMENDATION: Melhorias desejáveis
   - Priorize os problemas por severidade e impacto

3. **Criar o Plano de Correção**

   - Para cada problema BLOCKING:
     - Identifique os arquivos afetados
     - Determine a causa raiz
     - Planeje a abordagem específica de correção
   - Agrupe problemas relacionados que possam ser corrigidos juntos
   - Estime o esforço para cada correção

4. **Aplicar as Correções Sistematicamente**

   Para cada problema:
   - Faça as mudanças necessárias de código ou documentação
   - Siga os padrões de código e as boas práticas
   - Atualize os testes, se necessário
   - Verifique se a correção resolve o problema específico
   - Atualize a lista de arquivos da story se novos arquivos forem criados/modificados

5. **Validação**

   Após aplicar todas as correções:
   - Rode o linting: `npm run lint`
   - Rode os testes: `npm test`
   - Rode a verificação de tipos, se aplicável: `npm run typecheck`
   - Verifique se todos os problemas BLOCKING foram resolvidos
   - Confirme se as melhorias na pontuação de qualidade são as esperadas

6. **Atualizar o Registro da Story**

   - Atualize a seção Dev Agent Record da story:
     - Adicione uma nota de conclusão sobre as correções de QA aplicadas
     - Atualize a lista de arquivos com quaisquer arquivos novos/modificados
     - Referencie o arquivo do QA gate no debug log, se necessário
   - NÃO modifique a seção qa_results (essa é para o revisor de QA)

7. **Reenvio**

   - Confirme que todos os problemas BLOCKING foram resolvidos
   - Verifique se os testes de regressão ainda passam
   - Informe ao usuário que a story está pronta para a re-revisão de QA
   - Opcionalmente, atualize o status da story para indicar "QA Fixes Applied"

## Boas Práticas

- **Trate as causas raiz**: Não corrija apenas os sintomas, entenda e corrija o problema subjacente
- **Mantenha a cobertura de testes**: Se você modificar código, atualize ou adicione testes
- **Siga os padrões**: Use os padrões existentes do codebase para consistência
- **Documente correções complexas**: Adicione comentários explicando mudanças não óbvias
- **Valide minuciosamente**: Rode a suíte de testes completa, não apenas os testes afetados
- **Comunique-se com clareza**: Atualize as notas da story com um resumo das mudanças feitas

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
- Atualizações incompletas do arquivo da story

### Problemas de Arquitetura
- Violações dos padrões de código
- Uso inadequado de dependências
- Preocupações de performance
- Vulnerabilidades de segurança

## Critérios de Saída

Esta task está concluída quando:
- ✅ Todos os problemas BLOCKING do QA gate foram resolvidos
- ✅ Todos os testes passam (linting, unitários, integração)
- ✅ O arquivo da story foi atualizado com as mudanças
- ✅ O código está pronto para a re-revisão de QA

## Handoff
next_agent: @qa
next_command: *review {story-id}
condition: Correções aplicadas, pronto para re-revisão
alternatives:
  - agent: @dev, command: *run-tests, condition: Necessário verificar primeiro se as correções passam nos testes
