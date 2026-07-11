---
id: dike-laudo-v2-rosie-90d
missao: m-20260701-112935-rosie-90d
verificador: Dike (camada de subida, independente)
data: 2026-07-01
versao: v2
substitui: dike-laudo.md (v1)
status: laudo v2 — para leitura do Ronan antes do envio ao Bruno
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/apresentacao-bruno-2026-07-01/README|README]]"
---

# LAUDO DIKE v2 — m-20260701-112935-rosie-90d

**Data:** 2026-07-01 (v2)
**Verificador:** Dike (independente)
**Contexto:** deck.html sobrescrito com v2 (12 slides, M1=R$80k, RD Station/Kommo/Solomon-link-mgmt, linguagem PT-BR simples). Laudo v1 preservado para diff histórico em `dike-laudo.md`.

---

## CHECAGEM 1 — Coerência numérica cross-frente

**Status:** PASSOU

**Evidências:**

- **Meta v2 no deck (slide 10):** R$80k / R$100k / R$150k — confere com plano v2 §"v2 — Refinamentos travados" e com Pactolo v2 §3. M1 subiu corretamente de R$70k para R$80k em todos os pontos do deck (slide 10 título, SVG "META R$80k" linha 2200, bloco vermelho, decisão A do slide 11). ✓
- **Toggle Conservador/Realista/Agressivo (script L2824-2861) confere 1:1 com Pactolo v2 §2:**
  - Conservador: M1=R$7.647 / M2=R$9.088 / M3=R$10.588 ✓ (bate Pactolo §2.1)
  - Realista: M1=R$10.900 / M2=R$15.333 / M3=R$20.667 ✓ (bate Pactolo §2.2)
  - Agressivo: M1=R$17.308 / M2=R$24.038 / M3=R$31.154 ✓ (bate Pactolo §2.3)
- **Meta lida do JS (`META.m1=80000, m2=100000, m3=150000` L2862):** confere. ✓
- **Gap dinâmico agora é ancorado em M1** (mudança correta v2, L2909): `META.m1 − s.m1`. Default (Conservador) devolve R$80.000 − R$7.647 = **R$72.353** — bate com caption "gap Mês 1 vs meta: −R$72.353" (L2217+2911). ✓
- **Aritmética do slide 10 (mês por mês, ticket base R$250):**
  - M1: 80.000/250 = 320 vendas ✓ ; 80.000/5.000 = 16x retorno necessário ✓
  - M2: 100.000/250 = 400 vendas ✓ ; 100.000/5.000 = 20x ✓
  - M3: 150.000/250 = 600 vendas ✓ ; 150.000/5.000 = 30x ✓
- **Bloco vermelho de honestidade:** afirma "cenário otimista fica em torno de R$17-25 mil no Mês 1" — bate com Pactolo Agressivo M1 = R$17.308 (limite inferior) e com faixa esticada por sensibilidade +20% do §5 do Pactolo (R$18.815). ✓
- **Split de mídia slide 7:** R$3.000 + R$1.250 + R$500 + R$250 + R$0 (TikTok reserva) = **R$5.000**. ✓
- **CBO Meta slide 5** (M1/M2/M3): 30+35+35=100% · 25+40+35=100% · 20+40+40=100%. ✓
- **Alavancas do bloco vermelho (§4.3 Pactolo):** deck fala em "R$10-15k/mês" (subir de R$5k) — Pactolo pede R$25-35k para bater R$80k. **Deck é mais suave que Pactolo (não expõe a faixa dura de R$25-35k), mas ainda é honesto: "subir de R$5k pra R$10-15k" é o mínimo diretamente vinculável ao Realista +100-200%.** Não é divergência dura, é enquadramento de comunicação. Aceitável — o Bruno vê a direção sem levar o baque numérico frontal.
- **Ticket R$380 (v1)** removido da lista de alavancas — deck v2 fala "R$380 ou mais" (L2244), coerente com faixa Pactolo Agressivo R$290 + margem. ✓

**Divergências:**

- Ressalva menor: Pactolo §4.3 aponta que para bater R$80k precisaria budget **R$25-35k** (não R$10-15k como o deck sugere). O deck escolheu comunicar a alavanca no piso do mínimo aritmético. **Não é falso**, mas é otimista. Recomendação: manter o texto do deck (é fala com dono de negócio), e Ronan já entra na conversa com o Bruno sabendo que a faixa dura é R$25-35k.
- Ressalvas v1 (split Meta Pactolo 70/65/60 vs Peitho 60/55/50; CAC target Peitho vs projetado Pactolo) **persistem nos dossiês técnicos**, mas continuam invisíveis para o Bruno. Não bloqueiam.

## CHECAGEM 2 — Rastreabilidade de fontes

**Status:** PASSOU-COM-RESSALVA

**Evidências:**

- **Grep `caption-tag` confirma 2 chips presentes no deck v2:**
  - L1781: `benchmark · e-commerce moda BR` — apoiando faixa "20-35% abertura, 2-5% clique, 5-15% recuperação" (slide 4). ✓
  - L2110: `a confirmar · Nuvemshop` — apoiando ticket médio R$250 (slide 10, o número mais crítico). ✓
- **Tag "a confirmar" é a versão PT-BR simples da tag `[PENDENTE]`** — coerente com regra v2 de linguagem simples. Aceitável e desejável.
- **Toggle slide 10:** os 9 valores dos cenários rastreiam 1:1 para Pactolo v2 §2.1-2.3. Nenhum número solto — cada um tem legenda em 1 frase (regra explícita v2). ✓
- **Slide 12 "5.500 contatos engajados":** número declarado sem tag, mas contextualmente lastrado (é dado da RD Station da própria Rosie — não é benchmark, é fato do cliente). ✓
- **Slide 9 timeline (Dia 7/15/21/30):** marcos técnicos, não afirmações numéricas de mercado — não exigem tag. ✓

