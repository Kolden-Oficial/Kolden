---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Relatório de perda (F6.5) — squad Pheme

- **squad-alvo:** Pheme (`C:/Kolden/Pheme/`)
- **repo absorvido:** `charlie947/social-media-skills` @94f72ea2ece388fa30ef49a26fb2e6fd2109e0b1 — licença MIT
- **data:** 2026-06-27 · **leva:** `_lote-2026-06-26`
- **invariante:** `count(ABSORVIDO) + count(DESCARTADO) + count(DIFERIDO-INCREMENTAL) == count(IDs do bucket Pheme)` · **PERDIDO = 0**

## IDs-âncora do bucket Pheme (mapa-de-decisao §síntese: G1,G2,G3,G5,G7,G8,G10,G13,G20)

| repo | ID | disposicao | destino |
|---|---|---|---|
| charlie947--social-media-skills | G1 (voice-builder) | ABSORVIDO | `.claude/skills/fundacao-de-voz/SKILL.md` |
| charlie947--social-media-skills | G20 (arquitetura de contexto compartilhado) | ABSORVIDO | `.claude/skills/fundacao-de-voz/SKILL.md` (fundido com G1) |
| charlie947--social-media-skills | G2 (newsletter-voice) | ABSORVIDO | `.claude/skills/arquetipos-de-newsletter/SKILL.md` |
| charlie947--social-media-skills | G3 (biblioteca de 6 arquétipos) | ABSORVIDO | `.claude/skills/arquetipos-de-newsletter/references/arquetipos.md` (fundido com G2) |
| charlie947--social-media-skills | G13 (content-matrix) | ABSORVIDO | `.claude/skills/matriz-de-conteudo/SKILL.md` |
| charlie947--social-media-skills | G7 (post-scorer — método) | ABSORVIDO | `.claude/skills/score-de-post/SKILL.md` |
| charlie947--social-media-skills | G8 (reels-scripting — método) | ABSORVIDO | `.claude/skills/roteiro-de-reels/SKILL.md` |
| charlie947--social-media-skills | G10 (pinned-comment) | ABSORVIDO | `.claude/skills/comentario-fixado/SKILL.md` |
| charlie947--social-media-skills | G5 (post-writer) | DIFERIDO-INCREMENTAL | — |

**Contagem (bucket Pheme):** ABSORVIDO = 8 · DESCARTADO = 0 · DIFERIDO-INCREMENTAL = 1 · total = 9 = IDs do bucket. **PERDIDO = 0.** ✔

## INCREMENTAL (não aplicado nesta leva)
- **G5 (post-writer)** — DIFERIDO-INCREMENTAL. Redação de post LinkedIn na voz (pesquisa → plano
  de ângulo → draft → iteração) **se sobrepõe ao agente existente `linkedin-x-authority`** e ao
  craft de copy do **Caliope**. Aplicar só após decidir a fronteira Pheme×Caliope, para não
  duplicar. Método disponível em `_staging/quarentena/.../skills/post-writer/SKILL.md`.

## Ressalvas aplicadas (conforme dossiê)
1. **Método, não auto-exec** — G7 (score-de-post) e G8 (roteiro-de-reels) absorveram a LÓGICA;
   o auto-exec (scripts Node que chamam Apify/Gemini, env vars em texto puro, caminhos de disco,
   modelo fixo) foi removido. Coleta delegada ao **Argos**; segredos via **Infisical**.
2. **De-personalização** — persona "Charlie Hills", nomes de equipe, benchmarks e links próprios
   removidos/generalizados em todas as 6 skills. Regras de estilo pessoais do autor (inglês
   britânico, proibição de travessão, lista de palavras banidas) substituídas pela voz da própria
   marca/cliente (`voz.md` / design-system Kolden).
3. **Credenciais** — nenhuma var de ambiente em texto puro; tudo via Infisical (skill `infisical-padrao`).
4. **Sem cópia literal** — cada skill reescrita em pt-BR; atribuição (owner/repo@sha + MIT) no rodapé.

## Encaminhamentos a OUTROS squads (fora do bucket Pheme — não aplicados aqui)
Estes IDs do repo têm dono natural em outro squad e ficam para a aplicação correspondente:
- **Aglaia (visual):** G6 (graphic-designer), G9 (youtube-thumbnail), G15 (gemini-infographic),
  G16 (gemini-carousel), G17 (quote-post). Também recebem o handoff de geração de imagem dos
  briefs produzidos por `comentario-fixado` e a produção de mídia de `roteiro-de-reels`.
- **Caliope (copy craft):** G11 (hook-generator), G12 (post-formatter — PAS/AIDA/BAB/STAR/SLAY).
- **Argos (coleta/inteligência):** G14 (niche-research) — já há `descoberta-de-virais`/`transcricao-de-conteudo`.
- **Metis (analytics):** G18 (analytics-dashboard).
- **Caos-fábrica:** G19 (validate-skills.sh). · **referencias:** G21 (empacotamento marketplace).

## Catálogo
**ausente** — Pheme não possui `.claude/skills/catalogo.md`. Não foi inventado (regra do guia).
Recomendação: criar o catálogo do squad numa passada dedicada, indexando as 7 skills atuais
(publicacao-social + as 6 novas).

## Habilidades criadas (6)
`fundacao-de-voz` · `arquetipos-de-newsletter` (+ `references/arquetipos.md`) · `matriz-de-conteudo`
· `score-de-post` · `roteiro-de-reels` · `comentario-fixado`.
