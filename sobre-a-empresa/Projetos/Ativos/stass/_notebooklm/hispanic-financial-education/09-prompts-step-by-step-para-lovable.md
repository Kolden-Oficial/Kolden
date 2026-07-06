---
id_fonte: "d3c51d70-4aae-416f-9877-4b4e2c0bba7d"
notebook_id: "d9d11805-6a94-429a-82c1-595af9cb830c"
notebook_titulo: "Hispanic Financial Education Strategy: Hamilton Hyperlocal Intelligence Report"
titulo: "09 — Prompts Step-by-Step para Lovable"
tipo: "unknown"
url_original: null
keywords: "('Modular landing page', 'Financial education seminar', 'Conversion rate optimization', 'Technical web development', 'Spanish copy integration')"
summary: "This guide outlines a **modular, fifteen-step framework** designed to build a high-converting landing page for a financial seminar using the **Lovable development platform**. The process begins by establishing a **semantic HTML structure** and a unified **design system**, gradually layering in persuasive Spanish-language copy, authority-building sections, and a **mobile-optimized RSVP form**. Key technical priorities include **accessibility compliance**, seamless **third-party integrations** for lead tracking, and rigorous quality assurance to ensure the site is **ready for live traffic**. Ultimately, the document serves as a comprehensive blueprint for transforming a marketing concept into a **functional, professional web presence** through iterative, logical prompting."
extraido_em: "2026-06-30T16:28:22Z"
extraido_por: "notebooklm-py-0.7.3"
---

# 09 — Prompts Step-by-Step para Lovable

# Tab 1

### **09 — Prompts Step-by-Step para Lovable**

15 prompts modulares e progressivos. Cada um define o que fazer, em que ordem, com critérios de aceite claros.

**Idioma dos prompts** : inglês (Lovable performa melhor em inglês) — mas com TODA a copy em espanhol embedada nos prompts.

#### **Prompt 1 — Estrutura base da landing page**

**** Create a new Lovable project: a single-page landing page for a free

in-person financial education seminar.

Project name: Amparo Camacho – Las 3 Reglas de Oro

URL slug: amparo-3reglas

The page must be in Spanish (es-MX). Set .

Page structure (single-page scroll):

1. Header (logo + scroll-to-CTA)
2. Hero section
3. "¿Te suena familiar?" identification list
4. Problem statement
5. Belief breaker quote
6. Method preview ("Las 3 Reglas de Oro" - 3 cards)
7. About Amparo (photo + bio)
8. Method detail (3 expanded blocks)
9. Benefits grid (3 columns: Emocional / Práctico / Estratégico)
10. Event details (location, dates, "lo que sí / lo que no")
11. FAQ accordion
12. Final CTA + RSVP form
13. Footer

Acceptance criteria:

* Mobile-first responsive
* Single visible primary CTA per section
* Smooth scroll behavior
* All sections separated by 64px (desktop) / 40px (mobile)
* Use semantic HTML (header, main, section, footer, nav)

Do not generate copy yet — just the empty structure with placeholders.

Do not add any styling beyond a minimal reset.

 **Critérios de aceite** :

HTML semântico criado.

13 seções identificáveis pelo DOM.

Página passa em validador HTML (W3C).

Mobile-first verificável (DevTools).

**O que não fazer** : já estilizar, já adicionar conteúdo, já incluir formulário funcional.

#### **Prompt 2 — Aplicar o design system**

**** Apply the following design system globally to the page:

CSS variables (in :root):

--color-primary: #0F2A4A;

--color-secondary: #C9A227;

--color-accent: #D7572B;

--color-bg: #FAF7F2;

--color-bg-alt: #F1EBE0;

--color-text: #1A1A1A;

--color-text-soft: #4A4A4A;

--color-success: #2F7A4D;

--color-error: #B53028;

--color-divider: #E2D9C7;

--font-display: 'Fraunces', Georgia, serif;

