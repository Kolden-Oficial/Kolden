# Rubricas, graders e as 12 camadas — referência da avaliação de agente

Dados densos extraídos do bucket; o corpo da `SKILL.md` aponta para cá.

## Mapeamento jornada do PRD → eval

Cada caso de uso do PRD (§ casos de uso / jornada) vira pelo menos uma eval. Esquema:

```yaml
eval:
  id: <slug-do-caso>
  origem: "PRD §<n> — <nome do caso de uso>"
  tipo: capacidade | regressao
  contexto: |
    Estado inicial / prompt que instancia o cenário (contexto fresco).
  criterios:            # verdadeiro/falso, discriminantes
    - "<critério 1 ligado ao núcleo do comportamento>"
    - "<critério 2>"
  grader: deterministico | por-modelo | humano
  k: 3                  # nº de repetições (pass@k)
  baseline: <SHA|checkpoint|n/a>   # obrigatório em eval de regressão
```

**Critério bom** = objetivo e ligado ao núcleo ("o agente roteou para o squad X e aplicou o
portão de aprovação"). **Critério ruim** = passa com ou sem o comportamento ("a saída existe") ou
é subjetivo ("ficou bom"). Critério que passa 100% nas duas pontas não mede nada — troque.

## Esquema do scorecard (maturity score, Fase 7)

```yaml
maturity:
  agente: <NomeMitológico>
  data: <YYYY-MM-DD>
  evals:
    - id: <slug>; passou: 3/3; custo_tokens: <n>; duracao_ms: <n>
  eixos:                # quando há auto-avaliação por 5 eixos
    acuracia:      { nota: 1-5, evidencia: "<gap ou prova>" }
    completude:    { nota: 1-5, evidencia: "..." }
    clareza:       { nota: 1-5, evidencia: "..." }
    acionabilidade:{ nota: 1-5, evidencia: "..." }
    concisao:      { nota: 1-5, evidencia: "..." }
  score_geral: <média, 1 casa>     # gate: ≥7.0 (escala 0-10) para avançar Fase 7→8
  melhorias: [ "<1-3, ranqueadas por impacto>" ]
```

A média dos 5 eixos (1–5) é convertida para 0–10 quando alimenta o gate ≥7.0 do Ritual.

## Três graders — quando usar cada um

| Grader | Quando | Forma |
|---|---|---|
| Determinístico | a saída é verificável por código | `grep -q`, exit code, `pytest`, `build` → PASS/FAIL |
| Por modelo | saída aberta (texto, design, decisão) | subagente com rubrica → nota 1-5 + justificativa |
| Humano | risco/sensibilidade alta (LGPD, marca, dinheiro) | flag `[REVISÃO HUMANA]` + risco LOW/MEDIUM/HIGH |

Prefira determinístico sempre que possível: mais rápido, reusável a cada iteração, sem viés do
avaliador-modelo. Reserve o grader por modelo para o que não tem checagem objetiva.

## As 12 camadas do stack de agente (auditoria de regressão)

Todo agente tem estas camadas; qualquer uma corrompe a resposta. Audite na ordem quando o agente
"piorou" sem mudança de modelo.

| # | Camada | O que dá errado |
|---|---|---|
| 1 | System prompt | instruções em conflito, inchaço de instrução |
| 2 | História de sessão | injeção de contexto velho de turnos anteriores |
| 3 | Memória de longo prazo | poluição entre sessões; tópico antigo em conversa nova |
| 4 | Distilação | artefato comprimido reentra como pseudo-fato |
| 5 | Recall ativo | camadas redundantes de re-sumário queimando contexto |
| 6 | Seleção de tool | roteamento errado; modelo pula a tool obrigatória |
| 7 | Execução de tool | execução alucinada — diz que chamou mas não chamou |
| 8 | Interpretação de tool | output da tool mal-lido ou ignorado |
| 9 | Formatação da resposta | corrupção de formato na resposta final |
| 10 | Rendering/plataforma | camada de transporte (UI/API/CLI) muta resposta válida |
| 11 | Loops de reparo ocultos | agente de fallback/retry silencioso roda 2º passe de LLM |
| 12 | Persistência | estado expirado/cache reusado como evidência viva |

### Padrões de falha mais comuns
- **Regressão de wrapper** — modelo certo no playground, errado dentro do agente; "funcionava
  antes da última camada". Bisseccione as camadas adicionadas.
- **Contaminação de memória** — tópico velho vaza; correção do usuário não gruda; memória cresce
  sem limite e degrada. Verifique camadas 2–5.
- **Falha de disciplina de tool** — "deve usar tool X" no prompt mas o modelo responde sem chamar,
  ou alucina o resultado. O guardrail tem de ser **código** (reflexo), não só texto no prompt.
- **Corrupção de transporte** — resposta interna correta, camada 10 muta na entrega. Compare o
  payload bruto do modelo com o que chega ao usuário.

---
*Fonte: `affaan-m/everything-claude-code@2bc924f` (`agent-architecture-audit`, `eval-harness`,
`agent-eval`, `agent-self-evaluation`) — MIT. Reescrito em PT-BR, sem cópia literal.*
