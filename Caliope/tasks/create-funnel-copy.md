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
  - "[ ] Toda a copy de páginas e e-mails escrita conforme os padrões de formato"
  - "[ ] Matemática do funil calculada com as taxas de conversão esperadas"
---

# Tarefa: Criar Copy de Funil

**ID da Tarefa:** COPY-009
**Versão:** 1.0.0
**Comando:** `*create-funnel-copy`
**Agente:** Russell Brunson (russell-brunson)
**Objetivo:** Escrever a copy de um sistema de funil completo — do opt-in ao upsell.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto central e linha de produtos |
| audience | string | Prompt do usuário | Sim | Avatar-alvo com jornada de compra |
| funnel_type | enum | Prompt do usuário | Sim | lead-magnet, tripwire, webinar, challenge, high-ticket-application, product-launch |
| offer_stack | object | Prompt do usuário | Sim | Oferta de front-end, OTO1, OTO2, downsell se aplicável |
| traffic_source | string | Prompt do usuário | Não | Canal de tráfego principal |
| price_points | list | Prompt do usuário | Não | Preço em cada estágio do funil |

---

## Pré-condições

- Tipo de funil selecionado com estratégia de monetização clara
- Pilha de ofertas (offer stack) definida com pelo menos front-end e um upsell
- A linha de produtos sustenta a arquitetura do funil

---

## Fases de Execução

### Fase 1: Arquitetura do Funil
1. Mapeie o fluxo completo do funil com páginas e e-mails:
   - **Funil de Lead Magnet:** Opt-in → Obrigado → E-mails de Nutrição → Página de Vendas
   - **Funil Tripwire:** Opt-in → Oferta Tripwire → OTO1 → OTO2 → Obrigado
   - **Funil de Webinar:** Inscrição → Confirmação → E-mails de Lembrete → Webinar → Replay → Vendas
   - **Funil de Challenge:** Inscrição → E-mails Diários → Páginas Diárias → Oferta
   - **High-Ticket:** Aplicação → VSL/Estudo de Caso → Agendamento de Chamada → Follow-up
   - **Lançamento de Produto:** Conteúdo de Pré-Lançamento → Abertura de Carrinho → Meio de Carrinho → Fechamento de Carrinho
2. Defina a "ponte da epifania" (epiphany bridge) para cada ponto de transição
3. Mapeie a progressão da escada de valor (value ladder) ao longo do funil
4. Identifique onde cada nível de consciência entra no funil

### Fase 2: Escrever a Copy das Páginas
1. Escreva a página de opt-in/inscrição (ver o formato de write-landing-page.md)
2. Escreva a página de confirmação/obrigado com surpresa e momentum
3. Escreva a página de vendas ou páginas de OTO:
   - Mantenha a continuidade em relação à página anterior
   - Cada página deve funcionar sozinha caso seja acessada diretamente
   - Páginas de OTO: curtas, diretas, com o enquadramento "espere — antes de você ir"
4. Escreva a página de downsell (se aplicável): versão reduzida, preço menor
5. Escreva a página de obrigado/acesso: confirme a compra, defina expectativas, reduza o remorso do comprador

### Fase 3: Escrever os E-mails do Funil
1. Escreva o e-mail de confirmação (entrega imediata)
2. Escreva os e-mails de nutrição/ponte entre as páginas (ver o formato de write-email-sequence.md)
3. Escreva os e-mails de abandono de carrinho (se for um funil de e-commerce)
4. Escreva os e-mails de onboarding pós-compra
5. Garanta que a copy dos e-mails e das páginas seja consistente em voz e promessa

### Fase 4: Notas de Otimização do Funil
1. Mapeie as taxas de conversão esperadas em cada estágio
2. Identifique os "pontos de vazamento" críticos onde a evasão é provável
3. Forneça prioridades de teste A/B para cada estágio do funil
4. Sugira copy de retargeting para o abandono em cada estágio
5. Calcule a matemática do funil (tráfego necessário para a receita-alvo)

---

## Formato de Saída

```markdown
## Sistema de Copy de Funil: {Funnel Name}

**Tipo:** {funnel_type}
**Estágios:** {count}
**Escada de Valor:** {front-end} → {OTO1} → {OTO2}
**Receita-Alvo por Lead:** ${X}

---

### Mapa do Funil

{Representação visual em texto do fluxo do funil}

---

### Página 1: {Page Name}
**Tipo:** {opt-in / vendas / OTO / obrigado}
**Objetivo:** {ação de conversão}
{Copy completa da página conforme o formato de landing page}

---

### Página 2-N: ...

---

### Sequência de E-mails: {Name}
{E-mails conforme o formato de sequência de e-mails}

---

### Matemática do Funil

| Estágio | CVR Esperada | Tráfego Necessário | Receita |
|-------|-------------|----------------|---------|

### Prioridades de Teste A/B
| Prioridade | Estágio | Elemento a Testar | Hipótese |
|----------|-------|----------------|------------|

### Copy de Retargeting
{Copy para cada estágio de abandono}
```

---

## Condições de Veto

- NUNCA construa um funil sem uma progressão clara de escada de valor
- NUNCA escreva páginas de OTO que contradigam a promessa da oferta de front-end
- NUNCA pule a página de obrigado — ela previne o remorso do comprador e prepara a próxima oferta
- NUNCA crie um funil com mais de 2 upsells sem confirmação do usuário
- NUNCA ignore a matemática — todo funil deve ter taxas de conversão projetadas

---

## Critérios de Conclusão

- [ ] Arquitetura do funil mapeada com todas as páginas e e-mails
- [ ] Toda a copy das páginas escrita conforme o formato de landing page
- [ ] Todas as sequências de e-mail escritas conforme o formato de e-mail
- [ ] Matemática do funil calculada com as taxas de conversão esperadas
- [ ] Prioridades de teste A/B definidas para cada estágio
- [ ] Copy de retargeting fornecida para os estágios de abandono
- [ ] Voz e promessa consistentes em todo o funil
- [ ] A progressão da escada de valor é lógica e convincente
