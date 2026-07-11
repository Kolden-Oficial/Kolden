---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# Manifesto do Lote de Absorção — 2026-06-26

**Origem:** planilha `repos-claude-github` (Google Sheet `1OQAS3umei2xCL3aq0-voR-V9Vl-HIB07NFQQrPt363M`, aba `Repositorios`, 37 linhas).
**Contrato de Missão:** `Olimpo/contratos/missoes/m-20260626-204500-absorve-lote-repos-planilha.yaml`
**Modo:** absorção plena solo (Ronan off 24h, F5 delegada ao Hermes, carimbada). Zero commit. Gate F2 e reconciliação F6.5 intactos.
**Dedup F0:** ledger `repositorios-absorvidos.yaml` contém só `coreyhaines31/marketingskills` → nenhum dos 31 novos colide. Todos = **NOVO**.

## Não-clonáveis (conectores MCP hospedados — fora do escopo de clone)
| # | Item | URL | Motivo |
|---|---|---|---|
| 33 | Notion (MCP) | mcp.notion.com | endpoint hospedado, não é repo git |
| 34 | Google Drive (MCP) | developers.google.com | conector, não é repo git |
| 36 | Zapier (MCP) | mcp.zapier.com | endpoint hospedado, não é repo git |

## Já presentes (skip reclone)
| Repo | Onde já está |
|---|---|
| SynkraAI/aiox-core | Prometeu (importado-cru) + `.claude/_staging/aiox` |
| ohmyjahh/xquads-squads | 11 squads gregos + `.claude/_staging/xquads` |
| coreyhaines31/marketingskills | Ariadne (F0→F7 completo, ledger) |

## Os 31 repos NOVOS — fila de absorção

Rotas: **A** Skill/Agente · **B** Ferramenta/vendor · **C** Referência/dado-hostil · **D** Framework/MCP grande.
Squad-alvo é **provisório** — a rota final é decidida na F4 por diff item-a-item.

