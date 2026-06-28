---
name: avaliacao-de-agente
description: Use para avaliar um AGENTE inteiro (não uma habilidade isolada) — na Fase 7 do Ritual pelo especialista testador, ou quando alguém pergunta "esse agente está bom?", "qual agente/modelo escolher?", "por que o agente piorou depois que adicionei camada X?". Cobre eval-first (rubrica multi-eixo, pass@k), comparação head-to-head, auto-avaliação por 5 eixos, auditoria das 12 camadas do stack e introspecção de falhas. NÃO use para testar uma habilidade isolada (use `validacao-de-skill`).
---

# Avaliação de agente (eval-first)

Avaliar agente é **TDD aplicado a comportamento**: você define o que conta como sucesso
**antes** de medir, e mede com evidência — não com "achei que ficou bom". Esta é a espinha da
**Fase 7** (teste de comportamento / maturity score) e o braço de QA da fábrica. O maturity
score ≥7.0 só tem valor se vier de uma rubrica discriminante e de uma corrida reproduzível.

Quatro lentes, escolhidas pela pergunta:

| Pergunta | Lente | Seção |
|---|---|---|
| "O agente cumpre a jornada do PRD?" | Eval-first (capacidade + regressão, pass@k) | A |
| "Qual destes agentes/modelos é melhor?" | Comparação head-to-head reproduzível | B |
| "Quão bom ficou ESTE output?" | Auto-avaliação por 5 eixos | C |
| "Por que o agente está pior/errático?" | Auditoria das 12 camadas + introspecção | D |

## A. Eval-first (a eval é o teste unitário do comportamento)
Defina o comportamento esperado **antes** de construir, rode continuamente, rastreie regressão.
Dois tipos de eval, ambos com critério de sucesso explícito:
- **Eval de capacidade** — o agente consegue fazer algo novo? Tarefa + lista de critérios
  verdadeiro/falso + output esperado.
- **Eval de regressão** — uma mudança quebrou o que já funcionava? Baseline (SHA/checkpoint) +
  lista de testes com resultado anterior vs atual (`X/Y` passou, antes `Y/Y`).

**Confiabilidade = pass@k.** Rode o mesmo cenário **k vezes** (mínimo 3) em contexto fresco;
3/3 = consistente, 2/3 = instável. Amostra única mente — não há maturity score honesto de 1 corrida.

**Três tipos de grader** (escolha pelo que a saída permite):
1. **Determinístico (código)** — `grep`/exit code/teste/build. Use sempre que dá para checar por código.
2. **Por modelo** — subagente avalia saída aberta contra rubrica, devolve nota + justificativa. Para o que não é objetivo.
3. **Humano** — sinalize `[REVISÃO HUMANA]` com risco LOW/MEDIUM/HIGH quando o juízo for sensível.

Os cenários da eval saem da **jornada do PRD** (§ casos de uso). Tabela de mapeamento jornada→eval
e o esquema do scorecard em `references/rubricas-e-camadas.md`.

## B. Comparação head-to-head (qual agente/modelo)
Toda comparação "qual agente é melhor?" roda na base do achismo. Sistematize:
- **Tarefa declarativa** (YAML): o que fazer, quais arquivos, e o **juiz** (pytest/grep/build) +
  commit fixado para reprodutibilidade.
- **Isolamento** — cada corrida em seu próprio worktree/sandbox; agentes não se contaminam nem
  corrompem a base. (No Kolden: worktree git ou subagente com contexto isolado — nunca executar
  código de terceiro fora de sandbox; ver Constituição Art. VIII.)
- **Métricas coletadas**: taxa de acerto (passou no juiz?), custo (gasto de API/tokens), tempo
  (segundos até concluir), **consistência** (acerto sobre k corridas). Capture `total_tokens` e
  `duration_ms` na notificação de conclusão do subagente — não dá para recuperar depois.
- Decisão **com dados**, não com vibe. Saída = tabela comparativa por métrica.

## C. Auto-avaliação por 5 eixos (reflexão deliberada, não gate)
Depois de uma tarefa não-trivial, o agente pontua o próprio output em 5 eixos — **com evidência
por nota**. Catch de omissão/excesso de confiança **antes** do usuário ver.

