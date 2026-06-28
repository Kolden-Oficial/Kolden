# LAUDO DE VISTORIA — Chassi da Frota de Agentes da Kolden

> **Auditor-Chefe** · vistoria de obra, viga por viga · **2026-06-28**
> Insumos obrigatórios (acessíveis ✓): `C:\Kolden\AGENTS.md` (raiz) + `C:\Kolden\CLAUDE.md`.
> Postura: tolerância zero a suposição. Todo achado carrega evidência citável (`arquivo:linha`).
> O auditor **diagnostica, não conserta** — nenhum arquivo de agente foi alterado.
> Método: parse exaustivo dos 246 arquivos por fan-out de 10 subagentes leitores + **reconciliação independente por GREP** (relatório de subagente não é evidência).

---

## 0. SUMÁRIO EXECUTIVO

A frota **não é um sistema executável hoje** — é um **acervo de 246 fichas de persona** muito bem escritas, mas **não-cabladas**. As rachaduras não são pontuais: são **falhas de molde** que se repetem em quase 100% da frota.

Os 5 pilares quebrados:

1. **CRÍTICO — Contagem mente.** `AGENTS.md` declara 247; existem **246 arquivos**. O 247º (**Dike**) **não tem arquivo de agente** — é um fantasma de contagem.
2. **CRÍTICO — Hierarquia não existe na máquina.** Os 23 chefes de squad **não declaram pai**. A cadeia de 5 camadas (Hermes→Zeus→Executivos→Squads) vive só em prosa no `AGENTS.md`; **nenhuma aresta pai↔filho liga os squads ao Olimpo**. O topo (Zeus) aponta para o **Hermes, que não é agente** (runtime). Operacionalmente, **todos os 23 squads são órfãos** do grafo.
3. **ALTO sistêmico — `modelo` INDEFINIDO em 246/246.** Nenhum agente atribui modelo. Roteamento, custo e capacidade ficam ao acaso do runtime.
4. **ALTO — Roteamento ambíguo e fantasma.** Os 8 executivos do Olimpo têm `routing_triggers` que **colidem em bloco** com os squads operacionais (Apolo↔Caliope/Peitho/Ariadne/Pheme/Pluto; Plutos↔Pactolo/Pluto; Afrodite↔Emporos/Pluto; Poseidon↔Ananke/Pluto; Hades↔Egide/Nomos). Há referência **fantasma** (`afrodite → squad: gohighlevel`, squad inexistente) e órfãos de roteamento (`nicholas-kusmich`, `movement-architect`).
5. **MÉDIO sistêmico — Babel de dialetos e convenção violada.** 4 dialetos de definição, **nenhum frontmatter YAML real** nos squads (YAML em code-fence), `squad:` divergente da pasta em 10 squads, e a convenção "PT-BR + kebab-case em 100%" é violada na maioria dos ids (inglês: `copy-chief`, `traffic-masters`, `cybersecurity`…).

**Veredito:** o chassi tem todas as peças no chão da oficina, **nenhuma soldada**. Antes de rodar qualquer missão de ponta a ponta, é preciso (a) cravar a contagem/Dike, (b) cablar a hierarquia, (c) padronizar o molde (model/contrato/dialeto).

---

## 1. RECONCILIAÇÃO DE CONTAGEM — **CRÍTICO**

| Fonte | Esperado | Parseado (arquivos `.md` reais) | Δ |
|---|---|---|---|
| 23 squads (`<Squad>/agents/`) | 225 | **225** ✓ | 0 |
| Prometeu (`.aiox-core/development/agents/`) | 12 | **12** ✓ | 0 |
| Caos (`.claude/agents/`) | 9 | **9** ✓ | 0 |
| Dike (verificador solo) | 1 | **0** ✗ | **−1** |
| **TOTAL** | **247** | **246** | **−1** |

**Evidência:** `Glob Dike/**/*.md` → só `MEMORY.md`, `CLAUDE.md`, `ferramentas.md`, `prd-de-ia.md`, `roteiro-de-teste.md`. **Não existe `Dike/agents/*.md`.** O `AGENTS.md:15` e o `CLAUDE.md` afirmam "247 (… + 1 Dike verificador solo)". O 247º é uma **entidade sem arquivo de agente** — definição dispersa, não-parseável, não-instanciável como os demais. Contagem oficial **não fecha**.

Subdivisão verificada por GREP (`^\s*squad:` em `*/agents/*.md` retornou 225 linhas/arquivos com o campo `squad:`).

---

## 2. REGISTRO CANÔNICO (246 agentes)

Legenda: **Tipo** O=orquestrador, E=especialista. **Modelo**: `—` = INDEFINIDO (sem campo `model:`; vale para **todos os 246**). **Pai decl.**: ✓ declara `reports_to`/`pai` no arquivo; ✗ apenas inferido. **Gatilho**: wTU=`whenToUse`, rT=`routing_triggers`, rL=`routing_logic`/signals, desc=`description`.

> O registro abaixo é a forma compacta (colunas decisivas). O detalhe normalizado de 12 campos/agente com evidência `arquivo:linha` por campo está na trilha de auditoria desta sessão (saídas dos 10 subagentes leitores, reconciliadas por GREP).

### Camada 3 — Topo · Olimpo (1)
| # | id | pasta/`squad:` | Tipo | Tier | Pai decl. | Gatilho | Anomalia-chave |
|---|---|---|---|---|---|---|---|
|1|`zeus`|Olimpo/olimpo|O|0|✗ (recebe do Hermes, não-agente)|rT+wTU+rL|Pai = Hermes (runtime sem arquivo); `collaborates_with: squad: pluto` (zeus.md:203)|

