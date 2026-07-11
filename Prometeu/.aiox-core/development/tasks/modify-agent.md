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

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
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
task: modifyAgent()
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

# Task de Modificação de Agente

## Propósito

Modificar com segurança definições de agentes existentes, preservando sua estrutura, mantendo a compatibilidade e fornecendo capacidades de rollback. Esta task permite que o meta-agente evolua as capacidades dos agentes por meio de modificações direcionadas com validação abrangente.

## Pré-requisitos

- O agente alvo deve existir em `.aiox-core/development/agents/`
- O usuário deve fornecer a intenção de modificação ou mudanças específicas
- O sistema de backup deve estar disponível para rollback
- O Git deve estar inicializado para rastreamento de versão

## Execução da Task

### 1. Análise e Backup do Agente

- Carregar o agente alvo de `.aiox-core/development/agents/{agent-name}.md`
- Fazer parse do cabeçalho YAML e do conteúdo markdown separadamente
- Criar um backup com timestamp: `.aiox-core/development/agents/.backups/{agent-name}.md.{timestamp}`
- Extrair a estrutura atual:
  - Metadados do agente (name, id, title, icon, whenToUse)
  - Dependências (tasks, templates, checklists, data)
  - Comandos e suas descrições
  - Configuração da persona
  - Regras de customização

### 2. Processamento da Intenção de Modificação

Se o usuário fornecer uma intenção de alto nível (ex.: "adicionar capacidade de integração de memória"):
- Analisar as capacidades atuais do agente
- Determinar as mudanças necessárias:
  - Novas dependências a adicionar
  - Comandos a introduzir
  - Ajustes necessários na persona
  - Atualizações de documentação

Se o usuário fornecer mudanças específicas:
- Validar o formato e os alvos das mudanças
- Verificar conflitos com a estrutura existente
- Garantir que as mudanças mantenham a consistência do agente

### 3. Resolução de Dependências

Para novas dependências sendo adicionadas:
- Verificar se os arquivos existem nos respectivos diretórios
- Verificar dependências circulares
- Validar a compatibilidade das dependências
- Adicionar as dependências nas seções corretas:
  - tasks → `dependencies.tasks`
  - templates → `dependencies.templates`
  - checklists → `dependencies.checklists`
  - data → `dependencies.data`
  - tools → `dependencies.tools`

### 4. Gerar o Diff da Modificação

Criar um diff visual mostrando:
```diff
@@ Agent: {agent-name} @@
--- Current Version
+++ Modified Version

@@ Dependencies @@
  tasks:
    - existing-task.md
+   - new-capability-task.md
    
@@ Commands @@
  - help: Show available commands
+ - new-command: Description of new capability

@@ Persona @@
  role: Current role description
- focus: Old focus area
+ focus: Updated focus area with new capabilities
```

### 5. Pipeline de Validação

Rodar verificações de validação abrangentes:
- Validação de sintaxe YAML
- Integridade da estrutura markdown
- Verificação da existência das dependências
- Validação do formato dos comandos
- Nenhuma breaking change aos comandos existentes
- Compatibilidade das regras de customização

### 6. Fluxo de Aprovação do Usuário

Apresentar ao usuário:
1. Resumo das mudanças
2. Diff visual
3. Análise de impacto:
   - Novas capacidades adicionadas
   - Conflitos potenciais
   - Dependências introduzidas
4. Instruções de rollback

Solicitar aprovação explícita antes de aplicar as mudanças.

### 7. Aplicar as Modificações

Após a aprovação:
1. Gravar o conteúdo modificado no arquivo do agente
2. Atualizar o registry de metadados de componentes
3. Criar um commit git com mensagem descritiva
4. Registrar a modificação no histórico
5. Atualizar quaisquer componentes dependentes

### 8. Validação Pós-Modificação

- Testar o carregamento do agente
- Verificar se todas as dependências resolvem
- Verificar a acessibilidade dos comandos
- Validar a consistência da persona
- Rodar um teste básico de interação do agente

### 9. Capacidade de Rollback

Se forem detectados problemas ou o usuário solicitar rollback:
1. Restaurar a partir do backup com timestamp
2. Reverter o commit git
3. Atualizar o registry de metadados
4. Registrar a ação de rollback

## Medidas de Segurança

1. **Backup Antes de Modificar**: Sempre criar backup antes das mudanças
2. **Validação Primeiro**: Nunca aplicar modificações não validadas
3. **Aprovação do Usuário**: Exigir aprovação explícita para todas as mudanças
4. **Operações Atômicas**: Abordagem de modificação tudo-ou-nada
5. **Integração Git**: Toda mudança rastreada no controle de versão

## Formato de Saída

```
=== Agent Modification Report ===
Agent: {agent-name}
Timestamp: {ISO-8601 timestamp}
Backup: {backup-file-path}

Changes Applied:
✓ Added {n} new dependencies
✓ Modified {n} commands
✓ Updated persona configuration
✓ Enhanced capabilities for {feature}

Validation Results:
✓ YAML syntax valid
✓ All dependencies exist
✓ No breaking changes
✓ Git commit created: {commit-hash}

New Capabilities:
- {capability-1}
- {capability-2}

Agent ready for use with enhanced capabilities.
```

## Tratamento de Erros

- Arquivo não encontrado → Verificar o nome e o caminho do agente
- YAML inválido → Mostrar a localização do erro de sintaxe
- Dependências ausentes → Listar os arquivos indisponíveis
- Erros de Git → Fornecer passos de recuperação manual
- Falhas de validação → Mostrar os problemas específicos

## Pontos de Integração

- Usa `component-metadata.js` para atualizações do registry
- Integra-se com `git-wrapper.js` para controle de versão
- Aproveita `yaml-validator.js` para verificação de sintaxe
- Coordena com `rollback-handler.js` para recuperação
