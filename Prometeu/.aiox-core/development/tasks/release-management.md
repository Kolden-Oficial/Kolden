---
id: release-management
name: Manage Software Releases
agent: github-devops
category: devops
complexity: high
tools:
  - github-cli # Create releases, tags, manage artifacts
  - semantic-release # Automate versioning and changelog
checklists:
  - github-devops-checklist.md
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Gerenciar Releases de Software

> **FONTE AUTORITATIVA:** [`docs/guides/release-procedure.md`](../../../docs/guides/release-procedure.md)
>
> Esta task encapsula o SOP canônico de release. **Abra-o primeiro**, siga seu checklist de cima para baixo. O SOP cobre as verificações de pré-voo, a coordenação do version bump em 4 locais, a dança de bypass de proteção de branch (ruleset moderno + proteção de branch legada — ambos devem ser relaxados e restaurados atomicamente com `trap EXIT` + payloads sanitizados), o disparo de publicação npm orientado por tag, a verificação pós-publicação, peculiaridades conhecidas de CI e os passos de rollback.
>
> Esta task mais curta permanece porque alguns workflows de agentes ainda referenciam o id `release-management`, mas o conteúdo de registro vive no SOP. **Não duplique o procedimento aqui** — isso cria divergência entre duas fontes de verdade.

## Quando esta task dispara

- O `@devops` é solicitado a cortar um novo release (qualquer pacote ou conjunto coordenado)
- Release de hotfix após um incidente
- Planejamento periódico de release minor/major

## Divisão de escopo com a task `publish-npm`

| Task | Quando usar |
|---|---|
| `release-management` (este arquivo) | Ciclo de vida completo do release: planejar uma versão, coordenar o changelog, decidir o tipo de bump, criar a narrativa do release, follow-ups em múltiplos pacotes |
| `publish-npm` | Passo tático de publicação somente-npm dentro do release mais amplo (também encapsula o mesmo SOP) |

Ambas delegam ao mesmo `docs/guides/release-procedure.md`. A divisão é preservada para que diferentes workflows do `@devops` possam escolher o ponto de entrada correto semanticamente.

## TL;DR (detalhe completo no SOP)

1. **Decida o tipo de bump** inspecionando os commits desde a última tag (`git log v<last>..HEAD --oneline`). Patch apenas para correções de bug. Minor para funcionalidades aditivas. Major para breaking changes (raro para `@aiox-squads/core`).
2. **Pré-voo:** lint, suíte de testes completa, tokens de registry atualizados (`gh secret list -R SynkraAI/aiox-core` — `NPM_TOKEN_AIOX_SQUADS` e `NPM_TOKEN`).
3. **Coordene a versão em 4 locais** (root `package.json`, `compat/aiox-core/package.json` e sua dependência `@aiox-squads/core`, `packages/installer/package.json`, atualize `package-lock.json`) + entrada no `CHANGELOG.md` sob `## [X.Y.Z] - YYYY-MM-DD` (Keep-a-Changelog).
4. **Branch + PR + bypass + merge** seguindo o bloco atômico do SOP (snapshot do ruleset + proteção legada, sanitizar payloads via jq, `set -e` + `trap EXIT` para garantir a restauração mesmo em caso de falha, merge com `--admin`, validar diff=0 vs snapshots originais).
5. **Tag + push** dispara `.github/workflows/npm-publish.yml` — `git tag -a -m "<notes>" vX.Y.Z origin/main` e depois `git push origin vX.Y.Z`. (Opções antes do nome da tag; `origin/main` é o ref sendo taggeado.)
6. **Verificação pós-publicação** — todo pacote visível na versão esperada, `dist-tags.latest` atualizado, integridade do artefato confirmada por `npm pack` + grep pela correção.
7. **Rollback pronto** — deprecar (não fazer unpublish) + `npm dist-tag add` da versão anterior como latest, depois abrir incidente e seguir o SOP do início para a correção corretiva.

## Contexto histórico

A versão anterior deste arquivo (pré-2026-05-17) continha um procedimento inline de mais de 700 linhas que cresceu organicamente ao longo dos releases e nunca capturou as armadilhas que morderam mais tarde: proteção de branch em dois sistemas (`gh pr merge --admin` não faz bypass de nenhum sozinho), a corrida do `publish_legacy_aiox_core` contra a publicação escopada (scoped), o timing de propagação da CDN do npm para o smoke test do wrapper de compat legado, e o escape de caminho do Windows em `node -e` sobre o Git Bash. Após três regressões em uma única janela de 30 dias — cada correção entregue como um patch pontual — o procedimento canônico foi consolidado em `docs/guides/release-procedure.md` para que todo release passe por um único checklist validado em vez de recriar a memória institucional a cada vez.
