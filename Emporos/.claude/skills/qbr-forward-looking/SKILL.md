---
name: qbr-forward-looking
description: |
  Use para desenhar e conduzir Quarterly Business Review (QBR) FORWARD-LOOKING em conta B2B/SaaS
  nomeada — o QBR que planeja os próximos 90 dias, não o que recapitula o trimestre que passou.
  Gatilhos: "QBR", "quarterly business review", "revisão trimestral com cliente", "reunião
  executiva trimestral", "plano de 90 dias com a conta", "prioridades do cliente pro Q", "roadmap
  conjunto", "steering committee com cliente". Combina stakeholder map (usa a habilidade
  `mapa-de-stakeholders` como insumo), valor entregue × valor a entregar, e roadmap conjunto.
  NÃO substitui QBR de recap puro que o próprio cliente conduz (esse é dele, não é peça de
  expansão); NÃO substitui NPS survey (isso é Metis) nem financial review (isso é Pactolo).
domain: sales-enterprise
subdomain: customer-success-strategic
tier: 1
agente_dono: gestor-de-contas-estrategicas
heranca_historica: [gainsight-nick-mehta, successhackeresses]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G2)
status: semente
---

# QBR Forward-Looking

> Habilidade do `gestor-de-contas-estrategicas`. Transforma o QBR de "recap teatral" em peça
> **estratégica forward-looking**: 60-90 min com o comitê executivo do cliente para alinhar
> prioridades do próximo trimestre e conectá-las ao roadmap conjunto. Peça de RETENÇÃO + EXPANSÃO.

## Quando invocar

- Conta B2B/SaaS nomeada com ARR ≥ faixa que Afrodite definir como "conta estratégica".
- Cadência trimestral (não mensal — QBR mensal é *check-in operacional*, não é QBR).
- Antes de janela de renovação: QBR é o ritual que **precede** a conversa de renovação/expansão.
- Após mudança organizacional relevante na conta (novo CFO, nova diretriz, fusão) — refunda alinhamento.

## Fronteiras (leia antes de operar)

| NÃO é isto | É isto |
|---|---|
| QBR retrospective completo (recap detalhado do trimestre) | Referência ao passado só para PROVAR valor entregue — foco é próximos 90d |
| Sales pitch de upsell | Alinhamento estratégico onde upsell **emerge** de prioridade do cliente |
| Reunião de status operacional | Reunião executiva (C-level + patrocinador econômico) — nível de decisão |
| NPS/CSAT survey | Peça de conversa; NPS é sinal quantitativo separado (Metis) |
| Financial health review | Menciona uso vs contrato como sinal, não como diagnóstico financeiro (Pactolo) |
| QBR que o cliente conduz sozinho | O nosso é COM o cliente, entregue POR nós, alinhado ao roadmap deles |

## Herança histórica

- **Nick Mehta / Gainsight** (Customer Success Association, 2010+) — QBR como marco do ciclo de
  vida do cliente; conceito de "Success Plan" ancorado no outcome do cliente, não no output do
  produto. "The Chief Customer Officer" (Bliss + Mehta).
- **SuccessHACKER** (Todd Eby) — QBR forward-looking prático: agenda de 4 blocos (Executive
  Summary → Value Delivered → Strategic Priorities → Success Plan), regra dos "3 prioridades do
  cliente" (não mais que 3, para forçar foco).
- **Gainsight Success Plan Method** — cada prioridade do cliente vira uma "success line" com
  outcome mensurável, DRI (Directly Responsible Individual) de cada lado, marco de checagem.

## Anatomia do QBR forward-looking (90 min padrão)

**Estrutura de 4 blocos.** Ajuste ± conforme cadência.

### Bloco 1 — Executive Summary (10 min)
- Contexto da conta (ARR atual, tempo de casa, health score banda).
- **Uma frase** sobre o valor entregue no último trimestre (com dado — não retórica).
- **Uma frase** sobre a aposta dos próximos 90d.
- Sem slides de "wins do trimestre passado" — a prova vem do dado, não da narrativa.

### Bloco 2 — Value Delivered (15 min)
- **Métrica de outcome do cliente** (não de output nosso). Exemplos:
  - Se o cliente comprou pra reduzir tempo de resposta ao lead → tempo médio antes vs agora.
  - Se comprou pra fechar mais deal → win rate antes vs agora.
- Como o nosso produto contribuiu — link causal explícito, sem inflar.
- Se o outcome NÃO melhorou: reconhecer, propor investigação conjunta. **Não maquiar.**

### Bloco 3 — Strategic Priorities dos próximos 90d (30 min — coração do QBR)
- **3 prioridades máximo** do cliente (não das nossas). Formato:
  ```
  Prioridade [1|2|3] do cliente
    Contexto:      <por que agora, pressão de negócio>
    Outcome-alvo:  <métrica + valor-alvo + data>
    Onde nosso produto alavanca: <feature/módulo/serviço específico>
    DRI cliente:   <nome + cargo>
    DRI nós:       <agente/gestor>
    Marco de checagem: <data — semana 6 do trimestre>
  ```
