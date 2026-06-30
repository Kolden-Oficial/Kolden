# F5 — Decisão · B14 = NOVO squad **Pã** (Game Development)

> **Bucket:** B14 (GAP — squad NOVO, tamanho **maior**: 1 chief + 5 especialistas)
> **Origem:** `msitarzewski--agency-agents@a597cb6` / `game-development/`
> **Inventário:** 56 IDs (G1–G56) · 20 agentes upstream · ver `inventario-game-development.md`
> **Mapa F4:** `mapa-de-decisao-b14-game-dev.md` — 56/56 ABSORVIDO, PERDIDO=0
> **Decisão dominante:** **CREATE** (squad novo)
> **Status:** F5 fechada — aguardando aprovação do Ronan para Ritual completo

---

## 1. Três nomes mitológicos propostos (com justificativa)

A Rodada 0 (Alma) do diagnóstico exige exatamente 3 candidatos da mitologia grega. Conferi colisões com squads existentes (Dionísio, Hermes, Apolo, Caliope, Aletheia, Argos, Olimpo, Themis, Metis, Pluto, Pheme, Peitho, Aglaia, Harmonia, Orfeu, Ariadne, Liceu, Dédalo, Égide, Nomos, Pactolo, Emporos, Hestia, Ananke, Cairos) — nenhum candidato abaixo colide.

### 🥇 Recomendação: **Pã (Πάν)**

**Quem foi:** deus dos pastores, dos rebanhos, da natureza selvagem, da diversão dionisíaca (mas distinto de Dionísio) e da **música pastoril** (a flauta-de-Pã). Padroeiro do improviso, da brincadeira (παίζω = jogar/brincar) e do "pânico" (twist súbito de adrenalina — etimologia direta).

**Por que serve a Game Dev:**
- **Diversão como propósito-fim** — jogo é entretenimento; Pã encarna o lúdico sem o peso ritualístico de Dionísio (que já é squad de movimentos/comunidade) e sem a leveza cômica restrita de Talia.
- **Improviso e variedade** — Pã transitava entre o pastoril (casual/idle), a música (audio interativo), a sátira (narrativa), o pânico (horror games) e a festa (multiplayer). Cobre todo o escopo do squad (5 engines + áudio + design + arte técnica) sem forçar.
- **Vocabulário rico** — pânico, panorama, pan-flauta, pandemônio: termos que o squad pode reapropriar internamente (ex.: "modo pânico" para detecção de regressão de performance em runtime).
- **Não-overlap semântico** — Pã está perto de Dionísio mas é distinto: Dionísio é o êxtase da multidão/marca, Pã é o jogo do indivíduo no espaço selvagem. Nenhuma sobreposição operacional com squads existentes.
- **Etimologia direta com "play"** — em grego clássico, παίζω (paizō, brincar/jogar) compartilha raiz com Παν em uso poético arcaico. Aderência linguística natural.

### 🥈 Alternativa: **Talia (Θάλεια)**

**Quem foi:** musa da comédia e da poesia bucólica/pastoril; uma das nove musas.
**Por que serve:** Talia traz a vibe de jogo casual, social, leve. Aderência forte para Roblox/UGC e jogos sociais.
**Por que NÃO é a recomendação:** Talia restringe o squad ao cômico/leve. Um RPG sombrio, um horror game, uma simulação séria de civilização ou um shooter competitivo ficariam **fora** da identidade dela. Talia é boa demais para esticar — provavelmente seria um sub-squad futuro se a Kolden criar uma vertical de "jogos sociais casuais" especificamente.

### 🥉 Alternativa: **Terpsícore (Τερψιχόρη)**

**Quem foi:** musa da dança e do coro (movimento ritmado coletivo).
**Por que serve:** "coro coletivo" mapeia bem em multiplayer e MMO; "dança" mapeia em ritmo, animation e gameplay loops.
**Por que NÃO é a recomendação:** Terpsícore é específica de **movimento**. Cobre gameplay/animação/multiplayer com elegância, mas distante de world-building, lore, monetização, level design narrativo, áudio (ironicamente — apesar de ser musa, dança ≠ música ambient/diegética de jogo). Recortaria demais o escopo.

**Decisão semântica:** **Pã** é a única opção que cobre o escopo **inteiro** (5 engines + áudio + design + arte técnica + narrativa + monetização) sem forçar a metáfora.

---

## 2. Estrutura-semente (6 agentes — tamanho maior)

