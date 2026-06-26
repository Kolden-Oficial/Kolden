#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Reflexo DETERMINÍSTICO da Dike — confere-hash
#
# Recomputa sha256(intencao_original.input_cru) e compara com
# intencao_original.hash do Contrato de Missão. É a peça central: o PRD (§4, §8,
# modo de falha #6) exige que a integridade do lacre seja apurada por um reflexo,
# NUNCA por juízo do modelo ("o LLM não computa hash confiável").
#
# Integridade ≠ fidelidade: este reflexo só atesta que o lacre não foi
# adulterado. Nada diz sobre a entrega bater com a intenção (isso é a
# reconciliação, que é juízo do agente e só roda com hash íntegro).
#
# Uso (testável via CLI):
#   ./confere-hash.sh <caminho-do-contrato.yaml>
#
# Códigos de saída (fail-closed — ver §8 do PRD):
#   0  INTEGRO     — o hash recomputado bate com o armazenado
#   1  ADULTERADO  — diverge (lacre tocado OU input_cru alterado)
#   2  ERRO        — não computável (contrato ilegível, campo ausente, hash
#                    malformado). Quem chama DEVE tratar como travar-e-escalar.
#
# Convenção de selagem (quem LACRA o Contrato tem de usar a MESMA):
#   hash = sha256 hex (64 chars) dos bytes UTF-8 do input_cru EXATAMENTE como
#   escrito, sem newline final. O campo aceita prefixo opcional "sha256:".
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

contrato="${1:-}"
if [ -z "$contrato" ]; then
  echo "ERRO: caminho do contrato ausente. Uso: confere-hash.sh <contrato.yaml>"
  exit 2
fi
if [ ! -f "$contrato" ]; then
  echo "ERRO: contrato inexistente -> $contrato (fail-closed)"
  exit 2
fi

# Resolve um Python que REALMENTE funcione e, de preferência, com PyYAML
# (parse correto de aspas/escapes). No Git Bash o alias pode cair no stub da
# Microsoft Store; o probe `import sys` o filtra. Sem PyYAML, o programa abaixo
# usa um parser próprio do bloco intencao_original — não depende de dependência.
PY=""        # primeiro interpretador que funciona
PY_YAML=""   # interpretador que funciona E tem PyYAML
for c in python3 python py; do
  if command -v "$c" >/dev/null 2>&1 && "$c" -c "import sys" >/dev/null 2>&1; then
    [ -z "$PY" ] && PY="$c"
    if "$c" -c "import yaml" >/dev/null 2>&1; then PY_YAML="$c"; fi
  fi
done
INTERP="${PY_YAML:-$PY}"
if [ -z "$INTERP" ]; then
  echo "ERRO: nenhum interpretador Python encontrado para recomputar o hash (fail-closed)"
  exit 2
fi

# O programa Python vai para um arquivo temporário (evita armadilhas de /dev/stdin
# no Windows). Limpamos sempre ao final.
prog="$(mktemp)"
trap 'rm -f "$prog"' EXIT

cat > "$prog" <<'PY'
import sys, re, hashlib

def fail(msg, code=2):
    print(msg)
    sys.exit(code)

if len(sys.argv) < 2 or not sys.argv[1].strip():
    fail("ERRO: caminho do contrato ausente", 2)

path = sys.argv[1]
try:
    with open(path, encoding="utf-8") as f:
        text = f.read()
except OSError as e:
    fail(f"ERRO: contrato ilegivel -> {path}: {e}", 2)

input_cru = None
stored = None

# 1) Caminho preferido: PyYAML (parse fiel de aspas/escapes), se disponível.
try:
    import yaml
    data = yaml.safe_load(text) or {}
    io = (data.get("missao") or {}).get("intencao_original") or {}
    if isinstance(io, dict):
        input_cru = io.get("input_cru")
        stored = io.get("hash")
except Exception:
    pass  # cai no parser próprio

# 2) Fallback sem dependência: varre o bloco intencao_original linha a linha.
def parse_scalar(v):
    v = v.strip()
    # remove comentário inline em escalar plano (não dentro de aspas)
    if v and v[0] not in ("'", '"'):
        v = re.split(r"\s+#", v, 1)[0].strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in ("'", '"'):
        q = v[0]
        v = v[1:-1]
        if q == '"':
            v = (v.replace('\\"', '"').replace('\\\\', '\\')
                  .replace('\\n', '\n').replace('\\t', '\t'))
        else:
            v = v.replace("''", "'")
    return v

if input_cru is None or stored is None:
    in_bloco = False
    base_indent = None
    for ln in text.splitlines():
        if re.match(r'^\s*intencao_original:\s*$', ln):
            in_bloco = True
            base_indent = len(ln) - len(ln.lstrip())
            continue
        if not in_bloco:
            continue
        stripped = ln.strip()
        if not stripped or stripped.startswith('#'):
            continue
        indent = len(ln) - len(ln.lstrip())
        if indent <= base_indent:
            break  # saiu do bloco intencao_original
        m = re.match(r'^\s*input_cru:\s*(.*)$', ln)
        if m and input_cru is None:
            input_cru = parse_scalar(m.group(1))
            continue
        m = re.match(r'^\s*hash:\s*(.*)$', ln)
        if m and stored is None:
            stored = parse_scalar(m.group(1))
            continue

if input_cru is None:
    fail("ERRO: campo intencao_original.input_cru ausente — fail-closed (nao computavel)", 2)
if stored is None or str(stored).strip() == "":
    fail("ERRO: campo intencao_original.hash ausente/vazio — fail-closed (nao computavel)", 2)

# Recomputa o selo conforme a convenção de selagem.
calc = hashlib.sha256(str(input_cru).encode("utf-8")).hexdigest()

# Normaliza o hash armazenado: tira prefixo opcional "sha256:", espaços; minúsculas.
norm = str(stored).strip()
if norm.lower().startswith("sha256:"):
    norm = norm.split(":", 1)[1].strip()
norm = norm.lower()

if not re.fullmatch(r'[0-9a-f]{64}', norm):
    fail(f"ERRO: hash armazenado nao e um sha256 hex de 64 chars ('{stored}') — fail-closed", 2)

if norm == calc:
    print(f"INTEGRO confere_hash=true sha256:{calc}")
    sys.exit(0)
print(f"ADULTERADO confere_hash=false recomputado=sha256:{calc} armazenado=sha256:{norm}")
sys.exit(1)
PY

"$INTERP" "$prog" "$contrato"
rc=$?
exit $rc