- Se uma prioridade do cliente **não** conecta ao produto — ok, registrar e ajudar de outra forma
  (intro, referência, contexto). Prove que ouviu.
- **Sinal de expansão**: se prioridade demanda módulo/seat que o cliente ainda não tem, marcar
  **oportunidade de expansão** — mas não fazer pitch aqui. Pitch é reunião separada.

### Bloco 4 — Success Plan + Roadmap conjunto (25 min)
- **Success plan** — quem faz o quê pelos próximos 90d, com marcos:
  - Semana 2: kickoff da prioridade 1.
  - Semana 6: check-in de meio-termo (mensal se ativo).
  - Semana 12: revisão de outcome + próximo QBR.
- **Roadmap conjunto** — o que vem do nosso lado no trimestre (features, capacitação, novos
  módulos) e o que muda do lado do cliente (novo time, novo processo, integração).
- **Riscos identificados** — 1-3 riscos que podem descarrilar o plano; owner de cada.
- **Fechamento** — próximo QBR agendado antes de encerrar. Sem "vamos remarcar depois".

### Bloco 5 — Slack de 10 min (buffer + Q&A)
- Não é bloco planejado, é reserva. Se sobrar tempo, conversa aberta. Se faltou, corta buffer.

## Cadência e ritmo

- **Trimestral rígido** — 90d = janela de foco humano. QBR anual é reset estratégico, não
  substitui trimestral.
- **Preparação: 2 semanas antes** — dispara coleta de dado, alinhamento com champion, agenda
  com C-level (que é difícil de encaixar).
- **1 semana antes** — envio de **pré-leitura** de 1 página com pauta + prioridades esperadas.
  Cliente precisa vir preparado, não descobrir a pauta na hora.
- **48h depois** — envio de **ata + success plan** por escrito (não confiar em memória verbal).

## Preparação obrigatória (checklist)

- [ ] Stakeholder map atualizado (usa `mapa-de-stakeholders`).
- [ ] Health score da conta (usa `saude-de-conta`) — se vermelho, QBR vira save protocol; adiar
      forward-looking até estabilizar.
- [ ] Dado de outcome do último trimestre coletado do próprio sistema do cliente (se possível),
      não só do nosso.
- [ ] 3 hipóteses de prioridade do cliente pré-alinhadas com o champion — chegar com hipótese,
      não com pergunta em branco.
- [ ] Sinais de expansão mapeados (features não adotadas, seats parados, módulos em preview).
- [ ] Riscos conhecidos (mudança de patrocinador, uso caindo, ticket aberto crítico).

## Formato de saída (uso pelo agente após conduzir QBR)

```
CONTA: <nome> · TRIMESTRE: <Q/ano> · DATA DO QBR: <dd-mm-aaaa>
PARTICIPANTES CLIENTE: <nome/cargo × N>
PARTICIPANTES NÓS: <agente/gestor × N>

VALOR ENTREGUE (último 90d):
  Outcome medido: <métrica + delta + fonte do dado>
  Contribuição nossa: <link causal — feature/módulo específico>
  Ressalva: <se aplicável — o que NÃO entregou como esperado>

PRIORIDADES DO CLIENTE (próximos 90d):
  P1: <descrição> · outcome-alvo: <métrica + valor + data> · alavanca nossa: <o quê>
      DRI cliente: <nome> · DRI nós: <agente> · marco semana 6: <o quê>
  P2: <...>
  P3: <...>

OPORTUNIDADES DE EXPANSÃO IDENTIFICADAS:
  <upsell/cross-sell/seat> — <valor estimado> — GATILHO: <sinal que emergiu no QBR>
  (Handoff ao `redator-de-propostas` quando cliente autorizar conversa comercial.)

RISCOS ACORDADOS:
  R1: <descrição> · owner: <lado> · mitigação: <ação>

PRÓXIMO QBR: <data agendada, não "a definir">
PRÓXIMO PASSO IMEDIATO: <ação> · DONO: <agente> · DATA: <quando>
```

## Vetos

- **Não** conduza QBR sem stakeholder map atualizado — QBR sem entender quem decide vira teatro.
- **Não** inflate outcome — se a métrica caiu, admita. Cliente sabe. Fingir queima confiança.
- **Não** faça pitch de expansão dentro do bloco de prioridades — expansão é reunião separada;
  QBR é ritual de alinhamento, não de venda.
- **Não** aceite "vamos remarcar depois" para o próximo QBR — agenda na hora ou marca um placeholder.
- **Não** rode QBR com conta vermelha (health) sem antes acionar save protocol — QBR forward-looking
  pressupõe conta saudável ou amarela em recuperação.
- **Não** substitua QBR trimestral por check-in mensal — check-ins são operacionais; QBR é
  estratégico. Confundir dilui os dois.

## Ferramentas

- **GHL** (via Infisical) — registrar QBR na oportunidade da conta, anexar success plan, agendar
  próximo QBR como task com owner + data.
- **Infisical** — única fonte de credenciais.

## Atribuição

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales.
