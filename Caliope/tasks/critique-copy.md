---
task: critiqueCopy()
responsavel: "@copy-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: copy_text
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: copy_type
    tipo: enum
    origem: User Input
    obrigatorio: true

Saida:
  - campo: critique_report
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todos os 8 critérios pontuados com justificativa"
  - "[ ] Falha fatal identificada com exemplos de reescrita"
  - "[ ] Lista priorizada de correções com roteamento para especialistas"
---

# Tarefa: Criticar Copy

**ID da Tarefa:** COPY-011
**Versão:** 1.0.0
**Comando:** `*critique-copy`
**Agente:** Copy Chief (copy-chief)
**Objetivo:** Entregar uma crítica estruturada de copy em 8 pontos, com avaliação pontuada e correções priorizadas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| copy_text | string | Prompt do usuário | Sim | Copy completa a ser criticada |
| copy_type | enum | Prompt do usuário | Sim | headline, sales-letter, email, vsl-script, ad, landing-page, funnel, bullets |
| original_brief | string | Prompt do usuário | Não | Briefing original ou objetivo para o qual a copy foi escrita |
| target_audience | string | Prompt do usuário | Não | Público pretendido |
| performance_data | object | Prompt do usuário | Não | Métricas existentes se a copy estiver no ar |

---

## Pré-condições

- Texto completo da copy fornecido (não fragmentos)
- Tipo da copy identificado para os critérios corretos de pontuação

---

## Fases de Execução

### Fase 1: Avaliação Objetiva
1. Leia a copy uma vez sem julgamento — anote as reações instintivas
2. Leia novamente com o framework de pontuação de 8 pontos ativo
3. Para cada um dos 8 critérios, atribua uma pontuação (1-10):
   - **Atenção (Título/Gancho):** Ele faz a pessoa certa parar?
   - **Interesse (Abertura):** Ele conquista as próximas 100 palavras?
   - **Desejo (Benefícios/Prova):** Ele faz o leitor querer o resultado?
   - **Ação (CTA/Fechamento):** Ele compele à ação imediata?
   - **Especificidade:** As alegações são concretas, com números, nomes e detalhes?
   - **Prova:** Toda alegação é sustentada por evidências?
   - **Voz:** Existe uma personalidade consistente e convincente?
   - **Fluxo:** Você consegue parar de ler em qualquer ponto, ou a copy te puxa adiante?
4. Calcule a pontuação composta e atribua o veredito:
   - 80-100: Elite — apenas polimento mínimo
   - 60-79: Forte — melhorias direcionadas necessárias
   - 40-59: Precisa de Trabalho — reescritas significativas necessárias
   - Abaixo de 40: Fraca — considere recomeçar com uma nova abordagem

### Fase 2: Crítica Profunda
1. Para cada critério com pontuação abaixo de 7, forneça:
   - O que especificamente está errado (cite o texto exato)
   - Por que isso importa (o que custa em conversões ou engajamento)
   - Como corrigir (sugestão específica de reescrita)
2. Identifique a "falha fatal" — o maior problema único que está matando o desempenho
3. Avalie a calibração do nível de consciência — a copy está dirigida ao nível certo?
4. Verifique "crimes de copy":
   - Falar sobre si mesmo antes de falar sobre o leitor
   - Características sem benefícios
   - Alegações sem prova
   - Linguagem vaga onde especificidades poderiam ser usadas
   - Voz passiva no CTA
   - Múltiplos CTAs competindo por atenção

### Fase 3: Recomendações Acionáveis
1. Forneça uma lista priorizada de correções (maior impacto primeiro)
2. Para as 3 principais correções, escreva exemplos reais de reescrita
3. Recomende qual agente especialista poderia lidar melhor com cada correção
4. Se dados de desempenho forem fornecidos, correlacione as pontuações fracas com quedas de métricas
5. Forneça uma seção de "vitórias rápidas" — mudanças que levam menos de 5 minutos

---

## Formato de Saída

```markdown
## Relatório de Crítica de Copy

**Tipo de Copy:** {type}
**Pontuação Composta:** {X}/80 ({percentage}%)
**Veredito:** {Elite / Forte / Precisa de Trabalho / Fraca}
**Falha Fatal:** {descrição de uma linha}

---

### Scorecard de 8 Pontos

| # | Critério | Pontuação | Status |
|---|-----------|-------|--------|
| 1 | Atenção | X/10 | {Passou/Corrigir} |
| 2 | Interesse | X/10 | {Passou/Corrigir} |
| 3 | Desejo | X/10 | {Passou/Corrigir} |
| 4 | Ação | X/10 | {Passou/Corrigir} |
| 5 | Especificidade | X/10 | {Passou/Corrigir} |
| 6 | Prova | X/10 | {Passou/Corrigir} |
| 7 | Voz | X/10 | {Passou/Corrigir} |
| 8 | Fluxo | X/10 | {Passou/Corrigir} |

---

### Crítica Detalhada

#### {Nome do Critério} — {Pontuação}/10
**Problema:** {o que está errado — cite o texto exato}
**Impacto:** {o que custa}
**Correção:** {recomendação específica}
**Reescrita:** {exemplo antes → depois}

---

### Crimes de Copy Detectados
- {crime}: {onde ocorre}

### Lista Priorizada de Correções
| Prioridade | Correção | Impacto | Esforço | Agente |
|----------|-----|--------|--------|-------|
| 1 | {correção} | Alto | {Baixo/Méd/Alto} | {agente} |

### Vitórias Rápidas (Menos de 5 Minutos)
1. {correção rápida}
2. {correção rápida}
3. {correção rápida}

### O Que Manter
{Reconheça o que a copy faz bem}
```

---

## Condições de Veto

- NUNCA critique sem pontuar todos os 8 critérios
- NUNCA forneça pontuações sem justificativa e referências específicas ao texto
- NUNCA entregue apenas críticas — sempre reconheça os pontos fortes
- NUNCA sugira reescritas que alterem a oferta ou promessa fundamental
- NUNCA ignore dados de desempenho, se fornecidos — métricas se sobrepõem a opiniões

---

## Critérios de Conclusão

- [ ] Todos os 8 critérios pontuados com justificativa
- [ ] Pontuação composta calculada e veredito atribuído
- [ ] Falha fatal identificada
- [ ] Crítica detalhada para todos os critérios com pontuação abaixo de 7
- [ ] Top 3 exemplos de reescrita fornecidos
- [ ] Lista priorizada de correções com roteamento para especialistas
- [ ] Seção de vitórias rápidas incluída
- [ ] Pontos fortes reconhecidos
