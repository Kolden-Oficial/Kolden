---
task: mapArchetype()
responsavel: "@archetype-consultant"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: brand
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: brand_values
    tipo: list
    origem: User Input
    obrigatorio: true

Saida:
  - campo: Perfil de Arquétipo de Marca
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Todos os 12 arquétipos avaliados e top 3 pontuados"
  - "[ ] Arquétipos primário e secundário selecionados"
  - "[ ] Exemplos de aplicação fornecidos para 5+ pontos de contato"
---

# Task: Mapear Arquétipo de Marca

**Task ID:** BRAND-007
**Version:** 1.0.0
**Comando:** `*map-archetype`
**Agente:** Archetype Consultant (archetype-consultant)
**Propósito:** Identificar e aplicar o arquétipo junguiano da marca para guiar personalidade, mensagens e experiência.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| brand | string | Prompt do usuário | Sim | Nome e descrição da marca |
| audience | string | Prompt do usuário | Sim | Público-alvo e suas aspirações |
| brand_values | list | Prompt do usuário | Sim | Valores e crenças centrais |
| industry | string | Prompt do usuário | Não | Contexto do setor |
| competitors | list | Prompt do usuário | Não | Concorrentes com seus arquétipos percebidos |
| current_perception | string | Prompt do usuário | Não | Como a marca é percebida atualmente |

---

## Pré-condições

- Valores da marca articulados (mesmo que informalmente)
- Compreensão do que o público aspira

---

## Fases de Execução

### Fase 1: Análise de Arquétipo
1. Avalie a marca em relação a todos os 12 arquétipos:
   - **Inocente (Innocent):** Otimismo, simplicidade, pureza (Dove, Coca-Cola)
   - **Explorador (Explorer):** Liberdade, descoberta, aventura (Jeep, Patagonia)
   - **Sábio (Sage):** Sabedoria, conhecimento, verdade (Google, BBC)
   - **Herói (Hero):** Coragem, maestria, conquista (Nike, FedEx)
   - **Rebelde (Outlaw):** Libertação, revolução, ruptura (Harley-Davidson, Virgin)
   - **Mago (Magician):** Transformação, visão, imaginação (Apple, Disney)
   - **Cara Comum (Regular Guy):** Pertencimento, autenticidade, conexão (IKEA, Target)
   - **Amante (Lover):** Intimidade, paixão, beleza (Chanel, Godiva)
   - **Bobo da Corte (Jester):** Alegria, humor, viver o momento (Old Spice, M&Ms)
   - **Cuidador (Caregiver):** Serviço, compaixão, acolhimento (Johnson & Johnson, TOMS)
   - **Criador (Creator):** Inovação, autoexpressão, originalidade (LEGO, Adobe)
   - **Soberano (Ruler):** Controle, autoridade, liderança (Mercedes, Rolex)
2. Pontue os 3 principais arquétipos por aderência (1-10 em alinhamento de valores, ressonância com o público, diferenciação competitiva)
3. Identifique o arquétipo primário e a influência secundária
4. Valide em relação aos arquétipos dos concorrentes para garantir diferenciação

### Fase 2: Guia de Expressão do Arquétipo
1. Defina como o arquétipo primário se manifesta na marca:
   - **Desejo Central:** O que o arquétipo fundamentalmente quer
   - **Objetivo:** O que o arquétipo está tentando alcançar
   - **Medo:** O que o arquétipo evita
   - **Estratégia:** Como o arquétipo aborda os desafios
   - **Dom:** O que o arquétipo oferece ao mundo
   - **Sombra:** O lado obscuro a evitar (o arquétipo levado longe demais)
2. Traduza o arquétipo em expressões de marca:
   - Tom de voz: Como a marca fala
   - Atmosfera visual: Como a marca se apresenta e transmite
   - Temas de história: Que histórias a marca conta
   - Relação com o cliente: Como a marca trata os clientes
   - Temas de conteúdo: Que tópicos a marca aborda

### Fase 3: Mensagens Pela Lente do Arquétipo
1. Escreva mensagens alinhadas ao arquétipo:
   - Tagline: Captura a essência do arquétipo
   - Promessa da marca: Enquadrada pelos valores do arquétipo
   - Mensagens-chave: 3-5 mensagens que incorporam o arquétipo
   - Voz nas redes sociais: Como o arquétipo se manifesta no conteúdo diário
