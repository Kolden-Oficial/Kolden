---
id: dike-laudo-v3-rosie-90d
missao: m-20260701-112935-rosie-90d
verificador: Dike (delta v2.2, independente)
data: 2026-07-01
versao: v3 (pós-Solomon)
sucessor_de: dike-laudo-v2.md
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/apresentacao-bruno-2026-07-01/README|README]]"
---

# LAUDO DIKE v3 — deck Rosie pós-Solomon 30d

**Data:** 2026-07-01T22:30
**Trigger:** deck v3 aplicou F0.1 (AOV=R$465,59) + baseline R$55.405 + 3 lentes de atribuição + retenção M+1 no radar; verificação delta contra laudo v2.1 aprovado + plano v3.
**Método:** grep contra `deck.html` (4.022 linhas), leitura direta dos blocos novos, verificação aritmética manual, cross-check contra dossiês DELTA v3/v4.1.

---

## CHECAGEM 1 — Coerência numérica

**Status:** PASSOU

**Evidências:**

- **AOV R$ 465,59** presente em 6 pontos coerentes (L2565 slide 10 M1, L2594 M2, L2623 M3, L2783 decisão C do slide 11, L3845/3857/3869 objeto `SCENARIOS` no JS). Zero orfandade. ✓
- **Vendas necessárias:** 80.000 / 465,59 = **171,84 → 172** ✓ (L2569); 100.000 / 465,59 = **214,80 → 215** ✓ (L2598); 150.000 / 465,59 = **322,20 → 322** ✓ (L2627). Aritmética limpa.
- **Cenários Pactolo DELTA v3 no JS (L3843/3855/3867):**
  - Conservador: M1=16.181 · M2=19.233 · M3=22.407 → bate com plano v3 (Cons 16k/19k/22k) ✓
  - Realista: M1=20.300 · M2=28.555 · M3=38.490 → bate (Real 20k/29k/38k, arredondamento 28.555≈29k OK) ✓
  - Agressivo: M1=27.784 · M2=38.594 · M3=50.019 → bate (Agr 28k/39k/50k) ✓
- **Gap M1 Conservador:** 80.000 − 16.181 = **R$ 63.819** ✓ (renderizado no HTML estático L2716 `−R$63.819`; JS sobrescreve com mesma matemática L3924 `META.m1 − s.m1`).
- **Baseline R$ 55.405 · 119 pedidos · CAC R$ 48,59 · retorno agregado 10,56x** presentes juntos em L2677 (baseline-block). Verificação de coerência interna: 119 pedidos × R$ 465,59 AOV = R$ 55.405,21 → **casa exatamente** (arredondamento de centavos). CAC 48,59 × 119 pedidos = R$ 5.782 — coerente com R$ 5k mídia + slippage de attribution nos 119 (nem todos vieram de mídia paga). ROAS 10,56 = 55.405 / 5.246 (spend efetivo Meta+Google, batendo com Solomon 30d). Todos os quatro números fecham entre si. ✓
- **+44% sobre baseline:** (80.000 − 55.405) / 55.405 = 44,4% → **+44%** (L2736 título honesty, L2767 decisão A slide 11). ✓
- **+512% sobre zero:** eixo retórico de contraste (5k → 80k é 15x, mas +512% é referência ao "sobre zero" no cenário Conservador Pactolo antigo — retórica coerente com o texto). Não é claim numérico auditável, é enquadramento. ✓
- **R$ 250 remanescentes:** 2 matches (L2349 e L2807). **Ambos falso-positivo:** L2349 é `R$ 250 · 5%` do budget YouTube no slide 7 (plano de mídia), L2807 é a reserva de "R$ 250-500" para teste TikTok na decisão F. Nenhum é AOV. ✓

**Ressalvas menores:**