| Eixo | Pergunta | O que pega |
|---|---|---|
| Acurácia | Os fatos/saídas estão corretos? | alucinação, API errada, sintaxe falsa |
| Completude | Cobriu tudo que foi pedido? | edge cases, requisito esquecido, subtarefa pulada |
| Clareza | É compreensível e bem estruturado? | jargão sem definição, divagação |
| Acionabilidade | Dá para agir já? | "você deveria X" sem mostrar como, sem caminho de verificação |
| Concisão | Usou o mínimo necessário? | redundância, repetir a pergunta, enchimento |

Escala 1–5 (5=sem melhoria razoável; 1=erra o pedido). **Regra da evidência:** toda nota <5 cita o
gap específico — *"mostre o buraco, não só o nomeie"*. Score 3 não é "podia melhorar"; é "falta X".
Pontue cada eixo **fresco** (não calcule a média de cabeça e justifique para trás). Se algum eixo
≤3 e o conserto leva <30s, conserte agora; senão sinalize o rework explícito.

## D. Auditoria das 12 camadas + introspecção (quando o agente piora/erra)
Quando o mesmo modelo acerta no playground e erra dentro do wrapper, a culpa está numa das **12
camadas** do stack (system prompt → história → memória de longo prazo → distilação → recall →
seleção de tool → execução de tool → interpretação → formatação → rendering → loops de reparo
ocultos → persistência). Qualquer uma corrompe a resposta. Padrões frequentes: **regressão de
wrapper** ("funcionava antes da última camada"), **contaminação de memória** (tópico velho vaza
para conversa nova; correção do usuário não gruda), **falha de disciplina de tool** ("deve usar
tool X" no prompt mas o modelo responde sem chamar / alucina execução), **corrupção de
transporte** (resposta interna certa, camada de entrega muta). Mapa completo das 12 camadas com
sintomas em `references/rubricas-e-camadas.md`.

Quando o agente **falha em loop** (estoura tool calls, queima token sem progresso, repete o mesmo
comando), rode o ciclo de 4 fases antes de escalar a humano:
1. **Captura** — registre erro/stack, última sequência de tools, objetivo em curso, pressão de
   contexto (planos duplicados, logs gigantes), suposições de ambiente (cwd, branch, serviço).
2. **Diagnóstico** — case com um padrão conhecido antes de mudar nada (loop sem saída / overflow
   de contexto / serviço fora / 429 / arquivo sumido por cwd errado / teste falhando por hipótese
   errada). Pergunte: é falha de lógica, estado, ambiente ou política? É determinística ou transiente?
3. **Recuperação contida** — a **menor ação reversível** que muda a superfície do diagnóstico:
   pare os retries, corte contexto de baixo sinal, re-observe o filesystem/branch real, estreite
   para um teste/arquivo, troque especulação por observação direta.
4. **Relatório** — registro humano-legível da captura→diagnóstico→ação→resultado.

## Gate de saída (Fase 7)
- [ ] Cenários derivados da jornada do PRD (não inventados).
- [ ] pass@k ≥3 corridas; consistência reportada (não amostra única).
- [ ] Grader determinístico onde a saída permite; rubrica discriminante onde não permite.
- [ ] Maturity score com evidência por eixo (toda nota <5 cita o gap).
- [ ] Se houve degradação: camada culpada das 12 identificada antes do conserto.

## Habilidades relacionadas
- Testar uma **habilidade** isolada (A/B com/sem skill, trigger eval): `validacao-de-skill`.
- Junção entre componentes de um squad (boundary mismatch): `qa-de-integracao-de-time`.
- Verificação adversarial de um output específico (council/dual-review): `conselho-adversarial`.
- Capturar o que a avaliação ensinou, entre sessões: `captura-de-instintos`.

---
*Fonte absorvida (princípio extraído, reescrito em PT-BR, sem cópia literal):
`affaan-m/everything-claude-code@2bc924f` — `skills/agent-eval/`, `skills/eval-harness/`,
`skills/agent-self-evaluation/`, `skills/agent-architecture-audit/`,
`skills/agent-introspection-debugging/`, `agents/agent-evaluator.md` (MIT). Uso interno Kolden.*
