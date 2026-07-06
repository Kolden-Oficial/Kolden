---
id: rosie-auditoria-site-vs-marca
titulo: "Rosie — Auditoria site × brandbook + mockup landing quick-win"
autor: harmonia (design-chief + ux-designer + visual-generator)
skill_aplicada: julgamento-estetico-anti-slop
data: 2026-07-01
contrato: Olimpo/contratos/missoes/m-20260701-112935-rosie-90d.yaml
relacionados:
  - ../../brandbook/03-identidade-visual/06-gap-site-vs-manual.md
  - ../../alinhamento.md
---

# Auditoria: site atual × brandbook Rosie + mockup landing quick-win

**Design Read.** Lendo isto como: landing de conversão para e-commerce de moda feminina premium, público mulheres 16–30 classe B/B-alta, linguagem "effortless chic + 90s dreamy + sensorial", tendendo a **preset soft/premium** (não editorial puro — a página tem de vender, não só emocionar). O brandbook trava paleta rose + neutros e Marcellus/DM Sans; a folga está no **grafismo-assinatura** (uma coisa memorável) e na direção de fotografia.

## 1. Rubrica de auditoria (a rodar quando o browsing estiver disponível ou sobre screenshots)

Sete dimensões, cada uma com uma pergunta binária e um teste de evidência. Marcar ✓ / ✗ / parcial no laudo final.

| # | Dimensão | Pergunta operacional | Como verificar |
|---|---|---|---|
| 1 | **Paleta** | O rose `#E6D2DC` aparece como cor de marca (faixas, cards, CTA secundário, hovers, seções emocionais)? | DevTools → contar ocorrências do hex; screenshot do fold e da PDP; regra: sem rose = falha (o manual chama rose de "protagonista") |
| 2 | **Preto quente** | O texto de corpo usa `#14100C` (preto quente) ou `#000000` (preto puro)? | Inspecionar `body`, `h1..h3`, links |
| 3 | **Tipografia** | Títulos em **Marcellus** e corpo em **DM Sans**? | `getComputedStyle(el).fontFamily` no h1 e no p — hoje o corpo usa **Zen Kaku Gothic New** (tema "recife" da Nuvemshop). Sinal claro de gap |
| 4 | **Tom da copy** | Micro-copy usa a fórmula "PT + tag em inglês" ("Effortless chic, todos os dias"; "Wear it, dress it and be you!")? | Screenshot do hero, do bloco de coleção, do rodapé; contar mistura PT/EN, aferir tom "descomplicado + sensorial + acessível" (pilares brandbook) |
| 5 | **Fotografia** | 90s dreamy (grão, luz suave, peachy cheeks, textura pele/tecido) ou stock genérico? | Baixar 5 fotos de PDP + 3 do hero, checar: grão presente? enquadramento intimista? pele/tecido em foco? modelo em básicos? |
| 6 | **Grid e respiro** | Layout "editorial que respira" (múltiplos de 2, 4×4, respiro generoso) ou entulhado com CTAs concorrentes? | Medir densidade CTA/fold; contar bloco por fold no mobile |
| 7 | **CTAs e hierarquia** | 1 CTA primário por fold, hierarquia clara, estados hover/focus consistentes com marca? | Clicar em cada CTA no mobile e no desktop; contar quantos CTAs competem no primeiro fold |
| 8 | **Coerência mobile-first** | Hero legível no fold mobile (não corta headline); menu não engole tela; PDP tem foto grande antes de tudo? | Chrome DevTools → 375×667; screenshot |

Pré-existente e já validado no `brandbook/03-identidade-visual/06-gap-site-vs-manual.md`: paleta rose ausente, corpo em Zen Kaku (não DM Sans), preto puro em vez de `#14100C`. **Esses três achados já entram no deck como falha de marca comprovada** — o resto da rubrica sai da checagem ao vivo.

## 2. Diagnóstico da fricção anúncio → landing

