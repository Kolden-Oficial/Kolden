<!--
Atribuição: adaptado de msitarzewski/agency-agents@a597cb6
(project-management/, gap G18 do diagnóstico de absorção).
Licença upstream: MIT. Adaptação Kolden — sem cópia literal; PT-BR.
-->
---
name: comunicacao-executiva
description: |
  Use quando comunicar a board / investidor / liderança / parceiro estratégico C-level. Segmentação
  por audiência, framing por impacto de negócio (não por feature), formato 1-página executiva,
  decisão pedida sempre em destaque. NÃO substitui Cairos gestor-de-stakeholders (operacional)
  nem Pheme (público externo / mass media).
domain: estrategia-executiva
subdomain: communication
agente_dono: [zeus]
tags: [board, investidor, comunicacao-executiva, framing, 1-pagina, decisao-pedida]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G18)
status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)
---

# Comunicação Executiva

Habilidade de **comunicação C-level / board-level**. Segmentar audiência, enquadrar por impacto, formatar em 1 página, sempre com a **decisão pedida em destaque**.

## Audiências canônicas (segmentação)

| Audiência | Profundidade | Tom | Foco |
|---|---|---|---|
| **Conselho / Board** | Resumo executivo + anexo técnico | Direto, sem hedging | Decisão pedida + risco residual |
| **Investidor** | 1 página + apêndice opcional | Confiante, com dados | Tese + tração + ask |
| **Time de liderança** | Direto, com contexto operacional | Aberto, debate-friendly | Trade-offs + ação |
| **Operacional (time)** | Mais detalhe | Energético, ownership | O que muda no dia-a-dia |
| **Parceiro estratégico** | Foco em valor mútuo | Profissional, recíproco | Win-win + próximo marco |

**Regra de ouro:** mesma notícia, comunicações diferentes. Board ≠ time ≠ investidor. Usar a mesma mensagem para todos é sinal perdido.

## G18 — Framing por impacto, não por feature

A primeira frase **sempre** começa pelo impacto de negócio. Feature / output é insumo, não a notícia.

**Errado:** "Lançamos a v2.3 com 14 novas funcionalidades."
**Certo:** "Reduzimos churn em 18% no Q3 com 2 mudanças (X e Y)."

**Errado:** "Construímos infraestrutura nova."
**Certo:** "Aumentamos margem em 5pp; investimento se paga em 7 meses."

**Errado:** "Migramos para Postgres."
**Certo:** "Cortamos custo de infra em 40% e ganhamos 3x em latência."

**Regra:** toda afirmação de comunicação executiva começa por **impacto de negócio**. A feature entra depois, como mecanismo — não como manchete.

## Formato 1-página executiva (canônico)

```markdown
# [Título: impacto de negócio em 1 frase]

## Decisão pedida
[O que precisamos do leitor — em destaque, no topo. Imperativo claro.]

## Estado atual (3-5 bullets)
- [Fato + número]
- [Fato + número]
- [Fato + número]

## Recomendação
[Frase imperativa: "Aprovar X" / "Aumentar investimento em Y" / "Parar Z"]

## Trade-offs
- **Se sim:** [consequência positiva + custo real]
- **Se não:** [consequência negativa + economia]

## Riscos
- [Risco 1 + mitigação]
- [Risco 2 + mitigação]

## Anexo (opcional)
[Detalhe técnico para quem quiser aprofundar]
```

**Decisão pedida sempre no topo.** Board lê o título, a decisão pedida e a recomendação. Se a decisão estiver na página 12, ela não é tomada.

## Anti-padrões

- **"Update genérico" sem decisão pedida** — vira newsletter ignorada. Toda comunicação executiva pede algo (aprovação, recurso, posicionamento) ou informa de marco crítico — nunca "só atualiza".
- **20 slides de feature sem 1 número de impacto** — sinaliza falta de leitura de negócio.
- **Hedging executivo em decisão crítica** — "talvez", "poderíamos", "estamos avaliando" enfraquecem o sinal. C-level decide; comunique a decisão, não o conflito interno.
- **Mais que 1 página sem necessidade** — board não lê. Apêndice resolve quem quiser detalhe.
- **Mesma comunicação para board e operacional** — audiência errada = sinal perdido. Reescreva.
- **Decisão pedida no slide 12** — vai no slide 1. Quem quiser contexto vai pro slide 2.
- **Impacto sem número** — "melhoramos a conversão" não é impacto; "+12pp de conversão" é.
- **Número sem comparação** — "R$ 200k em receita" sem dizer de quê, contra quê — número solto não convence.

## Cross-links

- **Cairos `gestor-de-stakeholders`** — templates de status **operacional** (patrocinador interno, time). Fronteira: Cairos = operacional; comunicacao-executiva = C-level.
- **Pheme** — comunicação **pública** (mass media, social, marca). Fronteira: Pheme = externo / mass; comunicacao-executiva = interno C-level / board / investidor.
- **Themis (conselho consultivo)** — handoff para segunda opinião antes de comunicação grande (board pitch, anúncio público de pivot).
- **Olimpo `painel-executivo-autoplan`** — revisão executiva completa de plano (antes de virar comunicação ao board).
- **Olimpo `rubrica-dimensional-0-10`** — avaliação do plano em si antes de comunicá-lo.
- **Olimpo `portfolio-estrategico`** — quando a comunicação é sobre alocação / kill criteria de projeto.
