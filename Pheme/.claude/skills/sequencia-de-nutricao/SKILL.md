---
name: sequencia-de-nutricao
description: >
  Constrói e otimiza sequências de e-mail automatizadas (drip / fluxo de
  ciclo de vida) que nutrem relação e movem a pessoa para a conversão — boas-vindas,
  onboarding, nutrição de lead, re-engajamento, pós-compra e win-back. Define
  gatilho, número de e-mails, cadência de envio, condições de saída, assunto +
  preview e a copy de cada mensagem. Use quando o pedido for "sequência de e-mail",
  "drip", "fluxo de nutrição", "e-mails de boas-vindas", "onboarding por e-mail",
  "e-mail de reativação", "automação de e-mail" ou "e-mails de ciclo de vida".
  É para lista OPTED-IN (quem pediu para receber) — NÃO para cold outreach a
  prospects que não pediram, e NÃO para o dunning de pagamento falho (isso é
  `ciclo-de-vida-e-retencao`).
metadata:
  type: reference
tipo: skill
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
---

# Sequência de Nutrição — e-mail que move, não que enche caixa

E-mail bem feito é o canal owned de maior alavancagem (algoritmo nenhum decide
quem vê). O princípio é **menos e melhor**: cada e-mail tem um trabalho, uma CTA
principal, e entrega valor antes de pedir algo.

## Quatro princípios
1. **Um e-mail, um trabalho** — um propósito, uma CTA principal. Não tente fazer tudo numa mensagem.
2. **Valor antes do pedido** — lidere com utilidade, construa confiança, ganhe o direito de vender.
3. **Relevância > volume** — menos e-mails melhores vencem; segmente para relevância.
4. **Caminho claro à frente** — todo e-mail move a pessoa para algum lugar; links fazem algo útil.

## Avaliação inicial (antes de escrever)
Defina: **tipo de sequência** (boas-vindas/onboarding, nutrição de lead, re-engajamento, pós-compra, evento, educacional, venda); **contexto da audiência** (quem são, o que os trouxe à sequência, o que já sabem/acreditam, relação atual com a marca); **meta** (ação de conversão primária, metas de relação/segmentação, o que define sucesso).

## Os tipos de sequência (comprimento + cadência + esqueleto)
| Tipo | Comprimento | Disparo / meta |
|---|---|---|
| Boas-vindas (pós-cadastro) | 5-7 e-mails / 12-14 dias | Ativar, construir confiança, converter |
| Nutrição de lead (pré-venda) | 6-8 e-mails / 2-3 semanas | Confiança, expertise, converter |
| Re-engajamento | 3-4 e-mails / ~2 semanas | 30-60 dias inativo → recuperar ou limpar lista |
| Onboarding (usuários) | 5-7 e-mails / 14 dias | Levar ao momento "aha", expandir/upgrade |

O esqueleto e-mail-a-e-mail de cada tipo (qual mensagem em cada dia e que trabalho ela faz) está em `references/playbook-sequencias.md`.

## Cadência de envio
- Boas-vindas: imediato. Início da sequência: 1-2 dias de intervalo. Nutrição: 2-4 dias. Longo prazo: semanal/quinzenal.
- B2B: evite fins de semana. B2C: teste fins de semana. Sempre que possível, envie no fuso local da pessoa.

## Assunto e preview
- **Claro > esperto, específico > vago.** 40-60 caracteres no assunto. Emoji é polarizante: teste.
- Padrões que funcionam: pergunta ("Ainda travado com X?"), how-to, número ("3 jeitos de…"), direto ("[Nome], seu X está pronto"), tease de história ("O erro que cometi com…").
- **Preview** estende o assunto (~90-140 caracteres); não repita o assunto, complete a ideia ou crie intriga.

## Estrutura de cada e-mail
Gancho (primeira linha prende) → contexto (por que importa para a pessoa) → valor (o conteúdo útil) → CTA (o que fazer agora) → assinatura humana.
- Parágrafos curtos (1-3 frases), espaço em branco, bullets para escaneabilidade, negrito com parcimônia, mobile-first.
- Comprimento: 50-125 palavras (transacional), 150-300 (educacional), 300-500 (história).
- Tom conversacional, 1ª e 2ª pessoa, voz ativa. Leia em voz alta: soa humano?
- Uma CTA primária por e-mail (botão); secundárias como link. Texto do botão = ação + resultado.

## Formato de saída
**Visão geral da sequência:** nome · gatilho · meta · comprimento · cadência · condições de saída.
**Por e-mail:** número/propósito · quando enviar · assunto · preview · corpo · CTA → destino · segmento/condição.
**Plano de métricas:** o que medir + benchmarks (abertura, clique, conversão por e-mail; condição de saída).

## Cruzamentos
- **`ciclo-de-vida-e-retencao`** — dona do dunning (pagamento falho) e das ofertas de retenção; esta habilidade escreve os e-mails de win-back e onboarding.
- **`motor-de-lancamento`** — usa esta habilidade para a sequência de anúncio e o onboarding pós-lançamento.
- **Caliope** (copy craft) afina ganchos e CTAs; **Orfeu** reforça os e-mails de história.
- Publicação/agendamento dos e-mails: ferramenta de e-mail da casa (ex.: GoHighLevel); tokens sempre via Infisical.

