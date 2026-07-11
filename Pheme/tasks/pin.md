---
task: pin()
responsavel: "@pinterest-strategist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: tema
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: destino
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: pin
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Palavra-chave principal definida"
  - "[ ] Pin vertical 2:3 com texto legível"
  - "[ ] Título + descrição com keywords + destino"
tipo: nota
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
relacionado:
  - "[[Pheme/tasks/_indice|_indice]]"
---

# Tarefa: Pin de Pinterest (SEO Visual)

**ID da Tarefa:** PHEME-005
**Versão:** 1.0.0
**Comando:** `*pin`
**Agente:** Estrategista de Pinterest (pinterest-strategist)
**Objetivo:** Criar um pin perene que rankeia por palavra-chave e traz tráfego para a Kolden.

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| tema | string | Prompt do usuário | Sim | Assunto perene |
| destino | string | Prompt do usuário | Sim | Link de destino (Kolden) |
| keyword | string | Prompt do usuário | Não | Palavra-chave principal (senão, sugerir) |
| board | string | Prompt do usuário | Não | Board de destino |

## Fases de Execução

### Fase 1: SEO
1. Definir/pesquisar a palavra-chave principal e 3-5 secundárias.
2. Escolher o board mais relevante (ou propor um novo).

### Fase 2: Pin
1. Conceito visual vertical 2:3 (1000x1500), texto sobreposto legível, marca discreta.
2. Título com keyword + benefício.
3. Descrição (2-3 frases) com keywords secundárias e CTA suave.

### Fase 3: Fresh Pins
1. Sugerir 2-3 variações de design para o mesmo destino.

## Formato de Saída

```markdown
## Pin: {tema}

**Keyword principal:** {keyword} | **Secundárias:** ...
**Board:** {board}
**Conceito visual:** {descrição 2:3}
**Título:** {com keyword}
**Descrição:** {2-3 frases com keywords + CTA}
**Destino:** {link}
**Fresh pins (variações):** ...
```

## Condições de Veto
- NUNCA pin sem destino (link)
- NUNCA conteúdo datado (priorize perene)
- NUNCA ignorar a keyword no título/descrição

## Critérios de Conclusão
- [ ] Keyword principal + secundárias
- [ ] Pin 2:3 com texto legível e marca discreta
- [ ] Título + descrição com SEO + destino
- [ ] Variações de fresh pin sugeridas
