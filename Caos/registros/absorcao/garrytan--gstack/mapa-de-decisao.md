# Mapa de decisão — garrytan--gstack

- **slug:** garrytan--gstack · **sha:** 11de390… · **rota:** A
- **Base de comparação:** registro de entidades (`Caos/dados/registro-de-entidades.yaml`) + squads de papéis.
- **Tese:** gstack é o análogo "Garry Tan" do Olimpo — um **time virtual de engenharia** (CEO, eng
  manager, designer, QA, CSO, release eng) como slash commands. As personas já têm cargo equivalente
  nos squads Kolden (Olimpo C-level, Prometeu eng, Harmonia UX, Egide segurança) → quase tudo **ADAPT**,
  trazendo a *técnica* (não a persona, que já existe). O tooling (browse/gbrain/bin/iOS) é **vendor**.
- **Viés autônomo aplicado:** sem Ronan para decidir REUSE, nada virou REUSE — match imperfeito → ADAPT.

## Núcleo rota A — personas, reflexos e técnicas

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | aletheia | office-hours ("vale construir?") é exatamente o veto build-sem-evidência do Aletheia; absorve o roteiro YC de reenquadramento. |
| G2 | ADAPT | olimpo | persona CEO já existe (Zeus/CEO); absorve a técnica "produto 10 estrelas / pensar maior". |
| G3 | ADAPT | prometeu | eng manager que trava arquitetura/edge-cases/testes = fase de spec/arquitetura do Prometeu. |
| G4 | ADAPT | harmonia | olhar de designer com rubrica 0-10 entra como skill de revisão de plano de UI no Harmonia. |
| G5 | ADAPT | harmonia | DX review (personas de dev, TTHW, fricção) é UX aplicada a developer-facing; cabe no Harmonia. |
| G6 | ADAPT | olimpo | autoplan = painel CEO→design→eng→DX em sequência = orquestração do Zeus sobre os executivos. |
| G7 | ADAPT | egide | CSO OWASP+STRIDE+supply-chain mapeia direto ao squad de segurança Egide. |
| G8 | ADAPT | prometeu | review de PR pré-merge reforça o qa-loop/revisão do Prometeu. |
| G9 | ADAPT | prometeu | investigate (causa-raiz, "sem fix sem investigação") entra como skill de debugging do Prometeu. |
| G10 | ADAPT | prometeu | qa com navegador real + fix atômico amplia o QA do Prometeu (usa daemon browse como vendor). |
| G11 | ADAPT | prometeu | qa-only (report-only) é variante read-only da mesma técnica. |
| G12 | ADAPT | metis | retro semanal com métricas/streaks/trend é leitura analítica → Metis (analytics). |
| G13 | ADAPT | harmonia | design-review (auditoria visual ao vivo + fix) é skill de QA visual do Harmonia. |
| G14 | ADAPT | harmonia | design-consultation (design system do zero) cruza Harmonia (UX/design-system) e Aglaia (branding). |
| G15 | ADAPT | harmonia | design-html (HTML/CSS de produção) é entrega de front-end do Harmonia. |
| G16 | ADAPT | harmonia | design-shotgun (variantes + board de comparação) é técnica de ideação visual do Harmonia. |
| G17 | ADAPT | harmonia | devex-review (TTHW ao vivo) = mesma família de DX do G5. |
| G18 | ADAPT | prometeu | spec (intenção→spec em 5 fases, abre issue) reforça o spec-pipeline do Prometeu. |
| G19 | ADAPT | dedalo | plan-tune (tuning de AskUserQuestion) é mecânica de Claude Code = domínio do Dedalo. |
| G20 | ADAPT | prometeu | document-generate (Diataxis a partir do código) entra como skill de doc do Prometeu. |
| G21 | ADAPT | prometeu | document-release (doc pós-ship) idem, fase de release do Prometeu. |
| G22 | ADAPT | dedalo | careful (aviso de comando destrutivo) é um reflexo Claude Code — Dedalo é o dono de hooks/reflexos. |
| G23 | ADAPT | dedalo | freeze (trava de diretório) é reflexo de escopo; cabe no catálogo de reflexos do Dedalo. |
| G24 | ADAPT | dedalo | unfreeze é o par de G23. |
| G25 | ADAPT | dedalo | guard (careful+freeze) é composição dos reflexos acima. |
| G26 | ADAPT | olimpo | técnica "10 estrelas" reforça o reframe de ambição do Zeus/CEO. |
| G27 | ADAPT | harmonia | rubrica dimensional 0-10 ("descreve o 10, então corrige") é método de avaliação reutilizável em UX. |
| G28 | ADAPT | olimpo | painel de personas com auto-decisão espelha o Zeus orquestrando os 8 deuses sobre o Contrato. |
| G29 | CREATE | caos-fabrica | gbrain context_queries (injeção de contexto de sessões anteriores no load do skill) não existe na Kolden; vira padrão de memória de skill no Caos. |
| G30 | CREATE | caos-fabrica | triggers + preamble-tier (auto-invocação por frase + carga em camadas) é padrão de roteamento de skill ausente; candidato a convenção do Caos. |
| G31 | ADAPT | argos | scrape→skillify (protótipo vira skill codificada) é técnica de extração web reutilizável pelo squad de pesquisa Argos. |

