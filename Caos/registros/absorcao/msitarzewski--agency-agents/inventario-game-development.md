# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `game-development/`

Granularidade: 1 base por agente + técnicas transferíveis salientes (1-2 por agente em média). Total esperado: 20 (bases) + ~20-40 (técnicas) = 40-60 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | engenharia de add-ons Blender (Python/bpy) para pipelines de DCC | agente | blender, bpy, add-on, validador, exporter, pipeline, dcc | game-development | game-development/blender/blender-addon-engineer.md:2 |
| G2 | disciplina não-destrutiva com dry-run + log de alterações em ferramentas de DCC | tecnica | dry-run, validacao, log-de-mudancas, nao-destrutivo | game-development | game-development/blender/blender-addon-engineer.md:36 |
| G3 | exporters cross-engine com normalização de eixo/escala/naming (FBX/glTF/USD) | tecnica | exporter, fbx, gltf, usd, normalizacao, handoff | game-development | game-development/blender/blender-addon-engineer.md:231 |
| G4 | engenharia de áudio interativo para jogos via FMOD/Wwise (eventos, parâmetros, espacial) | agente | fmod, wwise, audio-interativo, musica-adaptativa, espacial | game-development | game-development/game-audio-engineer.md:2 |
| G5 | orçamento de voice count + memória + CPU de DSP por plataforma | tecnica | voice-budget, dsp-budget, prioridade, steal-mode | game-development | game-development/game-audio-engineer.md:35 |
| G6 | música adaptativa por parâmetro (tensão 0-1) com transições tempo-sync | tecnica | musica-adaptativa, intensidade, tempo-sync, horizontal-resequencing | game-development | game-development/game-audio-engineer.md:41 |
| G7 | design de sistemas e mecânicas de jogo com autoria de GDD | agente | gdd, game-design, mecanica, loop, economia, balanceamento | game-development | game-development/game-designer.md:2 |
| G8 | design por loops (moment-to-moment, sessão, longo prazo) com hooks por camada | tecnica | core-loop, retencao, session-loop, long-term | game-development | game-development/game-designer.md:46 |
| G9 | balanceamento por planilha com placeholders explícitos e curvas modeláveis | tecnica | tuning, balance-spreadsheet, placeholder, curva-de-progressao | game-development | game-development/game-designer.md:66 |
| G10 | scripting de gameplay em Godot 4 com GDScript 2.0 tipado + composição por nós | agente | godot, gdscript, c-sharp, composicao, sinais, autoload | game-development | game-development/godot/godot-gameplay-scripter.md:2 |
| G11 | tipagem estática estrita em GDScript 2.0 (variáveis, params, retornos, arrays tipados) | tecnica | gdscript, tipagem-estatica, strict-mode, typed-arrays | game-development | game-development/godot/godot-gameplay-scripter.md:37 |
| G12 | arquitetura de signal bus por Autoload para comunicação desacoplada entre cenas | tecnica | event-bus, autoload, signal, desacoplamento | game-development | game-development/godot/godot-gameplay-scripter.md:54 |
| G13 | engenharia de multiplayer em Godot 4 (MultiplayerAPI/Spawner/Synchronizer/RPCs) | agente | godot, multiplayer, multiplayerapi, replicacao, rpc, authority | game-development | game-development/godot/godot-multiplayer-engineer.md:2 |
| G14 | RPCs server-authoritative com validação de sender e modos (any_peer/authority/call_local) | tecnica | rpc, server-authoritative, validacao-de-sender, modos-rpc | game-development | game-development/godot/godot-multiplayer-engineer.md:36 |
| G15 | shaders para Godot 4 (canvas_item/spatial) e VisualShader com tier de renderer | agente | godot, shader, canvas-item, spatial, visualshader, compositor-effect | game-development | game-development/godot/godot-shader-developer.md:2 |
| G16 | compatibilidade de renderer (Forward+/Mobile/Compatibility) com restrições por tier | tecnica | renderer-tier, forward-plus, mobile, compatibility, screen-texture | game-development | game-development/godot/godot-shader-developer.md:36 |
| G17 | design de níveis com pacing, flow e blockout grey-box antes de art pass | agente | level-design, pacing, blockout, encounter, environmental-storytelling | game-development | game-development/level-designer.md:2 |
| G18 | gráfico de pacing time × tipo × tensão como ferramenta de planejamento | tecnica | pacing-chart, tensao, ritmo-espacial | game-development | game-development/level-designer.md:84 |
| G19 | checklist de affordances de navegação (critical-path, combate, exploração) | tecnica | readability, affordance, critical-path, fallback | game-development | game-development/level-designer.md:120 |
| G20 | design narrativo sistêmico com diálogo ramificado, voz de personagem e lore em camadas | agente | narrative-design, dialogo, branching, lore, environmental-storytelling | game-development | game-development/narrative-designer.md:2 |
| G21 | pilares de voz de personagem (vocabulário, ritmo, tabu, tics) como contrato editorial | tecnica | voice-pillars, character-voice, subtext, never-say | game-development | game-development/narrative-designer.md:86 |
| G22 | arquitetura de lore em 3 camadas (surface/engaged/deep) com world bible | tecnica | lore-tier, world-bible, retcon-ban, environmental-storytelling | game-development | game-development/narrative-designer.md:42 |
| G23 | criação de UGC Roblox (avatares/acessórios/layered clothing) com pipeline para Marketplace | agente | roblox, ugc, avatar, layered-clothing, marketplace, humanoiddescription | game-development | game-development/roblox-studio/roblox-avatar-creator.md:2 |
| G24 | conformidade de spec de mesh/textura/attachment para moderação automática do Roblox | tecnica | mesh-spec, attachment, layered-cage, moderation | game-development | game-development/roblox-studio/roblox-avatar-creator.md:30 |
| G25 | design de experiência Roblox com loops de engajamento, DataStore e monetização ética | agente | roblox, engagement-loop, monetization, game-pass, daily-reward, retention | game-development | game-development/roblox-studio/roblox-experience-designer.md:2 |
| G26 | onboarding faseado (60s/5min/15min) com hook de investimento e ponto de recuperação | tecnica | onboarding, retention, d1-d7, drop-off | game-development | game-development/roblox-studio/roblox-experience-designer.md:178 |
| G27 | scripting de sistemas Roblox em Luau com modelo cliente-servidor e DataStore seguro | agente | roblox, luau, remoteevent, datastore, modulescript, client-server | game-development | game-development/roblox-studio/roblox-systems-scripter.md:2 |
| G28 | DataStore com pcall + retry exponencial + BindToClose para zero perda de progressão | tecnica | datastore, retry, pcall, bindtoclose | game-development | game-development/roblox-studio/roblox-systems-scripter.md:43 |
| G29 | validação server-side em todo OnServerEvent (cooldown, range, tipo) anti-exploit | tecnica | remoteevent-validation, anti-exploit, server-authoritative | game-development | game-development/roblox-studio/roblox-systems-scripter.md:30 |
| G30 | ponte arte↔engine em motores multi (shaders, VFX, LOD, compressão, budgets) | agente | technical-art, lod, shader, vfx, asset-pipeline, performance-budget | game-development | game-development/technical-artist.md:2 |
| G31 | spec-sheet de budgets por tipo de asset (LOD, tris, textura, compressão por plataforma) | tecnica | asset-budget, lod-chain, compression, atlas | game-development | game-development/technical-artist.md:55 |
| G32 | validador de cadeia de LOD por tipo (script DCC-agnóstico) com regras de aprovação | tecnica | lod-validator, dcc-agnostic, gate-de-import | game-development | game-development/technical-artist.md:143 |
| G33 | arquitetura Unity data-driven via ScriptableObjects e eventos desacoplados | agente | unity, scriptableobject, event-channel, modularidade, single-responsibility | game-development | game-development/unity/unity-architect.md:2 |
| G34 | RuntimeSet baseado em SO para rastrear entidades ativas sem singletons | tecnica | runtime-set, singleton-free, registrar | game-development | game-development/unity/unity-architect.md:81 |
| G35 | proibição de GameObject.Find/FindObjectOfType + magic strings (anti-pattern guard) | tecnica | anti-pattern, magic-string, getcomponent-discipline | game-development | game-development/unity/unity-architect.md:30 |
| G36 | desenvolvimento de ferramentas no Unity Editor (Windows/PropertyDrawer/AssetPostprocessor) | agente | unity, editor-tool, propertydrawer, assetpostprocessor, build-validation | game-development | game-development/unity/unity-editor-tool-developer.md:2 |
| G37 | enforcement de import settings por AssetPostprocessor idempotente com log de overrides | tecnica | assetpostprocessor, import-enforcement, idempotente | game-development | game-development/unity/unity-editor-tool-developer.md:41 |
| G38 | pre-build validation com BuildFailedException (catch antes de chegar em QA) | tecnica | ipreprocessbuild, build-gate, validation | game-development | game-development/unity/unity-editor-tool-developer.md:208 |
| G39 | engenharia multiplayer Unity (Netcode for GameObjects + UGS Relay/Lobby) | agente | unity, ngo, netcode, ugs, relay, lobby, networkvariable | game-development | game-development/unity/unity-multiplayer-engineer.md:2 |
| G40 | client-side prediction + reconciliation com threshold de snap-back | tecnica | client-prediction, reconciliation, server-authority, prediction-tick | game-development | game-development/unity/unity-multiplayer-engineer.md:101 |
| G41 | regra NetworkVariable (estado persistente) vs RPC (evento único) com COND_OwnerOnly | tecnica | networkvariable, rpc, bandwidth-budget, dorepl-condition | game-development | game-development/unity/unity-multiplayer-engineer.md:36 |
| G42 | autoria de shaders Unity (Shader Graph + HLSL URP/HDRP) e custom render passes | agente | unity, shader-graph, hlsl, urp, hdrp, scriptable-renderer-feature | game-development | game-development/unity/unity-shader-graph-artist.md:2 |
| G43 | Sub-Graphs como API de reuso obrigatório (zero duplicação de clusters de nós) | tecnica | sub-graph, blackboard, tooltip, parametros-expostos | game-development | game-development/unity/unity-shader-graph-artist.md:30 |
| G44 | arquitetura de multiplayer em UE5 (replicação de Actor/GameMode/GameState/PlayerState) | agente | unreal, ue5, replicacao, gas, dedicated-server, replication-graph | game-development | game-development/unreal-engine/unreal-multiplayer-architect.md:2 |
| G45 | UFUNCTION(Server, Reliable, WithValidation) com _Validate obrigatório em toda RPC | tecnica | server-rpc, withvalidation, anti-cheat, server-authority | game-development | game-development/unreal-engine/unreal-multiplayer-architect.md:30 |
| G46 | hierarquia de replicação GameMode/GameState/PlayerState/PlayerController disciplinada | tecnica | replication-hierarchy, gamemode, playerstate, cond_owneronly | game-development | game-development/unreal-engine/unreal-multiplayer-architect.md:42 |
| G47 | engenharia de sistemas UE5 (C++/Blueprint, GAS, Nanite/Lumen, memória GC) | agente | unreal, ue5, c-plus-plus, blueprint, gas, nanite, lumen | game-development | game-development/unreal-engine/unreal-systems-engineer.md:2 |
| G48 | fronteira C++/Blueprint quantificada (Tick em C++; Blueprint = camada de designer) | tecnica | cpp-blueprint-boundary, tick-discipline, blueprintcallable | game-development | game-development/unreal-engine/unreal-systems-engineer.md:30 |
| G49 | disciplina de UObject GC (UPROPERTY, TWeakObjectPtr, IsValid em vez de nullptr) | tecnica | uobject-gc, uproperty, tweakobjectptr, isvalid | game-development | game-development/unreal-engine/unreal-systems-engineer.md:45 |
| G50 | pipeline visual UE5 (Material Functions, Niagara, PCG, LOD/HLOD, Substrate) | agente | unreal, ue5, material-function, niagara, pcg, hlod, substrate | game-development | game-development/unreal-engine/unreal-technical-artist.md:2 |
| G51 | Niagara Scalability High/Medium/Low por significância de distância e budgets de partículas | tecnica | niagara, scalability, significance, particle-budget | game-development | game-development/unreal-engine/unreal-technical-artist.md:165 |
| G52 | PCG determinístico com Poisson Disk + exclusion zones (estrada/path/water/hand-placed) | tecnica | pcg, poisson-disk, exclusion-zone, deterministic | game-development | game-development/unreal-engine/unreal-technical-artist.md:107 |
| G53 | construção de mundos abertos em UE5 (World Partition + Landscape + foliage + HLOD) | agente | unreal, world-partition, landscape, hlod, ofpa, lwc, streaming | game-development | game-development/unreal-engine/unreal-world-builder.md:2 |
| G54 | dimensionamento de células World Partition por densidade (64m urbano / 128m terreno / 256m esparso) | tecnica | world-partition, cell-size, streaming-budget, data-layer | game-development | game-development/unreal-engine/unreal-world-builder.md:30 |
| G55 | Landscape com no máximo 4 layers + Runtime Virtual Texturing obrigatório | tecnica | landscape, rvt, layer-cap, edit-layers | game-development | game-development/unreal-engine/unreal-world-builder.md:36 |
| G56 | HLOD obrigatório para tudo visível > 500m, com rebuild após mudança de geometria | tecnica | hlod, draw-distance, mesh-merge, simplygon | game-development | game-development/unreal-engine/unreal-world-builder.md:42 |

