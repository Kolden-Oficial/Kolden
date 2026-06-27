---
name: extracao-defuddle
description: Extrair markdown limpo de uma página web com o Defuddle CLI — remove navegação, anúncios e ruído, economizando tokens. Use como alternativa LEVE e LOCAL ao Firecrawl/`web_extract` quando a página for um artigo, post de blog, documentação ou notícia padrão (HTML estático legível) e você só quer o texto + metadados, sem render de JS nem anti-bot. NÃO use para alvos com JS pesado, anti-bot ou login (esses são do motor/`compliance-sentinela`), nem para URLs que já terminam em .md.
---

# Habilidade: extracao-defuddle (web → markdown limpo, local)

O **Defuddle** é um extrator de legibilidade (readability) que roda **localmente** via CLI e devolve
o conteúdo principal de uma página em markdown, descartando menu, rodapé, anúncios e boilerplate.
É a opção **mais barata em tokens** da escada de coleta, antes de gastar Firecrawl/motor.

## Onde encaixa na escada do Argos

| Alvo | Ferramenta preferida |
|---|---|
| Artigo/blog/doc/notícia estática, só quero o texto | **Defuddle** (esta skill) — local, sem chave |
| Página estática mas quero crawl/map/scrape em escala | MCP `firecrawl_scrape` / `firecrawl_map` |
| JS pesado / anti-bot / seletor que muda | **motor** (`argos-engine`: Scrapling/Crawlee/Skyvern) |
| Login / ToS-risco | **NÃO** colete aqui — `compliance-sentinela` |

REUSE primeiro: se `web_extract` (Hermes) já resolve sem custo, use-o. Defuddle brilha quando você
quer o markdown limpo **localmente** (soberano, sem mandar a URL a um SaaS) e economizando contexto.

## Uso

```bash
# instalar (uma vez): npm install -g defuddle
defuddle parse <url> --md                 # markdown no stdout (opção padrão)
defuddle parse <url> --md -o conteudo.md   # salva em arquivo
defuddle parse <url> --json                # JSON com HTML + markdown
defuddle parse <url> -p title              # só um metadado (title/description/domain/...)
```

| Flag | Saída |
|---|---|
| `--md` | Markdown (escolha padrão) |
| `--json` | JSON com HTML e markdown |
| (nenhuma) | HTML |
| `-p <nome>` | propriedade de metadado específica |

Execução via tool nativa `terminal` do Hermes.

## Regras (herdadas do Argos)

1. **Proveniência.** O markdown extraído entra no relatório **com a URL de origem + timestamp** da
   extração (gate ARGOS-CL-001). Capture `-p domain`/`-p title` para registrar a fonte.
2. **Zona verde apenas.** Defuddle é para páginas públicas legítimas; nunca para contornar login/ToS.
3. **Não é render.** Se a página depende de JS para mostrar o conteúdo, o Defuddle volta vazio/parcial
   → suba para o motor (`argos-engine`), não insista.
4. **Soberania a favor.** Por rodar local, prefira-o ao Firecrawl quando não precisar de crawl/escala.

---
*Fonte: `kepano/obsidian-skills@a1dc48e` (skills/defuddle/SKILL.md, ID G9) — licença MIT.
Reescrito/adaptado em PT-BR ao contexto do Argos; sem cópia literal.*
