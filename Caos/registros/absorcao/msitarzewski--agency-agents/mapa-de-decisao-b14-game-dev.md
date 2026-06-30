# F4 — Mapa de Decisão · B14 = NOVO squad **Pã** (Game Development)

> **Bucket:** B14 (GAP — squad NOVO, tamanho maior)
> **Origem:** `msitarzewski--agency-agents@a597cb6` / divisão `game-development/`
> **Inventário fonte:** `inventario-game-development.md` (56 IDs · G1–G56 · 20 agentes upstream)
> **Decisão dominante:** **CREATE** (não há squad Kolden equivalente)
> **Squad-alvo:** `Pa/` (nome mitológico — ver F5 para 3 propostas e justificativa)
> **Topologia:** 6 agentes (1 chief tier-0 + 5 especialistas tier-1)
> **Princípio:** REUSE>ADAPT>CREATE — desvios para Égide (anti-cheat/RPC server-side) e Pluto (monetização) onde a habilidade é cross-domain.

---

## Esqueleto de destino (6 agentes)

| tier | agente | responsabilidade | engines/áreas | upstream coberto |
|---|---|---|---|---|
| 0 | `pa-chief.md` | orquestrador: roteia, NÃO executa; lê PRD e dispara especialistas; dono do `squad.yaml` e do roster | — | (coordena todos) |
| 1 | `engines-aaa-engenheiro` | Unity (architect/editor/multiplayer/shader graph) + Unreal (systems/multiplayer/world-builder/technical-artist) — as duas engines proprietárias top | Unity, Unreal Engine 5 | unity-architect, unity-editor-tool-developer, unity-multiplayer-engineer, unity-shader-graph-artist, unreal-multiplayer-architect, unreal-systems-engineer, unreal-technical-artist, unreal-world-builder |
| 1 | `engines-abertas-engenheiro` | Godot 4 (gameplay/multiplayer/shaders) + Roblox Studio (avatar/experience/systems) — engines open-source e plataforma social | Godot 4, Roblox Studio | godot-gameplay-scripter, godot-multiplayer-engineer, godot-shader-developer, roblox-avatar-creator, roblox-experience-designer, roblox-systems-scripter |
| 1 | `arte-tecnica-cross-engine` | Blender (add-ons/pipeline) + technical-artist cross-engine (ponte arte↔engine: shaders, VFX, LOD, compressão, budgets) | Blender, ponte para Unity/Unreal/Godot | blender-addon-engineer, technical-artist |
| 1 | `design-de-jogo-e-narrativa` | camada criativa/UX/conteúdo: game design (GDD/loops/balanceamento) + level design (pacing/blockout) + narrative design (diálogo ramificado/lore/voz) | Game Design, Level Design, Narrative Design | game-designer, level-designer, narrative-designer |
| 1 | `audio-interativo-engenheiro` | engenharia de áudio interativo (FMOD/Wwise: eventos, parâmetros, espacial, música adaptativa) | FMOD, Wwise | game-audio-engineer |

**Por que esta divisão (e não a sugerida no briefing):**
- O briefing sugeria fundir áudio com design/narrativa/level. Áudio de jogo é uma especialidade técnica densa (FMOD/Wwise, voice-budget, DSP, música adaptativa por parâmetro) e foi **separada** num especialista próprio — fundi-lo na camada criativa diluiria a profundidade técnica e o agente sumiria nas tarefas de design.
- "Engines AAA" (Unity+Unreal) e "Engines abertas" (Godot+Roblox) ficam separados porque o stack técnico, vocabulário e workflows são radicalmente diferentes — fundir os 4 num só especialista quebraria a coerência de contexto.
- Arte técnica cross-engine fica num especialista próprio porque é a **ponte** (LOD/budgets/VFX/shader pipeline) que atravessa todas as engines — não pertence a nenhuma engine específica.
- 6 agentes = chief + 5 especialistas é o tamanho **maior** pedido pelo Ronan, justificado pela complexidade (5 engines + áudio + design criativo + arte técnica).

---

## Mapa F4 — 56 IDs upstream → destino Kolden

Schema: `| ID | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |`

### Blender / DCC (G1-G3)

