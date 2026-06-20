---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Passo 0: Verificação do Registry IDS (Consultivo)

Antes de prosseguir, verifique o Entity Registry por artefatos existentes:

1. Extraia palavras-chave de intenção da solicitação do usuário
2. Execute `FrameworkGovernor.preCheck(intent, 'task')`
3. Se houver correspondência de REUSE (>=90% de relevância):
   - Exiba a correspondência e pergunte ao usuário: "Task existente encontrada. REUSE em vez de criar nova?"
4. Se houver correspondência de ADAPT (60-89%):
   - Exiba o candidato à adaptação: "Task similar existe. ADAPT em vez de criar nova?"
5. Se CREATE (sem correspondência ou o usuário escolher):
   - Registre a decisão com justificativa e prossiga para o Passo 1
6. Se o IDS estiver indisponível (timeout/erro): Avise e prossiga normalmente

**NOTA:** Este passo é consultivo e NÃO bloqueia a criação. O usuário sempre tem a decisão final.

---

## Task Definition (AIOX Task Format V1.0)

```yaml
task: createTask()
responsável: Orion (Commander)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: name
  tipo: string
  origem: Entrada do Usuário
  obrigatório: true
  validação: Deve ser não-vazio, minúsculas, kebab-case

- campo: options
  tipo: object
  origem: Entrada do Usuário
  obrigatório: false
  validação: Objeto JSON válido com chaves permitidas

- campo: force
  tipo: boolean
  origem: Entrada do Usuário
  obrigatório: false
  validação: Padrão: false

**Saída:**
- campo: created_file
  tipo: string
  destino: Sistema de arquivos
  persistido: true

- campo: validation_report
  tipo: object
  destino: Memória
  persistido: false

- campo: success
  tipo: boolean
  destino: Valor de retorno
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar que o alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas
    error_message: "Pré-condição falhou: Alvo ainda não existe; entradas obrigatórias fornecidas; permissões concedidas"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a task ser concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Recurso criado com sucesso; validação aprovada; nenhum erro registrado
    tipo: post-condition
    blocker: true
    validação: |
      Verificar que o recurso foi criado com sucesso; validação aprovada; nenhum erro registrado
    error_message: "Pós-condição falhou: Recurso criado com sucesso; validação aprovada; nenhum erro registrado"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Recurso existe e é válido; nenhum recurso duplicado criado
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Afirmar que o recurso existe e é válido; nenhum recurso duplicado criado
    error_message: "Critério de aceite não atendido: Recurso existe e é válido; nenhum recurso duplicado criado"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Fonte:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Fonte:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componentes
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** abort

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** Arquivo/recurso alvo já existe no sistema
   - **Resolução:** Use a flag force ou escolha um nome diferente
   - **Recuperação:** Solicitar ao usuário um nome alternativo ou forçar sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** Nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Validar a entrada contra as regras de nomenclatura (kebab-case, minúsculas, sem caracteres especiais)
   - **Recuperação:** Sanitizar a entrada ou rejeitar com mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verificar permissões do sistema de arquivos, executar com privilégios elevados se necessário
   - **Recuperação:** Registrar o erro, notificar o usuário, sugerir correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de Otimização:**
- Validar a configuração cedo; usar escritas atômicas; implementar checkpoints de rollback

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - creation
  - setup
updated_at: 2025-11-17
```

---

tools:
  - github-cli
# TODO: Create task-validation-checklist.md for validation (follow-up story needed)
# checklists:
#   - task-validation-checklist.md
---

# Criar Task

## Propósito
Criar um novo arquivo de task que define workflows executáveis para agentes, com estrutura adequada, passos de elicitação e validação.

## Pré-requisitos
- Autorização do usuário verificada
- Propósito da task claramente definido
- Compreensão dos requisitos do workflow da task

## Processo de Elicitação Interativa

### Passo 1: Definição da Task
```
ELICIT: Informações Básicas da Task

1. Qual(is) agente(s) usará(ão) esta task?
   Exemplos: "ux-design-expert", "db-sage", "dev", "pm, po, sm" (múltiplos)

   → Se agente ÚNICO: A task é específica de agente (aplicará a convenção de nomenclatura)
   → Se MÚLTIPLOS agentes: A task é compartilhada (sem prefixo)

2. Qual é o nome da task?

   SE específica de agente (agente único):
     → Formato sugerido: "{agent-id}-{action}"
     → Exemplos: "ux-user-research", "db-apply-migration", "dev-develop-story"
     → Validação: Deve começar com "{agent-id}-"

   SE compartilhada (múltiplos agentes):
     → Use um nome descritivo SEM prefixo de agente
     → Exemplos: "create-doc", "execute-checklist", "manage-story-backlog"
     → Validação: NÃO deve ter prefixo específico de agente

3. Qual é o propósito primário desta task?

4. Quais são os pré-requisitos para executar esta task?
```

