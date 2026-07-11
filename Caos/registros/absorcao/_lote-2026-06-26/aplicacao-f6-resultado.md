---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Resultado da Aplicação F6 — Lote 2026-06-26 (executado 2026-06-27)

Ronan aprovou a ordem de aplicação F6 dos 29 `analisado`. Executado solo, em 3 ondas, por bucket de squad-alvo
(squads distintos em paralelo). **Modo:** ADAPT em squads existentes. Sem web (herança histórica deferida). Sem commit.
**Reconciliação:** todos os buckets com `relatorio-de-perda-<bucket>.md` e **PERDIDO=0**.

## Resumo — 44 habilidades + 5 vendors + 5 referências

| bucket | squad/destino | criado | repos-fonte |
|---|---|---|---|
| Caliope (prova) | Caliope | 1 skill (`de-slop`) | humanizer + stop-slop |
| Ariadne | Ariadne | 7 skills | claude-seo |
| Égide | Égide | 5 skills | cybersecurity-skills + gsd + caveman |
| Harmonia | Harmonia | 4 skills | ui-ux-pro-max + taste-skill + claude-code/frontend-design |
| Prometeu | Prometeu | 5 skills | spec-kit + gsd + superpowers |
| Caos-fábrica | Caos `.claude/skills` | 4 skills | superpowers + harness + gstack + claude-code/plugin-dev |
| Dédalo | Dédalo | 5 skills | caveman + graphify+Understand (fundidos) + claude-mem + superpowers |
| Pheme | Pheme | 6 skills | social-media-skills |
| Argos | Argos | 3 skills | perplexity + obsidian/defuddle + Understand |
| Olimpo | Olimpo | 3 skills | gstack |
| Metis | Metis | 1 skill | caveman (G12) |
| Vendors | sobre-a-empresa/Ferramentas | 5 manuais | repomix, markitdown, MoneyPrinterTurbo, playwright-mcp, n8n-mcp |
| Referências | referencias-biblioteca/ | 5 índices inertes | CL4R1T4S, system-prompts, awesome-claude-code, ai-engineering, claude-skills |

## Padrões honrados em toda a aplicação
- **Sobreposições fundidas, não duplicadas:** humanizer+stop-slop (de-slop), graphify+Understand (compreensão-de-codebase), ui-ux+taste+frontend-design (Harmonia), os 3 spec-driven (Prometeu).
- **Anti-exaustão:** buckets gigantes (cybersecurity 817, ECC 271, harness 44) → só métodos-âncora; resto = DIFERIDO-INCREMENTAL nos relatórios.
- **Dual-use (cyber):** só método (SKILL.md); ~1093 scripts ofensivos barrados na quarentena.
- **Soberania:** caveman religado ao LLM próprio; Sonar/MoneyPrinter marcados vendor externo opt-in; claude-mem core = infra (não virou skill).
- **Licenças:** copyleft (AGPL/GPL) e CC-BY-NC-ND → só indexados, sem cópia literal; proprietário Anthropic (frontend-design/plugin-dev) → princípio em PT-BR, uso interno; MIT/Apache → atribuição owner/repo@sha no rodapé.
- **Handoffs respeitados:** tells de conteúdo→Caliope, image-gen→Aglaia, backlinks→Argos, SSRF→Égide, analytics→Metis.

## Pendências (incremental / escalado — NÃO feito nesta leva)
- **DIFERIDO-INCREMENTAL** (registrado nos relatorio-de-perda-*): aprofundamento dos buckets grandes — Égide (~30 clusters cyber restantes), Caos/ECC, Prometeu (debugging do superpowers), schema/AI-SEO profundos da Ariadne, etc.
- **Catálogos ausentes** em vários squads (Égide, Dédalo, Pheme, Olimpo, Metis, Prometeu) — recomendado o curador criar `catalogo.md` na conformação.
- **CREATE de squad novo / infra (escalado ao Ronan, não feito solo):** obsidian (PKM), claude-mem core (infra Kolden OS), 6 domínios sem squad (vendas/finanças/jurídico/suporte/RH/operações), 3 lacunas (PMO/compliance/BizOps), MoneyPrinterTurbo como produto.
- **Provisionamento** (não bloqueia): `PERPLEXITY_API_KEY` em /kolden/argos, wiring do retriever Sonar; chaves dos vendors via Infisical quando ativados.
- **Repos só parcialmente tocados:** knowledge-work-plugins (ADAPTs multi-squad não distribuídos — só mapeados) e everything-claude-code (271 skills — só âncoras de meta-fábrica). Próxima leva.
