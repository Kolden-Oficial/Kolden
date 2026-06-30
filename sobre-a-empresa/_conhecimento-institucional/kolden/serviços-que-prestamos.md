---
id_fonte: "1278ad52-5f1f-447e-824a-ab2ef3582f4f"
notebook_id: "1eb3e160-2c74-42dc-aff2-9b95a5fb44c6"
notebook_titulo: "Kolden"
titulo: "Serviços que prestamos "
tipo: "unknown"
url_original: null
keywords: "('Business growth services', 'Automated service pricing', 'Sales presentation structure', 'Artificial intelligence implementation', 'Commercial management strategies')"
summary: "This text outlines a comprehensive framework for a modern **growth consultancy**, detailing a diverse service menu that spans **paid traffic, social media management, commercial training, and AI implementation**. To streamline the transition from initial consultation to a closed deal, the author provides a **structured workflow** that uses transcriptions and artificial intelligence to diagnose specific client \"bottlenecks.\" Central to this process is a sophisticated **interactive presentation prompt** designed to generate a high-end web interface, which translates raw business data into a visually compelling narrative of **personalized solutions and tiered investment**. Ultimately, the source serves as a blueprint for **automating the sales and pricing cycle** while maintaining a premium, data-driven experience for potential clients."
extraido_em: "2026-06-30T16:16:28Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Serviços que prestamos 

# Tab 1

**Serviços que oferecemos:**

**1- Tráfego Pago**

Estruturação estratégica de campanha

otimização

testes de criativos

Trafego para mídias sociais facebook, google, youtube

Criação de estrategias para retenção de cliente

Aumentar LTV

Landing page

Sites

**2- Social Media**

Estratégia de criação de conteúdo

Estratégia para nutrir público atraído

Estratégia para conversão de seguidores

Aumentar engajamento e visualização dos vídeos postados

Atrair público orgânico qualificado

Crescer marca e presença

**3- Gestão comercial**

treinamento de vendas

Script de vendas

Implementação de CRM

Aprimorar cultura do time

Acompanhamento comercial

**4- Implementação de IA:**

Automatizar atendimento

Automatizar processos

Criação de software e aplicativos

**5- Gestão de dados**

Dash financeira em tempo real

Planilha de dados para ter previsibilidade de crescimento

—------------------------------------------------------------------------------------------------------------------------

O que está faltando ?

Como precificar o nosso serviço mediante a cada cliente, de modo que seja fácil ser automatizado?

Cliente de pizzaria que fatura 20k:

Margem de lucro: 10%

CRM

SCRIPT DE VENDAS

PLANILHA FINANCEIRA

Orçamento total: **R$2.000**

O que precisa pra fazer precificação de serviço?

Saber em cima do que ela é baseada:

Faturamento

Margem de lucro

Poder do negócio

—------------------------------

Processo de montar estrutura de apresentação comercial:

**Passo 1: Fazer a reunião de Sondagem**

**Passo 2: Extrair o documento transcrito da reunião**

**Passo 3: Ir no chatgpt e mapear todos os gargalos e oportunidades**

**Passo 4: Revisar esse documento**

**Passo 5: Entrar no lovable e mandar o documento de mapeamento de oportunidades**

**Passo 6: Lovable vai gerar a mesma estrutura de apresentação, porém com as dores, necessidades e soluções para esse cliente específico**

**prompt montado:**

**Você é um designer de apresentações comerciais interativas. Crie uma apresentação web (React + Tailwind + Framer Motion) seguindo EXATAMENTE esta estrutura de design e etapas. O usuário fornecerá um documento com dados do cliente — você deve extrair as informações e encaixar nos slots indicados por [INPUT].**

**---**

**## DESIGN SYSTEM**

**### Paleta (CSS HSL tokens)**

**- Background: fundo escuro (ex: hsl(240 10% 4%))**

**- Card/Glass: fundo semi-transparente com backdrop-blur-xl, borda 1px border-white/10**

**- Primary: cor de destaque (ex: verde hsl(142 76% 36%))**

**- Text: branco para títulos, cinza claro (hsl(0 0% 70%)) para corpo**

**- Accent colors: azul para valores financeiros, verde para totais positivos, amarelo para CTAs, vermelho para itens removidos**

**### Tipografia**

**- Títulos de slide: text-3xl md:text-4xl font-bold tracking-tight**

**- Subtítulos: text-xl font-semibold**

**- Corpo: text-sm text-muted-foreground**

**- Tags/labels: font-mono text-[11px] uppercase tracking-[0.2em]**

**### Componentes reutilizáveis**

