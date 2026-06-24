# resolve-github-issue.md

**Task**: Investigate and Resolve GitHub Issue

**Propósito**: Workflow ponta a ponta para investigar, planejar, implementar, testar e fechar uma issue do GitHub seguindo os padrões do projeto (Constitution, Story-Driven, Quality Gates).

**Quando Usar**: Após selecionar uma issue na triagem, via `@devops *resolve-issue {number}` ou por solicitação do usuário como "resolver a issue #138".

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Investigar, corrigir, testar, commitar, fazer push, fechar — prompts mínimos
- Decisões registradas mas não confirmadas
- **Melhor para:** Correções rápidas (esforço XS/S), bugs bem definidos, tarefas de chore

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints na investigação, plano, implementação e push
- O usuário confirma a abordagem antes de mudanças importantes
- **Melhor para:** A maioria das issues, complexidade média

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Investigação completa + pesquisa + plano detalhado ANTES de qualquer código
- O usuário aprova o plano, depois execução autônoma
- **Melhor para:** Issues complexas, mudanças em múltiplos arquivos, causa raiz desconhecida

**Parâmetro:** `mode` (opcional, default: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: resolveGithubIssue()
responsavel: Gage (Operator)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: issue_number
  tipo: number
  origem: User Input
  obrigatorio: true
  validacao: Must be a valid open GitHub issue number

- campo: mode
  tipo: string
  origem: User Input
  obrigatorio: false
  validacao: yolo|interactive|pre-flight
  default: interactive

- campo: branch
  tipo: string
  origem: Auto-detect or User Input
  obrigatorio: false
  validacao: Valid git branch name
  default: Current branch

**Saida:**
- campo: resolution_summary
  tipo: object
  destino: GitHub Issue Comment + User Display
  persistido: true
  formato: |
    { issue: number, commit: sha, files_changed: number, tests: pass/fail, closed: boolean }

- campo: commit_sha
  tipo: string
  destino: Git
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] GitHub CLI authenticated (gh auth status)
    tipo: pre-condition
    blocker: true
    error_message: "GitHub CLI not authenticated. Run: gh auth login"

  - [ ] Issue exists and is open
    tipo: pre-condition
    blocker: true
    validacao: |
      Run: gh issue view {issue_number} --json state
      Must return state: "OPEN"
    error_message: "Issue #{issue_number} not found or already closed"

  - [ ] Working tree is clean (no uncommitted changes)
    tipo: pre-condition
    blocker: false
    validacao: |
      Run: git status --porcelain
      If dirty: warn user, suggest stash or commit first
    error_message: "Uncommitted changes detected. Commit or stash before proceeding."

  - [ ] On appropriate branch
    tipo: pre-condition
    blocker: false
    validacao: |
      Check current branch with: git branch --show-current
      Warn if on main/master (suggest creating feature branch)
```

---

## Passos do Workflow

### Fase 1: Investigar (entender a issue)

**Objetivo:** Entender completamente o problema antes de escrever qualquer código.

```yaml
steps:
  1_fetch_issue:
    command: gh issue view {issue_number} --json title,body,labels,comments,assignees
    output: issue_data
    purpose: Obter os detalhes completos da issue, incluindo comentários com contexto

  2_analyze_issue:
    action: Ler o corpo e os comentários da issue cuidadosamente
    extract:
      - Qual é o problema reportado?
      - Qual é o comportamento esperado?
      - Qual é o comportamento real?
      - Há passos de reprodução?
      - Há mensagens de erro ou logs?
      - Quais arquivos/módulos provavelmente são afetados?
    output: issue_analysis

  3_codebase_investigation:
    action: Buscar no codebase pelo código afetado
    tools:
      - Grep: Buscar palavras-chave da issue (mensagens de erro, nomes de funções, caminhos de arquivo)
      - Glob: Encontrar arquivos relacionados por padrão
      - Read: Ler arquivos suspeitos para entender o comportamento atual
    output: affected_files[]
    purpose: Confirmar a causa raiz e o escopo da mudança

  4_research_if_needed:
    condition: A issue envolve padrões externos, APIs ou tecnologia desconhecida
    action: |
      Use a skill /tech-search para pesquisa aprofundada:
        - Especificações de formato externo (ex.: formato Copilot .agent.md)
        - Mudanças em documentação de API
        - Boas práticas para a tecnologia envolvida
      Saída da pesquisa salva em docs/research/{date}-{slug}/
    output: research_findings (optional)
    examples:
      - Issue #138: Exigiu /tech-search para o formato de agents customizados do GitHub Copilot
      - Issue #159: Nenhuma pesquisa necessária (rename simples no codebase)
