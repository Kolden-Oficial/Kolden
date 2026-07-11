---
id_fonte: "945507f6-d73f-4483-8d3c-8bc12b7f3e63"
notebook_id: "d9d11805-6a94-429a-82c1-595af9cb830c"
notebook_titulo: "Hispanic Financial Education Strategy: Hamilton Hyperlocal Intelligence Report"
titulo: "07 — System Design da Página"
tipo: "unknown"
url_original: null
keywords: "('Visual Hierarchy', 'Design System', 'Component Inventory', 'Interface States', 'Accessibility Standards')"
summary: "This technical document serves as a comprehensive **system design blueprint** for constructing a financial education landing page focused on a Canadian seminar series. It outlines a detailed **visual and strategic hierarchy** that prioritizes immediate conversion through a \"hero\" section followed by stages of emotional validation, method previews, and logistical details. The design utilizes a **warm yet authoritative color palette**—combining deep midnight blue with earthy gold and terracotta—to foster a sense of communal trust and financial reliability. Technical specifications ensure **responsiveness and accessibility**, employing specific typography and grid layouts to maintain a professional user experience across all devices. Ultimately, the guide functions as a **complete implementation roadmap**, integrating performance metrics and tracking events to optimize the visitor's journey from initial identification to final registration."
extraido_em: "2026-06-30T16:28:17Z"
extraido_por: "notebooklm-py-0.7.3"
projeto: stass
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/stass/_notebooklm/hispanic-financial-education/_indice|_indice]]"
---

# 07 — System Design da Página

# Tab 1

### **07 — System Design da Página**

Documento técnico/visual para construção da landing page no Lovable. Toda decisão de UX está justificada estrategicamente.

#### **7.1 Arquitetura da página**

##### **7.1.1 Hierarquia visual de cima para baixo**

| **Posição** | **Componente** | **Função estratégica** |
| --- | --- | --- |
| Top bar | (Opcional, fina) | Contador de "sillas restantes" + selector de sesión |
| Hero | Headline + subheadline + CTA + microcopy | **Conversão imediata.** 60% dos cliques convertem aqui ou no CTA repetido. |
| Section 02 | "¿Te suena familiar?" (lista de identificação) | Identificação visceral. |
| Section 03 | Problema (verdade incômoda) | Validação emocional + nomeação do inimigo. |
| Section 04 | Quebra de crença (frase-impacto) | Reframe rápido. |
| Section 05 | "Las 3 Reglas de Oro" (preview) | Apresentação do mecanismo único. |
| Section 06 | Sobre Amparo (foto + bio + credenciais) | Autoridade humana. |
| Section 07 | Detalhe das 3 Reglas | Profundidade do método. |
| Section 08 | Beneficios (3 colunas: Emocional / Práctico / Estratégico) | Visão de transformação. |
| Section 09 | Detalhes do evento (lugar, fechas, "lo que sí / lo que no") | Tira-objeção logística. |
| Section 10 | FAQ + CTA repetido + Form de RSVP | Última conversão. |
| Footer | Disclaimers + compliance + links | Conformidade legal. |

##### **7.1.2 Função de cada seção**

**Hero** : 1 promessa, 1 CTA, 1 microcopy. Não competir com nada na primeira dobra.

**Identificação** : lista em primeira pessoa (bullet com •), sem ícones decorativos.

**Problema** : tipografia maior e parágrafos curtos, alto contraste, sentimento sério.

**Quebra de crença** : frase de impacto centralizada, fonte display, fundo claro.

**3 Reglas (preview)** : 3 cards alinhados em desktop, empilhados em mobile.

**Sobre Amparo** : foto à esquerda + texto à direita em desktop; foto centralizada em mobile.

**3 Reglas (detalhe)** : bloco expandido com bullets internos.

**Beneficios** : 3 colunas iguais; cor de fundo levemente diferente para diferenciar do bloco anterior.

**Detalhes do evento** : ênfase em ícones simples (📍 📅 🅿️ 👶 ⏱) + linha "✅ vs. ❌".

**FAQ** : accordion, fechados por padrão.

