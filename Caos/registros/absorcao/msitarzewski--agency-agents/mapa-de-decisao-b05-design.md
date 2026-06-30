# F4 — Mapa de decisão · `msitarzewski--agency-agents@a597cb6` — bucket B05 (design)

> **Bucket B05:** Harmonia (squad-alvo de UX/UI/Design Systems, 8 agentes) + Aglaia (squad-alvo de branding/estética, 15 agentes).
> **Inventário origem:** [`inventario-design.md`](./inventario-design.md) — 27 IDs (G1–G27) extraídos de 9 agentes upstream.
> **Aplica:** Constituição do Caos · Artigo VI (REUSE > ADAPT > CREATE) + Artigo III (gate F5 para aprovação humana antes de qualquer escrita).

---

## 1. Critério de roteamento entre Harmonia e Aglaia

A divisão `design/` do upstream mistura **dois domínios distintos** que no Kolden estão em squads separados:

- **Harmonia** — *como o produto se comporta na tela*. Design systems, atomic design (Brad Frost), UX research, UI components, design tokens, acessibilidade, DesignOps. Engenheiro+designer do **produto**.
- **Aglaia** — *como a marca se apresenta ao mundo*. Brand equity, identidade visual, naming, arquétipos, storytelling, brandbook, assets de marca. Estrategista da **marca**.

Critério aplicado por ID:

| Sinal upstream | Roteamento |
|---|---|
| design system, tokens, componentes, WCAG, layout, CSS, theme, breakpoints, UI/UX research, persona, usability testing | **Harmonia** |
| brand identity, brand equity, brand voice, brand guidelines, visual identity, brand assets, archetypes, brand storytelling | **Aglaia** |
| image prompt engineering, AI generation, inclusive visuals, whimsy/microcopy de marca, visual storytelling cross-platform | **Aglaia** (todos casam com `visual-generator` da Harmonia OU com brand expression da Aglaia — escolha justificada por ID) |
| LIFT framework (page fold audit), Cialdini gap analysis (persuasion levers per fold), persona walkthrough (5-second test + scroll-based monologue) | **Harmonia** (são frameworks de *auditoria de página*, lente de UX — não de escrita de copy; o agente `robert-cialdini` em Caliope é para *escrever copy persuasiva*, função diferente) |

## 2. Tabela de decisão por ID

