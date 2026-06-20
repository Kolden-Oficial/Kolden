#!/bin/bash
# Reflexo PostToolUse — marca que houve trabalho real (Write/Edit) nesta sessão.
# Cria um marcador por sessão e registra a escrita em registros/auditoria.log.
# O reflexo Stop `encerramento-aprendizado.sh` usa o marcador para decidir se
# força o Ritual de Encerramento (auto-aprendizado).

entrada=$(cat)

session_id=$(echo "$entrada" | grep -o '"session_id"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//')
arquivo=$(echo "$entrada" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//')

[ -z "$session_id" ] && session_id="sem-sessao"

estado_dir="$CLAUDE_PROJECT_DIR/.claude/.estado"
mkdir -p "$estado_dir"
touch "$estado_dir/trabalho-${session_id}"

if [ -n "$arquivo" ]; then
  mkdir -p "$CLAUDE_PROJECT_DIR/registros"
  echo "$(date '+%Y-%m-%d %H:%M:%S') | escrita | $arquivo" >> "$CLAUDE_PROJECT_DIR/registros/auditoria.log"
fi

exit 0
