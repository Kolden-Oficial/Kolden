---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F4 — Mapa de decisão · bucket B13 (NOVO squad Spatial Computing / XR/AR/VR)

**Fonte:** `inventario-spatial-computing.md` (19 IDs, G1-G19).
**Decisão de squad:** GAP confirmado — domínio XR/AR/VR/spatial computing **não tem squad Kolden equivalente**. Squad-semente NOVO em modo compacto (chief + 3 especialistas).
**Nome mitológico recomendado:** **Hyperion** (Ὑπερίων), titã da luz celestial, pai de Hélios/Selene/Eos (Sol/Lua/Aurora) — cobre o espectro XR completo (render imersivo / VR noturna / AR sobre o real).
**Anomalia temática isolada:** G5/G6/G7 (`terminal-integration-specialist.md`) é Apple/Swift dev-tooling (SwiftTerm, SSH I/O, Core Text rendering), **não XR**. Roteado para **Dedalo** (Claude Code dev domain / Apple tooling).

## Estrutura proposta do squad Hyperion (compacto, 4 agentes)

```
C:\Kolden\Hyperion\
├── CLAUDE.md
├── squad.yaml
├── prd-de-ia.md
├── README.md
├── MEMORY.md
├── agents/
│   ├── hyperion-chief.md                ← tier 0 (orquestrador XR)
│   ├── helios-nativo-apple.md           ← tier 1 (visionOS / Metal / macOS spatial)
│   ├── eos-xr-cross-platform.md         ← tier 1 (WebXR / Quest / HoloLens / cross-device)
│   └── selene-ux-espacial.md            ← tier 1 (UI/UX espacial / cockpit / multimodal input)
├── data/ · workflows/ · checklists/ · tasks/
└── .claude/skills/ · reflexos/ · settings.json
```

**Mnemônica dos nomes:** Hyperion (chief, titã da luz) preside os três descendentes que personificam facetas da percepção espacial — **Hélios** (Sol, luz forte, render nativo Apple/Metal), **Eos** (Aurora, transição luz-mundo, AR e cross-device), **Selene** (Lua, ambiente imersivo, UX espacial e cockpit). Coerência mitológica + cobertura técnica não-sobreposta.

## Mapa F4 — 19 IDs