| ID | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G1 | engenharia de add-ons Blender (Python/bpy) para pipelines de DCC | Pa | arte-tecnica-cross-engine | engenharia-de-addons-blender | CREATE | Blender é DCC core do pipeline de assets; nenhum squad Kolden faz Python/bpy hoje |
| G2 | disciplina não-destrutiva com dry-run + log de alterações em DCC | Pa | arte-tecnica-cross-engine | disciplina-nao-destrutiva-em-dcc | CREATE | Padrão de segurança específico do pipeline DCC; não cabe em Égide (que é cyber) |
| G3 | exporters cross-engine com normalização de eixo/escala/naming (FBX/glTF/USD) | Pa | arte-tecnica-cross-engine | exporters-cross-engine | CREATE | Ponte técnica entre Blender e Unity/Unreal/Godot — coração da função "ponte arte↔engine" |

### Áudio interativo (G4-G6)

| ID | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G4 | engenharia de áudio interativo (FMOD/Wwise: eventos, parâmetros, espacial) | Pa | audio-interativo-engenheiro | engenharia-de-audio-interativo | CREATE | FMOD/Wwise é stack proprietário de áudio de jogo; nenhum squad Kolden cobre |
| G5 | orçamento de voice count + memória + CPU de DSP por plataforma | Pa | audio-interativo-engenheiro | orcamento-de-audio-por-plataforma | CREATE | Performance budget específico de áudio em runtime de jogo; cross-platform (PC/console/mobile) |
| G6 | música adaptativa por parâmetro (tensão 0-1) com transições tempo-sync | Pa | audio-interativo-engenheiro | musica-adaptativa-por-parametro | CREATE | Técnica específica de horizontal resequencing e vertical layering — não é áudio linear |

### Game Design / Level Design / Narrative (G7-G9, G17-G22)

| ID | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G7 | design de sistemas e mecânicas de jogo com autoria de GDD | Pa | design-de-jogo-e-narrativa | autoria-de-gdd | CREATE | GDD (Game Design Document) é artefato canônico do domínio; sem paralelo Kolden |
| G8 | design por loops (moment-to-moment / sessão / longo prazo) com hooks por camada | Pa | design-de-jogo-e-narrativa | design-por-loops | CREATE | Padrão clássico de retenção em jogo (não confundir com loops de marketing — domínio distinto) |
| G9 | balanceamento por planilha com placeholders explícitos e curvas modeláveis | Pa | design-de-jogo-e-narrativa | balanceamento-por-planilha | CREATE | Tuning de economia/progressão de jogo; matemática específica do domínio |
| G17 | design de níveis com pacing, flow e blockout grey-box antes de art pass | Pa | design-de-jogo-e-narrativa | design-de-niveis-com-pacing | CREATE | Level design é disciplina autoral pré-arte; sem equivalente Kolden |
| G18 | gráfico de pacing time × tipo × tensão como ferramenta de planejamento | Pa | design-de-jogo-e-narrativa | grafico-de-pacing | CREATE | Ferramenta visual específica de level design; complementa G17 |
| G19 | checklist de affordances de navegação (critical-path / combate / exploração) | Pa | design-de-jogo-e-narrativa | affordances-de-navegacao | CREATE | Padrões de leitura espacial e legibilidade de espaço jogável |
| G20 | design narrativo sistêmico com diálogo ramificado, voz de personagem e lore em camadas | Pa | design-de-jogo-e-narrativa | design-narrativo-sistemico | CREATE | Narrative design de jogo é distinto de copy/storytelling de marketing (Caliope/Peitho); aqui é diálogo ramificado + arcos sistêmicos |
| G21 | pilares de voz de personagem (vocabulário/ritmo/tabu/tics) como contrato editorial | Pa | design-de-jogo-e-narrativa | pilares-de-voz-de-personagem | CREATE | Contrato editorial de personagem em jogo; difere de "voz da marca" (Pheme/Caliope) |
| G22 | arquitetura de lore em 3 camadas (surface/engaged/deep) com world bible | Pa | design-de-jogo-e-narrativa | arquitetura-de-lore-em-camadas | CREATE | World-building canônico de RPG/ARPG; sem paralelo Kolden |

### Godot (G10-G16)

