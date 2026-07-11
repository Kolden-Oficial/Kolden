---
name: programa-esg-corporativo
description: Use quando o Zeus (com Plutos) precisar desenhar, revisar ou reportar o programa ESG (Environmental/Social/Governance) da Kolden — política corporativa, matriz de materialidade, escolha do stack de frameworks (GRI/SASB/TCFD/ISSB), estruturação de KPIs por pilar, resposta a questionário de investidor/cliente enterprise, ou defesa contra acusação de greenwashing. Cobre tanto materialidade financeira (impacto no negócio — cross com Plutos) quanto materialidade de impacto (efeito da Kolden no mundo). NÃO use para relatório de sustentabilidade DE PRODUTO específico (isso é Poseidon+Prometeu) nem para due-diligence ESG DE ALVO M&A (isso é `integracao-pos-fusao-pmi`). Aqui é o programa corporativo da Kolden como emissora.
invocavel_por: [zeus, plutos]
tags: [esg, sustentabilidade, gri, sasb, tcfd, issb, governance, olimpo]
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Programa ESG Corporativo

Zeus arquiteta a postura ESG da Kolden como empresa; Plutos garante que a materialidade financeira está mapeada e que o custo dos compromissos cabe no orçamento. Skill cross-funcional obrigatória.

Existe porque:
1. Investidores e clientes enterprise cada vez mais exigem posicionamento formal (ISSB desde 2024 é linha de água em bolsas grandes).
2. Greenwashing tem custo reputacional e regulatório (SEC, EU CSRD, CVM BR) — tese vaga vira passivo.
3. ESG bem feito diferencia empresa em RFP, aumenta valuation em rodada e reduz custo de capital.

## Herança histórica

- **Global Reporting Initiative (GRI)** — fundado 1997 (Ceres+PNUMA), padrão global mais adotado para relato de sustentabilidade; introduziu o princípio de **dupla materialidade** (impacto no negócio + impacto no mundo). GRI Standards Universal Series (GRI 1/2/3) publicados em 2021.
- **Sustainability Accounting Standards Board (SASB)** — fundado 2011 por Jean Rogers, focado em materialidade FINANCEIRA por setor (77 setores). Consolidado no ISSB em 2022. Insight: métrica ESG só interessa ao investidor se afeta caixa.
- **Task Force on Climate-related Financial Disclosures (TCFD)** — criado 2015 pelo Financial Stability Board (Mark Carney). Framework de 4 pilares (Governance/Strategy/Risk Management/Metrics) que virou base do ISSB S2. Insight: clima é risco financeiro, não filantropia.
- **International Sustainability Standards Board (ISSB)** — criado 2021 pela IFRS Foundation; publicou IFRS S1 (geral) e IFRS S2 (clima) em 2023. Linha de água atual de disclosure. Substitui em nível global o vácuo pós-SASB/TCFD.
- **Milton Friedman ("The Social Responsibility of Business Is to Increase Its Profits", 1970)** e **Freeman ("Strategic Management: A Stakeholder Approach", 1984)** — polos históricos do debate; ESG moderno é síntese: stakeholder capitalism + disciplina financeira.

## Método em 4 fases

### Fase 1 — Matriz de Materialidade Dupla

Antes de qualquer relatório ou compromisso público, monte a matriz:

- Eixo Y: **materialidade de impacto** — quão significativo é o efeito da Kolden nesse tópico (para pessoas, planeta, sociedade)?
- Eixo X: **materialidade financeira** — quão significativo é esse tópico para o resultado financeiro/estratégico da Kolden (curto e médio prazo)?

Pontue 1-5 cada tópico ESG relevante. Tópicos no quadrante superior-direito são MATERIAIS e viram compromisso reportável. Tópicos nos outros quadrantes ficam monitorados mas não são estratégia.

Fontes obrigatórias na pontuação:
- Entrevistas com 3-5 stakeholders internos (fundador, RH, Ronan, clientes-âncora).
- Pesquisa desk de standards setoriais (SASB Materiality Map do setor tech/services).
- Regulação vigente (LGPD, EU CSRD se cliente EU, CVM Res. 59 se pré-IPO Brasil).

### Fase 2 — Escolha do stack de frameworks

Não escolha um — escolha um empilhamento coerente:

| Camada | Framework padrão | Quando adotar |
|---|---|---|
| **Baseline global** | ISSB S1+S2 | Sempre que houver investidor internacional ou cliente EU/US |
| **Detalhe setorial** | SASB (tech-services subsetor) | Sempre para foco em materialidade financeira |
| **Relato ampliado stakeholder** | GRI Universal Standards | Se público-alvo inclui sociedade civil, ONG, edital |
| **Clima aprofundado** | TCFD (embutido em ISSB S2) | Sempre; obrigatório para investidor grande |
| **Metas de longo prazo** | SBTi (Science Based Targets) | Se emissões diretas materiais e queremos net-zero real |

