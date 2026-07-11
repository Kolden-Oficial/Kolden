---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/drive--02-comercial/inventario|inventario]]"
  - "[[Caos/registros/absorcao/drive--02-comercial/mapa-de-decisao|mapa-de-decisao]]"
---

# Reconciliação — Área "02 | Comercial" (Drive)

> F6.5. Fecha a aritmética da absorção. 2026-06-25. Read-only no Drive (nada movido/alterado).

## Escopo efetivo
- **Pasta designada** "02 | Comercial" (`1ZNU2u5ZVzCn9wRKh2NQTPbYHrfCG4wKf`): confirmada vazia (7 subpastas oficiais + ~30 sub-subpastas, quase todas vazias) salvo 3 arquivos de leads de cliente. **Não contém o acervo-ouro.**
- **Acervo comercial real**: "06 | Templates & Ferramentas" (`17mx1cClEmWQd_K5yqwy0HmqiPyepwhX4`) — onde vive todo o material descrito na missão. Absorção feita aqui.

## Contagem

| Disposição | Qtde | % |
|---|---|---|
| Inventário total (arquivos não-pasta) | 142 | 100% |
| ABSORVIDO | 13 | 9,2% |
| DESCARTADO | 121 | 85,2% |
| DEFER | 8 | 5,6% |
| **PERDIDO** | **0** | **0%** |

**Invariante:** 13 + 121 + 8 = 142 ✅  ·  PERDIDO = 0 ✅

## Quebra dos DESCARTADOS por motivo
| Motivo | Qtde aprox. |
|---|---|
| Propostas/apresentações de cliente específico (instâncias) | ~32 |
| Só-cliente / PII / dado vivo (leads, atas, listas, briefings) | ~28 |
| Fora de escopo comercial (RH, dropshipping legado, financeiro genérico) | ~24 |
| Mídia bruta / experimento / binário baixo valor | ~18 |
| Duplicado / esqueleto vazio / pesquisa de cliente | ~13 |
| Contrato genérico (→ Jurídico) | ~5 |
| SEGREDO (→ Infisical) | 1 |

## Onde o ouro foi parar (cérebro)
| Doc-alvo | Seções enriquecidas |
|---|---|
| `mercado-e-posicionamento/ofertas-e-produtos.md` | linhas de serviço, remuneração/receita, precificação, modelo de proposta (6 passos + prompt) |
| `areas/receita.md` | carta da área, board de sócios, funções do squad, pipeline, funil, KPIs |
| `operacao/processos.md` | §4.1 prospecção, §4.2 kick-off/QNP, §4.3 debriefing, §4.4 daily/sprint |
| `mercado-e-posicionamento/icp-e-personas.md` | ICP por eixos, nichos atendidos, 2 personas |

## Itens que exigem atenção humana
1. **Escopo divergente do mapa de alto nível.** A missão atribuiu o conteúdo da pasta "06" ao fileId da pasta "02". Confirmar com o Ronan se a intenção era absorver "06 | Templates & Ferramentas" (feito) e se a estrutura "02 | Comercial" oficial deve receber a reorg (candidatos no retorno).
2. **DEFER do BLACK BOOK e OKR** (inteligência densa, binária): decidir se merece um `operacao/inteligencia-e-referencias.md` próprio numa leva futura.
3. **Scripts Cold Call/Cold Mail** (binários `.docx`): se virarem SOP vivo, transcrever para `sop-prospeccao.md`.

## Garantias
- Nenhum arquivo movido, renomeado ou apagado no Drive (read-only).
- Nenhuma credencial/segredo absorvido (D4 descartado por regra de ouro §5).
- Todo fileId citado nas "Fontes (Drive)" dos docs do cérebro.
