---
tipo: projeto
projeto: brw-movelaria
squad: Pheme
agente: growth-analyst
data: 2026-07-15
plataforma: Instagram
mes-alvo: agosto/2026
insumos:
  - "[[sobre-a-empresa/Projetos/Ativos/brw-movelaria/social/matriz-de-conteudo-2026-07-15|matriz-de-conteudo-2026-07-15]]"
  - "[[sobre-a-empresa/Projetos/Ativos/brw-movelaria/coleta-bruta/instagram-top-20-posts-2026-07-06|instagram-top-20-posts-2026-07-06]]"
---

# BRW Movelaria — Plano de Teste & Métricas Instagram (agosto/2026)

> **Squad:** Pheme · **Agente:** growth-analyst · **Escopo:** 16 posts em 4 semanas, orgânico puro (paid bloqueado pelo gate Aletheia H2/H3/H5).
>
> **Filosofia:** base pequena (541 seguidores) exige priorização brutal. **Uma métrica-norte por semana** — não três, não cinco. O ativo aqui é a decisão de o que **não** medir.

---

## 0. Baseline agregada (últimos ~6 meses)

Extraído de `coleta-bruta/instagram-top-20-posts-2026-07-06.md` (20 posts, janela 2026-01-15 → 2026-07-01):

| Indicador | Valor observado | Observação |
|---|---:|---|
| Base de seguidores | 541 | pequena — variância estatística alta por post |
| Média de likes | 7,5 | dataset dos 20 posts do período |
| Máximo de likes | 18 | `DWHg-I4iX04` (studio integrado) |
| Segundo maior | 17 | `DUJmQ5MD9oW` (visita técnica Singulari, Reel) |
| Total de comentários (20 posts) | ~12 | 15/20 posts com 0 comentários |
| Engajamento médio estimado | ~1,4% | (likes+comments)/seguidores, aproximação Apify |
| Mix de formato observado | 12 carrosséis · 4 Reels · 4 feed image | Reels são raros mas puxam engajamento (2º maior é Reel) |
| Vertical B2B mais forte | Singulari (6 posts) + Iberostar (1) | prova social já circulante |
| Vertical nichado com discurso próprio | Airbnb / short-stay | 3 posts explícitos com discurso de ROI |

**O que o dataset NÃO cobre** (Apify não retorna estes campos publicamente):
- Alcance de não-seguidores (accounts reached fora da base)
- Salvos (saves)
- Compartilhamentos (shares)
- Cliques em perfil
- DMs originadas de post específico
- Retenção de Reel (% que viu até o fim)

Para essas métricas o baseline sai **do próprio Meta Business Suite / Instagram Insights** — precisa ser puxado manualmente no dia 01/08 (D-3 do primeiro post). Marcado como `[BASELINE PENDENTE]` em cada seção abaixo. **Isso é pré-requisito para medir a semana 1**.

---

## 1. Métrica-norte por semana

### S1 (04–10/ago) — Autoridade B2B · métrica-norte: **SALVOS**

**Por que salvos:** o conteúdo da semana é técnico/analítico (por que R$300k é preço de canal; curadoria vs. compra direta; cadeira que aguenta hotel). Investidor sênior/hoteleiro (persona A) não curte — arquiva. Salvo é o único sinal orgânico que separa "consumo passivo" de "vou voltar aqui quando decidir mobiliar". É o proxy mais barato de intenção B2B numa base sem tráfego pago.

**Baseline:** `[BASELINE PENDENTE]` — puxar em 01/08 no Meta Business Suite → *Insights* → *Conteúdo* → filtro últimos 90 dias → coluna "Salvamentos" → calcular média por post e por formato (carrossel vs. Reel vs. feed).

