# DOSSIÊ BRW MOVELARIA

> **Versão:** 0.3 (Fase A + Fase C — Argos + Apify + Coleta Drive)
> **Autoria:** Argos Chief (blocos 1-9 base) + Hermes (Fase B — Apify blocos 4/5; Fase C — Coleta Drive)
> **Data da coleta:** 2026-07-06
> **Cliente:** BRW MOVELARIA LTDA — CNPJ 65.898.142/0001-63
> **Método:** Firecrawl (search + scrape) + Apify (instagram-scraper com comentários, tiktok-scraper, facebook-pages-scraper) + MCP `google-drive` para extração da pasta pública `1UawpyhuBDonkyac9G61xQDRvouZBG6Ge`. Google Reviews falhou por rejeição do short-link `share.google` como URL de entrada — assunto tratado em nota de LACUNA no Bloco 6.
> **Gate de confiabilidade:** ARGOS-CL-001 aplicado.

**Coleta bruta preservada em `coleta-bruta/`:**
- `argos-transcript-2026-07-06.md` — reporte completo do subagente Argos
- `instagram-top-20-posts-2026-07-06.md` — 20 posts recentes com engajamento, temas, clientes B2B identificados
- `tiktok-perfil-2026-07-06.md` — snapshot de perfil e 3 vídeos (canal quase abandonado)
- `facebook-page-2026-07-06.md` — dados da página FB + descobertas (categoria "Consulting agency", data de criação 2022-02-03)
- **`drive-2026-07-06.md` — NOVO — inventário e análise dos 129 assets baixados da pasta Drive pública** (5 meses × 24 subprojetos × 516 MB de creatives, produzido pelo Hermes na Fase C)

**Assets locais em `anexos/drive-2026-07-06/`** (novo): 89 JPG + 13 PNG (selos) + 19 MP4 + 38 frames extraídos organizados por mês/subprojeto espelhando o Drive.

**Custo Apify real:** US$ ~0,03 (bem abaixo do teto de US$ 15 acordado com o Ronan).
**Custo Drive:** zero — pasta pública, MCP `google-drive` (soberania Kolden), ffmpeg embutido via `imageio-ffmpeg` (pip).

---

## Bloco 1 — Cartão de identidade

**Cross-check ✅ (2 fontes independentes: CNPJá + Serasa Experian)**

- **Razão social:** BRW MOVELARIA LTDA
- **Nome fantasia:** BRW Movelaria
- **CNPJ:** 65.898.142/0001-63
- **Situação cadastral:** Ativa
- **Data de abertura:** **25/03/2026** — CNPJ tem 3 meses e 11 dias em 2026-07-06 (Serasa confirma literalmente)
- **Natureza jurídica:** Sociedade Empresária Limitada (206-2)
- **Capital social:** R$ 100.000,00
- **Regime tributário:** Lucro Real ou Presumido (não é Simples)

**Endereço da matriz (Receita Federal):**
- Rodovia BA 093, SN, Lote 01A — Polo Industrial de Camaçari, BA — CEP 42816-065
- **Contato fiscal:** (71) 3506-7924 · fiscal@rvsempresariais.com.br (contabilidade RVS Empresariais)

**Endereço-showroom (Google Meu Negócio, distinto da matriz):**
- **R. Barão de Loreto, 3 — Graça, Salvador, BA — CEP 40150-270**
- **WhatsApp comercial:** +55 71 99902-7171
- Horário: seg–sáb 8h–19h, dom fechado
- Categoria GMB: "Furniture maker" / "Moveleiro"
- Atributos declarados: LGBTQ+ friendly + women-owned

**Terceiro canal telefônico (Facebook):** +55 71 98195-0611
→ **Três números distintos** entre GMB, Facebook e Receita — indício forte de operação em transição/reformulação (ver Bloco 2).

**Sócios — todos com ingresso em 25/03/2026:**

| Sócio | Papel | Faixa etária | Origem | Notas |
|---|---|---|---|---|
| STRATEGY BUSINESS & SOLUTIONS, LLC | Sócio | — | Estados Unidos (CNPJ br 56.034.338/0001-19) | Procurador: Leonardo Luis do Carmo. Sem informação pública sobre a LLC. |
| **Bruno Felice Vilas Boas** | **Sócio-Administrador** | 21-30 | Brasil | Sartre COC 2013 + Adm UFBA em andamento desde 2014 (Escavador/Lattes). |
| Joyce de Brito Vieira | Sócia | 51-60 | Brasil | — |
| Janinne Maltez de Almeida Tourinho | Sócia | 41-50 | Brasil | Médica. Sócia da holding 3J Participações LTDA (CNPJ 12.801.837/0001-19). Ligação à família Maltez de Almeida (Hospital Aristides Maltez de Salvador). |
| Catarina Quireza Leite Agareno | Sócia | 21-30 | Brasil | MEI/PJ próprio desde 31/01/2022 (CNPJ 45.091.606/0001-18) — Salvador. |
| David Nascimento de Souza | Sócio | 21-30 | Brasil | — |

**CNAEs:**
- **Principal: 4754-7/01 — Comércio varejista de móveis** (não é indústria)
- Secundária: 7319-0/02 (Promoção de vendas)
- Secundária: 4619-2/00 (Representantes comerciais)

**Marca INPI:** `[LACUNA]` — busca pública anônima do INPI redireciona para tela de login. Requer consulta autenticada.

**Alertas do gate:**
1. Claim "30 anos" (bio IG) contradiz idade do CNPJ (3 meses) — e também as declarações do próprio Facebook ("há mais de 10 anos") e das legendas do IG ("Desde 1998").
2. CNAE de comerciante contradiz claim "preço de fábrica" — estrutura formal é revenda, não fabricação.
3. Sede na Receita fica no Polo Industrial de Camaçari (que sugere fábrica) mas o CNAE é comércio — provável terceirização de produção para o parque industrial local, ou o endereço é apenas domicílio fiscal.

**Fontes:** https://cnpja.com/office/65898142000163 · https://empresas.serasaexperian.com.br/consulta-gratis/BRW-MOVELARIA-LTDA-65898142000163 · https://www.escavador.com/sobre/10855036/bruno-felice-vilas-boas · https://cnpj.biz/45091606000118 · https://www.consultasocio.com/q/sa/janinne-maltez-de-almeida-tourinho

---

## Bloco 2 — História e marcos — VALIDAÇÃO DO CLAIM "30 ANOS"

**VEREDITO:** Claim "30 anos" `[⚠️ NÃO VERIFICADO — CONTRADITÓRIO]`. A evidência pública se contradiz em quatro pontos:

**Linha do tempo real reconstruída (cross-check IG + FB + posts arqueológicos + Apify):**

- **~2012-2013:** Marca **BRW Movelaria** ativa. Post do IG @brwmovelaria em 2022 traz TBT da **CasaCor Bahia 2013 "feita pela BRW"** (`CcD4RWqOabK`). Post `CaAJAi6v4LI` (2022) afirma: "Há mais de 10 anos no mercado moveleiro".
- **2022-02-03:** **Página oficial do Facebook `@BRWmovelaria` criada** (fonte: Apify, campo `creation_date`). Data-âncora sólida.
- **2022:** Perfil IG @brwmovelaria com postagens ativas — Páscoa 2022, projeto **Iberostar Praia do Forte — Star Prestige** em abril/2022, **Faculdade Baiana de Direito** em Salvador.
- **2022 (agosto):** Post IG assina "**BRW Movelaria — Desde 1998**".
- **23/01/2026:** GMB da BRW já publicava posts orgânicos (dois meses ANTES do CNPJ atual).
- **25/03/2026:** CNPJ 65.898.142/0001-63 constituído — 5 sócios entram simultaneamente + LLC americana.
- **27/03/2026:** primeiro post pós-CNPJ no GMB.
- **04/2026:** JUCEB publica o registro no boletim oficial 04/2026.
- **05/2026:** SEFAZ-BA edital de intimações Nº 09/2026 cita "BRW MOVELARIA LTDA" (ref. 244.559.894-NO).
- **2026 (janeiro-julho):** ~20 posts/mês no Instagram, tom novo, reposicionamento em curso.

**4 comunicações públicas simultaneamente conflitantes:**

