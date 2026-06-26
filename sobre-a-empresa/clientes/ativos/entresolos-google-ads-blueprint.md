---
cliente: "EntreSolos"
slug: "entresolos"
squad: "Peitho"
agente: "kasim-aslam"
documento: "Blueprint de Google Ads — pronto para implementar"
orcamento_mensal: "R$ 1.000,00"
status: "blueprint"
atualizado_em: "2026-06-25"
---

# Blueprint de Google Ads — EntreSolos

> Estratégia de Google Ads de alta conversão produzida pelo squad **Peitho** sob a metodologia do
> agente **Kasim Aslam** (Solutions 8 — *traffic-first*, "You vs. Google", 4 tipos de campanha,
> PMax por sinal de público, arquitetura de conversões secundárias).
>
> **Modo:** blueprint pronto para implementar. **Não há execução na conta neste documento** — o MCP
> oficial do Google Ads está com *developer token* pendente de aprovação; execução futura via Synter
> ou painel, sob aprovação explícita do Ronan (KPI inviolável do Peitho: zero execução sem ordem).
>
> **Fontes:** dossiê `entresolos.md` (§4 ICP, §5 keywords/concorrentes, §8 silos/URLs, §9.2
> performance Ads atual, §9.4 preço/geo) · `Peitho/agents/kasim-aslam.md` · `Peitho/tasks/create-ad-strategy.md`.
>
> 🔄 **Reconciliação com as contas ao vivo (2026-06-25):** a leitura first-party das contas conectadas
> mudou três premissas deste blueprint — ver [`entresolos-google-ads-config.md`](entresolos-google-ads-config.md):
> (1) o **apex está indexado e retorna 421** (cliques orgânicos caem em erro) — prioridade nº 1, acima
> do QS; (2) o **GA4 não coleta nada** desde 22/12/2025 → remarketing (§4.4) e import de conversões
> (§2.2) estão inviáveis até consertar; (3) os números de Ads do §9.2 do dossiê **não foram validados
> ao vivo** (token pendente). A lógica Kasim segue válida; o que muda é o tamanho da **Etapa 0
> (fundação)** — não dá para subir mídia sobre tracking morto e domínio quebrado.

---

## 1. Sumário executivo

**Objetivo:** gerar leads qualificados de sondagem SPT e perfuração de solo na RMBH, ao menor custo
por lead possível, dentro do raio geográfico rentável.

**O diagnóstico que define a estratégia (dossiê §9.2):** a conta já roda Search, mas com
**parcela de impressões de 12,77%**, perdendo **~28,94% das impressões por ranking**, e
**Quality Score 2–3** no núcleo. A causa não é falta de verba — é **experiência de página de destino
e CTR abaixo da média**. Ou seja: o gargalo é estrutura e qualidade, não dinheiro.

**A alavanca nº 1 é Quality Score, não verba.** Subir o QS de 2–3 para 6+ aumenta a parcela de
impressões e **baixa o CPC** sem gastar um real a mais. O blueprint inteiro é construído em torno disso:
cada grupo de anúncios casado com uma das **22 URLs de silo SEO que o cliente já tem publicadas**.

**Filosofia Kasim aplicada (em 3 frases):**
1. *Traffic-first* — a multidão furiosa já existe: ~5.300 buscas/mês no núcleo, CPC < R$ 3 (dossiê §5.1).
2. *You vs. Google* — começamos em lances manuais e match types apertados; só entregamos o controle ao
   Smart Bidding do Google **depois** que houver dados de conversão ("basicamente, o Google está chutando").
3. *Conversões secundárias importam* — arquitetura de conversão correta antes de subir verba; o ML do
   Google usa até as conversões em modo-observação para prever intenção.

**Metas (90 dias):** parcela de impressões no núcleo **12,77% → 40%+** · Quality Score **2–3 → 6+** ·
CPL alvo **R$ 30–60** · acompanhar lead→venda (ticket histórico R$ 1.464).

---

## 2. Fundação de conversão (pré-requisito — "ativar o que precisa ser ativado")

A conta hoje otimiza às cegas. **Nada de subir verba antes de medir conversão.** Montar:

### 2.1 Ações de conversão
**Primárias (contam para lance):**
| Ação | Gatilho | Valor sugerido |
|---|---|---|
| Clique no WhatsApp | clique em `wa.me/5531992238963` | **conversão principal** (canal dominante do cliente) — ímã de fundo de funil |
| Envio de formulário | submit do form do site (aba "Leads") | principal |
| Clique-para-ligar | clique no telefone/extensão de chamada | principal |

> ⚠️ **`/calculadora` fora do radar:** é uma calculadora de precificação **interna/de teste** (decisão
> do Ronon, 2026-06-25) — **não** rastrear conclusão/início como conversão nem usá-la como destino.

**Secundárias (modo observação — não contam para lance, mas alimentam o ML — princípio Kasim):**
- Scroll ≥ 75% ou tempo ≥ 60s em página de silo.
- Visualização de qualquer página `/orcamento`.

### 2.2 Stack técnico de medição — **estado real ao vivo (2026-06-25)**
> Verificado nas contas; IDs e diagnóstico em [`entresolos-google-ads-config.md`](entresolos-google-ads-config.md) §1–2.
- **Google Tag Manager** — container **`GTM-WWVXD9SF`** (conta `6329796007`). Hoje tem **só 1 tag**
  (conversão de Ads no envio de formulário). **Falta** criar: config GA4, clique no WhatsApp,
  clique-para-ligar. (`/calculadora` é teste interno — não rastrear.)
- **GA4** — property **`517179541`** (Measurement ID `G-X9B7XNQXZT`). 🔴 **Conectado mas NÃO coleta**
  (zero dados desde 22/12/2025). Pré-requisito: publicar a tag de config GA4 via GTM no domínio que
  serve (`www`) e validar em realtime **antes** de tudo.
- **Enhanced Conversions** — há trigger `enhanced_conversion` no GTM, mas sem GA4 medindo não há base.
- **Vínculo Google Ads ↔ GA4** — ativo, com **duas** contas de Ads vinculadas (`5690616260`,
  `4780377619`); confirmar a operacional antes de importar conversões.

### 2.3 Bloqueante de infra (alta prioridade — dossiê §11)
O apex `entresolo.com.br` (sem `www`) retorna **HTTP 421** ("DNS not configured" do Lovable) — só o
`www` responde. Implicação direta para Ads:
- **Todos os Final URLs e Display URLs devem usar `https://www.entresolo.com.br`.**
- Corrigir o redirect apex→www antes de escalar (senão parte do tráfego/QS se perde).

---

## 3. Segmentação geográfica (guardrail de lucratividade)

O modelo de preço por furo (dossiê §9.4) torna a geografia uma trava de ROI, não um detalhe:
R$ 700/furo até 100 km, R$ 1.000 até 200 km, e **>300 km exige ~R$ 1.750 só de deslocamento**. Lead
de fora do raio rentável **destrói a margem** — especialmente com verba pequena.

- **Localização-alvo:** raio de **~150 km de Vespasiano/MG**, cobrindo a RMBH e as cidades do
  livro-razão real: Belo Horizonte, Contagem, Betim, Nova Lima, Vespasiano, Lagoa Santa, Ribeirão das
  Neves, Sabará, Sete Lagoas, Brumadinho, Igarapé, São José da Lapa, Jaboticatubas.
- **Configuração crítica:** "**Presença:** pessoas na ou regularmente na área-alvo" — **nunca**
  "Presença ou interesse". Isso evita pagar por quem só pesquisa de fora.
- **Ajuste de lance por cidade:** opcional, +0–15% para as praças de maior ticket histórico.

---

## 4. Arquitetura de campanhas

### Onda 1 — ativa já com R$ 1.000/mês (~R$ 32,90/dia)

| # | Campanha | Tipo | Verba/mês | % | Papel |
|---|----------|------|-----------|---|-------|
| 1 | `ES · Search · Intenção-Núcleo` | Search | ~R$ 600 | 60% | Onde está o dinheiro |
| 2 | `ES · Smart · Perfil da Empresa` | Smart (GBP) | ~R$ 200 | 20% | Presença local / Maps |
| 3 | `ES · Search · Branded` | Search | ~R$ 80 | 8% | Proteção de marca |
| 4 | `ES · Remarketing leve` | Display | ~R$ 120 | 12% | Reengajar visitantes dos silos |