**CTA + Form** : form de 4 campos sticky em mobile no bottom; em desktop, embedded full-width.

**Footer** : 3 colunas com disclaimer + compliance + links.

#### **7.2 Design system**

##### **7.2.1 Paleta de cores**

Combina calor latino (acolhimento, café, comunidade) + sobriedade financeira (confiança, autoridade).

| **Token** | **HEX** | **Uso** |
| --- | --- | --- |
| --color-primary | #0F2A4A | Azul-noite profundo. Headlines, ícones, footer. Transmite autoridade financeira. |
| --color-secondary | #C9A227 | Dourado terroso ("oro"). Botões, destaques, "Las 3 Reglas de Oro". |
| --color-accent | #D7572B | Terracota latino ("café/sol"). Microcopy de escassez, alerta suave. |
| --color-bg | #FAF7F2 | Off-white quente ("crema de café con leche"). Fundo principal. |
| --color-bg-alt | #F1EBE0 | Off-white mais escuro. Fundo de seções alternadas. |
| --color-text | #1A1A1A | Quase preto. Corpo de texto. |
| --color-text-soft | #4A4A4A | Cinza médio. Subtítulos, microcopy. |
| --color-success | #2F7A4D | Verde sereno. Bullets "✓". |
| --color-error | #B53028 | Vermelho contido. Mensagens de erro de form. |
| --color-divider | #E2D9C7 | Linha divisória sutil. |

**Por quê** : combinação azul-noite + dourado + terracota + creme transmite **patrimônio + acolhimento + tradição** . Evita o "branco gelado" das fintechs (frio) e o "vermelho-amarelo" do MLM (alarmista).

##### **7.2.2 Tipografia**

| **Token** | **Família** | **Uso** |
| --- | --- | --- |
| --font-display | **"Fraunces"** (serif) | Headlines, títulos de seção. Confiança editorial e calor. |
| --font-body | **"Inter"** (sans-serif) | Corpo de texto. Leitura confortável em mobile. |
| --font-detail | **"Inter"** weight 500 | Microcopy, FAQ, labels de form. |

Fontes hospedadas via Google Fonts. Pesos a carregar: Fraunces 400, 600, 800 / Inter 400, 500, 600.

##### **7.2.3 Escala tipográfica (mobile-first)**

| **Token** | **Tamanho mobile** | **Tamanho desktop** | **Uso** |
| --- | --- | --- | --- |
| --font-h1 | 36px / 1.1 | 56px / 1.05 | Hero headline |
| --font-h2 | 28px / 1.2 | 40px / 1.15 | Títulos de seção |
| --font-h3 | 22px / 1.3 | 28px / 1.25 | Subseções, nomes das Reglas |
| --font-body-lg | 18px / 1.55 | 20px / 1.55 | Subheadline, texto Hero |
| --font-body | 16px / 1.6 | 17px / 1.6 | Corpo padrão |
| --font-detail | 14px / 1.45 | 14px / 1.45 | Microcopy, footer |

##### **7.2.4 Botões**

| **Estado** | **Estilo** |
| --- | --- |
| **Primário (default)** | Bg dourado --color-secondary, texto --color-primary, padding 18px 32px, radius 12px, font-weight 600, sombra suave (0 6px 20px rgba(15,42,74,.12)). |
| **Primário hover** | Brilho 8% mais forte + translate y -1px + sombra 0 10px 24px rgba(15,42,74,.18). |
| **Primário focus** | Outline 2px solid --color-primary, offset 2px. |
| **Secundário** | Bg transparente, borda 2px --color-primary, texto --color-primary. |
| **Disabled** | Opacidade 0.5, cursor not-allowed, sem hover. |
| **Loading** | Spinner inline + texto "Reservando..." |

##### **7.2.5 Cards (3 Reglas, FAQ items, beneficios)**

**** border-radius: 16px

padding: 24px (mobile) / 32px (desktop)

background: var(--color-bg-alt)

border: 1px solid var(--color-divider)

shadow: 0 4px 20px rgba(15,42,74,.06)

