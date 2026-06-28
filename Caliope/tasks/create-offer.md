---
task: createOffer()
responsavel: "@dan-kennedy"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: audience
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: offer_architecture
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Transformação central e value stack definidos"
  - "[ ] 3-5 bônus relevantes projetados com garantia"
  - "[ ] Estratégia de ancoragem de preço e copy do offer stack prontos"
  - "[ ] Value Equation de Hormozi aplicada"
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
---

# Tarefa: Criar Oferta

**ID da Tarefa:** COPY-M-007
**Versão:** 2.0.0
**Comando:** `*create-offer`
**Agente:** Dan Kennedy (dan-kennedy), Russell Brunson (russell-brunson), ou Alex Hormozi (alex-hormozi)
**Propósito:** Arquitetar uma oferta irresistível que maximize o valor percebido e elimine a resistência à compra, validada contra a Value Equation de Hormozi.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto ou serviço central |
| audience | string | Prompt do usuário | Sim | Comprador-alvo com contexto de orçamento |
| price_range | string | Prompt do usuário | Não | Faixa de preço aceitável ou preço-alvo |
| delivery_method | string | Prompt do usuário | Não | Digital, físico, serviço, híbrido |
| competitors | list | Prompt do usuário | Não | Ofertas concorrentes no mercado |
| existing_assets | list | Prompt do usuário | Não | Bônus, conteúdo, ferramentas já disponíveis |
| business_model | string | Prompt do usuário | Não | Pagamento único, assinatura, high-ticket, low-ticket |

---

## Pré-condições

- Produto ou serviço central definido com a transformação clara que ele entrega
- Público-alvo identificado com contexto de disposição a pagar

---

## Referência de Campeões

Estude estas ofertas campeãs do mundo real antes de escrever:

1. **Framework Grand Slam de "$100M Offers"** (Alex Hormozi) — Value Equation: Dream Outcome x Perceived Likelihood / Time Delay x Effort & Sacrifice
2. **Columbia House "12 CDs por 1 Centavo"** — A oferta irresistível original: valor percebido massivo, risco zero, backend de assinatura
3. **Domino's "30 Minutos ou É de Graça"** — A garantia COMO a oferta, removeu a objeção nº 1 (velocidade), construiu um império
4. **ClickFunnels "Livro Grátis + Frete"** (Russell Brunson) — Oferta tripwire que adquire clientes com lucro, leva a um backend de $297-$2497
5. **Kit "Magnetic Marketing" do Dan Kennedy** — Oferta de kit físico com alto valor percebido, front-end autoliquidável para backend high-ticket

---

## Fases de Execução

### Fase 1: Arquitetura de Valor
1. Defina a transformação central (estado-antes para estado-depois)
2. Identifique todos os componentes de valor que o produto entrega:
   - Resultado primário (a coisa principal que eles compram)
   - Resultados secundários (transformações bônus)
   - Velocidade do resultado (valor da compressão de tempo)
   - Redução de esforço (valor da facilidade)
   - Redução de risco (valor da segurança)
3. Calcule o "valor do dream outcome" — quanto eles pagariam se houvesse garantia?
4. Mapeie o value stack do mais impactante ao menos impactante

### Fase 2: Value Equation de Hormozi
1. Pontue a oferta em todas as 4 dimensões da Value Equation:
   - **Dream Outcome (maximizar):** Quão desejável é o resultado final? (1-10)
   - **Perceived Likelihood of Achievement (maximizar):** Quão provável eles acreditam que vão consegui-lo? (1-10)
   - **Time Delay (minimizar):** Quanto tempo até verem resultados? (1-10, menor é melhor)
   - **Effort & Sacrifice (minimizar):** Quanto trabalho/dor é exigido? (1-10, menor é melhor)
2. Fórmula: Value = (Dream Outcome x Perceived Likelihood) / (Time Delay x Effort & Sacrifice)
3. Identifique qual dimensão é a mais fraca e engenharize a oferta para melhorá-la:
   - Baixa likelihood? Adicione prova, garantia, estudos de caso
   - Alto time delay? Adicione bônus de início rápido, elementos de ação rápida
   - Alto esforço? Adicione componentes feitos-para-você (done-for-you), templates, atalhos
4. Repontue após a construção da oferta para verificar a melhoria

### Fase 3: Camada Psicológica
1. Mapeie os princípios de Cialdini na estrutura da oferta:
   - **Reciprocidade:** O stack de bônus entrega mais do que o esperado
   - **Compromisso:** Preços graduados ou planos de pagamento (pequeno sim -> grande sim)
   - **Prova Social:** "X pessoas já compraram" ou depoimentos no stack
   - **Autoridade:** Endossos de especialistas ou credenciamento do criador da oferta
   - **Escassez:** Bônus limitados, preço early-bird, vagas de inscrição limitadas
   - **Unidade:** "Isto é só para [grupo de identidade]"
2. Aplique as alavancas de Blair Warren:
   - Encorajar sonhos: A transformação pinta um futuro irresistível
   - Justificar fracassos: Soluções passadas falharam porque lhes faltava o componente X (que esta oferta tem)
   - Aliviar medos: A garantia remove TODO o risco do comprador
   - Confirmar suspeitas: "Você sempre soube que o segredo era mais simples do que faziam parecer"
