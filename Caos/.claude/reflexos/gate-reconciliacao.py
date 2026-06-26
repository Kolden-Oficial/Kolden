#!/usr/bin/env python3
# Gate de RECONCILIAÇÃO da absorção (Constituição, Art. VIII).
# BLOCK do pipeline se houver perda NÃO-DISPOSTA. Lê os dois .md de tabela
# (inventário F3 + relatório de perda F6.5) e confere a aritmética. exit 2 = bloqueia.
#
# Invariante: count(ABSORVIDO) + count(DESCARTADO) + count(PERDIDO) == count(inventário F3),
# com PERDIDO == 0 e todo DESCARTADO com motivo. Não é juízo do modelo; é contagem.
#
# Uso: gate-reconciliacao.py <slug>   onde <slug> = <owner>--<repo>@<sha-curto>
import os
import re
import sys
import pathlib

if len(sys.argv) < 2 or not sys.argv[1].strip():
    print("BLOCK: slug do repo ausente (esperado <owner>--<repo>@<sha>)")
    sys.exit(2)

repo = sys.argv[1].strip()

# Ancora a base em $CLAUDE_PROJECT_DIR (raiz do projeto Caos) quando disponível —
# o hook não garante o CWD. Fallback: CWD (uso manual a partir da raiz do Caos).
raiz = os.environ.get("CLAUDE_PROJECT_DIR", ".")
base = pathlib.Path(raiz) / "registros" / "absorcao" / repo
inv = base / "inventario-de-capacidades.md"
rel = base / "relatorio-de-perda.md"


def ids(p):
    # F3 é obrigatório: artefato ausente -> BLOCK (mata o "WARN se <100%").
    if not p.exists():
        print(f"BLOCK: artefato ausente -> {p}")
        sys.exit(2)
    out = []
    for ln in p.read_text(encoding="utf-8").splitlines():
        m = re.match(r"\|\s*(G\d+)\s*\|", ln)
        if m:
            out.append(m.group(1))
    return out


def rows(p):
    if not p.exists():
        print(f"BLOCK: relatorio-de-perda.md ausente -> {p}")
        sys.exit(2)
    r = {}
    for ln in p.read_text(encoding="utf-8").splitlines():
        c = [x.strip() for x in ln.split("|")]
        # c[0] é vazio (linha começa com '|'); o ID fica em c[1].
        if len(c) >= 4 and re.match(r"G\d+$", c[1]):
            r[c[1]] = (c[2], c[3])  # id -> (disposicao, destino_ou_motivo)
    return r


inv_ids = set(ids(inv))
rep = rows(rel)
rep_ids = set(rep)

faltam = inv_ids - rep_ids  # itens sem disposição = silenciosos
if faltam:
    print(f"BLOCK: {len(faltam)} capacidade(s) SEM disposição (perda silenciosa): {sorted(faltam)}")
    sys.exit(2)

perdidos = [i for i, (d, _) in rep.items() if d.upper() == "PERDIDO"]
if perdidos:
    print(f"BLOCK: {len(perdidos)} PERDIDO(s) sem absorção nem motivo: {sorted(perdidos)}")
    sys.exit(2)

sem_motivo = [i for i, (d, m) in rep.items() if d.upper() == "DESCARTADO" and not m]
if sem_motivo:
    print(f"BLOCK: DESCARTADO sem motivo registrado: {sorted(sem_motivo)}")
    sys.exit(2)

# Aritmética final: toda capacidade do inventário disposta exatamente uma vez.
total, disp = len(inv_ids), len(rep_ids & inv_ids)
if total != disp:
    print(f"BLOCK: soma das disposições ({disp}) != inventário ({total})")
    sys.exit(2)

print(f"OK: {total} capacidades, 100% dispostas, PERDIDO=0. TPND=0 garantido por contagem.")
sys.exit(0)
