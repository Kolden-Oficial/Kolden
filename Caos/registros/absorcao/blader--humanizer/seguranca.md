---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/blader--humanizer/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/blader--humanizer/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática — blader--humanizer

- **slug:** blader--humanizer
- **sha:** 9600f2b7241cb4eed6ad803abee5ea01d67fe8e4
- **url:** https://github.com/blader/humanizer
- **rota:** A (skill/agente)
- **data:** 2026-06-26
- **veredito:** SAFE

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Nenhum segredo/chave hardcoded (grep `api_key\|secret\|token\|BEGIN PRIVATE KEY` sem hits) | — | nenhuma | n/a |
| Nenhum código executável (sem `eval\|exec\|child_process\|os.system\|subprocess`; 0 arquivos `.js/.py/.sh`) | — | nenhuma | n/a |
| Nenhum hook de install (`postinstall`/`preinstall`); não há `package.json` | — | nenhuma | n/a |
| Nenhum download+exec / `curl\|bash` / exfiltração de rede | — | nenhuma | n/a |
| Nenhum padrão de injeção de prompt (`ignore previous`, `<system>`, jailbreak) | — | nenhuma | n/a |
| `allowed-tools` da skill inclui Write/Edit (capacidade de escrita em disco) | SKILL.md:13-19 | baixa | sim (editor de texto; comportamento esperado de skill de reescrita) |
| Links externos para Wikipedia (referência declarada, sem fetch automático) | SKILL.md:619, README.md:181-182 | informativa | sim |

## Conclusão

Repositório 100% Markdown (`AGENTS.md`, `README.md`, `SKILL.md`, `LICENSE`) — nenhum código a executar, nenhum binário, nenhum segredo, nenhuma rede. É uma skill declarativa de Claude Code/OpenCode que reescreve texto para remover "tells" de IA; o único poder real é editar arquivos de texto via tools nativas do harness.
Veredito **SAFE**: pode seguir para inventário e mapeamento sem ressalvas de segurança.
