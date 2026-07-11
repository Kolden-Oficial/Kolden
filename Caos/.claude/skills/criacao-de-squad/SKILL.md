---
name: criacao-de-squad
description: Cria um squad multi-agente (orquestrador tier 0 + especialistas tier 1) na fase de construção, quando o arquiteto recomendou topologia SQUAD. Gera o manifesto squad.yaml, o orquestrador, os especialistas, o roteamento por keywords, os workflows como DAG e o checklist compartilhado. Segue a ordem canônica da Fase 5 (cascata 5.1→5.6).
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Criação de Squad

Use quando o blueprint da Fase 3 for **SQUAD** (3+ especializações distintas). O squad nasce como
**irmão do Caos** em `C:\Kolden\<NomeDoSquad>\` — um projeto Claude Code independente, cujo
`CLAUDE.md` É a identidade do squad. **Não existe `system-prompt.md` separado.** Padrão-ouro de
referência: `C:\Kolden\Aletheia\`.

## Anatomia de um squad (real — espelha Aletheia)

```
C:\Kolden\<NomeDoSquad>\
├── CLAUDE.md               ← identidade do squad (orquestrador + roster + restrições)
├── squad.yaml              ← manifesto (de modelos/squad-base.yaml): tiers, agentes, handoffs
├── prd-de-ia.md            ← PRD aprovado do squad
├── README.md               ← visão geral e uso
├── MEMORY.md               ← memória do squad (Padrões Ativos / Candidatos / Arquivado)
├── instalacao.md           ← como colocar em produção
├── roteiro-de-teste.md     ← smoke tests (maturity score da Fase 7)
├── agents/                 ← orquestrador + especialistas (um arquivo por agente)
│   ├── <squad>-chief.md    ← tier 0 (de modelos/orquestrador-base.md): roteia, NÃO executa
│   ├── <especialista-1>.md ← tier 1
│   └── <especialista-2>.md
├── data/                   ← routing-catalog.yaml (domínios/keywords → especialista) + frameworks
├── workflows/              ← workflows como DAG (de modelos/workflow-base.yaml)
├── checklists/             ← output-quality.md (itens CRITICAL / gate de qualidade)
├── tasks/                  ← tarefas atômicas que os agentes executam
└── .claude/
    ├── skills/             ← habilidades do squad + catalogo.md
    ├── reflexos/           ← 6 reflexos (segurança, auditoria, marca-trabalho, encerramento, sessão, verificação)
    └── settings.json       ← configura os reflexos
```

## Processo — ordem canônica (cascata da Fase 5)

Siga a sequência 5.1→5.6 da Constituição (v2.2.0). Cada etapa fecha antes da próxima começar.

1. **Manifesto.** Gere `squad.yaml` a partir de `modelos/squad-base.yaml`: tiers, lista de agentes,
   handoffs, padrão mínimo de qualidade.
2. **5.1 Orquestrador (tier 0).** Crie `agents/<squad>-chief.md` a partir de
   `modelos/orquestrador-base.md`: roteamento (diagnostic_routing) + síntese; **nunca** executa o
   trabalho especializado. **Declare o `roster:`** (os especialistas que ele comanda).
3. **5.2 Especialistas (tier 1).** Crie cada `agents/<especialista>.md` — delegue ao
   `redator-de-prompts`. Cada um: `tools:` restritas + formato de retorno definido; foco em 1-3
   frameworks/competências (não um "sabe-tudo").
4. **5.3 Habilidades.** Crie as habilidades do squad em `.claude/skills/` — **cada habilidade nasce
   ligada ao especialista dono** (a habilidade referencia quem a usa; sem habilidades órfãs).
   Atualize `.claude/skills/catalogo.md`.
5. **5.4 MCPs/APIs próprios** (se o PRD §5 pedir): habilidade `criacao-de-mcp`.
6. **5.5 Reflexos + memória.** Os 6 reflexos + `MEMORY.md` (esquema Padrões/Candidatos/Arquivado) +
   reflexo `Stop` do ritual-de-encerramento.
7. **5.6 Referências por camada.** Para o orquestrador, **cada** especialista e **cada** habilidade
   de domínio, rode `heranca-de-especialista` (+ `busca-de-referencias`): bloco biography +
   core_frameworks no schema `modelos/especialista-historico.md`, fonte score ≥7, sem cópia literal.
8. **Roteamento.** Gere `data/routing-catalog.yaml` no padrão de `dados/catalogo-de-roteamento.yaml`
   (domínios + keywords → especialista primário/secundário).
9. **Workflows.** Ao menos um em `workflows/` a partir de `modelos/workflow-base.yaml`: fases com
   `depends_on` e `checkpoint: {gate, veto}`.
10. **Checklist.** `checklists/output-quality.md` com itens CRITICAL do squad.

## Regras
- O orquestrador roteia para 1-3 especialistas por vez; raramente mais.
- Cada especialista de domínio tem **herança histórica** mapeada (Fase 5.6) — é o que o `revisor`
  confere no gate N2/N6.
- Toda ferramenta de qualquer especialista segue a Constituição (Art. IV e VII; segredos via Infisical).
- Workflows falham cedo: todo checkpoint tem uma condição `veto` que interrompe (HALT).
- O squad inteiro é registrado como entidade na Fase 8 (mais as entidades reaproveitáveis).
