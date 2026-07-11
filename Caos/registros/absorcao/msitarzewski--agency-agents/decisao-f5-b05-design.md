---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F5 — Decisão de aplicação · B05 Harmonia + Aglaia (design)

> PARA AQUI. Aguardando aprovação Ronan (Art. III da Constituição do Caos).
> **Origem:** [`mapa-de-decisao-b05-design.md`](./mapa-de-decisao-b05-design.md) · **Inventário:** [`inventario-design.md`](./inventario-design.md)

## TL;DR

- Inventário upstream: **27 IDs** (G1–G27) em **9 agentes** da divisão `design/`.
- Decisão: **4 REUSE / 12 ADAPT / 10 CREATE / 1 DESCARTADO** — o único descartado (G24) é fronteira com Pheme (adaptação cross-platform de social), registrado para revisita só se necessário.
- **2 squads tocados:** Harmonia (UX/UI/Design Systems, 8 agentes) e Aglaia (Branding/Estética, 15 agentes).
- Resultado estrutural: **10 skills novas** (2 Harmonia + 7 Aglaia + 1 ADAPT-estendida em Harmonia que vira 1 anexo duplo), **1 skill Harmonia estendida** (`sistema-de-design` ganha 2 anexos), criação do esqueleto `.claude/skills/` na Aglaia (não existia).
- **Aglaia ganha sua primeira camada de habilidades formais** (hoje só tem agentes/pensadores históricos; nenhuma skill executável).
- **Harmonia ganha auditoria de página como agente** (`walkthrough-de-persona` com rubricas LIFT e Cialdini) e **pesquisa qualitativa formal** (`pesquisa-qualitativa-de-usuario` com persona-build e usability test).

## Plano por squad (F6)

### Harmonia — 2 skills NOVAS, 1 skill ESTENDIDA, 4 REUSE puros

**Skills NOVAS:**

| skill destino | IDs upstream consolidados | foco |
|---|---|---|
| `walkthrough-de-persona` | G10 (mãe), G11 (LIFT), G12 (Cialdini) | simulação cognitiva de persona percorrendo a página com 3 modos (5-second test / scroll monologue / decision-point analysis); produz relatório com personas-arquétipo e timestamps de fricção; rubricas LIFT (Value Prop/Relevance/Clarity/Urgency/Anxiety/Distraction por fold) e Cialdini-presença (7 gatilhos por fold) como anexos executáveis. Cross-link explícito a Caliope/`robert-cialdini` para escrita de copy persuasiva quando o walkthrough detectar gap. |
| `pesquisa-qualitativa-de-usuario` | G19 (mãe), G20 (persona-build), G21 (usability test) | protocolo de pesquisa qualitativa em 3 fases (desenho de estudo / coleta ética / análise + triangulação); anexos com construção de persona a partir de dado empírico e estrutura de sessão de usability test (60min, think-aloud, métricas completion/error, entrevista pós-teste). Cross-link a Aletheia para descoberta pré-produto (Mom Test). |

**Skill ESTENDIDA:**

| skill destino | IDs upstream consolidados | tipo da edição |
|---|---|---|
| `sistema-de-design` | G14 (responsivo + 8-point grid), G17 (scanning patterns + cognitive load) | §"Responsividade: mobile-first + 8-point grid + breakpoints canônicos (sm/md/lg/xl/2xl) + container patterns" + §"Hierarquia visual e padrões de scanning (F/Z-pattern, content priority, cognitive load por elemento)" |

**REUSE puros (nenhuma ação F6, registrar no ledger):**

- G13 → `tokens-de-design` + `implementacao-ui` (3 camadas de tokens + shadcn/ui/Tailwind + WCAG-AA já cobrem)
- G15 → todas as 4 skills da Harmonia já mandam aplicar WCAG 2.1 AA explicitamente
- G16 → `tokens-de-design` (CSS-in-JS) + `implementacao-ui` (Tailwind + theme management) cobrem
- G18 → `implementacao-ui` já cobre theme management com persistência + CSS-in-JS + system preference

