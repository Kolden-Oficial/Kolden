---
name: motor-de-carrossel-autonomo
description: >
  Pipeline autônomo que gera CARROSSÉIS/VÍDEOS CURTOS para TikTok e Instagram em
  cadência semanal — ideação (Gemini) → produção de assets (Nano Banana / Imagen /
  slides gerados) → montagem → publicação (Upload-Post) → coleta de performance →
  `learnings.json` que alimenta a próxima ideação. Loop fechado de aprendizado por
  performance. Use quando o pedido for "criar motor de carrossel", "pipeline
  automatizado de conteúdo", "carrossel + reels em série", "TikTok em escala",
  "loop de aprendizado por performance de post" ou "automação de conteúdo semanal".
  NÃO substitui `matriz-de-conteudo` (a matriz define O QUE postar, isto executa
  em escala) nem `roteiro-de-reels` (essa faz UM Reel manual).
metadata:
  type: reference
---

# Motor de Carrossel Autônomo — pipeline que aprende com a performance

Postar carrossel/curto uma vez é conteúdo. Postar 3x/semana com feedback loop de
performance é um MOTOR. Este pipeline entrega cadência, aprendizado e economia
de tempo humano (~85%).

## Antes de começar
Levante:
- **Pilares** (da `matriz-de-conteudo`) — 3 a 5.
- **Voz da marca** (do `fundacao-de-voz` / `voz.md`).
- **Redes-alvo**: TikTok e/ou Instagram (Reels/Carrossel).
- **Cadência**: 3x/semana é o mínimo recomendado; 5x/semana é o alvo.
- **Métrica-norte por rede**: TikTok = retenção 3s + tempo médio; IG Carrossel = salvamento + compartilhamento.

## Arquitetura do motor (5 estágios)

```
[Ideação] → [Roteiro/Slide] → [Assets] → [Montagem] → [Publicação] → [Coleta] → [learnings.json]
                                                                          ↑          │
                                                                          └──────────┘ (feedback loop)
```

### Estágio 1 — Ideação (Gemini + `learnings.json`)

- **Input**: pilares + `voz.md` + `learnings.json` (últimas 30 semanas).
- **Prompt de ideação** para Gemini pro-latest:
  > A partir dos pilares X/Y/Z, e sabendo que estas variantes RETIVERAM (top 10%) e estas NÃO retiveram (bottom 10%), gere 15 ideias de conteúdo para esta semana, cobrindo os 3 pilares balanceadamente. Cada ideia tem: título, formato (carrossel ou reel), pilar, hipótese de retenção, referência ao learning-id que a inspirou.
- **Saída**: JSON com 15 ideias. Ronan (ou publisher) marca 5 para produzir.

### Estágio 2 — Roteiro / Estrutura de slide

- **Carrossel**: chama especialista `carousel-architect` (arco 6 slides — veja bloco).
- **Reel**: chama especialista `short-video-architect` (3 fases 0-3/4-20/21-30s).
- **Saída**: markdown com slide-a-slide OU cena-a-cena.

### Estágio 3 — Assets (Nano Banana / Imagen / Composer)

- **Imagens**: Nano Banana (Gemini 2.5 image) para composição rápida, Imagen 4 para
  hero images.
- **Video B-roll**: banco pré-curado + Veo 3 (Google) para plano gerado.
- **Áudio**: banco licenciado + ElevenLabs voice se locução for necessária.
- **Regra de estética**: prompts sempre seguem a `julgamento-estetico-anti-slop`
  (Harmonia) — nada de default IA-cara-de-robô.

### Estágio 4 — Montagem

- **Carrossel IG**: gerador de slide HTML→PNG (Playwright) OU CapCut export.
- **Reel/TikTok**: motor de edição via `edicao-de-shortvideo` (skill).

### Estágio 5 — Publicação (Upload-Post ou Postiz)

- **Upload-Post** (`gitroomhq/upload-post` ou API equivalente) para publicação
  massiva multi-conta.
