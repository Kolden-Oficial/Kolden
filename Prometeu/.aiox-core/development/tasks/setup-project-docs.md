---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Projetos greenfield, configuração rápida

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Projetos brownfield, configurações complexas

### 3. Pre-Flight Planning - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Projetos críticos, configurações enterprise

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: setupProjectDocs()
responsible: dev (Developer)
responsible_type: Agent
atomic_layer: Documentation

inputs:
- field: targetDir
  type: string
  source: User Input or cwd
  required: false
  validation: Valid directory path

- field: projectName
  type: string
  source: User Input or package.json
  required: false
  validation: Non-empty string

- field: mode
  type: string
  source: User Input
  required: false
  validation: greenfield|brownfield|framework-dev

- field: executionMode
  type: string
  source: User Input
  required: false
  validation: yolo|interactive|pre-flight

outputs:
- field: docs_generated
  type: array
  destination: docs/architecture/
  persisted: true

- field: core_config
  type: file
  destination: .aiox-core/core-config.yaml
  persisted: true

- field: gitignore
  type: file
  destination: .gitignore
  persisted: true
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target directory exists and is writable
    type: pre-condition
    blocker: true
    validation: |
      Check target directory exists and has write permissions
    error_message: "Pre-condition failed: Target directory not accessible"

  - [ ] Documentation Integrity module is available
    type: pre-condition
    blocker: true
    validation: |
      Verify .aiox-core/infrastructure/scripts/documentation-integrity/index.js exists
    error_message: "Pre-condition failed: Documentation Integrity module not found"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Project docs created in docs/architecture/
    type: post-condition
    blocker: true
    validation: |
      Verify source-tree.md, coding-standards.md, tech-stack.md exist in docs/architecture/
    error_message: "Post-condition failed: Documentation files not created"

  - [ ] core-config.yaml created with valid deployment section
    type: post-condition
    blocker: true
    validation: |
      Verify .aiox-core/core-config.yaml exists and has deployment configuration
    error_message: "Post-condition failed: core-config.yaml not properly configured"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] All documentation files generated from templates
    type: acceptance-criterion
    blocker: true
    validation: |
      Assert docs contain project-specific content, not placeholders
    error_message: "Acceptance criterion not met: Docs contain unresolved placeholders"

  - [ ] .gitignore properly configured for project
    type: acceptance-criterion
    blocker: true
    validation: |
      Assert .gitignore includes AIOX ignores and tech stack ignores
    error_message: "Acceptance criterion not met: .gitignore incomplete"

  - [ ] Configuration-Driven Architecture pattern applied
    type: acceptance-criterion
    blocker: true
    validation: |
      Assert core-config.yaml contains project-specific values
    error_message: "Acceptance criterion not met: core-config.yaml not configuration-driven"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** documentation-integrity
  - **Propósito:** Detecção de modo, geração de docs, geração de config
  - **Origem:** .aiox-core/infrastructure/scripts/documentation-integrity/index.js

- **Ferramenta:** deployment-config-loader
  - **Propósito:** Carregar e validar a configuração de deployment
  - **Origem:** .aiox-core/infrastructure/scripts/documentation-integrity/deployment-config-loader.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** mode-detector.js
  - **Propósito:** Detectar o modo de instalação a partir dos marcadores do projeto
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/infrastructure/scripts/documentation-integrity/mode-detector.js

- **Script:** doc-generator.js
  - **Propósito:** Gerar a documentação do projeto a partir de templates
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/infrastructure/scripts/documentation-integrity/doc-generator.js

- **Script:** config-generator.js
  - **Propósito:** Gerar o core-config.yaml
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/infrastructure/scripts/documentation-integrity/config-generator.js

- **Script:** gitignore-generator.js
  - **Propósito:** Gerar ou mesclar o .gitignore
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/infrastructure/scripts/documentation-integrity/gitignore-generator.js

---

## Tratamento de Erros

**Estratégia:** fallback-defaults

**Erros Comuns:**

1. **Erro:** Detecção de Modo Falhou
   - **Causa:** Não foi possível determinar o tipo de projeto a partir dos marcadores
   - **Resolução:** Usar o modo padrão (greenfield) ou perguntar ao usuário
   - **Recuperação:** Fornecer opções de seleção de modo

2. **Erro:** Template Não Encontrado
   - **Causa:** Arquivo de template ausente no diretório de templates
   - **Resolução:** Verificar os caminhos de template em templates/project-docs/
   - **Recuperação:** Usar templates de fallback inline

3. **Erro:** Escrita de Config Falhou
   - **Causa:** Permissão negada ou disco cheio
   - **Resolução:** Verificar as permissões do diretório
   - **Recuperação:** Exibir a config no console para criação manual

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 1-3 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~500-2,000 tokens
```

**Notas de Otimização:**
- Usa geração baseada em templates para execução rápida
- I/O de arquivo mínimo com escritas em lote
- A Configuration-Driven Architecture reduz decisões em runtime

---

## Metadados

```yaml
story: 6.9
version: 1.0.0
dependencies:
  - documentation-integrity module
tags:
  - documentation
  - setup
  - configuration
updated_at: 2025-12-14
```

---

tools:
  - filesystem        # Read/write project files
  - documentation-integrity  # Core module for this task
---

# Setup Project Documentation

## Propósito

Gerar documentação e configuração específicas do projeto usando o Documentation Integrity System. Esta task cria os docs fundacionais que permitem que agentes de IA entendam a estrutura do projeto, os padrões de código e a configuração de deployment.

## Instruções da Task

### 1. Detectar o Modo de Instalação

Primeiro, determine o modo de instalação com base nos marcadores do projeto:

```javascript
const { detectInstallationMode, collectMarkers } = require('./.aiox-core/infrastructure/scripts/documentation-integrity');

