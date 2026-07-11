---
name: geo-ai-overviews-aprofundado
description: >
  Use para OTIMIZAR uma página/site para AI Overviews, AI Mode, ChatGPT search,
  Perplexity, Bing Copilot — Generative Engine Optimization (GEO) em profundidade.
  Cobre a posição oficial do Google ("GEO ainda é SEO"), o score de citabilidade
  por passagem (blocos 134-167 palavras), a divergência entre AI Mode (Gemini
  3.5 Flash, weakly ranking-correlated) e AI Overviews (strongly correlated),
  os canais por plataforma (Wikipedia+Reddit no ChatGPT, Reddit+Wikipedia no
  Perplexity), acesso de crawlers de IA no robots.txt, cadência de refresh que
  ganha citação (recente <3m ≈ 3x mais citado), e a árvore de mitos rejeitados
  pelo Google (llms.txt não é lever, chunking artificial, AI-rephrasing). É a
  camada operacional profunda do `otimizador-ai-seo`. Gatilhos: "AI Overviews",
  "AI Mode", "ChatGPT search", "Perplexity", "SGE", "GEO", "AEO", "LLMO",
  "aparecer em IA", "ser citado por IA", "llms.txt", "AI crawlers", "brand mention
  correlation", "passage citability". Copy final → Caliope.
tipo: skill
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
---

# GEO / AI Overviews em profundidade (jul/2026)

Aprofunda o `otimizador-ai-seo` com o método completo: métrica por métrica,
plataforma por plataforma, mito por mito. Não é "acena e reza" — é medição
de citabilidade + reforço estrutural + presença de entidade.

## 1. A posição do Google (fonte primária)

O Google publicou em Search Central que **otimizar para busca generativa continua
sendo SEO** — AEO/GEO/LLMO são rótulos rebrandeds da mesma disciplina. Toda
recomendação desta skill enquadra achados como **fundamentos de SEO aplicados a
superfícies de IA**, não como disciplina separada. Quando recomendação da
comunidade contradiz a fonte primária do Google, defer to Google e registre a
contradição no relatório.

**Mitos rejeitados pelo Google** (não recomendar como lever de ranqueamento em AI):
- `llms.txt` como fator — Mueller, Illyes e estudo SE Ranking (300k domínios) +
  auditoria OtterlyAI de server logs confirmam que **major AI search NÃO consulta
  `/llms.txt`**. Reporta presença por completude, sem peso de ranking.
- Chunking artificial (fatiar conteúdo em blocos de 500 palavras "para o LLM").
- AI-rephrasing (reescrever tudo em bullet para agradar o Gemini).
- Mention-farming (pagar por menção sem contexto).

O que **realmente** move: SEO bem-feito + estrutura citável + presença de entidade
distribuída + freshness + rendering server-side.

## 2. As métricas que importam (jul/2026)

| Métrica | Valor | Fonte |
|---|---|---|
| AI Overviews reach | 1,5 bi usuários/mês, 200+ países | Google |
| AI Overviews cobertura de query | 50%+ de todas as queries | dados de indústria |
| AI Mode MAU | 1B+ (ultrapassou em mai/2026) | Google |
| Modelo do AI Mode | Gemini 3.5 Flash (default, global, desde I/O 2026) | Google |
| Crescimento de sessões AI-referred | 527% (jan-mai/2025) | SparkToro |
| ChatGPT WAU | 900 milhões | OpenAI |
| Perplexity queries/mês | 500+ milhões | Perplexity |
| Ratio de citação AI vs backlink | menção de marca correlaciona **~3x mais** que backlinks | Ahrefs, dez/2025, 75k marcas |

**Duas engines de citação do Google, não uma.** AI Mode e AI Overviews chegam à
**mesma conclusão ~86% das vezes**, mas citam as **mesmas URLs só 13,7% das vezes**
(Ahrefs, 540k pares de queries). Tratar como **superfícies separadas** no score:
- **AI Overviews** — strongly ranking-correlated. Rankear bem em busca clássica
  alimenta AIO. 92% das citações vêm de páginas top-10.
