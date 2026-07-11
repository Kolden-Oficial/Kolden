---
tipo: projeto
projeto: vilela-construction
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
---

# Template — Relatório Semanal Google Ads Vilela Construction

> **Autor:** Peitho / `performance-analyst`
> **Cadência:** toda sexta 15h Boston (BRT-3 ou EST-5 dependendo do DST)
> **Destinatário direto:** Ronan (aprovação) + Bernardo (execução) — Thiago recebe versão executiva mensal
> **Arquivo por semana:** `relatorio-D07-YYYY-MM-DD.md`, `relatorio-D14-YYYY-MM-DD.md`, etc.
> **Uso deste template:** copiar → renomear → preencher → não deletar campos, marcar `[NA]` quando não se aplica

---

## Cabeçalho (obrigatório em todo relatório)

```yaml
periodo: "YYYY-MM-DD → YYYY-MM-DD"
gasto_total_usd: 0
leads_totais: 0
cpa_medio_usd: 0
alerts_ativos: []  # ["cpa_alto", "spend_anomalo", "quality_score_baixo", ...]
proxima_acao_ronan: ""
proxima_acao_bernardo: ""
```

---

## §1. Sumário executivo (2-3 frases)

> _Exemplo: "Semana D+7 do canal Google Ads. Gasto de USD 68 gerou 4 leads (CPA USD 17). Kitchen puxou o resultado (3 dos 4 leads), Bathroom teve CTR baixo (0.8%) — 3 negativas incorporadas. Próxima decisão: manter Kitchen no bid atual e testar 2 headlines novos em Bathroom."_

- Uma linha por campanha com resultado
- Uma linha com a decisão da semana (o QUE muda a partir de segunda)
- Zero jargão — Ronan lê em 30s

---

## §2. Performance por campanha

| Campanha | Gasto USD | Impressões | Clicks | CTR | CPC USD | Conv | CVR | CPA USD | Quality Score |
|---|---|---|---|---|---|---|---|---|---|
| US_Brand_All_All_v1 | | | | | | | | | |
| US_Nonbrand_Kitchen_TOFU_v1 | | | | | | | | | |
| US_Nonbrand_Bathroom_TOFU_v1 | | | | | | | | | |
| US_Remkt_All_LP-view_v1 | | | | | | | | | |
| **Total** | | | | | | | | | |

**Legenda de status:**
- 🟢 dentro do target
- 🟡 desvio 10-25% do target
- 🔴 desvio > 25% do target OU alerta ativado

**Target de referência (recalibrar D+30):**
- CPA: < USD 75 (ideal) / < USD 100 (aceitável)
- CVR: > 3%
- CTR: > 3% (Search Non-brand) / > 5% (Search Brand)
- Quality Score: > 6

---

## §3. Performance por ad group (top 3 movimentadores)

| Ad Group | Campanha | Gasto | Leads | CPA | Ação |
|---|---|---|---|---|---|
| | | | | | manter / ajustar bid / pausar |
| | | | | | manter / ajustar bid / pausar |
| | | | | | manter / ajustar bid / pausar |

---

## §4. Search Query Report (SQR) — mineração da semana

**Queries que geraram lead (positive):**
1. "..." — CPC USD X, CVR Y%, 1 lead → confirmar/expandir keyword
2. "..." → idem
3. "..." → idem

**Queries que desperdiçaram budget (candidatas a negativa):**
| Query | Clicks | Gasto | CTR | CVR | Sugestão |
|---|---|---|---|---|---|
| "..." | | | | 0% | negativa broad |
| "..." | | | | 0% | negativa exact |

**Total de negativas incorporadas nesta semana:** N (X campaign-level, Y ad-group-level)

Referência: skill `search-query-analise` — `Peitho/.claude/skills/search-query-analise/SKILL.md`

---

## §5. Rastreamento — health check

| Camada | Status | Match rate / Health | Ação |
|---|---|---|---|
| Camada 1 (client-side tag) | 🟢 / 🟡 / 🔴 | N conv registradas × M diagnósticos | — |
| Camada 2 (OCI via gclid GHL) | | Uploads: N no período | — |
| Camada 3 (Enhanced Conversions) | | Match rate % | ≥ 70% target, ≥ 40% aceita |
| Meta Pixel + CAPI | | Match Quality: X/10 | ≥ 6/10 target |

**Deduplicação Meta:** X% dos eventos com `event_id` batendo Pixel × CAPI (target ≥ 95%)

**Alertas de tracking:** [listar red flags — se algum match rate < 40% ou dedup < 90%]

---

