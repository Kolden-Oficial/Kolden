---
name: planejamento-de-headcount
description: |
  Use quando precisar planejar contratações por trimestre/ano, calcular custo total carregado
  (salário + encargos BR + benefícios + ramp-up), construir timeline de contratação alinhada
  com forecast de revenue e capacidade. NÃO substitui Hestia (RH) — esta skill é planejamento
  financeiro; recrutamento/cultura/onboarding é Hestia. Outputs alimentam AOP.
domain: finance
subdomain: headcount-planning
agente_dono: [analista-fpa]
tags: [headcount, fte, custo-total-carregado, ramp-up, aop, planejamento]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G16)
status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)
---

> _Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (G16, MIT)._

## Conceitos base

### FTE (Full-Time Equivalent)

Unidade de medida de capacidade humana:

- Full-time CLT 44h/sem = 1.0 FTE
- Part-time 22h/sem = 0.5 FTE
- PJ dedicado 40h/sem = ~0.9 FTE (sem férias garantidas, mas com gap potencial)
- Estagiário 30h/sem = 0.68 FTE (com produtividade ajustada — ver ramp-up)

Sempre planejar em FTE, não em "cabeças", porque o output é função de horas dedicadas, não de CPFs.

## Custo total carregado (fully-loaded) — Brasil CLT

Salário-base **não é o custo real**. O custo total carregado é o que vai para o orçamento.

### Composição

**1. Salário-bruto base** — base de cálculo de tudo.

**2. Encargos sobre folha:**
- INSS patronal: 20% (alíquota cheia; setores específicos têm desoneração)
- FGTS: 8%
- Sistema S (SESI/SESC/SENAI/SENAC/etc): ~5.8% para serviços
- RAT (risco acidentes de trabalho): 1-3% conforme CNAE
- Salário-educação: 2.5%
- DSR (descanso semanal remunerado) já está embutido na maioria das folhas mensalistas

Total típico de encargos sobre folha: **~35-40%** do salário-bruto.

**3. Provisões obrigatórias:**
- 13º salário: 8.33% (1/12) + encargos sobre 13º
- Férias + 1/3 constitucional: 11.11% + encargos
- Rescisão (provisão): 4-12% conforme tempo médio de casa e taxa de turnover

**4. Benefícios:**
- VR/VA: R$ 30-50/dia × dias úteis
- Plano de saúde: R$ 300-1500/mês conforme nível e dependentes
- Plano odontológico: R$ 30-80/mês
- Vale-transporte: custo real − desconto 6% do salário
- Seguro de vida em grupo: R$ 20-50/mês
- GymPass / Wellhub: R$ 80-150/mês quando aplicável

**5. Custo indireto:**
- Estação de trabalho (notebook + monitor + cadeira): amortizar em 36 meses
- Software (licenças): R$ 100-500/mês conforme stack
- Treinamento: R$ 2-5k/ano por colaborador
- Infra de escritório (quando aplicável): rateio por FTE

### Fator de carga

```
Custo total carregado ≈ 1.7 a 2.2 × salário-bruto base
```

- 1.7× — nível operacional, benefícios enxutos
- 1.9× — nível mid, pacote padrão
- 2.2× — nível sênior, benefícios completos + bônus + equity

### PJ (Pessoa Jurídica)

Para PJ Simples Nacional Anexo III/V:

```
Custo PJ ≈ 1.15 a 1.30 × valor equivalente ao salário-bruto CLT
```

Componentes:
- Honorário mensal
- Sem encargos CLT, mas com Simples Nacional (6-15.5% sobre faturamento)
- ISS (2-5% conforme município)
- Sem benefícios (alguns contratos preveem reembolso)

Vantagem: ~30-40% mais barato que CLT mesmo. Risco: contingência trabalhista (vínculo disfarçado). Decisão é jurídica + tributária, não só financeira.

## Timeline de contratação

| Nível    | Sourcing | Entrevistas | Offer | Notice  | Total       |
|----------|----------|-------------|-------|---------|-------------|
| Sênior   | 4-8 sem  | 2-4 sem     | 1 sem | 2-4 sem | 12-16 sem   |
| Mid      | 3-5 sem  | 2-3 sem     | 1 sem | 2 sem   | 8-12 sem    |
| Júnior   | 2-3 sem  | 1-2 sem     | 1 sem | 2 sem   | 4-8 sem     |

Planejamento de caixa: data de start = data de open + lead time acima. Erro comum é planejar "contrata em janeiro" sem voltar o ciclo: para começar 1/jan, abrir vaga em out/nov do ano anterior (sênior).

## Ramp-up

Produtividade não é binária no D+1.

| Nível        | M1-M3      | M4-M6      | M7-M12     |
|--------------|------------|------------|------------|
| Operacional  | 30-50%     | 70-90%     | 100%       |
| Mid          | 20-40%     | 60-80%     | 90-100%    |
| Sênior/Estratégico | 10-30% | 40-70%   | 70-100%    |

Implicações:
- Custo durante ramp = salário cheio × tempo, mas output reduzido
- Hire estratégico contratado em jul só entrega valor pleno em jan do ano seguinte
- Plan precisa refletir output ajustado, não FTE × 1.0 desde D+1

## Sensibilidade

Cada hire atrasado em X meses tem impacto composto:
- Atraso no output do hire (Y% × X meses)
- Atraso em handoffs dependentes
- Sobrecarga em equipe atual (risco de burnout/churn)

Plan precisa de sensibilidade: cenário base / atraso 1 mês em N hires / atraso 2 meses em N hires.

## Tabela mestre

Estrutura recomendada de planilha:

| Position | Quarter | FTE | Salário-base | Loaded factor | Custo Q | Cumulativo anual |
|----------|---------|-----|--------------|---------------|---------|------------------|
| ... | ... | ... | ... | ... | ... | ... |

Aba separada por cenário (base / agressivo / conservador). Total cumulativo anual integra com forecast P&L e cash plan.

## Anti-padrões

- **Planejar headcount sem ramp-up** — super-otimismo de output; metas batem na realidade no Q2
- **Ignorar encargos** — custo subestimado em 50-70%; plan perde aderência no primeiro close
- **Contratação síncrona** — todos os hires no Q1 = stress de caixa + sobrecarga de onboarding
- **Confundir FTE com cabeça** — 2 part-times ≠ 1 full-time em entrega real (overhead de coordenação)
- **Não revisar mensalmente** — vaga aberta há 3 meses sem progresso = repensar nível, salário, ou se é hire interno

## Cross-links

- **Hestia (RH)** — execução do recrutamento, política salarial, onboarding
- **Pactolo/.claude/skills/valuation-por-dcf** — premissas de hiring entram no DCF via opex
- **Olimpo** — alinhamento de hiring com tese estratégica
- **Plutos** — aprovação executiva do hiring plan