--font-body: 'Inter', -apple-system, sans-serif;

--radius-sm: 8px;

--radius-md: 12px;

--radius-lg: 16px;

--radius-xl: 24px;

--shadow-sm: 0 2px 8px rgba(15,42,74,.04);

--shadow-md: 0 6px 20px rgba(15,42,74,.10);

--shadow-lg: 0 12px 36px rgba(15,42,74,.14);

Typography scale (mobile / desktop):

H1: 36px/56px, line-height 1.05–1.1

H2: 28px/40px, line-height 1.15–1.2

H3: 22px/28px, line-height 1.25–1.3

Body large: 18px/20px, line-height 1.55

Body: 16px/17px, line-height 1.6

Detail: 14px, line-height 1.45

Load Google Fonts:

* Fraunces weights 400, 600, 800
* Inter weights 400, 500, 600

Preconnect to fonts.gstatic.com.

Apply font-display: swap.

Container: max-width 1140px, centered, padding 24px on desktop / 16px

on mobile.

Acceptance criteria:

* All CSS variables defined and resolved
* Body uses font-body, headings use font-display
* Page background: var(--color-bg)
* Text color: var(--color-text)
* All spacing uses the scale tokens

Do not implement components yet — just global tokens and typography.

 **Critérios de aceite** :

CSS variables presentes em DevTools.

Fontes Fraunces e Inter carregadas (Network tab).

Tipografia escala corretamente entre mobile e desktop.

**O que não fazer** : aplicar cores aleatórias, usar valores hardcoded em vez das variáveis.

#### **Prompt 3 — Hero section**

**** Build the Hero section using copy in Spanish, exactly as below.

Layout:

* Desktop: 2 columns (text 60%, photo 40%)
* Mobile: stacked, photo above headline
* Background: var(--color-bg)
* Padding-top: 96px desktop / 64px mobile
* Padding-bottom: 96px desktop / 48px mobile

Content:

Eyebrow (small uppercase, letter-spacing 3, var(--color-secondary)):

GRATIS · EN ESPAÑOL · 4 FECHAS EN MAYO

Headline (H1, font-display 800):

Las 3 Reglas de Oro del Sistema Financiero Canadiense

que el banco no te enseñó en español.

Subheadline (body large, var(--color-text-soft), max-width 540px):

Un seminario presencial gratuito de 45 minutos en Stoney Creek.

Aprende a organizar tu dinero, comprar tu primera casa en Ontario

y proteger a tu familia — sin presión de venta, sin jerga, en

español, frente a un buen café latino.

Primary CTA button:

Reservar mi silla gratuita

* Bg: var(--color-secondary)
* Text: var(--color-primary)
* Padding: 18px 32px
* Border-radius: var(--radius-md)
* Font-weight: 600
* Shadow: var(--shadow-md)
* Hover: brightness +8%, translate(-1px) on Y axis
* Anchor link to #rsvp-form

Microcopy below CTA (var(--color-text-soft), 14px):

✓ Tu silla 100% subsidiada — valor oficial $150 CAD

✓ 30 sillas por sesión · Espacios limitados

✓ Café latino, bocadillos y estacionamiento gratis

✓ Niñas y niños son bienvenidos

Photo:

Use placeholder image with alt="Amparo Camacho, educadora

financiera latina, sonriendo con una taza de café latino" — image

should be rounded with var(--radius-xl), with shadow var(--shadow-lg).

Acceptance criteria:

* Headline visible above the fold on desktop and mobile
* Single clear CTA, large and tappable (min 48px height on mobile)
* Photo right-aligned on desktop, centered above on mobile
* Microcopy bullets stack vertically, 4px gap

Do not include alternative versions or A/B logic yet.

 **Critérios de aceite** :

LCP carrega abaixo de 2.5s (verificar via Lighthouse).

CTA visível na primeira dobra em mobile (375px viewport).

Foto com lazy=eager (LCP candidate).

#### **Prompt 4 — Seções de narrativa (2 a 5)**

