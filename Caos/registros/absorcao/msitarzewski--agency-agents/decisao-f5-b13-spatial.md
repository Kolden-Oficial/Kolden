---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F5 — Decisão · bucket B13 (NOVO squad Spatial Computing / XR/AR/VR)

**Data:** 2026-06-29
**Fonte upstream:** `msitarzewski--agency-agents@a597cb6`, divisão `spatial-computing/` (6 agentes upstream, 19 IDs G1-G19).
**Veredito:** GAP confirmado — criar squad NOVO compacto (chief + 3 especialistas). Anomalia temática (G5/G6/G7 = Apple dev-tooling) roteada para Dedalo, fora do squad novo.

---

## 1. Proposta de nome mitológico (3 candidatos)

### Candidato 1 — **Hyperion** (Ὑπερίων) · RECOMENDADO

- **Significado:** titã da luz celestial; "aquele que vai acima". Pai de Hélios (Sol), Selene (Lua) e Eos (Aurora).
- **Por que casa com XR/AR/VR:**
  - "Ir acima" alinha com spatial computing como **camada acima do plano 2D**.
  - A descendência cobre o espectro completo do domínio: **Hélios** (Sol/luz forte → render Metal nativo Apple), **Eos** (Aurora/transição luz-mundo → AR overlay e cross-device), **Selene** (Lua/ambiente imersivo → UX espacial e cockpit imersivo).
  - Permite **nomeação coerente dos 3 especialistas como descendentes do chief**, dando coesão semântica ao squad inteiro.
- **Disponibilidade Kolden:** sem colisão. Não consta na lista de 23 squads existentes nem no Prometeu/Caos/Hermes/Dike.
- **Tom:** forte, masculino-neutro, sem conotação ambígua.

### Candidato 2 — **Iris** (Ἶρις)

- **Significado:** mensageira dos deuses pelo arco-íris; conexão entre céu e terra.
- **Por que poderia casar:** arco-íris = espectro óptico prismático (HDR, color science), e "mensageira entre mundos" remete a AR sobrepondo o virtual no real.
- **Por que NÃO recomendado:** **colisão semântica em computação gráfica** — Iris GL (predecessora do OpenGL na Silicon Graphics) e Mesa/IRIS são nomes históricos no domínio de gráficos 3D. Risco de confusão técnica em pesquisas de referência e em código futuro.

### Candidato 3 — **Astraeus** (Ἀστραῖος)

- **Significado:** titã dos astros, do crepúsculo e dos ventos celestes. Pai dos quatro ventos (Boreas, Notus, Eurus, Zephyrus) e dos astros.
- **Por que poderia casar:** "astros" = pontos no espaço 3D (navegação espacial, point clouds); "crepúsculo" = liminar entre mundos (mixed reality).
- **Por que NÃO recomendado:** mais "astronomia/cosmos" do que "espacial-imersivo"; a metáfora se distancia da operação cotidiana XR (gaze, pinch, HUD, cockpit). Hyperion vence porque a descendência dá especialistas com nome próprio coerente; Astraeus daria nome aos quatro ventos (que não casam com a divisão técnica do trabalho).

---

## 2. Estrutura aprovada (compacta, 4 agentes)

```
C:\Kolden\Hyperion\
├── CLAUDE.md                            ← identidade do squad
├── squad.yaml                           ← manifesto (tiers, roster, handoffs)
├── prd-de-ia.md
├── README.md
├── MEMORY.md
├── instalacao.md
├── roteiro-de-teste.md
├── agents/
│   ├── hyperion-chief.md                ← tier 0 (orquestrador XR)
│   ├── helios-nativo-apple.md           ← tier 1 (visionOS / Metal / macOS spatial)
│   ├── eos-xr-cross-platform.md         ← tier 1 (WebXR / Quest / HoloLens / cross-device)
│   └── selene-ux-espacial.md            ← tier 1 (UI/UX espacial / cockpit / multimodal input)
├── data/
│   └── routing-catalog.yaml
├── workflows/
├── checklists/
├── tasks/
└── .claude/
    ├── skills/
    │   └── catalogo.md
    ├── reflexos/
    └── settings.json
```

### Por que compacto (3 especialistas, não 5+)

