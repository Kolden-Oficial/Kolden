---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/diagnostico_caos/_indice|_indice]]"
---

# 04 — Teste empírico de perda (a prova)

## Seleção do repo (sem trapaça)

`coreyhaines31/marketingskills@8bfcdff` — repo de skills de agente, **caso difícil real**: 382 arquivos, 45 skills com frameworks internos, 64 CLIs, truques não-óbvios (injeção dinâmica, protocolo de update, métodos de prospecção). Não é trivial. **E é o único repo que o CAOS absorveu de verdade** (2026-06-22), então não preciso simular nada: comparo o gabarito contra a **saída real e durável** do pipeline.

- **Preserve:** original intacto em `teste/original-ref.md` (reaproveito o clone real da quarentena; `.git` removido na F1 — verificado).
- **Inventário-verdade:** `teste/gabarito.md` (22 capacidades, cada uma com `arquivo:linha`).
- **Saída real do CAOS:** `teste/absorvido/saida-real-caos.md` (ledger + ausências).

> **Limite honesto declarado:** a corrida real **parou na F5** (`decisao: PARCIAL`, `entidades: []`, `status: parcial` — `repositorios-absorvidos.yaml:42-46`). Logo, **F6/F7 (integração) têm 0 execuções** e não posso medir empiricamente a perda *da etapa de integração*. O que MEÇO é: (a) a fidelidade do registro durável de capacidades produzido pela corrida real, e (b) estruturalmente, que **nenhum relatório de perda foi emitido em fase alguma**. `[VERIFICADO]`

## Diff a nível de capacidade

Legenda: **SOBREVIVEU** = integrada num squad da Kolden. **DETECTADA** = não integrada, mas **registrada de forma rastreável** (o sistema "sabe que existe"). **SILENCIOSA** = sumiu sem registro individual — se a quarentena for limpa, perde-se sem rastro.

| ID | Capacidade | Estado | Detecção | Onde (ou ausência) |
|---|---|---|---|---|
| G1 | 45 skills (corpo) | não-integrada | **DETECTADA** (agregado) | ledger `capacidades[0]` |
| G2 | padrão evals/ | não-integrada | **DETECTADA** (agregado) | ledger `capacidades[1]` + notas |
| G4 | 64 CLIs | não-integrada | **DETECTADA** (agregado) | ledger `capacidades[2]` |
| G11 | validate-skills scripts | não-integrada | **DETECTADA** (parcial) | citado como ressalva de segurança nas notas |
| G3 | references/ por skill | não-integrada | **SILENCIOSA** | nenhum registro |
| G5 | padrão de CLI (`--dry-run`, env auth, JSON) | não-integrada | **SILENCIOSA** | nenhum registro |
| G6 | REGISTRY.md (matriz ~90 tools) | não-integrada | **SILENCIOSA** | nenhum registro |
| G7 | 93 guias de integração | não-integrada | **SILENCIOSA** | nenhum registro |
| G8 | camada Composio | não-integrada | **SILENCIOSA** | nenhum registro |
| G9 | gateway Cogny | não-integrada | **SILENCIOSA** | nenhum registro |
| G10 | marketplace.json (plugin) | não-integrada | **SILENCIOSA** | nenhum registro |
| G12 | protocolo update 1×/sessão | não-integrada | **SILENCIOSA** | nenhum registro |
| G13 | injeção dinâmica `` !`cmd` `` | não-integrada | **SILENCIOSA** | nenhum registro |
| G14 | convenção `.agents/product-marketing.md` | não-integrada | **SILENCIOSA** | nenhum registro |
| G15 | regras de conformância da spec | não-integrada | **SILENCIOSA** | nenhum registro |
| G16 | grafo de cross-ref entre skills | não-integrada | **SILENCIOSA** | nenhum registro |
| G17 | heurísticas de seleção de tool | não-integrada | **SILENCIOSA** | nenhum registro |
| G18 | método github-prospects | não-integrada | **SILENCIOSA** | nenhum registro |
| G19 | estados de validação Truelist | não-integrada | **SILENCIOSA** | nenhum registro |
| G20 | 14 tools MCP-enabled (mapa) | não-integrada | **SILENCIOSA** | nenhum registro |
| G21 | frameworks internos das skills (ex. copywriting) | não-integrada | **SILENCIOSA** | apagado por "copy = REUSE Caliope" sem verificação técnica-a-técnica |
| G22 | biblioteca de experimentos CRO | não-integrada | **SILENCIOSA** | apagado por menção de domínio "cro" |

