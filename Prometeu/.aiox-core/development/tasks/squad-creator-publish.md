---
task: Publish Squad
responsavel: "@squad-creator"
responsavel_type: agent
atomic_layer: task
status: active
sprint: 8
story: SQS-6
Entrada: |
  - squad_path: Caminho do squad para publicar (obrigatório)
  - dry_run: Flag para simular sem criar PR (--dry-run)
  - category: Categoria do squad (community | official)
Saida: |
  - pr_url: URL do Pull Request criado
  - branch: Nome do branch criado
  - validation_result: Resultado da validação pré-publish
Checklist:
  - "[ ] Validar squad (deve passar sem errors)"
  - "[ ] Verificar autenticação GitHub"
  - "[ ] Verificar se squad já existe no registry"
  - "[ ] Criar branch no fork/clone"
  - "[ ] Copiar arquivos do squad"
  - "[ ] Atualizar registry.json"
  - "[ ] Criar Pull Request"
  - "[ ] Exibir URL do PR"
---

# *publish-squad

Publica um squad local no repositório GitHub aiox-squads via Pull Request.

## Pré-requisitos

- GitHub CLI instalado e autenticado: `gh auth login`
- O squad deve passar na validação sem erros
- O squad deve ter os campos obrigatórios do manifest (name, version)

## Uso

```bash
@squad-creator

# Publicar squad (cria PR)
*publish-squad ./squads/my-squad

# Preview sem criar PR
*publish-squad ./squads/my-squad --dry-run

# Saída detalhada
*publish-squad ./squads/my-squad --verbose
```

## Exemplos

### Dry Run (Preview)

```
*publish-squad ./squads/my-squad --dry-run

[SquadPublisher] Dry run mode

Squad: my-squad
Version: 1.0.0
Author: developer-name

PR Preview:
  Title: Add squad: my-squad
  Branch: squad/my-squad
  Target: SynkraAI/aiox-squads

Components:
  - Tasks: 5
  - Agents: 2
  - Workflows: 1

✓ Validation passed
✓ Ready to publish

Run without --dry-run to create the actual PR.
```

### Publicar (Criar PR)

```
*publish-squad ./squads/my-squad

Publishing: my-squad@1.0.0
  Source: ./squads/my-squad/
  Target: github.com/SynkraAI/aiox-squads

✓ Validated successfully
✓ GitHub auth verified (user: your-username)
✓ Fork ready
✓ Files copied to packages/my-squad/
✓ registry.json updated
✓ Committed changes
✓ Pushed to fork

Pull Request Created!
  URL: https://github.com/SynkraAI/aiox-squads/pull/42
  Branch: squad/my-squad

Next steps:
  1. Review the PR: gh pr view 42
  2. Wait for maintainer review
  3. Address any feedback
```

## Opções

| Opção | Descrição |
|--------|-------------|
| `--dry-run` | Preview da publicação sem criar PR |
| `--verbose` | Mostra o progresso detalhado |
| `--category` | Categoria do squad (default: community) |

## Workflow

```
1. Validar o squad
   ├── Rodar SquadValidator
   └── Deve passar com 0 erros

2. Carregar o manifest
   ├── Extrair name, version, author
   └── Extrair a lista de components

3. Verificar a autenticação do GitHub
   └── Verificar o status de gh auth

4. Criar/verificar o fork
   └── Fazer fork de SynkraAI/aiox-squads se necessário

5. Clonar o fork em um diretório temporário
   └── Shallow clone para mais velocidade

6. Criar a branch
   └── squad/{squad-name}

7. Copiar os arquivos do squad
   └── Para packages/{squad-name}/

8. Atualizar registry.json
   ├── Adicionar à seção community
   └── Ordenar alfabeticamente

9. Commitar e dar push
   └── Incluir metadados na mensagem de commit

10. Criar o PR
    ├── Gerar o corpo do PR a partir do manifest
    └── Direcionar à branch main

11. Limpeza
    └── Remover o diretório temporário
```

## Template do Corpo do PR

O corpo do PR gerado inclui:

```markdown
## New Squad: {name}

**Version:** {version}
**Author:** {author}
**Category:** community
**Description:** {description}

### Components

| Type | Count |
|------|-------|
| Tasks | {n} |
| Agents | {n} |
| Workflows | {n} |

### Pre-submission Checklist

- [x] Squad follows AIOX task-first architecture
- [x] Documentation is complete
- [x] Squad validated locally
- [ ] No sensitive data included
```

## Tratamento de Erros

| Erro | Causa | Solução |
|-------|-------|----------|
| `AUTH_REQUIRED` | Não autenticado | Execute `gh auth login` |
| `VALIDATION_FAILED` | Squad tem erros | Corrija os erros com `*validate-squad` |
| `SQUAD_NOT_FOUND` | Caminho inválido | Verifique se o path do squad existe |
| `MANIFEST_ERROR` | name/version ausentes | Atualize squad.yaml |
| `PR_ERROR` | Erro do GitHub CLI | Verifique se o `gh` está funcionando |

## Requisitos

### Campos do Manifest

Obrigatórios para publicação:
```yaml
# squad.yaml
name: my-squad          # Obrigatório
version: 1.0.0          # Obrigatório
description: "..."      # Recomendado
author: your-name       # Recomendado
```

### Regras de Validação

O squad deve passar na validação:
- squad.yaml válido com os campos obrigatórios
- Arquivos de task no diretório tasks/
- Nenhum erro crítico

## Implementação

Usa a classe `SquadPublisher` de:
- `.aiox-core/development/scripts/squad/squad-publisher.js`

## Tasks Relacionadas

- `*validate-squad` - Validar antes de publicar
- `*download-squad` - Baixar squads publicados
- `*create-squad` - Criar novo squad local

## Story Relacionada

- **SQS-6:** Download & Publish Tasks (Sprint 8)
