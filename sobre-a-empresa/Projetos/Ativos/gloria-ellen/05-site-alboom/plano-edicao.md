# Plano de edição do site — gloriaellen.alboompro.com

**Objetivo:** transformar o site de "galeria bonita sem conversão" em "funil operacional dos 12 dias".

**Diagnóstico atual:**
- Template Alboompro grátis com galeria + formulário.
- Sem preços.
- CTA principal é formulário genérico (bug: mapa em Balne, UK).
- Botão WhatsApp existe no canto (bom) mas discreto.
- Portfolio 100% Mato Grosso — mata autoridade local em SC.
- Bio poética mas sem CTA de venda.

---

## Prioridade 1 — Adicionar banner "Estreia no Vale" (fazer HOJE)

**Local:** topo da homepage, antes do "Sobre mim".

**Se Alboompro tem editor de blocos:**
1. Login no painel Alboom.
2. Ir na página Home → adicionar bloco "Banner" no topo.
3. Upload de imagem (1920×600) — foto forte do portfolio.
4. Sobrepor texto:

```
Estreia no Vale · 03–14 · 07

Cheguei ao litoral catarinense.
12 dias. 12 vagas na agenda pra ensaios autorais.
Ensaio R$550 · Pré-wedding R$990 · Retrato corporativo R$2.700
Até 14/07.

[Botão: Reservar minha vaga]
```

5. Botão linka pra `https://api.whatsapp.com/send?phone=5547992510159&text=Vim%20pelo%20Site%20-%20Estreia%20no%20Vale`

**Se Alboompro NÃO tem editor de banner customizado:**
- Trocar a foto de capa do "Sobre mim" pela imagem do banner (com texto sobreposto feito no Canva).
- Deixar a bio embaixo intacta.

---

## Prioridade 2 — Trocar CTA do formulário pra WhatsApp direto

**Problema atual:** formulário é genérico, sem retorno visível pra usuário, mapa quebrado.

**Solução ideal:** substituir formulário inteiro por bloco de WhatsApp.

**No Alboompro:**
1. Painel > Página Home > Bloco "Contato".
2. Se der pra remover, remover o formulário.
3. Adicionar bloco de texto/HTML com:

```
Prefere conversar direto?
Me chama no WhatsApp — respondo em até 2h.

[Botão grande: Falar comigo no WhatsApp]
```

Botão: `https://api.whatsapp.com/send?phone=5547992510159&text=Vim%20pelo%20Site`

**Se Alboompro não permite remover formulário:** deixar formulário abaixo do CTA WhatsApp, e adicionar aviso "Se preferir, o formulário também está aqui embaixo — respondo pelos dois caminhos".

---

## Prioridade 3 — Adicionar página `/estreia-no-vale`

Criar nova página no menu com todo o conteúdo da campanha:
- Título grande "Estreia no Vale"
- Subtítulo: "12 dias. 12 vagas. Fotografia autoral chegou ao Vale."
- Manifesto (do arquivo `oferta-ancora-12-dias.md`)
- Tabela de preços com estreia
- 6 fotos do portfolio (misto casamento + pré-wedding)
- FAQ (10 perguntas do arquivo oferta)
- Botão CTA no fim: "Reservar minha vaga"

URL: `gloriaellen.alboompro.com/estreia-no-vale`

Adicionar no menu principal do site.

---

## Prioridade 4 — Adicionar categoria "Ensaios de Praia" no portfolio (mesmo com 1 case só)

**Problema:** portfolio online não mostra o que ela vende hoje.

**Solução emergencial:**
1. Nos primeiros 3 dias da campanha, ela faz 1 ensaio de "estreia" em BC ou Itajaí (pode ser em barter/gratuito com alguém pra portfolio — não conta na meta).
2. Publicar no Alboompro em nova categoria "**Ensaios de Praia**".
3. Título: "Ensaio em Balneário Camboriú — Estreia no Vale".

Se não der pra fazer ensaio até dia 3, usar fotos que a Glória tenha (mesmo antigas de MT) MAS mudar título/local: "Ensaio Autoral — Litoral Catarinense" e não citar cidade. Menos ideal mas melhor que nada.

