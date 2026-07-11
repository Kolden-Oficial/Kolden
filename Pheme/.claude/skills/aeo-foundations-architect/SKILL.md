---
name: aeo-foundations-architect
description: >
  Constrói a INFRAESTRUTURA DE DESCOBERTA PARA IA de um site — o que fazer para
  que ChatGPT, Claude, Gemini e Perplexity leiam, entendam e citem a marca. Cobre
  `llms.txt` (índice curado), `robots.txt` para crawlers de IA (GPTBot, ClaudeBot,
  CCBot, Perplexity-Bot, Google-Extended, Applebot-Extended), tiers de renderização
  (Markdown puro / SSR / híbrido) e um scorecard em 3 camadas: parse-friendly →
  citation-worthy → traceable. Use quando o pedido for "aparecer nas respostas do
  ChatGPT", "otimizar para LLM", "llms.txt", "AI crawlers", "AEO", "arquitetura de
  descoberta para IA" ou "meu site está bloqueando os robôs de IA?". NÃO é keyword
  SEO clássico (isso é Ariadne) — aqui o "leitor" é a IA, não o buscador de dez
  links azuis.
metadata:
  type: reference
tipo: skill
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
---

# AEO Foundations Architect — infra para a IA achar, ler e citar

Descoberta na era da IA é diferente de SEO clássico. O buscador clássico rankeia
dez links; a IA responde uma pergunta e cita 1-3 fontes. Se o seu site não é
parse-friendly, citation-worthy e traceable, você não entra na resposta.

## Antes de começar
Levante:
- **Domínio-alvo** e stack (SSG/SSR/SPA — muda o tier).
- **`robots.txt` atual** e presença de `llms.txt` / `llms-full.txt`.
- **Política de conteúdo**: a marca aceita ser treinada? Cita e não treina? Nega tudo?
- **Superfícies-alvo**: ChatGPT, Claude, Gemini, Perplexity, Google AIO — as quatro superfícies com AI crawlers públicos declarados.

## Camada 1 — Parse-friendly (a IA consegue ler?)

**Regra de ouro:** conteúdo essencial precisa estar no HTML servido, sem depender
de JS. Se o crawler de IA precisar de headless browser, você está fora.

- **HTML semântico:** `<article>`, `<h1>` único e verdadeiro, hierarquia
  `<h1>→<h2>→<h3>` respeitada, listas semânticas.
- **Tier de renderização:**
  - **Tier 1 (Markdown puro / SSG):** ideal — Astro, Hugo, MDX renderizado. IA recebe
    conteúdo cru, sem interpretar.
  - **Tier 2 (SSR híbrido):** aceitável — Next.js/Remix/Nuxt com pre-render.
    Confirmar que a rota-alvo é SSR ou ISR, não CSR puro.
  - **Tier 3 (SPA / CSR):** hostil — content-heavy em SPA sem prerender fica invisível
    para a maioria dos crawlers de IA. Refatorar OU adicionar rota `/text/{slug}` em Markdown.
- **`llms.txt` (o "sitemap curado para IA"):** arquivo Markdown na raiz que lista
  em H2/H3 as páginas mais importantes com link + descrição de 1 linha. É a
  "vitrine" que a IA usa quando quer entrar em um domínio novo. Exemplo mínimo:

  ```markdown
  # Nome da Marca
  > Frase que explica o que a marca faz em 1 linha.

  ## Produtos
  - [Produto X](https://exemplo.com/produto-x): o que é em 1 linha

  ## Documentação
  - [Guia inicial](https://exemplo.com/docs/inicio): o que ensina
  ```

- **`llms-full.txt` (opcional):** versão expandida com o corpo em texto puro das
  páginas listadas. Útil para docs técnicas.

## Camada 2 — Citation-worthy (a IA quer citar?)

A IA cita quando o conteúdo é: **específico, primário, atribuível e reciclável em
uma frase de resposta**.

- **Um fato/afirmação principal por parágrafo** — não empilhe 4 argumentos numa
  frase; a IA extrai fragmentos curtos.
- **Números e datas explícitos** — "18% em 2026" bate "quase 20% recentemente".
- **Autoria visível** — nome do autor, data de publicação e data da última revisão
  no topo. Cita-se quem assina.
- **Definição no início da página** — em landing pages ou glossários, a primeira
  frase é a definição canônica ("X é Y que faz Z"). Bate direto no snippet de resposta.
- **Fontes primárias linkadas** — se você é primário (dado próprio, estudo próprio),
  torne isso óbvio. Se é secundário, cite o primário para ganhar reciprocidade.