```

**Checkpoint (modos Interativo/Pre-Flight):**

Apresente o resumo da investigação ao usuário:
```
Investigation Summary for Issue #{number}:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Problem: {description}
Root Cause: {root_cause}
Affected Files: {count} files
  - {file1}
  - {file2}
  - ...
Research: {needed/not_needed/completed}
Estimated Effort: {XS/S/M/L/XL}

Proposed Approach:
  1. {step1}
  2. {step2}
  ...

Proceed with implementation? (Y/n)
```

### Fase 2: Planejar (projetar a solução)

**Objetivo:** Criar um plano de implementação claro antes de tocar no código.

```yaml
steps:
  1_identify_changes:
    action: Listar todos os arquivos que precisam ser criados, modificados ou deletados
    output: change_manifest[]
    format: |
      | Action | File | Description |
      |--------|------|-------------|
      | CREATE | path/to/new-file.js | New component for X |
      | MODIFY | path/to/existing.js | Update function Y |
      | DELETE | path/to/old-file.md | Replaced by new format |
      | RENAME | old-name → new-name | Extension change |

  2_check_dependencies:
    action: Verificar se as mudanças afetam outros sistemas
    checks:
      - Esta mudança afeta o installer? (packages/installer/)
      - Esta mudança afeta o IDE sync? (.aiox-core/infrastructure/scripts/ide-sync/)
      - Esta mudança afeta os testes? (tests/)
      - Esta mudança afeta a documentação? (docs/)
      - Esta mudança afeta o CI/CD? (.github/workflows/)
      - Esta mudança afeta outros agents? (.aiox-core/development/agents/)
    output: dependency_impacts[]

  3_verify_ids_gate:
    action: IDS G4 - Verificar o Entity Registry por padrões reutilizáveis
    gate: G4 (Dev Context - Informational, non-blocking)
    checks:
      - Existem padrões/utilitários existentes que resolvem parte disto?
      - O código existente pode ser ADAPTADO (mudança < 30%) em vez de criar algo novo?
      - Se criar novas entidades, prepare a entrada no registry
    output: ids_decision (REUSE/ADAPT/CREATE per entity)

  4_plan_tests:
    action: Determinar a estratégia de testes
    checks:
      - Testes existentes que precisam ser atualizados?
      - Novos testes necessários?
      - Passos de validação manual?
    output: test_plan
