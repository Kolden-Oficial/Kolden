---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/blader--humanizer/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/blader--humanizer/seguranca|seguranca]]"
---

# Mapa de decisão — blader--humanizer

- **slug:** blader--humanizer · **sha:** 9600f2b7241cb4eed6ad803abee5ea01d67fe8e4 · **rota:** A
- **Registro consultado:** `dados/registro-de-entidades.yaml` — **nenhuma** entidade de "humanizer/de-slop/anti-AI-writing" existe (grep `slop|humaniz|ai-writing|naturaliz` sem hits).
- **Squad-alvo natural:** `caliope` (domínio copy/escrita; squad importado-cru, score adaptabilidade 0.7, ponto de extensão declarado "swipe store de copy"). Match de domínio, mas **sem** match item-a-item de nenhuma das 9 capacidades → viés ADAPT (não REUSE).

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | caliope | Caliope não tem editor de-slop; entra como nova habilidade de qualidade de escrita (pós-redação) traduzida em PT-BR. |
| G2 | ADAPT | caliope | Taxonomia de 33 padrões vira dado/checklist da habilidade; precisa ser re-exemplificada em PT-BR (Before/After atuais são em inglês). |
| G3 | ADAPT | caliope | Loop draft→audit→final é método de autocrítica reaproveitável pelo redator do Caliope. |
| G4 | ADAPT | caliope | Calibração de voz casa com persona/voz de marca do copy; reforça o handoff de voz do cliente. |
| G5 | ADAPT | caliope | "Personality and Soul" alimenta a camada de voz; gate de registro (técnico vs opinativo) é útil ao copy. |
| G6 | ADAPT | caliope | Guia anti-falso-positivo evita que o de-slop destrua copy humano legítimo — guardrail de precisão. |
| G7 | ADAPT | caliope | Lista de sinais humanos a preservar é o contrapeso do G6; mesma habilidade. |
| G8 | ADAPT | caliope | Regra anti-em-dash + varredura final é micro-constraint plugável no checklist de saída do Caliope. |
| G9 | ADAPT | caliope | Heurística de cluster de tells é o critério de decisão da habilidade (quando reescrever vs deixar). |

## Síntese

Decisão dominante: **ADAPT → caliope**. As 9 capacidades formam **uma única habilidade coesa** ("humanizador de escrita" / de-slop) e devem ser absorvidas juntas como uma skill nova dentro do Caliope, não nove skills soltas. Reescrita obrigatória em PT-BR com exemplos Before/After nativos (os atuais são em inglês e citam tells anglófonos — ex.: travessão, curly quotes, "rule of three" — que precisam de equivalentes pt-BR). Sem cópia literal; Wikipedia "Signs of AI writing" é fonte de domínio público, citável.

## SOBREPOSIÇÃO — sinalização para a fase de aplicação

Há repo irmão **`hardikpandya--stop-slop`** (mesmo domínio de-slop, também roteado ADAPT→Caliope). **Recomendação para a fase de aplicação: NÃO criar duas habilidades concorrentes — fundir blader--humanizer + hardikpandya--stop-slop numa ÚNICA habilidade de-slop no Caliope.** Este repo (humanizer) é o mais rico em técnica (33 padrões + calibração de voz + alma + loop de audit + guia de falso-positivo) e deve ser o **esqueleto**; o stop-slop entra como complemento/diff (absorver só o que ele tiver a mais, evitando duplicação). Decidir a fusão antes de escrever qualquer arquivo no Caliope.
