---
name: programa-de-indicacao
description: >
  Desenha, lança e otimiza programas de INDICAÇÃO e AFILIADOS — o loop de
  crescimento em que o cliente (ou parceiro externo) faz a aquisição por você.
  Cobre as mecânicas do loop, escolha entre indicação de cliente vs. afiliado,
  desenho de incentivo (o quê, quando, para quem), momentos-gatilho, mecânica de
  compartilhamento, padrões reais (double-sided/Dropbox, embaixador por tier,
  gatilho por marco, janela de atribuição) e o framework de medição (incluindo
  coeficiente de viralidade K). Use quando o pedido for "programa de indicação",
  "indique um amigo", "programa de afiliados", "boca a boca", "embaixador de marca",
  "link de indicação", "loop de viralização" ou "crescer por indicação". É o
  sistema, não só a ideia de "pedir indicações".
metadata:
  type: reference
---

# Programa de Indicação — fazer o cliente crescer por você

Um programa de indicação que compõe é diferente de um que junta poeira. A
diferença está nas mecânicas: loop, gatilhos, incentivos e medição certos para
o cliente (ou o parceiro) fazer a sua aquisição.

## Antes de começar
Levante: **produto e cliente** (o que vende, quem é o cliente ideal e o que ele
ama, LTV médio — define o teto do incentivo, CAC atual por outros canais);
**metas do programa** (mais cadastros / mais receita / alcance de marca; B2C ou
B2B; cliente indicando cliente OU parceiro promovendo); **estado atual** (se
otimizando: o que existe, métricas, estrutura de recompensa, onde o loop quebra).

## Três modos
1. **Desenhar do zero** — loop (4 estágios) → tipo (cliente vs. afiliado) → incentivo → momentos-gatilho → mecânica de compartilhamento → medição.
2. **Otimizar existente** — audite métricas vs. benchmark, ache o elo fraco (baixa consciência / baixa taxa de compartilhamento / baixa conversão / fricção da recompensa), faça UM ajuste focado e meça antes do próximo.
3. **Lançar afiliados** — tiers + comissão → recrutar parceiros iniciais → kit do afiliado (links, assets, copy) → tracking e payout → ativar os 10 primeiros.

## Indicação de cliente vs. afiliado — escolha a mecânica certa
| | Indicação de cliente | Programa de afiliado |
|---|---|---|
| Quem promove | Seus clientes atuais | Parceiros externos, publishers, influenciadores |
| Motivação | Lealdade, recompensa, moeda social | Comissão, alinhamento de audiência |
| Melhor para | B2C, prosumer, SaaS SMB | SaaS B2B, alto LTV, nichos de conteúdo |
| Ativação | Disparada pelo momento "aha"/marco | Recrutado e ativado proativamente |
| Payout | Crédito, desconto, recompensa | Revenue share ou valor fixo por conversão |
| Escala | Com a base de usuários | Com o recrutamento de parceiros |

**Regra de bolso:** clientes entusiasmados e sociais → comece por indicação de cliente. Clientes que compram em nome de um time → comece por afiliados.

## Padrões reais que funcionam (detalhes em `references/mecanicas-de-programa.md`)
- **Double-sided / Dropbox** — recompensa para os dois lados, intrínseca ao produto (storage, créditos, assentos). Não dê vale-presente avulso copiando o Dropbox; amarre ao valor do produto.
- **Embaixador por tier** — recompensa cresce com volume de indicações; topo ganha status/acesso. Para comunidades fortes, status bate dinheiro.
- **Gatilho por marco** — recompensa só quando o indicado atinge um marco real (primeira compra, upgrade). Reduz fraude e força uso real.
- **Janela de atribuição** — B2C 7-14 dias, B2B SMB 30, B2B enterprise 90+. Janela aberta = contabilidade suja e gaming.
- **Tiers de comissão por tipo de parceiro** — quanto melhor o tráfego e maior o ticket, maior a comissão pode ser.
- **Indicação embutida no produto** — virality by design (ex.: "Powered by [Produto]" em todo convite), não um e-mail "indique um amigo" parafusado depois.

## Métricas-chave (semanal)
| Métrica | Fórmula | Por que importa |
|---|---|---|
| Taxa de indicação | indicações enviadas / usuários ativos | Saúde do programa |
| % de indicadores ativos | usuários com ≥1 indicação / ativos | Profundidade de engajamento |
| Conversão de indicação | indicações convertidas / enviadas | Qualidade do tráfego indicado |
| CAC via indicação | custo de recompensa / novos clientes | Economia vs. outros canais |
| Contribuição de receita | receita de indicados / total | Impacto no negócio |
| Coeficiente K | indicações por usuário × conversão | K > 1 = crescimento viral |

Benchmarks por indústria e checklist de lançamento de afiliados estão em `references/mecanicas-de-programa.md`.

## Gatilhos proativos
Pedir indicação no cadastro (antes do valor — mate isso, mova para o pós-"aha") · recompensa <5% do LTV com taxa baixa (matemática quebrada) · sem notificação instantânea ao indicador (loop quebra) · mensagem de compartilhamento genérica (reescreva em 1ª pessoa, voz do cliente) · atribuição que para na landing page · afiliado sem kit de parceiro.

## Cruzamentos
- **`sequencia-de-nutricao`** — escreve os e-mails de gatilho e a notificação de recompensa.
- **`motor-de-lancamento`** — para o go-to-market de um produto; indicação é mecânica e timeline diferentes.
- **Pluto** (ofertas) dimensiona incentivo contra LTV/CAC. Tracking/payout: tokens via Infisical.

---
**Procedência:** método adaptado da skill `referral-program` de
`alirezarezvani/claude-skills` (`SKILL.md` + `references/program-mechanics.md` +
`references/measurement-framework.md`), @4a3c05b69e64f4925f7fc65c88890f614f79caf0,
licença MIT. Des-personalizado, traduzido e reescrito em pt-BR; sem cópia literal.
