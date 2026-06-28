#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Hermes — abre-missao  (camada 2: selagem determinística da intenção)
#
# Cria um Contrato de Missão a partir do template, preenchendo SÓ a parte
# DETERMINÍSTICA: a seção `intencao_original` (LACRE) + o `missao.id`. A DoR, a
# matriz de risco e a `ordem_de_maquina` (seção `hermes`) são JUÍZO do agente
# Hermes — preenchidas depois por ele, não por este script.
#
# O lacre usa a MESMA convenção do `confere-hash.sh` da Dike:
#   hash = sha256 hex dos bytes UTF-8 do input_cru EXATAMENTE como escrito,
#   sem newline final; gravado como "sha256:<hex>".
# A serialização é feita com PyYAML (mesmo parser da Dike) para garantir
# round-trip: o que a Dike lê de volta == o que foi lacrado.
#
# Uso:
#   abre-missao.sh --input "<pedido cru do Ronan>" --canal "<whatsapp|telegram|cli|chat>" \
#                  [--slug "<slug-curto>"] [--ts "<ISO-8601>"] [--out "<arquivo.yaml>"]
#
# Saída (stdout): o caminho do Contrato criado. Códigos: 0 ok; 2 erro (fail-closed).
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

RAIZ_KOLDEN="${KOLDEN_ROOT:-C:/Kolden}"
TEMPLATE="$RAIZ_KOLDEN/Olimpo/contratos/contrato-de-missao.template.yaml"
DESTINO_DIR="$RAIZ_KOLDEN/Olimpo/contratos/missoes"

input=""; canal=""; slug=""; ts=""; out=""
while [ $# -gt 0 ]; do
  case "$1" in
    --input) input="${2:-}"; shift 2;;
    --canal) canal="${2:-}"; shift 2;;
    --slug)  slug="${2:-}"; shift 2;;
    --ts)    ts="${2:-}"; shift 2;;
    --out)   out="${2:-}"; shift 2;;
    *) echo "ERRO: argumento desconhecido '$1'"; exit 2;;
  esac
done

[ -z "$input" ] && { echo "ERRO: --input (pedido cru) e obrigatorio"; exit 2; }
[ -z "$canal" ] && canal="cli"
[ ! -f "$TEMPLATE" ] && { echo "ERRO: template ausente -> $TEMPLATE (fail-closed)"; exit 2; }

# Resolve um Python que funcione E tenha PyYAML (round-trip fiel, igual a Dike).
PY=""; PY_YAML=""
for c in python3 python py; do
  if command -v "$c" >/dev/null 2>&1 && "$c" -c "import sys" >/dev/null 2>&1; then
    [ -z "$PY" ] && PY="$c"
    if "$c" -c "import yaml" >/dev/null 2>&1; then PY_YAML="$c"; fi
  fi
done
INTERP="${PY_YAML:-$PY}"
[ -z "$INTERP" ] && { echo "ERRO: Python nao encontrado (fail-closed)"; exit 2; }
[ -z "$PY_YAML" ] && { echo "ERRO: PyYAML ausente — necessario p/ garantir round-trip do lacre (fail-closed)"; exit 2; }

prog="$(mktemp)"; trap 'rm -f "$prog"' EXIT
cat > "$prog" <<'PY'
import sys, os, re, hashlib, datetime, yaml

input_cru = os.environ["ABRE_INPUT"]
canal     = os.environ["ABRE_CANAL"]
slug_in   = os.environ.get("ABRE_SLUG", "").strip()
ts_in     = os.environ.get("ABRE_TS", "").strip()
out_in    = os.environ.get("ABRE_OUT", "").strip()
template  = os.environ["ABRE_TEMPLATE"]
dest_dir  = os.environ["ABRE_DEST"]

# Timestamp real (ISO-8601 local). Este é um script de runtime — pode usar agora.
now = datetime.datetime.now().astimezone()
recebida_em = ts_in if ts_in else now.isoformat(timespec="seconds")

# slug: das 2-4 primeiras palavras alfanuméricas do input
if not slug_in:
    palavras = re.findall(r"[0-9a-zA-ZÀ-ÿ]+", input_cru.lower())[:4]
    slug_in = "-".join(palavras) or "missao"
slug_in = re.sub(r"[^0-9a-z-]+", "-", slug_in.lower()).strip("-")[:40] or "missao"

mid = f"m-{now.strftime('%Y%m%d-%H%M%S')}-{slug_in}"

# LACRE: sha256 dos bytes UTF-8 do input_cru, sem newline final (convenção Dike).
sha = hashlib.sha256(input_cru.encode("utf-8")).hexdigest()

with open(template, encoding="utf-8") as f:
    contrato = yaml.safe_load(f)

io = contrato["missao"]["intencao_original"]
contrato["missao"]["id"] = mid
io["input_cru"]   = input_cru
io["canal"]       = canal
io["recebida_em"] = recebida_em
io["hash"]        = f"sha256:{sha}"

destino = out_in if out_in else os.path.join(dest_dir, mid + ".yaml")
os.makedirs(os.path.dirname(destino), exist_ok=True)
with open(destino, "w", encoding="utf-8") as f:
    f.write("# Contrato de Missão — gerado por Hermes/scripts/abre-missao.sh\n")
    f.write("# intencao_original LACRADA (não editar). Demais seções preenchidas pelas camadas.\n")
    yaml.safe_dump(contrato, f, allow_unicode=True, sort_keys=False, width=4096)

# Verificação interna: reabre e confere que o hash recomputado bate (round-trip).
with open(destino, encoding="utf-8") as f:
    chk = yaml.safe_load(f)
cio = chk["missao"]["intencao_original"]
recalc = hashlib.sha256(str(cio["input_cru"]).encode("utf-8")).hexdigest()
armaz = str(cio["hash"]).split(":",1)[1] if ":" in str(cio["hash"]) else str(cio["hash"])
if recalc != armaz:
    sys.stderr.write("ERRO: round-trip do lacre falhou — input_cru nao sobreviveu a serializacao\n")
    sys.exit(2)

print(destino)
PY

ABRE_INPUT="$input" ABRE_CANAL="$canal" ABRE_SLUG="$slug" ABRE_TS="$ts" ABRE_OUT="$out" \
ABRE_TEMPLATE="$TEMPLATE" ABRE_DEST="$DESTINO_DIR" "$INTERP" "$prog"
rc=$?
exit $rc