- **AI Mode** — weakly ranking-correlated. Cita ~9 domínios/query (Ahrefs), com
  pool mais amplo além da posição 5 (47% das citações vêm de <top-5). Freshness
  e autoridade de entidade pesam mais que posição bruta.

## 3. Scorecard GEO (100 pontos)

### 3.1 Citabilidade por passagem (25%)

**Regra-ouro:** passagem citável = **134-167 palavras** self-contained, com fato
específico. **~44% das citações vêm dos primeiros 30% da página** (SE Ranking) —
front-load a resposta autônoma, não a esconda abaixo da dobra.

Sinais fortes:
- Frases claras e citáveis com fato/estatística específico.
- Blocos de resposta self-contained (extraíveis sem contexto).
- Resposta direta nos primeiros 40-60 words da seção.
- Claim atribuído com fonte específica.
- Definições no padrão "X é..." ou "X refere-se a...".
- Data point único não encontrado em outro lugar.

Sinais fracos: statements vagos; opinião sem evidência; conclusão soterrada;
sem data point específico.

### 3.2 Legibilidade estrutural (20%)

**92% das citações em AI Overviews vêm de páginas top-10**, mas 47% vêm de
posição <5 — o AI Mode olha diferente.

Sinais fortes: hierarquia H1→H2→H3 limpa; headings em pergunta (casam padrão
de query); parágrafos curtos (2-4 frases); tabela para dado comparativo; lista
ordenada/não-ordenada para passo-a-passo ou multi-item; FAQ em formato Q&A claro.

Sinais fracos: parede de texto sem estrutura; hierarquia inconsistente; sem
listas ou tabelas; informação soterrada em parágrafo.

### 3.3 Multi-modal (15%)

Conteúdo com elementos multi-modais tem **156% mais chance de ser selecionado**.
Checar: texto + imagem relevante; vídeo embed/link; infográfico/chart;
elemento interativo (calculadora/tool); structured data que sustenta a mídia.

### 3.4 Autoridade e sinais de marca (20%)

Sinais fortes:
- Byline com credencial + `Person` schema com `sameAs` para Wikipedia/LinkedIn/ORCID.
- **Recência** — conteúdo <3 meses é ~3x mais citado (SE Ranking, estudo de
  1,3M citações); páginas stale 6+ meses perdem elegibilidade.
- Citações a fonte primária (estudo, doc oficial, dado).
- Credencial + afiliação organizacional.
- Quotes de especialista com atribuição.
- Presença em Wikipedia, Wikidata.
- Menção em Reddit, YouTube, LinkedIn.

**Menção de marca > backlink** para citação em IA. Distribuir presença em
YouTube (correlação ~0.737 com AI citation), Reddit, Wikipedia, LinkedIn.

### 3.5 Acessibilidade técnica (20%)

**Crawlers de IA NÃO executam JavaScript.** SSR é crítico. Ver `render-js-e-spa`
para o pipeline de detecção. Checagens:
- Server-side rendering vs client-only.
- Acesso de crawler de IA no `robots.txt` (§4).
- Presença de `llms.txt` (reportar por completude, sem peso).
- RSL 1.0 licensing (novo padrão dez/2025).

## 4. Crawlers de IA — decisão de acesso

Antes de bloquear, decida a estratégia de visibilidade. Bloquear `GPTBot` não
impede o ChatGPT de citar via browsing (`ChatGPT-User`/`OAI-SearchBot`).