> **Trade-off declarado:** R$ 1.000/mês não comporta os 6 tipos rodando em volume. Espalhar a verba
> mata o aprendizado de todas. Por isso `Search · Concorrente` e `Performance Max` ficam na **Onda 2**
> (documentados e prontos, §4.5), ativados quando a verba subir para ≥ R$ 3.000/mês. PMax precisa de
> dados de conversão e ~R$ 50+/dia só para treinar — inviável como camada primária aqui.

---

### 4.1 Campanha 1 — `ES · Search · Intenção-Núcleo` (o motor)

**Verba:** ~R$ 600/mês (~R$ 20/dia) · **Objetivo:** leads · **Rede:** só Pesquisa (Display
desligado) · **Idioma:** Português · **Geo:** §3.

**Grupos de anúncios temáticos** (apertados = relevância máxima), cada um casado com sua URL de silo
(este é o conserto do Quality Score):

| Grupo de anúncios | Keywords-semente (match) | Landing page (silo já publicado) |
|---|---|---|
| **Sondagem de Solo** | `[sondagem de solo]` · `"sondagem do solo"` · `"empresa de sondagem de solo"` · `"sondagem de solo spt"` | `/mg/sondagem-de-solo/` |
| **Sondagem SPT** | `[sondagem spt]` · `"spt sondagem"` · `"sondagem a percussão"` · `[ensaio spt]` · `"sondagem spt"` | `/mg/sondagem-de-solo/o-que-e` |
| **Perfuração de Solo** | `[perfuração de solo]` · `"perfuração de solo spt"` · `"empresa de perfuração de solo"` | `/mg/perfuracao-de-solo/` |
| **Orçamento / Custo** (alta intenção) | `"sondagem de solo preço"` · `"sondagem spt valor"` · `"orçamento sondagem de solo"` · `"quanto custa sondagem de solo"` | `/mg/sondagem-de-solo/custos` |
| **Investigação Geotécnica / Laudo** | `"investigação geotécnica"` · `"laudo de sondagem"` · `"relatório de sondagem"` · `"laudo spt"` | `/mg/sondagem-de-solo/normas-tecnicas` |

**Match types:** começar em **frase + exata**. Verba pequena exige controle — ampla só depois, sob
Smart Bidding maduro. Cada keyword exata da semente também adicionada como frase para captar variações.

**Lista de palavras-chave negativas (compartilhada entre campanhas de Search):**
`curso` · `cursos` · `como fazer` · `passo a passo` · `apostila` · `pdf` · `emprego` · `vaga` ·
`vagas` · `salário` · `concurso` · `grátis` · `gratis` · `download` · `licenciamento ambiental` ·
`revista` · `aluguel de equipamento` · `alugar sonda` · `usado` · `trabalhe conosco`.
> Inclui os termos da **colisão de entidade** (dossiê §4): homônimas ambientais/editoriais disputam
> "EntreSolos" no Google — bloquear `revista` e `licenciamento ambiental` protege o orçamento.

**Estratégia de lance:**
1. **Fase 1 (semanas 1–4):** Maximizar cliques com **teto de CPC ~R$ 4** (ou CPC manual). Não entregar
   o controle ao Google sem dados — "o Google está chutando" (Kasim).
2. **Fase 2 (≥ 15–30 conversões acumuladas):** migrar para **Maximizar conversões** e, com volume
   estável, **tCPA** ancorado no CPL observado.

**Anúncios (RSA — 2 por grupo de anúncios):** até 15 títulos e 4 descrições. Fixar (pin) 1–2 títulos
com a **keyword exata do grupo** na posição 1 (eleva relevância e CTR esperado — dois dos três
componentes do Quality Score).

Banco de títulos (rotacionar/adaptar por grupo):
- `Sondagem SPT em [Cidade] — Laudo com ART`
- `Sondagem de Solo · 12 Anos de Experiência`
- `+1.000 Furos Executados em Minas Gerais`
- `Laudo Técnico ABNT NBR 6484`
- `Orçamento Rápido no WhatsApp`
- `Atendemos Toda a RMBH`
- `Aprovação na Prefeitura Garantida`
- `Evite Fundação Super/Subdimensionada`
- `Sondagem à Percussão (SPT)`
- `Perfis de Solo + Gráficos SPT`

