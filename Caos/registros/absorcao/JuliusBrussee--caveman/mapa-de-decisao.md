# Mapa de decisão (F4) — JuliusBrussee--caveman

- **slug:** JuliusBrussee--caveman · **sha:** 25d22f864ad68cc447a4cb93aefde918aa4aec9f · **rota:** A
- Registro consultado: `C:/Kolden/Caos/dados/registro-de-entidades.yaml` (566 linhas). **Nenhuma capacidade equivalente** a compressão de saída / brevidade de agente / commit-terse / review-terse / proxy-MCP-de-descrições existe hoje. Zero REUSE limpo → viés ADAPT/CREATE (REUSE sem prova = perda silenciosa).
- Alvo natural: **dedalo** (Claude Code / engenharia de agentes) recebe a família de skills de brevidade; **egide** recebe os padrões de segurança; **prometeu** recebe a metodologia de eval honesto.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | dedalo | Skill nova "brevidade/caveman" de modo de saída comprimido — capacidade ausente, central p/ economia de tokens da Kolden (reescrever PT-BR, religar ao LLM próprio). |
| G2 | ADAPT | dedalo | Níveis lite/full/ultra entram como parâmetro de intensidade da mesma skill G1. |
| G3 | ADAPT | dedalo | Modo wenyan vira opção avançada da skill de brevidade (compressão extrema). |
| G4 | ADAPT | dedalo | Regra Auto-Clarity é guardrail obrigatório — anexar à skill G1 (segurança nunca comprime). |
| G5 | ADAPT | dedalo | Preservação de idioma é requisito Kolden (PT-BR) — incorporar à skill G1. |
| G6 | ADAPT | dedalo | Skill `caveman-compress` de CLAUDE.md/memória — alto valor (corta input todo dia); reescrever sem chamada direta à Anthropic. |
| G7 | ADAPT | dedalo | Orquestrador Python (compress→validate→retry, frontmatter verbatim) é o motor de G6; portar com LLM próprio. |
| G8 | ADAPT | egide | Denylist de paths sensíveis + cap de tamanho antes de mandar arquivo a LLM = padrão de DLP reusável pela Kolden. |
| G9 | ADAPT | dedalo | Skill de commit terse Conventional Commits — convive com a policy de commit Kolden (travessão/PT-BR). |
| G10 | ADAPT | dedalo | Skill de code-review de 1 linha com severidade — formato útil p/ revisões de squad. |
| G11 | CREATE | dedalo | Cartão de referência one-shot dos modos — gerar do zero alinhado às skills adaptadas. |
| G12 | ADAPT | metis | Telemetria real de tokens/economia (lida de log, sem estimativa) — encaixa em analytics; depende do runtime alvo. |
| G13 | ADAPT | dedalo | Guia de decisão de delegação a subagentes comprimidos — padrão de roteamento p/ poupar contexto. |
| G14 | ADAPT | dedalo | Subagente locator read-only com contrato de saída estrito — molde p/ especialista de investigação. |
| G15 | ADAPT | dedalo | Subagente editor cirúrgico (recusa 3+ arquivos, recibo verificado) — padrão de builder seguro. |
| G16 | ADAPT | dedalo | Subagente revisor de diff terse — par do G10 em forma de subagente. |
| G17 | CREATE | dedalo | MCP `caveman-shrink` (proxy + compressão de descrições de tools) — capacidade nova de economia de contexto MCP; reconstruir sob padrão Kolden (Infisical, registro), não vendorizar binário. |
| G18 | ADAPT | dedalo | Padrão de hooks de persistência de modo (flag file, ativação NL/slash, reforço por turno) — receita reusável de reflexo. |
| G19 | ADAPT | egide | I/O symlink-safe (O_NOFOLLOW, temp+rename, 0600, whitelist) — hardening reusável p/ qualquer escrita de flag/segredo. |
| G20 | CREATE | dedalo | Installer multi-agente é específico do produto; absorver só o padrão (settings.json JSONC-tolerante + validateHookFields), recriar enxuto. |
| G21 | ADAPT | prometeu | Eval de 3 braços (delta honesto skill vs terse) — metodologia anti-viés p/ o harness spec-driven do Prometeu. |
| G22 | ADAPT | prometeu | Benchmark com tokens reais via API + resultados versionados — método de medição honesta reusável. |

**Resumo F4:** ADAPT=18 · CREATE=4 · REUSE=0. Decisão dominante **ADAPT** (alvo primário **dedalo**; secundários **egide**, **prometeu**, **metis**). Nada se perde: toda capacidade tem destino nomeado.
