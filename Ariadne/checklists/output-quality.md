# Checklist de Qualidade — Ariadne (ARIADNE-CL-001)

> Gate de saída de todo entregável do squad. O `ariadne-chief` roda antes de entregar. Maturity ≥ 7.0.
> Itens marcados **[INVIOLÁVEL]** são HALT — espelham os `veto` do `squad.yaml`.

## GATE INVIOLÁVEL (HALT se qualquer um falhar)
- [ ] **[INVIOLÁVEL]** Nenhuma recomendação é black-hat (cloaking, PBN, keyword-stuffing, conteúdo enganoso, link spam, doorway, dark pattern).
- [ ] **[INVIOLÁVEL]** Toda recomendação de SEO tem a FONTE do dado (auditoria/GSC/PageSpeed/doc oficial); sem dado, está rotulada como **hipótese**.
- [ ] **[INVIOLÁVEL]** Toda mudança de CRO de impacto está em formato de **hipótese testável** (o que muda / por quê / como medir / critério).
- [ ] **[INVIOLÁVEL]** A copy de venda final NÃO foi escrita aqui — há briefing para handoff ao Caliope quando aplicável.
- [ ] **[INVIOLÁVEL]** Nenhuma conclusão de schema baseada em web_fetch/curl — validação por browser/Rich Results.
- [ ] **[INVIOLÁVEL]** Nenhuma credencial em texto puro; só caminho Infisical (Art. VII). Nenhuma capacidade fora de `ferramentas.md` (Art. IV).

## Qualidade do conteúdo
- [ ] Fato medido e hipótese/estimativa estão visualmente separados.
- [ ] Recomendações priorizadas por impacto × esforço, com os bloqueadores primeiro.
- [ ] Achados de SEO no formato Issue → Impacto → Evidência → Fix → Prioridade.
- [ ] Recomendações de CRO separadas em Quick Wins / Alto Impacto / Hipóteses de Teste.
- [ ] Insumos ausentes (keywords/SERP/volume) foram pedidos ao Argos, não inventados.
- [ ] Cada recomendação de CRO conecta-se à fricção/princípio que ataca.

## Coerência e handoff
- [ ] O especialista certo tratou a frente certa (sem um agente fazer o trabalho do outro).
- [ ] Handoffs identificados: copy→Caliope, medição→Metis, marca→Aglaia, keywords←Argos.
- [ ] Programmatic-SEO (se houver) tem guarda de qualidade contra thin content.
- [ ] SEO programático/conteúdo respeita E-E-A-T.

## Clareza
- [ ] Um leigo entenderia o problema, o porquê do fix e como ele será medido.
- [ ] Linguagem em PT-BR; termos técnicos explicados na primeira ocorrência.
