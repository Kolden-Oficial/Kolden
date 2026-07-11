---
id: ferramentas-notebooklm
titulo: "NotebookLM — extração de conteúdo de notebooks Google"
resumo: "Vendor inerte (SDK Python notebooklm-py) para extrair fontes de notebooks NotebookLM via cookie de sessão. Não é MCP; é biblioteca consumida pelo Kolden em batch."
categoria: ferramenta
palavras-chave: [notebooklm, extracao, conhecimento, google, sdk, python, cookie]
status: oficial
atualizado-em: 2026-06-30
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/_historico/notas/aiox-kolden/claude-code-notebooklm-superclaude|claude-code-notebooklm-superclaude]]"
---

# NotebookLM — vendor de extração de conhecimento

> Google NotebookLM concentra fontes de pesquisa (PDF, Doc, URL, YouTube, áudio, texto) e gera notas/respostas com IA. **NÃO tem API pública oficial** — o produto usa endpoint interno `batchexecute`. Existe ecossistema não-oficial que automatiza via cookie de sessão da conta logada.

## O que entrou no Kolden

| Camada | Item | Caminho |
|---|---|---|
| **SDK** | `notebooklm-py` (teng-lin, MIT) | instalado via `uv tool install "notebooklm-py[cookies]"` |
| **Auth** | `storage_state.json` extraído do Chrome via `rookiepy` | Infisical `/kolden/prod/NOTEBOOKLM_STORAGE_STATE` |
| **Scripts** | `bootstrap_auth.py`, `verify_auth.py`, `extract_all.py` | `sobre-a-empresa/Ferramentas/NotebookLM/scripts/` |
| **Mapeamento** | 32 notebooks → destinos no Kolden | `mapeamento.yaml` |
| **Conteúdo extraído** | ~1.030 fontes em markdown | `clientes/*/_notebooklm/` + `_conhecimento-institucional/` |
| **Log** | Extração datada | `registros/` |

## Por que não é MCP

O ecossistema tem alternativa `notebooklm-mcp-cli` (jacob-bd) que roda como MCP server. Avaliada e **descartada para esta passada** — a extração é batch único de ~1h, não uso contínuo. Se o Hermes Chief precisar consultar NotebookLM dinamicamente um dia, adicionamos o MCP num F2 separado (decisão registrada no plano `notebooklm-extracao-massiva-2026-06-30.md`).

## Status de uso

| Item | Status |
|---|---|
| SDK instalado globalmente via `uv tool` | ✅ |
| Cookie de sessão no Infisical | ✅ |
| 32 notebooks mapeados | ✅ |
| ~1.030 fontes extraídas | ✅ (sessão 2026-06-30 effervescent-eagle) |
| Refresh automático de cookie | ⏳ tarefa nova no radar (KLD-2026-135) |

## Como usar

### Extração única (já feita, idempotente)

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  python sobre-a-empresa/Ferramentas/NotebookLM/scripts/extract_all.py
```

### Verificar autenticação (cookie ainda válido)

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  python sobre-a-empresa/Ferramentas/NotebookLM/scripts/verify_auth.py
```

Retorna a contagem de notebooks. Se < 30 ou der `RPCError: session expired`, refresh do cookie.

### Refresh do cookie (quando expirar)

1. **Garanta que o Chrome do Ronan está logado** em https://notebooklm.google.com.
2. Rodar:

```bash
python sobre-a-empresa/Ferramentas/NotebookLM/scripts/bootstrap_auth.py
```

3. O script extrai cookies do Chrome via `rookiepy`, gera `~/.kolden/notebooklm/storage_state.json`, e faz upload para Infisical automaticamente.

## API do SDK (resumo do que usamos)

| Método | Função |
|---|---|
| `client.notebooks.list()` | Lista todos os notebooks da conta |
| `client.sources.list(notebook_id)` | Lista todas as fontes de um notebook |
| `client.sources.get_fulltext(nb_id, src_id, output_format="markdown")` | Conteúdo completo da fonte em markdown |
| `client.sources.get_guide(nb_id, src_id)` | Summary AI-gerado + keywords da fonte |
| `notebooklm.artifacts.with_rate_limit_retry(fn, max_retries=3)` | Wrapper de retry para 429 |

Doc oficial do SDK: https://github.com/teng-lin/notebooklm-py

## Erros conhecidos

| Erro | Causa | Fix |
|---|---|---|
| `RPCError: session expired` | Cookie do Chrome rotacionou ou expirou | Rodar `bootstrap_auth.py` |
| `RPCError: rate limit` | Muitas chamadas concorrentes | `with_rate_limit_retry` absorve; reduzir paralelismo se persistir |
| `SourceNotFoundError` | Source foi apagada do notebook entre `list` e `get_fulltext` | Log + segue |
| `infisical.exe` bloqueado pelo SAC | Smart App Control bloqueia binário não-assinado | Usar shim `~/.claude/infisical-shim.cjs` (memória existente) |

## ToS e soberania

NotebookLM **não oferece API pública**, automação via `batchexecute` é zona cinza dos ToS Google. Para **uso próprio na própria conta**, risco operacional baixo. Política Kolden:

- Cookie de sessão NUNCA versionado (vai pro Infisical).
- Material extraído pertence ao Ronan (foi ele que subiu para os notebooks).
- Plano B se Google bloquear no futuro: export manual via UI do NotebookLM, source por source.

## Path Infisical

| Chave | Conteúdo |
|---|---|
| `/kolden/prod/NOTEBOOKLM_STORAGE_STATE` | JSON inline do storage_state (cookies + origins do Google). ~10KB. |

Constituição Art. VII aplica: **zero credencial em texto puro fora do Infisical**.

## Vendor metadata

| Campo | Valor |
|---|---|
| Nome canônico | NotebookLM |
| Tipo | SDK Python (vendor inerte, consumido via `uv tool`) |
| Não é MCP | sim — alternativa `notebooklm-mcp-cli` em escopo separado |
| Licença SDK | MIT (teng-lin/notebooklm-py) |
| Autenticação | cookie de sessão (zona cinza ToS) |
| MCP status | ❌ não conectado (sem necessidade nesta passada) |
| Integração Kolden | scripts em `Ferramentas/NotebookLM/scripts/`, conteúdo em `clientes/*/_notebooklm/` + `_conhecimento-institucional/` |
