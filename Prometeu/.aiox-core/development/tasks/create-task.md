---

## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com logging
- InteraÃ§Ã£o mÃ­nima com o usuÃ¡rio
- **Melhor para:** Tarefas simples e determinÃ­sticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints de decisÃ£o explÃ­citos
- ExplicaÃ§Ãµes educativas
- **Melhor para:** Aprendizado, decisÃµes complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de anÃ¡lise da task (identificar todas as ambiguidades)
- ExecuÃ§Ã£o sem ambiguidade
- **Melhor para:** Requisitos ambÃ­guos, trabalho crÃ­tico

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Passo 0: VerificaÃ§Ã£o do Registry IDS (Consultivo)

Antes de prosseguir, verifique o Entity Registry por artefatos existentes:

1. Extraia palavras-chave de intenÃ§Ã£o da solicitaÃ§Ã£o do usuÃ¡rio
2. Execute `FrameworkGovernor.preCheck(intent, 'task')`
3. Se houver correspondÃªncia de REUSE (>=90% de relevÃ¢ncia):
   - Exiba a correspondÃªncia e pergunte ao usuÃ¡rio: "Task existente encontrada. REUSE em vez de criar nova?"
4. Se houver correspondÃªncia de ADAPT (60-89%):
   - Exiba o candidato Ã  adaptaÃ§Ã£o: "Task similar existe. ADAPT em vez de criar nova?"
5. Se CREATE (sem correspondÃªncia ou o usuÃ¡rio escolher):
   - Registre a decisÃ£o com justificativa e prossiga para o Passo 1
6. Se o IDS estiver indisponÃ­vel (timeout/erro): Avise e prossiga normalmente

**NOTA:** Este passo Ã© consultivo e NÃƒO bloqueia a criaÃ§Ã£o. O usuÃ¡rio sempre tem a decisÃ£o final.

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: createTask()
responsÃ¡vel: Orion (Commander)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: name
  tipo: string
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: true
  validaÃ§Ã£o: Deve ser nÃ£o-vazio, minÃºsculas, kebab-case

- campo: options
  tipo: object
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: false
  validaÃ§Ã£o: Objeto JSON vÃ¡lido com chaves permitidas

- campo: force
  tipo: boolean
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: false
  validaÃ§Ã£o: PadrÃ£o: false

**SaÃ­da:**
- campo: created_file
  tipo: string
  destino: Sistema de arquivos
  persistido: true

- campo: validation_report
  tipo: object
  destino: MemÃ³ria
  persistido: false

- campo: success
  tipo: boolean
  destino: Valor de retorno
  persistido: false
```

---

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar prÃ©-requisitos ANTES da execuÃ§Ã£o da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Alvo ainda nÃ£o existe; entradas obrigatÃ³rias fornecidas; permissÃµes concedidas
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar que o alvo ainda nÃ£o existe; entradas obrigatÃ³rias fornecidas; permissÃµes concedidas
    error_message: "PrÃ©-condiÃ§Ã£o falhou: Alvo ainda nÃ£o existe; entradas obrigatÃ³rias fornecidas; permissÃµes concedidas"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o APÃ“S a task ser concluÃ­da

**Checklist:**

```yaml
post-conditions:
  - [ ] Recurso criado com sucesso; validaÃ§Ã£o aprovada; nenhum erro registrado
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar que o recurso foi criado com sucesso; validaÃ§Ã£o aprovada; nenhum erro registrado
    error_message: "PÃ³s-condiÃ§Ã£o falhou: Recurso criado com sucesso; validaÃ§Ã£o aprovada; nenhum erro registrado"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de aprovaÃ§Ã£o/reprovaÃ§Ã£o para conclusÃ£o da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Recurso existe e Ã© vÃ¡lido; nenhum recurso duplicado criado
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Afirmar que o recurso existe e Ã© vÃ¡lido; nenhum recurso duplicado criado
    error_message: "CritÃ©rio de aceite nÃ£o atendido: Recurso existe e Ã© vÃ¡lido; nenhum recurso duplicado criado"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **PropÃ³sito:** Gerar novos componentes a partir de templates
  - **Fonte:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **PropÃ³sito:** CriaÃ§Ã£o e validaÃ§Ã£o de arquivos
  - **Fonte:** MÃ³dulo fs do Node.js

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta task:**

