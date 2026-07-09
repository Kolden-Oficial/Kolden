---
id: 02-tokens-leia-me
titulo: "Omiron — Design Tokens v1 (leia-me)"
resumo: "Como consumir os tokens do Omiron (tokens.json DTCG → tokens.css CSS custom properties → tailwind.tokens.js preset). Camadas primitivo → semântico, mapa marca→token, matriz WCAG 10×10 já cruzada em 01-fundamentos/cores.md §5, regras de auditoria, contrato de compatibilidade com o app Next.js (que NÃO é tocado nesta rodada — brandbook não altera src/)."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Harmonia (design-chief)
missao: m-20260706-193013-omiron-brandbook-completo
relacionados:
  - 01-fundamentos/cores.md
  - 01-fundamentos/tipografia.md
  - 01-fundamentos/grafismos.md
  - 01-fundamentos/tom-visual.md
  - 02-tokens/tokens.json
  - 02-tokens/tokens.css
  - 02-tokens/tailwind.tokens.js
  - 03-componentes/leia-me.md
  - 03-componentes/superficies.md
---

# Tokens Omiron — v1 (leia-me)

> Este é o manual de operação da camada de tokens. Cada valor tem origem rastreável nos fundamentos. Nenhum componente hardcoda hex — só consome semântico via CSS var ou Tailwind class.

## 1. Fonte de verdade

Três arquivos, uma única cadeia de dependência:

```
tokens.json  (DTCG — Design Tokens Community Group)
    │
    ▼
tokens.css   (CSS custom properties com prefix --omiron-*, dark canônico)
    │
    ▼
tailwind.tokens.js  (preset Tailwind consumindo os tokens)
    │
    ▼
componente do app / brandbook / deck (consome via CSS var ou class Tailwind)
```

- `tokens.json` é a **especificação canônica**. Se um valor divergir entre os três arquivos, `tokens.json` ganha.
- `tokens.css` materializa em CSS. Prefixo `--omiron-*` para evitar colisão com qualquer outro design system (Radix, shadcn, etc.).
- `tailwind.tokens.js` expõe cores/spacing/radius/motion/tipografia como preset Tailwind. Cores primitivas ficam como `omiron-*` (uso direto raro); semânticas ficam nos nomes canônicos (`primary`, `card`, `accent`).

## 2. Camadas (primitivo → semântico)

Segue a arquitetura de tokens de Brad Frost / Atomic Design, com uma simplificação sobre o NutriOS Pro: como Omiron é dark-only, não há duplicação `semantic/light` + `semantic/dark`. Só `semantic/dark`, com receita física papiro tratada como token de superfície separado (`--omiron-papiro`, `--omiron-papiro-foreground`).

```
color.primitive.*       ← 11 hex literais imutáveis (10 papéis + verde-planta)
       │
       ▼
color.semantic.dark.*   ← aliases contextuais (background, primary, accent, ...)
       │
       ▼
componente              ← consome semântico via CSS var (nunca hex cru)
                          Ex.: bg-background, text-foreground, ring-ring
```

- **Primitivo** muda quando a marca muda (evento raro).
- **Semântico** muda quando o mapeamento marca→uso muda (raro; nunca por preferência estética individual).
- **Componente** nunca hardcoda hex — só consome semântico.

Mesmo princípio aplica-se a spacing (base 4px), radius (escala soft contida), motion (durations + easings) e tipografia (2 famílias + fallback).

## 3. Mapa marca → token semântico