**CONVENÇÃO DE NOMENCLATURA (CRÍTICO):**
- Tasks específicas de agente: `{agent-id}-{task-name}.md`
- Tasks compartilhadas: `{task-name}.md` (sem prefixo)
- Use component-generator.applyNamingConvention() para aplicar automaticamente

### Passo 2: Workflow da Task
```
ELICIT: Passos do Workflow da Task
1. Esta task requer interação do usuário? (sim/não)
2. Quais são os principais passos desta task? (lista numerada)
3. Quais entradas a task precisa?
4. Quais saídas a task produz?
5. Há pontos de decisão que exigem entrada do usuário?
```

### Passo 3: Requisitos de Elicitação
```
ELICIT: Elementos Interativos (se aplicável)
1. Quais informações precisam ser coletadas dos usuários?
2. Como os prompts devem ser estruturados?
3. Que validação é necessária para as entradas do usuário?
4. Há valores padrão ou sugestões?
```

### Passo 4: Dependências e Integração
```
ELICIT: Dependências da Task
1. Esta task depende de outras tasks?
2. Quais templates ela usa (se houver)?
3. Ela precisa de acesso à camada de memória?
4. Quais arquivos/recursos ela precisa acessar?
```

## Passos de Implementação

1. **Validar Nome da Task**
   - Verificar se o nome ainda não existe
   - Validar o formato (minúsculas, hífens)
   - Garantir nomenclatura descritiva e clara

2. **Estruturar o Conteúdo da Task**
   ```markdown
   # {Task Title}
   
   ## Propósito
   {Clear description of what the task accomplishes}
   
   ## Pré-requisitos
   {List of requirements before task execution}
   
   ## Processo de Elicitação Interativa
   {If elicit=true, define all prompts and user interactions}
   
   ## Passos de Implementação
   {Numbered steps for task execution}
   
   ## Checklist de Validação
   {Checklist items to verify task completion}
   
   ## Tratamento de Erros
   {How to handle common errors}
   
   ## Saída de Sucesso
   {What user sees on successful completion}
   ```

3. **Adicionar Considerações de Segurança**
   - Regras de validação de entrada
   - Restrições de acesso a arquivos
   - Execução segura de comandos
   - Sanitização de saída

4. **Criar o Arquivo da Task**
   - Gerar o caminho: `.aiox-core/tasks/{task-name}.md`
   - Escrever a definição da task formatada
   - Garantir a estrutura markdown adequada

5. **Atualizar a Camada de Memória**
   ```javascript
   await memoryClient.addMemory({
     type: 'task_created',
     name: taskName,
     path: taskPath,
     creator: currentUser,
     timestamp: new Date().toISOString(),
     metadata: {
       purpose: taskPurpose,
       agents: associatedAgents,
       interactive: hasElicitation
     }
   });
   ```

6. **Gerar Exemplos de Uso**
   - Mostrar como referenciar nos arquivos de agente
   - Fornecer exemplos de comando
   - Documentar as saídas esperadas

## Checklist de Validação
- [ ] Nome da task é único e válido
- [ ] Propósito claramente declarado
- [ ] Passos numerados e claros
- [ ] Prompts de elicitação bem definidos
- [ ] Tratamento de erros incluído
- [ ] Critérios de sucesso definidos
- [ ] Camada de memória atualizada

## Tratamento de Erros
- Se a task existe: Ofereça atualizar ou criar uma variante
- Se a validação falha: Mostre os problemas específicos
- Se faltam dependências: Liste os arquivos necessários
- Se a escrita falha: Verifique as permissões

## Saída de Sucesso
```
✅ Task '{task-name}' criada com sucesso!
📁 Localização: .aiox-core/tasks/{task-name}.md
📝 Exemplo de integração:
   dependencies:
     tasks:
       - {task-name}.md
🔗 Agentes usando esta task: {agent-list}
``` 