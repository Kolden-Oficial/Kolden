---
# Nenhum checklist necessário - task de processamento de documento com validação embutida via ferramenta md-tree
tools:
  - github-cli
---

# Task de Sharding de Documento

## Propósito

- Dividir um documento grande em múltiplos documentos menores com base nas seções de nível 2
- Criar uma estrutura de pastas para organizar os documentos shardeados
- Manter a integridade de todo o conteúdo, incluindo blocos de código, diagramas e formatação markdown

## Método Primário: Automático com markdown-tree

[[LLM: Primeiro, verifique se markdownExploder está definido como true em .aiox-core/core-config.yaml. Se estiver, tente rodar o comando: `md-tree explode {input file} {output path}`.

Se o comando for bem-sucedido, informe ao usuário que o documento foi shardeado com sucesso e PARE - não prossiga além disso.

Se o comando falhar (especialmente com um erro indicando que o comando não foi encontrado ou não está disponível), informe ao usuário: "A configuração markdownExploder está habilitada mas o comando md-tree não está disponível. Por favor, faça uma das opções:

1. Instale o @kayvan/markdown-tree-parser globalmente com: `npm install -g @kayvan/markdown-tree-parser`
2. Ou defina markdownExploder como false em .aiox-core/core-config.yaml

**IMPORTANTE: PARE AQUI - não prossiga com o sharding manual até que uma das ações acima seja tomada.**"

Se markdownExploder estiver definido como false, informe ao usuário: "A configuração markdownExploder está atualmente em false. Para melhor performance e confiabilidade, você deveria:

1. Definir markdownExploder como true em .aiox-core/core-config.yaml
2. Instalar o @kayvan/markdown-tree-parser globalmente com: `npm install -g @kayvan/markdown-tree-parser`

Vou agora prosseguir com o processo de sharding manual."

Então prossiga com o método manual abaixo SOMENTE se markdownExploder for false.]]

### Instalação e Uso

1. **Instalar globalmente**:

   ```bash
   npm install -g @kayvan/markdown-tree-parser
   ```

2. **Usar o comando explode**:

   ```bash
   # Para PRD
   md-tree explode docs/prd.md docs/prd

   # Para Arquitetura
   md-tree explode docs/architecture.md docs/architecture

   # Para qualquer documento
   md-tree explode [source-document] [destination-folder]
   ```

3. **O que ele faz**:
   - Divide automaticamente o documento pelas seções de nível 2
   - Cria arquivos com nomes apropriados
   - Ajusta os níveis de cabeçalho adequadamente
   - Trata todos os edge cases com blocos de código e markdown especial

Se o usuário tiver o @kayvan/markdown-tree-parser instalado, use-o e pule o processo manual abaixo.

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tasks simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Pre-Flight Planning - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: shardDoc()
responsável: Morgan (Strategist)
responsavel_type: Agente
atomic_layer: Template

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
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: task registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
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
      Verificar se a task foi concluída; código de saída 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: task concluída; código de saída 0; saídas esperadas criadas"
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
      Assegurar que a task foi concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: task concluída conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 3-8 min (estimated)
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
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Método Manual (se o @kayvan/markdown-tree-parser não estiver disponível ou o usuário indicar o método manual)

### Instruções da Task

1. Identificar o Documento e o Local de Destino

- Determinar qual documento shardear (caminho fornecido pelo usuário)
- Criar uma nova pasta sob `docs/` com o mesmo nome do documento (sem extensão)
- Exemplo: `docs/prd.md` → criar a pasta `docs/prd/`

2. Fazer o Parse e Extrair as Seções

REGRAS CRÍTICAS DE SHARDING DO AGENTE:

