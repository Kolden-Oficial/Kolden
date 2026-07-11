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

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: brownfieldCreateStory()
responsÃ¡vel: Pax (Balancer)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: task
  tipo: string
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: true
  validaÃ§Ã£o: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: false
  validaÃ§Ã£o: ParÃ¢metros de task vÃ¡lidos

- campo: mode
  tipo: string
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: false
  validaÃ§Ã£o: yolo|interactive|pre-flight

**SaÃ­da:**
- campo: execution_result
  tipo: object
  destino: MemÃ³ria
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: Gerenciamento de estado
  persistido: true
```

---

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar prÃ©-requisitos ANTES da execuÃ§Ã£o da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task estÃ¡ registrada; parÃ¢metros obrigatÃ³rios fornecidos; dependÃªncias atendidas
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar que task estÃ¡ registrada; parÃ¢metros obrigatÃ³rios fornecidos; dependÃªncias atendidas
    error_message: "PrÃ©-condiÃ§Ã£o falhou: Task estÃ¡ registrada; parÃ¢metros obrigatÃ³rios fornecidos; dependÃªncias atendidas"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o APÃ“S a task ser concluÃ­da

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluÃ­da; cÃ³digo de saÃ­da 0; saÃ­das esperadas criadas
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar que task concluÃ­da; cÃ³digo de saÃ­da 0; saÃ­das esperadas criadas
    error_message: "PÃ³s-condiÃ§Ã£o falhou: Task concluÃ­da; cÃ³digo de saÃ­da 0; saÃ­das esperadas criadas"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de aprovaÃ§Ã£o/reprovaÃ§Ã£o para conclusÃ£o da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluÃ­da conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Afirmar que task concluÃ­da conforme esperado; efeitos colaterais documentados
    error_message: "CritÃ©rio de aceite nÃ£o atendido: Task concluÃ­da conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **PropÃ³sito:** ExecuÃ§Ã£o e orquestraÃ§Ã£o de tasks
  - **Fonte:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **PropÃ³sito:** Logging de execuÃ§Ã£o e rastreamento de erros
  - **Fonte:** .aiox-core/utils/logger.js

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta task:**

- **Script:** execute-task.js
  - **PropÃ³sito:** Wrapper genÃ©rico de execuÃ§Ã£o de task
  - **Linguagem:** JavaScript
  - **LocalizaÃ§Ã£o:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**EstratÃ©gia:** retry

**Erros Comuns:**

1. **Erro:** Task NÃ£o Encontrada
   - **Causa:** Task especificada nÃ£o registrada no sistema
   - **ResoluÃ§Ã£o:** Verificar o nome e o registro da task
   - **RecuperaÃ§Ã£o:** Listar tasks disponÃ­veis, sugerir similares

2. **Erro:** ParÃ¢metros InvÃ¡lidos
   - **Causa:** ParÃ¢metros da task nÃ£o correspondem ao schema esperado
   - **ResoluÃ§Ã£o:** Validar parÃ¢metros contra a definiÃ§Ã£o da task
   - **RecuperaÃ§Ã£o:** Fornecer template de parÃ¢metros, rejeitar a execuÃ§Ã£o

3. **Erro:** Timeout de ExecuÃ§Ã£o
   - **Causa:** Task excede o tempo mÃ¡ximo de execuÃ§Ã£o
   - **ResoluÃ§Ã£o:** Otimizar a task ou aumentar o timeout
   - **RecuperaÃ§Ã£o:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- Quebrar em workflows menores; implementar checkpointing; usar processamento assÃ­ncrono onde possÃ­vel

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
checklists:
  - po-master-checklist.md
---

# Task: Criar Story Brownfield

## PropÃ³sito

Criar uma Ãºnica user story para melhorias brownfield muito pequenas que possam ser concluÃ­das em uma Ãºnica sessÃ£o de desenvolvimento focada. Esta task Ã© para adiÃ§Ãµes mÃ­nimas ou correÃ§Ãµes de bugs que exigem consciÃªncia da integraÃ§Ã£o com o sistema existente.

## Quando Usar Esta Task

**Use esta task quando:**

- A melhoria pode ser concluÃ­da em uma Ãºnica story
- Nenhuma nova arquitetura ou design significativo Ã© necessÃ¡rio
- A mudanÃ§a segue exatamente os padrÃµes existentes
- A integraÃ§Ã£o Ã© direta e com risco mÃ­nimo
- A mudanÃ§a Ã© isolada com limites claros

**Use brownfield-create-epic quando:**

- A melhoria requer 2-3 stories coordenadas
- Algum trabalho de design Ã© necessÃ¡rio
- MÃºltiplos pontos de integraÃ§Ã£o estÃ£o envolvidos

**Use o processo completo de PRD/Arquitetura brownfield quando:**

- A melhoria requer mÃºltiplas stories coordenadas
- Planejamento arquitetural Ã© necessÃ¡rio
- Trabalho de integraÃ§Ã£o significativo Ã© requerido

## InstruÃ§Ãµes

### 1. AvaliaÃ§Ã£o RÃ¡pida do Projeto

ReÃºna contexto mÃ­nimo mas essencial sobre o projeto existente:

**Contexto do Sistema Atual:**

- [ ] Funcionalidade existente relevante identificada
- [ ] Stack de tecnologia para esta Ã¡rea anotada
- [ ] Ponto(s) de integraÃ§Ã£o claramente compreendido(s)
- [ ] PadrÃµes existentes para trabalho similar identificados

**Escopo da MudanÃ§a:**

- [ ] MudanÃ§a especÃ­fica claramente definida
- [ ] Limites de impacto identificados
- [ ] CritÃ©rios de sucesso estabelecidos

### 2. CriaÃ§Ã£o da Story

Crie uma Ãºnica story focada seguindo esta estrutura:

#### TÃ­tulo da Story

{{Specific Enhancement}} - Brownfield Addition

#### HistÃ³ria de UsuÃ¡rio (User Story)

Como {{user type}},
Eu quero {{specific action/capability}},
Para que {{clear benefit/value}}.

#### Contexto da Story

**IntegraÃ§Ã£o com Sistema Existente:**

- Integra com: {{existing component/system}}
- Tecnologia: {{relevant tech stack}}
- Segue o padrÃ£o: {{existing pattern to follow}}
- Pontos de contato: {{specific integration points}}

#### CritÃ©rios de Aceite

**Requisitos Funcionais:**

1. {{Primary functional requirement}}
2. {{Secondary functional requirement (if any)}}
3. {{Integration requirement}}

**Requisitos de IntegraÃ§Ã£o:** 4. O(A) {{relevant functionality}} existente continua funcionando sem alteraÃ§Ãµes 5. A nova funcionalidade segue o padrÃ£o {{pattern}} existente 6. A integraÃ§Ã£o com {{system/component}} mantÃ©m o comportamento atual

**Requisitos de Qualidade:** 7. A mudanÃ§a Ã© coberta por testes apropriados 8. A documentaÃ§Ã£o Ã© atualizada se necessÃ¡rio 9. Nenhuma regressÃ£o na funcionalidade existente verificada

#### Notas TÃ©cnicas

- **Abordagem de IntegraÃ§Ã£o:** {{how it connects to existing system}}
- **ReferÃªncia de PadrÃ£o Existente:** {{link or description of pattern to follow}}
- **RestriÃ§Ãµes Principais:** {{any important limitations or requirements}}

#### DefiniÃ§Ã£o de Pronto (Definition of Done)

- [ ] Requisitos funcionais atendidos
- [ ] Requisitos de integraÃ§Ã£o verificados
- [ ] Funcionalidade existente testada quanto a regressÃ£o
- [ ] CÃ³digo segue os padrÃµes e standards existentes
- [ ] Testes passam (existentes e novos)
- [ ] DocumentaÃ§Ã£o atualizada se aplicÃ¡vel

### 3. VerificaÃ§Ã£o de Risco e Compatibilidade

**AvaliaÃ§Ã£o de Risco MÃ­nima:**

- **Risco PrimÃ¡rio:** {{main risk to existing system}}
- **MitigaÃ§Ã£o:** {{simple mitigation approach}}
- **Rollback:** {{how to undo if needed}}

**VerificaÃ§Ã£o de Compatibilidade:**

- [ ] Nenhuma breaking change nas APIs existentes
- [ ] MudanÃ§as no banco de dados (se houver) sÃ£o apenas aditivas
- [ ] MudanÃ§as de UI seguem os padrÃµes de design existentes
- [ ] Impacto de performance Ã© negligenciÃ¡vel

### 4. Checklist de ValidaÃ§Ã£o

Antes de finalizar a story, confirme:

**ValidaÃ§Ã£o de Escopo:**

- [ ] A story pode ser concluÃ­da em uma sessÃ£o de desenvolvimento
- [ ] A abordagem de integraÃ§Ã£o Ã© direta
- [ ] Segue exatamente os padrÃµes existentes
- [ ] Nenhum trabalho de design ou arquitetura Ã© necessÃ¡rio

**VerificaÃ§Ã£o de Clareza:**

- [ ] Os requisitos da story sÃ£o inequÃ­vocos
- [ ] Os pontos de integraÃ§Ã£o estÃ£o claramente especificados
- [ ] Os critÃ©rios de sucesso sÃ£o testÃ¡veis
- [ ] A abordagem de rollback Ã© simples

## CritÃ©rios de Sucesso

A criaÃ§Ã£o da story Ã© bem-sucedida quando:

1. A melhoria estÃ¡ claramente definida e apropriadamente dimensionada para uma Ãºnica sessÃ£o
2. A abordagem de integraÃ§Ã£o Ã© direta e de baixo risco
3. Os padrÃµes do sistema existente estÃ£o identificados e serÃ£o seguidos
4. O plano de rollback Ã© simples e viÃ¡vel
5. Os critÃ©rios de aceite incluem a verificaÃ§Ã£o da funcionalidade existente

## Notas Importantes

- Esta task Ã© apenas para mudanÃ§as brownfield MUITO PEQUENAS
- Se a complexidade crescer durante a anÃ¡lise, escale para brownfield-create-epic
- Sempre priorize a integridade do sistema existente
- Em caso de dÃºvida sobre a complexidade da integraÃ§Ã£o, use brownfield-create-epic
- Stories nÃ£o devem levar mais do que 4 horas de trabalho de desenvolvimento focado

## Handoff
next_agent: @po
next_command: *validate-story-draft {story-id}
condition: Story brownfield criada a partir da avaliaÃ§Ã£o
alternatives:
  - agent: @sm, command: *draft, condition: NecessÃ¡rio criar stories adicionais da mesma avaliaÃ§Ã£o
 