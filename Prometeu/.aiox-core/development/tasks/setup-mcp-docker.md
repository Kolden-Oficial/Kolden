# Setup Docker MCP Toolkit

**Task ID:** setup-mcp-docker
**VersÃ£o:** 2.2.0
**Criada:** 2025-12-08
**Atualizada:** 2025-12-23
**Agente:** @devops (Gage)

---

## PropÃ³sito

Configurar o Docker MCP Toolkit como a infraestrutura MCP primÃ¡ria do AIOX, usando **transporte HTTP** em vez de stdio para evitar problemas de timeout durante a inicializaÃ§Ã£o do gateway.

**Principais MudanÃ§as na v2.0:**
- Usa transporte HTTP/SSE (corrige o problema de timeout de 30s)
- O gateway roda como serviÃ§o persistente do Docker Compose
- Presets: `minimal` (sem API keys) e `full` (com API keys)

---

## MCPs PadrÃ£o do AIOX

| Preset | MCPs | API Key NecessÃ¡ria | Tokens |
|--------|------|------------------|--------|
| **minimal** | context7, desktop-commander, playwright | NÃ£o | ~10-15k |
| **full** | minimal + exa | Sim (EXA_API_KEY) | ~20-25k |

**MCPs do Preset Minimal:**
- **context7** - Consultas de documentaÃ§Ã£o de bibliotecas
- **desktop-commander** - Gerenciamento de arquivos + comandos de terminal
- **playwright** - AutomaÃ§Ã£o de navegador para testes

**O Preset Full Adiciona:**
- **exa** - Busca na web potencializada por IA (requer `EXA_API_KEY`)

---

## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com registro em log
- Instala o preset `minimal` automaticamente
- **Melhor para:** UsuÃ¡rios experientes com o Docker jÃ¡ configurado

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints explÃ­citos de decisÃ£o
- Escolha entre os presets minimal/full
- **Melhor para:** Primeira configuraÃ§Ã£o, entender a arquitetura

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de anÃ¡lise da task (identificar todas as ambiguidades)
- ExecuÃ§Ã£o sem ambiguidade
- **Melhor para:** Ambientes de produÃ§Ã£o, implantaÃ§Ã£o para toda a equipe

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: setupMcpDocker()
responsÃ¡vel: DevOps Agent
responsavel_type: Agente
atomic_layer: Infrastructure

**Entrada:**
- campo: docker_version
  tipo: string
  origem: System Check
  obrigatÃ³rio: true
  validaÃ§Ã£o: Deve ser Docker Desktop 4.50+ com o MCP Toolkit habilitado

- campo: mcps_to_enable
  tipo: array
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: Array de nomes de servidores MCP do catÃ¡logo do Docker

- campo: presets
  tipo: object
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: ConfiguraÃ§Ãµes de preset (dev, research, full)

**SaÃ­da:**
- campo: gordon_config
  tipo: file
  destino: .docker/mcp/gordon-mcp.yml
  persistido: true

- campo: claude_integration
  tipo: boolean
  destino: ConfiguraÃ§Ã£o do Claude Code
  persistido: true

- campo: validation_report
  tipo: object
  destino: SaÃ­da no console
  persistido: false
```

---

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar prÃ©-requisitos ANTES da execuÃ§Ã£o da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Docker Desktop 4.50+ instalado
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: docker --version deve retornar 4.50.0 ou superior
    error_message: "Docker Desktop 4.50+ necessÃ¡rio. Baixe em https://docker.com/desktop"

  - [ ] Docker MCP Toolkit disponÃ­vel
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: docker mcp --version deve ter sucesso
    error_message: "Habilite o Docker MCP Toolkit nas configuraÃ§Ãµes do Docker Desktop"

  - [ ] Daemon do Docker em execuÃ§Ã£o
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: docker info deve ter sucesso
    error_message: "Inicie o Docker Desktop antes de rodar esta task"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o DEPOIS que a task Ã© concluÃ­da

**Checklist:**

```yaml
post-conditions:
  - [ ] MCP Gateway acessÃ­vel
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: docker mcp gateway status retorna healthy
    error_message: "Falha ao iniciar o MCP Gateway"

  - [ ] Claude Code conectado
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: Claude Code mostra docker-gateway na lista de MCP
    error_message: "Claude Code nÃ£o conectado ao MCP Gateway"
