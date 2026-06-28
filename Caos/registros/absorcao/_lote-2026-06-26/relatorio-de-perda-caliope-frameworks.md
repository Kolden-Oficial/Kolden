# Relatório de reconciliação (F6.5) — Caliope · frameworks de copy executáveis

- **squad-alvo:** Caliope (`C:/Kolden/Caliope/`)
- **repo aplicado:** alirezarezvani--claude-skills · sha `4a3c05b69e64f4925f7fc65c88890f614f79caf0` · licença MIT
- **bucket:** frameworks de copy executáveis (SKILLs, não personas)
- **data:** 2026-06-27
- **invariante:** count(ABSORVIDO) + count(DESCARTADO) + count(DIFERIDO-INCREMENTAL) == count(âncoras consideradas) · **PERDIDO=0**

## Contexto da deduplicação

O cluster G1 do dossiê (`Marketing — Conteúdo & Copy`) é amplo (~10 skills, incl. ~22
personas de copywriter que o Caliope **já cobre** com seus 22 agentes históricos). A missão
aqui era extrair **frameworks executáveis** (não personas), então a seleção de âncoras foi
ampliada para além de G1 puxando os métodos de copy aplicada que vivem em outros clusters
de marketing do mesmo repo (G3 página/CRO, G4 e-mail/tráfego, G6 lançamento) — todos
roteados originalmente a outros squads, mas cujo **componente de copy** pertence ao Caliope.
Nenhuma persona/agente foi duplicada; foram criadas SKILLs que orquestram o conhecimento dos
copywriters existentes.

## Âncoras aplicadas

| repo | ID/fonte | disposicao | destino |
|---|---|---|---|
| alirezarezvani--claude-skills | G1/G3 · `copywriting` + `page-cro` (+ ref `copy-frameworks.md`) | ABSORVIDO | `Caliope/.claude/skills/estrutura-de-pagina-de-vendas/` (SKILL.md + references/catalogo-de-secoes.md) |
| alirezarezvani--claude-skills | G1 · `copywriting` (ref `copy-frameworks.md` headlines) + `ad-creative` (ref `creative-frameworks.md`) | ABSORVIDO | `Caliope/.claude/skills/headline-e-hook-testaveis/` (SKILL.md + references/formulas-de-headline.md) |
| alirezarezvani--claude-skills | G4 · `ad-creative` (`creative-frameworks.md`) + `marketing-psychology` (`mental-models-catalog.md`) | ABSORVIDO | `Caliope/.claude/skills/anuncio-por-estagio-de-consciencia/` (SKILL.md + references/frameworks-e-matriz.md) |
| alirezarezvani--claude-skills | G4/G6 · `email-sequence` (`email-sequence-playbook.md`) + `launch-strategy` (`launch-frameworks-and-checklists.md`) | ABSORVIDO | `Caliope/.claude/skills/sequencia-de-email-de-lancamento/` (SKILL.md + references/fases-e-checklist.md) |

**4 habilidades criadas, 4 âncoras absorvidas.** Sobreposições resolvidas por fusão:
página-de-vendas funde `copywriting` + `page-cro`; headline funde a ref de fórmulas do
`copywriting` com a do `ad-creative`; anúncio funde `ad-creative` + `marketing-psychology`;
e-mail funde `email-sequence` + `launch-strategy`. Cada SKILL credita as fontes no rodapé.

## INCREMENTAL (não aplicado nesta leva)

Itens do cluster de copy/conteúdo do repo deixados como incremental — valor real, mas fora
do escopo "frameworks de copy executáveis" desta leva, ou já cobertos pelo Caliope:

| ID/fonte | motivo do adiamento |
|---|---|
| `content-production` / `content-strategy` | DIFERIDO-INCREMENTAL — produção/estratégia de conteúdo (blog/editorial), não framework de copy de conversão; candidato a skill futura do Caliope ou do Orfeu. |
| `content-humanizer` | DESCARTADO (duplicata) — o Caliope já tem `de-slop` (fundido de blader/humanizer + stop-slop); cobre o mesmo princípio em PT-BR. |
| `copy-editing` | DIFERIDO-INCREMENTAL — revisão linha-a-linha pós-rascunho; complementa mas não é framework executável de criação; candidata futura. |
| `marketing-psychology` (catálogo completo de ~60 modelos mentais) | DIFERIDO-INCREMENTAL — absorvido só o subconjunto de gatilhos de persuasão aplicáveis ao anúncio; o catálogo completo (modelos de growth/pricing/estratégia) é mais amplo que copy e pertence a Pluto/Peitho. |
| `cold-email` | DIFERIDO-INCREMENTAL — copy de prospecção fria (outbound) tem regras próprias (deliverability, opt-out); candidata a skill própria; roteada a Peitho no dossiê. |
| `ad-copy-templates` / `scoring-system` (tools Python do `paid-ads`) | DIFERIDO-INCREMENTAL — scripts de scoring; nesta sessão não se executa nem porta código de terceiro. Princípio de scoring foi reescrito como rubrica manual em `headline-e-hook-testaveis`. |
| demais personas de copywriter do G1 (content-creator etc.) | DESCARTADO — o Caliope já tem 22 agentes-copywriter; criar persona seria duplicação (viola REUSE > ADAPT > CREATE). |

## Conformidade

- PT-BR em tudo; kebab-case nas pastas; sem cópia literal (princípios reescritos).
- Atribuição (owner/repo@sha + licença MIT) no rodapé de cada SKILL.md e no topo de cada
  reference.
- `squad.yaml` **não** tocado. `catalogo.md` atualizado (append) com as 4 entradas.
- Sem execução de código de terceiro; sem commit/push.
- **PERDIDO = 0** (todo item considerado tem disposição registrada acima).
