---
tipo: nota
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
---

# Pheme — Squad de Social Media & Conteúdo de Alta Performance

> **Pheme** (Φήμη) é a deusa grega da fama, do renome e do boato que se espalha. Este squad existe para fazer a **marca Kolden** ser falada — e crescer organicamente até **+100k seguidores**.

## O que este squad faz

Cria e **publica** conteúdo de alta performance nas redes da Kolden, do gancho à métrica:
estratégia de pilares → roteiro/arte por formato → revisão de marca → **publicação real** (Postiz/GHL) → leitura de métricas → próxima iteração.

Cobre: **Instagram (Reels/Carrossel/Stories), TikTok, YouTube (Shorts + longo), LinkedIn, X (Twitter) e Pinterest.**

## Como ativar

```
@social-chief                  # Ativa a orquestradora (Pheme)
*plano-de-conteudo             # Pilares + calendário para a marca Kolden
*assign {especialista} {tarefa}# Designar especialista direto
*publicar                      # Enfileira/publica via Postiz ou GHL
*metricas                      # Lê desempenho e propõe iteração
@pheme:short-video-architect   # Falar direto com um especialista
```

## Elenco

| Agente | Tier | Papel |
|--------|------|-------|
| **Pheme** (`social-chief`) | 0 | Orquestradora — roteia por rede/formato, monta calendário, garante marca, aciona publicação, lê métricas |
| `content-strategist` | 1A | Pilares, big idea da marca Kolden, calendário, ângulos, ganchos |
| `growth-analyst` | 1A | Métricas, A/B de gancho, loops virais, roadmap até 100k |
| `short-video-architect` | 1B | Reels / TikTok / Shorts — gancho 3s, retenção, roteiro, trends |
| `carousel-architect` | 1B | Carrosséis salváveis (IG / LinkedIn) |
| `youtube-strategist` | 1B | Shorts + longo, títulos, thumbnails, SEO de YouTube |
| `linkedin-x-authority` | 1C | Autoridade B2B, threads e texto (LinkedIn / X) |
| `pinterest-strategist` | 1C | Pins, SEO visual, tráfego de descoberta |
| `publisher` | 1D | **Publicação real** via Postiz (principal) e GoHighLevel (alternativo) |

## Fronteiras (REUSE > ADAPT > CREATE)

Pheme **orquestra e complementa** — não duplica:
- Copy de legenda longa / CTA persuasivo → **Caliope** (copy-squad).
- Identidade visual e tom de voz da marca → **Aglaia** (brandbook).
- Construção de comunidade/movimento → **Dionísio**.
- Analytics profundo e experimentação → **Metis**.
- Criativo de **tráfego pago** → **Peitho** (Pheme cuida do **orgânico**).

## Publicação ("postar no final")

Dois caminhos, documentados na skill `.claude/skills/publicacao-social/`:
1. **Postiz** (principal) — self-host (`gitroomhq/postiz-app`) + `postiz-agent` conectado ao Claude Code. Posta/agenda em todas as redes.
2. **GoHighLevel** (alternativo) — usa credenciais já existentes (`/kolden/prod/GHL_*`) via Infisical.

> Tokens **sempre** via Infisical — nunca em texto puro (Constituição Kolden, Art. VII).

## Estrutura

```
Pheme/
├── README.md
├── squad.yaml
├── agents/            # social-chief + 8 especialistas
├── tasks/             # plano-de-conteudo, roteiro-reel, carrossel, thread, pin, publicar, analise-metricas
├── workflows/         # wf-conteudo-ate-publicacao.yaml
├── checklists/        # qualidade-conteudo.md
├── data/              # routing-catalog.yaml
├── referencias/       # github-varredura-2026-06.md
└── .claude/skills/    # publicacao-social
```

## Status

`nascido-no-caos` — criado pelo Ritual do Caos. Próximos passos: conectar contas no Postiz, rodar o workflow de ponta a ponta e registrar a entidade no registro do Caos.

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