### Camada 4 — Executivos C-level · Olimpo (7)
| # | id | cargo | Tipo | Pai decl. | Contrato de Missão | Anomalia-chave |
|---|---|---|---|---|---|---|
|2|`poseidon`|COO|E|✓ zeus|**FALTA seção**|Sem seção 'Contrato de Missão'; triggers ↔ Ananke/hormozi-scale|
|3|`apolo`|CMO|E|✓ zeus|**FALTA seção**|Triggers (copy/anúncio/SEO/CRO/funil/lançamento) ↔ Caliope/Peitho/Ariadne/Pheme/Pluto|
|4|`hefesto`|CTO|E|✓ zeus|**FALTA seção**|Triggers (site/frontend) ↔ Dedalo/Prometeu|
|5|`hades`|CIO|E|✓ zeus|**FALTA seção**|Triggers (segurança/LGPD/compliance) ↔ Egide/Nomos|
|6|`atena`|CAIO|E|✓ zeus|**FALTA seção**|Trigger `Caos`/orquestração cruza fronteira da fábrica|
|7|`plutos`|CFO|E|✓ zeus|presente|**Colisão de nome** Plutos vs squad Pluto vs hormozi-chief; ↔ hormozi-pricing/models|
|8|`afrodite`|CRO|E|✓ zeus|presente|Handoff a **`squad: gohighlevel` (FANTASMA)**; ↔ hormozi-closer/leads/retention|

> Achado de molde: **5 de 7 executivos não têm a seção 'Contrato de Missão'** (só zeus/plutos/afrodite). O chassi assinável existe em `Olimpo/contratos/` mas não é carregado pela maioria.

### Camada 5 — Squads operacionais (225)

**Caliope** (copy-squad) — 23 · todos camada 5 · todos modelo `—` · pai inferido `copy-chief` (✗ reports_to)
| # | id | Tipo | Tier | Anomalia |
|---|---|---|---|---|
|9|`copy-chief`|O|0|persona "Cyrus" (fictícia); Árvore de Decisão (l.122-147) contradiz os `tier:` reais|
|10|`andre-chaperon`|E|1d|chief o classifica em 1C (E-mail); sub_group EN/PT inconsistente|
|11|`ben-settle`|E|1c| |
|12|`claude-hopkins`|E|1a| |
|13|`clayton-makepeace`|E|1a|chief o põe em 1D (Financeiro)|
|14|`dan-kennedy`|E|1b| |
|15|`dan-koe`|E|1d|chief o põe em 1C|
|16|`david-deutsch`|E|1d|**também duplicado** em `Caliope/copy-master/agents/` (fora dos 246)|
|17|`david-ogilvy`|E|1d| |
|18|`eugene-schwartz`|E|1a| |
|19|`frank-kern`|E|1b| |
|20|`gary-bencivenga`|E|1a| |
|21|`gary-halbert`|E|1a| |
|22|`jim-rutz`|E|1d| |
|23|`joe-sugarman`|E|1b| |
|24|`john-carlton`|E|1a| |
|25|`jon-benson`|E|1c|chief o põe em 1B; "VSL 5 passos" vs framework "VSL 3X" interno|
|26|`parris-lampropoulos`|E|1d| |
|27|`robert-collier`|E|1a| |
|28|`russell-brunson`|E|1b| |
|29|`ry-schwartz`|E|1c|Piglet "9 partes" lista só 6|
|30|`stefan-georgi`|E|1c|chief o põe em 1B; "80% pesquisa" vs fases somam 40%|
|31|`todd-brown`|E|1c|chief o põe em 1B; sem seção biography|

**Peitho** (traffic-masters) — 16 · camada 5 · modelo `—` · pai `traffic-chief` (✗)
| # | id | Tipo | Anomalia |
|---|---|---|---|
|32|`traffic-chief`|O|roteia 14 de 15; **`nicholas-kusmich` órfão de roteamento**|
|33|`ad-midas`|E|sub_group EN vs PT|
|34|`ads-analyst`|E|mandato genérico|
|35|`creative-analyst`|E|mandato genérico|
|36|`depesh-mandalia`|E| |
|37|`fiscal`|E|id/nome genérico "Fiscal"; ↔ Plutos/CFO, Pactolo|
|38|`kasim-aslam`|E| |
|39|`media-buyer`|E|mandato genérico|
|40|`molly-pittman`|E| |
|41|`nicholas-kusmich`|E|**órfão de roteamento** (não é route_to de nenhum gatilho)|
|42|`pedro-sobral`|E| |
|43|`performance-analyst`|E|sub_group PT vs EN|
|44|`pixel-specialist`|E|mandato genérico|
|45|`ralph-burns`|E| |
|46|`scale-optimizer`|E|mandato genérico|
|47|`tom-breeze`|E| |

**Aglaia** (brand-squad) — 15 · camada 5 · modelo `—` · pai `brand-chief` (✗, nenhum especialista declara)
| # | id | Tipo | Tier |
|---|---|---|---|
|48|`brand-chief`|O|0|
|49-62|`al-ries` · `alina-wheeler` · `archetype-consultant` · `byron-sharp` · `david-aaker` · `denise-yohn` · `domain-scout`(t2) · `donald-miller` · `emily-heyward` · `jean-noel-kapferer` · `kevin-keller` · `marty-neumeier` · `miller-sticky-brand`(t2) · `naming-strategist`|E|1/2|

**Harmonia** (design-squad) — 8 · camada 5 · modelo `—` · pai `design-chief` (✓ os 7 especialistas declaram `reports_to`)
| # | id | Tipo |
|---|---|---|
|63|`design-chief`|O|
|64-70|`brad-frost` · `dan-mall` · `dave-malouf` · `design-system-architect` · `ui-engineer` · `ux-designer` · `visual-generator`|E|

**Orfeu** (storytelling) — 12 · camada 5 · modelo `—` · pai `story-chief` (✗)
| # | id | Tipo | Anomalia |
|---|---|---|---|
|71|`story-chief`|O|id/título em inglês|
|72-82|`blake-snyder`·`dan-harmon`·`joseph-campbell`·`keith-johnstone`·`kindra-hall`·`marshall-ganz`·`matthew-dicks`·`nancy-duarte`·`oren-klaff`·`park-howell`·`shawn-coyne`|E|`marshall-ganz` sobrepõe Dionisio sem cross-ref; sub_groups EN/PT|

