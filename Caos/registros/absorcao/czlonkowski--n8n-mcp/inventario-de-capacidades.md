---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/czlonkowski--n8n-mcp/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/czlonkowski--n8n-mcp/seguranca|seguranca]]"
---

# Inventário de capacidades — czlonkowski--n8n-mcp (rota D, enxuto)

- **slug:** czlonkowski--n8n-mcp · **sha:** f5694cce54c26777e6c16d606eb6b90cd39f5f96 · **rota:** D
- Capacidade-alvo: **servidor MCP que ensina/permite a IA construir, validar e fazer deploy de workflows n8n**.
- Inventário ENXUTO: agrupa as ~24 tools do MCP por função. Nós/templates do n8n (2.063 nós, 2.352 templates) são **dados embarcados** do vendor, não capacidades próprias do Kolden.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Servidor MCP n8n-mcp (stdio + HTTP single-session): superfície completa de tools sobre nós/workflows do n8n | codigo-mcp | n8n, mcp, workflow, automacao, vendor | automacao | src/mcp/server.ts; src/mcp/index.ts:1 |
| G2 | Descoberta de nós: `search_nodes` (OR/AND/FUZZY, filtro core/community/verified) + `get_node` (detalhe minimal/standard/full, docs, search_properties, versões) | codigo-mcp | busca-nó, node-discovery, docs, n8n | automacao | src/mcp/tools.ts:35,81 |
| G3 | Validação em camadas: `validate_node` (minimal→full) e `validate_workflow` (estrutura/conexões/expressões) — perfis minimal/runtime/ai-friendly/strict | codigo-mcp | validacao, workflow, n8n, lint | automacao | src/mcp/tools.ts:139,349; src/services/workflow-validator.ts |
| G4 | Validador de sintaxe de expressões n8n (`{{ }}`, $node, $json) | metodo-prompt | expressao, n8n, validacao | automacao | src/services/expression-validator.ts |
| G5 | Biblioteca de templates: `search_templates` (by_metadata/by_task/by_node, complexidade) + `get_template` — 2.352 workflows com metadados de IA | codigo-mcp | template, workflow, exemplo, n8n | automacao | src/mcp/tools.ts:224,249; src/templates/ |
| G6 | Gestão de workflows na instância n8n (requer API): create/get/list/delete + update full/partial | codigo-mcp | n8n-api, workflow, crud, deploy | automacao | src/mcp/tools-n8n-manager.ts:12,82,121,162,200,220 |
| G7 | Motor de update incremental por diff (operações de diff; economiza ~80-90% de tokens em updates) | metodo-prompt | diff, patch, token-eficiente, workflow | automacao | src/mcp/handlers-workflow-diff.ts; tools-n8n-manager.ts:162 |
| G8 | `n8n_autofix_workflow` — correção automática de problemas detectados na validação | codigo-mcp | autofix, validacao, workflow | automacao | src/mcp/tools-n8n-manager.ts:303 |
| G9 | Execução/observabilidade: `n8n_test_workflow`, `n8n_executions`, `n8n_health_check`, `n8n_audit_instance` | codigo-mcp | execucao, teste, health, auditoria, n8n | automacao | src/mcp/tools-n8n-manager.ts:347,408,498,731 |
| G10 | Ops de instância: `n8n_deploy_template`, `n8n_manage_datatable`, `n8n_manage_credentials`, `n8n_generate_workflow`, `n8n_workflow_versions` | codigo-mcp | deploy, datatable, credenciais, versionamento, n8n | automacao | src/mcp/tools-n8n-manager.ts:523,580,619,667,691 |
| G11 | `tools_documentation` — sistema de auto-documentação das tools do MCP (quick start + full) | codigo-mcp | documentacao, mcp, onboarding | automacao | src/mcp/tools.ts:11; tools-documentation.ts |
| G12 | Método de prompt: "Claude Project system instructions" para construir workflows n8n (templates-first, validação multinível, never-trust-defaults) | metodo-prompt | prompt, n8n, workflow-building, playbook | automacao | README.md:93-160 |
| G13 | Claude Skills oficiais para n8n (repo externo n8n-skills) — referenciadas, **não incluídas** neste repo | referencia | skill, n8n, externo | automacao | README.md:81-87 |

**Fora do escopo (rota D, marcado):** ~5.418 testes, scripts de rebuild/fetch de DB, infra Docker/Railway, parser/loader interno dos pacotes n8n, schema SQLite/FTS5 — são maquinaria do vendor, não capacidades reaproveitáveis isoladamente. G13 aponta para repo externo (não absorvível aqui).
