# Repomix — Referência de Uso (vendor inerte)

**Repomix** é uma CLI (Node/TypeScript) que empacota um repositório inteiro em **um único arquivo
AI-friendly** (XML/Markdown/JSON/plain) para alimentar um LLM como contexto. Faz contagem de tokens,
filtro de arquivos (`.gitignore`/include/ignore), compressão por Tree-sitter (remove comentários/linhas
vazias), inclusão de `git diff`/log, verificação de segredos (secretlint) e empacotamento de repo remoto.
Também expõe um **modo servidor MCP** (`--mcp`). Categoria: Engenharia / contexto-para-LLM.

> **Status:** `vendor-registrado (não instalado)`. Ferramenta de terceiro madura, consumível sob
> demanda; **nada foi instalado nem o código foi copiado** para a Kolden. O código analisado vive na
> quarentena gitignored (`Caos/_staging/quarentena/yamadashy--repomix/`) e não é executado de lá.

---

## Como consumir (NÃO copiar o código)

A ferramenta é consumida pela CLI publicada no npm — sem instalação permanente, via `npx`:

```bash
# Empacotar o repositório atual em um arquivo único (default: repomix-output.xml)
npx repomix@latest

# Escolher formato e ver a árvore de tokens
npx repomix@latest --style markdown --token-count-tree

# Empacotar um repo remoto sem cloná-lo manualmente
npx repomix@latest --remote yamadashy/repomix --remote-branch main

# Comprimir (remove comentários/linhas vazias via Tree-sitter) + incluir git diff
npx repomix@latest --compress --include-diffs

# Gerar config local (repomix.config.json)
npx repomix@latest --init
```

### Modo MCP (opcional)
O Repomix expõe um servidor MCP (`npx repomix --mcp`) com tools como `pack_codebase`,
`pack_remote_repository`, leitura/grep do output empacotado e `generate_skill` (experimental).
Útil para **Dédalo** (eng. de agentes/Claude Code) e **Prometeu** (eng. spec-driven) quando
precisarem dar um repo inteiro como contexto a um LLM. Registrar no `mcp-status.md` se/quando ativado:

```bash
claude mcp add --scope user repomix -- npx -y repomix --mcp
```

---

## Licença + procedência

| Campo | Valor |
|-------|-------|
| Licença | **MIT** (Copyright 2024 Kazuki Yamada) |
| Repositório | https://github.com/yamadashy/repomix |
| SHA analisado | `f04db0088ec00969436a0878bdae8f43176f9e11` |
| Veredito de segurança (F2) | **SAFE** — sem `postinstall`, sem `eval`/`os.system`, sem segredos; `child_process`/rede só em usos legítimos e documentados (`git`, clipboard `--copy`, `--remote`, pool de workers) |

---

## Ressalvas (soberania / gates / Infisical)

- **Soberania:** roda 100% local. O modo `--remote` baixa um tarball do GitHub e o `--mcp` é local —
  nenhuma dependência de SaaS. Alinhado à filosofia Kolden.
- **Segredos:** Repomix tem checagem de segredos embutida (secretlint) **ligada por padrão**;
  não desligar (`--no-security-check`) ao empacotar repos que possam conter `.env`/chaves.
- **Sem credencial Infisical** — a ferramenta não exige API key.
- **Não executar a partir da quarentena.** Consumir só via `npx repomix` quando o operador quiser.

---

## Notas Kolden

- Consumidores naturais: **Dédalo** e **Prometeu** (empacotar codebase como contexto de LLM).
- A checagem de segredos (G5/secretlint) é uma referência de boa prática para o **Égide**, mas a
  Kolden **não absorve o código** — apenas cita a ferramenta.
- Vendor inerte: nenhuma capacidade virou skill/agente Kolden nesta absorção (decisão F4 = REUSE-como-vendor).

---

> Atribuição: técnica e descrição derivadas de `yamadashy/repomix`@`f04db00` (MIT). Sem cópia de código —
> apenas a superfície de uso (CLI/MCP) está documentada aqui para consumo externo.
