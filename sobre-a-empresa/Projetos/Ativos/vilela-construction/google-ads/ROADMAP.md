# Roadmap Google Ads — Vilela Construction

> **Origem:** `@Hermes` roteando pedido do Ronan para o squad **Peitho** (tráfego pago).
> **Data:** 2026-07-09 (retificado geografia às 20:15 após reconciliação com `dossie.md`)
> **Contrato de Missão:** `Olimpo/contratos/missoes/m-20260709-google-ads-vilela.yaml`
> **Missão:** construir o canal de aquisição Google Ads da Vilela Construction — roadmap completo + campanhas montadas pelo Peitho em paralelo.

> ⚠️ **RETIFICAÇÃO GEOGRAFIA (2026-07-09 20:15):** o rascunho inicial deste roadmap usou "Kennesaw, GA + Greater Atlanta" herdado do laudo Peitho 01/07 (que espelhou a landing atual `vilela-bright-space`). O `dossie.md` unificado de 09/07 (Argos rodada 3 com Ronan) confirmou a fonte-de-verdade: **operação real é Massachusetts + Southern New Hampshire**. A landing GA é resíduo do template Lovable sendo corrigido pelo Ronan em paralelo. Toda a estratégia, arquitetura, keywords, copy e naming devem refletir MA+NH. Squad Peitho já entregou artefatos com a geografia correta; Caliope retificou headlines em rodada 2.

> **Budget confirmado (2026-07-09):**
> - **Google Ads:** USD 300/mês
> - **Meta Ads:** USD 700/mês (fica com o restante do contrato de USD 1.000/mês de mídia)
> - **Total mídia:** USD 1.000/mês (contrato original mantido, split entre canais)

---

## 0. Decisões tomadas na abertura (2026-07-09)

| # | Decisão | Escolha do Ronan |
|---|---|---|
| **D1** | Split de budget entre Google e Meta | Google USD 300/mês · Meta USD 700/mês |
| **D2** | Onde persistir gclid + registrar leads | **GHL sombra da Kolden** (location `1Jo7tMynqRtbpB3GHuOd`) |
| **D3** | Teste A/B da LP | **Pausar A/B, 100% do tráfego Google → LP Kolden nova** |
| **D4** | Meta Ads durante Onda 1 | **Instrumentar Meta em paralelo com Google** (frente 2 do pixel-specialist) |

**⚠️ Consequência da D2 — bloqueio jurídico:** o laudo Peitho de 01/07 §8 documentou três riscos ao hospedar leads Vilela em location Kolden sem consentimento contratual:
1. Possível violação de TOS do GHL sobre multi-tenancy (dados de clientes distintos em location única).
2. Ambiguidade de propriedade dos dados em eventual encerramento de contrato (Kolden vs Vilela).
3. Exposição LGPD/CCPA se leads não são informados de onde vivem seus dados.

**Mitigação obrigatória antes de ativar Camada 2 (D+7):** ver `clausula-ghl-sombra-thiago.md` — texto pronto para check-in escrito com Thiago. Se recusado → fallback automático Google Sheets.

---

## 1. Contexto

**Por que este plano existe.** A Vilela Construction (Massachusetts + Southern New Hampshire — Greater Boston metro + NH border towns) contratou a Kolden para gestão de mídia paga (contrato assinado: USD 800/mês agência + USD 1.000/mês mídia, 6 meses). Google Ads foi ativado em teste A/B junto com Meta Ads em 12/06/2026, mas **sem rastreamento de conversão instrumentado** — violação do veto Peitho `sem_pixel_e_rastreio`. Bernardo Kolden vem otimizando keywords manualmente há ~4 semanas em cegueira de atribuição.

**O que muda agora.** Consolida em uma missão única: (a) diagnóstico de tracking pendente de 01/07, (b) laudo Peitho com 4 perguntas em aberto, (c) landing page com 9 gaps críticos, (d) 30 dias de conta rodando cega.

**Janela sazonal.** Cliente atende maio–novembro (público sênior migra para Flórida no inverno). Restam ~4 meses de janela quente. Cada semana sem tag instrumentada = ~USD 250 queimados em otimização cega.