| # | slug (owner--repo) | URL | rota | squad-alvo provisório | status |
|---|---|---|---|---|---|
| 1 | obra--superpowers | https://github.com/obra/superpowers | A | caos-fábrica / dédalo (metodologia) | NOVO |
| 2 | affaan-m--everything-claude-code | https://github.com/affaan-m/everything-claude-code | A | dédalo / caos-fábrica | NOVO |
| 3 | garrytan--gstack | https://github.com/garrytan/gstack | A | olimpo (personas C-level) / dédalo | NOVO |
| 4 | github--spec-kit | https://github.com/github/spec-kit | A | prometeu (spec-driven) | NOVO |
| 5 | gsd-build--get-shit-done | https://github.com/gsd-build/get-shit-done | A | prometeu / dédalo | NOVO |
| 6 | revfactory--harness | https://github.com/revfactory/harness | A | caos-fábrica (meta-skill: projeta times) | NOVO |
| 7 | anthropics--knowledge-work-plugins | https://github.com/anthropics/knowledge-work-plugins | A | multi-squad / referência (plugins oficiais) | NOVO |
| 8 | thedotmack--claude-mem | https://github.com/thedotmack/claude-mem | A | dédalo / sistema (memória) | NOVO |
| 9 | anthropics--claude-code (sparse: frontend-design) | https://github.com/anthropics/claude-code | A | harmonia (design) | NOVO |
| 10 | nextlevelbuilder--ui-ux-pro-max-skill | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | A | harmonia | NOVO |
| 11 | safishamsi--graphify | https://github.com/safishamsi/graphify | A | dédalo (análise de código) | NOVO |
| 12 | Lum1104--Understand-Anything | https://github.com/Lum1104/Understand-Anything | A | dédalo | NOVO |
| 13 | kepano--obsidian-skills | https://github.com/kepano/obsidian-skills | A | dédalo / ferramenta | NOVO |
| 14 | hardikpandya--stop-slop | https://github.com/hardikpandya/stop-slop | A | caliope (escrita) | NOVO |
| 15 | Leonxlnx--taste-skill | https://github.com/Leonxlnx/taste-skill | A | caliope / aglaia | NOVO |
| 16 | rohitg00--ai-engineering-from-scratch | https://github.com/rohitg00/ai-engineering-from-scratch | A | dédalo / referência (curso) | NOVO |
| 17 | mukul975--Anthropic-Cybersecurity-Skills | https://github.com/mukul975/Anthropic-Cybersecurity-Skills | A | égide (segurança) | NOVO |
| 18 | alirezarezvani--claude-skills | https://github.com/alirezarezvani/claude-skills | A | referência / distribuir (coletânea 330+) | NOVO |
| 19 | JuliusBrussee--caveman | https://github.com/JuliusBrussee/caveman | A | dédalo / caliope (otimização tokens) | NOVO |
| 20 | blader--humanizer | https://github.com/blader/humanizer | A | caliope (escrita) | NOVO |
| 21 | charlie947--social-media-skills | https://github.com/charlie947/social-media-skills | A | pheme (social) | NOVO |
| 22 | AgriciDaniel--claude-seo | https://github.com/AgriciDaniel/claude-seo | A | ariadne (SEO) | NOVO |
| 23 | yamadashy--repomix | https://github.com/yamadashy/repomix | B | vendor (empacotar repo p/ LLM) | NOVO |
| 24 | microsoft--markitdown | https://github.com/microsoft/markitdown | B | vendor (conversão p/ markdown) | NOVO |
| 25 | harry0703--MoneyPrinterTurbo | https://github.com/harry0703/MoneyPrinterTurbo | B | vendor (geração de vídeo) — app grande | NOVO |
| 26 | hesreallyhim--awesome-claude-code | https://github.com/hesreallyhim/awesome-claude-code | C | referencias/biblioteca | NOVO |
| 27 | elder-plinius--CL4R1T4S | https://github.com/elder-plinius/CL4R1T4S | C | referencias/biblioteca (HOSTIL: prompts vazados) | NOVO |
| 28 | x1xhlol--system-prompts-and-models-of-ai-tools | https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools | C | referencias/biblioteca (HOSTIL: prompts vazados) | NOVO |
| 29 | perplexityai--modelcontextprotocol | https://github.com/perplexityai/modelcontextprotocol | D | ferramenta/MCP (busca web) | NOVO |
| 30 | microsoft--playwright-mcp | https://github.com/microsoft/playwright-mcp | D | ferramenta/MCP (browser) | NOVO |
| 31 | czlonkowski--n8n-mcp | https://github.com/czlonkowski/n8n-mcp | D | ferramenta/MCP (n8n) | NOVO |

## Buckets de escrita (Fase 3 — serialização por squad-alvo)
Provisórios; confirmados após a F4. Buckets distintos rodam em paralelo; dentro de cada bucket, um repo de cada vez.
- **caliope:** 14 stop-slop, 19 caveman, 20 humanizer, 15 taste-skill
- **dédalo:** 8 claude-mem, 11 graphify, 12 Understand-Anything, 13 obsidian-skills, 2 everything-claude-code, 16 ai-eng
- **harmonia:** 9 frontend-design, 10 ui-ux-pro-max
- **égide:** 17 Anthropic-Cybersecurity-Skills
- **pheme:** 21 social-media-skills
- **ariadne:** 22 claude-seo
- **prometeu:** 4 spec-kit, 5 get-shit-done
- **caos-fábrica:** 1 superpowers, 6 harness, 3 gstack, 7 knowledge-work-plugins
- **vendor (paralelo livre):** 23 repomix, 24 markitdown, 25 MoneyPrinterTurbo
- **referencias (serial):** 18 claude-skills, 26 awesome-claude-code, 27 CL4R1T4S, 28 system-prompts
- **ferramenta/MCP:** 29 perplexity, 30 playwright-mcp, 31 n8n-mcp

## Estado da execução
- [x] F0 triagem — este manifesto
- [ ] F1→F4 leitura paralela (clone+segurança+inventário+mapeamento)
- [ ] F5 decisão (carimbada)
- [ ] F6 aplicação serializada + F6.5 reconciliação por slug
- [ ] F7 ledger (escritor único)
- [ ] RELATORIO-DO-LOTE.md
