---
task: thread()
responsavel: "@linkedin-x-authority"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: tema
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: rede
    tipo: enum
    origem: User Input
    obrigatorio: true

Saida:
  - campo: texto_autoridade
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Gancho de primeira linha (5+ opções)"
  - "[ ] Corpo escaneável (1 ideia por linha)"
  - "[ ] CTA de engajamento"
---

# Tarefa: Post / Thread de Autoridade (LinkedIn / X)

**ID da Tarefa:** PHEME-004
**Versão:** 1.0.0
**Comando:** `*post-linkedin` / `*thread-x`
**Agente:** Autoridade LinkedIn & X (linkedin-x-authority)
**Objetivo:** Escrever texto de autoridade que para o scroll na primeira linha e gera engajamento.

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| tema | string | Prompt do usuário | Sim | Assunto/pilar |
| rede | enum | Prompt do usuário | Sim | linkedin, x |
| objetivo | enum | Prompt do usuário | Não | autoridade, engajamento, trafego |
| link | string | Prompt do usuário | Não | Destino (vai no comentário no LinkedIn) |

## Fases de Execução

### Fase 1: Gancho
1. Gerar 5-10 primeiras linhas (curtas, específicas, com tensão).
2. Recomendar a primária.

### Fase 2: Corpo
1. LinkedIn: gancho → corpo escaneável (1 ideia/linha) → conclusão → pergunta.
2. X: tweet 1 (gancho + promessa) → tweets de valor (1 ideia cada) → tweet final (resumo + CTA).
3. Entregar valor aplicável e específico.

### Fase 3: CTA
1. LinkedIn: pergunta para comentário; link no comentário (não no corpo).
2. X: CTA de seguir/retweet no último tweet.

## Formato de Saída

```markdown
## {rede}: {tema}

**Ganchos (escolha 1):** 1... 2... ... → Recomendado: #

**Texto:**
{post escaneável ou thread numerada}

**CTA:** {pergunta / seguir / link no comentário}
```

## Condições de Veto
- NUNCA link no corpo do LinkedIn (use o comentário)
- NUNCA tweet 1 que não funcione sozinho
- NUNCA texto denso sem espaço/escaneabilidade

## Critérios de Conclusão
- [ ] Gancho de primeira linha + opções
- [ ] Corpo escaneável e útil
- [ ] CTA de engajamento adequado à rede
