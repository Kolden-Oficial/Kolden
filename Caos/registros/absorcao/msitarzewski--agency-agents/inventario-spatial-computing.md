# F3 — Inventário de capacidades · `msitarzewski--agency-agents@a597cb6` — divisão `spatial-computing/`

Granularidade: 1 base por agente + técnicas transferíveis salientes. Total esperado: 6 (bases) + ~6-18 (técnicas) = 12-24 IDs.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | renderização Metal + spatial computing para macOS/Vision Pro (instanced rendering, Compositor Services, RemoteImmersiveSpace) | agente | metal, swift, vision-pro, visionos, compositor-services, gpu, stereo-rendering | spatial-computing | spatial-computing/macos-spatial-metal-engineer.md:1-11 |
| G2 | layout de grafos force-directed em GPU via compute shader Metal (10k-100k nós a 90fps com triple buffering e frustum culling) | tecnica | metal-compute-shader, force-directed-layout, gpu-physics, instanced-rendering, triple-buffering | spatial-computing | spatial-computing/macos-spatial-metal-engineer.md:209-249 |
| G3 | streaming estereoscópico para Vision Pro via Compositor Services com `LayerRenderer` (config `.stereo` + `rgba16Float` + `depth32Float`) e `RemoteImmersiveSpace` | tecnica | compositor-services, layer-renderer, remote-immersive-space, stereo-textures, depth-texture | spatial-computing | spatial-computing/macos-spatial-metal-engineer.md:123-166 |
| G4 | interação espacial gaze + pinch com raycast acelerado por GPU para seleção de nós em ambiente imersivo | tecnica | gaze-tracking, pinch-gesture, raycast-gpu, hit-testing, spatial-selection | spatial-computing | spatial-computing/macos-spatial-metal-engineer.md:168-206 |
| G5 | integração de emulador de terminal SwiftTerm em apps Swift (VT100/xterm, UTF-8, scrollback, SwiftUI lifecycle) | agente | swiftterm, terminal-emulation, vt100, xterm, ansi-escape, swiftui-integration | spatial-computing | spatial-computing/terminal-integration-specialist.md:1-11 |
| G6 | renderização de texto otimizada para terminal em Core Graphics/Core Text com gerenciamento de threading e eficiência de bateria | tecnica | core-graphics, core-text, text-rendering-perf, background-io, battery-efficiency | spatial-computing | spatial-computing/terminal-integration-specialist.md:27-31 |
| G7 | ponte de I/O entre fluxo SSH e emulador de terminal (estados de conexão, reconexão, múltiplas sessões) | tecnica | ssh-io-bridge, swiftnio-ssh, nmssh, session-management, connection-state | spatial-computing | spatial-computing/terminal-integration-specialist.md:33-37 |
| G8 | engenharia visionOS 26 nativa com SwiftUI volumétrico e Liquid Glass (WindowGroups únicos, spatial widgets, RealityKit-SwiftUI) | agente | visionos, swiftui-volumetric, liquid-glass, windowgroup, realitykit, spatial-widgets | spatial-computing | spatial-computing/visionos-spatial-engineer.md:1-11 |
| G9 | aplicação de Liquid Glass via `glassBackgroundEffect` com modos de exibição configuráveis e materiais adaptativos a luz/conteúdo | tecnica | glass-background-effect, liquid-glass, translucent-materials, adaptive-materials | spatial-computing | spatial-computing/visionos-spatial-engineer.md:16-30 |
| G10 | arquitetura multi-window espacial com `WindowGroup` unique (single-instance) + apresentações volumétricas + ornaments/attachments | tecnica | windowgroup-unique, volumetric-presentation, ornaments, attachments, scene-management | spatial-computing | spatial-computing/visionos-spatial-engineer.md:18-29 |
| G11 | design de cockpits XR seated com controles 3D ancorados (yokes, throttles, switches) que minimizam motion sickness | agente | xr-cockpit, seated-vr, motion-sickness, control-ergonomics, simulator | spatial-computing | spatial-computing/xr-cockpit-interaction-specialist.md:1-11 |
| G12 | mecânica de controle constraint-driven (sem free-float) prototipada em A-Frame/Three.js para simuladores e cockpits | tecnica | a-frame, three-js, constraint-driven, control-mechanics, simulator-prototyping | spatial-computing | spatial-computing/xr-cockpit-interaction-specialist.md:30-33 |
| G13 | UX multi-input em cockpit (mão + voz + gaze + props físicos) alinhada ao fluxo natural olho-mão-cabeça | tecnica | multi-input-ux, hand-voice-gaze, eye-hand-head-flow, ergonomics | spatial-computing | spatial-computing/xr-cockpit-interaction-specialist.md:23-27 |
| G14 | engenharia WebXR cross-browser/cross-headset (A-Frame, Three.js, Babylon.js) com hand tracking, pinch, gaze e controllers | agente | webxr, a-frame, three-js, babylon-js, hand-tracking, cross-headset | spatial-computing | spatial-computing/xr-immersive-developer.md:1-11 |
| G15 | otimização WebXR via occlusion culling, shader tuning e sistemas de LOD para experiências performáticas em browser | tecnica | occlusion-culling, shader-tuning, lod-systems, webxr-perf | spatial-computing | spatial-computing/xr-immersive-developer.md:23-27 |
| G16 | camada de compatibilidade cross-device (Quest, Vision Pro, HoloLens, AR móvel) com fallback gracioso e degradação modular | tecnica | cross-device-compat, graceful-degradation, fallback, modular-xr | spatial-computing | spatial-computing/xr-immersive-developer.md:25-27 |
| G17 | arquitetura de interface espacial human-centered para AR/VR/XR (HUDs flutuantes, painéis, zonas de interação) com foco em conforto e descobribilidade | agente | xr-ui, hud-flutuante, gaze-first, comfort-zones, discoverability, spatial-ux | spatial-computing | spatial-computing/xr-interface-architect.md:1-11 |
| G18 | desenho de inputs multimodais (direct touch, gaze+pinch, controller, gesto) com fallback de acessibilidade | tecnica | multimodal-input, gaze-pinch, accessibility-fallback, input-models | spatial-computing | spatial-computing/xr-interface-architect.md:22-27 |
| G19 | validação UX com experimentos focados em conforto e learnability (limiares ergonômicos, tolerâncias de latência de input) | tecnica | ux-validation, comfort-research, learnability, latency-tolerance, ergonomic-thresholds | spatial-computing | spatial-computing/xr-interface-architect.md:15-17, 30-33 |

