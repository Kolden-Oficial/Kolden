#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Reflexo DETERMINÍSTICO da Dike — gate-de-subida
#
# Impede que o Contrato de Missão suba ao Hermes sem verificação da Dike. É o
# fail-closed do PRD (§8, modo de falha #10: "Dike falha em silêncio"): só deixa
# subir se a seção `dike` existe E está COMPLETA e assinada.
#
# Critérios para exit 0 (pode subir) — TODOS obrigatórios:
#   1. a seção `dike` existe;
#   2. `reconciliacao` preenchido com um valor válido: bateu | nao-bateu;
#   3. `veredito` preenchido com um valor válido: sobe | volta-para-correcao;
#   4. `assinatura.por` == "dike".
# Qualquer falha -> exit ≠0 (fail-closed) com o motivo no stderr.
#
# IMPORTANTE: este gate é invocado pelo PIPELINE do Contrato (a fiação no runtime
# virá na Fatia 3), NÃO é um hook do settings.json. É um CLI determinístico —
# não depende do juízo do modelo, igual ao confere-hash.sh.
#
# Uso (testável via CLI):
#   ./gate-de-subida.sh <caminho-do-contrato.yaml>
#
# Códigos de saída:
#   0  PODE-SUBIR   — seção dike completa e assinada
#   1  INCOMPLETA   — seção dike existe mas falta campo / valor inválido / sem assinatura
#   2  ERRO         — não verificável (contrato ilegível, sem argumento, sem seção dike)
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

contrato="${1:-}"
if [ -z "$contrato" ]; then
  echo "ERRO: caminho do contrato ausente. Uso: gate-de-subida.sh <contrato.yaml>" >&2
  exit 2
fi
if [ ! -f "$contrato" ]; then
  echo "ERRO: contrato inexistente -> $contrato (fail-closed)" >&2
  exit 2
fi

# Resolve um Python funcional, de preferência com PyYAML (parse fiel). Sem PyYAML,
# o programa usa um parser próprio do bloco `dike` — não depende de dependência.
PY=""
PY_YAML=""
for c in python3 python py; do
  if command -v "$c" >/dev/null 2>&1 && "$c" -c "import sys" >/dev/null 2>&1; then
    [ -z "$PY" ] && PY="$c"
    if "$c" -c "import yaml" >/dev/null 2>&1; then PY_YAML="$c"; fi
  fi
done
INTERP="${PY_YAML:-$PY}"
if [ -z "$INTERP" ]; then
  echo "ERRO: nenhum interpretador Python encontrado para verificar a seção dike (fail-closed)" >&2
  exit 2
fi

prog="$(mktemp)"
trap 'rm -f "$prog"' EXIT

cat > "$prog" <<'PY'
import sys, re

def erro(msg, code=2):
    print(msg, file=sys.stderr)
    sys.exit(code)

if len(sys.argv) < 2 or not sys.argv[1].strip():
    erro("ERRO: caminho do contrato ausente", 2)

path = sys.argv[1]
try:
    with open(path, encoding="utf-8") as f:
        text = f.read()
except OSError as e:
    erro(f"ERRO: contrato ilegivel -> {path}: {e}", 2)

RECON_OK = {"bateu", "nao-bateu"}
VER_OK = {"sobe", "volta-para-correcao"}

reconciliacao = None
veredito = None
assinatura_por = None
tem_dike = False

# 1) Caminho preferido: PyYAML.
try:
    import yaml
    data = yaml.safe_load(text) or {}
    dike = (data.get("missao") or {}).get("dike")
    if isinstance(dike, dict):
        tem_dike = True
        reconciliacao = dike.get("reconciliacao")
        veredito = dike.get("veredito")
        ass = dike.get("assinatura")
        if isinstance(ass, dict):
            assinatura_por = ass.get("por")
except Exception:
    pass  # cai no parser próprio

# 2) Fallback sem dependência: varre o bloco `dike` linha a linha.
def parse_scalar(v):
    v = v.strip()
    if v and v[0] not in ("'", '"'):
        v = re.split(r"\s+#", v, 1)[0].strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in ("'", '"'):
        v = v[1:-1]
    return v

if not tem_dike:
    lines = text.splitlines()
    d_start = None
    d_indent = None
    for i, ln in enumerate(lines):
        m = re.match(r'^(\s*)dike:\s*$', ln)
        if m:
            d_start = i
            d_indent = len(m.group(1))
            break
    if d_start is not None:
        tem_dike = True
        for j in range(d_start + 1, len(lines)):
            ln = lines[j]
            if not ln.strip() or ln.lstrip().startswith("#"):
                continue
            indent = len(ln) - len(ln.lstrip())
            if indent <= d_indent:
                break  # saiu do bloco dike
            m = re.match(r'^\s*reconciliacao:\s*(.*)$', ln)
            if m and reconciliacao is None:
                reconciliacao = parse_scalar(m.group(1)); continue
            m = re.match(r'^\s*veredito:\s*(.*)$', ln)
            if m and veredito is None:
                veredito = parse_scalar(m.group(1)); continue
            # assinatura: inline `{ por: "dike", ... }` OU bloco com filho `por:`
            if assinatura_por is None:
                m = re.search(r'por:\s*[\'"]?([A-Za-z0-9_-]+)', ln)
                if m and "assinatura" in ln or (m and re.match(r'^\s*por:', ln)):
                    assinatura_por = m.group(1)

# Veredito final — fail-closed acumulando os motivos.
if not tem_dike:
    erro("INCOMPLETA: secao `dike` ausente — Contrato nao pode subir sem verificacao (fail-closed)", 2)

faltas = []
r = (str(reconciliacao).strip() if reconciliacao is not None else "")
v = (str(veredito).strip() if veredito is not None else "")
a = (str(assinatura_por).strip() if assinatura_por is not None else "")

if r == "":
    faltas.append("reconciliacao vazia")
elif r not in RECON_OK:
    faltas.append(f"reconciliacao invalida ('{r}'; esperado bateu|nao-bateu)")

if v == "":
    faltas.append("veredito vazio")
elif v not in VER_OK:
    faltas.append(f"veredito invalido ('{v}'; esperado sobe|volta-para-correcao)")

if a == "":
    faltas.append("assinatura.por ausente")
elif a != "dike":
    faltas.append(f"assinatura.por != 'dike' (encontrado '{a}')")

if faltas:
    erro("INCOMPLETA: secao `dike` nao esta pronta para subir -> " + "; ".join(faltas), 1)

print(f"PODE-SUBIR: dike completa e assinada (reconciliacao={r}, veredito={v}, assinatura.por={a})")
sys.exit(0)
PY

"$INTERP" "$prog" "$contrato"
rc=$?
exit $rc
