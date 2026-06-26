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
  - "[ ] 10 variações de título geradas usando 3+ fórmulas"
  - "[ ] Top 5 classificados com pontuação em 4 dimensões"
---

# Tarefa: Escrever Título

**ID da Tarefa:** COPY-001
**Versão:** 1.0.0
**Comando:** `*write-headline`
**Agente:** Eugene Schwartz (eugene-schwartz) ou Gary Bencivenga (gary-bencivenga)
**Objetivo:** Criar títulos persuasivos calibrados para o nível de consciência do prospecto.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Nome do produto ou serviço com breve descrição |
| audience | string | Prompt do usuário | Sim | Descrição do público-alvo |
| awareness_level | enum | Prompt do usuário ou inferido | Sim | unaware, problem-aware, solution-aware, product-aware, most-aware |
| medium | string | Prompt do usuário | Não | Onde o título aparece (anúncio, email, página de vendas, VSL) |
| tone | string | Prompt do usuário | Não | Tom desejado (urgente, curioso, autoritativo, empático) |
| swipe_reference | string | Prompt do usuário | Não | Título ou estilo de referência a ser emulado |

---

## Pré-condições

- Produto ou serviço claramente definido
- Público-alvo identificado com pelo menos dados demográficos ou psicográficos básicos
- Nível de consciência determinado (se não fornecido, o agente deve diagnosticar antes de escrever)

---

## Fases de Execução

### Fase 1: Diagnóstico de Consciência
1. Confirme o nível de consciência do prospecto usando a escala de 5 níveis de Schwartz
2. Identifique a emoção dominante que move o prospecto (medo, desejo, curiosidade, frustração)
3. Mapeie o nível de consciência para a abordagem do título:
   - Inconsciente (Unaware): Comece com emoção ou história, nunca mencione o produto
   - Consciente do problema (Problem-aware): Agite o problema, sugira a solução
   - Consciente da solução (Solution-aware): Diferencie o mecanismo ou a abordagem
   - Consciente do produto (Product-aware): Empilhe provas, supere objeções
   - Totalmente consciente (Most-aware): Comece com a oferta, urgência ou negócio

### Fase 2: Geração de Títulos
1. Gere 10 variações de título usando ângulos distintos
2. Aplique pelo menos 3 fórmulas de título diferentes por lote:
   - Títulos de como-fazer (how-to)
   - Títulos em forma de pergunta
   - Títulos em forma de comando
   - Títulos de razão-do-porquê (reason-why)
   - Títulos de depoimento
   - Títulos de notícia/anúncio
   - Títulos de lacuna de curiosidade (curiosity-gap)
   - Títulos de número específico
   - **Templates granulares (preencher-as-lacunas):** ver o banco em `data/formulas-de-headline.md`
     (foco em resultado / problema / público / diferenciação / prova) — cruze com a emoção dominante.
3. Garanta que cada título passe no teste "eu pararia de rolar a tela?"
4. Varie o comprimento: inclua curtos (menos de 8 palavras), médios (8-15) e longos (15+)

### Fase 3: Refinamento e Classificação
1. Pontue cada título em 4 dimensões (1-5 cada):
   - Especificidade: Promete um resultado concreto?
   - Curiosidade: Cria um loop aberto?
   - Relevância: Corresponde ao nível de consciência?
   - Credibilidade: A afirmação é crível?
2. Classifique os 5 melhores pela pontuação total
3. Forneça recomendações de teste A/B para os 2 melhores
4. Sugira pares de subtítulo (sub-headline) para os 3 melhores

---

## Formato de Saída

```markdown
## Pacote de Títulos

**Produto:** {product}
**Audiência:** {audience}
**Nível de Consciência:** {nível}

### Top 5 Títulos (Classificados)

| Posição | Título | Fórmula | Especificidade | Curiosidade | Relevância | Credibilidade | Total |
|------|----------|---------|-------------|-----------|-----------|---------------|-------|
| 1 | {título} | {fórmula} | X | X | X | X | XX |

### Recomendação de Teste A/B
**Controle:** {título 1}
**Variante:** {título 2}
**Justificativa:** {por que estes dois}

### Pares de Subtítulo
1. {título} + {subtítulo}
2. {título} + {subtítulo}
3. {título} + {subtítulo}

### Banco Completo de 10 Títulos
1. {título} — {fórmula usada}
...
```

---

## Condições de Veto

- NUNCA escreva um título sem antes confirmar o nível de consciência
- NUNCA use clickbait que o corpo da copy não consiga cumprir
- NUNCA ignore o meio — o título de um anúncio do Facebook difere do título de uma página de vendas
- NUNCA entregue menos de 10 variações
- NUNCA use o nome do produto nos títulos para audiências inconscientes

---

## Critérios de Conclusão

- [ ] Nível de consciência confirmado ou diagnosticado
- [ ] 10 variações de título geradas usando 3+ fórmulas
- [ ] Cada título pontuado em 4 dimensões
- [ ] Top 5 classificados com justificativa
- [ ] Par de teste A/B recomendado
- [ ] Pares de subtítulo fornecidos para os 3 melhores
- [ ] Saída formatada conforme o template
