---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/recortes/projetos-fechados-vs-unitarios|projetos-fechados-vs-unitarios]]"
---

# Recorte — Preços por categoria (Vilela Price Book 2026)

> **Fonte:** `dados/planilha-vilela.json` (parseado 2026-07-09).
> **Método:** para cada categoria, computa min / média / max de cada tier sobre todos os serviços da categoria.
> **Nota:** as médias misturam preços por unidade (SF/LF/Each) com preços por projeto fechado (Job). Comparar dentro da mesma categoria só faz sentido quando o `unit` é o mesmo. Ver `recortes/projetos-fechados-vs-unitarios.md` para separação.

Categorias ordenadas por preço médio Standard descendente:

## Kitchens (6 serviços)

Alto ticket — motor de faturamento; todos por `Job`.

| Tier      | Min       | Média     | Max        |
|-----------|----------:|----------:|-----------:|
| Economy   | $20       | $15.961   | $45.000    |
| Standard  | $25       | $23.529   | $65.000    |
| Premium   | $35       | $35.339   | $100.000   |

## Bathrooms (7 serviços)

Alto ticket; todos por `Job`.

| Tier      | Min       | Média     | Max        |
|-----------|----------:|----------:|-----------:|
| Economy   | $550      | $8.079    | $25.000    |
| Standard  | $850      | $12.307   | $40.000    |
| Premium   | $1.300    | $20.471   | $70.000    |

## Basements (5 serviços)

Mix de SF (insulation, framing) e Job (finish, egress window).

| Tier      | Min | Média    | Max       |
|-----------|----:|---------:|----------:|
| Economy   | $2  | $1.117   | $5.500    |
| Standard  | $3  | $1.324   | $6.500    |
| Premium   | $5  | $1.732   | $8.500    |

## Framing & Carpentry (5 serviços)

Mix de SF/LF e Job (Structural Header).

| Tier      | Min | Média    | Max       |
|-----------|----:|---------:|----------:|
| Economy   | $5  | $665     | $2.500    |
| Standard  | $7  | $1.147   | $4.500    |
| Premium   | $10 | $2.149   | $8.500    |

## HVAC (1 serviço apenas)

Cobertura rasa. Ver observação #7 em `analise/observacoes.md`.

| Tier      | Único    |
|-----------|---------:|
| Economy   | $650     |
| Standard  | $950     |
| Premium   | $1.500   |

## Plumbing (3 serviços)

Cobertura rasa. Preços por Each ou Job.

| Tier      | Min   | Média   | Max     |
|-----------|------:|--------:|--------:|
| Economy   | $350  | $567    | $900    |
| Standard  | $500  | $850    | $1.400  |
| Premium   | $800  | $1.333  | $2.200  |

## Windows & Doors (7 serviços)

Todos por Each ou Door. Variação 3,75x sugere granulação insuficiente.

| Tier      | Min   | Média   | Max     |
|-----------|------:|--------:|--------:|
| Economy   | $7    | $474    | $1.200  |
| Standard  | $10   | $639    | $1.600  |
| Premium   | $16   | $1.019  | $2.500  |

## Concrete & Masonry (6 serviços)

Mix — Steps, Repair, Slabs. Multiplicador Premium/Economy alto (Masonry Repair 4,38x).

| Tier      | Min | Média   | Max     |
|-----------|----:|--------:|--------:|
| Economy   | $15 | $350    | $1.200  |
| Standard  | $18 | $606    | $2.000  |
| Premium   | $24 | $1.200  | $3.500  |

## Electrical (3 serviços)

Cobertura rasa. Preços por Each.

| Tier      | Min   | Média   | Max     |
|-----------|------:|--------:|--------:|
| Economy   | $150  | $325    | $650    |
| Standard  | $200  | $442    | $900    |
| Premium   | $300  | $708    | $1.500  |

## Miscellaneous (6 serviços)

Inclui os 2 serviços em `unit=Percent` (Project Management, Rush).

| Tier      | Min | Média   | Max     |
|-----------|----:|--------:|--------:|
| Economy   | $8  | $253    | $500    |
| Standard  | $12 | $430    | $850    |
| Premium   | $15 | $790    | $1.500  |

## Roofing (8 serviços)

Mix SF (shingle replacement por telha) e Job (repair).

| Tier      | Min   | Média   | Max     |
|-----------|------:|--------:|--------:|
| Economy   | $8    | $243    | $900    |
| Standard  | $9,50 | $344    | $1.200  |
| Premium   | $12   | $640    | $2.000  |

## Fences (3 serviços)

Todos por Job. Cobertura rasa.

| Tier      | Min | Média  | Max     |
|-----------|----:|-------:|--------:|
| Economy   | $45 | $168   | $400    |
| Standard  | $60 | $262   | $650    |
| Premium   | $85 | $393   | $1.000  |

## Smart Home (2 serviços)

Nichado — só Motion Sensor + Smart Switch. Ambos por Each.

| Tier      | Min   | Média  | Max     |
|-----------|------:|-------:|--------:|
| Economy   | $150  | $150   | $150    |
| Standard  | $175  | $180   | $185    |
| Premium   | $250  | $250   | $250    |

## Decks (22 serviços) — categoria mais granular

Maioria por SF/LF. Ver `recortes/projetos-fechados-vs-unitarios.md` para o corte por unit.

| Tier      | Min   | Média  | Max     |
|-----------|------:|-------:|--------:|
| Economy   | $2,50 | $93    | $500    |
| Standard  | $3,50 | $119   | $650    |
| Premium   | $5    | $161   | $900    |

## Siding & Exterior (8 serviços)

Maioria por SF.

| Tier      | Min   | Média  | Max     |
|-----------|------:|-------:|--------:|
| Economy   | $3,50 | $46    | $300    |
| Standard  | $4,50 | $74    | $500    |
| Premium   | $6    | $127   | $900    |

## Drywall & Plaster (5 serviços)

Todos por SF/Patch. Preços commoditizados.

| Tier      | Min   | Média  | Max     |
|-----------|------:|-------:|--------:|
| Economy   | $1,50 | $42    | $200    |
| Standard  | $2    | $73    | $350    |
| Premium   | $3    | $124   | $600    |

## Painting (4 serviços)

Todos por SF ou LF. Preços commoditizados.

| Tier      | Min   | Média  | Max     |
|-----------|------:|-------:|--------:|
| Economy   | $2    | $24    | $90     |
| Standard  | $3    | $33    | $120    |
| Premium   | $4    | $49    | $180    |

## Flooring (9 serviços)

Todos por SF/LF. Hardwood o mais caro; laminate o mais barato.

| Tier      | Min | Média | Max   |
|-----------|----:|------:|------:|
| Economy   | $2  | $6    | $15   |
| Standard  | $3,50 | $8  | $18   |
| Premium   | $6  | $11   | $25   |

## Epoxy & Specialty (2 serviços)

Nichado — pisos de garagem/basement. Ambos por SF.

| Tier      | Único |
|-----------|------:|
| Economy   | $6    |
| Standard  | $8    |
| Premium   | $12   |

---

_Argos, 2026-07-09._