### Aglaia — 7 skills NOVAS (criação do esqueleto `.claude/skills/`)

**Pré-requisito de F6:** criar `Aglaia/.claude/skills/` + `catalogo.md` (Aglaia hoje não tem essa camada formal; tem 15 agentes/pensadores mas zero habilidade executável).

**Skills NOVAS:**

| skill destino | IDs upstream consolidados | foco |
|---|---|---|
| `pipeline-de-identidade-de-marca` | G1 | pipeline operacional purpose→values→visual→voice em 4 fases com gates; transforma o conceitual de Aaker/Wheeler em entrega executável (não substitui os pensadores, é a skill que eles invocam quando o trabalho é fazer, não decidir) |
| `protecao-de-marca-monitoramento-crise` | G2 | 3 frentes: trademark watch + uso indevido + protocolo de crise por janelas (30min/2h/24h); cross-link a Égide (parte legal/IP) e Themis (compliance). Frente nova — Aglaia constrói, esta skill protege |
| `paineis-de-equidade-de-marca` | G3 | 4 dimensões CBBE (awareness/association/quality/loyalty) + cadência trimestral + instrumentação (survey/social listening/sales lift); handoff a Argos (listening) e Metis (analytics) |
| `engenharia-de-prompt-de-imagem` | G4 (mãe), G5 (gêneros), G6 (pós-process) | framework de 6 camadas (subject→environment→lighting→style→composition→post-process); anexo "Templates por gênero" (portrait/product/landscape/fashion) e anexo "Pós-processamento e estética de era/film stock"; bridge para Harmonia/`julgamento-estetico-anti-slop` (Harmonia decide estética, Aglaia executa prompt) |
| `visuais-inclusivos-anti-vies` | G7 (mãe), G8 (negative prompting), G9 (review checklist) | framework counter-stereotype + physical reality mandates; anexo "Negative prompting: clone-face, gibberish-text, physics violations" + anexo "Checklist de revisão pós-geração (sociological audit + community validation)". Frente nova e crítica — viés de IA é risco de marca |
| `narrativa-visual-de-marca` | G22 (mãe), G23 (multimídia) | story arc (status quo → ruptura → jornada → resolução) + character (cliente=protagonista, marca=guia) + emotional pacing; anexo "Repertório multimídia (storyboard, shot selection, photography direction, data-viz para infográfico)"; handoff a Pheme para execução tática (`roteiro-de-reels`, `matriz-de-conteudo`) |
| `micro-interacoes-de-marca` | G25 | decisão criativa sobre como a marca se manifesta na micro-interação (delightful feedback / cultural sensitivity / brand voice na animação); handoff a Harmonia/`implementacao-ui` para execução técnica (motion + a11y) |
| `microcopy-de-interface` | G26 | biblioteca por contexto (erro/loading/sucesso/empty/confirmação) + matriz tom × marca (sério/lúdico/técnico); handoff a Harmonia/`implementacao-ui` (onde o texto vive) + cross-link a Caliope (voice consistency com `fundacao-de-voz`) |
| `gamificacao-como-sistema-de-marca` | G27 | motivation mechanics (autonomy/mastery/purpose) + reward architecture (unlocks/streaks/badges) + Easter eggs como identidade + social sharing; handoff a Harmonia (UI da gamification) e Pheme (loop social compartilhável) |

> **Nota de contagem:** 9 entradas na tabela acima (não 7) — G4/G5/G6 viram 1 skill (`engenharia-de-prompt-de-imagem`); G7/G8/G9 viram 1 skill (`visuais-inclusivos-anti-vies`); G22/G23 viram 1 skill (`narrativa-visual-de-marca`). G1, G2, G3, G25, G26, G27 viram 1 skill cada. **Total: 9 skills novas em Aglaia.**

## Reconciliação prevista (F6.5)

Invariante (Art. VIII / `protocolo-de-absorcao-sem-perda`): `count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == 27`.

