---
task: writeSalesLetter()
responsavel: "@gary-halbert"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: offer
    tipo: object
    origem: User Input
    obrigatorio: true

Saida:
  - campo: sales_letter
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Grande promessa e motor emocional identificados"
  - "[ ] Carta segue a estrutura AIDA com prova do início ao fim"
  - "[ ] CTA aparece no mínimo 3 vezes com seções de P.S."
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
tipo: nota
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
relacionado:
  - "[[Caliope/tasks/_indice|_indice]]"
---

# Task: Escrever Carta de Vendas

**Task ID:** COPY-M-002
**Version:** 2.0.0
**Command:** `*write-sales-letter`
**Agent:** Gary Halbert (gary-halbert)
**Purpose:** Escrever uma carta de vendas long-form completa que vende por meio de storytelling, conexão emocional e psicologia da persuasão em camadas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| product | string | Prompt do usuário | Sim | Produto/serviço com características e benefícios principais |
| audience | string | Prompt do usuário | Sim | Audiência-alvo com pontos de dor e desejos |
| offer | object | Prompt do usuário | Sim | Preço, garantia, bônus, elementos de urgência |
| awareness_level | enum | Prompt do usuário | Não | Os 5 níveis de Schwartz — padrão é problem-aware |
| proof_elements | list | Prompt do usuário | Não | Depoimentos, estatísticas, credenciais, estudos de caso |
| tone | string | Prompt do usuário | Não | Padrão é conversacional, pessoal, urgente |
| word_count_target | number | Prompt do usuário | Não | Padrão é 2000-4000 palavras |

---

## Pré-condições

- Benefícios do produto claramente articulados (não apenas características)
- Ao menos um elemento de prova disponível (depoimento, estatística ou credencial)
- Estrutura da oferta definida (preço, garantia, bônus)

---

## Referência de Campeões

Estude estas cartas de vendas campeãs do mundo real antes de escrever:

1. **"The Boron Letters"** (Gary Halbert) — Voz pessoal de pai-para-filho, venda movida por história com autenticidade emocional
2. **"The Wall Street Journal Letter"** (Martin Conroy) — Parábola dos dois jovens, rodou por 28 anos gerando US$ 2 bi+, aula magna de leads problem-aware
3. **"The Coat of Arms Letter"** (Gary Halbert) — Oferta simples, tom pessoal, milhões de cópias impressas com lucro
4. **"End of America"** (Mike Palmer / Stansberry) — Long-form movido por medo com empilhamento massivo de prova, urgência política
5. **"Amazing Diet Secret of a Desperate Housewife"** (Gary Halbert) — Lead de história, curiosidade, identificação, revelação do mecanismo

---

## Fases de Execução

### Fase 1: Pesquisa e Estratégia
1. Identifique a emoção única mais poderosa que move o prospecto
2. Defina a "grande promessa" — um resultado transformador
3. Mapeie o estado atual vs. o estado desejado do prospecto
4. Identifique o mecanismo único que torna este produto diferente
5. Catalogue todos os elementos de prova e ranqueie por poder persuasivo
6. Determine a objeção principal que precisa ser superada

### Fase 2: Estruture a Carta
1. Esboce usando a estrutura clássica de Halbert:
   - Atenção: Headline + abertura que agarra pela garganta
   - Interesse: História ou revelação chocante que constrói intriga
   - Desejo: Benefícios, prova e projeção do futuro (future-pacing)
   - Ação: Oferta, garantia, urgência e CTA claro
2. Planeje o arco emocional: curiosidade para medo para esperança para urgência
3. Identifique 3-5 hooks de transição para manter o "escorregador"
4. Posicione os elementos de prova estrategicamente (credibilidade no início, prova social no meio, reversão de risco no final)

### Fase 3: Camada Psicológica
1. Mapeie os 7 princípios de Cialdini na estrutura da carta:
   - **Reciprocidade:** Valor ou insight gratuito dado antes do pedido
   - **Compromisso/Coerência:** Pequenos sins que constroem até o grande sim
   - **Prova Social:** Depoimentos, números, linguagem de "milhares de pessoas"
   - **Autoridade:** Credenciais, menções na mídia, endossos de especialistas
   - **Afinidade:** História pessoal, identificação, luta compartilhada
   - **Escassez:** Tempo limitado, vagas limitadas, aumento de preço
   - **Unidade:** Identidade compartilhada, linguagem de "pessoas como nós"
