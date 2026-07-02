---
name: comandos-de-compreensao-contextual
description: Use quando precisar ENTENDER documentação, artigo, base de conhecimento ou domínio de negócio — não código-fonte. Aciona em "explica esse domínio", "extrai o vocabulário", "mapa dessa doc", "monta o wiki disso", "monta o glossário", "quero conversar com essa documentação", "grafo de conhecimento do que está escrito", "por que esse artigo diz X". Traz os cinco comandos `/compreender-*` (chat, dominio, conhecimento, artigo, grafo), o pipeline de extração implícita SNL (sujeito/informação-nova/link) e o método Karpathy-style de wiki raw→wiki→schema. NÃO use para entender CODEBASE (isso é `compreensao-de-codebase`) — esta habilidade opera em CONTEÚDO/documentação. NÃO substitui `busca-de-referencias` do Caos (essa curá referências externas).
---

# Comandos de Compreensão Contextual

Pipeline de compreensão de **conteúdo** (documentação, artigos, base de conhecimento, domínio de
negócio) — o par simétrico de `compreensao-de-codebase`. Enquanto aquela opera em código-fonte com
tree-sitter e grafo de dependências, esta opera em prosa/wiki com extração de vocabulário-âncora,
grafo de conhecimento e SNL por parágrafo.

Fronteira dura:
- Documentação escrita, wiki, artigos, PDFs de conhecimento → **aqui**.
- Codebase, símbolos, AST, PR-impact → `compreensao-de-codebase`.
- Curadoria de referências externas para o Caos → `busca-de-referencias` (do Caos).

## Os cinco comandos `/compreender-*`

Cada comando tem **entrada**, **pipeline** e **saída** determinísticos.

### 1. `/compreender-chat <pergunta>` — sessão iterativa sobre conhecimento
Entrada: pergunta em linguagem natural + `intent` opcional ("quero entender", "quero refutar",
"quero aplicar").
Pipeline:
1. Localiza o grafo de conhecimento (`.compreensao/conhecimento.json`) ou o corpus fonte.
2. Faz Grep semântico no grafo (nome, resumo, tags) — NUNCA lê o JSON inteiro.
3. Puxa o subgrafo 1-hop dos nós casados (arestas `related`, `cites`, `builds_on`).
4. Responde com **referência ao nó** (não à página inteira).
5. **Mantém contexto** entre turnos: guarda `sessao.contexto` = {pergunta original, nós tocados,
   próxima hipótese}. Não é one-shot — a segunda pergunta refina a primeira.

Saída: resposta ancorada em `id` de nó + próxima pergunta sugerida.

### 2. `/compreender-dominio [--completo]` — vocabulário-âncora e fronteiras
Entrada: um corpus (repo de docs, projeto, cliente).
Pipeline:
1. Extrai substantivos densos e verbos-âncora (frequência × dispersão × cardinalidade).
2. Agrupa em **domínios** (Domain-Driven Design de Eric Evans): cada domínio é um contexto com
   vocabulário próprio; termos que atravessam fronteira geram `edge cross_domain`.
3. Detecta **fluxos** (verbos que ligam sujeitos) — cada fluxo vira `flow` node.
4. Passos de cada fluxo viram `step` nodes.
5. Saída: `dominio.json` com nós `domain`/`flow`/`step` + glossário curto por domínio.

Uso: onboarding em cliente novo, briefing para novo agente, delimitar escopo de projeto.

### 3. `/compreender-conhecimento <diretorio-wiki>` — pipeline Karpathy-style
Entrada: um wiki no padrão Karpathy — três camadas (`raw/` fontes imutáveis, wiki markdown com
`[[wikilinks]]`, schema `AGENTS.md`/`CLAUDE.md`), com `index.md` (catálogo) e opcional `log.md`.
Pipeline (5 fases):
1. **DETECTAR** — sinal: `index.md` + `.md` com wikilinks. Categorias vêm dos headings do `index.md`.
2. **VARRER** — determinístico: extrai wikilinks, headings, frontmatter, fontes brutas.
3. **ANALISAR** — subagentes `analisador-de-artigo` em lotes de 10-15 (por categoria). Cada um extrai
   **implícito**: entidades (pessoas/ferramentas/obras sem wiki próprio), claims (asserções/decisões),
   arestas implícitas (`builds_on`, `contradicts`, `exemplifies`, `authored_by`, `cites`).
4. **MERGE** — dedup por nome case-insensitive, normaliza tipos, monta camadas do `index.md`, tour
   pela ordem do índice.
5. **SALVAR** — valida (toda aresta aponta para nó existente) e escreve `conhecimento.json`.

**Regra dura**: a fase 3 NÃO duplica wikilinks — esses já viraram `related` na fase 2. O agente
extrai só o que os wikilinks omitiram.

### 4. `/compreender-artigo <arquivo>` — análise SNL parágrafo a parágrafo
Entrada: um artigo/documento único.
Pipeline (por parágrafo):
- **S** (subject) — sujeito discursivo do parágrafo (do que está falando).
- **N** (nova informação) — o que este parágrafo acrescenta que os anteriores não disseram.
- **L** (link) — a que outros parágrafos, artigos, entidades, claims este parágrafo se conecta.
Saída: tabela `paragrafo | S | N | L` + resumo do artigo como cadeia de N's.

