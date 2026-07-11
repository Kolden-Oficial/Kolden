---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F4 — Mapa de decisão · `msitarzewski--agency-agents@a597cb6` — bucket B04 (product)

> **Bucket B04:** Aletheia (discovery & validation) + Prometeu (product management AIOX nativo).
> **Total upstream:** 23 IDs (G1-G23) — 5 agentes upstream: behavioral-nudge-engine, feedback-synthesizer, product-manager, sprint-prioritizer, trend-researcher.
> **Inventário origem:** [`inventario-product.md`](./inventario-product.md)
> **Saída paralela:** [`decisao-f5-b04-product.md`](./decisao-f5-b04-product.md)

---

## 1. Decisão técnica-a-técnica (G1-G23)

| ID upstream | capacidade | squad_alvo | decisao | match_kolden | justificativa | acao_f6 |
|---|---|---|---|---|---|---|
| **G1** | Behavioral psychology coaching engine (cadências adaptativas + motivação) | aletheia | **ADAPT** | sem agente equivalente (Aletheia foca discovery/validation, não engajamento contínuo); útil como skill compartilhada para desenhar **cadência de entrevistas** + **follow-up de experimentos com participantes** | psicologia comportamental aplicada a *participantes de validação* (não a usuários finais — isso é product design, fora do escopo) — preenche lacuna entre experiment design (Bland) e execução com humanos | skill nova `cadencias-comportamentais-em-validacao` em `Aletheia/.claude/skills/` (compartilhada do squad) |
| **G2** | Default bias / choice architecture | aletheia | **ADAPT** | embute em G1 (princípio mãe); Aletheia usa para evitar **viés de default em opções de pesquisa** (ex.: ordem de cards num Test Card, escala default em NPS de validação) | técnica reusável em desenho de experimento — não é skill própria, é seção dentro de G1 | absorvido como seção dentro da skill `cadencias-comportamentais-em-validacao` |
| **G3** | Cognitive load reduction / micro-sprint / time-boxing | prometeu | **ADAPT** | encaixa em **dev (Dex) / sm (River)** — micro-sprint + Pomodoro + decomposição de task são técnicas de execução, não de discovery | é UX de execução do agente, não de validation; squad-alvo correto é Prometeu (sm orquestra ritmo de sprint; dev executa tasks decompostas) | skill nova `micro-sprints-e-decomposicao-de-task` em `Prometeu/.claude/skills/` (agente-dono: sm River, com cross-link para dev Dex) |
| **G4** | Gamification + variable-reward engagement loop | DESCARTADO | **DESCARTADO** | nenhum squad-alvo coerente — Aletheia não engaja usuário final (faz validation com participantes ad-hoc); Prometeu constrói produto mas gamification é decisão de produto/UX que vive no PROJETO de aplicação (Omiron, CataLogo, etc.), não no framework Prometeu | gamification é uma capacidade de feature de *produto cliente*, não de framework de desenvolvimento nem de squad de validation; reaplicar isso seria invadir jurisdição AIOX/projeto | registrar no descartado com motivo "capacidade de produto-cliente, não de squad/framework"; salvar princípio resumido em MEMORY.md compartilhada se necessário (provavelmente não — é trivial demais) |
| **G5** | Multi-channel feedback collection + synthesis + thematic analysis | aletheia | **ADAPT** | alimenta hipóteses Aletheia — síntese de feedback (NPS/CSAT/support tickets/social) é input para descobrir dores não-óbvias antes de entrevistar | Aletheia hoje só lê o que o fundador traz; falta a engine que destila feedback bruto multi-canal em **temas + dores candidatas**. Skill compartilhada cobre todos os 7 especialistas (Fitzpatrick usa para preparar pre-planning; Ulwick para descobrir outcomes via temas; etc.) | skill nova `sintese-de-feedback-multi-canal` em `Aletheia/.claude/skills/` (compartilhada) |
| **G6** | Thematic analysis com validação estatística + detecção de viés | aletheia | **ADAPT** | é o motor estatístico de G5 — codificação NLP, frequency analysis, bias detection (sampling/confirmation/recency) | tecnicamente é uma subseção operacional de G5; absorvido na mesma skill (seção "análise estatística e detecção de viés") | absorvido como seção dentro de `sintese-de-feedback-multi-canal` |
| **G7** | NPS/CSAT modeling + churn prediction + satisfaction correlation | DESCARTADO | **DESCARTADO** | Aletheia não roda em produto vivo (não tem clientes pós-venda nem churn — opera **antes** de haver produto); Pheme/Metis cobrem health-score de cliente; Hestia (squad-semente de suporte) cobre satisfação operacional | escopo errado: NPS/CSAT/churn é métrica de retenção pós-PMF — Aletheia para no PMF. Encaminhado para **roadmap Metis** (instrumentação de North Star + satisfação) quando squad de métricas evoluir | registrar no descartado-com-roadmap; nota em `Aletheia/MEMORY.md` candidatos: "NPS/churn é Metis, não Aletheia" |
| **G8** | RICE prioritization | aletheia + prometeu (cross-link) | **ADAPT** | priorização de hipóteses (Aletheia: qual assunção testar primeiro além do 2x2 importance×evidence) E priorização de feature/story (Prometeu: po Pax já usa MoSCoW; RICE é alternativa) | RICE é frame transversal — em Aletheia, RICE entra como **complemento ao mapa de assunções** (quando o 2x2 empata, RICE quebra empate via Reach×Impact×Confidence/Effort); em Prometeu, RICE entra como técnica do po | skill nova `priorizacao-rice` em `Aletheia/.claude/skills/` (compartilhada) + cross-link em `Prometeu/.claude/skills/` (link para a skill da Aletheia, não duplica) |
| **G9** | User journey mapping com pain points + integração de feedback | aletheia | **ADAPT** | alimenta o **Job Map de Ulwick** (Ulwick mapeia o job em passos; journey mapping mapeia a *experiência de uso* em momentos) — são primos conceituais; journey enriquece o output | sem skill própria de journey em Aletheia hoje; ADAPT preenche lacuna entre Fitzpatrick (entrevista bruta) e Ulwick (job map estruturado) | skill nova `mapeamento-de-jornada-com-pain-points` em `Aletheia/.claude/skills/` (compartilhada; agente-dono lógico: Ulwick) |
| **G10** | Full product lifecycle ownership (discovery-to-launch, outcome-obsessed) | prometeu | **REUSE** | pm (Morgan) já cobre todo o lifecycle de produto: cria epic, gera PRD via `create-doc.md` + `prd-tmpl.md`, conduz spec pipeline (6 fases), orquestra `*execute-epic`, faz handoff para po (validação) e sm (story creation) | sobreposição quase total — pm Morgan = product-manager upstream. Nenhuma skill nova, apenas anexo de princípios outcome-driven no MEMORY do pm | append em `Prometeu/.aiox-core/development/agents/pm/MEMORY.md`: princípios "outcome-obsessed", "discovery-to-launch", "lifecycle ownership" — sem skill nova |
| **G11** | RICE + PRFAQ + pre-mortem + hypothesis-driven | prometeu | **ADAPT** | RICE já está em G8 (Aletheia primary, Prometeu cross-link); PRFAQ (Press Release / FAQ ao estilo Amazon) é técnica NOVA não coberta — força clareza sobre *outcome do cliente* antes de spec; pre-mortem encaixa em qa (Quinn) ou architect (Aria) | PRFAQ vale skill própria; pre-mortem absorvido em `qa-anti-fantasia-com-evidencia-visual` (já existe) como seção "pre-mortem da story"; hypothesis-driven é princípio mãe do AIOX (já existe via Article III Story-Driven) | skill nova `prfaq-amazon-style` em `Prometeu/.claude/skills/` (agente-dono: pm Morgan); pre-mortem absorvido em skill existente como seção; hypothesis-driven REUSE puro (já é princípio AIOX) |
| **G12** | Phased rollout / feature flags / cohort testing / rollback runbooks | prometeu | **REUSE** + anexo | já existe `estrategias-de-deploy-zero-downtime` (criada no B03 — devops Gage) que cobre exatamente phased rollout + feature flags + rollback runbooks; cohort testing/A-B é uma seção a anexar | duplicação total com B03; ADAPT vira nota de cohort testing dentro da skill já criada | append em `Prometeu/.claude/skills/estrategias-de-deploy-zero-downtime/SKILL.md`: seção "cohort testing e A/B na fase de rollout" + cross-link feature-flag-driven |
| **G13** | PRD-driven development (problem statement + acceptance criteria + scope) | prometeu | **REUSE** | pm Morgan já gera PRD via `create-doc.md` + `prd-tmpl.md` (template AIOX nativo); po Pax valida acceptance criteria via checklist de 10 pontos (`validate-next-story.md`) | sobreposição total com fluxo AIOX existente. Princípios upstream (problem statement, scope management, acceptance criteria) já estão *embutidos* no template AIOX | nenhum arquivo novo; append em `Prometeu/.aiox-core/development/agents/pm/MEMORY.md` se houver princípio cristalizado upstream não-coberto (provavelmente não — o template AIOX é mais rigoroso) |
| **G14** | Agile sprint planning + data-driven prioritization at scale | prometeu | **REUSE** | sm River + po Pax cobrem sprint planning (Fase 1-2 do Story Development Cycle) e priorização de backlog (`validate-story-draft`, gestão de backlog em po) | sobreposição direta com sm/po AIOX. "Data-driven" é princípio aspiracional já no pm/po | append em `sm/MEMORY.md` + `po/MEMORY.md`: "capacity planning ao priorizar; usar histórico de velocity" |
| **G15** | MoSCoW + Kano + multi-criteria decision analysis | prometeu | **ADAPT** | po Pax hoje prioriza por backlog/AC, mas não tem MoSCoW/Kano formalizados — skill nova preenche lacuna; MCDA é o frame matemático que escora as duas matrizes | MoSCoW (Must/Should/Could/Won't) e Kano (must-be/performance/excitement) são técnicas amplamente usadas pelo PO/PM real — Pax precisa delas para conversa com stakeholder | skill nova `moscow-kano-mcda` em `Prometeu/.claude/skills/` (agente-dono: po Pax) |
| **G16** | Value vs. Effort matrix (quick wins / strategic bets / resource optimization) | prometeu | **ADAPT** | classificação 2x2 (alto valor/baixo esforço = quick win; alto/alto = strategic bet; baixo/baixo = fill-in; baixo/alto = avoid) — complementa G15 (MoSCoW/Kano) mas é olhar ortogonal | skill útil para po — quando MoSCoW dá tudo "Must", value/effort separa o que entra primeiro | skill nova `matriz-valor-esforco-quick-wins` em `Prometeu/.claude/skills/` (agente-dono: po Pax) |
| **G17** | Velocity prediction + capacity forecasting + trend analysis | prometeu | **REUSE** + anexo | sm River já é responsável por velocity e capacity (sprint planning é função core do scrum master); MEMORY do sm já tem "first implementations need 2-3 revision cycles" (TEST G20 do B03) | sobreposição direta com sm AIOX; ADAPT vira append no MEMORY com técnica de **trend analysis** (rolling average de N sprints + buffer 20-30%) | append em `Prometeu/.aiox-core/development/agents/sm/MEMORY.md`: técnica de velocity rolling average + capacity buffer + alerta de outlier |
| **G18** | Risk probability × impact matrix + contingency planning + escalation triggers | prometeu | **ADAPT** | po Pax + sm River compartilham gestão de risco da story; matriz 5x5 (prob×impacto) + contingência + critério de escalação é skill operacional não-coberta | já existe `slo-error-budget-burn-rate` (B03) para risco de runtime; falta risco *de planejamento* (story/sprint level). Skill complementar, não conflita | skill nova `matriz-de-risco-e-contingencia` em `Prometeu/.claude/skills/` (agente-dono: po+sm compartilhada) |
| **G19** | Market intelligence + emerging trend identification (weak signals + innovation scouting) | aletheia | **ADAPT** | Aletheia hoje só tem Savoia para **sizing** (TAM/SAM/SOM bottom-up e XYZ Hypothesis) — falta a camada de **trend research** que precede o sizing (qual tendência valida que existe demanda emergente?) | skill compartilhada do squad — alimenta Savoia (sizing) e Bland (assumption mapping com base em weak signals) | skill nova `pesquisa-de-tendencia-e-sinais-fracos` em `Aletheia/.claude/skills/` (compartilhada) |
| **G20** | Weak signal detection + early trend ID + pattern recognition + trend lifecycle | aletheia | **ADAPT** | técnica operacional de G19 — anomaly detection + filtragem ruído/sinal + posicionamento do trend no ciclo (emerging/growing/mainstream/declining) | absorvido como seção dentro de G19 (não vale skill própria — sem G19, não tem alvo) | absorvido como seção dentro de `pesquisa-de-tendencia-e-sinais-fracos` |
| **G21** | Technology adoption curve / diffusion modeling (innovators / early-majority / tipping points) | aletheia | **ADAPT** | Aletheia faz a Aposta de Validação no estágio errado se não souber em que ponto da curva está o cliente; ADAPT integra com Bland (assumption mapping deve considerar early-adopter risk diferente do late-majority) | absorvido como seção dentro de G19 ("posicionamento do trend e perfil do early-adopter alvo") | absorvido como seção dentro de `pesquisa-de-tendencia-e-sinais-fracos` |
| **G22** | TAM/SAM/SOM market sizing + segmentação | aletheia | **REUSE** parcial + **ADAPT** | Savoia (Aletheia) já tem **sizing bottom-up pragmático** (skin-in-the-game, XYZ Hypothesis) — e historicamente *rejeita* TAM top-down como "Thoughtland". Mas TAM/SAM/SOM tem valor quando passa para handoff (Pluto/Aglaia precisam dimensionar quanto custa atingir 1% do SAM) — então ADAPT como **skill complementar** que reconhece a tensão | tensão deliberada com Savoia documentada no SKILL: "use SOM para handoff, não para validation; nunca substituir XYZ Hypothesis por TAM" | skill nova `sizing-tam-sam-som-com-ressalva` em `Aletheia/.claude/skills/` (compartilhada; cross-link Savoia + handoff para Pluto/Aglaia) |
| **G23** | Competitive positioning matrix + SWOT + feature gap analysis | aletheia | **ADAPT** | Aletheia tem Blank (market types: existing/new/resegmented) — mas falta o **mapa competitivo operacional** (matriz 2-eixo de posicionamento + SWOT + gap de features). Skill complementa Blank no momento de definir tipo de mercado | absorvido como skill compartilhada Aletheia; cross-link para Argos (competitive intelligence executável) e Pluto (oferta/preço usa o mapa) | skill nova `mapa-competitivo-swot-gap` em `Aletheia/.claude/skills/` (compartilhada; cross-link: Blank, Argos, Pluto) |

---

## 2. Sumário por squad

### 2.1 Aletheia (10 IDs ABSORVIDOS — 9 skills compartilhadas novas)

**IDs absorvidos:** G1, G2 (em G1), G5, G6 (em G5), G8, G9, G19, G20 (em G19), G21 (em G19), G22, G23 — **10 IDs em 7 skills**.

| Skill nova | IDs absorvidos | Tipo | Cross-links |
|---|---|---|---|
| `cadencias-comportamentais-em-validacao` | G1, G2 | ADAPT | desenho-de-experimento (Bland) + roteiro-de-entrevista (Fitzpatrick) |
| `sintese-de-feedback-multi-canal` | G5, G6 | ADAPT | roteiro-de-entrevista (entrada para Fitzpatrick); Pheme (feedback social) e Hestia (tickets de suporte) como fontes |
| `priorizacao-rice` | G8 | ADAPT | mapa-de-assuncoes (complemento ao 2x2); Prometeu po (cross-link) |
| `mapeamento-de-jornada-com-pain-points` | G9 | ADAPT | tony-ulwick (Job Map); Harmonia (UX downstream) |
| `pesquisa-de-tendencia-e-sinais-fracos` | G19, G20, G21 | ADAPT | alberto-savoia (sizing); david-bland (assumption mapping); Argos (competitive intel executável) |
| `sizing-tam-sam-som-com-ressalva` | G22 | ADAPT + REUSE parcial | alberto-savoia (XYZ Hypothesis prevalece); handoff Pluto/Aglaia |
| `mapa-competitivo-swot-gap` | G23 | ADAPT | steve-blank (market type); Argos (intel); Pluto (oferta) |

**Total Aletheia:** 7 skills novas (10 IDs consolidados em 7).

### 2.2 Prometeu (10 IDs ABSORVIDOS — 4 skills novas + 4 REUSE/anexo)

**IDs absorvidos:** G3, G10, G11 (parcial PRFAQ), G12, G13, G14, G15, G16, G17, G18 — **10 IDs**.

| Skill / ação | IDs absorvidos | Tipo | Agente-dono |
|---|---|---|---|
| `micro-sprints-e-decomposicao-de-task` (skill nova) | G3 | ADAPT | sm River (com cross-link dev Dex) |
| `prfaq-amazon-style` (skill nova) | G11 (PRFAQ) | ADAPT | pm Morgan |
| `moscow-kano-mcda` (skill nova) | G15 | ADAPT | po Pax |
| `matriz-valor-esforco-quick-wins` (skill nova) | G16 | ADAPT | po Pax |
| `matriz-de-risco-e-contingencia` (skill nova) | G18 | ADAPT | po + sm compartilhada |
| REUSE puro (G10) | G10 | REUSE | append `pm/MEMORY.md`: outcome-obsessed, lifecycle ownership |
| REUSE puro (G11 pre-mortem + hypothesis-driven) | G11 (parcial) | REUSE | pre-mortem absorvido em `qa-anti-fantasia-com-evidencia-visual` (B03) como seção; hypothesis-driven já é princípio AIOX |
| REUSE + anexo (G12) | G12 | REUSE | append em `estrategias-de-deploy-zero-downtime` (B03): cohort testing + A/B |
| REUSE puro (G13) | G13 | REUSE | append `pm/MEMORY.md` se princípio cristalizado; PRD-driven é o cerne do AIOX (Article III) |
| REUSE puro (G14) | G14 | REUSE | append `sm/MEMORY.md` + `po/MEMORY.md`: capacity planning |
| REUSE + anexo (G17) | G17 | REUSE | append `sm/MEMORY.md`: velocity rolling average + capacity buffer |

**Total Prometeu:** 5 skills novas + 1 append em skill existente do B03 + 5 referências consolidadas em MEMORY.md.

### 2.3 DESCARTADO (2 IDs)

| ID | Capacidade | Razão | Destino |
|---|---|---|---|
| G4 | Gamification + variable-reward loops | capacidade de produto-cliente (vive no projeto Omiron/CataLogo/etc.), não no framework Prometeu nem em Aletheia (que valida, não engaja usuário final) | descarte; sem skill, sem MEMORY |
| G7 | NPS/CSAT/churn prediction | escopo errado: Aletheia para no PMF; NPS/churn é pós-PMF (Metis ou squad de retenção futura) | descarte com roadmap; nota em `Aletheia/MEMORY.md` candidatos: "NPS/churn é Metis, não Aletheia" |

### 2.4 ROADMAP (0 IDs)

Nenhum ID de B04 requer squad/agente novo. G7 tem nota de roadmap mas pertence ao roadmap **existente** do Metis (squad de métricas/instrumentação) — não cria squad-novo.

---

## 3. Reconciliação prevista (invariante)

```
ABSORVIDO  = 21  (Aletheia 10 + Prometeu 10 + G11 contado 1x = 21 únicos sem dupla contagem)
DESCARTADO =  2  (G4, G7)
ROADMAP    =  0
PERDIDO    =  0
TOTAL      = 23  ✓
```

**Validação:** G1-G23 = 23 IDs no inventário; 21 ABSORVIDO + 2 DESCARTADO = 23 ✓ Todo ID upstream tem decisão registrada; nenhuma capacidade some.

**Nota sobre G11:** G11 ("RICE + PRFAQ + pre-mortem + hypothesis-driven") foi desmembrado em 4 sub-capacidades — RICE já está em G8 (Aletheia primary), PRFAQ vira skill nova (Prometeu), pre-mortem absorvido em skill existente do B03, hypothesis-driven é REUSE puro do AIOX. **Contado como 1 ID absorvido (não dividido)** para preservar o invariante; o desmembramento é técnica de implementação, não capacidade nova.

---

## 4. Achados de roteamento (2-3)

1. **Aletheia recebe 7 skills compartilhadas — risco de inchaço.** Aletheia hoje tem 3 skills (`roteiro-de-entrevista`, `mapa-de-assuncoes`, `desenho-de-experimento`) + 1 absorvida do B03 (`otimizacao-de-workflow-lean`) = 4. Pular para 11 skills (4 + 7) requer catálogo organizado por estágio (Descoberta / Validação / Mercado-Demanda / Cross-cutting). A skill `cadencias-comportamentais-em-validacao` e a `sintese-de-feedback-multi-canal` são especialmente importantes para evitar que Aletheia continue "cega" entre o roteiro e o resultado de campo.

2. **REUSE pesado em Prometeu (5 de 10 IDs) confirma força do AIOX nativo.** product-manager (G10), PRD-driven (G13), sprint planning (G14), velocity (G17) e feature flags (G12) já são cobertos por pm/po/sm/devops AIOX. O upstream `product-manager.md` (470 linhas) tem **alta sobreposição** com pm Morgan + po Pax + sm River combinados — confirma que Prometeu é o squad de PM/PO/SM canônico da Kolden e que **não devemos absorver agentes** upstream nesse domínio (apenas técnicas pontuais via skills).

3. **Tensão deliberada: TAM/SAM/SOM vs. XYZ Hypothesis (G22).** Savoia (Aletheia) rejeita TAM top-down como "Thoughtland" — mas downstream (Pluto/Aglaia) precisa de números agregados para construir oferta/preço. A skill `sizing-tam-sam-som-com-ressalva` documenta a tensão explicitamente: TAM/SAM/SOM serve para *handoff*, nunca para *validation primária*. É um caso de ADAPT que precisa marcar o conflito no frontmatter para o squad-orquestrador não usar a skill cedo demais.

---

## 5. Próximo passo

F5 (plano de aplicação detalhado) em [`decisao-f5-b04-product.md`](./decisao-f5-b04-product.md). Aprovação humana exigida antes de qualquer escrita em Aletheia ou Prometeu (Constituição Art. III).
