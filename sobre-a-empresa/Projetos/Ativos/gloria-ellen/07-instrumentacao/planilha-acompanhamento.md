# Planilha de acompanhamento diário — Estreia no Vale

**Objetivo:** instrumentação simples pra rodar a campanha sem perder controle. Meta = R$7.000 em 12 dias.

**Formato sugerido:** Google Sheets, 4 abas.

---

## Aba 1 — Diário

**Colunas:**

| Dia | Data | Meta cumulativa | Faturamento real | Delta | Leads captados | Fechamentos | Fonte principal | Observações |
|---|---|---|---|---|---|---|---|---|
| 1 | 2026-07-03 | R$500 | | | | | | |
| 2 | 2026-07-04 | R$1.000 | | | | | | |
| 3 | 2026-07-05 | R$1.500 | | | | | | |
| 4 | 2026-07-06 | R$2.100 | | | | | | |
| 5 | 2026-07-07 | R$2.800 | | | | | | |
| 6 | 2026-07-08 | R$3.500 | | | | | | GATE |
| 7 | 2026-07-09 | R$4.200 | | | | | | |
| 8 | 2026-07-10 | R$4.900 | | | | | | |
| 9 | 2026-07-11 | R$5.600 | | | | | | |
| 10 | 2026-07-12 | R$6.100 | | | | | | |
| 11 | 2026-07-13 | R$6.600 | | | | | | |
| 12 | 2026-07-14 | R$7.000+ | | | | | | FINAL |

**Como usar:** preencher no fim de cada dia. Delta = faturamento real - meta cumulativa. Se negativo por 2 dias seguidos → gatilho de correção.

---

## Aba 2 — Leads (funil detalhado)

**Colunas:**

| ID | Data captura | Nome | WhatsApp | Origem | Serviço interessado | Status | Valor previsto | Data agenda | Sinal pago | Saldo pago | Observações |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 001 | | | | | | | | | | | |
| ... | | | | | | | | | | | |

**Origens possíveis:**
- Reativação base (15 clientes)
- Lead morno reaberto
- Ad Meta - Criativo 1
- Ad Meta - Criativo 2
- Ad Meta - Criativo 3
- Retargeting Meta
- Orgânico IG
- Orgânico YT
- Indicação
- Site direto
- LinkedIn (corporativo)
- E-mail (corporativo)

**Status possíveis:**
- Novo (só chegou)
- Em conversa
- Enviada proposta
- Aguardando decisão
- Sinal pago (fechado)
- Concluído (saldo pago)
- Perdido — não é o momento
- Perdido — foi pra concorrente
- Perdido — preço
- Perdido — sem resposta

---

## Aba 3 — Meta Ads (dashboard diário)

**Colunas:**

| Data | Ad Set | Impressões | Reach | CTR | CPM | Conversas WhatsApp | CPL | Notas |
|---|---|---|---|---|---|---|---|---|
| 2026-07-03 | Set 1 - Ensaio praia | | | | | | | |
| 2026-07-03 | Set 2 - Pré-wedding | | | | | | | |
| 2026-07-03 | Set 3 - Retorno emocional | | | | | | | |
| ... | | | | | | | | |

**Alertas automáticos (condicional):**
- CTR < 0.8% → destacar vermelho.
- CPL > R$40 → destacar vermelho.
- CPL < R$15 → destacar verde (escalar!).

Encher 1×/dia com dados do Ads Manager.

---

## Aba 4 — Empresas (prospecção corporativa)

**Colunas:**

| Setor | Empresa | Cidade | Contato | Cargo | Canal | Data contato | Respondeu? | Data resposta | Status | Próxima ação |
|---|---|---|---|---|---|---|---|---|---|---|
| Porto/Log | BRF | Itajaí | | | LinkedIn | | | | | |
| Porto/Log | Portonave | Navegantes | | | LinkedIn | | | | | |
| Porto/Log | MSC | Itajaí | | | LinkedIn | | | | | |
| Tech | Softplan | Floripa | | | LinkedIn | | | | | |
| Tech | Neoway | Floripa | | | LinkedIn | | | | | |
| Tech | RD Station | Floripa | | | LinkedIn | | | | | |
| Construção | FG Empreendimentos | BC | | | E-mail | | | | | |
| Construção | Embraed | BC | | | E-mail | | | | | |
| Hotelaria | Marimar | BC | | | IG DM | | | | | |
| Hotelaria | Beto Carrero | Penha | | | E-mail | | | | | |
| ... | | | | | | | | | | |

**Status:**
- Não contatado
- Contactado (aguardando)
- Respondeu (interessado)
- Respondeu (não interessado)
- Em conversa
- Proposta enviada
- Fechado
- Perdido

---

## Dashboard resumo (topo da Aba 1)

Fórmulas simples:

```
Faturamento total: =SOMA(D2:D13)
Meta: 7000
Restante: =7000-Faturamento_total
Dias restantes: =14 - HOJE() em dias
Meta diária restante: =Restante / Dias_restantes
Taxa de fechamento: =CONT.SE(Aba2!G:G,"Sinal pago") / CONTA(Aba2!A:A)
Leads captados: =CONTA(Aba2!A:A)
CPL médio: =SOMA(Aba3!I:I) / Leads_captados
```

Exibir esses números no topo em cor visível.

---

## Ritual diário

**Todo dia às 21h (10 min):**
1. Abrir planilha.
2. Preencher faturamento real do dia.
3. Preencher leads novos captados.
4. Atualizar status de leads em movimento (proposta, sinal, etc).
5. Puxar dados do Meta Ads Manager → preencher Aba 3.
6. Se em prospecção corporativa: atualizar Aba 4.
7. Ver o delta. Se negativo por 2 dias → acionar `gate-dia-6.md` mesmo se não for dia 6.

**Todo domingo (dia 5 e dia 12):**
- Screenshot do dashboard → mandar pro Ronan pra visibilidade.

---

## Template de planilha

Ronan pode montar em 15 min no Google Sheets. Ou copiar template abaixo.

Cabeçalho recomendado — cores:
- Cabeçalho: fundo preto, texto branco.
- Meta cumulativa: fundo cinza claro.
- Faturamento real: fundo branco.
- Delta: cor condicional (verde >0, vermelho <0).
- GATE (dia 6): fundo amarelo destacado.
- FINAL (dia 12): fundo verde escuro.

---

## Automação opcional (não crítico)

Se quiser sofisticar:
- **Zapier ou Make** conectando WhatsApp → Google Sheets (registra lead automático).
- **Meta Ads → Sheets** via Meta Business Suite API (relatório automático diário).
- **Google Forms** pra registro de sinal pago (envia pra sheets sozinho).

Mas manual funciona pros 12 dias. Não travar em automação.
