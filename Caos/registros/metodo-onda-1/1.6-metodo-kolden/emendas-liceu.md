---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/diff-agents-md|diff-agents-md]]"
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/proposta-dike-instanciacao|proposta-dike-instanciacao]]"
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/relatorio-de-consolidacao|relatorio-de-consolidacao]]"
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/sumario-executivo|sumario-executivo]]"
---

# Emendas propostas ao framework `arquitetura-de-agents-kolden` do Liceu

> **Contrato:** `m-20260706-metodo-kolden` · Sub-onda 1.6 — 2 emendas propostas (NÃO aplicadas)
> **Autor:** `caos-chief` (raiz Kolden) — 0/3 fan-out
> **Estado:** PROPOSTAS. NÃO aplicadas em `Liceu/frameworks/arquitetura-de-agents-kolden/`.
> **Fluxo esperado:** aprovação → ida-e-volta com Liceu-chief em sessão dedicada (padrão Kolden — Onda 6 do Método) → aplicação no framework do Liceu.
> **Data:** 2026-07-06

---

## §0 — Filosofia das emendas

O framework `arquitetura-de-agents-kolden` foi produzido pelo Liceu-chief na Fase 1 do Contrato `m-20260704` (concluída 2026-07-04). É a **fonte-de-verdade canônica** dos 12 princípios + 5 camadas + 8 critérios.

Nas Sub-ondas 1.1-1.5 do Contrato-mãe `m-20260706`, o Método Kolden encontrou **2 divergências** com o framework:

1. **G5 interpretabilidade** — o Contrato-mãe listou os 8 gates canônicos com "interpretabilidade" como #5; o framework do Liceu tem #5 = Orthogonality e #6 = Instrumental separados (sem interpretabilidade nomeada).
2. **Categoria "adapter de runtime bidirecional em tempo real" no Art. IV** — a Sub-onda 1.3 (inventário MCP) descobriu que MCP spec 2024 (Anthropic 25/nov/2024, JSON-RPC 2.0 request-response) não modela event streams bidirecionais em tempo real. Os 5 adapters do Hermes (Discord Gateway/Slack Socket Mode/Telegram polling/WhatsApp webhooks/Google Chat Pub/Sub) formam categoria constitucional própria não prevista pelo Art. IV v2.5.0 nem pelo P12 do framework do Liceu.

Ambas as divergências foram **declaradas honestamente** ao Ronan (Sub-ondas 1.1 e 1.3) e aprovadas para prosseguir com nota de emenda pendente. Este documento formaliza as emendas propostas.

**Escopo:** propostas puras. **NÃO aplicar** sem ida-e-volta com Liceu-chief. Este é o padrão Kolden — emendas ao framework passam pelo Liceu (que produziu o framework), não pelo Caos (que o consome).

---

## §1 — Emenda 1: reconhecimento de "Interpretability Expectation" como C5 nomeado

### §1.1 — Estado atual do framework

**Fonte:** `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` §"Procedência dos 8 Critérios de Safety+Quality" (linhas 148-159).

Tabela atual dos 8 critérios canônicos:

| # | Critério | Fonte primária | Onda | Ano |
|---|---|---|---|---|
| 1 | Constitutional principles | Bai et al. arXiv 2212.08073 | 4 | 2022 |
| 2 | ASL (Responsible Scaling) | Amodei/Anthropic RSP | 4 | 2023 |
| 3 | Assistance game — incerteza | Hadfield-Menell-Russell-Abbeel-Dragan NeurIPS 2016 | 5 | 2016 |
| 4 | Off-switch — corrigibility | Hadfield-Menell-Russell IJCAI 2017 | 5 | 2017 |
| **5** | **Orthogonality check** | Bostrom Minds and Machines 22 | 5 | 2012 |
| **6** | **Instrumental convergence** | Bostrom Superintelligence cap. 7 | 5 | 2014 |
| 7 | Embodied grounding | Brooks Artificial Intelligence 47 | 5 | 1991 |
| 8 | Predictions Scorecard | Brooks rodneybrooks.com/blog series | 5 | 2018-2026 |

**Interpretabilidade NÃO é critério nomeado** — é subprincípio implícito de P9 (Race-to-the-Top em Safety) via linhagem Anthropic Circuits (Olah 2020-), mas sem elevação a gate canônico próprio.

### §1.2 — Divergência declarada pelo Contrato-mãe

