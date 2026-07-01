---
id: journey-map-bruno-deck
titulo: "Journey Map — Bruno consumindo o deck"
agente_responsavel: ux-designer
agente_revisor: design-chief
status: rascunho
atualizado_em: 2026-06-30
relacionados: [persona-bruno, wireframes]
---

# Journey Map — Bruno × Deck Rosie 360

> Mapa de jornada com 5 fases. Cada fase tem ações, emoções, pontos de atrito e oportunidades de design.

## Fase 1 — ANTECIPAÇÃO (D-1, véspera da reunião)

| Aspecto | Detalhe |
|---|---|
| Ações | Recebe convite, sabe que será apresentado plano. Conversa com Ronan informalmente. |
| Pensamento | "Espero que tenham números reais e não só conversa." |
| Emoção | Curiosidade + ceticismo (já viu deck ruim antes) |
| Atrito | Nenhum direto — mas expectativa alta cria risco de decepção. |
| Oportunidade | Capa fortíssima · tese cristalina logo na 1ª tela. |

## Fase 2 — IMERSÃO (D0, primeiros 5 minutos da apresentação)

| Aspecto | Detalhe |
|---|---|
| Ações | Vê capa, brandbook, mercado. Tenta decidir se vale prestar atenção. |
| Pensamento | "OK eles entenderam a marca · OK conhecem o mercado · não me trate como leigo." |
| Emoção | Engajamento crescente OU tédio crescente (decide nos primeiros 5 min) |
| Atrito | Brandbook longo demais → tédio. Brandbook raso demais → "não entenderam". |
| Oportunidade | Brandbook na ORDEM do manual oficial (Bruno reconhece) · paleta Rose protagonista (deferência à marca dele). |

## Fase 3 — IMERSÃO PROFUNDA (D0, minutos 5-25)

| Aspecto | Detalhe |
|---|---|
| Ações | Vê mapa omnichannel, detalhamento por canal, fases. Faz perguntas técnicas. |
| Pensamento | "Mostra como vai fazer · quero ver o quê vai gastar · quanto isso me retorna?" |
| Emoção | Foco analítico + alerta crítico (busca brecha) |
| Atrito | Mapa Funnelytics ilegível → desengaja. Matriz densa demais → cansa olhos. Falta de KPI → desconfia. |
| Oportunidade | Funnelytics ≤ 1 tela · matrizes com linhas alternadas para leitura · KPIs em vermelho destacado entre etapas. |

## Fase 4 — DECISÃO (D0, minutos 25-40)

| Aspecto | Detalhe |
|---|---|
| Ações | Vê números (verba/CAC/ROAS/GMV), cronograma, próximos passos. Toma decisão. |
| Pensamento | "Quanto vou gastar nos próximos 6 meses? · Quanto isso volta? · O que tenho que destravar?" |
| Emoção | Tensão de decisão · alívio se o caminho parece claro |
| Atrito | Disclaimer ausente → sente que estão empurrando. Verba sem fase → assustadora. Próximos passos vagos → trava. |
| Oportunidade | Disclaimer claro em cada slide com número · escala por fase (R$18k → R$35k → R$60k) · próximos passos divididos Kolden vs Bruno em 2 colunas. |

## Fase 5 — REVISITA (D+1 até D+7)

| Aspecto | Detalhe |
|---|---|
| Ações | Reabre o deck no celular ou laptop. Manda PDF para Catarina. Verifica datas no cronograma. |
| Pensamento | "Onde estava aquele número de ROAS? · Quando começa F2 mesmo?" |
| Emoção | Confiança crescente (se o deck for navegável) OU frustração (se for pesado para reabrir) |
| Atrito | Deck pesa demais no celular → não abre. PDF sem índice → perde tempo procurando. |
| Oportunidade | Mobile-first responsivo · PDF com bookmarks (TOC) · slide #18 (Funnelytics) com link direto. |

## Pontos críticos de design

### Crítico 1 — Capa precisa fechar contrato em 8 segundos
- Deve gritar: para quem (Bruno · Rosie) · sobre o quê (estratégia) · quando (jul/2026).
- Sem rococó. Marcellus em peso + bandeira Kolden discreta no canto.

### Crítico 2 — Funnelytics é o único slide que pode "explodir"
- Tudo o resto pode ser denso ou esparso, mas o mapa precisa caber numa olhada.
- Solução: 4 colunas, ≤5 nodes por coluna, KPIs em pílulas vermelhas entre.

### Crítico 3 — Números precisam carregar disclaimer GRUDADO
- Não no rodapé do slide, mas próximo aos números — leitura linear inevitável.

### Crítico 4 — Apêndice deve estar "ali, mas escondido"
- Modo Live esconde · Modo Full mostra · transição visual marcada (chapter divider preto).

### Crítico 5 — Próximos passos visual, não burocrático
- 2 colunas (Kolden · Bruno) · ≤5 itens cada · CTA "luz verde aqui → segunda-feira" no fim.

## Métricas de UX a observar

| Métrica | Como medir | Alvo |
|---|---|---|
| Tempo até decisão | Cronômetro Ronan na reunião | ≤ 40 min |
| Perguntas fora do deck | Lista Ronan durante reunião | ≤ 5 |
| Tempo de revisita | Telemetria opcional (Hotjar no PDF view) | &gt; 0 |
| Conversões pós-deck | Aprovação F1 + assinatura | 1 / 1 |
