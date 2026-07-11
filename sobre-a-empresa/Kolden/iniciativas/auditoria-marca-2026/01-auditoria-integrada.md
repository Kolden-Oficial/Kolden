---
titulo: Auditoria integrada de marca — 7 frentes cruzadas (Aglaia × Harmonia)
status: rascunho
data: 2026-06-23
squads: [Aglaia, Harmonia]
metodo: _guia-auditoria.md
tipo: nota
area: iniciativas
up: "[[sobre-a-empresa/Kolden/iniciativas/_MOC-iniciativas]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/00-sumario-executivo|00-sumario-executivo]]"
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/02-roadmap-de-marca|02-roadmap-de-marca]]"
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/_guia-auditoria|_guia-auditoria]]"
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/brandbook-v2|brandbook-v2]]"
---

# Auditoria integrada de marca Kolden — 2026

> Diagnóstico cruzado dimensão-a-dimensão. Cada frente foi auditada por um par de
> lentes — **Aglaia** (estratégia de marca) e **Harmonia** (design ops/UX) —
> seguindo a rubrica de `_guia-auditoria.md`. Notas 0–10, classificação
> `preservar / corrigir / reconstruir`, evidência sempre por caminho de arquivo.

## Placar geral

| Frente | Tema | Nota | Veredito |
|--------|------|:----:|----------|
| F1 | Posicionamento & diferenciação | **2.4** | reconstruir |
| F2 | Brand equity & identidade (Prism) | **4.4** | base sem topo |
| F3 | Arquétipo, personalidade & voz | **1.9** | reconstruir (crítico) |
| F4 | Identidade visual (cor/tipo/logo) | **8.4** | preservar / corrigir |
| F5 | Design system (tokens/componentes/a11y) | **7.2** | aprovado com ressalvas |
| F6 | Aplicações, pontos de contato & naming | **3.4** | frágil → reconstruir |
| F7 | Governança, maturidade & cultura | **4.0** | emergente |
| — | **Média geral** | **~4.5** | **identidade visual madura, marca estratégica ausente** |

## Achado transversal nº 1 — o conflito de posicionamento triplo

Três retratos mutuamente contraditórios da Kolden coexistem vivos no repositório, e
contaminam F1, F2 e F3:

1. **"Plataforma self-hosted de IA soberana, vendor-agnóstica"** — `CLAUDE.md` §1.
2. **"Impulsionadora de negócios focada no LTV dos clientes"** — `design-system\01-fundamentos\tom-visual.md` (marcado `status: vigente`).
3. **Vazio** — `mercado-e-posicionamento\posicionamento.md` e `marca\mensagens-chave.md`, ambos `status: rascunho` com `<!-- preencher -->`.

A execução **visual** já escolheu o lado (2) — derivou a estética de "impulsionadora/LTV" —
enquanto a identidade **institucional** afirma (1) e o documento **canônico** de
posicionamento está em branco. É um Brand Gap invertido: a criação fechou antes da
estratégia. **Resolver esse conflito é o pré-requisito de F1, F2 e F3** — nenhuma
mensagem, voz ou arquétipo pode ser redigido antes da decisão de foco do Ronan.

## Achado transversal nº 2 — o visual está mascarando a ausência do verbal

Várias frentes (F3-06, F2-06, F1-05) convergem: o sistema visual é bom o suficiente
para que ninguém sinta, no dia a dia, a falta de voz/arquétipo/mensagem. É dívida
oculta — invisível até a operação escalar (Pheme gerando social em volume, Hermes
gerando copy em WhatsApp/Telegram), quando a ausência de voz vira inconsistência
pública imediata.

---

## Frente F1 — Posicionamento & diferenciação

**Nota média: 2.4/10 — Veredito: RECONSTRUIR.** Não existe declaração de posicionamento; o doc canônico é template vazio. A Kolden não possui uma palavra na mente (Ries), não tem Onlyness Statement (Neumeier), mas tem ativos distintivos visuais fortes (Sharp) sem narrativa que os ancore. O visual resolveu antes da estratégia.

### F1-01 Nenhuma declaração de posicionamento existe — doc canônico é template vazio
- **Lente**: Aglaia (al-ries, marty-neumeier)
- **Evidência**: `mercado-e-posicionamento\posicionamento.md` — `status: rascunho`, corpo `> Template — a ser definido` com `<!-- preencher -->`; `marca\mensagens-chave.md` idem.
- **Diagnóstico**: a pergunta central ("há posicionamento explícito?") é respondida com não. Toda decisão downstream (mensagem, voz, copy, mídia) opera sem âncora.
- **Nota**: 1/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: escrever a declaração canônica (categoria + público + diferencial + prova). Decisão fundadora do Ronan, não delegável. Bloqueia F2/F3.

