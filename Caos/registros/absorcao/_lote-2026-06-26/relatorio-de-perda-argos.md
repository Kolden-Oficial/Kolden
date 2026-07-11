---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Reconciliação F6.5 — relatório de perda (squad **Argos**)

- **Lote:** `_lote-2026-06-26` | **Squad-alvo:** Argos (`C:/Kolden/Argos/`)
- **Repos aplicados:** `perplexityai--modelcontextprotocol`, `kepano--obsidian-skills` (só defuddle), `Lum1104--Understand-Anything` (só busca semântica)
- **Invariante:** `count(ABSORVIDO) + count(DESCARTADO) + count(DIFERIDO/FORA-DE-ESCOPO) == count(IDs candidatos a Argos)` — **PERDIDO = 0**.

## Âncoras aplicadas

| repo | ID | disposicao | destino |
|---|---|---|---|
| perplexityai--modelcontextprotocol | G1 (`perplexity_search`) | ABSORVIDO | `.claude/skills/retriever-sonar/SKILL.md` + `references/sonar.md` |
| perplexityai--modelcontextprotocol | G2 (`perplexity_ask`, sonar-pro) | ABSORVIDO | `.claude/skills/retriever-sonar/SKILL.md` |
| perplexityai--modelcontextprotocol | G3 (`perplexity_research`, deep-research) | ABSORVIDO | `.claude/skills/retriever-sonar/SKILL.md` + `references/sonar.md` |
| perplexityai--modelcontextprotocol | G4 (`perplexity_reason`, reasoning-pro) | ABSORVIDO | `.claude/skills/retriever-sonar/SKILL.md` |
| perplexityai--modelcontextprotocol | G5 (`strip_thinking`) | ABSORVIDO | `retriever-sonar/SKILL.md` + `references/sonar.md` (técnica) |
| perplexityai--modelcontextprotocol | G6 (filtros recency/domínio/context-size) | ABSORVIDO | `retriever-sonar/SKILL.md` + `references/sonar.md` |
| kepano--obsidian-skills | G9 (Defuddle web→markdown) | ABSORVIDO | `.claude/skills/extracao-defuddle/SKILL.md` |
| Lum1104--Understand-Anything | G29 (busca semântica + textual) | ABSORVIDO | `.claude/skills/busca-semantica-no-acervo/SKILL.md` |

Também atualizados (registro de capacidade — Art. IV): `ferramentas.md` (linhas **Perplexity Sonar**
e **Defuddle** + bloco de capacidades transversais) e `.claude/skills/catalogo.md` (3 entradas novas).

## DIFERIDO-INCREMENTAL / FORA-DE-ESCOPO (não aplicado a Argos nesta leva)

Nada perdido — os IDs abaixo dos mesmos repos **não eram alvo do Argos** (pertencem a outros squads
ou estão GATED); ficam registrados aqui para fechar o invariante do ponto de vista do Argos.

**perplexityai--modelcontextprotocol** (IDs de engenharia/distribuição — alvo vendor/Dédalo/Égide, outra onda):
- G7 (parser SSE resiliente) — FORA-DE-ESCOPO: referência de engenharia (vendor); o motor já remonta SSE via GPT-Researcher.
- G8 (`proxyAwareFetch`) — FORA-DE-ESCOPO: receita p/ MCPs próprios (Dédalo).
- G9 (hardening de transporte HTTP) — FORA-DE-ESCOPO: padrão p/ MCP HTTP próprio (Dédalo/Égide).
- G10 (empacotamento plugin/marketplace/server.json) / G11 (validação Zod) — FORA-DE-ESCOPO: REUSE, padrão já conhecido.

**kepano--obsidian-skills** (ecossistema Obsidian/PKM — GATED por decisão estratégica humana):
- G1–G8 (Obsidian Flavored Markdown, Bases, JSON Canvas, Obsidian CLI, dev de plugin) — DIFERIDO-INCREMENTAL:
  GATED pela ressalva de governança do `mapa-de-decisao` (a Kolden não adotou Obsidian); não pertencem ao Argos.
  Reabrir só se/quando a Kolden adotar Obsidian (viram pacote PKM novo ou `referencias/` inertes).

**Lum1104--Understand-Anything** (suíte de compreensão de codebase — alvo Dédalo/Prometeu/vendor, outras ondas):
- G1–G28, G30–G32 — FORA-DE-ESCOPO para Argos: suíte de grafo de conhecimento de código (host Dédalo),
  técnicas de eficiência de token (Prometeu), motor estático + dashboard (vendor). Só **G29** (busca
  híbrida) era aplicável ao acervo do Argos e foi absorvido.

## Contagem

- **Candidatos a Argos** (mapas F4): perplexity G1–G6 (6) + kepano G9 (1) + Lum G29 (1) = **8**.
- **ABSORVIDO:** 8 | **DESCARTADO:** 0 | **DIFERIDO/FORA-DE-ESCOPO (Argos):** 0 dos candidatos.
- **PERDIDO = 0.** ✅ (IDs de outros squads/GATED listados acima por completude, fora da contagem de candidatos a Argos.)

## Notas

- **Sobreposição resolvida:** o motor do Argos já previa retrievers plugáveis (Exa/Tavily/Firecrawl);
  Sonar entra como **mais um backend opt-in**, não substitui nem duplica — fundido na escada existente
  (`argos-engine`), sem criar retriever concorrente. Defuddle entra como degrau LEVE/LOCAL antes do
  Firecrawl, sem colidir com ele.
- **Ressalva de licença:** os 3 repos são **MIT** (uso permitido); extração de princípio + reescrita
  em PT-BR, sem cópia literal; atribuição owner/repo@sha no rodapé de cada SKILL.
- **Ressalva de soberania (registrada na skill e em `ferramentas.md`):** Perplexity Sonar é **vendor
  externo não soberano** — opt-in deliberado, default permanece nas fontes soberanas; proibido enviar
  dados sensíveis. `PERPLEXITY_API_KEY` marcada *(a cadastrar)* em `/kolden/argos`.
- **Provisionamento pendente (não bloqueia):** chave Sonar no Infisical e wiring do `--fontes sonar` no
  `motor/argos-engine.py`/MCP `perplexity` — documentado como "quando provisionado", sem inventar
  capacidade (Art. IV).