**Ariadne** (ariadne) — 8 · camada 5 · modelo `—` · pai `ariadne-chief` (✓ por squad) · **tools declarados** (vários "A PROVISIONAR")
| # | id | Tipo | Tier | Anomalia |
|---|---|---|---|---|
|83|`ariadne-chief`|O|0|único squad com naming consistente|
|84|`auditor-tecnico-seo`|E|1|tools Semrush/Ahrefs/DataForSEO "A PROVISIONAR"|
|85|`arquiteto-de-site`|E|1|tools "A PROVISIONAR"|
|86|`engenheiro-de-schema`|E|1|tools ok (gratuitas)|
|87|`estrategista-de-conteudo-seo`|E|1|tools "A PROVISIONAR"|
|88|`otimizador-ai-seo`|E|1|tools de visibilidade IA "A PROVISIONAR"|
|89|`analista-de-cro`|E|2|**framework "8 dimensões" no AVISO vs 7 no corpo** (analista-de-cro.md:31)|
|90|`otimizador-de-formulario`|E|2|tools "A PROVISIONAR"|

**Dionisio** (movement) — 7 · camada 5 · modelo `—` · pai `movement-chief` (architect ✓; demais ✗)
| # | id | Tipo | Anomalia |
|---|---|---|---|
|91|`movement-chief`|O|AVISO diz "6 especialistas", roteia só 5|
|92|`fenomenologo`|E| |
|93|`identitario`|E| |
|94|`manifestador`|E|sobrepõe Orfeu/marshall-ganz|
|95|`estrategista-de-ciclo`|E| |
|96|`analista-de-impacto`|E| |
|97|`movement-architect`|E|**órfão de roteamento** (declara reports_to mas chief não o roteia/gere); Canvas sobrepõe 3 colegas|

**Aletheia** (aletheia) — 8 · camada 5 · modelo `—` · pai `aletheia-chief` (✓ os 7 declaram)
| # | id | Tipo | Anomalia |
|---|---|---|---|
|98|`aletheia-chief`|O| |
|99|`rob-fitzpatrick`|E|**sem Ritual de Encerramento**|
|100|`steve-blank`|E|**sem Ritual de Encerramento**|
|101|`tony-ulwick`|E|**sem Ritual de Encerramento**|
|102|`eric-ries`|E| |
|103|`david-bland`|E|**erro de indentação YAML** (david-bland.md:30-31)|
|104|`ash-maurya`|E| |
|105|`alberto-savoia`|E| |

**Argos** (argos) — 15 · camada 5 · modelo `—` · pai `argos-chief` (✗) · **tools de scraping declarados**
| # | id | Tipo | Tier |
|---|---|---|---|
|106|`argos-chief`|O|0|
|107-120|`web-harvester` · `serp-seo-cartografo` · `ads-intel` · `market-sizer` · `competitor-mapper` · `research-synthesizer` · `compliance-sentinela`(t3, gate ToS — **roteado** ✓) · `social-instagram` · `social-tiktok` · `social-youtube` · `social-x` · `social-linkedin` · `social-facebook` · `social-reddit`(t2)|E| |

**Liceu** (liceu) — 9 · camada 5 · modelo `—` · pai `liceu-chief` (✗) · **tools declarados** (research)
| # | id | Tipo | Tier | Anomalia |
|---|---|---|---|---|
|121|`liceu-chief`|O|0| |
|122|`ceptico-verificador`|E|1| |
|123|`biografo`|E|1| |
|124|`lexicografo`|E|1| |
|125|`cartografo-de-modelos`|E|1| |
|126|`genealogista`|E|2| |
|127|`bibliotecario`|E|2|`archetype` **e** `squad:` duplicados (bibliotecario.md:15)|
|128|`sintetizador`|E|3|`archetype` duplicado (sintetizador.md:16)|
|129|`ponte-de-encarnacao`|E|3|`archetype` duplicado (ponte-de-encarnacao.md:15)|

**Themis** (advisory-board) — 11 · camada 5 · modelo `—` · pai `board-chair` (✗)
| # | id | Tipo | Anomalia |
|---|---|---|---|
|130|`board-chair`|O|persona inglês fora da convenção mitológica|
|131-140|`ray-dalio`·`charlie-munger`·`naval-ravikant`·`peter-thiel`·`reid-hoffman`·`simon-sinek`·`brene-brown`·`patrick-lencioni`·`derek-sivers`·`yvon-chouinard`|E|sub_group EN/PT inconsistente; `Brene`s/`Brené`; munger ~598 linhas (assimetria)|

**Metis** (data-squad) — 7 · camada 5 · modelo `—` · pai `data-chief` (5 de 6 declaram)
| # | id | Tipo | Anomalia |
|---|---|---|---|
|141|`data-chief`|O|name "Datum" ≠ id|
|142|`avinash-kaushik`|E|**único sem `reports_to`** (inconsistente)|
|143-147|`peter-fader`·`sean-ellis`(fader_note copy/paste l.184)·`wes-kao`·`nick-mehta`(publication year:2026 placeholder)·`david-spinks`|E| |

**Pluto** (hormozi-squad) — 16 · camada 5 · modelo `—` · pai `hormozi-chief` (✗)
| # | id | Tipo | Anomalia |
|---|---|---|---|
|148|`hormozi-chief`|O|roteia 10 de 16; sem `whenToUse`; **colisão Pluto/Plutos/hormozi-chief**|
|149-163|`hormozi-offers`·`hormozi-leads`·`hormozi-pricing`(↔Plutos)·`hormozi-closer`(↔Afrodite)·`hormozi-retention`(↔Afrodite)·`hormozi-scale`(↔Poseidon)·`hormozi-models`(↔Plutos)·`hormozi-content`(↔Apolo/Pheme)·`hormozi-ads`(↔Apolo)·`hormozi-launch`(↔Apolo/Aletheia)·`hormozi-copy`(↔Caliope; **não-roteável**)·`hormozi-hooks`(**não-roteável**)·`hormozi-audit`·`hormozi-workshop`(**não-roteável**)·`hormozi-advisor`(mandato genérico)|E|5 não roteáveis por signal; sobreposição massiva com Olimpo e outros squads|

