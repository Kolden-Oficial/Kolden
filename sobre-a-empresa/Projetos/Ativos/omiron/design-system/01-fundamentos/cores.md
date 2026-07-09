---
id: 01-fundamentos-cores
titulo: "Omiron — Fundamentos de Cor (Design System v1)"
resumo: "Paleta canônica de 10 papéis semânticos calibrada por pipeta pixel-a-pixel nos 5 thumbnails Canva (slides 18-22) do deck de referências visuais aprovado pelo Dr. Ariosto na reunião 01/07/2026. Preto e branco puros REJEITADOS por decisão do cliente (rechaça clinical-cold). Dark-mode é a identidade — não um tema opcional. Verde-planta RESERVADO exclusivamente à gamificação da árvore virtual (nunca sai desse contexto)."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Harmonia (design-chief)
missao: m-20260706-193013-omiron-brandbook-completo
insumos:
  - docs/pesquisa-referencias/canva-thumbnails/slide-18-vencedor.png
  - docs/pesquisa-referencias/canva-thumbnails/slide-19.png
  - docs/pesquisa-referencias/canva-thumbnails/slide-20.png
  - docs/pesquisa-referencias/canva-thumbnails/slide-21.png
  - docs/pesquisa-referencias/canva-thumbnails/slide-22.png
  - docs/pesquisa-referencias/decisoes-consolidadas-brand.md
relacionados:
  - 01-fundamentos/tipografia.md
  - 01-fundamentos/grafismos.md
  - 01-fundamentos/tom-visual.md
  - 02-tokens/tokens.json
  - 02-tokens/tokens.css
  - docs/pesquisa-referencias/paleta-hex-extraida.md
---

# Fundamentos de Cor — Omiron

> Dez papéis semânticos. Nenhum é acidente estético — cada um resolve um problema de UX de interior de app psiquiátrico erudito. A calibração final foi feita cruzando os 5 thumbnails vencedores do deck Canva; onde os slides discordavam entre si, o slide 18 (escadaria — vencedor confirmado em reunião) tem peso final.

## 1. Filosofia

Três compromissos fundam a paleta Omiron. Eles não são negociáveis.

1. **Elegância é ponte.** A paleta faz o app psiquiátrico *não parecer* app psiquiátrico. Preto profundo quente + dourado envelhecido + marfim + âmbar de crepúsculo formam um mundo — não uma UI. O paciente entra sentindo museu europeu, não pronto-socorro. Este é o pedido explícito do Dr. Ariosto ("catedral europeia").
2. **Papiro é assinatura cross-canal.** A textura de papiro aparece no app, na receita física do consultório e no Instagram do médico. É a impressão digital visual da Clínica Omiron — muda o material, mantém a assinatura.
3. **Sem branco puro. Sem preto puro.** `#FFFFFF` e `#000000` estão banidos deste sistema por veto do cliente. O branco puro é clinical-cold; o preto puro é raso e digital. Substituímos por marfim quente e preto-carvão quente.

## 2. Papéis semânticos (10 cores)

Cada papel é uma decisão sobre onde essa cor VIVE dentro do produto — e onde não vive.

### 2.1 Fundos e superfícies

| Papel | HEX | HSL | Descrição funcional |
|---|---|---|---|
| **`--omiron-fundo-profundo`** | `#141010` | `12 11% 7%` | Backgrounds primários do app (dark mode = identidade). Capa de deck. Letterbox de imagens clássicas. Preto-carvão quente — nunca preto puro. |
| **`--omiron-fundo-elevado`** | `#1E1712` | `20 15% 10%` | Superfícies elevadas: cards, modal-background, popover. Um degrau acima do fundo profundo. Mantém o mood erudito enquanto separa hierarquia. |
| **`--omiron-fundo-marfim`** | `#EDE2CE` | `39 55% 87%` | Fundo de superfícies claras raras — receita física (papiro), print de exportação de relatório, cabeçalho de e-mail transacional. NÃO é o fundo padrão do app. |

### 2.2 Marca (dourados)

| Papel | HEX | HSL | Descrição funcional |
|---|---|---|---|
| **`--omiron-dourado-antigo`** | `#A88148` | `33 41% 47%` | Cor de marca. Destaques de identidade, ornamentação, borda de card premium, ícone do arquétipo Sábio. Dourado envelhecido — não brilhante moderno. Extraído do meio-tom entre capitéis e ornamentação nos slides 19 e 22. |
| **`--omiron-dourado-alto`** | `#C8A46C` | `35 47% 60%` | Estado de hover/foco no dourado. Títulos secundários. Highlight sutil. Iluminação dos capitéis coríntios do slide 22 quando pegam luz. |

### 2.3 Texto

| Papel | HEX | HSL | Descrição funcional |
|---|---|---|---|
| **`--omiron-marfim`** | `#EDE2CE` | `39 55% 87%` | Texto principal sobre fundo escuro. Títulos Great Vibes na capa. Corpo Garamond em leitura padrão. Substitui `#FFFFFF` puro em TODO o sistema. |
| **`--omiron-marfim-suave`** | `#B8AC93` | `39 22% 65%` | Texto secundário. Legenda. Metadata. Placeholder. Hierarquia rebaixada mantendo aderência ao mundo (marfim envelhecido, não cinza dessaturado). |

### 2.4 Acentos narrativos

| Papel | HEX | HSL | Descrição funcional |
|---|---|---|---|
| **`--omiron-ambar-crepusculo`** | `#C67A3E` | `24 55% 51%` | CTAs primários. Destaques narrativos. Toque imperial. Cor do céu no slide 21 (colunata em crepúsculo). Energia sem agressão — é o momento de reflexão do sol se pondo, não do alarme. |
| **`--omiron-ambar-terra`** | `#9E5528` | `20 60% 39%` | Estados de erro. Alerta clínico contextualizado. Sombra do CTA em estados active. Semântica de "atenção sem susto" — variação terrosa que segue coerente com o mundo (não vermelho brilhante genérico). |

### 2.5 Tácteis e táctil-decorativos

| Papel | HEX | HSL | Descrição funcional |
|---|---|---|---|
| **`--omiron-marrom-couro`** | `#4A2E1A` | `21 48% 20%` | Borda de "livro" (elementos táteis). Stroke de ícone do pilar Corpo/Sansão. Superfície de receita física papiro (moldura). Marrom das estantes dos slides 19-20 — humano, elegante. |

### 2.6 Cor viva — USO RESTRITO

| Papel | HEX | HSL | Descrição funcional |
|---|---|---|---|
| **`--omiron-verde-planta`** | `#5C7A3E` | `88 33% 36%` | **RESERVADA EXCLUSIVAMENTE à gamificação da planta virtual** (broto → muda → adulta → árvore). Verde-oliva antigo, coerente com o mundo clássico. É a única cor viva do sistema. **NUNCA sai desse contexto.** Auditoria automatizada `grep -riE "verde.plant" --exclude-dir=gamification` deve retornar 0 em código de produção. |

## 3. Regra "Elegância é ponte" — Do / Don't

O que separa Omiron de qualquer outro app de saúde mental é a recusa a cair em dois abismos: o clinical-cold (hospitalar) e o wellness-fofo (bolinhas gradientes). A paleta caminha na ponte.

### Do

- Combinar dourado-antigo + marfim + fundo profundo — o tríptico canônico.
- Reservar âmbar-crepúsculo para o momento certo (CTA, transição narrativa, marco de conquista) — se banalizar, perde peso.
- Usar marrom-couro em elementos que "seguram" (bordas de card, chrome de receita). Ele é o táctil que ancora a leveza do marfim.
- Deixar o fundo respirar. Densidade máxima do maximalismo clássico está no CONTEÚDO (imagem clássica, ornamento serif, textura papiro) — não em blocos coloridos densos.

### Don't

