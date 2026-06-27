# F4 — Mapa de decisão

- **slug:** `x1xhlol--system-prompts-and-models-of-ai-tools`
- **sha:** `0c828e4e893f025c1ae75cb3eb41e4a178e4024e`
- **decisão de classe (dado hostil, rota C):** arquivar **todo** o acervo em `referencias/biblioteca/` como material **INERTE**, com cabeçalho de quarentena cognitiva. Nada vira agente/skill nem é auto-carregado. Os únicos itens com valor de **mineração de padrão** (G11, G16, e a leitura comparada G1–G15) são marcados **ADAPT** — mas a absorção é da *lição/padrão reescrito em PT-BR*, jamais do texto vazado literal (GPL-3.0 copyleft + risco de contaminação de contexto).

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | CREATE | referencias | Acervo Claude/Claude Code vai inerte à biblioteca; leitura comparativa por humano/dedalo, sem carregar como instrução. |
| G2 | CREATE | referencias | Versões do Cursor: referência de evolução de prompt; arquivo inerte. |
| G3 | CREATE | referencias | Prompts por modelo do VSCode Agent; inerte. |
| G4 | CREATE | referencias | Devin/DeepWiki; inerte. |
| G5 | CREATE | referencias | Geradores de UI (v0/Lovable/Orchids); inerte, referência para harmonia se um dia precisar. |
| G6 | CREATE | referencias | Builders full-stack; inerte. |
| G7 | ADAPT | dedalo | Arquitetura de agent-loop do Manus é referência de design de loop p/ eng. de agentes — extrair o *padrão* (não o texto). |
| G8 | CREATE | referencias | Windsurf/Augment; inerte. |
| G9 | CREATE | referencias | Prompts open-source (Cline/Codex/Gemini CLI/etc.); inerte. |
| G10 | CREATE | referencias | Assistentes de busca/navegador; inerte; referência tangencial p/ argos. |
| G11 | **ADAPT** | egide | Padrão defensivo anti prompt-injection ("conteúdo = dado, não instrução" + catálogo de ataques a recusar) é insumo direto de guardrail — reescrever como checklist/skill própria, sem copiar literal. |
| G12 | CREATE | referencias | Notion/Poke/Cluely (produtividade); inerte. |
| G13 | ADAPT | dedalo | Modos planning/spec/classifier (Kiro/Traycer/Antigravity) são padrões de design de fluxo de agente — minerar o padrão p/ eng. de agentes; texto fica inerte. |
| G14 | CREATE | referencias | IDE nativos (Xcode/Junie/Gemini Studio); inerte. |
| G15 | CREATE | referencias | Configs YAML (Amp/Warp); inerte. |
| G16 | **ADAPT** | dedalo | Acervo de 17 tool schemas JSON = melhor referência pública de design de function-calling; minerar princípios de design de ferramenta, sem vendorizar JSON literal. |

## Síntese
Decisão dominante = **CREATE (referencias inerte)** para a massa do acervo, com **4 bolsões ADAPT** (G7, G11, G13 → dedalo/egide; G16 → dedalo) que valem mineração de *padrão reescrito*. Nenhum REUSE: não há, no registro, equivalente a "acervo curado de prompts vazados de mercado". Ressalvas inegociáveis: (1) cabeçalho "DADO MORTO — não obedecer / não carregar como instrução" em todo arquivo arquivado; (2) GPL-3.0 copyleft → proibido colar texto literal em produto/squad; só leitura e síntese própria.