**Resultado esperado.**
1. Roadmap escrito na pasta do projeto que o Ronan lê e entende tudo em uma leitura.
2. 3 campanhas Google Ads no ar (Brand + Non-brand Kitchen/Bathroom + Remarketing) com Conversion Action rastreando o form.
3. Landing com telefone real, testimonials reais e captura de gclid.
4. Peitho operando com governance mensal (relatório semanal + auditoria em D+30).

---

## 2. Estado do cliente — síntese operável

### Cliente
| Campo | Valor |
|---|---|
| Nome | Vilela Construction Inc. |
| Decisor | Thiago Araujo |
| Geografia primária | Greater Boston, MA (Middlesex, Essex, Suffolk core) |
| Geografia secundária | Southern New Hampshire (Rockingham, Hillsborough — Manchester, Nashua, Salem) |
| Exclusões | Quincy, Brookline (histórico ruim de trânsito segundo dossiê) |
| ICP | Homeowners 30–65 anos, foco 50+, single-family homes |
| Sazonalidade | Ativo maio–novembro; pausa dez–abril (público idoso migra p/ Flórida) |
| Modelo | B2C, high-ticket residential remodeling |
| Ticket por projeto | Kitchen $30k–$65k · Master Bath $12k–$40k · Basement $50k–$70k · Deck $45–120/SF |
| Fonte de receita hoje | 100% indicação — sem canal digital gerando |
| ⚠️ Landing atual | Menciona "Kennesaw, GA" — resíduo do template Lovable, sendo corrigido pelo Ronan em paralelo |

### Diferencial declarado (voz do cliente)
1. **Unmatched Cleanliness** — limpeza do canteiro ao final de cada dia
2. **Transparent Communication** — sem custos ocultos, sem atrasos inesperados
3. **Dedicated Craftsmanship** — não cortamos cantos

### Site & tracking (`vilela-bright-space`)
| Item | Estado |
|---|---|
| URL A (institucional antigo) | ⚠️ não documentada — Bernardo tem no WhatsApp |
| URL B (LP Kolden nova) | ⚠️ não documentada — provavelmente `*.lovable.app/*` |
| Form | GHL iframe `NPkCo9JhSx7016RFCJd0` |
| GTM container | `GTM-NG8LP66S` instalado |
| Google Ads conversion tag (`AW-`) | ❌ AUSENTE |
| gclid persistido (cookie + hidden field) | ❌ AUSENTE |
| Enhanced Conversions for Leads | ❌ AUSENTE |
| GA4 | ⚠️ status desconhecido |
| Meta Pixel | ❌ AUSENTE (Meta Ads roda cego há 4 semanas) |
| Telefone (`/thank-you`) | ❌ PLACEHOLDER `+1 770-555-1234` |
| Testimonials | ❌ 3 placeholders "Enter a powerful testimonial here…" (risco FTC) |
| og:image | ❌ aponta pra Lovable R2 (não branded) |
| Gallery before/after | ⚠️ só Kitchen + Bathroom (faltam Flooring, Painting) |

### Contas & credenciais
- **Google Ads:** Bernardo Kolden tem acesso e otimiza diariamente. ID da conta a documentar em `arquitetura-de-conta.yaml`.
- **Google Ads MCP:** ❌ bloqueado até developer token aprovado (pendência antiga). Auditoria via UI.
- **Meta Ads:** Bernardo/Andre têm acesso (~5 leads em 12/06 cegos).
- **GHL:** location Kolden `1Jo7tMynqRtbpB3GHuOd` (sombra) — CRM próprio da Vilela rejeitado no contrato até mês 3.

---

## 3. Estratégia de campanha — arquitetura recomendada

### 3.1. Princípio
Budget confirmado USD 300/mês só para Google (Meta paralelo com USD 700/mês) + ticket alto ($30k–$65k) + ciclo de decisão longo = **Search dominante, PMax fora, sem Display/YouTube no início**. Otimizar por **quantidade e qualidade de leads**, não por conversão direta. Provar unit economics em 30d antes de qualquer aumento.

