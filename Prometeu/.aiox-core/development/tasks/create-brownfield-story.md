---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: createBrownfieldStory()
responsável: Pax (Balancer)
responsavel_type: Agente
atomic_layer: Organism

**Entrada:**
- campo: name
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be non-empty, lowercase, kebab-case

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid JSON object with allowed keys

- campo: force
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: false

**Saída:**
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

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target does not already exist; required inputs provided; permissions granted
    tipo: pre-condition
    blocker: true
    validação: |
      Check target does not already exist; required inputs provided; permissions granted
    error_message: "Pre-condition failed: Target does not already exist; required inputs provided; permissions granted"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

**Checklist:**

```yaml
post-conditions:
  - [ ] Resource created successfully; validation passed; no errors logged
    tipo: post-condition
    blocker: true
    validação: |
      Verify resource created successfully; validation passed; no errors logged
    error_message: "Post-condition failed: Resource created successfully; validation passed; no errors logged"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Resource exists and is valid; no duplicate resources created
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert resource exists and is valid; no duplicate resources created
    error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Origem:** Node.js fs module

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componente
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso de destino já existe no sistema
   - **Resolução:** Use a flag force ou escolha um nome diferente
   - **Recuperação:** Solicitar ao usuário um nome alternativo ou forçar a sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Validar a entrada contra as regras de nomenclatura (kebab-case, minúsculas, sem caracteres especiais)
   - **Recuperação:** Sanitizar a entrada ou rejeitar com uma mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verificar as permissões do sistema de arquivos, executar com privilégios elevados se necessário
   - **Recuperação:** Registrar o erro em log, notificar o usuário, sugerir a correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-15 min (estimated)
cost_estimated: $0.003-0.010
token_usage: ~3,000-10,000 tokens
```

**Notas de Otimização:**
- Quebrar em workflows menores; implementar checkpointing; usar processamento assíncrono quando possível

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

# Task Criar Story Brownfield

## Propósito

Criar stories detalhadas e prontas para implementação para projetos brownfield, onde documentos tradicionais de PRD/arquitetura fragmentados (sharded) podem não existir. Esta task preenche a lacuna entre vários formatos de documentação (saída do document-project, PRDs brownfield, epics ou documentação do usuário) e stories executáveis para o agente Dev.

## Quando Usar Esta Task

**Use esta task quando:**

- Trabalhar em projetos brownfield com documentação não padronizada
- As stories precisarem ser criadas a partir da saída do document-project
- Trabalhar a partir de epics brownfield sem PRD/arquitetura completos
- A documentação existente do projeto não seguir a estrutura do AIOX v4+
- For necessário reunir contexto adicional do usuário durante a criação da story

**Use create-next-story quando:**

- Trabalhar com PRD devidamente fragmentado (sharded) e documentos de arquitetura v4
- Seguir o workflow padrão greenfield ou brownfield bem documentado
- Todo o contexto técnico estiver disponível em formato estruturado

## Instruções de Execução da Task

### 0. Contexto de Documentação

Verifique a documentação disponível nesta ordem:

1. **PRD/Arquitetura Fragmentados (Sharded)** (docs/prd/, docs/architecture/)
   - Se encontrados, recomende usar a task create-next-story em vez desta

2. **Documento de Arquitetura Brownfield** (docs/brownfield-architecture.md ou similar)
   - Criado pela task document-project
   - Contém o estado real do sistema, dívida técnica, workarounds

3. **PRD Brownfield** (docs/prd.md)
   - Pode conter detalhes técnicos embutidos

4. **Arquivos de Epic** (docs/epics/ ou similar)
   - Criados pela task brownfield-create-epic

5. **Documentação Fornecida pelo Usuário**
   - Pergunte ao usuário a localização e o formato

### 1. Identificação da Story e Coleta de Contexto

#### 1.1 Identificar a Origem da Story

Com base na documentação disponível:

- **A partir do PRD Brownfield**: Extrair stories das seções de epic
- **A partir dos Arquivos de Epic**: Ler a definição do epic e a lista de stories
- **A partir da Direção do Usuário**: Perguntar ao usuário qual melhoria específica implementar
- **Sem Origem Clara**: Trabalhar com o usuário para definir o escopo da story

#### 1.2 Reunir o Contexto Essencial

