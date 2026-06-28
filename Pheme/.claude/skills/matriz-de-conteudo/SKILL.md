---
name: matriz-de-conteudo
description: >
  Gera 24-40 ideias de post concretas numa única tabela, cruzando os pilares de conteúdo
  da marca/cliente com 8 formatos comprovados (matriz estilo Justin Welsh). Use quando o
  pedido for "me dá ideias de post", "matriz de conteúdo", "sobre o que postar", "gerar
  pauta", "ideação de conteúdo" ou "planejar o conteúdo do mês". Lê `sobre-mim.md` e
  `voz.md` se existirem; senão, pergunta pilares e contexto. Cada célula é uma manchete
  específica, não um tema genérico.
metadata:
  type: reference
---

# Matriz de Conteúdo — pilares × formatos

Transforma os pilares da marca em uma grade de manchetes prontas para virar post. Cada
célula é uma ideia concreta tirada do cruzamento pilar × formato, afinada à voz.

## Passo 1 — Reunir insumos
Leia `sobre-mim.md` se existir e pré-preencha quem é a marca (informe o que puxou). Se
faltar, peça 2+ parágrafos sobre quem é, o que faz e o que discute.

Defina os **pilares**: o usuário digita os dele (3 a 5; se < 3, peça mais), puxa de
`voz.md`, ou pede sugestão (proponha 4 a partir de `sobre-mim.md` e confirme antes de seguir).

## Passo 2 — Montar a matriz
Tabela markdown com:
- **Colunas (eixo X): 8 formatos, sempre nesta ordem:**
  1. **Acionável** — how-to ultra-específico; ensina a fazer uma coisa.
  2. **Motivacional** — história inspiradora de alguém que fez algo extraordinário no nicho.
  3. **Analítico** — destrincha por que algo funciona do jeito que funciona.
  4. **Contrário** — vai contra o conselho comum do nicho e sustenta.
  5. **Observação** — tendência oculta/silenciosa/pouco discutida que a marca notou.
  6. **X vs Y** — compara duas entidades (ferramentas, estilos, frameworks, empresas).
  7. **Presente vs Futuro** — estado atual vs. uma previsão específica, com o porquê.
  8. **Listicle** — lista de recursos, dicas, erros, lições ou passos.
- **Linhas (eixo Y):** os 3 a 5 pilares da marca.

Cada célula contém **uma manchete específica e concreta**, sob medida para aquele pilar E
aquele formato. Não genérica, não reutilizável entre pilares. Boa: "A fórmula de gancho de
3 linhas que roubei do David Ogilvy". Ruim: "Ganchos".

## Passo 3 — Saída (consciente da superfície)
- **No Claude Code (com Write/Edit):** salve em `matriz-de-conteudo-AAAA-MM-DD.md` no
  diretório de trabalho e imprima a mesma tabela inline (markdown puro, sem cercar em
  bloco de código — grade 5×8 fica ilegível em monospace). Confirme o caminho do arquivo.
- **Em superfícies de chat com tabela/chart interativo:** renderize como tabela interativa
  (pilares nas linhas, formatos nas colunas), sem também despejar o markdown.
- **Fallback:** tabela markdown inline, sem cerca de código.

Abaixo da tabela, uma frase nomeando a ideia mais forte da matriz e por quê.

## Passo 4 — Próximo movimento
Ofereça transformar qualquer célula em post completo (referenciada por pilar + formato,
ex.: "Ganchos × Contrário"). O handoff de redação vai para os especialistas de texto do
squad (linkedin-x-authority) e, para craft de copy, para **Caliope**.

## Regras
- Mínimo 3, máximo 5 pilares (mais que 5 dilui a matriz).
- Toda célula específica àquele pilar E formato; não reutilize a mesma ideia entre pilares.
- Afine a linguagem à `voz.md` se existir.

---
**Procedência:** método adaptado de `charlie947/social-media-skills` (skill `content-matrix`,
matriz de conteúdo estilo Justin Welsh), @94f72ea2ece388fa30ef49a26fb2e6fd2109e0b1,
licença MIT. Reescrito em pt-BR; formatos traduzidos; regra de estilo pessoal do autor removida.
