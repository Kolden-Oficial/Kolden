---
task: createPitch()
responsavel: "@oren-klaff"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: pitch_subject
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: target_audience
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: pitch_narrative
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Público perfilado com critérios de decisão mapeados"
  - "[ ] Abordagem narrativa selecionada e todos os beats estruturados"
  - "[ ] Pedido claro com tratamento de objeções preparado"
tipo: nota
area: Orfeu
up: "[[Orfeu/_MOC-orfeu]]"
relacionado:
  - "[[Orfeu/tasks/_indice|_indice]]"
---

# Task: Narrativa de Pitch Deck

**Task ID:** STORY-002
**Version:** 1.0.0
**Command:** `*create-pitch`
**Agent:** Oren Klaff (oren-klaff) ou Nancy Duarte (nancy-duarte)
**Purpose:** Elaborar uma narrativa de pitch convincente que capture a atenção e impulsione a ação.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `pitch_subject` | Prompt do usuário | SIM |
| `target_audience` | Investidores, clientes, parceiros, interno | SIM |
| `desired_outcome` | Investimento, negócio, aprovação, adesão | SIM |
| `key_data_points` | Métricas, tração, finanças | PREFERENCIAL |
| `time_limit` | Duração do pitch | NÃO (padrão: 10 min) |
| `existing_deck` | Slides ou esboço atuais | NÃO |

## Pré-condições

1. Compreensão clara do que está sendo apresentado
2. Público-alvo identificado com seu contexto de tomada de decisão
3. Pontos-chave de dados disponíveis para sustentar a narrativa

## Fases de Execução

### Fase 1: Analisar o Público

1. Perfilar o público — quem são, o que valorizam, quais são seus medos?
2. Identificar o frame atual deles — como veem o mundo agora?
3. Mapear seus critérios de decisão — o que precisa ser verdade para que digam sim?
4. Determinar a dinâmica de status — você está apresentando para cima, para baixo ou lateralmente?
5. Identificar objeções potenciais e pontos de resistência
6. Selecionar a abordagem: Klaff (controle de frame, tensão) ou Duarte (sparkline, transformação)

### Fase 2: Estruturar a Narrativa

**Se abordagem Klaff (oren-klaff):**
1. **Set the Frame** — Estabeleça seu frame como o dominante (prize frame, time frame, authority frame)
2. **Tell the Story** — Fisgue com intriga, construa tensão, crie desejo
3. **Reveal the Intrigue** — O insight ou oportunidade única que muda tudo
4. **Offer the Prize** — Posicione você/produto como o prêmio, não como o vendedor
5. **Nail the Hookpoint** — O momento em que eles se inclinam e querem mais
6. **Get the Decision** — Conduza a um sim/não claro (não "deixa eu pensar")

**Se abordagem Duarte (nancy-duarte):**
1. **What Is** — Pinte a realidade atual (o mundo do público hoje)
2. **What Could Be** — Revele a possibilidade (o futuro melhor)
3. **Alternate** — Alterne entre a dor atual e a promessa do futuro (sparkline)
4. **Call to Action** — O passo específico para sair do "what is" para o "what could be"
5. **New Bliss** — Pinte o futuro transformado de forma vívida

### Fase 3: Construir Tensão

1. Identificar a tensão central — a lacuna entre o estado atual e a possibilidade
2. Amplificar a urgência — por que isto precisa acontecer agora? Qual é o custo da inação?
3. Sobrepor pontos de prova — dados, depoimentos, tração que validam a narrativa
4. Criar picos emocionais — momentos de surpresa, encantamento ou preocupação
5. Gerenciar o ritmo — rápido para empolgação, lento para gravidade
6. Tratar objeções preventivamente — entreteça respostas na narrativa

### Fase 4: Projetar a Resolução

1. Tornar o pedido cristalino — exatamente o que você quer e até quando
2. Simplificar a decisão — reduza-a a uma escolha binária
3. Criar próximos passos — ações imediatas após o pitch
4. Encerrar com ressonância — uma imagem ou afirmação de fechamento memorável
5. Preparar para o Q&A — antecipe as 5 principais perguntas e prepare respostas
6. Projetar o material de apoio (leave-behind) — o que fica com eles depois que você sai da sala

## Formato de Saída

```yaml
pitch_narrative:
  subject: "{what is being pitched}"
  approach: "klaff_frame_control | duarte_sparkline"
  specialist: "oren-klaff | nancy-duarte"
  audience: "{target audience}"
  desired_outcome: "{what success looks like}"
  duration: "{estimated time}"
  narrative_beats:
    - beat: 1
      name: "{beat name}"
      content: "{what to say/show}"
      emotional_target: "{audience feeling}"
      duration: "{time allocation}"
  tension_points: ["{key moments of tension}"]
  proof_points: ["{data and evidence}"]
  the_ask: "{specific request}"
  objection_handling:
    - objection: "{anticipated concern}"
      response: "{preemptive answer}"
  closing_statement: "{memorable ending}"
```

## Condições de Veto

- **NUNCA** faça um pitch sem entender o público primeiro
- **NUNCA** enterre o pedido — ele deve ser explícito e claro
- **NUNCA** confie apenas em dados sem narrativa emocional
- **NUNCA** crie um pitch mais longo do que o limite de tempo permite
- **NUNCA** deixe o público sem próximos passos claros

## Critérios de Conclusão

- [ ] Público perfilado com critérios de decisão mapeados
- [ ] Abordagem narrativa selecionada e justificada
- [ ] Todos os beats estruturados com conteúdo e alvos emocionais
- [ ] Tensão construída com urgência e pontos de prova
- [ ] Pedido claro com caminho de decisão simplificado
- [ ] Tratamento de objeções preparado
- [ ] Fechamento memorável projetado
