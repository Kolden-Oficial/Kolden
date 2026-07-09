---
name: governanca-git-branching
description: Use ao definir ou revisar a estratégia de branching de um repositório — quando escolher GitHub Flow (trunk-based) vs Git Flow, quais regras aplicar em `main` (proteção, approvals, status checks, linear history), convenção de nome de branch, regras de auto-delete pós-merge, e quando é aceitável long-lived branch (raro). Default Kolden = GitHub Flow (trunk-based); Git Flow reservado a produtos com release train real (mobile app store). Dono&#58; @devops (Gage). Cross-link `disciplina-de-diff-minimo` (PR = 1 mudança lógica) e `revisao-de-codigo-priorizada` (SLA de primeira revisão). NÃO cobre convenção de commit message em si — isso é `padroes-de-engenharia-idiomatica`.
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# Governança Git — Estratégia de Branching

## Quando invocar

- Novo repo: escolher modelo antes do primeiro merge
- Repo existente com "estamos com 87 branches abertas há meses"
- Preparar migração de Git Flow → trunk-based
- Definir regras de proteção de `main` que impedem push direto e branch sem review
- Decidir política de release (feature freeze, release branch) para produto com store review (Apple, Google)

## Os dois modelos canônicos + o híbrido

### GitHub Flow (trunk-based) — DEFAULT Kolden

**Modelo:** uma branch permanente (`main`). Cada feature/fix é uma branch curta (< 3 dias) que sai de `main`, tem PR revisado, merge de volta.

**Vantagens:**
- Simples (uma branch permanente)
- Merge conflicts pequenos (branches curtas)
- CI/CD trivial (deploy de `main` = versão em produção)
- Compatível com feature flags → deploy separado de release

**Quando escolher (default):**
- SaaS (web/API) — deploy contínuo, sem release train
- Ferramenta interna, dashboard, CLI
- Serviço backend com feature flag pattern estabelecido
- Time pequeno-médio (≤ 20 devs por repo)

**Fluxo:**
```
main ─────────●────────●────────●─────────►
                \      /  \    /
                 feat  |   fix
                       |
                    release = merge para main (sem branch)
```

**Combina com** feature flag (`estrategias-de-deploy-zero-downtime`): merge para main = deploy; ativação = flag on separado.

### Git Flow (Vincent Driessen, 2010) — LIMITADO

**Modelo:** múltiplas branches permanentes — `main` (release), `develop` (integração), `feature/*`, `release/*`, `hotfix/*`.

**Quando (raro na Kolden):**
- Mobile app com release train por versão (App Store review = 3-7 dias)
- Firmware/embedded com QA extensivo antes de shipar
- Produto com múltiplas versões suportadas em paralelo (LTS)
- Cliente pagou/exige processo formal de release notes/changelog por versão

**Anti-padrão comum:** adotar Git Flow "por costume" em SaaS. Cria overhead sem benefício — features ficam presas em `develop`, merge de `release` é doloroso, e nada disso se ganha porque deploy já é contínuo.

**Se herdou Git Flow em SaaS, migração para GitHub Flow é backlog.** Passos:
1. Freeze `develop`
2. Merge `develop` → `main`
3. Deletar `develop`
4. Ajustar CI/CD (pipeline vira `main`)
5. Adicionar proteção estrita em `main`

### GitLab Flow (variante) — intermediário

Adiciona `production` (rastreia o que está de fato em prod, distinta de `main` = próximo release) para casos onde deploy não é imediato após merge.

**Quando:** apenas se houver janela real entre merge e deploy (aprovação de compliance, deploy manual regulado). Ainda mais raro que Git Flow na Kolden.

## Regras de proteção de `main` (não-negociáveis)

Toda repo produção Kolden **DEVE** ter em `main`:

| Regra | Valor | Motivo |
|---|---|---|
| Require PR before merge | ✅ | Zero push direto |
| Require approvals | ≥ 1 (2 para infra crítica) | Dois olhos por default |
| Dismiss stale reviews on new commits | ✅ | Approval de código antigo não vale |
| Require status checks | ✅ (lint, typecheck, test, security) | Sem verde, sem merge |
| Require branches up to date | ✅ | Impede merge de branch atrasada |
| Require linear history | ✅ | Sem merge commits — só squash ou rebase |
| Restrict who can push | apenas `@devops` (ou GitHub Actions) | Push authority |
| Allow force push | ❌ NUNCA em main | Reescrita = perda |
| Allow deletion | ❌ NUNCA em main | Óbvio |

Cross-link `.claude/rules/agent-authority.md` — `@devops` (Gage) é o ÚNICO agente com autoridade de push/PR merge.

## Convenção de nome de branch

Padrão Kolden (kebab-case, prefixo por tipo):

| Prefixo | Uso | Exemplo |
|---|---|---|
| `feat/` | Feature nova | `feat/2.1-login-otp` |
| `fix/` | Bug | `fix/3.4-null-user-crash` |
| `chore/` | Manutenção, deps | `chore/upgrade-node-20` |
| `docs/` | Só documentação | `docs/adr-005-storage` |
| `refactor/` | Refactor puro | `refactor/services-di` |
| `test/` | Só testes | `test/qa-2.1-flows` |
| `experiment/` | Spike/PoC (não vai para main) | `experiment/edge-runtime` |

