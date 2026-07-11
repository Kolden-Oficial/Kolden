---
name: chief-of-staff-filtragem-e-escalonamento
description: Use ANTES de aceitar qualquer missão descendente pelo Zeus — filtra o inbox executivo pela lente Escalate/Handle/Park (matriz Chief-of-Staff) para que só o que exige mesa-CEO chegue à mesa-CEO. Aplica critérios de impacto no principal, reversibilidade e custo de oportunidade para decidir: (E) escala ao Zeus para decisão, (H) trata no nível certo sem subir, (P) parqueia com data de reavaliação. Capacidade META usada em TODO ciclo do Olimpo. NÃO use para roteamento entre deuses (isso é `routing_logic` do Zeus). Aqui é a peneira que decide se o item MERECE virar Contrato de Missão.
invocavel_por: zeus
tags: [chief-of-staff, filtragem, escalonamento, priorizacao, olimpo]
tipo: skill
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Chief-of-Staff — Filtragem e Escalonamento

Ferramenta META do Zeus: aplicada a TODO inbox executivo antes de virar Contrato de Missão. Existe porque o CEO/orquestrador é o recurso mais escasso da empresa; a distração é a maior ameaça à execução. O papel do Chief-of-Staff (mesmo quando encarnado pelo próprio Zeus) é ser a peneira consciente.

## Herança histórica

- **Bradford Anderson & Julia Amerikaner** ("The Chief of Staff Playbook", 2020) — codificaram o CoS moderno em torno de três funções: **filtragem**, **preparação de decisão** e **execução de decisão**. Insight: o CoS não decide, mas define o QUE chega à decisão.
- **Tyler Cowen & Daniel Gross** ("Talent", 2022) — descrevem CoS como "amplificador de agência do principal"; boa filtragem multiplica capacidade executiva em 2-3x. Insight: o custo do falso-positivo (subir à mesa o que não precisava) é maior que o do falso-negativo (deixar passar algo pequeno).
- **Andy Grove** ("High Output Management", 1983) — introduziu o conceito de **decisão reversível vs irreversível** e a regra "empurre a decisão para quem tem contexto e o menor grau que puder". Insight: nem toda decisão importante precisa subir; só as irreversíveis.

## Matriz Escalate / Handle / Park

Para cada item entrando no Zeus, pontue 1-5 em três eixos:

| Eixo | Pergunta | Nota alta = |
|---|---|---|
| **Impacto no principal** | Isto move a agulha do trimestre da empresa? | 5 = sim, sem isto o trimestre falha |
| **Reversibilidade** | Se decidirmos errado, quanto custa desfazer? | 5 = irreversível ou muito caro (contratação sênior, compromisso público, capex, mudança de marca) |
| **Custo de oportunidade do Zeus** | O que o Zeus DEIXA de fazer se pegar isto? | 5 = alto (Zeus tem coisa maior na mesa esta semana) |

**Decisão**:

- **ESCALATE** — Impacto ≥ 4 E Reversibilidade ≥ 4. Zeus decide. Prepare o material de decisão (opção A vs B vs C, trade-off, prazo de resposta, custo de não-decidir).
- **HANDLE** — Impacto ≥ 3 mas Reversibilidade ≤ 3. Delegue ao deus certo com `routing_logic`; Zeus NÃO precisa entrar. Se o custo de oportunidade for baixo (nota ≤ 2), pode inclusive delegar ao seed sob supervisão de um deus.
- **PARK** — Impacto ≤ 2. Coloque no backlog com data de reavaliação (default 30 dias). Não é NÃO, é AGORA-NÃO. Registre no `MEMORY.md` para não virar buraco negro.

## Critérios de bloqueio (auto-ESCALATE)

Mesmo com nota baixa, alguns itens SEMPRE escalam:

1. Compromisso público em nome da Kolden (imprensa, palestra, LinkedIn com voz do fundador).
2. Contratação, dispensa ou mudança de nível de qualquer squad-chief.
3. Mudança de identidade (marca, preço, missão declarada).
4. Gasto irreversível acima do teto vigente (cruza Plutos automaticamente).
5. Qualquer decisão que envolva dado sensível de cliente ou pareça bordo LGPD.
6. Decisão sob pressão de tempo <24h — Zeus decide sob pressão OU explicitamente delega com prazo lacrado.

## Critérios de auto-PARK (backlog obrigatório)

- Sugestão sem dor mensurada ("seria legal fazer X").
- Feature request de cliente único sem sinal de padrão.
- Refactor sem gatilho comprovado (não é apagando incêndio, não desbloqueia outra coisa).
- Pesquisa exploratória de mercado adjacente sem hipótese acionável.

## Ritmo de operação

- **Diário** — inbox rápido. 80% dos itens são HANDLE ou PARK em minutos.
- **Semanal** — revisão dos PARK (algum virou urgente? algum já não faz sentido?).
- **Mensal** — auditoria: dos itens escalados no mês, quais NÃO precisariam ter escalado? Ajuste a peneira.

## Anti-padrões

- **Escalar por medo de errar** — se o Chief-of-Staff sobe tudo, virou secretário; a peneira não filtra.
- **Handle-tudo** — o CoS decide onde não tinha mandato; Zeus perde o pulso do que está acontecendo.
- **Park eterno** — item no backlog sem data de reavaliação vira dívida invisível.
- **Escalar sem preparação** — subir um item ao Zeus sem opções, trade-off e recomendação é jogar o problema para cima; isso é rebaixamento, não escalonamento.

## Entregável

Nota rápida no início da descida do Zeus:

```yaml
zeus:
  filtragem_cos:
    veredito: "<ESCALATE | HANDLE | PARK>"
    impacto: <1-5>
    reversibilidade: <1-5>
    custo_oportunidade: <1-5>
    justificativa: "<1-2 linhas>"
    proximo_passo:
      se_escalate: "<opções + trade-off preparados>"
      se_handle: "<deus destino + prazo>"
      se_park: "<data_reavaliacao>"
```

## Guardrails

- Não substitui `routing_logic` do Zeus (essa decide QUAL deus recebe; esta decide SE algo vira missão).
- Escalonamento sem material de decisão preparado = rebaixamento (viola boa prática CoS).
- Todo PARK tem data de reavaliação obrigatória.
- Bloqueios listados acima ignoram a matriz — sempre escalam.

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT) — IDs G55+G56 do bucket B15.*
