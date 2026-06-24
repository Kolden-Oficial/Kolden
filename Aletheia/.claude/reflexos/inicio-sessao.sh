#!/bin/bash
# Reflexo SessionStart — carrega o estado do squad Aletheia no início de cada sessão

echo "ALETHEIA ATIVO — squad de Discovery & Lean Validation pronto."
echo "Orquestradora: @aletheia-chief (🔎). Roster: Blank, Fitzpatrick, Ulwick / Ries, Bland, Maurya / Savoia."
echo "Regra de ouro: nada de 'construir' sem dor validada + hipótese falsificável + métrica + critério de kill."

if [ -f "$CLAUDE_PROJECT_DIR/MEMORY.md" ]; then
  echo "Memória do squad carregada (MEMORY.md)."
fi

echo "Para validar uma ideia: '@aletheia validate \"<sua ideia>\"' ou o comando *journey para a jornada completa."

exit 0