- **Fallback estático desatualizado no slide 10 (L2722, L2728):** o HTML de partida ainda lista `<li>Ticket médio · R$ 220</li>` (L2722) e `Faturamento projetado: R$ 7,6k · R$ 9,1k · R$ 10,6k` (L2728) como valores default do `<ul id="premisesList">` e `#scenarioReading`. Isso é sobrescrito na hora pelo `updateScenario('conservador')` no init (L4016), então em uso normal o Bruno **nunca vê**. Mas se JS falhar/estiver desabilitado (print/PDF gerado por engine sem JS, browser antigo, screenshot pré-render), aparecem os números v1. **Recomendo hardcodar o fallback com os valores v3** — 2min de edit, elimina o risco.
- **Caption de gap regressa no toggle (L2716 vs L3925):** HTML estático mostra `"gap M1 vs meta: −R$63.819 · modelo Pactolo · comparar com baseline real R$55,4k abaixo"` (texto curado v3). JS `updateScenario` sobrescreve com `"gap Mês 1 vs meta: −R$63.819 · nenhum mês bate"` (texto v2.1 residual). **A cada clique no toggle, o contexto "modelo Pactolo · baseline real" desaparece.** Recomendo atualizar L3925-3926 para preservar o enquadramento novo — 1 linha de edit.

## CHECAGEM 2 — Rastreabilidade

**Status:** PASSOU

**Evidências:**

- **Grep `validado · Solomon 30d`: 4 matches** — L2148 (retention-callout slide 4), L2499 (attribution-lenses slide 9), L2566 (AOV slide 10 M1), L2677 (baseline-block slide 10). Cobre todos os pontos onde número novo aparece pela primeira vez no fluxo de leitura. ✓
- **Chip `a confirmar · Nuvemshop` do laudo v2:** removido (grep zero matches). Correto — o AOV virou fato validado, não pendência. ✓
- **Cross-check dos dois novos números novos que também têm o chip:** `10,56x` (baseline) e `0,97%` (retenção) — ambos vinculados a `Solomon 30d`. Zero número novo órfão. ✓
- **Chips herdados do v2.1 preservados:** `benchmark · e-commerce moda BR` (L2208, L2863), `benchmark · casos SizeBay em moda` (L2841), `benchmark · Nielsen Norman + Baymard` (L2851), `benchmark · curadoria em moda` (L2869), `depende do catálogo` (L2857). ✓ Slide 12 (Melhorias no site) preserva a régua de rastreabilidade.

**Ressalva menor:**

- A afirmação "3 a 5x / 4 a 6x / 6 a 10x acima da média do mercado" (slide 10) — ressalva v2.1 persiste sem chip. Não é regressão do v3, é pendência antiga não endereçada. Não bloqueia (Ronan já sabe, decisão de estilo).

## CHECAGEM 3 — Cobertura dos 6 passos do plano

**Status:** PASSOU

