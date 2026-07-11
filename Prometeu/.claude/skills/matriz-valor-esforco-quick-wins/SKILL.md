---
name: matriz-valor-esforco-quick-wins
description: |
  Use quando MoSCoW empata Should/Could ou quando precisar mostrar roadmap em 4 quadrantes
  (Quick Wins, Major Projects, Fill-ins, Time Wasters) para stakeholders. Valor (1-10) + Esforço (1-10).
  Max 30% do sprint em Quick Wins (evitar distração de Major Projects). Use junto com moscow-kano-mcda.
domain: aiox-development
subdomain: priorizacao-de-release
agente_dono: [po-pax]
aiox_layer: L3 (.claude project config — mutable)
heranca_historica: [stephen-covey-urgente-importante, lean-six-sigma-pick]
tags: [matriz-valor-esforco, quick-wins, 2x2, priorizacao]
cross_links:
  - prometeu/moscow-kano-mcda
  - aletheia/priorizacao-rice
  - prometeu/micro-sprints-e-decomposicao-de-task
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G16)
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Matriz Valor × Esforço — Quick Wins

Ferramenta 2x2 para priorização visual de release scope. Complementa MoSCoW quando há empate em Should/Could e ajuda a comunicar roadmap com stakeholders.

## Os 4 quadrantes

Eixos: **Valor** (eixo Y, baixo → alto) × **Esforço** (eixo X, baixo → alto).

```
        Alto Valor
            ^
            |
  Major     |   Quick
  Projects  |   Wins
            |
  ----------+----------> Esforço
            |
  Time      |   Fill-ins
  Wasters   |
            |
        Baixo Valor
   (alto esforço)  (baixo esforço)
```

| Quadrante | Posição | Definição | Ação |
|---|---|---|---|
| **Quick Wins** | Alto Valor / Baixo Esforço | Maior ROI, fazer JÁ | Top prioridade |
| **Major Projects** | Alto Valor / Alto Esforço | Estratégico, exige planejamento | Sequenciar com cuidado |
| **Fill-ins** | Baixo Valor / Baixo Esforço | Encaixe em janelas livres | Backlog "se sobrar" |
| **Time Wasters** | Baixo Valor / Alto Esforço | Cortar do roadmap | **NÃO fazer** |

## Como calibrar Valor e Esforço

### Valor (1-10)

- **Impacto no cliente** — validação Aletheia (entrevistas, evidência de dor)
- **Alinhamento estratégico** — está no rumo do produto/empresa?
- **Receita projetada** — quanto MRR/ARR este item destrava?
- **Redução de risco** — operacional, regulatório, segurança, churn

Sem evidência Aletheia, valor é **chute**. Marque com `[?]` e force validação antes do release.

### Esforço (1-10)

- **Pessoa-meses de desenvolvimento** — não calendário, esforço real
- **Dependências de outros squads** — handoffs custam
- **Risco técnico** — 1 = trivial / CRUD / 10 = R&D / pesquisa
- **Custo de operação contínua** — manutenção, infra, suporte

`sm River` (scrum master, Prometeu) valida estimativas para evitar subestimação sistemática.

## Quando usar

1. **Pós-MoSCoW** — quando vários itens caem em Should ou Could e precisa desempatar.
2. **Roadmap trimestral inicial** — quadrants ajudam a se comunicar com stakeholders não-técnicos.
3. **Backlog grooming periódico** — reavaliar trimestralmente; o que era Quick Win pode ter virado Major Project (escopo cresceu).
4. **Decisão de cortar items** — Time Wasters precisam ser **explicitamente removidos**, não acumulados "por garantia".

## Quick Wins — atenção especial

Quick Win é sedutor (alto valor + baixo esforço). Fazer demais distrai do Major Project que move o produto.

**Regras práticas:**

- **Max 30% do effort em Quick Wins por sprint** — o resto é Major Projects + dívida técnica
- **Quick Win > 3 sprints não é quick** — reclassifique como Major Project
- **Quick Wins acumulados sem Major Projects = produto sem evolução estratégica** — vira "fábrica de pequenas melhorias"

## Anti-padrões

- **Tudo em "Major Projects"** — escopo inflado, time over-promisses. Force a curva: se mais de 40% é Major Project, recalibre o eixo Esforço.
- **Quick Win > 3 sprints** — não é quick, é Major Project mal-estimado.
- **Time Wasters mantidos no backlog "por garantia"** — corte explicitamente, documente o "porquê não" para evitar reabertura.
- **Valor estimado sem evidência Aletheia** — chute. Marque `[?]` e force validação.
- **Esforço subestimado** — viés sistemático. `sm River` valida com histórico de velocity real.

## Cross-links

- **`moscow-kano-mcda`** (Prometeu / `po Pax`): complementa MCDA quando MoSCoW empata Should/Could
- **`priorizacao-rice`** (Aletheia): use RICE para validação de feature individual; esta matriz para escopo de release
- **`micro-sprints-e-decomposicao-de-task`** (Prometeu): Quick Wins viram micro-sprints; Major Projects exigem decomposição em épicos

## Herança histórica

- **Stephen R. Covey** (*The 7 Habits of Highly Effective People*, 1989) — matriz Urgente × Importante (precursor conceitual do 2x2 de priorização)
- **Effort × Impact matrix** — consultoria clássica (McKinsey/BCG roots), formalizada nos anos 1990
- **Lean Six Sigma** — variante **PICK** (Possible / Implement / Challenge / Kill), mesma estrutura 2x2 aplicada a melhoria de processo

---

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G16, MIT)._
