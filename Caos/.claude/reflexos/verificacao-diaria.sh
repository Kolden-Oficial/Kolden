#!/bin/bash
# Reflexo SessionStart — verifica alinhamento dos documentos se >24h desde a última verificação

tracker="$CLAUDE_PROJECT_DIR/registros/ultima-verificacao.md"

# Se o tracker não existe, é a primeira sessão — criar e disparar verificação
if [ ! -f "$tracker" ]; then
  echo "VERIFICAÇÃO DE ALINHAMENTO: primeira sessão detectada."
  echo "Use a habilidade verificacao-de-alinhamento para mapear o estado dos documentos."
  exit 0
fi

# Extrai a data da última verificação (formato AAAA-MM-DD)
ultima=$(grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' "$tracker" | head -1)

if [ -z "$ultima" ]; then
  echo "VERIFICAÇÃO DE ALINHAMENTO: data não encontrada no tracker — rodando verificação."
  echo "Use a habilidade verificacao-de-alinhamento agora."
  exit 0
fi

# Calcula diferença em dias
hoje=$(date '+%Y-%m-%d')
diff=$(( ( $(date -d "$hoje" +%s 2>/dev/null || date -j -f "%Y-%m-%d" "$hoje" +%s) - \
           $(date -d "$ultima" +%s 2>/dev/null || date -j -f "%Y-%m-%d" "$ultima" +%s) ) / 86400 ))

if [ "$diff" -ge 1 ] 2>/dev/null; then
  echo "⏰ VERIFICAÇÃO DE ALINHAMENTO: última verificação foi há ${diff} dia(s) ($ultima)."
  echo "Execute a habilidade verificacao-de-alinhamento para checar pontas soltas antes de começar."
fi

exit 0