**Total: 56 capacidades (G1–G56).**

## Resumo por agente upstream

| # | Agente upstream | base | técnicas |
|---|---|---|---|
| 1 | blender-addon-engineer | G1 | G2, G3 |
| 2 | game-audio-engineer | G4 | G5, G6 |
| 3 | game-designer | G7 | G8, G9 |
| 4 | godot-gameplay-scripter | G10 | G11, G12 |
| 5 | godot-multiplayer-engineer | G13 | G14 |
| 6 | godot-shader-developer | G15 | G16 |
| 7 | level-designer | G17 | G18, G19 |
| 8 | narrative-designer | G20 | G21, G22 |
| 9 | roblox-avatar-creator | G23 | G24 |
| 10 | roblox-experience-designer | G25 | G26 |
| 11 | roblox-systems-scripter | G27 | G28, G29 |
| 12 | technical-artist | G30 | G31, G32 |
| 13 | unity-architect | G33 | G34, G35 |
| 14 | unity-editor-tool-developer | G36 | G37, G38 |
| 15 | unity-multiplayer-engineer | G39 | G40, G41 |
| 16 | unity-shader-graph-artist | G42 | G43 |
| 17 | unreal-multiplayer-architect | G44 | G45, G46 |
| 18 | unreal-systems-engineer | G47 | G48, G49 |
| 19 | unreal-technical-artist | G50 | G51, G52 |
| 20 | unreal-world-builder | G53 | G54, G55, G56 |
