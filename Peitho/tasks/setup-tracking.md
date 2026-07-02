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
- [ ] Hierarquia alimenta smart-bidding (sinais primário/secundário/micro) documentada
- [ ] Consent Mode v2 implementado (mercados EU/BR/UK)
- [ ] GDPR/LGPD compliance validada com Themis
- [ ] Privacy Sandbox timeline mapeada

---

## Hierarquia alimenta smart-bidding (sinais primário / secundário / micro)

Smart-bidding (tCPA, tROAS, Max Conv, Advantage+) precisa de **volume + qualidade + variedade
de sinal** para funcionar. Enviar só o evento primário (compra) é o erro clássico — em contas
sub-$50K/mês, o algoritmo raramente sai da learning phase.

### As 3 camadas de sinal

**Camada 1 — Sinal primário (o KPI de negócio)**
- E-com: `purchase` com value + currency + content_ids.
- Lead-gen: `qualified_lead` (não só `lead`; qualificar após scoring).
- SaaS: `trial_started` OR `subscription_paid`.
- App: `activation_event` (Day-1 core action, não só install).

Regra: **1-2 eventos primários por conta**. Mais que isso confunde o algoritmo.

**Camada 2 — Sinal secundário (mid-funnel)**
- `add_to_cart`, `initiate_checkout`, `add_payment_info` (e-com).
- `form_view`, `form_start`, `form_field_complete` (lead-gen).
- `activation_step_2_5` (produto SaaS onboarding).
- `content_view_key` (páginas de high-intent).

Regra: **3-6 eventos secundários** enviados como custom events com nomes padronizados.
Facebook AEM aceita até 8 priorizados por domínio; Google usa Enhanced Conversions com
tag hierarchy.

**Camada 3 — Micro-sinal (engagement)**
- `scroll_75pct`, `time_on_page_45s`, `video_view_50pct`.
- `share`, `save`, `outbound_click`.

Regra: **enviar todos como sinais SECUNDÁRIOS**, não deixar como primário. Micro-sinais
alimentam Advantage+ e Predictive Audiences sem confundir o algoritmo sobre o que é venda.

### Como o smart-bidding lê a hierarquia

- **tCPA / Max Conv**: puxa do evento primário. Se volume <50 conv/semana, algoritmo
  não converge — precisa de secundário como *conversion action complementar*.
- **tROAS**: exige value em purchase. Enviar `purchase` sem `value` desabilita tROAS na
  prática.
- **Advantage+ Shopping (Meta)**: usa TODAS as camadas — hierarquia rica multiplica
  performance 20-40%.
- **PMax (Google)**: aceita conversão importada (primária) + micro (secundária) via
  Enhanced Conversions Data-Driven Model.

### Configuração no dashboard

```yaml
Meta (Business Manager):
  aggregated_event_measurement:
    - purchase (prioridade 1) # primário
    - initiate_checkout (prioridade 2) # secundário
    - add_to_cart (prioridade 3) # secundário
    - qualified_lead (prioridade 4) # primário lead-gen se aplicável
    - form_start (prioridade 5) # secundário
    - content_view_key (prioridade 6) # micro
    - video_view_50pct (prioridade 7) # micro
    - scroll_75pct (prioridade 8) # micro

Google Ads / GA4:
  conversion_actions:
    - primary: purchase (Enhanced Conversions ON, value + currency)
    - primary: qualified_lead (se lead-gen)
    - secondary: add_to_cart (not counted, used for bidding)
    - secondary: initiate_checkout
    - secondary: form_start
```

---

## Consent Mode v2 + GDPR/LGPD + Privacy Sandbox

Rastreamento pós-2024 opera em mundo cookie-less parcial. Três frentes obrigatórias:

### Consent Mode v2 (Google)

Desde março 2024, Google exige Consent Mode v2 para ativar Enhanced Conversions + Audience
Insights no EEE (Espaço Econômico Europeu) e UK. Parâmetros:

- `ad_storage` (permissão para armazenar dados de ads)
- `ad_user_data` (permissão para enviar dados a Google Ads)
- `ad_personalization` (permissão para personalizar ads)
- `analytics_storage` (permissão para storage de analytics)

Implementação:
1. Antes do usuário dar consent, Consent Mode envia "conversion ping" agregado (sem cookie).
2. Após consent aceito, envia dado completo com cookies.
3. Após consent negado, permanece em modo agregado — Google modela via Consent Mode
   *conversion modeling*.

Regra: implementação via CMP certificado pelo Google (Cookiebot, OneTrust, Usercentrics,
Iubenda). Nunca hand-rolled.

### GDPR (EU) + LGPD (Brasil) + CCPA (Califórnia)

Framework operacional:

| Regulação | Base legal para paid ads | Consent obrigatório? |
|---|---|---|
| GDPR (EU) | Consent explícito | Sim |
| LGPD (BR) | Consent + legítimo interesse | Sim para audience data |
| CCPA (CA) | Opt-out disponível | Não (opt-out sim) |
| PIPEDA (CA) | Consent implícito ok em alguns casos | Depende |
| PDPA (SG/TH/IN) | Consent explícito | Sim |

Handoff obrigatório: qualquer questão jurídica específica de mercado passa a **Themis**.

### Privacy Sandbox timeline (Google Chrome)

Google adiou o kill do 3rd-party cookie múltiplas vezes. Timeline vigente:

- **Q3 2024**: Chrome permite usuário optar por manter 3rd-party cookies. Escolha
  distribuída.
- **2025**: Adoção contínua do Topics API + Attribution Reporting API + Protected
  Audience API (ex-FLEDGE).
- **2026-2027**: Migração gradual continua; regime híbrido.

Implicações práticas:
- Não construir arquitetura dependente puramente de 3rd-party cookie.
- Migrar audiences para 1st-party (CRM upload / Customer Match / CAPI).
- Testar Topics API + Protected Audience como fallback.
- Contextual targeting recupera peso — investir em Peer39 / IAS Context Control.

### Checklist de conformidade

- [ ] CMP certificada configurada e testada
- [ ] Consent Mode v2 ativo em mercados EU/UK
- [ ] LGPD banner ativo em mercado BR
- [ ] Pixel/tags condicionadas a consent (não disparar antes)
- [ ] Enhanced Conversions ligadas com Consent Mode
- [ ] Server-side (CAPI + Enhanced Conversions server-side) reduz dependência de cookie
- [ ] Advogado Themis validou base legal por mercado
- [ ] Documentação de retention (quanto tempo dados armazenados) publicada
- [ ] Usuário consegue exercer direito a exclusão (LGPD Art. 18) e portabilidade
- [ ] Auditoria trimestral de trackers (via Cookiebot / OneTrust dashboard)