O Contrato-mãe `m-20260706` §executivos_hefesto especifica que todo agent Kolden declara "ASL + aspiration_criteria + uncertainty_statement + constitution_ref + MCP_tools + procedencia" no frontmatter — sem menção explícita a interpretabilidade nos 8 critérios.

Porém a Sub-onda 1.1 (diff-cirurgico.md §0 filosofia da reescrita item 4) **elevou interpretabilidade a G5 nomeado** consolidando Orthogonality + Instrumental em G6, com procedência **Amodei-Olah-Steinhardt-Christiano-Schulman-Mané (2016) "Concrete Problems in AI Safety" (arXiv 1606.06565) § Interpretability + linhagem Anthropic Circuits (Olah 2020-)**.

Ronan aprovou em 2026-07-05T23:00 (via `AskUserQuestion`, ver Contrato-mãe §log_de_decisao Sub-onda 1.1) — mantido como decisão do Contrato-mãe.

### §1.3 — Texto proposto para emenda

**Onde:** `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` §"Procedência dos 8 Critérios de Safety+Quality" (linhas 148-159).

**Bloco atual (linhas 152-159):**

```markdown
| 1 | Constitutional principles | Bai et al. arXiv 2212.08073 | Onda 4 | 2022 |
| 2 | ASL (Responsible Scaling) | Amodei/Anthropic RSP | Onda 4 | 2023 |
| 3 | Assistance game — incerteza | Hadfield-Menell-Russell-Abbeel-Dragan NeurIPS 2016 | Onda 5 | 2016 |
| 4 | Off-switch — corrigibility | Hadfield-Menell-Russell IJCAI 2017 | Onda 5 | 2017 |
| 5 | Orthogonality check | Bostrom Minds and Machines 22 | Onda 5 | 2012 |
| 6 | Instrumental convergence | Bostrom *Superintelligence* cap. 7 | Onda 5 | 2014 |
| 7 | Embodied grounding | Brooks Artificial Intelligence 47 | Onda 5 | 1991 |
| 8 | Predictions Scorecard | Brooks rodneybrooks.com/blog series | Onda 5 | 2018-2026 |
```

**Bloco proposto (bump minor v1.0 → v1.1):**

```markdown
| 1 | Constitutional principles | Bai et al. arXiv 2212.08073 | Onda 4 | 2022 |
| 2 | ASL (Responsible Scaling) | Amodei/Anthropic RSP | Onda 4 | 2023 |
| 3 | Assistance game — incerteza | Hadfield-Menell-Russell-Abbeel-Dragan NeurIPS 2016 | Onda 5 | 2016 |
| 4 | Off-switch — corrigibility | Hadfield-Menell-Russell IJCAI 2017 | Onda 5 | 2017 |
| 5 | **Interpretability Expectation** | **Amodei-Olah-Steinhardt-Christiano-Schulman-Mané "Concrete Problems in AI Safety" arXiv 1606.06565 § Interpretability + linhagem Anthropic Circuits (Olah 2020-)** | **Onda 4** | **2016** |
| 6 | **Orthogonality + Instrumental convergence (consolidados)** | Bostrom Minds and Machines 22 (2012) + *Superintelligence* cap. 7 (2014) | Onda 5 | 2012-2014 |
| 7 | Embodied grounding | Brooks Artificial Intelligence 47 | Onda 5 | 1991 |
| 8 | Predictions Scorecard | Brooks rodneybrooks.com/blog series | Onda 5 | 2018-2026 |
```

**Mudança semântica:**
- **#5 vira Interpretability Expectation** (novo, procedência Amodei-Olah 2016 + Anthropic Circuits 2020-).
- **#6 vira Orthogonality + Instrumental consolidados** (Bostrom 2012+2014 combinados).
- **Contagem preserva 8 critérios** — não é 9. É reordenação + consolidação + acréscimo.

### §1.4 — Impacto nos 20 templates do Liceu

**Baixo.** Os templates do Liceu (`Liceu/frameworks/arquitetura-de-agents-kolden/*.md` — 20 arquivos) referenciam os 8 critérios apenas como numeração + fonte primária. A reordenação:
- #5 (Interpretability) e #6 (Orthogonality+Instrumental) precisam swap de nome + fonte nas tabelas.
- **P6 do framework** ("Orthogonality + Instrumental Convergence") já é o mesmo par consolidado no princípio; a emenda alinha o critério ao princípio (consistência interna).
- **P9 do framework** ("Race-to-the-Top em Safety") herdará explicitamente Interpretability Expectation como sub-critério de raciocínio operacional.

