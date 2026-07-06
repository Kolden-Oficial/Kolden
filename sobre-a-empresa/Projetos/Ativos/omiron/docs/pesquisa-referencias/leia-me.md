# Pesquisa de Referências — Omiron

Dossiê consolidado em 06/07/2026 pelo Hermes a partir de 3 fontes externas + 1 mapa mental compartilhado pelo Ronan.

## Comece por aqui

- **[decisoes-consolidadas-brand.md](decisoes-consolidadas-brand.md)** — fonte de verdade curta. O que está travado, o que está pendente, o que não fazer.

## Documentos-fonte (por profundidade)

- **[reuniao-2026-07-01-transcricao-e-decisoes.md](reuniao-2026-07-01-transcricao-e-decisoes.md)** — ata completa da reunião entre Dr. Ariosto e Ronan (Google Doc `1CNfUUP2GHjbgacEd_mYVn8mDDLt8RtP9AHE3qQJ8kVE`, transcrição do Gemini, 1h47min).
- **[canva-deck-referencias-visuais.md](canva-deck-referencias-visuais.md)** — inventário dos 22 slides do deck comercial + análise das 5 variantes tipográficas (slides 18-22). Slide 18 vencedor. Previews em `canva-thumbnails/`.
- **[mapa-mental-consolidado.md](mapa-mental-consolidado.md)** — mapa mental original do Ronan (arquétipo, 4 pilares, tipografia, nome da IA) cruzado com as decisões da reunião e o gosto visual do Ariosto.
- **[pinterest/pinterest-ariosto-analise.md](pinterest/pinterest-ariosto-analise.md)** — 95 pins do board público do Dr. Ariosto (`filhoariosto/omiron-pictures`) classificados em 16 clusters visuais. Cruzamento com o mapa mental (confirma / amplia / contradiz).

## Datasets brutos

- `pinterest/pins-raw.json` — extração bruta do Firecrawl
- `pinterest/pins-dedup.json` — 95 pins únicos com pinId, imgUrl, alt-text, related-interests
- `pinterest/top-terms.json` — contagem agregada de tags temáticas
- `pinterest/clusters.json` — cluster dos 95 pins por 16 temas visuais

## Fontes originais (URLs)

- Google Doc: https://docs.google.com/document/d/1CNfUUP2GHjbgacEd_mYVn8mDDLt8RtP9AHE3qQJ8kVE/
- Canva deck: https://canva.link/9dik2ezuah3wbjy → https://www.canva.com/design/DAHLeSsolNw/
- Pinterest board: https://pin.it/7tpPWAghm → https://br.pinterest.com/filhoariosto/omiron-pictures/

## Ferramentas de coleta

- Google Doc: MCP oficial `google-drive` (soberania — sem passar por WebFetch)
- Canva: MCP oficial `claude_ai_Canva`
- Pinterest: Firecrawl (não precisou Apify — scrape limpo em uma tentativa)
- Autorização de busca registrada via `gate-busca.cjs autoriza firecrawl max` no início da sessão

## Próximas fontes a integrar (pendentes)

- **PDF do MIV/MEVP Plan** — Ariosto vai enviar; extrair as perguntas para especificar o submódulo interno
- **PDFs do Pinterest com as imagens escolhidas** — Ariosto vai baixar e enviar (16 imagens = 4 por pilar)
- **Consultório físico do Ariosto** — ativo de produção não catalogado ainda; cenário para vídeo de landing page
- **Ritual do Quíron no Caos** — sessão dedicada pendente em `C:\Kolden\Caos\`
