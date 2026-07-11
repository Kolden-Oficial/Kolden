---
name: desenho-de-experimento
description: Desenha o menor experimento/MVP que testa a assunção mais arriscada e escreve o test card (hipótese / teste / métrica / critério de sucesso / critério de kill), combinando os tipos de MVP de Eric Ries com o Test Card de David Bland e o teste de demanda de Alberto Savoia. Use quando já existe uma assunção priorizada e é preciso prová-la barato.
tipo: skill
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
---

# Desenho de Experimento

Especialistas: `eric-ries` (tipo de MVP), `david-bland` (test card), `alberto-savoia` (demanda).

## Processo
1. **Pense ao contrário** (Build-Measure-Learn): o que aprender → o que medir → o que construir.
2. **Escolha o menor MVP** que testa a assunção mais arriscada:
   concierge · Wizard of Oz (Mágico de Oz) · landing/smoke test · single-feature · vídeo.
   Para testar DEMANDA, prefira pretotipagem (fake door, mechanical turk) → skin-in-the-game data.
3. **Escreva o Test Card:**
   - We believe that… (hipótese)
   - To verify, we will… (teste)
   - And measure… (métrica)
   - We are right if… (critério de sucesso)
   - We stop/pivot if… (critério de kill)
4. **Avalie a força da evidência**: o que as pessoas FAZEM (forte) > o que DIZEM (fraca).
5. **Sequencie** do mais barato/rápido para o mais caro/forte.

## Saída
Test card completo + tipo de MVP justificado como mínimo viável + leitura da força da evidência.

## Veto
HALT se faltar a métrica de validação OU o critério de kill. Sem os dois, não é experimento — é palpite.
