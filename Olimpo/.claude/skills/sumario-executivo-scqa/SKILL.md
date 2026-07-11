---
name: sumario-executivo-scqa
description: Use quando QUALQUER chief que reporte ao Olimpo (Poseidon, Apolo, Hefesto, Hades, Atena, Plutos, Afrodite) precisar entregar um sumário executivo para o Zeus, para o board ou para um investidor — condensando situação, complicação, pergunta e resposta (SCQA) em uma pirâmide de conclusão-primeiro (Pyramid Principle). Skill COMPARTILHADA sem dono fixo — invocável por qualquer chief que reporte a C-level. Estrutura: 1 pergunta, 1 resposta, 3 pilares, evidência. NÃO use para copy de marketing (isso é Caliope) nem para relatório operacional detalhado (isso é dashboard, não sumário). Aqui é o filtro executivo: máximo de sinal, mínimo de tinta.
invocavel_por: qualquer chief que reporte ao Olimpo
tags: [scqa, pyramid-principle, sumario-executivo, comunicacao, olimpo, compartilhada]
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Sumário Executivo — SCQA + Pyramid Principle

Skill compartilhada do Olimpo. Existe porque **executivo tem 90 segundos**: se o sumário exige leitura sequencial de 3 páginas para chegar à conclusão, a decisão vira improviso. SCQA + Pyramid Principle invertem a ordem — conclusão primeiro, evidência sob demanda.

Precedente NOVO no acervo Kolden (2026-06-29): primeira skill compartilhada sem dono fixo de agente, viva no `.claude/skills/` do Olimpo. Registrado em `dados/padroes-aprendidos.yaml` (padrão "skill compartilhada").

## Herança histórica

- **Barbara Minto** ("The Pyramid Principle", 1978; ex-consultora McKinsey) — codificou o Pyramid Principle: começar pela conclusão (governing thought), suportar com 3 argumentos MECE (Mutually Exclusive, Collectively Exhaustive), cada um lastreado em evidência. Insight: executivo lê top-down; escritor pensa bottom-up. Traduzir do modo de pensar para o modo de ler é o trabalho.
- **SCQA framework** (McKinsey, popularizado por Minto e depois codificado em manuais internos como padrão de abertura) — Situation, Complication, Question, Answer. Insight: toda comunicação executiva bem-feita responde a uma pergunta implícita; nomear a pergunta faz o resto se organizar sozinho.
- **Roman Empire Communication** — Julius Caesar cunhou "Veni, Vidi, Vici" — resposta antes da narração. Modelo antigo do princípio: quando o tempo do interlocutor é escasso, conclusão vem primeiro.
- **Chip Heath & Dan Heath** ("Made to Stick", 2007) — princípio SUCCES; Simple + Concrete são operacionalizados exatamente pelo SCQA. Insight: ideia executiva grude quando é simples de repetir e concreta em prova.

## SCQA — a abertura

Toda comunicação executiva começa com 4 blocos curtos, na ordem:

**S — Situation** (contexto conhecido)
- Fato estabelecido que o leitor já aceita como verdadeiro.
- 1-2 frases. Não é história — é ancoragem.
- Se o leitor não concorda com a Situation, você abriu no ponto errado.

**C — Complication** (o que mudou / o que dói)
- O que aconteceu de novo que quebra a Situation, ou o problema latente.
- 1-2 frases. Concreto, com número quando cabe.
- É a "tensão" que justifica o sumário existir.

**Q — Question** (a pergunta implícita)
- A pergunta que o leitor faz na cabeça ao ler a Complication.
- 1 frase. Direta. Ex: "O que fazemos?", "Devemos continuar investindo?", "Aprovamos o cheque?"
- Nomear a pergunta obriga o autor a responder DE FATO — não desviar.

**A — Answer** (a resposta / recomendação)
- A conclusão em 1 frase.
- Ativa: "Recomendamos X", "Decidimos por Y", "Precisamos de Z até data W".
- É a "conclusão primeiro" do Pyramid Principle.

Exemplo (mercado):
> **S**: A Kolden opera hoje 12 squads ativos com margem consolidada de 42%.
> **C**: Nos últimos 90 dias, 2 squads chegaram a limite de capacidade e recusaram 8 briefings; simultaneamente, o CAC subiu 30% no canal principal.
> **Q**: Devemos expandir capacidade agora ou reprecificar antes?
> **A**: Reprecificar em +18% no tier melhor (validado em van Westendorp N=45), congelar expansão por 60 dias, retomar contratação após leitura.

## Pyramid Principle — a estrutura

Após o SCQA, a pirâmide sustenta a Answer com **3 pilares MECE**:

```
            [Answer / Governing Thought]
                        |
       -------------------------------------
       |                |                  |
   [Pilar 1]        [Pilar 2]          [Pilar 3]
    (why)            (why)               (why)
       |                |                  |
   evidência       evidência          evidência
```

Regras:
- **3 pilares** — menos parece raso; mais parece disperso. Se você tem 5, agrupe em 3.
- **MECE** — Mutually Exclusive (não sobrepõem), Collectively Exhaustive (juntos cobrem 100% do "porquê" da Answer).
- **Cada pilar em 1 sentença** — encabeça um parágrafo curto. Sentença é a conclusão do pilar, não a evidência.
- **Evidência sob cada pilar** — dado, citação, exemplo. 2-4 pontos.
- **Ordem por peso** — pilar mais forte primeiro (dominante); ordem invertida (menos → mais) é padrão narrativo, não executivo.

Continuando o exemplo:

> **Reprecificar em +18% no tier melhor, congelar expansão por 60 dias, retomar contratação após leitura.**
>
> **1. WTP suporta o novo preço.** van Westendorp (N=45) mostra OPP R$X (18% acima do atual), PME R$Y (32% acima). Faixa aceitável cobre a mudança com folga.
>
> **2. Capacidade atual comporta demanda pós-reprecificação.** Modelo de elasticidade da base atual: churn projetado ≤ 8% no tier melhor após reajuste; capacidade dos 12 squads absorve o restante sem gargalo por 60 dias.
>
> **3. Congelar expansão captura sinal antes de comprometer capital.** Contratar 6 pessoas para squads saturados agora custa R$X/mês irreversível; congelar 60 dias permite ler o efeito da reprecificação antes de expandir. Trade-off explícito: perdemos velocidade se leitura confirmar; ganhamos disciplina se leitura desmentir.

## Formato final — 1 página

Um sumário executivo bem feito cabe em 1 página (400-600 palavras):

1. **Cabeçalho** (autor, data, para quem, decisão pedida).
2. **SCQA** (4 blocos curtos).
3. **Pyramid** (Answer bolded + 3 parágrafos de pilar com evidência).
4. **Decisão pedida** em destaque (checkbox: aprovar / rejeitar / discutir).
5. **Anexos** (link para dado, cálculo, doc de detalhe — não corpo).

## Tipos de sumário por audiência

| Audiência | Ênfase | Métrica dominante |
|---|---|---|
| Zeus/CEO | Direção estratégica + trade-off | Impacto na visão |
| Board | Decisão pedida + risco | Retorno/risco/prazo |
| Investidor | Confiança + guidance | Runway, KPI vs plano |
| Chief peer (outro deus) | Handoff acionável | O que precisa dele |

## Anti-padrões

- **Narrativa cronológica** — "primeiro fizemos X, depois Y, então Z" enterra a conclusão.
- **Conclusão no último parágrafo** — inversão fatal do Pyramid Principle.
- **Pilar que não é MECE** — 3 pilares que se sobrepõem confundem em vez de reforçar.
- **Evidência sem lastro** — "os dados mostram" sem citar fonte é opinião com maquiagem.
- **Answer vaga** — "devemos considerar" não é resposta; é evasão.
- **Sumário > 1 página** — se não coube em 1, o sumário virou relatório. Detalhe vai para anexo.
- **SCQA sem Q nomeada** — pular a Question faz a Answer parecer não-solicitada.

## Aplicação Kolden

- Toda subida de Contrato de Missão do executivo ao Zeus vem com SCQA + Pyramid do resultado do executivo.
- Board pack trimestral (do Plutos, via `investor-relations`) usa esta skill para o executive summary de abertura.
- Consolidação do Zeus na descida final ao Ronan usa esta skill para o veredito.
- Handoff cross-squad crítico (ex: Plutos → Peitho para congelar mídia) usa SCQA para deixar o pedido inequívoco.

## Entregável

```yaml
sumario_scqa:
  para: "<zeus | board | investidor | chief_par>"
  autor: "<chief invocador>"
  data: "<>"
  decisao_pedida: "<aprovar | rejeitar | discutir>"
  scqa:
    situation: "<1-2 frases>"
    complication: "<1-2 frases>"
    question: "<1 frase>"
    answer: "<1 frase — governing thought>"
  pyramid:
    pilar_1: {sentenca, evidencia}
    pilar_2: {sentenca, evidencia}
    pilar_3: {sentenca, evidencia}
  anexos: ["<link>"]
```

## Guardrails

- Se não cabe em 1 página, não é sumário — é relatório.
- Answer deve ser ativa e específica; verbo de decisão, não hedge.
- Question nomeada explicitamente, não implícita.
- 3 pilares MECE; se não fica MECE, reagrupe.
- Evidência sob cada pilar com fonte ou cálculo referenciado.
- Skill compartilhada — sem dono de agente; qualquer chief do Olimpo invoca.
- Cross com dados reais quando o sumário afirma número (Pactolo/Metis).

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT) — IDs G5+G6 do bucket B10 (support), fundidos em skill compartilhada. Barbara Minto (Pyramid Principle) + convenção McKinsey (SCQA).*
