---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/auditoria/2026-06-28-vistoria-v2/_indice|_indice]]"
---

# 03 — Lotes 5-10: 10 squads AIOX-legado (excluindo Olimpo, que tem relatório próprio)

> Cobertura consolidada de **10 squads no formato AIOX-legado** (status `importado-cru`): Peitho, Caliope, Aglaia, Harmonia, Orfeu, Pluto, Dionisio, Themis, Metis, Egide. **Total: 130 agentes** (mais 33 em `Caliope/copy-master/` = 163).

## Característica comum

Todos seguem o **formato AIOX-legado** (`name`, `slashPrefix`, `aios`, `tags`, `components.{agents, tasks, workflows, checklists}`, `config.extends: extend`). Foram **importados** do framework AIOX/Synkra e ainda não passaram pelo Ritual de 9 fases do Caos.

## Tabela de auditoria condensada

| Squad | Manifesto | Agentes (real / declarado) | Workflows | Tasks | Checklists | A | B | E | F | Achado-chave |
|---|---|---:|---|---|---|---|---|---|---|---|
| **Peitho** (`traffic-masters`) | `Peitho/squad.yaml` | 16/16 ✅ | 2 | 9 | 1 | OK | OK | K-009 | OK | sem veto |
| **Caliope** (`copy-squad`) | `Caliope/squad.yaml` | 23/23 ✅ | 2 | 13 | 1 | OK | OK | K-009 | K-002 | sub-squad oculto |
| ↳ **copy-master** (sub) | `Caliope/copy-master/squad.yaml` v2.0.0 | 33/33 ✅ | 4 | 16 | 1 | OK | OK | K-009 | K-002 | não declarado no índice |
| **Aglaia** (`brand-squad`) | `Aglaia/squad.yaml` | 15/15 ✅ | 2 | 9 | 1 | OK | OK | K-009 | OK | tem `routing_matrix` declarado (atípico AIOX) |
| **Harmonia** (`design-squad`) | `Harmonia/squad.yaml` | 8/8 ✅ | 2 | 8 | 1 | OK | OK | K-009 | OK | sem veto |
| **Orfeu** (`storytelling`) | `Orfeu/squad.yaml` | 12/12 ✅ | 2 | 8 | 1 | OK | OK | K-009 | OK | sem veto |
| **Pluto** (`hormozi-squad`) | `Pluto/squad.yaml` | 16/16 ✅ | 2 | 10 | 1 | OK | OK | K-009 | OK | sem veto |
| **Dionisio** (`movement`) | `Dionisio/squad.yaml` | 7/7 ✅ | 1 | 7 | 1 | OK | OK | K-009 | OK | sem veto |
| **Themis** (`advisory-board`) | `Themis/squad.yaml` | 11/11 ✅ | 2 | 7 | 1 | OK | OK | K-009 | OK | sem veto; "board" estratégico |
| **Metis** (`data-squad`) | `Metis/squad.yaml` | 7/7 ✅ | 2 | 7 | 1 | OK | OK | K-009 | OK | sem veto |
| **Egide** (`cybersecurity`) | `Egide/squad.yaml` | 15/15 ✅ | 2 | 9 | 1 | OK | OK | K-009 | OK | **sem veto** em squad de cibersegurança = paradoxo |

## Observações por squad

### Peitho — Tráfego pago
- 16 agentes: traffic-chief + 15 (8 buyers reais + 7 funcionais).
- Roster mistura **pessoas reais** (Molly Pittman, Ralph Burns, Depesh Mandalia, Nicholas Kusmich, Tom Breeze, Kasim Aslam, Pedro Sobral) com **personas funcionais** (ad-midas, media-buyer, performance-analyst, creative-analyst, scale-optimizer, pixel-specialist, ads-analyst, fiscal). Padrão coerente.
- **Sem veto** → K-008.

### Caliope — Copy
- Dois sub-squads coexistem: `Caliope/agents/*.md` (23, `copy-chief` + 22 mestres) e `Caliope/copy-master/agents/*.md` (33, `copy-master-chief` + 32). **Pelo menos 19 mestres aparecem em AMBOS** (Halbert, Schwartz, Hopkins, Bencivenga, Collier, Carlton, Rutz, Kennedy, Kern, Brunson, Brown, Georgi, Benson, R.Schwartz, Settle, Chaperon, Koe, Sugarman, Ogilvy, etc.) — **duplicação de personalidades!**
- copy-master adiciona: Caples, Reeves, Suby, Albuquerque, Wiebe, Cialdini, Warren, Voss, Klaff, Hormozi (10 mestres exclusivos).
- **Achado novo K-012 (ALTO, dados)**: 19+ agentes duplicados entre `Caliope/agents/` e `Caliope/copy-master/agents/`. Risco: roteamento ambíguo, divergência de versões da mesma persona.

