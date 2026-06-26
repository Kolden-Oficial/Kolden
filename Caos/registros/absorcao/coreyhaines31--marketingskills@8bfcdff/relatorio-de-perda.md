# F6.5 — Relatório de Perda (reconciliação) — coreyhaines31/marketingskills@8bfcdff

> Pipeline de absorção, Fase 6.5 (BLOCK — `protocolo-de-absorcao-sem-perda`). Uma linha por ID do
> `inventario-de-capacidades.md` (F3, 22 IDs). Schema fixo: `| ID | disposicao | destino_ou_motivo |`.
> Invariante: count(ABSORVIDO)+count(DESCARTADO)+count(PERDIDO) == 22, com PERDIDO=0 e todo DESCARTADO com motivo.
> Data: 2026-06-26. Cada destino conferido no disco; cada DESCARTADO com motivo. Validado por `gate-reconciliacao.py`.

## Nota de fechamento (vs. versões anteriores)
A 1ª reconciliação (2026-06-25) marcou 8 ADAPTs de fábrica como `PERDIDO` → gate BLOCK (honesto). O
Ronan decidiu **executar os 8 ADAPTs** (não deferir). Build executado em 2026-06-26: os 8 padrões
foram materializados em destinos reais no Caos (não cópia literal — extração de padrão, Art. VIII):
- **G2, G3, G11, G14, G15, G16** → `Caos/.claude/skills/criacao-de-skill/SKILL.md` (autoria de habilidade).
- **G5** → `Caos/modelos/convencao-de-cli-e-tooling.md` (novo).
- **G12** → `Caos/.claude/skills/ingestao-de-repositorio/SKILL.md` (manutenção de vendors).
Agora são `ABSORVIDO` com destino verificável — não deferidos. `PERDIDO=0` por construção real.

## Disposição por ID

| ID | disposicao | destino_ou_motivo |
|----|------------|-------------------|
| G1  | ABSORVIDO   | decomposto — coberto pelas partes: SEO→Ariadne (squad novo); copy→Caliope (G21); CRO→Ariadne (G22); ferramentas→catálogo (G6-G9/G17/G20) |
| G2  | ABSORVIDO   | criacao-de-skill/SKILL.md (seção "Avaliação por habilidade" + evals/ na anatomia) — padrão evals.json adaptado à cascata de qualidade do Caos |
| G3  | ABSORVIDO   | criacao-de-skill/SKILL.md (anatomia references/ + nota "sob demanda") — docs profundos por habilidade |
| G4  | DESCARTADO  | código literal dos 64 CLIs NÃO vendorizado (estática por padrão, Art. VIII); o PADRÃO conceitual é G5; vendoring seletivo sob nova decisão |
| G5  | ABSORVIDO   | Caos/modelos/convencao-de-cli-e-tooling.md (--dry-run, auth-env via Infisical, saída JSON, fetch nativo) |
| G6  | ABSORVIDO   | sobre-a-empresa/Ferramentas/matriz-de-marketing-absorvida.md (Padrão de registro API/MCP/CLI/SDK) |
| G7  | ABSORVIDO   | matriz-de-marketing-absorvida.md (índice das categorias) + 93 guias preservados na quarentena tools/integrations/ (pull sob demanda) |
| G8  | ABSORVIDO   | matriz-de-marketing-absorvida.md §Automação/integração (Composio registrado) |
| G9  | ABSORVIDO   | matriz-de-marketing-absorvida.md §Automação/integração (Cogny registrado) |
| G10 | DESCARTADO  | fora de escopo: marketplace.json é manifesto de plugin do Claude Code; a Kolden não publica plugin marketplace |
| G11 | ABSORVIDO   | criacao-de-skill/SKILL.md (seção "Conformância à spec Agent Skills" — gate Fase 6); validate-skills-official.sh permanece NÃO-absorvido por segurança (git clone+pip sem pin) |
| G12 | ABSORVIDO   | ingestao-de-repositorio/SKILL.md (seção "Manutenção de vendors — check-updates 1×/sessão", não-bloqueante) |
| G13 | DESCARTADO  | segurança: implementação literal `` !`cmd` `` = RCE (F2 ALTO), não-absorvível; conceito seguro de auto-injetar contexto coberto por G14 |
| G14 | ABSORVIDO   | criacao-de-skill/SKILL.md (seção "Contexto compartilhado antes de perguntar" → cérebro sobre-a-empresa/ lido antes de perguntar) |
| G15 | ABSORVIDO   | criacao-de-skill/SKILL.md (tabela de conformância à spec: name/description/trigger/<500 linhas/sem `--`) |
| G16 | ABSORVIDO   | criacao-de-skill/SKILL.md (seção "Fronteiras de escopo / habilidades relacionadas" → roteamento por keywords); aplicado em Ariadne/data/routing-catalog.yaml |
| G17 | ABSORVIDO   | matriz-de-marketing-absorvida.md (heurísticas "escolha" por categoria) |
| G18 | ABSORVIDO   | Argos/tasks/prospeccao-por-stargazers.md (github-prospects: stargazers→company→Apollo/Hunter) + Argos/ferramentas.md |
| G19 | ABSORVIDO   | Argos/tasks/prospeccao-por-stargazers.md (Fase 4: estados Truelist email_state/email_sub_state) + Argos/ferramentas.md (Truelist) |
| G20 | ABSORVIDO   | matriz-de-marketing-absorvida.md §Mapa MCP-enabled (14+ tools) |
| G21 | ABSORVIDO   | Caliope/data/{formulas-de-headline.md, estrutura-de-landing-page.md, transicoes-naturais.md} + tasks/{write-headline,write-landing-page} (VoC/CTA=REUSE; headline/landing=ADAPT; transitions=CREATE) |
| G22 | ABSORVIDO   | Ariadne: agents/analista-de-cro.md + agents/otimizador-de-formulario.md + data/biblioteca-de-experimentos-cro.md |

## Aritmética de aceite
- Total do inventário (F3): **22** (G1–G22).
- ABSORVIDO: **19** (G1, G2, G3, G5, G6, G7, G8, G9, G11, G12, G14, G15, G16, G17, G18, G19, G20, G21, G22).
- DESCARTADO: **3** (G4, G10, G13) — cada um com motivo.
- PERDIDO: **0**.
- **19 + 3 + 0 = 22** ✓ — invariante satisfeita; nenhuma perda silenciosa.

## Preservação durável (obrigatória)
Há DESCARTADOS (G4 código literal, G10 escopo, G13 segurança) → **proibido limpar a quarentena**
`_staging/quarentena/coreyhaines31--marketingskills@8bfcdff/` enquanto existirem. São
"latente-recuperáveis a um `ls` de distância" — inventariados (F3), mapeados (F4) e descartados com
motivo, não perdidos.