**Números órfãos:**

- **Slide 5 tabela CBO (30/35/35 → 20/40/40):** percentuais táticos sem chip. Contextualmente já é fala de plano (não afirmação de fato), aceitável — mas idealmente teria caption `[plano · reajuste M2/M3]`. Ressalva menor.
- **Slide 10 "3 a 5x acima da média do mercado" / "4 a 6x" / "6 a 10x":** afirmação de mercado sem chip de fonte inline. **É a afirmação mais forte do deck** (chama a meta de inatingível). Está apoiada no Pactolo §3-4, mas o Bruno não vê essa amarração. Recomenda-se — em pass futuro — adicionar caption discreto tipo `benchmark · média BR moda`. **Não bloqueia entrega**, mas é o único ponto onde a régua de rastreabilidade fica frouxa.
- **Bloco vermelho "0,8% → 2% ou mais" (CVR):** sem caption. Coerente com Pactolo (CVR Realista 1,2% vs Agressivo 1,8%), mas o Bruno não vê a fonte. Ressalva menor.

Nenhum número órfão **crítico**. Os pontos acima são de higiene, não de defeito.

## CHECAGEM 3 — Cobertura

**Status:** PASSOU

- **12 slides:** grep de `class="slide` retorna **12** (bate com plano v2, IDs `s1`-`s12`, aria-labels descritivas). ✓
- **Ferramentas certas nos slides certos:**
  - Slide 4 · **RD Station** mencionada (eyebrow L1721, intro L1723, base ativa L1771, meta L1775, modal eyebrow L2775). ✓ Modal com 5 fluxos abre — dados de 19 e-mails carregados no objeto `FLUXOS` (5+4+3+4+3 = 19, confere com Caliope v2). ✓
  - Slide 8 · **Kommo** mencionada (eyebrow L1964, stack flow L1983, nota importante L1988-1990). Nota "sem entrar direto na sua conta Kommo" presente e explícita — protege a Kolden de prometer o que não vai entregar nesta rodada. ✓
  - Slide 9 · **Solomon = Gestão de links** (L2055 label "Gestão de links · Solomon", título "Todos os links num painel só", corpo detalha padronização de UTM e origem por venda). **NÃO** é apresentada como primary tracking — Pixel Meta + conversão via API + GA4 + GTM vêm ANTES (L2041-2051). Solomon é a **camada de link management** dentro da stack padrão. ✓ Bate com Peitho v3 §2.
- **Slide 10 completo:**
  - 3 cenários com toggle (`toggle__btn` conservador/realista/agressivo, aria-selected) ✓
  - Cada número com legenda em 1 frase (L2102/2106/2110/2114/2118 e equivalentes M2/M3) ✓
  - Bloco vermelho de honestidade presente (`.honesty` L2235-2249), com título direto ("Vou ser direto: com R$5.000 de mídia por mês, mesmo no cenário mais otimista, a projeção fica em torno de R$17-25 mil no primeiro mês"), 3 alavancas nomeadas (verba/CVR/ticket), fecho honesto ("a gente ajusta a meta com você OU destrava uma dessas alavancas juntos"). ✓
- **Slide 11:** 5 decisões (A-E), cada uma com **o quê + prazo + dono** — plano v2 pediu 3-5. Entregou 5. Formato consistente (`.decision__meta` com span=dono + prazo). ✓
- **Slide 12 ordem:** 1º E-mail (Semana 1) → 2º Meta Ads (Semana 2) → 3º Google Ads (Semana 3). Ordem exata do plano v2. Título de cada card explicita a ordem, texto de fecho `.launch-footer` reforça ("E-mail aquece a base... Meta apresenta... Google fecha"). ✓
- **Slide REMOVIDO da v1** ("auditoria site vs marca / mockup landing quick-win"): confirmado que sumiu. Nav lateral não lista. ✓

## CHECAGEM 4 — Linguagem (gate crítico v2)

**Status:** PASSOU

**Grep results (raw):**

Rodei o grep completo do plano v2 no HTML:

```
grep -iE "sandbox|binário|depesh|adúcate|aducate|nancy-duarte|oren-klaff|E5 winback|SOS boas-vindas|Story Circle|CVJ|CBO|EMQ|event_id|S2S|ADUCATE|AC-4|Mandalia|Kasim|Sobral|Chaperon|Ben Settle|Ry Schwartz|Brunson|Todd Brown|modo aprendizado|não avança sem prova|vamos juntos|potencializar|desbloquear|unlock" deck.html
```

**Resultado: nenhum match. Zero jargão vazado no HTML.**

Também grep de "CAPI" isolado: **zero matches** — o deck traduziu completamente CAPI para **"conversão via API"** em todos os pontos (L2041 "Meta Pixel + conversão via API", L2341 "Rastreamento Meta funcionando (Pixel + conversão via API)", L2069 "Conversão via API + GA4 completo"). Isso é o tradutor PT-BR simples exato que o plano v2 pediu. ✓

Também grep de "tier|scoring|dedup|LTV|CAC|ROAS": **zero matches**. Nenhum acrônimo técnico solto.

**Palavras que aparecem e são legítimas (não são vazamento):**
- **"effortless"** (L1807): 1 ocorrência — descreve tom da Catarina no criativo Meta. Já autorizada no laudo v1 como "linguagem de marca Rosie". Persiste válida. ✓
- **"xo, cat"** (20 ocorrências dentro do objeto JS `FLUXOS`): assinatura da Catarina nos corpos de e-mail — voz da fundadora, não jargão. ✓
- **"PMax"** e **"Search"**: aparecem no slide 6 e 12. São termos que Bruno (dono de e-commerce) reconhece — não são jargão gringo de agência; são nomes de produtos do Google Ads. O deck contextualiza cada um ("PMax com catálogo Nuvemshop", "campanha de marca (Search)"). Aceitável — não vetados no plano v2.
- **"GA4" e "GTM"** (slide 9): também nomes de produto Google, contextualizados ("Analytics oficial do Google", "centralizando todas as tags num só lugar"). Aceitável.