**Estimativa:** 5-8 arquivos precisam edit cirúrgico (tabelas + procedência). Escopo próximo da Onda 6 do Método (padronização do Liceu) — mesma sessão dedicada absorve a emenda.

### §1.5 — Procedência da emenda

- **Fonte primária:** Amodei-Olah-Steinhardt-Christiano-Schulman-Mané (2016) "Concrete Problems in AI Safety" (arXiv 1606.06565), especificamente §Interpretability.
- **Linhagem:** Anthropic Circuits (Olah 2020-) — série de publicações do Chris Olah + colegas na Anthropic sobre interpretabilidade mecânica de LLMs.
- **Ratificação Kolden:** aprovação do Ronan em 2026-07-05T23:00 (AskUserQuestion Q4 da Sub-onda 1.1 — Opção (a) "Fiel ao Contrato").

---

## §2 — Emenda 2: Art. IV — categoria "runtime bidirecional em tempo real"

### §2.1 — Estado atual do framework

**Fonte:** `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` §"Procedência dos 12 Princípios Canônicos" - Princípio 12 (linhas 102+).

**P12 — MCP como Camada Universal:**
- Fonte primária: Anthropic (25/nov/2024) "Introducing the Model Context Protocol" (modelcontextprotocol.io).
- Uma camada universal para tools (JSON-RPC 2.0 request-response).

**Constituição do Caos v2.5.0 Art. IV — MCP mandatório** (materialização de P12):
- Toda tool consumida por agent Kolden é MCP server (nativo ou adapter fino).
- Wrapper proprietário que reinventa protocol é BLOCK após 90 dias de dupla-vida.

### §2.2 — Divergência declarada pela Sub-onda 1.3

A Sub-onda 1.3 (`Caos/registros/metodo-onda-1/1.3-mcp-camada-1/inventario.md` §3 + `sumario-executivo.md` §3) descobriu que **MCP spec 2024 não modela runtimes de mensageria bidirecional em tempo real**.

Os 5 adapters do Hermes usam event streams que fogem do modelo request-response:
- **Discord Gateway** (WebSocket persistente, heartbeat, sequência de eventos).
- **Slack Socket Mode** (WebSocket persistente, evento push).
- **Telegram long-polling** (HTTP repetido) — parcialmente encaixável, mas convenção é polling não request-response.
- **WhatsApp Meta webhooks** (HTTP webhook inbound, callback assíncrono).
- **Google Chat Pub/Sub** (Google Cloud Pub/Sub push subscription).

Duas rotas legítimas propostas ao gate humano:
- **Rota D-1 (ratificação):** aceitar categoria constitucional nova "adapter de runtime bidirecional em tempo real"; H1-H5 permanecem SEM dupla-vida. Emenda ao P12 do framework do Liceu + Art. IV da Constituição do Caos.
- **Rota D-2 (postergação):** manter H1-H5 em dupla-vida indefinida enquanto MCP spec 2025-2026 (`streamable-http-transport`, na roadmap Anthropic) não maturar.

**Recomendação técnica da Sub-onda 1.3:** D-1 (ratificação com emenda). Preferência do Contrato-mãe.

### §2.3 — Texto proposto para emenda

**Onde:** `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md` §"Procedência dos 12 Princípios Canônicos" - Princípio 12 (linhas 102+).

**Bloco atual (aproximado — leia direto no arquivo para o texto exato):**

```markdown
### Princípio 12 — MCP como Camada Universal
- **Fonte primária:** Anthropic (25/nov/2024) "Introducing the Model Context Protocol"
  (anthropic.com/news/model-context-protocol, modelcontextprotocol.io)
```

**Bloco proposto (acrescentar sub-item):**

