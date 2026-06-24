# Base de Conhecimento AIOX

## Visão Geral

O AIOX-Method é um framework que combina agentes de IA com metodologias de desenvolvimento Ágil. O sistema v4 introduz uma arquitetura modular com gestão de dependências aprimorada, otimização de bundles e suporte tanto para ambientes web quanto IDE.

### Principais Funcionalidades

- **Sistema Modular de Agentes**: Agentes de IA especializados para cada papel Ágil
- **Sistema de Build**: Resolução automática e otimização de dependências
- **Suporte a Dois Ambientes**: Otimizado tanto para UIs web quanto para IDEs
- **Recursos Reutilizáveis**: Templates, tasks e checklists portáveis
- **Integração com Slash Commands**: Troca e controle rápidos de agentes

### Quando Usar o AIOX

- **Novos Projetos (Greenfield)**: Desenvolvimento completo de ponta a ponta
- **Projetos Existentes (Brownfield)**: Adição e aprimoramento de funcionalidades
- **Colaboração em Equipe**: Múltiplos papéis trabalhando juntos
- **Garantia de Qualidade**: Testes e validação estruturados
- **Documentação**: PRDs profissionais, documentos de arquitetura, user stories

## Como o AIOX Funciona

### O Método Central

O AIOX transforma você em um "Vibe CEO" - dirigindo um time de agentes de IA especializados por meio de workflows estruturados. Veja como:

1. **Você Dirige, a IA Executa**: Você fornece visão e decisões; os agentes cuidam dos detalhes de implementação
2. **Agentes Especializados**: Cada agente domina um papel (PM, Developer, Architect, etc.)
3. **Workflows Estruturados**: Padrões comprovados guiam você da ideia ao código implantado
4. **Handoffs Limpos**: Janelas de contexto novas garantem que os agentes permaneçam focados e eficazes

### A Abordagem em Duas Fases

#### Fase 1: Planejamento (Web UI - Custo-Efetivo)

- Use janelas de contexto grandes (1M de tokens do Gemini)
- Gere documentos abrangentes (PRD, Arquitetura)
- Aproveite múltiplos agentes para brainstorming
- Crie uma vez, use durante todo o desenvolvimento

#### Fase 2: Desenvolvimento (IDE - Implementação)

- Fragmente (shard) os documentos em pedaços gerenciáveis
- Execute ciclos focados SM → Dev
- Uma story por vez, progresso sequencial
- Operações de arquivo e testes em tempo real

### O Loop de Desenvolvimento

```text
1. SM Agent (New Chat) → Creates next story from sharded docs
2. You → Review and approve story
3. Dev Agent (New Chat) → Implements approved story
4. QA Agent (New Chat) → Reviews and refactors code
5. You → Verify completion
6. Repeat until epic complete
```

### Por Que Isto Funciona

- **Otimização de Contexto**: Chats limpos = melhor performance da IA
- **Clareza de Papel**: Agentes não fazem troca de contexto = qualidade mais alta
- **Progresso Incremental**: Stories pequenas = complexidade gerenciável
- **Supervisão Humana**: Você valida cada passo = controle de qualidade
- **Orientado a Documentos**: Specs guiam tudo = consistência

## Primeiros Passos

### Opções de Início Rápido

#### Opção 1: Web UI

**Melhor para**: Usuários de ChatGPT, Claude, Gemini que querem começar imediatamente

1. Navegue até `dist/teams/`
2. Copie o conteúdo de `team-fullstack.txt`
3. Crie um novo Gemini Gem ou CustomGPT
4. Faça upload do arquivo com as instruções: "Your critical operating instructions are attached, do not break character as directed"
5. Digite `/help` para ver os comandos disponíveis

#### Opção 2: Integração com IDE

**Melhor para**: Usuários de Cursor, Claude Code, Gemini CLI, Github Copilot

```bash
# Interactive installation (recommended)
npx aiox-core install
```

**Passos de Instalação**:

- Escolha "Complete installation"
- Selecione sua IDE dentre as opções suportadas:
  - **Cursor**: Integração nativa com IA
  - **Claude Code**: IDE oficial da Anthropic
  - **GitHub Copilot**: Extensão do VS Code com assistente de programação em par via IA

**Nota para Usuários de VS Code**: O AIOX-Method assume que, quando você menciona "VS Code", está usando-o com uma extensão potencializada por IA como o GitHub Copilot. O VS Code padrão sem capacidades de IA não consegue executar agentes AIOX.

**Verifique a Instalação**:

- Pasta `.aiox-core/` criada com todos os agentes
- Arquivos de integração específicos da IDE criados
- Todos os comandos/regras/modos de agentes disponíveis

**Lembre-se**: Em sua essência, o AIOX-Method trata de dominar e aproveitar a engenharia de prompts. Qualquer IDE com suporte a agentes de IA pode usar o AIOX - o framework fornece os prompts estruturados e workflows que tornam o desenvolvimento com IA eficaz

### Guia de Seleção de Ambiente

**Use a Web UI para**:

