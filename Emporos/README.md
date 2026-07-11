---
tipo: nota
area: Emporos
up: "[[Emporos/_MOC-emporos]]"
---

# Êmporos — Squad de Execução Comercial (Vendas)

> `status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)`

Êmporos (ἔμπορος, *o comerciante itinerante* que atravessa mares para fechar a troca) é o squad de
**execução comercial** da Kolden — 5 agentes (1 orquestrador + 4 especialistas). Onde o **Afrodite**
(Olimpo/CRO) define a **estratégia de receita** (modelo de monetização, metas, política de preço, RevOps
de alto nível), o Êmporos **executa o ciclo de vendas no chão da operação**: qualifica o lead que entra,
move a oportunidade pelo pipeline, dispara as cadências de outbound, redige a proposta e conduz a
negociação até o fechamento — sempre dentro do **GHL** (GoHighLevel) como CRM de registro.

## O que o Êmporos faz

- **Qualificação de leads** — BANT e MEDDIC, lead scoring, aceite/recusa do handoff marketing→vendas (SQL vs MQL).
- **Cadências de outbound** — sequências multi-toque (e-mail, telefone, social), cold email, prospecção.
- **Propostas comerciais** — propostas, orçamentos, resposta a RFP, contratos comerciais (não-jurídicos).
- **Gestão de CRM** — higiene de pipeline no GHL: estágios, oportunidades, próximos passos, forecast operacional.
- **Negociação & fechamento** — tratamento de objeção, concessões dentro da política, fechamento.

## Agentes

| Agente | Tier | Especialidade |
|--------|------|---------------|
| `emporos-chief` | 0 | Orquestrador — tria a demanda comercial, roteia, protege o gate de qualidade e os handoffs |
| `qualificador-de-leads` | 1 | Qualificação BANT/MEDDIC, lead scoring, aceite do handoff marketing→vendas |
| `executivo-de-cadencia` | 1 | Cadências de outbound multi-toque, cold email, prospecção (Apollo/Common Room) |
| `redator-de-propostas` | 1 | Propostas comerciais, orçamentos, resposta a RFP, negociação assistida |
| `gestor-de-crm` | 1 | Higiene de pipeline no GHL: estágios, oportunidades, forecast operacional |

## Como ativar

```
@emporos-chief        # Ativa o orquestrador
*diagnose             # Tria a demanda comercial (qualificar / prospectar / propor / CRM) e roteia
*pipeline             # Revisão de pipeline + próximos passos por oportunidade (GHL)
```

Você também pode ativar um especialista direto: `@emporos:qualificador-de-leads`. O chief é o ponto
de entrada recomendado.

## Matriz de roteamento (resumo)

| Demanda | Primário | Secundário |
|---|---|---|
| Esse lead presta? / qualificar / BANT / MEDDIC | qualificador-de-leads | gestor-de-crm |
| Sequência de outbound / cold email / prospecção | executivo-de-cadencia | qualificador-de-leads |
| Proposta / orçamento / responder RFP | redator-de-propostas | gestor-de-crm |
| Negociação / objeção / fechar | redator-de-propostas | emporos-chief |
| Estado do pipeline / forecast / estágio no GHL | gestor-de-crm | emporos-chief |

## Fronteiras (o que o Êmporos NÃO faz)

- **Não define estratégia de receita** (modelo de monetização, metas globais, política de preço, RevOps macro)
  → isso é o **Afrodite** (Olimpo/CRO). O Êmporos **consome a política** e a executa; escala desvios ao Afrodite.
- **Não gera demanda / não trafega** — recebe leads do **Pheme** (social) e da **Ariadne** (SEO/CRO de página);
  não roda anúncio nem produz conteúdo de topo.
- **Não escreve a copy de marca/venda final de campanha** → isso é do **Caliope**; o Êmporos redige a peça
  comercial 1:1 (proposta, e-mail de cadência) ancorada na oferta.
- **Não dá parecer jurídico** sobre contrato — redige a proposta comercial; cláusula/risco legal escala a quem de direito.
- **Não decide preço fora da política** — opera dentro do deal-desk/política do Afrodite; exceção é escalonamento.

## Handoffs

- **Entrada (leads):** `Pheme` e `Ariadne` entregam leads/contatos → `qualificador-de-leads` aceita ou recusa.
- **Estratégia/receita:** `Afrodite` (Olimpo/CRO) define política de preço, metas e RevOps → Êmporos executa; desvio escala de volta.
- **CRM (sistema de registro):** todo o ciclo vive no **GHL**; **credenciais GHL sempre via Infisical** (nunca texto puro).
- **Pós-venda/expansão:** conta fechada → handoff a Customer Success / expansão (a materializar; hoje sinalizado ao Afrodite).

## Vetos invioláveis

1. **Sem promessa fora da política.** Preço, prazo e escopo só dentro da política do Afrodite; exceção é escalonamento, não decisão local.
2. **Lead não-qualificado não vira oportunidade.** Sem BANT/MEDDIC mínimo registrado, não avança no pipeline.
3. **Sem dado inventado no CRM.** Estágio, valor e próximo passo refletem o fato; nada de pipeline inflado.
4. **Outbound sem spam.** Cadência respeita opt-out, frequência e personalização; nada de blast não-solicitado.
5. **Credenciais só via Infisical** (nunca em texto puro). **Sem invenção de capacidade** fora de `ferramentas.md`.

## Componentes (semente)

- **5 agentes** — 1 orquestrador + 4 especialistas.
- **5 habilidades-âncora** — `qualificacao-bant-meddic`, `cadencia-de-outbound`, `redacao-de-proposta-comercial`,
  `higiene-de-pipeline-crm`, `negociacao-e-fechamento` + `catalogo.md`.
- **1 memória** — `MEMORY.md` (Padrões Ativos / Candidatos / Arquivado).

## Origem

Semente do lote `2026-06-26`, a partir do cluster comercial (G19 — 13 skills) de
`alirezarezvani/claude-skills@4a3c05b` (MIT) + plugin `sales` e conectores `apollo`/`common-room` de
`anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0). **Sem cópia literal** — princípios reescritos.
Refino completo pelo Ritual do Caos (9 fases) pendente.

## Ritual de Encerramento (auto-aprendizado obrigatório)

Todo agente deste squad, ao final de uma sessão com trabalho, aciona a habilidade `ritual-de-encerramento`
— reflete, extrai lições verificadas e grava na memória do squad (`MEMORY.md`). Fonte única:
`C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`.
