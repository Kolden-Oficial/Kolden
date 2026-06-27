---
name: revisao-de-codigo-por-linguagem
description: Use ao revisar um diff de código — quando o pedido é "revisa esse PR", "olha esse código", "tem bug aqui?", ou após escrever/alterar código que vai virar entrega. Traz o PROTOCOLO de revisão sistemática (coleta de contexto → checklist por severidade → relatório com veredito), o portão de confiança que mata o ruído de revisor-LLM (a falha nº1), a lista de falsos-positivos a NÃO sinalizar, a caça a falhas silenciosas, e o roteamento para o revisor especializado da linguagem. NÃO use para escrever testes (use estrategia-de-testes-e-tdd) nem para refatorar de carona.
---

# Revisão de Código por Linguagem

Revisão de código que **encontra o que importa e cala sobre o resto**. O fracasso dominante de um
revisor-LLM não é deixar passar bug — é **inundar com ruído**: nits inventados, "considere usar X"
especulativo, severidade inflada. Ruído destrói confiança mais rápido que um achado perdido. Esta
habilidade impõe a disciplina que separa revisão de teatro.

## Protocolo (sempre nesta ordem)

1. **Reúna contexto** — `git diff --staged` + `git diff`; se vazio, `git log --oneline -5`. Você revisa
   uma mudança, não o universo.
2. **Entenda o escopo** — quais arquivos mudaram, a que feature/fix pertencem, como se conectam.
3. **Leia o entorno** — nunca revise o trecho isolado. Abra o arquivo inteiro, imports, dependências e
   **os chamadores**. Metade dos "bugs" já está tratada um quadro acima ou garantida por um tipo.
4. **Aplique o checklist por severidade** — CRÍTICO → ALTO → MÉDIO → BAIXO (abaixo).
5. **Relate com veredito** — formato fixo (abaixo). Zero achados é um resultado válido.

## Portão de confiança (o que mata o ruído)

Só reporte com **>80% de certeza** de que é problema real. Antes de escrever cada achado, responda 4
perguntas; se alguma for "não" ou "incerto", rebaixe a severidade ou **descarte**:

1. **Cito a linha exata?** Arquivo + linha. "Em algum lugar da auth" não é acionável — descarte.
2. **Descrevo o modo de falha concreto?** Nomeie entrada, estado e mau resultado. Sem gatilho nomeado,
   você está casando padrão, não revisando.
3. **Li o entorno?** Chamadores, imports, testes — confira se já está tratado.
4. **A severidade se sustenta?** Falta de JSDoc nunca é ALTO. Um `any` em fixture de teste nunca é
   CRÍTICO. Inflar severidade corrói a confiança.

**ALTO/CRÍTICO exigem prova**: o trecho + linha, o cenário de falha (entrada/estado/resultado) e por
que as defesas existentes (tipos, validação, default do framework) não pegam. Sem os três → rebaixe ou
descarte. **Revisão limpa é válida** — não fabrique achado para justificar a invocação.

## Falsos-positivos — NÃO sinalize (a menos que tenha evidência específica)

- "Considere adicionar tratamento de erro" quando o caminho de erro é tratado pelo chamador/framework
  (middleware Express, error boundary React, `try/catch` no topo, `.catch` upstream).
- "Falta validar entrada" em função interna cujos chamadores já validam — **trace ao menos um chamador**.
- "Número mágico" para constantes óbvias: `200`, `404`, `1000`ms, `1024`, índices `0`/`-1`, status HTTP.
- "Função longa demais" para `switch` exaustivo, objeto de config, tabela de teste. Tamanho ≠ complexidade.
- "Possível null deref" quando a linha anterior estreita o tipo ou há `if`-guard no escopo. Trace o tipo.
- "N+1 query" em loop de cardinalidade fixa (enum de 4 itens) ou caminho que já usa batch/DataLoader.
- "Falta await" em fire-and-forget intencional (log, métrica, fila) — procure comentário ou prefixo `void`.
- "Devia usar TypeScript/tipos" em arquivo JS-only — case com a linguagem do projeto, não proponha trocar stack.
- Teatro de segurança: `Math.random()` em contexto não-cripto (animação, jitter), `eval` num plugin que é
  superfície de carregamento de código por design.

Teste mental: *"um sênior do time mudaria isto numa revisão?"* Se não, pule.

## Checklist por severidade