**Dedalo** (sem `squad:`; dialeto AIOS vendorizado) — 8 · camada 5 · modelo `—` (exemplos didáticos não contam) · pai `claude-mastery-chief` (✗)
| # | id | nome | Tipo | Anomalia |
|---|---|---|---|---|
|164|`claude-mastery-chief`|Orion|O|sem `tier`/`squad`; base `squads/claude-code-mastery/` diverge dos demais; autoClaude 1.0 vs 3.0; ícones quebrados|
|165|`config-engineer`|Sigil|E|handoff a @dev/@architect **ausentes da pasta**|
|166|`hooks-architect`|Latch|E|refs a `.aios-core/` inexistente|
|167|`mcp-integrator`|Piper|E|**alias `piper` colide** com project-integrator|
|168|`project-integrator`|Conduit|E|**alias `piper` colide** com mcp-integrator|
|169|`roadmap-sentinel`|Vigil|E|depende de WebSearch/WebFetch nativas (atrito c/ política Firecrawl); `model: 'claude-opus-4-6'` só como exemplo (l.885)|
|170|`skill-craftsman`|Anvil|E|**alias `sigil` colide** com nome do config-engineer|
|171|`swarm-orchestrator`|Nexus|E|`model: haiku/sonnet` só como exemplo (l.137-158); autoClaude 1.0|

**Egide** (cybersecurity) — 15 · camada 5 · modelo `—` · pai `cyber-chief` (✓ os 14 declaram) · tools só em prosa
| # | id | Tipo | Salvaguarda própria |
|---|---|---|---|
|172|`cyber-chief`|O|**Gate de autorização vive AQUI** (ethical_gates l.62-67)|
|173|`rogue`|E|**PRESENTE** (mais blindado; exige autorização l.74)|
|174|`busterer`|E|**AUSENTE** (ofensivo, zero menção a autorização)|
|175|`dirber`|E|**AUSENTE** (ofensivo)|
|176|`fuzzer`|E|**AUSENTE** (ofensivo)|
|177|`ripper`|E|**AUSENTE** (ofensivo, quebra de credenciais)|
|178|`cartographer`|E|parcial (passivo primeiro)|
|179|`command-generator`|E|parcial|
|180|`shannon-runner`|E|parcial (OSINT público)|
|181|`peter-kim`|E|parcial (greeting pede autorização)|
|182|`georgia-weidman`|E|ausente (educacional)|
|183-186|`chris-sanders`·`jim-manico`·`marcus-carey`·`omar-santos`|E|defensivos (N/A)|

### Squads-semente (status `semente`, 2026-06-28) — 30 · camada 5 · modelo `—`

**Nomos** (nomos) — 5 · pai `nomos-chief` (handoff Themis/Egide/Pactolo)
|#|id|Tipo|status no yaml|
|---|---|---|---|
|187|`nomos-chief`|O|✓ `semente-do-lote-2026-06-26`|
|188-191|`privacidade-de-dados`·`auditor-de-conformidade`·`gestor-de-contratos`·`analista-regulatorio`|E|✓ (todos)|

**Pactolo** (pactolo) — 5 · pai `pactolo-chief`→Plutos
|#|id|Tipo|status|
|---|---|---|---|
|192|`pactolo-chief`|O|✓ chief|
|193-196|`analista-fpa`·`modelador-financeiro`·`controller`·`analista-de-fluxo-de-caixa`|E|**só em prosa, não no yaml**|

**Emporos** (emporos) — 5 · pai `emporos-chief`→Afrodite · **único com `escalates_to:` estruturado**
|#|id|Tipo|status|
|---|---|---|---|
|197|`emporos-chief`|O|**NENHUM marcador (nem yaml nem prosa)**; auto-referência em domain_routing.crm.secondary (l.72)|
|198-201|`qualificador-de-leads`·`executivo-de-cadencia`·`redator-de-propostas`·`gestor-de-crm`|E|**nenhum status**|

**Hestia** (hestia) — 5 · pai `hestia-chief`→Caos
|#|id|Tipo|status|
|---|---|---|---|
|202|`hestia-chief`|O|✓ valor **`semente`** (diverge de `semente-do-lote-…`); 5 sub-rotas p/ 4 especialistas|
|203-206|`recrutador-e-selecao`·`especialista-de-onboarding`·`analista-de-cultura`·`business-partner-rh`|E|sem status|

**Ananke** (ananke) — 5 · pai `ananke-chief`→Poseidon/Dedalo · **especialistas com `tools:` em yaml**
|#|id|Tipo|status|
|---|---|---|---|
|207|`ananke-chief`|O|**NENHUM marcador**; ícone ⚖️ colide|
|208-211|`arquiteto-de-processos`·`analista-de-automacao`·`gestor-de-fornecedores`·`analista-de-eficiencia`|E|sem status; muito mais ricos que os pares|

**Cairos** (cairos) — 5 · pai `cairos-chief`→Prometeu
|#|id|Tipo|status|
|---|---|---|---|
|212|`cairos-chief`|O|✓ chief; referencia arquivos inexistentes (routing-catalog.yaml, diagnose.md)|
|213-216|`gerente-de-projeto`·`gestor-de-riscos`·`gestor-de-stakeholders`·`product-manager`|E|só em prosa|

### Prometeu — framework AIOX (dialeto distinto) — 12 · transversal · modelo `—` · pai `aiox-master`
|#|id|nome|Tipo|Anomalia|
|---|---|---|---|---|
|217|`aiox-master`|Orion|O|refs cruzadas `@github-devops` vs id `devops`|
|218|`analyst`|Atlas|E|name "Atlas" vs CLAUDE.md diz "Alex"|
|219|`architect`|Aria|E| |
|220|`data-engineer`|Dara|E|commands em formato inline divergente; cita comandos renomeados|
|221|`dev`|Dex|E|refs `@github-devops`|
|222|`devops`|Gage|E|**`enforcement_mechanism` checa `github-devops` ≠ id `devops`** (gate de push pode falhar, devops.md:446)|
|223|`po`|Pax|E| |
|224|`qa`|Quinn|E|cita `*review-qa` inexistente|
|225|`sm`|River|E|task `correct-course.md` órfã (sem comando)|
|226|`ux-design-expert`|Uma|E|lista 23 tasks, declara 22|
|227|`pm`|Morgan|E|2 modos no mesmo arquivo; spawning JS vs "CLI-first zero-JS"; `create-story` vs delega ao @sm|
|228|`squad-creator`|Craft|E|**fora do roster oficial**; 3 comandos placeholder|