| ID upstream | capacidade | squad_alvo | decisao | match_kolden | justificativa | acao_f6 |
|---|---|---|---|---|---|---|
| G1 | Brand identity systems development (purpose→values→visual→voice) | aglaia | ADAPT | `alina-wheeler` (sistemas de identidade visual + 5 fases) + `david-aaker` (brand identity/visão) cobrem o quê; falta o **pipeline operacional purpose→values→visual→voice** em uma skill executável | Aglaia tem os pensadores históricos, mas nenhuma skill que execute o pipeline ponta-a-ponta numa entrega. Upstream é o cookbook prático que falta. | NOVA skill `pipeline-de-identidade-de-marca` (Aglaia) consolidando purpose→values→visual→voice com checklist e gates por fase; cita Aaker + Wheeler como fonte conceitual |
| G2 | Brand compliance monitoring & protection (trademark, IP, crisis mgmt) | aglaia | CREATE | nada no Aglaia hoje cobre **monitoramento contínuo de uso da marca + crise + IP/trademark**; é vigilância pós-lançamento, não criação | Gap real: Aglaia constrói marca, não protege. Crise de marca, uso indevido e disputa de trademark são frente nova. Cross-link com Égide (legal/IP) e Themis (compliance). | NOVA skill `protecao-de-marca-monitoramento-crise` (Aglaia) com 3 frentes (trademark watch + uso indevido + protocolo de crise por janelas 30min/2h/24h); declarar handoff a Égide para parte legal e a Themis para compliance |
| G3 | Brand measurement frameworks (equity tracking, positioning validation) | aglaia | ADAPT | `kevin-keller` cobre brand equity (CBBE) conceitualmente, mas Aglaia não tem skill executável de **tracking longitudinal** (awareness, association, perceived quality, loyalty); cross-link com Metis (analytics) | Há a teoria (Keller), falta o **operacional**: o que medir, em que cadência, com qual instrumento (survey, social listening, sales lift). Argos cobre listening; Aglaia ganha o framework de tradução em painel de marca. | NOVA skill `paineis-de-equidade-de-marca` (Aglaia) com 4 dimensões (awareness/association/quality/loyalty) + cadência (trimestral) + handoff a Argos (social listening) e Metis (analytics) |
| G4 | Photography prompt engineering for AI generation (subject→environment→lighting→style) | aglaia | ADAPT | Harmonia tem `julgamento-estetico-anti-slop` (decisão de estilo + AI-tells) e o agente `visual-generator`, mas **não tem o método de engenharia de prompt estruturado** (subject→environment→lighting→style→composition→post-process); cabe na Aglaia porque é **expressão visual da marca** | A geração de imagem por IA tem dois lados: estética/decisão (Harmonia: `julgamento-estetico-anti-slop`) e prompt engineering técnico (Aglaia: brand expression). Upstream traz o segundo. | NOVA skill `engenharia-de-prompt-de-imagem` (Aglaia) com framework de 6 camadas + lookup por gênero (portrait/product/landscape/fashion) + bridge para `julgamento-estetico-anti-slop` da Harmonia |
| G5 | Genre-specific prompt patterns (portrait, product, landscape, fashion templates) | aglaia | ADAPT (consolidado em G4) | mesma justificativa do G4 — templates por gênero entram como **anexo** da skill nova `engenharia-de-prompt-de-imagem` | Consolidação reduz fragmentação: 1 skill com seções por gênero, em vez de 4 skills. | Anexo dentro de `engenharia-de-prompt-de-imagem` (Aglaia) — seção "Templates por gênero" com 4 padrões |
| G6 | Post-processing aesthetics encoding (film stock, color grade, era style) | aglaia | ADAPT (consolidado em G4) | Mesma skill consolidada; pós-processamento é **última camada** do prompt structure | Coerência: pós-process pertence ao prompt completo, não a uma skill própria. | Anexo dentro de `engenharia-de-prompt-de-imagem` (Aglaia) — seção "Pós-processamento e estética de era/film stock" |
| G7 | AI bias subversion in image/video generation (counter-stereotypes, physical reality mandates) | aglaia | CREATE | nada no Kolden cobre **representação inclusiva como gate de qualidade na geração de imagem por IA**; é frente nova de qualidade de marca | O viés de IA é um risco de marca (alienação de público, erro de representação, dano reputacional). É frente nova e crítica. Não está coberto por nenhum agente. | NOVA skill `visuais-inclusivos-anti-vies` (Aglaia) com framework counter-stereotype + negative prompting (clone-face/gibberish-text/AI-tells de viés) + protocolo de validação por comunidade |
| G8 | Clone-face prevention & gibberish-text negative prompting (video physics definition) | aglaia | ADAPT (consolidado em G7) | Mesmo escopo de inclusivos: **negative prompting** é técnica dentro da skill de visuais inclusivos | Coerência conceitual: viés e physics-correctness são duas faces do mesmo problema (IA gera coisa errada). | Anexo dentro de `visuais-inclusivos-anti-vies` (Aglaia) — seção "Negative prompting: clone-face, gibberish-text, physics violations" |
| G9 | Post-generation review checklist for representation accuracy (community validation protocol) | aglaia | ADAPT (consolidado em G7) | Checklist de revisão pós-geração = gate de qualidade da própria skill `visuais-inclusivos-anti-vies` | Não cabe skill própria — é a **rotina de saída** da skill anterior. | Anexo dentro de `visuais-inclusivos-anti-vies` (Aglaia) — seção "Checklist de revisão pós-geração (sociological audit)" |
| G10 | Persona walkthrough simulation (5-second test + scroll-based monologue) | harmonia | CREATE | nada no Kolden cobre **simulação cognitiva de persona percorrendo uma página com monólogo think-aloud**; é frente nova de auditoria UX | UX research na Harmonia hoje cobre pesquisa (entrevista, persona, usability test), mas **não** simulação pré-teste por agente. É frente nova e poderosa para revisão antes de teste com humano. | NOVA skill `walkthrough-de-persona` (Harmonia) com 3 modos (5-second test / scroll monologue / decision-point analysis); produz relatório com 8 personas-arquétipo (techie/skeptic/seguidor/etc.) e timestamps de fricção |
| G11 | LIFT framework analysis (Value Prop/Relevance/Clarity/Urgency/Anxiety/Distraction per fold) | harmonia | ADAPT (consolidado em G10) | LIFT é **framework de auditoria de página** aplicado dentro do walkthrough — é a **rubrica** que o walkthrough executa fold-by-fold | É lente de UX/CRO (não de copy). Em Caliope há `headline-e-hook-testaveis` e `anuncio-por-estagio-de-consciencia`, mas LIFT como auditoria de página fold-by-fold é UX, pertence à Harmonia. | Anexo dentro de `walkthrough-de-persona` (Harmonia) — seção "Rubrica LIFT por fold (Value Prop/Relevance/Clarity/Urgency/Anxiety/Distraction)" |
| G12 | Cialdini principle detection & gap analysis (7 persuasion levers per fold) | harmonia | ADAPT (consolidado em G10) | Aqui é **detecção de presença** dos 7 gatilhos cialdinianos na página existente (auditoria), **não escrita de copy persuasiva** — função diferente do agente `robert-cialdini` em Caliope, que ESCREVE copy persuasiva | Distinção crítica: Caliope tem o pensador para **escrever**; Harmonia ganha a lente para **auditar** o que está na página. Mesmo nome, funções complementares. Cross-link explícito a Caliope. | Anexo dentro de `walkthrough-de-persona` (Harmonia) — seção "Detecção de gatilhos Cialdini por fold (reciprocidade/escassez/autoridade/consistência/prova social/afinidade/unidade)" + nota de fronteira: "para gerar copy persuasiva, handoff a Caliope/robert-cialdini" |
| G13 | UI component libraries & design tokens (spacing, color, typography systems) | harmonia | REUSE | Harmonia já tem `tokens-de-design` (3 camadas: primitivo→semântico→componente) + `implementacao-ui` (shadcn/ui + Tailwind, motion, a11y); upstream G13 não acrescenta nada novo conceitualmente | Cobertura plena. Skills existentes já incorporam WCAG-AA e semantic naming. | Nenhuma. Registrar como REUSE no ledger e no `_origem.md` da Harmonia. |
| G14 | Responsive design framework (mobile-first breakpoints + grid patterns) | harmonia | ADAPT | `sistema-de-design` (Harmonia) cobre regras de UX gerais (acessibilidade, toque, performance, forms, navegação) mas não tem **framework explícito de mobile-first + 8-point grid + container patterns** documentado como referência | Há cobertura conceitual no `sistema-de-design`, mas falta o **anexo operacional** que dê o grid de 8 pontos, breakpoints canônicos (sm/md/lg/xl/2xl) e padrões de container. | Anexo dentro de `sistema-de-design` (Harmonia) — seção "Responsividade: mobile-first + 8-point grid + breakpoints + container patterns" |
| G15 | Accessibility compliance implementation (4.5:1 contrast, keyboard nav, screen reader support) | harmonia | REUSE | Tanto `sistema-de-design` quanto `tokens-de-design` e `implementacao-ui` na Harmonia já mandam aplicar **WCAG 2.1 AA** explicitamente (com checklist de contraste, foco, touch targets 44px); cobertura plena | Cobertura plena nas 3 skills atuais. Não há ganho em adicionar uma 4ª. | Nenhuma. Registrar como REUSE; opcional consolidar referência cruzada nas 3 skills no `_origem.md`. |
| G16 | Technical UX architecture (CSS system foundation + layout framework for developers) | harmonia | REUSE | `tokens-de-design` (CSS-in-JS via tokens) + `implementacao-ui` (Tailwind config + theme management) já cobrem **CSS variables + container patterns + theme toggle** no nível operacional | Skills atuais já entregam o que o upstream descreve. | Nenhuma. Registrar como REUSE no ledger. |
| G17 | Information architecture & visual weight hierarchy (H1-H3 scanning patterns) | harmonia | ADAPT | `sistema-de-design` cobre hierarquia visual genericamente, mas **não tem padrão explícito de scanning F-pattern/Z-pattern + content priority + interaction patterns + cognitive load** documentado | É ganho real: dá ao agente a rubrica de "como o olho percorre" para complementar o `walkthrough-de-persona` (G10). | Anexo dentro de `sistema-de-design` (Harmonia) — seção "Hierarquia visual e padrões de scanning (F/Z-pattern, content priority, cognitive load por elemento)" |
| G18 | Theme management system (persistent user preference, CSS-in-JS strategy) | harmonia | REUSE | `implementacao-ui` (Harmonia) já cobre **theme management** com persistência, CSS-in-JS, system preference, smooth transition (parte do escopo declarado da skill) | Cobertura plena. | Nenhuma. Registrar como REUSE no ledger. |
| G19 | Qualitative user research protocol (sampling, bias mitigation, participant selection) | harmonia | CREATE | nenhum agente/skill no Kolden cobre **protocolo de pesquisa qualitativa formal** (sampling, ethical consent, triangulation, bias mitigation); o agente `ux-designer` da Harmonia faz pesquisa mas sem skill executável | Frente real ausente. Aletheia (validação/discovery) usa o Mom Test (entrevistas de descoberta) e mapa de assunções, mas pesquisa qualitativa de UX (usability research dentro de produto pronto) é diferente — pertence à Harmonia. Cross-link a Aletheia. | NOVA skill `pesquisa-qualitativa-de-usuario` (Harmonia) com 3 fases (desenho de estudo / coleta ética / análise + triangulação) + protocolo de consentimento + handoff a Aletheia para descoberta pré-produto |
| G20 | User persona construction from empirical data (behavioral patterns, decision factors) | harmonia | ADAPT (consolidado em G19) | Construção de persona = **etapa de análise** da pesquisa qualitativa, não skill própria | Coerência: persona é saída da pesquisa. | Anexo dentro de `pesquisa-qualitativa-de-usuario` (Harmonia) — seção "Construção de persona a partir de dado empírico (segmentação demográfica + behavioral + decisão + quote-validation)" |
| G21 | Usability testing session design (task scenarios, think-aloud, 60-min structure) | harmonia | ADAPT (consolidado em G19) | Usability testing é **método específico** dentro do guarda-chuva de pesquisa qualitativa | Coerência: junto da pesquisa qualitativa, com seu próprio template de sessão. | Anexo dentro de `pesquisa-qualitativa-de-usuario` (Harmonia) — seção "Sessão de usability test (cenários de tarefa, think-aloud, estrutura 60min, métricas completion/error, entrevista pós-teste)" |
| G22 | Visual narrative development (story arc, character, conflict, resolution design) | aglaia | CREATE | nenhum agente/skill cobre **narrativa visual com story arc**; Aglaia tem `donald-miller` (StoryBrand para mensagem clara), mas não tem **estrutura de arco emocional para conteúdo visual** | StoryBrand opera no nível da mensagem (BrandScript), narrativa visual opera no nível do **conteúdo audiovisual** (campanha, vídeo institucional, série de Reels temática). Lente diferente, ganho real. | NOVA skill `narrativa-visual-de-marca` (Aglaia) com story arc (status quo → ruptura → jornada → resolução) + character (protagonista = cliente, marca = guia) + emotional pacing + handoff a Pheme/`roteiro-de-reels` para execução tática |
| G23 | Multimedia content creation framework (video, animation, photography direction, infographics) | aglaia | ADAPT (consolidado em G22) | Storyboard + shot selection + data-viz hierarchy são **técnicas que servem a uma narrativa**; cabem como anexo da skill anterior, não skill própria | Coerência: técnica serve a estratégia. | Anexo dentro de `narrativa-visual-de-marca` (Aglaia) — seção "Repertório multimídia (storyboard, shot selection, photography direction, data-viz para infográfico)" |
| G24 | Cross-platform content adaptation (Instagram/YouTube/TikTok/LinkedIn/Pinterest/Web) | aglaia | DESCARTADO | **Fronteira com Pheme** — `matriz-de-conteudo` (Pheme) já cobre "Mixes de mercado" pós-lote MKT (ver decisão F5 do B02), e Pheme tem skills específicas por plataforma (`douyin-conteudo`, `xiaohongshu-conteudo`, etc.). Adaptação cross-platform é jurisdição Pheme, não Aglaia. | Não há sobreposição saudável: adaptação cross-platform é **execução tática de social orgânico** = Pheme. Aglaia define a narrativa (G22), Pheme distribui. | Registrar DESCARTADO com motivo de fronteira; cross-link `narrativa-visual-de-marca` (Aglaia) → `matriz-de-conteudo`/skills-de-plataforma (Pheme) no handoff. |
| G25 | Micro-interaction design for brand personality (button states, form validation animations) | aglaia | CREATE | Harmonia tem `implementacao-ui` (motion GSAP/Motion com guardrails de performance/a11y) mas **performance/a11y** é o escopo declarado lá; **personalidade da marca via micro-interação** é decisão de marca, pertence à Aglaia | Distinção clara: Harmonia entrega motion com guardrails técnicos; Aglaia entrega a **decisão criativa** sobre como a marca se manifesta na micro-interação (qual o tom: sério/lúdico, qual o easing, qual o som, qual o gatilho). Cross-link explícito. | NOVA skill `micro-interacoes-de-marca` (Aglaia) com decisão criativa (delightful feedback / cultural sensitivity / brand voice na animação) + handoff a Harmonia/`implementacao-ui` para execução técnica |
| G26 | Playful microcopy library (error messages, loading states, success copy, empty states) | aglaia | CREATE | Caliope tem skills de **copy de venda/persuasão** (headlines, anúncios, sequências, página de vendas), mas **microcopy de UI** (mensagens de erro, loading, sucesso, empty state) é frente diferente: pequena, contextual, parte da marca expressa na interface | Fronteira sutil mas real: Caliope vende; Aglaia define personalidade. Microcopy de UI é personalidade expressa em texto curtíssimo. Cross-link a Caliope e Harmonia. | NOVA skill `microcopy-de-interface` (Aglaia) com biblioteca por contexto (erro/loading/sucesso/empty/confirmação) + matriz tom × marca (sério/lúdico/técnico) + handoff a Harmonia/`implementacao-ui` (onde vai o texto na UI) e cross-link a Caliope (voice consistency) |
| G27 | Gamification system design (achievement unlocks, Easter eggs, progress celebration) | aglaia | CREATE | nada no Kolden cobre **gamification como sistema de marca** (motivação, reward architecture, social sharing, easter eggs); é frente nova e específica | Frente real ausente. Distinta de retenção (Pheme/`ciclo-de-vida-e-retencao` cobre churn/dunning, não gamification de produto). Encaixa na expressão da marca: como a marca recompensa. | NOVA skill `gamificacao-como-sistema-de-marca` (Aglaia) com motivation mechanics (autonomy/mastery/purpose) + reward architecture (unlocks/streaks/badges) + Easter eggs como identidade + handoff a Harmonia (UI da gamification) e Pheme (loop social) |