```
C:\Kolden\Pa\
├── CLAUDE.md                       ← identidade do squad
├── squad.yaml                      ← manifesto (tier 0 + tier 1, roster, handoffs)
├── prd-de-ia.md                    ← documento de requisitos (gerado na Fase 4)
├── README.md
├── MEMORY.md                       ← memória do squad (padrões/candidatos/arquivado)
├── instalacao.md
├── roteiro-de-teste.md             ← smoke tests da Fase 7
├── agents/
│   ├── pa-chief.md                 ← tier 0 — orquestrador
│   ├── engines-aaa-engenheiro.md   ← tier 1 — Unity + Unreal
│   ├── engines-abertas-engenheiro.md  ← tier 1 — Godot + Roblox
│   ├── arte-tecnica-cross-engine.md   ← tier 1 — Blender + ponte arte↔engine
│   ├── design-de-jogo-e-narrativa.md  ← tier 1 — GDD + level + narrative
│   └── audio-interativo-engenheiro.md ← tier 1 — FMOD/Wwise
├── data/
│   ├── routing-catalog.yaml        ← keywords → especialista
│   └── frameworks/                 ← refs (Bartle, Schell, MDA, Yu-Kai, etc.)
├── workflows/                      ← DAGs de produção (greybox → vertical slice → polish)
├── checklists/                     ← gates de qualidade (ship checklist por plataforma)
├── tasks/                          ← templates de task
└── .claude/
    ├── settings.json               ← configuração de reflexos
    ├── reflexos/
    │   ├── verificacao-diaria.sh
    │   ├── auditoria-pretooluse.sh
    │   ├── log-posttooluse.sh
    │   ├── encerramento-aprendizado.sh   ← Ritual de Encerramento
    │   └── marca-trabalho.sh
    └── skills/
        ├── catalogo.md             ← índice de todas as habilidades
        └── (56 SKILL.md, organizadas por dono — ver §3)
```

### Responsabilidades por agente

#### `pa-chief.md` (tier 0 — orquestrador)
- **Cargo:** chief de game development da Kolden.
- **Função:** lê o briefing (PRD do jogo, ou pedido pontual do Ronan/Zeus), classifica a intenção (qual engine? qual disciplina? qual fase do projeto?) e roteia para o(s) especialista(s) certo(s).
- **NÃO executa nada** — só roteia. Mantém o `routing-catalog.yaml`. Dono do `squad.yaml`.
- **Roteamento:** Unity/Unreal → engines-aaa; Godot/Roblox → engines-abertas; Blender/asset pipeline/budget → arte-tecnica; GDD/level/lore → design; FMOD/Wwise/áudio → audio.

#### `engines-aaa-engenheiro.md` (tier 1)
- **Domínio:** Unity + Unreal Engine 5 (as duas engines proprietárias dominantes em AAA e indie de alto orçamento).
- **24 habilidades:** arquitetura Unity SO + editor tools + multiplayer NGO + Shader Graph URP/HDRP + UE5 systems (C++/BP/GAS/Nanite/Lumen) + UE5 multiplayer (replication/RPC/GameMode) + UE5 technical art (Niagara/PCG/HLOD/Substrate) + UE5 world-building (World Partition/Landscape/RVT).
- **Cross-link:** Égide (anti-cheat server-authority em G45).

#### `engines-abertas-engenheiro.md` (tier 1)
- **Domínio:** Godot 4 (open-source) + Roblox Studio (UGC platform).
- **14 habilidades:** Godot gameplay (GDScript 2.0 tipado, signal bus, autoload), Godot multiplayer (MultiplayerAPI, RPCs), Godot shaders (canvas/spatial/VisualShader, renderer tiers), Roblox UGC (avatar, layered clothing, marketplace), Roblox experience (engajamento, monetização ética, onboarding faseado), Roblox systems (Luau, DataStore com pcall+retry, RemoteEvent validation).
- **Cross-link:** Égide (anti-cheat em G14 e G29); Pluto (monetização Roblox em G25).

#### `arte-tecnica-cross-engine.md` (tier 1)
- **Domínio:** Blender + ponte arte↔engine cross-platform.
- **6 habilidades:** Blender add-ons (Python/bpy), disciplina não-destrutiva (dry-run + log), exporters cross-engine (FBX/glTF/USD normalizado), ponte arte↔engine (shader/VFX/LOD/compressão/budget), spec-sheet de budget por asset, validador de cadeia de LOD.
- **Cross-link:** Aglaia (informativo — arte de marca vs arte de jogo).

#### `design-de-jogo-e-narrativa.md` (tier 1)
- **Domínio:** camada criativa/UX/conteúdo — game design, level design, narrative design.
- **9 habilidades:** autoria de GDD, design por loops (M2M/sessão/longo prazo), balanceamento por planilha, design de níveis com pacing/blockout, gráfico de pacing, affordances de navegação, design narrativo sistêmico, pilares de voz de personagem, arquitetura de lore em camadas.

#### `audio-interativo-engenheiro.md` (tier 1)
- **Domínio:** áudio interativo de jogo (FMOD/Wwise).
- **3 habilidades:** engenharia de áudio interativo (eventos/parâmetros/espacial), orçamento de voice count + DSP por plataforma, música adaptativa por parâmetro (tensão 0-1, transições tempo-sync).
- **Especialista pequeno mas profundo** — áudio interativo é stack proprietário denso (FMOD Studio + Wwise Authoring) que merece isolamento de contexto.

---

## 3. Skills âncora (10 — núcleo identitário do squad)

Skills âncora = habilidades que **definem a identidade técnica** do Pã. Criadas primeiro durante o Ritual (Fase 5.3), antes das demais. Cada uma vira molde via fan-out para suas irmãs do mesmo dono.