O funil desenhado por Peitho manda tráfego frio (Meta) e pull de intenção (Google PMax) para uma loja que **não devolve a promessa visual do anúncio**. O criativo do Meta seguirá o brandbook (rose protagonista, Marcellus, fotografia 90s); o site atual é preto & branco com Zen Kaku. Isso é uma quebra de continuidade — o cérebro do visitante pergunta "cheguei no site certo?" nos primeiros 3 segundos.

**Custo estimado:**
- `[BENCHMARK — Nielsen Norman: message-match]` — quebra de correspondência anúncio↔landing corrói CVR em **10–50%** dependendo da severidade. Aqui a quebra é dupla (cor e tipografia), então esperar corte no meio-alto da faixa.
- `[BENCHMARK — Baymard: e-com CVR médio moda BR]` ~1,2–1,8%; ganho pós-consistência visual costuma ficar em **+20–40% no CVR** em quick-wins de brand consistency isolados dos outros ajustes.
- `[HIPÓTESE]` no cenário Realista de Pactolo (M2 = R$100k, budget R$5k), cada 1 ponto percentual de CVR vale ~R$18k de faturamento no mês. Consistência visual da landing é **alavanca de CVR de baixo custo** (não exige campanha nova, só CSS/tema).

**Por que trava o funil:** o Bruno paga a mídia (R$5k/mês). Se metade do CVR é comida pela fricção anúncio↔landing, o CAC dobra, o ROAS blended cai, e a meta M3 (R$150k) passa a exigir >6× ROAS — patamar em que a decisão financeira do Pactolo é "não sustenta". A landing coerente destrava o cenário Realista sem tocar em budget.

## 3. Mockup textual — landing "quick-win" (a ser implementada por `ui-engineer` com tokens Rosie)

Landing de coleção/homepage (mobile-first, ~7 folds no mobile, 5 no desktop). Ordem argumentativa: promessa → prova → coleção → creator → garantia → CTA final.

### Fold 1 — Hero
- **Fundo:** rose `#E6D2DC` esfumado por cima de foto 90s (retrato meio-corpo, básico branco, grão presente, luz de janela).
- **Headline (Marcellus, display):** *"Effortless chic, todos os dias."*
- **Sub-headline (DM Sans, lead):** "O básico reinventado da (Rosie) — feito para você usar da segunda ao domingo."
- **CTA primário:** botão rose escuro sobre preto quente `#14100C`, texto branco: **"Ver a coleção"**.
- **Micro-prova (embaixo do CTA, DM Sans small):** "Frete grátis acima de R$400 · 5% no PIX".
- **Assinatura visual (o "elemento memorável" do preset soft/premium):** **fio serifado 1px em rose** desenhando um "loop" curto que sublinha só a palavra *chic*. É o único ornamento da página. Está em Marcellus e é o único momento em que rose vira traço, não superfície.

### Fold 2 — Prova social
- Faixa off-white com 3 números em Marcellus (não em Lato — mantém tom emocional):
  - **59k** seguidores no Instagram · **~5.5k** clientes na lista engajada · **R$21k** em 5 dias na reabertura.
- Sob cada número, uma linha DM Sans micro com contexto ("comunidade (Rosie)", "e-mail marketing próprio", "sinal validado 2026-06"). `[VALIDADO]` para os 3 números.

### Fold 3 — Coleção (3 categorias)
Grid 3×1 no desktop, stack no mobile.
- Foto quadrada 1:1, tratada em 90s (grão + luz suave), com faixa rose finíssima no rodapé de cada card.
- **Básicos** ("O guarda-roupa que faz o resto do look funcionar")
- **Statement** ("Uma peça, um look")
- **Acessórios** ("O detalhe que muda tudo")
- CTA por card em texto-link rose escuro com sublinhado ("Ver básicos →").

