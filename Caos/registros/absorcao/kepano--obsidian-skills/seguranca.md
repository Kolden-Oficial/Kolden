# Segurança estática — kepano--obsidian-skills

- **slug:** kepano--obsidian-skills
- **sha:** a1dc48e68138490d522c04cbf5822214c6eb1202
- **url:** https://github.com/kepano/obsidian-skills
- **rota:** A (skill/agente)
- **data:** 2026-06-26
- **veredito:** **SAFE**

Repositório é um *plugin de Agent Skills* para Obsidian (autor Steph Ango / @kepano). Conteúdo
100% documentação: 5 `SKILL.md` + 5 arquivos de referência (`.md`) + 2 manifestos (`plugin.json`,
`marketplace.json`) + `README.md` + `LICENSE`. **Nenhum arquivo executável** (sem `.js`, `.py`,
`.sh`, sem `package.json` com scripts). Nada roda na absorção. Análise 100% estática (Read/Grep).

| achado | arquivo:linha | severidade | absorvível? |
|--------|---------------|------------|-------------|
| `obsidian eval code="…"` — roda JS no contexto do app Obsidian (comando de dev da CLI oficial) | skills/obsidian-cli/SKILL.md:91 | baixa | sim (instrução de skill; exige Obsidian aberto + CLI do usuário; não é código do repo) |
| `obsidian dev:*` (errors/screenshot/dom/console/css/mobile) — controles de debug da CLI oficial | skills/obsidian-cli/SKILL.md:64-106 | baixa | sim (capacidade de dev de plugin; sem exfiltração) |
| `npm install -g defuddle` — instala CLI de terceiro se ausente | skills/defuddle/SKILL.md:10 | baixa | sim (instrução condicional; pacote público, não fixado por versão/hash) |
| `defuddle parse <url>` — busca rede para extrair conteúdo de páginas | skills/defuddle/SKILL.md:12-32 | baixa | sim (leitura web legítima, equivalente a WebFetch) |
| Manifestos de plugin (name/version/keywords) | .claude-plugin/*.json | nenhuma | sim (metadados benignos) |

Sem segredos/chaves hardcoded, sem `child_process`/`os.system`/`subprocess`, sem `curl|bash`,
sem `postinstall`/`preinstall`, sem exfiltração de rede, sem padrões de injeção de prompt. As únicas
"execuções" citadas são comandos de CLIs externas e oficiais (Obsidian CLI, Defuddle), descritos como
instruções de skill — padrão normal de Agent Skill, não código malicioso embutido.

**Conclusão (1):** Veredito SAFE — pacote de skills declarativo, sem código que execute ou exfiltre.
**Conclusão (2):** Ao absorver, manter a regra Kolden: comandos de CLI (defuddle/obsidian) ficam
documentados em `ferramentas.md` do agente-alvo e nunca instalam/rodam nada sem ação explícita.
