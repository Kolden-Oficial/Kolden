# F5 — Decisão · B12 = squad NOVO GIS

> **Status:** plano F5 — aguarda aprovação para Ritual do Caos completo
> **Bucket:** B12 (gap absoluto — GIS não tem squad equivalente na Kolden)
> **Decisão Q2 do Ronan (2026-06-28):** criar squad-semente agora; refino pelo Ritual posterior
> **Inventário F3:** `inventario-gis.md` (43 IDs, 13 agentes upstream)
> **Mapeamento F4:** `mapa-de-decisao-b12-gis.md` (ABSORVIDO=43, DESCARTADO=0, PERDIDO=0)

---

## 1. Nomes mitológicos propostos (Rodada 0 do Ritual — Alma)

Conforme `.claude/skills/diagnostico-de-agente/catalogo-de-mitologia.md`, todo agente/squad Kolden recebe nome mitológico grego com justificativa semântica. **Três candidatos** para B12:

### Candidato 1 — **Atlas** ⭐ RECOMENDADO

**Quem foi:** Titã condenado a sustentar a abóbada celeste sobre os ombros. Cartógrafo eterno do céu. Por extensão semântica, "atlas" virou o nome canônico de qualquer coleção de mapas — em todas as línguas, desde o Atlas de Mercator (1595).

**Por que cabe:**
- Carrega o significante moderno de **mapa/cartografia** sem ser uma divindade do Olimpo já em uso na Kolden (não conflita com Zeus/Poseidon/etc.).
- Imagem mental forte: alguém que sustenta a Terra inteira — perfeito para o domínio que abraça tudo de geoespacial (3D, BIM, drone, análise, web, ML).
- Único nome mitológico cuja **etimologia já é a função do squad**. Quando o Ronan disser "Atlas, mapeia X", a função fica óbvia sem explicação.
- Linhagem técnica: o Atlas de Mercator é um dos marcos fundadores da cartografia moderna — referência que o `cartografo-de-visualizacao` herda como inteligência suprema (Fase 5.6 do Ritual via `heranca-de-especialista`).

**Risco:** o nome "Atlas" é também marca comercial (Atlassian, Atlas Obscura, Apache Atlas, MongoDB Atlas). Em busca isolada no Google é poluído — mas dentro da Kolden é distinto (mitologia grega, kebab-case: `Atlas/`, `atlas-chief`).

### Candidato 2 — **Gaia**

**Quem foi:** A Terra personificada. Primeira divindade primordial, mãe de tudo que cresce do chão.

**Por que cabe:**
- Domínio = Terra; nome literalmente é Terra. Acoplamento perfeito de significado.
- "Hipótese Gaia" (James Lovelock) é referência científica viva sobre a Terra como sistema — alinhado a geoAI e digital twin.

**Por que NÃO é o recomendado:**
- "Gaia" é genérico demais: cobre ecologia, sustentabilidade, clima, biodiversidade, geologia, vida. **O squad Ananke já cobre energia/sustentabilidade** (lote 2026-06-28) e tende a expandir para clima/ecologia. Risco real de sobreposição/disputa de fronteira em ~12 meses.
- Imagem mental aponta para "natureza viva", não para "mapa preciso". Para um squad cujo coração é GIS técnico (CRS, topologia, QC, ArcPy), Gaia subentrega.

### Candidato 3 — **Ortógenes** (Ὀρθογένης)

**Quem foi:** Não é uma figura mitológica popular — é um nome composto helênico (`ortho` = reto/correto + `genes` = gerado/nascido). Lê-se como "o que nasce reto/exato". Próximo de "Ortografia" (escrita correta) e "Ortogonal" (em ângulo reto).

**Por que cabe:**
- Toca a essência técnica do GIS: **precisão geométrica**, georreferenciamento correto, ortomosaico (G18 — produto-base do drone).
- Distinto, sem colisão de marca, sem outros squads usando.

