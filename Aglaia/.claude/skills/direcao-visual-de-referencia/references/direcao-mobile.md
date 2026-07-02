# Direção mobile — adaptação para app screens

> Extensão de `direcao-visual-de-referencia/SKILL.md` para pedidos de app
> mobile. As regras principais (dials, disciplina de paleta, anti-slop,
> continuidade) permanecem — este arquivo cobre APENAS as diferenças em
> relação à direção de landing web.

## Escopo

Serve para:
- Onboarding flows
- Auth flows (login, signup, MFA)
- Home dashboard
- Profile / settings screens
- Chat screens
- E-commerce mobile (browse, product, cart, checkout)
- Fintech mobile (accounts, transactions, invest)
- Health / fitness
- Productivity
- Social apps
- Utility apps
- Concept multi-screen
- Redesigns premium de app

NÃO serve para: websites, landing pages, dashboards desktop, image-to-code,
implementação frontend, code generation.

## Diferenças de dial default (mobile vs web)

| Dial | Web | Mobile |
|---|---|---|
| VISUAL_DENSITY | 4 | 3 |
| ART_DIRECTION | 8 | 9 |
| PLATFORM_AWARENESS | — | 9 |
| SPACING_GENEROSITY | 8 | 9 |
| CLARITY_DISCIPLINE | — | 10 |
| TEXT_READABILITY_PRIORITY | — | 10 |
| MOCKUP_FRAME_DISCIPLINE | — | 9 |
| CONTENT_FIRST_MOCKUP_BALANCE | — | 10 |

## Regra dura de saida — versao mobile

**Uma imagem por SCREEN. Sempre.**

- Fluxo de onboarding com 5 screens - 5 imagens
- App concept 8 screens - 8 imagens
- "Redesign do meu app" sem contagem - default 6 screens
- "Full app concept" sem contagem - default 10 screens

Formatos:
- iPhone 15 Pro (3:6.5)
- iPhone 14 (3:6.3)
- Android Pixel (9:19.5)
- iPad quando o app for tablet-first (4:5.6)

Sempre vertical. Sempre um-screen-por-frame.

## Platform-awareness

**iOS-native cues:**
- Tab bar embaixo com 3-5 icones simples
- Navigation title grande em cima (Large Title) OU compact
- SF Symbols-like iconography (sem cair em Material)
- Sheet modals com corner radius forte
- Toques de sistema (haptics implicitos por design)
- Backgrounds mais quietos

**Android-native cues:**
- App bar em cima com acoes a direita
- FAB (Floating Action Button) quando acao principal for unica
- Bottom navigation ou Navigation Drawer
- Material 3-flavored corners e elevation (nao copiar 1:1)
- Motion pattern mais obvio

**Cross-platform:**
- Manter iconography consistente sem ser generica
- Iconografia custom sutil (nao Feather/Material default)
- Bottom sheet como padrao de detail
- Card-based information architecture

## Diferencas de composicao

### Hero → primeira screen do fluxo
Onboarding: opening screen premium com statement curto + CTA claro.
Auth: input logo + campo primario + acessos secundarios (SSO)
sem card explosion.
Home: hierarquia clara — greeting + primary action + secondary content.

### Anchors por screen
- Top-heavy (nav + hero content em cima, acao embaixo)
- Center-focus (cartao central grande, secundarios abaixo)
- Bottom-CTA (conteudo em cima, CTA fixo no bottom safe area)
- Split-screen (image ocupando 40-50% top, content 50-60% bottom)
- Full-bleed image + text overlaid em safe area
- List-heavy (feed vertical com hierarquia visual forte)

Mesma regra do web: no minimo 3 anchors DIFERENTES ao longo do fluxo.

### Backgrounds por screen
- Solid + card content
- Textured/paper subtle
- Photo full-bleed no header + card stack embaixo
- Gradient tonal (palette-matched, low chroma)
- Duotone image no hero + neutral screens no resto
- Editorial side-image so em app editorial-first

## Frame do device mockup

**Regra CONTENT_FIRST_MOCKUP_BALANCE:**
- Device frame presente por default, mas SUTIL
- Margens even ao redor do phone
- Frame nao domina — o conteudo e o hero
- Sem status bar exagerado
- Sombra sob o phone e sutil ou ausente
- Ambient background do mockup: matte, tactile, palette-matched

Nunca:
- Phone rotacionado 45 graus com sombra dramatica
- Phone flutuando com glow neon
- Mockup gratuito de "device stack" quando o fluxo pede screens individuais
- Frame chrome dominando o screen content

## Anti-slop mobile especifico

Banidos:
- Fake fintech dashboards com charts random
- Screens onboarding clonados (mesma composicao 4x)
- Cards flutuantes demais (mais de 3 por screen)
- Pills e tags overload
- Ignorar safe-area (notch, home indicator)
- Nav logic fraca
- Website encolhido em phone frame
- Gradient dribbble clones roxo-azul
- Glassmorphism sem proposito
- Text minusculo ilegivel
- Muito conteudo above the fold
- Complexidade fake em vez de boa hierarquia mobile
- Backgrounds flat estereis sem texture ou atmosfera
- Palettes genericas
- Purple-blue startup default
- Cores random bright
- Icon set generico de dev tool
- Layouts simplistas que ficam vazios em vez de elegantes
- Screen sets drifting entre design systems diferentes
- Device mockups inconsistentes com margens irregulares
- Frame dominando o screen content

## Consistency rule

Atraves de TODAS as screens do fluxo:
- Mesmo device mockup
- Mesma margem ao redor do phone
- Mesma familia tipografica e escala
- Mesmo icon family
- Mesmo tratamento de imagem
- Mesmo status bar treatment
- Mesma linguagem de card e radius
- Mesmo primary color / accent
- Mesma familia de CTA

Um visitante scrollando as screens tem que ver UM app.

## Fluxos default

### 4 screens (mini app)
1. Onboarding intro
2. Auth / setup
3. Home / primary action
4. Success / done state

### 6 screens (default)
1. Splash / opening
2. Onboarding 2
3. Auth
4. Home dashboard
5. Detail / interaction
6. Profile / settings

### 8 screens (full concept)
1. Splash
2. Onboarding intro
3. Onboarding value
4. Auth
5. Home
6. Detail / secondary
7. Profile / settings
8. Empty / edge state

### 10 screens (extended)
1-8 acima
9. Filter / search
10. Success / celebration state

## Clarity check adicional (mobile)

- Safe area (notch, home indicator, keyboard) considerada?
- Tap targets visualmente >= 44pt (iOS) ou >= 48dp (Android)?
- Text minimo NAO parece pequeno demais?
- Nav pattern consistente?
- Acao primaria clara em cada screen?
- Empty state provido para no minimo uma screen do fluxo?
- Frame do device e even em todas as imagens?
- Content e o hero, nao o mockup chrome?

---

Adaptado de github.com/Leonxlnx/taste-skill@06d6028b5c623016c59ce8536f578e5a1127b499 (MIT) — skill `imagegen-frontend-mobile`.
