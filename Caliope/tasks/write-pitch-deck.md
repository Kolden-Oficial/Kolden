---
task: writePitchDeck()
responsavel: "@oren-klaff"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: business
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: audience
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: pitch_deck_copy
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Método STRONG totalmente executado (todos os 6 elementos)"
  - "[ ] Estratégia de controle de frame definida para cada seção"
  - "[ ] Arco de intriga + tensão mantido do início ao fim"
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
tipo: nota
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
relacionado:
  - "[[Caliope/tasks/_indice|_indice]]"
---

# Task: Escrever Copy de Pitch Deck

**Task ID:** COPY-M-013
**Version:** 2.0.0
**Command:** `*write-pitch-deck`
**Agent:** Oren Klaff (oren-klaff)
**Purpose:** Escrever copy de pitch deck usando o método STRONG com controle de frame e psicologia da persuasão em camadas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| business | string | Prompt do usuário | Sim | Negócio/produto com a proposta de valor central |
| audience | enum | Prompt do usuário | Sim | investors, partners, clients, internal-stakeholders |
| ask | string | Prompt do usuário | Sim | O que você está pedindo (valor de captação, parceria, negócio, adesão) |
| traction | object | Prompt do usuário | Não | Receita, usuários, taxa de crescimento, marcos |
| market_data | object | Prompt do usuário | Não | TAM, SAM, SOM, tendências de mercado |
| team | list | Prompt do usuário | Não | Membros-chave da equipe e credenciais |
| competitive_advantage | string | Prompt do usuário | Não | Fosso único (moat) ou vantagem injusta |
| pitch_context | string | Prompt do usuário | Não | Onde/como o pitch será entregue (sala de reunião, demo day, virtual, 1-a-1) |

---

## Pré-condições

- Proposta de valor do negócio claramente definida
- Tipo de audiência identificado (audiências diferentes exigem frames diferentes)
- O "ask" é específico e quantificado
- Ao menos alguns dados de tração ou pontos de prova disponíveis

---

## Referência de Campeões

Estude estes pitches campeões do mundo real antes de escrever:

1. **Pitch Deck Original do Airbnb** (2009) — Enquadramento limpo de problema/solução, tamanho de mercado com especificidade, prova de tração, ask conciso
2. **Método STRONG do "Pitch Anything" do Oren Klaff** — Controle de frame, intriga, padrão tensão-alívio, alinhamento de status
3. **Lançamento do iPhone por Steve Jobs** (2007) — Quebra de padrão "três produtos revolucionários", prova movida por demonstração, dominância de status
4. **Template de Pitch Deck da Sequoia Capital** — O padrão: Problema, Solução, Por Que Agora, Mercado, Concorrência, Produto, Equipe, Financeiro, Ask
5. **Pitch Deck Transparente do Buffer** — Orientado por métricas, honesto sobre os desafios, prova social por meio de transparência

---

## Fases de Execução

### Fase 1: Framework do Método STRONG

1. **S -- Set the Frame (Defina o Frame):** Estabeleça seu frame antes que a audiência estabeleça o dela
   - Power frame: Posicione-se como o prêmio, não o suplicante
   - Time frame: Crie urgência ("Tenho 20 minutos para te mostrar algo importante")
   - Analyst frame: Não se deixe puxar para detalhes de planilha — fique no panorama geral
   - Prize frame: Eles precisam se qualificar para trabalhar com VOCÊ
2. **T -- Tell the Story (Conte a História):** Arco narrativo que cria intriga
   - Homem-na-selva (man-in-the-jungle): Luta -> Descoberta -> Transformação
   - Use novidade e tensão para prender a atenção
   - Nunca seja entediante — se o cérebro reptiliano (croc brain) da audiência desengajar, você perde
3. **R -- Reveal the Intrigue (Revele a Intriga):** O "momento aha" que muda tudo
   - O que a maioria das pessoas não sabe sobre este mercado/oportunidade
   - O insight contraintuitivo que faz isso funcionar
   - A vantagem injusta que torna a concorrência irrelevante
4. **O -- Offer the Prize (Ofereça o Prêmio):** Posicione o negócio como uma oportunidade escassa
   - Isto não é você pedindo dinheiro — isto é você oferecendo um lugar à mesa
   - Enquadre a janela de oportunidade: "Se não agora, então nunca"
   - Faça a audiência se inclinar para frente para conseguir o negócio
5. **N -- Nail the Hookpoint (Crave o Hookpoint):** O momento em que eles precisam decidir
   - Ask claro e específico com termos
   - Frame binário: dentro ou fora
   - Sem espaço para "deixa eu pensar" — crie urgência para decidir
6. **G -- Get the Decision (Obtenha a Decisão):** Feche com controle de frame
   - Fechamento por restrição de tempo: "Preciso de uma decisão até sexta"
   - Takeaway (recuo): "Isto pode não ser certo para todo mundo"
   - Próximos passos: Exatamente o que acontece depois que disserem sim

### Fase 2: Camada Psicológica

1. Mapeie os princípios de Cialdini na estrutura do pitch:
   - **Autoridade:** Credenciais, tração, equipe, menções na mídia (ao longo de todo o pitch)
   - **Escassez:** Alocação limitada, rodada fechando, janela de oportunidade
   - **Prova Social:** Outros investidores, clientes, conselheiros já dentro
   - **Compromisso:** Obtenha pequenos sins ao longo do caminho ("Isto faz sentido?")
   - **Afinidade:** História pessoal, visão compartilhada, identificação
   - **Unidade:** "Estamos construindo algo juntos" — enquadramento de missão compartilhada
   - **Reciprocidade:** Compartilhe um insight valioso que eles possam usar mesmo que não invistam
