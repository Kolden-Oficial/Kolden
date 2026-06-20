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
- Execução sem nenhuma ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Tarefa (AIOX Task Format V1.0)

```yaml
task: documentProject()
responsável: Morgan (Strategist)
responsavel_type: Agente
atomic_layer: Template

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

**Estratégia:** retry

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
duration_expected: 3-8 min (estimado)
cost_estimated: $0.002-0.005
token_usage: ~1.500-5.000 tokens
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
  - automation
  - workflow
updated_at: 2025-11-17
```

---

tools:
  - exa               # Pesquisar tecnologias e melhores práticas
  - github-cli        # Acessar a estrutura do repositório e o codebase
  - context7          # Consultar documentação de bibliotecas e padrões
# TODO: Criar project-documentation-checklist.md para validação (story de acompanhamento necessária)
# checklists:
#   - project-documentation-checklist.md
---

# Documentar um Projeto Existente

## Propósito

Gerar documentação abrangente para projetos existentes, otimizada para agentes de desenvolvimento de IA. Esta tarefa cria materiais de referência estruturados que permitem aos agentes de IA entender o contexto, as convenções e os padrões do projeto para uma contribuição eficaz a qualquer codebase.

## Instruções da Tarefa

### 1. Análise Inicial do Projeto

**CRÍTICO:** Primeiro, verifique se existe um PRD ou documento de requisitos no contexto. Se sim, use-o para focar seus esforços de documentação apenas nas áreas relevantes.

**SE O PRD EXISTIR**:

- Revise o PRD para entender qual melhoria/funcionalidade está planejada
- Identifique quais módulos, serviços ou áreas serão afetados
- Foque a documentação APENAS nessas áreas relevantes
- Pule partes não relacionadas do codebase para manter a documentação enxuta

**SE NÃO HOUVER PRD**:
Pergunte ao usuário:

"Notei que você não forneceu um PRD ou documento de requisitos. Para criar uma documentação mais focada e útil, recomendo uma destas opções:

1. **Criar um PRD primeiro** - Você gostaria que eu ajudasse a criar um PRD brownfield antes de documentar? Isso ajuda a focar a documentação nas áreas relevantes.

2. **Fornecer requisitos existentes** - Você tem um documento de requisitos, epic ou descrição de funcionalidade que possa compartilhar?

3. **Descrever o foco** - Você pode descrever brevemente qual melhoria ou funcionalidade está planejando? Por exemplo:
   - 'Adicionar processamento de pagamentos ao serviço de usuários'
   - 'Refatorar o módulo de autenticação'
   - 'Integrar com uma nova API de terceiros'

4. **Documentar tudo** - Ou devo prosseguir com a documentação abrangente de todo o codebase? (Nota: Isso pode criar documentação excessiva para projetos grandes)

Por favor, me informe sua preferência, ou posso prosseguir com a documentação completa se você preferir."

Com base na resposta deles:

- Se escolherem as opções 1-3: Use esse contexto para focar a documentação
- Se escolherem a opção 4 ou recusarem: Prossiga com a análise abrangente abaixo

Comece conduzindo a análise do projeto existente. Use as ferramentas disponíveis para:

1. **Descoberta da Estrutura do Projeto**: Examine a estrutura do diretório raiz, identifique as pastas principais e entenda a organização geral
2. **Identificação do Stack Tecnológico**: Procure por package.json, requirements.txt, Cargo.toml, pom.xml, etc. para identificar linguagens, frameworks e dependências
3. **Análise do Sistema de Build**: Encontre scripts de build, configurações de CI/CD e comandos de desenvolvimento
4. **Revisão da Documentação Existente**: Verifique arquivos README, pastas de docs e qualquer documentação existente
5. **Análise de Padrões de Código**: Amostre arquivos-chave para entender padrões de codificação, convenções de nomenclatura e abordagens arquiteturais

Faça ao usuário estas perguntas de elicitação para entender melhor as necessidades dele:

- Qual é o propósito principal deste projeto?
- Existem áreas específicas do codebase que sejam particularmente complexas ou importantes para os agentes entenderem?
- Que tipos de tarefas você espera que os agentes de IA realizem neste projeto? (ex: correção de bugs, adição de funcionalidades, refatoração, testes)
- Existem padrões ou formatos de documentação existentes que você prefere?
- Que nível de detalhe técnico a documentação deve mirar? (desenvolvedores juniores, desenvolvedores seniores, equipe mista)
- Existe uma funcionalidade ou melhoria específica que você esteja planejando? (Isso ajuda a focar a documentação)

### 2. Análise Profunda do Codebase

CRÍTICO: Antes de gerar a documentação, conduza uma análise extensa do codebase existente:

1. **Explorar Áreas-Chave**:
   - Pontos de entrada (arquivos main, arquivos index, inicializadores de app)
   - Arquivos de configuração e setup de ambiente
   - Dependências de pacotes e versões
   - Configurações de build e deploy
   - Suítes de teste e cobertura

2. **Fazer Perguntas Esclarecedoras**:
   - "Vejo que você está usando [tecnologia X]. Existem padrões ou convenções personalizadas que eu deva documentar?"
   - "Quais são as partes mais críticas/complexas deste sistema com as quais os desenvolvedores têm dificuldade?"
   - "Existem áreas de 'conhecimento tribal' não documentadas que eu deva capturar?"
   - "Que dívida técnica ou problemas conhecidos eu deveria documentar?"
   - "Quais partes do codebase mudam com mais frequência?"

3. **Mapear a Realidade**:
   - Identifique os padrões REAIS usados (não as melhores práticas teóricas)
   - Encontre onde a lógica de negócio principal reside
   - Localize pontos de integração e dependências externas
   - Documente gambiarras (workarounds) e dívida técnica
   - Anote áreas que diferem dos padrões convencionais

**SE O PRD FOR FORNECIDO**: Analise também o que precisaria mudar para a melhoria

### 3. Geração da Documentação Principal