### Caos — fábrica de agentes (frontmatter Claude Code real) — 9 · meta · modelo `—`
|#|id|Tipo|tools (frontmatter)|Anomalia|
|---|---|---|---|---|
|229|`arquiteto`|E|Read,Glob,Grep| |
|230|`diagnosticador`|E|Read,Write,Glob| |
|231|`pesquisador`|E|Read,Grep,Glob,WebFetch,WebSearch,Bash,Exa,HF,Context7|web/MCP → sujeito à trava `gate-busca.cjs`|
|232|`redator-de-prompts`|E|Read,Write,Glob|gera "system-prompt.md" vs Caos diz que CLAUDE.md É a identidade|
|233|`vigia`|E|Read,Write,Bash,WebSearch,WebFetch,Exa,HF,Context7|cita "Tavily" não declarado em tools|
|234|`revisor`|E|Read,Grep,Glob|usa checklist-runner do Prometeu (motor pode exigir Bash não declarado)|
|235|`testador`|E|Read,Grep,Glob| |
|236|`auditor-de-seguranca`|E|Read,Grep,Glob,Bash|manda **delegar "via Task"** mas **`Task` não está em tools** (l.35,39,45)|
|237|`curador`|E|Read,Write,Grep,Glob|débito declarado: backfill de cartões de identidade pendente|

### Camada 2 / verificador — sem arquivo de agente
|#|entidade|estado|
|---|---|---|
|—|**Hermes** (camada 2)|runtime vendorizado Nous Research; **não é agente Kolden** (AGENTS.md:54,359); é o "pai" declarado do Zeus mas não tem ficha|
|**(247?)**|**Dike** (verificador)|**SEM `agents/*.md`** — definição dispersa em `Dike/prd-de-ia.md`/`CLAUDE.md`; **todos os 12 campos = INDEFINIDO**; é o fantasma da contagem|

---

## 3. VERIFICAÇÕES (A–G)

### A. Integridade de configuração
| Item | Resultado | Evidência |
|---|---|---|
| Campos obrigatórios não-vazios | **PARCIAL** | id/nome/mandato/gatilho presentes em 246/246; **camada NUNCA é campo declarado** (sempre inferida); **contrato_entrada/saida ausente** salvo handoff em prosa |
| id/nome único na frota | **PASS (ids)** / **FAIL (nomes/pasta)** | ids únicos nos 246; **colisões de identidade**: `Pluto`(pasta)/`Plutos`(id Olimpo)/`hormozi-chief`; aliases `piper` (Dedalo mcp-integrator×project-integrator), `sigil` (skill-craftsman alias × config-engineer nome) |
| Modelo atribuído e válido | **FAIL sistêmico** | **0/246** declaram `model:`. GREP: ocorrências são texto de framework (marshall-ganz/ash-maurya/kevin-keller) ou exemplo didático (swarm-orchestrator l.137-158, roadmap-sentinel l.885) |
| Mandato presente, coerente, não-genérico | **PASS (maioria)** | ~10 mandatos marcados genéricos (Peitho ads/creative/media/pixel/scale/perf-analyst; hormozi-advisor) |
| Toda tool/skill referenciada existe e é declarada | **FAIL** | tools estruturados só em Ariadne/Argos/Ananke/Liceu/Caos/Prometeu; **maioria dos squads não declara tools** (só `commands` em prosa). Várias tools "A PROVISIONAR" (Ariadne). `auditor-de-seguranca` usa `Task` não declarado |

### B. Liveness / alcançabilidade
| Item | Resultado | Evidência |
|---|---|---|
| Alcançável a partir de ≥1 orquestrador | **FAIL** | Especialistas são alcançáveis pelo seu chief, **mas os 23 chiefs não têm pai** → nenhum squad é alcançável a partir do topo (Zeus). Hierarquia só em prosa no AGENTS.md |
| Toda referência aponta para destino existente | **FAIL** | **Fantasmas**: `afrodite → squad: gohighlevel` (inexistente); Dedalo → @dev/@qa/@architect/@devops (não estão na pasta Dedalo); `cairos-chief` → routing-catalog.yaml/diagnose.md inexistentes |
| Todo agente tem gatilho | **PASS** | 246/246 têm `whenToUse`/`routing_*`/`description` |
| Sem legado em rota ativa | **PARCIAL** | duplicatas fora dos 246 (`Caliope/copy-master/`, `.claude/_staging/`) não estão em rota, mas poluem; Dedalo aponta para mundo AIOS legado |

### C. Integridade hierárquica
| Item | Resultado | Evidência |
|---|---|---|
| Topo único e inequívoco | **PARCIAL** | Zeus é o topo declarado, mas seu pai é **Hermes (não-agente)** → o vértice-raiz do grafo é um fantasma |
| Sem ciclos de delegação | **PASS** | nenhum ciclo A→B→A detectado (a maioria das arestas nem existe) |
| Cadeias completas sem elos quebrados | **FAIL** | **elo quebrado estrutural**: Executivos(4)→Squads(5) não tem aresta declarada; squads-semente declaram handoff externo em prosa, não aresta |
| Sem violação de camada | **INDEFINIDO/risco** | sem arestas, não há salto detectável — mas o roteamento prosa do Hermes-chief/Zeus pula direto a squads |
| Todo especialista com orquestrador-pai válido | **PARCIAL** | `reports_to` declarado só em: Harmonia(7), Aletheia(7), Metis(5/6), Egide(14), Emporos(`escalates_to`), semente(prosa). **Faltante** em Caliope, Peitho, Aglaia, Orfeu, Argos, Liceu, Themis, Pluto, Dionisio(6/7), Dedalo |

