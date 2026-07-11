---
name: geo-citacoes-ia
description: >
  Mede e otimiza a PRESENÇA DA MARCA em respostas de LLMs — ChatGPT, Claude,
  Gemini, Perplexity, Google AI Overviews. Faz Lost Prompt Analysis (quais prompts
  deveriam citar a marca e não citam), monitora share of voice de IA por prompt,
  extrai padrões de prompt que ativam citação e desenha o backlog de conteúdo que
  fecha as lacunas. Use quando o pedido for "meu concorrente aparece no ChatGPT
  e eu não", "quero ser citado nas respostas de IA", "AEO", "GEO", "citações de
  LLM", "generative engine optimization", "share of voice de IA", "lost prompts"
  ou "por que Perplexity não me mostra". Complementa `aeo-foundations-architect`
  (infra) — aqui foca em MEDIÇÃO e conteúdo.
metadata:
  type: reference
tipo: skill
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
---

# GEO / Citações de IA — do "otimizado" ao "citado"

Ter site parse-friendly não basta. A IA precisa CITAR você quando um prompt-alvo
for feito. GEO (Generative Engine Optimization) é a disciplina de medir a taxa
de citação por prompt em cada superfície, achar os prompts perdidos e escrever
o conteúdo que fecha a lacuna.

## Antes de começar
Levante:
- **Marca-alvo** e 3-5 concorrentes diretos (para comparar SoV).
- **50-200 prompts semente** cobrindo:
  - Descoberta de categoria ("melhores agências de marketing para SaaS no Brasil")
  - Alternativas ("alternativas a HubSpot")
  - Comparação ("HubSpot vs Salesforce")
  - Compra-guia ("como escolher CRM")
  - Marca direta ("o que é a Kolden")
- **Superfícies a monitorar**: ChatGPT (web + mobile), Claude, Gemini, Perplexity,
  Google AIO, Copilot. Mínimo viável: ChatGPT + Perplexity.

## Loop de medição

1. **Coleta**: para cada prompt semente, rodar em cada superfície e capturar:
   - Resposta completa
   - Lista de citações (URLs)
   - Domínios citados
   - Marcas mencionadas (regex por lista)
2. **Classificação por prompt**:
   - **Cited** — marca aparece com link/citação
   - **Mentioned** — marca aparece no texto sem link
   - **Absent** — marca não aparece
   - **Lost** — concorrente citado, marca ausente (o pior)
3. **Métrica principal — Share of Voice de IA (SoV-AI)**:
   ```
   SoV-AI = citações da marca / total de citações de marcas na categoria
   ```
4. **Cadência**: semanal para top-20 prompts, mensal para long tail.

## Lost Prompt Analysis

**"Prompts perdidos"** são o oráculo de conteúdo mais barato que existe. Para cada
prompt onde a marca é `Lost`:

- **Que domínios apareceram?** Extrair top 3-5 fontes citadas naquela resposta.
- **Que formato de conteúdo?** Blog longo, comparação, review de terceiro, docs,
  reddit thread, YouTube transcript.
- **Que ângulo?** Definição, ranking, tabela, tutorial, case, opinião.
- **Que ganho de informação teria colocado a marca lá?** Dado próprio? Estudo
  novo? Comparação que ninguém fez? Opinião contrariada?

Isso vira briefing de conteúdo. Não faça mais "artigo genérico sobre X" — faça o
artigo que resolve exatamente o prompt perdido.

## Padrões de prompt que ativam citação

Analisando milhares de respostas 2025-2026, alguns padrões repetem:

| Padrão de prompt | O que a IA busca | Como você entra |
|---|---|---|
| "melhores X" / "top X" | Roundup com números, comparação, ranking recente | Publicar tabela comparativa com data explícita ("atualizado em 2026-06") |
| "alternativas a X" | Página `/alternativas-a-X` de concorrente | Criar página de comparação honesta |
| "X vs Y" | Tabela lado a lado, prós/contras | Comparação com matriz de features |
| "como escolher X" | Framework didático, checklist | Guia com critérios numerados |
| "o que é X" | Definição canônica curta | Primeira frase da página = definição perfeita |
| "X para [nicho]" | Case do próprio nicho | Case study específico do nicho |
| "preço de X" | Página de preços transparente | Preço público OU faixa clara |

