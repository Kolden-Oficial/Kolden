---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/revfactory--harness/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/revfactory--harness/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática — revfactory--harness

- **slug:** revfactory--harness
- **sha:** cceac68ea1d0ad198ef4b7b906cd238375836387
- **rota:** A (skill/meta-skill)
- **veredito:** SAFE

O repositório é 100% documentação: um plugin/skill do Claude Code composto por Markdown
(`SKILL.md` + 6 `references/*.md`), metadados JSON (`plugin.json`, `marketplace.json`), READMEs
multilíngues, landing pages estáticas (`index.html`, `privacy.html`), 4 PNGs e exemplos de
artefato em `_workspace/`. **Não há nenhum código executável** — sem `scripts/`, `package.json`,
`.sh`, `.py`, `.js`, sem `postinstall`/`preinstall`, sem rede/exfiltração.

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Sem segredos/chaves hardcoded (nenhum `API_KEY`/`secret`/`BEGIN PRIVATE KEY` real) | — | nenhuma | n/a |
| Sem `eval`/`exec`/`child_process`/`subprocess`/`os.system`/`curl\|bash` | — | nenhuma | n/a |
| Sem hooks de instalação (não há `package.json`) | — | nenhuma | n/a |
| Palavra "token" em contexto benigno (contagem de tokens em JSON de exemplo) | skills/harness/references/skill-testing-guide.md:108; skill-writing-guide.md:253 | informativa | sim |
| Palavra "secret" em prosa de marketing ("dirty secret") | _workspace/02_content_launch_contents.md:378 | informativa | sim |
| Trigger words em coreano embutidos na `description` do SKILL.md (não é injeção; é o gatilho do plugin) | skills/harness/SKILL.md:3 | informativa | sim (reescrever em pt-BR) |

**Conclusão (1):** material puramente declarativo/instrucional; nenhum vetor de execução, exfiltração
ou credencial. Os padrões de risco buscados aparecem apenas como texto inerte.
**Conclusão (2):** liberado para leitura profunda e absorção como conhecimento (rota A). O conteúdo
está majoritariamente em coreano — a fase de aplicação deve reescrever em pt-BR, sem cópia literal.
