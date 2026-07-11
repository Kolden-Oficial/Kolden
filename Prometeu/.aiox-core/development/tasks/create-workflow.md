---

## Modos de ExecuÃ§Ã£o

**Escolha o modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com registro de logs
- InteraÃ§Ã£o mÃ­nima com o usuÃ¡rio
- **Melhor para:** Tasks simples e determinÃ­sticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints de decisÃ£o explÃ­citos
- ExplicaÃ§Ãµes educativas
- **Melhor para:** Aprendizado, decisÃµes complexas

### 3. Planejamento Pre-Flight - Planejamento Completo Antecipado
- Fase de anÃ¡lise da task (identificar todas as ambiguidades)
- ExecuÃ§Ã£o com zero ambiguidade
- **Melhor para:** Requisitos ambÃ­guos, trabalho crÃ­tico

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Passo 0: VerificaÃ§Ã£o no Registry IDS (Consultivo)

Antes de prosseguir, verifique no Entity Registry os artefatos existentes:

1. Extraia as palavras-chave de intenÃ§Ã£o da solicitaÃ§Ã£o do usuÃ¡rio
2. Execute `FrameworkGovernor.preCheck(intent, 'workflow')`
3. Se uma correspondÃªncia REUSE for encontrada (>=90% de relevÃ¢ncia):
   - Exiba a correspondÃªncia e pergunte ao usuÃ¡rio: "Workflow existente encontrado. REUTILIZAR em vez de criar um novo?"
4. Se uma correspondÃªncia ADAPT for encontrada (60-89%):
   - Exiba o candidato Ã  adaptaÃ§Ã£o: "Existe um workflow similar. ADAPTAR em vez de criar um novo?"
5. Se CREATE (sem correspondÃªncia ou o usuÃ¡rio escolher):
   - Registre a decisÃ£o com justificativa e prossiga para o Passo 1
6. Se o IDS estiver indisponÃ­vel (timeout/erro): Avise e prossiga normalmente

**NOTA:** Este passo Ã© consultivo e NÃƒO bloqueia a criaÃ§Ã£o. O usuÃ¡rio sempre tem a decisÃ£o final.

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: createWorkflow()
responsÃ¡vel: Orion (Commander)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: name
  tipo: string
  origem: User Input
  obrigatÃ³rio: true
  validaÃ§Ã£o: Deve ser nÃ£o-vazio, em minÃºsculas, em kebab-case

- campo: target_context
  tipo: string
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: Deve ser "core", "squad" ou "hybrid". PadrÃ£o: "core"

- campo: squad_name
  tipo: string
  origem: User Input
  obrigatÃ³rio: false (obrigatÃ³rio quando target_context="squad" ou "hybrid")
  validaÃ§Ã£o: Deve ser kebab-case, o squad deve existir em squads/

- campo: options
  tipo: object
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: Objeto JSON vÃ¡lido com chaves permitidas

- campo: force
  tipo: boolean
  origem: User Input
  obrigatÃ³rio: false
  validaÃ§Ã£o: PadrÃ£o: false

**SaÃ­da:**
- campo: created_file
  tipo: string
  destino: File system
  persistido: true

- campo: validation_report
  tipo: object
  destino: Memory
  persistido: false

- campo: success
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar prÃ©-requisitos ANTES da execuÃ§Ã£o da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] O alvo ainda nÃ£o existe; as entradas obrigatÃ³rias foram fornecidas; as permissÃµes foram concedidas
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Verifique se o alvo ainda nÃ£o existe; se as entradas obrigatÃ³rias foram fornecidas; se as permissÃµes foram concedidas
    error_message: "PrÃ©-condiÃ§Ã£o falhou: O alvo ainda nÃ£o existe; as entradas obrigatÃ³rias foram fornecidas; as permissÃµes foram concedidas"
  - [ ] Quando target_context="squad" ou "hybrid", o diretÃ³rio do squad deve existir em squads/{squad_name}/
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Se target_context for "squad" ou "hybrid", verifique se squads/{squad_name}/ existe e possui um squad.yaml vÃ¡lido
    error_message: "PrÃ©-condiÃ§Ã£o falhou: Squad '{squad_name}' nÃ£o encontrado em squads/"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o APÃ“S a conclusÃ£o da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Recurso criado com sucesso; validaÃ§Ã£o aprovada; nenhum erro registrado
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verifique se o recurso foi criado com sucesso; se a validaÃ§Ã£o foi aprovada; se nenhum erro foi registrado
    error_message: "PÃ³s-condiÃ§Ã£o falhou: Recurso criado com sucesso; validaÃ§Ã£o aprovada; nenhum erro registrado"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de aprovaÃ§Ã£o/reprovaÃ§Ã£o para a conclusÃ£o da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] O recurso existe e Ã© vÃ¡lido; nenhum recurso duplicado foi criado
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Afirme que o recurso existe e Ã© vÃ¡lido; que nenhum recurso duplicado foi criado
    error_message: "CritÃ©rio de aceite nÃ£o atendido: O recurso existe e Ã© vÃ¡lido; nenhum recurso duplicado foi criado"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **PropÃ³sito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **PropÃ³sito:** CriaÃ§Ã£o e validaÃ§Ã£o de arquivos
  - **Origem:** MÃ³dulo fs do Node.js

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta task:**

