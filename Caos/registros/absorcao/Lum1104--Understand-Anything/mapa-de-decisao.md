---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/Lum1104--Understand-Anything/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/Lum1104--Understand-Anything/seguranca|seguranca]]"
---

# Mapa de decisão (F4) — Lum1104--Understand-Anything

Comparado contra `Caos/dados/registro-de-entidades.yaml` e os squads existentes. **Dedalo** é o squad de domínio do Claude Code, mas seu propósito é *construir* artefatos (hooks, MCP, skills, subagents, config) — **não** *compreender/visualizar uma codebase arbitrária*. Logo, a capacidade central (entender qualquer codebase → grafo de conhecimento interativo) **não tem equivalente** na Kolden. O repo irmão `safishamsi--graphify` (grafo de conhecimento) **sobrepõe parcialmente** apenas o eixo wiki/knowledge (G7, G13, G24) — reconciliar lá.

Viés da missão: na dúvida, ADAPT/CREATE > REUSE. Nenhum REUSE limpo foi encontrado.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | CREATE | dedalo (host) | `/understand` é o produto-núcleo de compreensão de codebase; nada equivalente — nova suíte de skills sob a guarda do Dedalo |
| G2 | CREATE | dedalo (host) | Q&A sobre codebase via grafo; capacidade nova |
| G3 | CREATE | dedalo (host) | dashboard de visualização de grafo; capacidade nova |
| G4 | CREATE | dedalo (host) | análise de diff/PR contra grafo; nova |
| G5 | CREATE | dedalo (host) | extração de domínio de negócio do código; nova |
| G6 | CREATE | dedalo (host) | explain deep-dive de componente; nova |
| G7 | CREATE | dedalo (host) | wiki Karpathy → grafo; **sobrepõe graphify** — reconciliar antes de criar |
| G8 | CREATE | dedalo (host) | guia de onboarding a partir do grafo; nova |
| G9 | CREATE | dedalo (host) | project-scanner (subagente do pipeline); nova |
| G10 | CREATE | dedalo (host) | file-analyzer (subagente do pipeline); nova |
| G11 | CREATE | dedalo (host) | architecture-analyzer (camadas); nova |
| G12 | CREATE | dedalo (host) | domain-analyzer; nova |
| G13 | CREATE | dedalo (host) | article-analyzer (wiki); **sobrepõe graphify** — reconciliar |
| G14 | CREATE | dedalo (host) | tour-builder; nova |
| G15 | CREATE | dedalo (host) | graph-reviewer (QA do grafo); nova |
| G16 | CREATE | dedalo (host) | assemble-reviewer (recupera dropados no merge); nova |
| G17 | CREATE | dedalo (host) | knowledge-graph-guide (navegação); nova |
| G18 | ADAPT | dedalo (hooks-architect/Latch) | reflexo PostToolUse auto-update — absorver o padrão, **removendo** a diretiva "sem confirmação" |
| G19 | ADAPT | dedalo (hooks-architect/Latch) | reflexo SessionStart de staleness (hash vs HEAD) — padrão de reflexo direto para o Latch |
| G20 | ADAPT | prometeu | "deterministic-first": só gasta LLM em mudança estrutural — técnica de eficiência reaproveitável no ciclo de eng |
| G21 | ADAPT | prometeu | semantic batching + output chunking — técnica de redução de token reaproveitável |
| G22 | ADAPT | dedalo (host) | structural fingerprinting p/ update incremental; parte do motor da suíte |
| G23 | CREATE | dedalo (host) | ontologia/schema do grafo — fundação da suíte |
| G24 | CREATE | dedalo (host) | merge/dedup multi-agente; **eixo wiki sobrepõe graphify** |
| G25 | ADAPT | dedalo (host) | `.understandignore` — filtro de ruído reaproveitável no pipeline |
| G26 | CREATE | vendor | registry de extratores/parsers tree-sitter WASM (~20 langs) — biblioteca de análise estática inerte |
| G27 | CREATE | vendor | framework registry — extensão da biblioteca de extratores |
| G28 | CREATE | vendor | layer detector — parte do motor de análise |
| G29 | ADAPT | argos | busca semântica/embedding sobre grafo — encaixa no domínio de pesquisa/recuperação do Argos |
| G30 | CREATE | vendor | dashboard React Flow/ELK/Louvain — app de visualização inerte |
| G31 | CREATE | dedalo (host) | gerador de tour pedagógico; parte da suíte de onboarding |
| G32 | ADAPT | dedalo (skill-craftsman/Anvil) | matriz de empacotamento multiplataforma de plugin/skill — padrão de distribuição p/ o Anvil |

## Síntese

- **Decisão dominante: MISTA** (forte CREATE da suíte de compreensão de codebase + ADAPT de técnicas de engenharia/reflexo para dedalo/prometeu/argos).
- **Squad-alvo principal: dedalo** (hospeda a suíte; absorve reflexos via hooks-architect e empacotamento via skill-craftsman). Vendor recebe o motor estático + dashboard; prometeu recebe as técnicas de eficiência de token; argos recebe a busca semântica.
- **Recomendação:** a suíte é coesa o bastante para virar **um conjunto novo de skills (possivelmente um squad próprio de "compreensão de codebase")** governado pelo Dedalo, não um retalho diluído nos agentes atuais. Tratar G7/G13/G24 (eixo wiki/knowledge) em conjunto com `safishamsi--graphify` para não duplicar o motor de grafo de conhecimento.
