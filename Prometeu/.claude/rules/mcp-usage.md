---
paths: **/*
---

# Regras de Uso de Servidores MCP - Arquitetura AIOX

## Governança de MCP

**IMPORTANTE:** Todo o gerenciamento da infraestrutura MCP é tratado EXCLUSIVAMENTE pelo **Agente DevOps (@devops / Gage)**.

| Operação | Agente | Comando |
|-----------|-------|---------|
| Buscar no catálogo MCP | DevOps | `*search-mcp` |
| Adicionar servidor MCP | DevOps | `*add-mcp` |
| Listar MCPs habilitados | DevOps | `*list-mcps` |
| Remover servidor MCP | DevOps | `*remove-mcp` |
| Configurar MCP via Docker | DevOps | `*setup-mcp-docker` |

Outros agentes (Dev, Architect, etc.) são **consumidores** de MCP, não administradores. Se for necessário gerenciar MCP, delegue para @devops.

---

## Arquitetura de Configuração MCP

O AIOX usa o Docker MCP Toolkit como infraestrutura MCP primária:

### Direto no Claude Code (global ~/.claude.json)
| MCP | Propósito |
|-----|---------|
| **playwright** | Automação de navegador, screenshots, testes web |
| **desktop-commander** | Operações de container Docker via docker-gateway |

### Dentro do Docker Desktop (via docker-gateway)

| MCP | Propósito |
|-----|---------|
| **EXA** | Busca na web, pesquisa, análise de empresas/concorrentes |
| **Context7** | Consulta de documentação de bibliotecas |
| **Apify** | Web scraping, Actors, extração de dados de redes sociais |

## CRÍTICO: Prioridade de Seleção de Ferramentas

SEMPRE prefira as ferramentas nativas do Claude Code aos servidores MCP:

| Tarefa | USE ISTO | NÃO ISTO |
|------|----------|----------|
| Ler arquivos | ferramenta `Read` | docker-gateway |
| Escrever arquivos | ferramentas `Write` / `Edit` | docker-gateway |
| Rodar comandos | ferramenta `Bash` | docker-gateway |
| Buscar arquivos | ferramenta `Glob` | docker-gateway |
| Buscar conteúdo | ferramenta `Grep` | docker-gateway |
| Listar diretórios | `Bash(ls)` ou `Glob` | docker-gateway |

## Uso do desktop-commander (docker-gateway)

### SOMENTE use o docker-gateway quando:
1. O usuário disser explicitamente "use docker" ou "use container"
2. O usuário mencionar explicitamente "Desktop Commander"
3. A tarefa exigir especificamente operações de container Docker
4. For acessar MCPs rodando dentro do Docker (EXA, Context7)
5. O usuário pedir para rodar algo dentro de um container Docker

### NUNCA use o docker-gateway para:
- Ler arquivos locais (use a ferramenta `Read`)
- Escrever arquivos locais (use as ferramentas `Write` ou `Edit`)
- Rodar comandos shell no host (use a ferramenta `Bash`)
- Buscar arquivos (use as ferramentas `Glob` ou `Grep`)
- Listar diretórios (use `Bash(ls)` ou `Glob`)
- Rodar scripts Node.js ou Python no host (use a ferramenta `Bash`)

## Uso do MCP playwright

### SOMENTE use o playwright quando:
1. O usuário pedir explicitamente automação de navegador
2. O usuário quiser tirar screenshots de páginas web
3. O usuário precisar interagir com um site
4. A tarefa exigir web scraping ou testes
5. For preencher formulários ou clicar em elementos em páginas web

### NUNCA use o playwright para:
- Operações gerais de arquivos
- Rodar comandos
- Qualquer coisa não relacionada a navegadores web

## Uso do MCP EXA (via Docker)

### Use o EXA (mcp__docker-gateway__web_search_exa) para:
1. Buscas na web por informações atuais
2. Pesquisa e consulta de documentação
3. Pesquisa de empresas e concorrentes
4. Encontrar exemplos de código online

### Padrão de acesso:
```
mcp__docker-gateway__web_search_exa
```

## Uso do MCP Context7 (via Docker)

### Use o Context7 para:
1. Consulta de documentação de bibliotecas
2. Referência de API para pacotes/frameworks
3. Obter documentação atualizada para dependências

### Padrão de acesso:
```
mcp__docker-gateway__resolve-library-id
mcp__docker-gateway__get-library-docs
```

## Uso do MCP Apify (via Docker)

### Use o Apify para:
1. Buscar Actors na Apify Store (web scrapers, ferramentas de automação)
2. Rodar web scrapers para redes sociais (Instagram, TikTok, LinkedIn, etc.)
3. Extrair dados de sites de e-commerce
4. Coleta automatizada de dados de qualquer site
5. Navegação web com RAG para contexto de IA

### Padrão de acesso (7 ferramentas disponíveis):

```text
mcp__docker-gateway__apify-slash-rag-web-browser  # RAG-enabled web browsing
mcp__docker-gateway__search-actors                 # Search for Actors
mcp__docker-gateway__call-actor                    # Run an Actor
mcp__docker-gateway__fetch-actor-details           # Get Actor info/schema
mcp__docker-gateway__get-actor-output              # Get results from Actor run
mcp__docker-gateway__search-apify-docs             # Search Apify documentation
mcp__docker-gateway__fetch-apify-docs              # Fetch documentation page
```

### Quando usar Apify vs outras ferramentas:
| Tarefa | Ferramenta |
|------|------|
| Busca geral na web | EXA (`web_search_exa`) |
| Scrape de site específico | Apify (`call-actor`) |
| Extração de dados de redes sociais | Apify (use Actors especializados) |
| Documentação de bibliotecas | Context7 |

---

## Justificativa

- **Ferramentas nativas** executam no sistema LOCAL (Windows/Mac/Linux)
- **docker-gateway** executa dentro de containers Docker (Linux)
- Usar o docker-gateway para operações locais causa incompatibilidades de caminho e falhas
- Ferramentas nativas são mais rápidas e confiáveis para operações de arquivos locais
- EXA, Context7 e Apify rodam dentro do Docker para isolamento e ambiente consistente
- O playwright roda diretamente para melhor integração de navegador com o sistema host

---

## Problemas Conhecidos

### Bug de Secrets do Docker MCP (Dez 2025)

**Problema:** O armazenamento de secrets do Docker MCP Toolkit e a interpolação de templates não funcionam corretamente. Credenciais definidas via `docker mcp secret set` NÃO são passadas aos containers.

**Sintomas:**
- `docker mcp tools ls` mostra "(N prompts)" em vez de "(N tools)"
- O servidor MCP inicia mas falha na autenticação
- A saída verbosa mostra `-e ENV_VAR` sem valores

**Solução de contorno:** Edite o `~/.docker/mcp/catalogs/docker-mcp.yaml` diretamente com valores de env codificados:
```yaml
{mcp-name}:
  env:
    - name: API_TOKEN
      value: 'actual-token-value'
```

**MCPs afetados:** Qualquer MCP que exija autenticação (Apify, Notion, Slack, etc.)

**MCPs que funcionam:** O EXA funciona porque sua chave está em `~/.docker/mcp/config.yaml` sob `apiKeys`

Para instruções detalhadas, veja a task `*add-mcp` ou peça assistência ao @devops.