Por que SNL: é como o parágrafo "entrega" conhecimento — sem sujeito não há do-que-fala; sem N não
há razão pra existir; sem L não conecta ao resto. Base filosófica em Brandom (ver Herança).

### 5. `/compreender-grafo <arquivo-json>` — navegação e leitura de grafo
Entrada: um `conhecimento.json` já produzido.
Uso: guia interativo — "quais entidades aparecem", "quais claims contradizem X", "camada de mais
alta densidade", "qual o caminho de A a B". Sempre por `jq` sobre o grafo, nunca despejando o JSON
inteiro.

Nós comuns: `article`, `entity`, `claim`, `topic`, `source`, `domain`, `flow`, `step`.
Arestas comuns: `related` (wikilink), `categorized_under` (index.md), `builds_on`, `contradicts`,
`exemplifies`, `authored_by`, `cites`, `contains_flow`, `flow_step`, `cross_domain`.

## Divulgação progressiva (obrigatória)

Todo comando desta suíte segue a mesma disciplina de `reflexos-resilientes-e-bootstrap`:
- Camada 1: nome + tags → índice curto.
- Camada 2: `summary` (1-2 linhas por nó) → panorama.
- Camada 3: `content`/`get_no` → detalhe sob demanda.

O agente paga tokens só pela profundidade que precisa.

## Fronteira com `compreensao-de-codebase`

| Sinal | Vai para |
|---|---|
| `.ts`, `.py`, `.go`, `.rs`, funções, classes, PR-impact | `compreensao-de-codebase` |
| `.md`, `.mdx`, wiki, artigo, glossário, briefing | esta habilidade |
| Repo com `src/` + docs de arquitetura | as duas — código pela outra, docs por esta, mesmo grafo raiz |

Um repositório real usa as duas: a codebase alimenta a estrutura; a wiki alimenta o domínio.

## Rodapé de procedência

Padrões absorvidos (sem cópia literal, reescritos em PT-BR + integrados ao esquema Kolden):
- `Lum1104/Understand-Anything` (MIT) — comandos `/understand-chat`, `/understand-domain`,
  `/understand-knowledge`; agentes `article-analyzer` e `knowledge-graph-guide`. Repo em
  quarentena `Caos/_staging/quarentena/Lum1104--Understand-Anything/`. IDs diferidos aplicados:
  G2 (chat), G5 (domain), G7 (knowledge wiki Karpathy), G13 (article-analyzer wiki),
  G17 (knowledge-graph-guide).

## Herança histórica (Firecrawl max — obras canônicas)

Precursores humanos densos cujo pensamento estrutura esta habilidade:

- **Andrej Karpathy** — pesquisador de deep-learning, ex-Tesla/OpenAI. Site pessoal
  https://karpathy.ai (posts educacionais desde ~2015, "The Unreasonable Effectiveness of
  Recurrent Neural Networks" 2015, "Software 2.0" 2017, "State of GPT" 2023). O **gist do LLM wiki**
  (https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) codifica o pattern
  raw→wiki→schema: fontes brutas imutáveis, wiki gerado por LLM com wikilinks, `AGENTS.md`/`CLAUDE.md`
  como schema, `index.md` como catálogo, `log.md` como diário cronológico. Fase 3 (`/compreender-
  conhecimento`) implementa exatamente esse pattern.

- **Andy Matuschak & Michael Nielsen** — "Quantum Country" (https://quantum.country, 2019+),
  um livro didático com spaced-repetition embutido; e as "Evergreen notes" de Matuschak
  (https://notes.andymatuschak.org, 2019+): notas atômicas, orientadas a conceito, densamente
  linkadas, com títulos que são asserções completas. Essa disciplina — cada nota tem UM sujeito
  claro, é escrita para durar, e ganha valor pela rede de links — está por trás do modelo `article`+
  `related`+`builds_on`+`contradicts` do comando `/compreender-conhecimento`.

- **Robert Brandom** — filósofo de Pittsburgh; obra-âncora "Making It Explicit: Reasoning,
  Representing, and Discursive Commitment" (Harvard University Press, 1994). Base do
  **pragmatismo inferencialista**: o significado de uma asserção é o que ela **compromete** o
  falante a defender e o que **autoriza** os ouvintes a inferir dela. É a fundação teórica do SNL:
  o sujeito (S) fixa o compromisso, a nova informação (N) é o conteúdo assertivo, os links (L) são
  as relações inferenciais (autorização/incompatibilidade). Ver também "Articulating Reasons" (2000),
  versão condensada.

## Gates de qualidade

Antes de entregar uma sessão desta suíte, verificar:
- [ ] Toda aresta do grafo aponta para um nó existente (validação estrita).
- [ ] Dedup de entidades foi feita (case-insensitive).
- [ ] Divulgação progressiva foi respeitada — não despejei JSON inteiro no contexto.
- [ ] Nenhuma resposta cita "página" sem `id` de nó.
- [ ] Se rodou `/compreender-artigo`, cada parágrafo tem S+N+L preenchidos (sem vago).
- [ ] Fronteira com `compreensao-de-codebase` respeitada (não misturei os dois grafos).
