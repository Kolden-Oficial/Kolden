---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/thedotmack--claude-mem/briefing-de-execucao|briefing-de-execucao]]"
  - "[[Caos/registros/absorcao/thedotmack--claude-mem/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/thedotmack--claude-mem/seguranca|seguranca]]"
---

# Mapa de decisão — thedotmack--claude-mem

- **slug:** thedotmack--claude-mem · **sha:** 3fe0725a · **rota:** A · **data:** 2026-06-26
- **Registro consultado:** `dados/registro-de-entidades.yaml` (566 linhas; 17 squads + skills). Alvo declarado: **dedalo/sistema**.
- **Sistema de memória atual da Kolden (baseline da comparação):** `MEMORY.md` por agente + skill `ritual-de-encerramento` + `.claude/agent-memory/`. É **estático e manual** (markdown escrito no fim da sessão pelo ritual). O claude-mem é **automático, daemonizado e com recuperação semântica** (captura por hook → compressão por SDK → SQLite/Chroma → reinjeção). **NÃO são equivalentes** — o claude-mem é uma arquitetura fundamentalmente mais poderosa, não um REUSE do que já temos. Por isso nenhum ID core marca REUSE.
- **Viés da missão:** quando o match não é limpo, preferir ADAPT/CREATE a REUSE.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | dedalo | Pipeline de memória por hooks é o salto que falta ao ritual-de-encerramento manual; absorver como padrão/reflexo de captura automática (sem a telemetria). |
| G2 | ADAPT | dedalo | Progressive disclosure em 3 camadas (search→timeline→get_observations) vira método de busca token-efficient para a memória do workspace. |
| G3 | CREATE | vendor / infra | Storage híbrido SQLite-FTS5 + Chroma é peça de infra (Kolden OS), não de squad; avaliar como serviço próprio antes de adotar. |
| G4 | CREATE | vendor / infra | Worker daemon HTTP + viewer é infra self-hosted; pertence ao plano Kolden OS (LobeHub/serviços), não ao plano de agentes. |
| G5 | ADAPT | dedalo | Degradação graciosa fail-open (hook nunca bloqueia o host) é regra de ouro para todo reflexo de hook que a Kolden escreve. |
| G6 | ADAPT | dedalo | Dedup por content-hash com janela temporal é padrão direto para evitar duplicação de entradas de memória. |
| G7 | ADAPT | egide | Tags `<private>` para excluir conteúdo sensível casam com a regra de segredos/LGPD do Egide. |
| G8 | ADAPT | dedalo | `mem-search` é o front-end natural da memória; adaptar como skill de consulta à memória do agente (substitui leitura manual de MEMORY.md). |
| G9 | ADAPT | dedalo | `smart-explore` (tree-sitter AST) é técnica de exploração de código token-otimizada reutilizável por qualquer agente de engenharia. |
| G10 | ADAPT | prometeu | `learn-codebase` (prime full-read) complementa o spec-driven do Prometeu / architect-first. |
| G11 | ADAPT | prometeu | `make-plan` sobrepõe ao spec-pipeline do Prometeu; absorver o Contrato de Reporte e a estrutura faseada como melhoria. |
| G12 | ADAPT | prometeu | `do` (executor de plano por subagentes) espelha o development-cycle; absorver o protocolo de evidência-por-fase. |
| G13 | ADAPT | prometeu | `pathfinder` (flowcharts + dedup + arquitetura unificada) reforça a fase de arquitetura/auditoria pré-refactor. |
| G14 | ADAPT | liceu | "Cérebros" filtrados de observações conversáveis casam com a Biblioteca de Mentes do Liceu (corpora por tema). |
| G15 | ADAPT | orfeu | Relatório narrativo de história de projeto é storytelling de dados → Orfeu. |
| G16 | ADAPT | orfeu | Digest serial com carry-forward entre subagentes é técnica de narrativa longa reutilizável (também útil ao método de lote do Caos). |
| G17 | ADAPT | dedalo | Reconciliação multi-worktree como chat de agentes — padrão próximo da Dike; absorver como skill de consolidação de branches. |
| G18 | ADAPT | dedalo | `babysit` (acompanhar PR até merge) é automação de CI/review direta do domínio do Dedalo. |
| G19 | ADAPT | argos | Clusterização de backlog de issues por causa-raiz é triagem/pesquisa estruturada → Argos (ou Dedalo para o lado eng). |
| G20 | ADAPT | harmonia | Auditoria de design por 10 princípios de Rams é UX/UI puro → Harmonia. |
| G21 | ADAPT | caliope | Breakdown plain-English de algo técnico é copy/didática → Caliope. |
| G22 | ADAPT | aglaia | Doc→deck de slides é criação visual → Aglaia; nota: depende do CLI NotebookLM (vendor externo). |
| G23 | ADAPT | dedalo | Workflow de release semântico de plugins Claude Code é exatamente o escopo CI/CD do Dedalo. |
| G24 | ADAPT | dedalo | Anti-pattern-czar (caça anti-padrões de error-handling) entra como skill de code-review do Dedalo/Egide. |
| G25 | ADAPT | dedalo | Modos de prompt configuráveis + i18n é padrão de design de prompt agnóstico aplicável aos agentes. |
| G26 | ADAPT | caos-fabrica | Contrato de Reporte de Subagente (fontes+achados+snippets+confiança) deve virar padrão de todos os especialistas que o Caos cria. |
| G27 | ADAPT | dedalo | Loop de restart com backoff + fila preservada é padrão de resiliência para qualquer reflexo/serviço local. |
| G28 | CREATE | vendor / hermes | Gateway OpenClaw com feeds Telegram/Discord/Slack overlapa o Hermes (runtime de gateways); avaliar como referência/integração, não como skill. |

## Síntese
- **Decisão dominante: ADAPT** (22 de 28 IDs). 4 CREATE (G3, G4, G28 = infra/vendor; e G3/G4 são o runtime pesado). 0 REUSE consciente — o sistema de memória atual da Kolden é estático e **não** cobre o que o claude-mem faz; marcar REUSE seria perda silenciosa.
- **Squad-alvo principal: dedalo** (G1,G2,G5,G6,G8,G9,G17,G18,G23,G24,G25,G27). Secundários: prometeu (G10-G13), orfeu (G15-G16), liceu (G14), harmonia (G20), caliope (G21), aglaia (G22), argos (G19), egide (G7), caos-fabrica (G26), vendor/infra (G3,G4,G28).
- **Recomendação de fronteira:** o **core de memória automática (G1+G2+G3+G4)** é meio framework, meio infra. A absorção plena do daemon (Bun+SQLite+Chroma+worker+viewer) é projeto do **Kolden OS (infra)**, não do plano de agentes — deve ser decidido pelo Ronan como item de infra. O que o Dedalo absorve de imediato, sem o runtime, são os **padrões** (G1,G2,G5,G6) e as **skills standalone** (G8,G9,G17,G18,G23,G24). Telemetria PostHog (G-nota de segurança) sai fora em qualquer caso.