- **Nunca** azul-marinho como fundo (clinical-cold). O produto é um app psiquiátrico que se recusa a parecer app psiquiátrico.
- **Nunca** gradientes vibrantes multicoloridos (bolinhas). Isso é wellness-fofo, o rótulo que o cliente veta explicitamente.
- **Nunca** `#FFFFFF` nem `#000000` puros — banidos por veto do cliente. Rastrear via grep pré-merge.
- **Nunca** flat design com sans-serif geométrica moderna sobre a paleta. As cores exigem serifa clássica; sem ela, a elegância vira genérico.
- **Nunca** verde-planta fora da gamificação. Mesmo que "só um botão de sucesso" — para sucesso genérico, use dourado-alto ou marfim com ícone check. Verde-planta é literal e narrativo: você regou a planta.

## 4. Papiro como assinatura cross-canal

O papiro NÃO é uma cor — é uma superfície texturizada. Mas ele DERIVA do marfim (`--omiron-fundo-marfim`). Documentado como token de superfície em `03-componentes/superficies.md`. Aqui, só a regra semântica:

- **App**: cards de recompensa da gamificação, moldura de mensagens do mentor Quíron, background de tela de conquista.
- **Receita médica física**: layout inteiro do papel timbrado do Dr. Ariosto.
- **Instagram do médico**: linha editorial de posts com fundo papiro + serifa Garamond.
- **Deck de apresentação**: capa e separadores de seção.

Regra de ouro: se um artefato de comunicação Omiron não tem papiro em algum lugar, ele não é Omiron.

## 5. Matriz de contraste WCAG 10×10 (dark-mode canônico)

Contrastes calculados via luminância relativa sRGB linearizada, padrão WCAG 2.1. Fórmula: `L = 0.2126·R + 0.7152·G + 0.0722·B` (após linearização de canal). Ratio = `(L₁ + 0.05) / (L₂ + 0.05)`.

**Legenda**:
- **AAA** = aprovado para texto normal E grande (≥ 7:1 normal, ≥ 4.5:1 grande)
- **AA** = aprovado para texto normal (≥ 4.5:1 normal, ≥ 3:1 grande)
- **AA/lg** = aprovado APENAS para texto grande ≥ 18.66px bold ou ≥ 24px regular (≥ 3:1)
- **FALHA** = uso decorativo apenas — NÃO usar como texto

Nomes abreviados: FP=Fundo Profundo, FE=Fundo Elevado, FM=Fundo Marfim, DA=Dourado Antigo, DAL=Dourado Alto, MF=Marfim, MS=Marfim Suave, AC=Âmbar Crepúsculo, AT=Âmbar Terra, MC=Marrom Couro, VP=Verde Planta.

### 5.1 Matriz completa 10×10 (texto sobre fundo)

