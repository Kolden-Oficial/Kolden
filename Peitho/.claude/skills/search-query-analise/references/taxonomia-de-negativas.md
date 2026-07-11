---
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
relacionado:
  - "[[Peitho/.claude/skills/search-query-analise/references/ngram-analysis-guide|ngram-analysis-guide]]"
---

# Taxonomia de negativas — biblioteca por vertical

## Negativas absolutas (aplicar a nível de conta)

### Universal
- termos vulgares
- `free` (a menos que seja freemium)
- `torrent`, `crack`, `download free`
- `salary`, `job`, `career`, `wage` (a menos que seja recrutamento)
- `kids`, `children`, `child`, `toddler` (se produto adulto)
- `wikipedia`, `pdf`, `.pdf`
- `youtube`, `video` (a menos que YouTube seja o produto)

### E-com DTC
- `wholesale`, `bulk`, `atacado` (a menos que faça B2B)
- `used`, `second hand`, `usado`
- `diy` (a menos que seja DIY brand)

### SaaS B2B
- `learning`, `tutorial`, `course`, `class` (se não vende curso)
- `template`, `example` (a menos que produto é template)
- `student`, `professor`

### Healthcare
- `symptoms` (se produto não é sintoma-related)
- `wikipedia`, `webmd`, `mayo clinic`

### Finance
- `scam`, `fraud`, `ponzi`
- `student loan forgiveness` (se não é foreground)

## Negativas condicionais (por tier)

### Brand tier — negar
- Concorrentes por nome (a menos que Competitor tier)

### Non-brand tier — negar
- `login`, `sign in`, `sign in {brand}` (redireciona para Brand)
- Nomes de concorrentes (a menos que Competitor tier)

### Competitor tier — negar
- Nome próprio (Brand tier come)

### Conquest tier — negar
- Mercados fora do target (`{competitor} indian rupee` se target é US)

## Negativas por intent (TOFU vs BOFU)

### TOFU (informational, awareness)
- **Permitir**: `how to`, `what is`, `guide`, `tutorial`, `learn`
- **Negar**: `pricing`, `buy`, `quote`, `demo`

### BOFU (transactional, decision)
- **Permitir**: `pricing`, `buy`, `quote`, `demo`, `sign up`, `login`
- **Negar**: `how to`, `what is`, `guide`, `tutorial`, `template`

## Formato de lista compartilhada

```
List: NEG_UniversalAbsoluta
- free
- torrent
- crack
- ...

List: NEG_SaaSB2B_TOFU
- ...

List: NEG_SaaSB2B_BOFU
- ...

List: NEG_Ecom_DTC
- ...
```

Aplicar via Shared Negative Keyword Lists no Google Ads / Bing / TikTok Ads.
Manter versionada — nunca deletar sem histórico.