- **CRÍTICO (bloqueia merge)** — credencial hardcoded; SQL injection (concatenação em query → use
  parametrizado); XSS (input não-escapado em HTML/JSX); path traversal; bypass de auth em rota protegida;
  segredo/PII vazando em log.
- **ALTO (merge com cautela)** — função >50 linhas / arquivo >800; aninhamento >4 níveis (use early-return);
  erro engolido / catch vazio; mutação onde cabe imutável; query sem LIMIT em rota de usuário; chamada
  externa sem timeout; vazamento de detalhe interno de erro ao cliente.
- **MÉDIO** — algoritmo O(n²) onde cabe O(n log n); re-render desnecessário (falta memo); import de lib
  inteira tree-shakeable; cache ausente em computação cara repetida.
- **BAIXO** — TODO/FIXME sem ticket; nome pobre (`x`, `tmp`, `data` em contexto não-trivial); formatação
  inconsistente. Não retenha aprovação por estes.

**Caça a falhas silenciosas** (eixo de alto valor, frequentemente CRÍTICO/ALTO): catch vazio; erro virando
`null`/`[]` sem contexto; `.catch(() => [])` que esconde falha real; stack trace perdido em rethrow
genérico; ausência de timeout/rollback em rede/arquivo/db/transação. Zero tolerância a falha que some no
caminho feliz e quebra lá na frente.

**Addendum para código gerado por IA**: priorize regressão comportamental e edge-cases, fronteiras de
confiança/segurança, acoplamento oculto / drift de arquitetura, e complexidade que infla custo de modelo
sem necessidade. O mesmo modelo que escreve e revisa carrega o mesmo ponto-cego — desconfie.

## Roteamento por linguagem (pool de revisores especializados)

A revisão genérica acima é o piso. Quando o diff é denso numa linguagem, **delegue a um revisor
especializado** (subagente com contexto isolado e checklist próprio) em vez de um único revisor genérico:

| Stack | Revisor | Foco extra |
|---|---|---|
| TypeScript/JS, React/Vue | `revisor-typescript`, `revisor-react`, `revisor-vue` | deps de hook, stale closure, key de lista, fronteira server/client |
| Python, Django/FastAPI | `revisor-python`, `revisor-django`, `revisor-fastapi` | validação de schema, N+1 ORM, async |
| Go, Rust, Java, Kotlin, C#, C++, Swift, PHP, Flutter | `revisor-<lang>` | idiomas e armadilhas da linguagem |
| Banco/migração | `revisor-de-banco` | RLS, índice, plano de migração |
| Segurança | `revisor-de-seguranca` | OWASP, authz, vazamento de segredo |

Coordene-os pela `orquestracao-de-subagentes-paralelos` (um por domínio independente, contrato de saída
estrito). Cada revisor herda **este mesmo portão de confiança** — especialização não é licença para ruído.

## Formato de saída

Cada achado: `[SEVERIDADE] título` · `Arquivo: caminho:linha` · `Problema:` (gatilho concreto) · `Correção:`
(o quê, não um ensaio). Encerre **toda** revisão com a tabela-resumo e o veredito:

```
| Severidade | Qtd | Status |
|------------|-----|--------|
| CRÍTICO    | 0   | passa  |
| ALTO       | 2   | alerta |
| MÉDIO      | 3   | info   |
| BAIXO      | 1   | nota   |

Veredito: ALERTA — 2 ALTOS a resolver antes do merge.
```

Veredito: **APROVA** (zero CRÍTICO/ALTO — inclui revisão limpa de zero achados) · **ALERTA** (só ALTOs) ·
**BLOQUEIA** (qualquer CRÍTICO). Não retenha aprovação para parecer rigoroso — diff limpo se aprova.

## Convenções do projeto

Quando houver `CLAUDE.md` ou regras do projeto, cheque também: limite de tamanho de arquivo, política de
emoji, exigência de imutabilidade, padrão de tratamento de erro, gestão de estado. Na dúvida, **case com o
que o resto do código já faz**.

---
*Fonte: affaan-m/everything-claude-code@2bc924f (agentes `code-reviewer`, `silent-failure-hunter` e o pool
`*-reviewer` por linguagem; cluster G13/G9 do inventário; MIT). Princípios extraídos e reescritos em PT-BR;
sem cópia literal. O roteamento para subagentes especializados acopla à `orquestracao-de-subagentes-paralelos`.*
