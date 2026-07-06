---
fonte: google-doc
id_origem: 1Ligf0WT-Mjo5IcZ9-pltAjyJB0j48wj_XjBIKEW8zPo
titulo_origem: "[R] Alinhamento"
data_reuniao: 2026-05-26
participantes: [Ronan Sersil, Bruno Vilas Boas]
data_extracao: 2026-06-30
extraido_por: claude-code
cliente: rosie
dossie: ../../clientes/ativos/rosie.md
---

# [R] Alinhamento — Operação Rosie

> Compilado de tarefas — Reunião de Alinhamento de **26/05/2026**.
> Cadência: reunião semanal toda sexta, 10:15–11:15.
> **Meta de faturamento: R$ 200.000 no próximo mês.**

## Contexto Estratégico

Este documento consolida todas as frentes de trabalho da operação Rosie discutidas na reunião de 26/05/2026, somadas às tarefas operacionais pendentes. Organizado por urgência para execução imediata e acompanhamento contínuo nas reuniões semanais (sextas-feiras, 10:15–11:15).

---

## 🔴 HOJE — Execução Imediata

Itens que destravam o restante da operação. Sem isso, o resto não anda.

### 1.1 — Subir Fluxo de E-mail de Reativação da Loja

Configurar e ativar no RD Station o disparo de e-mail para reativação de clientes inativos, usando os produtos da linha canelada como gatilho de retorno.

