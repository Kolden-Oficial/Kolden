---
name: auditoria-forense-200-checkpoints
description: |
  Auditoria forense de conta de anúncios paid — checklist 200+ pontos em 8 categorias
  (Estrutura / Público / Criativo / Orçamento / Rastreio / Funil / Change History / Compliance),
  cada achado carimbado com severidade (crítico / alto / médio / baixo) e impacto quantificado
  em $/mês desperdiçado ou perdido. Use quando o pedido for "auditar conta", "conta herdada
  de agência", "onde está sangrando dinheiro", "performance caiu sem razão clara", "auditoria
  forense de Ads", "quanto estamos perdendo por mês", "change history", "por que essa conta
  não escala". NÃO é auditoria pontual de UMA campanha (aí basta `*review` no ads-analyst);
  NÃO é diagnóstico de tracking (aí use `Peitho:tasks/setup-tracking`).
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
tipo: skill
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
---

# Auditoria forense de conta de ads — 200+ checkpoints (PT-BR)

Toda conta de anúncios sob $10K/mês tem 3-8% de gasto desperdiçado. Toda conta acima de
$100K/mês tem 8-25%. Toda conta herdada de agência anterior tem sistematicamente pelo
menos 15%. Esta habilidade não é um review superficial — é uma **auditoria forense** que
pontua cada categoria de 0 a 10, quantifica o gasto perdido em $/mês e entrega um
relatório priorizado que o CFO consegue ler.

## Herança histórica

- **Frederick Vallaeys (Optmyzr / ex-Google Ads)** — codificou o conceito de
  *account audit as a product*; introduziu a régua "impacto financeiro por achado" que hoje
  é padrão de agência.
- **Perry Marshall — "Ultimate Guide to Google AdWords" (2005, 6ª ed. 2020)** — a matriz
  80/20 de gasto vs. conversão que estrutura a Fase 3 desta habilidade.
- **Brad Geddes ("Advanced Google AdWords", 2010, 3ª ed.)** — o inventário forense de
  categorias que virou a espinha das 8 dimensões abaixo.
- **Larry Kim (WordStream / MobileMonkey)** — popularizou "wasted spend" como métrica
  reportável ao cliente.

## As 8 categorias forenses

Cada categoria tem 20-30 checkpoints. Cada checkpoint tem severidade + impacto estimado.

### 1. Estrutura da conta (0-10)

- Convenção de nomes (campanha / ad group / asset group) é consistente e legível?
- Campanhas com match type misturado (broad + phrase + exact no mesmo grupo)?
- CBO vs. ABO — a escolha bate com maturidade da campanha?
- Nº de campanhas ativas — fragmentação de aprendizado?
- Campanhas duplicadas (mesmo público, mesmo objetivo, mesmo criativo)?
- Objetivo de campanha bate com meta de negócio (traffic vs. conversion)?
- Shared budgets ativos sem controle diário?
- Naming schema permite report por dimensão (mercado / linha / público)?
- Estrutura permite escalar novo produto sem quebrar histórico?
- Campanhas "sandbox" abandonadas rodando?

### 2. Saúde de público (0-10)

- Overlap de audiências entre ad sets (canibalismo)?
- Ratio audiência vs. budget (alcance adequado)?
- Lookalikes atualizados nos últimos 90 dias?
- Custom audiences com recência OK (não vencidas)?
- Exclusão de clientes existentes em prospecting?
- Segmentação demográfica sobreposta desnecessária?
- Interest targeting redundante?
- Uso de placeholder audiences (herdadas, sem propósito claro)?
- Sequencing entre camadas de funil declarado?
- CAPI enviando enough audience signal?

### 3. Criativo (0-10)

- Nº de criativos ativos por ad set (mínimo 3-5)?
- Idade média do criativo (>60 dias = fadiga provável)?
- Diversidade de formato (imagem / vídeo / carrossel / UGC)?
- Diversidade de ângulo (problema-aware, solution-aware, product-aware, most-aware)?
- Histórico de teste registrado (aprendeu algo)?
- Cadência de refresh (>20% mensal em contas de alto gasto)?
- Aspect ratios corretos por placement?
- Hooks (primeiros 3s) em vídeos são testados?
- CTA consistente com landing?
- Compliance com política (claims, before/after, prohibited categories)?

### 4. Eficiência de orçamento (0-10)

- Distribuição do gasto — 80/20 ok? (20% dos ad sets carregam 80% do resultado?)
- Zombie campaigns (0 conv em 7+ dias) ainda rodando?
- Orçamento suficiente para saída de learning phase?
- Performance por dia da semana / hora do dia mapeada?
- Dayparting configurado onde faz sentido?
- Placement waste (Audience Network, apps ruins) sangrando?
- Bid strategy correta para maturidade (tCPA vs. Max Conv vs. tROAS)?
- Portfolio bidding usado onde bate?
- Reserva de teste (5-15%) apartada?
- Gasto em pause loop (paused → resumed → paused)?

