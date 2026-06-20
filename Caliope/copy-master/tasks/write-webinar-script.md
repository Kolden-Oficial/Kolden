---
task: writeWebinarScript()
responsavel: "@russell-brunson"
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
  - campo: webinar_script
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Framework do Perfect Webinar totalmente executado (todas as 5 seções)"
  - "[ ] Estrutura dos 3 Segredos com pontes de epifania que quebram crenças"
  - "[ ] Sequência de stack e fechamento completa com ancoragem de preço"
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
---

# Task: Escrever Roteiro de Webinar

**Task ID:** COPY-M-012
**Version:** 2.0.0
**Command:** `*write-webinar-script`
**Agent:** Russell Brunson (russell-brunson)
**Purpose:** Escrever um roteiro de webinar completo usando o framework Perfect Webinar com psicologia da persuasão em camadas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| product | string | Prompt do usuário | Sim | Produto/serviço com a transformação central |
| audience | string | Prompt do usuário | Sim | Perfil do participante-alvo com crenças atuais e objeções |
| offer | object | Prompt do usuário | Sim | Preço, garantia, bônus, elementos de urgência |
| webinar_type | enum | Prompt do usuário | Não | live, automated, hybrid — padrão é live |
| duration_target | string | Prompt do usuário | Não | 60min (padrão), 90min (estendido), 45min (condensado) — padrão é 60min |
| three_secrets | list | Prompt do usuário | Não | Segredos/mitos pré-definidos para quebrar, ou o agente vai derivá-los |
| origin_story | string | Prompt do usuário | Não | História de origem pessoal do palestrante para a ponte de epifania |

---

## Pré-condições

- Transformação do produto claramente definida (estado antes/depois)
- Estrutura da oferta completa com preço, garantia e empilhamento de bônus
- Elementos de credibilidade do palestrante disponíveis (credenciais, resultados, história)
- Ao menos 3 crenças falsas que a audiência tem e que precisam ser quebradas

---

## Referência de Campeões

Estude estes webinars campeões do mundo real antes de escrever:

1. **Perfect Webinar "Funnel Hacking Secrets"** (Russell Brunson) — A execução definitiva do framework Perfect Webinar, vendeu o ClickFunnels para milhões
2. **Webinar "Expert Secrets"** (Russell Brunson) — Meta-webinar que ensina o framework de webinar enquanto o executa, aula magna de demonstração de framework
3. **Webinar de Inscrição do UPW do Tony Robbins** — Empilhamento de autoridade + prova social, venda em pico de estado emocional, fechamento high-ticket
4. **"List Builder Society" da Amy Porterfield** — Webinar carregado de educação com transição suave para a oferta, abordagem de confiança em primeiro lugar para audiências mornas
5. **Webinar do "Método E5" do Todd Brown** — Webinar movido por Big Idea, carregado de mecanismo, segmentação de audiência sofisticada

---

## Fases de Execução

### Fase 1: Configuração do Framework Perfect Webinar

1. **Introdução (5 min):** Hook + credibilidade + promessa da sessão
   - Grande promessa: "Ao final desta apresentação, você vai saber exatamente como..."
   - Credibilidade do palestrante: Posicionamento rápido de autoridade
   - Regras do webinar: "Faça anotações, fique até o fim para a oferta especial"
2. **The One Thing — A Única Coisa (5 min):** Defina a nova oportunidade única
   - Não uma oferta de melhoria (versão melhor do que eles já fazem)
   - Uma NOVA oportunidade (um veículo inteiramente diferente para o resultado desejado)
   - Enquadre a mudança: "O motivo de você não ter alcançado X não é por causa de Y — é porque você precisa de Z"
3. **The 3 Secrets — Os 3 Segredos (30 min):** Três segmentos que quebram crenças
   - Segredo 1: Quebre a crença sobre o VEÍCULO (o método/abordagem)
   - Segredo 2: Quebre a crença INTERNA (a capacidade pessoal deles)
   - Segredo 3: Quebre a crença EXTERNA (circunstâncias externas)
   - Cada segredo segue a estrutura da História de Ponte de Epifania (Epiphany Bridge Story)
