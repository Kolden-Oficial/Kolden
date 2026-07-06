---
id: tarefas-leia-me
titulo: "Central de Tarefas da Kolden — manual do operador"
resumo: "Como capturar, organizar e despachar tarefas dentro da Kolden via radar.yaml + skill /tarefa, com integração Hermes/Cairos/Ananke/Caos."
categoria: operacao
palavras-chave: [tarefa, radar, central, gestão, kanban, operacao, /tarefa]
status: oficial
atualizado-em: 2026-06-30
relacionados: [schema, ../processos, ../metricas-e-okrs]
---

# Central de Tarefas da Kolden

> Toda tarefa de cliente, projeto interno ou pessoal vive aqui. A **planilha Google
> "Tarefas Pessoais"** foi a origem; daqui em diante o radar é a fonte de verdade.

## Mapa rápido

```
operacao/tarefas/
├── README.md                # você está aqui
├── schema.yaml              # contrato (validador)
├── radar.yaml               # SSoT — estado vivo
├── arquivo.yaml             # concluídas/canceladas (append-only)
├── radar.yaml.lock          # lock (PID+timestamp, TTL 5min)
├── playbooks/               # templates instanciáveis
├── clientes/                # projeções read-only por cliente (gerado)
├── contextos-internos/      # projeções read-only Kolden/KoldenOS/CataLogo
├── pessoal.md               # projeção pessoal (gerado)
└── importacoes/             # log de cada import externo
```

## Como funciona

**Captura — `/tarefa <input livre>`**
Você diz a tarefa em qualquer forma ("preciso comprar domínio do Brayan"). A skill:
1. Faz 1-3 perguntas críticas (cliente? prazo? bloqueia algo?).
2. Reescreve com clareza no campo `titulo`.
3. **Classifica** em qual dos 5 buckets de capacidade Kolden a tarefa cai (ver `schema.yaml`).
4. Salva no `radar.yaml` com um ID `KLD-{ano}-{contador}`.
5. Devolve resumo + sugere agente que pode absorver.

**Listagem — `/tarefa list [filtro]`**
Exemplos: `cliente:rosie`, `estado:bloqueada`, `prioridade:alta`, `agentes-envolvidos:pheme`,
`urgencia:imediata`.

**Execução — `/tarefa do <id>`**
Marca `em-andamento`. Se a classificação for `agente-faz-sozinho` ou `agente-faz-com-input`,
dispara o squad via Hermes Chief automaticamente.

**Encerramento — `/tarefa done <id>`**
Move para `arquivo.yaml` + pede 1-3 linhas de aprendizado. Histórico vira matéria-prima dos
playbooks futuros.

**Visão por cliente — `/tarefa cliente <slug>`**
Regenera `clientes/<slug>.md` (projeção read-only) e mostra. Cruza com o dossiê em
`sobre-a-empresa/projetos/<slug>/dossie.md`.

**Playbooks — `/tarefa playbook <nome>`**
Instancia um template em N tarefas (ex: rodar `cerebro-notebooklm` em todos os clientes que
ainda não têm).

**Gaps de capacidade — `/tarefa gaps`**
Lista todas as `bloqueado-por-capacidade-faltante`. Vira input do Caos para criar novo
agente/MCP/skill.

**Promoção — `/tarefa promote <id> projeto|sop`**
Tarefa que cresceu vira projeto Cairos (cronograma+escopo+risco) ou SOP Ananke (processo
recorrente). Handoff explícito, não silencioso.

## Os 5 buckets de capacidade Kolden

| Bucket | Quando | Exemplo |
|---|---|---|
| `agente-faz-sozinho` | Squad resolve ponta a ponta sem input | Transcrever vídeo (Argos), gerar copy (Caliope) |
| `agente-faz-com-input` | Squad resolve mas precisa de material/decisão | Publicar reel (Pheme + criativo aprovado) |
| `agente-instrumenta-humano-decide` | Agente prepara, humano assina | Registro INPI (Nomos prepara, Ronan assina) |
| `humano-puro` | Agente não atua | Fazer exames, comprar domínio, viajar |
| `bloqueado-por-capacidade-faltante` | Falta tool/MCP/credencial | Google Ads dev token pendente |

O 5º bucket é o que faz a Kolden crescer: cada item bloqueado é um pedido implícito ao Caos.

## Crossings com squads existentes

| Trigger | Squad/Skill | Como |
|---|---|---|
| Tarefa virou projeto | **Cairos** | `/tarefa promote <id> projeto` |
| Padrão se repete em ≥3 clientes | **Ananke** | `/tarefa promote <id> sop` |
| Tarefa bloqueada por capacidade | **Caos** | `/tarefa gaps` → input do Ritual |
| Roteamento por intenção | **Hermes Chief** | Detecta + gate de intenção |
| Build de software | **Prometeu** (via Cairos) | Cairos detecta e faz handoff |

## Regras de uso

1. **Só `/tarefa` escreve no radar.** Nunca edite à mão — quebra schema. Se o radar parecer
   errado, abra com `/tarefa show <id>` e edite via comando.
2. **Cada tarefa tem um contexto** (cliente externo, cliente interno, pessoal). Se a tarefa
   cruza dois clientes, registre duas tarefas — não cole no mesmo registro.
3. **O dossiê do cliente não muda quando uma tarefa nasce.** A ligação é unidirecional: a
   tarefa aponta para o dossiê, o dossiê não sabe das tarefas. Use `/tarefa cliente <slug>`
   para ver a visão completa.
4. **Concluído some.** Tarefa concluída vai para `arquivo.yaml` + 1-3 linhas de aprendizado.
   Não fica suja no radar.
5. **Tudo em PT-BR.** Campos, valores, títulos. Sem inglês (a não ser nome próprio).

## Linha do tempo desta central

- **2026-06-30** — fundação. Import inicial via MCP Google Sheets da planilha "Tarefas Pessoais".
  Log em `importacoes/2026-06-30_planilha-tarefas-pessoais.md`.
- **Próximo passo** — criar a skill `/tarefa` em sessão dedicada `/caos` (Ritual leve).

## Pendências conhecidas

- Skill `/tarefa` ainda não existe — esta é a infra (radar + schema + playbooks); o comando
  vem em sessão Caos separada.
- As 5 abas operacionais da planilha (Affordable, Brayan's, Henrique, Mat3vic, Vilela) são
  checklists contratuais — NÃO foram importadas nesta passada para não inundar o radar.
  Cada uma vira playbook `contrato-<cliente>` numa segunda passada.

## Fonte de verdade do schema

[`schema.yaml`](schema.yaml). Toda decisão de campo, enumeração, validação ou ID vive lá.
