---
tipo: nota
area: Pluto
up: "[[Pluto/_MOC-pluto]]"
relacionado:
  - "[[Pluto/_origem|_origem]]"
---

# Pluto — Squad de Negócios e Escala

O Pluto é um squad de 16 agentes especializados que implementa, de ponta a ponta, os frameworks de negócios e escala de Alex Hormozi — desde a construção da oferta (Grand Slam Offer e Value Equation) e a geração de leads (Core 4 e $100M Leads), passando por precificação baseada em valor, fechamento de vendas (CLOSER framework), anúncios, conteúdo, hooks e lançamentos, até retenção, escala de $1M a $100M+, design de modelo de negócio, auditoria, copywriting e aconselhamento estratégico. O orquestrador Hormozi Chief diagnostica o problema central de qualquer negócio, roteia para o especialista certo e revisa a entrega em busca de alinhamento com a metodologia. O material-fonte inclui $100M Offers, $100M Leads, Gym Launch Secrets e a metodologia da Acquisition.com.

## Agentes

| Agente | O que faz |
|--------|-----------|
| hormozi-chief | Orquestrador: diagnostica o problema, roteia para o especialista e revisa a entrega |
| hormozi-offers | Cria Grand Slam Offers irresistíveis usando a Value Equation e empilhamento de bônus |
| hormozi-leads | Gera leads pelo framework Core 4 (warm, cold, content, paid ads) |
| hormozi-pricing | Define precificação baseada em valor e posicionamento premium |
| hormozi-closer | Conduz vendas pelo framework CLOSER e trata objeções |
| hormozi-ads | Estrutura e escala anúncios pagos no estilo Hormozi (ROAS, CPA, criativos) |
| hormozi-content | Constrói a content machine e a estratégia orgânica de conteúdo |
| hormozi-hooks | Cria hooks, headlines e aberturas que prendem a atenção |
| hormozi-launch | Planeja lançamentos, pré-vendas e entrada de mercado com mínimo risco |
| hormozi-retention | Reduz churn e maximiza LTV com onboarding e nutrição |
| hormozi-scale | Escala de $1M a $100M+ via sistemas, delegação e alavancagem |
| hormozi-models | Seleciona e desenha o modelo de negócio e a arquitetura de receita |
| hormozi-audit | Avalia o negócio e prescreve melhorias priorizadas |
| hormozi-copy | Escreve copy de alta conversão no estilo Hormozi |
| hormozi-workshop | Projeta e conduz workshops e eventos premium |
| hormozi-advisor | Dá aconselhamento estratégico na voz e filosofia de Alex Hormozi |

## Como ativar

```
@hormozi-chief        # Ativa o orquestrador
*diagnose             # Triagem do seu desafio de negócio
*business-turnaround  # Workflow completo de virada de negócio
*offer-pipeline       # Criação de oferta de ponta a ponta
```

Você também pode ativar um especialista diretamente, por exemplo `@hormozi-squad:hormozi-offers`, e usar os comandos slash de cada agente (ex.: `*grand-slam`, `*core-4`, `*closer`, `*price-audit`).

## Workflows

- **wf-business-turnaround** (`*business-turnaround`) — virada completa de um negócio: auditoria → diagnóstico → correção de oferta, leads, precificação e vendas.
- **wf-offer-creation** (`*offer-pipeline`) — criação de oferta de ponta a ponta, da Value Equation ao empilhamento de bônus, garantia e nomenclatura.

## Componentes

- **16 agentes**, **10 tasks**, **2 workflows**, **1 checklist**

## Requisitos

- AIOS >= 4.0.0

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
