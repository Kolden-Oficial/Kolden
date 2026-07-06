---
id: nutrios-pro-assets-final-notas-tipografia
titulo: "NutriOS Pro — Notas de leitura dos assets finais (2026-06-30)"
resumo: "Análise técnica dos 3 arquivos entregues no Drive em 2026-06-30 (PDF definições finais, PNG logo e OTF Quip) mais reinterpretação da nota Google Doc sobre Geometr415."
categoria: projeto
status: oficial
atualizado-em: 2026-07-03
relacionados: [../../brandbook/03-identidade-visual, ../../design-system/02-tokens/tokens.json, ../../decisoes]
---

# Notas dos assets finais — 2026-06-30

Documento de leitura crítica dos 4 assets que o Ronan finalizou em 2026-06-30 e depositou no Google Drive (folder `1TS2e34HQ6DOSw6cv9vnph8J46K0CG3Mv`). Este arquivo é o insumo primário para o rebrand v2.

## 1. Arquivos

| Arquivo | Origem | Tamanho | Papel |
|---|---|---|---|
| `definicoes-finais-logo-cores.pdf` | Drive `15RmB...cGKsE` | 1.415.613 bytes (3 pgs) | Fonte de verdade visual v2 (paleta 8 cores + logo + explicação do "nö") |
| `logo-30-06-2026.png` | Drive `1he-G4...j0d` | 286.548 bytes | Sistema visual completo — 6 lockups + mascote |
| `quip.otf` | Drive `1L2KIk...E8f` | 86.448 bytes | Fonte do wordmark "NUTRIOS PRO" |
| Google Doc (não baixado) | Drive `1ecEDdG...KsEI` | 37 chars | Nota curta: "O DO OS PRO é o 'Geometr415 Blk BT'" |

## 2. Paleta v2 (8 cores — expandida)

**Diretamente do PDF pg 3.**

### Verdes/frios (mantidos da v1)
| Nome | Hex | Papel provável |
|---|---|---|
| **Neon Mint** | `#00E87A` | CTA/highlight (mantém) |
| **Aqua Green** | `#2BBFA0` | Mid-tone/hover (mantém) |
| **Dark Teal** | `#0F3D35` | Superfície escura secundária (mantém) |
| **Deep Forest** | `#0D2320` | Fundo dark canônico (mantém) |

### Warm/claros (novos v2)
| Nome | Hex | Papel provável |
|---|---|---|
| **Linen Cream** | `#F5F0E8` | Fundo light canônico (substitui `#FFFFFF` puro) |
| **Warm Linen** | `#E8DDD0` | Superfície light secundária |
| **Terracotta** | `#C4976A` | Accent quente (contrapõe o mint frio) |
| **Espresso** | `#2C2416` | Texto escuro/foreground (substitui `#000000` puro) |

### Removidas (v1 → v2)
- **Forest Green `#0A5C52`** — sumiu da paleta oficial. Era `--border`/`--accent-muted` no design-system v1. **Precisa novo hex para border**: candidato natural é `#0F3D35` Dark Teal com transparência (`#0F3D35CC` ou `#0F3D3599`) OU derivação HSL de Dark Teal em `+8%` luminance.
- **Preto puro `#000000`** — substituído por **Espresso `#2C2416`** (marrom-escuro muito escuro; contraste ≈ 15:1 sobre Linen Cream e ≈ 3:1 sobre Deep Forest — atenção onde antes era `#000000` sobre mint).
- **Branco puro `#FFFFFF`** — substituído por **Linen Cream `#F5F0E8`** (creme quente; contraste ≈ 15.2:1 sobre Deep Forest).

### Contrastes-chave a recalcular (WCAG 2.1 AA)
- `Espresso #2C2416` / `Neon Mint #00E87A` — precisa medir; era o par de CTA (v1 usava black). Provavelmente ≥ 10:1 (AAA).
- `Linen Cream #F5F0E8` / `Deep Forest #0D2320` — texto claro sobre dark. Provavelmente ≥ 14:1 (AAA).
- `Espresso #2C2416` / `Linen Cream #F5F0E8` — texto dark sobre light. Provavelmente ≥ 12:1 (AAA).
- `Terracotta #C4976A` / `Deep Forest #0D2320` — accent quente sobre dark. Provavelmente ≈ 4-5:1 (AA para texto grande, decorativo para texto pequeno).
- `Terracotta #C4976A` / `Linen Cream #F5F0E8` — accent sobre light. Provavelmente falha para texto (< 3:1); usar só como fill/ícone.

