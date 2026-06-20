---
task: analyzeCopy()
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
  - campo: copy_analysis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Scorecard de 8 dimensões concluído com anotações"
  - "[ ] Correção prioritária nº 1 identificada com sugestões de reescrita"
  - "[ ] Recomendações de roteamento para especialista incluídas"
  - "[ ] Auditoria de psicologia da persuasão concluída"
---

# Tarefa: Analisar Copy

**ID da Tarefa:** COPY-M-006
**Versão:** 2.0.0
**Comando:** `*analyze-copy`
**Agente:** Copy Master Chief (copy-master-chief)
**Propósito:** Analisar um copy existente para identificar pontos fracos, oportunidades perdidas e prioridades de melhoria — incluindo lacunas de psicologia da persuasão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| copy_text | string | Prompt do usuário | Sim | O copy a ser analisado (colado ou referenciado) |
| copy_type | enum | Prompt do usuário | Sim | headline, sales-letter, email, vsl, ad, landing-page, funnel |
| goal | string | Prompt do usuário | Sim | O que o copy está tentando alcançar |
| audience | string | Prompt do usuário | Não | Descrição do público-alvo |
| metrics | object | Prompt do usuário | Não | Dados de desempenho atuais (CTR, taxa de conversão, etc.) |
| context | string | Prompt do usuário | Não | Onde e como o copy é usado |

---

## Pré-condições

- Texto do copy fornecido por completo (copy parcial gera análise parcial)
- Tipo de copy identificado para que os critérios de avaliação corretos sejam aplicados

---

## Referência de Campeões

Estude estes frameworks analíticos antes de analisar:

1. **Diagnóstico de Nível de Consciência de Eugene Schwartz** — O copy está calibrado para o nível de consciência correto do público?
2. **Teste da "Big Idea" de David Ogilvy** — O copy tem uma big idea capaz de rodar por 20 anos?
3. **Teste "Pilha-A vs Pilha-B" de Gary Halbert** — Esta peça iria para a pilha-A (correspondência pessoal que você abre) ou pilha-B (lixo)?
4. **Framework de Auditoria de CRO de Joanna Wiebe** — Análise sistemática de otimização de conversão página a página
5. **Métricas de "Publicidade Científica" de Claude Hopkins** — Cada elemento é mensurável e testável?

---

## Fases de Execução

### Fase 1: Leitura de Primeira Passagem
1. Leia o copy como um prospecto leria — anote onde a atenção cai
2. Identifique a grande promessa (existe uma?)
3. Identifique o CTA primário (está claro?)
4. Anote a primeira reação emocional: entediado, confuso, intrigado, cético, convencido
5. Cronometre por quanto tempo o copy sustenta a atenção antes da mente divagar

### Fase 2: Análise Estrutural
1. Avalie a headline/hook:
   - Ela faz o leitor parar?
   - Ela seleciona o público certo?
   - Ela promete um benefício ou desperta curiosidade?
2. Avalie o lead (primeiras 100-300 palavras):
   - Ele conquista o próximo parágrafo?
   - O nível de consciência está calibrado corretamente?
3. Avalie o corpo:
   - Há um fluxo lógico e emocional claro?
   - Os benefícios são concretos ou vagos?
   - A prova está presente e estrategicamente posicionada?
4. Avalie o fechamento:
   - A oferta está clara?
   - O CTA é específico e acionável?
   - Há urgência sem ser falsa?
5. Avalie o "tobogã escorregadio" geral — você consegue parar de ler em qualquer ponto?

### Fase 3: Auditoria de Psicologia da Persuasão
1. Identifique quais princípios de Cialdini estão presentes e quais estão ausentes:
   - Reciprocidade: É dado valor gratuito antes do pedido?
   - Compromisso/Consistência: Pequenos acordos são construídos antes do grande pedido?
   - Prova Social: Há depoimentos, números, ou "outros já fizeram isso"?
   - Autoridade: Credenciais, menções na mídia ou endossos de especialistas são usados?
   - Afinidade: O copy é relacionável e pessoal?
   - Escassez: Há urgência ou limitação legítima?
   - Unidade: Há linguagem de identidade compartilhada?