4. **The Stack — O Empilhamento (10 min):** Empilhamento de valor e apresentação da oferta
   - Apresente cada componente da oferta individualmente
   - Slide de empilhamento construindo o valor total visualmente
   - Revelação de preço com ancoragem
   - Garantia
   - Empilhamento de bônus com escassez
5. **The Close — O Fechamento (10 min):** Empurrão final com urgência
   - Fechamento de "duas escolhas": mudar ou continuar igual
   - FAQ / tratamento de objeções
   - CTA final com instruções exatas
   - Contagem regressiva / reforço de escassez

### Fase 2: Histórias de Ponte de Epifania

Para cada um dos 3 Segredos, construa uma História de Ponte de Epifania (Epiphany Bridge Story):
1. **História de Fundo:** Monte a cena — onde você estava antes da descoberta?
2. **Jornada:** O que aconteceu que levou à descoberta?
3. **Descoberta da Nova Oportunidade:** O momento da epifania
4. **Framework/Estratégia:** O sistema que surgiu da descoberta
5. **Conquista:** Os resultados que se seguiram
6. **Ponte:** Conecte a epifania à situação da audiência

### Fase 3: Camada Psicológica

1. Mapeie os princípios de Cialdini na estrutura do webinar:
   - **Introdução:** Autoridade (credenciais), Prova Social (número de participantes, resultados)
   - **The One Thing:** Compromisso (peça pequenos acordos — "Isso faz sentido?")
   - **Segredo 1:** Afinidade (a história pessoal cria conexão)
   - **Segredo 2:** Unidade (identidade compartilhada — "Eu era igualzinho a você")
   - **Segredo 3:** Reciprocidade (valor gratuito massivo durante o ensino)
   - **The Stack:** Escassez (bônus limitados, aumento de preço)
   - **The Close:** Coerência (eles concordaram com cada segredo, então a oferta é o próximo passo lógico)
2. Aplique as alavancas de Blair Warren ao longo do webinar:
   - Encorajar sonhos: Do início ao fim, especialmente na projeção do futuro
   - Justificar fracassos: Segredo 1 (o veículo antigo estava errado, não você)
   - Acalmar medos: Segredo 2 (você CONSEGUE fazer isso — aqui está a prova)
   - Confirmar suspeitas: Segredo 3 (você estava certo de que X estava te segurando)
   - Jogar pedras nos inimigos: Do início ao fim (a indústria, os gurus, o jeito antigo)
3. Construa micro-compromissos do início ao fim — "Digite SIM no chat se..."
4. Garanta que cada transição entre seções tenha um pico emocional

### Fase 4: Escrita do Roteiro

1. Escreva o roteiro completo seção por seção com notas do palestrante
2. Inclua marcações de direção de slide entre colchetes: [SLIDE: ...]
3. Inclua marcações de interação com a audiência: [POLL: ...], [CHAT: ...], [Q&A: ...]
4. Escreva linhas de transição entre as seções para manter o momento
5. Inclua marcadores de tempo para o ritmo
6. Escreva o guia de tratamento de Q&A com respostas a objeções pré-carregadas
7. Escreva o esboço da sequência de e-mails de follow-up pós-webinar (3-5 e-mails)

### Fase 5: Notas de Produção

1. Contagem de slides e resumo de conteúdo por seção
2. Principais momentos visuais (gráficos, screenshots de prova, slide de stack)
3. Mapa do arco emocional ao longo do webinar completo
4. Estratégia de replay sugerida (prazo, mensagem de escassez)
5. Métricas a acompanhar: taxa de comparecimento, engajamento, cliques na oferta, conversão

---

## Formato de Saída

