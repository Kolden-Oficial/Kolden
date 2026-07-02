---
name: arquitetura-mobile-offline-first
description: Use ao desenhar app mobile que precisa funcionar SEM conexão, ou com conexão intermitente — local-first data (SQLite/Realm/WatermelonDB), sync eventual (CRDTs com Automerge/Yjs quando factível, Last-Write-Wins com timestamp autoritativo quando não), conflict resolution UI, queue de mutações, background sync com retry e backoff, otimista UI. Regra&#58; usuário nunca vê spinner se tem dado local. Dono&#58; @architect (Aria) + @dev (Dex). Cross-link `desenvolvimento-mobile-multiplataforma` (stack), `migracao-zero-downtime` (evoluir schema local), `invariantes-de-pipeline-de-dados` (integridade na chegada ao backend).
---

# Arquitetura Mobile Offline-First

## Quando invocar

- App usado em campo (delivery, logística, saúde, agricultura) — conectividade intermitente é regra
- App consumer com uso subway/avião (leitura, notas, música)
- App B2B com fluxo crítico que não pode depender de rede em cada tap
- Wearables e IoT companion
- Requisito de PRD: "funciona offline" ou "sincroniza depois"

## O princípio

**"Server is authoritative" está morto para mobile moderno.** Local-first, o cliente é uma fonte legítima de verdade que **eventualmente concilia** com servidor. Toda leitura, toda escrita, todo render é local. Rede é assíncrona.

Ink & Switch (2019) publicou o paper "Local-first software" que definiu 7 propriedades ideais:
1. No spinners (leitura sempre instantânea)
2. Work not trapped on one device (sync entre devices do próprio usuário)
3. Network is optional
4. Seamless collaboration (multi-user)
5. Long-term storage
6. Security and privacy by default
7. You retain ultimate ownership

Nem sempre atingimos todas 7 — mas cada uma que sacrifica é decisão consciente.

## Camadas da arquitetura

```
┌──────────────────────────────────────────┐
│ UI (React Native / Compose / SwiftUI)    │
│  ↑ leitura reativa (query subscription)  │
│  ↓ escrita otimista (mutation local)      │
├──────────────────────────────────────────┤
│ Local DB (SQLite/Realm/WatermelonDB)     │
│  ↕ observers, indexes, migrations         │
├──────────────────────────────────────────┤
│ Sync Engine                              │
│  - Queue de mutações pendentes           │
│  - Reconciliação (CRDT / LWW / OT)       │
│  - Retry com backoff exponencial         │
├──────────────────────────────────────────┤
│ Network / API                            │
│  - HTTP + WebSocket / gRPC stream        │
│  - Chunked sync (deltas, não fullsync)   │
└──────────────────────────────────────────┘
```

## Escolha do local DB

| Opção | Quando |
|---|---|
| **SQLite** (via `expo-sqlite`, `op-sqlite`, GRDB, Room) | Default: relacional, maduro, portátil. Bom para dados estruturados. |
| **WatermelonDB** (Nozbe) | RN, lista reativa gigante (10k+ registros), lazy-loading nativo |
| **Realm** (MongoDB) | Objeto-oriented, sync built-in (Atlas Device Sync), boa integração RN |
| **PowerSync** | Postgres backend, sync bidirecional; Kolden tem Postgres via Supabase → fit natural |
| **RxDB** | RN com replicação built-in (CouchDB / GraphQL protocol) |
| **MMKV** (Tencent) | Key-value ultra-rápido (não é DB) para settings/cache leve |

**Default Kolden:** SQLite direto (`expo-sqlite` ou `op-sqlite`) com camada Drizzle ORM para queries tipadas. Para colaboração multi-user tempo real, PowerSync (fecha com Supabase).

## Estratégia de sincronização — 3 famílias

### 1. Last-Write-Wins (LWW) com timestamp autoritativo

**Quando:** conflitos raros; cliente único por conta; edição não é o feature principal.