Banco de descrições:
- `Especialistas em SPT com 12 anos e +1.000 furos. Laudo completo com ART e conformidade ABNT NBR 6484.`
- `Segurança estrutural e economia na obra. Atendimento ágil em toda a Região Metropolitana de BH.`
- `Receba seu orçamento de sondagem de solo pelo WhatsApp. Relatório técnico para o seu calculista.`
- `Da residência ao galpão industrial: investigação geotécnica que sua obra precisa. Fale conosco.`

**Extensões / assets:**
- **Sitelinks:** Orçamento (`/mg/sondagem-de-solo/orcamento`) · Custos (`/mg/sondagem-de-solo/custos`) ·
  Normas & ART (`/mg/sondagem-de-solo/normas-tecnicas`) · Estudos de caso (`/mg/sondagem-de-solo/estudos-de-caso`).
- **Frases de destaque:** `Laudo com ART` · `ABNT NBR 6484` · `12 anos de experiência` ·
  `+1.000 furos` · `Atende RMBH` · `Orçamento sem compromisso`.
- **Snippets estruturados:** Serviços → Sondagem SPT, Perfuração, Investigação geotécnica, Laudo técnico.
- **Extensão de chamada:** (31) 99223-8963.
- **Extensão de local:** vinculada ao GBP verificado (§4.2).
- **Extensão de formulário de lead** (se disponível na conta).

---

### 4.2 Campanha 2 — `ES · Smart · Perfil da Empresa` (a Smart do Google Meu Negócio)

GBP **verificado e ativo** (confirmado pelo Ronan) → a Smart campaign roda direto sobre ele.

**Verba:** ~R$ 200/mês · **Meta:** ações locais — ligações, mensagens e rotas (direções no Maps).

- **Temas de palavra-chave** (a Smart usa temas, não keywords individuais): "sondagem de solo",
  "sondagem SPT", "perfuração de solo", "investigação geotécnica", + nomes das cidades-núcleo.
- **Texto do anúncio:** 3 variações de título + descrição reusando as provas — `12 anos · +1.000 furos`,
  `Laudo com ART · NBR 6484`, `Atende toda a RMBH`.
- **Raio:** mesmo guardrail geográfico (~150 km de Vespasiano).
- **Destino:** `https://www.entresolo.com.br` (ou número/Maps, conforme a meta).

**Honestidade sobre a Smart (Kasim — "You vs. Google"):** é uma campanha de **controle limitado**
(o Google decide quase tudo) e **pode sobrepor** à campanha de Search no leilão. Por isso:
- Manter a verba **separada** e em ~20% — não deixar a Smart competir com o núcleo pelo mesmo clique.
- Monitorar relatório de termos de busca para detectar canibalização.
- O ganho real e legítimo da Smart aqui é **presença no Maps / pacote local** e captura de quem busca
  "sondagem perto de mim" — não substitui a campanha de Search, complementa.

**Alavanca gratuita amarrada à Smart:** ativar um processo sistemático de **reviews no Google** usando
o **programa de indicação que o cliente já opera** (dossiê §9.1 — comissão R$ 200 por indicação).
Reviews elevam o desempenho da Smart **e** o ranqueamento no pacote local, sem custo de mídia.

---

### 4.3 Campanha 3 — `ES · Search · Branded` (seguro barato)

**Verba:** ~R$ 80/mês · **Tipo:** Search · **Geo:** §3.

- **Keywords (exata + frase):** `[entresolos]` · `[entresolo]` · `"entre solos sondagem"` ·
  `"entresolos sondagem"` · `"entresolos vespasiano"`.
- **Por quê:** CPC de marca é baixíssimo; protege contra (a) a **colisão de nome** com homônimas
  ambientais/editoriais (dossiê §4) e (b) concorrente comprando a marca do cliente. Garante que quem
  busca "EntreSolos" cai na empresa certa, no topo, barato.
- **Anúncio:** RSA simples com a proposta de valor + sitelink para Orçamento e WhatsApp.

---

### 4.4 Campanha 4 — `ES · Remarketing leve` (reengajamento)

**Verba:** ~R$ 120/mês · **Tipo:** Display responsivo · **Geo:** §3.