[[LLM: Gere um documento de arquitetura BROWNFIELD abrangente que reflita o estado REAL do codebase.

**CRÍTICO**: Este NÃO é um documento de arquitetura aspiracional. Documente o que EXISTE, incluindo:

- Dívida técnica e gambiarras
- Padrões inconsistentes entre diferentes partes
- Código legado que não pode ser alterado
- Restrições de integração
- Gargalos de performance

**Estrutura do Documento**:

# Documento de Arquitetura Brownfield de [Project Name]

## Introdução

Este documento captura o ESTADO ATUAL do codebase de [Project Name], incluindo dívida técnica, gambiarras e padrões do mundo real. Ele serve como referência para agentes de IA trabalhando em melhorias.

### Escopo do Documento

[Se PRD fornecido: "Focado nas áreas relevantes a: {enhancement description}"]
[Se sem PRD: "Documentação abrangente de todo o sistema"]

### Change Log

| Data | Versão | Descrição | Autor |
|------|---------|-------------|--------|
| [Data] | 1.0 | Análise brownfield inicial | [Analyst] |

## Referência Rápida - Arquivos-Chave e Pontos de Entrada

### Arquivos Críticos para Entender o Sistema

- **Entrada Principal**: `src/index.js` (ou ponto de entrada real)
- **Configuração**: `config/app.config.js`, `.env.example`
- **Lógica de Negócio Principal**: `src/services/`, `src/domain/`
- **Definições de API**: `src/routes/` ou link para a spec OpenAPI
- **Modelos de Banco de Dados**: `src/models/` ou link para arquivos de schema
- **Algoritmos-Chave**: [Liste arquivos específicos com lógica complexa]

### Se PRD Fornecido - Áreas de Impacto da Melhoria

[Destaque quais arquivos/módulos serão afetados pela melhoria planejada]

## Arquitetura de Alto Nível

### Resumo Técnico

### Stack Tecnológico Real (a partir de package.json/requirements.txt)

| Categoria | Tecnologia | Versão | Notas |
|----------|------------|---------|--------|
| Runtime | Node.js | 16.x | [Quaisquer restrições] |
| Framework | Express | 4.18.2 | [Middleware customizado?] |
| Database | PostgreSQL | 13 | [Setup de connection pooling] |

etc...

### Verificação da Realidade da Estrutura do Repositório

- Tipo: [Monorepo/Polyrepo/Híbrido]
- Gerenciador de Pacotes: [npm/yarn/pnpm]
- Notável: [Quaisquer decisões de estrutura incomuns]

## Árvore de Código e Organização de Módulos

### Estrutura do Projeto (Real)

```text
project-root/
├── src/
│   ├── controllers/     # Handlers de requisições HTTP
│   ├── services/        # Lógica de negócio (NOTA: padrões inconsistentes entre os serviços de usuário e de pagamento)
│   ├── models/          # Modelos de banco de dados (Sequelize)
│   ├── scripts/           # Pacote misto - precisa de refatoração
│   └── legacy/          # NÃO MODIFICAR - sistema de pagamento antigo ainda em uso
├── tests/               # Testes Jest (60% de cobertura)
├── scripts/             # Scripts de build e deploy
└── config/              # Configs de ambiente
```

### Módulos-Chave e Seu Propósito

- **Gerenciamento de Usuários**: `src/services/userService.js` - Trata todas as operações de usuário
- **Autenticação**: `src/middleware/auth.js` - Baseada em JWT, implementação customizada
- **Processamento de Pagamentos**: `src/legacy/payment.js` - CRÍTICO: Não refatorar, fortemente acoplado
- **[Liste outros módulos-chave com seus arquivos reais]**

## Modelos de Dados e APIs

### Modelos de Dados

Em vez de duplicar, referencie os arquivos de modelo reais:
- **User Model**: Veja `src/models/User.js`
- **Order Model**: Veja `src/models/Order.js`
- **Tipos Relacionados**: Definições TypeScript em `src/types/`

### Especificações de API

- **Spec OpenAPI**: `docs/api/openapi.yaml` (se existir)
- **Postman Collection**: `docs/api/postman-collection.json`
- **Endpoints Manuais**: [Liste quaisquer endpoints não documentados descobertos]

## Dívida Técnica e Problemas Conhecidos

### Dívida Técnica Crítica

1. **Serviço de Pagamento**: Código legado em `src/legacy/payment.js` - fortemente acoplado, sem testes
2. **Serviço de Usuário**: Padrão diferente dos outros serviços, usa callbacks em vez de promises
3. **Migrations de Banco de Dados**: Rastreadas manualmente, sem uma ferramenta de migration apropriada
4. **[Outra dívida significativa]**

### Gambiarras e Gotchas

- **Variáveis de Ambiente**: Deve definir `NODE_ENV=production` mesmo para staging (razão histórica)
- **Conexões de Banco de Dados**: Connection pool fixado em 10 no código, alterar quebra o serviço de pagamento
- **[Outras gambiarras que os desenvolvedores precisam saber]**

## Pontos de Integração e Dependências Externas

### Serviços Externos

| Serviço | Propósito | Tipo de Integração | Arquivos-Chave |
|---------|---------|------------------|-----------|
| Stripe | Pagamentos | REST API | `src/integrations/stripe/` |
| SendGrid | E-mails | SDK | `src/services/emailService.js` |

etc...

### Pontos de Integração Internos

- **Comunicação com o Frontend**: REST API na porta 3000, espera headers específicos
- **Background Jobs**: Fila Redis, veja `src/workers/`
- **[Outras integrações]**

## Desenvolvimento e Deploy

### Setup de Desenvolvimento Local

1. Passos reais que funcionam (não os passos ideais)
2. Problemas conhecidos com o setup
3. Variáveis de ambiente necessárias (veja `.env.example`)

### Processo de Build e Deploy

- **Comando de Build**: `npm run build` (config do webpack em `webpack.config.js`)
- **Deploy**: Deploy manual via `scripts/deploy.sh`
- **Ambientes**: Dev, Staging, Prod (veja `config/environments/`)

## Realidade dos Testes

### Cobertura Atual de Testes

- Testes Unitários: 60% de cobertura (Jest)
- Testes de Integração: Mínimos, em `tests/integration/`
- Testes E2E: Nenhum
- Testes Manuais: Método principal de QA

### Executando os Testes

```bash
npm test           # Roda testes unitários
npm run test:integration  # Roda testes de integração (requer DB local)
```

## Se o PRD de Melhoria Fornecido - Análise de Impacto

### Arquivos Que Precisarão de Modificação

Com base nos requisitos da melhoria, estes arquivos serão afetados:
- `src/services/userService.js` - Adicionar novos campos de usuário
- `src/models/User.js` - Atualizar schema
- `src/routes/userRoutes.js` - Novos endpoints
- [etc...]

### Novos Arquivos/Módulos Necessários

- `src/services/newFeatureService.js` - Nova lógica de negócio
- `src/models/NewFeature.js` - Novo modelo de dados
- [etc...]

### Considerações de Integração

- Precisará integrar com o middleware de auth existente
- Deve seguir o formato de resposta existente em `src/scripts/responseFormatter.js`
- [Outros pontos de integração]

## Apêndice - Comandos e Scripts Úteis

### Comandos Frequentemente Usados

```bash
npm run dev         # Iniciar servidor de desenvolvimento
npm run build       # Build de produção
npm run migrate     # Rodar migrations de banco de dados
npm run seed        # Popular dados de teste
```

### Depuração e Solução de Problemas

- **Logs**: Verifique `logs/app.log` para logs da aplicação
- **Modo Debug**: Defina `DEBUG=app:*` para log detalhado
- **Problemas Comuns**: Veja `docs/troubleshooting.md`]]