2. Aplique as alavancas de Blair Warren:
   - Encorajar sonhos: Pinte o upside massivo
   - Justificar fracassos: "Investimentos passados nesse espaço fracassaram porque faltava X"
   - Acalmar medos: Reduza o risco do investimento com marcos e dados
   - Confirmar suspeitas: "Você provavelmente percebeu [tendência de mercado] — você está certo"
   - Jogar pedras nos inimigos: Os incumbentes são vulneráveis porque...
3. Técnicas de controle de frame por seção:
   - Nunca deixe a audiência estabelecer um "power frame" sobre você
   - Tenha consciência das "armadilhas beta" — não caia em um posicionamento subserviente
   - Mantenha o status controlando a temperatura emocional da sala

### Fase 3: Escrita de Copy Slide por Slide

1. **Slide de Título:** Frase de impacto provocativa, não o nome da empresa
2. **Slide de Problema:** Ponto de dor vívido e específico com dados
3. **Slide de Solução:** Seu mecanismo único em uma frase
4. **Slide de Por Que Agora:** Timing de mercado / convergência / ponto de inflexão
5. **Slide de Tamanho de Mercado:** TAM -> SAM -> SOM com lógica bottom-up
6. **Slide de Produto:** Demo ou screenshot com 3 diferenciais-chave
7. **Slide de Tração:** Métricas que provam momento (gráfico subindo para cima e para a direita)
8. **Slide de Modelo de Negócio:** Como você ganha dinheiro, economia unitária (unit economics)
9. **Slide de Concorrência:** Matriz de posicionamento (não comparação de funcionalidades)
10. **Slide de Equipe:** Por que ESTA equipe vence (credenciais + vantagem injusta)
11. **Slide do Ask:** Valor específico, uso dos recursos, termos, cronograma
12. **Slide de Visão:** A imagem de 10 anos que faz eles quererem fazer parte

### Fase 4: Notas de Entrega

1. Escreva notas do palestrante por slide (o que DIZER, não o que ler)
2. Marque os momentos de controle de frame (onde rebater, redirecionar ou assumir o controle)
3. Identifique os gatilhos de "hot cognition" (batidas emocionais que contornam o pensamento analítico)
4. Planeje para o cérebro reptiliano (croc brain): mantenha visual, mantenha novo, mantenha em movimento
5. Prepare respostas a objeções para os 5 desafios mais prováveis
6. Defina os momentos de "intrigue ping" — frases projetadas para criar curiosidade

---

## Formato de Saída

```markdown
## Copy de Pitch Deck: {Nome da Empresa/Produto}

**Método:** STRONG (Klaff)
**Audiência:** {tipo de audiência}
**O Ask:** {pedido específico}
**Duração:** {X} minutos

### Arquitetura de Persuasão
| Slide/Seção | Elemento STRONG | Princípios de Cialdini | Alavancas de Warren | Controle de Frame |
|-------------|-----------------|------------------------|---------------------|-------------------|
| Título | Set the Frame | Autoridade | Encorajar sonhos | Prize frame |
| Problema | Tell the Story | Afinidade | Confirmar suspeitas | Power frame |
| ... | ... | ... | ... | ... |

---

### Slide 1: {Título}
**Copy no slide:** {texto que aparece no slide}
**Notas do palestrante:** {o que dizer}
**Controle de frame:** {técnica para este momento}
**Intrigue ping:** {gatilho de curiosidade}

### Slide 2: {Problema}
**Copy no slide:** {texto}
**Notas do palestrante:** {o que dizer}
**Ponto de dado:** {prova específica}
**Batida emocional:** {gatilho de hot cognition}

### Slides 3-12: ...

---

### Playbook de Controle de Frame
| Situação | Frame Deles | Seu Contra-Frame |
|----------|-------------|------------------|
| "Precisamos de mais dados" | Analyst frame | "Eu mando os detalhes — mas primeiro, a visão ressoa?" |
| "E o concorrente X?" | Power frame | "Boa pergunta — eis por que eles não conseguem fazer o que fazemos" |
| "Deixa eu pensar" | Delay frame | "Entendo — devo mencionar que estamos fechando em [data]" |

### Respostas a Objeções
| Objeção | Resposta | Princípio de Cialdini Usado |
|---------|----------|-----------------------------|

### Notas de Entrega
- **Total de slides:** {contagem}
- **Principais momentos de controle de frame:** {lista}
- **Gatilhos de hot cognition:** {lista}
- **Dicas de sobrevivência para o croc-brain:** {lista}
- **Follow-up pós-pitch:** {próximos passos}
```

---

## Condições de Veto

- NUNCA se posicione como o suplicante — o pitch é VOCÊ oferecendo a ELES uma oportunidade
- NUNCA deixe o deck exceder 12 slides em pitches para investidores — a capacidade de atenção é finita
- NUNCA apresente o tamanho de mercado sem lógica bottom-up — TAM top-down não significa nada
- NUNCA pule a tração — até empresas em estágio inicial precisam mostrar momento
- NUNCA termine sem um ask específico e com prazo — asks vagos recebem respostas vagas

---

## Critérios de Conclusão

- [ ] Método STRONG totalmente executado (todos os 6 elementos presentes)
- [ ] Estratégia de controle de frame definida para cada seção
- [ ] Copy slide por slide escrita com texto no slide e notas do palestrante
- [ ] Arco de intriga + tensão mantido do início ao fim
- [ ] Dados de tração/prova integrados
- [ ] O Ask é específico, quantificado e com prazo definido
- [ ] Playbook de Controle de Frame fornecido para objeções comuns
- [ ] Notas de entrega com gatilhos de hot cognition
- [ ] Camada Psicológica aplicada — princípios de Cialdini mapeados por slide
- [ ] Alavancas de Blair Warren ativadas ao longo do arco do pitch