**Meta agosto:** **duplicar a média por post-âncora** (2 âncoras na S1: post #1 carrossel-analítico e post #3 Reel-Iberostar). Racional: são as duas peças com maior valor de arquivamento óbvio da semana (uma tem números, outra tem case). Para os 2 templates da S1, meta = manter baseline. Se baseline chegar em zero, meta absoluta = mínimo 3 salvos por âncora (rule of thumb: 0,5% da base).

**Como medir:**
- Postiz: aba *Analytics* → post individual → coluna *Saves* (Postiz puxa via Graph API).
- Meta Business Suite (fallback + validação cruzada): *Insights* → *Conteúdo* → post individual → *Interações* → *Salvamentos*.
- Sempre validar Postiz contra Meta na primeira semana (Postiz atrasa 12–24h vs. Meta nativo).

---

### S2 (11–17/ago) — Alcance / quebrar bolha · métrica-norte: **ALCANCE DE NÃO-SEGUIDORES**

**Por que alcance de não-seguidores:** a semana é desenhada para escapar da bolha de 541 seguidores (P3×contrário "móvel bonito é o pior investimento", P4×contrário "a coragem de deixar o vazio", Reel-resposta ao 3M com "prazo curto"). O objetivo estrutural é ganhar impressão fora da base. Ganho de seguidor é consequência distante; o sinal direto é *quantas contas fora da base viram o conteúdo*.

**Baseline:** `[BASELINE PENDENTE]` — puxar em 01/08. Meta Business Suite → *Insights* → *Conteúdo* → post individual → *Alcance* → filtro "Não-seguidores" (%). Se o campo não aparecer no post-a-post, usar *Overview* → *Alcance* → *Tipo de público* nos últimos 90 dias como proxy de baseline agregado. Registrar tanto valor absoluto quanto %.

**Meta agosto:** para os 2 posts de gancho contrário da S2 (posts #5 e #7 — os mais propensos a viralizar por atrito narrativo), meta = **% de não-seguidores no alcance ≥ 40%** (num post normal de conta pequena orgânica sem push, o número tende a ser 15-25%; 40% indica que o conteúdo saiu da bolha). Para os 2 posts template, meta = manter baseline. Não perseguir número absoluto (alcance total depende de sorte algorítmica), perseguir **proporção**.

**Como medir:**
- Meta Business Suite (fonte primária, mais granular): *Insights* → *Conteúdo* → post individual → *Alcance* → gráfico "Seguidores vs. Não-seguidores".
- Postiz (fallback): aba *Analytics* → *Reach* — mas Postiz não separa seguidor vs. não-seguidor com fidelidade. Usar só para triangulação de tendência.
- Registrar em planilha semanal: `post_id | reach_total | reach_nao_seguidor_abs | reach_nao_seguidor_pct`.

---

### S3 (18–24/ago) — Prova social / case-book · métrica-norte: **MENSAGENS NO WHATSAPP**

**Por que DMs no WhatsApp:** semana desenhada para converter — case-book (Hotel do Flamengo, jornada da planta à chave, canteiro real, curador vs. fornecedor). É a única semana com CTA de negócio direto. Como o site está fora do ar (3 URLs DNS-off), o CTA universal em todos os posts é `+55 71 99902-7171`. A métrica que fecha o loop é **inbound no WhatsApp com atribuição a Instagram**.

**Baseline:** `[BASELINE PENDENTE]` — mais difícil de estabelecer. Duas opções:
1. **Preferida:** perguntar à Robinsom/comercial quantos leads chegaram por WhatsApp nos últimos 30 dias e quantos declararam "vim pelo Instagram" (mesmo sem instrumentação técnica, humano recebendo pode registrar). Marcar linha de base retroativa.
2. **Se opção 1 não for viável:** criar um link `wa.me/5571999027171?text=Vim%20pelo%20Instagram` e usar SÓ nos 4 posts da S3 (link na bio + primeiro comentário). Todo inbound com essa mensagem pré-preenchida = atribuível.

**Meta agosto:** **≥ 3 mensagens no WhatsApp originadas dos 4 posts da S3, com pelo menos 1 lead qualificado B2B** (incorporadora, hotel, gestor de Airbnb multi-unidade). Racional: com 541 seguidores e sem paid, 3 DMs bem qualificadas é resultado real; se vier acima disso, ótimo — se vier menos, o gargalo não é conteúdo, é distribuição (voltamos ao gate paid).

**Como medir:**
- Link atribuível `wa.me/…?text=…` (método técnico limpo).
- Registro humano: pedir para quem responde o WhatsApp anotar origem declarada.
- Consolidar em `s3-conversao.md` no final da semana: `data | contato | origem_declarada | origem_tecnica | qualificacao (B2B/residencial/lixo)`.
- Bonus (soft signal): comparar cliques no link da bio nos períodos S1–S2 (baseline) vs. S3 (via Meta Business Suite → *Insights* → *Interações* → *Cliques em link*).

---

### S4 (25–31/ago) — Lifestyle / residencial premium · métrica-norte: **ENGAJAMENTO (curtidas + salvos)**

**Por que engajamento agregado:** semana C (residencial premium) tem baixa densidade de intenção comercial imediata — a conversa é estética/atemporal (Megan em 3 revestimentos, proporção certa, TRAMA, rattan que dura). Ninguém compra sofá porque viu um post; a métrica correta é **afinidade da audiência com a linha autoral**. Combinar likes + salvos vira o proxy dessa afinidade — likes medem ressonância imediata, salvos medem "quero lembrar disso". Aqui vale a métrica composta.

**Baseline:** média de likes por post no período = **7,5** (dataset Apify, confirmado). Salvos = `[BASELINE PENDENTE]` (mesmo procedimento da S1). Baseline composto = 7,5 + `[SALVOS_BASELINE]` = valor a completar em 01/08.

**Meta agosto:** para os 2 posts-âncora da S4 (Megan carrossel + TRAMA Reel), meta = **engajamento (likes+salvos) 50% acima do baseline composto**. Racional: são as peças mais fotografáveis do mês e falam direto com a persona C, que curte e arquiva. Para os 2 templates, meta = **manter baseline**. Se o carrossel Megan bater 15+ likes, é sinal forte — é o formato âncora da linha autoral (empatando com o topo histórico de 18).

**Como medir:**
- Postiz: aba *Analytics* → *Engagement* (likes + comments + saves + shares consolidado — sim, Postiz agrega tudo em "engagement"; para separar likes+salvos como definido aqui, extrair manualmente cada componente).
- Meta Business Suite: post individual → *Interações* → somar *Curtidas* + *Salvamentos*.
- Registrar em planilha: `post_id | likes | saves | soma | delta_vs_baseline_composto`.

---

## 2. Um teste A/B por semana

Base: 541 seguidores. Cada teste tem N pequeno — resultado é **direcional, não estatisticamente conclusivo**. Servem para reduzir incerteza qualitativa, não para "provar" nada.

---

### S1 · A/B — Gancho de abertura do carrossel-âncora (post #1)

| Elemento | Detalhe |
|---|---|
| **Variável** | Primeiro slide (capa) do carrossel `Por que R$300k por unidade não é preço de móvel — é preço de canal`. |
| **Variante A** | Título como manchete pura + fundo neutro: **"R$300k por unidade. R$176k por unidade. A diferença não estava no móvel."** |
| **Variante B** | Título com número em destaque tipográfico gigante + foto do ambiente Singulari por trás com overlay: **"R$300k → R$176k · por unidade · Alphaville, 24 casas"**. |
| **Hipótese** | Se a capa for número puro (A), então o alcance de não-seguidores será maior, porque provoca curiosidade sem contexto; se for número + ambiente (B), então salvos serão maiores, porque o investidor B2B reconhece o cenário e arquiva. |
| **Critério de aprendizado** | Comparar, 72h após publicação: (a) % não-seguidores no alcance de A vs. B; (b) salvos absolutos de A vs. B. Vencedor por métrica-norte (salvos). |
| **Como isolar** | Postar **apenas uma variante** no post #1 (seg 04/08). A outra variante fica engatilhada para o post #2 do dia 06/08, com o **mesmo esqueleto de carrossel** (versão reduzida do #1 adaptada ao contrário) — troca só a capa. Mesma janela horária (proposta: 20h). Mesmas hashtags-âncora. Se logística não permitir manter o esqueleto no post #2, o teste vira "capa A vs. capa B em stories" no mesmo dia (menos limpo, mas viável). |
| **Registro** | `s1-ab-capa.md`: variante_publicada, saves_72h, reach_nao_seguidor_72h, decisão. |

---

### S2 · A/B — Horário de publicação do Reel-âncora (post #7, sex 15/08)

| Elemento | Detalhe |
|---|---|
| **Variável** | Horário de publicação do Reel `Prazo curto não é o melhor prazo`. |
| **Variante A** | **Sexta 15/08, 10h** (janela da manhã — investidor B2B em rotina de trabalho, feed limpo). |
| **Variante B** | **Sexta 15/08, 20h** (janela noturna — comportamento consumidor, feed cheio mas maior tempo de tela). |
| **Hipótese** | Se o público-alvo (persona B, investidor de Airbnb, decisor jovem) consome IG à noite (20h), então o alcance de não-seguidores será maior à noite pela densidade de sessões; mas o **engajamento por impressão** pode ser maior de manhã (feed menos competitivo). |
| **Critério de aprendizado** | Comparar, 72h após publicação, entre este Reel e o Reel-âncora da S1 (post #3 sex 08/08, Iberostar) — mesma faixa de formato/duração, publicado em horário diferente. Comparação Reel vs. Reel, não Reel vs. carrossel. Vencedor pela métrica-norte da S2 (alcance de não-seguidores). |
| **Como isolar** | Escolher horário do post #3 (S1, Iberostar) como o **oposto** do post #7 (S2, prazo curto): se post #3 sai 10h, post #7 sai 20h — e vice-versa. Documentar decisão de horário do post #3 antes de 08/08 (não improvisar). Não misturar variável de dia (ambos em sexta) nem de formato (ambos Reel-âncora). |
| **Registro** | `s2-ab-horario.md`: horario_publicacao, alcance_total_72h, alcance_nao_seguidor_pct_72h, retencao_reel_pct, decisão. |

---

### S3 · A/B — CTA final do carrossel-âncora (post #10)

| Elemento | Detalhe |
|---|---|
| **Variável** | Último slide (CTA) do carrossel `Da planta à chave: 6 momentos onde um interlocutor único te economiza duas semanas`. |
| **Variante A** | CTA direto e transacional: **"Precisa mobiliar um projeto? WhatsApp `+55 71 99902-7171` — respondemos hoje."** |
| **Variante B** | CTA por convite consultivo: **"Está no meio de um projeto? Mandamos, em 24h, o mapa dos 6 momentos aplicado ao seu caso — sem obrigação. WhatsApp `+55 71 99902-7171`."** |
| **Hipótese** | Se o CTA for direto (A), então o volume de DMs será menor mas a qualificação será maior (só entra quem tem projeto quente); se for consultivo (B), então volume será maior mas qualificação menor (curioso pede "o mapa" sem intenção real). |
| **Critério de aprendizado** | Comparar, 72h após publicação: (a) DMs absolutas por post; (b) % qualificadas como B2B (incorporadora/hotel/gestor Airbnb multi-unidade). Vencedor pela **métrica composta** (DMs qualificadas), não por volume bruto. |
| **Como isolar** | Publicar A no post #10 (qua 20/08). Postar B no post #12 (dom 24/08, listicle "5 perguntas que separam fornecedor de curador") com o mesmo CTA-B no último slide. Mesmo `wa.me/…?text=…` para atribuição limpa mas com sufixos distintos (`?text=Mapa` para B, `?text=Projeto` para A) — o texto pré-preenchido identifica variante. |
| **Registro** | `s3-ab-cta.md`: variante, dms_72h, qualif_b2b, decisão. |

---

### S4 · A/B — Ganchos de legenda do carrossel-âncora (post #13, Megan)

| Elemento | Detalhe |
|---|---|
| **Variável** | Primeira linha da legenda (hook de scroll-stop). Estética idêntica no visual. |
| **Variante A** | Ganho autoral/orgulho de linha: **"A Megan atravessou três projetos sem repetir. Isso não é catálogo — é curadoria."** |
| **Variante B** | Convite ao leitor/pergunta: **"Uma cadeira em três casas, três anos, três revestimentos. Você reconheceria como a mesma peça?"** |
| **Hipótese** | Se o hook for declarativo autoral (A), então salvos serão maiores (quem se identifica com "curadoria" arquiva); se for pergunta ao leitor (B), então comentários e compartilhamentos serão maiores (pergunta convida resposta). |
| **Critério de aprendizado** | Comparar, 72h após publicação: (a) salvos; (b) comentários; (c) compartilhamentos. Vencedor pela métrica-norte da S4 (engajamento composto likes+salvos), com nota qualitativa sobre comentários (proxy de resposta emocional). |
| **Como isolar** | Publicar A no post #13 (seg 25/08). Publicar B no post #15 (sex 29/08, Reel TRAMA — adaptar B para narração do primeiro segundo do Reel: "Uma coleção em três projetos… você reconheceria como a mesma linha?"). Formato diferente (carrossel vs. Reel) é uma variável parasita — documentar essa limitação. Alternativa mais limpa se logística permitir: usar A e B em dois carrosséis do mesmo dia via feed principal + stories. |
| **Registro** | `s4-ab-hook.md`: variante, likes, saves, comments, shares, decisão. |

---

## 3. Riscos analíticos

1. **Base minúscula (541 seguidores) → variância estatística é ruído.** Um post que bate 15 likes vs. um que bate 8 pode ser diferença real de conteúdo ou pode ser 20 pessoas que abriram o app naquele minuto. Regra: **nenhuma decisão de ferro por 1 post**. Padrão vale quando repete 3× no mesmo formato (mês 1, mês 2, mês 3). Este plano de agosto é *ondulação*, não *veredito*.

2. **Sazonalidade de agosto.** Semana 1 tem 5/8 (feriado de nada, mas férias escolares BA terminam por volta de 04/08) — feed mais cheio, competição por atenção maior. Semana 3 tem 24/8 (final de semana longo em algumas regiões dependendo de calendário municipal Salvador). Ajuste: no A/B de horário da S2, comparar sábado vs. domingo se algum feriado empurrar consumo.

3. **Site quebrado bloqueia rastreio de conversão orgânica.** Sem UTM em landing próprio, o único CTA rastreável é WhatsApp com `wa.me/…?text=…`. Isso limita:
   - Não dá para medir "leitor→visita→lead" (funil quebrado no meio).
   - Não dá para retargetar (Pixel Meta sem site instalado é inútil, mas de qualquer forma o gate paid impede).
   - **Impacto:** todas as DMs de agosto contam como conversão porque não há alternativa. Se site voltar em setembro, redesenhar CTA por semana.

4. **Sem paid campaign (gate Aletheia H2/H3/H5 aberto, teto R$5k/mês).** Consequências:
   - Alcance orgânico depende exclusivamente do algoritmo — sem plano B para viralização deliberada.
   - "Alcance de não-seguidores" (métrica-norte S2) é 90% sorte + 10% conteúdo. Se conteúdo bater 40%+ organicamente, é sinal forte de que o formato tem tração e justifica reabrir gate paid.
   - **Isso torna S2 diagnóstica**: se S2 não sair da bolha, orgânico não escala BRW — precisa de mídia. É o teste mais estratégico do mês, ainda que a métrica em si tenha ruído alto.

5. **Concorrência de atenção interna Kolden.** Se o esforço de produção das 4 âncoras não for cumprido no prazo (fan-out `carousel-architect` × 4 + `short-video-architect` × 4 previsto na matriz), os A/Bs comparam esforços desiguais. Risco de produção, não de métrica — mas afeta a leitura.

6. **A/B da S3 (CTA) tem viés de composição.** Variante B é mais longa e informa mais — pode "ganhar" por qualidade de copy, não por formato de CTA. Registrar como limitação; se possível, refazer a comparação em setembro com CTAs de mesmo comprimento.

7. **Métricas de Postiz atrasam contra Meta Business Suite.** Não confiar em Postiz nas primeiras 48h. Verdade oficial nos primeiros 3 dias é sempre Meta nativo.

---

## 4. Cadência de leitura

### Ritmo de checagem

| Momento | Checagem | Responsável | Ferramenta |
|---|---|---|---|
| **T+0** (dia do post, 2h após publicação) | Sanidade: post publicado, sem quebra técnica, primeiros comentários (spam? dúvida?) | Publisher (Postiz + humano operando @brwmovelaria) | Meta app + Postiz |
| **T+24h** | Snapshot inicial: reach, likes, primeiros salvos. Não decidir nada. Só registrar. | growth-analyst (assíncrono) | Meta Business Suite |
| **T+72h** | Leitura da métrica-norte + fechamento do A/B da semana. Este é o momento de decisão. | growth-analyst | Meta Business Suite (fonte primária) + Postiz (validação cruzada) |
| **Fim de semana (dom 23h)** | Consolidação semanal em `sem-N-fechamento.md`. | growth-analyst | planilha própria + Meta |
| **Segunda-feira 09h** | Handoff ao social-chief com veredito e ajustes para a próxima semana. | growth-analyst → social-chief | markdown no repo do projeto |

**Regra dura:** decisão de mudar plano da semana N+1 baseada em resultado da semana N precisa **fechar até domingo 23h**. Segunda de manhã já é tarde — o carrossel da segunda precisa ir para o Postiz na sexta anterior.

### Handoff enxuto (fluxo semana a semana)

```
publisher (Postiz + humano) → posta
       ↓
growth-analyst → lê T+72h, fecha A/B, escreve sem-N-fechamento.md
       ↓
social-chief → aprova ou desvia o plano da semana N+1
       ↓
carousel-architect / short-video-architect → produzem N+1
```

Sem cerimônia, sem call recorrente. Tudo em markdown no repo.

### Formato do report semanal

**Um parágrafo + uma tabela.** Nada mais.

**Modelo (usar em `sem-N-fechamento.md`):**

```md
# BRW · Fechamento Semana N (datas)

**Métrica-norte da semana:** [salvos / alcance não-seguidores / DMs / engajamento composto]
**Baseline:** X · **Meta:** Y · **Real:** Z · **Veredito:** [bateu / não bateu / inconclusivo]

**Parágrafo (3-5 linhas):** [O que funcionou, o que não funcionou, o que vamos fazer diferente na semana N+1. Sem hedging. Se inconclusivo, dizer inconclusivo.]

| # | Data | Formato | Métrica-norte | Meta | Real | Hipótese A/B | Resultado A/B |
|---|---|---|---|---:|---:|---|---|
| 1 | seg | carrossel-âncora | salvos | 6 | 4 | capa número puro | ganhou em reach |
| 2 | qua | feed | salvos | 3 | 5 | — | — |
| 3 | sex | Reel-âncora | salvos | 6 | 9 | horário 10h | manhã ganhou |
| 4 | dom | feed | salvos | 3 | 2 | — | — |
```

Total: ≤ 250 palavras + tabela. Se o report passar de uma tela, está errado.

---

## 5. Handoff setembro

### 5 perguntas a responder até 31/ago

1. **Qual formato tem maior salvos-por-visualização?** Carrossel vs. Reel vs. feed. Dado real após 16 posts.
2. **Alcance de não-seguidores só sobe com gancho contrário, ou também com case-book (S3)?** Se S3 também escapar da bolha, prova social é motor de alcance — não só de conversão.
3. **DMs qualificadas vêm mais de post analítico (S1) ou de case social (S3)?** Redesenha a intenção de cada semana em setembro.
4. **Persona A, B ou C traciona mais?** Contar likes + salvos por persona dominante dos 16 posts e ver onde o algoritmo entrega melhor.
5. **A base de seguidores cresceu ou ficou parada?** Se cresceu <5% (541 → ~570) com 16 posts, orgânico puro é ineficaz para escala. Reabre gate paid.

### 1 hipótese estrutural a validar em setembro

> **"Reel curto (15-25s) com gancho contrário é o único formato que escapa da bolha de 541 seguidores organicamente. Todos os outros formatos servem para conversão (DM/salvos), não para alcance."**

Validação: setembro roda **5 Reels contrários vs. 5 outros formatos** (mesmo mês, mesma cadência). Se Reel-contrário ganhar em alcance de não-seguidores em ≥ 4/5 comparações pareadas, hipótese confirmada — setembro/outubro viram um mês de 60% Reels-contrários para tentar romper 1000 seguidores.

### Sinalização "matar / repetir / escalar" por formato

Regra objetiva aplicada no fechamento de 31/ago (para cada um dos 3 formatos: carrossel, Reel, feed):

- **Matar** (não usar mais em setembro): se o formato ficou ≥ 30% abaixo da meta em **≥ 3 dos 4 posts** do mês.
- **Repetir** (manter no mix): se ficou dentro de ±20% da meta na maioria (≥ 2/4).
- **Escalar** (aumentar peso em setembro): se superou a meta em ≥ 30% em **≥ 2 posts** e escapou da bolha (alcance não-seguidor ≥ 40%) em pelo menos 1 post.

Adicional específico: se **Reel-âncora bater as duas metas** (alcance não-seguidor + engajamento) em pelo menos 2 dos 4 Reels do mês, setembro dobra a cadência de Reel (de 4 para 8) mesmo mantendo 16 posts totais — reduz feed simples de 5 para 1.

---

## Fecho

Este plano é para **agosto**, base 541 seguidores, orgânico puro. Trocar cada uma dessas condições muda o desenho:
- Se a base dobrar → repriorizar salvos como métrica-norte de S2 também (bolha maior justifica mais afinidade e menos alcance-primeiro).
- Se o gate paid abrir → S2 vira teste de custo por alcance qualificado, não teste de escape orgânico.
- Se o site voltar → CTA e rastreio se reorganizam em cima de UTMs próprios; WhatsApp deixa de ser único canal atribuível.

Enquanto essas três condições persistirem, o plano acima é o teto do que dá para aprender com o que se tem.

---

*Gerado por Pheme via agente `growth-analyst` · plano de teste + métrica de agosto/2026 · 2026-07-15.*
