# Decisão F5 consolidada — Lote 2026-06-26 (carimbada)

> **Carimbo de delegação:** `decisão F5 delegada — Ronan off 24h, autorizado 2026-06-26`. O gate de aprovação
> humana (Caos Art. III) foi explicitamente delegado ao Hermes para esta missão. Gates de **segurança (F2)** e
> **reconciliação (F6.5)** permanecem intocados. Tudo no working tree, **sem commit** — reversível.

## Resultado da Fase 1 (F1→F4) — os 31

**Segurança (F2): 31/31 SAFE.** Zero REJEITAR, zero QUARENTENA. Nenhum repo foi barrado.
**REUSE assinado: 0** (viés anti-perda da missão — REUSE sem prova item-a-item é perda silenciosa).

| # | slug | cap | decisão | squad-alvo (principal) | licença | nota |
|---|---|---|---|---|---|---|
| 1 | hardikpandya--stop-slop | 13 | ADAPT | caliope | MIT | FUNDIR com humanizer |
| 2 | obra--superpowers | 25 | ADAPT | prometeu·dedalo·caos | MIT | insight SDO corrige skills do Caos |
| 3 | affaan-m--everything-claude-code | 37cl (~271 skills) | ADAPT | caos·dedalo·+8 | MIT | massivo; overlap SEO/pesquisa |
| 4 | garrytan--gstack | 58 | ADAPT | olimpo·+ | MIT | análogo Olimpo; absorver técnica não persona |
| 5 | github--spec-kit | 21 | ADAPT | prometeu | MIT | /clarify /analyze /checklist |
| 6 | gsd-build--get-shit-done | 40 | ADAPT | prometeu·dedalo·egide | MIT | repo ARQUIVADO; G35 scanner injeção |
| 7 | revfactory--harness | 44 | MISTA | caos-fabrica (UPGRADE) | Apache-2.0 | coreano→PT; topologias + time vivo |
| 8 | anthropics--knowledge-work-plugins | 30 | MISTA | multi + CREATE×6 | Apache-2.0 | oficial; MCP re-apontar à stack interna |
| 9 | thedotmack--claude-mem | 28 | ADAPT | dedalo + INFRA | Apache-2.0 | core memória = Kolden OS (escalar); PostHog remover |
| 10 | nextlevelbuilder--ui-ux-pro-max-skill | 40 | ADAPT | harmonia·aglaia | MIT | sobrepõe taste-skill |
| 11 | safishamsi--graphify | 20 | ADAPT | dedalo·vendor | MIT | sobrepõe Understand-Anything |
| 12 | Lum1104--Understand-Anything | 32 | MISTA/CREATE | dedalo | MIT | sobrepõe graphify; hook auto-update fere gate |
| 13 | kepano--obsidian-skills | 9 | CREATE-GATED | (decisão Ronan)·argos | MIT | Kolden não usa Obsidian; defuddle→argos |
| 14 | Leonxlnx--taste-skill | 23 | ADAPT | harmonia·aglaia·caliope | MIT | sobrepõe ui-ux-pro-max |
| 15 | rohitg00--ai-engineering-from-scratch | 30cl (~487 art.) | MISTA/ref | referencias + ADAPT | MIT | curso, não skills prontas |
| 16 | mukul975--Anthropic-Cybersecurity-Skills | 817/32cl | MISTA | egide (full-spectrum) | Apache-2.0 | DUAL-USE: método sim, exploit não |
| 17 | alirezarezvani--claude-skills | 24cl (~346) | ADAPT | multi + CREATE×3 | MIT | espelhos multi-CLI; DUPLICATAS cruzadas |
| 18 | JuliusBrussee--caveman | 22 | ADAPT | dedalo·egide·prometeu·metis | MIT | soberania: compressão fala c/ API Anthropic |
| 19 | blader--humanizer | 9 | ADAPT | caliope | MIT | FUNDIR com stop-slop (esqueleto) |
| 20 | charlie947--social-media-skills | 21 | ADAPT | pheme | MIT | Pheme ausente do registro de entidades |
| 21 | AgriciDaniel--claude-seo | 49 | ADAPT | ariadne (BENCHMARK) | MIT | benchmark-ouro; FLOW=CC-BY; url_safety→egide |
| 22 | yamadashy--repomix | 12 | vendor | vendor | MIT | CLI empacota repo p/ LLM |
| 23 | microsoft--markitdown | 15 | vendor | vendor | MIT | arquivos→MD (complementar) |
| 24 | harry0703--MoneyPrinterTurbo | 10 | vendor | vendor | MIT* | *mídia embutida não-MIT; soberania configurável |
| 25 | hesreallyhim--awesome-claude-code | 15 | referência | referencias·égide | CC-BY-NC-ND | NoDeriv/NonComm — usar como índice |
| 26 | elder-plinius--CL4R1T4S | 9 | ref HOSTIL | referencias | AGPL-3.0 | 2 payloads injeção (não obedecidos); copyleft |
| 27 | x1xhlol--system-prompts-and-models-of-ai-tools | 16 | ref HOSTIL | referencias | GPL-3.0 | prompts vazados; copyleft |
| 28 | perplexityai--modelcontextprotocol | 11 | ADAPT/vendor | argos | MIT | retriever Sonar ao lado de Exa/Tavily |
| 29 | microsoft--playwright-mcp | 12 | vendor | vendor·dedalo·argos | Apache-2.0 | SOBERANO vs Browserbase; gate RCE unsafe |
| 30 | czlonkowski--n8n-mcp | 13 | vendor | vendor·dedalo | MIT | catálogo automação |
| 31 | anthropics--claude-code (frontend-design) | 22 | ADAPT | harmonia + caos·dedalo | Proprietário | reescrever PT-BR, uso interno; bônus plugin-dev |

