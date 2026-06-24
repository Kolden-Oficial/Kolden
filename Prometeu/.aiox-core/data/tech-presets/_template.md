# Tech Preset Template

> Use este template para criar novos presets de arquitetura por tecnologia.

---

## Metadata

```yaml
preset:
  id: technology-name
  name: 'Technology Name Preset'
  version: 1.0.0
  description: 'Brief description of when to use this preset'
  technologies:
    - tech1
    - tech2
  suitable_for:
    - 'Type of project 1'
    - 'Type of project 2'
  not_suitable_for:
    - 'Type of project to avoid'
```

---

## Design Patterns

> Liste os design patterns recomendados para esta tecnologia, com score de execução e anti-bug.

### Pattern 1: [Nome do Pattern]

**Propósito:** [Descrição do propósito]

**Execution Score:** X/10 | **Anti-Bug Score:** X/10

```[language]
// Exemplo de código do pattern
```

**Bugs Eliminados:**

- [ ] Tipo de bug 1
- [ ] Tipo de bug 2

**Por Que Funciona:**

- Razão 1
- Razão 2

---

## Estrutura do Projeto

> Defina a estrutura de pastas recomendada para projetos usando esta tecnologia.

```
/project-root
  /src
    /[folder1]        # Description
    /[folder2]        # Description
  /tests              # Descrição
  /config             # Descrição
```

### Justificativa da Estrutura

- **[folder1]:** Explicação
- **[folder2]:** Explicação

---

## Tech Stack

> Liste as tecnologias e bibliotecas recomendadas.

| Categoria        | Tecnologia | Versão  | Propósito |
| ---------------- | ---------- | ------- | --------- |
| Framework        | [name]     | ^X.X.X  | [purpose] |
| State Management | [name]     | ^X.X.X  | [purpose] |
| Testing          | [name]     | ^X.X.X  | [purpose] |
| Styling          | [name]     | ^X.X.X  | [purpose] |

### Dependências Necessárias

```bash
# Dependências principais
npm install [packages]

# Dependências de desenvolvimento
npm install -D [packages]
```

---

## Padrões de Código

> Defina os padrões de código específicos para esta tecnologia.

### Convenções de Nomenclatura

| Elemento   | Convenção    | Exemplo       |
| ---------- | ------------ | ------------- |
| Files      | [convention] | `example.ts`  |
| Components | [convention] | `MyComponent` |
| Functions  | [convention] | `myFunction`  |
| Constants  | [convention] | `MY_CONSTANT` |

### Regras Críticas

1. **Regra 1:** Descrição
2. **Regra 2:** Descrição
3. **Regra 3:** Descrição

### Exemplos de Código

#### Bom Exemplo

```[language]
// Exemplo de código bom
```

#### Mau Exemplo

```[language]
// Exemplo de código ruim - evite isto
```

---

## Estratégia de Testes

> Defina a estratégia de testes para esta tecnologia.

### Pirâmide de Testes

```
         /\
        /E2E\           X% - [description]
       /------\
      /Integration\     X% - [description]
     /------------\
    /  Unit Tests  \    X% - [description]
   /----------------\
```

### O Que Testar

#### Sempre Testar (Crítico)

- [ ] Item 1
- [ ] Item 2

#### Considerar Testar

- [ ] Item 1
- [ ] Item 2

#### Nunca Testar

- [ ] Item 1
- [ ] Item 2

### Template de Arquivo de Teste

```[language]
// Template de arquivo de teste
describe('[Component/Service]', () => {
  it('should [expected behavior]', () => {
    // Arrange
    // Act
    // Assert
  })
})
```

---

## Templates de Arquivo

> Forneça templates de arquivos comuns para esta tecnologia.

### Template 1: [Nome]

```[language]
// Conteúdo do template
```

### Template 2: [Nome]

```[language]
// Conteúdo do template
```

---

## Tratamento de Erros

> Defina padrões de tratamento de erros.

### Padrão de Tratamento de Erros

```[language]
// Exemplo de tratamento de erros
```

### Erros Comuns e Soluções

| Erro      | Causa   | Solução    |
| --------- | ------- | ---------- |
| [Error 1] | [Cause] | [Solution] |
| [Error 2] | [Cause] | [Solution] |

---

## Diretrizes de Performance

> Diretrizes de performance específicas para esta tecnologia.

### Recomendado (Do's)

- [ ] Otimização 1
- [ ] Otimização 2

### Evitar (Don'ts)

- [ ] Anti-padrão 1
- [ ] Anti-padrão 2

---

## Integração com o AIOX

> Como este preset se integra com o workflow AIOX.

### Workflow Recomendado

1. **Fase de Planejamento:** Use `@architect` com este preset
2. **Fase de Desenvolvimento:** Use `@dev` seguindo estes padrões
3. **Fase de QA:** Use `@qa` com a estratégia de testes definida

### Templates AIOX Relacionados

- `architecture-tmpl.yaml` - Use para docs de arquitetura
- `front-end-architecture-tmpl.yaml` - Use para detalhes de frontend

---

## Changelog

| Data       | Versão  | Mudanças        |
| ---------- | ------- | --------------- |
| YYYY-MM-DD | 1.0.0   | Versão inicial  |

---

_AIOX Tech Preset - Created with Synkra AIOX Framework_