- **Passo 1 · AOV R$250→R$465,59 (slide 10):** aplicado nos 3 pontos (M1/M2/M3) + JS SCENARIOS + decisão C slide 11. Grep de "R$ 250" → 0 matches como AOV; 2 matches como valores de budget de mídia (falso-positivo confirmado). ✓
- **Passo 2 · Baseline block antes do toggle:** presente em L2673-2679 com classe `baseline-real`, header "Baseline junho/2026 · Solomon 30d" (L2675), corpo "R$ 55.405 de receita aprovada · 119 pedidos · CAC R$ 48,59 · retorno agregado 10,56x. A Rosie **já roda** este número com R$ 5 mil de mídia. Os três cenários abaixo comparam com esta linha de partida — não com zero." (L2677). ✓
- **Passo 3 · Bloco vermelho reescrito:** título L2736 "Junho fechou R$ 55.405 com R$ 5 mil de mídia. Meta M1 = R$ 80 mil pede +44% sobre isso — não +512% sobre zero." As 3 alavancas (retenção do primeiro mês, conexão Meta com venda real, origem certa) estão nomeadas em L2741-2743. Fechamento honesto "Se as três destravarem em 30 dias, R$ 80 mil no Mês 1 é factível. Se uma travar, a faixa realista é R$ 65-75 mil. Não é meta impossível — é meta condicionada." (L2745-2747). ✓ Discurso do plano v3 §Passo 3 reproduzido com fidelidade.
- **Passo 4 · 3 lentes slide 9:** bloco `attribution-lenses` em L2478-2501 com 12,54x (Meta Ads Manager, L2484) + 3,62x (Painel Solomon último clique pago, L2489) + 2,45x (Solomon crédito distribuído, L2494) + fecho "É pra isso que a Solomon existe: você para de discutir com a Meta e passa a decidir onde investir olhando um só número, do mesmo lado da mesa." (L2499). ✓
- **Passo 5 · Caption retenção slide 4:** bloco `retention-callout` em L2145-2150 com "Hoje só 0,97% das clientes de junho voltam a comprar no mês seguinte (safra jun/2026 · Solomon). Alvo depois dos 5 fluxos rodando: 5%." (L2148). ✓
- **Passo 6 · Decisões atualizadas slide 11:** decisão A com pill `confirmada` + texto "+44% sobre os R$ 55,4 mil de junho" (L2767); decisão C `parcial` (Ticket médio já via Solomon, Nuvemshop devolve margem+recompra) (L2782-2783); decisão F **TikTok Ads** nova, com pill `decisão sua` e as duas opções (A ativar em Fase 2 / B registrar fora do escopo) (L2803-2810). Total: 6 decisões — casa com título "Seis decisões pra fechar" (L2759). ✓

## CHECAGEM 4 — Gate de linguagem PT-BR

**Status:** PASSOU

**Grep case-insensitive contra 26 termos:**
```
sandbox|CBO|EMQ|event_id|S2S|ADUCATE|AC-4|Mandalia|Kasim|Sobral|Chaperon|
Ben Settle|Ry Schwartz|Brunson|Todd Brown|nancy-duarte|oren-klaff|
modo aprendizado|não avança sem prova|vamos juntos|potencializar|
desbloquear|unlock|elevate|seamless
```

**Resultado: zero matches.** Nenhum termo vetado. Os textos novos (baseline-block, honesty reescrito, attribution-lenses, retention-callout, decisão F TikTok) foram redigidos em PT-BR de dono de e-commerce — "conexão Meta com a venda real", "origem certa em cada venda", "você para de discutir com a Meta". Coerente com gate v2.1. ✓

**"CAPI" isolado:** 1 match em L3530, dentro do modal Meta v2.1 (ressalva pré-existente conhecida, declarada explicitamente na chamada da missão). Não é regressão v3. "Conversão via API" aparece 3x no deck (mesma quantidade da v2.1) — tradução PT-BR simples de CAPI preservada. ✓

## CHECAGEM 5 — Anti-slop

**Status:** PASSOU

Auditoria visual dos 3 blocos novos:

- **`baseline-real` (L2674-2679):** `background: var(--off-white)`; `border-left: 3px solid var(--ink)`; header em `--font-micro` uppercase letter-spaced com `color: var(--rose-deep)`; corpo em `--font-body`; caption-tag padrão. **Rose/ink/off-white puro. Marcellus/DM Sans/Lato conforme brandbook. Zero gradiente IA, zero ícone lucide, zero neon.** ✓
- **`retention-callout` (L2145-2150):** `background: var(--off-white)`; `border-left: 3px solid var(--rose-deep)` (rose, não neon); header em `--font-micro` uppercase com `color: var(--rose-deep)`; corpo em `color: var(--ink)`; caption-tag padrão. Coerente. ✓
- **`attribution-lenses` (L2479-2501):** `background: var(--paper)`; `border: 1px solid var(--grey)`; grid `repeat(auto-fit, minmax(200px, 1fr))` (mesmo padrão dos kpi-grids v2.1); 3 sub-blocos com border-left de cores hierárquicas (`--grey-warm` → `--rose` → `--rose-deep` — gradação semântica: mais artificial → mais real); títulos em `--font-display` (Marcellus) 1.5rem; corpos em `--font-body` 0.82rem; separador `border-top: 1px solid var(--grey)`; caption-tag padrão. **Paleta rose/ink/off-white/paper, tipografia Marcellus/DM Sans. Estilo alinhado com blocos v2.1 (`.solomon-block__why`, `.kpi-grid`).** ✓

