# init-project-status

**Task ID:** init-project-status
**Versão:** 1.0
**Criado:** 2025-01-14 (Story 6.1.2.4)
**Agente:** @devops (Gage)

---

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
task: initProjectStatus()
responsável: River (Facilitator)
responsavel_type: Agente
atomic_layer: Atom

**Entrada:**
- campo: project_path
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Caminho de diretório válido

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Opções de inicialização

**Saída:**
- campo: initialized_project
  tipo: string
  destino: File system
  persistido: true

- campo: config_created
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
  - [ ] Diretório vazio ou flag de force definida; config válida
    tipo: pre-condition
    blocker: true
    validação: |
      Check directory is empty or force flag set; config valid
    error_message: "Pre-condition failed: Directory is empty or force flag set; config valid"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Projeto inicializado; arquivos de config criados; estrutura válida
    tipo: post-condition
    blocker: true
    validação: |
      Verify project initialized; config files created; structure valid
    error_message: "Post-condition failed: Project initialized; config files created; structure valid"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Estrutura do projeto correta; todos os arquivos de config válidos
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert project structure correct; all config files valid
    error_message: "Acceptance criterion not met: Project structure correct; all config files valid"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** project-scaffolder
  - **Propósito:** Gerar a estrutura e a config do projeto
  - **Origem:** .aiox-core/scripts/project-scaffolder.js

- **Ferramenta:** config-manager
  - **Propósito:** Inicializar arquivos de configuração
  - **Origem:** .aiox-core/utils/config-manager.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Diretório Não Vazio
   - **Causa:** O diretório alvo já contém arquivos
   - **Resolução:** Usar a flag de force ou escolher um diretório vazio
   - **Recuperação:** Solicitar confirmação, mesclar ou abortar

2. **Erro:** Falha na Inicialização
   - **Causa:** Erro ao criar a estrutura do projeto
   - **Resolução:** Verificar permissões e espaço em disco
   - **Recuperação:** Limpar a inicialização parcial, registrar erro

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 0.5-2 min (estimado)
cost_estimated: $0.0001-0.0005
token_usage: ~500-1,000 tokens
```

**Notas de Otimização:**
- Minimizar dependências externas; cachear resultados se reutilizáveis; validar entradas cedo

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


## Descrição

Inicializa o rastreamento dinâmico de status do projeto para o contexto de ativação de agentes. Esta task configura a funcionalidade de status do projeto que exibe o estado do git, o trabalho recente e as informações da story/epic atual nas saudações dos agentes.

---

## Entradas

Nenhuma (roda no diretório atual do projeto)

---

## Elicitação

```yaml
elicit: false
```

Esta task roda de forma autônoma, sem interação do usuário.

---

## Passos

### Passo 1: Detectar Repositório Git

**Ação:** Verificar se o diretório atual é um repositório git

```bash
git rev-parse --is-inside-work-tree 2>/dev/null
```

**Condição de Saída:** Se não for um repo git, exibir mensagem e sair de forma graciosa:
```
⚠️  Project status feature requires a git repository.
    Initialize git first: git init
```

---

### Passo 2: Verificar a Configuração Atual

**Ação:** Ler `.aiox-core/core-config.yaml` e verificar `projectStatus.enabled`

**Lógica:**
```javascript
const config = yaml.load(fs.readFileSync('.aiox-core/core-config.yaml'));
const isEnabled = config?.projectStatus?.enabled === true;
```

**Se já estiver habilitado:**
```
✅ Project status is already enabled in core-config.yaml
```

Pular para o Passo 4.

---

### Passo 3: Habilitar o Status do Projeto na Config

**Ação:** Atualizar `core-config.yaml` para habilitar o status do projeto

**Mudanças:**
```yaml
projectStatus:
  enabled: true
  autoLoadOnAgentActivation: true
  showInGreeting: true
  cacheTimeSeconds: 60
  components:
    gitBranch: true
    gitStatus: true
    recentWork: true
    currentEpic: true
    currentStory: true
  statusFile: .aiox/project-status.yaml
  maxModifiedFiles: 5
  maxRecentCommits: 2
```

**Confirmação:**
```
✅ Enabled projectStatus in core-config.yaml
```

---

### Passo 4: Criar o Diretório .aiox

**Ação:** Garantir que o diretório `.aiox/` exista

```bash
mkdir -p .aiox
```

**Nota:** O diretório é criado se estiver ausente, sem erro se já existir.

---

### Passo 5: Inicializar o Cache de Status

**Ação:** Carregar o status do projeto pela primeira vez

```javascript
const { loadProjectStatus } = require('./.aiox-core/scripts/project-status-loader.js');
const status = await loadProjectStatus();
```

**Verificação:** Verificar se `.aiox/project-status.yaml` foi criado com conteúdo válido.

**Exemplo de Conteúdo do Cache:**
```yaml
status:
  branch: main
  modifiedFiles:
    - story-6.1.2.4.md
  recentCommits:
    - "chore: cleanup Utils Registry"
  currentEpic: null
  currentStory: null
  lastUpdate: '2025-01-14T10:30:00.000Z'
  isGitRepo: true
