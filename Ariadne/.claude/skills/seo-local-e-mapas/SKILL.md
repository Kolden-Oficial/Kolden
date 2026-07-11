---
name: seo-local-e-mapas
description: >
  Use quando a demanda for SEO local ou inteligência de mapas: Google Business
  Profile (GBP), consistência de NAP, citações, sinais de review, schema
  LocalBusiness, páginas de localização (multi-local), geo-grid de ranqueamento,
  Share of Local Voice (SoLV) e mapeamento de concorrentes por raio. Gatilhos:
  "SEO local", "GBP", "ficha do Google", "map pack", "pacote local", "NAP",
  "citações", "reviews locais", "negócio com endereço", "múltiplas unidades",
  "geo-grid", "concorrentes por raio". É uma frente NOVA da Ariadne (sem
  especialista local dedicado até então).
tipo: skill
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
---

# SEO Local & Inteligência de Mapas

Frente nova da Ariadne. Cobre dois planos complementares — **não duplique um no outro**:
- **Local (no site):** sinais de SEO local no HTML da página (NAP, schema, páginas de localização).
- **Mapas (nas plataformas):** como o negócio aparece no Google Maps/Bing Places/Apple/OSM, via APIs.

## Quando entra
Negócio com endereço físico (brick-and-mortar), de área de serviço (SAB — sem endereço visível, atende uma região) ou híbrido. **Detecte o tipo primeiro** — ele define quais checagens valem. SAB pula verificação de mapa embutido e consistência de endereço físico.

## Plano 1 — Local no site (fetch de HTML)
Avalie por dimensões ponderadas (ordem de impacto):
1. **Sinais de GBP (~25%)** — categoria primária é o fator #1 do pacote local; categoria errada é o pior negativo. Cheque referência ao GBP na página (iframe Maps, place id, widget de reviews), fotos, horário visível.
2. **Reviews e reputação (~20%)** — velocidade importa mais que volume; regra das 3 semanas (gap sem review novo derruba). `aggregateRating` no schema, resposta do dono, presença multiplataforma. **Veto:** review gating (pré-filtrar satisfação antes de direcionar à plataforma) é proibido pelo Google.
3. **On-page local (~20%)** — cidade+serviço no title/H1, NAP visível no HTML, **uma página dedicada por serviço**. Em multi-local: **teste de troca** — se dá pra trocar o nome da cidade e o conteúdo ainda faz sentido, é doorway page (penalizável). Exija >60% de conteúdo único por localização.
4. **NAP e citações (~15%)** — extraia Name/Address/Phone de 3 fontes (HTML, JSON-LD, GBP) e sinalize qualquer divergência. Recomende reivindicar Apple Business Connect e Bing Places (este alimenta ChatGPT/Copilot).
5. **Schema LocalBusiness (~10%)** — subtipo correto por vertical (Restaurant, LegalService, MedicalClinic, AutoDealer…), `geo` com ≥5 casas decimais, multi-local com `@id` próprio e `branchOf`.
6. **Autoridade local (~10%)** — Câmara de Comércio, menções de imprensa, listas "best of" (forte sinal de visibilidade em IA).

## Plano 2 — Mapas (APIs)
Detecte o tier de capacidade e **comunique-o ao usuário**:
- **Tier 0 (grátis):** descoberta de concorrentes e geocoding por APIs abertas; checklist estático de GBP; geração de schema.
- **Tier 1 (DataForSEO):** geo-grid de ranqueamento, auditoria de GBP ao vivo, inteligência de review (velocidade/sentimento/distribuição).

**Geo-grid:** simula buscas a partir de N coordenadas (padrão 7x7) e calcula **SoLV = (pontos no top 3 / total de pontos) × 100**, renderizando um heatmap. **Guarda de custo obrigatória:** toda varredura DataForSEO mostra a estimativa de crédito e **pede confirmação antes** de disparar.

## Saída
Score local 0-100 com quebra por dimensão + tipo de negócio + vertical detectada + auditoria de NAP (divergências por fonte) + status de schema (com JSON-LD pronto se faltar) + top 10 ações priorizadas (Crítico→Baixo) + disclaimer do que NÃO foi avaliável no tier atual.

## Handoffs e regras Kolden
- **Argos** (entrada): keywords locais, posição real no pacote, footprint do concorrente. A Ariadne consome, não coleta.
- **Égide:** validação de URL/SSRF de qualquer fetch é responsabilidade de segurança cross-cutting — não reimplementar aqui.
- **Infisical:** credenciais de DataForSEO/Google Maps **sempre** via Infisical, nunca em texto puro (`infisical-padrao`).
- **Sem black-hat:** veto a review gating, doorway pages e markup de review próprio (o Google ignora self-serving review markup).
- Dado os limites do `web_fetch` (não enxerga JSON-LD injetado por JS), validar schema por browser/Rich Results.

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skills `seo-local` + `seo-maps`, licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal. Estatísticas de mercado (Whitespark/BrightLocal/Sterling Sky etc.) ficam como referência a provisionar — confirmar na fonte antes de citar número.
