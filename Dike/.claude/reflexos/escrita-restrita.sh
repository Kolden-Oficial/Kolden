#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Reflexo PreToolUse da Dike — escrita-restrita (append-only do Contrato)
#
# BLOQUEIA qualquer escrita (Write/Edit) que toque uma seção do Contrato de
# Missão que NÃO seja `dike`. Materializa o modo de falha #8 do PRD ("Dike
# extrapola escopo: corrige/reescreve/arbitra") e preserva o append-only: cada
# camada escreve só a sua seção; ninguém reescreve a de outra.
#
# Regra determinística:
#   - Alvo que NÃO é Contrato de Missão -> não interfere (exit 0).
#   - Write sobre um Contrato -> DENY (Write reescreveria o arquivo inteiro,
#     ou seja, todas as seções; a Dike só altera `dike`, e por Edit).
#   - Edit sobre um Contrato -> só passa se o trecho substituído (old_string)
#     estiver INTEIRAMENTE dentro da seção `dike:`. Fora dela, ou se o trecho
#     não for localizável (não verificável) -> DENY (fail-closed).
#
# Saída: formato hookSpecificOutput.permissionDecision (deny + motivo). Quando
# não há violação, sai em silêncio com exit 0 (segue o fluxo normal do harness).
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

entrada=$(cat)

# Resolve um Python funcional (parse robusto do JSON do hook + do YAML do alvo).
PY=""
for c in python3 python py; do
  if command -v "$c" >/dev/null 2>&1 && "$c" -c "import sys" >/dev/null 2>&1; then
    PY="$c"; break
  fi
done
if [ -z "$PY" ]; then
  # Sem Python não dá para verificar com segurança. Fail-closed: nega.
  printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"PreToolUse","permissionDecision":"deny","permissionDecisionReason":"escrita-restrita: nenhum interpretador Python para verificar a fronteira da secao dike — fail-closed (PRD modo de falha #8)."}}'
  exit 0
fi

prog="$(mktemp)"
trap 'rm -f "$prog"' EXIT

cat > "$prog" <<'PY'
import sys, json, re, os

def emit_allow():
    # Sem decisão = segue o fluxo padrão do harness (outras permissões ainda valem).
    sys.exit(0)

def emit_deny(reason):
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": reason,
        }
    }, ensure_ascii=False))
    sys.exit(0)

raw = sys.stdin.read()
try:
    payload = json.loads(raw)
except Exception:
    # JSON do hook ilegível: não é seguro decidir nada — deixa passar para não
    # travar ferramentas legítimas (este reflexo só guarda o Contrato).
    emit_allow()

tool = payload.get("tool_name") or payload.get("toolName") or ""
ti = payload.get("tool_input") or payload.get("toolInput") or {}
if tool not in ("Write", "Edit"):
    emit_allow()

file_path = ti.get("file_path") or ti.get("filePath") or ""
if not file_path:
    emit_allow()

# Conteúdo existente do alvo (se houver) e conteúdo proposto (Write).
existing = ""
try:
    if os.path.isfile(file_path):
        with open(file_path, encoding="utf-8") as f:
            existing = f.read()
except OSError:
    existing = ""

proposed = ti.get("content") or ""

def eh_contrato(txt):
    return bool(
        re.search(r'^\s*missao:\s*$', txt, re.M)
        and re.search(r'^\s*intencao_original:\s*$', txt, re.M)
    )

is_contract = eh_contrato(existing) or (tool == "Write" and eh_contrato(proposed))
if not is_contract:
    emit_allow()

# A partir daqui: o alvo É um Contrato de Missão.

if tool == "Write":
    emit_deny(
        "escrita-restrita: Write reescreveria o Contrato inteiro (todas as secoes). "
        "A Dike so altera a secao `dike` e por Edit. Bloqueado para preservar o "
        "append-only (PRD modo de falha #8)."
    )

# tool == Edit — precisa do arquivo existente para localizar a seção dike.
if not existing:
    emit_deny(
        "escrita-restrita: Edit em Contrato sem conteudo legivel para localizar a "
        "secao `dike` — fail-closed (PRD modo de falha #8)."
    )

old = ti.get("old_string")
if old is None or old == "":
    emit_deny(
        "escrita-restrita: Edit sem old_string nao e verificavel contra a fronteira "
        "da secao `dike` — fail-closed."
    )

lines = existing.split("\n")

# Localiza a seção `dike:` e seus limites (de `dike:` ate o proximo irmao de
# mesma indentacao, ou EOF).
d_start = None
d_indent = None
for i, ln in enumerate(lines):
    m = re.match(r'^(\s*)dike:\s*$', ln)
    if m:
        d_start = i
        d_indent = len(m.group(1))
        break
if d_start is None:
    emit_deny(
        "escrita-restrita: secao `dike:` nao encontrada no Contrato — Edit nao "
        "pode ser confinado a ela (fail-closed)."
    )

d_end = len(lines)
for j in range(d_start + 1, len(lines)):
    ln = lines[j]
    if not ln.strip() or ln.lstrip().startswith("#"):
        continue
    indent = len(ln) - len(ln.lstrip())
    if indent <= d_indent:
        d_end = j  # primeira linha do proximo irmao/pai
        break

# Localiza o trecho a ser editado (old_string) no arquivo.
idx = existing.find(old)
if idx == -1:
    emit_deny(
        "escrita-restrita: old_string nao encontrado no Contrato — edicao nao "
        "verificavel (fail-closed)."
    )

start_line = existing.count("\n", 0, idx)          # 0-based
end_line = start_line + old.count("\n")             # ultima linha tocada

# Tudo precisa cair DENTRO de [d_start, d_end).
if start_line >= d_start and end_line < d_end:
    emit_allow()

emit_deny(
    f"escrita-restrita: a edicao toca linhas {start_line+1}-{end_line+1}, fora da "
    f"secao `dike` (linhas {d_start+1}-{d_end}). A Dike so escreve a secao `dike` - "
    f"preserva o append-only (PRD modo de falha #8)."
)
PY

printf '%s' "$entrada" | "$PY" "$prog"
exit 0
