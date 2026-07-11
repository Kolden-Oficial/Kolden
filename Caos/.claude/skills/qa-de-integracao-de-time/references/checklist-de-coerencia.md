---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Checklist de coerência de integração — dois alvos

Fonte: `revfactory--harness@cceac68e` — `skills/harness/references/qa-agent-guide.md` (coreano).
Reescrito em PT-BR e adaptado ao domínio "time de agentes" do Kolden. Apache-2.0.

## Alvo 1 — time de agentes do Kolden (uso primário)
Para cada fronteira: extraia o lado A, extraia o lado B, compare 1:1, sinalize órfãos.

| Fronteira (A ↔ B) | Como extrair A | Como extrair B | O que verificar |
|---|---|---|---|
| `roster:` ↔ `agents/` | membros listados no orquestrador (`squad.yaml`/CLAUDE.md) | `name:` de cada `agents/*.md` | todo membro do roster tem arquivo; todo arquivo está no roster |
| agente ↔ habilidade | habilidades citadas no corpo/`tools` do agente | diretórios em `.claude/skills/` | nome citado = nome do diretório/`name:`; sem skill órfã |
| `routing-catalog.yaml` ↔ `description` | keyword→skill no catálogo de roteamento | `description` de cada skill | a `description` cobre o caso que a keyword roteia (ver `validacao-de-skill`, trigger eval) |
| habilidade ↔ "Habilidades relacionadas" | cross-refs "ver `X`" no rodapé | skills existentes | o destino do cross-ref existe e ainda tem esse nome |
| CLAUDE.md ↔ realidade do diretório | contagens/listas afirmadas no CLAUDE.md | `ls` de `agents/`, `skills/`, `reflexos/` | números e nomes batem (drift de documentação) |
| reflexo ↔ `settings.json` | scripts em `.claude/reflexos/` | hooks declarados em `settings.json` | todo reflexo está plugado; todo hook aponta para script existente |

## Alvo 2 — software gerado por um time de agentes
Quando o time produziu código (ex.: app Next.js), as fronteiras clássicas:

### Resposta de API ↔ tipo do hook
1. Extraia o shape do objeto em cada `NextResponse.json()`.
2. Confira o `T` em cada `fetchJson<T>` do hook correspondente.
3. Shape == T? A API embrulha (`{ data: [...] }`) e o hook desembrulha (`.data`)?
4. Atenção: paginação (`{ items, total, page }` vs array esperado); `snake_case` no DB →
   `camelCase` na API → tipo do front; resposta imediata `202` vs shape do resultado final.

### Caminho de arquivo ↔ href/rota
1. Extraia o padrão de URL dos arquivos `page.tsx` (`(grupo)` some da URL; `[param]` é dinâmico).
2. Colete todo `href=`, `router.push(`, `redirect(`.
3. Cada link aponta para uma página que existe? Cuidado com prefixo de route group.

### Mapa de transição de estado ↔ updates reais
1. Liste as transições permitidas no `STATE_TRANSITIONS`.
2. Busque todo `.update({ status: "..." })`.
3. Cada transição usada está no mapa? Há transição definida no mapa que o código nunca executa
   (transição morta)? Falta a passagem de estado intermediário → final?

### Endpoint de API ↔ hook (1:1)
1. Liste endpoints por método em `api/**/route.ts`.
2. Liste URLs chamadas nos `hooks/use*.ts`.
3. Endpoint sem hook que o chame → "não usado": intencional (API administrativa) ou chamada
   esquecida?

## Por que o estático puro não basta (lembrete)
- Genéricos do TypeScript: `fetchJson<Project[]>()` compila mesmo que o runtime devolva
  `{ projects: [...] }`.
- `npm run build` passa com cast/`any`/genérico e ainda falha em runtime.
- A analogia no time de agentes: `roster:` preenchido (build "passa") não prova que cada membro
  existe — só a comparação cruzada 1:1 prova.
