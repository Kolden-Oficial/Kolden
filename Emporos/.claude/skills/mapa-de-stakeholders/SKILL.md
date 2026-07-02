---
name: mapa-de-stakeholders
description: |
  Use para construir e MANTER VIVO o stakeholder map de uma conta B2B/SaaS nomeada — quem decide,
  quem influencia, quem bloqueia, quem defende. Não é organograma; é mapa POLÍTICO de decisão de
  compra e expansão. Atualização por gatilho (não por calendário fixo). Gatilhos de invocação:
  "stakeholder map", "mapa de stakeholders", "quem decide na conta", "champion", "quem manda ali",
  "blue sheet", "RACI da conta", "mudou o champion", "novo CFO no cliente", "single-thread",
  "quem influencia a renovação". NÃO substitui organograma HR do cliente (não é isso); NÃO substitui
  ICP fit (isso é qualificacao-bant-meddic).
domain: sales-enterprise
subdomain: customer-success-strategic
tier: 1
agente_dono: gestor-de-contas-estrategicas
heranca_historica: [miller-heiman-blue-sheet, gainsight]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G3)
status: semente
---

# Mapa de Stakeholders

> Habilidade do `gestor-de-contas-estrategicas`. Mapa **político** e **vivo** de uma conta nomeada —
> quem tem role, influence, interest; quem é champion, quem é blocker; RACI de decisão. Atualização
> disparada por TRIGGER (evento externo), não por calendário fixo. Single-thread é alerta vermelho,
> não conforto.

## Quando invocar

- Toda conta B2B/SaaS nomeada tem stakeholder map — sem exceção. Se não tem, a conta é *cega*.
- Antes de QBR (usa `qbr-forward-looking`).
- Antes de conversa de expansão (handoff ao `redator-de-propostas`).
- Após qualquer trigger de mudança organizacional (ver §Triggers).
- Quando o champion demonstra fragilidade (menos ativo, saiu de férias sem substituto, mudou de área).

## Fronteiras (leia antes de operar)

| NÃO é isto | É isto |
|---|---|
| Organograma HR do cliente (título/senioridade) | Mapa POLÍTICO — quem decide, quem influencia, quem trava |
| Lista de contatos no CRM | Camada acima do CRM — cada contato ganha role/influence/interest/postura |
| Fit ICP da conta | Mapa DENTRO da conta (ICP é o de fora — se a conta cabe no perfil) |
| Blue Sheet estático de 1979 | Blue Sheet VIVO, atualizado por trigger, digital |
| RACI de projeto interno | RACI de decisão de compra/expansão do cliente |

## Herança histórica

- **Miller-Heiman "Strategic Selling"** (1985, Robert Miller + Stephen Heiman) — origem da
  categorização de buying influence: **Economic Buyer, User Buyer, Technical Buyer, Coach**. A
  **Blue Sheet** é o formulário canônico onde tudo isso é mapeado. Depois virou base de várias
  ferramentas de sales enablement.
- **Gainsight Success Community** — extensão para pós-venda: além dos 4 arquétipos de compra, o CSM
  precisa mapear **Champion** (aliado interno que promove), **Detractor** (quem critica), **Blocker
  potencial** (quem pode travar renovação/expansão).
- **CEB (agora Gartner) "The Challenger Customer"** (Brent Adamson) — grupo de compra B2B tem
  em média **6,8 stakeholders**; consenso é raro; mapear "Mobilizers" (quem move a decisão
  internamente) vs "Talkers" (falam mas não decidem).

## Anatomia do stakeholder map

Cada stakeholder tem **7 campos**:

```yaml
- nome: <nome completo>
  cargo: <título formal>
  role_decisao:          # papel na decisão de COMPRA/RENOVAÇÃO/EXPANSÃO nossa
    - economic-buyer     # aprova orçamento
    - user-buyer         # usa o produto no dia-a-dia
    - technical-buyer    # avalia fit técnico / integração
    - coach              # informa nossa navegação interna
    - none               # existe na conta, mas não influencia esta decisão
  influencia: alta | media | baixa    # o quanto move a decisão
  interesse:  alto | medio | baixo    # o quanto se importa com o outcome
  postura:                            # postura em relação à Kolden
    - champion           # promove ativamente, faz nosso caso interno
    - supporter          # neutro-favorável
    - neutro
    - detractor          # cético, verbaliza dúvida
    - blocker            # trava decisão / renovação
  ultimo_toque:
    data: <yyyy-mm-dd>
    quem: <agente>
    canal: <call/email/qbr/evento>
    sentimento: positivo | neutro | negativo
  observacoes: <contexto — histórico, dor pessoal, alavanca de influência>
```

## Triggers de atualização (evento, não calendário)

O mapa é **vivo**. Cada trigger dispara revisão focada — não é revisão calendarizada.

