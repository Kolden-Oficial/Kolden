---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/templates/_indice|_indice]]"
---

# Template de Documentação AIOX

**Versão:** 1.0.0
**Última Atualização:** 2026-01-28
**Status:** Ativo

---

## Visão Geral

Este documento fornece a estrutura de template padrão para a documentação AIOX. Toda a documentação no framework AIOX deve seguir este template para garantir consistência e facilidade de navegação.

---

## Uso

### Criando Nova Documentação

1. Copie este template para o local de destino
2. Substitua as seções de placeholder pelo conteúdo real
3. Remova quaisquer seções que não se apliquem
4. Siga as diretrizes de i18n se estiver criando docs multilíngues

### Variáveis do Template

| Variável      | Descrição              | Exemplo                         |
| ------------- | ---------------------- | ------------------------------- |
| `{{TITLE}}`   | Título do documento    | "Guia de Configuração de Agente"|
| `{{VERSION}}` | Versão do documento    | "1.0.0"                         |
| `{{DATE}}`    | Data da última atualização | "2026-01-28"                |
| `{{STATUS}}`  | Status do documento    | "Active", "Draft", "Deprecated" |

---

## Estrutura do Template

### Template Mínimo

```markdown
# {{TITLE}}

**Version:** {{VERSION}}
**Last Updated:** {{DATE}}
**Status:** {{STATUS}}

---

## Overview

Breve descrição do propósito do documento.

---

## Content

O conteúdo principal vai aqui.

---

_Last Updated: {{DATE}} | AIOX Framework Team_
```

### Template Completo com i18n

```markdown
# {{TITLE}}

> **EN** | [PT](../pt/path/{{FILENAME}}) | [ES](../es/path/{{FILENAME}})

---

**Version:** {{VERSION}}
**Last Updated:** {{DATE}}
**Status:** {{STATUS}}

---

## Table of Contents

- [Overview](#overview)
- [Section 1](#section-1)
- [Section 2](#section-2)
- [Related Documents](#related-documents)

---

## Overview

Breve descrição do que este documento abrange e seu propósito dentro do framework AIOX.

### Key Points

| Aspect            | Description              |
| ----------------- | ------------------------ |
| **Purpose**       | Qual problema isto resolve |
| **Audience**      | Quem deve ler isto       |
| **Prerequisites** | O que os leitores devem saber |

---

## Section 1

### Subsection 1.1

Conteúdo com exemplos de código:

\`\`\`javascript
// Example code
const example = "value";
\`\`\`

### Subsection 1.2

Conteúdo com diagramas:

\`\`\`
┌─────────────────┐
│ Component A │
└────────┬────────┘
│
▼
┌─────────────────┐
│ Component B │
└─────────────────┘
\`\`\`

---

## Section 2

### Tables

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| Value 1  | Value 2  | Value 3  |

### Lists

**Ordered:**

1. First item
2. Second item
3. Third item

**Unordered:**

- Item A
- Item B
- Item C

---

## Related Documents

- [Related Doc 1](./path-to-doc-1.md)
- [Related Doc 2](./path-to-doc-2.md)

---

_Last Updated: {{DATE}} | AIOX Framework Team_
```

---

## Templates de Seção

### Architecture Decision Record (ADR)

```markdown
# ADR-{{NUMBER}}: {{TITLE}}

> **EN** | [PT](../../pt/architecture/adr/{{FILENAME}}) | [ES](../../es/architecture/adr/{{FILENAME}})

---

**Story:** {{STORY_ID}}
**Date:** {{DATE}}
**Status:** {{STATUS}} (Proposed | Accepted | Deprecated | Superseded)
**Author:** @{{AGENT}}

---

## Context

Qual é o problema que estamos observando que motiva esta decisão ou mudança?

---

## Decision

Qual é a mudança que estamos propondo e/ou fazendo?

---

## Consequences

### Positive

- Benefício 1
- Benefício 2

### Negative

- Desvantagem 1
- Desvantagem 2

### Neutral

- Observação 1

---

## Related Documents

- [Related ADR](./related-adr.md)

---

_Decision made as part of {{STORY_ID}}._
```

### Template de Guia

