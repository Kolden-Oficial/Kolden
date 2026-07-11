---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/rohitg00--ai-engineering-from-scratch/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/rohitg00--ai-engineering-from-scratch/seguranca|seguranca]]"
---

# Mapa de decisão (F4) — rohitg00--ai-engineering-from-scratch

- **slug:** `rohitg00--ai-engineering-from-scratch` · **sha:** `c8b9b9244f...` · **rota:** A
- **Princípio aplicado:** REUSE > ADAPT > CREATE, com **viés ADAPT/CREATE** (REUSE sem prova item-a-item = perda silenciosa).
- **Leitura-chave:** o repo é majoritariamente **material de referência/curso**. O grosso do corpus
  (matemática, CV, NLP, speech, RL, multimodal, infra de treino/serving) **não tem squad operacional
  equivalente na Kolden** — destino natural é `referencias/biblioteca` (entra como referência inerte,
  indexada, sem virar 487 skills). Os bolsões com valor operacional direto (agentes, MCP, multiagente,
  segurança/alinhamento) **ADAPTam** para squads existentes (dedalo/prometeu/egide). Nenhum REUSE limpo
  encontrado: o que a Kolden já tem (ex.: agente-loop no Hermes, mcp-builder no Prometeu) é
  implementação própria, não equivalente item-a-item a estes prompt-methods didáticos.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | CREATE | referencias | Currículo completo de AI eng vira biblioteca de referência indexada; sem squad de educação/ML-research. |
| G2 | CREATE | referencias | Implementações "from scratch" são acervo de estudo (Liceu/Dedalo), não capacidade operacional. |
| G3 | CREATE | referencias | Banco de quizzes é dado de apoio; nenhum squad consome quiz hoje. |
| G4 | CREATE | referencias | Matemática de ML: sem squad-alvo; referência pura. |
| G5 | CREATE | referencias | ML clássico: sem squad de modelagem; referência. |
| G6 | CREATE | referencias | Deep learning core: referência técnica, sem operação na Kolden. |
| G7 | CREATE | referencias | Computer vision: fora do escopo operacional atual; referência. |
| G8 | CREATE | referencias | NLP (ML): não confundir com copy/Caliope; é ML, vai para referência. |
| G9 | CREATE | referencias | Speech/áudio: sem squad-alvo; referência. |
| G10 | CREATE | referencias | Transformers internos: referência técnica. |
| G11 | CREATE | referencias | IA generativa (modelos): referência; geração de mídia operacional é outra stack. |
| G12 | CREATE | referencias | RL: sem squad-alvo; referência. |
| G13 | CREATE | referencias | LLMs from scratch: referência técnica profunda. |
| G14 | ADAPT | argos + prometeu | RAG/eval/prompting/fine-tuning úteis: RAG→argos (pesquisa/retrieval), eval/LLM-eng→prometeu; resto→referencias. |
| G15 | CREATE | referencias | Multimodal (VLM/CLIP): referência; sem operação direta. |
| G16 | ADAPT | prometeu + dedalo | 23 métodos de MCP/tool-schema/oauth/a2a/otel — reforçam `mcp-builder` (Prometeu) e eng de agentes (Dedalo). |
| G17 | ADAPT | dedalo + prometeu | 42 métodos de agent-engineering (ReAct/ReWOO/Reflexion/ToT/tool-registry/memória) — núcleo p/ Dedalo; herança p/ Prometeu. |
| G18 | ADAPT | dedalo | Sistemas autônomos (loops longos, computer-use, budgets de turno) — melhora padrões de agente do Dedalo. |
| G19 | ADAPT | dedalo | Multiagente/swarms (supervisor, topologia, consenso, handoff) — relevante p/ orquestração (Dedalo/Caos/Olimpo). |
| G20 | ADAPT | metis | Observability/SLO/FinOps de LLM tocam analytics (Metis); vLLM/quantization/serving→referencias. |
| G21 | ADAPT | egide | 30 métodos de red-team/prompt-injection/jailbreak/bias/DP/compliance/CVE — ganho direto p/ Egide (segurança). |
| G22 | CREATE | referencias | Capstones são blueprints de projeto ponta-a-ponta; entram como referência/inspiração. |
| G23 | ADAPT | caliope + referencias | 99 system-prompts: poucos templates transversais ADAPTam p/ biblioteca de prompts (Caliope/copy); maioria→referencias. |
| G24 | ADAPT | caos-fabrica | Padrão "gerar quiz a partir de docs" é técnica meta reutilizável p/ avaliação de agentes/onboarding. |
| G25 | ADAPT | caos-fabrica | Padrão placement→trilha personalizada útil ao Caos p/ onboarding/diagnóstico; não a skill course-bound. |
| G26 | ADAPT | caos-fabrica | `install_skills.py` (instalar artefatos por frontmatter+manifest+layout) é exatamente o que a fábrica empacota. |
| G27 | CREATE | referencias | Tooling de governança de currículo (audit/scaffold/link-check): referência de processo, não vendor ativo. |
| G28 | ADAPT | caos-fabrica | O formato "Produce / Hard rejects / Refusal rules / Output" é molde de qualidade p/ a habilidade `criacao-de-skill`. |
| G29 | CREATE | referencias | Convenções de governança (AGENTS.md): referência de processo. |
| G30 | CREATE | referencias | Glossário + ROADMAP: referência de apoio. |

## Síntese
- **Decisão dominante:** **MISTA** — predomínio **CREATE→referencias** (corpus de curso/ML sem squad-alvo),
  com **bolsões ADAPT** de alto valor: **dedalo** (G17/G18/G19), **prometeu** (G16/G17/G14),
  **egide** (G21), **metis** (G20), **argos** (G14), **caos-fabrica** (G24/G25/G26/G28).
- **Zero REUSE:** nenhum match item-a-item provável; o que a Kolden já tem é implementação própria,
  não equivalente a estes prompt-methods didáticos.
- **Ressalva de volume:** os bolsões ADAPT não devem importar os 487 artefatos crus. A fase de escrita
  deve **curar** — selecionar os métodos-âncora por cluster (ex.: agent-loop, tool-registry, mcp-threat-model,
  prompt-injection/red-team) e reescrevê-los em PT-BR como habilidades/heranças, citando este acervo como fonte.
