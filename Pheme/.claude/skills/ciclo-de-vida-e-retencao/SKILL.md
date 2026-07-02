---
name: ciclo-de-vida-e-retencao
description: >
  Desenha e otimiza a RETENÇÃO ao longo do ciclo de vida — reduzindo churn
  voluntário (quem decide sair) e involuntário (quem cai por pagamento falho).
  Cobre fluxo de cancelamento como conversa estruturada, ofertas de retenção
  casadas ao motivo de saída, pesquisa de saída, sequência de dunning
  (recuperação de pagamento) e win-back. Use quando o pedido for "reduzir
  churn", "fluxo de cancelamento", "oferta de retenção", "salvar assinante",
  "recuperar pagamento falho", "dunning", "pesquisa de saída", "win-back" ou
  "reativar quem cancelou". NÃO é para captar audiência nova (isso é aquisição)
  nem para health-score de cliente — aqui o foco é não deixar vazar quem já é da casa.
metadata:
  type: reference
---

# Ciclo de Vida e Retenção — tapar o vazamento, não só encher o balde

Crescimento não é só entrar gente nova: é não perder a que já entrou. Churn é
um vazamento de receita que dá para tampar. Salvar 20% de quem ia cancelar e
recuperar 30% dos pagamentos falhos recupera tipicamente 5-8% do MRR perdido por
mês — e isso compõe. Esta habilidade trata os dois lados:

- **Churn voluntário** — a pessoa decide sair. Combatido com fluxo de cancelamento + oferta certa.
- **Churn involuntário** — o cartão falha e ninguém faz nada. Combatido com dunning (retry + e-mails).

## Antes de começar
Pergunte (ou leia do brief, se já houver): existe fluxo de cancelamento hoje ou
o cancelamento é instantâneo? Qual o churn mensal (voluntário vs. involuntário,
se souber)? Qual o processador de pagamento? Coletam motivo de saída hoje?
Qual o problema primário — cancelamentos demais ou pagamento falho? Há orçamento
para oferta de retenção (desconto, extensão)?

## Três modos
1. **Construir fluxo de cancelamento** — do zero. Desenha as 5 etapas do gatilho ao pós-cancelamento.
2. **Otimizar fluxo existente** — taxa de salvamento baixa ou dados de saída ruins. Audita, acha o buraco, reconstrói só o que falha.
3. **Montar dunning** — churn involuntário é a prioridade. Lógica de retry + sequência de notificação + e-mails de recuperação.

## Fluxo de cancelamento — 5 etapas (não é dark pattern, é uma conversa)
```
[Gatilho de cancelar] → [Pesquisa de saída] → [Oferta de retenção dinâmica] → [Confirmação] → [Pós-cancelamento]
```
1. **Gatilho** — mostre a opção de cancelar com clareza (esconder queima confiança); inicie o fluxo no clique, não num formulário sem saída; funcione no toque/mobile.
2. **Pesquisa de saída** — UMA pergunta, obrigatória: "Qual o principal motivo?" Múltipla escolha (6-8 motivos), texto aberto opcional. **A resposta dirige a oferta** — colete antes de oferecer.
3. **Oferta dinâmica** — case com o motivo (tabela em `references/playbook-cancelamento.md`). Nunca desconto genérico (sinaliza que seu preço era falso). Uma oferta por tentativa; recusou, deixe cancelar.
4. **Confirmação** — resumo claro do que acontece (acesso, dados, cobrança); botão explícito "Sim, cancelar"; sem caixas pré-marcadas.
5. **Pós-cancelamento** — e-mail imediato (data, retenção de dados, link de reativação); e-mail de re-engajamento em 7 dias (1 CTA, sem pressão); win-back em 30 dias se fizer sentido.

A regra de implementação: **cada motivo mapeia para exatamente uma oferta**. Mapeamento ambíguo = oferta genérica = salvamento baixo. As tabelas motivo→oferta e oferta→quando-usar/quando-não estão em `references/playbook-cancelamento.md`.

## Dunning — churn involuntário (20-40% do churn total, quase tudo recuperável)
Não tente cobrar de novo na hora — cartões que falham costumam recuperar em 3-7 dias.
- **Retry inteligente:** 3 dias após a falha → +5 dias → +7 dias → +3 dias e então pausa/cancela.
- **Atualização de cartão:** ative o Account Updater do processador (Stripe/Braintree) — corrige cartões trocados antes da próxima cobrança.
- **Sequência de e-mail (D0/D3/D7/D12/D15):** do neutro ao urgente, sempre linkando direto para a página de atualizar pagamento (não o dashboard). Sem culpa, sem vergonha — falha de cartão acontece. Sequência completa em `references/guia-dunning.md`.

## Métricas e benchmarks (semanal, revisão mensal)
| Métrica | Fórmula | Benchmark |
|---|---|---|
| Taxa de salvamento | salvos / tentativas de cancelar | 10-15% bom, 20%+ excelente |
| Churn voluntário | cancelamentos voluntários / total | <2% mês |
| Churn involuntário | cancelamentos por falha / total | <1% mês |
| Taxa de recuperação | pagamentos recuperados / falhos | 25-35% bom |
| Win-back | reativações / cancelados em 90d | 5-10% |
| Conclusão da pesquisa | pesquisas respondidas / tentativas | >80% |