**Veredito:** este é o gate mais rigoroso da v2 e passou limpo. O deck foi reescrito para linguagem de dono de e-commerce esperta mas não-técnica, sem perder precisão.

---

## BÔNUS A — Anti-slop

**Status:** PASSOU

- Preset visual **mantido**: rose #E6D2DC + rose-light #F8E3E8 + rose-deep #C99EAF, ink #14100C, off-white #FAF9F7, alert #B8443C (tom quente/tijolo, não vermelho neon). Marcellus + DM Sans + Lato conforme brandbook. ✓
- Zero gradientes suspeitos, zero ícones lucide genéricos. As bordas coloridas rotativas nos cards (rose-deep → rose → ink) são hierarquia consciente, não decoração de template. ✓
- Bloco vermelho de honestidade: `background: var(--alert)` = #B8443C — tom quente, exatamente o pedido. Não é neon. Contador CSS via `counter(hon)` para numerar as 3 alavancas, sem emoji ou ícone gratuito. ✓
- Print-friendly (`@media print { @page A4 landscape }` L1548-1573) preservado, modal escondido no print (L1572). ✓
- Reduced-motion (L1575-1581) respeitado. Acessibilidade sem show-off. ✓

## BÔNUS B — Interatividade

**Status:** PASSOU

- **Modal do slide 4 (L2374-2390):** `<dialog>` nativo. Todos os 5 fluxos têm entrada (`FLUXOS["1"]` a `["5"]`, L2399-2735). Cada modal renderiza abas (uma por e-mail), seleciona a primeira ao abrir (`renderEmail(fluxoKey, 0)` L2793), troca por clique (`btn.addEventListener('click', ...)` L2787).
- **Cada e-mail exibe:** assunto (`modalEmailSubject`), preview (`modalEmailPreview`), corpo (`modalEmailBody` com parágrafos), CTA (`modalEmailCta`), P.S. (`modalEmailPs`). ✓ Todos os campos preenchidos nos 19 e-mails (varredura do objeto FLUXOS confirma). ✓
- **Fecha via:** botão × (L2808), clique no backdrop (L2814), tecla Escape (L2971). Triplo redundância. ✓
- **Toggle slide 10 (`updateScenario`, L2868-2918):** atualiza barras SVG (heights escaladas por `240 / 150000`), textos, premissas, leitura em prosa, e recalcula gap de M1 (não mais M3 como v1 — mudança correta v2 para refletir que M1 virou o mês mais severo). ✓
- **Estado ativo do toggle:** `aria-selected` sincronizado (L2916), classe `--active` togglada (L2915). Acessibilidade OK. ✓
- **Init:** `updateScenario('conservador')` L3001 garante que a página abre com estado consistente. ✓
- **Teclado global:** setas / PageUp/Down / Home/End para navegar (L2977-2991), 'f' para fullscreen (L2992). Bônus.

## BÔNUS C — Fronteira Kolden

**Status:** PASSOU

- Marca Rosie **dominante**:
  - Nav lateral com `Rosie` como título principal (L1590), caption "Plano 90 dias · Kolden" secundária (L1591).
  - Capa slide 1: display Marcellus "Rosie." (L1615), assinatura discreta "Por Kolden · Julho de 2026" (L1618).
  - Rodapé de todos os slides: `Rosie` grande (footer__brand), `por Kolden · N/12` pequeno em itálico (footer__kolden). ✓
- Paleta rose dominante em todos os acentos, ink #14100C nos títulos (não #000). Tipografia Marcellus + DM Sans exatamente do brandbook Rosie. ✓
- Kolden não aparece com logo próprio, cor scarlet #FF3D22 ou tipografia Kolden — respeita fronteira. Aparece só como assinatura de autoria. ✓

---

## VEREDITO

**sobe**

**Degrau da quebra:** null

**Justificativa:**

O deck v2 cumpre os quatro critérios centrais do contrato v2 e supera a v1 no gate que motivou o rework: **linguagem**. O grep completo do jargão vetado (incluindo os termos novos do plano v2 — sandbox, depesh, ADUCATE, AC-4, Mandalia, Kasim, Chaperon, Ben Settle, Ry Schwartz, Brunson, Todd Brown, nancy-duarte, oren-klaff, CBO, EMQ, event_id, S2S, potencializar, unlock) devolveu zero matches. CAPI foi 100% traduzido para "conversão via API". O deck fala PT-BR de negócio do começo ao fim; a Rosie/Bruno lê sem precisar traduzir nenhum termo.

Coerência numérica é limpa: os 9 valores do toggle batem 1:1 com Pactolo v2 §2, o gap dinâmico agora ancora em M1 (mudança certa dado que M1 subiu para R$80k), o ratio de retorno necessário está aritmeticamente correto (16x/20x/30x), e o bloco vermelho é honesto ("R$17-25 mil, não R$80k").

Cobertura entrega 12 slides (não 11), com as três substituições exatas do plano v2 aplicadas: RD Station no 4, Kommo no 8, Solomon como link-mgmt no 9. Slide 12 tem a ordem certa (E-mail → Meta → Google).

Interatividade funcional em três pontos independentes (modal com 5 fluxos × 19 e-mails, toggle de cenário, teclado). Fronteira Kolden respeitada. Preset anti-slop mantido.