**Aritmética base — USD 300/mês:**
- CPC médio benchmark construção Atlanta: USD 4–8 → ~40–75 clicks/mês
- CVR meta 4% → ~2–3 leads/mês em cenário conservador
- LTV por lead: USD 4.800 (60k × 40% margem × 20% fechamento) — recalibrar D+30
- **Break-even:** 1 lead fechado a cada ~16 meses de gasto justifica o canal. Meta real: ≥1 lead/mês fechado em D+90.
- **Implicação:** budget não escala com PMax nem Display. Search puro, foco em keywords transacionais alto-intent.

### 3.2. Arquitetura da conta
Três campanhas Search para começar (segue skill **`arquitetura-enterprise-ppc`**), calibrado para USD 300/mês:

| Campanha | Tipo | Split | USD/mês | Objetivo | Match types |
|---|---|---|---|---|---|
| **US_Brand_All_All_v1** | Search | 10% | 30 | Proteger "vilela construction" + capturar quem já conhece a marca | Exact + Phrase |
| **US_Nonbrand_Kitchen_TOFU_v1** | Search | 50% | 150 | Capturar demanda transacional Greater Boston + Southern NH | Phrase (SKAG moderno) |
| **US_Nonbrand_Bathroom_TOFU_v1** | Search | 30% | 90 | Idem para banheiros — segundo maior ticket | Phrase |
| **US_Remkt_All_LP-view_v1** | Display (remarketing) | 10% | 30 | Puxar site visitors de volta ao form durante ciclo 30–60d | Audience |

**Nota sobre Remarketing:** USD 30/mês é budget mínimo viável para Display. Se em D+7 audience de site visitors < 100 pessoas, pausar Remarketing e realocar para Non-brand Kitchen.

**PMax fica FORA da primeira onda.** Motivos: (i) volume de conversões insuficiente para o algoritmo aprender ($300/mês ≈ 1–6 conversões/mês); (ii) sem creative library com vídeo ainda; (iii) risco de PMax canibalizar Brand e mascarar performance real. Reavaliar quando houver ≥15 conversões/mês.

### 3.3. Geolocalização (retificado)
- **Include primário (bid +20%):** Greater Boston metro (Middlesex, Essex, Suffolk core — Boston, Cambridge, Somerville, Everett, Woburn, Winchester, Medford, Waltham, Newton)
- **Include secundário (bid neutro):** Northern MA (North Shore, Merrimack Valley — Lawrence, Lowell, Haverhill) + Southern NH (Manchester, Nashua, Salem, Derry)
- **Exclude explícito:** Quincy, Brookline (histórico ruim de trânsito segundo dossiê)
- **Exclude EUA fora MA/NH:** Kennesaw/GA e demais estados são exclusão automática (a landing GA é resíduo de template Lovable, não operação real)

### 3.4. Ad groups por campanha (SKAG moderno — grupos temáticos, não uma keyword por grupo)

**Kitchen (US_Nonbrand_Kitchen_TOFU_v1):**
- `AG_Kitchen_Remodel` — "kitchen remodel", "kitchen renovation" + variações
- `AG_Kitchen_Contractor` — "kitchen contractor", "kitchen remodeler near me"
- `AG_Kitchen_Cost` — "kitchen remodel cost", "how much does a kitchen renovation cost"

**Bathroom (US_Nonbrand_Bathroom_TOFU_v1):**
- `AG_Bathroom_Remodel` — "bathroom remodel", "bathroom renovation"
- `AG_Bathroom_Master` — "master bathroom remodel" (segmenta pro ticket premium $40k)
- `AG_Bathroom_Custom_Shower` — "custom shower installation", "walk in shower remodel"

### 3.5. Copy do anúncio (RSA)
Cada ad group recebe 1 RSA seguindo blueprint em **`criativo-como-hipotese-rsa-pmax`**:

- **15 headlines** distribuídas: 3 marca+oferta / 3 keyword-driven / 3 benefício / 2 prova social / 2 urgência / 2 diferenciação
- **4 descriptions** ancoradas nos 3 diferenciais Vilela (limpeza, comunicação transparente, dedicated craftsmanship) + CTA "Free Estimate"
- **Pin strategy calibrada:** Position 1 pinada com ancoragem geográfica ("Kitchen Remodel Kennesaw, GA"); Position 2 pinada com diferencial + CTA; Position 3 rotativa

Copy escrita via handoff **Caliope/anuncio-por-estagio-de-consciencia** — TOFU (problema-aware) para Non-brand, BOFU (solution-aware) para Remarketing.

### 3.6. Extensions (assets)
- **Sitelinks** (4 mínimo): Free Estimate · Kitchen · Bathroom · Portfolio
- **Callouts:** Licensed & Insured · Free In-Home Consultation · Serving Boston Metro & NH · 25+ Years Experience (⚠️ B1 pendente)
- **Structured snippets:** Services = Kitchen, Bathroom, Basement, Flooring, Painting
- **Call extension:** telefone real (bloqueio B2)
- **Lead form extension:** OPCIONAL — só ativa após form da LP ter tag disparando

### 3.7. Keywords & negativas
- **Keyword research:** ~40–60 keywords iniciais, foco intent transacional
- **Negative list padrão:** free, diy, jobs, hiring, apprentice, salary, school, tutorial, youtube, complaint, lawsuit, reviews reddit, cheap
- **Negative list dinâmica:** revisar SQR semanalmente nas primeiras 4 semanas — cada query com CTR<0.5% ou CVR<1% vira negativa

### 3.8. Bidding
- **Semanas 1–2 (learning):** Manual CPC ou Maximize Clicks com cap de CPC
- **Semanas 3–4:** transição para **tCPA** com target USD 60 (benchmark local service construção). Requer ≥15 conversões nas últimas 30d
- **Bid adjustments:** +20% em Greater Boston core, neutro em Northern MA + Southern NH, +15% em mobile (público sênior em mobile alto)

### 3.9. Conversion Actions & valor
- **Primary:** `Vilela_Lead_Form` — categoria *Submit lead form*, contagem *One*, janela 90d post-click / 1d post-view
- **Valor por lead:** `USD 4.800` provisório `[BENCHMARK]` = 60k ticket × 40% margem × 20% fechamento. Recalibrar em D+30
- **Dinâmico via hidden field `service_selected`:** basement $4.800 · kitchen premium $5.200 · bathroom $2.400 · flooring $960 · painting $400
- **Secondary:** `Vilela_Phone_Call` — categoria *Phone call lead* — ativar quando telefone real estiver na LP

Ver `conversion-actions.md` para spec técnica completa das 3 camadas (client-side + OCI via gclid + Enhanced Conversions).

---

## 4. Roadmap em ondas

### Onda 0 — Destravamento (D+0 a D+3) 🔴
| # | Entregável | Responsável | Dependência |
|---|---|---|---|
| 0.1 | ✅ Ronan respondeu D1–D4 (§0) | Ronan | ✅ FEITO 2026-07-09 |
| 0.2 | Thiago fornece: taxa histórica de fechamento + margem bruta + telefone real | Bernardo/Julio pede | — |
| 0.3 | Documentar no repo: ID conta Google Ads, URL da LP Kolden, container GTM confirmar | Bernardo Kolden | — |
| 0.4 | **Cláusula GHL sombra em check-in escrito com Thiago** (`clausula-ghl-sombra-thiago.md`) | Julio + Ronan | ⚠️ bloqueia Camada 2 |
| 0.5 | Pausar URL A do teste A/B — redirecionar 100% para LP Kolden | Bernardo Kolden | — |

### Onda 1 — Instrumentação (D+3 a D+7) 🔴