timestamp: 1705238400000
ttl: 60
```

**Confirmação:**
```
✅ Initialized project status cache (.aiox/project-status.yaml)
```

---

### Passo 6: Testar a Exibição do Status

**Ação:** Simular a ativação de um agente para verificar se o status é exibido corretamente

**Método:** Carregar o status e formatar para exibição

```javascript
const { loadProjectStatus, formatStatusDisplay } = require('./.aiox-core/scripts/project-status-loader.js');
const status = await loadProjectStatus();
const display = formatStatusDisplay(status);
console.log('\nExample Agent Greeting:\n');
console.log('💻 Dex (Builder) ready. Let's build something great!\n');
console.log('Current Project Status:');
console.log(display);
console.log('\nType *help to see available commands!');
```

---

### Passo 7: Atualizar o .gitignore

**Ação:** Garantir que `.aiox/project-status.yaml` esteja no gitignore

**Verificação:** Procurar a entrada `.aiox/project-status.yaml` no `.gitignore`

**Se ausente:** Adicionar a entrada ao `.gitignore`

```gitignore
# AIOX Project Status Cache (auto-generated)
.aiox/project-status.yaml
```

**Confirmação:**
```
✅ Added .aiox/project-status.yaml to .gitignore
```

---

### Passo 8: Exibir o Resumo de Sucesso

**Ação:** Mostrar o resumo completo da configuração

```
╔═══════════════════════════════════════════════════════════╗
║  ✅ Project Status Tracking Initialized                  ║
╚═══════════════════════════════════════════════════════════╝

Configuration:
  • projectStatus.enabled = true
  • Cache file: .aiox/project-status.yaml
  • Cache TTL: 60 seconds
  • Gitignored: Yes

Next Steps:
  1. Activate any agent to see project status in greeting
  2. Example: /dev or /po
  3. Status automatically refreshes every 60 seconds

Documentation: docs/guides/project-status-feature.md
```

---

## Saídas

### Arquivos Criados

- `.aiox/project-status.yaml` - Arquivo de cache de status (no gitignore)

### Arquivos Modificados

- `.aiox-core/core-config.yaml` - Seção projectStatus habilitada (se estava desabilitada)
- `.gitignore` - Adicionada a entrada do arquivo de cache (se ausente)

### Estado do Sistema

- Funcionalidade de status do projeto: **HABILITADA**
- Todos os 11 agentes passarão a exibir o contexto do projeto na ativação

---

## Validação

- [ ] `.aiox/project-status.yaml` existe e contém YAML válido
- [ ] `core-config.yaml` tem `projectStatus.enabled: true`
- [ ] `.gitignore` inclui `.aiox/project-status.yaml`
- [ ] A ativação de teste do agente mostra a exibição do status
- [ ] Repositório git detectado corretamente
- [ ] O TTL do cache é de 60 segundos

---

## Tratamento de Erros

### Não é um Repositório Git

**Erro:**
```
⚠️  Project status feature requires a git repository.
```

**Resolução:**
```bash
git init
```

### core-config.yaml Não Encontrado

**Erro:**
```
❌ Could not find .aiox-core/core-config.yaml
   Are you in the project root directory?
```

**Resolução:** Navegar até a raiz do projeto antes de rodar a task.

### Permissão Negada no Diretório .aiox

**Erro:**
```
❌ Cannot create .aiox directory: Permission denied
```

**Resolução:** Verificar as permissões do sistema de arquivos para o diretório do projeto.

---

## Rollback

Para desabilitar o rastreamento de status do projeto:

1. **Editar core-config.yaml:**
   ```yaml
   projectStatus:
     enabled: false
   ```

2. **Remover o arquivo de cache:**
   ```bash
   rm .aiox/project-status.yaml
   ```

3. **Reiniciar as sessões de agente** - novas ativações não carregarão o status

---

## Notas de Performance

- **Primeira carga:** ~80-100ms (comandos git + I/O de arquivo)
- **Carga em cache:** ~5-10ms (apenas leitura de YAML)
- **Invalidação do cache:** Automática após 60 segundos
- **Overhead do agente:** Mínimo (<100ms adicionados à ativação)

---

## Dependências

### Scripts

- `.aiox-core/scripts/project-status-loader.js` - Carregador de status principal

### Pacotes NPM

- `js-yaml` - Parsing de YAML (já nas dependências do projeto)
- `execa` - Execução de comandos git (já nas dependências do projeto)

### Comandos Git Usados

- `git rev-parse --is-inside-work-tree` - Detectar repo git
- `git branch --show-current` - Obter o branch atual (git >= 2.22)
- `git rev-parse --abbrev-ref HEAD` - Fallback para git mais antigo
- `git status --porcelain` - Obter arquivos modificados
- `git log -2 --oneline --no-decorate` - Obter commits recentes

---

## Relacionados

- **Story:** 6.1.2.4 - Dynamic Project Status Context
- **Documentação:** `docs/guides/project-status-feature.md`
- **Config:** `.aiox-core/core-config.yaml` (seção projectStatus)

---

**Status:** ✅ Pronto para Produção
**Testado Em:** Windows, Linux, macOS
**Requisito Git:** git >= 2.0 (2.22+ recomendado)
