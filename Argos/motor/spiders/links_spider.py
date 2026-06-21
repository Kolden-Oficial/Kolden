#!/usr/bin/env python3
"""
Spider de extração EXAUSTIVA de links — camada `crawl` do motor Argos (Scrapy).

Rastreia um domínio a partir de uma URL semente, deduplica e CLASSIFICA cada link
(interno / externo / social / asset), carimbando fonte + timestamp (gate de confiabilidade).
Opera em ZONA VERDE: respeita robots.txt e usa AUTOTHROTTLE. Sem login. A zona ToS-cinza
vive em ../../modulo-cinza/.

Uso:
    scrapy runspider motor/spiders/links_spider.py -a url="https://exemplo.com" -a profundidade=1 -O links.json

Saída: JSON com cada link {url, tipo, origem, timestamp}.
"""
from datetime import datetime, timezone
from urllib.parse import urlparse

import scrapy


SOCIAIS = ("instagram.com", "tiktok.com", "youtube.com", "youtu.be", "linkedin.com",
           "twitter.com", "x.com", "facebook.com", "fb.com", "reddit.com", "pinterest.com")
ASSETS = (".pdf", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".mp4", ".zip",
          ".css", ".js", ".ico", ".woff", ".woff2")


def classifica(link: str, dominio_base: str) -> str:
    host = (urlparse(link).netloc or "").lower()
    caminho = (urlparse(link).path or "").lower()
    if any(caminho.endswith(ext) for ext in ASSETS):
        return "asset"
    if any(s in host for s in SOCIAIS):
        return "social"
    if dominio_base and dominio_base in host:
        return "interno"
    if host:
        return "externo"
    return "relativo"


class LinksSpider(scrapy.Spider):
    name = "argos_links"
    custom_settings = {
        "ROBOTSTXT_OBEY": True,          # zona verde: respeita robots
        "AUTOTHROTTLE_ENABLED": True,    # higiene de coleta (backoff automático)
        "CONCURRENT_REQUESTS": 8,
        "DEPTH_LIMIT": 1,                # sobrescrito por -a profundidade
        "USER_AGENT": "ArgosBot/1.0 (+pesquisa de mercado; respeita robots)",
    }

    def __init__(self, url: str = "", profundidade: int = 1, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if not url:
            raise ValueError("passe -a url='https://...'")
        self.start_urls = [url]
        self.dominio_base = (urlparse(url).netloc or "").lower().replace("www.", "")
        self.custom_settings = {**self.custom_settings, "DEPTH_LIMIT": int(profundidade)}
        self._vistos: set[str] = set()

    def parse(self, response):
        ts = datetime.now(timezone.utc).isoformat()
        for href in response.css("a[href]::attr(href)").getall():
            link = response.urljoin(href)
            if link in self._vistos:
                continue
            self._vistos.add(link)
            tipo = classifica(link, self.dominio_base)
            yield {"url": link, "tipo": tipo, "origem": response.url, "timestamp": ts}
            # Continua o crawl só em links internos (dentro do limite de profundidade)
            if tipo == "interno":
                yield response.follow(href, callback=self.parse)