- **Públicos (via GA4):** visitantes dos silos `/mg/sondagem-de-solo/*` e `/mg/perfuracao-de-solo/*`;
  visitantes de `/orcamento` e `/mg/sondagem-de-solo/custos` (alta intenção) que não converteram.
- **Criativo:** Display responsivo com a identidade de marca — logos azul/dourado em
  `_assets/entresolos/`, cor de marca `#2A4265`. Mensagem de reforço: "Seu orçamento de sondagem em
  minutos — fale no WhatsApp".
- **Papel:** camada *always-on* de baixo custo que recupera quem já demonstrou intenção. Não é
  prospecção — é fechamento.

---

### 4.5 Onda 2 — documentada e pronta, ativar ao escalar (≥ R$ 3.000/mês)

**`ES · Search · Concorrente`** (mira nos termos de marca dos concorrentes — dossiê §5.2):
- Keywords (frase): `"geosys sondagem"`, `"inside sondagem"`, `"sonda terra"`, `"rutra sondagem"`,
  `"furassolo"`, `"bs engenharia sondagem"`.
- Anúncio comparativo honesto (sem citar a marca no texto — política do Google): "12 anos · +1.000
  furos · Laudo com ART". Landing: `/mg/sondagem-de-solo/`.
- **Por que fase 2:** baixo volume e canibaliza verba pequena. Vale quando há folga de orçamento.

**`ES · Performance Max`** (método Kasim — **1 asset group por sinal de público**, contrariando a
consolidação que o Google recomenda):
- Asset group A — **Não-convertedores** (visitantes dos silos e de páginas de custo/orçamento).
- Asset group B — **Convertedores** (leads/clientes anteriores como base de semelhantes).
- Asset group C — **Segmento personalizado** a partir de keywords de concorrente + termos de alta intenção.
- Assets: até 15 títulos, 5 descrições, 20 imagens (logos + fotos de campo do relatório exemplo), vídeos
  se houver. Monitorar **relatório de posicionamento** e excluir canais ruins.
- **Por que fase 2:** PMax precisa de **dados de conversão** para treinar e de **~R$ 50+/dia**; abaixo
  disso ele "chuta" e queima verba (uma das causas de falha que o próprio Kasim lista).

---

## 5. Orçamento & KPIs

### Alocação (soma = R$ 1.000/mês)
| Campanha | % | Mês | Dia | CPA/meta |
|---|---|---|---|---|
| Search · Intenção-Núcleo | 60% | R$ 600 | ~R$ 20 | CPL R$ 30–60 |
| Smart · Perfil da Empresa | 20% | R$ 200 | ~R$ 6,60 | ligações/rotas locais |
| Search · Branded | 8% | R$ 80 | ~R$ 2,60 | CPL < R$ 15 |
| Remarketing leve | 12% | R$ 120 | ~R$ 4 | reengajamento |
| **Total** | **100%** | **R$ 1.000** | **~R$ 33** | — |

### Projeção (ordem de grandeza, não promessa)
A ~R$ 33/dia e CPC médio R$ 3–4 ⇒ **~250–330 cliques/mês**. A 5–10% de conversão em LP dedicada ⇒
**~12–25 leads/mês**. Com ticket médio R$ 1.464 e o fechamento histórico forte do cliente, **poucos
serviços já cobrem a mídia** — a matemática favorece o canal assim que o QS subir.

### Metas por etapa
| Métrica | Topo (descoberta) | Fundo (intenção/conversão) |
|---|---|---|
| Parcela de impressões (núcleo) | — | 12,77% → **40%+** |
| Quality Score | — | 2–3 → **6+** |
| CTR | ≥ 4% | ≥ 8% (branded ≥ 15%) |
| CPL | — | **R$ 30–60** |
| Taxa de conversão da LP | — | 5–10% |

> Benchmarks ancorados no Keyword Planner **real do cliente** (dossiê §5.1) e na performance atual da
> conta (§9.2), não em médias genéricas de mercado.

---

## 6. Cronograma de otimização (90 dias)