### D. Roteamento & ambiguidade
| Item | Resultado | Evidência |
|---|---|---|
| Sem sobreposição de gatilhos | **FAIL grave** | `routing_triggers` do Olimpo colidem em bloco com squads: Apolo↔Caliope/Peitho/Ariadne/Pheme/Pluto; Plutos↔Pactolo/hormozi-pricing+models; Afrodite↔Emporos/hormozi-closer+leads+retention; Poseidon↔Ananke/hormozi-scale; Hades↔Egide/Nomos; Atena↔Caos; Hefesto↔Dedalo/Prometeu. Dentro do Pluto, hormozi-* sobrepõem entre si (3 diagnosticam restrição) |
| Sem lacunas (todo domínio com dono) | **PARCIAL** | cobertura ampla, mas **`nicholas-kusmich` e `movement-architect` não recebem rota**; 5 hormozi-* não roteáveis por signal |
| Roteamento determinístico | **FAIL** | só Olimpo (rT) e alguns chiefs (rL por signal) são estruturados; 23 chiefs roteiam por **prosa `whenToUse`** → mesma entrada não resolve deterministicamente; sobreposição executivo×squad torna a resolução ambígua |

### E. Contratos de interface (I/O)
| Item | Resultado | Evidência |
|---|---|---|
| saída-produtor casa com entrada-consumidor | **INDEFINIDO/FAIL** | **nenhum agente operacional declara schema I/O**; handoffs descritos em prosa; impossível verificar casamento mecanicamente |
| Formato de Mission Contract consistente | **FAIL** | chassi existe só no Olimpo (`Olimpo/contratos/`), e **5 de 7 executivos não carregam a seção**; o resto da frota não usa contrato. Dialetos divergentes (4) impedem um formato único |

### F. Coerência semântica & redundância
| Item | Resultado | Evidência |
|---|---|---|
| Mandatos duplicados / autoridade sobreposta | **FAIL** | Olimpo-execs ≅ squads (mapa em D); Pluto/hormozi ≅ Caliope(copy/hooks), Apolo(content/ads/launch), Afrodite(closer/leads/retention), Poseidon(scale), Plutos(pricing/models); ~100 personas "pessoa real" catalogadas (Liceu indexa por referência — por design) |
| Instruções conflitantes | **PARCIAL** | Caliope chief Árvore-de-Decisão ⟂ `tier:` reais; Ariadne CRO "7 vs 8 dimensões"; pm AIOX "CLI-first zero-JS" vs spawning JS |
| Convenção de nomenclatura em 100% | **FAIL** | convenção = PT-BR + kebab-case; **violada amplamente**: ids/squad em inglês (`copy-chief`, `traffic-masters`, `design-squad`, `storytelling`, `advisory-board`, `cybersecurity`, `hormozi-*`, `board-chair`, `claude-mastery-chief`) + ~100 nomes de pessoas reais em inglês |

### G. Dependências externas
| Item | Resultado | Evidência |
|---|---|---|
| Modelo/tool/MCP/API existe e provisionado | **FAIL/PARCIAL** | **modelo: 0/246**; tools "A PROVISIONAR" em Ariadne (Semrush/Ahrefs/DataForSEO/Hotjar/Optimizely/visibilidade-IA); Dedalo aponta para `.aios-core/` e MCPs (desktop-commander/docker-gateway) fora do inventário Kolden; Caos `pesquisador`/`vigia` e Prometeu `roadmap-sentinel` usam WebSearch/WebFetch nativas (atrito com a política de soberania/Firecrawl) |

---

## 4. ACHADOS (JSON)