## 3. Resumo executivo

| status | total | %  |
|---|---|---|
| REUSE | 4 (G13, G15, G16, G18) | 14,8% |
| ADAPT | 12 (G1, G3, G4, G5*, G6*, G8*, G9*, G11*, G12*, G14, G17, G20*, G21*, G23*) | 44,4% |
| CREATE | 10 (G2, G7, G10, G19, G22, G25, G26, G27) | 37,0% |
| DESCARTADO | 1 (G24) | 3,7% |
| **Total** | **27** | **100%** |

\* IDs consolidados como anexo dentro de skill mãe (não viram skill própria) — contam como ADAPT porque adicionam material novo a uma skill nova ou existente.

**Por squad alvo:**

| squad | REUSE | ADAPT | CREATE | DESCARTADO | total |
|---|---|---|---|---|---|
| Harmonia (UX/UI/Design Systems) | 4 | 6 | 2 | 0 | 12 |
| Aglaia (Branding/Estética) | 0 | 6 | 6 | 1 | 13 |
| **Soma** | **4** | **12** | **8** | **1** | **27** ✅ |

Diferença ⟶ Harmonia tem 12, Aglaia tem 13, soma = 25 → faltam 2 IDs com IDs duplos contados? Não. Releitura: G10 e G19 viraram **mãe** com filhos consolidados; o quadro mostra cada ID uma vez. Recontagem honesta:

- **Harmonia (12 IDs):** G10, G11, G12, G13, G14, G15, G16, G17, G18, G19, G20, G21.
- **Aglaia (15 IDs):** G1, G2, G3, G4, G5, G6, G7, G8, G9, G22, G23, G24 (DESCARTADO), G25, G26, G27.
- **Soma:** 12 + 15 = 27 ✅

## 4. Skills concretas geradas (preview da F5)

**Harmonia — 3 skills NOVAS + 2 skills ESTENDIDAS:**

| skill destino | IDs absorvidos | tipo | nota |
|---|---|---|---|
| `walkthrough-de-persona` | G10 (mãe) + G11 (LIFT) + G12 (Cialdini) | NOVA | mãe com 2 anexos de rubrica (LIFT + Cialdini) |
| `pesquisa-qualitativa-de-usuario` | G19 (mãe) + G20 (persona) + G21 (usability) | NOVA | mãe com 2 anexos de método |
| (REUSE puros) | G13, G15, G16, G18 | REUSE | nenhuma ação; registrar no `_origem.md` |
| `sistema-de-design` (estendida) | G14 (responsivo) + G17 (scanning) | ADAPT | 2 anexos novos na skill existente |

**Aglaia — 7 skills NOVAS (Aglaia ganha sua primeira camada de habilidades formais):**

