# Histórico de criações do Kolden

Cada agente ou squad criado pelo Caos é registrado aqui na Fase 8 (Entrega + Registro)
pelo subagent `curador`. Esta é a visão narrativa; o índice estruturado e consultável
fica em `dados/registro-de-entidades.yaml`.

| Data | Entidade | Tipo | Domínio | Versão | Origem | Tempo (fases) | Status | Lições | Resumo |
|---|---|---|---|---|---|---|---|---|---|
| 2026-06-19 | Peitho, Caliope, Aglaia, Harmonia, Orfeu, Olimpo, Themis, Metis, Pluto, Dionisio, Egide, Dedalo | squad (12) | marketing/estratégia | 1.0.0 | IMPORT | bulk | importado-cru | tradução em lote por subagentes; normalizar rótulos estruturais; preservar personas reais mantém o valor | Arsenal xquads-squads → PT-BR + mitologia grega; ver _origem.md de cada pasta |
| 2026-06-19 | Prometeu | squad | engenharia | 1.0.0 | IMPORT | parcial | importado-cru-parcial | framework grande (1374 arq.); traduzir agentes/skills/commands/rules primeiro | aiox-core clonado; interface operacional traduzida; tasks/docs/espelhos pendentes |
| 2026-06-20 | Prometeu | squad | engenharia | 1.0.0 | TRADUÇÃO | rodada completa | importado-cru | fan-out de tradutores idempotentes + grep-verify pega stragglers que relatórios de agente não pegam; remover ruído (es/zh, espelhos IDE) antes de verificar | Tradução profunda concluída: ~218 tasks, templates, data, checklists, workflows(yaml), docs/en; removidos docs/es+zh (259) e espelhos .codex/.gemini/.kimi/.antigravity |
| 2026-06-20 | Aletheia | squad (8) | descoberta/validação | 1.0.0 | CREATE | Ritual 9 fases | criado-pelo-ritual | veto semântico precisa ser multicamada (orquestrador+checklist+workflow+reflexo); squad de validação faz handoff, não executa | Discovery & Lean Validation (Blank, Fitzpatrick, Ulwick, Ries, Bland, Maurya, Savoia); entrada do funil de criação; fecha lacunas 1-3 do roteiro do-zero-ao-MVP |
| 2026-06-21 | Argos | squad (15) | inteligência de mercado/scraping | 1.0.0 | CREATE | Ritual 9 fases | criado-pelo-ritual | REUSE inclui runtime (tools Hermes/MCPs) antes de vendorizar repo; risco/ToS vira módulo-cinza isolado opt-in (sentinela + guardrail PreToolUse); motor fundido de 5 repos garimpados por scorecard | "O deus das pesquisas": macro→micro, orgânico+pago, todas as redes, gate de proveniência (fonte+timestamp+cross-check); motor vendorizado Scrapling/Scrapy/GPT-Researcher/Crawlee/Skyvern; módulo cinza aguarda autorização nominal |

> **Importação 2026-06-19 (dívida da fase 2):** os 13 squads acima vieram em **modo importação** (bypass do Ritual de 9 fases, sancionado pelo Ronan). Pendências: (1) ~~concluir tradução profunda do Prometeu~~ ✅ feito 2026-06-20; (2) rodar Ritual/PRD por squad para sair de `importado-cru`; (3) adicionar ferramentas faltantes (`sobre-a-empresa/Ferramentas/ferramentas-dos-squads.md`); (4) ativar Peitho via Hermes. Manifesto: `C:\Kolden\.claude\_staging\MANIFESTO-IMPORTACAO.md`.

<!--
Colunas:
- Origem: REUSE | ADAPT | CREATE (decisão da Fase 0)
- Tempo (fases): estimativa do esforço total ou por fase, se relevante
- Status: produção | em-teste | refazer
- Lições: 1 linha do que ficou registrado em dados/padroes-aprendidos.yaml
Exemplo:
| 2026-06-11 | agente-suporte-whatsapp | agente | conversacional | 1.0.0 | CREATE | ~2h | produção | trilha conversacional poupou 1 rodada | Atende e escala no WhatsApp |
-->
