"""Verifica que a autenticação NotebookLM está válida.

Usa o storage_state vindo de:
  - variável de ambiente NOTEBOOKLM_STORAGE_STATE (Infisical via `infisical run`)
  - ou fallback para ~/.kolden/notebooklm/storage_state.json

Lista os notebooks da conta. Se ≥30 → OK. Se RPCError → cookie expirado.

Uso:
    infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python verify_auth.py
    # ou fallback local:
    python verify_auth.py --local
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import sys
from pathlib import Path

try:
    from notebooklm import NotebookLMClient, RPCError  # type: ignore
except ImportError as e:
    print(f"ERRO: dependência ausente — {e}", file=sys.stderr)
    print('Instale com: uv tool install "notebooklm-py[cookies]"', file=sys.stderr)
    sys.exit(2)

LOCAL_STORAGE = Path.home() / ".kolden" / "notebooklm" / "storage_state.json"


def load_storage_state(use_local: bool) -> dict:
    if not use_local:
        raw = os.environ.get("NOTEBOOKLM_STORAGE_STATE")
        if raw:
            return json.loads(raw)
        print("AVISO: NOTEBOOKLM_STORAGE_STATE não está no env; tentando local...",
              file=sys.stderr)
    if LOCAL_STORAGE.exists():
        return json.loads(LOCAL_STORAGE.read_text(encoding="utf-8"))
    raise FileNotFoundError(
        "Sem storage_state. Rode bootstrap_auth.py para gerar."
    )


async def main_async(use_local: bool) -> int:
    try:
        state = load_storage_state(use_local)
    except Exception as e:
        print(f"ERRO ao carregar storage_state: {e}", file=sys.stderr)
        return 1

    client = NotebookLMClient(storage_state=state)
    try:
        notebooks = await client.notebooks.list()
    except RPCError as e:
        print(f"RPCError: {e}", file=sys.stderr)
        print("Provável cookie expirado. Rode bootstrap_auth.py.", file=sys.stderr)
        return 4
    except Exception as e:
        print(f"ERRO inesperado: {e}", file=sys.stderr)
        return 1

    count = len(notebooks)
    print(f"OK — {count} notebooks encontrados:")
    for nb in notebooks[:5]:
        print(f"  - {nb.title} ({nb.sources_count} fontes)")
    if count > 5:
        print(f"  ... e mais {count - 5}")

    if count < 30:
        print(f"AVISO: esperava ≥30 notebooks; vi {count}. Confirme se é a conta certa.",
              file=sys.stderr)
        return 5

    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", action="store_true",
                        help="usa ~/.kolden/notebooklm/storage_state.json em vez de env var")
    args = parser.parse_args()
    return asyncio.run(main_async(args.local))


if __name__ == "__main__":
    sys.exit(main())