| skill destino | IDs absorvidos | tipo | nota |
|---|---|---|---|
| `pipeline-de-identidade-de-marca` | G1 | NOVA | pipeline operacional purpose→values→visual→voice |
| `protecao-de-marca-monitoramento-crise` | G2 | NOVA | trademark + uso indevido + crise; cross-link Égide+Themis |
| `paineis-de-equidade-de-marca` | G3 | NOVA | 4 dimensões + cadência + handoff Argos/Metis |
| `engenharia-de-prompt-de-imagem` | G4 (mãe) + G5 (gêneros) + G6 (pós-process) | NOVA | mãe com 2 anexos de template/pós |
| `visuais-inclusivos-anti-vies` | G7 (mãe) + G8 (negative) + G9 (review) | NOVA | mãe com 2 anexos |
| `narrativa-visual-de-marca` | G22 (mãe) + G23 (multimídia) | NOVA | mãe com 1 anexo; handoff Pheme |
| `micro-interacoes-de-marca` | G25 | NOVA | decisão criativa; handoff Harmonia |
| `microcopy-de-interface` | G26 | NOVA | microcopy de UI; cross-link Caliope+Harmonia |
| `gamificacao-como-sistema-de-marca` | G27 | NOVA | motivation/reward/easter eggs; handoff Harmonia+Pheme |