### 5. Rastreio (0-10)

- Pixel + CAPI ativos e reconciliados?
- Enhanced Conversions / server-side (Google)?
- Event Match Quality Score (EMQ) > 6 no Meta?
- Priorização de eventos configurada (Aggregated Event Measurement)?
- Attribution window definido com racional?
- Discrepância dashboard vs. GA4 > 15%?
- Consent Mode v2 implementado?
- UTM parameters consistentes e passando pelo funil?
- Deduplicação browser × server?
- Alertas de falha de rastreio configurados?

### 6. Funil (0-10)

- Landing page bate com criativo?
- LCP / INP / CLS OK (Core Web Vitals)?
- Formulário com > 5 campos = friction?
- Taxa de conversão por estágio mapeada?
- Retorno para não-convertidos (email nurture) ativo?
- Handoff paid → sales/CRM auditado?
- Copy da LP puxa o mesmo hook do anúncio?
- Trust signals na LP (prova, garantia, review)?
- Mobile UX comparado a desktop?
- Thank-you page dispara evento correto?

### 7. Change history forense (0-10)

- Quem tem acesso à conta (usuários, permissões)?
- Change history nos últimos 90 dias — o que mudou?
- Mudanças coincidem com quebra de performance?
- Automated rules ativas fazendo o quê?
- Scripts / bidding rules herdados sem documentação?
- Terceiros (agências, freelancers) ainda com acesso?
- MFA obrigatório?
- Log de acesso auditado?
- Bulk actions recentes sem justificativa?
- Reversões (edit → revert) mostrando confusão operacional?

### 8. Compliance & risco (0-10)

- Política de plataforma (Meta / Google / TikTok Ads Policies) — violações abertas?
- Categorias sensíveis (health, finance, gambling) tratadas com Special Ad Category?
- Landing page em conformidade com regulação (LGPD, GDPR, CCPA)?
- Consent cookie banner ativo antes do pixel disparar?
- Claims de resultado com disclaimer?
- Uso de dados sensíveis (health, ethnicity) no targeting?
- Certificação de agência ativa?
- Segurança da conta (2FA em todos os users)?
- Backup de estrutura da conta (export mensal)?
- Documento de handoff caso a agência mude?

## Severidade e impacto quantificado

Todo checkpoint que falha vira um achado. Todo achado carrega dois carimbos.

### Severidade

| Nível | Definição | Prazo de correção |
|---|---|---|
| **Crítico** | rastreio quebrado, política violada, gasto ativo em zombie, credencial exposta | <24h |
| **Alto** | problema estrutural reduzindo performance >30% | <7 dias |
| **Médio** | oportunidade que melhoraria 10-30% | <30 dias |
| **Baixo** | polimento / boas práticas | próximo sprint |

### Impacto em $/mês

Sempre quantificar. Nunca "isso pode estar ruim" — sempre "isso está queimando $X/mês".

| Categoria | Cálculo |
|---|---|
| Zombie campaigns | soma do gasto de campanhas com 0 conv em 7+ dias × 4 semanas |
| Audience overlap | gasto duplicado estimado = min(gasto A, gasto B) × overlap % |
| Placement waste | gasto em placements com CPA > 3× CPA médio |
| Tracking loss (Meta browser only) | 30-40% do CPA revelado × conversões perdidas |
| Wrong objective | delta CPA vs. objetivo correto × conversões |

## Estrutura do relatório entregue

```
1. Executive Summary
   - Score global (0-10, média ponderada)
   - Top 3 achados críticos
   - Impacto total estimado ($/mês)
   - Quick wins acionáveis hoje

2. Scorecard por categoria (radar chart)
   Estrutura | Público | Criativo | Orçamento | Rastreio | Funil | Change History | Compliance

3. Achados detalhados
   - Categoria / severidade / impacto $/mês
   - Evidência (screenshot / URL / dado)
   - Recomendação específica
   - Owner sugerido + prazo

4. Quick wins (30 dias)
5. Correções estruturais (60-90 dias)
6. Roadmap de otimização contínua (12 meses)
```

## Fronteiras inter-squad

- **Auditoria + relatório priorizado** — Peitho faz (esta habilidade).
- **Copy de anúncio para substituir o que estiver ruim** — handoff a **Caliope**.
- **Modelagem estatística de incrementalidade** — handoff a **Metis**.
- **Compliance jurídica em cases regulados** — handoff a **Themis**.

## Formato de saída

Relatório em 6 blocos (Executive Summary → Scorecard radar → Achados detalhados → Quick wins
→ Correções estruturais → Roadmap 12m). Toda linha carrega: severidade, impacto $/mês,
recomendação, owner, prazo.

## Referências

- `references/checklist-por-categoria.md` — 200+ pontos organizados nas 8 categorias.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/paid-media
(IDs PM-G1, G2, G3). Herança histórica: Frederick Vallaeys (Optmyzr), Perry Marshall,
Brad Geddes, Larry Kim (WordStream). Sem cópia literal do upstream.
