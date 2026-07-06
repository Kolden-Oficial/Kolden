# Glória Ellen — Sistema tipográfico

Guia rápido de uso das três famílias de fonte da marca. Serve para qualquer superfície: feed, stories, PDF, contrato, e-mail, YouTube, site.

---

## As duas famílias ativas

| Papel                              | Fonte                     | Peso base   | Onde vive                                                                          |
| ---------------------------------- | ------------------------- | ----------- | ---------------------------------------------------------------------------------- |
| Serifada — voz da marca (e do logo)| **Cormorant Garamond**    | 300 / 400   | **Logo/assinatura** (Italic Light 300), manifesto, título, corpo, legenda editorial, PDF, contrato. |
| Sans — voz prática                 | **Inter**                 | 400 / 500   | Metadados, formulário, botão, footer, valor numérico.                              |

A Cormorant carrega o nome, a poesia e o corpo — em três recortes distintos (Italic Light 300 para o logo, Light 300 para display, Regular/Italic 400 para body/heading). A Inter carrega a informação. Elas não se atropelam — cada uma tem um lugar.

> **v1.1 · 2026-07-02** — O logo migrou de Sacramento (Direção B do brandbook · registro de exploração) para Cormorant Garamond Italic Light 300 (Direção A · aprovada pela Glória). Sacramento sai da lista de fontes ativas e passa a viver apenas no registro histórico ao final deste documento.

---

## Hierarquia visual

Da abertura até o rodapé, a escada é sempre:

1. **`.text-eyebrow`** — rótulo em Inter uppercase (opcional).
2. **`.text-display`** — headline em Cormorant Light 300.
3. **`.text-lead`** — abertura em Cormorant Light Italic 300, cor sea.
4. **`.text-heading`** — subtítulos internos em Cormorant Italic 400.
5. **`.text-body`** — corpo em Cormorant Regular 400.
6. **`.text-info`** — dados de apoio em Inter.
7. **`.text-logo`** — logo/assinatura em Cormorant Garamond Italic Light 300 (Direção A do brandbook). `.text-signature` é alias — mesma declaração, mantido por compatibilidade.

O olho desce sem esforço porque cada nível tem tamanho, peso e cor distintos. A Cormorant Garamond agora tem tripla função — logo (Italic 300), display/heading e body — e nenhuma delas conflita com a outra porque os recortes de peso/estilo/tamanho são distintos.

---

## Regras de peso

- **Cormorant nunca passa de 400 em corpo de texto.** Peso 500 e 600 existem no @import só para casos de destaque muito pontual (uma palavra que precisa carregar peso semântico dentro de um manifesto).
- **Nada de bold pesado.** A marca sussurra — resposta ao Bloco 3 da call.
- **Itálico é a ênfase padrão** em títulos internos e leads. Ele carrega a mão da autora.

---

## Regras de tamanho

- Todos os tamanhos usam `clamp()` para escalar entre mobile e desktop sem quebrar hierarquia.
- Escala baseada em `rem` — respeita a preferência do usuário.
- Line-height mais generoso na Cormorant (1.55 a 1.65 no corpo) porque a serifada precisa respirar.
- Line-height mais compacto em `.text-display` (1.05) porque headline grande com espaço demais parece flácida.

---

## Regras de cor

- Corpo de texto vive em `--ink` (`#2A2B27`) sobre `--cream` (`#FAF5EC`). Este é o par mãe.
- `--ink-soft` e `--ink-mute` existem para hierarquia sutil dentro do próprio corpo — metadados, capítulo, rodapé.
- Lead em `--sea` (`#3D5A6C`) puxa o olhar sem gritar — o azul-mar é a nota de destaque.
- Sobre fundos escuros (ink, sea-deep), o texto inverte para `--cream`.
- **Nunca** usar as cores banidas (roxo, laranja vibrante, vermelho puro, rosa chiclete, amarelo estridente, neon) em nada tipográfico.

---

## Regras de espaçamento