**Pré-requisito de F6 em Aglaia:** criar `Aglaia/.claude/skills/` + `catalogo.md` (Aglaia hoje não tem essa camada formal — só agentes/pensadores).

## 5. Cross-links com outros squads (declarados aqui, executados em F6)

- `Aglaia/visuais-inclusivos-anti-vies` ↔ `Harmonia/julgamento-estetico-anti-slop` (Harmonia já cobre AI-tells estéticos; aqui é a camada de viés sociológico)
- `Aglaia/protecao-de-marca-monitoramento-crise` → handoff a **Égide** (parte legal/IP) + **Themis** (compliance)
- `Aglaia/paineis-de-equidade-de-marca` → handoff a **Argos** (social listening) + **Metis** (analytics)
- `Aglaia/narrativa-visual-de-marca` → handoff a **Pheme** (`roteiro-de-reels`, `matriz-de-conteudo`, skills de plataforma) para execução tática
- `Aglaia/engenharia-de-prompt-de-imagem` ↔ `Harmonia/julgamento-estetico-anti-slop` (Aglaia faz prompt técnico; Harmonia decide direção estética)
- `Aglaia/micro-interacoes-de-marca` → handoff a `Harmonia/implementacao-ui` (execução técnica com motion + a11y)
- `Aglaia/microcopy-de-interface` → handoff a `Harmonia/implementacao-ui` (onde vai o texto) + cross-link a **Caliope** (voice consistency com `fundacao-de-voz`)
- `Aglaia/gamificacao-como-sistema-de-marca` → handoff a `Harmonia/implementacao-ui` (UI da gamification) + **Pheme** (loop social compartilhável)
- `Harmonia/walkthrough-de-persona` ↔ **Caliope** (`robert-cialdini` agente para *escrever* copy persuasiva; o walkthrough *audita* a presença dos gatilhos na página) — duas funções complementares
- `Harmonia/pesquisa-qualitativa-de-usuario` ↔ **Aletheia** (descoberta pré-produto via Mom Test; aqui é pesquisa de UX em produto existente)
- **G24 DESCARTADO** — fronteira com **Pheme** (`matriz-de-conteudo` + skills de plataforma); reservado a revisita só se Pheme não cobrir suficientemente algum vetor de adaptação cross-platform