**** Build sections 2 to 5 in sequence, using the Spanish copy provided.

SECTION 2 — Identification ("¿Te suena familiar?")

* Background: var(--color-bg-alt)
* Padding: 80px 0 (desktop) / 56px 0 (mobile)
* Container max-width: 720px

Heading H2:

¿Te suena familiar?

List (font-body, body large, line-height 1.7):

• Llevas años pagando alquiler en Hamilton y la primera casa

parece más lejos cada año.

• Vas al banco, sales sin entender lo que el gerente te dijo en

inglés — y aún así, firmas.

• Tienes algo de dinero ahorrado, pero está en una cuenta que "no

rinde" — y no sabes por qué.

• Alguien te ofreció un seguro de vida y aún no estás seguro/a si

te conviene.

• Trabajas duro todos los días. Pero el dinero no parece crecer al

mismo ritmo que tu esfuerzo.

• Has visto videos en TikTok y YouTube, pero nada explica el

sistema canadiense, en español, paso a paso.

Closing line (italic, var(--color-text-soft)):

Si una sola de estas frases te describe — este seminario es

para ti.

──────────────

SECTION 3 — Problem

* Background: var(--color-bg)
* Padding: 80px 0 / 56px 0
* Container max-width: 720px

H2:

La verdad que nadie quiso decirte

Body (3 paragraphs in font-body, body large):

[paste the 3 paragraphs from copy file 06.5]

──────────────

SECTION 4 — Belief breaker

* Background: var(--color-primary)
* Text color: var(--color-bg)
* Padding: 96px 0 / 72px 0
* Center-aligned text
* Container max-width: 800px

Quote (font-display, H2 size, weight 600, line-height 1.2):

El problema no es cuánto ganas.

Es lo que el sistema hace con tu dinero

cuando no sabes en qué cuenta ponerlo.

Subtitle (body large, var(--color-secondary), italic, mt 24px):

La diferencia no es el sueldo. La diferencia son 3 reglas.

──────────────

SECTION 5 — Method preview (3 cards)

* Background: var(--color-bg-alt)
* Padding: 96px 0 / 72px 0
* Container max-width: 1140px

H2 centered:

Las 3 Reglas de Oro del Sistema Financiero Canadiense

Subtitle (body large, var(--color-text-soft), max-width 600px,

margin auto, centered, mb 64px):

En 45 minutos, vas a entender — en español, sin jerga — las 3

reglas que separan al latino que alquila para siempre del que

compra su casa en 5 años.

Three cards in a row (desktop) / stacked (mobile):

* Card padding: 32px / 24px
* Card bg: var(--color-bg)
* Card border-radius: var(--radius-lg)
* Card border: 1px solid var(--color-divider)
* Card shadow: var(--shadow-sm)
* Gap between cards: 24px

Card 1:

Number "①" (font-display, 56px, var(--color-secondary))

H3: La Limpieza

Body: Cómo organizar tu dinero en un mapa de 1 página antes de

ganar un dólar más.

Card 2:

Number "②"

H3: La Multiplicación

Body: El atajo matemático que decide en cuántos años tu dinero

se duplica — y cómo aplicarlo con las cuentas oficiales del

gobierno canadiense.

Card 3:

Number "③"

H3: El Escudo

Body: La diferencia entre proteger a tu familia y empobrecerla

con el seguro equivocado.

Acceptance criteria:

* Sections alternate background colors (bg / bg-alt / bg / primary / bg-alt)
* Section 4 (belief breaker) is high-contrast, immediately notices
* Section 5 cards equal height
* All copy in Spanish, exactly as written



#### **Prompt 5 — Sobre Amparo**

**** Build Section 6 — About Amparo Camacho.

Layout:

* Desktop: 2 columns (photo 40% / text 60%, gap 64px)
* Mobile: photo on top, centered, 280px max width, then text
* Background: var(--color-bg)
* Padding: 96px 0 / 72px 0
* Container max-width: 1040px