### Fold 4 — Creator (Catarina Tourinho)
Split 50/50 (stack no mobile).
- Esquerda: vídeo curto autoplay-silencioso (loop 6–10s) da Catarina usando a peça em ambiente residencial. Fallback estático caso `prefers-reduced-motion`.
- Direita: bloco de copy em rose muito claro `#F8E3E8`:
  - Eyebrow (Lato, letterspacing 0.18em, uppercase): **"That (Rosie) lifestyle"**
  - Headline (Marcellus): *"A comunidade que veste (Rosie)."*
  - Corpo (DM Sans): "A Catarina é uma das vozes da marca. Se você chegou por ela, chegou em casa."
  - CTA secundário: **"Ver a curadoria da Catarina"** (border rose, sem preenchimento).

### Fold 5 — Garantia (barra tripla)
- 3 ícones-linha finos em rose, cada um com um par headline (Marcellus 1.2rem) + linha DM Sans:
  - **Frete grátis** — acima de R$400, Brasil todo.
  - **5% no PIX** — desconto aplicado no checkout.
  - **Troca fácil** — 7 dias, sem dor de cabeça.

### Fold 6 — CTA final
- Fundo preto quente `#14100C`, texto branco.
- Headline (Marcellus): *"Descubra (Rosie). Just for fun!"*
- Sub (DM Sans): "Chegou até aqui? A gente separou uma seleção para você começar."
- CTA primário grande em rose: **"Ver seleção"**.
- Sob o CTA, micro (DM Sans micro rose claro): "Pagamento seguro · Nuvemshop · Trocas em 7 dias".

## 4. Pré-flight anti-slop (skill aplicada)

Preset escolhido: **soft/premium** (não editorial puro — a página tem função de conversão; não brutalista — o público 16–30 B pede acolhimento, não confronto).

Riscos de "cara de template de IA" identificados e como serão mitigados no mockup acima:

| # | Risco AI-tell | Mitigação no mockup |
|---|---|---|
| 1 | **Três cards iguais** (coleção) virando o "grid genérico shadcn" | Cada card tem crop diferente (retrato, plano-detalhe, still de produto) e a faixa rose no rodapé é a única coisa que padroniza — não é "3 vezes o mesmo componente" |
| 2 | **Gradiente rose-de-IA** no hero (rose saturado escorrendo pra rosa-chiclete) | Rose `#E6D2DC` **não é gradiente** — é chapado sob a foto tratada em 90s. O grão da foto quebra a chapa |
| 3 | **Eyebrow numerada "01 —"** (assinatura de IA) | Eyebrow do fold 4 é só uma frase de brand ("That (Rosie) lifestyle"), sem número, sem "01 —", sem fio decorativo |
| 4 | **CTA "Elevate your style" / "Discover excellence"** | Copy sai direto do brandbook: "Effortless chic, todos os dias" · "Just for fun!" · "Ver a coleção". PT com tag EN, nunca inglês corporativo |
| 5 | **Glassmorphism** no card do creator | Bloco chapado em rose claro `#F8E3E8`. Sem blur, sem transparência falsa |
| 6 | **Ícones-linha genéricos do Heroicons** na barra de garantia | Ícones desenhados em traço fino rose (peso do traço = 1.5px) alinhados oticamente — não são o default. Se cair no genérico, cortar ícones e deixar só tipografia |

**Onde a ousadia é gasta (regra do "tire um acessório"):** no **fio-loop em rose que sublinha a palavra *chic*** no hero. Uma coisa só. Todo o resto é disciplinado. Se aparecer segundo elemento decorativo (dot, curva, fio duplo), cortar.

## 5. 3 dials de calibração

