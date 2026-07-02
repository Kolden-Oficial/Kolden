---
name: estrategia-de-supply-chain
description: Use quando o Poseidon precisar desenhar ou revisar a cadeia de suprimentos da Kolden — sourcing de fornecedor crítico (cloud, software, terceirizado, insumo físico se aplicável), avaliação de risco de single-vendor, política de estoque quando aplicável, controle de qualidade de entrega recebida, e integração ao ERP/sistema interno. Estratégia genérica e vendor-agnóstica — SEM lock-in geográfico (China, EUA ou qualquer polo). Cobre sourcing, negociação, QC e digitalização. NÃO use para escolha de LLM/modelo de IA (isso é Atena) nem para stack de código (isso é Hefesto). Aqui é a cadeia física/serviços/fornecedor que alimenta a operação da Kolden.
invocavel_por: poseidon
tags: [supply-chain, sourcing, fornecedor, qc, erp, olimpo]
---

# Estratégia de Supply Chain

Poseidon desenha a cadeia; Plutos cruza custo total; Egide avalia risco cibernético em fornecedor com acesso a dado. Existe porque **a Kolden depende cada vez mais de fornecedores críticos** (cloud, ferramentas, terceirizados de squad, serviços gerenciados) e cadeia sem estratégia = risco de continuidade escondido no orçamento.

## Herança histórica

- **W. Edwards Deming** ("Out of the Crisis", 1986) — ponto 4: acabar com prática de comprar apenas por preço; construir relacionamento de longo prazo com fornecedor único de confiança em vez de leilão. Insight: qualidade a montante define qualidade a jusante.
- **Toyota / Taiichi Ohno** — cadeia **just-in-time** com parceiros de longo prazo em vez de estoque como proteção. Insight: estoque é sintoma de problema em qualidade ou previsibilidade — não solução.
- **Michael Porter** ("Competitive Advantage", 1985) — cadeia de valor como framework analítico; poder de barganha do fornecedor como uma das cinco forças. Insight: fornecedor com poder alto extrai margem que deveria ser do operador.
- **Hau Lee** (Stanford) — codificou o conceito de **Triple-A Supply Chain** (Agile, Adaptable, Aligned) em HBR 2004. Insight: velocidade sozinha (só ágil) quebra em choque estrutural; precisa também adaptar e alinhar incentivos.
- **David Simchi-Levi** (MIT) — pesquisa moderna em **supply chain resilience** pós-COVID; introduziu métricas como Time-to-Recover (TTR) e Time-to-Survive (TTS) por nó. Insight: resiliência é medida, não vibe.

## Princípio-mestre para Kolden: neutralidade geográfica

**Nenhum lock-in por origem geográfica** — a cadeia não pode depender de um único polo (China, EUA, EU, Brasil isoladamente). Diversificar por continente quando o insumo permitir; ter alternativa auditada mesmo quando o primário é ótimo.

Aplicado a tech-services:
- Cloud: alternativa multi-cloud auditada (AWS + GCP + Azure homologados; nem que só um esteja em produção).
- LLM providers: multi-provider via camada abstração (Anthropic + OpenAI + Google + Mistral + local).
- Terceirizado humano: pool multi-região (Brasil + LatAm + EU + Ásia).
- Ferramenta crítica: substituto identificado e Time-to-Migrate estimado por ferramenta.

## Método em 4 fases

### Fase 1 — Mapa de fornecedores críticos

Liste todo fornecedor onde a queda causaria: (a) impacto em cliente-âncora, (b) parada de squad-chave, ou (c) vazamento de dado.

Para cada, registre:

| Fornecedor | Categoria | Criticidade (1-5) | Substituto identificado? | TTR (h) | TTS (dias sem ele) | Acesso a dado? |
|---|---|---|---|---|---|---|
| Cloud provedor primário | Infra | 5 | Sim (X, Y) | 8 | 2 | Sim |
| LLM provedor primário | IA | 4 | Sim (abstração) | 1 | 7 | Não (via API) |
| Ferramenta X SaaS | Ops | 3 | Sim (Z) | 24 | 30 | Sim |
| Terceirizado do squad Y | Talento | 4 | Não | — | 5 | Sim |

Regra: qualquer fornecedor Criticidade ≥ 4 SEM substituto identificado é risco reportável ao Zeus.

### Fase 2 — Sourcing e negociação

Para novo fornecedor (categoria ≥ 3):

- **RFI** (Request for Information) — 3-5 candidatos. Homologação de capacidade e ajuste.
- **RFP** (Request for Proposal) — 2-3 finalistas com proposta comercial estruturada.
- **Critérios ponderados** — não só preço. Peso típico: qualidade 30%, preço 25%, prazo 15%, risco/continuidade 15%, cultura/alinhamento 10%, ESG/compliance 5%.
- **Cascata de preço** — list price não conta; medir preço realizado após descontos, add-ons, tiers.
- **TCO** (Total Cost of Ownership) — não só fatura mensal: integração, treinamento, custo de saída (lock-in), custo de suporte.

