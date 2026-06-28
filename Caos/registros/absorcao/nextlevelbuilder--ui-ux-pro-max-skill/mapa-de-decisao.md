# F4 — Mapa de decisão

- **slug:** nextlevelbuilder--ui-ux-pro-max-skill | **sha:** 9fd25fe… | **rota:** A
- Base de comparação: `dados/registro-de-entidades.yaml` + squads existentes.
- **Achado-chave:** `harmonia` (UX/UI) tem 8 agentes (brad-frost, dan-mall, design-system-architect, ui-engineer, ux-designer, visual-generator…) mas **`.claude/skills/` VAZIO** — não há skill/dataset equivalente. Logo, todo o miolo de design intelligence entra como **ADAPT** (skill+dados novos sobre agentes existentes), não REUSE.
- **Viés aplicado:** sem match item-a-item, prefiro ADAPT/CREATE a REUSE.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | harmonia | skill orquestradora de decisão UI/UX que harmonia não possui (só tem personas) |
| G2 | ADAPT | harmonia | motor BM25/regex vira engine de busca da base de design da harmonia |
| G3 | ADAPT | harmonia | gerador de design system com reasoning — capacidade nova p/ design-system-architect |
| G4 | ADAPT | harmonia | CLI de busca por domínio/stack acopla aos agentes da harmonia |
| G5 | ADAPT | harmonia | 84 estilos/161 paletas/73 fontes/99 UX — base de conhecimento inédita p/ harmonia |
| G6 | ADAPT | harmonia | guidelines de 17 stacks reforçam ui-engineer (cruza c/ dedalo p/ frameworks) |
| G7 | ADAPT | harmonia | padrão Master+overrides resolve memória de design entre sessões |
| G8 | ADAPT | harmonia | 99 regras UX + anti-padrões = checklist de QA que ux-designer ainda não tem |
| G9 | CREATE | vendor | templates de distribuição p/ 19 plataformas — config inerte, vira pacote vendor (não capacidade de squad) |
| G10 | ADAPT | harmonia | shadcn/Tailwind/canvas é exatamente o domínio do ui-engineer (sem skill hoje) |
| G11 | ADAPT | harmonia | automação de componentes shadcn p/ ui-engineer |
| G12 | ADAPT | harmonia | gerador de tailwind.config p/ ui-engineer |
| G13 | ADAPT | harmonia | catálogo shadcn/theming/a11y enriquece referências da harmonia |
| G14 | ADAPT | harmonia | referências Tailwind (utilities/responsive/custom) p/ ui-engineer |
| G15 | ADAPT | aglaia | filosofia de composição visual "canvas" alinha melhor com branding/visual da aglaia |
| G16 | ADAPT | harmonia | tokens em 3 camadas é o core do design-system-architect (Brad Frost/Dan Mall já no time) |
| G17 | ADAPT | harmonia | geração JSON→CSS de tokens operacionaliza o design-system-architect |
| G18 | ADAPT | harmonia | linter de hardcoded vs token = guardrail de design system |
| G19 | ADAPT | harmonia | referências de tokens/specs/estados completam a doc da harmonia |
| G20 | ADAPT | orfeu | geração de slides com arco emocional Duarte/pattern-break casa com storytelling (Duarte já em orfeu) |
| G21 | ADAPT | orfeu | validadores de token de slide acompanham G20 (secundário: harmonia) |
| G22 | ADAPT | aglaia | busca de imagem de fundo (Pexels/Unsplash) serve criação visual da aglaia |
| G23 | ADAPT | aglaia | skill de marca (voz/identidade/messaging) é o núcleo da aglaia (15 personas de branding) |
| G24 | ADAPT | aglaia | injeção de contexto de marca em prompts — tooling p/ aglaia |
| G25 | ADAPT | aglaia | sync brand-guidelines→tokens conecta aglaia↔harmonia (ponte marca→design system) |
| G26 | ADAPT | aglaia | validação de asset (naming/formato) p/ governança de marca |
| G27 | ADAPT | aglaia | extração/comparação de cores p/ conformidade de paleta de marca |
| G28 | ADAPT | aglaia | referências de brandbook (voz/messaging/logo/cor/tipografia) reforçam o brandbook da aglaia |
| G29 | ADAPT | aglaia | template starter de brand guidelines — molde p/ aglaia (cruza c/ sobre-a-empresa/marca) |
| G30 | CREATE | aglaia | skill roteadora "design" unifica branding+UI; vira orquestrador transversal aglaia↔harmonia (sem equivalente) |
| G31 | ADAPT | aglaia | geração de logo (55 estilos) p/ visual-generator/branding — dep. Gemini via Infisical |
| G32 | ADAPT | aglaia | CIP (50 deliverables/mockups) é papelaria de identidade corporativa = aglaia |
| G33 | ADAPT | harmonia | geração de ícones SVG p/ ui-engineer (sistema de ícones do produto); secundário aglaia |
| G34 | ADAPT | pheme | social photos multi-plataforma é entrega de social media (pheme) |
| G35 | ADAPT | aglaia | prompt-engineering de logo/CIP + psicologia de cor p/ branding |
| G36 | ADAPT | pheme | banner-design (social/ads/web) é criativo de social/ads — pheme primário, aglaia secundário |
| G37 | ADAPT | pheme | tabela de tamanhos/estilos de banner por plataforma p/ pheme |
| G38 | ADAPT | orfeu | slides estratégicos HTML+Chart.js = pitch decks (orfeu); secundário harmonia |
| G39 | ADAPT | orfeu | fórmulas de copy de slide (PAS/AIDA/FAB) + estratégias p/ orfeu (cruza caliope) |
| G40 | CREATE | vendor | CLI installer multi-plataforma — ferramenta inerte de distribuição, não vira agente |

**Resumo da decisão:** dominante **ADAPT** (33), com **CREATE** (3: G9, G30, G40) e **0 REUSE** (harmonia sem skills equivalentes → REUSE seria perda silenciosa). Distribuição por alvo: **harmonia** (16 — recipiente principal de design intelligence + tokens + ui-styling), **aglaia** (12 — marca/logo/CIP), **orfeu** (4 — slides/pitch), **pheme** (3 — banner/social photos), **vendor** (2 — CLI + templates de plataforma).

**⚠ Sobreposição sinalizada:** o repo-irmão **Leonxlnx--taste-skill** (design/"taste") também foi mapeado para **harmonia**. Os dois aterrissam no mesmo squad com temas adjacentes (gosto/qualidade visual vs. base de regras+busca). Na fase de escrita (F6), **coordenar p/ evitar skills duplicadas na harmonia** — provável consolidação: taste-skill = critério/julgamento de qualidade; este repo = base de dados + engine + tokens + UX rules. Decidir hierarquia (uma skill "design-intelligence" com sub-módulos) antes de escrever.
