# vscode-coach (MCP)

> MCP server da Kolden — coach de produtividade do VS Code.
> Operado pelo **Piper** (mcp-integrator) no squad **Dédalo**.

Camada opinionada que audita workspaces VS Code, recomenda kits de setup por stack, otimiza ergonomia, diagnostica problemas comuns e gera configurações reproduzíveis (devcontainer, testing, source control) — tudo em pt-BR e com curadoria Kolden versionada.

**Não escreve no filesystem do usuário** — retorna conteúdo/patches, o cliente decide aplicar.
**Não chama LLM internamente** — o cliente (Claude / Copilot) raciocina sobre os blocos de informação curada.

---

## Tools (7)

| Tool | Para que serve |
|---|---|
| `vscode_auditar_workspace` | Lê `.vscode/`, `package.json`, `.editorconfig`, extensões; retorna score + gaps |
| `vscode_recomendar_setup` | Dada uma stack, gera kit: extensões + `settings.json` + `launch.json` + `tasks.json` |
| `vscode_otimizar_produtividade` | Sugere keybindings, snippets, perfis por persona/stack |
| `vscode_diagnosticar_problema` | Recebe sintoma livre, devolve hipóteses ranqueadas + correção |
| `vscode_setup_devcontainer` | Gera `.devcontainer/devcontainer.json` por stack |
| `vscode_setup_testing` | Configura vitest/jest/pytest/playwright (extensão + tasks + launch) |
| `vscode_setup_source_control` | `.gitignore` + GitLens config + hooks (husky/pre-commit/lefthook) |

---

## Instalação

### Pré-requisitos
- Node ≥ 20 (testado em 22 e 24)
- VS Code 1.102+ (MCP em GA) — opcional, mas necessário para o cliente VS Code
- CLI `code` no PATH (Command Palette → "Shell Command: Install code command in PATH") — opcional, melhora `auditar_workspace`

### Build
```bash
cd C:\Kolden\Dedalo\mcp\vscode-coach
npm install
npm run build
```

### Consumir no VS Code

No workspace que vai usar o coach, crie `.vscode/mcp.json`:

```jsonc
{
  "servers": {
    "vscode-coach": {
      "type": "stdio",
      "command": "node",
      "args": ["C:\\Kolden\\Dedalo\\mcp\\vscode-coach\\dist\\index.js"]
    }
  }
}
```

Command Palette → "MCP: List Servers" → `vscode-coach` aparece. Copilot agent mode usa as 7 tools.

### Consumir no Claude Code

```bash
claude mcp add vscode-coach -- node C:\Kolden\Dedalo\mcp\vscode-coach\dist\index.js
```

### Consumir em Cursor / Windsurf

Mesmo binário stdio — adicionar no `~/.cursor/mcp.json` ou `~/.codeium/windsurf/mcp_config.json` no formato do cliente.

---

## Stacks suportadas (v1)

`react-ts`, `react-vite`, `nextjs`, `node-express`, `node-fastify`, `python-fastapi`, `python-django`, `python-data`, `go`, `rust`.

Stack não suportada → tool retorna `STACK_DESCONHECIDA` com lista de stacks próximas.

---

## Estrutura

```
vscode-coach/
├── package.json
├── tsconfig.json
├── README.md
├── prd.md                # PRD aprovado (Caos Fase 4)
├── adr/                  # decisões arquiteturais
├── src/
│   ├── index.ts          # entrypoint stdio
│   ├── server.ts         # registro de tools
│   ├── tools/            # 7 implementações
│   ├── lib/              # erros, exec-code, ler-workspace, catalogo, render, log
│   └── schemas/          # Zod reutilizáveis
├── data/                 # knowledge base curada (YAMLs / JSONs)
├── eval/                 # harness do mcp-builder (10 tarefas)
└── dist/                 # build TS → JS
```

---

## Contribuir com o catálogo

O knowledge base em `data/` é o coração do coach. **Não edite na mão sem PR.**

1. Para adicionar extensão a uma stack: editar `data/extensoes-por-stack.yaml`, preencher `id`, `motivo`, `configuracao_minima`, **`verificado_em` (data YYYY-MM-DD)**.
2. Para adicionar diagnóstico: editar `data/diagnosticos.yaml`, preencher `sintomas` (lista de termos), `hipoteses` (cada uma com `verificacao` + `correcao` + `link_doc`).
3. Para adicionar snippets: arquivo JSON em `data/snippets-por-stack/<lang>.json` no formato nativo VS Code.
4. Para adicionar stack: criar entrada em `extensoes-por-stack.yaml` + (opcional) devcontainer em `data/devcontainers/` + (opcional) snippets.

Cron quinzenal do Caos valida cada `id` contra Marketplace público e abre issue se 404.

---

## Variantes de path

| SO | Exemplo de `args` em `.vscode/mcp.json` |
|---|---|
| Windows | `["C:\\Kolden\\Dedalo\\mcp\\vscode-coach\\dist\\index.js"]` |
| Linux/WSL | `["/home/kolden/kolden/Dedalo/mcp/vscode-coach/dist/index.js"]` |
| macOS | `["/Users/<user>/Kolden/Dedalo/mcp/vscode-coach/dist/index.js"]` |

---

## Limitações conhecidas

- Catálogo é Windows-first nos testes (Ronan opera Windows); Linux/Mac funcionam mas têm menos cobertura de smoke test.
- Sem integração com Marketplace API privado (v1 — sem segredos, ADR 0002).
- 10 stacks na v1; outras retornam `STACK_DESCONHECIDA`.

---

## Licença

Interno Kolden. Não distribuir.
