# Dionisio — Squad de Movimentos e Comunidade

O Dionisio é um squad de 7 agentes para construir movimentos que transcendem marcas e produtos — da faísca (a tensão coletiva sentida) ao impacto (a mudança mensurável no mundo real). Ele percorre as 5 fases canônicas da construção de movimentos (Faísca → Identidade → Ignição → Crescimento → Impacto), orquestrando análise fenomenológica, arquitetura de identidade tribal, escrita de manifestos, estratégia de ciclos de crescimento e medição de impacto, com gates de checkpoint entre cada fase para garantir coerência ponta a ponta.

## Agentes

| Agente | Tier | Papel |
|--------|------|-------|
| **movement-chief** | 0 | Orquestrador de operações: faz o diagnóstico de fase e roteia para o especialista certo, coordenando todo o ciclo de vida do movimento. |
| **movement-architect** | 1 | Especialista em arquitetura de movimento e design de comunidade: desenha a estrutura geral do movimento e da tribo. |
| **fenomenologo** | 1 | Especialista em análise fenomenológica e experiência compartilhada: escava a tensão vivida que acende o movimento. |
| **identitario** | 1 | Especialista em arquitetura de identidade e formação tribal: define quem somos, no que acreditamos e contra o que nos posicionamos. |
| **estrategista-de-ciclo** | 2 | Especialista em estratégia de ciclo de crescimento e momentum: projeta o volante Atrair > Ativar > Sustentar > Multiplicar. |
| **manifestador** | 2 | Especialista em criação de manifestos e propagação narrativa: forja as palavras que cristalizam a identidade e se espalham. |
| **analista-de-impacto** | 2 | Especialista em medição de impacto e saúde de movimentos: mede se o movimento gera mudança real ou apenas ruído. |

## Como Ativar

```
@movement-chief    # Ativa o orquestrador
*diagnose          # Faz a triagem do seu desafio de movimento e roteia para o especialista
*build-movement    # Executa o workflow completo de lançamento de movimento (5 fases)
```

Também é possível ativar especialistas diretamente (ex.: `@manifestador` e depois `*manifesto`) quando a fase do movimento já é conhecida.

## Workflows

- **wf-movement-launch** (`*build-movement`) — Construção completa de movimento em 5 fases, da faísca ao impacto. Sequencial, com gate de checkpoint vetável pelo movement-chief entre cada fase. Produz 6 documentos entregáveis (faísca, identidade, manifesto, ignição, crescimento, impacto). Duração estimada: 2-4 horas.

## Componentes

- **7 agentes**, **7 tarefas**, **1 workflow**, **1 checklist**
- Dados de referência: `data/movement-frameworks.yaml` (frameworks canônicos), `data/routing-catalog.yaml` (roteamento por palavras-chave)

## Requisitos

- AIOS >= 4.0.0

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
