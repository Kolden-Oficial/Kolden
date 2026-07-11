---
task: publicar()
responsavel: "@publisher"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: peca
    tipo: string
    origem: Pipeline / User Input
    obrigatorio: true
  - campo: redes
    tipo: list
    origem: User Input
    obrigatorio: true

Saida:
  - campo: confirmacao_publicacao
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Peça aprovada no checklist qualidade-conteudo"
  - "[ ] Preview confirmado pelo usuário"
  - "[ ] Publicado/agendado e reportado (conta, horário, link/id)"
tipo: nota
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
relacionado:
  - "[[Pheme/tasks/_indice|_indice]]"
---

# Tarefa: Publicar / Agendar (Postiz / GoHighLevel)

**ID da Tarefa:** PHEME-006
**Versão:** 1.0.0
**Comando:** `*publicar` / `*agendar`
**Agente:** Publicador (publisher)
**Objetivo:** Publicar ou agendar uma peça aprovada na(s) rede(s)-alvo, com confirmação e log.

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| peca | string | Pipeline/usuário | Sim | Conteúdo final aprovado |
| redes | list | Prompt do usuário | Sim | instagram, tiktok, youtube, linkedin, x, pinterest |
| canal | enum | Prompt do usuário | Não | postiz (default), ghl |
| horario | string | growth-analyst/usuário | Não | Melhor horário; senão, agendar |
| aprovado_por | string | Pipeline | Não | Quem aprovou (gate) |

## Pré-condições (GATE)
- A peça passou pelo checklist `qualidade-conteudo.md` (itens CRÍTICOS [x]).
- A peça passou pela revisão de marca (Aglaia).
- Sem aprovação → NÃO publica.

## Fases de Execução

### Fase 1: Gate
1. Verificar aprovação do checklist e da marca. Se faltar, devolver ao squad.

### Fase 2: Formatação por rede
1. Ajustar proporção, legenda, hashtags, link e limites por rede (ver publisher.md).

### Fase 3: Preview + Confirmação
1. Mostrar preview por rede (texto/proporção/horário/conta).
2. Aguardar confirmação explícita do usuário.

### Fase 4: Publicação
1. Resolver tokens via Infisical (nunca em texto puro).
2. Publicar/agendar via Postiz (postiz-agent/API) ou GHL.
3. Agendar no melhor horário informado.

### Fase 5: Report
1. Reportar conta, horário, link/id e status.
2. Entregar ids/links ao growth-analyst para coleta de métricas.

## Formato de Saída

```markdown
## Publicação — {peça}

| Rede | Conta | Canal | Horário | Status | Link/ID |
|------|-------|-------|---------|--------|---------|

**Próximo passo:** métricas em {janela} via growth-analyst
```

## Condições de Veto
- NUNCA publicar sem aprovação explícita (preview confirmado)
- NUNCA expor credenciais — só via Infisical em runtime
- NUNCA ignorar limites/políticas da rede

## Critérios de Conclusão
- [ ] Gate de qualidade + marca aprovado
- [ ] Preview confirmado
- [ ] Publicado/agendado no canal e horário corretos
- [ ] Report entregue (conta/horário/link) ao growth-analyst
