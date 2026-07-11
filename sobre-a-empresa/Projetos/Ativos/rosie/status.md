---
id: projeto-rosie-status
titulo: "Rosie — Status"
resumo: "Situação atual, próximos passos e bloqueios do projeto Rosie."
categoria: projeto
palavras-chave: [status, progresso, roadmap, rosie, solomon, deck-v3.1]
status: oficial
atualizado-em: 2026-07-01
relacionados: [leia-me, apresentacao-bruno-2026-07-01/README]
tipo: projeto
projeto: rosie
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/rosie/dossie|dossie]]"
---

# Status — Rosie

- **Fase atual:** Deck v3.1 (14 slides) pronto para envio ao Bruno. F0.1 (AOV real) resolvido via Solomon = R$ 465,59. Baseline Solomon jun/26 mostra R$ 55.405 aprovado com R$ 5.258 de mídia (ROAS agregado 10,54x). Meta M1 R$ 80k confirmada = +44% sobre baseline, não +512% sobre zero.
- **Próximos passos (semana 1):**
  - **Ronan** — abre `apresentacao-bruno-2026-07-01/deck.html` no Chrome, navega slide 11 novo ("Como bater a meta · matemática do funil"), valida visual; envia ao Bruno + PDF backup (Ctrl+P).
  - **Bruno** — responde 3 decisões (slide 12 do deck): (C) planilha Nuvemshop com margem por SKU + frequência recompra, (F) TikTok Fase 2 ou fora do escopo, (E) fotos 90s landing quick-win.
  - **Pactolo (D+3)** — refaz `cenarios-funil-reverso.md` v3 completo (modelo com AOV real R$ 465,59 + baseline R$ 55,4k + contribuição orgânica 40%+ que o v2 subestimou).
  - **Peitho pixel-specialist (D+7)** — audita Add Customer Info = 0 no funnel Solomon e IC parcial no iframe checkout Nuvemshop, antes do GTM Server ir para produção.
  - **Caliope (D+12)** — 5 fluxos e-mail RD Station no ar (boas-vindas, nutrição, carrinho, pós-compra, reativação) — foco no carrinho abandonado, que é a alavanca de retenção M+1 (0,97% → 5% = +R$ 20k/mês recorrente).
  - **Hefesto (D+15)** — CAPI Meta + GTM Server (CF Workers) + GA4 MP + Google Ads Enhanced Conversions em produção.
  - **Emporos + Peitho (D+21)** — padronizar UTM em campanhas ativas + link_in_bio + e-mail + influencer (elimina `sem_atribuicao` R$ 4.873 = 8,8% da receita).
- **Bloqueios:**
  - `[BLOQUEIA GATE 1]` CAPI + GTM Server D+15 — sem isso Meta continua cego para 30-60% dos eventos iOS/ad-blocker e Meta Fundo não pode ligar em modo Conversão-Purchase honesto.
  - `[BLOQUEIA PACTOLO v3]` F0.2 (margem por SKU) + F0.4 (frequência recompra) — Bruno mandar em 3 dias.
- **Fase atual do funil (Solomon 30d):** anúncios pagos 41% (R$ 22.667 · ROAS pago médio 4,17x) · orgânico + direto 57% (R$ 31.636) · e-mail 2% (R$ 1.103 · conv 7,69% mostrando alavanca subutilizada).
- **Última atualização:** 2026-07-01

## Histórico

- **2026-06-23 (manhã)** — Projeto criado. Brandbook v1 escrito como espelho do site; iniciada pesquisa multi-squad (Aglaia, Aletheia, Caliope gravados; Argos pendente).
- **2026-06-23 (tarde)** — Recebido o **Manual da Marca Rosie.pdf** oficial. Pasta **reorganizada 100% na estrutura do manual**:
  - Extraídas 61 páginas em PNG + imagens embutidas → `assets/`.
  - Brandbook reescrito em 3 pilares (Posicionamento, Voz da Marca, Identidade Visual) fiéis ao manual; v1 (site) descartado.
  - Anexo de **gap site × manual** criado.
  - Dossiês de pesquisa reconciliados com os dados oficiais (público 16–30, propósito, valores, voz PT+EN).
- **2026-07-01 (manhã)** — Contrato de Missão `m-20260701-112935-rosie-90d` lacrado por Hermes. 7 squads (Peitho, Caliope, Emporos, Pactolo, Cairos, Harmonia, Hefesto) entregam 7 dossiês técnicos + deck v1 (11 slides) → v2 (12 slides · linguagem PT-BR simples) → v2.1 (12 slides · 30 painéis de campanha nos modais Meta/Google). Dike aprova v2.1 (sobe sem quebras).
- **2026-07-01 (tarde)** — Análise Solomon 30d rodada via MCP oficial (`caOEzYj1TqRM0r3nHrFP`). F0.1 resolvido: AOV real = R$ 465,59 (não R$ 250 placeholder). Baseline observado R$ 55.405 aprovado / mês. Deck v3 aplica dados reais nos slides 4, 9, 10, 11 e reconcilia dossiês (Pactolo DELTA v3, spec DELTA v4.1). Dike v3 verifica delta e aprova com 3 ressalvas (aplicadas).
- **2026-07-01 (noite)** — Deck v3.1 finaliza: adicionado **slide 11 novo** ("Como bater a meta · matemática do funil") com regra Kolden de ROAS teto 3x + distribuição justa da meta por canal + comparativo com moda BR premium. Reconciliadas micro-discrepâncias Solomon fresco (CAC 48,69; ROAS 10,54x; lentes 12,52/3,61/2,44). Deck final tem **14 slides**, ids sequenciais s1-s14, nav lateral + footers coerentes.

## Fonte de verdade

- **Números Solomon canônicos:** [`registros/sessao-2026-07-01-solomon-f0-deck-v3.md`](registros/sessao-2026-07-01-solomon-f0-deck-v3.md)
- **Deck oficial (envio ao Bruno):** [`apresentacao-bruno-2026-07-01/deck.html`](apresentacao-bruno-2026-07-01/deck.html)
- **Dossiê do cliente:** [`../../clientes/ativos/rosie.md`](../../clientes/ativos/rosie.md)
- **Contrato de Missão:** [`../../../Olimpo/contratos/missoes/m-20260701-112935-rosie-90d.yaml`](../../../Olimpo/contratos/missoes/m-20260701-112935-rosie-90d.yaml)
