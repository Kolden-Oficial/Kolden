# Catálogo de Habilidades — Liceu

Índice das habilidades do squad Liceu (Biblioteca de Mentes). Habilidades próprias vivem em
`.claude/skills/<nome>/SKILL.md`; as compartilhadas são resolvidas na raiz da Kolden ou no Caos.

| Habilidade | Gatilho de invocação | Especialista dono | Propósito |
|---|---|---|---|
| **dissecacao-de-mente** | "disseca a mente de X", "estuda o cérebro de Y", "encontrei essa linhagem: Z", "quem influenciou W" | `liceu-chief` (orquestra; executam os tier 1/2/3) | Pipeline de 9 fases que transforma um NOME ou um TEMA/LINHAGEM num dossiê 100% citado (schema de `mentes/_modelo-dossie.md`), separando fato de folclore e mapeando a linhagem. Fan-out por mente numa linhagem. |
| **mapeamento-de-linhagem** | "mapeia a linhagem de X", "quem influenciou Y", "de quem Z herdou", "monta a genealogia" | `genealogista` | Monta o grafo de influência bidirecional (`herdou_de`/`influenciou`); grava `linhagens/<slug>.md` + arestas no `indice-de-linhagens.yaml`. Distingue direta × zeitgeist; rotula "inferida"; nunca inventa discipulado. |
| **sintese-de-framework** | "transforma essa linhagem num framework", "destila num método", "matriz de X", "torna acionável para a Kolden" | `sintetizador` | Destila uma mente/linhagem verificada num framework operacional de N passos em `frameworks/<slug>/framework.md` + `procedencia.md` (passo → mente → obra/ano). Só consome dossiês verificados; handoff aos squads de execução. |
| **infisical-padrao** *(compartilhada — Caos)* | Qualquer acesso a credencial/segredo | — (todos os agentes) | Buscar credenciais via Infisical (MCP/API). Nunca segredo em texto puro (Art. VII). Path do squad: `/kolden/liceu`. |
| **deep-research** *(compartilhada — harness)* | Pesquisa multi-fonte com verificação adversarial e citação | `biografo`, `cartografo-de-modelos`, `genealogista`, `sintetizador` | Fan-out de buscas, fetch de fontes, verificação adversarial, relatório citado. REUSE antes de escalar ao motor do Argos. |
| **ritual-de-encerramento** *(compartilhada — Kolden)* | Fim de toda sessão com trabalho | — (todos os agentes) | Reflete, extrai lições verificadas e grava no `MEMORY.md` do squad (Padrões Ativos / Candidatos a Promoção / Arquivado). Disparada pelo reflexo Stop. |

> Fonte única das compartilhadas: `infisical-padrao` em `C:\Kolden\Caos\.claude\skills\`;
> `deep-research` no harness; `ritual-de-encerramento` em `C:\Kolden\.claude\skills\`.
> Para fontes hostis/profundas, o Liceu **não tem motor próprio** — escala por handoff ao motor do
> Argos (`research-synthesizer` / GPT-Researcher). `tech-search` (Prometeu) é reuso opcional.