## Camada 3 — Traceable (a IA consegue trazer o usuário de volta?)

- **URLs estáveis e legíveis** — sem hash routing, sem `?id=42`. `/artigo/nome-do-artigo`.
- **Schema.org** (JSON-LD): `Article`, `Product`, `FAQPage`, `HowTo`, `Organization`,
  `Person`. É o que a IA usa para amarrar entidade↔página.
- **OpenGraph completo** — `og:title`, `og:description`, `og:image` — a IA usa esses
  campos para renderizar o card de citação.
- **Sitemap XML** submetido a Search Console + linkado no `robots.txt`.
- **Rastreamento de referrer de IA** — configure UTM ou análise de `Referer` para
  distinguir tráfego vindo de `chat.openai.com`, `perplexity.ai`, `gemini.google.com`,
  `copilot.microsoft.com`. É o único jeito de medir tráfego assistido por IA hoje.

## `robots.txt` para AI crawlers — matriz de decisão

Cada bot de IA tem duas ações separadas: **crawl** (ler a página) e **train** (usar
para treinar). Alguns são unificados; outros têm um bot separado para treino.

| Bot | User-Agent | Uso | Como negar treino sem negar citação |
|---|---|---|---|
| ChatGPT (usuário) | `ChatGPT-User` | Fetch on-demand para responder | (não bloquear se quiser aparecer) |
| OpenAI (treino) | `GPTBot` | Treino de modelo | `Disallow: /` para GPTBot |
| OAI Search | `OAI-SearchBot` | Índice de busca do ChatGPT | (permitir se quiser aparecer) |
| Anthropic Claude (usuário) | `Claude-User` | Fetch on-demand por prompt | (permitir para citação) |
| Anthropic Claude (treino) | `ClaudeBot` | Treino / dataset | `Disallow: /` para ClaudeBot |
| Common Crawl | `CCBot` | Dataset público | `Disallow: /` para CCBot |
| Perplexity | `PerplexityBot` | Índice + fetch | Permitir para citação |
| Google-Extended | `Google-Extended` | Treino Gemini | `Disallow: /` (não afeta ranqueamento no Google Search) |
| Applebot-Extended | `Applebot-Extended` | Treino Apple Intelligence | `Disallow: /` (não afeta busca Apple) |

**Perfil "quero aparecer, não quero treinar":**
```
User-agent: GPTBot
Disallow: /
User-agent: ClaudeBot
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: Google-Extended
Disallow: /
User-agent: Applebot-Extended
Disallow: /

User-agent: ChatGPT-User
Allow: /
User-agent: Claude-User
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /

# Sitemap e llms.txt
Sitemap: https://exemplo.com/sitemap.xml
```

## Scorecard AEO (0-100)

| Camada | Item | Peso |
|---|---|---|
| Parse | HTML semântico + hierarquia H | 10 |
| Parse | Tier ≤2 na rota-alvo | 15 |
| Parse | `llms.txt` publicado e curado | 10 |
| Citation | Definição canônica no topo | 10 |
| Citation | Um-fato-por-parágrafo | 10 |
| Citation | Autor + data + revisão | 5 |
| Citation | Números/datas explícitos | 5 |
| Trace | URLs limpas + schema.org | 10 |
| Trace | OpenGraph completo | 5 |
| Trace | Sitemap XML + `robots.txt` explícito | 10 |
| Trace | Rastreamento de referrer de IA | 10 |

<7 em qualquer camada = refatorar antes de partir para GEO/citações.

## Saída
1. **Diagnóstico:** scorecard 0-100 por camada + top 3 bloqueios.
2. **Plano de execução** em ordem: `robots.txt` → `llms.txt` → refactor de tier
   (se necessário) → schema.org → medição.
3. **Snippets prontos** para colar (robots.txt, llms.txt esqueleto, JSON-LD por
   tipo de página).

## Cruzamentos
- **`geo-citacoes-ia`** — mede se depois de tudo isso a marca ESTÁ sendo citada e por qual prompt.
- **`agentic-search-webmcp`** — nível seguinte: além de ler, permitir que o agente AJA no site.
- **Ariadne** — SEO clássico continua obrigatório; AEO é camada COMPLEMENTAR, não substituta.
- **Infisical** — qualquer chave de API de monitoramento (Bright Data, Similarweb) via `infisical-padrao`.

---
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (IDs MKT-G1, G2, G3). Traduzido, reescrito em pt-BR; tabela de bots atualizada com user-agents publicados em 2026 (OpenAI, Anthropic, Common Crawl, Perplexity, Google, Apple).