```

---

## CritÃ©rios de Aceite

```yaml
acceptance-criteria:
  - [ ] gordon-mcp.yml existe em .docker/mcp/
  - [ ] Pelo menos 3 MCPs core funcionais (filesystem, github, fetch)
  - [ ] Claude Code consegue chamar ferramentas MCP
  - [ ] Consumo de tokens reduzido vs MCPs diretos
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** Docker CLI
  - **PropÃ³sito:** OperaÃ§Ãµes de Docker e MCP
  - **Origem:** comandos docker, docker mcp

- **Ferramenta:** Claude Code CLI
  - **PropÃ³sito:** VerificaÃ§Ã£o de integraÃ§Ã£o
  - **Origem:** comando claude

---

# Setup Docker MCP Toolkit

## PropÃ³sito

Configurar o Docker MCP Toolkit como a infraestrutura MCP primÃ¡ria do AIOX, substituindo o 1MCP pela abordagem de gateway containerizado. Isso habilita:
- **ReduÃ§Ã£o de 98,7% de tokens** via Code Mode
- **Carregamento dinÃ¢mico de MCP** (mcp-find, mcp-add, mcp-remove)
- **ExecuÃ§Ã£o em sandbox** para workflows
- Acesso ao **catÃ¡logo de 270+ MCPs**

## VisÃ£o Geral da Arquitetura

```
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚         Claude Code / Desktop        â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                   â”‚ Chamadas de Ferramenta
                   â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚       Docker MCP Gateway            â”‚
â”‚   (Ponto de entrada Ãºnico)          â”‚
â”‚                                     â”‚
â”‚   Recursos:                         â”‚
â”‚   â€¢ Roteia ao container MCP correto â”‚
â”‚   â€¢ Gerenciamento de OAuth          â”‚
â”‚   â€¢ Descoberta dinÃ¢mica             â”‚
â”‚   â€¢ Hot-reload de configs           â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                   â”‚
      â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
      â–¼            â–¼            â–¼
â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â” â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚mcp/       â”‚ â”‚mcp/       â”‚ â”‚mcp/       â”‚
â”‚filesystem â”‚ â”‚github     â”‚ â”‚fetch      â”‚
â”‚Container  â”‚ â”‚Container  â”‚ â”‚Container  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜ â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

## PrÃ©-requisitos

- Docker Desktop 4.50+ instalado
- Docker MCP Toolkit habilitado nas configuraÃ§Ãµes do Docker Desktop
- Claude Code instalado
- (Opcional) Token do GitHub para o MCP github
- (Opcional) Outras API keys para MCPs especÃ­ficos

## Processo de ElicitaÃ§Ã£o Interativa

### Passo 1: VerificaÃ§Ã£o do Docker

```
ELICIT: VerificaÃ§Ã£o do Ambiente Docker

1. Verificando a versÃ£o do Docker Desktop...
   â†’ Rodar: docker --version
   â†’ Esperado: Docker versÃ£o 4.50.0 ou superior
   â†’ Se for menor: Orientar a atualizar o Docker Desktop

2. Verificando o Docker MCP Toolkit...
   â†’ Rodar: docker mcp --version
   â†’ Se nÃ£o estiver disponÃ­vel: Habilitar em Docker Desktop > Settings > Extensions > MCP Toolkit

3. Verificando o daemon do Docker...
   â†’ Rodar: docker info
   â†’ Deve ter sucesso antes de prosseguir
```

### Passo 2: SeleÃ§Ã£o de MCP

```
ELICIT: SeleÃ§Ã£o de Servidor MCP

Quais MCPs vocÃª quer habilitar?

MCPs CORE (Recomendados):
  [x] filesystem  - Acesso ao sistema de arquivos (ler/escrever arquivos do projeto)
  [x] github      - API do GitHub (repos, issues, PRs)
  [x] fetch       - RequisiÃ§Ãµes HTTP e web scraping

MCPs DE DESENVOLVIMENTO:
  [ ] postgres    - Acesso a banco de dados PostgreSQL
  [ ] sqlite      - Acesso a banco de dados SQLite
  [ ] redis       - OperaÃ§Ãµes de cache Redis

MCPs DE PRODUTIVIDADE:
  [ ] notion      - IntegraÃ§Ã£o com o workspace do Notion
  [ ] atlassian   - Jira/Confluence (alternativa ao ClickUp)
  [ ] slack       - Mensagens do Slack