**Como:**
1. Toda escrita local carimba `updated_at` (server timestamp injetado no ack)
2. Ao sync, compara: quem tem `updated_at` maior ganha
3. Timestamp precisa ser AUTORITATIVO do servidor (Hybrid Logical Clock ou monotonic server time) — clock do device mente

**Anti-padrão:** LWW com clock local. Device com clock atrasado sobrescreve edição recente do servidor → dado perdido.

### 2. CRDT (Conflict-free Replicated Data Type)

**Quando:** colaboração real, offline concomitante, exigência de "sem conflito visível ao usuário".

**Bibliotecas:**
- **Automerge** (Ink & Switch, Martin Kleppmann) — JSON CRDT, TypeScript nativo; bom para docs, notas
- **Yjs** (Kevin Jahns) — CRDT muito performático; usado por Notion, Figma-style whiteboards. Adapters para muitos backends
- **Loro** (mais novo, 2024) — TypeScript, alta perf

**Trade-off:** CRDT resolve conflito automaticamente, mas tem overhead de memória e sync payload. Para app com dado estruturado simples (lista de tarefas, forms), overkill.

### 3. Operational Transform (OT)

**Quando:** editor colaborativo em tempo real (Google Docs). Muito raro em mobile app típico. Se seu case é editor de texto multi-user offline, considere Yjs em vez de OT — mais simples.

## Queue de mutações

Toda escrita local vira **mutação enfileirada**:

```
{
  id: "uuid-v7",
  type: "CREATE_ORDER",
  payload: { ... },
  createdAt: timestamp,
  attempts: 0,
  lastError: null,
  status: "pending" | "syncing" | "acked" | "conflict" | "failed"
}
```

Sync engine:
1. Toma próxima mutação `pending`
2. Marca `syncing`
3. Envia ao backend
4. Ao ACK: aplica reconciliação (LWW/CRDT), marca `acked`, remove da queue
5. Ao erro transient (rede, 5xx): incrementa `attempts`, backoff exponencial + jitter, volta para `pending`
6. Ao erro permanente (4xx business): marca `conflict` ou `failed`, dispara UI de resolução

### Backoff exponencial + jitter

```
delay = min(base * 2^attempts, max) + random(0, base)
base = 1s
max = 5min
```

Jitter (aleatorização) evita thundering herd quando 10k devices tentam sincronizar simultaneamente após retomada de rede.

### Idempotência

Toda mutação tem `id` (client-generated UUID v7 — inclui timestamp). Backend deduplica por `id`. Cliente pode reenviar mesma mutação N vezes sem duplicar efeito.

Cross-link `invariantes-de-pipeline-de-dados` — idempotência por event-id é invariante de pipeline.

## Otimista UI

**Sempre.** Escrita local aplica instantaneamente na UI. Sync é background.

Camadas de "confiança visual":
- ✅ ack do servidor → "salvo"
- ⏳ pending sync → ícone sutil de "sincronizando..." (não bloqueia interação)
- ⚠️ conflito → destaque + botão "resolver"
- ❌ erro permanente → alerta

Anti-padrão: bloquear UI aguardando ACK do servidor. Elimina o ponto todo de offline-first.

### Rollback otimista

Se o servidor rejeita a mutação (business error, 4xx), UI precisa **reverter** o dado local. Duas estratégias:
1. **Snapshot pré-mutação** — armazena estado anterior; rollback = restaura
2. **Event sourcing local** — apenas recomputa estado excluindo a mutação rejeitada

Para maioria dos apps CRUD, snapshot é suficiente.

## Background sync

- iOS: `BGTaskScheduler` (BGProcessingTask, BGAppRefreshTask) — janelas curtas, sem garantia estrita
- Android: `WorkManager` — melhor infra background da plataforma
- RN: `expo-background-fetch`, `react-native-background-fetch` (Chris Scott) — abstrai as duas
- Não confie em timing: iOS pode não rodar a task por dias se sistema está lotado. Modele com essa premissa

**Trigger complementar:** ao voltar rede (event de conectividade), disparar sync imediato (não esperar background task).

