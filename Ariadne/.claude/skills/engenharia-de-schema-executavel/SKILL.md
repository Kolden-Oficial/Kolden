---
name: engenharia-de-schema-executavel
description: >
  Use para GERAR e VALIDAR JSON-LD de forma executável, priorizando os tipos
  ativos de maior alavancagem e evitando os tipos DEPRECIADOS pelo Google
  (junho/2025, julho/2025 e FAQ retirado 7-mai-2026). Cobre detecção
  (JSON-LD/Microdata/RDFa), validação de propriedades obrigatórias por tipo,
  templates canônicos por página (Organization, LocalBusiness, Product,
  SoftwareApplication, Article, BreadcrumbList, Event, JobPosting, Course,
  Video, Recipe, Person, WebSite, WebPage, ItemList) e a árvore de decisão
  "asked for X → recomendar Y" para tipos aposentados. É a camada operacional
  do `engenheiro-de-schema` — cria markup pronto para colar, com o método de
  validação que evita o falso negativo do web_fetch em SPAs.
  Gatilhos: "gera o schema", "JSON-LD para essa página", "valida o schema",
  "esse tipo ainda vale?", "HowTo/FAQPage/ClaimReview/SpecialAnnouncement",
  "schema depreciado", "rich results", "structured data check". NÃO substitui
  o `otimizacao-on-page-por-intencao` (auditoria on-page) — aqui o foco é o
  markup por si só.
---

# Engenharia de Schema Executável (geração + validação + tipos depreciados)

Operacionaliza o `engenheiro-de-schema` com **três disciplinas costuradas**:
detecção do que já existe, validação contra os requisitos que o Google honra
hoje, geração de JSON-LD pronto — sempre passando pela **tabela de
depreciação 2024-2026** antes de sugerir qualquer tipo.

## 1. Detecção (o que a página já tem)

Ordem de leitura recomendada:

1. `<script type="application/ld+json">` — **JSON-LD** é o formato preferido do
   Google. Parse o conteúdo, valide o JSON, extraia todos os `@type` (inclusive
   `@graph` aninhado).
2. **Microdata** — `itemscope`/`itemtype`/`itemprop` no HTML. Menos usado, mas
   ainda aparece em CMS antigos e temas WordPress.
3. **RDFa** — `typeof`/`property`. Raro fora de sites de publisher.

**Gotcha SPA (veto da Ariadne):** o `web_fetch`/curl NÃO vê JSON-LD injetado por
JavaScript. Se a página é SPA/CSR (detecção via `render-js-e-spa`), o veredito
"não tem schema" é falso até que o pipeline de render confirme. Em e-commerce
com Product/Offer, exigir schema no HTML **server-rendered** — o Google atrasa
o processamento de markup injetado por JS (guia JS SEO dez/2025).

## 2. Validação (o que o Google honra)

Para cada `@type` detectado, valide:

- **Propriedades obrigatórias** (por tipo — ver §4).
- **@context** presente e apontando para `https://schema.org`.
- **Tipos de dado corretos** (URL absoluta, não relativa; data em ISO 8601;
  número numérico, não string).
- **Placeholder de template não substituído** (`[Company Name]`, `[Phone]`,
  `TODO`, `XXXX` → erro).
- **Coerência com o conteúdo da página** — `Product` sem preço visível ao usuário
  é sinal de spam markup; `Review` gerado sem review real é violação do QRG.
- **`@type` presente e existente no schema.org** (sem `@type: Whatever`).
- **Tipo NÃO depreciado** — bloqueia recomendação nova para os tipos da §3.

Método de validação inegociável (regra Kolden):

- **Browser + Rich Results Test** (`search.google.com/test/rich-results`) — fonte
  de verdade do que o Google renderiza e considera elegível.
- **Schema.org Validator** (`validator.schema.org`) — verifica conformidade com
  o vocabulário, independente do que o Google renderiza.
- **NUNCA validar por `web_fetch`/curl** em SPA — só HTML server-rendered.

## 3. Tipos depreciados 2024-2026 (bloqueio de recomendação nova)

