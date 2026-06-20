#!/bin/bash
# Reflexo PostToolUse — auditoria do Kolden
# Registra todo arquivo criado/editado em registros/auditoria.log

entrada=$(cat)
arquivo=$(echo "$entrada" | grep -o '"file_path"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//')

if [ -n "$arquivo" ]; then
  mkdir -p "$CLAUDE_PROJECT_DIR/registros"
  echo "$(date '+%Y-%m-%d %H:%M:%S') | escrita | $arquivo" >> "$CLAUDE_PROJECT_DIR/registros/auditoria.log"
fi

exit 0
