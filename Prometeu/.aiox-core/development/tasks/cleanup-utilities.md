---
tools:
  - github-cli        # Operações Git para arquivar arquivos
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task de Limpeza de Utilitários

## Propósito

Arquivar com segurança os utilitários DEPRECATED identificados na auditoria da Story 3.17, reduzindo a dívida técnica e a confusão dos desenvolvedores, mantendo a capacidade de restaurar os utilitários se necessário.

## Princípios de Segurança

**CRÍTICO**: Esta task arquiva (não exclui) utilitários DEPRECATED usando um fluxo de trabalho à prova de falhas:
1. **Backup primeiro** - Crie um backup com timestamp antes de qualquer mudança
2. **Verifique dependências** - Bloqueie a remoção se código ativo depender do utilitário
3. **Arquive, não exclua** - Preserve os arquivos para referência histórica
4. **Valide depois** - Garanta que o framework ainda funciona após a limpeza
5. **Documente o rollback** - Instruções claras para desfazer se necessário

## Pré-requisitos

- Story 3.17 concluída (UTILITIES-AUDIT-REPORT.md existe)
- Lista de utilitários DEPRECATED do relatório de auditoria
- Repositório Git em estado limpo

## Revisão de Classificação

Antes da limpeza, verifique se os utilitários estão realmente depreciados:

### ✅ SEGURO PARA ARQUIVAR
- Sem referências de código ativo (grep mostra 0 resultados)
- Classificado como DEPRECATED no relatório de auditoria
- Conceito obsoleto ou não funcional
- Existe uma versão duplicada/refatorada

### ⚠️ PRECISA DE REVISÃO
- Tem referências ativas no código (grep mostra >0 resultados)
- Classificado como FIXABLE mas precisa de depreciação
- Status incerto a partir da auditoria

### ❌ NÃO ARQUIVAR
- Classificado como WORKING no relatório de auditoria
- Utilitário crítico do framework
- Tem dependências ativas de agente/task

## Dependências de Configuração

Esta task requer as seguintes chaves de configuração de `core-config.yaml`:

- **`devStoryLocation`**: Local dos arquivos de story (tipicamente docs/stories) - Necessário para acessar os resultados da auditoria da Story 3.17
- **`core-config`**: Referência direta ao arquivo de configuração central - Esta task atualiza a contagem de utilitários em core-config.yaml
- **`qaLocation`**: Diretório de saída do QA (tipicamente docs/qa) - Necessário para escrever os relatórios de qualidade

**Carregando a Config:**
```javascript
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../.aiox-core/core-config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

const devStoryLocation = config.devStoryLocation; // Para acessar o relatório de auditoria
const coreConfigPath = configPath; // Para atualizar a contagem de utilitários
const qaLocation = config.qa?.qaLocation || 'docs/qa'; // qaLocation
```

## Passos de Execução

### Step 1: Preparação Pré-Limpeza

**1.1 Criar Backup**
```bash
# Cria um backup com timestamp de todo o diretório utils
mkdir -p .backups
cp -r .aiox-core/utils ".backups/utils.backup-3.18-$(date +%Y%m%d-%H%M%S)"
```

**1.2 Verificar o Relatório de Auditoria**
```bash
# Garante que o relatório de auditoria existe e é legível
test -f UTILITIES-AUDIT-REPORT.md && echo "✅ Audit report found" || echo "❌ Audit report missing"
```

**1.3 Extrair a Lista de Depreciados**

A partir do UTILITIES-AUDIT-REPORT.md, identifique todos os utilitários em:
- Category A: Versões Duplicadas/Redundantes
- Category B: Experimentos Incompletos
- Category C: Conceitos Obsoletos
- Category D: Mal posicionados (mover, não arquivar)

### Step 2: Verificação de Dependências (CRÍTICO)

Para cada utilitário depreciado, verifique referências ativas:

**2.1 Verificação Automatizada de Dependências**
```bash
# Verifica statements require()
grep -r "require.*utility-name" .aiox-core/agents .aiox-core/tasks .aiox-core/workflows Squads/

# Verifica referências em string (utilitário mencionado em docs/configs)
grep -r "utility-name" .aiox-core/agents/ .aiox-core/tasks/ .aiox-core/core-config.yaml

# Conta o total de referências
count=$(grep -r "utility-name" .aiox-core/ Squads/ 2>/dev/null | wc -l)
echo "References found: $count"
```

**2.2 Revisão Manual**

