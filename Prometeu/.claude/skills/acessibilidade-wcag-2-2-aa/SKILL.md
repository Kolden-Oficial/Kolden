---
name: acessibilidade-wcag-2-2-aa
description: >
  Use quando a demanda envolver acessibilidade web — auditar componente, feature
  ou site inteiro contra WCAG 2.2 AA; instrumentar testes automáticos (axe-core,
  Lighthouse a11y, Pa11y, WAVE); rodar teste manual com teclado + screen reader
  (NVDA/JAWS/VoiceOver); ou definir critério de aceite acessível numa story. Cobre
  os 4 princípios POUR (Perceivable/Operable/Understandable/Robust), o gate de
  aceite "0 violações críticas + contraste texto ≥4.5:1 + contraste UI ≥3:1 +
  focus ring visível + navegação 100% por teclado", e as gotchas típicas (aria
  errado, focus trap, dynamic content sem announcement, skip link ausente).
  Gatilhos: "acessibilidade", "a11y", "WCAG", "screen reader", "teclado",
  "contraste", "axe", "aria", "focus", "cliente com deficiência", "auditoria de
  acessibilidade". Dono: @qa (Quinn). Delegação de @ux-design-expert (Uma) para
  Quinn quando design entrega mockup — Quinn checa antes do dev implementar.
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Acessibilidade WCAG 2.2 AA

Acessibilidade não é feature — é gate. Site inacessível **exclui usuário legítimo**,
gera passivo legal (ADA nos EUA, LBI 13.146/2015 no Brasil) e piora SEO (semântica
correta = crawler feliz). Esta habilidade opera WCAG 2.2 AA como padrão mínimo Kolden.

## Os 4 princípios POUR

**P — Perceivable:** o usuário deve conseguir perceber o conteúdo por algum sentido.
- Texto alternativo em imagem (alt significativo, não "imagem")
- Legenda em vídeo (SRT/VTT)
- Contraste texto sobre fundo ≥4.5:1 (texto normal) / ≥3:1 (texto grande ≥18pt ou 14pt bold)
- Contraste componente UI (ícone, borda de input) ≥3:1

**O — Operable:** o usuário deve conseguir interagir por qualquer input.
- Toda ação clicável também tem que ser acionável por teclado (`Enter`/`Space`)
- Focus visível (nunca `outline: none` sem substituto)
- Skip link no topo (`<a href="#main">Pular para conteúdo</a>`)
- Sem armadilha de foco (nenhum modal que aprisiona tab sem ESC de saída)
- Target size ≥24×24 CSS pixels (WCAG 2.2 novo — Success Criterion 2.5.8)

**U — Understandable:** o conteúdo e o comportamento devem ser previsíveis.
- Idioma declarado (`<html lang="pt-BR">`)
- Formulário com label associado (`<label for>` ou `aria-labelledby`)
- Erro identifica campo + descreve como corrigir (não só "erro de validação")
- Autocomplete em campos comuns (WCAG 2.2 SC 1.3.5)

**R — Robust:** funciona em qualquer AT (assistive technology).
- HTML válido (`<button>` para botão, não `<div onclick>`)
- ARIA usado só quando semântica nativa não basta ("First rule of ARIA: don't use ARIA")
- Componentes dinâmicos anunciam mudança (`aria-live="polite"` para status, `aria-live="assertive"` para erro)

## WCAG 2.2 — mudanças relevantes vs 2.1

Kolden opera em 2.2 AA (mais recente estável, out/2023). Novos success criteria:
- **2.4.11 Focus Not Obscured (Minimum)** — foco não pode ficar totalmente escondido por elemento fixo (header sticky).
- **2.5.7 Dragging Movements** — toda interação de drag tem que ter alternativa por clique.
- **2.5.8 Target Size (Minimum)** — alvos ≥24×24 CSS pixels (menor que AAA 44×44 mas obrigatório).
- **3.2.6 Consistent Help** — se ajuda existe em uma página, aparece no mesmo lugar em outras.
- **3.3.7 Redundant Entry** — não pedir a mesma info duas vezes no mesmo fluxo.
- **3.3.8 Accessible Authentication (Minimum)** — não obrigar CAPTCHA/reconhecimento cognitivo sem alternativa.

## Testes automáticos (obrigatórios em CI)

| Ferramenta | Cobre | Não cobre |
|---|---|---|
| **axe-core** (via `@axe-core/react`, jest-axe, playwright-axe) | ~57% das violações WCAG A/AA detectáveis por código | Contraste dinâmico, teclado real, contexto semântico |
| **Lighthouse a11y** | Score composto, quick wins | Interatividade real |
| **Pa11y** (CLI) | Auditoria em batch de várias URLs | Comportamento interativo |
| **WAVE** (extensão browser) | Visualização estrutural | Não roda em CI |

