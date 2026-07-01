---
id: 2026-07-01.deck-rosie-360.story
titulo: "Story — Deck Rosie 360 para Bruno"
agente_criador: sm
agente_validador: po
status: ready
sprint: 2026-W27
prioridade: P0
estimativa_horas: 6
atualizado_em: 2026-06-30
relacionados: [spec, qa-gate]
---

# Story 2026-07-01.deck-rosie-360

## Como

A Kolden, contratada para gestão de marketing da Rosie desde 18/05/2026.

## Eu quero

Apresentar formalmente ao Bruno (sócio operacional Rosie) a estratégia 360° de tráfego, email,
comercial e conteúdo orgânico para os próximos 90 dias, com detalhamento por canal e cronograma
faseado, em formato de deck HTML executável (reveal.js) com paleta híbrida Kolden+Rosie.

## Para que

Obter aprovação para iniciar a Fase 1 (Descoberta) na segunda-feira após a reunião, alinhando
verba de mídia (R$ 18k/mês), modelo de parceria com Catarina (Modelo 2 — Embaixadora) e
responsabilidades compartilhadas (Kolden × Bruno) nos próximos 7 dias.

## Acceptance Criteria (10 pontos — checklist do PO)

- [ ] **AC-1 · Estrutura**: O deck tem ≥35 slides core + ≥7 slides apêndice distribuídos em 6 capítulos
  (Brandbook, Mercado, Estratégia, Detalhamento por canal, Fases, Fechamento). [FR-2, FR-4]

- [ ] **AC-2 · Brandbook fiel ao manual**: Todos os elementos de identidade (Brand Idea, Persona, Propósito,
  Valores, Voz, Paleta, Tipografia, Fotografia) citam página explícita do Manual de Marca Rosie v.01.04.2024.
  [FR-5..FR-13, CON-1]

- [ ] **AC-3 · Mercado citado**: Toda métrica de mercado (TAM, concorrentes, Insider, Catarina) traz fonte
  datada (NuvemCommerce 2025, ABComm 2024-2026, Bloomberg Línea 2025, Exame 2026, InfoMoney 2025).
  [FR-14..FR-17, CON-2]

- [ ] **AC-4 · Tese e mapa omnichannel**: A tese é uma frase única ancorada na Brand Idea oficial. O mapa
  omnichannel tem 4 etapas (Atrai/Converte/Retém/Refere) com ≥20 nodes e KPIs de transição visíveis.
  [FR-18..FR-20]

- [ ] **AC-5 · Detalhamento por canal**: Meta apresenta ≥12 campanhas, Google ≥10, Email 7 cadências,
  Kommo pipeline de 6 estágios + scripts no tom Rosie, Social orgânico calendário mensal, Catarina
  modelo de parceria + 6 entregáveis. [FR-21..FR-26]

- [ ] **AC-6 · Fases detalhadas**: Cada uma das 3 fases (Descoberta/Ativação/Otimização) tem exatamente
  3 slides: Deep Dive (5 blocos), Gantt 8 semanas com ≥7 frentes, Gates de decisão com condição de
  avanço e ramo de pivôt. [FR-27..FR-30]

- [ ] **AC-7 · Números com disclaimer**: Verba mensal por fase (R$18k/35k/60k) + métricas alvo (CAC R$95
  blended, ROAS 4× mín., AOV R$380, GMV 6m R$790k) + disclaimer "hipótese a validar com 30 dias de dados
  ao vivo" em cada slide com número. [FR-31, FR-38, CON-3]

- [ ] **AC-8 · Rastreabilidade visível**: Cada slide carrega no footer pequeno o(s) FR/NFR/CON que ele
  cumpre OU a fonte de pesquisa que o lastreia. Esse é o gate central do Artigo IV (No Invention). [FR-37]

- [ ] **AC-9 · Funcional**: Toggle Live (oculta apêndice) responde à tecla L. Setas navegam slides. F11
  ativa fullscreen. URL `?mode=live` abre direto em modo apresentação. Mobile responsivo até 768px.
  PDF backup via Chrome headless gera arquivo &lt;10 MB. [FR-36, NFR-4..7]

- [ ] **AC-10 · Limpeza**: Zero referências a IDs internos de tarefa (KLD-XXX) no deck visível. Toda copy
  em PT-BR estrito (termos técnicos em inglês permitidos somente quando o ecossistema impõe). [CON-5, CON-6]

## File List (atualizar conforme implementa)

- [x] `docs/research.json` — fontes e dados validados (@analyst)
- [x] `docs/spec.md` — requirements numerados (@pm)
- [x] `docs/story.md` — esta story (@sm)
- [x] `docs/qa-gate.md` — 7 verificações de qualidade (@qa)
- [ ] `index.html` — implementação do deck rastreável (@dev)
- [ ] `css/rosie-tokens.css` · `css/kolden-chrome.css` · `css/deck.css` — tokens e layout (@dev)
- [ ] `js/deck-init.js` — config reveal.js + toggle Live (@dev)
- [ ] `dados/numbers.json` — verba/métricas centralizadas (@dev)

## Definition of Done

1. Todos os 10 AC marcados.
2. QA-Gate executado com veredito **PASS**.
3. Smoke-test em Chrome + Edge + Firefox passa (NFR-4).
4. PDF backup gerado e validado em &lt;10 MB (NFR-5).
5. Pasta auto-contida (NFR-10) — sem links externos quebrados internos.
6. Rastreabilidade FR/NFR validada via `grep "FR-" index.html` ≥ 35 ocorrências.
7. Story marcada **Done** + handoff para `@devops *push` somente sob ordem explícita do Ronan.

## Notas do SM (River)

- Story extraída do Spec Pipeline com complexidade STANDARD (14 pts) — não exige spec adicional.
- O deck é entrega única (não há epic associado) — File List é a única instância. Não há refactor pré-implementação previsto.
- Risco principal: **escopo creep** (o Ronan pode pedir mais slides na revisão). Mitigação: AC-1 fixa
  cota mínima; novos slides são iteração pós-DoD, não parte desta story.
- Risco secundário: **fontes datadas** (alguns números do Insider são de 2024-2025; podem estar defasados).
  Mitigação: AC-3 exige citação explícita; @qa verifica no gate.
