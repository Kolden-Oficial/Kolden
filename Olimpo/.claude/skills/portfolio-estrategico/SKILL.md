---
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

<!--
Atribuição: adaptado de msitarzewski/agency-agents@a597cb6
(project-management/, gaps G6 e G17 do diagnóstico de absorção).
Licença upstream: MIT. Adaptação Kolden — sem cópia literal; PT-BR.
-->
---
name: portfolio-estrategico
description: |
  Use quando precisar decidir prioridade entre projetos competitivos C-level (não dentro de 1 projeto —
  isso é PM/PO), alocar capital/recursos entre iniciativas, ou avaliar continuação/parada de projeto
  estratégico (kill criteria). Rubrica multi-eixo (valor estratégico × ROI × risco × dependência).
  Acionada por Zeus primário; Plutos secundário (lado financeiro). Não substitui priorizacao-rice
  da Aletheia (essa é dentro de validação) nem moscow-kano-mcda do Prometeu (essa é dentro de release).
domain: estrategia-executiva
subdomain: portfolio-management
agente_dono: [zeus]
agente_secundario: [plutos]
tags: [portfolio, priorizacao-c-level, alocacao-de-capital, kill-criteria, roi-estrategico]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G6, G17)
status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)
---

# Portfólio Estratégico

Habilidade C-level de **decisão entre projetos competitivos** — não dentro de um projeto. Avalia, prioriza, alterna capital e mata o que não vinga.

## Quando usar

- Decisão C-level entre N projetos competitivos por recursos finitos (tempo, dinheiro, atenção, equipe).
- Avaliação trimestral / anual de portfólio (qual continua, qual acelera, qual pára).
- **Kill criteria** de projeto em andamento (continuar / pivotar / parar).
- Alocação de capital entre Kolden core, lançamentos novos, mentoria, infoproduto, novas frentes.

## NÃO usar para

- Priorização **dentro de 1 projeto** (use Prometeu `moscow-kano-mcda` ou Aletheia `priorizacao-rice`).
- Priorização de **validação** (Aletheia — é fase anterior, ainda não virou projeto).
- Decisão **tática de sprint** (Prometeu — é fase posterior, dentro de release).
- Comparar features de um mesmo produto (é PM/PO, não C-level).

## G6 — Rubrica multi-eixo (5 dimensões)

Cada projeto recebe nota 1-10 em cada dimensão. Pondera-se pelos pesos. Compara-se o score entre projetos.

| Dimensão | Peso sugerido | Escala 1-10 |
|---|---:|---|
| **Valor estratégico** | 30% | Quanto move a tese da empresa — não o revenue do quarter |
| **ROI esperado** | 25% | Retorno financeiro / custo (calibrado com Pactolo) |
| **Risco** | 20% | Probabilidade × severidade de falhar (inverter na soma: 10 = sem risco) |
| **Dependência** | 15% | Quantos outros projetos dependem deste para se mover |
| **Posicionamento competitivo** | 10% | Diferenciação que **cria** vantagem (não que copia o mercado) |

**Score ponderado = Σ (escala × peso).** Comparar entre projetos.

Os pesos são **sugestão** — Zeus + Plutos podem recalibrar por momento da empresa (em fit-finding, "valor estratégico" pesa mais; em colheita, "ROI" pesa mais).

## G17 — Priorização risco-ROI (matriz 2D)

Plot 2D rápido para decisão executiva:

- **Eixo X:** ROI esperado (baixo → alto)
- **Eixo Y:** Risco (alto → baixo)

Quadrantes:

| Quadrante | Decisão |
|---|---|
| **Alto ROI / Baixo risco** | **ACELERAR** — recursos prioritários, máxima velocidade |
| **Alto ROI / Alto risco** | **APOSTAR** — segue com kill criteria explícitos + checkpoints curtos |
| **Baixo ROI / Baixo risco** | **MANTER** — sem mais recursos; só executar o que está rodando |
| **Baixo ROI / Alto risco** | **MATAR** — a menos que seja estratégico (e aí justifique por escrito) |

Matriz é resumo visual; rubrica multi-eixo é a fundamentação.

## Kill criteria

- **Definir ANTES de começar, não no meio.** Kill criteria definidos no meio do projeto viram negociação enviesada.
- **3-5 critérios binários.** Cada um responde sim/não — sem zona cinza.
- Exemplos:
  - "Se CAC payback > 18 meses no Q+1, mata."
  - "Se TAM realocado < R$ 5M, mata."
  - "Se equity dilution > 25% para o round seguinte, repensa estrutura."
  - "Se NPS de beta < 30 após 60 dias, mata."
- **Revisão trimestral obrigatória contra kill criteria.** Sem revisão, projeto vira zumbi.

## Alocação de capital

Regra clássica **70 / 20 / 10** (Google):

- **70% core business** — o que sustenta a casa.
- **20% adjacências** — extensões naturais do core.
- **10% bets transformacionais** — apostas de fronteira.

**Adaptação Kolden por fase:**

- Em **fit-finding** (ainda buscando modelo dominante): inverter — `40% core / 40% testes / 20% nova fronteira`.
- Em **colheita** (modelo achado, escalando): manter o 70/20/10 clássico.
- Em **transição**: peso intermediário, recalibrado a cada quarter.

## Saída esperada

1. **Quadro de portfólio** (1 página): N projetos × 5 dimensões + score ponderado + decisão (ACELERAR / APOSTAR / MANTER / MATAR).
2. **Capital allocation trimestral** (% e R$ por bucket: core / adjacências / bets).
3. **Kill criteria por projeto**, gravados em `Olimpo/dados/portfolio.md` para auditoria futura.
4. **Próxima revisão** agendada (default trimestral).

## Anti-padrões

- **"Tudo é estratégico"** — perde poder de decisão. Se tudo é prioridade, nada é.
- **Score sem evidência** — chute disfarçado de rubrica. Cada nota precisa de 1 frase de justificativa.
- **Pesos iguais nas 5 dimensões** — nivela em ruído; o ranking vira aleatório.
- **Sem kill criteria** — projeto vira zumbi, consome recursos sem responsabilizar ninguém.
- **Score uma vez por ano** — vira artefato morto. Mínimo trimestral.
- **Confundir score com decisão** — o score **informa**; a decisão é do Zeus + Plutos. Nota alta não obriga acelerar; nota baixa não obriga matar — mas exige justificativa explícita.

## Cross-links

- **Plutos (CFO)** — co-dono pelo lado de ROI e capital allocation; assina junto com Zeus a decisão final.
- **Apolo (CMO)** — input em "posicionamento competitivo" (dimensão 5).
- **Atena (CAIO)** — input em alinhamento estratégico de IA (dimensão 1) quando o projeto envolve IA.
- **Themis (conselho)** — segunda opinião antes de decisão grande (ACELERAR > R$ 1M, MATAR projeto > 6 meses).
- **Olimpo `rubrica-dimensional-0-10`** — método de score multi-eixo (esta skill especializa a rubrica para portfólio).
- **Aletheia `priorizacao-rice`** — fronteira: priorização **dentro** de validação.
- **Prometeu `moscow-kano-mcda`** — fronteira: priorização **dentro** de release.