## Números

```
capacidades do gabarito        = 22
SOBREVIVERAM (integradas)      = 0      (F6 nunca rodou)
DETECTADAS (registradas)       = 4      (G1, G2, G4, G11 — todas em granularidade AGREGADA)
SILENCIOSAS                    = 18
```

**Duas leituras honestas da TPND (declaro ambas):**

1. **Leitura estrita da métrica (`perdas_silenciosas / perdas_totais`):**
   O pipeline **não emitiu nenhum relatório de perda** em fase alguma — não existe a etapa que o faria (Pilar 5 AUSENTE, `03`). Logo, **toda** perda real é, por construção, silenciosa.
   → **TPND = perdas_silenciosas / perdas_totais = 1.0** (taxa de auto-detecção de perda = 0%).

2. **Leitura por cobertura de registro (granularidade do gabarito):**
   18 das 22 capacidades não deixaram traço individual; as 4 "detectadas" são **contagens agregadas** que escondem sub-perdas (G1 "45 skills" registra que existem, não o que há dentro — G21/G16/G14 vivem aí e sumiram).
   → **18/22 = 0,82 das capacidades sem rastro individual**, e **0% delas foi sinalizada como "não-absorvida"** pelo CAOS.

**Ambas convergem:** o sistema absorveu/registrou em granularidade de domínio e **não tem mecanismo que diga "isto aqui ficou de fora"**. TPND ≠ 0.

## Exemplos concretos de perda silenciosa (o truque exato que sumiu sem aviso)

1. **G13 — injeção dinâmica `` !`cmd` ``** (`AGENTS.md:223-254`): técnica Claude-Code-only que auto-injeta contexto de produto e quebra cross-agent. É exatamente o tipo de "truque não-óbvio" que distingue o repo. **Zero menção** em qualquer artefato do CAOS.
2. **G18 — github-prospects** (`REGISTRY.md:330-338`): método de prospecção por stargazers com pipeline Apollo→Hunter→Truelist. Sumiu sem rastro — apesar de a Kolden ter squads de prospecção (Pluto/Argos).
3. **G21 — "copy = REUSE (Caliope)"** (`ledger notas`): o CAOS declarou copy "já coberto" e **nunca confrontou** as técnicas de `copywriting/SKILL.md` (voice-of-customer mirroring, fórmulas de headline, `natural-transitions.md`) contra o conteúdo real do Caliope. REUSE assumido no nível de **domínio**, não verificado no nível de **capacidade** — o caso clássico de perda silenciosa sob um carimbo de "já temos".

## Diffs brutos anexados

- `teste/original-ref.md` — contagens estruturais do original.
- `teste/gabarito.md` — inventário-verdade (22 itens, citados).
- `teste/absorvido/saida-real-caos.md` — ledger + ausências (artefatos F2/F3/F4 inexistentes, F6/F7 não executadas, procedência ainda em "Fase 2 pendente" contradizendo o ledger).

## 2º repo (amostra > 1)?

**Não há 2º repo absorvido** no ecossistema (`_staging/quarentena/` tem só este — `01_censo.md §1.7`). Re-absorver um repo novo exigiria eu **operar o CAOS como agente** (rodar a skill F0-F5), o que cai no risco de virar simulação minha em vez do processo. Pela **condição de parada** ("não simule um teste"), **declaro n=1** e trato a generalização como `[INCONCLUSIVO]` — ver `05_red_team.md`. A amostra de 1 prova **existência** de perda silenciosa, não sua **taxa média**.
