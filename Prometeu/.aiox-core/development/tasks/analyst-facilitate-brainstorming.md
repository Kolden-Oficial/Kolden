---
# Nenhum checklist necessário - esta task facilita sessões de brainstorming, a validação ocorre via interação com o usuário
docOutputLocation: docs/brainstorming-session-results.md
template: ".aiox-core/product/templates/brainstorming-output-tmpl.yaml"
tools:
  - github-cli
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task: Facilitar Sessão de Brainstorming

Facilite sessões interativas de brainstorming com os usuários. Seja criativo e adaptável ao aplicar as técnicas.

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

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise de tarefa (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: analystFacilitateBrainstorming()
responsável: Atlas (Decoder)
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
      Afirmar que a task foi concluída conforme esperado; efeitos colaterais documentados
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
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimado)
cost_estimated: $0.003-0.015
token_usage: ~2.000-8.000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupar operações similares em lote

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


## Processo

### Passo 1: Configuração da Sessão

Faça 4 perguntas de contexto (não antecipe o que acontece a seguir):

1. Sobre o que vamos fazer brainstorming?
2. Há restrições ou parâmetros?
3. Objetivo: exploração ampla ou ideação focada?
4. Você quer um documento estruturado de saída para referência futura? (Padrão Sim)

### Passo 2: Apresentar Opções de Abordagem

Após obter as respostas do Passo 1, apresente 4 opções de abordagem (numeradas):

1. O usuário seleciona técnicas específicas
2. O analista recomenda técnicas com base no contexto
3. Seleção aleatória de técnicas para variedade criativa
4. Fluxo progressivo de técnicas (começar amplo, ir afunilando)

### Passo 3: Executar Técnicas Interativamente

**PRINCÍPIOS CHAVE:**

- **PAPEL DE FACILITADOR**: Guie o usuário a gerar suas próprias ideias por meio de perguntas, prompts e exemplos
- **ENGAJAMENTO CONTÍNUO**: Mantenha o usuário engajado com a técnica escolhida até que ele queira trocar ou esteja satisfeito
- **CAPTURAR SAÍDA**: Se (padrão) o documento de saída for solicitado, capture todas as ideias geradas em cada seção de técnica no documento desde o início.

**Seleção de Técnica:**
Se o usuário selecionar a Opção 1, apresente uma lista numerada de técnicas do arquivo de dados brainstorming-techniques. O usuário pode selecionar por número.

**Execução da Técnica:**

1. Aplique a técnica selecionada conforme a descrição do arquivo de dados
2. Continue engajando com a técnica até que o usuário indique que deseja:
   - Escolher uma técnica diferente
   - Aplicar as ideias atuais a uma nova técnica
   - Avançar para a fase convergente
   - Encerrar a sessão

**Captura de Saída (se solicitada):**
Para cada técnica usada, capture:

- Nome e duração da técnica
- Ideias chave geradas pelo usuário
- Insights e padrões identificados
- Reflexões do usuário sobre o processo

### Passo 4: Fluxo da Sessão

1. **Aquecimento** (5-10 min) - Construir confiança criativa
2. **Divergente** (20-30 min) - Gerar quantidade em vez de qualidade
3. **Convergente** (15-20 min) - Agrupar e categorizar ideias
4. **Síntese** (10-15 min) - Refinar e desenvolver conceitos

### Passo 5: Documento de Saída (se solicitado)

Gere um documento estruturado com estas seções:

**Sumário Executivo**

- Tópico e objetivos da sessão
- Técnicas usadas e duração
- Total de ideias geradas
- Temas e padrões chave identificados

**Seções de Técnica** (para cada técnica usada)

- Nome e descrição da técnica
- Ideias geradas (nas palavras do próprio usuário)
- Insights descobertos
- Conexões ou padrões notáveis

**Categorização de Ideias**

- **Oportunidades Imediatas** - Prontas para implementar agora
- **Inovações Futuras** - Requerem desenvolvimento/pesquisa
- **Moonshots** - Conceitos ambiciosos e transformadores
- **Insights & Aprendizados** - Percepções chave da sessão

**Planejamento de Ações**

- Top 3 ideias prioritárias com justificativa
- Próximos passos para cada prioridade
- Recursos/pesquisa necessários
- Considerações de cronograma

**Reflexão & Acompanhamento**

- O que funcionou bem nesta sessão
- Áreas para exploração adicional
- Técnicas de acompanhamento recomendadas
- Perguntas que surgiram para sessões futuras

## Princípios Chave

- **VOCÊ É UM FACILITADOR**: Guie o usuário a fazer brainstorming, não faça por ele (a menos que ele solicite de forma persistente)
- **DIÁLOGO INTERATIVO**: Faça perguntas, aguarde respostas, construa sobre as ideias dele
- **UMA TÉCNICA POR VEZ**: Não misture múltiplas técnicas em uma resposta
- **ENGAJAMENTO CONTÍNUO**: Permaneça em uma técnica até que o usuário queira trocar
- **EXTRAIR IDEIAS**: Use prompts e exemplos para ajudá-lo a gerar suas próprias ideias
- **ADAPTAÇÃO EM TEMPO REAL**: Monitore o engajamento e ajuste a abordagem conforme necessário
- Mantenha energia e momentum
- Adie o julgamento durante a geração
- Quantidade leva à qualidade (mire em 100 ideias em 60 minutos)
- Construa sobre as ideias de forma colaborativa
- Documente tudo no documento de saída

## Estratégias Avançadas de Engajamento

**Gestão de Energia**

- Verifique os níveis de engajamento: "Como você está se sentindo sobre essa direção?"
- Ofereça pausas ou trocas de técnica se a energia cair
- Use linguagem encorajadora e celebre a geração de ideias

**Profundidade vs. Amplitude**

- Faça perguntas de acompanhamento para aprofundar ideias: "Conte-me mais sobre isso..."
- Use "Sim, e..." para construir sobre as ideias dele
- Ajude-o a fazer conexões: "Como isso se relaciona com sua ideia anterior sobre...?"

**Gestão de Transição**

- Sempre pergunte antes de trocar de técnica: "Pronto para tentar uma abordagem diferente?"
- Ofereça opções: "Devemos explorar essa ideia mais a fundo ou gerar mais alternativas?"
- Respeite o processo e o ritmo dele
