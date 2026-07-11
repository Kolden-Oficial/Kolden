---
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
---

# Desenho de lift test — template

## 1. Hipótese

```
Ao pausar {canal} em {unidade — geo/user} nos {N} próximos {semanas}, esperamos um
lift negativo de {X}% ± {Y} em conversões totais, mantendo os demais canais constantes.
Nossa expectativa vem de: {racional/base histórica}.
```

## 2. Método escolhido

| Item | Valor |
|---|---|
| Método | Holdout puro / Geo-split randomizado / Matched market / Time-based / Diff-in-diff |
| Unidade | User-level / Geo (DMA/estado/cidade) / Tempo |
| Duração | {N} semanas |
| Data de início | {DD/MM/AAAA} |
| Data de encerramento | {DD/MM/AAAA} |

## 3. Poder estatístico

| Item | Valor |
|---|---|
| MDE (minimum detectable effect) | {X}% |
| Volume mínimo por variante | {conv} |
| Volume esperado por variante | {conv/semana × N semanas} |
| Alpha | 0.05 |
| Poder | 0.80 |
| Teste é conclusivo com esse volume? | Sim / Não / Marginal |

Se "Marginal" ou "Não", ampliar duração ou geos antes de iniciar.

## 4. Matched market (se geo-split)

Geos teste ({N=3-6}):
- {geo 1}, {geo 2}, ...

Geos controle ({N=3-6}):
- {geo A}, {geo B}, ...

Pareamento: euclidean distance sobre {conv/semana, revenue/semana, tráfego orgânico}
nas últimas 8-12 semanas.

Placebo test: comparação pré-teste dos geos passa (p > 0.10)? Sim / Não.

## 5. Congelamento dos demais canais

Durante o teste, congelar:
- [ ] Meta Ads (estrutura + budget)
- [ ] Google Ads (estrutura + budget)
- [ ] TikTok Ads
- [ ] LinkedIn Ads
- [ ] Email / CRM cadence
- [ ] Ativações offline (DOOH / TV / rádio)

Documentar QUALQUER mudança em change log com timestamp.

## 6. Métricas de leitura

Primária:
- {conv de negócio principal}

Secundárias (para capturar interação):
- Search brand (query volume)
- Direct traffic
- CRM opt-in / lead volume
- Assisted conversion em search
- Revenue total (não só do canal testado)

## 7. Leitura

Após encerramento:
- Lift observado: (conv teste − conv controle) / conv controle = {Y}%
- Intervalo de confiança 95%: {min, max}
- p-value: {p}
- Significativo? Sim / Não
- Conclusão: canal é incremental / marginal / não incremental / canibaliza

## 8. Próximos passos (meta-analysis)

- Este teste é o #{N} do plano anual.
- Próximos testes:
  1. {canal / hipótese}
  2. {canal / hipótese}
- Priors bayesianos para MMM: alimentar Robyn / LightweightMMM com os lifts observados.
