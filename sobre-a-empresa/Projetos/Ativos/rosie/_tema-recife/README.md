---
tipo: projeto
area: rosie
relacionado:
  - "[[sobre-a-empresa/Ferramentas/Nuvemshop/ferramentas|Nuvemshop CLI]]"
---

# Tema Recife — Rosie (Nuvemshop)

Workspace local do tema **Recife** (legado, sincronizado via FTP) da loja https://rosieiadoreyou.com.br.

- `codigo/` — arquivos do tema baixados pelo Nuvemshop CLI. **Não versionado** (`.gitignore`): é cópia do servidor, rebaixar quando precisar.
- `_backup/` — snapshots manuais antes de mudanças grandes. Versionado.

## Operar

Ver [`Ferramentas/Nuvemshop/ferramentas.md`](../../../../Ferramentas/Nuvemshop/ferramentas.md). Resumo:

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  node sobre-a-empresa/Ferramentas/Nuvemshop/nuvemshop-tema.cjs rosie pull
```

> ⚠️ `push` no modo FTP é **produção imediata** e **apaga do servidor** o que não existir em `codigo/`. Rodar `diff` antes e só fazer push a partir de um `pull` recente.

## Customizações Kolden

Fonte versionada em `../customizacoes-tema/` (fora de `codigo/`, que é cópia do servidor).

| Customização | Arquivos no tema | Como aplicar |
|---|---|---|
| Atribuição de WhatsApp Solomon (cliques em `wa.me`/`api.whatsapp.com` passam pelo redirecionador da Solomon com UTMs + `sol_id`) | `snipplets/rosie-whatsapp-solomon.tpl` + include antes do `</body>` em `layouts/layout.tpl` | `node sobre-a-empresa/Projetos/Ativos/rosie/customizacoes-tema/aplicar-whatsapp-solomon.cjs` → `diff` → `push` |

Pendência: o redirecionador da Solomon está em `test-whatsapp-…run.app` — confirmar com a Solomon se é o endpoint definitivo.

## Contexto

- Carrinho 100% client-side, sem deep-link de carrinho: `../status.md` (2026-08-18) e `../_crawl-2026-08-18/`.
- Gap visual site × brandbook (cor Rose `#E6D2DC`, DM Sans, preto `#14100C`): `../brandbook/03-identidade-visual/06-gap-site-vs-manual.md`.
