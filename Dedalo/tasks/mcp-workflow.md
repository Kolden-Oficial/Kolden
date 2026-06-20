# Tarefa: Workflow de Gerenciamento de Servidores MCP

**Task ID:** mcp-workflow
**Versão:** 1.0
**Propósito:** Descobrir, avaliar, configurar e validar servidores MCP para a stack tecnológica de um projeto
**Orquestrador:** @mcp-integrator (Piper)
**Modo:** Interativo (elicit: true)
**Padrão de Qualidade:** Integração MCP totalmente testada com orçamento de contexto documentado

---

## Visão Geral

Esta tarefa orienta o ciclo de vida completo do gerenciamento de servidores MCP: desde a descoberta de quais servidores beneficiam o projeto, passando pela avaliação do impacto deles no orçamento de contexto, até a configuração e o teste deles no Claude Code.

```
ENTRADA (project_tech_stack + current_mcps)
    |
[FASE 1: DESCOBERTA]
    -> Varrer o projeto em busca de frameworks, linguagens, serviços
    -> Cruzar com o catálogo conhecido de servidores MCP
    -> Identificar lacunas no ferramental atual
    |
[FASE 2: AVALIAÇÃO DO ORÇAMENTO DE CONTEXTO]
    -> Calcular o custo em tokens por servidor MCP
    -> Comparar o orçamento total com os limites do modelo
    -> Recomendar decisões de adicionar/remover
    |
[FASE 3: CONFIGURAÇÃO]
    -> Escolher o local de configuração (projeto vs global)
    -> Selecionar o transport (stdio vs HTTP Streamable)
    -> Escrever as entradas MCP nas settings
    |
[FASE 4: SELEÇÃO DE TRANSPORT]
    -> Avaliar requisitos local vs remoto
    -> Configurar os parâmetros do transport
    -> Definir variáveis de ambiente e segredos
    |
[FASE 5: VALIDAÇÃO DE FERRAMENTAS]
    -> Testar a disponibilidade de ferramentas de cada servidor MCP
    -> Verificar as respostas das ferramentas com chamadas de amostra
    -> Documentar as ferramentas disponíveis por servidor
    |
[FASE 6: DOCUMENTAÇÃO]
    -> Atualizar o CLAUDE.md com regras de uso de MCP
    -> Criar tabela de prioridade de seleção de ferramentas
    -> Documentar a árvore de decisão CLI-first vs MCP
    |
SAÍDA: Servidores MCP configurados + relatório de orçamento de contexto + atualizações no CLAUDE.md
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_root | string | Auto-detecção | sim | Diretório válido com package.json ou equivalente |
| tech_stack | array | Varredura ou usuário | sim | Lista de frameworks/linguagens em uso |
| current_mcps | object | .claude/settings.json | não | Configuração MCP existente |
| context_budget_limit | number | Usuário ou padrão | não | Máximo de tokens para overhead de MCP (padrão: 10000) |

---

## Pré-condições

1. O Claude Code está instalado e operacional no projeto
2. `.claude/settings.json` ou `~/.claude.json` existe (ou será criado)
3. O usuário tem acesso para instalar os binários dos servidores MCP (npm, pip, docker)
4. Acesso à rede para servidores MCP remotos (se aplicável)

---

## Fase 1: Descoberta

**Objetivo:** Identificar quais servidores MCP beneficiariam este projeto.

### Passos

1.1. Varrer a raiz do projeto em busca de indicadores da stack tecnológica:
   - `package.json` -> ecossistema Node.js (procurar por React, Next.js, Express, etc.)
   - `requirements.txt` / `pyproject.toml` -> ecossistema Python
   - `docker-compose.yml` -> serviços baseados em containers
   - `.env` / `supabase/` -> uso de Supabase/banco de dados
   - `playwright.config.*` -> testes de navegador

1.2. Cruzar a stack detectada com o catálogo de servidores MCP:

| Sinal da Stack Tecnológica | MCP Recomendado | Propósito |
|-------------------|----------------|---------|
| Projeto Supabase | supabase | Operações de banco de dados, migrações |
| Qualquer projeto web | playwright/browser | Testes de UI, screenshots |
| Pesquisa intensiva | exa | Busca na web, pesquisa de empresas |
| Qualquer framework | context7 | Consulta de documentação de bibliotecas |
| Serviços Docker | desktop-commander | Gerenciamento de containers |
| Repositório GitHub | github-cli (nativo) | Gerenciamento de PR/issues |

1.3. Listar os servidores MCP atuais a partir da configuração e identificar lacunas.

---

## Fase 2: Avaliação do Orçamento de Contexto

**Objetivo:** Quantificar o custo em tokens de cada servidor MCP.

### Matemática do Orçamento de Contexto

Cada servidor MCP adiciona ao system prompt:
- **Registro do servidor:** ~200 tokens (nome, descrição, informações de conexão)
- **Definições de ferramentas:** ~100-400 tokens por ferramenta (nome, descrição, parâmetros, schema)
- **Servidor típico:** 600-2000 tokens no total

### Cálculo do Orçamento

```
Custo Total de MCP = SOMA(server_tool_count * avg_tokens_per_tool + 200)

Exemplo:
  playwright (15 ferramentas) = 15 * 150 + 200 = 2.450 tokens
  context7 (2 ferramentas)    = 2 * 150 + 200  = 500 tokens
  exa (1 ferramenta)          = 1 * 150 + 200  = 350 tokens
  supabase (5 ferramentas)    = 5 * 150 + 200  = 950 tokens
  ---
  TOTAL                       = 4.250 tokens (~2% de um contexto de 200K)
