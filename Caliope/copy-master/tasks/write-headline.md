---
task: writeHeadline()
responsavel: "@eugene-schwartz"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: awareness_level
    tipo: enum
    origem: User Input
    obrigatorio: true

Saida:
  - campo: headline_package
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Nível de consciência confirmado ou diagnosticado"
  - "[ ] 10 variações de headline geradas usando 3+ fórmulas"
  - "[ ] Top 5 ranqueadas com pontuação em 4 dimensões"
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
---

# Task: Escrever Headline

**Task ID:** COPY-M-001
**Version:** 2.0.0
**Command:** `*write-headline`
**Agent:** Eugene Schwartz (eugene-schwartz) ou Gary Bencivenga (gary-bencivenga)
**Purpose:** Criar headlines persuasivas calibradas ao nível de consciência do prospecto com psicologia da persuasão profunda.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| product | string | Prompt do usuário | Sim | Nome do produto ou serviço com breve descrição |
| audience | string | Prompt do usuário | Sim | Descrição da audiência-alvo |
| awareness_level | enum | Prompt do usuário ou inferido | Sim | unaware, problem-aware, solution-aware, product-aware, most-aware |
| medium | string | Prompt do usuário | Não | Onde a headline aparece (anúncio, e-mail, página de vendas, VSL) |
| tone | string | Prompt do usuário | Não | Tom desejado (urgente, curioso, autoritário, empático) |
| swipe_reference | string | Prompt do usuário | Não | Headline ou estilo de referência a emular |

---

## Pré-condições

- Produto ou serviço claramente definido
- Audiência-alvo identificada com ao menos dados demográficos ou psicográficos básicos
- Nível de consciência determinado (se não fornecido, o agente deve diagnosticar antes de escrever)

---

## Referência de Campeões

Estude estas headlines campeãs do mundo real antes de escrever:

1. **"They Laughed When I Sat Down at the Piano — But When I Started to Play!"** (John Caples, U.S. School of Music) — Curiosidade movida por história para audiências unaware
2. **"Do You Make These Mistakes in English?"** (Sherwin Cody) — Pergunta + falha implícita para audiências problem-aware
3. **"How to Win Friends and Influence People"** (Dale Carnegie) — How-to movido por benefício para audiências solution-aware
4. **"The Lazy Man's Way to Riches"** (Joe Karbo) — Promessa contraintuitiva combinando facilidade + resultado
5. **"Amazing Secret Discovered by 37-Year-Old Mom Exposed By Top Doctors"** (Agora Financial) — Empilhamento de especificidade + autoridade + curiosidade

---

## Fases de Execução

### Fase 1: Diagnóstico de Consciência
1. Confirme o nível de consciência do prospecto usando a escala de 5 níveis de Schwartz
2. Identifique a emoção dominante que move o prospecto (medo, desejo, curiosidade, frustração)
3. Mapeie o nível de consciência para a abordagem da headline:
   - Unaware: Lidere com emoção ou história, nunca mencione o produto
   - Problem-aware: Agite o problema, insinue a solução
   - Solution-aware: Diferencie o mecanismo ou a abordagem
   - Product-aware: Empilhe prova, supere objeções
   - Most-aware: Lidere com a oferta, urgência ou negócio

### Fase 2: Geração de Headlines
1. Gere 10 variações de headline usando ângulos distintos
2. Aplique pelo menos 3 fórmulas de headline diferentes por lote:
   - Headlines de how-to
   - Headlines de pergunta
   - Headlines de comando
   - Headlines de motivo (reason-why)
   - Headlines de depoimento
   - Headlines de notícia/anúncio
   - Headlines de lacuna de curiosidade (curiosity-gap)
   - Headlines de número específico
3. Garanta que cada headline passe no teste "eu pararia de rolar?"
4. Varie o comprimento: inclua curtas (menos de 8 palavras), médias (8-15) e longas (15+)

### Fase 3: Camada Psicológica
1. Marque cada headline com o principal princípio de Cialdini que ela ativa:
   - Reciprocidade, Compromisso/Coerência, Prova Social, Autoridade, Afinidade, Escassez, Unidade
2. Confronte cada headline com a One Sentence Persuasion de Blair Warren:
   - Ela encoraja os sonhos deles?
   - Ela justifica os fracassos deles?
   - Ela acalma os medos deles?
   - Ela confirma as suspeitas deles?
   - Ela os ajuda a jogar pedras nos seus inimigos?
3. Garanta que pelo menos 3 princípios de Cialdini diferentes estejam representados ao longo das 10 headlines
4. Marque qual alavanca de Warren cada headline aciona

### Fase 4: Refinamento e Ranqueamento
1. Pontue cada headline em 4 dimensões (1-5 cada):
   - Especificidade: Ela promete um resultado concreto?
   - Curiosidade: Ela cria um loop aberto?
   - Relevância: Ela corresponde ao nível de consciência?
   - Credibilidade: A afirmação é crível?
2. Ranqueie o top 5 pela pontuação total
3. Forneça recomendações de teste A/B para as 2 primeiras
4. Sugira combinações de sub-headline para as 3 primeiras

---

## Formato de Saída

```markdown
## Pacote de Headlines

**Produto:** {product}
**Audiência:** {audience}
**Nível de Consciência:** {nível}

### Top 5 Headlines (Ranqueadas)

| Rank | Headline | Fórmula | Especificidade | Curiosidade | Relevância | Credibilidade | Total | Princípio de Cialdini | Alavanca de Warren |
|------|----------|---------|----------------|-------------|------------|---------------|-------|----------------------|--------------------|
| 1 | {headline} | {fórmula} | X | X | X | X | XX | {princípio} | {alavanca} |

### Recomendação de Teste A/B
**Controle:** {headline 1}
**Variante:** {headline 2}
**Justificativa:** {por que estas duas}

### Combinações de Sub-headline
1. {headline} + {sub-headline}
2. {headline} + {sub-headline}
3. {headline} + {sub-headline}

### Banco Completo de 10 Headlines
1. {headline} — {fórmula usada} — {princípio de Cialdini}
...
```

---

## Condições de Veto

- NUNCA escreva uma headline sem antes confirmar o nível de consciência
- NUNCA use clickbait que o corpo do texto não consiga cumprir
- NUNCA ignore o meio — uma headline de anúncio no Facebook difere de uma headline de página de vendas
- NUNCA entregue menos de 10 variações
- NUNCA use o nome do produto em headlines para audiências unaware

---

## Critérios de Conclusão

- [ ] Nível de consciência confirmado ou diagnosticado
- [ ] 10 variações de headline geradas usando 3+ fórmulas
- [ ] Cada headline pontuada em 4 dimensões
- [ ] Top 5 ranqueadas com justificativa
- [ ] Par de teste A/B recomendado
- [ ] Combinações de sub-headline fornecidas para as 3 primeiras
- [ ] Camada Psicológica aplicada — princípios de Cialdini marcados por headline
- [ ] Alavancas de Blair Warren identificadas por headline
- [ ] Saída formatada conforme o template
