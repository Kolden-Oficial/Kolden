# Gerar Estratégia de Migração Faseada

> Task ID: brad-generate-migration-strategy
> Agent: Brad (Design System Architect)
> Version: 1.0.0

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

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: generateMigrationStrategy()
responsável: Dara (Sage)
responsavel_type: Agente
atomic_layer: Strategy

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

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

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

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

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

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da tarefa

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

**Recursos externos/compartilhados usados por esta tarefa:**

- **Tool:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Tool:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componentes
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso de destino já existe no sistema
   - **Resolução:** Use a flag force ou escolha um nome diferente
   - **Recuperação:** Solicite ao usuário um nome alternativo ou force a sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Valide a entrada contra as regras de nomenclatura (kebab-case, minúsculas, sem caracteres especiais)
   - **Recuperação:** Sanitize a entrada ou rejeite com uma mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verifique as permissões do sistema de arquivos, execute com privilégios elevados se necessário
   - **Recuperação:** Registre o erro, notifique o usuário, sugira a correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupamento de operações similares

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Descrição

Cria um plano de migração realista em 4 fases para adotar gradualmente o design system sem bloquear os sprints. Prioriza primeiro os padrões de alto impacto, inclui procedimentos de rollback e acompanha o progresso.

## Pré-requisitos

- Tokenização concluída (comando *tokenize executado com sucesso)
- O .state.yaml contém os dados de consolidação e tokens
- Os arquivos de tokens existem (tokens.yaml, exportações)

## Workflow

### Elicitação Interativa

Esta tarefa usa elicitação interativa para customizar a estratégia de migração.

1. **Avaliar o Contexto da Equipe**
   - Perguntar sobre o tamanho e a velocidade da equipe
   - Duração atual do sprint
   - Tolerância a risco (rollout conservador vs agressivo)
   - Disponibilidade para o trabalho de migração

2. **Revisar a Prioridade dos Padrões**
   - Mostrar os padrões mais usados (maior impacto primeiro)
   - Confirmar a estratégia de priorização
   - Identificar quaisquer padrões obrigatórios para o início

3. **Definir o Cronograma das Fases**
   - Estimar o esforço por fase
   - Mapear para o cronograma de sprints
   - Definir datas de marcos (milestones)
   - Confirmar um cronograma realista

### Passos

1. **Carregar Dados de Tokens e Consolidação**
   - Ler o .state.yaml em busca das métricas de consolidação
   - Carregar as localizações dos tokens
   - Identificar as contagens de padrões e os percentuais de redução
   - Validação: Fase de tokenização concluída

2. **Analisar o Impacto dos Padrões**
   - Calcular a frequência de uso para cada tipo de padrão
   - Identificar os padrões de maior impacto (mais instâncias)
   - Estimar o esforço de migração por padrão
   - Priorizar pela razão impacto/esforço
   - Validação: Lista de prioridades criada

3. **Projetar a Fase 1: Fundação**
   - Objetivo: Implantar o sistema de tokens com zero mudanças visuais
   - Tarefas: Adicionar arquivos de tokens, configurar o build, atualizar o CSS para usar tokens
   - Risco: Baixo (sem mudanças em componentes)
   - Duração: 1 sprint
   - Validação: Plano da fase definido

4. **Projetar a Fase 2: Padrões de Alto Impacto**
   - Objetivo: Substituir os componentes mais usados para ROI imediato
   - Identificar os 3 principais padrões (botões, inputs, cards, tipicamente)
   - Calcular as instâncias a migrar
   - Estimar o esforço e o ROI
   - Risco: Médio
   - Duração: 2-3 sprints
   - Validação: Padrões de alto impacto identificados

5. **Projetar a Fase 3: Limpeza da Cauda Longa**
   - Objetivo: Consolidar os padrões restantes
   - Listar os componentes restantes
   - Agrupar por complexidade
   - Estimar o esforço
   - Risco: Baixo (já existe um sistema comprovado)
   - Duração: 2-4 sprints
   - Validação: Plano de limpeza criado

6. **Projetar a Fase 4: Enforcement**
   - Objetivo: Prevenir regressão
   - Adicionar validação de padrões no CI/CD
   - Depreciar os componentes antigos
   - Monitorar as métricas de adoção
   - Risco: Baixo
   - Duração: 1 sprint
   - Validação: Estratégia de enforcement definida

