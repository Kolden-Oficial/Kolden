---
name: paid-social-cross-platform
description: |
  Full-funnel paid social multi-plataforma — Meta, LinkedIn, TikTok, Pinterest, X (Twitter Ads),
  Snap. Matriz plataforma × estágio de funil, supressão cruzada de audiência (evita canibalismo),
  split de budget por eficiência marginal, cadência de teste por plataforma. Use quando o pedido
  for "estratégia paid social", "campanha em Meta+LinkedIn+TikTok", "cross-platform", "supressão
  de audiência", "orçamento entre plataformas", "canibalismo entre canais", "matriz de canal",
  "full-funnel paid". NÃO é search/PMax (aí use `criativo-como-hipotese-rsa-pmax` e
  `arquitetura-enterprise-ppc`); NÃO é orgânico social (handoff Pheme).
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Paid social cross-platform — full-funnel (PT-BR)

Rodar paid social em 5-6 plataformas em silos é o erro clássico da agência média: cada
plataforma cria sua bolha, canibaliza a mesma audiência da vizinha, e o dashboard mostra
soma dupla-contada. Esta habilidade opera cross-platform com matriz de estágio, supressão
cruzada e alocação por eficiência marginal.

## Herança histórica

- **Depesh Mandalia (SM Commerce)** — teoria das "3 camadas" (Awareness / Consideration /
  Conversion) aplicada a paid social multi-canal.
- **Molly Pittman (Smart Marketer / DigitalMarketer)** — codificou a temperatura de tráfego
  (frio / morno / quente) e a matriz por plataforma.
- **Kasim Aslam (Solutions 8)** — engenheiro de attribution stack cross-channel e crítico
  do double-counting entre Meta e Google.
- **Andrew Foxwell (Foxwell Digital)** — publicou o benchmark público de CPMs comparativos
  entre plataformas (Meta / TikTok / Pinterest / Snap) que virou referência de alocação.

## Matriz plataforma × estágio de funil

Nem toda plataforma serve todo estágio. Alocar corretamente evita queimar $$ em canal
que não converte no estágio pedido.

| Plataforma | TOFU (frio) | MOFU (morno) | BOFU (quente) | Melhor uso |
|---|---|---|---|---|
| **Meta (FB+IG)** | Alta | Alta | Alta | full-funnel, e-com DTC, DR |
| **LinkedIn** | Média | Alta | Alta | B2B enterprise, ABM, alto ticket |
| **TikTok** | Alta | Média | Baixa-Média | descoberta viral, DTC jovem, entertainment |
| **Pinterest** | Alta | Alta | Média | inspiração, home/beauty/fashion, feminino |
| **X (Twitter)** | Média | Alta | Média | B2B tech, event marketing, real-time |
| **Snap** | Alta | Média | Baixa | gen Z, AR try-on, DTC beauty |

## Supressão cruzada de audiência (evitar canibalismo)

Se você retargeta o mesmo site visitor em Meta + LinkedIn + TikTok simultaneamente,
paga 3 CPMs por 1 conversão. Suprima cross-platform:

### Protocolo de supressão

1. **Definir owner por estágio**. Uma plataforma "principal" por estágio.
2. **Excluir a audiência já servida** pela plataforma principal nas outras.
3. **Sincronizar via CRM upload** (customer match, CAPI custom audiences, LinkedIn Match).
4. **Refresh diário** (ideal) ou semanal (mínimo).

### Matriz de owner por caso

| Cenário | TOFU owner | MOFU owner | BOFU owner |
|---|---|---|---|
| B2B enterprise | LinkedIn | LinkedIn + Meta | Meta search retargeting |
| DTC e-com | Meta | Meta + Pinterest | Meta + Google search retargeting |
| App young gen | TikTok | TikTok + Snap | Meta remarketing |
| SaaS PLG | Meta + X | X + LinkedIn | LinkedIn CRM outbound |

## Split de budget por eficiência marginal

