---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/anthropics--claude-code/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/anthropics--claude-code/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática (F2) — anthropics--claude-code

- **slug:** anthropics--claude-code
- **sha:** 01f1617f14452ac78bf319cef2236d87c0fe05cb
- **url:** https://github.com/anthropics/claude-code
- **rota:** A (skill/agente) — escopo: `plugins/frontend-design` (alvo) + `plugins/plugin-dev` e `plugins/hookify` (bônus)
- **veredito:** **SAFE**
- **método:** análise 100% estática (Read/Grep/Glob/ls). Nenhum código executado. Web desativada.

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Skill `frontend-design` é markdown puro (orientação de design); zero código | frontend-design/skills/frontend-design/SKILL.md | nenhuma | sim |
| Padrões `(eval\|exec)\(` aparecem como **exemplos de regex de detecção** (regras hookify p/ alertar uso em código do usuário), não como chamadas reais | hookify/README.md:138, hookify/commands/help.md:129, hookify/skills/writing-rules/SKILL.md:249 | informativa | sim (são dado documental) |
| Engine Python do hookify usa só stdlib (`os, sys, glob, re, json, functools, dataclasses`); lê config local `.claude/hookify.*.local.md` e aplica regex a inputs de tool | hookify/core/config_loader.py, hookify/core/rule_engine.py | baixa | sim |
| Sem rede, sem `subprocess`, sem `exec/eval` reais, sem `socket/urllib/requests` em todo o Python do hookify | hookify/core/*, hookify/hooks/* | nenhuma | sim |
| Hooks do hookify só despacham `python3 ${CLAUDE_PLUGIN_ROOT}/hooks/*.py` (timeout 10s), sem download nem shell externo | hookify/hooks/hooks.json | baixa | sim (revisar antes de plugar) |
| Scripts `.sh` do plugin-dev são validadores/linters (validate-agent.sh, validate-hook-schema.sh, hook-linter.sh); único `chmod +x` é em string de mensagem de aviso | plugin-dev/skills/**/scripts/*.sh | baixa | sim |
| Nenhum segredo/chave hardcoded; nenhum `postinstall`/`preinstall`; nenhum `curl\|bash`/`wget\|sh` | (varredura em frontend-design, plugin-dev, hookify) | nenhuma | — |
| **Licença proprietária**: `© Anthropic PBC. All rights reserved` — sujeita aos *Commercial Terms of Service* da Anthropic (NÃO é open-source) | LICENSE.md:1 | média (jurídica, não técnica) | sim p/ uso interno; ressalva de redistribuição |

## Conclusão
Conteúdo do escopo é benigno: documentação/skills em markdown, Python de stdlib que apenas lê config local e aplica regex, e shell scripts de validação — sem execução remota, exfiltração, segredos ou hooks de install. Risco real é **jurídico, não técnico**: é software proprietário da Anthropic (toolkit oficial do Claude Code, do qual a Kolden é usuária); padrões absorvidos devem ser **reescritos em PT-BR** (sem cópia literal) e tratados como referência interna, não redistribuída.
Veredito **SAFE** — liberado para F3/F4; sinalizar a licença proprietária na procedência e ao curador.
