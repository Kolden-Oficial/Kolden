---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/brief-visual/banners-remarketing|banners-remarketing]]"
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/brief-visual/design-tokens-vilela|design-tokens-vilela]]"
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/brief-visual/gallery-expansion|gallery-expansion]]"
  - "[[sobre-a-empresa/Projetos/Ativos/vilela-construction/google-ads/brief-visual/og-image-briefing|og-image-briefing]]"
---

# Brief Visual — Vilela Construction · Google Ads

> **Origem:** handoff Peitho + Harmonia → Aglaia (2026-07-09).
> **Escopo:** pacote de briefings visuais para (a) og:image branded da LP, (b) banners Remarketing Display, (c) gallery expansion (Flooring + Painting), (d) referência visual futura para PMax.
> **Ligação com o ROADMAP Google Ads:** Onda 2 (LP profissional) + Onda 3 Phase 1 (Criativo).

---

## Sumário dos 5 arquivos deste diretório

| # | Arquivo | Escopo | Status | Bloqueios |
|---|---|---|---|---|
| 1 | [`design-tokens-vilela.md`](./design-tokens-vilela.md) | Design tokens propostos — cor / tipo / espaço / radius / trust — fonte-de-verdade visual da marca Vilela em mídia paga | ✅ Brief pronto | Auditar hex real do `brand` Tailwind atual (§7 do dossiê site) e ajustar §2.1 se divergir |
| 2 | [`og-image-briefing.md`](./og-image-briefing.md) | Spec da og:image 1200×630 branded para substituir preview Lovable — 3 variações (kitchen, bathroom, exterior) | ✅ Brief pronto para Aglaia executar | ⏳ Aprovação Ronan/Bernardo da direção da Variação C · ⏳ Thiago envia foto de exterior real (G1) ou Aglaia usa foto neutra temporária |
| 3 | [`banners-remarketing.md`](./banners-remarketing.md) | Spec dos 5 tamanhos GDN core (300×250, 728×90, 160×600, 300×600, 320×50) × 2 variações (kitchen, bathroom) = 10 banners iniciais | ✅ Brief pronto para Aglaia executar | ⏳ Bernardo entrega URL final da LP (B5 do ROADMAP) antes do QA final · ⏳ Caliope valida copy das variações |
| 4 | [`gallery-expansion.md`](./gallery-expansion.md) | Brief para os 2 pares before/after faltando na LP (Flooring + Painting) — fecha F9 do landing-page-fixes | ✅ Brief pronto | ⏳ Thiago fornece fotos (G1) ou Vilela aprova fotógrafo local (G2, ~USD 600–1.200) |
| 5 | `_INDEX.md` (este arquivo) | Índice dos 4 briefings + status de entrega + fluxo de aprovação | ✅ | — |

---

## Fluxo de dependências (o que destrava o quê)

```
design-tokens-vilela.md  ✅
        │
        ├──► og-image-briefing.md  ⏳ (bloqueio: foto exterior real + aprovação Ronan)
        │
        ├──► banners-remarketing.md  ⏳ (bloqueio: URL LP final + copy Caliope)
        │
        └──► gallery-expansion.md  ⏳ (bloqueio: Thiago envia fotos OU aprovação fotógrafo)
```

Os 3 briefings de execução dependem do `design-tokens-vilela.md` como base — **este é o único que pode ser aprovado e considerado fonte-de-verdade sem esperar por nada**. Os demais aguardam desbloqueios humanos antes de a Aglaia produzir os artefatos finais.

---

## Aprovações necessárias antes de subir qualquer asset no repo `vilela-bright-space`

- [ ] **Ronan aprova direção visual** de:
  - [ ] og:image Variação C (a mais visível — default global do `<head>`)
  - [ ] Banner Remarketing 300×600 (o mais rico dos 5 tamanhos)
  - [ ] Estrutura de gallery expansion (Flooring + Painting)
- [ ] **Bernardo aprova**:
  - [ ] URL final da LP Kolden (destino dos banners)
  - [ ] Foto do Kitchen e Bathroom serem reutilizadas em og:image e banners
  - [ ] Uso do texto "Serving MA + NH" no badge trust (implica licenciamento em NH — B1 do ROADMAP)
- [ ] **Julio confirma com Thiago**:
  - [ ] Envio das fotos de Flooring e Painting (ou aprovação do orçamento de fotógrafo local)
  - [ ] Envio de foto de exterior/fachada residencial (Variação C og:image)
  - [ ] Property release por escrito dos clientes cujas casas aparecem (compliance)
