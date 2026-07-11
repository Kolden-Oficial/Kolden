---
name: disciplina-de-diff-minimo
description: Use ao ABRIR PR, ao REVISAR PR alheio, ou ao decidir se um PR grande deve ser dividido — regra dura&#58; 1 PR = 1 mudança lógica; sem refactor de carona; sem mudança de estilo em PR de fix; cross-link Constituição AIOX Artigo III (Story-Driven) e Artigo IV (No Invention). PR > 500 LOC = split obrigatório (exceto merge/rebase mecânico ou geração automática como openapi codegen). Cada linha alterada precisa se justificar no motivo do PR. Dono&#58; @dev (Dex) + @qa (Quinn). Cross-link `revisao-de-codigo-priorizada` (SLA por tier) e `governanca-git-branching` (1 PR = 1 branch nascida de main). NÃO é sobre commit message em si (isso é `padroes-de-engenharia-idiomatica`).
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Disciplina de Diff Mínimo

## Quando invocar

- Ao abrir PR (checar antes de marcar como "Ready for review")
- Ao revisar PR alheio (padrão de rejeição objetivo)
- Ao dividir PR grande em cadeia de PRs menores
- Ao debate "posso arrumar isso de carona?" durante fix de bug (spoiler: geralmente não)
- Auditoria de PRs históricos (velocity vs qualidade)

## A regra dura

**1 PR = 1 mudança lógica.**

Se o título precisa de "e", já tem mais de uma. Exceções raríssimas:
- Rebase/merge mecânico (nenhuma linha de código humano)
- Codegen automatizado (openapi → tipos; graphql → hooks)
- Atualização de dependências em batch por policy (dependabot rollup)

**Corolário:** commit message convencional (`feat:`, `fix:`, `chore:`) DEVE caber num tipo só. Se você quer `feat+refactor+docs`, quebra.

## Por que isso importa

1. **Revisão de qualidade cai em PR grande.** Estudo empírico (Google, Rigby & Bird 2013): defeitos por linha crescem log(LOC do PR). Após ~200 LOC, atenção do reviewer despenca.
2. **Rollback vira cirurgia.** PR com "feat + refactor + fix" — revert quebra a feature nova e o refactor bom.
3. **Bisect fica inútil.** `git bisect` aponta o commit onde bug entrou; se o commit tem 3 coisas, você não sabe qual foi.
4. **Rastreabilidade com story quebra.** Story 2.1 vira PR que também mexeu em Story 3.4 sem contexto — o registro fica cinza.
5. **Merge conflict com colega vira war zone.** PR pequeno = janela curta = conflict pequeno.

## Cross-link Constituição AIOX

**Artigo III — Story-Driven Development:** todo desenvolvimento começa em story. 1 story = 1 PR (regra ideal). Se PR toca 3 stories, provavelmente falta decompor.

**Artigo IV — No Invention:** nada entra em PR que não esteja rastreado a FR-*, NFR-*, CON-* ou spec. "Deixei mais bonito porque estava ruim" = invenção = fora.

**Artigo V — Quality First:** PR limpo = revisão melhor = qualidade melhor. Diff mínimo é aplicação técnica do princípio.

## Anti-padrões classificados

### 1. "Refactor de carona"

**Sintoma:** PR de fix com 15 arquivos renomeados/reorganizados "aproveitando que estou aqui".

**Custo:** revisor precisa distinguir a lógica do fix do ruído do refactor. Tempo triplica. Bug latente entra escondido.

**Resposta correta:** PR 1 = fix minúsculo. PR 2 = refactor separado. Se o fix REQUER touch em outro arquivo, ok — mas só o mínimo para fix compilar/passar.

### 2. "Mudança de estilo junto"

**Sintoma:** PR de feature com 200 linhas de `prettier --write` e `.eslintrc` novo.

**Custo:** diff da feature some no ruído de whitespace.

**Resposta correta:** PR 1 = só formatação (mecânica, revisão trivial). PR 2 = feature em cima do código já formatado.

### 3. "Um PR gigante porque a feature é grande"

**Sintoma:** PR com 1800 LOC "porque a feature é assim".

**Resposta correta:** decomposição via `fatiamento-mvp-por-historia`. Feature grande = várias stories = vários PRs. Se o time diz "não dá para dividir", geralmente dá — é o incentivo errado (métrica de PR fechado por sprint, por exemplo).

Ferramenta: **stacked PRs** (GraphQL foundation, Google) — cada PR se baseia no anterior, review incremental.

### 4. "Rename massivo escondido no fix"

**Sintoma:** `git blame` some porque metade dos arquivos foi renomeada num PR de bug.

**Resposta correta:** rename = PR próprio + `git mv` explícito (preserva history). Nunca dentro de PR de lógica.

### 5. "Deletar código morto de carona"

Tentador ("estou vendo função não usada aqui, deleto"). **Não faça.** PR 1 = fix. PR 2 = dead-code removal. Cross-link `simplify` skill se for essa direção.

## Checklist antes de marcar PR "ready"

