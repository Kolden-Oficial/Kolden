# Themis — Squad de Conselho Estratégico (Advisory Board)

Themis é um conselho consultivo virtual composto por 11 mentes estratégicas de classe mundial — investidores, filósofos-empreendedores e pensadores de liderança — reunidos em torno da mesma mesa. Um orquestrador (Presidente do Conselho) diagnostica a sua questão, roteia para os conselheiros mais relevantes, gere a tensão produtiva entre visões divergentes e sintetiza tudo numa recomendação acionável, sempre preservando as vozes dissidentes. O squad cobre quatro domínios de aconselhamento — financeiro, empreendedor, organizacional e filosófico — para investimento, modelos mentais, escalonamento, propósito, cultura de equipe, empreendedorismo minimalista e negócio orientado por missão.

## Agentes

| Agente | O que faz |
|--------|-----------|
| **board-chair** (Presidente do Conselho) | Orquestrador tier 0: diagnostica, roteia, facilita a deliberação e sintetiza as perspectivas em recomendações claras. |
| **ray-dalio** | Decisões baseadas em princípios, ciclos econômicos, gestão de risco e verdade/transparência radical. |
| **charlie-munger** | Treliça de modelos mentais, 25 vieses cognitivos e pensamento por inversão para evitar a estupidez. |
| **naval-ravikant** | Criação de riqueza por alavancagem e conhecimento específico, julgamento e felicidade como habilidade. |
| **peter-thiel** | Pensamento contrário, monopólio, segredos e a lógica zero-a-um (criar vs. copiar). |
| **reid-hoffman** | Efeitos de rede, blitzscaling, planejamento ABZ e estratégia de talentos por alianças. |
| **simon-sinek** | Liderança orientada por propósito, o Golden Circle (Comece pelo Porquê) e o jogo infinito. |
| **brene-brown** | Vulnerabilidade como coragem, resiliência à vergonha, confiança (BRAVING) e liderança ousada. |
| **patrick-lencioni** | Saúde organizacional e dinâmica de equipe pela pirâmide das Cinco Disfunções. |
| **derek-sivers** | Empreendedorismo minimalista, o filtro "Hell Yeah or No" e a sabedoria do "o suficiente". |
| **yvon-chouinard** | Negócio orientado por missão, ativismo ambiental, qualidade duradoura e filosofia anticrescimento. |

## Como ativar

```
@board-chair                  # Ativa o orquestrador (Presidente do Conselho)
@advisory-board:ray-dalio     # Fala diretamente com um conselheiro específico

*diagnose                     # Faz a triagem da sua questão estratégica e sugere a rota
*convene-board                # Sessão completa do conselho consultivo
*board-meeting                # Reunião completa do conselho (workflow)
*decision-framework           # Análise de decisão estruturada por múltiplas lentes
*seek-investment-counsel      # Comitê de investimento (Dalio, Munger, Thiel)
*evaluate-scaling             # Conselho de escalonamento (Hoffman, Thiel, Naval)
*resolve-culture-crisis       # Círculo de cultura (Sinek, Brown, Lencioni)
*get-founder-counsel          # Conselho do fundador (Sivers, Chouinard, Naval)
*review                       # Revisa a saída de um especialista pelo checklist de qualidade
```

## Workflows

- **wf-board-meeting** (`*board-meeting`, ~1-2 horas) — Reunião completa do conselho: o Presidente enquadra a questão, 3-5 conselheiros contribuem em paralelo com suas perspectivas, depois o Presidente sintetiza uma recomendação unificada com checagem contrária e próximos passos.
- **wf-decision-framework** (`*decision-framework`, ~45-90 minutos) — Análise de decisão por múltiplas lentes combinando os modelos mentais de Munger, os princípios de Dalio, o pensamento contrário de Thiel e o raciocínio por primeiros princípios de Naval.

## Componentes

- **11 agentes**, **7 tasks**, **2 workflows**, **1 checklist**

## Requisitos

- AIOS >= 4.0.0

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
