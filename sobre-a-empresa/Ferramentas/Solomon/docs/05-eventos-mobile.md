# 05 — Eventos mobile (SDK React Native)

Fonte: https://docs.solomon.com.br/events/mobile

O SDK React Native da Solomon rastreia os **mesmos 8 eventos de funil** do SDK web, envia os mesmos dados ao backend, e roda tanto em **bare React Native** quanto em **Expo managed workflow**.

## Parâmetros de inicialização

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `companyId` | string | ID de 20 caracteres da loja na Solomon |
| `debug` | boolean | Opcional — ativa logs de debug |
| `useTouchpoint` | boolean | Opcional — envia eventos ao pixel (necessário para atribuição) |
| `appIdentifier` | string | Opcional — Bundle ID do app (ex.: `com.suaempresa.app`); usado no `current_domain` |
| `storage` | StorageAdapter | Opcional — adapter customizado (ex.: MMKV) no lugar do AsyncStorage padrão. Precisa expor `getItem`, `setItem`, `removeItem` retornando Promise |

## Instalação

```bash
# 1. SDK + storage obrigatório
npm install @solomon-tech/events-react-native @react-native-async-storage/async-storage

# 2. (Opcional) telemetria completa do device
npm install react-native-device-info @react-native-community/netinfo react-native-install-referrer

# 3. iOS
cd ios && pod install && cd ..
```

Sem as dependências opcionais o SDK funciona normalmente, mas `device_id`, `device_model`, `connection_type` e `install_referrer` ficam com valores padrão.

**Expo managed workflow** — adicione ao `app.json`:

```json
{
  "expo": {
    "plugins": [
      "react-native-device-info",
      "@react-native-community/netinfo"
    ]
  }
}
```

## Inicialização com Context

```tsx
// SolomonContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SolomonSDK } from '@solomon-tech/events-react-native';

const SolomonContext = createContext<SolomonSDK | null>(null);

export function SolomonProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<SolomonSDK | null>(null);

  useEffect(() => {
    const instance = new SolomonSDK({
      companyId: 'SEU_COMPANY_ID',
      debug: true,
      useTouchpoint: true,
      appIdentifier: 'com.suaempresa.app',
    });
    setSdk(instance);
    return () => instance.destroy();
  }, []);

  if (!sdk) return null;
  return <SolomonContext.Provider value={sdk}>{children}</SolomonContext.Provider>;
}

export function useSolomon(): SolomonSDK {
  const context = useContext(SolomonContext);
  if (!context) throw new Error('useSolomon deve ser usado dentro de um SolomonProvider');
  return context;
}
```

```tsx
// App.tsx
import { SolomonProvider } from './contexts/SolomonContext';

export default function App() {
  return (
    <SolomonProvider>
      {/* resto da aplicação */}
    </SolomonProvider>
  );
}
```

## Rastreamento de telas

### Manualmente

```tsx
export function ProductScreen() {
  const solomon = useSolomon();
  useEffect(() => {
    solomon.setScreenName('ProductScreen');
    solomon.track('VIEW_PAGE');
  }, [solomon]);
  return (/* ... */);
}
```

### Com React Navigation

O hook `useSolomonScreenTracking` atualiza o nome da tela automaticamente via `setScreenName`. O `VIEW_PAGE` continua responsabilidade de cada tela:

```tsx
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useSolomonScreenTracking } from '@solomon-tech/events-react-native/hooks';

function AppNavigator() {
  const solomon = useSolomon();
  const navigationRef = useNavigationContainerRef();
  const onStateChange = useSolomonScreenTracking(solomon, navigationRef);

  return (
    <NavigationContainer ref={navigationRef} onStateChange={onStateChange}>
      {/* suas telas */}
    </NavigationContainer>
  );
}
```

## Deep links e UTMs

Para pontos de contato via app, o SDK precisa ler deep links (ex.: `https://sualoja.com/produto?utm_source=google&utm_medium=cpc`).

### Manualmente

```tsx
import { Linking } from 'react-native';

function DeepLinkHandler() {
  const solomon = useSolomon();
  useEffect(() => {
    Linking.getInitialURL().then(url => { if (url) solomon.handleDeepLink(url); });
    const subscription = Linking.addEventListener('url', event => solomon.handleDeepLink(event.url));
    return () => subscription.remove();
  }, [solomon]);
  return null;
}
```

### Com o hook

```tsx
import { useSolomonDeepLinks } from '@solomon-tech/events-react-native/hooks';

function DeepLinkHandler() {
  const solomon = useSolomon();
  useSolomonDeepLinks(solomon);
  return null;
}
```

UTMs extraídos de deep links são **persistidos no device** e enviados em todos os eventos subsequentes, até que um novo deep link com UTMs diferentes chegue.

## Disparando eventos

Idêntico ao SDK web — mesmos 8 eventos:

```tsx
// Visualização
await solomon.track('CONTENT_VIEW', {
  id: 'produto-123',
  title: 'Camiseta Azul',
  price: 49.90,
  variant: 'M',
});

// Add to cart
await solomon.track('ADD_TO_CART', {
  item_id: 'produto-123',
  item_quantity: 2,
});

// Checkout com aliases
await solomon.track('CHECKOUT_COMPLETED', {
  items: [{ item_id: 'produto-123', item_quantity: 2 }],
}, {
  email: 'cliente@exemplo.com',
  order_id: 'PED-456',
  phone: '11999999999',
});
```

Aliases: `email`, `phone`, `user_id`, `customer_id`, `cart_token`, `order_id`.

## Storage customizado (MMKV)

```tsx
import { MMKV } from 'react-native-mmkv';
const mmkv = new MMKV();

const sdk = new SolomonSDK({
  companyId: 'SEU_COMPANY_ID',
  storage: {
    getItem: (key) => Promise.resolve(mmkv.getString(key) ?? null),
    setItem: (key, value) => { mmkv.set(key, value); return Promise.resolve(); },
    removeItem: (key) => { mmkv.delete(key); return Promise.resolve(); },
  },
});
```