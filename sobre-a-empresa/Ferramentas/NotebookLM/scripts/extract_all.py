"""Extração massiva de fontes de NotebookLM → Kolden.

Usa notebooklm-py 0.7.3+ API:
  - async with NotebookLMClient.from_storage(path) as client
  - await client.notebooks.list()
  - await client.sources.list(notebook_id)
  - await client.sources.get_fulltext(nb_id, src_id, output_format="markdown")

Retry de rate-limit é built-in (rate_limit_max_retries=3 default no client).
Concorrência: asyncio.Semaphore(8) limita extrações simultâneas.
Falha não-fatal de 1 source → log + continua.

Uso:
    uv run --with "notebooklm-py[cookies,browser]" --with pyyaml \
        python extract_all.py [--storage PATH] [--limit N] [--dry-run]
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import re
import sys
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

import yaml  # type: ignore

try:
    from notebooklm import NotebookLMClient  # type: ignore
except ImportError as e:
    print(f"ERRO: dependência ausente — {e}", file=sys.stderr)
    print('Rode com: uv run --with "notebooklm-py[cookies,browser]" --with pyyaml python extract_all.py',
          file=sys.stderr)
    sys.exit(2)


REPO_ROOT = Path(__file__).resolve().parents[4]
MAPEAMENTO = Path(__file__).parent.parent / "mapeamento.yaml"
DEFAULT_STORAGE = Path.home() / ".kolden" / "notebooklm" / "storage_state.json"
LOG_DIR = Path(__file__).parent.parent / "registros"
LOG_FILE = LOG_DIR / f"{time.strftime('%Y-%m-%d')}-extracao.log"

CONCURRENCY = 8


@dataclass
class ExtractionStats:
    total: int = 0
    ok: int = 0
    failed: int = 0
    skipped: int = 0
    errors: list[tuple[str, str, str]] = field(default_factory=list)
    start: float = field(default_factory=time.time)

    def report(self) -> str:
        elapsed = time.time() - self.start
        return (
            f"Total: {self.total} | OK: {self.ok} | Falhou: {self.failed} | "
            f"Skipped: {self.skipped} | Tempo: {elapsed/60:.1f}min"
        )


def slugify(text: str, max_len: int = 80) -> str:
    s = text.strip().lower()
    s = re.sub(r"[^\w\s-]", "", s, flags=re.UNICODE)
    s = re.sub(r"[-\s]+", "-", s)
    s = s.strip("-")
    if len(s) > max_len:
        s = s[:max_len].rsplit("-", 1)[0]
    return s or "untitled"


def yaml_fm(value: Any) -> str:
    """Encoda valor para frontmatter YAML inline."""
    if value is None:
        return "null"
    if isinstance(value, list):
        if not value:
            return "[]"
        return "[" + ", ".join(yaml_fm(v) for v in value) + "]"
    s = str(value).replace('\\', '\\\\').replace('"', '\\"').replace("\n", " ")
    return f'"{s}"'


def write_log(log_fh, level: str, *parts):
    log_fh.write("\t".join([time.strftime("%H:%M:%S"), level, *map(str, parts)]) + "\n")
    log_fh.flush()


async def extract_one_source(
    client: NotebookLMClient,
    notebook,
    source,
    destino: Path,
    notebook_titulo: str,
    stats: ExtractionStats,
    log_fh,
) -> dict | None:
    """Extrai 1 source para arquivo .md. Retorna metadata para o _indice."""
    titulo = getattr(source, "title", None) or f"source-{source.id[:8]}"
    src_type = getattr(source, "type", None) or getattr(source, "source_type", None) or "unknown"
    src_url = getattr(source, "url", None) or getattr(source, "uri", None)

    # get_fulltext (retry built-in)
    try:
        ft = await client.sources.get_fulltext(
            notebook.id, source.id, output_format="markdown"
        )
    except Exception as e:
        msg = f"get_fulltext: {type(e).__name__}: {e}"
        stats.errors.append((notebook_titulo, source.id, msg))
        stats.failed += 1
        write_log(log_fh, "FAIL", notebook_titulo, source.id, msg)
        return {"source_id": source.id, "titulo": titulo, "tipo": src_type,
                "url": src_url, "filename": None, "ok": False}

    # get_guide é opcional
    summary = None
    keywords = None
    try:
        guide = await client.sources.get_guide(notebook.id, source.id)
        summary = getattr(guide, "summary", None)
        keywords = getattr(guide, "keywords", None)
        if isinstance(keywords, str):
            keywords = [k.strip() for k in keywords.split(",") if k.strip()]
    except Exception as e:
        write_log(log_fh, "WARN", notebook_titulo, source.id, f"no_guide: {e}")

    # Conteúdo
    content = (
        getattr(ft, "content", None)
        or getattr(ft, "text", None)
        or getattr(ft, "markdown", None)
        or str(ft)
    )

    # Filename
    filename_slug = slugify(titulo)
    filename = f"{filename_slug}.md"
    file_path = destino / filename
    counter = 1
    while file_path.exists():
        filename = f"{filename_slug}-{counter}.md"
        file_path = destino / filename
        counter += 1

    fm_lines = [
        "---",
        f"id_fonte: {yaml_fm(source.id)}",
        f"notebook_id: {yaml_fm(notebook.id)}",
        f"notebook_titulo: {yaml_fm(notebook_titulo)}",
        f"titulo: {yaml_fm(titulo)}",
        f"tipo: {yaml_fm(src_type)}",
        f"url_original: {yaml_fm(src_url)}",
        f"keywords: {yaml_fm(keywords)}",
        f"summary: {yaml_fm(summary)}",
        f"extraido_em: {yaml_fm(time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()))}",
        'extraido_por: "notebooklm-py-0.7.3"',
        "---",
        "",
        f"# {titulo}",
        "",
        content if isinstance(content, str) else str(content),
        "",
    ]
    file_path.write_text("\n".join(fm_lines), encoding="utf-8")
    stats.ok += 1
    write_log(log_fh, "OK", notebook_titulo, source.id, filename)
    return {"source_id": source.id, "titulo": titulo, "tipo": src_type,
            "url": src_url, "filename": filename, "ok": True}


async def extract_notebook(
    client: NotebookLMClient,
    notebook,
    entry: dict,
    semaphore: asyncio.Semaphore,
    stats: ExtractionStats,
    log_fh,
) -> list[dict]:
    notebook_titulo = entry["titulo"]
    destino = REPO_ROOT / entry["destino"]
    destino.mkdir(parents=True, exist_ok=True)

    try:
        sources = await client.sources.list(notebook.id)
    except Exception as e:
        msg = f"sources.list: {type(e).__name__}: {e}"
        stats.errors.append((notebook_titulo, "n/a", msg))
        write_log(log_fh, "FAIL_LIST", notebook_titulo, "n/a", msg)
        return []

    if not sources:
        write_log(log_fh, "EMPTY", notebook_titulo, "-", "no_sources")
        return []

    print(f"  [{notebook_titulo}] {len(sources)} sources")

    async def with_sem(src):
        async with semaphore:
            stats.total += 1
            return await extract_one_source(
                client, notebook, src, destino, notebook_titulo, stats, log_fh
            )

    results = await asyncio.gather(*[with_sem(s) for s in sources], return_exceptions=False)
    return [r for r in results if r is not None]


def write_indice(destino: Path, notebook_titulo: str, notebook_id: str,
                 indice_entries: list[dict]) -> None:
    lines = [
        "---",
        f'notebook_id: "{notebook_id}"',
        f"notebook_titulo: {yaml_fm(notebook_titulo)}",
        f"total_fontes: {len(indice_entries)}",
        f"extraido_em: {yaml_fm(time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()))}",
        "---",
        "",
        f"# Índice — {notebook_titulo}",
        "",
        f"Notebook ID: `{notebook_id}` · Fontes: **{len(indice_entries)}**",
        "",
        "| # | Título | Tipo | Arquivo | Status |",
        "|---|---|---|---|---|",
    ]
    for i, e in enumerate(indice_entries, 1):
        titulo = (e.get("titulo") or "").replace("|", "\\|")[:100]
        tipo = e.get("tipo") or "?"
        filename = e.get("filename") or "—"
        status = "OK" if e.get("ok") else "FAIL"
        filename_md = f"[{filename}]({filename})" if filename and e.get("ok") else (filename or "—")
        lines.append(f"| {i:02d} | {titulo} | {tipo} | {filename_md} | {status} |")

    indice_path = destino / "_indice.md"
    if indice_path.exists():
        # Caso de fusão (ex: 2 notebooks Omiron no mesmo destino)
        existing = indice_path.read_text(encoding="utf-8")
        marker = f"\n\n<!-- aditivo {notebook_titulo} -->\n"
        if marker not in existing:
            with indice_path.open("a", encoding="utf-8") as f:
                f.write(marker)
                f.write("\n".join(lines[7:]))
        return
    indice_path.write_text("\n".join(lines), encoding="utf-8")


def load_storage_state_path(arg_path: Path) -> Path:
    """Resolve qual path usar. Por enquanto sempre arquivo local."""
    if arg_path.exists():
        return arg_path
    raise FileNotFoundError(
        f"Sem storage_state em {arg_path}. Rode `notebooklm login` primeiro."
    )


async def main_async(args) -> int:
    LOG_DIR.mkdir(parents=True, exist_ok=True)

    try:
        storage_path = load_storage_state_path(args.storage)
    except Exception as e:
        print(f"ERRO: {e}", file=sys.stderr)
        return 1

    print(f"-> Usando storage state: {storage_path}")

    config = yaml.safe_load(MAPEAMENTO.read_text(encoding="utf-8"))
    entries = config["notebooks"]
    if args.limit:
        entries = entries[: args.limit]
        print(f"-> Limit aplicado: processando {len(entries)} notebooks")

    semaphore = asyncio.Semaphore(CONCURRENCY)
    stats = ExtractionStats()

    async with NotebookLMClient.from_storage(str(storage_path)) as client:
        print("-> Listando notebooks da conta...")
        all_notebooks = await client.notebooks.list()
        print(f"   {len(all_notebooks)} notebooks visíveis")
        by_title = {nb.title: nb for nb in all_notebooks}

        if args.dry_run:
            print("\n=== DRY RUN ===")
            found = missing = 0
            for e in entries:
                nb = by_title.get(e["titulo"])
                if nb:
                    found += 1
                    sc = getattr(nb, "sources_count", "?")
                    print(f"  OK  {e['titulo']}: {sc} fontes")
                else:
                    missing += 1
                    # Tenta match case-insensitive ou substring
                    candidates = [t for t in by_title if t.lower() == e["titulo"].lower()]
                    if not candidates:
                        candidates = [t for t in by_title if e["titulo"] in t or t in e["titulo"]]
                    print(f"  MISS {e['titulo']}")
                    for c in candidates[:3]:
                        print(f"        ?? {c}")
            print(f"\nResumo: {found} ok / {missing} miss / {len(entries)} total")
            return 0 if missing == 0 else 6

        with LOG_FILE.open("a", encoding="utf-8") as log_fh:
            write_log(log_fh, "START", "session", time.strftime("%Y-%m-%d %H:%M:%S"))

            for entry in entries:
                nb = by_title.get(entry["titulo"])
                if nb is None:
                    print(f"  [{entry['titulo']}] NÃO ENCONTRADO — pulando")
                    stats.skipped += 1
                    write_log(log_fh, "SKIP", entry["titulo"], "-", "not_in_account")
                    continue
                try:
                    indice = await extract_notebook(client, nb, entry, semaphore, stats, log_fh)
                    destino = REPO_ROOT / entry["destino"]
                    write_indice(destino, entry["titulo"], nb.id, indice)
                except Exception as e:
                    msg = f"{type(e).__name__}: {e}"
                    print(f"  [{entry['titulo']}] erro fatal: {msg}", file=sys.stderr)
                    write_log(log_fh, "FATAL", entry["titulo"], "-", msg)
                print(f"  Progresso: {stats.report()}")

            write_log(log_fh, "END", "session", stats.report())

    print(f"\nFINAL: {stats.report()}")
    print(f"Log: {LOG_FILE}")
    if stats.errors:
        print(f"\n{len(stats.errors)} erros (primeiros 10):")
        for nb_t, src_id, msg in stats.errors[:10]:
            print(f"  - {nb_t} :: {src_id[:12]} :: {msg}")
    return 0 if stats.failed < max(1, stats.ok) * 0.1 else 5


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--storage", type=Path, default=DEFAULT_STORAGE,
                        help="caminho do storage_state.json")
    parser.add_argument("--limit", type=int, help="só N primeiros notebooks (smoke test)")
    parser.add_argument("--dry-run", action="store_true", help="só lista, não extrai")
    args = parser.parse_args()
    return asyncio.run(main_async(args))


if __name__ == "__main__":
    sys.exit(main())
