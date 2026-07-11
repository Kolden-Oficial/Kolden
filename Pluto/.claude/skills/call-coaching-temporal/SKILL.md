---
name: call-coaching-temporal
description: >
  Use quando revisar gravação de call de vendas. Feedback temporal-específico (timestamp +
  comportamento observado + alternativa exata + porquê). Métricas calibradas: talk-listen ratio,
  perguntas abertas vs fechadas, tempo até pergunta de descoberta, objeções tratadas. Saída: lista de
  momentos específicos com alternativas, não relatório genérico. Gatilhos: "review de call",
  "feedback de ligação", "analisar call", "talk-listen ratio", "revisar gravação", "que tal essa call".
  Dono: hormozi-sales-coach.
domain: sales-coaching
subdomain: call-review
agente_dono: [hormozi-sales-coach]
tags: [call-coaching, talk-listen, behavioral-feedback, timestamp-feedback]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G7)
status: semente
tipo: skill
area: Pluto
up: "[[Pluto/_MOC-pluto]]"
---

# Call Coaching Temporal — feedback por timestamp + alternativa

> **Atribuição:** princípio reescrito (sem cópia literal) de `msitarzewski/agency-agents@a597cb6` (MIT).
> Bucket B06 do Ritual de Absorção — 2026-06-29.

Review de call específica entregando 3-5 momentos com timestamp + comportamento observado + alternativa
exata + porquê. Nunca "ficou bom" ou "fala demais".

## 1. Quando acionar

- Rep entregou uma gravação de call (ou link/transcrição) e pediu review.
- Coach quer alimentar a sessão OASP da semana com material específico.
- Análise de call estratégica (deal grande, account-saving, kickoff).

**NÃO use para:** review de 30 calls em massa (vira ruído — escolhe 1-3 representativas), feedback
geral sobre "como o rep está" (use métricas agregadas do CRM, não call review), revisar call de
discovery enterprise multi-stakeholder (esse é Êmporos, escopo diferente).

## 2. Formato do feedback

Cada momento entregue como:

```
[HH:MM:SS] [O QUE FOI DITO/FEITO observado, literal quando possível]
→ Alternativa: "[frase/ação exata que o rep deveria ter usado]"
→ Porque: [razão de impacto na call — em UMA frase]
```

Exemplo:
```
[02:15] Rep: "Tá caro mesmo, posso dar 10% de desconto." (Cliente acabou de dizer "ainda tá caro".)
→ Alternativa: "Entendo. Antes de falar de preço, me ajuda a entender — você calculou em quanto tempo espera o retorno?"
→ Porque: Desconto sem justificativa ensina o cliente a sempre pedir desconto, e neutraliza o valor da oferta.
```

Saída: **3-5 momentos por call**. Mais que isso vira ruído; menos não é coaching, é nota.

## 3. Métricas-base (calibre o feedback contra dados)

### Talk-listen ratio (rep / cliente)
- **Ideal:** 30-40% rep / 60-70% cliente
- **Sinal negativo:** rep > 50% — está vendendo em vez de diagnosticar
- **Como medir:** transcrição com diarização (Speechmatics/Deepgram) ou estimativa de % de palavras

### Perguntas abertas vs fechadas
- **Ideal:** 70% abertas / 30% fechadas
- **Sinal negativo:** maioria fechada (sim/não) — rep não consegue descobrir contexto
- **Como identificar:** perguntas começando com "Como/Por que/O que/Me conta" = abertas. "Você usa X?" = fechada.

### Tempo até 1ª pergunta de descoberta
- **Ideal:** < 90s da abertura da call
- **Sinal negativo:** > 3min — rep ficou preso em rapport ou foi direto para pitch
- **Como medir:** carimba o timestamp da primeira pergunta substantiva sobre o problema do cliente

### Objeções tratadas
- **Track:** # objeções DETECTADAS pelo coach vs # objeções RESPONDIDAS pelo rep
- **Sinal negativo:** detectou 3, respondeu 1 — rep não percebeu 2 (ou ignorou)
- **Como detectar objeção:** frase de hesitação, pergunta sobre preço/prazo/concorrente, silêncio prolongado após preço

## 4. Estrutura sugerida do output

```markdown
# Review da call [data] — rep [nome] × cliente [empresa]

## Métricas
- Talk-listen ratio: X% rep / Y% cliente (ideal 30-40/60-70) — [status]
- Perguntas abertas: Z% (ideal 70%) — [status]
- Tempo até 1ª descoberta: HH:MM (ideal <90s) — [status]
- Objeções: N detectadas / M respondidas

## 3 momentos para coachar
[bloco 1 — timestamp + alternativa + porquê]
[bloco 2 — ...]
[bloco 3 — ...]

## Item da semana (UM)
O que o rep vai trabalhar até a próxima call: [item específico extraído da lista acima, priorizado por alavanca]
```

## 5. Anti-padrões

| Padrão errado | Por quê |
|---|---|
| "Ficou bom" / "Esse foi melhor" | Feedback vazio — não muda comportamento |
| "Você fala demais" | Genérico — rep não sabe ONDE corrigir |
| Mostrar métrica sem o porquê do impacto | Rep vê número mas não internaliza ação |
| Ignorar talk-listen porque a call fechou | Mascara problema de processo; vai estourar em call mais difícil |
| 15 itens por call | Vira ruído; ninguém muda 15 comportamentos por semana |
| Review escrito sem role-play depois | Feedback no papel morre; precisa virar OASP na sessão semanal |

## 6. Handoff

- **Para `coaching-oasp`:** o "Item da semana" extraído vira o foco do OASP da semana — Observe (já feito aqui), Ask, Suggest, Practice.
- **Para `ramp-30-60-90`:** se métricas estão fora do ideal e rep está em ramp, isso atrasa o marco — gate de competência não passou.
- **Para `hormozi-chief`:** se 5+ calls do mesmo rep mostram talk-listen ruim apesar de coaching, problema pode não ser execução individual — é estrutura/oferta/processo.
