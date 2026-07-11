---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/emendas-liceu|emendas-liceu]]"
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/proposta-dike-instanciacao|proposta-dike-instanciacao]]"
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/relatorio-de-consolidacao|relatorio-de-consolidacao]]"
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/sumario-executivo|sumario-executivo]]"
---

# Diff — `C:\Kolden\AGENTS.md` (proposta, NÃO aplicada)

> **Contrato:** `m-20260706-metodo-kolden` · Sub-onda 1.6 — diff cirúrgico proposto ao AGENTS.md raiz Kolden
> **Autor:** `caos-chief` (raiz Kolden) — 0/3 fan-out
> **Estado:** PROPOSTA. NÃO aplicado em disco. Aguarda gate humano.
> **Data:** 2026-07-06
> **Escopo:** acréscimo cirúrgico de nota canônica apontando METODO-KOLDEN.md como fonte + entrada para Dike (condicional à Opção A/B/C escolhida no gate).

---

## §1 — Filosofia da reescrita

O AGENTS.md é o entrypoint do workspace. Sua função:
- Índice de squads + contagens vivas.
- Fronteira Caos × Prometeu/AIOX × Hermes.
- Regras de ouro (PT-BR, Infisical, etc.).

**Sub-onda 1.6 NÃO reescreve o AGENTS.md** — apenas:
1. Acrescenta **1 seção nova** (`## O Método Kolden`) apontando para METODO-KOLDEN.md.
2. **Condicional** (só se Opção A do gate Dike for aprovada): atualiza a linha 12 (contagem de squads e agentes) + linha 15 (nota sobre Dike sem arquivo próprio) + acrescenta seção `Dike/` na lista de squads.
3. Preserva tudo o mais (regras de ouro, histórico de campanhas, mapa de squads existente).

**Não-mudanças declaradas:**
- Não tocamos "Números do workspace" além do bump condicional de Dike.
- Não tocamos "Sistema hierárquico de agentes (5 camadas)" — o METODO-KOLDEN.md o consolida sem substituir aqui.
- Não tocamos "Mapa do workspace" — a estrutura de pastas continua a mesma.
- Não tocamos "Campanha F6 EXAUSTIVA" (histórico de absorção).

---

## §2 — Mudança #1: nova seção `## O Método Kolden`

**Onde inserir:** logo após a seção `## O que é a Kolden` (linhas 8-9 do AGENTS.md atual), ANTES de `## Números do workspace` (linha 11).

**Bloco proposto (novo — 20 linhas):**

```markdown
## O Método Kolden

**Fonte-de-verdade:** `C:\Kolden\METODO-KOLDEN.md` (v1.0, ratificado 2026-07-06).

Todo agente Kolden nasce, opera e é verificado sob a norma canônica do **Método
Kolden v1.0** — a consolidação em documento único de (a) framework `arquitetura-de-agents-kolden`
do Liceu (12 princípios + 5 camadas + 8 critérios canônicos — Fase 1 do Contrato
`m-20260704`); (b) os 14 modelos do Caos; (c) esta hierarquia de 5 camadas; (d) as
convenções PT-BR + kebab-case + mitologia grega + REUSE > ADAPT > CREATE; (e) a
convenção `@` (dispatch cross-squad) vs `/` (skill invocation local); (f) os 5
buckets de capacidade Kolden.

**Onde procurar antes de agir:**

- Padronização de squad → `METODO-KOLDEN.md §8` (rito das 9 fases).
- Convenção `@` vs `/` → `METODO-KOLDEN.md §6` (fonte-de-verdade centralizada — arquivos
  antigos apontam aqui).
- 8 critérios canônicos por agent (constituição/ASL/uncertainty/off-switch/interpretabilidade/
  orthogonality/grounding/predictions) → `METODO-KOLDEN.md §4`.
- 12 princípios canônicos + procedência (Turing/Simon/Minsky/Karpathy/Russell/Bostrom/
  Brooks/Bai-Amodei/Anthropic RSP/Yao ReAct/LangGraph/Anthropic MCP) → `METODO-KOLDEN.md §2` + `§11`.
- Papel do Dike (verificação independente) → `METODO-KOLDEN.md §9`.

**Skills globais para invocar:**
- `/metodo` — para consultar o Método sem executá-lo.
- `/padronizar <Squad>` — para rodar o rito de padronização (Ondas 2-26).

**Constituição do Caos v2.5.0** é a materialização por-artigo do Método (Arts. I-X);
em conflito, a Constituição vence dentro do Caos e o METODO é a fonte para o
ecossistema todo.
```

