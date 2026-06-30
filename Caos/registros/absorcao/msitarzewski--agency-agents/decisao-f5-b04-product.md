# F5 — Plano de aplicação · `msitarzewski--agency-agents@a597cb6` — bucket B04 (product)

> **Bucket B04:** Aletheia (squad-alvo de discovery & validation, 10 IDs) + Prometeu (squad AIOX de PM/PO/SM, 10 IDs) + DESCARTADO (2 IDs).
> **Total:** 23 IDs.
> **Status:** PLANO LAVRADO — **aguarda aprovação humana** antes de qualquer escrita em squads-alvo (Constituição Art. III).
> **Origem:** [`mapa-de-decisao-b04-product.md`](./mapa-de-decisao-b04-product.md)

---

## 1. Veredito por squad

### 1.1 Aletheia (10 IDs, principal de discovery)

**Localização:** `C:\Kolden\Aletheia\.claude\skills\` (skills compartilhadas — o squad já trabalha por skills compartilhadas porque o orquestrador roteia para o especialista certo, e a skill amplifica o repertório do especialista).

**Veredito:** Squad **APROVADO para absorção** — 10 IDs distribuídos em **7 skills compartilhadas novas**, todas com cross-link explícito para o(s) especialista(s) primário(s).

**Skills novas a criar (em `Aletheia/.claude/skills/`):**

| Skill | IDs absorvidos | Tipo | Especialista(s) primário(s) | Cross-links externos |
|---|---|---|---|---|
| `cadencias-comportamentais-em-validacao` | G1, G2 | ADAPT | david-bland + rob-fitzpatrick | psicologia comportamental aplicada a participantes (não a usuários finais) |
| `sintese-de-feedback-multi-canal` | G5, G6 | ADAPT | aletheia-chief (orquestrador) | Pheme (social), Hestia (tickets), Argos (intel) — como **fontes** |
| `priorizacao-rice` | G8 | ADAPT | aletheia-chief (compartilhada com mapa-de-assuncoes) | Prometeu po Pax (link, não duplicação) |
| `mapeamento-de-jornada-com-pain-points` | G9 | ADAPT | tony-ulwick | Harmonia (UX downstream) |
| `pesquisa-de-tendencia-e-sinais-fracos` | G19, G20, G21 | ADAPT | alberto-savoia + david-bland | Argos (competitive intel executável) |
| `sizing-tam-sam-som-com-ressalva` | G22 | ADAPT + REUSE parcial | alberto-savoia (XYZ Hypothesis prevalece) | Pluto/Aglaia (handoff) |
| `mapa-competitivo-swot-gap` | G23 | ADAPT | steve-blank (market type) | Argos (intel), Pluto (oferta) |

**Total Aletheia:** **7 skills novas** (10 IDs consolidados em 7 — G2/G6/G20/G21 absorvidos como seções dentro das skills mãe G1/G5/G19).

**Anti-conflito:**
- Aletheia hoje tem 4 skills (`roteiro-de-entrevista`, `mapa-de-assuncoes`, `desenho-de-experimento` + `otimizacao-de-workflow-lean` absorvida no B03).
- Novas 7 skills sobem o total para **11 skills**. Catálogo precisa ser reorganizado por estágio (Descoberta / Validação / Mercado-Demanda / Cross-cutting / Lean) — fica como tarefa em F6.6.
- **Não modificar** os 8 arquivos de agente em `Aletheia/agents/*.md` (Constituição Art. I: PRD = fonte da verdade — agente já lavrado é intocável). Skills são amplificadores externos.

### 1.2 Prometeu (10 IDs, complementar de PM/PO/SM)

**Localização:** `C:\Kolden\Prometeu\.claude\skills\` (skills novas) + `Prometeu\.aiox-core\development\agents\<id>\MEMORY.md` (anexos REUSE).

**Veredito:** Squad **APROVADO para absorção** — 10 IDs distribuídos em **5 skills novas** + **5 anexos REUSE** em MEMORY.md + **1 append** em skill existente do B03.

**Skills novas a criar (em `Prometeu/.claude/skills/`):**

| Skill | IDs absorvidos | Tipo | Agente-dono | Cross-links |
|---|---|---|---|---|
| `micro-sprints-e-decomposicao-de-task` | G3 | ADAPT | sm River (cross-link dev Dex) | Story Development Cycle Fase 3 (dev-develop-story) |
| `prfaq-amazon-style` | G11 (PRFAQ) | ADAPT | pm Morgan | spec pipeline Fase 4 (write spec) — PRFAQ como entrada estilo Amazon |
| `moscow-kano-mcda` | G15 | ADAPT | po Pax | `validate-next-story.md` Fase 2; cross-link Aletheia `priorizacao-rice` |
| `matriz-valor-esforco-quick-wins` | G16 | ADAPT | po Pax | complementa `moscow-kano-mcda` quando MoSCoW empata |
| `matriz-de-risco-e-contingencia` | G18 | ADAPT | po + sm compartilhada | complementa `slo-error-budget-burn-rate` (B03 — risco de runtime); este cobre risco de planejamento |

**Append em skill existente do B03:**

| Skill existente (criada no B03) | IDs anexados | Mudança |
|---|---|---|
| `estrategias-de-deploy-zero-downtime` | G12 | Adiciona seção "cohort testing e A/B na fase de rollout" + cross-link feature-flag-driven |

**Referências consolidadas a MEMORY.md (REUSE puro, sem skill nova):**

| Agente Prometeu | IDs anexados | Conteúdo |
|---|---|---|
| pm (Morgan) | G10, G13 | Princípios "outcome-obsessed", "discovery-to-launch ownership", "PRD-driven é cerne do AIOX (Article III) — incorpora upstream problem statement + scope explicit IN/OUT" |
| po (Pax) | G14 | "Data-driven prioritization at scale: usar histórico de velocity e capacity ao priorizar backlog" |
| sm (River) | G14, G17 | "Capacity planning com rolling average de N sprints + buffer 20-30%; alerta de outlier; trend analysis de velocity" |

**Cross-link com B03 (sem duplicação):**
- G11 pre-mortem → absorvido como **seção** dentro de `Prometeu/.claude/skills/qa-anti-fantasia-com-evidencia-visual/SKILL.md` (skill criada no B03). Texto: "Pre-mortem da story — antes de iniciar dev, qa imagina a story FALHANDO e lista as causas mais prováveis; cada uma vira ponto de atenção no QA Gate."
- G11 hypothesis-driven → REUSE puro. Já é princípio AIOX (Article III: Story-Driven Development). Sem ação.

**Anti-conflito (L1-L4 do AIOX):**
- F6 escreve **apenas** em `Prometeu/.claude/skills/` (NÃO é `.aiox-core/`, é o `.claude/` do projeto AIOX) e em `.aiox-core/development/agents/<id>/MEMORY.md` (L3 mutable — permitido).
- **NÃO modificar:** `.aiox-core/core/` (L1), `.aiox-core/development/tasks/`, `.aiox-core/development/templates/`, `.aiox-core/development/checklists/` (L2 extend-only).
- **NÃO modificar:** os 10 arquivos de agente em `.aiox-core/development/agents/*.md` (bloco YAML autocontido — alteração desencadeia regressões).
- Confirma o padrão B03: **skills NOVAS em `.claude/skills/` são absorvidas; arquivos de agente são INTOCADOS**.

### 1.3 DESCARTADO (2 IDs)

| ID | Capacidade | Razão | Princípio salvo? |
|---|---|---|---|
| G4 | Gamification + variable-reward engagement loop | capacidade de produto-cliente (vive no projeto Omiron/CataLogo/etc.), não no framework Prometeu nem em Aletheia (que valida, não engaja usuário final) | não — é trivial demais e fora de jurisdição |
| G7 | NPS/CSAT modeling + churn prediction + satisfaction correlation | escopo errado: Aletheia para no PMF; NPS/churn é pós-PMF (squad de métricas/retenção); seria invadir Metis quando ele evoluir | sim, como nota em `Aletheia/MEMORY.md` candidatos: "NPS/churn é Metis, não Aletheia — encaminhado para roadmap quando Metis evoluir para instrumentação de North Star" |

### 1.4 ROADMAP (0 IDs)

Nenhum ID requer squad/agente novo. G7 tem nota de roadmap mas pertence ao roadmap **existente** do Metis (squad de métricas/instrumentação) — não cria squad-novo.

---

## 2. Plano de execução F6 (cascata por etapa)

### Pré-requisitos
- Aprovação humana deste F5 (Constituição Art. III).
- Constituição AIOX (`Prometeu/.aiox-core/constitution.md`) respeitada — **sem editar `.aiox-core/core/` ou `.aiox-core/development/agents/*.md`**.
- Caos `dados/repositorios-absorvidos.yaml` lockado (sessão única) — atualização parcial no fim do B04.

### Etapa F6.0 — Setup
1. Verificar que `_staging/quarentena/msitarzewski--agency-agents/` ainda está sob o reflexo `bloqueio-de-quarentena.sh` (nenhuma execução).
2. Confirmar que F2 (auditor-de-seguranca + Égide) deu SAFE para este repo (cabeçalho do inventário).

### Etapa F6.1 — Aletheia (7 skills novas)
Para cada skill da seção 1.1:
1. Criar `Aletheia/.claude/skills/<nome>/SKILL.md` com frontmatter Kolden + descrição que dispara invocação (consultar `descoberta-de-skill` do Caos).
2. Frontmatter precisa marcar:
   - `agente_primario`: o(s) especialista(s) Aletheia que primariamente usam a skill (ex.: `tony-ulwick` para `mapeamento-de-jornada-com-pain-points`).
   - `cross_links`: caminhos para skills/squads relacionados (Argos, Pluto, Pheme, Prometeu).
   - Para `sizing-tam-sam-som-com-ressalva`: declarar explicitamente a **tensão deliberada com Savoia** — "esta skill complementa Savoia para handoff; nunca substituir XYZ Hypothesis por TAM/SAM/SOM em validation".
3. Aplicar herança histórica via `heranca-de-especialista` quando a skill mapear claramente a um especialista canônico:
   - `priorizacao-rice` → Sean McBride / Intercom (criadores do RICE).
   - `mapeamento-de-jornada-com-pain-points` → Don Norman / Kim Goodwin (journey mapping clássico).
   - `pesquisa-de-tendencia-e-sinais-fracos` → Amy Webb (Future Today Institute, weak signal framework).
   - `mapa-competitivo-swot-gap` → Albert Humphrey (SWOT, Stanford SRI).
4. Reorganizar `Aletheia/.claude/skills/catalogo.md` (deve existir após B03) por estágio:
   - **Descoberta:** roteiro-de-entrevista, mapeamento-de-jornada-com-pain-points, sintese-de-feedback-multi-canal
   - **Validação:** mapa-de-assuncoes, desenho-de-experimento, cadencias-comportamentais-em-validacao, priorizacao-rice
   - **Mercado-Demanda:** pesquisa-de-tendencia-e-sinais-fracos, sizing-tam-sam-som-com-ressalva, mapa-competitivo-swot-gap
   - **Cross-cutting:** otimizacao-de-workflow-lean (B03)
5. **Não modificar** os 8 arquivos `Aletheia/agents/*.md`.

**Gate N4 (skills):** todas as 7 skills passam por `validacao-de-skill` (teste A/B + trigger eval + teste de pressão). Maturity ≥7.0. Atenção especial à `sizing-tam-sam-som-com-ressalva` — testar que NÃO dispara quando Savoia está conduzindo validation primária; SÓ dispara em momento de handoff para Pluto/Aglaia.

### Etapa F6.2 — Prometeu (5 skills novas + 1 append em skill do B03)
Para cada skill da seção 1.2:
1. Criar `Prometeu/.claude/skills/<nome>/SKILL.md` com frontmatter Kolden.
2. Frontmatter precisa marcar:
   - `agente_dono`: pm Morgan / po Pax / sm River conforme tabela.
   - `aiox_layer`: `L3 (.claude project config)` — para deixar claro que NÃO é framework core (L1) nem template (L2).
   - `aiox_workflow_integration`: ponto do Story Development Cycle / Spec Pipeline onde a skill é acionada.
3. Append em `Prometeu/.claude/skills/estrategias-de-deploy-zero-downtime/SKILL.md` (criada no B03):
   - Nova seção "## Cohort testing e A/B na fase de rollout" — combina G12 upstream com a infra de feature flags já existente.
   - Cross-link bidirecional documentado.
4. Anexar referências REUSE às MEMORY.md em `.aiox-core/development/agents/<id>/MEMORY.md` (L3 mutable — permitido pelo `.claude/rules/agent-memory-imports.md`):
   - `pm/MEMORY.md`: bloco "Princípios outcome-driven + lifecycle ownership (G10) + PRD-driven embute upstream problem statement (G13)"
   - `po/MEMORY.md`: bloco "Data-driven prioritization at scale: usar histórico de velocity + capacity ao priorizar backlog (G14)"
   - `sm/MEMORY.md`: bloco "Capacity planning: rolling average + buffer 20-30%; alerta de outlier (G17); trend analysis (G14+G17)"
5. Atualizar `Prometeu/.claude/skills/catalogo.md` (existe desde B03):
   - Adicionar as 5 skills novas com agente-dono explícito.
   - Documentar cross-link bidireciona entre `moscow-kano-mcda` (Prometeu/po) e `priorizacao-rice` (Aletheia/squad).

**Gate N4 (skills):** todas as 5 skills passam por `validacao-de-skill`. Maturity ≥7.0. Especial atenção a `prfaq-amazon-style` — testar que dispara no momento certo da spec pipeline (Fase 4: Escrever Spec) e não em qualquer pedido de PRD.

### Etapa F6.3 — Cross-link Aletheia ↔ Prometeu (RICE)
1. Em `Aletheia/.claude/skills/priorizacao-rice/SKILL.md`: bloco "Quando usar fora da Aletheia" com link para `Prometeu/.claude/skills/moscow-kano-mcda/SKILL.md` (RICE como técnica complementar ao MoSCoW).
2. Em `Prometeu/.claude/skills/moscow-kano-mcda/SKILL.md`: bloco "Técnicas complementares" com link para `Aletheia/.claude/skills/priorizacao-rice/SKILL.md`.
3. Confirmar grep-able tags: `[CROSS:Aletheia/skills/priorizacao-rice]` e `[CROSS:Prometeu/skills/moscow-kano-mcda]` — `verificacao-de-alinhamento` valida no SessionStart.

### Etapa F6.4 — Cross-link Aletheia ↔ Caliope/Aglaia/Pluto (handoffs)
1. Em `Aletheia/.claude/skills/sizing-tam-sam-som-com-ressalva/SKILL.md`: seção "Handoff para Pluto e Aglaia" — descreve quando o SOM deve ser entregue como input para oferta/preço (Pluto) e posicionamento/persona (Aglaia).
2. Em `Aletheia/.claude/skills/mapa-competitivo-swot-gap/SKILL.md`: seção "Handoff" + cross-link para Argos (intel executável) e Pluto (oferta).
3. Em `Aletheia/.claude/skills/sintese-de-feedback-multi-canal/SKILL.md`: seção "Fontes externas" + cross-link para Pheme (social), Hestia (tickets), Argos (intel).

### Etapa F6.5 — DESCARTADO (registro)
1. Adicionar bloco `descartados:` ao registro de absorção no `Caos/dados/repositorios-absorvidos.yaml` listando G4 e G7 com motivo curto.
2. Anotar nota de roadmap em `Aletheia/MEMORY.md` (seção "Candidatos a Promoção"): "NPS/CSAT/churn (G7) — não absorver; squad Metis quando evoluir para instrumentação de North Star."
3. **Não criar skill** para G4 e G7 — são triviais demais ou de jurisdição errada.

### Etapa F6.6 — Reorganização do catálogo Aletheia
1. Após F6.1, reorganizar `Aletheia/.claude/skills/catalogo.md` em 4 seções:
   - **Descoberta** (3 skills): roteiro-de-entrevista (existente), mapeamento-de-jornada-com-pain-points (nova), sintese-de-feedback-multi-canal (nova)
   - **Validação** (4 skills): mapa-de-assuncoes (existente), desenho-de-experimento (existente), cadencias-comportamentais-em-validacao (nova), priorizacao-rice (nova)
   - **Mercado-Demanda** (3 skills): pesquisa-de-tendencia-e-sinais-fracos (nova), sizing-tam-sam-som-com-ressalva (nova), mapa-competitivo-swot-gap (nova)
   - **Cross-cutting** (1 skill): otimizacao-de-workflow-lean (B03)
2. Total: **11 skills** organizadas por estágio.

### Etapa F6.7 — Registro consolidado
1. Atualizar `Caos/dados/repositorios-absorvidos.yaml`:
   - Bucket B04 fechado: 21 ABSORVIDO + 2 DESCARTADO + 0 ROADMAP = 23 ✓
   - PERDIDO = 0
   - Skills criadas: 12 (7 Aletheia + 5 Prometeu)
   - Skills atualizadas: 1 (Prometeu `estrategias-de-deploy-zero-downtime` do B03)
   - Referências MEMORY.md atualizadas: 3 (pm, po, sm — Prometeu)
   - Reorganização: catálogo Aletheia em 4 seções
2. Atualizar `Caos/registros/historico.md` com a entrada do bucket B04.
3. Atualizar `Caos/dados/registro-de-entidades.yaml` com as 12 skills novas + procedência (`fonte_upstream: msitarzewski--agency-agents@a597cb6`).

---

## 3. Qualidade (cascata N0→N6)

Aplicada **a cada skill nova** (12 skills: 7 Aletheia + 5 Prometeu):

| Gate | Critério | Aprovação |
|---|---|---|
| N0 Configuração | frontmatter Kolden + idioma PT-BR + kebab-case | revisor |
| N1 Estrutura | descrição que dispara invocação automática + `agente_primario`/`agente_dono` + `cross_links` | revisor + descoberta-de-skill |
| N2 Conteúdo | método operacional, exemplos rodáveis, fonte citada quando aplicável (não cópia literal) | redator-de-prompts |
| N3 Reflexos | nenhuma skill cria reflexo novo (Aletheia e Prometeu já têm os mínimos) | curador |
| N4 Validação | `validacao-de-skill` (A/B + trigger eval + teste de pressão); maturity ≥7.0 | testador |
| N5 Catálogo | catálogo de cada squad atualizado (Aletheia reorganizado em 4 seções; Prometeu com 5 entradas novas) | curador |
| N6 Registro | entrada em `Caos/dados/registro-de-entidades.yaml` com procedência | curador |

**Política de bloqueio:** maturity <7.0 em qualquer skill → BLOCK; refazer ou rebaixar para REUSE/REFERÊNCIA.

---

## 4. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| **Inchaço do catálogo Aletheia (de 4 para 11 skills)** | Reorganização obrigatória em 4 seções por estágio (F6.6); `descoberta-de-skill` aplicada em cada frontmatter para garantir disparo específico — não disparam todas em qualquer pergunta de "validar ideia" |
| **`sizing-tam-sam-som-com-ressalva` dispara em validation primária e contamina Savoia** | Frontmatter explícito: "esta skill NÃO substitui XYZ Hypothesis; dispara APENAS em momento de handoff para Pluto/Aglaia ou quando o squad-orquestrador pede dimensionamento agregado"; teste de pressão no Gate N4 valida que NÃO dispara em conversa de validation |
| **REUSE pesado em Prometeu (G10, G13, G14) vira "nada feito" — sem evidência de absorção** | Cada REUSE puro precisa de **bloco anexado ao MEMORY.md correspondente** (não só nota mental); auditável via grep no MEMORY |
| **G11 desmembrado em 4 sub-capacidades pode ser contado errado** | Mapa F4 deixa explícito: G11 = 1 ID absorvido (não dividido); o desmembramento é técnica de implementação. Validação do invariante: 21 ABSORVIDO + 2 DESCARTADO = 23 |
| **RICE em dois squads (Aletheia G8 + Prometeu po) vira duplicação** | Conteúdo principal vive em `Aletheia/priorizacao-rice`; Prometeu `moscow-kano-mcda` tem link "para RICE, ver Aletheia" — sem duplicação. Cross-link bidirecional documentado em F6.3 |
| **`cadencias-comportamentais-em-validacao` confundida com gamification de produto** | Frontmatter explícito: "psicologia comportamental aplicada a PARTICIPANTES DE VALIDAÇÃO (cadência de entrevistas, follow-up de experimento) — NÃO é gamification de usuário final, que é jurisdição de Harmonia/UX do projeto cliente" |
| **L1-L4 do AIOX: risco de absorção tocar `.aiox-core/`** | F6 escreve em `Prometeu/.claude/skills/` (não em `.aiox-core/`) e em `.aiox-core/development/agents/<id>/MEMORY.md` (L3 mutable); checklist pré-merge confirma `git diff` não toca `.aiox-core/core/` (L1) nem `.aiox-core/development/tasks/` (L2) |

---

## 5. Checklist de aprovação (gate Art. III)

Para o Ronan aprovar antes da F6:

- [ ] **Roteamento de squad** (Aletheia 10 IDs / Prometeu 10 IDs / DESCARTADO 2) faz sentido?
- [ ] **G4 (gamification) e G7 (NPS/churn) DESCARTADOS** — algum deveria virar skill em outro squad (ex.: G4 em Harmonia, G7 em Metis-futuro)? Decisão: por ora, manter descartado; G7 já tem nota de roadmap para Metis.
- [ ] **7 skills compartilhadas em Aletheia** (de 4 para 11 totais) é excesso? Posso consolidar mais? (Ex.: fundir `mapa-competitivo-swot-gap` com `pesquisa-de-tendencia-e-sinais-fracos` numa skill maior de "inteligência de mercado".)
- [ ] **Tensão TAM/SAM/SOM vs. XYZ Hypothesis** (G22) — a ressalva explícita no frontmatter é suficiente, ou prefere que `sizing-tam-sam-som-com-ressalva` seja **rejeitada** (DESCARTADO) para manter a coerência radical do Savoia?
- [ ] **REUSE puro em Prometeu (G10, G13, G14)** — confirma que basta anexar em MEMORY.md (sem skill nova)?
- [ ] **PRFAQ como skill nova em Prometeu** (G11) — vale absorver, ou é over-engineering para o tamanho dos projetos AIOX que o Prometeu construirá (Omiron, CataLogo etc.)?
- [ ] **Não vou tocar nos 8 arquivos `Aletheia/agents/*.md` nem nos 10 arquivos `Prometeu/.aiox-core/development/agents/*.md`** — confirmação que é o comportamento desejado (skills externas em `.claude/skills/` + anexos em MEMORY.md é o caminho)?
- [ ] **Reorganização do catálogo Aletheia** em 4 seções (Descoberta/Validação/Mercado-Demanda/Cross-cutting) — aprovado?

---

## 6. Próximos passos

1. **Aprovação humana** deste F5 (Constituição Art. III).
2. Em seguida, F6.0 a F6.7 conforme seção 2.
3. Maturity score geral do bucket B04 alvo: **≥7.5** (squads centrais; Aletheia é entrada do funil de criação, Prometeu é PM/PO/SM canônico — exige rigor).
4. Registro fechado em `Caos/dados/repositorios-absorvidos.yaml` com B04 marcado `status: APLICADO`.

---

## 7. Conferência do invariante

```
ABSORVIDO  = 21
  - Aletheia 10 IDs em 7 skills:
    · G1+G2 → cadencias-comportamentais-em-validacao
    · G5+G6 → sintese-de-feedback-multi-canal
    · G8 → priorizacao-rice
    · G9 → mapeamento-de-jornada-com-pain-points
    · G19+G20+G21 → pesquisa-de-tendencia-e-sinais-fracos
    · G22 → sizing-tam-sam-som-com-ressalva
    · G23 → mapa-competitivo-swot-gap
  - Prometeu 10 IDs em 5 skills + 1 append B03 + 5 anexos MEMORY:
    · G3 → micro-sprints-e-decomposicao-de-task (skill nova)
    · G10 → anexo pm/MEMORY.md (REUSE)
    · G11 → prfaq-amazon-style (skill nova) + pre-mortem em qa-anti-fantasia (B03) + hypothesis-driven REUSE (princípio AIOX)
    · G12 → append em estrategias-de-deploy-zero-downtime (B03)
    · G13 → anexo pm/MEMORY.md (REUSE)
    · G14 → anexo po/MEMORY.md + sm/MEMORY.md (REUSE)
    · G15 → moscow-kano-mcda (skill nova)
    · G16 → matriz-valor-esforco-quick-wins (skill nova)
    · G17 → anexo sm/MEMORY.md (REUSE)
    · G18 → matriz-de-risco-e-contingencia (skill nova)

DESCARTADO =  2  (G4 gamification, G7 NPS/churn)
ROADMAP    =  0
PERDIDO    =  0
TOTAL      = 21 + 2 + 0 = 23 ✓
```

**Validação:** todo ID upstream (G1-G23) tem decisão registrada; nenhuma capacidade some. PERDIDO=0 conforme `protocolo-de-absorcao-sem-perda`.