```markdown
### Princípio 12 — MCP como Camada Universal
- **Fonte primária:** Anthropic (25/nov/2024) "Introducing the Model Context Protocol"
  (anthropic.com/news/model-context-protocol, modelcontextprotocol.io)

- **Emenda v1.1 (2026-07-06, Sub-onda 1.3 do Contrato `m-20260706`):**
  Reconhece **categoria constitucional própria** para *"adapters de runtime bidirecional
  em tempo real"* — tools que operam sobre event streams (WebSocket persistente,
  Socket Mode, long-polling, webhooks inbound, Pub/Sub push) que MCP spec 2024
  (JSON-RPC 2.0 request-response) não modela. Exemplo canônico: 5 adapters de
  plataforma do Hermes (Discord Gateway, Slack Socket Mode, Telegram polling,
  WhatsApp Meta webhooks, Google Chat Pub/Sub).

  **Justificativa técnica:** MCP como camada universal foi projetado para tools
  request-response inspirado por Language Server Protocol (Microsoft 2016, LSP).
  Runtimes bidirecionais em tempo real seguem paradigma distinto (event-driven,
  stateful connection) que a spec atual não cobre. Categoria própria preserva a
  norma "MCP mandatório para tools request-response" sem forçar migração impossível
  de adapters bidirecionais.

  **Data-limite de reavaliação:** 2027-01. Ratificar (mantém categoria) ou dissolver
  (se MCP spec 2025-2026 `streamable-http-transport` maturar e cobrir event streams).

  **Fonte da distinção:** literatura de sistemas distribuídos (event-driven vs
  request-response) + doc oficial LSP (Microsoft 2016, aponta como inspiração do MCP
  segundo release da Anthropic).
```

### §2.4 — Impacto nos 20 templates do Liceu

**Baixo a médio.** P12 aparece em ~4-6 templates do Liceu. A emenda:
- Não altera P12 principal (MCP como camada universal continua).
- Adiciona sub-item + exemplo canônico (5 adapters Hermes).
- Anti-padrão #5 do framework ("Wrappers proprietários tools") ganha exceção nomeada — a categoria bidirecional NÃO é wrapper proprietário evitável, é adapter legítimo por design.

**Estimativa:** 4-6 arquivos precisam nota (não edit destrutivo).

### §2.5 — Impacto na Constituição do Caos v2.5.0

Cascata: emenda ao framework Liceu → emenda ao Art. IV da Constituição Caos v2.6.0.

**Proposta para Art. IV v2.6.0:**
- Preservar "MCP mandatório" para tools request-response.
- Acrescentar exceção nomeada: "runtime bidirecional em tempo real" é categoria própria; adapter da categoria é aceitável sem dupla-vida.
- Manter data-limite 2027-01 para reavaliação.

### §2.6 — Procedência da emenda

- **Fonte técnica:** Anthropic (25/nov/2024) MCP spec 2024 — declara inspiração LSP (Microsoft 2016).
- **Distinção arquitetural:** literatura de sistemas distribuídos (event-driven vs request-response).
- **Achado empírico:** Sub-onda 1.3 do Contrato `m-20260706` — 22 wrappers proprietários varridos, 5 (H1-H5) em Hermes formam categoria distinguível.
- **Roadmap Anthropic:** MCP `streamable-http-transport` proposto para 2025-2026 (não maturou até 2026-07).

---

## §3 — Fluxo de aplicação recomendado

1. **Sub-onda 1.6 encerra** com estas 2 emendas como um dos 8 artefatos.
2. **Gate humano (Q3 do sumário executivo)** — Ronan escolhe:
   - **Aprovar** aplicação imediata das 2 emendas ao framework do Liceu.
   - **Adiar** para sessão dedicada com Liceu-chief (padrão Kolden — Onda 6 do Método).
   - **Aprovar 1 sim, 1 não** — só emenda #1 (mais consolidada) ou só #2 (mais urgente pelo lado dos wrappers).
3. **Se adiado:** sessão dedicada em `C:\Kolden\Liceu\` com Liceu-chief examina as emendas + eventualmente propõe contra-emenda. Ratificação bilateral (Liceu-chief + Ronan) fecha o loop.
4. **Após ratificação:** framework do Liceu bump para v1.1 (emenda #1) e/ou v1.2 (emenda #2). Constituição do Caos v2.6.0 acompanha.

---

## §4 — Auto-verificação

- [x] Emenda #1 (Interpretability Expectation como C5) — texto atual, texto proposto, procedência, impacto.
- [x] Emenda #2 (categoria runtime bidirecional no P12/Art. IV) — texto atual, texto proposto, procedência, impacto, data-limite.
- [x] Nada aplicado em `Liceu/frameworks/`.
- [x] Preservação total do framework atual.
- [x] Impacto nos 20 templates do Liceu estimado (baixo a médio; 4-8 arquivos por emenda).
- [x] Fluxo de aplicação claro (ida-e-volta com Liceu-chief).

---

*Emendas propostas pelo `caos-chief` na Sub-onda 1.6. Nada aplicado no framework do Liceu. Aguarda gate humano (Q3 do sumário executivo) + eventual ida-e-volta com Liceu-chief.*
