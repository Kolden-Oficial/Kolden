# Checklist de Autocrítica

## Propósito

Este checklist permite que o Developer Agent realize autocrítica obrigatória em dois pontos críticos durante a execução de subtasks:

- **Passo 5.5**: Após escrever código, antes de rodar testes
- **Passo 6.5**: Após os testes passarem, antes de marcar a subtask como concluída

Todos os itens devem passar para continuar. Os resultados são salvos em `plan/self-critique-{subtask-id}.json`.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO - VALIDAÇÃO DE AUTOCRÍTICA

Este checklist é OBRIGATÓRIO para o executor de subtasks. A autocrítica não é opcional.

ABORDAGEM DE EXECUÇÃO:

1. No Passo 5.5 (após escrever código):
   - PARE e complete o checklist do Passo 5.5
   - Você DEVE identificar pelo menos 3 bugs potenciais
   - Você DEVE considerar pelo menos 3 casos extremos (edge cases)
   - Todos os itens devem passar antes de prosseguir para os testes

2. No Passo 6.5 (após os testes passarem):
   - PARE e complete o checklist do Passo 6.5
   - Verifique a qualidade do código e os padrões do projeto
   - Todos os itens devem passar antes de marcar como concluída

FORMATO DE SAÍDA:
Gere um relatório JSON com o schema mostrado ao final deste checklist.
Salve em: plan/self-critique-{subtask-id}.json

FLAG DE PULAR (SKIP):
Pode ser ignorado com a flag --skip-critique, mas um AVISO deve ser registrado:
"WARNING: Self-critique skipped via --skip-critique. Quality risks may exist."

O objetivo é capturar problemas ANTES que cheguem à revisão, não marcar caixinhas.]]

---

## Passo 5.5: Autocrítica Pós-Código

Execute este checklist DEPOIS de escrever código, ANTES de rodar testes.

[[LLM: INSTRUÇÕES DO PASSO 5.5

Para cada item, você deve fornecer exemplos ESPECÍFICOS, não afirmações genéricas.

BUGS PREVISTOS:

- Pense como um hacker: "Como isto poderia quebrar?"
- Considere null/undefined, condições de corrida, erros de off-by-one
- Quais suposições estou fazendo que poderiam estar erradas?

CASOS EXTREMOS (EDGE CASES):

- O que acontece nos limites? (arrays vazios, valores máximos, caracteres especiais)
- Quais entradas eu não considerei?
- O que acontece se as dependências falharem?

Seja honesto. Encontrar bugs AGORA economiza tempo de depuração DEPOIS.]]

### 5.5.1 Bugs Previstos (mínimo 3)

- [ ] Bug potencial #1 identificado: ********\_\_\_\_********
- [ ] Bug potencial #2 identificado: ********\_\_\_\_********
- [ ] Bug potencial #3 identificado: ********\_\_\_\_********
- [ ] (Opcional) Bugs adicionais identificados

[[LLM: Liste bugs específicos, não preocupações vagas. Exemplo:

- "Condição de corrida se dois usuários atualizarem o mesmo registro simultaneamente"
- "Null pointer se user.profile for undefined"
- "Índice de array fora dos limites quando items está vazio"]]

### 5.5.2 Casos Extremos (mínimo 3)

- [ ] Caso extremo #1 considerado: ********\_\_\_\_********
- [ ] Caso extremo #2 considerado: ********\_\_\_\_********
- [ ] Caso extremo #3 considerado: ********\_\_\_\_********
- [ ] (Opcional) Casos extremos adicionais considerados

[[LLM: Liste casos extremos específicos com o comportamento esperado. Exemplo:

- "Array de entrada vazio deve retornar resultado vazio, não erro"
- "Caracteres Unicode no nome de usuário devem ser tratados"
- "Tamanho máximo de arquivo (10MB) deve exibir erro amigável ao usuário"]]

### 5.5.3 Tratamento de Erros

- [ ] Todas as operações assíncronas têm try/catch ou error boundaries
- [ ] Erros são registrados com contexto suficiente para depuração
- [ ] Erros expostos ao usuário são amigáveis e acionáveis
- [ ] Operações que falham não deixam o sistema em estado inconsistente
- [ ] Falhas de rede/API são tratadas com elegância, com retry ou fallback

### 5.5.4 Revisão de Segurança

- [ ] Nenhum segredo, chave de API ou credencial hardcoded
- [ ] Entrada do usuário é validada e sanitizada
- [ ] Nenhuma vulnerabilidade de SQL injection ou XSS introduzida
- [ ] Dados sensíveis não são registrados nem expostos em erros
- [ ] Verificações de autenticação/autorização estão presentes onde necessário

---

## Passo 6.5: Autocrítica Pós-Teste

Execute este checklist DEPOIS de os testes passarem, ANTES de marcar a subtask como concluída.

[[LLM: INSTRUÇÕES DO PASSO 6.5

Este é o seu gate de qualidade final. Seja minucioso.

ADERÊNCIA A PADRÕES:

- O código parece pertencer a este codebase?
- Outro desenvolvedor o entenderia sem fazer perguntas?

SEM VALORES HARDCODED:

- Procure por números mágicos, strings hardcoded, URLs inline
- Tudo que é configurável deveria estar em config

TESTES:

- Você adicionou testes para o novo código?
- Os casos extremos de 5.5.2 estão cobertos por testes?

DOCUMENTAÇÃO:

- Se a API mudou, está documentado?
- Se o comportamento mudou, está anotado em algum lugar?]]

### 6.5.1 Aderência a Padrões