#####  **7.2.6 Ícones**

Estilo: line icons consistentes, peso 1.5px. Usar **Lucide** (open source). Cor padrão --color-primary. Ícones decorativos (📍 📅 🅿️ 👶 ⏱ ✅ ❌ ▸) podem ser emojis em microcopy curto, com fallback acessível.

##### **7.2.7 Espaçamentos**

**** --space-xs: 8px

--space-sm: 16px

--space-md: 24px

--space-lg: 40px

--space-xl: 64px

--space-2xl: 96px

--space-3xl: 128px (apenas desktop, separação entre seções)

#####  **7.2.8 Bordas e sombras**

**** --radius-sm: 8px (inputs, tags)

--radius-md: 12px (botões)

--radius-lg: 16px (cards)

--radius-xl: 24px (foto Amparo, blocos hero)

--shadow-sm: 0 2px 8px rgba(15,42,74,.04)

--shadow-md: 0 6px 20px rgba(15,42,74,.10)

--shadow-lg: 0 12px 36px rgba(15,42,74,.14)

#####  **7.2.9 Grid e container**

Container max-width: **1140px** (desktop). Centralizado.

Grid: 12 colunas em desktop, 4 colunas em tablet, stacked em mobile.

Gutters: 24px desktop / 16px mobile.

Breakpoints: sm: 640px, md: 768px, lg: 1024px, xl: 1280px.

#### **7.3 Inventário de componentes (para implementação no Lovable)**

| **ID** | **Componente** | **Onde aparece** |
| --- | --- | --- |
| C-01 | Header (logo + opcional CTA âncora) | Topo |
| C-02 | HeroSection (eyebrow + h1 + sub + CTA + microcopy + foto) | Topo |
| C-03 | IdentificationList (bullet list em primeira pessoa) | Seção 2 |
| C-04 | ProblemBlock (parágrafos enfáticos) | Seção 3 |
| C-05 | BeliefBreakerQuote (frase de impacto centralizada) | Seção 4 |
| C-06 | MethodPreview (3 cards de Reglas, lado a lado) | Seção 5 |
| C-07 | AboutAmparo (foto + bio + credenciais) | Seção 6 |
| C-08 | MethodDetail (3 blocos expandidos com bullets) | Seção 7 |
| C-09 | BenefitsGrid (3 colunas: Emocional / Práctico / Estratégico) | Seção 8 |
| C-10 | EventDetails (lugar, fechas, "sí/no") | Seção 9 |
| C-11 | FAQAccordion | Seção 10 |
| C-12 | RSVPForm (4 campos + select de sesión) | Seção 10 |
| C-13 | Footer (3 colunas + disclaimer) | Bottom |
| C-14 | StickyCTA (mobile) | Mobile bottom (after Hero scroll) |
| C-15 | ThankYouPage (página /gracias) | Pós-RSVP |

#### **7.4 Estados de interface**

##### **7.4.1 Form de RSVP**

| **Estado** | **Comportamento** |
| --- | --- |
| **Idle** | Campos vazios, label flutuante. Botão habilitado. |
| **Hover input** | Border passa de --color-divider para --color-primary. |
| **Focus input** | Outline 2px --color-primary, offset 2px. |
| **Validação live** | Email e WhatsApp validados on blur. Erro: borda --color-error + mensagem abaixo do campo. |
| **Loading (após submit)** | Botão muda para "Reservando..." + spinner. Inputs desabilitados. |
| **Sucesso** | Redirect para /gracias em 800ms. |
| **Erro genérico** | Toast no topo: "Algo no funcionó. Intenta de nuevo o escribe a [email]." |

##### **7.4.2 Botão CTA (todos os estados)**

| **Estado** | **Visual** |
| --- | --- |
| Default | Dourado, sombra suave |
| Hover | Brilho +8%, translate y -1px |
| Active | Translate y +1px, sombra reduzida |
| Focus | Outline visível |
| Disabled | Opacidade 0.5 |
| Loading | Spinner + texto "Reservando..." |

##### **7.4.3 FAQ accordion**

