---
id: playbook-checklist-de-contrato
nome: checklist-de-contrato
titulo: "Checklist do contrato — o que foi prometido vs entregue"
resumo: "Auditar o contrato de um cliente cruzando promessas (escopo, obrigações, prazos) com o que está efetivamente entregue."
categoria: playbook
palavras-chave: [contrato, checklist, auditoria, entrega, escopo, sla]
status: oficial
versao: "0.1.0"
atualizado-em: 2026-06-30
ocorrencias: 5   # vezes que apareceu na planilha
---

# Playbook — Checklist do contrato

> Origem: tarefa repetida em 5 clientes na planilha "Tarefas Pessoais" (Affordable, Brayan's,
> Mat3vic, Revolution Pro, Vilela), todas com mesmo título "Fazer um checklist do contrato de
> todos os clientes o que foi prometido e confirmar o que falta entregar". Estado consistente:
> Pendente / Alta / Curto-prazo. Promovida a template via F4 desta fundação.

## Quando usar

- Cliente cobra entrega e você precisa **provar o que já foi feito** + listar o que falta.
- Renovação de contrato — comprovar valor entregue vs prometido para fundamentar a discussão.
- Auditoria mensal de SLA (compromissos contínuos) em clientes de assessoria.
- Pré-cancelamento — entender se há débito de entrega que ainda pode segurar o cliente.

## Pré-requisitos

- **Contrato assinado** acessível (PDF no Drive, normalmente em `<cliente>/00 | Contrato/`).
- Acesso ao Drive do cliente para verificar entregas (sites, planilhas, criativos, relatórios).
- Acesso às plataformas onde a entrega vive (GHL, Meta Business, Google Ads, Solomon, etc).

## Estrutura do checklist (5 categorias)

Cada item do contrato deve ser classificado numa destas 5 categorias:

1. **Escopo Principal** — entregas-chave do contrato (ex: "criação de site", "gestão de Meta Ads").
2. **Obrigação Contínua** — compromissos recorrentes (ex: "reuniões semanais", "otimização contínua").
3. **Bônus** — entregas adicionais sem custo extra (ex: "planilha gerencial básica").
4. **Meta / Garantia** — metas numéricas ou garantias contratuais (ex: "ROI 2x em 3 meses").
5. **Exclusão (NÃO FAZER)** — o que está fora do escopo (importante registrar para evitar conflito).

Cada item ganha:
- **Status**: `Concluído | Em Andamento | Pendente | Bloqueado | N/A`
- **Responsável**: nome do membro do time
- **Evidência**: link/path da prova (URL, doc, screenshot)
- **Observação**: contexto, gargalo, próximo passo

## Estrutura física no Drive

```
<cliente>/00 | Contrato/
├── contrato-assinado.pdf
├── checklist-operacional.yaml      # ou .gsheet — o que você produzir
└── evidencias/
    ├── <item-id>-evidencia.png
    └── ...
```

## Passos

1. **Inventário do contrato** — leitura do PDF + extração das obrigações contratuais. Quem
   faz: skill `audit-contrato` (✅ ainda não existe — usar leitura manual + Argos por enquanto).
2. **Mapeamento** — para cada cláusula, identificar se é Escopo / Obrigação / Bônus / Meta /
   Exclusão.
3. **Auditoria** — para cada Escopo + Obrigação, buscar a evidência da entrega no Drive ou na
   plataforma. Documentar status + responsável + observação.
4. **Síntese** — gerar resumo: total prometido vs total entregue, gaps por prioridade,
   recomendação ao cliente (manter / renegociar / cancelar).
5. **Apresentação ao cliente** — opcional; com a Caliope (copy executivo) gerar o status report
   formal em PDF/email.
6. **Atualização do dossiê** — campos 3 (Contrato) e 11 (Pendências) do
   `projetos/<slug>/dossie.md`.

## Capacidade Kolden (hoje)

`agente-faz-com-input` — Argos pode extrair as cláusulas do PDF + buscar evidências por
plataforma; o **julgamento final** ("isso conta como entregue?") é do Ronan.

**Gap conhecido**: a skill `audit-contrato` que automatizaria a comparação promessa × entrega
ainda não existe. Quando o Caos criar (a partir desta dor recorrente em 5 clientes), o bucket
sobe para `agente-faz-sozinho`.

## Critério de feito

- [ ] 100% das cláusulas do contrato classificadas nas 5 categorias.
- [ ] Cada Escopo + Obrigação tem status + evidência (ou justificativa de N/A).
- [ ] Síntese executiva produzida (texto curto: 3-5 linhas).
- [ ] Atualização da seção "Contrato" e "Pendências" no dossiê do cliente.
- [ ] Decisão recomendada (manter / renegociar / cancelar) registrada no radar como
      próxima tarefa, se aplicável.

## Histórico de execução

| Cliente | ID da tarefa | Status na planilha | Itens do contrato (aba operacional) |
|---|---|---|---:|
| Affordable Insulation | KLD-2026-002 | Pendente | ~15 (lidos da aba oculta) |
| Brayan's Finish | KLD-2026-009 | Pendente | ~12 |
| Mat3vic Construction | KLD-2026-046 | Pendente | ~12 |
| Revolution Pro (Henrique) | KLD-2026-078 | Pendente | ~16 (4 fases) |
| Vilela Construction | KLD-2026-129 | Pendente | ~18 |

**Próximo passo**: as 5 abas operacionais ocultas da planilha original já têm o **inventário
parcial** dos contratos. Promover a `contrato-<cliente>.md` em playbook específico para cada,
herdando deste genérico.

## Evolução pendente

- Criar skill `audit-contrato` (handoff Caos): receber PDF do contrato + URL/path das
  evidências, produzir o YAML do checklist. Bucket sobe a `agente-faz-sozinho`.
- Criar SOP Ananke `sop-auditoria-contratual` para a operação recorrente (auditoria mensal).
