---
id: 02-tokens-leia-me
titulo: "NutriOS Pro — Design Tokens v3 (leia-me)"
resumo: "Camadas de tokens (primitivo → semântico → componente), mapa marca→token, matriz WCAG 8×8, regras de auditoria e roteiro de aplicação da identidade v2 do NutriOS Pro (paleta 8 cores dual-mode + 3 famílias tipográficas). Ancorada 100% no dossiê V2 aprovado pelo sócio em 2026-06-30."
categoria: projeto
status: oficial
atualizado-em: 2026-07-05
relacionados: [01-auditoria-ui-atual, 03-componentes, 04-motion-e-icones, tokens.css, tailwind.tokens.js, tokens.json, ../../brandbook/03-identidade-visual, ../../assets/2026-06-30-final/_notas-tipografia]
---

# Tokens — v3 (2026-07-05)

## 1. Fonte de verdade (V2 aprovado 2026-06-30)

Esta iteração do design-system (v3) reflete a **identidade v2** aprovada pelo sócio em 2026-06-30 e materializada nos assets finais em `sobre-a-empresa/Projetos/NutriOS Pro/V2/`. Nada aqui é inventado — cada valor tem origem rastreável:

| Decisão | Origem no V2 |
|---|---|
| Paleta 8 cores | PDF do V2, página 3 (Neon Mint, Aqua Green, Dark Teal, Deep Forest, Linen Cream, Warm Linen, Terracotta, Espresso) |
| Preto/branco puros **deprecados** | PDF do V2, página 3 (não constam da paleta) |
| Forest Green da v1 **removido** | Ausente do PDF do V2 |
| Wordmark em Geometr415 Blk BT | DOCX do V2 literal: "O DO OS PRO é o Geometr415 Blk BT" |
| Quip Regular como display/hero | Arquivo `quip.otf` incluído no V2 + confirmação em decisões |
| Inter para UI/body/tabelas | Herdada da v1, revalidada no V2 |
| Símbolo n + O + ponto (rejeita "nö") | PDF do V2, página 2 |

**Sobre esta v3 vs a v2 lavrada em 2026-07-03:** a v2 anterior interpretou o símbolo como "nö" (rejeitado no dossiê V2). Esta v3 corrige a leitura, mantém a paleta correta e adiciona as decisões técnicas travadas via AskUserQuestion pelo Ronan (spacing 8px, radius soft, shadow 3 níveis, Terracotta como accent-warm restrito).

## 2. Camadas (primitivo → semântico → componente)

O tokens.json segue a arquitetura de 3 camadas do Brad Frost (Atomic Design + Design Tokens):

```
color.primitive.*        <-- 8 hex literais imutáveis (fatos da marca)
        │
        ▼
color.semantic.light.*   <-- aliases contextuais (background, primary, accent...)
color.semantic.dark.*        (dois temas canônicos, coerentes)
        │
        ▼
componente               <-- consome semântico via CSS var (nunca hex cru)
                             Ex.: bg-primary, text-foreground, ring-ring
```

- **Primitivo** muda quando a marca muda (evento raro).
- **Semântico** muda quando o tema muda (light/dark) ou quando o mapeamento marca→uso muda.
- **Componente** nunca hardcoda hex — só consome semântico.

Mesmo princípio aplica-se a spacing (base 8px), radius (escala soft) e motion (durations + easings).

## 3. Mapa marca → token semântico

### 3.1 LIGHT (linho-quente canônico)

| Cor primitiva | Hex | HSL | Token semântico |
|---|---|---|---|
| Linen Cream | `#F5F0E8` | `34 45% 93%` | `--background`, `--sidebar-background` |
| Warm Linen | `#E8DDD0` | `30 41% 86%` | `--card`, `--popover`, `--muted` |
| Neon Mint | `#00E87A` | `152 100% 45%` | `--primary` (CTA fill), `--ring` |
| Aqua Green | `#2BBFA0` | `167 63% 46%` | `--accent` |
| Terracotta | `#C4976A` | `28 43% 59%` | `--accent-warm` **(USO RESTRITO — §6)** |
| Espresso | `#2C2416` | `33 33% 13%` | `--foreground`, `--card-foreground`, `--primary-foreground`, `--accent-foreground`, `--border`/`--input` (@ 12% alpha) |
| Vermelho (fora da paleta oficial) | `#B33A2A` | `8 62% 43%` | `--destructive` |

