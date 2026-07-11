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
  - "[ ] Conteúdo-fonte minerado para todo o material de bullets"
  - "[ ] Número solicitado de bullets escrito usando fórmulas variadas"
  - "[ ] 3-5 bullets matadores identificados para uso múltiplo"
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
tipo: nota
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
relacionado:
  - "[[Caliope/tasks/_indice|_indice]]"
---

# Tarefa: Escrever Bullet Points

**ID da Tarefa:** COPY-M-010
**Versão:** 2.0.0
**Comando:** `*write-bullets`
**Agente:** Gary Bencivenga (gary-bencivenga)
**Propósito:** Escrever bullet points guiados por curiosidade (fascinations) que vendem sem revelar a resposta, potencializados pela psicologia da persuasão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço com conteúdo ou características para virar bullets |
| content_source | string | Prompt do usuário | Sim | Material bruto para transformar em bullets (características, capítulos, lições, resultados) |
| context | enum | Prompt do usuário | Sim | sales-page, email, VSL, ad, order-form |
| audience | string | Prompt do usuário | Não | Leitor-alvo para calibrar a linguagem |
| num_bullets | number | Prompt do usuário | Não | Padrão é 20 |
| style | enum | Prompt do usuário | Não | fascination, benefit, proof, hybrid — padrão é fascination |

---

## Pré-condições

- Conteúdo-fonte disponível (lista de características, sumário, esboços de lições ou dados de resultados)
- Contexto de posicionamento definido (bullets para uma página de vendas diferem de bullets de e-mail)

---

## Referência de Campeões

Estude estes exemplos campeões de bullets do mundo real antes de escrever:

1. **Bullets da Boardroom / Bottom Line Personal** (Mel Martin, Jim Rutz) — Fascinations no estilo "O que nunca comer num avião" que venderam milhões de assinaturas de newsletter
2. **Newsletter "Bencivenga Bullets" de Gary Bencivenga** — A própria convenção de nomenclatura no estilo fascination do mestre, execução pura do gap de curiosidade
3. **Bullets "Hidden" da Agora Financial** — Estilo "O truque da nota de US$ 2 que força o seu banco a...", números específicos + enquadramento de conhecimento proibido
4. **Bullets "One-Legged Golfer" de John Carlton** — Fascinations baseadas em prova com especificidade extrema que desarmam o ceticismo
5. **Bullets de suplementos de saúde de Clayton Makepeace** — Combinação de medo + curiosidade: "O item doméstico comum que pode estar silenciosamente destruindo o seu..."

---

## Fases de Execução

### Fase 1: Mineração da Fonte
1. Extraia cada afirmação, característica, benefício ou fato único do conteúdo-fonte
2. Identifique quais fatos são os mais surpreendentes, contraintuitivos ou valiosos
3. Classifique pelo fator "alguém pagaria dinheiro só para saber disto?"
4. Agrupe por tema para seções de bullets organizadas
5. Mire em ao menos 2x a contagem de bullets solicitada como material bruto

### Fase 2: Camada Psicológica
1. Marque cada bullet com seu princípio primário de Cialdini:
   - **Bullets de Autoridade:** "O que pesquisadores de Harvard descobriram sobre..."
   - **Bullets de Prova Social:** "O método usado por 93% dos top performers..."
   - **Bullets de Escassez:** "A brecha que está desaparecendo e que permite você..."
   - **Bullets de Reciprocidade:** Revele um pequeno insight que os faça querer a resposta completa
   - **Bullets de Unidade:** "O que todo [grupo de identidade] precisa saber sobre..."
2. Aplique as alavancas de Blair Warren à construção dos bullets:
   - Encorajar sonhos: "Como {dream outcome} em {prazo}"
   - Justificar fracassos: "Por que {abordagem comum} nunca funcionou — e o que fazer em vez disso"
   - Confirmar suspeitas: "A verdade sobre {coisa que eles suspeitam} — você estava certo o tempo todo"
   - Atirar pedras nos inimigos: "O que {autoridade/indústria} não quer que você saiba"
3. Garanta variedade — não mais que 3 bullets consecutivos usando o mesmo direcionador psicológico

