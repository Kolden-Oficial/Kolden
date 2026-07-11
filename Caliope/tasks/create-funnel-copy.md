---
task: createFunnelCopy()
responsavel: "@russell-brunson"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: funnel_type
    tipo: enum
    origem: User Input
    obrigatorio: true

Saida:
  - campo: funnel_copy_system
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Arquitetura do funil mapeada com todas as páginas e e-mails"
  - "[ ] Todo o copy de páginas e e-mails escrito conforme os padrões de formato"
  - "[ ] Matemática do funil calculada com as taxas de conversão esperadas"
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
tipo: nota
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
relacionado:
  - "[[Caliope/tasks/_indice|_indice]]"
---

# Tarefa: Criar Copy de Funil

**ID da Tarefa:** COPY-M-009
**Versão:** 2.0.0
**Comando:** `*create-funnel-copy`
**Agente:** Russell Brunson (russell-brunson)
**Propósito:** Escrever o copy de um sistema de funil inteiro — do opt-in ao upsell — com psicologia da persuasão entrelaçada por todo o caminho.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto central e linha de produtos |
| audience | string | Prompt do usuário | Sim | Avatar-alvo com jornada de compra |
| funnel_type | enum | Prompt do usuário | Sim | lead-magnet, tripwire, webinar, challenge, high-ticket-application, product-launch |
| offer_stack | object | Prompt do usuário | Sim | Oferta de front-end, OTO1, OTO2, downsell se aplicável |
| traffic_source | string | Prompt do usuário | Não | Canal de tráfego primário |
| price_points | list | Prompt do usuário | Não | Preço em cada etapa do funil |

---

## Pré-condições

- Tipo de funil selecionado com estratégia de monetização clara
- Stack de oferta definido com ao menos front-end e um upsell
- A linha de produtos suporta a arquitetura do funil

---

## Referência de Campeões

Estude estes funis campeões do mundo real antes de escrever:

1. **Funil de Livro "Free + Shipping" da ClickFunnels** (Russell Brunson) — Opt-in -> Livro tripwire -> Curso OTO -> Coaching high-ticket, a value ladder em ação
2. **"Invisible Selling Machine" da DigitalMarketer** (Ryan Deiss) — Funil tripwire com escada de upsell por e-mail automatizada, fluxo de e-mail-para-OTO de manual
3. **Funil de Webinar "67 Steps" do Tai Lopez** — Registro de webinar -> Replay -> Oferta central -> Upsell high-ticket, escalado para 8 dígitos
4. **Product Launch Formula do Jeff Walker** — Conteúdo pré-lançamento -> Abertura de carrinho -> Sequência de urgência, pioneiro do modelo de funil de lançamento
5. **Funil "Free Report" da Agora Financial** — Opt-in de relatório gratuito -> Upsell de newsletter -> Consultoria high-ticket de backend, o arquétipo de funil de DR de maior longevidade

---

## Fases de Execução

### Fase 1: Arquitetura do Funil
1. Mapeie o fluxo completo do funil com páginas e e-mails:
   - **Funil de Lead Magnet:** Opt-in -> Agradecimento -> E-mails de Nutrição -> Página de Vendas
   - **Funil Tripwire:** Opt-in -> Oferta Tripwire -> OTO1 -> OTO2 -> Agradecimento
   - **Funil de Webinar:** Registro -> Confirmação -> E-mails de Lembrete -> Webinar -> Replay -> Vendas
   - **Funil de Desafio:** Registro -> E-mails Diários -> Páginas Diárias -> Oferta
   - **High-Ticket:** Aplicação -> VSL/Estudo de Caso -> Agendamento de Call -> Follow-up
   - **Lançamento de Produto:** Conteúdo Pré-Lançamento -> Abertura de Carrinho -> Meio do Carrinho -> Fechamento de Carrinho
2. Defina a "ponte da epifania" (epiphany bridge) para cada ponto de transição
3. Mapeie a progressão da value ladder ao longo do funil
4. Identifique onde cada nível de consciência entra no funil

### Fase 2: Camada Psicológica
1. Mapeie os princípios de Cialdini ao longo das etapas do funil:
   - **Opt-in/Registro:** Reciprocidade (valor gratuito em troca do e-mail)
   - **Agradecimento / Tripwire:** Compromisso (uma pequena compra constrói consistência para compras maiores)
   - **E-mails de nutrição:** Afinidade (histórias pessoais), Autoridade (credenciais)
   - **Página de vendas / OTO:** Prova Social (depoimentos, números), Escassez (oferta limitada)
   - **Páginas de upsell:** Consistência (eles já compraram — este é o próximo passo lógico)
   - **Pós-compra:** Unidade (bem-vindo à tribo)