### 3.2 DARK (verde-frio canônico)

| Cor primitiva | Hex | HSL | Token semântico |
|---|---|---|---|
| Deep Forest | `#0D2320` | `172 46% 9%` | `--background`, `--sidebar-background` |
| Dark Teal | `#0F3D35` | `170 61% 15%` | `--card`, `--popover` |
| Dark Teal +8% lightness | — | `170 53% 23%` | `--border`, `--input` (substitui Forest Green removido) |
| Neon Mint | `#00E87A` | `152 100% 45%` | `--primary` (CTA fill), `--ring` |
| Aqua Green | `#2BBFA0` | `167 63% 46%` | `--accent` |
| Terracotta | `#C4976A` | `28 43% 59%` | `--accent-warm` **(USO RESTRITO — §6)** |
| Espresso | `#2C2416` | `33 33% 13%` | `--primary-foreground`, `--accent-foreground`, `--accent-warm-foreground` |
| Linen Cream | `#F5F0E8` | `34 45% 93%` | `--foreground`, `--card-foreground` |
| Vermelho | `#E8513F` | `6 79% 58%` | `--destructive` |

## 4. Roteiro de aplicação no `app/` (fase futura)

O `app/` (React + shadcn/ui + Tailwind) ainda não foi migrado para v3. Quando for, o roteiro é:

1. **Copiar** `assets/2026-06-30-final/quip.otf` para `app/public/fonts/quip.otf`.
2. **Substituir** o bloco `:root` e `.dark` em `app/src/index.css` pelos blocos deste `tokens.css`.
3. **Importar o preset** em `app/tailwind.config.ts`:
   ```ts
   import nutriosPreset from "../design-system/02-tokens/tailwind.tokens.js";
   export default {
     presets: [nutriosPreset],
     darkMode: ["class"],
     content: [...],
   };
   ```
4. **Remover** referências ativas a Baloo 2, Poppins, Forest Green `#0A5C52`, preto puro `#000000`, branco puro `#FFFFFF`.
5. **Garantir** que o wordmark "NUTRIOS PRO" é servido como SVG/PNG estático (Geometr415 Blk BT como asset gráfico — NÃO webfont). Ver §8.
6. **Confirmar** licença webfont da Quip com Ahmad Suhadi (suhadidesign) antes de expor em produção pública. Enquanto não confirmada, servir hero/display Quip apenas em docs internos.
7. **Ativar `tabular-nums`** em toda coluna numérica clínica (kcal, g, %, medidas).

Detalhes de código refatorado (WaterTracker, toast, Auth, PatientProfile) já mapeados em `03-componentes.md`.

## 5. Matriz WCAG 2.1 dos pares (8×8)

Contrastes calculados via luminância relativa sRGB linearizada. AAA ≥ 7:1 (texto normal) / ≥ 4.5:1 (texto grande ≥ 18.66px bold ou ≥ 24px regular). AA ≥ 4.5:1 (normal) / ≥ 3:1 (grande).

Legenda: **AAA** = aprovado normal e grande; **AA** = aprovado normal; **AA/lg** = só texto grande; **FALHA** = não usar como texto.

### 5.1 Todos os pares (8×8, texto sobre fundo)

