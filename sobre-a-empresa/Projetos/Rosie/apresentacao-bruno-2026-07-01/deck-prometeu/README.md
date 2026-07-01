---
id: deck-prometeu-readme
titulo: "Deck Rosie 360 — versão Prometeu (AIOX)"
resumo: "Como abrir, navegar e auditar o deck construído sob a Constitution AIOX."
categoria: projeto
palavras-chave: [deck, rosie, prometeu, aiox, story-driven, no-invention]
status: rascunho
atualizado-em: 2026-06-30
---

# Deck Rosie 360 — versão **Prometeu** (AIOX)

Constitution: `C:\Kolden\Prometeu\.aiox-core\constitution.md`
6 artigos: CLI First · Agent Authority · Story-Driven · **No Invention** · Quality First · Absolute Imports.

## O que esta versão entrega de diferente

1. **Spec rastreável** (`docs/spec.md`) — 38 FR + 10 NFR + 6 CON numerados. Toda afirmação do deck rastreia a um requirement.
2. **Story de desenvolvimento** (`docs/story.md`) — 10 acceptance criteria validados pelo @po.
3. **Pesquisa documentada** (`docs/research.json`) — 10 fontes datadas, JSON validável.
4. **QA Gate formal** (`docs/qa-gate.md`) — 7 verificações com veredito PASS/CONCERNS/FAIL.
5. **Rastreabilidade visível no HTML** — cada slide carrega `→ FR-X` no footer pequeno.

## Como abrir

```powershell
start "" "C:\Kolden\sobre-a-empresa\Projetos\Rosie\apresentacao-bruno-2026-07-01\deck-prometeu\index.html"
```

## Navegação

- Setas (← →) · F11 fullscreen · Esc visão geral
- **L** alterna Live (oculta apêndice) ↔ Full
- **M** imprime / salva PDF
- URL com `?mode=live` abre direto em modo Live

## Audit trail

Para auditar a rastreabilidade:

```bash
grep -c "FR-" index.html        # ≥ 35 referências a FR
grep -c "Manual p." index.html  # ≥ 9 referências ao Manual de Marca
grep -c "FONTE-" index.html     # referências às 10 fontes documentadas
```

## Fluxo de produção (que foi executado)

```
@pm coleta requirements.json (FR/NFR/CON)
  ↓
@architect avalia complexidade (5 dimensões → STANDARD, 14pts)
  ↓
@analyst pesquisa (research.json — 10 fontes verificadas)
  ↓
@pm escreve spec.md (rastreabilidade)
  ↓
@qa critica spec (veredito APPROVED, média 4.3 / 5)
  ↓
@architect planeja (rota direta para implementação — entrega única)
  ↓
@sm cria story.md (10 acceptance criteria)
  ↓
@po valida story (checklist 10pt → GO)
  ↓
@dev implementa index.html (slide-a-slide rastreável)
  ↓
@qa executa qa-gate.md (7 verificações → PASS)
  ↓
@devops aguarda ordem do Ronan para push
```

## Trade-offs assumidos

- **Pesado em documentação** — 4 docs auxiliares pra cada entrega de deck. Bom para auditoria; ruim para iteração rápida.
- **Lento para mudar** — alterar uma frase no deck pode exigir atualizar o FR correspondente no spec.
- **Excelente para defender** — em board, cliente exigente, ou auditoria de contrato, cada afirmação tem dono e fonte.

## Próximo passo para esta versão (se você aprovar)

`@devops *push` apenas sob ordem explícita do Ronan. Conventional commit:

```
feat(rosie-deck): apresentação 360° para Bruno [Story 2026-07-01.deck-rosie-360]

- Spec com 38 FR + 10 NFR + 6 CON
- Story com 10 AC validados pelo @po
- 10 fontes documentadas no research.json
- QA Gate PASS com 1 CONCERN aceito (!important em overrides reveal.js)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```
