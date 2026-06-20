---
name: criacao-de-squad
description: Cria um squad multi-agente (orquestrador tier 0 + especialistas tier 1) na fase de construção, quando o arquiteto recomendou topologia SQUAD. Gera o manifesto squad.yaml, o orquestrador, os especialistas, o roteamento por keywords, os workflows como DAG e o checklist compartilhado.
---

# Criação de Squad

Use quando o blueprint da Fase 3 for **SQUAD**. O squad nasce em `squads/<nome>/`.
Cada especialista é um agente que segue a mesma anatomia de um agente solo
(`system-prompt.md`, `perfil.md`, `ferramentas.md`), mas coordenado por um orquestrador.

## Anatomia de um squad

```
squads/<nome>/
├── squad.yaml              ← manifesto (de modelos/squad-base.yaml)
├── prd-de-ia.md            ← PRD aprovado do squad
├── orquestrador.md         ← tier 0 (de modelos/orquestrador-base.md)
├── especialistas/          ← um arquivo por especialista tier 1
│   ├── <especialista-1>.md
│   └── <especialista-2>.md
├── catalogo-de-roteamento.yaml  ← domínios/keywords → especialista
├── workflows/              ← workflows como DAG (de modelos/workflow-base.yaml)
│   └── wf-<principal>.yaml
├── checklists/
│   └── qualidade-da-saida.md    ← itens CRITICAL do squad
└── instalacao.md
```

## Processo
1. Gere `squad.yaml` a partir de `modelos/squad-base.yaml`: tiers, lista de agentes,
   handoffs, padrão mínimo de qualidade.
2. Crie o **orquestrador** (tier 0) a partir de `modelos/orquestrador-base.md`: ele faz
   roteamento (diagnostic_routing) e síntese; **nunca** executa o trabalho especializado.
3. Crie cada **especialista** (tier 1) — delegue o system prompt ao `redator-de-prompts`,
   usando `modelos/system-prompt-base.md` (com Activation Notice e Comandos).
4. Gere `catalogo-de-roteamento.yaml` do squad no padrão de `dados/catalogo-de-roteamento.yaml`
   (domínios + keywords → especialista primário/secundário).
5. Gere ao menos um workflow em `workflows/` a partir de `modelos/workflow-base.yaml`:
   fases com `depends_on` e `checkpoint: {gate, veto}`.
6. Gere o checklist compartilhado em `checklists/qualidade-da-saida.md` com itens CRITICAL.

## Regras
- O orquestrador roteia para 1-3 especialistas por vez; raramente mais.
- Cada especialista tem foco em 1-3 frameworks/competências — não um "sabe-tudo".
- Toda ferramenta de qualquer especialista segue a Constituição (Art. IV e VII).
- Workflows falham cedo: todo checkpoint tem uma condição `veto` que interrompe (HALT).
- O squad inteiro é registrado como uma entidade na Fase 8 (mais as entidades reaproveitáveis).
