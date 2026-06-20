---

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Varredura rápida com recomendações padrão
- Interação mínima com o usuário
- **Melhor para:** Avaliação inicial, verificações rápidas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Análise detalhada com explicação
- Confirmação do usuário sobre as recomendações
- **Melhor para:** Primeira integração brownfield

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Análise completa de conflitos
- Itens de revisão manual priorizados
- **Melhor para:** Projetos grandes existentes, codebases empresariais

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: analyzeBrownfield()
responsible: architect (Architect)
responsible_type: Agent
atomic_layer: Analysis

inputs:
- field: targetDir
  type: string
  source: User Input or cwd
  required: false
  validation: Caminho de diretório válido com projeto existente

- field: outputFormat
  type: string
  source: User Input
  required: false
  validation: report|json|summary

- field: executionMode
  type: string
  source: User Input
  required: false
  validation: yolo|interactive|pre-flight

outputs:
- field: analysis
  type: BrownfieldAnalysis
  destination: Memory/Console
  persisted: false

- field: report
  type: string
  destination: Console or File
  persisted: optional

- field: recommendations
  type: array
  destination: Memory
  persisted: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] O diretório alvo existe e contém um projeto
    type: pre-condition
    blocker: true
    validation: |
      Verificar se o diretório alvo existe e tem marcadores de projeto (package.json, go.mod, etc.)
    error_message: "Pré-condição falhou: Nenhum projeto encontrado no diretório alvo"

  - [ ] O módulo Brownfield Analyzer está disponível
    type: pre-condition
    blocker: true
    validation: |
      Verificar se .aiox-core/infrastructure/scripts/documentation-integrity/brownfield-analyzer.js existe
    error_message: "Pré-condição falhou: Módulo Brownfield Analyzer não encontrado"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Análise concluída com detecção de tech stack
    type: post-condition
    blocker: true
    validation: |
      Verificar se analysis.techStack está populado
    error_message: "Pós-condição falhou: Detecção de tech stack incompleta"

  - [ ] Estratégia de merge determinada
    type: post-condition
    blocker: true
    validation: |
      Verificar se analysis.mergeStrategy está definido
    error_message: "Pós-condição falhou: Estratégia de merge não determinada"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Todos os marcadores de projeto analisados
    type: acceptance-criterion
    blocker: true
    validation: |
      Afirmar que tech stack, frameworks, padrões e workflows foram analisados
    error_message: "Critério de aceite não atendido: Análise incompleta"

  - [ ] Recomendações geradas
    type: acceptance-criterion
    blocker: true
    validation: |
      Afirmar que analysis.recommendations tem ao menos um item
    error_message: "Critério de aceite não atendido: Nenhuma recomendação gerada"

  - [ ] Conflitos identificados, se presentes
    type: acceptance-criterion
    blocker: false
    validation: |
      Afirmar que potenciais conflitos foram sinalizados para revisão
    error_message: "Aviso: A detecção de conflitos pode estar incompleta"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** brownfield-analyzer
  - **Propósito:** Analisar a estrutura e os padrões de projetos existentes
  - **Origem:** .aiox-core/infrastructure/scripts/documentation-integrity/brownfield-analyzer.js

- **Ferramenta:** mode-detector
  - **Propósito:** Coletar marcadores de projeto para análise
  - **Origem:** .aiox-core/infrastructure/scripts/documentation-integrity/mode-detector.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** brownfield-analyzer.js
  - **Propósito:** Funções centrais de análise
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/infrastructure/scripts/documentation-integrity/brownfield-analyzer.js

---

## Tratamento de Erros

**Estratégia:** graceful-degradation

**Erros Comuns:**

1. **Erro:** Nenhum Marcador de Projeto Encontrado
   - **Causa:** Diretório vazio ou tipo de projeto não reconhecido
   - **Resolução:** Verificar se o diretório contém arquivos de projeto
   - **Recuperação:** Retornar análise mínima com recomendações

