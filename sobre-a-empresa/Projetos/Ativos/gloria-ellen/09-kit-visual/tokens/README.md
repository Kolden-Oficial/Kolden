---
tipo: projeto
projeto: gloria-ellen
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
---

# Tokens — Glória Ellen

Arquitetura de design tokens da marca, no formato **DTCG (Design Tokens Community Group)**.

Aqui vive a fonte da verdade das cores, tipografia, espaçamento, raio, sombra e textura de grão. Toda peça — landing page, deck, PDF de orçamento, e-mail signature — puxa daqui.

---

## Filosofia

**Um valor cru mora em um único lugar.**

Se algum dia a marca decidir que o azul-mar precisa ficar meio-grau mais frio, esse ajuste acontece em **um** arquivo. Todo o resto — botão, cartão, marca d'água, moldura da galeria — herda o novo valor sem tocar em nada.

Sem token, cada peça tem seu próprio "azul-mar" — e três meses depois eles não conversam mais.

---

## Arquitetura em três camadas

O sistema opera em cascata. Você **consome** a camada de cima; **edita** a de baixo.

### 1. `primitive` — o valor cru

Coordenadas de cor, dimensões, pesos. Sem uso associado.

```
color.mar.500         → #3D5A6C
color.verde-arvores.500 → #6B7F5C
color.ink.900         → #2A2B27
```

> Regra: **nunca consumir primitive direto na UI**. Se aparecer `#3D5A6C` num CSS, é bug.

### 2. `semantic` — o ponto de uso

Amarra o valor cru a um papel — `brand.primary`, `text.default`, `background.subtle`. É o que a interface consome no dia a dia.

```
semantic.color.brand.primary     → {color.mar.500}
semantic.color.text.default      → {color.ink.900}
semantic.color.background.default → {color.creme.500}
```

> Se um dia quisermos trocar a primária de azul para verde, muda-se **aqui** — em uma linha — e todo botão primário do sistema segue junto.

### 3. `component` — o ponto de aplicação

Amarra o semantic a um componente concreto: `button.primary.bg`, `card.sea.bg`, `watermark.onDarkPhoto`. É a camada opcional que reduz decisão na hora de codar.

```
component.button.primary.bg → {semantic.color.brand.primary}
component.card.sea.bg       → {semantic.color.background.sea}
```

> Use quando um componente precisa de estabilidade forte (ex.: botão primário mudar independente da marca). Se o componente segue a marca 1:1, o semantic basta.

---

## Como puxar no seu projeto

### Via CSS variables (rota padrão do kit)

```css
/* No topo do seu CSS de projeto */
@import "../tokens/tokens.css";

/* Depois é só usar */
.botao-primario {
  background: var(--color-brand-primary);
  color:      var(--color-text-on-dark);
  padding:    var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  box-shadow:    var(--shadow-subtle);
  font-family:   var(--font-family-sans);
  font-weight:   var(--font-weight-medium);
  font-size:     var(--font-size-base);
}

.botao-primario:hover {
  background: var(--color-brand-primary-deep);
}
```

### Grão de filme como assinatura tátil

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 200;
  opacity: var(--texture-filmgrain-opacity);
  mix-blend-mode: var(--texture-filmgrain-blend);
  background-image: var(--texture-filmgrain);
}
```

---

## Como estender

**Cor nova?** Só entra na paleta se for indispensável e não puder ser derivada por opacidade das existentes.

1. Adicione o valor cru em `color.<nome>.500` no `tokens.json`.
2. Amarre um papel em `semantic.color.*` (nunca use crua direto).
3. Reflita a variável em `tokens.css`.
4. Documente a intenção no `$description` do JSON e no comentário do CSS.

**Fonte nova?** Idem — família em `font.family.*`, peso em `font.weight.*`. Se abriu uma família nova, argumente por que Cormorant (serif/logo) ou Inter não resolvem. Sacramento saiu como família ativa na v1.1 do kit (2026-07-02) — ficou apenas como `font.family.script-legado`, registro histórico.

**Espaçamento fora da escala?** Prefira somar/subtrair da escala (`calc(var(--space-6) + var(--space-2))`) antes de criar um valor solto.

---

## O que está fora do escopo daqui

- **Componentes visuais** (botões, inputs, cards prontos) — moram em `../componentes/`.
- **Padrões de layout** (grids, breakpoints) — decidir no nível do produto que consumir.
- **Imagens fotográficas** e presets — moram em `../fotografia/`.

Tokens = a linguagem. Aqui não se escreve poesia — se dá nome aos átomos.

---

## Integração com ferramentas (sugestões, não implementadas)

O `tokens.json` está em **DTCG** puro para permitir integração futura com:

- **Style Dictionary** (Amazon) — gera saídas para iOS/Android/CSS/JS a partir do mesmo JSON. Recomendado quando o kit sair para além da web.
- **Tailwind CSS** — configurar `theme.extend.colors` puxando do `tokens.json` (via plugin ou parser Node). Não implementado aqui para manter o kit stack-agnóstico.
- **Figma Tokens (Tokens Studio)** — o mesmo JSON pode ser importado no plugin para sincronizar design ↔ código.

Nenhuma dessas integrações está viva neste kit. **A rota simples é: `@import "tokens.css"`**. O resto é otimização para quando o volume pedir.

---

## Fonte da verdade

- `tokens.json` — canônico. DTCG.
- `tokens.css` — projeção do semantic em CSS variables. Editar aqui só reflete no que já consome CSS; se mudar aqui e esquecer o JSON, o kit fica dessincronizado. **Regra: edita o JSON primeiro, depois espelha no CSS.**

Se as duas divergirem, o **JSON vence**.