O Google fez uma limpeza consolidada em jun/2025, jul/2025 e mai/2026. **Nunca
recomendar geração nova** para os tipos abaixo. Se o cliente já tem, marcar
como **Info** (não Critical): pode ainda servir como sinal de entidade para AI.

| Tipo | Retirado | Recomendação da Ariadne |
|---|---|---|
| **HowTo** | set/2023 (rich result) | Não gerar novo. Se já existe e o cliente usa para citação em IA, manter e flaggar "sem efeito SERP". |
| **FAQPage** (rich result) | restringido ago/2023, **retirado para TODOS 7-mai-2026** | Não gerar novo para SERP. Manter existente como sinal de entidade para AI Overviews/AI Mode. Para Q&A genuíno de usuário, usar `QAPage`. Rich Results Test perde suporte jun/2026; GSC API ago/2026. |
| **ClaimReview** | jun/2025 | Sem substituição. Se contexto for notícia, usar `Article` com `dateline`. Vocabulário continua no schema.org, mas o Google ignora. |
| **EstimatedSalary** / `OccupationalAggregateRating` | jun/2025 | Usar `JobPosting` com `baseSalary` para vagas específicas. |
| **LearningVideo** | jun/2025 | Usar `VideoObject` (rich result de vídeo continua vivo). |
| **Course Info carousel** | jun/2025 | Carrossel morreu; card único de `Course` continua vivo. Confirmar com o cliente qual variante ele quer. |
| **SpecialAnnouncement** | jul/2025 | Sem substituição. Se for evento com data, `Event`; senão `Article`/`WebPage`. |
| **Vehicle Listing** | jun/2025 | Sem substituição. Usar `Product` com propriedades veiculares se vendido online. |
| **Practice Problem** | final de 2025 | Sem substituição para rich result. |
| **Dataset** | final de 2025 (rich result) | Vocabulário continua útil para catálogos abertos; sem efeito SERP. |

**Tabela de decisão "asked for X → recomendar Y":**

- Pediu `ClaimReview` → nada equivalente; se for notícia, `Article` com `dateline`
  e citação de fonte primária.
- Pediu `EstimatedSalary` → `JobPosting` + `baseSalary` (`MonetaryAmount`).
- Pediu `LearningVideo` → `VideoObject`.
- Pediu `Course Info` (carrossel) → `Course` único; ou se o cliente quer coleção,
  `ItemList` de `Course`.
- Pediu `SpecialAnnouncement` → `Event` (com `startDate`/`endDate`) ou `Article`.
- Pediu `VehicleListing` → `Product` (`brand`, `model`, `vehicleIdentificationNumber`,
  `mileageFromOdometer`, `offers`).
- Pediu `HowTo` para SERP → não gera; sugerir estrutura de artigo com `<h2>`
  descritivo em cada passo. Se o objetivo for legibilidade para AI, manter é
  defensável mas flaggar "sem SERP effect".
- Pediu `FAQPage` para SERP → não gera para SERP. Se o objetivo é AI/entidade,
  gerar continua defensável — flaggar como Info.

Nota de calendário: **Rich Results Test suporte a FAQPage/HowTo cai em jun/2026;
Search Console API em ago/2026.** Recomende migração de dashboards que dependem
disso.

## 4. Tipos ATIVOS de alta alavancagem (recomendar livremente)

Prioridade por alavancagem em SERP e AI:

- **Organization** — página institucional, home, footer global (todo site).
- **LocalBusiness** (e subtipos: `Restaurant`, `Dentist`, `MedicalBusiness`,
  `AutoRepair`, etc.) — negócio com endereço físico. Ver `seo-local-e-mapas`.
- **Product + Offer** (+ `AggregateRating` + `Review`) — e-commerce; obrigatório
  para Merchant Listings. Ver `seo-ecommerce`.
