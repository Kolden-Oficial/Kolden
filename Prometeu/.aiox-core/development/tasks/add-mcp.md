---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Task de Adicionar Servidor MCP

> Adiciona dinamicamente servidores MCP ao Docker MCP Toolkit a partir do catálogo.

---

## Definição da Task

```yaml
task: addMcp()
responsavel: DevOps Agent
responsavel_type: Agente
atomic_layer: Infrastructure
elicit: true

**Entrada:**
- campo: mcp_query
  tipo: string
  origem: User Input
  obrigatorio: true
  validacao: Query de busca no catálogo MCP

- campo: mcp_name
  tipo: string
  origem: User Selection
  obrigatorio: true
  validacao: Nome exato do servidor MCP no catálogo

- campo: credentials
  tipo: object
  origem: User Input
  obrigatorio: false
  validacao: Chaves de API ou tokens, se exigidos pelo MCP

**Saida:**
- campo: mcp_added
  tipo: boolean
  destino: Configuração do Docker MCP
  persistido: true

- campo: tools_available
  tipo: array
  destino: Saída do console
  persistido: false
```

---

## Pré-Condições

```yaml
pre-conditions:
  - [ ] Docker MCP Toolkit em execução
    tipo: pre-condition
    blocker: true
    validacao: docker mcp gateway status executa com sucesso
    error_message: "Inicie o gateway: docker mcp gateway run --watch"

  - [ ] Recurso de MCP dinâmico habilitado
    tipo: pre-condition
    blocker: false
    validacao: docker mcp feature list mostra dynamic-tools
    error_message: "Habilite com: docker mcp feature enable dynamic-tools"
```

---

## Elicitação Interativa

### Passo 1: Buscar no Catálogo MCP

```
ELICIT: Busca de MCP

Qual servidor MCP você está procurando?

Digite uma query de busca (ex: "notion", "slack", "database"):
→ _______________

[Buscando no catálogo Docker MCP...]
```

### Passo 2: Selecionar a partir dos Resultados

```
ELICIT: Seleção de MCP

Encontrados {n} MCPs correspondentes a "{query}":

1. mcp/notion
   └─ Integração com workspace do Notion
   └─ Requer: NOTION_API_KEY

2. mcp/postgres
   └─ Acesso a banco de dados PostgreSQL
   └─ Requer: DATABASE_URL

3. mcp/sqlite
   └─ Acesso a banco de dados SQLite
   └─ Requer: Nenhuma (arquivo local)

→ Selecione o MCP a adicionar (número ou nome): ___
```

### Passo 3: Configurar Credenciais

```
ELICIT: Configuração de Credenciais

O MCP selecionado requer autenticação:

MCP: mcp/{name}
Requer: {CREDENTIAL_NAME}

Opções:
1. Definir variável de ambiente agora
2. Configurar depois (o MCP pode falhar sem credenciais)
3. Pular este MCP

→ Escolha uma opção: ___

[Se opção 1]
Digite o valor para {CREDENTIAL_NAME}:
→ _______________
(Isto será definido como uma variável de ambiente)
```

### Passo 4: Confirmar Adição

```
ELICIT: Confirmação

Pronto para adicionar o MCP:

Servidor: mcp/{name}
Credenciais: {configuradas/não configuradas}
Preset: {preset ao qual adicionar, se houver}

→ Prosseguir? (s/n): ___
```

---

## Passos de Implementação

### 1. Buscar no Catálogo

```bash
# Buscar MCPs
docker mcp catalog search {query}

# Exemplo de saída:
# mcp/notion    Notion workspace integration
# mcp/postgres  PostgreSQL database access
```

### 2. Obter Detalhes do MCP

```bash
# Obter informações detalhadas sobre um MCP
docker mcp catalog info {mcp-name}

# Mostra: descrição, credenciais necessárias, ferramentas fornecidas
```

### 3. Adicionar Servidor MCP

```bash
# Habilitar o servidor
docker mcp server enable {mcp-name}
```

### 3.1 Configurar Credenciais (CRÍTICO - Solução de Contorno para Bug Conhecido)

⚠️ **BUG:** O armazenamento de secrets do Docker MCP Toolkit e a interpolação de templates (`{{...}}`) NÃO funcionam corretamente. Credenciais definidas via `docker mcp secret set` não são passadas aos containers.

**SOLUÇÃO DE CONTORNO:** Edite o arquivo de catálogo diretamente para fixar (hardcode) os valores de env.