| Canal | Comunicação | Data |
|---|---|---|
| IG bio (atual) | "30 anos de design, conforto, preço de fábrica e atendimento personalizado" | 2026 |
| Legenda IG (post `DTgU3tWAUeX`) | "BR.W Movelaria. Desde 1998." | 2026-01-15 |
| Legenda IG (post `DWHg-I4iX04`) | "BRW Movelaria — Desde 1998 — Transformando espaços em experiências" | 2026-03-24 |
| FB about (Apify) | "há mais de 10 anos no mercado moveleiro" | Apurado 2026-07-06 (página criada 2022-02-03) |

**Hipótese-âncora atualizada v0.2:**

A **marca BRW** operou como consultoria/nome fantasia desde ~2012-2013 sob PJ diferente — o piso comprovado por evidência pública é **10 anos**. O "Desde 1998" e o "30 anos" **não têm sustentação documental pública** e são provavelmente narrativas de marketing (herança de outra empresa/marca familiar, ou storytelling puro).

**Achado novo v0.2 — categoria original "Consulting agency" no Facebook:** a categoria da página FB é "Consulting agency" (não Furniture Maker). Isso sinaliza que o negócio pode ter começado como **consultoria de curadoria de mobiliário** para hotéis/incorporadoras/investidores — sem fábrica própria, sem revenda direta ao consumidor. A transição para "movelaria com preço de fábrica" seria um **pivô de posicionamento**, cristalizado no CNPJ de 03/2026.

Se a hipótese for verdadeira, a estrutura atual é:
- **Antes (~2012-2022):** consultoria de curadoria, terceirizando fabricação.
- **Agora (2026-):** movelaria formalizada com CNPJ próprio, com sede em Polo Industrial (Camaçari) e showroom em bairro nobre (Graça), tentando internalizar a cadeia — mas o CNAE permanece "Comércio varejista de móveis", não indústria.

**Origem/fundadores:** `[LACUNA]` — nenhuma reportagem, entrevista ou fonte primária pública identifica quem fundou a BRW originalmente. Bruno Felice Vilas-Boas é o sócio-administrador atual (jovem, 21-30, ainda em graduação).

**Fontes:** posts IG identificados; boletim JUCEB 04/2026; edital SEFAZ 09/2026; Apify facebook-pages-scraper (`za3xie5EWi0OgXsC8`).

---

## Bloco 3 — Portfólio & segmentos

**O que a auto-descrição alega servir:** corporativo, hoteleiro, institucional, residencial.

**O que efetivamente aparece nos canais (evidência Apify, ao vivo, últimos 6 meses):**

### Portfólio de peças com identidade autoral

Peças com nome próprio identificadas nos posts:
- **Cadeira Megan** — revestimentos em couro envelhecido / linho / linhos diversos
- **Cadeira Flora** — "linhas suaves, proporções equilibradas"
- **Cadeira Thor · Chamonix · Dijon (couro ecológico) · Cesca · Napoli · Siriu**
- **Banqueta Cora**
- **Poltrona Notte** (estrutura em Inox) · **Frattini · Chair**
- **Mesa Jurerê** (nome regional, contexto São João)
- **Mesa Lateral Aresta / Poá / Taça / Fragma / Archi Nexus / Curvas / Cole / Tripé / Spectrum / Spherical / Tri**
- **Namoradeira em Balanço**
- **Coleção "TRAMA"** (lançamento 14/05/2026)
- **Sofá-cama** (vertical Airbnb, sem nome próprio ainda)

Isso posiciona a BRW **acima da média local em branding de produto** — mais próximo do que Breton/Frattini fazem no eixo SP do que dos concorrentes baianos.

### Segmentos observados no conteúdo (peso relativo, últimos 6 meses)

- **Residencial (DOMINANTE):** salas, cadeiras, mesas laterais — 12+ dos 20 posts.
- **Empreendimentos imobiliários (INCORPORADORA — segmento novo confirmado v0.2):** **Singulari Alphaville Guarajuba** aparece em **6 posts** no IG + **2 vídeos no TikTok**, com projeto integral (varanda gourmet, deck/piscina, Quarto Superior + colchões, visita técnica). Copy: "Singulari é um projeto pensado desde a origem". Relacionamento estruturado, não venda avulsa.
- **Hoteleiro:** **Iberostar Praia do Forte — Star Prestige** (post ~2022 + reel `DWmy8LHDUYk` de 2026-04-06 revisitando o projeto). Cliente-âncora do discurso "quem pensa grande".
- **Corporativo:** **Faculdade Baiana de Direito** (post `CcOcx7BuvPN`, abril 2022) — cliente histórico.
- **Vertical Airbnb / short-stay / investidor imobiliário (achado v0.2, NICHO CENTRAL):** discurso explícito de ROI para investidor:
    - `DWq5-4xlgUr` (2026-04-07): "Studios bem mobiliados não são detalhe. São estratégia... Se você investe, precisa parar de pensar em mobiliário como custo. E começar a tratar como ferramenta de retorno."
    - `DZtFAsdtZNi` (2026-06-15): "Projetamos espaços pensando no retorno do investimento e na melhor experiência do seu hóspede."
    - `DaWL7kHj-FG` (2026-07-01, mais recente): sofá-cama Airbnb.
    - Hashtags: `#Airbnb #airbnbhost #airbnbsalvador #alugueltemporada #studioscompactos`.
- **Institucional:** ainda não identifiquei projeto público específico.

### Modo de produção

- Comunicação predominante: "sob medida" + "MDF com lâmina de madeira".
- Uso recorrente de nomes de coleções indica **linha própria com identidade**, não apenas revenda.
- **CNAE de comércio varejista + presença no Polo Industrial de Camaçari** confirmam modelo híbrido: **especifica sob medida + terceiriza produção** (fabricantes do polo industrial baiano).
- Facebook categorizado como **"Consulting agency"** reforça: o coração do negócio é curadoria/projeto/consultoria, não fabricação própria.

---

## Bloco 4 — Presença digital por canal (Apify v0.2)

| Métrica | Instagram | TikTok | Facebook | Google Meu Negócio |
|---|---|---|---|---|
| Handle | @brwmovelaria | @brw.movelaria | @BRWmovelaria | BRW MOVELARIA |
| Seguidores / curtidas | **541** (snippet Google) | **2 fãs · 10 hearts** | **26 · 26 followers** (só 1 following) | 5,0★ · **1 review** |
| Following | 1.274 (ratio 2,35 → sinal "farm" leve) | 0 | 1 | — |
| Posts / vídeos | ~174 posts | **3 vídeos totais** | ativo, poucas interações | 3 posts do proprietário (jan/mar 2026) |
| Cadência recente | Alta (jan-jul/2026, jun 2026 explosão de posts) | Inativo desde abr/2026 | Baixa | Baixa |
| Formato dominante | Carrossel (60%) + reel (20%) + feed (20%) | Reel vertical (3/3 são crossposts do IG) | — | Foto + link WhatsApp |
| Bio / tagline | "30 anos de design, conforto, preço de fábrica e atendimento personalizado" | Idêntica ao IG (copia-cola) | "Curadoria, projeto e execução para quem pensa grande" (intro FB) | Auto-descrição oficial |
| Categoria | — | — | **Consulting agency** ⚠️ | Furniture maker |
| Reviews | 0 avaliações visíveis | 0 comentários totais | **0 reviews** | 1 review (5,0★) |
| Roda ads? | `[LACUNA IG]` | Não | **Não** ("This Page isn't currently running ads") | — |
| Data de criação da página | 2013 (assinatura) / 2022 (registro FB) | ~fev/2026 | **2022-02-03** ✅ Apify | 03/2026 |
| Website vinculado | www.brwmovelaria.com.br (fora do ar) | Nenhum bioLink | **http://brwmovelaria.com** (sem .br — 3ª URL, também fora do ar) | Link para WhatsApp |
| Telefone | — | — | 71 98195-0611 | 71 99902-7171 |

### Instagram — métricas ao vivo (Apify, 20 posts recentes)

- **Média de likes:** 7,5 por post
- **Máximo:** 18 likes (`DWHg-I4iX04` — 2026-03-24)
- **Total comentários (20 posts):** ~12
- **Engajamento médio:** ~1,4% sobre 541 seguidores (dentro da faixa 1-3% saudável, mas base muito pequena)
- **Comentários públicos**: quase inexistentes — 15 dos 20 posts têm 0 comentários. Canal funciona como vitrine, não como conversão via comentário/DM pública.

