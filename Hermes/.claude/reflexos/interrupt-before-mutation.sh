#!/usr/bin/env bash
# Reflexo G4 canônico (METODO §4) — Hermes ASL-3
# Dispara ANTES de qualquer ação com mutation externa irreversível.
# Origem: Hadfield-Menell-Russell 2017 IJCAI "The Off-Switch Game" (Onda 5 procedencia)
# Ratificado: Onda 2 METODO 2026-07-06

set -euo pipefail

readonly HERMES_ROOT="C:/Kolden/Hermes"
readonly TS="$(date +%Y-%m-%dT%H:%M:%S%z)"
readonly LOG="$HERMES_ROOT/registros/aprendizado.log"

# Padrões que exigem gate humano explícito
readonly MUTATION_PATTERNS=(
  "whatsapp-bridge/bridge.js send"
  "invoca-squad.ps1.*-Approved"
  "git push"
  "git commit"
  "git reset --hard"
  "git checkout --"
  "docker compose down -v"
  "rm -rf"
  "supabase.*apply_migration"
)

# Extrai comando do input do hook
CMD_INPUT="${CLAUDE_HOOK_INPUT_TOOL_ARG:-${1:-}}"

# Se comando não bate com padrões, libera
matched=false
for pattern in "${MUTATION_PATTERNS[@]}"; do
  if echo "$CMD_INPUT" | grep -qE "$pattern"; then
    matched=true
    break
  fi
done

if [ "$matched" = false ]; then
  # Não é mutation com side-effect irreversível — libera
  exit 0
fi

# Mutation detectada — exige gate humano
cat <<EOF >&2
{
  "hookSpecificOutput": {
    "permissionDecision": "ask",
    "reason": "G4 canônico (ASL-3): mutation externa irreversível detectada em '$CMD_INPUT'. Reflexo interrupt-before-mutation.sh solicita confirmação humana explícita antes de prosseguir. Padrão herdado de Russell 2019 assistance games + Hadfield-Menell-Russell 2017 Off-Switch Game."
  }
}
EOF

# Registrar no log
echo "[$TS] G4_TRIGGER cmd='$CMD_INPUT' matched=true" >> "$LOG" 2>/dev/null || true

exit 2  # ask permission
