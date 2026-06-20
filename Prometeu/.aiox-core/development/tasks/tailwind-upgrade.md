# Tailwind CSS v4 Upgrade Playbook

> Task ID: brad-tailwind-upgrade  
> Agent: Brad (Design System Architect)  
> Version: 1.0.0

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com logging
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Antecipado Abrangente
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: tailwindUpgrade()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Config

**Entrada:**
- campo: task
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Parâmetros de task válidos

- campo: mode
  tipo: string
  origem: User Input
  obrigatório: false
  validação: yolo|interactive|pre-flight

**Saída:**
- campo: execution_result
  tipo: object
  destino: Memory
  persistido: false

- campo: logs
  tipo: array
  destino: File (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: State management
  persistido: true
```

---

## Pré-condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se a task está registrada; parâmetros obrigatórios fornecidos; dependências atendidas
    error_message: "Pré-condição falhou: Task registrada; parâmetros obrigatórios fornecidos; dependências atendidas"
```

---

## Pós-condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluída; código de saída 0; saídas esperadas criadas
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a task foi concluída; código de saída 0; saídas esperadas criadas
    error_message: "Pós-condição falhou: Task concluída; código de saída 0; saídas esperadas criadas"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluída conforme esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assertar que a task foi concluída conforme esperado; efeitos colaterais documentados
    error_message: "Critério de aceite não atendido: Task concluída conforme esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **Propósito:** Execução e orquestração de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **Propósito:** Logging de execução e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** execute-task.js
  - **Propósito:** Wrapper genérico de execução de tasks
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Task Não Encontrada
   - **Causa:** Task especificada não registrada no sistema
   - **Resolução:** Verificar o nome e o registro da task
   - **Recuperação:** Listar tasks disponíveis, sugerir similares

2. **Erro:** Parâmetros Inválidos
   - **Causa:** Os parâmetros da task não correspondem ao schema esperado
   - **Resolução:** Validar os parâmetros contra a definição da task
   - **Recuperação:** Fornecer template de parâmetros, rejeitar a execução

3. **Erro:** Timeout de Execução
   - **Causa:** A task excede o tempo máximo de execução
   - **Resolução:** Otimizar a task ou aumentar o timeout
   - **Recuperação:** Encerrar a task, limpar recursos, registrar o estado

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
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Descrição

Planejar e executar a migração do Tailwind CSS v3 (ou anterior) para v4 (engine Oxide). Cobre avaliação de risco, conversão para @theme, benchmarks do Oxide, alinhamento de dependências e verificação human-in-the-loop.

## Pré-requisitos

- Configuração e uso existentes do Tailwind inventariados (comando *audit recomendado)
- Node.js ≥ 18.17 (preferir 20+)
- Acesso a pipelines de CI e métricas de performance
- Ferramenta de regressão visual (Chromatic, Lost Pixel ou equivalente)

## Workflow

### 1. Descoberta e Planejamento
- Capturar a versão atual do Tailwind, os tempos de build, o tamanho do bundle de CSS
- Identificar o uso de PostCSS/Sass/Less/Stylus (deve ser removido/substituído)
- Listar bibliotecas de terceiros que dependem do `tailwind.config.js` (ex.: daisyUI)

### 2. Upgrade em Dry Run
- Criar a feature branch `chore/tailwind-v4-upgrade`
- Rodar a CLI oficial de upgrade
  ```bash
  npx @tailwindcss/upgrade
  ```
- Converter a config para a estrutura CSS-first (`app.css` com `@import "tailwindcss";`)
- Substituir as customizações do `tailwind.config.js` pelos equivalentes em CSS `@theme`, `@layer`, `@plugin`

### 3. Validação de Tokens e Utilitários
- Garantir que os design tokens sejam reexportados via `@theme` (camadas core, semantic, component)
- Regenerar os utilitários CSS que dependiam do `theme.extend` anterior
- Validar se os valores arbitrários ainda são necessários; preferir utilitários tokenizados
- Confirmar que `@container`, `@starting-style` e transforms 3D estão funcionando

### 4. Benchmark da Engine Oxide
- Medir o build a frio (cold build), o build incremental (com e sem novo CSS)
- Benchmarks-alvo (referência Catalyst):
  - Cold build ≤ 120ms (alvo <100ms)
  - Incremental (novo CSS) ≤ 8ms
  - Incremental (sem CSS) ≤ 300µs
- Registrar as métricas no README/Changelog

### 5. Testes de Regressão
- Rodar a suíte completa de unit + integração
- Executar regressão visual (Chromatic/Lost Pixel) para detectar drift de classes/utilitários
- Verificar se o dark mode, o theming e os plugins do Tailwind continuam funcionais

### 6. Documentação e Rollout
- Atualizar a documentação de contribuição com o novo uso de `@theme`
- Atualizar o `.cursorrules` / diretrizes de código (boas práticas do Tailwind v4)
- Comunicar o checklist de rollout para a equipe, incluindo passos de fallback

### 7. Atualizar o Estado
- Registrar os metadados do upgrade no `.state.yaml` (tailwind_version, benchmarks, status de validação)
- Sinalizar `tailwind_theme_validated: true` quando as camadas de `@theme` forem verificadas

## Entregáveis

- `app.css` atualizado (ou entrada dedicada) com definições de `@theme`
- `tailwind.config.js` legado removido/arquivado (se não for necessário)
- Benchmarks documentados (`docs/logs/tailwind-upgrade.md` ou similar)
- Resultados dos testes de regressão (links/screenshots)
- `.state.yaml` atualizado com os detalhes do upgrade

## Critérios de Sucesso

- [ ] Tailwind atualizado para v4, builds passam localmente e no CI
- [ ] `@theme` define todos os design tokens (cores, espaçamento, tipografia, etc.)
- [ ] Benchmarks do Oxide registrados e atingem as metas (<30s cold build, <1ms incremental)
- [ ] Tamanho do bundle de CSS ≤ tamanho de produção anterior (idealmente <50KB gzipado)
- [ ] Sem regressões visuais (diff <1% ou conscientemente aceito)
- [ ] Documentação (.cursorrules, README) reflete o workflow do v4
- [ ] `.state.yaml` atualizado (`tailwind_theme_validated`, benchmarks, timestamp)

## Plano de Rollback

1. `git revert` dos commits de upgrade (config + package lock)
2. Restaurar o `tailwind.config.js` anterior
3. Reinstalar a versão anterior do Tailwind
4. Rodar novamente o build/testes para garantir a estabilidade

## Notas

- Remover ou substituir os pipelines de Sass/Less/Stylus (v4 não suporta pré-processadores)
- Os plugins do Tailwind podem exigir versões compatíveis com v4 (@tailwindcss/forms/typography/container-queries)
- Validar se a ferramenta de IDE (Tailwind IntelliSense, plugin do Prettier) foi atualizada para releases compatíveis com v4
- Incentivar a adoção incremental: manter feature flags até que a confiança esteja alta