### Aglaia — Marca
- 15 agentes: brand-chief + 14. Mistura experts (Aaker, Keller, Kapferer, Ries, Sharp, Neumeier, Miller, Yohn, Heyward, Wheeler) com persona funcionais (archetype-consultant, naming-strategist, domain-scout, miller-sticky-brand).
- **Atípico (positivo)**: `Aglaia/squad.yaml:69-117` declara um `routing_matrix:` cheio (12 trilhas com primary/secondary/triggers). É o único AIOX que faz isso!
- Sem veto.

### Harmonia — Design
- 8 agentes: design-chief + 3 experts reais (Frost, Mall, Malouf) + 4 funcionais (ux-designer, design-system-architect, visual-generator, ui-engineer).
- Compacto, sem ambiguidade.
- Sem veto.

### Orfeu — Storytelling
- 12 agentes: story-chief + 11 mestres do storytelling (Campbell, Harmon, Snyder, Coyne, Dicks, Hall, Duarte, Howell, Johnstone, Klaff, Ganz).
- **Cruzamento com Themis e copy-master**: `oren-klaff` aparece em Orfeu E em Caliope/copy-master. K-012 reforçado.

### Pluto — Hormozi
- 16 agentes: hormozi-chief + 15 hormozi-* (advisor, offers, leads, pricing, copy, ads, content, hooks, launch, closer, workshop, retention, scale, models, audit). **Personalidade única decomposta em 16 funções.**
- Sem veto.

### Dionisio — Movimento
- 7 agentes: movement-chief + 6 (movement-architect, fenomenologo, identitario, estrategista-de-ciclo, manifestador, analista-de-impacto). Mistura nomes em inglês com PT.
- Sem veto.

### Themis — Advisory Board
- 11 agentes: board-chair + 10 conselheiros reais (Dalio, Munger, Naval, Thiel, Hoffman, Sinek, Brown, Lencioni, Sivers, Chouinard).
- **Brené Brown também aparece em**: nenhum outro lugar imediato. OK.
- Sem veto.

### Metis — Data
- 7 agentes: data-chief + 6 (Kaushik, Fader, Ellis, Kao, Mehta, Spinks).
- Sem veto.

### Egide — Cybersecurity
- 15 agentes: cyber-chief + 14 (Peter Kim, Georgia Weidman, Jim Manico, Chris Sanders, Omar Santos, Marcus Carey + 8 funcionais: command-generator, cartographer, busterer, dirber, fuzzer, ripper, rogue, shannon-runner).
- **PARADOXO**: squad de cibersegurança **sem `cross_cutting.veto` em squad.yaml**. Os vetos existem dentro da skill `auditoria-de-seguranca-de-ia-e-mcp` e nos reflexos (existência confirmada pelo Explore B), mas a camada de squad.yaml não os impõe.

## Veredito de lote

- **A. Config**: OK em todos; 100% dos `components.agents` declarados batem com arquivos reais.
- **B. Liveness**: OK intra-squad (chief + experts); todos os `*.chief` existem.
- **D. Roteamento**: o roteamento mora **dentro dos agents/.md** (não em squad.yaml), conforme padrão K-011. Não testado handshake recíproco.
- **E. Contrato**: K-009 aplicável a todos os 10.
- **F. Coerência**: K-002 e **K-012** (duplicação Caliope×copy-master) são os defeitos.
- **G. Segurança**: K-008 aplicável a todos os 10 (sem veto explícito). Verdade dobrada para **Egide** (paradoxo).

## Achado novo do lote

```json
{"id":"K-012","severidade":"ALTO","classe":"dados","titulo":"Duplicação de ~19 personalidades de copywriting entre Caliope/agents/ (23) e Caliope/copy-master/agents/ (33) — mesmo arquivo .md por nome em dois paths","evidencia":[{"arquivo":"Caliope/agents/eugene-schwartz.md","linha":1},{"arquivo":"Caliope/copy-master/agents/eugene-schwartz.md","linha":1},{"arquivo":"Caliope/agents/gary-halbert.md","linha":1},{"arquivo":"Caliope/copy-master/agents/gary-halbert.md","linha":1}],"hipotese_pai":"K-002","raio_de_explosao":"roteamento-ambiguo-versoes-divergentes","recomendacao_breve":"consolidar: mover os 10 mestres exclusivos do copy-master para Caliope/agents/ + descartar o sub-squad OU declarar copy-master como squad independente e remover duplicatas de Caliope/agents/","status":"aberto"}
```
