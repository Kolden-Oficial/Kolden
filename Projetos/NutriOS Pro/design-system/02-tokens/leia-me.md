---
id: 02-tokens-leia-me
titulo: "NutriOS Pro — Design Tokens (leia-me)"
resumo: "Mapeamento marca→semântica, estratégia dark-first e guia de aplicação dos tokens (tokens.css / tailwind.tokens.js / tokens.json) sobre o app shadcn/ui existente — referência, sem editar o app."
categoria: projeto
status: oficial
atualizado-em: 2026-06-24
relacionados: [01-auditoria-ui-atual, 03-componentes, tokens.css, tailwind.tokens.js, tokens.json]
---

# Design Tokens — NutriOS Pro

> Ponte entre o [brandbook](../../brandbook/03-identidade-visual.md) e o redesign do código.
> Identidade **própria** do NutriOS Pro (verde/teal, dark-first) — **não** usa a paleta scarlet/ink da Kolden.
> Este documento é **referência**: ninguém edita `app/` aqui. Ele diz exatamente o que colar e onde.

## 1. Arquivos deste pacote

| Arquivo | O que é | Para quê |
|---|---|---|
| `tokens.json` | Fonte única de verdade (formato DTCG) | Pipeline de tokens (Style Dictionary), documentação, rastreabilidade |
| `tokens.css` | CSS custom properties HSL, prontas para `:root`/`.dark` | **Colar no `app/src/index.css`** — muda a identidade sem renomear var |
| `tailwind.tokens.js` | Preset Tailwind v3 (cores nomeadas, fontes, raio, sombra) | Importar como `preset` no `app/tailwind.config.ts` |

`tokens.json` é a verdade; `tokens.css` e `tailwind.tokens.js` derivam dele. Mudou um valor → muda no JSON primeiro.

## 2. Estratégia dark-first

A marca **nasce no escuro**. Hoje o app é light-first: o `:root` (claro) é a base e o `.dark` é derivado (ver auditoria §2.2, e o bug P0-2 — o `--primary` troca de cor entre temas). Aqui **invertemos a hierarquia**:

- **Tema escuro = base canônica.** Fundo **Deep Forest `#0D2320`**, primário **Neon Mint `#00E87A`** com **foreground PRETO**. É o tema de referência da marca; o bloco `.dark` em `tokens.css` é o mais completo.
- **Tema claro = variante coerente**, derivada, para superfícies brancas (PDF do paciente, e-mail, modo claro opcional). Não é a fonte da paleta.
- **`--primary` NÃO troca de identidade entre temas** (corrige o P0-2). No dark ele é Neon Mint; no claro, como mint falha contraste de texto sobre branco (1.64:1), o **primário de texto/link vira Forest Green `#0A5C52`** (7.88:1) e o mint fica reservado a **fill** de botão (com texto preto). O papel semântico ("a cor de ação") é estável; só o valor bruto muda — que é o comportamento correto de um alias de token.

## 3. Mapeamento marca → token semântico (shadcn)

Os **nomes das vars são os mesmos** que o shadcn/ui já consome (ver `app/tailwind.config.ts:21-72`). Nada precisa ser renomeado.

| Cor de marca | Hex | HSL (dark) | Token shadcn (dark) |
|---|---|---|---|
| Deep Forest | `#0D2320` | `172 46% 9%` | `--background`, `--sidebar-background` |
| Dark Teal | `#0F3D35` | `170 61% 15%` | `--card`, `--popover` |
| (Dark Teal +luz) | — | `169 55% 18%` | `--secondary` |
| Forest Green | `#0A5C52` | `173 80% 20%` → `173 60% 18%` | `--border`, `--input` |
| Aqua Green | `#2BBFA0` | `167 63% 46%` | `--accent` (foreground preto) |
| Neon Mint | `#00E87A` | `152 100% 45%` | `--primary`, `--ring`, `--success` (foreground preto) |
| Black | `#000000` | `0 0% 0%` | `--primary-foreground`, `--accent-foreground` |
| White | `#FFFFFF` | `0 0% 100%` | `--foreground`, `--card-foreground` |
| Âmbar (fora da paleta, por contraste de alerta) | `#F2A13D` | `38 92% 58%` | `--warning` |
| Vermelho (idem, erro) | `#E8513F` | `4 80% 58%` | `--destructive` |

> `--warning` e `--destructive` ficam fora do verde **de propósito**: num produto verde-dominante, alerta/erro precisam de matiz quente para não se confundirem com sucesso (mint). Reforça o brandbook §3.3 (não depender só de cor; daltonismo verde-vermelho).

## 4. Como aplicar no app (referência — linha a linha)

### 4.1 `app/src/index.css`