Photo column:

* Square aspect ratio
* Border-radius: var(--radius-xl)
* Shadow: var(--shadow-lg)
* Alt text: "Amparo Camacho, educadora financiera latina,

fundadora del programa Las 3 Reglas de Oro"

Text column:

Eyebrow (uppercase, var(--color-secondary), letter-spacing 3):

SOBRE AMPARO

H2:

La educadora que traduce el sistema canadiense al español

Body (font-body, body, 3 paragraphs — use placeholder text marked

clearly as [TO VALIDATE WITH AMPARO]):

[VALIDAR — Párrafo 1: origen e identidad]

Soy Amparo Camacho, originaria de [PAÍS]. Llegué al Canadá hace

[X] años, con [contexto]. Como tú, trabajé duro. Como tú, fui al

banco y salí sin entender lo que me habían dicho.

[VALIDAR — Párrafo 2: misión]

Un día, una amiga me preguntó: "¿Por qué nadie nos explica esto

en español?" No supe responder. Pero supe que tenía que cambiarlo.

Desde entonces, he ayudado a [X] familias latinas en Hamilton y

en el sur de Ontario a [transformación específica].

[VALIDAR — Párrafo 3: compromiso público]

Mi compromiso contigo no es venderte un producto. Es darte las

herramientas para que tomes tus propias decisiones — informadas,

en tu idioma, con la matemática a tu favor.

Por eso este seminario es gratis. Por eso no se cierran contratos

en el lugar. Por eso siempre lo abro con un café latino.

Credentials list (4 bullet items, with check icon):

✓ Licenciada por [LLQP / mutual funds CIRO / etc.]

✓ Más de [X] años de experiencia en el sistema financiero canadiense

✓ [X] familias latinas atendidas en Hamilton y región

✓ En asociación con Primerica · Licencias bajo solicitud

Style notes:

* Eyebrow color: var(--color-secondary)
* H2: var(--color-primary), font-display 600
* Paragraphs: var(--color-text)
* Credentials list: 14px, var(--color-text-soft)

Acceptance criteria:

* Photo is the first thing visible on mobile in this section
* Bio paragraphs visually mark [VALIDAR] placeholders so the editor

can replace them

* Credentials section feels distinct (slightly smaller, separated

by 24px from paragraphs)



#### **Prompt 6 — Detalhe das 3 Reglas**

**** Build Section 7 — Method detail.

Background: var(--color-bg-alt)

Padding: 96px 0 / 72px 0

Container max-width: 880px

H2 centered:

Lo que vas a aprender el día del seminario

Subtitle (body, var(--color-text-soft), max-width 640px, mt 16px,

mb 64px):

Tres reglas. 45 minutos. Un plan que te llevas a casa.

Three blocks stacked vertically, separated by 64px:

Block 1:

Label (eyebrow, var(--color-secondary)): REGLA 1

H3 (font-display, 32px): La Limpieza

Bullet list:

• El mapa financiero de 1 página que ordena tu situación actual

sin enredos contables.

• Las 3 cuentas básicas que toda familia latina en Ontario

debería tener antes de pensar en invertir.

• El error más común al manejar dólares y remesas — y cómo

corregirlo en una semana.

Block 2:

Label: REGLA 2

H3: La Multiplicación

Bullet list:

• La regla de los 72: el atajo matemático que decide en cuántos

años tu dinero se duplica.

• TFSA y FHSA explicados en español, con un ejemplo real de una

familia en Stoney Creek.

• Cómo combinar ambas cuentas para acelerar tu down payment de

la primera casa.

Block 3:

Label: REGLA 3

H3: El Escudo

Bullet list:

• La diferencia entre seguro de vida temporal (term) y permanente

— y por qué la mayoría compra el equivocado.

• La estrategia de "compra el temporal e invierte la diferencia"

— explicada en 5 minutos.

• Cómo proteger a tu familia con un costo mensual menor al de tu

