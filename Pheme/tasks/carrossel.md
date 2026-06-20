---
task: carrossel()
responsavel: "@carousel-architect"
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
  - campo: carrossel
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] 5 opções de capa (swipe-stopper)"
  - "[ ] Um conceito por slide"
  - "[ ] CTA final único"
---

# Tarefa: Carrossel Salvável (IG / LinkedIn)

**ID da Tarefa:** PHEME-003
**Versão:** 1.0.0
**Comando:** `*carrossel`
**Agente:** Arquiteto de Carrossel (carousel-architect)
**Objetivo:** Criar um carrossel que ensina, gera salvamentos e constrói autoridade.

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| tema | string | Prompt do usuário | Sim | Assunto/pilar |
| rede | enum | Prompt do usuário | Sim | instagram, linkedin |
| cta | enum | Prompt do usuário | Não | salvar, seguir, comentar, compartilhar |
| slides | int | Prompt do usuário | Não | 8-12 (default) |

## Fases de Execução

### Fase 1: Capa
1. Gerar 5 opções de slide de capa (promessa específica + curiosidade).
2. Recomendar a capa primária.

### Fase 2: Arco de Slides
1. Estruturar: Capa → Contexto → Pontos (1 por slide) → Payoff → CTA.
2. Um conceito por slide; frase curta; hierarquia visual clara.
3. Garantir salvabilidade (conteúdo de referência).

### Fase 3: CTA + Notas Visuais
1. Último slide com UM CTA explícito.
2. Nota visual por slide (hierarquia, destaque), seguindo o brandbook (Aglaia).

## Formato de Saída

```markdown
## Carrossel {rede}: {tema}

**Capas (escolha 1):** 1... 2... 3... 4... 5...  → Recomendada: #

| Slide | Headline | Texto de apoio | Nota visual |
|-------|----------|----------------|-------------|
| 1 (capa) | ... | ... | ... |
...
| N (CTA) | ... | ... | ... |
```

## Condições de Veto
- NUNCA mais de um conceito por slide
- NUNCA capa genérica
- NUNCA terminar sem CTA único

## Critérios de Conclusão
- [ ] 5 capas + recomendação
- [ ] Arco com 1 conceito por slide
- [ ] Salvável (referência útil)
- [ ] CTA final único + notas visuais