| **Estado** | **Visual** |
| --- | --- |
| Closed | Ícone ▸ (chevron right) |
| Open | Ícone ▾ + cor primary |
| Hover | Background levemente mais escuro |

#### **7.5 Comportamento responsivo**

##### **7.5.1 Desktop (≥1024px)**

Hero: foto à direita (40% largura), texto à esquerda (60%).

3 Reglas: 3 colunas iguais.

Beneficios: 3 colunas iguais.

About Amparo: foto à esquerda 35%, texto 60%, gap 5%.

Form: full-width centralizado, max-width 560px.

##### **7.5.2 Tablet (640px–1023px)**

Hero: foto acima do texto, ambos full-width.

3 Reglas: 2 colunas (último card sozinho na linha 2).

Beneficios: 2 colunas.

About Amparo: foto acima, texto abaixo.

Form: full-width, padding 24px.

##### **7.5.3 Mobile (≤639px)**

Tudo empilhado, full-width.

Hero foto reduzida (max 280px de altura).

3 Reglas: 1 coluna, scroll horizontal opcional como variação A/B.

Beneficios: 1 coluna.

**Sticky CTA bar** no rodapé da viewport: "Reservar mi silla → " (aparece após scroll de 60% do hero).

Form: campos full-width, botão full-width.

Tipografia: H1 36px, H2 28px (escala já definida).

#### **7.6 Acessibilidade (WCAG 2.1 AA)**

| **Item** | **Especificação** |
| --- | --- |
| **Contraste de texto** | Mínimo 4.5:1 para corpo, 3:1 para títulos grandes. Verificar --color-primary sobre --color-bg (passa) e --color-secondary sobre --color-primary (texto do botão — passa em 7.2:1). |
| **Tamanho mínimo de fonte** | 16px no corpo. Nada abaixo de 14px. |
| **Labels em inputs** | Sempre presentes (visíveis ou via aria-label). |
| **Hierarquia semântica** | único no Hero.por seção.para subblocos. , , . |
| **Alt text** | Toda imagem com alt. Foto de Amparo: alt="Amparo Camacho, educadora financiera latina". Fotos de bastidor: descritivas. |
| **Navegação por teclado** | Tab order lógico. Form acessível pelo teclado. CTA focável visível. |
| **Skip link** | "Saltar al contenido principal" no topo (oculto até foco). |
| **Foco visível** | Outline 2px --color-primary em todos os elementos interativos. |
| **Movimento reduzido** | Respeitar prefers-reduced-motion: reduce (desativar animações de scroll). |
| **Idioma da página** | (espanhol latino-americano). |
| **Imagens decorativas** | alt="" para que screen reader pule. |
| **ARIA** | Accordion FAQ com aria-expanded. Form com aria-describedby para erros. Sticky CTA com aria-hidden quando off-screen. |

#### **7.7 Performance**

| **Métrica** | **Alvo** |
| --- | --- |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Tamanho total da página | < 1.2MB |
| Imagens | WebP/AVIF, lazy load abaixo do fold |
| Foto de Amparo | Pré-carregada (LCP candidate) |
| Fontes | Pré-conectadas + display: swap |
| JS | Mínimo possível (Lovable já é leve) |

#### **7.8 Tracking e analytics**

| **Evento** | **Onde** |
| --- | --- |
| page\_view | Carregamento da página |
| cta\_click\_hero | Clique no CTA principal do hero |
| cta\_click\_repeat | Clique no CTA secundário (em qualquer seção) |
| form\_start | Foco no primeiro campo do form |
| form\_submit\_attempt | Submit do form |
| form\_submit\_success | Form enviado com sucesso |
| form\_field\_error | Validação falhou em algum campo |
| faq\_open | Abertura de qualquer item de FAQ |
| whatsapp\_click | Clique no link de WhatsApp na thank-you page |
| calendar\_add | Clique para adicionar ao calendário |

Pixel da Meta + Conversion API instalados na thank-you page com evento Lead (custom value $7 CAD = CPL alvo).

#### **7.9 SEO básico (não é prioridade, mas implementar)**
