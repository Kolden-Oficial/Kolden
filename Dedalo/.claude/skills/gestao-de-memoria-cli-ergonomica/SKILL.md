---
name: gestao-de-memoria-cli-ergonomica
description: Use quando o pedido for INTERAGIR com a memória persistente do Kolden pelo CLI de um agente — buscar sessões passadas ("já resolvemos isso?", "como fizemos X semana passada?"), navegar código por AST com atalhos, "babás" um PR até o merge, alternar modos de prompt configuráveis, ou recuperar de falha com loop de restart+backoff. Esta habilidade é a INTERFACE ERGONÔMICA sobre a infra de memória — a infra em si (daemon, SQLite-FTS5, Chroma, worker) é do Kolden OS, NÃO desta skill. Fronteira dura com `reflexos-resilientes-e-bootstrap`: aquela ensina a CAPTURAR memória por hook; esta ensina a CONSUMIR e OPERAR memória pelo CLI. NÃO use para gravar/comprimir observações (isso é da infra + reflexos). NÃO use para busca de referências externas (isso é `busca-de-referencias` do Caos).
---

# Gestão de Memória e Ergonomia de CLI

Interface ergonômica sobre a infra de memória do Kolden OS e sobre a rotina de "operação de longa
duração" do agente. Cinco frentes acopladas por um princípio único: **o dedo do usuário é o gargalo**
— cada comando deve entregar valor em ≤3 teclas ou ≤1 chamada.

## Fronteira dura (leia antes de agir)

- **Infra de memória** (daemon, SQLite-FTS5, Chroma, worker HTTP, viewer) = **Kolden OS**, não é
  esta skill. Esta skill CONSOME a infra.
- **Captura por hook** (hash-dedup, fail-open, PostToolUse) = `reflexos-resilientes-e-bootstrap`.
  Aquela GRAVA; esta CONSULTA.
- **Referências externas curadas** (obras, papers, repos) = `busca-de-referencias` do Caos.

## Frente 1 — Busca de memória (`mem-buscar`)

Interface CLI sobre a base semântica de sessões passadas. **Regra dura**: nunca `fetch` sem `busca`
antes — economia de 10x tokens.

Workflow de 3 camadas (divulgação progressiva):

**Camada 1: `buscar` — índice enxuto**
```
mem-buscar --consulta "autenticação" --limite 20 --projeto <nome>
```
Retorna tabela: `ID | timestamp | tipo | título` (~50-100 tokens/resultado). Nada mais.

Parâmetros úteis: `--tipo` (`observacoes`/`sessoes`/`prompts`), `--tipo-obs` (`bugfix`, `feature`,
`decisao`, `descoberta`, `mudanca`), `--data-inicio`/`--data-fim` (YYYY-MM-DD), `--ordem`
(`data-desc` padrão, `data-asc`, `relevancia`).

**Camada 2: `linha-do-tempo` — contexto ao redor**
```
mem-buscar linha-do-tempo --ancora 11131 --antes 3 --depois 3 --projeto <nome>
```
Ou automaticamente pela consulta:
```
mem-buscar linha-do-tempo --consulta "autenticação" --antes 5 --depois 5
```
Retorna `antes + 1 + depois` itens em ordem cronológica intercalando observações/sessões/prompts.

**Camada 3: `obter` — detalhe cheio SÓ dos IDs filtrados**
```
mem-buscar obter --ids 11131,10942,10855
```
Retorna as observações completas (título, subtítulo, narrativa, fatos, conceitos, arquivos) — em
lote (1 request, não N). ~500-1000 tokens cada.

**Hotkeys sugeridas** (dependem do terminal do agente):
- `Ctrl+M B` — abre `mem-buscar` na última consulta.
- `Ctrl+M T` — timeline em torno da observação em foco.
- `Ctrl+M O` — abre `obter` para os IDs selecionados.

## Frente 2 — Navegação AST-consciente (`explorar`)

Substitui o ciclo Glob→Grep→Read em codebase por três chamadas AST-cientes.

```
explorar buscar --consulta "shutdown" --caminho ./src --max 15
```
Retorna símbolos ranqueados com assinaturas + folded file views (~2-6k tokens). É a chamada única
que substitui a descoberta anterior.

```
explorar esboco --arquivo services/worker-service.ts
```
Esqueleto estrutural (~1-2k tokens): funções, classes, métodos, imports.

