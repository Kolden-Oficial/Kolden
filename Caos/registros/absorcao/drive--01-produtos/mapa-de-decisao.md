---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/drive--01-produtos/inventario|inventario]]"
  - "[[Caos/registros/absorcao/drive--01-produtos/reconciliacao|reconciliacao]]"
---

# Mapa de Decisão — Drive "01 | Produtos"

> Fase F4 do protocolo de absorção sem perda. Disposição de TODO item do inventário (F3).
> Como a área não contém arquivos, a unidade de decisão é a pasta-esqueleto.

## Decisão

A área é **100% esqueleto** (0 arquivos). Não há nada a ABSORVER nem a DESCARTAR (não há conteúdo).
Toda a estrutura é **DEFER**: pastas vazias projetadas para serem preenchidas pelos squads (pipeline de produtos, roadmaps por produto, docs técnicas, pitch, identidade visual). Recriar/preencher depois, com squads, quando houver produto real.

| D-id | caminho | decisão | motivo |
|------|---------|---------|--------|
| D-02..D-06 | `01 \| Pipeline de Produtos/*` (4 subpastas) | DEFER | Esqueleto do funil de produto (Ideias, Pesquisa de Mercado, Protótipos, Validação & MVP). Sem conteúdo. Preencher via squad de descoberta (Aletheia) quando houver oportunidade. |
| D-07..D-11 | `02 \| KoldenOS/*` (Roadmap, Doc Técnica, Pitch, Identidade Visual) | DEFER | Esqueleto do produto KoldenOS. Sem conteúdo. Fonte de verdade técnica viva já está no monorepo (`CLAUDE.md`, `AGENTS.md`); recriar materiais de produto via squads quando necessário. |
| D-12..D-16 | `03 \| NutriOS/*` (idem) | DEFER | Esqueleto do produto NutriOS. Sem conteúdo no Drive. Observação: já existe trabalho de NutriOS Pro no monorepo (`Projetos/NutriOS Pro/`) — não confundir; aqui é só pasta vazia. |
| D-17..D-21 | `04 \| BrazHub/*` (idem) | DEFER | Esqueleto do produto BrazHub. Sem conteúdo. Preencher via squads quando o produto materializar. |

## Sem ABSORVER / sem DESCARTAR

- ABSORVER: 0 (não há conteúdo de produto/roadmap real).
- DESCARTAR: 0 (não há arquivo para descartar).
- DEFER: 21 pastas (toda a área).

Consequência: **F6 não dispara** — nenhuma edição em `sobre-a-empresa/mercado-e-posicionamento/`.