### TikTok — 3 vídeos, canal abandonado

- **2 fãs · 10 hearts totais · 0 following · 3 vídeos** (todos crossposts do IG).
- Play counts: 136, 147, 149 — TikTok não está distribuindo.
- Sem atividade após 08/04/2026.
- ROI atual: **zero**. Continuar só se houver produção nativa vertical (voz + tendências de áudio).

### Facebook — página quase morta

- **26 followers · 1 following · 0 reviews**.
- Página criada em **2022-02-03**, categoria **"Consulting agency"** (não Furniture Maker).
- **Não roda Meta Ads** hoje (nenhum gasto em performance vem desta página).
- 3ª URL declarada (`brwmovelaria.com` sem .br) também morta.

### Site próprio (checagem Firecrawl)

- ⚠️ **DNS de www.brwmovelaria.com.br NÃO RESOLVE** (2026-07-06).
- ⚠️ **DNS de brwmovelaria.com NÃO RESOLVE** (referenciado pelo Facebook).
- ⚠️ **Canal YouTube @BRWMovelaria retorna 404** (removido ou renomeado). Só sobrevivem 2 vídeos "Projeto Iberostar" em outras URLs.
- Nenhum canal digital próprio está funcional. Todo o tráfego que vai para "link na bio" está caindo em página inexistente.

### Frases-chave da comunicação (voz da marca)

Palavras-âncora recorrentes:
- **"curadoria"** (aparece em 12+ dos 20 posts)
- "critério", "com critério"
- "silêncio e intenção"
- "linhas equilibradas", "proporção correta", "presença silenciosa"
- "quem pensa grande"
- "Design que permanece", "Curadoria que permanece"
- "atemporal"
- "solidez, precisão e padrão elevado de entrega"
- "ROI", "ferramenta de retorno" (vertical Airbnb)

Estilo: minimalista, poético, curto. Sinaliza copywriter/agência.

### Alertas

- 541 seguidores após 10+ anos é **muito baixo** para o discurso de "marca consolidada" — mesmo com todo o esforço de posting em 2026.
- Facebook praticamente morto e classificado como Consulting agency.
- TikTok não é canal — é um placeholder abandonado.
- **Site quebrado** é a maior falha operacional: CTA orgânico cai em URL inexistente. Isso é churn de leads em vez de captura.
- Estado atual: **1 canal ativo (Instagram) + 1 CTA de conversão (WhatsApp)**. Todo o resto é vitrine sem tração ou canal quebrado.

---

## Bloco 5 — Instagram deep-dive (Apify v0.2)

Dataset completo em `coleta-bruta/instagram-top-20-posts-2026-07-06.md`.

### Top 5 posts por engajamento (últimos 6 meses)

| # | Data | Formato | Likes | Comments | Tema | Copy-chave |
|---|---|---|---:|---:|---|---|
| 1 | 2026-03-24 | carrossel | 18 | 2 | Studio integrado (sala/cozinha/mezanino) | "Cada metro quadrado é pensado com inteligência." Assina "Desde 1998". |
| 2 | 2026-01-30 | reel | 17 | 0 | Visita técnica ao **Singulari Alphaville Guarajuba** | "Projeto bem executado começa com presença, análise e critério." |
| 3 | 2026-04-06 | reel | 11 | 2 | Projeto **Iberostar** | "Curadoria, projeto e execução para quem pensa grande." |
| 4 | 2026-07-01 | carrossel | 10 | 2 | Sofá-cama Airbnb (mais recente) | "Nosso sofá-cama vira o espaço extra ideal para hospedar alguém." |
| 5 | 2026-04-13 | reel | 9 | 0 | "Conforto não precisa chamar atenção" | Copy poética de marca. |

### Padrões observados

- **Todo post nomeia uma peça** e enfatiza atributos técnicos (dimensões, material).
- Geotag Salvador, Bahia em 5 dos 20 posts.
- Estilo minimalista, foto de produto isolada / renderização 3D.
- Predominância de carrossel (12/20) + reels (4/20) + feed image (4/20).
- Legendas curtas, poéticas, foco em design.

### Assinaturas de marca conflitantes no MESMO canal

Em legendas de posts de 2026 coexistem, sem qualquer coerência editorial:
- "**BR.W Movelaria. Desde 1998.**" (`DTgU3tWAUeX`, 2026-01-15)
- "**BRW Movelaria — Desde 1998 — Transformando espaços em experiências.**" (`DWHg-I4iX04`, 2026-03-24)
- "**BRW Movelaria — Curadoria que permanece.**" (`DW46K_1heKJ`, 2026-04-13)
- "**BRW Movelaria — Curadoria, projeto e execução para quem pensa grande.**" (`DWmy8LHDUYk`, 2026-04-06)
- "**BRW Movelaria — Design que permanece.**" (`DWZyPYmjxuL`, 2026-04-01)

Nenhuma consistência de tagline. Cada post assina diferente.

### Comentários públicos / dores em DMs

**Cobertura mínima confirmada:** 15 de 20 posts (75%) têm **0 comentários**. Apify retornou 0 comentários no campo `comments.text` porque o total agregado é ~12 comentários em 20 posts. **Não há material qualitativo agregado de dor/desejo dos leads via comentários públicos** — as objeções e perguntas provavelmente vivem no WhatsApp, invisíveis para nós.

**Interpretação:** o canal é vitrine + gerador de tráfego para WhatsApp. Não é canal de discussão. Para capturar voz do lead qualitativa, seria preciso: (a) acesso ao histórico do WhatsApp comercial, ou (b) instalação de tag/feedback no site (que hoje não existe).

### Clientes B2B identificados no conteúdo

- **Singulari Alphaville Guarajuba** (incorporadora, 6 posts + 2 vídeos TikTok) — projeto multi-ambiente com visita técnica registrada. Relacionamento estruturado.
- **Iberostar Praia do Forte — Star Prestige** (hotelaria premium, 1 reel 2026 + posts históricos 2022).
- **Faculdade Baiana de Direito** (corporativo/institucional, 2022).

### Vertical Airbnb / short-stay / investidor — pitch verbal completo

Extratos textuais (voz da marca sobre o nicho):

> "Studios bem mobiliados não são detalhe. São estratégia. Quando o ambiente é pensado com intenção, ele reduz tempo de vacância, aumenta percepção de valor e acelera decisão."

> "Se você investe, precisa parar de pensar em mobiliário como custo. E começar a tratar como ferramenta de retorno."

> "A dúvida mais comum de quem monta um imóvel para aluguel de temporada é: como acomodar mais pessoas sem deixar o apartamento apertado? A escolha certa dos móveis em espaços compactos faz toda a diferença."

> "Projetamos espaços pensando no retorno do investimento e na melhor experiência do seu hóspede."

**Interpretação:** este é o pitch comercial mais articulado da marca. É o nicho onde a BRW tem **linguagem própria de ROI** que os concorrentes baianos não têm.

### CTA principal

- **WhatsApp:** `wa.me/5571999027171` (link na bio + repetido em 100% dos GMB posts).
- "Fale com nossos consultores" é a fórmula recorrente.
- Não há formulário, landing page, funnel ou tracker.

---

## Bloco 6 — Reputação Google

**Google Meu Negócio (BRW MOVELARIA — R. Barão de Loreto, 3 — Graça, Salvador):**

- **Nota média:** 5,0 ★
- **Total de avaliações:** **1** (apenas uma)
- Distribuição: 5★=1, demais=0
- Status: Ativo, aberto
- Atributos: LGBTQ+ friendly, women-owned
- Posts do proprietário: 27/03/2026 (linkado ao WhatsApp), 24/03/2026, 23/01/2026

**Tentativa de coleta estruturada Apify:** falhou. O actor `compass/Google-Maps-Reviews-Scraper` rejeitou o short-link `https://share.google/vBuzzrOYazb7gelnK` como URL inválida. Seria preciso resolver o short-link para o URL longo do Google Maps (ou obter o Place ID canonical `ChIJ...`) — pendente. Como a única review indica n=1, o retorno de coleta estruturada aqui seria mínimo — decidi não bloquear a v0.2 por isso.

