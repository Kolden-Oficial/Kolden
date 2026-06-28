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
  - "[ ] Framework do tipo de sequência corretamente aplicado"
  - "[ ] Todos os e-mails escritos com linhas de assunto duplas"
  - "[ ] Loops abertos plantados e resolvidos ao longo da sequência"
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
---

# Task: Escrever Sequência de E-mails

**Task ID:** COPY-M-004
**Version:** 2.0.0
**Command:** `*write-email-sequence`
**Agent:** Andre Chaperon (andre-chaperon) ou Ben Settle (ben-settle)
**Purpose:** Escrever sequências de e-mail que constroem relacionamento e impulsionam a ação por meio de storytelling serializado e psicologia da persuasão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| product | string | Prompt do usuário | Sim | Produto/serviço sendo promovido |
| audience | string | Prompt do usuário | Sim | Perfil do assinante e estado emocional |
| sequence_type | enum | Prompt do usuário | Sim | soap-opera, daily, nurture, launch, welcome, cart-abandon |
| num_emails | number | Prompt do usuário | Não | Padrões por tipo: soap-opera=5, daily=7, nurture=10, launch=7, welcome=5, cart-abandon=3 |
| offer | object | Prompt do usuário | Não | Obrigatório para os tipos soap-opera e launch |
| brand_voice | string | Prompt do usuário | Não | Tom e personalidade do remetente |
| entry_point | string | Prompt do usuário | Não | Qual opt-in ou ação disparou esta sequência |

---

## Pré-condições

- Tipo de sequência selecionado com objetivo claro (vender, nutrir, integrar, recuperar)
- Pontos de dor e desejos da audiência identificados
- Para os tipos soap-opera e launch: a oferta precisa estar definida

---

## Referência de Campeões

Estude estas sequências de e-mail campeãs do mundo real antes de escrever:

1. **Soap Opera Sequences do Andre Chaperon** (AutoResponder Madness) — O padrão-ouro do storytelling serializado por e-mail com loops abertos aninhados
2. **Daily Email Style do Ben Settle** (Email Players) — E-mails diários anti-guru, movidos por personalidade, que vendem sem vender
3. **"4 Day Cash Machine" do Frank Kern** — Sequência de urgência em 4 e-mails que gerou milhões em 4 dias, estrutura de e-mail de lançamento de manual
4. **Welcome Sequence do Ryan Deiss / DigitalMarketer** — Série de doutrinação que constrói confiança em 5 e-mails antes de qualquer pitch
5. **Cart Close Emails do Ry Schwartz** (Agora Financial) — Sequências emocionais movidas por prazo que combinam urgência com mudança de crença

---

## Fases de Execução

### Fase 1: Arquitetura da Sequência
1. Defina o arco narrativo ao longo da sequência completa
2. Mapeie o propósito e-mail por e-mail usando o framework da sequência:
   - **Soap Opera:** Hook -> História de Fundo -> Epifania -> Benefícios Ocultos -> Urgência
   - **Daily:** E-mails de valor independentes com vendas suaves embutidas
   - **Nurture:** Educação -> Confiança -> Autoridade -> Ponte para a oferta
   - **Launch:** Antecipação -> Valor -> Prova Social -> Tratamento de Objeções -> Abertura do Carrinho -> FAQ -> Fechamento do Carrinho
   - **Welcome:** Gratidão -> Vitória Rápida -> História -> Expectativas -> Próximo Passo
   - **Cart Abandon:** Lembrete -> Tratamento de Objeção -> Urgência Final
3. Atribua um tema emocional por e-mail
4. Planeje loops abertos entre os e-mails (a técnica característica do Chaperon)

### Fase 2: Camada Psicológica
1. Mapeie os princípios de Cialdini ao longo do arco da sequência:
   - **E-mails iniciais:** Reciprocidade (valor gratuito), Afinidade (histórias pessoais)
   - **E-mails do meio:** Prova Social (depoimentos), Autoridade (credenciais)
   - **E-mails finais:** Escassez (prazo), Compromisso (eles investiram tempo lendo)
   - **Ao longo de toda a sequência:** Unidade (identidade e valores compartilhados)