2. **Erro:** Erro de Parse de Config
   - **Causa:** Arquivo de config malformado (package.json, tsconfig.json, etc.)
   - **Resolução:** Pular o arquivo problemático, continuar a análise
   - **Recuperação:** Registrar aviso, prosseguir com análise parcial

3. **Erro:** Permissão Negada
   - **Causa:** Não foi possível ler certos diretórios
   - **Resolução:** Solicitar permissões elevadas ou pular
   - **Recuperação:** Anotar as áreas inacessíveis nos itens de revisão manual

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 30s-2 min (estimado)
cost_estimated: $0.001-0.002
token_usage: ~300-1.000 tokens
```

**Notas de Otimização:**
- Verificações de existência de arquivo são rápidas
- Parsing de JSON cacheado por arquivo
- A varredura da estrutura de diretórios é O(n) para o nível raiz

---

## Metadados

```yaml
story: 6.9
version: 1.0.0
dependencies:
  - documentation-integrity module
tags:
  - analysis
  - brownfield
  - migration
updated_at: 2025-12-14
```

---

tools:
  - filesystem        # Ler arquivos do projeto
  - brownfield-analyzer  # Módulo central desta task
---

# Analisar Projeto Brownfield

## Propósito

Analisar um projeto existente para entender sua estrutura, tech stack, padrões de código e workflows de CI/CD antes da integração com o AIOX. Esta task fornece recomendações para uma integração segura e identifica potenciais conflitos.

## Instruções da Task

### 1. Executar a Análise do Projeto

Execute o brownfield analyzer no projeto alvo:

```javascript
const { analyzeProject, formatMigrationReport } = require('./.aiox-core/infrastructure/scripts/documentation-integrity/brownfield-analyzer');

const targetDir = process.cwd(); // ou diretório especificado
const analysis = analyzeProject(targetDir);
```

### 2. Revisar os Resultados da Análise

A análise retorna informações abrangentes sobre o projeto:

**Estrutura BrownfieldAnalysis:**

```typescript
interface BrownfieldAnalysis {
  // Flags básicas
  hasExistingStructure: boolean;   // Tem src/, lib/, tests/, etc.
  hasExistingWorkflows: boolean;   // Tem configurações de CI/CD
  hasExistingStandards: boolean;   // Tem configs de linting/formatação

  // Estratégia de merge
  mergeStrategy: 'parallel' | 'manual';  // Abordagem recomendada

  // Stack detectada
  techStack: string[];      // ['Node.js', 'TypeScript', 'Python', 'Go', 'Rust']
  frameworks: string[];     // ['React', 'Vue', 'Angular', 'Next.js', 'Express', etc.]
  version: string | null;   // Versão do projeto a partir do package.json

  // Caminhos de config
  configs: {
    eslint: string | null;
    prettier: string | null;
    tsconfig: string | null;
    flake8: string | null;
    packageJson: string | null;
    requirements: string | null;
    goMod: string | null;
    githubWorkflows: string | null;
    gitlabCi: string | null;
  };

  // Configurações detectadas
  linting: string;      // 'ESLint', 'Flake8', 'none'
  formatting: string;   // 'Prettier', 'Black', 'none'
  testing: string;      // 'Jest', 'Vitest', 'pytest', 'none'

  // Orientação de integração
  recommendations: string[];
  conflicts: string[];
  manualReviewItems: string[];

