# Segurança estática — yamadashy--repomix

- **slug:** yamadashy--repomix
- **sha:** f04db0088ec00969436a0878bdae8f43176f9e11
- **url:** https://github.com/yamadashy/repomix
- **rota:** B (ferramenta/vendor)
- **veredito:** **SAFE**

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `execFile` para invocar `git` (sem shell) | src/core/git/gitCommand.ts:1 | info | n/a (uso legítimo, sem injeção de shell) |
| `spawn('wl-copy')` p/ clipboard Linux (Wayland) | src/core/packager/copyToClipboardIfEnabled.ts:1,19 | info | n/a (cópia opt-in via `--copy`) |
| `child_process` em pool de workers (tinypool) p/ paralelismo | src/shared/processConcurrency.ts:71+ | info | n/a (concorrência, sem comando externo) |
| `fetch` de tarball do GitHub (download do repo remoto) | src/core/git/gitHubArchive.ts:121 | baixa | n/a (rede esperada do recurso `--remote`) |
| `git clone` de repo remoto | src/core/git/gitRepositoryHandle.ts | baixa | n/a (comportamento central do `--remote`, documentado) |
| Sem `postinstall`/`preinstall`/`prepublish` | package.json | info | — (nenhum hook de install) |
| Sem `eval(`, sem `os.system`, sem `curl\|bash`, sem segredos hardcoded | src/ (grep) | info | — |

Conclusão (linha 1): ferramenta madura e popular (repomix, MIT, autor Kazuki Yamada); todo uso de `child_process`/rede é legítimo e atrelado a recursos documentados (`git`, clipboard, `--remote`, workers). Nenhum hook de instalação, nenhuma exfiltração, nenhum segredo.
Conclusão (linha 2): SAFE para absorção como **vendor inerte** (não executar dentro da quarentena; consumir só via `npx repomix` quando/se o operador quiser).