## §6. Consent Mode v2 — behavior

- % de sessões com consent aceito: XX%
- % rejeitado explicitamente: XX%
- % sem interação (default denied): XX%
- Impacto em Enhanced Conversions: [descrever]

---

## §7. Escala vs corte — decisão de budget da semana

Regras codificadas (não negociáveis sem override Ronan):
- Se `CPA < USD 75` e `≥ 15 leads/mês` → escalar 50% do budget da campanha vencedora (max +USD 30/dia)
- Se `CPA > USD 150` por 2 semanas consecutivas → cortar 30% e refazer keywords/copy
- Se `Quality Score < 5` em ad group → pausar até refazer copy
- Se `gasto > 2× diário planejado` em qualquer campanha → pause automático + alerta WhatsApp

**Decisão desta semana:**
- [ ] Manter tudo (status quo)
- [ ] Escalar campanha X em +Y% (justificativa)
- [ ] Cortar campanha X em -Y% (justificativa)
- [ ] Pausar ad group X (justificativa)
- [ ] Outra: ...

**Aprovação necessária:** Ronan via WhatsApp em [YYYY-MM-DD hh:mm] — timeout 24h = manter status quo.

---

## §8. Copy / criativo — teste da semana

- Headlines novas testadas: N (nomes das variações)
- CTR delta vs baseline: +/- X%
- Descriptions novas testadas: N
- Landing test (se aplicável): ...

**Handoff Caliope necessário:** Sim/Não — [descrever]
**Handoff Aglaia necessário:** Sim/Não — [descrever]

---

## §9. Landing page — health

| Métrica | Semana | vs baseline | Status |
|---|---|---|---|
| Sessions Google Ads | | | |
| Bounce rate | | | |
| Avg session duration | | | |
| Form starts | | | |
| Form submits | | | |
| Form abandon rate | | | |

**Regressões detectadas:** [listar — page speed, layout shift, quebra de tag, mudança de content]

---

## §10. Alertas ativos + pendências

**🔴 Críticos (bloqueiam otimização):**
- [ ] ...

**🟡 Altos (impactam resultado, resolver em 2 semanas):**
- [ ] ...

**🟢 Baixos (backlog):**
- [ ] ...

**Bloqueios do roadmap (recheck):**
- B1: Taxa fechamento + margem bruta — status
- B2: Telefone real — status
- B3: 3 testimonials reais — status
- B4: ID conta Google Ads — status
- B5: URL final LP + acesso repo — status
- B6: Cláusula GHL sombra assinada — status
- B7: Google Ads MCP developer token — status

---

## §11. Próximas 2 semanas — plano operacional

| Data | Ação | Responsável | Depende de |
|---|---|---|---|
| YYYY-MM-DD | ... | ... | ... |
| YYYY-MM-DD | ... | ... | ... |

---

## §12. Anexos

- Screenshot dashboard Google Ads (opcional em relatório interno; obrigatório em relatório mensal Thiago)
- Screenshot Enhanced Conversions diagnostics
- Screenshot Meta Events Manager
- CSV completo do SQR (link ou anexo)

---

## Gate D+30 — Auditoria Forense (marcar quando aplicável)

- [ ] Health score obtido: XX/100 (target ≥ 70)
- [ ] Waste quantificado: USD XX perdidos por [categoria]
- [ ] Recalibração do valor de conversão feita — números reais do Thiago substituíram `[BENCHMARK]`
- [ ] Dike (verificação adversarial independente) rodada e aprovada

Referência: `Peitho/.claude/skills/auditoria-forense-200-checkpoints/SKILL.md`

---

## Meta-orientações para o performance-analyst

- **Voz:** direta, factual, zero jargon promocional. "CPA subiu 15%" > "we saw some challenges with CPA this week"
- **Rastreabilidade:** cada número com tag `[VALIDADO|BENCHMARK|PENDENTE]` no primeiro uso
- **Regras:** decisões da semana só saem se dentro das regras codificadas §7 OU com override explícito do Ronan
- **Escalonamento:** qualquer red flag 🔴 dispara mensagem no WhatsApp Evolution API dentro de 2h da detecção — não esperar sexta
- **Rito de encerramento:** ao final do relatório, gravar aprendizados na `Peitho/agent-memory/performance-analyst.md` conforme skill `ritual-de-encerramento`

---

_Template criado 2026-07-09 como parte da Onda 4 do canal Google Ads Vilela. Atualizado sempre que uma nova métrica virar essencial (ex: quando Google Ads MCP developer token for aprovado, adicionar seção de queries via API)._