- [ ] **Caliope valida a copy final** dos banners de Remarketing (voz honest & grounded — validar se algum ajuste é necessário nas 5 variações Kitchen + 5 Bathroom).

---

## Ordem sugerida de execução Aglaia (quando bloqueios saírem)

1. **Sprint 1 — Design tokens finalizados** (D+3)
   - Aglaia audita hex real do `brand` Tailwind atual da LP.
   - Ajusta `design-tokens-vilela.md` §2.1 se divergir do `#E63C1E` proposto.
   - Publica `tokens.json` e `tokens.css` derivados (opcional handoff Harmonia).
2. **Sprint 2 — og:image Variação C** (D+4/5, prioridade máxima — é o default global)
   - Produz Variação C usando foto de exterior (Plano B se Thiago não fornecer).
   - Entrega no path `vilela-bright-space/src/assets/og-vilela-exterior.png`.
   - Harmonia atualiza `__root.tsx`.
3. **Sprint 3 — og:image Variações A e B** (D+5/6)
   - Kitchen usando `hero-kitchen.jpg` (asset órfão do repo).
   - Bathroom usando `hero-bathroom.jpg` ou `bathroom-after.jpg`.
4. **Sprint 4 — 10 banners Remarketing** (D+6/7)
   - Ordem por volume esperado: 300×250 → 320×50 → 728×90 → 300×600 → 160×600.
   - Kitchen primeiro, Bathroom depois.
   - Copy validada por Caliope antes de exportar PNGs.
5. **Sprint 5 — Gallery expansion** (D+7/8)
   - Se fotos chegaram: edit leve (Aglaia) → integração (Harmonia) em `BeforeAfter.tsx`.
   - Se não chegaram: escalar Plano B (fotógrafo local) — decisão até D+7 max.

---

## Especificações técnicas cross-referenciadas

| Tipo de asset | Dimensões | Peso alvo | Peso limite Google | Formato | Path final no repo |
|---|---|---|---|---|---|
| og:image | 1200×630 | 150–250 KB | 300 KB (soft — sem limite Facebook) | PNG-24 ou JPEG q90 | `src/assets/og-vilela-*.png` |
| Banner 300×250 | 300×250 | ≤ 100 KB | 150 KB | PNG-24 | Google Ads library (não vai no repo) |
| Banner 728×90 | 728×90 | ≤ 100 KB | 150 KB | PNG-24 | idem |
| Banner 160×600 | 160×600 | ≤ 100 KB | 150 KB | PNG-24 | idem |
| Banner 300×600 | 300×600 | ≤ 100 KB | 150 KB | PNG-24 | idem |
| Banner 320×50 | 320×50 | ≤ 40 KB | 150 KB | PNG-24 | idem |
| Gallery before/after | 1920×1080+ | ≤ 400 KB | — | JPEG q90 | `src/assets/{flooring,painting}-{before,after}.jpg` |

---

## Legenda de status

- ✅ **Brief pronto para Aglaia executar** — este documento está finalizado, Aglaia pode começar a produzir assets a qualquer momento; apenas depende dos desbloqueios humanos abaixo.
- ⏳ **Dependência (Thiago fornece assets before/after)** — sem input externo do cliente, não avança.
- ⏳ **Bloqueio (aprovação Ronan/Bernardo antes de subir no repo)** — Aglaia produz o artefato, mas não sobe no repo `vilela-bright-space` até validação.

---

## Referências cruzadas

- **Dossiê site (assets atuais + tokens Lovable):** `../../dossie-site-vilela-construction.md`
- **Landing page fixes (F6 og:image, F9 gallery):** `../../landing-page-fixes-2026-07.md`
- **ROADMAP Google Ads (§3 estratégia, Onda 2 LP, Onda 3 criativo):** `../ROADMAP.md`
- **Skill Aglaia — direção brand-kit:** `Aglaia/.claude/skills/direcao-de-brand-kit-visual/SKILL.md`
- **Skill Aglaia — engenharia prompt imagem:** `Aglaia/.claude/skills/engenharia-de-prompt-de-imagem/SKILL.md`
- **Kolden design system (método espelhado):** `sobre-a-empresa/Kolden/marca/design-system/`

---

_Índice mantido por Aglaia. Atualizar status de cada briefing conforme entregas evoluem. Última atualização: 2026-07-09._
