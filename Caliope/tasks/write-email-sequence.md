---
task: writeEmailSequence()
responsavel: "@andre-chaperon"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: sequence_type
    tipo: enum
    origem: User Input
    obrigatorio: true

Saida:
  - campo: email_sequence
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Framework do tipo de sequência aplicado corretamente"
  - "[ ] Todos os emails escritos com duas linhas de assunto"
  - "[ ] Loops abertos plantados e resolvidos ao longo da sequência"
---

# Tarefa: Escrever Sequência de Emails

**ID da Tarefa:** COPY-004
**Versão:** 1.0.0
**Comando:** `*write-email-sequence`
**Agente:** Andre Chaperon (andre-chaperon) ou Ben Settle (ben-settle)
**Objetivo:** Escrever sequências de email que constroem relacionamento e impulsionam a ação por meio de narrativa seriada.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço sendo promovido |
| audience | string | Prompt do usuário | Sim | Perfil do assinante e seu estado emocional |
| sequence_type | enum | Prompt do usuário | Sim | soap-opera, daily, nurture, launch, welcome, cart-abandon |
| num_emails | number | Prompt do usuário | Não | Padrão por tipo: soap-opera=5, daily=7, nurture=10, launch=7, welcome=5, cart-abandon=3 |
| offer | object | Prompt do usuário | Não | Obrigatório para os tipos soap-opera e launch |
| brand_voice | string | Prompt do usuário | Não | Tom e personalidade do remetente |
| entry_point | string | Prompt do usuário | Não | Qual opt-in ou ação disparou esta sequência |

---

## Pré-condições

- Tipo de sequência selecionado com objetivo claro (vender, nutrir, integrar, recuperar)
- Dores e desejos da audiência identificados
- Para os tipos soap-opera e launch: a oferta deve estar definida

---

## Fases de Execução

### Fase 1: Arquitetura da Sequência
1. Defina o arco narrativo ao longo de toda a sequência
2. Mapeie o propósito email a email usando o framework da sequência:
   - **Soap Opera (Novela):** Gancho → História de Fundo → Epifania → Benefícios Ocultos → Urgência
   - **Daily (Diário):** Emails de valor independentes com vendas suaves embutidas
   - **Nurture (Nutrição):** Educação → Confiança → Autoridade → Ponte para a oferta
   - **Launch (Lançamento):** Antecipação → Valor → Prova Social → Tratamento de Objeções → Abertura do Carrinho → FAQ → Fechamento do Carrinho
   - **Welcome (Boas-vindas):** Gratidão → Vitória Rápida → História → Expectativas → Próximo Passo
   - **Cart Abandon (Carrinho Abandonado):** Lembrete → Tratamento de Objeção → Urgência Final
3. Atribua um tema emocional por email
4. Planeje os loops abertos entre os emails (técnica característica de Chaperon)

### Fase 2: Escrever Cada Email
1. Escreva as linhas de assunto (2 opções por email, uma baseada em curiosidade, outra baseada em benefício)
2. Escreva o texto de prévia (preview) que complementa (não repete) a linha de assunto
3. Escreva o corpo do email seguindo a regra de um-email-uma-ideia
4. Abra cada email com um gancho que conquiste a próxima frase
5. Feche cada email com um loop aberto (no meio da sequência) ou um CTA (emails de venda)
6. Mantenha uma voz consistente do início ao fim — o leitor deve sentir que conhece o remetente
7. Inclua linhas de P.S. nos emails de venda

### Fase 3: Otimização da Sequência
1. Revise o arco emocional — a tensão se constrói ao longo da sequência?
2. Verifique se os loops abertos são plantados e resolvidos nos momentos certos
3. Cheque se nenhum email parece independente — cada um deve referenciar o fio da história
4. Adicione recomendações de tempo de envio (intervalos entre emails)
5. Sugira gatilhos de segmentação (cliques em links, aberturas, não-aberturas)

---

## Formato de Saída

```markdown
## Sequência de Emails: {Nome}

**Tipo:** {sequence_type}
**Emails:** {quantidade}
**Objetivo:** {vender / nutrir / integrar / recuperar}
**Audiência:** {audiência}
**Arco Narrativo:** {descrição do arco em uma linha}

---

### Email 1: {Título}
**Envio:** {tempo — ex.: Imediatamente, Dia 1}
**Assunto A:** {opção 1 de linha de assunto}
**Assunto B:** {opção 2 de linha de assunto}
**Prévia:** {texto de prévia}
**Propósito:** {propósito na sequência}
**Loop Aberto:** {qual loop é plantado ou resolvido}

{Corpo completo do email}

P.S. {se aplicável}

---

### Email 2: {Título}
...

---

### Mapa da Sequência

| # | Título | Propósito | Emoção | Loop Aberto | CTA |
|---|-------|---------|---------|-----------|-----|

### Cronograma de Envio
{Recomendações de tempo com justificativa}

### Gatilhos de Segmentação
{Gatilhos comportamentais e recomendações de ramificação}
```

---

## Condições de Veto

- NUNCA escreva emails que possam ser lidos em qualquer ordem nas sequências soap-opera — a serialização é obrigatória
- NUNCA envie um email de venda antes de pelo menos 2 emails de valor/história nas sequências de nutrição
- NUNCA escreva linhas de assunto com mais de 50 caracteres
- NUNCA pule os loops abertos nas sequências soap-opera — eles são o motor do engajamento
- NUNCA use o mesmo tom emocional em emails consecutivos

---

## Critérios de Conclusão

- [ ] Framework do tipo de sequência aplicado corretamente
- [ ] Todos os emails escritos com duas linhas de assunto
- [ ] Arco narrativo constrói tensão ao longo da sequência
- [ ] Loops abertos plantados e resolvidos adequadamente
- [ ] Cada email segue a regra de um-email-uma-ideia
- [ ] Recomendações de tempo de envio fornecidas
- [ ] Gatilhos de segmentação sugeridos
- [ ] Voz de marca consistente mantida do início ao fim
