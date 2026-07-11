---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/auditoria/2026-06-28-vistoria-v2/_indice|_indice]]"
---

# 00 — Carta de exceções estruturais (anti-falso-positivo)

> Lista canônica do que **NÃO** é defeito nesta auditoria, com evidência de cada exceção.
> Qualquer achado que caia nesta carta volta para revisão — não entra no JSONL como defeito.

## Exceções confirmadas (verificadas arquivo:linha)

### EX-01 — Dedalo usa `config.yaml`, não `squad.yaml`
- **Por quê:** decisão estrutural herdada do framework AIOX absorvido (`name: claude-code-mastery`, `version 1.0.0`).
- **Evidência:** `C:\Kolden\Dedalo\config.yaml:1-9`.
- **Implicação:** verificadores que esperam `squad.yaml` devem aceitar `config.yaml` como manifesto equivalente para Dedalo.

### EX-02 — Liceu sem pasta `workflows/`
- **Por quê:** o Liceu disseca "cérebros de especialistas" (acervo indexado por referência); não instancia agentes em workflow operacional clássico — funciona como biblioteca.
- **Evidência:** `Liceu/agents/*.md` retorna 9 arquivos; pasta `workflows/` ausente.
- **Implicação:** ausência de `workflows/` no Liceu **não conta** como B-liveness defeito.

### EX-03 — Prometeu com agentes em `.aiox-core/development/agents/`
- **Por quê:** base vendorizada `@aiox-squads/core`, importada como framework.
- **Evidência:** `Prometeu\.aiox-core\development\agents\*.md` (12 arquivos).
- **Implicação:** o Glob padrão `*\agents\*.md` não pega Prometeu; auditoria precisa do path explícito.

### EX-04 — Caos com agentes em `.claude/agents/`
- **Por quê:** Caos é a **fábrica** do Claude Code, usa o caminho nativo do Claude para subagentes.
- **Evidência:** `Caos\.claude\agents\*.md` (9 arquivos).
- **Implicação:** mesma observação de EX-03.

### EX-05 — Hermes sem agentes Kolden nativos
- **Por quê:** runtime **vendorizado da Nous Research** (`hermes-agent`); papel de camada 2 do sistema hierárquico, mas implementação é runtime, não squad. Lastro do papel está em script + protocolo MD.
- **Evidência:** `C:\Kolden\Hermes\camada-2-contrato.md:1-97` (descreve o papel); `Hermes\camada-2-contrato.md:20-23` referencia `Hermes/scripts/abre-missao.sh` (sealer determinístico).
- **Implicação:** ausência de `Hermes/agents/` **não** é defeito. **Mas** dependência de runtime vendorizado para uma camada-chave é o achado **K-H2** (MÉDIO) — registrado em `02-hipoteses.md`.

### EX-06 — Dike sem `agents/`
- **Por quê:** Dike é papel verificador; reflexo determinístico (`gate-de-subida.sh`), não agente conversacional.
- **Evidência:** Glob `Dike\agents\*.md` vazio; `Dike\.claude\reflexos\gate-de-subida.sh` referenciado em `Hermes/camada-2-contrato.md:74`.
- **Implicação:** Dike não entra na contagem de agentes (consistente com CLAUDE.md §10 linha 185).

### EX-07 — Zeus em "2 degraus" (camada 3 + camada 4) é design intencional
- **Por quê:** declarado explicitamente em `Olimpo/agents/zeus.md` como `cargo: CEO` (camada 4) + `routing_triggers` + `orchestrates 7 executivos` (camada 3).
- **Evidência:** `Olimpo\agents\zeus.md:11` (`cargo: "CEO"`), `:18` (`routing_triggers`), `:184-198` (`orchestrates`).
- **Implicação:** colapso camada-3/camada-4 **não é** ambiguidade — é um único Zeus que faz ambos. Achado registrado como **K-H1** (BAIXO, transparência) — não CRÍTICO.

### EX-08 — Squads-semente em estrutura mínima
- **Por quê:** os 6 semente (Nomos, Pactolo, Êmporos, Héstia, Ananke, Cairós) foram criados em **2026-06-28** sem passar pelo Ritual completo de 9 fases do Caos (PRD detalhado, herança histórica, reflexos materializados). Cada um declara `status: semente` no `squad.yaml`.
- **Evidência:** `Hestia\squad.yaml:12` (`status: semente`), `Pactolo\squad.yaml:11` (`status: "semente-do-lote-2026-06-26"`), `Cairos\squad.yaml:11`, `Nomos\squad.yaml:12`, `Emporos\squad.yaml:11`, `Ananke\squad.yaml:12` (todos com nota "refino pelo Ritual do Caos pendente").
- **Implicação:** ausência de PRD detalhado, ausência de Ritual de 9 fases, vetos ainda em prosa (sem reflexo materializado), origem documentada como "lote-2026-06-26" → tudo isso vai para a **matriz de maturidade**, **separada do placar de defeitos**.
- **Exceção da exceção:** o status `semente` **não** absolve o squad de ter `routing_triggers` recebidos de um executivo do Olimpo. Esse é o achado **K-H3** (CRÍTICO), tratado no Passo 4.

### EX-09 — Paths fora do escopo da frota
Glob/Grep excluem obrigatoriamente:
- `.claude/_staging/**` — clones temporários (xquads, aiox-core importação)
- `Hermes/.venv/**` — venv Python do runtime Nous
- `Hermes/optional-skills/**` — skills opcionais do runtime
- `Hermes/node_modules/**`
- `Caos/_staging/**` — quarentena de repos absorvidos
- `Argos/motor/.venv/**` — venv Python do motor de scraping
- `**/.git/**`
- `**/tests/unit/squad/fixtures/**` (Prometeu) — fixtures de teste, não agentes

## Regra de operação
Antes de marcar qualquer achado nas classes A (config), B (liveness), C (hierarquia), confirmar que **não** se enquadra em EX-01..EX-09. Se enquadrar, descartar e registrar como "exceção observada" no relatório do squad.
