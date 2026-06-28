# Guia de dunning — recuperação de pagamento falho (churn involuntário)

Falhas de pagamento causam 20-40% do churn total na maioria dos SaaS. A maior
parte é recuperável se você tiver retry inteligente + e-mails + atualização de cartão.

## 1. Lógica de retry (não recobre na hora)
Cartões que falham costumam recuperar sozinhos em 3-7 dias. Espalhe as tentativas:
- **Retry 1:** 3 dias após a falha (a maioria das recuperações acontece aqui).
- **Retry 2:** 5 dias após o retry 1.
- **Retry 3:** 7 dias após o retry 2.
- **Final:** 3 dias após o retry 3 → então pausa/cancela.

## 2. Serviços de atualização de cartão
- **Stripe:** Account Updater (automático, ligado por padrão na maioria dos planos).
- **Braintree:** Account Updater (precisa habilitar).
- Atualizam cartões expirados/trocados antes da próxima cobrança — use sempre.

## 3. Sequência de e-mail de dunning

| Dia | E-mail | Tom | CTA |
|---|---|---|---|
| D0 | "Pagamento falhou" | Neutro, factual | Atualizar cartão |
| D3 | "Ação necessária" | Urgência leve | Atualizar cartão |
| D7 | "Conta em risco" | Urgência maior | Atualizar cartão |
| D12 | "Aviso final" | Urgente | Atualizar cartão + link de suporte |
| D15 | "Conta pausada/cancelada" | Factual | Reativar |

## Regras dos e-mails
- **Assunto específico, não vago:** "Seu pagamento do [Produto] falhou" — não "Ação necessária".
- **Sem culpa, sem vergonha.** Falha de cartão acontece; trate o cliente como adulto.
- Todo e-mail linka **direto** para a página de atualizar pagamento — nunca o dashboard genérico.

## Benchmark de recuperação
- 25-35% dos pagamentos falhos recuperados = bom.
- Abaixo de 20% → retry ou e-mails precisam de trabalho.
