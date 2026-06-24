---
# Seleção de template determinada dinamicamente durante a execução da task
# O usuário seleciona entre os templates disponíveis em .aiox-core/product/templates/
tools:
  - github-cli        # Para operações de arquivo
utils:
  - template-engine
  - template-validator
---

# Criar Documento a partir de Template (Orientado por YAML)

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima do usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com ambiguidade zero
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: createDoc()
responsável: Morgan (Strategist)
responsavel_type: Agente
atomic_layer: Template

**Entrada:**
- campo: name
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser não vazio, minúsculo, kebab-case

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Objeto JSON válido com chaves permitidas

- campo: force
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Padrão: false

**Saída:**
- campo: created_file
  tipo: string
  destino: File system
  persistido: true

- campo: validation_report
  tipo: object
  destino: Memory
  persistido: false

- campo: success
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] O alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas
    tipo: pre-condition
    blocker: true
    validação: |
      Check target does not already exist; required inputs provided; permissions granted
    error_message: "Pre-condition failed: Target does not already exist; required inputs provided; permissions granted"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Recurso criado com sucesso; validação aprovada; nenhum erro registrado
    tipo: post-condition
    blocker: true
    validação: |
      Verify resource created successfully; validation passed; no errors logged
    error_message: "Post-condition failed: Resource created successfully; validation passed; no errors logged"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] O recurso existe e é válido; nenhum recurso duplicado criado
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert resource exists and is valid; no duplicate resources created
    error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componente
  - **Linguagem:** JavaScript
  - **Local:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso alvo já existe no sistema
   - **Resolução:** Usar a flag de force ou escolher um nome diferente
   - **Recuperação:** Solicitar ao usuário um nome alternativo ou sobrescrever com force

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Validar a entrada conforme as regras de nomenclatura (kebab-case, minúsculo, sem caracteres especiais)
   - **Recuperação:** Sanitizar a entrada ou rejeitar com mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verificar permissões do sistema de arquivos, rodar com privilégios elevados se necessário
   - **Recuperação:** Registrar erro, notificar o usuário, sugerir correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 3-8 min (estimado)
cost_estimated: $0.002-0.005
token_usage: ~1,500-5,000 tokens
```

**Notas de Otimização:**
- Cachear a compilação de templates; minimizar transformações de dados; carregar recursos sob demanda

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - creation
  - setup
updated_at: 2025-11-17
```

---


## Dependências de Execução
**Utils:** template-engine, template-validator

## ⚠️ AVISO CRÍTICO DE EXECUÇÃO ⚠️

**ISTO É UM WORKFLOW EXECUTÁVEL - NÃO MATERIAL DE REFERÊNCIA**

Quando esta task é invocada:

1. **DESABILITE TODAS AS OTIMIZAÇÕES DE EFICIÊNCIA** - Este workflow exige interação total do usuário
2. **EXECUÇÃO PASSO A PASSO OBRIGATÓRIA** - Cada seção deve ser processada sequencialmente com feedback do usuário
3. **A ELICITAÇÃO É OBRIGATÓRIA** - Quando `elicit: true`, você DEVE usar o formato 1-9 e aguardar a resposta do usuário
4. **NENHUM ATALHO PERMITIDO** - Documentos completos não podem ser criados sem seguir este workflow

**INDICADOR DE VIOLAÇÃO:** Se você criar um documento completo sem interação do usuário, violou este workflow.

## Crítico: Descoberta de Template

Se um Template YAML não tiver sido fornecido, liste todos os templates de .aiox-core/product/templates ou peça ao usuário para fornecer outro.

## CRÍTICO: Formato de Elicitação Obrigatório

**Quando `elicit: true`, isto é uma PARADA OBRIGATÓRIA que exige interação do usuário:**

**VOCÊ DEVE:**

1. Apresentar o conteúdo da seção
2. Fornecer justificativa detalhada (explicar trade-offs, premissas, decisões tomadas)
3. **PARAR e apresentar as opções numeradas 1-9:**
   - **Opção 1:** Sempre "Proceed to next section"
   - **Opções 2-9:** Selecionar 8 métodos de data/elicitation-methods
   - Terminar com: "Select 1-9 or just type your question/feedback:"
4. **AGUARDAR A RESPOSTA DO USUÁRIO** - Não prossiga até que o usuário selecione uma opção ou forneça feedback

