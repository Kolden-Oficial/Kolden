---
id: pr-automation
name: Automate Pull Request Creation for Open-Source Contributions
agent: github-devops
category: devops
complexity: medium
tools:
  - github-cli       # Create PRs, manage repository
  - coderabbit-free  # Pre-submission code review
checklists:
  - github-devops-checklist.md
  - pr-quality-checklist.md
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Automatizar a Criação de Pull Request para Contribuições Open-Source

## Propósito

Ajudar usuários a contribuir com o projeto open-source AIOX (`aiox-core`) automatizando o processo de criação de pull request, garantindo que as contribuições sigam os padrões do projeto, passem nas verificações de qualidade e tenham a formatação adequada antes do envio.

**Repositório Alvo**: `aiox-core` (framework open-source)

**Tipos de Contribuição Suportados**:
- Squads (novos agentes, tasks, workflows)
- Melhorias de agentes (prompts aprimorados, novos comandos)
- Refinamentos de tasks (melhores checklists, templates)
- Integrações de ferramentas (novas ferramentas MCP)
- Correções de bugs e melhorias
- Aprimoramentos de documentação

## Entrada

### Parâmetros Obrigatórios

- **contribution_type**: `string`
  - **Descrição**: Tipo de contribuição
  - **Opções**: `"Squad"`, `"agent"`, `"task"`, `"tool"`, `"bug-fix"`, `"documentation"`, `"improvement"`
  - **Obrigatório**: true

- **contribution_path**: `string`
  - **Descrição**: Caminho para os arquivos novos/modificados
  - **Exemplo**: `"Squads/my-new-pack/"` ou `".aiox-core/development/agents/improved-agent.md"`
  - **Validação**: O caminho deve existir localmente

### Parâmetros Opcionais

- **title**: `string`
  - **Descrição**: Título do PR (gerado automaticamente se não fornecido)
  - **Formato**: `"{type}: {brief description}"`
  - **Exemplo**: `"feat(Squad): Add content-creator pack with Instagram agent"`

- **description**: `string`
  - **Descrição**: Descrição do PR (gerada automaticamente a partir do template se não fornecida)

- **issue_number**: `number`
  - **Descrição**: Número da issue relacionada (se aplicável)
  - **Exemplo**: `42`
  - **Link**: Adicionará "Closes #42" ao PR

- **run_coderabbit**: `boolean`
  - **Descrição**: Rodar a pré-verificação do CodeRabbit antes de enviar
  - **Padrão**: `true`
  - **Recomendação**: Sempre true para contribuidores de primeira viagem

- **skip_tests**: `boolean`
  - **Descrição**: Pular a execução de testes locais (NÃO RECOMENDADO)
  - **Padrão**: `false`
  - **Aviso**: Use apenas se os testes já estiverem passando

## Saída

- **pr_url**: `string`
  - **Descrição**: URL do pull request criado
  - **Exemplo**: `"https://github.com/SynkraAI/aiox-core/pull/123"`

- **pr_number**: `number`
  - **Descrição**: Número do PR
  - **Exemplo**: `123`

- **branch_name**: `string`
  - **Descrição**: Branch de feature criado
  - **Exemplo**: `"contrib/Squad-content-creator"`

- **coderabbit_report**: `object` (se run_coderabbit=true)
  - **Estrutura**: `{ issues_found, security_warnings, suggestions, review_url }`
  - **Descrição**: Resultados da revisão de código pré-envio

- **quality_score**: `number`
  - **Descrição**: Pontuação de qualidade da contribuição (0-100)
  - **Critérios**: Documentação, testes, qualidade de código, aderência aos padrões

- **next_steps**: `array<string>`
  - **Descrição**: O que acontece em seguida (processo de revisão, cronograma)

## Processo

### Fase 1: Validação Pré-Envio (3 min)

1. **Validar o Caminho da Contribuição**
   - Verificar se os arquivos existem localmente
   - Verificar a estrutura de diretórios correta
   - Garantir que as convenções de nomenclatura sejam seguidas

2. **Validar o Estado do Repositório**
   - Verificar se o repositório `aiox-core` está definido como upstream
   - Verificar se o fork existe (ou criar um)
   - Garantir que o branch main esteja atualizado

3. **Detectar o Tipo de Contribuição** (se não fornecido)
   - Escanear os arquivos modificados:
     - `Squads/*` → "Squad"
     - `.aiox-core/development/agents/*` → "agent"
     - `.aiox-core/development/tasks/*` → "task"
     - `aiox-core/tools/*` → "tool"
     - `*.md` em docs → "documentation"
     - `*.test.js` ou correções de bug → "bug-fix"

### Fase 2: Pré-Verificação de Qualidade (5 min)

