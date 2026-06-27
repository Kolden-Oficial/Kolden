---
name: brief-de-conteudo-data-driven
description: >
  Use para GERAR um brief de conteúdo competitivo e fundamentado em SERP — a entrega
  que faz o redator produzir uma página capaz de superar quem já ranqueia. Cobre os dois
  modos (nova página vs. melhorar existente), scoring de concorrente, três tipos de gap
  (tópico/profundidade/qualidade), ganho de informação obrigatório, densidade/colocação de
  keyword, templates por tipo de página e regra de relevância ao site. Gatilhos: "brief de
  conteúdo", "content brief", "outline de conteúdo", "brief de blog/serviço", "plano de
  conteúdo", "outline para", "melhorar página existente". É o gerador de briefing que o
  estrategista-de-conteudo-seo entrega — a copy final é handoff ao Caliope.
---

# Brief de Conteúdo Data-Driven

Gera briefs ancorados em SERP: análise de concorrente com scoring de gap, contagem de palavras
por seção, regras de colocação de keyword e templates por tipo de página. **Entrega briefing e
estrutura, nunca a copy** (handoff Caliope). Volume/dificuldade só com ferramenta provisionada
ou handoff Argos — sem isso, é hipótese rotulada.

## Processo

### 1. Modo do brief
- **Melhorar (URL existente):** busque o conteúdo/estrutura atual; identifique o que já é forte
  (manter), o que está ausente/raso/desatualizado (adicionar). Separe "manter/reforçar" de "novo"
  no outline. Não recomende rewrite total quando melhorias cirúrgicas vencem.
- **Nova página (keyword/tópico, sem URL):** use homepage/sitemap do site só para contexto de
  negócio; construa do zero focando nos gaps que a nova página pode preencher.

### 2. Contexto do site
Busque a URL-alvo/homepage (entender o negócio) e o **sitemap** (descobrir páginas, categorias e
serviços que existem). É a base das duas regras críticas abaixo.

### 3. Analisar a SERP
- Identifique os 5 primeiros que ranqueiam para a keyword-alvo.
- **Filtre não-concorrentes** (Wikipedia, Reddit, Amazon, YouTube, .gov/.edu, diretórios, sites de
  ferramenta SEO etc.) — lista completa em `references/dominios-excluidos.md`.
- Pontue cada concorrente real: Profundidade (1-10), Formatação (1-10), SEO (1-10), UX (1-10) → /40.
- Três tipos de gap: **tópico** (subtemas que ninguém cobre), **profundidade** (coberto mas raso),
  **qualidade** (desatualizado, sem perspectiva de especialista, formatação ruim).
- Prioridade do gap: `Impacto × Vantagem competitiva / Esforço`.

### 4. Classificar a intenção
Informacional (aprender) · Comercial (pesquisar antes de comprar) · Transacional (pronto para agir) ·
Navegacional (procura site/página específicos). Identifique o **formato que a SERP premia**: guia
long-form, listicle, tabela comparativa, landing, FAQ, vídeo, local pack. Página de produto não
ranqueia query informacional, e vice-versa.

### 5. Montar o brief
Aplique o template do tipo de página (`references/templates-por-tipo-de-pagina.md`) e customize por
gaps e intenção.

## Regras críticas

- **Relevância ao site:** todo heading, subtema, keyword e FAQ sugerido DEVE ser algo que o site
  consegue escrever de forma crível pelos serviços/produtos reais que oferece. Antes de cada sugestão:
  "este site entrega esse conteúdo?" Se não, remova. Não copie a estrutura do concorrente se ela cobre
  o que o site não faz.
- **Cobertura da estrutura do site:** em página hub/categoria/"tipos de", o outline DEVE referenciar
  cada categoria/serviço/sub-página relevante que existe no site (uma seção + sugestão de link interno
  por categoria). Não invente categoria que não existe nem omita as que existem. Em página não-hub
  (serviço único, post), use a estrutura só para sugerir links internos reais.
- **Linguagem da saída:** nunca cite nomes de pesquisador, framework ou ferramenta na saída ("método
  X", "fórmula Y"). São ferramentas internas de raciocínio. Escreva para dono de negócio/redator, não
  para acadêmico de SEO.

## Densidade e colocação de keyword
Regras completas em `references/densidade-de-keyword.md`. Resumo: densidade da primária **0,5%-2,0%**
(acima de 3% = risco de stuffing); as 2 primeiras menções carregam o maior peso. A primária DEVE
aparecer em: title (início), H1 (início), slug, meta description, primeiros 100 palavras, ao menos 1
alt de imagem. NÃO precisa em todo H2/H3 nem todo parágrafo. Secundárias: 5-8 termos próximos + 10-15
semânticos amplos; sinônimos melhoram leitura e NÃO contam para densidade. **Por seção**, especifique:
qual keyword vai no heading e se o corpo usa a primária ou variação.

## Meta tags
- **Title:** 50-60 caracteres (nunca <50 nem >60); primária no início, marca no fim (pipe/dash como o
  padrão do site); liderar com resultado/número/especificidade.
- **Meta description:** 130-150 caracteres; voz ativa, expande o title com USPs; termina em CTA; sem
  marca no fim (já está no title); sem aspas (Google trunca em aspas).

## Ganho de informação (inegociável)
Todo brief especifica EXATAMENTE qual valor novo o conteúdo adiciona que nenhuma página do top atual
oferece. Específico: dado proprietário/pesquisa original, estudo de caso com resultado real, citação de
especialista/experiência de primeira mão, síntese ou framework original. **NUNCA** "mais detalhe" ou
"formatação melhor".

## Saída
```
## Brief de Conteúdo: [Keyword]
### Intenção de busca   [tipo + formato que a SERP premia + público/nível — 3-4 linhas]
### Análise de concorrentes   | # | URL | H2 principais | ~palavras | Nota /40 | Gap principal |
### Gaps e oportunidades   [tópico / profundidade / qualidade com especificidade]
### Outline vencedor
  **H1:** … **Slug:** /… **Alvo de palavras:** ~X (média concorrente ~X)
  [outline H2/H3 com: palavras por seção, formato (lista/tabela/box de definição), alvos de Featured
   Snippet marcados "FS target", orientação de keyword por seção]
### Meta tags   **Title** (≤60) … **Meta** (≤150) …
### Ângulo único / ganho de informação   [parágrafo específico]
### Requisitos de E-E-A-T   [sinais de confiança exatos — ver skill qualidade-de-conteudo-eeat]
### Links internos   [3-5 sugestões com âncora + URL-alvo, do sitemap real]
```
**Modo só-outline** ("só um outline"): pule concorrentes, gaps, ganho de informação e E-E-A-T;
entregue só H1/slug/alvo de palavras + outline com nota de escrita de 1-2 frases por seção.

## Handoffs e regras Kolden
- **Argos** (entrada): SERP, volume, dificuldade, concorrência — não duplicar coleta.
- **Caliope** (saída): a redação persuasiva final a partir do briefing.
- **qualidade-de-conteudo-eeat** (irmã): detalha os requisitos de E-E-A-T do brief.
- **engenheiro-de-schema** (interno): JSON-LD dos tipos indicados no template.
- Sem ferramenta de volume/dificuldade → rotular "não disponível — hipótese".

---
## Atribuição
Princípios extraídos de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-content-brief`, autor original
puneetindersingh; references de templates/keyword-density/excluded-domains; licença MIT). Reescrito em
PT-BR para a Kolden, sem cópia literal.
