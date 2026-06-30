"""Sobe o storage_state.json local para o Infisical.

Lê ~/.kolden/notebooklm/storage_state.json (gerado por `notebooklm login`)
e faz upload para /kolden/prod/NOTEBOOKLM_STORAGE_STATE.

Uso:
    python upload_to_infisical.py
"""

from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

STORAGE = Path.home() / ".kolden" / "notebooklm" / "storage_state.json"
INFISICAL_PROJECT = "43d90b85-ca09-437c-b8f2-364b5cbe6093"
INFISICAL_ENV = "prod"
INFISICAL_KEY = "NOTEBOOKLM_STORAGE_STATE"


def main() -> int:
    if not STORAGE.exists():
        print(f"ERRO: {STORAGE} não existe. Rode `notebooklm login` primeiro.",
              file=sys.stderr)
        return 1

    raw = STORAGE.read_text(encoding="utf-8")
    try:
        parsed = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"ERRO: storage_state.json malformado — {e}", file=sys.stderr)
        return 2

    cookies = len(parsed.get("cookies", []))
    origins = len(parsed.get("origins", []))
    print(f"-> Storage state: {cookies} cookies, {origins} origins")

    # Compacto (single-line) para passar via CLI
    payload = json.dumps(parsed, separators=(",", ":"))

    print(f"-> Upload para Infisical (projectId={INFISICAL_PROJECT[:8]}..., env={INFISICAL_ENV})")
    result = subprocess.run(
        [
            "infisical",
            "secrets",
            "set",
            f"{INFISICAL_KEY}={payload}",
            f"--projectId={INFISICAL_PROJECT}",
            f"--env={INFISICAL_ENV}",
        ],
        capture_output=True,
        text=True,
    )

    if result.returncode != 0:
        print(f"FALHA — stdout: {result.stdout}", file=sys.stderr)
        print(f"        stderr: {result.stderr}", file=sys.stderr)
        return 3

    print("OK — upload concluído.")
    print(f"   Verifique: infisical secrets get {INFISICAL_KEY} --projectId={INFISICAL_PROJECT} --env={INFISICAL_ENV}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