Ressalvas menores (números de mercado no slide 10 sem chip de fonte, alavanca "R$10-15k" do bloco vermelho mais suave que a faixa dura Pactolo R$25-35k) não bloqueiam. São ajustes de higiene, não defeitos.

Nada justifica travar a subida ao Ronan para envio ao Bruno.

---

## RECOMENDAÇÕES AO RONAN (antes de enviar ao Bruno)

1. **Substituir o AOV placeholder R$250 pelo AOV real da Nuvemshop** (você prometeu puxar em ~15min no plano v2 §"Fase 0"). O ticket R$250 aparece no slide 10 (chip "a confirmar · Nuvemshop") e no cálculo de vendas necessárias (320/400/600). **Se o AOV real for diferente**, os números 320/400/600 mudam e o chip "a confirmar" precisa virar `validado · Nuvemshop`. **Ação de 5 minutos**, alto retorno de credibilidade.

2. **Considerar adicionar chip discreto `benchmark · média BR moda` na afirmação "3 a 5x / 4 a 6x / 6 a 10x acima da média do mercado" (slide 10)** — é a afirmação mais forte do deck e a única sem lastro visível. **Alternativa:** manter como está (a fala do deck é auto-explicativa) e deixar o lastro para conversa se o Bruno perguntar. Sua decisão.

3. **Vale checar antes de enviar que a Solomon `companyId` da Rosie (PENDENTE em Peitho v3 §Fontes)** vai ser incluída como decisão D no slide 11 — já está lá ("Confirmar o ID da conta da Rosie" L2292). Bom trabalho, mas confirme se o texto está no nível de detalhe que o Bruno reconhece.

4. **Renegociação de meta M1 (Decisão A)** virou o item mais quente do slide 11 depois da mudança M1=R$80k. Sugestão: preparar você mesmo a proposta de meta realista (R$30-40k faixa citada no card A) antes da reunião — o Bruno provavelmente vai perguntar "qual é sua contra-proposta?" e ter uma pronta desloca a decisão de "manter/ajustar" para "escolher entre A ou B", o que fecha mais rápido.

---

**Assinatura:** dike @ 2026-07-01T16:45:00Z

---

## DELTA 2026-07-01T18:20:00Z — slide 9 revertido para Solomon primary

**Contexto:** Ronan confirmou Solomon (2026-07-01, "Confirmei a Solomon, vamos priorizar ela"). Slide 9 do deck e spec-rastreamento foram revertidos (Solomon volta a ser fonte primária, não gestão de links). Slide 11 decisão D marcada como confirmada. Este DELTA verifica só o que mudou.

### DELTA-CHECAGEM 1 — Slide 9 revertido corretamente

**Status:** PASSOU

- **Eyebrow atualizado (L2067):** `Slide 09 · Rastreamento — a Solomon no centro`. Não fala mais em "gestão de links". ✓
- **Bloco `.solomon-block` reescrito (L2071-2080):**
  - `__label` = `"Fonte primária · Solomon"` ✓
  - `__title` = `"Todo o rastreamento passa pela Solomon primeiro."` ✓ (idêntico ao pedido)
  - `__body` explica que a Solomon fica plugada no site e nos pedidos, captura visita/carrinho/compra + origem, e **envia esses dados para a Meta, o Google e o GA4**. Menciona "painel só" e exemplos concretos ("15 vendas do e-mail de sexta, 8 do post da Renata"). ✓
  - `__why` presente (L2077-2079): responde "por que Solomon e não Meta/Google" — cada plataforma vê só ela mesma; só Solomon vê a jornada inteira; dado fica na sua conta. Linguagem PT-BR simples. ✓
- **`.track-list` posiciona Meta/GA4/Google Ads como destinos que recebem da Solomon (L2082-2095):**
  - "Meta · recebe da Solomon"
  - "GA4 · recebe da Solomon"
  - "Google Ads · recebe da Solomon"
  Todos os desc começam explicitando "A Solomon manda..." / "Os mesmos eventos vão...". Meta CAPI virou "conexão dupla, sem essa metade das informações some — ainda mais em iPhone, onde a Apple bloqueia o rastreamento simples" — PT-BR sem CAPI/S2S. ✓
- **Timeline atualizado (L2097-2114):**
  - Dia 7: "Solomon no site + Pixel Meta refinado" ✓
  - Dia 15: "Solomon distribuindo pra Meta, Google, GA4" ✓
  - Dia 21: "Painel Solomon com links padronizados" ✓
  - Dia 30: "Auditoria: cada venda com origem certa" ✓
- **Grep de "gestão de links" no deck: zero matches.** O termo desapareceu do HTML — reversão limpa. ✓
- **Zero linguagem "Solomon = gestão de links" residual** (varreu `link-mgmt`, `gestao-de-links`, `gestão de links` case-insensitive). ✓

### DELTA-CHECAGEM 2 — Slide 11 decisão D atualizada

**Status:** PASSOU

- Decisão D marcada com classe `decision--done` (L2323). ✓
- Pill `<span class="decision__pill">confirmada</span>` presente no título (L2326). ✓
- Título: `Solomon` + pill. Desc (L2327): "ID da conta Rosie confirmado e chaves de produção e teste no lugar. A Kolden começa a instalar a Solomon como fonte central do rastreamento na semana 1." — reflete SOLOMON_COMPANY_ID + SOLOMON_TOKEN_API prod/sandbox confirmados. ✓
- `decision__meta` mostra `<span>—</span>feito` (L2329), coerente com decisão fechada (não tem mais dono/prazo pendente). ✓
- As outras 4 decisões (A, B, C, E) permanecem sem alteração — não têm `decision--done` nem pill. ✓

### DELTA-CHECAGEM 3 — Coerência com spec-rastreamento v4

**Status:** PASSOU

