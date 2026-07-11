---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/commands/synapse/tasks/_indice|_indice]]"
---

# Sugerir Domain

Analisa uma rule e sugere o domain SYNAPSE ideal para ela.

---

## Propósito

Ajudar os usuários a colocar rules no domain mais apropriado, analisando o conteúdo da rule, comparando-o com as palavras-chave de domains existentes e considerando os propósitos dos domains.

---

## Pré-requisitos

- `.synapse/manifest` existe
- Ao menos um domain existe em `.synapse/`

---

## Parâmetros

| Parâmetro | Obrigatório | Descrição |
|-----------|----------|-------------|
| `rule-text` | Sim | O texto da rule a analisar |

---

## Passos

### Passo 1: Carregar os Domains Existentes

Leia `.synapse/manifest` e construa uma lista de todos os domains com seus:
- Nome e chave do domain
- Palavras-chave RECALL (de `{DOMAIN_KEY}_RECALL`)
- Estado atual (ativo/inativo)
- Contagem de rules (a partir da leitura de cada arquivo de domain)

### Passo 2: Analisar o Conteúdo da Rule

Examine o texto da rule em busca de:
- **Referências a agentes:** menções a `@dev`, `@qa`, `@architect`, etc. -> sugere um domain específico de agente
- **Referências a workflow:** menções a "story", "sprint", "review", "deploy" -> sugere um domain de workflow
- **Palavras-chave técnicas:** "test", "lint", "commit", "branch" -> compare com as palavras-chave RECALL
- **Termos específicos de domain:** "security", "performance", "accessibility" -> compare com os nomes dos domains

### Passo 3: Pontuar os Domains

Para cada domain existente, calcule uma pontuação de relevância:

| Fator | Peso | Pontos | Descrição |
|--------|--------|--------|-------------|
| Correspondência de palavra-chave RECALL | Alto | 3 | O texto da rule contém uma palavra-chave RECALL de um domain |
| Correspondência de palavra do nome do domain | Médio | 2 | O texto da rule contém palavras do nome do domain |
| Correspondência de gatilho de agente | Alto | 3 | A rule menciona um agente que dispara um domain |
| Similaridade com rules existentes | Baixo | 1 | A rule é similar a rules existentes no domain |

Some os pontos para cada domain. A pontuação máxima possível é 9 (arredonde para cima até 10 se todos os fatores corresponderem). Apresente como `{score}/10`.

### Passo 4: Apresentar a Sugestão

Exiba a(s) melhor(es) sugestão(ões):

```
Suggested domain for rule: "{rule-text}"

  1. {domain-name} (score: {score}/10)
     Reason: {justification}
     RECALL keywords: {keywords}
     Current rules: {count}

  2. {domain-name} (score: {score}/10)
     Reason: {justification}

  [NEW] Create new domain "{suggested-name}"
     If no existing domain fits well.
```

### Passo 5: Oferecer Ação Rápida (Opcional)

Após exibir a sugestão, ofereça:

```
Quick actions:
  1. Add rule to {suggested-domain} now
  2. Create new domain and add rule
  3. Cancel (do nothing)
```

Se o usuário selecionar 1: Siga a task add-rule para o domain sugerido.
Se o usuário selecionar 2: Siga a task create-domain e, em seguida, add-rule.
Se o usuário selecionar 3: Saia sem mudanças.

---

## Validação

- [ ] Todos os domains existentes carregados e analisados
- [ ] A sugestão inclui justificativa
- [ ] A pontuação é baseada na correspondência de palavras-chave e na análise do domain
- [ ] As opções de ação rápida funcionam corretamente se selecionadas
- [ ] Trata o caso em que nenhuma boa correspondência existe (sugere um novo domain)

---

## Tratamento de Erros

| Erro | Mensagem |
|-------|---------|
| Nenhum domain existe | `No domains found in manifest. Use "create" to create your first domain.` |
| Texto de rule vazio | `Error: Please provide the rule text to analyze.` |
| Manifest não encontrado | `Error: .synapse/manifest not found. SYNAPSE must be initialized first.` |

---

*Sugerir Domain — SYNAPSE CRUD Command C7*
*Fonte: SYNAPSE-HOOK-SKILL-COMMAND-ANALYSIS.md seção 2.3*
