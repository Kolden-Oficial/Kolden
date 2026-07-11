---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F4 — Mapa de decisão · B12 = GIS (squad NOVO)

> **Bucket:** B12 (gap — domínio sem squad Kolden equivalente)
> **Inventário:** `inventario-gis.md` (43 IDs · G1-G43 · 13 agentes upstream)
> **Decisão Q2 do Ronan (2026-06-28):** criar squad-semente NOVO agora (não diferir para ROADMAP)
> **Padrão:** equivalente aos squads-semente do lote 2026-06-28 (Nomos, Cairos, Pactolo, Emporos, Hestia, Ananke) — 1 chief + 4 especialistas (~5 agentes)
> **Nome proposto (recomendado):** **Atlas** (ver §1 do F5)

## Sumário executivo

- Total de IDs: **43**
- Decisão dominante: **CREATE** (40 IDs · 93%) — domínio inteiro é novo na Kolden.
- **ADAPT** (3 IDs · 7%) — overlap parcial com Argos (QA de dados), Liceu (consultoria/roadmap) e Hefesto/Egide (engenharia de pipelines).
- **REUSE** (0 IDs) — nenhum padrão GIS pré-existente.
- **DESCARTAR** (0 IDs) — nada redundante; tudo é capacidade nova.
- **PERDIDO** (0 IDs) — invariante respeitada (ABSORVIDO + DESCARTADO = 43).

## Estrutura-semente proposta (5 agentes)

| Tier | Agente | Foco | IDs absorvidos |
|---|---|---|---|
| 0 | `atlas-chief` | Orquestração GIS, triagem (análise · dados · cartografia · captura), gate de qualidade, handoffs (Prometeu/Hefesto/Argos/Liceu/Egide) | — (apenas mandato cross-squad) |
| 1 | `analista-espacial` | Análise espacial, geoprocessamento, spatial statistics, GeoAI/ML | G5, G6, G7, G19, G20, G21, G22, G23, G24, G34, G35, G36, G37 (13) |
| 1 | `engenheiro-de-dados-espaciais` | ETL geoespacial, pipelines, Web GIS, performance, integração de fontes | G31, G32, G33, G41, G42, G43 (6) |
| 1 | `cartografo-de-visualizacao` | Design cartográfico, basemap, esquemas de cor, cenas 3D, point cloud | G1, G2, G3, G4, G12, G13, G14, G15 (8) |
| 1 | `engenheiro-de-captura-e-integracao` | Drone/fotogrametria, BIM↔GIS, digital twin, solution engineering, QA, consultoria estratégica | G8, G9, G10, G11, G16, G17, G18, G25, G26, G27, G28, G29, G30, G38, G39, G40 (16) |

Distribuição: 13 + 6 + 8 + 16 = **43 ✓**

## Mapa F4 — 43 IDs

