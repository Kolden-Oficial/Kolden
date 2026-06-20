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
task: correctCourse()
responsável: Pax (Balancer)
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
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; faça cache dos resultados intermediários; agrupe operações similares em lote

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

tools:
  - github-cli
checklists:
  - change-checklist.md
---

# Task Correct Course (Corrigir o Curso)

## Propósito

- Guiar uma resposta estruturada a um gatilho de mudança usando o `.aiox-core/product/checklists/change-checklist.md`.
- Analisar os impactos da mudança sobre epics, artefatos do projeto e o MVP, guiado pela estrutura do checklist.
- Explorar soluções potenciais (ex.: ajustar escopo, reverter elementos, re-escopar funcionalidades) conforme solicitado pelo checklist.
- Redigir atualizações propostas específicas e acionáveis para quaisquer artefatos do projeto afetados (ex.: epics, user stories, seções do PRD, seções do documento de arquitetura) com base na análise.
- Produzir um documento consolidado de "Proposta de Mudança de Sprint" (Sprint Change Proposal) que contenha a análise de impacto e as edições propostas claramente redigidas para revisão e aprovação do usuário.
- Garantir um caminho de handoff claro caso a natureza das mudanças exija replanejamento fundamental por outros agentes core (como PM ou Architect).

## Instruções

### 1. Configuração Inicial e Seleção de Modo

- **Reconhecer a Task e as Entradas:**
  - Confirme com o usuário que a "Task Correct Course" (Navegação e Integração de Mudanças) está sendo iniciada.
  - Verifique o gatilho da mudança e certifique-se de ter a explicação inicial do usuário sobre o problema e seu impacto percebido.
  - Confirme o acesso a todos os artefatos relevantes do projeto (ex.: PRD, Epics/Stories, Documentos de Arquitetura, Especificações de UI/UX) e, criticamente, ao `.aiox-core/product/checklists/change-checklist.md`.
- **Estabelecer o Modo de Interação:**
  - Pergunte ao usuário o modo de interação preferido para esta task:
    - **"Incrementalmente (Padrão e Recomendado):** Devemos percorrer o change-checklist seção por seção, discutindo os achados e redigindo colaborativamente as mudanças propostas para cada parte relevante antes de avançar para a próxima? Isso permite um refinamento detalhado, passo a passo."
    - **"Modo YOLO (Processamento em Lote):** Ou você prefere que eu conduza uma análise mais em lote com base no checklist e depois apresente um conjunto consolidado de achados e mudanças propostas para uma revisão mais ampla? Isso pode ser mais rápido para a avaliação inicial, mas pode exigir uma revisão mais extensa das propostas combinadas."
  - Assim que o usuário escolher, confirme o modo selecionado e então informe o usuário: "Agora usaremos o change-checklist para analisar a mudança e redigir as atualizações propostas. Vou guiá-lo pelos itens do checklist com base no modo de interação que escolhemos."

### 2. Executar a Análise do Checklist (Iterativa ou em Lote, conforme o Modo de Interação)

- Percorra sistematicamente as Seções 1-4 do change-checklist (que tipicamente cobrem Contexto da Mudança, Análise de Impacto em Epics/Stories, Resolução de Conflitos entre Artefatos e Avaliação/Recomendação de Caminho).
- Para cada item do checklist ou grupo lógico de itens (dependendo do modo de interação):
  - Apresente os prompt(s) ou considerações relevantes do checklist ao usuário.
  - Solicite as informações necessárias e analise ativamente os artefatos relevantes do projeto (PRD, epics, documentos de arquitetura, histórico de stories, etc.) para avaliar o impacto.
  - Discuta os seus achados de cada item com o usuário.
  - Registre o status de cada item do checklist (ex.: `[x] Addressed`, `[N/A]`, `[!] Further Action Needed`) e quaisquer notas ou decisões pertinentes.
  - Acorde colaborativamente o "Caminho Recomendado a Seguir" (Recommended Path Forward) conforme solicitado pela Seção 4 do checklist.

### 3. Redigir as Mudanças Propostas (Iterativamente ou em Lote)