```

### Framework de Decisão

| Orçamento Total de MCP | Recomendação |
|-----------------|---------------|
| < 5.000 tokens | Green -- adicionar livremente |
| 5.000-10.000 tokens | Yellow -- avaliar cada adição |
| > 10.000 tokens | Red -- remover servidores de baixo valor |

2.1. Calcular o custo em tokens de cada servidor MCP proposto.
2.2. Somar o total e comparar com o limite de orçamento.
2.3. Se estiver acima do orçamento, ordenar os servidores por valor-por-token e recomendar remoções.

---

## Fase 3: Configuração

**Objetivo:** Escrever a configuração dos servidores MCP no local apropriado.

### Decisão do Local de Configuração

| Escopo | Arquivo | Quando Usar |
|-------|------|-------------|
| Apenas projeto | `.claude/settings.json` | O MCP é específico do projeto (ex.: supabase para este BD) |
| Global (todos os projetos) | `~/.claude.json` | O MCP é universalmente útil (ex.: context7, exa) |

### Passos

3.1. Determinar o escopo de cada servidor MCP.
3.2. Ler o arquivo de configuração existente.
3.3. Adicionar as entradas dos servidores MCP com a estrutura adequada:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@package/mcp-server"],
      "env": {
        "API_KEY": "..."
      }
    }
  }
}
```

3.4. Validar a estrutura JSON após a escrita.

---

## Fase 4: Seleção de Transport

**Objetivo:** Escolher o protocolo de transport correto para cada servidor MCP.

### Comparação de Transport

| Transport | Protocolo | Caso de Uso | Latência | Configuração |
|-----------|----------|----------|---------|-------|
| **stdio** (padrão) | stdin/stdout | Ferramentas CLI locais, maioria dos servidores | Baixa | Simples |
| **HTTP Streamable** | HTTP + SSE | Servidores remotos, infra compartilhada | Média | URL + auth |

### Árvore de Decisão

```
O servidor MCP está rodando localmente?
  SIM -> Usar stdio (padrão)
    É um binário CLI? -> command + args
    É um container Docker? -> comando docker run
  NÃO -> Usar HTTP Streamable
    Precisa de auth? -> Adicionar header Authorization
    Está atrás de um proxy? -> Configurar a URL do proxy
```

4.1. Para cada servidor MCP, determinar se é local ou remoto.
4.2. Configurar o transport de acordo.
4.3. Definir variáveis de ambiente para as API keys (nunca fixar diretamente na configuração).

---

## Fase 5: Validação de Ferramentas

**Objetivo:** Verificar se cada servidor MCP está funcionando e se suas ferramentas estão acessíveis.

### Passos

5.1. Iniciar o Claude Code com a nova configuração.
5.2. Para cada servidor MCP configurado, verificar a disponibilidade de ferramentas:
   - Verificar se as ferramentas aparecem na lista de ferramentas
   - Executar uma chamada de teste mínima (ex.: context7 resolve-library-id com "react")
5.3. Documentar quaisquer servidores que falharem ao conectar.
5.4. Se um servidor falhar, verificar:
   - Binário instalado? (o command existe)
   - API key válida? (env vars definidas)
   - Porta disponível? (para transport HTTP)
   - Rede acessível? (para servidores remotos)

---

## Fase 6: Documentação

**Objetivo:** Atualizar a documentação do projeto com regras de uso de MCP.

### Árvore de Decisão CLI-First vs MCP

```
Precisa realizar uma tarefa?
  |
  Uma ferramenta nativa do Claude Code consegue fazer isso?
  (Read, Write, Edit, Bash, Grep, Glob)
    SIM -> Usar a ferramenta nativa (SEMPRE preferir)
    NÃO -> Existe uma ferramenta MCP para isso?
      SIM -> Usar a ferramenta MCP
      NÃO -> Usar Bash para instalar/executar uma ferramenta externa
```

### Passos

6.1. Adicionar ou atualizar a seção de MCP no CLAUDE.md com:
   - Lista dos servidores configurados e seus propósitos
   - Prioridade de seleção de ferramentas (nativa > MCP > Bash)
   - Regras de uso específicas de cada servidor
6.2. Criar `.claude/rules/mcp-usage.md` caso ainda não exista, com ativação baseada em path.
6.3. Documentar quaisquer pegadinhas específicas de cada servidor (auth, rate limits, etc.).

---

## Formato de Saída

```yaml
mcp_workflow_result:
  servers_configured:
    - name: "context7"
      transport: "stdio"
      tools: 2
      token_cost: 500
      status: "verified"
    - name: "playwright"
      transport: "stdio"
      tools: 15
      token_cost: 2450
      status: "verified"
  total_token_cost: 2950
  budget_status: "green"
  files_modified:
    - ".claude/settings.json"
    - "CLAUDE.md"
  documentation_updated: true
```

---

## Condições de Veto

| Condição | Ação |
|-----------|--------|
| O orçamento de tokens de MCP excede 15.000 tokens | PARAR -- é preciso remover servidores antes de prosseguir |
| API key necessária, mas não fornecida | PULAR o servidor -- documentar como pendente |
| Binário do servidor MCP não instalável | PULAR o servidor -- sugerir alternativa |
| A escrita do arquivo de configuração falha | PARAR -- verificar as permissões do arquivo |
| Todos os servidores MCP falham na validação | PARAR -- provavelmente um problema de ambiente, depurar primeiro |
