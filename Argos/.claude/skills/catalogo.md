---
tipo: nota
area: Argos
up: "[[Argos/_MOC-argos]]"
---

# Catálogo de Habilidades — Argos

Índice das habilidades do squad Argos. Habilidades próprias vivem em `.claude/skills/<nome>/SKILL.md`;
as compartilhadas são resolvidas na raiz da Kolden ou no harness.

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| **argos-engine** | Coleta exige mais que tool nativa (anti-bot, crawl, JS pesado, DOM hostil, pesquisa LLM) | Como usar a fachada `motor/argos-engine.py` que roteia entre Scrapling/Scrapy/Crawlee/Skyvern/GPT-Researcher. REUSE primeiro. |
| **classificacao-tos** | Antes de coletar de qualquer plataforma com dúvida de permissão | Árvore de decisão VERDE/CINZA; CINZA só via `compliance-sentinela` com autorização humana. |
| **descoberta-de-virais** | "achar o que viralizou", vídeos virais do nicho/concorrente | SociaVault + Apify + TikTok Creative Center + YouTube Data API; saída com fonte+timestamp. Usada por `social-*` e `competitor-mapper`. |
| **transcricao-de-conteudo** | "transcreve esse vídeo", pegar a copy de um Reels/vídeo viral | yt-dlp baixa o áudio → Speechmatics (pt-BR) / Deepgram → handoff ao Caliope (ganchos/estrutura/CTA). |
| **retriever-sonar** | Busca/pesquisa web com citação nativa quando o ganho justificar usar vendor externo | Perplexity Sonar (search/ask/research/reason) como retriever opt-in ao lado de Exa/Tavily/Firecrawl. Vendor NÃO soberano — default continua soberano. |
| **extracao-defuddle** | Extrair markdown limpo de artigo/blog/doc estático, economizando tokens | Defuddle CLI (local) — web→markdown readability; alternativa leve ao Firecrawl/`web_extract`. Não serve para JS pesado/anti-bot/login. |
| **busca-semantica-no-acervo** | Fan-out de retrievers devolveu muitas fontes sobrepostas; ou "já pesquisamos isso?" | Busca híbrida (fuzzy ponderado + cosseno) para dedup + re-ranking do pool de fontes e recuperação de inteligência passada (registros/MEMORY). |
| **infisical-padrao** *(compartilhada — Caos)* | Qualquer acesso a credencial/segredo | Buscar credenciais via Infisical (MCP/API). Nunca segredo em texto puro (Art. VII). Path do squad: `/kolden/argos`. |
| **deep-research** *(compartilhada — harness)* | Pesquisa multi-fonte com verificação e citação | Fan-out de buscas, fetch de fontes, verificação adversarial, relatório citado. Usada pelo `research-synthesizer`. |
| **ritual-de-encerramento** *(compartilhada — Kolden)* | Fim de toda sessão com trabalho | Reflete, extrai lições e grava no `MEMORY.md` do squad. Disparada pelo reflexo Stop. |
