---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Projetar Hooks Personalizados

**Task ID:** CCM-PI-006
**Version:** 1.0.0
**Command:** `*hook-designer`
**Agent:** Conduit (project-integrator)
**Purpose:** Projetar hooks personalizados do Claude Code para um projeto identificando necessidades de automação, escolhendo os tipos e eventos de hook apropriados, projetando a lógica do hook e produzindo especificações prontas para implementação.

---

## Visão Geral

```
  Necessidades de Automação
       |
       v
  +---------------------+
  | 1. Identificar       |
  |    Necessidades de   |
  |    Hook              |
  +---------------------+
       |
       v
  +---------------------+
  | 2. Escolher Tipo &   |
  |    Categoria do Hook |
  +---------------------+
       |
       v
  +---------------------+
  | 3. Selecionar        |
  |    Eventos           |
  +---------------------+
       |
       v
  +---------------------+
  | 4. Projetar Lógica   |
  |    do Hook           |
  +---------------------+
       |
       v
  +---------------------+
  | 5. Implementar &     |
  |    Testar            |
  +---------------------+
       |
       v
  +---------------------+
  | 6. Verificação de    |
  |    Integração        |
  +---------------------+
```

---

## Entradas

| Field | Type | Source | Required | Validation |
|-------|------|--------|----------|------------|
| hook_purpose | string | Usuário | Sim | Descrição do que o hook deve automatizar |
| trigger_event | string | Usuário | Não | Evento específico, se conhecido (ex.: "PreToolUse", "Stop") |
| project_path | string | Usuário ou cwd | Sim | Diretório do projeto para contexto |

---

## Pré-condições

- Claude Code instalado e funcional
- Compreensão do fluxo de trabalho e dos pontos de dor do projeto
- Diretório `.claude/` existe (ou será criado)

---

## Fases de Execução

### Fase 1: Identificar Necessidades de Hook

Analise a automação solicitada em relação às capacidades dos hooks:

1. **Categorize a necessidade**:
   - Segurança: bloquear comandos perigosos, validar entradas
   - Automação: auto-formatação, auto-logging, gerenciamento de estado
   - Qualidade: linting ao salvar, teste ao fazer commit, revisão ao concluir
   - Observabilidade: medição de tempo, rastreamento de tokens, monitoramento de custos
   - Gerenciamento de contexto: compactação, atualizações de memória, persistência de estado

2. **Valide a adequação ao hook**: algumas necessidades são melhor atendidas por:
   - Skills/commands (disparados pelo usuário, não por evento)
   - Regras (instruções estáticas, não lógica em tempo de execução)
   - CI/CD (pós-merge, não durante a sessão)

Se a necessidade não for adequada a um hook, recomende a alternativa apropriada.

### Fase 2: Escolher Tipo e Categoria do Hook

Os hooks do Claude Code operam em dois modos de transporte:

| Transport | Language | Best For | Constraint |
|-----------|----------|----------|------------|
| command | Qualquer (bash, node, python) | Operações de arquivo, chamadas de API, lógica complexa | Deve finalizar dentro do timeout |
| prompt | N/D (retorna texto) | Injetar contexto na conversa | Saída adicionada ao contexto do assistente |

**Categorias de hook por evento:**

| Event | When Fires | Common Uses |
|-------|-----------|-------------|
| PreToolUse | Antes de qualquer chamada de ferramenta | Bloquear comandos perigosos, validar entradas |
| PostToolUse | Após a ferramenta concluir | Registrar resultados, capturar métricas, disparar ações subsequentes |
| Stop | Sessão termina normalmente | Salvar estado, gerar resumo, atualizar memória |
| SubagentStop | Subagente conclui | Coletar resultados, mesclar saídas |
| PreCompact | Antes da compactação de contexto | Preservar estado crítico |
| Notification | Usuário recebe uma notificação | Roteamento de notificação personalizado |
| UserPromptSubmit | Usuário envia mensagem | Pré-processamento de entrada, roteamento |

Selecione o evento apropriado com base em quando a automação deve disparar.

### Fase 3: Selecionar Eventos Apropriados

Para a necessidade identificada, determine:

1. **Evento primário**: o gatilho principal do hook
2. **Condições de guarda**: quando o hook deve disparar vs. ser ignorado
   - Filtro por nome de ferramenta (para PreToolUse/PostToolUse)
   - Verificações de estado da sessão
   - Correspondência de padrão de arquivo
3. **Timeout**: tempo máximo de execução (padrão 10s para command hooks)
4. **Comportamento em caso de erro**: o que acontece se o hook falhar
   - `continue`: a sessão prossegue (recomendado para hooks não críticos)
   - `stop`: a sessão é interrompida (use apenas para hooks críticos de segurança)