- **Postiz** para calendarização visual e retry.
- Credenciais via **Infisical** (`/kolden/prod/UPLOAD_POST_*`, `POSTIZ_*`).

### Estágio 6 — Coleta e `learnings.json`

Após 72h da publicação, coletar por rede:

- **TikTok**: views, avg watch time, retenção 3s, saves, shares, comments.
- **Instagram**: reach, saves, shares, non-followers reach, plays (Reel).

Registrar em `learnings.json`:

```json
{
  "learning-id": "lrn-2026-06-30-002",
  "publicado_em": "2026-06-30T09:00-03:00",
  "rede": "instagram",
  "formato": "carrossel",
  "pilar": "authority-em-ia",
  "hipotese": "capa pergunta contrária retém mais",
  "capa": "Sua estratégia de conteúdo vai morrer em 2026?",
  "estrutura": "hook->problem->agitation->solution->feature->cta",
  "assets": ["s1.png", "s2.png", "..."],
  "metricas_72h": {
    "reach": 12400,
    "saves": 421,
    "shares": 88,
    "save_rate": 0.034,
    "non_followers_pct": 62
  },
  "classificacao": "top-10-percent",
  "next_iteration": "manter capa pergunta contrária, testar CTA salvamento explícito"
}
```

## Loop de aprendizado

Semanalmente, o pipeline lê `learnings.json`, identifica:

- **Top 10%**: o que se repete? (hook, formato, pilar, horário)
- **Bottom 10%**: o que corta imediatamente?
- **Hipóteses testadas**: qual "achismo" foi confirmado ou refutado?

Isso volta ao prompt de ideação — o motor deixa de "achar" e passa a "saber".

## Regras invioláveis

- **Voz**: nunca fugir de `voz.md`. Se o motor gerar algo fora, o publisher rejeita.
- **Anti-slop**: rodar `julgamento-estetico-anti-slop` nas capas ANTES de publicar.
- **Segredos**: sempre via Infisical, nunca em `.env` commitado.
- **Marca**: nada de watermark IA visível, nada de cliché "gerado por AI"; o
  produto final precisa ser indistinguível de conteúdo de time humano premium.
- **Rate limits**: TikTok ~10 posts/dia por conta; IG ~5 posts/dia. Publicar em
  ondas, não em lote.

## Scorecard do motor (0-100)

| Bloco | Item | Peso |
|---|---|---|
| Ideação | 15 ideias/semana lidas do `learnings.json` | 10 |
| Roteiro | 100% dos posts com arco de 6 slides OU 3 fases | 10 |
| Assets | 100% via Nano Banana/Imagen com prompt anti-slop | 10 |
| Cadência | ≥3 posts/semana sustentado por 4 semanas | 15 |
| Publicação | Upload-Post/Postiz funcionando + retry | 10 |
| Coleta | Métricas 72h capturadas por post | 15 |
| Aprendizado | `learnings.json` populado + top/bottom rotulados | 15 |
| Iteração | ≥1 hipótese refutada por mês (o motor está aprendendo) | 15 |

## Saída
1. **Arquitetura desenhada** (DAG + tools por estágio).
2. **`learnings.json` schema** definido.
3. **Prompts base** (ideação, roteiro, arte).
4. **Cronograma semanal** (o que roda seg-sáb).
5. **Métricas de motor**: cadência sustentada + taxa de top-10% crescente.

## Cruzamentos
- **`matriz-de-conteudo`** — abastece pilares.
- **`fundacao-de-voz`** — abastece voz.
- **`carousel-architect`** e **`short-video-architect`** — módulos de roteiro.
- **`edicao-de-shortvideo`** — módulo de montagem para vídeos.
- **`publicacao-social`** — camada de publicação.
- **Aglaia + `julgamento-estetico-anti-slop`** — anti-slop nas capas.
- **Metis** — telemetria e custo por post (Gemini/Imagen tokens).

---
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (IDs MKT-G19, G21). Traduzido, reescrito em pt-BR; schema `learnings.json` desenhado para o pipeline Kolden (multi-conta, feedback loop com Gemini).
