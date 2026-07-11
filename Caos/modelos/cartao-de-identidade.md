---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/modelos/_indice|_indice]]"
---

# Cartão de Identidade — modelo ÚNICO de identidade de agente

> Template canônico do **RH dos agentes** da Kolden. Realiza, em formato padronizado e
> consultável, o que o antigo `perfil.md` prometia mas nunca foi produzido na prática
> (nenhum agente o tem). Este cartão **substitui** o `perfil.md` como artefato de identidade:
> mesma intenção (persona + soft/hard skills), porém com os **5 eixos canônicos** que o
> Ronan nomeou e um **bloco YAML machine-readable** que alimenta o roster
> `dados/elenco-de-agentes.yaml`.
>
> **Dono:** o subagente `curador` (Caos) — único que escreve no roster. Ver
> `.claude/agents/curador.md`.
> **Quando preencher:** na Fase 5 do Ritual (todo agente novo nasce com o cartão) e no
> backfill dos agentes legados. O preenchimento entra no roster na Fase 8.
>
> Apague estas instruções no arquivo final. Substitua os blocos entre `<>`. PT-BR, kebab-case.

---

## Bloco YAML canônico (copie para o roster e para o `perfil`/cartão do agente)

```yaml
# ── Básicos (identidade administrativa) ──
id: <kebab-case>                 # id único do agente (igual ao do arquivo .md)
name: "<Nome de exibição>"       # nome mitológico ou nome real (especialista histórico)
cargo: "<cargo/função>"          # ex.: CEO, COO, Verificador de Runtime, Copywriter
squad: <squad>                   # squad de origem (ou "solo" para agente autônomo)
area: <area>                     # área organizacional (sobre-a-empresa/areas/): ex.
                                 # executivo-c-level, marketing, dados, meta/verificacao
tier: <0|1|1a|...>               # 0 = orquestrador; 1 = especialista
proposito: >                     # uma frase: o que este agente resolve e para quem
  <missão em uma linha>

# ── Campos canônicos do Art. X (Constituição v2.5.0) — obrigatórios ──
constitution: "<path para <Agent>/constitution.md>"     # G1 — Bai et al. 2022
ASL: <1|2|3|4+>                                          # G2 — Amodei RSP 2023
aspiration_criteria:                                     # G3 — Simon 1955
  - criterio: "<meta 1>"
    limite: "<número + unidade>"
    fonte_evidencia: "<KPI do PRD §2>"
uncertainty_statement: |                                 # G3 — Russell 2019
  <1-3 parágrafos>
predictions_scorecard: <true|false|null>                 # G8 — Brooks 2018-2026
loop_pattern: ReAct                                      # P10 — Yao et al. 2022 (override registrado)

# ── Os 5 EIXOS da identidade ──
hard_skills:                     # O QUE ele sabe fazer — competências + frameworks nomeados
  - <competência ou framework 1>
  - <competência ou framework 2>
soft_skills:                     # COMO ele se comporta — habilidade descrita como COMPORTAMENTO
  - <soft skill em comportamento observável, nunca adjetivo solto>
mentalidade:                     # COMO ele pensa — crenças/princípios operantes (do core_principles)
  - <princípio/heurística que guia as decisões>
ferramentas:                     # COM O QUE ele opera — APIs/MCPs/artefatos (Infisical sempre 1º)
  - Infisical                    # obrigatório: toda credencial vem daqui (Constituição Art. VII)
  - <ferramenta/artefato evidenciado na ferramentas.md do agente>
gatilhos:                        # QUANDO acioná-lo — routing_triggers / keywords de roteamento
  - <palavra-chave 1>
  - <palavra-chave 2>

# ── Procedência (rastreio) ──
path: "<Pasta/ ou Pasta/agents/<id>.md>"   # onde o agente vive (não mover código)
fonte: "<arquivo de origem dos dados do cartão>"
```

---

## Como preencher cada eixo (1 linha por eixo)

