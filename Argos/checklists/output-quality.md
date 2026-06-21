# Checklist de Confiabilidade de Saída — Argos (Inteligência de Mercado & Scraping)

**ID do Checklist:** ARGOS-CL-001
**Referenciado por:** tasks/sintetizar-relatorio.md, agents/argos-chief.md (gate de confiabilidade), agents/research-synthesizer.md (dono operacional)
**Propósito:** Validar todo entregável de inteligência antes da entrega — e, acima de tudo, impedir
que qualquer dado sem proveniência, número não cruzado ou coleta de zona cinza não autorizada chegue ao relatório.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO

Este checklist valida saídas de pesquisa de mercado e inteligência competitiva.

ABORDAGEM DE EXECUÇÃO:
1. Para cada categoria, verifique cada item em relação ao entregável
2. Marque os itens como [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
3. Itens CRÍTICOS bloqueiam a entrega; itens não-críticos são consultivos

Itens CRÍTICOS são marcados com o sufixo (CRITICAL). Qualquer CRITICAL desmarcado = REPROVADO.]]

---

## 1. Proveniência (de onde veio cada dado?)

- [ ] Todo dado-fato carrega FONTE explícita — URL, API ou ad library identificável (CRITICAL)
- [ ] Todo dado carrega TIMESTAMP de coleta (e, quando aplicável, a data do dado-origem) (CRITICAL)
- [ ] Nenhum dado sem proveniência chegou ao relatório — foi descartado ou rebaixado a "não confirmado" (CRITICAL)
- [ ] Estimativas e inferências estão rotuladas como tal (não apresentadas como fato medido)

## 2. Confiabilidade (o dado é confiável?)

- [ ] Todo número-chave passou por CROSS-CHECK em ≥2 fontes independentes, ou está marcado "fonte única — não confirmado" (CRITICAL)
- [ ] Conflitos entre fontes foram expostos, não resolvidos silenciosamente (CRITICAL)
- [ ] Cada dado tem rótulo de confiança: VERIFICADO / FONTE ÚNICA / NÃO CONFIRMADO / OBSOLETO
- [ ] Fontes foram priorizadas ao vivo; a idade de dados antigos está sinalizada

## 3. Separação Orgânico × Pago

- [ ] Métrica de anúncio (pago) nunca foi tratada como alcance orgânico (CRITICAL)
- [ ] As trilhas orgânica e paga estão em colunas/seções distintas no dossiê
- [ ] Anúncios ativos têm fonte (ad library) + data observada; longevidade rotulada como inferência

## 4. Dimensionamento de Mercado (quando há TAM/SAM/SOM)

- [ ] O método de sizing está declarado: top-down e/ou bottom-up (CRITICAL quando há sizing)
- [ ] Top-down e bottom-up foram triangulados quando ambos existem; divergência explicada
- [ ] Nenhum TAM "de cima pra baixo" foi apresentado como verdade absoluta sem fonte

## 5. Cobertura macro → micro

- [ ] O relatório vai do macro (mercado/tendências) ao micro (concorrente detalhado) de forma rastreável
- [ ] Cada concorrente alvo tem dossiê cruzando orgânico + pago + SEO/links
- [ ] Extração de links, quando pedida, está deduplicada e classificada (interno/externo/social/asset)

## 6. Compliance & Segurança

- [ ] Toda operação em zona ToS-cinza foi autorizada pelo humano e está SINALIZADA no relatório (CRITICAL)
- [ ] Nenhuma credencial corporativa real foi usada em zona cinza — só contas/proxies descartáveis (CRITICAL)
- [ ] Nenhum segredo/credencial em texto puro — tudo via Infisical (CRITICAL)
- [ ] Operações cinza registradas em auditoria (registros/)

## 7. Entrega & Handoff

- [ ] As conclusões são acionáveis e um leigo entenderia o caminho do macro ao micro
- [ ] Se for handoff, o squad de destino e o artefato entregue estão nomeados (Peitho/Pheme/Caliope/Pluto/Aletheia/Metis)

---

## O GATE INVIOLÁVEL (veto)

> **REPROVADO automático — HALT** se QUALQUER um ocorrer:
> **(a)** algum dado-fato sem fonte + timestamp no relatório final;
> **(b)** número-chave de fonte única apresentado como "verificado" sem segunda fonte;
> **(c)** operação de zona ToS-cinza sem autorização humana explícita registrada;
> **(d)** credencial corporativa real usada em zona cinza, ou segredo em texto puro.
> Neste caso, devolva à fase de origem para corrigir a proveniência/autorização.

---

## Critérios de APROVAÇÃO/REPROVAÇÃO

**APROVADO:** Todos os itens CRÍTICOS [x] e menos de 3 reprovações não-críticas.
**REVISAR:** Todos os itens CRÍTICOS [x] mas 3+ reprovações não-críticas.
**REPROVADO:** Qualquer item CRÍTICO desmarcado, ou o GATE INVIOLÁVEL acionado.
