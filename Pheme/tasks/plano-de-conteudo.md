---
task: planoDeConteudo()
responsavel: "@content-strategist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: objetivo
    tipo: enum
    origem: User Input
    obrigatorio: true
  - campo: periodo
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: plano_de_conteudo
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] 3-5 pilares definidos e alinhados à marca Kolden"
  - "[ ] Calendário com pilar por dia/rede"
  - "[ ] Cada slot tem gancho e CTA"
tipo: nota
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
relacionado:
  - "[[Pheme/tasks/_indice|_indice]]"
---

# Tarefa: Plano de Conteúdo (Pilares + Calendário)

**ID da Tarefa:** PHEME-001
**Versão:** 1.0.0
**Comando:** `*plano-de-conteudo`
**Agente:** Estrategista de Conteúdo (content-strategist)
**Objetivo:** Definir pilares, calendário editorial e ganchos para a marca Kolden em um período.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| objetivo | enum | Prompt do usuário | Sim | descoberta, autoridade, comunidade, seguidores, trafego, venda |
| periodo | string | Prompt do usuário | Sim | Ex.: "semana", "mês de julho" |
| redes | list | Prompt do usuário | Não | Instagram, TikTok, YouTube, LinkedIn, X, Pinterest (default: todas) |
| frequencia | string | Prompt do usuário | Não | Posts/semana sustentáveis |
| temas_base | list | Prompt do usuário | Não | Assuntos que a Kolden quer abordar |

## Pré-condições

- Marca Kolden com voz/visual definidos (consultar Aglaia se em rascunho)
- Objetivo de negócio claro para o período

## Fases de Execução

### Fase 1: Pilares
1. Definir 3-5 pilares (default Kolden: Autoridade, Educação, Inspiração/Visão, Prova, Comunidade).
2. Para cada pilar, descrever o que cobre e o objetivo dentro do funil.

### Fase 2: Calendário
1. Distribuir os pilares pelos dias e redes no período.
2. Respeitar frequência sustentável (consistência > volume).
3. Aplicar o modelo pilar → derivados: 1 ideia central/semana → Reel + carrossel + thread + pin + Short.

### Fase 3: Ganchos e CTA
1. Para cada slot, gerar 1 gancho forte (e 2 alternativas a testar).
2. Definir o CTA de cada peça (salvar, seguir, comentar, clicar).
3. Marcar o especialista responsável por slot.

## Formato de Saída

```markdown
## Plano de Conteúdo Kolden — {período}

**Objetivo:** {objetivo}

### Pilares
1. {Pilar} — {o que cobre} — {objetivo no funil}
...

### Calendário
| Dia | Rede | Formato | Pilar | Gancho | CTA | Especialista |
|-----|------|---------|-------|--------|-----|--------------|

### Ideia-pilar da semana (→ derivados)
{Ideia central} → Reel / Carrossel / Thread / Pin / Short
```

## Condições de Veto
- NUNCA crie calendário sem gancho e CTA por slot
- NUNCA proponha frequência insustentável
- NUNCA ignore a voz/visual da marca Kolden

## Critérios de Conclusão
- [ ] Pilares definidos e alinhados à marca
- [ ] Calendário com pilar por dia/rede
- [ ] Gancho + CTA + especialista por slot
- [ ] Ideia-pilar desdobrada em derivados
