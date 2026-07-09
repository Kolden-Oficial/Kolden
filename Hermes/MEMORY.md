# Memória do Squad Hermes

> **Escopo:** padrões estruturais do SQUAD Hermes (rito das Ondas 2-26).
> **Distinção:** este arquivo NÃO é `agent-memory/hermes.md` (memória do agent-chief). Aquele guarda padrões de execução técnica; este guarda padrões estruturais aprendidos por/sobre o squad como um todo.
> **Publicado:** Onda 2 do METODO Kolden `m-20260706` em 2026-07-06.

## Padrões estruturais do squad (aprendidos na Onda 2)

- **Squad vendorizado tem 2 camadas naturais** — vendor herdado (código + docs + skills EN) + camada Kolden (CLAUDE.md + PRD + constituition + squad.yaml + MEMORY + `.claude/`). Ambas coexistem se a fronteira for declarada. Padrão canônico para todo squad que nasceu como fork de repositório externo | 2026-07-06 Onda 2
- **Camada 2 do sistema tem tier_1 vazio por design** — Hermes coordena os 23 SQUADS via `squads-catalog.yaml`, não via especialistas internos tier-1. O `squad.yaml` declara `tier_1.agents: []` com nota explicativa. Divergência canônica: Camada 2 é orquestração cross-squad, não squad especializado | 2026-07-06 Onda 2
- **`camada-2-contrato.md` é fonte-da-verdade do protocolo Camada 2** — DoR (Definition of Ready) + matriz de risco 3 faixas (verde/amarelo/vermelho) + subida/descida + gate `gate-de-subida.sh`. Documento existente antes desta onda; ratificado como canônico | herdado, ratificado 2026-07-06
- **`squads-catalog.yaml` é fonte-da-verdade do dispatch** — 23 squads catalogados com `keywords` + `muda_algo` + `chief_file` + `dir`. O Hermes lê em runtime, casa com a intenção do Ronan, dispatch via `invoca-squad.ps1`. Não é catálogo do próprio Hermes; é catálogo do que Hermes coordena | herdado, ratificado 2026-07-06
- **Wrappers proprietários de "runtime bidirecional" são exceção constitucional Art. IV** — Discord/Slack/Telegram/WhatsApp/Google Chat + Baileys + gateway auto-start Windows. MCP spec 2024 (JSON-RPC request-response) não modela event streams bidirecionais. Categoria constitucional própria (emenda pendente Onda 6). 15 dos 22 wrappers da Sub-onda 1.3 do Caos vivem aqui | 2026-07-06 Onda 2

## Padrões de dogfooding do rito (padrões consolidados)

- **Fan-out 0/3 confirmado 7x consecutivas** (Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Contrato-mãe m-20260706 + Onda 2 Hermes). Quando artefatos são interdependentes cross-arquivo (procedência + coerência estilística), autor único produz melhor. Regra migrada para METODO §8 "Regra do fan-out" — TETO, não obrigação | 2026-07-06 Onda 2
- **5 artefatos padronizados por onda** — matriz-de-conformidade.md + achados.jsonl + diff-cirurgico.md + verificacao-dike.md + sumario-executivo.md em `<Squad>/registros/metodo-onda-<N>/`. Anatomia canônica confirmada 7x | 2026-07-06 Onda 2
- **G7 sessão dedicada por onda** — nunca duas Ondas na mesma sub-sessão. Onda 2 rodou em `C:\Kolden\Hermes\` desde início. G7 vale independente de squad-alvo | herdado, ratificado 2026-07-06

## Fronteira externa×Kolden (candidato emenda METODO)

- **Squad vendorizado é caso canônico** — Hermes é o primeiro exemplo padronizado. Fronteira declarada em CLAUDE.md §Fronteira + `squad.yaml.fronteira_vendor_nous`. Vendor Nous preservado intocado (código Python + docs EN + 19 skills EN + Dockerfile + pyproject.toml). Candidato emenda METODO §5 ou §8 na v1.1 | 2026-07-06 Onda 2
- **`AGENTS.md` interno vendor NÃO é o mesmo que `C:\Kolden\AGENTS.md`** — o interno é dev guide técnico Nous EN (27502 tokens). O raiz Kolden é o índice de 26 squads. Fronteira semântica: os 2 arquivos coexistem sem colisão. Padrão para todo squad vendorizado com AGENTS.md próprio | 2026-07-06 Onda 2

## Handoff canônico

- **Descida:** `@Olimpo` (Zeus/Camada 3) via `invoca-squad.ps1 -Squad olimpo`. Preenche `zeus.diagnostico` + `zeus.decomposicao` + roteia aos executivos.
- **Subida:** `@Dike` (esqueleto em `C:\Kolden\Dike\`; nascimento pendente). Papel executado temporariamente por `caos-chief` ou `hermes-chief` (independente do produtor) com 3 salvaguardas.
- **Dispatch direto:** 23 squads em `squads-catalog.yaml`. Para pergunta ou relatório sem missão (não força Contrato).

## Cadastros de fronteira (fora do escopo Kolden — vendor Nous)

- Código Python runtime: `agent/`, `hermes_cli/`, `providers/`, `plugins/`, `acp_adapter/`, `codex_runtime/`.
- Docs vendor: `README.md`, `README.zh-CN.md`, `README.ur-pk.md`, `AGENTS.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE`, `MANIFEST.in`.
- Deploy vendor: `Dockerfile`, `docker-compose*.yml`, `flake.nix`, `pyproject.toml`, `setup.py`.
- 19 skills EN: `skills/apple/`, `skills/autonomous-ai-agents/`, `skills/creative/`, `skills/data-science/`, `skills/devops/`, `skills/dogfood/`, `skills/email/`, `skills/github/`, `skills/index-cache/`, `skills/media/`, `skills/mlops/`, `skills/note-taking/`, `skills/productivity/`, `skills/research/`, `skills/smart-home/`, `skills/social-media/`, `skills/software-development/`, `skills/yuanbao/`.

---

*MEMORY.md Hermes v1.0 — canônico Kolden. Publicado pela Onda 2 do METODO 2026-07-06. Padrões estruturais do squad. Distinto de `agent-memory/hermes.md`. Backup por versão semântica (não por data) — só bump v1.0 → v1.1 quando surgirem padrões novos.*