### Fase 4: Projetar Lógica do Hook

Projete a implementação do hook:

1. **Contrato de entrada**: quais dados o hook recebe do Claude Code
   ```json
   {
     "tool_name": "Bash",
     "tool_input": { "command": "rm -rf /tmp/test" },
     "session_id": "abc123"
   }
   ```

2. **Lógica de processamento**: o que o hook faz com a entrada
   - Analisar os dados de entrada
   - Aplicar a lógica de negócio (validação, transformação, logging)
   - Produzir a saída (block/allow, entrada de log, injeção de contexto)

3. **Contrato de saída**: o que o hook retorna
   - Para PreToolUse: `{ "decision": "allow" }` ou `{ "decision": "block", "reason": "..." }`
   - Para prompt hooks: texto puro para injetar na conversa
   - Para command hooks: código de saída 0 (sucesso) ou diferente de zero (falha)

4. **Requisitos de desempenho**:
   - O hook deve concluir dentro do timeout
   - Sem I/O bloqueante sem timeouts
   - Degradação graciosa em caso de falha

5. **Gerenciamento de estado** (se necessário):
   - Onde armazenar o estado (arquivo, variável de ambiente)
   - Formato do estado (JSON, YAML)
   - Considerações sobre concorrência

### Fase 5: Implementar e Testar

Crie a implementação do hook:

1. **Escreva o script do hook** seguindo a lógica projetada
   - Use a linguagem mais adequada à tarefa (Node.js para JSON, Bash para comandos simples)
   - Inclua tratamento de erros e proteção por timeout
   - Adicione comentários inline explicando a lógica

2. **Registre o hook** em settings.json:
   ```json
   {
     "hooks": {
       "{EventName}": [
         {
           "type": "command",
           "command": "node .claude/hooks/{hook-name}.js",
           "timeout": 10000
         }
       ]
     }
   }
   ```

3. **Teste o hook**:
   - Disparo manual com entrada de exemplo
   - Casos extremos: campos ausentes, entrada malformada, simulação de timeout
   - Verifique o código de saída e o formato da saída

### Fase 6: Verificação de Integração

Verifique se o hook funciona dentro da sessão completa do Claude Code:

1. Inicie uma sessão do Claude Code
2. Dispare o evento que aciona o hook
3. Verifique se o hook foi executado (confira logs, saída ou comportamento)
4. Confirme que não há interferência com outros hooks ou com o fluxo de trabalho normal
5. Verifique o desempenho: o hook conclui bem dentro do timeout

---

## Formato de Saída

```markdown
## Especificação de Projeto do Hook

**Purpose:** {hook_purpose}
**Event:** {event_name}
**Type:** {command|prompt}
**Language:** {node|bash|python}

### Projeto

**Trigger:** {quando o hook dispara}
**Guard:** {condições para pular a execução}
**Timeout:** {N}ms

### Contrato de Entrada/Saída

**Input:**
```json
{input_schema}
```

**Output:**
```json
{output_schema}
```

### Implementação

**File:** `.claude/hooks/{hook-name}.js`
**Registration:**
```json
{settings_json_snippet}
```

### Plano de Teste

| Scenario | Input | Expected Output |
|----------|-------|-----------------|
| Caso normal | {input} | {output} |
| Caso extremo | {input} | {output} |
| Caso de erro | {input} | {output} |

### Desempenho

- Tempo de execução esperado: {N}ms
- Timeout configurado: {N}ms
- Modo de falha: {continue|stop}
```

---

## Condições de Veto

- **NUNCA** projete hooks que bloqueiem todo uso de ferramentas sem uma válvula de escape
- **NUNCA** projete hooks que enviem dados a serviços externos sem o consentimento do usuário
- **NUNCA** defina o timeout do hook acima de 30 segundos (causa lentidão na sessão)
- **NUNCA** use o comportamento de erro `stop` para hooks que não sejam de segurança
- **NUNCA** projete hooks que modifiquem código-fonte -- hooks observam e controlam, eles não escrevem código

---

## Critérios de Conclusão

- [ ] Necessidade de hook identificada e validada como adequada a um hook
- [ ] Tipo e evento do hook selecionados com justificativa
- [ ] Contrato de entrada/saída definido
- [ ] Lógica do hook projetada com tratamento de erros
- [ ] Implementação criada e registrada em settings.json
- [ ] Plano de teste documentado com pelo menos 3 cenários
- [ ] Integração verificada em uma sessão real
