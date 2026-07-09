---
name: prfaq-amazon-style
description: |
  Use quando precisar simular o anúncio de um produto/feature ANTES de construir (Working Backwards
  da Amazon) — Press Release de 1 página + FAQ externo (5-10 perguntas cliente) + FAQ interno (5-10
  perguntas honestas de assunção/custo/risco). Aciona em Spec Pipeline Fase 4 (Write Spec). Não usar
  para bug fix ou feature < 1 sprint. Linguagem do CLIENTE, sem jargão.
domain: aiox-development
subdomain: product-discovery
agente_dono: [pm-morgan]
aiox_layer: L3 (.claude project config — mutable)
aiox_workflow_integration: spec-pipeline/write-spec (Fase 4 entrada)
heranca_historica: [jeff-bezos-amazon-working-backwards, ian-mcallister, carr-bryar-working-backwards-livro]
tags: [prfaq, working-backwards, amazon, press-release, faq, product-discovery]
cross_links:
  - aletheia/mapa-de-assuncoes
  - prometeu/spec-build-review
  - prometeu/clarificacao-de-ambiguidade
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G11)
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# prfaq-amazon-style — PRFAQ estilo Amazon (Working Backwards)

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G11, MIT)._

Documento de duas partes — **Press Release fictício + FAQ** — que simula o anúncio do produto **antes de construir**. Força concretude antes de qualquer linha de código.

## O que é PRFAQ

Inventado pela Amazon (~2004), parte central do método **"Working Backwards"**: você escreve o lançamento como se o produto já estivesse pronto, e só depois decide se vale a pena construir.

- **Press Release**: 1 página descrevendo o produto como se já tivesse sido lançado. Foco no cliente, não na tecnologia.
- **FAQ**: 5-10 perguntas externas (cliente/imprensa) + 5-10 internas (decisão de negócio/tech) com respostas honestas.

Se você não consegue escrever um PR convincente em 1 página, o problema é o **produto**, não a comunicação.

## Quando usar

- **Spec Pipeline Fase 4 (Write Spec)** — PRFAQ é a entrada antes do PRD técnico.
- Decisão de iniciar projeto de escala (≥3 meses de roadmap).
- Alinhamento de stakeholders divergentes (PRFAQ força concretude e revela desacordos invisíveis).
- Pré-validação de comunicabilidade ("se eu não consigo escrever PR convincente, talvez ninguém compre").

### NÃO usar para

- Bug fix.
- Feature menor (< 1 sprint).
- Decisão técnica interna sem face para cliente (refatoração, troca de lib, migração de infra).

## Estrutura do Press Release (1 página)

| Seção | Conteúdo | Tamanho |
|---|---|---|
| Headline | Anúncio em 1 linha de impacto | 1 linha |
| Subheadline | Quem (cliente) e qual outcome | 1 linha |
| Parágrafo 1 — Contexto | Cidade, data, problema do cliente | 3-4 linhas |
| Parágrafo 2 — Anúncio | O produto + funcionalidade-chave | 3-4 linhas |
| Parágrafo 3 — Quote interno | Líder da empresa fala sobre o "por quê" | 3-4 linhas |
| Parágrafo 4 — Como funciona | Demonstração em palavras | 3-5 linhas |
| Parágrafo 5 — Quote cliente | Cliente fala benefício real | 3-4 linhas |
| Parágrafo 6 — Disponibilidade | Quando, onde, como adquirir | 2-3 linhas |

### Regras do PR

- Foco no **CLIENTE**, não na empresa.
- Linguagem do CLIENTE (não jargão técnico).
- Outcome **específico e mensurável**.
- 1 página A4 max (**Bezos rule** — passou de 1 página, refaça).
- Quotes devem soar **humanos**, não corporativos.
- **NUNCA** usar "best-in-class", "revolutionary", "world-class", "game-changer" — palavras vazias que indicam pensamento preguiçoso.

## Estrutura do FAQ

### Perguntas externas (5-10, cliente/imprensa)

Exemplos de gatilho:

- "Quanto custa?"
- "Como difere de [concorrente óbvio]?"
- "Funciona em [contexto comum]?"
- "Que dados são coletados?"
- "Posso cancelar quando quiser?"
- "O que acontece se [edge case]?"
- "É seguro? Que certificações vocês têm?"
- "Tem versão grátis / trial?"

