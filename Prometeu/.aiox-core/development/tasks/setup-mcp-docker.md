# Setup Docker MCP Toolkit

**Task ID:** setup-mcp-docker
**Version:** 2.2.0
**Created:** 2025-12-08
**Updated:** 2025-12-23
**Agent:** @devops (Gage)

---

## Propósito

Configurar o Docker MCP Toolkit como a infraestrutura MCP primária do AIOX, usando **transporte HTTP** em vez de stdio para evitar problemas de timeout durante a inicialização do gateway.

**Principais Mudanças na v2.0:**
- Usa transporte HTTP/SSE (corrige o problema de timeout de 30s)
- O gateway roda como serviço persistente do Docker Compose
- Presets: `minimal` (sem API keys) e `full` (com API keys)

---

## MCPs Padrão do AIOX

| Preset | MCPs | API Key Necessária | Tokens |
|--------|------|------------------|--------|
| **minimal** | context7, desktop-commander, playwright | Não | ~10-15k |
| **full** | minimal + exa | Sim (EXA_API_KEY) | ~20-25k |

**MCPs do Preset Minimal:**
- **context7** - Consultas de documentação de bibliotecas
- **desktop-commander** - Gerenciamento de arquivos + comandos de terminal
- **playwright** - Automação de navegador para testes

**O Preset Full Adiciona:**
- **exa** - Busca na web potencializada por IA (requer `EXA_API_KEY`)

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Instala o preset `minimal` automaticamente
- **Melhor para:** Usuários experientes com o Docker já configurado

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints explícitos de decisão
- Escolha entre os presets minimal/full
- **Melhor para:** Primeira configuração, entender a arquitetura

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Ambientes de produção, implantação para toda a equipe

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: setupMcpDocker()
responsável: DevOps Agent
responsavel_type: Agente
atomic_layer: Infrastructure

**Entrada:**
- campo: docker_version
  tipo: string
  origem: System Check
  obrigatório: true
  validação: Deve ser Docker Desktop 4.50+ com o MCP Toolkit habilitado

- campo: mcps_to_enable
  tipo: array
  origem: User Input
  obrigatório: false
  validação: Array de nomes de servidores MCP do catálogo do Docker

- campo: presets
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Configurações de preset (dev, research, full)

**Saída:**
- campo: gordon_config
  tipo: file
  destino: .docker/mcp/gordon-mcp.yml
  persistido: true

- campo: claude_integration
  tipo: boolean
  destino: Configuração do Claude Code
  persistido: true

- campo: validation_report
  tipo: object
  destino: Saída no console
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Docker Desktop 4.50+ instalado
    tipo: pre-condition
    blocker: true
    validação: docker --version deve retornar 4.50.0 ou superior
    error_message: "Docker Desktop 4.50+ necessário. Baixe em https://docker.com/desktop"

  - [ ] Docker MCP Toolkit disponível
    tipo: pre-condition
    blocker: true
    validação: docker mcp --version deve ter sucesso
    error_message: "Habilite o Docker MCP Toolkit nas configurações do Docker Desktop"

  - [ ] Daemon do Docker em execução
    tipo: pre-condition
    blocker: true
    validação: docker info deve ter sucesso
    error_message: "Inicie o Docker Desktop antes de rodar esta task"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] MCP Gateway acessível
    tipo: post-condition
    blocker: true
    validação: docker mcp gateway status retorna healthy
    error_message: "Falha ao iniciar o MCP Gateway"

  - [ ] Claude Code conectado
    tipo: post-condition
    blocker: true
    validação: Claude Code mostra docker-gateway na lista de MCP
    error_message: "Claude Code não conectado ao MCP Gateway"
```

---

## Critérios de Aceite

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
  - **Propósito:** Operações de Docker e MCP
  - **Origem:** comandos docker, docker mcp

- **Ferramenta:** Claude Code CLI
  - **Propósito:** Verificação de integração
  - **Origem:** comando claude

---

# Setup Docker MCP Toolkit

## Propósito

Configurar o Docker MCP Toolkit como a infraestrutura MCP primária do AIOX, substituindo o 1MCP pela abordagem de gateway containerizado. Isso habilita:
- **Redução de 98,7% de tokens** via Code Mode
- **Carregamento dinâmico de MCP** (mcp-find, mcp-add, mcp-remove)
- **Execução em sandbox** para workflows
- Acesso ao **catálogo de 270+ MCPs**

## Visão Geral da Arquitetura

```
┌─────────────────────────────────────┐
│         Claude Code / Desktop        │
└──────────────────┬──────────────────┘
                   │ Chamadas de Ferramenta
                   ▼
