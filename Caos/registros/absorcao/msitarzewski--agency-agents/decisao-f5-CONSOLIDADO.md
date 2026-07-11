---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F5 CONSOLIDADO — Ritual de Absorção `msitarzewski/agency-agents@a597cb6`

> **PARA AQUI.** Aguardando aprovação executiva do Ronan (Caos Art. III, F5 BLOCK).
> Após o OK, executo F6 (aplicação) bucket por bucket, com F6.5 (gate-reconciliacao.py por bucket) e F7 (ledger por ID).

## TL;DR

- **Inventário F3 total:** 623 IDs em 232 agentes upstream em 16 divisões.
- **Mapeamento F4 (623/623 decididos):** 66 REUSE / 174 ADAPT / 293 CREATE / 60 DESCARTADO / 30 ROADMAP.
- **PERDIDO = 0** em todos os 15 buckets. Reconciliação aritmética bate `66+174+293+60+30 = 623` ✓
- **Veredito F2:** SAFE. **Licença:** MIT (atribuição central por squad + header de 1 linha em skills).
- **Squads novos propostos:** **Atlas** (GIS), **Hyperion** (Spatial XR), **Pã** (Game-Dev).
- **Squads novos no ROADMAP (não criados nesta sessão):** Hefesto-Embedded, Atropos (SRE/IR), Themis-Ops (ITSM), Aoidos (OrgScript DSL), Eco (voz/áudio), Asclepio (saúde), Iris/Eos (customer support).

## Tabela executiva por bucket

| Bucket | Squad(s)-alvo | IDs | REUSE | ADAPT | CREATE | DESCARTADO | ROADMAP | PERDIDO | Escritas previstas |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| **B01** | Égide | 35 | 24 | 11 | 0 | 0 | 0 | 0 | 3 skills novas + 5 estendidas |
| **B02** | Caliope + Pheme + Peitho | 107 | 13 | 17 | 73 | 4 | 0 | 0 | 35 skills novas + 5 estendidas + 3 agentes ampliados; Peitho ganha sua 1ª camada `.claude/skills/` |
| **B03** | Prometeu + Dedalo (+ Égide/Ariadne/Caliope/Aletheia) | 117 | 9 | 68 | 14 | 18 | 8 | 0 | 28 skills Prometeu + 2 Dedalo + 1 Égide + 1 Ariadne + 1 Caliope + 1 Aletheia |
| **B04** | Aletheia + Prometeu | 23 | 4 | 5 | 12 | 2 | 0 | 0 | 7 skills Aletheia + 5 skills Prometeu |
| **B05** | Harmonia + Aglaia | 27 | 4 | 12 | 10 | 1 | 0 | 0 | 2 skills Harmonia + 9 skills Aglaia (1ª camada `.claude/skills/` de Aglaia) |
| **B06** | Emporos + Pluto | 33 | 4 | 6 | 23 | 0 | 0 | 0 | Emporos: +4 agentes + 13 skills · Pluto: +1 agente + estrutura `.claude/skills/` + 3 skills |
| **B08** | Pactolo (+ Plutos ROADMAP) | 29 | 5 | 4 | 4 | 14 | 2 | 0 | ~7 escritas no Pactolo (tax US e investment research fora de escopo) |
| **B09** | Cairos (+ Prometeu/Metis/Olimpo) | 21 | 0 | 3 | 18 | 0 | 0 | 0 | Cairos 7 + Prometeu 7 + Metis 4 + Olimpo 3 |
| **B10** | DISPERSAR (Hestia=0, Metis, Olimpo, Pactolo, Themis) | 23 | 2 | 5 | 8 | 0 | 8 | 0 | Metis 4 + Olimpo 2 + Pactolo 5 + Themis 4 (+1 agente compliance novo) · ROADMAP: infra-Kolden-OS + squad-cs-novo |
| **B11** | Liceu | 18 | 0 | 2 | 16 | 0 | 0 | 0 | 5 dossiês de disciplina + 9 frameworks + 2 anexos + 2 ADAPTs no checklist |
| **B12** | **Atlas (novo squad GIS)** | 43 | 0 | 3 | 40 | 0 | 0 | 0 | Squad-semente: chief + 4 especialistas + 13 skills âncora |
| **B13** | **Hyperion (novo squad XR)** + Dedalo (3 IDs anomalia) | 19 | 0 | 0 | 19 | 0 | 0 | 0 | Squad-semente compacto: chief + 3 especialistas (Helios/Eos/Selene) + 16 skills |
| **B14** | **Pã (novo squad Game-Dev)** | 56 | 0 | 0 | 56 | 0 | 0 | 0 | Squad-semente maior: chief + 5 especialistas + 10 skills âncora |
| **B15** | DISPERSAR (Olimpo, Hestia, Pactolo, Themis, Dedalo, Metis, Liceu, Emporos, Caliope/Aglaia) | 72 | 1 | 38 | 0 | 21 | 12 | 0 | Olimpo 9 skills (Zeus 4 + Plutos 3 + Poseidon 2); demais distribuídos. ROADMAP: agentic-identity submódulo Égide, customer ops squad |
| **TOTAL** | **15 buckets** | **623** | **66** | **174** | **293** | **60** | **30** | **0** | — |

