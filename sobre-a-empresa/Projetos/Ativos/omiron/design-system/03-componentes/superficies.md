---
id: 03-componentes-superficies
titulo: "Omiron — Superfícies (Design System v1)"
resumo: "Especificação da textura de papiro como token de superfície cross-canal (app + receita física + Instagram + deck). Formatos WebP/PNG, resoluções, paths canônicos, 3 variações (liso, envelhecido, manchado). Nota: os arquivos binários da textura NÃO foram gerados nesta rodada — brief para geração está aqui + em 01-fundamentos/grafismos.md §2.2. Harmonia gera na próxima rodada."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Harmonia (design-chief)
missao: m-20260706-193013-omiron-brandbook-completo
relacionados:
  - 01-fundamentos/grafismos.md
  - 01-fundamentos/cores.md
  - 02-tokens/tokens.json
  - 02-tokens/tokens.css
  - 03-componentes/leia-me.md
tipo: projeto
projeto: omiron
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/design-system/03-componentes/leia-me|leia-me]]"
---

# Superfícies — Omiron

> Textura de papiro é a assinatura cross-canal da marca Omiron. Se um artefato de comunicação não tem papiro em algum lugar, não é Omiron. Este documento consolida a especificação técnica em um só lugar (o `grafismos.md` cobre a semântica; aqui é a operação).

## 1. Token `superficie-papiro`

Três variações declaradas no `tokens.css`:

```css
--omiron-superficie-papiro-liso:
  url("/assets/texturas/papiro-liso.webp"),
  linear-gradient(180deg, #EDE2CE 0%, #D4C4A0 100%);

--omiron-superficie-papiro-envelhecido:
  url("/assets/texturas/papiro-envelhecido.webp"),
  linear-gradient(180deg, #EDE2CE 0%, #C4B08C 100%);

--omiron-superficie-papiro-manchado:
  url("/assets/texturas/papiro-manchado.webp"),
  linear-gradient(180deg, #EDE2CE 0%, #D4C4A0 100%);
```

O `linear-gradient` é fallback quando a imagem falha em carregar. Cor-base do gradiente sempre `#EDE2CE` (Fundo Marfim) no topo → cor mais quente/rebaixada no fim.

## 2. Especificação técnica

### 2.1 Formatos

- **Primário**: WebP (compressão moderna, ~30% menor que PNG para mesma qualidade).
- **Fallback**: PNG (para renderers sem suporte WebP e para impressão profissional).

Ambos servidos, browser escolhe via `<picture>`/`<source>` em contextos HTML, ou via `image-set()` em CSS.

### 2.2 Resolução mínima

**2048×2048 px** — dimensão mínima para cobrir:
- Retina em app (2x, renderiza a 1024×1024 nítido em iPhone Pro).
- Receita física A5/A4 impressa a 300 DPI.
- Instagram feed (1080×1080) com overhead de crop.
- Deck de apresentação em projetor 4K.

Preferência: gerar em 3000×3000 e servir versão comprimida.

### 2.3 Cor-base

Derivada de `--omiron-fundo-marfim` (`#EDE2CE`). A textura tem:
- Gradiente sutil de canto (mais escuro nas bordas, mais claro no centro) simulando desgaste orgânico.
- Manchas irregulares muito sutis (opacidade 3-8%) sugerindo tempo, sem virar sujeira ruidosa.
- Fibras finas visíveis no zoom 100% mas invisíveis a 25% (uso em thumbnail).

### 2.4 Contraste preservado

O papiro deve permitir texto Marrom Couro (`#4A2E1A`) por cima com contraste ≥ 9:1 AAA. Se a textura tem manchas muito escuras, elas quebram esse contraste — inaceitável. Regra prática: nenhum pixel da textura pode estar abaixo de HSL lightness 75% (mancha demasiadamente escura descalibra WCAG).

## 3. Três variações (semântica)

### 3.1 `papiro-liso`

**Path**:
- `/assets/texturas/papiro-liso.webp` (2048×2048)
- `/assets/texturas/papiro-liso.png` (fallback, mesma resolução)

**Uso**:
- App — moldura de mensagem do mentor Quíron (fundo do balão).
- App — fundo padrão de card de recompensa da gamificação.
- App — fundo de tela de conquista (com moldura dourada por cima).
- Instagram — feed de posts.
- Deck — parágrafo de destaque interno de slide.