CRÍTICO: Para stories brownfield, você DEVE reunir contexto suficiente para uma implementação segura. Esteja preparado para pedir ao usuário as informações ausentes.

**Checklist de Informações Obrigatórias:**

- [ ] Qual funcionalidade existente pode ser afetada?
- [ ] Quais são os pontos de integração com o código atual?
- [ ] Quais padrões devem ser seguidos (com exemplos)?
- [ ] Quais restrições técnicas existem?
- [ ] Há algum "gotcha" (pegadinha) ou workaround que deve ser conhecido?

Se qualquer informação obrigatória estiver ausente, liste as informações ausentes e peça ao usuário para fornecê-las.

### 2. Extrair Contexto Técnico das Fontes Disponíveis

#### 2.1 A partir da Saída do Document-Project

Se usar o brownfield-architecture.md do document-project:

- **Seção de Dívida Técnica**: Anotar quaisquer workarounds que afetem esta story
- **Seção de Arquivos-Chave**: Identificar os arquivos que precisarão de modificação
- **Pontos de Integração**: Encontrar os padrões de integração existentes
- **Problemas Conhecidos**: Verificar se a story toca em áreas problemáticas
- **Stack Técnico Real**: Verificar versões e restrições

## Dependências de Configuração

Esta task requer as seguintes chaves de configuração de `core-config.yaml`:

- **`qaLocation`**: Diretório de saída de QA (tipicamente docs/qa) - Necessário para escrever os relatórios de qualidade

**Carregando a Config:**
```javascript
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '../../.aiox-core/core-config.yaml');
const config = yaml.load(fs.readFileSync(configPath, 'utf8'));

const qaLocation = config.qa?.qaLocation || 'docs/qa';
```

#### 2.2 A partir do PRD Brownfield

Se usar o PRD brownfield:

- **Seção de Restrições Técnicas**: Extrair todas as restrições relevantes
- **Requisitos de Integração**: Anotar os requisitos de compatibilidade
- **Organização do Código**: Seguir os padrões especificados
- **Avaliação de Risco**: Entender os impactos potenciais

#### 2.3 A partir da Documentação do Usuário

Peça ao usuário ajuda para identificar:

- Especificações técnicas relevantes
- Exemplos de código existentes a seguir
- Requisitos de integração
- Abordagens de teste usadas no projeto

### 3. Criação da Story com Coleta Progressiva de Detalhes

#### 3.1 Criar a Estrutura Inicial da Story

Comece com o template de story, preenchendo o que é conhecido:

```markdown
# Story {{Enhancement Title}}

## Status: Draft

## Story

As a {{user_type}},
I want {{enhancement_capability}},
so that {{value_delivered}}.

## Context Source

- Source Document: {{document name/type}}
- Enhancement Type: {{single feature/bug fix/integration/etc}}
- Existing System Impact: {{brief assessment}}
```

#### 3.2 Desenvolver os Critérios de Aceite

Crítico: Para brownfield, SEMPRE inclua critérios sobre a manutenção da funcionalidade existente

Estrutura padrão:

1. A nova funcionalidade funciona conforme especificado
2. A {{affected feature}} existente continua a funcionar sem alterações  
3. A integração com {{existing system}} mantém o comportamento atual
4. Sem regressão em {{related area}}
5. A performance permanece dentro de limites aceitáveis

#### 3.3 Reunir Orientação Técnica

Crítico: É aqui que você precisará ser interativo com o usuário se houver informação ausente

Crie a seção Dev Technical Guidance com as informações disponíveis:

```markdown
## Dev Technical Guidance

### Existing System Context
[Extrair da documentação disponível]

### Integration Approach
[Com base nos padrões encontrados ou perguntar ao usuário]

### Technical Constraints
[Da documentação ou da entrada do usuário]

### Missing Information

Crítico: Liste qualquer coisa que você não conseguiu encontrar e que o dev precisará, e peça as informações ausentes

### 4. Geração de Tasks com Verificações de Segurança

#### 4.1 Gerar as Tasks de Implementação

Com base no contexto reunido, crie tasks que:

- Incluam tasks de exploração se o entendimento do sistema estiver incompleto
- Adicionem tasks de verificação para a funcionalidade existente
- Incluam considerações de rollback
- Referenciem arquivos/padrões específicos quando conhecidos

Exemplo de estrutura de task para brownfield:

```markdown
## Tasks / Subtasks

- [ ] Task 1: Analisar a implementação existente de {{component/feature}}
  - [ ] Revisar {{specific files}} em busca dos padrões atuais
  - [ ] Documentar os pontos de integração
  - [ ] Identificar os impactos potenciais

- [ ] Task 2: Implementar {{new functionality}}
  - [ ] Seguir o padrão de {{example file}}
  - [ ] Integrar com {{existing component}}
  - [ ] Manter a compatibilidade com {{constraint}}

- [ ] Task 3: Verificar a funcionalidade existente
  - [ ] Testar se {{existing feature 1}} ainda funciona
  - [ ] Verificar se o comportamento de {{integration point}} não mudou
  - [ ] Checar o impacto na performance

- [ ] Task 4: Adicionar testes
  - [ ] Testes unitários seguindo {{project test pattern}}
  - [ ] Teste de integração para {{integration point}}
  - [ ] Atualizar os testes existentes se necessário
```

#### 4.4 Prever Requisitos de Qualidade e Atribuição de Agentes

**CRÍTICO PARA BROWNFIELD:** Este passo popula a seção `🤖 CodeRabbit Integration` com quality gates específicos de brownfield. Stories brownfield têm RISCO MAIS ALTO devido à complexidade de integração, então o planejamento de qualidade é essencial.

**Análise dos Pontos de Integração:**

Analise os riscos de integração da story com base em:
- Qual funcionalidade existente será modificada?
- Quantos pontos de integração são afetados?
- Isto está tocando em funcionalidade central/crítica?
- Qual é o raio de impacto (blast radius) de bugs potenciais?

**Regras de Atribuição de Agentes Específicas de Brownfield:**

**Se modificar um banco de dados existente:**
- **Atribuir**: @db-sage, @dev
- **Justificativa**: Mudanças de banco de dados em brownfield exigem revisão especializada para:
  - Impactos na migração de dados existentes
  - Compatibilidade de políticas RLS
  - Performance de índices em dados existentes
  - Conflitos de restrições de foreign key
- **Quality Gates**: Pre-Commit (validação de schema), Pre-PR (revisão de SQL), Pre-Deployment (teste de migration)

**Se alterar APIs existentes:**
- **Atribuir**: @architect, @dev
- **Justificativa**: Mudanças de API arriscam quebrar clientes existentes:
  - Validação de retrocompatibilidade
  - Requisitos de versionamento de contrato
  - Identificação de breaking changes
  - Avaliação de impacto no cliente
- **Quality Gates**: Pre-Commit (validação de contrato), Pre-PR (verificação de retrocompatibilidade)

**Se tocar em deployment/infraestrutura:**
- **Atribuir**: @github-devops, @dev
- **Justificativa**: Mudanças de infraestrutura precisam de segurança de rollback:
  - Validação de configuração específica por ambiente
  - Verificação do procedimento de rollback
  - Planejamento de deployment sem downtime
  - Implementação de feature flag se necessário
- **Quality Gates**: Pre-Commit (validação de config), Pre-Deployment (deep scan com plano de rollback)

**Se afetar UI/UX existente:**
- **Atribuir**: @ux-expert, @dev
- **Justificativa**: Mudanças de UI devem manter a consistência da experiência do usuário:
  - Conformidade com o design system
  - Manutenção dos padrões de acessibilidade
  - Continuidade do fluxo de trabalho do usuário
  - Preservação da compatibilidade entre navegadores
- **Quality Gates**: Pre-Commit (validação de a11y), Pre-PR (verificação de consistência de UX)

**Determinação de Quality Gate Baseada em Risco:**

**ALTO RISCO** (afeta funcionalidade central, muitos pontos de integração, crítico para produção):
- **Quality Gates**: Pre-Commit + Pre-PR + Pre-Deployment
- **Requisitos Adicionais**:
  - Implementação de feature flag recomendada
  - Estratégia de rollout faseado
  - Procedimento de rollback detalhado
  - Plano de monitoramento e alertas
- **Áreas de Foco**:
  - Prevenção de regressão (a funcionalidade existente DEVE funcionar)
  - Segurança de integração (o novo código não quebra o código antigo)
  - Prontidão de rollback (as mudanças são reversíveis)
  - Impacto na performance (sem degradação das funcionalidades existentes)

**RISCO MÉDIO** (nova funcionalidade com escopo isolado, alguma integração):
- **Quality Gates**: Pre-Commit + Pre-PR
- **Requisitos Adicionais**:
  - Teste de integração com as funcionalidades existentes
  - Testes unitários para o código novo e o afetado
  - Atualizações de documentação
- **Áreas de Foco**:
  - Pontos de integração validados
  - Padrões existentes seguidos
  - Tratamento de erros abrangente

**BAIXO RISCO** (documentação, apenas testes, correção isolada de bug):
- **Quality Gates**: Pre-Commit
- **Requisitos Adicionais**:
  - Revisão de código padrão
  - Teste básico
- **Áreas de Foco**:
  - Padrões de qualidade de código
  - Clareza da documentação

**Foco do CodeRabbit para Brownfield:**

Independentemente do tipo de story, TODAS as stories brownfield devem incluir estas áreas de foco:

```yaml
🤖 CodeRabbit Integration:

  Story Type Analysis:
    Primary Type: [Database|API|Frontend|Deployment|Security|Integration]
    Secondary Type(s): [Additional types]
    Complexity: [Low|Medium|High]
    Risk Level: [LOW RISK|MEDIUM RISK|HIGH RISK] ← Brownfield-specific
    Integration Points: [List of systems/components affected] ← Brownfield-specific

  Specialized Agent Assignment:
    Primary Agents:
      - @dev (always required)
      - @[integration-specific-agent] (based on affected systems)

    Supporting Agents:
      - @[supporting-agent-1] (if multiple systems)
      - @[supporting-agent-2] (if cross-cutting concerns)

  Quality Gate Tasks:
    - [ ] Pre-Commit (@dev): Run `coderabbit --prompt-only -t uncommitted` before story complete
    - [ ] Pre-PR (@github-devops): Run `coderabbit --prompt-only --base main` before PR creation
    - [ ] Pre-Deployment (@github-devops): Run `coderabbit --prompt-only -t committed --base HEAD~10` before production deploy (HIGH RISK stories only)

  CodeRabbit Focus Areas:
    Primary Focus (Brownfield-Specific):
      - Regression prevention: Existing functionality preserved
      - Integration safety: New code doesn't break existing code
      - Rollback readiness: Changes are reversible
      - [Type-specific focus from detection rules]

    Secondary Focus:
      - [Type-specific focus areas]
      - Performance impact: No degradation to existing features
      - Error handling: Graceful degradation for integration failures