**Invariante anti-perda satisfeita:** `66 + 174 + 293 + 60 + 30 = 623` ✓ · `PERDIDO = 0`

## 3 squads NOVOS propostos (nomes para sua aprovação)

| Squad | Domínio | Nome propôsto | Justificativa | Tamanho | Agentes |
|---|---|---|---|---|---|
| **B12** | GIS / Geoespacial | **Atlas** | Titã que sustenta a abóbada celeste; etimologia direta de "coleção de mapas"; sem conflito | 5 | chief + analista-espacial + engenheiro-dados-espaciais + cartógrafo + engenheiro-captura |
| **B13** | Spatial Computing (XR/AR/VR) | **Hyperion** | Titã da luz celestial, pai de Hélios/Selene/Eos; nomes próprios para os 3 especialistas | 4 (compacto) | chief + Helios (nativo Apple/Metal/visionOS) + Eos (XR cross-platform/WebXR) + Selene (UI/UX espacial) |
| **B14** | Game Development | **Pã** | Deus pastoril da diversão/improviso; etimologia direta com παίζω (jogar); cobre escopo inteiro | 6 (maior) | chief + engines-AAA (Unity/Unreal) + engines-abertas (Godot/Roblox) + arte-técnica (Blender) + design-narrativa + áudio |

Os 3 squads ainda **NÃO foram criados** — apenas propostos. Após sua aprovação, abro sessões `/caos` dedicadas (Ritual completo de Criação) para cada um, dentro do escopo desta absorção.

## Skills consolidadas em squads EXISTENTES

| Squad existente | Skills novas | Skills estendidas | Agentes novos/ampliados |
|---|---:|---:|---|
| Égide | 3 | 5 | — |
| Caliope | 5 | — | — |
| Pheme | 22 | 5 | 3 ampliados (carousel-architect, short-video-architect, youtube-strategist) |
| Peitho | 8 | 3 ajustes | Cria 1ª camada `.claude/skills/` |
| Prometeu (AIOX) | 33 | — | 5 anexos em MEMORY (pm/po/sm + 2) |
| Dedalo | 4 | — | — |
| Aletheia | 12 | — | — |
| Harmonia | 2 | 1 | — |
| Aglaia | 9 | — | Cria 1ª camada `.claude/skills/` |
| Emporos | 13 | 4 | +4 agentes especialistas |
| Pluto | 3 | — | +1 agente (hormozi-sales-coach) + cria estrutura `.claude/skills/` |
| Pactolo | 5 | 2 | — |
| Cairos | 2 | 3 | — |
| Hestia | 0 (não absorve B10) | 0 | — |
| Themis | 3 | — | +1 agente (analista-de-compliance-regulatorio) |
| Metis | 4 | 1 (CLV→+churn) | — |
| Olimpo | 9 (4 Zeus + 3 Plutos + 2 Poseidon) | — | — |
| Argos | 0 | 1 (ADAPT G25 B12) | — |
| Liceu | 16 (5 dossiês disciplina + 9 frameworks + 2 anexos) | 2 (checklist) | tipo "disciplina" novo no acervo |
| Ariadne | 0 | 1 (CWV+capacity B03) | — |
| Orfeu | 0 | 1 (referência Campbell/Snyder via Liceu G11) | — |

