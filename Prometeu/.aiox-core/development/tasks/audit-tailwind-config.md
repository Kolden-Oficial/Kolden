# Auditoria de Configuração do Tailwind v4 e Saúde dos Utilitários

> Task ID: brad-audit-tailwind-config  
> Agente: Brad (Design System Architect)  
> Versão: 1.0.0

## Modos de Execução

**Escolha o modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro de logs
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Balanceado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pre-Flight - Planejamento Completo Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução com zero ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: auditTailwindConfig()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Strategy

**Entrada:**
- campo: target
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Caminho ou identificador válido

- campo: options
  tipo: object
  origem: config
  obrigatório: false
  validação: Configuração de análise

- campo: depth
  tipo: number
  origem: User Input
  obrigatório: false
  validação: Padrão: 1 (0-3)

**Saída:**
- campo: analysis_report
  tipo: object
  destino: File (.ai/*.json)
  persistido: true

- campo: findings
  tipo: array
  destino: Memory
  persistido: false

- campo: metrics
  tipo: object
  destino: Memory
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Alvo existe e está acessível; ferramentas de análise disponíveis
    tipo: pre-condition
    blocker: true
    validação: |
      Verificar se o alvo existe e está acessível; ferramentas de análise disponíveis
    error_message: "Pré-condição falhou: Alvo existe e está acessível; ferramentas de análise disponíveis"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da task

**Checklist:**

```yaml
post-conditions:
  - [ ] Análise completa; relatório gerado; nenhum problema crítico
    tipo: post-condition
    blocker: true
    validação: |
      Verificar se a análise está completa; relatório gerado; nenhum problema crítico
    error_message: "Pós-condição falhou: Análise completa; relatório gerado; nenhum problema crítico"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de pass/fail para a conclusão da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Análise precisa; todos os alvos cobertos; relatório completo
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assegurar que a análise é precisa; todos os alvos cobertos; relatório completo
    error_message: "Critério de aceite não atendido: Análise precisa; todos os alvos cobertos; relatório completo"
```

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** analyze-codebase.js
  - **Propósito:** Análise e relatório do codebase
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/analyze-codebase.js

---

## Tratamento de Erros

**Estratégia:** fallback

**Erros Comuns:**

1. **Erro:** Alvo Não Acessível
   - **Causa:** O caminho não existe ou as permissões foram negadas
   - **Resolução:** Verificar o caminho e checar as permissões
   - **Recuperação:** Pular os caminhos inacessíveis, continuar com os acessíveis

2. **Erro:** Timeout de Análise
   - **Causa:** A análise excede o limite de tempo para codebases grandes
   - **Resolução:** Reduzir a profundidade ou o escopo da análise
   - **Recuperação:** Retornar resultados parciais com aviso de timeout

3. **Erro:** Limite de Memória Excedido
   - **Causa:** O codebase grande excede a alocação de memória
   - **Resolução:** Processar em lotes ou aumentar o limite de memória
   - **Recuperação:** Degradação graciosa para análise de resumo

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 5-20 min (estimated)
cost_estimated: $0.003-0.015
token_usage: ~2,000-8,000 tokens
```

**Notas de Otimização:**
- Análise iterativa com limites de profundidade; cache de resultados intermediários; agrupar operações similares em lote

---

## Metadados

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

Revisar a configuração do Tailwind CSS v4 para garantir que a camada de `@theme`, a varredura de content, a higiene dos utilitários e as baselines de performance estejam corretas. Produz um plano de remediação e métricas.

## Pré-requisitos

- Tailwind v4 instalado (ou plano de upgrade em andamento)
- Acesso ao codebase para análise estática
- Capacidade de rodar o build do Tailwind localmente

## Workflow

1. **Coletar Contexto**
   - Localizar o ponto de entrada CSS primário (`app.css`, `src/styles.css`, etc.)
   - Identificar `@imports` adicionais, utilitários customizados, plugins
   - Ler o `.state.yaml` para obter os metadados atuais do Tailwind (se disponível)

2. **Validar as Camadas @theme**
   - Garantir que os tokens definidos dentro de `@theme` estejam agrupados como core → semantic → component
   - Confirmar que os overrides de modo escuro (`[data-theme="dark"]`) mapeiam para tokens semânticos
   - Verificar que não existem referências residuais a `theme.extend`

3. **Inspecionar o Uso de @layer**
   - `@layer base`: Resets, tipografia, `focus-visible`
   - `@layer components`: Abstrações reutilizáveis (ex.: `.form-label`)
   - `@layer utilities`: Definições de utilitários customizados com `@utility`
   - Verificar a ordenação (base → components → utilities) e evitar duplicação

4. **Cobertura de Content e Purge**
   - Revisar o ponto de entrada do Tailwind CLI quanto aos globs de `content` (purge JIT)
   - Garantir que a cobertura de globs inclua `.tsx`, `.jsx`, `.mdx`, stories do Storybook, templates
   - Sinalizar falsos negativos (classes geradas dinamicamente) e propor safelist

5. **Varredura de Saúde dos Utilitários**
   - Rodar detecção de colisão de classes (tailwind-merge ou eslint-plugin-tailwindcss)
   - Identificar utilitários customizados redundantes substituídos por tokens/variants
   - Detectar classes legadas (ex.: `outline-none` em vez de `outline-hidden`)

6. **Snapshot de Performance**
   - Registrar métricas de build (cold + incremental)
   - Capturar o tamanho do bundle CSS, número de utilitários gerados
   - Comparar com os benchmarks-alvo (referência Oxide)

7. **Relatório e Remediação**
   - Resumir os achados (pass/warn/fail) em `docs/reports/tailwind-audit.md`
   - Fornecer uma lista de ações priorizadas (tokens a adicionar, utilitários a remover, correções de config)
   - Atualizar o `.state.yaml` com timestamp da auditoria, dados de benchmark, ações pendentes

## Saída

- Relatório de auditoria (`docs/reports/tailwind-audit.md`)
- `.state.yaml` atualizado em `tooling.tailwind` (validação + métricas)
- Patches opcionais de lint/config (regras ESLint do Tailwind, configurações do plugin Prettier)

## Critérios de Sucesso

- [ ] `@theme` define a stack completa de tokens sem categorias faltando
- [ ] O uso de `@layer` é consistente e livre de definições duplicadas
- [ ] Os caminhos de content cobrem 100% dos templates (nenhum utilitário órfão)
- [ ] As varreduras de tailwind-merge/eslint têm zero conflitos ou todos os problemas registrados resolvidos
- [ ] Métricas de build capturadas (cold/incremental) e comparáveis à baseline anterior
- [ ] Recomendações documentadas com responsáveis + prazos
- [ ] `.state.yaml` atualizado (`tailwind_theme_validated: true/false`) e timestamp da auditoria registrado

## Ferramentas e Comandos

- Build do Tailwind CLI: `npx tailwindcss -i ./app.css -o ./dist.css --watch`
- Auditoria de utilitários: `npx @tailwindcss/oxide --analyze`
- Plugin ESLint do Tailwind: `eslint --ext .tsx src`
- Verificador tailwind-merge: integrar via regra ESLint `tailwindcss/no-contradicting-classname`

## Notas

- Incentivar o linting automatizado (ESLint + prettier-plugin-tailwindcss) após a auditoria
- Documentar as convenções de nomenclatura de classes (ordem: layout → size → spacing → typography → color → effect)
- Rastrear os overrides manuais (padrões de safelist, valores arbitrários) para limpeza futura