### Implicação estratégica
A paleta v2 é **dual-mode com identidade forte em ambos os polos**: um lado frio-verde (dark-first canônico da marca) e um lado quente-linho (light-first orgânico, humaniza a clínica). Não é mais só "dark com light derivado" — é dois sistemas coerentes. Isso muda a §3.3 do brandbook e o §5 do leia-me de tokens.

## 3. Logo v2 (PDF pg 1 + 2 + PNG)

### 3.1 Símbolo "nö" — redesenhado
- Traço **bold** (era "espessura constante" na v1, mas agora está mais grosso/pesado).
- **N** (metade esquerda) — significa o início de "NUTRI".
- **O** (metade direita) — significa o "OS" de "NUTRIOS". **Baseado na glyph "O" da fonte `Geometr415 Blk BT`** (Bitstream, comercial). Isso explica o Google Doc curto.
- **Ponto (dot verde no topo)** — enfatiza o "I" final de "NUTRI" (o pingo).
- Continua sendo *letterform+character* na versão mascote.

Nomenclatura oficial: o símbolo se chama "**nö**" (com aspas), pronunciado como "nö" (o e ö).

### 3.2 Wordmark — MUDANÇA GRANDE
- **v1 (2026-06-24)**: `nutriOS pro` — lowercase rounded (proposta Baloo 2), com "OS" em bold caixa-alta destacado.
- **v2 (2026-06-30)**: **`NUTRIOS PRO`** — **tudo em caixa-alta bold**, sans-serif geométrica pesada, peso uniforme (sem contraste do "OS"). Fonte identificada: **Quip** de Ahmad Suhadi (ver §5).
- O selo mantém "`NutriOS Pro`" em **CamelCase** (forma editorial alternativa, não caixa-alta).
- Grafia oficial:
  - **Logotipo (peça de marca)**: `NUTRIOS PRO`
  - **Corpo de texto institucional**: `NutriOS Pro` (CamelCase)
  - **Domínio e slug**: `nutriospro`
- Baloo 2 **está morto** como decisão tipográfica oficial.

### 3.3 Lockups (5 confirmados no PNG)
1. **Símbolo isolado** — só o monograma "nö" (preto ou verde neon).
2. **Mascote** — variação personificada (verde neon com braços abraçando cartão branco).
3. **Lockup horizontal** — símbolo + wordmark `NUTRIOS PRO` (preto/off-white ou verde/off-white).
4. **Selo redondo** — símbolo central com "NutriOS Pro" repetido 3× ao redor, separado por dots (preto ou verde).

### 3.4 Versões de cor (do PNG)
- Sobre off-white (Linen Cream): símbolo/wordmark em **Espresso `#2C2416`** OU em **Neon Mint `#00E87A`**.
- Não vi versão do logo sobre Deep Forest no PNG (histórico v1 tinha; v2 provavelmente segue mesma regra: mint sobre dark).

## 4. Mascote v2
Mesma silhueta acolhedora da v1 (arquétipo Cuidador — figura amiga abraçando cartão/livro), com:
- Silhueta em **Neon Mint** verde vibrante.
- Cartão branco (Linen Cream) abraçado.
- Sorriso simples desenhado sobre o símbolo.
- Ponto (dot) verde flutuando acima da cabeça (pingo do "i" — mantém a mecânica do símbolo).
- Bracinhos e perninhas pretas (Espresso).
- Sombra sutil no chão.

Continua sendo o rosto humano do produto (onboarding, estados vazios, comunicação com paciente). Não usar como assinatura institucional formal — segue o mesmo protocolo da v1.

## 5. Tipografia — Fonte `quip.otf` = Quip Regular

Extração via `fontTools`:

| Campo | Valor |
|---|---|
| **Family Name** (nameID 1/4/6) | `Quip` |
| **Style** (nameID 2) | `Regular` |
| **Full Name** | `Quip` |
| **Postscript Name** (nameID 6) | `Quip` |
| **Version** (nameID 5) | `Version 1.00; August 15, 2025; FontCreator 11.5.0.2427 32-bit` |
| **Designer** (nameID 9) | `Ahmad Suhadi` |
| **Vendor** (nameID 7) | `suhadidesign` |
| **Copyright** (nameID 0) | `suhadidesign 2025. All Rights Reserved` |
| **usWeightClass** | `400` (Regular) |
| **usWidthClass** | `5` (Medium) |
| **unitsPerEm** | `1000` |
| **CFF table** | sim (é OTF PostScript, não TrueType/glyf) |
| **Total glyphs** | 343 |
| **PT-BR coverage** | Completo (á/â/ã/é/ê/í/ó/ô/ú/ç + maiúsculas) — 27/27 chars-teste |

