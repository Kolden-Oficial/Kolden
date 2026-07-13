---
tipo: nota
area: Themis
up: "[[Themis/_MOC-themis]]"
relacionado:
  - "[[Themis/prd-de-ia|prd-de-ia]]"
---

# Ferramentas — Themis

> Catálogo de tools do squad. Art. IV/X: MCP-nativo; grounding para fato datável. Sem wrapper proprietário.

## 1. MCP direto (Camada 1)
Nenhum. O `themis-chief` (Camada 5 consultivo) opera sobre a questão estratégica e sintetiza — não consome MCP diretamente. Fatos datáveis citados por um conselheiro exigem grounding (Art. X).

## 2. Skills-como-tools (`.claude/skills/`)
| Skill | Função | grounding |
|---|---|---|
| `framework-gdpr-lgpd` | Referência de conformidade GDPR/LGPD para aconselhamento regulatório (analista-de-compliance-regulatorio) | required (norma datável) |
| `gerador-de-politica-de-privacidade` | Gera política de privacidade a partir de parâmetros | n/a |
| `revisao-de-contratos-com-risco` | Revisa contrato apontando cláusulas de risco | n/a |

Catálogo completo: `.claude/skills/catalogo.md`.

## 3. Componentes vendor (advisory-board) — INTOCÁVEIS
7 tasks (`convene-board`, `diagnose`, `evaluate-scaling`, `get-founder-counsel`, `resolve-culture-crisis`, `review`, `seek-investment-counsel`) + 2 workflows (`wf-board-meeting`, `wf-decision-framework`) + 2 catálogos de dados (`mental-models-catalog.yaml`, `routing-catalog.yaml`). Fronteira E1 (Art. XI).

*Catálogo lavrado na Onda 6 do METODO 2026-07-13.*