Não distribua budget por sensação. Aloque na **eficiência marginal** — quanto conversão a
próxima $1000 traz por plataforma.

### Metodologia

1. **Baseline por plataforma** — CPA nas últimas 4-8 semanas.
2. **Curva de saturação** — quando aumento X% de budget → aumento Y% de conv? Curva
   típica: Y = k * ln(X + 1); saturação acima de 1.5× a baseline.
3. **Alocação ótima** — mais budget onde o próximo dólar retorna mais conversões
   (equalizar Δ conv / Δ $).
4. **Rebalanceio quinzenal** — nunca fixo. Aprende, ajusta.

### Regra prática

Se plataforma A tem CPA $50 e plataforma B tem CPA $80, mas B ainda não saturou e A já
saturou, o próximo dólar vai para B. Custo médio pouco importa — importa custo marginal.

## Cadência de teste por plataforma

| Plataforma | Cadência criativo | Duração de teste | Volume mín |
|---|---|---|---|
| Meta | 3-5 novos/semana | 7-14 dias | 500 conv |
| LinkedIn | 2-3 novos/mês | 21-30 dias | 20-50 conv |
| TikTok | 5-10 novos/semana | 5-10 dias | 300 conv |
| Pinterest | 3-5 novos/semana | 14-21 dias | 200 conv |
| X | 2-3 novos/semana | 10-14 dias | 100 conv |
| Snap | 3-5 novos/semana | 7-14 dias | 200 conv |

Não use a mesma cadência para Meta e LinkedIn. LinkedIn tem volume 10-20× menor; sua
janela de aprendizado é muito maior.

## Reconciliação e leitura conjunta

- **Fonte da verdade**: um único dashboard (GA4 + CRM) com attribution model declarado.
- **Não confie no CPA reportado pela plataforma sozinho** — cada uma reivindica a mesma
  conversão. Padrão: last non-direct em GA4 + validação por lift test trimestral.
- **Sinal por plataforma**: CTR / CPM / CPA são úteis por plataforma; comparação entre
  plataformas exige o dashboard consolidado.

## Anti-padrões

- **Copy-paste do mesmo criativo entre plataformas.** Native format vence: TikTok pede
  vídeo vertical UGC, LinkedIn pede tom profissional, Pinterest pede imagem inspiracional.
- **Retargetar em todas as plataformas ao mesmo tempo** — paga 3 CPMs pela mesma conv.
- **Ignorar CPM comparativo.** Se Snap está a $8 CPM e Meta a $14 para o mesmo público,
  vale testar Snap antes de escalar Meta.
- **Julgar LinkedIn com métricas de Meta.** Volume, CPA e velocidade são diferentes.
- **Dashboard soma direta plataforma+plataforma** — dupla-conta 30-50%.

## Fronteiras inter-squad

- **Estratégia cross-platform, supressão, alocação** — Peitho faz (esta habilidade).
- **Copy nativo por plataforma** — handoff a **Caliope**
  (`anuncio-por-estagio-de-consciencia`).
- **Design de peças por plataforma (aspect ratios, native format)** — handoff a **Aglaia**.
- **Atribuição multi-touch complexa / lift test** — passar para
  `incrementalidade-cross-channel` (mesma habilidade downstream em Peitho) e depois
  handoff a **Metis** para modelagem estatística.
- **Orgânico social** — handoff a **Pheme**.

## Formato de saída

1. Matriz plataforma × estágio com owner declarado.
2. Split inicial de budget por plataforma (com justificativa marginal).
3. Protocolo de supressão cruzada (audiências excluídas onde).
4. Cadência de teste por plataforma.
5. Dashboard consolidado (attribution model + fonte da verdade).
6. Rebalanceio quinzenal como ritual.

## Referências

- `references/matriz-de-plataforma.md` — matriz detalhada com CPMs de benchmark 2025.

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B02/paid-media
(IDs PM-G9, G10). Herança histórica: Depesh Mandalia, Molly Pittman, Kasim Aslam,
Andrew Foxwell. Sem cópia literal do upstream.