2. Aplique as alavancas de Blair Warren em pontos-chave de transição:
   - Opt-in: Encorajar sonhos (prometa a transformação)
   - Tripwire: Aliviar medos (baixo risco, alto valor)
   - OTO: Confirmar suspeitas (você precisa desta peça extra para ter sucesso)
   - Fechamento de carrinho: Atirar pedras nos inimigos (o jeito antigo que te decepcionou)
3. Garanta que cada página do funil ative ao menos 2 princípios psicológicos distintos

### Fase 3: Escrever o Copy das Páginas
1. Escreva a página de opt-in/registro (veja o formato de write-landing-page.md)
2. Escreva a página de confirmação/agradecimento com surpresa e momentum
3. Escreva a página de vendas ou as páginas de OTO:
   - Mantenha a continuidade a partir da página anterior
   - Cada página deve se sustentar sozinha caso seja acessada diretamente
   - Páginas de OTO: curtas, diretas, com enquadramento "espere — antes de você ir"
4. Escreva a página de downsell (se aplicável): versão reduzida, preço menor
5. Escreva a página de agradecimento/acesso: confirme a compra, defina expectativas, reduza o remorso do comprador

### Fase 4: Escrever os E-mails do Funil
1. Escreva o e-mail de confirmação (entrega imediata)
2. Escreva os e-mails de nutrição/ponte entre as páginas (veja o formato de write-email-sequence.md)
3. Escreva os e-mails de carrinho abandonado (se for funil de e-commerce)
4. Escreva os e-mails de onboarding pós-compra
5. Garanta que o copy de e-mail e o de página sejam consistentes em voz e promessa

### Fase 5: Notas de Otimização do Funil
1. Mapeie as taxas de conversão esperadas em cada etapa
2. Identifique os "pontos de vazamento" críticos onde a desistência é provável
3. Forneça as prioridades de teste A/B para cada etapa do funil
4. Sugira copy de retargeting para o abandono de cada etapa
5. Calcule a matemática do funil (tráfego necessário para a receita-alvo)

---

## Formato de Saída

```markdown
## Sistema de Copy de Funil: {Nome do Funil}

**Tipo:** {funnel_type}
**Etapas:** {quantidade}
**Value Ladder:** {front-end} -> {OTO1} -> {OTO2}
**Receita-Alvo por Lead:** ${X}

### Arquitetura de Persuasão
| Etapa do Funil | Princípios de Cialdini | Alavancas de Warren |
|-------------|--------------------|--------------  |
| Opt-in | {princípios} | {alavancas} |
| Tripwire/OTO | {princípios} | {alavancas} |
| Página de Vendas | {princípios} | {alavancas} |
| Pós-Compra | {princípios} | {alavancas} |

---

### Mapa do Funil

{Representação visual em texto do fluxo do funil}

---

### Página 1: {Nome da Página}
**Tipo:** {opt-in / vendas / OTO / agradecimento}
**Objetivo:** {ação de conversão}
{Copy completo da página conforme o formato de landing page}

---

### Página 2-N: ...

---

### Sequência de E-mails: {Nome}
{E-mails conforme o formato de sequência de e-mails}

---

### Matemática do Funil

| Etapa | CVR Esperada | Tráfego Necessário | Receita |
|-------|-------------|----------------|---------|

### Prioridades de Teste A/B
| Prioridade | Etapa | Elemento a Testar | Hipótese |
|----------|-------|----------------|------------|

### Copy de Retargeting
{Copy para cada etapa de abandono}
```

---

## Condições de Veto

- NUNCA construa um funil sem uma progressão clara de value ladder
- NUNCA escreva páginas de OTO que contradigam a promessa da oferta de front-end
- NUNCA pule a página de agradecimento — ela previne o remorso do comprador e prepara a próxima oferta
- NUNCA crie um funil com mais de 2 upsells sem confirmação do usuário
- NUNCA ignore a matemática — todo funil deve ter taxas de conversão projetadas

---

## Critérios de Conclusão

- [ ] Arquitetura do funil mapeada com todas as páginas e e-mails
- [ ] Todo o copy de páginas escrito conforme o formato de landing page
- [ ] Todas as sequências de e-mail escritas conforme o formato de e-mail
- [ ] Matemática do funil calculada com as taxas de conversão esperadas
- [ ] Prioridades de teste A/B definidas para cada etapa
- [ ] Copy de retargeting fornecido para as etapas de abandono
- [ ] Voz e promessa consistentes em todo o funil
- [ ] Progressão da value ladder é lógica e convincente
- [ ] Camada Psicológica aplicada — princípios de Cialdini mapeados por etapa do funil
- [ ] Alavancas de Blair Warren ativadas em pontos-chave de transição
