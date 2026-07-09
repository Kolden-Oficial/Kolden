# Dossiê — Site Vilela Construction

**Repositório:** [`Koldenoficial/vilela-bright-space`](https://github.com/Koldenoficial/vilela-bright-space)
**Pasta local:** `C:\Kolden\sobre-a-empresa\Projetos\Ativos\vilela-construction\vilela-bright-space\`
**Último commit no momento do dossiê:** `7a6c0a0 — Criou página de Obrigado`
**Data do dossiê:** 2026-07-09
**Idioma do site:** Inglês (público-alvo Kennesaw, GA & Greater Atlanta)
**Origem do build:** Lovable (Tanstack Start template `tanstack_start_ts`)

---

## 1. Identidade do site

- **Marca:** Vilela Construction
- **Praça:** Kennesaw, Georgia + Greater Atlanta
- **Categoria de serviço:** Remodelação residencial premium (kitchen, bathroom, flooring, painting)
- **Proposta central:** *"Transform your home with the premium quality and peace of mind you deserve."*
- **Diferenciais declarados:** limpeza do canteiro, comunicação transparente, dedicação artesanal.
- **Meta título (home):** `Vilela Construction — Premium Home Remodeling in Kennesaw, GA`
- **Meta descrição (home):** `Kitchen, bathroom and flooring remodeling in Kennesaw & Greater Atlanta. Clear communication, immaculate cleanliness, premium craftsmanship. Get your free estimate today.`

---

## 2. Arquitetura técnica

### 2.1 Stack

| Camada | Tecnologia |
|---|---|
| Framework | **TanStack Start** (`@tanstack/react-start` 1.167) + TanStack Router 1.168 + TanStack Query 5.83 |
| Runtime UI | **React 19.2** + TypeScript 5.8 |
| Build | **Vite 7.3** com `vite-tsconfig-paths` e plugin `@lovable.dev/vite-tanstack-config` |
| Estilo | **Tailwind CSS v4.2** (`@tailwindcss/vite`) + `tw-animate-css` + `class-variance-authority` + `tailwind-merge` |
| UI kit | **shadcn/ui** sobre **Radix UI** (26 componentes primitives instalados) |
| Ícones | `lucide-react` 0.575 |
| Formulários | `react-hook-form` 7.71 + `zod` 3.24 + `@hookform/resolvers` |
| Datas / carrossel / OTP | `date-fns`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `vaul` |
| Toaster | `sonner` |
| Gerenciador de pacotes | **Bun** (`bun.lock` + `bunfig.toml`) |
| Server / SSR | `nitro` 3.0 (beta) via TanStack Start |

### 2.2 Estrutura de pastas relevante

```
src/
├── routes/
│   ├── __root.tsx      # shell HTML, GTM, meta OG globais
│   ├── index.tsx       # landing (/)
│   └── thank-you.tsx   # página de agradecimento (/thank-you)
├── components/
│   ├── BeforeAfter.tsx # slider antes/depois custom
│   └── ui/             # componentes shadcn/ui
├── hooks/use-mobile.tsx
├── assets/             # 15 imagens (logo, hero, before/after, serviços)
├── lib/
├── router.tsx
├── server.ts / start.ts
├── styles.css
└── routeTree.gen.ts    # gerado
```

### 2.3 Rotas ativas

| Path | Arquivo | Propósito |
|---|---|---|
| `/` | `routes/index.tsx` | Landing page principal |
| `/thank-you` | `routes/thank-you.tsx` | Página pós-envio de formulário |
| `*` (404) | `NotFoundComponent` em `__root.tsx` | Página não encontrada |

---

## 3. Assets visuais

15 imagens em `src/assets/`:

| Arquivo | Uso atual |
|---|---|
| `logo.png` | Nav + footer + thank-you |
| `hero-bathroom.jpg` | Hero background da home + thank-you |
| `hero-kitchen.jpg` | **Não usado** (candidato a A/B do hero) |
| `clean-workspace.jpg` | Seção "Our Approach" |
| `kitchen-before.jpg` + `kitchen-after.jpg` | Slider Before/After — cozinha |
| `bathroom-before.jpg` + `bathroom-after.jpg` | Slider Before/After — banheiro |
| `basement-before.jpg` + `basement-after.jpg` | **Não usados** (potencial expansão da galeria) |
| `service-kitchen.jpg` | Card serviço 1 |
| `service-bathroom.jpg` | Card serviço 2 |
| `service-flooring.jpg` | Card serviço 3 |
| `service-painting.jpg` | Card serviço 4 |
| `service-deck.jpg` | **Não usado** (serviço "deck" não é vendido na landing atual) |

**Fontes tipográficas** (Google Fonts, carregadas por preconnect + stylesheet):
- `Montserrat` pesos 500/600/700 — display / heading
- `Inter` pesos 400/500/600/700 — body

---

## 4. Conteúdo textual — página `/`

Ordem canônica de renderização: **Nav → Hero → Gallery → Problem → Services → WhyUs → Testimonials → FinalCTA → Footer**.

### 4.1 Nav (fixed top)

- Logo Vilela Construction (link para `#top`).
- Links: **Our Approach** (`#problem`), **Services** (`#services`), **Gallery** (`#gallery`), **Reviews** (`#testimonials`).
- CTA principal: **Free Estimate** (âncora `#contact`).
- Mobile: menu hambúrguer com os mesmos links + CTA.

### 4.2 Hero (`#top`)

- **H1:** *Transform your home with the premium quality and peace of mind you deserve.*
- **Sub:** *From start to finish — clear communication, immaculate cleanliness, and absolute dedication. We treat every project like it's our own home.*
- **CTA primário:** `Get Your Free Estimate` → `#contact`
- **CTA secundário (link):** `Explore our work` → `#services`
- **Background:** `hero-bathroom.jpg` com duplo gradiente escuro (top-to-bottom e right-to-left).

### 4.3 Gallery — Before & After (`#gallery`)

- **Eyebrow:** *Before & After*
- **H2:** *See the transformation for yourself.*
- **Sub:** *Drag the slider to reveal real projects, real craftsmanship.*
- **Card 1 — Modern Kitchen Transformation** — *Custom cabinetry, quartz countertops & new hardwood flooring.*
- **Card 2 — Spa-Inspired Bathroom** — *Porcelain slab walls, custom shower & freestanding tub.*
- **CTA:** `Transform Your Home Today` → `#contact`
- Componente `BeforeAfter` custom (slider arrastável) em `src/components/BeforeAfter.tsx`.

### 4.4 Problem — Our Approach (`#problem`)

- **Eyebrow:** *Our Approach*
- **H2:** *Remodeling your home shouldn't be a **nightmare of stress and mess**.* (última clause em itálico)
- **Parágrafo 1:** *We know that opening your home to a remodeling project requires massive trust. Too many contractors leave a mess behind, disappear mid-project, or keep you in the dark about costs.*
- **Parágrafo 2:** *At Vilela Construction, we do things differently. Our core focus is delivering exceptional, high-end craftsmanship while keeping the workspace clean and keeping you fully informed every single step of the way.*
- **Badge sobreposto na foto:** `100%` + *Workspace cleaned at the end of every workday.*
- **CTA:** `Get Your Free Estimate` → `#contact`

### 4.5 Services (`#services`)

- **Eyebrow:** *Our Services*
- **H2:** *Expert remodeling services tailored to your home.*
- **CTA final:** `Start Your Project Today` → `#contact`

| # | Card | Copy |
|---|---|---|
| 1 | **Kitchen Remodeling** | The heart of your home, designed for your lifestyle with flawless countertop and cabinetry installation. |
| 2 | **Bathroom Renovations & Custom Showers** | Turn your bathroom into a private oasis with modern tiling, custom showers, and porcelain slab installations. |
| 3 | **Premium Flooring** | Expert installation of solid hardwood, luxury vinyl plank (LVP), laminate, and precision tile work. |
| 4 | **Interior Painting & Finishing** | The detailed, high-quality final touches that bring your space together and boost your property value. |

### 4.6 WhyUs (fundo brand-scarlet)

- **Eyebrow:** *Why Hire Us*
- **H2:** *Three promises that make every Vilela project different.*
- **CTA:** `Experience the Vilela Difference` → `#contact`

| # | Promessa | Copy | Ícone (SVG inline) |
|---|---|---|---|
| 1 | **Unmatched Cleanliness** | We respect your living space. Our team cleans up after themselves before they leave, every single day. | casa/telhado |
| 2 | **Transparent Communication** | No hidden fees, no unexpected delays. From start to finish, you get clear updates you can trust. | balão de fala |
| 3 | **Dedicated Craftsmanship** | We don't cut corners. We focus on the tiny details that ensure your beautiful results last for years. | chave/ferramenta |

### 4.7 Testimonials (`#testimonials`)

- **Eyebrow:** *What Our Customers Say*
- **H2:** *Trusted by homeowners across Greater Atlanta.*
- **CTA:** `Join Our Happy Homeowners` → `#contact`
- **Estado:** **3 cards com placeholder** (⚠️ pendente — ver §7):
  - Texto: *"Enter a powerful testimonial here that makes potential customers see how much your business is trustworthy"* (repetido 3×)
  - Autoria: `Maria P.` (3×), sem role
  - Rating fixo de 5 estrelas

### 4.8 FinalCTA / Contact (`#contact`)

- **Eyebrow:** *Get Started*
- **H2:** *Ready to bring your **dream home** to life?* (última clause em itálico)
- **Sub:** *Put your remodeling project in the hands of professionals who treat your home like their own. Contact us today to schedule your consultation.*
- **Trust indicators (checklist):**
  1. Serving Kennesaw, GA & Greater Atlanta
  2. Kitchen, Bathroom & Flooring Specialists
  3. 100% Customer Satisfaction Guaranteed
- **Formulário:** iframe embed do GoHighLevel — `https://links.kolden.com.br/widget/form/NPkCo9JhSx7016RFCJd0` (form name: `Marketing Form - Claim Offer`, altura 1088px).

### 4.9 Footer

- Logo + `© {ano-corrente} Vilela Construction. All rights reserved.`
- `Kennesaw, GA & Greater Atlanta`
- Link `Free Estimate` → `#contact`

---

## 5. Conteúdo textual — página `/thank-you`

Meta: `<meta name="robots" content="noindex, nofollow">` — excluída da indexação.

### 5.1 Header

- Logo (link para `/`) + link secundário `Back to home`.

### 5.2 Hero

- **Eyebrow:** *Request received*
- **H1:** *Thank you — we've got your request.*
- **Sub:** *Thanks for reaching out to Vilela Construction. A member of our team will review your project details and get back to you within one business day to schedule your free in-home consultation.*
- Ícone de check dentro de círculo branco translúcido.
- Background: `hero-bathroom.jpg` com gradiente hero.

### 5.3 What happens next (3 passos)

| # | Título | Copy |
|---|---|---|
| 01 | **We review your request** | Our project team reviews the details you shared to prepare for a productive first call. |
| 02 | **We reach out to you** | Expect a call, text, or email within one business day to answer questions and set a time to meet. |
| 03 | **Free in-home consultation** | We visit your home, listen to your vision, take measurements, and put together a clear, transparent estimate. |

### 5.4 Need to reach us sooner?

- **H2:** *Need to reach us sooner?*
- **Sub:** *If your project is time-sensitive or you'd like to speak with us right away, feel free to get in touch directly.*
- **CTA telefone:** `Call us now` → `tel:+17705551234` ⚠️ (número **placeholder** — ver §7)
- **CTA secundário:** `Return to homepage`
- **Rodapé de urgência:** *Proudly serving Kennesaw, GA & Greater Atlanta*

### 5.5 Footer

- Logo + copyright + `Licensed & insured — Kennesaw, GA`.

---

## 6. Instrumentação de marketing e analytics

### 6.1 Google Tag Manager

- **Container ID:** `GTM-NG8LP66S`
- Inicializado no `RootShell` de `__root.tsx` via script inline + fallback `<noscript>` no `<body>`.
- Cobre home e thank-you (todo o shell).

### 6.2 GoHighLevel (GHL)

- **Endpoint do form:** `https://links.kolden.com.br/widget/form/NPkCo9JhSx7016RFCJd0`
- **Script embed:** `https://links.kolden.com.br/js/form_embed.js` (async, na home)
- **Form ID:** `NPkCo9JhSx7016RFCJd0`
- **Form name:** `Marketing Form - Claim Offer`
- **Subdomínio white-label Kolden:** `links.kolden.com.br` (agência)

### 6.3 dataLayer — evento `form_submit_vilela`

Dois caminhos de disparo, com trava anti-duplo push (`alreadyPushed`):

**Caminho A — na home (`routes/index.tsx`)**

1. `window.addEventListener('message', ...)` — inspeciona `postMessage` de origens GHL (regex: `kolden.com.br | leadconnectorhq | msgsndr | gohighlevel`) e procura por sinais de submit (`form_submit`, `formSubmitted`, `leadConversion`, `"type":"submit"`, `success`, `thank`).
2. Fallback: `setInterval` de 1s monitora o iframe `#inline-NPkCo9JhSx7016RFCJd0` — se `src` mudar para URL com `thank | success | submitted`, dispara.

Payload:
```json
{
  "event": "form_submit_vilela",
  "form_name": "Marketing Form - Claim Offer",
  "form_id": "NPkCo9JhSx7016RFCJd0",
  "source": "postMessage:<origin>" | "iframe-src-change"
}
```

**Caminho B — na página `/thank-you`**

Dispara no `useEffect` de montagem:
```json
{
  "event": "form_submit_vilela",
  "form_name": "vilela_lead_form",
  "source": "thank_you_page"
}
```

⚠️ **Discrepância intencional:** os dois pushes usam `form_name` diferente (`Marketing Form - Claim Offer` vs `vilela_lead_form`), permitindo separar no GTM os leads capturados via evento pós-submit dos que aterrizam no thank-you por outra rota.

### 6.4 Debugging embutido

Console logs no browser:
- `[Vilela] GHL postMessage: <origin> <raw>` — visibilidade de payloads GHL.
- `[Vilela] form_submit_vilela pushed to dataLayer: <source>`
- `[Vilela] form_submit_vilela pushed from thank-you page`

---

## 7. Placeholders, gaps e riscos identificados

| # | Onde | Problema | Impacto |
|---|---|---|---|
| 1 | `routes/index.tsx` §Testimonials | Os 3 depoimentos usam texto placeholder repetido (*"Enter a powerful testimonial here..."*) e nome único `Maria P.` | Prova social falsa/inexistente — **alto** risco de erosão de confiança e possível violação de regras de publicidade (FTC nos EUA exige depoimentos verídicos). |
| 2 | `routes/thank-you.tsx` §Need to reach us sooner | Telefone `tel:+17705551234` é placeholder (padrão Kennesaw area code `770` + `555-1234`) | Cliente pós-lead não consegue ligar — CTA morto. |
| 3 | `routes/__root.tsx` §meta | Título global permanece `Lovable App`; `author` = `Lovable`; `og:image` aponta para `id-preview-...lovable.app` no R2 do Lovable | Compartilhamentos sociais mostram identidade Lovable, não Vilela. Home tem `title` sobrescrito, mas thank-you também sobrescreve — as OG images herdadas do root são o problema real. |
| 4 | `assets/` | `hero-kitchen.jpg`, `basement-before.jpg`, `basement-after.jpg`, `service-deck.jpg` estão versionados mas não são referenciados no código | Ou são reservas para expansão (galeria de basement, serviço de deck, A/B do hero) ou lixo — decidir. |
| 5 | Galeria Before/After | Somente 2 pares (cozinha + banheiro) — os 4 serviços em §4.5 mencionam também flooring e painting | Descompasso "vendemos 4, mostramos 2". |
| 6 | Testimonials §CTA | *"Join Our Happy Homeowners"* — retórica sem número/prova | Reforça o problema #1. |
| 7 | Sem página de portfólio/projetos além da galeria | Só a landing e o thank-you existem | Fluxo de descoberta 100% single-page — SEO limitado a uma URL. |
| 8 | Sem menções a licenciamento, seguro, GC# na home | Footer do thank-you diz *Licensed & insured*, mas home não afirma | Em serviços de construção nos EUA, isso é um driver de conversão crítico. |
| 9 | `noindex` só no thank-you | `robots` global não configurado | Verificar se o `/thank-you` fica de fato fora do indexador (nível de rota está ok). |

---

## 8. Convenções de código e design tokens

### 8.1 Alias e paths

- `@/*` resolve para `src/*` (via `vite-tsconfig-paths` + `tsconfig.json`).
- Rotas geradas em `src/routeTree.gen.ts` (não editar à mão).

### 8.2 Design tokens Tailwind (referenciados no JSX)

Cores semânticas usadas via classes utilitárias:
- `bg-background` / `text-foreground` — base
- `bg-brand` / `text-brand-foreground` / `text-brand` — cor da marca (aplicada em CTAs, eyebrows, seção `WhyUs`)
- `bg-card` / `border-border` — superfícies
- `text-muted-foreground` — texto secundário
- `bg-secondary/60`, `bg-primary`, `bg-accent`, `text-primary-foreground` — só no `/thank-you`

CSS custom properties invocadas via inline style:
- `var(--gradient-soft)` — background das seções Problem, Gallery, FinalCTA
- `var(--gradient-hero)` — overlay do hero da thank-you
- `var(--shadow-card)` / `var(--shadow-elegant)` — sombras
- `var(--font-display)` — família tipográfica display

**Nota:** o mapeamento real dos tokens (valor hex do `brand`, definições dos gradientes/shadows) vive em `src/styles.css` — **não lido neste dossiê**; auditar se precisa customizar cor de marca.

### 8.3 Padrão de seção

Todas as seções da home seguem o mesmo esqueleto:
```
<section id="..." className="py-24 md:py-32 ...">
  <div className="max-w-7xl mx-auto px-5 lg:px-8">
    <eyebrow class="text-xs font-semibold tracking-[0.25em] text-brand uppercase" />
    <h2 class="mt-4 text-4xl md:text-5xl leading-tight" />
    <content />
    <CTA button — sempre âncora #contact />
  </div>
</section>
```

---

## 9. Como rodar localmente

```bash
cd C:\Kolden\sobre-a-empresa\Projetos\Ativos\vilela-construction\vilela-bright-space
bun install
bun run dev        # vite dev — porta padrão Vite (5173)
bun run build      # build de produção
bun run build:dev  # build em modo development
bun run preview    # servir build local
bun run lint       # eslint
bun run format     # prettier --write
```

---

## 10. Próximas ações sugeridas (não executadas)

Ordem por impacto sobre conversão:

1. **Substituir os 3 testimonials placeholder** por depoimentos reais (ou remover a seção até coletar).
2. **Trocar telefone placeholder** em `thank-you.tsx:160` pelo número real do Vilela.
3. **Sobrescrever meta OG** no `__root.tsx` (title, author, og:image) para identidade Vilela, ou deixar rotas filhas sempre sobrescreverem `og:image` também.
4. **Decidir sobre assets órfãos** (`hero-kitchen`, `basement-*`, `service-deck`) — expandir seção ou remover.
5. **Ampliar galeria Before/After** para cobrir os 4 serviços vendidos (ou reduzir a lista de serviços).
6. **Adicionar credenciais** (Licensed # GC..., insured, anos no mercado) em seção nova ou no `WhyUs` da home.
7. **Auditar `src/styles.css`** para confirmar que o token `brand` bate com a identidade visual do Vilela.

---

## 11. Referências cruzadas

- **Pasta-mãe do projeto:** `C:\Kolden\sobre-a-empresa\Projetos\Ativos\vilela-construction\`
- **Dossiê geral do cliente:** `dossie.md` (mesma pasta)
- **Diagnóstico de tracking:** `diagnostico-tracking-2026-07-01.md` (mesma pasta) — verificar se o `form_submit_vilela` já foi validado em GTM debug view.
- **GHL agência Kolden:** `links.kolden.com.br` — form e script embed vêm daqui.
- **Repo:** [github.com/Koldenoficial/vilela-bright-space](https://github.com/Koldenoficial/vilela-bright-space)