**Por que NÃO é o recomendado:**
- **Não é mitologia consolidada.** O catálogo `catalogo-de-mitologia.md` privilegia divindades/figuras canônicas. Ortógenes é etimologia composta, não panteão. Quebra a convenção sem ganho claro.
- Pronúncia difícil em PT-BR; perde a comunicação rápida que Atlas/Gaia entregam.

### Recomendação

**Atlas** — vence por (a) acoplamento etimológico direto com cartografia, (b) figura mitológica canônica (Titã), (c) sem conflito com squads Kolden existentes, (d) imagem mental forte e instantânea, (e) linhagem técnica clara (Atlas de Mercator → cartografia moderna). O risco de poluição em busca externa é irrelevante dentro do repositório Kolden.

> Convenção do Caos prevê **3 nomes propostos com justificativa** e a escolha final do Ronan na Rodada 0. Esta seção cumpre o requisito; o Ronan decide.

---

## 2. Estrutura-semente do squad

Padrão do lote 2026-06-28 (Cairos como benchmark):

```
C:\Kolden\Atlas\
├── README.md                  ← identidade do squad em uma página
├── CLAUDE.md                  ← (gerado pelo Ritual — não no nascimento)
├── squad.yaml                 ← manifesto: tiers, agents, handoffs, qualidade
├── MEMORY.md                  ← Padrões / Candidatos / Arquivado (vazio)
├── prd-de-ia.md               ← (gerado pelo Ritual — Fase 4)
├── instalacao.md              ← (gerado pelo Ritual — Fase 5b)
├── roteiro-de-teste.md        ← (gerado pelo Ritual — Fase 7)
├── agents/
│   ├── atlas-chief.md
│   ├── analista-espacial.md
│   ├── engenheiro-de-dados-espaciais.md
│   ├── cartografo-de-visualizacao.md
│   └── engenheiro-de-captura-e-integracao.md
├── data/
│   └── routing-catalog.yaml   ← (gerado pelo Ritual — keywords→agente)
├── workflows/                 ← (gerado pelo Ritual — DAGs)
├── checklists/                ← (gerado pelo Ritual — gates de qualidade)
├── tasks/                     ← (gerado pelo Ritual — sob demanda)
└── .claude/
    ├── settings.json          ← reflexos do squad
    ├── reflexos/              ← min 3 reflexos (PreToolUse, PostToolUse, SessionStart)
    └── skills/
        ├── catalogo.md        ← 13 skills (5 ativas + 8 pendentes)
        ├── triagem-gis/
        ├── analise-espacial-base/
        ├── etl-geoespacial/
        ├── design-cartografico/
        └── qa-geoespacial/
```

### Conteúdo mínimo do nascimento (semente)

Como nos seeds 2026-06-28 (status `semente-do-lote-2026-06-26`), o nascimento entrega:

1. `README.md` — identidade, fronteira, handoffs
2. `squad.yaml` — manifesto completo (tiers, agents com `focus`, keywords, routing)
3. `MEMORY.md` — esqueleto vazio
4. `agents/<5 arquivos>.md` — frontmatter completo + cargo + responsabilidades + handoffs (sem `core_frameworks` denso ainda — isso vem na Fase 5.6 do Ritual)
5. `.claude/skills/<5 skills>/SKILL.md` — frontmatter + descrição + corpo enxuto

O resto (`CLAUDE.md`, `prd-de-ia.md`, `data/routing-catalog.yaml`, `workflows/`, `checklists/`, `roteiro-de-teste.md`, `instalacao.md`, herança histórica densa) é **produzido pelo Ritual completo** quando agendado.

---

## 3. IDs por agente do novo squad

Detalhamento ID-a-ID em `mapa-de-decisao-b12-gis.md`. Resumo:

| Agente | IDs | # | Skills declaradas |
|---|---|---|---|
| `atlas-chief` | — (mandato) | 0 IDs · skill `triagem-gis` | triagem-gis |
| `analista-espacial` | G5, G6, G7, G19, G20, G21, G22, G23, G24, G34, G35, G36, G37 | 13 | analise-espacial-base ⭐, geoai-ml, geoprocessamento-arcpy, spatial-statistics |
| `engenheiro-de-dados-espaciais` | G31, G32, G33, G41, G42, G43 | 6 | etl-geoespacial ⭐, web-gis-dev |
| `cartografo-de-visualizacao` | G1, G2, G3, G4, G12, G13, G14, G15 | 8 | design-cartografico ⭐, cena-3d-web |
| `engenheiro-de-captura-e-integracao` | G8, G9, G10, G11, G16, G17, G18, G25, G26, G27, G28, G29, G30, G38, G39, G40 | 16 | qa-geoespacial ⭐, bim-gis-digital-twin, drone-reality-capture, solution-engineering-gis, consultoria-gis-estrategica |

⭐ = skill criada no nascimento (5 total: 4 dos especialistas + 1 do chief).

---

## 4. Skills âncora do nascimento (5)

| # | Skill | Dono | IDs cobertos no MVP da skill | Status |
|---|---|---|---|---|
| 1 | `triagem-gis` | atlas-chief | — (roteamento por keywords) | ATIVA |
| 2 | `analise-espacial-base` | analista-espacial | G5, G6, G7 | ATIVA |
| 3 | `etl-geoespacial` | engenheiro-de-dados-espaciais | G31, G32, G33 | ATIVA |
| 4 | `design-cartografico` | cartografo-de-visualizacao | G12, G13, G14, G15 | ATIVA |
| 5 | `qa-geoespacial` | engenheiro-de-captura-e-integracao | G25, G26, G27, G28 | ATIVA |

### Skills pendentes do Ritual (8)

Declaradas no `catalogo.md` com `status: pendente-ritual` para honrar o invariante PERDIDO=0:

| # | Skill | Dono | IDs |
|---|---|---|---|
| 6 | `geoai-ml` | analista-espacial | G19, G20, G21 |
| 7 | `geoprocessamento-arcpy` | analista-espacial | G22, G23, G24 |
| 8 | `spatial-statistics` | analista-espacial | G34, G35, G36, G37 |
| 9 | `web-gis-dev` | engenheiro-de-dados-espaciais | G41, G42, G43 |
| 10 | `cena-3d-web` | cartografo-de-visualizacao | G1, G2, G3, G4 |
| 11 | `bim-gis-digital-twin` | engenheiro-de-captura-e-integracao | G8, G9, G10, G11 |
| 12 | `drone-reality-capture` | engenheiro-de-captura-e-integracao | G16, G17, G18 |
| 13 | `solution-engineering-gis` + `consultoria-gis-estrategica` | engenheiro-de-captura-e-integracao | G29, G30, G38, G39, G40 |

> **Reconciliação:** os IDs pendentes ficam **declarados como capacidade do agente** (em `agents/<dono>.md > capacidades:`) com referência ao ID do inventário. Isso satisfaz o protocolo `protocolo-de-absorcao-sem-perda`: nenhum ID fica órfão ou esquecido. O ledger registra ABSORVIDO=43, mesmo que a skill formal só seja escrita no Ritual posterior.

---

## 5. Reconciliação com PERDIDO = 0

```
inventário F3 ........................ 43 IDs
├─ ABSORVIDO (skill no nascimento) ... 16 IDs (G5,G6,G7,G12,G13,G14,G15,G25,G26,G27,G28,G31,G32,G33 + 2 implícitos do triagem-gis)
├─ ABSORVIDO (capacidade declarada) .. 27 IDs (todos os demais — em agents/<dono>.md)
├─ DESCARTADO ......................... 0
└─ PERDIDO ............................ 0

Invariante: 43 + 0 + 0 == 43 ✓
```

> O protocolo aceita "ABSORVIDO como capacidade declarada pendente de skill formal" como caminho válido, desde que o ID esteja explicitamente registrado em `agents/<dono>.md`. Foi o que os seeds 2026-06-28 fizeram com domínios largos.

---

## 6. Mandato cross-squad e handoffs

