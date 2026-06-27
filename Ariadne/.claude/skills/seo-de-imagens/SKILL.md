---
name: seo-de-imagens
description: >
  Use quando a demanda for otimização de imagens para SEO e performance: alt
  text, tamanho de arquivo, formato (WebP/AVIF), imagens responsivas, lazy
  loading, prevenção de CLS, ranqueamento em Google Imagens e metadados
  IPTC/XMP (inclusive rótulo de imagem gerada por IA). Gatilhos: "SEO de
  imagem", "alt text", "otimizar imagens", "tamanho de imagem", "converter para
  webp", "metadados de imagem", "image SERP", "imagem não aparece no Google".
  É uma frente NOVA da Ariadne (sem especialista de imagem até então).
---

# SEO de Imagens

Frente nova da Ariadne. Otimização de imagem na intersecção de ranqueamento (Google Imagens) e performance (Core Web Vitals).

## O que importa de fato para o Google Imagens
| Fator | Impacto | Onde |
|---|---|---|
| Alt text | **CRÍTICO** (ranqueamento) | `<img alt="">` |
| Nome do arquivo | **ALTO** | descritivo, hifenizado, minúsculo |
| Contexto da página | **ALTO** | HTML ao redor |
| Tamanho/velocidade | **MÉDIO** (indireto via CWV) | compressão + formato |
| IPTC Creator/Copyright | **BAIXO** (só display) | metadado do arquivo |
| EXIF de câmera / IPTC Keywords | NENHUM | irrelevante p/ SEO |

## Checagens on-page
- **Alt text:** presente em todo `<img>` não-decorativo, descritivo (descreve o conteúdo, não "foto.jpg"), keyword natural sem stuffing, 10-125 chars.
- **Tamanho:** thresholds por categoria (thumbnail <50KB, conteúdo <100KB, hero <200KB).
- **Formato:** recomendar WebP/AVIF sobre JPEG/PNG; padrão `<picture>` com cadeia AVIF → WebP → JPEG fallback.
- **Responsivas:** `srcset` + `sizes` casando os breakpoints.
- **Lazy loading:** `loading="lazy"` só abaixo da dobra. **Nunca** lazy na imagem LCP (degrada o LCP). Detectar lazy-loader por JS (`data-src`, classes `lazyload`) — nesse caso a ausência do atributo nativo é intencional, não regressão.
- **LCP/decoding:** `fetchpriority="high"` no hero/LCP; `decoding="async"` nas demais.
- **CLS:** `width`+`height` (ou `aspect-ratio`) em toda imagem; sinalizar quem não tem.

## Image SERP (com DataForSEO, opcional)
Cruza as imagens da página com o ranking do Google Imagens: domínios dominantes (top 10 por posições), padrões de alt text dos top-ranking, distribuição de formato, e score de oportunidade (keywords onde a página ranqueia mas não tem presença em imagem).

## Otimização de arquivo e metadados
- Conversão de formato com preservação de metadado; gerar variantes responsivas (400w/800w/1200w).
- **IPTC/XMP para rich results do Google Imagens:** Creator, Credit, Copyright aparecem na SERP (display, não ranqueamento). WebP suporta EXIF/XMP mas **não** IPTC nativo — usar campos XMP.
- **Imagem gerada por IA (requisito do Merchant Center):** imagem de produto feita por IA generativa exige IPTC `DigitalSourceType: TrainedAlgorithmicMedia`; feed sem o rótulo pode ser reprovado. Vocabulário: `trainedAlgorithmicMedia` (100% IA), `compositeSynthetic` (mistura), `digitalCapture` (foto pura).

## Saída
Resumo de auditoria (total, sem alt, superdimensionadas, formato errado, sem dimensão, sem lazy) + lista priorizada por economia de bytes (maior primeiro) + recomendações com estimativa de ganho.

## Handoffs e regras Kolden
- **Aglaia** (saída): a *geração* de imagem (IA/branding) é dela; a Ariadne audita e otimiza a imagem para SEO/CWV e cruza o rótulo IPTC de IA.
- **seo-ecommerce** (interno): imagem de produto AI sem `DigitalSourceType` é flag de reprovação de feed.
- **auditor-tecnico-seo** (interno): impacto de imagem no LCP entra na auditoria de CWV.
- Ferramentas de manipulação de arquivo (exiftool/cwebp/ImageMagick) são opcionais e detectadas em runtime; sem elas, auditar só pelo markup.

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-images`, licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal.
