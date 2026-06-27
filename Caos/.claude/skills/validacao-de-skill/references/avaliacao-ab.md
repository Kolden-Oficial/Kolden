# Avaliação A/B, schema de scoring e trigger eval

Detalhe operacional carregado sob demanda. Fonte: `revfactory--harness@cceac68e`
(`references/skill-testing-guide.md`, Apache-2.0) + `obra--superpowers@896224c4`
(`testing-skills-with-subagents.md`, MIT). Reescrito em PT-BR.

## 1. Estrutura do workspace de avaliação
```
_workspace/
└── iteracao-N/
    └── eval-{id}/
        ├── com-skill/outputs/
        ├── sem-skill/outputs/
        ├── grading.json      ← resultado das assertions
        └── timing.json       ← total_tokens, duration_ms (capturado na notificação)
```
Preserve cada `iteracao-N/` — a comparação entre iterações é a evidência de melhoria.

## 2. Schema de scoring (`grading.json`)
```json
{
  "expectations": [
    { "text": "coluna de margem foi adicionada", "passed": true,
      "evidence": "coluna 'profit_margin_pct' presente em E" },
    { "text": "ordenado por margem desc", "passed": false,
      "evidence": "sem ordenação, ordem original mantida" }
  ],
  "summary": { "passed": 1, "failed": 1, "total": 2, "pass_rate": 0.50 }
}
```

## 3. Papéis especialistas de avaliação
- **Grader (avaliador)** — julga cada assertion passa/falha + evidência; extrai afirmações
  factuais da saída e cross-verifica; dá feedback sobre a própria eval (assertion fácil/ambígua).
- **Comparator (comparador cego)** — recebe as duas saídas anonimizadas em A/B, **sem saber qual
  usou a habilidade**, e julga qual é melhor (conteúdo: exatidão/completude; estrutura:
  organização/formato/usabilidade; nota geral). Use quando precisa confirmar com rigor "a nova
  versão é mesmo melhor?"; dispensável na iteração comum.
- **Analyzer (analista estatístico)** — varre os benchmarks por: non-discriminating assertions
  (passam nas duas configs), evals de alta variância (resultado muda muito por execução →
  instável), trade-off tempo/token (habilidade melhora qualidade mas encarece).

## 4. Trigger eval — 20 queries (10 + 10)
Objetivo: validar que a `description`/`triggers` disparam **só** quando devem.

**Critérios de qualidade da query:**
- Frase concreta e natural que um usuário real digitaria.
- Inclua detalhe concreto: caminho de arquivo, contexto pessoal, nome de coluna, nome de empresa.
- Misture comprimento, tom e formato.
- Foco em **fronteira (edge case)**, não em casos de resposta óbvia.

**Should-trigger (8–10):** mesma intenção em formulações variadas; usuário não nomeia a
habilidade mas precisa dela; usos não-óbvios; casos onde compete com outra habilidade e deve vencer.

**Should-NOT-trigger (8–10):** foco em **near-miss** — vizinhos que se parecem mas pertencem a
outra habilidade. É o que impede duas habilidades de brigarem pela mesma tarefa.

**Procedimento:** rode cada query em contexto fresco, registre se a habilidade foi (ou não)
invocada, compare com o esperado. Acurácia baixa em should-trigger → `description` fraca/abstrata.
Falsos positivos em should-NOT → `description` larga demais ou keyword genérica. Corrija via
`descoberta-de-skill` e re-rode.

> Auto-otimização de `description` (harness G40): split train/test 60/40 das queries + iteração
> automatizada via `claude -p`, máx 5 iterações para evitar overfit. **Diferido** na Kolden por
> custo e por exigir orquestração `claude -p` — registrar como incremental, não usar por padrão.

## 5. Tipos de pressão (cenário de disciplina)
Ao testar habilidade de disciplina, o cenário deve **tentar** o agente a violar a regra. Vetores:
- **Tempo** ("rápido, só dessa vez"), **custo afundado** ("já implementei, só falta o teste"),
  **autoridade** ("o lead disse que pode pular"), **exaustão** (fim de uma tarefa longa).
A habilidade passa quando resiste a todos sem racionalizar. Registre as racionalizações novas e
feche cada uma com um Red Flag explícito no corpo da habilidade.