**Bandeiras vermelhas:** salvamento <5% (ofertas não casam com motivos) · conclusão da pesquisa <70% (longa demais ou opcional) · recuperação <20% (retry/e-mails fracos) · churn >5% mês (não se conserta só com retenção — sinalize revisão de produto/ICP).

## Gatilhos proativos (levante sem ser perguntado)
Cancelamento instantâneo sem fluxo · oferta de retenção única e genérica · ausência de dunning · pesquisa de saída opcional · sem e-mail de reativação no pós-cancelamento (a janela de 7 dias é o pico de win-back).

## Saída
Use o padrão da casa: **conclusão primeiro** (estimativa de salvamento/recuperação antes da metodologia), todo recomendação com **o quê + porquê + como** e dono + prazo, e tag de confiança (🟢 benchmark verificado / 🟡 estimado / 🔴 assumido).

## Cruzamentos
- **`sequencia-de-nutricao`** — escreve os e-mails de win-back, re-engajamento e onboarding (esta habilidade define o dunning).
- **Pluto** (ofertas/pricing) quando a raiz do churn é preço/empacotamento.
- **Argos** (pesquisa) para analisar quais canais de aquisição trazem clientes que mais cancelam.

---
**Procedência:** método adaptado da skill `churn-prevention` de
`alirezarezvani/claude-skills` (`SKILL.md` + `references/cancel-flow-playbook.md`
+ `references/dunning-guide.md`), @4a3c05b69e64f4925f7fc65c88890f614f79caf0,
licença MIT. Des-personalizado, traduzido e reescrito em pt-BR; sem cópia literal.

---

## Absorção B02 (MKT-G59) — Lifecycle de e-commerce (4 estágios)

O modelo padrão desta habilidade foca em SaaS/assinatura. E-commerce tem
lifecycle diferente: sem "assinatura", o churn se manifesta como **falta de
recompra**. Estender o playbook em 4 estágios operacionais:

### Estágio 1 — `new_customer` (dia 0 a dia 30 pós-1ª compra)

**Objetivo**: gerar 2ª compra dentro de 30d — o preditor mais forte de LTV alto.

- Sequência de onboarding específica de e-commerce:
  - D+1: agradecimento + prova social + como usar o produto.
  - D+7: dica de uso + convite para deixar review.
  - D+14: recomendação personalizada (produtos complementares).
  - D+21: oferta relâmpago (10-15% de desconto por tempo limitado).
  - D+28: story do cliente similar + link para reordenar/comprar de novo.
- **Métrica-alvo**: taxa de 2ª compra em 30d ≥25%.

### Estágio 2 — `repurchase` (recompra ativa, ciclo típico do produto)

**Objetivo**: manter cliente comprando na cadência natural (30-90d dependendo do SKU).

- Trigger por janela do produto (consumível ~30d, apparel ~60d, tech ~180d).
- Sequência antes do fim do ciclo esperado:
  - "Está terminando?" (7d antes do fim projetado)
  - "Achamos que você vai gostar disso" (upsell + cross-sell)
  - "Compre novamente" (link 1-click com produto pré-carregado)
- Programa de recompensa por frequência (buy-3-get-1, points, tier VIP).
- **Métrica-alvo**: recompra dentro do ciclo esperado ≥40%.

### Estágio 3 — `dormant` (>90d sem compra)

**Objetivo**: reativar antes de virar churn.

- Sequência de 3-4 e-mails:
  - "Sentimos sua falta" + o que mudou (novidade real).
  - "Aqui está o que você amou" (produtos comprados antes + relacionados).
  - Oferta com fim explícito ("15% off, expira em 72h").
  - Última tentativa com survey ("O que aconteceu?").
- **Métrica-alvo**: reativação de 15-25% dos dormant.

### Estágio 4 — `churn_warning` (60-90d sem compra + reduzia engajamento)

**Objetivo**: pré-empt o silêncio absoluto.

- Sinais compostos: sem compra + sem abrir e-mail + sem visitar site.
- Sequência mais pessoal:
  - E-mail direto do fundador/CEO (não robô).
  - Survey de 1 pergunta ("O que a gente poderia ter feito melhor?").
  - Oferta significativa (20-30% off + frete grátis + acesso a novidade).
- **Métrica-alvo**: recuperar 10-15% dos churn_warning.

### Handoff CRM↔ESP

Cada cliente carrega o campo `LIFECYCLE_STAGE` que muda por evento (compra,
janela sem compra, engajamento). O ESP dispara a sequência do estágio atual. Ao
mudar de estágio, a sequência antiga PARA e a nova começa. Isso evita fluxos
concorrentes.

**Regra de higiene**: cliente em `churn` (>180d sem compra + zero engajamento)
sai de todas as sequências. Só volta se reativar organicamente.

---
**Procedência da absorção B02:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (ID MKT-G59 — lifecycle de e-commerce documentado como extensão do playbook SaaS/assinatura).