3. Garanta que a garantia ative tanto Cialdini (reversão de risco) quanto Warren (aliviar medos)

### Fase 4: Construção da Oferta
1. Estruture a oferta central com entregáveis claros
2. Projete o stack de bônus (3-5 bônus):
   - Cada bônus deve resolver um problema relacionado ou acelerar o resultado
   - Atribua valores individuais em dinheiro a cada bônus
   - Ordene os bônus por valor percebido (o maior primeiro)
3. Elabore a garantia:
   - Escolha o tipo: garantia de devolução do dinheiro, baseada em resultados, condicional, incondicional
   - Torne a garantia ousada o suficiente para ser um argumento de venda por si só
   - Defina a janela e as condições da garantia
4. Construa o elemento de urgência/escassez:
   - Escolha o tipo: tempo limitado, quantidade limitada, bônus limitado, aumento de preço
   - Garanta que a escassez seja real ou crível
5. Defina o preço usando ancoragem:
   - Estabeleça o preço "deveria ser" (valor total de tudo)
   - Mostre o preço "poderia ser" (desconto sobre o total)
   - Revele o preço real como uma fração do valor percebido

### Fase 5: Posicionamento da Oferta
1. Escreva o copy do offer stack (como ele será apresentado nos materiais de vendas)
2. Crie a seção de resumo "o que você recebe"
3. Escreva a declaração de garantia como copy autônomo
4. Desenvolva a narrativa de justificativa de preço
5. Crie elementos de tratamento de objeções embutidos na estrutura da oferta
6. Defina o CTA exato e o que acontece depois que eles clicam/ligam

---

## Formato de Saída

```markdown
## Arquitetura da Oferta: {Nome do Produto}

**Transformação Central:** {antes} -> {depois}
**Preço:** {preço}
**Valor Percebido Total:** {valor}
**Razão Valor-Preço:** {X}:1
**Garantia:** {tipo + janela}

### Pontuação da Value Equation de Hormozi
| Dimensão | Pontuação (1-10) | Anotações |
|-----------|-------------|-------|
| Dream Outcome | X | {nota} |
| Perceived Likelihood | X | {nota} |
| Time Delay (menor=melhor) | X | {nota} |
| Effort & Sacrifice (menor=melhor) | X | {nota} |
| **Value Score** | **{calculado}** | |

### Arquitetura de Persuasão
| Elemento da Oferta | Princípios de Cialdini | Alavancas de Warren |
|--------------|--------------------|--------------  |
| Oferta Central | {princípios} | {alavancas} |
| Bônus | {princípios} | {alavancas} |
| Garantia | {princípios} | {alavancas} |
| Escassez | {princípios} | {alavancas} |
| Revelação de Preço | {princípios} | {alavancas} |

---

### Oferta Central
{Descrição do que eles recebem — o produto/serviço principal}

### Stack de Bônus

| # | Nome do Bônus | O Que Ele Faz | Valor | Dimensão de Hormozi Melhorada |
|---|------------|-------------|-------|---------------------------|
| 1 | {nome} | {resolve X} | ${valor} | {likelihood / time / effort} |
| 2 | {nome} | {acelera Y} | ${valor} | {likelihood / time / effort} |
| 3 | {nome} | {remove o atrito Z} | ${valor} | {likelihood / time / effort} |

### Garantia
{Declaração completa da garantia — ousada, específica, reversora de risco}

### Urgência/Escassez
{O que cria pressão de tempo — e por que é crível}

### Apresentação de Preço
- Valor Total: ${total}
- Não ${ancora_alta}
- Nem mesmo ${ancora_media}
- Hoje: ${preco_real}
- {Opção de plano de pagamento se aplicável}

### Copy do Offer Stack
{Bloco de copy pronto para uso em página de vendas/VSL/e-mail}

### Tratadores de Objeções Embutidos na Oferta
| Objeção | Como a Oferta a Aborda | Psicologia Usada |
|-----------|---------------------------|-----------------|
```

---

## Condições de Veto

- NUNCA crie uma oferta sem garantia — sem garantia significa pedir ao comprador que carregue todo o risco
- NUNCA adicione bônus não relacionados à transformação central
- NUNCA use escassez falsa — ela deve ser real ou, no mínimo, crível
- NUNCA precifique sem ancorar primeiro ao valor percebido
- NUNCA deixe o CTA vago — especifique exatamente o que acontece em seguida

---

## Critérios de Conclusão

- [ ] Transformação central claramente definida
- [ ] Value stack mapeado com valores individuais
- [ ] Value Equation de Hormozi pontuada com todas as 4 dimensões
- [ ] 3-5 bônus relevantes projetados e valorados
- [ ] Cada bônus mapeado para uma dimensão de Hormozi que ele melhora
- [ ] Garantia elaborada como argumento de venda
- [ ] Elemento de urgência/escassez definido
- [ ] Estratégia de ancoragem de preço completa
- [ ] Copy do offer stack pronto para uso
- [ ] Tratadores de objeções embutidos na estrutura da oferta
- [ ] Camada Psicológica aplicada — princípios de Cialdini mapeados por elemento
- [ ] Alavancas de Blair Warren ativadas ao longo da oferta
