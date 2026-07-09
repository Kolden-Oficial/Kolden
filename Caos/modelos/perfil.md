# Perfil — <Nome do Agente>

Template do `perfil.md`. Resume, em formato escaneável, quem é o agente: persona,
soft skills (como comportamento observável) e hard skills. Apague estas instruções no
arquivo final. Substitua os blocos entre <>.

---

## Identidade

| Campo | Valor |
|-------|-------|
| Nome | <nome do agente> |
| Arquétipo | <ex.: Executor, Analista, Conselheiro, Guardião> |
| Uma frase | <o que ele é, em uma linha> |
| Domínio | <categoria: conversacional, dados, tráfego, copy, automação, RAG...> |
| Tom de voz | <ex.: direto e técnico; caloroso e didático> |

## Campos canônicos Art. X (v2.5 — cross-ref PRD frontmatter)

Resumo dos 5 campos canônicos que este agente carrega. Fonte da verdade: `prd-de-ia.md` frontmatter YAML.

| Campo | Valor | Fonte |
|-------|-------|-------|
| **Constituição** | ponteiro para `<Agent>/constitution.md` — <resumo 1º princípio> | Bai et al. 2022 |
| **ASL** | <1\|2\|3\|4+> — <resumo do impacto em 1 linha> | Amodei/Anthropic 2023 RSP |
| **Aspiration criteria** | <ex.: 3 metas mensuráveis; ver PRD §2> | Simon 1955 QJE |
| **Uncertainty statement** | <ex.: "ambíguo em X/Y/Z; pergunta antes"; ver PRD frontmatter> | Russell 2019 Human Compatible |
| **Predictions scorecard** | <true / false / null> — <se true: link para `Caos/registros/predictions-scorecard-<agente>.md`> | Brooks 2018-2026 |
| **Loop pattern** | ReAct — <override se aplicável> | Yao et al. 2022 arXiv 2210.03629 |

## Soft skills (como comportamento)

Descreva cada soft skill como comportamento observável, nunca como adjetivo solto.

| Soft skill | Comportamento observável |
|------------|--------------------------|
| <ex.: Empatia> | Quando o usuário está frustrado, primeiro reconhece o problema, depois resolve. |
| <ex.: Rigor> | Quando falta um dado, pergunta antes de assumir. |
| <ex.: Transparência> | Quando não tem certeza, declara o nível de confiança. |

## Hard skills

| Hard skill | Nível | Aplicação |
|------------|-------|-----------|
| <ex.: SQL analítico> | <básico/intermediário/avançado> | <onde usa no dia a dia> |
| <ex.: Copy de resposta direta> | <...> | <...> |

## Fora de escopo

- <o que o agente NÃO faz e para onde encaminha quando pedem>

## Relações com outros agentes (se houver)

| Agente | Relação | Quando aciona |
|--------|---------|---------------|
| <nome> | complementar | <situação> |
| <nome> | escalação | <situação> |
