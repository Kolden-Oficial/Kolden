---
task: designWorkshop()
responsavel: "@hormozi-workshop"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: topic
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: duration
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: workshopDesign
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Promessa de transformação única definida"
  - "[ ] 3-5 módulos de ensino projetados com frameworks e exercícios"
  - "[ ] Roteiro de execução (run of show) criado com cronometragem"
tipo: nota
area: Pluto
up: "[[Pluto/_MOC-pluto]]"
relacionado:
  - "[[Pluto/tasks/_indice|_indice]]"
---

# Tarefa: Projetar Workshop

**Task ID:** HORMOZI-008
**Versão:** 1.0.0
**Comando:** `*design-workshop`
**Agente:** Hormozi Workshop (hormozi-workshop)
**Propósito:** Projetar um workshop que entrega valor massivo e converte participantes em compradores.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| topic | string | Prompt do usuário | Sim | Assunto e transformação do workshop |
| audience | string | Prompt do usuário | Sim | Participantes-alvo |
| duration | string | Prompt do usuário | Sim | 60min, 90min, meio dia, dia inteiro, multi-dias |
| format | enum | Prompt do usuário | Sim | virtual, presencial, híbrido |
| backend_offer | object | Prompt do usuário | Não | O que você vende no final (se for um workshop de conversão) |
| price | number | Prompt do usuário | Não | Preço do ingresso do workshop (0 para gratuito) |
| capacity | number | Prompt do usuário | Não | Máximo de participantes |

---

## Pré-condições

- Expertise no tópico disponível para entregar o conteúdo
- Se for workshop de conversão: a oferta de backend deve estar definida

---

## Fases de Execução

### Fase 1: Arquitetura do Workshop
1. Defina a promessa de transformação única ("Ao final deste workshop, você vai...")
2. Escolha o modelo de workshop:
   - Valor Puro: Sem pitch, construção de marca e relacionamento
   - Valor + Oferta: 80% de ensino, 20% de transição para a oferta
   - Implementação: Mão na massa, onde eles constroem algo ao vivo
3. Estruture os blocos de conteúdo:
   - Abertura: Hook + promessa + pauta (10% do tempo)
   - Blocos de ensino: 3-5 módulos centrais (70% do tempo)
   - Implementação/exercícios: Aplicação prática (embutida no ensino)
   - Fechamento: Recapitulação + CTA ou transição para a oferta (20% do tempo)
4. Para cada bloco de ensino, defina o "momento aha" — o que eles vão perceber?

### Fase 2: Design de Conteúdo
1. Para cada bloco de ensino:
   - Grande ideia (um conceito por bloco)
   - Framework ou modelo para ensiná-lo
   - Exemplo ou estudo de caso para ilustrar
   - Exercício ou passo de implementação
   - Transição para o próximo bloco
2. Projete o "framework reveal" — entregue a eles um framework proprietário
3. Crie planilhas ou templates que os participantes vão usar
4. Insira pontos de interação a cada 10-15 minutos:
   - Perguntas para a audiência
   - Prompts de engajamento no chat
   - Exercícios rápidos
   - Momentos de enquete ou votação
5. Planeje o arco de energia: comece forte, varie o ritmo, termine em um pico

### Fase 3: Design de Conversão (se aplicável)
1. Plante "sementes" ao longo do ensino que apontem para a oferta:
   - "No meu programa, vamos muito mais fundo nisso..."
   - "Meus clientes recebem uma versão done-for-you disto..."
2. Projete a transição do ensino para a oferta (a "ponte"):
   - Recapitule a transformação que eles vivenciaram
   - Identifique a lacuna entre o conhecimento do workshop e a implementação completa
   - Posicione a oferta como a ponte para fechar essa lacuna
3. Estruture a apresentação da oferta:
   - Reafirme o resultado dos sonhos
   - Revele a oferta e o que está incluído
   - Empilhe o valor
   - Apresente o preço com ancoragem
   - Trate as 3 principais objeções
   - CTA com urgência
4. Planeje o follow-up para os não compradores

### Fase 4: Logística e Entrega
1. Crie o run-of-show com cronometragem exata
2. Defina os requisitos de tecnologia (plataforma, ferramentas, slides, chat)
3. Planeje a sequência de inscrição e lembretes
4. Crie o plano de follow-up pós-workshop
5. Defina métricas de sucesso (taxa de comparecimento, engajamento, conversão se aplicável)

---

## Formato de Saída

```markdown
## Design do Workshop: {Nome do Workshop}

**Promessa:** "Ao final, você vai {transformação}"
**Duração:** {time}
**Formato:** {format}
**Modelo:** {valor-puro / valor+oferta / implementação}
**Capacidade:** {N}

---

### Run of Show

| Horário | Bloco | Conteúdo | Nível de Energia |
|------|-------|---------|-------------|
| 0:00-{X} | Abertura | {hook + promessa} | Alto |
| {X}-{Y} | Módulo 1 | {tópico} | Médio |
| ... | ... | ... | ... |
| {Z}-FIM | Fechamento/Oferta | {recapitulação + CTA} | Pico |

### Detalhes dos Módulos

#### Módulo 1: {Título}
**Grande Ideia:** {conceito}
**Framework:** {nome do framework}
**Exemplo:** {estudo de caso}
**Exercício:** {o que eles fazem}
**Momento Aha:** {realização}

#### Módulo 2-N: ...

### Planilhas/Templates
| Recurso | Propósito | Quando É Usado |
|----------|---------|-----------|

### Plano de Conversão (se aplicável)
**Sementes plantadas em:** {módulos}
**Script da ponte:** {linguagem de transição}
**Apresentação da oferta:** {estrutura}
**Plano de follow-up:** {sequência para não compradores}

### Inscrição e Lembretes
| Momento | Comunicação | Canal |
|--------|--------------|---------|

### Métricas de Sucesso
| Métrica | Meta |
|--------|--------|
```

---

## Condições de Veto

- NUNCA projete um workshop sem uma única promessa de transformação clara
- NUNCA ensine mais de 5 conceitos centrais — profundidade vence amplitude
- NUNCA fique mais de 15 minutos sem interação com a audiência
- NUNCA faça pitch antes de entregar valor substancial (mínimo de 60% de ensino puro)
- NUNCA pule o arco de energia — workshops monótonos perdem as pessoas

---

## Critérios de Conclusão

- [ ] Promessa de transformação única definida
- [ ] Modelo de workshop selecionado
- [ ] 3-5 módulos de ensino projetados com frameworks e exercícios
- [ ] Run of show criado com cronometragem
- [ ] Pontos de interação planejados a cada 10-15 minutos
- [ ] Plano de conversão projetado (se aplicável)
- [ ] Planilhas/templates criados
- [ ] Sequências de inscrição e follow-up planejadas
- [ ] Métricas de sucesso definidas
