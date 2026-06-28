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

## Relação com os outros artefatos do RH dos agentes

- **`dados/elenco-de-agentes.yaml`** — o roster por-agente; cada entrada é uma instância deste cartão.
  É a fonte machine-readable do elenco.
- **`AGENTS.md`** (raiz do Kolden) — a vitrine humana (uma linha por agente). O cartão é a forma longa.
- **`dados/registro-de-entidades.yaml`** — o registro de **entidades** (squads/skills/agentes-solo),
  granularidade de squad. O cartão é granularidade de **agente individual**.
- **`sobre-a-empresa/areas/`** — a visão organizacional (área → elenco); o campo `area` do cartão é o
  elo com ela.