### F1-02 Três posicionamentos contraditórios — não há uma palavra na mente
- **Lente**: Aglaia (al-ries)
- **Evidência**: (a) `CLAUDE.md` §1 "soberania de dados, vendor-agnóstico, banco de testes de IA"; (b) `tom-visual.md` (`vigente`) "impulsionadora de negócios focada no LTV"; (c) `posicionamento.md` vazio.
- **Diagnóstico**: são duas marcas diferentes em categorias diferentes. Lei do Foco: possuir uma palavra exige sacrifício — aqui houve bifurcação. A execução visual já ratificou um lado que a estratégia não autorizou.
- **Nota**: 2/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: decisão de foco explícita (IA soberana? impulsionadora de LTV? uma é empresa, outra é frente?). Até lá, marcar como provisória a afirmação em `tom-visual.md`.

### F1-03 Sem Onlyness Statement — a marca não tem um "zag"
- **Lente**: Aglaia (marty-neumeier)
- **Evidência**: `posicionamento.md` "Diferenciais" = `<!-- preencher -->`; nenhum arquivo contém "o único ___ que ___".
- **Diagnóstico**: o insumo bruto existe e é forte (soberania + testar todas as IAs sob controle próprio é genuinamente contrário ao SaaS dominante), mas está latente no CLAUDE.md, nunca destilado.
- **Nota**: 2/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: rascunhar candidatos de Onlyness a partir do material soberania/vendor-agnóstico.

### F1-04 Ativos distintivos visuais são fortes e consistentes — PRESERVAR
- **Lente**: Aglaia (byron-sharp) × Harmonia (design-chief)
- **Evidência**: `identidade-visual.md`, `logo.md`, `tom-visual.md` — scarlet `#FF3D22` como cor-sinal única, "K partido inédito no mercado digital", regras tokenizadas.
- **Diagnóstico**: pela lente Sharp é exatamente o que importa para crescimento: ativos distintivos únicos, consistentes, reaplicáveis e governados por tokens. Único pilar maduro da frente.
- **Nota**: 8/10 · **preservar** · **Esforço** S · **Impacto** médio
- **Recomendação**: proteger e vincular cada ativo a um "verbal nail" (depende de F1-01/03).

### F1-05 O visual já decidiu um posicionamento que a estratégia não escreveu
- **Lente**: Aglaia×Harmonia (concordam)
- **Evidência**: `tom-visual.md` (`vigente`) tem seção "Posicionamento (origem da estética)" que cita uma origem (`posicionamento.md`) que não existe como doc vigente.
- **Diagnóstico**: Brand Gap na ordem invertida — a criação fechou antes da estratégia. O hammer (scarlet/K) está cravando o prego errado, ou nenhum prego.
- **Nota**: 3/10 · **corrigir** · **Esforço** M · **Impacto** alto
- **Recomendação**: após F1-02, reconciliar a seção do `tom-visual.md` com a declaração canônica.

### F1-06 Categoria não declarada — sem degrau na escada nem inimigo nomeado
- **Lente**: Aglaia (al-ries)
- **Evidência**: `concorrencia.md` e `icp-e-personas.md` existem mas o doc que os referencia está vazio; `visao-geral.md` "Modelo de negócio" = `<!-- preencher -->`.
- **Diagnóstico**: o ângulo "IA self-hosted soberana" é território de criação de categoria de alto potencial, mas a marca não o reivindica nem nomeia o inimigo (lock-in de provedor / SaaS de terceiros).
- **Nota**: 2/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: declarar categoria e contraponto. Ressalva: `visao-geral.md` é rascunho — não tratar modelo de negócio como fato até o Ronan definir.

**Tensão F1**: Ries/Neumeier (falta posicionamento = marca genérica) × Sharp (diferenciação é mito; o que importa são os ativos distintivos, que já são fortes). Para marca early-stage/interna, a clareza de categoria tende a pesar mais que num CPG maduro. A síntese decide o peso.

---

## Frente F2 — Brand equity & identidade (Identity Prism)

**Nota média: 4.4/10 — BASE SEM TOPO.** Physique maduro e cultura embrionária forte (soberania), mas o Identity Prism tem 3 de 6 facetas vazias (Relacionamento, Reflexo, Autoimagem) por ausência de cliente externo. Na pirâmide CBBE há Identidade visual mas não Ressonância. Marca com corpo esculpido e sem voz.

### F2-01 Identity Prism — physique definido e exemplar
- **Lente**: Aglaia (kapferer) × Harmonia (dan-mall)
- **Evidência**: `tom-visual.md`, `logo.md`, `leia-me.md` — scarlet/ink/off-white, Lato+Eurostile, tokens DTCG.
- **Diagnóstico**: a faceta Physique está completa, tokenizada e governada. Ressonância visceral alinhada à camada literal. Única faceta exemplar.
- **Nota**: 9/10 · **preservar** · **Esforço** S · **Impacto** alto

