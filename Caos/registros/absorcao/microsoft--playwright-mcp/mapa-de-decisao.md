# F4 — Mapa de decisão — microsoft--playwright-mcp

Comparação contra `dados/registro-de-entidades.yaml` e squads existentes. Viés autônomo: preferir ADAPT/CREATE
a REUSE sem prova item-a-item.

## Contexto de comparação (capacidades de navegador já existentes na Kolden)
- **Browserbase** (MCP no workspace): automação de navegador **na nuvem** (SaaS), 6 tools de alto nível
  (`start/end/navigate/act/observe/extract`, base Stagehand/visão-LLM). É cloud — **conflita com soberania de dados**.
- **vendor-crawlee** (`Argos/motor/crawlee/`, Apache-2.0): usa Playwright por baixo, mas para **pool de crawling JS**, não controle interativo tool-a-tool.
- **vendor-skyvern** (`Argos/motor/skyvern/`, **AGPL-3.0**): automação de browser por **visão LLM** em DOM hostil.

Nenhum é equivalente item-a-item ao Playwright MCP, que é **local-first, determinístico (árvore de acessibilidade,
não visão), granular (68 tools) e Apache-2.0**. Logo: não há REUSE limpo. É um vendor NOVO e distinto — e o mais
alinhado à soberania de dados (roda local, ao contrário do Browserbase cloud).

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | CREATE | vendor (governança dedalo; consumo argos) | Servidor MCP novo no catálogo de ferramentas; alternativa local-first ao Browserbase (soberania), sem equivalente item-a-item. |
| G2 | CREATE | vendor | Navegação granular não existe nos vendors atuais (crawlee é pool de crawl, Browserbase é cloud high-level). |
| G3 | CREATE | vendor | Interação determinística por árvore de acessibilidade — distinta da abordagem por visão (skyvern) e do `act` cloud (Browserbase). |
| G4 | CREATE | vendor | Snapshot de acessibilidade + screenshot/console como leitura ao vivo; sem equivalente nominal nos vendors. |
| G5 | CREATE | vendor (guardrail egide) | `evaluate`/`run_code_unsafe` = capacidade nova de execução JS; registrar desabilitada por padrão, allowlist + sandbox (ver seguranca.md). |
| G6 | CREATE | vendor | Mock/intercept de rede é capacidade nova útil a testes e scraping resiliente; inexistente nos vendors atuais. |
| G7 | CREATE | vendor | Gestão de cookies tool-a-tool; sem equivalente. |
| G8 | CREATE | vendor | local/sessionStorage + storage_state (sessões persistentes/reuso de login); sem equivalente. |
| G9 | CREATE | vendor | Mouse por coordenadas (DOM hostil/canvas) complementa skyvern, mas é vendor distinto, não absorção de skill. |
| G10 | ADAPT | dedalo (eng de agentes/QA) ou prometeu | Verificação visual (`verify_*`) pode virar técnica de QA de UI para Dedalo/Prometeu além do uso como vendor. |
| G11 | CREATE | vendor | Tracing/vídeo/anotação como observabilidade de execução de navegador; sem equivalente. |
| G12 | ADAPT | egide (segurança) | Feature `secrets` (mascarar segredos nas respostas) reforça política de soberania/privacidade — referência para guardrails de vendors. |

## Decisão dominante
**CREATE → vendor** (registrar Playwright MCP como vendor inerte no catálogo de ferramentas, governado por **Dedalo**,
consumido por **Argos**), com 2 ganchos **ADAPT** (G10→dedalo/prometeu QA; G12→egide). **Não é REUSE**: complementa,
não substitui, o Browserbase — e é a opção **local-first/soberana**, ao contrário do Browserbase cloud.

**Ressalva de absorção:** vendor inerte — não vira agente. Guardrail obrigatório em G5 (RCE-equivalente). Atualizar
`sobre-a-empresa/Ferramentas/` (catálogo + mcp-status) e o registro de entidades como `tipo: mcp`/vendor.