| Hoje (light-first) | Trocar por |
|---|---|
| Comentário "nutriOS pro Design System v2.0" (linhas 5–14) | Cabeçalho de `tokens.css` (créditos da paleta oficial) |
| Bloco `:root { ... }` (linhas 17–73) | Bloco `:root` de `tokens.css` (variante CLARA derivada) |
| Bloco `.dark { ... }` (linhas 75–119) | Bloco `.dark` de `tokens.css` (**base canônica da marca**) |
| `--radius: 0.5rem;` (linha 57) | `--radius: 0.75rem;` (mais rounded, ecoa o monograma) |
| `--gradient-*` (linhas 70–72) | `--gradient-*` de `tokens.css` (verde→mint, sem cyan/blue) |
| utilitários `.gradient-*`, `.glass`, `.card-hover` (linhas 146–172) | **manter** — só passam a ler as novas vars |

Adicionar (não existe hoje): `--gradient-water`, `--shadow-sm/md/lg/glow`. O `--gradient-water` substitui o gradiente `from-cyan-500 to-blue-500` hardcoded em `WaterTracker.tsx:179` (P1 da auditoria).

### 4.2 `app/tailwind.config.ts`

| Hoje | Trocar por |
|---|---|
| `fontFamily` (linhas 113–118): `sans: Poppins→Inter`, `headline: Inter`, `mono: JetBrains` | `display: "Baloo 2"`, `sans: Inter`, `mono: JetBrains` (do preset). **Baloo 2 acolhe, Inter informa.** |
| `borderRadius` (linhas 74–78): `md = radius-2px`, `sm = radius-4px` | preset: `md = radius-4px`, `sm = radius-6px` (base 12px) |
| (sem `boxShadow`/`backgroundImage` custom) | adicionados pelo preset (`shadow-glow`, `bg-gradient-*`) |
| mapeamento `hsl(var(--x))` (linhas 21–72) | **manter intacto** — o preset só estende |

Forma de adoção: `import nutriosPreset from "../design-system/02-tokens/tailwind.tokens.js"` e `presets: [nutriosPreset]`. O bloco `colors` semântico (hsl(var())) permanece no config do app; o preset adiciona as cores nomeadas de marca (`forest-*`, `mint`, `aqua`, `chart.*`).

### 4.3 Webfonts (pré-requisito — P1 da auditoria)

A auditoria (§2.3, §5-5) aponta que Poppins/Inter/JetBrains são declaradas mas **não há `@font-face`/`@import`**, com risco de cair em `system-ui`. Para a identidade se materializar, garantir no `app/index.html` (ou via `@import` no topo do `index.css`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

E ativar **tabular-nums** em colunas numéricas clínicas (kcal, g, %, medidas): classe utilitária `tabular-nums` ou `font-feature-settings: "tnum" 1` (ver `tokens.json` → `font.feature.tabular-nums`).

### 4.4 Limpeza pré-reskin (da auditoria)

- Remover `app/src/App.css` (resíduo Vite roxo) e `app/src/pages/Index.tsx` (órfão em inglês) — P0-3.
- Consolidar toast (`Toaster` Radix + `Sonner`) — P1-6; manter um só estilo de notificação.
- Tokens `--sidebar-*` ficam definidos (navegação é header hoje); se a navegação seguir em header, são peso morto — manter por ora, remover quando confirmado.

## 5. Pares de cor aprovados (WCAG 2.1 AA — verificados)

| Par (texto / fundo) | Contraste | Veredicto | Uso |
|---|---|---|---|
| White `#FFFFFF` / Deep Forest `#0D2320` | **16.43:1** | AAA | Corpo, dados clínicos (padrão de leitura) |
| White / Dark Teal `#0F3D35` | 12.07:1 | AAA | Texto sobre cards |
| Neon Mint `#00E87A` / Deep Forest | 10.03:1 | AAA (texto grande/ícone) | Highlight, número-chave, título curto, ícone CTA |
| **Black `#000000` / Neon Mint** | **12.82:1** | AAA | **PAR DE CTA**: texto PRETO em botão mint — nunca branco |
| Black / Aqua Green `#2BBFA0` | 9.06:1 | AAA | Texto/ícone preto sobre chip aqua |
| Aqua Green / Deep Forest | 7.09:1 | AA (texto), AAA (grande) | Accent text grande, ícone secundário |
| muted-fg `#7FA39B` / Deep Forest | 5.96:1 | AA | Texto secundário, legendas, placeholder |
| White / Forest Green `#0A5C52` | 7.88:1 | AAA | Texto branco em superfície forest |
| Forest Green / White `#FFFFFF` | 7.88:1 | AAA | **Tema claro**: primário de texto/link sobre branco |

### Reprovados — NÃO usar

| Par | Contraste | Por quê |
|---|---|---|
| **Neon Mint / White** | **1.64:1** | Mint como TEXTO sobre branco falha — no tema claro mint é só fill (com texto preto) |
| Neon/Aqua sobre Forest Green/Dark Teal (como texto) | < 4.5:1 | Verde sobre verde — só decoração grande, nunca informação (brandbook §3.3) |
| White sobre Neon Mint | 1.64:1 | Branco sobre mint falha — o foreground do mint é PRETO |

Regra prática: **Neon Mint nunca é texto longo**; é destaque, CTA-fill, ícone, número. Corpo e dados clínicos são **brancos sobre escuro**. Foco/erro não dependem só de cor (acrescentar ícone/texto).
