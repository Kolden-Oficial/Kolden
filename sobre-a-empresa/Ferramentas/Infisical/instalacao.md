---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Ferramentas/Infisical/ferramentas|ferramentas]]"
---

# Infisical — Instalação e Configuração

Passo a passo para reinstalar e configurar o Infisical do zero.

---

## 1. Instalar o CLI

```bash
# Windows (via npm)
npm install -g @infisical/cli

# Verificar instalação
infisical --version
```

---

## 2. Autenticar

```bash
infisical login
```

Abre o navegador para login. Após autenticar, o token é salvo localmente.

---

## 3. Configurar o INFISICAL_TOKEN (variável de sistema)

Para scripts automatizados e agentes que não passam pelo browser:

1. Gerar um Machine Identity Token no painel Infisical (Settings → Machine Identities)
2. Configurar como variável de ambiente permanente no Windows:
   ```powershell
   [System.Environment]::SetEnvironmentVariable("INFISICAL_TOKEN", "<token>", "Machine")
   ```
3. Também definir o Workspace ID:
   ```powershell
   [System.Environment]::SetEnvironmentVariable("INFISICAL_WORKSPACE_ID", "<workspace-id>", "Machine")
   ```

---

## 4. Inicializar em um projeto

Dentro da pasta do projeto:

```bash
infisical init
```

Selecionar o workspace e ambiente. Gera `.infisical.json` (pode ser versionado — não contém segredos).

---

## 5. Verificar acesso

```bash
# Listar segredos do ambiente prod
infisical secrets --env=prod --path=/kolden/prod

# Rodar um comando com segredos injetados
infisical run --env=prod --path=/kolden/prod -- node script.js
```

---

## 6. Configurar MCP no Claude Code (opcional)

Para que agentes Claude Code acessem o Infisical via MCP, adicionar em `settings.json`:

```json
{
  "mcpServers": {
    "infisical": {
      "command": "npx",
      "args": ["@infisical/mcp-server"],
      "env": {
        "INFISICAL_TOKEN": "${INFISICAL_TOKEN}",
        "INFISICAL_WORKSPACE_ID": "${INFISICAL_WORKSPACE_ID}"
      }
    }
  }
}
```

---

## Referências

- Painel: https://app.infisical.com
- Docs CLI: https://infisical.com/docs/cli/overview
- Guia interno completo: `C:\Kolden\Caos\modelos\guia-infisical.md`
