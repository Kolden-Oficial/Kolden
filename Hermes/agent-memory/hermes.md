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
- Ponte que funciona = **read-and-adopt headless**: `claude -p "Opere como o agente em agents/<chief>.md: leia e adote a persona... PEDIDO: ..."` com cwd no dir do squad. Testado: traffic-chief ativou e roteou certo | 2026-06-20
- Squads nativos Kolden (Caos, Pheme, Aletheia) TÊM `.claude/skills` — ecossistema heterogêneo; catálogo precisa de campo `tipo` (aios | claude-code) por squad | 2026-06-20
- Artefatos da camada (Fase 1): `Hermes/scripts/hermes-chief.SOUL.md`, `Hermes/squads-catalog.yaml`, `Hermes/scripts/invoca-squad.ps1` | 2026-06-20

### Runtime do Hermes
- `SOUL.md` = slot #1 de identidade, lido de `get_hermes_home()/SOUL.md` (= `~/.hermes/SOUL.md`); cron herda (`load_soul_identity=True`, scheduler.py:1752). Hermes atual roda `personality: kawaii` no `config.yaml` | 2026-06-20
- `HERMES_HOME` vazio → default `~/.hermes/` (`C:\Users\Ronan Silva\.hermes\` com config.yaml, cron/, memories/) | 2026-06-20

### Armadilhas (gotchas)
- **PS 5.1 + Write tool**: `.ps1` gravado pelo Write é UTF-8 **sem BOM**; PS 5.1 lê como ANSI e quebra em chars não-ASCII (`─`, acentos). Fix: adicionar BOM com `printf '\xEF\xBB\xBF' | cat - file > file.tmp && mv`. O Edit tool **preserva** BOM existente | 2026-06-20
- Parser YAML caseiro em PS não desfaz escape `\\` de aspas duplas → usar barras normais (`C:/Kolden/...`) no catálogo, funciona em PS e no claude | 2026-06-20
- `claude -p` espera ~3s por stdin → fechar stdin (`$null | & claude @args`) evita a espera em cron/background | 2026-06-20
- `-ExecutionPolicy Bypass` é **bloqueado** pelo classificador de segurança do Claude Code → invocar `.ps1` direto com `& 'caminho'` | 2026-06-20

### Preferências do usuário (Ronan)
- Não instalar mudanças no runtime (SOUL.md, skills, cron) sem aprovação explícita — identidade do Hermes/Nous em produção (atende no WhatsApp) é sensível; oferecer opção de perfil isolado (`HERMES_HOME`) vs substituir persona | 2026-06-20
- Validar o risco central de um plano com teste real **antes** de construir os artefatos (smoke do `@chief` headless veio antes de SOUL/catálogo/script) | 2026-06-20

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras -->
- **PS 5.1 exige BOM UTF-8 em `.ps1` com caracteres não-ASCII (gerados pelo Write tool)** | Origem: Hermes | Detectado: 2026-06-20

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