### 4. Entrega do Documento

1. **Na Web UI (Gemini, ChatGPT, Claude)**:
   - Apresente o documento inteiro em uma resposta (ou múltiplas se for muito longo)
   - Diga ao usuário para copiar e salvar como `docs/brownfield-architecture.md` ou `docs/project-architecture.md`
   - Mencione que ele pode ser fragmentado (sharded) depois na IDE, se necessário

2. **No Ambiente da IDE**:
   - Crie o documento como `docs/brownfield-architecture.md`
   - Informe ao usuário que este documento único contém todas as informações arquiteturais
   - Pode ser fragmentado (sharded) depois usando o agente PO, se desejado

O documento deve ser abrangente o suficiente para que os agentes futuros possam entender:

- O estado real do sistema (não o idealizado)
- Onde encontrar arquivos e lógica-chave
- Que dívida técnica existe
- Que restrições devem ser respeitadas
- Se PRD fornecido: O que precisa mudar para a melhoria]]

### 5. Garantia de Qualidade

CRÍTICO: Antes de finalizar o documento:

1. **Verificação de Precisão**: Verifique se todos os detalhes técnicos correspondem ao codebase real
2. **Revisão de Completude**: Garanta que todos os componentes principais do sistema estejam documentados
3. **Validação de Foco**: Se o usuário forneceu escopo, verifique se as áreas relevantes estão enfatizadas
4. **Avaliação de Clareza**: Verifique se as explicações estão claras para agentes de IA
5. **Navegação**: Garanta que o documento tenha uma estrutura de seções clara para fácil referência

Aplique a tarefa de elicitação avançada após as seções principais para refinar com base no feedback do usuário.

## Critérios de Sucesso

- Documento único e abrangente de arquitetura brownfield criado
- Documento reflete a REALIDADE incluindo dívida técnica e gambiarras
- Arquivos e módulos-chave são referenciados com caminhos reais
- Modelos/APIs referenciam arquivos de origem em vez de duplicar conteúdo
- Se PRD fornecido: Análise de impacto clara mostrando o que precisa mudar
- Documento permite que agentes de IA naveguem e entendam o codebase real
- Restrições técnicas e "gotchas" estão claramente documentadas

## Notas

- Esta tarefa cria UM documento que captura o estado VERDADEIRO do sistema
- Referencia arquivos reais em vez de duplicar conteúdo quando possível
- Documenta dívida técnica, gambiarras e restrições honestamente
- Para projetos brownfield com PRD: Fornece análise clara de impacto da melhoria
- O objetivo é uma documentação PRÁTICA para agentes de IA realizando trabalho real