## Otimização por padrão

- **Um-fato-por-parágrafo** — reforço da citation-worthy layer.
- **Frases curtas e citáveis** — 15-20 palavras. A IA extrai frases inteiras.
- **Números específicos com fonte** — "reduziu CAC em 34% em 60 dias" (com link
  para case). Genérico não cita.
- **Nome da marca dentro da frase citável** — não em rodapé de card, dentro da
  oração. "A Kolden reduz CAC via [método]" > "Reduzimos CAC via [método]".
- **FAQ com schema `FAQPage`** — pergunta = título, resposta = 40-100 palavras
  auto-suficientes. IA colhe.
- **Data de publicação + data de revisão visíveis** — a IA favorece "recent".
- **Freshness signals** — atualize datas quando houver mudança real; não faça
  "date-flip" cosmético.

## Cross-LLM: onde cada superfície difere

- **ChatGPT / OpenAI Search**: forte em fontes ranqueadas + Reddit + Wikipedia.
  Cita CTAs de compra quando "onde comprar X".
- **Claude**: menos citações inline por default; quando pede fonte, prefere
  publicadores editoriais e docs oficiais.
- **Gemini / AI Overviews**: alavanca fortíssima em domínios com histórico Google
  (site com bom SEO clássico entra mais).
- **Perplexity**: mais liberal em citar múltiplas fontes; melhor superfície para
  brand novo entrar; rewards para long-form + Reddit + YouTube.

**Estratégia por superfície:** priorize Perplexity + Gemini quando começar do
zero (barrier de entrada mais baixo); depois ataque ChatGPT (mais tráfego assistido).

## Ferramentas para medir (2026)

- **Nativo (open-source, soberania):** rodar prompts em API + regex de marca.
- **Firecrawl** para capturar respostas com citação renderizada.
- **Bright Data Search API** para AIO.
- **Terceiros (SaaS):** Otterly.ai, AthenaHQ, Peec.ai, Profound, Xfunnel — quando
  cliente pede painel pronto.

## Scorecard GEO (0-100)

| Bloco | Item | Peso |
|---|---|---|
| Medição | 50+ prompts semente definidos | 10 |
| Medição | ≥2 superfícies monitoradas semanalmente | 10 |
| Medição | Share of Voice calculado vs. 3 concorrentes | 10 |
| Análise | Lost Prompts identificados e priorizados | 15 |
| Conteúdo | ≥1 conteúdo por semana fechando Lost Prompt | 15 |
| Conteúdo | Formato bate padrão do prompt (roundup, definição, vs) | 10 |
| Conteúdo | Definição canônica no topo + FAQ schema | 10 |
| Conteúdo | Ganho de informação declarado (dado próprio, opinião) | 10 |
| Tracking | Referrer de IA rastreado em GA4 | 10 |

## Saída
1. **Painel de SoV-AI** por superfície + concorrente (baseline).
2. **Top 20 Lost Prompts** com briefing de conteúdo priorizado.
3. **Backlog editorial** de 4-8 semanas amarrado aos prompts.
4. **Cadência de re-medição** semanal e critério de vitória (SoV-AI ≥15% no vertical).

## Cruzamentos
- **`aeo-foundations-architect`** — obrigatório antes; sem infra não adianta escrever.
- **`agentic-search-webmcp`** — próximo nível quando produto exige AÇÃO por agente.
- **Caliope** — copy dos artigos que fecham Lost Prompts.
- **Argos** — social listening + monitor de Reddit onde a IA colhe.
- **Ariadne** — SEO clássico ainda alimenta Gemini/AIO; handoff no `e-e-a-t`.

---
**Procedência:** Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/marketing (IDs MKT-G7, G8, G9). Traduzido, reescrito em pt-BR; taxonomia de prompt patterns compilada de observação empírica de respostas ChatGPT/Perplexity/Gemini/Claude 2025-2026.
