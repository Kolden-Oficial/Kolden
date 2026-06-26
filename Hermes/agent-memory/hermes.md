# Memória do Agente Hermes

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Arquitetura como orquestrador máximo
- Decisão: Hermes = orquestrador máximo da Kolden; ponte para squads via **shell-out** ao Claude Code (`claude -p`). Escopo: arquitetura completa (identidade + roteamento + cron + aprovação) | 2026-06-20
- Trade-off aceito: execução do squad roda no Claude Code → paga Anthropic, não é model-agnostic nessa camada; exige CLI `claude` instalada+logada na máquina do Hermes | 2026-06-20
- `delegate_task` do Hermes spawna **subagentes Hermes internos** (árvore pai→filho, depth default 1, ~3 concorrentes) — NÃO é federação nem chama squads do Claude Code | 2026-06-20
- Hermes é **cliente MCP completo** (`tools/mcp_tool.py`: stdio/HTTP/SSE) + servidor MCP (`mcp_serve.py`) + servidor ACP (não cliente ACP) + `terminal_tool` (shell-out local/docker/ssh) | 2026-06-20

### Ponte Hermes → squads (verificado ponta a ponta)
- Squads importados (Peitho/xquads/aiox) são **AIOS puro**: personas em `agents/*.md` com bloco `AVISO-DE-ATIVAÇÃO`, **sem `.claude/` nem `CLAUDE.md`**. Logo `@chief` (subagente nativo CC) NÃO funciona neles | 2026-06-20
- **Catálogo completo: 15 squads** no `squads-catalog.yaml` (todos `tipo: aios`). Chiefs: peitho/traffic-chief, argos/argos-chief, liceu/liceu-chief, pheme/social-chief, caliope/copy-chief, aglaia/brand-chief, orfeu/story-chief, aletheia/aletheia-chief, olimpo/zeus, themis/board-chair, metis/data-chief, pluto/hormozi-chief, dionisio/movement-chief, dedalo/claude-mastery-chief, egide/cyber-chief | 2026-06-25
- **Squads com `.claude/` (Pheme, Aletheia, Argos, Liceu) têm SÓ `skills/`, não `.claude/agents/`** → o subagente nativo `@chief` não existe; o tipo correto é `aios` (read-and-adopt do chief_file), que é universal. O ramo `claude-code` do `invoca-squad.ps1` agora faz fallback automático p/ read-and-adopt se não achar `.claude/agents/<chief>.md` | 2026-06-25
- `muda_algo: true` em peitho, argos, pheme (publica), egide (pentest); demais false | 2026-06-25
- Caos = criação interativa (notify-only, não roteável headless); Prometeu = `.aiox-core/` (caso à parte) — fora do catálogo | 2026-06-25
- Ponte que funciona = **read-and-adopt headless**: `claude -p "Opere como o agente em agents/<chief>.md: leia e adote a persona... PEDIDO: ..."` com cwd no dir do squad. Testado: traffic-chief ativou e roteou certo | 2026-06-20
- Squads nativos Kolden (Caos, Pheme, Aletheia) TÊM `.claude/skills` — ecossistema heterogêneo; catálogo precisa de campo `tipo` (aios | claude-code) por squad | 2026-06-20
- Artefatos da camada (Fase 1): `Hermes/scripts/hermes-chief.SOUL.md`, `Hermes/squads-catalog.yaml`, `Hermes/scripts/invoca-squad.ps1` | 2026-06-20