  // Resumo
  summary: string;
}
```

### 3. Exibir o Relatório de Migração

Mostre o relatório de análise formatado:

```javascript
const report = formatMigrationReport(analysis);
console.log(report);
```

**Exemplo de Saída do Relatório:**

```text
╔══════════════════════════════════════════════════════════════════════╗
║                    BROWNFIELD ANALYSIS REPORT                         ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  Tech Stack: Node.js, TypeScript                                     ║
║  Frameworks: React, Next.js                                          ║
║                                                                      ║
║  Linting: ESLint                                                     ║
║  Formatting: Prettier                                                ║
║  Testing: Jest                                                       ║
║                                                                      ║
║  Existing Workflows: Yes                                             ║
║  Merge Strategy: manual                                              ║
╠══════════════════════════════════════════════════════════════════════╣
║  RECOMMENDATIONS                                                     ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  • Preserve existing ESLint configuration - AIOX will adapt          ║
║  • Keep existing Prettier settings - AIOX coding-standards.md will d ║
║  • Review existing CI/CD before adding AIOX workflows                ║
║  • AIOX will use existing tsconfig.json settings                     ║
║  • Next.js detected - use pages/ or app/ structure                   ║
╠══════════════════════════════════════════════════════════════════════╣
║  📋 MANUAL REVIEW REQUIRED                                           ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║  • Review 3 existing GitHub workflow(s) for potential conflicts      ║
╚══════════════════════════════════════════════════════════════════════╝
```

### 4. Interpretar a Estratégia de Merge

Com base na análise, siga a estratégia de merge recomendada:

| Estratégia | Significado | Ações |
|----------|---------|---------|
| `parallel` | Seguro prosseguir com o setup padrão do AIOX | Usar `*setup-project-docs` diretamente |
| `manual` | CI/CD existente requer revisão cuidadosa | Revisar workflows, depois prosseguir |

### 5. Tratar os Itens de Revisão Manual

Para cada item em `analysis.manualReviewItems`:

1. **Revisar Workflows do GitHub:**
   ```bash
   # Listar workflows existentes
   ls -la .github/workflows/

   # Verificar potenciais conflitos com os workflows do AIOX
   # Procurar por: quality-gate.yml, release.yml, staging.yml
   ```

2. **Revisar GitLab CI:**
   ```bash
   # Verificar .gitlab-ci.yml por stages existentes
   cat .gitlab-ci.yml | grep -E "^[a-z]+:"
   ```

3. **Revisar CircleCI:**
   ```bash
   # Verificar config do CircleCI
   cat .circleci/config.yml
   ```

### 6. Tratar Conflitos

Para cada item em `analysis.conflicts`:

1. **docs/architecture/ existe:**
   - Decidir: Manter o existente ou fazer merge com os docs do AIOX
   - Opção A: Renomear o existente para `docs/legacy-architecture/`
   - Opção B: Configurar o AIOX para usar um caminho alternativo

2. **Outros conflitos:**
   - Documentar a decisão na story ou task
   - Considerar criar um backup antes da integração

### 7. Prosseguir com a Integração

Após a análise e revisão, prossiga com base nos achados:

**Se mergeStrategy for 'parallel':**
```bash
# Integração direta
*setup-project-docs
```

**Se mergeStrategy for 'manual':**
```bash
# Primeiro revise os workflows, depois
*setup-project-docs --merge
```

## Critérios de Sucesso

- [ ] Tech stack identificada corretamente
- [ ] Frameworks detectados a partir das dependências
- [ ] Padrões de código existentes encontrados
- [ ] Workflows de CI/CD catalogados
- [ ] Estratégia de merge determinada
- [ ] Recomendações geradas
- [ ] Conflitos identificados
- [ ] Itens de revisão manual listados

## Opções de Saída

**Relatório no Console (padrão):**
```bash
*analyze-brownfield
```

**Saída em JSON:**
```bash
*analyze-brownfield --format json > analysis.json
```

**Apenas Resumo:**
```bash
*analyze-brownfield --format summary
# Saída: Tech Stack: Node.js, TypeScript | Frameworks: React | Standards: ESLint/Prettier | CI/CD: Existing workflows detected | Recommended Strategy: manual
```

## Integração com Outras Tasks

Esta task é tipicamente seguida por:

1. **`*setup-project-docs`** - Gerar documentação do projeto
2. **`*document-project`** - Criar um doc de arquitetura brownfield abrangente
3. **`*create-brownfield-story`** - Criar stories de aprimoramento para projetos existentes

## Notas

- A análise é somente-leitura; nenhum arquivo é modificado
- Execute esta task ANTES de qualquer integração com o AIOX
- Para projetos grandes, a análise pode levar de 1 a 2 minutos
- As recomendações são sugestões, não requisitos
- Use os itens de revisão manual para planejar o trabalho de integração
