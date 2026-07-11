---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/auditoria/2026-06-28-vistoria-v2/_indice|_indice]]"
---

# 05 — Segurança de MCPs (Égide)

> Passo 5 do protocolo. Verificação dirigida a agentes/squads que declaram uso de MCPs ou são responsáveis pela auditoria de MCP.

## Égide — squad de cibersegurança (formato AIOX-legado)

### Estrutura
- `Egide/squad.yaml` (`name: cybersecurity v1.0.0`), 15 agentes em `Egide/agents/*.md`.
- **Skill-âncora**: `auditoria-de-seguranca-de-ia-e-mcp` (em `Egide/.claude/skills/auditoria-de-seguranca-de-ia-e-mcp/SKILL.md`), descrita no Explore B Fase 1.

### Cobertura de auditoria de MCP
A skill cobre 5 eixos ATLAS (tool poisoning, blindagem de invocação, injeção indireta, guardrails runtime, vazamento de system prompt). Aplica-se a **qualquer servidor MCP** antes de plugá-lo num agente.

### Análise estática do squad.yaml
- **`cross_cutting.veto` ausente** — confirmado K-008 (severidade CRÍTICO em squad de cibersegurança).
- Os 15 agentes:
  - **Mestres reais** (6): Peter Kim, Georgia Weidman, Jim Manico, Chris Sanders, Omar Santos, Marcus Carey.
  - **Persona funcionais** (8): command-generator, cartographer, busterer, dirber, fuzzer, ripper, rogue, shannon-runner.
  - **Tier 0**: cyber-chief.
- Workflows: `wf-incident-response.yaml`, `wf-pentest-engagement.yaml`.

## Catálogo de MCPs/Tools (referenciado, não auditado em profundidade)

Citado em `sobre-a-empresa/Ferramentas/registro-de-ferramentas.yaml` e `mcp-status.md` (não lido nesta auditoria; está fora do escopo de frota de agentes). A skill `auditoria-de-seguranca-de-ia-e-mcp` é o caminho para varredura individual.

## Achados de MCP

Nenhum achado **novo** específico de MCP nesta passada. Os achados relevantes já foram registrados:

- **K-008 (CRÍTICO)** — Égide sem `cross_cutting.veto` em squad.yaml. **Paradoxo**: o próprio squad que audita segurança de MCP não tem veto declarativo no manifesto. O risco prático é mitigado pela skill `auditoria-de-seguranca-de-ia-e-mcp` (que tem guardrails internos) e pelos reflexos do Caos (`bloqueio-de-quarentena.sh`), mas não há `veto` formal no nível do squad.yaml.
- **K-004 (BAIXO)** — Motor vendorizado `Argos/motor/skyvern/` tem grande superfície com referências a segredos em testes/SDK (não vazamento). Recomenda-se congelar SBOM/commit-hash do motor para auditoria de delta.

## Recomendação

1. Aplicar `cross_cutting.veto` ao `Egide/squad.yaml` com pelo menos:
   - `escopo_autorizado`: HALT em qualquer recomendação que envolva alvo fora do escopo autorizado (autorização escrita por engajamento).
   - `produzir_malware`: HALT em produção de exploit/malware executável fora de pesquisa defensiva controlada.
   - `credencial_texto_puro`: HALT (mesma regra global Infisical).
2. Congelar a SBOM dos motores vendorizados (Argos/motor, Skyvern, Crawlee, GPT-Researcher) e versionar como dependência de auditoria.