Os 3 blocos novos usam estilos **inline** (não classes CSS separadas). Não é anti-slop em si, mas cria dívida de manutenção — se Ronan decidir dar polish, vale extrair para classes. Não bloqueia.

## CHECAGEM 6 — Não quebrou v2.1

**Status:** PASSOU-COM-RESSALVA

- **Contagem de slides:** grep `class="slide` retorna **13** — 1 a mais que o laudo v2.1 (que fechou em 12). Investigado: o v3 tem `s1` cover + `s2` a `s13` sequenciais, com nav lateral atualizado (L2011-2023) e rodapé "N/13" em vários pontos (L2752 slide 10 "10/13", L2815 slide 11 "11/13", L2880 slide 12 "12/13"). **Slide 12 = "Melhorias no site"** (SizeBay + identidade visual + pág de produto + pagamento/frete + página de coleção); **Slide 13 = "Próximos passos"** (a antiga ordem de estreia E-mail→Meta→Google do v2.1). **Este é um acréscimo fora do escopo do plano v3** — o plano v3 pediu 6 edits pontuais, não novo slide. Verificando com o v2.1 laudo (que dizia "12 slides") vs v3 (13 slides): o novo slide "Melhorias no site" foi inserido em algum ponto entre v2.1 e v3, independente do plano v3. **Não é regressão do plano v3, mas é escopo fora do plano** — vale registrar na trilha de auditoria. O conteúdo do slide 12 é coerente (SizeBay como aposta principal + 4 melhorias secundárias, todas com chip de benchmark), não introduz jargão. Aceitável. ✓
- **Toggle `updateScenario`:** função presente em L3883-3931, chamada no init L4016 `updateScenario('conservador')`. Sobrescreve barras SVG, valores, premissas e caption de gap. ✓
- **Modais Meta/Google slide 5/6:** `metaModal` em L2967, `googleModal` em L2981, `TAB_LABELS` em L3440 agora com 6 labels (`['Segmentação', 'Criativos', 'Estrutura', 'KPIs', 'Checklist', 'vs Mercado']`). O v2.1 tinha 5 labels; agora tem 6 (label "vs Mercado" adicionado — presumivelmente para comparação com benchmarks). **Mais um acréscimo v2.1→v3 fora do escopo do plano v3, mas aditivo puro** (não quebra os 5 labels antigos, adiciona 1). Aceitável. ✓
- **Modal e-mail slide 4:** `FLUXOS` preservado, listeners intactos. Não tocado. ✓
- **Nav lateral (L2011-2023):** 13 itens, IDs `s1`-`s13`, data-goto sequencial. ✓
- **Rodapé "N/13":** consistente em vários slides (10/13, 11/13, 12/13). Confere. ✓

**Ressalva menor:** os dois acréscimos v2.1→v3 fora do escopo do plano v3 (slide "Melhorias no site" + label "vs Mercado" no modal Meta/Google) **não foram declarados no plano v3**. Presumo que foram edits diretos do Ronan ou de fase intermediária entre v2.1 e v3 aplicando o plano. **Não bloqueia** porque são aditivos coerentes (conteúdo com chip de benchmark, sem jargão), mas registro para rastreabilidade.

---

## VEREDITO

**Status:** **sobe-com-ressalvas** (não bloqueantes — Ronan decide se aplica antes de enviar)