Regra: **axe-core no CI + jest-axe em unit test de componente**. Gate: 0 violações críticas
e 0 sérias. Warnings viram issue no backlog.

```ts
// exemplo: teste de componente
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

test('botão passa a11y', async () => {
  const { container } = render(<Button>Comprar</Button>)
  expect(await axe(container)).toHaveNoViolations()
})
```

## Testes manuais (obrigatórios antes de release)

Automatização pega ~57%. O resto exige humano.

1. **Teclado only:** navegar TODO o fluxo sem tocar o mouse. Tab avança, Shift+Tab volta, Enter/Space
   ativa, ESC fecha modal. Se algo é inacessível, é bug bloqueante.
2. **Screen reader:** rodar o fluxo com NVDA (Windows, free) OU JAWS (padrão empresarial) OU
   VoiceOver (macOS/iOS). Anota: rótulos confusos, ordem de leitura errada, atualização silenciosa.
3. **Zoom 200%:** o layout quebra? Texto vira ilegível? Botão desaparece?
4. **Prefers-reduced-motion:** ligar em `about:preferences` → animações param?
5. **Alto contraste:** Windows High Contrast Mode → botões ainda distinguíveis?

## Gate de aceite Kolden

Uma story só é "Done" se:
- [ ] axe-core: 0 violações críticas/sérias
- [ ] Lighthouse a11y ≥95
- [ ] Contraste texto ≥4.5:1 (medido, não estimado)
- [ ] Contraste UI (borda, ícone) ≥3:1
- [ ] Focus ring visível em TODO elemento interativo
- [ ] Fluxo completo navegável por teclado
- [ ] `<html lang="pt-BR">` presente
- [ ] Forms com label associado
- [ ] Screen reader anuncia mudança dinâmica (spinner, toast, modal)
- [ ] Target size ≥24×24 CSS pixels em mobile
- [ ] Skip link no topo se navegação for longa

## Gotchas comuns

- `<div onclick>` — usar `<button>` sempre que ação é botão. `<div>` clicável exige `role="button" tabindex="0"` + handler de teclado.
- `outline: none` sem substituto — quebra focus visible. Se remover outline, adicionar `box-shadow` ou `border` no `:focus-visible`.
- Modal sem focus trap — o foco vaza pra trás do overlay. Usar `focus-trap` ou Radix Dialog.
- Modal sem retorno de foco — ao fechar, o foco tem que voltar ao trigger.
- `alt=""` em imagem informativa — só usar em imagem decorativa. Informativa exige alt significativo.
- `aria-label` em coisa que já tem texto visível — redundante e prevalece sobre o texto visível. Ruim.
- `aria-hidden` em elemento focável — bug clássico: elemento invisível pra AT mas navegável por tab.
- Toast/notificação sem `aria-live` — screen reader não anuncia.
- Placeholder como único rótulo — some ao digitar. Sempre `<label>` explícito.

## Handoffs

- **Design com contraste fraco** → devolver para Uma (@ux-design-expert). Não maquiar contraste no
  dev — corrigir no design token.
- **Componente customizado complexo (combobox, tree, tabs)** → usar Radix UI (headless, a11y
  correto por default) e handoff Dex para implementar em cima.
- **Auditoria full-site** → Ariadne (`auditoria-tecnica-em-escala`) roda auditoria de crawl que
  inclui alt em imagem, hierarquia H1-H6, lang. Ela consolida.

## Regras Kolden

- **Padrão:** WCAG 2.2 AA. AAA é opcional (contraste 7:1, sem justificação; útil em domínio saúde/gov).
- **Não maquiar:** se `aria-label` está sendo usado para "enganar" o axe, é bug. Corrigir semântica.
- **First rule of ARIA:** no ARIA is better than bad ARIA. Prefira HTML nativo. `<button>` > `<div role="button">`.
- **Radix UI:** componentes complexos usam Radix (Kolden stack aprovada). shadcn/ui herda a11y do Radix.
- **Testar com AT real:** ninguém entrega feature sem ter rodado 1 fluxo com NVDA ou VoiceOver.

---
## Atribuição
Herança histórica: **W3C WAI (Web Accessibility Initiative)** — WCAG 2.2 (2023);
**Adrian Roselli** — comunidade a11y (adrianroselli.com), padrões de tabelas acessíveis e forms;
**Léonie Watson** — TetraLogical, ARIA authoring practices; **Deque Systems** — axe-core (2015+);
**Marcy Sutton** — testing accessibility patterns; **Sara Soueidan** — accessible components series
(padrão prático). Adaptado de `github.com/msitarzewski/agency-agents@a597cb6` (MIT), bucket
B03/engineering, IDs TEST G1, G2, G3, G4.
