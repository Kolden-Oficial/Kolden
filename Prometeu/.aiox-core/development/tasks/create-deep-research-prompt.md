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
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: createDeepResearchPrompt()
responsável: Atlas (Decoder)
responsavel_type: Agente
atomic_layer: Template

**Entrada:**
- campo: name
  tipo: string
  origem: Entrada do Usuário
  obrigatório: true
  validação: Deve ser não-vazio, minúsculo, kebab-case

- campo: options
  tipo: object
  origem: Entrada do Usuário
  obrigatório: false
  validação: Objeto JSON válido com chaves permitidas

- campo: force
  tipo: boolean
  origem: Entrada do Usuário
  obrigatório: false
  validação: Padrão: false

**Saída:**
- campo: created_file
  tipo: string
  destino: Sistema de arquivos
  persistido: true

- campo: validation_report
  tipo: object
  destino: Memória
  persistido: false

- campo: success
  tipo: boolean
  destino: Valor de retorno
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar os pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] O alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se o alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas
    error_message: "Pré-condição falhou: O alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Recurso criado com sucesso; validação aprovada; nenhum erro registrado
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se o recurso foi criado com sucesso; validação aprovada; nenhum erro registrado
    error_message: "Pós-condição falhou: Recurso criado com sucesso; validação aprovada; nenhum erro registrado"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] O recurso existe e é válido; nenhum recurso duplicado criado
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que o recurso existe e é válido; nenhum recurso duplicado criado
    error_message: "Critério de aceite não atendido: O recurso existe e é válido; nenhum recurso duplicado criado"
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
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso alvo já existe no sistema
   - **Resolução:** Usar a flag force ou escolher um nome diferente
   - **Recuperação:** Solicitar ao usuário um nome alternativo ou forçar a sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Validar a entrada contra as regras de nomenclatura (kebab-case, minúsculo, sem caracteres especiais)
   - **Recuperação:** Sanitizar a entrada ou rejeitar com mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verificar as permissões do sistema de arquivos, executar com privilégios elevados se necessário
   - **Recuperação:** Registrar o erro, notificar o usuário, sugerir correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 3-8 min (estimated)
cost_estimated: $0.002-0.005
token_usage: ~1,500-5,000 tokens
```

**Notas de Otimização:**
- Cachear a compilação de templates; minimizar transformações de dados; carregar recursos sob demanda (lazy load)

---

## Metadata

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

# Nenhum checklist necessário - esta task cria prompts de pesquisa; a validação está embutida na metodologia de pesquisa
tools:
  - exa               # Conduzir pesquisa profunda sobre mercados e tecnologias
  - context7          # Consultar documentação técnica e padrões
---

# Task Criar Prompt de Pesquisa Profunda

Esta task ajuda a criar prompts de pesquisa abrangentes para diversos tipos de análise profunda. Ela pode processar entradas de sessões de brainstorming, briefs de projeto, pesquisa de mercado ou perguntas de pesquisa específicas para gerar prompts direcionados a uma investigação mais aprofundada.

## Propósito

Gerar prompts de pesquisa bem estruturados que:

- Definam objetivos e escopo de pesquisa claros
- Especifiquem metodologias de pesquisa apropriadas
- Delineiem os entregáveis e formatos esperados
- Orientem a investigação sistemática de tópicos complexos
- Garantam que insights acionáveis sejam capturados

## Seleção do Tipo de Pesquisa

CRÍTICO: Primeiro, ajude o usuário a selecionar o foco de pesquisa mais apropriado com base em suas necessidades e em quaisquer documentos de entrada que ele tenha fornecido.

### 1. Opções de Foco da Pesquisa

Apresente estas opções numeradas ao usuário:

1. **Pesquisa de Validação de Produto**

   - Validar hipóteses de produto e o ajuste ao mercado (market fit)
   - Testar premissas sobre necessidades dos usuários e soluções
   - Avaliar a viabilidade técnica e de negócio
   - Identificar riscos e estratégias de mitigação

2. **Pesquisa de Oportunidade de Mercado**

   - Analisar o tamanho do mercado e o potencial de crescimento
   - Identificar segmentos e dinâmicas de mercado
   - Avaliar estratégias de entrada no mercado
   - Avaliar o timing e a prontidão do mercado

3. **Pesquisa de Usuário e Cliente**

   - Aprofundar nas personas e comportamentos dos usuários
   - Entender os jobs-to-be-done e as dores
   - Mapear as jornadas e os pontos de contato do cliente
   - Analisar a disposição a pagar e a percepção de valor

4. **Pesquisa de Inteligência Competitiva**

   - Análise e posicionamento detalhados dos concorrentes
   - Comparações de funcionalidades e capacidades
   - Análise de modelo de negócio e estratégia
   - Identificar vantagens competitivas e lacunas

5. **Pesquisa de Tecnologia e Inovação**

   - Avaliar tendências e possibilidades tecnológicas
   - Avaliar abordagens técnicas e arquiteturas
   - Identificar tecnologias emergentes e disrupções
   - Analisar as opções de build vs. buy vs. partner

6. **Pesquisa de Indústria e Ecossistema**

   - Mapear as cadeias de valor e dinâmicas da indústria
   - Identificar os principais players e relacionamentos
   - Analisar fatores regulatórios e de conformidade
   - Entender as oportunidades de parceria

7. **Pesquisa de Opções Estratégicas**

   - Avaliar diferentes direções estratégicas
   - Avaliar alternativas de modelo de negócio
   - Analisar estratégias de go-to-market
   - Considerar caminhos de expansão e escala

8. **Pesquisa de Risco e Viabilidade**

   - Identificar e avaliar diversos fatores de risco
   - Avaliar os desafios de implementação
   - Analisar os requisitos de recursos
   - Considerar implicações regulatórias e legais

9. **Foco de Pesquisa Personalizado**

   - Objetivos de pesquisa definidos pelo usuário
   - Investigação de domínio especializado
   - Necessidades de pesquisa multifuncionais

### 2. Processamento das Entradas

**Se um Brief de Projeto for fornecido:**

- Extrair os principais conceitos e objetivos do produto
- Identificar os usuários-alvo e os casos de uso
- Anotar restrições e preferências técnicas
- Destacar incertezas e premissas

**Se Resultados de Brainstorming forem fornecidos:**

- Sintetizar as principais ideias e temas
- Identificar áreas que precisam de validação
- Extrair hipóteses a testar
- Anotar direções criativas a explorar

**Se Pesquisa de Mercado for fornecida:**

- Construir sobre as oportunidades identificadas
- Aprofundar insights específicos de mercado
- Validar os achados iniciais
- Explorar possibilidades adjacentes

**Se Estiver Começando do Zero:**

- Coletar o contexto essencial por meio de perguntas
- Definir o espaço do problema
- Esclarecer os objetivos da pesquisa
- Estabelecer os critérios de sucesso

## Processo

### 3. Estrutura do Prompt de Pesquisa

CRÍTICO: desenvolva colaborativamente um prompt de pesquisa abrangente com estes componentes.

#### A. Objetivos da Pesquisa

CRÍTICO: colabore com o usuário para articular objetivos claros e específicos para a pesquisa.

- Meta e propósito primário da pesquisa
- Decisões-chave que a pesquisa irá informar
- Critérios de sucesso para a pesquisa
- Restrições e limites

#### B. Perguntas da Pesquisa

CRÍTICO: colabore com o usuário para desenvolver perguntas de pesquisa específicas e acionáveis, organizadas por tema.

**Perguntas Centrais:**

- Perguntas centrais que devem ser respondidas
- Ranking de prioridade das perguntas
- Dependências entre as perguntas

**Perguntas de Apoio:**

- Perguntas adicionais de construção de contexto
- Insights desejáveis (nice-to-have)
- Considerações voltadas para o futuro

#### C. Metodologia da Pesquisa

**Métodos de Coleta de Dados:**

- Fontes de pesquisa secundária
- Abordagens de pesquisa primária (se aplicável)
- Requisitos de qualidade dos dados
- Critérios de credibilidade das fontes

**Frameworks de Análise:**

- Frameworks específicos a aplicar
- Critérios de comparação
- Metodologias de avaliação
- Abordagens de síntese

#### D. Requisitos de Saída

**Especificações de Formato:**

- Requisitos do sumário executivo
- Estrutura dos achados detalhados
- Apresentações visuais/tabulares
- Documentação de apoio

**Entregáveis-Chave:**

- Seções e insights obrigatórios (must-have)
- Elementos de apoio à decisão
- Recomendações orientadas à ação
- Documentação de riscos e incertezas

### 4. Geração do Prompt

**Template do Prompt de Pesquisa:**

```markdown
## Research Objective