**Nova categoria também:**
- "Corporativo" — se ainda não houver material, deixar em branco com o aviso:

```
Em breve.
Os primeiros trabalhos corporativos no litoral catarinense — Itajaí, Florianópolis e Balneário Camboriú — estão em produção. Se quiser reservar o seu, me chama.
```

---

## Prioridade 5 — Adicionar página "Preços/Investimento"

Página nova: `gloriaellen.alboompro.com/investimento`

Conteúdo:

```
Investimento

Cada trabalho começa com uma conversa de 15 minutos. Não fecho pacote antes de te conhecer — quero entender o momento pra propor certo.

Como referência, deixo os valores da tabela e a condição da estreia:

Ensaio autoral — praia, feminino, casal, gestante
Tabela R$700 · Estreia no Vale R$550 (até 14/07)
[+ Detalhes] → puxa manifesto detalhado

Pré-wedding
Tabela R$1.200 · Estreia no Vale R$990

Casamento civil
A partir de R$1.500

Casamento (cerimônia + festa)
A partir de R$3.000 — depende do porte, do local e do deslocamento. Preciso conhecer o dia de vocês pra fechar a proposta.

Retrato corporativo (equipe até 15 pessoas)
Tabela R$3.000 · Estreia no Vale R$2.700

Sinal e parcelamento
Todo trabalho tem 30% de sinal na reserva (50% no corporativo). Saldo em até 6x sem juros no cartão. PIX à vista tem 5% off.

Deslocamento
Atendo hoje o litoral catarinense: Florianópolis, Balneário Camboriú, Itajaí, Itapema, Balneário Piçarras, Barra Velha, Penha, Navegantes. Fora dessa faixa, combinamos.

Se algo aqui te tocou, me chama. 🤍
```

Adicionar botão WhatsApp no rodapé de cada bloco: **"Conversar com a Glória"**.

---

## Prioridade 6 — Ajustes pequenos

**Corrigir mapa quebrado (Balne, UK):**
- Painel Alboom > Contato > Google Maps.
- Substituir coordenadas ou remover mapa inteiro.
- Se não der pra corrigir, remover totalmente do site (o mapa errado é pior que sem mapa).

**Bio do site — pequeno ajuste:**
Adicionar no final da bio (mantendo o manifesto atual):

> Atendo hoje o litoral catarinense — Florianópolis, Balneário Camboriú, Itajaí, Itapema, Balneário Piçarras, Penha, Barra Velha, Navegantes.
> 📱 WhatsApp (47) 9251-0159 · 📷 @gloria.ellen
>
> — Glória

---

## Prioridade 7 — Depoimentos no site

Adicionar seção "**O que dizem de perto**" com 4-5 depoimentos.

**Formato sugerido:**
- Foto pequena (círculo) — se não tiver, deixar iniciais em círculo com cor de fundo.
- Nome + serviço + cidade + data.
- Texto do depoimento em itálico.

Pedir à Glória: 4-5 dos 15 depoimentos por texto que ela tem. Copiar direto.

---

## Verificação pós-edição

Antes de considerar pronto, testar de celular:
1. Abrir gloriaellen.alboompro.com no celular.
2. Banner "Estreia no Vale" deve aparecer na primeira dobra.
3. Botão CTA visível.
4. Clicar no botão → deve abrir WhatsApp com mensagem pré-carregada.
5. Testar menu → todas as páginas novas acessíveis.
6. Navegar até `/investimento` — layout ok?
7. Navegar até `/estreia-no-vale` — layout ok?

Se algo tá quebrado, ajustar antes de publicar tráfego pago no site.

---

## Alternativa se Alboompro for muito limitado

Se o painel do Alboompro não permitir tudo isso:
- Deixar o site como está.
- Fazer landing page separada no **Carrd** (grátis, 10 min) ou no **Instagram Bio Link**.
- Toda a campanha aponta pra essa landing, não pro site principal.

Mas isso é plano B. Plano A é editar o Alboompro.