| Token | Dono | O que faz | Recomendação padrão |
|---|---|---|---|
| `GPTBot` | OpenAI | treino ChatGPT | permitir se aceita treinar; bloquear NÃO impede citação |
| `OAI-SearchBot` | OpenAI | search do ChatGPT/OpenAI | **permitir** para visibilidade em ChatGPT search |
| `ChatGPT-User` | OpenAI | browsing em tempo real do ChatGPT | **permitir** para ser citado ao vivo |
| `ClaudeBot` | Anthropic | treino + web features Claude | permitir se aceita |
| `anthropic-ai` | Anthropic | treino Claude | idem |
| `PerplexityBot` | Perplexity | search Perplexity | **permitir** — canal alto de citação |
| `Bytespider` | ByteDance | AI TikTok/Douyin | avaliar caso a caso |
| `cohere-ai` | Cohere | modelos Cohere | avaliar |
| `CCBot` | Common Crawl | training data (usado por vários labs) | permitir se open-web friendly |
| `Google-Extended` | Google | **treino Gemini apenas** — NÃO afeta AI Overviews/AI Mode nem busca | permitir se aceita; bloquear NÃO tira do AIO |

Regra: **AI Overviews e AI Mode usam `Googlebot`, não `Google-Extended`.**
Bloquear `Google-Extended` só afeta treino do Gemini — não te tira do AIO.

## 5. Otimização por plataforma

| Plataforma | Canais dominantes de citação | Foco |
|---|---|---|
| **Google AI Overviews** | fortemente correlacionado com ranking clássico | SEO tradicional + otimização por passagem; rankear top-10 |
| **Google AI Mode** (Gemini 3.5 Flash) | fracamente correlacionado; ~9 domínios/query, cita pool amplo | freshness, autoridade de entidade, passagens citáveis além da posição 5 |
| **ChatGPT** | Wikipedia (47,9%), Reddit (11,3%) | presença de entidade, fonte autoritativa, Person/Organization schema |
| **Perplexity** | Reddit (46,7%), Wikipedia | validação de comunidade, discussões |
| **Bing Copilot** | índice Bing, sites autoritativos | SEO Bing, IndexNow |

## 6. `llms.txt` — o que fazer (mesmo sem impacto de ranking)

Reportar presença por completude do audit; não atribuir peso de ranking. Se o
cliente pedir, gerar seguindo o padrão emergente:

```
# Nome do site
> Descrição em uma linha

## Seções principais
- [Título da página](https://[dominio]/pagina): Descrição concisa
- [Outra página](https://[dominio]/outra): Descrição

## Fatos-chave (opcional)
- Fato 1
- Fato 2
```

Local: `/llms.txt` na raiz do domínio.

## 7. RSL 1.0 (dezembro/2025)

Padrão para termos de licenciamento AI machine-readable. Backed por Reddit,
Yahoo, Medium, Quora, Cloudflare, Akamai, Creative Commons. Checar
implementação e recomendar termos apropriados quando o site tem política de
uso de conteúdo. **Ainda emergente** — reportar como oportunidade, não como
falha.

## 8. Workflow prático em 8 passos

1. **Renderizar** com pipeline SPA-aware (`render-js-e-spa`) — para ver o que
   o crawler de IA veria (sem JS).
2. **Score de citabilidade** — segmentar em passagens de 134-167 palavras;
   marcar quais são self-contained com fato/estatística. Calcular `citable_ratio`.
3. **Auditar estrutura** — heading hierarchy, question-based H2/H3, presença de
   tabela/lista, FAQ Q&A.
4. **Auditar autoridade** — byline, `Person` schema, `sameAs` para Wikipedia/
   LinkedIn/ORCID, `datePublished`/`dateModified` visíveis.
5. **Auditar frescor** — data de última atualização; conteúdo evergreen precisa
   de refresh <6 meses para manter elegibilidade em AI Mode.
6. **Auditar crawler access** — checar `robots.txt` para os 10 tokens de IA;
   confirmar SSR do conteúdo crítico.
7. **Auditar presença de marca** — busca em Wikipedia, Reddit (menções e comentários
   com âncora), YouTube (canal e menções), LinkedIn (perfis do time e da empresa),
   Wikidata (Q-ID da marca/pessoa).
8. **Score final + plano** — quick wins (§9) primeiro; médios; alto impacto por último.