┌─────────────────────────────────────┐
│       Docker MCP Gateway            │
│   (Ponto de entrada único)          │
│                                     │
│   Recursos:                         │
│   • Roteia ao container MCP correto │
│   • Gerenciamento de OAuth          │
│   • Descoberta dinâmica             │
│   • Hot-reload de configs           │
└──────────────────┬──────────────────┘
                   │
      ┌────────────┼────────────┐
      ▼            ▼            ▼
┌───────────┐ ┌───────────┐ ┌───────────┐
│mcp/       │ │mcp/       │ │mcp/       │
│filesystem │ │github     │ │fetch      │
│Container  │ │Container  │ │Container  │
└───────────┘ └───────────┘ └───────────┘
```

## Pré-requisitos

- Docker Desktop 4.50+ instalado
- Docker MCP Toolkit habilitado nas configurações do Docker Desktop
- Claude Code instalado
- (Opcional) Token do GitHub para o MCP github
- (Opcional) Outras API keys para MCPs específicos

## Processo de Elicitação Interativa

### Passo 1: Verificação do Docker

```
ELICIT: Verificação do Ambiente Docker

1. Verificando a versão do Docker Desktop...
   → Rodar: docker --version
   → Esperado: Docker versão 4.50.0 ou superior
   → Se for menor: Orientar a atualizar o Docker Desktop

2. Verificando o Docker MCP Toolkit...
   → Rodar: docker mcp --version
   → Se não estiver disponível: Habilitar em Docker Desktop > Settings > Extensions > MCP Toolkit

3. Verificando o daemon do Docker...
   → Rodar: docker info
   → Deve ter sucesso antes de prosseguir
```

### Passo 2: Seleção de MCP

```
ELICIT: Seleção de Servidor MCP

Quais MCPs você quer habilitar?

MCPs CORE (Recomendados):
  [x] filesystem  - Acesso ao sistema de arquivos (ler/escrever arquivos do projeto)
  [x] github      - API do GitHub (repos, issues, PRs)
  [x] fetch       - Requisições HTTP e web scraping

MCPs DE DESENVOLVIMENTO:
  [ ] postgres    - Acesso a banco de dados PostgreSQL
  [ ] sqlite      - Acesso a banco de dados SQLite
  [ ] redis       - Operações de cache Redis

MCPs DE PRODUTIVIDADE:
  [ ] notion      - Integração com o workspace do Notion
  [ ] atlassian   - Jira/Confluence (alternativa ao ClickUp)
  [ ] slack       - Mensagens do Slack

MCPs DE AUTOMAÇÃO:
  [ ] puppeteer   - Automação de navegador
  [ ] playwright  - Automação avançada de navegador

→ Selecione os MCPs a habilitar (números separados por vírgula ou 'core' para os padrões)
```

### Passo 3: Configuração de Presets

```
ELICIT: Configuração de Presets

Os presets permitem carregar apenas os MCPs necessários para workflows específicos.

1. Criar o preset 'aiox-dev'?
   → MCPs recomendados: filesystem, github
   → Caso de uso: Implementação de story, PRs, mudanças de código
   → Orçamento de tokens: ~5-10k

2. Criar o preset 'aiox-research'?
   → MCPs recomendados: filesystem, fetch
   → Caso de uso: Documentação, pesquisa na web
   → Orçamento de tokens: ~8-15k

3. Criar o preset 'aiox-full'?
   → Todos os MCPs habilitados
   → Caso de uso: Tasks complexas multi-domínio
   → Orçamento de tokens: Varia conforme os MCPs

→ Quais presets criar? (s/n para cada)
```

### Passo 4: Configuração de Credenciais

```
ELICIT: Credenciais de API

Alguns MCPs exigem autenticação:

1. MCP do GitHub:
   → Variável de ambiente: GITHUB_TOKEN
   → Status atual: [Definido/Não Definido]
   → Se não definido: Orientar a criar um Personal Access Token

2. Outros MCPs (se selecionados):
   → Listar as credenciais necessárias
   → Orientar a obter cada uma