- **Script:** create-component.js
  - **PropÃ³sito:** Workflow de criaÃ§Ã£o de componentes
  - **Linguagem:** JavaScript
  - **LocalizaÃ§Ã£o:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**EstratÃ©gia:** abort

**Erros Comuns:**

1. **Erro:** Recurso JÃ¡ Existe
   - **Causa:** Arquivo/recurso alvo jÃ¡ existe no sistema
   - **ResoluÃ§Ã£o:** Use a flag force ou escolha um nome diferente
   - **RecuperaÃ§Ã£o:** Solicitar ao usuÃ¡rio um nome alternativo ou forÃ§ar sobrescrita

2. **Erro:** Entrada InvÃ¡lida
   - **Causa:** Nome de entrada contÃ©m caracteres ou formato invÃ¡lidos
   - **ResoluÃ§Ã£o:** Validar a entrada contra as regras de nomenclatura (kebab-case, minÃºsculas, sem caracteres especiais)
   - **RecuperaÃ§Ã£o:** Sanitizar a entrada ou rejeitar com mensagem de erro clara

3. **Erro:** PermissÃ£o Negada
   - **Causa:** PermissÃµes insuficientes para criar o recurso
   - **ResoluÃ§Ã£o:** Verificar permissÃµes do sistema de arquivos, executar com privilÃ©gios elevados se necessÃ¡rio
   - **RecuperaÃ§Ã£o:** Registrar o erro, notificar o usuÃ¡rio, sugerir correÃ§Ã£o de permissÃ£o

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- Validar a configuraÃ§Ã£o cedo; usar escritas atÃ´micas; implementar checkpoints de rollback

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

## PropÃ³sito
Criar um novo arquivo de task que define workflows executÃ¡veis para agentes, com estrutura adequada, passos de elicitaÃ§Ã£o e validaÃ§Ã£o.

## PrÃ©-requisitos
- AutorizaÃ§Ã£o do usuÃ¡rio verificada
- PropÃ³sito da task claramente definido
- CompreensÃ£o dos requisitos do workflow da task

## Processo de ElicitaÃ§Ã£o Interativa

### Passo 1: DefiniÃ§Ã£o da Task
```
ELICIT: InformaÃ§Ãµes BÃ¡sicas da Task

1. Qual(is) agente(s) usarÃ¡(Ã£o) esta task?
   Exemplos: "ux-design-expert", "db-sage", "dev", "pm, po, sm" (mÃºltiplos)

   â†’ Se agente ÃšNICO: A task Ã© especÃ­fica de agente (aplicarÃ¡ a convenÃ§Ã£o de nomenclatura)
   â†’ Se MÃšLTIPLOS agentes: A task Ã© compartilhada (sem prefixo)

2. Qual Ã© o nome da task?

   SE especÃ­fica de agente (agente Ãºnico):
     â†’ Formato sugerido: "{agent-id}-{action}"
     â†’ Exemplos: "ux-user-research", "db-apply-migration", "dev-develop-story"
     â†’ ValidaÃ§Ã£o: Deve comeÃ§ar com "{agent-id}-"

   SE compartilhada (mÃºltiplos agentes):
     â†’ Use um nome descritivo SEM prefixo de agente
     â†’ Exemplos: "create-doc", "execute-checklist", "manage-story-backlog"
     â†’ ValidaÃ§Ã£o: NÃƒO deve ter prefixo especÃ­fico de agente

3. Qual Ã© o propÃ³sito primÃ¡rio desta task?

4. Quais sÃ£o os prÃ©-requisitos para executar esta task?
```

**CONVENÃ‡ÃƒO DE NOMENCLATURA (CRÃTICO):**
- Tasks especÃ­ficas de agente: `{agent-id}-{task-name}.md`
- Tasks compartilhadas: `{task-name}.md` (sem prefixo)
- Use component-generator.applyNamingConvention() para aplicar automaticamente