**Produtos selecionados para a campanha:**
- [Camiseta Clássica Canelada](https://rosieiadoreyou.com.br/produtos/camiseta-classica-canelada1/)
- [Calça Clássica Canelada](https://rosieiadoreyou.com.br/produtos/calca-classica-canelada1/)
- [Faixa de Cabelo Canelada](https://rosieiadoreyou.com.br/produtos/faixa-de-cabelo-canelada1/)
- [Regata Clássica Canelada Algodão](https://rosieiadoreyou.com.br/produtos/regata-classica-canelada-algodao1/)

**Checklist:**
- [ ] Validar segmentação de clientes inativos no RD Station
- [ ] Montar template do e-mail com os 4 produtos selecionados
- [ ] Configurar gatilho de envio e janela de disparo
- [ ] Testar envio para conta interna antes de subir
- [ ] Ativar o fluxo no RD Station

### 1.2 — Receber e Implementar Mensagem de Carrinho Abandonado

Bruno entregará o esqueleto da mensagem. Após o recebimento, configurar o fluxo no RD Station como prioridade máxima de e-mail marketing.

**Checklist:**
- [ ] Receber esqueleto da mensagem enviado pelo Bruno
- [ ] Adaptar copy ao tom de voz da marca
- [ ] Configurar gatilho de carrinho abandonado no RD Station
- [ ] Definir janela de disparo (sugerido: 1h, 24h, 72h)
- [ ] Testar com carrinho de teste na Nuvemshop
- [ ] Ativar o fluxo em produção

### 1.3 — Aceitar Convite do Google Calendar (Reunião Semanal)

- [ ] Aceitar o convite enviado para `bruno.vilasboas@…`
- [ ] Confirmar recorrência: toda sexta-feira, 10:15–11:15

---

## 🟠 ESTA SEMANA — Fundação Operacional

Estruturação base: organização, tráfego pago no ar e infraestrutura travada antes do escalonamento.

### 2.1 — Estruturar e Subir Campanhas de Catálogo (Meta + Google)

Iniciar a operação de tráfego pago com campanhas de catálogo integradas à Nuvemshop, garantindo traqueamento e envio de eventos correto desde o dia 1.

**Configuração financeira:**
- Investimento mensal total: **R$ 5.000**
- Investimento diário (28 dias): **R$ 178,57**
- Distribuição: **70% Meta** (≈ R$ 125/dia) • **30% Google** (≈ R$ 53/dia)
- Cartão Google Ads: **Visa final 1097** (limite liberado dia 3)
- Cartão Meta Business Manager: **final 5644**

**Checklist Meta Ads:**
- [ ] Validar vinculação Nuvemshop → Meta (catálogo + pixel)
- [ ] Criar campanha de catálogo (estrutura topo/meio/fundo de funil)
- [ ] Configurar público aberto nível Brasil
- [ ] Criar grupo de anúncio com Lookalike de compradores (1–2%)
- [ ] Configurar priorização de exibição no Instagram (70/30 vs Facebook)
- [ ] Aplicar lista dos 10 estados de maior conversão (após receber do Bruno)
- [ ] Validar eventos de conversão e correspondência de eventos
- [ ] Ativar campanha em modo de teste

**Checklist Google Ads:**
- [ ] Validar vinculação Nuvemshop → Google Merchant Center
- [ ] Revisar Google Merchant Center (status de produtos, reprovações, atributos)
- [ ] Configurar campanha Performance Max com catálogo
- [ ] Configurar segmentação Brasil + estados prioritários
- [ ] Validar tags de conversão e GA4
- [ ] Ativar campanha em modo de teste

**Padronização e tracking:**
- [ ] Criar padrão de UTMs para Meta
- [ ] Criar padrão de UTMs para Google
- [ ] Documentar padrão de UTM no Drive compartilhado
- [ ] Validar leitura de UTMs na Solomon

### 2.2 — Receber Insumos do Bruno

- [ ] Lista dos 10 estados com maior taxa de compra
- [ ] Acesso ao Drive do Grupo ETT
- [ ] Esqueleto das mensagens de e-mail (carrinho + reativação)
- [ ] Documento de aprovação do Meta com dados da esposa do Bruno
- [ ] Planilha de dados (a ser organizada após recebimento)

### 2.3 — Centralizar Documentos no Drive

Substituir a estrutura atual de múltiplos drives dispersos por um único ambiente compartilhado, consolidando documentos oficiais, planilhas e materiais da Rose.

**Checklist:**
- [ ] Receber acesso ao Drive do Grupo ETT (Bruno)
- [ ] Mapear todos os drives e pastas existentes hoje
- [ ] Criar estrutura de pastas padrão (Marketing / Tráfego / Financeiro / Operacional / Criativos)
- [ ] Migrar documentos oficiais
- [ ] Migrar planilhas operacionais
- [ ] Migrar materiais criativos e ativos de marca
- [ ] Organizar planilha enviada pelo Bruno na estrutura nova
- [ ] Arquivar drives antigos como leitura
- [ ] Compartilhar nova estrutura com os envolvidos

### 2.4 — Criar Públicos Dinâmicos de Compradores e Visitantes

Implementar a integração em tempo real entre RD Station/Solomon e Meta para que o público de compradores e visitantes seja atualizado automaticamente, alimentando lookalikes e retargeting com dados frescos.

**Checklist:**
- [ ] Configurar integração RD Station → Meta (públicos personalizados)
- [ ] Configurar integração Solomon → Meta (compradores e visitantes em tempo real)
- [ ] Validar fluxo com pedido teste
- [ ] Documentar arquitetura da integração

### 2.5 — Infraestrutura e Segurança

**Checklist:**
- [ ] Fazer downgrade do Google Workspace (ajuste de plano)
- [ ] Atualizar WhatsApp Business com o número novo
- [ ] Atualizar taxas na Nuvemshop
- [ ] Aceitar solicitações pendentes da equipe Nuvemshop
- [ ] Ativar autenticação 2FA em TODOS os sistemas no e-mail `marketing@rosieiadoreyou.com`
- [ ] Documentar lista de sistemas com 2FA ativo
- [ ] Revisar formas de pagamento de TODAS as contas de anúncio
- [ ] Investigar bug: pesquisa 'Rosie' retorna site em manutenção

---

## 🟡 PRÓXIMAS SEMANAS — Expansão de E-mail Marketing

Construção dos fluxos recorrentes de relacionamento e retenção após estabilização dos fluxos prioritários.

### 3.1 — Construir Fluxos Recorrentes de E-mail Marketing

Implementação dos fluxos de relacionamento, retenção e recompra, na ordem de prioridade definida na reunião.

**Fluxos a construir (em ordem):**
1. E-mail educacional: 'Como cuidar das suas peças' — disparo entre 7 e 15 dias após compra
2. Fluxo pós-compra: e-mail aos 30 dias
3. Fluxo pós-compra: e-mail aos 60 dias
4. Fluxo pós-compra: e-mail aos 90 dias
5. Fluxo de recompra (upsell/cross-sell): 180 dias após a compra
6. E-mail mensal educacional assinado por Catarina Tourinho
7. Fluxo de follow-up para leads engajados
8. Fluxo de remarketing por e-mail

**Padrão técnico para todos os fluxos:**
- [ ] Criar link padronizado da Solomon para disparo de e-mails
- [ ] Aplicar padrão de UTM em todos os e-mails
- [ ] Validar entrega e renderização em múltiplos clientes (Gmail, Outlook, mobile)
- [ ] Configurar aprovação obrigatória antes do disparo
- [ ] Documentar template de aprovação

### 3.2 — Qualificação da Base de Leads

Manter a base do RD Station dentro do limite de **10.000 contatos engajados**, removendo leads inativos para otimizar custo e performance.

**Checklist:**
- [ ] Auditar base atual de leads no RD Station
- [ ] Definir critérios de lead 'lixo' (sem engajamento em X dias, bounce, etc.)
- [ ] Criar fluxo de e-mail para qualificação ativa
- [ ] Configurar automação para remoção de leads desqualificados
- [ ] Validar que a base ficou dentro dos 10.000 contatos engajados
- [ ] Documentar processo recorrente de higienização

### 3.3 — Organização do E-mail de Marketing

**Checklist:**
- [ ] Criar categorias/labels de suporte no Gmail do `marketing@rosieiadoreyou.com`
- [ ] Definir filtros automáticos por tipo de mensagem
- [ ] Configurar respostas-padrão para dúvidas frequentes

---

## 🔵 BACKLOG — Prioridade Futura

Não executar agora. Itens estratégicos para depois da consolidação da operação atual.

### 4.1 — Verificar Configuração da API Oficial do WhatsApp na Revi

O número antigo da Rose tinha disparo aprovado de **10.000 mensagens** na API oficial — ativo de altíssimo valor (estimado entre R$ 2.000 e R$ 15.000 dependendo do volume aquecido). Recuperar essa configuração antes de qualquer estratégia de WhatsApp marketing.

**Checklist:**
- [ ] Acessar a Revi e localizar a configuração da API oficial
- [ ] Verificar status do número antigo (recuperável ou não)
- [ ] Avaliar migração da configuração para ManyChat ou GHL
- [ ] Documentar score atual da conta e volume liberado
- [ ] Definir plataforma definitiva para disparo (Revi vs ManyChat vs GHL)

### 4.2 — Conectar Público da Catarina na BM da Rose

Integração de ativos de público entre a conta de negócios da Catarina e a BM da Rose, ampliando a base de retargeting e lookalike.

**Checklist:**
- [ ] Agendar reunião com Catarina Tourinho (Bruno marca)
- [ ] Mapear ativos de público disponíveis na BM da Catarina
- [ ] Definir quais públicos serão compartilhados
- [ ] Executar a conexão entre as BMs
- [ ] Validar uso dos públicos em campanhas teste

### 4.3 — Entrada no TikTok Ads (Adiada)

Decisão estratégica: adiar a entrada no TikTok até estabilização e consolidação das campanhas no Meta e Google. Reavaliar após primeiro mês de operação.

---

## 📅 Cadência de Acompanhamento

**Reunião Semanal Fixa**
- Recorrência: toda sexta-feira
- Horário: 10:15 às 11:15
- Participantes: Ronan Sersil + Bruno Vilas Boas

**Pauta padrão da reunião semanal:**
- Revisão das métricas de e-mail marketing
- Performance das campanhas Meta + Google
- Status dos fluxos em construção
- Bloqueios e pendências
- Definição das prioridades da semana seguinte

---

## Cruzamento com o Radar de Tarefas (KLD-*)

Tarefas do `radar.yaml` cobertas (parcial ou totalmente) por este alinhamento:

| KLD | Item do alinhamento | Cobertura |
|---|---|---|
| KLD-2026-089 — 2º disparo de email marketing de reativação | §1.1 (campanha canelada) | ✅ cobre |
| KLD-2026-090 — Google Ads/Analytics tempo real | §2.1 (PMax + tags) + §2.4 (públicos dinâmicos) | ✅ cobre |
| KLD-2026-093 — Links padronizados redes sociais | §3.1 (link padronizado Solomon + UTMs) | ⚠️ parcial (UTMs em e-mail; redes sociais ficam descobertas) |
| KLD-2026-096 — Benchmarking LTV/Sessão | implícito na meta R$ 200k | ⚠️ não detalhado |
| KLD-2026-097 — Cobrar custos do Bruno (ROI) | §2.2 (insumos Bruno) | ⚠️ não citado nominalmente |
| KLD-2026-098 — CRM GHL para Bruno | §4.1 (avaliar GHL como destino do WhatsApp) | ⚠️ parcial |
| KLD-2026-102 — Web Push popup cupom 10% | não consta | ❌ fora do escopo deste doc |
| KLD-2026-103 — Loja oficial no Instagram (Shop) | não consta | ❌ fora do escopo deste doc |
| KLD-2026-104 — Estratégia Topo/Meio/Fundo Funil | §2.1 (campanhas catálogo) | ✅ cobre |
| KLD-2026-105 — Eventos de conversão e correspondência | §2.1 (checklist Meta) | ✅ cobre |

**Itens NOVOS no alinhamento que ainda não viraram KLD-*:** carrinho abandonado (§1.2), centralização Drive ETT (§2.3), 2FA universal (§2.5), bug pesquisa "Rosie" → site em manutenção (§2.5), 8 fluxos recorrentes de e-mail marketing (§3.1), qualificação base RD ≤10k (§3.2), Revi/API WhatsApp (§4.1), conexão BM Catarina × Rose (§4.2).

---

— Fim do compilado —