7. **Criar o Mapeamento de Componentes**
   - Gerar o mapeamento componente antigo → componente novo
   - Documentar as mudanças de props
   - Criar trechos de migração (padrões de find/replace)
   - Validação: Mapeamento completo para todos os componentes

8. **Definir os Procedimentos de Rollback**
   - Documentar os passos de rollback para cada fase
   - Identificar as condições que disparam o rollback
   - Garantir que existam backups
   - Validação: Plano de rollback documentado

9. **Gerar a Documentação de Migração**
   - Criar migration-strategy.md (resumo executivo)
   - Criar guias específicos por fase (phase-1.md, phase-2.md, etc)
   - Gerar o arquivo de mapeamento de componentes
   - Incluir exemplos de código
   - Validação: Docs completas de migração criadas

10. **Calcular o Cronograma de ROI**
    - Estimar quando ocorre o breakeven de ROI
    - Projetar a economia cumulativa por fase
    - Mostrar a curva de investimento vs economia
    - Validação: Projeção de ROI criada

11. **Atualizar o Arquivo de Estado**
    - Adicionar a seção de migração ao .state.yaml
    - Registrar a contagem de fases, cronograma, prioridades
    - Atualizar a fase para "migration_strategy_complete"
    - Definir a flag ready_for_atlas
    - Validação: Estado atualizado para o handoff do Atlas

## Saída

- **migration-strategy.md**: Resumo executivo com o plano de 4 fases
- **phase-1-foundation.md**: Tarefas detalhadas da Fase 1
- **phase-2-high-impact.md**: Tarefas detalhadas da Fase 2
- **phase-3-long-tail.md**: Tarefas detalhadas da Fase 3
- **phase-4-enforcement.md**: Tarefas detalhadas da Fase 4
- **component-mapping.json**: Mapa de componente antigo → novo
- **migration-progress.yaml**: Template de acompanhamento de progresso
- **.state.yaml**: Atualizado com o plano de migração

### Formato de Saída

```markdown
# Migration Strategy

## Executive Summary

**Target**: Adopt design system with >80% pattern reduction
**Timeline**: 6-8 sprints (12-16 weeks)
**Risk Level**: Medium (phased approach reduces risk)
**ROI Breakeven**: Phase 2 completion (~6 weeks)

## Phase 1: Foundation (1 sprint)

**Goal**: Deploy tokens, zero visual changes

**Tasks**:
- [ ] Add token files to project (tokens.yaml, exports)
- [ ] Configure build pipeline to process tokens
- [ ] Update existing CSS to use CSS custom properties
- [ ] No component changes yet

**Success Criteria**: Tokens deployed, no visual regressions

**Rollback**: Remove token files, revert CSS

## Phase 2: High-Impact Patterns (2-3 sprints)

**Goal**: Replace most-used components for immediate ROI

**Priorities**:
1. Button (327 instances → 3 variants) - 93% reduction
2. Input (189 instances → 5 variants) - 87% reduction
3. Card (145 instances → 2 variants) - 85% reduction

**Success Criteria**: Top 3 patterns migrated, measurable velocity improvement

**Rollback**: Component-level rollback, old components still available

## Phase 3: Long-Tail Cleanup (2-4 sprints)

**Goal**: Consolidate remaining patterns

**Tasks**:
- [ ] Forms (23 variations → 5)
- [ ] Modals (12 variations → 2)
- [ ] Navigation (8 variations → 3)

**Success Criteria**: >85% overall pattern consolidation achieved

## Phase 4: Enforcement (1 sprint)

**Goal**: Prevent regression

**Tasks**:
- [ ] Add CI/CD pattern validation
- [ ] Deprecate old components
- [ ] Block non-system patterns
- [ ] Monitor adoption metrics

**Success Criteria**: System enforced, adoption sustained
```

## Referências Críticas

**SEMPRE inclua estes nos docs da estratégia de migração:**