- Domínio XR/AR/VR é grande, mas o acervo upstream entrega **5 agentes XR + 1 anomalia**. Após isolar a anomalia para Dedalo, restam 5 agentes upstream e 16 IDs — escala que cabe em 3 especialistas bem desenhados.
- Os 5 agentes upstream agrupam naturalmente em três eixos não-sobrepostos:
  - **Caminho nativo Apple** (macos-spatial-metal + visionos-spatial) → Hélios.
  - **Caminho cross-platform / WebXR** (xr-immersive-developer) → Eos.
  - **UX espacial e cockpit** (xr-cockpit-interaction + xr-interface-architect) → Selene.
- Mais especialistas seria fragmentação artificial. O squad pode crescer depois (ex.: separar visionOS-SwiftUI de Metal puro) sob demanda real.

### Mapeamento de skills por especialista

| Especialista | IDs absorvidos | Total skills | Cerne |
|---|---|---|---|
| helios-nativo-apple | G1, G2, G3, G4, G8, G9, G10 | 7 | Metal + visionOS/SwiftUI (caminho Apple proprietário) |
| eos-xr-cross-platform | G14, G15, G16 | 3 | WebXR + compatibilidade Quest/HoloLens/AR móvel |
| selene-ux-espacial | G11, G12, G13, G17, G18, G19 | 6 | UI/UX espacial geral + cockpit + multimodal + validação UX |
| **Hyperion total** | 16 IDs | **16 skills** | — |

---

## 3. Roteamento da anomalia temática (G5/G6/G7 → Dedalo)

O agente upstream `terminal-integration-specialist.md` (3 IDs: G5/G6/G7) é Apple/Swift dev-tooling — **não pertence a XR**:
- G5: integração SwiftTerm em apps Swift (emulador de terminal).
- G6: rendering de texto em Core Graphics/Core Text (performance + bateria).
- G7: ponte I/O SSH ↔ terminal (session management).

Tudo gira em torno de **construir ferramentas de terminal para desenvolvedores Apple**. Domínio correto = **Dedalo** (Claude Code dev domain / engenharia de devtools). Roteamento para o Dedalo absorver como 3 skills novas, em arquitetura a definir pelo próprio Dedalo (provavelmente um especialista de Apple devtools, se ainda não houver).

Esta decisão preserva a coesão temática do Hyperion (squad PURAMENTE XR) e evita o erro silencioso de absorver Apple terminal tooling como "spatial".

---

## 4. Reconciliação anti-perda (invariante F4)

| Categoria | IDs | Total |
|---|---|---|
| ABSORVIDO em Hyperion | G1, G2, G3, G4, G8, G9, G10, G11, G12, G13, G14, G15, G16, G17, G18, G19 | 16 |
| ABSORVIDO em Dedalo (anomalia) | G5, G6, G7 | 3 |
| DESCARTADO | — | 0 |
| PERDIDO | — | 0 |
| **inventário F3** | G1-G19 | **19** |

**Invariante:** 16 + 3 + 0 + 0 = 19 ✓ — **PERDIDO = 0**.

---

## 5. Próximos passos (F6 — Aplicação)

1. **Aguardar aprovação do nome** (Hyperion / Iris / Astraeus) e da estrutura compacta proposta.
2. Após aprovação, F6 entra na cascata do Ritual do Caos (5.0→5.6):
   - 5.0 plano de construção pelo arquiteto.
   - 5.1 hyperion-chief (tier 0).
   - 5.2 três especialistas (Hélios, Eos, Selene) com `tools:` restritas.
   - 5.3 16 skills distribuídas conforme tabela acima.
   - 5.4 — não há MCP próprio a construir neste bucket (consumo de RealityKit / Metal / WebXR é nativo das plataformas).
   - 5.5 reflexos + MEMORY.md.
   - 5.6 herança histórica por camada (referências: John Carmack para render imersivo; Bob Pierce / Mike Alger para UX VR; Apple HIG visionOS para nativo Apple).
3. **Em paralelo:** roteamento das 3 skills G5/G6/G7 para Dedalo (decisão de arquitetura interna do Dedalo: novo especialista Apple-devtools ou anexar a um existente).
4. **Registro:** ao final do F6/F7, lavrar entrada no `Caos/dados/repositorios-absorvidos.yaml` com SHA `a597cb6` e bucket B13.

---

## 6. Sumário executivo

- **Squad NOVO compacto** (4 agentes) — Hyperion + Hélios + Eos + Selene.
- **16 skills** absorvidas dentro do Hyperion (XR/AR/VR puro).
- **3 skills** roteadas para Dedalo (anomalia Apple devtools).
- **PERDIDO = 0** (invariante anti-perda cumprido).
- **Decisão pendente:** Ronan aprova nome (Hyperion recomendado) e estrutura compacta para abrir F6.