```

**Exemplo Brownfield (Story de Database + API de ALTO RISCO):**

```yaml
🤖 CodeRabbit Integration:

  Story Type Analysis:
    Primary Type: Database
    Secondary Type(s): API
    Complexity: High (schema changes + multiple API endpoints)
    Risk Level: HIGH RISK (affects core payment processing functionality)
    Integration Points:
      - Payment service API
      - Transaction database tables
      - External payment gateway webhook
      - User notification system

  Specialized Agent Assignment:
    Primary Agents:
      - @dev (pre-commit reviews)
      - @db-sage (schema changes, RLS policies, existing data migration)
      - @architect (API contract changes, backward compatibility)

    Supporting Agents:
      - @github-devops (phased rollout, rollback procedure)

  Quality Gate Tasks:
    - [ ] Pre-Commit (@dev): Run before story complete
    - [ ] Pre-PR (@github-devops): Run before PR creation
    - [ ] Pre-Deployment (@github-devops): Run before production deploy with rollback plan validation

  CodeRabbit Focus Areas:
    Primary Focus (Brownfield-Specific):
      - Regression prevention: Existing payment flows MUST work identically
      - Integration safety: New schema compatible with existing queries
      - Rollback readiness: Migration reversible without data loss
      - Service filters on ALL queries (.eq('service', 'ttcx'))
      - Schema compliance with existing patterns

    Secondary Focus:
      - API backward compatibility: v1 clients still supported
      - Performance: No degradation to existing payment processing
      - Error handling: Graceful fallback for gateway failures
      - RLS policies: Consistent with existing security model
      - Migration testing: Validated on copy of production data structure