|                    | Neon Mint | Aqua Green | Dark Teal | Deep Forest | Linen Cream | Warm Linen | Terracotta | Espresso |
|--------------------|-----------|------------|-----------|-------------|-------------|------------|------------|----------|
| **Neon Mint**      | —         | 1.15 FALHA | 6.28 AA   | 11.16 AAA   | 1.33 FALHA  | 1.24 FALHA | 1.79 FALHA | 10.30 AAA|
| **Aqua Green**     | 1.15 FALHA| —          | 4.13 AA/lg| 7.34 AAA    | 2.05 FALHA  | 1.91 FALHA | 1.15 FALHA | 6.71 AAA |
| **Dark Teal**      | 6.28 AA   | 4.13 AA/lg | —         | 1.78 FALHA  | 10.42 AAA   | 9.75 AAA   | 5.44 AA    | 1.63 FALHA|
| **Deep Forest**    | 11.16 AAA | 7.34 AAA   | 1.78 FALHA| —           | 14.88 AAA   | 13.92 AAA  | 5.91 AA    | 1.53 FALHA|
| **Linen Cream**    | 1.33 FALHA| 2.05 FALHA | 10.42 AAA | 14.88 AAA   | —           | 1.07 FALHA | 2.52 FALHA | 13.73 AAA|
| **Warm Linen**     | 1.24 FALHA| 1.91 FALHA | 9.75 AAA  | 13.92 AAA   | 1.07 FALHA  | —          | 2.35 FALHA | 11.75 AAA|
| **Terracotta**     | 1.79 FALHA| 1.15 FALHA | 5.44 AA   | 5.91 AA     | 2.52 FALHA  | 2.35 FALHA | —          | 3.71 AA/lg|
| **Espresso**       | 10.30 AAA | 6.71 AAA   | 1.63 FALHA| 1.53 FALHA  | 13.73 AAA   | 11.75 AAA  | 3.71 AA/lg | —        |

### 5.2 Pares críticos (assinatura de uso)

| Uso semântico | Par (texto / fundo) | Contraste | Verdicto |
|---|---|---|---|
| **CTA primário (dark+light)** | Espresso / Neon Mint | **10.30:1** | **AAA** — par CTA canônico |
| Corpo dark | Linen Cream / Deep Forest | **14.88:1** | AAA — leitura padrão dark |
| Corpo light | Espresso / Linen Cream | **13.73:1** | AAA — leitura padrão light |
| Card dark | Linen Cream / Dark Teal | **10.42:1** | AAA |
| Card light | Espresso / Warm Linen | **11.75:1** | AAA |
| Accent verde (dark) | Espresso / Aqua Green | **6.71:1** | AAA |
| Accent-warm (dark) | Terracotta como fill sobre Deep Forest | **5.91:1** | AA — apenas texto grande |
| Accent-warm (light) | Terracotta como fill sobre Linen Cream | **2.52:1** | FALHA para texto — usar apenas como fill decorativo com texto Espresso sobre ele |
| Destructive light | Linen Cream / #B33A2A | **~5.9:1** | AA |
| Destructive dark | Linen Cream / #E8513F | **~5.4:1** | AA |

### 5.3 Regras práticas

- **Corpo e dados clínicos**: sempre Linen Cream sobre Deep Forest (dark) **ou** Espresso sobre Linen Cream (light). Nada mais.
- **Neon Mint**: nunca texto longo. É CTA-fill, número-chave, ícone.
- **Aqua Green**: texto/link apenas sobre superfícies escuras (Deep Forest 7.34 AAA / Dark Teal 4.13 AA/lg). Sobre linho, usar como fill.
- **Terracotta**: **NUNCA como fundo de CTA**. Só badge, tag, hover decorativo, ilustração — sempre com Espresso ou texto sobre superfície escura.
- **Foco/erro**: nunca só cor. Sempre acompanhar de ícone/texto.

## 6. Uso da Terracotta (accent-warm)

Terracotta é o único primitivo com uso semanticamente restrito, por decisão do V2 e reforço nesta v3:

**PODE** ser usada em:
- Badge de categoria (ex.: "Comportamento", "Estilo de vida", "Onboarding").
- Tag de conteúdo humanizado (mascote-adjacente, mensagem de acolhimento).
- Hover decorativo sutil em cards de seções "warm".
- Fill de ícone ilustrativo em superfície escura.
- Linha `chart.4` do Recharts (contraste warm vs. verdes).

