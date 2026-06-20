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
  - "[ ] Transformação central e pilha de valor definidas"
  - "[ ] 3-5 bônus relevantes desenhados com garantia"
  - "[ ] Estratégia de ancoragem de preço e copy da pilha de oferta prontas"
---

# Tarefa: Criar Oferta

**ID da Tarefa:** COPY-007
**Versão:** 1.0.0
**Comando:** `*create-offer`
**Agente:** Dan Kennedy (dan-kennedy) ou Russell Brunson (russell-brunson)
**Objetivo:** Arquitetar uma oferta irresistível que maximize o valor percebido e elimine a resistência à compra.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto ou serviço central |
| audience | string | Prompt do usuário | Sim | Comprador-alvo com contexto de orçamento |
| price_range | string | Prompt do usuário | Não | Faixa de preço aceitável ou preço-alvo |
| delivery_method | string | Prompt do usuário | Não | Digital, físico, serviço, híbrido |
| competitors | list | Prompt do usuário | Não | Ofertas concorrentes no mercado |
| existing_assets | list | Prompt do usuário | Não | Bônus, conteúdos, ferramentas já disponíveis |
| business_model | string | Prompt do usuário | Não | Pagamento único, assinatura, high-ticket, low-ticket |

---

## Pré-condições

- Produto ou serviço central definido com a transformação clara que ele entrega
- Público-alvo identificado com contexto de disposição a pagar

---

## Fases de Execução

### Fase 1: Arquitetura de Valor
1. Defina a transformação central (estado antes para estado depois)
2. Identifique todos os componentes de valor que o produto entrega:
   - Resultado primário (a coisa principal que eles compram)
   - Resultados secundários (transformações bônus)
   - Velocidade do resultado (valor da compressão de tempo)
   - Redução de esforço (valor da facilidade)
   - Redução de risco (valor da segurança)
3. Calcule o "valor do resultado dos sonhos" — quanto eles pagariam se houvesse garantia?
4. Mapeie a pilha de valor do mais ao menos impactante

### Fase 2: Construção da Oferta
1. Estruture a oferta central com entregáveis claros
2. Desenhe a pilha de bônus (3-5 bônus):
   - Cada bônus deve resolver um problema relacionado ou acelerar o resultado
   - Atribua valores individuais em dinheiro a cada bônus
   - Ordene os bônus pelo valor percebido (o mais alto primeiro)
3. Elabore a garantia:
   - Escolha o tipo: dinheiro de volta, baseada em resultados, condicional, incondicional
   - Torne a garantia ousada o suficiente para ser um argumento de venda por si só
   - Defina a janela e as condições da garantia
4. Construa o elemento de urgência/escassez:
   - Escolha o tipo: limitado por tempo, limitado por quantidade, limitado por bônus, aumento de preço
   - Garanta que a escassez seja real ou crível
5. Defina o preço usando ancoragem:
   - Estabeleça o preço "deveria custar" (valor total de tudo)
   - Mostre o preço "poderia custar" (desconto sobre o total)
   - Revele o preço real como uma fração do valor percebido

### Fase 3: Posicionamento da Oferta
1. Escreva a copy da pilha de oferta (como ela será apresentada nos materiais de venda)
2. Crie a seção de resumo "o que você recebe"
3. Escreva a declaração de garantia como copy independente
4. Desenvolva a narrativa de justificativa de preço
5. Crie elementos de tratamento de objeções embutidos na estrutura da oferta
6. Defina o CTA exato e o que acontece depois que eles clicam/ligam

---

## Formato de Saída

```markdown
## Arquitetura de Oferta: {Product Name}

**Transformação Central:** {antes} → {depois}
**Preço:** {price}
**Valor Percebido Total:** {value}
**Razão Valor-para-Preço:** {X}:1
**Garantia:** {tipo + janela}

---

### Oferta Central
{Descrição do que eles recebem — o produto/serviço principal}

### Pilha de Bônus

| # | Nome do Bônus | O Que Faz | Valor |
|---|------------|-------------|-------|
| 1 | {nome} | {resolve X} | ${valor} |
| 2 | {nome} | {acelera Y} | ${valor} |
| 3 | {nome} | {remove o atrito Z} | ${valor} |

### Garantia
{Declaração completa da garantia — ousada, específica, com reversão de risco}

### Urgência/Escassez
{O que cria a pressão de tempo — e por que ela é crível}

### Apresentação do Preço
- Valor Total: ${total}
- Não ${high_anchor}
- Nem mesmo ${mid_anchor}
- Hoje: ${actual_price}
- {Opção de parcelamento se aplicável}

### Copy da Pilha de Oferta
{Bloco de copy pronto para uso em página de vendas/VSL/e-mail}

### Tratamento de Objeções Embutido na Oferta
| Objeção | Como a Oferta a Resolve |
|-----------|---------------------------|
```

---

## Condições de Veto

- NUNCA crie uma oferta sem garantia — não ter garantia significa pedir que o comprador carregue todo o risco
- NUNCA adicione bônus não relacionados à transformação central
- NUNCA use escassez falsa — ela deve ser real ou, no mínimo, crível
- NUNCA precifique sem antes ancorar ao valor percebido
- NUNCA deixe o CTA vago — especifique exatamente o que acontece em seguida

---

## Critérios de Conclusão

- [ ] Transformação central claramente definida
- [ ] Pilha de valor mapeada com valores individuais
- [ ] 3-5 bônus relevantes desenhados e valorados
- [ ] Garantia elaborada como argumento de venda
- [ ] Elemento de urgência/escassez definido
- [ ] Estratégia de ancoragem de preço completa
- [ ] Copy da pilha de oferta pronta para uso
- [ ] Tratamento de objeções embutido na estrutura da oferta
