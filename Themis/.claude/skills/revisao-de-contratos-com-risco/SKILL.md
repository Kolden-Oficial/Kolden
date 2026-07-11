---
name: revisao-de-contratos-com-risco
description: Use quando o pedido for revisar um contrato (com cliente, fornecedor, parceiro, operador de dado, NDA) buscando risco jurídico/financeiro/regulatório antes de assinar. Cobre liability analysis, risk-keyword-scoring por cláusula-alvo (limitação de responsabilidade, indenização, foro, força maior, dado pessoal, propriedade intelectual, rescisão), approval routing (Themis → board-chair → Ronan em casos acima de gatilho financeiro) e sub-bloco de comparação versão a versão com risk-flag. Gatilhos "revisar contrato", "risk analysis", "contract review", "SLA", "MSA", "NDA", "DPA", "limitação de responsabilidade", "foro", "cláusula abusiva", "comparar versões do contrato". NÃO substitui parecer de advogado — é ferramenta de triagem. Dono operacional exclusivo desta habilidade — `analista-de-compliance-regulatorio` (Themis).
tipo: skill
area: Themis
up: "[[Themis/_MOC-themis]]"
---

# Revisão de Contratos com Risco

> **Nota de sintonia com Themis:** habilidade operacional transversal SOB a chancela do board consultivo. Não cria persona conselheira nova — é o filtro operacional antes do parecer jurídico.

## Escopo e não-escopo

**Faz:**
- Triagem de contrato buscando cláusulas com risco elevado (10 cláusulas-alvo).
- Score de risco por cláusula (baixo/médio/alto/crítico).
- Risk-keyword-scoring (palavras/termos que disparam alerta).
- Recomendação de aceite / negociação / recusa.
- Comparação versão a versão com risk-flag por alteração.
- Rota de escalação (advogado, board-chair, Ronan).

**Não faz:**
- Parecer jurídico vinculante (advogado habilitado).
- Redação de novo contrato do zero.
- Negociação direta com a outra parte.

## 10 cláusulas-alvo (checklist obrigatório)

Toda revisão passa por estas 10 cláusulas. Ausência de cláusula alto-risco no contrato = alerta próprio (silêncio pode ser ruim).

### 1. Limitação de responsabilidade (Liability Cap)

**Buscar:** valor do cap absoluto, cap indexado a fee pago, exclusões (dolo, culpa grave, obrigações de indenização), tipos de dano excluídos (indireto, lucros cessantes, consequencial).

**Risk-keywords:** "in no event shall X be liable", "aggregate liability shall not exceed", "excluding indirect, consequential", "sole and exclusive remedy", "responsabilidade limitada ao valor efetivamente pago".

**Sinais críticos:**
- Cap ≤ 3 meses de fee → RISCO ALTO (fornecedor tem quase zero skin-in-the-game).
- Cap = R$0 ou "sob nenhuma circunstância" → RISCO CRÍTICO.
- Cap não recíproco (uma parte tem cap, outra não) → RISCO ALTO.

### 2. Indenização (Indemnification)

**Buscar:** quem indeniza quem, matérias cobertas (PI, dado pessoal, violação de lei, terceiros), gatilhos de acionamento, cap sobre indenização.

**Risk-keywords:** "indemnify, defend and hold harmless", "each party agrees to indemnify", "unlimited indemnification".

**Sinais críticos:**
- Indenização unilateral e ampla contra a Kolden → RISCO CRÍTICO.
- Sem obrigação de defesa (só reembolso) → RISCO MÉDIO.
- Sem cap sobre indenização quando o resto tem cap → inconsistente, RISCO ALTO.

### 3. Foro e lei aplicável

**Buscar:** foro (comarca/tribunal), lei aplicável, arbitragem obrigatória, jurisdição exclusiva.

**Risk-keywords:** "exclusive jurisdiction of the courts of", "governed by the laws of", "binding arbitration", "waiver of jury trial", "foro da comarca de".

**Sinais críticos:**
- Foro em jurisdição inconveniente sem base comercial → RISCO ALTO (contencioso caro).
- Arbitragem obrigatória com árbitro/câmara enviesado → RISCO ALTO.
- Lei estrangeira sem tradução de conceitos-chave → RISCO MÉDIO.

### 4. Força maior

**Buscar:** definição, eventos cobertos, obrigação de mitigação, prazo de suspensão × rescisão.

**Risk-keywords:** "force majeure", "acts of God", "pandemic", "government action", "caso fortuito e força maior".

**Sinais críticos:**
- Definição excessivamente ampla favorecendo uma parte → RISCO MÉDIO.
- Sem prazo de suspensão máximo (força maior indefinida) → RISCO ALTO.
- Cláusula sem obrigação de mitigar → RISCO MÉDIO.

### 5. Tratamento de dado pessoal (DPA)

**Buscar:** anexo DPA (Data Processing Agreement), Art. 39 LGPD / Art. 28 GDPR.

**Risk-keywords:** "data controller", "data processor", "subprocessor", "cross-border transfer", "encarregado", "operador de dados", "compartilhamento".

**Sinais críticos:**
- Ausência de DPA em contrato que envolve tratamento de dado → RISCO CRÍTICO (violação Art. 39 LGPD).
- Direito unilateral de mudar subprocessadores sem aviso → RISCO ALTO.
- Sem cláusula de auditoria pelo controlador → RISCO ALTO.
- Transferência internacional sem base legal declarada → RISCO CRÍTICO.

### 6. Propriedade intelectual

**Buscar:** titularidade do desenvolvido, licença para uso, work-for-hire, uso de terceiro (open source).

**Risk-keywords:** "work made for hire", "assignment of intellectual property", "license to use", "background IP", "foreground IP".