| ID | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G10 | scripting de gameplay em Godot 4 com GDScript 2.0 tipado + composição por nós | Pa | engines-abertas-engenheiro | scripting-gameplay-godot | CREATE | Godot é engine open-source com linguagem própria (GDScript); sem paralelo Kolden |
| G11 | tipagem estática estrita em GDScript 2.0 | Pa | engines-abertas-engenheiro | tipagem-estatica-gdscript | CREATE | Padrão de qualidade de código específico do Godot 4 |
| G12 | arquitetura de signal bus por Autoload para comunicação desacoplada | Pa | engines-abertas-engenheiro | signal-bus-autoload-godot | CREATE | Padrão arquitetural específico do Godot (signal + autoload singleton) |
| G13 | engenharia de multiplayer em Godot 4 (MultiplayerAPI/Spawner/Synchronizer/RPCs) | Pa | engines-abertas-engenheiro | multiplayer-godot | CREATE | Stack de rede do Godot 4 é proprietário ao engine |
| G14 | RPCs server-authoritative com validação de sender e modos (any_peer/authority/call_local) | Pa | engines-abertas-engenheiro | rpc-server-authoritative-godot | CREATE (com cross-link Égide) | Implementação técnica fica em Pã; **a doutrina anti-cheat de server-authority** ganha cross-link para Égide (`egide` cobre anti-cheat e validação adversarial cross-platform). Não duplica — Pã faz, Égide audita. |
| G15 | shaders para Godot 4 (canvas_item/spatial) e VisualShader com tier de renderer | Pa | engines-abertas-engenheiro | shaders-godot | CREATE | Shader API do Godot é diferente de Unity/Unreal |
| G16 | compatibilidade de renderer (Forward+/Mobile/Compatibility) com restrições por tier | Pa | engines-abertas-engenheiro | tiers-de-renderer-godot | CREATE | Matriz de compatibilidade específica do Godot 4 |

### Roblox Studio (G23-G29)

| ID | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G23 | criação de UGC Roblox (avatares/acessórios/layered clothing) com pipeline para Marketplace | Pa | engines-abertas-engenheiro | ugc-roblox-marketplace | CREATE | Plataforma Roblox tem pipeline próprio (UGC, HumanoidDescription, moderação) |
| G24 | conformidade de spec de mesh/textura/attachment para moderação automática | Pa | engines-abertas-engenheiro | conformidade-spec-roblox | CREATE | Regras específicas do Marketplace Roblox |
| G25 | design de experiência Roblox com loops de engajamento, DataStore e monetização ética | Pa | engines-abertas-engenheiro | experiencia-roblox-engajamento | CREATE | Loop de engajamento em plataforma social; **cross-link suave para Pluto (monetização)** mas a habilidade fica em Pã porque é específica de game-pass/dev-products do Roblox |
| G26 | onboarding faseado (60s/5min/15min) com hook de investimento e ponto de recuperação | Pa | engines-abertas-engenheiro | onboarding-faseado-roblox | CREATE | Padrão de retenção D1-D7 em UGC platform |
| G27 | scripting de sistemas Roblox em Luau com modelo cliente-servidor e DataStore seguro | Pa | engines-abertas-engenheiro | scripting-luau-roblox | CREATE | Linguagem Luau é específica do Roblox |
| G28 | DataStore com pcall + retry exponencial + BindToClose para zero perda de progressão | Pa | engines-abertas-engenheiro | datastore-roblox-resiliente | CREATE | API DataStore do Roblox tem semântica própria |
| G29 | validação server-side em todo OnServerEvent (cooldown/range/tipo) anti-exploit | Pa | engines-abertas-engenheiro | validacao-onserverevent-roblox | CREATE (com cross-link Égide) | Implementação fica em Pã; **doutrina anti-exploit cross-platform** ganha cross-link Égide (mesma razão de G14: Pã faz, Égide audita) |

### Technical Artist cross-engine (G30-G32)

| ID | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G30 | ponte arte↔engine em motores multi (shaders/VFX/LOD/compressão/budgets) | Pa | arte-tecnica-cross-engine | ponte-arte-engine-cross | CREATE | Função-coração do agente; sem paralelo em Aglaia (que é arte de marketing/marca, não game) |
| G31 | spec-sheet de budgets por tipo de asset (LOD/tris/textura/compressão por plataforma) | Pa | arte-tecnica-cross-engine | budgets-por-asset-por-plataforma | CREATE | Performance budget em runtime de jogo |
| G32 | validador de cadeia de LOD por tipo (script DCC-agnóstico) com regras de aprovação | Pa | arte-tecnica-cross-engine | validador-cadeia-lod | CREATE | Gate de import em pipeline de asset; específico de jogo |

### Unity (G33-G43)

