---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/alirezarezvani--claude-skills/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/alirezarezvani--claude-skills/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática (F2) — alirezarezvani--claude-skills

- **slug:** alirezarezvani--claude-skills
- **sha:** 4a3c05b69e64f4925f7fc65c88890f614f79caf0
- **url:** https://github.com/alirezarezvani/claude-skills
- **rota:** A (coletânea de skills) — análise 100% estática, código NÃO executado
- **veredito:** **SAFE**

## Escopo
Repo gigante: 4.479 arquivos, ~346 skills canônicas em 17 domínios (top-level: `engineering`,
`engineering-team`, `c-level-advisor`, `marketing-skill`, `ra-qm-team`, `product-team`, etc.) +
**~579 tools Python** + ~700 docs de referência. As pastas ocultas `.gemini/` (418 SKILL.md),
`.codex/` (329), `.hermes/` (289), `.vibe/` (321) são **redistribuições multi-CLI das mesmas
skills canônicas** (o projeto se anuncia compatível com Claude Code, Codex, Gemini CLI, Cursor,
OpenClaw, Hermes Agent, Mistral Vibe). Não são capacidades novas — são espelhos.

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Licença MIT (Alireza Rezvani, 2025) — permissiva | LICENSE | info | sim |
| `eval(`/`exec(`/`os.system(` aparecem 176x mas como **padrões de detecção** (regex/substrings) | engineering/skills/skill-security-auditor/scripts/skill_security_auditor.py:125-579; engineering/security-guidance/hooks/security_reminder_hook.py:89-113 | baixa | sim (são skills de auditoria) |
| `curl ... \| bash` como string literal | engineering/skills/skill-security-auditor/references/threat-model.md:55,190 | baixa | sim (exemplo didático de ameaça, não executa) |
| Install script da própria coletânea (symlink-only: `find SKILL.md` + `ln -sf`) | scripts/openclaw-install.sh:1-40 | baixa | sim (instalador local benigno, sem rede) |
| Instrução de `curl ... \| bash` na doc do OpenClaw | docs/plugins/index.md:84 | média | NÃO-absorvível (não copiar este passo; reescrever instalação à moda Kolden) |
| "Secret" hardcoded = chave de exemplo da AWS `AKIAIOSFODNN7EXAMPLE` e fixtures de teste (`sk-1234...`) | engineering/skills/skill-tester/tests/test_security_scorer.py:118-274; terraform-patterns/.../tf_security_scanner.py:28; productivity/handoff/.../redaction_*.* | baixa | sim (fixtures/exemplos; nenhum segredo real) |
| Chamadas de rede `urllib/requests` (~14) só em tools de SEO/scrape/load-test, disparadas sob demanda com URL do usuário | marketing-skill/skills/{aeo,page-cro,seo-audit,site-architecture}/scripts/*.py; engineering-team/.../api_load_tester.py | baixa | sim (funcionalidade legítima da tool; inerte até invocada) |
| `.mcp.json` aponta para MCP `tessl` (stdio, comando externo `tessl mcp start`) | .mcp.json | baixa | NÃO-absorvível como está (dependência de vendor `tessl`; ignorar na absorção) |
| Sem `postinstall`/`preinstall` em qualquer package.json | — | — | — |
| Sem chaves/tokens reais, sem `BEGIN PRIVATE KEY` real, sem exfiltração de rede | — | — | — |

## Conclusão
Nenhum código que execute ou exfiltre por conta própria; os padrões "perigosos" são todos
detectores dentro de skills de **segurança/auditoria** ou exemplos didáticos isolados — classificados
como NÃO-ABSORVÍVEIS-COMO-CÓDIGO (Kolden reescreve a lógica em PT-BR, não copia os tools Python).
Veredito **SAFE**: pode avançar para mapeamento; ao absorver, descartar o passo `curl|bash` da doc
de install e a dependência do MCP `tessl`.
