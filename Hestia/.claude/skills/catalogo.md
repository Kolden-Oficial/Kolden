---
tipo: nota
area: Hestia
up: "[[Hestia/_MOC-hestia]]"
---

# Catálogo de Habilidades — Héstia

Habilidades disponíveis ao squad Héstia (RH, Pessoas & Cultura), seu gatilho de invocação e propósito.
`status: semente-do-lote-2026-06-26` — refino e expansão pelo Ritual do Caos pendentes.

## Habilidades-âncora de domínio (SKILL.md próprios)

| Habilidade | Gatilho | Propósito | Agente dono |
|---|---|---|---|
| `recrutamento-e-selecao` | "abrir vaga", "descrição de cargo", "recrutamento", "seleção", "sourcing", "triagem", "entrevista", "carta-proposta" | Processo de atração e seleção por competência: vaga → JD → pipeline → triagem → entrevista estruturada (STAR) → oferta | recrutador-e-selecao |
| `onboarding-estruturado` | "onboarding", "integração", "primeiros 90 dias", "30-60-90", "ramp-up", "offboarding" | Jornada de integração: pré-boarding, plano 30-60-90, ramp-up com buddy, checklist de acessos, offboarding humanizado | especialista-de-onboarding |
| `avaliacao-de-desempenho` | "avaliação de desempenho", "performance", "feedback", "calibração", "9-box", "pdi", "1:1" | Ciclo de performance e desenvolvimento: rubrica, feedback SBI, calibração anti-viés, 9-box, PDI | business-partner-rh |
| `cultura-e-engajamento` | "cultura", "clima", "engajamento", "eNPS", "valores", "saúde organizacional", "retenção" | Medir e cuidar da cultura: pesquisa de clima, eNPS, valores vividos vs declarados, org-health, rituais | analista-de-cultura |
| `politicas-e-cargos` | "descrição de cargo", "política de pessoas", "faixa salarial", "banda", "remuneração", "comp", "people analytics" | Governança de pessoas: cargos/níveis, trilhas, políticas, faixas de remuneração (equidade), people report | business-partner-rh |

## Fronteiras (handoff — não são habilidades da Héstia)

| Tema | Para onde | Por quê |
|---|---|---|
| RH de AGENTES de IA (roster/cartão de identidade) | **Caos/curador** | Héstia cuida de pessoas humanas; o quadro de agentes é do Caos |
| Headcount / orçamento de pessoal | **Olimpo** (Poseidon/Plutos) | Decisão estratégica/financeira |
| Marca empregadora (copy/visual/social) | **Caliope / Aglaia / Pheme** | Héstia entrega conteúdo bruto, não a peça pública |
| People analytics pesado / dashboard | **Metis** | Análise estatística e visualização de dados |
| Parecer jurídico-trabalhista | (jurídico — inexistente) | Sinalizar risco e escalar; sem sentença |

## Habilidades compartilhadas (fonte única no workspace)

| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` |
| `infisical-padrao` | Sempre que precisar de credencial/segredo | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |

## Atribuição

Habilidades-semente reescritas (sem cópia literal) a partir de:
- `anthropics/knowledge-work-plugins@78d74d5` — cluster `human-resources` (Apache-2.0).
- `alirezarezvani/claude-skills@4a3c05b` — CHRO advisor + org-health diagnostic (MIT).