| # | habilidade âncora | dono (especialista) | por que é âncora |
|---|---|---|---|
| 1 | `engenharia-de-addons-blender` (G1) | arte-tecnica-cross-engine | maior habilidade técnica em Python/bpy do squad; molde para G2/G3 |
| 2 | `engenharia-de-audio-interativo` (G4) | audio-interativo-engenheiro | base do especialista de áudio; molde para G5/G6 |
| 3 | `autoria-de-gdd` (G7) | design-de-jogo-e-narrativa | artefato canônico do domínio; molde para G8/G9 |
| 4 | `scripting-gameplay-godot` (G10) | engines-abertas-engenheiro | base Godot; molde para G11-G16 |
| 5 | `scripting-luau-roblox` (G27) | engines-abertas-engenheiro | base Roblox; molde para G23-G29 (parte Roblox) |
| 6 | `design-de-niveis-com-pacing` (G17) | design-de-jogo-e-narrativa | base level design; molde para G18/G19 |
| 7 | `design-narrativo-sistemico` (G20) | design-de-jogo-e-narrativa | base narrativa; molde para G21/G22 |
| 8 | `ponte-arte-engine-cross` (G30) | arte-tecnica-cross-engine | função-coração do agente cross-engine; molde para G31/G32 |
| 9 | `arquitetura-unity-scriptableobjects` (G33) | engines-aaa-engenheiro | base Unity; molde para G34-G43 |
| 10 | `sistemas-ue5-cpp-blueprint` (G47) | engines-aaa-engenheiro | base Unreal; molde para G44-G56 (parte UE5) |

**Estratégia de construção:** escrever as 10 âncoras à mão durante a Fase 5.3, depois disparar fan-out de subagentes para as 46 habilidades restantes, cada uma lendo a âncora-irmã como molde. Verificação por GREP sobre o resultado (não por relatório do subagente — princípio já validado em construções anteriores).

---

## 4. Reconciliação anti-perda (PERDIDO = 0)

| status | count | IDs |
|---|---|---|
| ABSORVIDO | 56 | G1–G56 |
| DESCARTADO | 0 | — |
| PERDIDO | 0 | — |

Invariante: `56 + 0 + 0 == 56` ✓ (idêntico ao mapa F4)

**Justificativa "0 DESCARTADO":** o squad é GAP (não há equivalente Kolden), todo o conhecimento upstream é novo para a casa e relevante. Nenhuma habilidade duplica o que já temos. Os 5 cross-links registrados (G14, G25, G29, G30, G45) NÃO são DESCARTE — são ponteiros de adjacência mantidos pelo curador.

---

## 5. Próximos passos (após aprovação do Ronan)

Sequência canônica do Ritual de Criação (Caos · Constituição Art. III — não escrever nada do squad sem aprovação explícita do PRD):

1. **Aprovação do nome** — Ronan escolhe entre Pã / Talia / Terpsícore (recomendação: Pã).
2. **Fase 0–4 do Ritual** — diagnóstico (7 faculdades), pesquisa (`busca-de-referencias` com scorecard ≥7/10 sobre Schell/Bartle/Yu-Kai/Anna Anthropy/Raph Koster/Jenova Chen), arquitetura (5 camadas), PRD.
3. **Aprovação do PRD pelo Ronan** (gate constitucional).
4. **Fase 5 (cascata 5.0→5.6)** — orquestrador → 5 especialistas → 10 âncoras → 46 habilidades por fan-out → MCPs (se algum dos engines exigir) → reflexos + MEMORY.md → referências por camada (`heranca-de-especialista` para cada especialista).
5. **Fase 6** — revisão pelo `revisor` contra checklist + Constituição.
6. **Fase 7** — `testador` instancia Pã e roda smoke tests (maturity score ≥7.0 gate).
7. **Fase 8** — `curador` registra a entidade em `dados/registro-de-entidades.yaml` (incluindo os 5 cross-links), captura padrões em `dados/padroes-aprendidos.yaml`, atualiza `registros/historico.md` e o ledger `dados/repositorios-absorvidos.yaml` (B14 marcado como ABSORVIDO completo).

**Estimativa de esforço (referência, não comprometimento):** squad maior com 56 habilidades + 5 reflexos + 6 agentes + DAGs + checklists = ~3-5h de Ritual completo numa sessão dedicada (`/caos` ou `/squad`). NÃO executar na sessão raiz — passar plano para sessão de Ritual.

---

## 6. Decisão final F5

**APROVADO PARA RITUAL** (pendente de confirmação do Ronan):
- ✅ Squad NOVO: **Pã** (Game Development)
- ✅ Topologia: 1 chief + 5 especialistas = 6 agentes
- ✅ Cobertura: 56/56 IDs ABSORVIDO · DESCARTADO=0 · PERDIDO=0
- ✅ Cross-links: 5 (Égide ×3, Pluto ×1, Aglaia ×1) — registrados, não removidos do mapa
- ✅ Skills âncora: 10 (uma por núcleo técnico)

→ Próxima ação do Ronan: confirmar nome + disparar `/caos` em sessão dedicada para execução do Ritual de 9 fases.