[Clear statement of what this research aims to achieve]

## Background Context

[Relevant information from project brief, brainstorming, or other inputs]

## Research Questions

### Primary Questions (Must Answer)

1. [Specific, actionable question]
2. [Specific, actionable question]
   ...

### Secondary Questions (Nice to Have)

1. [Supporting question]
2. [Supporting question]
   ...

## Research Methodology

### Information Sources

- [Specific source types and priorities]

### Analysis Frameworks

- [Specific frameworks to apply]

### Data Requirements

- [Quality, recency, credibility needs]

## Expected Deliverables

### Executive Summary

- Key findings and insights
- Critical implications
- Recommended actions

### Detailed Analysis

[Specific sections needed based on research type]

### Supporting Materials

- Data tables
- Comparison matrices
- Source documentation

## Success Criteria

[How to evaluate if research achieved its objectives]

## Timeline and Priority

[If applicable, any time constraints or phasing]
```

### 5. Revisão e Refinamento

1. **Apresentar o Prompt Completo**

   - Mostrar o prompt de pesquisa completo
   - Explicar os elementos-chave e a justificativa
   - Destacar quaisquer premissas adotadas

2. **Coletar Feedback**

   - Os objetivos estão claros e corretos?
   - As perguntas tratam de todas as preocupações?
   - O escopo é apropriado?
   - Os requisitos de saída são suficientes?

3. **Refinar Conforme Necessário**
   - Incorporar o feedback do usuário
   - Ajustar o escopo ou o foco
   - Adicionar elementos faltantes
   - Esclarecer ambiguidades

### 6. Orientação para os Próximos Passos

**Opções de Execução:**

1. **Usar com um Assistente de Pesquisa de IA**: Fornecer este prompt a um modelo de IA com capacidades de pesquisa
2. **Orientar a Pesquisa Humana**: Usar como framework para os esforços de pesquisa manual
3. **Abordagem Híbrida**: Combinar a pesquisa de IA e humana usando esta estrutura

**Pontos de Integração:**

- Como os achados alimentarão as próximas fases
- Quais membros da equipe devem revisar os resultados
- Como validar os achados
- Quando revisitar ou expandir a pesquisa

## Notas Importantes

- A qualidade do prompt de pesquisa impacta diretamente a qualidade dos insights coletados
- Seja específico em vez de genérico nas perguntas de pesquisa
- Considere tanto o estado atual quanto as implicações futuras
- Equilibre a abrangência com o foco
- Documente as premissas e limitações com clareza
- Planeje um refinamento iterativo com base nos achados iniciais

## Handoff
next_agent: @pm
next_command: *write-spec
condition: Research complete (research.json created)
alternatives:
  - agent: @architect, command: *analyze-impact, condition: Research reveals higher complexity than expected
 