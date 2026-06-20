---
task: analiseMetricas()
responsavel: "@growth-analyst"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: dados
    tipo: string
    origem: User Input / Postiz / Plataformas
    obrigatorio: true

Saida:
  - campo: analise_e_proximo_teste
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Peças classificadas em dobrar / iterar / matar"
  - "[ ] Próximo teste (1 variável) definido"
  - "[ ] Roadmap até 100k atualizado"
---

# Tarefa: Análise de Métricas + Próximo Teste

**ID da Tarefa:** PHEME-007
**Versão:** 1.0.0
**Comando:** `*metricas`
**Agente:** Analista de Growth (growth-analyst)
**Objetivo:** Ler o desempenho das publicações e definir a próxima iteração rumo aos 100k.

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| dados | string | Usuário/Postiz/plataformas | Sim | Métricas das peças (retenção, salvamentos, alcance, seguidores) |
| periodo | string | Prompt do usuário | Não | Janela analisada |
| north_star | string | Prompt do usuário | Não | Métrica-norte da fase (senão, definir) |

## Fases de Execução

### Fase 1: Leitura
1. Consolidar métricas: retenção/3s, alcance de não-seguidores, salvamentos, compartilhamentos, seguidores ganhos, conversão visualização→seguidor.
2. Definir/confirmar a north star da fase.

### Fase 2: Classificação
1. Classificar cada peça/formato em **dobrar**, **iterar** ou **matar**.
2. Identificar o elo mais fraco do loop viral.

### Fase 3: Próximo Teste
1. Desenhar 1 experimento (1 variável: gancho, thumbnail, formato ou horário), priorizado por ICE.
2. Atualizar o roadmap de crescimento (fase 0-1k / 1k-10k / 10k-50k / 50k-100k).

## Formato de Saída

```markdown
## Análise — {período}

**North star:** {métrica} = {valor}

| Peça/Formato | Retenção | Salvamentos | Alcance ñ-seg | Seguidores | Veredito |
|--------------|----------|-------------|---------------|------------|----------|

**Elo fraco do loop:** ...
**Próximo teste (1 variável):** ...
**Roadmap até 100k:** {fase atual + foco}
```

## Condições de Veto
- NUNCA terminar sem um próximo teste acionável
- NUNCA otimizar por curtidas/views isoladas
- NUNCA testar mais de 1 variável por experimento

## Critérios de Conclusão
- [ ] Métricas consolidadas + north star
- [ ] Vereditos dobrar/iterar/matar
- [ ] Próximo teste de 1 variável (ICE)
- [ ] Roadmap até 100k atualizado