MCPs DE AUTOMAÃ‡ÃƒO:
  [ ] puppeteer   - AutomaÃ§Ã£o de navegador
  [ ] playwright  - AutomaÃ§Ã£o avanÃ§ada de navegador

â†’ Selecione os MCPs a habilitar (nÃºmeros separados por vÃ­rgula ou 'core' para os padrÃµes)
```

### Passo 3: ConfiguraÃ§Ã£o de Presets

```
ELICIT: ConfiguraÃ§Ã£o de Presets

Os presets permitem carregar apenas os MCPs necessÃ¡rios para workflows especÃ­ficos.

1. Criar o preset 'aiox-dev'?
   â†’ MCPs recomendados: filesystem, github
   â†’ Caso de uso: ImplementaÃ§Ã£o de story, PRs, mudanÃ§as de cÃ³digo
   â†’ OrÃ§amento de tokens: ~5-10k

2. Criar o preset 'aiox-research'?
   â†’ MCPs recomendados: filesystem, fetch
   â†’ Caso de uso: DocumentaÃ§Ã£o, pesquisa na web
   â†’ OrÃ§amento de tokens: ~8-15k

3. Criar o preset 'aiox-full'?
   â†’ Todos os MCPs habilitados
   â†’ Caso de uso: Tasks complexas multi-domÃ­nio
   â†’ OrÃ§amento de tokens: Varia conforme os MCPs

â†’ Quais presets criar? (s/n para cada)
```

### Passo 4: ConfiguraÃ§Ã£o de Credenciais

```
ELICIT: Credenciais de API

Alguns MCPs exigem autenticaÃ§Ã£o:

1. MCP do GitHub:
   â†’ VariÃ¡vel de ambiente: GITHUB_TOKEN
   â†’ Status atual: [Definido/NÃ£o Definido]
   â†’ Se nÃ£o definido: Orientar a criar um Personal Access Token

2. Outros MCPs (se selecionados):
   â†’ Listar as credenciais necessÃ¡rias
   â†’ Orientar a obter cada uma
```

## Passos de ImplementaÃ§Ã£o

### 1. Criar o DiretÃ³rio MCP do Projeto

```bash
# Criar a estrutura .docker/mcp
mkdir -p .docker/mcp
```

### 2. Iniciar o Gateway como ServiÃ§o Persistente (Transporte HTTP)

**CRÃTICO:** Use o transporte HTTP em vez de stdio para evitar o timeout de 30 segundos.

```bash
# OpÃ§Ã£o A: Docker Compose (RECOMENDADO)
docker compose -f .docker/mcp/gateway-service.yml up -d

# OpÃ§Ã£o B: Processo em background (alternativa)
docker mcp gateway run --port 8080 --transport sse --watch &

# OpÃ§Ã£o C: Foreground manual (para debugging)
docker mcp gateway run --port 8080 --transport sse --watch
```

**Aguarde o gateway ficar pronto:**
```bash
# Health check (repita atÃ© ter sucesso)
curl -s http://localhost:8080/health || echo "Gateway iniciando..."
```

### 3. Habilitar os MCPs PadrÃ£o do AIOX

```bash
# Preset minimal (sem API keys necessÃ¡rias)
docker mcp server enable context7
docker mcp server enable desktop-commander
docker mcp server enable playwright

# Preset full (adiciona exa - requer EXA_API_KEY)
docker mcp server enable exa
```

### 4. Configurar o Path do Desktop-Commander

```bash
# Definir o diretÃ³rio home do usuÃ¡rio para o desktop-commander
docker mcp config write "desktop-commander:
  paths:
    - ${HOME}"
```

### 4.1 Configurar API Keys (CRÃTICO - Contorno de Bug Conhecido)

âš ï¸ **BUG:** O armazenamento de secrets e a interpolaÃ§Ã£o de templates do Docker MCP Toolkit NÃƒO funcionam corretamente. Credenciais definidas via `docker mcp secret set` ou `config.yaml apiKeys` nÃ£o sÃ£o passadas aos containers de MCPs com schemas de configuraÃ§Ã£o estritos.

**CONTORNO:** Edite o arquivo de catÃ¡logo diretamente para codificar os valores de env.

```yaml
# Edite: ~/.docker/mcp/catalogs/docker-mcp.yaml
# Encontre a entrada do MCP e adicione/modifique a seÃ§Ã£o env:

# Exemplo para o EXA (jÃ¡ funciona via apiKeys - nenhuma mudanÃ§a necessÃ¡ria):
exa:
  apiKeys:
    EXA_API_KEY: your-actual-api-key

# Exemplo para o Apify (requer ediÃ§Ã£o do catÃ¡logo):
apify-mcp-server:
  env:
    - name: TOOLS
      value: 'actors,docs,apify/rag-web-browser'
    - name: APIFY_TOKEN
      value: 'your-actual-apify-token'
```

**Nota de SeguranÃ§a:** Isto expÃµe credenciais em um arquivo local. Garanta que:
1. `~/.docker/mcp/catalogs/` nÃ£o seja commitado em nenhum repo
2. As permissÃµes do arquivo restrinjam o acesso somente ao usuÃ¡rio atual

**config.yaml alternativo (funciona para alguns MCPs como o EXA):**
```yaml
# ~/.docker/mcp/config.yaml
exa:
  apiKeys:
    EXA_API_KEY: your-api-key
```

Veja a task `*add-mcp` (Passo 3.1) para instruÃ§Ãµes detalhadas.

### 5. Configurar o Claude Code (Transporte HTTP)

**IMPORTANTE:** Use o tipo HTTP, NÃƒO stdio!

```json
// ~/.claude.json
{
  "mcpServers": {
    "docker-gateway": {
      "type": "http",
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

**Por que HTTP em vez de stdio?**
- stdio: O Claude Code inicia o gateway â†’ timeout de 30s antes de a inicializaÃ§Ã£o concluir
- HTTP: Gateway jÃ¡ em execuÃ§Ã£o â†’ conexÃ£o instantÃ¢nea

### 6. Verificar a IntegraÃ§Ã£o

```bash
# Verificar se o gateway estÃ¡ rodando
curl http://localhost:8080/health

# Listar servidores habilitados
docker mcp server ls

# Listar ferramentas disponÃ­veis
docker mcp tools ls

# Verificar a configuraÃ§Ã£o
docker mcp config read
```

### 7. Testar no Claude Code

ApÃ³s reiniciar o Claude Code:
```
/mcp
# Deve mostrar: docker-gateway (connected)
# Com ferramentas de: context7, desktop-commander, playwright
```

## MigraÃ§Ã£o a partir do 1MCP

Se estiver migrando do 1MCP:

### Passo 1: Backup da ConfiguraÃ§Ã£o Atual
```bash
cp ~/.claude.json ~/.claude.json.backup-pre-docker-mcp
```

### Passo 2: Parar o Servidor 1MCP
```bash
# Encerrar o processo do 1MCP
pkill -f "1mcp serve"

# Ou parar o serviÃ§o
sudo systemctl stop 1mcp
```

### Passo 3: Remover o 1MCP da ConfiguraÃ§Ã£o do Claude
```json
// ~/.claude.json - REMOVA estas entradas
{
  "mcpServers": {
    // "1mcp-dev": { ... },     // REMOVER
    // "1mcp-research": { ... } // REMOVER
  }
}
```

### Passo 4: Iniciar o ServiÃ§o de Gateway
```bash
# Iniciar o gateway como serviÃ§o persistente
docker compose -f .docker/mcp/gateway-service.yml up -d

# Aguardar o health check
sleep 5
curl http://localhost:8080/health
```

### Passo 5: Adicionar o Docker Gateway (Transporte HTTP)
```json
// ~/.claude.json - ADICIONE esta entrada (HTTP, NÃƒO stdio!)
{
  "mcpServers": {
    "docker-gateway": {
      "type": "http",
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

## Checklist de ValidaÃ§Ã£o

- [ ] Docker Desktop 4.50+ instalado e em execuÃ§Ã£o
- [ ] Docker MCP Toolkit habilitado (`docker mcp --version`)
- [ ] ServiÃ§o de gateway em execuÃ§Ã£o (`curl http://localhost:8080/health`)
- [ ] MCPs habilitados (`docker mcp server ls` mostra context7, desktop-commander, playwright)
- [ ] Claude Code configurado com transporte HTTP
- [ ] `/mcp` no Claude Code mostra docker-gateway conectado
- [ ] Ferramentas de todos os MCPs visÃ­veis em `/mcp`

## Tratamento de Erros

### Erro: Docker NÃ£o Encontrado
```
ResoluÃ§Ã£o: Instale o Docker Desktop em https://docker.com/desktop
VersÃ£o mÃ­nima: 4.50.0
```

### Erro: MCP Toolkit NÃ£o DisponÃ­vel
```
ResoluÃ§Ã£o:
1. Abra o Docker Desktop
2. VÃ¡ em Settings > Extensions
3. Habilite o "MCP Toolkit"
4. Reinicie o Docker Desktop
```

### Erro: Falha ao Iniciar o Gateway
```
ResoluÃ§Ã£o:
1. Verifique se a porta 8080 estÃ¡ disponÃ­vel: netstat -an | grep 8080
2. Tente uma porta alternativa: docker mcp gateway run --port 8081
3. Verifique os logs do Docker: docker logs mcp-gateway
```

### Erro: PermissÃ£o Negada nos Volumes
```
ResoluÃ§Ã£o:
1. Verifique se o Docker tem acesso ao diretÃ³rio do projeto
2. No Windows: Habilite o compartilhamento de arquivos nas configuraÃ§Ãµes do Docker Desktop
3. No Linux: Adicione o usuÃ¡rio ao grupo docker: sudo usermod -aG docker $USER
```

## SaÃ­da de Sucesso

```
âœ… Docker MCP Toolkit configurado com sucesso!

ðŸ“¦ MCP Gateway: Rodando em http://localhost:8080 (transporte HTTP/SSE)
ðŸ”§ MCPs Habilitados (preset minimal):
   â€¢ context7 - DocumentaÃ§Ã£o de bibliotecas
   â€¢ desktop-commander - Gerenciamento de arquivos + terminal
   â€¢ playwright - AutomaÃ§Ã£o de navegador

ðŸ“‹ Presets DisponÃ­veis:
   â€¢ minimal - context7, desktop-commander, playwright (sem API keys)
   â€¢ full - minimal + exa (requer EXA_API_KEY)

ðŸ”— Claude Code: Conectado via HTTP ao docker-gateway
ðŸ“Š Uso de Tokens: ~10-15k tokens (minimal) / ~20-25k (full)

ðŸ“ ConfiguraÃ§Ã£o:
   â€¢ ServiÃ§o de gateway: .docker/mcp/gateway-service.yml
   â€¢ ConfiguraÃ§Ã£o do Claude: ~/.claude.json (transporte HTTP)

PrÃ³ximos passos:
1. Reinicie o Claude Code para conectar
2. Rode /mcp para verificar a conexÃ£o
3. Use 'docker mcp server enable exa' para adicionar busca na web (requer EXA_API_KEY)
```

## Performance

```yaml
duration_expected: 10-20 min (primeira configuraÃ§Ã£o)
cost_estimated: $0 (sem chamadas de API)
token_usage: ~500-1.000 tokens (apenas esta task)
```

---

## Metadata

```yaml
story: Story 6.14 - MCP Governance Consolidation
version: 2.2.0
dependencies:
  - Docker Desktop 4.50+
  - Docker MCP Toolkit
  - gateway-service.yml (.docker/mcp/)
tags:
  - infrastructure
  - mcp
  - docker
  - setup
  - http-transport
created_at: 2025-12-08
updated_at: 2025-12-23
agents:
  - devops
changelog:
  2.2.0:
    - Adicionado: Passo 4.1 documentando o bug de secrets do Docker MCP
    - Adicionado: Contorno usando ediÃ§Ã£o direta do arquivo de catÃ¡logo
    - Atualizado: Esclarecido quais MCPs precisam de ediÃ§Ã£o de catÃ¡logo vs config.yaml
    - Corrigido: Apify e MCPs similares agora configurÃ¡veis
  2.1.0:
    - Alterado: DevOps Agent agora responsÃ¡vel exclusivo (Story 6.14)
    - Removido: Dev Agent da lista de agents
  2.0.0:
    - BREAKING: MudanÃ§a de stdio para transporte HTTP
    - Adicionado: gateway-service.yml para gateway persistente
    - Alterado: Presets de (dev/research/full) para (minimal/full)
    - Corrigido: Problema de timeout de 30 segundos com o transporte stdio
    - Adicionado: Health check antes da conexÃ£o do Claude Code
  1.0.0:
    - VersÃ£o inicial com transporte stdio
```
