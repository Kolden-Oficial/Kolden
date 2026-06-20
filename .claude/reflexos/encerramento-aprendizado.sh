#!/bin/bash
# Reflexo Stop — Ritual de Encerramento (auto-aprendizado obrigatório).
# Garante que, ao final de cada sessão com trabalho real, o agente reflita e
# salve aprendizados na sua memória (MEMORY.md) antes de encerrar.
# Idempotente: dispara no máximo UMA vez por sessão (sem loop infinito).

entrada=$(cat)

session_id=$(echo "$entrada" | grep -o '"session_id"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//')
stop_ativo=$(echo "$entrada" | grep -o '"stop_hook_active"[[:space:]]*:[[:space:]]*[a-z]*' | head -1 | sed 's/.*:[[:space:]]*//')

[ -z "$session_id" ] && session_id="sem-sessao"

# Guarda anti-loop nativa: se já estamos continuando por causa deste hook, libera.
if [ "$stop_ativo" = "true" ]; then
  exit 0
fi

estado_dir="$CLAUDE_PROJECT_DIR/.claude/.estado"
marcador_reflexao="$estado_dir/reflexao-${session_id}"
marcador_trabalho="$estado_dir/trabalho-${session_id}"

# Já refletiu nesta sessão? Então libera o encerramento.
if [ -f "$marcador_reflexao" ]; then
  exit 0
fi

# Houve trabalho real (Write/Edit) nesta sessão? Se não, não força nada
# (sessões só de leitura/conversa encerram normalmente).
if [ ! -f "$marcador_trabalho" ]; then
  exit 0
fi

# Marca a reflexão como feita ANTES de bloquear — garante disparo único.
mkdir -p "$estado_dir"
echo "$(date '+%Y-%m-%d %H:%M:%S')" > "$marcador_reflexao"

# Bloqueia o encerramento uma vez e instrui o agente a rodar o ritual.
cat <<'JSON'
{
  "decision": "block",
  "reason": "RITUAL DE ENCERRAMENTO (auto-aprendizado obrigatório): antes de encerrar, acione a habilidade `ritual-de-encerramento`. Reflita sobre esta sessão, extraia as lições verificadas e grave-as na sua memória própria (MEMORY.md, conforme a regra de resolução da habilidade). Nunca encerre sem ter aprendido e salvo algo. Depois de salvar e reportar, pode encerrar normalmente."
}
JSON

exit 0