plan de celular.

Style:

* Each block separated by 1px solid var(--color-divider) or 64px gap
* Bullet color: var(--color-success) for ✓ check icon, then text

in var(--color-text)

* H3 font-weight: 700

Acceptance criteria:

* Blocks read as a sequence (numbered visually)
* All copy in Spanish, exact match
* Mobile: blocks stack with 48px gap



#### **Prompt 7 — Benefícios**

**** Build Section 8 — Benefits grid.

Background: var(--color-bg)

Padding: 96px 0 / 72px 0

Container max-width: 1140px

H2 centered:

Lo que te llevas a casa

Subtitle (body, var(--color-text-soft), max-width 600px, mt 16px,

mb 64px, centered):

No solo conocimiento. También claridad emocional, herramientas

prácticas y una hoja de ruta de 5 años.

Three columns (desktop) / stacked (mobile):

* Card padding: 32px
* Card bg: var(--color-bg-alt)
* Card border-radius: var(--radius-lg)
* Gap: 24px
* Each card has equal height

Column 1 — EMOCIONAL (with icon: heart-line)

Header: EMOCIONAL (eyebrow, var(--color-accent))

H3 (font-display, 22px): Tranquilidad

Bullet list:

• La tranquilidad de entender, por primera vez, lo que el banco

te dijo durante años.

• La confianza para hablar de dinero con tu pareja, tus padres,

tus hijos — en español, sin tropezar.

• El alivio de saber que tu próxima decisión financiera no será

un salto al vacío.

Column 2 — PRÁCTICO (with icon: clipboard-list)

Header: PRÁCTICO

H3: Herramientas

Bullet list:

• Un plan financiero de 1 página, escrito a mano, que se queda

contigo.

• Una "Lista de Revisión Financiera del Inmigrante Latino" en PDF.

• La opción de agendar una cita privada gratuita conmigo — sin

obligación, sin venta, sólo si tú decides.

Column 3 — ESTRATÉGICO (with icon: route)

Header: ESTRATÉGICO

H3: Hoja de ruta

Bullet list:

• Acceso a una comunidad de familias latinas que están

construyendo patrimonio en Ontario.

• Saber qué preguntas hacer en tu próxima visita al banco — y

cómo escuchar las respuestas que importan.

• Una hoja de ruta de 5 años para pasar del alquiler a la

propiedad.

Style:

* Use Lucide icons for the column headers (heart, clipboard-list,

route), color: var(--color-secondary), 32px

* Eyebrow text: uppercase, letter-spacing 3, 12px

Acceptance criteria:

* Three columns equal width and equal height
* Mobile stacks them with 24px gap
* All bullet items aligned to the left



#### **Prompt 8 — Detalhes do evento + form de RSVP**

**** Build Section 9 — Event details and Section 10 — RSVP form.

SECTION 9 — Event details

Background: var(--color-bg-alt)

Padding: 96px 0 / 72px 0

Container max-width: 880px

H2 centered:

Detalles del evento

Two-column layout (desktop) / stacked (mobile):

Left column — Logística

[icon: map-pin] Lugar

1254 South Service Road, Suite B2-4

Stoney Creek, Ontario L8E 5R9

[icon: calendar] Fechas y horarios disponibles

Selecciona la sesión que mejor te convenga al reservar:

Viernes 22 de mayo — 5:00 PM

Viernes 22 de mayo — 7:00 PM

Sábado 23 de mayo — 3:00 PM

Sábado 23 de mayo — 5:00 PM

Sábado 23 de mayo — 7:00 PM

Viernes 29 de mayo — 5:00 PM

Viernes 29 de mayo — 7:00 PM

Sábado 30 de mayo — 3:00 PM

Sábado 30 de mayo — 5:00 PM

Sábado 30 de mayo — 7:00 PM

[icon: clock] Duración

45 minutos de contenido + 15 minutos de preguntas y networking.