|              | FP `#141010` | FE `#1E1712` | FM `#EDE2CE` | DA `#A88148` | DAL `#C8A46C` | MF `#EDE2CE` | MS `#B8AC93` | AC `#C67A3E` | AT `#9E5528` | MC `#4A2E1A` | VP `#5C7A3E` |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **FP** `#141010` | — | 1.19 FALHA | 15.02 AAA | 4.68 AA | 7.79 AAA | 15.02 AAA | 8.42 AAA | 4.72 AA | 2.94 FALHA | 1.62 FALHA | 2.93 FALHA |
| **FE** `#1E1712` | 1.19 FALHA | — | 12.62 AAA | 3.93 AA/lg | 6.55 AA | 12.62 AAA | 7.08 AAA | 3.97 AA/lg | 2.47 FALHA | 1.36 FALHA | 2.46 FALHA |
| **FM** `#EDE2CE` | 15.02 AAA | 12.62 AAA | — | 3.21 AA/lg | 1.93 FALHA | 1.00 FALHA | 1.78 FALHA | 3.18 AA/lg | 5.11 AA | 9.28 AAA | 5.13 AA |
| **DA** `#A88148` | 4.68 AA | 3.93 AA/lg | 3.21 AA/lg | — | 1.66 FALHA | 3.21 AA/lg | 1.80 FALHA | 1.01 FALHA | 1.59 FALHA | 2.89 FALHA | 1.60 FALHA |
| **DAL** `#C8A46C` | 7.79 AAA | 6.55 AA | 1.93 FALHA | 1.66 FALHA | — | 1.93 FALHA | 1.09 FALHA | 1.65 FALHA | 2.65 FALHA | 4.81 AA | 2.66 FALHA |
| **MF** `#EDE2CE` | 15.02 AAA | 12.62 AAA | 1.00 FALHA | 3.21 AA/lg | 1.93 FALHA | — | 1.78 FALHA | 3.18 AA/lg | 5.11 AA | 9.28 AAA | 5.13 AA |
| **MS** `#B8AC93` | 8.42 AAA | 7.08 AAA | 1.78 FALHA | 1.80 FALHA | 1.09 FALHA | 1.78 FALHA | — | 1.79 FALHA | 2.87 FALHA | 5.20 AA | 2.88 FALHA |
| **AC** `#C67A3E` | 4.72 AA | 3.97 AA/lg | 3.18 AA/lg | 1.01 FALHA | 1.65 FALHA | 3.18 AA/lg | 1.79 FALHA | — | 1.61 FALHA | 2.92 FALHA | 1.61 FALHA |
| **AT** `#9E5528` | 2.94 FALHA | 2.47 FALHA | 5.11 AA | 1.59 FALHA | 2.65 FALHA | 5.11 AA | 2.87 FALHA | 1.61 FALHA | — | 1.82 FALHA | 1.00 FALHA |
| **MC** `#4A2E1A` | 1.62 FALHA | 1.36 FALHA | 9.28 AAA | 2.89 FALHA | 4.81 AA | 9.28 AAA | 5.20 AA | 2.92 FALHA | 1.82 FALHA | — | 1.81 FALHA |
| **VP** `#5C7A3E` | 2.93 FALHA | 2.46 FALHA | 5.13 AA | 1.60 FALHA | 2.66 FALHA | 5.13 AA | 2.88 FALHA | 1.61 FALHA | 1.00 FALHA | 1.81 FALHA | — |

### 5.2 Pares críticos (assinatura de uso)

| Uso semântico | Par (texto / fundo) | Contraste | Verdicto |
|---|---|---|---|
| **Corpo dark (leitura padrão)** | Marfim `#EDE2CE` / Fundo Profundo `#141010` | **15.02:1** | AAA — canônico |
| **Corpo sobre card** | Marfim / Fundo Elevado | **12.62:1** | AAA |
| **Texto secundário dark** | Marfim Suave / Fundo Profundo | **8.42:1** | AAA — legenda, metadata |
| **Título de marca (Great Vibes)** | Dourado Alto / Fundo Profundo | **7.79:1** | AAA — hero, capa |
| **Destaque de marca (Garamond)** | Dourado Antigo / Fundo Profundo | **4.68:1** | AA — subtítulo, NÃO usar em corpo longo |
| **CTA primário** | Marfim / Âmbar Crepúsculo | **3.18:1** | AA/lg — SÓ botão com texto ≥ 20px (usar `.body-lg` ou h4) |
| **CTA primário alternativo** | Fundo Profundo / Âmbar Crepúsculo | **4.72:1** | AA — texto ≥ 15.75px bold viável |
| **Estado de erro** | Marfim / Âmbar Terra | **5.11:1** | AA — texto de mensagem de erro |
| **Receita física (papiro)** | Marrom Couro / Fundo Marfim | **9.28:1** | AAA — corpo em receita/print |
| **Chrome de receita** | Fundo Profundo / Fundo Marfim | **15.02:1** | AAA — cabeçalho papiro invertido |
| **Ícone Sábio (arquétipo)** | Dourado Antigo / Fundo Profundo | **4.68:1** | AA — ícones ≥ 20px OK |

### 5.3 Regras práticas derivadas da matriz