| ID upstream | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G1 | Cenas 3D web (Cesium/ArcGIS Scene Viewer) | Atlas | cartografo-de-visualizacao | cena-3d-web | CREATE | Domínio inexistente; especialista de cartografia herda 3D-web |
| G2 | Point cloud LiDAR no web (LOD streaming) | Atlas | cartografo-de-visualizacao | cena-3d-web | CREATE | Técnica densa de visualização 3D; entra na mesma skill base |
| G3 | Composição pipeline 3D (terreno→imagery→features→labels) | Atlas | cartografo-de-visualizacao | cena-3d-web | CREATE | Método-prompt da skill cena-3d-web |
| G4 | Catálogo de cenas 3D por caso de uso | Atlas | cartografo-de-visualizacao | cena-3d-web | CREATE | Framework de referência embutido na skill |
| G5 | Operação GIS dia-a-dia (mapas, queries, QC) | Atlas | analista-espacial | analise-espacial-base | CREATE | Skill âncora do analista (perfil generalista GIS) |
| G6 | Workflow analyst (load→inspect→query→output→QC) | Atlas | analista-espacial | analise-espacial-base | CREATE | Método-prompt embutido na skill base |
| G7 | Catálogo de tipos de mapa por audiência | Atlas | analista-espacial | analise-espacial-base | CREATE | Framework embutido |
| G8 | Integração BIM↔GIS (Revit/IFC, digital twin) | Atlas | engenheiro-de-captura-e-integracao | bim-gis-digital-twin | CREATE | Skill âncora do especialista de captura |
| G9 | Pipeline BIM→GIS (georreferenciamento, conversão) | Atlas | engenheiro-de-captura-e-integracao | bim-gis-digital-twin | CREATE | Método-prompt da skill |
| G10 | Modelo de dados indoor BIM→GIS | Atlas | engenheiro-de-captura-e-integracao | bim-gis-digital-twin | CREATE | Schema-referência da skill |
| G11 | Princípios de digital twin progressivo | Atlas | engenheiro-de-captura-e-integracao | bim-gis-digital-twin | CREATE | Método-prompt complementar |
| G12 | Design cartográfico (cor, tipografia, hierarquia) | Atlas | cartografo-de-visualizacao | design-cartografico | CREATE | Skill âncora do cartógrafo |
| G13 | Seleção de basemap por contexto | Atlas | cartografo-de-visualizacao | design-cartografico | CREATE | Framework embutido |
| G14 | Esquema de cor por tipo de dado (CVD-safe) | Atlas | cartografo-de-visualizacao | design-cartografico | CREATE | Framework embutido |
| G15 | Workflow de design de mapa em 8 passos | Atlas | cartografo-de-visualizacao | design-cartografico | CREATE | Método-prompt da skill |
| G16 | Reality capture com drone (fotogrametria, GCP/RTK) | Atlas | engenheiro-de-captura-e-integracao | drone-reality-capture | CREATE | Skill âncora de captura aérea |
| G17 | Workflow drone mapping 10 passos | Atlas | engenheiro-de-captura-e-integracao | drone-reality-capture | CREATE | Método-prompt embutido |
| G18 | Especificações de produto drone (ortho/DTM/DSM/3D) | Atlas | engenheiro-de-captura-e-integracao | drone-reality-capture | CREATE | Framework embutido |
| G19 | Engenharia ML geoespacial (U-Net/YOLO/SAM) | Atlas | analista-espacial | geoai-ml | CREATE | Skill especializada; especialista de análise herda ML |
| G20 | Pipeline GeoAI (problem/data → model dev → deployment) | Atlas | analista-espacial | geoai-ml | CREATE | Método-prompt da skill |
| G21 | Validação de modelo geoespacial (per-class, MAUP) | Atlas | analista-espacial | geoai-ml | CREATE | Método-prompt embutido |
| G22 | Automação ArcPy/Model Builder | Atlas | analista-espacial | geoprocessamento-arcpy | CREATE | Skill operacional do analista |
| G23 | Padrão de tool .pyt com validação | Atlas | analista-espacial | geoprocessamento-arcpy | CREATE | Padrão técnico embutido |
| G24 | Tabela Python ↔ Model Builder | Atlas | analista-espacial | geoprocessamento-arcpy | CREATE | Framework embutido |
| G25 | QA de dados geoespaciais (geometria, CRS, topologia) | Atlas | engenheiro-de-captura-e-integracao | qa-geoespacial | ADAPT | Overlap parcial com Argos (QA de dados): ADAPT padrão genérico de QA para domínio espacial (CRS/topologia/accuracy) |
| G26 | Processo QA em 3 fases (intake → deep → delivery) | Atlas | engenheiro-de-captura-e-integracao | qa-geoespacial | CREATE | Checklist específico de domínio |
| G27 | Política de severidade e gate de QA | Atlas | engenheiro-de-captura-e-integracao | qa-geoespacial | CREATE | Framework de gate-policy embutido |
| G28 | Template de relatório de QA | Atlas | engenheiro-de-captura-e-integracao | qa-geoespacial | CREATE | Referência template embutida |
| G29 | Engenharia de solução GIS (PoC, demo, pré-venda) | Atlas | engenheiro-de-captura-e-integracao | solution-engineering-gis | CREATE | Skill de pré-venda/PoC para GIS |
| G30 | Demo hardening (offline-first, fallback, trap) | Atlas | engenheiro-de-captura-e-integracao | solution-engineering-gis | CREATE | Método-prompt embutido |
| G31 | ETL geoespacial (GDAL/OGR, pipelines, CRS) | Atlas | engenheiro-de-dados-espaciais | etl-geoespacial | CREATE | Skill âncora do engenheiro de dados |
| G32 | Princípios pipeline ETL (idempotente, log, config-driven) | Atlas | engenheiro-de-dados-espaciais | etl-geoespacial | CREATE | Método-prompt embutido |
| G33 | Catálogo de padrões de pipeline (CSV→GeoJSON, SHP→GPKG, etc.) | Atlas | engenheiro-de-dados-espaciais | etl-geoespacial | CREATE | Framework embutido |
| G34 | Spatial statistics (clusters, kriging, GWR, autocorrelação) | Atlas | analista-espacial | spatial-statistics | CREATE | Skill âncora de spatial DS |
| G35 | Workflow analítico em 7 passos (ESDA → comunicação) | Atlas | analista-espacial | spatial-statistics | CREATE | Método-prompt embutido |
| G36 | Catálogo de métodos analíticos (Gi*, GWR, Kriging, Moran's I) | Atlas | analista-espacial | spatial-statistics | CREATE | Framework embutido |
| G37 | Rigor estatístico (MAUP, autocorrelação dos resíduos) | Atlas | analista-espacial | spatial-statistics | CREATE | Método-prompt complementar |
| G38 | Consultoria técnica GIS (gap analysis, roadmap, RFP, ROI) | Atlas | engenheiro-de-captura-e-integracao | consultoria-gis-estrategica | ADAPT | Overlap parcial com Liceu (consultoria estratégica): ADAPT método-prompt de roadmap para domínio GIS |
| G39 | Roadmap em fases (data audit → quick win → escala → otimização) | Atlas | engenheiro-de-captura-e-integracao | consultoria-gis-estrategica | CREATE | Método-prompt específico de domínio |
| G40 | Comunicação executiva GIS (no jargon, tiers, quantificar impacto) | Atlas | engenheiro-de-captura-e-integracao | consultoria-gis-estrategica | CREATE | Método-prompt embutido |
| G41 | Web GIS (MapLibre, ArcGIS JS, Leaflet, Deck.gl, Cesium) | Atlas | engenheiro-de-dados-espaciais | web-gis-dev | CREATE | Skill âncora de web/visualização interativa |
| G42 | Seleção de biblioteca web GIS por necessidade | Atlas | engenheiro-de-dados-espaciais | web-gis-dev | CREATE | Framework embutido |
| G43 | Performance Web GIS (vector tiles, mobile, 3G/4G) | Atlas | engenheiro-de-dados-espaciais | web-gis-dev | ADAPT | Overlap parcial com Hefesto (performance web genérica): ADAPT princípios para domínio espacial (tile size, memória mobile) |

## Reconciliação (invariante de absorção sem perda)

- **ABSORVIDO:** 43 IDs (40 CREATE + 3 ADAPT)
- **DESCARTADO:** 0
- **PERDIDO:** 0
- **Total inventário F3:** 43 ✓
- **Invariante:** `count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == count(inventário F3)` → `43 + 0 + 0 == 43` ✓

## Distribuição por skill nova (8 skills)

| Skill | IDs | Dono |
|---|---|---|
| `analise-espacial-base` | G5, G6, G7 (3) | analista-espacial |
| `geoai-ml` | G19, G20, G21 (3) | analista-espacial |
| `geoprocessamento-arcpy` | G22, G23, G24 (3) | analista-espacial |
| `spatial-statistics` | G34, G35, G36, G37 (4) | analista-espacial |
| `etl-geoespacial` | G31, G32, G33 (3) | engenheiro-de-dados-espaciais |
| `web-gis-dev` | G41, G42, G43 (3) | engenheiro-de-dados-espaciais |
| `cena-3d-web` | G1, G2, G3, G4 (4) | cartografo-de-visualizacao |
| `design-cartografico` | G12, G13, G14, G15 (4) | cartografo-de-visualizacao |
| `bim-gis-digital-twin` | G8, G9, G10, G11 (4) | engenheiro-de-captura-e-integracao |
| `drone-reality-capture` | G16, G17, G18 (3) | engenheiro-de-captura-e-integracao |
| `qa-geoespacial` | G25, G26, G27, G28 (4) | engenheiro-de-captura-e-integracao |
| `solution-engineering-gis` | G29, G30 (2) | engenheiro-de-captura-e-integracao |
| `consultoria-gis-estrategica` | G38, G39, G40 (3) | engenheiro-de-captura-e-integracao |

Total: **13 skills âncora · 43 IDs**.

> Nota: o lote-semente padrão Caos prevê ~5 skills âncora iniciais. Aqui temos 13 porque o domínio é amplo. Estratégia: **5 skills entram no nascimento** (uma por agente + a chief); as 8 restantes ficam no `catalogo.md` como **pendentes do Ritual de refino** — esquema idêntico ao usado pelos seeds 2026-06-28 que listam frentes para o Ritual posterior.

## Skills no nascimento (subset de 5)

| Skill | Dono | Justificativa |
|---|---|---|
| `analise-espacial-base` | analista-espacial | Capacidade-base do analista (workflow diário GIS) |
| `etl-geoespacial` | engenheiro-de-dados-espaciais | Capacidade-base do engenheiro (ingestão/CRS/pipeline) |
| `design-cartografico` | cartografo-de-visualizacao | Capacidade-base do cartógrafo (mapa publicável) |
| `qa-geoespacial` | engenheiro-de-captura-e-integracao | Capacidade-base do engenheiro de captura (gate de qualidade) |
| `triagem-gis` | atlas-chief | Skill do chief: classifica pedido em análise/dados/cartografia/captura e roteia |

As 9 demais skills (geoai-ml, geoprocessamento-arcpy, spatial-statistics, web-gis-dev, cena-3d-web, bim-gis-digital-twin, drone-reality-capture, solution-engineering-gis, consultoria-gis-estrategica) entram em `agents/<dono>.md` como capacidade declarada e ficam **pendentes de skill formal** — refino pelo Ritual do Caos posterior.

## Mandato cross-squad do chief

`atlas-chief` faz handoff para:
- **Argos** quando QA de dados extrapolar o espacial (validação genérica de schema/integridade)
- **Liceu** quando consultoria estratégica virar transformação organizacional (governança, vendor selection multi-domínio)
- **Hefesto** quando engenharia de software (build de produto Web GIS) for o foco (Prometeu/AIOX assume)
- **Egide** quando integração tocar segurança/conformidade (LGPD em dados de localização, IPTC/XMP em imagens, perímetro de captura)
- **Metis** quando relatório/dashboard pedir métricas de tráfego/uso (GA4 sobre o produto GIS)
- **Aletheia** quando o pedido for descoberta/validação de oportunidade (não há cliente ainda)

## Próximas decisões (Ritual posterior)

1. Confirmar nome **Atlas** (rodada 0 do diagnóstico — ver F5).
2. Refinar as 9 skills pendentes em ordem de demanda real.
3. Decidir se `engenheiro-de-captura-e-integracao` deve ser **dividido** em 2 agentes (captura física vs. consultoria/QA) quando a carga de uso justificar — hoje carrega 16 IDs, o dobro do segundo maior.
4. Catalogar vendor stack obrigatório: ArcGIS Pro (proprietário), QGIS (FOSS4G), PostGIS, GDAL/OGR, Cesium/MapLibre, ArcGIS Online (AGOL), Hugging Face para GeoAI.
