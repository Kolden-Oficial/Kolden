---
tipo: runbook
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/Kommo/ferramentas]]"
---

# Ambiente de teste — Build Kommo Rosie

> Decisão da Fase 3 (Q5) do plano `maravilha-eu-recebi-a-twinkling-cat.md`:
> **pipeline sombreado na mesma conta `rosie.kommo.com`**, não subconta trial nem
> conta separada. Justificativa: evita duplicar webhooks Nuvemshop + RD Station
> (ambos já apontam para esta conta em produção); usa o mesmo canal WhatsApp real
> das Gabrielas para teste ponta-a-ponta com números descartáveis.

---

## O que é sombreado

Durante a construção (Ondas 2, 3 e 5), tudo o que for criado leva o prefixo
`[TESTE]` e a tag interna `_ambiente_teste`, para não misturar com o dataset real
das Gabrielas.

### Pipelines sombreados (criados na Onda 1)

| # | Nome de teste | Corresponde a |
|---|---------------|---------------|
| 1 | `[TESTE] Vendas` | Pipeline 1 real |
| 2 | `[TESTE] Pós-venda` | Pipeline 2 real |
| 3 | `[TESTE] Carrinho abandonado` | Pipeline 3 real |

Cada um com as mesmas etapas do pipeline "real" correspondente (4-4-5 stages).

### Salesbot sombreado

Um único Salesbot construído com **nó de entrada dedicado a números de teste**:

```
IF contact.phone IN [whitelist_de_teste] → Trilha [TESTE]
ELSE → nada (Salesbot real não roda ainda)
```

A whitelist é uma lista de 4-6 números que Gabrielas + Ronan usam para simular
clientes. Ficam em uma **lista Kommo** (`/api/v4/lists`) chamada
`whitelist_teste_salesbot`, editável pela UI (Kommo Lists).

### Tag `_ambiente_teste`

Aplicada automaticamente em toda entidade criada durante o teste:
- Leads da Trilha [TESTE]
- Contatos gerados pelo bot no fluxo de teste
- Cards que subiram por webhook Nuvemshop simulado

Todos os relatórios e views das Gabrielas passam a filtrar por `NOT
_ambiente_teste`, garantindo que a operação real não vê os dados de teste.

---

## Fluxo do teste (Onda 5)

1. **Setup** (30 min):
   - Whitelist populada com 6 números: Ronan, Gabriela Fortes, Gabriela Martins,
     Catarina Tourinho, Catarina Leite + 1 número de fallback.
   - Salesbot ativado no ambiente `[TESTE]`.
2. **Rodada 1 — Smoke Kolden** (~3h): Emporos + Ronan rodam os 8 smoke tests
   listados na §Verificação do plano. Corrigem in situ.
3. **Rodada 2 — Aceite Rosie** (~6h): Gabrielas rodam os 13 critérios da aba 8
   da planilha `Rosie_Kommo_Build_Spec.xlsx` + 10 cenários de aceite. Reportam
   por WhatsApp / plan file.
4. **Correções** (~2h): iteração de fixes até 100%.

---

## Migração `[TESTE]` → produção (Onda 6)

Passo-a-passo (Dike audita):

1. **Congelar** o Salesbot `[TESTE]` (ninguém edita mais).
2. **Duplicar** cada nó/mensagem/automação para o Salesbot de produção (Kommo tem
   função "Duplicate Bot" na UI).
3. **Ajustar** referências (pipeline_id `[TESTE] Vendas` → pipeline_id real, etc.
   — script Kolden pode fazer isso via `PATCH` massivo se a UI não fizer o remap).
4. **Ativar** o Salesbot real no nó de entrada com condição
   `contact.phone NOT IN whitelist_teste` → Trilha real (deixando ainda o teste
   isolado para eventuais smokes futuros).
5. **Dike audita nó-por-nó** vs. planilha (aba 6).
6. **Go-live**: remove condição do Salesbot real — passa a receber 100% dos contatos.
7. **Manter** o Salesbot `[TESTE]` desativado por 30d (rollback rápido se precisar).
8. **Após 30d sem incidente**, arquiva/deleta o Salesbot `[TESTE]`.

---

## Custos e limites

- **Zero custo extra** — usa a mesma conta Kommo.
- **Consome créditos de Chats API amojo** durante os testes (proativos MA5.2, MC.1, MR.1 etc.). Estimativa: 6 whitelist × ~8 disparos por rodada × 2 rodadas = ~100 mensagens de teste. Dentro do limite mensal da conta.
- **Não afeta os webhooks Nuvemshop + RD Station** — eles continuam populando os pipelines reais (não os `[TESTE]`), porque as automações AUT-01 a AUT-12 estão configuradas só para os pipelines reais nesta fase.

---

## O que NÃO é sombreado

- **Custom fields** — os 11 novos criados na Onda 1 valem para todos os leads da
  conta (leads de teste ganham o mesmo esquema de dados). Isso é intencional
  (evita divergência entre os schemas).
- **Tags** — as 9 tags do briefing são globais. A tag `_ambiente_teste` é adicional,
  não substitui.
- **Templates WhatsApp aprovados pela Meta** — os 7 templates (MA5.2, MA5.3, MA5.4,
  MC.1, MC.2, MR.1, MR.2) valem para a conta WhatsApp Business toda; usados
  livremente no teste.
- **Hermes middleware** (`/kommo/horario`) — instância única no Railway.
  Não tem instância de teste separada; o horário é sempre o real (o Salesbot de
  teste chama o mesmo endpoint).

---

## Rollback

Se algo der errado no go-live:

1. Desativar o Salesbot real (Kommo UI).
2. Reativar o Salesbot `[TESTE]` no nó de entrada (fica pronto por 30d).
3. Investigar em `[TESTE]` sem afetar clientes reais.
4. Corrigir e re-fazer go-live.

Custo do rollback: ~15 min operacionais + 0 dado perdido (leads reais que
entraram antes da desativação ficam nos pipelines reais).