| ID | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G33 | arquitetura Unity data-driven via ScriptableObjects e eventos desacoplados | Pa | engines-aaa-engenheiro | arquitetura-unity-scriptableobjects | CREATE | Padrão arquitetural específico do Unity (SO + event channels) |
| G34 | RuntimeSet baseado em SO para rastrear entidades ativas sem singletons | Pa | engines-aaa-engenheiro | runtimeset-unity | CREATE | Técnica anti-singleton específica do Unity |
| G35 | proibição de GameObject.Find/FindObjectOfType + magic strings (anti-pattern guard) | Pa | engines-aaa-engenheiro | anti-patterns-unity | CREATE | Disciplina de código específica do Unity API |
| G36 | desenvolvimento de ferramentas no Unity Editor (Windows/PropertyDrawer/AssetPostprocessor) | Pa | engines-aaa-engenheiro | editor-tools-unity | CREATE | Editor extensibility é API específica do Unity |
| G37 | enforcement de import settings por AssetPostprocessor idempotente | Pa | engines-aaa-engenheiro | assetpostprocessor-unity | CREATE | Pipeline de import do Unity |
| G38 | pre-build validation com BuildFailedException | Pa | engines-aaa-engenheiro | pre-build-validation-unity | CREATE | Build pipeline do Unity |
| G39 | engenharia multiplayer Unity (Netcode for GameObjects + UGS Relay/Lobby) | Pa | engines-aaa-engenheiro | multiplayer-unity-ngo | CREATE | Stack de rede Unity (NGO + UGS) é proprietário |
| G40 | client-side prediction + reconciliation com threshold de snap-back | Pa | engines-aaa-engenheiro | prediction-reconciliation-unity | CREATE | Técnica de netcode específica; Égide pode auditar a doutrina server-authority |
| G41 | regra NetworkVariable (estado persistente) vs RPC (evento único) | Pa | engines-aaa-engenheiro | networkvariable-vs-rpc-unity | CREATE | Padrão de bandwidth budget em NGO |
| G42 | autoria de shaders Unity (Shader Graph + HLSL URP/HDRP) e custom render passes | Pa | engines-aaa-engenheiro | shaders-unity-urp-hdrp | CREATE | Pipeline URP/HDRP é específico do Unity |
| G43 | Sub-Graphs como API de reuso obrigatório (zero duplicação de clusters de nós) | Pa | engines-aaa-engenheiro | sub-graphs-shader-unity | CREATE | Padrão de reuso em Shader Graph do Unity |

### Unreal Engine 5 (G44-G56)

| ID | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G44 | arquitetura de multiplayer em UE5 (replicação de Actor/GameMode/GameState/PlayerState) | Pa | engines-aaa-engenheiro | multiplayer-ue5-replication | CREATE | Stack de replicação UE5 é proprietário |
| G45 | UFUNCTION(Server, Reliable, WithValidation) com _Validate obrigatório em toda RPC | Pa | engines-aaa-engenheiro | server-rpc-withvalidation-ue5 | CREATE (com cross-link Égide) | Implementação em Pã; **doutrina anti-cheat de _Validate** cross-link Égide (terceira ocorrência cross-engine — mesmo padrão de G14/G29) |
| G46 | hierarquia de replicação GameMode/GameState/PlayerState/PlayerController | Pa | engines-aaa-engenheiro | hierarquia-replicacao-ue5 | CREATE | Padrão arquitetural específico do UE5 |
| G47 | engenharia de sistemas UE5 (C++/Blueprint, GAS, Nanite/Lumen, memória GC) | Pa | engines-aaa-engenheiro | sistemas-ue5-cpp-blueprint | CREATE | Stack core do UE5 |
| G48 | fronteira C++/Blueprint quantificada (Tick em C++; Blueprint = camada de designer) | Pa | engines-aaa-engenheiro | fronteira-cpp-blueprint-ue5 | CREATE | Disciplina de performance específica do UE5 |
| G49 | disciplina de UObject GC (UPROPERTY, TWeakObjectPtr, IsValid em vez de nullptr) | Pa | engines-aaa-engenheiro | uobject-gc-discipline-ue5 | CREATE | GC do UE5 tem semântica própria |
| G50 | pipeline visual UE5 (Material Functions, Niagara, PCG, LOD/HLOD, Substrate) | Pa | engines-aaa-engenheiro | pipeline-visual-ue5 | CREATE | Pipeline gráfico UE5 — **fica em engines-aaa-engenheiro** (não em arte-tecnica-cross-engine) porque é stack UE5-específico; o cross-engine cobre o **handoff** dos assets, mas o uso dentro do UE5 é do especialista UE5 |
| G51 | Niagara Scalability High/Medium/Low por significância de distância | Pa | engines-aaa-engenheiro | niagara-scalability-ue5 | CREATE | VFX system específico do UE5 |
| G52 | PCG determinístico com Poisson Disk + exclusion zones | Pa | engines-aaa-engenheiro | pcg-deterministico-ue5 | CREATE | Procedural Content Generation do UE5 |
| G53 | construção de mundos abertos em UE5 (World Partition + Landscape + foliage + HLOD) | Pa | engines-aaa-engenheiro | mundos-abertos-ue5 | CREATE | Open world stack do UE5 |
| G54 | dimensionamento de células World Partition por densidade | Pa | engines-aaa-engenheiro | world-partition-cells-ue5 | CREATE | Streaming budget específico do UE5 |
| G55 | Landscape com no máximo 4 layers + Runtime Virtual Texturing obrigatório | Pa | engines-aaa-engenheiro | landscape-rvt-ue5 | CREATE | Restrição técnica específica do Landscape do UE5 |
| G56 | HLOD obrigatório para tudo visível > 500m, com rebuild após mudança de geometria | Pa | engines-aaa-engenheiro | hlod-ue5 | CREATE | Hierarchical LOD do UE5 |

