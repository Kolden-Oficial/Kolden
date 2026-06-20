---
name: vigia-de-ecossistema
description: Engine de varredura do estado da arte de IA — novos MCPs, ferramentas, modelos dos principais labs, comunidade (HN/Reddit/X), GitHub e newsletters. Use no comando /vigia (digest agendado) e no pesquisador (Fase 2) para construir sobre dados ao vivo. Produz um digest datado e atualiza o retrato vivo dados/estado-da-arte.md. Achados com score ≥8 são salvos em referencias/.
---

# Vigia de Ecossistema

Conhecimento compartilhado de como varrer o estado da arte de IA com fontes públicas
(OSINT), com profundidade e citando origem. O catálogo detalhado de fontes por frente está
em `contexto.md` (carregue-o ao executar). Esta engine é consumida por dois lugares:
- **Especialista `vigia`** (comando `/vigia`) — varredura completa → digest + retrato vivo.
- **Especialista `pesquisador`** (Fase 2) — leitura do retrato vivo + busca ao vivo dirigida.

## As 4 frentes e a ferramenta de cada
1. **Modelos & labs** — lançamentos, model cards, preços, benchmarks. Ferramentas:
   `mcp__claude_ai_Hugging_Face__paper_search` e busca de repos/modelos em alta; Exa
   (`web_search_exa`) para blogs oficiais; WebFetch nas páginas de release/preço.
2. **MCPs & ferramentas** — novos servidores MCP e frameworks de agente. Ferramentas:
   `gh` CLI (`gh search repos`, `gh release list`) e Exa nos registries (mcp.so, Smithery, Glama).
3. **Comunidade** — o que ferve. Ferramentas: WebFetch na API do Hacker News
   (`https://hn.algolia.com/api/v1/search?query=...&tags=story`), `.json` do Reddit
   (r/LocalLLaMA), e Exa para X/Twitter e discussões.
4. **GitHub & newsletters** — trending/releases de repos-chave (`gh`) e newsletters de
   referência via WebFetch (ver lista em `contexto.md`).

## Princípios de rigor (herdados do pesquisador)
- Cada item carrega **fonte + data + link**. Sem data, não entra (estado da arte é perecível).
- Gradue: **consolidado** (anúncio oficial/release) vs **boato** (rumor de fórum/X).
- Declare lacunas: "não encontrei confirmação oficial de X" é saída válida.
- Nada de dados privados ou acesso não autorizado — só fontes públicas.

## Modo de operação
- **Completo** (`/vigia`): varre as 4 frentes.
- **Focado** (`/vigia <frente>`): varre só `modelos`, `mcp`, `comunidade` ou `github`.
- **Diff:** compare com o `dados/estado-da-arte.md` atual e destaque só o que MUDOU desde a
  última varredura (cuja data está no rodapé do retrato vivo).

## Saída 1 — Digest datado (`registros/vigia/AAAA-MM-DD.md`)
```
# Vigia — AAAA-MM-DD

## TL;DR (top 5 mudanças)
1. <mudança> — <por que importa> — [fonte](link)

## Modelos & labs
| Item | O que é | Por que importa | Fonte + data | Evidência |
## MCPs & ferramentas
| ... |
## Comunidade
| ... |
## GitHub & newsletters
| ... |

## Implicações para o Kolden
- <qual MCP/modelo/ferramenta a fábrica deveria adotar ou avaliar, e por quê>

## Lacunas / a confirmar
- <o que não foi possível verificar>
```

## Saída 2 — Atualizar o retrato vivo (`dados/estado-da-arte.md`)
Sobrescreva as seções com o estado consolidado mais recente (modelos recomendados por tarefa,
MCPs/ferramentas notáveis, padrões emergentes) e atualize o rodapé "Última varredura: data +
link pro digest". O retrato é curto e consultável; o digest é o detalhe histórico.

## Saída 3 — Salvar em `referencias/` (achados ≥ 8)
Todo achado que receber **score ≥ 8** na triagem interna (relevância para o Kolden,
qualidade da fonte, aplicabilidade) deve ser salvo em `referencias/`:
- Agente / prompt → `referencias/agentes/<repo-ou-nome>.md`
- Artigo / paper → `referencias/artigos/AAAA-MM-DD-<titulo>.md`
- Ferramenta / MCP → `referencias/ferramentas/<nome>.md`

Cabeçalho obrigatório de cada arquivo salvo:
```markdown
---
fonte: <URL ou repo>
score: <0-10>
salvo_em: AAAA-MM-DD
salvo_por: vigia
dominio: <modelos|mcp|comunidade|github>
por_que_salvar: <1-2 linhas>
---
```
