# Catálogo de Habilidades — Cairós

> `status: semente-do-lote-2026-06-26` — 5 skills-âncora. Refino e expansão pelo Ritual do Caos pendentes.

Habilidades disponíveis ao squad Cairós (PMO & Gestão de Projetos), seu gatilho de invocação, propósito
e agente dono.

## Habilidades-âncora (SKILL.md próprios)

| Habilidade | Gatilho | Propósito | Dono |
|---|---|---|---|
| `gestao-de-cronograma-e-escopo` | "montar cronograma", "definir escopo", "WBS", "caminho crítico", "marcos", "baseline", "vai atrasar?" | Escopo (WBS) + cronograma (caminho crítico, marcos, baseline) + estimativa com premissa + governança de mudança | gerente-de-projeto |
| `gestao-de-riscos-de-projeto` | "quais os riscos", "o que pode dar errado", "plano B", "contingência", "matriz de risco", "registro de riscos" | Registro de riscos por probabilidade × impacto, resposta (mitigar/transferir/aceitar/evitar), dono + gatilho + contingência | gestor-de-riscos |
| `comunicacao-com-stakeholders` | "quem precisa saber", "plano de comunicação", "matriz de stakeholders", "status report", "gerir o patrocinador" | Matriz poder × interesse + plano de comunicação + status reporting por audiência + escalonamento | gestor-de-stakeholders |
| `roadmap-e-gestao-de-produto` | "roadmap", "próximo release", "priorização", "backlog", "sprint planning", "spec de feature", "métrica de produto" | Roadmap priorizado (RICE/ICE) + spec leve + sprint/release + métricas + síntese de discovery | product-manager |
| `selecao-de-metodologia` | "qual metodologia usar", "ágil ou waterfall", "scrum ou kanban", "como organizar o projeto" | Diagnóstico (4 eixos) → escolha de ágil/waterfall/híbrido + cadência/ritos/artefatos | gerente-de-projeto (+ product-manager) |

## Handoffs externos (lembrete — não são skills, são fronteiras)
- **Build de software** → **Prometeu** (pm/po/sm do AIOX assume o ciclo spec → build → review).
- **Discovery/validação de oportunidade** → **Aletheia** (handoff de entrada).
- **Decisão de portfólio / go-no-go executivo** → **Olimpo** (Zeus/CEO + 8 deuses).
- **Instrumentação e leitura de métricas** → **Metis** (Cairós define o quê; o Metis mede).

## Habilidades compartilhadas (fonte única no workspace)
| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` |
| `infisical-padrao` | Sempre que precisar de credencial/segredo | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |
| `verificacao-de-alinhamento` | SessionStart >24h (reflexo `verificacao-diaria`) | Checa pontas soltas nos documentos do squad |

## Pendências do refino pelo Caos (Ritual completo)
- Materializar `ferramentas.md` (Atlassian/Jira/Confluence/Notion/Linear via Infisical).
- Expandir clusters PMO (G16) — meeting-analyzer, jira/confluence operacionais — em skills próprias.
- Criar `tasks/`, `workflows/`, `checklists/` e os reflexos mínimos (segurança, auditoria, sessão).
- Herança de especialista histórico por camada (PMI/PMBOK, Agile Manifesto, etc.).