**Característica**: textura mais uniforme, menos desgaste — o papiro "novo".

### 3.2 `papiro-envelhecido`

**Path**:
- `/assets/texturas/papiro-envelhecido.webp` (2048×2048)
- `/assets/texturas/papiro-envelhecido.png` (fallback)

**Uso**:
- Receita física — layout inteiro do papel timbrado do Dr. Ariosto.
- App — card de conquista de longo prazo (marco de 90 dias, formatura de módulo).
- Deck — capa e contracapa.

**Característica**: mais desgaste nas bordas, sutil escurecimento de canto — sugere o pergaminho que atravessou o tempo.

### 3.3 `papiro-manchado`

**Path**:
- `/assets/texturas/papiro-manchado.webp` (2048×2048)
- `/assets/texturas/papiro-manchado.png` (fallback)

**Uso**:
- Deck — separadores de seção (slide de transição entre módulos).
- Instagram — story destacado (highlight).
- App — background de tela vazia (empty state).

**Característica**: mancha central sutil (não desgaste de borda como envelhecido, mas mancha orgânica no meio) — sugere pergaminho que foi usado como base de escrita e ganhou marcas.

## 4. Cross-canal — regras por canal

### 4.1 App (dark-mode canônico)

Papiro aparece SEMPRE dentro de uma moldura contida — nunca cobre tela inteira em dark-mode. O contraste ambiente é: fundo profundo (`#141010`) escuro → moldura de papiro clara para conquista/recompensa/mensagem do Quíron.

**Exemplo — card de mensagem do Quíron**:
```html
<div class="card-quiron"
     style="background: var(--omiron-superficie-papiro-liso);
            background-blend-mode: multiply;
            color: var(--omiron-papiro-foreground);
            border-radius: var(--omiron-radius-lg);
            padding: var(--omiron-space-6);">
  <!-- texto em Marrom Couro sobre papiro -->
</div>
```

### 4.2 Receita física do consultório (impressão)

Papiro-envelhecido cobre o papel inteiro (A5). Layout:
- Cabeçalho: nome "Dr. Ariosto Ribeiro" em Great Vibes Dourado Antigo (`#A88148`), tamanho 28pt.
- Sub-cabeçalho: "Médico Psiquiatra — CRM/MG XXXXX" em EB Garamond regular Marrom Couro, 11pt.
- Corpo: prescrição em EB Garamond regular Marrom Couro, 12pt, com semibold apenas para nome do medicamento e dosagem.
- Rodapé: endereço + telefone + assinatura em EB Garamond regular Marrom Couro, 9pt.

**Impressão a 300 DPI**: exige que a versão da textura tenha resolução equivalente. 2048×2048 cobre A5 a 300 DPI com folga (A5 = 148×210mm ≈ 1748×2480 px). Para A4 impresso, gerar variação 3508×3508 ou aceitar leve suavização.

### 4.3 Instagram (feed 1080×1080)

Papiro-liso como fundo do post. Composição:
- Topo (200px): assinatura visual "Dr. Ariosto Ribeiro" em Great Vibes Dourado Antigo.
- Meio: texto principal em EB Garamond regular Marrom Couro, `body-lg`.
- Base: logotipo minimalista Omiron OU símbolo do arquétipo Sábio.

Aspecto: mesma paleta que a receita física — a marca é uma através dos canais.

### 4.4 Deck de apresentação (padrão Rosie)

- Capa: papiro-envelhecido cobrindo tela cheia + título em Great Vibes centralizado.
- Separadores de seção: papiro-manchado + título de módulo em Great Vibes.
- Slides de conteúdo: fundo profundo dark canônico (`#141010`), papiro só em blocos internos de destaque (parágrafo âncora, epígrafe).
- Contracapa: papiro-envelhecido + assinatura/CTA.

### 4.5 E-mail transacional

Papiro-liso apenas no cabeçalho superior do e-mail (topo 200px, tipicamente). Corpo do e-mail em fundo Marfim (`#EDE2CE`) sem textura para não pesar em renderers de e-mail cliente (Outlook, Gmail) que renderizam imagens de forma inconsistente.

## 5. Nota Harmonia — geração pendente