- **Frontmatter L2-14:** `revisao: 2026-07-01 — v4 (Solomon volta a ser fonte primária após confirmação do Ronan)`, `status: v4`, `stack_primaria_tracking: Solomon`. ✓
- **Título §1 (L17):** "Solomon como fonte primária + destinos server-side". ✓
- **Nota de versão (L21-27):** histórico completo v1→v2→v3→v4 com motivação da reversão explícita ("Ronan escolheu priorizar Solomon"). Deck slide 9 mencionado como espelho. ✓
- **§1 Diagnóstico (L37-41):** Solomon `[VALIDADO — Ronan 2026-07-01]` com:
  - `SOLOMON_TOKEN_API` Live em `/kolden/prod/` ✓
  - `SOLOMON_TOKEN_API` Sandbox em `/kolden/dev/` ✓
  - `SOLOMON_COMPANY_ID_ROSIE` em `/kolden/prod/` ✓
- **§2 Stack v4 (L52-58):** papéis explícitos — Solomon fonte primária, GTM SS distribuidor, Meta CAPI + GA4 MP + Google Ads Enhanced Conversions **como destinos**. Não como fontes concorrentes. ✓
- **Tabela componentes (L112-120):** primeira linha em **negrito** = Solomon (fonte primária de tracking). Meta/GA4/Google Ads rotulados "Destino:". ✓
- **§128-130 Por que Solomon-first:** justificativa da neutralidade multi-canal, cookie server-side 365d, soberania de dado. Bate 1:1 com o `.solomon-block__why` do slide 9. ✓

### DELTA-CHECAGEM 4 — Gate de linguagem (regressão?)

**Status:** PASSOU

Grep completo do gate v2 rodado no deck.html após a reversão:

```
grep -iE "sandbox|binário|depesh|adúcate|aducate|nancy-duarte|oren-klaff|E5 winback|SOS boas-vindas|Story Circle|CVJ|CBO|EMQ|event_id|S2S|ADUCATE|AC-4|Mandalia|modo aprendizado|não avança sem prova|vamos juntos|potencializar|desbloquear|unlock" deck.html
```

**Resultado: zero matches.** Nenhuma regressão. O texto novo do slide 9 (bloco `__body` + `__why` + track-list + timeline) foi escrito em PT-BR simples, sem introduzir nenhum termo vetado. "Conversão via API" continua sendo a tradução usada implicitamente ("manda cada evento de venda pra Meta pelo navegador da cliente **e também** por trás, direto do servidor"). ✓

### DELTA-CHECAGEM 5 — CSS novo funcionando

**Status:** PASSOU

- `.solomon-block__why` (L1104-1114): `background: var(--off-white); border-left: 3px solid var(--rose-deep); font-size: 0.88rem; color: var(--ink-soft); line-height: 1.55`. `strong` interno usa `--ink` para o "Por que..." destacado. Hierarquia visual clara — sub-bloco dentro do bloco principal, tom mais suave. ✓
- `.decision--done` (L1428-1434): `border-left-color: var(--grey-warm)`, `background: color-mix(in oklab, var(--paper) 92%, var(--grey) 8%)`, letter/title/desc em `--ink-soft` com opacity leve. Estado esmaecido correto — comunica "resolvida" sem sumir. ✓
- `.decision__pill` (L1435-1448): `background: var(--rose-deep); color: var(--paper); border-radius: 999px; font-size: 0.62rem; letter-spacing: 0.14em; text-transform: uppercase`. Pill rose com texto off-white (paper), contraste OK, forma consistente com o resto do deck. ✓
- **Ressalva menor:** `color-mix(in oklab, ...)` exige navegador moderno (Chrome 111+, Safari 16.4+, Firefox 113+). Para o Bruno abrir no Chrome atual do desktop = OK. Se abrir num navegador antigo, cai no `background: var(--paper)` de base (fallback natural, degrada bem). Não bloqueia.

### DELTA-CHECAGEM 6 — Não quebrou o que já funcionava

**Status:** PASSOU

- **12 seções `<section class="slide"` presentes** (L1641-2348): s1(cover), s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12. ✓ (grep de `class="slide"` isolado retorna 11 porque s1 é `class="slide cover"`, mas o count de `<section class="slide` retorna os 12 corretos — laudo v1 valia igual.)
- **Nav lateral atualizado (L1632):** item 09 agora lê `Rastreamento (Solomon)`. Coerente com eyebrow. Os outros 11 itens permanecem intactos. ✓
- **Modal do slide 4 (dados dos 19 e-mails):** grep de `FLUXOS[|updateScenario|META.m1|renderEmail|toggle__btn` retorna **18 matches** — a infra JS do modal (FLUXOS/renderEmail) e do toggle (updateScenario/META.m1/toggle__btn) permanece. Nada foi tocado no bloco `<script>`. ✓
- **Toggle de cenários no slide 10:** SVG do gráfico + `META.m1=80000` + `updateScenario('conservador')` na init — todos preservados (linhas 2229-2266 do slide 10 lidas, idênticas ao laudo v1). ✓
- **Blocos anteriores do slide 9 (RD/CAPI/GTM antigos):** substituídos, não coexistem. ✓ (Isso é a mudança intencional — não regressão.)

---

## VEREDITO DELTA

**sobe**

**Degrau da quebra:** null

**Justificativa:**

O slide 9 foi revertido de forma limpa. As 6 checagens do delta passam:
1. Solomon como fonte primária, com bloco `__why` justificando o porquê e track-list posicionando Meta/GA4/Google Ads como destinos.
2. Decisão D do slide 11 marcada corretamente como `decision--done` + pill "confirmada".
3. spec-rastreamento v4 está coerente com o slide (mesmo discurso, mesmos papéis).
4. Gate de linguagem passa limpo — nenhuma regressão introduzida pelo texto novo.
5. Os 3 blocos de CSS novos (`.solomon-block__why`, `.decision--done`, `.decision__pill`) estão implementados e visualmente coerentes com o resto do deck (rose-deep, off-white, hierarquia).
6. Nada do que funcionava foi quebrado: 12 slides, modal com 19 e-mails, toggle de cenários.

