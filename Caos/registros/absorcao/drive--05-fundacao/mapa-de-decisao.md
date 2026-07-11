---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/drive--05-fundacao/inventario|inventario]]"
  - "[[Caos/registros/absorcao/drive--05-fundacao/reconciliacao|reconciliacao]]"
---

# Mapa de decisão — Drive "05 | Fundação" (F4)

> Para cada item do inventário (F3): ABSORVER / DESCARTAR / DEFER.
> Invariante: count(ABSORVER) + count(DESCARTAR) + count(DEFER) == 62 (D-01..D-62), PERDIDO = 0.

## Achado central

Os assets desta área **já foram absorvidos previamente** para o cérebro de marca, em
`C:\Kolden\sobre-a-empresa\marca\design-system\assets\originais\` — cópia local fiel,
mesma árvore de pastas (`01-apresentacao` … `06-referencias`). O guia
`assets/originais/LEIA-ME-ANTES-DE-BAIXAR.md` documenta exatamente o mapeamento
pasta-do-Drive → pasta-local.

Portanto, a decisão de absorção **não é re-baixar bytes** (já existem localmente). O valor
agregado por esta absorção é **rastreabilidade de procedência**: registrar os `fileId` do
Drive como fonte canônica, cruzando-os com os originais locais já catalogados em
`assets/indice-assets.md`. É o que F6 manda: REGISTRAR como referência cruzada, sem sintetizar.

## Decisões

| Faixa D-id | Pasta Drive | Decisão | Motivo |
|---|---|---|---|
| D-01, D-02 | 01 Apresentação | **ABSORVER** (já local) | Brand book (Doc+PDF) já em `originais/01-apresentacao/`. Registrar fileIds como procedência. |
| D-03..D-05 | 02 Auxiliares | **ABSORVER** (já local) | Grafismos (ROBO/TXT) já em `originais/02-auxiliares/` + curados em `grafismos/`. |
| D-06..D-35 | 03 Logo/COM FUNDO | **ABSORVER** (já local) | Logos já em `originais/03-logo/COM FUNDO/`. |
| D-36 | 03 Logo/FUNDO CHAMADA | **ABSORVER** (já local) | Já em `originais/03-logo/FUNDO CHAMADA/`. |
| D-37..D-48 | 03 Logo/SEM FUNDO | **ABSORVER** (já local) | Logos de uso (fonte dos curados) já em `originais/03-logo/SEM FUNDO/`. |
| D-49, D-50 | 04 Logo Antiga | **ABSORVER** (já local) | Referência histórica já em `originais/04-logo-antiga/`. Marcada "não usar". |
| D-51..D-55 | 05 Mockups | **ABSORVER** (já local) | Mockups SL 24–28 já em `originais/05-mockups/`. |
| D-56..D-61 | 06 Referências | **ABSORVER** (já local) | Moodboard (6 JPG) já em `originais/06-referencias/`. |
| D-62 | 06 Referências/REFERÊNCIAS/ | **DESCARTAR** | Pasta vazia — 0 arquivos. Sem conteúdo a absorver. |

## Contagem

- ABSORVER: **61** (D-01..D-61) — todos já espelhados localmente; absorção desta passada = registro de procedência (fileIds).
- DESCARTAR: **1** (D-62 — pasta vazia).
- DEFER: **0**.
- PERDIDO: **0**.

Total: 61 + 1 + 0 = **62** == |inventário F3 (D-01..D-62)|. ✔ Invariante satisfeita.

## Ação F6 executada

Adicionada seção "Procedência (Google Drive — fonte canônica)" em
`marca/design-system/assets/indice-assets.md`, mapeando cada pasta de `originais/` ao
`fileId` da pasta-mãe no Drive. **Nenhum conteúdo de marca novo foi sintetizado** — apenas
referência cruzada de rastreabilidade.
