---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F5 — Decisão e plano de aplicação · B15 Specialized sub-roteado

> Repo: `msitarzewski/agency-agents@a597cb6` — divisão `specialized/`.
> Insumo: `mapa-de-decisao-b15-specialized.md` (F4).
> Invariante anti-perda: **`1 REUSE + 38 ADAPT + 21 DESCARTADO + 12 ROADMAP == 72` ✓ `PERDIDO == 0`**.

## Resumo executivo

O B15 é o **maior catch-all** do lote (53 agentes upstream, 72 IDs) e o que mais exige decisão caso-a-caso. Depois de sub-rotear o `outros` (26 IDs) individualmente e tratar ROADMAP como DESCARTADO legítimo:

- **39 IDs viram capacidade ativa na Kolden** (1 REUSE + 38 ADAPT) — distribuídos em **9 squads existentes**.
- **21 IDs são descartados por fora-de-escopo, ultra-nicho regional ou overlap** — registrados com motivo explícito.
- **12 IDs entram em ROADMAP** com prazo nominal R3/R4 e destino futuro recomendado.
- **Nenhum squad novo é criado neste bucket** — todo o ROADMAP é diferido para gates futuros.

O maior beneficiário do B15 é o **Olimpo** (9 skills novas distribuídas entre Zeus/Plutos/Poseidon), seguido por **Hestia** (5 skills + 1 REUSE) e **Dedalo** (4 skills + 1 MCP). É o bucket que **completa as lacunas estratégicas e operacionais** dos squads-âncora já existentes — sem inflar a frota.

## Plano por squad-alvo

### Pactolo — frente operacional de AP (2 IDs)

| Habilidade | Tipo | Dono | IDs | Notas |
|---|---|---|---|---|
| `processamento-de-contas-a-pagar` | NOVA | controller | G1, G2 | Idempotência + audit-trail + vendor mgmt. Sub-bloco `roteamento-multi-rail-pagamentos` com adaptação BR (PIX/TED/boleto + cripto opcional). |

**Esforço:** 1 skill nova com 2 sub-blocos; 1-2 sessões de F6.

### Olimpo — reforço estratégico massivo (9 IDs ADAPT)

#### Zeus (CEO)

| Habilidade | Tipo | IDs | Notas |
|---|---|---|---|
| `estrategia-de-entrada-e-posicionamento` | NOVA | G10, G11 | Frameworks 3Cs, Porter, Wardley — onde-competir/como-vencer. |
| `chief-of-staff-filtragem-e-escalonamento` | NOVA | G55, G56 | Matriz Escalate/Handle/Park por impacto no principal. Capacidade meta usada pelo Zeus em todos os ciclos. |
| `programa-esg-corporativo` | NOVA (cross-Plutos) | G22, G23 | Materialidade + multi-framework (GRI/SASB/TCFD/ISSB) + anti-greenwashing. |
| `integracao-pos-fusao-pmi` | NOVA (cross-Plutos) | G41, G42 | Day-1, 100-day plan, synergy tracker, TSA, workstream cross-funcional. |

#### Plutos (CFO)

| Habilidade | Tipo | IDs | Notas |
|---|---|---|---|
| `alocacao-de-capital` | NOVA | G14 (parte) | CFO estratégico: alocação, treasury, board. |
| `investor-relations` | NOVA | G14 (parte) | IR + comunicação com board. |
| `analise-de-pricing-wtp` | NOVA | G65 | Market research + custo + willingness-to-pay. Handoff Argos para market-data. |

#### Poseidon (COO)

| Habilidade | Tipo | IDs | Notas |
|---|---|---|---|
| `operacoes-lean-six-sigma` | NOVA | G45, G46 | Lean + Six-Sigma + process-mapping + waste/variation removal. |
| `estrategia-de-supply-chain` | NOVA | G70 | Sourcing genérico (sem vendor-lock China) + QC + ERP. |

**Esforço Olimpo:** 9 skills novas distribuídas entre 3 deuses. **Gate crítico:** cada skill precisa ter dono nominal no `roster:` do `zeus.md`/`plutos.md`/`poseidon.md` (gate 5.2/5.3 da cascata) — risco de skill órfã é alto pelo volume.

### Hestia — 4 skills novas + 1 REUSE + 1 reforço (7 IDs)

| Habilidade | Tipo | Dono | IDs | Notas |
|---|---|---|---|---|
| (existente) `onboarding-estruturado` | REUSE comparativo | especialista-de-onboarding | G30 | Comparar profundidade upstream vs Hestia. Se upstream traz padrão extra (ex: checklist de acessos, métrica de tempo-de-produtividade), incorporar como nota — sem reescrever. |
| `gestao-de-mudanca-organizacional` | NOVA | business-partner-rh | G12, G13 | ADKAR + Kotter + Prosci. Aplicado em transformações (ERP, M&A, cultura). |
| `design-de-treinamento-corporativo` | NOVA | business-partner-rh | G15 | Kirkpatrick L3 (comportamento). T&D blended. |
| `psicologia-organizacional-evidence-based` | EXTENSÃO | analista-de-cultura | G47 | Edmondson (psych-safety) + Maslach (burnout). Reforça frente de cultura. |
| `recrutamento-full-cycle-com-assessment-estruturado` | EXTENSÃO | recrutador-e-selecao | G50 | Full-cycle + entrevista por competência + assessment. Sem vendor-lock China. |