| Trigger | Ação | Prazo |
|---|---|---|
| Novo cargo executivo anunciado (LinkedIn/notícia) | Adicionar contato + inferir role_decisao | 48h |
| Champion muda de área/empresa | **VERMELHO**: acionar save protocol + reidentificar champion | 24h |
| Reorg / M&A anunciada | Refundar mapa; toda role_decisao pode ter mudado | 1 semana |
| Champion saiu de férias sem substituto ativo | Marcar risco single-thread | Imediato |
| Detractor promovido | Reavaliar influência do detractor + neutralizar | 1 semana |
| Sentimento de qualquer decisor cai (postura) | Marcar em amarelo, planejar reengajamento | 1 semana |
| Ticket crítico aberto | Mapear quem no cliente está pressionando | Imediato |
| Ausência de toque > 60d com qualquer role_decisao alto | Marcar em amarelo, planejar reengajamento | 30d |

## Regras de composição (o que um mapa saudável tem)

- **Múltiplas threads** — no mínimo 3 role_decisao ativos em POSTURA champion/supporter/neutro
  positivo. Champion sozinho = risco vermelho.
- **Todo role_decisao coberto** — economic-buyer + user-buyer + technical-buyer identificados
  (podem ser a mesma pessoa em SMB, precisam ser mapeados como campos).
- **Detractor / Blocker rastreado** — se existe, tem plano de neutralização (não fingir que não
  existe).
- **Coach interno** — pelo menos 1 pessoa que INFORMA como a decisão anda internamente. Sem coach,
  o CSM está no escuro.
- **Frescor** — nenhum contato de role_decisao alto com `ultimo_toque` > 60d sem plano de retomada.

## RACI de decisão de compra/expansão

Sob o mapa, para cada oportunidade concreta (upsell, renovação, novo módulo):

```
DECISÃO: <o quê>
  Responsible (executa): <nome — user buyer geralmente>
  Accountable (aprova):  <nome — economic buyer>
  Consulted (opinam):    <nomes — technical buyer + champion + blocker se ativo>
  Informed (avisados):   <nomes — usuários finais + stakeholders periféricos>
```

## Alertas automáticos (o que dispara sem ser perguntado)

- **VERMELHO** — single-thread (só 1 champion, resto neutro/detractor/desconhecido).
- **VERMELHO** — champion saiu (LinkedIn/notícia).
- **VERMELHO** — economic buyer nunca foi tocado (mapa cego no topo).
- **AMARELO** — ausência > 60d com role_decisao alto.
- **AMARELO** — sentimento caiu 1 nível em qualquer role_decisao.
- **AMARELO** — mudança organizacional relevante nos últimos 90d sem mapa refundado.

## Formato de saída

```
CONTA: <nome> · ARR: <valor> · HEALTH: <verde/amarelo/vermelho>
DATA DA ATUALIZAÇÃO: <yyyy-mm-dd> · TRIGGER: <o que disparou>

STAKEHOLDERS ATIVOS (role_decisao ≠ none):
  1. <nome> · <cargo> · role: <...> · influência: <alta/media/baixa> · postura: <...> · último toque: <data>
  2. <...>
  ...

COBERTURA:
  Economic Buyer: <nome ou LACUNA>
  User Buyer:     <nome ou LACUNA>
  Technical Buyer:<nome ou LACUNA>
  Coach:          <nome ou LACUNA>
  Champion:       <nome ou LACUNA>
  Detractor:      <nome ou NÃO IDENTIFICADO>

ALERTAS:
  <VERMELHO/AMARELO — descrição — ação — DONO — DATA>

RACI DE DECISÃO EM ABERTO:
  <se houver oportunidade concreta rodando>

PRÓXIMO PASSO: <ação> · DONO: <agente> · DATA: <quando>
```

## Vetos

- **Não** opere conta com mapa vazio ou single-thread sem alerta vermelho.
- **Não** confunda seniority com influência — VP às vezes é figurativo; analista às vezes decide.
- **Não** deixe `role_decisao: none` para 100% dos contatos — se ninguém decide, o mapa está errado.
- **Não** atualize por calendário fixo (mensal/trimestral) — mapa vira burocracia. Atualização é
  por TRIGGER.
- **Não** trate detractor como inimigo — trate como fonte de dor a resolver ou risco a mitigar.
- **Não** duplique organograma HR — se o campo `role_decisao: none` está sempre marcado, o contato
  não pertence ao stakeholder map (pertence ao CRM só).

## Ferramentas

- **GHL** (via Infisical) — cada stakeholder é um contato com custom fields para role_decisao,
  influência, postura, último toque.
- **LinkedIn / notícias** — monitoramento de mudanças organizacionais (fonte de trigger).
- **Infisical** — única fonte de credenciais.

## Atribuição

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B06/sales.