## DESCARTADOS (60 IDs) — motivos categorizados

Todos os 60 DESCARTADO têm motivo registrado nos `mapa-de-decisao-*.md` correspondentes. Categorias:

- **Cluster tributário US** (B08, 7 IDs) — tax strategist americano fora de escopo Kolden (contador BR externo).
- **Investment research / asset management** (B08, 4 IDs) — Kolden não opera fundos.
- **Stacks fora do core Kolden** (B03, 18 IDs) — Drupal/WordPress/Filament/Feishu/WeChat/etc.
- **China-centric stack** (B15, parte de 21) — agentes culturalmente locked sem valor cross-cultural extraível.
- **Outros fora de escopo** (B15, parte de 21) — civil-engineer, study-abroad-advisor, etc.
- **Fronteiras com outros squads já cobertos** (B02, 4 IDs) — SEO técnico (Ariadne), intel X/Twitter (Argos).
- **Sobreposição interna do upstream** (B05, B08, B02 = ~6 IDs) — capacidades duplicadas.

## ROADMAPs (30 IDs) — squads-novos diferidos

Capacidades válidas mas que justificam squads FUTUROS (não nesta absorção):

| ROADMAP | IDs | Justificativa | Bucket de origem |
|---|---|---|---|
| **Asclepio** (saúde) | 4 | sub_dominio healthcare em B15 | B15 |
| **Iris/Eos** (customer ops/CS) | 4-8 | lacuna estratégica do Kolden | B10, B15 |
| **agentic-identity** (submódulo Égide) | 5 | identidade de agentes IA | B15 |
| **Hefesto-Embedded** (firmware/IoT) | 2 | engineering polifônico | B03 |
| **Atropos** (SRE/IR completo) | 2 | comando de incidente | B03 |
| **Themis-Ops** (ITSM) | 2 | service management | B03 |
| **Aoidos** (OrgScript DSL) | 1 | DSL solo | B03 |
| **Eco** (voz/áudio/ASR) | 1 | sintese de voz | B03 |
| **Plutos M&A/DD** | 2 | trigger = 1ª aquisição real | B08 |
| **Infra Kolden OS** (Prometheus/Terraform) | 4 | escopo do LobeHub stack (não squad) | B10 |
| **Hospitality / Real-estate / Grant** | 3 | quando vertical justificar | B15 |

ROADMAP é **tratado como ABSORVIDO-DIFERIDO** no schema F6.5 (motivo explícito "deferido R3/R4"), **nunca como PERDIDO**.

## Plano de execução F6 — sugestão de sequenciamento

| Ordem | Bucket | Por quê primeiro | Sessão |
|---|---|---|---|
| **1** | B01 (Égide) | Calibração: pequeno, REUSE-pesado, baixo risco | S2 |
| **2** | B04 (product) | Pequeno, calibra cross-squad Aletheia×Prometeu | S2-S3 |
| **3** | B08 (Pactolo) | Squad-semente, valida refino de semente | S3 |
| **4** | B09 (Cairos) | Squad-semente, idem | S3 |
| **5** | B11 (Liceu) | Cria padrão "disciplina" novo no acervo | S4 |
| **6** | B05 (design) | Aglaia ganha 1ª camada de skills | S4 |
| **7** | B06 (sales) | Emporos +4 agentes, Pluto estrutura nova | S4-S5 |
| **8** | B02 (Caliope+Pheme+Peitho) | Bucket grande — Peitho 1ª camada de skills | S5-S6 |
| **9** | B03 (Prometeu+Dedalo) | Bucket grande, dispersa para 6 squads | S6-S7 |
| **10** | B10 (dispersar) | Hestia confirmada como zero | S7 |
| **11** | B15 (specialized) | Olimpo recebe 9 skills, distribuição maior | S7-S8 |
| **12** | B12 (Atlas) | Novo squad via Ritual `/caos` | S8 |
| **13** | B13 (Hyperion) | Novo squad compacto via Ritual | S8 |
| **14** | B14 (Pã) | Novo squad maior via Ritual | S9 |

