---
tipo: nota
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
relacionado:
  - "[[Ariadne/README|README]]"
---

# Instalação — Squad Ariadne

## Pré-requisitos
1. **Infisical** com o path `/kolden/ariadne` provisionado (token de sessão já injetado pelo humano).
2. **Tools já no catálogo** (funcionam de imediato): Hermes (web_search/web_extract/browser_*),
   PageSpeed Insights, Search Console (ADC), GA4 (ADC), Firecrawl, Browserbase, Exa.
3. **Tools a provisionar** (precisam de conta + credencial Infisical antes do uso real — até lá, os
   agentes as citam como "a provisionar" e não prometem o número): Semrush, Ahrefs, DataForSEO,
   RankParse, Hotjar, Optimizely. Ver `sobre-a-empresa/Ferramentas/matriz-de-marketing-absorvida.md`.

## Como ativar
- Abra o projeto `C:\Kolden\Ariadne\` no Claude Code — o `CLAUDE.md` é a identidade do squad.
- `@ariadne-chief` → ponto de entrada. Comandos: `*diagnose` (tria + roteia), `*journey` (jornada
  completa SEO+CRO), ou `*audit`/`*architecture`/`*schema`/`*content`/`*ai-seo`/`*cro`/`*form`.
- Ativar especialista direto: `@ariadne:auditor-tecnico-seo` (e demais).

## Handoffs a configurar
- **Entrada ← Argos:** ao faltar keywords/SERP/concorrência, a chief pede o handoff do Argos.
- **Saída → Caliope** (copy), **→ Metis** (medição/leitura de teste), **↔ Aglaia** (marca).

## Reflexos (`.claude/reflexos/`, configurados em `.claude/settings.json`)
- PreToolUse `pre-ferramenta.sh` (guardrails mecânicos: rm -rf, push --force, leitura de .env, credencial em texto puro).
- PostToolUse `pos-escrita.sh` (auditoria em `registros/auditoria.log`) + `marca-trabalho.sh`.
- Stop `encerramento-aprendizado.sh` (ritual obrigatório → MEMORY.md).
- SessionStart `inicio-sessao.sh` + `verificacao-diaria.sh`.

## Provisão de uma tool "a provisionar"
1. Criar a conta e gravar a chave em `/kolden/ariadne/<NOME>_API_KEY` no Infisical (Art. VII).
2. Atualizar a linha em `ferramentas.md` (remover "a provisionar").
3. Se houver MCP, registrar em `sobre-a-empresa/Ferramentas/mcp-status.md`.

## Verificação pós-instalação
- `*diagnose` com uma URL real roteia ao especialista certo.
- Rodar `roteiro-de-teste.md` (smoke tests) — maturity ≥7.0 para considerar pronto.