- Letter-spacing negativo (`-0.02em`) só no `.text-display` — apara o vazio entre glifos grandes.
- Letter-spacing positivo (`0.35em`) só no `.text-eyebrow` — abre o rótulo pra dar aura.
- Corpo e lead ficam em `0`. Cormorant já foi desenhada com espaçamento correto.

---

## O que NÃO fazer

- **Não usar Cormorant em all-caps.** Ela foi desenhada com contra-forma para minúsculas. All-caps dela vira grito falso.
- **Não usar a Italic Light 300 fora do logo/assinatura.** O recorte Italic Light 300 é reservado para o nome da marca (`.text-logo` / `.text-signature`). Em corpo, usar Regular 400; em lead, Light Italic 300 na cor sea.
- **Não misturar Cormorant e Inter no mesmo bloco** sem hierarquia clara. Uma em headline, outra em dado — nunca as duas competindo pela mesma função.
- **Não usar peso 600 em manifesto.** O peso é da imagem, não da fonte.
- **Não usar Georgia, Times, Playfair como fallback visível.** Elas são só fallback técnico enquanto a Cormorant carrega. Se estiver aparecendo, alguma coisa quebrou no carregamento.
- **Não colorir texto com `--sand-deep` ou `--dawn` em corpo grande** — essas cores são acento, não corpo.

---

## Aplicação por superfície

| Superfície        | Display          | Body              | Info              | Notas |
|-------------------|------------------|-------------------|-------------------|-------|
| Feed Instagram    | `.text-display`  | `.text-lead`      | `.text-eyebrow`   | Menos é mais — 3 níveis, no máximo. |
| Stories           | `.text-heading`  | `.text-body`      | —                 | Sem eyebrow em vertical apertado. |
| PDF de orçamento  | `.text-display`  | `.text-body`      | `.text-info`      | Tabela e valores em Inter 400. |
| Contrato          | `.text-heading`  | `.text-body`      | `.text-info`      | Sem display — contrato não abre com pompa. |
| E-mail            | `.text-heading`  | `.text-body`      | `.text-info`      | Ass. como `.text-logo` (Cormorant Italic 300). |
| YouTube (thumb)   | `.text-display`  | —                 | —                 | Só uma linha, sem body. |
| Site marketing    | Todos            | Todos             | Todos             | Único onde a escala completa aparece. |

---

## Testes obrigatórios antes de assinar

1. **Leitura em 320px de largura** — nada quebra? nada satura?
2. **Contraste WCAG AA** — texto sobre creme deve dar ≥ 4.5:1 (ink faz; ink-mute só serve para texto acima de 24px).
3. **Sem fonte carregando por 200ms** — se rolar FOUT feio, adicionar `font-display: swap` (já está no @import).
4. **Impressão em preto e branco** — a hierarquia sobrevive sem cor? Tem que sobreviver.

---

Referência canônica: `../../08-brandbook/brandbook.html` (linhas 11-26 têm as vars oficiais; linhas 685-729 lavram a Direção A do logo em Cormorant Italic Light 300).
Fontes ativas: Cormorant Garamond + Inter — Google Fonts (SIL Open Font License).

---

## Registro histórico — fontes exploradas

Estas fontes foram avaliadas durante a exploração do brandbook e **não fazem parte do sistema ativo**. Ficam documentadas para rastreabilidade.

- **Sacramento** — Direção B do brandbook (manuscrita cursiva). Usada como fonte do logo na v1.0 (2026-07-02, manhã). Substituída por Cormorant Italic Light 300 na revisão do brandbook do mesmo dia às 22:34. Registro de exploração, não fonte da marca.
- **Petit Formal Script, Allura** — alternativas manuscritas exploradas junto à Sacramento. Também não entraram como fonte ativa.

> **Direção D (futuro possível)** — assinatura vetorizada real da Glória (manuscrita à mão, digitalizada). Quando existir, substituirá o logo Cormorant Italic sem quebrar tokens: bastará trocar `--font-logo` por um `font-face` local com o SVG/OTF da assinatura. A arquitetura de tokens já isola essa troca.