```

## Passos de Implementação

### 1. Criar o Diretório MCP do Projeto

```bash
# Criar a estrutura .docker/mcp
mkdir -p .docker/mcp
```

### 2. Iniciar o Gateway como Serviço Persistente (Transporte HTTP)

**CRÍTICO:** Use o transporte HTTP em vez de stdio para evitar o timeout de 30 segundos.

```bash
# Opção A: Docker Compose (RECOMENDADO)
docker compose -f .docker/mcp/gateway-service.yml up -d

# Opção B: Processo em background (alternativa)
docker mcp gateway run --port 8080 --transport sse --watch &

# Opção C: Foreground manual (para debugging)
docker mcp gateway run --port 8080 --transport sse --watch
```

**Aguarde o gateway ficar pronto:**
```bash
# Health check (repita até ter sucesso)
curl -s http://localhost:8080/health || echo "Gateway iniciando..."
```

### 3. Habilitar os MCPs Padrão do AIOX

```bash
# Preset minimal (sem API keys necessárias)
docker mcp server enable context7
docker mcp server enable desktop-commander
docker mcp server enable playwright

# Preset full (adiciona exa - requer EXA_API_KEY)
docker mcp server enable exa
```

### 4. Configurar o Path do Desktop-Commander

```bash
# Definir o diretório home do usuário para o desktop-commander
docker mcp config write "desktop-commander:
  paths:
    - ${HOME}"
```

### 4.1 Configurar API Keys (CRÍTICO - Contorno de Bug Conhecido)

⚠️ **BUG:** O armazenamento de secrets e a interpolação de templates do Docker MCP Toolkit NÃO funcionam corretamente. Credenciais definidas via `docker mcp secret set` ou `config.yaml apiKeys` não são passadas aos containers de MCPs com schemas de configuração estritos.

**CONTORNO:** Edite o arquivo de catálogo diretamente para codificar os valores de env.

```yaml
# Edite: ~/.docker/mcp/catalogs/docker-mcp.yaml
# Encontre a entrada do MCP e adicione/modifique a seção env:

# Exemplo para o EXA (já funciona via apiKeys - nenhuma mudança necessária):
exa:
  apiKeys:
    EXA_API_KEY: your-actual-api-key

# Exemplo para o Apify (requer edição do catálogo):
apify-mcp-server:
  env:
    - name: TOOLS
      value: 'actors,docs,apify/rag-web-browser'
    - name: APIFY_TOKEN
      value: 'your-actual-apify-token'
```

**Nota de Segurança:** Isto expõe credenciais em um arquivo local. Garanta que:
1. `~/.docker/mcp/catalogs/` não seja commitado em nenhum repo
2. As permissões do arquivo restrinjam o acesso somente ao usuário atual

**config.yaml alternativo (funciona para alguns MCPs como o EXA):**
```yaml
# ~/.docker/mcp/config.yaml
exa:
  apiKeys:
    EXA_API_KEY: your-api-key
```

Veja a task `*add-mcp` (Passo 3.1) para instruções detalhadas.

### 5. Configurar o Claude Code (Transporte HTTP)

**IMPORTANTE:** Use o tipo HTTP, NÃO stdio!

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
- stdio: O Claude Code inicia o gateway → timeout de 30s antes de a inicialização concluir
- HTTP: Gateway já em execução → conexão instantânea

### 6. Verificar a Integração

```bash
# Verificar se o gateway está rodando
curl http://localhost:8080/health

# Listar servidores habilitados
docker mcp server ls

# Listar ferramentas disponíveis
docker mcp tools ls

# Verificar a configuração
docker mcp config read
```

### 7. Testar no Claude Code

Após reiniciar o Claude Code:
```
/mcp
# Deve mostrar: docker-gateway (connected)
# Com ferramentas de: context7, desktop-commander, playwright
```

## Migração a partir do 1MCP

Se estiver migrando do 1MCP:

### Passo 1: Backup da Configuração Atual
```bash
cp ~/.claude.json ~/.claude.json.backup-pre-docker-mcp
```

### Passo 2: Parar o Servidor 1MCP
```bash
# Encerrar o processo do 1MCP
pkill -f "1mcp serve"

