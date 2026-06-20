---
task: critiqueCopy()
responsavel: "@copy-master-chief"
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
  - "[ ] Lista priorizada de correções com roteamento para especialista"
  - "[ ] Auditoria de psicologia da persuasão concluída"
---

# Tarefa: Criticar Copy

**ID da Tarefa:** COPY-M-011
**Versão:** 2.0.0
**Comando:** `*critique-copy`
**Agente:** Copy Master Chief (copy-master-chief)
**Propósito:** Entregar uma crítica estruturada de copy em 8 pontos, com avaliação pontuada, correções priorizadas e auditoria de psicologia da persuasão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| copy_text | string | Prompt do usuário | Sim | Copy completo a ser criticado |
| copy_type | enum | Prompt do usuário | Sim | headline, sales-letter, email, vsl-script, ad, landing-page, funnel, bullets |
| original_brief | string | Prompt do usuário | Não | Briefing original ou objetivo para o qual o copy foi escrito |
| target_audience | string | Prompt do usuário | Não | Público pretendido |
| performance_data | object | Prompt do usuário | Não | Métricas existentes se o copy estiver no ar |

---

## Pré-condições

- Texto completo do copy fornecido (não fragmentos)
- Tipo de copy identificado para os critérios de pontuação corretos

---

## Referência de Campeões

Use estes frameworks de crítica como padrões de referência:

1. **Teste "Leia em Voz Alta" de Gary Halbert** — Se não soa como uma pessoa falando com outra, reescreva
2. **Auditoria de Nível de Consciência de Eugene Schwartz** — O copy está abordando o estágio de consciência correto?
3. **"Isso Me Faria Comprar?" de David Ogilvy** — O teste honesto definitivo da eficácia do copy
4. **Auditoria do "Reason Why" de Claude Hopkins** — Cada afirmação tem um motivo para acreditar?
5. **Checklist de "Crimes de Copy" de Joanna Wiebe** — Detecção sistemática de erros que matam a conversão

---

## Fases de Execução

### Fase 1: Avaliação Objetiva
1. Leia o copy uma vez sem julgamento — anote as reações instintivas
2. Leia novamente com o framework de pontuação de 8 pontos ativo
3. Para cada um dos 8 critérios, atribua uma pontuação (1-10):
   - **Atenção (Headline/Hook):** Ela faz a pessoa certa parar?
   - **Interesse (Lead/Abertura):** Ela conquista as próximas 100 palavras?
   - **Desejo (Benefícios/Prova):** Ela faz o leitor desejar o resultado?
   - **Ação (CTA/Fechamento):** Ela impele à ação imediata?
   - **Especificidade:** As afirmações são concretas, com números, nomes e detalhes?
   - **Prova:** Cada afirmação é embasada por evidência?
   - **Voz:** Há uma personalidade consistente e cativante?
   - **Fluxo:** Você consegue parar de ler em qualquer ponto, ou ele te puxa adiante?
4. Calcule a pontuação composta e atribua o veredito:
   - 80-100: Elite — apenas polimento menor
   - 60-79: Forte — melhorias direcionadas necessárias
   - 40-59: Precisa de Trabalho — reescritas significativas necessárias
   - Abaixo de 40: Fraco — considere recomeçar com uma nova abordagem

### Fase 2: Auditoria de Psicologia da Persuasão
1. Audite os 7 princípios de Cialdini:
   - Para cada princípio: Presente? Onde? Quão forte (1-5)?
   - Identifique quais princípios estão totalmente ausentes
   - Sinalize princípios que estão presentes mas mal executados
2. Audite as 5 alavancas de Blair Warren:
   - O copy encoraja sonhos, justifica fracassos, alivia medos, confirma suspeitas, atira pedras?
   - Quais alavancas estão ativadas? Quais estão ausentes?
3. Pontue a densidade de persuasão: Total de princípios ativos / Total possível (12)
4. Identifique a lacuna de persuasão nº 1 com maior potencial de impacto

### Fase 3: Crítica Profunda
1. Para cada critério com pontuação abaixo de 7, forneça:
   - O que especificamente está errado (cite o texto exato)
   - Por que importa (o que custa em conversões ou engajamento)
   - Como corrigir (sugestão específica de reescrita)
