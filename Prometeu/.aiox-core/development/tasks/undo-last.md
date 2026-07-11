---
# No checklists needed - rollback operation with built-in transaction validation
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Desfazer a Última Operação de Componente

**Task ID:** undo-last  
**Agent:** aiox-developer  
**Version:** 1.0

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: undoLast()
responsável: Dex (Builder)
responsavel_type: Agente
atomic_layer: Atom

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve existir

- campo: version
  tipo: string
  origem: User Input
  obrigatório: false
  validação: Versão alvo ou timestamp

**Saída:**
- campo: restored_state
  tipo: object
  destino: File system
  persistido: true

- campo: rollback_log
  tipo: array
  destino: File (.ai/rollback/*)
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Backup existe; alvo do rollback válido
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se backup existe; alvo do rollback válido
    error_message: "Pre-condition failed: Backup exists; rollback target valid"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Estado restaurado; integridade verificada; sem perda de dados
    tipo: post-condition
    blocker: true
    validação: |
      Verificar estado restaurado; integridade verificada; sem perda de dados
    error_message: "Post-condition failed: State restored; integrity verified; no data loss"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Estado original restaurado; sem mudanças residuais
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assegurar que o estado original foi restaurado; sem mudanças residuais
    error_message: "Acceptance criterion not met: Original state restored; no residual changes"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** backup-manager
  - **Propósito:** Operações de backup e restore
  - **Origem:** .aiox-core/utils/backup-manager.js

- **Ferramenta:** version-control
  - **Propósito:** Operações Git para rollback
  - **Origem:** npm: simple-git

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** rollback-changes.js
  - **Propósito:** Reverter para o estado anterior
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/rollback-changes.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Backup Não Encontrado
   - **Causa:** Nenhum backup existe para a versão alvo
   - **Resolução:** Verificar a localização e a versão do backup
   - **Recuperação:** Listar os backups disponíveis, abortar se não houver nenhum

2. **Erro:** Falha no Rollback
   - **Causa:** Erro ao restaurar o estado anterior
   - **Resolução:** Verificar a integridade e as permissões do backup
   - **Recuperação:** Preservar o estado atual, registrar a falha

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 0.5-2 min (estimated)
cost_estimated: $0.0001-0.0005
token_usage: ~500-1,000 tokens
```

**Notas de Otimização:**
- Minimizar dependências externas; cachear resultados se reutilizáveis; validar entradas cedo

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

Reverte a última operação de criação ou modificação de componente. Esta task permite desfazer mudanças recentes feitas pelo agente aiox-developer, incluindo criação de componente único, criação em lote ou atualizações de componente.

## Contexto Necessário
- Acesso ao histórico de transações
- Permissões de sistema de arquivos para os arquivos afetados
- Permissões de escrita no manifest

## Pré-requisitos
- Logging de transações habilitado
- Arquivos de backup disponíveis
- Nenhuma operação conflitante desde a última transação

## Requisitos de Entrada
- Opcional: ID da transação a reverter (padrão: a última transação)
- Opcional: Opções de rollback seletivo

## Fluxo do Processo

### Passo 1: Identificar a Transação
Localizar a transação mais recente ou usar o ID de transação fornecido.

**Ações:**
- Consultar o histórico de transações
- Exibir os detalhes da transação
- Confirmar a intenção de rollback

**Validação:**
- A transação existe e é reversível
- O usuário confirma a operação

### Passo 2: Analisar as Mudanças
Revisar todas as mudanças feitas na transação.

**Ações:**
- Listar todas as operações de arquivo
- Mostrar as mudanças no manifest
- Exibir as atualizações de metadados do componente

**Formato de Saída:**
```
Transaction: txn-1234567890-abcd
Type: component_creation
Date: 2025-01-31T10:30:00Z
Operations:
  - Created: /aiox-core/agents/data-analyst.md
  - Updated: /aiox-core/team-manifest.yaml
  - Created: /aiox-core/tasks/analyze-data.md
```

### Passo 3: Executar o Rollback
Realizar a operação de rollback com o devido tratamento de erros.

**Ações:**
- Restaurar os backups de arquivo
- Reverter as mudanças no manifest
- Atualizar os metadados do componente
- Limpar os arquivos órfãos

**Tratamento de Erros:**
- Lidar com arquivos de backup ausentes
- Gerenciar cenários de rollback parcial
- Reportar falhas de rollback

### Passo 4: Verificar o Rollback
Garantir que todas as mudanças foram devidamente revertidas.

**Ações:**
- Verificar os estados dos arquivos
- Checar a integridade do manifest
- Validar a consistência do componente

**Critérios de Sucesso:**
- Todos os arquivos restaurados ao estado anterior
- O manifest reflete com precisão as mudanças
- Nenhuma referência órfã remanescente

## Saída

### Resposta de Sucesso
```
✅ Rollback concluído com sucesso!

Transaction: txn-1234567890-abcd
Revertido:
  - ✓ Removido: data-analyst.md
  - ✓ Restaurado: team-manifest.yaml
  - ✓ Removido: analyze-data.md
  
Total de operações: 3
Bem-sucedidas: 3
Falhas: 0
```

### Resposta de Falha
```
❌ Rollback parcialmente falhou

Transaction: txn-1234567890-abcd
Resultados:
  - ✓ Removido: data-analyst.md
  - ✗ Falha ao restaurar: team-manifest.yaml (backup não encontrado)
  - ✓ Removido: analyze-data.md

Por favor, revise e corrija manualmente as operações que falharam.
```

## Tratamento de Erros

### Erros Comuns
1. **Transação Não Encontrada**
   - Exibir as transações disponíveis
   - Sugerir verificar o ID da transação

2. **Arquivos de Backup Ausentes**
   - Avisar sobre rollback incompleto
   - Fornecer passos de recuperação manual

3. **Modificações Concorrentes**
   - Detectar mudanças de arquivo desde a transação
   - Solicitar a opção de rollback forçado

## Considerações de Segurança
- Verificar se o usuário tem permissão para fazer rollback
- Impedir o rollback de transações do sistema
- Manter a trilha de auditoria das operações de rollback
- Validar os caminhos de arquivo para prevenir traversal

## Notas de Performance
- Carregar apenas os dados de transação necessários
- Fazer streaming de arquivos de backup grandes
- Agrupar operações de arquivo em lote para eficiência

## Dependências
- Utilitário TransactionManager
- Acesso ao sistema de arquivos
- Sistema de armazenamento de backup

## Notas
- O rollback só está disponível para transações recentes (dentro do período de retenção)
- Algumas operações podem não ser totalmente reversíveis
- Sempre cria uma nova transação para o próprio rollback
- Suporta rollback seletivo para operações em lote

## Tasks Relacionadas
- create-agent
- create-task
- create-workflow
- create-suite
- update-manifest