| ID upstream | capacidade | squad_alvo | agente_destino | skill_destino | decisao | justificativa |
|---|---|---|---|---|---|---|
| G1 | renderização Metal + spatial computing para macOS/Vision Pro (instanced rendering, Compositor Services, RemoteImmersiveSpace) | Hyperion | helios-nativo-apple | renderizacao-metal-spatial | CREATE | base do especialista nativo Apple; agente upstream completo (macos-spatial-metal-engineer) vira o cerne do Hélios |
| G2 | layout de grafos force-directed em GPU via compute shader Metal (10k-100k nós a 90fps com triple buffering e frustum culling) | Hyperion | helios-nativo-apple | gpu-compute-grafos-metal | CREATE | técnica salient do Hélios; útil para visualização de dados volumétricos |
| G3 | streaming estereoscópico para Vision Pro via Compositor Services com `LayerRenderer` (config `.stereo` + `rgba16Float` + `depth32Float`) e `RemoteImmersiveSpace` | Hyperion | helios-nativo-apple | streaming-estereoscopico-visionpro | CREATE | técnica core de companheiro macOS streamando para Vision Pro |
| G4 | interação espacial gaze + pinch com raycast acelerado por GPU para seleção de nós em ambiente imersivo | Hyperion | helios-nativo-apple | gaze-pinch-raycast-gpu | CREATE | técnica de seleção espacial otimizada via GPU; pertence ao Hélios (caminho nativo Apple) |
| G5 | integração de emulador de terminal SwiftTerm em apps Swift (VT100/xterm, UTF-8, scrollback, SwiftUI lifecycle) | **Dedalo** | (a definir no Dedalo) | swiftterm-integration | CREATE | ANOMALIA TEMÁTICA — Apple/Swift dev-tooling, NÃO XR; rota correta = Dedalo (Claude Code dev / engenharia de devtools); CREATE skill no Dedalo |
| G6 | renderização de texto otimizada para terminal em Core Graphics/Core Text com gerenciamento de threading e eficiência de bateria | **Dedalo** | (a definir no Dedalo) | text-rendering-core-graphics | CREATE | mesma anomalia G5; pertence ao Dedalo |
| G7 | ponte de I/O entre fluxo SSH e emulador de terminal (estados de conexão, reconexão, múltiplas sessões) | **Dedalo** | (a definir no Dedalo) | ssh-terminal-bridge | CREATE | mesma anomalia G5; pertence ao Dedalo |
| G8 | engenharia visionOS 26 nativa com SwiftUI volumétrico e Liquid Glass (WindowGroups únicos, spatial widgets, RealityKit-SwiftUI) | Hyperion | helios-nativo-apple | visionos-swiftui-volumetrico | CREATE | base do caminho SwiftUI nativo no headset (complementar a G1/G3 que são caminho Metal); ambos coexistem no Hélios |
| G9 | aplicação de Liquid Glass via `glassBackgroundEffect` com modos de exibição configuráveis e materiais adaptativos a luz/conteúdo | Hyperion | helios-nativo-apple | liquid-glass-materials | CREATE | técnica salient do Hélios (lado SwiftUI/visionOS) |
| G10 | arquitetura multi-window espacial com `WindowGroup` unique (single-instance) + apresentações volumétricas + ornaments/attachments | Hyperion | helios-nativo-apple | windowgroup-volumetrico | CREATE | técnica de scene management visionOS; pertence ao Hélios |
| G11 | design de cockpits XR seated com controles 3D ancorados (yokes, throttles, switches) que minimizam motion sickness | Hyperion | selene-ux-espacial | cockpit-xr-seated | CREATE | base de especialização cockpit/simulador; pertence ao Selene (UX espacial); G11 é especialização de G17 (subordinação semântica preserva os dois) |
| G12 | mecânica de controle constraint-driven (sem free-float) prototipada em A-Frame/Three.js para simuladores e cockpits | Hyperion | selene-ux-espacial | controle-constraint-driven | CREATE | técnica de prototipagem; A-Frame/Three.js também tocam Eos (cross-platform), mas dono semântico é Selene (mecânica de controle = UX) |
| G13 | UX multi-input em cockpit (mão + voz + gaze + props físicos) alinhada ao fluxo natural olho-mão-cabeça | Hyperion | selene-ux-espacial | multi-input-ergonomia | CREATE | técnica multimodal central da UX espacial; pertence ao Selene |
| G14 | engenharia WebXR cross-browser/cross-headset (A-Frame, Three.js, Babylon.js) com hand tracking, pinch, gaze e controllers | Hyperion | eos-xr-cross-platform | webxr-cross-headset | CREATE | base do especialista cross-platform; agente upstream completo (xr-immersive-developer) vira o cerne do Eos |
| G15 | otimização WebXR via occlusion culling, shader tuning e sistemas de LOD para experiências performáticas em browser | Hyperion | eos-xr-cross-platform | otimizacao-webxr-lod | CREATE | técnica de performance para o Eos |
| G16 | camada de compatibilidade cross-device (Quest, Vision Pro, HoloLens, AR móvel) com fallback gracioso e degradação modular | Hyperion | eos-xr-cross-platform | compatibilidade-cross-device | CREATE | técnica de fallback multi-headset; cerne operacional do Eos |
| G17 | arquitetura de interface espacial human-centered para AR/VR/XR (HUDs flutuantes, painéis, zonas de interação) com foco em conforto e descobribilidade | Hyperion | selene-ux-espacial | ui-espacial-human-centered | CREATE | base de arquitetura UI/UX espacial geral; cerne do Selene; G11 é especialização desta |
| G18 | desenho de inputs multimodais (direct touch, gaze+pinch, controller, gesto) com fallback de acessibilidade | Hyperion | selene-ux-espacial | inputs-multimodais-acessivel | CREATE | técnica de design de input; pertence ao Selene; complementa G13 (G13 = ergonomia em cockpit; G18 = inputs gerais com fallback) |
| G19 | validação UX com experimentos focados em conforto e learnability (limiares ergonômicos, tolerâncias de latência de input) | Hyperion | selene-ux-espacial | validacao-ux-conforto-xr | CREATE | técnica de pesquisa/validação UX espacial; pertence ao Selene |

## Distribuição por agente (Hyperion)

- **hyperion-chief** (tier 0) — orquestra os 3 especialistas; sem skills próprias além de roteamento.
- **helios-nativo-apple** (tier 1) — 7 skills: G1, G2, G3, G4, G8, G9, G10 (caminho nativo Apple: Metal + visionOS/SwiftUI).
- **eos-xr-cross-platform** (tier 1) — 3 skills: G14, G15, G16 (WebXR + cross-device).
- **selene-ux-espacial** (tier 1) — 6 skills: G11, G12, G13, G17, G18, G19 (UX espacial / cockpit / multimodal / validação).

**Total Hyperion: 16 skills em 3 especialistas.**

## Roteado para fora de Hyperion

- **Dedalo:** 3 skills (G5, G6, G7) — anomalia temática Apple/Swift dev-tooling.

## Reconciliação

- inventário F3: 19 IDs (G1-G19).
- ABSORVIDO em Hyperion: 16 IDs (G1, G2, G3, G4, G8, G9, G10, G11, G12, G13, G14, G15, G16, G17, G18, G19).
- ABSORVIDO em Dedalo: 3 IDs (G5, G6, G7).
- DESCARTADO: 0.
- PERDIDO: 0.
- **invariante:** 16 + 3 + 0 + 0 = 19 ✓