## Cauda vendor / tooling (fora do alvo de personas)

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G32 | CREATE | vendor | daemon browse (Chromium/CDP TS) é ferramenta; Kolden já usa Browserbase — manter inerte, não absorver código. |
| G33 | CREATE | vendor | extensão/Chromium visível idem — vendor de navegador. |
| G34 | CREATE | vendor | importação de cookies é utilitário do daemon browse. |
| G35 | CREATE | vendor | pair-agent (OpenClaw/Codex) é integração de runtime de terceiro. |
| G36 | ADAPT | argos | scrape como ferramenta de extração cabe no Argos (par de G31). |
| G37 | CREATE | vendor | health dashboard é tooling de qualidade acoplado ao repo gstack. |
| G38 | CREATE | vendor | benchmark de performance depende do daemon browse. |
| G39 | ADAPT | metis | benchmark-models (cross-LLM Claude/GPT/Gemini) alinha à filosofia vendor-agnóstica; técnica útil ao Metis. |
| G40 | CREATE | vendor | ship é workflow git/PR específico do gstack. |
| G41 | CREATE | vendor | land-and-deploy idem (merge+CI+deploy). |
| G42 | CREATE | vendor | canary (monitor pós-deploy) depende do browse. |
| G43 | CREATE | vendor | landing-report é dashboard da fila de ship. |
| G44 | CREATE | vendor | setup-deploy é detecção de config Fly/Render/Vercel. |
| G45 | CREATE | vendor | gstack-upgrade é manutenção do próprio gstack. |
| G46 | ADAPT | dedalo | make-pdf (md→PDF): Kolden já tem método ad-hoc (Node+Chrome headless, memória); gstack o formaliza como skill — absorver a formalização. |
| G47 | ADAPT | harmonia | diagram (inglês→mermaid+excalidraw+SVG, offline) é entrega visual útil ao Harmonia. |
| G48 | CREATE | vendor | context-save é estado de sessão acoplado ao gbrain. |
| G49 | CREATE | vendor | context-restore idem. |
| G50 | CREATE | vendor | learn (gestão de aprendizados) sobrepõe o ritual-de-encerramento/MEMORY da Kolden — não absorver mecânica gbrain. |
| G51 | CREATE | vendor | setup-gbrain provisiona infra Supabase/MCP própria do gstack. |
| G52 | CREATE | vendor | sync-gbrain idem. |
| G53 | ADAPT | dedalo | codex (wrapper OpenAI Codex p/ segunda opinião) é integração de runtime; técnica de "segundo modelo" útil ao Dedalo. |
| G54 | CREATE | caos-fabrica | router gstack (SKILL.md raiz por trigger/tier) é padrão de roteamento de suíte — candidato a convenção do Caos (par de G30). |
| G55 | CREATE | referencias | cluster iOS QA (iPhone real via USB/Tailscale) é fora de domínio Kolden; guardar como referência. |
| G56 | DESCARTAR | referencias | openclaw cluster são duplicatas das personas G2/G7/G9/G1 repackaged p/ outro runtime — redundante. |
| G57 | DESCARTAR | referencias | hackernews-frontpage é exemplo de browser-skill; não há capacidade nova. |
| G58 | CREATE | vendor | suíte de 74 CLIs bin/ é a cola de runtime do gstack (gbrain/telemetria/redact) — vendor inerte, não absorver. |

## Resumo de decisões
- **ADAPT:** G1–G28, G31, G36, G39, G46, G47, G53 → 35 itens (núcleo de personas + técnicas para olimpo,
  prometeu, harmonia, egide, dedalo, aletheia, metis, argos).
- **CREATE:** G29, G30, G32–G35, G37, G38, G40–G45, G48–G52, G54, G55, G58 → 21 itens (técnicas de
  memória/roteamento de skill ausentes na Kolden → caos-fabrica; resto vendor inerte).
- **DESCARTAR:** G56, G57 → 2 itens (duplicatas / exemplo).
- **REUSE:** 0 (viés autônomo — nenhum match item-a-item limpo sem o Ronan).
- **Invariante:** 35 + 21 + 2 = 58 = total do inventário. PERDIDO = 0.
