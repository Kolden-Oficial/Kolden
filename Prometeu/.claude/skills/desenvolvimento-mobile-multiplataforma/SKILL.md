---
name: desenvolvimento-mobile-multiplataforma
description: Use ao decidir a stack de um app mobile novo — matriz de decisão React Native vs Flutter vs Kotlin Multiplatform vs nativo puro (Swift/Kotlin), considerando equipe existente, performance/UI-nativo, hot-reload, ecosistema, integração com hardware e distribuição (App Store, Play Store, TestFlight, Firebase App Distribution). Default Kolden = React Native (compartilha stack web); casos para nativo puro = hardware-intensivo + AR + audio real-time + jogos. Dono&#58; @dev (Dex) + @architect (Aria). Cross-link `arquitetura-mobile-offline-first`, `virtualizacao-e-perf-de-listas` (FlatList/FlashList), `sistema-de-design` (Harmonia) para tokens cross-platform.
---

# Desenvolvimento Mobile Multiplataforma — Matriz de Decisão

## Quando invocar

- Novo projeto: escolher stack antes do primeiro sprint
- Reavaliação: app existente com dor em uma dimensão (perf, DX, contratação)
- Discussão: "vale migrar de X para Y?" (raramente vale — inércia domina)
- Rascunho técnico para PRD (`geracao-de-prd`) com seção de plataforma

## As 4 rotas canônicas

### 1. React Native (Meta) — DEFAULT Kolden

**Modelo:** JavaScript/TypeScript + React → renderiza UI **nativa** de cada plataforma via bridge/JSI. UI real (não WebView).

**Vantagens:**
- Compartilha stack e talento com Next.js/React web (Kolden já tem)
- Hot reload rápido (Fast Refresh)
- Ecossistema maduro (Expo, React Navigation, TanStack Query)
- Reuso de lógica de negócio direto do web
- OTA updates via Expo/CodePush (fix sem re-submeter à store)

**Desvantagens:**
- Perf de animação complexa < nativo (mas Reanimated 3 + Fabric fecham o gap para 95% dos casos)
- Bridge para APIs nativas exóticas exige módulo custom
- Startup time levemente maior que nativo puro
- Novo modelo (Fabric/TurboModules) exige atenção em libs antigas

**Quando escolher (default Kolden):**
- App SaaS/produtividade/social/comércio
- Time já domina React (curva zero)
- Precisa iOS + Android com paridade
- Ciclo de release rápido (CodePush)

**Padrões default Kolden:**
- Expo (managed workflow) para 90% dos casos
- TypeScript strict
- Reanimated 3 para animação
- FlashList (Shopify) em vez de FlatList para listas grandes
- Zustand ou TanStack Query para state
- NativeWind para estilo (Tailwind cross-platform)

### 2. Flutter (Google)

**Modelo:** Dart + widget tree → renderiza tudo próprio via Skia (não usa UI nativa da plataforma).

**Vantagens:**
- UI 100% consistente cross-platform (pixel-perfect)
- Perf de animação excelente (60/120fps confiáveis)
- Hot reload muito bom
- Único codebase para iOS + Android + Web + desktop (embora web/desktop ainda maturando)

**Desvantagens:**
- Dart não é usado em backend/web/AI — talent isolado
- Bundle size maior (embute engine)
- UI não parece "de plataforma" por default (widget material/cupertino, mas nem sempre convence usuário iOS)
- Ecossistema menor que RN em libs de negócio (auth, pagamentos)

**Quando escolher:**
- Design custom fortíssimo (Google, Alibaba, BMW usam por isso)
- Animação/motion como diferencial de produto
- Time novo, sem legado React (perde vantagem RN)
- Distribuição em plataformas atípicas (Fuchsia OS, embedded)

### 3. Kotlin Multiplatform (JetBrains)

**Modelo:** Kotlin compartilhado para **lógica de negócio**; UI nativa (SwiftUI + Jetpack Compose) por plataforma. NÃO é "escreva uma vez"; é "escreva a lógica uma vez, UI por plataforma".

**Vantagens:**
- UI genuinamente nativa em cada lado
- Alta perf (nativo em ambos)
- Compartilhamento incremental (adota parcial)
- Muito bom para times que JÁ TÊM iOS + Android nativos e querem consolidar lógica

**Desvantagens:**
- Requer TALENTO em Swift/Kotlin + Kotlin Multiplatform (raro)
- Não elimina duas UIs — cada tela é escrita duas vezes
- Ferramentas em amadurecimento (Compose Multiplatform 1.x)
- Menos comunidade que RN/Flutter

**Quando escolher:**
- Empresa já tem apps iOS + Android nativos maduros
- Consolidar lógica sem reescrever UI
- Compromisso longo-prazo com o approach (KMP é aposta técnica, não conveniência)

### 4. Nativo puro (Swift + Kotlin) — casos específicos

**Quando escolher:**
- Hardware-intensivo: câmera custom, sensores, ARKit/ARCore avançado
- Audio real-time (DAW, música ao vivo, VoIP com processamento)
- Jogos (Unity/Unreal ou nativo)
- App do sistema (widget de home screen complexo, app clip iOS, watchOS)
- Perf absoluta com startup < 200ms
- Tamanho de app crítico (< 20MB)

**Custo:** duplicação de time (iOS + Android), duplicação de bug, duplicação de release. Justifique com dado, não intuição.

## Matriz de decisão sumarizada

