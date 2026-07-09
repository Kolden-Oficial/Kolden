# Perguntas para Thiago Araujo — pré-lançamento Google Ads (D+3)

> **Objetivo:** consolidar as 3 perguntas críticas que travam a Onda 1 e Onda 2 do roadmap Google Ads em um único ponto de contato com Thiago, evitando 3 idas e voltas separadas.
> **Canal recomendado:** WhatsApp (Julio já tem contato direto) + fixar em email para registro.
> **Prazo:** D+3 do roadmap (bloqueia início da instrumentação Camada 1).
> **Enviar por:** Julio Kolden (contato primário).

---

## Texto pronto para enviar (bilíngue)

### 🇺🇸 English (send to Thiago)

> Hi Thiago,
>
> Before we launch the Google Ads campaigns for Vilela Construction, I need three quick things from you. These directly affect how we set up tracking and how the campaigns are optimized — so the sooner you can send them, the better the campaigns will perform.
>
> **1. Real phone number for the website**
> The landing page currently shows a placeholder number (`(770) 555-1234`). What's the real number you want customers to call after they submit the form? This will also be used in Google's "Call extension" (a button under the ad).
>
> **2. Historical conversion + margin numbers (approximate is fine)**
> To tell Google how much each lead is worth, I need two rough numbers from you:
>   - **Closing rate:** out of every 10 estimates you give, how many turn into a signed project? (e.g., "2 out of 10" or "3 out of 10")
>   - **Gross margin:** roughly what percentage of a project's price is profit before overhead? (e.g., "30%", "40%", "45%")
>
> If you don't have exact numbers, ballpark is fine — we can recalibrate in 30 days once we have real data. But rough numbers now beat starting with a full guess.
>
> **3. Three real customer testimonials**
> The site currently has 3 placeholder testimonials. In the US, having fake testimonials on a website can trigger FTC issues, so we need to replace them with real ones ASAP.
>
> Ideally I need for each of 3 past clients:
>   - First name + last initial (e.g., "Sarah M.")
>   - City (e.g., "Marietta, GA")
>   - Type of project (kitchen, bathroom, basement, etc.)
>   - 2–3 sentences from them describing their experience with Vilela
>
> If you have any past clients who've written you a Google Review, a Yelp review, or sent you a happy WhatsApp/email — those are perfect. You can just forward the messages to me and I'll write them up. Or if you prefer, I can call/text three of your best clients directly and ask them for a short quote (just give me their contact info + permission).
>
> That's it! Once I have these three, we can turn on the tracking (this week) and launch the improved campaigns (next week). Any questions, just ping me.
>
> — Julio, Kolden

---

### 🇧🇷 Português (arquivo interno Kolden)

> Oi Thiago,
>
> Antes de lançarmos as campanhas de Google Ads da Vilela Construction, preciso de três coisas rápidas de você. Elas afetam diretamente como configuramos o rastreamento e como as campanhas são otimizadas — quanto antes, melhor o desempenho.
>
> **1. Telefone real para o site**
> A landing page hoje mostra um número placeholder (`(770) 555-1234`). Qual o número real que você quer que os clientes liguem depois de enviar o formulário? Vai ser usado também na "Call extension" do Google (botão embaixo do anúncio).
>
> **2. Números históricos de conversão e margem (aproximados servem)**
> Para dizer ao Google quanto vale cada lead, preciso de dois números seus (aproximados):
>   - **Taxa de fechamento:** a cada 10 orçamentos que você dá, quantos viram projeto fechado? (ex: "2 em 10" ou "3 em 10")
>   - **Margem bruta:** aproximadamente qual % do preço do projeto é lucro antes das despesas gerais? (ex: "30%", "40%", "45%")
>
> Se não tiver exato, aproximado serve — recalibramos em 30 dias com dados reais. Mas número aproximado agora é melhor que chute total.
>
> **3. Três depoimentos reais de clientes**
> O site hoje tem 3 depoimentos placeholder. Nos EUA, ter depoimentos falsos no site pode gerar problema com FTC, então precisamos trocar por reais o quanto antes.
>
> Ideal por cliente: nome + inicial do sobrenome, cidade, tipo de projeto, 2–3 frases sobre a experiência com a Vilela. Se tiver reviews no Google, Yelp ou mensagens felizes de WhatsApp/email — perfeito, só me encaminhar que eu escrevo. Ou, se preferir, posso ligar/mandar msg pra 3 dos seus melhores clientes direto pedindo uma citação curta (me manda o contato + permissão).
>
> Só isso! Assim que eu tiver as três, ligamos o rastreamento (essa semana) e lançamos as campanhas melhoradas (semana que vem). Qualquer dúvida, me chama.
>
> — Julio, Kolden

---

## Bloqueios remanescentes e fallbacks

Ver `google-ads/ROADMAP.md` §6 para o quadro completo. Resumo dos 3 abordados aqui:

| # | Bloqueio | Prazo | Fallback se travar |
|---|---|---|---|
| B1 | Taxa de fechamento + margem bruta | D+3 | Valor Conversion Action `USD 4.800 [BENCHMARK]` (60k × 40% × 20%), reavaliar D+30 |
| B2 | Telefone real do Thiago | D+3 | Call extension e link telefone da LP desativados; campanhas rodam só com form |
| B3 | 3 depoimentos reais | D+7 | Remover seção testimonials da LP (risco FTC) |

---

## Rastreamento operacional

| Item | Status | Responsável | Prazo | Nota |
|---|---|---|---|---|
| Envio da mensagem para Thiago (WhatsApp + email) | ⏳ pendente | Julio | D+1 | Enviar as duas cláusulas juntas: essa + `clausula-ghl-sombra-thiago.md` |
| Recebimento da resposta | ⏳ aguardando | Thiago | D+3 | Se não responder em 2 dias, Julio faz follow-up por WhatsApp |
| B1 marcado como resolvido no roadmap | ⏳ pendente | Hermes | D+3 | Atualizar tabela §6 do `google-ads/ROADMAP.md` |
| B2 marcado como resolvido | ⏳ pendente | Hermes | D+3 | idem |
| B3 marcado como resolvido | ⏳ pendente | Hermes | D+7 | idem |
| Depoimentos enviados → Caliope edita para copy final da LP | ⏳ pendente | Caliope | D+7 | Manter voz do cliente, corrigir grammar minimamente |
| Telefone real → Harmonia atualiza no repo | ⏳ pendente | Harmonia | D+3 | Item F1 do `landing-page-fixes-2026-07.md` |
| Taxa + margem → kasim-aslam recalcula valor Conversion Action | ⏳ pendente | Peitho | D+7 | Substituir `[BENCHMARK]` por número real em `conversion-actions.md` |

---

## Cláusulas relacionadas para enviar juntas

Para não fragmentar a comunicação com Thiago, enviar em uma única mensagem/thread:

1. **Esta cláusula** (perguntas B1 + B2 + B3)
2. `clausula-ghl-sombra-thiago.md` (consentimento GHL sombra — Decisão D2)

Ambas foram desenhadas para maximizar clareza e reduzir idas e voltas. Se Thiago responder rápido, Onda 1 sai em D+7 conforme planejado.

---

## Referências

- Roadmap Google Ads: `google-ads/ROADMAP.md` §6 (bloqueios) e §0 (decisões)
- Cláusula GHL sombra: `clausula-ghl-sombra-thiago.md`
- Fixes na LP: `landing-page-fixes-2026-07.md` (F1, F2)
- Contrato original Vilela: `_notebooklm/contrato-ketherpdf.md`
