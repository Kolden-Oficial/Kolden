---
id: 01-fundamentos-tipografia
titulo: "Omiron — Fundamentos de Tipografia (Design System v1)"
resumo: "Três famílias tipográficas hierarquizadas por função: Great Vibes (títulos hero — script cursivo), EB Garamond (corpo e subtítulo — serif clássica humanista) e fallback stack. Escala tipográfica em terça maior (1.250) — combina com serif clássica evitando saltos bruscos. Regras cirúrgicas: nunca inclinar Great Vibes, itálico Garamond só para citação histórica, semibold Garamond só para ênfase clínica. Legibilidade para dislexia é veto (regra ativada no PRD)."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Harmonia (design-chief)
missao: m-20260706-193013-omiron-brandbook-completo
insumos:
  - docs/pesquisa-referencias/decisoes-consolidadas-brand.md
  - docs/pesquisa-referencias/canva-thumbnails/slide-18-vencedor.png (leitura visual)
  - docs/prd-omiron-app.md (NFR legibilidade dislexia)
relacionados:
  - 01-fundamentos/cores.md
  - 01-fundamentos/tom-visual.md
  - 02-tokens/tokens.json
  - 02-tokens/tokens.css
  - 03-componentes/leia-me.md
---

# Fundamentos de Tipografia — Omiron

> A tipografia é o VÍNCULO entre o mundo maximalista clássico (Great Vibes elegante manuscrito) e o texto que precisa ser LIDO por adultos que estão em tratamento psiquiátrico (EB Garamond serif clássica de alta legibilidade). O sistema decorre dessa tensão: script para elevar, serif para amparar.

## 1. Filosofia

Três compromissos regem a tipografia Omiron:

1. **Serifa clássica é irrenunciável.** Sans-serif geométrica moderna descaracteriza o mundo. Ariosto foi explícito na reunião 01/07: "quero catedral europeia, não pronto-socorro". Serifa é a assinatura do erudito. Sans-serif entra apenas como fallback de sistema para garantir renderização.
2. **Legibilidade para dislexia é veto.** Já vetou Alex Brush (script ilegível). Regra ativa: qualquer fonte candidata precisa passar teste com paciente-piloto disléxico antes de entrar. Great Vibes é aprovada como TÍTULO curto (nome, saudação, marco narrativo) — nunca como corpo.
3. **Escala em terça maior (1.250).** Escalas mais duras (1.333 quarta perfeita, 1.500 quinta perfeita) geram saltos bruscos entre h1/h2/h3 que competem com o corpo serifa. A terça maior mantém progressão coerente com o mundo clássico e cria hierarquia sem violência.

## 2. Famílias tipográficas (3 papéis)

### 2.1 Great Vibes — Título hero (script cursivo)

**Papel**: título hero, nome do médico na capa, saudação do mentor Quíron ao paciente, marco narrativo (ex.: "Bem-vindo", "Sua semana", nome do pilar quando aberto em tela inteira).

**Origem**: Google Fonts (SIL Open Font License) — uso comercial livre, `@font-face` local OK.

**Pesos permitidos**: `regular` (400) — Great Vibes só existe em regular. Nunca simular bold via `font-weight: 700` em CSS (renderiza engrossamento algorítmico feio).

**Tamanhos permitidos**: mínimo `2rem` (32px) — abaixo disso perde legibilidade. Uso canônico: `3rem` (48px) a `5rem` (80px) em hero. Sem cap superior — para deck e hero de landing, 8rem é razoável.

**Regras cirúrgicas**:
- **Nunca inclinar** (`font-style: italic` ou `transform: skew`). Great Vibes já é cursiva por design; inclinar quebra a caligrafia.
- **Nunca comprimir** (`letter-spacing` negativo agressivo). O espaçamento natural dos glifos é parte da elegância.
- **Nunca uppercase** (`text-transform: uppercase`). Os traços cursivos maiúsculos-e-minúsculos foram desenhados juntos; uppercase-tudo destroi o ritmo.
- **Nunca em bloco de corpo**. Great Vibes é assinatura — 1 a 3 linhas máximo, sempre no ponto emocional alto.

**Do**:
- Nome do paciente na saudação de abertura do dia.
- Título de conquista quando a planta virtual muda de estágio.
- Nome do médico responsável em cabeçalho de receita.
- Frase-âncora emocional em capa de deck ("Você entra numa catedral europeia").

**Don't**:
- Botão. CTA em Great Vibes é ilegível — botão sempre EB Garamond regular ou medium.
- Formulário. Placeholder, label, input — sempre EB Garamond.
- Tabela. Nunca — legibilidade tabular exige serif regular.
- Corpo de mensagem clínica. Nunca — mesmo mensagem do Quíron usa EB Garamond regular; Great Vibes é o vínculo da saudação, não do teor.

### 2.2 EB Garamond — Corpo, subtítulo, UI (serif clássica)

**Papel**: corpo de texto, subtítulo, legenda, label de formulário, texto de botão, texto de tabela, dados clínicos, mensagens do mentor Quíron, todo lugar onde LEITURA acontece.

**Origem**: Google Fonts (SIL Open Font License) — uso comercial livre, `@font-face` local OK. EB Garamond é a revitalização digital open-source de Claude Garamont (século XVI). Escolhida sobre "Adobe Garamond" (mencionada nas decisões consolidadas do Hermes) porque tem licença livre para produção e webfont — sem risco de compliance de licença como Quip Regular teve no NutriOS.

**Pesos permitidos**:
- `regular` (400) — corpo padrão, label de formulário, texto de botão.
- `medium` (500) — botão em estado hover/active, ênfase leve, título de card.
- `semibold` (600) — **APENAS para ênfase clínica** (dado numérico crítico, alerta de dosagem, nome do medicamento em receita). Nunca para título estético — título estético é Great Vibes ou Garamond regular em tamanho maior.
- `italic` (400 italic) — **APENAS para citação histórica** (epígrafe de Marco Aurélio, Sêneca, Epicteto). Nunca para ênfase suave — ênfase suave é medium.

**Escala tipográfica (terça maior — razão 1.250)**:

Base: `1rem` = 16px. Cada degrau multiplica por 1.250.

| Papel | rem | px | line-height | letter-spacing | Uso |
|---|---|---|---|---|---|
| **display** | `3.815rem` | ~61px | 1.05 | `-0.02em` | Hero de landing/deck (Great Vibes) |
| **h1** | `3.052rem` | ~49px | 1.1 | `-0.02em` | Título de página (Great Vibes ou Garamond regular grande) |
| **h2** | `2.441rem` | ~39px | 1.15 | `-0.01em` | Seção principal (Garamond regular) |
| **h3** | `1.953rem` | ~31px | 1.2 | `-0.005em` | Subseção (Garamond regular) |
| **h4** | `1.563rem` | 25px | 1.25 | `0` | Título de card (Garamond medium) |
| **h5** | `1.25rem` | 20px | 1.3 | `0` | Sub-card, tag maior (Garamond medium) |
| **body-lg** | `1.125rem` | 18px | 1.65 | `0` | Introdução, mensagem do Quíron, texto de destaque |
| **body** | `1rem` | 16px | 1.65 | `0` | Corpo padrão |
| **body-sm** | `0.875rem` | 14px | 1.55 | `0.005em` | Legenda, metadata, hint |
| **caption** | `0.75rem` | 12px | 1.5 | `0.01em` | Micro-metadata (timestamp, versão) |

**Line-height**: mais generoso que sistemas modernos (1.65 para corpo vs. 1.5 típico). Serifa clássica exige mais respiro entre linhas para não visualmente empastar.

**Regras cirúrgicas**:
- **Corpo padrão**: `body` (16px) mínimo. Nunca abaixo — legibilidade em dislexia trava.
- **Numérico clínico**: ativar `font-variant-numeric: tabular-nums` em coluna de tabela e input numérico. Sem isso, `1234` e `5678` alinham diferente e leitor confunde.
- **Contraste sempre AA no mínimo** (validado em `cores.md §5.2`). Sem exceção.

### 2.3 Fallback stack (renderização de sistema)

Quando Great Vibes ou EB Garamond não carregarem (offline, bloqueio de CDN, falha de licença), o sistema degrada com elegância — nunca cai em Times New Roman genérico do OS.

```css
--omiron-fonte-titulo: 'Great Vibes', 'Snell Roundhand', 'Apple Chancery', 'Zapfino', cursive;
--omiron-fonte-corpo: 'EB Garamond', 'Garamond', 'Cormorant Garamond', 'Georgia', 'Palatino Linotype', serif;
```

Ordem: fonte canônica → alternativa Apple/Adobe → alternativa Google Fonts open → fallback de sistema mais próximo → genérico.

**Sans-serif como último recurso absoluto** (só se todos serifs falharem):
```css
--omiron-fonte-fallback-critico: 'EB Garamond', 'Georgia', 'Cambria', system-ui, sans-serif;
```

Nunca declarar sans-serif como padrão do sistema. Sans-serif quebra a assinatura da marca.

## 3. @font-face declarations

Todas as três famílias declaradas via `@font-face` no bloco `tokens.css`:

```css
@font-face {
  font-family: 'Great Vibes';
  src: url('/fonts/great-vibes/GreatVibes-Regular.woff2') format('woff2'),
       url('/fonts/great-vibes/GreatVibes-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'EB Garamond';
  src: url('/fonts/eb-garamond/EBGaramond-Regular.woff2') format('woff2'),
       url('/fonts/eb-garamond/EBGaramond-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'EB Garamond';
  src: url('/fonts/eb-garamond/EBGaramond-Medium.woff2') format('woff2'),
       url('/fonts/eb-garamond/EBGaramond-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'EB Garamond';
  src: url('/fonts/eb-garamond/EBGaramond-SemiBold.woff2') format('woff2'),
       url('/fonts/eb-garamond/EBGaramond-SemiBold.woff') format('woff');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'EB Garamond';
  src: url('/fonts/eb-garamond/EBGaramond-Italic.woff2') format('woff2'),
       url('/fonts/eb-garamond/EBGaramond-Italic.woff') format('woff');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
```

**Nota operacional**: os arquivos `.woff2`/`.woff` precisam ser baixados do Google Fonts em rodada futura pela equipe de assets (não Harmonia — Aglaia ou Hefesto). A declaração está travada.

## 4. Legibilidade para dislexia

Adulto em tratamento psiquiátrico frequentemente tem comorbidade cognitiva. O produto NÃO pode falhar aqui.

**Regras ativas**:

1. **Corpo mínimo 16px** (`body`). Abaixo disso, dislexia trava.
2. **Line-height mínimo 1.6** para corpo. Serifa clássica exige mais respiro.
3. **Letter-spacing zero em corpo**. Compressão prejudica leitura disléxica.
4. **Sem justificação** (`text-align: justify`). O espaçamento variável entre palavras confunde. Sempre `text-align: left`.
5. **Sem uppercase-tudo em bloco**. Uppercase quebra reconhecimento de forma da palavra.
6. **Sem italic em corpo longo**. Italic reservado para citação histórica curta.
7. **Contraste AAA no corpo** — Marfim sobre Fundo Profundo é 15.02:1 (`cores.md §5.2`). Passa com folga.

Teste de aceite: paciente-piloto disléxico consegue ler 3 parágrafos do onboarding em < 90s sem re-leitura. Se falhar, corpo ganha `1.125rem` (18px) — nunca menos.

## 5. Do / Don't consolidado

### Do

- Great Vibes hero em contexto emocional alto (saudação, marco, conquista).
- EB Garamond regular como cavalo de batalha de corpo, botão, tabela, formulário.
- EB Garamond medium para título de card e botão hover.
- EB Garamond semibold APENAS em dado clínico crítico (dosagem, nome de medicamento).
- EB Garamond italic APENAS em citação histórica.
- `tabular-nums` em coluna numérica.
- Corpo 16px mínimo.
- Line-height 1.65 em corpo.

### Don't

- Great Vibes em botão, formulário, tabela, corpo de mensagem. Nunca.
- Sans-serif geométrica moderna como padrão. Só como fallback crítico.
- Uppercase em título ou botão. Nunca — quebra a assinatura clássica.
- Italic em corpo longo. Só citação.
- Justificação (`text-align: justify`). Nunca — dislexia.
- Compressão (`letter-spacing` negativo em corpo). Nunca.
- Simular bold em Great Vibes via CSS. Nunca — vira algorítmica feia.
- Times New Roman genérico como fallback default. Nunca cai nele — Cormorant Garamond / Georgia primeiro.

## 6. Ganchos de rastreabilidade

- Origem das decisões: reunião 01/07/2026 com Dr. Ariosto + análise dos slides 18-22 do deck Canva.
- Great Vibes + Garamond confirmados como assinatura visual nos 5 slides (todos usam par idêntico).
- Escala 1.250 (terça maior) é decisão Harmonia com base em par serifa clássica; alternativa 1.333 (quarta perfeita) foi considerada e rejeitada por gerar salto brusco entre h4 e body-lg em contexto de leitura densa.
- EB Garamond escolhida sobre Adobe Garamond para evitar risco de licença webfont (aprendizado do NutriOS Pro com Quip Regular).
- Materializado em `02-tokens/tokens.json`, `02-tokens/tokens.css` e `02-tokens/tailwind.tokens.js`.

## 7. Auditoria

```bash
# Sans-serif como fonte primária — deve ser 0 em produção
grep -rE "font-family:\s*(Inter|Roboto|Helvetica|Arial|system-ui)" \
  design-system/ brandbook/ --include="*.css" \
  | grep -v "fallback\|--omiron-fonte-fallback-critico"
# -> deve retornar 0

# Great Vibes em contexto proibido
grep -rE "(button|input|table|form).*(Great Vibes|font-titulo)" \
  design-system/ brandbook/
# -> deve retornar 0

# Uppercase em título
grep -rE "text-transform:\s*uppercase" design-system/ brandbook/
# -> deve retornar 0 (ou apenas caption com justificativa)

# Justificação
grep -rE "text-align:\s*justify" design-system/ brandbook/
# -> deve retornar 0
```