### Fase 3: Escrita dos Bullets
1. Escreva bullets usando fórmulas comprovadas de fascination:
   - **O Segredo:** "O segredo bem guardado que {resultado}..."
   - **O Contraintuitivo:** "Por que {crença comum} é, na verdade, {oposto}..."
   - **O Número Específico:** "{Número exato} maneiras de {resultado} sem {sacrifício}..."
   - **A Pergunta:** "Você está cometendo este erro de R${custo} com o seu {coisa}?"
   - **O Proibido:** "O que {autoridades} não querem que você saiba sobre {tópico}..."
   - **A Prova:** "Como {pessoa} alcançou {resultado específico} em {prazo}..."
   - **O Se-Então:** "Se você {situação}, eis a {solução}..."
   - **O Aviso:** "AVISO: Nunca {ação} até você {precaução}..."
2. Aplique a regra de especificidade de Bencivenga: bullets vagos são bullets mortos
3. Cada bullet deve criar um loop aberto que o leitor precisa fechar
4. Varie a estrutura das frases — nunca use a mesma fórmula consecutivamente
5. Coloque em negrito ou enfatize a frase mais importante nos bullets mais longos

### Fase 4: Seleção e Ordenação
1. Pontue cada bullet pela intensidade de curiosidade (1-5)
2. Selecione os melhores bullets (conforme a contagem solicitada)
3. Ordene estrategicamente:
   - Comece forte (os 2 melhores bullets primeiro)
   - Alterne entre bullets emocionais e lógicos
   - Termine forte (guarde um bullet poderoso para o final)
4. Agrupe em seções temáticas se for para uma página de vendas longa
5. Marque 3-5 "bullets matadores" que poderiam ser headlines autônomas

---

## Formato de Saída

```markdown
## Pacote de Bullets: {Nome do Produto}

**Contexto:** {onde os bullets vão aparecer}
**Estilo:** {fascination / benefit / proof / hybrid}
**Total de Bullets:** {contagem}

### Distribuição de Persuasão
| Princípio de Cialdini | Contagem | Alavanca de Warren | Contagem |
|-------------------|-------|-------------|-------|

---

### Melhores Bullets (Headlines Matadoras)
{3-5 bullets mais fortes marcados com uma estrela}

### Seção de Bullets 1: {Tema}
- {bullet} — [{princípio de Cialdini}]
- {bullet} — [{princípio de Cialdini}]
- {bullet} — [{princípio de Cialdini}]

### Seção de Bullets 2: {Tema}
- {bullet} — [{princípio de Cialdini}]
- {bullet} — [{princípio de Cialdini}]
- {bullet} — [{princípio de Cialdini}]

### Seção de Bullets 3-N: ...

---

### Notas de Uso
- **Melhor para conversão de headline:** {bullet nº}
- **Melhor para linha de assunto de e-mail:** {bullet nº}
- **Melhor para hook de anúncio:** {bullet nº}
- **Recomendação de ordenação:** {conselho de posicionamento}
```

---

## Condições de Veto

- NUNCA escreva um bullet que revele a resposta — o gap de curiosidade é o mecanismo de venda
- NUNCA use linguagem vaga ("resultados incríveis", "segredos poderosos") — a especificidade é obrigatória
- NUNCA repita a mesma fórmula mais de duas vezes em um conjunto
- NUNCA escreva bullets com menos de 8 palavras — eles carecem de intriga suficiente
- NUNCA inclua bullets que prometam algo que o produto não entrega

---

## Critérios de Conclusão

- [ ] Conteúdo-fonte minerado para todo o material possível de bullets
- [ ] Número solicitado de bullets escrito usando fórmulas variadas
- [ ] Cada bullet cria um gap de curiosidade genuíno
- [ ] Bullets pontuados e ordenados estrategicamente
- [ ] 3-5 bullets matadores identificados para uso múltiplo
- [ ] Seções temáticas organizadas se aplicável
- [ ] Notas de uso fornecidas para aplicação em múltiplos contextos
- [ ] Camada Psicológica aplicada — princípios de Cialdini marcados por bullet
- [ ] Alavancas de Blair Warren variadas ao longo do conjunto de bullets
