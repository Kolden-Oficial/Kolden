# Relatório de reconciliação F6.5 — squad Harmonia (UX/UI)

- **Lote:** 2026-06-26
- **Squad-alvo:** Harmonia — `C:/Kolden/Harmonia/`
- **Repos aplicados:** `nextlevelbuilder--ui-ux-pro-max-skill@9fd25fe` (MIT),
  `Leonxlnx--taste-skill@06d6028b` (MIT), `anthropics--claude-code` frontend-design
  (PROPRIETÁRIO Anthropic — princípio reescrito em PT-BR, sem cópia literal, uso interno).
- **Habilidades criadas (4):** `sistema-de-design`, `tokens-de-design`,
  `implementacao-ui`, `julgamento-estetico-anti-slop` — todas em
  `C:/Kolden/Harmonia/.claude/skills/`.
- **Catálogo:** era **ausente**; criado `catalogo.md` indexando apenas as 4 novas.

## Coordenação de sobreposição (3 repos = mesmo domínio: design)

Os 3 repos aterrissaram na Harmonia. Para não criar skills concorrentes, foram
consolidados em 2 eixos + 1 de implementação:
- **Base de conhecimento + tokens + implementação** (ui-ux-pro-max, repartido por
  coerência técnica): `sistema-de-design` (conhecimento/decisão/UX) + `tokens-de-design`
  (arquitetura de tokens) + `implementacao-ui` (shadcn/Tailwind/motion).
- **Julgamento estético anti-slop** (taste + frontend-design FUNDIDOS):
  `julgamento-estetico-anti-slop` — uma única skill cita as duas fontes.
- **Tells de conteúdo/copy** → encaminhados ao **Caliope** (não absorvidos aqui).
- **Geração de imagem/logo/ícone** → nota ao **Aglaia** (não criado aqui).

## Disposição por ID-âncora (alvo = harmonia)

### nextlevelbuilder--ui-ux-pro-max-skill (MIT)

| repo | ID | disposicao | destino |
|---|---|---|---|
| ui-ux-pro-max | G1 | ABSORVIDO | `sistema-de-design/SKILL.md` (fluxo de decisão) |
| ui-ux-pro-max | G2 | ABSORVIDO | `sistema-de-design` (motor de busca descrito como método; engine não portada) |
| ui-ux-pro-max | G3 | ABSORVIDO | `sistema-de-design/SKILL.md` (geração de design-system com reasoning) |
| ui-ux-pro-max | G4 | ABSORVIDO | `sistema-de-design/references/guia-por-stack.md` (CLI descrita como método) |
| ui-ux-pro-max | G5 | ABSORVIDO | `sistema-de-design/references/catalogo-de-estilos.md` + `tipos-de-produto.md` + `paletas-e-tipografia.md` |
| ui-ux-pro-max | G6 | ABSORVIDO | `sistema-de-design/references/guia-por-stack.md` (17 stacks) |
| ui-ux-pro-max | G7 | ABSORVIDO | `sistema-de-design/SKILL.md` (Master + overrides) |
| ui-ux-pro-max | G8 | ABSORVIDO | `sistema-de-design/references/regras-ux.md` (~99 regras + anti-padrões) |
| ui-ux-pro-max | G10 | ABSORVIDO | `implementacao-ui/SKILL.md` + `references/shadcn-tailwind.md` |
| ui-ux-pro-max | G11 | ABSORVIDO | `implementacao-ui` (automação shadcn descrita; script não copiado) |
| ui-ux-pro-max | G12 | ABSORVIDO | `implementacao-ui` (tailwind.config a partir de tokens) |
| ui-ux-pro-max | G13 | ABSORVIDO | `implementacao-ui/references/shadcn-tailwind.md` |
| ui-ux-pro-max | G14 | ABSORVIDO | `implementacao-ui/references/shadcn-tailwind.md` |
| ui-ux-pro-max | G16 | ABSORVIDO | `tokens-de-design/SKILL.md` + `references/arquitetura-de-tokens.md` |
| ui-ux-pro-max | G17 | ABSORVIDO | `tokens-de-design/SKILL.md` (JSON→CSS) |
| ui-ux-pro-max | G18 | ABSORVIDO | `tokens-de-design/SKILL.md` (linter anti-hardcoded) |
| ui-ux-pro-max | G19 | ABSORVIDO | `tokens-de-design/references/arquitetura-de-tokens.md` + `estados-e-variantes.md` |
| ui-ux-pro-max | G33 | ABSORVIDO | `implementacao-ui/SKILL.md` (ícones; geração por IA → Aglaia) |
| ui-ux-pro-max | G15 | DIFERIDO-INCREMENTAL | canvas "museum-quality" mapeado a **aglaia** no mapa F4, não harmonia |
| ui-ux-pro-max | G9, G20-G32, G34-G40 | FORA-DE-ESCOPO | mapeados a aglaia/orfeu/pheme/vendor no F4; não pertencem à Harmonia |

### Leonxlnx--taste-skill (MIT)

