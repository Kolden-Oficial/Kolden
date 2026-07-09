---
name: padronizar
description: Use quando o Ronan (ou qualquer agente Kolden) pedir "padronize o squad X", "rode o rito de padronização em X", "aplique o Método em X", "faça a Onda de padronização de X", "diagnostique X pelo Método", ou variantes. Use para executar o rito canônico de 9 passos das Ondas 2-26 do Contrato-mãe `m-20260706-metodo-kolden` sobre um squad-alvo. Cada invocação = 1 Onda = 1 squad. Fonte-de-verdade do rito: `C:\Kolden\METODO-KOLDEN.md §8`. Checklist Dike: `Caos/checklists/CAOS-CL-002.md` (canônico após Sub-onda 1.6).
---

# /padronizar `<Squad>` — Rito canônico de padronização

**Fonte-de-verdade do rito:** `C:\Kolden\METODO-KOLDEN.md` §8 (v1.0, ratificado 2026-07-06).
**Checklist Dike:** `Caos/checklists/CAOS-CL-002.md` (canônico após Sub-onda 1.6; ex-draft do sub-contrato `m-20260705`).
**Uma invocação = uma Onda = um squad.** As Ondas 2-26 estão sequenciadas em §12 do METODO com Grupos A-G sugeridos.

## Argumento obrigatório

`<Squad>` — nome do squad-alvo (case-sensitive, mitologia grega). Exemplos: `Hermes`, `Prometeu`, `Aletheia`, `Argos`, `Aglaia`.

Se o argumento não vier: parar e perguntar via texto direto qual squad. Nunca assumir.

## O rito em 9 passos (canônico do METODO §8)

```
Passo 1 — Ler METODO-KOLDEN.md v1.0 como norma
Passo 2 — Diagnóstico READ-ONLY (fan-out ≤3 Explores, alvos independentes; execução direta se interdependentes)
Passo 3 — Escrever 5 artefatos padronizados (matriz + achados/diff + smoke/Ritual + Dike + sumário)
Passo 4 — PARAR: Ronan aprova via AskUserQuestion + ExitPlanMode
Passo 5 — Aplicar diff (reescrita cirúrgica com procedência linha-a-linha)
Passo 6 — Dike verifica INDEPENDENTE contra CAOS-CL-002 (seções A-G, 8 gates canônicos)
Passo 7 — Ritual de encerramento em <Squad>/MEMORY.md + <Squad>/agent-memory/<chief>.md
Passo 8 — Atualizar AGENTS.md (índice)
Passo 9 — Atualizar METODO-KOLDEN.md se aprendizado for canônico (versão minor bump)
```

## Anatomia canônica dos 5 artefatos (Passo 3)