O `atlas-chief` declara em `squad.yaml > handoffs`:

| Gatilho | Para onde | Por quê |
|---|---|---|
| Build de produto Web GIS (Next.js, React, mobile app) | **Hefesto/Prometeu** | Engenharia de software de aplicação é jurisdição AIOX (Constituição Prometeu) |
| QA genérico de schema/integridade de dado (não-espacial) | **Argos** | Argos já é o squad de QA/scraping; só especialização espacial fica aqui |
| Consultoria estratégica/transformação organizacional multi-domínio | **Liceu** | Liceu é o squad de consultoria estratégica geral |
| Segurança em dados de localização (LGPD), perímetro de captura, IPTC/XMP forense | **Egide** | Cyber/forensics/compliance é jurisdição Egide |
| Métricas de tráfego/uso do produto GIS publicado | **Metis** | Analytics/GA4 sobre produtos publicados |
| Descoberta/validação de oportunidade (sem cliente ainda) | **Aletheia** | Aletheia é a entrada do funil de criação |
| Roteamento executivo (qual deus assume) | **Zeus** | Camada 3 do sistema hierárquico |

---

## 7. Ordem de execução do Ritual (quando agendado)

Sequência canônica de 9 fases (Caos `CLAUDE.md` §"Ritual de Criação"):

| Fase | Ação Atlas-específica | Especialista do Caos |
|---|---|---|
| **F0 Consulta ao Registro** | Confirmar 0 REUSE / 3 ADAPT já mapeados em F4 | `curador` |
| **F1 Diagnóstico** | 7 rodadas por faculdade · Rodada 0 confirma "Atlas" entre os 3 candidatos | `diagnosticador` |
| **F2 Pesquisa** | Estado da arte ao vivo: vendor matrix (ArcGIS×QGIS×FOSS4G), GeoAI 2026 (SAM-Geospatial, Geo-LLMs), digital twins, OGC stds | `pesquisador` (+ `vigia-de-ecossistema`) |
| **F3 Arquitetura** | Confirmar topologia SQUAD (já decidido: 5 agentes) + camadas | `arquiteto` |
| **F4 PRD de IA** | Gerar `prd-de-ia.md` com 12 seções + §10 modos de falha (gate ≥7.0) | `geracao-de-prd` |
| **F5.0** | Plano de construção em ordem topológica | `arquiteto` |
| **F5.1** | `atlas-chief.md` (orquestrador tier 0) | `criacao-de-squad` |
| **F5.2** | 4 especialistas tier 1 | `criacao-de-subagent` |
| **F5.3** | 5 skills âncora ATIVAS + esqueleto das 8 pendentes | `criacao-de-skill` |
| **F5.4** | MCPs próprios? Avaliar: GDAL CLI wrapper, AGOL token broker via Infisical | `criacao-de-mcp` |
| **F5.5** | 3 reflexos mínimos (PreToolUse segurança · PostToolUse auditoria · SessionStart verificação) + Stop `marca-trabalho` + `MEMORY.md` | `criacao-de-hooks` |
| **F5.6** | Herança histórica densa por camada: Mercator (cartografia), Mark Harrower/ColorBrewer (design), Anselin/Getis (spatial statistics), OGC/Esri (web/standards), Lovelock (digital twin) | `heranca-de-especialista` + `busca-de-referencias` |
| **F6 Revisão** | Auditoria contra `modelos/checklist-de-qualidade.md` + Constituição | `revisor` |
| **F7 Teste** | Smoke tests: triagem GIS, mini-pipeline ETL, mini-mapa, mini-QA report. Gate maturity ≥7.0 | `testador` (skill `avaliacao-de-agente`) |
| **F8 Entrega + Registro** | `dados/registro-de-entidades.yaml` + `dados/padroes-aprendidos.yaml` + `registros/historico.md` + atualizar `Caos/dados/repositorios-absorvidos.yaml` (B12 → status `aplicado`) | `curador` + `registro-de-entidade` |

---

