# Briefing de execução — claude-mem como infra Kolden OS

- **Slug:** thedotmack--claude-mem · **SHA:** 3fe0725a · **Decisão:** ADAPT + INFRA
- **Decidido em:** 2026-06-28 pelo Ronan (item 3 do diagnóstico do Hermes-Chief)
- **Esta NÃO é tarefa do Caos** — é projeto de infra do Kolden OS (`kolden/claude-mem/`), análogo ao LobeHub. O Caos só entra na faixa ADAPT-de-padrões para os squads (faixa 2 abaixo).
- **Plan-mode obrigatório** antes de qualquer escrita em `kolden/claude-mem/` (CLAUDE.md §6).

## Por que se decidiu por infra (não só ADAPT)

A memória atual da Kolden é estática: cada agente escreve `MEMORY.md` no fim da sessão via `ritual-de-encerramento`. Para 246 agentes, a busca é grep, não semântica, e a captura só acontece no encerramento (perde contexto intermediário).

O `claude-mem` traz arquitetura fundamentalmente diferente: **captura por hook → compressão por SDK → storage híbrido SQLite-FTS5 + Chroma → reinjeção semântica**. Adotar só os padrões (sem o daemon) é ganho marginal — o salto está no runtime.

## Frentes paralelas

### Frente 1 — Stack INFRA `kolden/claude-mem/` (WSL)

**Local:** ambiente WSL2 (`/home/kolden/kolden/claude-mem/`), conforme arquitetura declarada em CLAUDE.md §2/§3. **Não é Windows.**

**Serviços (proposta inicial — refinar no plan-mode):**

| Container          | Imagem (fork Kolden)                | Portas (host)         | Persistência            | Função                                              |
|--------------------|-------------------------------------|-----------------------|-------------------------|------------------------------------------------------|
| claude-mem-daemon  | (build local, base `oven/bun:1`)    | `37700` (worker)      | volume `cmem_state`     | Captura via hook, supervisão de workers              |
| claude-mem-viewer  | (build local)                       | `37777` (viewer)      | —                       | UI de inspeção das memórias                          |
| claude-mem-storage | (volume; usa SQLite-FTS5 do daemon) | —                     | bind `./claude-mem/data` | Storage local + índices FTS                         |
| claude-mem-chroma  | `chromadb/chroma:latest`            | `8000` (rede interna) | volume `chroma_data`    | Embeddings/recuperação semântica                     |

**Naming:** prefixo `claude-mem-` (padrão `<stack>-<serviço>` da CLAUDE.md §4).
**Bind:** todas as portas em `127.0.0.1` (regra inegociável §5.3).
**Network:** bridge própria `cmem-network`; não compartilhar com `lobe-network` no início (isolar até estabilizar).

### Sanitização obrigatória do fork

Antes de buildar a imagem `kolden/claude-mem-daemon`:

1. **Remover telemetria PostHog** — arrancar `src/npx-cli/commands/telemetry.ts`, todo o `posthog-js`/`posthog-node` do `package.json`, e o plano `plans/2026-06-09-opt-in-posthog-telemetry.md`. Substituir por no-op. (Achado de segurança: `seguranca.md` linha 15 — viola soberania.)
2. **Não invocar instalador externo** — README cita `curl install.cmem.ai/openclaw.sh | bash` (linha 16 do `seguranca.md`); ignorar — buildamos local.
3. **Reescrever shim minificado** — `plugin/.mcp.json:8` tem JS minificado inline; reescrever legível antes de empacotar (achado linha 18).
4. **Manter `<private>` tags** — padrão de privacidade do upstream (linha 22); herdar como regra Kolden.
5. **Worker HTTP bind 127.0.0.1** — já é o default upstream (linha 19), manter.

### Integração com a frota (camada do Caos)

Uma vez a stack rodando, o hook de captura precisa ser injetado em todo agente da Kolden. Isso é o ponto onde o Caos entra:

1. **Skill `captura-de-memoria-semantica`** no `.claude/skills/` global da Kolden — substitui (não remove) o ritual de encerramento manual; ritual passa a ser síntese narrativa por cima das memórias já capturadas.
2. **Reflexo Stop** padronizado em todo agente novo (Caos Fase 5.5): aciona hook do `claude-mem-daemon` via HTTP local antes de fechar.
3. **Skill `mem-search`** disponível por padrão a todo agente (consulta semântica à memória do workspace).
4. **Migração das memórias atuais** (`MEMORY.md` de 246 agentes + `.claude/agent-memory/`) para o storage do daemon — script de import idempotente.

### Frente 2 — 22 ADAPT (skills/padrões nos squads existentes)

Independente da stack subir, os padrões standalone podem ser absorvidos pelos squads conforme `mapa-de-decisao.md`:

- **Dédalo** (G1, G2, G5, G6, G8, G9, G17, G18, G23, G24, G25, G27): pipeline de captura, progressive disclosure, fail-open, dedup por content-hash, mem-search, smart-explore, reconciliação multi-worktree, babysit PR, release semântico, anti-pattern-czar, modos de prompt, restart com backoff.
- **Prometeu** (G10-G13): learn-codebase, make-plan, do (executor por subagentes), pathfinder.
- **Orfeu** (G15, G16): relatório narrativo, digest serial com carry-forward.
- **Liceu** (G14): cérebros filtrados como corpora.
- **Harmonia** (G20): auditoria por 10 princípios de Rams.
- **Caliope** (G21): breakdown didático.
- **Aglaia** (G22): doc→deck.
- **Argos** (G19): clusterização de backlog por causa-raiz.
- **Égide** (G7): tags `<private>` para LGPD.
- **Caos-fábrica** (G26): Contrato de Reporte de Subagente padronizado.

Essas absorções podem rodar via Caos (skill `auditoria-de-squad` benchmark = `_staging/quarentena/thedotmack--claude-mem/`) sem depender da stack subir.

## Ordem proposta de execução

1. **Plan-mode** sobre o esqueleto do `kolden/claude-mem/docker-compose.yml` (com Ronan).
2. **Fork sanitizado** do claude-mem em repositório próprio (`Kolden-Oficial/claude-mem`) — PostHog removido, shim reescrito.
3. **Build local** + smoke test da stack em WSL (curl ao worker:37700).
4. **Reflexo Stop** no agente piloto (escolher 1 squad pequeno — ex.: Aletheia, 8 agentes) e validar captura.
5. **Rollout incremental** para os 23 squads + Prometeu + Caos (com migração das memórias antigas).
6. **Em paralelo:** Caos roda `auditoria-de-squad` para os 22 ADAPT, squad por squad.

## Sinais de pronto

- `docker compose ps` mostra `claude-mem-{daemon,viewer,chroma}` healthy
- `mem-search "X"` em qualquer agente retorna observações de outras sessões
- `MEMORY.md` deixa de ser editado manualmente — vira síntese gerada
- 246 agentes têm reflexo Stop + skill `mem-search` ativos
- `verificacao-diaria.sh` checa health do daemon

## Não-objetivos (desta absorção)

- **Não** ressuscitar o OpenClaw (gateway próprio de Telegram/Discord/Slack do upstream — G28). O Hermes já é nosso runtime de gateways; sobreposição sem ganho.
- **Não** expor o viewer fora de localhost (mesmo padrão do RustFS console).
- **Não** publicar o fork até estabilizar (manter `Kolden-Oficial/claude-mem` privado).
