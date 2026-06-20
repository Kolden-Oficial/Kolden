# CLAUDE.md — Projeto Mobile (React Native)

## Visão Geral do Projeto

- **Nome:** [APP_NAME]
- **Descrição:** [O que o app faz]
- **Tipo:** Aplicação mobile
- **Framework:** React Native / Expo
- **Plataformas:** iOS + Android
- **Status:** [Desenvolvimento / Beta / Produção]

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|-------|-----------|---------|
| Framework | React Native | 0.76.x |
| Tooling | Expo SDK | 52.x |
| Linguagem | TypeScript | 5.x |
| Navegação | React Navigation | 7.x |
| Estado (cliente) | Zustand | 5.x |
| Busca de Dados | TanStack Query | 5.x |
| Estilização | NativeWind / StyleSheet | — |
| Formulários | React Hook Form + Zod | — |
| Auth | Supabase Auth | — |
| Testes | Jest + React Native Testing Library | — |
| Testes E2E | Detox / Maestro | — |

## Estrutura de Diretórios

```
src/
  app/                    # Telas do Expo Router (roteamento baseado em arquivos)
    (tabs)/               # Grupo do navegador de abas
    (auth)/               # Telas do fluxo de auth
    _layout.tsx           # Layout raiz
  components/
    ui/                   # Componentes base de UI (Button, Input, Card)
    shared/               # Componentes compostos compartilhados
    features/             # Componentes específicos de funcionalidades
  hooks/                  # Hooks customizados
  stores/                 # Stores do Zustand
  services/               # Serviços de API e integrações externas
  lib/                    # Bibliotecas utilitárias
  types/                  # Definições de tipos do TypeScript
  constants/              # Constantes do app (cores, espaçamento, config)
  assets/                 # Imagens, fontes, animações
    images/
    fonts/
    animations/           # Arquivos Lottie
ios/                      # Projeto nativo iOS
android/                  # Projeto nativo Android
```

## Considerações Específicas por Plataforma

### iOS
- Alvo mínimo de deploy: iOS 15.0
- Teste tanto no iPhone quanto no iPad se for universal
- Trate as safe area insets com `SafeAreaView` ou `useSafeAreaInsets()`
- Solicite permissões de forma elegante (câmera, localização, notificações)
- Trate o desvio do teclado em formulários

### Android
- SDK mínimo: 24 (Android 7.0)
- Trate o comportamento do botão voltar com a navegação
- Teste em várias densidades de tela (mdpi, hdpi, xhdpi, xxhdpi)
- Trate permissões específicas do Android no `AndroidManifest.xml`
- Teste a navegação por gestos vs navegação por botões

### Arquivos Específicos por Plataforma
```
Component.tsx             # Compartilhado (padrão)
Component.ios.tsx         # Override exclusivo do iOS
Component.android.tsx     # Override exclusivo do Android
```

Use `Platform.select()` para diferenças menores:
```typescript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 } },
    android: { elevation: 4 },
  }),
});
```

## Padrões de Navegação

### Stack Navigation
```typescript
// Use navegação tipada
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: undefined;
};
```

### Tab Navigation
- Máximo de 5 abas
- Use ícones + rótulos para acessibilidade
- Badge para contagem de notificações

### Deep Linking
- Configure o esquema de URL: `myapp://`
- Trate universal links (iOS) e App Links (Android)
- Teste com `npx uri-scheme open myapp://profile/123`

## Gerenciamento de Estado

### Estado Local
- `useState` para estado com escopo no componente
- `useReducer` para lógica complexa de componente

### Estado Global (Zustand)
- Persista com `zustand/middleware` + AsyncStorage
- Aguarde a hidratação antes de renderizar telas protegidas
- Separe as stores por domínio (auth, preferências, carrinho)

### Estado do Servidor (TanStack Query)
- Configure o suporte offline com `onlineManager`
- Use atualizações otimistas para uma UX responsiva
- Defina o `staleTime` apropriadamente (maior no mobile para reduzir o consumo de dados)

## Comandos Comuns

```bash
# Desenvolvimento
npx expo start             # Inicia o servidor de dev do Expo
npx expo start --ios       # Abre no Simulador iOS
npx expo start --android   # Abre no Emulador Android
npx expo start --web       # Abre no navegador web

# Build
eas build --platform ios                 # Build iOS
eas build --platform android             # Build Android
eas build --platform all                 # Ambas as plataformas

# Testes
npm test                   # Executa os testes com Jest
npm run test:e2e:ios       # Testes E2E no iOS
npm run test:e2e:android   # Testes E2E no Android

# Qualidade de Código
npm run lint               # Verificação com ESLint
npm run typecheck          # Verificação do TypeScript
npm run format             # Formatação com Prettier

# Nativo
npx pod-install            # Instala os CocoaPods do iOS
npx react-native link      # Linka módulos nativos (legado)
```

## Build e Deploy

### EAS Build
```bash
eas build:configure                      # Configuração inicial
eas build --profile development          # Build de desenvolvimento
eas build --profile preview              # Testes internos
eas build --profile production           # Submissão à loja
```

### Atualizações Over-the-Air
```bash
eas update --branch production           # Envia atualização OTA
eas update --branch preview              # Atualização de preview
```

## Estratégia de Testes

| Nível | Ferramenta | Alvo |
|-------|------|--------|
| Unitário | Jest | Hooks, utilitários, stores |
| Componente | RNTL | Componentes de UI (renderização, interação) |
| Integração | Jest + RNTL | Fluxos em nível de tela |
| E2E | Detox/Maestro | Jornadas completas do usuário |
| Visual | Storybook RN | Catálogo de componentes |

### Dicas de Teste
- Use `@testing-library/react-native` em vez do Enzyme
- Faça mock dos módulos `react-native`: `Animated`, `Platform`, etc.
- Teste ambas as plataformas ao usar `Platform.select()`
- Use `jest.useFakeTimers()` para testes de animação
- Faça mock do `AsyncStorage` para testes de store

## Notas Importantes

- Sempre teste em dispositivos reais antes do release (simuladores não captam problemas de performance)
- Mantenha o tamanho do bundle pequeno: faça lazy-load das telas, otimize as imagens
- Trate o estado offline de forma elegante — enfileire ações para sincronização
- Siga as diretrizes do Apple HIG e do Material Design
- Nunca fixe dimensões no código — use layouts responsivos com Dimensions/useWindowDimensions
- Teste a acessibilidade com leitores de tela (VoiceOver no iOS, TalkBack no Android)
- Use `react-native-reanimated` para animações a 60fps (evite a API Animated para casos complexos)
- Trate mudanças de estado do app (background, foreground) para atualização de dados