Contrato mínimo:
- SLA claro com penalidade por descumprimento.
- Cláusula de saída sem multa quando SLA quebra.
- DPA (Data Processing Agreement) se toca dado — cross Themis/LGPD.
- Auditoria de segurança inicial e recorrente — cross Egide.
- Preço travado ou fórmula clara de reajuste.

### Fase 3 — Controle de Qualidade (QC) da entrega recebida

Fornecedor entregue não é fornecedor bom até a entrega ser validada. Ciclo:

1. **Recebimento** — critério aceite/rejeite documentado ANTES da compra.
2. **Amostragem** — se volume alto, plano de amostragem (não inspecionar 100% é OK; inspecionar 0% é erro).
3. **Log de não-conformidade** — cada rejeite documentado; padrão vira feedback ao fornecedor.
4. **Revisão trimestral** — vendor scorecard (qualidade, prazo, incidentes, resposta). Nota abaixo de piso dispara revisão.
5. **Substituição por nota persistente** — Deming: relacionamento longo com QUEM ENTREGA. Fornecedor abaixo do piso por 2 trimestres seguidos é substituído.

### Fase 4 — Digitalização (ERP e rastreabilidade)

Para Kolden 2026, cadeia digitalizada em nível compatível com o estágio:

- **Ferramenta única de registro** — planilha viva ou ERP leve (ClickUp, Notion + templates) registra fornecedor, contrato, SLA, próxima renovação, pessoa responsável.
- **Alertas de renovação** — 60/30/7 dias antes do vencimento do contrato.
- **Painel de vendor scorecard** trimestral.
- **Integração ao processo financeiro** — cross Pactolo (contas a pagar registra em cima do vendor master).
- **ERP maior só quando escala pedir** — não introduzir SAP/Oracle por vaidade; leve funciona até certa massa.

## Anti-padrões

- **Comprar só por preço** — ponto 4 de Deming; economia curta que vira retrabalho longo.
- **Single-vendor sem plano B** — risco de continuidade acumulado silenciosamente.
- **Contrato sem cláusula de saída** — Kolden fica refém do fornecedor.
- **QC 100% em item baixo risco** — overprocessing (muda); amostragem inteligente resolve.
- **ERP grande demais para o estágio** — custo de implementação supera benefício por 2-3 anos.
- **Lock-in geográfico** — cadeia toda dependente de um polo (China/EUA/EU sozinho).
- **Homologar por relacionamento pessoal** — fornecedor entra sem RFP porque "conheço o dono".
- **Ignorar TCO** — comparar preço mensal sem integração/saída/suporte.

## Cross-squads

- **Plutos** — TCO, cascata de preço, budget aprovado, contas a pagar (via Pactolo).
- **Egide** — auditoria de segurança do fornecedor com acesso a dado.
- **Themis/LGPD** — DPA em todo fornecedor que toca dado pessoal; jurisdição de processamento.
- **Hades** (CIO) — homologação de sistema/integração.
- **Zeus** — decisão de substituir vendor crítico com relacionamento longo é executiva.

## Entregável

```yaml
poseidon_supply_chain:
  neutralidade_geografica_verificada: <sim | não>
  mapa_fornecedores_criticos:
    - {nome, categoria, criticidade, substituto, ttr_horas, tts_dias, dpa}
  riscos_sem_substituto:
    - {fornecedor, criticidade, plano_mitigacao, prazo}
  sourcing_em_andamento:
    - {categoria, rfi_finalistas, rfp_shortlist, criterios_pesos, tco_projetado}
  contratos_ativos:
    - {fornecedor, valor_mensal, sla, renovacao, saida_multa, dpa, auditoria_egide}
  vendor_scorecard_trimestre:
    - {fornecedor, qualidade, prazo, incidentes, nota_geral}
  handoffs:
    plutos: [tco, contas_a_pagar]
    egide: [auditoria_seguranca]
    themis: [dpa_lgpd]
```

## Guardrails

- Nenhum fornecedor Criticidade ≥ 4 sem substituto identificado.
- Nenhum contrato sem SLA com penalidade e cláusula de saída.
- Fornecedor com acesso a dado passa por Egide (auditoria) + Themis (DPA) antes de assinar.
- Neutralidade geográfica verificada por categoria — nenhum lock-in de polo único.
- Vendor scorecard trimestral obrigatório para cada Criticidade ≥ 3.
- Substituição de fornecedor crítico com relacionamento longo escala ao Zeus.
- TCO obrigatório; comparação por preço mensal isolado é vetada.

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT) — ID G70 do bucket B15.*