Bibliotecas: `@react-native-community/netinfo` (RN), `Connectivity` (Flutter), `NWPathMonitor` (iOS nativo).

## Migrações de schema local

Cross-link `migracao-zero-downtime`. Schema local **evolui** mesmo em apps já instalados. Regras:

1. Cada mudança de schema = arquivo de migração numerado (`0001_add_orders.sql`, `0002_add_index.sql`)
2. Todo boot: DB executa migrações pendentes (idempotente por número)
3. **Nunca** delete coluna sem período de coexistência (usuário com versão antiga do app ainda usa)
4. Adicione coluna `nullable`, backfill, valide, então torne `NOT NULL` numa migração futura
5. Teste migração em CI: simule DB estado v1 → aplica migração → verifica estado v2

**Rollback de migração:** cada migração tem contra-migração (down). Em produção mobile, prefira "forward-only" (migração nova que corrige) porque forçar downgrade em milhões de devices é impossível.

## Conflict resolution UI

Quando LWW/CRDT não resolve (conflito com dados que o usuário PRECISA ver e decidir):

1. Mostra dois estados lado a lado (server vs local)
2. Oferece: "manter meu", "manter servidor", "mesclar"
3. Registra decisão como nova mutação (`RESOLVE_CONFLICT` payload com escolha)
4. Não use modais bloqueantes — vira badge na lista, usuário resolve quando quiser

**Anti-padrão:** silently overwrite. Perda de trabalho invisível é o pior bug de UX.

## Cross-links

- `desenvolvimento-mobile-multiplataforma` — stack decide libs (Realm vs WatermelonDB, etc.)
- `virtualizacao-e-perf-de-listas` — lista offline com 10k itens
- `migracao-zero-downtime` — schema local evolui como schema server
- `invariantes-de-pipeline-de-dados` — dado que chega ao backend após sync precisa passar por mesmas invariantes
- `estrategias-de-deploy-zero-downtime` — feature flag para ativar sync novo em canary

## Herança histórica

**Ink & Switch team** (Martin Kleppmann, Peter van Hardenberg, Adam Wiggins, Orion Henry) — "Local-first software" paper (2019) definiu o vocabulário. Automerge é o output canônico. Ler o paper é pré-requisito.

**Martin Kleppmann** ("Designing Data-Intensive Applications", 2017; papers CRDT) — texto de referência para pensar em consistência distribuída aplicada a mobile.

**Kevin Jahns** (Yjs, ~2015+) — CRDT mais usado em produção (Notion, Zoom Whiteboard, JupyterLab). Perf notável.

**Marc Shapiro & Nuno Preguiça** — origem acadêmica dos CRDTs (Convergent, Commutative, Conflict-free RDTs, ~2011). Base teórica.

**Werner Vogels** (Amazon CTO) — "Eventually Consistent" (2008). Divulgou para audiência de arquitetura o modelo de consistência eventual que sustenta offline-first.

**Adam Wiggins** (Heroku co-founder, Muse) — Muse app é caso-de-estudo canônico de local-first sério em mobile. Blog posts de arquitetura.

**James Long** (Actual Budget) — implementação open-source completa de local-first + CRDT para app financeiro mobile. Código é aula.

**Chris Scott** (`react-native-background-fetch`) — orquestração de sync em background em RN, cross-platform.

## Anti-padrões

- ❌ "Offline mode" como toggle separado da UI — vira segunda experiência, dobra bug
- ❌ Bloquear UI ao clicar "salvar" — mata o valor de offline-first
- ❌ LWW com clock local — sobrescrita silenciosa
- ❌ CRDT para dado simples que LWW resolve — overkill de memória/payload
- ❌ Sem idempotência (sem `id` client-generated) — dupla escrita em retry
- ❌ Sem retry com backoff — thundering herd após queda de rede
- ❌ Migração de schema sem coexistência — quebra usuários com versão antiga
- ❌ Silently overwrite em conflito — perda de trabalho invisível
- ❌ Confiar em background task rodar em janela X (não roda)

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
