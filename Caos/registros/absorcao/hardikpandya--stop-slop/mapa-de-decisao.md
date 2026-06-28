# F4 — Mapa de decisão REUSE/ADAPT/CREATE · hardikpandya--stop-slop

Comparação contra `dados/registro-de-entidades.yaml` e os squads existentes. Verificação direta: grep por `slop`/`humaniz`/`ai tells`/`adverb`/`passive voice` em `Caliope/` retornou **zero** — não há capacidade equivalente registrada. Squad-alvo natural: **Caliope** (copy/escrita), domínio `copy`. Sem match limpo de REUSE em lugar nenhum → viés autônomo aplicado: ADAPT.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | caliope | Caliope é o squad de copy/escrita e não tem skill de de-slop/edição anti-IA; entra como nova habilidade de revisão de prosa. |
| G2 | ADAPT | caliope | Técnica de corte de enchimento vira regra da habilidade de edição do Caliope. |
| G3 | ADAPT | caliope | Quebra de estruturas formulaicas complementa o módulo de escrita do Caliope. |
| G4 | ADAPT | caliope | Regra de voz ativa reforça a checagem de qualidade de copy do Caliope. |
| G5 | ADAPT | caliope | Especificidade contra declarativas vagas entra na revisão de copy. |
| G6 | ADAPT | caliope | "Leitor na cena" alinha com persuasão direct-response do Caliope (Halbert/Schwartz). |
| G7 | ADAPT | caliope | Variação de ritmo/sem em-dash vira regra de estilo da habilidade. |
| G8 | ADAPT | caliope | Confiar no leitor / cortar quotáveis entra como princípio de edição. |
| G9 | ADAPT | caliope | Checklist Quick Checks vira checklist compartilhado do Caliope (`checklists/`). |
| G10 | ADAPT | caliope | Rubrica de 5 dimensões vira scorecard de qualidade de prosa do Caliope. |
| G11 | ADAPT | caliope | Dataset de frases proibidas vira swipe-negativo em `Caliope/.../data` (traduzido p/ PT-BR + adaptado). |
| G12 | ADAPT | caliope | Dataset de estruturas a evitar vira referência de anti-padrões do Caliope. |
| G13 | ADAPT | caliope | Exemplos antes/depois viram material de treino/few-shot da habilidade. |

## Notas de mapeamento

- **Decisão dominante: ADAPT** — bloco coeso de 13 itens, todos para o mesmo alvo (Caliope). Nascem como **uma habilidade nova** (`edicao-anti-slop` / "humanização de prosa") + datasets de apoio em `data/` + checklist + scorecard.
- **Sem REUSE:** nenhuma capacidade equivalente existe no registro (Caliope, Orfeu, Ariadne, Aglaia checados); REUSE sem prova seria perda silenciosa.
- **Possível sobreposição de lote:** o guia referencia um repo irmão `blader--humanizer` (mesmo domínio de "des-IA-ificar" texto). Se ambos forem absorvidos, a fase de aplicação deve **fundir** stop-slop + humanizer numa única habilidade do Caliope para evitar duplicação — sinalizar ao orquestrador na consolidação.
- **Adaptação obrigatória na escrita (fase posterior):** traduzir frases/estruturas para PT-BR e recalibrar — várias regras são específicas do inglês (advérbios -ly, em-dash, aberturas Wh-). Manter o *princípio*, não a lista literal. Atribuição MIT a Hardik Pandya preservada.