```markdown
## Roteiro de Webinar: {Título do Webinar}

**Framework:** Perfect Webinar (Brunson)
**Duração:** {X} minutos
**Audiência:** {audiência}
**The One Thing:** {declaração da nova oportunidade}
**Oferta:** {resumo da oferta}

### Arquitetura de Persuasão
| Seção | Duração | Princípios de Cialdini | Alavancas de Warren |
|-------|---------|------------------------|---------------------|
| Introdução | 5 min | {princípios} | {alavancas} |
| The One Thing | 5 min | {princípios} | {alavancas} |
| Segredo 1 | 10 min | {princípios} | {alavancas} |
| Segredo 2 | 10 min | {princípios} | {alavancas} |
| Segredo 3 | 10 min | {princípios} | {alavancas} |
| The Stack | 10 min | {princípios} | {alavancas} |
| The Close | 10 min | {princípios} | {alavancas} |

---

### INTRODUÇÃO (0:00 - 5:00)
{Roteiro com marcações de slide e notas do palestrante}
[SLIDE: Título + Credibilidade do Palestrante]

### THE ONE THING (5:00 - 10:00)
{Enquadramento da nova oportunidade}
[SLIDE: Oportunidade Antiga vs Nova Oportunidade]

### SEGREDO 1: {Título} — Quebrando a Crença sobre o Veículo (10:00 - 20:00)
**Crença Falsa:** {o que eles acreditam atualmente}
**História de Ponte de Epifania:** {arco da história}
**Nova Crença:** {o que eles vão acreditar depois}
{Roteiro completo}
[SLIDE: Visual do Segredo 1]

### SEGREDO 2: {Título} — Quebrando a Crença Interna (20:00 - 30:00)
**Crença Falsa:** {o que eles acreditam sobre si mesmos}
**História de Ponte de Epifania:** {arco da história}
**Nova Crença:** {o que eles vão acreditar depois}
{Roteiro completo}
[SLIDE: Visual do Segredo 2]

### SEGREDO 3: {Título} — Quebrando a Crença Externa (30:00 - 40:00)
**Crença Falsa:** {o que eles acreditam sobre fatores externos}
**História de Ponte de Epifania:** {arco da história}
**Nova Crença:** {o que eles vão acreditar depois}
{Roteiro completo}
[SLIDE: Visual do Segredo 3]

### THE STACK (40:00 - 50:00)
{Apresentação do empilhamento de valor com total acumulado}
[SLIDE: Slide de Stack — construindo valor]
[SLIDE: Revelação de Preço]
[SLIDE: Garantia]
[SLIDE: Empilhamento de Bônus]

### THE CLOSE (50:00 - 60:00)
{Fechamento de duas escolhas + FAQ + CTA final}
[SLIDE: Dois Caminhos — Mudar vs Igual]
[SLIDE: CTA com URL/botão]

---

### Sequência de E-mails Pós-Webinar (Esboço)
| E-mail | Envio | Assunto | Propósito |
|--------|-------|---------|-----------|
| 1 | Imediatamente | Link do replay | Recapitulação + CTA |
| 2 | Dia 2 | Depoimento | Empurrão de prova social |
| 3 | Dia 3 | FAQ | Tratamento de objeções |
| 4 | Dia 4 | Última chance | Fechamento de escassez |

### Notas de Produção
- **Total de slides:** {contagem}
- **Principais momentos de interação:** {lista}
- **Arco emocional:** Curiosidade -> Esperança -> Crença -> Desejo -> Urgência
- **Estratégia de replay:** {descrição}
- **Métricas a acompanhar:** {lista}
```

---

## Condições de Veto

- NUNCA pule a estrutura dos 3 Segredos — ela é o motor central de persuasão
- NUNCA apresente a oferta antes de quebrar todas as 3 crenças
- NUNCA escreva um webinar sem Histórias de Ponte de Epifania — dados sozinhos não convertem
- NUNCA feche sem um frame de "duas escolhas" — ele cria urgência psicológica
- NUNCA pule o slide de Stack — o acúmulo visual de valor é crítico para a ancoragem de preço

---

## Critérios de Conclusão

- [ ] Framework do Perfect Webinar totalmente executado (todas as 5 seções)
- [ ] The One Thing define claramente uma nova oportunidade (não melhoria)
- [ ] 3 Segredos com tipos de crença distintos (veículo, interna, externa)
- [ ] Cada Segredo tem uma História de Ponte de Epifania completa
- [ ] Slide de Stack constrói o valor total antes da revelação de preço
- [ ] Fechamento inclui frame de duas escolhas, FAQ e CTA final
- [ ] Marcações de direção de slide incluídas do início ao fim
- [ ] Marcadores de tempo fornecidos para o ritmo
- [ ] Sequência de e-mails pós-webinar esboçada
- [ ] Notas de produção com métricas
- [ ] Camada Psicológica aplicada — princípios de Cialdini mapeados por seção
- [ ] Alavancas de Blair Warren ativadas ao longo do arco do webinar