| Cor primitiva | Hex | HSL | Token semântico |
|---|---|---|---|
| Fundo Profundo | `#141010` | `12 11% 7%` | `--omiron-background` |
| Fundo Elevado | `#1E1712` | `20 15% 10%` | `--omiron-card`, `--omiron-popover`, `--omiron-muted` |
| Fundo Marfim | `#EDE2CE` | `39 55% 87%` | `--omiron-papiro` (superfície de receita/papiro) |
| Dourado Antigo | `#A88148` | `33 41% 47%` | `--omiron-accent`, `--omiron-ring`, `--omiron-border` (@ 30% alpha) |
| Dourado Alto | `#C8A46C` | `35 47% 60%` | `--omiron-accent-alto` |
| Marfim | `#EDE2CE` | `39 55% 87%` | `--omiron-foreground`, `--omiron-primary-foreground`, `--omiron-card-foreground` |
| Marfim Suave | `#B8AC93` | `39 22% 65%` | `--omiron-muted-foreground`, `--omiron-input` (@ 20% alpha) |
| Âmbar Crepúsculo | `#C67A3E` | `24 55% 51%` | `--omiron-primary` (CTA) |
| Âmbar Terra | `#9E5528` | `20 60% 39%` | `--omiron-destructive` |
| Marrom Couro | `#4A2E1A` | `21 48% 20%` | `--omiron-tactil`, `--omiron-papiro-foreground` |
| Verde Planta | `#5C7A3E` | `88 33% 36%` | `--omiron-gamificacao` (USO RESTRITO — gamificação apenas) |

## 4. Matriz de contraste WCAG 10×10

**Movida para `01-fundamentos/cores.md §5.1`** — evita duplicação. Aqui, só o resumo dos pares críticos:

| Uso semântico | Par (texto / fundo) | Contraste | Verdicto |
|---|---|---|---|
| Corpo dark (leitura padrão) | Marfim / Fundo Profundo | **15.02:1** | AAA canônico |
| Corpo sobre card | Marfim / Fundo Elevado | **12.62:1** | AAA |
| Texto secundário | Marfim Suave / Fundo Profundo | **8.42:1** | AAA |
| Título de marca hero | Dourado Alto / Fundo Profundo | **7.79:1** | AAA |
| Destaque de marca | Dourado Antigo / Fundo Profundo | **4.68:1** | AA (≥ 15.75px) |
| CTA primário | Marfim / Âmbar Crepúsculo | **3.18:1** | AA/lg (≥ 20px OK; usar body-lg ou h5) |
| CTA primário alt. | Fundo Profundo / Âmbar Crepúsculo | **4.72:1** | AA (≥ 15.75px bold) |
| Estado de erro | Marfim / Âmbar Terra | **5.11:1** | AA |
| Receita física | Marrom Couro / Fundo Marfim (papiro) | **9.28:1** | AAA |

## 5. Roteiro de aplicação no app Next.js — FASE FUTURA

**Regra desta rodada**: o brandbook NÃO altera `src/` do app. O app tem breaking changes por AGENTS.md do projeto (Next.js com convenções não-documentadas). Toda mudança em app é decisão consciente futura.

Quando essa fase acontecer, o roteiro é:

1. **Copiar** os arquivos de fonte para `app/public/fonts/`:
   - `great-vibes/GreatVibes-Regular.woff2` (+ .woff)
   - `eb-garamond/EBGaramond-Regular.woff2` (+ Medium, SemiBold, Italic — todos com .woff fallback)
2. **Copiar** os arquivos de textura papiro para `app/public/assets/texturas/` (assim que gerados na próxima rodada Harmonia — brief em `01-fundamentos/grafismos.md §2.2`):
   - `papiro-liso.webp` + `papiro-liso.png`
   - `papiro-envelhecido.webp` + `papiro-envelhecido.png`
   - `papiro-manchado.webp` + `papiro-manchado.png`
3. **Importar** `design-system/02-tokens/tokens.css` no CSS raiz do app (`app/src/globals.css` ou equivalente na convenção interna).
4. **Importar o preset** em `app/tailwind.config.ts` (ou `.js`):
   ```ts
   import omironPreset from "../design-system/02-tokens/tailwind.tokens.js";
   export default {
     presets: [omironPreset],
     darkMode: "class",   // dark é canônico; class permite override futuro
     content: [...],
   };
   ```
