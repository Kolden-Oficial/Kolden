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

---

## Absorção B02 (MKT-G41, G66, G68, G70, G74, G81) — Mixes de mercado por plataforma

A grade de 8 formatos define O QUE dizer. Cada plataforma exige uma MISTURA
diferente de formatos + tom + cadência. Antes de despejar a matriz igual em toda
rede, aplique o mix da plataforma-alvo.

### Instagram — regra de 1/3
- **1/3 educativo** (formatos 1-Acionável, 3-Analítico, 8-Listicle) — constrói autoridade.
- **1/3 inspiracional** (formatos 2-Motivacional, 5-Observação) — cria salvamento.
- **1/3 entretenimento** (formatos 4-Contrário, 6-X vs Y, 7-Presente vs Futuro) — gera compartilhamento.

### TikTok — regra 40/30/20/10
- **40% Trend jacking** — hook rápido + tema atual (aplicar a fórmula do formato 4 ou 6 no som/formato em alta).
- **30% Educação em série** — formato 1-Acionável ou 8-Listicle picotado em série.
- **20% Story / bastidor** — formato 2-Motivacional ou 5-Observação em vídeo pessoal.
- **10% Vendas direta** — formato 7-Presente vs Futuro ou 4-Contrário empurrando ação.

### X / Twitter — regra 25/20/20/15/10/10
- **25% Opinião contrária** (formato 4-Contrário) — o combustível principal do X.
- **20% Observação/insight** (formato 5-Observação).
- **20% Fio educativo** (formato 1-Acionável estendido em thread).
- **15% Comparação** (formato 6-X vs Y).
- **10% Listicle** (formato 8).
- **10% Bastidor/interação** — reply em conta grande, quote com opinião.

### WeChat — regra 60/30/10 (autoridade + confiança + venda)
- **60% Autoridade** — long-form article do formato 3-Analítico ou 5-Observação (WeChat premia profundidade).
- **30% Bastidor/confiança** — formato 2-Motivacional + demonstração de rotina.
- **10% Vendas direta** — Mini Program + oferta.

### Xiaohongshu (XHS) — regra 70/20/10 (lifestyle + review + brand)
- **70% Lifestyle post** — formato 5-Observação + estética visual dominante.
- **20% Review honesto** — formato 6-X vs Y + prós/contras específicos.
- **10% Brand story** — formato 2-Motivacional (fundação, origem).

### Employee advocacy (LinkedIn)
- **Cada funcionário posta 2x/semana** com voz própria, mas usando UM formato semanal da matriz distribuído por perfil.
- **Coordenação leve**: revezar formato entre funcionários evita "eco de marca" (todo mundo postando o mesmo dia).
- **Amplifica alcance orgânico ~8-14x** vs. conta corporativa isolada.

### Como aplicar no output
Ao gerar a matriz, se o usuário indicar plataforma-alvo, marcar as células com o mix da rede: `[TT-40]`, `[IG-1/3-edu]`, `[XHS-70]`, etc. — o publisher sabe qual bloco puxar em qual dia.

---
**Procedência da absorção B02:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (IDs MKT-G41, G66, G68, G70, G74, G81 — mixes por plataforma consolidados dos playbooks IG/TikTok/X/WeChat/XHS/employee advocacy).