**Esforço:** 3 skills novas + 2 extensões de skills existentes + 1 REUSE comparativo. **Gate crítico:** Hestia é squad-semente com PRD pendente. F6 deve registrar essas skills mas **não fechar o squad como "refinado"** — refino completo continua sendo trabalho do Ritual do Caos.

### Themis — DPO/LGPD + revisão de contrato (4 IDs)

| Habilidade | Tipo | Dono | IDs | Notas |
|---|---|---|---|---|
| `dpo-lgpd-conformidade` | NOVA (transversal) | board-chair (cross-squad) | G20, G21 | DPO operacional adaptado à LGPD. Sub-bloco `mapa-de-dados-e-rmt` (Registro de Atividades de Tratamento, ≈ Art.30 GDPR / Art.37 LGPD) + consent mgmt + breach response. |
| `revisao-de-contrato-redline` | NOVA (transversal) | board-chair (cross-squad) | G37, G38 | Foco no consumidor (empresa que ASSINA contrato), não no escritório. Sub-bloco `comparacao-versao-a-versao-e-risk-flag`. |

**Gate crítico:** Themis é conselho estratégico (Dalio, Munger, Sivers, etc.) — adicionar habilidades operacionais (DPO, contract-review) merece **nota no README do Themis** de que essas duas skills são "operacionais transversais sob a chancela do conselho", não conselheiros adicionais. Não criar persona nova (não há `dpo` ou `lawyer` no Themis upstream).

### Dedalo — 4 skills + 1 MCP (5 IDs)

| Habilidade/MCP | Tipo | Dono | IDs | Notas |
|---|---|---|---|---|
| `governanca-de-automacao` | NOVA (skill) | mcp-integrator (Piper) | G8, G9 | n8n-first + framework "automatizar ou não" (matriz valor × risco × manutenibilidade + ownership). |
| `engenharia-de-lsp-e-indexacao-semantica` | NOVA (skill) | skill-craftsman (Anvil) | G40 | LSP + semantic-index polyglot + code-graph. Acoplado ao MCP-builder. |
| `mcp-document-generator` | NOVA (MCP próprio) | mcp-integrator (Piper) + skill-craftsman (Anvil) | G60 | MCP transversal: PDF/PPTX/DOCX/XLSX programático. Consumido por todos os squads. **Aciona a habilidade `criacao-de-mcp` do Caos** (cascata 5.4) — gate Infisical + REUSE check + pt-BR. |
| `desenho-de-workflow-tree` | NOVA (skill) | skill-craftsman (Anvil) | G68 | Happy path + branches + falhas + recovery + handoff + estados. Build-spec executável. |

**Gate crítico:** o MCP `mcp-document-generator` exige rodar a habilidade `criacao-de-mcp` (Constituição Art. IV — sem invenção; Art. VII — Infisical). Não é skill comum; é entrega de software. **Não inflar F6 com isso** — registrar como item separado a ser construído via `/caos` em sessão dedicada (ordem similar ao MCP `vscode-coach` aprovado em 2026-06-28).

### Metis — analytics e model-QA (4 IDs)

| Habilidade | Tipo | IDs | Notas |
|---|---|---|---|
| `consolidacao-de-dados-de-vendas` | NOVA | G19, G51, G53 | Dashboard live + distribuição automatizada + extração Excel (MTD/YTD/YE). 3 IDs fundidos numa skill com 3 sub-blocos. |
| `qa-independente-de-modelos-ml` | NOVA | G64 | Replicação + calibração + interpretabilidade. Handoff Prometeu para modelos de produto. |

