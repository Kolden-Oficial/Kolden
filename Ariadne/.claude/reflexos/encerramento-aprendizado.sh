#!/bin/bash
# Reflexo Stop — Ritual de Encerramento (auto-aprendizado obrigatório).
# Ao final de cada sessão com trabalho real, a Ariadne reflete e salva aprendizados
# no MEMORY.md antes de encerrar. Idempotente: dispara no máximo UMA vez por sessão.

entrada=$(cat)
session_id=$(echo "$entrada" | grep -o '"session_id"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//')
stop_ativo=$(echo "$entrada" | grep -o '"stop_hook_active"[[:space:]]*:[[:space:]]*[a-z]*' | head -1 | sed 's/.*:[[:space:]]*//')
[ -z "$session_id" ] && session_id="sem-sessao"

if [ "$stop_ativo" = "true" ]; then
  exit 0
fi

estado_dir="$CLAUDE_PROJECT_DIR/.claude/.estado"
marcador_reflexao="$estado_dir/reflexao-${session_id}"
marcador_trabalho="$estado_dir/trabalho-${session_id}"

if [ -f "$marcador_reflexao" ]; then
  exit 0
fi
if [ ! -f "$marcador_trabalho" ]; then
  exit 0
fi

mkdir -p "$estado_dir"
echo "$(date '+%Y-%m-%d %H:%M:%S')" > "$marcador_reflexao"

cat <<'JSON'
{
  "decision": "block",
  "reason": "RITUAL DE ENCERRAMENTO (auto-aprendizado obrigatório): antes de encerrar, acione a habilidade `ritual-de-encerramento`. Reflita sobre esta sessão de SEO/CRO, extraia as lições verificadas (padrões técnicos que funcionaram, gotchas de auditoria/indexação, hipóteses de CRO validadas/refutadas) e grave-as na memória do squad (MEMORY.md, esquema Padrões Ativos / Candidatos a Promoção / Arquivado). Nunca encerre sem ter aprendido e salvo algo. Depois de salvar e reportar, pode encerrar normalmente."
}
JSON

exit 0
