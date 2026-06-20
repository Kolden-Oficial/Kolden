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
  - "[ ] Grande promessa e motivador emocional identificados"
  - "[ ] Carta segue a estrutura AIDA com prova do início ao fim"
  - "[ ] CTA aparece no mínimo 3 vezes com seções de P.S."
---

# Tarefa: Escrever Carta de Vendas

**ID da Tarefa:** COPY-002
**Versão:** 1.0.0
**Comando:** `*write-sales-letter`
**Agente:** Gary Halbert (gary-halbert)
**Objetivo:** Escrever uma carta de vendas completa em formato longo que vende por meio de narrativa e conexão emocional.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço com características e benefícios principais |
| audience | string | Prompt do usuário | Sim | Público-alvo com dores e desejos |
| offer | object | Prompt do usuário | Sim | Preço, garantia, bônus, elementos de urgência |
| awareness_level | enum | Prompt do usuário | Não | Os 5 níveis de Schwartz — padrão: problem-aware |
| proof_elements | list | Prompt do usuário | Não | Depoimentos, estatísticas, credenciais, estudos de caso |
| tone | string | Prompt do usuário | Não | Padrão: conversacional, pessoal, urgente |
| word_count_target | number | Prompt do usuário | Não | Padrão: 2000-4000 palavras |

---

## Pré-condições

- Benefícios do produto claramente articulados (não apenas características)
- Pelo menos um elemento de prova disponível (depoimento, estatística ou credencial)
- Estrutura da oferta definida (preço, garantia, bônus)

---

## Fases de Execução

### Fase 1: Pesquisa e Estratégia
1. Identifique a emoção mais poderosa que move o prospecto
2. Defina a "grande promessa" — um único resultado transformador
3. Mapeie o estado atual do prospecto vs. o estado desejado
4. Identifique o mecanismo único que torna este produto diferente
5. Catalogue todos os elementos de prova e classifique-os por poder persuasivo
6. Determine a principal objeção que precisa ser superada

### Fase 2: Estruturar a Carta
1. Esboce usando a estrutura clássica de Halbert:
   - Atenção: Título + abertura que agarra pela garganta
   - Interesse: História ou revelação chocante que constrói intriga
   - Desejo: Benefícios, prova e projeção do futuro (future-pacing)
   - Ação: Oferta, garantia, urgência e CTA claro
2. Planeje o arco emocional: curiosidade para medo para esperança para urgência
3. Identifique 3-5 ganchos de transição para manter o "escorregador escorregadio"
4. Posicione os elementos de prova estrategicamente (credibilidade no início, prova social no meio, reversão de risco no final)

### Fase 3: Escrever o Rascunho
1. Escreva o título e o lead (primeiras 300 palavras) — isto é 80% da batalha
2. Construa a seção de história com narrativa pessoal e identificável
3. Faça a transição da história para a revelação do produto com um parágrafo "ponte"
4. Empilhe benefícios usando bullets (estilo fascinações)
5. Distribua a prova em camadas ao longo do texto — nunca passe mais de 3 parágrafos sem prova
6. Escreva a seção de oferta: ancoragem de preço, bônus, garantia
7. Feche com urgência, escassez e um único CTA claro
8. Adicione seções de P.S. (movimento característico de Halbert) — reafirme a oferta + adicione um motivo bônus

### Fase 4: Polimento e Revisão
1. Leia em voz alta — corte qualquer coisa que quebre o fluxo conversacional
2. Verifique se toda afirmação é sustentada por prova
3. Garanta que a carta possa ser entendida por uma criança do 7º ano
4. Cheque se o CTA aparece pelo menos 3 vezes
5. Confirme que a garantia está em posição de destaque e declarada de forma ousada

---

## Formato de Saída

```markdown
## Carta de Vendas: {Nome do Produto}

**Alvo:** {audiência}
**Consciência:** {nível}
**Contagem de Palavras:** {quantidade}
**Motivador Emocional:** {emoção primária}
**Grande Promessa:** {promessa em uma linha}

---

### [TÍTULO]
{título}

### [SUBTÍTULO]
{subtítulo}

### [CORPO DA CARTA]
{carta de vendas completa com quebras naturais de parágrafo}

### [SEÇÕES DE P.S.]
P.S. {primeiro pós-escrito}
P.P.S. {segundo pós-escrito}

---

### Notas do Redator
- **Tipo de lead:** {história, proclamação, previsão, segredo, problema-solução}
- **Prova principal usada:** {lista}
- **Principal objeção tratada:** {objeção + como}
- **Teste de divisão sugerido:** {elemento a testar}
```

---

## Condições de Veto

- NUNCA escreva sem uma oferta definida (preço + garantia no mínimo)
- NUNCA abra com o nome do produto para audiências inconscientes/conscientes do problema
- NUNCA escreva uma carta sem pelo menos um elemento de prova
- NUNCA use voz passiva no CTA
- NUNCA entregue sem seções de P.S. — elas são o segundo elemento mais lido

---

## Critérios de Conclusão

- [ ] Grande promessa e motivador emocional identificados
- [ ] Carta segue a estrutura AIDA com o estilo pessoal de Halbert
- [ ] Título e lead são peças convincentes por si só
- [ ] Elementos de prova distribuídos ao longo do texto (não despejados em uma única seção)
- [ ] Oferta claramente declarada com ancoragem de preço e garantia
- [ ] Pelo menos 2 seções de P.S. incluídas
- [ ] CTA aparece no mínimo 3 vezes
- [ ] Legibilidade no nível do 7º ano ou abaixo
- [ ] Notas do redator incluídas com justificativa estratégica