- Planejamento e documentação iniciais (PRD, arquitetura)
- Criação de documentos com custo-efetivo (especialmente com o Gemini)
- Fases de brainstorming e análise
- Consulta e planejamento multi-agente

**Use a IDE para**:

- Desenvolvimento e codificação ativos
- Operações de arquivo e integração com o projeto
- Fragmentação (sharding) de documentos e gestão de stories
- Workflow de implementação (ciclos SM/Dev)

**Dica de Economia de Custo**: Crie documentos grandes (PRDs, arquitetura) na web UI, depois copie para `docs/prd.md` e `docs/architecture.md` no seu projeto antes de mudar para a IDE para desenvolvimento.

### Considerações sobre o Workflow Somente-IDE

**Você pode fazer tudo na IDE?** Sim, mas entenda os tradeoffs:

**Prós do Somente-IDE**:

- Workflow em ambiente único
- Operações de arquivo diretas desde o início
- Sem copy/paste entre ambientes
- Integração imediata com o projeto

**Contras do Somente-IDE**:

- Custos de token mais altos para criação de documentos grandes
- Janelas de contexto menores (varia por IDE/modelo)
- Pode atingir limites durante as fases de planejamento
- Menos custo-efetivo para brainstorming

**Usando Agentes Web na IDE**:

- **NÃO RECOMENDADO**: Agentes web (PM, Architect) têm dependências ricas projetadas para contextos grandes
- **Por que importa**: Agentes Dev são mantidos enxutos para maximizar o contexto de codificação
- **O princípio**: "Dev agents code, planning agents plan" - misturá-los quebra essa otimização

**Sobre aiox-master e aiox-orchestrator**:

- **aiox-master**: orquestra entre agentes e governa o trabalho de framework, mas delega tasks especializadas por padrão
- **Ainda use agentes especializados para planejamento**: PM, Architect e UX Expert têm personas ajustadas que produzem melhores resultados
- **Por que a especialização importa**: A personalidade e o foco de cada agente criam saídas de maior qualidade
- **Se estiver usando aiox-master/orchestrator**: Tudo bem para fases de planejamento, mas...

**REGRA CRÍTICA para Desenvolvimento**:

- **SEMPRE use o agente SM para criação de story** - Nunca use aiox-master ou aiox-orchestrator
- **SEMPRE use o agente Dev para implementação** - Nunca use aiox-master ou aiox-orchestrator
- **Por que isto importa**: Os agentes SM e Dev são especificamente otimizados para o workflow de desenvolvimento
- **Sem exceções**: Mesmo que use aiox-master para todo o resto, mude para SM → Dev para implementação

**Boas Práticas para Somente-IDE**:

1. Use os agentes PM/Architect/UX para planejamento (melhor que aiox-master)
2. Crie documentos diretamente no projeto
3. Fragmente (shard) imediatamente após a criação
4. **DEVE mudar para o agente SM** para criação de story
5. **DEVE mudar para o agente Dev** para implementação
6. Mantenha planejamento e codificação em sessões de chat separadas

## Configuração Central (core-config.yaml)

**Novo na V4**: O arquivo `aiox-core/core-config.yaml` é uma inovação crítica que permite ao AIOX trabalhar perfeitamente com qualquer estrutura de projeto, oferecendo máxima flexibilidade e retrocompatibilidade.

### O que é o core-config.yaml?

Este arquivo de configuração age como um mapa para os agentes AIOX, dizendo a eles exatamente onde encontrar os documentos do seu projeto e como estão estruturados. Ele permite:

- **Flexibilidade de Versão**: Trabalhar com estruturas de documento V3, V4 ou customizadas
- **Locais Customizados**: Definir onde seus documentos e shards vivem
- **Contexto do Desenvolvedor**: Especificar quais arquivos o agente dev deve sempre carregar
- **Suporte a Debug**: Logging integrado para troubleshooting

### Áreas-Chave de Configuração

#### Configuração do PRD

- **prdVersion**: Informa aos agentes se o PRD segue convenções v3 ou v4
- **prdSharded**: Se os epics estão embutidos (false) ou em arquivos separados (true)
- **prdShardedLocation**: Onde encontrar os arquivos de epic fragmentados
- **epicFilePattern**: Padrão para nomes de arquivo de epic (ex.: `epic-{n}*.md`)

#### Configuração da Arquitetura

- **architectureVersion**: v3 (monolítica) ou v4 (fragmentada)
- **architectureSharded**: Se a arquitetura está dividida em componentes
- **architectureShardedLocation**: Onde vivem os arquivos de arquitetura fragmentados

#### Arquivos do Desenvolvedor

- **devLoadAlwaysFiles**: Lista de arquivos que o agente dev carrega para toda task
- **devDebugLog**: Onde o agente dev registra falhas repetidas
- **agentCoreDump**: Local de exportação das conversas de chat

### Por Que Importa

1. **Sem Migrações Forçadas**: Mantenha sua estrutura de documentos existente
2. **Adoção Gradual**: Comece com V3 e migre para V4 no seu ritmo
3. **Workflows Customizados**: Configure o AIOX para combinar com o processo da sua equipe
4. **Agentes Inteligentes**: Os agentes se adaptam automaticamente à sua configuração