Kolden hoje (2026): stack recomendado = **ISSB (S1+S2) + SASB tech-services**. GRI opcional; SBTi só se assumirmos compromisso de neutralidade explícita.

### Fase 3 — KPIs por pilar (Environmental / Social / Governance)

Cada pilar tem 3-5 métricas materiais medidas trimestralmente. Regra: métrica sem baseline + sem meta + sem dono = teatro.

**Environmental** (tech services é low-emission mas não zero):
- Emissões escopo 1 (combustão direta) — normalmente ~0 para SaaS/serviços.
- Emissões escopo 2 (energia comprada) — kg CO2e por FTE. Compensação via fornecedor renovável.
- Emissões escopo 3 (cadeia + cloud + viagens) — MATERIAL para tech; use Cloud Carbon Footprint (Google/AWS calculators) + benchmark viagens.
- Consumo de água/papel (baixa relevância; monitor apenas).

**Social**:
- Diversidade em headcount e liderança (baseline + meta por corte).
- eNPS / clima interno (>50 alvo).
- Horas de formação por FTE ao ano.
- Salário mediano por gênero (equidade).
- Reclamações trabalhistas / incidentes de segurança.

**Governance**:
- Independência do conselho (% de membros independentes).
- Cadência de reunião do conselho e comitês (auditoria, compliance, ESG).
- Incidentes de segurança/privacidade reportáveis (cross Egide + Themis).
- Política anti-corrupção e canal de denúncia auditável.
- Conflito de interesse declarado (registro anual dos executivos).

### Fase 4 — Guardas anti-greenwashing

Toda declaração pública passa por 4 testes:

1. **Prova documental** — cada afirmação numérica remete a fonte auditável (relatório interno, calculadora, terceira parte).
2. **Materialidade verificada** — compromisso é sobre tópico realmente material na matriz da Fase 1.
3. **Baseline honesto** — data de baseline, metodologia e escopo declarados; sem cherry-picking de ano bom.
4. **Meta específica e datada** — SMART. "Reduzir emissões" é greenwash; "reduzir escopo 2 em 40% até 2028 vs baseline 2025 (metodologia GHG Protocol)" é declaração.

Rejeitar automaticamente:
- "Carbono neutro" sem compensação certificada e escopo declarado.
- "Sustentável" sem framework de referência.
- "Diverso" sem dado numérico.
- Selo/imagem visual sem lastro auditável.

## Aplicação Kolden

- **Público-alvo hoje**: cliente enterprise pt-BR/EN, investidor early-stage. Foco: matriz de materialidade + KPIs base (E/S/G) + política pública de 1-página.
- **Baseline 2026**: escopo 2 (cloud AWS/GCP) + escopo 3 (viagens, fornecedores), headcount por gênero/etnia, cadência conselho, incidentes segurança.
- **Cross com Plutos**: cada meta ESG tem custo modelado no orçamento; se compromisso público excede teto de capex, escala para decisão executiva.
- **Cross com Egide**: incidentes de privacidade e cibersegurança viram KPI de Governance.
- **Cross com Hestia**: KPIs sociais (diversidade, eNPS, treinamento) vivem lá; skill puxa dado, não coleta.

## Entregável

```yaml
zeus_plutos_esg:
  materialidade:
    matriz: "<caminho ou tabela top-10 tópicos>"
    quadrante_material: [tópico_1, tópico_2, ...]
  stack_frameworks: [ISSB-S1, ISSB-S2, SASB-tech-services]
  kpis_baseline:
    ambiental: [{métrica, baseline, meta, prazo, dono}]
    social: [{...}]
    governance: [{...}]
  compromissos_publicos:
    - {texto, prova, meta_smart, revisao}
  handoffs:
    hestia: [KPIs sociais operacionais]
    egide: [KPIs de segurança para relato]
    themis: [conformidade regulatória por jurisdição]
```

## Guardrails

- Nenhuma declaração pública sem passar pelos 4 testes anti-greenwashing.
- Meta sem dono e sem prazo não é meta — é aspiração; não vai para relatório.
- Materialidade dupla obrigatória; unidimensional é erro histórico do ESG 1.0.
- Cross com Plutos em toda meta com custo estimado; sem isso, o compromisso é irreal.
- Custo por FTE do programa ESG registrado no orçamento; se exceder teto, escala.

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT) — IDs G22+G23 do bucket B15.*
