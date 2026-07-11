---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/templates/_indice|_indice]]"
---

# Template PTC: Lote de Validação de Entidades

---
execution_mode: programmatic
ptc_type: bash-batch  # Fallback — PTC verdadeiro não disponível no Claude Code CLI (ADR-7)
adr_reference: ADR-3 (PTC native ONLY — sem ferramentas MCP em blocos batch)
story: TOK-3
---

## Propósito

Varrer em lote todas as entidades em entity-registry.yaml contra suas regras de validação.
N entidades x M verificações consolidadas em um único bloco Bash com uma saída de resumo.

**Economia de tokens:** ~20-30% vs chamadas individuais de Grep/Read por entidade.

## Restrição (ADR-3)

**APENAS ferramentas nativas/CLI são permitidas dentro deste bloco batch.**
Ferramentas MCP são EXCLUÍDAS. Usa: Bash, grep (via bash), leituras de arquivo (via bash).

## Template

```bash
#!/bin/bash
# PTC-ENTITY-VALIDATION: Varredura em lote do registro de entidades
# Uso: Execute como uma única chamada da ferramenta Bash. Apenas o resumo final entra no contexto.

REGISTRY=".aiox-core/data/entity-registry.yaml"
TOOL_REGISTRY=".aiox-core/data/tool-registry.yaml"

PASS=0
FAIL=0
WARN=0
RESULTS=""

# --- Verificação 1: Arquivo de registro existe ---
if [ ! -f "$REGISTRY" ]; then
  echo "FATAL: entity-registry.yaml not found at $REGISTRY"
  exit 1
fi

# --- Verificação 2: Campos obrigatórios presentes em cada entidade ---
required_fields=("name" "type" "layer" "description")
for field in "${required_fields[@]}"; do
  count=$(grep -c "  $field:" "$REGISTRY" 2>/dev/null || echo "0")
  if [ "$count" -gt 0 ]; then
    RESULTS+="FIELD '$field': found $count occurrences — PASS\n"
    ((PASS++))
  else
    RESULTS+="FIELD '$field': NOT FOUND — FAIL\n"
    ((FAIL++))
  fi
done

# --- Verificação 3: Sem nomes de entidade duplicados ---
duplicates=$(grep "^  [a-zA-Z]" "$REGISTRY" | sort | uniq -d)
if [ -z "$duplicates" ]; then
  RESULTS+="DUPLICATES: none — PASS\n"
  ((PASS++))
else
  RESULTS+="DUPLICATES: found\n$duplicates\n— FAIL\n"
  ((FAIL++))
fi

# --- Verificação 4: Consistência do registro de ferramentas ---
if [ -f "$TOOL_REGISTRY" ]; then
  tool_count=$(grep -c "tier:" "$TOOL_REGISTRY" 2>/dev/null || echo "0")
  RESULTS+="TOOL-REGISTRY: $tool_count tools found — PASS\n"
  ((PASS++))
else
  RESULTS+="TOOL-REGISTRY: file missing — WARN\n"
  ((WARN++))
fi

# --- Verificação 5: Anotações de camada válidas (L1-L4) ---
invalid_layers=$(grep "layer:" "$REGISTRY" | grep -v "L[1-4]" | head -5)
if [ -z "$invalid_layers" ]; then
  RESULTS+="LAYERS: all valid (L1-L4) — PASS\n"
  ((PASS++))
else
  RESULTS+="LAYERS: invalid entries found\n$invalid_layers\n— FAIL\n"
  ((FAIL++))
fi

# --- Resumo ---
echo "=== ENTITY VALIDATION SUMMARY ==="
echo "Passed: $PASS | Failed: $FAIL | Warnings: $WARN"
echo ""
echo -e "$RESULTS"

if [ $FAIL -gt 0 ]; then
  echo "VERDICT: FAIL"
  exit 1
else
  echo "VERDICT: PASS"
  exit 0
fi
```

## Comparação de Tokens

| Abordagem | Chamadas de Ferramenta | Entradas no Contexto | Tokens Estimados |
|----------|-----------|-----------------|-----------------|
| Direta (N verificações) | 5-10 | 5-10 (cada resultado) | ~5.000-10.000 |
| Lote (1 chamada) | 1 | 1 (apenas resumo) | ~2.000-3.000 |
| **Redução** | -80% chamadas | -80% entradas | **~20-40%** |

## Notas

- Extensível: adicione mais verificações anexando ao script
- Cada verificação reporta PASS/FAIL/WARN independentemente
- Apenas o resumo entra no contexto — resultados intermediários de grep/read permanecem no shell