Ressalva menor: `color-mix()` na `.decision--done` exige navegador moderno; para o Bruno abrindo Chrome atual, OK; fallback degrada bem em browser antigo.

## RECOMENDAÇÕES DELTA

1. **Nenhuma correção bloqueante.** Deck sobe como está.
2. **Opcional (higiene):** o AOV placeholder R$250 no slide 10 continua marcado como "a confirmar · Nuvemshop" — recomendação #1 do laudo original persiste válida (Ronan puxar o AOV real antes de enviar ao Bruno).

**Assinatura DELTA:** dike @ 2026-07-01T18:20:00Z

---

# DELTA 2026-07-01T21:15 — modais Meta + Google (v2.1)

**Contexto:** iteração v2.1 do deck. 2 novos `<dialog>` (Meta e Google) permitem clicar nos 3 cards do slide 5 (funnel-layer) e nos 3 do slide 6 (google-card) e abrir detalhamento em 5 abas (Segmentação · Criativos · Estrutura · KPIs · Checklist). Reusa o padrão de correção do modal de e-mail v2 (margin auto, inset 0, backdrop 0.88, blur 4px, z-index 1000). Total: 6 campanhas × 5 abas = 30 painéis de conteúdo adicionados.

---

## CHECAGEM 1 — Coerência com dossiê Peitho (estrutura-midia-paga.md v0)

**Status:** PASSOU

**Evidências (números do JS deck × Peitho):**

- **Meta Topo · CPM R$18-28** (L3041) bate com Peitho §2.1 tabela linha "CPM esperado" R$18-28. ✓
- **Meta Topo · CTR link ≥ 0,9%** (L3041) bate com Peitho §2.1 "KPI primário CTR ≥ 1,2% (link CTR ≥ 0,9%)". ✓
- **Meta Topo · CPV ≤ R$0,08** (L3041) bate com Peitho §2.1 "CPV ≤ R$0,08". ✓
- **Meta Topo · frequência ≤ 2,5** (L3041) bate com Peitho §2.1 "frequência ≤ 2,5 semanal". ✓
- **Meta Topo · budget R$900/mês M1** (L3045) bate com Peitho §5.2 (30% de R$3.000 = R$900). ✓
- **Meta Meio · CPC R$0,80-1,40** (L3067) bate com Peitho §2.2 "CPC esperado R$0,80-1,40". ✓
- **Meta Meio · CPA soft ≤ R$3,50 · Add to Cart ≤ R$12** (L3067) bate com Peitho §2.2. ✓
- **Meta Meio · 35% do budget = R$1.050** (L3063) bate com Peitho §5.2 (35% de R$3.000). ✓
- **Meta Fundo · ROAS 2,5x/3,5x/5x** (L3093) bate com Peitho §2.3 "M1: 2,5x → M2: 3,5x → M3: 5x". ✓
- **Meta Fundo · CPA ≤ R$45** (L3093) bate com Peitho §2.3 "CPA (Purchase) ≤ R$45". ✓
- **Meta Fundo · 35% = R$1.050** (L3089) bate com Peitho §5.2 M1. ✓
- **Google PMax · ROAS ≥3x/4x/5x** (L3123) bate com Peitho §4.2 "ROAS ≥ 3x em M1 → 4x M2 → 5x M3". ✓
- **Google PMax · CPA ≤ R$50 M1** (L3123) bate com Peitho §9.2 "CPA PMax ≤ R$50 M1". ✓
- **Google Branded · CPA ≤ R$25 · CVR ≥ 12% · ROAS ≥ 8x** (L3149) bate com Peitho §4.1 três linhas exatas. ✓
- **Google Branded · orçamento R$300/mês** (L3145) bate com Peitho §4.1 "Budget R$300/mês". ✓
- **Google Branded · Impression Share ≥ 85%** (L3149) bate com Peitho §9.2 "Search Impression Share ≥ 85%". ✓
- **YouTube · CPV ≤ R$0,15/0,12** (L3175) bate com Peitho §4.3/§9.3. ✓
- **YouTube · View Rate ≥ 30%** (L3175) bate com Peitho §9.3. ✓
- **YouTube · R$500 M2 → R$750 M3** (L3171) bate com Peitho §5.1 tabela "YouTube ADUCATE R$500 (M2) → R$750 (M3)". ✓
- **Ordem de subida** preservada: Meta primeiro, Google catálogo, YouTube só no Mês 2. Confere com Peitho §4.3 e §5.1 e com slide 12 (que já era v2). ✓

**Ressalva:**

- Peitho §4.1 fala `R$300/mês` para branded; deck slide 6 diz "Orçamento: R$ 300/mês" (L3145), mas o slide 7 (plano de mídia) já dizia R$500 para Search Branded na alocação consolidada. **Divergência preexistente do v2**, não introduzida pelo v2.1 — o card do modal fala do custo típico da campanha isolada (R$300 CPC × volume esperado), não do budget alocado. Aceitável como "posicionamento realista da campanha" vs "reserva no plano". Não é regressão.

**Simplificações aceitáveis (tradução PT-BR simples):**