```json
[
  {"severidade":"CRÍTICO","classe":"liveness","agentes_afetados":["TODA A FROTA"],"evidencia":"AGENTS.md:15 '247 (...+1 Dike)'; Glob Dike/**/*.md = {MEMORY,CLAUDE,ferramentas,prd-de-ia,roteiro-de-teste}.md — sem agents/*.md","impacto":"Contagem oficial diverge do real (246). O 247º (Dike) não é instanciável; o verificador da subida do funil é um fantasma — quebra a etapa de reconciliação Dike antes do Hermes devolver ao Ronan.","correcao_recomendada":"Criar Dike/agents/dike.md (1 ficha real) OU corrigir AGENTS.md/CLAUDE.md para 246 e declarar Dike como artefato-não-agente. Definir a contagem canônica."},
  {"severidade":"CRÍTICO","classe":"hierarquia","agentes_afetados":["zeus","23 chiefs de squad","poseidon","apolo","hefesto","hades","atena","plutos","afrodite"],"evidencia":"Nenhum *-chief declara reports_to a executivo Olimpo; Olimpo execs com filhos=[] (handoff só em prosa); zeus.md pai=Hermes (sem arquivo).","impacto":"A hierarquia de 5 camadas não existe na máquina — só no AGENTS.md em prosa. Os 23 squads são órfãos do topo; um input do Ronan não tem caminho declarado Zeus→Executivo→Squad.","correcao_recomendada":"Cablar arestas: cada executivo Olimpo lista os squads-filhos; cada *-chief declara reports_to ao executivo. Resolver o vértice-raiz (Hermes não-agente)."},
  {"severidade":"CRÍTICO","classe":"roteamento","agentes_afetados":["apolo","plutos","afrodite","poseidon","hades","atena","hefesto","Caliope","Peitho","Ariadne","Pheme","Pluto","Pactolo","Emporos","Ananke","Egide","Nomos","Dedalo","Prometeu","Caos"],"evidencia":"routing_triggers dos 8 deuses (ex.: apolo.md:18 copy/anúncio/SEO/CRO/funil/lançamento) colidem com domínios inteiros de squads operacionais.","impacto":"Mesma entrada resolve para executivo E squad — roteamento não-determinístico, disputa de tarefa, dupla execução.","correcao_recomendada":"Separar gatilho de NÍVEL: executivos roteiam por intenção estratégica e fazem handoff explícito; squads recebem tarefa já decomposta. Matriz de roteamento sem sobreposição."},
  {"severidade":"ALTO","classe":"configuração","agentes_afetados":["TODOS os 246"],"evidencia":"GREP ^\\s*model: em */agents/*.md = só texto de framework/exemplo; 0 atribuições reais.","impacto":"Modelo por agente indefinido → custo, latência e capacidade ao acaso do runtime; impossível calibrar tier de modelo por papel (orquestrador vs especialista barato).","correcao_recomendada":"Adicionar campo model: ao molde (ex.: chiefs=opus/sonnet, especialistas=sonnet/haiku) e ao gerador do Caos."},
  {"severidade":"ALTO","classe":"liveness","agentes_afetados":["afrodite","Dedalo(8)","cairos-chief"],"evidencia":"afrodite.md:130 handoff 'squad: gohighlevel' (inexistente); Dedalo handoff @dev/@qa/@architect/@devops ausentes da pasta; cairos-chief.md:51,83 refs a arquivos inexistentes.","impacto":"Referências-fantasma — handoff aponta para o nada; rota ativa quebra em runtime.","correcao_recomendada":"Remover/redirecionar a referência gohighlevel; reconciliar Dedalo (vendorizado AIOS) com o mundo Kolden; criar os arquivos referenciados pelo cairos-chief ou marcar como pendente."},
  {"severidade":"ALTO","classe":"configuração","agentes_afetados":["devops (Prometeu)"],"evidencia":"devops.md:446 enforcement_mechanism checa $AIOX_ACTIVE_AGENT != 'github-devops', mas o id é 'devops'.","impacto":"O gate de autoridade EXCLUSIVA de git push pode não disparar (nome divergente) — risco de push não-autorizado por outro agente.","correcao_recomendada":"Unificar o designador: id 'devops' ou 'github-devops' em todas as refs e no enforcement."},
  {"severidade":"ALTO","classe":"semântica","agentes_afetados":["busterer","dirber","fuzzer","ripper","georgia-weidman"],"evidencia":"Egide: gate de autorização vive só em cyber-chief.md:62-67; agentes ofensivos (ex.: ripper.md, fuzzer.md) sem nenhuma menção a autorização/escopo no próprio arquivo (contraste: rogue.md:74).","impacto":"Se acionados fora do orquestrador, agentes ofensivos não replicam a salvaguarda ética — risco de uso indevido sem o gate.","correcao_recomendada":"Replicar um bloco mínimo de verificação de autorização/escopo em cada agente ofensivo (defense-in-depth), não só no chief."},
  {"severidade":"ALTO","classe":"contrato","agentes_afetados":["TODA A FROTA operacional"],"evidencia":"Nenhum agente operacional declara contrato_entrada/saida; Olimpo/contratos/ existe mas só zeus/plutos/afrodite carregam a seção; poseidon/apolo/hefesto/hades/atena sem ela.","impacto":"Handoffs não-verificáveis mecanicamente; saída de um produtor pode não casar com a entrada do consumidor; a subida (Dike) não tem schema a reconciliar.","correcao_recomendada":"Padronizar o Contrato de Missão como I/O obrigatório por handoff; completar as 5 seções faltantes do Olimpo."},
  {"severidade":"MÉDIO","classe":"semântica","agentes_afetados":["10 squads"],"evidencia":"GREP squad: → copy-squad/traffic-masters/brand-squad/design-squad/data-squad/storytelling/movement/advisory-board/cybersecurity/hormozi-squad ≠ pasta mitológica.","impacto":"Identidade dupla (pasta grega vs id de import inglês); ferramentas/índices que casam por squad: podem apontar para o nome errado; convenção PT-BR violada.","correcao_recomendada":"Renomear o campo squad: para o slug da pasta (kebab-case PT) em 10 squads; atualizar roteadores/índices que dependem dele."},
  {"severidade":"MÉDIO","classe":"semântica","agentes_afetados":["Olimpo-execs","Pluto(16)","Caliope","Apolo","Afrodite","Poseidon","Plutos"],"evidencia":"Sobreposição de mandato: hormozi-pricing/models↔Plutos; hormozi-closer/leads/retention↔Afrodite; hormozi-scale↔Poseidon; hormozi-content/ads/launch↔Apolo; hormozi-copy/hooks↔Caliope.","impacto":"Redundância de autoridade — várias entidades reivindicam o mesmo trabalho; manutenção e roteamento confusos.","correcao_recomendada":"Definir fronteira: Olimpo decide/estratégia, Pluto executa método Hormozi, Caliope escreve copy. Dedup por handoff explícito."},
  {"severidade":"MÉDIO","classe":"configuração","agentes_afetados":["squads-semente (Emporos,Ananke,Pactolo,Hestia,Cairos)"],"evidencia":"status: presente só em Nomos(5/5); Emporos/Ananke chiefs SEM marcador; Pactolo/Cairos especialistas só em prosa; Hestia chief valor 'semente' vs 'semente-do-lote-2026-06-26'.","impacto":"Estado de maturidade inconsistente — difícil saber programaticamente o que ainda é semente.","correcao_recomendada":"Padronizar campo status: no yaml de todos os 30, valor único."},
  {"severidade":"MÉDIO","classe":"roteamento","agentes_afetados":["nicholas-kusmich","movement-architect","hormozi-copy","hormozi-hooks","hormozi-workshop"],"evidencia":"Não constam como route_to/managed em seus chiefs (traffic-chief, movement-chief, hormozi-chief).","impacto":"Agentes existem mas nunca são acionados por rota — capacidade morta.","correcao_recomendada":"Adicionar sinais de roteamento aos chiefs ou remover os agentes não-roteáveis."},
  {"severidade":"BAIXO","classe":"configuração","agentes_afetados":["Pheme/publisher","Aletheia/rob-fitzpatrick","Aletheia/steve-blank","Aletheia/tony-ulwick"],"evidencia":"Faltam o bloco/seção de Ritual de Encerramento que os pares do squad têm.","impacto":"Quebra o auto-aprendizado obrigatório (AGENTS.md:374-381) nesses 4.","correcao_recomendada":"Anexar a seção/marcador ritual-de-encerramento."},
  {"severidade":"BAIXO","classe":"configuração","agentes_afetados":["Liceu/bibliotecario","Liceu/sintetizador","Liceu/ponte-de-encarnacao","Aletheia/david-bland","Metis/data-chief","Metis/nick-mehta","Metis/sean-ellis"],"evidencia":"archetype duplicado (bibliotecario.md:15 etc.); david-bland.md:30-31 indentação YAML; data-chief name 'Datum'≠id; nick-mehta year:2026 placeholder; sean-ellis fader_note copy/paste l.184.","impacto":"Higiene/dívida técnica; risco de parse incorreto (david-bland).","correcao_recomendada":"Limpeza pontual de campos duplicados/indentação/placeholders."},
  {"severidade":"BAIXO","classe":"configuração","agentes_afetados":["Dedalo: mcp-integrator/project-integrator (alias piper); config-engineer/skill-craftsman (sigil)"],"evidencia":"aliases colidentes entre os 2 pares.","impacto":"Ambiguidade de invocação por alias.","correcao_recomendada":"Tornar aliases únicos."}
]
```

