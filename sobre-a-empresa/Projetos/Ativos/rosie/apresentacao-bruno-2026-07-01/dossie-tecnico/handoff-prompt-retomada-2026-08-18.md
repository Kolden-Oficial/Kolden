---
tipo: prompt-de-retomada
projeto: rosie
data: 2026-08-18
uso: colar no novo Claude Code CLI depois de reiniciar e autenticar browserbase OAuth
---

# Prompt de retomada — RD Station Rosie

> Cola este bloco INTEIRO no CLI Claude Code quando voltar. Ele te devolve pro ponto exato onde paramos.

---

```
Contexto de retomada: sessão anterior em 2026-08-18 parou por config do browserbase MCP.
Lê imediatamente o handoff completo em:
C:\Kolden\sobre-a-empresa\Projetos\Ativos\rosie\apresentacao-bruno-2026-07-01\dossie-tecnico\handoff-sessao-rd-2026-08-18.md

Ele cobre: (a) o que estava sendo feito, (b) o que travou, (c) a decisão de migrar pro browserbase hosted, (d) IDs de todos os 25 templates rosie-*, (e) status dos 8 fluxos, (f) bloqueios B1-B8, (g) task list snapshot.

Também lê o plano aprovado em:
C:\Users\Ronan Silva\.claude\plans\preciso-pegar-os-25-glimmering-catmull.md

Depois de ler, faça 3 coisas EM ORDEM:

1. Confirma que o browserbase hosted está autenticado rodando:
   mcp__browserbase__start
   mcp__browserbase__navigate para "https://example.com"
   mcp__browserbase__observe com instruction "list all links on the page"
   Se observe retornar dados sem AI_APICallError, browserbase está 100%.

2. Se browserbase estiver OK, propõe em 3 linhas o próximo movimento:
   - Executar SÓ Fluxos 03 (edit bbb9b89a) + 04 (novo Pós-compra) já que os outros 6 dependem de precondições
   - OU aguardar Ronan validar/autorizar criação das 4 segmentações + 1 formulário faltantes primeiro
   - OU pivotar pra Rota 3 (guia clique-a-clique) se browserbase ainda tiver algum problema

3. Aguarda decisão do Ronan.

Não recomece do zero — o plano já foi aprovado, as tasks já existem, o dossiê está pronto. Só retoma execução.
```

---

## Contexto rápido pra você (Ronan) — caso precise checar antes de colar

**O que está pronto:**
- Plano de 8 fluxos aprovado
- 25 templates rosie-* já subidos no RD (só faltam ser plugados em fluxos)
- 2 segmentações prontas: Carrinho (19593126) e Pedido Pago (19718359)
- Auditoria completa da conta RD via MCP
- Doc `rd-station-configuracao.md` lavrado (mas com 8 bloqueios abertos)

**O que trava:**
- Browserbase self-hosted (via @browserbasehq/mcp) tem bug com key Anthropic — migrei pro hosted (SHTTP)
- Precisa OAuth login uma vez no browserbase.com pra autenticar

**Priorização se browserbase funcionar:**
1. Fluxo 03 (Carrinho) — editar existente, preserva 82 dias de analytics, CTR 0,41% catastrófico precisa consertar
2. Fluxo 04 (Pós-compra) — trigger existente, dados vivos entrando
3. Depois discutir criação das segmentações faltantes para 01, 02, 05, 06, 07

**Bloqueios operacionais que continuam (independentes desta sessão):**
- Cupons Nuvemshop `PRIMEIRA` e `SEUFRETE` — precisam ser criados na loja
- Formulário "Newsletter Rosie" — precisa ser publicado no site
- SPF/DKIM/DMARC — precisa DNS
- Validação de persona com Aletheia (você optou por seguir sem)

---

## Alternativa de resgate se browserbase seguir com problema

Se depois de autenticar OAuth o `observe` ainda der erro, pivota pra **Rota 3 (guia clique-a-clique)**:

Prompt alternativo pra colar:
```
Browserbase não está funcional. Pivotar pra Rota 3 do plano. Escrever runbook Markdown clique-a-clique dos 8 fluxos do Rosie em:
C:\Kolden\sobre-a-empresa\Projetos\Ativos\rosie\apresentacao-bruno-2026-07-01\dossie-tecnico\runbook-fluxos-rd-manual.md

Estrutura: 1 seção por fluxo, cada uma com screenshots do que clicar (descrever em texto), URL de cada tela, campos exatos a preencher com valores dos templates rosie-* já subidos. Referenciar IDs dos templates e segmentações do handoff-sessao-rd-2026-08-18.md.

Cobrir os 2 fluxos com precondição pronta (03 e 04) integralmente. Os outros 6 marcar como "aguarda precondição X".

Depois eu (Ronan) executo manualmente na UI RD Station.
```
