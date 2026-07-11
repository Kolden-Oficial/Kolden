---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/templates/squad/agent-template|agent-template]]"
  - "[[Prometeu/.aiox-core/development/templates/squad/task-template|task-template]]"
  - "[[Prometeu/.aiox-core/development/templates/squad/template-template|template-template]]"
---

# Checklist {{COMPONENTNAME}}

> {{DESCRIPTION}}
> Squad: {{SQUADNAME}}
> Criado: {{CREATEDAT}}
{{#IF STORYID}}
> Story: {{STORYID}}
{{/IF}}

---

## Pré-Condições

Antes de começar, verifique:

- [ ] Pré-condição 1
- [ ] Pré-condição 2
- [ ] Pré-condição 3

---

## Itens do Checklist

### Categoria 1: Setup

| # | Item | Status | Notas |
|---|------|--------|-------|
| 1.1 | Descrição do item | [ ] | |
| 1.2 | Descrição do item | [ ] | |
| 1.3 | Descrição do item | [ ] | |

### Categoria 2: Implementação

| # | Item | Status | Notas |
|---|------|--------|-------|
| 2.1 | Descrição do item | [ ] | |
| 2.2 | Descrição do item | [ ] | |
| 2.3 | Descrição do item | [ ] | |

### Categoria 3: Validação

| # | Item | Status | Notas |
|---|------|--------|-------|
| 3.1 | Descrição do item | [ ] | |
| 3.2 | Descrição do item | [ ] | |
| 3.3 | Descrição do item | [ ] | |

---

## Pós-Condições

Após a conclusão, verifique:

- [ ] Pós-condição 1
- [ ] Pós-condição 2
- [ ] Pós-condição 3

---

## Assinatura

| Papel | Nome | Data | Assinatura |
|------|------|------|-----------|
| Criador | | | |
| Revisor | | | |
| Aprovador | | | |

---

## Uso

```bash
# Use este checklist com:
*checklist {{COMPONENTNAME}}

# Ou referencie em tasks:
checklist: {{COMPONENTNAME}}.md
```

---

*Checklist criado por squad-creator*