5. **Auditar** por regressão (§7).
6. **Nunca** substituir tokens por hex cru direto em componente. Se um valor faltar, adicionar como token, não hardcodar.

Enquanto essa fase não acontece, o brandbook e o deck consomem `tokens.css` diretamente via `<link rel="stylesheet">` ou `<style>` inline. Nenhum arquivo `.tsx` do app é tocado.

## 6. Uso da cor Verde Planta

Verde Planta `#5C7A3E` é a única cor com uso semanticamente restrito:

**PODE** ser usada em:
- Fill da planta virtual da gamificação (4 estágios: broto, muda, adulta, árvore).
- Ícone da planta virtual em tela de conquista de gamificação.
- Micro-indicador de "planta crescendo" em barra de progresso da gamificação.

**NUNCA** deve ser usada em:
- Botão de sucesso genérico. Sucesso genérico usa Dourado Alto ou Marfim com ícone check em Dourado Antigo.
- Badge de status "concluído".
- Cor de sucesso em toast/alert.
- Qualquer contexto fora do jogo da planta.

Auditoria automatizada:
```bash
grep -rE "(verde-plant|omiron-verde-planta|omiron-gamificacao|#5C7A3E)" \
  --exclude-dir=gamification \
  --exclude-dir=node_modules \
  design-system/ brandbook/ apresentacao/ app/src/
# -> deve retornar 0 (fora da pasta gamification/)
```

## 7. Regras de auditoria

### 7.1 Preto e branco puros — banidos

```bash
# Uso literal
grep -rE "(#000000|#FFFFFF|#000\b|#FFF\b)" \
  --exclude-dir=node_modules \
  design-system/ brandbook/ apresentacao/ app/src/ \
  --include="*.css" --include="*.md" --include="*.html" --include="*.tsx"

# Classes Tailwind proibidas
grep -rE "\b(bg-white|bg-black|text-white|text-black|border-white|border-black)\b" \
  --exclude-dir=node_modules \
  app/src/ brandbook/ apresentacao/

# rgb literais
grep -rE "rgb\(0,?\s*0,?\s*0\)|rgb\(255,?\s*255,?\s*255\)" \
  --exclude-dir=node_modules \
  design-system/ brandbook/ apresentacao/ app/src/
```

Todos devem retornar 0 (ou apenas comentários justificando — ex.: `rgb(0 0 0 / 0.4)` em sombra é permitido).

### 7.2 Hex fora da paleta canônica

```bash
grep -rE "#[0-9A-Fa-f]{6}" design-system/ brandbook/ apresentacao/ \
  --exclude-dir=node_modules \
  | grep -vE "(141010|1E1712|EDE2CE|A88148|C8A46C|B8AC93|C67A3E|9E5528|4A2E1A|5C7A3E|D4C4A0|C4B08C)"
```

Deve retornar 0 (ou apenas comentários). Os hex `#D4C4A0` e `#C4B08C` aparecem no `linear-gradient` das superfícies papiro como cor de fim do gradiente (extensão do fundo-marfim).

### 7.3 Fontes proibidas como primárias

```bash
grep -rE "font-family:\s*(Inter|Roboto|Helvetica|Arial|system-ui)" \
  design-system/ brandbook/ apresentacao/ --include="*.css" \
  | grep -v "fallback\|omiron-fonte-fallback-critico"
```

Deve retornar 0 — sans-serif como fonte primária de UI está vetado.

### 7.4 Great Vibes em contexto proibido

```bash
grep -rE "(button|\.btn|input|\.input|table|\.table|form|\.form|body|\.body).*Great Vibes" \
  design-system/ brandbook/ apresentacao/ app/src/
```

Deve retornar 0 — Great Vibes é APENAS título hero, saudação, marco narrativo.

### 7.5 Justificação e uppercase-tudo

