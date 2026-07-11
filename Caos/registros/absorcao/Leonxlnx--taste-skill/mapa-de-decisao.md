---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/Leonxlnx--taste-skill/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/Leonxlnx--taste-skill/seguranca|seguranca]]"
---

# F4 — Mapa de decisão (registro de entidades + squads existentes)

- **slug:** Leonxlnx--taste-skill | **sha:** 06d6028b…
- **base de comparação:** `dados/registro-de-entidades.yaml`. Squads relevantes confirmados: **harmonia** (design/ux/ui/web/design-system/frontend/acessibilidade), **caliope** (copy/escrita), **aglaia** (branding/estética), **dedalo** (claude code/eng de agentes).
- **achado-chave:** NÃO existe no registro nenhuma skill equivalente de "taste / anti-slop / design-taste / banco de AI-tells". O domínio (UX/UI) existe em **harmonia**, mas item-a-item não há match — logo, por viés da missão (REUSE sem prova = perda silenciosa), tudo cai em **ADAPT** (squad existente recebe a técnica como nova skill) ou DESCARTAR (lixo inerte). Zero REUSE, zero CREATE-de-squad.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | harmonia | Skill carro-chefe anti-slop frontend vira a nova skill âncora de "bom gosto" da harmonia (sem equivalente atual). |
| G2 | ADAPT | harmonia | Versão legada de G1; absorver só o diff histórico (baseline/arsenal) se útil — baixa prioridade, não duplicar G1. |
| G3 | ADAPT | harmonia | Extrair a técnica de randomização determinística (RNG) + estrutura AIDA + regra hero 2-linhas como variante. |
| G4 | ADAPT | aglaia | Geração de brand-kit/identidade visual é território de branding (aglaia), não de copy. |
| G5 | ADAPT | harmonia | Protocolo de auditoria+upgrade de sites existentes complementa o redesign da harmonia. |
| G6 | ADAPT | harmonia | Técnicas de UI premium (double-bezel, button-in-button, coreografia de motion) como skill de acabamento. |
| G7 | ADAPT | harmonia | Estilo minimalista editorial como preset de direção visual da harmonia. |
| G8 | ADAPT | harmonia | Estilo brutalista/telemetria como preset de direção visual da harmonia. |
| G9 | ADAPT | dedalo | Enforcement anti-preguiça/saída-completa é meta-skill de engenharia de agentes (dedalo/prometeu), não design. |
| G10 | ADAPT | harmonia | Workflow image-first design→code reforça a ponte design↔implementação da harmonia. |
| G11 | ADAPT | aglaia | Geração de imagens de referência de UI/site é capacidade visual (aglaia); secundário harmonia. |
| G12 | ADAPT | aglaia | Geração de telas/flows mobile é capacidade visual (aglaia); secundário harmonia. |
| G13 | ADAPT | harmonia | Codificação de design-system em `DESIGN.md` (tokens/anti-patterns) é design-system → harmonia. |
| G14 | ADAPT | harmonia + caliope | Banco de AI-tells: tells visuais → harmonia; tells de conteúdo/microcopy → caliope. Alto valor, dividir. |
| G15 | ADAPT | caliope | Banimento do em-dash é A regra anti-LLM nº1 em texto — vai direto pro arsenal de escrita da caliope. |
| G16 | ADAPT | harmonia | Sistema dos 3 dials (variância/motion/densidade) como calibrador padrão de qualquer direção visual. |
| G17 | ADAPT | harmonia + aletheia | "Design Read" (ler intenção antes de produzir) é discovery aplicado ao design; harmonia primário, aletheia ecoa o método. |
| G18 | ADAPT | harmonia | Pre-Flight mecânico vira checklist de QA visual da harmonia (gate antes de entregar). |
| G19 | ADAPT | caliope | Copy self-audit + anti-clichê (Jane Doe, números fake, verbos "Elevate") é puro arsenal de copy. |
| G20 | ADAPT | harmonia | Esqueletos GSAP/Motion + guardrails de perf/a11y como referência de implementação de motion. |
| G21 | ADAPT | referencias | Corpus de pesquisa "LLM Laziness" entra como referência inerte (embasa G9), não como agente. |
| G22 | DESCARTAR | vendor (inerte) | Scripts de build de README (sharp) + caminhos locais do autor: lixo de build, não vira capacidade. |
| G23 | ADAPT | caos-fabrica | Padrão de empacotar skills como plugin Claude Code (`.claude-plugin` + marketplace) é meta-conhecimento da fábrica. |

**Resumo de decisão:** 22 ADAPT + 1 DESCARTAR (G22). Invariante de não-perda: ABSORVÍVEL(22) + DESCARTADO(1) + PERDIDO(0) = 23 = inventário F3. Decisão dominante: **ADAPT**. Squad-alvo primário: **harmonia** (12 IDs), com **aglaia** (3), **caliope** (3, +1 compartilhado), **dedalo** (1), **referencias** (1), **caos-fabrica** (1).
