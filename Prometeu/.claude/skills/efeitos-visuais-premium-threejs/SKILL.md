---
name: efeitos-visuais-premium-threejs
description: >
  Use quando a demanda for renderizar efeitos visuais premium em frontend web com
  Three.js/WebGL — hero 3D interativo, shader estilizado, postprocessing (bloom/DoF/
  chromatic-aberration/pixelation), scroll-linked animation com camera-rig, ou
  landing "Awwwards-tier". Cobre setup canônico (Scene/Camera/Renderer), shader
  básico (fragment/vertex uniforms), postprocessing via EffectComposer, orçamento
  de performance (60fps = <2ms JS + <8ms GPU/frame) e triggers de descarte (mobile
  low-end, prefer-reduced-motion). Gatilhos: "hero 3D", "Three.js", "WebGL",
  "shader", "efeito visual premium", "postprocessing", "bloom", "chromatic
  aberration", "scroll 3D", "landing Awwwards". Handoff Harmonia para decisão
  estética (direção de arte) e Ariadne para CWV (LCP do canvas ≤2.5s). Dono:
  @dev (Dex). Skill do stack Kolden — descarta Laravel/Livewire/FluxUI.
---

# Efeitos visuais premium com Three.js

Efeito 3D em landing é sinal de marca — não é enfeite. Quando bem feito, dobra o tempo
de sessão e reduz bounce; quando mal feito, mata CWV e queima bateria. Esta habilidade
é para o Dex operar Three.js dentro do budget de performance e handoffar o julgamento
estético para a Harmonia.

## Escopo Kolden

Alvo: **Next.js + React Three Fiber (r3f) + drei**. `three` puro é permitido em
contextos de canvas isolado (não-React). Framework fora do stack Kolden — Laravel,
Livewire, FluxUI, ThreeMeshUI — está **descartado** (não instalar, não sugerir).

## Setup canônico (r3f)

```tsx
// components/hero-scene.tsx
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, PerformanceMonitor } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'

export function HeroScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }} gl={{ antialias: true, alpha: true }}>
      <PerformanceMonitor onDecline={() => /* reduzir efeitos */} />
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <Mesh />
      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.85} />
        <ChromaticAberration offset={[0.001, 0.001]} />
      </EffectComposer>
    </Canvas>
  )
}
```

Regras:
- `dpr={[1, 2]}` — cap de device pixel ratio para não renderizar 4K em MacBook Pro.
- `<PerformanceMonitor>` da drei — degrada automaticamente se fps cair.
- `Suspense boundary` — modelo GLTF sempre com fallback (skeleton, não canvas em branco).

## Shader básico (fragment/vertex)

Use `shaderMaterial` da drei para tipagem em TS:

```glsl
// vertex
uniform float uTime;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += sin(uv.x * 10.0 + uTime) * 0.1;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
```

```glsl
// fragment
uniform float uTime;
uniform vec3 uColor;
varying vec2 vUv;
void main() {
  float wave = 0.5 + 0.5 * sin(vUv.x * 6.28 + uTime);
  gl_FragColor = vec4(uColor * wave, 1.0);
}
```

Gotcha: nunca `discard` num shader de tela cheia — quebra early-z e mata perf.

## Postprocessing (`@react-three/postprocessing`)

| Efeito | Uso legítimo | Custo GPU |
|---|---|---|
| **Bloom** | brilho em pontos de luz | médio |
| **DoF / Depth of Field** | foco de câmera | alto |
| **ChromaticAberration** | leve, ~0.001 | baixo |
| **Vignette** | escurecer bordas | baixo |
| **Pixelation** | direção de arte pixel | baixo |
| **Noise** | granulado de filme | baixo |
| **SSAO** | oclusão ambiente | **muito alto** — não usar em mobile |

Regra: **≤3 efeitos empilhados**. Cada efeito é um render pass extra.

## Orçamento de performance (60fps)

Frame budget = 16.67ms. Divisão canônica:
- **JS (main thread):** ≤2ms (r3f useFrame + state updates)
- **GPU (draw calls + shaders + postprocessing):** ≤8ms
- **Sobra:** ~6ms para React, layout, network

Sinais de que estourou:
- `PerformanceMonitor` sinaliza `onDecline`
- Chrome DevTools Performance mostra frames >16.67ms (linha vermelha)
- Bateria mobile aquece em 30s

Correções por gargalo:
- **Draw calls altas** — batch geometrias, `InstancedMesh` para repetições
- **Shader lento** — remover branches (`if`), pré-calcular no vertex
- **Postprocessing lento** — reduzir passes ou resolução do buffer (`multisampling: 0`)
- **Texturas grandes** — KTX2 compressão (drei `useKTX2`), max 2048²

## Triggers de descarte (fallback obrigatório)

**Não renderize Three.js quando:**
1. `window.matchMedia('(prefers-reduced-motion: reduce)').matches` — respeitar preferência
2. `navigator.hardwareConcurrency < 4` — mobile low-end
3. `!('WebGL2RenderingContext' in window)` — sem WebGL2
4. Bateria em economia (`navigator.getBattery().saving === true`, quando disponível)

Fallback: imagem estática de fallback (WebP renderizado offline em Blender). Nunca canvas em branco.

## Handoffs

- **Direção estética** → Harmonia (`julgamento-estetico-anti-slop`). Ela decide se o efeito casa
  com a direção de arte da marca; você EXECUTA o efeito. Efeito bonito em marca errada é slop.
- **CWV** → Ariadne (`core-web-vitals-e-performance`). LCP do canvas ≤2.5s exige
  `<link rel=preload as=fetch>` no GLTF crítico e `<Canvas frameloop="demand">` quando
  parado. Postprocessing entra depois do LCP.
- **Copy do hero** → Caliope. Você entrega o container animado; a copy dentro não é sua.

## Regras Kolden

- **Dono:** @dev (Dex). Delegação de @architect (Aria) quando envolver arquitetura de canvas
  compartilhado entre rotas.
- **Descartado:** Laravel/Livewire/FluxUI/ThreeMeshUI/Alpine.js (fora do stack Kolden).
- **Bundle budget:** `three` + `@react-three/fiber` + `@react-three/drei` ≈ 500KB gzip.
  Import somente o que usa (`drei/OrbitControls`, não `drei` inteiro). Se passar de 700KB,
  handoff a decisão para o Aria — pode não valer o efeito.
- **prefers-reduced-motion:** SEMPRE respeitar. Um usuário com vestibular disorder tem
  prioridade sobre "wow factor".
- **Assets 3D:** GLTF/GLB comprimido com Draco (`useGLTF` da drei); texturas em KTX2 ou WebP.
  Nunca PNG cru de 4MB.

---
## Atribuição
Herança histórica: **Ricardo Cabello ("mrdoob")** — autor original do Three.js (2010),
padrões de Scene/Camera/Renderer; **Bruno Simon** — threejs-journey.com, curso canônico
de shader/postprocessing; **Paul Henschel** (poimandres/@react-three/fiber) —
integração declarativa Three.js em React. Adaptado de `github.com/msitarzewski/agency-agents@a597cb6`
(MIT), bucket B03/engineering, IDs G65 (parcial), G66. Descartes explícitos:
Laravel/Livewire/FluxUI/ThreeMeshUI (fora do stack Kolden).