**Frente A — Google Ads (pixel-specialist principal):**
| # | Entregável | Squad/Agente |
|---|---|---|
| 1.1 | Criar Conversion Action `Vilela_Lead_Form` no Google Ads | Peitho / kasim-aslam + pixel-specialist |
| 1.2 | Instalar tag `AW-` no GTM `GTM-NG8LP66S`, trigger form submit LP | Peitho / pixel-specialist |
| 1.3 | Snippet JS na LP: captura `?gclid=` → cookie 30d → hidden field | Peitho / pixel-specialist + Harmonia |
| 1.4 | Custom field `gclid` na location GHL Kolden `1Jo7tMynqRtbpB3GHuOd` | Peitho / pixel-specialist |
| 1.5 | Workflow GHL "Contact Created" com HTTP action ecoando p/ Google Sheets | Peitho / pixel-specialist |
| 1.6 | Ativar Enhanced Conversions for Leads (email + phone) | Peitho / pixel-specialist |
| 1.7 | Consent Mode v2 (banner discreto opt-in) com aviso GHL | Peitho / pixel-specialist + Harmonia |
| 1.8 | QA end-to-end Google: submit real → conversão aparece em <3h | Peitho / pixel-specialist |

**Frente B — Meta Ads em paralelo:**
| # | Entregável | Squad/Agente |
|---|---|---|
| 1.9 | Diagnóstico Meta Pixel/CAPI Vilela | Peitho / pixel-specialist |
| 1.10 | Instalar Meta Pixel na LP + configurar Conversions API server-side | Peitho / pixel-specialist |
| 1.11 | Eventos padrão + custom: `Lead`, `SubmitApplication`, `ViewContent` | Peitho / pixel-specialist |
| 1.12 | QA end-to-end Meta: submit real → evento em <3h + Match Quality ≥ 6/10 | Peitho / pixel-specialist |

**Priorização se pixel-specialist saturar:** Frente A tem prioridade. Se D+7 escorregar, entregar Frente A + Frente B nos itens 1.9–1.10 (pixel base) e adiar 1.11–1.12 para D+10.

### Onda 2 — LP profissional (D+3 a D+10, paralelo com Onda 1)
| # | Entregável | Squad/Agente |
|---|---|---|
| 2.1 | Substituir telefone placeholder pelo real | Harmonia |
| 2.2 | Coletar 3 depoimentos reais com Thiago + substituir placeholders | Aletheia (roteiro) + Caliope (edit) |
| 2.3 | og:image branded Vilela (não Lovable) | Aglaia + Harmonia |
| 2.4 | Adicionar 2 pares before/after (Flooring, Painting) na gallery | Aglaia + Harmonia |
| 2.5 | Popular FAQ (5–7 objeções: prazo, garantia, seguro, móveis, limpeza) | Caliope / `estrutura-de-pagina-de-vendas` |
| 2.6 | Adicionar hidden field `service_selected` + `gclid` no form | Harmonia |

Ver `landing-page-fixes-2026-07.md` para checklist Harmonia detalhado.

### Onda 3 — Lançamento (D+7 a D+10)
Workflow Peitho **`*campaign-launch`** — 5 phases:

| Phase | Agente | Entregável |
|---|---|---|
| Phase 0 — Estratégia | traffic-chief + kasim-aslam | `estrategia-vilela-2026-07.md` + orçamento + KPIs + veto de teto |
| Phase 1 — Criativo | ad-midas → Caliope (copy) → Aglaia (visual Remarketing) | 15 headlines × 4 descriptions × 4 sitelinks × 4 callouts por campanha; banners Remarketing 300×250, 728×90, 160×600 |
| Phase 2 — Tracking | pixel-specialist | ✅ concluído na Onda 1 — verificação apenas |
| Phase 3 — Launch | traffic-chief + media-buyer | Campanhas montadas + auto-tagging + monitoring 48h |
| Phase 4 — Otimizar D+7 | performance-analyst | Relatório: CTR, CPC, CVR, Quality Score, SQR review, 50–100 negativas incorporadas |

