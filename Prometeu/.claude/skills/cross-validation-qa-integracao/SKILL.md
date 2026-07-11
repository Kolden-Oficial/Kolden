---
name: cross-validation-qa-integracao
description: >
  Use quando a demanda for verificar EFEITOS COLATERAIS entre features — "mudei X,
  o que pode ter quebrado em Y?". Cobre a matriz "feature × feature" com marcador
  (isolated/adjacent/coupled), estratégia de teste de integração cobrindo os
  pares "coupled", e regressão automática em PR na matrix. Anti-padrão explícito:
  testar SÓ a feature nova em isolado deixa bug de integração passar. Gatilhos:
  "mudei aqui, quebrou lá", "efeito colateral", "testes passaram mas quebrou",
  "matriz de dependência", "quem depende de X", "regressão", "não previ que isso
  afetava Y", "coupling entre features". Dono: @qa (Quinn). Cross-link
  `qa-anti-fantasia-com-evidencia-visual` (evidência da não-quebra).
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Cross-validation entre features

Bug clássico: dev muda função X, teste da feature X passa, feature Y (que usa X) quebra em
produção. Cross-validation é o antídoto — mapear **quais features se tocam** e testar os pares.

## O modelo mental

Cada mudança de código tem raio de impacto. Perguntas do Quinn ao ver um PR:
1. Quais **features** este código toca? (função X é usada por 1 ou 20 fluxos?)
2. Dessas features, quais estão **cobertas por teste de integração**?
3. Para as descobertas, existe **teste de regressão** que roda automaticamente?

## Matriz feature × feature

Manter em `docs/qa/coupling-matrix.md`:

| From \ To | Auth | Checkout | Faturamento | Notificação |
|---|---|---|---|---|
| **Auth** | — | coupled | isolated | adjacent |
| **Checkout** | coupled | — | coupled | coupled |
| **Faturamento** | isolated | coupled | — | adjacent |
| **Notificação** | adjacent | coupled | adjacent | — |

**Definições:**
- **isolated:** features independentes; mudança em uma não afeta outra.
- **adjacent:** compartilham modelo de dado OU passam por serviço comum, mas fluxos separáveis.
  Sanity check basta.
- **coupled:** um fluxo dispara o outro OU compartilham estado mutável. **Requer teste de
  integração cobrindo o par.**

Toda célula "coupled" **deve** ter pelo menos 1 teste que exercita as duas features juntas.

## Estratégias de teste por acoplamento

### Coupled: teste de integração fim-a-fim
```ts
// tests/integration/checkout-fatura.test.ts
test('checkout gera fatura e envia notificação', async () => {
  const pedido = await checkout.criar({ userId: 1, itens: [...] })
  const fatura = await faturamento.buscarPorPedido(pedido.id)
  const notif = await notificacao.buscarPorPedido(pedido.id)

  expect(fatura.total).toBe(pedido.total)
  expect(notif.tipo).toBe('pedido_confirmado')
  expect(notif.destinatario).toBe(pedido.user.email)
})
```

### Adjacent: contract test
Se features compartilham DTO mas fluxos separam, contract test do DTO basta.

### Isolated: nada de teste cross
Nem é preciso. Mas revisar de tempos em tempos — features podem virar coupled sem ninguém notar.

## Regressão automática por PR

Regra: **quando muda função X, roda testes de todas as features que dependem de X**.

Implementação (JS/TS):
```yaml
# .github/workflows/regression.yml
- name: Detectar features afetadas
  run: |
    git diff --name-only main...HEAD > changed.txt
    node scripts/coupling-map.js changed.txt > features.json
- name: Rodar testes das features afetadas
  run: npm run test:integration -- --features $(cat features.json)
```

`scripts/coupling-map.js` lê `docs/qa/coupling-matrix.md` + AST do código e resolve
"arquivo → feature → features dependentes".

## Padrões de acoplamento que causam bug oculto

1. **Modelo compartilhado com regra distribuída** — `Pedido` valida em Checkout, mas Faturamento
   assume que valor > 0. Novo tipo de pedido (trial) com valor 0 → Faturamento explode.

2. **Callback/event listener silencioso** — Notificação escuta evento `pedido.criado`. Checkout
   emite evento com payload novo (breaking) → Notificação renderiza template quebrado.

3. **Cache compartilhado** — Auth invalida cache de user quando muda role. Checkout lê user do
   cache e assume presença de campo que role admin não tem → NPE.

4. **Trigger de DB** — Faturamento tem trigger que cria linha em Contabilidade. Nova coluna
   NOT NULL em Faturamento → trigger falha silenciosamente.

5. **Fila com dead-letter** — Notificação consome fila. Mudança de schema no producer sem
   versionamento → mensagens vão para DLQ e ninguém percebe.

## Ferramentas de análise

- **Rastreio estático:** `nogic` (Kolden) ou `ts-morph` para AST — quem chama função X?
- **Rastreio dinâmico:** trace em prod (OpenTelemetry) — quais rotas invocam este endpoint?
- **Grafo de dependência:** `code-graph` (Kolden essencial) — quem depende do módulo X?

## Ritual mensal (nunca pular)

1. Rodar `code-graph` no repo → grafo de dependência.
2. Comparar com `coupling-matrix.md` — há coupling novo não documentado?
3. Para cada coupling novo, criar 1 teste de integração.
4. Commit da matriz atualizada.

## Sinais de que a matriz está fraca

- Bug em produção sempre "não previsto"
- PR passa em CI mas quebra em staging
- QA lê PR e não sabe onde tocar
- Time diz "isso é da outra equipe"

## Handoffs

- **Dependência circular** → Aria (@architect). Não é problema de teste; é de design.
- **Feature coupled sem dono claro** → PM (@pm Morgan). Ownership.
- **Matriz cresce demais (>10 features)** → refatorar em sub-módulos.

## Regras Kolden

- **coupling-matrix.md é fonte da verdade** — não Confluence, não Notion. Mora no repo.
- **PR que muda coupling deve atualizar matriz.** Sem update → revisor pede.
- **Sem "isolated" preguiçoso** — se tem qualquer sinal de compartilhamento (modelo, evento,
  DB), marque adjacent no mínimo.

---
## Atribuição
Herança histórica: **Marc Wandschneider** — padrões de integration testing em Node.js;
**Martin Fowler** — *IntegrationTest* article (2018), pirâmide de teste; **Simon Brown** —
C4 model (2018), decomposição por sistema/container/componente/código; **Michael Feathers** —
*Working Effectively with Legacy Code* (2004), seams e "characterization test"; **Michael
Nygard** — *Release It!* (2007), decoupling em produção. Adaptado de
`github.com/msitarzewski/agency-agents@a597cb6` (MIT), bucket B03/engineering, ID TEST G18.
