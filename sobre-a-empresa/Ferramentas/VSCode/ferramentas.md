# VSCode — Referência de Uso

Visual Studio Code é o editor de código da Microsoft e, no contexto Kolden, atua também como **host/cliente de servidores MCP** (Model Context Protocol) através do agent mode do Copilot Chat — o lado oposto do Claude Code. Categoria: IDE / Ambiente de Dev.

---

## Credenciais (Infisical)

**Não aplicável** — VSCode é um editor local, sem API key própria.

As credenciais relevantes são as dos **servidores MCP que o VSCode consome** (Firecrawl, GitHub, etc.), e cada uma já vive no Infisical no manual da sua ferramenta. Nunca colocar valor de segredo no `.vscode/mcp.json` (que pode ir para o controle de versão). Resolver sempre em runtime — ver a seção MCP abaixo e o Art. VII da Constituição Kolden.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial (MCP) | https://code.visualstudio.com/docs/agent-customization/mcp-servers |
| Referência de config MCP | https://code.visualstudio.com/docs/agents/reference/mcp-configuration |
| Changelog / Status (GA do MCP) | https://code.visualstudio.com/updates/v1_102 (jun/2025 — "MCP support is now generally available") |
| Repositório GitHub | https://github.com/microsoft/vscode |
| Protocolo (padrão aberto) | https://modelcontextprotocol.io |

---

## MCP (Model Context Protocol)

- **Papel do VSCode:** **host/cliente** de servidores MCP (não é um servidor que se adiciona ao Claude Code). Os servidores expõem *tools*, *resources*, *prompts* e *MCP Apps* ao chat em agent mode.
- **Disponibilidade:** **GA (estável)** desde o **VS Code 1.102 (junho/2025)**.
- **Onde configurar** (dois locais):
  - **Workspace:** `.vscode/mcp.json` no projeto (pode ir ao source control para compartilhar com o time — sem segredos).
  - **Perfil do usuário:** comando **MCP: Open User Configuration** (vale para todos os workspaces; cada perfil tem o seu).
- **Transportes (`type`):** `stdio` (local, via `command`/`args`/`env`), `http` e `sse` (remoto, via `url`/`headers`).
- **Exemplo mínimo** (`.vscode/mcp.json` — um servidor remoto e um local):
  ```json
  {
    "servers": {
      "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp" },
      "playwright": { "command": "npx", "args": ["-y", "@microsoft/mcp-server-playwright"] }
    }
  }
  ```
- **Segredos sem hardcode** (mecanismos oficiais, em ordem de preferência Kolden):
  1. **`${env:NOME}`** — referencia uma variável de ambiente do processo. É o que permite a integração com Infisical (ver Uso básico).
  2. **`envFile`** — campo do servidor que aponta para um arquivo `.env` (fora do versionamento).
  3. **`${input:id}`** — pede o valor interativamente; declarado no array `inputs` no topo do arquivo:
     ```json
     { "inputs": [ { "type": "promptString", "id": "api-key", "description": "API Key", "password": true } ] }
     ```
- **Gerência (UI/comandos):** Extensions view (`@mcp` na busca abre a galeria; seção **MCP SERVERS - INSTALLED**), e na Command Palette: **MCP: Add Server**, **MCP: List Servers**, **MCP: Open User Configuration**, **MCP: Reset Trust**.
- **CLI:** `code --add-mcp "{\"name\":\"meu-server\",\"command\":\"uvx\",\"args\":[\"mcp-server-fetch\"]}"`.
- **Extras:** auto-descoberta de configs de outros clientes (ex. Claude Desktop) via `chat.mcp.discovery.enabled`; sandbox para servidores stdio locais (`sandboxEnabled: true`, só macOS/Linux); sincronização via Settings Sync; trust dialog na primeira execução.

---

## Uso básico

1. **Ativar o agent mode:** abra o Chat (`Ctrl+Alt+I`) e selecione o modo **Agent**.
2. **Adicionar um servidor:** Command Palette (`Ctrl+Shift+P`) → **MCP: Add Server** (fluxo guiado, alvo Workspace ou Global), ou edite `.vscode/mcp.json` direto.
3. **Usar:** os *tools* do servidor ficam disponíveis no chat; o botão **Configure Tools** liga/desliga cada um.

**Exemplo Kolden — conectar um MCP da stack (Firecrawl/GitHub) com credencial via Infisical:**

Lance o VSCode a partir de um terminal com as secrets injetadas pelo Infisical, e referencie-as no `mcp.json` com `${env:...}` (nunca o valor literal):
```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- code .
```
```json
{
  "servers": {
    "github":    { "type": "http", "url": "https://api.githubcopilot.com/mcp",
                   "headers": { "Authorization": "Bearer ${env:GITHUB_ACCESS_TOKEN}" } },
    "firecrawl": { "command": "npx", "args": ["-y", "firecrawl-mcp"],
                   "env": { "FIRECRAWL_API_KEY": "${env:FIRECRAWL_API_KEY}" } }
  }
}
```
Assim o `mcp.json` é versionável (não contém segredo) e a credencial é resolvida em runtime pelo Infisical — consistente com a stack do Claude Code.

---

## Notas Kolden

- **Quando usar:** VSCode entra quando o trabalho é no editor (Copilot agent mode). Para orquestração de agentes/squads da Kolden, o **Claude Code** segue sendo o ambiente primário; Cursor é alternativa de editor. O `mcp.json` do VSCode e o `claude mcp add` configuram **lados opostos** do MCP (cliente vs. o que o Claude Code consome).
- **Dono do tema:** o agente **Piper** (`Dedalo/agents/mcp-integrator.md`) é a referência para configurar VSCode como cliente MCP — mantê-lo alinhado com os caminhos de config atuais desta doc.
- **Segurança (Art. VII):** nunca segredo literal no `.vscode/mcp.json` versionado — usar `${env:...}` (via `infisical run`), `envFile` ou `${input:}`. Servidores MCP locais executam código arbitrário: só adicionar de fontes confiáveis e revisar antes de dar trust.