```
| Critério                          | RN     | Flutter | KMP   | Nativo |
|-----------------------------------|:------:|:-------:|:-----:|:------:|
| Time já domina React              |   ✅   |   ❌    |   ❌  |   ❌   |
| UI 100% consistente pixel-perfect |   ⚠️   |   ✅    |   ❌  |   ❌   |
| Perf de animação high-end         |   ⚠️   |   ✅    |   ✅  |   ✅   |
| Hardware/AR/audio intensivo       |   ❌   |   ⚠️    |   ✅  |   ✅   |
| OTA update (fix sem store)        |   ✅   |   ❌    |   ❌  |   ❌   |
| Talent pool disponível            |   ✅   |   ⚠️    |   ❌  |   ✅   |
| Startup time                      |   ⚠️   |   ⚠️    |   ✅  |   ✅   |
| Compartilha com web               |   ✅   |   ⚠️    |   ❌  |   ❌   |
| Custo de manutenção               |  Baixo | Baixo   | Médio |  Alto  |
```

## Distribuição — checklist mínimo

Independente da stack:

- [ ] **App Store Connect** (iOS): certificados, provisioning, Xcode Cloud ou CI
- [ ] **Google Play Console** (Android): keystore, assinatura, Play App Signing
- [ ] **TestFlight** (beta iOS): sempre. Não solte na store sem beta interno
- [ ] **Firebase App Distribution** ou **Google Play internal testing**: beta Android
- [ ] **Provisioning automation:** fastlane (RN/Flutter/KMP) ou Xcode Cloud
- [ ] **Icon + splash + metadata**: automatizado (Expo/Flutter geram)
- [ ] **Privacy manifest** (iOS 17+): declaração de dados coletados
- [ ] **Play Store data safety**: idem Android
- [ ] **Crash reporting**: Sentry (Kolden padrão) desde v0.1
- [ ] **Analytics**: PostHog/Amplitude com evento por AC
- [ ] **Feature flag**: cross-link `estrategias-de-deploy-zero-downtime` (LaunchDarkly, PostHog)

## Deep-link + universal link

**iOS Universal Links** + **Android App Links** — não use scheme custom (`myapp://`) como default. Universal Links casam com domínio (Kolden.com.br → app), abre sem prompt, sobrevive a whatsapp/telegram.

Setup:
- iOS: `apple-app-site-association` no domínio
- Android: `assetlinks.json` no domínio + intent-filter `autoVerify=true`
- RN: `react-native-linking` ou `expo-linking`

## Segurança mobile mínima

- **Não** guarde token em `AsyncStorage` cru — use Keychain (iOS) / EncryptedSharedPreferences (Android). RN: `expo-secure-store`
- **Certificate pinning** para APIs críticas (financeiro) — `TrustKit` (iOS) / `okhttp CertificatePinner` (Android) / `react-native-cert-pinner`
- **Root/jailbreak detection** só se compliance exigir — mais teatro que segurança contra atacante determinado
- **Deep-link handler** valida origem antes de agir (não confia em query params)
- **App Transport Security** ativo (iOS bloqueia HTTP; use exceção só para dev local)

Cross-link Égide `seguranca-mobile-estatica` (SAST mobile).

## Cross-links

- `arquitetura-mobile-offline-first` — quase todo app mobile precisa; obrigatório se dados dependem de sync
- `virtualizacao-e-perf-de-listas` — FlashList em RN, ListView.builder em Flutter, LazyColumn em Compose
- `sistema-de-design` (Harmonia) — tokens cross-platform (NativeWind, ThemeExtension em Flutter)
- `estrategias-de-deploy-zero-downtime` — OTA + feature flag = deploy separado de release
- `slo-error-budget-burn-rate` — SLI mobile inclui cold start time, crash-free session rate

## Herança histórica

**React Native team (Meta / Meta Open Source)** — Bruno Fahmy, Christoph Nakazawa (ex-lead), Kevin Gozali. Arquitetura nova (Fabric + TurboModules + Hermes) é lançamento de 2022-2024 que fecha o gap com nativo em 95% dos casos.

**Flutter team (Google)** — Tim Sneath, Adam Barth, Eric Seidel. Skia como renderer + Dart AOT são as apostas centrais. Flutter 3.x consolidou multi-target.

**Kotlin Multiplatform team (JetBrains)** — Andrey Breslav (Kotlin creator), Dmitry Jemerov. KMP entrou em stable em 2023 (Kotlin 1.9); Compose Multiplatform amadurece 2024+.

**Chris Lattner** (Swift creator, ex-Apple, ex-Tesla) — Swift como linguagem de sistema. Referência quando o problema é performance real (audio, ML on-device via Core ML).

**Jetpack Compose team (Google Android)** — Adam Powell, Filip Pizlo. Compose vira default Android moderno; alinha bem com KMP.

**Evan Bacon & Charlie Cheever** (Expo) — abstração que fez React Native ganhar do que sobrou de Cordova/Ionic. Expo SDK 50+ com prebuild + development builds virou "o jeito" de usar RN em 2024+.

## Anti-padrões

- ❌ WebView-based (Ionic, Cordova) para app novo — perf ruim, App Store aversa, sem justificativa em 2026
- ❌ Escolher stack por hype sem checar talent pool local
- ❌ Migrar RN → Flutter porque "Flutter é melhor" sem PoC medido
- ❌ Rodar app sem crash reporting no dia do launch — cego para o real
- ❌ Guardar refresh token em AsyncStorage plaintext
- ❌ Deep-link scheme custom como único caminho de entrada
- ❌ Ignorar review da App Store — cause de bloqueio comum: rejected metadata, incomplete privacy manifest

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
