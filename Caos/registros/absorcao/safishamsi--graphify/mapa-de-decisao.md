# Mapa de decisão (F4) — safishamsi--graphify

- **slug:** safishamsi--graphify · **sha:** 8994b550 · **rota:** A
- Comparação contra `dados/registro-de-entidades.yaml` e squads existentes. Viés autônomo: sem match limpo → **ADAPT/CREATE** (nunca REUSE sem prova item-a-item).
- **Contexto de match:** não há no registro nenhuma entidade de "grafo de conhecimento de codebase". `dedalo` (squad de domínio Claude Code: hooks/MCP/skills/subagents/config/CI-CD) é o dono natural de uma ferramenta de análise de código; `prometeu` (eng. de software, depende de dedalo) é consumidor secundário. `egide` é o squad de segurança. `metis` cobre analytics.
- **Sibling flag:** repo irmão `Lum1104--Understand-Anything` (mapa de codebase) **sobrepõe** o domínio de compreensão de código. graphify é o mais maduro/geral (código+docs+papers+imagens+vídeo → grafo, MCP, multi-host). Recomenda-se **decidir o dedup na fase de squad**: graphify como motor; o sibling provavelmente vira subconjunto ou complemento, não entidade paralela.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | dedalo | Skill nova `mapa-de-conhecimento-de-codebase` que orquestra o tool graphify; nada equivalente existe no registro. |
| G2 | ADAPT | dedalo | Extração AST multilíngua via tree-sitter — técnica de base da skill; sem equivalente. |
| G3 | ADAPT | dedalo | Padrão de fan-out de subagentes para extração semântica (chunks 20-25) — reforça o método já valorizado pelo Caos. |
| G4 | ADAPT | dedalo | Trilha de confiança EXTRACTED/INFERRED/AMBIGUOUS — princípio de honestidade reutilizável em qualquer extração. |
| G5 | ADAPT | dedalo | Community detection + god nodes + surprising connections vira parte da skill de mapa de codebase. |
| G6 | ADAPT | dedalo | Consulta query/path/explain ao grafo — a interface de uso da capacidade. |
| G7 | VENDOR | vendor (consumido por dedalo) | Servidor MCP stdio pronto (`graphify-mcp`); absorver como tool inerte instalável, não reescrever. |
| G8 | VENDOR | vendor | Exportadores (Obsidian/Neo4j/FalkorDB/GraphML/HTML) — funções da ferramenta, usadas via CLI. |
| G9 | ADAPT | dedalo | Update incremental + dedup por MinHash — técnica de eficiência de re-extração. |
| G10 | VENDOR | vendor | `--watch` é função operacional da ferramenta. |
| G11 | ADAPT | metis | Benchmark de redução de tokens (corpus vs subgrafo) — métrica de eficiência de contexto, casa com analytics. |
| G12 | ADAPT | egide | Defesa de prompt-injection (`<untrusted_source sha256>` + defang de sentinels) — técnica de segurança reutilizável em qualquer pipeline LLM da Kolden. |
| G13 | ADAPT | egide | Camada validate_url/safe_fetch/validate_path/sanitize_label — padrão de hardening para tools que tocam URL/arquivo. |
| G14 | VENDOR | vendor | Backends LLM plugáveis — alinhado à filosofia vendor-agnóstica, mas é maquinário da ferramenta. |
| G15 | CREATE | caos-fabrica | `skillgen` (skill multi-host a partir de fragmentos) é um **meta-padrão** valioso para o Caos gerar skills portáveis entre hosts; avaliar como nova capacidade da fábrica. |
| G16 | ADAPT | dedalo | Blocos always-on de integração ao CLAUDE.md/AGENTS.md — padrão de "regra de contexto" que dedalo (config) pode adotar. |
| G17 | VENDOR | vendor | Hook git post-commit é opt-in da ferramenta; absorver como receita documentada, não como reflexo nativo Kolden. |
| G18 | VENDOR | vendor | Ingest de URL + transcrição Whisper são funções da ferramenta (Firecrawl segue padrão de extração web na Kolden). |
| G19 | VENDOR | vendor | Geração de wiki é função de export da ferramenta. |
| G20 | ADAPT | dedalo | Triagem/impacto de PR sobre o grafo — capacidade de eng. de código que dedalo/prometeu usariam. |

## Síntese da decisão
- **Decisão dominante: ADAPT** (10 IDs ADAPT, 8 VENDOR, 1 CREATE, 0 REUSE).
- **Squad-alvo primário: `dedalo`** (8 ADAPT) — recebe uma skill nova de mapa de conhecimento de codebase que **embrulha** o tool graphify (instalado como **vendor** inerte: pacote PyPI `graphifyy` + `graphify-mcp`). `egide` recebe 2 técnicas de segurança (G12, G13); `metis` 1 métrica (G11); `caos-fabrica` avalia o meta-padrão skillgen (G15).
- **0 REUSE** é correto: não existe capacidade equivalente registrada; afirmar REUSE seria perda silenciosa.
- **Pendência para a fase de squad:** resolver a sobreposição com `Lum1104--Understand-Anything` antes de escrever — não criar duas entidades de compreensão de codebase.
