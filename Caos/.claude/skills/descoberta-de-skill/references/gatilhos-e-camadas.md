# Gatilhos, camadas (preamble-tier) e context_queries

Detalhamento dos mecanismos de descoberta avançada herdados do `garrytan--gstack`
(suíte de ~59 habilidades roteadas por gatilho). Carregado sob demanda pelo SKILL.md.

## 1. `triggers:` — auto-invocação por frase
Lista de frases naturais no frontmatter que sinalizam, alto e claro, que a habilidade se aplica.
Funcionam **junto** com a `description` (não a substituem): a `description` cobre a condição
abstrata; os `triggers` cobrem as frases literais que o usuário digita.

```yaml
---
name: office-hours
preamble-tier: 3
description: Use ao decidir se uma ideia de produto vale ser construída, antes de qualquer código.
triggers:
  - brainstorma isso
  - vale a pena construir?
  - me ajuda a pensar sobre
  - office hours
---
```

Diretriz: 3–6 gatilhos por habilidade, variando formalidade ("revisa o PR" / "dá uma olhada
nesse diff antes do merge"). Inclua os **follow-ups** ("de novo", "agora valida") porque o
modelo é conservador para re-invocar.

## 2. `preamble-tier:` — carregamento em camadas
Cada habilidade declara em que **camada** seu texto entra no contexto. Quanto menor o tier,
mais cedo/sempre é carregado; quanto maior, mais sob demanda.

| Tier | Quando entra no contexto | O que colocar aqui |
|---|---|---|
| 0–1 (base) | sempre / a cada sessão | router da suíte + regras universais curtíssimas (< 150 palavras) |
| 2 | quando o domínio é ativado | habilidades de um squad/área |
| 3–4 (sob demanda) | só quando o gatilho casa | habilidades pesadas, personas, workflows longos |

**Anti-padrão:** colocar uma habilidade grande no tier base — ela polui toda conversa e estoura
o orçamento de token. Habilidade grande = tier alto + `description`/`triggers` fortes para ser
puxada quando preciso.

## 3. Router de suíte
Uma habilidade-índice raiz (no gstack, um `SKILL.md` raiz; na Kolden, o papel é do
`.claude/skills/catalogo.md` do agente) é carregada no tier base e **roteia** para as demais por
trigger/tier. É o ponto único de descoberta: o agente lê o router barato e só então puxa a
habilidade cara que casou. Mantenha o router como **ponteiro** (gatilho + uma linha), nunca
copiando o conteúdo das habilidades que ele indexa.

## 4. `context_queries` — memória de descoberta no load
Declara consultas que, **no momento em que a habilidade carrega**, injetam contexto de sessões
anteriores. Tipos vistos no gstack:

```yaml
gbrain:
  schema: 1
  context_queries:
    - id: sessoes-anteriores      # registros estruturados anteriores do mesmo escopo
      kind: list
      filter: { type: ceo-plan, tags_contains: "repo:{repo_slug}" }
      sort: updated_at_desc
      limit: 5
      render_as: "## Sessões anteriores de office-hours neste repo"
    - id: perfil-do-usuario       # snapshot do perfil/preferências
      kind: filesystem
      glob: "~/.gstack/builder-profile.jsonl"
      tail: 1
      render_as: "## Perfil do builder"
```

### Adaptação Kolden (sem vendorizar o `gbrain`)
O `gbrain` é infra própria do gstack (CLI + PGLite/Supabase + MCP) — **não absorver o código**.
Absorvemos o *padrão*. Na Kolden, as fontes de `context_queries` são as que já existem:
- **`MEMORY.md` do agente** (Padrões Ativos / Candidatos / Arquivado) — escrito pelo
  `ritual-de-encerramento`. A query lê os padrões relevantes ao escopo atual.
- **`sobre-a-empresa/<área>`** — o "cérebro" da empresa (ICP, ofertas, marca, processos).
- **`registros/`** do agente — histórico/auditoria por escopo.

Regra de não-duplicação: `context_queries` é só a **leitura** desse acervo no load. A **escrita**
do aprendizado continua exclusiva do `ritual-de-encerramento`. Nunca crie um segundo canal de
memória paralelo ao `MEMORY.md`.

---
*Fonte: `garrytan--gstack@11de390` (MIT, © 2026 Garry Tan) — `office-hours/SKILL.md`,
`retro/SKILL.md`, frontmatter da suíte e `SKILL.md` raiz (router). Princípio reescrito em PT-BR,
mecânica `gbrain` substituída pelos equivalentes nativos do Kolden. Uso interno.*
