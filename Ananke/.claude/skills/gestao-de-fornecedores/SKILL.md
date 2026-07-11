---
name: gestao-de-fornecedores
description: >
  Use para AVALIAR, COMPARAR e GOVERNAR fornecedores/vendors por critério e dado — escolher uma
  ferramenta/serviço, decidir make-or-buy, fazer due diligence operacional, otimizar procurement ou
  revisar um contrato vivo (SLA prometido vs realizado). Cobre a matriz de decisão por critério ponderado
  (capacidade, SLA, custo total de propriedade, risco, lock-in, suporte, soberania de dados), a due
  diligence com bandeiras verde/amarelo/vermelho e o ciclo de revisão. Habilidade-âncora do squad Ananke,
  dona: gestor-de-fornecedores. Gatilhos: "qual fornecedor contratar", "avaliar este vendor", "comparar
  opções", "vale renovar?", "make or buy", "o fornecedor está cumprindo o SLA?". REGRA DURA: decisão por
  evidência, nunca por preferência. Custo financeiro → Pluto; risco de segurança → Egide.
tipo: skill
area: Ananke
up: "[[Ananke/_MOC-ananke]]"
---

# Gestão de Fornecedores e Procurement

Cada fornecedor é uma **decisão a ser justificada por critério**, não uma preferência. Esta habilidade
estrutura a escolha, a verificação e a governança do contrato vivo — com o olhar Kolden de **soberania de
dados** sempre entre os critérios.

## 1. Avaliação por critério (definir os critérios ANTES das opções)

A ordem importa: definir critérios primeiro evita racionalizar a preferência depois.

1. **Requisitos:** essenciais (sem isso, está fora) vs desejáveis (desempata).
2. **Critérios e pesos** (ajustar ao caso):
   - Capacidade de entrega / integrações
   - SLA (disponibilidade, suporte, tempo de resposta)
   - **Custo total de propriedade (TCO)** — não o preço de etiqueta (implementação, migração, suporte, saída)
   - **Risco / lock-in** — dependência e caminho de saída
   - **Soberania de dados** — onde roda, quem acessa (filosofia Kolden; peso alto por padrão)
   - Suporte e continuidade do fornecedor
3. **Pontuar** cada candidato (0-5) por critério, **com a fonte do dado** (doc, SLA publicado, caso, teste).
4. **Matriz ponderada** → recomendação justificada + **riscos residuais**.

```
                  soberania  capacidade  TCO   lock-in  suporte | ponderado
Candidato A          5          4         4      5         2     |   4.25
Candidato B          2          5         3      2         5     |   3.30
```

## 2. Due diligence operacional (antes de fechar)

Verifique o fornecedor por dimensão e marque a bandeira:

| Dimensão | Verde / Amarelo / Vermelho |
|---|---|
| Capacidade real (referências, casos) | |
| SLA contratual e histórico | |
| Suporte (canal, tempo de resposta) | |
| Lock-in e plano de saída | |
| Soberania de dados (local, acesso) | |
| Continuidade (saúde do fornecedor) | |

Sinalize o que exige **handoff**: financeiro/contrato → **Pluto**; segurança/compliance técnica → **Egide**.

## 3. Custo total de propriedade e lock-in

- **TCO** = aquisição + implementação + operação + suporte + **custo de saída** (migração de volta).
- **Lock-in:** toda escolha precisa de um **caminho de saída conhecido**. Sem saída clara, a dependência é
  um risco que entra na matriz — não um detalhe.

## 4. Ciclo de revisão (contrato vivo)

Fornecedor não se renova no automático. Para cada contrato ativo:

- **SLA prometido vs realizado** (com dado de desempenho).
- **Custo vs valor entregue.**
- **Incidentes** no período.
- **Gatilho de revisão** (data, uso, queda de desempenho).
- Recomendação: **manter / renegociar / trocar** — com dado.

## Limites e handoffs

- **Não** faz a análise financeira profunda do contrato → **Pluto** (CFO).
- **Não** dá veredito de segurança técnica → **Egide**.
- A decisão estratégica **make/buy** maior é alinhada com **Poseidon** (COO) via `ananke-chief`.
- Custo de implementação que vire processo → `arquiteto-de-processos`.

---
*Procedência (squad-semente, lote 2026-06-26): princípio adaptado de `alirezarezvani/claude-skills@4a3c05b`
(MIT — cluster G20: vendor-management, procurement-optimizer) e `anthropics/knowledge-work-plugins@78d74d5`
(Apache-2.0 — operations: vendor-review). Soberania de dados é critério Kolden. Sem cópia literal — reescrito
para o padrão Kolden.*
