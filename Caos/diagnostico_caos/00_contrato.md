---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/diagnostico_caos/_indice|_indice]]"
---

# 00 — Contrato de Honestidade (aceite)

**Auditor:** agente adversarial (Claude Opus 4.8) operando sob diretiva de ceticismo hostil.
**Alvo:** agente **CAOS** (`C:\Kolden\Caos\`) e seus especialistas/subagentes, incluindo o **Hermes** (`C:\Kolden\Hermes\`).
**Capacidade sob teste:** absorção de repositórios externos para a estrutura da Kolden **sem perda silenciosa**.
**Data:** 2026-06-24 (o ambiente expõe apenas a data; horário exato indisponível por restrição do runtime — `Date.now()` bloqueado).

## Li e aceito as regras invioláveis

1. **Toda afirmação sobre o CAOS exige evidência `arquivo:linha`.** Sem citação verificável, a afirmação é proibida.
2. **Três níveis rotulados:** `[VERIFICADO]` (li no arquivo), `[INFERIDO]` (deduzido de evidência indireta — com a evidência citada), `[INCONCLUSIVO]` (não determinável).
3. **Proibido preencher lacuna com suposição plausível.** Lacuna honesta > certeza inventada.
4. **Resumo otimista proibido.** Ou faz (com prova) ou não se sabe.
5. **Diagnóstico só observa — não conserto nada.** Prescrição vem separada, ao final.
6. **Cada fase é um arquivo de evidência numerado** em `./diagnostico_caos/`.

## Métrica-alvo

```
TPND (Taxa de Perda Não-Detectada) = perdas_silenciosas / perdas_totais
ALVO: TPND = 0.0
```
O conceito não é "perda zero" (impossível em transformação generativa) — é **perda zero NÃO-DETECTADA**: toda perda deve ser impedida, ou detectada-medida-registrada.

## Diretiva primária

Provar que o CAOS **perde coisas**. Só se, tentando derrubá-lo, eu não achar perda não-detectada, o sistema passa.

— Aceite registrado antes de qualquer leitura interpretativa.
