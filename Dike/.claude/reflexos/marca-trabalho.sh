#!/usr/bin/env bash
# Reflexo PostToolUse — marca que houve trabalho real (Write/Edit) nesta sessão.
# Cria um marcador por sessão usado pelo reflexo Stop `encerramento-aprendizado.sh`.
# (A auditoria geral continua em auditoria.sh.)

entrada=$(cat)
session_id=$(echo "$entrada" | grep -o '"session_id"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//')
[ -z "$session_id" ] && session_id="sem-sessao"

estado_dir="${CLAUDE_PROJECT_DIR:-.}/.claude/.estado"
mkdir -p "$estado_dir"
touch "$estado_dir/trabalho-${session_id}"

exit 0
