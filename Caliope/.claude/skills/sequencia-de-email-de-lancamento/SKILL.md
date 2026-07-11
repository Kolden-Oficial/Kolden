---
name: sequencia-de-email-de-lancamento
description: |
  Projeta a sequência de e-mails de um lançamento — do aquecimento da lista (pré-lançamento)
  ao dia do lançamento e ao pós, com gatilho, timing, assunto, corpo e CTA de cada e-mail.
  Use quando o pedido for "sequência de e-mail de lançamento", "e-mails para lançar um
  produto/feature", "campanha de lançamento por e-mail", "aquecer a lista para o lançamento",
  "carrinho/oferta abrindo" ou "fluxo de e-mails do lançamento". Para nutrição evergreen ou
  onboarding genérico, trate como sequência comum (mesma estrutura, sem o calendário de
  lançamento). Para a página de destino, use estrutura-de-pagina-de-vendas.
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
tipo: skill
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
---

# Sequência de e-mail de lançamento (PT-BR)

Um lançamento não é um momento único: é um processo em fases que constrói momento. Esta
habilidade desenha a sequência de e-mails que conduz a lista do aquecimento até a conversão,
um e-mail com um trabalho de cada vez. O e-mail é o canal **próprio** (owned) onde o
lançamento converte — tudo que vem de redes sociais (rented) ou parcerias (borrowed) deve
desaguar aqui.

## Antes de montar — colha o contexto

1. **O que está lançando** e qual a transformação/resultado central.
2. **A lista:** quem é, o que já sabe sobre você, qual a relação atual (fria, morna,
   cliente). E o que disparou a entrada nessa sequência.
3. **A oferta de lançamento:** preço, bônus, janela (carrinho abre/fecha?), reversão de
   risco (garantia).
4. **A janela do lançamento:** datas de pré, abertura e fechamento. O calendário define o
   timing dos e-mails.
5. **Objetivo primário** e o que define sucesso (vendas, inscrições, demos).

## As fases do lançamento (ORB + 5 fases)

Estruture os canais em **próprios** (e-mail, blog, comunidade — onde converte), **alugados**
(redes, marketplaces — tráfego para os próprios) e **emprestados** (guest, parcerias,
influência — credibilidade que vira relação própria). O lançamento em si caminha em fases:
interno → alpha → beta → acesso antecipado → lançamento completo. A sequência de e-mail
cobre principalmente o **pré-lançamento (aquecimento)**, o **dia do lançamento** e o **pós**.
Detalhe das fases e do checklist em `references/fases-e-checklist.md`.

## A sequência de e-mail de lançamento

Modelo de referência (ajuste a contagem e o timing à janela real):

**Pré-lançamento (aquecimento) — 3 a 5 e-mails antes da abertura**
1. **Teaser / antecipação** — sinalize que algo vem aí; nomeie o problema que será
   resolvido. Sem oferta ainda; gere a curiosidade (efeito Zeigarnik, loop aberto).
2. **Educação / a dor** — aprofunde o problema; entregue valor; ganhe o direito de vender.
3. **A virada / história** — conte o porquê, o caso, a transformação; conecte com o
   resultado.
4. **Prova + acesso antecipado** — depoimento/caso com número; convide para a lista de
   espera/acesso antecipado (exclusividade, FOMO).

**Dia do lançamento — 1 a 3 e-mails**
5. **Abertura** — "está no ar": anúncio direto, oferta de lançamento, CTA claro para a
   página de vendas. Recapitule a transformação.
6. **Tratamento de objeção** (dia 1-2) — derrube o motivo nº 1 de não comprar (preço,
   "funciona pra mim?", risco); reforce a garantia.
7. **Prova social** (dia 2-3) — resultados de quem já entrou; bandwagon.

**Fechamento — 1 a 2 e-mails (se houver janela)**
8. **Última chamada / urgência** — carrinho/oferta fechando; escassez **genuína**; CTA sem
   rodeio. A urgência só funciona se for real.

**Pós-lançamento**
9. **Onboarding** — sequência automática que ativa quem comprou e leva ao "momento aha".
10. **Roundup / quem perdeu** — inclua o anúncio no e-mail periódico para pegar quem não viu.

## Princípios de cada e-mail

- **Um e-mail, um trabalho.** Um propósito, um CTA primário. Não tente fazer tudo.
- **Valor antes do pedido.** Lidere com utilidade; construa confiança; ganhe o direito de
  vender.
- **Caminho claro.** Todo e-mail move a pessoa para algum lugar; o link faz algo útil.
- **Estrutura do corpo:** gancho (primeira linha) → contexto (por que importa para ele) →
  valor → CTA → assinatura humana e calorosa.
- **Formatação:** parágrafos curtos (1-3 frases), espaço em branco, bullets para escaneio,
  negrito com parcimônia, mobile-first.
- **Tom:** conversacional, primeira e segunda pessoa, voz ativa; leia em voz alta — soa
  humano?
- **Tamanho:** 50-125 palavras (transacional), 150-300 (educativo), 300-500 (história).
- **Assunto:** claro > esperto, específico, 40-60 caracteres. **Preview** (~90-140 car.)
  completa o assunto, não repete. Para gerar e pontuar assuntos, use
  `headline-e-hook-testaveis`.

## Timing e cadência

- E-mail de boas-vindas/abertura: imediato.
- Início da sequência: 1-2 dias de intervalo.
- Nutrição: 2-4 dias.
- B2B: evite fins de semana. B2C: teste fins de semana. Envie no fuso local.
- Sinalize sempre as **condições de saída** (quem comprou sai da sequência de venda e entra
  na de onboarding).

## Formato de saída

Entregue primeiro uma **visão geral da sequência** (nome, gatilho, objetivo, nº de e-mails,
timing, condições de saída). Depois, para cada e-mail: número/propósito, quando envia,
assunto, preview, corpo completo, CTA → destino, e segmento/condição se houver. Para
sequências de 5+ e-mails, lidere com a tabela-resumo. Sinalize se algum e-mail pode
conflitar com outra sequência que o público recebe. Se o texto saiu com cara de IA, passe
pela `de-slop`.

## Referências

- `references/fases-e-checklist.md` — ORB (próprio/alugado/emprestado), as 5 fases do
  lançamento, modelos de sequência por tipo (boas-vindas, nutrição, reengajamento,
  onboarding) e o checklist pré / dia / pós-lançamento.

---

## Atribuição

Habilidade reescrita em PT-BR a partir de fonte MIT (princípios adaptados, sem cópia
literal): **alirezarezvani/claude-skills** (`marketing-skill/skills/email-sequence`,
referência `email-sequence-playbook.md`, e `launch-strategy`, referência
`launch-frameworks-and-checklists.md`), SHA `4a3c05b69e64f4925f7fc65c88890f614f79caf0`,
licença MIT. Absorvida pelo Caos (Kolden) em 2026-06-27.