2. Audite as 5 alavancas de Blair Warren:
   - Ele encoraja os sonhos deles?
   - Ele justifica os fracassos deles?
   - Ele alivia os medos deles?
   - Ele confirma as suspeitas deles?
   - Ele os ajuda a atirar pedras nos inimigos deles?
3. Pontue a densidade de persuasão: quantos princípios estão ativos por seção?
4. Identifique a lacuna de persuasão nº 1 — qual princípio ausente teria o maior impacto?

### Fase 4: Pontuação e Recomendações
1. Pontue em 8 dimensões (1-10 cada):
   - Poder da Headline
   - Engajamento do Lead
   - Conexão Emocional
   - Prova e Credibilidade
   - Clareza do Benefício
   - Força da Oferta
   - Eficácia do CTA
   - Fluxo e Legibilidade
2. Calcule a pontuação geral (média)
3. Identifique o ponto fraco nº 1 que geraria a maior melhoria
4. Forneça 3 reescritas específicas e acionáveis para as seções mais fracas
5. Recomende qual especialista do Copy Master poderia melhorar cada área fraca

---

## Formato de Saída

```markdown
## Análise de Copy

**Tipo:** {copy_type}
**Objetivo:** {goal}
**Pontuação Geral:** {X}/10
**Veredito:** {Fraco / Precisa de Trabalho / Sólido / Forte / Elite}

---

### Scorecard

| Dimensão | Pontuação | Anotações |
|-----------|-------|-------|
| Poder da Headline | X/10 | {nota breve} |
| Engajamento do Lead | X/10 | {nota breve} |
| Conexão Emocional | X/10 | {nota breve} |
| Prova e Credibilidade | X/10 | {nota breve} |
| Clareza do Benefício | X/10 | {nota breve} |
| Força da Oferta | X/10 | {nota breve} |
| Eficácia do CTA | X/10 | {nota breve} |
| Fluxo e Legibilidade | X/10 | {nota breve} |

### Auditoria de Psicologia da Persuasão

| Princípio de Cialdini | Presente? | Força (1-5) | Localização |
|-------------------|----------|----------------|----------|
| Reciprocidade | S/N | X | {onde} |
| Compromisso | S/N | X | {onde} |
| Prova Social | S/N | X | {onde} |
| Autoridade | S/N | X | {onde} |
| Afinidade | S/N | X | {onde} |
| Escassez | S/N | X | {onde} |
| Unidade | S/N | X | {onde} |

| Alavanca de Warren | Presente? | Localização |
|-------------|----------|----------|
| Encorajar sonhos | S/N | {onde} |
| Justificar fracassos | S/N | {onde} |
| Aliviar medos | S/N | {onde} |
| Confirmar suspeitas | S/N | {onde} |
| Atirar pedras | S/N | {onde} |

**Lacuna de Persuasão nº 1:** {o princípio ausente que teria o maior impacto}

---

### Correção Prioritária nº 1
{A única mudança que teria o maior impacto}

### Top 3 Sugestões de Reescrita
1. **{Seção}:** {Texto atual} -> {Reescrita sugerida} — {Por que isso é melhor}
2. ...
3. ...

### Recomendações de Especialistas
| Área Fraca | Agente Recomendado | Por quê |
|-----------|-------------------|-----|

### O Que Está Funcionando Bem
{Reconheça os pontos fortes — o que preservar}
```

---

## Condições de Veto

- NUNCA analise sem ler o copy completo
- NUNCA dê uma pontuação sem justificativa específica
- NUNCA forneça apenas crítica — sempre reconheça o que funciona
- NUNCA recomende reescritas que mudem a oferta ou promessa central sem sinalizar isso
- NUNCA ignore métricas de desempenho se fornecidas — dados se sobrepõem à opinião

---

## Critérios de Conclusão

- [ ] Copy completo lido e impressão de primeira passagem documentada
- [ ] Análise estrutural concluída (headline, lead, corpo, fechamento)
- [ ] Scorecard de 8 dimensões concluído com anotações
- [ ] Auditoria de Psicologia da Persuasão concluída (todos os 7 Cialdini + 5 Warren)
- [ ] Lacuna de persuasão nº 1 identificada
- [ ] Correção prioritária nº 1 identificada
- [ ] 3 sugestões específicas de reescrita fornecidas
- [ ] Recomendações de roteamento para especialista incluídas
- [ ] Pontos fortes reconhecidos