### Configurações Comuns

**Projeto Legado V3**:

```yaml
prdVersion: v3
prdSharded: false
architectureVersion: v3
architectureSharded: false
```

**Projeto Otimizado V4**:

```yaml
prdVersion: v4
prdSharded: true
prdShardedLocation: docs/prd
architectureVersion: v4
architectureSharded: true
architectureShardedLocation: docs/architecture
```

## Filosofia Central

### Vibe CEO'ing

Você é o "Vibe CEO" - pensando como um CEO com recursos ilimitados e uma visão singular. Seus agentes de IA são seu time de alta performance, e seu papel é:

- **Dirigir**: Fornecer instruções e objetivos claros
- **Refinar**: Iterar sobre as saídas para alcançar qualidade
- **Supervisionar**: Manter o alinhamento estratégico entre todos os agentes

### Princípios Centrais

1. **MAXIMIZE_AI_LEVERAGE**: Pressione a IA para entregar mais. Questione as saídas e itere.
2. **QUALITY_CONTROL**: Você é o árbitro final da qualidade. Revise todas as saídas.
3. **STRATEGIC_OVERSIGHT**: Mantenha a visão de alto nível e garanta o alinhamento.
4. **ITERATIVE_REFINEMENT**: Espere revisitar passos. Este não é um processo linear.
5. **CLEAR_INSTRUCTIONS**: Solicitações precisas levam a melhores saídas.
6. **DOCUMENTATION_IS_KEY**: Boas entradas (briefs, PRDs) levam a boas saídas.
7. **START_SMALL_SCALE_FAST**: Teste conceitos, depois expanda.
8. **EMBRACE_THE_CHAOS**: Adapte-se e supere os desafios.

### Princípios-Chave de Workflow

1. **Especialização de Agentes**: Cada agente tem expertise e responsabilidades específicas
2. **Handoffs Limpos**: Sempre comece do zero ao trocar entre agentes
3. **Rastreamento de Status**: Mantenha os status das stories (Draft → Approved → InProgress → Done)
4. **Desenvolvimento Iterativo**: Conclua uma story antes de começar a próxima
5. **Documentação Primeiro**: Sempre comece com um PRD e arquitetura sólidos

## Sistema de Agentes

### Time Central de Desenvolvimento

| Agente      | Papel              | Funções Principais                      | Quando Usar                            |
| ----------- | ------------------ | --------------------------------------- | -------------------------------------- |
| `analyst`   | Business Analyst   | Pesquisa de mercado, levantamento de requisitos | Planejamento de projeto, análise competitiva |
| `pm`        | Product Manager    | Criação de PRD, priorização de funcionalidades  | Planejamento estratégico, roadmaps      |
| `architect` | Solution Architect | Design de sistema, arquitetura técnica  | Sistemas complexos, planejamento de escalabilidade |
| `dev`       | Developer          | Implementação de código, debugging      | Todas as tasks de desenvolvimento       |
| `qa`        | QA Specialist      | Planejamento de testes, garantia de qualidade   | Estratégias de teste, validação de bugs |
| `ux-expert` | UX Designer        | Design UI/UX, protótipos                | Experiência do usuário, design de interface |
| `po`        | Product Owner      | Gestão de backlog, validação de stories | Refinamento de stories, critérios de aceite |
| `sm`        | Scrum Master       | Planejamento de sprint, criação de stories      | Gestão de projeto, workflow             |

### Meta Agentes

| Agente              | Papel            | Funções Principais                    | Quando Usar                       |
| ------------------- | ---------------- | ------------------------------------- | --------------------------------- |
| `aiox-orchestrator` | Team Coordinator | Workflows multi-agente, troca de papel | Tasks complexas multi-papel       |
| `aiox-master`       | Master Orchestrator | Governança do framework, roteamento, meta-operações | Coordenação multi-agente e trabalho de framework |

### Comandos de Interação com Agentes

#### Sintaxe Específica por IDE

**Carregamento de Agente por IDE**:

- **Claude Code**: `/agent-name` (ex.: `/aiox-master`)
- **Cursor**: `@agent-name` (ex.: `@aiox-master`)
- **GitHub Copilot**: Abra a Chat view (`⌃⌘I` no Mac, `Ctrl+Alt+I` no Windows/Linux) e selecione **Agent** no seletor de modo de chat.

**Diretrizes de Gestão de Chat**:

- **Claude Code, Cursor**: Inicie novos chats ao trocar de agentes

**Comandos Comuns de Task**:

- `*help` - Mostrar comandos disponíveis
- `*status` - Mostrar contexto/progresso atual
- `*exit` - Sair do modo agente
- `*shard-doc docs/prd.md prd` - Fragmentar o PRD em pedaços gerenciáveis
- `*shard-doc docs/architecture.md architecture` - Fragmentar o documento de arquitetura
- `*create` - Executar a task create-next-story (agente SM)

**Na Web UI**:

```text
/pm create-doc prd
/architect review system design
/dev implement story 1.2
/help - Show available commands
/switch agent-name - Change active agent (if orchestrator available)
```

