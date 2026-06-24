# Template {{COMPONENTNAME}}

> {{DESCRIPTION}}
> Squad: {{SQUADNAME}}
> Criado: {{CREATEDAT}}
{{#IF STORYID}}
> Story: {{STORYID}}
{{/IF}}

---

## Variáveis do Template

| Variável | Tipo | Obrigatório | Descrição |
|----------|------|----------|-------------|
| `{{VAR1}}` | string | Sim | Descrição da variável 1 |
| `{{VAR2}}` | string | Não | Descrição da variável 2 |
| `{{VAR3}}` | date | Não | Descrição da variável 3 |

---

## Uso

```javascript
const { renderTemplate } = require('.aiox-core/infrastructure/scripts/template-engine');

const result = await renderTemplate('{{COMPONENTNAME}}.md', {
  VAR1: 'value1',
  VAR2: 'value2',
  VAR3: new Date().toISOString(),
});
```

---

## Conteúdo do Template

<!-- BEGIN TEMPLATE -->

# {{VAR1}}

> Criado: {{VAR3}}

## Seção 1

{{VAR2}}

### Subseção 1.1

Conteúdo aqui...

### Subseção 1.2

Conteúdo aqui...

## Seção 2

Conteúdo adicional...

## Seção 3

Conteúdo final...

---

*Gerado a partir do template {{COMPONENTNAME}}*

<!-- END TEMPLATE -->

---

## Exemplos

### Exemplo 1: Uso Básico

```javascript
const result = await renderTemplate('{{COMPONENTNAME}}.md', {
  VAR1: 'My Document',
  VAR2: 'This is the introduction text.',
  VAR3: '2025-01-01',
});
```

### Exemplo 2: Com Condicionais

```javascript
const result = await renderTemplate('{{COMPONENTNAME}}.md', {
  VAR1: 'My Document',
  VAR2: 'Introduction',
  VAR3: new Date().toISOString(),
  INCLUDE_EXTRA: true,
});
```

---

*Template criado por squad-creator*