Cada sessão de F6 inclui: F6 (aplicação com cascata N0→N6 + maturity ≥7.0) + F6.5 (`gate-reconciliacao.py` por bucket, PERDIDO=0) + F7 (entrada parcial no ledger).

## Invariantes preservadas (Constituição)

- **Art. II PT-BR estrito:** toda skill nova/estendida em PT-BR.
- **Art. III F5 BLOCK:** **PARANDO AQUI** aguardando aprovação Ronan.
- **Art. VI REUSE > ADAPT > CREATE:** diff técnica-a-técnica em todos os 60 REUSEs (justificativa citando arquivo/função).
- **Art. VII Infisical:** nenhum segredo upstream copiado; toda integração via Infisical.
- **Art. VIII Anti-perda:** PERDIDO=0 em todos os 15 buckets.
- **Veto ético da Égide:** G24 e G25 (B01) absorvidos APENAS como detecção/defesa; veto ofensivo preservado.

## Atribuição MIT (decisão Ronan fixada no contrato)

- **Central:** `_origem.md` em cada squad-alvo afetado (~17 squads tocados).
- **Header de 1 linha** em cada skill derivada: `Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT)`.

## Pontas para sua atenção antes do OK

1. **3 nomes mitológicos** (Atlas, Hyperion, Pã) — confirma ou propõe outros?
2. **B10 Hestia = zero absorção** — confirma a fronteira? (Hestia=RH; customer support=ROADMAP "Iris/Eos").
3. **Tensão B11 Liceu**: Bowlby/Vaillant/Beck/Karpman/Erikson (empírica) coexistem com Freud/Bernays/Dichter/Lacan (consumo). Fronteira aceita?
4. **B06 Pluto recebe estrutura `.claude/skills/`** pela 1ª vez — confirma?
5. **B05 Aglaia ganha 1ª camada de skills** pela 1ª vez — confirma?
6. **Tensão B03 Caliope recebe technical writing** (G75-G77 ENG) — copy é persuasivo, technical writing não. Mantém em Caliope ou cria squad-solo `Bibliotecário`?
7. **B10 ROADMAP "Iris/Eos"** customer support — abrir ticket no R3 do Caos?
8. **5 squads-novos do B03 ROADMAP** (Hefesto-Embedded, Atropos, Themis-Ops, Aoidos, Eco) — aceita para R3?

## Inputs auditáveis (para revisão)

Todos os artefatos vivem em `C:\Kolden\Caos\registros\absorcao\msitarzewski--agency-agents\`:

- 16 inventários F3 (`inventario-<divisao>.md`)
- 15 mapas F4 (`mapa-de-decisao-b<NN>-<dominio>.md`)
- 15 decisões F5 (`decisao-f5-b<NN>-<dominio>.md`)
- 1 consolidado F5 (este arquivo)
- 1 veredito F2 (`seguranca.md`)
- 1 procedência F1 (`_procedencia.md` na quarentena)

Contrato lacrado: `Olimpo/contratos/missoes/m-20260628-234143-absorve-agency-agents.yaml`.

## Próximo passo

Aguardo seu **"OK, aprovado"** para começar F6 (S2 = B01 Égide primeiro como calibração). Sem aprovação, nenhuma escrita em `C:\Kolden\<Squad>\`.