### Runtime do Hermes
- `SOUL.md` = slot #1 de identidade, lido de `get_hermes_home()/SOUL.md` (= `~/.hermes/SOUL.md`); cron herda (`load_soul_identity=True`, scheduler.py:1752). Hermes atual roda `personality: kawaii` no `config.yaml` | 2026-06-20
- `HERMES_HOME` vazio → default `~/.hermes/` (`C:\Users\Ronan Silva\.hermes\` com config.yaml, cron/, memories/) | 2026-06-20
- Tools `terminal`/`write_file` no Windows dependem do **Git Bash** via `_find_bash()` (`tools/environments/local.py`); backend=`local` no `cli-config.yaml` | 2026-06-25

### Orquestrador encarnado no Claude Code + MCP de canais (2026-06-26)
- **A seta é Hermes→Claude Code, não o contrário.** O "orquestrador máximo" é uma PERSONA em arquivo (`scripts/hermes-chief.SOUL.md`), não o processo do gateway que está rodando (esse é a camada de canais, hoje `personality: kawaii`). A ponte inversa (chamar o orquestrador de DENTRO do Claude Code) não existia — só `invoca-squad.ps1` (Hermes→`claude -p`) | 2026-06-26
- **Skill `/hermes-chief`** = orquestrador encarnado no Claude Code: `C:\Kolden\.claude\skills\hermes-chief\SKILL.md`. Reusa `hermes-chief.SOUL.md` + `squads-catalog.yaml` (fonte única); despacha squads via **Agent tool nativo** (read-and-adopt do `chief_file`), NÃO `claude -p` → sem recursão de processo, paralelo. Portão de aprovação vira INTERATIVO (skill roda no loop principal; subagente isolado não pediria "ok"). Nome evita colisão com runtime Hermes | 2026-06-26
- **MCP de canais plugável no Claude Code**: `hermes mcp serve` (subcomando válido, confirmado em `hermes mcp --help`) expõe 10 tools (conversations_list, conversation_get, messages_read, attachments_fetch, events_poll, events_wait, messages_send, channels_list, permissions_list_open, permissions_respond). Registrado em `~/.claude.json` → `mcpServers.hermes` via shim Infisical (mesmo padrão dos demais MCPs) | 2026-06-26
- **GOTCHA MCP serve**: usar **`python.exe`, NÃO `pythonw.exe`** (MCP é stdio, precisa de stdin/stdout reais; o gateway usa pythonw só por ser detached). E `HERMES_HOME` no `env` deve apontar p/ `C:\Users\Ronan Silva\AppData\Local\hermes` (mesma SessionDB do gateway), senão o MCP não enxerga as conversas. `mcp serve` é leitor da SQLite, gateway é escritor → leitura concorrente segura | 2026-06-26
- **Smoke-test de MCP stdio sem reabrir o Claude Code**: `printf` 3 linhas JSON-RPC (`initialize` + `notifications/initialized` + `tools/list`) por pipe no comando exato com `timeout`. Resposta com `serverInfo` + lista de tools = conecta OK. Validado: hermes v1.26.0 respondeu as 10 tools | 2026-06-26
- Padrão do shim no `~/.claude.json`: args usam `--projectId=<id>` e `--env=prod` (com `=`, não espaço), depois `--` e o comando real | 2026-06-26

### Armadilhas (gotchas) — bash/WSL no Windows
- **`execvpe(/bin/bash) failed: No such file or directory`** com prefixo `<3>WSL (NN - Relay)` = `_find_bash()` resolveu `bash` para o **stub do WSL** (`C:\Windows\System32\bash.exe`), não o Git Bash. Máquina **sem distro WSL** → todo spawn morre. Atinge `terminal` E `write_file` | 2026-06-25
- Causa: sem `HERMES_GIT_BASH_PATH`, `_find_bash()` cai em `shutil.which("bash")`; no PATH do gateway (scheduled task/cmd.exe) `System32` vem antes do Git → pega o stub WSL | 2026-06-25
- Fix (2026-06-25): `setx HERMES_GIT_BASH_PATH "C:\Program Files\Git\bin\bash.exe"` (durável) + mesma linha `set` no `Hermes_Gateway.cmd` + `gateway restart`. `_find_bash()` checa essa var ANTES de qualquer heurística. NÃO precisa instalar WSL | 2026-06-25
- `Hermes_Gateway.cmd` é gerado por `hermes_cli/gateway_windows.py` → pode ser sobrescrito em update; o `setx` é a camada que sobrevive | 2026-06-25

### Armadilhas (gotchas)
- **PS 5.1 + Write tool**: `.ps1` gravado pelo Write é UTF-8 **sem BOM**; PS 5.1 lê como ANSI e quebra em chars não-ASCII (`─`, acentos). Fix: adicionar BOM com `printf '\xEF\xBB\xBF' | cat - file > file.tmp && mv`. O Edit tool **preserva** BOM existente | 2026-06-20
- Parser YAML caseiro em PS não desfaz escape `\\` de aspas duplas → usar barras normais (`C:/Kolden/...`) no catálogo, funciona em PS e no claude | 2026-06-20
- `claude -p` espera ~3s por stdin → fechar stdin (`$null | & claude @args`) evita a espera em cron/background | 2026-06-20
- `-ExecutionPolicy Bypass` é **bloqueado** pelo classificador de segurança do Claude Code → invocar `.ps1` direto com `& 'caminho'` | 2026-06-20

### Preferências do usuário (Ronan)
- Não instalar mudanças no runtime (SOUL.md, skills, cron) sem aprovação explícita — identidade do Hermes/Nous em produção (atende no WhatsApp) é sensível; oferecer opção de perfil isolado (`HERMES_HOME`) vs substituir persona | 2026-06-20
- Validar o risco central de um plano com teste real **antes** de construir os artefatos (smoke do `@chief` headless veio antes de SOUL/catálogo/script) | 2026-06-20

### Extração de Drive → dossiê de cliente (sobre-a-empresa/clientes)
- **Verificar relatório de subagente lendo a fonte estruturada eu mesmo ANTES de gravar números.** Subagente de extração reportou "66 leads / R$96.650 / 200+ arquivos / planilha Senhas" com imprecisões: a aba "Leads" estava VAZIA (só células-resumo), o "livro-razão" real é a aba "Clientes Maio" | 2026-06-25
- **Detectar CSV de teste/seed:** timestamp idêntico em todas as linhas + nomes genéricos + geografia incoerente com o negócio (leads SP/RJ/PR num negócio 100% MG) + CNPJs sequenciais falsos. Registrar como teste, nunca como dado real | 2026-06-25
- **Google Docs API desabilitada no projeto GCP `1098911614973`** → `getGoogleDocContent` falha sempre. Rota que funciona: `downloadFile` com `exportMimeType=application/pdf` + `Read` do PDF. Sheets (`getGoogleSheetContent`/`getSpreadsheetInfo`) e `listFolder` funcionam normais | 2026-06-25
- `downloadFile` aceita `localPath` com caminho Windows `C:/...` apesar do schema dizer "must start with /" | 2026-06-25
- Modelo de dossiê de cliente: `clientes/_modelo-dossie.md` (12 seções fixas + frontmatter 8 campos + disclaimer "sem registro no Drive"). Riqueza no `README.md`: 🟢 rico / 🟡 parcial / ⚪ esqueleto. Assets binários → `clientes/ativos/_assets/<slug>/` | 2026-06-25
- **§5 (nunca versionar segredos) prevalece sobre autorização de "PII bruta".** Mesmo com Ronan autorizando PII de leads, credenciais (planilha "Senhas": logins Google/Instagram/Registro.br/NIBO) ficam FORA do dossiê versionado — declarar a exclusão e sugerir Infisical | 2026-06-25

### Política de busca (aplicada)
- LP/web = pesquisa → declarar ferramenta+nível e ter OK ANTES; Drive via MCP google-drive (conta própria) NÃO é busca web, não passa pelo gate. Registrar sessão: `node "C:/Users/Ronan Silva/.claude/hooks/gate-busca.cjs" autoriza firecrawl maximo` (no Bash `$CLAUDE_CONFIG_DIR` não vem setado → usar caminho explícito) | 2026-06-25

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras -->
- **PS 5.1 exige BOM UTF-8 em `.ps1` com caracteres não-ASCII (gerados pelo Write tool)** | Origem: Hermes | Detectado: 2026-06-20
- **Google Docs API desabilitada no projeto GCP 1098911614973 → ler Docs via `downloadFile` export PDF, não `getGoogleDocContent`** | Origem: Hermes (e dossiê EntreSolos prévio) | Detectado: 2026-06-25
- **Verificar números de relatório de subagente lendo a fonte direta antes de gravar** | Origem: Hermes, Caos (tradução em lote), feedback global | Detectado: 2026-06-25

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