## Configurações de Time

### Times Pré-Construídos

#### Team All

- **Inclui**: Todos os 10 agentes + orchestrator
- **Caso de Uso**: Projetos completos exigindo todos os papéis
- **Bundle**: `team-all.txt`

#### Team Fullstack

- **Inclui**: PM, Architect, Developer, QA, UX Expert
- **Caso de Uso**: Desenvolvimento web/mobile de ponta a ponta
- **Bundle**: `team-fullstack.txt`

#### Team No-UI

- **Inclui**: PM, Architect, Developer, QA (sem UX Expert)
- **Caso de Uso**: Serviços de backend, APIs, desenvolvimento de sistema
- **Bundle**: `team-no-ui.txt`

## Arquitetura Central

### Visão Geral do Sistema

O AIOX-Method é construído em torno de uma arquitetura modular centrada no diretório `aiox-core`, que serve como o cérebro de todo o sistema. Esse design permite que o framework opere eficazmente tanto em ambientes IDE (como Cursor, VS Code) quanto em interfaces de IA baseadas em web (como ChatGPT, Gemini).

### Componentes Arquiteturais Principais

#### 1. Agentes (`.aiox-core/development/agents/`)

- **Propósito**: Cada arquivo markdown define um agente de IA especializado para um papel Ágil específico (PM, Dev, Architect, etc.)
- **Estrutura**: Contém cabeçalhos YAML especificando a persona, capacidades e dependências do agente
- **Dependências**: Listas de tasks, templates, checklists e arquivos de dados que o agente pode usar
- **Instruções de Inicialização**: Podem carregar documentação específica do projeto para contexto imediato

#### 2. Times de Agentes (`.aiox-core/development/agent-teams/`)

- **Propósito**: Definir coleções de agentes agrupados para propósitos específicos
- **Exemplos**: `team-all.yaml` (bundle abrangente), `team-fullstack.yaml` (desenvolvimento full-stack)
- **Uso**: Cria contextos pré-empacotados para ambientes web UI

#### 3. Workflows (`.aiox-core/development/workflows/`)

- **Propósito**: Arquivos YAML que definem sequências prescritas de passos para tipos específicos de projeto
- **Tipos**: Greenfield (novos projetos) e Brownfield (projetos existentes) para desenvolvimento de UI, serviço e fullstack
- **Estrutura**: Define interações entre agentes, artefatos criados e condições de transição

#### 4. Recursos Reutilizáveis

- **Templates** (`.aiox-core/product/templates/`): Templates Markdown para PRDs, specs de arquitetura, user stories
- **Tasks** (`.aiox-core/development/tasks/`): Instruções para ações repetíveis específicas como "shard-doc" ou "create-next-story"
- **Checklists** (`.aiox-core/product/checklists/`): Checklists de garantia de qualidade para validação e revisão
- **Data** (`.aiox-core/data/`): Base de conhecimento central e preferências técnicas

### Arquitetura de Dois Ambientes

#### Ambiente IDE

- Os usuários interagem diretamente com os arquivos markdown dos agentes
- Os agentes podem acessar todas as dependências dinamicamente
- Suporta operações de arquivo em tempo real e integração com o projeto
- Otimizado para execução do workflow de desenvolvimento

#### Ambiente Web UI

- Usa bundles pré-construídos de `dist/teams` como arquivos autônomos de upload único para todos os agentes e seus assets com um agente orquestrador
- Arquivos de texto únicos contendo todas as dependências dos agentes estão em `dist/agents/` - estes são desnecessários, a menos que você queira criar um agente web que seja apenas um único agente e não um time
- Criados pela ferramenta web-builder para upload em interfaces web
- Fornece contexto completo em um único pacote

### Sistema de Processamento de Templates

O AIOX emprega um sistema sofisticado de templates com três componentes-chave:

1. **Formato de Template** (`utils/aiox-doc-template.md`): Define a linguagem de marcação para substituição de variáveis e diretivas de processamento de IA a partir de templates yaml
2. **Criação de Documento** (`tasks/create-doc.md`): Orquestra a seleção de template e a interação com o usuário para transformar a spec yaml na saída markdown final
3. **Elicitação Avançada** (`tasks/advanced-elicitation.md`): Fornece refinamento interativo por meio de brainstorming estruturado

### Integração de Preferências Técnicas

O arquivo `technical-preferences.md` serve como um perfil técnico persistente que:

- Garante consistência entre todos os agentes e projetos
- Elimina a especificação repetitiva de tecnologia
- Fornece recomendações personalizadas alinhadas às preferências do usuário
- Evolui ao longo do tempo com as lições aprendidas

### Processo de Build e Entrega

A ferramenta `web-builder.js` cria bundles prontos para web ao:

1. Ler os arquivos de definição de agente ou time
2. Resolver recursivamente todas as dependências
3. Concatenar o conteúdo em arquivos de texto únicos com separadores claros
4. Gerar bundles prontos para upload para interfaces de IA web

Esta arquitetura permite operação fluida entre ambientes enquanto mantém o ecossistema de agentes rico e interconectado que torna o AIOX poderoso.