Se forem encontradas referências (count > 0):
- Revise o contexto de cada referência
- Determine se a referência é:
  - Uso ativo (BLOQUEAR remoção)
  - Comentário/documentação (SEGURO remover)
  - Referência obsoleta (ATUALIZAR e depois remover)

**2.3 Criar Lista de Exceções**

Documente os utilitários que não podem ser arquivados devido a dependências:
```markdown
## Utilities with Active Dependencies

1. utility-name.js
   - References: 5 locations
   - Reason: Still used by @agent-name
   - Action: Defer until Story X.XX removes dependency
```

### Step 3: Criar a Estrutura de Arquivamento

**3.1 Criar o Diretório de Arquivo**
```bash
mkdir -p .aiox-core/utils-archive
```

**3.2 Criar o README do Arquivo**

Crie `.aiox-core/utils-archive/ARCHIVE-README.md`:

```markdown
# Utilitários Arquivados - Story 3.18

**Data do Arquivamento**: 2025-10-31
**Story**: Epic 3c - Story 3.18 (Limpeza e Depreciação de Utilitários)
**Relatório de Auditoria**: UTILITIES-AUDIT-REPORT.md (Story 3.17)

## Propósito

Este diretório contém utilitários que foram depreciados e removidos do uso ativo durante o Epic 3 Fase 2. Os arquivos são preservados para referência histórica e potencial restauração.

## Por Que Arquivar em Vez de Excluir?

1. **Referência Histórica** - Documentar o que foi tentado e por que não funcionou
2. **Capacidade de Restauração** - Permitir restauração futura se o utilitário for necessário
3. **Trilha de Auditoria** - Manter o histórico completo do codebase
4. **Recurso de Aprendizado** - Estudar padrões que não deram certo

## Categorias do Arquivo

### Category A: Versões Duplicadas/Redundantes (9 arquivos)
Utilitários com sufixos `-refactored` ou `-fixed` onde a versão original funciona.

### Category B: Experimentos Incompletos (9 arquivos)
Utilitários parcialmente implementados que foram abandonados antes da conclusão.

### Category C: Conceitos Obsoletos (12 arquivos)
Utilitários cuja funcionalidade é melhor tratada por ferramentas externas ou processos manuais.

### Category D: Arquivos Mal posicionados (1 arquivo)
Arquivos de teste que pertencem ao diretório `/tests` em vez de `/utils`.

## Como Restaurar um Utilitário

Se você precisar restaurar um utilitário arquivado:

1. **Copie o arquivo de volta**:
   ```bash
   cp .aiox-core/utils-archive/utility-name.js .aiox-core/scripts/
   ```

2. **Reinstale as dependências** (se necessário):
   ```bash
   npm install missing-dependency
   ```

3. **Atualize as referências**:
   - Adicione o utilitário às dependências do agente se necessário
   - Atualize os workflows de task que o utilizam
   - Adicione ao registro do core-config.yaml

4. **Teste exaustivamente**:
   ```bash
   node .aiox-core/scripts/test-utilities.js
   ```

5. **Atualize a Story 3.18**:
   - Documente qual utilitário foi restaurado e por quê
   - Reclassifique no relatório de auditoria (DEPRECATED → WORKING/FIXABLE)

## Utilitários Arquivados

Total: 28 arquivos arquivados de 81 utilitários no total

[Lista detalhada gerada durante a limpeza]

## Procedimento de Rollback

Se a limpeza quebrar algo:

**Rollback Imediato**:
```bash
rm -rf .aiox-core/utils
cp -r .backups/utils.backup-3.18-YYYYMMDD-HHMMSS .aiox-core/utils
```

**Restauração Seletiva**:
```bash
cp .aiox-core/utils-archive/specific-utility.js .aiox-core/scripts/
```

---

## Modos de Execução

**Escolha o seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tasks simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise de task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (Formato de Task AIOX V1.0)

```yaml
task: cleanupUtilities()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Molecule

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

- **Tool:** task-runner
  - **Purpose:** Execução e orquestração de tasks
  - **Source:** .aiox-core/core/task-runner.js

- **Tool:** logger
  - **Purpose:** Logging de execução e rastreamento de erros
  - **Source:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico de agente para esta task:**

- **Script:** execute-task.js
  - **Purpose:** Wrapper genérico de execução de task
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Error:** Task Not Found
   - **Cause:** Task especificada não registrada no sistema
   - **Resolution:** Verificar o nome e o registro da task
   - **Recovery:** Listar tasks disponíveis, sugerir similares