Antes de sair de Draft:

1. [ ] O título cabe em uma frase (`tipo: assunto — detalhe`) sem "e"
2. [ ] Prefixo convencional (`feat:` / `fix:` / etc.) reflete UM tipo
3. [ ] Story-id referenciada no título/corpo (`[Story 2.1]`)
4. [ ] Descrição responde 3 perguntas: **O que**, **Por que**, **Como testar**
5. [ ] Diff < 500 LOC (linhas efetivas de código, sem gerado)
6. [ ] Cada arquivo tocado se justifica no corpo do PR
7. [ ] Zero mudanças de formatação não relacionadas
8. [ ] Zero renames não anunciados
9. [ ] Zero deps atualizadas se o PR não é sobre isso
10. [ ] Testes cobrindo o motivo do PR (test-first ou test-junto)

Se qualquer item falha, **volta para Draft** e divide.

## Como dividir PR grande

### Estratégia 1: **stacked** (recomendada para features)

```
main
 └─ PR 1: infra (schema, migração) — merge primeiro
     └─ PR 2: backend (endpoint, service) — merge segundo
         └─ PR 3: frontend (UI, hook) — merge terceiro
             └─ PR 4: analytics (tracking, dashboard) — merge quarto
```

Cada PR se baseia no anterior. Reviewer vê incremento pequeno; merge cascade é natural.

Ferramentas: `git-stack`, `graphite`, GitHub stacked PRs (2024+).

### Estratégia 2: **feature flag + incremental**

1. PR 1: adiciona feature dormant (flag off)
2. PR 2: implementa lógica
3. PR 3: UI
4. PR 4: ativação (flag on em canary — ver `estrategias-de-deploy-zero-downtime`)

Merge para main sem risco; ativação é step separado.

### Estratégia 3: **decomposição por camada**

Dado um PR de 1500 LOC, divide em:
- Types/schemas (300 LOC) — puro, revisão trivial
- Business logic (500 LOC) — tem os testes principais
- HTTP layer (300 LOC) — cola
- UI (400 LOC) — apresentação

## Sinais de PR bom (checklist positivo)

- Diff pequeno (< 200 LOC ideal, < 500 aceitável)
- Todo arquivo tocado tem motivo óbvio
- Título convencional específico
- Descrição responde O QUE / POR QUE / COMO TESTAR
- Story-id
- Commits limpos (squashable ou já squashed)
- Testes cobrindo a mudança
- CI verde
- Zero código comentado
- Zero TODO/FIXME sem link para issue

## Sinais de PR ruim (rejeitar direto)

- Título vago (`update stuff`, `wip`, `fixes`)
- Prefixo convencional errado (`chore:` numa feature nova)
- Descrição vazia ou "as per requirements"
- Diff > 800 LOC sem justificativa (codegen, migration mecânica)
- Múltiplos tipos de mudança no mesmo PR
- Whitespace-only changes espalhadas
- Testes ausentes ou skipped
- CI vermelho
- Comentários em código antigo removidos sem motivo
- `console.log` esquecido

## Cross-links

- `governanca-git-branching` — 1 PR = 1 branch curta = base de tudo isso
- `revisao-de-codigo-priorizada` — SLA de review por tier presume PRs bem dimensionados
- `fatiamento-mvp-por-historia` — como decompor feature grande em stories → PRs
- `padroes-de-engenharia-idiomatica` — commit convencional
- `simplify` — quando refactor tem valor, faz PR próprio

## Herança histórica

**Google Engineering Practices** (documento público, "google/eng-practices" no GitHub) — capítulo "Small CLs": "Small, incremental changes are easier to review, have fewer bugs, and integrate more cleanly with other work". PR grande = defeito garantido.

**Martin Fowler** ("Small Commits", 2012; "Refactoring", 2nd ed. 2018) — refactor é sua própria disciplina, com PRs próprios. Misturar refactor com feature = perder ambos.

**Peter Rigby & Christian Bird** ("Convergent contemporary software peer review practices", FSE 2013) — evidência empírica de que atenção do reviewer cai com tamanho do PR. Threshold de degradação ≈ 200 LOC.

**Kent Beck** ("Tidy First?", 2023) — separar tidying (arrumação) de mudança comportamental. Tidying é PR próprio, pequeno e frequente. Feature é PR próprio.

**Michael Feathers** ("Working Effectively with Legacy Code", 2004) — princípio: mudança em código legado começa por "characterization tests", depois "one change at a time". Um PR por vez.

**Aaron Patterson** (Ruby core, ex-Shopify) — "eu não faço grep-and-replace num PR de bug" — regra de ouro.

## Anti-padrões (recap)

- ❌ PR com "e" no título
- ❌ Refactor de carona
- ❌ Formatação misturada com lógica
- ❌ Rename escondido
- ❌ Dead code deletado no PR de fix
- ❌ Dependência atualizada de carona
- ❌ 1500 LOC "porque a feature é assim"
- ❌ Descrição vazia
- ❌ Sem story-id

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
