---
name: edicao-de-shortvideo
description: >
  Pipeline de EDIÇÃO/POST-PRODUÇÃO de vídeo curto (Reel/TikTok/Short) — árvore de
  decisão de software (CapCut / Premiere Pro / DaVinci Resolve / Final Cut Pro)
  por complexidade e volume, mix de áudio por LUFS por tipo de conteúdo (-14 LUFS
  para TikTok/música, -16 LUFS para podcast/spoken word), padrões de cor, safe
  area vertical 9:16, legenda burn-in e export por plataforma. Use quando o
  pedido for "editar vídeo curto", "que software usar (CapCut/Premiere/DaVinci/FCP)",
  "loudness/LUFS para TikTok", "safe area vertical", "legenda queimada", "cor de
  Reel/Short", "template de export TikTok/Reel/Short" ou "pipeline de edição em
  escala". NÃO escreve roteiro (isso é `short-video-architect`) nem publica (isso
  é `publicacao-social`).
metadata:
  type: reference
---

# Edição de Short-Video — o software certo, o mix certo, o export certo

Vídeo curto vive de três decisões que quase ninguém acerta: **software** (usar
CapCut para tudo trava a marca; usar Premiere para uma peça semanal queima time),
**mix de áudio** (LUFS errado quebra o algoritmo), e **export** (bitrate/preset
errado gera pixelação que a plataforma penaliza).

## Antes de começar
Levante:
- **Volume** — quantos vídeos/semana? 1-3, 4-10, 10+ muda o pipeline.
- **Complexidade** — cortes simples, motion graphics pesado, VFX?
- **Plataforma-alvo** — TikTok, Reel, Short, LinkedIn, Twitter/X. Cada uma tem seu preset.
- **Estilo de áudio** — spoken word (voz humana falando), música + voz, música pura?
- **Marca visual** — LUT/paleta definida? Legenda como parte da marca?

## Árvore de decisão de software

```
Volume + Complexidade?
├── Baixo volume (1-3/sem) + Simples
│   └── CapCut (mobile ou desktop)
│       - Rápido, template pronto, legendas automáticas, sync trend
├── Alto volume (4-10/sem) + Simples/Médio
│   └── CapCut Pro (desktop) + template próprio
│       - Ganhos de escala com project template
├── Médio volume + Complexo (motion, VFX)
│   └── Premiere Pro + After Effects
│       - Ecosistema Adobe integrado
├── Alto volume + Complexo
│   └── Premiere Pro + After Effects + templates + shared bins
│       - Time de 2+ editores; proxy workflow
├── Cor profissional / cinema
│   └── DaVinci Resolve (Studio se cor + fusion)
│       - Grading superior; free para 90% dos casos
└── Ecossistema Apple + cinema
    └── Final Cut Pro (Mac)
        - Magnetic timeline; ProRes; rápido em M-series
```

### Quando escolher cada um

- **CapCut**: velocidade, mobile, trend sync automático, legendas geradas por AI. Barreira zero. Trava a marca só se não usar template próprio.
- **Premiere Pro**: workflow de time, integração com AE, plugin universe, colaboração via Team Projects.
- **DaVinci Resolve**: cor profissional (color match, secondaries), gratuito (Studio $295 uma vez), Fusion (VFX built-in). Cresce em produção premium.
- **Final Cut Pro**: velocidade em Mac M-series, magnetic timeline, ProRes nativo.

## Mix de áudio por LUFS

**LUFS** (Loudness Units relative to Full Scale) é a régua real de volume das plataformas modernas. Cada plataforma tem seu alvo — errar penaliza (auto-normalization corta).

| Tipo de conteúdo | Plataforma | LUFS-alvo | True Peak |
|---|---|---|---|
| Spoken word (voz humana) | Podcast, YouTube longo | **-16 LUFS** | -1 dBTP |
| Voz + música moderada | Reel/TikTok/Short conteúdo educativo | **-14 LUFS** | -1 dBTP |
| Música com voz | TikTok música forte, Reel dance | **-14 LUFS** | -1 dBTP |
| Música pura | Instagram loops, YouTube music | **-14 LUFS** | -1 dBTP |
| YouTube geral (default) | YouTube longo | **-14 LUFS** | -1 dBTP |

### Workflow de mix (5 passos)

1. **Voice level** — voz humana em -14 dBFS pico, -18 dBFS RMS.
2. **De-esser + EQ** — cortar 3-4kHz agressivo, hipass 80Hz.
3. **Compressor moderado** — ratio 3:1, attack rápido, release médio.
4. **Music ducking** — sidechain para baixar música quando voz aparece.
5. **Master limiter** — LUFS-alvo + true peak -1 dBTP.

