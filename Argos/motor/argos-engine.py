#!/usr/bin/env python3
"""
argos-engine — fachada unificada do motor de scraping do squad Argos (Kolden).

Une "o melhor de cada" repositório vendorizado em `motor/` por trás de uma interface única,
roteando cada coleta para a camada MÍNIMA suficiente (escada de dificuldade). É o "deus das
pesquisas": um ponto de entrada, várias engines.

Camadas (em motor/<repo>, instaláveis via motor/requirements.txt e motor/crawlee-node/):
    estatico  → HTTP simples (Scrapling fetcher / requests)        [verde]
    antibot   → Scrapling StealthyFetcher (anti-bot, seletor adaptativo)  [verde]
    crawl     → Scrapy (crawl em escala, dedup de URL, links exaustivos)  [verde]
    js        → Crawlee (Node, pool de browsers para JS pesado)    [verde]
    visao     → Skyvern (automação por visão LLM em DOM hostil)    [verde]
    research  → GPT-Researcher (pesquisa multi-fonte + citação)    [verde]

REGRAS (Constituição Kolden):
  - REUSE primeiro: nas tasks, tente as tools nativas do Hermes (web_extract/browser_*) antes
    de chamar esta fachada. Use o motor só para anti-bot/escala/JS/visão/pesquisa-LLM.
  - Toda saída carrega FONTE (url) + TIMESTAMP (coleta) — exigência do gate de confiabilidade.
  - modo=cinza SÓ é aceito com marcador de autorização da sessão criado pelo compliance-sentinela
    em .claude/.estado/cinza-autorizado-<session_id>. Sem marcador → recusa. A zona cinza vive em
    `modulo-cinza/`, NUNCA aqui.
  - Credenciais (proxies/chaves) resolvidas via Infisical (/kolden/argos) — nunca em texto puro.

Uso:
  python motor/argos-engine.py harvest  --url URL --dificuldade {estatico,antibot,crawl,js,visao} [--modo verde]
  python motor/argos-engine.py links    --url URL [--profundidade N]        # extração exaustiva de links
  python motor/argos-engine.py research --query "..." [--fontes exa,tavily,firecrawl]
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timezone


# ─────────────────────────────────────────────────────────────────────────────
# Utilidades de proveniência
# ─────────────────────────────────────────────────────────────────────────────
def _now_iso() -> str:
    """Timestamp ISO-8601 UTC — toda coleta é carimbada para o gate de confiabilidade."""
    return datetime.now(timezone.utc).isoformat()


def _envelope(fonte: str, modo: str, dados, dificuldade: str = "", erro: str | None = None) -> dict:
    """Envelope padrão de saída: SEMPRE com fonte + timestamp (proveniência obrigatória)."""
    return {
        "fonte": fonte,
        "timestamp_coleta": _now_iso(),
        "modo": modo,
        "dificuldade": dificuldade,
        "erro": erro,
        "dados": dados,
    }


def _texto_titulo(page) -> str | None:
    """Extrai o <title> de forma robusta a variações de API do Scrapling/Parsel."""
    for tentativa in ("title::text", "title"):
        try:
            sel = page.css(tentativa)
        except Exception:  # noqa: BLE001
            continue
        if sel is None:
            continue
        # API pode expor .get(), ser lista, ou ser TextHandler/str
        try:
            if hasattr(sel, "get"):
                val = sel.get()
            elif isinstance(sel, (list, tuple)):
                val = sel[0] if sel else None
            else:
                val = sel
            if val:
                return str(val).strip()
        except Exception:  # noqa: BLE001
            continue
    return None


def _faltou_dep(nome: str, pacote: str) -> dict:
    return _envelope(
        fonte="",
        modo="",
        dados=None,
        erro=(
            f"Camada '{nome}' indisponível: pacote '{pacote}' não instalado. "
            f"Instale o motor com `pip install -r motor/requirements.txt` "
            f"(e `npm install` em motor/crawlee-node/ para a camada js)."
        ),
    )


# ─────────────────────────────────────────────────────────────────────────────
# Guardrail de zona cinza (defesa em profundidade — o reflexo PreToolUse é a 1ª linha)
# ─────────────────────────────────────────────────────────────────────────────
def _bloqueia_cinza(modo: str) -> dict | None:
    if modo == "cinza":
        return _envelope(
            fonte="",
            modo="cinza",
            dados=None,
            erro=(
                "ZONA ToS-CINZA recusada pela fachada: o motor (motor/) opera SOMENTE em zona verde. "
                "Scraping autenticado vive em `modulo-cinza/` e só é acionado pelo compliance-sentinela "
                "com autorização humana + conta/proxy descartável."
            ),
        )
    return None


# ─────────────────────────────────────────────────────────────────────────────
# Camadas (imports LAZY — só carrega a engine que for usada)
# ─────────────────────────────────────────────────────────────────────────────
def _harvest_estatico(url: str, modo: str) -> dict:
    try:
        from scrapling import Fetcher  # type: ignore
    except Exception as e:  # noqa: BLE001
        return _faltou_dep("estatico", f"scrapling ({e})")
    page = Fetcher.get(url, stealthy_headers=True)
    return _envelope(url, modo, {
        "status": getattr(page, "status", None),
        "titulo": _texto_titulo(page),
        "html_len": len(getattr(page, "html_content", "") or ""),
    }, "estatico")


def _harvest_antibot(url: str, modo: str) -> dict:
    try:
        from scrapling import StealthyFetcher  # type: ignore
    except Exception as e:  # noqa: BLE001
        return _faltou_dep("antibot", f"scrapling ({e})")
    page = StealthyFetcher.fetch(url, headless=True, network_idle=True)
    return _envelope(url, modo, {"status": page.status, "titulo": page.css_first("title::text"),
                                 "html_len": len(page.html_content)}, "antibot")


def _harvest_crawl(url: str, modo: str, profundidade: int = 1) -> dict:
    # Scrapy roda melhor como processo/spider próprio; aqui delegamos a um runner dedicado.
    # O contrato: links exaustivos deduplicados. Implementação real do spider em motor/scrapy/.
    try:
        import scrapy  # noqa: F401  # type: ignore
    except Exception:
        return _faltou_dep("crawl", "scrapy")
    return _envelope(url, modo, {
        "aviso": "Camada crawl: rode o spider dedicado (motor/spiders/links_spider.py) via `scrapy runspider`.",
        "profundidade": profundidade,
    }, "crawl")


def _harvest_js(url: str, modo: str) -> dict:
    # Crawlee é Node — invocamos o serviço em motor/crawlee-node/ por subprocess.
    import subprocess
    import os
    runner = os.path.join(os.path.dirname(__file__), "crawlee-node", "harvest.mjs")
    if not os.path.exists(runner):
        return _envelope(url, modo, None, "js",
                         erro="Camada js: motor/crawlee-node/harvest.mjs ausente. Rode `npm install` em motor/crawlee-node/.")
    try:
        out = subprocess.run(["node", runner, url], capture_output=True, text=True, timeout=120)
        dados = json.loads(out.stdout) if out.stdout.strip() else {"stderr": out.stderr[-500:]}
    except Exception as e:  # noqa: BLE001
        return _envelope(url, modo, None, "js", erro=f"Falha no runner Node: {e}")
    return _envelope(url, modo, dados, "js")


def _harvest_apify(actor: str, input_json: str, modo: str) -> dict:
    """Camada gerenciada: roda um actor do Apify Store e retorna os itens do dataset.
    A infra/proxies/anti-bot ficam do lado da Apify. APIFY_TOKEN via Infisical (nunca literal).
    Nota: actor que toca ToS de plataforma ainda exige juízo do compliance-sentinela."""
    import os
    import json as _json
    try:
        from apify_client import ApifyClient  # type: ignore
    except Exception as e:  # noqa: BLE001
        return _faltou_dep("apify", f"apify-client ({e})")
    token = os.environ.get("APIFY_TOKEN")
    if not token:
        return _envelope(f"apify:{actor}", modo, None, "apify",
                         erro="APIFY_TOKEN ausente no ambiente. Rode sob `infisical run ... --env=dev`.")
    try:
        run_input = _json.loads(input_json) if input_json else {}
    except Exception as e:  # noqa: BLE001
        return _envelope(f"apify:{actor}", modo, None, "apify", erro=f"--input não é JSON válido: {e}")
    def _campo(obj, *nomes):
        """Lê um campo aceitando dict (v2) ou objeto tipado (v3, snake_case/camelCase)."""
        for n in nomes:
            if isinstance(obj, dict) and obj.get(n) is not None:
                return obj[n]
            if hasattr(obj, n):
                return getattr(obj, n)
        return None
    try:
        client = ApifyClient(token)
        run = client.actor(actor).call(run_input=run_input)
        dataset_id = _campo(run, "default_dataset_id", "defaultDatasetId")
        if not dataset_id:
            return _envelope(f"apify:{actor}", modo, None, "apify",
                             erro="Actor rodou mas não retornou defaultDatasetId.")
        itens = [it if isinstance(it, dict) else (it.model_dump() if hasattr(it, "model_dump") else it)
                 for it in client.dataset(dataset_id).iterate_items()]
    except Exception as e:  # noqa: BLE001
        return _envelope(f"apify:{actor}", modo, None, "apify", erro=f"Falha ao rodar actor: {e}")
    return _envelope(f"apify:{actor}", modo, {"actor": actor, "itens_total": len(itens), "itens": itens}, "apify")


def _harvest_visao(url: str, modo: str) -> dict:
    try:
        import skyvern  # noqa: F401  # type: ignore
    except Exception:
        return _faltou_dep("visao", "skyvern")
    return _envelope(url, modo, {
        "aviso": "Camada visao: use o cliente Skyvern (motor/skyvern/) para tarefas guiadas por visão. "
                 "Combine com a tool nativa vision_analyze do Hermes para leitura de criativos.",
    }, "visao")


_ROTAS = {
    "estatico": _harvest_estatico,
    "antibot": _harvest_antibot,
    "crawl": _harvest_crawl,
    "js": _harvest_js,
    "visao": _harvest_visao,
}


def cmd_harvest(args) -> dict:
    bloqueio = _bloqueia_cinza(args.modo)
    if bloqueio:
        return bloqueio
    rota = _ROTAS.get(args.dificuldade)
    if not rota:
        return _envelope(args.url, args.modo, None, args.dificuldade,
                         erro=f"dificuldade inválida: {args.dificuldade}. Use: {', '.join(_ROTAS)}")
    return rota(args.url, args.modo)


def cmd_links(args) -> dict:
    """Extração exaustiva de links — usa a camada crawl (Scrapy) com dedup."""
    bloqueio = _bloqueia_cinza(args.modo)
    if bloqueio:
        return bloqueio
    return _harvest_crawl(args.url, args.modo, profundidade=args.profundidade)


def cmd_research(args) -> dict:
    try:
        from gpt_researcher import GPTResearcher  # noqa: F401  # type: ignore
    except Exception:
        return _faltou_dep("research", "gpt-researcher")
    return _envelope("gpt-researcher", "verde", {
        "query": args.query,
        "fontes": args.fontes.split(",") if args.fontes else ["exa", "tavily", "firecrawl"],
        "aviso": "Instancie GPTResearcher(query, report_type='research_report') e rode conduct_research()+write_report(). "
                 "Plugue os retrievers nos backends do Hermes (Exa/Tavily/Firecrawl) via env. Citação obrigatória.",
    }, "research")


def cmd_apify(args) -> dict:
    """Coleta gerenciada via actor do Apify Store (camada verde-terceirizada)."""
    bloqueio = _bloqueia_cinza(args.modo)
    if bloqueio:
        return bloqueio
    return _harvest_apify(args.actor, args.input, args.modo)


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(prog="argos-engine", description="Motor de scraping unificado do Argos")
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_h = sub.add_parser("harvest", help="Coleta uma URL pela camada de dificuldade escolhida")
    p_h.add_argument("--url", required=True)
    p_h.add_argument("--dificuldade", required=True, choices=list(_ROTAS))
    p_h.add_argument("--modo", default="verde", choices=["verde", "cinza"])
    p_h.set_defaults(func=cmd_harvest)

    p_l = sub.add_parser("links", help="Extração exaustiva de links (crawl + dedup)")
    p_l.add_argument("--url", required=True)
    p_l.add_argument("--profundidade", type=int, default=1)
    p_l.add_argument("--modo", default="verde", choices=["verde", "cinza"])
    p_l.set_defaults(func=cmd_links)

    p_r = sub.add_parser("research", help="Pesquisa LLM multi-fonte com citação (GPT-Researcher)")
    p_r.add_argument("--query", required=True)
    p_r.add_argument("--fontes", default="")
    p_r.set_defaults(func=cmd_research)

    p_a = sub.add_parser("apify", help="Coleta gerenciada via actor do Apify Store (APIFY_TOKEN via Infisical)")
    p_a.add_argument("--actor", required=True, help="ID do actor, ex.: apify/website-content-crawler")
    p_a.add_argument("--input", default="", help="JSON de input do actor (ex.: '{\"startUrls\":[{\"url\":\"...\"}]}')")
    p_a.add_argument("--modo", default="verde", choices=["verde", "cinza"])
    p_a.set_defaults(func=cmd_apify)

    args = parser.parse_args(argv)
    resultado = args.func(args)
    print(json.dumps(resultado, ensure_ascii=False, indent=2))
    return 0 if not resultado.get("erro") else 1


if __name__ == "__main__":
    sys.exit(main())
