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
---

# Tarefa: Escrever Copy de Landing Page

**ID da Tarefa:** COPY-008
**Versão:** 1.0.0
**Comando:** `*write-landing-page`
**Agente:** Joe Sugarman (joe-sugarman)
**Objetivo:** Escrever copy de landing page que cria um escorregador escorregadio (slippery slide) imparável do título até o CTA.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço sendo oferecido |
| audience | string | Prompt do usuário | Sim | Perfil do visitante-alvo |
| page_type | enum | Prompt do usuário | Sim | opt-in, sales, webinar-reg, waitlist, product, checkout |
| offer | object | Prompt do usuário | Sim | O que o visitante recebe ao agir |
| traffic_source | string | Prompt do usuário | Não | De onde vêm os visitantes (anúncios, email, orgânico, social) |
| awareness_level | enum | Prompt do usuário | Não | Nível de consciência do tráfego que chega |
| page_length | string | Prompt do usuário | Não | curta (opt-in), média (webinar), longa (vendas) — detectada automaticamente pelo tipo |

---

## Pré-condições

- Tipo de página selecionado com objetivo de conversão claro
- Oferta definida (mesmo para páginas de opt-in — o que eles recebem?)
- Fonte de tráfego identificada para calibrar a consciência e a mensagem

---

## Fases de Execução

### Fase 1: Estratégia da Página
1. Defina o objetivo único de conversão (uma página, uma ação)
2. Identifique o estado de espírito do visitante quando ele chega:
   - De anúncio frio: cético, curioso, baixa confiança
   - De email: aquecido, com alguma confiança, esperando o que foi prometido
   - De orgânico: modo de pesquisa, comparando opções
3. Mapeie o "escorregador escorregadio" — cada elemento deve puxar em direção ao CTA
4. Decida a arquitetura da página com base no tipo:
   - Opt-in: Título → Bullets de benefício → Formulário → CTA (curta)
   - Vendas: AIDA completo com seções de prova (longa)
   - Registro de webinar: Título → O que você vai aprender → Credibilidade do palestrante → Data/Hora → CTA (média)
   - **Catálogo de seções (core + suporte), templates estruturais (fraco vs forte) e banco de CTA:**
     ver `data/estrutura-de-landing-page.md`.
   - **Transições naturais e tells de texto "cara de IA":** ver `data/transicoes-naturais.md` (aplicar na escrita do corpo).

### Fase 2: Escrita Seção por Seção
1. **Seção Hero:** Título + subtítulo + CTA hero
   - O título deve fazer 80% da venda
   - O subtítulo esclarece ou amplifica
   - O CTA hero é para visitantes prontos para agir
2. **Seção de Problema:** Agite a dor atual
   - Use a linguagem do "você" — torne pessoal
   - 3-5 dores específicas que a audiência reconhece
3. **Seção de Solução:** Apresente o produto/mecanismo
   - Faça a ponte do problema para a solução de forma natural
   - Nomeie o mecanismo ou a metodologia
4. **Seção de Benefícios:** Empilhe benefícios com especificidade
   - Use ícones ou marcas de seleção para facilitar a leitura rápida
   - Cada benefício responde "o que eu ganho com isso?"
5. **Seção de Prova:** Prova social e credibilidade
   - Depoimentos, logotipos, estatísticas, menções na mídia
   - Posicione estrategicamente (não tudo em um único bloco)
6. **Seção de Oferta:** O que eles recebem (se for página de vendas)
   - Empilhe o valor com entregáveis claros
   - Inclua bônus, garantia e preço
7. **Seção de FAQ:** Trate as objeções restantes
   - 5-7 perguntas que abordem hesitações reais
8. **CTA Final:** Último empurrão com urgência

### Fase 3: Otimização de Conversão
1. Garanta que o CTA apareça no mínimo 3 vezes na página
2. Escreva todo texto de botão como ação em primeira pessoa ("Quero Meu Guia Gratuito")
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

---

### [SEÇÃO HERO]
**Título:** {título}
**Subtítulo:** {subtítulo}
**Botão de CTA:** {texto do botão}
**Micro-copy:** {texto abaixo do botão}

### [SEÇÃO DE PROBLEMA]
{Copy de agitação do problema}

### [SEÇÃO DE SOLUÇÃO]
{Copy de introdução da solução}

### [SEÇÃO DE BENEFÍCIOS]
{Benefícios com notas de formatação}

### [SEÇÃO DE PROVA]
{Placeholders de depoimentos e copy de prova social}

### [SEÇÃO DE OFERTA]
{Empilhamento de valor e preço — se for página de vendas}

### [SEÇÃO DE FAQ]
{5-7 pares de Pergunta e Resposta}

### [SEÇÃO DE CTA FINAL]
{Argumento de fechamento + CTA}

---

### Notas de Conversão
- **Contagem de CTA:** {X posicionamentos}
- **Comprimento estimado da página:** {profundidade de rolagem}
- **Principais redutores de ansiedade:** {lista}
- **Considerações para mobile:** {lista}
```

---

## Condições de Veto

- NUNCA dê à página mais de um objetivo de conversão
- NUNCA escreva uma landing page sem um CTA hero acima da dobra (above the fold)
- NUNCA use links de navegação — o único elemento clicável deve ser o CTA
- NUNCA escreva respostas de FAQ que introduzam novas objeções
- NUNCA ignore a fonte de tráfego — páginas para tráfego frio são fundamentalmente diferentes das de tráfego quente

---

## Critérios de Conclusão

- [ ] Objetivo único de conversão definido e mantido do início ao fim
- [ ] Todas as seções escritas conforme a arquitetura do tipo de página
- [ ] CTA aparece pelo menos 3 vezes
- [ ] Texto do botão é ação em primeira pessoa
- [ ] Elementos de prova posicionados estrategicamente
- [ ] FAQ trata objeções reais
- [ ] Considerações para mobile anotadas
- [ ] Escorregador escorregadio mantido — sem pontos de saída
