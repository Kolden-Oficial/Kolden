#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Reflexo PostToolUse da Dike — auditoria
# Registra toda ação de escrita (Write/Edit) em registros/auditoria.log, com
# carimbo de data/hora, a ferramenta usada e o arquivo tocado. Rastro auditável
# das intervenções da Dike (que, por contrato, só deveriam tocar a seção `dike`).
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

entrada=$(cat)

# Extrai campos do JSON do hook de forma tolerante (sem dependência de jq).
arquivo=$(printf '%s' "$entrada" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//' || true)
ferramenta=$(printf '%s' "$entrada" | grep -o '"tool_name"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//' || true)
[ -z "${ferramenta:-}" ] && ferramenta="?"

log_dir="${CLAUDE_PROJECT_DIR:-.}/registros"
mkdir -p "$log_dir"

if [ -n "${arquivo:-}" ]; then
  echo "$(date '+%Y-%m-%d %H:%M:%S') | ${ferramenta} | ${arquivo}" >> "$log_dir/auditoria.log"
fi

exit 0
