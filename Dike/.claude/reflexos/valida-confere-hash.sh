#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Reflexo PreToolUse (matcher Edit) da Dike — valida-confere-hash
#
# IMPÕE o determinismo do hash (PRD §4, §8, modos de falha #1 e #6): a Dike NÃO
# pode marcar `confere_hash: true` na seção `dike` por juízo do modelo. Quando um
# Edit escreve `confere_hash: true` num Contrato de Missão, este reflexo roda o
# reflexo determinístico `confere-hash.sh` sobre aquele Contrato; se ele NÃO
# retornar ÍNTEGRO (exit 0), a escrita é NEGADA.
#
# Decisão:
#   - Edit que NÃO escreve `confere_hash: true`  -> allow (segue o fluxo).
#   - alvo que não é Contrato de Missão           -> allow.
#   - escreve `confere_hash: true` E confere-hash != 0 -> DENY (deny + motivo).
#   - escreve `confere_hash: true` E confere-hash == 0 -> allow.
#
# Saída: hookSpecificOutput.permissionDecision=deny (com motivo) quando viola;
# silêncio + exit 0 quando libera.
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

entrada=$(cat)

PY=""
for c in python3 python py; do
  if command -v "$c" >/dev/null 2>&1 && "$c" -c "import sys" >/dev/null 2>&1; then
    PY="$c"; break
  fi
done
if [ -z "$PY" ]; then
  printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"valida-confere-hash: nenhum interpretador Python para impor o determinismo do hash — fail-closed (PRD modo de falha #6)."}}'
  exit 0
fi

# O programa decide se precisa CHECAR e devolve o caminho do contrato.
prog="$(mktemp)"
trap 'rm -f "$prog"' EXIT

cat > "$prog" <<'PY'
import sys, json, re, os

raw = sys.stdin.read()
try:
    payload = json.loads(raw)
except Exception:
    print("ALLOW"); sys.exit(0)  # JSON ilegível: não trava ferramenta legítima

tool = payload.get("tool_name") or payload.get("toolName") or ""
ti = payload.get("tool_input") or payload.get("toolInput") or {}
if tool != "Edit":
    print("ALLOW"); sys.exit(0)

new = ti.get("new_string") or ""
# Gatilho: a edição afirma confere_hash = true.
if not re.search(r'confere_hash\s*:\s*true\b', new):
    print("ALLOW"); sys.exit(0)

file_path = ti.get("file_path") or ti.get("filePath") or ""
if not file_path:
    print("ALLOW"); sys.exit(0)

existing = ""
try:
    if os.path.isfile(file_path):
        with open(file_path, encoding="utf-8") as f:
            existing = f.read()
except OSError:
    existing = ""

def eh_contrato(txt):
    return bool(
        re.search(r'^\s*missao:\s*$', txt, re.M)
        and re.search(r'^\s*intencao_original:\s*$', txt, re.M)
    )

if not eh_contrato(existing):
    print("ALLOW"); sys.exit(0)

# Precisa CHECAR este contrato com o reflexo determinístico.
print("CHECK\t" + file_path)
sys.exit(0)
PY

resultado=$(printf '%s' "$entrada" | "$PY" "$prog")
acao=$(printf '%s' "$resultado" | cut -f1)

if [ "$acao" != "CHECK" ]; then
  exit 0  # allow
fi

contrato=$(printf '%s' "$resultado" | cut -f2-)
confere="$(dirname "$0")/confere-hash.sh"

# Roda o reflexo determinístico de integridade sobre o Contrato em disco.
# (O input_cru/hash do lacre não mudam com um Edit na seção dike — checar o
# arquivo atual é correto.)
saida=$(bash "$confere" "$contrato" 2>&1)
rc=$?

if [ "$rc" -eq 0 ]; then
  exit 0  # ÍNTEGRO -> pode marcar confere_hash: true
fi

# NÃO íntegro (ou não computável): nega a escrita do confere_hash: true.
motivo="valida-confere-hash: Edit tenta marcar 'confere_hash: true', mas o reflexo determinístico confere-hash.sh NAO confirmou integridade (rc=${rc}): ${saida}. O confere_hash so pode ser true quando o hash recomputado bate (PRD modos de falha #1 e #6)."
# Serializa o motivo como JSON via Python (escape correto).
printf '%s' "$motivo" | "$PY" -c 'import json,sys; r=sys.stdin.read(); print(json.dumps({"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":r}}, ensure_ascii=False))'
exit 0