Confirmada 5x nas sub-ondas 1.1-1.5 — **norma canônica das Ondas 2-26**. Devem ficar em `C:\Kolden\<Squad>\registros\metodo-onda-<N>\`:

1. **`matriz-de-conformidade.md`** OU **`relatorio-de-costura.md`** — auditoria por artefato do squad-alvo contra o Método (com evidência textual).
2. **`achados.jsonl`** OU **`diff-cirurgico.md`** — mapa achados → mudanças com severidade (P0/P1/P2/P3) + rastro para 8 gates.
3. **`agent-gerado-smoke.md`** OU arquivo do Ritual — smoke test canônico (opcional se o squad já tem agents estáveis; obrigatório se há CREATE novo).
4. **`verificacao-dike.md`** — 8/8 checkboxes CAOS-CL-002 seções A-G com citação textual verbatim por checkbox + bloco YAML canônico do veredito.
5. **`sumario-executivo.md`** — sumário ≤10 min de leitura + gate humano + bloco YAML pronto para appendar no Contrato-mãe.

## Regras invioláveis (aplicáveis a TODAS as invocações)

- **G1 — Escopo cirúrgico** — nenhum arquivo tocado fora de `C:\Kolden\<Squad>\`. Exceções: AGENTS.md (Passo 8) + METODO-KOLDEN.md (Passo 9 se aprendizado canônico).
- **G2 — Sem commit sem ordem** — working tree preservado.
- **G3 — Sem push sem ordem**.
- **G4 — Ritual de encerramento obrigatório** — Passo 7 não é opcional.
- **G5 — Fan-out ≤3 subagentes** (regra rate-limit validada 2026-06-27).
- **G6 — Artefato-em-disco entre passos** — nenhuma decisão perdida em memória de sessão.
- **G7 — Nunca duas Ondas na mesma sub-sessão** — cada Onda é sessão dedicada em `C:\Kolden\<Squad>\`.
- **G8 — Procedência rastreável** — linhagem/mente/obra/ano batendo com `Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`; divergências declaradas honestamente.

## Regra do fan-out (Passo 2 — CONFIRMADA 5x)

`fan-out ≤N é TETO, não obrigação`. Decida por **INTERDEPENDÊNCIA do alvo**:

- **Alvos interdependentes** (bloco canônico único, mesmos campos, coerência estilística cross-arquivo) → **execução direta (0/3 subagentes)**.
- **Alvos independentes** (grep cross-N-squads/subpastas, classificação binária, unidades separadas) → **fan-out até o teto (3/3)**.

Sub-ondas 1.1 (2 arquivos), 1.2 (13 arquivos), 1.4, 1.5 = 0/3; Sub-onda 1.3 (26 squads varridos por wrapper) = 3/3. Aplicar mesma heurística.

## Dependência do Dike

- **Passo 6** invoca `@dike` para verificação INDEPENDENTE do produtor.
- **Se Dike ainda não é agent funcional** (estado pré-Sub-onda-1.6-decisão) — papel Dike é executado temporariamente pelo `caos-chief` OU pelo `<Squad>-chief` (não o produtor) com 3 salvaguardas: (a) ordem serial produtor→verificador; (b) evidência textual verbatim por checkbox; (c) declaração explícita de divergência conhecida.
- **Depois da instanciação Dike** — invocar `@dike` diretamente.

## Cheat-sheet de disparo por squad

Sequência sugerida (METODO §8 + recomendação §12):

- **Onda 2 (Grupo A)** — Hermes (Camada 2, 15/22 wrappers, destrava KLD-PRED-2026-001)
- **Onda 3 (Grupo A)** — Prometeu (framework AIOX)
- **Ondas 4-6 (Grupo B)** — Olimpo, Dike, Themis
- **Ondas 7-9 (Grupo C)** — Aletheia, Argos, Liceu
- **Ondas 10-13 (Grupo D)** — Ananke, Cairos, Hestia, Pactolo
- **Ondas 14-18 (Grupo E)** — Aglaia, Caliope, Harmonia, Orfeu, Pheme
- **Ondas 19-24 (Grupo F)** — Ariadne, Dionisio, Emporos, Peitho, Pluto, Metis
- **Ondas 25-26 (Grupo G)** — Egide, Dedalo, Nomos

Ordem revisitável pelo Ronan a qualquer momento.

## Pré-requisitos técnicos

- Sessão iniciada em `C:\Kolden\<Squad>\` — G7 exige isso (nunca padronizar squad em sessão raiz).
- METODO-KOLDEN.md v1.0 legível (Passo 1).
- `CAOS-CL-002.md` canônico legível (Passo 6).
- Framework do Liceu (`Liceu/frameworks/arquitetura-de-agents-kolden/procedencia.md`) legível (G8).

## Quando esta skill NÃO se aplica

- Criar agent novo do zero → invoca `@Caos` (Ritual de 9 fases).
- Absorver repo externo → invoca `/absorver <url>` no Caos.
- Entender o Método sem executar → invoca `/metodo`.
- Verificar independente uma entrega já feita → invoca `@dike`.

## Procedência desta skill

Extraída do METODO-KOLDEN.md v1.0 §8 (rito de 9 passos) + §9 (papel do Dike) + CAOS-CL-002 canônico. Escrita na Sub-onda 1.6 do Contrato-mãe `m-20260706-metodo-kolden` pelo `caos-chief` (dogfooding). Confirmação 5x nas sub-ondas 1.1-1.5 (anatomia de 5 artefatos + fan-out ≤N como teto).
