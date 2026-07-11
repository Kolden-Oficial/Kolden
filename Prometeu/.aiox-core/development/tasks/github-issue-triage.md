---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Triagem de Issues do GitHub

## Metadados da Task

```yaml
id: github-issue-triage
name: GitHub Issue Triage
agent: devops
elicit: true
category: repository-management
story: GHIM-001
```

## Descrição

Triagem sistemática de issues do GitHub para o repositório aiox-core. Esta task orienta o @devops pelo processo de revisão, classificação e rotulagem (labeling) de issues abertas.

## Pré-requisitos

- GitHub CLI autenticado (`gh auth status`)
- Taxonomia de labels implantada (veja GHIM-001 Fase 1)
- Acesso à lista de issues do repositório

## Workflow

### Passo 1: Listar Issues Não Triadas

```bash
gh issue list --label "status: needs-triage" --json number,title,labels,createdAt,author --limit 50
```

### Passo 2: Triagem por Issue (Interativa)

Para cada issue, aplique o checklist de triagem:

1. **Leia a issue** — Abra e entenda o conteúdo
2. **Classifique o tipo** — Aplique UM label `type:`:
   - `type: bug` — Algo não está funcionando
   - `type: feature` — Solicitação de nova funcionalidade
   - `type: enhancement` — Melhoria de funcionalidade existente
   - `type: docs` — Issue de documentação
   - `type: test` — Cobertura de testes
   - `type: chore` — Manutenção/limpeza
3. **Avalie a prioridade** — Aplique UM label `priority:`:
   - `priority: P1` — Crítica, bloqueia usuários (SLA: resposta em 24h)
   - `priority: P2` — Alta, afeta a maioria dos usuários (SLA: 3 dias)
   - `priority: P3` — Média, afeta alguns usuários (SLA: 1 semana)
   - `priority: P4` — Baixa, casos extremos (backlog)
4. **Atribua a área** — Aplique UM ou mais labels `area:`:
   - `area: core`, `area: installer`, `area: synapse`, `area: cli`
   - `area: pro`, `area: health-check`, `area: docs`, `area: devops`
5. **Atualize o status** — Substitua `status: needs-triage` pelo status apropriado:
   - `status: confirmed` — Issue válida, pronta para trabalho
   - `status: needs-info` — Precisa de mais detalhes do autor
6. **Verifique duplicatas** — Se for duplicata, aplique o label `duplicate` e feche com referência
7. **Labels de comunidade** — Se apropriado, adicione `community: good first issue` ou `community: help wanted`

### Passo 3: Aplicar Labels

```bash
gh issue edit {number} --add-label "type: bug,priority: P2,area: installer,status: confirmed" --remove-label "status: needs-triage"
```

### Passo 4: Triagem em Lote (Opcional)

Para operações em massa, use o script de triagem:

```bash
node .aiox-core/development/scripts/issue-triage.js --list
node .aiox-core/development/scripts/issue-triage.js --apply {number} --type bug --priority P2 --area installer
```

### Passo 5: Relatório

Após a sessão de triagem, gere o resumo:

```bash
node .aiox-core/development/scripts/issue-triage.js --report
```

## Árvore de Decisão de Triagem

```
Issue recebida
  ├── É duplicata? → Aplicar label "duplicate", fechar com referência
  ├── É spam/inválida? → Aplicar label "status: invalid", fechar
  ├── Precisa de mais informações? → Aplicar label "status: needs-info", comentar pedindo detalhes
  └── Issue válida
       ├── Bug → "type: bug" + prioridade + área
       ├── Feature → "type: feature" + prioridade + área
       ├── Enhancement → "type: enhancement" + prioridade + área
       ├── Docs → "type: docs" + priority: P3/P4
       └── Tests → "type: test" + área
```

## Diretrizes de Prioridade

| Sinal | Prioridade |
|--------|----------|
| Bloqueia a instalação/uso para todos os usuários | P1 |
| Quebra funcionalidade central, sem workaround | P1 |
| Bug significativo com workaround | P2 |
| Funcionalidade muito solicitada pela comunidade | P2 |
| Bug menor, caso extremo | P3 |
| Melhoria desejável (nice-to-have) | P3 |
| Cosmético, baixo impacto | P4 |

## Integração de Comandos

Esta task é invocável via @devops:
- `*triage` — Iniciar sessão de triagem interativa
- `*triage --batch` — Executar triagem em lote com script

## Saída

- Todas as issues rotuladas com labels `type:`, `priority:`, `area:`
- `status: needs-triage` removido de todas as issues triadas
- Relatório de triagem com resumo das ações realizadas
