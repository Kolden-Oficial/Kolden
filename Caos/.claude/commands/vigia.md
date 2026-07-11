---
description: Dispara uma varredura do estado da arte de IA (MCPs, ferramentas, modelos, comunidade, GitHub, newsletters), gera um digest datado e atualiza o retrato vivo do ecossistema. Use sem argumento para varredura completa, ou com um foco (modelos | mcp | comunidade | github).
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/.claude/commands/absorver|absorver]]"
  - "[[Caos/.claude/commands/caos|caos]]"
  - "[[Caos/.claude/commands/squad|squad]]"
---

Caos, dispare o subagent `vigia` para varrer o estado da arte de IA.

Foco: $ARGUMENTS

Instruções:
- Se o foco estiver vazio, faça varredura completa das 4 frentes.
- Se o foco for `modelos`, `mcp`, `comunidade` ou `github`, varra só essa frente.
- Use a skill `vigia-de-ecossistema` (frentes, fontes, ferramentas e formato).
- Trabalhe só com fontes públicas; cada item com fonte + data + link.
- Ao final: grave o digest em `registros/vigia/AAAA-MM-DD.md`, sobrescreva o retrato vivo
  `dados/estado-da-arte.md` e me apresente o TL;DR com as implicações para o Kolden.
