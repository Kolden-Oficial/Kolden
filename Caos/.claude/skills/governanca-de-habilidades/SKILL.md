---
name: governanca-de-habilidades
description: Use para governar o PORTFÓLIO de habilidades/reflexos/config (não uma habilidade isolada) — auditar a biblioteca inteira em busca de qualidade/sobreposição/órfãos, medir se as regras são de fato seguidas, destilar princípios repetidos em regras, transformar regra recorrente em reflexo, e fazer faxina (GC) com humano no loop. Acione em "audita minhas skills", "minhas skills estão um caos", ".claude inchado", "essa regra está sendo seguida?", manutenção periódica. NÃO use para validar UMA skill nova (use `validacao-de-skill`) nem para escrever a description de UMA skill (use `descoberta-de-skill`).
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Governança de habilidades (nível portfólio)

`validacao-de-skill` testa **uma** habilidade; `descoberta-de-skill` ajusta o gatilho de **uma**.
Esta habilidade opera no **conjunto**: a biblioteca de habilidades/reflexos/config de um agente (ou
do Caos) acumula órfãos, duplicatas e regras que ninguém segue. Configs são **append-only e
vazam** — só crescem, e apodrecem em silêncio sem auditoria periódica. Este é o domínio meta do
Caos: manter o registro de entidades honesto e a superfície enxuta.

Princípio mestre, em toda função abaixo: **coleta determinística + julgamento por LLM**. Scripts/
greps coletam os fatos de forma exaustiva; só então um modelo cruza o contexto inteiro e emite
veredito. Nunca peça ao modelo para "lembrar" o que um `grep` lista melhor.

## Cinco funções (escolha pela necessidade)

### 1. Inventário de qualidade (stocktake)
Audita **todas** as habilidades/comandos contra um checklist + julgamento holístico. Dois modos:
- **Varredura rápida** — só o que mudou desde a última corrida (compara contra um cache de
  resultados). 5–10 min.
- **Inventário completo** — revisão integral, em lotes por subagente. 20–30 min.
Saída: nota por habilidade + lista priorizada do que corrigir. Carregue adiante as inalteradas.

### 2. Medição de conformidade (comply)
Pergunta diferente de qualidade: **a regra é seguida mesmo quando o prompt não a apoia?**
Gere cenários em **3 níveis de rigor de prompt** — apoiador → neutro → competidor (o prompt
empurra contra a regra) — rode o agente e classifique a sequência de tool calls contra a spec
esperada. Reporta taxa de conformidade por nível. Uma regra que só é seguida quando o prompt pede
explicitamente **não é uma regra** — é uma sugestão; candidata a virar reflexo (função 4).

### 3. Destilação de regras (distill)
Varre as habilidades, extrai **princípios transversais** que aparecem em várias, e os consolida em
regras — anexando a um arquivo de regra existente, revisando o desatualizado, ou criando novo.
Fase 1 coleta determinística (inventário de skills + índice de regras); Fase 2 o LLM cruza o texto
completo e decide append/revise/create. Roda na manutenção periódica ou depois de um stocktake
revelar padrão repetido.

### 4. Hookify (regra recorrente → reflexo determinístico)
Quando uma regra precisa de **garantia**, não de boa-vontade do modelo, transforme-a num reflexo:
arquivo com frontmatter (evento `bash|file|stop|prompt|all`, `pattern` regex, ação `warn|block`).
Verbo no nome: `warn-*`, `block-*`, `require-*`. Suporta múltiplas condições (campo+operador+pattern).
A construção do reflexo em si é a `criacao-de-hooks`; esta função identifica **qual** regra merece virar reflexo (tipicamente as que falham a medição de conformidade #2).

### 5. Faxina com humano no loop (config GC)
Garbage collection do setup: varre canais que acumulam (habilidades, memória, reflexos, permissões,
servidores MCP, jobs agendados, histórico, caches) por itens redundantes/órfãos/expirados/baixo-valor.
**Regra de ferro: nunca apague autônomo.** Soft-delete primeiro (renomear `.disabled` → mover para
lixeira datada → só então deleção real), confirmação `[s/n/pular]` **um a um** (sem "sim para
todos"), e log de cada corrida com instrução de desfazer. Limite ~20 candidatos por corrida — GC é
periódico, não expurgo único. Canais e sinais de obsolescência em `references/canais-e-conformidade.md`.

## Antes de criar: busque (scout)
Antes de **criar** qualquer habilidade nova, procure o que já existe — local primeiro (é o ambiente
do agente), depois marketplace/comunidade. No Kolden isso é a **Fase 0** via `consulta-ao-registro`
(REUSE > ADAPT > CREATE). Esta habilidade reforça: portfólio governado começa por **não duplicar**.

## Cadência sugerida
- A cada ~30 dias **ou** após absorver um pacote grande de skills: rode stocktake (1) + GC (5).
- Após o stocktake revelar padrão repetido: destile (3).
- Regra que a medição de conformidade (2) mostra ignorada: hookify (4).

## Habilidades relacionadas
- Validar/ajustar **uma** habilidade: `validacao-de-skill`, `descoberta-de-skill`, `criacao-de-skill`.
- Transformar regra em reflexo (construção): `criacao-de-hooks`.
- Não duplicar (Fase 0): `consulta-ao-registro`. Registrar mudanças: `registro-de-entidade`.
- Pontas soltas **dentro** de um agente (refs quebradas, skill órfã): `verificacao-de-alinhamento`.

---
*Fonte absorvida (princípio extraído, reescrito em PT-BR, sem cópia literal):
`affaan-m/everything-claude-code@2bc924f` — `skills/skill-stocktake/`, `skills/skill-comply/`,
`skills/rules-distill/`, `skills/hookify-rules/`, `skills/config-gc/`, `skills/skill-scout/`,
`skills/prompt-optimizer/` (MIT). Uso interno Kolden.*
