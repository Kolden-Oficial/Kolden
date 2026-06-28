---
name: reflexos-resilientes-e-bootstrap
description: Use ao escrever ou revisar reflexos (hooks) do Claude Code — SessionStart, PostToolUse, UserPromptSubmit, Stop — e ao desenhar como o agente descobre/injeta suas próprias skills e memória no contexto. Aciona em "cria um hook", "reflexo que dispara quando", "persistir modo entre turnos", "bootstrap de skills na sessão", "memória automática por hook", "por que o hook travou o Claude". Traz as leis de resiliência (fail-open, dedup por hash, divulgação progressiva) que impedem um reflexo de quebrar o host. NÃO use para a lógica de negócio do que o hook chama (isso é da skill-dona).
---

# Reflexos Resilientes e Bootstrap de Skills

Padrões para escrever reflexos do Claude Code que **nunca derrubam o host**, persistem estado de
sessão, alimentam memória automaticamente e injetam as skills certas no contexto. É o domínio do
`hooks-architect` (Latch) e do `config-engineer` (Sigil). Aqui não mora a lógica de negócio do
reflexo — mora a **disciplina** que faz um hook ser seguro.

## Leis de resiliência (invioláveis para todo reflexo)

1. **Fail-open — o hook NUNCA bloqueia o host.** Se a lógica do reflexo falhar (erro, timeout,
   dependência ausente), ele **degrada graciosamente** e deixa a ação do usuário seguir. Um hook de
   memória/telemetria que quebra a sessão é pior que não ter hook. (Exceção: reflexos de **segurança**
   que devem mesmo *negar* — esses falham fechado por design e são explícitos.)
2. **Dedup por content-hash com janela temporal.** Antes de gravar (memória, log, evento), calcule
   o hash do conteúdo; se já gravou o mesmo hash dentro da janela, **não duplique**. Evita inflar
   memória/log com repetição.
3. **Divulgação progressiva (3 camadas).** Não despeje tudo de uma vez. Camada 1 = busca/índice
   enxuto; camada 2 = timeline/resumo; camada 3 = `get_observations`/detalhe sob demanda. O agente
   paga tokens só pela profundidade que precisa.
4. **I/O hardenizado** ao escrever flags/estado: escrita atômica (temp + rename), permissão restrita
   (0600), proteção contra symlink (`O_NOFOLLOW`), whitelist de paths e cap de bytes. O hardening
   completo é domínio do **Egide** (`escrita-segura-e-dlp`) — todo reflexo que escreve estado o herda.

## Captura automática de memória (padrão, sem o runtime pesado)

O salto sobre o `ritual-de-encerramento` manual é capturar aprendizado **por hook**, automaticamente,
em vez de depender de o agente lembrar de escrever no fim. O **padrão** que a Kolden absorve:
hook captura evento → dedup por hash → grava observação → reinjeta sob consulta (divulgação
progressiva). 

> **Fronteira (importante):** o **core de memória** (daemon, SQLite-FTS5, Chroma, worker HTTP,
> viewer) é **infra do Kolden OS**, não habilidade de squad — decisão de arquitetura do Ronan, fora
> desta absorção. Aqui ficam só os **padrões de hook**. Telemetria de terceiro (PostHog) fica fora
> em qualquer caso.

## Persistência de modo entre turnos

Estado de sessão (ex.: o modo da `brevidade-de-saida`) persiste via **flag-file**:
- **SessionStart** ativa/lê a flag; **UserPromptSubmit** rastreia mudança de modo por linguagem
  natural ou slash; **statusline** mostra o modo ativo; reforço por turno reescreve a flag.
- Flag escrita com o I/O hardenizado da Lei 4.

## Reflexos de update/staleness (opt-in, com gate)

Padrões úteis para a `compreensao-de-codebase`:
- **PostToolUse** que, ao detectar `git commit/merge`, dispara update incremental do grafo.
- **SessionStart** que compara o hash do grafo com o `HEAD` e sinaliza grafo **stale**.

> **Gate Kolden:** absorver **removendo** a diretiva "sem confirmação" do original. A Kolden não
> auto-atualiza nem dispara trabalho pesado sem gate — o reflexo **avisa**; a ação é confirmada.

## Bootstrap de skills (regra do 1%)

Como o agente descobre e usa suas próprias skills:
- **Regra do 1%:** se há ≥1% de chance de uma skill se aplicar, **invoque-a** (custa pouco checar,
  custa caro pular a skill certa).
- **Ordem de prioridade:** instruções do usuário > skills > sistema.
- **Reflexo SessionStart de bootstrap:** injeta o gateway de skills no contexto a cada início/clear/
  compact, emitindo o campo certo por harness (Claude Code / Cursor / Copilot diferem).
- Casa com a SDO (description = só "quando usar") — ver a habilidade de criação de skills do Caos.

---
*Fontes: thedotmack/claude-mem@3fe0725a (fail-open, dedup por content-hash, divulgação progressiva em 3 camadas, captura de memória por hook — **só os padrões**; Apache-2.0, thedotmack) + JuliusBrussee/caveman@25d22f864 (persistência de modo via flag-file, ativação NL/slash, I/O symlink-safe; MIT) + obra/superpowers@896224c4 (bootstrap regra-do-1%, ordem de prioridade, SessionStart skill-gateway multi-harness; MIT, Jesse Vincent) + Lum1104/Understand-Anything (reflexos PostToolUse auto-update e SessionStart staleness; MIT). Princípios extraídos e reescritos em PT-BR; sem cópia literal. Core de memória = infra Kolden OS (não absorvido como skill); I/O hardening e DLP roteados ao Egide; PostHog removido.*
