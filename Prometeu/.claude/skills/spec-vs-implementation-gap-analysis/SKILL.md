---
name: spec-vs-implementation-gap-analysis
description: >
  Use quando a demanda for auditar se o CÓDIGO implementa o que a SPEC (PRD,
  story, ADR, requirements.md) diz — mapear cada requisito para função/arquivo
  concreto e classificar em "implementado / parcial / ausente / código sem spec".
  Executa gap analysis bidirecional: (a) spec → código (requisito órfão),
  (b) código → spec (feature-fantasma sem requisito). Gera relatório com
  rastreabilidade Requisito → Task → PR → Função. Cross-link Constituição AIOX
  Artigo III (Story-Driven) + Artigo IV (No Invention). Gatilhos: "spec vs
  implementação", "gap analysis", "requisito órfão", "feature fantasma", "isso
  está no PRD?", "auditar o que foi entregue", "rastreabilidade", "cobre a
  spec?". Dono: @qa (Quinn) + @po (Pax). Cross-link `analise-cross-artefato`
  (rastreabilidade spec×plan×tasks).
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Spec vs implementation gap analysis

Regra dura da Constituição AIOX Artigo III: **spec é fonte da verdade**. Artigo IV: **sem
invenção**. Mas na prática, código diverge da spec de 3 formas:

1. **Requisito órfão** — spec pede, código não tem.
2. **Feature fantasma** — código tem, spec não pediu.
3. **Implementação parcial** — código tenta mas cobre só parte.

Esta habilidade audita as 3 e produz relatório rastreável.

## O modelo de rastreabilidade

Cada requisito da spec (FR-*, NFR-*, US-*) deve mapear para:
- **Story** que implementa
- **PR** que fecha a story
- **Função/arquivo** que carrega o comportamento
- **Teste** que prova

```
FR-042 (usuário faz reset de senha por email)
  └─ Story S-2.5 (reset de senha)
      └─ PR #128 (feat: reset password flow)
          ├─ src/auth/reset-password.ts (função `resetPassword`)
          ├─ src/auth/reset-password.controller.ts (rota POST /auth/reset)
          └─ tests/e2e/reset-password.test.ts
```

## Método (leitura crítica + auditoria de código)

### Passo 1 — Extrair inventário da spec
Ler PRD / spec.md / requirements.md e extrair TODA afirmação de comportamento. Formato:
```
FR-001: sistema envia email de boas-vindas ao cadastro
FR-002: sistema valida CPF no cadastro
NFR-001: cadastro completa em <2s
US-001: como usuário, quero cadastrar com Google (SSO)
```

### Passo 2 — Rastrear cada item ao código
Para cada FR/NFR/US, procurar:
- Grep no repo por termo-chave
- Consultar `docs/traceability.md` se existe
- Consultar títulos de PR mergeados relacionados

Registrar:
```
FR-001 → src/mail/welcome.ts:sendWelcome() → PR #97 → test presente ✓
FR-002 → NÃO ENCONTRADO
NFR-001 → PR #103 (perf: cadastro otimizado) → sem teste de perf ⚠
US-001 → src/auth/sso-google.ts → PR #124 → test presente ✓
```

### Passo 3 — Inventário reverso (código → spec)
Listar features do código (endpoints, jobs, comandos CLI, telas). Para cada uma, procurar spec.
Sem spec = feature fantasma.

```
Endpoint POST /auth/reset-password → FR-042 ✓
Endpoint POST /debug/dump → FEATURE FANTASMA (viola Artigo IV)
Job daily-cleanup → NÃO ENCONTRADO em spec (checar se é infra ou fantasma)
```

### Passo 4 — Classificar
| Status | Definição | Ação |
|---|---|---|
| **Implementado** | requisito → código + teste | ✓ nada |
| **Parcial** | requisito → código sem teste OU teste sem cobrir edge case | criar issue |
| **Ausente** | requisito sem código | criar story |
| **Fantasma** | código sem requisito | 1) buscar spec latente 2) documentar como ADR 3) remover |

### Passo 5 — Relatório

```markdown
# Gap Analysis — PRD Kolden vs main@abc123

**Data:** 2026-07-02
**Auditor:** Quinn
**Escopo:** FR-001 a FR-050, NFR-001 a NFR-020

## Sumário
- Requisitos totais: 70
- Implementados: 55 (78,6%)
- Parciais: 8 (11,4%)
- Ausentes: 7 (10%)
- Features fantasma detectadas: 3

## Ausentes (BLOQUEANTE)
- FR-002 (validação de CPF): sem código, sem story aberta
- FR-018 (rate limit em /login): sem código, sem story aberta
- ...

## Parciais
- NFR-001 (cadastro <2s): PR #103 implementou otimização mas sem teste de perf
- ...

## Fantasmas
- POST /debug/dump: sem spec. Verificar com @pm se deveria existir.
- ...

## Ação recomendada
- Abrir 7 stories para requisitos ausentes (bloqueia release 1.2)
- Abrir 8 issues para completar parciais
- Removir ou spec-ar features fantasma
```

## Sinais de que a spec é fraca (não é o código)

Às vezes gap é falha da spec, não do código. Sinais:
- Requisitos ambíguos ("sistema deve ser rápido") → sem número mensurável
- Cenários sem edge case ("cadastro" sem "cadastro com email já existente")
- Requisitos que se contradizem entre docs
- User story sem AC observável

**Handoff:** devolve para Pax (@po). Ele usa `clarificacao-de-ambiguidade` + `checklist-de-requisitos`.

## Automatização parcial

Não substitui análise humana, mas ajuda:
- **Rastreabilidade automática** com marcador nos commits: `feat(FR-042): reset password`
- **Coverage por requisito:** ferramenta que lê marcador e reporta "FR-042 tem 3 arquivos e 12 testes"
- **CI check:** PR sem marcador de requisito → warning (não bloqueia; PR de refactor não precisa)

## Ritmo

- **Por sprint:** gap analysis da fatia entregue vs. escopo da sprint
- **Por release:** gap analysis do PRD completo vs. main
- **Sob demanda:** antes de auditoria externa (LGPD, SOC2)

## Handoffs

- **Requisito órfão** → @sm River abre story. @po Pax valida.
- **Feature fantasma** → @po Pax decide (documenta como ADR ou remove).
- **Ambiguidade da spec** → @po Pax + skill `clarificacao-de-ambiguidade`.
- **Discrepância entre docs** → @analyst Alex consolida fonte da verdade.

## Regras Kolden

- **Sem código sem spec** (Constituição AIOX Artigo IV). Feature fantasma é bug de processo.
- **Sem spec sem código** só é ok em backlog. Requisito aprovado deve ter story aberta.
- **Rastreabilidade viva** em `docs/traceability.md` — não gerada e esquecida.
- **Gap analysis do release** é gate. Sem ela, release não sai.

---
## Atribuição
Herança histórica: **Barry Boehm** — *Software Engineering Economics* (1981), requirements
traceability como cost driver; **Alistair Cockburn** — *Writing Effective Use Cases* (2000);
**Dean Leffingwell** + **Don Widrig** — *Managing Software Requirements* (2003), traceability
matrix canônica; **Ivar Jacobson** — use case driven development (OOSE, 1992); **IEEE
Std 830** (1998) — SRS traceability. Cross-link Artigo III (Story-Driven) + Artigo IV
(No Invention) da Constituição AIOX. Adaptado de `github.com/msitarzewski/agency-agents@a597cb6`
(MIT), bucket B03/engineering, ID TEST G19.