### Passo 2: Workflow da Task
```
ELICIT: Passos do Workflow da Task
1. Esta task requer interaÃ§Ã£o do usuÃ¡rio? (sim/nÃ£o)
2. Quais sÃ£o os principais passos desta task? (lista numerada)
3. Quais entradas a task precisa?
4. Quais saÃ­das a task produz?
5. HÃ¡ pontos de decisÃ£o que exigem entrada do usuÃ¡rio?
```

### Passo 3: Requisitos de ElicitaÃ§Ã£o
```
ELICIT: Elementos Interativos (se aplicÃ¡vel)
1. Quais informaÃ§Ãµes precisam ser coletadas dos usuÃ¡rios?
2. Como os prompts devem ser estruturados?
3. Que validaÃ§Ã£o Ã© necessÃ¡ria para as entradas do usuÃ¡rio?
4. HÃ¡ valores padrÃ£o ou sugestÃµes?
```

### Passo 4: DependÃªncias e IntegraÃ§Ã£o
```
ELICIT: DependÃªncias da Task
1. Esta task depende de outras tasks?
2. Quais templates ela usa (se houver)?
3. Ela precisa de acesso Ã  camada de memÃ³ria?
4. Quais arquivos/recursos ela precisa acessar?
```

## Passos de ImplementaÃ§Ã£o

1. **Validar Nome da Task**
   - Verificar se o nome ainda nÃ£o existe
   - Validar o formato (minÃºsculas, hÃ­fens)
   - Garantir nomenclatura descritiva e clara

2. **Estruturar o ConteÃºdo da Task**
   ```markdown
   # {Task Title}
   
   ## PropÃ³sito
   {Clear description of what the task accomplishes}
   
   ## PrÃ©-requisitos
   {List of requirements before task execution}
   
   ## Processo de ElicitaÃ§Ã£o Interativa
   {If elicit=true, define all prompts and user interactions}
   
   ## Passos de ImplementaÃ§Ã£o
   {Numbered steps for task execution}
   
   ## Checklist de ValidaÃ§Ã£o
   {Checklist items to verify task completion}
   
   ## Tratamento de Erros
   {How to handle common errors}
   
   ## SaÃ­da de Sucesso
   {What user sees on successful completion}
   ```

3. **Adicionar ConsideraÃ§Ãµes de SeguranÃ§a**
   - Regras de validaÃ§Ã£o de entrada
   - RestriÃ§Ãµes de acesso a arquivos
   - ExecuÃ§Ã£o segura de comandos
   - SanitizaÃ§Ã£o de saÃ­da

4. **Criar o Arquivo da Task**
   - Gerar o caminho: `.aiox-core/tasks/{task-name}.md`
   - Escrever a definiÃ§Ã£o da task formatada
   - Garantir a estrutura markdown adequada

5. **Atualizar a Camada de MemÃ³ria**
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
   - Documentar as saÃ­das esperadas

## Checklist de ValidaÃ§Ã£o
- [ ] Nome da task Ã© Ãºnico e vÃ¡lido
- [ ] PropÃ³sito claramente declarado
- [ ] Passos numerados e claros
- [ ] Prompts de elicitaÃ§Ã£o bem definidos
- [ ] Tratamento de erros incluÃ­do
- [ ] CritÃ©rios de sucesso definidos
- [ ] Camada de memÃ³ria atualizada

## Tratamento de Erros
- Se a task existe: OfereÃ§a atualizar ou criar uma variante
- Se a validaÃ§Ã£o falha: Mostre os problemas especÃ­ficos
- Se faltam dependÃªncias: Liste os arquivos necessÃ¡rios
- Se a escrita falha: Verifique as permissÃµes

## SaÃ­da de Sucesso
```
âœ… Task '{task-name}' criada com sucesso!
ðŸ“ LocalizaÃ§Ã£o: .aiox-core/tasks/{task-name}.md
ðŸ“ Exemplo de integraÃ§Ã£o:
   dependencies:
     tasks:
       - {task-name}.md
ðŸ”— Agentes usando esta task: {agent-list}
``` 