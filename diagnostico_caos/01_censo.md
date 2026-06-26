# 01 — Censo (inventário cru do ecossistema CAOS)

> Apenas o que existe e onde. Sem interpretação de fluxo. Todos os caminhos relativos a `C:\Kolden\`.

## 1. Núcleo de definição do CAOS (`Caos/`)

| Caminho | Tipo | Tam. | O que aparenta ser |
|---|---|---|---|
| `Caos/constituicao.md` | doc (princípios) | 11 KB | 8 artigos versionados c/ gates; **Art. VIII = absorção segura** | `[VERIFICADO]`
| `Caos/CLAUDE.md` | system prompt do CAOS | 18 KB | identidade + Ritual de 9 fases + **Pipeline de Absorção (`/absorver`)** | `[VERIFICADO]`
| `Caos/leia-me.md` | doc | 6,7 KB | guia/mapa do repositório |
| `Caos/glossario.md` | doc | 7,6 KB | termos do Kolden |
| `Caos/nucleo/ARQUITETURA.md` | doc (esboço) | — | runtime model-agnostic via OpenRouter — **"sem código ainda"** (l.2) | `[VERIFICADO]`
| `Caos/agentes/.gitkeep` | vazio | — | saída do Ritual (nenhum agente vive aqui hoje) |
| `Caos/squads/.gitkeep` | vazio | — | idem |

### 1.1 Especialistas do CAOS (`Caos/.claude/agents/`) — 9 subagentes

`arquiteto.md`, `auditor-de-seguranca.md`, `curador.md`, `diagnosticador.md`, `pesquisador.md`, `redator-de-prompts.md`, `revisor.md`, `testador.md`, `vigia.md`. `[VERIFICADO]`
- **Relevantes à absorção:** `auditor-de-seguranca` (gate F2), `curador` (ledger/registro F0/F7), `revisor` (F6), `testador` (F6).

### 1.2 Habilidades (`Caos/.claude/skills/`) — 18 skills

`auditoria-de-squad`, `busca-de-referencias`, `consulta-ao-registro`, `criacao-de-hooks`, `criacao-de-mcp`, `criacao-de-skill`, `criacao-de-squad`, `criacao-de-subagent`, `diagnostico-de-agente`, `geracao-de-prd`, `heranca-de-especialista`, `infisical-padrao`, **`ingestao-de-repositorio`**, `registro-de-entidade`, `verificacao-de-alinhamento`, **`verificacao-de-seguranca-de-repo`**, `vigia-de-ecossistema`, + `catalogo.md`. `[VERIFICADO]`
- **Coração da absorção:** `ingestao-de-repositorio/SKILL.md` (6 KB, maestro 8 fases) e `auditoria-de-squad/SKILL.md` (4,4 KB, máquina de diff). `verificacao-de-seguranca-de-repo/SKILL.md` (4,2 KB, gate F2).

### 1.3 Comandos slash (`Caos/.claude/commands/`)

`absorver.md` (28 linhas — dispara o pipeline), `caos.md`, `squad.md`, `vigia.md`. `[VERIFICADO]`

### 1.4 Reflexos/hooks (`Caos/.claude/reflexos/` + `settings.json`)

`bloqueio-de-quarentena.sh` (PreToolUse/Bash — **bloqueia execução sob quarentena**), `pre-ferramenta.sh` (PreToolUse/Bash), `pos-escrita.sh` + `marca-trabalho.sh` (PostToolUse/Write|Edit), `encerramento-aprendizado.sh` (Stop), `inicio-sessao.sh` + `verificacao-diaria.sh` (SessionStart). Registrados em `settings.json`. `[VERIFICADO]`

### 1.5 Dados / ledgers (`Caos/dados/`)

`catalogo-de-padroes.yaml`, `catalogo-de-roteamento.yaml`, `estado-da-arte.md`, `padroes-aprendidos.yaml`, `registro-de-entidades.yaml`, **`repositorios-absorvidos.yaml`** (o ledger de absorção). `[VERIFICADO]`

### 1.6 Registros (`Caos/registros/`)

`aprendizado.log`, `historico.md`, `ultima-verificacao.md`, `vigia/.gitkeep`. **`registros/absorcao/` NÃO EXISTE** — embora o pipeline mande gravar `registros/absorcao/<repo>/seguranca.md`, `inventario-de-capacidades.md`, `mapa-de-decisao.md` (ingestao F2/F3/F4). `[VERIFICADO]` — diretório ausente confirmado por `find`.

### 1.7 Staging / quarentena (`Caos/_staging/quarentena/`)

Um único repo absorvido: `coreyhaines31--marketingskills@8bfcdff/` (382 arquivos, `.git` removido, `_procedencia.md` presente). `[VERIFICADO]`

## 2. Hermes (`C:\Kolden\Hermes\`)

Runtime Python vendorizado (Nous Research): `cli.py`, `hermes/`, `agent/`, `gateway/`, `toolsets.py`, `AGENTS.md`, `docker-compose*.yml`, etc. `[VERIFICADO]`
- **Menciona absorção/ingestão/quarentena?** `grep -niE "absor|ingestao|repositorios-absorvidos|quarentena"` em `Hermes/AGENTS.md` e `Hermes/CLAUDE.md` → **0 ocorrências**. `[VERIFICADO]`
- O CAOS menciona Hermes apenas como (a) nome mitológico no catálogo, (b) **camada de runtime/REUSE** a checar antes de vendorizar (`Caos/agent-memory/caos.md:24`), (c) ponto de extensão de squads (`dados/registro-de-entidades.yaml`). **Hermes não é etapa do pipeline de absorção.** `[VERIFICADO]`

## 3. Termos-gatilho ("repositório/clone/absorver/integrar/GitHub")

| Arquivo | Papel na absorção |
|---|---|
| `Caos/CLAUDE.md` §"Pipeline de Absorção" | descreve F0–F7 | `[VERIFICADO]`
| `Caos/constituicao.md` Art. VIII (l.117-135) | regras invioláveis da absorção | `[VERIFICADO]`
| `Caos/.claude/skills/ingestao-de-repositorio/SKILL.md` | maestro 8 fases | `[VERIFICADO]`
| `Caos/.claude/skills/auditoria-de-squad/SKILL.md` | diff repo×squad (F5) | `[VERIFICADO]`
| `Caos/.claude/skills/verificacao-de-seguranca-de-repo/SKILL.md` | gate F2 | `[VERIFICADO]`
| `Caos/.claude/commands/absorver.md` | comando de entrada | `[VERIFICADO]`
| `Caos/.claude/agents/auditor-de-seguranca.md` | subagente do gate F2 | `[VERIFICADO]`
| `Caos/.claude/reflexos/bloqueio-de-quarentena.sh` | trava determinística de execução | `[VERIFICADO]`
| `Caos/dados/repositorios-absorvidos.yaml` | ledger | `[VERIFICADO]`

## Fechamento do censo

- **Total de arquivos de definição diretamente relevantes à absorção:** 9 (listados em §3) + o repo de teste em quarentena (382 arquivos).
- **O que NÃO consegui acessar / não existe:**
  - `Caos/registros/absorcao/**` — **diretório inexistente** (artefatos de auditoria da absorção nunca persistidos). `[VERIFICADO]`
  - `Caos/nucleo/orquestrador.py` e demais módulos do runtime — **não existem** (ARQUITETURA.md é esboço declarado). `[VERIFICADO]`
  - Conteúdo integral dos 382 arquivos do repo de teste — li amostra de alto sinal (AGENTS.md, REGISTRY.md, copywriting/SKILL.md) + contagens estruturais; **não li os 382 um a um** → marcado onde a conclusão depende disso.