2. **Error:** Invalid Parameters
   - **Cause:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolution:** Validar os parâmetros contra a definição da task
   - **Recovery:** Fornecer template de parâmetros, rejeitar a execução

3. **Error:** Execution Timeout
   - **Cause:** A task excede o tempo máximo de execução
   - **Resolution:** Otimizar a task ou aumentar o timeout
   - **Recovery:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelize operações independentes; reutilize resultados de átomos; implemente saídas antecipadas (early exits)

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

*Generated during Story 3.18 - Epic 3c Phase 2*
```

### Step 4: Executar a Limpeza

**4.1 Arquivar Utilitários Depreciados**

Para cada utilitário na lista de depreciados com 0 dependências:

```bash
# Use git mv para preservar o histórico
git mv .aiox-core/scripts/utility-name.js .aiox-core/utils-archive/

# Ou para múltiplos arquivos:
git mv .aiox-core/scripts/{aiox-validator-fixed.js,aiox-validator-refactored.js} .aiox-core/utils-archive/
```

**4.2 Mover Arquivos Mal posicionados** (Category D)

```bash
# Cria o diretório tests se ele não existir
mkdir -p tests/utils

# Move os arquivos de teste para o local correto
git mv .aiox-core/scripts/aiox-validator.test.js tests/utils/
```

**4.3 Atualizar o README do Arquivo**

Adicione a lista completa de arquivos arquivados ao ARCHIVE-README.md:

```markdown
## Archived Utilities

### Category A: Duplicate/Redundant (9 files)
1. aiox-validator-fixed.js - Duplicate of aiox-validator.js
2. aiox-validator-refactored.js - Duplicate of aiox-validator.js
...

### Category B: Incomplete Experiments (9 files)
1. change-propagation-predictor.js - 20% complete, no clear use case
...

### Category C: Obsolete Concepts (12 files)
1. batch-creator.js - Batch processing not used
...

**Total Archived**: 30 files
**Remaining Active**: 51 files
```

### Step 5: Atualizar a Documentação

**5.1 Atualizar core-config.yaml**

Atualize a contagem de utilitários em `.aiox-core/core-config.yaml`:

```yaml
framework:
  entities:
    utils:
      count: 51  # Updated from 81
      location: .aiox-core/scripts/
```

**5.2 Adicionar Entrada no Changelog**

Adicione uma entrada ao changelog do Epic 3 (ou ao change_log da Story 3.18):

```yaml
- date: '2025-10-31'
  version: 2.0.0
  description: Utilities cleanup complete - 30 deprecated files archived
  author: James (@dev)
  changes:
    - 'Archived 30 deprecated utilities (37% of total 81)'
    - 'Created utils-archive/ with restoration documentation'
    - 'Moved 1 test file to proper location'
    - 'Updated core-config.yaml utility count: 81 → 51'
    - 'Framework validation passed post-cleanup'
    - 'All agents (@dev, @po, @qa) activate successfully'