### Onda 4 — Otimização contínua (D+10 até novembro)
- **Cadência semanal:** performance-analyst gera relatório sexta 15h Boston. Alertas via WhatsApp Evolution API.
- **Auditoria D+30:** ads-analyst roda skill `auditoria-forense-200-checkpoints`.
- **Recalibração D+30:** kasim-aslam recalibra valor de conversão com dados reais.
- **Escala vertical D+45:** se CPA < USD 75 e volume ≥ 15 leads/mês, scale-optimizer propõe aumento faseado.
- **PMax possibly D+60:** se ≥15 conversões/mês, considerar PMax com asset groups por tema.
- **Pausa sazonal:** dezembro–abril, congelar campanhas, manter só Brand.

---

## 5. Verificação — gates

### Gate D+3 (fim da Onda 0)
- [x] Ronan respondeu D1–D4
- [ ] Telefone real do Thiago em mãos
- [ ] Taxa de fechamento + margem bruta em mãos (ou `[BENCHMARK]` explícito)
- [ ] ID da conta Google Ads registrado em `arquitetura-de-conta.yaml`

### Gate D+7 (fim das Ondas 1 e 2)
- [ ] Test-lead submetido na LP → conversão aparece no Ads em <3h
- [ ] Enhanced Conversions match rate ≥ 40% (aceita) / ideal ≥ 70% em D+14
- [ ] gclid persistindo em cookie + hidden field (DevTools)
- [ ] Meta Pixel espelhado no mesmo trigger
- [ ] LP com telefone real + 3 testimonials reais + og:image branded

### Gate D+10 (fim da Onda 3 — Lançamento)
- [ ] 3 campanhas no ar, gastando ≥ USD 5/dia cada
- [ ] Auto-tagging ligado (gclid chega no form)
- [ ] Primeiros 3 leads registrados
- [ ] Bernardo confirma acesso ao painel + dashboard base

### Gate D+30 (fim da Onda 4 primeira iteração)
- [ ] Auditoria 200-checkpoints com health score ≥ 70
- [ ] CPA real < USD 100 (aceitável) / ideal < USD 75
- [ ] ≥ 10 leads qualificados
- [ ] Valor de conversão recalibrado com dados reais
- [ ] Relatório mensal para Thiago com 3 decisões: manter / ajustar mix / escalar

### Test end-to-end da instrumentação
```
1. Abrir Chrome anônimo
2. Ir para URL LP com ?gclid=TEST123 na query
3. Abrir DevTools → Application → Cookies → verificar cookie `_gcl_aw` com TEST123
4. Preencher form → submit
5. Em Ads → Tools → Conversions → Diagnostics: conversão TEST em <3h
6. Verificar Enhanced Conversions status: OK
7. Verificar Consent Mode v2 tags fired: OK
```

---

## 6. Bloqueios remanescentes

| # | Bloqueio | Quem resolve | Prazo | Fallback se travar |
|---|---|---|---|---|
| B1 | Taxa histórica de fechamento + margem bruta | Bernardo/Julio → Thiago | D+3 | Valor Conversion Action `USD 4.800 [BENCHMARK]`, reavaliar D+30 |
| B2 | Telefone real do Thiago | Bernardo/Julio → Thiago | D+3 | Call extension e link telefone da LP desativados |
| B3 | 3 depoimentos reais | Aletheia + Caliope | D+7 | Remover seção testimonials da LP (risco FTC) |
| B4 | ID da conta Google Ads | Bernardo Kolden | D+1 | Bloqueia início Onda 1 |
| B5 | URL final da LP Kolden + acesso repo `vilela-bright-space` para Harmonia | Bernardo Kolden | D+1 | Bloqueia Onda 2 |
| B6 | Cláusula GHL sombra assinada por Thiago | Ronan + Julio | D+5 | Fallback Google Sheets (Camada 2 alternativa) |
| B7 | Google Ads MCP developer token | Ronan em Ads Manager | quando puder | Auditoria D+30 via UI (mais lenta) |

Ver `perguntas-para-thiago.md` para o texto pronto de B1 + B2 + B3.

---

## 7. O que NÃO faz parte deste plano (explícito)

