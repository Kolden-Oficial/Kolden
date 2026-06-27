---
name: seo-internacional-hreflang
description: >
  Use quando a demanda envolver SEO internacional, multi-idioma ou multi-região:
  validar ou gerar hreflang, mapear equivalência de páginas entre idiomas,
  conferir códigos de idioma/região, paridade de conteúdo entre versões e
  adaptação cultural. Gatilhos: "hreflang", "SEO internacional", "i18n",
  "multi-idioma", "multi-região", "tags de idioma", "site em vários países",
  "tradução do site". É uma frente NOVA da Ariadne.
---

# SEO Internacional & Hreflang

Frente nova da Ariadne. Garante que o Google entregue a versão certa do conteúdo ao usuário certo, e que cada mercado receba conteúdo de fato adaptado — não só traduzido.

## 1. Validação de hreflang (8 checagens)
1. **Auto-referência:** toda página inclui um hreflang apontando para si mesma; a URL precisa bater exatamente com a canônica. Sem isso, o Google ignora o conjunto inteiro.
2. **Tags de retorno (bidirecionalidade):** se A aponta para B, B precisa apontar para A. Relação unilateral invalida o sinal para ambas. Conferir malha completa.
3. **x-default:** designa o fallback para idiomas/regiões sem match (seletor de idioma ou versão padrão). Apenas um por conjunto, e com tags de retorno.
4. **Código de idioma:** ISO 639-1 (duas letras). Erros comuns: `eng`→`en`, `jp`→`ja`, `zh` sem qualificador (use `zh-Hans`/`zh-Hant`).
5. **Código de região:** ISO 3166-1 Alpha-2, formato `idioma-REGIÃO` (idioma minúsculo, região maiúscula). Erros: `en-uk`→`en-GB`, `es-LA` (LatAm não é país).
6. **Alinhamento canônico:** hreflang só em URL canônica; se a página tem canonical apontando para outra, seu hreflang é ignorado.
7. **Consistência de protocolo:** todas as URLs do conjunto no mesmo protocolo (HTTPS). Atualizar após migração HTTPS.
8. **Cross-domain:** hreflang funciona entre domínios (`.com`/`.de`); exige tags de retorno em ambos e ambos verificados no Search Console.

## 2. Métodos de implementação
- **`<link>` HTML** — sites pequenos (<50 variantes/página); fácil, mas incha o `<head>`.
- **Cabeçalho HTTP** — para arquivos não-HTML (PDFs).
- **Sitemap XML** (recomendado p/ escala/cross-domain) — namespace `xmlns:xhtml`, cada `<url>` lista TODAS as alternativas (inclusive a si), split a cada 50.000 URLs.

## 3. Adaptação cultural (além do técnico)
Avalie se cada versão foi culturalmente adaptada, não só traduzida: CTAs (direto vs indireto conforme o mercado), sinais de confiança locais (certificações, páginas legais), ausência de marcas estrangeiras na página localizada, formatação de número/data/moeda. Saída: score de adaptação cultural por idioma (0-100).

## 4. Paridade de conteúdo
Audite paridade entre versões: existência da página em todos os idiomas declarados, equivalência de estrutura (contagem de H2/H3), paridade de title/meta/schema localizado, razão de contagem de palavras (alemão tende a ser 25-35% mais longo que inglês; japonês 10-25% mais curto), frescor (traduções defasadas) e marcadores culturais. Saída: matriz de paridade com score por página e ações priorizadas.

## Saída
Relatório de validação (total de páginas, variantes, issues por severidade Crítico/Alto/Médio/Baixo), tabela por idioma (auto-ref / retorno / x-default / status), tags hreflang corrigidas prontas para implementar, e (quando pedido) score de adaptação cultural + matriz de paridade.

## Handoffs e regras Kolden
- **Argos** (entrada): volume e intenção de busca por mercado-alvo.
- **Caliope** (saída): a tradução/transcriação persuasiva final é dele; a Ariadne entrega a estrutura i18n e o briefing de paridade.
- Validação de schema só por browser/Rich Results (limite do `web_fetch` com JSON-LD via JS).

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-hreflang` + references de perfis culturais/locale/paridade, licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal. Perfis culturais detalhados (DACH, Francófono, Hispânico, Japonês) e tabelas de formato por locale ficam como referência a provisionar.