```

**5.3 Atualizar os Guias do Desenvolvedor**

Se algum guia do desenvolvedor referenciar utilitários arquivados, atualize-os:
- Remova as referências a utilitários depreciados
- Atualize as listas de utilitários para refletir apenas os utilitários ativos
- Adicione uma nota sobre o local dos utilitários arquivados

### Step 6: Validação (CRÍTICO)

**6.1 Validação do Framework**

Execute o validador do framework para garantir que não há referências quebradas:

```bash
node .aiox-core/scripts/aiox-validator.js
```

Esperado: 0 erros relacionados a utilitários ausentes

**6.2 Testes de Ativação de Agentes**

Teste se todos os agentes principais ainda ativam:

```bash
# Teste cada agente manualmente ou via script
# agente @dev
# agente @po
# agente @qa
```

Esperado: Todos os agentes carregam sem erros

**6.3 Validação com Grep**

Verifique se não há referências quebradas a utilitários arquivados:

```bash
# Verifica statements require() apontando para utilitários arquivados
for util in $(ls .aiox-core/utils-archive/*.js); do
  name=$(basename $util .js)
  refs=$(grep -r "require.*$name" .aiox-core/agents .aiox-core/tasks 2>/dev/null | wc -l)
  if [ $refs -gt 0 ]; then
    echo "⚠️ Found $refs references to archived utility: $name"
  fi
done
```

Esperado: 0 referências a utilitários arquivados

**6.4 Varredura com test-utilities**

Reexecute o test-utilities.js para verificar os utilitários remanescentes:

```bash
node .aiox-core/scripts/test-utilities.js
```

Esperado: Apenas utilitários ativos testados, sem erros ao carregar utilitários

### Step 7: Criar a Documentação de Rollback

Documente o procedimento exato de rollback nas notas de conclusão da story:

```markdown
## Rollback Procedure

**Backup Location**: `.backups/utils.backup-3.18-YYYYMMDD-HHMMSS`

**Full Rollback**:
```bash
rm -rf .aiox-core/utils
cp -r .backups/utils.backup-3.18-YYYYMMDD-HHMMSS .aiox-core/utils
git checkout .aiox-core/core-config.yaml
```

**Selective Restoration**:
```bash
cp .aiox-core/utils-archive/utility-name.js .aiox-core/scripts/
```

**Verification**:
```bash
node .aiox-core/scripts/aiox-validator.js
```
```

## Saída

**Entregáveis Principais**:
1. `.aiox-core/utils-archive/` - Diretório de arquivo com 30 utilitários depreciados
2. `.aiox-core/utils-archive/ARCHIVE-README.md` - Documentação do arquivo
3. `.backups/utils.backup-3.18-YYYYMMDD-HHMMSS/` - Backup com timestamp
4. `.aiox-core/core-config.yaml` atualizado - Contagem de utilitários corrigida
5. change_log da story atualizado - Entrada de conclusão da limpeza

**Resultados Esperados**:
- 30 utilitários arquivados (37% dos 81 no total)
- 51 utilitários permanecem ativos (63% do total)
- 1 arquivo de teste movido para o local correto
- 0 referências quebradas introduzidas
- Todos os agentes ativam com sucesso
- A validação do framework passa

## Critérios de Sucesso

- ✅ Todos os 30 utilitários depreciados arquivados sem exclusão
- ✅ Zero referências quebradas (validação com grep passa)
- ✅ A validação do framework (aiox-validator.js) passa
- ✅ Todos os agentes (@dev, @po, @qa) ativam com sucesso
- ✅ Backup criado antes das mudanças
- ✅ README do arquivo criado com instruções de restauração
- ✅ core-config.yaml atualizado com precisão
- ✅ Procedimento de rollback documentado e testado
- ✅ Nenhuma referência a utilitários nos agentes aponta para utilitários arquivados

## Notas

### Compatibilidade com Windows
- Use o Git Bash para os comandos (git mv, grep, etc.)
- Caminhos de backup: `.backups/utils.backup-3.18-YYYYMMDD-HHMMSS`
- Teste no Windows 10/11 com o Git para Windows

### Lembretes de Segurança
- **NUNCA** exclua arquivos, apenas arquive
- **SEMPRE** faça backup antes de fazer mudanças
- **VERIFIQUE** as dependências antes de arquivar
- **TESTE** o framework após a limpeza
- **DOCUMENTE** o procedimento de rollback

### Integração com safe-removal-handler.js

Embora esta task possa ser executada manualmente seguindo os passos acima, o utilitário `safe-removal-handler.js` fornece verificações de segurança automatizadas. Para limpezas futuras, considere integrar com o handler para:
- Verificação automatizada de dependências
- Verificação de segurança
- Quarentena para utilitários incertos
- Capacidade de rollback automatizado

Para esta limpeza, a execução manual é preferida para manter total controle e visibilidade.

## Tempo Estimado

- Step 1-2: 1 hora (preparação + verificação de dependências)
- Step 3: 30 minutos (estrutura de arquivamento)
- Step 4: 1 hora (execução)
- Step 5: 30 minutos (documentação)
- Step 6: 1 hora (validação)
- **Total**: 4 horas

## Problemas Comuns

**Problema**: Git mv falha com "file not found"
**Solução**: Verifique se o arquivo existe e se o caminho está correto, use barras normais (forward slashes)

**Problema**: Grep mostra falsos positivos (referências em comentários)
**Solução**: Revise manualmente cada referência, ignore comentários/docs

**Problema**: A ativação do agente falha após a limpeza
**Solução**: Verifique qual utilitário está ausente, restaure do arquivo, investigue

**Problema**: Erros no script de validação
**Solução**: Faça rollback, identifique qual utilitário arquivado era necessário, atualize a classificação da auditoria