**NUNCA** deve ser usada em:
- Fundo de CTA primário. O CTA é sempre Neon Mint com foreground Espresso.
- Texto pequeno sobre Linen Cream (2.52:1 falha).
- Texto pequeno sobre Warm Linen (2.35:1 falha).
- Preenchimento de superfícies extensas (perde acolhimento e vira ruído).

Auditoria automatizada: `grep -iE "terracotta.*bot[aã]o.*(primary|cta)"` no repositório deve retornar 0 ocorrências em texto ativo.

## 7. Motion e microinterações

Ver detalhes em `04-motion-e-icones.md`. Resumo:

| Token | Valor | Uso |
|---|---|---|
| `--duration-fast` | 150ms | hover, focus, tap |
| `--duration-base` | 250ms | tab switch, dropdown, tooltip fade |
| `--duration-slow` | 400ms | modal open, hero reveal, page transition |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | UI genérico |
| `--ease-emphasized` | `cubic-bezier(0.3, 0, 0, 1)` | reveals, aberturas |

Regra transversal: `@media (prefers-reduced-motion: reduce)` neutraliza animações (já configurado no `tokens.css`).

## 8. Ícones (Lucide)

Padrão de fato do shadcn/ui e do ecossistema React. Cobertura ampla para saúde/clínica (activity, heart-pulse, clipboard-list, syringe, pill, salad, dumbbell, calendar-clock, list-check, message-circle).

- Tamanhos: `sm` 16px / `md` 20px (padrão) / `lg` 24px / `xl` 32px.
- Stroke-width: **1.75** (bate com a "leveza" da paleta warm).
- Cor: `currentColor` — herda de `text-*` para respeitar o token semântico.

Ver `04-motion-e-icones.md §4` para lista de ícones críticos e do/don't.

## 9. Regras de auditoria

### 9.1 Grep de regressão (rodar antes de merge)

```bash
# Hex hardcoded fora dos 8 canônicos + destructives + hex de sombra:
grep -rE "#[0-9A-Fa-f]{6}" app/src --exclude-dir=node_modules \
  | grep -vE "(00E87A|2BBFA0|0F3D35|0D2320|F5F0E8|E8DDD0|C4976A|2C2416|B33A2A|E8513F|194E44|153330|8FA8A0)"
# -> deve retornar 0 (ou apenas comentários justificando)

# Baloo 2, Poppins, Forest Green:
grep -rE "(Baloo 2|Poppins|#0A5C52)" app/src
# -> deve retornar 0

# Preto/branco puros como fundo/texto:
grep -rE "(bg-white|bg-black|text-black|text-white)" app/src
# -> deve retornar 0 (ou apenas comentários)

# Terracotta como CTA:
grep -rE "terracotta.*(primary|cta|button-primary)" .
# -> deve retornar 0
```

### 9.2 Regra CSS (fail-fast em CI)

Configurar Stylelint com `declaration-property-value-disallowed-list` para banir hex crus em componentes:

```json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "/^(color|background|border-color)/": ["/#[0-9A-Fa-f]{3,6}/"]
    }
  }
}
```

Único bypass permitido: sombras (base Espresso @ alpha), documentadas com comentário justificando o hex.

## 10. Histórico

- **v3 do design-system (2026-07-05)** — este arquivo. Refação completa ancorada 100% no V2 aprovado (2026-06-30). Adiciona Geometr415 Blk BT como wordmark asset, spacing 8px explícito, radius soft, shadow 3 níveis, motion tokens, Terracotta restrita a accent-warm. Ver Contrato `Olimpo/contratos/missoes/m-20260705-nutrios-pro-brandbook-v3-refacao.yaml`.
- **v2 (2026-07-03)** — Contrato `m-20260703`. Introduziu paleta 8 cores + Quip Regular, mas interpretou símbolo como "nö" (rejeitado no V2). Preservada em git history.
- **v1 (2026-06-24)** — Baloo 2 + 7 cores dark-first. Preservada em git history.
