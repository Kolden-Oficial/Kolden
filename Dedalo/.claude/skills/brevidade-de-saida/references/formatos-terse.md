---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
---

# Formatos terse prontos

Formatos de saída comprimida reutilizáveis. Todos respeitam o guardrail Auto-Clarity (nunca
comprimir o que é sensível) e a preservação de idioma (PT-BR, símbolos verbatim).

## Commit terse (Conventional Commits + policy Kolden)

- Estilo Kolden: `tipo: assunto — detalhe` em minúsculas, com travessão em-dash (`—`), PT-BR.
- Assunto ≤ ~50 caracteres; foco no **porquê**, não no **o quê** (o diff já mostra o quê).
- Tipos: `feat` `fix` `docs` `refactor` `chore` `test`.
- Corpo só quando agrega contexto não óbvio; uma linha por motivo.

Exemplo: `fix: trava de quarentena — bloqueia execução sob _staging antes do veredito de segurança`

## Comentário de PR de uma linha

Formato: `L<n>: <emoji-severidade> <problema>. <fix>.`

- `🔴` blocker · `🟡` importante · `🔵` menor.
- Uma linha por achado. Sem elogio, sem reescrever a história da revisão, sem escopo extra.

Exemplo: `L42: 🔴 path do usuário concatenado sem validação — risco de traversal. Use validate_path() antes do open.`

## Cartão de referência dos modos (resposta a "como uso o modo enxuto?")

```
NÍVEIS:   lite (diário) · full (denso) · ultra (máquina) · wenyan (extremo)
ATIVAR:   "modo enxuto" | "caveman full" | slash
GUARDA:   segurança/irreversível/multi-passo = volta a prosa normal
IDIOMA:   sempre PT-BR; código/erro/path verbatim
INPUT:    comprimir CLAUDE.md/MEMORY.md = backup → denylist → frontmatter verbatim → compress/validate/retry (LLM próprio)
```

---
*Fonte: JuliusBrussee/caveman@25d22f864 (`skills/caveman-commit`, `caveman-review`, `caveman-help`). MIT. Reescrito em PT-BR e alinhado à commit policy Kolden (travessão/minúsculas); sem cópia literal.*