| Janela | Ação | Critério |
|---|---|---|
| **Semana 0** | Fundação de conversão (§2) + redirect apex→www + montar as 4 campanhas | Tracking validado antes de gastar |
| **Dias 1–7** | Deixar aprender. **Não mexer.** Validar termos de busca, popular negativas | Não matar nada na fase de aprendizado (veto Kasim) |
| **Semanas 2–4** | Podar termos ruins, reforçar RSAs vencedores, melhorar LP de menor QS | Subir QS antes de subir verba |
| **Mês 2** | Com ≥15–30 conversões → migrar para Maximizar conversões/tCPA; revisar Smart vs Search (canibalização) | Dados suficientes para Smart Bidding |
| **Mês 3** | Se a verba escalar, ativar Onda 2 (Concorrente + PMax por sinal) | Parcela de impressões núcleo > 60% e CPL estável |

---

## 7. Plano de escala (curva de sino — Kasim)

| Gatilho | Método | Aumento |
|---|---|---|
| Parcela de impressões núcleo > 60% **e** CPL estável | Subir verba do Search-Núcleo | +30–50% |
| Verba mensal ≥ R$ 3.000 | Ativar `Search · Concorrente` | +R$ 300–500 |
| ≥ 30 conversões/mês acumuladas **e** verba ≥ R$ 50/dia disponível | Ativar `Performance Max` por sinal | +R$ 1.500+ |
| CPL no alvo e demanda de núcleo saturada | Expandir geografia (até 200 km, respeitando o preço/furo) | conforme margem |

> "**Retornos decrescentes ainda são retornos**" — não abandonar o canal cedo. Aceitar CPL marginal
> maior enquanto o lucro absoluto crescer.

---

## 8. Apêndice — ativações técnicas necessárias (checklist de implementação)

- [x] ~~GTM: tag de conversão de Ads no envio de formulário~~ — **já existe** (trigger Form Submit).
- [ ] 🔴 **Corrigir o apex** (`entresolo.com.br` → 421, indexado pelo Google) — domínio canônico para o `www` que serve. **Bloqueia SEO e tracking.**
- [ ] 🔴 **Fazer o GA4 coletar** — publicar tag de config GA4 (`G-X9B7XNQXZT`) via GTM no `www`; validar sessões em realtime. **Pré-requisito de remarketing e conversões.**
- [ ] GTM: tags de evento para **WhatsApp** e **clique-para-ligar** (formulário já tem; calculadora é teste interno — fora).
- [ ] GA4: marcar as conversões-chave e importá-las para o Google Ads (após GA4 coletar).
- [ ] Confirmar a **conta de Ads operacional** (`5690616260` vs `4780377619`) + documentar MCC.
- [ ] **Developer token** do Google Ads aprovado → reconectar MCP oficial (destrava validação do §9.2 e execução via MCP).
- [ ] Enhanced Conversions ligado na conta de Ads.
- [ ] GBP verificado vinculado à conta de Ads (extensão de local + Smart).
- [ ] Lista de negativas compartilhada criada e aplicada às campanhas de Search.
- [ ] Públicos de remarketing criados no GA4 (visitantes de silo, páginas de custo/orçamento sem conversão) — **depende de GA4 coletando**.

**Sobre execução:** o MCP oficial do Google Ads está **bloqueado por developer token pendente**
(`sobre-a-empresa/Ferramentas/GoogleAds/ferramentas.md`). Quando o token for aprovado, a montagem pode
ser automatizada via MCP; até lá, alternativas são **Synter** (MCP conectado) ou o painel do Google
Ads — **sempre sob aprovação explícita do Ronan** antes de qualquer publicação (KPI Peitho: zero
execução sem ordem).

---

## 9. Conformidade com a metodologia (auto-checagem)

- ✅ 4 tipos de campanha de Kasim cobertos (branded, concorrente, intenção, remarketing) + Smart + PMax.
- ✅ *Traffic-first*: demanda real mapeada antes da estrutura (5.300 buscas/mês, CPC < R$ 3).
- ✅ Arquitetura de conversão (primárias + secundárias em observação) **antes** de escalar verba.
- ✅ PMax por sinal de público (não consolidado) — fase 2.
- ✅ Não entregar Smart Bidding ao Google sem dados ("Google is guessing").
- ✅ Veto respeitado: plano de fase de aprendizado; verba não 100% em fundo de funil; KPIs ancorados em
  benchmark real; sem recomendar plataforma onde o público não está.
- ✅ Cada grupo de anúncios mapeado a uma LP dedicada (conserto de Quality Score).