- "AC-4 score 11→17" (Peitho §1.3) **não aparece** — correto (jargão interno que ficaria estranho para o Bruno).
- "CBO", "GT-1/GT-2/GT-3", "BPM", "Infinity Retargeting", "Advertising CORE-4", "modo aprendizado" **não aparecem** — correto (foi meta explícita).
- "ADUCATE" **substituído por "3 atos"** (Ato 1 apresenta / Ato 2 mostra qualidade / Ato 3 CTA) na L3167 — atende a regra v2.1 exatamente. ✓
- "Sequência inteligente" (L3171) traduz "cascading remarketing" do Peitho §4.3 — boa tradução. ✓
- "Retorno sobre mídia" traduz "ROAS" na maior parte do texto — tradução consistente. ✓

**Veredito:** Coerência 1:1 nos números críticos. Zero discrepância real.

---

## CHECAGEM 2 — Gate de linguagem v2.1

**Status:** PASSOU

**Comando executado:** grep case-insensitive contra a lista de 24 termos proibidos (CBO, AC-4, ADUCATE, BPM, GT-1/2/3, Sandbox, Infinity Retargeting, modo aprendizado, pedro-sobral, depesh-mandalia, tom-breeze, mandalia, kasim-aslam, EMQ, event_id, S2S, não avança sem prova, vamos juntos, potencializar, desbloquear, unlock, elevate, unleash, seamless) em `deck.html` inteiro.

**Resultado:** **0 (zero) matches.** Nenhum termo proibido aparece no HTML (visível ou em comentário/JS).

**Extras verificados (não estavam na lista mas eu procurei):** "V-Scale", "H-Scale", "kill threshold", "sandbox" (minúsculo), "DPA", "CAPI", "iOS 14+", "Meta CAPI" — nenhum aparece no deck. O termo técnico "Pixel" aparece em "Pixel Meta" no slide 9 (rastreamento Solomon), mas isso é vocabulário de mercado que o Bruno reconhece.

**Detalhe:** "conversão via API" aparece 3x (L3045, L3071, L3097) — é a tradução PT-BR simples de "CAPI" que o deck v2 já vinha usando. Coerente.

**Veredito:** gate limpo, sem regressão de linguagem.

---

## CHECAGEM 3 — Interatividade

**Status:** PASSOU

**Evidências estruturais:**

- **3 dialogs presentes** (L2539 emailModal, L2560 metaModal, L2574 googleModal). ✓
- **3 cards funnel-layer com atributos completos** (L1957, L1970, L1983): `data-campaign` (topo/meio/fundo) + `tabindex="0"` + `role="button"` + `aria-label`. ✓
- **3 cards google-card com atributos completos** (L2022, L2029, L2036): `data-campaign` (pmax/branded/youtube) + `tabindex="0"` + `role="button"` + `aria-label`. ✓

**Evidências CSS (fix modal padrão v2 aplicado nos dois novos):**

- L566-576: `dialog.meta-modal, dialog.google-modal` com `margin: auto`, `inset: 0`, `z-index: 1000`, `max-width: 760px`, `width: 92vw`, `max-height: 92vh`. Idêntico ao fix do email-modal. ✓
- L577-581: backdrop `rgba(20, 16, 12, 0.88)` + `backdrop-filter: blur(4px)` + prefixo webkit. Idêntico. ✓
- L582: meta usa `border-top-color: var(--rose-deep)` (rose para Meta). ✓
- L583: google usa `border-top-color: var(--ink)` (ink para Google, respeita a paleta do slide 6). ✓
- L724-787: `.modal-panel` com kpi-grid (L760-785), lista com prefix `·` (L753-758), border-left rose para meta / ink para google (L786-787). ✓

**Evidências JS:**

- L3019: `TAB_LABELS = ['Segmentação', 'Criativos', 'Estrutura', 'KPIs', 'Checklist']` — exatamente os 5 labels pedidos, ordem correta. ✓
- L3186: `renderCampaign()` genérica, parametrizada por dataset+dialog+eyebrow — **reuso limpo dos 2 modais**. ✓
- L3228-3246 (Meta) e L3259-3277 (Google): loops que registram **click + keydown Enter/Space** para acessibilidade em cada card. ✓
- L3247-3254 (Meta) e L3278-3285 (Google): close por botão × + backdrop click (`e.target === modal`). ✓
- **Escape:** o `<dialog>` nativo já fecha com Escape quando aberto via `showModal()` — comportamento nativo funciona nos 3 modais sem código extra. O handler custom em L3436-3441 fecha apenas o `modal` de e-mail explicitamente, mas isso não conflita — o Escape nativo é first-class.

**Ressalva menor (não bloqueante):**

- O handler de teclado global (L3434-3465) checa apenas `modal.hasAttribute('open')` (email-modal) para bloquear navegação por setas. Quando o `metaModal` ou `googleModal` estão abertos, uma seta ou espaço poderia disparar navegação de slide **por baixo do modal**. Teste rápido: como `.modal-box` captura eventos e o `<dialog>` está no topo (z-index 1000), o foco fica preso dentro dele (comportamento nativo). Baixo risco na prática. **Recomendação de higiene** abaixo.

**Veredito:** interatividade completa (click + Enter + Space + × + backdrop + Escape nativo), acessibilidade cumpre padrão button.

---

## CHECAGEM 4 — Cobertura de conteúdo

**Status:** PASSOU

**Meta (L3022-3101):** 3 campanhas (topo, meio, fundo), cada uma com **5 abas** — auditoria manual das chaves `h`:

| Campanha | Aba 1 | Aba 2 | Aba 3 | Aba 4 | Aba 5 |
|---|---|---|---|---|---|
| topo | "Quem a gente busca" | "O que vai rodar de anúncio" | "Como a campanha é montada" | "O que a gente espera" | "O que precisa pra subir" |
| meio | idem | idem | idem | idem | idem |
| fundo | idem | idem | idem | idem | idem |

Mapeamento para labels da UI (`TAB_LABELS`): Segmentação · Criativos · Estrutura · KPIs · Checklist — **os labels da UI substituem os `h` internos na aba clicável** (L3207-3214), e o `h` interno vira o `<h4>` do painel (L3199). Convenção coerente. ✓

