# Olimpo — Squad C-Level (Executivos)

> **Este README é vendor xquads-squads (MIT).** Identidade canônica Kolden vive em `CLAUDE.md` + `prd-de-ia.md` + `constitution.md` desde a Onda 4 do METODO Kolden (2026-07-09). Ler CLAUDE.md antes deste README para contexto canônico.

O Olimpo é uma C-suite virtual: oito agentes que encarnam as perspectivas estratégicas dos principais papéis executivos de uma empresa. Ele resolve o problema de tomar decisões de alto nível — visão, operações, marketing, tecnologia, sistemas de informação, estratégia de IA, finanças e receita — sem ter um time de executivos sênior à disposição. Você traz um desafio de negócio, e o squad diagnostica, roteia para o executivo certo, aplica frameworks reconhecidos (OKR, 5 Forças de Porter, Oceano Azul, Technology Radar, Matriz Construir-Comprar-Parceria, modelos de maturidade de IA) e sintetiza tudo em uma direção estratégica coerente.

## Agentes

Cada deus carrega **três identificadores**: o nome simbólico (a identidade), o **cargo técnico** de
mercado (CEO/COO…) e os `routing_triggers` — os gatilhos que casam o pedido com o executivo certo (o
"SEO de agents"). O roteamento do Zeus usa esses gatilhos.

| Deus (`id`) | Cargo | Domínio e gatilhos de roteamento |
|-------------|-------|----------------------------------|
| **Zeus** (`zeus`) | CEO / Orquestrador | Visão, estratégia, prioridade, captação, cultura, conselho, pivot — diagnostica e roteia |
| **Poseidon** (`poseidon`) | COO | Processo, operação, escala, KPI/OKR, SLA, onboarding de cliente, eficiência |
| **Apolo** (`apolo`) | CMO | Copy, conteúdo, criativo, campanha, tráfego pago, marca, funil, SEO/CRO, go-to-market |
| **Hefesto** (`hefesto`) | CTO | Site, landing page, web dev, API, arquitetura, build vs buy, deploy, dívida técnica |
| **Hades** (`hades`) | CIO | Infra, servidor, segurança, backup, governança de TI, LGPD, rede, Infisical/MCP |
| **Atena** (`atena`) | CAIO | IA, agente, prompt, automação, ML/RAG/LLM, orquestração, IA responsável |
| **Plutos** (`plutos`) | CFO | Finanças, orçamento, budget de mídia, custo, margem, preço, unit economics, CAC/LTV, caixa, ROI |
| **Afrodite** (`afrodite`) | CRO | Venda, lead, pipeline, proposta, fechamento, conversão, CRM/GHL, follow-up, MRR, churn |

> O squad opera sobre o **Contrato de Missão** (`contratos/`) — cada deus assina sua seção `executivos[]`
> na descida e na subida. Ver o arquivo do `zeus` para o fluxo completo.

## Como ativar

O ponto de entrada é o orquestrador **poseidon** quando o foco for execução operacional, mas o cérebro estratégico do squad é o **zeus**, que recebe o desafio e roteia. Ative-o e use os comandos:

```
@zeus        # Ativa o CEO (orquestrador estratégico)
*diagnose            # Faz a triagem do seu desafio executivo e roteia
*strategic-planning  # Planejamento estratégico completo, ponta a ponta
*board-presentation  # Prepara uma apresentação para o conselho
```

Cada especialista também tem seus próprios comandos (por exemplo, `*gtm`, `*architect`, `*ai-strategy`, `*secure`, `*okr`) — consulte o arquivo do agente correspondente em `agents/`.

## Workflows disponíveis

- **wf-strategic-planning** — Planejamento estratégico que flui de Visão > Estratégia > Operações > Marketing > Tecnologia > IA, com cada fase adicionando uma camada de profundidade ao plano empresarial.
- **wf-board-presentation** — Preparação de apresentação para conselho/investidores: Coleta de Dados > Narrativa > Criação do Deck > Ensaio.

## Componentes

- **8 agentes**, **7 tarefas**, **2 workflows**, **1 checklist** de qualidade
- Frameworks de referência em `data/executive-frameworks.yaml`
- Catálogo de roteamento em `data/routing-catalog.yaml`

## Requisitos

- AIOS >= 4.0.0

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
