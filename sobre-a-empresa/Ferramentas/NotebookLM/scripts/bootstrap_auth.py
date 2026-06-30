"""Bootstrap de autenticação NotebookLM via cookies do Chrome.

Extrai cookies do Chrome do Ronan (já logado em https://notebooklm.google.com),
gera storage_state.json em ~/.kolden/notebooklm/, e faz upload para Infisical
em /kolden/prod/NOTEBOOKLM_STORAGE_STATE.

Pré-requisito: Chrome com sessão ativa do NotebookLM.

Uso:
    python bootstrap_auth.py [--no-upload]
"""

from __future__ import annotations

import argparse
import json
import os
import stat
import subprocess
import sys
from pathlib import Path

try:
    import rookiepy  # type: ignore
    from notebooklm.auth import (
        REQUIRED_COOKIE_DOMAINS,
        convert_rookiepy_cookies_to_storage_state,
    )
except ImportError as e:
    print(f"ERRO: dependência ausente — {e}", file=sys.stderr)
    print('Instale com: uv tool install "notebooklm-py[cookies]"', file=sys.stderr)
    sys.exit(2)

STORAGE_DIR = Path.home() / ".kolden" / "notebooklm"
STORAGE_PATH = STORAGE_DIR / "storage_state.json"
INFISICAL_PROJECT = "43d90b85-ca09-437c-b8f2-364b5cbe6093"
INFISICAL_ENV = "prod"
INFISICAL_KEY = "NOTEBOOKLM_STORAGE_STATE"


def extract_cookies() -> dict:
    """Extrai cookies do Chrome e converte para storage_state."""
    print(f"-> Extraindo cookies do Chrome para domínios {len(REQUIRED_COOKIE_DOMAINS)}...")
    raw = rookiepy.chrome(domains=list(REQUIRED_COOKIE_DOMAINS))
    if not raw:
        raise RuntimeError(
            "Nenhum cookie extraído do Chrome. Confirme que está logado em "
            "https://notebooklm.google.com e que o Chrome não está aberto "
            "(rookiepy lê o SQLite que o Chrome trava enquanto roda)."
        )
    state = convert_rookiepy_cookies_to_storage_state(raw)
    cookies_count = len(state.get("cookies", []))
    origins_count = len(state.get("origins", []))
    print(f"   OK — {cookies_count} cookies, {origins_count} origins")
    return state


def save_local(state: dict) -> Path:
    """Salva storage_state.json em ~/.kolden/notebooklm/ com permissões restritas."""
    STORAGE_DIR.mkdir(parents=True, exist_ok=True)
    STORAGE_PATH.write_text(json.dumps(state, indent=2), encoding="utf-8")
    # Permissões 0600 (apenas o usuário lê) — no-op no Windows, mas mantém intenção
    try:
        STORAGE_PATH.chmod(stat.S_IRUSR | stat.S_IWUSR)
    except Exception:
        pass
    print(f"-> Salvo em {STORAGE_PATH}")
    return STORAGE_PATH


def upload_infisical(state: dict) -> bool:
    """Faz upload para Infisical /kolden/prod/NOTEBOOKLM_STORAGE_STATE."""
    payload = json.dumps(state, separators=(",", ":"))  # compacto
    print(f"-> Upload para Infisical (projectId={INFISICAL_PROJECT}, env={INFISICAL_ENV})...")
    # Tenta `set` (update se existir, create se não)
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
        print(f"   FALHA — stdout: {result.stdout}", file=sys.stderr)
        print(f"           stderr: {result.stderr}", file=sys.stderr)
        return False
    print(f"   OK")
    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--no-upload", action="store_true", help="só salva local, sem Infisical")
    args = parser.parse_args()

    try:
        state = extract_cookies()
    except Exception as e:
        print(f"ERRO na extração: {e}", file=sys.stderr)
        return 1

    save_local(state)

    if args.no_upload:
        print("-> --no-upload — pulando Infisical")
        return 0

    if not upload_infisical(state):
        print("ERRO: upload Infisical falhou. Storage local OK em "
              f"{STORAGE_PATH} — você pode subir manualmente depois.", file=sys.stderr)
        return 3

    print("OK — auth bootstrapped (local + Infisical).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