# Ou parar o serviço
sudo systemctl stop 1mcp
```

### Passo 3: Remover o 1MCP da Configuração do Claude
```json
// ~/.claude.json - REMOVA estas entradas
{
  "mcpServers": {
    // "1mcp-dev": { ... },     // REMOVER
    // "1mcp-research": { ... } // REMOVER
  }
}
```

### Passo 4: Iniciar o Serviço de Gateway
```bash
# Iniciar o gateway como serviço persistente
docker compose -f .docker/mcp/gateway-service.yml up -d

# Aguardar o health check
sleep 5
curl http://localhost:8080/health
```

### Passo 5: Adicionar o Docker Gateway (Transporte HTTP)
```json
// ~/.claude.json - ADICIONE esta entrada (HTTP, NÃO stdio!)
{
  "mcpServers": {
    "docker-gateway": {
      "type": "http",
      "url": "http://localhost:8080/mcp"
    }
  }
}
```

## Checklist de Validação

- [ ] Docker Desktop 4.50+ instalado e em execução
- [ ] Docker MCP Toolkit habilitado (`docker mcp --version`)
- [ ] Serviço de gateway em execução (`curl http://localhost:8080/health`)
- [ ] MCPs habilitados (`docker mcp server ls` mostra context7, desktop-commander, playwright)
- [ ] Claude Code configurado com transporte HTTP
- [ ] `/mcp` no Claude Code mostra docker-gateway conectado
- [ ] Ferramentas de todos os MCPs visíveis em `/mcp`

## Tratamento de Erros

### Erro: Docker Não Encontrado
```
Resolução: Instale o Docker Desktop em https://docker.com/desktop
Versão mínima: 4.50.0
```

### Erro: MCP Toolkit Não Disponível
```
Resolução:
1. Abra o Docker Desktop
2. Vá em Settings > Extensions
3. Habilite o "MCP Toolkit"
4. Reinicie o Docker Desktop
```

### Erro: Falha ao Iniciar o Gateway
```
Resolução:
1. Verifique se a porta 8080 está disponível: netstat -an | grep 8080
2. Tente uma porta alternativa: docker mcp gateway run --port 8081
3. Verifique os logs do Docker: docker logs mcp-gateway
```

### Erro: Permissão Negada nos Volumes
```
Resolução:
1. Verifique se o Docker tem acesso ao diretório do projeto
2. No Windows: Habilite o compartilhamento de arquivos nas configurações do Docker Desktop
3. No Linux: Adicione o usuário ao grupo docker: sudo usermod -aG docker $USER
```

## Saída de Sucesso

```
✅ Docker MCP Toolkit configurado com sucesso!

📦 MCP Gateway: Rodando em http://localhost:8080 (transporte HTTP/SSE)
🔧 MCPs Habilitados (preset minimal):
   • context7 - Documentação de bibliotecas
   • desktop-commander - Gerenciamento de arquivos + terminal
   • playwright - Automação de navegador

📋 Presets Disponíveis:
   • minimal - context7, desktop-commander, playwright (sem API keys)
   • full - minimal + exa (requer EXA_API_KEY)

🔗 Claude Code: Conectado via HTTP ao docker-gateway
📊 Uso de Tokens: ~10-15k tokens (minimal) / ~20-25k (full)

📁 Configuração:
   • Serviço de gateway: .docker/mcp/gateway-service.yml
   • Configuração do Claude: ~/.claude.json (transporte HTTP)

Próximos passos:
1. Reinicie o Claude Code para conectar
2. Rode /mcp para verificar a conexão
3. Use 'docker mcp server enable exa' para adicionar busca na web (requer EXA_API_KEY)
```

## Performance

```yaml
duration_expected: 10-20 min (primeira configuração)
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
    - Adicionado: Contorno usando edição direta do arquivo de catálogo
    - Atualizado: Esclarecido quais MCPs precisam de edição de catálogo vs config.yaml
    - Corrigido: Apify e MCPs similares agora configuráveis
  2.1.0:
    - Alterado: DevOps Agent agora responsável exclusivo (Story 6.14)
    - Removido: Dev Agent da lista de agents
  2.0.0:
    - BREAKING: Mudança de stdio para transporte HTTP
    - Adicionado: gateway-service.yml para gateway persistente
    - Alterado: Presets de (dev/research/full) para (minimal/full)
    - Corrigido: Problema de timeout de 30 segundos com o transporte stdio
    - Adicionado: Health check antes da conexão do Claude Code
  1.0.0:
    - Versão inicial com transporte stdio
```