- ❌ Ativar CRM próprio da Vilela (fora do contrato até out/2026)
- ❌ SEO orgânico (fora do contrato)
- ❌ Social media orgânico (fora do contrato)
- ❌ PMax na primeira onda (reavaliar em D+60)
- ❌ YouTube Ads (sem creative library + budget insuficiente)
- ❌ Display prospecting (só Remarketing entra na Onda 3)
- ❌ Refazer a LP do zero — só corrigir os 9 gaps

---

## 8. Índice de artefatos desta pasta

```
vilela-construction/google-ads/
├── ROADMAP.md                              ⭐ este documento (fonte-de-verdade única)
├── estrategia-vilela-2026-07.md            Phase 0 do workflow Peitho (traffic-chief + kasim-aslam)
├── arquitetura-de-conta.yaml               3 campanhas + ad groups + naming
├── keywords/
│   ├── seed-list.csv                       ~50 keywords iniciais
│   ├── negativas-master.csv                ~100 negativas
│   └── negativas-por-campanha.csv          revisado semanalmente
├── copy/
│   ├── rsa-brand.md
│   ├── rsa-kitchen.md                      15h × 4d × 3 ad groups
│   ├── rsa-bathroom.md
│   └── sitelinks-callouts-snippets.md
├── conversion-actions.md                   spec Camada 1 + 2 + 3 (GHL sombra)
├── ghl-shadow-integration.md               Decisão D2: custom field gclid + workflow HTTP echo
└── relatorios/
    └── template-relatorio-semanal.md       molde para relatórios D+7, D+14, D+21…
```

E na raiz do projeto:
```
vilela-construction/
├── clausula-ghl-sombra-thiago.md          ⭐ Decisão D2 — texto pronto para check-in escrito
├── landing-page-fixes-2026-07.md          9 gaps + checklist Harmonia
├── perguntas-para-thiago.md               B1 + B2 + B3
└── meta-ads/
    ├── diagnostico-meta-pixel-2026-07.md  espelho do laudo Google de 01/07
    ├── conversion-events.md                spec Pixel + CAPI
    └── qa-checklist.md
```

---

## 9. Referências reutilizáveis

### Skills Peitho aplicadas
- `Peitho/.claude/skills/arquitetura-enterprise-ppc/SKILL.md`
- `Peitho/.claude/skills/criativo-como-hipotese-rsa-pmax/SKILL.md`
- `Peitho/.claude/skills/search-query-analise/SKILL.md`
- `Peitho/.claude/skills/auditoria-forense-200-checkpoints/SKILL.md`

### Skills Caliope (handoff)
- `Caliope/.claude/skills/anuncio-por-estagio-de-consciencia/SKILL.md`
- `Caliope/.claude/skills/estrutura-de-pagina-de-vendas/SKILL.md`
- `Caliope/.claude/skills/headline-e-hook-testaveis/SKILL.md`

### Skills Aletheia (input estratégia)
- `Aletheia/.claude/skills/mapeamento-de-jornada-com-pain-points/SKILL.md`
- `Aletheia/.claude/skills/roteiro-de-entrevista/SKILL.md`

### Agentes Peitho
- `Peitho/agents/traffic-chief.md` (porta de entrada)
- `Peitho/agents/kasim-aslam.md` (Google Ads domain expert)
- `Peitho/agents/media-buyer.md` (execução)
- `Peitho/agents/pixel-specialist.md` (instrumentação)
- `Peitho/agents/ad-midas.md` (briefing criativo)
- `Peitho/agents/performance-analyst.md` (relatórios)
- `Peitho/agents/ads-analyst.md` (auditoria D+30)
- `Peitho/agents/scale-optimizer.md` (escala D+45)

### Documentos-âncora Vilela
- `../DOSSIE-COMPLETO.md`
- `../dossie-site-vilela-construction.md`
- `../diagnostico-tracking-2026-07-01.md`

### Contrato
- `Olimpo/contratos/missoes/m-20260709-google-ads-vilela.yaml`

---

_Este documento é a fonte-de-verdade única do canal Google Ads da Vilela Construction. Atualizado a cada onda pelo agente responsável._