- **Article** / **BlogPosting** / **NewsArticle** — publisher e blog.
- **BreadcrumbList** — todo site com hierarquia (SERP mostra path em vez de URL).
- **WebSite** + `potentialAction: SearchAction` — sitelinks searchbox.
- **WebPage** — coringa quando nenhum tipo mais específico se aplica.
- **Person** — autor com credencial, prova de E-E-A-T.
- **VideoObject** — todo vídeo (thumbnail, duração, transcript URL).
- **Event** — evento com data (webinar, workshop, lançamento).
- **JobPosting** — vaga (site de recrutamento ou página de carreiras).
- **Course** (single card) — programa educacional.
- **Recipe** — publisher de comida.
- **SoftwareApplication** / **WebApplication** — SaaS/app.
- **ItemList** — roundup, comparação, curadoria (ver `analise-de-gap-de-conteudo`).
- **DiscussionForumPosting** — comunidade/fórum (rich result ativo).
- **QAPage** — Q&A genuíno de usuário (substituto do FAQPage nesse cenário).

Marca de 2025 útil: `Product` ganhou **Certification** markup (abr/2025) — se o
produto tem certificação (energy, food safety, materials), incluir gera badge.

## 5. Templates de JSON-LD (copiar, preencher, validar)

Todos os templates seguem o padrão: `@context` → `@type` → propriedades. Sempre
com URL absoluta e data ISO 8601. Marcar placeholders `[COLCHETES]` que o cliente
DEVE preencher antes de publicar.

### Organization (footer / home institucional)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "[Razão social]",
  "url": "https://[dominio]",
  "logo": "https://[dominio]/logo.png",
  "sameAs": [
    "https://linkedin.com/company/[slug]",
    "https://www.youtube.com/@[canal]",
    "https://www.instagram.com/[perfil]"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-11-XXXX-XXXX",
    "contactType": "customer service",
    "availableLanguage": ["Portuguese", "English"]
  }
}
```

### LocalBusiness (unidade física — subtipar quando aplicável)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://[dominio]/#localbusiness",
  "name": "[Nome fantasia]",
  "image": "https://[dominio]/fachada.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Rua], [Número]",
    "addressLocality": "[Cidade]",
    "addressRegion": "[UF]",
    "postalCode": "[CEP]",
    "addressCountry": "BR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": -00.000, "longitude": -00.000 },
  "telephone": "+55-11-XXXX-XXXX",
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "09:00", "closes": "18:00"
  }],
  "priceRange": "$$",
  "url": "https://[dominio]"
}
```

### Product + Offer + AggregateRating (e-commerce)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Nome do produto]",
  "image": ["https://[dominio]/produto-frente.jpg", "https://[dominio]/produto-verso.jpg"],
  "description": "[Descrição factual, sem hype]",
  "sku": "[SKU]",
  "brand": { "@type": "Brand", "name": "[Marca]" },
  "offers": {
    "@type": "Offer",
    "url": "https://[dominio]/produto/[slug]",
    "priceCurrency": "BRL",
    "price": "199.90",
    "priceValidUntil": "2026-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition",
    "shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "BRL" },
      "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "BR" }
    },
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": "BR",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 7,
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "128"
  }
}
```

Notas: `shippingDetails` e `hasMerchantReturnPolicy` são **obrigatórios para
Merchant Listings** desde 2023 — sem eles, o card mostra "insufficient data".
`priceValidUntil` evita a warning "price recently changed".

### Article / BlogPosting / NewsArticle
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Título ≤110 caracteres para Google News]",
  "image": ["https://[dominio]/hero-16x9.jpg","https://[dominio]/hero-4x3.jpg","https://[dominio]/hero-1x1.jpg"],
  "author": {
    "@type": "Person",
    "name": "[Autor]",
    "url": "https://[dominio]/autor/[slug]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "[Publisher]",
    "logo": { "@type": "ImageObject", "url": "https://[dominio]/logo.png" }
  },
  "datePublished": "2026-07-01T09:00:00-03:00",
  "dateModified": "2026-07-01T12:00:00-03:00",
  "mainEntityOfPage": "https://[dominio]/artigo/[slug]"
}
```

`image` em 3 aspect ratios (16:9, 4:3, 1:1) é requisito para Article rich result.
Autor com `@type: Person` + URL é sinal E-E-A-T (Experiência/Expertise).

### BreadcrumbList
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://[dominio]/" },
    { "@type": "ListItem", "position": 2, "name": "Categoria", "item": "https://[dominio]/categoria/" },
    { "@type": "ListItem", "position": 3, "name": "Página atual", "item": "https://[dominio]/categoria/pagina/" }
  ]
}
```

### WebSite + SearchAction (sitelinks searchbox)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://[dominio]/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": "https://[dominio]/buscar?q={search_term_string}" },
    "query-input": "required name=search_term_string"
  }
}
```

