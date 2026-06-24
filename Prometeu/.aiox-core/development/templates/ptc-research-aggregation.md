# Template PTC: Lote de Agregação de Pesquisa

---
execution_mode: programmatic
ptc_type: bash-batch  # Fallback — PTC verdadeiro não disponível no Claude Code CLI (ADR-7)
adr_reference: ADR-3 (PTC native ONLY — sem ferramentas MCP em blocos batch)
story: TOK-3
---

## Propósito

Consolidar a agregação de pesquisa multi-arquivo (varrer docs, extrair achados, mesclar)
em um único bloco Bash. Resultados intermediários de grep/read permanecem em variáveis de shell.

**Economia de tokens:** ~20% vs múltiplas chamadas de ferramenta Read + Grep.

**Nota:** Este template usa apenas ferramentas nativas de CLI. Para pesquisa baseada na web
(WebSearch, EXA), essas chamadas de ferramenta devem permanecer separadas — elas NÃO são
ptc_eligible (ferramentas MCP excluídas conforme ADR-3). Este template cobre a fase de
**agregação** (varredura de arquivos locais), não a fase de **busca**.

## Restrição (ADR-3)

**APENAS ferramentas nativas/CLI são permitidas dentro deste bloco batch.**
Ferramentas MCP (EXA, Context7, Apify) são EXCLUÍDAS dos blocos batch.
WebSearch/WebFetch são Tier 1 nativas, mas operam como chamadas de API — elas podem ser
incluídas no batch se executadas via padrões de scripting de shell.

## Template

```bash
#!/bin/bash
# PTC-RESEARCH-AGGREGATION: Varrer em lote docs de pesquisa e agregar achados
# Uso: Execute como uma única chamada da ferramenta Bash. Apenas o resumo final entra no contexto.

RESEARCH_DIR="docs/research"
OUTPUT=""
TOPICS_FOUND=0
FILES_SCANNED=0

# --- Varrer todos os diretórios de pesquisa ---
for dir in "$RESEARCH_DIR"/*/; do
  if [ -d "$dir" ]; then
    readme="$dir/README.md"
    if [ -f "$readme" ]; then
      ((FILES_SCANNED++))

      # Extrair título (primeiro H1)
      title=$(grep -m1 "^# " "$readme" | sed 's/^# //')

      # Extrair achados-chave (linhas com "finding" ou "conclusion" ou "result")
      findings=$(grep -i -c "finding\|conclusion\|result\|recommendation" "$readme" 2>/dev/null || echo "0")

      # Extrair métricas de token/performance se presentes
      metrics=$(grep -i "token\|reduction\|saving\|performance\|latency" "$readme" | head -3)

      OUTPUT+="## $title\n"
      OUTPUT+="- Source: $readme\n"
      OUTPUT+="- Key findings count: $findings\n"
      if [ -n "$metrics" ]; then
        OUTPUT+="- Metrics:\n"
        while IFS= read -r line; do
          OUTPUT+="  - $line\n"
        done <<< "$metrics"
      fi
      OUTPUT+="\n"
      ((TOPICS_FOUND++))
    fi
  fi
done

# --- Resumo ---
echo "=== RESEARCH AGGREGATION SUMMARY ==="
echo "Directories scanned: $FILES_SCANNED"
echo "Topics with findings: $TOPICS_FOUND"
echo ""
echo -e "$OUTPUT"
```

## Comparação de Tokens

| Abordagem | Chamadas de Ferramenta | Entradas no Contexto | Tokens Estimados |
|----------|-----------|-----------------|-----------------|
| Direta (N reads + N greps) | 10-20 | 10-20 resultados | ~8.000-15.000 |
| Lote (1 chamada) | 1 | 1 (apenas resumo) | ~3.000-5.000 |
| **Redução** | -90% chamadas | -90% entradas | **~30-50%** |

## Notas

- Varre `docs/research/*/README.md` por padrão — ajuste o caminho conforme necessário
- Extrai título, contagem de achados e métricas de performance por doc de pesquisa
- Apenas o resumo agregado entra no contexto
- Para pesquisa na web (EXA, WebSearch), execute-as como chamadas de ferramenta separadas primeiro,
  depois use este template para agregar os resultados salvos