**Esforço:** 2 skills novas. **Gate crítico:** confirmar que Metis tem squad/raiz consolidada antes de aplicar (Metis aparece como referência em handoffs Hestia/Pactolo mas não foi inspecionado neste F4 — F6 deve verificar `C:\Kolden\Metis\` existe e tem `agents/`).

### Liceu — Zettelkasten + persona-switch (2 IDs)

| Habilidade | Tipo | IDs | Notas |
|---|---|---|---|
| `zettelkasten-steward` | NOVA | (Liceu chief) | G71, G72 | Notas atômicas + conectividade + persona-switch (Luhmann padrão; Feynman/Munger/Ogilvy). 2 IDs fundidos numa skill com 2 sub-blocos. |

> **Atenção:** Liceu é objeto do bucket B11 dedicado. Aqui registramos apenas a sobreposição — o detalhe entra em B11.

### Emporos — sales outreach B2B (1 ID)

| Habilidade | Tipo | IDs | Notas |
|---|---|---|---|
| `sales-outreach-b2b-consultivo` | NOVA | G54 | Prospecting + follow-up + objection-handling + pipeline. |

> **Atenção:** Emporos é objeto do bucket B06 dedicado. Aqui registramos apenas a sobreposição — o detalhe entra em B06.

### Caliope/Aglaia — habilidades transversais (2 IDs)

| Habilidade | Tipo | Donos | IDs | Notas |
|---|---|---|---|---|
| `inteligencia-cultural-e-inclusao` | NOVA (transversal) | Caliope + Aglaia | G58 | CQ + i18n + inclusion-by-design. Consumida por copy multi-cultura e branding inclusivo. |
| `developer-advocacy-conteudo-tecnico` | NOVA | Caliope | G59 | DevRel + conteúdo técnico + DX + adoção. Frente potencial para Kolden (Caos/Hermes/squads como "produto" técnico). |

> **Atenção:** Caliope+Pheme+Peitho é objeto do bucket B02 dedicado. Aqui registramos a sobreposição.

## Plano de execução (ordem topológica F6)

A ordem abaixo respeita dependências (squads-semente refinados primeiro, transversais depois, MCP por último em sessão dedicada):

1. **Pactolo** (1 skill com 2 sub-blocos) — semente, tem PRD pendente; aplicar como **nota no catálogo de skills** sem fechar refino.
2. **Hestia** (5 IDs em 3 skills novas + 1 REUSE + 2 extensões) — mesma observação de Pactolo.
3. **Themis** (2 skills transversais) — com nota explícita no README.
4. **Dedalo** (3 skills + 1 nota de MCP a construir em sessão dedicada).
5. **Olimpo** (9 skills distribuídas entre Zeus/Plutos/Poseidon) — gate crítico de `roster:` em cada agente.
6. **Metis** (2 skills) — após verificar existência do squad.
7. **Sobreposições para outros buckets:**
   - **Liceu** (G71, G72) → registrar no plano F4/F5 do B11.
   - **Emporos** (G54) → registrar no plano F4/F5 do B06.
   - **Caliope/Aglaia** (G58, G59) → registrar no plano F4/F5 do B02.
8. **ROADMAP** (12 IDs) — escrever no `roadmap-de-squads-e-skills.md` global do Caos (se não existir, criar) com IDs nominais e prazos R3/R4.
9. **MCP `mcp-document-generator`** (G60) — abrir sessão `/caos` dedicada quando o Ronan priorizar (similar ao vscode-coach).

## Gates obrigatórios na F6

- **Anti-perda** (Constituição F6.5): `1 + 38 + 21 + 12 == 72`. Nenhum ID pode sumir do registro de absorção. Cada DESCARTADO carrega motivo; cada ROADMAP carrega prazo nominal + destino.
- **REUSE > ADAPT > CREATE** (Art. VI): toda skill nova precisa ter justificativa de "por que não estende uma existente" (especialmente em Olimpo/Hestia/Dedalo, que têm catálogo rico).
- **`roster:` declarado** (gate 5.2): cada nova skill precisa estar listada no `roster:` do agente dono — risco de skill órfã é maior em Olimpo (9 skills) e Hestia (5 IDs distribuídos).
- **Procedência no registro** (`dados/repositorios-absorvidos.yaml`): cada skill nova registra origem `msitarzewski/agency-agents@a597cb6 :: specialized/<arquivo>.md` (rastro inviolável).
- **PRD não inflado**: skills derivadas neste bucket são **complementares**, não alteram identidade nuclear dos squads — Hestia continua sendo people, Olimpo continua sendo executivo, Dedalo continua sendo Claude Code. F6 vigia para que isso não vire "expansão de escopo silenciosa".

## Achados de F4/F5 (3 destaques)

1. **O catch-all "outros" (26 IDs) não é catch-all real.** Quando sub-roteado caso-a-caso, ele se distribui em 6 squads + 5 ROADMAPs sem perda. O rótulo "outros" da F3 era preguiça de catalogação, não ausência de destino — o trabalho de F4 foi materializar o que já estava implícito.

2. **ROADMAP é uma categoria limpa, não escape.** Os 12 IDs ROADMAP têm três famílias claras: (a) **agentic-identity** (5 IDs — capacidade real, mas exige PRD próprio e infra A2A); (b) **Customer Operations** (4 IDs — squad novo `Iris/Eos` quando carteira justificar); (c) **healthcare/hospitality/grant** (3 IDs — verticais sem demanda). Todos têm prazo nominal e destino futuro recomendado. Anti-perda preservado.

3. **Olimpo é o maior beneficiário do B15** (9 skills novas) e o de maior risco de inflação. Trade-off explícito: o B15 entrega ao Olimpo uma massa densa de habilidades estratégicas (entry/positioning, ESG, PMI, capital allocation, IR, pricing, Lean/Six-Sigma, supply-chain, Chief-of-Staff). É material diretamente acoplado aos cargos executivos — não é gold-plating. Mas exige rigor de `roster:` na F6 para que não vire CLAUDE.md inchado. Recomendação: **na F6 do Olimpo, abrir uma seção "habilidades absorvidas do B15"** em cada CLAUDE.md de deus, agrupando para leitura, em vez de mesclar com habilidades anteriores.