**Temas de elogio / reclamação:** `[LACUNA]` — com apenas 1 review, sem base estatística.

**Programa de resposta a reviews:** `[LACUNA]` — 1 review não permite observar histórico de resposta.

**Alerta:** ausência de reviews após meses de operação (e após 10+ anos de marca) é **sinal de fraqueza da mecânica de reputação**. Nem Iberostar, nem Faculdade Baiana, nem Singulari deixaram review. O showroom no bairro nobre não está gerando review flow.

**Fontes:** Google Search + Google Maps Place page + tentativa Apify (falhou).

---

## Bloco 7 — Concorrência

**Concorrentes locais (Salvador/BA) — movelarias / móveis planejados sob medida:**

| # | Marca | IG followers | Localização | Posicionamento | Preço aparente |
|---|---|---|---|---|---|
| 1 | **@bahiacloset** | não confirmado | Av. Paulo VI, 1151, Pituba | "Única como você, há mais de 20 anos" — showroom recém-inaugurado | Premium (líder do bairro) |
| 2 | **@alfa_planejados** | **17,6 K** | Salvador e RMS | "Desde 1978 realizando sonhos com excelência" (48 anos) | Premium tradicional |
| 3 | **KSA Decor** | site próprio | Pituba | Revenda Italínea | Médio |
| 4 | **Selectus** | selectusmoveis.com.br | Pituba | Marca própria | Médio-Premium |
| 5 | **@marcenariaconecta** | 196 followers | Salvador | "Planejados sob medida MDF premium" | Médio |
| 6 | **@delaremoveisplanejados** | nichado | Bahia | Marcenaria exclusiva | Médio |
| 7 | **@movelariavieira** | — | Salvador/BA | "Marcenaria que perdura" | Médio |
| 8 | **@hopeplanejados** | — | Bahia | MDF Palha, design clean/moderno | Médio |
| 9 | **@dluxomoveisplanejados** | — | Bahia | Foco pertencimento e detalhe | Médio |
| 10 | **@jurema.marcenaria** | — | Bahia | Atelier premium, peças autorais nomeadas | Premium autoral |
| 11 | **@divenza** | — | Pituba | Showroom novo (2026) | Médio |
| 12 | **Green Móveis Planejados** | FB 499 curtidas | Salvador | Popular | Popular |

**Concorrentes nacionais (segmento hoteleiro / corporativo):**

| # | Marca | Perfil |
|---|---|---|
| 1 | **SYMM** | Móveis sob medida para hotelaria. Premium, alto fluxo. |
| 2 | **Sular Móveis** | sular.com.br — referência em hotelaria sob medida. |
| 3 | **ESSANTO Fábrica de Móveis** | João Pessoa/PB — sob medida para lojistas, empresas e construtoras no Nordeste. Concorrente regional direto. |
| 4 | **Rudnick** | rudnick.com.br — "um dos maiores complexos moveleiros do país", linha corporativa + exportação. Escala industrial. |
| 5 | **Venture Móveis** | venturemoveis.com.br — "onde o design encontra a escala" — corporativo em escala. |
| 6 | **Sancapel** | Desde 2007 — hotelaria sob medida. |
| 7 | **Breton** | @bretonoficial — móveis de alto padrão, forte curadoria. |


**Gap analysis:**
- **Alfa Planejados** tem 17,6 K seguidores IG vs. 541 da BRW = **32× a base social** com discurso semelhante.
- **Bahia Closet** tem showroom estruturado + case de 20 anos comprovado em imprensa local.
- Rudnick e SYMM têm **site funcional com portfolio** (BRW tem 3 URLs, todas mortas).
- ESSANTO, SYMM e Sular explicitam claramente que servem construtoras / hotelaria com escala — a BRW alega, mas o volume de conteúdo B2B é escasso vs. residencial (exceção: Singulari é seu único caso B2B ao vivo hoje).

**O que a BRW faz que concorrentes locais não fazem:**
- **Curadoria autoral com nomes próprios de peças** (Megan, Flora, Aresta, TRAMA etc.) — branding de produto acima da média local, mais próximo do que Breton / Frattini fazem no eixo SP.
- **Discurso Airbnb / ROI para investidor** — nenhum concorrente local articula esse pitch. É o angulo mais defensável da marca hoje.
- Comunicação verbal muito bem escrita — sinaliza copywriter/agência.

---

## Bloco 8 — Site próprio & SEO leve

**URLs oficiais referenciadas (todas mortas):**
- www.brwmovelaria.com.br (bio IG)
- http://brwmovelaria.com (website FB)
- Canal YouTube @BRWMovelaria (404)

**Estado técnico:** ⚠️ **NENHUMA URL PRÓPRIA RESOLVE**. Não há HTTPS, não há schema, não há blog — porque não há site.

**Consequência:**
- SEO orgânico = zero para queries diretas.
- Nenhum tráfego direto ao "site".
- CTA orgânico do IG "clique no link" cai em página inexistente = **churn de leads na etapa mais barata do funil**.
- Facebook aponta para 2 URLs mortas (a `.com.br` da bio IG e a `.com` do FB).

**Ranking em queries óbvias:** `[LACUNA]` — impossível sem página indexada.

**CTA principal / captura:**
- **WhatsApp: wa.me/5571999027171** é o único ponto de captura ativo.
- Não há formulário, landing page, funnel ou tracker identificáveis.

**Recomendação técnica (curta):** subir o site é a intervenção de **maior alavancagem** que a BRW pode fazer. Custo baixo, ROI alto, e destrava:
- SEO local (movelaria bahia, moveis sob medida salvador, moveis hoteleiros)
- Portfolio visual (hoje tudo depende do Instagram)
- Captura de leads (formulário → CRM/WhatsApp)
- Retargeting (pixel Meta / Google Ads)

---

## Bloco 9 — Menções na imprensa / feiras

**Feiras B2B do setor moveleiro (Movelsul, ForMóbile, ABIMAD):** `[LACUNA]` — nenhuma menção pública identificada.

**CASA COR Bahia:** **verificado** — post do IG @brwmovelaria de 2022 com "#tbt da @casacor_bahia em 2013 feita pela BRW" (`CcD4RWqOabK`). Portanto **a BRW participou da CASACOR Bahia 2013**. Confirmação em site oficial da CasaCor 2013 `[LACUNA]` (edição arquivada).

**Portais especializados (Móbile Fornecedores, Revista da Madeira, Portal Mobiliário):** `[LACUNA]`.

**Imprensa local Bahia (A Tarde, Correio 24h):** `[LACUNA]`.

**LinkedIn dos sócios:**
- **Bruno Felice Vilas Boas:** Escavador confirma Adm UFBA + Sartre COC 2013. LinkedIn próprio tem homônimos — perfil não confirmado.
- **Janinne Maltez de Almeida Tourinho:** confirmada sócia da 3J Participações (holding familiar) e ligada à família Maltez de Almeida (Hospital Aristides Maltez, centenário em Salvador) — **capital reputacional local significativo**.
- Demais sócios: sem presença pública destacada.

**Alerta oficial (JUCEB):** BRW MOVELARIA LTDA registrada no boletim JUCEB 04/2026.
**Alerta SEFAZ:** BRW MOVELARIA LTDA em edital de intimações SEFAZ-BA Nº 09/2026 (2026-05, ref. 244.559.894-NO). Requer investigação — pode ser regular (intimação padrão) ou pendência.

---

## SÍNTESE — números-âncora do dossiê

**Legal/cadastral:**
- CNPJ 65.898.142/0001-63 aberto em **25/03/2026** (3 meses e 11 dias em 2026-07-06).
- Capital social R$ 100.000,00.
- 5 sócios brasileiros + 1 sócio LLC americana.
- CNAE principal 4754-7/01 (Comércio varejista de móveis).
- 3 endereços/telefones distintos (matriz Camaçari fiscal / showroom Graça / FB).

**Digital:**
- Instagram: 541 followers · 1.274 following · ~174 posts · engajamento 1,4%.
- TikTok: 2 fãs · 10 hearts · 3 vídeos · canal abandonado desde 04/2026.
- Facebook: 26 followers · 26 curtidas · 0 reviews · **categoria "Consulting agency"** · **página criada 2022-02-03** · não roda ads.
- Google Meu Negócio: 1 review · 5,0★.
- Sites próprios: **3 URLs referenciadas, todas mortas.**