**VIOLAÇÃO DE WORKFLOW:** Criar conteúdo para seções com elicit=true sem interação do usuário viola esta task.

**NUNCA faça perguntas de sim/não nem use qualquer outro formato.**

## Code Intelligence: Seção de Inteligência do Codebase (Opcional — Auto-pulada se indisponível)

> **Condição:** Só executar se `isCodeIntelAvailable()` retornar true E o documento sendo criado for um PRD ou documento de arquitetura.
> Se nenhum provedor de code intelligence estiver disponível, pule este aprimoramento silenciosamente.

Ao criar PRDs ou documentos de arquitetura com code intelligence disponível, adicione uma seção "Codebase Intelligence":

```javascript
const { isCodeIntelAvailable } = require('.aiox-core/core/code-intel');
const { getCodebaseOverview, getDependencyGraph } = require('.aiox-core/core/code-intel/helpers/planning-helper');

if (isCodeIntelAvailable()) {
  const overview = await getCodebaseOverview('.');
  const depGraph = await getDependencyGraph('.');

  // Add optional section to generated document:
  // - overview.codebase: project patterns, file groups, architecture
  // - overview.stats: file counts, language distribution, LOC
  // - depGraph.summary: { totalDeps, depth }
}
```

**Se houver dados disponíveis, anexe esta seção ao documento gerado:**

```markdown
## Codebase Intelligence

> Auto-generated from code intelligence provider. Real codebase data, not estimates.

### Project Overview
{{overview.codebase summary — patterns, file groups, architecture}}

### Statistics
{{overview.stats — file counts, language distribution}}

### Dependency Summary
- **Total Dependencies:** {{depGraph.summary.totalDeps}}
- **Dependency Depth:** {{depGraph.summary.depth}}
```

> **Nota:** Esta seção é opcional e só aparece quando um provedor de code intelligence está disponível. O documento é totalmente funcional sem ela.

---

## Fluxo de Processamento

1. **Analisar o template YAML** - Carregar os metadados e as seções do template
2. **Definir preferências** - Mostrar o modo atual (Interativo), confirmar o arquivo de saída
3. **Processar cada seção:**
   - Pular se a condição não for atendida
   - Verificar permissões do agente (owner/editors) - anotar se a seção é restrita a agentes específicos
   - Redigir o conteúdo usando a instrução da seção
   - Apresentar o conteúdo + justificativa detalhada
   - **SE elicit: true** → formato OBRIGATÓRIO de opções 1-9
   - Salvar no arquivo se possível
4. **Continuar até concluir**

## Requisitos de Justificativa Detalhada

Ao apresentar o conteúdo da seção, SEMPRE inclua uma justificativa que explique:

- Trade-offs e escolhas feitas (o que foi escolhido em vez das alternativas e por quê)
- Premissas-chave assumidas durante a redação
- Decisões interessantes ou questionáveis que precisam da atenção do usuário
- Áreas que possam precisar de validação

## Fluxo de Resultados da Elicitação

Após o usuário selecionar o método de elicitação (2-9):

1. Executar o método de data/elicitation-methods
2. Apresentar os resultados com insights
3. Oferecer opções:
   - **1. Aplicar as mudanças e atualizar a seção**
   - **2. Voltar ao menu de elicitação**
   - **3. Fazer perguntas ou aprofundar esta elicitação**

## Permissões de Agente

Ao processar seções com campos de permissão de agente:

- **owner**: Anotar qual papel de agente inicialmente cria/preenche a seção
- **editors**: Listar os papéis de agente autorizados a modificar a seção
- **readonly**: Marcar as seções que não podem ser modificadas após a criação

**Para seções com acesso restrito:**

- Incluir uma nota no documento gerado indicando o agente responsável
- Exemplo: "_(This section is owned by dev-agent and can only be modified by dev-agent)_"

## Modo YOLO

O usuário pode digitar `#yolo` para alternar para o modo YOLO (processar todas as seções de uma vez).

## LEMBRETES CRÍTICOS

**❌ NUNCA:**

- Fazer perguntas de sim/não para elicitação
- Usar qualquer formato além das opções numeradas 1-9
- Criar novos métodos de elicitação

**✅ SEMPRE:**

- Usar o formato exato 1-9 quando elicit: true
- Selecionar as opções 2-9 apenas de data/elicitation-methods
- Fornecer justificativa detalhada explicando as decisões
- Terminar com "Select 1-9 or just type your question/feedback:"
