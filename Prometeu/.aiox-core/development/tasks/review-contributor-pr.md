# Task: Revisar PR de Contribuidor Externo

## Metadados

```yaml
id: review-contributor-pr
agent: devops
elicit: true
category: security
priority: high
story: NOG-17
```

## Descrição

Processo formal de revisão de segurança para PRs de contribuidores externos antes do merge. Esta task garante que PRs de contribuidores em forks sejam revisados quanto a riscos de segurança não presentes em PRs da equipe interna.

## Pré-Condições

- O PR é de um contribuidor externo (baseado em fork)
- O PR passou nos checks automatizados de CI (ou o CI foi pulado devido a restrições de fork)
- Revisão do CodeRabbit concluída (verificar conteúdo oculto na descrição do PR)

## Entradas

- `{pr_number}` - Número do PR do GitHub a revisar

## Execução

### Passo 1: Identificar o Escopo do PR

```bash
# Get PR details
gh pr view {pr_number} --json files,additions,deletions,author,body

# Classify PR type
# CI/Workflow = .github/
# Test = tests/
# Code = packages/, .aiox-core/, bin/
# Config = .gitmodules, *.config.*
# Docs = docs/, *.md
```

**Elicit:** "PR #{pr_number} classificado como: {type}. Prosseguindo com o checklist de segurança de {type}."

### Passo 2: Checklist de Segurança (por tipo de PR)

#### Para PRs de CI/Workflow (.github/)

- [ ] Nenhum `pull_request_target` com checkout explícito adicionado
- [ ] Nenhuma nova referência a secrets (`${{ secrets.* }}`)
- [ ] Nenhuma escalação de permissão (`permissions: write-all`, `contents: write` onde desnecessário)
- [ ] Versões de actions usam publishers conhecidos e confiáveis
- [ ] Versões de actions estão fixadas por SHA (não baseadas em tag)
- [ ] Nenhum `workflow_dispatch` com inputs perigosos
- [ ] Nenhum novo bloco `env:` expondo dados sensíveis

#### Para PRs de Teste (tests/)

- [ ] Nenhum import de `require('https')`, `require('http')`, `require('net')`, `require('dns')`
- [ ] Nenhum `fetch()`, `XMLHttpRequest` ou chamada de rede
- [ ] Nenhum `fs.readFileSync` fora dos fixtures de teste
- [ ] Nenhum acesso `process.env` a variáveis sensíveis
- [ ] Nenhum uso de `child_process` (`execSync`, `spawn`, etc.)
- [ ] Os caminhos de `require()` apontam apenas para módulos legítimos do projeto
- [ ] Nenhum padrão de exfiltração (codificação base64 + chamada de rede)

#### Para PRs de Código (packages/, .aiox-core/, bin/)

- [ ] Nenhuma nova dependência adicionada sem justificativa
- [ ] Nenhuma mudança nos scripts do `package.json` (`preinstall`, `postinstall`)
- [ ] Nenhuma leitura de arquivo `.env` ou mudança no tratamento de credenciais
- [ ] Nenhum `shell: true` em qualquer chamada exec/spawn
- [ ] Nenhuma construção de comando baseada em string (use argumentos em array)
- [ ] Revisão do CodeRabbit concluída (verificar conteúdo oculto na descrição do PR)

#### Para PRs de Config (.gitmodules, *.config.*)

- [ ] Nenhuma mudança de URL para repositórios externos/desconhecidos
- [ ] Nenhuma adição de novo submódulo
- [ ] Os valores de config são esperados e documentados
- [ ] Nenhuma modificação de hooks que possa alterar o comportamento

### Passo 3: Varredura Automatizada

Execute o comando grep apropriado com base no tipo de PR:

```bash
# For test PRs - check for suspicious patterns
gh pr diff {pr_number} -- 'tests/' | grep -E "(require\('https|require\('http|require\('net|require\('dns|fetch\(|\.readFileSync|process\.env|child_process|execSync|spawn)"

# For code PRs - check for shell execution patterns
gh pr diff {pr_number} -- 'packages/' '.aiox-core/' 'bin/' | grep -E "(shell:\s*true|execSync\(|\.exec\(|eval\(|Function\()"

# For CI PRs - check for permission/secret changes
gh pr diff {pr_number} -- '.github/' | grep -E "(permissions:|secrets\.|pull_request_target|workflow_dispatch)"

# For any PR - check for hidden content in PR body
gh pr view {pr_number} --json body --jq '.body' | grep -iE "(<picture|<source|<img.*onerror|<!--.*ignore.*instruct)"
```

**Elicit:** "Resultados da varredura: {summary}. {findings_count} padrões suspeitos encontrados."

### Passo 4: Matriz de Decisão

| Mudanças no PR | Nível de Risco | Ações Necessárias |
|-----------|-----------|-----------------|
| Apenas documentação | LOW | Revisão padrão |
| Apenas arquivos de teste | MEDIUM | Varredura de segurança + grep |
| Código-fonte | MEDIUM-HIGH | Varredura de segurança + revisão cuidadosa |
| CI/Workflows | HIGH | Varredura de segurança + auditoria de SHA + 2 aprovações |
| package.json | HIGH | Bloquear até verificação |
| .gitmodules | MEDIUM | Verificação de URL necessária |
| Arquivos de config | MEDIUM | Verificação de valores necessária |

### Passo 5: Decisão de Merge

**Elicit:** Apresente os resultados do checklist e peça confirmação:

```
## Contributor PR Security Review Summary

**PR:** #{pr_number}
**Author:** {author} (external contributor)
**Type:** {pr_type}
**Files Changed:** {file_count}

### Checklist Results
- Security scan: {PASS|WARN|FAIL}
- Automated grep: {PASS|WARN|FAIL}
- CodeRabbit: {APPROVED|CHANGES_REQUESTED|PENDING}
- Hidden content check: {CLEAN|SUSPICIOUS}

### Recommendation
{APPROVE|APPROVE_WITH_NOTES|REQUEST_CHANGES|BLOCK}

Proceed with merge? (y/n)
```

## Pós-Condições

- PR revisado com o checklist de segurança apropriado ao seu tipo
- Varredura automatizada concluída sem achados não resolvidos
- Decisão registrada (aprovar, solicitar mudanças ou bloquear)
- Se mergeado: enforce_admins temporariamente desabilitado se necessário, depois reabilitado

## Notas

- Para PRs que modificam `.github/workflows/`, exija 2 aprovações de mantenedores
- Para PRs de **contribuidores confiáveis** (ex.: @riaworks com PRs de segurança já mergeados anteriormente), a revisão padrão pode ser suficiente para PRs de docs/teste
- Sempre reabilite o enforce_admins imediatamente após o merge
- Pesquisa de referência: `docs/research/2026-02-21-ci-security-external-prs/`