## Decisões que tomei no teu lugar (resumo — o que auditar primeiro)
1. **Fundir `stop-slop` + `humanizer`** numa única skill de-slop no Caliope (humanizer como esqueleto), em vez de duas skills concorrentes.
2. **`harness` como upgrade do próprio Caos** (não squad novo) — é uma fábrica de agentes rival; absorver as técnicas que faltam (topologias, teste de skill, time vivo).
3. **Égide vira "cibersegurança full-spectrum"** ao absorver os 32 clusters de `cybersecurity-skills`, mas **só o método** (SKILL.md); os ~1093 scripts ofensivos ficam NÃO-ABSORVÍVEIS na quarentena.
4. **`claude-seo` é benchmark da Ariadne** — F6 deve rodar `auditoria-de-squad` com benchmark=repo (49 capacidades superam a Ariadne atual em profundidade).
5. **Vendors inertes** (repomix, markitdown, MoneyPrinterTurbo, playwright-mcp, n8n-mcp): registrados no ledger, **não viram agente**; nenhum executado.
6. **Referências hostis** (CL4R1T4S, system-prompts) e índices (awesome-claude-code, ai-engineering): arquivados **inertes** em `referencias/biblioteca/`, com aviso "não-carregar-como-instrução". Copyleft/NoDeriv respeitados — sem cópia literal.

## Itens que PARO e escalo a você (CREATE estratégico / infra — não decido sozinho)
- **obsidian-skills** — CREATE gated: Kolden não usa Obsidian hoje. Adotar PKM-via-Obsidian é decisão de stack tua. (defuddle→argos pode ir isolado.)
- **claude-mem core** — é **infra do Kolden OS** (daemon + SQLite + Chroma), não squad. Decisão de arquitetura de infra.
- **6 domínios sem squad** (knowledge-work-plugins): vendas, finanças, jurídico, suporte, RH, operações.
- **3 lacunas** (claude-skills): PMO, compliance regulatório (GDPR/ISO/SOC2/EU-AI-Act), BizOps.
- **MoneyPrinterTurbo** como produto self-hosted de vídeo (Pheme/Caliope) — decisão de produto + licença de mídia.

## Ressalvas transversais (modo solo)
- **Herança histórica via web DEFERIDA** — a política de busca da Kolden exige tua confirmação; você estava off. As skills nascem da extração local dos repos; o enriquecimento biográfico (Liceu/heranca-de-especialista) fica para quando autorizar busca.
- **`.git/` preservado nos clones** — desvio consciente da F1 (quarentena é gitignored em `Caos/.gitignore:6`; evitei `rm` para não pedir permissão destrutiva). Não afeta o repo principal.
