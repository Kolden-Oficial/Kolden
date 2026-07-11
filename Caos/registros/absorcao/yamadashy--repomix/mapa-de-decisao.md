---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/yamadashy--repomix/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/yamadashy--repomix/seguranca|seguranca]]"
---

# Mapa de decisão — yamadashy--repomix (F4)

**Decisão global:** repomix é uma **ferramenta CLI de terceiro madura (MIT)**, não uma capacidade
de agente. Absorção = **vendor inerte** registrado no ledger/catálogo de ferramentas, consumível
sob demanda via `npx repomix` / modo `--mcp`. Não há reescrita em squad. Consumidores naturais:
**dedalo** (eng. de agentes / Claude Code) e **prometeu** (eng. spec-driven) — quando precisarem
empacotar um repo inteiro como contexto para um LLM. Nenhum match item-a-item com capacidade
interna existente justifica REUSE em squad; nenhuma técnica isolada justifica CREATE de skill.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | REUSE | vendor | empacotar codebase é a função-núcleo da ferramenta; usar a CLI pronta, não reimplementar |
| G2 | REUSE | vendor | clone+pack de repo remoto já resolvido pela própria ferramenta (`--remote`) |
| G3 | REUSE | vendor | formatos de saída são feature interna da CLI; nada a absorver como skill |
| G4 | REUSE | vendor | contagem de tokens embutida na ferramenta; consumir via CLI |
| G5 | REUSE | vendor | checagem de segredos (secretlint) é built-in; egide pode citar a ferramenta, mas não absorve o código |
| G6 | REUSE | vendor | filtros include/ignore são parte da CLI |
| G7 | REUSE | vendor | compressão/Tree-sitter é interno da ferramenta |
| G8 | REUSE | vendor | git diff/log no output é feature da CLI |
| G9 | REUSE | vendor | servidor MCP já pronto; se útil, registra-se o MCP no catálogo (não vira agente) |
| G10 | REUSE | vendor | watch mode é feature da CLI |
| G11 | REUSE | vendor | geração de skill é experimental e proprietária da ferramenta; não absorver |
| G12 | REUSE | vendor | a própria CLI/config; usar como ferramenta externa |

**Conclusão:** decisão dominante = REUSE-como-vendor (ferramenta inerte). Ação de fechamento:
registrar no ledger `dados/repositorios-absorvidos.yaml` e, opcionalmente, no catálogo de
ferramentas como utilitário disponível a dedalo/prometeu. Zero escrita em squads.
