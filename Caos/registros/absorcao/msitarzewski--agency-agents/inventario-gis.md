# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `gis/`

Granularidade: 1 base por agente + técnicas transferíveis salientes. Total esperado: 13 (bases) + ~13-39 (técnicas) = 26-52 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Desenvolvimento de cenas 3D web (terreno, point cloud, 3D Tiles) com Cesium/ArcGIS Scene Viewer | agente | 3d-scene, cesium, terreno, point-cloud, 3d-tiles | gis | gis/gis-3d-scene-developer.md:2 |
| G2 | Visualização de point cloud LiDAR no web (classificação por elevação/intensidade/RGB, LOD streaming, medição) | skill | point-cloud, lidar, lod-streaming, web-3d | gis | gis/gis-3d-scene-developer.md:27 |
| G3 | Composição de cena 3D em pipeline: terreno → imagery → features → labels → interações, com otimização por tile/LOD e streaming progressivo | metodo-prompt | 3d-pipeline, tiling, lod, streaming | gis | gis/gis-3d-scene-developer.md:65 |
| G4 | Catálogo de tipos de cena 3D por caso de uso (terrain flyover, city, underground, indoor, point cloud viewer) com tech mapping | framework | cena-3d, catalogo, casos-uso | gis | gis/gis-3d-scene-developer.md:76 |
| G5 | Operação GIS dia-a-dia: produção de mapas, gestão de camadas, queries espaciais e QC de dados (ArcGIS Pro / QGIS / AGOL) | agente | gis-analyst, mapas, queries, qc | gis | gis/gis-analyst.md:2 |
| G6 | Workflow de operações diárias do GIS analyst (load → inspect CRS → query/analysis → output → QC → entrega documentada) | metodo-prompt | workflow-diario, inspect, qc | gis | gis/gis-analyst.md:55 |
| G7 | Catálogo de tipos de mapa por audiência (referência, temático, análise, dashboard) com considerações-chave | framework | tipos-de-mapa, audiencia | gis | gis/gis-analyst.md:65 |
| G8 | Integração BIM↔GIS (Revit/IFC ↔ feature classes/scene layers, indoor mapping, digital twins) | agente | bim, gis, revit, ifc, digital-twin | gis | gis/gis-bim-specialist.md:2 |
| G9 | Pipeline BIM→GIS (avaliação Revit/IFC → georreferenciamento Survey/Project Base Point → conversão → mapeamento de atributos → validação) | metodo-prompt | bim-to-gis, georreferenciamento, conversao | gis | gis/gis-bim-specialist.md:54 |
| G10 | Modelo de dados padrão para indoor BIM→GIS (Building/Floor/Room/Corridor/Door/Window/Utility com tipos de geometria) | framework | indoor-gis, modelo-de-dados, schema | gis | gis/gis-bim-specialist.md:72 |
| G11 | Princípios de digital twin progressivo (escopo claro, plano de decaimento de dados, enriquecimento por camadas) | metodo-prompt | digital-twin, governanca, enriquecimento | gis | gis/gis-bim-specialist.md:47 |
| G12 | Design cartográfico de mapas (cor, tipografia, hierarquia visual, basemap, composição) para print e web | agente | cartografia, design, color, tipografia | gis | gis/gis-cartography-designer.md:2 |
| G13 | Guia de seleção de basemap por contexto (street/satellite/terrain/minimal/dark/no-basemap com exemplos) | framework | basemap, selecao, contexto | gis | gis/gis-cartography-designer.md:74 |
| G14 | Guia de seleção de esquema de cor por tipo de dado (sequential, diverging, qualitative, binary) com CVD-safe | framework | esquema-de-cor, colorbrewer, cvd | gis | gis/gis-cartography-designer.md:84 |
| G15 | Workflow de design de mapa em 8 passos (propósito → formato → basemap → temática → labels → layout → review → export) | metodo-prompt | workflow-cartografia, design | gis | gis/gis-cartography-designer.md:62 |
| G16 | Reality capture com drone: planejamento de voo, fotogrametria, ortomosaico/DTM/DSM/mesh/point cloud com GCP/RTK | agente | drone, fotogrametria, ortomosaico, gcp, rtk | gis | gis/gis-drone-reality-mapping.md:2 |
| G17 | Workflow ponta-a-ponta de drone mapping (10 passos: planejamento → GCP → voo → pré-proc → fotogrametria → otimização → classificação → QC report → export → publicação GIS) | metodo-prompt | drone-workflow, qc, gcps | gis | gis/gis-drone-reality-mapping.md:67 |
| G18 | Especificações de produto por tipo (orthomosaic/DTM/DSM/3D Mesh/point cloud) com GSD, caso de uso e formato-alvo | framework | produtos-drone, gsd, formatos | gis | gis/gis-drone-reality-mapping.md:81 |
| G19 | Engenharia de ML geoespacial (feature extraction, segmentação, detecção em imagery aérea/satélite) com U-Net/YOLO/SAM | agente | geoai, ml-geoespacial, segmentacao, deteccao | gis | gis/gis-geoai-ml-engineer.md:2 |
| G20 | Pipeline GeoAI em 3 fases (problem/data → model dev → deployment) com export ONNX, tile+inferência+vetorização+monitoramento de drift | metodo-prompt | pipeline-ml, onnx, drift | gis | gis/gis-geoai-ml-engineer.md:55 |
| G21 | Regras de validação de modelo geoespacial (per-class metrics, teste em geografia não vista, ground truth visual, documentação de failure modes) | metodo-prompt | validacao-ml, failure-modes, ground-truth | gis | gis/gis-geoai-ml-engineer.md:42 |
| G22 | Automação de geoprocessamento (Python Toolbox .pyt, Model Builder, ArcPy, batch processing) no ArcGIS | agente | arcpy, pyt, model-builder, automacao | gis | gis/gis-geoprocessing-specialist.md:2 |
| G23 | Padrão de tool .pyt com validação (updateParameters/updateMessages), mensagens significativas, dependências de parâmetro e progress reporting | skill | pyt, validacao-de-tool, progressor | gis | gis/gis-geoprocessing-specialist.md:40 |
| G24 | Tabela de mapeamento de padrões automação Python ↔ Model Builder (batch clip, map series, attribute update, spatial join, raster mosaic) | framework | padroes-automacao, mapeamento, mb-vs-python | gis | gis/gis-geoprocessing-specialist.md:64 |
| G25 | QA de dados geoespaciais (geometria, CRS, atributos, topologia, metadados, accuracy, serviços) com gate policy estrito | agente | gis-qa, validacao, topologia, accuracy | gis | gis/gis-qa-engineer.md:2 |
| G26 | Processo QA em 3 fases com checklists (intake → deep validation → service & delivery) cobrindo geometria, CRS, topologia, REST, simbologia, performance | metodo-prompt | qa-checklist, intake, deep-validation, delivery | gis | gis/gis-qa-engineer.md:61 |
| G27 | Política de severidade e gate de QA (Critical/Major/Minor/Suggestion, evidência reproduzível, re-verify de fixes) | framework | severidade, gate-policy, evidencia | gis | gis/gis-qa-engineer.md:47 |
| G28 | Template de relatório de QA (Status PASS/CONDITIONAL/FAIL, contagem por severidade, findings detalhados) | referencia | qa-report, template | gis | gis/gis-qa-engineer.md:111 |
| G29 | Engenharia de solução GIS (PoC, demo de pré-venda, validação técnica em Esri + open-source) | agente | solution-engineer, poc, demo, pre-venda | gis | gis/gis-solution-engineer.md:2 |
| G30 | Princípios de demo hardening (offline-first, fallback de screenshots/video, trap de 404/timeout/permissão, time-box de exploração) | metodo-prompt | demo-hardening, offline-fallback | gis | gis/gis-solution-engineer.md:38 |
| G31 | Engenharia de dados espacial / ETL geoespacial (ingestão, limpeza, conversão de CRS, normalização de schema, pipelines) | agente | etl-geoespacial, gdal, ogr, pipeline | gis | gis/gis-spatial-data-engineer.md:2 |
| G32 | Princípios de pipeline ETL geoespacial (reproject explícito, validação pós-transformação, preservação da fonte, log de tudo) e automação idempotente/config-driven | metodo-prompt | etl-principios, idempotente, log | gis | gis/gis-spatial-data-engineer.md:41 |
| G33 | Catálogo de padrões de pipeline (CSV→GeoJSON, SHP→GeoPackage, DWG→GIS, API→PostGIS, SHP→AGOL) com tools e caso de uso | framework | pipeline-padroes, mapeamento-formatos | gis | gis/gis-spatial-data-engineer.md:65 |
| G34 | Ciência de dados espacial / spatial statistics (clusters, autocorrelação, regressão espacial, kriging, point pattern, GWR) | agente | spatial-statistics, geopandas, pysal, r-sf | gis | gis/gis-spatial-data-scientist.md:2 |
| G35 | Workflow analítico em 7 passos (problema → ESDA → seleção de método → fit → diagnóstico → interpretação geográfica → comunicação) | metodo-prompt | esda, workflow-analitico, diagnostico | gis | gis/gis-spatial-data-scientist.md:61 |
| G36 | Catálogo de métodos analíticos espaciais (Getis-Ord Gi*, GWR, Kriging, DBSCAN, Moran's I, K-function) com aplicação e conceito | framework | metodos-analiticos, getis-ord, gwr, moran | gis | gis/gis-spatial-data-scientist.md:73 |
| G37 | Rigor estatístico em análise espacial (testar autocorrelação nos resíduos, vigilância de MAUP, reportar incerteza, separar correlação de causação) | metodo-prompt | rigor-estatistico, maup, autocorrelacao | gis | gis/gis-spatial-data-scientist.md:47 |
| G38 | Consultoria técnica estratégica GIS (gap analysis, technology roadmap, RFP, ROI, vendor-neutral Esri/FOSS4G) | agente | technical-consultant, estrategia, roadmap, rfp | gis | gis/gis-technical-consultant.md:2 |
| G39 | Roadmap em fases para adoção de GIS (Fase 0 data audit obrigatória → Fase 1 quick win em 8 semanas → Fase 2 escala → Fase 3 otimização) com governança | metodo-prompt | roadmap-faseado, data-audit, quick-win | gis | gis/gis-technical-consultant.md:67 |
| G40 | Comunicação executiva sem jargão (quantificar impacto, oferecer tiers Quick win/Full/Enterprise, banir GIS jargon com stakeholders) | metodo-prompt | comunicacao-executiva, tiers, no-jargon | gis | gis/gis-technical-consultant.md:42 |
| G41 | Desenvolvimento de Web GIS (MapLibre, ArcGIS JS API, Leaflet, Deck.gl, Cesium, dashboards real-time, OGC/REST) | agente | web-gis, maplibre, arcgis-js, leaflet, deckgl | gis | gis/gis-web-gis-developer.md:2 |
| G42 | Guia de seleção de biblioteca web por necessidade (3D terreno/globe, Esri ecosystem, vector tile, leve, grande dado, time-series) | framework | selecao-biblioteca-web, deckgl, cesium, maplibre | gis | gis/gis-web-gis-developer.md:72 |
| G43 | Regras de performance Web GIS (não carregar todas features; vector tiles em vez de GeoJSON em produção; testar em 3G/4G; cuidado com memória mobile) | metodo-prompt | performance-web-gis, vector-tiles, mobile | gis | gis/gis-web-gis-developer.md:53 |

**Total: 43 capacidades (G1–G43).**

## Resumo por agente upstream

- **gis-3d-scene-developer.md** → G1 (base) + G2, G3, G4 (3 técnicas)
- **gis-analyst.md** → G5 (base) + G6, G7 (2 técnicas)
- **gis-bim-specialist.md** → G8 (base) + G9, G10, G11 (3 técnicas)
- **gis-cartography-designer.md** → G12 (base) + G13, G14, G15 (3 técnicas)
- **gis-drone-reality-mapping.md** → G16 (base) + G17, G18 (2 técnicas)
- **gis-geoai-ml-engineer.md** → G19 (base) + G20, G21 (2 técnicas)
- **gis-geoprocessing-specialist.md** → G22 (base) + G23, G24 (2 técnicas)
- **gis-qa-engineer.md** → G25 (base) + G26, G27, G28 (3 técnicas)
- **gis-solution-engineer.md** → G29 (base) + G30 (1 técnica)
- **gis-spatial-data-engineer.md** → G31 (base) + G32, G33 (2 técnicas)
- **gis-spatial-data-scientist.md** → G34 (base) + G35, G36, G37 (3 técnicas)
- **gis-technical-consultant.md** → G38 (base) + G39, G40 (2 técnicas)
- **gis-web-gis-developer.md** → G41 (base) + G42, G43 (2 técnicas)

Total: 13 bases + 30 técnicas = **43 IDs** (dentro da faixa 26-52 esperada).