2. Aplique as 5 alavancas de Blair Warren — garanta que ao menos 3 estejam presentes:
   - Encorajar sonhos (projetar a transformação no futuro)
   - Justificar fracassos (não é culpa sua — o sistema estava quebrado)
   - Acalmar medos (a garantia remove todo o risco)
   - Confirmar suspeitas (você sempre soube que X era verdade)
   - Jogar pedras nos inimigos (os gurus / a indústria / o establishment)
3. Documente quais princípios aparecem em cada seção

### Fase 4: Escreva o Rascunho
1. Escreva a headline e o lead (primeiras 300 palavras) — isto é 80% da batalha
2. Construa a seção de história com narrativa pessoal e identificável
3. Faça a transição da história para a revelação do produto com um parágrafo "ponte"
4. Empilhe benefícios usando bullets (estilo fascinations)
5. Distribua prova do início ao fim — nunca passe mais de 3 parágrafos sem prova
6. Escreva a seção da oferta: ancoragem de preço, bônus, garantia
7. Feche com urgência, escassez e um único CTA claro
8. Adicione seções de P.S. (a jogada característica de Halbert) — reafirme a oferta + adicione um motivo bônus

### Fase 5: Polimento e Revisão
1. Leia em voz alta — corte qualquer coisa que quebre o fluxo conversacional
2. Verifique se toda afirmação é sustentada por prova
3. Garanta que a carta possa ser compreendida por um aluno do 7º ano
4. Confira se o CTA aparece pelo menos 3 vezes
5. Confirme que a garantia está posicionada com destaque e afirmada com ousadia

---

## Formato de Saída

```markdown
## Carta de Vendas: {Nome do Produto}

**Alvo:** {audiência}
**Consciência:** {nível}
**Contagem de Palavras:** {contagem}
**Motor Emocional:** {emoção principal}
**Grande Promessa:** {promessa em uma linha}

### Arquitetura de Persuasão
| Seção | Princípios de Cialdini | Alavancas de Warren |
|-------|------------------------|---------------------|
| Lead | {princípios} | {alavancas} |
| História | {princípios} | {alavancas} |
| Benefícios | {princípios} | {alavancas} |
| Fechamento | {princípios} | {alavancas} |

---

### [HEADLINE]
{headline}

### [SUB-HEADLINE]
{sub-headline}

### [CORPO DA CARTA]
{carta de vendas completa com quebras de parágrafo naturais}

### [SEÇÕES DE P.S.]
P.S. {primeiro pós-escrito}
P.P.S. {segundo pós-escrito}

---

### Notas do Redator
- **Tipo de lead:** {história, proclamação, predição, segredo, problema-solução}
- **Prova-chave usada:** {lista}
- **Objeção principal abordada:** {objeção + como}
- **Princípios de Cialdini usados:** {lista com localizações}
- **Alavancas de Warren ativadas:** {lista com localizações}
- **Split test sugerido:** {elemento a testar}
```

---

## Condições de Veto

- NUNCA escreva sem uma oferta definida (preço + garantia no mínimo)
- NUNCA abra com o nome do produto para audiências unaware/problem-aware
- NUNCA escreva uma carta sem ao menos um elemento de prova
- NUNCA use voz passiva no CTA
- NUNCA entregue sem seções de P.S. — elas são o segundo elemento mais lido

---

## Critérios de Conclusão

- [ ] Grande promessa e motor emocional identificados
- [ ] Carta segue a estrutura AIDA com o estilo pessoal de Halbert
- [ ] Headline e lead são peças convincentes por si só
- [ ] Elementos de prova entrelaçados do início ao fim (não despejados em uma única seção)
- [ ] Oferta claramente declarada com ancoragem de preço e garantia
- [ ] Ao menos 2 seções de P.S. incluídas
- [ ] CTA aparece no mínimo 3 vezes
- [ ] Legibilidade no nível do 7º ano ou abaixo
- [ ] Camada Psicológica aplicada — princípios de Cialdini mapeados por seção
- [ ] Alavancas de Blair Warren identificadas e ativadas
- [ ] Notas do redator incluídas com justificativa estratégica