- [ ] Código segue os padrões e convenções existentes do projeto
- [ ] Estrutura de arquivos corresponde à organização do projeto
- [ ] Convenções de nomenclatura são consistentes com o codebase
- [ ] Padrões de import/export correspondem ao código existente
- [ ] Estilo de tratamento de erros corresponde aos padrões do projeto

### 6.5.2 Sem Valores Hardcoded

- [ ] Nenhum número mágico (use constantes ou config)
- [ ] Nenhuma URL ou endpoint hardcoded (use environment/config)
- [ ] Nenhum timeout ou limite hardcoded (use config)
- [ ] Nenhuma feature flag inline (use um sistema apropriado de feature flags)
- [ ] Valores configuráveis estão documentados

### 6.5.3 Testes Adicionados

- [ ] Testes unitários adicionados para novas funções/métodos
- [ ] Casos extremos do Passo 5.5.2 estão cobertos por testes
- [ ] Cenários de erro têm cobertura de testes
- [ ] Testes são determinísticos (sem falhas aleatórias)
- [ ] Nomes dos testes descrevem claramente o que está sendo testado

### 6.5.4 Documentação Atualizada

- [ ] JSDoc/TSDoc adicionado para funções públicas (se aplicável)
- [ ] README atualizado se a configuração/uso mudou
- [ ] Documentação da API atualizada se os endpoints mudaram
- [ ] Comentários inline explicam lógica complexa
- [ ] Entrada no CHANGELOG adicionada se for uma mudança visível ao usuário

### 6.5.5 Verificação de Limpeza

- [ ] Nenhuma instrução console.log deixada no código
- [ ] Nenhum bloco de código comentado
- [ ] Nenhum comentário TODO sem ticket de rastreamento
- [ ] Nenhum artefato de depuração (instruções debugger, dados de teste)
- [ ] Nenhum import ou variável não utilizado

---

## Determinação do Veredito

[[LLM: LÓGICA DO VEREDITO

PASSED: Todos os itens do checklist estão marcados como [x] ou [N/A] com justificativa
FAILED: Qualquer item obrigatório está [ ] sem justificativa válida

Se FAILED:

1. Liste todos os itens que falharam
2. NÃO prossiga para o próximo passo
3. Corrija os problemas e rode a autocrítica novamente

Use [N/A] apenas quando genuinamente não aplicável (ex.: "Documentação da API atualizada" quando nenhuma mudança na API foi feita). Justifique cada [N/A].]]

---

## Schema de Saída JSON

```json
{
  "subtaskId": "1.1",
  "critiquedAt": "2026-01-28T10:00:00Z",
  "step5_5": {
    "predictedBugs": ["bug1", "bug2", "bug3"],
    "edgeCases": ["edge1", "edge2", "edge3"],
    "errorHandling": true,
    "securityCheck": true,
    "passed": true
  },
  "step6_5": {
    "followsPatterns": true,
    "noHardcoded": true,
    "testsAdded": true,
    "docsUpdated": true,
    "noConsoleLogs": true,
    "passed": true
  },
  "overallVerdict": "PASSED",
  "skipped": false,
  "skipWarning": null
}
```

### Descrições dos Campos

| Campo                     | Tipo                 | Descrição                                |
| ------------------------- | -------------------- | ---------------------------------------- |
| `subtaskId`               | string               | O ID da subtask (ex.: "1.1", "2.3")      |
| `critiquedAt`             | ISO 8601             | Timestamp de quando a crítica foi feita  |
| `step5_5.predictedBugs`   | string[]             | Lista de pelo menos 3 bugs previstos     |
| `step5_5.edgeCases`       | string[]             | Lista de pelo menos 3 casos extremos     |
| `step5_5.errorHandling`   | boolean              | Todos os itens de tratamento de erro passaram |
| `step5_5.securityCheck`   | boolean              | Todos os itens de segurança passaram     |
| `step5_5.passed`          | boolean              | Passo 5.5 passou no geral                |
| `step6_5.followsPatterns` | boolean              | Código segue os padrões do projeto       |
| `step6_5.noHardcoded`     | boolean              | Nenhum valor hardcoded encontrado        |
| `step6_5.testsAdded`      | boolean              | Testes adicionados para o novo código    |
| `step6_5.docsUpdated`     | boolean              | Documentação atualizada se necessário    |
| `step6_5.noConsoleLogs`   | boolean              | Sem console.logs ou artefatos de depuração |
| `step6_5.passed`          | boolean              | Passo 6.5 passou no geral                |
| `overallVerdict`          | "PASSED" \| "FAILED" | Veredito final                           |
| `skipped`                 | boolean              | Se a crítica foi pulada                  |
| `skipWarning`             | string \| null       | Mensagem de aviso se pulada              |

---

## Integração com o Executor de Subtasks

O executor de subtasks DEVE:

1. **Chamar o Passo 5.5** após o código ser escrito, antes do `npm test`
2. **Bloquear em caso de falha** - não prossiga se o Passo 5.5 falhar
3. **Chamar o Passo 6.5** após os testes passarem, antes de marcar como concluída
4. **Bloquear em caso de falha** - não marque como concluída se o Passo 6.5 falhar
5. **Salvar a saída JSON** em `plan/self-critique-{subtask-id}.json`
6. **Respeitar a flag --skip-critique** mas registrar o aviso

### Comportamento da Flag de Pular

Quando `--skip-critique` é passado:

```json
{
  "subtaskId": "1.1",
  "critiquedAt": "2026-01-28T10:00:00Z",
  "step5_5": { "passed": null },
  "step6_5": { "passed": null },
  "overallVerdict": "SKIPPED",
  "skipped": true,
  "skipWarning": "WARNING: Self-critique skipped via --skip-critique. Quality risks may exist."
}
```

---

_Checklist de Autocrítica v1.0 - Synkra AIOX Development Framework_