**Ferramenta**: LUFS meter em qualquer NLE (Youlean Loudness Meter gratuito é padrão da indústria).

## Formato vertical 9:16 (safe area)

- **Resolução**: 1080x1920 (mínimo) ou 1440x2560 (top).
- **Safe area para texto/logo**:
  - Superior: 220px reservado (indicador de rede + username).
  - Inferior: 480px reservado (legenda + engajamento + CTA nativo).
  - Central segura: ~1080x1220px.
- **Regra**: nunca colocar informação crítica fora do central seguro.

## Cor e look

- **LUT da marca** — se a marca tem LUT (do brandbook Aglaia), aplicar antes de qualquer grading manual.
- **Contraste alto** — Reel/TikTok são consumidos em brilho baixo; contraste alto retém.
- **Saturação moderada** — over-saturated parece "template IA".
- **Skin tones protegidos** — vector scope na linha II.

## Legenda burn-in (obrigatório)

>80% do consumo é sem som. Legenda queimada não é opcional.

### Padrão da marca
- Fonte: Inter Semibold ou Poppins Bold (default sério) / Bebas Neue (default punchy).
- Tamanho: 60-72px em 1080x1920.
- Fundo/stroke: box com padding ou stroke 4px preto.
- Cor: branco #FFFFFF ou amarelo #FFE500 para destaque.
- Posição: 1/3 inferior, dentro da safe area.
- Duração por linha: 1.5-3s. Nunca linha grudada.

### Geração
- CapCut auto-legenda (pt-BR + edit manual) — mais rápido.
- Descript / Riverside — para volume.
- Premiere Speech-to-Text — decente para inglês, medíocre em pt-BR.

## Export por plataforma

| Plataforma | Formato | Resolução | Bitrate video | Bitrate áudio | FPS | LUFS |
|---|---|---|---|---|---|---|
| TikTok | MP4 (H.264) | 1080x1920 | 10-15 Mbps | 128-192 kbps | 30 ou 60 | -14 |
| Instagram Reel | MP4 (H.264) | 1080x1920 | 8-12 Mbps | 128 kbps | 30 | -14 |
| YouTube Short | MP4 (H.264 ou H.265) | 1080x1920 | 15-20 Mbps | 192 kbps | 30 ou 60 | -14 |
| LinkedIn (curto) | MP4 (H.264) | 1080x1920 ou 1080x1080 | 8-10 Mbps | 128 kbps | 30 | -14 |
| Twitter/X | MP4 (H.264) | 1080x1920 (até 140s) | 8 Mbps | 128 kbps | 30 | -14 |

**Regra de ouro**: exportar em max quality dentro do limite da plataforma. Nunca deixar "web" preset default do Premiere para conteúdo vertical.

## Pipeline em escala (10+ vídeos/semana)

1. **Template mestre** — 1 projeto com todos os elementos de marca (intro, outro, lower thirds, LUT, LUFS chain).
2. **Bin de assets** — cortes recorrentes, B-roll, música licenciada em bin compartilhado.
3. **Naming convention** — `AAAA-MM-DD_projeto_rede_versao.mp4`.
4. **Renderfarm ou preset AE** — motion graphics via template AE, não por vídeo.
5. **Review em 3 gates** — edit lock → color/mix lock → export lock.
6. **QA final** — LUFS meter + safe area check + reprodução em mobile antes de publicar.

## Anti-padrões

- Exportar 5 Mbps para TikTok (pixeliza no scroll rápido).
- Legenda fora da safe area — cortada pelo UI da rede.
- LUFS -20 em TikTok — o algoritmo diminui alcance por som baixo demais.
- Preset "YouTube 1080p" para vertical — troca aspect ratio.
- Cor default do NLE — parece amador.
- Sem template mestre em escala — cada vídeo demora 3x mais.

## Saída
1. **Software escolhido** com justificativa (volume + complexidade).
2. **Chain de mix** documentado (EQ → comp → ducking → limiter).
3. **Template mestre** do NLE com safe area + LUT + legenda + LUFS.
4. **Presets de export** por plataforma.
5. **Naming convention** e pipeline de review.

## Cruzamentos
- **`short-video-architect`** — roteiro entra, edição sai.
- **`motor-de-carrossel-autonomo`** — módulo de montagem no pipeline autônomo.
- **`publicacao-social`** — publica os exports.
- **Aglaia** — LUT, tipografia, cor da marca.
- **`julgamento-estetico-anti-slop`** — checar contra AI-tells antes de exportar.

---
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (IDs MKT-G63, G64, G65). Traduzido, reescrito em pt-BR; tabela LUFS por tipo consolidada dos padrões atuais das plataformas (TikTok/IG/YouTube auto-normalization) e safe area vertical 9:16 documentada com dimensões exatas 2026.
