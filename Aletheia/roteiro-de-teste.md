---
tipo: nota
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
relacionado:
  - "[[Aletheia/README|README]]"
---

# Roteiro de Teste — Aletheia (Fase 7: Teste de Comportamento)

Smoke tests derivados da jornada do PRD. Cada teste tem um comportamento esperado e um critério
de aprovação. **Gate: maturity score ≥ 7.0.**

## T1 — Roteamento por estágio
**Entrada:** "Tenho uma ideia de app de gestão financeira para autônomos. Vale a pena?"
**Esperado:** o `aletheia-chief` identifica estágio = problema, nomeia a assunção mais arriscada,
dá uma resposta rápida e roteia para `rob-fitzpatrick` (+ `steve-blank`). NÃO pula para solução/MVP.
**Aprova se:** estágio correto + assunção nomeada + rota de descoberta.

## T2 — Veto de build sem evidência (o teste crítico)
**Entrada:** "Já decidi, quero só construir o MVP e lançar essa semana."
**Esperado:** **HALT.** O squad expõe as assunções não testadas, recusa recomendar build e propõe
o menor experimento para a assunção mais arriscada.
**Aprova se:** não há recomendação de build; o veto dispara; devolve o que falta validar.

## T3 — Auditoria de entrevista enviesada
**Entrada:** "Meu roteiro pergunta: 'Você usaria um app que faz X? Pagaria R$29/mês?'"
**Esperado:** `rob-fitzpatrick` sinaliza as perguntas como hipotéticas/enviesadas e reescreve no
estilo Mom Test (fatos do passado).
**Aprova se:** identifica o viés + reescreve + explica por que opinião não é evidência.

## T4 — Jornada completa
**Entrada:** `*journey` com uma ideia qualquer.
**Esperado:** percorre as 6 fases (descoberta → necessidade → assunções → experimento → demanda →
decisão), com checkpoint em cada uma, e termina com veredito perseverar/pivotar/parar.
**Aprova se:** todas as fases acionam o especialista certo + decisão final fundamentada.

## T5 — Sizing pragmático
**Entrada:** "O mercado é gigante, são 50 milhões de autônomos no Brasil — já é prova de demanda?"
**Esperado:** `alberto-savoia` recusa o TAM de cima pra baixo como prova, formula a XYZ hypothesis
e propõe um pretotype para skin-in-the-game data + sizing bottom-up.
**Aprova se:** recusa o TAM como prova + propõe teste de demanda real.

## T6 — Handoff
**Entrada:** uma validação que passou no gate, com dor e demanda comprovadas.
**Esperado:** o squad monta o pacote de handoff e nomeia o squad de destino (ex.: Pluto para
oferta/preço, Prometeu para build).
**Aprova se:** handoff correto + artefato nomeado + não tenta executar ele mesmo.

## T7 — Segurança (Infisical)
**Entrada:** pedido que tente gravar uma chave de API em texto puro.
**Esperado:** o reflexo `pre-ferramenta.sh` bloqueia (exit 2); orienta usar Infisical.
**Aprova se:** bloqueado mecanicamente.

---

## Planilha de maturidade

| Teste | Peso | Resultado | Nota (0-10) |
|---|---|---|---|
| T1 Roteamento | 1.0 | | |
| T2 Veto de build | 2.0 (crítico) | | |
| T3 Entrevista enviesada | 1.5 | | |
| T4 Jornada completa | 1.5 | | |
| T5 Sizing | 1.0 | | |
| T6 Handoff | 1.0 | | |
| T7 Segurança | 1.0 | | |

**Maturity score** = média ponderada. Gate ≥ 7.0. T2 e T7 são bloqueantes (falha = reprovação).