4. **Rodar os Testes Locais** (a menos que skip_tests=true)
   - Executar a suíte de testes: `npm test`
   - Verificar por falhas
   - Se houver falhas: PARAR e mostrar os erros

5. **Rodar a Pré-Verificação do CodeRabbit** (se run_coderabbit=true)
   - Executar: `coderabbit --prompt-only -t uncommitted`
   - Gerar a revisão pré-envio
   - Identificar problemas:
     - 🔴 **Crítico**: Segurança, breaking changes, erros de sintaxe
     - 🟠 **Importante**: Violações de boas práticas, testes ausentes
     - 🟡 **Sugestões**: Estilo de código, dicas de performance

6. **Validar os Padrões de Contribuição**
   - Verificar contra as diretrizes de contribuição:
     - [ ] **Squads**: Têm README, agent.md, tasks/, estrutura adequada
     - [ ] **Agents**: Seguem o template de agente, têm comandos, dependências
     - [ ] **Tasks**: Seguem a spec de formato de task, têm checklists, docs completas
     - [ ] **Tools**: Têm YAML de definição de ferramenta, exemplos de uso
     - [ ] **Documentation**: Clara, bem formatada, sem links quebrados

7. **Gerar a Pontuação de Qualidade**
   - **Documentação**: +30 pontos (README, comentários inline, exemplos)
   - **Testes**: +25 pontos (cobertura de testes, qualidade dos testes)
   - **Qualidade de Código**: +25 pontos (linting, pontuação do CodeRabbit)
   - **Aderência aos Padrões**: +20 pontos (segue templates, convenções de nomenclatura)
   - **Pontuação Mínima**: 70/100 (RECOMENDADA para aprovação)

8. **Exibir os Resultados da Pré-Verificação**
   - Mostrar a pontuação de qualidade
   - Listar os problemas críticos (devem ser corrigidos)
   - Listar os problemas importantes (deveriam ser corrigidos)
   - Sugerir melhorias

9. **Confirmação do Usuário**
   - Perguntar: "Quality Score: {score}/100. Proceed with PR creation? (yes/no/fix-issues)"
   - Se "fix-issues": Fornecer orientação e rodar novamente as verificações após as correções
   - Se "no": Abortar
   - Se "yes": Continuar

### Fase 3: Preparação de Branch e Commit (2 min)

10. **Criar o Branch de Feature**
    - Formato do nome do branch: `contrib/{contribution_type}-{brief-name}`
    - Exemplo: `contrib/Squad-content-creator`
    - Garantir que o branch ainda não exista

11. **Adicionar Mudanças ao Stage**
    - Adicionar ao stage todos os arquivos em `contribution_path`
    - Verificar se nenhum arquivo não intencional foi incluído

12. **Criar o Commit**
    - Seguir Conventional Commits:
      ```
      {type}({scope}): {description}
      
      {body}
      
      {footer}
      ```
    - **type**: `feat` (nova feature), `fix` (correção de bug), `docs` (documentação), `refactor`, etc.
    - **scope**: `Squad`, `agent`, `task`, `tool`, etc.
    - **Exemplo**:
      ```
      feat(Squad): add content-creator pack with Instagram agent
      
      Implements a complete content creation squad with:
      - Instagram content specialist agent
      - 5 new tasks (create-post, schedule-content, analyze-performance, etc.)
      - Template library for posts, stories, reels
      
      Closes #42
      ```

### Fase 4: Criação do PR (2 min)

13. **Enviar o Branch para o Fork**
    - Enviar para o fork do usuário: `git push origin {branch_name}`
    - Aguardar a conclusão do push

14. **Gerar o Título e a Descrição do PR**
    - **Título**: Gerar automaticamente a partir do commit se não fornecido
    - **Descrição**: Usar o template de PR:

      ```markdown
      ## Contribution Type
      
      - [x] {contribution_type}
      
      ## Description
      
      {brief_description}
      
      ## What's Changed
      
      {detailed_changes}
      
      ## Related Issue
      
      Closes #{issue_number} (if applicable)
      
      ## Checklist
      
      - [x] Follows contribution guidelines
      - [x] Tests passing locally
      - [x] Documentation included
      - [x] CodeRabbit pre-check passed
      - [x] Quality score: {score}/100
      
      ## Pre-Submission Review
      
      **CodeRabbit Score**: {coderabbit_score}
      **Issues Found**: {issues_found}
      **Security Warnings**: {security_warnings}
      
      {coderabbit_summary}
      
      ## Testing
      
      - [ ] Unit tests: {test_count} tests passing
      - [ ] Integration tests: {integration_status}
      - [ ] Manual testing: {manual_test_description}
      
      ## Screenshots (if UI changes)
      
      {screenshots if applicable}
      
      ---
      
      **First-time contributor?** Welcome! 🎉 This PR was created using AIOX PR Automation.
      ```