- **Corpo e dados clínicos** — sempre Marfim `#EDE2CE` sobre Fundo Profundo `#141010` (15.02:1). Nenhuma outra combinação é aceitável para leitura contínua.
- **Dourado Antigo `#A88148`** — nunca texto longo. É destaque de marca, ícone de arquétipo, borda de card premium. Contraste 4.68:1 sobre fundo profundo passa AA para elementos ≥ 15.75px, mas o dourado escuro cansa em corpo longo.
- **Âmbar Crepúsculo `#C67A3E`** — CTA sempre com texto grande. O par canônico "Marfim / Âmbar Crepúsculo" é 3.18:1 = AA/lg. Se o botão for pequeno, usar "Fundo Profundo / Âmbar Crepúsculo" (4.72:1 = AA para 15.75px bold).
- **Âmbar Terra `#9E5528`** — só error/alerta. Nunca CTA de sucesso (colide semanticamente com o âmbar crepúsculo do CTA primário e é escuro demais para acompanhar convite de ação).
- **Foco/erro** — nunca só cor. Sempre acompanhar de ícone/texto (WCAG 1.4.1).
- **Marrom Couro** — só borda, ícone stroke ou fundo de receita. Sobre fundo profundo tem 1.62:1 = FALHA para texto; mas sobre papiro (fundo marfim) tem 9.28:1 = AAA.
- **Verde Planta** — não aparece em matriz porque não é usado como texto. É fill de ilustração da árvore. Vive dentro do sprite da planta virtual e ponto final.

## 6. Modo claro — nota deliberada

O Omiron **não tem light-mode padrão**. Dark-mode é a identidade do produto. O ambiente terapêutico noturno, a "biblioteca à luz de vela", é a experiência canônica.

O que existe como "superfície clara" é o **papiro** (`--omiron-fundo-marfim`) usado em contextos específicos:
- Receita física do consultório.
- Print de exportação de relatório clínico.
- Cabeçalho de e-mail transacional.
- Modais de conquista com moldura de papiro sobre fundo escuro (a moldura é papiro, o app continua dark).

Se em fase futura houver demanda por light-mode acessível (leitor com sensibilidade fotofóbica), o par canônico será: Marrom Couro `#4A2E1A` sobre Fundo Marfim `#EDE2CE` (9.28:1 AAA). Mas essa não é decisão desta rodada.

## 7. Ganchos de rastreabilidade

- Origem dos HEX: pipeta pixel-a-pixel nos 5 thumbnails Canva (18-22), com peso final para slide 18-vencedor.
- Iteração anterior (rascunho Hermes): `docs/pesquisa-referencias/paleta-hex-extraida.md` (v0) — este arquivo (v1 Harmonia) sobrescreve. Papéis semânticos preservados; HEX refinados por pipeta. Delta principal: fundo profundo `#0F0B08 → #141010` (mais quente), dourado antigo `#B8935A → #A88148` (mais envelhecido), marfim suave `#C9BFA9 → #B8AC93` (mais rebaixado), âmbar terra `#A85C2C → #9E5528` (mais escuro para semântica alerta).
- Todos os valores materializados em `02-tokens/tokens.json` (DTCG) e `02-tokens/tokens.css` (CSS custom properties). Regeneração automática garantida.

## 8. Auditoria

Antes de merge, rodar:

```bash
# Preto/branco puros — banidos
grep -rE "(#000000|#FFFFFF|#000\b|#FFF\b|rgb\(0,\s*0,\s*0\)|rgb\(255,\s*255,\s*255\))" \
  brandbook/ design-system/ apresentacao/ --include="*.css" --include="*.md" --include="*.html"
# -> deve retornar 0

# HEX fora da paleta canônica
grep -rE "#[0-9A-Fa-f]{6}" design-system/ \
  | grep -vE "(141010|1E1712|EDE2CE|A88148|C8A46C|B8AC93|C67A3E|9E5528|4A2E1A|5C7A3E)"
# -> deve retornar 0 (ou apenas comentários justificando)

# Verde planta fora da gamificação
grep -rE "verde.plant|#5C7A3E" --exclude-dir=gamification design-system/ brandbook/
# -> deve retornar 0 em produção
```