```
explorar desdobrar --arquivo services/worker-service.ts --simbolo shutdown
```
Corpo completo do símbolo (~400-2100 tokens), respeitando fronteira AST — sem truncar método longo.

**Atalhos por tipo de nó** (dentro do buffer de `esboco`):
- `n` / `N` — próximo/anterior símbolo do mesmo tipo.
- `f` — próxima `function`; `c` — próxima `class`; `m` — próximo `method`; `i` — próximo `import`.
- `Enter` — `desdobrar` o símbolo em foco.

Suporte de linguagens via tree-sitter: JavaScript/TypeScript/TSX, Python, Go, Rust, Ruby, Java, C/C++.
Gramáticas custom via `.dedalo.json` (`grammars: { solidity: { package: "tree-sitter-solidity", ... } }`).

**Fronteira com `compreensao-de-codebase`**: esta é a INTERFACE (CLI + hotkeys + atalhos AST);
`compreensao-de-codebase` é o MOTOR conceitual (grafo, trilhas de confiança, PR-impact).

## Frente 3 — Vigília de PR (`babá-de-pr`)

"Fica com o PR até estar limpo de verdade" — polling do status até `mergeable` + zero threads
abertas. **Não para no primeiro sweep** se há comentários pendentes.

Loop obrigatório:
1. Identifica número do PR, branch, base.
2. Confirma que não é draft; inspeciona `mergeable`, `mergeStateStatus`, `reviewDecision`, checks.
3. Aguarda checks pendentes com backoff (30-60s típico; usuário pode redefinir).
4. Lê comentários novos e review-threads não-resolvidas. Bot summary é dica, o veredito vem do código.
5. Corrige em commits focados, roda testes/build, faz push, volta ao passo 2.
6. Resolve thread stale só depois de verificar que o código endereça o comentário.
7. **Só para** quando: checks passando (ou skip intencional), reviewDecision aceitável, zero
   comentários acionáveis, zero threads não-resolvidas.

Chamadas centrais (via `gh`/GraphQL):
```
gh pr view <n> --json number,state,isDraft,mergeable,mergeStateStatus,reviewDecision,headRefOid,statusCheckRollup,url
```
E o loop paginado sobre `reviewThreads(first:100)` com `pageInfo.endCursor` até `!hasNextPage`.

Resolver thread stale só com `resolveReviewThread` **após** verificação de que a peça foi
endereçada.

**Backoff**: 30s → 60s → 120s (cap). Se um check for `queued` por >10min, avisa e continua.

**Report final**: SHA do último commit, checks por nome+resultado, contagem de threads não-resolvidas
restantes, testes rodados, arquivos locais sujos que sobraram.

## Frente 4 — Modos de prompt configuráveis

Templates de estilo/comportamento por sessão, em `~/.dedalo/modos/` (ou `.dedalo/modos/` local do
projeto). Cada modo é um `.md` curto com um bloco `system` (voz), um bloco `restricoes` (o que
NÃO fazer) e um bloco `saida` (formato).

Exemplos:
- `modos/enxuto.md` — voz caveman (delegado a `brevidade-de-saida`), corta prosa em 65-75%.
- `modos/revisor.md` — voz de revisor de código estrito (delegado a `revisao-de-codigo-por-linguagem`).
- `modos/wiki.md` — voz didática Matuschak-style para `/compreender-conhecimento`.

Ativação por linguagem natural ("modo enxuto") ou por slash (`/modo enxuto`). A **persistência
entre turnos** é padrão de `reflexos-resilientes-e-bootstrap` (flag-file com hardening — Egide
`escrita-segura-e-dlp`).

I18N: os modos suportam `--idioma pt-BR|en-US|es-ES`; o Kolden roda em PT-BR por padrão (constituição),
mas a habilidade permite alternar quando o ecossistema impõe (ex.: comentário em issue de repo alheio).

## Frente 5 — Loop de restart com backoff

Quando o agente falha em plena tarefa (crash, timeout, contexto estourado), o loop:

1. **Captura de estado**: escreve `estado.jsonl` (padrão hardenizado da Egide) com {tarefa atual,
   últimos 3 tool calls, hash do contexto, motivo do erro).
2. **Reinício com contexto reduzido**: nova sessão começa lendo `estado.jsonl` + o objetivo original,
   descartando prosa/exploração que já foi feita.