| repo | ID | disposicao | destino |
|---|---|---|---|
| taste-skill | G1 | ABSORVIDO | `julgamento-estetico-anti-slop/SKILL.md` (skill âncora anti-slop) |
| taste-skill | G3 | ABSORVIDO | `.../references/presets-de-direcao.md` (RNG/AIDA/hero 2-linhas → preset Awwwards) |
| taste-skill | G5 | ABSORVIDO | `.../references/presets-de-direcao.md` (protocolo de redesign scan→diagnose→fix) |
| taste-skill | G6 | ABSORVIDO | `.../references/presets-de-direcao.md` (soft/premium: double-bezel, motion) |
| taste-skill | G7 | ABSORVIDO | `.../references/presets-de-direcao.md` (minimalista editorial) |
| taste-skill | G8 | ABSORVIDO | `.../references/presets-de-direcao.md` (brutalista/telemetria) |
| taste-skill | G10 | ABSORVIDO | `.../references/presets-de-direcao.md` (workflow image-first; geração → Aglaia) |
| taste-skill | G13 | ABSORVIDO | `tokens-de-design/SKILL.md` (DESIGN.md semântico) |
| taste-skill | G14 | ABSORVIDO (metade visual) | `.../references/banco-de-ai-tells.md`; metade de CONTEÚDO → Caliope |
| taste-skill | G16 | ABSORVIDO | `julgamento-estetico-anti-slop/SKILL.md` (3 dials) |
| taste-skill | G17 | ABSORVIDO | `julgamento-estetico-anti-slop/SKILL.md` (Design Read) |
| taste-skill | G18 | ABSORVIDO | `.../references/pre-flight-visual.md` (pré-flight mecânico) |
| taste-skill | G20 | ABSORVIDO | `implementacao-ui/references/motion-e-performance.md` (esqueletos GSAP/Motion) |
| taste-skill | G2 | DIFERIDO-INCREMENTAL | versão legada (v1) do G1; absorver só o diff histórico numa próxima leva (baixa prioridade) |
| taste-skill | G4, G11, G12 | FORA-DE-ESCOPO | branding/image-gen → **aglaia** no F4 |
| taste-skill | G9 | FORA-DE-ESCOPO | anti-preguiça → **dedalo** no F4 |
| taste-skill | G15, G19 | ENCAMINHADO-CALIOPE | em-dash + copy self-audit → **caliope** (tells de conteúdo) |
| taste-skill | G21 | FORA-DE-ESCOPO | corpus "LLM Laziness" → **referencias** no F4 |
| taste-skill | G22 | DESCARTADO | scripts de build (sharp) + caminhos locais = lixo inerte |
| taste-skill | G23 | FORA-DE-ESCOPO | empacotamento de plugin → **caos-fabrica** no F4 |

### anthropics--claude-code — frontend-design (PROPRIETÁRIO Anthropic)

| repo | ID | disposicao | destino |
|---|---|---|---|
| claude-code | G1 | ABSORVIDO | `julgamento-estetico-anti-slop/SKILL.md` (direção estética anti-templated) |
| claude-code | G2 | ABSORVIDO | `julgamento-estetico-anti-slop/SKILL.md` (processo 2-passes) |
| claude-code | G3 | ABSORVIDO | `tokens-de-design/SKILL.md` (token system compacto: 4-6 hex + assinatura) |
| claude-code | G4 | ABSORVIDO | `julgamento-estetico-anti-slop/SKILL.md` (calibração anti-default: 3 clusters de IA) |
| claude-code | G6 | ABSORVIDO | `julgamento-estetico-anti-slop/SKILL.md` + `implementacao-ui/SKILL.md` (restrição/autocrítica + piso de a11y) |
| claude-code | G5 | ENCAMINHADO-CALIOPE | UX writing (voz ativa, empty states) → **caliope** (handoff citado na skill) |
| claude-code | G7-G22 | FORA-DE-ESCOPO | plugin-dev + hookify → **caos-fabrica** / **dedalo** no F4 |

> Licença claude-code: material proprietário Anthropic. Todo conteúdo absorvido foi
> **reescrito em PT-BR como princípio**, sem cópia literal de texto/código, uso
> interno Kolden, não redistribuir. Sinalizado ao curador.

## Invariante de não-perda

Escopo Harmonia (IDs mapeados a harmonia no F4 dos 3 repos):
- **ABSORVIDO:** 18 (ui-ux) + 13 (taste, contando G14 visual) + 5 (claude-code) = **36**
- **DIFERIDO-INCREMENTAL:** G15- uiux(→aglaia, fora), G2-taste, G7-...; itens harmonia diferidos = **2** (ui-ux G2-engine tratada como método já absorvido; taste G2 legado)
- **DESCARTADO:** taste G22 (1) — fora do escopo harmonia mas registrado.
- **ENCAMINHADO (outro squad, não perda):** taste G14-conteúdo, G15, G19; claude-code G5 → Caliope.
- **PERDIDO = 0.** Nenhum ID-âncora de design da Harmonia sumiu sem registro.

### INCREMENTAL (não aplicado nesta leva)

- **taste G2** (`design-taste-frontend-v1`, versão legada) — DIFERIDO: o conteúdo
  vivo está no G1 (v2) já absorvido em `julgamento-estetico-anti-slop`. Absorver só
  o diff histórico (baseline 8/6/4, arsenal criativo) numa próxima leva se houver
  valor incremental. Motivo do adiamento: anti-exaustão — evitar duplicar a skill âncora.
- **Datasets CSV completos** (161 paletas, 73 fontes, 161 produtos, 84 estilos,
  17 stacks, 99 regras) — ABSORVIDOS como **taxonomia digerida** nas `references/`,
  não como dump literal das tabelas (decisão de licença/coerência: MIT permite cópia,
  mas digest é mais útil e a quarentena é temporária). Se for preciso o detalhe-fino
  linha-a-linha, a fonte é o repositório original citado na procedência.

## Nota de qualidade

- 4 habilidades âncora (dentro do teto 3-5 do princípio anti-exaustão).
- Cada SKILL.md tem `description` no padrão SDO (diz QUANDO usar, não resume o
  workflow) + corpo enxuto + `references/` para listas densas + rodapé de procedência.
- Fronteiras explícitas entre as 4 skills e com Caliope/Aglaia/Dédalo (sem órfãs,
  sem concorrência).
