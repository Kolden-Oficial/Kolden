---
name: tech-search
description: |
  Pesquisa técnica aprofundada e autocontida. WebSearch + WebFetch + workers Haiku.
  Pipeline: Query > Decompose > Parallel Search (Haiku) > Evaluate > Synthesize > Document.
  Zero dependências externas. MCPs opcionais.
  Salva em docs/research/{YYYY-MM-DD}-{slug}/.
---

# Tech Search

Pipeline de pesquisa aprofundada e autocontida. Zero dependências externas.

## Início Rápido

```
/tech-search "React Server Components vs Client Components"
```

## Ativação

1. Faça o parse da query a partir de `$ARGUMENTS` (ou pergunte se não for fornecida)
2. Execute o fluxo de trabalho de 6 fases
3. Salve em `docs/research/{YYYY-MM-DD}-{slug}/`

**CRÍTICO:**
- NUNCA implemente código. Redirecione para @pm ou @dev.
- NUNCA escreva arquivos fora de `docs/research/`.

---

## DEFINIÇÃO DA SKILL

```yaml
skill:
  name: Tech Search
  id: tech-search

veto_conditions:
  - id: VETO_NO_RESULTS
    trigger: "ALL search waves return 0 results"
    action: "STOP + Report: 'No results found. Reformulate query or check connectivity.'"

  - id: VETO_IMPLEMENTATION_REQUEST
    trigger: "User asks to implement, code, create agent/skill, or deploy"
    action: "REDIRECT: 'Implementation is not my scope. Use @pm for prioritization or @dev for execution.'"
    keywords:
      - "implementa"
      - "cria o agent"
      - "cria a skill"
      - "faz o codigo"
      - "escreve o codigo"
      - "desenvolve"
      - "deploy"
      - "implement"
      - "build this"
      - "code this"

  - id: VETO_FORBIDDEN_PATH
    trigger: "Attempt to write outside docs/research/"
    action: "BLOCK + Error: 'Writing outside docs/research/ is forbidden.'"

constraints:
  forbidden_actions:
    - NEVER implement code, agents, skills, or production artifacts
    - NEVER create files outside docs/research/
    - NEVER write to .claude/agents/, .claude/skills/, squads/, app/, lib/

tool_hierarchy:
  search:
    1_preferred: "Exa MCP (mcp__exa__web_search_exa) - if available"
    2_fallback: "WebSearch (always available)"
    detection: "Try Exa first. If 401/429/503, set exa_available=false, use WebSearch."

  docs:
    1_preferred: "Context7 MCP (mcp__context7__resolve-library-id + query-docs) - if available"
    2_fallback: "WebSearch with 'site:{library}.dev docs' or 'site:{library}.io docs'"
    detection: "Try Context7 first. If fails, set context7_available=false."

  deep_read:
    only: "WebFetch with prompts/page-extract.md prompt"
    note: "No ETL, no Bash, no external scripts. Pure WebFetch."

  workers:
    type: "general-purpose"
    model: "haiku"
    max_parallel: 5
    max_deep_reads_per_worker: 3

workflow:
  phases:

    # ──────────────────────────────────────────────
    # FASE 1: AUTO-CLARIFY
    # ──────────────────────────────────────────────
    1_auto_clarify:
      name: "Auto-Clarification"
      model_tier: "MAIN MODEL (inline)"
      description: |
        Correspondência de padrões + detecção de tecnologia na query do usuário.
        Determina se a clarificação é necessária ou pode ser pulada.

      execution: |
        1. Leia a query do usuário (texto original, sem modificação)

        2. CORRESPONDÊNCIA DE PADRÕES (case-insensitive):
           - Palavras-chave técnicas: "code", "implement", "how to", "api", "bug",
             "error", "debug", "library", "sdk", "tutorial", "example"
             → inferred_context.focus = "technical"
           - Palavras-chave de comparação: "compare", "vs", "versus", "difference",
             "better", "alternative", "tradeoff", "pros and cons"
             → inferred_context.focus = "comparison"
           - Palavras-chave de recência: "latest", "new", "2024", "2025", "2026",
             "recent", "state of the art", "trending"
             → inferred_context.temporal = "recent"
             → Anexe o ano atual às queries de busca

        3. DETECÇÃO DE TECNOLOGIA (case-insensitive):
           Faça a varredura por tecnologias conhecidas:
           - Linguagens: JavaScript/JS, TypeScript/TS, Python, Java, Go, Rust, C#, Ruby, PHP
           - Frameworks: React, Next.js, Vue, Angular, Svelte, Express, FastAPI, Django, Flask
           - Bancos de dados: PostgreSQL, MySQL, MongoDB, Redis, Supabase, Firebase, Elasticsearch
           - IA/ML: LLM, RAG, LangChain, OpenAI, Claude, Anthropic, TensorFlow, PyTorch
           - Infra: Docker, Kubernetes, AWS, Vercel, GraphQL, REST, WebSocket
           → Reúna em inferred_context.domain = [list]

        4. DECISÃO:
           - SE qualquer padrão OU tecnologia for detectado → pule a clarificação
           - SE nada for detectado → faça UMA pergunta:
             "Sua query parece ampla. Qual é o foco e o contexto técnico?"

      output: "inferred_context object {focus, temporal, domain, skip_clarification}"

    # ──────────────────────────────────────────────
    # FASE 2: DECOMPOSE
    # ──────────────────────────────────────────────
    2_decompose:
      name: "Query Decomposition"
      model_tier: "MAIN MODEL"
      description: |
        Decompõe a query do usuário em 5-7 sub-queries atômicas e diretamente pesquisáveis.
        Usa extended thinking para uma análise mais profunda.

      execution: |
        ultrathink

        1. ANÁLISE PROFUNDA (use extended thinking):
           - Quais são as questões REAIS por trás desta query?
           - O que um especialista de domínio gostaria de saber?
           - Quais lacunas as buscas padrão poderiam deixar passar?
           - Quais premissas devem ser testadas?

        2. GERE 5-7 sub-queries que:
           - Cubram ângulos ORTOGONAIS (sem sobreposição)
           - Incluam pelo menos uma query de "advogado do diabo"
           - Incluam pelo menos uma query de "nível especialista"
           - Sejam diretamente pesquisáveis (não abstratas)

        3. INCORPORE o inferred_context:
           - Se focus=comparison → garanta que as queries cubram ambos/todos os lados
           - Se temporal=recent → adicione restrições de ano
           - Se domain for detectado → restrinja as queries a essas tecnologias

        4. FORMATO de SAÍDA:
           {
             "main_topic": "string",
             "sub_queries": ["query1", "query2", ...],
             "search_strategy": "parallel"
           }

      output: "decomposition_result JSON"

    # ──────────────────────────────────────────────
    # FASE 3: PARALLEL SEARCH (Workers Haiku)
    # ──────────────────────────────────────────────
    3_parallel_search:
      name: "Parallel Search via Haiku Workers"
      model_tier: "HAIKU (via Task tool, general-purpose agent)"
      description: |
        Despacha as sub-queries como workers Haiku em paralelo.
        Cada worker: WebSearch → seleciona as melhores URLs → WebFetch nas melhores → retorna JSON.
        Máximo de 5 workers em paralelo. Sem dependências externas.

      execution: |
        1. PRÉ-VERIFICAÇÃO DE DISPONIBILIDADE DE MCP (main model, antes do despacho):
           - Tente Context7: mcp__context7__resolve-library-id para a library detectada
             → Se falhar: context7_available = false
           - Tente Exa: mcp__exa__web_search_exa("test", 1)
             → Se 401/429/503: exa_available = false

        2. DESPACHE OS WORKERS:
           Para CADA sub-query, crie uma chamada Task:

           Task(
             subagent_type: "general-purpose",
             model: "haiku",
             prompt: <WORKER_PROMPT>
           )

           Despache TODAS as chamadas Task em uma ÚNICA mensagem para execução paralela.
           Máximo de 5 workers.

           TEMPLATE DO PROMPT DO WORKER:
           ```
           You are a research worker. Search and extract information for ONE specific query.

           QUERY: {sub_query}
           CONTEXT: {inferred_context_json}
           MCP AVAILABILITY: exa={exa_available}, context7={context7_available}

           INSTRUCTIONS:
           1. Search using the best available tool:
              - If context7 available AND query is about a specific library:
                → Use mcp__context7__resolve-library-id then mcp__context7__query-docs
              - If exa available:
                → Use mcp__exa__web_search_exa(query, numResults=5)
              - Else:
                → Use WebSearch(query)

           2. From search results, select top 2-3 most relevant URLs

           3. Deep-read top 1-3 results using WebFetch:
              - For each URL, use WebFetch with this prompt:
                "Extract technical information relevant to: {sub_query}
                 Focus on: specific facts/numbers/benchmarks, code examples (preserve exactly),
                 best practices and warnings, expert recommendations.
                 Skip: navigation, ads, generic intros.
                 Format as structured markdown with Key Findings, Code/Examples,
                 Expert Quotes, and Actionable Insights sections."

           4. Return results as JSON (no other text):
              {
                "sub_query": "the original sub-query",
                "sources": [
                  {"url": "...", "title": "...", "snippet": "first 200 chars...",
                   "credibility": "HIGH|MEDIUM|LOW", "tool_used": "WebSearch|Exa|Context7"}
                ],
                "key_findings": ["finding1 with specific data", "finding2", ...],
                "code_examples": ["```lang\ncode\n```", ...],
                "expert_quotes": ["quote — author", ...]
              }

           IMPORTANT:
           - Do NOT synthesize or write reports. Just search and return raw findings.
           - Be HONEST about credibility (LOW if source is generic/outdated).
           - Preserve code examples EXACTLY as found.
           - Max 3 deep reads per worker.
           ```

        3. AGREGUE OS RESULTADOS (main model):
           - Colete todas as respostas dos workers
           - Faça o parse do JSON de cada resultado de Task
           - Deduplique por URL (mantenha a maior credibilidade)
           - Construa resultados unificados com atribuição da ferramenta

        4. TRATE AS FALHAS:
           - Para workers que falharam (sem resposta ou JSON inválido):
             → Registre um warning, execute essa sub-query diretamente no contexto principal
           - REGRA: pelo menos 1 resultado bem-sucedido para prosseguir

      output: |
        {
          "search_results": [...],
          "tools_used": {"exa": N, "context7": N, "websearch": N, "webfetch": N},
          "worker_stats": {"dispatched": N, "succeeded": N, "failed": N}
        }

    # ──────────────────────────────────────────────
    # FASE 4: EVALUATE COVERAGE
    # ──────────────────────────────────────────────
    4_evaluate_coverage:
      name: "Coverage Evaluation"
      model_tier: "HAIKU (via Task tool)"
      description: |
        Avalia se a pesquisa está completa. Decide CONTINUE ou STOP.
        Máximo de 2 waves no total (mais simples que as 3 waves do tech-research).

      execution: |
        Encapsule em Task(model: "haiku"):

        1. Calcule as métricas:
           - coverage_score (0-100): Quão bem os achados respondem à query original?
           - source_quality: Conte as fontes com credibilidade HIGH/MEDIUM/LOW
           - new_info_ratio: Estime fatos únicos vs total

        2. REGRAS DE PARADA:
           HARD STOPS (sempre para):
           - wave >= 2 → "Max iterations reached"
           - coverage_score >= 80 AND high_credibility >= 3 → "Sufficient coverage"

           SOFT STOP:
           - coverage_score >= 65 AND wave >= 1 → "Acceptable coverage"

           MUST CONTINUE:
           - coverage_score < 50 AND wave == 1 → "Insufficient first wave"

        3. SE CONTINUE:
           - Gere 2-3 queries direcionadas para preencher lacunas
           - Volte para a Fase 3 (busque novamente com as novas queries)

        4. SE STOP:
           - Documente a pontuação final e as lacunas remanescentes

      output: |
        {
          "decision": "CONTINUE|STOP",
          "coverage_score": 0-100,
          "stop_reason": "reason",
          "gaps": [...],
          "next_queries": [...] (if CONTINUE)
        }

    # ──────────────────────────────────────────────
    # FASE 5: SYNTHESIZE
    # ──────────────────────────────────────────────
    5_synthesize:
      name: "Synthesize"
      model_tier: "MAIN MODEL"
      description: |
        Consolida todos os achados em um relatório de pesquisa abrangente.
        Produz APENAS DOCUMENTAÇÃO, nunca código de produção.

      execution: |
        1. Revise todos os resultados de busca agregados e os achados
        2. Identifique padrões, consenso e contradições entre as fontes
        3. Classifique técnicas/soluções pela força das evidências
        4. Gere:
           - Resumo executivo (TL;DR)
           - Achados detalhados organizados por tema
           - Exemplos de código apenas para REFERÊNCIA (não para produção)
           - Matriz de decisão: quando usar o quê
           - Próximos passos práticos recomendando @pm ou @dev
        5. SEMPRE termine com a seção "Próximos Passos" redirecionando para os agentes de implementação

      output: "Conteúdo do relatório sintetizado"

    # ──────────────────────────────────────────────
    # FASE 6: DOCUMENT
    # ──────────────────────────────────────────────
    6_document:
      name: "Document"
      model_tier: "MAIN MODEL"
      description: "Salvar a pesquisa completa em docs/research/"
      structure:
        folder: "docs/research/{YYYY-MM-DD}-{slug}/"
        files:
          - name: "README.md"
            content: "Índice + TL;DR"
          - name: "00-query-original.md"
            content: "Pergunta original + contexto inferido"
          - name: "01-deep-research-prompt.md"
            content: "Prompt estruturado gerado com sub-queries"
          - name: "02-research-report.md"
            content: "Achados completos da pesquisa"
          - name: "03-recommendations.md"
            content: "Recomendações e próximos passos (SEM código de produção)"

security:
  - Never include API keys or secrets in research docs
  - Sanitize sensitive paths before saving
  - Validate URLs before fetching
  - NEVER write files outside docs/research/
  - NEVER create agents, skills, or production code

scope_boundaries:
  allowed_paths:
    - "docs/research/**"
  forbidden_paths:
    - ".claude/agents/"
    - ".claude/skills/"
    - "squads/"
    - "app/"
    - "lib/"
    - "src/"
    - "*.ts"
    - "*.tsx"
    - "*.js"
    - "*.py"
  exception: "Code examples within docs/research/ markdown are allowed for DOCUMENTATION only"
```