3. **Backoff exponencial**: 1ª retry imediata; 2ª após 15s; 3ª após 45s; 4ª após 2min; para em 5.
4. **Fail-open**: se o loop em si falhar, deixa o Ronan continuar manualmente — nunca bloqueia o host.
5. **Ledger**: cada restart vira linha em `registros/restart.jsonl` com timestamp, motivo, sucesso.

**Regra dura**: nunca reinicia em cascata sem o ledger — dá visibilidade e permite detectar loop de
falha real (mesmo hash 3x = desiste, escala para humano).

## Rodapé de procedência

Padrões absorvidos (sem cópia literal, reescritos em PT-BR + integrados ao esquema Kolden):
- `thedotmack/claude-mem` (Apache-2.0) — skills `mem-search`, `smart-explore`, `babysit`, comando
  `anti-pattern-czar` (reaproveitado como raiz do restart-loop), sistema de i18n (37 idiomas),
  padrões de prompt-mode. Repo em quarentena `Caos/_staging/quarentena/thedotmack--claude-mem/`.
  IDs diferidos aplicados: G8 (mem-search), G9 (smart-explore AST), G18 (babysit PR), G25 (modos
  de prompt + i18n), G27 (restart-loop com backoff).

**Fronteira preservada da absorção anterior**: os PADRÕES de captura por hook (fail-open, dedup por
hash, divulgação progressiva) já vivem em `reflexos-resilientes-e-bootstrap`. O CORE de memória
(daemon HTTP, SQLite-FTS5, Chroma, viewer) é infra do Kolden OS, roteado no relatório-de-perda.
PostHog removido. Chamadas ao LLM religadas ao provedor próprio (OpenRouter/local via Infisical).

## Herança histórica (Firecrawl max — obras canônicas)

Precursores humanos densos cujo pensamento estrutura esta habilidade:

- **John Ousterhout** — professor de Stanford, criador do Tcl/Tk e do sistema de arquivos Sprite;
  obra-âncora "A Philosophy of Software Design" (Yaknyam Press, 2018, 2ª ed. 2021). O conceito
  central de **módulo profundo** — interface pequena, implementação rica — é o que separa esta skill
  (interface CLI enxuta) da infra que fica atrás dela (memória, worker, storage). Cada comando aqui
  tem no máximo 3-5 parâmetros essenciais; o poder mora atrás, não na assinatura. Ousterhout chama
  o oposto de "shallow module" e o marca como pecado capital da complexidade.

- **Salvatore Sanfilippo (antirez)** — criador do Redis (2009+, http://antirez.com,
  https://redis.io). A ergonomia do CLI do Redis (`redis-cli`) é o modelo: comandos monossilábicos
  (`GET`, `SET`, `DEL`, `INCR`), `HELP` sempre próximo, `MONITOR` para observar em tempo real,
  autocompletar por comando, saída direta sem cerimônia. "Simple is beautiful; complex is
  expensive" — o dedo do operador é o gargalo. As frentes 1 (`mem-buscar`) e 2 (`explorar`) desta
  habilidade copiam essa disciplina.

- **Fabrice Bellard** — engenheiro francês; criador do TCC (Tiny C Compiler, 2001+), do QEMU (2003+,
  https://www.qemu.org), do FFmpeg inicial, e do LibNC/QuickJS. Recordista de dígitos de π. O
  padrão de minimalismo radical + estado rebootável do QEMU (snapshot → restore) inspira a Frente 5
  (restart-loop): capturar estado curto, reiniciar com o mínimo, deixar o resto para o próximo
  loop. Bellard não escreveu "livro" — o exemplo é o próprio código.

## Gates de qualidade

Antes de entregar uma sessão desta suíte, verificar:
- [ ] Toda busca de memória respeitou 3 camadas — nunca `obter` sem `buscar+timeline` antes.
- [ ] Navegação AST usou `esboco+desdobrar` no lugar de `Read` em arquivo >100 linhas.
- [ ] `babá-de-pr` não parou no primeiro sweep — só parou com checks OK + zero threads abertas.
- [ ] Modo ativo está persistido em flag-file com hardening (Egide `escrita-segura-e-dlp`).
- [ ] Restart-loop escreveu no ledger `registros/restart.jsonl` com motivo real, não vago.
- [ ] Se o mesmo hash de falha apareceu 3x, escalei para humano (não fiquei em loop cego).
- [ ] Fronteira com infra respeitada — não implementei daemon/storage aqui, só consumi.
