---
tipo: nota
area: Metis
up: "[[Metis/_MOC-metis]]"
relacionado:
  - "[[Metis/_origem|_origem]]"
---

# Metis — Squad de Analytics e Growth

O Metis é um squad de 7 estrategistas orientados por dados que reúne mentes de classe mundial em analytics, customer lifetime value, growth hacking, construção de audiência, customer success e community-led growth. O orquestrador (Data Chief) recebe sua pergunta, faz a triagem por domínio, estágio de crescimento e objetivo, e a roteia para o especialista certo — de web analytics a modelagem de CLV, de experimentação de growth a estratégia de comunidade — garantindo sempre recomendações acionáveis em vez de métricas de vaidade.

## Agentes

| Agente | O que faz |
|--------|-----------|
| **data-chief** (Datum) | Orquestrador: faz triagem, roteia e revisa a qualidade entre os domínios de analytics, growth e retenção |
| **avinash-kaushik** | Web analytics e mensuração de marketing digital — See-Think-Do-Care, DMMM, mata métricas de vaidade |
| **peter-fader** | Customer lifetime value e customer-centricity — modelos BG/NBD, whale curves, CBCV |
| **sean-ellis** | Growth hacking e product-market fit — Teste dos 40%, ICE scoring, North Star Metric, AARRR |
| **wes-kao** | Construção de audiência e cohort-based courses — Spiky Point of View, Rigorous Thinking, métricas educacionais |
| **nick-mehta** | Customer success e net revenue retention — health scores, NRR, prevenção de churn, receita de expansão |
| **david-spinks** | Community-led growth e estratégia de comunidade — modelo SPACES, engajamento de membros, ROI de comunidade |

## Como ativar

```
@data-chief             # Ativa o orquestrador
*diagnose               # Faz a triagem do seu desafio de dados
*analytics-setup        # Configura a infraestrutura de analytics
*growth-sprint          # Roda um sprint de crescimento de 2 semanas
```

Você também pode acionar um especialista diretamente, por exemplo: `@data-squad:sean-ellis`.

## Workflows

- **`*analytics-setup`** (`workflows/wf-analytics-setup.yaml`) — Configuração completa da infraestrutura de analytics: Objetivos > Métricas > Dashboards > Reporting > Otimização. Configuração única que estabelece a base de mensuração (4-8 horas).
- **`*growth-sprint`** (`workflows/wf-growth-sprint.yaml`) — Ciclo de sprint de crescimento de 2 semanas: Analisar > Levantar Hipóteses > Experimentar > Medir > Iterar. Repetível, cada sprint produz aprendizados validados que alimentam o próximo.

## Componentes

- **7 agentes**, **7 tasks**, **2 workflows**, **1 checklist**

## Requisitos

- AIOS >= 4.0.0

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
