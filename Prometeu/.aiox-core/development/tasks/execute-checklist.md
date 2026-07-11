---
# Nenhum template necessário - esta tarefa executa checklists existentes, não cria saídas de documento
tools:
  - github-cli  # Para coleta de documentos
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Tarefa de Validação de Checklist

Esta tarefa fornece instruções para validar documentação em relação a checklists. O agente DEVE seguir estas instruções para garantir uma validação completa e sistemática dos documentos.

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts) **[PADRÃO]**
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) 
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução sem nenhuma ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Tarefa (AIOX Task Format V1.0)

```yaml
task: executeChecklist()
responsável: Quinn (Guardian)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser uma tarefa registrada

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Parâmetros de tarefa válidos

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

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] A tarefa está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a tarefa está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: A tarefa está registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Tarefa concluída; código de saída 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a tarefa foi concluída; código de saída 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Tarefa concluída; código de saída 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Tarefa concluída conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Garantir que a tarefa foi concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Tarefa concluída conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tarefas
  - **Fonte:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Registro de execução e rastreamento de erros
  - **Fonte:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de tarefas
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** abort

**Erros Comuns:**

1. **Erro:** Tarefa Não Encontrada
   - **Causa:** A tarefa especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da tarefa
   - **Recuperação:** Listar tarefas disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da tarefa não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da tarefa
   - **Recuperação:** Fornecer um template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A tarefa excede o tempo máximo de execução
   - **Resolução:** Otimizar a tarefa ou aumentar o timeout
   - **Recuperação:** Encerrar a tarefa, limpar recursos, registrar estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimado)
cost_estimated: $0.003-0.010
token_usage: ~3.000-10.000 tokens
```

**Notas de Otimização:**
- Dividir em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

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


## Checklists Disponíveis

Se o usuário perguntar ou não especificar um checklist específico, liste os checklists disponíveis para a persona do agente. Se a tarefa estiver sendo executada sem um agente específico, diga ao usuário para verificar a pasta .aiox-core/checklists para selecionar o apropriado a ser executado.

## Instruções

1. **Avaliação Inicial**

   - Se o usuário ou a tarefa em execução fornecer um nome de checklist:
     - Tente correspondência aproximada (fuzzy matching) (ex: "architecture checklist" -> "architect-checklist")
     - Se múltiplas correspondências forem encontradas, peça ao usuário para esclarecer
     - Carregue o checklist apropriado de .aiox-core/product/checklists/
   - Se nenhum checklist for especificado:
     - Pergunte ao usuário qual checklist ele quer usar
     - Apresente as opções disponíveis a partir dos arquivos na pasta .aiox-core/product/checklists/
   - Confirme se eles querem percorrer o checklist:
     - Seção por seção (modo interativo - muito demorado)
     - Tudo de uma vez (modo YOLO - recomendado para checklists, haverá um resumo das seções ao final para discussão)

2. **Coleta de Documentos e Artefatos**

   - Cada checklist especificará seus documentos/artefatos necessários no início
   - Siga as instruções específicas do checklist sobre o que coletar; geralmente um arquivo pode ser resolvido na pasta docs; se não for ou houver incerteza, pare e pergunte ou confirme com o usuário.

3. **Processamento do Checklist**

   Se em modo interativo:

   - Percorra cada seção do checklist uma de cada vez
   - Para cada seção:
     - Revise todos os itens da seção seguindo as instruções para aquela seção embutidas no checklist
     - Verifique cada item em relação à documentação ou artefatos relevantes, conforme apropriado
     - Apresente um resumo dos achados daquela seção, destacando avisos, erros e itens não aplicáveis (justificativa da não aplicabilidade).
     - Obtenha a confirmação do usuário antes de prosseguir para a próxima seção ou, se houver algo grave, precisamos parar e tomar ação corretiva

   Se em modo YOLO:

   - Processe todas as seções de uma vez
   - Crie um relatório abrangente de todos os achados
   - Apresente a análise completa ao usuário

4. **Abordagem de Validação**

   Para cada item do checklist:

   - Leia e entenda o requisito
   - Procure evidências na documentação que satisfaçam o requisito
   - Considere tanto menções explícitas quanto cobertura implícita
   - Além disso, siga todas as instruções de llm do checklist
   - Marque os itens como:
     - ✅ PASS: Requisito claramente atendido
     - ❌ FAIL: Requisito não atendido ou cobertura insuficiente
     - ⚠️ PARTIAL: Alguns aspectos cobertos, mas precisa de melhoria
     - N/A: Não aplicável a este caso

5. **Análise de Seção**

   Para cada seção:

   - pense passo a passo para calcular a taxa de aprovação
   - Identifique temas comuns nos itens reprovados
   - Forneça recomendações específicas para melhoria
   - Em modo interativo, discuta os achados com o usuário
   - Documente quaisquer decisões ou explicações do usuário

6. **Relatório Final**

   Prepare um resumo que inclua:

   - Status geral de conclusão do checklist
   - Taxas de aprovação por seção
   - Lista de itens reprovados com contexto
   - Recomendações específicas para melhoria
   - Quaisquer seções ou itens marcados como N/A com justificativa

## Metodologia de Execução de Checklist

Cada checklist agora contém prompts e instruções de LLM embutidos que irão:

1. **Guiar o raciocínio aprofundado** - Os prompts garantem uma análise profunda de cada seção
2. **Solicitar artefatos específicos** - Instruções claras sobre quais documentos/acessos são necessários
3. **Fornecer orientação contextual** - Prompts específicos por seção para melhor validação
4. **Gerar relatórios abrangentes** - Resumo final com achados detalhados

O LLM irá:

- Executar a validação completa do checklist
- Apresentar um relatório final com taxas de aprovação/reprovação e achados principais
- Oferecer-se para fornecer análise detalhada de qualquer seção, especialmente aquelas com avisos ou falhas

## Handoff
next_agent: @qa
next_command: *review {story-id}
condition: Checklist concluído com todos os itens aprovados
alternatives:
  - agent: @dev, command: *develop {story-id}, condition: Checklist encontrou problemas bloqueantes