2. Identifique a "falha fatal" — o único maior problema matando o desempenho
3. Avalie a calibração do nível de consciência — o copy está calibrado no nível certo?
4. Verifique "crimes de copy":
   - Falar sobre si mesmo antes de falar sobre o leitor
   - Características sem benefícios
   - Afirmações sem prova
   - Linguagem vaga onde poderiam ser usados detalhes específicos
   - Voz passiva no CTA
   - Múltiplos CTAs competindo por atenção

### Fase 4: Recomendações Acionáveis
1. Forneça uma lista priorizada de correções (maior impacto primeiro)
2. Para as 3 principais correções, escreva exemplos reais de reescrita
3. Recomende qual agente especialista lidaria melhor com cada correção
4. Se houver dados de desempenho, correlacione as pontuações fracas com quedas de métricas
5. Forneça uma seção de "vitórias rápidas" — mudanças que levam menos de 5 minutos

---

## Formato de Saída

```markdown
## Relatório de Crítica de Copy

**Tipo de Copy:** {tipo}
**Pontuação Composta:** {X}/80 ({percentual}%)
**Veredito:** {Elite / Forte / Precisa de Trabalho / Fraco}
**Falha Fatal:** {descrição em uma linha}

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

### Auditoria de Psicologia da Persuasão

| Princípio de Cialdini | Presente? | Força (1-5) | Localização | Precisa de Correção? |
|-------------------|----------|----------------|----------|-------------|
| Reciprocidade | S/N | X | {onde} | {S/N} |
| Compromisso | S/N | X | {onde} | {S/N} |
| Prova Social | S/N | X | {onde} | {S/N} |
| Autoridade | S/N | X | {onde} | {S/N} |
| Afinidade | S/N | X | {onde} | {S/N} |
| Escassez | S/N | X | {onde} | {S/N} |
| Unidade | S/N | X | {onde} | {S/N} |

| Alavanca de Warren | Presente? | Localização |
|-------------|----------|----------|
| Encorajar sonhos | S/N | {onde} |
| Justificar fracassos | S/N | {onde} |
| Aliviar medos | S/N | {onde} |
| Confirmar suspeitas | S/N | {onde} |
| Atirar pedras | S/N | {onde} |

**Densidade de Persuasão:** {X}/12 princípios ativos ({percentual}%)
**Lacuna de Persuasão nº 1:** {princípio ausente + onde adicioná-lo}

---

### Crítica Detalhada

#### {Nome do Critério} — {Pontuação}/10
**Problema:** {o que está errado — cite o texto exato}
**Impacto:** {o que isso custa}
**Correção:** {recomendação específica}
**Reescrita:** {exemplo antes -> depois}

---

### Crimes de Copy Detectados
- {crime}: {onde ocorre}

### Lista Priorizada de Correções
| Prioridade | Correção | Impacto | Esforço | Agente |
|----------|-----|--------|--------|-------|
| 1 | {correção} | Alto | {Baixo/Médio/Alto} | {agente} |

### Vitórias Rápidas (Menos de 5 Minutos)
1. {correção rápida}
2. {correção rápida}
3. {correção rápida}

### O Que Manter
{Reconheça o que o copy faz bem}
```

---

## Condições de Veto

- NUNCA critique sem pontuar todos os 8 critérios
- NUNCA forneça pontuações sem justificativa e referências de texto específicas
- NUNCA entregue apenas crítica — sempre reconheça os pontos fortes
- NUNCA sugira reescritas que mudem a oferta ou promessa fundamental
- NUNCA ignore dados de desempenho se fornecidos — métricas superam opiniões

---

## Critérios de Conclusão

- [ ] Todos os 8 critérios pontuados com justificativa
- [ ] Pontuação composta calculada e veredito atribuído
- [ ] Falha fatal identificada
- [ ] Auditoria de Psicologia da Persuasão concluída (7 Cialdini + 5 Warren)
- [ ] Densidade de persuasão pontuada
- [ ] Lacuna de persuasão nº 1 identificada com recomendação de correção
- [ ] Crítica detalhada para todos os critérios com pontuação abaixo de 7
- [ ] Top 3 exemplos de reescrita fornecidos
- [ ] Lista priorizada de correções com roteamento para especialista
- [ ] Seção de vitórias rápidas incluída
- [ ] Pontos fortes reconhecidos