```

### Fase 3: Implementar (fazer as mudanças)

**Objetivo:** Executar o plano com qualidade e segurança.

```yaml
steps:
  1_implement_changes:
    action: Aplicar as mudanças seguindo o plano da Fase 2
    rules:
      - Seguir as convenções do projeto (CLAUDE.md)
      - Usar imports absolutos, nunca relativos
      - Sem `any` em TypeScript
      - Arquivos kebab-case, componentes PascalCase
      - Conventional Commits para a mensagem de commit
      - Referenciar o número da issue no commit: "fix(scope): description (#N)"

  2_parallel_execution:
    condition: Múltiplas mudanças independentes podem ser feitas simultaneamente
    action: Usar a Task tool com subagents para trabalho paralelo
    examples:
      - Issue #159: 5 agents paralelos para rename em lote em 136 arquivos
      - Issue #138: Sequencial (transformer → config → sync → cleanup)
    guidance: |
      Use agents paralelos quando:
        - As mudanças são em arquivos independentes sem dependências cruzadas
        - Operações em lote em muitos arquivos (>10 arquivos com mudanças similares)
        - Pesquisa + implementação podem se sobrepor
      Use sequencial quando:
        - Mudanças posteriores dependem das anteriores
        - Mudanças de config devem ser testadas antes de operações de arquivo
        - O novo código deve existir antes das referências a ele

  3_handle_edge_cases:
    action: Atentar para armadilhas comuns de sessões anteriores
    known_pitfalls:
      - Endereços de e-mail dentro de strings podem casar com padrões de rename (Issue #159: security@synkra/aiox-core.dev)
      - O parser YAML converte "KEY: value" em objetos, não strings (Issue #138: core_principles)
      - O bash do Windows escapa `!` em scripts inline (use arquivos .js temporários em vez de node -e)
      - Replace_all pode casar com ocorrências não intencionais (sempre verifique com Grep após mudanças em lote)
      - O submódulo `pro` aparece como modificado mesmo quando inalterado (ignore no git status)
    mitigation: |
      Após mudanças em lote:
        1. Faça Grep do padrão antigo para verificar a completude
        2. Faça Grep de padrões de corrupção (substituições parciais)
        3. Leia uma amostra dos arquivos alterados para verificar a correção

  4_regenerate_manifests:
    condition: As mudanças afetam arquivos rastreados pelo install manifest
    action: |
      Rode: node scripts/generate-install-manifest.js
      Isto regenera o .aiox-core/install-manifest.yaml
    when: Qualquer arquivo em .aiox-core/ ou packages/ é criado, modificado ou deletado

  5_run_ide_sync:
    condition: As mudanças afetam definições de agent ou o sistema de IDE sync
    action: |
      Rode: node .aiox-core/infrastructure/scripts/ide-sync/index.js sync --verbose
      Verifique se todas as IDEs sincronizam sem erros
    when: Mudanças em .aiox-core/development/agents/ ou ide-sync/
```

### Fase 4: Validar (testar e verificar)

**Objetivo:** Garantir que as mudanças estão corretas e não quebram nada.

```yaml
steps:
  1_run_tests:
    command: npm test
    must_pass: true
    on_failure: |
      Analise a saída dos testes, corrija as falhas, rode novamente.
      NÃO prossiga para o commit se os testes falharem.

  2_verify_changes:
    action: Verificação manual
    checks:
      - [ ] Todos os arquivos listados no plano foram alterados
      - [ ] Nenhum arquivo não intencional foi modificado
      - [ ] O Grep confirma que os padrões antigos sumiram (para mudanças em lote)
      - [ ] A amostra de saída parece correta (para mudanças de formato)
      - [ ] Nenhum segredo ou credencial nos arquivos alterados

  3_lint_check:
    command: npm run lint
    must_pass: false
    note: Avise se o lint falhar mas não bloqueie (alguns projetos podem não ter lint)
```

### Fase 5: Commit e Push

**Objetivo:** Criar um commit limpo e bem documentado e fazer push para o remote.

```yaml
steps:
  1_stage_changes:
    action: Fazer stage APENAS dos arquivos relacionados a esta issue
    rules:
      - Use nomes de arquivo específicos, NÃO "git add -A" ou "git add ."
      - Exclua mudanças não relacionadas (submódulo pro, arquivos de coverage, etc.)
      - Exclua .env, credenciais e arquivos sensíveis
      - Inclua os manifests regenerados se aplicável

  2_commit:
    action: Criar o commit seguindo Conventional Commits
    format: |
      {type}({scope}): {description} (#{issue_number})

      {body - what was changed and why}

      Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
    type_map:
      BUG: fix
      FEATURE: feat
      ENHANCEMENT: feat
      DOCS: docs
      CHORE: chore
      SECURITY: fix

  3_push:
    command: git push origin {branch}
    authority: "@devops EXCLUSIVE — only this agent pushes to remote"
    on_failure: |
      Verifique se o branch tem upstream: git push -u origin {branch}
      Verifique conflitos: git pull --rebase origin {branch}

  4_close_issue:
    command: |
      gh issue close {issue_number} --comment "$(cat <<'EOF'
      ## Resolved in commit {sha}

      ### Root Cause
      {root_cause_description}

      ### Changes
      {numbered_list_of_changes}

      ### Validation
      - {test_count} tests passing
      - {validation_details}
      EOF
      )"
    purpose: Fechar com um comentário de resolução detalhado para referência futura
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Todas as mudanças planejadas implementadas
    tipo: post-condition
    blocker: true

  - [ ] Testes passam (npm test com código de saída 0)
    tipo: post-condition
    blocker: true

  - [ ] Mudanças commitadas com mensagem apropriada referenciando a issue
    tipo: post-condition
    blocker: true

  - [ ] Mudanças enviadas (push) para o remote
    tipo: post-condition
    blocker: true

  - [ ] Issue fechada com comentário de resolução
    tipo: post-condition
    blocker: true
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Causa raiz da issue identificada e documentada no comentário de fechamento
    tipo: acceptance-criterion
    blocker: true

  - [ ] A correção resolve o problema reportado completamente
    tipo: acceptance-criterion
    blocker: true

  - [ ] Nenhuma regressão introduzida (todos os testes existentes passam)
    tipo: acceptance-criterion
    blocker: true

  - [ ] O commit segue o formato Conventional Commits com referência à issue
    tipo: acceptance-criterion
    blocker: true

  - [ ] Issue fechada no GitHub com resolução detalhada
    tipo: acceptance-criterion
    blocker: true

  - [ ] Se a pesquisa foi necessária, salva em docs/research/
    tipo: acceptance-criterion
    blocker: false
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** gh (GitHub CLI)
  - **Propósito:** Buscar detalhes da issue, fechar issues, adicionar comentários
  - **Origem:** System CLI
  - **Obrigatório:** true

- **Ferramenta:** git
  - **Propósito:** Stage, commit, push de mudanças
  - **Origem:** System CLI
  - **Obrigatório:** true
  - **Autoridade:** @devops EXCLUSIVO para operações de push

- **Ferramenta:** npm
  - **Propósito:** Rodar testes (npm test), lint, build
  - **Origem:** System CLI
  - **Obrigatório:** true

- **Ferramenta:** /tech-search (skill)
  - **Propósito:** Pesquisa aprofundada quando a issue envolve specs/APIs externas
  - **Origem:** .claude/skills/tech-search
  - **Obrigatório:** false (apenas quando a pesquisa é necessária)

- **Ferramenta:** Grep/Glob/Read
  - **Propósito:** Investigação do codebase durante a Fase 1
  - **Origem:** Ferramentas nativas do Claude Code
  - **Obrigatório:** true

- **Ferramenta:** Task (subagents)
  - **Propósito:** Execução paralela para operações em lote
  - **Origem:** Ferramenta nativa do Claude Code
  - **Obrigatório:** false (apenas para mudanças de grande escopo)

---

## Dependências

```yaml
dependencies:
  tasks:
    - triage-github-issues.md        # Upstream: a triagem alimenta o resolve
    - github-devops-pre-push-quality-gate.md  # Opcional: quality gate completo antes do push
  checklists: []
  templates: []
  skills:
    - tech-search                     # Para pesquisa aprofundada quando necessário
  tools:
    - gh (GitHub CLI)
    - git
    - npm
```

---

## Tratamento de Erros

**Estratégia:** checkpoint-and-recover

**Erros Comuns:**

1. **Erro:** Issue já fechada
   - **Causa:** Outra pessoa fechou a issue
   - **Resolução:** Verifique com `gh issue view`, reporte ao usuário
   - **Recuperação:** Pule o passo de fechamento, ainda commite se a correção foi necessária

2. **Erro:** Testes falham após a implementação
   - **Causa:** A mudança de código introduziu uma regressão
   - **Resolução:** Analise a saída dos testes, corrija o problema
   - **Recuperação:** NÃO faça push. Corrija os testes primeiro, depois repita as Fases 4-5

3. **Erro:** Push rejeitado (atrás do remote)
   - **Causa:** O remote tem novos commits
   - **Resolução:** `git pull --rebase origin {branch}` e depois tente o push novamente
   - **Recuperação:** Se o rebase tiver conflitos, resolva e re-teste

4. **Erro:** Substituição em lote corrompe strings não intencionais
   - **Causa:** O padrão casa dentro de URLs, e-mails ou identificadores compostos
   - **Resolução:** Faça Grep de padrões de corrupção imediatamente após a substituição
   - **Recuperação:** Correção manual dos arquivos afetados, re-verifique
   - **Prevenção:** Use edições direcionadas em vez de substituição global quando o padrão for ambíguo

5. **Erro:** Pesquisa necessária mas /tech-search indisponível
   - **Causa:** Skill não carregada ou busca externa falhando
   - **Resolução:** Recorra a WebSearch + WebFetch manual
   - **Recuperação:** Documente os achados manualmente em docs/research/

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected:
  XS_issue: 5-15 min
  S_issue: 15-30 min
  M_issue: 30-60 min
  L_issue: 1-2 hours
  XL_issue: 2-4 hours
cost_estimated: $0.01-0.10 (depends on complexity and research)
token_usage: ~5,000-50,000 tokens
```

---

## Metadata

```yaml
story: N/A (operational task)
version: 1.0.0
dependencies:
  tasks:
    - triage-github-issues.md
    - github-devops-pre-push-quality-gate.md
  skills:
    - tech-search
tags:
  - devops
  - issue-management
  - implementation
  - quality-gates
created_at: 2026-02-21
updated_at: 2026-02-21
related_tasks:
  - triage-github-issues.md
  - github-devops-pre-push-quality-gate.md
  - github-devops-github-pr-automation.md
```

---

## Lições Aprendidas (de sessões anteriores)

Estes padrões foram identificados em sessões reais de resolução de issues e devem guiar a execução:

### Issue #159 (Rename em Lote) — Paralelismo + Casos de Borda
- **Padrão:** 5 agents paralelos para 136 arquivos, divididos por diretório
- **Armadilha:** `@synkra/aiox-core` dentro do e-mail `security@synkra/aiox-core.dev` foi corrompido
- **Lição:** Sempre faça Grep de casos de borda DEPOIS de substituições em lote

### Issue #138 (Formato Copilot) — Pesquisa Primeiro
- **Padrão:** /tech-search antes da implementação, plano de 6 fases a partir da pesquisa
- **Armadilha:** O YAML parseou `CRITICAL: value` como objeto `{CRITICAL: value}` em vez de string
- **Lição:** Trate tanto o formato string quanto o de objeto ao processar arrays YAML

### Issue #174 (Nome do Pacote) — Vitória Rápida
- **Padrão:** Correção pequena e focada em 1 arquivo, validação imediata
- **Lição:** Vitórias rápidas ainda devem seguir o ciclo completo validar → commit → push → close

### Remoção de E-mail — Feedback do Usuário no Meio da Sessão
- **Padrão:** O usuário notou e-mails inexistentes durante a resolução da issue
- **Lição:** Seja responsivo ao feedback do usuário mesmo quando trabalhando em outra issue

---

## Integração com o Agente @devops

Chamado via comando `@devops *resolve-issue {number}`.

**Upstream:** `*triage-issues` → o usuário seleciona a issue → `*resolve-issue {number}`
**Downstream:** Após a resolução → `*triage-issues` novamente para a próxima issue (se em modo batch)