```

**Considerações Específicas de Integração:**

Quando a story envolve padrões de integração específicos:

**Integração de Database:**
- Foco: Compatibilidade de dados existentes, segurança de migration, consistência de políticas RLS
- Validação: Rodar a migration em dados similares aos de produção, verificar que todas as queries existentes ainda funcionam

**Integração de API:**
- Foco: Versionamento de contrato, retrocompatibilidade, avaliação de impacto no cliente
- Validação: Testes de integração com clientes de API existentes, teste de contrato

**Integração de Frontend:**
- Foco: Continuidade do fluxo de trabalho do usuário, conformidade com o design system, preservação da acessibilidade
- Validação: Teste de regressão visual, teste de aceitação do usuário nos fluxos existentes

**Integração de Sistema Externo:**
- Foco: Degradação graciosa, lógica de retry, tratamento de erros, monitoramento
- Validação: Teste de cenários de falha, validação de circuit breaker

**Registrar a Conclusão em Log:**
- Após popular esta seção, registre em log: "✅ Brownfield story analysis complete: [Primary Type] | Risk Level: [RISK] | Integration Points: [count] | Agents assigned: [agent list]"

### 5. Avaliação de Risco e Mitigação

CRÍTICO: para brownfield - sempre inclua a avaliação de risco

Adicione uma seção para riscos específicos de brownfield:

```markdown
## Risk Assessment

### Implementation Risks
- **Primary Risk**: {{main risk to existing system}}
- **Mitigation**: {{how to address}}
- **Verification**: {{how to confirm safety}}

### Rollback Plan
- {{Simple steps to undo changes if needed}}

### Safety Checks
- [ ] Existing {{feature}} tested before changes
- [ ] Changes can be feature-flagged or isolated
- [ ] Rollback procedure documented
```

### 6. Validação Final da Story

Antes de finalizar:

1. **Verificação de Completude**:
   - [ ] A story tem escopo claro e critérios de aceite
   - [ ] O contexto técnico é suficiente para a implementação
   - [ ] A abordagem de integração está definida
   - [ ] Os riscos estão identificados com mitigação

2. **Verificação de Segurança**:
   - [ ] Proteção da funcionalidade existente incluída
   - [ ] O plano de rollback é viável
   - [ ] Os testes cobrem tanto as funcionalidades novas quanto as existentes

3. **Lacunas de Informação**:
   - [ ] Todas as informações críticas ausentes reunidas com o usuário
   - [ ] As incógnitas remanescentes documentadas para o agente dev
   - [ ] Tasks de exploração adicionadas onde necessário

### 7. Formato de Saída da Story

Salve a story com a nomenclatura apropriada:

- Se a partir de epic: `docs/stories/epic-{n}-story-{m}.md`
- Se standalone: `docs/stories/brownfield-{feature-name}.md`
- Se sequencial: Seguir a numeração de stories existente

Inclua o cabeçalho indicando o contexto de documentação:

```markdown
# Story: {{Title}}

<!-- Source: {{documentation type used}} -->
<!-- Context: Brownfield enhancement to {{existing system}} -->

## Status: Draft
[Resto do conteúdo da story...]
```

### 8. Comunicação de Handoff

Forneça um handoff claro ao usuário:

```text
Brownfield story created: {{story title}}

Source Documentation: {{what was used}}
Story Location: {{file path}}

Key Integration Points Identified:
- {{integration point 1}}
- {{integration point 2}}

Risks Noted:
- {{primary risk}}

{{If missing info}}: 
Note: Some technical details were unclear. The story includes exploration tasks to gather needed information during implementation.

Next Steps:
1. Review story for accuracy
2. Verify integration approach aligns with your system
3. Approve story or request adjustments
4. Dev agent can then implement with safety checks
```

## Critérios de Sucesso

A criação da story brownfield é bem-sucedida quando:

1. A story pode ser implementada sem exigir que o dev busque em múltiplos documentos
2. A abordagem de integração é clara e segura para o sistema existente
3. Todo o contexto técnico disponível foi extraído e organizado
4. As informações ausentes foram identificadas e tratadas
5. Os riscos estão documentados com estratégias de mitigação
6. A story inclui a verificação da funcionalidade existente
7. A abordagem de rollback está definida

## Notas Importantes

- Esta task é especificamente para projetos brownfield com documentação não padronizada
- Sempre priorize a estabilidade do sistema existente sobre as novas funcionalidades
- Em caso de dúvida, adicione tasks de exploração e verificação
- É melhor pedir esclarecimento ao usuário do que fazer suposições
- Cada story deve ser autocontida para o agente dev
- Inclua referências a padrões de código existentes quando disponíveis
