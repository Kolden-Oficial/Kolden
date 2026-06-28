---
task: writeLandingPage()
responsavel: "@joe-sugarman"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: page_type
    tipo: enum
    origem: User Input
    obrigatorio: true

Saida:
  - campo: landing_page_copy
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Objetivo único de conversão definido e mantido"
  - "[ ] Todas as seções escritas conforme a arquitetura do tipo de página"
  - "[ ] CTA aparece pelo menos 3 vezes com texto orientado à ação"
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
---

# Task: Escrever Copy de Landing Page

**Task ID:** COPY-M-008
**Version:** 2.0.0
**Command:** `*write-landing-page`
**Agent:** Joe Sugarman (joe-sugarman)
**Purpose:** Escrever copy de landing page que cria um escorregador imparável da headline até o CTA, reforçado pela psicologia da persuasão.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| product | string | Prompt do usuário | Sim | Produto/serviço sendo oferecido |
| audience | string | Prompt do usuário | Sim | Perfil do visitante-alvo |
| page_type | enum | Prompt do usuário | Sim | opt-in, sales, webinar-reg, waitlist, product, checkout |
| offer | object | Prompt do usuário | Sim | O que o visitante recebe ao agir |
| traffic_source | string | Prompt do usuário | Não | De onde os visitantes vêm (anúncios, e-mail, orgânico, social) |
| awareness_level | enum | Prompt do usuário | Não | Nível de consciência do tráfego de entrada |
| page_length | string | Prompt do usuário | Não | curto (opt-in), médio (webinar), longo (vendas) — autodetectado pelo tipo |

---

## Pré-condições

- Tipo de página selecionado com objetivo de conversão claro
- Oferta definida (mesmo para páginas opt-in — o que eles recebem?)
- Fonte de tráfego identificada para calibrar consciência e mensagem

---

## Referência de Campeões

Estude estas landing pages campeãs do mundo real antes de escrever:

1. **Homepage da Basecamp** — Simples, movida por benefício, carregada de prova social, tom conversacional, CTA único repetido
2. **Páginas de Vendas Long-Form do Ramit Sethi** (IWT) — Densas em prova, tratamento de objeções movido por FAQ, voz de personalidade do início ao fim
3. **Opt-In Pages do ClickFunnels** (Russell Brunson) — Copy mínima, hook claro, enquadramento de oferta "grátis + frete"
4. **Advertorials da Agora Financial** — Landing pages movidas por história disfarçadas de conteúdo editorial, conversores massivos de tráfego frio
5. **Páginas Copyhackers da Joanna Wiebe** — Copy otimizada para CRO, maestria em micro-copy, disciplina de teste A/B no texto dos botões

---

## Fases de Execução

### Fase 1: Estratégia da Página
1. Defina o objetivo único de conversão (uma página, uma ação)
2. Identifique o estado de espírito do visitante quando ele chega:
   - De anúncio frio: cético, curioso, baixa confiança
   - De e-mail: morno, parcialmente confiante, esperando o que foi prometido
   - De orgânico: modo pesquisa, comparando opções
3. Mapeie o "escorregador" — cada elemento deve puxar em direção ao CTA
4. Decida a arquitetura da página com base no tipo:
   - Opt-in: Headline -> Bullets de benefício -> Formulário -> CTA (curto)
   - Vendas: AIDA completo com seções de prova (longo)
   - Registro de webinar: Headline -> O que você vai aprender -> Credibilidade do palestrante -> Data/Hora -> CTA (médio)

### Fase 2: Camada Psicológica
1. Mapeie os princípios de Cialdini nas seções da página:
   - **Herói:** Autoridade (credenciais) ou Prova Social (número de usuários)
   - **Problema:** Afinidade (compreensão compartilhada da luta deles)
   - **Solução:** Compromisso (pequeno acordo antes do grande pedido)
   - **Prova:** Prova Social (depoimentos, logos, números)
   - **Oferta:** Reciprocidade (valor do bônus excede o preço) + Escassez (oferta limitada)
   - **CTA:** Unidade ("junte-se a nós") + Compromisso (texto do botão como micro-compromisso)
2. Aplique as alavancas de Blair Warren:
   - Seção herói: Encorajar sonhos ou Confirmar suspeitas
   - Seção problema: Justificar fracassos
   - Seção solução: Acalmar medos
   - Seção CTA: Encorajar sonhos (estado futuro após o clique)
3. Projete o micro-copy abaixo dos botões usando linguagem de redução de medo (Cialdini: reversão de risco)