```bash
grep -rE "text-align:\s*justify" design-system/ brandbook/ apresentacao/ app/src/
grep -rE "text-transform:\s*uppercase" design-system/ brandbook/ apresentacao/ app/src/
```

Ambos devem retornar 0 ou apenas em caption com comentário justificando (dislexia veta ambos em corpo).

### 7.6 Regra CSS opcional (Stylelint)

```json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "/^(color|background|border-color|fill|stroke)/": [
        "#000000", "#000", "#FFFFFF", "#FFF",
        "/rgb\\(0,?\\s*0,?\\s*0\\s*\\)/",
        "/rgb\\(255,?\\s*255,?\\s*255\\s*\\)/"
      ]
    }
  }
}
```

Único bypass permitido: `rgb(0 0 0 / alpha)` em sombra — documentado com comentário no CSS.

## 8. Contrato de compatibilidade com o app Next.js

**Estado atual**: o app tem breaking changes por AGENTS.md do projeto omiron. Nenhum arquivo `src/` é tocado nesta rodada. O design system existe como especificação paralela em `design-system/` — pronto para ser consumido quando a decisão de migração for tomada.

**Compatibilidade prevista**:
- Prefixo `--omiron-*` evita colisão com CSS existente no app.
- `tailwind.tokens.js` é um preset — coexiste com config atual do app até haver migração deliberada.
- Fontes carregadas via `@font-face` local — sem dependência de CDN externo.
- Dark é canônico via `color-scheme: dark` no `<html>` — respeita preferência de sistema por padrão.

**Contrato de handoff para futura Onda de implementação (Hefesto)**:
- Ler `01-fundamentos/*.md` antes de tocar código.
- Ler `03-componentes/leia-me.md` para specs de componentes.
- NUNCA duplicar valor de token — importar via CSS var ou Tailwind.
- Rodar auditoria §7 pré-merge.
- Validar teste de aceite de dislexia (leitura de 3 parágrafos do onboarding em < 90s) com paciente-piloto.

## 9. Iteração anterior (rascunho Hermes v0)

Este `tokens.json` (v1 Harmonia) SOBRESCREVE `docs/pesquisa-referencias/paleta-hex-extraida.md` (rascunho Hermes v0).

**Deltas principais**:

| Papel | v0 rascunho | v1 refinado | Motivo |
|---|---|---|---|
| Fundo Profundo | `#0F0B08` | `#141010` | Mais quente, coerente com sombras dos slides 19-20 |
| Dourado Antigo | `#B8935A` | `#A88148` | Mais envelhecido, menos amarelo — bate com dourado dos capitéis quando fora da luz |
| Marfim Suave | `#C9BFA9` | `#B8AC93` | Mais rebaixado — hierarquia visual clara vs. marfim |
| Âmbar Terra | `#A85C2C` | `#9E5528` | Mais escuro — semântica de alerta ganha peso |
| Fundo Elevado | (não existia) | `#1E1712` | Adicionado — hierarquia de superfície |
| Dourado Alto | (não existia) | `#C8A46C` | Adicionado — estado hover/focus |
| Fundo Marfim | (não existia) | `#EDE2CE` | Adicionado como papel separado — cross-canal (receita física) |

Papéis semânticos: preservados. Rascunho Hermes fez o trabalho de identificar OS PAPÉIS; Harmonia refinou os HEX por pipeta pixel-a-pixel.

## 10. Histórico

- **v1 (2026-07-06)** — este arquivo. Design system Omiron oficial. Criado sob Contrato de Missão `m-20260706-193013-omiron-brandbook-completo`. Autor: Harmonia (design-chief). Onda 1B do Contrato — paralelo a Aglaia (brand-chief). Insumos: 5 thumbnails Canva slides 18-22, decisões consolidadas de brand, PRD do app, rascunho de paleta HEX do Hermes. Handoff explícito para Aglaia consumir no capítulo 03-identidade-visual do brandbook.