- **Script:** create-component.js
  - **PropÃ³sito:** Workflow de criaÃ§Ã£o de componente
  - **Linguagem:** JavaScript
  - **LocalizaÃ§Ã£o:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**EstratÃ©gia:** abort

**Erros Comuns:**

1. **Erro:** Recurso JÃ¡ Existe
   - **Causa:** O arquivo/recurso alvo jÃ¡ existe no sistema
   - **ResoluÃ§Ã£o:** Use a flag force ou escolha um nome diferente
   - **RecuperaÃ§Ã£o:** Solicite ao usuÃ¡rio um nome alternativo ou force a sobrescrita

2. **Erro:** Entrada InvÃ¡lida
   - **Causa:** O nome de entrada contÃ©m caracteres ou formato invÃ¡lidos
   - **ResoluÃ§Ã£o:** Valide a entrada contra as regras de nomenclatura (kebab-case, minÃºsculas, sem caracteres especiais)
   - **RecuperaÃ§Ã£o:** Sanitize a entrada ou rejeite com uma mensagem de erro clara

3. **Erro:** PermissÃ£o Negada
   - **Causa:** PermissÃµes insuficientes para criar o recurso
   - **ResoluÃ§Ã£o:** Verifique as permissÃµes do sistema de arquivos, execute com privilÃ©gios elevados se necessÃ¡rio
   - **RecuperaÃ§Ã£o:** Registre o erro, notifique o usuÃ¡rio, sugira a correÃ§Ã£o de permissÃ£o

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 2-10 min (estimated)
cost_estimated: $0.001-0.008
token_usage: ~800-2,500 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- Valide a configuraÃ§Ã£o cedo; use escritas atÃ´micas; implemente checkpoints de rollback

---

## Metadados

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
# TODO: Create workflow-validation-checklist.md for validation (follow-up story needed)
# checklists:
#   - workflow-validation-checklist.md
---

# Criar Workflow

## PropÃ³sito
Criar uma nova definiÃ§Ã£o de workflow que orquestra mÃºltiplos agentes e tasks para processos complexos de mÃºltiplas etapas no Synkra AIOX.

## PrÃ©-requisitos
- AutorizaÃ§Ã£o do usuÃ¡rio verificada
- CompreensÃ£o clara dos objetivos do workflow
- Conhecimento dos agentes e tasks participantes
- Cliente da camada de memÃ³ria inicializado

## Processo de ElicitaÃ§Ã£o Interativa

### Passo 0: Contexto Alvo
```
ELICIT: Contexto Alvo
1. Onde este workflow deve ser criado? (core / squad / hybrid)
2. Se squad ou hybrid: Qual squad? (kebab-case name, e.g., "pedro-valerio")
```

### Passo 1: VisÃ£o Geral do Workflow
```
ELICIT: InformaÃ§Ãµes BÃ¡sicas do Workflow
1. Qual Ã© o nome do workflow? (e.g., "feature-development", "bug-fix")
2. Qual Ã© o objetivo principal deste workflow?
3. Para que tipo de projeto isto Ã©? (greenfield/brownfield, UI/service/fullstack)
4. Qual Ã© o resultado esperado?
```

### Passo 2: Design da SequÃªncia do Workflow
```text
ELICIT: SequÃªncia e Fluxo do Workflow
1. Quais sÃ£o as principais etapas/fases de execuÃ§Ã£o? (e.g., "planning", "implementation", "testing")
2. Qual Ã© a ordem exata das etapas (`workflow.sequence`)?
3. Existem atividades paralelas?
4. Existem pontos de decisÃ£o ou fluxos condicionais?
5. Quais sÃ£o os critÃ©rios de saÃ­da para cada etapa?
```

### Passo 3: OrquestraÃ§Ã£o de Agentes
```text
ELICIT: ParticipaÃ§Ã£o de Agentes
Para cada etapa do workflow:
1. Qual(is) agente(s) estÃ¡(Ã£o) envolvido(s)?
2. Quais sÃ£o suas responsabilidades especÃ­ficas?
3. Como os agentes fazem o handoff do trabalho entre etapas?
4. Existem requisitos de aprovaÃ§Ã£o?
```

### Passo 4: Requisitos de Recursos
```
ELICIT: Recursos e DependÃªncias
1. Quais templates sÃ£o necessÃ¡rios?
2. Quais arquivos de dados sÃ£o obrigatÃ³rios?
3. Existem dependÃªncias externas?
4. Quais sÃ£o os requisitos de entrada?
5. Quais saÃ­das sÃ£o produzidas?
```

## Passos de ImplementaÃ§Ã£o

1. **Validar o Design do Workflow**
   - Verifique se hÃ¡ dependÃªncias circulares
   - Valide a disponibilidade dos agentes
   - Garanta uma progressÃ£o de fluxo lÃ³gica
   - Verifique se todos os recursos existem