### Perguntas internas (5-10, decisão de negócio/tech)

Exemplos de gatilho:

- "Por que **agora**? Por que não daqui 1 ano?"
- "Qual a assunção **mais arriscada** que estamos fazendo?"
- "Qual o caminho mais barato de **invalidar** essa assunção?"
- "Que recursos exigimos (time, infra, parceiros)?"
- "Quanto custa para construir? E para operar mensalmente?"
- "Qual o caminho de monetização? E o break-even?"
- "Que decisões dependem desse projeto seguir?"
- "Se isso falhar, o que aprendemos? O que perdemos?"
- "Quem decide kill?"

### Regras das respostas internas

- **Honestidade brutal** — não vender o projeto a si mesmo.
- Se a resposta é "não sabemos" — escreva **"não sabemos, e vamos validar com [experimento X]"**.
- Cada resposta vira candidata a hipótese para `aletheia/mapa-de-assuncoes`.
- Resposta otimista demais é red flag — peça contraprova.

## Método em 5 passos

### 1. Rascunho do PR primeiro (~1h)

- Escreva o press release **antes do FAQ**.
- Se você não consegue escrever 1 página convincente, o problema é o **PRODUTO**, não a comunicação. Pare e repense o produto.

### 2. FAQ externo (~1h)

- 5-10 perguntas que cliente/imprensa fariam de verdade.
- Respostas **honestas**, não-marketing.

### 3. FAQ interno (~1-2h)

- 5-10 perguntas internas duras (assunções, custos, riscos, kill criteria).
- Respostas **honestas**, não-otimistas.

### 4. Review crítica (~1h, com sm + po + dev)

Perguntas obrigatórias na review:

- "Onde estamos enganando-nos?"
- "Qual quote do cliente é menos convincente?"
- "Qual resposta do FAQ é mais frágil?"
- "Que assunção mais nos custaria estar errada?"

Cada ponto fraco vira **candidata a hipótese** para validação.

### 5. Entrega para Spec Pipeline Fase 4

- PRFAQ aprovado vira **entrada da spec técnica**.
- Cross-link com `clarificacao-de-ambiguidade` para refinar antes da escrita técnica.
- Cross-link com `mapa-de-assuncoes` (Aletheia) para validações pendentes.

## Anti-padrões

- PR escrito em jargão técnico — cliente não entenderá.
- FAQ com respostas marketing ("nosso compromisso é entregar excelência").
- 1 página vira 5 — sinal de pensamento confuso, não de produto rico.
- Quote do cliente genérico ("amei o produto") — sem especificidade, sem outcome.
- Pular FAQ interno — perde-se o aprendizado mais importante (assunções de risco).
- PRFAQ como "documento que ninguém leu" — sempre fazer review presencial com o time.
- Quote interno de CEO em modo "visão do mundo" — escreva como humano, não como release oficial.

## Saída padrão

1. **PRFAQ doc** (1 página PR + 2-4 páginas FAQ).
2. **Lista de assunções de risco** (extraída do FAQ interno) — handoff para Aletheia (`mapa-de-assuncoes`).
3. **Trigger**: se PRFAQ for aprovado, dispara **Spec Pipeline Fase 4** (`write-spec`).

## Cross-links

- **Aletheia `mapa-de-assuncoes`** — assunções do FAQ interno viram hipóteses priorizadas.
- **Prometeu `spec-build-review`** — PRFAQ aprovado → spec técnica → build → QA.
- **Prometeu `clarificacao-de-ambiguidade`** — refinamento pré-spec quando houver ambiguidade no PRFAQ.
- **Caliope (copy)** — opcional para polir o PR final, mas o **conteúdo é decisão de produto**, não de copy.

## Herança histórica

- **Jeff Bezos / Amazon** (~2004) — "Working Backwards" canônico, memo de 1 página e proibição de PowerPoint.
- **Ian McAllister** (Amazon) — formato PRFAQ padronizado, popularizado em respostas no Quora.
- **Bill Carr & Colin Bryar** (livro *Working Backwards*, 2021) — sistematização externa do método pós-saída da Amazon.
