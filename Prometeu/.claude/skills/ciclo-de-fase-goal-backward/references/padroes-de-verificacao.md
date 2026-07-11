---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/skills/ciclo-de-fase-goal-backward/references/leis-de-ferro|leis-de-ferro]]"
---

# Padrões de Verificação — existência ≠ implementação

Material de apoio da etapa VERIFY. Princípio central: **um arquivo existir não significa que
a feature funciona.** Suba pelos 4 níveis por entregável — Existe → Substantivo → Conectado
(wired) → Funcional. Os exemplos de comando abaixo são `grep`/checagens estáticas; adapte à
linguagem do projeto. **Nunca execute código de terceiro só para verificar — leia o código.**

## Padrões universais de stub (qualquer tipo de arquivo)
- **Comentários-stub:** `TODO`, `FIXME`, `XXX`, `HACK`, `PLACEHOLDER`, "implement later", "coming soon".
- **Texto placeholder na saída:** `placeholder`, `lorem ipsum`, `under construction`, `sample/example/dummy`, brackets de template deixados (`[...]`, `<...>`, `{...}`).
- **Implementação trivial/vazia:** `return null|undefined|{}|[]`, `pass`, função que só faz `console.log`.
- **Valores hardcoded onde se espera dinâmico:** IDs string fixos, contagens fixas, valores de display fixos.

## Por tipo de artefato — red flags

**Componente React/Next.js** — stub:
```tsx
return <div>Component</div>        // ou <div>Placeholder</div>, <p>Coming soon</p>, null, <></>
onClick={() => {}}                 // handler vazio
onSubmit={(e) => e.preventDefault()} // só previne default
```
Substantivo: retorna JSX real, usa `props.`/`useState`/`useEffect`, tem `className`/handlers reais.
Wired: importa o que precisa, props destruturadas e usadas, chamada de dados (`fetch`/`useQuery`/`getServerSideProps`).

**Rota de API** — stub:
```ts
export async function POST() { return Response.json({ message: "Not implemented" }) }
export async function GET()  { return Response.json([]) }   // array vazio, sem query
export async function POST(req){ console.log(await req.json()); return Response.json({ok:true}) }
```
Substantivo: >10-15 linhas, interage com data source (`prisma.`/`db.`/`query`), tem `try/catch`, resposta significativa.
Wired: importa client de DB, usa `req.json()`/`req.body`, valida input (`zod`/`schema.parse`).

**Schema (Prisma/Drizzle/SQL)** — stub: model só com `id` + `// TODO: add fields`; campos críticos ausentes (`Order` sem `userId/items/total/status`).
Substantivo: campos esperados além do `id`, tipos apropriados (não tudo `String`), relações (`@relation`) quando esperado.
Wired: migrations existem e aplicadas; client gerado.

**Hook/utilitário** — stub: `useAuth()` retornando `{ user: null, login: () => {} }`; retorno hardcoded.
Substantivo: usa hooks React, retorno significativo, >10 linhas. Wired: importado e **chamado** em algum lugar.

**Env/config** — stub: `DATABASE_URL=your-database-url-here`, `API_KEY=placeholder`, `NEXT_PUBLIC_API_URL=http://localhost:3000` em prod.
Substantivo: valor real (não `your-*-here`/`xxx`). Wired: variável usada no código e no schema de validação de env.

## Verificação de wiring (onde os stubs se escondem)
- **Component → API:** a chamada `fetch`/`axios` existe, não está comentada, aponta ao endpoint certo e a resposta é **usada** (`await`/`.then`/`setState`).
- **API → Database:** a query existe, é **awaited** e o resultado é **retornado** (não `findMany()` seguido de `return {ok:true}` estático).
- **Form → Handler:** o `onSubmit` chama API/mutation — não só `preventDefault()` nem só `console.log`.
- **State → Render:** o componente renderiza o estado (`.map(...)`), não conteúdo hardcoded; o estado certo (não outro dado).

## Checklist rápido por artefato
**Componente:** existe · exporta componente · retorna JSX (não null) · sem placeholder · usa props/estado · handlers reais · imports resolvem · usado no app.
**Rota API:** existe · exporta handlers HTTP · >5 linhas · consulta DB/serviço · resposta significativa · tem erro tratado · valida input · chamada pelo frontend.
**Schema:** model definido · campos esperados · tipos certos · relações · migrations aplicadas · client gerado.
**Hook/util:** existe · exporta função · implementação real · usado · retorno consumido.

## Quando exigir humano (nível 4)
**Sempre humano:** aparência visual; conclusão de fluxo de usuário; tempo real (WebSocket/SSE);
integração externa (Stripe, e-mail); clareza de mensagem de erro; sensação de performance.
**Humano se incerto:** wiring complexo que o grep não rastreia; comportamento dinâmico por
estado; edge cases; responsividade mobile; acessibilidade.

Formato do pedido:
```markdown
## Verificação Humana Necessária
### 1. Envio de mensagem
**Teste:** digite uma mensagem e clique Enviar
**Esperado:** mensagem aparece na lista, input limpa
**Conferir:** persiste após refresh?
```

---
*Fonte: gsd-build/get-shit-done@bdcaab2c (`references/verification-patterns.md`) — MIT, Lex Christopherson. Reescrito em PT-BR; sem cópia literal.*