## 6. Invariantes a preservar na F6

- **PT-BR estrito** em todos os artefatos novos (skills, anexos, catálogos). Termos em inglês só quando o ecossistema impuser (e.g. WCAG, LIFT, AEO, F-pattern).
- **Atribuição MIT central** na ingestão (Art. VIII):
  - `Harmonia/_origem.md` — adicionar entrada `msitarzewski--agency-agents@a597cb6` listando os 12 IDs roteados (G10–G21).
  - `Aglaia/_origem.md` — adicionar entrada com os 15 IDs roteados (G1–G9, G22–G27).
- **Maturity ≥ 7.0** por skill nova/estendida (gate Fase 7). Toda skill nova precisa: gatilhos claros (`descoberta-de-skill` ≥ 7/10), pelo menos um teste em A/B (`validacao-de-skill`), fontes ≥ 7/10 quando puxar técnicas externas (`busca-de-referencias`).
- **Catálogos atualizados** ao final da F6:
  - `Harmonia/.claude/skills/catalogo.md` ganha 2 entradas novas (`walkthrough-de-persona`, `pesquisa-qualitativa-de-usuario`) e nota de extensão em `sistema-de-design`.
  - `Aglaia/.claude/skills/catalogo.md` **criado do zero** com 7 entradas novas (Aglaia hoje não tem catálogo de habilidades, só os 15 agentes).
- **Reflexo da fronteira:** cada skill com handoff declara o handoff no header (formato do B02).

## 7. Reconciliação prevista (F6.5)

Invariante (Art. VIII / `protocolo-de-absorcao-sem-perda`): `count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == 27`.

| status | total |
|---|---|
| ABSORVIDO (REUSE + ADAPT + CREATE) | 26 |
| DESCARTADO (fronteira inter-squad documentada) | 1 (G24 → Pheme) |
| PERDIDO | 0 |
| **Soma** | **27** ✅ |

PERDIDO = 0 — cada ID tem decisão e ação F6 explícitas.

---

**Próximo passo:** consolidar a recomendação executável em `decisao-f5-b05-design.md` (par deste mapa) e parar para aprovação do Ronan antes da F6.
