---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Relatório de perda (F6.5) — bucket Vendors inertes

- **bucket:** Vendors inertes (5 ferramentas de terceiro, rotas B/D)
- **destino:** catálogo de ferramentas da Kolden (`sobre-a-empresa/Ferramentas/`) — **não** um squad
- **data:** 2026-06-27 · **leva:** `_lote-2026-06-26`
- **disposição única do bucket:** **VENDOR-REGISTRADO** (código NÃO copiado; consumível sob demanda via
  npx/MCP/self-host; análise feita na quarentena gitignored, sem execução)
- **invariante:** 5 ferramentas inventariadas == 5 registradas como vendor · **PERDIDO = 0**

## Disposição (1 linha por ferramenta)

| repo | ferramenta | disposicao | destino | licença + sha |
|---|---|---|---|---|
| yamadashy--repomix | Repomix (CLI empacota repo p/ LLM) | VENDOR-REGISTRADO | `Ferramentas/Repomix/ferramentas.md` | MIT · `f04db00` |
| microsoft--markitdown | MarkItDown (arquivos → Markdown) | VENDOR-REGISTRADO | `Ferramentas/MarkItDown/ferramentas.md` | MIT · `e144e0a` |
| harry0703--MoneyPrinterTurbo | MoneyPrinterTurbo (vídeo curto IA, self-host) | VENDOR-REGISTRADO | `Ferramentas/MoneyPrinterTurbo/ferramentas.md` | MIT (mídia NÃO-MIT) · `ad6aabf` |
| microsoft--playwright-mcp | Playwright MCP (browser local-first) | VENDOR-REGISTRADO | `Ferramentas/PlaywrightMCP/ferramentas.md` | Apache-2.0 · `2d446f9` |
| czlonkowski--n8n-mcp | n8n-MCP (workflows n8n) | VENDOR-REGISTRADO | `Ferramentas/n8n-MCP/ferramentas.md` | MIT · `f5694cc` |

**Contagem:** VENDOR-REGISTRADO = 5 · DESCARTADO = 0 · PERDIDO = 0 · total = 5 = ferramentas do bucket. ✔

## Ressalvas aplicadas (registradas em cada manual)

1. **Sem cópia de código** — apenas a **superfície de consumo** (CLI/MCP/self-host) foi documentada;
   o código-fonte permanece na quarentena gitignored e não é executado. Atribuição (owner/repo@sha +
   licença) no rodapé de cada manual.
2. **Gate Playwright MCP** — `browser_run_code_unsafe`/`browser_evaluate` (RCE-equivalente) registrados
   como **desabilitados por padrão**; ativação só com allowlist explícito + navegador isolado (gancho
   de guardrail → Égide).
3. **Soberania MoneyPrinterTurbo** — registrado como configurável p/ alta soberania (LLM via Ollama,
   TTS/legenda locais); `g4f` mantido desligado; cross-post embutido (upload-post.com) **não adotar** por
   sobrepor Postiz/GHL (Pheme); decisão de adoção fica com o Ronan.
4. **Mídia NÃO-MIT** — fontes/músicas embutidas do MoneyPrinterTurbo têm licenças próprias; sinalizado
   no manual (não redistribuir como MIT).
5. **Credenciais via Infisical** — n8n-MCP (`N8N_API_URL`/`N8N_API_KEY`), backends Azure/LLM do
   MarkItDown e chaves do MoneyPrinterTurbo resolvidos em runtime via Infisical, nunca em texto puro
   (Art. VII).

## Ganchos ADAPT sinalizados (técnica, não código — fora deste bucket de vendor)

Registrados nos `mapa-de-decisao.md` dos repos; **não aplicados** nesta sessão (são para squads, não
para o catálogo de vendors):
- **Playwright MCP** → Dédalo/Prometeu: asserções `verify_*` como técnica de QA de UI · Égide: feature
  `secrets` (redação) como referência de privacidade de vendors.
- **n8n-MCP** → Dédalo: (G7) update de workflow por **diff** token-eficiente · (G12) playbook
  "Claude Project para n8n" (templates-first, validação multinível, never-trust-defaults).
- **Repomix** → Égide: checagem de segredos (secretlint) como referência de boa prática.

Esses ganchos ficam **DIFERIDOS-INCREMENTAL** para a aplicação de squad correspondente — nada se perde:
estão documentados aqui e nos dossiês.

## Índices atualizados

- `sobre-a-empresa/Ferramentas/ferramentas.md` — nova seção **"📦 Vendors inertes (registrados, não
  instalados)"** com as 5 linhas + avisos de gate (Playwright) e soberania (MoneyPrinterTurbo).
- `sobre-a-empresa/Ferramentas/registro-de-ferramentas.yaml` — 5 entradas novas (`status:
  vendor-registrado`) com gatilhos, consumo, licença, sha e ressalvas, mantendo o `.md` e o `.yaml`
  cruzados.

## Pendências de produto (não de absorção)

- **n8n-MCP:** ativação plena exige instância n8n provisionada + API key (sem isso, só tools de
  doc/validação).
- **MoneyPrinterTurbo:** decisão de adoção/self-host pelo Ronan (soberania) antes de integrar a Pheme/Caliope.
- **Playwright MCP / Repomix / MarkItDown:** prontos para `npx`/`uvx` quando o operador quiser; registrar
  no `mcp-status.md` se/quando algum for conectado como servidor MCP.
