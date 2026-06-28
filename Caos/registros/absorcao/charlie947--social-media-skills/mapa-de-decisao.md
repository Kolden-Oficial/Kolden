# Mapa de decisão (F4) — charlie947--social-media-skills

Comparação de cada ID do inventário contra o registro de entidades (`Caos/dados/registro-de-entidades.yaml`) e os squads existentes.
**Viés da missão (autônoma):** sem match item-a-item provado → preferir ADAPT/CREATE a REUSE (REUSE sem prova = perda silenciosa).
**Nota:** `pheme` (Squad Social Media, `C:\Kolden\Pheme\`) não consta do registro de entidades mas existe e é o alvo natural da maioria (CLAUDE.md §10, MEMORY). Os manuais não foram lidos arquivo-a-arquivo → nenhum REUSE assinado.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | pheme | Fundação de perfil de voz/persona para o sistema de conteúdo social; vira skill de onboarding do squad (cruza com caliope). |
| G2 | ADAPT | pheme | Voz de newsletter é um canal do sistema de conteúdo; nova skill no pheme. |
| G3 | ADAPT | pheme | Biblioteca de 6 arquétipos editoriais alimenta a skill de newsletter; cruza com orfeu (estrutura narrativa). |
| G4 | ADAPT | pheme | Otimização de perfil LinkedIn = presença social; nova skill no pheme (copy via handoff caliope). |
| G5 | ADAPT | pheme | Redação de post LinkedIn na voz — núcleo do squad social. |
| G6 | ADAPT | aglaia | Criação de gráfico (HTML/CSS ou infográfico AI) é capacidade visual/branding; cruza com pheme. |
| G7 | ADAPT | pheme | Score de post contra histórico próprio (Apify); o lado analítico cruza com metis, mas é ferramenta de conteúdo. |
| G8 | ADAPT | pheme | Roteiro de Reels (Apify+Gemini) é produção de vídeo social; absorver método, não o auto-exec. |
| G9 | ADAPT | aglaia | Thumbnail YouTube = asset visual de marca; cruza com pheme. |
| G10 | ADAPT | pheme | Comentário fixado meme-style = engajamento de comunidade social; de-personalizar "Charlie Hills". |
| G11 | ADAPT | caliope | Geração de hooks é craft puro de copywriting; cruza com pheme. |
| G12 | ADAPT | caliope | Frameworks PAS/AIDA/BAB/STAR/SLAY são copywriting clássico; alvo natural caliope. |
| G13 | ADAPT | pheme | Matriz de ideação Justin Welsh = planejamento de conteúdo social. |
| G14 | ADAPT | argos | Pesquisa de nicho por browser/scraping é inteligência de mercado — domínio do Argos (motor de scraping). |
| G15 | ADAPT | aglaia | Prompt de infográfico whiteboard = asset visual; cruza com pheme. |
| G16 | ADAPT | aglaia | Carrossel slide-a-slide = asset visual de social; cruza com pheme. |
| G17 | ADAPT | aglaia | Quote-post (geração de imagem com citação) = asset visual; cruza com pheme. |
| G18 | ADAPT | metis | Dashboard de LinkedIn Analytics + recomendações = squad de analytics/growth. |
| G19 | ADAPT | caos-fabrica | Validador de SKILL.md contra spec serve à própria fábrica (skill `criacao-de-skill`); cruza com dedalo. |
| G20 | ADAPT | pheme | Padrão "toda skill lê about-me/voice" = arquitetura de contexto compartilhado do squad social. |
| G21 | CREATE | referencias | Empacotamento como plugin de marketplace do Claude Code — artefato inerte de referência, sem dono operacional. |

## Síntese
- **Decisão dominante:** ADAPT (20 de 21; 1 CREATE→referencias). **Zero REUSE** (sem prova item-a-item; bias da missão respeitado).
- **Alvo principal:** **pheme** (8: G1,G2,G3,G5,G7,G8,G10,G13,G20 — núcleo do sistema de conteúdo social). Distribuição secundária: **aglaia** (G6,G9,G15,G16,G17 — visual), **caliope** (G11,G12 — copy craft), **argos** (G14 — pesquisa), **metis** (G18 — analytics), **caos-fabrica** (G19 — validador), **referencias** (G21).
- **Ressalvas de absorção:** (1) reescrever credenciais p/ Infisical (não env var em texto puro); (2) absorver método, não o auto-exec de G7/G8/G14; (3) de-personalizar a persona "Charlie Hills" (benchmarks, nomes de equipe, links) na reescrita pt-BR; (4) sem cópia literal — reescrever cada skill em pt-BR.