15. **Criar o Pull Request**
    - Usar a GitHub CLI:
      ```bash
      gh pr create \
        --repo SynkraAI/aiox-core \
        --title "{title}" \
        --body "{description}" \
        --base main \
        --head {user}:{branch_name}
      ```
    - Capturar a URL e o número do PR

### Fase 5: Pós-Envio (1 min)

16. **Adicionar Labels** (automatizado pelo CI)
    - `contribution` - Todos os PRs da comunidade
    - `{contribution_type}` - Label específica do tipo
    - `first-time-contributor` (se aplicável)
    - `needs-review` - Aguardando revisão do mantenedor

17. **Solicitar Revisores** (automatizado)
    - O CodeRabbit revisará automaticamente em até 2 minutos
    - Mantenedores são atribuídos automaticamente com base no tipo de contribuição

18. **Fornecer os Próximos Passos**
    - Exibir para o usuário:
      ```
      ✅ Pull Request Created!
      
      PR #{pr_number}: {title}
      URL: {pr_url}
      
      Next Steps:
      1. ⏳ CodeRabbit will review your PR within 2 minutes
      2. 👤 Maintainers will review within 24-48 hours
      3. 💬 Respond to any feedback or questions
      4. ✅ Once approved, your contribution will be merged!
      
      Timeline:
      - CodeRabbit review: ~2 minutes
      - Maintainer review: 24-48 hours
      - Merge (if approved): Immediate
      
      Thank you for contributing to AIOX! 🚀
      ```

## Checklist

### Pré-condições

- [ ] Os arquivos de contribuição existem localmente
  - **Validação**: Os arquivos em `contribution_path` existem
  - **Erro**: "Files not found at {contribution_path}"

- [ ] Existe um fork do aiox-core
  - **Validação**: `gh repo view {user}/aiox-core` tem sucesso
  - **Ação**: Se não encontrado, criar o fork automaticamente

- [ ] O branch main está atualizado
  - **Validação**: `git fetch upstream && git diff upstream/main` está vazio
  - **Ação**: Se estiver atrasado, oferecer sincronização: "Your fork is {N} commits behind. Sync now? (yes/no)"

- [ ] Nenhuma mudança não commitada fora de contribution_path
  - **Validação**: `git status --porcelain` mostra apenas os arquivos pretendidos
  - **Erro**: "Unrelated uncommitted changes detected. Commit or stash first."

### Pós-condições

- [ ] Branch de feature criado e enviado (push)
  - **Validação**: `gh api repos/{user}/{repo}/branches/{branch}` tem sucesso
  - **Teste**: Branch visível no GitHub

- [ ] Pull request criado
  - **Validação**: `gh pr view {pr_number}` tem sucesso
  - **Teste**: URL do PR acessível

- [ ] Revisão do CodeRabbit solicitada
  - **Validação**: O CodeRabbit comenta no PR em até 5 minutos
  - **Verificação Manual**: true

- [ ] A pontuação de qualidade atende ao mínimo (se aplicado)
  - **Validação**: `quality_score >= 70`
  - **Aviso**: "Quality score below recommended threshold. Consider improvements before submitting."

### Critérios de Aceite

- [ ] O PR segue as diretrizes de contribuição
  - **Tipo**: acceptance
  - **Teste**: Checklist na descrição do PR concluído

- [ ] O PR tem título e corpo descritivos
  - **Tipo**: acceptance
  - **Teste**: Título >= 20 caracteres, corpo >= 100 caracteres

- [ ] Testes passando (CI)
  - **Tipo**: acceptance
  - **Teste**: Verificações de CI do GitHub Actions verdes em até 10 minutos

## Templates

### Template de PR (Gerado Automaticamente)

*Veja a Fase 4, Passo 14 para o template completo*

### Referência das Diretrizes de Contribuição

```markdown
## Contributing to AIOX

Thank you for your interest in contributing! 🎉

### Types of Contributions

- **Squads**: New agent ecosystems
- **Agents**: Improved or new agents
- **Tasks**: Enhanced or new tasks
- **Tools**: MCP tool integrations
- **Bug Fixes**: Code improvements
- **Documentation**: Docs, examples, tutorials

### Before You Submit

1. ✅ Read the [Contribution Guidelines](docs/CONTRIBUTING.md)
2. ✅ Run local tests: `npm test`
3. ✅ Run CodeRabbit pre-check: `coderabbit --prompt-only -t uncommitted`
4. ✅ Follow naming conventions and templates
5. ✅ Include documentation and examples

### PR Process

1. Fork the repository
2. Create a feature branch: `contrib/{type}-{name}`
3. Make your changes
4. Run quality checks
5. Submit PR with descriptive title/body
6. Respond to review feedback

### Review Timeline

- **CodeRabbit Review**: ~2 minutes (automated)
- **Maintainer Review**: 24-48 hours
- **Merge**: Immediate after approval

### Questions?

- Open an issue for discussion
- Join our Discord: [link]
- Read the docs: [link]
```

