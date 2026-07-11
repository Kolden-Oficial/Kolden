---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/czlonkowski--n8n-mcp/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/czlonkowski--n8n-mcp/seguranca|seguranca]]"
---

# Mapa de decisão — czlonkowski--n8n-mcp (F4)

- **slug:** czlonkowski--n8n-mcp · **sha:** f5694cce54c26777e6c16d606eb6b90cd39f5f96 · **rota:** D
- Registro consultado: `dados/registro-de-entidades.yaml`. Sem entrada n8n/MCP de automação preexistente.
  Domínio `automacao` é coberto por **Dedalo** (keywords: claude-code, hooks, mcp, skills, automacao).
  Há precedente de absorção como **vendor inerte** (`vendor-scrapling`, `vendor-skyvern`, etc.).
- **Decisão dominante: CREATE (vendor/MCP inerte)**, atrelado ao domínio do Dedalo. As tools do MCP não
  viram agente; entram no catálogo como ferramenta consultável. Apenas o método de prompt (G12) é ADAPT.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | CREATE | vendor (dedalo/automacao) | Novo servidor MCP de automação n8n; registrar como `vendor-n8n-mcp`, inerte, ativado via config + Infisical. |
| G2 | CREATE | vendor | Descoberta/docs de nós n8n é capacidade do MCP; sem equivalente no registro. |
| G3 | CREATE | vendor | Validação de nó/workflow n8n é específica do MCP; sem match. |
| G4 | CREATE | vendor | Validador de expressão n8n é interno ao MCP; sem equivalente. |
| G5 | CREATE | vendor | Biblioteca de 2.352 templates n8n é dado/feature do vendor. |
| G6 | CREATE | vendor | CRUD de workflow via API n8n; sem capacidade equivalente no Kolden. |
| G7 | ADAPT | dedalo | Padrão de "update por diff economizando tokens" é técnica reaproveitável como nota/skill de eng. de agentes. |
| G8 | CREATE | vendor | Autofix de workflow é tool do MCP; sem match. |
| G9 | CREATE | vendor | Execução/health/audit de instância n8n; específico do vendor. |
| G10 | CREATE | vendor | Ops de instância (deploy/datatable/credenciais/versões); específico do vendor. |
| G11 | CREATE | vendor | Auto-documentação das tools é interna ao MCP. |
| G12 | ADAPT | dedalo | Playbook "Claude Project para n8n" (templates-first, validação multinível, never-trust-defaults) vira skill/nota de operação do Dedalo quando o n8n-mcp estiver no catálogo. |
| G13 | CREATE | referencias | Skills oficiais n8n vivem em repo externo; registrar como ponteiro de referência, não absorver código. |

**Resumo:** 10× CREATE-vendor (núcleo do MCP, inerte) + 2× ADAPT→dedalo (técnica de diff G7 e playbook G12) + 1× referência (G13). Sem REUSE — nada equivalente já existe (evita perda silenciosa). Ativação real do vendor exige instância n8n + API key via Infisical (consistente com §5/Art. VII); pendência de produto, não de absorção.