### F2-02 Identity Prism — três facetas do receptor vazias
- **Lente**: Aglaia (kapferer)
- **Evidência**: ausência total em `marca\*` de Relacionamento/Reflexo/Autoimagem; `voz-e-tom.md`/`mensagens-chave.md` em rascunho.
- **Diagnóstico**: o eixo do receptor do Prism é vazio — lacuna real, não escolha, mas só preenchível com cliente externo.
- **Nota**: 2/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: definir Relacionamento primeiro (derivável do material atual); Reflexo/Autoimagem aguardam público (depende de F1).

### F2-03 Cultura forte, mas mora no CLAUDE.md, não no material de marca
- **Lente**: Aglaia (kapferer × aaker)
- **Evidência**: `CLAUDE.md` §1 (soberania, vendor-agnóstico) vs. `tom-visual.md` (LTV).
- **Diagnóstico**: a Cultura é o ativo mais diferenciado da Kolden, mas está na infra, não na marca — e há duas culturas (soberania vs. crescimento) sem hierarquia.
- **Nota**: 5/10 · **corrigir** · **Esforço** M · **Impacto** alto
- **Recomendação**: elevar a cultura ao material de marca e eleger o kernel sagrado.

### F2-04 CBBE — base sem topo: salience visual sem ressonância
- **Lente**: Aglaia (kevin-keller)
- **Evidência**: design-system cobre Identidade + parte de Significado (imagery); `mensagens-chave.md` (vazio) deveria cobrir Performance.
- **Diagnóstico**: Resposta e Ressonância são N/A por estágio (exigem clientes). O defeito construível agora é o Significado verbal ausente.
- **Nota**: 4/10 · **corrigir (Significado) / reconstruir (topo)** · **Esforço** M · **Impacto** médio
- **Recomendação**: preencher `mensagens-chave.md` (lado Performance); não perseguir Ressonância ainda.

### F2-05 Aaker — proprietary asset real, demais dimensões nulas por ausência de público
- **Lente**: Aglaia (david-aaker)
- **Evidência**: `logo.md` "K partido inédito no mercado digital".
- **Diagnóstico**: só Proprietary Assets pontua; awareness/associações/qualidade/lealdade são 0 por estágio. Risco: a governança visual existe (Harmonia), mas a estratégica não tem dono.
- **Nota**: 4/10 · **corrigir** · **Esforço** S · **Impacto** médio
- **Recomendação**: atribuir dono da identidade estratégica; preservar o asset do K; não medir awareness ainda.

### F2-06 dan-mall — direção criativa visceralmente coerente, sem mensagem para vestir
- **Lente**: Harmonia (dan-mall) × Aglaia (kapferer)
- **Evidência**: `tom-visual.md` atributos "Confiante/Ousado/Elegante"; `voz-e-tom.md` (vazio) deveria dar a voz.
- **Diagnóstico**: tem o sentir (visceral) e o literal (tokens), mas a interseção falha por falta de voz verbal. Forma sem mensagem.
- **Nota**: 5/10 · **corrigir** · **Esforço** M · **Impacto** alto
- **Recomendação**: preencher `voz-e-tom.md` com 3 adjetivos derivados dos atributos visuais já definidos.

**Tensão F2**: Kapferer (defina o lado-receptor agora; identidade precede imagem) × Keller/Aaker (ressonância/awareness não se inventam sem público). Para marca jovem/interna, quanto da metade-receptor é definível a priori é a decisão central.

---

## Frente F3 — Arquétipo, personalidade & voz  ⚠️ LACUNA CRÍTICA

**Nota média: 1.9/10 — RECONSTRUIR.** A camada verbal é rascunho vazio: `voz-e-tom.md` e `mensagens-chave.md` são templates com placeholders, sem uma decisão tomada. Não há arquétipo, 3 adjetivos, tom por contexto, mensagem central, one-liner ou BrandScript — apesar de o tom visual maduro **implicar** um arquétipo (Mago × Fora-da-lei) que nunca foi formalizado.

### F3-01 Arquétipo não definido — apesar de o visual gritar um
- **Lente**: Aglaia×Harmonia
- **Evidência**: `voz-e-tom.md`/`mensagens-chave.md` não citam arquétipo; `tom-visual.md` "cyberpunk-tech, contraste alto, nunca corporativo-genérico".
- **Diagnóstico**: a estética mapeia direto em Mago (transformar a realidade) com inflexão Fora-da-lei (disruptivo, anti-SaaS) — reforçado pelo CLAUDE.md §1. O arquétipo existe de fato; só não está escrito.
- **Nota**: 1/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: rodar o archetype-discovery (7 passos), fixar primário+secundário (hipótese: Mago × Fora-da-lei) com lado-sombra.