- Com base na análise concluída do checklist (Seções 1-4) e no "Caminho Recomendado a Seguir" acordado (excluindo cenários que exijam replanejamentos fundamentais que necessitariam de handoff imediato para PM/Architect):
  - Identifique os artefatos específicos do projeto que requerem atualizações (ex.: epics específicos, user stories, seções do PRD, componentes do documento de arquitetura, diagramas).
  - **Redija as mudanças propostas de forma direta e explícita para cada artefato identificado.** Os exemplos incluem:
    - Revisar o texto da user story, os critérios de aceite ou a prioridade.
    - Adicionar, remover, reordenar ou dividir user stories dentro de epics.
    - Propor trechos modificados de diagramas de arquitetura (ex.: fornecer um bloco de diagrama Mermaid atualizado ou uma descrição textual clara da mudança em um diagrama existente).
    - Atualizar listas de tecnologias, detalhes de configuração ou seções específicas dentro do PRD ou dos documentos de arquitetura.
    - Redigir novos artefatos pequenos de apoio, se necessário (ex.: um breve adendo para uma decisão específica).
  - Se estiver em "Modo Incremental", discuta e refine essas edições propostas para cada artefato ou pequeno grupo de artefatos relacionados com o usuário à medida que forem redigidas.
  - Se estiver em "Modo YOLO", compile todas as edições redigidas para apresentação no próximo passo.

### 4. Gerar a "Proposta de Mudança de Sprint" com as Edições

- Sintetize a análise completa do change-checklist (cobrindo os achados das Seções 1-4) e todas as edições propostas acordadas (da Instrução 3) em um único documento intitulado "Proposta de Mudança de Sprint" (Sprint Change Proposal). Esta proposta deve se alinhar à estrutura sugerida pela Seção 5 do change-checklist.
- A proposta deve apresentar claramente:
  - **Resumo da Análise:** Uma visão geral concisa do problema original, seu impacto analisado (sobre epics, artefatos, escopo do MVP) e a justificativa do caminho escolhido a seguir.
  - **Edições Propostas Específicas:** Para cada artefato afetado, mostre ou descreva claramente as mudanças exatas (ex.: "Mudar a Story X.Y de: [texto antigo] Para: [texto novo]", "Adicionar novo Critério de Aceite à Story A.B: [novo AC]", "Atualizar a Seção 3.2 do Documento de Arquitetura da seguinte forma: [texto/diagrama novo ou modificado]").
- Apresente o rascunho completo da "Proposta de Mudança de Sprint" ao usuário para revisão e feedback finais. Incorpore quaisquer ajustes finais solicitados pelo usuário.

### 5. Finalizar e Determinar os Próximos Passos

- Obtenha a aprovação explícita do usuário para a "Proposta de Mudança de Sprint", incluindo todas as edições específicas nela documentadas.
- Forneça o documento finalizado da "Proposta de Mudança de Sprint" ao usuário.
- **Com base na natureza das mudanças aprovadas:**
  - **Se as edições aprovadas tratam suficientemente a mudança e podem ser implementadas diretamente ou organizadas por um PO/SM:** Declare que a "Task Correct Course" está completa no que tange à análise e à proposta de mudança, e que o usuário agora pode prosseguir com a implementação ou o registro dessas mudanças (ex.: atualizar os documentos reais do projeto, itens de backlog). Sugira o handoff para um agente PO/SM para a organização do backlog, se apropriado.
  - **Se a análise e o caminho proposto (conforme a Seção 4 do checklist e, potencialmente, a Seção 6) indicarem que a mudança requer um replanejamento mais fundamental (ex.: mudança significativa de escopo, reformulação arquitetural relevante):** Declare claramente esta conclusão. Aconselhe o usuário de que o próximo passo envolve acionar os agentes primários PM ou Architect, usando a "Proposta de Mudança de Sprint" como entrada e contexto críticos para esse esforço de replanejamento mais profundo.

## Entregáveis de Saída

- **Primário:** Um documento de "Proposta de Mudança de Sprint" (em formato markdown). Este documento conterá:
  - Um resumo da análise do change-checklist (problema, impacto, justificativa do caminho escolhido).
  - Edições propostas específicas e claramente redigidas para todos os artefatos do projeto afetados.
- **Implícito:** Um change-checklist anotado (ou o registro de sua conclusão) refletindo as discussões, os achados e as decisões tomadas durante o processo.
 