**Total: 19 capacidades (G1–G19).**

## Resumo por agente upstream

- **macos-spatial-metal-engineer.md** — base G1 (renderização Metal + spatial macOS/Vision Pro). Técnicas salientes: G2 (force-directed layout em GPU compute shader), G3 (stream estereoscópico via Compositor Services / RemoteImmersiveSpace) e G4 (gaze+pinch com raycast GPU). Inclui blocos extensos de Swift/Metal Shading Language — **não inventariados como técnica**, são molde upstream (código de referência).
- **terminal-integration-specialist.md** — base G5 (integração SwiftTerm em apps Swift). Técnicas salientes: G6 (rendering otimizado em Core Graphics/Core Text) e G7 (I/O bridge SSH↔terminal com session management).
- **visionos-spatial-engineer.md** — base G8 (visionOS 26 nativo + SwiftUI volumétrico + Liquid Glass). Técnicas salientes: G9 (glassBackgroundEffect / Liquid Glass) e G10 (multi-window com `WindowGroup` unique + apresentações volumétricas).
- **xr-cockpit-interaction-specialist.md** — base G11 (cockpit XR seated anti-motion-sickness). Técnicas salientes: G12 (constraint-driven control em A-Frame/Three.js) e G13 (UX multi-input mão+voz+gaze+props).
- **xr-immersive-developer.md** — base G14 (WebXR cross-browser cross-headset). Técnicas salientes: G15 (otimização via occlusion culling / shader tuning / LOD) e G16 (compatibilidade cross-device com fallback gracioso).
- **xr-interface-architect.md** — base G17 (UI/UX espacial human-centered para AR/VR/XR). Técnicas salientes: G18 (inputs multimodais com fallback de acessibilidade) e G19 (validação UX com experimentos de conforto/learnability).

### Sobreposições notáveis (para mapeamento F4)

- **G2/G3/G4 (Metal stack)** vs **G9/G10 (visionOS stack)**: ambos terminam em Vision Pro, mas G1 é caminho Metal/Compositor (companheiro macOS streamando) e G8 é caminho SwiftUI nativo no headset. Coexistem; não são redundantes.
- **G11 (cockpit XR)** vs **G17 (XR UI/UX geral)**: G11 é nicho (seated/cockpit), G17 é arquitetura geral. G11 é especialização de G17.
- **G14 (WebXR)** vs **G1 (Metal macOS/Vision Pro nativo)**: rotas tecnológicas distintas (browser vs native Apple); G14 cobre Quest/HoloLens, G1 não.
- **G5/G6/G7 (terminal)** — divisão é uma anomalia temática dentro de `spatial-computing/` (terminal integration é Apple-platform tooling, não XR/3D). Manter inventariado, mas sinalizar no F4 que possivelmente pertence a outra divisão (Apple/Swift/dev-tooling).