---

## 5. PLACAR (SCORECARD)

| Métrica | Valor |
|---|---|
| Agentes auditados | **246** |
| Esperados (AGENTS.md) | **247** → divergência CRÍTICA de 1 (Dike fantasma) |
| Agentes com **zero achados** (saudáveis) | **≈ 0%** — todos os 246 herdam ≥1 falha de molde (modelo INDEFINIDO + sem contrato I/O + camada não-declarada) |
| Achados por severidade | **CRÍTICO 3 · ALTO 5 · MÉDIO 4 · BAIXO 3** (15 achados-classe, agregando padrões sistêmicos) |

### Padrões sistêmicos (falha de molde, não pontual)
| Padrão | Alcance | Severidade |
|---|---|---|
| Sem campo `model:` | **246/246** | ALTO |
| Sem contrato I/O por agente | **246/246** (salvo handoff prosa) | ALTO |
| `camada` nunca é campo declarado | **246/246** | MÉDIO |
| Chiefs sem `reports_to` ao topo | **23/23 squads** | CRÍTICO |
| `squad:` ≠ pasta | **10 squads** (~159 agentes) | MÉDIO |
| Convenção PT-BR/kebab-case violada | **maioria dos ids** | MÉDIO |
| Sem frontmatter YAML real (code-fence) | **225 squads + 12 Prometeu** | MÉDIO |

---

## 6. FILA DE REMEDIAÇÃO PRIORIZADA (por causa-raiz, CRÍTICOS na frente)

**R1 — Cravar a contagem e o Dike (CRÍTICO).** Decidir: criar `Dike/agents/dike.md` ou corrigir AGENTS.md/CLAUDE.md para 246 + classificar Dike como artefato-não-agente. *(1 arquivo / 2 docs)*

**R2 — Cablar a hierarquia (CRÍTICO, causa-raiz comum).** Em lote: (a) cada executivo Olimpo declara `filhos`=squads do seu domínio; (b) cada `*-chief` declara `reports_to`=executivo; (c) resolver o vértice-raiz Hermes (não-agente). Destrava blocos B e C. *(23 chiefs + 8 Olimpo)*

**R3 — Desambiguar roteamento (CRÍTICO).** Reescrever a matriz para que executivos (intenção/decisão) e squads (execução) não compartilhem gatilho; eliminar fantasma `gohighlevel`; rotear os 5 órfãos. *(8 Olimpo + 3 chiefs)*

**R4 — Padronizar o molde (ALTO, lote único no gerador do Caos):** adicionar `model:` + `camada:` + bloco `contrato` (I/O) ao template e regerar/retro-aplicar nos 246. Fecha A(modelo), C(camada), E(contrato) de uma vez. *(molde + 246)*

**R5 — Corrigir gates de segurança (ALTO):** (a) unificar `devops`/`github-devops` (enforcement de push); (b) replicar salvaguarda de autorização nos agentes ofensivos do Egide (busterer/dirber/fuzzer/ripper). *(1 + 4)*

**R6 — Completar Contrato de Missão no Olimpo (ALTO):** adicionar a seção aos 5 executivos faltantes (poseidon/apolo/hefesto/hades/atena). *(5)*

**R7 — Higiene de identidade (MÉDIO, lote):** renomear `squad:` para o slug da pasta em 10 squads; resolver colisões `Pluto/Plutos`, aliases `piper`/`sigil`; padronizar `status:` nos 30 semente. *(~170 toques)*

**R8 — Dedup semântico (MÉDIO):** desenhar a fronteira Olimpo×Pluto×Caliope×Afrodite/Plutos/Poseidon e remover autoridade redundante. *(análise + edição)*

**R9 — Baixo/higiene:** ritual-de-encerramento nos 4 faltantes; limpar `archetype` duplicado (Liceu×3), indentação `david-bland`, placeholders (`nick-mehta` year, `sean-ellis` fader_note); reconciliar Dedalo vendorizado AIOS; revisar uso de WebSearch/WebFetch nativas vs Firecrawl (Caos/Prometeu).

---

## 7. NOTAS DE MÉTODO E LIMITES DO LAUDO

- **Escopo:** 246 arquivos canônicos (`<Squad>/agents/`, `Prometeu/.aiox-core/development/agents/`, `Caos/.claude/agents/`). **Excluídos e flagados** (duplicatas/legado fora da rota): `.claude/_staging/{xquads,aiox}/**`, `Caliope/copy-master/**`, `Prometeu/.github/agents/`, `Prometeu/docs/**`.
- **Verificação independente por GREP** (não só relatório de subagente): `model:` (0 atribuições reais), `squad:` (mismatch em 10 squads, 225 com o campo), `routing_triggers` (só 8 Olimpo), contagem por diretório. Divergências subagente×GREP: nenhuma material.
- **Laudo COMPLETO** (não paginado): todos os 246 cobertos; o registro detalhado de 12 campos/agente vive no JSON companheiro.
- O auditor **não consertou nada**. `git status` deve mostrar apenas os novos arquivos em `.claude/registros/auditoria/`.