### 5.1 Licença
"**All Rights Reserved**" — fonte comercial/proprietária. Não é SIL OFL. O uso como **webfont via `@font-face`** em site público exige licença específica do autor (Ahmad Suhadi via `suhadidesign`). Confirmar com o Ronan se a compra cobriu **webfont license** ou apenas **desktop license**.

**Regra de segurança até confirmar:** usar Quip como `@font-face` local **apenas em documentos internos versionados no repositório privado Kolden**. Para produção pública (`nutriospro.lovable.app`), a menos que a licença webfont esteja explícita, o wordmark deve ser servido como **SVG/PNG estático do lockup completo** (não como fonte carregada). Documentar essa restrição no brandbook.

### 5.2 Papel na hierarquia tipográfica v2
- **Display / wordmark / títulos** → **Quip Regular** (fonte única, peso 400 é o único disponível).
- **UI / corpo / dados clínicos** → **Inter** (inalterado desde v1 — regular/medium/semibold, `tabular-nums` para números clínicos).
- **Elemento gráfico do símbolo "O" do "nö"** → **Geometr415 Blk BT** (Bitstream, comercial — só como base do desenho vetorial do símbolo, **nunca** como webfont).

### 5.3 Fallbacks CSS
Sequência sugerida no `font-family`:
```css
--font-display: "Quip", "Nunito", "Fredoka", system-ui, sans-serif;
--font-body: "Inter", system-ui, -apple-system, sans-serif;
```
"Nunito" e "Fredoka" são fallbacks Google Fonts com peso geométrico rounded similar (para o caso de o Quip não carregar).

## 6. Comparação v1 → v2 (tabela-âncora)

| Dimensão | v1 (2026-06-24) | v2 (2026-06-30) | Delta |
|---|---|---|---|
| Paleta | 5 verdes + preto + branco (7) | 4 verdes + 4 warm (8) | +Terracotta/Espresso/Linen Cream/Warm Linen; −Forest Green/preto puro/branco puro |
| Estratégia de cor | Dark-first com light derivado | Dual-mode (frio/dark + quente/light) | Repensada |
| Wordmark | `nutriOS pro` lowercase rounded, "OS" bold caixa-alta | `NUTRIOS PRO` tudo caixa-alta bold, peso uniforme | Redesenhado |
| Tipografia display | Baloo 2 (proposta) | Quip Regular (Ahmad Suhadi) | Substituída |
| Tipografia UI | Inter | Inter | **Inalterada** |
| Símbolo "nö" | Traço único, orgânico | Redesenhado bold; "O" baseado em Geometr415 Blk BT | Refinado |
| Mascote | Neon Mint abraçando cartão | Neon Mint abraçando cartão (mais definido) | Refinado |
| Selo | Circular com wordmark | Circular com "NutriOS Pro" CamelCase | Mantido, CamelCase |

## 7. Pendências para o rebrand
1. **Licença webfont Quip** — confirmar com Ronan (bloqueia embed em produção pública).
2. **Arquivos vetoriais SVG** do logo/mascote/lockup — só temos PDF e PNG raster (pendência residual da v1 continua).
3. **Hex de border v2** — decidir substituto para Forest Green (candidato: derivação HSL de Dark Teal ou Terracotta em opacity baixo).
4. **Recalcular contrastes** dos pares novos (Espresso/Neon Mint, Linen Cream/Deep Forest, Terracotta/*).

## 8. Referências cruzadas
- Brandbook v1 (a ser reescrito): `../../brandbook/03-identidade-visual.md`
- Tokens v1 (a serem refeitos): `../../design-system/02-tokens/tokens.json`
- Assets v1 preservados (histórico): `../logo-e-paletas-de-cores.pdf`, `../projeto-logo-nutrios-pro.pdf`, `../projeto-logo-nutrios-pro-com-cores.pdf`
- Contrato de Missão: `../../../../Olimpo/contratos/missoes/nutrios-pro-rebrand-v2-2026-07-03.yaml` (a criar)
