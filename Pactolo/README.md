---
tipo: nota
area: Pactolo
up: "[[Pactolo/_MOC-pactolo]]"
---

# Pactolo — Squad de Finanças Operacionais (FP&A)

> **status:** semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)

Pactolo é o squad de **execução financeira** da Kolden — 5 agentes (1 orquestrador + 4 especialistas).
Onde o **Plutos (Olimpo/CFO) decide** a estratégia financeira (budget de mídia, precificação, margem-alvo,
estrutura de capital), o Pactolo **executa o FP&A**: planeja, modela, fecha o mês, projeta o caixa e mede
o unit economics operacional. É o rio dourado de Midas — onde os números brutos da operação viram ouro
legível: orçamento, forecast, demonstrações e indicadores prontos para decisão.

## Agentes

| Agente | Tier | Especialidade |
|--------|------|---------------|
| `pactolo-chief` | 0 | Orquestrador — tria (FP&A / modelagem / fechamento / caixa), roteia, QA e handoffs |
| `analista-fpa` | 1 | Planejamento e análise: orçamento, forecast rolling, budget vs actual, análise de variância, unit economics operacional |
| `modelador-financeiro` | 1 | Modelagem financeira: modelo de 3 demonstrações, projeção, cenários, sensibilidade, drivers |
| `controller` | 1 | Fechamento contábil: lançamentos, reconciliação, demonstrações financeiras, controles do close |
| `analista-de-fluxo-de-caixa` | 1 | Fluxo de caixa: projeção de caixa, capital de giro, runway, burn rate, ciclo de conversão |

## Como ativar

```
@pactolo-chief        # Ativa o orquestrador
*diagnose             # Tria a demanda (FP&A / modelagem / fechamento / caixa) e roteia
*journey              # Ciclo completo de FP&A (fechar → analisar variância → reprojetar → atualizar caixa)
```

Você também pode ativar um especialista direto: `@pactolo:controller`. O chief é o ponto de entrada recomendado.

## Matriz de roteamento (resumo)

| Demanda | Primário | Secundário |
|---|---|---|
| Orçamento / forecast / budget vs actual / variância | analista-fpa | modelador-financeiro |
| Projeção / cenários / sensibilidade / valuation operacional | modelador-financeiro | analista-fpa |
| Fechamento do mês / lançamento / reconciliação / DRE-BP-DFC | controller | analista-fpa |
| Fluxo de caixa / runway / burn / capital de giro | analista-de-fluxo-de-caixa | modelador-financeiro |
| CAC/LTV/payback/margem de contribuição (unit economics) | analista-fpa | modelador-financeiro |

## Fronteiras (o que o Pactolo NÃO faz)

- **Não decide estratégia financeira** (budget de mídia, precificação, margem-alvo, alocação de capital) →
  handoff ao **Plutos (Olimpo/CFO)**. O Pactolo entrega o número e o cenário; a decisão é do CFO.
- **Não coleta** dados de mercado/concorrência → consome do **Argos** (handoff de entrada).
- **Não instrumenta/lê** analytics de produto e atribuição de canal → handoff ao **Metis**.
- **Não faz** contabilidade fiscal/tributária estatutária nem parecer jurídico-contábil — fora do escopo desta versão.

## Distinção Pactolo × Plutos

| | Pactolo (este squad) | Plutos (Olimpo/CFO) |
|---|---|---|
| Camada | Operacional (executa o FP&A) | Estratégica (decide) |
| Pergunta | "Qual é o número, o cenário e a variância?" | "O que fazemos com esse número?" |
| Entrega | Orçamento, modelo, fechamento, projeção de caixa, unit economics | Budget de mídia, precificação, margem-alvo, alocação de capital |
| Direção | Prepara a decisão e faz **handoff de subida** | Recebe o pacote e **decide** |

## Vetos invioláveis

1. **Decisão estratégica é handoff ao Plutos** — o Pactolo prepara o número e o cenário; nunca decide budget,
   preço ou margem por conta própria.
2. **Todo número carrega a fonte e a premissa** — sem fonte (razão contábil, extrato, sistema, premissa
   declarada), é estimativa rotulada, não fato.
3. **Premissa explícita** — toda projeção lista suas premissas (driver, taxa, período); cenário sem premissa visível é rejeitado.
4. **Conciliação antes de reportar** — não se reporta demonstração sem reconciliação fechada (diferença = 0 ou explicada).

## Componentes (semente)

- **5 agentes** — 1 orquestrador + 4 especialistas
- **5 habilidades-âncora** — `analise-fpa-e-variancia`, `modelagem-financeira`, `fechamento-contabil`,
  `gestao-de-fluxo-de-caixa`, `unit-economics-operacional` (catálogo em `.claude/skills/catalogo.md`)
- **1 memória** — `MEMORY.md` (Padrões Ativos / Candidatos / Arquivado)

## Origem

Estrutura-semente criada no lote de absorção 2026-06-26 a partir do cluster **finance** dos dossiês
`alirezarezvani/claude-skills@4a3c05b` (G18 — financial-analyst, saas-metrics, FP&A; MIT) e do plugin
`finance` de `anthropics/knowledge-work-plugins@78d74d5` (G5 — journal-entry, reconciliation,
financial-statements, variance-analysis, close-management; Apache-2.0). Sem cópia literal — princípios
reescritos. Refino completo pelo Ritual do Caos (9 fases) pendente.

## Ritual de Encerramento (auto-aprendizado obrigatório)

Todo agente deste squad, ao final de uma sessão com trabalho, aciona a habilidade `ritual-de-encerramento`
— reflete, extrai lições verificadas e grava na memória do squad (`MEMORY.md`). Fonte única:
`C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`.
