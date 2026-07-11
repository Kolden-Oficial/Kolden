---
name: descoberta-de-virais
description: Descobrir vídeos/posts virais de um nicho ou concorrente em TikTok/Instagram/YouTube (por engajamento, trending de hashtag/som/criador). Use quando o pedido for "achar o que está viralizando", "vídeos virais do concorrente", "tendências de conteúdo do nicho". Combina SociaVault (API multi-plataforma) + Apify + TikTok Creative Center + YouTube Data API. Saída com fonte + timestamp.
tipo: skill
area: Argos
up: "[[Argos/_MOC-argos]]"
---

# Habilidade: descoberta-de-virais

Encontra o conteúdo de maior performance (vídeos/posts virais) por nicho ou concorrente, para alimentar
inteligência competitiva e o time de copy/conteúdo. Usada pelos `social-*` e pelo `competitor-mapper`.

## Fontes (em ordem de preferência por caso)

| Caso | Ferramenta | Como |
|---|---|---|
| Virais multi-plataforma (TikTok/IG/YT/X) por nicho/perfil | **SociaVault** | `motor/argos-engine.py viral --path <path> --params '<json>'` (`SOCIAVAULT_API_KEY` via Infisical, env dev) |
| Virais/trending de TikTok em volume | **Apify** (já temos) | `motor/argos-engine.py apify --actor <tiktok-trend/data-extractor> --input '<json>'` |
| Tendências públicas de TikTok (sons/hashtags/top ads) | **TikTok Creative Center** | via `social-tiktok` (zona verde, sem login) |
| Vídeos mais vistos/trending no YouTube | **YouTube Data API** | via `social-youtube` (search.list / videos chart) |

## Método

1. Defina escopo: nicho (palavra/segmento) ou concorrente (perfil/handle), e a(s) rede(s).
2. Escolha a fonte (tabela acima) — prefira SociaVault para cobertura multi-plataforma; Apify para TikTok em volume.
3. Para SociaVault, monte `--path` e `--params` conforme a doc oficial (`docs.sociavault.com`) — não invente endpoints.
4. Ordene por métrica de viralidade (views/engajamento/proporção views÷seguidores) e registre **fonte + timestamp** em cada item.
5. Marque o que é orgânico vs pago (anúncio → `ads-intel`). Saída: top vídeos com link, métrica, data.
6. Para extrair ganchos/estrutura do que viralizou → encadeie com a skill `transcricao-de-conteudo`.

## Regras
- Todo dado com fonte + timestamp (gate de confiabilidade ARGOS-CL-001).
- Coleta que exija login/ToS-cinza → escalar ao `compliance-sentinela`. SociaVault/Apify rodam a coleta
  na infra deles, mas o juízo de ToS da plataforma-alvo permanece.
- Segredos só via Infisical (`/kolden/dev/SOCIAVAULT_API_KEY`), nunca literal.