**Regra dura:** todo branch DEVE ter issue/story ID quando o repo usa story-driven development. Story `2.1` na epic `AUTH` → `feat/2.1-login-otp`.

**Anti-padrões:**
- `main-2` / `main-copy` / `backup` — long-lived branches paralelas
- `felipes-branch` / `test123` — sem contexto
- `WIP-do-not-merge` — se é WIP, use Draft PR + Convention de commit `[skip ci]`

## Auto-delete pós-merge

**Regra Kolden:** GitHub → Settings → Options → "Automatically delete head branches" = **on** para todo repo.

Motivo: 87 branches mortas obscurecem as ativas. Se precisar restaurar (raro), o commit ainda existe no reflog e a GH mostra "Restore branch" por 30d.

## Squash vs Merge Commit vs Rebase

Escolha uma política por repo e a **aplique consistentemente**:

| Estratégia | Quando | Trade-off |
|---|---|---|
| **Squash and merge** (default Kolden) | GitHub Flow, branches curtas | Histórico linear e limpo; PR vira 1 commit; contexto no PR |
| **Rebase and merge** | Time avançado que quer manter commits granulares | Histórico linear; mais poluído |
| **Merge commit** | Git Flow, integração de long-lived | Preserva branch structure; histórico bagunçado |

**Squash default** funciona com "linear history required" — combinação clean.

**Anti-padrão:** deixar todas as três opções ativas no repo. Devs escolhem diferente = histórico inconsistente.

## Long-lived branches — quando é aceitável

**Raramente**. Casos:
- **Mainline de versão suportada em LTS** (`v1.x`, `v2.x`) — produto com múltiplas versões em manutenção
- **Feature flag não resolve** (mudança que não pode viver flagged na main por muito tempo) — geralmente sintoma de branch mal-dimensionada

**Regra:** se long-lived, defina de saída:
- Como será re-sincronizada com `main` (rebase weekly? merge diário?)
- Quando morre (data + condição)
- Quem é dono (não é do time inteiro — é de UMA pessoa/agente)

## Fluxo canônico Kolden — GitHub Flow com story-driven

```
1. Story 2.1 sai do backlog (Draft → Ready)
2. @dev cria branch: git checkout -b feat/2.1-login-otp main
3. Commits locais com prefixo convencional:
   feat: add OTP endpoint [Story 2.1]
   test: cover OTP flow [Story 2.1]
4. Push para remote: git push -u origin feat/2.1-login-otp
5. Draft PR aberto (título: "feat: add OTP login [Story 2.1]")
6. CI roda (lint, typecheck, test, security scan)
7. @qa gate (Story 2.1 InProgress → InReview)
8. Marcar PR como "Ready for review"
9. Approval de 1 reviewer + all checks green
10. @devops (ou GitHub Actions com autoridade delegada) faz squash & merge
11. Branch auto-deleta
12. Deploy contínuo dispara na main
```

## Cross-links

- `disciplina-de-diff-minimo` — 1 PR = 1 mudança lógica; sem refactor de carona
- `revisao-de-codigo-priorizada` — SLA de primeira revisão por priority tier
- `estrategias-de-deploy-zero-downtime` — merge para main dispara canary
- `.claude/rules/agent-authority.md` — @devops é exclusivo para push

## Herança histórica

**Vincent Driessen** ("A successful Git branching model", 2010) — cunhou Git Flow. Nas próprias palavras posteriores dele: "Git Flow foi bom para 2010; em SaaS 2020+, prefira algo mais simples". Ler o post original E o adendo de 2020.

**Scott Chacon** (GitHub, "Pro Git", 2011) — GitHub Flow como reação a Git Flow. Modelo simples que virou default da indústria.

**Paul Hammant** (ThoughtWorks, trunk-based development) — evangelista do trunk-based, autor de `trunkbaseddevelopment.com`. Argumento central: branches longas = merge conflicts = deploys pouco frequentes = qualidade pior.

**Jez Humble** ("Continuous Delivery", 2010) — trunk-based como pré-requisito de CI/CD real. Argumento: se você tem `develop` separado de `main`, seu CI mente sobre o estado.

**Chelsea Troy** ("Refactoring Legacy Codebases", 2018+) — visão pragmática: modelo importa menos que **regras de proteção + reviews de qualidade**. Um Git Flow com review rigoroso > GitHub Flow sem review.

## Anti-padrões

- ❌ Git Flow em SaaS "porque é enterprise" — overhead sem benefício
- ❌ Push direto em `main` — sem proteção = sem revisão = sem qualidade
- ❌ 87 branches mortas — auto-delete off + nenhum housekeeping
- ❌ Merge sem squash em GitHub Flow — histórico polui com commits WIP
- ❌ Long-lived feature branch sem data de morte — vira débito
- ❌ Force push em branch com PR aberto — quebra review, quebra CI cache
- ❌ Nome de branch sem story-id — perde rastreabilidade

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