| Dial | Nota | Justificativa |
|---|---|---|
| **VARIÂNCIA_DE_DESIGN** (1 simétrico … 10 caos) | **4** | O brandbook pede grid 4×4 e "respiro generoso" — está do lado disciplinado do espectro. Mas o público é jovem-adulto e a marca se declara "cool" e "irreverente"; algum quebra de simetria (o fio-loop, o crop assimétrico do creator) evita a página parecer catálogo institucional. 4 é o mínimo defensável para não virar template |
| **INTENSIDADE_DE_MOTION** (1 estático … 10 cinematográfico) | **3** | Vídeo do creator autoplay-silencioso + fade sutil no reveal de cada fold. Sem parallax, sem hero animado, sem scroll-jack. Alto motion aqui parece "loja de tênis", não "moda premium feminina". Além disso, o público mobile brasileiro classe B tem device médio e conexão instável — motion pesado quebra CVR mais do que ajuda |
| **DENSIDADE_VISUAL** (1 galeria/arejado … 10 cockpit/dados) | **3** | Preset soft/premium exige respiro; brandbook idem. 3 é "galeria com respiro editorial". Nunca 1 (a página tem função comercial, precisa mostrar produto), nunca 6+ (vira catálogo genérico de moda) |

Baseline da skill (`8/6/4`) foi rebaixada em todos os eixos — é o que o preset soft/premium + o público pedem.

## 6. Handoff para `ui-engineer` (implementação HTML/CSS)

Quando este mockup virar código, o `ui-engineer` recebe:

1. **Tokens** — colar a paleta primária/secundária do brandbook em `tokens-primitive.css` (rose `#E6D2DC`, black `#14100C`, white `#FFFFFF`, grey `#EBEBEB`, light-pink `#F8E3E8`, dark-grey `#BDBAB5`). Fontes em `@import` do Google Fonts (Marcellus + DM Sans, com `font-display: swap`).
2. **Componentes atômicos a definir** — `atom-eyebrow` (Lato uppercase letterspacing 0.18em), `atom-button-primary` (rose escuro sobre preto), `atom-button-secondary` (border rose, sem preenchimento), `molecule-card-coleção`, `organism-hero`, `organism-creator-split`, `organism-garantia-tripla`. Cada componente com os 5 estados canônicos do brandbook Rosie (default/hover/focus/active/print).
3. **Comportamento de scroll** — fade-in de 200ms por fold com `IntersectionObserver`. Nada além disso. `prefers-reduced-motion` cancela tudo e devolve conteúdo estático.
4. **Acessibilidade (WCAG 2.1 AA)** — validar contraste `#14100C` sobre rose `#E6D2DC` (deve dar ~11:1, OK), branco sobre rose escuro do CTA (verificar; se cair abaixo de 4.5:1, escurecer o rose do botão para um shade custom), vídeo do creator com `aria-label`, ícones da garantia com `role="img"` + alt textual, foco visível em rose com outline 2px offset 2px.
5. **Performance** — foto do hero em `next-gen format` (AVIF/WebP), `loading="eager"`; fotos das coleções `loading="lazy"`; vídeo do creator com `preload="metadata"` e `poster` estático; alvo LCP < 2.5s no mobile 4G.
6. **O que NÃO fazer sem confirmação** — não trocar a fonte para "algo parecido"; não converter rose para gradiente para "dar vida"; não adicionar segundo elemento decorativo além do fio-loop no hero; não usar ícones default de biblioteca.

## Pendências para fechar o laudo

- `[PENDENTE — depende de browsing]` — as dimensões 4, 5, 6, 7, 8 da rubrica precisam de captura ao vivo do site para virar veredito ✓/✗. Hoje o `06-gap-site-vs-manual.md` cobre 1, 2, 3 com evidência.
- `[PENDENTE — Ronan]` — confirmar se o wordmark "Loja Rosie" no header do site é o logotipo oficial ou uma versão de tema Nuvemshop, para decidir se troca entra no quick-win.
- `[PENDENTE — Bruno]` — validar disponibilidade das fotos 90s (banco fotográfico da Rosie) para uso na landing quick-win. Se não houver, entra dependência de shoot ou de curadoria do IG da Catarina.
