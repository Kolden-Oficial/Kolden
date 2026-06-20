---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Passo 0: Análise de Impacto IDS (Consultiva)

Antes de prosseguir, verifique no Entity Registry o impacto desta modificação:

1. Identificar a entidade sendo modificada
2. Rodar `FrameworkGovernor.impactAnalysis(entityId)`
3. Exibir consumidores diretos, consumidores indiretos e nível de risco
4. Mostrar o adaptability score e o aviso de limiar de 30% se aplicável
5. Se o risco for HIGH/CRITICAL:
   - Avisar o usuário: "Esta modificação afeta N consumidores. Prossiga com cautela."
6. Se o IDS estiver indisponível (timeout/erro): Avisar e prosseguir normalmente

**NOTA:** Este passo é consultivo e NÃO bloqueia a modificação. O usuário sempre tem a decisão final.

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: modifyTask()
responsável: Orion (Commander)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must exist in system

- campo: changes
  tipo: object
  origem: User Input
  obrigatório: true
  validação: Valid modification object

- campo: backup
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: true

**Saída:**
- campo: modified_file
  tipo: string
  destino: File system
  persistido: true

- campo: backup_path
  tipo: string
  destino: File system
  persistido: true

- campo: changes_applied
  tipo: object
  destino: Memory
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target exists; backup created; valid modification parameters
    tipo: pre-condition
    blocker: true
    validação: |
      Check target exists; backup created; valid modification parameters
    error_message: "Pre-condition failed: Target exists; backup created; valid modification parameters"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Modification applied; backup preserved; integrity verified
    tipo: post-condition
    blocker: true
    validação: |
      Verify modification applied; backup preserved; integrity verified
    error_message: "Post-condition failed: Modification applied; backup preserved; integrity verified"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Changes applied correctly; original backed up; rollback possible
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert changes applied correctly; original backed up; rollback possible
    error_message: "Acceptance criterion not met: Changes applied correctly; original backed up; rollback possible"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Tool:** file-system
  - **Purpose:** Leitura, modificação e backup de arquivos
  - **Source:** Node.js fs module

- **Tool:** ast-parser
  - **Purpose:** Fazer parse e modificar código com segurança
  - **Source:** .aiox-core/utils/ast-parser.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** modify-file.js
  - **Purpose:** Modificação segura de arquivos com backup
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/modify-file.js

---

## Tratamento de Erros

**Estratégia:** abort

**Erros Comuns:**

1. **Error:** Target Not Found
   - **Cause:** O recurso especificado não existe
   - **Resolution:** Verificar se o alvo existe antes da modificação
   - **Recovery:** Sugerir recursos similares ou criar novo

2. **Error:** Backup Failed
   - **Cause:** Não foi possível criar o backup antes da modificação
   - **Resolution:** Verificar espaço em disco e permissões
   - **Recovery:** Abortar a modificação, preservar o estado original

3. **Error:** Concurrent Modification
   - **Cause:** Recurso modificado por outro processo
   - **Resolution:** Implementar bloqueio de arquivo ou lógica de retry
   - **Recovery:** Repetir com backoff exponencial ou mesclar mudanças

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de Otimização:**
- Validar a configuração cedo; usar escritas atômicas; implementar checkpoints de rollback

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - modification
  - update
