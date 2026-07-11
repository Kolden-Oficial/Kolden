---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/anthropics--claude-code/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/anthropics--claude-code/seguranca|seguranca]]"
---

# Mapa de decisão (F4) — anthropics--claude-code

Comparado ao registro `dados/registro-de-entidades.yaml` e aos squads existentes. Viés autônomo: na ausência de match limpo item-a-item, prefere-se **ADAPT/CREATE** a REUSE (REUSE sem prova = perda silenciosa). Nenhum match foi limpo o bastante para REUSE — os equivalentes da Kolden cobrem o domínio, mas não a técnica específica deste material oficial da Anthropic.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | harmonia | Harmonia tem design-system/ui/ux, mas NÃO tem skill de direção estética anti-templated; entra como nova skill (alvo da planilha). |
| G2 | ADAPT | harmonia | Processo 2-passes (brainstorm→critique→build→critique) enriquece o fluxo do design-chief/visual-generator. |
| G3 | ADAPT | harmonia | Sistema de tokens compacto (paleta hex + papéis tipográficos + signature) complementa o design-system-architect (Atomic Design). |
| G4 | ADAPT | harmonia | Calibração anti-default de IA é checklist novo de originalidade para o visual-generator. |
| G5 | ADAPT | harmonia | UX writing como material de design; ponte com caliope (copy) via handoff, mas mora na skill de design da Harmonia. |
| G6 | ADAPT | harmonia | Restrição/autocrítica + piso de acessibilidade reforça o ui-engineer (responsivo, foco, reduced-motion). |
| G7 | ADAPT | caos-fabrica | Caos já tem `criacao-de-skill`; absorve progressive disclosure e gatilhos fortes da referência oficial. Espelho em Dedalo/skill-craftsman. |
| G8 | ADAPT | caos-fabrica | Enriquece `criacao-de-hooks` com a matriz completa de eventos e hooks prompt-based. Espelho em Dedalo/hooks-architect. |
| G9 | ADAPT | caos-fabrica | Enriquece `criacao-de-mcp` (que já encapsula mcp-builder) com tipos de servidor e bundling em plugin. Espelho em Dedalo/mcp-integrator. |
| G10 | ADAPT | dedalo | Sem equivalente Caos para slash commands; mora no domínio Claude Code do Dedalo (config-engineer). |
| G11 | ADAPT | caos-fabrica | Enriquece `criacao-de-subagent` com description-com-exemplos e separação agente×comando. |
| G12 | ADAPT | dedalo | Empacotamento de plugin Claude Code é capacidade nova; Dedalo é o dono do domínio Claude Code. |
| G13 | ADAPT | dedalo | Padrão `.local.md` para config por projeto — técnica nova de configuração, casa no Dedalo/config-engineer. |
| G14 | ADAPT | caos-fabrica | Geração assistida de agente sobrepõe ao Ritual + redator-de-prompts; absorver como técnica, não substituir o Ritual. |
| G15 | ADAPT | caos-fabrica | Validação de plugin reforça o `revisor`/checklist de qualidade do Caos. Espelho em Dedalo. |
| G16 | ADAPT | caos-fabrica | Revisão de qualidade de skill reforça `criacao-de-skill` + `revisor`. |
| G17 | ADAPT | dedalo | Workflow 8-fases de criar plugin = referência de processo para o claude-mastery-chief (análogo ao Ritual, escopo plugin). |
| G18 | ADAPT | dedalo | Scripts validadores viram reflexos/ferramentas de QA de plugin no Dedalo; reescrever em PT-BR. |
| G19 | ADAPT | dedalo | Engine de regras config-driven (regex de `.local.md`) é capacidade nova de hooks-sem-código; hooks-architect a absorve (engine pode ser vendorizada). |
| G20 | ADAPT | dedalo | Padrão de despachante de hook por evento complementa os reflexos do Dedalo. |
| G21 | ADAPT | dedalo | Sintaxe de regras hookify acompanha G19 como skill no Dedalo. |
| G22 | ADAPT | dedalo | Analisador de transcrição→sugestão de hooks é técnica nova; casa no hooks-architect (ou Caos/curador como variante). |

**Resumo:** 22 ADAPT, 0 REUSE, 0 CREATE puro. Decisão dominante = **ADAPT (MISTA por squad-alvo)**.
- **harmonia** ← G1–G6 (skill-alvo da planilha: direção estética distintiva + UX writing).
- **caos-fabrica** ← G7, G8, G9, G11, G14, G15, G16 (enriquece as skills `criacao-de-*` e o `revisor` com a referência oficial da Anthropic).
- **dedalo** ← G10, G12, G13, G17–G22 (domínio Claude Code: commands, packaging, settings, validação, hookify-engine).

> Nota de licença: material **proprietário Anthropic**. Toda absorção = **reescrita em PT-BR sem cópia literal**, uso interno, não redistribuir. Sinalizar ao curador na Fase 7.