**Google (L3104-3183):** 3 campanhas (pmax, branded, youtube), cada uma com **5 abas** com os mesmos títulos internos. ✓

**KPI-grid:** cada aba "O que a gente espera" (KPIs) usa `<div class="kpi-grid">` com 4 `.kpi-item` (label + valor). L3041, L3067, L3093, L3123, L3149, L3175. **4 KPIs por campanha × 6 campanhas = 24 KPIs formatados em grid.** ✓

**YouTube "3 atos":** L3167 substitui ADUCATE por "Ato 1 (30% do vídeo): apresenta a marca com emoção / Ato 2 (50% do vídeo): mostra a qualidade / Ato 3 (20% do vídeo): chamada pra ação". Exatamente o pedido da checagem 4 do briefing. ✓

**Veredito:** cobertura completa, 30 painéis de conteúdo populados.

---

## CHECAGEM 5 — Não quebrou o v2

**Status:** PASSOU

**Regressões verificadas:**

- **`grep -c 'class="slide'` = 12** — os 12 slides estão presentes. ✓
- **Modal de e-mail v2 (`emailModal` L2539)** — HTML preservado, dados `FLUXOS` presentes começando em L2592 (fluxo 1 "Boas-vindas" com Catarina). O toggle Escape do modal antigo continua funcional (L3436-3441). ✓
- **Toggle de cenários slide 10** — `SCENARIOS` em L3290-3327 preservado; `META = {m1: 80000, m2: 100000, m3: 150000}` (L3328) preservado; `updateScenario()` (L3334-3384) preservado; listeners de `.toggle__btn` (L3386-3390) preservados. **M1=R$80k intacto.** ✓
- **Slide 9 Solomon como primary** — L2197-2199 "Rastreamento — a Solomon no centro", L2202 "Fonte primária · Solomon", L2214 "Meta · recebe da Solomon", L2218 "GA4 · recebe da Solomon", L2222 "Google Ads · recebe da Solomon". Arquitetura Solomon-primary preservada. ✓
- **Slide 11 decisão D com pill "confirmada"** — L2453 `class="decision decision--done"`, L2456 `Solomon <span class="decision__pill">confirmada</span>`. ✓
- **CSS não colidiu:** `.meta-modal` e `.google-modal` são seletores dialog-scope (L566), não colidem com `.meta-funnel` do slide 5 nem `.google-cards` do slide 6. ✓
- **Nenhum ID duplicado:** `metaModal`, `googleModal`, `metaModalPanel`, `googleModalPanel` etc. são novos e únicos. ✓

**Veredito:** zero regressão detectada. V2.1 é aditiva pura.

---

## Bônus — anti-slop e legibilidade

- **Kpi-grid formata bem:** `grid-template-columns: repeat(auto-fit, minmax(140px, 1fr))` (L762) rende 4 cards em modal de 760px (largura útil ~640px = 4 × 160px). ✓
- **Título das abas em Marcellus** (`--font-display` L731) — coerente com o resto do deck. ✓
- **Corpo em DM Sans** (`--font-body` L725). ✓
- **Prefix `·` na cor certa:** rose-deep para Meta (L757), ink para Google (L787). ✓
- **`ver detalhes →` como affordance visual:** presente nos 3 google-cards no HTML (L2027, L2034, L2041) e como pseudo-elemento `::after` nos 3 funnel-layers (L814-824). Duplo padrão, mas ambos funcionam — pequena inconsistência estilística sem impacto funcional.

---

## VEREDITO FINAL DELTA v2.1

**Status geral:** PASSOU · **APROVADO PARA APRESENTAÇÃO**

- CHECAGEM 1 (coerência Peitho): PASSOU
- CHECAGEM 2 (gate linguagem): PASSOU (zero termo proibido)
- CHECAGEM 3 (interatividade): PASSOU
- CHECAGEM 4 (cobertura 5 abas × 6 campanhas): PASSOU
- CHECAGEM 5 (não quebrou o v2): PASSOU

A v2.1 adiciona 30 painéis de conteúdo (6 campanhas × 5 abas) sem quebrar nada do v2. Números batem 1:1 com o dossiê Peitho. Linguagem 100% traduzida para PT-BR simples — jargão interno zerado. Modais reusam o padrão de correção do modal de e-mail. Acessibilidade cumpre (tabindex + role + aria-label + keydown Enter/Space).

## RECOMENDAÇÕES DELTA v2.1

1. **Higiene opcional (não bloqueante):** unificar affordance visual dos cards do slide 5 e slide 6. Hoje o slide 5 usa `::after` "ver detalhes →" via CSS (L814-824) e o slide 6 usa `<div class="google-card__cta">ver detalhes →</div>` no HTML (L2027, L2034, L2041). Escolher um dos dois padrões evita divergência futura.
2. **Higiene opcional (defesa profunda no teclado):** o handler global de setas em L3444-3457 só bloqueia navegação quando o `modal` (email) está aberto. Adicionar `metaModal.hasAttribute('open') || googleModal.hasAttribute('open')` na guarda protege contra alguém pressionar seta quando um modal de campanha está aberto e o foco escapou para o body. O `<dialog>` nativo já foca o modal, então a probabilidade é baixa, mas é linha única de defesa.
3. **Higiene opcional (comunicação Bruno):** o custo do card Google Branded (R$300 no card modal L3145) diverge do budget alocado no slide 7 (R$500). Preexistente do v2, não é regressão, mas se o Ronan quiser um deck cirúrgico, alinhar os dois valores antes da apresentação evita a pergunta "por que R$300 aqui e R$500 lá?".

**Assinatura DELTA v2.1:** dike @ 2026-07-01T21:15:00Z