**Sinais críticos:**
- Cessão total de IP da Kolden ao cliente por default → RISCO CRÍTICO (a menos que precificado).
- Ausência de garantia de titularidade do outro lado → RISCO ALTO.
- Sem cláusula sobre uso de open source (compliance de licença) → RISCO MÉDIO.

### 7. Rescisão

**Buscar:** hipóteses de rescisão (justa causa, conveniência), prazo de aviso, efeitos, taxa de rescisão antecipada.

**Risk-keywords:** "termination for convenience", "termination for cause", "cure period", "early termination fee", "rescisão imotivada".

**Sinais críticos:**
- Rescisão unilateral por conveniência sem aviso ou taxa → RISCO ALTO.
- Cure period ausente ou < 30 dias → RISCO MÉDIO.
- Efeitos pós-rescisão obrigando data return, mas sem prazo objetivo → RISCO MÉDIO.

### 8. Confidencialidade / NDA

**Buscar:** definição, prazo, exceções (informação pública, exigida por lei), consequências de violação.

**Risk-keywords:** "confidential information", "trade secret", "non-disclosure", "residual knowledge", "informação confidencial".

**Sinais críticos:**
- Prazo indefinido (perpétuo) → RISCO MÉDIO (a menos que trade secret).
- Sem exceção para informação exigida por autoridade → RISCO ALTO.
- Cláusula "residual knowledge" permitindo à outra parte "lembrar" e usar → RISCO ALTO.

### 9. Não-concorrência / Não-solicitação

**Buscar:** escopo geográfico, prazo, escopo material, contrapartida financeira.

**Risk-keywords:** "non-compete", "non-solicit", "restraint of trade", "não-concorrência".

**Sinais críticos:**
- Escopo/prazo desproporcionais (>2 anos, todo território, todo mercado) → RISCO ALTO.
- Sem contrapartida financeira → RISCO CRÍTICO (potencialmente abusiva no BR).

### 10. Pagamento e reajuste

**Buscar:** valor, moeda, forma, prazo, juros de mora, multa, reajuste (índice + periodicidade).

**Risk-keywords:** "late payment interest", "penalty", "escalation", "reajuste anual pelo IPCA", "indexação".

**Sinais críticos:**
- Reajuste unilateral sem índice objetivo → RISCO ALTO.
- Juros/multa acima do teto legal (BR: multa 2% + juros 1%/mês) → RISCO ALTO.
- Sem cláusula de suspensão em caso de inadimplemento da contraparte → RISCO MÉDIO.

## Approval routing (rota de aprovação)

**Gatilhos automáticos de escalação:**

| Cenário | Rota |
|---|---|
| Contrato ≤ R$10k anual, sem cláusulas críticas | Analista aprova sozinho |
| Contrato R$10k–R$50k anual OU 1+ cláusula ALTA | Analista → `board-chair` (Themis) |
| Contrato > R$50k anual OU cláusula CRÍTICA | Analista → `board-chair` → Ronan |
| Litígio existente OU multa iminente | Analista → advogado habilitado (fora do sistema) → Ronan |
| Envolve dado pessoal e sem DPA | Analista → advogado especializado LGPD/GDPR → Ronan |
| Envolve transferência internacional sem base legal | Analista → advogado especializado → Ronan |

**Ajustar gatilho R$** conforme decisão do Ronan/board — este é o default operacional inicial.

## Sub-bloco: comparação versão a versão + risk-flag

Quando o pedido é comparar V1 vs V2 (ou negociação em curso):

1. **Diff cláusula-por-cláusula** — lista o que mudou.
2. **Categoriza cada mudança:** favorável à Kolden, neutra, desfavorável, ambígua.
3. **Aplica risk-scoring** à versão nova nas 10 cláusulas-alvo.
4. **Sinaliza reversões** — se V2 removeu proteção que V1 tinha → RISCO REGRESSÃO.
5. **Recomendação:** aceitar V2 / negociar cláusulas específicas / recusar V2 / voltar a V1.

**Formato de saída:**

```
| Cláusula | V1 | V2 | Mudança | Risco V2 |
|---|---|---|---|---|
| 1. Cap responsabilidade | 12 meses fee | 3 meses fee | Reduziu proteção | ALTO |
| 3. Foro | SP | Cayman | Mudou jurisdição | ALTO |
| 5. DPA | Anexo I | Anexo I (mesmo) | Sem mudança | manter |
```

## Formato de saída padrão da revisão

Segue o formato do agente `analista-de-compliance-regulatorio`:

1. **Parecer operacional** — resumo por cláusula-alvo com score de risco.
2. **Risco (severidade × probabilidade)** — matriz consolidada do contrato inteiro.
3. **Recomendação executável** — aceitar / negociar (com pontos específicos) / recusar.
4. **Rota de escalação** — quem precisa aprovar antes da assinatura.

## Handoff obrigatório com Égide

Se o contrato envolver tratamento de dado pessoal e houver incidente durante a vigência: `cyber-chief` (Égide) escala para este analista para acionar a cláusula DPA + notificação ANPD/DPA. **Nota pendente para O5:** codificar rota no `cyber-chief`.

## Referências

- Código Civil brasileiro (Lei 10.406/2002) — arts. 421-480 (contratos)
- Lei nº 13.709/2018 (LGPD) — arts. 39, 41-42 (operador, DPO, DPA)
- Regulamento UE 2016/679 (GDPR) — arts. 26, 28 (joint controllers, processors)
- Bioni, B.R. *Proteção de Dados Pessoais* (Forense, 2019) — sobre DPA e operador
- Código de Defesa do Consumidor (Lei 8.078/1990) — arts. 51-53 (cláusulas abusivas), aplicáveis quando o contrato for de consumo

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support — capacidade G19.*