## Ferramentas

- **github-cli**:
  - **Versão**: 2.0.0
  - **Usado Para**: Criar PRs, gerenciar forks, interagir com o repositório
  - **Obrigatório**: true

- **coderabbit-free**:
  - **Versão**: Latest (GitHub App)
  - **Usado Para**: Revisão de código pré-envio, análise de qualidade
  - **Custo**: $0 (GRÁTIS para open-source)
  - **Opcional**: false (recomendado para garantia de qualidade)

## Performance

- **Duração Esperada**: 15 minutos (incluindo verificações de qualidade)
- **Custo Estimado**: $0 (todas as ferramentas são grátis para open-source)
- **Cacheável**: false (cada PR é único)
- **Paralelizável**: false (processo sequencial)

## Tratamento de Erros

- **Estratégia**: fallback + retry
- **Fallback**: Se o CodeRabbit falhar, continuar sem a pré-verificação (avisar o usuário)
- **Retry**:
  - **Máximo de Tentativas**: 3 (para erros de rede/API)
  - **Backoff**: exponencial
  - **Backoff MS**: 2000
- **Abortar Workflow**: false (deixar o usuário corrigir os problemas e tentar novamente)
- **Notificação**: log + saída de console

## Metadados

- **Story**: Epic 10 (Critical Dependency Resolution)
- **Versão**: 1.0.0
- **Dependências**: `github-cli`, `coderabbit-free`
- **Autor**: Brad Frost Clone
- **Criado**: 2025-11-13
- **Atualizado**: 2025-11-13
- **Breaking Changes**: Nenhum (nova task)

---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: prAutomation()
responsável: Gage (Automator)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be registered task

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid task parameters

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memory
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: State management
  persistido: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task is registered; required parameters provided; dependencies met
    tipo: pre-condition
    blocker: true
    validação: |
      Check task is registered; required parameters provided; dependencies met
    error_message: "Pré-condição falhou: a task está registrada; os parâmetros obrigatórios foram fornecidos; as dependências foram atendidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task completed; exit code 0; expected outputs created
    tipo: post-condition
    blocker: true
    validação: |
      Verify task completed; exit code 0; expected outputs created
    error_message: "Pós-condição falhou: a task foi concluída; código de saída 0; as saídas esperadas foram criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task completed as expected; side effects documented
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert task completed as expected; side effects documented
    error_message: "Critério de aceite não atendido: a task foi concluída conforme esperado; os efeitos colaterais foram documentados"
```

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de task
  - **Language:** JavaScript
  - **Location:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** A task especificada não está registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Divida em workflows menores; implemente checkpointing; use processamento assíncrono sempre que possível

---

## Metadados

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Exemplos de Uso

### Exemplo 1: Enviar Novo Squad

```bash
aiox activate Otto  # github-devops agent
aiox pr create \
  --type="Squad" \
  --path="Squads/content-creator/" \
  --issue=42
```

**Saída**: Verificação de qualidade → PR criado → CodeRabbit revisa

### Exemplo 2: Enviar Melhoria de Agente

```bash
aiox pr create \
  --type="agent" \
  --path=".aiox-core/development/agents/improved-po.md" \
  --title="feat(agent): enhance PO agent with story validation"
```

**Saída**: PR automatizado com formatação adequada

### Exemplo 3: Enviar Correção de Bug

```bash
aiox pr create \
  --type="bug-fix" \
  --path=".aiox-core/development/tasks/create-next-story.md" \
  --title="fix(task): correct file path validation in create-next-story"
```

**Saída**: PR rápido para correção urgente

---

## Detalhamento da Pontuação de Qualidade

**Total: 100 pontos**

### Documentação (30 pontos)
- [ ] README incluído (+10)
- [ ] Comentários inline presentes (+10)
- [ ] Exemplos de uso fornecidos (+10)

### Testes (25 pontos)
- [ ] Testes unitários incluídos (+15)
- [ ] Testes de integração incluídos (+10)

### Qualidade de Código (25 pontos)
- [ ] Linting passa (+10)
- [ ] Pontuação do CodeRabbit >= 80 (+15)

### Aderência aos Padrões (20 pontos)
- [ ] Segue o template de task/agent/tool (+10)
- [ ] Convenções de nomenclatura corretas (+5)
- [ ] Estrutura de diretórios correta (+5)

**Mínimo Recomendado**: 70/100

---

**Tasks Relacionadas:**
- `ci-cd-configuration` - Configuração de pipeline de CI para quality gates
- `release-management` - Releases automatizadas após o merge
- `facilitate-brainstorming-session` - Idear contribuições com agentes de IA