> **A textura de papiro NÃO foi gerada nesta rodada.** Harmonia entrega a especificação. Geração dos 3 arquivos WebP+PNG fica para a próxima rodada.

O `tokens.css` já referencia os paths esperados — quando os arquivos existirem em `assets/texturas/`, entram sem quebra de contrato. Enquanto não existirem, o fallback `linear-gradient` renderiza (não é papiro, mas mantém a paleta correta).

### 5.1 Brief para geração (próxima rodada)

```
Assunto: Textura de papiro Omiron — 3 variações
Tarefa: gerar 3 texturas de papiro fotográficas/naturalistas
Formato: WebP (primário) + PNG (fallback)
Resolução: 2048×2048 px mínimo; preferido 3000×3000
Paths de destino:
  - assets/texturas/papiro-liso.webp
  - assets/texturas/papiro-liso.png
  - assets/texturas/papiro-envelhecido.webp
  - assets/texturas/papiro-envelhecido.png
  - assets/texturas/papiro-manchado.webp
  - assets/texturas/papiro-manchado.png

Cor-base: #EDE2CE (fundo-marfim Omiron)
Amplitude tonal: HSL lightness entre 75% e 90% (nenhum pixel abaixo de 75%
  — quebra o contraste WCAG do texto Marrom Couro por cima).

Referência visual: pergaminho autêntico envelhecido, fibras finas visíveis
sob zoom, elegância imperfeita, humano sob mármore. Estilo: fotografia macro
de papiro egípcio conservado em museu, tratamento de cor quente. Evitar:
gradientes digitais óbvios, texturas procedurais artificiais, "burned edges"
hollywood, "old paper" clichê.

Diferenciações:
  - papiro-liso: textura mais uniforme, menos desgaste — papiro "novo".
  - papiro-envelhecido: escurecimento sutil nas bordas simulando tempo.
  - papiro-manchado: mancha orgânica central sutil (não borda).

Validação pós-geração:
1. Contraste do texto Marrom Couro #4A2E1A por cima permanece ≥ 9:1 AAA
   (validar no ponto MAIS ESCURO da textura).
2. Impressão A5 a 300 DPI mantém a assinatura visível sem virar ruído.
3. Reduz a 25% (thumbnail): fibras somem, cor-base permanece coerente.
4. Zoom 100%: fibras aparecem, superfície tem alma.
```

### 5.2 Ferramentas candidatas para geração

- **Fotografia real** — comprar/adquirir foto de pergaminho envelhecido real (Adobe Stock, Getty), tratar em Photoshop, exportar 3 variações.
- **Modelo de IA** — Midjourney com prompt específico (referência: papiros do Museu Britânico, Egito antigo), refinamento em Photoshop.
- **Textura procedural** — Substance Designer ou similar; NÃO recomendado (a "elegância imperfeita" é difícil de conseguir proceduralmente sem parecer digital).

Escolha: Ronan decide na próxima rodada. Harmonia recomenda fotografia real + tratamento.

## 6. Auditoria

```bash
# Papiro referenciado em contexto proibido (banido)
grep -rE "papiro.*(fundo|background).*(azul|blue|clinical|hospital)" \
  design-system/ brandbook/ apresentacao/
# -> deve retornar 0

# Verificar todos os canais têm papiro em algum lugar (governança)
# Rodar manualmente na revisão de cada artefato:
#   - receita física: papiro cobre toda a folha? (obrigatório)
#   - Instagram: papiro no fundo do post? (obrigatório)
#   - deck: papiro na capa e nos separadores? (obrigatório)
#   - e-mail transacional: papiro no cabeçalho? (obrigatório)
```

## 7. Ganchos de rastreabilidade

- Papiro confirmado como assinatura cross-canal na reunião 01/07/2026 com Dr. Ariosto.
- Uso em receita física (customização do papel timbrado) é pedido explícito do cliente.
- Uso em Instagram (linha editorial de posts) é pedido explícito do cliente.
- Especificação técnica de resolução/formato calibrada para atender uso em impressão A5 300 DPI + retina mobile + projetor 4K.
- Geração dos arquivos binários pendente para próxima rodada — brief entregue em `01-fundamentos/grafismos.md §2.2` e aqui em §5.1.
