---
name: Technical Debt
description: Problemas técnicos conhecidos, padrões incorretos ativos e limitações de performance identificados na análise arquitetural. Consultar antes de modificar qualquer um dos componentes listados.
type: feature
tipo: projeto
projeto: catalogo
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/architecture-overview|architecture-overview]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/database-schema|database-schema]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/external-integrations|external-integrations]]"
  - "[[sobre-a-empresa/Projetos/Ativos/catalogo/.lovable/memory/features/security-constraints|security-constraints]]"
---

## Sistemas duplicados (não adicionar um terceiro)

### Toast / Notificações
- **Situação:** dois sistemas coexistem em `App.tsx`: `<Toaster />` (Radix) e `<Sonner />` (Sonner)
- **Padrão correto:** usar **exclusivamente** `sonner`
  ```ts
  import { toast } from "sonner"; // ← correto
  // toast.success("...") / toast.error("...") / toast.info("...")
  ```
- **Nunca** usar o hook `useToast` de `src/hooks/use-toast.ts` para novos componentes — é o sistema legado Radix
- **Arquivo duplicado:** `use-toast.ts` existe em `src/hooks/` E `src/components/ui/` — são o mesmo arquivo, não criar um terceiro

### Lockfiles
- Projeto tem `bun.lock`, `bun.lockb` E `package-lock.json` — inconsistência de package manager
- **Usar `npm`** como padrão para novos installs (`npm install <pacote>`)
- Nunca commitar novos lockfiles de outros gerenciadores (yarn.lock, pnpm-lock.yaml)

## Performance — não agravar esses padrões

### Dashboard: queries sem aggregate (problema ativo)
`src/pages/Dashboard.tsx` busca dados de forma ineficiente:
```ts
// ❌ Carrega TODOS os purchase_value em memória para somar
supabase.from("conversions").select("purchase_value")

// ❌ Busca links + todos os clicks + todas as conversions aninhados
supabase.from("links").select("id, channel, clicks(id, conversions(purchase_value))")
```
- **Nunca** adicionar mais queries sem `limit()` ou `.count()` nesse padrão
- O Dashboard precisará de RPCs SQL (`SUM`, `COUNT` no banco) — quando refatorar, usar `get_dashboard_kpis()` RPC

### React Query sem staleTime
```ts
// src/App.tsx — QueryClient sem configuração
const queryClient = new QueryClient(); // staleTime = 0 → re-fetch em todo mount
```
- Qualquer `useQuery` novo vai re-fetch desnecessariamente até isso ser corrigido
- Ao adicionar novas queries, passar `staleTime: 60_000` localmente como workaround

## Funcionalidades stub (UI visível, não implementada)

### Meta Sync toggle no Dashboard
```ts
// src/pages/Dashboard.tsx:45-55
const handleMetaSyncToggle = (checked: boolean) => {
  // ← setTimeout simulado, não chama nenhuma API real
  setTimeout(() => toast.success("Sincronização simulada concluída."), 2000);
};
```
- O switch "Sincronizar Custos do Meta Ads" aparece na UI mas não faz nada real
- Não remover a UI sem implementar a chamada real à Graph API

## Dead code (não importar em produção)

### `src/lib/mock-data.ts`
- Arquivo com dados mock (KPIs, links, logs, canais) usado durante desenvolvimento inicial
- Nenhuma página de produção o importa atualmente
- **Nunca** importar `mock-data.ts` em componentes de produção
- Candidato à remoção futura

## Type safety degradada

### `as any[]` no Dashboard
```ts
// src/pages/Dashboard.tsx:86
for (const link of linksData as any[]) { ... }
```
- Perde type safety nos dados mais críticos do dashboard
- Ao refatorar o Dashboard, tipar corretamente com `Tables<"links"> & { clicks: ... }`

## Dependências provavelmente não usadas

Instalados via shadcn mas possivelmente sem uso real nas páginas atuais:
- `embla-carousel-react` — Carousel (shadcn)
- `react-resizable-panels` — Resizable (shadcn)
- `vaul` — Drawer (shadcn)
- `next-themes` — ThemeProvider (não instanciado no App.tsx)
- `input-otp` — OTP input (shadcn)

Antes de usar qualquer um desses em nova feature, verificar se já está em uso para evitar duplicar lógica.

## Arquivo gerado (não editar manualmente)

- `src/integrations/supabase/types.ts` — gerado pelo Supabase CLI
- `src/integrations/supabase/client.ts` — gerado pelo Lovable/Supabase
- Para atualizar os tipos, rodar: `supabase gen types typescript --project-id <id> > src/integrations/supabase/types.ts`