### F3-02 Voz ausente — os 3 adjetivos nunca foram preenchidos
- **Lente**: Aglaia
- **Evidência**: `voz-e-tom.md` §Voz → `<!-- preencher -->`; tabela de tom com `<a definir>`.
- **Diagnóstico**: bloqueador puro. Personalidade precede visual, mas a ordem foi invertida. Matéria-prima latente existe (palavras-chave do `tom-visual.md`).
- **Nota**: 1/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: destilar 3 adjetivos de voz (candidatos: Confiante/Ousado/Sistêmico) + escala nas 4 dimensões + palavras sempre/nunca.

### F3-03 Tom por contexto inexistente — venda, suporte e conteúdo falam igual
- **Lente**: Aglaia
- **Evidência**: `voz-e-tom.md` tabela "Tom (varia por contexto)" só com linha-modelo `<a definir>`.
- **Diagnóstico**: sem modulação, qualquer operador (humano ou agente) improvisa. Para Hermes (WhatsApp/Telegram) e Pheme (social), é inconsistência ativa hoje.
- **Nota**: 2/10 · **reconstruir** · **Esforço** S · **Impacto** médio
- **Recomendação**: preencher matriz com ≥4 contextos (venda, suporte, conteúdo, erro de sistema) com tom + exemplo.

### F3-04 Mensagem central e BrandScript inexistentes
- **Lente**: Aglaia (donald-miller)
- **Evidência**: `mensagens-chave.md` "Mensagem central" vazia; provas `<a definir>`.
- **Diagnóstico**: sem BrandScript não há fonte única para site/e-mail/social/vendas. Pior: material posicional conflitante (LTV vs. soberania). "Se você confunde, você perde."
- **Nota**: 1/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: construir BrandScript SB7 completo; derivar mensagem central. Resolver F1 antes.

### F3-05 One-liner ausente — sem teste do grunhido
- **Lente**: Aglaia (donald-miller)
- **Evidência**: `mensagens-chave.md` sem campo nem rascunho de one-liner.
- **Diagnóstico**: sem one-liner (<25 palavras), não há abertura padrão para vendas/bio/pitch — trava o funil downstream.
- **Nota**: 1/10 · **reconstruir** · **Esforço** S · **Impacto** alto
- **Recomendação**: 3 variantes pelo template "[problema] + [solução] + [resultado]", validar no teste do grunhido.

### F3-06 Ponte visual→verbal quebrada: o visual-generator opera sem guia de personalidade
- **Lente**: Aglaia×Harmonia
- **Evidência**: `visual-generator.md` exige "entenda a personalidade" no passo 1, mas ela não existe documentada.
- **Diagnóstico**: assets coerentes na forma, órfãos no significado. Funciona com um operador de bom gosto; quebra ao escalar para múltiplos agentes/freelas.
- **Nota**: 3/10 · **corrigir** · **Esforço** S · **Impacto** médio
- **Recomendação**: após F3-01/02, adicionar link explícito arquétipo→estética em `tom-visual.md` ou novo `arquetipo.md`.

**Tensão F3**: o visual mascara a lacuna verbal (invisível e adiável hoje; inconsistência pública imediata ao escalar). E qual posicionamento alimenta a mensagem é dependência dura de F1.

---

## Frente F4 — Identidade visual (cor / tipografia / logo)

**Nota média: 8.4/10 — PRESERVAR / CORRIGIR.** Frente forte e madura: fundamentos documentados, fundamentados na apresentação-fonte, tokenizados, com contraste WCAG calculado sobre HEX reais. Perde pontos no que o sistema visual de Wheeler ainda exige (Movimento e Som), no favicon ausente e no risco de licenciamento da Eurostile.

### F4-01 Contraste WCAG calculado e restrição do scarlet documentada
- **Lente**: Aglaia×Harmonia
- **Evidência**: `cores.md` — scarlet/ink 5.43:1 (AA), scarlet/off-white 2.86:1 (reprova), decisão "botão primário = scarlet + texto ink".
- **Nota**: 10/10 · **preservar** · **Esforço** S · **Impacto** alto

### F4-02 Logo: conceito, variações, área de proteção, mínimos e usos proibidos
- **Lente**: Aglaia×Harmonia
- **Evidência**: `logo.md` — K partido, 3 cores × logotipo+símbolo, área de proteção = altura do K, mínimo ≥120px web / ≥25mm impresso, 7 usos proibidos.
- **Diagnóstico**: cobre quase tudo. Furo: falta lockup vertical/empilhado e assinatura com tagline/endosso; tipo de marca não nomeado.
- **Nota**: 8/10 · **corrigir** · **Esforço** M · **Impacto** médio
- **Recomendação**: adicionar lockup vertical e regra de troca logotipo↔símbolo por tamanho.

### F4-03 Tipografia: Lato+Eurostile com regra "Eurostile nunca em corpo"
- **Lente**: Aglaia×Harmonia
- **Evidência**: `tipografia.md` — regra de ouro explícita, escala base-16/~1.25 tokenizada, pesos por nível.
- **Nota**: 9/10 · **preservar** · **Esforço** S · **Impacto** médio
- **Recomendação**: adicionar 1–2 exemplos visuais de hierarquia aplicada no brandbook.

### F4-04 Risco de licenciamento da Eurostile tratado como gotcha, sem decisão
- **Lente**: Aglaia (jurídico) × Harmonia (token de fonte)
- **Evidência**: `tipografia.md` — "Eurostile: fonte comercial/licenciada… fallback: Saira, Rajdhani ou Chakra Petch".
- **Diagnóstico**: a marca depende de fonte que não pode ser embarcada na web sem licença; 3 fallbacks abertos = drift estético (a "etiqueta técnica" pode renderizar em 4 fontes).
- **Nota**: 6/10 · **corrigir** · **Esforço** S (decisão) / M (licença) · **Impacto** alto
- **Recomendação**: decidir — comprar licença web e fixar, OU eleger um substituto livre canônico (ex.: Saira Semi Condensed) e rebaixar Eurostile a origem histórica.

### F4-05 Sistema visual incompleto: faltam Movimento e Som
- **Lente**: Aglaia (sistema de 6 elementos) × Harmonia (brad-frost: animações são átomos)
- **Evidência**: grep em `01-fundamentos\*` — 0 ocorrências de movimento/motion.
- **Diagnóstico**: marca estática no papel. Para identidade "electric/cyberpunk-tech", a ausência de princípios de movimento é a maior lacuna conceitual da frente (fere o ideal de flexibilidade).
- **Nota**: 5/10 (sub-tema) · **reconstruir** · **Esforço** M · **Impacto** médio
- **Recomendação**: criar `01-fundamentos\movimento.md` (duração/easing como tokens, comportamento do K em transições, do/don't). Som como backlog.

### F4-06 Favicon citado como uso, mas inexistente como asset/spec
- **Lente**: Harmonia (design-system-architect, visual-generator)
- **Evidência**: `logo.md` e `indice-assets.md` citam favicon como uso, mas nenhum arquivo favicon listado.
- **Diagnóstico**: o K partido pode colapsar em 16px e isso nunca foi testado. Lacuna mais barata de fechar e de maior visibilidade pública.
- **Nota**: 6/10 · **corrigir** · **Esforço** S · **Impacto** médio
- **Recomendação**: gerar conjunto favicon (16/32/48/180 maskable), validar legibilidade em 16px, listar no índice.

### F4-07 Governança de assets: inventário magro de grafismos, símbolo SVG não-pronto
- **Lente**: Aglaia (managing assets) × Harmonia (brad-frost: curar)
- **Evidência**: `indice-assets.md` separa curados vs. originais, mas `grafismos-e-auxiliares.md` cura só 3 elementos e o símbolo isolado ainda precisa ser "recortado do horizontal SVG".
- **Diagnóstico**: arquitetura certa, profundidade rasa; o asset mais reutilizável (o K) não existe pronto.
- **Nota**: 7/10 · **corrigir** · **Esforço** M · **Impacto** médio
- **Recomendação**: extrair símbolo K isolado como SVG limpo (3 cores); ampliar kit de grafismos com texturas derivadas do K já prontas.

**Tensão F4**: Wheeler cobra o sistema (movimento/som) × Frost/architect cobram assets prontos (símbolo SVG, favicon). Sem divergência de mérito — a frente é forte; discordam só sobre qual lacuna pesa mais para chegar a 10.

---

## Frente F5 — Design system (tokens / componentes / acessibilidade)

**Nota média: 7.2/10 — APROVADO COM RESSALVAS.** Camada mais madura: tokens DTCG válidos (global→alias), 3 formatos sincronizados, contraste WCAG materializado em token, starter HTML/CSS **funcional de verdade**. Lacunas são de escala/operação: falta camada component de tokens, componente em código real, CI/CD de tokens, estado loading, Figma library e tema claro.

### F5-01 Hierarquia DTCG correta mas incompleta — falta a camada component
- **Lente**: Harmonia (design-system-architect)
- **Evidência**: `tokens.json` — global (`color.brand`) → alias (`color.bg|text|accent` via `{...}`); nenhum grupo `component.*`.
- **Nota**: 8/10 · **corrigir** · **Esforço** M · **Impacto** médio
- **Recomendação**: adicionar `component.*` referenciando alias; migrar o starter para consumi-los.

### F5-02 Três formatos sincronizados nos valores, mas sincronização é manual e parcial
- **Lente**: Harmonia (design-system-architect)
- **Evidência**: valores batem 1:1, mas Tailwind embute `lineHeight`/`letterSpacing` por tamanho que não existem como token no JSON; cabeçalhos dizem "mantenha sincronizado" (manual).
- **Diagnóstico**: drift real; sem Style Dictionary/CI, edições futuras divergem em silêncio.
- **Nota**: 6/10 · **corrigir** · **Esforço** M · **Impacto** alto
- **Recomendação**: tokenizar line-height/letter-spacing no JSON; gerar CSS/Tailwind via Style Dictionary (`npm run tokens`) com check de CI.

### F5-03 Contraste WCAG calculado e materializado em token — ponto alto
- **Lente**: Aglaia×Harmonia
- **Evidência**: `cores.md` tabela de razões; token `accent.contrast` = ink com `$description` "ink passa AA; branco não"; coerente em JSON/cores/componentes/starter.
- **Nota**: 9/10 · **preservar** · **Esforço** S · **Impacto** alto

### F5-04 Starter é HTML/CSS funcional real, com foco visível e erro acessível — mas faltam estados
- **Lente**: Harmonia (ui-engineer, ux-designer)
- **Evidência**: `starter\index.html` (138 linhas, funcional) — botão/link/input com hover/active/focus-visible/disabled/aria-invalid; nenhum componente tem estado `loading` (obrigatório no `output-quality.md`).
- **Nota**: 7/10 · **corrigir** · **Esforço** S · **Impacto** médio
- **Recomendação**: adicionar estado loading (spinner/`aria-busy`) + skeleton; estados de Card/Badge.

### F5-05 "Sem hardcode, só tokens" — regra clara e quase cumprida (3 vazamentos no starter)
- **Lente**: Harmonia (ui-engineer)
- **Evidência**: `leia-me.md` "nenhum valor hardcoded", mas o starter tem `box-shadow rgba(255,61,34,.25)`, `letter-spacing: 0.08em` e `style` inline literais.
- **Nota**: 7/10 · **corrigir** · **Esforço** S · **Impacto** baixo
- **Recomendação**: criar tokens `--ds-focus-ring`, `--ds-letter-*`; remover inline.

### F5-06 Sistema dark-only — sem tema claro tokenizado, apesar de previsto
- **Lente**: Aglaia×Harmonia
- **Evidência**: `cores.md` "o modo claro é a exceção elegante", mas tokens têm um único conjunto semântico (bg=ink, text=off-white); sem theme claro comutável.
- **Diagnóstico**: modo claro é doutrina declarada mas não tokenizada — quem precisar hardcoda (furando F5-05). Alias pronto para suportar 2 temas → lacuna barata.
- **Nota**: 5/10 · **reconstruir** · **Esforço** M · **Impacto** médio
- **Recomendação**: definir tema claro como remapeamento dos alias sob seletor de tema.

### F5-07 Sem componente em código de produção (React/Vue) nem Figma library — só HTML
- **Lente**: Harmonia (design-system-architect, ui-engineer)
- **Evidência**: `leia-me.md` lista só tokens + `starter/index.html` + exemplos; nenhum React/Storybook/`.fig`.
- **Diagnóstico**: HTML starter é a coisa certa como primeira entrega (vendor-agnóstico/soberano), mas não há fonte única de componente consumível por produto nem biblioteca de design. Maior lacuna de operacionalização.
- **Nota**: 5/10 · **reconstruir** · **Esforço** L · **Impacto** alto
- **Recomendação**: portar o starter para pacote de componentes (React + preset Tailwind existente) com Storybook + addon a11y; criar Figma library com Variables (Tokens Studio).

**Tensão F5**: vendor-agnóstico/soberano (Kolden OS, HTML-só-tokens) × stack-específica (Harmonia define o DS por React/Tailwind/Storybook). A síntese decide se o alvo é pacote React canônico ou se o starter-tokens permanece a fonte neutra e cada produto porta.

---

## Frente F6 — Aplicações, pontos de contato & naming

**Nota média: 3.4/10 — FRÁGIL → RECONSTRUIR.** Aplicações visuais existem só como receita rasa; nenhuma guideline real por canal, nenhum checklist de auditoria de peça, nenhum inventário de touchpoints. Naming: lacuna crítica — a Kolden **opera** uma arquitetura de naming mitológico grego (15+ squads) que **não está documentada como convenção de marca**.

### F6-01 Receita base existe, mas sem guideline por canal
- **Lente**: Aglaia×Harmonia
- **Evidência**: `04-aplicacoes\exemplos.md` — receita base + do's/don'ts, mas "contextos de uso" reduz IG/FB/e-mail a "ajuste densidade ao formato"; LinkedIn e slides nem citados.
- **Nota**: 4/10 · **corrigir** · **Esforço** M · **Impacto** alto
- **Recomendação**: criar `04-aplicacoes\por-canal.md` com 1 spread por touchpoint (dimensão, grid, posição do logo, densidade de scarlet, fonte mínima) + exemplo renderizado.

### F6-02 Mockups são ilustrativos e externos — não há peça-fonte reaproveitável
- **Lente**: Harmonia
- **Evidência**: `exemplos.md` — únicos mockups são 5 PNGs da apresentação 2023, marcados "não-finais".
- **Nota**: 3/10 · **reconstruir** · **Esforço** L · **Impacto** alto
- **Recomendação**: produzir templates reais versionados (post social + assinatura e-mail em HTML/SVG tokenizado) + prompts de imagem de marca.

### F6-03 Pontos de contato citados de passagem, nunca inventariados
- **Lente**: Aglaia (alina-wheeler)
- **Evidência**: favicon/avatar só como "uso" em `logo.md`/`indice-assets.md`; assinatura de e-mail, selo, timbrado não existem.
- **Nota**: 3/10 · **reconstruir** · **Esforço** M · **Impacto** médio
- **Recomendação**: criar `04-aplicacoes\pontos-de-contato.md` (touchpoint × asset × spec × status): favicon, avatar, OG-image, assinatura e-mail, slide.

### F6-04 Nenhum checklist de auditoria visual de peça
- **Lente**: Aglaia×Harmonia
- **Evidência**: `exemplos.md` tem do's/don'ts em prosa, mas nenhum checklist acionável de aprovação.
- **Nota**: 4/10 · **corrigir** · **Esforço** S · **Impacto** médio
- **Recomendação**: extrair `checklist-auditoria-de-peca.md` (10–12 itens binários); anexar ao fluxo do Pheme.

### F6-05 Sistema de naming da marca INEXISTENTE no doc — apesar de operar de fato
- **Lente**: Aglaia (naming-strategist)
- **Evidência**: grep em `marca\` por "naming/nomenclatura/mitolog" → 0; mas `CLAUDE.md` §10 + `AGENTS.md` revelam 15 squads com nomes gregos (Aglaia, Harmonia, Pheme, Caliope, Themis, Hermes, Prometeu, Caos).
- **Diagnóstico**: a Kolden tem o ativo mais difícil — um sistema de naming coerente e semanticamente motivado — mas vive como folclore, não convenção documentada. Sem regra de "como nomear o próximo", risco de incoerência (Hermes é runtime vendorizado, "Caos" foge do panteão).
- **Nota**: 2/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: documentar `marca\naming.md` — panteão como sistema, critério de escolha, fronteira marca-mãe (Kolden) vs. submarcas (panteão), arquitetura de marca (monolítica vs. endossada).

### F6-06 Viabilidade digital (domínio kolden.* + handles) nunca registrada
- **Lente**: Aglaia (domain-scout)
- **Evidência**: nenhuma referência a domínio/handle em `marca\`; o repo é `Koldenoficial/Kolden` — sufixo "oficial" é sinal clássico de handle exato tomado.
- **Diagnóstico**: cenário tier-3/4 de fragmentação de marca. Inverificável offline.
- **Nota**: 3/10 · **reconstruir** · **Esforço** S (pesquisa) / M (aquisição) · **Impacto** alto
- **Recomendação**: TAREFA ONLINE — domain-scout roda relatório (`kolden.com/.com.br/.io/.ai`, @kolden nas 6 plataformas, conflito de trademark); registrar em `marca\viabilidade-digital.md`; decidir handle canônico.

**Tensão F6**: formalizar retroativamente um naming que já funciona (preservar) vs. impor metodologia sobre escolhas consumadas — resolução: documentar/racionalizar o existente, não renomear. E ordem de fila: mapear touchpoints antes vs. produzir os 2-3 óbvios em paralelo.

---

## Frente F7 — Governança, maturidade & cultura

**Nota média: 4.0/10 — EMERGENTE.** Ofício visual maduro (Definido), mas governança nominal (Emergente): há dono nomeado (Harmonia) e regra de propagação de tokens, mas nenhum processo de mudança/refresh, nenhum status & roadmap, nenhum dado de adoção. A marca externa e a cultura interna nunca foram fundidas num documento (tese FUSION de Yohn).

### F7-01 Dono da marca nomeado, mas sem mandato operacional
- **Lente**: Aglaia×Harmonia
- **Evidência**: `design-system\leia-me.md` §Governança — "disciplina do squad Harmonia… mudança passa por atualizar tokens.json e propagar"; `AGENTS.md` Harmonia = design ops.
- **Diagnóstico**: dono é um squad, não um RACI (quem aprova/revisa/evangeliza). Operações acidentais, não desenhadas.
- **Nota**: 5/10 · **corrigir** · **Esforço** S · **Impacto** alto
- **Recomendação**: escrever `governanca.md` com RACI mínimo (dono Harmonia/`design-chief`, aprovador Aglaia/`brand-chief`, gatilhos).

### F7-02 Não existe processo de pedido de mudança / validação / refresh
- **Lente**: Harmonia (dave-malouf, dan-mall)
- **Evidência**: `leia-me.md` descreve o que propagar, não como solicitar/revisar/versionar; nenhum CHANGELOG nem cadência de refresh.
- **Diagnóstico**: sem change-request, a "fonte de verdade" deriva na primeira pressão de prazo.
- **Nota**: 2/10 · **reconstruir** · **Esforço** M · **Impacto** alto
- **Recomendação**: fluxo leve (issue/template → revisão Harmonia → propagação → CHANGELOG datado) + refresh trimestral.

### F7-03 Sem documento de status & roadmap da marca
- **Lente**: Aglaia×Harmonia
- **Evidência**: glob de `marca\**` retorna só fundamentos/tokens/componentes/aplicações + o guia; nenhum status/roadmap.
- **Nota**: 3/10 · **reconstruir** · **Esforço** S · **Impacto** médio
- **Recomendação**: criar `marca\status-e-roadmap.md` (matriz de maturidade por componente + marcos). Esta auditoria é o insumo.

### F7-04 Marca↔cultura coexistem mas não estão fundidas (FUSION de Yohn)
- **Lente**: Aglaia (denise-yohn) — lente principal
- **Evidência**: marca externa (`identidade-visual.md`, `CLAUDE.md`: soberania) vs. cultura interna (`CLAUDE.md` §4 PT-BR, `AGENTS.md` mitologia grega + Ritual) — nunca se cruzam num doc.
- **Diagnóstico**: fusão latente forte (soberania ⇄ self-hosted é coerência genuína; mitologia é ativo cultural), mas de fato sem articulação. Risco mitigado por sorte, não desenho.
- **Nota**: 5/10 · **corrigir** · **Esforço** S · **Impacto** alto
- **Recomendação**: 1 página ligando cada valor de marca ao comportamento interno correspondente (brand toolbox de Yohn).

### F7-05 Marca empregadora ausente — coerente com Yohn, mas valores únicos não escritos
- **Lente**: Aglaia (denise-yohn)
- **Evidência**: nenhum employer brand em `marca\`; identidade interna implícita em `AGENTS.md`/`CLAUDE.md` §6.
- **Diagnóstico**: a ausência de plataforma separada é doutrinariamente correta (Yohn), mas o conjunto único de valores que serviria a clientes E colaboradores também não está escrito. Força de trabalho majoritariamente de agentes → "experiência do colaborador" vira experiência do agente (já desenhada via Ritual/tom).
- **Nota**: 4/10 · **corrigir** · **Esforço** S · **Impacto** médio
- **Recomendação**: não criar employer brand separado; consolidar valores únicos no doc de fusão (F7-04), nomeando a experiência do agente.

### F7-06 Adoção do design system: artefato pronto, evangelismo e prova de uso ausentes
- **Lente**: Harmonia (dan-mall)
- **Evidência**: `leia-me.md` tem instruções de adoção, mas nenhum piloto/consumo registrado; Projetos reais (`omiron`, `CataLogo`) usam shadcn/ui — sem rastro de importar tokens Kolden.
- **Diagnóstico**: sistema no estágio "produto", não "prática incorporada". O teste de Mall ("as pessoas querem usar?") não tem resposta; o sinal disponível sugere DS de marca e stack de produto separados.
- **Nota**: 4/10 · **corrigir** · **Esforço** M · **Impacto** alto
- **Recomendação**: rodar 1 piloto (portar um componente de `omiron`/`CataLogo` para tokens Kolden) + 1-2 métricas de adoção.

### F7-07 Maturidade desigual entre as 3 lentes — Ofício maduro mascara gargalo de Processo/Pessoas
- **Lente**: Harmonia (dave-malouf)
- **Evidência**: Ofício = Definido (3); Processo = Emergente (2, F7-02); Pessoas/Cultura = Emergente (2, F7-01/04).
- **Diagnóstico**: o gargalo é Pessoas/Processo, não Ofício. Investir mais em componentes reforça a lente já madura e ignora o gargalo (anti-padrão). Sem change-request, os tokens derivam e a maturidade visual regride.
- **Nota**: 4/10 · **corrigir** · **Esforço** M · **Impacto** alto
- **Recomendação**: F7-02 (processo) e F7-04 (fusão) são as intervenções de maior alavancagem; só depois investir em novos componentes.

**Tensão F7**: Yohn (colaboradores humanos) adapta-se bem à força de trabalho de agentes. Malouf (proteger o ofício) × Mall (incorporar à forma como já trabalham) convergem no piloto. Coerência marca↔cultura é forte de fato, fraca de jure — divergência só no grau de urgência de articulá-la.
