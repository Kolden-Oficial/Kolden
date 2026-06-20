---
task: writeBullets()
responsavel: "@gary-bencivenga"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: content_source
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: bullet_package
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Conteúdo de origem minerado em busca de todo o material para bullets"
  - "[ ] Número solicitado de bullets escrito usando fórmulas variadas"
  - "[ ] 3-5 bullets matadores identificados para uso múltiplo"
---

# Tarefa: Escrever Bullet Points

**ID da Tarefa:** COPY-010
**Versão:** 1.0.0
**Comando:** `*write-bullets`
**Agente:** Gary Bencivenga (gary-bencivenga)
**Objetivo:** Escrever bullet points movidos por curiosidade (fascinações) que vendem sem revelar a resposta.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço com conteúdo ou características para transformar em bullets |
| content_source | string | Prompt do usuário | Sim | Matéria-prima a ser transformada em bullets (características, capítulos, lições, resultados) |
| context | enum | Prompt do usuário | Sim | sales-page, email, VSL, ad, order-form |
| audience | string | Prompt do usuário | Não | Leitor-alvo para calibrar a linguagem |
| num_bullets | number | Prompt do usuário | Não | Padrão: 20 |
| style | enum | Prompt do usuário | Não | fascination, benefit, proof, hybrid — padrão: fascination |

---

## Pré-condições

- Conteúdo de origem disponível (lista de características, sumário, esboços de lições ou dados de resultados)
- Contexto de posicionamento definido (bullets para uma página de vendas diferem dos bullets de email)

---

## Fases de Execução

### Fase 1: Mineração da Origem
1. Extraia toda afirmação, característica, benefício ou fato único do conteúdo de origem
2. Identifique quais fatos são mais surpreendentes, contraintuitivos ou valiosos
3. Classifique pelo fator "alguém pagaria dinheiro só para saber disto?"
4. Agrupe por tema para organizar as seções de bullets
5. Mire em pelo menos 2x a quantidade de bullets solicitada como matéria-prima

### Fase 2: Escrita dos Bullets
1. Escreva os bullets usando fórmulas de fascinação comprovadas:
   - **O Segredo:** "O segredo bem guardado que {resultado}..."
   - **O Contraintuitivo:** "Por que {crença comum} na verdade é {oposto}..."
   - **O Número Específico:** "{Número exato} maneiras de {resultado} sem {sacrifício}..."
   - **A Pergunta:** "Você está cometendo este erro de ${custo} com seu {coisa}?"
   - **O Proibido:** "O que as {autoridades} não querem que você saiba sobre {tópico}..."
   - **A Prova:** "Como {pessoa} alcançou {resultado específico} em {prazo}..."
   - **O Se-Então:** "Se você {situação}, aqui está {solução}..."
   - **O Aviso:** "ATENÇÃO: Nunca {ação} até você {precaução}..."
2. Aplique a regra de especificidade de Bencivenga: bullets vagos são bullets mortos
3. Cada bullet deve criar um loop aberto (open loop) que o leitor precisa fechar
4. Varie a estrutura das frases — nunca use a mesma fórmula em sequência
5. Coloque em negrito ou enfatize a frase mais importante nos bullets mais longos

### Fase 3: Seleção e Ordenação
1. Pontue cada bullet pela intensidade de curiosidade (1-5)
2. Selecione os melhores bullets (conforme a quantidade solicitada)
3. Ordene estrategicamente:
   - Comece forte (os 2 melhores bullets primeiro)
   - Alterne entre bullets emocionais e lógicos
   - Termine forte (guarde um bullet poderoso para o final)
4. Agrupe em seções temáticas se for para uma página de vendas longa
5. Marque 3-5 "bullets matadores" que poderiam ser títulos independentes

---

## Formato de Saída

```markdown
## Pacote de Bullets: {Nome do Produto}

**Contexto:** {onde os bullets vão aparecer}
**Estilo:** {fascination / benefit / proof / hybrid}
**Total de Bullets:** {quantidade}

---

### Melhores Bullets (Títulos Matadores)
{3-5 bullets mais fortes marcados com uma estrela}

### Seção de Bullets 1: {Tema}
- {bullet}
- {bullet}
- {bullet}

### Seção de Bullets 2: {Tema}
- {bullet}
- {bullet}
- {bullet}

### Seção de Bullets 3-N: ...

---

### Notas de Uso
- **Melhor para conversão em título:** {bullet nº}
- **Melhor para linha de assunto de email:** {bullet nº}
- **Melhor para gancho de anúncio:** {bullet nº}
- **Recomendação de ordenação:** {orientação de posicionamento}
```

---

## Condições de Veto

- NUNCA escreva um bullet que revele a resposta — a lacuna de curiosidade (curiosity gap) é o mecanismo de venda
- NUNCA use linguagem vaga ("resultados incríveis", "segredos poderosos") — a especificidade é obrigatória
- NUNCA repita a mesma fórmula mais de duas vezes em um conjunto
- NUNCA escreva bullets com menos de 8 palavras — eles não têm intriga suficiente
- NUNCA inclua bullets que prometam algo que o produto não entrega

---

## Critérios de Conclusão

- [ ] Conteúdo de origem minerado em busca de todo material possível para bullets
- [ ] Número solicitado de bullets escrito usando fórmulas variadas
- [ ] Cada bullet cria uma lacuna de curiosidade genuína
- [ ] Bullets pontuados e ordenados estrategicamente
- [ ] 3-5 bullets matadores identificados para uso múltiplo
- [ ] Seções temáticas organizadas, se aplicável
- [ ] Notas de uso fornecidas para aplicação em múltiplos contextos