const targetDir = process.cwd(); // or specified directory
const detected = detectInstallationMode(targetDir);
const markers = collectMarkers(targetDir);

console.log(`Detected Mode: ${detected.mode}`);
console.log(`Confidence: ${detected.confidence}`);
console.log(`Reason: ${detected.reason}`);
```

**Descrições dos Modos:**

| Modo | Descrição | Ações |
|------|-------------|---------|
| `framework-dev` | Contribuindo para o próprio aiox-core | Pular setup do projeto, usar config existente |
| `greenfield` | Projeto novo e vazio | Scaffolding completo, wizard de config de deployment |
| `brownfield` | Projeto existente | Analisar e adaptar, mesclar configurações |

### 2. Elicitar a Configuração de Deployment (Greenfield/Brownfield)

Para projetos greenfield e brownfield, colete as preferências de deployment:

**Perguntas-Chave:**

1. **Workflow de Deployment:**
   - `staging-first`: Todas as mudanças vão para staging antes de produção
   - `direct-to-main`: Branches de feature mesclam diretamente na main

2. **Plataforma de Deployment:**
   - `Vercel`: Deployment na Vercel
   - `AWS`: AWS (S3/CloudFront, ECS, Lambda)
   - `Railway`: Railway.app
   - `Docker`: Deployment baseado em Docker
   - `None`: Nenhuma plataforma de deployment configurada

3. **Configuração de Branch:**
   - Nome do branch de staging (padrão: `staging`)
   - Nome do branch de produção (padrão: `main`)

4. **Quality Gates:**
   - Habilitar verificação de lint? (padrão: sim)
   - Habilitar typecheck? (padrão: sim para projetos TypeScript)
   - Habilitar testes? (padrão: sim)
   - Habilitar scan de segurança? (padrão: não)

### 3. Gerar Documentação

Usando o contexto coletado, gere a documentação do projeto:

```javascript
const { buildDocContext, generateDocs } = require('./.aiox-core/infrastructure/scripts/documentation-integrity');

const context = buildDocContext(projectName, mode, markers, {
  // Custom overrides if needed
});

const result = generateDocs(targetDir, context, {
  dryRun: false,  // Set true to preview
});

console.log(`Generated ${result.filesCreated.length} documentation files`);
```

**Arquivos Gerados:**

| Arquivo | Propósito |
|------|---------|
| `docs/architecture/source-tree.md` | Documentação da estrutura do projeto |
| `docs/architecture/coding-standards.md` | Convenções e padrões de código |
| `docs/architecture/tech-stack.md` | Referência da pilha tecnológica |

### 4. Gerar a Configuração Core

Crie o core-config.yaml com as configurações de deployment:

```javascript
const { buildConfigContext, generateConfig, DeploymentWorkflow, DeploymentPlatform } = require('./.aiox-core/infrastructure/scripts/documentation-integrity');

const configContext = buildConfigContext(projectName, mode, {
  workflow: DeploymentWorkflow.STAGING_FIRST,
  platform: DeploymentPlatform.VERCEL,
  stagingBranch: 'staging',
  productionBranch: 'main',
  qualityGates: {
    lint: true,
    typecheck: true,
    tests: true,
    security: false,
  },
});

const configResult = generateConfig(targetDir, mode, configContext);
```

### 5. Gerar/Mesclar .gitignore

Tratar o .gitignore com base no estado do projeto:

```javascript
const { generateGitignoreFile, hasAioxIntegration } = require('./.aiox-core/infrastructure/scripts/documentation-integrity');

const gitignoreResult = generateGitignoreFile(targetDir, markers, {
  projectName,
  merge: mode === 'brownfield',  // Merge with existing for brownfield
});

console.log(`Gitignore ${gitignoreResult.mode}: ${gitignoreResult.path}`);
```

### 6. Verificar a Configuration-Driven Architecture

Confirme que a config de deployment pode ser carregada por outras tasks:

```javascript
const { loadDeploymentConfig, validateDeploymentConfig } = require('./.aiox-core/infrastructure/scripts/documentation-integrity');

const deployConfig = loadDeploymentConfig(targetDir);
const validation = validateDeploymentConfig(deployConfig);

if (validation.isValid) {
  console.log('Configuration-Driven Architecture ready');
  console.log(`Workflow: ${deployConfig.workflow}`);
  console.log(`Platform: ${deployConfig.platform}`);
} else {
  console.error('Configuration validation failed:', validation.errors);
}
```

## Critérios de Sucesso

- [ ] Modo de instalação corretamente detectado
- [ ] Documentação do projeto gerada em `docs/architecture/`
- [ ] `core-config.yaml` criado com a seção de deployment
- [ ] `.gitignore` configurado corretamente (criado ou mesclado)
- [ ] Configuração passa na validação
- [ ] Nenhum placeholder de template não resolvido nos arquivos gerados

## Saída

Após uma execução bem-sucedida:

```text
Setup da Documentação do Projeto Concluído
==========================================
Modo: greenfield
Projeto: my-awesome-app

Arquivos Gerados:
  ✓ docs/architecture/source-tree.md
  ✓ docs/architecture/coding-standards.md
  ✓ docs/architecture/tech-stack.md
  ✓ .aiox-core/core-config.yaml
  ✓ .gitignore (criado)

Configuração de Deployment:
  Workflow: staging-first
  Plataforma: vercel
  Quality Gates: lint, typecheck, tests
```

## Notas

- Esta task implementa o padrão Configuration-Driven Architecture
- As tasks leem valores específicos do projeto a partir do `core-config.yaml`
- Para projetos brownfield, as configurações existentes são preservadas
- Use a task `*analyze-brownfield` primeiro para projetos existentes complexos
