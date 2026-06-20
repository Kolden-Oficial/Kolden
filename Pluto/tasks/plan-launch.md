---
task: planLaunch()
responsavel: "@hormozi-launch"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: offer
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: launchPlan
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Modelo de lançamento selecionado com justificativa"
  - "[ ] Cronograma mapeado com todas as fases"
  - "[ ] Modelo de receita calculado com cenários"
---

# Tarefa: Planejar Lançamento

**ID da Tarefa:** HORMOZI-006
**Versão:** 1.0.0
**Comando:** `*plan-launch`
**Agente:** Hormozi Launch (hormozi-launch)
**Propósito:** Desenhar uma estratégia de lançamento de produto que maximize a receita em um prazo comprimido.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto sendo lançado |
| offer | object | Prompt do usuário | Sim | Oferta completa (preço, bônus, garantia) |
| audience_size | number | Prompt do usuário | Sim | Público total alcançável (lista de email, seguidores, etc.) |
| launch_type | enum | Prompt do usuário | Não | seed, internal, partnership, paid — padrão é internal |
| timeline | string | Prompt do usuário | Não | Data ou janela de lançamento desejada |
| budget | number | Prompt do usuário | Não | Orçamento disponível para o lançamento |

---

## Pré-condições

- Oferta totalmente desenhada (idealmente via create-offer.md)
- Existe um público para o lançamento (lista, seguidores, comunidade ou orçamento de anúncios)
- Produto pronto ou que estará pronto até a data de lançamento

---

## Fases de Execução

### Fase 1: Arquitetura do Lançamento
1. Selecione o modelo de lançamento:
   - Seed Launch: Público pequeno, testar oferta, coletar depoimentos
   - Internal Launch: Lista de email e público existente
   - Partnership Launch: Afiliados e parceiros de JV
   - Paid Launch: Movido por anúncios com sequências de retargeting
2. Defina o cronograma do lançamento:
   - Pré-lançamento: 7-14 dias de aquecimento e antecipação
   - Lançamento: janela de 3-7 dias com o carrinho aberto
   - Pós-lançamento: 3-5 dias de follow-up e onboarding
3. Estabeleça a meta de receita com base no tamanho do público e na conversão esperada
4. Calcule o tráfego necessário e as taxas de conversão de trás para frente, a partir da meta de receita

### Fase 2: Sequência de Pré-lançamento
1. Desenhe o conteúdo de pré-lançamento (valor primeiro, gerando antecipação):
   - Dia 1-3: Conteúdo de consciência do problema
   - Dia 4-7: Conteúdo de educação sobre a solução
   - Dia 8-10: Conteúdo de prova e prova social
   - Dia 11-14: Antecipação e construção da lista de espera
2. Crie a sequência de emails de pré-lançamento
3. Desenhe o calendário de conteúdo de redes sociais
4. Construa o mecanismo de lista de espera ou early-bird
5. Crie o arco narrativo da "história do lançamento"

### Fase 3: Plano de Execução do Lançamento
1. Plano do dia de Abertura do Carrinho:
   - Sequência de emails (anúncio de abertura + 2 follow-ups)
   - Posts em redes sociais (anúncio + bastidores)
   - Checklist da página de vendas no ar
2. Plano de meio do carrinho:
   - Email de estudo de caso ou depoimento
   - FAQ abordando as principais objeções
   - Lembrete de bônus
3. Plano de Fechamento do Carrinho:
   - Email de aviso de 48 horas
   - Email de aviso de 24 horas
   - Email das horas finais (3 horas, 1 hora, fechamento)
   - Escalada de urgência nas redes sociais
4. Defina o mecanismo de escassez (quantidade, tempo, expiração de bônus)

### Fase 4: Pós-lançamento
1. Plano de agradecimento e onboarding para os compradores
2. Mensagem de "porta fechada" para os não compradores
3. Estratégia de coleta de resultados (para lançamentos futuros)
4. Métricas de debrief: receita, taxa de conversão, desempenho dos emails
5. Plano de transição para evergreen (se aplicável)

---

## Formato de Saída

```markdown
## Plano de Lançamento: {Nome do Produto}

**Tipo de Lançamento:** {tipo}
**Cronograma:** {datas}
**Meta de Receita:** ${X}
**Tamanho do Público:** {N}
**Taxa de Conversão Necessária:** {X}%

---

### Calendário do Lançamento

| Fase | Dias | Ações-chave |
|-------|------|-------------|
| Pré-lançamento | Dia 1-14 | {resumo} |
| Abertura do Carrinho | Dia 15-17 | {resumo} |
| Meio do Carrinho | Dia 18-19 | {resumo} |
| Fechamento do Carrinho | Dia 20-21 | {resumo} |
| Pós-lançamento | Dia 22-26 | {resumo} |

### Plano de Conteúdo de Pré-lançamento
| Dia | Conteúdo | Canal | Objetivo |
|-----|---------|---------|------|

### Sequência de Emails
| Dia | Email | Linha de Assunto | Propósito |
|-----|-------|-------------|---------|

### Checklist de Abertura do Carrinho
- [ ] {item}

### Modelo de Receita

| Métrica | Meta | Conservador | Agressivo |
|--------|--------|-------------|------------|
| Tráfego | {N} | {N} | {N} |
| Conversão | {X}% | {X}% | {X}% |
| Receita | ${X} | ${X} | ${X} |

### Plano de Pós-lançamento
{Onboarding, follow-up e transição para evergreen}
```

---

## Condições de Veto

- NUNCA lance sem uma sequência de pré-lançamento — lançamentos frios têm desempenho inferior
- NUNCA conduza um lançamento sem prazo final — o carrinho precisa fechar para criar urgência
- NUNCA lance sem um plano de follow-up para os não compradores
- NUNCA pule o modelo de receita — lançar sem metas é adivinhação
- NUNCA prometa resultados que você não consegue demonstrar com prova

---

## Critérios de Conclusão

- [ ] Modelo de lançamento selecionado com justificativa
- [ ] Cronograma mapeado com todas as fases
- [ ] Plano de conteúdo de pré-lançamento criado
- [ ] Sequência de emails esboçada para todas as fases
- [ ] Planos de execução de abertura/meio/fechamento do carrinho definidos
- [ ] Modelo de receita calculado com cenários
- [ ] Plano de pós-lançamento incluído
- [ ] Mecanismo de escassez definido