---

## Distribuição final por especialista

| agente | nº de skills (IDs) | IDs cobertos |
|---|---|---|
| pa-chief (orquestrador) | 0 (roteia, não executa) | — |
| engines-aaa-engenheiro | 24 | G33-G56 (Unity 11 + Unreal 13) |
| engines-abertas-engenheiro | 13 | G10-G16 (Godot 7) + G23-G29 (Roblox 7) — totaliza 14 IDs, ajustado: G10-G16 (7) + G23-G29 (7) = 14 |
| arte-tecnica-cross-engine | 6 | G1-G3 (Blender 3) + G30-G32 (technical-artist 3) |
| design-de-jogo-e-narrativa | 9 | G7-G9 (game design 3) + G17-G19 (level design 3) + G20-G22 (narrative 3) |
| audio-interativo-engenheiro | 3 | G4-G6 |
| **total** | **56** | **G1–G56** |

(re-contagem: 24 + 14 + 6 + 9 + 3 = 56 ✓)

---

## Cross-links (REUSE/ADAPT parciais)

A decisão DOMINANTE foi CREATE (squad novo, 56/56 skills nascem em Pã). Os cross-links abaixo NÃO removem nada do mapa de Pã — são **ponteiros bidirecionais** que o curador registra para que squads existentes saibam consultar Pã quando o caso pedir, e vice-versa.

| ID | habilidade dona (Pã) | squad com cross-link | natureza do cross-link |
|---|---|---|---|
| G14 | rpc-server-authoritative-godot | Égide | doutrina anti-cheat server-authoritative — Pã implementa por engine, Égide audita postura cross-platform |
| G29 | validacao-onserverevent-roblox | Égide | mesma doutrina anti-exploit; Pã implementa, Égide audita |
| G45 | server-rpc-withvalidation-ue5 | Égide | mesma doutrina; Pã implementa, Égide audita |
| G25 | experiencia-roblox-engajamento | Pluto | monetização ética (game-pass, dev-products) — Pã domina a mecânica do Roblox, Pluto traz a estratégia de monetização |
| G30 | ponte-arte-engine-cross | Aglaia | arte visual cross-domain — Aglaia faz arte de marca/marketing, Pã faz arte técnica de jogo; cross-link informativo |

Nenhum cross-link transfere a habilidade — todos os 56 IDs ficam em Pã. O cross-link é **registro de adjacência** (curador em `dados/registro-de-entidades.yaml`).

---

## Reconciliação anti-perda (PERDIDO = 0)

| status | count | IDs |
|---|---|---|
| ABSORVIDO | 56 | G1–G56 |
| DESCARTADO | 0 | — |
| PERDIDO | 0 | — |

**Invariante:** `count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == count(F3) → 56 + 0 + 0 == 56 ✓`

---

## Próximo passo

→ F5 (decisão) em `decisao-f5-b14-game-dev.md`: 3 nomes propostos, estrutura-semente, skills âncora, mapa de Ritual a disparar.
