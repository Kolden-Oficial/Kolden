---
task: analyzeCopy()
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
  - campo: copy_analysis
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Scorecard de 8 dimensões concluído com anotações"
  - "[ ] Correção prioritária nº 1 identificada com sugestões de reescrita"
  - "[ ] Recomendações de roteamento para especialistas incluídas"
---

# Tarefa: Analisar Copy

**ID da Tarefa:** COPY-006
**Versão:** 1.0.0
**Comando:** `*analyze-copy`
**Agente:** Copy Chief (copy-chief)
**Objetivo:** Analisar uma copy existente para identificar fraquezas, oportunidades perdidas e prioridades de melhoria.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| copy_text | string | Prompt do usuário | Sim | A copy a ser analisada (colada ou referenciada) |
| copy_type | enum | Prompt do usuário | Sim | headline, sales-letter, email, vsl, ad, landing-page, funnel |
| goal | string | Prompt do usuário | Sim | O que a copy está tentando alcançar |
| audience | string | Prompt do usuário | Não | Descrição do público-alvo |
| metrics | object | Prompt do usuário | Não | Dados de desempenho atuais (CTR, taxa de conversão, etc.) |
| context | string | Prompt do usuário | Não | Onde e como a copy é usada |

---

## Pré-condições

- Texto da copy fornecido na íntegra (uma copy parcial gera uma análise parcial)
- Tipo da copy identificado para que os critérios corretos de avaliação sejam aplicados

---

## Fases de Execução

### Fase 1: Leitura de Primeira Passagem
1. Leia a copy como um prospecto faria — anote onde a atenção cai
2. Identifique a grande promessa (existe alguma?)
3. Identifique o CTA principal (está claro?)
4. Anote a primeira reação emocional: entediado, confuso, intrigado, cético, convencido
5. Cronometre por quanto tempo a copy mantém a atenção antes de a mente divagar

### Fase 2: Análise Estrutural
1. Avalie o título/gancho:
   - Ele faz o leitor parar?
   - Ele seleciona o público certo?
   - Ele promete um benefício ou desperta curiosidade?
2. Avalie a abertura (primeiras 100-300 palavras):
   - Ela conquista o próximo parágrafo?
   - O nível de consciência está calibrado corretamente?
3. Avalie o corpo:
   - Existe um fluxo lógico e emocional claro?
   - Os benefícios são concretos ou vagos?
   - A prova está presente e posicionada estrategicamente?
4. Avalie o fechamento:
   - A oferta está clara?
   - O CTA é específico e acionável?
   - Existe urgência sem ser falsa?
5. Avalie o "escorregador" geral — você consegue parar de ler em qualquer ponto?

### Fase 3: Pontuação e Recomendações
1. Pontue em 8 dimensões (1-10 cada):
   - Poder do Título
   - Engajamento da Abertura
   - Conexão Emocional
   - Prova e Credibilidade
   - Clareza do Benefício
   - Força da Oferta
   - Eficácia do CTA
   - Fluxo e Legibilidade
2. Calcule a pontuação geral (média)
3. Identifique a fraqueza nº 1 que renderia a maior melhoria
4. Forneça 3 reescritas específicas e acionáveis para as seções mais fracas
5. Recomende qual especialista do Copy Squad poderia aprimorar cada área fraca

---

## Formato de Saída

```markdown
## Análise de Copy

**Tipo:** {copy_type}
**Objetivo:** {goal}
**Pontuação Geral:** {X}/10
**Veredito:** {Fraca / Precisa de Trabalho / Sólida / Forte / Elite}

---

### Scorecard

| Dimensão | Pontuação | Anotações |
|-----------|-------|-------|
| Poder do Título | X/10 | {anotação breve} |
| Engajamento da Abertura | X/10 | {anotação breve} |
| Conexão Emocional | X/10 | {anotação breve} |
| Prova e Credibilidade | X/10 | {anotação breve} |
| Clareza do Benefício | X/10 | {anotação breve} |
| Força da Oferta | X/10 | {anotação breve} |
| Eficácia do CTA | X/10 | {anotação breve} |
| Fluxo e Legibilidade | X/10 | {anotação breve} |

---

### Correção Prioritária nº 1
{A única mudança que teria o maior impacto}

### Top 3 Sugestões de Reescrita
1. **{Seção}:** {Texto atual} → {Reescrita sugerida} — {Por que isto é melhor}
2. ...
3. ...

### Recomendações de Especialistas
| Área Fraca | Agente Recomendado | Por Quê |
|-----------|-------------------|-----|

### O Que Está Funcionando Bem
{Reconheça os pontos fortes — o que preservar}
```

---

## Condições de Veto

- NUNCA analise sem ler a copy completa
- NUNCA dê uma pontuação sem justificativa específica
- NUNCA forneça apenas críticas — sempre reconheça o que funciona
- NUNCA recomende reescritas que alterem a oferta ou promessa central sem sinalizar isso
- NUNCA ignore as métricas de desempenho, se fornecidas — os dados se sobrepõem à opinião

---

## Critérios de Conclusão

- [ ] Copy completa lida e impressão de primeira passagem documentada
- [ ] Análise estrutural concluída (título, abertura, corpo, fechamento)
- [ ] Scorecard de 8 dimensões concluído com anotações
- [ ] Correção prioritária nº 1 identificada
- [ ] 3 sugestões específicas de reescrita fornecidas
- [ ] Recomendações de roteamento para especialistas incluídas
- [ ] Pontos fortes reconhecidos
