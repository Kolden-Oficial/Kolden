---
task: setupTracking()
responsavel: "@pixel-specialist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: platforms
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: website
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: trackingSetup
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Arquitetura de rastreamento mapeada com todas as plataformas"
  - "[ ] Hierarquia de eventos definida com parâmetros"
  - "[ ] Checklist de QA criado e testado"
---

# Tarefa: Configurar Rastreamento

**Task ID:** TRAFFIC-005
**Versão:** 1.0.0
**Comando:** `*setup-tracking`
**Agente:** Pixel Specialist (pixel-specialist)
**Propósito:** Projetar e documentar a configuração de rastreamento e atribuição para publicidade paga.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| platforms | list | Prompt do usuário | Sim | Plataformas de anúncio em uso (facebook, google, tiktok, etc.) |
| website | string | Prompt do usuário | Sim | URL do site e stack tecnológico (WordPress, Shopify, custom, etc.) |
| conversion_events | list | Prompt do usuário | Sim | Eventos-chave a rastrear (purchase, lead, signup, etc.) |
| funnel_pages | list | Prompt do usuário | Não | Páginas-chave no funil (landing, checkout, thank you) |
| current_tracking | string | Prompt do usuário | Não | Descrição da configuração de rastreamento existente |
| ecommerce | boolean | Prompt do usuário | Não | Se o site tem transações de e-commerce |

---

## Pré-condições

- Site acessível e editável (ou acesso ao tag manager disponível)
- Contas de plataforma de anúncio criadas com IDs de pixel/tag disponíveis
- Eventos de conversão definidos (o que conta como conversão)

---

## Fases de Execução

### Fase 1: Arquitetura de Rastreamento
1. Mapear o stack completo de rastreamento:
   - Tag Manager: Google Tag Manager, Meta Pixel Helper, nativo da plataforma
   - Pixels: Meta Pixel, Google Ads Tag, TikTok Pixel, LinkedIn Insight Tag
   - Analytics: Google Analytics 4, analytics da plataforma
   - Server-side: Conversions API (CAPI), conversões offline
2. Definir a hierarquia de eventos de conversão:
   - Primário: O principal resultado de negócio (purchase, envio de formulário de lead)
   - Secundário: Eventos de meio de funil (add to cart, initiate checkout, page view)
   - Micro: Eventos de engajamento (profundidade de rolagem, tempo na página, visualização de vídeo)
3. Mapear eventos para estágios do funil:
   - Page View → Visita à landing page
   - Lead → Envio de formulário ou opt-in
   - InitiateCheckout → Página de checkout alcançada
   - Purchase → Transação concluída
4. Documentar a estratégia de parâmetros UTM para atribuição

### Fase 2: Configuração Específica por Plataforma
1. Para cada plataforma, documentar os requisitos de configuração:
   - **Meta (Facebook/Instagram):**
     - Instalação do Base Pixel
     - Configuração da Conversions API (server-side)
     - Otimização da pontuação de Event Match Quality
     - Conversões personalizadas e eventos padrão
     - Verificação de domínio e mensuração agregada de eventos
   - **Google Ads:**
     - Instalação da Google Ads tag
     - Configuração de enhanced conversions
     - Conversion linker tag
     - Integração com GA4 para compartilhamento de público
   - **TikTok:**
     - Instalação do TikTok Pixel
     - Configuração da Events API
     - Tratamento do parâmetro Click ID
   - **LinkedIn:**
     - Instalação do Insight Tag
     - Configuração de rastreamento de conversão
2. Fornecer instruções de configuração passo a passo para cada plataforma
3. Definir o procedimento de teste para verificar se cada evento dispara corretamente

### Fase 3: Estratégia de Atribuição
1. Definir o modelo de atribuição para relatórios:
   - Last-click: Simples, mas enviesado para o fundo do funil
   - Data-driven: Recomendado quando o volume suporta
   - Multi-touch: Para funis complexos com muitos pontos de contato
2. Definir a janela de atribuição por plataforma:
   - Meta: 7 dias de clique, 1 dia de visualização (padrão)
   - Google: 30 dias de clique (padrão)
   - TikTok: 7 dias de clique, 1 dia de visualização
3. Documentar a expectativa de discrepância entre plataformas
4. Criar um framework de relatórios como fonte da verdade:
   - Em qual plataforma confiar para quais métricas
   - Como reconciliar a atribuição entre plataformas

### Fase 4: QA e Validação
1. Criar um checklist de QA de rastreamento:
   - Cada pixel dispara nas páginas corretas
   - Os eventos disparam com os parâmetros corretos (value, currency, content ID)
   - Eventos server-side correspondem aos eventos do navegador (deduplicação)
   - Os parâmetros UTM passam corretamente pelo funil
   - Os eventos da página de agradecimento disparam uma vez (sem conversões duplicadas)
2. Definir o procedimento de teste de validação
3. Documentar limitações conhecidas e casos extremos
4. Configurar alertas de monitoramento para falhas de rastreamento

---

## Formato de Saída

```markdown
## Configuração de Rastreamento: {Site/Negócio}

**Plataformas:** {list}
**Tag Manager:** {GTM / nativo da plataforma / custom}
**Server-Side:** {sim/não — CAPI, Enhanced Conversions}

---

### Mapa de Eventos

| Evento | Gatilho | Plataformas | Parâmetros | Página |
|-------|---------|-----------|------------|------|
| PageView | Todas as páginas | Todas | URL, referrer | * |
| Lead | Envio de formulário | Meta, Google | value, content_name | /thank-you |
| Purchase | Transação | Meta, Google | value, currency, content_ids | /order-confirmation |

### Guias de Configuração por Plataforma

#### Meta Pixel + CAPI
{Instruções passo a passo}

#### Google Ads + Enhanced Conversions
{Instruções passo a passo}

#### {Plataformas adicionais}

### Estratégia de UTM

| Parâmetro | Convenção | Exemplo |
|-----------|-----------|---------|
| utm_source | {platform} | facebook |
| utm_medium | {type} | cpc |
| utm_campaign | {convenção de nomenclatura} | cold_lookalike_offer1 |

### Framework de Atribuição
**Modelo primário:** {model}
**Janelas:** {por plataforma}
**Fonte da verdade:** {qual sistema para qual métrica}

### Checklist de QA
- [ ] {item por plataforma e evento}

### Monitoramento
| Alerta | Condição | Ação |
|-------|-----------|--------|
```

---

## Condições de Veto

- NUNCA lance anúncios pagos sem rastreamento verificado — gastar sem mensuração é queimar dinheiro
- NUNCA confie na atribuição de uma única plataforma isoladamente — faça referência cruzada
- NUNCA pule o rastreamento server-side (CAPI) para o Meta — o rastreamento apenas via navegador perde 30-40% dos eventos
- NUNCA dispare eventos de compra sem parâmetros de valor — o cálculo de ROAS depende disso
- NUNCA presuma que o rastreamento funciona após a configuração — sempre execute um teste de QA com conversões reais

---

## Critérios de Conclusão

- [ ] Arquitetura de rastreamento mapeada com todas as plataformas
- [ ] Hierarquia de eventos definida com parâmetros
- [ ] Guias de configuração específicos por plataforma escritos
- [ ] Estratégia de UTM documentada
- [ ] Modelo de atribuição selecionado e janelas definidas
- [ ] Checklist de QA criado e testado
- [ ] Alertas de monitoramento definidos