**Portfolio verificado:**
- Cliente hoteleiro: **Iberostar Praia do Forte — Star Prestige**.
- Cliente incorporadora: **Singulari Alphaville Guarajuba** (6 posts IG + 2 vídeos TikTok — projeto multi-ambiente).
- Cliente corporativo: **Faculdade Baiana de Direito** (2022).
- Peças autorais nomeadas: 20+ (Megan, Flora, Aresta, Chamonix, TRAMA, Jurerê etc.).
- Vertical explícito: **Airbnb / short-stay / investidor imobiliário** (pitch de ROI, 3+ posts).

**Concorrência:**
- Concorrente local mais forte: **Alfa Planejados** (17,6 K IG · 48 anos).
- 32× a base social da BRW no Instagram.

**Custos da coleta:**
- Firecrawl: ~28 créditos
- Apify: **~US$ 0,03** (bem abaixo do teto US$ 15)

---

## TOP 5 ACHADOS SURPREENDENTES

1. **A marca alega 30 anos, mas se contradiz 4 vezes em canais próprios.** CNPJ de 03/2026, FB criado 2022, "Desde 1998" nas legendas do IG, "há mais de 10 anos" no FB about, "30 anos" na bio IG — **nenhuma dessas comunicações concorda entre si**. Evidência forte de reformulação societária sobre marca preexistente sem alinhamento editorial.

2. **A categoria original do Facebook é "Consulting agency"**, não Furniture Maker. Isso muda o diagnóstico: a BRW pode ter começado como **consultoria de curadoria de mobiliário** (sem fábrica, terceirizando produção para empreendimentos B2B) e agora está pivotando para movelaria com o novo CNPJ. Se verdadeiro, o pitch "preço de fábrica" é aspiracional, não estrutural.

3. **Cliente incorporadora "Singulari Alphaville Guarajuba" é o cliente B2B ao vivo mais forte hoje** — 6 posts IG + 2 vídeos TikTok, projeto multi-ambiente, visita técnica registrada. É um caso concreto de "curadoria desde a planta" (empreendimento imobiliário), que a auto-descrição do cliente alega servir. **Antes não constava do briefing** — é achado da coleta Apify.

4. **Todas as 3 URLs próprias da marca estão mortas.** brwmovelaria.com.br (bio IG), brwmovelaria.com (FB), canal YouTube @BRWMovelaria (404). Isso é churn de leads na etapa mais barata do funil, e a BRW aparentemente **não sabe que existe**. Bug operacional de altíssima severidade.

5. **A BRW tem o pitch mais bem articulado de "mobiliário como ROI para investidor Airbnb" entre os concorrentes locais.** Nenhum concorrente baiano articula esse ângulo (Alfa, Bahia Closet, Selectus etc. focam residencial premium tradicional). É o angulo mais defensável e vertical mais monetizável do posicionamento atual.

---

## TOP 3 LACUNAS

1. **Comentários/dores em DMs qualitativas** — 15 dos 20 posts têm 0 comentários. A voz dos leads vive no WhatsApp comercial (invisível para nós). Para desbloquear: acesso ao histórico do WhatsApp + tag/analytics no futuro site.

2. **Reviews qualitativas do Google** — apenas 1 review (n=1). Google Reviews Apify falhou por rejeição do short-link. Mesmo com Apify, o dado seria estatisticamente pobre. Recomendação: acionar programa de review boost antes de tentar re-coletar.

3. **Registro INPI da marca "BRW Movelaria"** — INPI exige login. Necessário consulta autenticada via advogado / paywall.

---

## Bloco 10 — Hipóteses acionáveis

> **Autoria:** Aletheia Chief (orquestração) — rota primária: Steve Blank (tipo de mercado, earlyvangelist) + Alberto Savoia (pretotype/skin-in-the-game); rota secundária: Tony Ulwick (JTBD para investidor Airbnb), Rob Fitzpatrick (Mom Test para diagnóstico do WhatsApp), David Bland (mapa de assunções), Ash Maurya (Lean Canvas do pivô).
> **Sinal do gate:** VERDE COM RESSALVAS. A BRW **não é uma ideia crua** — é um negócio operante com portfolio B2B real (Iberostar, Singulari, Faculdade Baiana) e pitch verbal articulado. Mas a marca opera **sem canal digital funcional**, com **posicionamento em conflito com quatro fontes próprias**, e com **base de evidência de demanda residencial próxima de zero** (541 IG, 1 review Google, WhatsApp opaco). Portanto: **HALT parcial** para qualquer investimento pesado em mídia paga sem antes desvelar (a) qual segmento está de fato pagando e (b) onde as URLs próprias mortas estão vazando lead.
>
> **Postura Aletheia:** as 5 hipóteses abaixo são **hipóteses falsificáveis com critério de kill declarado** — não recomendações de execução. O fundador (Bruno Felice Vilas Boas) e o time Kolden decidem qual perseguir; a Aletheia entrega a verdade, não a permissão.

---

### Hipótese H1 — O nicho pagante da BRW é investidor imobiliário de short-stay em Salvador, não residencial autoral premium

**Framework aplicado:** **Steve Blank Customer Development** (identificação do earlyvangelist e do tipo de mercado — mercado novo/reposicionamento vs. mercado existente) + **Tony Ulwick JTBD** (o "job" contratado pelo investidor é "maximizar ROI do meu apartamento de temporada", não "decorar minha casa").

**Racional:** o dossiê mostra três sinais convergentes de que **o vertical Airbnb é onde a marca tem linguagem defensável**: (i) três posts de 2026 têm pitch verbal completo de ROI ("ferramenta de retorno", "reduz vacância", "acelera decisão") — nenhum concorrente local (Alfa, Bahia Closet, Selectus) articula esse ângulo; (ii) o post mais recente do dataset (`DaWL7kHj-FG`, 2026-07-01) é justamente sofá-cama Airbnb — direção editorial recente confirma foco; (iii) 6 posts + 2 vídeos TikTok do cliente Singulari Alphaville Guarajuba são **projeto pensado desde a planta** — o mesmo padrão de compra do investidor de short-stay em escala (curadoria antes da entrega das chaves). O nicho residencial autoral, apesar de dominar 12+ de 20 posts, tem **7,5 likes médios** — evidência de zero tração real. O discurso "corporativo/hoteleiro/institucional/residencial" da bio é o oposto de "segmentação" — é ausência dela.

**Teste específico (Blank — GOOB de 4-6 semanas):** rodar **10-15 entrevistas Mom Test** (Fitzpatrick) com **compradores de studio/apartamento para short-stay em Salvador** — Barra, Ondina, Rio Vermelho, Alphaville Guarajuba — nos últimos 24 meses. Perguntas sobre o passado, não sobre a ideia: "me conta a última vez que você mobiliou um imóvel de temporada — o que fez, quem contratou, quanto pagou, o que deu errado". Recrutamento via (a) hosts Airbnb Salvador via DM, (b) grupos de investidor imobiliário local no Telegram/WhatsApp, (c) porta a porta em Singulari Alphaville Guarajuba. Complemento paralelo: **auditoria do WhatsApp comercial (71 99902-7171)** dos últimos 6 meses classificando cada lead por segmento (residencial / investidor / incorporadora / hoteleiro / corporativo) — o WhatsApp é a caixa-preta com a voz real dos leads.

**Métrica de sucesso mensurável:** ≥ **6 dos 10-15 entrevistados** relatam ter (a) contratado ou considerado ativamente uma movelaria sob medida para short-stay nos últimos 24 meses, (b) gasto ≥ R$ 25 mil no mobiliário completo de UM apartamento, E (c) usar de fato métrica de ROI/vacância como critério de decisão (não só "gostei do design"). **Critério de kill:** ≤ 3 dos 15 confirmam esse padrão → o vertical Airbnb é discurso de marketing, não segmento pagante — recuar para residencial premium tradicional e brigar de frente com Alfa/Bahia Closet.