Llega 15 minutos antes para el café latino y los bocadillos.

Right column — Lo que sí / Lo que no

✅ Lo que sí va a pasar

• Vas a aprender en español, claro y sin jerga.

• Vas a recibir un plan de 1 página listo para aplicar.

• Vas a poder agendar una cita privada gratuita conmigo.

• Vas a comer bocadillos y tomar un buen café latino.

❌ Lo que NO va a pasar

• No se cierran contratos en el lugar.

• No se aceptan tarjetas de crédito.

• No hay presión de venta de ningún tipo.

• No tienes que dar tu número de seguro social.

Below the two columns, a logistics row:

🅿️ Estacionamiento gratis al frente

🚌 Conexión por HSR cerca

👶 Niñas y niños bienvenidos

──────────────

SECTION 10 — RSVP form

Background: var(--color-bg)

Padding: 96px 0 / 72px 0

Container max-width: 720px

H2 centered:

Reserva tu silla — antes que se acaben

Subtitle (body, var(--color-text-soft)):

300 sillas en total · 30 por sesión · 4 fechas en mayo

Después, esperarás 6 a 8 semanas para una cita privada.

Form (id="rsvp-form"):

Field 1 — Nombre completo (text, required, autocomplete="name")

Field 2 — WhatsApp (tel, required, placeholder "+1 (XXX) XXX-XXXX",

autocomplete="tel")

Field 3 — Correo electrónico (email, required, autocomplete="email")

Field 4 — Sesión preferida (select, required) with the 10 options

listed above

Form styling:

* Inputs full-width
* Border: 1px solid var(--color-divider)
* Border-radius: var(--radius-sm)
* Padding: 14px 16px
* Focus: border var(--color-primary), outline 2px var(--color-primary)

with 2px offset

* Label above input, font-detail, var(--color-text-soft)
* Stacked vertically, gap 16px

Submit button (full-width):

* Same style as primary CTA from Hero
* Text: "Reservar mi silla gratuita"
* Loading state: replace text with "Reservando..." + spinner
* Disabled state: opacity 0.5

Privacy microcopy below form (12px, var(--color-text-soft)):

🔒 Tu información es privada. No vendemos ni compartimos tus datos.

Solo Amparo y su equipo te van a contactar sobre el seminario.

Form submission:

* POST to GoHighLevel webhook (configurable URL)
* Pass UTM params from URL as hidden fields
* On success, redirect to /gracias?nombre=[Nombre]
* On error, show inline toast: "Algo no funcionó. Intenta de nuevo

o escribe a [email]."

Fire Meta Pixel event "Lead" with value 7 and currency CAD on

successful submission.

Acceptance criteria:

* Form is keyboard-navigable (tab order: name → whatsapp → email →

sesión → submit)

* All fields validated on blur
* Phone validated as Canadian format
* Email standard regex
* Form survives keyboard submit (Enter)
* Mobile: button is full-width and 56px tall (thumb-friendly)



#### **Prompt 9 — FAQ accordion**

**** Insert a FAQ block right above the RSVP form (Section 10).

Background: var(--color-bg)

Padding-top: 0 (continues from Event details)

Container max-width: 720px

H2 centered (mb 48px):

Preguntas frecuentes

Accordion items (10 questions). Each item:

* Border: 1px solid var(--color-divider)
* Padding: 20px 16px
* Border-radius: var(--radius-md)
* Cursor: pointer
* Stacked vertically with 12px gap
* Question font-display 600 18px var(--color-primary)
* Answer font-body 16px var(--color-text), reveals on click
* Chevron icon: ▸ closed / ▾ open, animated 200ms

Items (use exactly):

1. ¿Es realmente gratis?

→ Sí. El costo oficial del seminario es $150 CAD. Para esta

edición, tu silla está 100% subsidiada por nuestros

patrocinadores locales.

2. ¿Es venta disfrazada?

→ No. En los primeros 5 minutos hago un juramento público:

"Aquí no se cierran contratos. No se aceptan tarjetas." Es

educación. Lo que decidas hacer después es tuyo.

3. ¿En qué idioma se imparte el seminario?

→ 100% en español. Sin traductor, sin frases en inglés.

4. ¿Cuánto dura?

→ 45 minutos de contenido + 15 minutos de preguntas y

networking. Total: una hora.

5. ¿Puedo llevar a mi pareja?

→ Sí, pero idealmente cada persona reserva su propia silla,

para que pueda llevar su material y tener su seguimiento

individual.

6. ¿Puedo llevar a mis hijos?

→ Sí. Las niñas y niños son bienvenidos. Hay espacio para

que las familias completas se sientan cómodas.

7. ¿Qué necesito llevar?

→ Una libreta, un bolígrafo y una pregunta que siempre

quisiste hacer y nunca te atreviste.

8. ¿Y si no puedo asistir el día que reservé?

→ Contéstame el correo de confirmación o mándame un WhatsApp.

Te muevo a otra de las 9 sesiones disponibles, sin problema.

9. ¿Cómo confirmo mi silla?

→ Llena el formulario de abajo. En las próximas horas vas a

recibir un audio mío de WhatsApp confirmando tu silla.

10. ¿Quién es Amparo Camacho?

→ Soy educadora financiera latina, en asociación con

Primerica (licencias verificables bajo solicitud). Mi misión

es traducir el sistema financiero canadiense para nuestra

comunidad. He atendido a más de [X] familias latinas en

Hamilton y región.

Acceptance criteria:

* Accordion is keyboard accessible (Enter and Space toggle)
* aria-expanded attribute updates correctly
* Only one item open at a time (optional behavior — toggle off if

the user wants multiple open)

* Mobile: full-width, comfortable tap targets (min 44px height)



#### **Prompt 10 — Mobile + sticky CTA**

**** Optimize the page for mobile and add a sticky bottom CTA.

Mobile-specific tweaks:

* Hero photo: max-height 280px, object-fit cover
* Reduce hero padding-top to 64px on mobile
* Method preview cards: stack with 16px gap
* About Amparo: photo centered max-width 280px, then text
* Benefits: stack with 24px gap
* Event details: collapse two columns into one (logística first,

then "lo que sí / no")

* Make all CTAs full-width on mobile

Sticky CTA bar:

* Visible only on mobile (max-width 768px)
* Appears after user scrolls past the Hero (use IntersectionObserver

on the hero section)

* Position: fixed, bottom: 0, left: 0, right: 0
* Background: var(--color-bg) with shadow var(--shadow-lg) above
* Padding: 12px 16px
* Contains:

Left side (60%): small text "30 sillas por sesión · 4 fechas en mayo"

Right side (40%): primary button "Reservar →" linking to #rsvp-form

* Smooth slide-up entrance (translateY)
* Disappears when the user reaches the RSVP form section