| status | total |
|---|---|
| ABSORVIDO (REUSE + ADAPT + CREATE) | 26 |
| DESCARTADO (fronteira inter-squad documentada) | 1 |
| PERDIDO | 0 |
| **Soma** | **27** ✅ |

**DESCARTADO** com motivo registrado:
- **G24** (Cross-platform content adaptation — Instagram/YouTube/TikTok/LinkedIn/Pinterest/Web) → fronteira **Pheme**. A `matriz-de-conteudo` (Pheme) já ganhou "Mixes de mercado" no lote B02 (MKT-G41/G66/G68/G70/G74/G81), e Pheme tem skills específicas por plataforma. Adaptação cross-platform é jurisdição Pheme; Aglaia define a narrativa (G22), Pheme distribui. Reservado a revisita só se um vetor específico de adaptação não estiver coberto.

PERDIDO = 0 — cada ID tem decisão e ação F6 explícitas.

## Invariantes a preservar

- **PT-BR estrito** em todos os artefatos novos (skills, anexos, catálogos, fronteiras). Termos em inglês só quando o ecossistema impuser (e.g. WCAG, LIFT, CBBE, F-pattern, easter egg).
- **Atribuição MIT central** na ingestão (Art. VIII):
  - `Harmonia/_origem.md` — adicionar entrada `msitarzewski--agency-agents@a597cb6` listando os 12 IDs roteados (G10, G11, G12, G13, G14, G15, G16, G17, G18, G19, G20, G21).
  - `Aglaia/_origem.md` — criar/adicionar entrada listando os 15 IDs roteados (G1, G2, G3, G4, G5, G6, G7, G8, G9, G22, G23, G24 [descartado], G25, G26, G27).
- **Maturity ≥ 7.0** por skill nova/estendida (gate Fase 7 — testador). Toda skill nova precisa:
  - gatilhos claros (`descoberta-de-skill` ≥ 7/10) — especialmente crítico para `walkthrough-de-persona` (não confundir com escrita de copy) e `pesquisa-qualitativa-de-usuario` (não confundir com Mom Test da Aletheia)
  - pelo menos um teste em A/B (`validacao-de-skill`)
  - fontes ≥ 7/10 quando puxar técnicas externas (`busca-de-referencias`) — LIFT (WiderFunnel), 7 gatilhos Cialdini (Influence, 2021), 5-second test (UX research literature), inclusive design (Microsoft Inclusive Design Toolkit), CBBE (Keller)
- **Infisical obrigatório** para qualquer credencial em skill nova (ex: APIs de prompt-of-image se a skill chamar Midjourney/DALL-E/SD via API; APIs de social listening em `protecao-de-marca-monitoramento-crise`) — Art. VII.
- **Catálogos atualizados** ao final da F6:
  - `Harmonia/.claude/skills/catalogo.md` ganha 2 linhas novas + nota de extensão na linha de `sistema-de-design`.
  - `Aglaia/.claude/skills/catalogo.md` **criado do zero** com bloco único de 9 skills (`pipeline-de-identidade-de-marca`, `protecao-de-marca-monitoramento-crise`, `paineis-de-equidade-de-marca`, `engenharia-de-prompt-de-imagem`, `visuais-inclusivos-anti-vies`, `narrativa-visual-de-marca`, `micro-interacoes-de-marca`, `microcopy-de-interface`, `gamificacao-como-sistema-de-marca`).
- **Fronteiras inter-squad explícitas** em cada skill com handoff (header da skill declara `handoff:` e/ou `cross-link:`):
  - `Aglaia/visuais-inclusivos-anti-vies` ↔ `Harmonia/julgamento-estetico-anti-slop` (anti-slop estético × anti-viés sociológico — complementares)
  - `Aglaia/protecao-de-marca-monitoramento-crise` → handoff **Égide** (legal/IP) + **Themis** (compliance)
  - `Aglaia/paineis-de-equidade-de-marca` → handoff **Argos** (social listening) + **Metis** (analytics)
  - `Aglaia/narrativa-visual-de-marca` → handoff **Pheme** (`roteiro-de-reels`, `matriz-de-conteudo`, skills de plataforma)
  - `Aglaia/engenharia-de-prompt-de-imagem` ↔ `Harmonia/julgamento-estetico-anti-slop` (decisão estética × execução técnica)
  - `Aglaia/micro-interacoes-de-marca` → handoff `Harmonia/implementacao-ui` (motion + a11y)
  - `Aglaia/microcopy-de-interface` → handoff `Harmonia/implementacao-ui` + cross-link **Caliope/`fundacao-de-voz`**
  - `Aglaia/gamificacao-como-sistema-de-marca` → handoff `Harmonia/implementacao-ui` + **Pheme** (loop social)
  - `Harmonia/walkthrough-de-persona` ↔ **Caliope/`robert-cialdini`** (auditar presença × escrever copy — funções complementares)
  - `Harmonia/pesquisa-qualitativa-de-usuario` ↔ **Aletheia** (pesquisa de UX em produto × descoberta pré-produto)
- **Ledger atualizado**: `Caos/dados/repositorios-absorvidos.yaml` ganha o bucket B05 com timestamps F4/F5 e a contagem 27 = 26 ABSORVIDO + 1 DESCARTADO + 0 PERDIDO.

## Risco crítico de F6 (gate antes da escrita)

**Risco #1 — Confusão semântica Cialdini.** `Caliope/agents/robert-cialdini.md` (pensador histórico que **escreve** copy persuasiva) ≠ `Harmonia/walkthrough-de-persona` anexo "detecção de gatilhos Cialdini por fold" (rubrica de auditoria que **detecta presença** dos gatilhos numa página existente). Os dois precisam coexistir com gatilhos de invocação distintos e a fronteira documentada no header de ambos. O `descoberta-de-skill` precisa rodar com nota alta para os dois.

**Risco #2 — Confusão semântica pesquisa qualitativa.** `Harmonia/pesquisa-qualitativa-de-usuario` (UX research em produto pronto: usability test, persona-build empírica) ≠ `Aletheia/roteiro-de-entrevista` + `Aletheia/mapa-de-assuncoes` (Mom Test: descoberta pré-produto, validar assunção, NUNCA perguntar sobre a ideia ou o futuro). Fronteira documentada no header.

**Risco #3 — Aglaia sem catálogo prévio.** É o primeiro lote a tocar a camada `.claude/skills/` da Aglaia. O `catalogo.md` precisa nascer **antes** das 9 skills serem escritas (ordem topológica: catálogo → skills, não o inverso). Espelhar a anatomia do `Pheme/.claude/skills/catalogo.md` (blocos por eixo) — neste caso, 1 bloco único "Branding & Estética" porque ainda não há eixos múltiplos.

**Risco #4 — Sobreposição motion.** `Aglaia/micro-interacoes-de-marca` precisa **declarar explicitamente** que não escreve código de motion — quem implementa é `Harmonia/implementacao-ui`. Sem essa fronteira no header, agente da Aglaia pode tentar entregar TSX. Repetir no header da Harmonia que decisão criativa de personalidade vem da Aglaia.

## Próximo passo

Aguardo OK do Ronan para executar **F6 do bucket B05** (aplicação): construção das **11 skills novas** (2 Harmonia + 9 Aglaia) + **1 skill Harmonia estendida** + criação do **esqueleto `.claude/skills/` na Aglaia**, com gate de qualidade N0→N6 da cascata da Fase 5 (Constituição v2.2.0). Após F6, executar **F6.5** (reconciliação anti-perda 27=26+1+0) e **F7** (registro no ledger + memória dos dois squads + `_origem.md` Harmonia e Aglaia).

Buckets paralelos abertos: B04 (Aletheia+Prometeu product) e B06 (Emporos+Pluto sales) em F4+F5 separado; consolidação executiva final ocorre no F5 consolidado dos 15 buckets.
