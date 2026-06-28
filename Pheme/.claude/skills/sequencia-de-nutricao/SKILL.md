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
