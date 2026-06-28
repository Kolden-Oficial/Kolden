---
name: validacao-de-skill
description: Use antes de entregar/registrar uma habilidade nova ou alterada, ou quando houver dúvida se uma habilidade realmente muda o comportamento do agente (e não só "parece boa"). Cobre teste A/B com-skill vs baseline, validação de gatilho (trigger eval) e teste de pressão por subagente.
---

# Validação de habilidade

Criar uma habilidade **é TDD aplicado a documentação de processo**: você não sabe se ela
funciona até **ver o agente falhar sem ela** e **cumprir com ela**. Esta habilidade é o gate de
qualidade da Fase 5.3/6 do Ritual para habilidades — em especial as de *disciplina* (que
impõem uma regra sob pressão). Sem este teste, "a skill parece ótima" não é evidência.

## Princípio: RED → GREEN → REFACTOR para habilidades
1. **RED (baseline)** — rode o cenário **sem** a habilidade, em contexto fresco. Documente o
   comportamento real: que escolhas o agente fez? que **racionalizações** usou (verbatim)? que
   pressão disparou a violação? *Se o controle não exibe a falha, não há o que corrigir — pare,
   não escreva a habilidade.*
2. **GREEN (habilidade mínima)** — escreva só o que ataca aquelas racionalizações específicas.
   Nada de conteúdo para casos hipotéticos. Rode os mesmos cenários **com** a habilidade; o
   agente deve cumprir.
3. **REFACTOR (fechar brechas)** — achou nova racionalização? Adicione o contra-argumento
   explícito e re-teste até ficar à prova de bala.

## A. Teste A/B — com-skill vs baseline
Para cada prompt de teste, **dois subagentes em paralelo, mesma tarefa**:
- **Com-skill**: prompt + caminho da habilidade → saída em `_workspace/iteracao-N/eval-{id}/com-skill/`.
- **Baseline**: o mesmo prompt, **sem** a habilidade → `_workspace/iteracao-N/eval-{id}/sem-skill/`.

Baseline por situação:
| Situação | Baseline |
|---|---|
| Habilidade nova | rodar sem habilidade, mesmo prompt |
| Habilidade alterada | versão **anterior** da habilidade (preserve o snapshot) |

**Capture timing na hora**: `total_tokens` e `duration_ms` só estão acessíveis na notificação de
conclusão do subagente — salve imediatamente, não dá para recuperar depois.

## B. Avaliação por assertion (channel objetivo)
Quando a saída é verificável objetivamente, defina **assertions** — descritivas, verdadeiro/falso,
que medem o **valor diferencial** da habilidade.
- **Boa assertion**: objetiva e ligada ao núcleo da habilidade ("coluna de margem foi adicionada
  e ordenada desc").
- **Má assertion**: passa com ou sem a habilidade ("a saída existe") ou é subjetiva ("ficou bom").
- **Non-discriminating assertion**: passa 100% nas DUAS configurações → não mede nada. Remova ou
  troque por uma mais desafiadora.
- Se dá para checar por código, escreva um script (mais rápido, reusável por iteração).

Schema de resultado e papéis de avaliação (Grader / Comparator cego A/B / Analyzer estatístico)
em **`references/avaliacao-ab.md`**.

## C. Validação de gatilho (trigger eval)
A habilidade certa não adianta se não dispara na hora certa. Escreva **20 queries**: 10
**should-trigger** + 10 **should-NOT-trigger**, com foco em **casos de fronteira (near-miss)** —
não em exemplos óbvios.
- **Should-trigger**: mesma intenção em formulações variadas (formal/casual); casos em que o
  usuário **não** nomeia a habilidade mas claramente precisa dela; usos não-óbvios; casos onde
  esta habilidade **compete com outra** e deve vencer.
- **Should-NOT**: vizinhos próximos que **não** devem disparar (o "near-miss" que separa esta
  habilidade da irmã ao lado).
- Rode cada query e verifique se a `description`/`triggers` levam (ou não) à invocação. Falhou?
  Ajuste a **descoberta** (ver `descoberta-de-skill`), não o corpo. Detalhe e schema em
  `references/avaliacao-ab.md`.

## D. Micro-teste de redação antes do cenário completo
Cenário de pressão completo é o gate final, mas é lento/caro por iteração. Antes, verifique a
**redação** com micro-testes:
1. Uma amostra de contexto fresco por chamada (subagente single-shot). System prompt = o
   contexto real onde a regra vai viver (a habilidade inteira), user message = a tarefa que tenta
   a falha.
2. **Sempre inclua um controle sem-regra.** Sem falha no controle → nada a corrigir.
3. **5+ repetições por variante.** Amostra única mente.
4. **Leia cada match sinalizado à mão** — eco de template e contra-exemplo citado se disfarçam de
   acerto; contagem automática supervaloriza falha e sucesso.
5. **Variância é métrica.** Quando a regra "pega", as repetições convergem para a mesma forma.
   Cinco interpretações diferentes = a redação não está vinculante; aperte a forma antes de
   adicionar palavras.

## E. Loop de iteração
1. Ajuste a habilidade. 2. Re-rode todos os casos em `iteracao-N+1/` (preserve as anteriores).
3. Apresente o resultado ao usuário comparando com a iteração anterior. 4. Colete feedback
(feedback vazio = "sem problemas"). 5. Repita.
**Princípios de ajuste:** generalize o feedback (correção estreita = overfitting); **remova o que
não gera valor** (se a transcrição mostra a habilidade mandando o agente fazer trabalho
improdutivo, corte); explique o **porquê**; **bundle** scripts que reaparecem toda iteração.
**Parada:** usuário satisfeito, ou feedback todo vazio, ou sem melhoria significativa.

## Persuasão como ferramenta de disciplina
Habilidades de disciplina dependem de **moldar comportamento sob pressão**. Os princípios de
persuasão (autoridade/"YOU MUST", compromisso/anunciar uso, escassez/"antes de prosseguir",
Red Flags de auto-checagem) são o que faz a regra "pegar" — e é exatamente o que o teste de
pressão mede. Catálogo em **`references/principios-de-persuasao.md`**.

## Gate de saída (Ritual)
- [ ] Baseline RED documentado (a falha existe sem a habilidade).
- [ ] A/B com assertions discriminantes; com-skill supera baseline de forma mensurável.
- [ ] Trigger eval: should-trigger e should-NOT passam (near-miss coberto).
- [ ] Habilidade de disciplina: cenário de pressão à prova de racionalização.
- [ ] Sem non-discriminating assertions sobrando.

## Habilidades relacionadas
- Para corrigir um gatilho que falhou: `descoberta-de-skill`. Para o corpo: `criacao-de-skill`.
- Maturity score do agente inteiro (Fase 7): especialista `testador`.
- Verificação de pontas soltas entre documentos do agente: `verificacao-de-alinhamento`.

---
*Fontes absorvidas (princípio extraído, reescrito em PT-BR, sem cópia literal):
`obra--superpowers@896224c4` — `writing-skills/SKILL.md` (RED-GREEN-REFACTOR de skill,
micro-teste de redação), `testing-skills-with-subagents.md`, `persuasion-principles.md`
(MIT, Jesse Vincent); `revfactory--harness@cceac68e` — `references/skill-testing-guide.md`
(A/B com-skill vs baseline, assertion/non-discriminating, Grader/Comparator/Analyzer, trigger
eval should/should-NOT, loop de iteração) (Apache-2.0). Uso interno Kolden.*