**1. SlideLayout: container fullscreen com grid sutil de fundo (opacity 0.03), barra superior (dot + label + contador), conteúdo centralizado (max-w-5xl), linha accent inferior com gradiente**

**2. SlideTitle: tag pill (border + mono uppercase) + h2 bold. Prop "gradient" para texto com gradiente**

**3. Bullet: ícone Lucide (w-4 h-4 text-primary) + texto, animação stagger (delay 0.2 + index \* 0.08)**

**4. MetricCard: card glass com ícone + label uppercase + valor grande (text-2xl font-bold)**

**5. KeyMessage: box com borda colorida (primary/warning/gold), label mono + texto semibold**

**6. ComparisonTable: tabela comparativa antes/depois com ícones ✗/✓**

**7. DataTable: tabela de dados com cabeçalho e linhas alternadas**

**### Animações**

**- Entrada de slide: opacity 0→1, y 20→0, duration 0.5, ease "easeInOut"**

**- Saída: opacity 1→0, y 0→-20**

**- Elementos internos: stagger sequencial (0.08s entre itens)**

**- Cards: opacity 0→1, y 16→0, delay baseado no index**

**- Navegação: setas ← → e barra de dots inferior com backdrop-blur**

**---**

**## ESTRUTURA DE SLIDES (seguir esta ordem)**

**### SLIDE 1 — Capa**

**- Nome do cliente: [INPUT: nome\_empresa]**

**- Subtítulo: "Assessoria de Growth"**

**- Mês/Ano: [INPUT: periodo]**

**- Visual: título gigante (text-5xl md:text-7xl), nome com gradiente, linha accent**

**### SLIDE 2 — Diagnóstico / Gargalos**

**- Tag: "Diagnóstico"**

**- Título: "Gargalos e Desafios Identificados"**

**- Lista de bullets com ícones relevantes: [INPUT: lista\_gargalos] (3-5 itens)**

**- KeyMessage variant="warning": resumo do problema principal**

**### SLIDE 3 — Transição "Como vamos resolver?"**

**- Slide de impacto visual**

**- Título grande centralizado: "Como vamos resolver?"**

**- Subtítulo motivacional: [INPUT: frase\_transicao]**

**- Animação dramática (scale 0.9→1, blur 10→0)**

**### SLIDE 4 — Proposta (O que está incluso)**

**- Tag: "Proposta"**

**- Título: "O que está incluso"**

**- Grid de 3 colunas, cada uma com:**

**- Ícone + título da categoria (ex: Marketing, Gestão, IA)**

**- Lista de entregas: [INPUT: entregas\_por\_categoria]**

**- Itens devem suportar estado "riscado" (line-through + text-red-400) para desconto**

**### SLIDE 5 — Slide de transição "Investimento"**

**- Título grande centralizado: "Investimento"**

**- Visual atraente com animação de entrada**

**### SLIDE 6 — Valores / Pricing**

**- Tag: "Investimento"**

**- MetricCards em grid:**

**- Mão de obra: [INPUT: valor\_mao\_de\_obra] (cor azul)**

**- Publicidade: [INPUT: valor\_publicidade] (cor azul)**

**- Total: [INPUT: valor\_total] (cor verde)**

**- Botão amarelo de desconto (opcional):**

**- Ao clicar: reduz mão de obra para [INPUT: valor\_desconto], recalcula total, risca itens removidos**

**- KeyMessage com condições ou observações**

**### SLIDES 7-9 — Implementação por Fases**

**- 3 slides, um por fase temporal:**

**- Fase 1: [INPUT: fase1\_titulo, fase1\_periodo, fase1\_itens]**

**- Fase 2: [INPUT: fase2\_titulo, fase2\_periodo, fase2\_itens]**

**- Fase 3: [INPUT: fase3\_titulo, fase3\_periodo, fase3\_itens]**

**- Cada slide: tag "Implementação · [periodo]", título, lista de bullets, KeyMessage com meta**

**### SLIDE 10 — Metas e Resultados Esperados**

**- Tag: "Resultados"**

**- Grid de MetricCards: [INPUT: metas] (3-4 KPIs com ícone, label e valor)**

**- KeyMessage variant="gold" com visão de futuro**

**---**

**## REGRAS**

**1. Toda informação variável vem dos [INPUT]. Nunca invente dados.**

**2. Mantenha o design system consistente em todos os slides.**

**3. Ícones sempre do pacote Lucide React.**

**4. Navegação por teclado (← →) e dots clicáveis na barra inferior.**

**5. Responsivo (md breakpoint para ajustes de tamanho).**

**6. AnimatePresence com mode="wait" entre slides.**

**7. Glass cards: bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl.**