**Procedência:** norma canônica Kolden — Sub-onda 1.6 do Contrato-mãe `m-20260706-metodo-kolden`. Autoriza-se aplicação por decisão do gate humano.

---

## §3 — Mudança #2 (CONDICIONAL — só se Opção A do gate Dike for aprovada)

Se a Opção A (`C:\Kolden\Dike\` squad-solo) for a decisão do gate humano em Q2 do sumário executivo, as mudanças abaixo entram. Se Opção B ou C, mudanças diferentes serão detalhadas em `proposta-dike-instanciacao.md` §Opção correspondente.

### §3.1 — Atualizar linha 12 (contagem de squads e agentes)

**Bloco atual (linha 12):**

```markdown
- **23 squads** de agentes (nomes da mitologia grega) — **240 agentes** nas pastas `agents/` (inclui os 6 squads-semente novos: +30; consolidação Caliope×copy-master: +10; **campanha 2026-07-02: Themis +1 (analista-de-compliance-regulatorio) + Emporos +4 (gestor-de-contas-estrategicas, coach-de-discovery, engenheiro-de-pre-vendas, analista-de-pipeline)**).
```

**Bloco proposto:**

```markdown
- **24 squads** de agentes (nomes da mitologia grega) — **241 agentes** nas pastas `agents/` (inclui os 6 squads-semente novos: +30; consolidação Caliope×copy-master: +10; **campanha 2026-07-02: Themis +1 (analista-de-compliance-regulatorio) + Emporos +4 (gestor-de-contas-estrategicas, coach-de-discovery, engenheiro-de-pre-vendas, analista-de-pipeline)**; **Dike +1 (nascida na Onda 1 do Método Kolden — verificador independente TPND=0; ver METODO-KOLDEN.md §9)**).
```

**Procedência:** Sub-onda 1.6 (esta) — Opção A do gate Dike.

### §3.2 — Atualizar linha 15 (nota sobre Dike)

**Bloco atual (linha 15):**

```markdown
- **Total**: **261 agentes** (240 em 23 squads + 12 Prometeu + 9 Caos) — contagem verificada arquivo-a-arquivo em 2026-07-02 (pós-campanha F6 exaustiva). A **Dike** (verificador da subida) é um papel **sem arquivo de agente próprio** (`Dike/` tem PRD/CLAUDE/memória, mas não `agents/*.md`), por isso **não entra na contagem**.
```

**Bloco proposto:**

```markdown
- **Total**: **262 agentes** (241 em 24 squads + 12 Prometeu + 9 Caos) — contagem verificada arquivo-a-arquivo em 2026-07-06 (pós-Sub-onda 1.6 do Método Kolden). A **Dike** (verificador da subida) agora existe como **agent funcional independente** em `C:\Kolden\Dike\agents\dike-chief.md` (nascida pelo Ritual do Caos conforme METODO-KOLDEN.md v1.0). Padroniza-se pelo próprio Método na Onda 4 (Grupo B — Governance) das 26 Ondas.
```

**Procedência:** Sub-onda 1.6 (esta) — Opção A do gate Dike.

### §3.3 — Acrescentar Dike na lista de squads

**Onde inserir:** dentro da seção `### 🧭 Estratégia & Negócios` (após Themis) ou como nova seção `### ⚖️ Governança & Verificação` (após Themis, antes de Metis).

**Bloco proposto (novo — 8 linhas):**

```markdown
### ⚖️ Governança & Verificação

**Dike/** — Verificação independente TPND=0 (1 agente, solo tier-0). **A deusa da Justiça, filha de Thémis e Zeus, membro dos Horai**: reconcilia toda entrega contra o lacre sha256 da intenção original antes da subida ao Ronan. Executa CAOS-CL-002 (checklist canônico dos 8 gates — G1 constituição · G2 ASL · G3 uncertainty · G4 off-switch · G5 interpretabilidade · G6 orthogonality+instrumental · G7 grounding · G8 predictions). Verificação por evidência textual verbatim; TPND=0 é gate hard; overrides do Ronan são sempre honrados. Nascida na Sub-onda 1.6 do Contrato-mãe `m-20260706-metodo-kolden` conforme METODO-KOLDEN.md v1.0. Invocação canônica: `@dike`. → `Dike/README.md`
- `dike-chief` — Verificador independente das Ondas 2-26 do Método Kolden + reconciliação TPND=0 na subida do Contrato de Missão.
```

**Procedência:** Sub-onda 1.6 (esta) + mitologia grega (Dike Δίκη).

---

## §4 — Mudanças (CONDICIONAIS — Opção B do gate Dike)

Se Opção B (`C:\Kolden\Themis\agents\dike.md`) for a decisão do gate:

### §4.1 — Atualizar linha 12 (contagem)

**Bloco atual:** `23 squads` · `240 agentes`.

**Bloco proposto:** `23 squads` · `241 agentes` (Themis passa de 12 → 13).

### §4.2 — Atualizar linha 15 (nota sobre Dike)

**Bloco proposto:**

```markdown
- **Total**: **262 agentes** (241 em 23 squads + 12 Prometeu + 9 Caos) — contagem verificada arquivo-a-arquivo em 2026-07-06. **Dike** vive como agent funcional em `C:\Kolden\Themis\agents\dike.md` (2ª operacional transversal do Themis, após `analista-de-compliance-regulatorio`) — verificação independente TPND=0 conforme METODO-KOLDEN.md §9. Invocação: `@dike` (alias) ou `@Themis:dike`.
```

### §4.3 — Atualizar bloco Themis (na lista de squads)

Acrescentar linha após `analista-de-compliance-regulatorio` no bullet-list dos agentes do Themis.

**Bloco proposto:**

```markdown
- `dike` — **[novo Sub-onda 1.6]** Verificação independente TPND=0 conforme METODO-KOLDEN.md §9. Executa CAOS-CL-002 (8 gates canônicos) por evidência textual verbatim; reconcilia entrega contra lacre sha256 do Contrato de Missão. 2ª operacional transversal do Themis (após compliance).
```

Ajustar contagem Themis: "12 agentes" → "13 agentes".

---

## §5 — Mudanças (CONDICIONAIS — Opção C do gate Dike)

Se Opção C (`C:\Kolden\Caos\agents\dike.md`) for a decisão do gate:

### §5.1 — Atualizar linha 12 (contagem)

Sem mudança na contagem de squads. Sem mudança na contagem de agentes principais (Dike é especialista tier-1 do Caos, não conta como agent-Kolden principal na linha 12; entra na linha 367 dos "9 especialistas internos" que passa a "10").

### §5.2 — Atualizar linha 15 (nota sobre Dike)

**Bloco proposto:**

```markdown
- **Total**: **261 agentes** (240 em 23 squads + 12 Prometeu + 10 Caos — Caos +1 com Dike). **Dike** vive como **10º especialista interno do Caos** em `C:\Kolden\Caos\.claude\agents\dike.md` — verificação independente TPND=0 conforme METODO-KOLDEN.md §9 + reconciliação contra CAOS-CL-002. Invocação: `@Caos:dike` ou via `/padronizar` (Passo 6).
```

### §5.3 — Atualizar linha 367 (contagem de especialistas do Caos)

**Bloco atual:**
```markdown
### Caos/ — fábrica de agentes (9 especialistas internos + 13 skills)
```

**Bloco proposto:**
```markdown
### Caos/ — fábrica de agentes (10 especialistas internos + 13 skills)
```

### §5.4 — Acrescentar Dike na lista de especialistas do Caos

Após `vigia` (linha 377), acrescentar:

```markdown
- `dike` — **[novo Sub-onda 1.6]** Verificação independente TPND=0 (CAOS-CL-002) conforme METODO-KOLDEN.md §9. Executa por evidência textual verbatim; reconcilia entrega contra lacre sha256 do Contrato de Missão. Independência estrutural PARCIAL (subordinada ao caos-chief) — declaração explícita em METODO §9.
```

---

## §6 — Auto-verificação (aplicável a qualquer opção)

- [x] Mudança #1 (nova seção `## O Método Kolden`) é INDEPENDENTE da decisão do gate Dike — aplicável em qualquer cenário.
- [x] Mudança #2 (Dike) é CONDICIONAL às Opções A/B/C — só uma versão será aplicada.
- [x] Preservação: 100% do restante do AGENTS.md (mapa de squads, campanhas, regras de ouro, ritual de encerramento) — intocado.
- [x] Procedência: cada bloco cita origem (Sub-onda 1.6 + gate humano + mitologia grega para Dike).
- [x] Reversibilidade: aplicação por diff cirúrgico (edit por bloco); reversão trivial se necessário.

---

## §7 — Aplicação recomendada

Dois momentos separados:

1. **Aplicar mudança #1 imediatamente após gate humano da Sub-onda 1.6** (aprovação do METODO-KOLDEN.md v1.0). Independente da decisão Dike.
2. **Aplicar mudança #2 correspondente à opção escolhida** somente após o gate humano da Sub-onda 1.6 escolher Opção A/B/C. Se Ronan preferir postergar Dike, mudança #2 fica em standby.

---

*Diff proposto pelo `caos-chief` na Sub-onda 1.6. Nada aplicado no AGENTS.md ainda. Aguarda gate humano.*
