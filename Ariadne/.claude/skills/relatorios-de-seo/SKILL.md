---
name: relatorios-de-seo
description: >
  Use quando a entrega for um RELATÓRIO de SEO consolidado e apresentável (PDF/
  HTML profissional) a partir dos dados de auditoria/CWV/GSC, OU quando precisar
  PRIORIZAR e organizar um conjunto de issues num plano de ação. Gatilhos: "gera
  um relatório", "relatório de SEO", "PDF da auditoria", "dashboard", "apresentar
  pro cliente", "plano de ação", "prioriza as issues", "roadmap de SEO", "exportar
  resultado". É a camada de SAÍDA padrão da Ariadne — vem depois da análise.
---

# Relatórios de SEO (entrega + priorização)

Camada de **saída** do squad: transforma os achados crus das outras skills num **relatório
apresentável** e num **plano de ação priorizado**. É o que vira entregável para o cliente/decisor.

## Envelope de dados (fonte única do relatório)
Toda análise grava um JSON estruturado (`{dominio}-audit/audit-data.json`) com:
- `summary` — health_score (0-100), tipo de negócio, top achados, quick wins.
- `categories[]` — nome, score, o que funciona, e `findings[]` (title, **severity**
  Crítico/Alto/Médio/Baixo/Info, description com evidência, recommendation acionável).
- `action_plan.phases[]` — fases com timeframe e itens.
- `artifacts` — caminhos de findings/ e screenshots/.

Esse envelope é o que permite gerar o relatório **mesmo quando dados do Google não estão disponíveis**
(o relatório degrada de forma graciosa).

## Tipos de relatório
- **full** — relatório completo (todas as seções, todas as categorias).
- **cwv-audit** — Core Web Vitals (gauges, timeline de 25 semanas, distribuições).
- **gsc-performance** — Search Console (tabelas de query, quick wins posição 4-10).
- **indexation** — status de indexação (donut de coverage a partir do batch de inspeção).

## Estrutura do documento
Capa branca → sumário com scores → **resumo executivo** (health score, tipo de negócio, top 5
críticos, top 5 quick wins) → seções por categoria → recomendações priorizadas com **estimativa de
esforço** → metodologia. Gráficos com legenda em cada figura. Sempre com **nota de frescor** do dado.

## Priorização de issues (o coração do plano de ação)
Ordene por severidade e organize em fases temporais:

| Severidade | Definição | Prazo |
|---|---|---|
| **Crítico** | bloqueia indexação ou causa penalidade | corrigir já |
| **Alto** | impacta ranqueamento de forma relevante | 1 semana |
| **Médio** | oportunidade de otimização | 1 mês |
| **Baixo** | nice-to-have | backlog |

Fases sugeridas: **Fase 1** correções críticas (semana 1) → **Fase 2** alto impacto (semanas 2-3) →
**Fase 3** conteúdo & autoridade (mês 2) → **Fase 4** monitoramento & iteração (contínuo). Quando der,
cruze severidade × **esforço** para destacar os **quick wins** (alto impacto, baixo esforço) no topo.

## Auto-revisão antes de entregar (gate)
Antes de apresentar qualquer relatório, rode a revisão automática: cheque imagens vazias, seções
finas, gráficos duplicados, e gaps de paginação. **Só apresente se a revisão passar.** Esse é o
guard-rail que evita entregar um PDF quebrado ao cliente.

## Regras Kolden
- **Marca Kolden:** o relatório sai com a identidade visual da Kolden (não a paleta do repo-fonte) —
  aplique o design system da empresa quando for material de cliente.
- **Hipótese vs fato (veto da Ariadne):** todo achado no relatório carrega a evidência/fonte; o que é
  hipótese é rotulado como hipótese, nunca apresentado como fato medido.
- **Infisical / Égide:** se o gerador puxar dado ao vivo (GSC/CrUX), credenciais via `infisical-padrao`
  e URLs validadas (SSRF) pelo padrão do Égide.
- **Handoff de copy:** o texto final de comunicação ao cliente, se for peça de marketing, é do
  **Caliope** — a Ariadne entrega o relatório técnico estruturado.

---
## Atribuição
Princípio extraído de `AgriciDaniel/claude-seo@d830cdb` (script `google_report.py` — gerador PDF/HTML
com auto-revisão `_review_pdf`, envelope `audit-data.json` da skill `seo-audit`, definições de
prioridade; licença MIT). Reescrito em PT-BR para a Kolden, sem cópia literal e com a marca da Kolden
substituindo o estilo visual original. O gerador executável (WeasyPrint + matplotlib) fica como
tooling a provisionar.
