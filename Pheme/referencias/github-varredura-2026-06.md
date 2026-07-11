---
tipo: nota
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
---

# Varredura GitHub — Repositórios para Turbinar os Agentes da Kolden

**Data:** 2026-06-20
**Contexto:** Varredura pedida pelo Ronan para encontrar repositórios de alto star que
(a) turbinam os agentes da Kolden (performance, memória, skills, padrões) e
(b) sustentam o squad **Pheme** de social media — em especial a publicação real.
**Método:** busca via GitHub MCP (`search_repositories`, ordenado por stars).

> **Legenda:** ★ = stars aproximados na data da varredura.

---

## 🟢 ADOTAR — impacto direto

### Publicação (núcleo do squad Pheme — "postar no final")
| Repo | ★ | Para que serve |
|------|---|----------------|
| [gitroomhq/postiz-app](https://github.com/gitroomhq/postiz-app) | ~32k | **Canal principal de publicação.** Agenda/posta em IG, TikTok, YouTube, LinkedIn, X, Pinterest, Threads, Facebook. Self-host. |
| [gitroomhq/postiz-agent](https://github.com/gitroomhq/postiz-agent) | ~300 | **CLI que conecta o Postiz ao Claude Code** — é o que o `publisher` usa para postar/agendar. |
| [gitroomhq/postiz-n8n](https://github.com/gitroomhq/postiz-n8n) | ~56 | Node n8n do Postiz para orquestração de publicação em pipelines. |

### Skills & capacidades para os agentes
| Repo | ★ | Para que serve |
|------|---|----------------|
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | ~34k | **Skills de marketing** p/ Claude Code: CRO, copywriting, SEO, analytics, growth. Instalar os relevantes em Pheme/Caliope/Metis. |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | ~22k | 100+ subagents — padrões de referência para escrever especialistas tier 1. |
| [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | ~65k | Catálogo curado de Claude Skills para compor capacidades. |
| [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | ~41k | Biblioteca de 1.500+ skills agentic instaláveis (com CLI). |
| [enescingoz/awesome-n8n-templates](https://github.com/enescingoz/awesome-n8n-templates) | ~23k | 280+ templates de automação n8n — vários de **social media** e RAG. |
| [growchief/growchief](https://github.com/growchief/growchief) | ~3.3k | Automação/outreach de social media (crescimento). |
| [davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude) | ~3k | Hub de skills/agents/commands/hooks/plugins para Claude Code. |

### Memória persistente (continuidade dos agentes)
| Repo | ★ | Para que serve |
|------|---|----------------|
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | ~83k | Memória persistente entre sessões para Claude Code (captura + compressão + reinjeção de contexto). |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | ~59k | Camada de memória universal para agentes (alternativa/complemento). |

> Nota: a Kolden já tem o **Ritual de Encerramento** (auto-aprendizado em `MEMORY.md`).
> claude-mem/mem0 são candidatos para reforçar memória de longo prazo — avaliar antes de adotar.

---

## 🔵 ESTUDAR — padrões de prompt e arquitetura
| Repo | ★ | Para que serve |
|------|---|----------------|
| [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) | ~76k | Guia de prompt/context engineering, RAG e agentes. |
| [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | ~58k | Boas práticas de engenharia agêntica com Claude Code. |
| [dontriskit/awesome-ai-system-prompts](https://github.com/dontriskit/awesome-ai-system-prompts) | ~6k | Coletânea de system prompts de ferramentas de IA. |
| Frameworks maduros (referência) | — | `langchain`, `crewAI`, `browser-use`, `firecrawl`, `infiniflow/ragflow`, `aaif-goose/goose`. |

---

## ⚠️ Cautela de confiança (verificar antes de adotar)

A busca retornou alguns repos com contagem de stars **anômala/altíssima** e descrições
com termos suspeitos ("OpenClaw", "Moltbot", "clawdbot", "Hermes-agent" genérico).
Provável inflação artificial / typosquat. **Não adotar sem verificar reputação, autoria
e histórico.** Exemplos observados:
- `affaan-m/ECC` (~218k★) — "agent harness performance optimization".
- `NousResearch/hermes-agent` (~197k★) — "the agent that grows with you".

Priorizar sempre repos de organizações conhecidas (gitroomhq, VoltAgent, ComposioHQ,
dair-ai, mem0ai, langchain-ai, firecrawl, infiniflow).

---

## Próximos passos sugeridos
1. Subir o **Postiz** (self-host) e conectar as contas da Kolden — ver `.claude/skills/publicacao-social/SKILL.md`.
2. Garimpar **marketingskills** e **awesome-claude-skills** e instalar as skills úteis em Pheme/Caliope/Metis.
3. Avaliar **claude-mem/mem0** como reforço de memória de longo prazo (vs. Ritual de Encerramento atual).
4. Registrar Postiz no catálogo `sobre-a-empresa/Ferramentas/ferramentas.md` (feito nesta entrega).