## Workflow Completo de Desenvolvimento

### Fase de Planejamento (Web UI Recomendado - Especialmente Gemini!)

**Ideal para eficiência de custo com o contexto massivo do Gemini:**

**Para Projetos Brownfield - Comece Aqui!**:

1. **Faça upload do projeto inteiro para o Gemini Web** (URL do GitHub, arquivos ou zip)
2. **Documente o sistema existente**: `/analyst` → `*document-project`
3. **Cria docs abrangentes** a partir da análise de todo o codebase

**Para Todos os Projetos**:

1. **Análise Opcional**: `/analyst` - Pesquisa de mercado, análise competitiva
2. **Project Brief**: Crie o documento de fundação (Analyst ou usuário)
3. **Criação de PRD**: `/pm create-doc prd` - Requisitos de produto abrangentes
4. **Design de Arquitetura**: `/architect create-doc architecture` - Fundação técnica
5. **Validação e Alinhamento**: `/po` execute o master checklist para garantir consistência dos documentos
6. **Preparação de Documentos**: Copie os documentos finais para o projeto como `docs/prd.md` e `docs/architecture.md`

#### Exemplos de Prompts de Planejamento

**Para Criação de PRD**:

```text
"I want to build a [type] application that [core purpose].
Help me brainstorm features and create a comprehensive PRD."
```

**Para Design de Arquitetura**:

```text
"Based on this PRD, design a scalable technical architecture
that can handle [specific requirements]."
```

### Transição Crítica: Web UI para IDE

**Uma vez que o planejamento esteja completo, você DEVE mudar para a IDE para desenvolvimento:**

- **Por quê**: O workflow de desenvolvimento exige operações de arquivo, integração em tempo real com o projeto e fragmentação de documentos
- **Benefício de Custo**: A Web UI é mais custo-efetiva para criação de documentos grandes; a IDE é otimizada para tasks de desenvolvimento
- **Arquivos Necessários**: Garanta que `docs/prd.md` e `docs/architecture.md` existam no seu projeto

### Workflow de Desenvolvimento na IDE

**Pré-requisitos**: Os documentos de planejamento devem existir na pasta `docs/`

1. **Fragmentação de Documentos** (PASSO CRÍTICO):
   - Documentos criados pelo PM/Architect (na Web ou IDE) DEVEM ser fragmentados para desenvolvimento
   - Dois métodos para fragmentar:
     a) **Manual**: Arraste a task `shard-doc` + o arquivo do documento para o chat
     b) **Agente**: Peça ao `@aiox-master` ou `@po` para fragmentar os documentos
   - Fragmenta `docs/prd.md` → pasta `docs/prd/`
   - Fragmenta `docs/architecture.md` → pasta `docs/architecture/`
   - **AVISO**: NÃO fragmente na Web UI - copiar muitos arquivos pequenos é doloroso!

2. **Verifique o Conteúdo Fragmentado**:
   - Pelo menos um arquivo `epic-n.md` em `docs/prd/` com stories em ordem de desenvolvimento
   - Documento de árvore de código-fonte e padrões de codificação para referência do agente dev
   - Docs fragmentados para criação de story do agente SM

Estrutura de Pastas Resultante:

- `docs/prd/` - Seções do PRD divididas
- `docs/architecture/` - Seções da arquitetura divididas
- `docs/stories/` - User stories geradas

1. **Ciclo de Desenvolvimento** (Sequencial, uma story por vez):

   **GESTÃO CRÍTICA DE CONTEXTO**:
   - **Janelas de contexto importam!** Sempre use janelas de contexto novas e limpas
   - **A seleção de modelo importa!** Use o modelo de pensamento mais poderoso para criação de story do SM
   - **SEMPRE inicie um novo chat entre o trabalho de SM, Dev e QA**

   **Passo 1 - Criação de Story**:
   - **NOVO CHAT LIMPO** → Selecione um modelo poderoso → `@sm` → `*create`
   - O SM executa a task create-next-story
   - Revise a story gerada em `docs/stories/`
   - Atualize o status de "Draft" para "Approved"

   **Passo 2 - Implementação da Story**:
   - **NOVO CHAT LIMPO** → `@dev`
   - O agente pergunta qual story implementar
   - Inclua o conteúdo do arquivo da story para poupar tempo de busca do agente dev
   - O Dev segue tasks/subtasks, marcando a conclusão
   - O Dev mantém a File List de todas as mudanças
   - O Dev marca a story como "Review" quando concluída com todos os testes passando

   **Passo 3 - Revisão Sênior de QA**:
   - **NOVO CHAT LIMPO** → `@qa` → execute a task review-story
   - O QA realiza uma revisão de código de desenvolvedor sênior
   - O QA pode refatorar e melhorar o código diretamente
   - O QA anexa os resultados à seção QA Results da story
   - Se aprovado: Status → "Done"
   - Se mudanças forem necessárias: Status permanece "Review" com itens desmarcados para o dev

   **Passo 4 - Repetir**: Continue o ciclo SM → Dev → QA até que todas as stories do epic estejam concluídas

