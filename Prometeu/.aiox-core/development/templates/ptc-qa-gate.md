---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/templates/_indice|_indice]]"
---

# Template PTC: Lote de QA Gate

---
execution_mode: programmatic
ptc_type: bash-batch  # Fallback — PTC verdadeiro não disponível no Claude Code CLI (ADR-7)
adr_reference: ADR-3 (PTC native ONLY — sem ferramentas MCP em blocos batch)
story: TOK-3
---

## Propósito

Consolidar as verificações do QA Gate (lint, typecheck, test) em um único bloco Bash.
Resultados intermediários permanecem em variáveis de shell — apenas o resumo final entra no contexto.

**Economia de tokens:** ~20% vs 3 chamadas de ferramenta separadas (estimativa conservadora).
PTC verdadeiro (nível de API) renderia ~37%, mas não está disponível no Claude Code CLI.

## Restrição (ADR-3)

**APENAS ferramentas nativas/CLI são permitidas dentro deste bloco batch.**
Ferramentas MCP (EXA, Playwright, Apify, Context7, Nogic, Code-Graph) são EXCLUÍDAS.

Ferramentas elegíveis: Bash, Read, Write, Edit, Grep, Glob (todas com `ptc_eligible: true` em tool-registry.yaml).

## Template

```bash
#!/bin/bash
# PTC-QA-GATE: Verificações de qualidade em lote — bloco Bash único, uma saída de resumo
# Uso: Execute como uma única chamada da ferramenta Bash. Apenas o echo final entra no contexto.

set -o pipefail

PASS=0
FAIL=0
RESULTS=""

# --- Verificação 1: Lint ---
lint_output=$(npm run lint 2>&1)
lint_exit=$?
if [ $lint_exit -eq 0 ]; then
  RESULTS+="LINT: PASS\n"
  ((PASS++))
else
  RESULTS+="LINT: FAIL\n${lint_output}\n"
  ((FAIL++))
fi

# --- Verificação 2: TypeCheck ---
typecheck_output=$(npm run typecheck 2>&1)
typecheck_exit=$?
if [ $typecheck_exit -eq 0 ]; then
  RESULTS+="TYPECHECK: PASS\n"
  ((PASS++))
else
  RESULTS+="TYPECHECK: FAIL\n${typecheck_output}\n"
  ((FAIL++))
fi

# --- Verificação 3: Tests ---
test_output=$(npm test 2>&1)
test_exit=$?
if [ $test_exit -eq 0 ]; then
  RESULTS+="TESTS: PASS\n"
  ((PASS++))
else
  RESULTS+="TESTS: FAIL\n${test_output}\n"
  ((FAIL++))
fi

# --- Resumo (apenas isto entra no contexto) ---
echo "=== QA GATE SUMMARY ==="
echo "Passed: $PASS / $((PASS + FAIL))"
echo "Failed: $FAIL"
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
| Direta (3 chamadas) | 3 | 3 (cada resultado) | ~3.000-9.000 |
| Lote (1 chamada) | 1 | 1 (apenas resumo) | ~1.500-3.000 |
| **Redução** | -67% chamadas | -67% entradas | **~20-50%** |

## Notas

- Se qualquer verificação falhar, a saída completa daquela verificação é incluída no resumo
- Verificações que passam mostram apenas "PASS" (contexto mínimo)
- Código de saída 1 = pelo menos uma verificação falhou
- Este template pode ser estendido com verificações adicionais (build, cobertura, etc.)