## 9. Quick wins, médios e alta alavancagem

**Quick wins (dias):**
- Adicionar "O que é [tópico]?" nos primeiros 60 words.
- Criar blocos self-contained de 134-167 palavras.
- Adicionar H2/H3 em pergunta.
- Incluir estatística específica com fonte primária.
- Publicação/atualização visível.
- Implementar `Person` schema para autor.
- Permitir crawlers-chave no `robots.txt`.

**Médio esforço (semanas):**
- Criar `/llms.txt` (por completude).
- Bio de autor com credencial + link Wikipedia/LinkedIn.
- Garantir SSR do conteúdo crítico.
- Construir presença em Reddit e YouTube.
- Adicionar tabela comparativa com dado.
- Programa de refresh trimestral (recência).

**Alto impacto (meses):**
- Publicar research original / survey própria (única citabilidade).
- Construir presença em Wikipedia para marca/autores-chave.
- Canal no YouTube com menções da marca em contexto.
- Entity linking completo (`sameAs` distribuído).
- Ferramentas/calculadoras próprias (canal de citação por si só).

## 10. Saída padrão

```
GEO READINESS: XX/100
Por dimensão:
  Citabilidade por passagem    XX/25
  Legibilidade estrutural      XX/20
  Multi-modal                  XX/15
  Autoridade & marca           XX/20
  Acessibilidade técnica       XX/20
Por plataforma:
  Google AI Overviews          XX/100
  Google AI Mode               XX/100
  ChatGPT                      XX/100
  Perplexity                   XX/100
  Bing Copilot                 XX/100
Passagens citáveis identificadas: N blocos 134-167 palavras
Front-load: [primeiros 30% cobrem a resposta? sim/não]
Crawlers de IA: [permitidos / bloqueados / ausentes]
llms.txt: [presente / ausente]  RSL 1.0: [presente / ausente]
SSR do conteúdo crítico: [ok / falha (X% depende de JS)]
Presença de marca: [Wikipedia / Reddit / YouTube / LinkedIn / Wikidata]
Recência: [última atualização + tempo desde]
Top 5 mudanças de maior impacto: [lista]
```

## Handoffs e regras Kolden

- **otimizador-ai-seo** (dono): esta skill é a camada aprofundada dele.
- **estrategista-de-conteudo-seo** (interno): E-E-A-T e front-load na copy.
- **engenheiro-de-schema-executavel** (interno): `Person`/`Organization`/`Article`
  com `sameAs` para entity graph.
- **render-js-e-spa** (interno): captura do estado que o crawler de IA veria.
- **qualidade-de-conteudo-eeat** (irmã): auditoria da bio e do gap de citação.
- **Argos** (entrada): social listening de menções (YouTube/Reddit/LinkedIn/Wikipedia).
- **Caliope** (saída): reescrita das passagens 134-167 palavras.
- **Metis** (saída): medição de tráfego AI-referred pós-otimização.
- **VETO — não vender `llms.txt` como lever de ranqueamento em AI** (fonte primária
  do Google rejeita); reporte por completude.
- **VETO — não recomendar chunking artificial, AI-rephrasing ou mention-farming**
  (mitos rejeitados pelo Google).

---
## Atribuição
Princípios extraídos de `AgriciDaniel/claude-seo@d830cdb` (skill `seo-geo`,
autor AgriciDaniel; `references/google-ai-optimization-guide.md` e
`references/llmstxt-evidence.md`; licença MIT). Estatísticas de plataforma:
Google Search Central (AI Overviews reach, AI Mode); SparkToro (crescimento
AI-referred); Ahrefs dez/2025 (75k marcas — brand mention correlation) e
Ahrefs (540k pares AI Mode × AIO); SE Ranking (front-load 30% + estudo de
recência 1,3M citações); Mueller + Illyes + auditoria OtterlyAI (llms.txt).
Reescrito em PT-BR para a Kolden, sem cópia literal.