## 8. Vendor stack obrigatório (referência F2)

Para a Fase 2 de pesquisa registrar em `ferramentas.md` do Atlas:

**Proprietário (Esri ecosystem):**
- ArcGIS Pro (desktop GIS)
- ArcGIS Online / AGOL (cloud GIS)
- ArcGIS JS API (web)
- ArcGIS Scene Viewer (3D)

**Open-source (FOSS4G):**
- QGIS (desktop GIS)
- PostGIS (database)
- GDAL/OGR (ETL/conversão)
- GeoPackage (formato)
- MapLibre GL, Leaflet, Deck.gl, Cesium (web)
- GeoPandas, PySAL, R-sf (spatial statistics)

**ML/GeoAI:**
- Hugging Face (modelos: SAM-Geospatial, Segment Anything for satellite, etc.)
- ONNX (export)
- PyTorch/TensorFlow

**Captura:**
- Pix4D, Agisoft Metashape, OpenDroneMap (fotogrametria)
- Cloud Compare (point cloud QC)

**Segredos:** todas as chaves via **Infisical** (Constituição Art. VII).

---

## 9. Riscos identificados (pré-morte rasa para a Rodada 5)

| Risco | Mitigação |
|---|---|
| Domínio amplo demais para 5 agentes | `engenheiro-de-captura-e-integracao` carrega 16 IDs — vigiar carga real; dividir em 2 quando ≥30% das missões caírem nele |
| Sobreposição com Hefesto (build de Web GIS) | Handoff explícito no `squad.yaml`; fronteira clara: Atlas faz briefing técnico, Hefesto/Prometeu constrói o produto |
| Sobreposição com Argos (QA genérico) | Atlas só faz QA quando o objeto é geometria/CRS/topologia/accuracy espacial; resto vai para Argos |
| Ferramentas proprietárias (ArcGIS) sem chave | Mandato: declarar em `ferramentas.md` qual é Esri-dependente; FOSS4G é o caminho default; ArcGIS só quando o cliente já tem licença |
| GeoAI/SAM-Geospatial pode estar imaturo | Pesquisa F2 (vigia-de-ecossistema) confirma estado da arte antes da Fase 5.6 |
| Cliente que precisa de drone real (hardware) | Atlas planeja e processa; coleta física é externalizada (vendor de drone com piloto certificado ANAC); declarar em `instalacao.md` |

---

## 10. Status e próximo passo

| Campo | Valor |
|---|---|
| Bucket | B12 (gap absoluto) |
| Decisão | **CREATE squad-semente "Atlas"** (sujeita a aprovação do Ronan na Rodada 0 do Ritual) |
| Tamanho | 5 agentes (1 chief + 4 especialistas) |
| IDs absorvidos | 43 (16 em skills ATIVAS + 27 como capacidade declarada) |
| Skills no nascimento | 5 |
| Skills pendentes do Ritual | 8 |
| ABSORVIDO + DESCARTADO + PERDIDO | 43 + 0 + 0 = 43 ✓ |
| Aguarda | aprovação do Ronan para disparar Ritual completo (`/caos` em sessão dedicada) |

**Não executar o Ritual nesta sessão.** Esta é a etapa F4+F5 do `protocolo-de-absorcao-sem-perda`: planeja, lavra, para para aprovação humana (Constituição Art. III). O Ritual de 9 fases roda em sessão dedicada do Caos quando o Ronan autorizar.

---

## Anexos

- **F3 inventário:** `inventario-gis.md`
- **F4 mapa:** `mapa-de-decisao-b12-gis.md`
- **Benchmark estrutural:** `C:\Kolden\Cairos\` (squad-semente do lote 2026-06-28)
- **Constituição:** `C:\Kolden\Caos\constituicao.md` (Art. III, VI, VII, VIII)
- **Protocolo:** skill `protocolo-de-absorcao-sem-perda`
- **Catálogo de mitologia:** `C:\Kolden\Caos\.claude\skills\diagnostico-de-agente\catalogo-de-mitologia.md`