2. **Gerar a Estrutura do Workflow**
   ```yaml
   workflow:
     id: {workflow-name}
     name: {Nome de ExibiÃ§Ã£o do Workflow}
     version: {semver}
     description: {PropÃ³sito e visÃ£o geral}
     type: {greenfield|brownfield}
     scope: {ui|service|fullstack}
 
     # Metadados de compatibilidade opcionais (nÃ£o executÃ¡veis)
     phases:
       - phase_1: {rÃ³tulo da fase}
       - phase_2: {rÃ³tulo da fase}
 
     # Contrato executÃ¡vel canÃ´nico
     sequence:
       - step: {step-slug}
         id: {step-id}
         phase: {1..N}
         phase_name: {Nome de ExibiÃ§Ã£o da Fase}
         agent: {agent-id}
         task: {task-name}
         action: {o que acontece}
         requires: {previous-step-id}
         outputs:
           - {artifact-name}
         next: {next-step-id}
         on_failure: {fallback-step-id}

       - workflow_end:
           id: complete
           action: workflow_complete

     handoff_prompts:
       {from}_to_{to}: {orientaÃ§Ã£o de handoff}
   ```

3. **Adicionar Controles de SeguranÃ§a**
   - Requisitos de autorizaÃ§Ã£o de etapa
   - RestriÃ§Ãµes de acesso a dados
   - Pontos de registro de auditoria
   - Workflows de aprovaÃ§Ã£o

4. **Criar o Arquivo de Workflow**
   - Resolva o caminho de saÃ­da com base em target_context:
     - `core` â†’ `.aiox-core/development/workflows/{workflow-name}.yaml`
     - `squad` â†’ `squads/{squad_name}/workflows/{workflow-name}.yaml`
     - `hybrid` â†’ `squads/{squad_name}/workflows/{workflow-name}.yaml`
   - Escreva a definiÃ§Ã£o YAML estruturada
   - Inclua documentaÃ§Ã£o abrangente

4.5. **Atualizar o Manifesto do Squad** (quando target_context="squad" ou "hybrid")
   - Carregue `squads/{squad_name}/squad.yaml`
   - Inicialize o array `components.workflows` se ele nÃ£o existir
   - Adicione o nome do arquivo do workflow a `components.workflows[]` (pule se jÃ¡ estiver presente)
   - Crie um backup de `squad.yaml` antes de salvar
   - Salve o manifesto atualizado

5. **Atualizar a Camada de MemÃ³ria**
   ```javascript
   await memoryClient.addMemory({
     type: 'workflow_created',
     name: workflowName,
     path: workflowPath,
     creator: currentUser,
     timestamp: new Date().toISOString(),
     metadata: {
       type: workflowType,
       sequence_steps: stepList,
       agents: involvedAgents
     }
   });
   ```

6. **Gerar DocumentaÃ§Ã£o**
   - Crie o diagrama do workflow (baseado em texto)
   - Documente o propÃ³sito de cada etapa
   - Liste todos os pontos de handoff
   - Inclua um guia de soluÃ§Ã£o de problemas

## Checklist de ValidaÃ§Ã£o
- [ ] O nome do workflow Ã© Ãºnico e vÃ¡lido
- [ ] Todas as etapas da sequÃªncia tÃªm propÃ³sitos claros
- [ ] As atribuiÃ§Ãµes de agentes sÃ£o vÃ¡lidas
- [ ] Sem dependÃªncias circulares
- [ ] Todos os recursos existem
- [ ] As transiÃ§Ãµes sÃ£o lÃ³gicas
- [ ] Os controles de seguranÃ§a estÃ£o definidos
- [ ] A camada de memÃ³ria foi atualizada

## Tratamento de Erros
- Se o workflow existir: OfereÃ§a versionamento ou atualizaÃ§Ã£o
- Se houver agentes ausentes: Liste os agentes necessÃ¡rios
- Se houver dependÃªncia circular: Mostre o ciclo e sugira uma correÃ§Ã£o
- Se houver recursos ausentes: Liste-os e ofereÃ§a-se para criÃ¡-los

## SaÃ­da de Sucesso
```
âœ… Workflow '{workflow-name}' criado com sucesso!
ðŸ“ LocalizaÃ§Ã£o: {resolved-path}
   (core â†’ .aiox-core/development/workflows/{workflow-name}.yaml)
   (squad â†’ squads/{squad_name}/workflows/{workflow-name}.yaml)
   (hybrid â†’ squads/{squad_name}/workflows/{workflow-name}.yaml)
ðŸ“Š Resumo do Workflow:
   - Contexto: {target_context} {squad_name if applicable}
   - Passos: {step-count}
   - Agentes: {agent-list}
   - Tipo: {workflow-type}
ðŸš€ Para usar: Selecione o workflow ao iniciar um novo projeto
```

## Notas de ExecuÃ§Ã£o de Workflow
- Os workflows sÃ£o selecionados durante a inicializaÃ§Ã£o do projeto
- A execuÃ§Ã£o de cada etapa Ã© registrada na memÃ³ria
- O rastreamento de progresso estÃ¡ disponÃ­vel atravÃ©s de consultas Ã  memÃ³ria
- Os agentes recebem automaticamente o contexto especÃ­fico de cada etapa
