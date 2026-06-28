---
name: seo-ecommerce
description: >
  Use quando a demanda for SEO de e-commerce: otimização de página de produto,
  schema Product/Offer para Google Shopping e Merchant Center, inteligência de
  marketplace (Google Shopping/Amazon), análise de preço competitivo, gaps de
  keyword orgânica × Shopping e perfil UCP. Gatilhos: "SEO de e-commerce",
  "SEO de produto", "página de produto", "Google Shopping", "marketplace",
  "product schema", "Merchant Center", "loja online", "ficha de produto". É uma
  frente NOVA da Ariadne.
---

# SEO de E-commerce

Frente nova da Ariadne. Une SEO on-page de produto + schema Product + inteligência de marketplace.

## 1. Página de produto (on-page, sem dados externos)
Checklist por categoria, com peso:
- **Schema (25%):** Product completo (ver §3).
- **Title & meta (15%):** keyword + marca; formato `[Produto] - [Diferencial] | [Marca]`; <60 chars; meta com preço/benefício + CTA, <155 chars.
- **Imagens (20%):** alt com produto+diferencial, nome de arquivo descritivo, WebP, ≥3 imagens, ≥800px (elegibilidade Shopping), lazy só abaixo da dobra. (Detalhe de imagem → `seo-de-imagens`.)
- **Conteúdo (20%):** descrição **única** (não copy-paste do fabricante), ≥200 palavras, tabela de specs, reviews on-page (UGC).
- **Links internos (10%):** breadcrumb Home > Categoria > Subcategoria > Produto, relacionados (cross/upsell), link de volta à categoria.
- **Técnico (10%):** velocidade, render mobile, canonical (chave em variantes de produto).

## 2. Inteligência de marketplace (DataForSEO Merchant — opcional)
Análise competitiva ao vivo do Google Shopping e Amazon:
- **Preço:** distribuição (min/max/mediana/P25/P75), outliers, correlação preço×rating, normalização de moeda.
- **Sellers:** top sellers por volume de listagem, distribuição de rating, prevalência de frete grátis.
- **Gaps de keyword (orgânico × Shopping):** *Orgânico só* → criar feed no Merchant Center; *Shopping só* → criar conteúdo (guias de compra, comparativos); *ambos* → garantir consistência de preço e reforçar schema.

**Guarda de custo obrigatória:** antes de toda chamada Merchant, estimar custo e pedir aprovação; endpoints Amazon sempre exigem confirmação. Logar o custo após cada chamada.

## 3. Schema Product
Obrigatórios (Google Merchant): `name`, `image[]`, `description`, `brand.name`, `offers` (`price` como número string sem símbolo, `priceCurrency` ISO 4217, `availability` com URL enum Schema.org completa, `seller`). Recomendados que elevam rich results: `sku`/`gtin`/`mpn`, `aggregateRating` (exige `ratingValue`+`reviewCount`), `shippingDetails`, `hasMerchantReturnPolicy`, atributos de variante. Score sobe por completude (required=50 → +reviews 3+=100).

## 4. UCP — Universal Commerce Protocol (prospectivo)
Padrão liderado pelo Google para agentes de IA descobrirem/transacionarem com lojas. Quem já está no Merchant Center com Product schema limpo pode declarar perfil em `/.well-known/ucp` listando capacidades (checkout/fulfillment/discount). Perfil ausente = oportunidade, não falha (adoção é recente).

## Saída
Score 0-100 com quebra (schema/title-meta/imagem/conteúdo/links) + inteligência de marketplace (quando disponível) + schema Product pronto/validado + recomendações priorizadas (Crítico→Médio).

## Handoffs e regras Kolden
- **Argos** (entrada): rankings orgânicos e volume para o cruzamento de gaps.
- **Caliope** (saída): descrição de produto persuasiva final.
- **Aglaia** (saída): geração de imagem de produto; imagem AI exige rótulo IPTC `DigitalSourceType: TrainedAlgorithmicMedia` no Merchant Center — flag cruzado com `seo-de-imagens`.
- **engenheiro-de-schema** (interno): delega a geração/validação fina do Product schema.
- **Infisical:** credenciais DataForSEO/Merchant via Infisical (`infisical-padrao`).

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-ecommerce`, original_author Matej Marjanovic — Pro Hub Challenge; + references de marketplace/UCP, licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal.