**Importante**: Apenas 1 story em andamento por vez, trabalhada sequencialmente até que todas as stories do epic estejam concluídas.

### Workflow de Rastreamento de Status

As stories progridem por status definidos:

- **Draft** → **Approved** → **InProgress** → **Done**

Cada mudança de status requer verificação e aprovação do usuário antes de prosseguir.

### Tipos de Workflow

#### Desenvolvimento Greenfield

- Análise de negócio e pesquisa de mercado
- Requisitos de produto e definição de funcionalidades
- Arquitetura e design de sistema
- Execução do desenvolvimento
- Testes e deploy

#### Aprimoramento Brownfield (Projetos Existentes)

**Conceito-Chave**: O desenvolvimento brownfield exige documentação abrangente do seu projeto existente para que os agentes de IA entendam contexto, padrões e restrições.

**Opções de Workflow Brownfield Completo**:

**Opção 1: PRD-First (Recomendado para Codebases Grandes/Monorepos)**:

1. **Faça upload do projeto para o Gemini Web** (URL do GitHub, arquivos ou zip)
2. **Crie o PRD primeiro**: `@pm` → `*create-doc brownfield-prd`
3. **Documentação focada**: `@analyst` → `*document-project`
   - O Analyst pede o foco se nenhum PRD for fornecido
   - Escolha o formato "single document" para Web UI
   - Usa o PRD para documentar SOMENTE áreas relevantes
   - Cria um único arquivo markdown abrangente
   - Evita inchar os docs com código não utilizado

**Opção 2: Document-First (Bom para Projetos Menores)**:

1. **Faça upload do projeto para o Gemini Web**
2. **Documente tudo**: `@analyst` → `*document-project`
3. **Depois crie o PRD**: `@pm` → `*create-doc brownfield-prd`
   - Mais minucioso, mas pode criar documentação excessiva

4. **Levantamento de Requisitos**:
   - **Brownfield PRD**: Use o agente PM com `brownfield-prd-tmpl`
   - **Analisa**: Sistema existente, restrições, pontos de integração
   - **Define**: Escopo do aprimoramento, requisitos de compatibilidade, avaliação de risco
   - **Cria**: Estrutura de epic e story para as mudanças

5. **Planejamento de Arquitetura**:
   - **Brownfield Architecture**: Use o agente Architect com `brownfield-architecture-tmpl`
   - **Estratégia de Integração**: Como as novas funcionalidades se integram com o sistema existente
   - **Planejamento de Migração**: Rollout gradual e retrocompatibilidade
   - **Mitigação de Risco**: Tratamento de potenciais breaking changes

**Recursos Específicos de Brownfield**:

**Templates**:

- `brownfield-prd-tmpl.md`: Planejamento de aprimoramento abrangente com análise do sistema existente
- `brownfield-architecture-tmpl.md`: Arquitetura focada em integração para sistemas existentes

**Tasks**:

- `document-project`: Gera documentação abrangente a partir do codebase existente
- `brownfield-create-epic`: Cria um único epic para aprimoramentos focados (quando um PRD completo é exagero)
- `brownfield-create-story`: Cria uma story individual para mudanças pequenas e isoladas

**Quando Usar Cada Abordagem**:

**Workflow Brownfield Completo** (Recomendado para):

- Grandes adições de funcionalidades
- Modernização de sistema
- Integrações complexas
- Múltiplas mudanças relacionadas

**Criação Rápida de Epic/Story** (Use quando):

- Aprimoramento único e focado
- Correções de bugs isoladas
- Pequenas adições de funcionalidades
- Sistema existente bem documentado

**Fatores Críticos de Sucesso**:

1. **Documentação Primeiro**: Sempre execute `document-project` se os docs estiverem desatualizados/ausentes
2. **Contexto Importa**: Forneça aos agentes acesso às seções de código relevantes
3. **Foco na Integração**: Enfatize compatibilidade e mudanças não disruptivas
4. **Abordagem Incremental**: Planeje para rollout e testes graduais

**Para um guia detalhado**: Veja `docs/working-in-the-brownfield.md`

## Boas Práticas de Criação de Documentos

### Nomenclatura de Arquivos Necessária para Integração com o Framework

- `docs/prd.md` - Documento de Requisitos de Produto
- `docs/architecture.md` - Documento de Arquitetura do Sistema

**Por Que Esses Nomes Importam**:

- Os agentes referenciam automaticamente esses arquivos durante o desenvolvimento
- As tasks de fragmentação esperam esses nomes de arquivo específicos
- A automação de workflow depende da nomenclatura padrão

### Workflow de Criação de Documentos com Custo-Efetivo

**Recomendado para Documentos Grandes (PRD, Arquitetura):**

1. **Use a Web UI**: Crie documentos na interface web para eficiência de custo
2. **Copie a Saída Final**: Salve o markdown completo no seu projeto
3. **Nomes Padrão**: Salve como `docs/prd.md` e `docs/architecture.md`
4. **Mude para a IDE**: Use agentes da IDE para desenvolvimento e documentos menores

### Fragmentação de Documentos

