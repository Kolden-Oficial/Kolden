---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# PageSpeed Insights API — Referência de Uso

API do Google que mede performance de páginas web (Core Web Vitals, Lighthouse: performance, acessibilidade, SEO, best-practices) — lab data + field data (CrUX). Categoria: Analytics / Web. **Uso direto via API** (não há MCP necessário; é uma chamada REST simples).

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| GOOGLE_DRIVE_API_KEY *(API key Google geral)* | `/kolden/dev/GOOGLE_DRIVE_API_KEY` ✅ validada 2026-06-24 |

> Art. VII: nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>` (no Windows, sob SAC, via o shim Node `~/.claude/infisical-shim.cjs` — ver `reference_mcp_infisical_sac_shim`).
>
> **Nota de naming:** o nome `GOOGLE_DRIVE_API_KEY` é genérico — esta é uma **API key Google** (serve PageSpeed + YouTube Data; o Drive em si usa OAuth, não key). Funciona; renomear para `GOOGLE_API_KEY` é opcional. A mesma key serve a **YouTube Data API** (ver `YouTubeData/ferramentas.md`). Validada ao vivo: PageSpeed score 0.96 numa URL real.

---

## Pré-requisitos no GCP

- Projeto: `gen-lang-client-0988823565` (nº `1098911614973`).
- API habilitada: `pagespeedonline.googleapis.com` (via `gcloud services enable pagespeedonline.googleapis.com`).

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://developers.google.com/speed/docs/insights/v5/get-started |
| Referência da API | https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed |
| Core Web Vitals | https://web.dev/articles/vitals |

---

## MCP

- **Disponível?** não é necessário — chamada REST única. Há wrappers comunitários, mas o uso direto via `curl`/SDK é mais simples e é o padrão Kolden para esta API.

---

## Uso básico

- **Endpoint:** `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`
- **Parâmetros principais:** `url` (obrigatório), `strategy` (`mobile`|`desktop`), `category` (repetível: `performance`, `accessibility`, `seo`, `best-practices`, `pwa`), `key`.

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- bash -c '
curl -s "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://kolden.com.br&strategy=mobile&category=performance&category=seo&key=$PAGESPEED_API_KEY" \
  | python -c "import sys,json; d=json.load(sys.stdin); print(\"score:\", d[\"lighthouseResult\"][\"categories\"][\"performance\"][\"score\"])"
'
```

---

## Notas Kolden

- **Quem usa:** squad **Metis** (auditoria de performance/SEO de páginas e LPs).
- Field data (CrUX) só aparece para URLs com tráfego suficiente; lab data (Lighthouse) sempre vem.
- Rate limit padrão: 25k req/dia, 240 req/min por key — folgado para auditorias.
- Nunca exportar a key literal; sempre via Infisical.