2. Crie a estratégia de conteúdo baseada no arquétipo:
   - Temas de conteúdo que ressoam com o arquétipo
   - Estruturas de história que se alinham (jornada do herói, descoberta, transformação)
   - Gatilhos emocionais a explorar
   - Gatilhos emocionais a evitar
3. Forneça a diferenciação de arquétipo em relação aos concorrentes:
   - Onde os concorrentes ocupam arquétipos similares
   - Como expressar o mesmo arquétipo de forma diferente
   - Onde o arquétipo secundário cria singularidade

### Fase 4: Exemplos de Aplicação
1. Escreva 3-5 exemplos do arquétipo em ação:
   - Manchete da página inicial
   - Linha de assunto de e-mail
   - Post de rede social
   - Resposta de suporte ao cliente
   - Mensagem de erro ou página 404
2. Forneça um framework de decisão "o que o {arquétipo} faria?"
3. Crie o resumo prático (cheat sheet) do arquétipo para a equipe:
   - Ao tomar decisões de marca, pergunte: "Um {arquétipo} diria/faria isto?"
   - Referência rápida do que fazer e do que não fazer

---

## Formato de Saída

```markdown
## Arquétipo de Marca: {Nome da Marca}

**Arquétipo Primário:** {arquétipo}
**Influência Secundária:** {arquétipo}
**Mescla de Arquétipos:** {X}% {primário} + {Y}% {secundário}

---

### Scorecard de Arquétipos

| Arquétipo | Aderência de Valores | Aderência ao Público | Diferenciação | Total |
|-----------|-----------|-------------|-----------------|-------|
| {top 1} | X/10 | X/10 | X/10 | XX/30 |
| {top 2} | X/10 | X/10 | X/10 | XX/30 |
| {top 3} | X/10 | X/10 | X/10 | XX/30 |

### Perfil do Arquétipo

| Elemento | Definição |
|---------|-----------|
| Desejo Central | {desejo} |
| Objetivo | {objetivo} |
| Medo | {medo} |
| Estratégia | {estratégia} |
| Dom | {dom} |
| Sombra | {o que evitar} |

### Guia de Expressão da Marca

| Dimensão | Direção | Exemplo |
|-----------|----------|---------|
| Tom de Voz | {descrição} | {frase de exemplo} |
| Atmosfera Visual | {descrição} | {referência} |
| Temas de História | {temas} | {exemplo} |
| Relação com o Cliente | {estilo} | {exemplo} |

### Mensagens Alinhadas ao Arquétipo
- **Tagline:** {tagline}
- **Promessa:** {promessa da marca}
- **Mensagens-Chave:** {3-5 mensagens}

### Exemplos de Aplicação
| Ponto de Contato | Exemplo |
|-----------|---------|
| Manchete da página inicial | {copy} |
| Assunto de e-mail | {copy} |
| Post social | {copy} |
| Resposta de suporte | {copy} |

### Resumo Prático para a Equipe
**Sempre pergunte:** "Um {arquétipo} diria/faria isto?"
**Faça:** {lista}
**Não faça:** {lista}
```

---

## Condições de Veto

- NUNCA atribua um arquétipo sem avaliar todos os 12 — o viés leva a uma tipificação errada
- NUNCA ignore o lado da sombra — todo arquétipo tem uma versão obscura a evitar
- NUNCA atribua o mesmo arquétipo do concorrente dominante sem uma estratégia de diferenciação
- NUNCA recomende mais de 2 influências de arquétipo — marcas com 3+ arquétipos parecem confusas
- NUNCA pule os exemplos de aplicação — a teoria abstrata de arquétipos é inutilizável sem demonstração concreta

---

## Critérios de Conclusão

- [ ] Todos os 12 arquétipos avaliados
- [ ] Top 3 pontuados com justificativa
- [ ] Arquétipos primário e secundário selecionados
- [ ] Guia de expressão do arquétipo concluído
- [ ] Mensagens escritas pela lente do arquétipo
- [ ] Exemplos de aplicação fornecidos para 5+ pontos de contato
- [ ] Resumo prático da equipe criado
- [ ] Lado da sombra documentado como guardrail