| Eixo | Pergunta-guia | Fonte no arquivo do agente | Regra |
|---|---|---|---|
| **constitution** | Onde vivem os princípios veto-operacionais? | frontmatter do PRD + `<Agent>/constitution.md` | Ponteiro para arquivo com 5-15 princípios; ausência = BLOCK. |
| **ASL** | Que impacto suas mutations têm? | frontmatter do PRD | 1 (leitura) / 2 (reversível) / 3 (side effect) / 4+ (irreversível); ASL-3+ ativa `interrupt-before-mutation.sh`. |
| **aspiration_criteria** | Bom-o-bastante para quê? | frontmatter do PRD § KPIs (2) | 3-5 metas mensuráveis; cada uma bate com KPI do PRD §2. |
| **uncertainty_statement** | Onde está o espaço latente de intenção? | frontmatter do PRD | 1-3 parágrafos — quais ambiguidades este agente encontrará em uso real e como se comporta diante delas. |
| **predictions_scorecard** | Faz previsões datáveis? | frontmatter do PRD (decidido na Rodada Alma) | `true` publica scorecard em `Caos/registros/predictions-scorecard-<agente>.md`; `false` registra decisão. |
| **hard_skills** | O que ele sabe FAZER? | `focus` + chaves de `core_frameworks` | Liste competências concretas e frameworks pelo nome; nada genérico. |
| **soft_skills** | COMO ele se comporta? | `persona.style` + `communication.tone` | Descreva **comportamento observável** ("quando falta dado, pergunta antes de assumir"), nunca adjetivo solto. |
| **mentalidade** | COMO ele pensa? | `core_principles` / `persona.identity` | Capte as crenças operantes que guiam decisões e trade-offs. |
| **ferramentas** | COM O QUE ele opera? | `ferramentas.md` do agente | **Infisical é sempre o 1º item** (Art. VII). Só liste o que existe de fato (Art. IV — sem invenção). |
| **gatilhos** | QUANDO acioná-lo? | `routing_triggers` (ou keywords do registro) | Palavras-chave que roteiam um pedido a este agente. |

## Invariantes (gate de qualidade do cartão)

1. **Os 5 eixos sempre presentes.** Cartão sem um dos eixos é incompleto — não entra no roster.
2. **`ferramentas` começa por Infisical** e só cita o que está documentado (Constituição Art. IV/VII).
3. **`soft_skills` em comportamento**, nunca em adjetivo ("rigoroso") solto.
4. **`gatilhos` espelham o roteamento real** — devem bater com o `routing_triggers` do agente ou
   com as keywords da sua entrada em `dados/registro-de-entidades.yaml`.
5. **`id`/`path` batem com o filesystem** — o cartão aponta para onde o agente vive; nunca move código.
6. **Tudo em pt-BR e kebab-case** (Constituição Art. II).
7. **Os 5 campos canônicos do Art. X sempre presentes** (`constitution`, `ASL`, `aspiration_criteria`, `uncertainty_statement`, `predictions_scorecard`). Ausência de qualquer um = BLOCK no roster. `revisor` verifica na Fase 6.
8. **`constitution` aponta para arquivo existente** com 5-15 princípios veto-operacionais. Arquivo vazio ou <5 princípios = BLOCK.
9. **`ASL` bate com ferramentas** — se lista alguma tool com `annotations.destructive: true`, ASL ≥ 3.
10. **`aspiration_criteria` bate 1:1 com KPIs do PRD §2** — cada aspiration tem KPI correspondente e vice-versa.
11. **Cartão é espelho** — quando PRD muda, o `curador` propaga na Fase 8. Divergência PRD × cartão = BLOCK.

## Relação com os outros artefatos do RH dos agentes

- **`dados/elenco-de-agentes.yaml`** — o roster por-agente; cada entrada é uma instância deste cartão.
  É a fonte machine-readable do elenco.
- **`AGENTS.md`** (raiz do Kolden) — a vitrine humana (uma linha por agente). O cartão é a forma longa.
- **`dados/registro-de-entidades.yaml`** — o registro de **entidades** (squads/skills/agentes-solo),
  granularidade de squad. O cartão é granularidade de **agente individual**.
- **`sobre-a-empresa/areas/`** — a visão organizacional (área → elenco); o campo `area` do cartão é o
  elo com ela.