Templates com cabeçalhos de Nível 2 (`##`) podem ser fragmentados automaticamente:

**PRD Original**:

```markdown
## Goals and Background Context
## Requirements  
## User Interface Design Goals
## Success Metrics
```

**Após a Fragmentação**:

- `docs/prd/goals-and-background-context.md`
- `docs/prd/requirements.md`
- `docs/prd/user-interface-design-goals.md`
- `docs/prd/success-metrics.md`

Use a task `shard-doc` ou a ferramenta `@kayvan/markdown-tree-parser` para fragmentação automática.

## Workflow de Integração com o ClickUp

### Visão Geral

O AIOX integra-se com o ClickUp para gestão de projetos e rastreamento de stories. Ao criar stories usando a task `create-next-story`, os agentes devem seguir um workflow específico para interagir corretamente com o servidor MCP do ClickUp.

### Padrão Crítico de Workflow

**SEMPRE use este processo de 2 passos:**

#### Passo 1: Obter a Hierarquia do Workspace
```javascript
// Call get_workspace_hierarchy (no parameters needed)
const hierarchy = await clickup.get_workspace_hierarchy();

// Extract the numeric list_id from response:
{
  "spaces": [{
    "name": "AIOX Project",
    "lists": [{
      "name": "Backlog",
      "id": "901317181013"  // ← This is what you need
    }]
  }]
}
```

**Armazene o list_id numérico** para uso no Passo 2.

#### Passo 2: Criar a Task com o list_id Descoberto
```yaml
# Call create_task with these parameters:
list_id: "901317181013"  # ← MUST be numeric string from Step 1
name: "Story 5.2: Implement Feature X"
parent: "86acfeqeq"  # Epic task ID (if creating as subtask)
markdown_description: "Complete story content..."
tags:
  - "story"
  - "epic-5"
  - "story-5.2"
custom_fields:
  - id: "epic_number"
    value: 5
  - id: "story_number"
    value: "5.2"
```

### Requisitos de Validação

**Regras Críticas:**
- `list_id` DEVE ser uma string numérica (validada por `/^\d+$/`)
- Usar `"Backlog"` ou outros valores não numéricos VAI FALHAR
- `assignees` (se fornecido) deve ser um array: `[123, 456]`
- `custom_fields` deve ser um array de objetos com `id` e `value`

### Erros Comuns e Soluções

#### Erro: "list_id must be a numeric string"
**Causa:** Usou o nome da lista em vez do ID numérico
```yaml
# ❌ Wrong
list_id: "Backlog"

# ✅ Correct
list_id: "901317181013"
```

#### Erro: "assignees must be array"
**Causa:** Usou formato de objeto em vez de array
```yaml
# ❌ Wrong
assignees: {add: [456]}

# ✅ Correct
assignees: [456]
```

#### Erro: "custom_fields must be an array"
**Causa:** Estrutura de campo inválida
```yaml
# ❌ Wrong
custom_fields: "field-value"

# ✅ Correct
custom_fields:
  - id: "field-uuid"
    value: "field-value"
```

### Referência Rápida

**Ao criar stories:**
1. Sempre chame `get_workspace_hierarchy` primeiro
2. Extraia o `list_id` numérico da resposta
3. Use esse `list_id` em `create_task`
4. Armazene o `task_id` retornado no frontmatter da story

**Onde encontrar exemplos:**
- Workflow completo: `aiox-core/tools/mcp/clickup.yaml` (seção story_creation_workflow)
- Instruções da task: `.aiox-core/development/tasks/create-next-story.md` (seções 5.1 e 5.3)
- Validadores: `aiox-core/tools/mcp/clickup.yaml` (seção executable_knowledge)

**Tratamento da Resposta:**
```yaml
# After successful create_task, update story frontmatter:
clickup:
  task_id: "86acfetr9"  # From create_task response
  epic_task_id: "86acfeqeq"  # From get_workspace_tasks
  list: "Backlog"
  url: "https://app.clickup.com/t/86acfetr9"
  last_sync: "2025-10-10T14:30:00Z"
```

### Dicas de Performance

- Faça cache da hierarquia do workspace durante a sessão
- Reutilize o list_id para múltiplas criações de story
- Pré-busque os IDs de task de epic no início da criação de story
- Valide os parâmetros antes da chamada MCP usando os validadores integrados

## Padrões de Uso e Boas Práticas

### Uso Específico por Ambiente

**Web UI Melhor Para**:

- Fases iniciais de planejamento e documentação
- Criação de documentos grandes com custo-efetivo
- Consulta de agentes e brainstorming
- Workflows multi-agente com orchestrator

**IDE Melhor Para**:

- Desenvolvimento e implementação ativos
- Operações de arquivo e integração com o projeto
- Gestão de stories e ciclos de desenvolvimento
- Revisão de código e debugging

### Garantia de Qualidade

- Use os agentes apropriados para tasks especializadas
- Siga as cerimônias Ágeis e os processos de revisão
- Mantenha a consistência dos documentos com o agente PO
- Validação regular com checklists e templates

### Otimização de Performance