### Event
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "[Nome do evento]",
  "startDate": "2026-08-15T19:00:00-03:00",
  "endDate": "2026-08-15T22:00:00-03:00",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "[Nome do local]",
    "address": "[Endereço completo]"
  },
  "image": ["https://[dominio]/evento.jpg"],
  "description": "[Descrição factual]",
  "offers": {
    "@type": "Offer",
    "url": "https://[dominio]/evento/inscricao",
    "price": "0", "priceCurrency": "BRL",
    "availability": "https://schema.org/InStock",
    "validFrom": "2026-07-01T00:00:00-03:00"
  },
  "organizer": { "@type": "Organization", "name": "[Organizador]", "url": "https://[dominio]" }
}
```

### JobPosting
```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "[Cargo]",
  "description": "[HTML completo da vaga: responsabilidades, requisitos, benefícios]",
  "datePosted": "2026-07-01",
  "validThrough": "2026-08-31T23:59:00-03:00",
  "employmentType": "FULL_TIME",
  "hiringOrganization": { "@type": "Organization", "name": "[Empresa]", "sameAs": "https://[dominio]" },
  "jobLocation": {
    "@type": "Place",
    "address": { "@type": "PostalAddress", "addressLocality": "São Paulo", "addressRegion": "SP", "addressCountry": "BR" }
  },
  "baseSalary": {
    "@type": "MonetaryAmount", "currency": "BRL",
    "value": { "@type": "QuantitativeValue", "value": 8000, "unitText": "MONTH" }
  }
}
```

### Person (autor, com E-E-A-T)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Nome]",
  "url": "https://[dominio]/autor/[slug]",
  "image": "https://[dominio]/autor/[slug].jpg",
  "jobTitle": "[Cargo]",
  "worksFor": { "@type": "Organization", "name": "[Empresa]" },
  "sameAs": [
    "https://linkedin.com/in/[perfil]",
    "https://en.wikipedia.org/wiki/[verbete]",
    "https://scholar.google.com/citations?user=[id]"
  ],
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "[Universidade]" }
}
```

Sinais fortes de E-E-A-T: `sameAs` para Wikipedia, LinkedIn, ORCID, Google Scholar.

### VideoObject
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "[Título do vídeo]",
  "description": "[Descrição factual]",
  "thumbnailUrl": ["https://[dominio]/thumb-16x9.jpg"],
  "uploadDate": "2026-07-01T09:00:00-03:00",
  "duration": "PT4M52S",
  "contentUrl": "https://[dominio]/video.mp4",
  "embedUrl": "https://[dominio]/embed/[id]"
}
```

`duration` em ISO 8601 (`PT4M52S` = 4min52s). `thumbnailUrl` obrigatório.

### ItemList (roundup / comparação — ver `analise-de-gap-de-conteudo`)
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListOrder": "https://schema.org/ItemListOrderAscending",
  "numberOfItems": 5,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "url": "https://[dominio]/item-a" },
    { "@type": "ListItem", "position": 2, "url": "https://[dominio]/item-b" }
  ]
}
```