```yaml
# Edite: ~/.docker/mcp/catalogs/docker-mcp.yaml
# Encontre a entrada do seu MCP e adicione/modifique a seção env:

{mcp-name}:
  # ... outras configurações ...
  env:
    - name: {ENV_VAR_NAME}
      value: '{actual-api-key-value}'
    - name: TOOLS
      value: 'tool1,tool2,tool3'
```

**Exemplo para Apify:**
```yaml
apify-mcp-server:
  env:
    - name: TOOLS
      value: 'actors,docs,apify/rag-web-browser'
    - name: APIFY_TOKEN
      value: 'apify_api_xxxxxxxxxxxxx'
```

**Nota de Segurança:** Isto expõe credenciais em um arquivo local. Garanta que:
1. `~/.docker/mcp/catalogs/` não seja commitado em nenhum repositório
2. As permissões do arquivo restrinjam o acesso apenas ao usuário atual

**Alternativa (se os secrets funcionarem no futuro):**
```bash
# Definir secret (atualmente NÃO funciona)
docker mcp secret set {mcp-name}.{credential_name}={value}
```

### 4. Atualizar a Config do Gordon (Opcional)

Se adicionar ao gordon-mcp.yml:

```yaml
# Adicione ao .docker/mcp/gordon-mcp.yml
services:
  {mcp-name}:
    image: mcp/{mcp-name}
    environment:
      - {CREDENTIAL_NAME}=${CREDENTIAL_NAME}
    labels:
      mcp.preset: "full,{custom}"
```

### 5. Verificar a Adição

```bash
# Listar ferramentas do novo MCP
docker mcp tools ls | grep {mcp-name}

# Testar uma ferramenta
docker mcp tools call {mcp-name}.{tool} --param value
```

### 6. Adicionar a um Preset (Opcional)

```bash
# Adicionar a um preset existente
docker mcp preset update {preset-name} --add-server {mcp-name}

# Ou criar um novo preset incluindo o MCP
docker mcp preset create {new-preset} --servers fs,github,{mcp-name}
```

### 7. Atualizar a Documentação do AIOX (OBRIGATÓRIO)

Adicione o novo MCP a `.claude/rules/mcp-usage.md`:

```markdown
## Uso do MCP {MCP-Name} (via Docker)

### Use o {MCP-Name} para:
1. [Caso de uso principal 1]
2. [Caso de uso principal 2]

### Padrão de acesso:
\`\`\`
mcp__docker-gateway__{tool-name-1}
mcp__docker-gateway__{tool-name-2}
\`\`\`
```

Atualize também a tabela na seção "Inside Docker Desktop (via docker-gateway)".

### 8. Notificar o Usuário Sobre o Reinício da Sessão (CRÍTICO)

⚠️ **O usuário DEVE reiniciar sua sessão do Claude Code** para que as novas ferramentas MCP fiquem disponíveis.

```text
IMPORTANTE: As novas ferramentas MCP NÃO estarão disponíveis até que você:
1. Feche esta sessão do Claude Code
2. Abra uma nova sessão do Claude Code: `claude`

O docker-gateway faz cache das ferramentas na inicialização. Novas ferramentas só aparecem após o reinício.
```

### 9. Verificar Ferramentas Disponíveis na Nova Sessão

Depois que o usuário reiniciar o Claude Code, verifique se as ferramentas estão acessíveis:

```bash
# Na nova sessão do Claude Code, peça a um agente para usar o novo MCP
@analyst Use a ferramenta {mcp-name} para [executar alguma ação]

# Esperado: O agente deve ver e usar mcp__docker-gateway__{tool-name}
# Se não estiver visível: Verifique docker mcp server list e docker mcp tools ls
```

---

## Pós-Condições

```yaml
post-conditions:
  - [ ] Servidor MCP adicionado
    tipo: post-condition
    blocker: true
    validacao: docker mcp server list inclui o novo MCP
    error_message: "Falha na adição do MCP"

  - [ ] Ferramentas disponíveis no Docker MCP
    tipo: post-condition
    blocker: true
    validacao: docker mcp tools ls mostra as ferramentas do MCP
    error_message: "Ferramentas do MCP não disponíveis - verifique as credenciais"

  - [ ] Documentação do AIOX atualizada
    tipo: post-condition
    blocker: true
    validacao: .claude/rules/mcp-usage.md inclui o novo MCP
    error_message: "Atualize mcp-usage.md com a documentação do novo MCP"

  - [ ] Usuário notificado sobre o reinício da sessão
    tipo: post-condition
    blocker: true
    validacao: Usuário informado para reiniciar a sessão do Claude Code
    error_message: "Notifique o usuário: ferramentas só ficam disponíveis após o reinício da sessão"
```