### Fase 3: Escrita Seção por Seção
1. **Seção Herói:** Headline + sub-headline + CTA do herói
   - A headline deve fazer 80% da venda
   - A sub-headline esclarece ou amplifica
   - CTA do herói para visitantes prontos para agir
2. **Seção Problema:** Agite a dor atual
   - Use linguagem com "você" — torne pessoal
   - 3-5 pontos de dor específicos que a audiência reconhece
3. **Seção Solução:** Apresente o produto/mecanismo
   - Faça a ponte do problema à solução de forma natural
   - Nomeie o mecanismo ou a metodologia
4. **Seção Benefícios:** Empilhe benefícios com especificidade
   - Use ícones ou checkmarks para escaneabilidade
   - Cada benefício responde "o que eu ganho com isso?"
5. **Seção Prova:** Prova social e credibilidade
   - Depoimentos, logos, estatísticas, menções na mídia
   - Posicione estrategicamente (não tudo em um único bloco)
6. **Seção Oferta:** O que eles recebem (se for página de vendas)
   - Empilhe o valor com entregáveis claros
   - Inclua bônus, garantia, preço
7. **Seção FAQ:** Trate as objeções restantes
   - 5-7 perguntas que abordem hesitações reais
8. **CTA Final:** Último empurrão com urgência

### Fase 4: Otimização de Conversão
1. Garanta que o CTA apareça no mínimo 3 vezes na página
2. Escreva todo texto de botão como primeira pessoa orientada à ação ("Quero Meu Guia Grátis")
3. Adicione micro-copy abaixo dos botões para reduzir a ansiedade
4. Revise a página em busca de "pontos de saída" — qualquer coisa que possa perder o visitante
5. Adicione considerações específicas para mobile (parágrafos mais curtos, alvos de CTA maiores)

---

## Formato de Saída

```markdown
## Copy de Landing Page: {Nome da Página}

**Tipo:** {page_type}
**Objetivo:** {ação única de conversão}
**Fonte de Tráfego:** {fonte}
**Nível de Consciência:** {nível}

### Arquitetura de Persuasão
| Seção | Princípios de Cialdini | Alavancas de Warren |
|-------|------------------------|---------------------|
| Herói | {princípios} | {alavancas} |
| Problema | {princípios} | {alavancas} |
| Solução | {princípios} | {alavancas} |
| Prova | {princípios} | {alavancas} |
| Oferta | {princípios} | {alavancas} |
| CTA | {princípios} | {alavancas} |

---

### [SEÇÃO HERÓI]
**Headline:** {headline}
**Sub-headline:** {sub-headline}
**Botão de CTA:** {texto do botão}
**Micro-copy:** {texto abaixo do botão}

### [SEÇÃO PROBLEMA]
{Copy de agitação do problema}

### [SEÇÃO SOLUÇÃO]
{Copy de introdução da solução}

### [SEÇÃO BENEFÍCIOS]
{Benefícios com notas de formatação}

### [SEÇÃO PROVA]
{Placeholders de depoimentos e copy de prova social}

### [SEÇÃO OFERTA]
{Empilhamento de valor e precificação — se for página de vendas}

### [SEÇÃO FAQ]
{5-7 pares de Pergunta/Resposta}

### [SEÇÃO CTA FINAL]
{Argumento de fechamento + CTA}

---

### Notas de Conversão
- **Contagem de CTAs:** {X posicionamentos}
- **Comprimento estimado da página:** {profundidade de scroll}
- **Principais redutores de ansiedade:** {lista}
- **Considerações para mobile:** {lista}
- **Princípios de Cialdini por seção:** {resumo}
```

---

## Condições de Veto

- NUNCA dê à página mais de um objetivo de conversão
- NUNCA escreva uma landing page sem um CTA do herói acima da dobra
- NUNCA use links de navegação — o único elemento clicável deve ser o CTA
- NUNCA escreva respostas de FAQ que introduzam novas objeções
- NUNCA ignore a fonte de tráfego — páginas de tráfego frio são fundamentalmente diferentes das de tráfego morno

---

## Critérios de Conclusão

- [ ] Objetivo único de conversão definido e mantido do início ao fim
- [ ] Todas as seções escritas conforme a arquitetura do tipo de página
- [ ] CTA aparece pelo menos 3 vezes
- [ ] Texto do botão em primeira pessoa orientada à ação
- [ ] Elementos de prova posicionados estrategicamente
- [ ] FAQ trata objeções reais
- [ ] Considerações para mobile anotadas
- [ ] Escorregador mantido — sem pontos de saída
- [ ] Camada Psicológica aplicada — princípios de Cialdini mapeados por seção
- [ ] Alavancas de Blair Warren identificadas por seção
