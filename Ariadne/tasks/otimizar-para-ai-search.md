# Tarefa: Otimizar para AI Search (AEO/GEO/LLMO)

**ID:** ARIADNE-006 · **Versão:** 1.0.0 · **Comando:** `*ai-seo` · **Agente:** otimizador-ai-seo
**Objetivo:** tornar o conteúdo CITÁVEL por LLMs e AI Overviews (estrutura, autoridade, presença).

## Entradas
| Campo | Obrigatório | Validação |
|---|---|---|
| url/tema | Sim | Página/tema a otimizar |
| consultas-alvo | Sim | Perguntas que o público faz a LLMs |

## Pré-condições
- Verificar como o nicho aparece HOJE em AI Overviews / ChatGPT / Perplexity (busca real) — AI search muda rápido; rotular o que é incerto.

## Fases
1. **Estrutura citável (answer-first):** resposta direta no topo, blocos extraíveis, headings que são perguntas reais — verdadeiros (não inventar fato para parecer citável).
2. **Autoridade:** E-E-A-T, ser referenciado/mencionado, fontes citáveis.
3. **Presença:** estar onde os LLMs leem; `llms.txt` e acesso de crawlers de IA.
4. **Verificar:** buscar as consultas-alvo e checar citação/menção; medir presença por plataforma.

## Saída
- Recomendações por pilar (estrutura/autoridade/presença), com verificação real por consulta-alvo e o que é incerto rotulado.

## Vetos
- Sem manipulação enganosa de LLM (prompt injection em conteúdo, cloaking para crawler de IA); conteúdo answer-first verdadeiro (sem fato inventado); recomendação com verificação real; nunca credencial em texto puro; só tools de `ferramentas.md`.

## Conclusão
- [ ] Estrutura answer-first · [ ] Autoridade · [ ] Presença/llms.txt · [ ] Citação verificada por consulta · [ ] Incerteza rotulada