**NOTA CRÍTICA:** Ferramentas adicionadas ao Docker MCP Toolkit NÃO ficam imediatamente disponíveis para os agentes AIOX. O docker-gateway faz cache das ferramentas na inicialização do Claude Code. O usuário DEVE reiniciar sua sessão do Claude Code para que as novas ferramentas apareçam.

---

## Tratamento de Erros

### Erro: MCP Não Encontrado

```
Resolução:
1. Verifique a grafia do nome do MCP
2. Busque com uma query mais ampla: docker mcp catalog search "*"
3. Verifique se o MCP está no registry: https://github.com/modelcontextprotocol/registry
```

### Erro: Credenciais Faltando / Ferramentas Não Carregam

```text
Resolução (Devido a Bug Conhecido):
1. Edite o catálogo diretamente: ~/.docker/mcp/catalogs/docker-mcp.yaml
2. Adicione valores de env fixos (hardcoded) na seção env do MCP
3. Verifique com: docker mcp tools ls --verbose
4. Confira se a saída mostra "(N tools)" e não "(N prompts)"

Se ainda mostrar apenas prompts:
- O token pode ser inválido
- A variável de ambiente TOOLS pode estar errada
- O MCP pode precisar de configuração específica
```

### Erro: MCP Falha ao Iniciar

```
Resolução:
1. Verifique os logs do Docker: docker logs mcp-{name}
2. Verifique se as credenciais estão corretas
3. Consulte a documentação do MCP para requisitos específicos
4. Tente remover e adicionar novamente: docker mcp server remove {name}
```

---

## Saída de Sucesso

```
✅ Servidor MCP Adicionado com Sucesso!

📦 Servidor: mcp/{name}
🔧 Ferramentas Adicionadas:
   • {name}.tool1 - Descrição
   • {name}.tool2 - Descrição
   • {name}.tool3 - Descrição

🔗 Status: Em execução
📋 Preset: Adicionado a 'aiox-full'

Próximos passos:
1. Testar ferramentas: docker mcp tools call {name}.tool1 --param value
2. Usar em workflow: *mcp-workflow com as ferramentas {name}
3. Adicionar a outros presets: docker mcp preset update aiox-dev --add-server {name}
```

---

## Referência de MCPs Comuns

| MCP | Propósito | Credenciais | Ferramentas Populares |
|-----|-----------|-------------|-----------------------|
| `notion` | Workspace do Notion | NOTION_API_KEY | getPage, createPage, search |
| `postgres` | Banco PostgreSQL | DATABASE_URL | query, execute, listTables |
| `sqlite` | Banco SQLite | Nenhuma | query, execute |
| `slack` | Mensagens no Slack | SLACK_BOT_TOKEN | sendMessage, listChannels |
| `puppeteer` | Automação de navegador | Nenhuma | navigate, screenshot, click |
| `redis` | Cache Redis | REDIS_URL | get, set, del |
| `s3` | AWS S3 | AWS_* | upload, download, list |
| `stripe` | Pagamentos Stripe | STRIPE_SECRET_KEY | createPayment, listCustomers |

---

## Metadados

```yaml
task: add-mcp
version: 1.3.0
story: Story 6.14 - Consolidação de Governança de MCP
dependencies:
  - Docker MCP Toolkit
  - docker mcp gateway em execução
tags:
  - infrastructure
  - mcp
  - docker
  - dynamic
created_at: 2025-12-08
updated_at: 2025-12-23
agents:
  - devops
changelog:
  1.3.0:
    - Adicionado: Passo 3.1 documentando o bug de secrets/template do Docker MCP
    - Adicionado: Solução de contorno usando edição direta do arquivo de catálogo
    - Atualizado: Tratamento de erros para problemas de credenciais
    - Corrigido: MCP do Apify agora funcionando com 7 ferramentas
    - Nota: O bug afeta todos os MCPs que exigem autenticação
  1.2.0:
    - Adicionado: Passos 7-9 para documentação do AIOX e reinício da sessão
    - Adicionado: Pós-condições para atualização de documentação e notificação ao usuário
    - Adicionado: Nota crítica sobre o cache de ferramentas do docker-gateway
    - Corrigido: Ferramentas não apareciam nos agentes AIOX após a adição do MCP
  1.1.0:
    - Alterado: DevOps Agent agora responsável exclusivo (Story 6.14)
    - Removido: Dev Agent da lista de agentes
  1.0.0:
    - Versão inicial (Story 5.11)
```