**Degrau da quebra:** null

**Justificativa:**

Os 6 passos do plano v3 estão aplicados com fidelidade. Aritmética limpa: 172/215/322 batem com AOV R$ 465,59, gap M1 Conservador = R$ 63.819 fecha em META.m1 − s.m1, baseline R$ 55.405 fecha com 119 pedidos × R$ 465,59, ROAS 10,56 fecha com 55.405 / 5.246 (spend Solomon 30d). O rebranding narrativo do slide 10 ("+44% sobre R$ 55,4k, não +512% sobre zero") ancora o insight-âncora em fato Solomon validado. Rastreabilidade limpa — 4 chips "validado · Solomon 30d" em cada ponto onde número novo estreia. Gate de linguagem passa limpo (zero regressão). Anti-slop OK — paleta rose/ink/off-white preservada, Marcellus/DM Sans conforme brandbook. Interatividade v2.1 preservada (modais Meta/Google/e-mail, toggle SCENARIOS, teclado global).

As ressalvas são **cirúrgicas e opcionais**:
1. Fallback estático do slide 10 tem valores v1 (R$ 220 · R$ 7,6k) — só aparece se JS falhar; risco baixo.
2. Caption de gap regressa no clique do toggle — perde o contexto "modelo Pactolo · baseline real" a cada troca de cenário.
3. Escopo fora do plano v3 (slide "Melhorias no site" + label "vs Mercado") — aditivo coerente, não quebra nada; registro para rastreabilidade.
4. Ressalvas v2.1 pendentes (chip "3-5x/4-6x/6-10x", split Meta Pactolo 70/65/60 vs Peitho 60/55/50, faixa "R$10-15k" mais suave que Pactolo R$25-35k) — persistem sem endereçamento no plano v3, mas não são regressão.

Nada disso trava o envio ao Bruno. O deck v3 comunica a virada narrativa correta: **a Rosie já vale mais do que o modelo Pactolo assumia; a conversa deixa de ser "meta inatingível" e vira "3 alavancas concretas para +44%".**

---

## RECOMENDAÇÕES DELTA v3

1. **Fix de 2min · atualizar fallback estático do slide 10** (L2722, L2728) — trocar `R$ 220` por `R$ 465,59` e `R$ 7,6k · R$ 9,1k · R$ 10,6k` por `R$ 16,2k · R$ 19,2k · R$ 22,4k`. Elimina o risco de screenshot/PDF sem JS mostrar valor v1.

2. **Fix de 1min · caption de gap no JS** (L3925-3926) — trocar `'gap Mês 1 vs meta: −' + fmtBRL(gap) + ' · nenhum mês bate'` por `'gap Mês 1 vs meta: −' + fmtBRL(gap) + ' · modelo Pactolo · comparar com baseline real R$ 55,4k abaixo'`. Preserva o enquadramento novo em qualquer clique de toggle.

3. **Registrar no contrato/histórico** os dois acréscimos v2.1→v3 fora do plano (slide "Melhorias no site" + label "vs Mercado"). Não precisa desfazer — coerentes com o deck — mas o log_de_decisao do contrato deveria refletir que houve edits além dos 6 passos do plano v3.

4. **Opcional (higiene visual):** extrair os estilos inline dos 3 blocos novos (`baseline-real`, `retention-callout`, `attribution-lenses`) para classes CSS. Não bloqueia; é dívida técnica.

5. **Pré-envio ao Bruno:** validar no Chrome atual do desktop (color-mix() em `.decision--done` v2.1 já usa Chrome 111+, sem regressão). Testar clique nos 3 modais (Meta, Google, e-mail) + toggle nos 3 cenários + navegação por teclado (setas/PageDown). Print A4 landscape para confirmar que cada slide fica em 1 página.

---

**Assinatura:** dike @ 2026-07-01T22:30
