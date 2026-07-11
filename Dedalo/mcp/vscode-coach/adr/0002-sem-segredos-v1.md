---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/mcp/vscode-coach/adr/0001-stack-node-typescript|0001-stack-node-typescript]]"
---

# ADR 0002 — Sem segredos na v1

**Status:** Aceito | **Data:** 2026-06-28 | **Decisor:** Piper (Dédalo) + Caos | **Aprovação:** Ronan

## Contexto

Constituição Kolden Art. VII exige que **toda credencial passe pelo Infisical**. A skill `criacao-de-mcp` Passo 3.1 reforça: "Toda credencial do MCP vem do Infisical via habilidade `infisical-padrao`". A pergunta para o `vscode-coach`: precisa de segredo?

## Decisão

**v1 do `vscode-coach` NÃO usa segredo algum.** Todas as tools são:

1. **Leitura** do filesystem local do workspace (`fs.readFile` / `fs.readdir`)
2. **Execução** de `code --list-extensions` (CLI pública, sem auth)
3. **Leitura** do knowledge base estático em `data/*.yaml` e `data/snippets-por-stack/*.json`

Nenhuma chamada a API privada. Nenhuma autenticação. Nenhum token.

## Alternativas consideradas

| Alternativa | Por que rejeitada na v1 |
|---|---|
| Marketplace API privado (auth) | Endpoint público anônimo já cobre validação de versão (`https://marketplace.visualstudio.com/items?itemName=...`) |
| GitHub API autenticada (rate limit maior) | Não usamos GitHub API na v1; quando usar, será via `gh` CLI (já autenticada localmente) |
| Sync de catálogo em cloud privado | Catálogo já é versionado em git (Kolden monorepo) |
| Telemetria/analytics próprios | Premissa de soberania de dados + complexidade desnecessária na v1 |

## Consequências

### Positivas
- Setup do MCP é zero-config (build + adicionar a `.vscode/mcp.json` + funcionar)
- Sem dependência do shim Infisical (que tem gotcha do SAC bloqueando `infisical.exe` — ver memória `reference_mcp_infisical_sac_shim`)
- Surface de ataque mínima
- Conformidade Art. VII trivial (não há o que vazar)

### Negativas
- Quando v2 precisar de Marketplace API privado (ex.: validar extensões privadas) ou sync cloud, será refactor (não extensão trivial)
- Não é exemplo do padrão Infisical para futuros MCPs Kolden (outro MCP precisará ser o caso de prova)

## Trigger para v2 com segredos

Reavaliar quando QUALQUER uma:

1. Catálogo precisar sincronizar entre máquinas via API privada (S3, gist privado, Supabase)
2. Marketplace API exigir auth para validar versões em escala (rate limit anônimo insuficiente)
3. Tool nova precisar autenticar com GitHub/GitLab/Bitbucket para inspecionar repos privados
4. Integração com serviço externo da Kolden que exija token

Quando reativar: ler `infisical-padrao` skill, adicionar campo `env` no `.vscode/mcp.json` exemplo no README com `${env:KOLDEN_VSCODE_COACH_TOKEN}`, documentar caminho `/kolden/<env>/VSCODE_COACH_*` no Infisical, atualizar este ADR para "Superado por ADR 0003".

## Verificação contínua

Revisor (Caos Fase 6) deve buscar em `src/`:
- `process.env.*` (exceto `NODE_ENV`, `HOME`, `USERPROFILE`, `APPDATA`)
- Imports de `dotenv`, `axios`/`fetch` para domínios não-públicos
- Strings que parecem tokens (`sk-`, `ghp_`, `xoxb-`, etc.)

Egide (verificação de segurança estática) deve confirmar antes do registro Fase 8.
