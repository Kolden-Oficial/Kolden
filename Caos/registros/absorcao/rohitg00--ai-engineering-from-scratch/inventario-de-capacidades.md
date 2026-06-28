# Inventário de capacidades — rohitg00--ai-engineering-from-scratch

- **slug:** `rohitg00--ai-engineering-from-scratch` · **sha:** `c8b9b9244f...` · **rota:** A
- **Natureza real:** curso "do zero" de AI engineering — 20 fases, ~503 lições. Cada lição
  ("Build It / Use It") embarca um artefato reutilizável. O repo **não** é um pacote de skills
  operacionais prontas; os 388 "skills" + 99 "prompts" são **artefatos didáticos por lição**
  (`phases/**/outputs/`). Como o volume é grande, o inventário é **agrupado por cluster** (não 1 ID por
  arquivo), conforme orientação da missão. Os assets discretos (2 skills Claude reais, scripts, padrão
  de tooling) recebem ID próprio.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Corpus do currículo: ~503 lições `docs/en.md` (explicações "Build It / Use It", 20 fases) | referencia | curso, ai-engineering, do-zero, currículo | educação/eng de IA | `phases/*/*/docs/en.md` (503 arquivos) |
| G2 | Corpus de código "from scratch": `main.{py,ts,rs}` por lição (backprop, tokenizer, attention, agent loop à mão) | referencia | implementação, from-scratch, python, typescript, rust | ML/eng | `phases/*/*/code/main.*` |
| G3 | Banco de quizzes: ~503 `quiz.json` (questões por lição) | referencia | avaliação, quiz, conhecimento | educação | `phases/*/*/quiz.json` |
| G4 | Cluster prompt-methods — Math Foundations (11) | metodo-prompt | álgebra linear, probabilidade, info-theory, fourier | matemática de ML | `phases/01-math-foundations/**/outputs/skill-*.md` |
| G5 | Cluster prompt-methods — ML Fundamentals (10) | metodo-prompt | regressão, árvores, métricas, regularização | ML clássico | `phases/02-ml-fundamentals/**/outputs/skill-*.md` |
| G6 | Cluster prompt-methods — Deep Learning Core (4) | metodo-prompt | backprop, otimizadores, mini-framework | deep learning | `phases/03-deep-learning-core/**/outputs/skill-*.md` |
| G7 | Cluster prompt-methods — Computer Vision (28) | metodo-prompt | cnn, resnet, gan, diffusion, segmentação, ocr | visão computacional | `phases/04-computer-vision/**/outputs/skill-*.md` |
| G8 | Cluster prompt-methods — NLP (22) | metodo-prompt | tokenização, embeddings, ner, entity-linking | NLP | `phases/05-nlp-foundations-to-advanced/**/outputs/skill-*.md` |
| G9 | Cluster prompt-methods — Speech & Audio (17) | metodo-prompt | asr, tts, áudio, librosa | fala/áudio | `phases/06-speech-and-audio/**/outputs/skill-*.md` |
| G10 | Cluster prompt-methods — Transformers Deep Dive (15) | metodo-prompt | attention, qkv, transformer, kv-cache | transformers | `phases/07-transformers-deep-dive/**/outputs/skill-*.md` |
| G11 | Cluster prompt-methods — Generative AI (15) | metodo-prompt | gan, vae, diffusion, geração | IA generativa | `phases/08-generative-ai/**/outputs/skill-*.md` |
| G12 | Cluster prompt-methods — Reinforcement Learning (12) | metodo-prompt | rl, policy, reward, marl | aprendizado por reforço | `phases/09-reinforcement-learning/**/outputs/skill-*.md` |
| G13 | Cluster prompt-methods — LLMs from Scratch (17) | metodo-prompt | gpt, pré-treino, tokenizer, sampling | LLM interno | `phases/10-llms-from-scratch/**/outputs/skill-*.md` |
| G14 | Cluster prompt-methods — LLM Engineering (17) | metodo-prompt | rag, prompting, fine-tuning, lora, eval | engenharia de LLM | `phases/11-llm-engineering/**/outputs/skill-*.md` |
| G15 | Cluster prompt-methods — Multimodal AI (25) | metodo-prompt | vlm, clip, vision-language, multimodal | multimodal | `phases/12-multimodal-ai/**/outputs/skill-*.md` |
| G16 | Cluster prompt-methods — Tools & Protocols / MCP (23) | metodo-prompt | mcp, tool-schema, function-calling, oauth, a2a, otel-genai | protocolo/tooling de agentes | `phases/13-tools-and-protocols/**/outputs/skill-*.md` |
| G17 | Cluster prompt-methods — Agent Engineering (42) | metodo-prompt | react, rewoo, reflexion, tree-of-thoughts, tool-registry, memgpt, prompt-injection | eng de agentes | `phases/14-agent-engineering/**/outputs/skill-*.md` |
| G18 | Cluster prompt-methods — Autonomous Systems (22) | metodo-prompt | autonomia, planejamento, loops longos, computer-use | sistemas autônomos | `phases/15-autonomous-systems/**/outputs/skill-*.md` |
| G19 | Cluster prompt-methods — Multi-Agent & Swarms (23) | metodo-prompt | supervisor, topologia, consenso, handoff, a2a, swarm | multiagente/orquestração | `phases/16-multi-agent-and-swarms/**/outputs/skill-*.md` |
| G20 | Cluster prompt-methods — Infra & Production (28) | metodo-prompt | vllm, slo, autoscaling, finops, observability, quantization | infra/produção de LLM | `phases/17-infrastructure-and-production/**/outputs/skill-*.md` |
| G21 | Cluster prompt-methods — Ethics, Safety & Alignment (30) | metodo-prompt | red-team, prompt-injection, jailbreak, bias, dp-audit, compliance, cve | segurança/alinhamento de IA | `phases/18-ethics-safety-alignment/**/outputs/skill-*.md` |
| G22 | Cluster prompt-methods — Capstone Projects (27) | metodo-prompt | rag-chatbot, coding-agent, voice, doc-qa, observability | blueprints de projeto ponta-a-ponta | `phases/19-capstone-projects/**/outputs/skill-*.md` |
| G23 | Cluster de prompts de sistema por lição (99 `prompt-*.md`, templates de system prompt) | metodo-prompt | system-prompt, diagnóstico, template | biblioteca de prompts | `phases/**/outputs/prompt-*.md` |
| G24 | Skill Claude real — `check-understanding`: gera quiz de 8 questões a partir dos `docs/en.md` de uma fase | skill | quiz, avaliação, geração-de-perguntas, AskUserQuestion | meta/educação | `.claude/skills/check-understanding/SKILL.md` |
| G25 | Skill Claude real — `find-your-level`: placement test de 10 questões → ponto de entrada + trilha personalizada | skill | onboarding, placement, trilha, assessment | meta/educação | `.claude/skills/find-your-level/SKILL.md` |
| G26 | Tooling `install_skills.py`: varre `phases/**/outputs/`, parseia frontmatter, instala artefatos em layout `flat/by-phase/skills` + `manifest.json` | ferramenta | instalação, frontmatter, manifest, layout-de-skill | meta/empacotamento | `scripts/install_skills.py` |
| G27 | Tooling de currículo: `audit_lessons.py`, `build_catalog.py`, `check_readme_counts.py`, `link_check.py`, `scaffold_workbench.py`, `scaffold-lesson.sh` (invariantes + scaffolding de lição) | ferramenta | auditoria, scaffolding, catálogo, link-check | meta/governança de repo | `scripts/*.py`, `scripts/*.sh` |
| G28 | Padrão de empacotamento "artefato reutilizável por lição" (frontmatter name/description/version/phase/lesson/tags + seção Produce/Hard rejects/Refusal rules/Output) | metodo-prompt | padrão-de-skill, frontmatter, guardrails, refusal-rules | meta/design de skill | `phases/14-agent-engineering/01-the-agent-loop/outputs/skill-agent-loop.md` (exemplar) |
| G29 | Convenções de governança de curso (AGENTS.md): 1 commit/lição, conventional commits, allowlist de deps, original-only, mermaid/svg | referencia | governança, contribuição, convenções | meta/processo | `AGENTS.md` |
| G30 | Glossário canônico (termos + mitos) e ROADMAP de 20 fases com estimativas de horas | referencia | glossário, roadmap, definições | educação | `glossary/terms.md`, `glossary/myths.md`, `ROADMAP.md` |

**Totais de origem:** 388 `skill-*.md` + 99 `prompt-*.md` + 503 `docs/en.md` + 503 `quiz.json` +
2 skills Claude reais + 9 scripts. Consolidados em **30 IDs por cluster** (G1–G30).