```markdown
# {{TITLE}} Guide

> **EN** | [PT](../pt/guides/{{FILENAME}}) | [ES](../es/guides/{{FILENAME}})

---

**Version:** {{VERSION}}
**Last Updated:** {{DATE}}
**Audience:** {{TARGET_AUDIENCE}}

---

## Prerequisites

Antes de começar, certifique-se de ter:

- [ ] Pré-requisito 1
- [ ] Pré-requisito 2

---

## Quick Start

\`\`\`bash

# Comando de início rápido

aiox command --flag
\`\`\`

---

## Step-by-Step Instructions

### Step 1: {{STEP_TITLE}}

Descrição do passo 1.

\`\`\`bash

# Comando para o passo 1

\`\`\`

### Step 2: {{STEP_TITLE}}

Descrição do passo 2.

---

## Configuration

| Option    | Type    | Default | Description |
| --------- | ------- | ------- | ----------- |
| `option1` | string  | `""`    | Descrição   |
| `option2` | boolean | `false` | Descrição   |

---

## Troubleshooting

### Issue: {{ISSUE_DESCRIPTION}}

**Cause:** Explicação de por que isto acontece.

**Solution:**

\`\`\`bash

# Comando de correção

\`\`\`

---

## Related Guides

- [Related Guide 1](./related-guide-1.md)

---

_Last Updated: {{DATE}} | AIOX Framework Team_
```

### Template de API/Referência

```markdown
# {{COMPONENT}} Reference

> **EN** | [PT](../pt/reference/{{FILENAME}}) | [ES](../es/reference/{{FILENAME}})

---

**Version:** {{VERSION}}
**Module:** {{MODULE_NAME}}

---

## Overview

Breve descrição do componente.

---

## API

### {{METHOD_NAME}}

\`\`\`typescript
function {{METHOD_NAME}}(param1: Type1, param2: Type2): ReturnType
\`\`\`

**Parameters:**

| Parameter | Type    | Required | Description |
| --------- | ------- | -------- | ----------- |
| `param1`  | `Type1` | Yes      | Descrição   |
| `param2`  | `Type2` | No       | Descrição   |

**Returns:** `ReturnType` - Descrição do valor de retorno.

**Example:**

\`\`\`typescript
const result = {{METHOD_NAME}}("value1", { option: true });
\`\`\`

---

## Types

### {{TYPE_NAME}}

\`\`\`typescript
interface {{TYPE_NAME}} {
property1: string;
property2?: number;
}
\`\`\`

| Property    | Type     | Required | Description |
| ----------- | -------- | -------- | ----------- |
| `property1` | `string` | Yes      | Descrição   |
| `property2` | `number` | No       | Descrição   |

---

_Last Updated: {{DATE}} | AIOX Framework Team_
```

---

## Diretrizes de i18n

### Estrutura de Arquivos

```
docs/
├── en/              # Inglês (primário)
│   └── guides/
│       └── example.md
├── pt/              # Português
│   └── guides/
│       └── example.md
└── es/              # Espanhol
    └── guides/
        └── example.md
```

### Cabeçalho de Idioma

Sempre inclua o cabeçalho de navegação de idioma:

```markdown
> **EN** | [PT](../pt/path/file.md) | [ES](../es/path/file.md)
```

### Notas de Tradução

- Mantenha termos técnicos em inglês (API, CLI, etc.)
- Traduza textos de UI e descrições
- Mantenha terminologia consistente entre documentos
- Atualize todas as versões de idioma ao fazer mudanças

---

## Guia de Estilo

### Cabeçalhos

- Use `#` para o título do documento (apenas um por documento)
- Use `##` para seções principais
- Use `###` para subseções
- Use `####` com moderação para aninhamento mais profundo

### Blocos de Código

- Sempre especifique o idioma para realce de sintaxe
- Use `bash` para comandos de shell
- Use `javascript` ou `typescript` para exemplos de código
- Use `yaml` para arquivos de configuração

### Tabelas

- Use tabelas para comparações de dados estruturados
- Mantenha as tabelas simples e legíveis
- Use alinhamento para melhor legibilidade

### Links

- Use caminhos relativos para links internos
- Use texto de link descritivo (não "clique aqui")
- Verifique se todos os links são válidos

---

## Exemplos

### Exemplo 1: Criando um Guia de Agente

```markdown
# Creating Custom Agents

> **EN** | [PT](../pt/guides/creating-agents.md) | [ES](../es/guides/creating-agents.md)

---

**Version:** 1.0.0
**Last Updated:** 2026-01-28
**Audience:** Developers extending AIOX

---

## Overview

Este guia explica como criar agentes customizados para o framework AIOX.

## Prerequisites

- [ ] AIOX Core instalado
- [ ] Compreensão dos conceitos de agente

## Creating an Agent

### Step 1: Define Agent Metadata

Crie um novo arquivo em `.aiox-core/development/agents/`:

\`\`\`yaml
id: custom-agent
name: Custom Agent
persona: Expert in specific domain
\`\`\`

---

_Last Updated: 2026-01-28 | AIOX Framework Team_
```

---

## Documentos Relacionados

- [Documentação do Framework AIOX](/docs/README.md)
- [Guia de Contribuição](/CONTRIBUTING.md)
- [Guia de Estilo](/docs/guides/style-guide.md)

---

_Last Updated: 2026-01-28 | AIOX Framework Team_