1. Ler todo o conteúdo do documento
2. Identificar todas as seções de nível 2 (cabeçalhos ##)
3. Para cada seção de nível 2:
   - Extrair o cabeçalho da seção e TODO o conteúdo até a próxima seção de nível 2
   - Incluir todas as subseções, blocos de código, diagramas, listas, tabelas, etc.
   - Ter extremo cuidado com:
     - Blocos de código cercados (```) - garanta que você capture o bloco completo, incluindo as crases de fechamento, e leve em conta possíveis cabeçalhos de nível 2 enganosos que na verdade fazem parte de um exemplo dentro de uma seção cercada
     - Diagramas Mermaid - preserve a sintaxe completa do diagrama
     - Elementos markdown aninhados
     - Conteúdo de múltiplas linhas que possa conter ## dentro de blocos de código

CRÍTICO: Use um parsing apropriado que entenda o contexto markdown. Um ## dentro de um bloco de código NÃO é um cabeçalho de seção.]]

### 3. Criar Arquivos Individuais

Para cada seção extraída:

#### CRÍTICO: Regras de Tradução de Nomes de Arquivo (Português → Inglês)

**Todos os nomes de arquivo DEVEM ser criados em inglês, independentemente do idioma do documento.**

**Traduções Comuns Português → Inglês:**

```yaml
# Document Structure
índice: index
metadados: metadata
documento: document
seção: section

# Product/Business
visão: vision
produto: product
problema: problem
solução: solution
objetivos: objectives
metas: goals
stakeholders: stakeholders
premissas: assumptions
restrições: constraints
glossário: glossary
terminologia: terminology

# Requirements
requisitos: requirements
funcionalidades: features
características: characteristics
necessidades: needs

# Technical
arquitetura: architecture
tecnologia: technology
pilha: stack
pilha-tecnológica: tech-stack
padrões: standards
padrões-de-código: coding-standards
estrutura: structure
estrutura-do-projeto: project-structure
árvore-de-origem: source-tree
componentes: components

# Development
desenvolvimento: development
implementação: implementation
testes: tests
estratégia: strategy
estratégia-de-testes: testing-strategy
qualidade: quality
validação: validation

# Data & API
dados: data
banco-de-dados: database
esquema: schema
modelo: model
modelos-de-dados: data-models
api: api
design: design
especificação: specification
endpoints: endpoints

# Infrastructure
infraestrutura: infrastructure
pipeline: pipeline
implantação: deployment
monitoramento: monitoring
alertas: alerts

# Security & Performance
segurança: security
desempenho: performance
escalabilidade: scalability
confiabilidade: reliability
conformidade: compliance
disponibilidade: availability

# Risks & Planning
riscos: risks
técnicos: technical
negócio: business
cronograma: timeline
fases: phases
épicos: epics
histórias: stories
decisões: decisions

# NFRs
requisitos-não-funcionais: non-functional-requirements
nfrs: nfrs
```

**Algoritmo de Geração de Nome de Arquivo:**

1. **Extrair o texto do cabeçalho**: Remover `##` e fazer trim
2. **Traduzir os termos em português**:
   - Verificar se o cabeçalho contém algum termo em português do mapa acima
   - Substituir pelo equivalente em inglês
   - Para termos compostos, traduzir cada parte (ex.: "Padrões de Código" → "Coding Standards")
3. **Normalizar para lowercase-dash-case**:
   - Converter para minúsculas
   - Substituir espaços por traços
   - Remover acentos e caracteres especiais (á→a, ã→a, ç→c, etc.)
4. **Limpar**:
   - Remover traços consecutivos
   - Remover traços no início/fim

**Exemplos:**

```
Cabeçalho em Português          → Processo de Tradução             → Nome de Arquivo Final
----------------------------------------------------------------------------------
## Visão do Produto            → Vision of Product                 → product-vision.md
## Pilha Tecnológica           → Tech Stack                        → tech-stack.md
## Padrões de Código           → Coding Standards                  → coding-standards.md
## Estrutura do Projeto        → Project Structure                 → project-structure.md
## Índice                      → Index                             → index.md
## Metadados do Documento      → Document Metadata                 → document-metadata.md
## Requisitos Funcionais       → Functional Requirements           → functional-requirements.md
## Estratégia de Testes        → Testing Strategy                  → testing-strategy.md
## Banco de Dados - Esquema    → Database Schema                   → database-schema.md
## API Design (tRPC)           → API Design (tRPC)                 → api-design-trpc.md
## Riscos Técnicos             → Technical Risks                   → technical-risks.md
```

**Casos Especiais:**

- **Números nos cabeçalhos**: Preservar (ex.: "1.1 Visão" → "product-vision.md", remover a numeração)
- **Parênteses/colchetes**: Manter na tradução, depois converter (ex.: "API (tRPC)" → "api-trpc.md")
- **Siglas**: Manter como estão (API, RLS, CI/CD, NFR)
- **Idioma misto**: Se o cabeçalho já tiver termos em inglês, mantê-los (ex.: "Tech Stack Overview")

**Se o cabeçalho não estiver em português:**
- Aplicar a conversão padrão para lowercase-dash-case
- Nenhuma tradução necessária

1. **Gerar o nome do arquivo usando as regras de tradução acima**:

   - **PRIMEIRO**: Verificar se o idioma do documento parece ser português (procurar acentos, palavras comuns em PT)
   - **SE for português**: Aplicar a tradução do mapa acima
   - **ENTÃO**: Converter para lowercase-dash-case
   - Remover caracteres especiais e acentos
   - Substituir espaços por traços
   - Exemplo (Inglês): "## Tech Stack" → `tech-stack.md`
   - Exemplo (Português): "## Pilha Tecnológica" → `tech-stack.md`

2. **Ajustar os níveis de cabeçalho**:

   - O cabeçalho de nível 2 vira nível 1 (# em vez de ##) no novo documento shardeado
   - Todos os níveis de subseção diminuem em 1:

   ```txt
     - ### → ##
     - #### → ###
     - ##### → ####
     - etc.
   ```

3. **Escrever o conteúdo**: Salvar o conteúdo ajustado no novo arquivo

### 4. Criar o Arquivo de Índice

Crie um arquivo `index.md` na pasta shardeada que:

1. Contenha o cabeçalho de nível 1 original e qualquer conteúdo anterior à primeira seção de nível 2
2. Liste todos os arquivos shardeados com links:

```markdown
# Título do Documento Original

[Conteúdo de introdução original, se houver]

## Seções

- [Nome da Seção 1](./section-name-1.md)
- [Nome da Seção 2](./section-name-2.md)
- [Nome da Seção 3](./section-name-3.md)
  ...
```

### 5. Preservar Conteúdo Especial

1. **Blocos de código**: Devem capturar os blocos completos, incluindo:

   ```language
   content
   ```

2. **Diagramas Mermaid**: Preservar a sintaxe completa:

   ```mermaid
   graph TD
   ...
   ```

3. **Tabelas**: Manter a formatação adequada de tabela markdown

4. **Listas**: Preservar a indentação e o aninhamento

5. **Código inline**: Preservar as crases

6. **Links e referências**: Manter todos os links markdown intactos

7. **Marcação de template**: Se os documentos contiverem {{placeholders}}, preservar exatamente

### 6. Validação

Após o sharding:

1. Verificar se todas as seções foram extraídas
2. Conferir que nenhum conteúdo foi perdido
3. Garantir que os níveis de cabeçalho foram ajustados corretamente
4. Confirmar que todos os arquivos foram criados com sucesso

### 7. Reportar Resultados

Forneça um resumo:

```text
Documento shardeado com sucesso:
- Origem: [caminho do documento original]
- Destino: docs/[folder-name]/
- Arquivos criados: [contagem]
- Seções:
  - section-name-1.md: "Título da Seção 1"
  - section-name-2.md: "Título da Seção 2"
  ...
```

## Notas Importantes

- Nunca modifique o conteúdo em si, apenas ajuste os níveis de cabeçalho
- Preserve TODA a formatação, incluindo espaços em branco quando significativos
- Trate edge cases como seções com blocos de código contendo símbolos ##
- Garanta que o sharding seja reversível (poderia reconstruir o original a partir dos shards)
 