2. Aplique as alavancas de Blair Warren por e-mail:
   - Welcome/Nurture: Encorajar sonhos, Acalmar medos
   - E-mails de história: Justificar fracassos, Confirmar suspeitas
   - E-mails de venda: Jogar pedras nos inimigos (o jeito antigo), Encorajar sonhos (o jeito novo)
3. Garanta que cada e-mail ative pelo menos 1 princípio de Cialdini
4. Marque cada e-mail com seu principal motor psicológico

### Fase 3: Escrever Cada E-mail
1. Escreva as linhas de assunto (2 opções por e-mail, uma baseada em curiosidade, uma baseada em benefício)
2. Escreva o texto de preview que complemente (não repita) a linha de assunto
3. Escreva o corpo do e-mail seguindo a regra um-e-mail-uma-ideia
4. Abra cada e-mail com um hook que conquiste a próxima frase
5. Feche cada e-mail com um loop aberto (meio da sequência) ou um CTA (e-mails de venda)
6. Mantenha uma voz consistente do início ao fim — o leitor deve sentir que conhece o remetente
7. Inclua linhas de P.S. nos e-mails de venda

### Fase 4: Otimização da Sequência
1. Revise o arco emocional — a tensão cresce ao longo da sequência?
2. Verifique se os loops abertos são plantados e resolvidos nos momentos certos
3. Cheque se nenhum e-mail parece independente — cada um deve referenciar o fio condutor
4. Adicione recomendações de timing de envio (intervalos entre os e-mails)
5. Sugira gatilhos de segmentação (cliques em links, aberturas, não-aberturas)

---

## Formato de Saída

```markdown
## Sequência de E-mails: {Nome}

**Tipo:** {sequence_type}
**E-mails:** {contagem}
**Objetivo:** {vender / nutrir / integrar / recuperar}
**Audiência:** {audiência}
**Arco Narrativo:** {descrição do arco em uma linha}

### Mapa de Persuasão
| E-mail # | Princípio de Cialdini | Alavanca de Warren | Tema Emocional |
|----------|----------------------|--------------------|----------------|

---

### E-mail 1: {Título}
**Envio:** {timing — ex.: Imediatamente, Dia 1}
**Assunto A:** {opção 1 de linha de assunto}
**Assunto B:** {opção 2 de linha de assunto}
**Preview:** {texto de preview}
**Propósito:** {propósito na sequência}
**Loop Aberto:** {qual loop é plantado ou resolvido}
**Psicologia:** {princípio de Cialdini + alavanca de Warren}

{Corpo completo do e-mail}

P.S. {se aplicável}

---

### E-mail 2: {Título}
...

---

### Mapa da Sequência

| # | Título | Propósito | Emoção | Loop Aberto | CTA | Cialdini | Warren |
|---|--------|-----------|--------|-------------|-----|----------|--------|

### Cronograma de Envio
{Recomendações de timing com justificativa}

### Gatilhos de Segmentação
{Gatilhos comportamentais e recomendações de ramificação}
```

---

## Condições de Veto

- NUNCA escreva e-mails que possam ser lidos em qualquer ordem para sequências soap-opera — a serialização é obrigatória
- NUNCA envie um e-mail de venda antes de pelo menos 2 e-mails de valor/história em sequências nurture
- NUNCA escreva linhas de assunto com mais de 50 caracteres
- NUNCA pule os loops abertos em sequências soap-opera — eles são o motor do engajamento
- NUNCA use o mesmo tom emocional em e-mails consecutivos

---

## Critérios de Conclusão

- [ ] Framework do tipo de sequência corretamente aplicado
- [ ] Todos os e-mails escritos com linhas de assunto duplas
- [ ] Arco narrativo constrói tensão ao longo da sequência
- [ ] Loops abertos plantados e resolvidos de forma apropriada
- [ ] Cada e-mail segue a regra um-e-mail-uma-ideia
- [ ] Recomendações de timing de envio fornecidas
- [ ] Gatilhos de segmentação sugeridos
- [ ] Voz de marca consistente mantida do início ao fim
- [ ] Camada Psicológica aplicada — princípios de Cialdini mapeados por e-mail
- [ ] Alavancas de Blair Warren identificadas por e-mail
