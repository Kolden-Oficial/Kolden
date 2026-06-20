# Olimpo — Squad C-Level (Executivos)

O Olimpo é uma C-suite virtual: seis agentes que encarnam as perspectivas estratégicas dos principais papéis executivos de uma empresa. Ele resolve o problema de tomar decisões de alto nível — visão, operações, marketing, tecnologia, sistemas de informação e estratégia de IA — sem ter um time de executivos sênior à disposição. Você traz um desafio de negócio, e o squad diagnostica, roteia para o executivo certo, aplica frameworks reconhecidos (OKR, 5 Forças de Porter, Oceano Azul, Technology Radar, Matriz Construir-Comprar-Parceria, modelos de maturidade de IA) e sintetiza tudo em uma direção estratégica coerente.

## Agentes

| Agente | O que faz |
|--------|-----------|
| **vision-chief** | CEO / Orquestrador — define a visão e a direção estratégica, diagnostica desafios e roteia para o especialista certo |
| **coo-orchestrator** | COO — excelência operacional, processos, escala, estrutura de equipe, KPIs e OKRs |
| **cmo-architect** | CMO — estratégia de marca, posicionamento, geração de demanda e go-to-market |
| **cto-architect** | CTO — estratégia de tecnologia, decisões de arquitetura, build vs buy e cultura de engenharia |
| **cio-engineer** | CIO — sistemas de informação, infraestrutura, segurança, conformidade e governança de TI |
| **caio-architect** | CAIO — estratégia de IA, pipelines de ML, IA responsável e automação |

## Como ativar

O ponto de entrada é o orquestrador **coo-orchestrator** quando o foco for execução operacional, mas o cérebro estratégico do squad é o **vision-chief**, que recebe o desafio e roteia. Ative-o e use os comandos:

```
@vision-chief        # Ativa o CEO (orquestrador estratégico)
*diagnose            # Faz a triagem do seu desafio executivo e roteia
*strategic-planning  # Planejamento estratégico completo, ponta a ponta
*board-presentation  # Prepara uma apresentação para o conselho
```

Cada especialista também tem seus próprios comandos (por exemplo, `*gtm`, `*architect`, `*ai-strategy`, `*secure`, `*okr`) — consulte o arquivo do agente correspondente em `agents/`.

## Workflows disponíveis

- **wf-strategic-planning** — Planejamento estratégico que flui de Visão > Estratégia > Operações > Marketing > Tecnologia > IA, com cada fase adicionando uma camada de profundidade ao plano empresarial.
- **wf-board-presentation** — Preparação de apresentação para conselho/investidores: Coleta de Dados > Narrativa > Criação do Deck > Ensaio.

## Componentes

- **6 agentes**, **7 tarefas**, **2 workflows**, **1 checklist** de qualidade
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