- **Checklist de Validação de Migração** (`migration-validation-checklist.md`)
  - Rodar APÓS toda execução de script de migração
  - Detecta classes corrompidas, falhas de build, regressões visuais
  - 5-10 min de validação economizam horas de debugging
  - **Inegociável** - deve ser seguido antes de commitar

- **Armadilhas de Migração** (`migration-pitfalls.md`)
  - Erros comuns e como evitá-los
  - Anti-padrões de incidentes reais
  - Padrões de detecção de corrupção
  - Estratégias de prevenção

**Em todo guia de fase, inclua:**
```markdown
## Validation

After executing migration scripts:
1. Run migration-validation-checklist.md (ALL steps)
2. Review migration-pitfalls.md for common issues
3. Do NOT commit until validation passes

See: Squads/super-agentes/checklists/migration-validation-checklist.md
```

## Critérios de Sucesso

- [ ] 4 fases distintas definidas com objetivos claros
- [ ] A Fase 1 tem zero mudanças visuais (fundação segura)
- [ ] A Fase 2 prioriza os padrões de maior impacto
- [ ] Cada fase tem critérios de sucesso e plano de rollback
- [ ] O cronograma é realista para o tamanho/velocidade da equipe
- [ ] O mapeamento de componentes cobre todos os padrões
- [ ] O breakeven de ROI é projetado com precisão

## Tratamento de Erros

- **Sem dados de tokenização**: Sair com mensagem para rodar *tokenize primeiro
- **Não é possível estimar o cronograma**: Usar valores padrão, avisar o usuário para ajustar
- **Dados de padrões insuficientes**: Recomendar re-executar a auditoria
- **Contexto da equipe ausente**: Usar valores padrão conservadores

## Considerações de Segurança

- Os scripts de migração rodam apenas com as permissões do usuário
- Validar o mapeamento de componentes para prevenir injeção
- Fazer backup dos arquivos antes de quaisquer mudanças automatizadas
- Procedimentos de rollback testados antes da execução

## Exemplos

### Exemplo 1: Geração de Estratégia de Migração

```bash
*migrate
```

Saída:
```
🔍 Brad: Gerando estratégia de migração faseada...

📊 Análise de Padrões:
  - Botões: 327 instâncias (prioridade mais alta)
  - Inputs: 189 instâncias
  - Cores: 1247 usos

🗓️ PLANO DE MIGRAÇÃO (4 fases, 6-8 sprints):

Fase 1: Fundação (1 sprint)
  Implantar tokens, sem mudanças visuais
  Risco: BAIXO

Fase 2: Alto Impacto (2-3 sprints)
  Migrar Button, Input, Card
  ROI Esperado: $31,200/mês de economia
  Risco: MÉDIO

Fase 3: Cauda Longa (2-4 sprints)
  Limpeza dos 15 padrões restantes
  Risco: BAIXO

Fase 4: Enforcement (1 sprint)
  Validação no CI/CD, prevenir regressão
  Risco: BAIXO

💰 Projeção de ROI:
  Investimento: ~$12,000
  Breakeven: Semana 6 (Fase 2 concluída)
  Economia no Ano 1: $374,400

✅ Docs de migração salvos: outputs/design-system/my-app/migration/
✅ Pronto para o Atlas construir componentes
```

### Exemplo 2: Mapeamento de Componentes

```json
{
  "buttons": {
    ".btn-primary": "Button variant='primary'",
    ".button-primary": "Button variant='primary'",
    ".btn-main": "Button variant='primary'",
    ".btn-secondary": "Button variant='secondary'",
    ".btn-danger": "Button variant='destructive'"
  },
  "props_changed": {
    "Button": {
      "old": "type='primary'",
      "new": "variant='primary'"
    }
  }
}
```

## Notas

- A Fase 1 deve ser concluída antes da Fase 2 (fundação necessária)
- Padrões de alto impacto = mais instâncias × mais fáceis de migrar
- O rollback fica mais difícil à medida que o sistema cresce - faça-o cedo se necessário
- O enforcement no CI/CD previne regressão (Fase 4 crítica)
- O cronograma assume que a equipe trabalha na migração junto com as features
- Brad diz: "Rollout faseado = rollout seguro. Sem reescritas big-bang."
- Depois disto, faça o handoff para o Atlas: *agent atlas para construção de componentes