---
**Procedência:** método adaptado da skill `email-sequence` de
`alirezarezvani/claude-skills` (`SKILL.md` + `references/email-sequence-playbook.md`),
@4a3c05b69e64f4925f7fc65c88890f614f79caf0, licença MIT. Des-personalizado,
traduzido e reescrito em pt-BR; sem cópia literal. A distinção contra cold
outreach (não opted-in) vem da skill irmã `cold-email`, deixada fora de escopo aqui.

---

## Absorção B02 (MKT-G33, G35) — Deliverability pós-MPP + GDPR + Brevo

Deliverability em 2026 é diferente do que era em 2020. O Apple Mail Privacy
Protection (MPP) quebrou a métrica de abertura, o GDPR + LGPD + CAN-SPAM
exigem consentimento verificável, e provedores como Brevo/SendGrid/Mailgun têm
sistemas de reputação de sender cada vez mais rigorosos.

### O que quebrou com MPP (Apple Mail Privacy Protection)

Ativo desde iOS 15 (2021), consolidado em 2024+:

- **Todo e-mail aberto no Apple Mail dispara pre-fetch de imagens** — vira "abertura falsa".
- **~60-70% do tráfego de e-mail hoje é Apple Mail** (iPhone + Mail app).
- **Consequência**: métrica de "open rate" está inflada 30-60%. Não confie mais.
- **Substituir por métricas confiáveis**: **click rate**, **reply rate**, **click-to-conversion**, **unsubscribe rate**, **spam rate**.

### Novo modelo de decisão

| Antes de MPP | Depois de MPP |
|---|---|
| Segmentar por "aberto vs não-aberto" | Segmentar por "clicou vs não-clicou" |
| Deletar não-abertos aos 90d | Deletar não-clicadores aos 120-180d |
| Testar assunto por open rate | Testar assunto por click rate downstream |
| Dashboard de open rate | Dashboard de click + reply + revenue-per-email |

### GDPR + LGPD (regra prática)

- **Base legal**: só enviar para quem deu consentimento verificável OU tem relação de negócio ativa.
- **Double opt-in obrigatório** em UE/BR (single opt-in tem risco).
- **Registro de consentimento**: guardar timestamp + IP + origem do consent.
- **Unsubscribe em 1 clique** (Gmail/Yahoo agora exigem `List-Unsubscribe: <mailto:>, <https:>` no header).
- **Purga automática**: unsub → removido de todas as listas em 24h. Sem "só desse fluxo".

### Brevo (SendinBlue) — padrão da casa Kolden

- **Endpoint API**: `https://api.brevo.com/v3/smtp/email` (transacional) + `/v3/contacts` (marketing).
- **Chave via Infisical**: `/kolden/prod/BREVO_API_KEY`.
- **Sender autenticação**: SPF + DKIM + DMARC obrigatórios (align `d=` do DKIM com o domínio de envio).
- **Warm-up de IP dedicado**: primeiros 30 dias, subir volume gradualmente (100 → 1k → 10k/dia).
- **List hygiene**: rodar validação (Brevo tem builtin) antes de qualquer campanha em lista >5k.

### Anexo — Mapa CRM ↔ ESP (LANGUAGE / STATUS / TRANSACTION)

Padrão de sincronização entre CRM (GoHighLevel, HubSpot, Airtable) e ESP (Brevo):

| Campo CRM | Campo ESP (Brevo) | Uso |
|---|---|---|
| `preferred_language` | `LANGUAGE` (pt/en/es) | Segmentar campanha por idioma; fallback padrão pt-BR |
| `lifecycle_stage` | `STATUS` (lead/mql/sql/customer/churn) | Segmentar por estágio; fluxo diferente por status |
| `last_transaction_at` | `TRANSACTION_DATE` (ISO 8601) | Trigger de win-back após 90d sem compra |
| `total_ltv` | `TRANSACTION_TOTAL` (numeric) | Segmentar VIP >X BRL para trato preferencial |
| `opt_in_source` | `SOURCE` (form/checkout/lead-magnet) | Auditoria de consent + attribution |
| `unsubscribed_at` | `OPT_OUT` (boolean + date) | Nunca enviar; source of truth |
| `bounce_hard_at` | `BLOCKED` (auto pelo Brevo) | Purga permanente |

**Regra de ouro**: **CRM é source of truth**. ESP é fanout. Todo unsub/bounce volta ao CRM em 24h via webhook.

### Métricas confiáveis (dashboard mínimo)

- **Delivery rate** ≥98% (sempre) — <97% é sinal de reputação ruim.
- **Click rate** — a nova métrica de engajamento real.
- **Reply rate** (para nutrição B2B) — ainda mais fiel que click.
- **Complaint rate** <0.1% — >0.1% ativa suspensão em Gmail/Outlook.
- **Bounce rate** <2% total, <0.5% hard bounce.
- **Unsubscribe rate** <0.5% por campanha.

---
**Procedência da absorção B02:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (IDs MKT-G33, G35 — deliverability pós-MPP + GDPR + Brevo consolidados a partir dos playbooks de deliverability + CRM↔ESP sync).