### SoftwareApplication (SaaS / app)
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Nome]",
  "operatingSystem": "Web, iOS, Android",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "49.00", "priceCurrency": "BRL"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7", "reviewCount": "312"
  }
}
```

### Recipe (publisher de comida)
```json
{
  "@context": "https://schema.org",
  "@type": "Recipe",
  "name": "[Prato]",
  "image": ["https://[dominio]/receita-16x9.jpg"],
  "author": { "@type": "Person", "name": "[Chef]" },
  "datePublished": "2026-07-01",
  "description": "[Descrição]",
  "prepTime": "PT15M", "cookTime": "PT30M", "totalTime": "PT45M",
  "recipeYield": "4 porções",
  "recipeIngredient": ["[ingrediente 1]", "[ingrediente 2]"],
  "recipeInstructions": [
    { "@type": "HowToStep", "text": "[Passo 1]" },
    { "@type": "HowToStep", "text": "[Passo 2]" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "47" },
  "nutrition": { "@type": "NutritionInformation", "calories": "320 kcal" }
}
```

## 6. Encadeamento por `@graph` (uma página, vários tipos)

Para uma página que exige múltiplos tipos (ex.: home = `Organization` +
`WebSite` + `BreadcrumbList`), embrulhar em `@graph`:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://[dominio]/#org", "..." },
    { "@type": "WebSite", "@id": "https://[dominio]/#site", "publisher": { "@id": "https://[dominio]/#org" } },
    { "@type": "BreadcrumbList", "..." }
  ]
}
```

Usar `@id` para permitir referência cruzada (`publisher: { @id: ... }`) sem
duplicar o objeto. Reduz peso e mantém coerência entre tipos.

## 7. Erros comuns que reprovam validação

- URL relativa em `image`, `url`, `logo` → sempre absoluta com esquema.
- Data em formato local (`01/07/2026`) → ISO 8601 (`2026-07-01`).
- Preço como string com moeda embutida (`"R$ 199,90"`) → número + `priceCurrency`.
- `aggregateRating` sem `reviewCount` ou com contagem zero.
- `Review` gerado programaticamente sem review real na página (violação QRG).
- `FAQPage` gerado após 7-mai-2026 esperando rich result (não existe mais).
- `Product` sem `shippingDetails` nem `hasMerchantReturnPolicy` (warning
  "insufficient data" no Merchant Listing).
- Placeholder de template no live (`[Company Name]`, `TODO`, `XXXX`).
- Schema injetado por JS numa página com status ≠ 200 (Google não renderiza).
- Canonical do HTML cru diferente do JSON-LD injetado por JS.

## 8. Saída padrão

```
SCHEMA DA PÁGINA
Tipos detectados: [lista + @type + método (JSON-LD/Microdata/RDFa)]
Válidos:          [tipo → OK, propriedades obrigatórias presentes]
Warnings:         [tipo → propriedade recomendada faltando + impacto]
Erros:            [tipo → obrigatória faltando ou tipo depreciado + o que fazer]
Depreciados:      [tipo → data de retirada + tabela de substituição]
Oportunidades:    [tipo ausente + por que valeria: SERP feature X, AI entity Y]
JSON-LD gerado:   [snippets prontos para colar, marcados com placeholders]
Validação sugerida: Rich Results Test + Schema.org Validator
```

## Handoffs e regras Kolden

- **auditor-tecnico-seo** (irmão): detecção rápida via `otimizacao-on-page-por-intencao`; validação profunda vive aqui.
- **estrategista-de-conteudo-seo** (interno): E-E-A-T do `Person`/`Article` alimenta a rubrica de qualidade.
- **arquiteto-de-site** (interno): `BreadcrumbList` deriva da hierarquia da URL.
- **seo-local-e-mapas** (interno): `LocalBusiness` + subtipos + `PostalAddress`.
- **seo-ecommerce** (interno): `Product`/`Offer`/`Merchant Listings`.
- **analise-de-gap-de-conteudo** (interno): `ItemList`/`Product` de comparação.
- **Caliope** (saída): copy da página que sustenta o schema (não gera aqui).
- **VETO — método de validação:** nunca "não tem schema" via `web_fetch` em SPA.
  Só HTML server-rendered + Rich Results Test dão veredito.
- **VETO — tipo depreciado:** nunca recomendar geração nova para HowTo, FAQPage
  (para SERP), ClaimReview, EstimatedSalary, LearningVideo, SpecialAnnouncement,
  VehicleListing, Course Info carousel, Practice Problem, Dataset (rich result).

---
## Atribuição
Princípios extraídos de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-schema`
+ `references/deprecated-types-2024-2026.md` + `schema/templates.json` +
scripts `schema_generate.py`/`schema_ecommerce_validate.py`; licença MIT).
Reescrito em PT-BR para a Kolden, sem cópia literal. As datas de retirada e a
tabela de substituição vieram do anúncio oficial do Google Search Central
(jun/2025, jul/2025, mai/2026) e da documentação de FAQPage / HowTo /
Structured Data (developers.google.com/search).