updated_at: 2025-11-17
```

---

checklists:
  - change-checklist.md
---

# Task de Modificação de Task

## Propósito

Modificar com segurança definições de tasks existentes, mantendo sua eficácia, preservando os fluxos de elicitação e garantindo compatibilidade retroativa. Esta task permite a evolução das capacidades das tasks por meio de modificações inteligentes com validação abrangente.

## Pré-requisitos

- A task alvo deve existir em `.aiox-core/development/tasks/`
- O usuário deve fornecer a intenção de modificação ou mudanças específicas
- O sistema de backup deve estar disponível para rollback
- Entendimento das dependências e do uso da task

## Execução da Task

### 1. Análise e Backup da Task

- Carregar a task alvo de `.aiox-core/development/tasks/{task-name}.md`
- Criar um backup com timestamp: `.aiox-core/development/tasks/.backups/{task-name}.md.{timestamp}`
- Analisar a estrutura da task:
  - Propósito e pré-requisitos
  - Passos de execução da task
  - Requisitos de elicitação (se houver)
  - Pontos de integração
  - Especificações do formato de saída

### 2. Análise de Impacto de Uso

Antes de modificar, analisar onde a task é usada:
- Buscar em todos os agentes por dependências da task
- Verificar workflows que referenciam a task
- Identificar quaisquer tasks que encadeiam nesta task
- Documentar todos os pontos de uso para avaliação de impacto

### 3. Processamento da Intenção de Modificação

Se o usuário fornecer uma intenção de alto nível (ex.: "adicionar passo de validação"):
- Analisar o fluxo atual da task
- Determinar os pontos ótimos de inserção
- Garantir que as modificações mantenham a coerência da task
- Preservar a funcionalidade existente

Se o usuário fornecer mudanças específicas:
- Validar que as mudanças não quebram o fluxo da task
- Garantir que os blocos de elicitação permaneçam válidos
- Verificar a compatibilidade do formato de saída
- Verificar se os pontos de integração permanecem funcionais

### 4. Preservação do Fluxo de Elicitação

Para tasks com `elicit: true`:
- Manter os blocos de instrução `[[LLM:`
- Preservar os pontos de interação com o usuário
- Garantir que os prompts permaneçam claros e acionáveis
- Validar a lógica de processamento de respostas

### 5. Gerar o Diff da Modificação

Criar um diff visual mostrando:
```diff
@@ Task: {task-name} @@
--- Current Version
+++ Modified Version

@@ Purpose @@
- Old purpose description
+ Enhanced purpose with new capabilities

@@ Task Execution @@
  ### Step 1: Initial Setup
  - Existing step content
+ - New validation substep
  
  ### Step 2: Processing
  [Content remains unchanged]
  
+ ### Step 3: New Validation Step
+ - Validate inputs against schema
+ - Check for security concerns
+ - Ensure data integrity

@@ Output Format @@
  {
    "status": "success",
    "data": {...},
+   "validation": {
+     "passed": true,
+     "checks": [...]
+   }
  }
```

### 6. Pipeline de Validação

Rodar validação abrangente:
- Validação de sintaxe markdown
- Consistência lógica do fluxo da task
- Verificação do formato dos blocos de elicitação
- Validação JSON/YAML do formato de saída
- Compatibilidade dos pontos de integração
- Nenhuma breaking change na interface da task

### 7. Verificação de Compatibilidade Retroativa

Garantir que as modificações mantenham a compatibilidade:
- As entradas existentes ainda são aceitas
- As adições ao formato de saída são opcionais
- A task pode ser chamada com parâmetros antigos
- Tratamento gracioso de uso legado

### 8. Fluxo de Aprovação do Usuário

Apresentar ao usuário:
1. Resumo das mudanças
2. Diff visual
3. Análise de impacto:
   - Agentes e workflows afetados
   - Novas capacidades adicionadas
   - Notas de compatibilidade
4. Guia de migração para o uso existente

Solicitar aprovação explícita antes de aplicar as mudanças.

### 9. Aplicar as Modificações

Após a aprovação:
1. Gravar o conteúdo modificado no arquivo da task
2. Atualizar os metadados da task se necessário
3. Criar um commit git com mensagem descritiva
4. Atualizar a documentação dos componentes dependentes
5. Registrar a modificação no histórico

### 10. Testes Pós-Modificação

Criar cenários de teste:
```javascript
// Test basic functionality
const result = await executeTask('modified-task', originalParams);
assert(result.status === 'success');

// Test new functionality
const enhancedResult = await executeTask('modified-task', newParams);
assert(enhancedResult.validation.passed === true);

// Test backward compatibility
const legacyResult = await executeTask('modified-task', legacyParams);
assert(isCompatibleOutput(legacyResult));
```

### 11. Capacidade de Rollback

Se forem detectados problemas:
1. Restaurar a partir do backup com timestamp
2. Reverter o commit git
3. Notificar os componentes afetados
4. Registrar o rollback com o motivo

## Medidas de Segurança

1. **Análise de Uso Primeiro**: Sempre verificar o uso da task antes de modificar
2. **Preservar o Fluxo Central**: Nunca quebrar a lógica existente da task
3. **Integridade da Elicitação**: Manter os elementos interativos
4. **Cobertura de Testes**: Garantir que as modificações sejam testáveis
5. **Sincronização de Documentação**: Atualizar a documentação da task com as mudanças

## Formato de Saída

```
=== Task Modification Report ===
Task: {task-name}
Timestamp: {ISO-8601 timestamp}
Backup: {backup-file-path}

Usage Analysis:
- Used by {n} agents: {agent-list}
- Referenced in {n} workflows: {workflow-list}
- Chain dependencies: {dependency-list}

Changes Applied:
✓ Enhanced {section} with {feature}
✓ Added {n} new steps
✓ Updated output format
✓ Maintained backward compatibility

Validation Results:
✓ Task flow validated
✓ Elicitation blocks intact
✓ Output format valid
✓ No breaking changes
✓ Git commit created: {commit-hash}

Testing Results:
✓ Original functionality preserved
✓ New features operational
✓ Backward compatibility confirmed

Migration Notes:
- Existing usage remains functional
- New parameters available: {param-list}
- Enhanced output includes: {new-fields}

Task ready for use with enhanced capabilities.
```

## Tratamento de Erros

- Task não encontrada → Verificar o nome e o caminho da task
- Ruptura de fluxo → Mostrar os conflitos específicos de passos
- Erros de elicitação → Destacar os problemas de formato
- Quebras de compatibilidade → Fornecer caminho de migração
- Falhas de teste → Mostrar os cenários que falharam

## Pontos de Integração

- Coordena com as tasks de modificação de agentes
- Usa `git-wrapper.js` para controle de versão
- Aproveita `dependency-analyzer.js` para análise de uso
- Integra-se com frameworks de teste para validação
