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
tipo: skill
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
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

---

## Absorção B02 (MKT-G39) — Quadro Growth (AARRR + LTV/CAC + North-star + Cadência)

Programa de indicação é UMA alavanca dentro do sistema maior de growth. Antes
de otimizar o programa isoladamente, verificar se ele está amarrado ao quadro
maior — senão você otimiza um K coeficiente com CAC quebrado no funil upstream.

### AARRR (funil pirata) — o mapa do growth

- **A**cquisition — como as pessoas chegam à marca.
- **A**ctivation — momento "aha" (primeiro valor entregue).
- **R**etention — voltam depois do primeiro uso/compra.
- **R**eferral — trazem outras pessoas.
- **R**evenue — pagam / pagam mais.

**Indicação vive em `Referral`**. Se a Retention é ruim, o Referral morre —
ninguém indica produto que não usa. **Fluxo de auditoria**: antes de melhorar o
Referral, checar se Retention está saudável (D30 ≥40% para SaaS SMB; recompra
30d ≥25% para e-commerce).

### LTV/CAC — o teto do incentivo

- **LTV** (Lifetime Value) — receita esperada de um cliente ao longo do relacionamento.
- **CAC** (Customer Acquisition Cost) — custo total para adquirir 1 cliente novo.
- **Regra saudável**: LTV/CAC ≥3 (LTV vale pelo menos 3× o CAC).
- **Payback**: idealmente <12 meses (SaaS SMB), <6 meses (e-commerce).

**Aplicação em incentivo de indicação**: recompensa monetária ≤30% do LTV.
Acima disso, você paga mais para adquirir via indicação do que vale o cliente.

### North-star metric — a bússola

Uma única métrica que a empresa toda persegue. Escolher com 3 critérios:
- **Reflete valor entregue** ao cliente (não só receita).
- **Preditiva** de crescimento sustentável (correlaciona com receita 6-12m adiante).
- **Acionável** — o time consegue mover.

Exemplos por vertical:
- SaaS colaborativo: usuários ativos semanais que criaram conteúdo.
- Marketplace: transações completadas com nota ≥4.
- E-commerce assinatura: recompras no ciclo esperado.
- Mídia/conteúdo: minutos de tempo assistido/lido por usuário/semana.

### Experiment cadence — a máquina de aprender

Growth escala com cadência de teste, não com "campanhas geniais":

- **Semanal**: 1-2 experimentos rodando; parar quando alcançar significância ou 14d.
- **Estrutura**: hipótese H1/H0 → métrica → tamanho de amostra → duração → resultado documentado.
- **Nome do jogo**: aprender rápido; 1 vencedor a cada 3-5 experimentos é saudável.
- **Registrar** em `experimentos.md` OU `experiments.airtable`: hipótese, resultado, decisão (keep/kill/iterate), aprendizado.

### Priorização — matriz ICE ou RICE

Para escolher qual experimento rodar primeiro:

- **ICE** — Impact (1-10), Confidence (1-10), Ease (1-10). Score = média.
- **RICE** — Reach × Impact × Confidence / Effort.

Usar ICE em estágio inicial (baixa confiança generalizada), RICE quando volume de tráfego é conhecido.

### Aplicação ao Programa de Indicação

- Antes de lançar o programa, checar Retention e LTV/CAC.
- Definir north-star do PROGRAMA (ex.: % de clientes com ≥1 indicação convertida/trimestre).
- Rodar 1 experimento/mês só no programa (mudar incentivo, mudar timing, mudar mensagem).
- Amarrar coeficiente K ao north-star geral — programa é meio, não fim.

---
**Procedência da absorção B02:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (ID MKT-G39 — quadro growth AARRR + LTV/CAC + north-star + experiment cadence + ICE/RICE consolidados como camada de contexto ao programa de indicação).