(IntersectionObserver on #rsvp-form)

Acceptance criteria:

* Sticky bar does not overlap content (add margin-bottom 80px to

body on mobile to prevent footer occlusion)

* Sticky bar disappears when form is in view
* Sticky bar respects safe area inset (iPhone notch)
* All sections legible at 375px viewport width



#### **Prompt 11 — Otimização de conversão**

**** Apply CRO improvements:

1. Add a counter showing "sillas reservadas" near the form (use a

placeholder static value for now — to be wired to the database

later):

"Ya hay [X] sillas reservadas de 300."

Place it directly above the form heading, eyebrow style.

2. Add testimonials placeholder block below "Sobre Amparo" section:

Background: var(--color-bg-alt)

3 cards with "[VALIDAR — Testimonio de cliente real]" placeholders.

Each card: 3 lines of italic text + author name + city.

Note: clearly mark these as TO BE FILLED, do not invent.

3. Add "Trust signals" row right under the Hero, full-width:

Background: var(--color-primary)

Text: var(--color-bg)

Padding: 16px 0

Centered text in a single line on desktop, scrolling marquee on

mobile if too long:

"✓ Sin venta · Sin contratos · Sin tarjetas · Sólo educación clara,

en español"

4. Make the Hero CTA repeat right after Section 5 (Method preview)

in the form of a centered link block:

"¿Listo para reservar tu silla?"

[ Reservar mi silla gratuita ]

5. Add UTM persistence — read utm\_source, utm\_medium, utm\_campaign,

utm\_content, utm\_term from the URL on page load and append them

as hidden fields to the form.

6. Add Meta Pixel base code in with the pixel ID as

environment variable. Fire PageView on load.

7. Configure GA4 measurement ID via env var, fire PageView on load.

Acceptance criteria:

* Trust signals visible immediately under Hero
* 2 CTA buttons total above the fold (Hero + repeat after Method)
* UTM params survive form submission and arrive at GoHighLevel
* Meta Pixel and GA4 fire PageView (verify with Facebook Pixel

Helper and GA DebugView)



#### **Prompt 12 — Refinamento visual final**

**** Polish the visual layer:

1. Add subtle scroll-reveal animations:

* Sections fade-in + translate-up 24px when entering viewport
* 150ms ease-out
* Trigger only once per section
* Respect prefers-reduced-motion (disable when set to reduce)

2. Add hover micro-interactions:

* Method preview cards: lift translateY -4px on hover, shadow

intensifies to var(--shadow-lg)

* FAQ items: background tint slightly darker on hover
* Photo of Amparo: subtle 1.02 scale on hover, 400ms ease

3. Add a decorative thin gold line above each H2 (40px width, 2px

height, var(--color-secondary), centered, mb 16px):

4. Number stylization in Method preview cards:

* Use ① ② ③ as content
* Font-display, 64px desktop / 48px mobile
* Color var(--color-secondary)
* Vertical position: absolute top-right of each card with subtle

opacity 0.6

5. Add a soft ornament image (e.g., a single coffee bean SVG) at the

top of "¿Te suena familiar?" section — decorative only, alt="".

6. Footer styling:

* Background: var(--color-primary)
* Text: var(--color-bg-alt)
* Padding: 64px 0 32px
* 3 columns (desktop): brand + nav links + disclaimer
* Stacked on mobile
* Disclaimer in font-detail 12px, var(--color-bg-alt) at 70% opacity
* Include the legal text:

"Información educativa. No constituye recomendación de inversión

personalizada. Servicios financieros ofrecidos en asociación

con Primerica Financial Services. Licencias disponibles bajo

solicitud."

* Copyright line:

"© 2026 Amparo Camacho. Todos los derechos reservados."

Acceptance criteria:

* Animations smooth and not distracting
* prefers-reduced-motion respected (test in DevTools)
* Footer feels heavy enough to "close" the page
* Disclaimer is legible but visually subordinate



#### **Prompt 13 — Revisão de acessibilidade**

**** Run accessibility audit and apply fixes:

1. Heading hierarchy:

* Verify single

  # in Hero
* Verify all sections use

  ##
* Subblocks within sections use

  ###
* No heading levels skipped

2. Color contrast:

* Run all text against background through WCAG AA (4.5:1 body,

3:1 large text)

* Adjust var(--color-text-soft) if needed
* Verify gold text (#C9A227) on cream (#FAF7F2) passes for body

(it doesn't — use it only on H3 24px+ or with darker bg)

3. Keyboard navigation:

* Test full Tab sequence
* Verify focus rings visible on every interactive element
* Skip-to-content link at top of page (visually hidden until

focused)

4. Form accessibility:

* Every input has a  (visible or visually-hidden)
* Inputs have aria-describedby pointing to error messages
* Errors announce via aria-live="polite"
* Required fields marked aria-required="true"

5. Image alt text:

* Photo of Amparo: descriptive alt
* Decorative images: alt=""
* Logo SVG:
