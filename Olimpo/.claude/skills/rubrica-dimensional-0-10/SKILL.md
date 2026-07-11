---
name: rubrica-dimensional-0-10
description: >-
  Use para AVALIAR e MELHORAR qualquer plano, estratégia, entregável ou
  consolidação dentro do Olimpo — quando precisar de uma nota objetiva por
  dimensão em vez de um "está bom". Método: dá nota 0-10 a cada dimensão,
  descreve concretamente como seria o 10, e faz o trabalho de corrigir até
  chegar lá. Acione quando o Ronan pedir "avalia esse plano", "o que falta para
  ficar excelente", "dá uma nota", quando um executivo for revisar a própria
  entrega antes da subida, ou quando a consolidação do Zeus precisar de um filtro
  de qualidade antes da Dike. Reutilizável por qualquer um dos 8 deuses.
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Rubrica dimensional 0-10

"Está bom" não é um critério — é uma opinião. Esta rubrica torna o gosto
**depurável**: para cada dimensão relevante, você dá uma nota, explica
exatamente o que faltaria para virar um 10, e **então faz o trabalho** para
chegar lá. A nota nunca é o produto final; o produto é o plano melhor.

## O método (loop)

Para cada dimensão:

1. **Nota:** "Arquitetura de Informação: 4/10".
2. **Lacuna:** *por que* é um 4 e *como seria* um 10, em concreto. — "É 4 porque
   o plano não define hierarquia de conteúdo. Um 10 teria primário/secundário/
   terciário claros em cada tela."
3. **Corrige:** edita o plano/entregável para adicionar o que falta.
4. **Renota:** "Agora 8/10 — ainda falta a hierarquia de navegação no mobile".
5. **Pergunta** se há uma escolha genuína a resolver (decisão de gosto → leva ao
   Ronan, não decida sozinho).
6. **Corrige de novo → repete** até 10 ou até o Ronan dizer "bom o suficiente,
   segue".

## Como escolher as dimensões

Defina 5-9 dimensões próprias do domínio que está avaliando — não genéricas.
Exemplos por executivo:
- **Estratégia (Zeus):** clareza de visão, foco/priorização, vantagem
  defensável, alinhamento a 12 meses, risco mapeado.
- **Go-to-market (Apolo):** proposta de valor, ICP, mensagem, funil, canais.
- **Finanças (Plutos):** unit economics, margem, sensibilidade, caixa, ROI.

Regra: cada dimensão precisa de um 10 **descritível**. Se você não consegue
descrever como seria o 10, a dimensão está vaga demais — refine-a.

## "Mostre como é o 10"

Quando uma dimensão fica abaixo de 7, torne a lacuna **visceral**, não abstrata:
descreva em detalhe concreto (ou peça ao deus de domínio um exemplo do estado
ideal) como seria a versão 10/10. A distância entre "o que o plano descreve" e "o
que deveria ser" precisa ser sentida para mover a decisão.

## Releitura (re-run)
Numa segunda passada, dimensões em 8+ recebem passada rápida; dimensões abaixo de
8 recebem tratamento completo. Isso concentra o esforço onde ainda há ganho.

> Onde encaixa no Olimpo: na **subida**, cada executivo pode pontuar a própria
> seção `executivos[]` antes de assinar; e o Zeus pode rodar a rubrica sobre a
> `consolidacao` como gate de qualidade antes de a entrega seguir para a Dike.

---
*Técnica absorvida de `garrytan/gstack@11de390` (skill `plan-design-review`, "The 0-10 Rating Method"), licença MIT. Generalizada de revisão de UI para avaliação executiva multidomínio e reescrita em PT-BR — sem cópia literal.*
