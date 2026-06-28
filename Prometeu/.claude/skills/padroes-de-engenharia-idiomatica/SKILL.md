---
name: padroes-de-engenharia-idiomatica
description: Use ao escrever ou revisar código de implementação e você quer que ele saia idiomático na linguagem/framework do projeto, com commits convencionais e refatoração disciplinada (não gold-plating). Acione quando o @dev for implementar uma story, quando um diff misturar estilos inconsistentes, ou quando precisar decidir entre um padrão de design e a solução mais simples. Não é sobre arquitetura de alto nível (isso é `architect-first`) — é sobre a forma idiomática local do código e da história do repositório.
---

# Padrões de Engenharia Idiomática

Disciplina de **forma idiomática**: código que parece escrito por quem domina a
linguagem e o framework, commits que contam a história em formato convencional, e
refatoração que conserta o que está no caminho — sem inventar abstração para futuro
hipotético. Complementa o `architect-first` (que decide a estrutura): aqui é a
**execução pragmática** que a Constituição do Prometeu pede.

## Três eixos (aplique nesta ordem)

### 1. Idioma da linguagem/framework antes de tudo
Antes de escrever, identifique o dialeto local e **siga-o**, mesmo que você prefira outro:
- **Herde o estilo existente** (`inherit-legacy-style`): leia 2-3 arquivos vizinhos e
  copie convenções de nomes, imports, tratamento de erro e organização de módulo. O
  repositório já tem um dialeto — diga o mesmo dialeto, não o seu.
- **Padrões idiomáticos por linguagem** — cada ecossistema tem um "jeito certo":
  Python (context managers, dataclasses, type hints), Go (erros explícitos, sem panics
  em fluxo normal), Rust (ownership/`Result`/`?`), TypeScript (sem `any`, `as const`,
  type guards), Kotlin (coroutines/flows), Swift (concurrency/actors). Trate isto como
  uma **biblioteca de referência inerte**, não como regra rígida universal.
- **Padrões de framework** seguem o grão do framework: Django (fat models/thin views,
  Celery para async), FastAPI (dependency injection, Pydantic), React (composição,
  hooks com prefixo `use`, performance via memo só quando medido), Next.js (server
  components), Spring Boot, NestJS, SwiftUI, Flutter. Não force MVC onde o framework
  pede outra coisa.

### 2. Commits convencionais como narrativa
Cada commit é uma frase do changelog. Formato `tipo(escopo): assunto` —
`feat`, `fix`, `docs`, `test`, `chore`, `refactor`, `perf`, `build`, `ci`.
- **Um commit = uma mudança coerente.** Não misture refactor + feature no mesmo commit.
- **Referencie a story** quando houver: `feat: implementa X [Story 2.1]`.
- **Imperativo, presente:** "adiciona", não "adicionado"/"adicionando".
- `BREAKING CHANGE:` no rodapé quando quebrar contrato — é o que dispara major no semver.
- No Kolden, o assunto em PT-BR minúsculo com travessão é a convenção da casa; a chave
  de tipo (`feat:`/`fix:`) permanece em inglês por ser contrato de ferramenta (semver).

### 3. Refatoração disciplinada (consertar, não enfeitar)
Refatoração é mudança de forma **sem mudar comportamento** — com teste verde antes e depois.
- **Escopo fechado:** o bug fix conserta o bug; o refactor de carona só entra se for
  pré-requisito mecânico da mudança. Refactor amplo vira story própria.
- **Caça a falhas silenciosas:** `catch` que engole erro, retorno de erro ignorado,
  `Promise` sem `await`, default que mascara estado inválido. Toda falha tem que ser
  visível (logada ou propagada), nunca absorvida em silêncio.
- **Simplificação > esperteza:** remova indireção morta, código duplicado e abstração
  prematura. Se um padrão de design (Strategy, Factory, Observer...) não paga seu custo
  de complexidade **agora**, escolha a solução direta. Padrão entra quando há ≥2 casos
  reais, não por antecipação.
- **Análise de tipos e comentários:** tipos que mentem sobre o domínio e comentários que
  contradizem o código são defeito — alinhe ou remova.

## Gate de saída
- O diff segue o dialeto dos arquivos vizinhos (nenhum estilo importado de fora).
- Cada commit é convencional, atômico e referencia a story quando aplicável.
- Nenhuma abstração nova sem ≥2 casos reais; nenhum erro engolido em silêncio.
- Comportamento preservado em todo trecho marcado como `refactor` (teste verde).

## Quando NÃO usar
- Decisão estrutural de sistema (solo vs serviço, fronteiras de módulo) → `architect-first`.
- Validar qualidade de requisitos da spec → `checklist-de-requisitos`.

---
*Fonte: affaan-m/everything-claude-code@2bc924f (`skills/{python,go,rust,react,django,...}-patterns/`, `skills/inherit-legacy-style/`, `skills/search-first/`, `agents/{refactor-cleaner,code-simplifier,silent-failure-hunter,comment-analyzer,type-design-analyzer}.md`, `skills/everything-claude-code` — conventional commits) — licença MIT. Princípios extraídos e reescritos em PT-BR; sem cópia literal. Funde a biblioteca idiomática por linguagem (G10/G15), a disciplina de refatoração (G13) e a convenção de commits ao padrão de execução pragmática do Prometeu.*