- Use agentes específicos em vez de `aiox-master` para tasks focadas
- Escolha o tamanho de time apropriado para as necessidades do projeto
- Aproveite as preferências técnicas para consistência
- Gestão de contexto regular e limpeza de cache

## Dicas de Sucesso

- **Use o Gemini para planejamento de visão geral** - O bundle team-fullstack fornece expertise colaborativa
- **Use o aiox-master para organização de documentos** - A fragmentação cria pedaços gerenciáveis
- **Siga o ciclo SM → Dev religiosamente** - Isso garante progresso sistemático
- **Mantenha as conversas focadas** - Um agente, uma task por conversa
- **Revise tudo** - Sempre revise e aprove antes de marcar como concluído

## Contribuindo para o AIOX-Method

### Diretrizes Rápidas de Contribuição

Para detalhes completos, veja `CONTRIBUTING.md`. Pontos-chave:

**Fork Workflow**:

1. Faça fork do repositório
2. Crie feature branches
3. Submeta PRs para a branch `next` (padrão) ou `main` apenas para correções críticas
4. Mantenha os PRs pequenos: 200-400 linhas ideal, 800 linhas máximo
5. Uma feature/correção por PR

**Requisitos de PR**:

- Descrições claras (máx 200 palavras) com What/Why/How/Testing
- Use conventional commits (feat:, fix:, docs:)
- Commits atômicos - uma mudança lógica por commit
- Deve estar alinhado aos princípios norteadores

**Princípios Centrais** (de docs/GUIDING-PRINCIPLES.md):

- **Dev Agents Must Be Lean**: Minimize dependências, poupe contexto para código
- **Natural Language First**: Tudo em markdown, sem código no core
- **Core vs Squads**: Core para necessidades universais, squads para domínios especializados
- **Filosofia de Design**: "Dev agents code, planning agents plan"

## Squads

### O que São Squads?

Squads estendem o AIOX-Method para além do desenvolvimento de software tradicional, alcançando QUALQUER domínio. Eles fornecem times de agentes especializados, templates e workflows, mantendo o framework central enxuto e focado em desenvolvimento.

### Por Que Usar Squads?

1. **Mantenha o Core Enxuto**: Agentes Dev mantêm máximo contexto para codificação
2. **Expertise de Domínio**: Conhecimento profundo e especializado sem inchar o core
3. **Inovação da Comunidade**: Qualquer um pode criar e compartilhar squads
4. **Design Modular**: Instale apenas o que você precisa

### Squads Disponíveis

**Squads Técnicos**:

- **Infrastructure/DevOps**: Arquitetos de nuvem, especialistas em SRE, especialistas em segurança
- **Game Development**: Game designers, level designers, roteiristas narrativos
- **Mobile Development**: Especialistas iOS/Android, especialistas em UX mobile
- **Data Science**: Engenheiros de ML, cientistas de dados, especialistas em visualização

**Squads Não-Técnicos**:

- **Business Strategy**: Consultores, analistas financeiros, estrategistas de marketing
- **Creative Writing**: Arquitetos de enredo, desenvolvedores de personagens, construtores de mundos
- **Health & Wellness**: Treinadores fitness, nutricionistas, engenheiros de hábitos
- **Education**: Designers de currículo, especialistas em avaliação
- **Legal Support**: Analistas de contrato, verificadores de conformidade

**Squads de Especialidade**:

- **Expansion Creator**: Ferramentas para construir seus próprios squads
- **RPG Game Master**: Assistência para jogos de mesa
- **Life Event Planning**: Planejadores de casamento, coordenadores de eventos
- **Scientific Research**: Revisores de literatura, designers de metodologia

### Usando Squads

1. **Navegue pelos Squads Disponíveis**: Verifique o diretório `squads/`
2. **Busque Inspiração**: Veja `docs/squads.md` para exemplos e ideias detalhados
3. **Instale via CLI**:

   ```bash
   npx aiox-core install
   # Select "Install squad" option
   ```

4. **Use no Seu Workflow**: Squads instalados se integram perfeitamente com os agentes existentes

### Criando Squads Customizados

Use o squad **squad-creator** para construir o seu próprio:

1. **Defina o Domínio**: Qual expertise você está capturando?
2. **Projete os Agentes**: Crie papéis especializados com limites claros
3. **Construa os Recursos**: Tasks, templates, checklists para o seu domínio
4. **Teste e Compartilhe**: Valide com casos de uso reais, compartilhe com a comunidade

**Princípio-Chave**: Squads democratizam a expertise ao tornar o conhecimento especializado acessível por meio de agentes de IA.

## Obtendo Ajuda

- **Comandos**: Use `*/*help` em qualquer ambiente para ver os comandos disponíveis
- **Troca de Agentes**: Use `*/*switch agent-name` com o orchestrator para mudanças de papel
- **Documentação**: Verifique a pasta `docs/` para contexto específico do projeto
- **Comunidade**: Recursos do Discord e GitHub disponíveis para suporte
- **Contribuindo**: Veja `CONTRIBUTING.md` para diretrizes completas
 
</content>
</invoke>
