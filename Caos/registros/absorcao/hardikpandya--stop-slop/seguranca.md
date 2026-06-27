# F2 — Segurança estática · hardikpandya--stop-slop

- **slug:** hardikpandya--stop-slop
- **sha:** 8da1f030185bdfe8471220585162991eaeb970e9
- **rota:** A (skill/agente)
- **veredito:** SAFE

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Repositório é 100% Markdown + LICENSE — nenhum arquivo executável (.js/.py/.sh/.json/package.json) | (árvore inteira) | nenhuma | n/a |
| Sem segredos/chaves hardcoded (nenhum `API_KEY`, `secret`, `token`, `BEGIN PRIVATE KEY`) | — | nenhuma | n/a |
| Sem código perigoso (nenhum `eval`/`exec`/`child_process`/`os.system`/`subprocess`/`curl\|bash`) | — | nenhuma | n/a |
| Sem hooks de install (não há `package.json`, logo sem `postinstall`/`preinstall`) | — | nenhuma | n/a |
| Sem exfiltração de rede | — | nenhuma | n/a |
| Listas de frases "a evitar" (ex.: "Let me be clear", "ignore-the-runway") são alvos de edição de prosa, NÃO instruções de prompt-injection; nenhum padrão `ignore previous instructions`/`<system>`/jailbreak | references/phrases.md, references/structures.md | informativa | sim (como dado de edição) |
| Imagem externa embedada via URL do GitHub user-attachments (apenas exibição no README) | README.md:5 | baixa | não-absorvível (descartar a tag img) |
| Licença MIT permissiva — atribuição obrigatória, compatível com absorção | LICENSE:1-3 | nenhuma | sim |

## Conclusão

Conteúdo inerte: documentação de uma skill de edição de prosa em Markdown, sem qualquer vetor de execução, exfiltração ou injeção. Não é dado hostil (rota C) — as listas de frases são material de edição, não comandos.

Veredito **SAFE**. Único cuidado de absorção é cosmético: descartar a tag `<img>` de URL externa no README ao reescrever em PT-BR; o resto entra sem ressalva de segurança.