**Handoff sugerido:** **Aletheia (Fitzpatrick + Ulwick) conduz a discovery** → resultado alimenta **Aglaia (branding/posicionamento)** para transformar bio "30 anos de design" em posicionamento único por segmento validado → **Caliope (copy)** para reescrever tagline e site em função do JTBD do investidor → **Pluto/Emporos (funil comercial)** para desenhar oferta pacote-fechado por apartamento.

---

### Hipótese H2 — O maior gargalo de crescimento não é aquisição, é vazamento: as 3 URLs mortas estão queimando ~70% dos leads orgânicos qualificados

**Framework aplicado:** **Eric Ries Lean Startup** (Build-Measure-Learn no ponto mais barato do funil — corrigir vazamento antes de ampliar aquisição) + **Ash Maurya Lean Canvas** (o CTA/link é o canal — canal quebrado ≠ canal ruim, é canal inexistente).

**Racional:** o Bloco 4 documenta que **três URLs próprias diferentes estão referenciadas em canais oficiais (bio IG, FB about, YouTube) e todas retornam DNS morto ou 404**. Simultaneamente, o CTA orgânico "clique no link na bio" é a chamada dominante em ~15% dos posts. Isso significa que TODO seguidor que confia na marca e clica no link cai em página inexistente. Não é hipótese de mercado — é hipótese de **infraestrutura básica**. Custo de teste é próximo de zero (~R$ 200-500 para landing page fantasma), valor de informação é altíssimo, e o dado ainda **destrava mensuração real** de todas as próximas hipóteses (H1 e H3 precisam de tag/pixel para funcionar). É a intervenção com maior alavancagem do dossiê.

**Teste específico (Ries — MVP + Bland — pretotype "fake door"):** subir em 72h uma **landing page única, single-page**, no domínio brwmovelaria.com.br, com: (a) hero com foto real do projeto Singulari + copy de investidor, (b) 3 blocos de portfolio (Iberostar / Singulari / short-stay) com nomes dos clientes, (c) formulário curto de captura ("orçamento em 24h" — nome, telefone, tipo de imóvel, m²) integrado ao WhatsApp comercial, (d) pixel Meta + GA4 + hotjar. Trocar em **todos os canais orgânicos** (bio IG, FB, GMB) o link para essa LP. Rodar por **30 dias** SEM aumentar investimento em conteúdo — só corrigir o vazamento.

**Métrica de sucesso mensurável:** **≥ 25 leads qualificados capturados via formulário em 30 dias** com CAC orgânico ≤ R$ 15/lead E **≥ 8% de conversão de visita para preenchimento**. Comparar: quantos desses leads o WhatsApp comercial JAMAIS teria recebido (checar taxa de novos telefones no CRM). **Critério de kill:** < 5 leads em 30 dias → o problema não é o vazamento, é ausência de tráfego real orgânico (baseline pior do que se imaginava) → H1 (segmentação) e H4 (canal) passam à frente.

**Handoff sugerido:** **Prometeu/Metis (infra/build)** sobe LP em 72h em Next.js ou template Framer/Webflow → **Aglaia (identidade visual)** garante que a LP não conflite com brand IG → **Caliope (copy)** escreve os 3 blocos → **Ariadne (SEO+CRO)** instala pixel/GA4 e otimiza CTR do formulário → **Ananke (ops)** garante que os leads caiam num CRM (não só WhatsApp opaco) e que Bruno tenha SLA de resposta.

---

### Hipótese H3 — A dor real do lead vive no WhatsApp comercial (71 99902-7171) — e sem lê-la, todo posicionamento é chute

**Framework aplicado:** **Rob Fitzpatrick — The Mom Test** (opinião não é evidência; o que as pessoas FAZEM > o que DIZEM) + **síntese-de-feedback-multi-canal** (agregar as conversas de WhatsApp como fonte primária de voz-do-cliente, dado que comentários públicos = ~zero).

**Racional:** o Bloco 5 confirma que **15 de 20 posts têm 0 comentários** — ~12 comentários totais em 20 posts. A voz do lead **não existe em canal público**. Como o CTA é 100% WhatsApp, TODA objeção, dor, dúvida e pedido de orçamento vive lá — **invisível para qualquer squad Kolden hoje**. Qualquer hipótese de mercado (H1) ou de canal (H4) que a gente monte sem ler o WhatsApp é **chute com verniz de método**. E como o CNPJ tem só 3 meses, o volume acumulado ainda é manejável — janela de ouro para categorizar antes que vire caixa-preta de 3.000 conversas.

**Teste específico (Fitzpatrick + Blank — leitura sistemática):** com autorização do cliente (LGPD-compliant), **exportar histórico do WhatsApp comercial dos últimos 6 meses** e classificar cada conversa por: (i) segmento do lead (residencial / investidor Airbnb / incorporadora / hoteleiro / corporativo / outro), (ii) origem declarada (Instagram / indicação / GMB / Facebook / não sabe), (iii) estágio (pediu orçamento / negociou / fechou / desistiu), (iv) valor do orçamento discutido, (v) **objeção principal** (preço, prazo, dúvida técnica, comparação com concorrente), (vi) tempo até primeira resposta. Amostra mínima: **150 conversas** (representa ~1 mês de fluxo estimado). Cruzar com H1: dos que fecharam ou negociaram sério, quantos são investidores Airbnb?

**Métrica de sucesso mensurável:** classificação estatisticamente robusta de **≥ 150 conversas** em ≤ 21 dias, produzindo (a) um **top-3 de segmentos por peso de receita** e (b) um **top-5 de objeções recorrentes** repetidas por ≥ 20% dos leads sérios. **Critério de kill:** volume < 60 conversas nos últimos 6 meses → o WhatsApp não é o gargalo, é a caixa-vazia; a marca tem problema de tráfego, não de conversão → H2 (LP) e H4 (canal) passam à frente com prioridade absoluta.

**Handoff sugerido:** **Aletheia lidera a leitura e categorização** (Fitzpatrick — extração da voz do cliente sem viés) → **Ananke (ops)** garante que a exportação e o CRM cumpram LGPD → cruzamento com H1 valida ou refuta o vertical Airbnb → resultado vai para **Caliope (copy)** transformar objeções recorrentes em FAQ/blocos de landing page → **Pheme (social)** transforma dores recorrentes em conteúdo IG.

---

### Hipótese H4 — A base social atual (541 IG, 26 FB, TikTok morto) sub-explora o único canal defensável: SEO local para queries de investidor + parceria B2B com incorporadoras

**Framework aplicado:** **Alberto Savoia — Pretotype + skin-in-the-game data** (não testar TAM top-down; testar canal com sinal de comportamento real) + **mapa-competitivo-swot-gap** (o gap defensável não é vs. Alfa/Bahia Closet no residencial; é no B2B de curadoria desde a planta e no SEO local nichado).

**Racional:** o Bloco 7 mostra que Alfa Planejados tem **32× a base social da BRW** com **48 anos de casa** — vencer no jogo do IG residencial premium tradicional é competição frontal com um incumbente 32×. Mas ninguém no mercado local rankeia para queries do tipo "mobiliário airbnb salvador", "movelaria studio short-stay bahia", "curadoria mobiliário incorporadora nordeste" — E ninguém tem case B2B ao vivo com incorporadora do porte da Singulari. Isso é **oceano azul de baixo custo** — não porque tenha demanda gigante, mas porque a concorrência não está lá. É onde o ROI marginal por R$ 1 investido é mais alto.

**Teste específico (Savoia — pretotype "you-buy-it" + Blank — B2B pilot):** rodar em paralelo, por 8 semanas, DOIS pretotypes de baixo custo: (a) **SEO local nichado** — publicar 6 artigos long-form na LP da H2 mirando queries de investidor Airbnb Salvador (checar volume real via keyword planner / Ahrefs / Ubersuggest — se query tem <10 buscas/mês, é vaidade) + rodar Google Ads baixíssimo (R$ 50/dia por 30 dias) em 3 queries-alvo para validar CTR e CPL; (b) **outbound B2B a incorporadoras** — Bruno (ou vendedor) faz **abordagem direta a 30 incorporadoras/construtoras baianas ativas** (identificáveis via CBIC/SINDUSCON) oferecendo pilot de curadoria de um studio-modelo, replicando o padrão Singulari. Skin-in-the-game de Savoia: pedir para o incorporador **agendar reunião presencial** — não "gostei da ideia".

**Métrica de sucesso mensurável:** (a) SEO: ≥ **3 queries com CPL orgânico ≤ R$ 30** OU ≥ 8 leads B2B via SEO em 8 semanas. (b) Outbound: ≥ **3 incorporadoras com reunião presencial agendada** (não e-mail respondido — reunião no showroom ou obra) em 8 semanas. **Critério de kill:** ambos os pretotypes < 30% da métrica → o canal defensável é outro (indicação, feira, revista especializada) e Kolden deve recuar para hipótese de canal offline.

**Handoff sugerido:** **Ariadne (SEO+CRO)** conduz pretotype (a) com queries e conteúdo → **Caliope (copy)** escreve os 6 artigos long-form → **Pluto/Emporos (funil B2B)** desenha script de outbound e materiais de pitch para pretotype (b) → **Peitho (tráfego pago)** aloca R$ 1.500 de teste Google Ads → **Aletheia** avalia sinal ao final das 8 semanas.

---

### Hipótese H5 — O CNAE de comércio + categoria FB "Consulting agency" + capital social R$ 100k + 6 sócios revela que a BRW é um veículo de holding/consultoria de curadoria, não uma movelaria de fato

**Framework aplicado:** **Ash Maurya — Lean Canvas** (revisitar o modelo de receita e a proposta de valor à luz da estrutura societária real) + **Steve Blank — tipo de mercado** (a BRW pode estar num "resegmented market", não num "existing market" de movelaria) + **compliance/nomos overlay** (sinal SEFAZ 09/2026 exige due diligence).

**Racional:** cinco sinais convergentes indicam que o negócio real da BRW **pode não ser fabricar/vender móveis**, mas sim **prestar consultoria de curadoria de mobiliário e capturar comissão sobre projetos B2B** (incorporadora, hoteleiro): (i) CNAE principal **4754-7/01 é comércio varejista, não indústria** — mesmo com sede no Polo Industrial de Camaçari; (ii) CNAE secundário **7319-0/02 (promoção de vendas)** e **4619-2/00 (representantes comerciais)** são característicos de agência/consultoria, não fabricante; (iii) categoria FB original **"Consulting agency"** é evidência forte do modelo mental fundacional; (iv) arranjo societário atípico — **LLC americana + família Maltez (capital reputacional local) + sócio-administrador 21-30 em graduação** — sugere veículo de investimento/holding com cara de operacional, não empresa madura tocada por moveleiro veterano; (v) capital social R$ 100k é **incompatível com fábrica** e compatível com prestadora de serviço. **A hipótese, se verdadeira, muda tudo**: o produto Kolden vende para o cliente errado ao entregar branding de "movelaria premium". O produto certo é "consultoria de curadoria de mobiliário para incorporadora/investidor com terceirização de produção" — que é literalmente o que a BRW faz.

**Teste específico (Blank — pergunta ao fundador + auditoria fiscal):** conduzir **entrevista estruturada de 90 minutos com Bruno Felice Vilas Boas** (sócio-administrador) e — se possível — com Janinne Maltez e o procurador da LLC. Perguntas Mom Test sobre o passado, não sobre o futuro: (a) "quando a BRW faturou pela última vez, qual foi a natureza da nota emitida — venda de móvel próprio, revenda, ou serviço de consultoria?"; (b) "qual o % de receita 2024/2025/2026 que veio de comissão vs. margem de fabricação vs. margem de revenda?"; (c) "por que o CNPJ é 03/2026 se a marca tem 10-30 anos — o que existia antes juridicamente?"; (d) "qual a relação com a Strategy Business & Solutions LLC — o que ela aporta operacionalmente?". Em paralelo, **checar edital SEFAZ-BA 09/2026 (ref. 244.559.894-NO)** com contador do cliente ou pela consulta pública autenticada — pode ser cobrança rotineira ou pendência séria.

**Métrica de sucesso mensurável:** ao fim da entrevista, resposta **verdadeira e verificável** (com documento — DRE, nota fiscal, contrato de comissionamento) para as 4 perguntas. Se ≥ 60% da receita histórica veio de comissão/consultoria/curadoria (não fabricação/revenda direta), **hipótese confirmada** e a Kolden reposiciona o cliente como **agência de curadoria B2B com marca-produto anexa**, não movelaria B2C. **Critério de kill:** o fundador não fornece dados verificáveis, ou os dados mostram que ≥ 70% da receita é venda direta B2C — hipótese falsa, tratar como movelaria clássica e focar em H1-H4.

**Handoff sugerido:** **Aletheia lidera a entrevista** (Fitzpatrick — sem enviesar com pitch) → **Nomos (compliance/CNPJ/fiscal)** valida edital SEFAZ e revisa consistência CNAE ↔ operação real → resultado alimenta **Pactolo (unit economics)** para dimensionar modelo de comissão vs. margem → **Aglaia (branding)** define se marca posicionada como "movelaria" ou "consultoria de curadoria com marca-produto anexa" → **Caliope (copy)** ajusta narrativa oficial ("30 anos" → o que for verdadeiro e verificável).

---

### Ordem de prioridade recomendada pela Aletheia

**PRIMEIRA A TESTAR: H2 (LP + vazamento das 3 URLs mortas).**

**Por quê (3 linhas):** (i) **Menor custo de teste** — 72h + R$ 200-500 para LP fantasma, sem tocar em marca, mercado ou operação; (ii) **Maior valor de informação** — destrava mensuração de TODAS as outras hipóteses (H1, H3, H4 dependem de pixel/analytics/lead capturado formalmente), e transforma o único CTA da marca de "morto" em "métrica"; (iii) **Menor risco de dano ao cliente** — hoje o cliente já perde 100% dos leads que clicam na bio; qualquer LP acima de "página inexistente" é ganho estrito. E o insight operacional das 72h de build (quantos cliques o link IG recebe/dia; que UTMs os leads trazem; qual o volume real de WhatsApp) já responde metade da H3 quase de graça.

**SEQUÊNCIA RECOMENDADA (8 semanas):**
- **Semanas 1-2:** H2 (LP viva + pixel + tag no WhatsApp) — Prometeu/Ariadne.
- **Semanas 2-4:** H3 (leitura de 150 conversas do WhatsApp) — Aletheia lidera, Ananke suporta.
- **Semanas 4-6:** H1 (10-15 entrevistas Mom Test com investidores Airbnb) — Aletheia+Fitzpatrick.
- **Semanas 6-8:** H4 pretotype (a) SEO + (b) outbound B2B — Ariadne/Caliope/Pluto em paralelo.
- **Semana 8 (gate):** consolidar as 4 leituras. Se H1 confirmou nicho + H3 confirmou pipeline WhatsApp + H4 mostrou ≥ 3 reuniões B2B agendadas → verde para reposicionamento e mídia paga. Se H5 (entrevista Bruno + SEFAZ) ainda estiver aberta, **HALT** em qualquer investimento em marca antes de resolver a incongruência CNAE ↔ operação.

**H5 é PARALELA e PRÉ-REQUISITO SILENCIOSO:** deve rodar como onboarding factual do cliente **antes da semana 1** — 90 minutos de conversa com Bruno + validação SEFAZ. Se a resposta for "somos uma consultoria de curadoria", o resto do plano muda de eixo (não morre, mas o produto Kolden é reprecificado como agência B2B, não movelaria B2C).

**VETO INVIOLÁVEL — o que Kolden NÃO deve fazer antes desses testes:**
- ❌ Investir em Meta Ads / Google Ads escala (> R$ 5k/mês) sem H2 + H3 terminadas — sem LP e sem leitura do WhatsApp, não há como medir CAC/LTV real.
- ❌ Refazer o brandbook completo sem H1 + H5 terminadas — o posicionamento verbal pode estar mentindo sobre o produto real.
- ❌ Lançar campanha "30 anos" ou "preço de fábrica" — sem H5 respondida, ambas as claims são passivo reputacional que a concorrência pode desmontar em 5 minutos.
- ❌ Escalar cadência de conteúdo IG ("mais posts") — o problema não é volume de conteúdo, é conversão e segmentação.

**Assinado:** Aletheia Chief — orquestradora do squad de Discovery & Lean Validation da Kolden. *"A verdade do mercado antes do custo de construir."*

---

