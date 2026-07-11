---
tipo: nota
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
relacionado:
  - "[[Ariadne/tasks/_indice|_indice]]"
---

# Tarefa: Implementar Schema (JSON-LD)

**ID:** ARIADNE-004 · **Versão:** 1.0.0 · **Comando:** `*schema` · **Agente:** engenheiro-de-schema
**Objetivo:** escolher o tipo schema.org certo, gerar JSON-LD e VALIDAR por render (nunca por web_fetch).

## Entradas
| Campo | Obrigatório | Validação |
|---|---|---|
| url/tipo de página | Sim | Article, Product, FAQPage, HowTo, LocalBusiness, Organization, BreadcrumbList… |
| conteúdo visível | Sim | O markup só reflete o que está visível na página |

## Pré-condições
- Página renderizável (browser_*) para inspecionar schema existente — `web_fetch`/`curl` NÃO enxergam JSON-LD por JS.

## Fases
1. **Selecionar tipo** schema.org adequado ao conteúdo real da página.
2. **Gerar JSON-LD** com as propriedades obrigatórias + recomendadas; refletir apenas conteúdo visível.
3. **Validar** no Rich Results Test / Schema.org Validator (via browser) — checar elegibilidade a rich results e erros.
4. **Entregar** o markup pronto + método de validação usado.

## Saída (exemplo)
```json
{ "@context":"https://schema.org", "@type":"FAQPage",
  "mainEntity":[{"@type":"Question","name":"...","acceptedAnswer":{"@type":"Answer","text":"..."}}] }
```
Validado em: Rich Results Test (render), 2026-06-26 — elegível a FAQ rich result. ✓

## Vetos
- NUNCA concluir "sem schema" via web_fetch/curl; NUNCA marcar conteúdo inexistente (schema enganoso = penalização); sempre validar antes de entregar; nunca credencial em texto puro; só tools de `ferramentas.md`.

## Conclusão
- [ ] Tipo correto · [ ] JSON-LD reflete conteúdo visível · [ ] Validado por render · [ ] Elegibilidade declarada