---

## Fluxo de Execução

```
Query → Auto-Clarify → Decompose (ultrathink, MAIN MODEL)
                              |
              [Sub-query 1]  [Sub-query 2]  ... [Sub-query 5]
                   |              |                   |
              [Haiku GP]     [Haiku GP]          [Haiku GP]
              (search+read)  (search+read)       (search+read)
                   |              |                   |
                   +------+-------+-------+-----------+
                          |
                    Aggregate (MAIN MODEL)
                          |
                    Evaluate Coverage (HAIKU)
                          |
                    (cobertura OK?) ── NÃO ──→ [Wave 2, máx 2 no total]
                          | SIM
                          |
                    Synthesize (MAIN MODEL)
                          |
                    Document (MAIN MODEL)
```

## O Que Esta Skill NÃO Possui

- Sem dependência de serviço de ETL
- Sem referências a infrastructure/
- Sem referências a squads/
- Sem comandos Bash
- Sem agentes customizados (usa o general-purpose nativo)
- Sem scripts Python/JS
- Sem dependências npm
- Sem compressão de wave (máx 2 waves, o contexto é suficiente)
- Sem verificação de citações (simplifica sem perda de qualidade)
- Sem comportamento de follow-up (rode novamente para mais pesquisa)
- Sem BlogDiscovery ou SemanticChunker

## Estrutura de Saída

```
docs/research/{YYYY-MM-DD}-{slug}/
├── README.md                    # Índice + TL;DR
├── 00-query-original.md         # Pergunta original + contexto
├── 01-deep-research-prompt.md   # Prompt gerado com sub-queries
├── 02-research-report.md        # Achados completos
└── 03-recommendations.md        # Recomendações (SEM código de produção)
```