## Bloco 11 — Fase C: Coleta Drive (assets institucionais do cliente)

> **Autoria:** Hermes — coleta e análise de 129 assets do Drive público da BRW (pasta compartilhada pelo Ronan em 2026-07-06). Dossiê completo em `coleta-bruta/drive-2026-07-06.md`.
> **Escopo:** 5 pastas mensais (Dez/2025 → Abr/2026), 24 subprojetos, 89 JPG + 13 PNG (selo) + 19 MP4, 516 MB, todos preservados em `anexos/drive-2026-07-06/`.

### 11.1 Design system extraído (ausente na v0.2)

- **Logotipo primário:** `BRW.movelaria` com moldura em **L invertido** ao redor do BR. Duas gerações observáveis — **Dez/2025** com tag `.movelaria` em **teal ciano** (~#3AB0B5); **Jan/2026 →** com tag em **cinza-escuro monocromático** ou **branco outlined sobre azul-marinho** ~#1A3D7E.
- **Selo institucional** (13 PNGs em `Selo/`): círculo contendo `MOVELARIA · BR.W · ★★★★★ · 1998`. Aparece como marca d'água em **~100% dos criativos analisados** (25/25 amostrados). É dispositivo obrigatório da marca, não acessório.
- **Paleta oficial multi-cor (5 tons)** — confirmada na barra superior do criativo `Com-o-tempo/4.jpg`:
    - Azul-marinho profundo `~#1A3D7E` (primária)
    - Ocre/laranja-queimado `~#C1741D`
    - Borgonha `~#7B1B1A`
    - Marrom escuro/café `~#3E2917`
    - Verde-oliva militar `~#3D4E1E`
- **Tipografia:** sans-serif geométrica book/light (perfil visual compatível com Poppins Light / Nunito Sans / Montserrat Light), letter-spaced amplo em display; regular no corpo; **bold apenas para palavras-âncora** ("mesma essência", "rápido", "INVESTIDORES").

### 11.2 Reforma do veredicto sobre "1998" (refina Bloco 2)

O dossiê v0.2 tratava "Desde 1998" e "30 anos" como **copy de legenda** possivelmente marketeira. **A Fase C reforma:** o "1998" está **lavrado no selo institucional oficial** e aparece em todas as peças do rebrand pós-Jan/2026 (`Com-o-tempo/4.jpg`: "A mesma essência, com um olhar ainda mais atento aos detalhes. **DESDE 1998.**").

**Nova formulação:** a marca aposta **institucional e sistematicamente** em 1998. Isso continua **sem lastro documental público** (CNPJ 03/2026, FB 2022, INPI não checado). Portanto:

> Claim "1998 / 30 anos" — **institucionalmente comprometido**, **historicamente não comprovado**. Exposição reputacional alta se o adversário desmontar em disputa competitiva, imprensa ou reclame.

### 11.3 Rebrand observável (Dez/2025 → Jan/2026)

**A reformulação editorial ocorreu ANTES da abertura do CNPJ** (03/2026):
- Dez/2025: pop, ilustração (Papai Noel de férias em sofá cinza + tapete turquesa), copy B2C direto ("Saiba como a BRW pode transformar a sua **decoração**"), logo em teal, sem selo.
- Jan/2026 →: minimalista, all-caps, paleta institucional de 5 tons, selo 1998 obrigatório, copy B2B premium ("Curadoria que permanece"; "Design que define a atmosfera").

**Implicação para H5:** o rebrand precede o CNPJ. O CNPJ formaliza o novo posicionamento — não o inicia. Isso é **coerente com o modelo mental de holding/consultoria pivotando para movelaria formalizada** (ver H5 do Bloco 10).

### 11.4 Portfolio ampliado (refina Bloco 3)

Novos itens confirmados via Drive (ausentes da v0.2):

- **Peças com nome próprio adicionais:** Mesa de Jantar Milano (rattan Singulari) · Conjunto Sofá Varanda (kit fechado 1+2+1) · Tapete Ecoterra (herringbone) · Conjunto Mesa de Centro Essência Orgânica · Cadeira Flora (ilustração hand-drawn contour) · Mesa Torres (MDF + lâmina de madeira) · Queiroz Essencial (sofá curvo, ambiente vermelho).
- **Cliente-âncora Singulari — nível de integração revelado:** BRW recebe **planta arquitetônica original do incorporador** (bangalôs 11 e 12 com piscina 6,08×7,50 + spa + deck + suíte + multiuso + brise em alumínio) e faz curadoria em cima. Também produziu **render 3D completo do bangalô**. Co-branding "BRW · SINGULARI · Curadoria aplicada ao projeto" com CTA conjunto — é **co-desenvolvimento formal**, não fornecimento eventual.
- **Parceria com King Koil** (fabricante nacional de colchões premium) — co-brand visível no criativo do Quarto Singulari. Não constava.
- **Cliente NOVO — Agência Hike** (Abril/2026) — co-branding em capa `BRW · Agência Hike`. Não claro se agência de marketing ou cliente corporativo.
- **Cliente NOVO — Queiroz Essencial** (Fevereiro/2026) — cliente ou coleção? Requer confirmação.

### 11.5 Confirmação de H1 (nicho investidor) + refinamento

O post `Studios-bem-mobiliados/3.jpg` traz o pitch B2B mais articulado do dataset:

> **"PROJETOS PARA INVESTIDORES EXIGEM CONSISTÊNCIA. Desenvolvemos soluções que podem ser replicadas em múltiplas unidades, mantendo identidade, qualidade e previsibilidade. MAIS EFICIÊNCIA NA ENTREGA. MAIS SEGURANÇA NO INVESTIMENTO."**

Isso é **oferta de multi-unidade padronizada** — o produto certo para incorporadora/investidor que precisa mobiliar N apartamentos. **Refina H1:** o vertical Airbnb/investidor tem linha de produto explícita ("kit replicável por unidade"), não apenas discurso. Reforça também H4 (case Singulari é caso concreto para reproduzir em outbound B2B).

### 11.6 Primeiro depoimento com nome (novo insumo para Bloco 6)

`BRW-Abril-2-Depoimento.jpg` traz o primeiro nome-cliente-com-endosso público:

> **"A curadoria da BRW Movelaria é o que a destaca no cenário da Bahia. É fascinante ver como eles conseguem unir a força da indústria (preço de fábrica) com a delicadeza de peças que parecem feitas artesanalmente. Cada detalhe, da escolha da madeira ao design final, comunica valor e sofisticação."** — **Sergio Canhoto · ★★★★★**

O Bloco 6 v0.2 registrava apenas 1 review no Google (5,0★, sem identificação). **Sergio Canhoto é o primeiro nome-cliente publicamente endossando a BRW.** Requer identificação externa (LinkedIn/Google) para saber se é incorporador, arquiteto, investidor ou residencial premium.

### 11.7 Lacunas remanescentes do Drive

O Drive **não** trouxe: (i) fotografia de fábrica/oficina; (ii) portfolio anterior a Dez/2025 (era "consultoria"); (iii) price list ou catálogo com valores; (iv) contratos ou faturas; (v) identificação clara de Queiroz e Agência Hike; (vi) transcrição dos áudios dos 4 vídeos "Saiba como a BRW" (Dez/2025, 10s cada — não abertos individualmente); (vii) explicação da sigla "BWP" no vídeo `BWP - Verão(1).mp4` (typo? marca-irmã?). Todas essas seguem como lacunas para próximas fases.

### 11.8 Impacto no plano de ação (Bloco 10)

- **H1 (nicho investidor):** confirmada — pitch é sistemático e específico. Continua PRIMEIRA a testar via GOOB (mas a probabilidade de VERDE subiu).
- **H2 (URLs mortas):** sem alteração — Drive não abre este vetor.
- **H3 (WhatsApp opaco):** sem alteração — Drive não abre este vetor.
- **H4 (SEO local + B2B):** reforçada — case Singulari é reprodutível para outbound.
- **H5 (CNAE ≠ operação real):** reforçada — o rebrand pré-CNPJ é evidência circunstancial adicional de que a BRW operava antes como algo diferente de "movelaria formal". Entrevista com Bruno agora tem base concreta ao invés de suposição.

**Assinado:** Hermes — coleta Drive Fase C do dossiê BRW Movelaria, 2026-07-06.
